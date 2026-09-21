export type OpenPartNumber = 1 | 2 | 3 | 4;

export interface OpenPart {
  number: OpenPartNumber;
  title: string;
  subtitle: string;
}

export interface TocItem {
  id: string;
  label: string;
}

export interface OpenChapter {
  number: number;
  slug: string;
  title: string;
  titleHtml?: string;
  part: OpenPartNumber;
  eyebrow: string;
  summary: string;
  readMinutes: number;
  status: "draft" | "ready";
  /**
   * Author-set, never derived. `dateModified` is a freshness claim to Google
   * and to AI engines, so it is bumped only for a real revision of the
   * chapter's argument — not for a link swap, a metadata rewrite or a design
   * pass. Until a chapter is genuinely revised it equals `datePublished`.
   */
  datePublished: string;
  dateModified: string;
  toc: TocItem[];
}

export const openParts: OpenPart[] = [
  { number: 1, title: "Why", subtitle: "Origin and mission" },
  { number: 2, title: "How we measure", subtitle: "Method and architecture" },
  { number: 3, title: "How we operate", subtitle: "Compliance, pricing, customers" },
  { number: 4, title: "Where we go", subtitle: "Future and reference" },
];

export const openChapters: OpenChapter[] = [
  {
    number: 1,
    slug: "why-we-exist",
    title: "Why Sealmetrics exists",
    titleHtml: "Why Sealmetrics <em>exists</em>",
    part: 1,
    eyebrow: "Manifesto",
    summary:
      "Most enterprise eCommerce companies in Europe optimize ad spend on the traffic that agreed to be measured. This is what happens when that gets normalized.",
    readMinutes: 8,
    status: "ready",
    datePublished: "2026-05-27",
    dateModified: "2026-09-21",
    toc: [
      { id: "the-problem", label: "The problem we see" },
      { id: "what-breaks", label: "What breaks in decision-making" },
      { id: "our-position", label: "Our position" },
      { id: "who-we-dont-serve", label: "Who we don't serve" },
    ],
  },
  {
    number: 2,
    slug: "who-we-build-for",
    title: "Who we build for",
    titleHtml: "Who we <em>build for</em>",
    part: 1,
    eyebrow: "Audience",
    summary:
      "Every company knows a large share of its analytics data is missing. We build for the operators who refuse to keep making decisions on top of it — regardless of sector, country, or revenue band.",
    readMinutes: 6,
    status: "ready",
    datePublished: "2026-05-28",
    dateModified: "2026-05-28",
    toc: [
      { id: "the-numbers", label: "The numbers everyone already knows" },
      { id: "the-operator", label: "The operator we build for" },
      { id: "personas", label: "The personas who push for change" },
      { id: "when-we-dont-fit", label: "When we don't fit" },
    ],
  },
  {
    number: 3,
    slug: "what-complete-data-means",
    title: "What complete data means",
    titleHtml: "What <em>complete data</em> means",
    part: 2,
    eyebrow: "Definition",
    summary:
      "The technical difference between what GA4 measures (on one real store, 29% of visits went unrecorded) and what you need to defend a number to your CFO.",
    readMinutes: 8,
    status: "ready",
    datePublished: "2026-05-28",
    dateModified: "2026-09-21",
    toc: [
      { id: "the-cascade", label: "Where the gap comes from" },
      { id: "sampling-vs-complete", label: "Sampling vs complete measurement" },
      { id: "modeling-vs-measuring", label: "Modeling vs measuring" },
      { id: "where-we-sit", label: "Where Sealmetrics sits" },
    ],
  },
  {
    number: 4,
    slug: "how-the-pixel-works",
    title: "How the pixel works",
    part: 2,
    eyebrow: "Method",
    summary:
      "No cookies, no fingerprinting, no localStorage. 60+ server-side validation rules and last-click attribution over events without consent gaps.",
    readMinutes: 10,
    status: "draft",
    datePublished: "2026-05-27",
    dateModified: "2026-05-27",
    toc: [
      { id: "what-it-captures", label: "What the pixel captures" },
      { id: "server-validation", label: "Server-side validation · 60+ rules" },
      { id: "last-click-attribution", label: "Last-click attribution without consent gaps" },
      { id: "what-it-doesnt-capture", label: "What it doesn't capture by design" },
    ],
  },
  {
    number: 5,
    slug: "architecture-and-performance",
    title: "Architecture and performance",
    titleHtml: "Architecture and <em>performance</em>",
    part: 2,
    eyebrow: "Infrastructure",
    summary:
      "Where the pixel runs, what latency it adds, how it scales. No promises — verifiable numbers.",
    readMinutes: 6,
    status: "ready",
    datePublished: "2026-05-27",
    dateModified: "2026-05-27",
    toc: [
      { id: "where-it-runs", label: "Where the pixel runs" },
      { id: "latency", label: "Latency and client footprint" },
      { id: "scale", label: "Capacity and scaling" },
      { id: "availability", label: "Availability and SLAs" },
      { id: "what-we-dont-measure", label: "What we don't measure" },
    ],
  },
  {
    number: 6,
    slug: "gdpr-by-architecture",
    title: "Designed for GDPR from the architecture up",
    titleHtml: "Designed for GDPR <em>from the architecture up</em>",
    part: 3,
    eyebrow: "Compliance",
    summary:
      "How we design for GDPR, ePrivacy, and Schrems II without resorting to creative legal interpretations — a self-assessment, not a certification, and what we explicitly do not claim.",
    readMinutes: 10,
    status: "ready",
    datePublished: "2026-05-28",
    dateModified: "2026-09-21",
    toc: [
      { id: "gdpr-architecture", label: "Designed for GDPR from the architecture up, not by permission" },
      { id: "eprivacy", label: "ePrivacy and the cookie question" },
      { id: "schrems-ii", label: "Schrems II and data transfers" },
      { id: "dpa-tpsr", label: "DPA and TPSR package" },
    ],
  },
  {
    number: 7,
    slug: "how-we-price",
    title: "How we price",
    titleHtml: "How we <em>price</em>",
    part: 3,
    eyebrow: "Commercial",
    summary:
      "Pay for human events, not for bots or AI agents. One architecture across plans. Honest comparison against the enterprise tier we replace.",
    readMinutes: 8,
    status: "ready",
    datePublished: "2026-05-28",
    dateModified: "2026-09-21",
    toc: [
      { id: "what-we-charge-for", label: "What we charge for and what we don't" },
      { id: "three-plans", label: "Three plans, one architecture" },
      { id: "enterprise-compare", label: "Comparing against the enterprise tier" },
      { id: "billing-transparency", label: "What you see on the invoice" },
    ],
  },
  {
    number: 8,
    slug: "how-we-work-with-customers",
    title: "How we work with customers",
    part: 3,
    eyebrow: "Operation",
    summary:
      "Onboarding, support, and partners: Product Hackers, 3dids, Ayesa. How we come in and how we stay.",
    readMinutes: 6,
    status: "draft",
    datePublished: "2026-05-27",
    dateModified: "2026-05-27",
    toc: [
      { id: "onboarding", label: "Onboarding in four phases" },
      { id: "support", label: "How we support customers" },
      { id: "partners", label: "Implementation partners" },
      { id: "founder-access", label: "Direct access to the founder" },
    ],
  },
  {
    number: 9,
    slug: "what-we-wont-do",
    title: "What we won't do",
    titleHtml: "What we <em>won't</em> do",
    part: 3,
    eyebrow: "Limits",
    summary:
      "No multi-touch attribution. No session reconstruction. No individual identification. No fingerprinting. Why this is a position, not a limitation.",
    readMinutes: 7,
    status: "ready",
    datePublished: "2026-05-28",
    dateModified: "2026-09-21",
    toc: [
      { id: "no-multi-touch", label: "We won't do multi-touch attribution" },
      { id: "no-sessions", label: "We won't reconstruct sessions" },
      { id: "no-individuals", label: "We won't identify individuals" },
      { id: "no-fingerprint", label: "We won't fingerprint" },
      { id: "why", label: "Why this is a position" },
    ],
  },
  {
    number: 10,
    slug: "where-were-going",
    title: "Where we're going",
    part: 4,
    eyebrow: "Roadmap",
    summary:
      "LENS AI, native MCP, and the direction we're betting on for the next 18 months.",
    readMinutes: 5,
    status: "draft",
    datePublished: "2026-05-27",
    dateModified: "2026-05-27",
    toc: [
      { id: "lens-ai", label: "LENS AI" },
      { id: "mcp", label: "Native MCP server" },
      { id: "next-18-months", label: "Next 18 months" },
      { id: "what-wont-ship", label: "What we won't ship" },
    ],
  },
  {
    number: 11,
    slug: "glossary",
    title: "Glossary",
    titleHtml: "<em>Glossary</em>",
    part: 4,
    eyebrow: "Reference",
    summary:
      "Opinionated definitions of the terms used across Open. Where we use a word differently from the rest of the industry, we say so.",
    readMinutes: 7,
    status: "ready",
    datePublished: "2026-05-28",
    dateModified: "2026-09-21",
    toc: [
      { id: "method", label: "Method and measurement" },
      { id: "compliance", label: "Legal compliance" },
      { id: "architecture", label: "Technical architecture" },
      { id: "commercial", label: "Commercial vocabulary" },
    ],
  },
];

