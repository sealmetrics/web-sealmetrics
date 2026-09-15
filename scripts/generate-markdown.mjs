#!/usr/bin/env node
/**
 * Generates a clean Markdown twin of every indexable page, for AI agents.
 *
 *   /blog/meet-seal-ai/  →  /blog/meet-seal-ai.md
 *   /                    →  /index.md
 *
 * WHY STATIC .md FILES AND NOT CONTENT NEGOTIATION
 * The site is `output: "export"` deployed to GitHub Pages. There is no server
 * and no edge worker we control (see INFRA-MIGRATION.md), so `Accept:
 * text/markdown` + `Vary: Accept` is not implementable here — it would need a
 * hosting migration. Static `.md` twins give agents the same payload with the
 * hosting we actually have.
 *
 * GUARANTEES
 *   - Only indexable pages get a twin (noindex pages are skipped), so the
 *     Markdown surface can never contradict the robots policy.
 *   - The twin is generated FROM the rendered HTML, so it cannot drift from
 *     what a human reads.
 *   - `<link rel="alternate" type="text/markdown">` is injected into the HTML
 *     only for pages that actually got a twin — HTML and Markdown stay in
 *     lockstep by construction.
 *   - `.md` URLs are never added to sitemap.xml (the sitemap is generated from
 *     route sources, not from out/).
 *   - robots.txt Disallows `/*.md$` for classic search crawlers and Allows it
 *     for AI crawlers, so the twins cannot compete with the HTML in the index.
 *
 * Run: node scripts/generate-markdown.mjs   (wired into `postbuild`)
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");
const OUT = path.join(repoRoot, "out");
const SITE = "https://sealmetrics.com";

if (!existsSync(OUT)) {
  console.error("[generate-markdown] out/ missing — run `npm run build` first.");
  process.exit(1);
}

/* ------------------------------------------------------------------ utils */

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'",
  "#x27": "'", "#x2F": "/", "#38": "&", mdash: "—", ndash: "–", hellip: "…",
  rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“",
  eacute: "é", middot: "·", times: "×", euro: "€", deg: "°", sect: "§",
};
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n] ?? ENTITIES[n.toLowerCase()] ?? m);
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return m ? m[1] : null;
};

/** Strip tags → plain inline text. */
function textOf(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

/**
 * Remove every element marked `data-md="skip"`, with its subtree.
 *
 * WHY: a Markdown twin is the passage an answer engine quotes, and a quoted
 * passage must not carry a call to action — the CTA is the one part of the page
 * that means nothing outside it. The marker lives on the component (rather than
 * a tag-name blocklist here) so the HTML a human reads is untouched and the
 * decision stays next to the markup it describes.
 *
 * Nesting is handled by counting opens and closes of the same tag name, so a
 * skipped <aside> containing another <aside> still ends at the right place.
 */
function stripSkipped(html) {
  const marker = /<([a-z][a-z0-9]*)\b[^>]*\bdata-md="skip"[^>]*>/i;
  let out = html;
  for (let guard = 0; guard < 500; guard++) {
    const open = out.match(marker);
    if (!open || open.index == null) break;
    const tag = open[1].toLowerCase();
    const selfClosing = /\/>$/.test(open[0]);
    if (selfClosing) {
      out = out.slice(0, open.index) + out.slice(open.index + open[0].length);
      continue;
    }
    const scan = new RegExp(`<(/?)${tag}\\b[^>]*?(/?)>`, "gi");
    scan.lastIndex = open.index + open[0].length;
    let depth = 1;
    let end = -1;
    let m;
    while ((m = scan.exec(out))) {
      if (m[1] === "/") depth--;
      else if (m[2] !== "/") depth++;
      if (depth === 0) {
        end = m.index + m[0].length;
        break;
      }
    }
    // Unbalanced markup: drop the opening tag only, never the rest of the page.
    if (end === -1) {
      out = out.slice(0, open.index) + out.slice(open.index + open[0].length);
      continue;
    }
    out = out.slice(0, open.index) + out.slice(end);
  }
  return out;
}

/* -------------------------------------------------- html → markdown (inline) */

function inline(html) {
  let s = html;
  s = s.replace(/<br\s*\/?>/gi, "  \n");
  s = s.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => {
    const inner = inline(t).trim();
    return inner ? `**${inner}**` : "";
  });
  s = s.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => {
    const inner = inline(t).trim();
    return inner ? `*${inner}*` : "";
  });
  s = s.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, t) => {
    const inner = textOf(t);
    return inner ? `\`${inner}\`` : "";
  });
  s = s.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (_, a, t) => {
    const label = inline(t).trim();
    let href = attr(a, "href");
    if (!label) return "";
    if (!href || href.startsWith("#")) return label;
    if (href.startsWith("/")) href = SITE + href;
    return `[${label}](${href})`;
  });
  s = s.replace(/<[^>]+>/g, "");
  return decodeEntities(s).replace(/[ \t]+/g, " ");
}

