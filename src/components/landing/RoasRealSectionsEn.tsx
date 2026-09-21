import Link from "next/link";
import { ScopeToggle, RevealBar } from "./RoasRealInteractive";

/* ============================================================
   REAL ROAS · sections (EN)
   Cold paid-traffic landing for eCommerce. noindex/follow — no
   breadcrumbs and no cluster links: the page has one decision to
   make and does not distribute authority.

   Two dark slabs, per the design system: "The machine" and the close.
   Spanish twin lives in RoasRealSections.tsx — keep the two in step.
   ============================================================ */

const AUDIT = "/audit";
const PRICING = "/pricing";
const DOCS_PERF = "https://docs.sealmetrics.com/guides/tracker-performance-three-way";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow mb-5">{children}</span>;
}

/* ---------- HERO ---------- */
export function Hero() {
  return (
    /* The landing header is sticky and takes up flow, and there is no
       announcement bar: no need to offset height like the site pages do. */
    <section className="bg-warm-white pt-14 md:pt-20 pb-20">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink-soft">
          Privacy-by-design analytics · No cookies, no identifiers · Designed for GDPR from the architecture up
        </p>

        <h1 className="h-display mt-5 max-w-[16ch]">
          Your real ROAS is <em>higher than you think.</em>
        </h1>

        <p className="mt-7 max-w-[58ch] text-ink-2 leading-[1.5]" style={{ fontSize: "clamp(17px,1.8vw,21px)" }}>
          In our experience with clients, between 40% and 60% of traffic does not accept cookies, and of those
          who do, 40% do not accept on the first pageview. Their sales happened, you were paid for them, and
          the report you make decisions on does not count them, or files them under the wrong channel. You are switching off campaigns that
          work and you do not know it.
        </p>

        <div className="flex flex-wrap gap-3 items-center mt-9">
          <Link
            href={AUDIT}
            className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-white rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
          >
            Request your free audit <span aria-hidden="true">→</span>
          </Link>
          <a
            href="#machine"
            className="inline-flex items-center gap-2 px-7 py-4 border border-warm-200 text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 transition-colors"
          >
            See the specifications
          </a>
        </div>

        <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.06em] text-ink-soft">
          Nothing to install · No commitment
        </p>

        <ScopeToggle locale="en" />
      </div>
    </section>
  );
}

/* ---------- 01 · THE SYMPTOM ---------- */
const SYMPTOMS = [
  {
    q: "“We have far too much direct. It is direct traffic that should not be direct.”",
    a: "There is no mystery channel bringing in half your business. There is a cookie banner standing in front of your measurement.",
  },
  {
    q: "“We know Meta contributes more than we can see, but we do not have the data.”",
    a: "Discovery channels look worst, because they sit furthest from the final click that does get measured.",
  },
  {
    q: "“We want to test a new channel, but we would not know whether it worked.”",
    a: "A test you cannot measure is a test you will cancel for the wrong reasons.",
  },
];

