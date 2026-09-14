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
    "Cookieless analytics for eCommerce: 100% traffic captured, last-click revenue attribution, no consent banner, EU-hosted in Dublin. From EUR499/mo.",
  openGraph: {
    title: "Analytics for eCommerce — Full Attribution | Sealmetrics",
    description:
      "GDPR-compliant, consentless analytics built for DTC and retail eCommerce. Captures 100% of EU traffic and reconciles with your Shopify/Magento CRM.",
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
    description: "GDPR-compliant, consentless analytics built for DTC and retail eCommerce. Captures 100% of EU traffic and reconciles with your Shopify/Magento CRM.",
    images: [ogImage("/for/ecommerce/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/for/ecommerce/",
    languages: getAlternates("/for/ecommerce"),
  },
};

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
            "Cookieless analytics for eCommerce: first-party measurement that reconciles with Shopify, WooCommerce and Magento backends without consent banners. GDPR-compliant by architecture.",
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
          <>Counts the visits consent-based analytics loses: at Incapto, GA4 did not record 29% of visits over 48 days on Shopify.</>,
          <>Checkable against your backend: Sealmetrics recorded 96% of Incapto's real online-store orders and 97% of revenue.</>,
          <>Native modules for Shopify (any plan), WooCommerce, Magento 2, PrestaShop and OpenCart.</>,
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
