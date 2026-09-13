#!/usr/bin/env node
/**
 * SEO/GEO regression gate. Parses every page in out/ and fails the build on
 * any rule in RULES that is violated.
 *
 * Wired into `postbuild`, so `npm run build` — and therefore the PR check and
 * the deploy — refuse a regression. Also exposed as `npm run seo:audit` and
 * consumed by tests/seo.test.mjs, which asserts against the same JSON report
 * rather than re-implementing the parsing.
 *
 * Every rule here corresponds to a defect that was actually shipped to
 * production at least once. `--json` prints the machine-readable report.
 */
import { readFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");
const OUT = path.join(repoRoot, "out");
const SITE = "https://sealmetrics.com";
const JSON_MODE = process.argv.includes("--json");

if (!existsSync(OUT)) {
  console.error("[seo-audit] out/ missing — run `npm run build` first.");
  process.exit(1);
}

/* --------------------------------------------------------------- parsing */

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

const decode = (s) =>
  s == null
    ? s
    : s
        .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
        .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ");

const one = (html, re) => html.match(re)?.[1] ?? null;
const all = (html, re) => [...html.matchAll(re)];
const metaName = (html, n) =>
  one(html, new RegExp(`<meta name="${n}" content="([^"]*)"`, "i"));
const metaProp = (html, p) =>
  one(html, new RegExp(`<meta property="${p}" content="([^"]*)"`, "i"));

function parsePage(file) {
  const html = readFileSync(file, "utf8");
  let route = "/" + path.relative(OUT, file).replace(/\\/g, "/");
  route = route.replace(/index\.html$/, "").replace(/\.html$/, "/");
  if (!route.endsWith("/")) route += "/";

  const jsonld = all(
    html,
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  ).map((m) => {
    try {
      return JSON.parse(m[1]);
    } catch (err) {
      return { __invalid__: String(err.message).slice(0, 120) };
    }
  });

  const visibleText = decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ");

  return {
    file,
    route,
    html,
    visibleText,
    title: decode(one(html, /<title>([\s\S]*?)<\/title>/)),
    description: decode(metaName(html, "description")),
    canonical: one(html, /<link rel="canonical" href="([^"]*)"/),
    robots: metaName(html, "robots") ?? "",
    lang: one(html, /<html lang="([^"]*)"/),
    og: {
      title: metaProp(html, "og:title"),
      description: metaProp(html, "og:description"),
      url: metaProp(html, "og:url"),
      type: metaProp(html, "og:type"),
      image: metaProp(html, "og:image"),
      siteName: metaProp(html, "og:site_name"),
    },
    twitterCard: metaName(html, "twitter:card"),
    twitterTitle: metaName(html, "twitter:title"),
    h1s: all(html, /<h1[^>]*>([\s\S]*?)<\/h1>/g).map((m) =>
      decode(m[1].replace(/<[^>]+>/g, "")).trim()
    ),
    imgs: all(html, /<img\b[^>]*>/g).map((m) => m[0]),
    jsonld,
    types: jsonld
      .flatMap((j) => (j["@graph"] ? j["@graph"].map((g) => g["@type"]) : [j["@type"]]))
      .filter(Boolean),
    markdownLink: one(html, /<link rel="alternate" type="text\/markdown" href="([^"]*)"/),
    metaRefresh: one(html, /<meta http-equiv="refresh" content="([^"]*)"/i),
    links: [
      ...new Set(
        all(html, /<a\b[^>]+href="([^"]+)"/g)
          .map((m) => m[1])
          .filter((h) => h.startsWith("/"))
          .map((h) => h.split("#")[0].split("?")[0])
      ),
    ],
  };
}

const pages = walk(OUT)
  .filter((f) => !/\/(404|_not-found)(\/index)?\.html$/.test(f.replace(/\\/g, "/")))
  .map(parsePage);

const smPath = path.join(OUT, "sitemap.xml");
const sitemapUrls = existsSync(smPath)
  ? all(readFileSync(smPath, "utf8"), /<loc>([^<]+)<\/loc>/g).map((m) => m[1])
  : [];
const sitemapRoutes = new Set(sitemapUrls.map((u) => u.replace(SITE, "")));
const builtRoutes = new Set(pages.map((p) => p.route));
const indexable = pages.filter((p) => !/noindex/i.test(p.robots));

/* ----------------------------------------------------------------- rules */