export function Symptoms() {
  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>01 · The symptom</Eyebrow>
        <h2 className="h-section mt-5 max-w-[22ch]">These are your words, not our claims.</h2>

        <div className="grid md:grid-cols-3 gap-px bg-warm-100 border border-warm-100 rounded-xl overflow-hidden mt-12">
          {SYMPTOMS.map((s) => (
            <div key={s.q} className="bg-white p-8">
              <p className="text-[17px] leading-[1.45] font-medium text-ink">{s.q}</p>
              <p className="mt-4 text-[15px] leading-[1.55] text-ink-soft">{s.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 02 · THE ARITHMETIC ---------- */
export function RoasMath() {
  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>02 · What changes the number</Eyebrow>
        <h2 className="h-section mt-5 max-w-[20ch]">
          You were not underperforming. <em>You were undermeasuring.</em>
        </h2>

        <div className="mt-12 border border-warm-100 rounded-2xl bg-warm-white overflow-hidden">
          <p className="px-8 py-4 border-b border-warm-100 font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-soft">
            Same campaign · same spend · same month
          </p>

          <div className="grid md:grid-cols-[240px_1fr_130px] gap-4 md:gap-7 items-center px-8 py-8 border-b border-warm-100">
            <span className="text-[17px] leading-[1.3] text-ink">
              The ROAS you see today
              <small className="block mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Consent-based analytics
              </small>
            </span>
            <RevealBar pct={58} tone="muted" />
            <span className="text-[40px] font-semibold tracking-[-0.035em] leading-none text-ink-soft md:text-right">
              2.4×
            </span>
          </div>

          <div className="grid md:grid-cols-[240px_1fr_130px] gap-4 md:gap-7 items-center px-8 py-8 border-b border-warm-100">
            <span className="text-[17px] leading-[1.3] text-ink">
              Your real ROAS
              <small className="block mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                No consent loss on sales
              </small>
            </span>
            <RevealBar pct={100} tone="us" delay={170} />
            <span className="text-[40px] font-semibold tracking-[-0.035em] leading-none text-brand md:text-right">
              4.1×
            </span>
          </div>

          <div className="px-8 py-7 bg-ink section-dark">
            <p
              className="font-semibold text-white leading-[1.25] tracking-[-0.015em] max-w-[44ch]"
              style={{ fontSize: "clamp(18px,2.2vw,24px)" }}
            >
              The budget you were about to cut was your best-converting channel.
            </p>
            <p className="mt-3 text-[15px] text-dark-text-secondary leading-[1.55] max-w-[60ch]">
              Counting conversions without consent loss means the channels that work stop hiding inside &ldquo;direct&rdquo; and
              inside traffic that never consented.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 03 · WHY IT HAPPENS ---------- */
const STEPS = [
  {
    n: "The requirement",
    t: "Every journey needs permission",
    d: "Reconstructing a customer journey requires identifying a user over time. Cookies, fingerprinting, server logs: the method does not matter. Even anonymised, it requires consent.",
  },
  {
    n: "The gap",
    t: "In our experience, 40–60% do not give it",
    d: (
      <>
        In our experience with clients, between 40% and 60% of traffic doesn&rsquo;t accept cookies, and of those who do,
        40% don&rsquo;t accept on the first pageview &mdash; the one that carries the ad click. At{" "}
        <Link href="/case-studies/incapto/" className="underline underline-offset-2">
          Incapto
        </Link>{" "}
        (Shopify, Consent Mode), paid campaigns were 50% of measured traffic in GA4 and 62% in Sealmetrics: 12 points on
        the one line that decides media budget. How much depends on the store and the channel.
      </>
    ),
  },
  {
    n: "The bias",
    t: "And what remains is not a sample",
    d: "People who accept cookies do not behave like people who reject them. You are not measuring half your business: you are measuring one specific half and deciding as if it were the whole.",
  },
];

export function Mechanism() {
  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>03 · Why it happens</Eyebrow>
        <h2 className="h-section mt-5 max-w-[20ch]">Attribution in Europe is broken by design.</h2>

        <div className="grid md:grid-cols-3 gap-9 mt-12">
          {STEPS.map((s) => (
            <div key={s.n}>
              <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-brand pb-3 border-b border-warm-200 mb-5">
                {s.n}
              </p>
              <h3 className="text-[19px] font-semibold text-ink tracking-[-0.015em] leading-[1.25]">{s.t}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.6] text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 · WHAT WE DO DIFFERENTLY ---------- */
export function WhatWeDo() {
  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16 items-start">
        <div>
          <Eyebrow>04 · What we do differently</Eyebrow>
          <h2 className="h-section mt-5">
            We do not ask permission because <em>we do not track anyone.</em>
          </h2>
        </div>
        <div>
          <p className="text-ink-2 leading-[1.5] max-w-[58ch]" style={{ fontSize: "clamp(17px,1.6vw,20px)" }}>
            Sealmetrics does not reconstruct journeys. It records aggregate hits that are unconnected to each
            other, with no user identifier, no cookies and no profiling. Since nobody is identifiable now or
            later, no consent is needed to measure.
          </p>
          <p className="mt-5 text-[16px] leading-[1.6] text-ink-soft">
            The pixel fires before the banner and measures{" "}
            <strong className="text-ink font-semibold">your sessions, sales and events without depending on consent</strong>. Real
            data: we do not model and we do not sample, because consent rejection leaves no gap to fill with statistics.
          </p>
          <p className="mt-5 text-[16px] leading-[1.6] text-ink-soft">
            The shift in mindset is this: you stop analysing{" "}
            <strong className="text-ink font-semibold">people</strong> and start analysing{" "}
            <strong className="text-ink font-semibold">products and campaigns</strong>. Which product gets
            viewed, added to cart, entered into checkout and bought — by channel, campaign, keyword, landing
            page and any property you choose to tag.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 05 · THE PROOF ---------- */
export function Proof() {
  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>05 · The proof</Eyebrow>
        <h2 className="h-section mt-5 max-w-[24ch]">What surfaced when they stopped measuring half of it.</h2>

        <div className="grid md:grid-cols-2 gap-px bg-warm-100 border border-warm-100 rounded-xl overflow-hidden mt-12">
          <article className="bg-white p-9">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-soft">
              Palladium Hotel Group
            </p>
            <div className="mt-7 grid gap-6">
              <div>
                <span className="block text-[46px] font-semibold leading-[0.95] tracking-[-0.04em] text-brand">
                  40%
                </span>
                <span className="block mt-2 text-[15px] leading-[1.4] text-ink-2 max-w-[34ch]">
                  of traffic that had no attribution, recovered
                </span>
              </div>
              <div>
                <span className="block text-[46px] font-semibold leading-[0.95] tracking-[-0.04em] text-brand">
                  +165%
                </span>
                <span className="block mt-2 text-[15px] leading-[1.4] text-ink-2 max-w-[34ch]">
                  Display CPS over DV360 after changing the measurement model
                </span>
              </div>
            </div>
            <blockquote className="mt-8 pt-6 border-t border-dashed border-warm-200 text-[18px] font-semibold leading-[1.35] tracking-[-0.015em] text-ink border-l-2 border-l-quote pl-4">
              The data Sealmetrics delivers is agnostic, impartial and neutral. There is no black box.
            </blockquote>
            <p className="mt-3 font-mono text-[11.5px] tracking-[0.06em] text-ink-soft">
              Toni Andújar · Digital &amp; Direct Sales Director
            </p>
          </article>

          <article className="bg-white p-9">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-soft">
              Dreamplace Hotels
            </p>
            <div className="mt-7 grid gap-6">
              <div>
                <span className="block text-[46px] font-semibold leading-[0.95] tracking-[-0.04em] text-brand">
                  +30%
                </span>
                <span className="block mt-2 text-[15px] leading-[1.4] text-ink-2 max-w-[34ch]">
                  more traffic measured than with Google Analytics
                </span>
              </div>
              <div>
                <span className="block text-[46px] font-semibold leading-[0.95] tracking-[-0.04em] text-brand">
                  15–20%
                </span>
                <span className="block mt-2 text-[15px] leading-[1.4] text-ink-2 max-w-[34ch]">
                  more sales attributed, reconciled against their CRM
                </span>
              </div>
            </div>
            <p className="mt-8 pt-6 border-t border-dashed border-warm-200 text-[15.5px] leading-[1.6] text-ink-soft">
              The case that convinces the finance director: the number in the marketing tool and the number in
              the CRM stopped contradicting each other.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- 06 · PRIVACY BY DESIGN ---------- */
const PBD = [
  {
    k: "Cookies written",
    v: "0",
    t: "We write nothing to the browser",
    d: "Neither first nor third party. No localStorage, no sessionStorage, no storage of any kind on the visitor's device.",
  },
  {
    k: "Identifiers",
    v: "0",
    t: "There is no user column",
    d: "No user ID, no client ID, no anonymous pseudonym. Two visits from the same browser are not recognisable as such, now or in two years.",
  },
  {
    k: "Fingerprint signals",
    v: "0",
    t: "We derive no identity from the device",
    d: "No canvas, no installed fonts, no header combinations. Fingerprinting is explicitly ruled out, not merely unused.",
  },
  {
    k: "Cross-site joins",
    v: "0",
    t: "What is yours stays yours",
    d: "Nothing we collect on your site is joined with any other. Your data does not feed an advertising graph because we do not have one.",
  },
  {
    k: "Data region",
    v: "Dublin",
    t: "Analytics data never leaves Ireland",
    d: "Hosting, database and backups in Dublin. No international transfers depending on an adequacy framework that is currently under political and judicial dispute.",
  },
  {
    k: "Public documents",
    v: "4",
    t: "Verifiable, not declarative",
    d: "CNIL self-assessment, UK PECR self-assessment, subprocessor list and data subject rights procedure. Auditable without asking us.",
  },
];

const COMPLIANCE_LINKS = [
  { label: "CNIL self-assessment", href: "https://docs.sealmetrics.com/compliance/cnil-self-assessment" },
  { label: "UK PECR", href: "https://docs.sealmetrics.com/compliance/uk-pecr-self-assessment" },
  { label: "Subprocessors", href: "https://docs.sealmetrics.com/compliance/subprocessors" },
  { label: "Data subject rights", href: "https://docs.sealmetrics.com/compliance/data-subject-rights" },
];

export function PrivacyByDesign() {
  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>06 · Privacy by design</Eyebrow>
        <h2 className="h-section mt-5 max-w-[26ch]">
          Privacy is not our policy. It is our <em>architecture.</em>
        </h2>
        <p className="mt-6 max-w-[64ch] text-ink-2 leading-[1.55]" style={{ fontSize: "clamp(16px,1.5vw,19px)" }}>
          Almost every tool is privacy by policy: it collects the personal data and then promises to behave
          well with it. We never collect it. The data you would need in order to breach someone&rsquo;s privacy
          does not exist in our database, so there is nothing to promise, nothing to anonymise afterwards and
          nothing to leak.
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-warm-100 border border-warm-100 rounded-xl overflow-hidden mt-12">
          {PBD.map((p) => (
            <div key={p.k} className="bg-white p-8">
              <span className="inline-flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft border border-warm-200 rounded-full px-3 py-1.5">
                {p.k}
                <b className="text-brand font-semibold text-[15px] tracking-[-0.02em]">{p.v}</b>
              </span>
              <h3 className="mt-3.5 text-[19px] font-semibold text-ink tracking-[-0.015em] leading-[1.25]">
                {p.t}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-ink-soft">{p.d}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2.5 mt-9">
          {COMPLIANCE_LINKS.map((c) => (
            <a
              key={c.href}
              href={c.href}
              /* New tab: this is documentary evidence, not a funnel step. Let a
                 DPO read it without pulling the visitor off the landing. */
              target="_blank"
              rel="noopener"
              className="font-mono text-[12px] tracking-[0.06em] px-4 py-2 border border-warm-200 rounded-full text-ink-2 no-underline hover:border-brand hover:text-brand transition-colors"
            >
              {c.label}
            </a>
          ))}
        </div>

        <p className="mt-8 max-w-[60ch] text-[15px] leading-[1.6] text-ink-soft">
          Our architecture has passed the legal audits of Acciona, 3Cat, UNICEF and Desigual.
        </p>
      </div>
    </section>
  );
}

/* ---------- 07 · THE TRADE-OFF ---------- */
const TRADE_NO = [
  "Multi-touch attribution models. Without visitor identifiers, the only possible model is last-click.",
  "Individual customer journeys or session sequences.",
  "Audience building for activation on ad platforms.",
  "User cohorts, individual retention or per-person LTV.",
];

const TRADE_YES = [
  "Sessions, events and sales with no consent loss. With no banner in the way.",
  "Channel, campaign, medium, keyword, content and referrer across that same data.",
  "The complete aggregate funnel: visit → product viewed → cart → checkout → purchase.",
  "Product-level data: size, colour, brand, category, price range, SKU.",
  "All on fresh data: hits usually reach your reports in under two minutes, with no sampling.",
];

export function Tradeoff() {
  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>07 · The trade-off</Eyebrow>
        <h2 className="h-section mt-5 max-w-[24ch]">
          We tell you what you lose <em>before you find out yourself.</em>
        </h2>
        <p className="mt-6 max-w-[60ch] text-ink-2 leading-[1.55]" style={{ fontSize: "clamp(16px,1.5vw,19px)" }}>
          Measuring without cookies or identifiers has a price and we do not hide it in the small print. If what you need is
          in the left-hand column, we are not your tool and we will tell you so on the first call.
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-warm-100 border border-warm-100 rounded-xl overflow-hidden mt-12">
          <div className="bg-white p-9">
            <h3 className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-red-alert mb-5">
              What you will not get
            </h3>
            <ul className="list-none">
              {TRADE_NO.map((li, i) => (
                <li
                  key={li}
                  className={`relative pl-7 py-3.5 text-[15.5px] leading-[1.5] text-ink-2 ${
                    i < TRADE_NO.length - 1 ? "border-b border-dashed border-warm-200" : ""
                  }`}
                >
                  <span className="absolute left-0 top-3.5 font-mono text-red-alert" aria-hidden="true">
                    —
                  </span>
                  {li}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-9">
            <h3 className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-brand mb-5">
              What you will get
            </h3>
            <ul className="list-none">
              {TRADE_YES.map((li, i) => (
                <li
                  key={li}
                  className={`relative pl-7 py-3.5 text-[15.5px] leading-[1.5] text-ink-2 ${
                    i < TRADE_YES.length - 1 ? "border-b border-dashed border-warm-200" : ""
                  }`}
                >
                  <span className="absolute left-0 top-3.5 font-mono text-brand" aria-hidden="true">
                    +
                  </span>
                  {li}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 08 · THE MACHINE · DARK SLAB 1 ---------- */
type GaugeRow = { label: string; pct: number; value: string; us?: boolean };

const GAUGES: { title: string; rows: GaugeRow[]; note: React.ReactNode }[] = [
  {
    title: "Weight transferred over the network · gzip",
    rows: [
      { label: "Sealmetrics", pct: 0.65, value: "1.1 KB", us: true },
      { label: "GA4", pct: 85.6, value: "~146 KB" },
      { label: "Adobe", pct: 100, value: "~170 KB" },
    ],
    note: (
      <>
        <b className="text-white font-mono font-semibold">132×</b> lighter than GA4 and <b className="text-white font-mono font-semibold">155×</b> than Adobe. The tracker fits in{" "}
        <b className="text-white font-mono font-semibold">a single TCP packet</b> and arrives on the first
        round trip. The other two need 4 or 5 round trips just to download.
      </>
    ),
  },
  {
    title: "JavaScript the device has to parse · uncompressed",
    rows: [
      { label: "Sealmetrics", pct: 0.27, value: "2.0 KB", us: true },
      { label: "GA4", pct: 56.1, value: "~409 KB" },
      { label: "Adobe", pct: 100, value: "~730 KB" },
    ],
    note: (
      <>
        <b className="text-white font-mono font-semibold">Parsing has no CDN.</b> Google and Adobe serve from
        excellent edges, but half a megabyte of JavaScript is parsed on the visitor&rsquo;s phone. On a low-end
        handset that is 0.8 to 1.5 s of CPU before any hit can fire.
      </>
    ),
  },
  {
    title: "Time until the hit leaves the device · fibre, installed in head",
    rows: [
      { label: "Sealmetrics", pct: 10, value: "0.1–0.3 s", us: true },
      { label: "GA4", pct: 23, value: "0.5–0.7 s" },
      { label: "Adobe", pct: 100, value: "~3.0 s" },
    ],
    note: (
      <>
        And these are their best figures:{" "}
        <b className="text-white font-mono font-semibold">they exclude waiting for the banner</b>. That window
        between load and hit is exactly where a visitor who leaves becomes invisible traffic.
      </>
    ),
  },
];

const TABLE_ROWS = [
  ["Hit transport", "sendBeacon · survives page close", "Beacon type", "Image GET · cancelled on exit"],
  ["Consent in the EU", "No cookies or identifiers · banner depends on your setup", "Yes · Consent Mode models the gap", "Yes in most installations"],
  ["Traffic measured in parallel", "Baseline", "25–45% less (our client sample)", "25% less (30 days dual-tagged, field)"],
];

const SPECS = [
  {
    h: "Speed",
    items: [
      { v: "1.1 KB", l: "A single TCP packet. No dependencies, no tag manager required." },
      { v: "Fresh data", l: "Not in one report: across the whole platform. Hits usually reach your reports in under two minutes." },
      { v: "Black Friday too", l: "No sampling, and the SLA guarantees the day is complete before 6 AM. You adjust during the campaign, not the week after." },
    ],
  },
  {
    h: "Data truth",
    items: [
      { v: "No consent loss", l: "No cookies, no identifiers: nothing for the visitor to reject." },
      { v: "Zero modelling", l: "No modelling. No sampling. No estimates. If it is in the report, it happened." },
      { v: "+25% vs Adobe or GA4", l: "Measured in the field, 30 days dual-tagged on the same site." },
    ],
  },
  {
    h: "Depth",
    items: [
      { v: "The whole funnel", l: "View product, add to cart, begin checkout, purchase. And whatever event you can think of." },
      { v: "Any property", l: "Size, model, brand, category, colour, weight, price range. Whatever exists in your business." },
      { v: "From data to why", l: "A product that gets viewed, added and not bought: that is not a metric, it is a diagnosis." },
    ],
  },
  {
    h: "Output",
    items: [
      { v: "Robust API", l: "Everything you see in the interface is available over the API. No exceptions." },
      { v: "BigQuery · Data Studio", l: "Native connector. Pick the account and it syncs." },
      { v: "MCP + LENS", l: "Connect your data to Claude, ChatGPT or Cursor. Or use LENS, our private AI, and keep the data here." },
    ],
  },
];

export function Machine() {
  return (
    <section id="machine" className="py-24 bg-ink section-dark scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-amber">08 · The machine</span>
        <h2 className="h-section mt-5 max-w-[22ch]">
          It is not another analytics tool. It is <em>different engineering.</em>
        </h2>
        <p className="mt-6 max-w-[62ch] text-dark-text-secondary leading-[1.55]" style={{ fontSize: "clamp(16px,1.5vw,19px)" }}>
          Sealmetrics against GA4&rsquo;s <span className="font-mono text-dark-text">gtag.js</span> and against
          the Adobe Launch + AppMeasurement chain. Same reference sites, same methodology, July 2026.
        </p>

        {GAUGES.map((g) => (
          <div key={g.title} className="mt-9 border border-dark-border rounded-xl p-7 sm:p-8">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-dark-text-tertiary mb-6">
              {g.title}
            </p>
            {g.rows.map((r, i) => (
              <div
                key={r.label}
                className="grid grid-cols-[96px_1fr] md:grid-cols-[130px_1fr_130px] gap-3 md:gap-4 items-center mb-3.5 last:mb-0"
              >
                <span className="font-mono text-[13px] tracking-[0.04em] text-dark-text">{r.label}</span>
                <RevealBar pct={r.pct} tone={r.us ? "us" : "them"} delay={i * 170} dark />
                <span
                  className={`font-mono font-semibold text-[15px] tracking-[-0.02em] tabular-nums col-start-2 md:col-start-3 md:text-right ${
                    r.us ? "text-brand" : "text-dark-text"
                  }`}
                >
                  {r.value}
                </span>
              </div>
            ))}
            <p className="mt-5 pt-4 border-t border-dashed border-dark-border text-[14.5px] leading-[1.6] text-dark-text-secondary">
              {g.note}
            </p>
          </div>
        ))}

        <div className="mt-9 overflow-x-auto">
          <table className="w-full border-collapse text-[14.5px] min-w-[680px]">
            <thead>
              <tr>
                <th className="text-left p-4 border-b border-dark-border font-mono text-[11px] uppercase tracking-[0.12em] text-dark-text-tertiary font-medium" />
                <th className="text-left p-4 border-b border-dark-border font-mono text-[11px] uppercase tracking-[0.12em] text-brand font-medium">
                  Sealmetrics
                </th>
                <th className="text-left p-4 border-b border-dark-border font-mono text-[11px] uppercase tracking-[0.12em] text-dark-text-tertiary font-medium">
                  GA4
                </th>
                <th className="text-left p-4 border-b border-dark-border font-mono text-[11px] uppercase tracking-[0.12em] text-dark-text-tertiary font-medium">
                  Adobe Analytics
                </th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row) => (
                <tr key={row[0]}>
                  <td className="p-4 border-b border-dark-border align-top text-dark-text-tertiary">{row[0]}</td>
                  <td className="p-4 border-b border-dark-border align-top text-white font-medium">{row[1]}</td>
                  <td className="p-4 border-b border-dark-border align-top text-dark-text-secondary">{row[2]}</td>
                  <td className="p-4 border-b border-dark-border align-top text-dark-text-secondary">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-[14.5px] leading-[1.6] text-dark-text-secondary max-w-[80ch]">
          The Adobe figure is the strongest evidence: same site, same visits, pageviews against pageviews, a
          full month, and a constant 25% difference — the signature of a structural cause, not an incident.{" "}
          <a
            href={DOCS_PERF}
            target="_blank"
            rel="noopener"
            className="text-white underline underline-offset-[3px] decoration-brand hover:decoration-white"
          >
            Full methodology and limitations →
          </a>
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-border border border-dark-border rounded-xl overflow-hidden mt-12">
          {SPECS.map((col) => (
            <div key={col.h} className="bg-ink">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand px-6 pt-6 pb-4">
                {col.h}
              </h3>
              {col.items.map((it) => (
                <div key={it.v} className="px-6 py-5 border-t border-dashed border-dark-border">
                  <p className="text-[19px] font-semibold tracking-[-0.02em] leading-[1.15] text-white">
                    {it.v}
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.5] text-dark-text-secondary">{it.l}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-16 pt-11 border-t border-dark-border text-center">
          <p
            className="font-semibold tracking-[-0.02em] leading-[1.12] text-white max-w-[24ch] mx-auto"
            style={{ fontSize: "clamp(28px,3.6vw,44px)" }}
          >
            From data to <span className="text-amber">why</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 09 · IMPLEMENTATION ---------- */
function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="font-mono text-[12.5px] leading-[1.75] bg-ink text-dark-text-secondary p-5 rounded-lg border-l-[3px] border-brand overflow-x-auto whitespace-pre">
      {children}
    </pre>
  );
}

const CM = "text-dark-text-tertiary";
const VAL = "text-amber";

export function Implementation() {
  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16 items-start">
        <div>
          <Eyebrow>09 · The implementation</Eyebrow>
          <h2 className="h-section mt-5">
            One line to measure. One to sell. <em>Or none at all.</em>
          </h2>
          <p className="mt-6 max-w-[52ch] text-ink-2 leading-[1.55]" style={{ fontSize: "clamp(16px,1.5vw,19px)" }}>
            In the head, or with the Shopify, Magento or PrestaShop plugin. Your current UTMs work as they are:
            you do not have to retag anything.
          </p>
          <p className="mt-5 text-[15.5px] leading-[1.6] text-ink-soft">
            The first block measures pageviews and entry channel. The second records the sale with everything
            you want to know about it: amount, currency, payment method and the full product line. That second
            block is what turns analytics into campaign decisions.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.6] text-ink-soft">
            You can add and remove events mid-season: since there is no journey trail, there is nothing to
            break.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-2.5">
            1 · Measurement pixel
          </p>
          <CodeBlock>
            <span className={CM}>{"<!-- Sealmetrics Analytics -->"}</span>
            {"\n"}
            {"<script src=\""}
            <span className={VAL}>https://t.sealmetrics.com/t.js?id=YOUR_ACCOUNT_ID</span>
            {"\" "}
            <span className="text-white">defer</span>
            {"></script>"}
          </CodeBlock>

          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-2.5 mt-7">
            2 · Conversion pixel
          </p>
          <CodeBlock>
            <span className="text-white">sealmetrics</span>
            {".conv("}
            <span className={VAL}>{"'purchase'"}</span>
            {", "}
            <span className={VAL}>149.99</span>
            {", {\n  currency: "}
            <span className={VAL}>{"'EUR'"}</span>
            {",\n  payment_method: "}
            <span className={VAL}>{"'credit_card'"}</span>
            {",\n  items: [\n    { product_name: "}
            <span className={VAL}>{"'Product A'"}</span>
            {", price: "}
            <span className={VAL}>{"'19.99'"}</span>
            {", quantity: "}
            <span className={VAL}>{"'2'"}</span>
            {",\n      category: "}
            <span className={VAL}>{"'Sneakers'"}</span>
            {", brand: "}
            <span className={VAL}>{"'Brand'"}</span>
            {" },\n    { product_name: "}
            <span className={VAL}>{"'Product B'"}</span>
            {", price: "}
            <span className={VAL}>{"'29.99'"}</span>
            {", quantity: "}
            <span className={VAL}>{"'1'"}</span>
            {",\n      category: "}
            <span className={VAL}>{"'Accessories'"}</span>
            {", brand: "}
            <span className={VAL}>{"'Brand'"}</span>
            {" }\n  ]\n})"}
          </CodeBlock>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-ink-soft">
            Every key you add to the object becomes a dimension you can cross against channel and campaign.
            Brand, colour, size, price range: whatever exists in your catalogue. No order IDs and no customer
            IDs — the pixel does not accept personal data by design.
          </p>

          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-2.5 mt-7">
            3 · Or not even that: a prompt
          </p>
          <CodeBlock>
            {"Connect Claude to the Sealmetrics MCP. Server:\n"}
            <span className={VAL}>https://mcp.sealmetrics.com/mcp</span>
            {"\nThen create my account, generate the pixels I\nneed and build the reports in real time."}
          </CodeBlock>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-ink-soft">
            Paste it into Claude, ChatGPT, Cursor, Codex, Copilot, Windsurf or any MCP client. It creates the
            account, generates pixels tailored to the events and properties you need, and leaves the reports
            built. No signup form and no sales call.
          </p>

          <p className="mt-6 font-mono text-[11.5px] uppercase tracking-[0.06em] text-ink-soft">
            1.1 KB · DEFER · SENDBEACON · NO COOKIES · NO IDENTIFIERS
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 10 · USE CASES ---------- */
const USES = [
  {
    t: "You split spend on complete data",
    d: "One client saw TikTok Ads as almost flat in GA4. With data free of consent gaps, the real sales appeared along with a discovery weighting far above what was reported. Spend moved accordingly.",
  },
  {
    t: "You optimise campaigns by product",
    d: "This Shopping campaign sells headphones and does not sell jackets. Exclude the second, raise bids on the first. The data sits at the level of whichever property you tagged, not just the channel.",
  },
  {
    t: "You find the money that is stuck",
    d: "Products viewed a lot, added to cart and never bought: that is a price problem or a product-page problem. It only surfaces when the funnel is complete.",
  },
  {
    t: "You ask LENS",
    d: "“Where am I burning budget?” — “DemandGen: 9,230 clicks, 2 sales. Pausing it and moving spend to PMax_Catalog recovers it.” An answer, not the report you have to go find it in.",
  },
];

export function UseCases() {
  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>10 · What you do with this on a Tuesday afternoon</Eyebrow>
        <h2 className="h-section mt-5 max-w-[24ch]">
          Decisions, <em>not reports.</em>
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-warm-100 border border-warm-100 rounded-xl overflow-hidden mt-12">
          {USES.map((u) => (
            <div key={u.t} className="bg-white p-8">
              <h3 className="text-[19px] font-semibold text-ink tracking-[-0.015em] leading-[1.25]">{u.t}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.6] text-ink-soft">{u.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 11 · PRICE AND DOORS ---------- */
export function PriceDoors() {
  return (
    <section id="start" className="py-24 bg-white border-t border-warm-100 scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>11 · The price</Eyebrow>
        <h2 className="h-section mt-5 max-w-[24ch]">
          Enterprise-grade data without the <em>enterprise-grade contract.</em>
        </h2>

        <div className="border border-warm-100 rounded-2xl bg-warm-white p-8 sm:p-10 mt-12">
          <div className="flex flex-wrap items-baseline gap-4 py-4 border-b border-dashed border-warm-200">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft min-w-[250px]">
              Up to 5M events / month
            </span>
            <span className="text-[24px] font-semibold tracking-[-0.02em] text-ink">€499 per month</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-4 py-4">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft min-w-[250px]">
              Up to 15M events / month
            </span>
            <span className="text-[24px] font-semibold tracking-[-0.02em] text-ink">€899 per month</span>
          </div>

          <p className="mt-6 text-[15px] leading-[1.6] text-ink-soft">
            Annual contract. We only count the events you tag, so your GA4 figure is not comparable: you will
            start well below it. Seasonal peaks carry no penalty.
          </p>
          <p className="mt-5 pt-5 border-t border-dashed border-warm-200 text-[15px] leading-[1.6] text-ink-2">
            For context:{" "}
            <strong className="font-semibold text-ink">
              GA360 is quote-based from around $50,000 a year. Adobe Analytics from around $50,000.
            </strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-warm-100 border border-warm-100 rounded-xl overflow-hidden mt-9">
          <div className="bg-white p-9">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft block mb-3.5">
              Door 1 · We set it up with you
            </span>
            <h3 className="text-[22px] font-semibold text-ink tracking-[-0.02em] leading-[1.2]">
              Free audit of your measurement
            </h3>
            <p className="mt-3 mb-6 text-[15px] leading-[1.6] text-ink-soft">
              We tell you how much traffic and how many sales you are losing today, using your own data. We
              review your measurement plan and our technical team talks to yours if needed.
            </p>
            <Link
              href={AUDIT}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-white rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
            >
              Request your free audit <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="bg-white p-9">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft block mb-3.5">
              Door 2 · You set it up yourself
            </span>
            <h3 className="text-[22px] font-semibold text-ink tracking-[-0.02em] leading-[1.2]">
              1 million events free
            </h3>
            <p className="mt-3 mb-6 text-[15px] leading-[1.6] text-ink-soft">
              No credit card and no form. One prompt in your assistant creates the account, generates the
              pixels and builds the reports. Once you pass the million, the Growth plan activates.
            </p>
            <Link
              href={PRICING}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-warm-200 text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 transition-colors"
            >
              Start free <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 12 · CLOSE · DARK SLAB 2 ---------- */
const CHECKS = [
  "Look at your direct traffic percentage.",
  "Look at your unassigned percentage.",
  "Look at your sales attributed to Meta.",
];

export function Close() {
  return (
    <section className="py-28 md:py-32 bg-ink section-dark text-center">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-amber">12</span>

        <ul className="list-none max-w-[34ch] mx-auto mt-10 mb-10 text-left">
          {CHECKS.map((c, i) => (
            <li
              key={c}
              className={`relative pl-11 py-4 font-semibold tracking-[-0.02em] leading-[1.25] text-white ${
                i < CHECKS.length - 1 ? "border-b border-dashed border-dark-border" : ""
              }`}
              style={{ fontSize: "clamp(19px,2.6vw,28px)" }}
            >
              <span className="absolute left-0 top-[1.15em] font-mono text-[15px] text-amber" aria-hidden="true">
                →
              </span>
              {c}
            </li>
          ))}
        </ul>

        <p
          className="font-semibold tracking-[-0.03em] leading-[1.05] text-white max-w-[20ch] mx-auto mb-10"
          style={{ fontSize: "clamp(30px,4.6vw,54px)" }}
        >
          Do you trust that data?
          <br />
          <span className="text-amber">For how much longer?</span>
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={AUDIT}
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-brand hover:text-ink transition-colors"
          >
            Request your free audit <span aria-hidden="true">→</span>
          </Link>
          <Link
            href={PRICING}
            className="inline-flex items-center gap-2 px-7 py-4 border border-dark-border text-white rounded-md text-[15px] font-semibold no-underline hover:bg-white hover:text-ink transition-colors"
          >
            Start free · 1M events
          </Link>
        </div>
      </div>
    </section>
  );
}
