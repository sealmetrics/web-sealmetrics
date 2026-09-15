import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { BIGQUERY_PUBLISHED, bigqueryEs as content } from "@/lib/content/problem-landings/bigquery";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/integrations/bigquery";
const TITLE = "Exportación a BigQuery sin cookies — Sealmetrics";
const DESCRIPTION =
  "Exporta Sealmetrics a BigQuery: tráfico, conversiones e ingresos por canal en tu proyecto, cada hora o cada día, con el esquema y SQL de ejemplo.";
const SOCIAL =
  "Exportar GA4 copia dato con consentimiento a tu data warehouse. El conector de Sealmetrics escribe tablas de canal e ingresos medidas sin pérdida por consentimiento.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Exportación a BigQuery sin cookies — Sealmetrics",
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: SOCIAL,
    type: "article",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "es_ES",
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
    languages: getAlternatesEs("/integrations/bigquery"),
  },
};

export default function BigQueryIntegrationPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Integraciones", url: "/es/integrations" }, { name: "BigQuery", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Exportar analítica sin cookies a BigQuery: configuración, esquema, SQL y límites",
          description: DESCRIPTION,
          datePublished: BIGQUERY_PUBLISHED,
          dateModified: BIGQUERY_PUBLISHED,
          url: URL,
          category: "Integration",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <JsonLd data={howToSchema({ name: content.method.howToName, description: content.method.howToDescription, url: URL, steps: content.method.steps })} />
      {content.proof.quote && <JsonLd data={quotationSchema({ text: content.proof.quote.text, spokenBy: content.proof.quote.person, spokenByRole: content.proof.quote.role, url: URL })} />}
      <ProblemLandingSignal content={content} />
    </>
  );
}
