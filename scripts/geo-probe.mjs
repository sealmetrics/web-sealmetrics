#!/usr/bin/env node
/**
 * Measures Sealmetrics' share of voice in answer engines, monthly.
 *
 * WHY THIS EXISTS
 * `SEO-STRATEGY.md` §9b defines a prompt tracking list and a scoring method,
 * and the July, August and September runs all logged Perplexity and ChatGPT as
 * "pending manual run" — three months with two thirds of the measurement never
 * taken. A programme nobody can measure is a programme nobody can steer.
 *
 * WHAT IT DOES
 * Reads the prompt table straight out of SEO-STRATEGY.md §9b — the strategy doc
 * is the source of truth, never a copy in this file — runs each prompt against
 * every engine whose API key is present, scores it, and writes both the raw
 * transcript and a report in the shape of `.seo-audit/geo-runs/YYYY-MM.md`.
 *
 * SCORING, per §9b
 *   0  Sealmetrics not named
 *   1  named
 *   2  named AND a sealmetrics.com URL cited as a source
 *
 * HONESTY RULES — these are the point of the script
 *   - An engine with no API key is recorded as "not run". It is NEVER scored 0,
 *     because "we did not ask" and "it did not name us" are different facts and
 *     merging them is how a measurement series starts lying.
 *   - A request that errors is recorded as an error, not as a 0.
 *   - No system prompt mentions Sealmetrics. The whole measurement is worthless
 *     if the model is told the answer.
 *   - Raw responses are written to the .json alongside the report, so any score
 *     can be checked against what the engine actually said.
 *
 * KEYS (environment variables; in CI they come from the repo secrets
 * ANTHROPIC_GEO_APIKEY, OPENAI_GEO_APIKEY, PERPLEXITY_GEO_APIKEY and
 * GEMINI_GEO_APIKEY, mapped in .github/workflows/geo-probe.yml)
 *   ANTHROPIC_API_KEY · OPENAI_API_KEY · PERPLEXITY_API_KEY · GEMINI_API_KEY
 *
 * GEMINI
 *   Runs with the google_search grounding tool, the closest API equivalent of
 *   AI Overviews and AI Mode. Grounding sources come back as Google redirect
 *   URLs, so the cited host is read from each source's title (Google puts the
 *   domain there) and the redirect is kept in the raw .json. GEMINI_MODEL
 *   overrides the model when the default is retired.
 *
 * Run: node scripts/geo-probe.mjs [--out .seo-audit/geo-runs] [--runs 3] [--engines a,b]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");
const STRATEGY = path.join(repoRoot, "SEO-STRATEGY.md");

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const OUT_DIR = path.join(repoRoot, arg("out", ".seo-audit/geo-runs"));
const RUNS = Number(arg("runs", "3"));
const BRAND = /sealmetrics/i;
const BRAND_URL = /sealmetrics\.com/i;

/* ------------------------------------------- the prompt list, from §9b only */

/**
 * Parse the "Prompt tracking list → target asset" table out of §9b.
 * Reading the doc rather than duplicating it means the two can never disagree
 * about what is being measured — the exact failure mode the monthly reports
 * keep flagging in other places.
 */
function readPrompts() {
  if (!existsSync(STRATEGY)) {
    console.error(`[geo-probe] ${path.relative(repoRoot, STRATEGY)} not found.`);
    process.exit(1);
  }
  const doc = readFileSync(STRATEGY, "utf8");
  const section = doc.slice(doc.indexOf("## 9b."));
  if (!section) {
    console.error("[geo-probe] §9b not found in SEO-STRATEGY.md — cannot invent a prompt list.");
    process.exit(1);
  }
  const rows = [...section.matchAll(/^\|\s*(\d+)\s*\|\s*(\d)\s*\|\s*([^|]+?)\s*\|/gm)];
  const prompts = rows.map(([, n, tier, text]) => {
    // "best GA4 alternatives for eCommerce / alternativas a Google Analytics"
    const [en, es] = text.split(" / ").map((t) => t.replace(/\*\*/g, "").trim());
    return { n: Number(n), tier: Number(tier), en, es: es ?? null };
  });
  if (!prompts.length) {
    console.error("[geo-probe] found §9b but no prompt rows — refusing to guess.");
    process.exit(1);
  }
  return prompts;
}

