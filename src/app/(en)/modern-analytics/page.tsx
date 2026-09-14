import type { Metadata } from "next";
import { Picture } from "@/components/ui/Picture";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import { breadcrumbSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { LogosStrip } from "@/components/sections/v3/HomeV3";
import { FaqAccordionV3 } from "@/components/sections/v3/FaqAccordionV3";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Modern Web Analytics — Clean, Unmodeled, AI-Agent Ready",
  description:
    "Modern web analytics vs legacy cookie tools: no consent-driven data loss, no sampling, designed for GDPR (self-assessed), AI-agent ready via MCP.",
  openGraph: {
    title: "Modern Web Analytics — Clean, Unmodeled, AI-Agent Ready",
    description:
      "The end of cookie-based analytics. Clean data, no sampling, AI-ready via MCP. See the gap.",
    type: "website",
    images: [ogImage("/modern-analytics/")],
    url: "https://sealmetrics.com/modern-analytics/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Modern Web Analytics — Clean, Unmodeled, AI-Agent Ready",
    description: "The vanguard of web analytics. No cookies. No sampling. No modeling.",
    images: [ogImage("/modern-analytics/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/modern-analytics/",
    languages: getAlternates("/modern-analytics"),
  },
  keywords: [
    "modern web analytics",
    "cookieless analytics",
    "first-party analytics",
    "ai agent analytics",
    "mcp analytics",
    "unmodeled analytics",
    "no sampling analytics",
    "gdpr analytics",
    "alternative to google analytics",
  ],
};

const faqs = [
  {
    q: "What does \"modern analytics\" mean exactly?",
    a: "Modern analytics is the next generation of web measurement: cookieless by architecture, capturing events server-side without consent banners or consent-driven loss, never sampling, never modeling missing data, and exposing clean event-level data to humans and AI agents through standards like MCP. Sealmetrics is the production-grade implementation of that approach.",
  },
  {
    q: "How is this different from cookieless tools like Plausible or Fathom?",
    a: "Lightweight cookieless tools focus on privacy and simplicity but stop at page-level metrics. Modern analytics adds full last-click attribution, conversion items with denormalized properties, micro-conversions, agent detection, content groups, and an MCP server so AI agents can query the warehouse directly. It's the difference between a privacy-friendly counter and a decision-grade analytics warehouse.",
  },
  {
    q: "Why does \"no modeling\" matter?",
    a: "GA4 fills consent-rejected gaps with statistical models. The output looks complete but is a synthetic estimate, not measurement. When you optimize ad spend on modeled data, the algorithm chases ghosts. Modern analytics measures every real event, so every decision is grounded in observed behavior.",
  },
  {
    q: "What is AI-agent ready?",
    a: "It means an LLM or autonomous agent (Claude, ChatGPT Operator, internal copilots) can connect to the analytics platform through the Model Context Protocol (MCP) and query revenue, conversions, properties, and forecasts in natural language — without you building dashboards. Sealmetrics ships an MCP server with 40+ tools out of the box.",
  },
  {
    q: "Is this really compliant with GDPR and ePrivacy?",
    a: "Yes. There is no personal data, no cookie, no localStorage, no fingerprinting. Events are aggregated into channel-level totals server-side. The Spanish DPA (AEPD) framework and GDPR Article 6(1)(f) legitimate interest both cover this approach. No consent banner is required for measurement.",
  },
  {
    q: "How do I switch from legacy analytics?",
    a: "You don't switch — you add. Drop the Sealmetrics pixel alongside your existing GA4 or Adobe setup, run both for 30 days, compare with your CRM. Most teams keep the legacy tool as a Google Ads conduit and start making decisions on Sealmetrics.",
  },
  {
    q: "Does it scale for enterprise traffic?",
    a: "Yes. The pixel handles billions of events monthly on a horizontally scalable Go service backed by ClickHouse. Customers include Palladium Hotel Group and other multi-property enterprise brands. EU-hosted in Dublin by default.",
  },
];

const pillars = [
  {
    eyebrow: "No consent loss",
    title: "Clean data",
    body: "Every visitor, every event. No consent banner gating measurement, no ad-blocker erasure, no JavaScript blockers wiping traffic. First-party server-side counting captures the truth.",
    metric: "+40-60%",
    metricLabel: "more EU traffic vs cookie-based",
  },
  {
    eyebrow: "Source agnostic",
    title: "Channel agnostic",
    body: "Last-click attribution computed on raw events, not on platform-reported conversions. Google Ads, Meta, organic, direct, dark social — all measured the same way, on equal terms.",
    metric: "1 source",
    metricLabel: "of truth, not seven",
  },
  {
    eyebrow: "No modeling",
    title: "Unmodeled",
    body: "We never invent data. No statistical fill-in, no \"modeled conversions\", no behavioral imputation. If we report it, it happened. Auditable down to the event ID.",
    metric: "0 ghosts",
    metricLabel: "in your dashboard",
  },
  {
    eyebrow: "No sampling",
    title: "Full resolution",
    body: "Every event lands in ClickHouse. No card-2 sampling, no \"high cardinality\" thresholds. Query the long tail of SKUs, terms, countries, micro-conversions without truncation.",
    metric: "0%",
    metricLabel: "of queries sampled",
  },
  {
    eyebrow: "AI native",
    title: "AI-agent ready",
    body: "Native Model Context Protocol (MCP) server with 40+ tools. Claude, internal copilots, and AI agents can pull revenue, conversions, forecasts, and properties in natural language.",
    metric: "40+ tools",
    metricLabel: "via MCP out of the box",
  },
  {
    eyebrow: "Compliant",
    title: "GDPR by design",
    body: "No cookies. No localStorage. No fingerprint. No personal data. EU-hosted in Dublin. No consent banner required for measurement under GDPR + ePrivacy.",
    metric: "0 cookies",
    metricLabel: "0 banners required",
  },
];

const comparisonRows: Array<{ feature: string; legacy: string; modern: string }> = [
  { feature: "Cookies / fingerprinting", legacy: "Required", modern: "None" },
  { feature: "Consent banner needed", legacy: "Yes", modern: "No" },
  { feature: "EU traffic captured", legacy: "40-60%", modern: "No consent loss" },
  { feature: "Sampling on heavy queries", legacy: "Yes (Card-2 / data thresholds)", modern: "No" },
  { feature: "Modeled / synthetic data", legacy: "Yes, undisclosed share", modern: "Never" },
  { feature: "Attribution model", legacy: "Data-driven (black box)", modern: "Last-click on raw events" },
  { feature: "Conversion items detail", legacy: "Aggregated", modern: "1 row per item, denormalized" },
  { feature: "Custom properties", legacy: "Limited keys, sampled", modern: "Map(String, String), unsampled" },
  { feature: "MCP / AI-agent access", legacy: "No", modern: "Yes — 40+ tools" },
  { feature: "Data residency", legacy: "Mostly US", modern: "EU (Dublin)" },
  { feature: "Pricing model", legacy: "Free (you are the product)", modern: "Transparent, capped" },
];

const useCases = [
  {
    role: "CMO",
    headline: "Decisions on truth, not estimates",
    body: "Stop reallocating budget on modeled conversions. See real ROAS per channel and where the spend leaks before the quarter closes.",
  },
  {
    role: "eCommerce Manager",
    headline: "Every SKU, every variant, queryable",
    body: "Drill into size, color, price bucket, cart-to-purchase ratio per category — without sampling thresholds hiding the long tail.",
  },
  {
    role: "Sales & Direct Director",
    headline: "Direct-booking pickup curve and OTA shift",
    body: "Track the share of direct vs OTA-coming guests, country mix of high-revenue bookings, and the days-to-check-in distribution.",
  },
  {
    role: "AI builder",
    headline: "Ship a Claude analyst in one afternoon",
    body: "Connect the Sealmetrics MCP server to Claude or your internal copilot and let it answer revenue questions in natural language.",
  },
];

export default function ModernAnalyticsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Modern Web Analytics" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Modern Web Analytics", url: "/modern-analytics" },
        ])}
      />

      {/* HERO */}
      <section className="bg-warm-white border-b border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-[920px]">
            <span className="eyebrow mb-6 block">Modern web analytics</span>
            <h1
              className="font-semibold leading-[1.05] tracking-[-0.035em] text-ink"
              style={{ fontSize: "clamp(44px, 6.4vw, 88px)" }}
            >
              The end of cookie-based analytics.{" "}
              <em
                className="italic font-medium"
                style={{ color: "#2D8B6D", fontStyle: "italic" }}
              >
                Clean data is the new standard.
              </em>
            </h1>
            <p className="mt-8 text-[19px] leading-[1.6] text-ink-soft max-w-[68ch]">
              Legacy analytics rely on cookies, consent, sampling, and modeling. Modern analytics
              measure every real event server-side, attribute revenue last-click on raw data, and
              expose it to humans and AI agents through MCP. No estimates, no banners, no blind spots.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 flex-wrap">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center bg-ink text-white px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-110"
              >
                Try free →
              </Link>
              <Link
                href="/audit"
                className="inline-flex items-center justify-center border border-warm-200 text-ink px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50"
              >
                Get a free measurement audit
              </Link>
            </div>
            <p className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.12em] mt-8">
              30-day parallel run · EU hosted
            </p>
          </div>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            Modern web analytics measures <strong>traffic without consent gaps</strong> or cookies, never
            samples, never models, and exposes clean event-level data to AI agents via the{" "}
            <strong>Model Context Protocol</strong>. Sealmetrics is that platform — production-grade,
            EU-hosted, and ready for the post-cookie, AI-first era.
          </>
        }
        bullets={[
          <>Legacy cookie-based analytics: 40-60% EU traffic loss, modeled gaps, US-hosted.</>,
          <>Modern analytics: no consent-driven data loss, last-click on raw data, EU-hosted, AI-agent ready.</>,
          <>No migration. Run both for 30 days. Decide on your own numbers.</>,
        ]}
      />

      <LogosStrip />

      {/* SIX PILLARS */}
      <section className="py-24 border-t border-warm-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px] mb-16">
            <span className="eyebrow mb-5 block">What modern means</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(36px, 4.4vw, 60px)" }}
            >
              Six properties that separate{" "}
              <em
                className="italic font-medium"
                style={{ color: "#2D8B6D", fontStyle: "italic" }}
              >
                modern from legacy.
              </em>
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft">
              Every modern analytics platform should clear all six bars. Most legacy tools clear none.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-warm-100 bg-warm-50 p-7 hover:border-warm-200 transition-colors"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-brand">
                  {p.eyebrow}
                </span>
                <h3 className="mt-3 text-[22px] font-semibold text-ink leading-[1.2]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">{p.body}</p>
                <div className="mt-6 pt-5 border-t border-warm-100">
                  <span className="block text-[28px] font-semibold text-ink leading-none">
                    {p.metric}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft mt-2 block">
                    {p.metricLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 border-t border-warm-100 bg-warm-50">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px] mb-14">
            <span className="eyebrow mb-5 block">Side by side</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
            >
              Legacy cookie-based vs modern analytics.
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-warm-100 bg-white">
            <table className="w-full text-left">
              <thead className="bg-warm-50 border-b border-warm-100">
                <tr>
                  <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                    Property
                  </th>
                  <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                    Legacy cookie-based
                  </th>
                  <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-brand">
                    Modern (Sealmetrics)
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`${i !== comparisonRows.length - 1 ? "border-b border-warm-100" : ""}`}
                  >
                    <td className="px-6 py-4 text-[15px] text-ink font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-[15px] text-ink-soft">{row.legacy}</td>
                    <td className="px-6 py-4 text-[15px] text-ink font-semibold">{row.modern}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AI AGENTS / MCP */}
      <section className="py-24 border-t border-warm-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="eyebrow mb-5 block">AI-agent ready</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}
            >
              Your data, queryable in natural language.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft">
              Sealmetrics ships a native MCP (Model Context Protocol) server with 40+ tools. Connect
              Claude, ChatGPT, or your internal copilot and let it pull revenue, conversions,
              landing-page performance, forecasts, and product properties on demand.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Plug into Claude Desktop, Claude Code, or any MCP-compatible client",
                "40+ tools: overview, channels, conversions, segments, funnels, properties",
                "Combine with Google Ads / Meta Ads / Search Console MCPs for full-funnel ROAS",
                "Read-only, scoped, and rate-limited per agent",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-[15px] leading-[1.55] text-ink-soft"
                >
                  <span className="text-brand font-bold mt-0.5" aria-hidden>
                    →
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center bg-ink text-white px-7 py-3.5 rounded-md text-[14px] font-semibold no-underline hover:brightness-110"
              >
                Try free →
              </Link>
              <Link
                href="https://docs.sealmetrics.com/web-analytics-prompts"
                className="inline-flex items-center justify-center border border-warm-200 text-ink px-7 py-3.5 rounded-md text-[14px] font-semibold no-underline hover:bg-warm-50"
              >
                Browse 130+ prompts →
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-warm-100 bg-dark-bg p-8 text-white shadow-[0_24px_60px_-24px_rgba(14,14,12,0.5)]">
            <div className="font-mono text-[11px] text-white/50 uppercase tracking-[0.12em] mb-4">
              Claude · MCP · Sealmetrics
            </div>
            <p className="font-mono text-[13px] leading-[1.7] text-white/90">
              <span className="text-brand-soft">{">"}</span> Show me the top 10 landings with bounce
              rate above 70% and more than 500 visits last week.
            </p>
            <div className="my-6 h-px bg-white/10" />
            <p className="text-[13px] leading-[1.7] text-white/80">
              Pulling Sealmetrics for site <code className="text-amber">acme.com</code>… 14 landings
              match. Top 3 by lost entrances: <code className="text-amber">/black-friday-2026</code>,
              <code className="text-amber"> /promo-cyber</code>,{" "}
              <code className="text-amber">/sale-electronics</code>. Likely cause: paid traffic
              mismatch — 78% mobile, slow LCP. Want me to draft fixes?
            </p>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 border-t border-warm-100 bg-warm-50">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px] mb-14">
            <span className="eyebrow mb-5 block">Built for the modern team</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
            >
              One platform, many roles.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((u) => (
              <div
                key={u.role}
                className="rounded-2xl border border-warm-100 bg-white p-8"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-brand">
                  {u.role}
                </span>
                <h3 className="mt-3 text-[22px] font-semibold text-ink leading-[1.25]">
                  {u.headline}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordionV3
        locale="en"
        items={faqs}
        titleEn={
          <>
            The <em>questions</em> CMOs ask first.
          </>
        }
        ledeEn="Honest answers about modern analytics, AI agents, and what changes when you stop measuring with cookies."
      />

      <FinalCtaSharedV3
        locale="en"
        titleEn={
          <>
            Stop deciding on estimates.{" "}
            <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              Start deciding on truth.
            </em>
          </>
        }
        titleEs={
          <>
            Deja de decidir con estimaciones.{" "}
            <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              Empieza a decidir con la verdad.
            </em>
          </>
        }
        ledeEn="Install Sealmetrics alongside your current analytics. Run both for 30 days. Compare with your own CRM. If the gap isn't real, you owe us nothing."
        ledeEs="Instala Sealmetrics junto a tu analítica actual. Corre los dos 30 días. Compara con tu propio CRM. Si el gap no es real, no nos debes nada."
        primaryTextEn="Try free →"
        primaryTextEs="Pruébalo gratis →"
      />
    </>
  );
}