const failures = [];
const fail = (rule, detail) => failures.push({ rule, detail });

// Warnings are reported but do not fail the build. They are for things that
// are worth fixing but where a bad automated fix is worse than the problem —
// rewriting 43 meta descriptions badly costs more than leaving them long.
const warnings = [];
const warn = (rule, detail) => warnings.push({ rule, detail });

// 1. A noindex page must never appear in the sitemap.
for (const p of pages) {
  if (/noindex/i.test(p.robots) && sitemapRoutes.has(p.route)) {
    fail("noindex-in-sitemap", `${p.route} is "${p.robots}" but is listed in sitemap.xml`);
  }
}

// 2. Every sitemap URL must resolve to a page that was actually built.
for (const r of sitemapRoutes) {
  if (!builtRoutes.has(r)) fail("sitemap-dead-url", `${r} is in sitemap.xml but no HTML was built`);
}

// 3. Every indexable page must be in the sitemap.
for (const p of indexable) {
  if (!sitemapRoutes.has(p.route)) {
    fail("indexable-missing-from-sitemap", `${p.route} is indexable but absent from sitemap.xml`);
  }
}

// 4. Unique, present title and description on every indexable page.
const byTitle = new Map();
const byDesc = new Map();
for (const p of indexable) {
  if (!p.title) fail("missing-title", p.route);
  else {
    if (!byTitle.has(p.title)) byTitle.set(p.title, []);
    byTitle.get(p.title).push(p.route);
  }
  if (!p.description) fail("missing-description", p.route);
  else {
    if (!byDesc.has(p.description)) byDesc.set(p.description, []);
    byDesc.get(p.description).push(p.route);
  }
}
for (const [t, rs] of byTitle) {
  if (rs.length > 1) fail("duplicate-title", `"${t}" on ${rs.join(", ")}`);
}
for (const [d, rs] of byDesc) {
  if (rs.length > 1) fail("duplicate-description", `"${d.slice(0, 60)}…" on ${rs.join(", ")}`);
}

// 5. Absolute, self-consistent canonical on every page.
for (const p of pages) {
  if (!p.canonical) {
    fail("missing-canonical", p.route);
    continue;
  }
  if (!p.canonical.startsWith(SITE)) fail("relative-canonical", `${p.route} → ${p.canonical}`);
  if (!p.canonical.endsWith("/")) fail("canonical-no-trailing-slash", `${p.route} → ${p.canonical}`);
  const target = p.canonical.replace(SITE, "");
  if (!builtRoutes.has(target)) fail("canonical-to-404", `${p.route} → ${p.canonical}`);
}

// 6. Complete Open Graph. Missing og:url/og:site_name is what Next.js silently
//    does when a page overrides the layout's openGraph object.
for (const p of pages) {
  for (const [k, v] of Object.entries(p.og)) {
    if (!v) fail("incomplete-open-graph", `${p.route} missing og:${k}`);
  }
  if (p.og.url && p.canonical && p.og.url !== p.canonical) {
    fail("og-url-mismatch", `${p.route} og:url=${p.og.url} canonical=${p.canonical}`);
  }
}

// 7. Twitter card present, and not the same card on every page.
const byTwTitle = new Map();
for (const p of pages) {
  if (!p.twitterCard) fail("missing-twitter-card", p.route);
  if (p.twitterTitle) {
    if (!byTwTitle.has(p.twitterTitle)) byTwTitle.set(p.twitterTitle, []);
    byTwTitle.get(p.twitterTitle).push(p.route);
  }
}
for (const [t, rs] of byTwTitle) {
  if (rs.length > 3) {
    fail("shared-twitter-card", `${rs.length} pages share twitter:title "${t}" (layout inheritance)`);
  }
}

// 8. Exactly one h1.
for (const p of pages) {
  if (p.h1s.length === 0) fail("missing-h1", p.route);
  else if (p.h1s.length > 1) fail("multiple-h1", `${p.route} has ${p.h1s.length}`);
}

// 9. html lang, matching the locale of the route.
for (const p of pages) {
  const expected = p.route.startsWith("/es/") ? "es" : "en";
  if (!p.lang) fail("missing-lang", p.route);
  else if (p.lang !== expected) fail("wrong-lang", `${p.route} lang="${p.lang}" expected "${expected}"`);
}

// 10. JSON-LD must parse.
for (const p of pages) {
  for (const j of p.jsonld) {
    if (j.__invalid__) fail("invalid-jsonld", `${p.route}: ${j.__invalid__}`);
  }
}

