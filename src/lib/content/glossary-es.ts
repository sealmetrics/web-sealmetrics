/**
 * Which glossary terms have a Spanish page.
 *
 * Single source of truth for locale-aware glossary linking. Before this
 * existed, three places each kept their own idea of it — the ES index page,
 * the related-terms block and the body copy of every ES page — and they
 * disagreed, which shipped 21 links to Spanish URLs that did not exist.
 *
 * A term missing from this set links to its English page on purpose: an
 * English definition that answers the question beats a 404, and the ES index
 * says so in the page copy.
 */
export const ES_TERM_SLUGS = new Set([
  "ad-blocker-analytics-impact",
  "analytics-data-residency",
  "attribution-model",
  "consent-management-platform",
  "consent-mode-v2",
  "cookieless-analytics",
  "data-loss-in-analytics",
  "data-sampling",
  "event-tracking",
  "first-party-data-collection",
  "gdpr-analytics-compliance",
  "intelligent-tracking-prevention",
  "multi-touch-attribution",
  "revenue-attribution",
  "server-side-tracking",
]);

/** Glossary URL for a term in the requested locale, falling back to English. */
export function glossaryHref(slug: string, locale: "en" | "es"): string {
  if (locale === "es" && ES_TERM_SLUGS.has(slug)) return `/es/glossary/${slug}`;
  return `/glossary/${slug}`;
}
