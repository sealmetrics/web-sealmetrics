import Link from "next/link";
import { DualCTA } from "@/components/homepage/DualCTA";
import { HeroDashboard } from "@/components/sections/v3/HeroDashboard";

/* ============================================================
   Homepage sections — benefit-first informational home that sells in
   one page. Flow: what we do + benefit (hero) → who trusts us (logos)
   → complete data = real ROAS → real-time → LENS AI → proof → install
   → pricing. Rendered by src/app/(en)/page.tsx.
   ============================================================ */

/* --- Hero --------------------------------------------------- */
export function HeroD() {
  return (
    <section data-hero className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-0">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center pb-16">
        <div className="inline-flex items-center gap-3 bg-white border border-warm-100 rounded-full px-4 py-1.5 text-[13px] text-ink-2 mb-10">
          <span className="bg-warm-100 text-ink px-2.5 py-1 rounded text-[10px] font-semibold font-mono tracking-[0.08em] uppercase">
            eCommerce analytics
          </span>
          <span className="text-ink-soft">
            Cookieless · GDPR by architecture · EU-hosted in Dublin
          </span>
        </div>

        <h1 className="h-display mx-auto">
          See the sales consent hides — <em className="italic-accent">the revenue GA4 can&rsquo;t.</em>
        </h1>

        <p
          className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]"
          style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
        >
          Sealmetrics is cookieless analytics for eCommerce. Measure every visit and every sale — no
          cookies, no consent banner, no 40–60% blind spot — so your real ROAS, your channel
          decisions and your board numbers finally match what actually happened.
        </p>

        <DualCTA locale="en" className="justify-center mt-7" />

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
          {["No consent-driven data loss", "No cookies · no consent banner", "GDPR by architecture", "Numbers that match Shopify"].map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <HeroDashboard />
      </div>
    </section>
  );
}

