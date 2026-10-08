// Regression guard for the duplicate-entrance bug: the pixel used to be
// re-injected on every route change. Removing the <script> element does not
// unload the code it already ran, so each re-injection left one more live
// tracker behind and every one of them fired its own pageview on the next
// navigation — 1, 2, 3, 4 … hits per route change, each with a fresh token, so
// the backend counted them as new entrances.
//
// Also guards the dual-tagging contract. Every t.js ends with an unconditional
// `window.sealmetrics = <its own instance>`, so with two tags the global only
// points at whichever loaded last; the module has to capture each instance in
// its own onload and fan every call out to both, or one account silently
// receives nothing.
//
// The contract: each tag is requested exactly ONCE per document, in manual mode
// (auto=0&spa=0), and every pageview/event reaches BOTH accounts exactly once.

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync("src/lib/analytics.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

// A fresh module instance per test — the module keeps load state in closures.
// Each injected <script> gets its own tracker instance, mirroring what t.js
// does: on execution it overwrites window.sealmetrics with itself.
async function loadAnalytics() {
  const scripts = [];
  const received = new Map(); // account id -> [{ kind, ... }]

  globalThis.document = {
    readyState: "complete",
    createElement: () => ({}),
    head: { appendChild: (node) => scripts.push(node) },
  };
  globalThis.window = { addEventListener: () => {}, sealmetrics: undefined };

  const analytics = await import(
    `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}#${Math.random()}`
  );

  // Simulate each tag loading: it claims the global, then fires its onload.
  function loadTag(script) {
    const id = new URL(script.src).searchParams.get("id");
    const log = [];
    received.set(id, log);

    const api = (options) => log.push({ kind: "pageview", group: options?.group ?? null });
    api.micro = (event, props) => log.push({ kind: "micro", event, props });
    api.conv = (event, value) => log.push({ kind: "conv", event, value });

    globalThis.window.sealmetrics = api; // unconditional, exactly like t.js
    script.onload?.();
  }

  const loadAll = () => scripts.forEach(loadTag);
  return { analytics, scripts, received, loadAll, loadTag };
}

const accounts = ["sealmetrics2", "sealmetricsv2"];

test("both tags are requested once, in manual mode, however many route changes", async () => {
  const { analytics, scripts, loadAll } = await loadAnalytics();

  analytics.pageview("home");
  loadAll();
  analytics.pageview("product");
  analytics.pageview("pricing");
  analytics.pageview("blog");

  assert.equal(scripts.length, 2, "exactly one <script> per account, never re-injected");

  const byId = Object.fromEntries(
    scripts.map((s) => {
      const u = new URL(s.src);
      return [u.searchParams.get("id"), u];
    })
  );
  assert.deepEqual(Object.keys(byId).sort(), [...accounts].sort());

  assert.equal(byId.sealmetrics2.origin, "https://pixel-pre.sealmetrics.com");
  assert.equal(byId.sealmetricsv2.origin, "https://t.sealmetrics.com");

  for (const id of accounts) {
    assert.equal(byId[id].pathname, "/t.js");
    assert.equal(byId[id].searchParams.get("auto"), "0", `${id}: auto=0 gates the initial pageview`);
    assert.equal(byId[id].searchParams.get("spa"), "0", `${id}: spa=0 gates the SPA listener`);
    assert.equal(byId[id].searchParams.get("group"), null, "the group travels per pageview, not on the script URL");
  }
});

test("every route change sends exactly one pageview to EACH account", async () => {
  const { analytics, received, loadAll } = await loadAnalytics();

  analytics.pageview("home");
  loadAll();
  analytics.pageview("product");
  analytics.pageview("pricing");

  for (const id of accounts) {
    assert.deepEqual(
      received.get(id).map((h) => h.group),
      ["home", "product", "pricing"],
      `${id} must receive each pageview exactly once, with its own group`
    );
  }
});

test("micro and conv events fan out to both accounts", async () => {
  const { analytics, received, loadAll } = await loadAnalytics();

  analytics.pageview("home");
  loadAll();
  analytics.micro("scroll_50");
  analytics.conv("lead", 0);
  analytics.pushEvent({ event: "demo_request", email: "a@b.com" });

  for (const id of accounts) {
    const log = received.get(id);
    assert.deepEqual(
      log.filter((h) => h.kind !== "pageview").map((h) => `${h.kind}:${h.event}`),
      ["micro:scroll_50", "conv:lead", "conv:lead"],
      `${id} must receive every event exactly once`
    );
    assert.ok(
      log.every((h) => !h.props || !("email" in h.props)),
      `${id}: PII must never reach the pixel`
    );
  }
});

test("the brand report request is a mapped microconversion, and carries no email", async () => {
  // It used to call pushEvent with a name that was not in EVENT_MAP, so the
  // `!mapping` guard dropped every request in silence. The page had a form,
  // the pixel had nothing.
  const { analytics, received, loadAll } = await loadAnalytics();

  analytics.pageview("ai-brand-monitoring");
  loadAll();
  analytics.pushEvent({ event: "lead_brand_report", email: "cmo@example.com" });

  for (const id of accounts) {
    const hits = received.get(id).filter((h) => h.kind !== "pageview");
    assert.deepEqual(
      hits.map((h) => `${h.kind}:${h.event}`),
      ["micro:brand_report_request"],
      `${id} must receive the request as a microconversion, exactly once`
    );
    assert.ok(
      hits.every((h) => !h.props || !("email" in h.props)),
      `${id}: the requester's email must never reach the pixel`
    );
  }
});

test("the score-to-report funnel on the brand check is mapped, one microconversion per step", async () => {
  // An unmapped name is dropped in silence by the `!mapping` guard: these three
  // are the funnel Rafa reads (score pressed, report link clicked, report asked).
  const { analytics, received, loadAll } = await loadAnalytics();

  analytics.pageview("other");
  loadAll();
  analytics.pushEvent({ event: "brand_check_submit", language: "es" });
  analytics.pushEvent({ event: "brand_check_report_click", language: "es" });
  analytics.pushEvent({ event: "brand_check_report_request", language: "en" });

  for (const id of accounts) {
    const hits = received.get(id).filter((h) => h.kind !== "pageview");
    assert.deepEqual(
      hits.map((h) => `${h.kind}:${h.event}`),
      ["micro:brand_check_submit", "micro:brand_check_report_click", "micro:brand_check_report_request"],
      `${id} must receive each step exactly once`
    );
  }
});

test("hits fired before a tag finishes loading are queued per account, not dropped", async () => {
  const { analytics, scripts, received, loadTag } = await loadAnalytics();

  analytics.pageview("home");
  analytics.micro("scroll_50");
  assert.equal(received.size, 0, "nothing can be sent before a tracker exists");

  // Tags rarely finish together — drain them one at a time.
  loadTag(scripts[0]);
  assert.deepEqual(
    received.get("sealmetrics2").map((h) => h.kind),
    ["pageview", "micro"],
    "the first tag replays its queue in order"
  );
  assert.equal(received.has("sealmetricsv2"), false, "the slower tag has not replayed yet");

  loadTag(scripts[1]);
  assert.deepEqual(
    received.get("sealmetricsv2").map((h) => h.kind),
    ["pageview", "micro"],
    "the second tag replays the same queue, independently"
  );
});

test("a tag that fails mid-execution never gets another account's instance adopted twice", async () => {
  const { analytics, scripts, received, loadTag } = await loadAnalytics();

  analytics.pageview("home");     // injects both tags, queues the pageview
  loadTag(scripts[0]);            // first tag loads normally, replays the queue
  scripts[1].onload?.();          // second 404s: onload fires, global still tag 1

  assert.deepEqual(
    received.get("sealmetrics2").map((h) => h.group),
    ["home"],
    "the healthy account must be hit once, not twice"
  );
});
