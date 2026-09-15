import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { OPENCART_PUBLISHED, opencartEs as content } from "@/lib/content/problem-landings/opencart";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/platforms/opencart";
const TITLE = "Analítica para OpenCart sin cookies — Sealmetrics";
const DESCRIPTION =
  "Analítica sin cookies para OpenCart 4.x, y 3.x con modificaciones: una extensión que mide fichas, carrito, checkout y compras en cada tienda.";
const SOCIAL =
  "Una etiqueta con consentimiento pierde a quien rechaza el banner. Instala la extensión de Sealmetrics y ve los canales detrás de cada pedido de OpenCart.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analítica para OpenCart sin cookies — Sealmetrics",
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
    languages: getAlternatesEs("/platforms/opencart"),
  },
};

export default function OpenCartPlatformPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Plataformas", url: "/es/platforms" }, { name: "OpenCart", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analítica para OpenCart sin cookies: instalación, eventos, conciliación y límites",
          description: DESCRIPTION,
          datePublished: OPENCART_PUBLISHED,
          dateModified: OPENCART_PUBLISHED,
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
