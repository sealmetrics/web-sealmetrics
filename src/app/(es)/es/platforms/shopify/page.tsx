import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { SHOPIFY_MODIFIED, shopifyEs as content } from "@/lib/content/problem-landings/shopify";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

/** The Spanish page is new; the English one was published on 2026-05-29. */
const PUBLISHED_ES = "2026-09-14";
const URL = "/es/platforms/shopify";
const TITLE = "Analítica para Shopify sin cookies — Sealmetrics";
const DESCRIPTION =
  "Analítica sin cookies para Shopify: app Pixel y embed del tema, compras confirmadas por webhook y una prueba de 48 días con el 96% de pedidos reales.";
const SOCIAL =
  "En la tienda Shopify de Incapto, GA4 no vio el 29% de las visitas. Instala Sealmetrics en cualquier plan y ve los canales detrás de cada pedido.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analítica para Shopify sin cookies — Sealmetrics",
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
    languages: getAlternatesEs("/platforms/shopify"),
  },
};

export default function ShopifyPlatformPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Plataformas", url: "/es/platforms" }, { name: "Shopify", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analítica para Shopify sin cookies: instalación, eventos, conciliación y la medición de Incapto",
          description: DESCRIPTION,
          datePublished: PUBLISHED_ES,
          dateModified: SHOPIFY_MODIFIED,
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
