#!/usr/bin/env node
/**
 * STATUS: the headers in `vercel.json` are STAGED, NOT SERVED.
 *
 * Production is GitHub Pages (.github/workflows/deploy.yml), which serves no
 * custom headers at all. So HSTS, X-Frame-Options, X-Content-Type-Options,
 * Referrer-Policy, Permissions-Policy and this CSP exist in the repo and reach
 * nobody. They are a reviewed, drift-checked draft for the Vercel migration in
 * INFRA-MIGRATION.md — not a live security posture.
 *
 * This matters because a repo audit that finds these headers and ticks the box
 * would be wrong, and the site is sold on privacy engineering. This script
 * prints the status on every build so the gap cannot be forgotten quietly.
 *
 * Lints the CSP in `vercel.json` against the origins the source actually loads
 * subresources from. Reports:
 *   - origins loaded in code but missing from the matching directive (fails)
 *   - origins allowlisted but no longer loaded anywhere (warns — see KEEP)
 *
 * Wired into `postbuild`, so `npm run build` fails on drift. Runs standalone
 * with `node scripts/audit-csp.mjs` — it reads source, so it needs no build.
 *
 * Why this exists: on 31 Jul 2026 the drafted CSP was found to be missing four
 * origins. Promoting it to enforcing (step 7 of INFRA-MIGRATION.md) would have
 * killed the analytics pixel, every lead form and every video embed. The pixel
 * one was the trap — `pixel-pre` WAS in the policy, just under `connect-src`,
 * which governs fetch/XHR and not script loading. A human reading the policy
 * sees the hostname and moves on. This gate reads the directive.
 *
 * What it does NOT check: `img-src` (allowlisted as `https:`, so any origin
 * passes) and plain navigations — an `<a href>` or `<a download>` to another
 * origin is not a subresource and needs no directive.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");

/**
 * Origins allowlisted on purpose despite no current usage. Each needs a reason,
 * so this list stays short and reviewable instead of becoming a dumping ground
 * for whatever the gate complained about that day.
 */
const KEEP = {
  "https://www.youtube.com": "headroom for future embeds; today YouTube is only a sameAs in lib/schema.ts",
  "https://www.youtube-nocookie.com": "headroom, as above — the privacy-preserving variant we'd actually use",
  "https://challenges.cloudflare.com":
    "Turnstile — loaded by the @marsidev/react-turnstile dependency, so it never appears in our own source",
  "https://api.sealmetrics.com":
    "audit endpoint, supplied at build time via NEXT_PUBLIC_AUDIT_ENDPOINT rather than a literal",
  "https://sealmetrics-forms.sealmetrics-forms-worker.workers.dev":
    "first-party forms proxy, supplied through NEXT_PUBLIC_FORMS_ENDPOINT with this production fallback",
  "https://pixel-pre.sealmetrics.com":
    "connect-src: t.js beacons events back to its own origin from third-party code we can't scan. Its script-src entry IS verified below — do not confuse the two",
  "https://pixel-pre2.sealmetrics.com":
    "connect-src: same as pixel-pre above — the second preprod tag beacons to its own origin. The site is triple-tagged (pre + pre2 + production); its script-src entry IS verified below",
  "https://t.sealmetrics.com":
    "connect-src: same as pixel-pre above — the production tag beacons to its own /event. The site is triple-tagged (pre + pre2 + production); its script-src entry IS verified below",
};

// ---------------------------------------------------------------------------
// 1. The policy
// ---------------------------------------------------------------------------

const vercelPath = path.join(repoRoot, "vercel.json");
if (!existsSync(vercelPath)) {
  console.error("[audit-csp] vercel.json missing — nothing to lint against.");
  process.exit(1);
}

const vercel = JSON.parse(readFileSync(vercelPath, "utf8"));
const cspHeader = vercel.headers
  ?.flatMap((h) => h.headers ?? [])
  .find((h) => h.key.includes("Content-Security-Policy"));

