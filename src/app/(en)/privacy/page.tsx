import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/legal/LegalPage";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Privacy Policy — Sealmetrics",
  description:
    "Sealmetrics privacy policy (v4.0): what data we process, on what basis, how long we keep it and how to exercise your rights.",
  openGraph: {
    title: "Privacy Policy — Sealmetrics",
    description:
      "What data Sealmetrics processes, on what basis, how long it keeps it and how to exercise your rights.",
    type: "website",
    images: [ogImage("/privacy/")],
    url: "https://sealmetrics.com/privacy/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Privacy Policy — Sealmetrics",
    description: "What data Sealmetrics processes, on what basis, how long it keeps it and how to exercise your rights.",
    images: [ogImage("/privacy/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/privacy/",
    languages: { es: "https://sealmetrics.com/es/privacy/" },
  },
};

/** The text is `src/lib/content/legal/privacy.en.md`, synced from sealmetrics2 by
 * `scripts/sync-legal.mjs` — edit it there, not here. */
export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Privacy Policy", url: "/privacy" }])} />
      <LegalPage doc="privacy" locale="en" title="Privacy Policy" alternate="/es/privacy/" />
    </>
  );
}