/**
 * Two extra probes carried over from the September run. They are diagnostics,
 * not share-of-voice: they test which HOST an engine cites when the brand is
 * named outright, which is the cleanest available test of the multi-host
 * cannibalisation hypothesis in `.seo-audit/geo-runs/2026-09.md` §3c.
 */
const DIAGNOSTICS = [
  { id: "branded-mcp", text: "sealmetrics MCP server connect Claude ChatGPT analytics" },
  { id: "branded-legal", text: "is your analytics actually GDPR compliant legal assessment" },
];

/* ---------------------------------------------------------------- engines */

/** Each returns { text, citations[] } or throws. No engine is told the answer. */
const ENGINES = {
  anthropic: {
    label: "Anthropic (Claude)",
    key: () => process.env.ANTHROPIC_API_KEY,
    async ask(prompt, key) {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-5",
          max_tokens: 2000,
          tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }],
          messages: [{ role: "user", content: prompt }],
        }),
        signal: AbortSignal.timeout(180_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      const data = await res.json();
      const text = (data.content ?? [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n");
      const citations = [];
      const walk = (v) => {
        if (!v || typeof v !== "object") return;
        if (Array.isArray(v)) return v.forEach(walk);
        if (typeof v.url === "string") citations.push(v.url);
        Object.values(v).forEach(walk);
      };
      walk(data.content);
      return { text, citations: [...new Set(citations)] };
    },
  },

  openai: {
    label: "OpenAI (ChatGPT)",
    key: () => process.env.OPENAI_API_KEY,
    async ask(prompt, key) {
      const res = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: "gpt-4.1",
          tools: [{ type: "web_search_preview" }],
          input: prompt,
        }),
        signal: AbortSignal.timeout(180_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      const data = await res.json();
      const citations = [];
      let text = data.output_text ?? "";
      const walk = (v) => {
        if (!v || typeof v !== "object") return;
        if (Array.isArray(v)) return v.forEach(walk);
        if (v.type === "output_text" && typeof v.text === "string" && !text) text += v.text;
        if (typeof v.url === "string") citations.push(v.url);
        Object.values(v).forEach(walk);
      };
      walk(data.output);
      return { text, citations: [...new Set(citations)] };
    },
  },

  gemini: {
    label: "Google (Gemini + Search)",
    key: () => process.env.GEMINI_API_KEY,
    async ask(prompt, key) {
      const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: { "content-type": "application/json", "x-goog-api-key": key },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            tools: [{ google_search: {} }],
          }),
          signal: AbortSignal.timeout(180_000),
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      const data = await res.json();
      const candidate = data.candidates?.[0] ?? {};
      const text = (candidate.content?.parts ?? [])
        .map((p) => p.text)
        .filter(Boolean)
        .join("\n");
      const chunks = candidate.groundingMetadata?.groundingChunks ?? [];
      // The uri is a vertexaisearch redirect; the title carries the source domain.
      const citations = chunks
        .map((c) => {
          const title = c.web?.title?.trim();
          return title && /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(title) ? `https://${title}/` : c.web?.uri;
        })
        .filter(Boolean);
      return {
        text,
        citations: [...new Set(citations)],
        model,
        grounding: chunks.map((c) => c.web ?? c),
      };
    },
  },

  perplexity: {
    label: "Perplexity",
    key: () => process.env.PERPLEXITY_API_KEY,
    async ask(prompt, key) {
      const res = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: "sonar",
          messages: [{ role: "user", content: prompt }],
        }),
        signal: AbortSignal.timeout(180_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      const data = await res.json();
      return {
        text: data.choices?.[0]?.message?.content ?? "",
        citations: data.citations ?? data.search_results?.map((r) => r.url) ?? [],
      };
    },
  },
};

/* ------------------------------------------------------------------ scoring */

function score({ text, citations }) {
  const cited = citations.some((u) => BRAND_URL.test(u)) || BRAND_URL.test(text);
  if (cited) return 2;
  return BRAND.test(text) ? 1 : 0;
}

/** Vendor names an engine reached for instead. Useful signal, cheap to collect. */
const RIVALS = [
  "Matomo", "Plausible", "Fathom", "Piwik PRO", "Umami", "PostHog", "Simple Analytics",
  "Adobe Analytics", "Google Analytics", "GA4", "Mixpanel", "Amplitude", "Piano Analytics",
  "Countly", "Cloudflare", "Heap", "Clicky",
];
const rivalsIn = (text) => RIVALS.filter((r) => new RegExp(`\\b${r}\\b`, "i").test(text));

