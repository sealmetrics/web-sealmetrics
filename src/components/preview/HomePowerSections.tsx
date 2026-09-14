import Link from "next/link";
import { DualCTA } from "@/components/homepage/DualCTA";
import { HeroDashboard } from "@/components/sections/v3/HeroDashboard";

/* ============================================================
   PREVIEW · "Power" home proposal sections
   Local design proposal — not linked from navigation, noindex.
   Narrative: consentless measurement + real-time (BF) + any property
   + LENS AI (BYOK / Private AI / dedicated) = category of one.
   ============================================================ */

/* ============================================
   HERO · two variants
   A (recommended): category-of-one stack claim
   B: LENS Private AI leads
   ============================================ */
export function HeroPower({ variant = "a" }: { variant?: "a" | "b" }) {
  return (
    <section data-hero className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-0">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center pb-16">
        <div className="inline-flex items-center gap-3 bg-white border border-warm-100 rounded-full px-4 py-1.5 text-[13px] text-ink-2 mb-10">
          <span className="bg-warm-100 text-ink px-2.5 py-1 rounded text-[10px] font-semibold font-mono tracking-[0.08em] uppercase">
            New · LENS Private AI
          </span>
          <a href="#lens" className="text-ink border-b border-warm-200 hover:border-ink">
            Analytics AI on EU soil — your data never trains anyone&rsquo;s model
          </a>
        </div>

        {variant === "a" ? (
          <>
            <h1 className="h-display mx-auto">
              The analytics stack <em className="italic-accent">no one else has.</em>
            </h1>
            <p
              className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]"
              style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
            >
              Your traffic measured without depending on consent — legally. Every dashboard
              computed in real time, Black Friday included. Any property on any event. And LENS AI
              on top: your own keys, or a private AI that never lets your data leave Europe.
            </p>
          </>
        ) : (
          <>
            <h1 className="h-display mx-auto">
              The first analytics AI that <em className="italic-accent">keeps your data yours.</em>
            </h1>
            <p
              className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]"
              style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
            >
              Ask revenue questions in plain language. LENS runs on an open-source model hosted in
              the EU — your numbers never train third-party algorithms, never touch a US cloud,
              never get shared with anyone. Underneath: consent-independent measurement, in real time.
            </p>
          </>
        )}

        <p className="text-[13.5px] text-ink-soft mt-5">
          Trusted by marketing teams analyzing <b className="font-semibold text-ink">500M+ events</b>{" "}
          across <b className="font-semibold text-ink">12 countries</b>
        </p>

        <DualCTA locale="en" className="justify-center mt-7" />

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
          {[
            "Consent-independent measurement",
            "Real-time dashboards",
            "Any property, any event",
            "AI on EU infrastructure",
          ].map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Dashboard mockup (interactive) — same trust piece as production home */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <HeroDashboard />
      </div>
    </section>
  );
}

/* ============================================
   POWER MATRIX · the proof behind the claim
   ============================================ */
type Cell = { text: string; tone: "yes" | "no" | "mid" };
const y = (text: string): Cell => ({ text, tone: "yes" });
const n = (text: string): Cell => ({ text, tone: "no" });
const m = (text: string): Cell => ({ text, tone: "mid" });

const MATRIX_COLS = ["Sealmetrics", "GA4", "Adobe Analytics", "Piwik PRO", "Amplitude", "Matomo"];

