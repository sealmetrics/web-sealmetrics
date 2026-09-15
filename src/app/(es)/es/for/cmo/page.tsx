import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { CMO_MODIFIED, CMO_PUBLISHED_ES, cmoEs as content } from "@/lib/content/problem-landings/cmo";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/for/cmo";
const TITLE = "Analítica para CMOs: un presupuesto defendible — Sealmetrics";
const DESCRIPTION =
  "Analítica para CMOs: un total de ingresos conciliado con finanzas, un reparto por canal sin pérdida por consentimiento y un presupuesto defendible.";
const SOCIAL =
  "Plataformas, GA4 y finanzas llevan tres totales a la revisión de presupuesto. Mide marketing sin pérdida por consentimiento y concílialo con los pedidos.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analítica para CMOs: un presupuesto defendible — Sealmetrics",
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
    languages: getAlternatesEs("/for/cmo"),
  },
};

export default function CMOPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Por equipo", url: "/es/for" }, { name: "CMOs", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analítica para CMOs: defender el presupuesto de marketing con un total que finanzas acepta",
          description: DESCRIPTION,
          datePublished: CMO_PUBLISHED_ES,
          dateModified: CMO_MODIFIED,
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
