import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { DPO_MODIFIED, DPO_PUBLISHED_ES, dpoEs as content } from "@/lib/content/problem-landings/dpo";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/for/dpo";
const TITLE = "Analítica para DPOs: la revisión del proveedor — Sealmetrics";
const DESCRIPTION =
  "Revisar la analítica web como DPO: anexos del DPA del artículo 28, conservación fija, nada en el dispositivo y subencargados de la UE, sin certificaciones.";
const SOCIAL =
  "Lo que un DPO necesita de un proveedor de analítica: inventario de datos, conservación, subencargados y finalidades en el DPA, y lo que sigue siendo tu decisión.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analítica para DPOs: la revisión del proveedor — Sealmetrics",
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
    languages: getAlternatesEs("/for/dpo"),
  },
};

export default function DPOPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Por equipo", url: "/es/for" }, { name: "DPOs", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analítica para DPOs: revisar un proveedor de analítica web con documentos",
          description: DESCRIPTION,
          datePublished: DPO_PUBLISHED_ES,
          dateModified: DPO_MODIFIED,
          url: URL,
          category: "Role",
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