const MATRIX_ROWS: { capability: string; cells: Cell[] }[] = [
  {
    capability: "Measures traffic without depending on a consent banner",
    cells: [
      y("Yes — by architecture"),
      n("No — consent-gated, gaps modeled"),
      n("No — consent-gated"),
      m("Partial — anonymous mode, reduced detail"),
      n("No — consent-gated"),
      m("Partial — cookieless config, loses detail"),
    ],
  },
  {
    capability: "Every dashboard in real time — at Black Friday peak",
    cells: [
      y("Yes — all reports, live"),
      n("Realtime widget only; reports lag and sample"),
      m("Some reports near real time"),
      m("Processing delay on reports"),
      m("Fast — on the consented share only"),
      n("No — archive processing"),
    ],
  },
  {
    capability: "Any custom property on any event (SKU, size, value…)",
    cells: [
      y("Yes — no property cap"),
      n("25 params per event, capped dimensions"),
      m("Capped eVars/props, config-heavy"),
      m("Custom dimensions, capped"),
      m("Yes — on consented events"),
      m("Custom dimensions, capped"),
    ],
  },
  {
    capability: "Native MCP server — plug your AI agents in",
    cells: [
      y("Yes — mcp.sealmetrics.com"),
      n("Not offered"),
      n("Not offered"),
      n("Not offered"),
      m("Emerging tooling"),
      n("Not offered"),
    ],
  },
  {
    capability: "Analytics AI on private EU infrastructure",
    cells: [
      y("Yes — EU open-source model, or your own dedicated instance"),
      n("No — Gemini on Google Cloud"),
      n("No — US-cloud AI assistant"),
      n("No AI assistant"),
      n("No — US-hosted LLMs"),
      n("No AI assistant"),
    ],
  },
  {
    capability: "Bring your own AI keys (Anthropic, OpenAI, Gemini)",
    cells: [y("Yes — choose the algorithm"), n("No"), n("No"), n("No"), n("No"), n("No")],
  },
  {
    capability: "EU data residency, end to end",
    cells: [
      y("Dublin + Paris, zero non-EU sub-processors"),
      n("No"),
      m("Limited options"),
      m("Yes for analytics — no AI layer"),
      m("EU option for analytics"),
      m("If you self-host"),
    ],
  },
  {
    capability: "What it costs per year",
    cells: [
      y("From €5,988 — all features, every plan"),
      m("Free — until you need GA360, from ~$50K"),
      n("~$50–200K typical"),
      n("Enterprise quote-only"),
      m("Custom — scales steeply with events"),
      m("Low — plus the team to run it"),
    ],
  },
];

function cellClasses(tone: Cell["tone"]) {
  if (tone === "yes") return "text-brand font-semibold";
  if (tone === "no") return "text-red-alert/80";
  return "text-ink-soft";
}

