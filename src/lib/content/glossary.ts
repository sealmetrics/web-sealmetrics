export interface GlossaryTerm {
  slug: string;
  term: string;
  shortDefinition: string;
  /** True when a dedicated /glossary/[slug] page exists. Absent = index-only entry. */
  hasPage?: boolean;
  category: string;
  related?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "cookieless-analytics",
    hasPage: true,
    term: "Cookieless Analytics",
    shortDefinition:
      "Web analytics that captures visitor data without using browser cookies, enabling traffic measurement that doesn't depend on consent status or cookie restrictions.",
    category: "Technology",
    related: ["first-party-data-collection", "server-side-tracking", "gdpr-analytics-compliance", "consent-management-platform", "data-loss-in-analytics"],
  },
  {
    slug: "data-sampling",
    hasPage: true,
    term: "Data Sampling",
    shortDefinition:
      "A technique where analytics tools analyze a subset of data and extrapolate results. GA4 applies sampling when traffic exceeds certain thresholds, introducing estimation error.",
    category: "Data Quality",
    related: ["data-loss-in-analytics", "event-tracking", "bounce-rate", "revenue-attribution"],
  },
  {
    slug: "first-party-data-collection",
    hasPage: true,
    term: "First-Party Data Collection",
    shortDefinition:
      "Collecting analytics data through your own domain infrastructure rather than third-party servers. First-party requests are far less likely to be blocked by ad blockers and are not subject to third-party cookie restrictions.",
    category: "Technology",
    related: ["cookieless-analytics", "server-side-tracking", "ad-blocker-analytics-impact", "analytics-data-residency", "intelligent-tracking-prevention"],
  },
  {
    slug: "consent-management-platform",
    hasPage: true,
    term: "Consent Management Platform (CMP)",
    shortDefinition:
      "Software that displays cookie consent banners and manages user preferences. Required under GDPR for websites using cookies or collecting personal data. EU rejection rates vary widely by market — roughly 40-60% on average, and higher in Germany.",
    category: "Privacy",
    related: ["gdpr-analytics-compliance", "cookieless-analytics", "data-loss-in-analytics", "analytics-data-residency"],
  },
  {
    slug: "multi-touch-attribution",
    hasPage: true,
    term: "Multi-Touch Attribution",
    shortDefinition:
      "An analytics model that distributes conversion credit across multiple touchpoints observed for the same identified visitor. Requires per-user tracking and is not part of Sealmetrics' last-click, anonymous architecture.",
    category: "Attribution",
    related: ["attribution-model", "revenue-attribution", "event-tracking", "data-loss-in-analytics"],
  },
  {
    slug: "server-side-tracking",
    hasPage: true,
    term: "Server-Side Tracking",
    shortDefinition:
      "Data collection method where events are processed on the server rather than in the browser. Avoids client-side blocking by ad blockers and browser privacy features.",
    category: "Technology",
    related: ["first-party-data-collection", "cookieless-analytics", "ad-blocker-analytics-impact", "event-tracking"],
  },
  {
    slug: "intelligent-tracking-prevention",
    hasPage: true,
    term: "Intelligent Tracking Prevention (ITP)",
    shortDefinition:
      "Apple Safari's privacy feature that limits cookie lifespan and blocks cross-site tracking. ITP reduces first-party cookie life to 7 days (or 24 hours for some) and blocks all third-party cookies.",
    category: "Privacy",
    related: ["cookieless-analytics", "first-party-data-collection", "data-loss-in-analytics", "ad-blocker-analytics-impact"],
  },
  {
    slug: "data-loss-in-analytics",
    hasPage: true,
    term: "Data Loss in Analytics",
    shortDefinition:
      "The gap between actual website traffic and what analytics tools report. Caused by consent rejection, ad blockers, browser restrictions, and data sampling. Measured at 29% of visits on a real Shopify store; up to 87% in the EU worst-case model.",
    category: "Data Quality",
    related: ["ad-blocker-analytics-impact", "consent-management-platform", "intelligent-tracking-prevention", "data-sampling", "cookieless-analytics"],
  },
  {
    slug: "revenue-attribution",
    hasPage: true,
    term: "Revenue Attribution",
    shortDefinition:
      "Connecting revenue events (purchases, subscriptions) to the marketing channels that drove them. Sealmetrics uses last-click on observed events without consent gaps — no per-user journey tracking, no multi-touch models.",
    category: "Attribution",
    related: ["attribution-model", "multi-touch-attribution", "event-tracking", "data-loss-in-analytics"],
  },
  {
    slug: "gdpr-analytics-compliance",
    hasPage: true,
    term: "GDPR Analytics Compliance",
    shortDefinition:
      "Meeting GDPR requirements for web analytics: lawful basis for processing, data minimization, purpose limitation, and — if using cookies — valid consent collection before tracking.",
    category: "Privacy",
    related: ["consent-management-platform", "analytics-data-residency", "cookieless-analytics", "first-party-data-collection"],
  },
  {
    slug: "personal-data-in-analytics",
    hasPage: true,
    term: "Personal Data in Analytics",
    shortDefinition:
      "Information in an analytics dataset relating to an identified or identifiable person under GDPR Art. 4(1). GDPR applies only to personal data, so analytics processing none falls outside its scope — but ePrivacy Art. 5(3) still governs storage on the device either way.",
    category: "Privacy",
    related: ["gdpr-analytics-compliance", "eprivacy-directive", "cookieless-analytics", "legitimate-interest-analytics"],
  },
  {
    slug: "ad-blocker-analytics-impact",
    hasPage: true,
    term: "Ad Blocker Impact on Analytics",
    shortDefinition:
      "The data loss caused by browser extensions and built-in features that block third-party analytics scripts. Ad blockers affect 40%+ of EU users, making analytics tools like GA4 blind to a significant portion of traffic.",
    category: "Data Quality",
    related: ["data-loss-in-analytics", "first-party-data-collection", "server-side-tracking", "intelligent-tracking-prevention"],
  },
  {
    slug: "bounce-rate",
    hasPage: true,
    term: "Bounce Rate",
    shortDefinition:
      "The percentage of sessions where a visitor views only one page before leaving. In GA4, bounce rate is the inverse of engagement rate — a session is a bounce if it lasts less than 10 seconds, has no conversion, and has no second pageview.",
    category: "Metrics",
    related: ["event-tracking", "data-sampling", "data-loss-in-analytics"],
  },
  {
    slug: "attribution-model",
    hasPage: true,
    term: "Attribution Model",
    shortDefinition:
      "A rule or algorithm that determines how credit for conversions is distributed across marketing touchpoints. Common models include first-touch, last-touch, linear, time-decay, and data-driven attribution.",
    category: "Attribution",
    related: ["multi-touch-attribution", "revenue-attribution", "event-tracking", "data-loss-in-analytics"],
  },
  {
    slug: "event-tracking",
    hasPage: true,
    term: "Event Tracking",
    shortDefinition:
      "The method of recording specific user interactions on a website beyond pageviews — clicks, form submissions, video plays, downloads, and eCommerce actions. GA4 uses an event-based data model where every interaction is an event.",
    category: "Technology",
    related: ["server-side-tracking", "revenue-attribution", "attribution-model", "bounce-rate"],
  },
  {
    slug: "analytics-data-residency",
    hasPage: true,
    term: "Analytics Data Residency",
    shortDefinition:
      "The geographic location where analytics data is processed and stored. Under GDPR, data residency determines which legal frameworks apply and whether cross-border data transfer mechanisms (like SCCs) are required.",
    category: "Privacy",
    related: ["gdpr-analytics-compliance", "first-party-data-collection", "consent-management-platform"],
  },
  {
    slug: "attribution-window",
    hasPage: true,
    term: "Attribution Window",
    shortDefinition:
      "The time period after a marketing touchpoint during which a subsequent conversion is credited to that touchpoint. Windows vary by channel — Google Ads default is 30 days, Meta is 7 days, GA4 is 30/90 days depending on model.",
    category: "Attribution",
    related: ["attribution-model", "last-click-attribution", "multi-touch-attribution", "intelligent-tracking-prevention"],
  },
  {
    slug: "last-click-attribution",
    hasPage: true,
    term: "Last-Click Attribution",
    shortDefinition:
      "An attribution model where 100% of the conversion credit goes to the final marketing touchpoint observed before the conversion event. Sealmetrics applies last-click on data without consent gaps — aggregate, anonymous, at channel level.",
    category: "Attribution",
    related: ["attribution-model", "revenue-attribution", "attribution-window", "multi-touch-attribution"],
  },
  {
    slug: "consent-mode-v2",
    hasPage: true,
    term: "Google Consent Mode v2",
    shortDefinition:
      "Google's framework that allows Analytics and Ads tags to load without storing cookies when the user has rejected consent — then statistically models the missing data. It is a modelling layer, not a measurement layer.",
    category: "Privacy",
    related: ["consent-management-platform", "gdpr-analytics-compliance", "data-loss-in-analytics", "cookieless-analytics"],
  },
  {
    slug: "eprivacy-directive",
    hasPage: true,
    term: "ePrivacy Directive",
    shortDefinition:
      "EU Directive 2002/58/EC governing privacy in electronic communications, including the rule (Art. 5(3)) that consent is required before storing or accessing information on a user's terminal device. The legal basis for cookie consent banners.",
    category: "Privacy",
    related: ["gdpr-analytics-compliance", "consent-management-platform", "cookieless-analytics", "analytics-data-residency"],
  },
  {
    slug: "legitimate-interest-analytics",
    hasPage: true,
    term: "Legitimate Interest (Analytics)",
    shortDefinition:
      "GDPR Article 6(1)(f) lawful basis: processing personal data is permitted when a controller has a legitimate purpose that does not override the data subject's rights. Sometimes invoked for analytics — but ePrivacy still requires consent for cookies.",
    category: "Privacy",
    related: ["gdpr-analytics-compliance", "consent-management-platform", "cookieless-analytics", "eprivacy-directive"],
  },
  {
    slug: "utm-parameters",
    hasPage: true,
    term: "UTM Parameters",
    shortDefinition:
      "Query-string tags — utm_source, utm_medium, utm_campaign, utm_term, utm_content — appended to links so the destination can attribute the visit. The values are whatever you type, so attribution quality depends entirely on naming discipline.",
    category: "Acquisition",
    related: ["last-click-attribution", "attribution-model", "revenue-attribution", "data-loss-in-analytics"],
  },
  {
    slug: "funnel",
    hasPage: true,
    term: "Funnel",
    shortDefinition:
      "An ordered sequence of steps toward a conversion, measured by drop-off between them. Only as trustworthy as its coverage — a funnel built on the consenting minority describes that minority, not your customers.",
    category: "Analysis",
    related: ["event-tracking", "data-loss-in-analytics", "bounce-rate", "cohort"],
  },
  {
    slug: "cohort",
    hasPage: true,
    term: "Cohort",
    shortDefinition:
      "A group sharing a starting characteristic, usually first visit or first purchase period, tracked over time to compare behaviour between groups rather than across a whole audience.",
    category: "Analysis",
    related: ["funnel", "customer-lifetime-value", "multi-touch-attribution", "data-loss-in-analytics"],
  },
  {
    slug: "return-on-ad-spend",
    hasPage: true,
    term: "Return on Ad Spend (ROAS)",
    shortDefinition:
      "Attributed revenue divided by ad spend. The numerator comes from your analytics and the denominator from the ad platform, so unmeasured conversions understate ROAS and push budget away from channels that were working.",
    category: "eCommerce",
    related: ["revenue-attribution", "last-click-attribution", "customer-lifetime-value", "data-loss-in-analytics"],
  },
  {
    slug: "customer-lifetime-value",
    hasPage: true,
    term: "Customer Lifetime Value (LTV)",
    shortDefinition:
      "Expected total margin from a customer relationship. Usually calculated from order data rather than web analytics, precisely because it needs an identity that survives longer than any browser identifier.",
    category: "eCommerce",
    related: ["return-on-ad-spend", "revenue-attribution", "cohort", "data-loss-in-analytics"],
  },

  // ── Index-only entries (no dedicated page) ─────────────────────────────
  // Defined here so the glossary is complete as a reference. Promote an entry
  // to its own page by adding `hasPage: true` and creating the route.

  {
    slug: "pageview",
    term: "Pageview",
    shortDefinition:
      "One instance of a page being loaded or reloaded in a browser. The oldest unit of web measurement, and still the denominator for most traffic reporting.",
    category: "Metrics",
  },
  {
    slug: "session",
    term: "Session",
    shortDefinition:
      "A group of interactions by one visitor within a time window, conventionally ending after 30 minutes of inactivity. The boundary is a convention, not an observed fact — which is why session counts differ between tools measuring the same traffic.",
    category: "Metrics",
  },
  {
    slug: "unique-visitor",
    term: "Unique Visitor",
    shortDefinition:
      "A count of distinct people rather than visits. Every implementation is an approximation, because distinguishing people requires an identifier that persists — and browser restrictions, device switching and consent rejection all break that persistence.",
    category: "Metrics",
  },
  {
    slug: "conversion-rate",
    term: "Conversion Rate",
    shortDefinition:
      "Conversions divided by sessions or visitors. Worth checking which denominator your tool uses: the same data reported per-session and per-visitor can differ by a factor of two.",
    category: "Metrics",
  },
  {
    slug: "exit-rate",
    term: "Exit Rate",
    shortDefinition:
      "The share of sessions that ended on a given page. Distinct from bounce rate, which counts only sessions where that page was also the entry point.",
    category: "Metrics",
  },
  {
    slug: "engagement-rate",
    term: "Engagement Rate",
    shortDefinition:
      "GA4's replacement for the inverse of bounce rate. A session counts as engaged if it lasts over 10 seconds, fires a conversion, or produces two or more pageviews.",
    category: "Metrics",
  },
  {
    slug: "dimension",
    term: "Dimension",
    shortDefinition:
      "A descriptive attribute you group data by — country, channel, landing page, device. Dimensions answer 'which'; metrics answer 'how many'.",
    category: "Metrics",
  },
  {
    slug: "metric",
    term: "Metric",
    shortDefinition:
      "A quantitative measurement — sessions, revenue, conversions. Always paired with dimensions to be meaningful: a number without a breakdown is rarely a decision.",
    category: "Metrics",
  },
  {
    slug: "impression",
    term: "Impression",
    shortDefinition:
      "One instance of content being served or displayed. In search reporting, an impression means your result appeared — regardless of whether the user scrolled far enough to see it.",
    category: "Metrics",
  },
  {
    slug: "click-through-rate",
    term: "Click-Through Rate (CTR)",
    shortDefinition:
      "Clicks divided by impressions. Falling CTR at a stable ranking position usually means the answer is now being rendered in the results page rather than on your site.",
    category: "Metrics",
  },
  {
    slug: "referrer",
    term: "Referrer",
    shortDefinition:
      "The HTTP header naming the page a visitor arrived from. Increasingly stripped or truncated by privacy policies, which is one reason direct traffic keeps growing.",
    category: "Acquisition",
  },
  {
    slug: "direct-traffic",
    term: "Direct Traffic",
    shortDefinition:
      "Visits with no referrer. Partly genuine — typed URLs and bookmarks — and partly a bucket for attribution that failed: stripped referrers, app links, and untagged campaigns.",
    category: "Acquisition",
  },
  {
    slug: "source-medium",
    term: "Source / Medium",
    shortDefinition:
      "The pairing that identifies where a visit came from and how. Source is the origin (google, newsletter); medium is the mechanism (organic, cpc, email).",
    category: "Acquisition",
  },
  {
    slug: "channel-grouping",
    term: "Channel Grouping",
    shortDefinition:
      "Rules that collapse many source/medium combinations into reportable channels — Organic Search, Paid Social, Referral. Two tools with different rules will disagree about the same traffic.",
    category: "Acquisition",
  },
  {
    slug: "organic-traffic",
    term: "Organic Traffic",
    shortDefinition:
      "Visits from unpaid search results. Distinct from direct and referral, and increasingly affected by AI answers that satisfy the query without producing a click.",
    category: "Acquisition",
  },
  {
    slug: "paid-traffic",
    term: "Paid Traffic",
    shortDefinition:
      "Visits from advertising you bought. The channel where measurement error is most expensive, because incomplete conversion data feeds directly back into bidding decisions.",
    category: "Acquisition",
  },
  {
    slug: "tag-manager",
    term: "Tag Manager",
    shortDefinition:
      "A container script that loads and configures other scripts without code deploys. Convenient, and a common source of measurement delay — every tag waits for the container to initialise first.",
    category: "Technology",
  },
  {
    slug: "data-layer",
    term: "Data Layer",
    shortDefinition:
      "A structured JavaScript object a site publishes so measurement tools can read page and transaction context consistently, instead of scraping it out of the DOM.",
    category: "Technology",
  },
  {
    slug: "tracking-pixel",
    term: "Tracking Pixel",
    shortDefinition:
      "A tiny image or request used to record an event by the act of being fetched. The transport matters: an image request is cancelled when a visitor leaves early, while sendBeacon survives page unload.",
    category: "Technology",
  },
  {
    slug: "bot-traffic",
    term: "Bot Traffic",
    shortDefinition:
      "Automated requests from crawlers, monitors, scrapers and AI agents. Unfiltered, it inflates every metric it touches — and the share arriving from AI assistants is now large enough to distort channel reporting.",
    category: "Data Quality",
  },
  {
    slug: "cookie",
    term: "Cookie",
    shortDefinition:
      "A small value a site stores in the browser and reads back later. Under ePrivacy Art. 5(3) the act of storing it requires consent, whatever the value contains — which is why 'our cookie holds no personal data' is not an exemption.",
    category: "Technology",
  },
  {
    slug: "local-storage",
    term: "Local Storage",
    shortDefinition:
      "Browser storage with no expiry, often used as a cookie substitute. It is still storage on the device, so it falls under the same ePrivacy consent rule — a common and expensive misreading.",
    category: "Technology",
  },
  {
    slug: "browser-fingerprinting",
    term: "Browser Fingerprinting",
    shortDefinition:
      "Identifying a device by combining its characteristics — fonts, screen, timezone, hardware — rather than by storing an identifier. Regulators treat the resulting identifier as personal data, and its covertness makes it harder to justify, not easier.",
    category: "Privacy",
  },
  {
    slug: "pseudonymization",
    term: "Pseudonymization",
    shortDefinition:
      "Replacing identifying fields with a reversible token. Explicitly still personal data under GDPR Art. 4(5) — a risk-reduction measure, never a route out of scope.",
    category: "Privacy",
  },
  {
    slug: "anonymization",
    term: "Anonymization",
    shortDefinition:
      "Processing data so nobody can be identified by any means reasonably likely to be used. Genuinely anonymous data leaves GDPR's scope entirely — a high bar, and one that hashing alone does not clear.",
    category: "Privacy",
  },
  {
    slug: "segment",
    term: "Segment",
    shortDefinition:
      "A filtered subset of traffic defined by dimension values — a country, a channel, a device class. The main tool for turning an aggregate number into an explanation.",
    category: "Analysis",
  },
  {
    slug: "average-order-value",
    term: "Average Order Value (AOV)",
    shortDefinition:
      "Total revenue divided by order count. Moves for two very different reasons — real basket changes, or missing orders — so it is worth reconciling against the backend before reading it as behaviour.",
    category: "eCommerce",
  },
  {
    slug: "cost-per-acquisition",
    term: "Cost per Acquisition (CPA)",
    shortDefinition:
      "Spend divided by attributed conversions. Inflates whenever conversions go unmeasured, which makes it the metric most likely to trigger a wrong budget cut.",
    category: "eCommerce",
  },
];

export function getRelatedTerms(slug: string): GlossaryTerm[] {
  const current = glossaryTerms.find((t) => t.slug === slug);
  if (!current?.related?.length) return [];
  return current.related
    .map((s) => glossaryTerms.find((t) => t.slug === s))
    .filter((t): t is GlossaryTerm => t !== undefined);
}
