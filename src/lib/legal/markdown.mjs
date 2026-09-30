/**
 * The Markdown the legal documents are written in, parsed into a small tree.
 *
 * Not a general Markdown parser, and deliberately so: the site takes no Markdown
 * dependency (CLAUDE.md, "no additional JS libraries"), and the legal documents
 * in sealmetrics2 use a closed subset — headings, paragraphs, dash and numbered
 * lists nested by indentation, task lists, GitHub tables, blockquotes, rules,
 * and inline bold, italic, code and links. Anything outside that subset renders
 * as plain text, never as HTML: nothing in a document is ever injected raw.
 *
 * Plain JavaScript so that `node --test` can exercise it without a build; the
 * page imports it through `allowJs`.
 */

/** @typedef {{t: "text", v: string} | {t: "code", v: string} | {t: "strong" | "em", c: Inline[]} | {t: "link", href: string, c: Inline[]}} Inline */
/** @typedef {{inline: Inline[], checked?: boolean, children: Block[]}} ListItem */
/**
 * @typedef {{type: "heading", level: number, id: string, text: Inline[], raw: string}
 *   | {type: "paragraph", lines: Inline[][]}
 *   | {type: "list", ordered: boolean, start: number, items: ListItem[]}
 *   | {type: "table", header: Inline[][], rows: Inline[][][]}
 *   | {type: "quote", children: Block[]}
 *   | {type: "hr"}} Block
 */

const LIST_ITEM = /^(\s*)(?:([-*+])|(\d+)[.)])\s+(.*)$/;
const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const RULE = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/;
const TABLE_ROW = /^\s*\|.*\|\s*$/;
const TABLE_DIVIDER = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;

/** GitHub's heading slug: lower case, punctuation dropped, spaces to hyphens. Letters
 * outside ASCII survive, which is what the Spanish table of contents links to. */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s/g, "-");
}