export function PowerMatrix() {
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">The market, honestly</span>
            <h2 className="h-section mt-5">
              Eight capabilities. <em>One column full of yes.</em>
            </h2>
          </div>
          <p className="text-[17px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Each of these tools is good at what it was built for. None of them was built for all of
            this at once: complete consentless data, real-time reporting at peak load, unlimited
            event detail, and an AI layer that respects where your data lives.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-warm-100 bg-white">
          <table className="w-full min-w-[980px] border-collapse text-[13px] leading-[1.45]">
            <thead>
              <tr className="border-b border-warm-100">
                <th className="text-left font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-semibold px-5 py-4 w-[24%]">
                  Capability
                </th>
                {MATRIX_COLS.map((c, i) => (
                  <th
                    key={c}
                    className={`text-left px-4 py-4 font-semibold text-[13px] ${
                      i === 0 ? "text-ink bg-warm-50" : "text-ink-soft"
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX_ROWS.map((row) => (
                <tr key={row.capability} className="border-b border-warm-100 last:border-b-0 align-top">
                  <td className="px-5 py-4 font-medium text-ink">{row.capability}</td>
                  {row.cells.map((cell, i) => (
                    <td key={i} className={`px-4 py-4 ${i === 0 ? "bg-warm-50" : ""} ${cellClasses(cell.tone)}`}>
                      {cell.text}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 font-mono text-[11px] tracking-[0.04em] text-ink-mute">
          Based on publicly documented capabilities, July 2026. Each vendor&rsquo;s docs prevail for
          their own product — see the full comparisons for sources.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
          {[
            { href: "/vs-ga4", label: "Sealmetrics vs GA4" },
            { href: "/vs/adobe-analytics", label: "vs Adobe Analytics" },
            { href: "/vs/piwik-pro", label: "vs Piwik PRO" },
            { href: "/vs/matomo", label: "vs Matomo" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-brand font-medium border-b border-brand/30 hover:border-brand">
              {l.label} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   REAL TIME · dashboards that move while it happens
   ============================================ */
export function RealTimePower() {
  return (
    <section className="py-28 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-center">
        <div>
          <span className="eyebrow mb-5">Real time</span>
          <h2 className="h-section mt-5">
            Dashboards that move <em>while it happens.</em>
          </h2>
          <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft max-w-[56ch]">
            Most platforms give you a &ldquo;visitors right now&rdquo; widget and make you wait for
            the real reports. Sealmetrics computes every dashboard in real time — channels,
            campaigns, products, revenue — because the decisions you make at 11:58 PM on Black
            Friday are the ones that pay for the whole quarter.
          </p>
          <ul className="mt-7 flex flex-col gap-3 text-[15.5px] leading-[1.5] text-ink-2">
            <li className="flex gap-3">
              <span className="text-brand font-semibold shrink-0">—</span>
              Every report live, not just a visitor counter
            </li>
            <li className="flex gap-3">
              <span className="text-brand font-semibold shrink-0">—</span>
              Engineered for Black Friday peaks — no sampling, no queueing your data for tomorrow
            </li>
            <li className="flex gap-3">
              <span className="text-brand font-semibold shrink-0">—</span>
              Contractual guarantee: consolidated data complete before 6 AM, every day of the year
            </li>
          </ul>
        </div>

        {/* Live ticker visual */}
        <div className="bg-white border border-warm-100 rounded-2xl p-8 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
              Black Friday · 23:58
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-brand font-semibold">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              Live
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-7">
            {[
              { label: "Revenue today", value: "€412,904", delta: "+38% vs last hour", up: true },
              { label: "Orders", value: "1,847", delta: "+214 last 10 min", up: true },
              { label: "Conversion rate", value: "2.94%", delta: "+0.4 pts", up: true },
              { label: "Top campaign", value: "PMax_BF", delta: "€96,204 · live", up: true },
            ].map((kpi) => (
              <div key={kpi.label}>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-mute mb-1.5">
                  {kpi.label}
                </div>
                <div className="text-[26px] font-semibold text-ink tracking-[-0.02em] font-mono">
                  {kpi.value}
                </div>
                <div className="text-[12.5px] font-medium text-brand mt-1">{kpi.delta}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-warm-100 text-[13px] leading-[1.5] text-ink-soft">
            Not a sample. Not an estimate. Every dashboard, computed on every recorded event as it
            arrives.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PROPERTIES · any property on any event
   ============================================ */
export function PropertiesPower() {
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-center">
        {/* Event payload visual */}
        <div className="order-2 md:order-1">
          <div className="bg-ink text-white rounded-2xl p-7 md:p-8 font-mono text-[12.5px] leading-[1.7] overflow-x-auto">
            <div className="text-[10.5px] uppercase tracking-[0.12em] mb-4" style={{ color: "#E8B84B" }}>
              event · purchase
            </div>
            <pre className="whitespace-pre text-white/90">{`{
  "event":     "purchase",
  "value":     3499.00,
  "currency":  "EUR",
  "product":   "eBike MTB 29\\"",
  "sku":       "BH-ATOMX-29-L",
  "brand":     "BH",
  "size":      "L",
  "payment":   "financing",
  "user_type": "returning",
  "stock_at_purchase": 3
}`}</pre>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Revenue by size",
              "Margin by brand × channel",
              "Orders > €2,500 by source",
              "Financing uptake by category",
            ].map((chip) => (
              <span
                key={chip}
                className="font-mono text-[11px] font-semibold text-ink bg-warm-50 border border-warm-100 rounded-full px-3.5 py-1.5"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2">
          <span className="eyebrow mb-5">Event properties</span>
          <h2 className="h-section mt-5">
            Store <em>any property</em> on any event.
          </h2>
          <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft max-w-[56ch]">
            GA4 caps you at 25 parameters per event. Adobe makes you ration eVars. Sealmetrics
            stores whatever your business needs on every purchase, signup or micro-conversion —
            value, product, SKU, brand, size, payment method, anything — with no property cap.
          </p>
          <p className="mt-4 text-[17px] leading-[1.6] text-ink-soft max-w-[56ch]">
            And because LENS AI reads every property, &ldquo;revenue is down&rdquo; becomes
            &ldquo;premium e-bikes over €2,500 stopped selling — check stock today.&rdquo; The
            answer arrives at product level, not channel level.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   LENS AI · dark slab — one AI, three ways to run it
   ============================================ */
export function LensTriadSlab() {
  return (
    <section id="lens" className="section-dark bg-ink py-28 border-t border-warm-100 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -160,
          top: -160,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,139,109,0.3), transparent 70%)",
        }}
      />
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 relative">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#E8B84B" }}>
          LENS AI
        </span>
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-end mt-5 mb-14">
          <h2 className="h-section">
            One AI. <em>Three ways to run it.</em>
          </h2>
          <p className="text-[17px] leading-[1.6] text-white/70 max-w-[54ch]">
            Every AI analytics assistant on the market ships your numbers to a US cloud to answer
            your questions. LENS lets you choose who runs the model — including nobody but us, on
            European soil.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              tag: "Your keys",
              title: "Bring your own AI",
              body: "Add your Anthropic, OpenAI or Gemini API keys in the platform — or connect any agent through our native MCP server at mcp.sealmetrics.com. You choose the algorithm.",
              foot: "Included in every paid plan",
            },
            {
              tag: "Private AI",
              title: "LENS Private AI",
              body: "An open-weight model (gpt-oss-120b, Apache 2.0) served from Scaleway — a French cloud, in Paris. Your data never leaves the EU, is never shared with any company, and never trains a third-party model.",
              foot: "Scale includes 5M tokens/mo",
              featured: true,
            },
            {
              tag: "Dedicated",
              title: "Your own instance",
              body: "For Enterprise: a private AI server provisioned for your company alone. Not shared with any other customer — your model, your data, your boundary.",
              foot: "Enterprise · custom",
            },
          ].map((card) => (
            <article
              key={card.title}
              className={`rounded-2xl p-8 flex flex-col justify-between min-h-[280px] border ${
                card.featured
                  ? "bg-white/[0.07] border-white/20"
                  : "bg-white/[0.03] border-white/10"
              }`}
            >
              <div>
                <span
                  className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: card.featured ? "#E8B84B" : "rgba(255,255,255,0.5)" }}
                >
                  {card.tag}
                </span>
                <h3 className="text-[21px] font-semibold text-white mt-3 mb-3 leading-[1.25]">
                  {card.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-white/70">{card.body}</p>
              </div>
              <div className="mt-6 pt-5 border-t border-white/10 font-mono text-[11.5px] tracking-[0.04em] text-white/50">
                {card.foot}
              </div>
            </article>
          ))}
        </div>

        {/* Real LENS output — anonymized management report */}
        <div className="mt-14 grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-14 items-center">
          <div>
            <h3 className="text-[26px] font-semibold text-white leading-[1.25] tracking-[-0.02em]">
              This is what LENS writes to a CEO. <em className="italic font-medium" style={{ color: "#E8B84B" }}>Unedited.</em>
            </h3>
            <p className="mt-4 text-[15.5px] leading-[1.6] text-white/70 max-w-[50ch]">
              A weekly report to management, built by LENS from event properties — product, SKU,
              brand, order value, source. Diagnosis first, evidence after, actions at the end. No
              analyst in the loop.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5 text-[14.5px] leading-[1.5] text-white/80">
              <li className="flex gap-3">
                <span className="font-semibold shrink-0" style={{ color: "#E8B84B" }}>—</span>
                Product-level diagnosis, not channel-level guessing
              </li>
              <li className="flex gap-3">
                <span className="font-semibold shrink-0" style={{ color: "#E8B84B" }}>—</span>
                Separates paid, organic and returning-buyer behavior on orders without consent gaps
              </li>
              <li className="flex gap-3">
                <span className="font-semibold shrink-0" style={{ color: "#E8B84B" }}>—</span>
                Ends with actions: what to pause, what to scale, what to check today
              </li>
            </ul>
            <a
              href="https://lens-lite.sealmetrics.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 bg-white text-ink px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 transition"
            >
              Try LENS on demo data →
            </a>
          </div>

          <article className="bg-warm-white text-ink rounded-[20px] p-8 md:p-10">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-mute mb-5">
              Weekly report to management · European bike retailer · LENS output, anonymized
            </div>
            <h4 className="text-[17px] font-semibold leading-[1.4] text-ink">
              Same order volume as last week, revenue down 36%: premium e-bikes stopped selling.
            </h4>
            <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">
              Orders over €2,500 fell from 22 to 7. Not demand, not traffic, not paid campaigns —
              those grew. The loss sits in organic and returning premium buyers. Check premium
              e-bike stock today.
            </p>
            <div className="mt-6 border-t border-warm-100 pt-5 grid grid-cols-2 gap-x-6 gap-y-4">
              {[
                { label: "Revenue", value: "−36.4%", bad: true },
                { label: "Orders", value: "+1.7%", bad: false },
                { label: "Avg. order value", value: "−37.5%", bad: true },
                { label: "Conversion rate", value: "+9.7%", bad: false },
              ].map((kpi) => (
                <div key={kpi.label} className="flex items-baseline justify-between gap-3">
                  <span className="text-[12.5px] text-ink-soft">{kpi.label}</span>
                  <span
                    className={`font-mono text-[15px] font-semibold ${
                      kpi.bad ? "text-red-alert" : "text-brand"
                    }`}
                  >
                    {kpi.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-warm-100 font-mono text-[11px] tracking-[0.04em] text-ink-mute">
              Diagnosis built from event properties: product · SKU · brand · order value · source
            </div>
          </article>
        </div>

        {/* Token pricing band */}
        <div className="mt-14 border border-white/10 rounded-2xl px-8 py-7 grid sm:grid-cols-4 gap-6 bg-white/[0.03]">
          {[
            { plan: "Scale", detail: "5M LENS tokens/mo included" },
            { plan: "100M tokens/mo", detail: "€499/month" },
            { plan: "Unlimited tokens", detail: "€999/month" },
            { plan: "Dedicated instance", detail: "Enterprise · custom" },
          ].map((t) => (
            <div key={t.plan}>
              <div className="text-[15px] font-semibold text-white">{t.plan}</div>
              <div className="font-mono text-[12px] text-white/50 mt-1.5 tracking-[0.03em]">{t.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   COMPLIANCE BAND · light, short
   ============================================ */
export function EuStackBand() {
  return (
    <section className="py-16 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <h3
            className="font-semibold text-ink tracking-[-0.02em] leading-[1.25]"
            style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
          >
            A fully <em className="italic-accent">European stack</em> — measurement to model.
          </h3>
          <p className="mt-3 text-[15.5px] leading-[1.55] text-ink-soft max-w-[70ch]">
            Analytics data hosted in Dublin, Ireland. AI inference on Scaleway in Paris, France.
            Zero sub-processors outside the EU, GDPR by architecture, Schrems II clean, DPA
            included with every plan.
          </p>
        </div>
        <Link
          href="/security"
          className="inline-flex items-center gap-2 border border-warm-200 text-ink px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:border-ink transition whitespace-nowrap"
        >
          Read the security architecture →
        </Link>
      </div>
    </section>
  );
}
