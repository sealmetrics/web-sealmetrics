import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { BIGQUERY_PUBLISHED, bigqueryEn as content } from "@/lib/content/problem-landings/bigquery";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/integrations/bigquery";
const TITLE = "BigQuery Export for Cookieless Analytics — Sealmetrics";
const DESCRIPTION =
  "Export Sealmetrics to BigQuery: traffic, conversions and revenue by channel in your own project, hourly or daily, with the schema and example SQL.";
const SOCIAL =
  "A GA4 export copies consent-gated data into your warehouse. The Sealmetrics connector writes channel and revenue tables measured without consent loss.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "BigQuery Export for Cookieless Analytics — Sealmetrics",
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
    languages: getAlternates("/integrations/bigquery"),
  },
};

export default function BigQueryIntegrationPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Integrations", url: "/integrations" }, { name: "BigQuery", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Exporting cookieless analytics to BigQuery: setup, schema, SQL and limits",
          description: DESCRIPTION,
          datePublished: BIGQUERY_PUBLISHED,
          dateModified: BIGQUERY_PUBLISHED,
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
