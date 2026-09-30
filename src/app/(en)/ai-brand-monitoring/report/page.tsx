import type { Metadata } from "next";
import { BrandReportViewer } from "@/components/v4/BrandReportViewer";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-report-viewer.css";

const title = "Your full AI brand report — Sealmetrics";
const description =
  "The full report on what nineteen AI models say about your brand, behind the private link sent by email. It stays online for 30 days.";
const url = "https://sealmetrics.com/ai-brand-monitoring/report/";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [ogImage("/ai-brand-monitoring/report/")],
    url,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title,
    description,
    images: [ogImage("/ai-brand-monitoring/report/")],
  },
  alternates: { canonical: url },
  // Each report is reached only through its private link, and without the token
  // after the `#` the page shows nothing. It is for the person who asked for the
  // report, never for search; the sitemap and llms.txt derive that from here.
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function BrandReportViewerPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "AI brand monitoring", url: "/ai-brand-monitoring" },
          { name: "Full report", url: "/ai-brand-monitoring/report" },
        ])}
      />
      <BrandReportViewer locale="en" />
    </>
  );
}
