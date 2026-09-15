import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { META_ADS_PUBLISHED, metaAdsEn as content } from "@/lib/content/problem-landings/meta-ads";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/integrations/meta-ads";
const TITLE = "Meta Ads Revenue Tracking Without Cookies — Sealmetrics";
const DESCRIPTION =
  "Track Meta Ads campaigns, ad sets and creatives in Sealmetrics with UTM parameters, measured without consent loss. Setup, parameters and what it does not do.";
const SOCIAL =
  "Meta reports the results it credits. Sealmetrics measures revenue by campaign, ad set and creative without consent loss, beside Meta's own figure.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Meta Ads Revenue Tracking Without Cookies — Sealmetrics",
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
    languages: getAlternates("/integrations/meta-ads"),
  },
};

export default function MetaAdsIntegrationPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Integrations", url: "/integrations" }, { name: "Meta Ads", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Tracking Meta Ads without cookies: URL parameters, reconciliation and limits",
          description: DESCRIPTION,
          datePublished: META_ADS_PUBLISHED,
          dateModified: META_ADS_PUBLISHED,
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
