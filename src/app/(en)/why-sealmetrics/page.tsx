import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import {
  breadcrumbSchema,
  speakableWebPageSchema,
  statisticClaimSchema,
  quotationSchema,
} from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { DualCTA } from "@/components/homepage/DualCTA";
import { LogosStrip } from "@/components/sections/v3/HomeV3";
import { InstallInSeconds } from "@/components/sections/v3/InstallInSeconds";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Why Sealmetrics — aggregate analytics without IDs",
  description:
    "Aggregate campaign and revenue reporting without cookies or personal identifiers, with EU-hosted processing and supervised analytics workflows.",
  openGraph: {
    title: "Why Sealmetrics — aggregate analytics without IDs",
    description:
      "Measure observed campaign and revenue events without browser identifiers, with EU-hosted processing and clear reporting boundaries.",
    type: "website",
    images: [ogImage("/why-sealmetrics/")],
    url: "https://sealmetrics.com/why-sealmetrics/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Why Sealmetrics — aggregate analytics without IDs",
    description: "Measure observed campaign and revenue events without browser identifiers, with EU-hosted processing and clear reporting boundaries.",
    images: [ogImage("/why-sealmetrics/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/why-sealmetrics/",
    languages: getAlternates("/why-sealmetrics"),
  },
};

/* Faint red hatch for the "lost" share of each funnel bar */
const LOST_HATCH = {
  background:
    "repeating-linear-gradient(135deg, rgba(181,66,59,0.16), rgba(181,66,59,0.16) 6px, rgba(181,66,59,0.05) 6px, rgba(181,66,59,0.05) 12px)",
};

/* ============================================
   HERO · one sentence, straight to the point
   ============================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm-white pt-10 md:pt-14 pb-14">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
        <div className="inline-flex items-center gap-3 bg-white border border-warm-100 rounded-full px-4 py-1.5 text-[13px] text-ink-2 mb-10">
          <span className="bg-warm-100 text-ink px-2.5 py-1 rounded text-[10px] font-semibold font-mono tracking-[0.08em] uppercase">
            Audited
          </span>
          <Link href="/case-studies/palladium-hotel-group" className="text-ink border-b border-warm-200 hover:border-ink no-underline">
            Palladium Hotel Group: 40% of traffic had no attribution → +165% Display CPS
          </Link>
        </div>

        <h1 className="h-display mx-auto" style={{ maxWidth: "22ch" }}>
          You&apos;re steering the business on <em>a fraction of the data.</em>
        </h1>

        <p
          className="text-ink-soft mt-7 mx-auto max-w-[52ch] leading-[1.55]"
          style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
        >
          Sealmetrics measures observed traffic and sales without cookies or browser
          identifiers, then applies last-click attribution to those aggregate events.
        </p>

        <DualCTA locale="en" className="justify-center mt-8" />

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
          {["Privacy-led architecture", "No browser identifiers", "EU processing", "EU-hosted · Dublin"].map((b) => (
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

/* ============================================
   WHERE YOUR DATA DIES · funnel, one picture
   ============================================ */
function WhereDataDies() {
  const rows: {
    label: string;
    note: string;
    width: number;
    value: string;
    valueClass: string;
  }[] = [
    {
      label: "Every visit that happened",
      note: "reality",
      width: 100,
      value: "100%",
      valueClass: "text-ink",
    },
    {
      label: "After the consent wall",
      note: "40–60% of traffic doesn't accept cookies · our client experience",
      width: 50,
      value: "40–60%",
      valueClass: "text-red-alert",
    },
    {
      label: "After tracking prevention",
      note: "7-day cookie expiry · ad-blockers · depends on the site",
      width: 38,
      value: "less",
      valueClass: "text-red-alert",
    },
    {
      label: "In the right channel",
      note: "Palladium audit: 40% had no source at all",
      width: 0,
      value: "?",
      valueClass: "text-red-alert",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
        <div className="max-w-[52ch] mb-12">
          <span className="eyebrow mb-5">The problem, in one picture</span>
          <h2 className="h-section mt-5">
            Your ROAS isn&apos;t wrong by a margin. <em>It&apos;s wrong by design.</em>
          </h2>
        </div>

        <div className="grid gap-5">
          {rows.map((r) => (
            <div key={r.label} className="grid md:grid-cols-[240px_1fr] gap-2 md:gap-6 items-center">
              <div>
                <div className="text-[15px] font-semibold text-ink leading-tight">{r.label}</div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-soft mt-1">
                  {r.note}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-11 rounded-[4px] overflow-hidden flex flex-1">
                  {r.width > 0 ? (
                    <>
                      <div
                        className="h-full bg-ink transition-none"
                        style={{ width: `${r.width}%` }}
                      />
                      <div className="h-full flex-1" style={LOST_HATCH} />
                    </>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center border border-dashed border-red-alert/50 rounded-[4px]">
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-red-alert font-semibold">
                        unknowable from this data
                      </span>
                    </div>
                  )}
                </div>
                <div className={`font-mono text-[18px] font-semibold tabular-nums w-20 text-right ${r.valueClass}`}>
                  {r.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-warm-100">
          <p
            className="text-ink font-medium leading-[1.3] max-w-[36ch]"
            style={{ fontSize: "clamp(20px, 2.2vw, 27px)", letterSpacing: "-0.02em" }}
          >
            The ROAS you defend on Monday <em className="italic-accent">is computed on the last bar.</em>
          </p>
          <Link
            href="/data-loss-calculator"
            className="inline-flex items-center gap-2 border border-warm-200 text-ink px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 shrink-0"
          >
            Calculate your data loss →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   DISTORTION · the loss isn't random
   ============================================ */
function ChannelDistortion() {
  const ga4View: { label: string; share: string; width: number; alert?: boolean }[] = [
    { label: "Paid Social", share: "14%", width: 18, alert: true },
    { label: "Paid Search", share: "22%", width: 29 },
    { label: "Brand search", share: "34%", width: 45 },
    { label: "Email / Direct", share: "30%", width: 40 },
  ];
  const realView: { label: string; share: string; width: number; hero?: boolean }[] = [
    { label: "Paid Social", share: "35%", width: 90, hero: true },
    { label: "Paid Search", share: "25%", width: 64 },
    { label: "Brand search", share: "20%", width: 52 },
    { label: "Email / Direct", share: "20%", width: 52 },
  ];
  const steps: { n: string; big: string; cap: React.ReactNode; err?: boolean }[] = [
    {
      n: "01 · You spend",
      big: "€50,000",
      cap: (
        <>
          a month on ads. <strong className="font-semibold text-ink">1,000 real sales</strong> close.
        </>
      ),
    },
    {
      n: "02 · GA4 sees",
      big: "≈420",
      cap: "The fraction that accepted cookies and survived tracking prevention — skewed by channel.",
    },
    {
      n: "03 · You decide",
      big: "−40%",
      cap: "You cut social (“looks weak”) and fund brand (“looks like the hero”).",
      err: true,
    },
    {
      n: "04 · Result",
      big: "↓ sales",
      cap: "You just cut your best acquisition channel. Same spend, less revenue.",
      err: true,
    },
  ];

  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[54ch] mb-12">
          <span className="eyebrow mb-5">The shape of the loss</span>
          <h2 className="h-section mt-5">
            Consent loss <em>isn&apos;t distributed evenly.</em>
          </h2>
          <p className="text-[17px] leading-[1.6] text-ink-soft mt-6">
            The example below is illustrative. In our experience with clients, between 40% and
            60% of traffic doesn&apos;t accept cookies; your actual rate must be measured on your own site. If you lost conversions at random, you&apos;d see a smaller picture
            with the same proportions — and decide the same way. But cookie rejection rates
            vary by channel: paid social on mobile rejects far more than a brand search on
            desktop. GA4 doesn&apos;t give you a smaller picture.{" "}
            <strong className="font-semibold text-ink">It gives you a distorted one.</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* How GA4 sees it */}
          <article className="bg-white border border-warm-100 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
                How GA4 sees it
              </span>
              <span
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.06em] rounded-full px-2.5 py-1"
                style={{ backgroundColor: "rgba(181,66,59,0.08)", color: "var(--color-red-alert)" }}
              >
                Skewed
              </span>
            </div>
            <div className="grid gap-3.5">
              {ga4View.map((r) => (
                <div key={r.label} className="grid grid-cols-[120px_1fr_44px] items-center gap-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-ink-soft">{r.label}</span>
                  <div className="h-5 rounded-[3px] bg-warm-100 overflow-hidden">
                    <div
                      className="h-full rounded-[3px]"
                      style={{ width: `${r.width}%`, backgroundColor: "var(--color-warm-300)" }}
                    />
                  </div>
                  <span
                    className={`font-mono text-[12px] font-semibold tabular-nums text-right ${r.alert ? "text-red-alert" : "text-ink-2"}`}
                  >
                    {r.share}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-6 pt-5 border-t border-warm-100">
              Social looks like the weak channel; brand and direct look like the heroes.{" "}
              <strong className="font-semibold text-red-alert">The logical call: cut social.</strong>
            </p>
          </article>

          {/* Reality */}
          <article className="bg-white border border-brand/30 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
                Observed data — no consent gate
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.06em] rounded-full px-2.5 py-1 bg-brand-soft/40 text-brand">
                Aggregate
              </span>
            </div>
            <div className="grid gap-3.5">
              {realView.map((r) => (
                <div key={r.label} className="grid grid-cols-[120px_1fr_44px] items-center gap-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-ink-soft">{r.label}</span>
                  <div className="h-5 rounded-[3px] bg-warm-100 overflow-hidden">
                    <div
                      className="h-full rounded-[3px]"
                      style={{
                        width: `${r.width}%`,
                        backgroundColor: r.hero ? "var(--color-brand)" : "var(--color-ink)",
                      }}
                    />
                  </div>
                  <span
                    className={`font-mono text-[12px] font-semibold tabular-nums text-right ${r.hero ? "text-brand" : "text-ink-2"}`}
                  >
                    {r.share}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-6 pt-5 border-t border-warm-100">
              Social was your biggest acquisition engine. Brand search was people who were{" "}
              <strong className="font-semibold text-ink">already coming to buy.</strong>
            </p>
          </article>
        </div>

        <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-soft mt-4">
          Illustrative scenario — your real skew depends on your channel mix. Measure it on your own traffic.
        </p>

        {/* Worked example */}
        <div className="mt-14 pt-12 border-t border-warm-100">
          <h3 className="text-[22px] font-semibold text-ink tracking-[-0.01em] mb-10 max-w-[30ch]">
            Same budget. Fewer sales. No idea why.
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-y-8">
            {steps.map((s, i) => (
              <div key={s.n} className={`px-6 ${i === 0 ? "md:pl-0 pl-6 sm:pl-0" : ""} ${i > 0 ? "md:border-l border-warm-100" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-warm-100 md:border-l" : ""}`}>
                <div className={`font-mono text-[11px] font-bold uppercase tracking-[0.1em] ${s.err ? "text-red-alert" : "text-brand"}`}>
                  {s.n}
                </div>
                <div
                  className={`font-semibold tracking-[-0.03em] tabular-nums leading-none mt-3 mb-2.5 ${s.err ? "text-red-alert" : "text-ink"}`}
                  style={{ fontSize: "clamp(28px, 3vw, 38px)" }}
                >
                  {s.big}
                </div>
                <p className="text-[13.5px] leading-[1.5] text-ink-soft">{s.cap}</p>
              </div>
            ))}
          </div>
          <p
            className="text-ink font-medium leading-[1.35] max-w-[44ch] mt-12"
            style={{ fontSize: "clamp(19px, 2.1vw, 26px)", letterSpacing: "-0.015em" }}
          >
            You didn&apos;t lose money by overspending. You lost it by{" "}
            <em className="italic-accent">deciding on a distorted picture.</em>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CFO OBJECTION · editorial pull-quote
   ============================================ */
function CfoObjection() {
  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[54ch] mb-12">
          <span className="eyebrow mb-5">The legitimate objection</span>
          <h2 className="h-section mt-5">
            &ldquo;That revenue already happened.&rdquo; <em>True. And not the point.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-[1fr_1.15fr] gap-10 md:gap-16 items-start">
          <figure className="border-l-2 pl-6 md:sticky md:top-24" style={{ borderColor: "#2E5C8A" }}>
            <blockquote className="text-[22px] md:text-[26px] leading-[1.4] text-ink font-medium tracking-[-0.01em]">
              &ldquo;Those sales already closed. Seeing the full number doesn&apos;t make me
              sell more.&rdquo;
            </blockquote>
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
              What your CFO will say
            </figcaption>
          </figure>

          <div className="grid gap-5">
            <p className="text-[16.5px] leading-[1.6] text-ink-2">
              They&apos;re right about the first part: Sealmetrics doesn&apos;t create new
              revenue. <strong className="font-semibold text-ink">That revenue already exists.</strong>{" "}
              What you recover is the ability to decide well on top of it.
            </p>
            <p className="text-[16.5px] leading-[1.6] text-ink-2">
              Today, the distorted picture pushes you to cut the channels whose buyers
              reject cookies and fund the ones that only look strong. With
              consent-independent aggregate events and{" "}
              <Link href="/glossary/last-click-attribution" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
                last-click attribution
              </Link>{" "}
              on the observed dataset — that silent self-sabotage is easier to detect.
            </p>
            <p className="text-[16.5px] leading-[1.6] text-ink-2">
              And at the next budget cut: if you can only prove half your return, you get
              cut. With more observed return attributed,{" "}
              <strong className="font-semibold text-ink">marketing defends it — or grows it.</strong>
            </p>
            <p
              className="text-ink font-medium leading-[1.4] mt-3 pt-6 border-t border-warm-100"
              style={{ fontSize: "clamp(19px, 2vw, 24px)", letterSpacing: "-0.015em" }}
            >
              Same budget, <em className="italic-accent">more sales.</em> Or same sales,{" "}
              <em className="italic-accent">less budget.</em> You choose how to cash in the
              efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FIVE OUTCOMES · bento grid with mini-visuals
   ============================================ */
function MiniBar({ label, pct, color, textColor }: { label: string; pct: number; color: string; textColor: string }) {
  return (
    <div className="grid grid-cols-[92px_1fr_44px] items-center gap-3">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink-soft">{label}</span>
      <div className="h-6 rounded-[3px] bg-warm-100 overflow-hidden">
        <div className="h-full rounded-[3px]" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className={`font-mono text-[12px] font-semibold tabular-nums text-right ${textColor}`}>{pct}%</span>
    </div>
  );
}

function FiveOutcomes() {
  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[52ch] mb-12">
          <span className="eyebrow mb-5">What changes with Sealmetrics</span>
          <h2 className="h-section mt-5">
            Five things become true <em>on day one.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-6 gap-4">
          {/* 01 · Measure without a consent gate */}
          <article className="md:col-span-3 bg-white border border-warm-100 rounded-2xl p-7 flex flex-col gap-5">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">01</span>
              <h3 className="text-[20px] font-semibold text-ink leading-[1.25] mt-2">
                Measure without a consent gate
              </h3>
            </div>
            <div className="grid gap-2.5">
              <MiniBar label="GA4 · EU" pct={55} color="var(--color-warm-300)" textColor="text-ink-soft" />
              <MiniBar label="Sealmetrics" pct={100} color="var(--color-brand)" textColor="text-brand" />
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-auto">
              No browser identifier or consent gate in the analytics layer. Coverage still
              depends on correct implementation, network delivery and blockers.{" "}
              <Link href="/complete-data" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
                Complete data
              </Link>
              , observed — not modelled. The bars illustrate consent gating, not a guaranteed
              capture rate.
            </p>
          </article>

          {/* 02 · Attribute observed sales */}
          <article className="md:col-span-3 bg-white border border-warm-100 rounded-2xl p-7 flex flex-col gap-5">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">02</span>
              <h3 className="text-[20px] font-semibold text-ink leading-[1.25] mt-2">
                Attribute observed sales
              </h3>
            </div>
            <div className="grid gap-2.5 font-mono text-[12.5px]">
              <div className="flex items-center justify-between bg-warm-50 border border-warm-100 rounded-[4px] px-4 py-2.5">
                <span className="text-ink-soft uppercase tracking-[0.05em] text-[10.5px]">Unattributed traffic</span>
                <span className="tabular-nums font-semibold">
                  <span className="text-red-alert">40%</span>
                  <span className="text-ink-soft font-normal"> → </span>
                  <span className="text-brand">0%</span>
                </span>
              </div>
              <div className="flex items-center justify-between bg-warm-50 border border-warm-100 rounded-[4px] px-4 py-2.5">
                <span className="text-ink-soft uppercase tracking-[0.05em] text-[10.5px]">Attributed last-click</span>
                <span className="tabular-nums font-semibold">
                  <span className="text-red-alert">60%</span>
                  <span className="text-ink-soft font-normal"> → </span>
                  <span className="text-brand">100%</span>
                </span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft mt-0.5">
                Palladium Hotel Group audit · April 2026
              </div>
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-auto">
              <Link href="/glossary/last-click-attribution" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
                Last-click
              </Link>{" "}
              on observed events — &ldquo;direct&rdquo; stops being a landfill.
            </p>
          </article>

          {/* 03 · SKU-level */}
          <article className="md:col-span-2 bg-white border border-warm-100 rounded-2xl p-7 flex flex-col gap-5">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">03</span>
              <h3 className="text-[20px] font-semibold text-ink leading-[1.25] mt-2">
                SKU-level analytics
              </h3>
            </div>
            <div className="grid gap-2">
              {[
                { l: "Product view", pct: 100 },
                { l: "Add to cart", pct: 46 },
                { l: "Purchase", pct: 11 },
              ].map((s) => (
                <div key={s.l} className="grid grid-cols-[86px_1fr] items-center gap-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-ink-soft">{s.l}</span>
                  <div className="h-5 rounded-[3px] bg-warm-100 overflow-hidden">
                    <div className="h-full bg-ink rounded-[3px]" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {["size M", "colour navy", "model 8421"].map((c) => (
                  <span key={c} className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-2 bg-warm-100 rounded-full px-2.5 py-1">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-auto">
              Funnels and breakdowns by any{" "}
              <Link href="/product" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
                product property
              </Link>
              .
            </p>
          </article>

          {/* 04 · AI that trains no one */}
          <article className="md:col-span-2 bg-white border border-warm-100 rounded-2xl p-7 flex flex-col gap-5">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">04</span>
              <h3 className="text-[20px] font-semibold text-ink leading-[1.25] mt-2">
                AI that trains no one
              </h3>
            </div>
            <div className="grid gap-2">
              <div className="bg-warm-50 border border-warm-100 rounded-lg px-4 py-3 font-mono text-[12px] text-ink-2 leading-snug">
                &ldquo;Which campaigns wasted spend last week?&rdquo;
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-soft">
                  LENS private AI · answered in the EU
                </span>
              </div>
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-auto">
              <Link href="/ai-analytics" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
                Private AI
              </Link>{" "}
              or your own key — your data feeds no algorithm.
            </p>
          </article>

          {/* 05 · Live in 5 to 30 minutes */}
          <article className="md:col-span-2 bg-white border border-warm-100 rounded-2xl p-7 flex flex-col gap-5">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">05</span>
              <h3 className="text-[20px] font-semibold text-ink leading-[1.25] mt-2">
                Live in 5 to 30 minutes
              </h3>
            </div>
            <div className="bg-ink rounded-lg px-4 py-3.5 font-mono text-[12px] text-white/85 leading-snug overflow-x-auto whitespace-nowrap">
              <code>{"<script src=\"//app.sealmetrics.com/…\">"}</code>
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-auto">
              One tag — or{" "}
              <a href="#agentic-setup" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
                one MCP prompt
              </a>
              . Side-by-side with GA4, no migration.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CMO OUTCOMES · what Monday looks like
   ============================================ */
function CmoOutcomes() {
  const rows = [
    {
      label: "The data debate",
      before: "Four tools, four numbers — the meeting starts by arguing whose dashboard is right.",
      after: "One number brand, finance and the agency all sign. You debate the decision, not the data.",
    },
    {
      label: "The budget call",
      before: "Channels whose buyers reject cookies look weak — so you cut the wrong spend.",
      after: "Under-measured channels surface. Dreamplace found +30% traffic GA never saw.",
    },
    {
      label: "The result you present",
      before: "A modelled ROAS you can't fully defend.",
      after: "Reallocation on real data. Palladium: +165% Display Cost-per-Search.",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[54ch] mb-12">
          <span className="eyebrow mb-5">What this buys you</span>
          <h2 className="h-section mt-5">
            Walk into Monday with <em>a number no one argues with.</em>
          </h2>
        </div>

        {/* Column headers */}
        <div className="hidden md:grid md:grid-cols-[170px_1fr_1fr] gap-4 mb-3">
          <div />
          <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-red-alert font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-alert" />
            Today
          </div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-brand font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            With Sealmetrics
          </div>
        </div>

        <div className="grid gap-3">
          {rows.map((r) => (
            <div key={r.label} className="grid md:grid-cols-[170px_1fr_1fr] gap-3 md:gap-4 items-stretch">
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft font-semibold md:py-5">
                {r.label}
              </div>
              <div
                className="rounded-xl border p-5 text-[14.5px] leading-[1.5] text-ink-2"
                style={{ borderColor: "rgba(181,66,59,0.25)", backgroundColor: "rgba(181,66,59,0.04)" }}
              >
                {r.before}
              </div>
              <div className="rounded-xl border border-brand/30 bg-brand-soft/20 p-5 text-[14.5px] leading-[1.5] text-ink font-medium">
                {r.after}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   MECHANISM · three steps, one line each
   ============================================ */
function Mechanism() {
  const steps = [
    { n: "01", t: "No cookies", d: "No identifiers, no fingerprints. Aggregate events — hits, not people." },
    { n: "02", t: "Aggregate events", d: "The product is designed around hits and commercial properties, not personal profiles." },
    { n: "03", t: "No browser identifier", d: "Coverage still depends on implementation and delivery; the privacy model does not depend on a visitor profile." },
  ];

  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[52ch] mb-12">
          <span className="eyebrow mb-5">The obvious question</span>
          <h2 className="h-section mt-5">
            How does measurement work <em>without browser identifiers?</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
          {steps.map((s, i) => (
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

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-warm-100">
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
            {["Designed for GDPR", "ePrivacy", "Schrems II clean", "EU-hosted in Dublin", "DPA included", "TPSR package"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                {b}
              </span>
            ))}
          </div>
          <Link
            href="/security"
            className="inline-flex items-center gap-2 border border-warm-200 text-ink px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 shrink-0"
          >
            Read the compliance architecture →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PROOF · dark slab #1 — Palladium audit
   ============================================ */
function ProofSlab() {
  return (
    <section className="section-dark bg-ink text-white py-24 border-t border-warm-100 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -140,
          top: -140,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(45,139,109,0.3),transparent 70%)",
        }}
      />
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 relative">
        <div className="max-w-[56ch] mb-12">
          <span className="eyebrow mb-5">Audited, not claimed</span>
          <h2 className="h-section mt-5 text-white">
            Palladium Hotel Group ran the comparison. <em>The gap was 40%.</em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { n: "40%", l: "of traffic had no attribution before" },
            { n: "35%", l: "of GA4 bookings had no channel" },
            { n: "+165%", l: "Display Cost-per-Search on DV360 after" },
          ].map((s) => (
            <div key={s.n} className="bg-white/5 border border-white/10 rounded-xl p-7">
              <div
                className="font-semibold tracking-[-0.04em] tabular-nums leading-none"
                style={{ fontSize: "clamp(44px, 5vw, 64px)", color: "#E8B84B" }}
              >
                {s.n}
              </div>
              <div className="text-[14px] text-white/75 leading-[1.5] mt-3.5">{s.l}</div>
            </div>
          ))}
        </div>

        <figure className="mt-12 max-w-[64ch] border-l-2 pl-6" style={{ borderColor: "#2E5C8A" }}>
          <blockquote className="text-[20px] md:text-[23px] leading-[1.45] text-white/90 font-medium tracking-[-0.01em]">
            &ldquo;The data Sealmetrics delivers is agnostic, unbiased and neutral.
            There&apos;s no black box.&rdquo;
          </blockquote>
          <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-white/50 font-semibold">
            Toni Andújar · Digital &amp; Direct Sales Director · Palladium Hotel Group
          </figcaption>
        </figure>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between pt-8 border-t border-white/10">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/50">
            Dreamplace Hotels · +30% traffic vs GA · 15–20% more sales attributed
          </p>
          <Link
            href="/case-studies/palladium-hotel-group"
            className="inline-flex items-center gap-2 bg-white text-ink px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:brightness-95 shrink-0"
          >
            Read the full case study →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   COMPARISON · short cells, scannable
   ============================================ */
function ComparisonAnchor() {
  const rows: { label: string; ga4: string; ga360: string; adobe: string; seal: string }[] = [
    { label: "EU traffic collection", ga4: "Consent-gated", ga360: "Consent-gated", adobe: "Consent-gated", seal: "No browser identifier or consent gate in the analytics layer" },
    { label: "Attribution", ga4: "Modelled", ga360: "Modelled + sampled", adobe: "Consented data only", seal: "Last-click on observed aggregate events" },
    { label: "EU compliance", ga4: "Schrems II review", ga360: "Schrems II review", adobe: "US transfer review", seal: "Privacy-led architecture · Dublin" },
    { label: "Your data & AI", ga4: "Google ecosystem", ga360: "Google ecosystem", adobe: "Adobe ecosystem", seal: "Private AI or BYOK" },
    { label: "Setup", ga4: "Tag plan + CMP", ga360: "Months", adobe: "Months", seal: "5–30 minutes by platform" },
    { label: "Cost", ga4: "Free", ga360: "~$50–175K/yr", adobe: "~$50–200K/yr", seal: "From €499/mo" },
  ];

  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">The comparison that matters</span>
            <h2 className="h-section mt-5">
              Enterprise-grade data <em>without the enterprise invoice.</em>
            </h2>
          </div>
          <p className="text-[16px] leading-[1.6] text-ink-soft max-w-[50ch]">
            GA4 works well when consent rates are high and EU transfers aren&apos;t your
            problem. GA360 and Adobe are serious platforms — with serious invoices.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-warm-100">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="bg-warm-50">
                <th className="p-4 border-b border-warm-100 w-[18%]"></th>
                <th className="p-4 text-[15px] font-semibold text-ink border-b border-warm-100 w-[19%]">GA4 (free)</th>
                <th className="p-4 text-[15px] font-semibold text-ink border-b border-warm-100 w-[19%]">GA360</th>
                <th className="p-4 text-[15px] font-semibold text-ink border-b border-warm-100 w-[19%]">Adobe Analytics</th>
                <th className="p-4 text-[15px] font-semibold text-ink border-b border-warm-100 bg-brand-soft/30 w-[25%]">Sealmetrics</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-warm-100 last:border-b-0">
                  <td className="p-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft font-semibold align-middle">
                    {r.label}
                  </td>
                  <td className="p-4 text-[14px] leading-snug text-ink-2 align-middle">{r.ga4}</td>
                  <td className="p-4 text-[14px] leading-snug text-ink-2 align-middle">{r.ga360}</td>
                  <td className="p-4 text-[14px] leading-snug text-ink-2 align-middle">{r.adobe}</td>
                  <td className="p-4 text-[14px] leading-snug text-ink font-semibold bg-brand-soft/20 align-middle">
                    {r.seal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p
            className="text-ink font-medium leading-[1.35] max-w-[46ch]"
            style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.015em" }}
          >
            The cheapest analytics you can own is <em className="italic-accent">the one that stops one bad budget reallocation.</em>
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] shrink-0">
            <Link href="/vs-ga4" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
              vs GA4
            </Link>
            <Link href="/vs/ga360" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
              vs GA360
            </Link>
            <Link href="/vs/adobe-analytics" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
              vs Adobe Analytics
            </Link>
            <Link href="/pricing" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
              See full pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PRIVATE AI · the EU boundary, as a diagram
   ============================================ */
function CrossIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0">
      <path d="M3 3l8 8M11 3l-8 8" stroke="var(--color-red-alert)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PrivateAI() {
  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[52ch] mb-12">
          <span className="eyebrow mb-5">Your data, your algorithms</span>
          <h2 className="h-section mt-5">
            AI on your numbers — <em>without feeding anyone else&apos;s.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-[1.6fr_1fr] gap-4 items-stretch">
          {/* EU boundary */}
          <div className="border-2 border-brand rounded-2xl p-6 md:p-8 bg-white relative">
            <span className="absolute -top-3 left-6 bg-white px-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-brand font-bold">
              EU boundary — your data never crosses it
            </span>
            <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-center h-full">
              <div className="bg-warm-50 border border-warm-100 rounded-xl p-6 text-center">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-semibold mb-2">
                  Your analytics data
                </div>
                <div className="text-[19px] font-semibold text-ink">Dublin, Ireland</div>
              </div>
              <div className="text-warm-300 text-[22px] text-center rotate-90 sm:rotate-0" aria-hidden>
                ⇄
              </div>
              <div className="bg-warm-50 border border-warm-100 rounded-xl p-6 text-center">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-semibold mb-2">
                  LENS private AI
                </div>
                <div className="text-[19px] font-semibold text-ink">gpt-oss-120b · Paris</div>
              </div>
            </div>
          </div>

          {/* What it never reaches */}
          <div className="border border-warm-100 rounded-2xl p-6 md:p-8 bg-white">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-soft font-bold mb-4">
              No path to
            </div>
            <ul className="grid gap-3">
              {["Third-party model training", "Ad platform algorithms", "Your competitors"].map((x) => (
                <li key={x} className="flex items-center gap-3 text-[15px] text-ink-2">
                  <CrossIcon />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          {["LENS private AI", "BYOK · Anthropic / OpenAI / Gemini / DeepSeek", "MCP · 40+ read-only tools"].map((c) => (
            <span key={c} className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2 bg-white border border-warm-100 rounded-full px-4 py-1.5">
              {c}
            </span>
          ))}
          <Link href="/ai-analytics" className="text-[14px] text-brand no-underline border-b border-brand/30 hover:border-brand ml-auto">
            See the AI layer →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PAGE
   ============================================ */
export default function WhySealmetricsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Why Sealmetrics" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Why Sealmetrics", url: "/why-sealmetrics" }])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/why-sealmetrics",
          name: "Why Sealmetrics — aggregate analytics without identifiers",
          dateModified: "2026-09-21",
        })}
      />
      <JsonLd
        data={statisticClaimSchema({
          text: "40% of inbound traffic had no source/medium attribution in the previous measurement stack.",
          source: "Palladium Hotel Group internal audit on traffic attribution",
          sourceAuthor: "Palladium Hotel Group",
          sourceDate: "2026-04-15",
          url: "/why-sealmetrics",
          numericValue: 40,
          unit: "PERCENT",
        })}
      />
      <JsonLd
        data={statisticClaimSchema({
          text: "35% of bookings recorded in GA4 could not be assigned to the channel that generated them.",
          source: "Palladium Hotel Group bookings attribution gap",
          sourceAuthor: "Palladium Hotel Group",
          sourceDate: "2026-04-15",
          url: "/why-sealmetrics",
          numericValue: 35,
          unit: "PERCENT",
        })}
      />
      <JsonLd
        data={statisticClaimSchema({
          text: "+165% improvement in Cost-per-Search on Display after applying a Sealmetrics-based measurement model on DV360.",
          source: "Palladium Hotel Group DV360 efficiency improvement",
          sourceAuthor: "Palladium Hotel Group",
          sourceDate: "2026-04-15",
          url: "/why-sealmetrics",
          numericValue: 165,
          unit: "PERCENT",
        })}
      />
      <JsonLd
        data={quotationSchema({
          text: "The data Sealmetrics delivers is agnostic, unbiased and neutral. There's no black box.",
          spokenBy: "Toni Andújar",
          spokenByRole: "Digital & Direct Sales Director, Palladium Hotel Group",
          url: "/why-sealmetrics",
        })}
      />

      <Hero />
      <WhereDataDies />
      <ChannelDistortion />
      <CfoObjection />
      <FiveOutcomes />
      <CmoOutcomes />
      <Mechanism />
      <ProofSlab />
      <LogosStrip />
      <ComparisonAnchor />
      <PrivateAI />
      <InstallInSeconds />
      <FinalCtaSharedV3
        titleEn={
          <>
            The obvious choice is the one{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              you can verify.
            </em>
          </>
        }
        titleEs={
          <>
            La elección obvia es la que{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              puedes verificar.
            </em>
          </>
        }
        ledeEn="Run Sealmetrics side-by-side with GA4 — one tag or module, 5 to 30 minutes, 14-day trial. If the gap on your own traffic isn't worth acting on, keep GA4."
        ledeEs="Ejecuta Sealmetrics en paralelo con GA4 — un tag o módulo, de 5 a 30 minutos, prueba de 14 días. Si el gap en tu propio tráfico no justifica actuar, quédate con GA4."
      />

      <section className="bg-warm-white border-t border-warm-100 py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <QuickAnswer>
            <p>
              Sealmetrics is cookieless, aggregate analytics for EU online retail and marketing
              teams that need campaign and revenue reporting without personal identifiers.
              Plausible is a lightweight, open-source analytics product. Its{" "}
              <Link href="https://plausible.io/privacy-focused-web-analytics">
                privacy documentation
              </Link>{" "}
              describes aggregate measurement without persistent identifiers and a 2.5 KB
              gzipped script; its{" "}
              <Link href="https://plausible.io/docs/ecommerce-revenue-tracking">
                product documentation
              </Link>{" "}
              also covers custom events, funnels, user journeys and online retail revenue
              attribution. Plausible therefore should not be reduced to a pageview counter,
              and privacy alone is not a useful dividing line.
            </p>
            <p>
              Choose Plausible for a simple, transparent dashboard, open-source code and
              low-overhead traffic and goal reporting. Evaluate Sealmetrics for an enterprise
              operating model centred on campaign and revenue decisions, EU-hosted processing
              in Dublin and supervised analytics workflows. Neither product records every
              interaction or guarantees complete traffic: blockers, implementation errors,
              offline journeys and legal requirements can affect measurement. Compare the
              products on observable events, the reports your team needs, governance, support
              and total operating effort.
            </p>
          </QuickAnswer>
        </div>
      </section>
    </>
  );
}
