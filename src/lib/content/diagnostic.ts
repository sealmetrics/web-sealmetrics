// =============================================================
// Diagnostic Quiz — Content, Scoring & Logic
// =============================================================

export type QuizAnswers = {
  business?: string;
  geography?: string;
  traffic?: string;
  adSpend?: string;
  cookieRate?: string;
  painLevel?: string;
  currentTool?: string;
};

export type QuizKey = keyof QuizAnswers;

// ----- Questions -----

export interface QuizOption {
  value: string;
  label: string;
}

export interface QuizQuestion {
  key: QuizKey;
  number: number;
  title: string;
  subtitle: string;
  options: QuizOption[];
  getInsight: (value: string) => string;
}

export const questions: QuizQuestion[] = [
  {
    key: "business",
    number: 1,
    title: "What type of business do you run?",
    subtitle: "This determines how complete data accelerates your growth.",
    options: [
      { value: "ecommerce", label: "eCommerce" },
      { value: "leadgen", label: "Lead generation" },
      { value: "saas", label: "SaaS" },
      { value: "media", label: "Media / Publishers" },
      { value: "agency", label: "Agency" },
    ],
    getInsight: (v) => {
      const map: Record<string, string> = {
        ecommerce:
          "eCommerce businesses have 42% of purchase attribution invisible in the EU — the channels driving those purchases cannot be scaled.",
        leadgen:
          "Lead generation sites typically miss 35-50% of form-fill attribution when consent is rejected.",
        saas:
          "SaaS trial-to-paid funnels are especially vulnerable — invisible sessions break cohort analysis.",
        media:
          "Publishers relying on CPM models undervalue their inventory when 40-60% of traffic is invisible.",
        agency:
          "Agencies with complete data win more trust and budget — the gap between real and reported performance is an opportunity to demonstrate true impact.",
      };
      return map[v] ?? "";
    },
  },
  {
    key: "geography",
    number: 2,
    title: "Where is most of your traffic?",
    subtitle: "Cookie rejection rates vary dramatically by country.",
    options: [
      { value: "fr_de", label: "France / Germany" },
      { value: "es_it", label: "Spain / Italy" },
      { value: "nl_be_at", label: "Netherlands / Belgium / Austria" },
      { value: "uk", label: "United Kingdom" },
      { value: "eu_other", label: "Other EU countries" },
      { value: "non_eu", label: "Outside the EU" },
    ],
    getInsight: (v) => {
      const map: Record<string, string> = {
        fr_de:
          "France and Germany have some of the highest cookie rejection rates in Europe — 60-80% of visitors decline tracking.",
        es_it:
          "Spain and Italy see 40-55% rejection rates, growing 8-12 points per year as consent fatigue increases.",
        nl_be_at:
          "The Netherlands, Belgium and Austria consistently reject cookies at 55-70%, driven by strict DPA enforcement.",
        uk: "UK rejection rates hover at 35-50%, lower than continental Europe but still enough to distort your attribution.",
        eu_other:
          "Most EU markets now see 40-65% cookie rejection. The trend is accelerating across all member states.",
        non_eu:
          "Even outside the EU, ad blockers and browser privacy features create a 15-25% data gap that grows each year.",
      };
      return map[v] ?? "";
    },
  },
  {
    key: "traffic",
    number: 3,
    title: "How many monthly sessions does your site receive?",
    subtitle: "Higher traffic means more growth potential in your blind spot.",
    options: [
      { value: "under10k", label: "Under 10K" },
      { value: "10k_50k", label: "10K - 50K" },
      { value: "50k_200k", label: "50K - 200K" },
      { value: "200k_1m", label: "200K - 1M" },
      { value: "over1m", label: "Over 1M" },
    ],
    getInsight: (v) => {
      const map: Record<string, string> = {
        under10k:
          "At this volume, every invisible session matters — a 50% gap means making decisions on just a few thousand data points.",
        "10k_50k":
          "You could be missing 5,000-30,000 sessions per month — enough to completely distort your channel attribution.",
        "50k_200k":
          "At your scale, a typical EU data gap means 25,000-120,000 invisible sessions. That is a scaling opportunity waiting to be measured.",
        "200k_1m":
          "With your traffic volume, 100,000-600,000 sessions per month sit outside your analytics — each one a potential growth signal.",
        over1m:
          "At this scale, even a 40% gap means 400,000+ invisible sessions monthly — an entire market segment you cannot see.",
      };
      return map[v] ?? "";
    },
  },
  {
    key: "adSpend",
    number: 4,
    title: "What is your monthly ad spend?",
    subtitle: "Invisible sessions mean your best channels may appear underperforming.",
    options: [
      { value: "none", label: "No paid ads" },
      { value: "under2k", label: "Under 2K EUR" },
      { value: "2k_5k", label: "2K - 5K EUR" },
      { value: "5k_20k", label: "5K - 20K EUR" },
      { value: "20k_50k", label: "20K - 50K EUR" },
      { value: "over50k", label: "Over 50K EUR" },
    ],
    getInsight: (v) => {
      const map: Record<string, string> = {
        none: "Even without paid ads, organic channel attribution suffers when half your sessions are invisible.",
        under2k:
          "At this spend level, a 40% data gap could mean misattributing EUR 400-800/month to the wrong channels.",
        "2k_5k":
          "You are likely misallocating EUR 1,000-2,500/month based on incomplete conversion data.",
        "5k_20k":
          "A typical EU data gap at your spend level means EUR 2,500-10,000/month in misallocated budget.",
        "20k_50k":
          "At this budget, incomplete data could be costing you EUR 10,000-25,000/month in suboptimal allocation.",
        over50k:
          "Enterprise ad spend with a 40-60% data gap means EUR 25,000+ per month allocated based on partial information.",
      };
      return map[v] ?? "";
    },
  },
  {
    key: "cookieRate",
    number: 5,
    title: "What is your cookie consent rate?",
    subtitle: "The percentage of visitors who accept tracking cookies.",
    options: [
      { value: "unknown", label: "I do not know" },
      { value: "under40", label: "Under 40%" },
      { value: "40_60", label: "40% - 60%" },
      { value: "60_80", label: "60% - 80%" },
      { value: "over80", label: "Over 80%" },
    ],
    getInsight: (v) => {
      const map: Record<string, string> = {
        unknown:
          "Most teams do not track this number — but it determines how much of your data you can actually trust.",
        under40:
          "With under 40% acceptance, more than 60% of your traffic is invisible. Your analytics show a minority of actual behavior.",
        "40_60":
          "A 40-60% consent rate means roughly half your data is missing. Every metric in your dashboard is an extrapolation.",
        "60_80":
          "Even at 60-80% acceptance, the 20-40% you miss is not random — cookie rejectors behave differently than acceptors.",
        over80:
          "80%+ is unusually high. Worth verifying your consent banner is not using dark patterns — regulators are cracking down.",
      };
      return map[v] ?? "";
    },
  },
  {
    key: "painLevel",
    number: 6,
    title: "Do your marketing reports match your actual revenue?",
    subtitle: "The gap between reported and real numbers is where growth opportunity lives.",
    options: [
      { value: "always", label: "Numbers never match" },
      { value: "sometimes", label: "Sometimes close" },
      { value: "not_sure", label: "We do not compare" },
      { value: "no", label: "They match well" },
    ],
    getInsight: (v) => {
      const map: Record<string, string> = {
        always:
          "A persistent mismatch between analytics and revenue is the clearest signal of a data completeness problem.",
        sometimes:
          "Intermittent mismatches often correlate with traffic spikes — more visitors means more cookie rejections.",
        not_sure:
          "Not comparing analytics to actual revenue is common but risky. The gap is usually larger than teams expect.",
        no: "If your numbers match, your data gap may be smaller — or your consent banner may be pre-checked (a compliance risk).",
      };
      return map[v] ?? "";
    },
  },
  {
    key: "currentTool",
    number: 7,
    title: "What analytics tool do you use today?",
    subtitle: "Each tool handles cookie rejection differently.",
    options: [
      { value: "ga4", label: "Google Analytics 4" },
      { value: "adobe", label: "Adobe Analytics" },
      { value: "piwik", label: "Piwik PRO" },
      { value: "matomo", label: "Matomo" },
      { value: "plausible", label: "Other / Lightweight" },
      { value: "none", label: "None" },
    ],
    getInsight: (v) => {
      const map: Record<string, string> = {
        ga4: "GA4 relies entirely on cookies for session tracking. When consent is rejected, those sessions disappear completely from your reports.",
        adobe:
          "Adobe Analytics uses first-party cookies and server-side options, but still requires consent in the EU — leaving a significant blind spot.",
        piwik:
          "Piwik PRO offers a cookieless mode, but it sacrifices session stitching and attribution depth. You gain compliance but lose insight.",
        matomo:
          "Matomo can run without cookies but loses cross-session attribution. The data exists but cannot be connected to journeys.",
        plausible:
          "Lightweight tools prioritize privacy and simplicity over attribution depth — they were not built for revenue-level decisions.",
        none: "Without analytics, you are making every marketing decision on instinct. That is the most expensive data gap of all.",
      };
      return map[v] ?? "";
    },
  },
];

