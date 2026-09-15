import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import {
  breadcrumbSchema,
  verticalSoftwareApplicationSchema,
} from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { LogosStrip } from "@/components/sections/v3/HomeV3";
import { VerticalPageV3 } from "@/components/sections/v3/VerticalPageV3";
import { RelatedPagesV3 } from "@/components/sections/v3/RelatedPagesV3";
import { getVerticalData } from "@/components/sections/v3/VerticalsData";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Analytics for Media & Publishers | Sealmetrics",
  description:
    "Cookieless analytics for publishers: capture readers ad blockers hide from GA4. First-party audience, engagement and subscription attribution, EU-hosted.",
  openGraph: {
    title: "Analytics for Media & Publishers | Sealmetrics",
    description:
      "Consentless analytics built for European media companies. Audience measurement, subscription funnels and ad-revenue attribution without cookies.",
    type: "website",
    images: [ogImage("/for/media/")],
    url: "https://sealmetrics.com/for/media/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analytics for Media & Publishers | Sealmetrics",
    description: "Consentless analytics built for European media companies. Audience measurement, subscription funnels and ad-revenue attribution without cookies.",
    images: [ogImage("/for/media/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/for/media/",
    languages: getAlternates("/for/media"),
  },
};

const seoFaqs = [
  {
    question: "What is cookieless analytics for media and publishers?",
    answer:
      "Cookieless analytics for publishers captures readership, engagement and subscription funnel data without cookies, localStorage or fingerprinting. It holds up far better against ad blockers (which affect 50–70% of media audiences) because it can run first-party on the publisher's own domain.",
  },
  {
    question: "How does cookieless analytics help publishers under heavy ad-blocker pressure?",
    answer:
      "Media audiences have the highest ad-blocker penetration on the open web (50–70% on tech and news sites). Cookieless analytics runs first-party from the publisher's domain, so the lists ad blockers use — which target third-party analytics endpoints like google-analytics.com — don't match it. In our test of five major blockers it passed all five.",
  },
  {
    question: "Can cookieless analytics measure subscription conversion?",
    answer:
      "Yes, at channel-total level. Aggregate counts at each funnel step (article landings, paywall impressions, subscription events) are captured, and each subscription event is attributed last-click to the traffic source recorded on that pageview. Revenue flows back via REST API so subscription value can be attributed to acquisition channel on EU traffic without consent gaps. Note: this is aggregate channel attribution, not per-subscriber journey tracking.",
  },
  {
    question: "Does cookieless analytics replace Chartbeat or Parse.ly?",
    answer:
      "Different categories. Chartbeat and Parse.ly are real-time editorial tools for newsrooms. Sealmetrics covers audience, attribution and subscription funnels. Many publishers run both: Chartbeat for the newsroom, Sealmetrics for marketing and subscription decisions.",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "For Media" }]} />
      <JsonLd
        data={breadcrumbSchema([{ name: "For Media", url: "/for/media" }])}
      />
      <JsonLd
        data={verticalSoftwareApplicationSchema({
          vertical: "Media & Publishers",
          audienceType: "European media companies, publishers and digital newsrooms",
          description:
            "Cookieless analytics for media and publishers: audience measurement, subscription funnels and ad-revenue attribution on first-party infrastructure that holds up against ad blockers.",
          url: "/for/media",
        })}
      />

      <VerticalPageV3 data={getVerticalData("media", "en")} />

      <TldrBlock
        label="Cookieless analytics for media & publishers"
        answer={
          <>
            <strong>Cookieless analytics for media and publishers</strong>{" "}
            captures readership, subscription funnels and ad-revenue attribution
            without cookies — critical for sites where 50–70% of visitors run
            ad blockers. Sealmetrics operates as first-party infrastructure on
            the publisher's own domain, off the third-party lists ad blockers use and
            independent of third-party cookie deprecation.
          </>
        }
        bullets={[
          <>Recovers readers that ad blockers hide from GA4, where 50–70% of visitors on tech and news sites use one.</>,
          <>Funnel step counts by channel: article landings, paywall impressions, subscription events — each subscription attributed last-click at channel level.</>,
          <>First-party architecture is unaffected by third-party cookie limits in Safari ITP and Firefox ETP.</>,
        ]}
      />

      <RelatedPagesV3
        locale="en"
        eyebrow="Also explore"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
          {
            href: "/glossary/ad-blocker-analytics-impact",
            title: "Ad-blocker impact on analytics",
            desc: "How ad blockers affect measurement on media sites.",
          },
          {
            href: "/glossary/cookieless-analytics",
            title: "What is cookieless analytics",
            desc: "Definition, how it works, why it matters.",
          },
          {
            href: "/for/ecommerce",
            title: "For eCommerce publishers",
            desc: "Commerce-focused publishing brands.",
          },
        ]}
      />
      <LogosStrip />
    </>
  );
}
