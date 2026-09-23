import type { Metadata } from "next";
import { BrandMonitoringSignal, brandMonitoringFaq } from "@/components/v4/BrandMonitoringSignal";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqPageSchema, servicePageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-monitoring-signal.css";

const description =
  "Free report: seventeen AI models, among them GPT-5.6, Claude, Gemini and Perplexity, answer six questions about your company from memory. Read every answer.";
const url = "https://sealmetrics.com/ai-brand-monitoring/";

// The title is written out here rather than referenced from a constant because
// `scripts/generate-og-images.mjs` reads it out of this file with a regex to name the
// social card. A `title,` shorthand builds fine and silently ships the generic card.
export const metadata: Metadata = {
  title: "AI Brand Monitoring — What AI Models Say About You",
  description,
  openGraph: {
    title: "AI Brand Monitoring — What AI Models Say About You",
    description,
    type: "website",
    images: [ogImage("/ai-brand-monitoring/")],
    url,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "AI Brand Monitoring — What AI Models Say About You",
    description,
    images: [ogImage("/ai-brand-monitoring/")],
  },
  alternates: { canonical: url, languages: getAlternates("/ai-brand-monitoring") },
};

export default function AiBrandMonitoringPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "AI brand monitoring", url: "/ai-brand-monitoring" }])} />
      <JsonLd
        data={servicePageSchema({
          name: "AI brand monitoring report",
          description:
            "A free report that asks seventeen AI models, including GPT-5.6, Claude Opus 5, Claude Sonnet 5, Gemini 3.8 Flash and Perplexity Sonar, six fixed questions about a company, without web search, and returns every answer verbatim with the factual errors marked.",
          url: "/ai-brand-monitoring",
          audience: "Marketing and communications teams",
        })}
      />
      <JsonLd data={faqPageSchema(brandMonitoringFaq.en.map((item) => ({ ...item })), "/ai-brand-monitoring")} />
      <BrandMonitoringSignal locale="en" />
    </>
  );
}
