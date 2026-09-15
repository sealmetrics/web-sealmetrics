import { PRICING } from "./content/pricing";

const SITE_URL = "https://sealmetrics.com";
const ORG_NAME = "Sealmetrics";

/**
 * Stable node identities for the site's entity graph.
 *
 * Every schema that names a publisher, provider or employer points HERE instead
 * of restating the organisation inline. A search or answer engine resolving the
 * graph then sees one Sealmetrics with one set of `sameAs` profiles, rather than
 * a dozen anonymous Organization objects it has to guess are the same company.
 * The nodes themselves are emitted once per page from `SharedLayout`, so a bare
 * `{"@id": …}` reference always resolves inside the document that uses it.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PERSON_RAFA_ID = `${SITE_URL}/authors/rafa-jimenez/#person`;

/** Reference to the organisation node, for publisher/provider/worksFor slots. */
const orgRef = () => ({ "@id": ORG_ID });

/**
 * Author bylines are hand-written per post and spell the founder's name with
 * and without its accent. Normalising here is what lets every byline resolve to
 * the one Person node instead of minting a new individual per spelling.
 */
/** A Person slot: the canonical node for the founder, a plain node otherwise. */
const personRef = (person: { name: string; url?: string; jobTitle?: string }) => ({
  "@type": "Person",
  // The @id is what unifies the mentions; `url` stays because it is a real
  // property of the node and because the Markdown twins read the author link
  // from here. On the ES tree it points at the Spanish author page — same
  // person, same id, the locale's own address.
  ...(isRafa(person.name) ? { "@id": PERSON_RAFA_ID } : {}),
  name: person.name,
  ...(person.url ? { url: pageHref(person.url) } : {}),
  ...(person.jobTitle ? { jobTitle: person.jobTitle } : {}),
});

const isRafa = (name: string) =>
  name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() ===
  "rafa jimenez";

/**
 * Locale of a page, derived from its own route. Spanish pages used to inherit
 * `inLanguage` from nothing at all, which left the ES tree asserting no language
 * while serving Spanish copy — an inconsistency an engine triangulating the
 * entity will notice before a human does.
 */
export function langOf(url = ""): "en" | "es" {
  return /^\/es(\/|$)/.test(url) ? "es" : "en";
}

/**
 * Build an absolute page URL with a trailing slash so JSON-LD page URLs match
 * the site's rendered canonicals (Next.js `trailingSlash: true` appends "/" to
 * every canonical, e.g. `/security` → `/security/`). Use ONLY for page/document
 * URLs — never for assets (images), external links, or `#fragment` @ids.
 */