// Internal page URLs in JSON-LD must use the same trailing-slash convention
// as canonicals and the sitemap. Assets keep their filenames unchanged.
const SCHEMA_ASSET = /\/[^/]+\.[a-z0-9]+$/i;
function visitSchemaStrings(value, visit) {
  if (typeof value === "string") visit(value);
  else if (Array.isArray(value)) value.forEach((child) => visitSchemaStrings(child, visit));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((child) => visitSchemaStrings(child, visit));
  }
}
for (const p of pages) {
  for (const schema of p.jsonld) {
    visitSchemaStrings(schema, (value) => {
      if (!value.startsWith(`${SITE}/`)) return;
      const url = new URL(value);
      if (!url.pathname.endsWith("/") && !SCHEMA_ASSET.test(url.pathname)) {
        fail("schema-url-no-trailing-slash", `${p.route} → ${value}`);
      }
    });
  }
}

// 10b. The entity graph has to resolve inside the document that references it.
//      Schemas name the publisher by `@id` rather than restating the company,
//      which is only meaningful if the node with that `@id` ships on the same
//      page — otherwise the reference dangles and an engine sees a publisher
//      it cannot identify. Both halves are checked, because either one alone
//      is worse than the inline object we replaced.
const ORG_NODE_ID = `${SITE}/#organization`;
for (const p of pages) {
  const ids = new Set();
  for (const schema of p.jsonld) {
    const nodes = Array.isArray(schema["@graph"]) ? schema["@graph"] : [schema];
    for (const node of nodes) if (node && node["@id"]) ids.add(node["@id"]);
  }
  // Only the indexable surface. The paid landing pages are noindex, have their
  // own shell and are not part of what an engine reads or cites.
  if (!/noindex/i.test(p.robots) && !ids.has(ORG_NODE_ID)) {
    fail("org-graph-missing", `${p.route} has no ${ORG_NODE_ID} node to resolve references against`);
  }
  for (const schema of p.jsonld) {
    const nodes = Array.isArray(schema["@graph"]) ? schema["@graph"] : [schema];
    for (const node of nodes) {
      for (const slot of ["publisher", "provider", "seller"]) {
        const v = node?.[slot];
        if (!v || typeof v !== "object" || Array.isArray(v)) continue;
        if (!v["@id"]) {
          fail(
            "publisher-not-linked",
            `${p.route}: ${node["@type"]}.${slot} restates the organisation inline instead of referencing ${ORG_NODE_ID}`
          );
        } else if (!ids.has(v["@id"])) {
          fail("publisher-not-linked", `${p.route}: ${slot} points at ${v["@id"]}, which is not on the page`);
        }
      }
    }
  }
}

// 10b-bis. One person, one node. A Person named in two places with two URLs
//          and no `@id` is two people as far as an engine is concerned — which
//          is what the founder was: "Rafa Jimenez" at /about in the founders
//          slot, "Rafa Jiménez" at /authors/rafa-jimenez on every article.
//          Names are compared with accents stripped, because that difference
//          alone was one of the two spellings in use.
const normalizeName = (n) =>
  String(n).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
for (const p of pages) {
  const byName = new Map();
  for (const schema of p.jsonld) {
    const nodes = Array.isArray(schema["@graph"]) ? schema["@graph"] : [schema];
    const collect = (node) => {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) return node.forEach(collect);
      if (node["@type"] === "Person" && node.name) {
        const key = normalizeName(node.name);
        if (!byName.has(key)) byName.set(key, []);
        byName.get(key).push(node);
      }
      Object.values(node).forEach(collect);
    };
    nodes.forEach(collect);
  }
  for (const [name, nodes] of byName) {
    if (nodes.length < 2) continue;
    const urls = new Set(nodes.map((n) => n["@id"] ?? n.url).filter(Boolean));
    if (urls.size > 1) {
      fail(
        "person-entity-split",
        `${p.route}: "${name}" appears as ${urls.size} identities (${[...urls].join(", ")}) — give the node an @id`
      );
    }
  }
}

