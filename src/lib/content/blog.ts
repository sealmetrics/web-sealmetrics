export interface BlogAuthor {
  name: string;
  url?: string;
  jobTitle?: string;
}

export const AUTHORS = {
  rafa: {
    name: "Rafa Jiménez",
    url: "/authors/rafa-jimenez",
    jobTitle: "Founder, Sealmetrics",
  } satisfies BlogAuthor,
  sealmetrics: {
    name: "Sealmetrics Team",
    url: "/about",
  } satisfies BlogAuthor,
};

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** Publication date, ISO. Also the sitemap <lastmod> floor. */
  date: string;
  /**
   * Last real content revision, ISO. Author-set and never derived — see
   * CLAUDE.md. Lives HERE rather than in the page so that the sitemap, the
   * Article schema and the visible byline all read one value; when it lived in
   * each page's articleSchema() call the sitemap could not see it and
   * under-reported freshness on every revised post.
   */
  dateModified?: string;
  /**
   * The Spanish page's own revision date, when the translation was revised on a
   * different day than the English original. Six posts are in that position.
   * Falls back to `dateModified`.
   */
  dateModifiedEs?: string;
  /**
   * The Spanish page's own publication date, when the translation was
   * published after the English original. Without it the Spanish Article would
   * claim to exist since the English date. Falls back to `date`.
   */
  dateEs?: string;
  category: string;
  readTime: string;
  author?: BlogAuthor;
  draft?: boolean;
  related?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-ga4-shows-direct-none",
    title: "Why GA4 Shows So Much (direct) / (none) Traffic, and What Fixes It",
    description:
      "(direct) / (none) in GA4 is a symptom, not a channel. The six causes, how to diagnose them in your own property, and what fixing the tag cannot recover.",
    date: "2026-09-14",
    category: "Data Quality",
    readTime: "9 min",
    author: AUTHORS.rafa,
    related: ["why-ga4-shows-13pct-eu-traffic", "consent-banner-impact-on-analytics", "cookieless-analytics-for-ecommerce"],
  },
  {
    slug: "demdex-analytics-cookies-guide",
    title: "Demdex Analytics Cookies: Why They Are Being Blocked and How to Fix Data Loss",
    description: "Understanding demdex analytics cookies: Why third-party cookie blocking is breaking Adobe Analytics and how to capture 100% of your traffic cookieless.",
    date: "2026-09-04",
    category: "Data Quality",
    readTime: "7 min",
    author: AUTHORS.rafa,
    related: [],
  },
  {
    slug: "dpo-rejected-google-analytics-eu-alternatives",
    title: "Our DPO rejected Google Analytics. What analytics can we use without legal risk in the EU?",
    description: "Is your DPO rejecting Google Analytics? Learn why GA4 is a legal risk in the EU and discover compliant, consentless analytics alternatives for your business.",
    date: "2026-08-30",
    dateModified: "2026-09-04",
    category: "Regulation",
    readTime: "7 min",
    author: AUTHORS.rafa,
    related: [],
  },
  {
    slug: "data-breach-france-travail-fined-5-million",
    title: "Data breach: France Travail fined €5 million – Lessons in Security and Privacy",
    description:
      "Learn why France Travail was fined €5 million for a data breach and how technical security, access controls, and cookieless analytics mitigate GDPR risks.",
    date: "2026-08-27",
    dateModified: "2026-08-27",
    category: "Regulation",
    readTime: "7 min",
    author: AUTHORS.rafa,
    related: [],
  },
  {
    slug: "ftc-personalized-pricing-enforcement-compliance-guide",
    title: "FTC Seeks Comment on Enforcement Policy Statement Regarding Personalized Pricing: A Guide for eCommerce Brands",
    description: "Explore the implications of the FTC's latest stance on personalized pricing and how cookieless, privacy-first analytics can mitigate regulatory risks.",
    date: "2026-08-27",
    dateModified: "2026-08-27",
    category: "Regulation",
    readTime: "8 min",
    author: AUTHORS.rafa,
    related: [],
  },
  {
    slug: "self-service-analytics-for-marketing-teams",
    title: "Self-Service Analytics for Marketing Teams: How Sealmetrics Does It",
    description:
      "A marketing team gets a correct answer without opening a ticket. 100% of traffic measured without consent, 47 named read-only tools instead of raw SQL, and BYOK or an isolated private AI instance.",
    date: "2026-08-06",
    dateModified: "2026-09-14",
    category: "AI & Analytics",
    readTime: "8 min",
    author: AUTHORS.rafa,
    related: [
      "self-service-analytics-lens-ai",
      "ai-agent-traffic-analytics",
      "why-ga4-shows-13pct-eu-traffic",
    ],
  },
  {
    slug: "best-web-analytics-tool",
    title: "The Best Web Analytics Tool: 12 Requirements That Decide It",
    description:
      "Not a vendor list. The 12 technical requirements a web analytics platform must meet — pixel weight, real time, 100% of the data, API, MCP — and how to test each one.",
    date: "2026-08-06",
    dateModified: "2026-09-14",
    category: "Comparisons",
    readTime: "12 min",
    author: AUTHORS.rafa,
    related: [
      "best-enterprise-analytics-platforms",
      "we-measured-every-analytics-script",
      "ga4-data-sampling-problem",
    ],
  },
  {
    slug: "is-matomo-gdpr-compliant",
    title: "Is Matomo GDPR Compliant?",
    description:
      "Matomo can run banner-free in France under the CNIL criteria, with cookies still on. The six conditions, what the exempt configuration costs you in attribution, and why it does not travel to Germany.",
    date: "2026-08-26",
    dateModified: "2026-08-26",
    category: "Regulation",
    readTime: "9 min",
    author: AUTHORS.rafa,
    related: [
      "gdpr-eprivacy-analytics-legal-assessment",
      "is-adobe-analytics-gdpr-compliant",
      "cnil-self-assessment-published",
    ],
  },
  {
    slug: "is-adobe-analytics-gdpr-compliant",
    title: "Is Adobe Analytics GDPR Compliant?",
    description:
      "Adobe Analytics can be deployed compliantly under GDPR — consent, a DPA, a transfer assessment and deliberate configuration. What that costs you is not legal, it is 40–60% of your EU visitors.",
    date: "2026-07-28",
    dateModified: "2026-07-28",
    category: "Regulation",
    readTime: "8 min",
    author: AUTHORS.rafa,
    related: [
      "gdpr-eprivacy-analytics-legal-assessment",
      "analytics-tools-external-domains",
      "gdpr-analytics-without-consent",
    ],
  },
  {
    slug: "gdpr-analytics-spain-faq",
    title: "GDPR Analytics in Spain: 7 Questions Online Stores Ask",
    description:
      "Does a Spanish online store need a cookie banner for analytics? Is GA4 legal in Spain? What does the AEPD allow, and what does LSSI non-compliance cost? Direct answers, one per question.",
    date: "2026-07-07",
    dateModified: "2026-09-14",
    category: "Regulation",
    readTime: "5 min",
    author: AUTHORS.rafa,
    related: [
      "gdpr-eprivacy-analytics-legal-assessment",
      "gdpr-analytics-without-consent",
      "consent-banner-impact-on-analytics",
    ],
  },
  {
    slug: "gdpr-eprivacy-analytics-legal-assessment",
    title: "Is Your Analytics Actually GDPR-Compliant? A Legal Assessment",
    description:
      "GDPR and ePrivacy are two different laws, and analytics has to clear both to run without a consent banner. The legal test, plus a per-tool verdict for GA4, Matomo, Plausible, Piwik PRO and Sealmetrics.",
    date: "2026-07-06",
    dateModified: "2026-07-06",
    category: "Regulation",
    readTime: "9 min",
    author: AUTHORS.rafa,
    related: [
      "gdpr-analytics-without-consent",
      "why-ga4-shows-13pct-eu-traffic",
      "best-enterprise-analytics-platforms",
    ],
  },
  {
    slug: "self-service-analytics-lens-ai",
    title: "How Sealmetrics Enables Self-Service Analytics With LENS AI",
    description:
      "Point an LLM at incomplete GA4 data and it invents answers. How complete cookieless data plus the Sealmetrics MCP let teams query their own analytics — no analyst in the loop.",
    date: "2026-07-05",
    dateModified: "2026-07-06",
    dateModifiedEs: "2026-07-05",
    category: "AI & Analytics",
    readTime: "10 min",
    author: AUTHORS.rafa,
    related: [
      "ai-agent-traffic-analytics",
      "why-ga4-shows-13pct-eu-traffic",
      "best-enterprise-analytics-platforms",
    ],
  },
  {
    slug: "cookieless-analytics-for-ecommerce",
    title: "Cookieless Analytics for eCommerce: The 2026 Guide",
    description:
      "How European eCommerce teams measure revenue, attribution and conversion without cookies or consent banners. Shopify, WooCommerce and Magento reconciliation patterns.",
    date: "2026-04-24",
    dateModified: "2026-09-14",
    dateEs: "2026-09-14",
    dateModifiedEs: "2026-09-14",
    category: "eCommerce",
    readTime: "10 min",
    author: AUTHORS.rafa,
    related: [
      "why-ga4-shows-13pct-eu-traffic",
      "cookieless-analytics-explained",
      "consentless-analytics-for-dtc",
    ],
  },
  {
    slug: "cookieless-analytics-for-hotels",
    title: "Cookieless Analytics for Hotels: Direct-Booking Attribution in 2026",
    description:
      "How hotel groups measure direct bookings, meta-search revenue and multi-property portfolios without cookies. PMS reconciliation patterns that work with any PMS.",
    date: "2026-04-24",
    dateModified: "2026-09-14",
    dateEs: "2026-09-14",
    dateModifiedEs: "2026-09-14",
    category: "Hotels",
    readTime: "9 min",
    author: AUTHORS.rafa,
    related: [
      "cookieless-analytics-for-ecommerce",
      "cookieless-analytics-explained",
      "why-ga4-shows-13pct-eu-traffic",
    ],
  },
  {
    slug: "cookieless-analytics-for-saas",
    title: "Cookieless Analytics for SaaS: PLG Without Consent Banners",
    description:
      "How European SaaS teams measure trial-to-paid, PQLs and self-serve funnels without cookies. Works alongside Mixpanel/Amplitude, exports to BigQuery.",
    date: "2026-04-24",
    dateModified: "2026-05-28",
    category: "SaaS",
    readTime: "8 min",
    author: AUTHORS.rafa,
    related: [
      "cookieless-analytics-for-ecommerce",
      "cookieless-analytics-explained",
      "multi-touch-attribution-complete-data",
    ],
  },
  {
    slug: "consentless-analytics-for-dtc",
    title: "Consentless Analytics for DTC: What It Is and Why It Matters in 2026",
    description:
      "Consentless analytics measures DTC traffic without waiting for the cookie banner. How it works under GDPR and ePrivacy, and what European DTC teams get from it.",
    date: "2026-04-24",
    dateModified: "2026-09-14",
    dateEs: "2026-09-14",
    dateModifiedEs: "2026-09-14",
    category: "eCommerce",
    readTime: "7 min",
    author: AUTHORS.rafa,
    related: [
      "cookieless-analytics-for-ecommerce",
      "gdpr-analytics-without-consent",
      "cookieless-analytics-explained",
    ],
  },
  {
    slug: "best-enterprise-analytics-platforms",
    title: "8 Best Enterprise Analytics Platforms in 2026",
    description:
      "Ranked comparison of GA4, GA360, Adobe Analytics, Piwik PRO, Sealmetrics, Amplitude, Mixpanel, and Matomo for enterprise teams.",
    date: "2026-03-16",
    dateModified: "2026-09-14",
    category: "Comparisons",
    readTime: "12 min",
    author: AUTHORS.sealmetrics,
    related: ["ga4-alternatives-enterprise", "ga4-data-sampling-problem", "analytics-tools-data-sampling"],
  },
  {
    slug: "analytics-tools-lighthouse-scores",
    title:
      "We Added 9 Analytics Tools to the Same Page. Here Are the Lighthouse Scores.",
    description:
      "Same HTML page, 9 analytics tools, 5 Lighthouse runs each. GA4 drops your Performance score by 8 points. Adobe by 12. Sealmetrics by 0.",
    date: "2026-03-08",
    dateModified: "2026-05-04",
    category: "Performance",
    readTime: "5 min",
    author: AUTHORS.rafa,
    draft: true,
  },
  {
    slug: "analytics-tools-ad-blocker-test",
    title:
      "We Tested 9 Analytics Tools Against Every Major Ad Blocker",
    description:
      "uBlock Origin, AdBlock Plus, Brave, Firefox ETP, Privacy Badger. We tested which analytics tools survive and which lose 30% of visitors.",
    date: "2026-03-07",
    dateModified: "2026-05-04",
    category: "Data Quality",
    readTime: "5 min",
    author: AUTHORS.rafa,
    draft: true,
  },
  {
    slug: "why-ga4-shows-13pct-eu-traffic",
    title: "Why GA4 Can Show as Little as 13% of Your EU Traffic",
    description:
      "Consent rejection, ad blockers and browser limits compound: in the worst case GA4 sees about 13% of EU traffic. A measured store lost 29% of visits.",
    date: "2026-03-06",
    dateModified: "2026-09-14",
    dateModifiedEs: "2026-09-14",
    category: "Data Quality",
    readTime: "8 min",
    author: AUTHORS.rafa,
    related: ["consent-banner-impact-on-analytics", "what-is-data-loss-in-analytics", "ga4-data-sampling-problem"],
  },
  {
    slug: "analytics-tools-http-requests",
    title:
      "How Many HTTP Requests Does Your Analytics Tool Make? We Counted.",
    description:
      "One pageview, one browser. GA4 makes 4 requests to 3 domains. Adobe makes 6 to 4 domains. Sealmetrics makes 2 to 1. The network waterfall tells the story.",
    date: "2026-03-06",
    dateModified: "2026-05-04",
    category: "Performance",
    readTime: "4 min",
    author: AUTHORS.rafa,
    draft: true,
  },
  {
    slug: "analytics-tools-cookies-cataloged",
    title:
      "Every Cookie Set by Every Major Analytics Tool, Cataloged",
    description:
      "We cataloged every cookie from 9 analytics tools using vendor docs and DevTools. GA4 sets 2 first-party cookies. Adobe sets 6. Sealmetrics sets 0.",
    date: "2026-03-05",
    dateModified: "2026-05-04",
    category: "Privacy",
    readTime: "5 min",
    author: AUTHORS.rafa,
    related: ["analytics-tools-external-domains", "cookieless-analytics-explained", "gdpr-analytics-without-consent"],
  },
  {
    slug: "analytics-tools-external-domains",
    title:
      "Your Analytics Tool Contacts 7 Domains. Here Is Why That Matters.",
    description:
      "Every external domain is a DNS lookup, a privacy risk, and a GDPR liability. We mapped every domain contacted by 9 analytics tools.",
    date: "2026-03-04",
    dateModified: "2026-05-04",
    category: "Privacy",
    readTime: "4 min",
    author: AUTHORS.rafa,
    related: ["analytics-tools-cookies-cataloged", "analytics-scripts-costing-you-sales", "we-measured-every-analytics-script"],
  },
  {
    slug: "analytics-tools-data-sampling",
    title:
      "When Your Analytics Starts Guessing: Data Sampling Thresholds Compared",
    description:
      "GA4 starts sampling at 10M events in Explorations. Adobe varies by contract. Piwik PRO: optional. Sealmetrics: never. We documented every threshold.",
    date: "2026-03-03",
    dateModified: "2026-08-27",
    category: "Data Quality",
    readTime: "5 min",
    author: AUTHORS.rafa,
    related: ["ga4-data-sampling-problem", "what-is-data-loss-in-analytics", "best-enterprise-analytics-platforms"],
  },
  {
    slug: "analytics-scripts-costing-you-sales",
    title:
      "The Hidden Conversion Killer: How Analytics Scripts Are Costing You Sales",
    description:
      "Heavy analytics scripts slow your site, consent banners hide visitors, and ad blockers erase data. The compound effect is costing you conversions.",
    date: "2026-02-26",
    dateModified: "2026-05-28",
    category: "Performance",
    readTime: "3 min",
    author: AUTHORS.rafa,
    related: ["we-measured-every-analytics-script", "consent-banner-impact-on-analytics", "analytics-tools-external-domains"],
  },
  {
    slug: "we-measured-every-analytics-script",
    title: "We Measured Every Analytics Script. Here Is What We Found.",
    description:
      "We measured major analytics scripts from production CDNs. GA4 was 132x heavier than Sealmetrics, the lightest of the ten tools tested.",
    date: "2026-02-20",
    dateModified: "2026-05-04",
    category: "Performance",
    readTime: "4 min",
    author: AUTHORS.rafa,
    related: ["analytics-scripts-costing-you-sales", "analytics-tools-external-domains", "analytics-tools-cookies-cataloged"],
  },
  {
    slug: "uk-pecr-analytics-exemption",
    title:
      "UK Analytics Exemption Is Now Live: Our PECR Self-Assessment",
    description:
      "The DUAA 2025 exempts certain analytics from consent requirements in the UK. We published our self-assessment showing how Sealmetrics qualifies.",
    date: "2026-02-17",
    dateModified: "2026-05-28",
    category: "Regulation",
    readTime: "2 min",
    author: AUTHORS.rafa,
    related: ["cnil-self-assessment-published", "gdpr-analytics-without-consent", "eu-digital-omnibus-cookie-banners-analytics"],
  },
  {
    slug: "ga4-data-sampling-problem",
    title: "GA4 Data Sampling: Why Your Traffic Numbers Are Wrong",
    description:
      "GA4 applies data sampling when traffic exceeds certain thresholds. Here is how it works, why it matters, and what you can do about it.",
    date: "2026-02-15",
    dateModified: "2026-09-14",
    dateModifiedEs: "2026-09-14",
    category: "Data Quality",
    readTime: "7 min",
    author: AUTHORS.rafa,
    related: ["analytics-tools-data-sampling", "why-ga4-shows-13pct-eu-traffic", "ga4-alternatives-enterprise"],
  },
  {
    slug: "eu-digital-omnibus-cookie-banners-analytics",
    title:
      "The EU Digital Omnibus: What It Means for Cookie Banners and Analytics",
    description:
      "The European Commission proposed the biggest change to EU data law since GDPR. Cookie consent moves to GDPR, and first-party analytics may not require consent.",
    date: "2026-02-12",
    dateModified: "2026-09-14",
    category: "Regulation",
    readTime: "2 min",
    author: AUTHORS.rafa,
    related: ["eu-digital-omnibus-marketer-guide-2026", "consent-banner-impact-on-analytics", "gdpr-analytics-without-consent"],
  },
  {
    slug: "eu-digital-omnibus-marketer-guide-2026",
    title:
      "The EU Digital Omnibus Explained: What Every Marketer Needs to Know in 2026",
    description:
      "Cookie banners could vanish for 60% of websites. First-party analytics gets explicit legal authorization. A deep dive into COM(2025) 837 and what to do now.",
    date: "2026-02-12",
    dateModified: "2026-05-04",
    category: "Regulation",
    readTime: "6 min",
    author: AUTHORS.rafa,
    related: ["eu-digital-omnibus-cookie-banners-analytics", "cnil-self-assessment-published", "uk-pecr-analytics-exemption"],
  },
  {
    slug: "cnil-self-assessment-published",
    title: "We Published Our CNIL Self-Assessment",
    description:
      "The French CNIL allows certain analytics tools to operate without cookie banners. We documented how Sealmetrics meets all 14 technical criteria.",
    date: "2026-02-10",
    dateModified: "2026-05-28",
    category: "Regulation",
    readTime: "2 min",
    author: AUTHORS.rafa,
    related: ["uk-pecr-analytics-exemption", "gdpr-analytics-without-consent", "eu-digital-omnibus-marketer-guide-2026"],
  },
  {
    slug: "cookieless-analytics-explained",
    title: "Cookieless Analytics Explained: How to Measure Without Cookies",
    description:
      "Cookies are disappearing. Learn how cookieless analytics works, why it captures more data, and what it means for GDPR compliance.",
    date: "2026-02-08",
    dateModified: "2026-09-14",
    dateModifiedEs: "2026-09-14",
    category: "Technology",
    readTime: "8 min",
    author: AUTHORS.rafa,
    related: ["what-is-cookieless-tracking", "analytics-tools-cookies-cataloged", "consent-banner-impact-on-analytics"],
  },
  {
    slug: "consent-banner-impact-on-analytics",
    title: "How Consent Banners Destroy Your Analytics Data",
    description:
      "35% of EU visitors reject cookies. That means 35% of your traffic is invisible. Here is the real impact on attribution, conversions, and revenue reporting.",
    date: "2026-01-25",
    dateModified: "2026-05-28",
    dateModifiedEs: "2026-05-06",
    category: "Data Quality",
    readTime: "6 min",
    author: AUTHORS.rafa,
    related: ["why-ga4-shows-13pct-eu-traffic", "cookieless-analytics-explained", "eu-digital-omnibus-cookie-banners-analytics"],
  },
  {
    slug: "ai-agent-traffic-analytics",
    title: "AI Agent Traffic: The Invisible Channel Your Analytics Miss",
    description:
      "GPT, Claude, Perplexity, and Google AI Overviews are sending traffic to your site. Traditional analytics cannot see it. Here is why it matters.",
    date: "2026-01-18",
    dateModified: "2026-05-04",
    category: "AI & Analytics",
    readTime: "5 min",
    author: AUTHORS.rafa,
    related: ["what-is-data-loss-in-analytics", "why-ga4-shows-13pct-eu-traffic", "best-enterprise-analytics-platforms"],
  },
  {
    slug: "multi-touch-attribution-complete-data",
    title: "Why Multi-Touch Attribution Fails Without Complete Data",
    description:
      "Your attribution model is only as good as the data feeding it. When a large, uneven share of touchpoints is missing, attribution conclusions tilt.",
    date: "2026-01-10",
    dateModified: "2026-09-14",
    category: "Attribution",
    readTime: "7 min",
    author: AUTHORS.rafa,
    related: ["consent-banner-impact-on-analytics", "what-is-data-loss-in-analytics", "why-ga4-shows-13pct-eu-traffic"],
  },
  {
    slug: "what-is-cookieless-tracking",
    title:
      "What Is Cookieless Tracking? A Complete Guide for 2026",
    description:
      "Cookieless tracking captures visitor behavior without browser cookies. Learn how it works, why it matters for GDPR compliance, and how it compares to traditional analytics.",
    date: "2026-03-02",
    dateModified: "2026-09-14",
    category: "Technology",
    readTime: "8 min",
    author: AUTHORS.rafa,
    related: ["cookieless-analytics-explained", "gdpr-analytics-without-consent", "consent-banner-impact-on-analytics"],
  },
  {
    slug: "what-is-data-loss-in-analytics",
    title:
      "What Is Data Loss in Analytics? Causes, Impact, and Solutions",
    description:
      "Analytics data loss is the gap between real traffic and reported traffic. Learn the four causes, quantify the impact, and understand how to eliminate it.",
    date: "2026-03-02",
    dateModified: "2026-09-14",
    category: "Data Quality",
    readTime: "7 min",
    author: AUTHORS.rafa,
    related: ["why-ga4-shows-13pct-eu-traffic", "consent-banner-impact-on-analytics", "multi-touch-attribution-complete-data"],
  },
  {
    slug: "ga4-alternatives-enterprise",
    title: "7 GA4 Alternatives for eCommerce Teams in 2026",
    description:
      "Compare 7 GA4 alternatives for eCommerce: pricing, data capture rates, EU compliance, and eCommerce features. From GA360 to cookieless platforms.",
    date: "2026-03-02",
    dateModified: "2026-09-14",
    category: "Comparisons",
    readTime: "10 min",
    author: AUTHORS.rafa,
    related: ["best-enterprise-analytics-platforms", "ga4-data-sampling-problem", "why-ga4-shows-13pct-eu-traffic"],
  },
  {
    slug: "ga4-google-ads-separation",
    title: "GA4 y Google Ads: la separacion que nadie vio venir",
    description:
      "Google elimina Google Signals como control de datos GA4 a Google Ads en junio 2026. Analisis del impacto real en datos y riesgo legal para anunciantes europeos.",
    date: "2026-04-16",
    dateModified: "2026-05-04",
    category: "Privacidad",
    readTime: "8 min",
    author: AUTHORS.rafa,
    draft: true,
  },
  {
    slug: "gdpr-analytics-without-consent",
    title:
      "GDPR-Compliant Analytics Without Consent Banners: How It Works",
    description:
      "Consent banners are not always required for analytics. Learn the legal basis, technical requirements, and which analytics tools qualify under GDPR and ePrivacy.",
    date: "2026-03-02",
    dateModified: "2026-05-28",
    dateModifiedEs: "2026-07-28",
    category: "Regulation",
    readTime: "7 min",
    author: AUTHORS.rafa,
    related: ["cnil-self-assessment-published", "uk-pecr-analytics-exemption", "cookieless-analytics-explained"],
  },
  {
    slug: "residency-is-not-sovereignty",
    title: "Residency Is Not Sovereignty: The Question to Ask Your AI Analytics Vendor",
    description:
      "A European datacenter does not make your AI vendor European. The US CLOUD Act follows the company, not the server. How to tell the difference — and why it decides where your data can be reached.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "Privacy",
    readTime: "6 min",
    author: AUTHORS.rafa,
    related: ["meet-seal-ai", "best-llm-for-data-analytics", "cookieless-analytics-explained"],
  },
  {
    slug: "best-llm-for-data-analytics",
    title: "The Best LLM for Data Analytics Isn't the One With the Highest Benchmark",
    description:
      "We ran 162 live queries across three open models against real analytics data to pick the AI inside Sealmetrics. What decided it wasn't MMLU — it was tool-calling, grounding, and a security flaw that only showed up in one language.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "AI",
    readTime: "7 min",
    author: AUTHORS.rafa,
    related: ["meet-seal-ai", "residency-is-not-sovereignty", "we-measured-every-analytics-script"],
  },
  {
    slug: "meet-seal-ai",
    title: "Meet Seal AI: The Analytics Assistant That Never Sends Your Data to the US",
    description:
      "Ask your analytics questions in plain language and get grounded answers — with inference that runs in the EU only, retains nothing, and trains no one's model. How Seal AI works and why it's private by architecture, not by promise.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "Product",
    readTime: "5 min",
    author: AUTHORS.rafa,
    related: ["residency-is-not-sovereignty", "seal-ai-vs-bring-your-own-key", "three-questions-to-ask-seal-ai", "best-llm-for-data-analytics"],
  },
  {
    slug: "audit-your-analytics-ai-privacy",
    title: "How to Audit Whether Your Analytics AI Is Really Private (5-Question Checklist)",
    description:
      "Five questions that separate a private AI vendor from one that just has a European datacenter — with what a good answer and an evasive answer look like for each.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "Privacy",
    readTime: "7 min",
    author: AUTHORS.rafa,
    related: ["residency-is-not-sovereignty", "the-prompt-is-born-clean", "meet-seal-ai"],
  },
  {
    slug: "analytics-if-data-privacy-framework-falls",
    title: "What Happens to Your Analytics if the EU-US Data Privacy Framework Falls",
    description:
      "Safe Harbor fell. Privacy Shield fell. The Data Privacy Framework is under appeal at the CJEU with a fresh challenge announced. Which analytics setups would need re-papering overnight — and which are structurally immune.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "Regulation",
    readTime: "6 min",
    author: AUTHORS.rafa,
    related: ["residency-is-not-sovereignty", "audit-your-analytics-ai-privacy", "eu-ai-act-for-marketers"],
  },
  {
    slug: "the-prompt-is-born-clean",
    title: "The Prompt Is Born Clean: Why Consentless Analytics Makes Private AI Simple",
    description:
      "Most privacy work for AI is damage limitation, because the data was personal to begin with. If your analytics never collects IPs, cookies or visitor identifiers, there is nothing personal to send to the model in the first place.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "Privacy",
    readTime: "5 min",
    author: AUTHORS.rafa,
    related: ["meet-seal-ai", "audit-your-analytics-ai-privacy", "cookieless-analytics-explained"],
  },
  {
    slug: "eu-ai-act-for-marketers",
    title: "The EU AI Act for Marketers, Without the Jargon",
    description:
      "What actually lands on a marketing team using AI analytics: provider vs deployer, the Article 50 transparency duty from 2 August 2026, and why open-weight models are easier to audit than a closed API that can change silently.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "Regulation",
    readTime: "7 min",
    author: AUTHORS.rafa,
    related: ["analytics-if-data-privacy-framework-falls", "residency-is-not-sovereignty", "open-weights-exit-strategy"],
  },
  {
    slug: "we-changed-our-ai-model-twice",
    title: "We Changed Our AI Model Twice in Three Weeks — And That's the Point",
    description:
      "Gemma 4 looped. Mistral Small refused things it shouldn't. gpt-oss-120b held. The full lineage of how we picked the model inside Sealmetrics, including the two picks we got wrong.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "AI",
    readTime: "6 min",
    author: AUTHORS.rafa,
    related: ["how-we-benchmark-our-own-ai", "best-llm-for-data-analytics", "public-llm-benchmarks-vs-your-use-case"],
  },
  {
    slug: "how-we-benchmark-our-own-ai",
    title: "How We Benchmark Our Own AI (And Why We Publish the Runs We Threw Away)",
    description:
      "A methodology you can copy: test on the real stack, compute ground truth from your database, grade deterministically before you let any model judge, and archive the runs you discard. A benchmark that hides those is a demo.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "AI",
    readTime: "8 min",
    author: AUTHORS.rafa,
    related: ["we-changed-our-ai-model-twice", "rival-model-as-judge", "our-ai-got-it-wrong-in-production"],
  },
  {
    slug: "our-ai-got-it-wrong-in-production",
    title: "Our AI Got It Wrong in Production — And Our Own Test Caught It",
    description:
      "A model asked for a comparison returned a chart with two y-axis keys instead of one. Strict validation rejected it and the whole answer died with it. Three rules for anyone shipping LLM structured output.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "AI",
    readTime: "6 min",
    author: AUTHORS.rafa,
    related: ["how-we-benchmark-our-own-ai", "grounding-analytics-ai", "we-changed-our-ai-model-twice"],
  },
  {
    slug: "prompt-injection-is-language-dependent",
    title: "The Security Flaw That Only Appears When You Test Your AI in Two Languages",
    description:
      "The same injected instruction was ignored in every Spanish run and obeyed in English. Safety alignment is trained unevenly across languages — and a monolingual evaluation will certify a vulnerable model as safe.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "AI",
    readTime: "6 min",
    author: AUTHORS.rafa,
    related: ["how-we-benchmark-our-own-ai", "best-llm-for-data-analytics", "meet-seal-ai"],
  },
  {
    slug: "rival-model-as-judge",
    title: "Why We Let a Rival Model Grade Our AI Benchmark",
    description:
      "LLM judges favour their own family. So we gave the scoring pen to our winner's direct competitor, kept it away from anything objective, and published the limitation we couldn't fix.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "AI",
    readTime: "5 min",
    author: AUTHORS.rafa,
    related: ["how-we-benchmark-our-own-ai", "public-llm-benchmarks-vs-your-use-case", "prompt-injection-is-language-dependent"],
  },
  {
    slug: "public-llm-benchmarks-vs-your-use-case",
    title: "Public LLM Benchmarks Won't Tell You Which Model to Ship",
    description:
      "MMLU measures knowledge in a vacuum. Your product needs tool-calling, grounding and latency under real tool loops. How to read agentic benchmarks' footnotes — and a five-step method to evaluate a model yourself.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "AI",
    readTime: "7 min",
    author: AUTHORS.rafa,
    related: ["best-llm-for-data-analytics", "grounding-analytics-ai", "we-changed-our-ai-model-twice"],
  },
  {
    slug: "grounding-analytics-ai",
    title: "Grounding: Why a Good Analytics AI Shouldn't 'Know' Anything",
    description:
      "A general chatbot answers from memory. An analytics assistant must answer only from data fetched at query time. Why the model we ship scores badly on world knowledge — and why that is exactly right.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "AI",
    readTime: "6 min",
    author: AUTHORS.rafa,
    related: ["best-llm-for-data-analytics", "our-ai-got-it-wrong-in-production", "meet-seal-ai"],
  },
  {
    slug: "open-weights-exit-strategy",
    title: "Open Weights as an Exit Strategy: Never Be Hostage to an AI Vendor",
    description:
      "With a closed API you rent behaviour you cannot inspect, that can change under you silently, at prices set unilaterally. With open weights you can pin the version, move hosts, or run it yourself.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "AI",
    readTime: "6 min",
    author: AUTHORS.rafa,
    related: ["residency-is-not-sovereignty", "best-llm-for-data-analytics", "eu-ai-act-for-marketers"],
  },
  {
    slug: "seal-ai-vs-bring-your-own-key",
    title: "Seal AI vs Bring-Your-Own-Key: When to Use Each",
    description:
      "Seal AI is the default so privacy doesn't depend on a checkbox. But you can bring your own OpenAI, Anthropic, Gemini or DeepSeek key. An honest guide to what each option costs you — including the data-transfer analysis you inherit.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "Product",
    readTime: "5 min",
    author: AUTHORS.rafa,
    related: ["meet-seal-ai", "residency-is-not-sovereignty", "three-questions-to-ask-seal-ai"],
  },
  {
    slug: "three-questions-to-ask-seal-ai",
    title: "Three Questions to Ask Your Analytics AI Today",
    description:
      "A period comparison, a drill-down with reasoning, and an engagement check — what to ask, what happens under the hood, and how to verify the answer came from your data.",
    date: "2026-07-24",
    dateModified: "2026-07-28",
    category: "Product",
    readTime: "4 min",
    author: AUTHORS.rafa,
    related: ["meet-seal-ai", "seal-ai-vs-bring-your-own-key", "grounding-analytics-ai"],
  },
];

const bySlug = new Map(blogPosts.map((p) => [p.slug, p]));

/**
 * The two dates a post page needs, for the locale it is rendering in.
 *
 * Spread into both `articleSchema()` and `<PostByline>` so the schema, the
 * sitemap and the date a reader sees can never disagree. A post that has never
 * been revised reports no `dateModified`, and `articleSchema` falls back to its
 * publication date, exactly as before.
 */
export function postDates(
  slug: string,
  locale: "en" | "es" = "en"
): { datePublished: string; dateModified?: string } {
  const post = bySlug.get(slug);
  if (!post) {
    // A page whose slug is not in the registry would otherwise ship with no
    // dates at all, silently. Better to stop the build.
    throw new Error(`postDates: "${slug}" is not in blogPosts (src/lib/content/blog.ts)`);
  }
  const modified = locale === "es" ? post.dateModifiedEs ?? post.dateModified : post.dateModified;
  const published = locale === "es" ? post.dateEs ?? post.date : post.date;
  return { datePublished: published, ...(modified ? { dateModified: modified } : {}) };
}