function pageHref(path = ""): string {
  const clean = path.replace(/\/+$/, "");
  return clean === "" ? `${SITE_URL}/` : `${SITE_URL}${clean}/`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: ORG_NAME,
        legalName: "Sealmetrics SL",
        url: pageHref(),
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logos/logo-sealmetrics-negro.png`,
          width: 160,
          height: 32,
        },
        description:
          "The source of truth for revenue in European eCommerce: measures traffic without depending on consent, powers revenue decisions with LENS AI, and is designed for GDPR from the architecture up (self-assessed). Enterprise-grade alternative to GA360, Adobe Analytics and Piwik PRO.",
        foundingDate: "2024-03-22",
        // References the canonical Person node emitted by the author page.
        // It used to restate him as "Rafa Jimenez" (no accent) pointing at
        // /about, while every article credited "Rafa Jiménez" pointing at
        // /authors/rafa-jimenez — three nodes for one human being.
        founders: [
          {
            "@type": "Person",
            "@id": PERSON_RAFA_ID,
            name: "Rafa Jiménez",
            url: pageHref("/authors/rafa-jimenez"),
          },
        ],
        vatID: "ESB70933239",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Carrer de Tirso de Molina, 36",
          postalCode: "08940",
          addressLocality: "Cornellà de Llobregat",
          addressRegion: "Barcelona",
          addressCountry: "ES",
        },
        sameAs: [
          "https://www.linkedin.com/company/sealmetrics",
          "https://x.com/sealmetrics",
          "https://www.youtube.com/@sealmetrics",
          "https://www.reddit.com/user/sealmetrics",
          "https://www.g2.com/products/sealmetrics",
          "https://www.capterra.com/p/sealmetrics",
          "https://www.crunchbase.com/organization/sealmetrics",
          // Product Hunt removed on 4 Sep 2026: /products/sealmetrics,
          // /posts/sealmetrics and /products/sealmetrics-2 all 404. A sameAs
          // pointing at nothing asserts a presence the company does not have.
          // Put it back the day the profile exists — audit-sameas.mjs checks.
          "https://github.com/sealmetrics",
        ],
        knowsAbout: [
          "Web Analytics",
          "GDPR Compliance",
          "Cookieless Tracking",
          "Privacy-First Analytics",
          "eCommerce Analytics",
          "Server-Side Tracking",
          "Revenue Attribution",
          "Schrems II Compliance",
          "MCP Protocol",
          "AI Agent Analytics",
        ],
        areaServed: [
          { "@type": "Place", name: "European Union" },
          { "@type": "Place", name: "United Kingdom" },
          { "@type": "Place", name: "Spain" },
          { "@type": "Place", name: "Germany" },
          { "@type": "Place", name: "France" },
          { "@type": "Place", name: "Italy" },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            url: pageHref("/demo"),
            availableLanguage: ["English", "Spanish"],
            areaServed: "EU",
          },
          {
            "@type": "ContactPoint",
            contactType: "technical support",
            url: pageHref("/security"),
            availableLanguage: ["English", "Spanish"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: ORG_NAME,
        url: pageHref(),
        inLanguage: ["en", "es"],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}

export function faqPageSchema(items: { question: string; answer: string }[], pageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl ? { url: pageHref(pageUrl), inLanguage: langOf(pageUrl) } : {}),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
  explicitLocale?: "en" | "es"
) {
  const inferredLocale: "en" | "es" =
    explicitLocale ??
    (items.some((i) => i.url.startsWith("/es/") || i.url === "/es")
      ? "es"
      : "en");
  const rootLabel = inferredLocale === "es" ? "Inicio" : "Home";
  const rootUrl = inferredLocale === "es" ? pageHref("/es") : pageHref();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: rootLabel, item: rootUrl },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: pageHref(item.url),
      })),
    ],
  };
}

export function verticalSoftwareApplicationSchema(props: {
  vertical: string;
  audienceType: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${ORG_NAME} for ${props.vertical}`,
    applicationCategory: "AnalyticsApplication",
    applicationSubCategory: `Analytics for ${props.vertical}`,
    operatingSystem: "Web",
    url: pageHref(props.url),
    image: `${SITE_URL}/logos/logo-sealmetrics-negro.png`,
    description: props.description,
    audience: {
      "@type": "BusinessAudience",
      audienceType: props.audienceType,
      name: `${props.vertical} teams in the European Union`,
    },
    provider: orgRef(),
    inLanguage: langOf(props.url),
    featureList: [
      `Cookieless analytics for ${props.vertical}`,
      "Traffic measurement without consent loss",
      "Designed for GDPR from the architecture up (self-assessed)",
      "Last-click revenue attribution on complete data",
      "EU-hosted in Dublin, Ireland",
    ],
  };
}

