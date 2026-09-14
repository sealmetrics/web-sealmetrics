import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { REVENUE_ATTRIBUTION_MODIFIED, REVENUE_ATTRIBUTION_PUBLISHED, revenueAttributionEn as content } from "@/lib/content/problem-landings/revenue-attribution";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/use-cases/revenue-attribution";
const TITLE = "Revenue Attribution Without Cookies: Which Campaigns Sell";
const DESCRIPTION =
  "See which channel, campaign and creative sold, including visitors who reject cookies. How it works, how to set it up, the limits, and measured cases.";
const SOCIAL =
  "Ad platforms grade their own ads and GA4 misses visitors who reject cookies. Attribute revenue to campaign and creative on every session instead.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Revenue Attribution Without Cookies: Which Campaigns Sell",
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
    languages: getAlternates("/use-cases/revenue-attribution"),
  },
};

export default function RevenueAttributionPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Use cases", url: "/use-cases" }, { name: "Revenue attribution", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Your campaigns are judged on the visitors who clicked accept: revenue attribution without cookies",
          description: DESCRIPTION,
          datePublished: REVENUE_ATTRIBUTION_PUBLISHED,
          dateModified: REVENUE_ATTRIBUTION_MODIFIED,
          url: URL,
          category: "Attribution",
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
