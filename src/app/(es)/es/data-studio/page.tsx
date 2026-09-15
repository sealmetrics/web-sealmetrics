import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { DATA_STUDIO_PUBLISHED, dataStudioEs as content } from "@/lib/content/problem-landings/data-studio";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/data-studio";
const TITLE = "Informe y conector para Data Studio — Sealmetrics";
const DESCRIPTION =
  "Un informe de Data Studio listo sobre datos de Sealmetrics: siete tipos de informe, copia en un clic, conector con API key de solo lectura y límites.";
const SOCIAL =
  "Un informe de Data Studio sobre GA4 solo ve a quien aceptó el banner. Copia la plantilla de Sealmetrics e informa sobre datos sin pérdida por consentimiento.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Informe y conector para Data Studio — Sealmetrics",
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
    languages: getAlternatesEs("/data-studio"),
  },
};

export default function DataStudioPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Integraciones", url: "/es/integrations" }, { name: "Data Studio", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "El informe de Sealmetrics para Data Studio: plantilla, conector, configuración y límites",
          description: DESCRIPTION,
          datePublished: DATA_STUDIO_PUBLISHED,
          dateModified: DATA_STUDIO_PUBLISHED,
          url: URL,
          category: "Integration",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <JsonLd data={howToSchema({ name: content.method.howToName, description: content.method.howToDescription, url: URL, steps: content.method.steps })} />
      <ProblemLandingSignal content={content} />
    </>
  );
}