export function softwareApplicationSchema(opts?: { locale?: "en" | "es" }) {
  const locale = opts?.locale ?? "en";
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: ORG_NAME,
    applicationCategory: "AnalyticsApplication",
    operatingSystem: "Web",
    url: locale === "es" ? pageHref("/es") : pageHref(),
    image: `${SITE_URL}/logos/logo-sealmetrics-negro.png`,
    inLanguage: locale,
    description:
      locale === "es"
        ? "La fuente de verdad del revenue para eCommerce europeo. Mide el tráfico sin depender del consentimiento, sostiene decisiones de inversión con LENS AI y está diseñada para el RGPD desde la arquitectura (autoevaluación). Alternativa a GA360 y Adobe Analytics."
        : "The source of truth for revenue in European eCommerce. Measures traffic without depending on consent, powers revenue decisions with LENS AI, and is designed for GDPR from the architecture up (self-assessed). Alternative to GA360 and Adobe Analytics.",
    featureList:
      locale === "es"
        ? [
            "Medición cookieless (sin banner de consentimiento)",
            "Medición sin pérdida por consentimiento",
            "Diseñada para RGPD/ePrivacy (autoevaluación)",
            "Atribución de ingresos a último clic",
            "LENS AI — pregunta a tus datos en lenguaje natural",
            "Analítica de agentes de IA",
          ]
        : [
      "Cookieless tracking (no consent banner required)",
      "Traffic measurement without consent loss",
      "Designed for GDPR/ePrivacy (self-assessed)",
      "Revenue attribution",
      "LENS AI — ask your data in plain language",
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "0",
      highPrice: String(PRICING.scale.monthly),
      offerCount: 3,
      availability: "https://schema.org/InStock",
      url: locale === "es" ? pageHref("/es/pricing") : pageHref("/pricing"),
    },
    provider: orgRef(),
  };
}

export function articleSchema(props: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  category?: string;
  image?: string;
  author?: { name: string; url?: string; jobTitle?: string };
}) {
  const blogSlugMatch = props.url.match(/^\/(?:es\/)?blog\/([^/]+)/);
  const autoBlogOg = blogSlugMatch ? `${SITE_URL}/og/blog/${blogSlugMatch[1]}.png` : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: props.headline,
    description: props.description,
    datePublished: props.datePublished,
    // Author-declared only. A post that omits it falls back to its own
    // publication date rather than to anything git-derived — a mechanical
    // sweep must never be able to bump a freshness claim. See CLAUDE.md.
    dateModified: props.dateModified || props.datePublished,
    url: pageHref(props.url),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageHref(props.url),
    },
    image: props.image || autoBlogOg || `${SITE_URL}/logos/logo-sealmetrics-negro.png`,
    // One node per person, addressed by @id. The full description, sameAs and
    // knowsAbout live on the author page; repeating a subset of them here is
    // what produced competing versions of the same author.
    author: props.author ? personRef(props.author) : orgRef(),
    publisher: orgRef(),
    inLanguage: langOf(props.url),
    ...(props.category ? { articleSection: props.category } : {}),
  };
}

export function definedTermSchema(props: {
  name: string;
  description: string;
  url: string;
  related?: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${pageHref(props.url)}#term`,
    name: props.name,
    description: props.description,
    url: pageHref(props.url),
    inLanguage: langOf(props.url),
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Web Analytics Glossary",
      url: pageHref("/glossary"),
    },
    ...(props.related?.length
      ? {
          subjectOf: props.related.map((r) => ({
            "@type": "DefinedTerm",
            name: r.name,
            url: pageHref(r.url),
          })),
        }
      : {}),
  };
}

export function comparisonPageSchema(props: {
  name: string;
  description: string;
  url: string;
  competitor?: { name: string; url: string; wikidata?: string };
  datePublished?: string;
  dateModified?: string;
  author?: { name: string; url: string };
  /** Populated comparison criteria — emitted as ItemList mainEntity to replace empty Table. */
  criteria?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: props.name,
    description: props.description,
    url: pageHref(props.url),
    ...(props.datePublished ? { datePublished: props.datePublished } : {}),
    ...(props.dateModified ? { dateModified: props.dateModified } : {}),
    ...(props.author
      ? {
          // Same node in both slots, and the same node every article credits.
          // The ES tree used to point at /es/authors/rafa-jimenez, minting a
          // second Spanish-speaking founder out of a URL prefix.
          author: personRef(props.author),
          reviewedBy: personRef(props.author),
        }
      : {}),
    // What the page is *about*, as entities. `sameAs` to Wikidata is how an
    // engine confirms that the "Matomo" on this page is the analytics platform
    // and not the commune in Mali. Absent where the product genuinely has no
    // Wikidata item — see src/lib/content/competitors.ts.
    about: [
      {
        "@type": "SoftwareApplication",
        name: ORG_NAME,
        applicationCategory: "AnalyticsApplication",
        url: pageHref(),
        publisher: orgRef(),
      },
      ...(props.competitor
        ? [
            {
              "@type": "SoftwareApplication",
              name: props.competitor.name,
              applicationCategory: "AnalyticsApplication",
              url: props.competitor.url,
              ...(props.competitor.wikidata ? { sameAs: [props.competitor.wikidata] } : {}),
            },
          ]
        : []),
    ],
    mainEntity: props.criteria && props.criteria.length > 0
      ? {
          "@type": "ItemList",
          name: `Comparison criteria — ${ORG_NAME} vs ${props.competitor?.name ?? "competing analytics platforms"}`,
          itemListElement: props.criteria.map((criterion, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: criterion,
          })),
        }
      : {
          "@type": "ItemList",
          name: `Comparison overview — ${ORG_NAME} vs ${props.competitor?.name ?? "competing analytics platforms"}`,
          description: `Feature-by-feature comparison of ${ORG_NAME} vs ${props.competitor?.name ?? "competing analytics platforms"}`,
        },
    inLanguage: langOf(props.url),
    publisher: orgRef(),
  };
}