// ----- Scoring -----

interface DimensionScores {
  data: number;
  investment: number;
  impact: number;
  urgency: number;
}

const geoLossRate: Record<string, number> = {
  fr_de: 0.7,
  nl_be_at: 0.62,
  es_it: 0.48,
  uk: 0.42,
  eu_other: 0.52,
  non_eu: 0.2,
};

const cookieOverride: Record<string, number | null> = {
  unknown: null,
  under40: 0.65,
  "40_60": 0.5,
  "60_80": 0.3,
  over80: 0.15,
};

const trafficMid: Record<string, number> = {
  under10k: 5000,
  "10k_50k": 30000,
  "50k_200k": 125000,
  "200k_1m": 600000,
  over1m: 2000000,
};

const adSpendMid: Record<string, number> = {
  none: 0,
  under2k: 1000,
  "2k_5k": 3500,
  "5k_20k": 12500,
  "20k_50k": 35000,
  over50k: 75000,
};

export function getLossRate(answers: QuizAnswers): number {
  const cookieVal = answers.cookieRate
    ? cookieOverride[answers.cookieRate]
    : null;
  if (cookieVal !== null && cookieVal !== undefined) return cookieVal;
  return geoLossRate[answers.geography ?? "eu_other"] ?? 0.5;
}

export function getTrafficVolume(answers: QuizAnswers): number {
  return trafficMid[answers.traffic ?? "50k_200k"] ?? 125000;
}

