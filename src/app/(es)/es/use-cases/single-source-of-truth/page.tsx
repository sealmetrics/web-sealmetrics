import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { singleSourceOfTruthEs as content } from "@/lib/content/problem-landings/single-source-of-truth";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/use-cases/single-source-of-truth";

export const metadata: Metadata = {
  title: "Fuente única de verdad para marketing y finanzas",
  description:
    "Por qué las plataformas de anuncios, GA4, el CRM y finanzas dan cifras distintas y cómo cuadrarlas en un total que todos aceptan. Con casos medidos.",
  openGraph: {
    title: "Fuente única de verdad para marketing y finanzas",
    description:
      "Marketing, agencia, analítica y finanzas leen cuatro cifras distintas. Cómo anclarlas a los pedidos que ocurrieron, y lo que eso no resuelve.",
    type: "website",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Fuente única de verdad para marketing y finanzas",
    description:
      "Marketing, agencia, analítica y finanzas leen cuatro cifras distintas. Cómo anclarlas a los pedidos que ocurrieron, y lo que eso no resuelve.",
    images: [ogImage(`${URL}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternatesEs("/use-cases/single-source-of-truth"),
  },
};

export default function SingleSourceOfTruthPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Fuente única de verdad", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: "Fuente única de verdad para marketing y finanzas — Sealmetrics" })} />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <JsonLd data={howToSchema({ name: content.method.howToName, description: content.method.howToDescription, url: URL, steps: content.method.steps })} />
      <JsonLd data={quotationSchema({ text: content.proof.quote, spokenBy: content.proof.citePerson, spokenByRole: content.proof.citeRole, url: URL })} />
      <ProblemLandingSignal content={content} />
    </>
  );
}
