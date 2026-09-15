import Link from "next/link";
import { Fragment } from "react";

/* ============================================
   PRICING HERO
   ============================================ */
export function PricingHeroV3() {
  return (
    <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
        {/* No roadmap badges in the pricing hero: the money page sells what is
            live today. AI-agent tracking stays in the comparison table below,
            clearly marked "Coming soon". */}
        <span className="eyebrow mb-5 justify-center" style={{ display: "inline-flex" }}>
          Pricing
        </span>
        <h1
          className="h-display mx-auto mt-5"
          style={{ maxWidth: "22ch" }}
        >
          Pay for <em>humans.</em> Not bots. Not consent banners. Not guesswork.
        </h1>
        <p
          className="text-ink-soft mt-8 mx-auto max-w-[56ch] leading-[1.55]"
          style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
        >
          Every plan includes complete analytics on 100% of your traffic — no sampling, no modelled estimates, no feature walls. You only pay more when you actually grow.
        </p>
        <div data-md="skip" className="flex flex-wrap justify-center gap-3 mt-9">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-white rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
          >
            Book a demo <span>→</span>
          </Link>
          <a
            href="https://my.sealmetrics.com/register"
            className="inline-flex items-center gap-2 px-7 py-4 border border-warm-200 text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 transition-colors"
          >
            Start 14-day trial
          </a>
        </div>
        <p className="mt-4 font-mono text-[12px] text-ink-soft uppercase tracking-[0.06em]">
          14-day trial
        </p>
      </div>
    </section>
  );
}

/* ============================================
   EVERY PLAN INCLUDES + DIFFERENTIATORS
   ============================================ */