export function getAdSpendValue(answers: QuizAnswers): number {
  return adSpendMid[answers.adSpend ?? "none"] ?? 0;
}

export function calculateDimensions(answers: QuizAnswers): DimensionScores {
  const lossRate = getLossRate(answers);

  // Data dimension (0-100): how much data is missing
  const data = Math.round(lossRate * 100);

  // Investment dimension: how much money is at risk
  const spend = getAdSpendValue(answers);
  const investment =
    spend === 0
      ? 20
      : spend < 3000
        ? 40
        : spend < 15000
          ? 65
          : spend < 40000
            ? 80
            : 95;

  // Impact dimension: business sensitivity to data gaps
  const businessImpact: Record<string, number> = {
    ecommerce: 90,
    leadgen: 75,
    saas: 80,
    media: 60,
    agency: 85,
  };
  const impact = businessImpact[answers.business ?? "ecommerce"] ?? 70;

  // Urgency dimension: how broken things feel
  const painMap: Record<string, number> = {
    always: 95,
    sometimes: 65,
    not_sure: 50,
    no: 20,
  };
  const urgency = painMap[answers.painLevel ?? "not_sure"] ?? 50;

  return { data, investment, impact, urgency };
}

export function calculateTotalScore(dimensions: DimensionScores): number {
  const { data, investment, impact, urgency } = dimensions;
  return Math.round(data * 0.35 + investment * 0.25 + impact * 0.2 + urgency * 0.2);
}

export type ScoreLevel = "critical" | "high" | "moderate" | "low";

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 75) return "critical";
  if (score >= 55) return "high";
  if (score >= 35) return "moderate";
  return "low";
}

export function getScoreLevelLabel(level: ScoreLevel): string {
  const labels: Record<ScoreLevel, string> = {
    critical: "High growth opportunity",
    high: "Significant growth opportunity",
    moderate: "Growth opportunity identified",
    low: "Baseline established",
  };
  return labels[level];
}

export function getVerdict(answers: QuizAnswers, score: number): string {
  const level = getScoreLevel(score);
  const tool = answers.currentTool ?? "ga4";
  const toolName = getToolName(tool);

  const verdicts: Record<ScoreLevel, string> = {
    critical: `Your growth opportunity is substantial. With ${toolName}, you are optimizing based on less than half of your actual traffic. Every metric in your dashboard — conversions, ROAS, channel performance — reflects a fraction of reality. Complete data would reveal which channels to scale and which to pause.`,
    high: `Your growth opportunity is significant. ${toolName} is showing you an incomplete picture, and the channels driving your best customers may be underrepresented. Complete data lets you identify and scale what actually works.`,
    moderate: `You have a meaningful growth opportunity in the data your current analytics cannot capture. While ${toolName} tracks some of your traffic, the sessions you miss are not random — they represent channels and audiences you could be scaling.`,
    low: `Your data coverage is relatively strong, but even a small blind spot can hide your next growth lever. As privacy regulations tighten and browser restrictions increase, complete data becomes a competitive advantage.`,
  };
  return verdicts[level];
}

// ----- Tool names -----

export function getToolName(tool: string): string {
  const names: Record<string, string> = {
    ga4: "Google Analytics 4",
    adobe: "Adobe Analytics",
    piwik: "Piwik PRO",
    matomo: "Matomo",
    plausible: "your current tool",
    none: "no analytics tool",
  };
  return names[tool] ?? "your current tool";
}

