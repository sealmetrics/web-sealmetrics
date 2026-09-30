#!/usr/bin/env node
/**
 * Copy the canonical legal documents from the sealmetrics2 repo into
 * `src/lib/content/legal/`, which is what /privacy, /dpa, /terms and
 * /privacy-template render.
 *
 * The documents are written in sealmetrics2 (`docs/legal/`) and reviewed there;
 * the website only publishes them. Copying the Markdown instead of retyping it
 * into TSX is what keeps the published text identical to the reviewed one — the
 * pages this replaced had drifted into paraphrases of older versions.
 *
 *   node scripts/sync-legal.mjs                       # ../sealmetrics2 at main
 *   SEALMETRICS2_DIR=~/code/sealmetrics2 LEGAL_REF=main node scripts/sync-legal.mjs
 *
 * What the copy changes, and nothing else:
 *   - drops the "Nota interna (no publicar)" / "Internal note (do not publish)" blockquote;
 *   - applies WEB_SUBSTITUTIONS below (each one names why it exists);
 *   - inserts WEB_ADDITIONS, sections the website needs that the canonical text
 *     does not have yet. Each one is a stopgap that belongs in sealmetrics2.
 * The header of every file records the source commit.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const OUT = join(ROOT, "src/lib/content/legal");
const SOURCE = (process.env.SEALMETRICS2_DIR || join(homedir(), "code/sealmetrics2")).replace(
  /^~/,
  homedir(),
);
const REF = process.env.LEGAL_REF || "main";

export const DOCUMENTS = [
  ["docs/legal/PRIVACY_POLICY_DRAFT_EN.md", "privacy.en.md"],
  ["docs/legal/PRIVACY_POLICY_DRAFT.md", "privacy.es.md"],
  ["docs/legal/DPA_CLIENTES_EN.md", "dpa.en.md"],
  ["docs/legal/DPA_CLIENTES.md", "dpa.es.md"],
  ["docs/legal/TERMINOS_DEL_SERVICIO_EN.md", "terms.en.md"],
  ["docs/legal/TERMINOS_DEL_SERVICIO.md", "terms.es.md"],
  ["docs/legal/TEMPLATE_PRIVACY_POLICY_CLIENTES_EN.md", "privacy-template.en.md"],
  ["docs/legal/TEMPLATE_PRIVACY_POLICY_CLIENTES.md", "privacy-template.es.md"],
];

/**
 * [pattern, replacement, reason]. Applied to every document. Keep this list short:
 * a substitution is a disagreement with the canonical text, and each one should be
 * fixed in sealmetrics2 and then deleted from here.
 */
export const WEB_SUBSTITUTIONS = [
  // Google reversed the 2022 rebrand in April 2026: the product is Data Studio again.
  // Confirmed by Rafa on 30 Sep 2026; the canonical v4.0 still says Looker Studio.
  [/Looker Studio/g, "Data Studio", "product name"],
  // CLAUDE.md: no emojis on the website. The template's "what not to write" table
  // uses them as column headers.
  [/❌ ?/g, "", "no emojis"],
  [/✅ ?/g, "", "no emojis"],
  // The house spelling, enforced by the build (`nonstandard-spelling` in seo-audit).
  // The DPA writes "e-commerce integrations"; the meaning does not change.
  [/\be-commerce\b/g, "eCommerce", "house spelling"],
];

/**
 * Sections inserted before a heading of the canonical text. The downloadable
 * sector studies (published 23 Sep 2026, section 10 of the previous page) collect
 * an email address and are not in the v4.0 draft; dropping them would leave a live
 * form undisclosed.
 */
export const WEB_ADDITIONS = {
  "privacy.en.md": { before: /^## 7\. /m, file: "additions/privacy-sector-studies.en.md" },
  "privacy.es.md": { before: /^## 7\. /m, file: "additions/privacy-sector-studies.es.md" },
};

export function stripInternalNote(markdown) {
  const lines = markdown.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^>\s*\*\*(Nota interna|Internal note)/i.test(lines[i])) {
      while (i < lines.length && lines[i].startsWith(">")) i++;
      // The blank line that followed the note goes with it.
      if (lines[i] === "") continue;
      i--;
      continue;
    }
    out.push(lines[i]);
  }
  return out.join("\n");
}

export function transform(markdown, target, readAddition) {
  let text = stripInternalNote(markdown);
  for (const [pattern, replacement] of WEB_SUBSTITUTIONS) {
    text = text.replace(pattern, replacement);
  }
  const addition = WEB_ADDITIONS[target];
  if (addition) {
    const match = text.match(addition.before);
    if (!match) throw new Error(`${target}: no heading matches ${addition.before}`);
    const block = readAddition(addition.file).trim();
    text = `${text.slice(0, match.index)}${block}\n\n${text.slice(match.index)}`;
  }
  return text;
}

function main() {
  if (!existsSync(SOURCE)) {
    console.error(`sealmetrics2 not found at ${SOURCE}; set SEALMETRICS2_DIR`);
    process.exit(1);
  }
  const git = (...args) => execFileSync("git", ["-C", SOURCE, ...args], { encoding: "utf8" });
  const sha = git("rev-parse", "--short", REF).trim();
  for (const [source, target] of DOCUMENTS) {
    const raw = git("show", `${REF}:${source}`);
    const body = transform(raw, target, (file) => readFileSync(join(OUT, file), "utf8"));
    const header =
      `<!-- Generated by scripts/sync-legal.mjs from sealmetrics2 ${REF}:${source} @ ${sha}. ` +
      `Edit the source, not this file. -->\n`;
    writeFileSync(join(OUT, target), header + body);
    console.log(`${target} ← ${source} @ ${sha}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