export function collectionPageSchema(props: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: props.name,
    description: props.description,
    url: pageHref(props.url),
    inLanguage: langOf(props.url),
    publisher: orgRef(),
  };
}

export function speakableWebPageSchema(props: {
  url: string;
  name: string;
  selectors?: string[];
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: props.name,
    url: pageHref(props.url),
    inLanguage: langOf(props.url),
    ...(props.dateModified ? { dateModified: props.dateModified } : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: props.selectors ?? [
        "[data-speakable]",
        ".tldr",
        "h1",
      ],
    },
  };
}

/**
 * DefinedTermSet carrying every glossary definition inline, so AI engines can
 * lift a definition from the index without following through to a term page.
 * Terms without a dedicated page are included — the definition is the value,
 * the URL is optional.
 */
export function definedTermSetSchema(props: {
  name: string;
  description: string;
  url: string;
  terms: { term: string; shortDefinition: string; slug: string; hasPage?: boolean }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: props.name,
    description: props.description,
    url: pageHref(props.url),
    inLanguage: langOf(props.url),
    publisher: orgRef(),
    hasDefinedTerm: props.terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.shortDefinition,
      inDefinedTermSet: pageHref(props.url),
      ...(t.hasPage ? { url: pageHref(`/glossary/${t.slug}`) } : {}),
    })),
  };
}

export function itemListSchema(props: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url?: string; position?: number }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: props.name,
    description: props.description,
    url: pageHref(props.url),
    inLanguage: langOf(props.url),
    numberOfItems: props.items.length,
    itemListElement: props.items.map((item, i) => ({
      "@type": "ListItem",
      position: item.position || i + 1,
      name: item.name,
      ...(item.url ? { url: item.url } : {}),
    })),
  };
}