if (!cspHeader) {
  console.error("[audit-csp] no Content-Security-Policy header found in vercel.json.");
  process.exit(1);
}

/** directive name -> Set of allowlisted sources */
const policy = new Map();
for (const chunk of cspHeader.value.split(";")) {
  const [name, ...sources] = chunk.trim().split(/\s+/);
  if (name) policy.set(name, new Set(sources));
}

// ---------------------------------------------------------------------------
// 2. Environment values, so `${API_BASE}/public/audit` resolves to a real host
// ---------------------------------------------------------------------------

const env = new Map();
for (const file of [".env.production", ".env"]) {
  const p = path.join(repoRoot, file);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (m) env.set(m[1], m[2].replace(/^["']|["']$/g, ""));
  }
}

// ---------------------------------------------------------------------------
// 3. Walk the source
// ---------------------------------------------------------------------------

function sourceFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full));
    else if (/\.(ts|tsx|js|jsx|mjs)$/.test(entry)) out.push(full);
  }
  return out;
}

const originOf = (s) => (s.match(/https:\/\/[a-z0-9.-]+/i) ?? [null])[0];

/**
 * Resolve an expression to an origin. Handles string literals, template
 * literals, module-level consts and `process.env.X`. Anything else is
 * unresolvable — reported separately rather than silently passing.
 */