/* --------------------------------------------------- html → markdown (block) */

/**
 * @param {string} html
 * @param {string[]|null} outerBlocks  Stash shared with the caller. Code fences
 *   and block lists are parked in it and restored only by the ROOT call, so the
 *   tag-stripping and whitespace-collapsing passes below never see finished
 *   Markdown. A recursive call must share the caller's stash — with its own, a
 *   token minted outside would resolve to nothing and the code block would
 *   silently disappear.
 */
function toMarkdown(html, outerBlocks = null) {
  let s = html;
  const isRoot = outerBlocks === null;
  const blocks = outerBlocks ?? [];

  // Conversion components opt out by markup, before anything else runs.
  s = stripSkipped(s);

  // Drop everything that is chrome, script or decoration.
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, "");
  s = s.replace(/<svg[\s\S]*?<\/svg>/gi, "");
  s = s.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  s = s.replace(/<template[\s\S]*?<\/template>/gi, "");
  s = s.replace(/<form[\s\S]*?<\/form>/gi, "");
  // The FAQ accordions (FaqAccordionV3, FaqV3, FaqV3Es) render
  // each question AND its answer inside the disclosure <button>, so the generic
  // strip below erased every Q&A from the twins — the answers carry the
  // strongest material on the comparison pages. Unwrap the disclosure buttons
  // first, keeping the heading and the answer paragraph; the "+" indicator and
  // every other button (CTAs, toggles) still get dropped.
  s = s.replace(/<button\b[^>]*\baria-expanded=[^>]*>([\s\S]*?)<\/button>/gi, (_, inner) => {
    const q = inner.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/i);
    const a = inner.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
    return q && a ? `<h3>${q[1]}</h3><p>${a[1]}</p>` : "";
  });
  s = s.replace(/<button[\s\S]*?<\/button>/gi, "");
  s = s.replace(/<nav\b[\s\S]*?<\/nav>/gi, "");
  s = s.replace(/<[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/[a-z]+>/gi, "");

  // Restore the boundaries the markup implied but the text does not. Without
  // this, adjacent inline chips collapse into "July 24, 20265 min readBy…".
  s = s.replace(/<\/(div|section|article|aside|header|footer|dl|dd|dt|figure|figcaption)>/gi, "\n\n");
  // Data chips rendered as siblings with no whitespace between them — the plan
  // cards ("<strong>Agentic</strong><b>€0</b><span>1M human events</span>") are
  // the worst case: they used to collapse into "**Agentic****€0**1M human
  // events", which is unreadable and unquotable. Zero whitespace between two
  // inline tags is the signal that these are separate cells of one row rather
  // than a formatted phrase, so a separator is correct where a space is not.
  // At least one side must be bold: that is what distinguishes a chip row from
  // ordinary inline emphasis.
  const INLINE_CHIP = "strong|b|span|em|i|time|small|label|code";
  s = s.replace(
    new RegExp(`</(${INLINE_CHIP})><(${INLINE_CHIP})\\b`, "gi"),
    (m, close, open) =>
      /^(strong|b)$/i.test(close) || /^(strong|b)$/i.test(open)
        ? `</${close}> · <${open}`
        : m
  );

  // Only the chip-ish inline tags. Emphasis and links are excluded on purpose:
  // they routinely sit right before punctuation, and a space there would
  // produce "**bold** ." in the output.
  s = s.replace(/<\/(span|time|small|label)>/gi, (m) => m + " ");

  const out = [];

  // Tables first — they carry comparison data AI engines quote directly.
  s = s.replace(/<table\b[^>]*>([\s\S]*?)<\/table>/gi, (_, body) => {
    const rows = [...body.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
      [...r[1].matchAll(/<(t[hd])\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((c) =>
        inline(c[2]).replace(/\|/g, "\\|").replace(/\s+/g, " ").trim()
      )
    ).filter((r) => r.length);
    if (!rows.length) return "";
    const width = Math.max(...rows.map((r) => r.length));
    const pad = (r) => [...r, ...Array(width - r.length).fill("")];
    const [head, ...rest] = rows;
    return (
      "\n\n@@TABLE@@" +
      [
        `| ${pad(head).join(" | ")} |`,
        `| ${Array(width).fill("---").join(" | ")} |`,
        ...rest.map((r) => `| ${pad(r).join(" | ")} |`),
      ].join("\n@@TABLE@@") +
      "\n\n"
    );
  });

  // Stashed, not tokenised in place: the `inline()` pass near the end collapses
  // runs of spaces, which silently destroyed the indentation of every code
  // sample in every twin. A config snippet an agent copies has to survive
  // verbatim.
  s = s.replace(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi, (_, code) => {
    const langMatch = code.match(/language-([a-z0-9]+)/i);
    const body = decodeEntities(code.replace(/<[^>]+>/g, "")).replace(/^\n+|\n+$/g, "");
    blocks.push(`\`\`\`${langMatch ? langMatch[1] : ""}\n${body}\n\`\`\``);
    return `\n\n@@BLOCK${blocks.length - 1}@@\n\n`;
  });

  s = s.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, t) => {
    const body = inline(t.replace(/<\/?p[^>]*>/gi, "\n")).trim();
    if (!body) return "";
    return "\n\n" + body.split("\n").filter(Boolean).map((l) => `> ${l.trim()}`).join("\n> \n") + "\n\n";
  });

  // A run of anchors with nothing between them is a set of destinations, not a
  // sentence — related-article rails and comparison footers render this way.
  // Left alone they collapse into one unreadable line of concatenated titles,
  // so promote the run to a list and let each destination have its own line.
  // Card links — an <a> wrapping a whole teaser: eyebrow, heading, standfirst,
  // read-time. Treated as an inline link they produce one `[everything](url)`
  // blob per card and the headings vanish from the document outline. Unwrap
  // them so the card keeps its structure, and restate the destination as one
  // ordinary link underneath, labelled with the card's own heading.
  s = s.replace(
    /<a\b([^>]*)>((?:(?!<\/a>)[\s\S])*?<(?:h[1-6]|p)\b[\s\S]*?)<\/a>/gi,
    (whole, attrs, inner) => {
      const href = attr(attrs, "href");
      if (!href) return whole;
      // Label the restated link with the card's own title: its heading where it
      // has one, otherwise the first line of its text.
      const label =
        textOf(inner.match(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/i)?.[1] ?? "") ||
        textOf(inner.match(/<(?:strong|b)\b[^>]*>([\s\S]*?)<\/(?:strong|b)>/i)?.[1] ?? "") ||
        textOf(inner).slice(0, 80);
      if (!label) return whole;
      return `<div>${inner}<p><a href="${href}">${label}</a></p></div>`;
    }
  );

  // The anchor pattern refuses to cross a heading, a paragraph or another
  // anchor: an unbalanced `</a>` elsewhere in the document would otherwise let
  // a lazy match run past the page's H1 and swallow it.
  const ANCHOR = "<a\\b[^>]*>(?:(?!<a\\b|</a>|<h[1-6]\\b|<p\\b|<section\\b)[\\s\\S])*?</a>";
  s = s.replace(new RegExp(`(?:${ANCHOR}){2,}`, "gi"), (run) => {
    const items = [...run.matchAll(new RegExp(ANCHOR, "gi"))].map((a) => `<li>${a[0]}</li>`);
    return items.length > 1 ? `<ul>${items.join("")}</ul>` : run;
  });

  // A list whose items carry block content — a procedure with a heading, a
  // paragraph and a code block per step — cannot go through `inline()`: it
  // would flatten the whole step onto one line and drop the fences into the
  // middle of the prose. Such lists are converted recursively and the result is
  // stashed, because the passes below strip tags and collapse whitespace, and
  // finished Markdown must survive them untouched.
  s = s.replace(/<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi, (whole, tag, body) => {
    if (!/<(pre|h[1-6])\b/i.test(body)) return whole;
    let i = 0;
    const items = [...body.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
      .map((m) => toMarkdown(m[1], blocks).trim())
      .filter(Boolean)
      .map((md) => {
        const marker = tag.toLowerCase() === "ol" ? `${++i}. ` : "- ";
        const indent = " ".repeat(marker.length);
        const [head, ...rest] = md.split("\n");
        // A step's own heading becomes the item's first line, not an <h> that
        // would compete with the page's real outline.
        const label = head.replace(/^#{1,6}\s+/, "");
        return [
          marker + label,
          ...rest.map((line) => (line.trim() ? indent + line.replace(/^#{1,6}\s+/, "") : "")),
        ].join("\n");
      });
    if (!items.length) return "";
    blocks.push(items.join("\n\n"));
    return `\n\n@@BLOCK${blocks.length - 1}@@\n\n`;
  });

  s = s.replace(/<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, tag, body) => {
    let i = 0;
    const items = [...body.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
      .map((m) => inline(m[1]).replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .map((t) => (tag.toLowerCase() === "ol" ? `${++i}. ${t}` : `- ${t}`));
    return items.length ? `\n\n${items.join("\n")}\n\n` : "";
  });

  s = s.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, lvl, t) => {
    const title = inline(t).replace(/\s+/g, " ").trim();
    return title ? `\n\n${"#".repeat(Number(lvl))} ${title}\n\n` : "";
  });

  s = s.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => {
    const body = inline(t).replace(/\s+/g, " ").trim();
    return body ? `\n\n${body}\n\n` : "";
  });

  s = s.replace(/<img\b([^>]*)>/gi, (_, a) => {
    const alt = attr(a, "alt");
    let src = attr(a, "src") || "";
    if (src.startsWith("/")) src = SITE + src;
    return alt ? `\n\n![${decodeEntities(alt)}](${src})\n\n` : "";
  });

  // Anything left over becomes loose text.
  s = inline(s);

  s = s
    .replace(/@@FENCE@@/g, "```")
    .replace(/@@TABLE@@/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/ +([.,;:!?)])/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  out.push(s);
  const joined = out.join("\n");
  // Only the root call restores the stash: an inner call resolving it would put
  // finished Markdown back in front of the caller's remaining passes.
  if (!isRoot) return joined;
  // Repeat until stable: a stashed list item can itself contain a stashed code
  // fence, and one pass would leave the inner token in the output. Continuation
  // lines inherit the indentation of the line the token sat on, so a fence
  // inside a numbered step stays inside that step.
  let restored = joined;
  for (let pass = 0; pass < 8 && /@@BLOCK\d+@@/.test(restored); pass++) {
    restored = restored.replace(/^([ \t]*)@@BLOCK(\d+)@@[ \t]*$/gm, (_, indent, n) =>
      (blocks[Number(n)] ?? "")
        .split("\n")
        .map((line) => (line.trim() ? indent + line : ""))
        .join("\n")
    );
  }
  // Anything still unresolved was not alone on its line; substitute plainly.
  restored = restored.replace(/@@BLOCK(\d+)@@/g, (_, n) => blocks[Number(n)] ?? "");
  return restored.replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n");
}

/* --------------------------------------------------------------- extraction */

function mainContent(html) {
  const opening = html.match(/<main\b[^>]*\bid="main-content"[^>]*>/i);
  if (!opening || opening.index == null) return null;
  const from = opening.index + opening[0].length;
  const end = html.lastIndexOf("</main>");
  if (end <= from) return null;
  return html.slice(from, end);
}

/** Inner HTML of the first element carrying `attr`, or null. Handles nesting. */
function firstElementWith(html, attr) {
  const open = html.match(new RegExp(`<([a-z][a-z0-9]*)\\b[^>]*\\b${attr}[^>]*>`, "i"));
  if (!open || open.index == null) return null;
  const tag = open[1].toLowerCase();
  const from = open.index + open[0].length;
  const scan = new RegExp(`<(/?)${tag}\\b[^>]*?(/?)>`, "gi");
  scan.lastIndex = from;
  let depth = 1;
  let m;
  while ((m = scan.exec(html))) {
    if (m[1] === "/") depth--;
    else if (m[2] !== "/") depth++;
    if (depth === 0) return html.slice(from, m.index);
  }
  return null;
}

/**
 * The page's own answer-first block (QuickAnswer / TldrBlock), as one line of
 * front matter. An agent that reads only the header of the document still comes
 * away with the answer the page was written to give.
 */
function summaryOf(bodyHtml) {
  const inner = firstElementWith(bodyHtml, 'data-speakable');
  if (!inner) return null;
  const text = textOf(inner.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ""));
  if (text.length < 40) return null;
  if (text.length <= 320) return text;
  const cut = text.slice(0, 320);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" ")))}…`;
}

/** Author of record, read from the page's own Article JSON-LD. */
function authorOf(html) {
  const block = html.match(/"author"\s*:\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/);
  if (!block) return null;
  const name = block[1].match(/"name"\s*:\s*"([^"]+)"/)?.[1];
  if (!name) return null;
  const url = block[1].match(/"url"\s*:\s*"([^"]+)"/)?.[1] ?? null;
  return { name: decodeEntities(name), url };
}

function contentTypeFor(route) {
  if (route.startsWith("/blog")) return "blog";
  if (route.startsWith("/glossary")) return "glossary";
  if (route.startsWith("/vs") || route.startsWith("/alternatives")) return "comparison";
  if (route.startsWith("/security") || route.startsWith("/trust") || route.startsWith("/privacy") || route === "/terms/") return "trust-and-legal";
  if (route.startsWith("/platforms") || route.startsWith("/integrations")) return "implementation";
  if (route.startsWith("/for")) return "audience";
  if (route.startsWith("/case-studies")) return "case-study";
  return "product";
}

function ownerFor(type) {
  if (type === "trust-and-legal") return "legal";
  if (type === "implementation") return "engineering";
  if (type === "blog" || type === "glossary") return "content";
  return "web";
}

function priorityFor(route, type) {
  if (type === "trust-and-legal" || type === "implementation") return "critical";
  if (["/", "/product/", "/pricing/", "/how-it-works/", "/security/"].includes(route)) return "critical";
  return "useful";
}

/* -------------------------------------------------------------------- main */

const files = walk(OUT).sort();
let written = 0;
let skippedNoindex = 0;
let skippedNoMain = 0;
const manifest = [];

/**
 * Pass 1 collects every twin without writing one. Pass 2 needs to know the full
 * set of routes that ended up with a twin before it can decide which internal
 * links to rewrite — a link may only point at `.md` if that `.md` exists.
 */
const records = [];

for (const file of files) {
  const rel = path.relative(OUT, file).replace(/\\/g, "/");
  if (!rel.endsWith("index.html")) continue; // trailingSlash build: one per route
  let route = "/" + rel.replace(/index\.html$/, "");
  if (route === "/") route = "/";

  const html = readFileSync(file, "utf8");

  // Never produce a Markdown twin of a page we asked robots not to index.
  const robots = html.match(/<meta name="robots" content="([^"]*)"/i)?.[1] ?? "";
  if (/noindex/i.test(robots)) {
    skippedNoindex++;
    continue;
  }
  if (route.startsWith("/404") || route.startsWith("/_not-found")) continue;

  const body = mainContent(html);
  if (!body) {
    skippedNoMain++;
    continue;
  }

  const md = toMarkdown(body);
  // A twin with almost no prose is noise for an agent — better absent.
  if (md.replace(/[^\p{L}\p{N}]/gu, "").length < 200) {
    skippedNoMain++;
    continue;
  }

  const title = decodeEntities(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "").trim();
  const description = decodeEntities(
    html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? ""
  ).trim();
  const canonical =
    html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] ?? `${SITE}${route}`;
  const lang = html.match(/<html lang="([^"]*)"/i)?.[1] ?? "en";
  const modified =
    html.match(/"dateModified"\s*:\s*"([^"]+)"/)?.[1] ??
    html.match(/"datePublished"\s*:\s*"([^"]+)"/)?.[1] ??
    null;
  const contentType = contentTypeFor(route);
  const owner = ownerFor(contentType);
  const llmPriority = priorityFor(route, contentType);
  const lastVerified = modified ? modified.slice(0, 10) : new Date().toISOString().slice(0, 10);

  const mdPath =
    route === "/"
      ? path.join(OUT, "index.md")
      : path.join(OUT, route.replace(/^\/|\/$/g, "") + ".md");
  const mdUrl = `${SITE}${mdPath.replace(OUT, "").replace(/\\/g, "/")}`;

  const author = authorOf(html);
  const summary = summaryOf(body);

  records.push({
    file,
    html,
    route,
    md,
    mdPath,
    mdUrl,
    title,
    description,
    canonical,
    lang,
    modified,
    contentType,
    owner,
    llmPriority,
    lastVerified,
    author,
    summary,
  });
}

/* ------------------------------------------------- pass 2: links, then write */

/**
 * Keep an agent inside the Markdown surface. A twin whose links all point back
 * at the HTML sends the reader out of the format it came for on the first
 * click; every internal link whose target also has a twin is rewritten to that
 * twin. Targets without one (noindex pages, assets, anchors, redirect stubs)
 * keep their HTML URL, so a rewritten link can never 404.
 */
const twinUrlByRoute = new Map(records.map((r) => [r.route, r.mdUrl]));

function markdownLinks(md) {
  return md.replace(
    /\]\((https:\/\/sealmetrics\.com\/[^)\s]*)\)/g,
    (whole, href) => {
      let url;
      try {
        url = new URL(href);
      } catch {
        return whole;
      }
      if (url.search || url.hash) return whole;
      const route = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
      const twin = twinUrlByRoute.get(route);
      return twin ? `](${twin})` : whole;
    }
  );
}

for (const r of records) {
  const md = markdownLinks(r.md);

  const frontMatter = [
    "---",
    `title: ${JSON.stringify(r.title)}`,
    r.description ? `description: ${JSON.stringify(r.description)}` : null,
    r.summary ? `summary: ${JSON.stringify(r.summary)}` : null,
    `canonical_url: ${JSON.stringify(r.canonical)}`,
    `lang: ${JSON.stringify(r.lang)}`,
    r.author ? `author: ${JSON.stringify(r.author.name)}` : null,
    r.author?.url ? `author_url: ${JSON.stringify(r.author.url)}` : null,
    r.modified ? `date_modified: ${r.modified}` : null,
    `content_type: ${JSON.stringify(r.contentType)}`,
    `owner: ${JSON.stringify(r.owner)}`,
    `llm_priority: ${JSON.stringify(r.llmPriority)}`,
    `last_verified: ${JSON.stringify(r.lastVerified)}`,
    `source: ${SITE}${r.route}`,
    "publisher: Sealmetrics",
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  mkdirSync(path.dirname(r.mdPath), { recursive: true });
  writeFileSync(r.mdPath, `${frontMatter}\n\n${md}\n`);
  written++;
  manifest.push({
    route: r.route,
    md: r.mdUrl,
    canonical: r.canonical,
    markdown: r.mdUrl,
    lang: r.lang,
    content_type: r.contentType,
    owner: r.owner,
    llm_priority: r.llmPriority,
    last_verified: r.lastVerified,
    title: r.title,
    description: r.description,
    ...(r.summary ? { summary: r.summary } : {}),
    ...(r.author ? { author: r.author.name } : {}),
    generated_at: new Date().toISOString(),
  });

  // Advertise the twin from the HTML — only now that it exists.
  const linkTag = `<link rel="alternate" type="text/markdown" href="${r.mdUrl}"/>`;
  if (!r.html.includes('type="text/markdown"')) {
    writeFileSync(r.file, r.html.replace("</head>", `${linkTag}</head>`));
  }
}

// Machine-readable index of every twin, for agents that want to enumerate.
manifest.sort((a, b) => a.route.localeCompare(b.route));
writeFileSync(
  path.join(OUT, "llms-md-index.txt"),
  [
    "# Sealmetrics — Markdown twins of every indexable page",
    "# One clean Markdown document per HTML page. Generated from the rendered",
    "# HTML at build time, so it cannot drift from what a human reads.",
    `# Generated for ${manifest.length} pages.`,
    "",
    ...manifest.map((m) => m.md),
    "",
  ].join("\n")
);
writeFileSync(
  path.join(OUT, "knowledge-manifest.json"),
  `${JSON.stringify({ generated_at: new Date().toISOString(), routes: manifest.sort((a, b) => a.route.localeCompare(b.route)) }, null, 2)}\n`
);

console.log(
  `[generate-markdown] wrote ${written} .md twins ` +
    `(skipped ${skippedNoindex} noindex, ${skippedNoMain} without extractable content)`
);
if (written === 0) {
  console.error("[generate-markdown] produced nothing — that is a build failure.");
  process.exit(1);
}
