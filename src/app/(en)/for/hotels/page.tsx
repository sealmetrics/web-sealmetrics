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
    "Cookieless analytics for hotels, checkable against the PMS. Palladium found 35% of GA4 bookings with no channel; Dreamplace attributes 15–20% more sales.",
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
                Two hotel groups. <em>Same finding: the channel picture was incomplete.</em>
              </h2>
            </div>
            <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
              Palladium Hotel Group and Dreamplace Hotels both ran Sealmetrics next to their existing stack. Both found a structural gap — 40% of inbound traffic with no source at Palladium, roughly 30% more traffic than Google Analytics at Dreamplace. Both now take paid-media decisions on that complete view, not on what each platform reports back to itself.
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
                  { n: "15–20%", l: "More sales attributed (vs previous tool)" },
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
            consent banners or ad-blocker gaps. Sealmetrics counts every
            meta-search landing, every mobile Safari visit and every booking event
            anonymously — each booking attributed last-click at channel level and
            rolled up across properties for portfolio-level revenue reporting.
          </>
        }
        bullets={[
          <>Palladium Hotel Group: 35% of the bookings GA4 recorded had no channel.</>,
          <>Aggregate channel totals for meta-search (Google Hotel Ads, Trivago) without OTA black-box dependency.</>,
          <>No PMS plugin needed: booking-engine conversions arrive as standard events, and the REST API and webhooks reconcile them against Mews, Cloudbeds, Opera or any other PMS.</>,
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