/* --- Consentless Analytics (data foundation → Real ROAS) ---- */
export function ConsentlessAnalytics() {
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-center">
        <div>
          <span className="eyebrow mb-5">Consentless Analytics</span>
          <h2 className="h-section mt-5">
            Privacy-first analytics, the complete data behind your <em>real ROAS.</em>
          </h2>
          <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft max-w-[56ch]">
            <Link href="/consentless-analytics" className="text-brand font-medium border-b border-brand/30 hover:border-brand">
              Consentless analytics
            </Link>{" "}
            measures your sales without depending on a consent banner — legally.{" "}
            <Link href="/security" className="text-brand font-medium border-b border-brand/30 hover:border-brand">
              GDPR by architecture
            </Link>
            , privacy-first everywhere you sell, zero personal data stored. No cookies, no consent
            wall, no 40–60% blind spot.
          </p>
          <p className="mt-4 text-[17px] leading-[1.6] text-ink-soft max-w-[56ch]">
            That&rsquo;s why your ROAS is finally <b className="text-ink font-semibold">real</b>: every
            conversion counted, so the channels that actually work stop hiding inside
            &ldquo;direct&rdquo; and unconsented traffic.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
            {["GDPR by architecture", "ePrivacy", "Privacy-first worldwide", "Zero personal data"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Real ROAS panel */}
        <div className="bg-warm-white border border-warm-100 rounded-2xl p-8 md:p-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-6">
            Same campaign · same spend
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-baseline justify-between gap-4 pb-5 border-b border-warm-100">
              <span className="text-[14px] text-ink-soft leading-[1.4]">
                ROAS you see today<br />
                <span className="text-[12px] text-ink-mute">consent-gated analytics</span>
              </span>
              <span className="font-mono text-[30px] font-semibold text-ink-mute tracking-[-0.02em]">2.4×</span>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[14px] text-ink leading-[1.4] font-medium">
                Real ROAS<br />
                <span className="text-[12px] text-brand font-mono">No consent loss on sales</span>
              </span>
              <span className="font-mono text-[40px] font-semibold text-brand tracking-[-0.03em]">4.1×</span>
            </div>
          </div>
          <div className="mt-7 pt-6 border-t border-warm-100 text-[13px] leading-[1.55] text-ink-soft">
            You weren&rsquo;t under-performing — you were under-measuring. The budget you&rsquo;d have
            cut was your best-converting channel.
          </div>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-mute">
            Illustrative scenario — your real gap depends on your consent rate. Measure it on your own traffic.
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Message 2: Real-time Promo Days ------------------------ */
export function PromoDaysRealTime() {
  return (
    <section className="py-28 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-center">
        <div>
          <span className="eyebrow mb-5">Real time</span>
          <h2 className="h-section mt-5">
            Know how your Promo Days are going <em>while they happen.</em>
          </h2>
          <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft max-w-[56ch]">
            Launch a campaign at 9 AM and see what it&rsquo;s actually doing by noon. When a Promo
            Day underperforms, you fix it the same afternoon — not tomorrow morning, when the budget
            is already spent and the day is gone.
          </p>
          <ul className="mt-7 flex flex-col gap-3 text-[15.5px] leading-[1.5] text-ink-2">
            <li className="flex gap-3">
              <span className="text-brand font-semibold shrink-0">—</span>
              Every dashboard live — revenue, channels, campaigns, products
            </li>
            <li className="flex gap-3">
              <span className="text-brand font-semibold shrink-0">—</span>
              Spot a winning or failing campaign within hours of launch
            </li>
            <li className="flex gap-3">
              <span className="text-brand font-semibold shrink-0">—</span>
              Built for peak load — Promo Days, sales, Black Friday, viral spikes
            </li>
          </ul>
        </div>

        {/* Promo Day ticker */}
        <div className="bg-warm-white border border-warm-100 rounded-2xl p-8 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
              Promo Day · 13:00 · 4h after launch
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-brand font-semibold">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              Live
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-7">
            {[
              { label: "Revenue so far", value: "€96,204", delta: "on pace vs last Promo Day", up: true },
              { label: "Best campaign", value: "PMax_Catalog", delta: "€31,540 · scale it now", up: true },
              { label: "Underperformer", value: "DemandGen", delta: "9,230 clicks · 2 sales", up: false },
              { label: "Conversion rate", value: "1.10%", delta: "+0.3 pts since 11:00", up: true },
            ].map((kpi) => (
              <div key={kpi.label}>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-mute mb-1.5">
                  {kpi.label}
                </div>
                <div className="text-[24px] font-semibold text-ink tracking-[-0.02em] font-mono">
                  {kpi.value}
                </div>
                <div className={`text-[12.5px] font-medium mt-1 ${kpi.up ? "text-brand" : "text-red-alert"}`}>
                  {kpi.delta}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-warm-100 text-[13px] leading-[1.5] text-ink-soft">
            Decision at 13:00: kill DemandGen, move budget to PMax_Catalog. Not a post-mortem
            tomorrow — a fix today.
          </div>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-mute">
            Illustrative example — not a live account.
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Message 3: Growth / Risk / Cost (LENS, dark slab) ------ */
const PILLARS = [
  {
    tag: "Growth",
    title: "Unblock growth opportunities",
    q: "Which products leak revenue between add-to-cart and checkout?",
    a: "77% of carts don't convert. The biggest leak is premium e-bikes — add a financing prompt on the product page.",
  },
  {
    tag: "Risk",
    title: "Mitigate risks early",
    q: "What dropped overnight that I haven't noticed yet?",
    a: "Returning premium buyers fell 84% this week. Likely a stock-out — verify before the weekend.",
    featured: true,
  },
  {
    tag: "Cost",
    title: "Reduce wasted spend",
    q: "Where am I burning ad budget?",
    a: "DemandGen: 9,230 clicks, 2 sales. Pausing it and reallocating to PMax_Catalog recovers the spend.",
  },
];

export function GrowthRiskCost() {
  return (
    <section className="section-dark bg-ink py-28 border-t border-warm-100 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -160, top: -160, width: 520, height: 520, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,139,109,0.3), transparent 70%)",
        }}
      />
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 relative">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#E8B84B" }}>
          LENS AI
        </span>
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-end mt-5 mb-14">
          <h2 className="h-section">
            Unblock growth. Mitigate risk. <em>Cut cost.</em>
          </h2>
          <p className="text-[17px] leading-[1.6] text-white/70 max-w-[54ch]">
            <Link href="/ai-analytics" className="text-white font-medium border-b border-white/30 hover:border-white">
              LENS
            </Link>{" "}
            reads your data without consent gaps and answers in plain language — the three questions that
            actually move the number. Ask it, or let it surface the answer before you think to ask.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {PILLARS.map((p) => (
            <article
              key={p.tag}
              className={`rounded-2xl p-8 flex flex-col min-h-[320px] border ${
                p.featured ? "bg-white/[0.07] border-white/20" : "bg-white/[0.03] border-white/10"
              }`}
            >
              <span
                className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: p.featured ? "#E8B84B" : "rgba(255,255,255,0.5)" }}
              >
                {p.tag}
              </span>
              <h3 className="text-[20px] font-semibold text-white mt-3 mb-5 leading-[1.25]">
                {p.title}
              </h3>
              <div className="self-start max-w-[95%] bg-white/10 text-white px-4 py-3 rounded-[14px] rounded-bl-[4px] text-[13px] leading-[1.5] mb-2.5">
                {p.q}
              </div>
              <div
                className="self-start max-w-[97%] px-4 py-3 rounded-[14px] rounded-bl-[4px] text-[13px] leading-[1.55] font-medium mt-auto"
                style={{ background: "#E8B84B", color: "#0E0E0C" }}
              >
                {p.a}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.08em] text-white/40">
          Illustrative Q&amp;A — example conversations, not a live account.
        </p>

        <div className="mt-10">
          <a
            href="https://lens-lite.sealmetrics.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-ink px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 transition"
          >
            Ask LENS on demo data →
          </a>
        </div>
      </div>
    </section>
  );
}

/* --- Small framing lead-in for the setup block -------------- */
export function OneMinuteLede() {
  return (
    <section className="pt-24 pb-4 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-end">
          <div>
            <span className="eyebrow mb-5">One minute to live</span>
            <h2 className="h-section mt-5">
              The fastest analytics you&rsquo;ll ever <em>install.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            No onboarding project, no tag manager maze. Your AI assistant provisions the account and
            wires the pixel — you paste one line and data starts flowing.{" "}
            <Link href="#agentic-setup" className="text-brand font-medium border-b border-brand/30 hover:border-brand">
              See the exact steps
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

/* --- Testimonial quote (Palladium) -------------------------- */
export function QuoteBlock() {
  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-10">
        <blockquote className="border-l-2 pl-7 md:pl-10" style={{ borderColor: "#2E5C8A" }}>
          <p className="text-[24px] md:text-[32px] font-medium text-ink leading-[1.3] tracking-[-0.02em] max-w-[26ch]">
            The data Sealmetrics delivers is agnostic, unbiased and neutral. <em className="italic-accent">There&rsquo;s no black box.</em>
          </p>
          <footer className="mt-7 flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-full bg-ink text-white font-semibold text-[14px] flex items-center justify-center shrink-0">TA</span>
            <span className="text-[14px] leading-[1.4]">
              <b className="text-ink font-semibold block">Toni Andújar</b>
              <span className="text-ink-soft">Digital &amp; Direct Sales Director, Palladium Hotel Group</span>
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

/* --- CFO objection + legal mechanism (condensed from /why-sealmetrics) ---
   The homepage stacked benefits but never rebutted an objection or explained
   why consentless capture is legal — the two moves that close a skeptical CMO/CFO.
   The full argument lives on /why-sealmetrics; this is the short form. */
export function CfoObjectionHome({ locale = "en" }: { locale?: "en" | "es" }) {
  const t =
    locale === "es"
      ? {
          quote:
            "Esas ventas ya se cerraron. Ver el número completo no hace que venda más.",
          cite: "Lo que te dirá tu CFO",
          p1a: "Tienen razón: Sealmetrics no crea ingresos nuevos.",
          p1b: "Esos ingresos ya existen.",
          p1c:
            "Lo que recuperas es la capacidad de decidir bien sobre ellos: hoy la foto distorsionada te empuja a cortar los canales cuyos compradores rechazan cookies y a financiar los que solo parecen fuertes.",
          p2a: "Mismo presupuesto,",
          p2em1: "más ventas.",
          p2b: "O mismas ventas,",
          p2em2: "menos presupuesto.",
          readMore: "Lee el argumento completo →",
          whyHref: "/es/why-sealmetrics",
          h2a: "¿Medir sin consentimiento, legalmente?",
          h2em: "Así es cómo.",
          steps: [
            { n: "01", t: "Sin cookies", d: "Sin identificadores, sin fingerprints. Eventos agregados — hits, no personas." },
            { n: "02", t: "Sin datos personales", d: "No se procesa nada personal, así que no se dispara ningún diálogo de consentimiento." },
            { n: "03", t: "Nada que consentir", d: "No hay perfil al que oponerse. Medir sin pérdida por consentimiento y la privacidad son el mismo diseño." },
          ],
          badges: ["RGPD por arquitectura", "ePrivacy", "Schrems II limpio", "Alojado en Dublín", "DPA incluido"],
        }
      : {
          quote:
            "Those sales already closed. Seeing the full number doesn't make me sell more.",
          cite: "What your CFO will say",
          p1a: "They're right — Sealmetrics doesn't create new revenue.",
          p1b: "That revenue already exists.",
          p1c:
            "What you recover is the ability to decide well on top of it: today the distorted picture pushes you to cut the channels whose buyers reject cookies and fund the ones that only look strong.",
          p2a: "Same budget,",
          p2em1: "more sales.",
          p2b: "Or same sales,",
          p2em2: "less budget.",
          readMore: "Read the full argument →",
          whyHref: "/why-sealmetrics",
          h2a: "\u201cMeasure without consent, legally?\u201d",
          h2em: "Here's how.",
          steps: [
            { n: "01", t: "No cookies", d: "No identifiers, no fingerprints. Aggregate events — hits, not people." },
            { n: "02", t: "No personal data", d: "Nothing personal processed, so no consent dialog is triggered." },
            { n: "03", t: "Nothing to consent to", d: "No profile to object to. Consent-independent measurement and privacy are the same design." },
          ],
          badges: ["GDPR by architecture", "ePrivacy", "Schrems II clean", "EU-hosted in Dublin", "DPA included"],
        };

  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1fr_1.15fr] gap-10 md:gap-16 items-start mb-16">
          <figure className="border-l-2 pl-6" style={{ borderColor: "#2E5C8A" }}>
            <blockquote className="text-[22px] md:text-[26px] leading-[1.4] text-ink font-medium tracking-[-0.01em]">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
              {t.cite}
            </figcaption>
          </figure>
          <div className="grid gap-4">
            <p className="text-[16.5px] leading-[1.6] text-ink-2">
              {t.p1a}{" "}
              <strong className="font-semibold text-ink">{t.p1b}</strong> {t.p1c}
            </p>
            <p className="text-[16.5px] leading-[1.6] text-ink-2">
              {t.p2a} <em className="italic-accent">{t.p2em1}</em> {t.p2b}{" "}
              <em className="italic-accent">{t.p2em2}</em>{" "}
              <Link href={t.whyHref} className="text-brand font-medium border-b border-brand/30 hover:border-brand no-underline">
                {t.readMore}
              </Link>
            </p>
          </div>
        </div>

        <div className="max-w-[52ch] mb-10">
          <h2 className="h-section">
            {t.h2a} <em>{t.h2em}</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
          {t.steps.map((s, i) => (
            <div key={s.n} className="contents">
              {i > 0 && (
                <div className="hidden md:flex items-center justify-center text-warm-300 text-[22px]" aria-hidden>
                  →
                </div>
              )}
              <article className="bg-warm-50 border border-warm-100 rounded-xl p-7">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">{s.n}</span>
                <h3 className="text-[19px] font-semibold text-ink leading-[1.3] mt-2.5 mb-2">{s.t}</h3>
                <p className="text-[14px] leading-[1.55] text-ink-soft">{s.d}</p>
              </article>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
          {t.badges.map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
