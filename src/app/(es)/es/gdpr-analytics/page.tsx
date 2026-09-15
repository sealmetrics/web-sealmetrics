import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqPageSchema, howToSchema, itemListSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { gdprAnalyticsEs as content } from "@/lib/content/problem-landings/gdpr-analytics";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/gdpr-analytics";
const TITLE = "Analítica y RGPD sin cookies: la evidencia para tu DPO";
const DESCRIPTION =
  "Analítica europea que puedes demostrar conforme: sin cookies, sin datos personales guardados y en la UE. El DPA, una lista de revisión y AEPD, CNIL y DSK.";
const SOCIAL =
  "Un banner o un sello no aguantan la revisión de un DPO. Qué recoge Sealmetrics, adónde va, cuánto se guarda y cómo se lee frente a cada autoridad.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analítica y RGPD sin cookies: la evidencia para tu DPO",
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: SOCIAL,
    type: "website",
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
    languages: getAlternatesEs("/gdpr-analytics"),
  },
};

export default function GdprAnalyticsHubEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Analítica y RGPD", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={itemListSchema({
          name: "Analítica y RGPD, regulador a regulador",
          description: "Análisis de cómo está construido Sealmetrics frente a los criterios publicados por la AEPD, la CNIL, la DSK y el ICO británico.",
          url: URL,
          items: content.roles.items.map((item) => ({ name: item.link.label, url: `https://sealmetrics.com${item.link.href}` })),
        })}
      />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <JsonLd data={howToSchema({ name: content.method.howToName, description: content.method.howToDescription, url: URL, steps: content.method.steps })} />
      <ProblemLandingSignal content={content} />
    </>
  );
}