// 10b-ter. An entity a page declares itself to be *about* should say which
//           entity it means. "Matomo" is also a commune in Mali; `sameAs` to a
//           Wikidata item is what settles it. Warned, not failed: Adobe
//           Analytics and Piwik PRO genuinely have no Wikidata item, and
//           inventing an approximately-related one would be a false statement
//           about identity — worse than the silence this reports.
for (const p of pages) {
  for (const schema of p.jsonld) {
    const nodes = Array.isArray(schema["@graph"]) ? schema["@graph"] : [schema];
    for (const node of nodes) {
      for (const about of [node?.about].flat()) {
        if (!about || typeof about !== "object" || about["@id"]) continue;
        if (about.url?.startsWith(SITE)) continue; // ourselves
        if (!about.sameAs) {
          warn("about-without-sameAs", `${p.route}: about "${about.name}" has no sameAs to identify it`);
        }
      }
    }
  }
}

// 10c. A schema's declared language must agree with the document's. The ES tree
//      used to assert nothing at all while serving Spanish copy.
for (const p of pages) {
  const docLang = (p.lang || "").slice(0, 2);
  if (!docLang) continue;
  for (const schema of p.jsonld) {
    const nodes = Array.isArray(schema["@graph"]) ? schema["@graph"] : [schema];
    for (const node of nodes) {
      // A media object carries the language of the media, not of the page: a
      // Spanish video legitimately sits on an English page.
      if (node?.["@type"] === "VideoObject" || node?.["@type"] === "AudioObject") continue;
      const declared = node?.inLanguage;
      if (typeof declared !== "string") continue; // arrays: site-wide WebSite node
      if (declared.slice(0, 2) !== docLang) {
        fail(
          "schema-inlanguage-mismatch",
          `${p.route}: ${node["@type"]} declares inLanguage "${declared}" on a "${docLang}" page`
        );
      }
    }
  }
}

// 10d. A revision claimed in schema must be visible on the page.
//      `dateModified` is a freshness claim made to Google and to answer
//      engines. Asserting it only inside a script tag makes the page look
//      stale to the reader while looking fresh to the crawler — the weaker
//      half of the signal, and a discrepancy to anyone who compares the two.
//      `<PostByline>` renders it; this rule is what stops it being dropped.
for (const p of pages) {
  for (const schema of p.jsonld) {
    const nodes = Array.isArray(schema["@graph"]) ? schema["@graph"] : [schema];
    for (const node of nodes) {
      if (node?.["@type"] !== "Article") continue;
      const { datePublished, dateModified } = node;
      if (!dateModified || dateModified === datePublished) continue;
      const day = String(dateModified).slice(0, 10);
      if (!p.html.includes(`dateTime="${day}"`) && !p.html.includes(`datetime="${day}"`)) {
        fail(
          "date-modified-not-visible",
          `${p.route} claims dateModified ${day} in schema but never renders it`
        );
      }
    }
  }
}

// 10e. For a blog post, the sitemap's <lastmod> and the Article's
//      dateModified must be the same date.
//
//      They are now the same value by construction: both come from
//      `postDates()` reading src/lib/content/blog.ts. This rule is what keeps
//      it that way. Before the dates moved into the registry, the revision
//      lived inside each page's articleSchema() call where the sitemap could
//      not see it, so the sitemap reported the PUBLICATION date and
//      under-reported freshness on 19 revised posts. A page that goes back to
//      hard-coding either date will disagree here.
const lastmodByRoute = new Map(
  all(readFileSync(smPath, "utf8"), /<url>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<lastmod>([^<]+)<\/lastmod>/g)
    .map((m) => [m[1].replace(SITE, ""), m[2].slice(0, 10)])
);
for (const p of pages) {
  if (!/^(\/es)?\/blog\/[^/]+\/$/.test(p.route)) continue;
  const lastmod = lastmodByRoute.get(p.route);
  if (!lastmod) continue; // noindex posts are legitimately absent
  for (const schema of p.jsonld) {
    const nodes = Array.isArray(schema["@graph"]) ? schema["@graph"] : [schema];
    for (const node of nodes) {
      if (node?.["@type"] !== "Article" || !node.dateModified) continue;
      const declared = String(node.dateModified).slice(0, 10);
      if (declared !== lastmod) {
        fail(
          "lastmod-disagrees-with-date-modified",
          `${p.route}: sitemap says ${lastmod}, the Article says ${declared} — both must come from postDates()`
        );
      }
    }
  }
}

