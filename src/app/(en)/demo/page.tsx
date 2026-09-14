import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { DemoForm } from "./DemoForm";
import { ogImage } from "@/lib/seo/og";
import { getCaseStudy } from "@/lib/content/case-studies";

/**
 * Named proof, in place of the anonymous "European fashion retailer" quote
 * this block used to carry — the weakest social proof on the site, sitting in
 * its highest-intent page. Quotes are read from the case-study content rather
 * than copied, so they cannot drift from the pages they link to.
 */
const DEMO_PROOF = [
  { slug: "incapto", href: "/case-studies/incapto/" },
  { slug: "palladium-hotel-group", href: "/case-studies/palladium-hotel-group/" },
] as const;

export const metadata: Metadata = {
  title: "Book a Demo — Sealmetrics",
  description:
    "30-minute personalized walkthrough. See your traffic without consent gaps, on your own site.",
  openGraph: {
    title: "Book a Demo — Sealmetrics",
    description: "30-minute walkthrough with the founder. See your own data gap live.",
    type: "website",
    images: [ogImage("/demo/")],
    url: "https://sealmetrics.com/demo/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Book a Demo — Sealmetrics",
    description: "30-minute walkthrough with the founder. See your own data gap live.",
    images: [ogImage("/demo/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/demo/",
    languages: getAlternates("/demo"),
  },
};

export default function DemoPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Book a demo" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Book a demo", url: "/demo" }])} />

      <section className="pt-24 md:pt-28 pb-24 bg-warm-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-start">
            {/* Left: info */}
            <div>
              <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
                Book a demo
              </span>
              <h1 className="h-display mt-5" style={{ maxWidth: "18ch", fontSize: "clamp(40px, 5.4vw, 72px)" }}>
                See what your analytics <em>have been missing.</em>
              </h1>
              <p
                className="text-ink-soft mt-7 leading-[1.55] max-w-[50ch]"
                style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}
              >
                In 30 minutes, we run your own site through the gap calculator — live. You see how much data your current setup is missing and where. No slides. No sales pitch.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                {[
                  {
                    t: "Side-by-side with GA4",
                    d: "Your current GA4 numbers next to Sealmetrics running on the same traffic. The gap is in your own data.",
                  },
                  {
                    t: "Your sites, your UTMs",
                    d: "Not a generic sandbox. We pull your real channels, campaigns and funnels.",
                  },
                  {
                    t: "No commitment, no follow-up sequence",
                    d: "30 minutes. If it's not for you, we tell you. No sales email drip.",
                  },
                ].map((item) => (
                  <div
                    key={item.t}
                    className="flex gap-4 pb-4 border-b border-warm-100 last:border-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                    <div>
                      <p className="text-[16px] font-semibold text-ink tracking-[-0.01em] mb-1">
                        {item.t}</p>
                      <p className="text-[14px] text-ink-soft leading-[1.55]">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="p-5 bg-white border border-warm-100 rounded-xl text-center">
                  <div className="font-semibold text-ink tabular-nums leading-none" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>
                    <em className="italic-accent">58</em>%
                  </div>
                  <div className="text-[12px] text-ink-soft mt-2 leading-[1.4]">
                    Avg. untracked conversions recovered
                  </div>
                </div>
                <div className="p-5 bg-white border border-warm-100 rounded-xl text-center">
                  <div className="font-semibold text-ink tabular-nums leading-none" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>
                    <em className="italic-accent">30</em> min
                  </div>
                  <div className="text-[12px] text-ink-soft mt-2 leading-[1.4]">
                    To see your own data gap live
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                {DEMO_PROOF.map(({ slug, href }) => {
                  const c = getCaseStudy(slug, "en");
                  return (
                    <figure
                      key={slug}
                      className="m-0 p-6 bg-white rounded-xl"
                      style={{ borderLeft: "3px solid #2E5C8A" }}
                    >
                      <blockquote className="m-0 text-[15px] text-ink-2 leading-[1.6] italic">
                        &ldquo;{c.quote}&rdquo;
                      </blockquote>
                      <figcaption className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.08em] font-semibold mt-3">
                        {c.person} · {c.role} · {c.client} ·{" "}
                        <Link href={href} className="text-ink-soft no-underline border-b border-warm-200 hover:text-ink transition-colors">
                          Read the case
                        </Link>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px]">
                <Link
                  href="/how-it-works"
                  className="text-ink-soft no-underline border-b border-warm-200 pb-0.5 hover:text-ink transition-colors"
                >
                  How it works
                </Link>
                <Link
                  href="/product"
                  className="text-ink-soft no-underline border-b border-warm-200 pb-0.5 hover:text-ink transition-colors"
                >
                  Full product
                </Link>
                <Link
                  href="/data-loss-calculator"
                  className="text-ink-soft no-underline border-b border-warm-200 pb-0.5 hover:text-ink transition-colors"
                >
                  Calculate your data loss
                </Link>
              </div>
            </div>

            {/* Right: booking first, qualification form as the optional path.
                The page promises a 30-minute walkthrough — the first thing it
                offers must be a calendar, not a 6-question form and a 24h wait. */}
            <div className="lg:sticky lg:top-24">
              <div className="p-6 bg-ink text-white rounded-xl">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-amber">
                  Book directly
                </span>
                <h2
                  className="font-semibold text-white leading-[1.15] tracking-[-0.02em] mt-2"
                  style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}
                >
                  Pick a time — <em>right now.</em>
                </h2>
                <p className="text-[14px] text-white/70 leading-[1.55] mt-2 mb-5">
                  30 minutes with the founder, on your own traffic. No
                  qualification form, no waiting for a reply.
                </p>
                <a
                  href="https://cal.sealmetrics.com/rafa/30min"
                  className="inline-flex w-full items-center justify-center gap-2 bg-white text-ink px-6 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:brightness-95"
                >
                  Book a walkthrough with Rafa →
                </a>
                <p className="font-mono text-[10.5px] text-white/50 uppercase tracking-[0.08em] font-semibold mt-3 text-center">
                  Instant booking · 30 min · no commitment
                </p>
              </div>

              <div className="mt-7 mb-5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
                  Prefer a tailored session?
                </span>
                <h3
                  className="font-semibold text-ink leading-[1.15] tracking-[-0.02em] mt-2"
                  style={{ fontSize: "clamp(19px, 2vw, 24px)" }}
                >
                  Tell us about your setup — <em className="italic-accent">we&apos;ll prepare your audit first.</em>
                </h3>
                <p className="text-[14px] text-ink-soft leading-[1.55] mt-2">
                  6 quick questions and we come to the call with your real
                  numbers pulled up, not a generic deck. We reply within one
                  business day.
                </p>
              </div>
              <DemoForm />

              <p className="text-[13.5px] text-ink-soft leading-[1.55] mt-5">
                Prefer to explore on your own before talking?{" "}
                <Link href="/demo-access" className="text-ink underline">
                  Access the demo account
                </Link>{" "}
                — credentials by email, corporate address required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