/* --------------------------------------------------------------------- run */

const prompts = readPrompts();
const requested = arg("engines", "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const active = [];
const skipped = [];
for (const [id, engine] of Object.entries(ENGINES)) {
  if (requested.length && !requested.includes(id)) continue;
  if (engine.key()) active.push([id, engine]);
  else skipped.push([id, engine]);
}

console.log(`[geo-probe] ${prompts.length} prompts from SEO-STRATEGY.md §9b`);
console.log(`[geo-probe] engines with a key: ${active.map(([id]) => id).join(", ") || "none"}`);
for (const [id, e] of skipped) {
  console.log(`[geo-probe] ${id} (${e.label}): NOT RUN — no API key. Recorded as not run, never as 0.`);
}
if (!active.length) {
  console.error(
    "[geo-probe] no engine has a key, so there is nothing to measure. " +
      "Set ANTHROPIC_API_KEY, OPENAI_API_KEY, PERPLEXITY_API_KEY and/or GEMINI_API_KEY. " +
      "Refusing to emit a report with fabricated scores."
  );
  process.exit(1);
}

const results = [];
const tasks = [
  ...prompts.flatMap((p) =>
    [
      { id: `${p.n}-en`, tier: p.tier, lang: "en", text: p.en, kind: "sov" },
      p.es ? { id: `${p.n}-es`, tier: p.tier, lang: "es", text: p.es, kind: "sov" } : null,
    ].filter(Boolean)
  ),
  ...DIAGNOSTICS.map((d) => ({ ...d, tier: null, lang: "en", kind: "diagnostic" })),
];

for (const task of tasks) {
  for (const [engineId, engine] of active) {
    const key = engine.key();
    const runs = [];
    for (let i = 0; i < RUNS; i++) {
      try {
        const answer = await engine.ask(task.text, key);
        runs.push({ ...answer, score: score(answer), rivals: rivalsIn(answer.text) });
      } catch (err) {
        // An error is an error. Scoring it 0 would say the engine answered and
        // did not name us, which is a different and untrue claim.
        runs.push({ error: String(err.message).slice(0, 300) });
      }
    }
    const scored = runs.filter((r) => typeof r.score === "number").map((r) => r.score);
    const modal = scored.length
      ? [...scored].sort((a, b) => scored.filter((s) => s === b).length - scored.filter((s) => s === a).length)[0]
      : null;
    results.push({ ...task, engine: engineId, runs, score: modal, errors: runs.filter((r) => r.error).length });
    console.log(
      `  ${task.id.padEnd(10)} ${engineId.padEnd(11)} ` +
        (modal === null ? "ERROR" : `score ${modal}`) +
        (runs.some((r) => r.error) ? `  (${runs.filter((r) => r.error).length}/${RUNS} failed)` : "")
    );
  }
}

/* ------------------------------------------------------------------ report */

const now = new Date();
const stamp = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
mkdirSync(OUT_DIR, { recursive: true });

writeFileSync(
  path.join(OUT_DIR, `${stamp}.json`),
  `${JSON.stringify({ generated_at: now.toISOString(), runs_per_prompt: RUNS, results }, null, 2)}\n`
);

const sov = (engineId) => {
  const rows = results.filter((r) => r.engine === engineId && r.kind === "sov" && r.score !== null);
  if (!rows.length) return null;
  return Math.round((rows.reduce((a, r) => a + r.score, 0) / (rows.length * 2)) * 1000) / 10;
};
const won = (engineId) =>
  results.filter((r) => r.engine === engineId && r.kind === "sov" && r.score >= 1).length;

/** §9b log: a prompt is won when any measured engine names Sealmetrics, in EN or ES. */
const promptsWon = new Set(
  results.filter((r) => r.kind === "sov" && r.score >= 1).map((r) => r.id.split("-")[0])
).size;

/** §9b log: SOV over tier 1 and 2 prompts, across every engine that was measured. */
const tier12 = (() => {
  const rows = results.filter((r) => r.kind === "sov" && r.tier <= 2 && r.score !== null);
  if (!rows.length) return null;
  return Math.round((rows.reduce((a, r) => a + r.score, 0) / (rows.length * 2)) * 1000) / 10;
})();
/** "not run" means no key; an engine that ran but never answered is "errors", not a score and not "not run". */
const cell = (engineId) => {
  if (!active.some(([id]) => id === engineId)) return "not run";
  const v = sov(engineId);
  return v === null ? "errors" : `${v}%`;
};

const lines = [];
lines.push(`# GEO prompt-run — ${now.toLocaleString("en", { month: "long", year: "numeric", timeZone: "UTC" })}`);
lines.push("");
lines.push(`**Run date:** ${now.toISOString().slice(0, 10)}`);
lines.push('**Playbook:** SEO-STRATEGY.md §9b, read at run time — the prompt list is not duplicated in the script.');
lines.push(`**Runs per prompt-engine pair:** ${RUNS}, scored on the modal result.`);
lines.push(`**Engines measured:** ${active.map(([, e]) => e.label).join(" · ") || "none"}`);
if (skipped.length) {
  lines.push(
    `**Engines NOT run (no API key):** ${skipped.map(([, e]) => e.label).join(" · ")}. ` +
      "Absent from the scores below — not counted as 0."
  );
}
lines.push("**Prepared by:** `scripts/geo-probe.mjs`. Raw responses are in the .json beside this file.");
lines.push("");
lines.push("## 1. Share of voice");
lines.push("");
lines.push("| Engine | SOV | Prompts named / scored |");
lines.push("|---|---:|---|");
for (const [id, engine] of active) {
  const scoredCount = results.filter((r) => r.engine === id && r.kind === "sov" && r.score !== null).length;
  lines.push(`| ${engine.label} | ${cell(id)} | ${won(id)} / ${scoredCount} |`);
}
lines.push("");
lines.push("## 2. Per-prompt scores");
lines.push("");
lines.push(`| # | Tier | Lang | Prompt | ${active.map(([, e]) => e.label).join(" | ")} | Competitors named |`);
lines.push(`|---|---|---|---|${active.map(() => "---").join("|")}|---|`);
for (const task of tasks.filter((t) => t.kind === "sov")) {
  const cells = active.map(([id]) => {
    const r = results.find((x) => x.engine === id && x.id === task.id);
    return r?.score === null || r === undefined ? "err" : String(r.score);
  });
  const rivals = [
    ...new Set(
      results
        .filter((r) => r.id === task.id)
        .flatMap((r) => r.runs.flatMap((run) => run.rivals ?? []))
    ),
  ];
  lines.push(
    `| ${task.id.split("-")[0]} | ${task.tier} | ${task.lang} | ${task.text.slice(0, 60)} | ` +
      `${cells.join(" | ")} | ${rivals.slice(0, 8).join(", ") || "—"} |`
  );
}
lines.push("");
lines.push("## 3. Diagnostics — which host gets cited");
lines.push("");
lines.push("Brand-named probes. They do not count toward SOV; they test whether the marketing site or");
lines.push("`docs.sealmetrics.com` wins on a query where the brand is stated outright — the multi-host");
lines.push("question raised in `.seo-audit/geo-runs/2026-09.md` §3c.");
lines.push("");
lines.push("| Probe | Engine | Sealmetrics hosts cited |");
lines.push("|---|---|---|");
for (const r of results.filter((x) => x.kind === "diagnostic")) {
  const hosts = [
    ...new Set(
      r.runs
        .flatMap((run) => run.citations ?? [])
        .filter((u) => BRAND_URL.test(u))
        .map((u) => {
          try {
            return new URL(u).host;
          } catch {
            return null;
          }
        })
        .filter(Boolean)
    ),
  ];
  lines.push(`| ${r.id} | ${r.engine} | ${hosts.join(", ") || "none cited"} |`);
}
lines.push("");
lines.push("## 4. Log row for SEO-STRATEGY.md §9b");
lines.push("");
lines.push("```");
lines.push(
  `| ${now.toLocaleString("en", { month: "short", year: "numeric", timeZone: "UTC" })} (run) | ` +
    `${cell("perplexity")} | ${cell("openai")} | ${cell("anthropic")} | ${cell("gemini")} | ` +
    `${tier12 === null ? "—" : `${tier12}%`} | ${promptsWon}/${prompts.length} | ` +
    `Automated run via scripts/geo-probe.mjs. |`
);
lines.push("```");
lines.push("");

const reportPath = path.join(OUT_DIR, `${stamp}.md`);
writeFileSync(reportPath, `${lines.join("\n")}\n`);
console.log(`[geo-probe] wrote ${path.relative(repoRoot, reportPath)} and the raw .json beside it.`);