// 10f. HowTo steps must be on the page, for the same reason FAQ answers must:
//      a procedure an engine can quote but a reader cannot follow is not a
//      procedure. `HowToSteps` renders from the same array the schema is built
//      from, so this rule only fires if someone breaks that link.
for (const p of pages) {
  for (const schema of p.jsonld) {
    const nodes = Array.isArray(schema["@graph"]) ? schema["@graph"] : [schema];
    for (const node of nodes) {
      if (node?.["@type"] !== "HowTo") continue;
      for (const step of node.step ?? []) {
        for (const field of ["name", "text"]) {
          const value = step?.[field];
          if (!value) continue;
          const probe = decode(value).replace(/\s+/g, " ").slice(0, 40);
          if (!p.visibleText.includes(probe)) {
            fail(
              "howto-schema-not-visible",
              `${p.route}: HowToStep ${field} "${probe}…" is in JSON-LD but not in the page text`
            );
          }
        }
      }
    }
  }
}

// 10g. Two content rules. These are the only rules here that judge words
//      rather than structure, so both are deliberately narrow: a content rule
//      that misfires gets worked around, and then it protects nothing.
//
//      Both were added on 4 Sep 2026 after the same false claim shipped in two
//      generated posts within two days, and a vocabulary drift reached 28
//      places in the visible copy.

// (a) A capability Sealmetrics does not have and never will.
//
//     Measurement is aggregate and anonymous; attribution is last click. There
//     is no per-person path to reconstruct. The banned phrase is NOT the
//     concept — "multi-touch" appears 91 times on this site, almost always in
//     our own argument for why we do not do it, and banning the word would
//     delete the differentiator. What is banned is "full-funnel" qualifying
//     attribution or a journey, which is only ever an affirmative claim about
//     us. Measured against the whole corpus before shipping: 4 matches, all 4
//     genuine, zero false positives.
const BANNED_CLAIM = /full[- ]funnel\s+(?:\w+\s+){0,2}(?:attribution|journey|journeys)/i;

// (b) Project vocabulary. Visible copy only, so URL slugs, form values and
//     object keys — all of which legitimately read "ecommerce" — are out of
//     scope by construction. Quoted material is exempt: a regulator that
//     writes "e-commerce" must be quoted as written.
const NONSTANDARD_SPELLING = /\b(?:[Ee]-commerce|[Ee]commerce|E-Commerce)\b/;

for (const p of pages) {
  const quoted = [...p.html.matchAll(/<(blockquote|q)\b[\s\S]*?<\/\1>/gi)]
    .map((m) => decode(m[0].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " "));
  const inQuote = (probe) => quoted.some((q) => q.includes(probe));

  const claim = p.visibleText.match(BANNED_CLAIM);
  if (claim) {
    fail(
      "banned-capability-claim",
      `${p.route}: "${claim[0]}" — Sealmetrics does not reconstruct a per-person path. ` +
        `Attribution is last click on the complete dataset`
    );
  }

  const spelling = p.visibleText.match(NONSTANDARD_SPELLING);
  if (spelling && !inQuote(spelling[0])) {
    const at = p.visibleText.indexOf(spelling[0]);
    fail(
      "nonstandard-spelling",
      `${p.route}: "${spelling[0]}" should be "eCommerce" — …${p.visibleText
        .slice(Math.max(0, at - 40), at + 40)
        .trim()}…`
    );
  }
}

// 11. FAQPage schema must correspond to questions visible on the page.
//     Google's structured data policy requires it, and an AI engine cannot
//     cite a passage that only exists inside a script tag.
for (const p of pages) {
  const faq = p.jsonld.find((j) => j["@type"] === "FAQPage");
  if (!faq) continue;
  for (const q of faq.mainEntity ?? []) {
    const probe = decode(q.name).replace(/\s+/g, " ").slice(0, 30);
    if (!p.visibleText.includes(probe)) {
      fail("faq-schema-not-visible", `${p.route}: "${q.name}" is in JSON-LD but not in the page text`);
    }
  }
}

// 12. Breadcrumb schema must not point at URLs that 404.
for (const p of pages) {
  const bc = p.jsonld.find((j) => j["@type"] === "BreadcrumbList");
  if (!bc) continue;
  for (const item of bc.itemListElement ?? []) {
    const url = typeof item.item === "string" ? item.item : item.item?.["@id"];
    if (!url || !url.startsWith(SITE)) continue;
    if (!builtRoutes.has(url.replace(SITE, ""))) {
      fail("breadcrumb-to-404", `${p.route} breadcrumb → ${url}`);
    }
  }
}

