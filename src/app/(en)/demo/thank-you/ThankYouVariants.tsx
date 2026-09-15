"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Picture } from "@/components/ui/Picture";
import type { DemoTier } from "@/lib/demo-scoring";
import { pushEvent } from "@/lib/analytics";

const REGISTER_URL = "https://my.sealmetrics.com/register";
const VIDEO_EMBED_URL =
  "https://iframe.mediadelivery.net/embed/609541/c39d3844-8ef3-4362-8579-d71a6b832b0f";

interface Variant {
  eyebrow: string;
  headline: React.ReactNode;
  lede: React.ReactNode;
}

const variants: Record<DemoTier, Variant> = {
  A: {
    eyebrow: "Priority slot reserved",
    headline: <>Thanks — your audit is in the founder&apos;s queue.</>,
    lede: (
      <>
        From your answers, we&apos;re going to set this up directly with the founder. You&apos;ll get an email within one business day with a calendar link.
      </>
    ),
  },
  B: {
    eyebrow: "Audit confirmed",
    headline: <>Thanks for getting in touch.</>,
    lede: (
      <>
        We&apos;ll send a personalised audit to your inbox within 24 hours. No drip sequence, no automated follow-ups — just a human reply with the gap between GA4 and your real backend revenue.
      </>
    ),
  },
  C: {
    eyebrow: "Thanks for taking the time",
    headline: <>Thanks — we&apos;ll be in touch.</>,
    lede: (
      <>
        We&apos;ll review your situation and reply within one business day. Meanwhile, the resources below should give you a clear picture of how Sealmetrics works.
      </>
    ),
  },
};

const LOGOS = [
  { src: "/logos/clients/palladium-dark.svg", alt: "Palladium Hotel Group", h: 44 },
  { src: "/logos/clients/dreamplace.svg", alt: "Dreamplace Hotels", h: 50 },
  { src: "/logos/clients/acciona.svg", alt: "Acciona", h: 38 },
  { src: "/logos/clients/crocs.svg", alt: "Crocs", h: 34 },
  { src: "/logos/clients/desigual-dark.svg", alt: "Desigual", h: 32 },
  { src: "/logos/clients/casabatllo.png", alt: "Casa Batlló", h: 38 },
] as const;

function isTier(value: string | null): value is DemoTier {
  return value === "A" || value === "B" || value === "C";
}

