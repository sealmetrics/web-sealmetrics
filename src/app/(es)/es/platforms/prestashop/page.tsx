import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { PRESTASHOP_PUBLISHED, prestashopEs as content } from "@/lib/content/problem-landings/prestashop";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/platforms/prestashop";
const TITLE = "Analítica para PrestaShop sin cookies — Sealmetrics";
const DESCRIPTION =
  "Analítica sin cookies para PrestaShop 1.7+ y 8.x: un módulo que mide fichas, carrito, checkout y compras, con grupos de contenido y combinaciones.";
const SOCIAL =
  "Una etiqueta con consentimiento pierde a quien rechaza el banner. Instala el módulo de Sealmetrics y ve los canales detrás de cada pedido de PrestaShop.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analítica para PrestaShop sin cookies — Sealmetrics",
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
    languages: getAlternatesEs("/platforms/prestashop"),
  },
};

export default function PrestaShopPlatformPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Plataformas", url: "/es/platforms" }, { name: "PrestaShop", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analítica para PrestaShop sin cookies: instalación, eventos, conciliación y límites",
          description: DESCRIPTION,
          datePublished: PRESTASHOP_PUBLISHED,
          dateModified: PRESTASHOP_PUBLISHED,
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
