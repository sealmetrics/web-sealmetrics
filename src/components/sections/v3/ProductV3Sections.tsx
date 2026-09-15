import Link from "next/link";

/* ============================================
   PRODUCT HERO
   ============================================ */
export function ProductHeroV3() {
  return (
    <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
        <span
          className="eyebrow mb-5"
          style={{ display: "inline-flex", justifyContent: "center" }}
        >
          Platform overview
        </span>
        <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
          Complete analytics, <em>without the compromises.</em>
        </h1>
        <p
          className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]"
          style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
        >
          A full analytics stack built for eCommerce teams: consentless tracking, revenue attribution, LENS AI, SuperAPI and MCP server — all on the same full-resolution data. No sampling. No modelling.
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
          14-day trial · nothing charged if you cancel · EU-hosted
        </p>
      </div>
    </section>
  );
}

/* ============================================
   PROBLEM NARRATIVE · 3 cards · pain before solution
   Ported from v2 "Four tools, four numbers, one meeting"
   ============================================ */
export function ProblemNarrativeV3() {
  const cards = [
    {
      title: "The Meta paradox",
      scenario:
        "Your Meta campaign shows 340 conversions in the pixel. Your CRM shows 180. Your agency defends the first number. Your CFO wants the second. Nobody in the room can explain the gap.",
      reframe:
        "The numbers diverge because the pixel is blocked or de-duplicated by roughly half of European traffic. The pixel isn't wrong — it's seeing a different slice of reality than your CRM.",
    },
    {
      title: "The \u201Cdirect / none\u201D bucket",
      scenario:
        "Open GA4. Filter by channel. 40 to 60% of conversions are attributed to \u201Cdirect\u201D or \u201C(none)\u201D. You know those aren't direct visits. You just don't know which channels they belonged to.",
      reframe:
        "That bucket is the silhouette of visitors who rejected consent or ran with ad-blockers. The campaigns that actually brought them in are invisible in your attribution — and in your budget decisions.",
    },
    {
      title: "The quarterly reconciliation meeting",
      scenario:
        "A recurring Tuesday. Ninety minutes. Agency walks in with their number. Internal analytics with a different one. Finance with a third. The meeting ends with \u201Cwe'll align offline\u201D — again.",
      reframe:
        "The cost isn't the meeting. It's that real budget decisions — where to cut, where to double down — keep getting postponed because nobody trusts the baseline.",
    },
  ];
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">The problem</span>
            <h2 className="h-section mt-5">
              Four tools. Four numbers. <em>One meeting.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Every week, someone in your organization is reconciling GA4, Meta Ads, Google Ads and the CRM. Three of them disagree. The fourth is the one you secretly trust. The actual problem isn&apos;t the data — it&apos;s what decisions you can defend.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((c) => (
            <article
              key={c.title}
              className="bg-warm-50 border border-warm-100 rounded-xl p-8 flex flex-col gap-4 min-h-[360px]"
            >
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink leading-[1.2]">
                {c.title}
              </h3>
              <p className="text-[14.5px] leading-[1.55] text-ink-2">{c.scenario}</p>
              <p className="text-[14.5px] leading-[1.55] text-ink-soft mt-auto pt-4 border-t border-warm-100">
                <em className="italic-accent not-italic font-medium">Why it happens —</em> {c.reframe}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FOUR PILLARS
   ============================================ */
export function FourPillarsV3() {
  const pillars = [
    {
      n: "01 · Capture",
      title: "Consentless tracking",
      p: "First-party, cookieless, GDPR-safe. Traffic without consent loss — not a fraction.",
    },
    {
      n: "02 · Attribute",
      title: "Revenue attribution",
      p: "Every euro linked to channel, campaign and creative. Last-click on complete data.",
    },
    {
      n: "03 · Understand",
      title: "LENS AI",
      p: "Ask your data anything and build reports — in natural language.",
    },
    {
      n: "04 · Activate",
      title: "API · MCP · BigQuery",
      p: "Pipe real data into warehouses, agents and BI — from day one.",
    },
  ];
  return (
    <section className="py-28 bg-warm-50 border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">The platform</span>
            <h2 className="h-section mt-5">
              Four pillars. <em>One picture.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Sealmetrics is not four tools stitched together. It&apos;s one pipeline: from the first observed visitor to the last-touch revenue attribution your CFO signs off on.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[1px] bg-warm-100 border border-warm-100 rounded-2xl overflow-hidden">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-white p-8 min-h-[200px] flex flex-col"
            >
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-brand mb-4">
                {p.n}
              </div>
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] leading-[1.25] mb-2 text-ink">
                {p.title}
              </h3>
              <p className="text-[14px] leading-[1.55] text-ink-soft">{p.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FEATURE BLOCK · wrapper
   ============================================ */
function FeatureBlock({
  tag,
  title,
  lede,
  bullets,
  visual,
  reversed = false,
  bgClass = "bg-white",
}: {
  tag: string;
  title: React.ReactNode;
  lede: string;
  bullets: string[];
  visual: React.ReactNode;
  reversed?: boolean;
  bgClass?: string;
}) {
  return (
    <section className={`py-28 border-t border-warm-100 ${bgClass}`}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div
          className={`grid md:grid-cols-2 gap-14 md:gap-20 items-center ${
            reversed ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div>
            <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand bg-brand-soft px-3 py-1 rounded-md mb-5">
              {tag}
            </span>
            <h3
              className="font-semibold text-ink tracking-[-0.03em] leading-[1.05]"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              {title}
            </h3>
            <p className="text-[17px] leading-[1.6] text-ink-soft mt-5">{lede}</p>
            <ul className="mt-6 flex flex-col">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 items-center py-2.5 border-b border-warm-100 text-[15px] text-ink-2 leading-[1.45]"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-brand shrink-0"
                    aria-hidden
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          {visual}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FEATURE · LENS AI
   ============================================ */
export function FeatureLensAIV3() {
  return (
    <FeatureBlock
      tag="LENS AI"
      title={
        <>
          Ask your data a question.
          <br />
          Get a <em>real answer.</em>
        </>
      }
      lede="LENS AI reads your full-resolution data and answers in plain language. Ask why revenue moved, which channel carried it, what a landing page did last week — and turn the answer into a report you can send."
      bullets={[
        "Ask anything about revenue, funnel and channels",
        "Answers grounded in your own numbers, never invented",
        "Turn any answer into a shareable report",
        "Weekly & monthly reports, in your inbox",
      ]}
      visual={<LensChatVisual />}
    />
  );
}

function LensChatVisual() {
  return (
    <div
      className="bg-ink text-white rounded-[20px] p-8 md:p-10 min-h-[380px] flex flex-col justify-center relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -80,
          top: -80,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(45,139,109,0.35),transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase mb-4" style={{ color: "#E8B84B" }}>
          ● LENS AI
        </div>
        <h4 className="text-[20px] font-semibold mb-6 leading-[1.3]">
          What happened to paid social yesterday?
        </h4>
        <div className="flex flex-col gap-2.5">
          <div className="self-end max-w-[85%] bg-white/10 text-white px-4 py-3 rounded-[14px] rounded-br-[4px] text-[13px] leading-[1.45]">
            Why did paid social drop 22%?
          </div>
          <div
            className="self-start max-w-[90%] px-4 py-3 rounded-[14px] rounded-bl-[4px] text-[13px] leading-[1.5] font-medium"
            style={{ background: "#E8B84B", color: "#0E0E0C" }}
          >
            Meta CPC rose 31% on the <b>Summer Sale</b> campaign after 4 PM. ROAS dropped from 4.2 → 2.8. 3 ad sets responsible.
            <span className="block mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-brand">
              Grounded in your data · last 7 days
            </span>
          </div>
          <div className="self-end max-w-[85%] bg-white/10 text-white px-4 py-3 rounded-[14px] rounded-br-[4px] text-[13px] leading-[1.45]">
            Show me the ad sets.
          </div>
          <div
            className="self-start max-w-[90%] px-4 py-3 rounded-[14px] rounded-bl-[4px] text-[13px] leading-[1.5] font-medium"
            style={{ background: "#E8B84B", color: "#0E0E0C" }}
          >
            Opening Attribution → Meta → Summer Sale…
          </div>
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-white/40">
          Illustrative conversation — not a live account.
        </p>
      </div>
    </div>
  );
}

/* ============================================
   FEATURE · PRIVATE AI
   ============================================ */
export function FeaturePrivateAIV3() {
  return (
    <FeatureBlock
      tag="Private AI"
      bgClass="bg-warm-white"
      reversed
      title={
        <>
          Your AI. <em>Your data stays yours.</em>
        </>
      }
      lede="Every analytics AI on the market ships your numbers to a US cloud to answer your questions. LENS lets you choose who runs the model — including a private one, on European soil, that never trains a third-party algorithm."
      bullets={[
        "Bring your own keys — Anthropic, OpenAI or Gemini",
        "Or LENS Private AI: an EU-hosted open-weight model (gpt-oss-120b, Paris)",
        "Data never leaves the EU, never shared, never used for training",
        "Enterprise: a dedicated instance, not shared with any other customer",
      ]}
      visual={<PrivateAIVisual />}
    />
  );
}

function PrivateAIVisual() {
  return (
    <div className="bg-ink text-white rounded-[20px] p-8 md:p-10 min-h-[380px] flex flex-col justify-center relative overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -80,
          top: -80,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(45,139,109,0.35),transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase mb-6" style={{ color: "#E8B84B" }}>
          ● One AI · three ways to run it
        </div>
        <div className="flex flex-col gap-3">
          {[
            { tag: "Your keys", d: "BYOK — Anthropic, OpenAI, Gemini, or via mcp.sealmetrics.com" },
            { tag: "Private AI", d: "EU open-weight model (gpt-oss-120b, Scaleway · Paris)", featured: true },
            { tag: "Dedicated", d: "Your own instance — Enterprise only" },
          ].map((c) => (
            <div
              key={c.tag}
              className={`rounded-xl p-4 border ${
                c.featured ? "bg-white/[0.08] border-white/20" : "bg-white/[0.03] border-white/10"
              }`}
            >
              <div
                className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: c.featured ? "#E8B84B" : "rgba(255,255,255,0.5)" }}
              >
                {c.tag}
              </div>
              <div className="text-[13.5px] text-white/85 leading-[1.5] mt-1.5">{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   FEATURE · ATTRIBUTION
   ============================================ */
export function FeatureAttributionV3() {
  return (
    <FeatureBlock
      tag="Revenue attribution"
      reversed
      bgClass="bg-warm-50"
      title={
        <>
          Every euro <em>gets a source.</em>
        </>
      }
      lede="Last-click revenue attribution on observed events, without consent gaps — including the pageviews GA4 loses to cookies and consent. Aggregate channel, campaign and creative totals. No modelling, no sampling, no per-user tracking."
      bullets={[
        "Channel · campaign · ad set · creative granularity",
        "Microconversion counts & revenue totals",
        "Multi-site portfolio rollup",
        "Export to BigQuery + MCP in one click",
      ]}
      visual={<AttributionBarsVisual />}
    />
  );
}

function AttributionBarsVisual() {
  const bars = [
    { label: "Organic", amount: "€482K", pct: 92, color: "#E8B84B" },
    { label: "Meta Ads", amount: "€331K", pct: 64, color: "#B5423B" },
    { label: "Google Ads", amount: "€248K", pct: 48, color: "#2D8B6D" },
    { label: "Email", amount: "€142K", pct: 28, color: "#E8B84B" },
    { label: "Direct", amount: "€81K", pct: 16, color: "#B5423B" },
  ];
  return (
    <div
      className="bg-ink text-white rounded-[20px] p-8 md:p-10 min-h-[380px] flex flex-col justify-center relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -80,
          top: -80,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(45,139,109,0.35),transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase mb-3" style={{ color: "#E8B84B" }}>
          ● Revenue / last 30 days
        </div>
        <h4 className="text-[22px] font-semibold mb-6 leading-[1.3] tabular-nums">
          €1,284,430 attributed
        </h4>
        <div className="flex flex-col gap-3 font-mono text-[12px]">
          {bars.map((b) => (
            <div
              key={b.label}
              className="grid grid-cols-[88px_1fr_80px] items-center gap-3"
            >
              <span className="text-white/85">{b.label}</span>
              <div className="h-3.5 rounded-md bg-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div
                  className="h-full rounded-md"
                  style={{ width: `${b.pct}%`, background: b.color }}
                />
              </div>
              <span className="text-white font-semibold text-right tabular-nums">
                {b.amount}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-white/40">
          Illustrative example — not a live account.
        </p>
      </div>
    </div>
  );
}

/* ============================================
   FEATURE · SUPERAPI + MCP + BIGQUERY
   ============================================ */
export function FeatureSuperAPIV3() {
  return (
    <FeatureBlock
      tag="SuperAPI · MCP · BigQuery"
      title={
        <>
          Your data, <em>everywhere.</em>
        </>
      }
      lede="Full-resolution data piped wherever you need it. Native BigQuery export. Full REST API. And an MCP server so AI agents — Claude, ChatGPT, custom copilots — can query your analytics directly."
      bullets={[
        "BigQuery native export (no ETL)",
        "REST API with full coverage of every metric and property",
        "MCP server for AI agents",
        "Webhooks for real-time ops",
      ]}
      visual={<SuperApiVisual />}
    />
  );
}

function SuperApiVisual() {
  return (
    <div
      className="bg-ink text-white rounded-[20px] p-8 md:p-10 min-h-[380px] flex flex-col justify-center relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: -60,
          bottom: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(45,139,109,0.35),transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase mb-3" style={{ color: "#E8B84B" }}>
          ● SuperAPI · query
        </div>
        <h4 className="text-[20px] font-semibold mb-6 leading-[1.3]">
          One query, full resolution
        </h4>
        <pre className="font-mono text-[12.5px] leading-[1.8] text-white/90 whitespace-pre-wrap overflow-x-auto">
<span className="text-white/45">{`-- Last 7 days, attributed revenue by channel`}</span>{"\n"}
<span style={{ color: "#E8B84B" }}>SELECT</span>{" "}channel,{"\n"}
       <span style={{ color: "#E8B84B" }}>SUM</span>(revenue) <span style={{ color: "#E8B84B" }}>AS</span> attributed{"\n"}
<span style={{ color: "#E8B84B" }}>FROM</span>   sealmetrics.conversions{"\n"}
<span style={{ color: "#E8B84B" }}>WHERE</span>  date &gt; <span style={{ color: "#B5423B" }}>&quot;2026-04-14&quot;</span>{"\n"}
<span style={{ color: "#E8B84B" }}>GROUP BY</span> channel{"\n"}
<span style={{ color: "#E8B84B" }}>ORDER BY</span> attributed <span style={{ color: "#E8B84B" }}>DESC</span>;{"\n"}{"\n"}
<span className="text-white/45">{`→ 1.2M rows · 340ms · full resolution`}</span>
        </pre>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-white/40">
          Illustrative query — not a live account.
        </p>
      </div>
    </div>
  );
}

/* ============================================
   NINE REPORTS
   ============================================ */
export function NineReportsV3() {
  const reports = [
    { n: "01", title: "Overview", p: "Headline totals with the last-hit timestamp — no identifiers anywhere." },
    { n: "02", title: "Evolution", p: "Metrics over time, period against period." },
    { n: "03", title: "Sources", p: "Channel, campaign and referrer totals on traffic without consent gaps." },
    { n: "04", title: "Pages", p: "Pageviews and landing pages, with content grouping." },
    { n: "05", title: "Conversions", p: "Conversions, microconversions and last-click revenue by channel." },
    { n: "06", title: "Funnel", p: "Step-level drop-off with no sampling thresholds." },
    { n: "07", title: "Geography", p: "Country-level breakdown, derived from timezone — never from IP." },
    { n: "08", title: "Devices", p: "Device type, browser and operating system totals." },
    { n: "09", title: "Properties", p: "Your own event properties — products, baskets, AOV — at full resolution." },
  ];
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">Nine core reports</span>
            <h2 className="h-section mt-5">
              Every report, <em>built on complete data.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Nine reports covering the full surface of eCommerce analytics — from sources to conversions, funnel to properties. All on the same full-resolution data pipeline. LENS AI sits on top of them as a conversational assistant, not a tenth report.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reports.map((r) => (
            <article
              key={r.title}
              className="bg-white border border-warm-100 rounded-xl p-6 transition-all hover:border-warm-200 hover:-translate-y-0.5"
              style={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
            >
              <div className="font-mono text-[11px] text-ink-mute tracking-[0.08em] mb-3">
                {r.n}
              </div>
              <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-ink leading-[1.3] mb-1.5 flex items-center gap-2 flex-wrap">
                {r.title}
              </h3>
              <p className="text-[13.5px] text-ink-soft leading-[1.55]">{r.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   INTEGRATIONS STRIP
   ============================================ */
export function IntegrationsStripV3() {
  const pills = [
    "Shopify",
    "WooCommerce",
    "Magento 2",
    "PrestaShop",
    "OpenCart",
    "WordPress",
    "Drupal",
    "Joomla",
    "Webflow",
    "Wix",
    "Squarespace",
    "Next.js",
    "React",
    "Nuxt 3",
    "Google Tag Manager",
    "BigQuery",
    "Data Studio",
    "MCP server",
    "Webhooks",
  ];
  return (
    <section className="py-28 bg-warm-50 border-t border-warm-100 text-center">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <span
          className="eyebrow mb-5"
          style={{ display: "inline-flex", justifyContent: "center" }}
        >
          Native integrations
        </span>
        <h2 className="h-section mt-5 mx-auto" style={{ maxWidth: "20ch" }}>
          Plug into the stack <em>you already run.</em>
        </h2>
        <div className="flex gap-3 flex-wrap justify-center mt-10">
          {pills.map((p) => (
            <span
              key={p}
              className="px-5 py-2.5 bg-white border border-warm-100 rounded-full text-[14px] font-medium font-mono text-ink-2 tracking-[-0.005em]"
            >
              {p}
            </span>
          ))}
          <span
            className="px-5 py-2.5 rounded-full text-[14px] font-mono font-medium bg-ink text-white border border-ink"
          >
            + 10 more
          </span>
        </div>
        <div className="mt-10">
          <Link
            href="/integrations"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-warm-200 text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-white transition-colors"
          >
            See all integrations →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PRODUCT FINAL CTA
   ============================================ */
export function ProductFinalCtaV3() {
  return (
    <section id="demo" className="py-20 bg-white border-t border-warm-100">
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
            The analytics platform <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>eCommerce teams deserve.</em>
          </h2>
          <p className="text-white/70 text-[16px] leading-[1.55] mt-6 mb-8 mx-auto max-w-[52ch] relative">
            Start the 14-day trial — install a script or a native module in 5 to 30 minutes, depending on your platform, and start measuring what GA4 misses. You add a card to start, and pay nothing if you cancel before day 14. No call required.
          </p>
          <div data-md="skip" className="flex flex-col sm:flex-row justify-center gap-3 flex-wrap relative">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 bg-white text-ink px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-95"
            >
              Book a demo →
            </Link>
            <a
              href="https://my.sealmetrics.com/register"
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:bg-white/5"
            >
              Start 14-day trial
            </a>
          </div>
          <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.1em] font-semibold mt-6 relative">
            14-day trial · EU-hosted · Consentless by design
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PROOF · audited results before the final ask
   ============================================
   The page was a feature tour that closed on a claim with no number behind
   it. This is the only place on /product where outcomes are evidenced, so it
   sits directly before the CTA. Light section on purpose — the design system
   allows two dark slabs per page and the final CTA takes one.
   PRD-CONVERSION-REDESIGN.md §5. */
export function ProductProofV3() {
  const cases = [
    {
      client: "Palladium Hotel Group",
      href: "/case-studies/palladium-hotel-group",
      stats: [
        { n: "40%", l: "of inbound traffic had no attribution before" },
        { n: "35%", l: "of GA4 bookings had no channel assigned" },
        { n: "+165%", l: "Display Cost-per-Search on DV360 after" },
      ],
      quote:
        "The data Sealmetrics delivers is agnostic, unbiased and neutral. There's no black box.",
      cite: "Toni Andújar · Digital & Direct Sales Director",
    },
    {
      client: "Dreamplace Hotels",
      href: "/case-studies/dreamplace-hotels",
      stats: [
        { n: "+30%", l: "more traffic measured vs Google Analytics" },
        { n: "15–20%", l: "sales attribution gap against the CRM, closed" },
      ],
      quote:
        "It's no longer a tool that sits next to the process. It's the tool that gives us the real data — and the one we make decisions with.",
      cite: "Eduardo Martin · Analytics & Campaigns",
    },
  ];

  return (
    <section className="py-28 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">Audited, not claimed</span>
            <h2 className="h-section mt-5">
              What the stack does <em>on real accounts.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Two customers ran Sealmetrics against their previous setup and
            published the numbers. Both figures below are theirs, audited on
            their own traffic — not our benchmarks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {cases.map((c) => (
            <article
              key={c.client}
              className="bg-white border border-warm-100 rounded-xl p-8 md:p-10 flex flex-col"
            >
              <h3 className="text-[19px] font-semibold text-ink tracking-[-0.015em] mb-7">
                {c.client}
              </h3>
              <div className="flex flex-col gap-5 pb-7 border-b border-warm-100">
                {c.stats.map((s) => (
                  <div key={s.n} className="flex items-baseline gap-4">
                    <span
                      className="font-semibold tabular-nums tracking-[-0.03em] leading-none text-brand shrink-0 min-w-[110px]"
                      style={{ fontSize: "clamp(30px, 3.2vw, 42px)" }}
                    >
                      {s.n}
                    </span>
                    <span className="text-[14px] leading-[1.5] text-ink-soft">
                      {s.l}
                    </span>
                  </div>
                ))}
              </div>
              <figure className="mt-7 border-l-2 pl-5 grow" style={{ borderColor: "#2E5C8A" }}>
                <blockquote className="text-[16px] leading-[1.55] text-ink-2 font-medium">
                  &ldquo;{c.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-soft font-semibold">
                  {c.cite}
                </figcaption>
              </figure>
              <Link
                href={c.href}
                className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-ink no-underline border-b border-warm-200 pb-0.5 w-fit hover:border-ink transition-colors"
              >
                Read the full case study →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