export function getChapterBySlug(slug: string): OpenChapter | undefined {
  return openChapters.find((c) => c.slug === slug);
}

/**
 * Only chapters with `status: "ready"` are published.
 * Drafts remain in the data structure (so the editorial plan and TOC stay
 * intact) but are hidden from public listing, routing, and navigation.
 */
export const publishedChapters: OpenChapter[] = openChapters.filter(
  (c) => c.status === "ready",
);

export function isPublished(slug: string): boolean {
  return publishedChapters.some((c) => c.slug === slug);
}

export function getAdjacentChapters(slug: string): {
  prev?: OpenChapter;
  next?: OpenChapter;
} {
  const idx = publishedChapters.findIndex((c) => c.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? publishedChapters[idx - 1] : undefined,
    next:
      idx < publishedChapters.length - 1
        ? publishedChapters[idx + 1]
        : undefined,
  };
}

export function chaptersByPart(part: OpenPartNumber): OpenChapter[] {
  return openChapters.filter((c) => c.part === part);
}

export function publishedChaptersByPart(
  part: OpenPartNumber,
): OpenChapter[] {
  return publishedChapters.filter((c) => c.part === part);
}

export const OPEN_BASE_PATH = "/open";
export const OPEN_TOTAL_MINUTES = openChapters.reduce(
  (sum, c) => sum + c.readMinutes,
  0,
);
export const OPEN_PUBLISHED_MINUTES = publishedChapters.reduce(
  (sum, c) => sum + c.readMinutes,
  0,
);
