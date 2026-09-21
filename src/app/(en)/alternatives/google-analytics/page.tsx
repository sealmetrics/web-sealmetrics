import type { Metadata } from "next";
import { competitor } from "@/lib/content/competitors";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, comparisonPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { LogosStrip } from "@/components/sections/v3/HomeV3";
import { VsComparisonV3 } from "@/components/sections/v3/VsComparisonV3";
import { getVsData } from "@/components/sections/v3/VsData";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Google Analytics Alternatives — Sealmetrics",
  description: "Looking for a GA alternative that doesn't commoditize your data? Sealmetrics is a different category: complete, EU-hosted, enterprise-grade.",
  openGraph: {
    title: "Google Analytics Alternatives — Sealmetrics",
    description: "Looking for a GA alternative that doesn't commoditize your data? Sealmetrics is a different category: complete, EU-hosted, enterprise-grade.",
    type: "website",
    images: [ogImage("/alternatives/google-analytics/")],
    url: "https://sealmetrics.com/alternatives/google-analytics/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Google Analytics Alternatives — Sealmetrics",
    description: "Looking for a GA alternative that doesn't commoditize your data? Sealmetrics is a different category: complete, EU-hosted, enterprise-grade.",
    images: [ogImage("/alternatives/google-analytics/")],
  },
  alternates: { canonical: "https://sealmetrics.com/alternatives/google-analytics/", languages: getAlternates("/alternatives/google-analytics") },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Google Analytics alternatives" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Google Analytics alternatives", url: "/alternatives/google-analytics" }])} />
      <JsonLd data={comparisonPageSchema({
        name: "Google Analytics alternatives — Sealmetrics",
        description: "Enterprise alternative to Google Analytics for European companies that need complete data, EU residency and decision-grade attribution.",
        url: "/alternatives/google-analytics",
        competitor: competitor("google-analytics"),
        datePublished: "2026-04-15",
        dateModified: "2026-09-21",
        author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez" },
        criteria: [
          "Cookie-free data capture vs Consent Mode modelling",
          "EU consent-rejection traffic loss",
          "Data residency and Schrems II posture",
          "Sampling at scale",
          "BigQuery export full resolution",
          "What an AI agent can read (full dataset vs post-consent subset)",
          "Pricing and data ownership",
        ],
      })} />
      <VsComparisonV3 data={getVsData("google-analytics", "en")} dateModified="2026-09-21" />
      <LogosStrip />
      
    </>
  );
}
