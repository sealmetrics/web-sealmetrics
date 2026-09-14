import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { COMPLETE_DATA_MODIFIED, COMPLETE_DATA_PUBLISHED, completeDataEn as content } from "@/lib/content/problem-landings/complete-data";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/complete-data";
const TITLE = "Complete Data — When GA4 Doesn't Reflect Reality";
const DESCRIPTION =
  "GA4 misses a large, uneven share of EU traffic. What a Shopify store measured over 48 days showed, why it happens and how to measure your own gap.";
const SOCIAL =
  "On one Shopify store measured side by side for 48 days, GA4 did not record 29% of visits. Why it happens, what it costs and how to measure yours.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Complete Data — When GA4 Doesn't Reflect Reality",
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: SOCIAL,
    type: "article",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: TITLE,
    description: SOCIAL,
    images: [ogImage(`${URL}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(URL),
  },
};

export default function CompleteDataPillar() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Complete data", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "GA4 is not showing you what really happened: complete data, measured",
          description: DESCRIPTION,
          datePublished: COMPLETE_DATA_PUBLISHED,
          dateModified: COMPLETE_DATA_MODIFIED,
          url: URL,
          category: "Strategy",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <JsonLd data={howToSchema({ name: content.method.howToName, description: content.method.howToDescription, url: URL, steps: content.method.steps })} />
      {content.proof.quote && <JsonLd data={quotationSchema({ text: content.proof.quote.text, spokenBy: content.proof.quote.person, spokenByRole: content.proof.quote.role, url: URL })} />}
      <ProblemLandingSignal content={content} />
    </>
  );
}
