import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/legal/LegalPage";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Terms of Service — Sealmetrics",
  description: "Sealmetrics Terms of Service (v2.1): plans, billing, acceptable use, data ownership, liability and termination.",
  openGraph: {
    title: "Terms of Service — Sealmetrics",
    description:
      "Conditions for using the Sealmetrics web analytics platform: plans, billing, acceptable use, data ownership, liability and termination.",
    type: "website",
    images: [ogImage("/terms/")],
    url: "https://sealmetrics.com/terms/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Terms of Service — Sealmetrics",
    description: "Conditions for using the Sealmetrics web analytics platform: plans, billing, acceptable use, data ownership, liability and termination.",
    images: [ogImage("/terms/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/terms/",
    languages: { es: "https://sealmetrics.com/es/terms/" },
  },
};

/** The text is `src/lib/content/legal/terms.en.md`, synced from sealmetrics2 by
 * `scripts/sync-legal.mjs` — edit it there, not here. */
export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Terms of Service", url: "/terms" }])} />
      <LegalPage doc="terms" locale="en" title="Terms of Service" alternate="/es/terms/" />
    </>
  );
}