// 13. No broken internal links.
const ASSET = /\.(png|jpe?g|svg|webp|avif|ico|txt|xml|pdf|webmanifest|mp4|md)$/;
for (const p of pages) {
  for (const l of p.links) {
    if (ASSET.test(l) || l.startsWith("/_next/")) continue;
    const norm = l.endsWith("/") ? l : l + "/";
    if (!builtRoutes.has(norm)) fail("broken-internal-link", `${p.route} → ${l}`);
  }
}

// 14. Informative images need alt text.
for (const p of pages) {
  for (const tag of p.imgs) {
    if (!/\salt=/.test(tag)) fail("image-without-alt", `${p.route}: ${tag.slice(0, 90)}`);
  }
}

// 15. Every indexable page has a Markdown twin, and no noindex page does.
//     The twin must also be usable on its own terms: an agent that follows a
//     link must stay in Markdown, and the passage it quotes must not carry the
//     one part of the page that means nothing outside it — the call to action.
const routesWithTwin = new Set(
  pages
    .filter(
      (p) =>
        !/noindex/i.test(p.robots) &&
        existsSync(
          p.route === "/"
            ? path.join(OUT, "index.md")
            : path.join(OUT, p.route.replace(/^\/|\/$/g, "") + ".md")
        )
    )
    .map((p) => p.route)
);

for (const p of pages) {
  const mdPath =
    p.route === "/"
      ? path.join(OUT, "index.md")
      : path.join(OUT, p.route.replace(/^\/|\/$/g, "") + ".md");
  const hasMd = existsSync(mdPath);
  const isNoindex = /noindex/i.test(p.robots);
  if (!isNoindex && !hasMd) fail("missing-markdown-twin", p.route);
  if (isNoindex && hasMd) fail("markdown-twin-for-noindex", p.route);
  if (!isNoindex && hasMd) {
    const md = readFileSync(mdPath, "utf8");
    if (!md.startsWith("---\n")) fail("markdown-without-frontmatter", p.route);
    const body = md.split(/^---$/m).slice(2).join("").trim();
    if (body.replace(/[^\p{L}\p{N}]/gu, "").length < 200) {
      fail("markdown-twin-empty", `${p.route} body is under 200 significant chars`);
    }
    // Strip fenced and inline code first: pages that document the tracking
    // snippet legitimately contain a `<script src="…">` sample, and that is
    // content, not leaked markup.
    const prose = body
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`\n]*`/g, "");
    if (/<\/?(div|span|script|nav|footer|header|section)\b/i.test(prose)) {
      fail("markdown-twin-has-markup", `${p.route} still contains HTML tags outside code blocks`);
    }
    if (!p.markdownLink) fail("markdown-twin-not-linked", `${p.route} has a twin but no rel=alternate link`);

    // A link out of the Markdown surface and back into HTML defeats the twin
    // on the first click. Only targets that have no twin keep an HTML URL.
    for (const [, href] of prose.matchAll(
      /\]\((https:\/\/sealmetrics\.com\/[^)\s]*)\)/g
    )) {
      const path_ = href.replace("https://sealmetrics.com", "");
      if (path_.includes("#") || path_.includes("?")) continue;
      const target = path_.endsWith("/") ? path_ : `${path_}/`;
      if (routesWithTwin.has(target)) {
        fail("markdown-twin-links-html", `${p.route} → ${href} (twin exists)`);
      }
    }

    // Two links with nothing between them is a button pair or an unlisted
    // rail, not prose — either way it reads as one run-on line.
    if (/\]\([^)]*\)\[/.test(prose)) {
      fail("markdown-twin-cta-leak", `${p.route} contains an unseparated link pair`);
    }

    // The conversion box is the one part of a page that means nothing outside
    // it, so it must never reach the passage an engine quotes. What is banned
    // is the *button*: a line whose whole content is a CTA link. An in-sentence
    // mention ("get the dashboard with the demo account or book a demo") is
    // ordinary prose and stays — stripping those would damage the writing to
    // satisfy a lint rule.
    const CTA_BUTTON =
      /^(?:[-*]\s+)?\[[^\]]*\b(?:book a demo|book a pricing review|book a measurement review|book an enterprise review|start 14-day trial|reserva una demo|reserva una revisión|reserva una revisión enterprise|empieza la prueba)\b[^\]]*\]\([^)]*\)\s*$/im;
    if (CTA_BUTTON.test(prose)) {
      fail(
        "markdown-twin-cta-leak",
        `${p.route} still carries a conversion CTA — the component needs data-md="skip"`
      );
    }

    // Adjacent bold runs mean sibling chips collapsed into one another.
    if (/\*\*\*\*/.test(prose)) {
      fail("markdown-twin-glued-inline", `${p.route} has bold runs with no separator`);
    }

    // The answer-first block is the passage engines quote. Warned, not failed:
    // the pages missing one need an editorial block written, which is a content
    // task and not something a build gate can conjure.
    //
    // Scoped away from trust-and-legal. `llm_priority: critical` marks a page
    // as important for an agent to READ — the DPA and the privacy policy
    // qualify — which is a different claim from "this page should open with a
    // quotable summary". A TL;DR on /terms adds nothing, so warning about it
    // every build until the end of time only teaches everyone to skim the
    // warnings.
    const critical = /^llm_priority: "critical"$/m.test(md);
    const legal = /^content_type: "trust-and-legal"$/m.test(md);
    if (critical && !legal && !/^summary: /m.test(md)) {
      warn(
        "markdown-twin-without-summary",
        `${p.route} is llm_priority critical but has no answer-first block`
      );
    }
  }
}

