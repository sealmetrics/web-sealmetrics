import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/legal/LegalPage";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

/* The model text customers copy into their own privacy policy (DPA clause 3.6.a).
   It is the `{{template_url}}` of the September 2026 notice email.

   noindex/follow by decision: it is a working document for customers, reached from
   that email and the dashboard, and a search result or an AI answer quoting it would
   present model wording for someone else's website as Sealmetrics' own policy. */
export const metadata: Metadata = {
  title: "Privacy Template for Customers — Sealmetrics",
  description:
    "Model wording for the analytics section of a Sealmetrics customer's privacy policy: Block A always, Blocks B to F by configuration. Version 3.0.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Privacy Template for Sealmetrics Customers",
    description:
      "Model wording for the analytics section of your privacy policy, by the features you have enabled. Version 3.0.",
    url: "https://sealmetrics.com/privacy-template/",
    siteName: "Sealmetrics",
    type: "website",
    locale: "en_US",
    images: [ogImage("/privacy-template/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Privacy Template for Sealmetrics Customers",
    description:
      "Model wording for the analytics section of your privacy policy, by the features you have enabled. Version 3.0.",
    images: [ogImage("/privacy-template/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/privacy-template/",
    languages: { es: "https://sealmetrics.com/es/privacy-template/" },
  },
};

/** The text is `src/lib/content/legal/privacy-template.en.md`, synced from sealmetrics2
 * by `scripts/sync-legal.mjs` — edit it there, not here. */
export default function PrivacyTemplatePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy/" }, { label: "Template for customers" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Privacy Policy", url: "/privacy" },
          { name: "Template for customers", url: "/privacy-template" },
        ])}
      />
      <LegalPage
        doc="privacy-template"
        locale="en"
        title="Privacy policy template for Sealmetrics customers"
        alternate="/es/privacy-template/"
        copyBlocks
      />
    </>
  );
}
