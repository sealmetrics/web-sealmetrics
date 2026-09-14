import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { COMPLETE_DATA_MODIFIED, completeDataEs as content } from "@/lib/content/problem-landings/complete-data";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

/** The Spanish pillar was published a day after the English one. */
const PUBLISHED_ES = "2026-05-29";
const URL = "/es/complete-data";
const TITLE = "Datos completos — cuando GA4 no refleja la realidad";
const DESCRIPTION =
  "GA4 pierde una parte grande y desigual del tráfico europeo. Lo que mostró una tienda Shopify medida 48 días, por qué ocurre y cómo medir tu brecha.";
const SOCIAL =
  "En una tienda Shopify medida en paralelo durante 48 días, GA4 no registró el 29% de las visitas. Por qué ocurre, qué cuesta y cómo medir la tuya.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: SOCIAL,
    type: "article",
    images: [ogImage(`${URL}/`)],
    locale: "es_ES",
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
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
    languages: getAlternatesEs("/complete-data"),
  },
};

export default function CompleteDataPillarEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Datos completos", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "GA4 no te enseña lo que pasó de verdad: datos completos, medidos",
          description: DESCRIPTION,
          datePublished: PUBLISHED_ES,
          dateModified: COMPLETE_DATA_MODIFIED,
          url: URL,
          category: "Strategy",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <JsonLd data={howToSchema({ name: content.method.howToName, description: content.method.howToDescription, url: URL, steps: content.method.steps })} />
      <JsonLd data={quotationSchema({ text: content.proof.quote, spokenBy: content.proof.citePerson, spokenByRole: content.proof.citeRole, url: URL })} />
      <ProblemLandingSignal content={content} />
    </>
  );
}
