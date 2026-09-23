#!/usr/bin/env node
/**
 * Pre-renders per-post OG images (1200×630 PNG) at build time.
 * Sources:
 *   - Blog: parses src/lib/content/blog.ts for { slug, title, category }
 *   - Glossary: parses src/lib/content/glossary.ts (if it exports an array) — falls back to filesystem
 *   - Case studies: hardcoded list (small + manually curated)
 *
 * Output: /public/og/<segment>/<slug>.png — referenced by each page's
 * metadata.openGraph.images. The PNG fallback through `<picture>` is the
 * default; AVIF + WebP siblings are then created by `optimize-images.mjs`
 * in the same prebuild pass.
 *
 * Idempotent, keyed on CONTENT rather than mtime. Each card records the hash
 * of its own render inputs (the satori node — which carries the copy, the
 * layout and the colours — plus the font) in `scripts/og-manifest.json`, and
 * is re-rendered only when that hash changes.
 *
 * It used to skip files "newer than this script", which broke twice over.
 * Every git checkout, branch switch and `git checkout --` rewrites mtimes, and
 * any edit to this file invalidated all 228 cards at once — so a one-line
 * change to add a single card re-rendered the lot. Re-rendering is not free:
 * satori/resvg is deterministic for a given toolchain but not across them, so
 * whoever built last rewrote ~69 files (23 cards x png/webp/avif) with
 * byte-different, visually identical output, and `git add -A` swept the churn
 * into unrelated commits.
 *
 * Deliberately NOT part of the hash: the satori / resvg versions. Including
 * them would re-render everything on every dependency bump — the same churn
 * from a different direction — and would make the manifest disagree between a
 * macOS dev machine and CI's Linux. Same reasoning as the signature in
 * `optimize-images.mjs`. To force a re-render after a toolchain or template
 * change this cannot see, run with `--force`.
 */
import { readFileSync, readdirSync, mkdirSync, existsSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");
const blogTsPath = path.join(repoRoot, "src/lib/content/blog.ts");
const outDir = path.join(repoRoot, "public/og");
const manifestPath = path.join(here, "og-manifest.json");
const FORCE = process.argv.includes("--force");

/** Repo-relative, forward-slashed — so the manifest is identical on any OS. */
const manifestKey = (file) => path.relative(repoRoot, file).split(path.sep).join("/");
const sha = (input) => createHash("sha256").update(input).digest("hex");

function readManifest() {
  if (!existsSync(manifestPath)) return {};
  try {
    const parsed = JSON.parse(readFileSync(manifestPath, "utf8"));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    // A corrupt manifest must not fail the build — treat it as absent. Every
    // card then re-adopts on this run rather than re-rendering.
    console.warn("[og] manifest unreadable — rebuilding it");
    return {};
  }
}

const manifest = readManifest();
let manifestChanged = false;
let fontHash = null;

/**
 * Output paths already rendered on this run. The generic `parseEnRoutes()`
 * pass at the bottom of this file also covers /blog/<slug>, so 75 posts were
 * being rendered TWICE to the same PNG with different content — the blog pass
 * using the post's real category and editorial title ("Comparisons" / "…12
 * Requirements That Decide It"), the route pass using a generic "Blog" eyebrow
 * and the shorter SEO title. Whichever ran last won, which is the real reason
 * ~23 cards changed on every build. First writer wins, and the specific
 * sources all run before the generic one.
 */
const claimed = new Set();
let duplicates = 0;

// Brand lockup for the card footer, embedded as a data URI because satori has
// no filesystem access. Sourced from the PNG that `logo-sealmetrics.svg`
// generates, so the card follows the brand without a second hand-made asset.
const LOGO_PATH = path.join(repoRoot, "public/logos/logo-sealmetrics-negro.png");
const LOGO_DATA_URI = `data:image/png;base64,${readFileSync(LOGO_PATH).toString("base64")}`;
const LOGO_H = 30;
const LOGO_W = Math.round(LOGO_H * 5.603); // ratio del lockup
const logoNode = (h = LOGO_H) => ({
  type: "img",
  props: { src: LOGO_DATA_URI, width: Math.round(h * 5.603), height: h },
});

mkdirSync(path.join(outDir, "blog"), { recursive: true });
mkdirSync(path.join(outDir, "case-studies"), { recursive: true });
mkdirSync(path.join(outDir, "glossary"), { recursive: true });

// Load Onest from node_modules — Next already pulls Google Fonts at build time
// so the woff2 lives in node_modules under .next-font cache. Use a simple
// system-fallback render: satori needs a font but woff/ttf works.
// Fall back to embedded Inter-like via fetch isn't possible offline; download
// once and cache.
const FONT_CACHE = path.join(repoRoot, ".og-font-cache");
mkdirSync(FONT_CACHE, { recursive: true });
const fontPath = path.join(FONT_CACHE, "onest-700.ttf");

async function ensureFont() {
  if (existsSync(fontPath)) return readFileSync(fontPath);
  // Resolve current Onest 700 TTF URL from Google Fonts CSS — version-stable approach.
  try {
    const cssRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Onest:wght@700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    if (!cssRes.ok) throw new Error(`CSS HTTP ${cssRes.status}`);
    const css = await cssRes.text();
    const ttfUrl = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!ttfUrl) throw new Error("no .ttf URL in Google CSS");
    const fontRes = await fetch(ttfUrl);
    if (!fontRes.ok) throw new Error(`Font HTTP ${fontRes.status}`);
    const buf = Buffer.from(await fontRes.arrayBuffer());
    writeFileSync(fontPath, buf);
    return buf;
  } catch (err) {
    console.warn(`[og] font fetch failed (${err.message}); skipping OG generation`);
    return null;
  }
}