export function pricingSchema(
  plans: { name: string; price: string; description: string }[],
  opts?: { locale?: "en" | "es" }
) {
  const path = opts?.locale === "es" ? "/es/pricing" : "/pricing";
  // Range must span the full visible price spectrum across both billing modes.
  // Annual prices are passed in via `plans`; monthly comes from PRICING (the
  // "Custom" Enterprise plan returns NaN — filter it out).
  const planPrices = plans.map((p) => Number(p.price)).filter((n) => !Number.isNaN(n));
  const monthlyPrices = [PRICING.growth.monthly, PRICING.scale.monthly];
  const allPrices = [...planPrices, ...monthlyPrices];
  const lowPrice = allPrices.length ? Math.min(...allPrices).toString() : undefined;
  const highPrice = allPrices.length ? Math.max(...allPrices).toString() : undefined;
  // Keep offers valid: one year out from build, never a hard-coded past date.
  const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  const locale = opts?.locale ?? "en";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sealmetrics Analytics",
    // Localised on purpose: an entity described in English inside the Spanish
    // tree is the kind of inconsistency an engine notices while triangulating.
    description:
      locale === "es"
        ? "Analítica web cookieless que mide sin depender del consentimiento y está diseñada para el RGPD desde la arquitectura (autoevaluación). Alternativa enterprise a GA360 y Adobe Analytics."
        : "Cookieless web analytics that measures without depending on consent, designed for GDPR from the architecture up (self-assessed). Enterprise alternative to GA360 and Adobe Analytics.",
    inLanguage: locale,
    image: `${SITE_URL}/logos/logo-sealmetrics-negro.png`,
    brand: { "@type": "Brand", name: ORG_NAME },
    category: "SaaS / Web Analytics",
    offers: {
      "@type": "AggregateOffer",
      ...(lowPrice ? { lowPrice } : {}),
      ...(highPrice ? { highPrice } : {}),
      priceCurrency: "EUR",
      offerCount: plans.length,
      offers: plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: plan.price,
        priceCurrency: "EUR",
        priceValidUntil,
        availability: "https://schema.org/InStock",
        description: plan.description,
        url: pageHref(path),
        category: "SaaS / Analytics",
        eligibleRegion: [
          { "@type": "Place", name: "European Union" },
          { "@type": "Place", name: "United Kingdom" },
        ],
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: plan.price,
          priceCurrency: "EUR",
          unitCode: "MON",
          unitText: "Per month, billed annually",
          billingIncrement: 1,
        },
        seller: orgRef(),
      })),
    },
  };
}

export function servicePageSchema(props: {
  name: string;
  description: string;
  url: string;
  audience?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: props.name,
    description: props.description,
    url: pageHref(props.url),
    ...(props.audience
      ? { audience: { "@type": "Audience", audienceType: props.audience } }
      : {}),
    provider: orgRef(),
    inLanguage: langOf(props.url),
  };
}

/**
 * Statistic claim — replacement for the deprecated ClaimReview type
 * (Google retired ClaimReview rich results in June 2025). Emits a
 * `CreativeWork` whose body is the claim text, with `isBasedOn` pointing
 * to the verifiable source and an optional `QuantitativeValue` for the
 * numeric statistic. Citable by AI engines without the deprecated marker.
 */
export function statisticClaimSchema(props: {
  text: string;
  source: string;
  sourceAuthor: string;
  sourceDate: string;
  url: string;
  numericValue?: number;
  unit?: string;
  /** Stable suffix for the node's @id, unique within the page. */
  id?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    // Addressable so a Dataset or an Article can cite the specific claim rather
    // than the page it happens to sit on. Derived from the claim text when no
    // id is given, so it is stable across builds without being hand-maintained.
    "@id": `${pageHref(props.url)}#claim-${
      props.id ??
      props.text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 60)
    }`,
    name: props.text,
    inLanguage: langOf(props.url),
    text: props.text,
    url: pageHref(props.url),
    isBasedOn: {
      "@type": "CreativeWork",
      name: props.source,
      author: { "@type": "Organization", name: props.sourceAuthor },
      datePublished: props.sourceDate,
    },
    publisher: orgRef(),
    ...(props.numericValue !== undefined
      ? {
          mainEntity: {
            "@type": "QuantitativeValue",
            value: props.numericValue,
            ...(props.unit ? { unitText: props.unit } : {}),
          },
        }
      : {}),
  };
}