// 16. hreflang must be reciprocal and resolve. A one-sided annotation is
//     silently ignored by Google, which is worse than none: it looks correct
//     in the HTML while doing nothing.
const byRoute = new Map(pages.map((p) => [p.route, p]));
for (const p of pages) {
  const alts = [...p.html.matchAll(/rel="alternate" hrefLang="([^"]*)" href="([^"]*)"/gi)];
  for (const [, lang, href] of alts) {
    if (lang.toLowerCase() === "x-default") continue;
    const target = href.replace(SITE, "");
    const tp = byRoute.get(target);
    if (!tp) {
      fail("hreflang-to-404", `${p.route} hreflang="${lang}" → ${href} was not built`);
      continue;
    }
    const returns = [...tp.html.matchAll(/rel="alternate" hrefLang="[^"]*" href="([^"]*)"/gi)].some(
      (m) => m[1].replace(SITE, "") === p.route
    );
    if (!returns) {
      fail("hreflang-not-reciprocal", `${p.route} → ${target} declares no return link`);
    }
  }
}

// 17. Markdown URLs must never enter the sitemap.
for (const u of sitemapUrls) {
  if (u.endsWith(".md")) fail("markdown-in-sitemap", u);
}

// 18. A redirect stub must carry a real <meta http-equiv="refresh">. Routing it
//     through Next.js `metadata.other` renders `<meta name="refresh">`, which
//     is inert: 10 alias URLs shipped a manual "click to continue" interstitial
//     for months because only the JS fallback ever fired.
for (const p of pages) {
  if (!/^Redirecting to /.test(p.title ?? "")) continue;
  const target = p.canonical?.replace(SITE, "");
  if (!p.metaRefresh) {
    fail("redirect-stub-without-meta-refresh", `${p.route} → ${target ?? "?"}`);
    continue;
  }
  const url = p.metaRefresh.replace(/^\s*\d+\s*;\s*url=/i, "");
  // External targets (e.g. the Data Studio one-click link) keep a same-site
  // canonical, so there is no destination to compare against.
  if (/^https?:/.test(url)) continue;
  const norm = url.endsWith("/") ? url : url + "/";
  if (target && norm !== target) {
    fail(
      "redirect-stub-target-mismatch",
      `${p.route} refresh→${url} canonical→${target}`
    );
  }
}

// 19. No orphan pages. An indexable page with no inbound internal link is in
//     the sitemap and in llms.txt but unreachable by crawling, which is the
//     state ten pages were in — including the /for hub and a draft blog post
//     that shipped indexable because nothing tied indexability to the link
//     graph. Nav counts: a footer link is a real link.
{
  const inbound = new Map(indexable.map((p) => [p.route, 0]));
  for (const p of indexable) {
    for (const l of new Set(p.links)) {
      const norm = l.endsWith("/") ? l : l + "/";
      if (norm !== p.route && inbound.has(norm)) inbound.set(norm, inbound.get(norm) + 1);
    }
  }
  for (const [route, n] of inbound) {
    if (n === 0 && route !== "/" && route !== "/es/") fail("orphan-page", route);
  }
}

/* -------------------------------------------------------------- warnings */

for (const p of indexable) {
  // Google truncates around 60/160. Over is a display problem, not an
  // indexing one — worth tracking, not worth a bad automated rewrite.
  if (p.title && p.title.length > 60) warn("title-over-60-chars", `${p.route} (${p.title.length})`);
  if (p.description && p.description.length > 160)
    warn("description-over-160-chars", `${p.route} (${p.description.length})`);
  if (p.description && p.description.length < 70)
    warn("description-under-70-chars", `${p.route} (${p.description.length})`);

  // Heading level skipped (h2 → h4). Screen-reader navigation and passage
  // extraction both read the hierarchy.
  const levels = [...p.html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  let prev = 0;
  for (const l of levels) {
    if (prev && l > prev + 1) {
      warn("heading-level-skipped", `${p.route} (h${prev} → h${l})`);
      break;
    }
    prev = l;
  }

  // An <img> without both width and height gives the browser no aspect ratio
  // to reserve, which is how a CLS of 0.00 turns into a layout shift. A warning
  // rather than a failure: some decorative markup legitimately sizes in CSS only.
  for (const tag of p.imgs) {
    if (!(/\swidth=/.test(tag) && /\sheight=/.test(tag))) {
      warn("image-without-dimensions", `${p.route}: ${tag.slice(0, 80)}`);
    }
  }

  if (!p.types.includes("BreadcrumbList") && p.route !== "/" && p.route !== "/es/") {
    warn("no-breadcrumb-schema", p.route);
  }
  // The Organization + WebSite graph now ships in every page's <head>, so
  // "has some JSON-LD" no longer says anything. What matters is whether the
  // page describes *itself* — an Article, a WebPage, a DefinedTerm, a Product.
  const SITE_WIDE = new Set(["Organization", "WebSite"]);
  if (p.types.every((t) => SITE_WIDE.has(t))) warn("no-structured-data", p.route);
}

/* ---------------------------------------------------------------- report */

const grouped = new Map();
for (const f of failures) {
  if (!grouped.has(f.rule)) grouped.set(f.rule, []);
  grouped.get(f.rule).push(f.detail);
}

const report = {
  pages: pages.length,
  indexable: indexable.length,
  sitemapUrls: sitemapUrls.length,
  markdownTwins: pages.filter(
    (p) =>
      !/noindex/i.test(p.robots) &&
      existsSync(
        p.route === "/"
          ? path.join(OUT, "index.md")
          : path.join(OUT, p.route.replace(/^\/|\/$/g, "") + ".md")
      )
  ).length,
  failures: failures.length,
  byRule: Object.fromEntries([...grouped].map(([k, v]) => [k, v.length])),
  warnings: warnings.length,
  warningsByRule: Object.fromEntries(
    [...warnings.reduce((m, w) => m.set(w.rule, (m.get(w.rule) ?? 0) + 1), new Map())]
  ),
};

writeFileSync(
  path.join(OUT, "seo-audit-report.json"),
  JSON.stringify({ ...report, details: failures, warningDetails: warnings }, null, 2)
);

if (JSON_MODE) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(
    `[seo-audit] ${report.pages} pages · ${report.indexable} indexable · ` +
      `${report.sitemapUrls} sitemap URLs · ${report.markdownTwins} markdown twins`
  );
  if (warnings.length) {
    const byWarn = new Map();
    for (const w of warnings) {
      if (!byWarn.has(w.rule)) byWarn.set(w.rule, []);
      byWarn.get(w.rule).push(w.detail);
    }
    console.log(`[seo-audit] ${warnings.length} warning(s) (not blocking):`);
    for (const [rule, ds] of [...byWarn].sort((a, b) => b[1].length - a[1].length)) {
      console.log(`    ${rule}: ${ds.length}  e.g. ${ds[0]}`);
    }
  }
  if (failures.length === 0) {
    console.log("[seo-audit] 0 violations — all rules pass.");
  } else {
    for (const [rule, details] of [...grouped].sort((a, b) => b[1].length - a[1].length)) {
      console.error(`\n  ${rule} (${details.length})`);
      for (const d of details.slice(0, 10)) console.error(`    - ${d}`);
      if (details.length > 10) console.error(`    … +${details.length - 10} more`);
    }
    console.error(`\n[seo-audit] ${failures.length} violation(s) across ${grouped.size} rule(s).`);
  }
}

process.exit(failures.length ? 1 : 0);
