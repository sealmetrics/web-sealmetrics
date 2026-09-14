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
  title: "Analytics for eCommerce — Full Attribution | Sealmetrics",
  description:
    "Cookieless analytics for eCommerce: no consent-driven data loss, last-click revenue attribution, no consent banner, EU-hosted in Dublin. From EUR499/mo.",
  openGraph: {
    title: "Analytics for eCommerce — Full Attribution | Sealmetrics",
    description:
      "GDPR-compliant, consentless analytics built for DTC and retail eCommerce. Measures EU traffic without consent loss and reconciles with your Shopify/Magento CRM.",
    type: "website",
    images: [ogImage("/for/ecommerce/")],
    url: "https://sealmetrics.com/for/ecommerce/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analytics for eCommerce — Full Attribution | Sealmetrics",
    description: "GDPR-compliant, consentless analytics built for DTC and retail eCommerce. Measures EU traffic without consent loss and reconciles with your Shopify/Magento CRM.",
    images: [ogImage("/for/ecommerce/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/for/ecommerce/",
    languages: getAlternates("/for/ecommerce"),
  },
};

const seoFaqs = [
  {
    question: "What is cookieless analytics for eCommerce?",
    answer:
      "Cookieless analytics for eCommerce is a measurement approach that captures every visitor, add-to-cart, checkout and purchase without using browser cookies, localStorage or fingerprinting. This avoids the 40–60% EU traffic loss caused by consent banners and matches Shopify, WooCommerce or Magento backend data with marketing attribution.",
  },
  {
    question: "Why does cookieless analytics matter for DTC eCommerce in Europe?",
    answer:
      "European DTC brands lose between 40% and 60% of traffic to cookie consent rejection, plus another ~25% to ad blockers. The result is that GA4 and Meta Pixel show 13–40% of real traffic. Cookieless analytics eliminates those gaps by operating as first-party server-side infrastructure on the merchant's own domain.",
  },
  {
    question: "Does cookieless analytics for eCommerce require a consent banner?",
    answer:
      "No. Because no cookies, localStorage or personal identifiers are used, no consent is required under GDPR or ePrivacy for the analytics itself. You can still display a banner for advertising pixels; Sealmetrics operates independently of it.",
  },
  {
    question: "Can cookieless analytics replace GA4 for an eCommerce team?",
    answer:
      "Yes for revenue decisions; usually not for Google Ads conversion import. Most eCommerce teams run Sealmetrics alongside GA4 for 30 days to compare, then make decisions on Sealmetrics data and keep GA4 as a Google Ads conduit.",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "For eCommerce" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "For eCommerce", url: "/for/ecommerce" },
        ])}
      />
      <JsonLd
        data={verticalSoftwareApplicationSchema({
          vertical: "eCommerce",
          audienceType: "DTC and retail eCommerce teams",
          description:
            "Cookieless analytics for eCommerce: first-party measurement that reconciles with Shopify, WooCommerce and Magento backends without consent banners. Designed for GDPR from the architecture up (self-assessed).",
          url: "/for/ecommerce",
        })}
      />

      <VerticalPageV3 data={getVerticalData("ecommerce", "en")} />

      <TldrBlock
        label="Cookieless analytics for eCommerce"
        answer={
          <>
            <strong>Cookieless analytics for eCommerce</strong> means capturing
            every visit, add-to-cart and purchase without browser cookies,
            consent banners or ad-blocker gaps — and reconciling those numbers
            with your Shopify, WooCommerce or Magento backend. Sealmetrics is a
            first-party, EU-hosted implementation built specifically for DTC
            and retail eCommerce teams under GDPR.
          </>
        }
        bullets={[
          <>Captures the 40–60% of EU visitors GA4 loses to consent rejection.</>,
          <>Reconciles to within 15–20% of your actual CRM revenue — defensible in a board meeting.</>,
          <>Works natively with Shopify Plus, WooCommerce, Magento 2, PrestaShop and OpenCart.</>,
        ]}
      />

      <RelatedPagesV3
        locale="en"
        eyebrow="Also explore"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
          {
            href: "/blog/cookieless-analytics-for-ecommerce",
            title: "Guide: Cookieless analytics for eCommerce",
            desc: "Complete 2026 guide for DTC and retail teams.",
          },
          {
            href: "/glossary/cookieless-analytics",
            title: "What is cookieless analytics",
            desc: "Definition, how it works, why it matters.",
          },
          {
            href: "/for/hotels",
            title: "For hotels",
            desc: "eCommerce with booking-specific attribution.",
          },
        ]}
      />
      <LogosStrip />
    </>
  );
}
