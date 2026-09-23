import type { Metadata } from "next";
import { BrandReportThankYou } from "@/components/v4/BrandReportThankYou";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-monitoring-signal.css";

const title = "Your brand report is on its way — Sealmetrics";
const description =
  "Seventeen models are answering the six questions about your company right now. The report reaches your inbox in about five minutes.";
const url = "https://sealmetrics.com/ai-brand-monitoring/thank-you/";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [ogImage("/ai-brand-monitoring/thank-you/")],
    url,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title,
    description,
    images: [ogImage("/ai-brand-monitoring/thank-you/")],
  },
  alternates: { canonical: url },
  // Confirmation pages are for the person who just submitted, not for search.
  // Keeping them out of the sitemap and llms.txt is derived from this — never
  // from a hand-maintained list. See CLAUDE.md, SEO rules.
  robots: { index: false, follow: false },
};

export default function BrandReportThankYouPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "AI brand monitoring", url: "/ai-brand-monitoring" },
          { name: "Thank you", url: "/ai-brand-monitoring/thank-you" },
        ])}
      />
      <BrandReportThankYou locale="en" />
    </>
  );
}
