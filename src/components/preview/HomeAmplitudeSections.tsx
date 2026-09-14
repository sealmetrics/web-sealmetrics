"use client";

import Link from "next/link";
import { useState } from "react";

/* ============================================================
   OPTION C — Amplitude-style block sequence, Sealmetrics content
   Mirrors amplitude.com's marketing block ARRANGEMENT (AI demo →
   feature grid → tabbed value prop → quote → alternating rows →
   team grid → success stories → resources → CTA) while keeping
   the Sealmetrics editorial design system (warm cream, forest
   green, dashes, one dark AI slab).
   ============================================================ */

/* --- Block 2: "Ask your data" AI demo (dark slab) ----------- */
export function AiAskDemo() {
  return (
    <section id="lens" className="section-dark bg-ink py-28 border-t border-warm-100 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: -160, top: -140, width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,139,109,0.28), transparent 70%)",
        }}
      />
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 relative">
        <div className="max-w-[42ch] mb-14">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#E8B84B" }}>
            LENS AI
          </span>
          <h2 className="h-section mt-4">
            Ask your data what happened. <em>Get the answer, not a dashboard.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-4">
          {/* Chat */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 md:p-9">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase mb-5" style={{ color: "#E8B84B" }}>
              ● LENS · live
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="self-end max-w-[85%] bg-white/10 text-white px-4 py-3 rounded-[14px] rounded-br-[4px] text-[13px] leading-[1.45]">
                Why did revenue drop this week if orders held?
              </div>
              <div className="self-start max-w-[92%] px-4 py-3 rounded-[14px] rounded-bl-[4px] text-[13px] leading-[1.55] font-medium" style={{ background: "#E8B84B", color: "#0E0E0C" }}>
                Order volume is flat, but premium bikes over €2,500 fell from 22 to 7. The loss is entirely in organic and returning buyers — paid campaigns grew. Check premium stock today.
                <span className="block mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-brand">
                  Product-level · high confidence
                </span>
              </div>
              <div className="self-end max-w-[85%] bg-white/10 text-white px-4 py-3 rounded-[14px] rounded-br-[4px] text-[13px] leading-[1.45]">
                Which source lost the most?
              </div>
              <div className="self-start max-w-[92%] px-4 py-3 rounded-[14px] rounded-bl-[4px] text-[13px] leading-[1.5] font-medium" style={{ background: "#E8B84B", color: "#0E0E0C" }}>
                Returning buyers (&ldquo;rejoined&rdquo;): €28,782 → €4,592, down 84%.
              </div>
            </div>
          </div>

          {/* Connect panel */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 md:p-9 flex flex-col">
            <h3 className="text-[19px] font-semibold text-white leading-[1.3]">Connect any AI. You choose the algorithm.</h3>
            <p className="text-[14px] leading-[1.6] text-white/65 mt-3">
              Bring your own keys, run it through our native MCP server, or keep everything on our private EU model.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Claude", "OpenAI", "Gemini", "Cursor", "Codex"].map((p) => (
                <span key={p} className="font-mono text-[11px] font-semibold text-white/85 bg-white/[0.06] border border-white/10 rounded-full px-3.5 py-1.5">
                  {p}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 font-mono text-[12px] text-white/55 tracking-[0.03em]">
              mcp.sealmetrics.com
            </div>

            <div className="mt-auto pt-6">
              <a href="https://lens-lite.sealmetrics.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-ink px-6 py-3 rounded-md text-[14px] font-semibold no-underline hover:bg-warm-50 transition">
                Try LENS on demo data →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Block 3: 4-column feature grid ------------------------- */
const ADVANTAGES = [
  { k: "Complete data", d: "Your traffic measured without depending on a consent banner — legally. No sampling, no modeled gaps.", href: "/complete-data" },
  { k: "Real time", d: "Every dashboard computed live, Black Friday included. Not a visitor counter — every report.", href: "#" },
  { k: "Any property", d: "Store value, product, SKU, brand, size — anything — on any event. No property cap.", href: "#" },
  { k: "Private AI", d: "LENS runs on an EU open-source model. Your data never trains a third-party algorithm.", href: "#lens" },
];

export function UnfairAdvantageGrid() {
  return (
    <section className="py-28 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <div className="max-w-[46ch] mb-14">
          <span className="eyebrow mb-5">Why it&rsquo;s different</span>
          <h2 className="h-section mt-5">
            Your unfair <em>data advantage.</em>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ADVANTAGES.map((a) => (
            <article key={a.k} className="bg-white border border-warm-100 rounded-2xl p-7 flex flex-col min-h-[220px]">
              <div className="w-9 h-9 rounded-lg bg-brand-soft flex items-center justify-center mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand" />
              </div>
              <h3 className="text-[17px] font-semibold text-ink leading-[1.3]">{a.k}</h3>
              <p className="text-[14px] leading-[1.6] text-ink-soft mt-2.5 flex-1">{a.d}</p>
              <Link href={a.href} className="mt-5 text-[13.5px] font-medium text-brand border-b border-brand/30 hover:border-brand self-start">
                Learn more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Block 4: tabbed value prop ----------------------------- */
const TABS = [
  {
    key: "Complete data",
    head: "See beyond the consented slice.",
    bullets: ["Cookieless pixel captures every visit", "No consent banner, GDPR by architecture", "Numbers that reconcile with Shopify"],
    stat: "0", statLabel: "visits lost to consent rejection",
  },
  {
    key: "Revenue attribution",
    head: "Last-click, on the full population.",
    bullets: ["Every conversion attributed at channel level", "No 40–60% consent-rejection gap", "One number brand, media and finance accept"],
    stat: "+17%", statLabel: "closer to CRM vs GA4",
  },
  {
    key: "LENS AI",
    head: "Answers at product level, in plain language.",
    bullets: ["Ask in natural language, get the diagnosis", "Your keys, our MCP, or private EU model", "Weekly reports written for the board"],
    stat: "EU", statLabel: "private, never shared",
  },
];

export function ValuePropTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <h2 className="h-section max-w-[20ch] mb-10">
          One platform, <em>end to end.</em>
        </h2>

        <div className="flex flex-wrap gap-2 mb-10 border-b border-warm-100">
          {TABS.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setActive(i)}
              className={`px-5 py-3 text-[14px] font-medium -mb-px border-b-2 transition-colors ${
                i === active ? "border-brand text-ink" : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              {t.key}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-16 items-center">
          <div>
            <h3 className="text-[28px] md:text-[34px] font-semibold text-ink leading-[1.15] tracking-[-0.02em] max-w-[18ch]">
              {tab.head}
            </h3>
            <ul className="mt-7 flex flex-col gap-3 text-[15.5px] leading-[1.5] text-ink-2">
              {tab.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="text-brand font-semibold shrink-0">—</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-warm-white border border-warm-100 rounded-2xl p-10 flex flex-col items-center justify-center min-h-[280px]">
            <div className="font-mono text-[64px] font-semibold text-ink tracking-[-0.03em] leading-none">{tab.stat}</div>
            <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft mt-4">{tab.statLabel}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Block 7: team segmentation grid ------------------------ */
const TEAMS = [
  { role: "CMO", d: "Align brand, paid-media agencies and finance on one number every party accepts.", href: "/for/cmo" },
  { role: "CTO", d: "846-byte pixel, full API, native MCP, BigQuery export. EU-hosted, zero PII stored.", href: "/for/cto" },
  { role: "DPO", d: "GDPR by architecture, DPA + TPSR included, Schrems II clean. No consent layer to defend.", href: "/for/dpo" },
  { role: "Agencies", d: "Multi-client dashboards and reporting on complete data your clients can trust.", href: "/for/agencies" },
];

export function TeamGrid() {
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <div className="max-w-[46ch] mb-14">
          <span className="eyebrow mb-5">Built for the whole team</span>
          <h2 className="h-section mt-5">
            One number <em>every team signs off on.</em>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAMS.map((t) => (
            <article key={t.role} className="bg-warm-white border border-warm-100 rounded-2xl p-7 flex flex-col min-h-[210px]">
              <h3 className="font-mono text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">{t.role}</h3>
              <p className="text-[14.5px] leading-[1.6] text-ink-soft mt-4 flex-1">{t.d}</p>
              <Link href={t.href} className="mt-5 text-[13.5px] font-medium text-brand border-b border-brand/30 hover:border-brand self-start">
                Learn more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Block 8: customer success stories ---------------------- */
const STORIES = [
  { metric: "+30%", label: "more traffic recovered vs GA4", who: "Dreamplace Hotels", d: "Closed a 15–20% sales attribution gap against their CRM." },
  { metric: "+165%", label: "Display Cost-per-Search on DV360", who: "Palladium Hotel Group", d: "Recovered 40% of previously-unattributed traffic." },
  { metric: "−36%", label: "revenue drop diagnosed in one report", who: "European bike retailer", d: "LENS pinpointed premium e-bikes at product level — before Monday standup." },
];

export function SuccessStories() {
  return (
    <section className="py-28 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <div className="max-w-[46ch] mb-14">
          <span className="eyebrow mb-5">Outcomes</span>
          <h2 className="h-section mt-5">
            What teams do <em>with complete data.</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {STORIES.map((s) => (
            <article key={s.who} className="bg-white border border-warm-100 rounded-2xl p-8 flex flex-col min-h-[240px]">
              <div className="font-mono text-[40px] font-semibold text-brand tracking-[-0.03em] leading-none">{s.metric}</div>
              <div className="text-[13.5px] text-ink-soft mt-3 leading-[1.4]">{s.label}</div>
              <div className="mt-auto pt-6 border-t border-warm-100">
                <div className="text-[15px] font-semibold text-ink">{s.who}</div>
                <p className="text-[13.5px] leading-[1.55] text-ink-soft mt-1.5">{s.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Block 9: featured resources grid ----------------------- */
const RESOURCES = [
  { type: "Guide", head: "Cookieless analytics for eCommerce", href: "/cookieless-analytics" },
  { type: "Legal", head: "The consentless route, explained", href: "/consentless-analytics" },
  { type: "Tool", head: "Calculate your data loss", href: "/data-loss-calculator" },
  { type: "Open", head: "How we build, in the open", href: "/open" },
];

export function ResourcesGrid() {
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <h2 className="h-section max-w-[16ch] mb-12">
          Go <em>deeper.</em>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESOURCES.map((r) => (
            <Link key={r.head} href={r.href} className="group bg-warm-white border border-warm-100 rounded-2xl p-7 flex flex-col min-h-[180px] no-underline hover:border-warm-200 transition-colors">
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-mute">{r.type}</span>
              <h3 className="text-[17px] font-semibold text-ink leading-[1.3] mt-4 flex-1">{r.head}</h3>
              <span className="mt-5 text-[13.5px] font-medium text-brand border-b border-brand/30 group-hover:border-brand self-start">
                Read →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
