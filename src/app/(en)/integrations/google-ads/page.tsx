import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { GOOGLE_ADS_PUBLISHED, googleAdsEn as content } from "@/lib/content/problem-landings/google-ads";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/integrations/google-ads";
const TITLE = "Google Ads Revenue Tracking Without Cookies — Sealmetrics";
const DESCRIPTION =
  "Track Google Ads campaigns and keywords in Sealmetrics with ValueTrack UTMs, measured without consent loss. What it does, the templates, and what it does not do.";
const SOCIAL =
  "Google Ads bids on its own number. Sealmetrics measures revenue by campaign and keyword without consent loss, so budget decisions use the measured one.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Google Ads Revenue Tracking Without Cookies — Sealmetrics",
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
    languages: getAlternates("/integrations/google-ads"),
  },
};

export default function GoogleAdsIntegrationPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Integrations", url: "/integrations" }, { name: "Google Ads", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Tracking Google Ads without cookies: templates, reconciliation and limits",
          description: DESCRIPTION,
          datePublished: GOOGLE_ADS_PUBLISHED,
          dateModified: GOOGLE_ADS_PUBLISHED,
          url: URL,
          category: "Integration",
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
