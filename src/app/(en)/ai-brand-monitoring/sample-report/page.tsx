import type { Metadata } from "next";
import { BrandReportSample } from "@/components/v4/BrandReportSample";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-report-viewer.css";

const title = "Sample AI brand report — Acme Coffee | Sealmetrics";
const description =
  "The full AI brand monitoring report, made for a fictional coffee brand: nineteen models, six questions, every answer kept whole. See it before you ask for yours.";
const url = "https://sealmetrics.com/ai-brand-monitoring/sample-report/";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [ogImage("/ai-brand-monitoring/sample-report/")],
    url,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title,
    description,
    images: [ogImage("/ai-brand-monitoring/sample-report/")],
  },
  alternates: { canonical: url },
  // A sample built on a fictional brand: its answers are invented and attributed to real
  // model names, so it is kept out of search and of the Markdown twin. The sitemap and
  // llms.txt derive that from here.
  robots: { index: false, follow: true },
};

export default function BrandReportSamplePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "AI brand monitoring", url: "/ai-brand-monitoring" },
          { name: "Sample report", url: "/ai-brand-monitoring/sample-report" },
        ])}
      />
      <BrandReportSample locale="en" />
    </>
  );
}