function parseBlogPosts() {
  const src = readFileSync(blogTsPath, "utf8");
  const posts = [];
  const re = /\{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)"[\s\S]*?(?:category:\s*"([^"]+)")?[\s\S]*?(?:date:\s*"([^"]+)")?[\s\S]*?(?:draft:\s*(true|false))?\s*[,}]/g;
  // Simpler approach: split by `slug: "` boundaries
  const blocks = src.split(/\n  \{\n/).slice(1);
  for (const block of blocks) {
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
    const title = block.match(/title:\s*"([^"]+)"/)?.[1];
    const category = block.match(/category:\s*"([^"]+)"/)?.[1] ?? "Blog";
    const draft = /draft:\s*true/.test(block);
    if (slug && title && !draft) posts.push({ slug, title, category });
  }
  return posts;
}

/**
 * Glossary terms that have their own page. `og/glossary/` was created on every
 * run since this script was written but never written to, so all 56 term pages
 * shipped the site-wide default card.
 */
function parseGlossaryTerms() {
  const src = readFileSync(path.join(repoRoot, "src/lib/content/glossary.ts"), "utf8");
  const terms = [];
  for (const block of src.split(/\n  \{\n/).slice(1)) {
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
    const term = block.match(/term:\s*"([^"]+)"/)?.[1];
    const category = block.match(/category:\s*"([^"]+)"/)?.[1] ?? "Glossary";
    if (slug && term && /hasPage:\s*true/.test(block)) terms.push({ slug, term, category });
  }
  return terms;
}

/**
 * Hand-written cards for the pages a share or an AI citation is most likely to
 * land on. Everything else is derived below — these exist only because their
 * metadata title is not the best line to put on a social card.
 */
