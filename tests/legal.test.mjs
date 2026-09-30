import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  parseBlocks,
  parseInline,
  inlineText,
  prepareDocument,
  slugify,
} from "../src/lib/legal/markdown.mjs";
import { DOCUMENTS, stripInternalNote, transform } from "../scripts/sync-legal.mjs";

const ROOT = join(import.meta.dirname, "..");
const LEGAL = join(ROOT, "src/lib/content/legal");
const read = (name) => readFileSync(join(LEGAL, name), "utf8");
const documentsTs = readFileSync(join(ROOT, "src/lib/legal/documents.ts"), "utf8");

test("the internal note of the canonical policy never reaches the website", () => {
  for (const [, target] of DOCUMENTS) {
    const text = read(target);
    assert.doesNotMatch(text, /Nota interna|Internal note|no publicar|do not publish/i, target);
  }
});

/** The text a reader takes as current: everything but the version history, which
 * quotes old wording on purpose ("Data Studio instead of Looker Studio"). */
const current = (text) => text.split(/^## (?:Version history|Historial de versiones)/im)[0];

test("what the documents say matches the product as it is", () => {
  for (const [, target] of DOCUMENTS) {
    const text = current(read(target));
    assert.doesNotMatch(text, /Looker Studio/, `${target}: the product is Data Studio`);
    assert.doesNotMatch(text, /[❌✅]/u, `${target}: no emojis on the website`);
    // Retired on 30 Sep 2026: bots are still detected, AI-agent traffic is not.
    assert.doesNotMatch(text, /AI agents|agentes de IA|agent detection|detección de agentes/i, target);
  }
});

test("stripInternalNote removes the whole note and nothing after it", () => {
  const source = [
    "# Title",
    "",
    "**Version:** 4.0",
    "",
    "> **Internal note (do not publish):**",
    "> - one",
    ">   - two",
    "",
    "---",
    "",
    "## 1. Who we are",
    "> A quote the reader should see.",
  ].join("\n");
  const out = stripInternalNote(source);
  assert.doesNotMatch(out, /Internal note|one|two/);
  assert.match(out, /## 1\. Who we are/);
  assert.match(out, /> A quote the reader should see\./);
});

test("an addition is inserted before its heading, or the sync refuses", () => {
  const md = "## 6. Brand report\n\ntext\n\n## 7. Connector\n";
  const additions = { "privacy.en.md": { before: /^## 7\. /m, file: "x.md" } };
  const out = transform(md, "privacy.en.md", () => "### 6.1 Studies\n\nbody\n", additions);
  assert.ok(out.indexOf("### 6.1 Studies") < out.indexOf("## 7. Connector"));
  assert.throws(() => transform("## 6. Only\n", "privacy.en.md", () => "x", additions));
});

test("the versions and dates the pages show are the documents' own", () => {
  const block = /LEGAL_DOCUMENTS[^=]*=\s*\{([\s\S]*?)\n\};/.exec(documentsTs)[1];
  const facts = Object.fromEntries(
    [...block.matchAll(/"?([\w-]+)"?:\s*\{\s*version:\s*"([^"]+)",\s*updated:\s*"([^"]+)"/g)].map(
      ([, id, version, updated]) => [id, { version, updated }],
    ),
  );
  for (const locale of ["en", "es"]) {
    for (const id of ["privacy", "terms"]) {
      const { meta } = prepareDocument(read(`${id}.${locale}.md`), { extractMeta: true });
      assert.ok(meta.version.startsWith(facts[id].version), `${id}.${locale}: ${meta.version}`);
      assert.ok(meta.updated, `${id}.${locale} states its date`);
    }
    assert.match(read(`dpa.${locale}.md`), new RegExp(`DPA-2026-v${facts.dpa.version.replace(".", "\\.")}`));
    assert.match(read(`dpa.${locale}.md`), new RegExp(`\\| ${facts.dpa.version.replace(".", "\\.")}[^|]*\\| ${facts.dpa.updated}`));
    assert.match(
      read(`privacy-template.${locale}.md`),
      new RegExp(`${facts["privacy-template"].version.replace(".", "\\.")} \\(${facts["privacy-template"].updated}\\)`),
    );
  }
});

test("every link of the Terms' table of contents lands on a heading", () => {
  for (const locale of ["en", "es"]) {
    const { body } = prepareDocument(read(`terms.${locale}.md`), { extractMeta: true });
    const ids = new Set(parseBlocks(body).filter((b) => b.type === "heading").map((b) => b.id));
    const anchors = [...body.matchAll(/\]\(#([^)]+)\)/g)].map((m) => m[1]);
    assert.equal(anchors.length, 20, `terms.${locale} has its twenty chapters`);
    for (const anchor of anchors) assert.ok(ids.has(anchor), `terms.${locale}: #${anchor}`);
  }
});

test("the page shows one heading level 1: the document's own H1 is dropped", () => {
  for (const [, target] of DOCUMENTS) {
    const { title, body } = prepareDocument(read(target), { extractMeta: true });
    assert.ok(title, `${target} has a title`);
    assert.doesNotMatch(body, /^# /m, target);
  }
});

test("the customer template keeps its six blocks, A to F, in both languages", () => {
  for (const locale of ["en", "es"]) {
    const blocks = parseBlocks(prepareDocument(read(`privacy-template.${locale}.md`)).body);
    const letters = blocks
      .filter((b) => b.type === "heading" && b.level === 3)
      .map((b) => /^(?:Block|Bloque) ([A-F])\b/.exec(b.raw)?.[1])
      .filter(Boolean);
    assert.deepEqual(letters, ["A", "B", "C", "D", "E", "F"], locale);
  }
});

test("inline Markdown: bold, italic, code and links, and nothing else becomes markup", () => {
  const tokens = parseInline("**Controller** of *the data*, see `clause 5.1` and [the DPA](/dpa) <b>x</b>");
  assert.deepEqual(
    tokens.map((t) => t.t),
    ["strong", "text", "em", "text", "code", "text", "link", "text"],
  );
  assert.equal(inlineText(tokens), "Controller of the data, see clause 5.1 and the DPA <b>x</b>");
});

test("lists nest by indentation and task items keep their box", () => {
  const [list] = parseBlocks("- one\n  - one.a\n  - one.b\n- two\n- [ ] a task\n");
  assert.equal(list.type, "list");
  assert.equal(list.items.length, 3);
  assert.equal(list.items[0].children[0].items.length, 2);
  assert.equal(list.items[2].checked, false);
});

test("heading ids follow GitHub, accents included", () => {
  assert.equal(slugify("1. Introducción y Aceptación"), "1-introducción-y-aceptación");
  assert.equal(slugify("10. Data and Privacy"), "10-data-and-privacy");
});

test("LEGAL_EFFECTIVE_DATE is set before the legal update ships", () => {
  const match = /export const LEGAL_EFFECTIVE_DATE: string \| null = (null|"(\d{4}-\d{2}-\d{2})");/.exec(documentsTs);
  assert.ok(match, "the constant is declared");
  assert.notEqual(
    match[1],
    "null",
    "Fija LEGAL_EFFECTIVE_DATE en src/lib/legal/documents.ts: día de envío del email a clientes + 30 (Términos 17.1, DPA 5.1.b).",
  );
});