/** @returns {Inline[]} */
export function parseInline(source) {
  /** @type {Inline[]} */
  const out = [];
  let rest = source;
  const push = (v) => {
    if (!v) return;
    const last = out[out.length - 1];
    if (last && last.t === "text") last.v += v;
    else out.push({ t: "text", v });
  };
  const patterns = [
    { re: /`([^`]+)`/, make: (m) => ({ t: "code", v: m[1] }) },
    { re: /\*\*(.+?)\*\*/, make: (m) => ({ t: "strong", c: parseInline(m[1]) }) },
    { re: /\[([^\]]+)\]\(([^)\s]+)\)/, make: (m) => ({ t: "link", href: m[2], c: parseInline(m[1]) }) },
    { re: /(?<![\w*])\*(?!\s)([^*]+?)(?<!\s)\*(?![\w*])/, make: (m) => ({ t: "em", c: parseInline(m[1]) }) },
  ];
  while (rest) {
    let best = null;
    for (const p of patterns) {
      const m = p.re.exec(rest);
      if (m && (best === null || m.index < best.m.index)) best = { m, p };
    }
    if (!best) {
      push(rest);
      break;
    }
    push(rest.slice(0, best.m.index));
    out.push(best.p.make(best.m));
    rest = rest.slice(best.m.index + best.m[0].length);
  }
  return out;
}

/** Plain text of inline tokens — for ids, labels and the tests. */
export function inlineText(tokens) {
  return tokens
    .map((token) => ("v" in token ? token.v : inlineText(token.c)))
    .join("");
}

function splitRow(line) {
  let row = line.trim();
  if (row.startsWith("|")) row = row.slice(1);
  if (row.endsWith("|")) row = row.slice(0, -1);
  return row.split("|").map((cell) => parseInline(cell.trim()));
}

/**
 * @param {string} markdown
 * @param {{ids?: Map<string, number>}} [state]
 * @returns {Block[]}
 */
export function parseBlocks(markdown, state = { ids: new Map() }) {
  const lines = markdown.replace(/\r\n?/g, "\n").replace(/<!--[\s\S]*?-->/g, "").split("\n");
  /** @type {Block[]} */
  const blocks = [];
  let i = 0;

  const uniqueId = (raw) => {
    const base = slugify(raw) || "section";
    const seen = state.ids.get(base) ?? 0;
    state.ids.set(base, seen + 1);
    return seen ? `${base}-${seen}` : base;
  };

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (RULE.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }
    const heading = HEADING.exec(line);
    if (heading) {
      const raw = heading[2];
      blocks.push({ type: "heading", level: heading[1].length, id: uniqueId(raw), text: parseInline(raw), raw });
      i++;
      continue;
    }
    if (line.startsWith(">")) {
      const inner = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        inner.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "quote", children: parseBlocks(inner.join("\n"), state) });
      continue;
    }
    if (TABLE_ROW.test(line) && i + 1 < lines.length && TABLE_DIVIDER.test(lines[i + 1])) {
      const header = splitRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && TABLE_ROW.test(lines[i])) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      blocks.push({ type: "table", header, rows });
      continue;
    }
    if (LIST_ITEM.test(line)) {
      const collected = [];
      while (i < lines.length) {
        const current = lines[i];
        if (LIST_ITEM.test(current)) {
          collected.push(current);
          i++;
        } else if (current.trim() && /^\s+/.test(current) && collected.length) {
          // A wrapped continuation of the item above.
          collected[collected.length - 1] += ` ${current.trim()}`;
          i++;
        } else break;
      }
      blocks.push(buildList(collected));
      continue;
    }
    const paragraph = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !HEADING.test(lines[i]) &&
      !RULE.test(lines[i]) &&
      !lines[i].startsWith(">") &&
      !LIST_ITEM.test(lines[i]) &&
      !(TABLE_ROW.test(lines[i]) && i + 1 < lines.length && TABLE_DIVIDER.test(lines[i + 1]))
    ) {
      paragraph.push(parseInline(lines[i].trim()));
      i++;
    }
    blocks.push({ type: "paragraph", lines: paragraph });
  }
  return blocks;
}

/** Lists nested by indentation, the way the documents write them (two spaces a level). */
function buildList(itemLines) {
  const parse = (line) => {
    const m = LIST_ITEM.exec(line);
    let text = m[4];
    let checked;
    const task = /^\[( |x|X)\]\s+(.*)$/.exec(text);
    if (task) {
      checked = task[1] !== " ";
      text = task[2];
    }
    return { indent: m[1].length, ordered: m[3] !== undefined, start: Number(m[3] ?? 1), text, checked };
  };
  const parsed = itemLines.map(parse);
  const build = (from, indent) => {
    const first = parsed[from];
    const list = { type: "list", ordered: first.ordered, start: first.start, items: [] };
    let i = from;
    while (i < parsed.length && parsed[i].indent >= indent) {
      const entry = parsed[i];
      if (entry.indent > indent) {
        const last = list.items[list.items.length - 1];
        const [child, next] = build(i, entry.indent);
        if (last) last.children.push(child);
        else list.items.push({ inline: [], children: [child] });
        i = next;
        continue;
      }
      list.items.push({ inline: parseInline(entry.text), checked: entry.checked, children: [] });
      i++;
    }
    return [list, i];
  };
  return build(0, parsed[0].indent)[0];
}

const META_LINE = /^\*\*(Last updated|Última actualización|Version|Versión|Effective date|Entrada en vigor):\*\*\s*(.*)$/;

/**
 * Split a document into the header facts the page shows above the text and the body
 * it renders. Drops the H1 (the page owns the one heading level 1) and, when
 * `extractMeta` is set, the date/version/effective-date lines at the top.
 *
 * @param {string} markdown
 * @param {{extractMeta?: boolean}} [options]
 */
export function prepareDocument(markdown, { extractMeta = false } = {}) {
  const lines = markdown.replace(/<!--[\s\S]*?-->\n?/g, "").split("\n");
  const h1 = lines.findIndex((line) => /^#\s/.test(line));
  const title = h1 >= 0 ? lines[h1].replace(/^#\s+/, "").trim() : "";
  if (h1 >= 0) lines.splice(h1, 1);
  /** @type {Record<string, string>} */
  const meta = {};
  if (extractMeta) {
    for (let i = 0; i < Math.min(lines.length, 30); i++) {
      const m = META_LINE.exec(lines[i].trim());
      if (!m) continue;
      const key = { "Last updated": "updated", "Última actualización": "updated", Version: "version", Versión: "version", "Effective date": "effective", "Entrada en vigor": "effective" }[m[1]];
      meta[key] = m[2].trim();
      lines[i] = "";
    }
  }
  // Rules left with nothing between them once the header lines are gone collapse to one.
  const body = lines
    .join("\n")
    .replace(/\n(?:---\s*\n\s*)+---\s*\n/g, "\n---\n")
    .replace(/^\s*(?:---\s*\n\s*)+/, "");
  return { title, meta, body };
}
