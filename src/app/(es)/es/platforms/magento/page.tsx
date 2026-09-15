import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { MAGENTO_PUBLISHED, magentoEs as content } from "@/lib/content/problem-landings/magento";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/platforms/magento";
const TITLE = "Analítica para Magento sin cookies — Sealmetrics";
const DESCRIPTION =
  "Analítica sin cookies para Magento 2: un módulo que mide todo el funnel por vista de tienda, con grupos de contenido y opciones de producto.";
const SOCIAL =
  "Una etiqueta con consentimiento pierde a quien rechaza el banner. Instala el módulo de Sealmetrics y ve los canales detrás de cada pedido de Magento.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analítica para Magento sin cookies — Sealmetrics",
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
    languages: getAlternatesEs("/platforms/magento"),
  },
};

export default function MagentoPlatformPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Plataformas", url: "/es/platforms" }, { name: "Magento", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analítica para Magento 2 sin cookies: instalación, eventos, conciliación y límites",
          description: DESCRIPTION,
          datePublished: MAGENTO_PUBLISHED,
          dateModified: MAGENTO_PUBLISHED,
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