export function ThankYouVariants() {
  const params = useSearchParams();
  const tierParam = params.get("tier");
  const tier: DemoTier = isTier(tierParam) ? tierParam : "B";
  const v = variants[tier];
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    pushEvent({ event: "lead_book_demo", tier });
  }, [tier]);

  return (
    <>
      {/* Thank-you header */}
      <div className="max-w-[760px] mx-auto px-5 sm:px-8 text-center">
        <div
          className="w-14 h-14 mx-auto mb-7 rounded-full flex items-center justify-center"
          style={{ background: "rgba(45,139,109,0.12)" }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2D8B6D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <span
          className="eyebrow mx-auto mb-5"
          style={{ display: "inline-flex", justifyContent: "center" }}
        >
          {v.eyebrow}
        </span>
        <h1
          className="font-semibold text-ink leading-[1.1] tracking-[-0.025em] mt-4"
          style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
        >
          {v.headline}
        </h1>
        <p className="text-[16.5px] leading-[1.6] text-ink-soft mt-5 mx-auto max-w-[58ch]">
          {v.lede}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft font-semibold mt-6">
          Check your inbox shortly · reply lands within one business day
        </p>
      </div>

      {/* Video block */}
      <section className="mt-16 md:mt-20">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
          <div className="text-center mb-8">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
              While you wait · 2 minutes
            </span>
            <h2
              className="font-semibold text-ink leading-[1.15] tracking-[-0.02em] mt-3 mx-auto max-w-[26ch]"
              style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
            >
              Watch how Sealmetrics gets <em className="italic-accent">live data on your site.</em>
            </h2>
            <p className="text-[15px] leading-[1.6] text-ink-soft mt-4 mx-auto max-w-[56ch]">
              Getting Started — a 2-minute walkthrough showing how to create your account, add your site and install the script. So when we call, your data is already flowing.
            </p>
          </div>

          <div className="relative w-full overflow-hidden rounded-[16px] border border-warm-100 bg-ink shadow-[0_18px_60px_-20px_rgba(14,14,12,0.25)]" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              src={VIDEO_EMBED_URL}
              loading="lazy"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title="Sealmetrics — Getting Started"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Register CTA */}
      <section className="mt-16 md:mt-20">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
          <div className="bg-ink text-white rounded-[20px] px-8 md:px-14 py-12 md:py-16 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                right: -120,
                top: -120,
                width: 320,
                height: 320,
                borderRadius: "50%",
                background: "radial-gradient(circle,rgba(45,139,109,0.32),transparent 70%)",
              }}
            />
            <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 bg-amber text-ink px-3 py-1 rounded text-[11px] font-mono font-bold uppercase tracking-[0.1em] mb-5">
                  Stop the ROAS bleed today
                </span>
                <h2
                  className="text-white font-semibold leading-[1.15] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
                >
                  Don&apos;t wait for the call. <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Install the pixel now.</em>
                </h2>
                <p className="text-white/75 text-[15.5px] leading-[1.6] mt-5 max-w-[52ch]">
                  Create a free account and paste the 846-byte script today. By the time we talk, your data will already be flowing — so the conversation is about <em>your</em> numbers, not a generic deck. Every day without complete measurement is paid media spent on incomplete reality.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-ink px-7 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-95 transition w-full md:w-auto"
                >
                  Create free account →
                </a>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/60 font-semibold text-center md:text-right">
                  14-day trial · cancel before day 14, pay nothing · 5–30 min setup by platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className="mt-16 md:mt-20">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <p className="text-center font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand mb-10">
            From teams already running on real data
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <blockquote
              className="bg-white border border-warm-100 rounded-[16px] p-8 md:p-9 border-l-[3px]"
              style={{ borderLeftColor: "#2E5C8A" }}
            >
              <p className="text-[17px] leading-[1.55] text-ink font-medium tracking-[-0.01em] italic">
                &ldquo;The data Sealmetrics delivers is agnostic, unbiased and neutral. There&apos;s no black box.&rdquo;
              </p>
              <footer className="mt-5 flex items-center gap-3">
                <div>
                  <p className="text-[14px] font-semibold text-ink leading-[1.3]">
                    Toni Andújar
                  </p>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-semibold mt-1">
                    Digital &amp; Direct Sales Director · Palladium Hotel Group
                  </p>
                </div>
              </footer>
            </blockquote>

            <blockquote
              className="bg-white border border-warm-100 rounded-[16px] p-8 md:p-9 border-l-[3px]"
              style={{ borderLeftColor: "#2E5C8A" }}
            >
              <p className="text-[17px] leading-[1.55] text-ink font-medium tracking-[-0.01em] italic">
                &ldquo;What it gives us is what we&apos;ve always needed: data as real as possible, as close to reality as possible.&rdquo;
              </p>
              <footer className="mt-5 flex items-center gap-3">
                <div>
                  <p className="text-[14px] font-semibold text-ink leading-[1.3]">
                    Eduardo Martin
                  </p>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-semibold mt-1">
                    Analytics &amp; Campaigns Lead · Dreamplace Hotels
                  </p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="mt-16 md:mt-20">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <p className="text-center font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft mb-9">
            European brands measuring what actually happened
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-90">
            {LOGOS.map((logo) => (
              <Picture
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={logo.h}
                className="object-contain w-auto"
                style={{ height: `${logo.h}px`, maxWidth: 200 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer link back home */}
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 mt-16 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-soft no-underline border-b border-warm-200 pb-0.5 hover:text-ink hover:border-ink"
        >
          ← Back to homepage
        </Link>
      </div>
    </>
  );
}