export function reviewSchema(props: {
  reviewBody: string;
  authorName: string;
  authorRole?: string;
  ratingValue?: number;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: props.reviewBody,
    author: {
      "@type": "Person",
      name: props.authorName,
      ...(props.authorRole ? { jobTitle: props.authorRole } : {}),
    },
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: ORG_NAME,
      applicationCategory: "AnalyticsApplication",
      url: pageHref(),
    },
    ...(props.datePublished ? { datePublished: props.datePublished } : {}),
    // Never synthesize a star rating. Only emit reviewRating when a real
    // numeric rating was actually given by the customer — testimonials
    // without a rating stay rating-less (avoids Google review-spam action).
    ...(props.ratingValue !== undefined
      ? {
          reviewRating: {
            "@type": "Rating",
            ratingValue: props.ratingValue,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

/** Quotation — marks a testimonial quote as a structured entity citable by AI */
export function quotationSchema(props: {
  text: string;
  spokenBy: string;
  spokenByRole?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Quotation",
    text: props.text,
    spokenByCharacter: {
      "@type": "Person",
      name: props.spokenBy,
      ...(props.spokenByRole ? { jobTitle: props.spokenByRole } : {}),
    },
    url: pageHref(props.url),
    citation: {
      "@type": "CreativeWork",
      author: { "@type": "Organization", name: ORG_NAME, url: pageHref() },
    },
  };
}

export function videoObjectSchema(props: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string; // ISO 8601, e.g. "PT3M24S"
  embedUrl?: string;
  contentUrl?: string;
  inLanguage?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: props.name,
    description: props.description,
    thumbnailUrl: props.thumbnailUrl.startsWith("http")
      ? props.thumbnailUrl
      : `${SITE_URL}${props.thumbnailUrl}`,
    uploadDate: props.uploadDate,
    duration: props.duration,
    ...(props.embedUrl ? { embedUrl: props.embedUrl } : {}),
    ...(props.contentUrl ? { contentUrl: props.contentUrl } : {}),
    ...(props.inLanguage ? { inLanguage: props.inLanguage } : {}),
    url: pageHref(props.url),
    publisher: orgRef(),
  };
}

/**
 * Lightweight Person schema for case-study quote sources. Pairs with
 * Quotation.spokenByCharacter to give AI engines a citable Person URI
 * for named customers (Toni Andújar, Eduardo Martin), without claiming
 * employment or sameAs we cannot verify.
 */
export function casePersonSchema(props: {
  name: string;
  jobTitle: string;
  worksForName: string;
  worksForUrl: string;
  caseUrl: string;
  caseName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: props.name,
    jobTitle: props.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: props.worksForName,
      url: props.worksForUrl,
    },
    url: pageHref(props.caseUrl),
    subjectOf: {
      "@type": "CreativeWork",
      name: props.caseName,
      url: pageHref(props.caseUrl),
    },
  };
}

export function personSchema(props: {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image?: string;
  knowsAbout?: string[];
  sameAs?: string[];
  alumniOf?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    // The author page is where the person is *defined*; everywhere else
    // references this id. Without it, each mention is a separate individual.
    ...(isRafa(props.name) ? { "@id": PERSON_RAFA_ID } : {}),
    name: props.name,
    jobTitle: props.jobTitle,
    description: props.description,
    url: pageHref(props.url),
    ...(props.image ? { image: `${SITE_URL}${props.image}` } : {}),
    ...(props.knowsAbout ? { knowsAbout: props.knowsAbout } : {}),
    ...(props.sameAs ? { sameAs: props.sameAs } : {}),
    ...(props.alumniOf
      ? {
          alumniOf: props.alumniOf.map((a) => ({
            "@type": "Organization",
            name: a,
          })),
        }
      : {}),
    worksFor: orgRef(),
  };
}

export function webApplicationSchema(props: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: props.name,
    description: props.description,
    url: pageHref(props.url),
    applicationCategory: "AnalyticsApplication",
    operatingSystem: "Web",
    provider: orgRef(),
    inLanguage: langOf(props.url),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };
}

/**
 * HowTo for a task the page actually walks the reader through.
 *
 * The steps passed here MUST be the same objects the page renders — see
 * `HowToSteps` — because `howto-schema-not-visible` fails the build when a step
 * exists only inside the script tag. Same rule as FAQPage, same reason: Google's
 * structured data policy, and an engine cannot cite a passage nobody can read.
 */
export function howToSchema(props: {
  name: string;
  description: string;
  url: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
  supply?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: props.name,
    description: props.description,
    url: pageHref(props.url),
    inLanguage: langOf(props.url),
    publisher: orgRef(),
    ...(props.totalTime ? { totalTime: props.totalTime } : {}),
    ...(props.supply?.length
      ? { supply: props.supply.map((s) => ({ "@type": "HowToSupply", name: s })) }
      : {}),
    step: props.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${pageHref(props.url)}#step-${i + 1}`,
    })),
  };
}