const HUB_OVERRIDES = {
  vs: { eyebrow: "Comparisons", title: "Sealmetrics compared with the enterprise analytics you already run" },
  for: { eyebrow: "By industry", title: "Complete measurement, by the kind of business you run" },
  "use-cases": { eyebrow: "Use cases", title: "What teams do with data without consent gaps" },
  platforms: { eyebrow: "Platforms", title: "Install on the eCommerce platform you already use" },
  integrations: { eyebrow: "Integrations", title: "Plugs into the stack you already run" },
  glossary: { eyebrow: "Glossary", title: "The vocabulary of cookieless, consentless measurement" },
  "case-studies": { eyebrow: "Case studies", title: "Named European teams, inspectable figures" },
  product: { eyebrow: "Product", title: "Enterprise analytics that doesn’t depend on consent" },
  "how-it-works": { eyebrow: "How it works", title: "No cookies, no consent banner, no blind spot" },
  pricing: { eyebrow: "Pricing", title: "Enterprise analytics at a fraction of GA360 and Adobe" },
  security: { eyebrow: "Security", title: "Designed for GDPR, EU-hosted in Dublin" },
  open: { eyebrow: "Open", title: "How Sealmetrics works, written down in public" },
  blog: { eyebrow: "Blog", title: "Measurement, attribution and privacy for eCommerce" },
  "what-ai-says": { eyebrow: "Free check · every model, live", title: "What do AIs say about your brand?" },
};

/** First path segment → the eyebrow line printed above the title. */
const SEGMENT_EYEBROW = {
  vs: "Comparison",
  alternatives: "Alternatives",
  for: "By industry",
  "use-cases": "Use case",
  platforms: "Platform",
  "gdpr-analytics": "GDPR by country",
  open: "Open",
  glossary: "Glossary",
  authors: "Author",
  "case-studies": "Case study",
  blog: "Blog",
  "data-studio": "Integration",
};

/**
 * Every indexable EN route that still has no card, read from the page's own
 * metadata rather than a list someone has to remember to extend. A hand-kept
 * table is exactly what let 202 of 262 pages ship the same generic image.
 *
 * Spanish routes deliberately reuse the English card — see src/lib/seo/og.ts.
 */
function parseEnRoutes() {
  const appRoot = path.join(repoRoot, "src/app/(en)");
  const routes = [];

  const walk = (dir, prefix) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const name = e.name;
      if (e.isFile() && name === "page.tsx") {
        const src = readFileSync(path.join(dir, name), "utf8");
        // Redirect stubs and noindex pages do not need their own card.
        if (/buildRedirectMetadata/.test(src)) continue;
        if (/robots\s*:\s*\{[^}]*index\s*:\s*false/.test(src)) continue;
        const title = src.match(/title:\s*"([^"]+)"/)?.[1];
        if (!title || !prefix) continue;
        routes.push({ route: prefix.replace(/^\//, ""), title });
        continue;
      }
      if (!e.isDirectory()) continue;
      if (name.startsWith("[") || name.startsWith("@") || name.startsWith("_")) continue;
      walk(path.join(dir, name), `${prefix}/${name}`);
    }
  };
  walk(appRoot, "");
  return routes;
}

/**
 * /open/<slug> is a dynamic route, so parseEnRoutes() cannot see it — the
 * eight published chapters were the last indexable pages left on the generic
 * card. Read them from the same registry the route itself uses.
 */
function parseOpenChapters() {
  const src = readFileSync(path.join(repoRoot, "src/lib/content/open.ts"), "utf8");
  const out = [];
  for (const block of src.split(/\n  \{\n/).slice(1)) {
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
    const title = block.match(/title:\s*"([^"]+)"/)?.[1];
    const eyebrow = block.match(/eyebrow:\s*"([^"]+)"/)?.[1] ?? "Open";
    if (slug && title && /status:\s*"ready"/.test(block)) out.push({ slug, title, eyebrow });
  }
  return out;
}

/** "Shopify Analytics Integration — Sealmetrics" → "Shopify Analytics Integration" */
const stripBrand = (t) => t.replace(/\s*[—|·-]\s*Sealmetrics\s*$/, "").trim();


