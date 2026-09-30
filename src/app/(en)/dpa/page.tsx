import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/legal/LegalPage";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Data Processing Agreement — Sealmetrics",
  description: "Sealmetrics DPA (2026-v2.2): Article 28 GDPR, AEPD audience-measurement guarantees, EU-only processing, sub-processors and security measures.",
  openGraph: {
    title: "Data Processing Agreement — Sealmetrics",
    description:
      "Article 28 GDPR DPA: AEPD audience-measurement guarantees, EU-only processing, sub-processors and security measures.",
    type: "website",
    images: [ogImage("/dpa/")],
    url: "https://sealmetrics.com/dpa/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Data Processing Agreement — Sealmetrics",
    description: "Article 28 GDPR DPA: AEPD audience-measurement guarantees, EU-only processing, sub-processors and security measures.",
    images: [ogImage("/dpa/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/dpa/",
    languages: { es: "https://sealmetrics.com/es/dpa/" },
  },
};

/** The text is `src/lib/content/legal/dpa.en.md`, synced from sealmetrics2 by
 * `scripts/sync-legal.mjs` — edit it there, not here. */
export default function DpaPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "DPA" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "DPA", url: "/dpa" }])} />
      <LegalPage doc="dpa" locale="en" title="Data Processing Agreement" alternate="/es/dpa/" />
    </>
  );
}