export function PlanIncludesV3() {
  const everyPlanIncludes = [
    "Unlimited websites",
    "Unlimited users",
    "Conversion properties",
    "24 months data retention",
    "Consentless tracking · GDPR",
    "Real-time data · < 2 min",
    "Funnel analysis",
    "Multi-site portfolio view",
    "MCP server + BigQuery export",
    "Full API access",
    "Monitoring & custom alerts",
    "Data freshness before 6 AM daily",
  ];

  const differentiators = [
    {
      from: "Agentic",
      to: "Growth",
      diff: "5M events · email support · billing dashboard — same complete data, no LLM required",
    },
    {
      from: "Growth",
      to: "Scale",
      diff: "15M events · Managed Private AI (5M tokens, no key needed) · Webhooks · Guided onboarding · Priority support",
    },
    {
      from: "Scale",
      to: "Enterprise",
      diff: "Unlimited events · Exclusive Private AI · Account manager · Isolated processing · Custom SLA",
    },
  ];

  return (
    <section className="py-28 bg-warm-50 border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">What&apos;s in every plan</span>
            <h2 className="h-section mt-5">
              No feature walls. <em>You never hit a paywall on capability.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Every paid plan from Growth up includes the complete Sealmetrics platform. The only differences between plans are event volume, governance and support — never features.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-3 p-8 bg-white border border-warm-100 rounded-xl mb-6">
          {everyPlanIncludes.map((f) => (
            <div key={f} className="flex items-start gap-2.5 text-[14.5px] text-ink-2 leading-[1.5]">
              <span className="text-brand font-bold shrink-0">—</span>
              {f}
            </div>
          ))}
        </div>

        <div className="bg-white border border-warm-100 rounded-xl p-8 flex flex-col gap-4">
          <h3
            className="font-semibold text-ink tracking-[-0.015em] leading-[1.2]"
            style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
          >
            What <em className="italic-accent">changes between plans</em>
          </h3>
          {differentiators.map((d) => (
            <div
              key={d.from}
              className="flex items-start gap-3 text-[14.5px] leading-[1.6] pt-4 border-t border-warm-100"
            >
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-brand bg-brand-soft px-2 py-1 rounded shrink-0 whitespace-nowrap">
                {d.from} → {d.to}
              </span>
              <p className="text-ink-soft">{d.diff}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   TRAFFIC COUNTING · dark callout
   ============================================ */
export function TrafficCountingV3() {
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">How traffic counts</span>
            <h2 className="h-section mt-5">
              We count humans. <em>Bots are free.</em> AI agents too.
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Other analytics charge you for every event, including bot noise. We only count real human interactions. Traditional bots are filtered. AI agent traffic (ChatGPT, Claude, Perplexity) is tracked separately — and never counts against your limit.
          </p>
        </div>

        <div className="bg-white border border-warm-100 rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1.2fr] border-b border-warm-100 bg-warm-50 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-bold">
            <div className="p-5">Traffic type</div>
            <div className="p-5 text-center">Tracked</div>
            <div className="p-5 text-center">Counts toward limit</div>
            <div className="p-5">Visible where</div>
          </div>
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1.2fr] border-b border-warm-100">
            <div className="p-5 md:p-6 text-ink font-semibold text-[15px]">Humans</div>
            <div className="p-5 md:p-6 text-center">
              <span className="inline-flex w-[22px] h-[22px] rounded-full bg-brand text-ink items-center justify-center text-[12px] font-bold">✓</span>
            </div>
            <div className="p-5 md:p-6 text-center text-[14px] text-ink font-medium">Yes</div>
            <div className="p-5 md:p-6 text-[14px] text-ink-soft">Human Analytics</div>
          </div>
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1.2fr] border-b border-warm-100">
            <div className="p-5 md:p-6 text-ink font-semibold text-[15px] flex items-center gap-2 flex-wrap">
              AI Agents
              <span className="inline-block px-2 py-0.5 text-[9.5px] font-mono font-semibold uppercase tracking-[0.06em] text-ink-soft border border-warm-200 rounded">
                Coming soon
              </span>
            </div>
            <div className="p-5 md:p-6 text-center">
              <span className="inline-flex w-[22px] h-[22px] rounded-full bg-brand text-ink items-center justify-center text-[12px] font-bold">✓</span>
            </div>
            <div className="p-5 md:p-6 text-center text-[14px] text-brand font-semibold">No · free</div>
            <div className="p-5 md:p-6 text-[14px] text-ink-soft">Agent Analytics</div>
          </div>
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
            <div className="p-5 md:p-6 text-ink-soft font-semibold text-[15px]">Traditional bots</div>
            <div className="p-5 md:p-6 text-center">
              <span className="inline-flex w-[22px] h-[22px] rounded-full bg-pink-soft text-coral items-center justify-center text-[12px] font-bold" style={{ background: "#F5E1DE", color: "#B5423B" }}>✕</span>
            </div>
            <div className="p-5 md:p-6 text-center text-[14px] text-ink-soft">Filtered</div>
            <div className="p-5 md:p-6 text-[14px] text-ink-soft">Not shown</div>
          </div>
        </div>

        <div
          className="mt-6 p-6 md:p-7 rounded-xl text-[14.5px] leading-[1.65] text-ink-2 relative overflow-hidden"
          style={{ background: "rgba(45,139,109,0.04)", borderLeft: "3px solid #2D8B6D" }}
        >
          <b className="text-ink font-semibold block mb-2">Important on estimating your plan</b>
          Sealmetrics captures 100% of traffic — including visitors who reject cookies on other tools. Your event count in Sealmetrics will be significantly higher than what GA4 shows. When choosing your plan, estimate your real traffic at <b className="text-ink">2–3× what GA4 reports</b>. We&apos;ll flag this proactively on your first week.
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PLAN ADAPTS · 4 cards
   ============================================ */
export function PlanAdaptsV3() {
  const cards = [
    {
      title: "We never cut your data",
      desc: "No matter your usage, tracking never stops. We will never block, throttle or sample. Complete data is our promise — we don't break it over billing.",
    },
    {
      title: "If you grow, your plan grows with you",
      desc: "If your traffic consistently exceeds your plan for 2+ months, we auto-upgrade at your next billing cycle. Email confirmation, no sales calls. Monthly plans adjust next month. Annual plans adjust at renewal only.",
    },
    {
      title: "If you need less, we'll tell you",
      desc: "If your usage drops below 50% of your plan for 3+ months, we proactively email you with a one-click downgrade option. If you do nothing, nothing changes. We'd rather you pay for what you need.",
    },
    {
      title: "Seasonal spikes are on us",
      desc: "Black Friday. January sales. A viral campaign. One month of overage per year is included free and never triggers a plan change. Your business has peaks — your analytics bill shouldn't punish you for them.",
    },
  ];

  return (
    <section className="py-28 bg-warm-50 border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">How your plan adapts</span>
            <h2 className="h-section mt-5">
              Your plan <em>scales with you</em> — transparently.
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            We never block your tracking. We never surprise you with invoices. No per-event billing, no variable charges, no calculator needed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map((c) => (
            <article
              key={c.title}
              className="bg-white border border-warm-100 rounded-xl p-8"
            >
              <h3
                className="font-semibold text-ink tracking-[-0.015em] leading-[1.25] mb-3"
                style={{ fontSize: "clamp(18px, 1.9vw, 22px)" }}
              >
                {c.title}
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-ink-soft">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FULL COMPARISON TABLE
   ============================================ */
interface ComparisonRow {
  feature: string;
  agentic: string | boolean;
  growth: string | boolean;
  scale: string | boolean;
  enterprise: string | boolean;
}
interface ComparisonSection {
  category: string;
  rows: ComparisonRow[];
}

const comparisonData: ComparisonSection[] = [
  {
    category: "Analytics core",
    rows: [
      { feature: "Consentless tracking (GDPR)", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Real-time data (<2 min)", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Pageview & session tracking", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "UTM & channel attribution", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Device & geo analytics", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Funnel analysis", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Data freshness", agentic: "Typically < 2 min", growth: "Typically < 2 min", scale: "Typically < 2 min", enterprise: "Typically < 2 min" },
      { feature: "Data complete before 6 AM (SLA)", agentic: true, growth: true, scale: true, enterprise: true },
    ],
  },
  {
    category: "Agent analytics (coming soon)",
    rows: [
      { feature: "AI agent detection", agentic: false, growth: false, scale: "Coming soon", enterprise: "Coming soon" },
      { feature: "Agent scoring (300+ signals)", agentic: false, growth: false, scale: "Coming soon", enterprise: "Coming soon" },
      { feature: "HTTP signatures (RFC 9421)", agentic: false, growth: false, scale: "Coming soon", enterprise: "Coming soon" },
      { feature: "Provider detection (OpenAI, Anthropic…)", agentic: false, growth: false, scale: "Coming soon", enterprise: "Coming soon" },
    ],
  },
  {
    category: "eCommerce",
    rows: [
      { feature: "Conversion tracking", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Microconversion tracking", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Conversion properties", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Revenue attribution", agentic: true, growth: true, scale: true, enterprise: true },
    ],
  },
  {
    category: "LENS AI & Private AI",
    rows: [
      { feature: "LENS chat — ask your data in plain language", agentic: false, growth: true, scale: true, enterprise: true },
      { feature: "Weekly & monthly reporting", agentic: false, growth: true, scale: true, enterprise: true },
      { feature: "Anomaly detection rules", agentic: false, growth: "Coming soon", scale: "Coming soon", enterprise: "Coming soon" },
      { feature: "Forecasting & prediction", agentic: false, growth: "Coming soon", scale: "Coming soon", enterprise: "Coming soon" },
      { feature: "Growth opportunities", agentic: false, growth: "Coming soon", scale: "Coming soon", enterprise: "Coming soon" },
      { feature: "Bring your own AI keys (Anthropic / OpenAI / Gemini / DeepSeek)", agentic: false, growth: true, scale: true, enterprise: true },
      { feature: "Managed Private AI on EU infrastructure (gpt-oss-120b · Scaleway), no key needed", agentic: false, growth: "Add-on", scale: "5M tokens", enterprise: "Included" },
      { feature: "Extra Private AI tokens — €358.80 / 5M-token pack", agentic: false, growth: true, scale: true, enterprise: true },
      { feature: "Dedicated, non-shared Private AI instance", agentic: false, growth: false, scale: false, enterprise: true },
    ],
  },
  {
    category: "Monitoring & alerts (coming soon)",
    rows: [
      { feature: "Critical alerts", agentic: false, growth: "Coming soon", scale: "Coming soon", enterprise: "Coming soon" },
      { feature: "Business monitoring", agentic: false, growth: "Coming soon", scale: "Coming soon", enterprise: "Coming soon" },
      { feature: "Risk management", agentic: false, growth: "Coming soon", scale: "Coming soon", enterprise: "Coming soon" },
      { feature: "Custom alerts", agentic: false, growth: "Coming soon", scale: "Coming soon", enterprise: "Coming soon" },
    ],
  },
  {
    category: "Data & API",
    rows: [
      { feature: "Full API access", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "MCP server", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "CSV / JSON export", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "BigQuery export", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Webhooks", agentic: false, growth: false, scale: true, enterprise: true },
      { feature: "API rate limit (req/min)", agentic: "240", growth: "240", scale: "480", enterprise: "Custom" },
    ],
  },
  {
    category: "Governance",
    rows: [
      { feature: "Audit logs", agentic: false, growth: false, scale: true, enterprise: true },
      { feature: "Role-based access", agentic: "Basic", growth: "Basic", scale: "Advanced", enterprise: "Full" },
      { feature: "Isolated processing", agentic: false, growth: false, scale: false, enterprise: true },
    ],
  },
  {
    category: "Support",
    rows: [
      { feature: "Email support", agentic: false, growth: true, scale: true, enterprise: true },
      { feature: "Chat support", agentic: false, growth: false, scale: true, enterprise: true },
      { feature: "Priority support", agentic: false, growth: false, scale: true, enterprise: true },
      { feature: "Dedicated account manager", agentic: false, growth: false, scale: false, enterprise: true },
      { feature: "Onboarding", agentic: "Docs only", growth: "Self-service docs", scale: "1 session", enterprise: "White-glove" },
      { feature: "Uptime SLA", agentic: "—", growth: "99%", scale: "99.5%", enterprise: "99.9%" },
    ],
  },
  {
    category: "Infrastructure",
    rows: [
      { feature: "Human events / month", agentic: "1M · free", growth: "5M", scale: "15M", enterprise: "Unlimited" },
      { feature: "Websites", agentic: "Unlimited", growth: "Unlimited", scale: "Unlimited", enterprise: "Unlimited" },
      { feature: "Users & accounts", agentic: "Unlimited", growth: "Unlimited", scale: "Unlimited", enterprise: "Unlimited" },
      { feature: "Data retention", agentic: "24 months", growth: "24 months", scale: "24 months", enterprise: "24 months" },
    ],
  },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span
        className="inline-flex w-[20px] h-[20px] rounded-full bg-brand text-ink items-center justify-center text-[11px] font-bold"
      >
        ✓
      </span>
    );
  }
  if (value === false) {
    return <span className="text-ink-mute">—</span>;
  }
  return <span className="text-[13.5px] text-ink-2">{value}</span>;
}

export function FullComparisonV3() {
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[56rem] mx-auto text-center mb-14">
          <span
            className="eyebrow mb-5"
            style={{ display: "inline-flex", justifyContent: "center" }}
          >
            Full capabilities
          </span>
          <h2 className="h-section mt-5 mx-auto">
            Every capability, <em>every plan.</em>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-ink-soft">
            The full picture. Scroll through the categories that matter to you.
          </p>
        </div>

        <div className="bg-white border border-warm-100 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1.6fr_0.9fr_0.9fr_0.9fr_0.9fr] border-b border-warm-100 bg-warm-50 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-bold">
            <div className="p-5">Feature</div>
            <div className="p-5 text-center text-ink">
              Agentic
              <span className="block text-[9px] text-brand tracking-[0.06em]">Free</span>
            </div>
            <div className="p-5 text-center">Growth</div>
            <div
              className="p-5 text-center text-ink"
              style={{ background: "rgba(45,139,109,0.05)", borderLeft: "2px solid #2D8B6D", borderRight: "2px solid #2D8B6D" }}
            >
              Scale
            </div>
            <div className="p-5 text-center">Enterprise</div>
          </div>
          {comparisonData.map((section) => (
            <Fragment key={section.category}>
              <div className="px-5 py-3 bg-warm-white border-b border-warm-100 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink font-bold">
                {section.category}
              </div>
              {section.rows.map((row, i) => {
                const isLast =
                  i === section.rows.length - 1 &&
                  section === comparisonData[comparisonData.length - 1];
                return (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-[1.6fr_0.9fr_0.9fr_0.9fr_0.9fr] items-center ${
                      isLast ? "" : "border-b border-warm-100"
                    }`}
                  >
                    <div className="p-4 md:p-5 text-[14px] text-ink-2 leading-[1.4]">
                      {row.feature}
                    </div>
                    <div className="p-4 md:p-5 text-center">
                      <Cell value={row.agentic} />
                    </div>
                    <div className="p-4 md:p-5 text-center">
                      <Cell value={row.growth} />
                    </div>
                    <div
                      className="p-4 md:p-5 text-center"
                      style={{ background: "rgba(45,139,109,0.04)", borderLeft: "2px solid #2D8B6D", borderRight: "2px solid #2D8B6D" }}
                    >
                      <Cell value={row.scale} />
                    </div>
                    <div className="p-4 md:p-5 text-center">
                      <Cell value={row.enterprise} />
                    </div>
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>

        <p className="mt-8 text-center text-[14.5px] text-ink-soft">
          You only pay more if you grow. <b className="text-ink">All core features are always included.</b>
        </p>
      </div>
    </section>
  );
}

/* ============================================
   FINAL CTA · pricing
   ============================================ */
export function PricingFinalCtaV3() {
  return (
    <section id="audit" className="py-20 bg-white border-t border-warm-100">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
        <div className="bg-ink text-white rounded-[20px] px-12 py-16 md:py-20 text-center relative overflow-hidden">
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              right: -100,
              top: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(45,139,109,0.3),transparent 70%)",
            }}
          />
          <h2
            className="text-white font-semibold leading-[1.1] tracking-[-0.03em] mx-auto max-w-[22ch] relative"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            See your own data first. <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              Then pick a plan.
            </em>
          </h2>
          <p className="text-white/70 text-[16px] leading-[1.55] mt-6 mb-8 mx-auto max-w-[52ch] relative">
            A 30-minute walkthrough with the founder. We&apos;ll run your own site through the gap calculator live and recommend the plan that fits. No slides, no sales pitch, no follow-up sequence.
          </p>

          <div data-md="skip" className="flex flex-col sm:flex-row justify-center gap-3 flex-wrap relative">
            <a
              href="https://cal.sealmetrics.com/rafa/30min"
              className="inline-flex items-center justify-center gap-2 bg-white text-ink px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-95"
            >
              Book a walkthrough with Rafa →
            </a>
            <a
              href="https://my.sealmetrics.com/register"
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:bg-white/5"
            >
              Start 14-day trial
            </a>
          </div>
          <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.1em] font-semibold mt-6 relative">
            Built by a founder · EU-hosted by design
          </p>
        </div>
      </div>
    </section>
  );
}