function ogTemplate({ eyebrow, title }) {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 88px",
        backgroundColor: "#FAFAF7",
        fontFamily: "Onest",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#2D8B6D",
                  },
                  children: eyebrow,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 64,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#0E0E0C",
                    lineHeight: 1.08,
                    marginTop: 28,
                    maxWidth: 1000,
                  },
                  children: title,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid #E4E3DE",
              paddingTop: 28,
            },
            children: [
              logoNode(30),
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 20,
                    color: "#6B6B5E",
                    letterSpacing: "0.04em",
                  },
                  children: "sealmetrics.com",
                },
              },
            ],
          },
        },
      ],
    },
  };
}

/**
 * Site-wide default card (public/og-image.png), used by ~125 pages that do not
 * have a per-page OG image. Kept as its own template because it carries a blurb
 * and a stats row that the per-page cards do not — extending ogTemplate would
 * have put the per-page renders at risk for no gain.
 *
 * The price lives here rather than in a hand-made raster: it had drifted to a
 * tier that no longer exists (€199 against a real entry price of €499), and a
 * baked-in figure nobody can grep is exactly how that happens.
 */
function ogSiteTemplate({ eyebrow, title, blurb, stats, note }) {
  const text = (children, style) => ({ type: "div", props: { style, children } });
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 88px",
        backgroundColor: "#FAFAF7",
        fontFamily: "Onest",
      },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column" },
            children: [
              text(eyebrow, {
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#6B6B5E",
              }),
              text(title, {
                fontSize: 62,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#0E0E0C",
                lineHeight: 1.06,
                marginTop: 26,
                maxWidth: 900,
              }),
              text(blurb, {
                fontSize: 24,
                color: "#6B6B5E",
                lineHeight: 1.45,
                marginTop: 26,
                maxWidth: 860,
              }),
            ],
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column" },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", gap: "72px" },
                  children: stats.map((s) => ({
                    type: "div",
                    props: {
                      style: { display: "flex", flexDirection: "column" },
                      children: [
                        text(s.value, {
                          fontSize: 44,
                          fontWeight: 700,
                          letterSpacing: "-0.03em",
                          color: "#0E0E0C",
                        }),
                        text(s.label, {
                          fontSize: 17,
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#6B6B5E",
                          marginTop: 6,
                        }),
                      ],
                    },
                  })),
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid #E4E3DE",
                    marginTop: 34,
                    paddingTop: 26,
                  },
                  children: [
                    logoNode(28),
                    text(note, { fontSize: 20, color: "#6B6B5E", letterSpacing: "0.02em" }),
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function renderTemplate({ outFile, node, font }) {
  fontHash ??= sha(font).slice(0, 16);
  const key = manifestKey(outFile);
  if (claimed.has(key)) {
    duplicates++;
    return false;
  }
  claimed.add(key);
  const inputHash = sha(`${JSON.stringify(node)}|${fontHash}`).slice(0, 32);

  if (!FORCE && existsSync(outFile)) {
    if (manifest[key] === inputHash) return false;
    if (manifest[key] === undefined) {
      // First run after this manifest was introduced: the card already exists
      // and its inputs are unchanged, so record the hash and keep the bytes
      // that are already committed. Re-rendering here would produce the churn
      // this manifest exists to stop.
      manifest[key] = inputHash;
      manifestChanged = true;
      adopted++;
      return false;
    }
  }

  const svg = await satori(node, {
    width: 1200,
    height: 630,
    fonts: [{ name: "Onest", data: font, weight: 700, style: "normal" }],
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  writeFileSync(outFile, png);
  manifest[key] = inputHash;
  manifestChanged = true;
  return true;
}

async function renderOg({ outFile, eyebrow, title, font }) {
  return renderTemplate({ outFile, node: ogTemplate({ eyebrow, title }), font });
}

const font = await ensureFont();
if (!font) {
  console.log("[og] no font available; skipping");
  process.exit(0);
}

let generated = 0;
let skipped = 0;
let adopted = 0;

// Site-wide default card. Copy tracks the live home hero (HeroD in
// HomeDSections.tsx) rather than being written here: the card had drifted to
// "Decision Intelligence for Ecommerce", which predates the complete-data
// repositioning, and a social preview quoting a headline the site no longer
// uses is the same failure mode as the €199 price it also carried.
{
  const out = path.join(repoRoot, "public/og-image.png");
  const made = await renderTemplate({
    outFile: out,
    node: ogSiteTemplate({
      eyebrow: "eCommerce analytics",
      title: "See the sales consent hides — the revenue GA4 can’t.",
      blurb:
        "No cookies, no consent banner, no 40–60% blind spot.",
      stats: [
        { value: "0", label: "Consent loss" },
        { value: "0", label: "Cookies used" },
        { value: "EU", label: "Data residency" },
      ],
      note: "Enterprise analytics from €499/mo",
    }),
    font,
  });
  if (made) generated++; else skipped++;
}

// Blog
for (const post of parseBlogPosts()) {
  const out = path.join(outDir, "blog", `${post.slug}.png`);
  const made = await renderOg({ outFile: out, eyebrow: post.category, title: post.title, font });
  if (made) generated++; else skipped++;
}

// Case studies
const cases = [
  { slug: "palladium-hotel-group", title: "A neutral single source of truth all stakeholders accept", eyebrow: "Case study · Palladium Hotel Group" },
  { slug: "dreamplace-hotels", title: "Decide paid media on real data, not what each platform reports", eyebrow: "Case study · Dreamplace Hotels" },
  { slug: "incapto", title: "GA4 was not measuring less. It was measuring another business", eyebrow: "Case study · Incapto" },
];
for (const c of cases) {
  const out = path.join(outDir, "case-studies", `${c.slug}.png`);
  const made = await renderOg({ outFile: out, eyebrow: c.eyebrow, title: c.title, font });
  if (made) generated++; else skipped++;
}


// Glossary terms
for (const t of parseGlossaryTerms()) {
  const out = path.join(outDir, "glossary", `${t.slug}.png`);
  const made = await renderOg({ outFile: out, eyebrow: `Glossary · ${t.category}`, title: t.term, font });
  if (made) generated++; else skipped++;
}

// Open chapters (dynamic route)
mkdirSync(path.join(outDir, "open"), { recursive: true });
for (const c of parseOpenChapters()) {
  const out = path.join(outDir, "open", `${c.slug}.png`);
  const made = await renderOg({ outFile: out, eyebrow: `Open · ${c.eyebrow}`, title: c.title, font });
  if (made) generated++; else skipped++;
}

// Spanish pages whose slug differs from the English one. og.ts resolves an ES
// route to the card at its own (unprefixed) slug, so a Spanish-only slug gets
// its own Spanish card instead of falling through to the generic image.
const ES_ONLY_CARDS = [
  { route: "que-dicen-las-ia", eyebrow: "Consulta gratuita · todos los modelos", title: "¿Qué dicen las IA de tu marca?" },
];
for (const c of ES_ONLY_CARDS) {
  const out = path.join(outDir, `${c.route}.png`);
  const made = await renderOg({ outFile: out, eyebrow: c.eyebrow, title: c.title, font });
  if (made) generated++; else skipped++;
}

// Every remaining indexable page, hand-written copy where we have it.
for (const { route, title } of parseEnRoutes()) {
  const out = path.join(outDir, `${route}.png`);
  mkdirSync(path.dirname(out), { recursive: true });
  const override = HUB_OVERRIDES[route];
  const segment = route.split("/")[0];
  const made = await renderOg({
    outFile: out,
    eyebrow: override?.eyebrow ?? SEGMENT_EYEBROW[segment] ?? "Sealmetrics",
    title: override?.title ?? stripBrand(title),
    font,
  });
  if (made) generated++; else skipped++;
}

if (manifestChanged) {
  // Sorted keys so the manifest itself never churns on reordering.
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);
}
console.log(`[og] generated ${generated}, skipped ${skipped}${adopted ? `, adopted ${adopted}` : ""}`);
if (duplicates) {
  console.log(`[og] ${duplicates} duplicate target(s) ignored — a more specific source had already claimed them`);
}
