// The calculators derive from two approved inputs only (client experience,
// founder decision 2026-09-21): 40–60% of traffic doesn't accept cookies, and
// of those who accept, 40% don't accept on the first pageview. These tests pin
// the derivation so a new invented coefficient can't slip back in unnoticed.

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync("src/lib/calculators/consent-model.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const model = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} !== ${b}`);

test("at 40% rejection GA4 sees 60% of visits and attributes 36%", () => {
  const s = model.consentShares({ rejection: 0.4 });
  close(s.seen, 0.6);
  close(s.attributed, 0.36);
  close(s.seenWithoutSource, 0.24);
  close(s.unseen, 0.4);
});

test("at 60% rejection GA4 sees 40% of visits and attributes 24%", () => {
  const s = model.consentShares({ rejection: 0.6 });
  close(s.seen, 0.4);
  close(s.attributed, 0.24);
  close(s.seenWithoutSource, 0.16);
  close(s.unseen, 0.6);
});

test("rejection is clamped to the approved 40–60% range, default 50%", () => {
  close(model.consentShares({ rejection: 0.1 }).rejection, 0.4);
  close(model.consentShares({ rejection: 0.9 }).rejection, 0.6);
  close(model.consentShares().rejection, 0.5);
});

test("ad blockers and early exits default to zero and only apply when supplied", () => {
  close(model.consentShares({ rejection: 0.5 }).seen, 0.5);
  close(model.consentShares({ rejection: 0.5, adBlockers: 0.2 }).seen, 0.4);
  close(model.consentShares({ rejection: 0.5, adBlockers: 0.2, earlyExits: 0.5 }).seen, 0.2);
});

test("the range helper returns both ends", () => {
  const r = model.consentRange();
  close(r.low.seen, 0.6);
  close(r.high.seen, 0.4);
});