function resolve(expr, consts) {
  // Strip the opening paren/brace and any quote or backtick, so a template
  // literal like `${PIXEL_HOST}/t.js` exposes its leading interpolation.
  // Missing this is why the first cut of this gate failed to resolve the two
  // origins that were the actual bug.
  const raw = expr.trim().replace(/^[({]\s*/, "").replace(/^[`"']/, "");

  const direct = originOf(raw);
  if (direct) return direct;

  const envRef = raw.match(/process\.env\.([A-Z0-9_]+)/);
  if (envRef && env.has(envRef[1])) return originOf(env.get(envRef[1]));

  // `${IDENT}/path` or a bare IDENT
  const ident = raw.match(/^\$?\{?\s*([A-Za-z_$][\w$]*)\s*\}?/);
  if (ident && consts.has(ident[1])) return originOf(consts.get(ident[1]));

  return null;
}

/** Module-level string consts, including the `const X =\n  "…"` wrap. */
function constTable(src) {
  const table = new Map();
  const re = /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*[`"']([^`"']*)[`"']/g;
  for (const m of src.matchAll(re)) table.set(m[1], m[2]);

  const envRe = /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*process\.env\.([A-Z0-9_]+)/g;
  for (const m of src.matchAll(envRe)) {
    if (env.has(m[2])) table.set(m[1], env.get(m[2]));
  }
  return table;
}

const lineOf = (src, index) => src.slice(0, index).split("\n").length;

/** Each rule maps a subresource-loading syntax to the directive governing it. */
const RULES = [
  {
    directive: "connect-src",
    label: "fetch / sendBeacon / WebSocket",
    re: /(?:fetch|navigator\.sendBeacon|new\s+WebSocket)\s*\(\s*([^,)]+)/g,
  },
  {
    directive: "frame-src",
    label: "<iframe src>",
    re: /<iframe[\s\S]{0,400}?\bsrc=\{?\s*([^}\n>]+?)\s*\}?[\s/>]/g,
  },
  {
    directive: "script-src",
    label: "injected <script src>",
    // Only meaningful when the file actually builds a script element.
    re: /\.src\s*=\s*([^;\n]+)/g,
    requires: /createElement\(\s*["'`]script["'`]\s*\)/,
  },
  {
    directive: "worker-src",
    label: "Worker",
    re: /new\s+(?:Shared)?Worker\s*\(\s*([^,)]+)/g,
  },
];

const found = [];   // { origin, directive, file, line, label }
const unresolved = []; // { file, line, label, expr }

for (const file of sourceFiles(path.join(repoRoot, "src"))) {
  const src = readFileSync(file, "utf8");
  const rel = path.relative(repoRoot, file);
  const consts = constTable(src);

  for (const rule of RULES) {
    if (rule.requires && !rule.requires.test(src)) continue;
    for (const m of src.matchAll(rule.re)) {
      const expr = m[1];
      // Relative URLs and same-origin paths are covered by 'self'.
      if (/^["'`][/.]/.test(expr.trim())) continue;

      const origin = resolve(expr, consts);
      const line = lineOf(src, m.index);
      if (origin) found.push({ origin, directive: rule.directive, file: rel, line, label: rule.label });
      else if (/https:|process\.env|[A-Z_]{3,}/.test(expr)) {
        unresolved.push({ file: rel, line, label: rule.label, expr: expr.trim().slice(0, 60) });
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 4. Compare
// ---------------------------------------------------------------------------

/** A directive falls back to default-src when absent; `https:` allows anything. */
function covers(directive, origin) {
  const sources = policy.get(directive) ?? policy.get("default-src") ?? new Set();
  return sources.has(origin) || sources.has("https:") || sources.has("*");
}

const missing = new Map(); // `directive origin` -> usages
for (const use of found) {
  if (covers(use.directive, use.origin)) continue;
  const key = `${use.directive} ${use.origin}`;
  if (!missing.has(key)) missing.set(key, []);
  missing.get(key).push(use);
}

const usedKeys = new Set(found.map((u) => `${u.directive} ${u.origin}`));
const stale = [];
for (const [directive, sources] of policy) {
  if (!["script-src", "connect-src", "frame-src", "worker-src"].includes(directive)) continue;
  for (const s of sources) {
    if (!s.startsWith("https://")) continue;
    if (usedKeys.has(`${directive} ${s}`)) continue;
    if (KEEP[s]) continue;
    stale.push({ directive, origin: s });
  }
}

// ---------------------------------------------------------------------------
// 5. Report
// ---------------------------------------------------------------------------

const distinct = new Set(found.map((u) => `${u.directive} ${u.origin}`));
console.log(`subresource origins in source: ${distinct.size} (${found.length} usages)`);

for (const key of [...distinct].sort()) {
  const [directive, origin] = key.split(" ");
  console.log(`  ${covers(directive, origin) ? "ok  " : "MISS"} ${directive.padEnd(12)} ${origin}`);
}

if (unresolved.length) {
  console.log(`\nUnresolved expressions (${unresolved.length}) — verify by hand if you added an origin:`);
  for (const u of unresolved) console.log(`  - ${u.file}:${u.line} (${u.label}) ${u.expr}`);
}

if (stale.length) {
  console.log(`\nAllowlisted but unused (${stale.length}) — drop it, or add it to KEEP with a reason:`);
  for (const s of stale) console.log(`  - ${s.directive} ${s.origin}`);
}

if (missing.size > 0) {
  console.error(`\n[audit-csp] ${missing.size} origin(s) loaded but not allowlisted:\n`);
  for (const [key, usages] of missing) {
    const [directive, origin] = key.split(" ");
    console.error(`  ${origin} needs to be in ${directive}`);
    for (const u of usages.slice(0, 4)) console.error(`      ${u.file}:${u.line} — ${u.label}`);
    if (usages.length > 4) console.error(`      … and ${usages.length - 4} more`);
  }
  console.error(
    `\n  Add each origin to the matching directive in vercel.json.\n` +
      `  Mind the directive: a host in connect-src does NOT permit loading a\n` +
      `  script from it — that needs script-src. Getting this wrong is the exact\n` +
      `  bug this gate exists to catch (see INFRA-MIGRATION.md, 31 Jul 2026).`
  );
  process.exit(1);
}

console.log("\n[audit-csp] 0 drift — every loaded origin is allowlisted under the right directive.");
console.log(
  "[audit-csp] NOTE: vercel.json headers are STAGED, NOT SERVED — production is\n" +
    "            GitHub Pages, which sends no custom headers. HSTS, CSP, X-Frame-Options\n" +
    "            and Referrer-Policy are not live. See INFRA-MIGRATION.md."
);