// ----- Comparison data -----

export interface ComparisonRow {
  metric: string;
  current: string;
  sealmetrics: string;
  highlight?: boolean;
}

export function buildComparison(answers: QuizAnswers): ComparisonRow[] {
  const traffic = getTrafficVolume(answers);
  const lossRate = getLossRate(answers);
  const visibleSessions = Math.round(traffic * (1 - lossRate));
  const lostSessions = traffic - visibleSessions;
  const tool = getToolName(answers.currentTool ?? "ga4");

  return [
    {
      metric: "Visible sessions / month",
      current: formatNumber(visibleSessions),
      sealmetrics: formatNumber(traffic),
      highlight: true,
    },
    {
      metric: "Unmeasured / now visible sessions",
      current: formatNumber(lostSessions) + " unmeasured",
      sealmetrics: formatNumber(lostSessions) + " now visible",
      highlight: true,
    },
    {
      metric: "Conversion data",
      current: `Based on ${Math.round((1 - lossRate) * 100)}% of traffic`,
      sealmetrics: "Not reduced by consent",
    },
    {
      metric: "ROAS reliability",
      current: `Distorted by ${Math.round(lossRate * 100)}% data gap`,
      sealmetrics: "Calculated on complete data",
    },
    {
      metric: "Revenue attribution",
      current: tool === "no analytics tool" ? "None" : "Partial — cookie-dependent",
      sealmetrics: "Channel-level attribution on all sessions",
    },
    {
      metric: "Consent dependency",
      current: "Requires cookie consent",
      sealmetrics: "Cookieless — no consent needed",
    },
  ];
}

// ----- Ad spend impact -----

export function getAdSpendImpact(answers: QuizAnswers): {
  show: boolean;
  misallocated: number;
  percentage: number;
} {
  const spend = getAdSpendValue(answers);
  const lossRate = getLossRate(answers);
  if (spend < 2000) return { show: false, misallocated: 0, percentage: 0 };
  const misallocated = Math.round(spend * lossRate * 0.6);
  return { show: true, misallocated, percentage: Math.round(lossRate * 60) };
}

// ----- Industry context -----

export function getIndustryContext(business: string): string {
  const contexts: Record<string, string> = {
    ecommerce:
      "For eCommerce, every invisible session is a potential purchase you cannot attribute. When 40-60% of sessions are missing, your best-performing channels may appear underperforming — leading you to cut budget from what actually drives revenue. The gap between GA4-reported and actual conversion rates typically ranges from 30-55% for EU eCommerce sites.",
    leadgen:
      "In lead generation, the gap between reported and actual form completions directly affects cost-per-lead calculations. When half your traffic is invisible, you overvalue channels that happen to capture consenting users and undervalue channels that drive privacy-conscious prospects — often your most sophisticated buyers.",
    saas:
      "SaaS acquisition funnels depend on cohort analysis and trial-to-paid attribution. When cookie rejection breaks session continuity, free trial signups appear as direct traffic and your true CAC by channel becomes unreliable. This distortion compounds as you scale ad spend.",
    media:
      "Publishers monetizing through advertising sell based on audience size and engagement. When 40-60% of your audience is invisible to analytics, you systematically undervalue your inventory. Programmatic buyers using your GA4 data see a smaller, less engaged audience than actually exists.",
    agency:
      "For agencies, data credibility is client retention. When your reports show different numbers than your clients see in their own systems, trust erodes. Complete data lets you demonstrate true campaign impact — not an estimate based on the fraction of visitors who accepted cookies.",
  };
  return contexts[business] ?? contexts.eCommerce;
}

// ----- CTA personalization -----

export function getCtaCopy(level: ScoreLevel): {
  headline: string;
  cta: string;
  supporting: string;
} {
  if (level === "critical" || level === "high") {
    return {
      headline: "See your real data in a personalized demo",
      cta: "Book my personalized demo",
      supporting: "15 minutes -- With your website data -- No commitment",
    };
  }
  return {
    headline: "Your next step: a free data audit",
    cta: "Request my free audit",
    supporting: "15 minutes -- With your website data -- No commitment",
  };
}

// ----- Section visibility -----

export function shouldShowAdSpend(answers: QuizAnswers): boolean {
  const val = answers.adSpend;
  return val !== undefined && val !== "none" && val !== "under2k";
}

// ----- Helpers -----

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString("en-US");
}

export function formatCurrency(n: number): string {
  if (n >= 1_000_000)
    return "EUR " + (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000)
    return "EUR " + (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return "EUR " + n.toLocaleString("en-US");
}

export function isQuizComplete(answers: QuizAnswers): boolean {
  return questions.every((q) => answers[q.key] !== undefined);
}
