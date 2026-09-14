import { type Locale, SITE_URL, localePrefix } from "./types";

/** Pages available in Spanish */
const translatedPaths = new Set([
  "/",
  "/pricing",
  "/product",
  "/why-sealmetrics",
  "/how-it-works",
  "/demo",
  "/demo-access",
  "/security",
  "/trust",
  "/dpa",
  "/growth-calculator",
  "/data-loss-calculator",
  "/about",
  "/careers",
  "/changelog",
  "/integrations",
  "/platforms",
  "/vs",
  "/vs-ga4",
  "/modern-analytics",
  "/ai-analytics",
  "/ai-brand-monitoring",
  "/reg-gap-analysis",
  "/complete-data",
  "/consentless-analytics",
  "/gdpr-analytics",
  "/use-cases/single-source-of-truth",
  "/use-cases/revenue-attribution",
  "/platforms/shopify",
  "/platforms/woocommerce",
  "/gdpr-analytics/spain",
  "/cookieless-analytics",
  "/vs/ga360",
  "/vs/adobe-analytics",
  "/vs/piwik-pro",
  "/vs/matomo",
  "/alternatives/google-analytics",
  "/for",
  "/blog",
  "/blog/gdpr-analytics-spain-faq",
  "/blog/gdpr-eprivacy-analytics-legal-assessment",
  "/blog/is-matomo-gdpr-compliant",
  "/blog/ga4-alternatives-enterprise",
  "/blog/self-service-analytics-lens-ai",
  "/blog/cookieless-analytics-explained",
  "/blog/consent-banner-impact-on-analytics",
  "/blog/ga4-data-sampling-problem",
  "/blog/cookieless-analytics-for-hotels",
  "/blog/cookieless-analytics-for-ecommerce",
  "/blog/consentless-analytics-for-dtc",
  "/blog/why-ga4-shows-direct-none",
  "/blog/measure-roas-after-cookie-consent",
  "/blog/meta-ads-conversions-vs-crm",
  "/blog/why-ga4-shows-13pct-eu-traffic",
  "/blog/gdpr-analytics-without-consent",
  "/blog/best-web-analytics-tool",
  // Seal AI series (17 posts, EN + ES)
  "/blog/meet-seal-ai",
  "/blog/residency-is-not-sovereignty",
  "/blog/best-llm-for-data-analytics",
  "/blog/audit-your-analytics-ai-privacy",
  "/blog/analytics-if-data-privacy-framework-falls",
  "/blog/the-prompt-is-born-clean",
  "/blog/eu-ai-act-for-marketers",
  "/blog/we-changed-our-ai-model-twice",
  "/blog/how-we-benchmark-our-own-ai",
  "/blog/our-ai-got-it-wrong-in-production",
  "/blog/prompt-injection-is-language-dependent",
  "/blog/rival-model-as-judge",
  "/blog/public-llm-benchmarks-vs-your-use-case",
  "/blog/grounding-analytics-ai",
  "/blog/open-weights-exit-strategy",
  "/blog/seal-ai-vs-bring-your-own-key",
  "/blog/three-questions-to-ask-seal-ai",
  "/glossary",
  "/glossary/cookieless-analytics",
  "/glossary/gdpr-analytics-compliance",
  "/glossary/multi-touch-attribution",
  "/glossary/data-loss-in-analytics",
  "/glossary/revenue-attribution",
  "/glossary/ad-blocker-analytics-impact",
  "/glossary/analytics-data-residency",
  "/glossary/attribution-model",
  "/glossary/consent-management-platform",
  "/glossary/data-sampling",
  "/glossary/event-tracking",
  "/glossary/first-party-data-collection",
  "/glossary/intelligent-tracking-prevention",
  "/glossary/server-side-tracking",
  "/case-studies",
  "/case-studies/dreamplace-hotels",
  "/case-studies/palladium-hotel-group",
  "/audit",
  "/for/cmo",
  "/for/cto",
  "/for/dpo",
  "/for/ecommerce",
  "/for/hotels",
  "/for/saas",
  "/for/agencies",
  "/for/media",
  "/for/finance",
  "/for/healthcare",
  "/for/education",
  "/authors/rafa-jimenez",
]);

/** Returns true if the path has a Spanish translation */
export function hasTranslation(path: string): boolean {
  const clean = path.replace(/\/$/, "") || "/";
  return translatedPaths.has(clean);
}

/**
 * Append the trailing slash the site is served with (`trailingSlash: true`).
 * Without it an internal link costs a 301 hop on every click and every crawl.
 * Paths carrying a hash or query are left alone — callers pass plain paths.
 */
function withTrailingSlash(path: string): string {
  if (path.includes("#") || path.includes("?")) return path;
  return path.endsWith("/") ? path : `${path}/`;
}

/** Prefix a path with the locale prefix. Untranslated pages stay in English. */
export function localizedHref(path: string, locale: Locale): string {
  if (locale === "en") return withTrailingSlash(path);
  const clean = path.replace(/\/$/, "") || "/";
  if (!hasTranslation(clean)) return withTrailingSlash(path);
  return withTrailingSlash(`${localePrefix[locale]}${clean === "/" ? "" : clean}`);
}

/** Generate alternates.languages for Next.js metadata (use from English pages) */
export function getAlternates(path: string) {
  const clean = path.replace(/\/$/, "") || "/";
  if (!hasTranslation(clean)) return undefined;
  // Trailing slash to match trailingSlash:true served URLs, the on-page
  // canonical and the sitemap — otherwise hreflang is non-reciprocal.
  const suffix = clean === "/" ? "/" : `${clean}/`;
  const enUrl = `${SITE_URL}${suffix}`;
  const esUrl = `${SITE_URL}/es${suffix}`;
  return {
    "en": enUrl,
    "es": esUrl,
    "x-default": enUrl,
  };
}

/** Generate alternates.languages for Next.js metadata (use from Spanish pages) */
export function getAlternatesEs(path: string) {
  return getAlternates(path);
}
