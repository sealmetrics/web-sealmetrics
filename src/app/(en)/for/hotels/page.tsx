import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import {
  breadcrumbSchema,
  verticalSoftwareApplicationSchema,
} from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import Link from "next/link";
import { LogosStrip } from "@/components/sections/v3/HomeV3";
import { Picture } from "@/components/ui/Picture";
import { VerticalPageV3 } from "@/components/sections/v3/VerticalPageV3";
import { RelatedPagesV3 } from "@/components/sections/v3/RelatedPagesV3";
import { getVerticalData } from "@/components/sections/v3/VerticalsData";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Analytics for Hotels — Direct-Booking | Sealmetrics",
  description:
    "Cookieless analytics for hotels: match direct-booking attribution to your PMS. Palladium recovered 35% of lost bookings; Dreamplace closed a 15–20% gap.",
  openGraph: {
    title: "Analytics for Hotels — Direct-Booking | Sealmetrics",
    description:
      "Consentless, first-party analytics for hotel groups. Reconcile direct bookings with your PMS and attribute revenue from meta-search without OTA black boxes.",
    type: "website",
    images: [ogImage("/for/hotels/")],
    url: "https://sealmetrics.com/for/hotels/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analytics for Hotels — Direct-Booking | Sealmetrics",
    description: "Consentless, first-party analytics for hotel groups. Reconcile direct bookings with your PMS and attribute revenue from meta-search without OTA black boxes.",
    images: [ogImage("/for/hotels/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/for/hotels/",
    languages: getAlternates("/for/hotels"),
  },
};

const seoFaqs = [
  {
    question: "What is cookieless analytics for hotels?",
    answer:
      "Cookieless analytics for hotels counts booking-path events — meta-search landings, OTA referrals, booking confirmations — without cookies, consent banners or personal identifiers. Each booking is attributed last-click to the source on that page load, aggregate totals reconcile with the PMS (Mews, Cloudbeds, Opera), and no individual guest is tracked.",
  },
  {
    question: "How does cookieless analytics help recover invisible hotel bookings?",
    answer:
      "On average 25% of direct bookings recorded in hotel PMS systems do not appear correctly attributed in GA4 because of consent rejection on mobile (Safari), ITP-induced cookie expiry and OTA path breaks. Cookieless analytics counts pageviews anonymously on the server, with no consent to reject, captures the traffic source on each booking pageview and aggregates bookings per channel — no per-guest tracking required.",
  },
  {
    question: "Does Sealmetrics work across multiple hotel properties?",
    answer:
      "Yes. Portfolio rollups are included in every plan. Each property runs its own tracking and data consolidates at brand/group level — ideal for hotel chains with 5+ properties across multiple countries.",
  },
  {
    question: "Can cookieless analytics integrate with a hotel PMS?",
    answer:
      "Yes. Native integrations with Mews, Cloudbeds and Opera; any other PMS or custom booking engine integrates via REST API. Booking revenue flows back automatically for true revenue-linked attribution.",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "For Hotels" }]} />
      <JsonLd
        data={breadcrumbSchema([{ name: "For Hotels", url: "/for/hotels" }])}
      />
      <JsonLd
        data={verticalSoftwareApplicationSchema({
          vertical: "Hotels",
          audienceType: "Hotel groups and travel brands in Europe",
          description:
            "Cookieless analytics for hotels and travel: direct-booking attribution reconciled with the PMS, multi-property rollups and meta-search touchpoint tracking without cookies.",
          url: "/for/hotels",
        })}
      />

      <VerticalPageV3
        data={getVerticalData("hotels", "en")}
        featured={
          <section className="bg-warm-white border-t border-warm-100 py-24">
            <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
              <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
            <div>
              <span className="eyebrow mb-5">Featured hotel case studies</span>
              <h2 className="h-section mt-5">
                Two hotel groups. <em>Same finding: half the data was missing.</em>
              </h2>
            </div>
            <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
              Palladium Hotel Group and Dreamplace Hotels both ran Sealmetrics next to their existing stack. Both found a structural gap. Both started taking paid-media decisions on the recovered data — not on what each platform reports back to itself.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Palladium card */}
            <article className="bg-white border border-warm-100 rounded-2xl p-8 md:p-10 flex flex-col gap-6">
              <div className="h-12 flex items-center">
                <Picture
                  src="/logos/clients/palladium-dark.svg"
                  alt="Palladium Hotel Group"
                  width={200}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <header className="flex items-baseline justify-between flex-wrap gap-3 pb-5 border-b border-warm-100">
                <span className="text-[18px] font-semibold text-ink tracking-[-0.015em]">
                  Palladium Hotel Group
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
                  Hotels · Spain · ~5 brands
                </span>
              </header>

              <blockquote
                className="border-l-[3px] pl-5 italic"
                style={{ borderColor: "#2E5C8A" }}
              >
                <p className="text-[18.5px] leading-[1.4] tracking-[-0.01em] font-medium text-ink">
                  &ldquo;The data Sealmetrics delivers is agnostic, unbiased and neutral. There&apos;s no black box.&rdquo;
                </p>
                <cite className="block mt-3 not-italic font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
                  Toni Andújar · Digital &amp; Direct Sales Director
                </cite>
              </blockquote>

              <ul className="grid grid-cols-3 gap-4 pt-5 border-t border-warm-100">
                {[
                  { n: "40%", l: "Traffic with no attribution before" },
                  { n: "35%", l: "Bookings unattributed in GA4" },
                  { n: "+165%", l: "Display CPS improvement (DV360)" },
                ].map((s) => (
                  <li key={s.l}>
                    <div className="text-[24px] font-semibold tracking-[-0.025em] text-ink leading-none tabular-nums">
                      {s.n}
                    </div>
                    <div className="text-[12.5px] text-ink-soft mt-2 leading-[1.4]">
                      {s.l}
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/case-studies/palladium-hotel-group"
                className="inline-flex items-center gap-1.5 mt-2 text-[14.5px] font-semibold text-ink no-underline border-b border-warm-200 hover:border-ink self-start"
              >
                Read the Palladium case study <span>→</span>
              </Link>
            </article>

            {/* Dreamplace card */}
            <article className="bg-white border border-warm-100 rounded-2xl p-8 md:p-10 flex flex-col gap-6">
              <div className="h-12 flex items-center">
                <Picture
                  src="/logos/clients/dreamplace.svg"
                  alt="Dreamplace Hotels"
                  width={200}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <header className="flex items-baseline justify-between flex-wrap gap-3 pb-5 border-b border-warm-100">
                <span className="text-[18px] font-semibold text-ink tracking-[-0.015em]">
                  Dreamplace Hotels
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
                  Hotels · Spain · ~2 yrs using
                </span>
              </header>

              <blockquote
                className="border-l-[3px] pl-5 italic"
                style={{ borderColor: "#2E5C8A" }}
              >
                <p className="text-[18.5px] leading-[1.4] tracking-[-0.01em] font-medium text-ink">
                  &ldquo;What it gives us is what we&apos;ve always needed: data as real as possible, as close to reality as possible.&rdquo;
                </p>
                <cite className="block mt-3 not-italic font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
                  Eduardo Martin · Analytics & Campaigns · Dreamplace
                </cite>
              </blockquote>

              <ul className="grid grid-cols-3 gap-4 pt-5 border-t border-warm-100">
                {[
                  { n: "+30%", l: "More traffic vs Google Analytics" },
                  { n: "15–20%", l: "Sales attribution gap closed (vs CRM)" },
                  { n: "Meta + Google", l: "First channels using Sealmetrics data to decide" },
                ].map((s) => (
                  <li key={s.l}>
                    <div className="text-[24px] font-semibold tracking-[-0.025em] text-ink leading-none tabular-nums">
                      {s.n}
                    </div>
                    <div className="text-[12.5px] text-ink-soft mt-2 leading-[1.4]">
                      {s.l}
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/case-studies/dreamplace-hotels"
                className="inline-flex items-center gap-1.5 mt-2 text-[14.5px] font-semibold text-ink no-underline border-b border-warm-200 hover:border-ink self-start"
              >
                Read the Dreamplace case study <span>→</span>
              </Link>
            </article>
          </div>

              <p className="mt-10 text-center text-[15px] text-ink-soft">
                Different sizes. Different tech stacks. Same diagnosis: incomplete data was driving budget decisions until Sealmetrics replaced it with the real number.
              </p>
            </div>
          </section>
        }
      />

      <TldrBlock
        label="Cookieless analytics for hotels"
        answer={
          <>
            <strong>Cookieless analytics for hotels</strong> lets hotel groups
            reconcile aggregate direct-booking totals with the PMS without cookies,
            consent banners or ad-blocker gaps. Sealmetrics counts
            meta-search landings, mobile Safari visits and booking events
            anonymously, whether or not the visitor accepts a banner — each booking attributed last-click at channel level and
            rolled up across properties for portfolio-level revenue reporting.
          </>
        }
        bullets={[
          <>Recovers ~25% of CRM bookings typically invisible to GA4.</>,
          <>Aggregate channel totals for meta-search (Google Hotel Ads, Trivago) without OTA black-box dependency.</>,
          <>Native PMS integrations: Mews, Cloudbeds, Opera; REST API for any other stack.</>,
          <>No per-guest journey tracking — aggregate counts only, defensible under GDPR.</>,
        ]}
      />

      <RelatedPagesV3
        locale="en"
        eyebrow="Also explore"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
          {
            href: "/blog/cookieless-analytics-for-hotels",
            title: "Guide: Cookieless analytics for hotels",
            desc: "How hotel groups measure direct bookings in 2026.",
          },
          {
            href: "/glossary/cookieless-analytics",
            title: "What is cookieless analytics",
            desc: "Definition, how it works, why it matters.",
          },
          {
            href: "/for/ecommerce",
            title: "For eCommerce",
            desc: "Shopify, Magento and DTC checkout attribution.",
          },
        ]}
      />
      <LogosStrip />
    </>
  );
}
