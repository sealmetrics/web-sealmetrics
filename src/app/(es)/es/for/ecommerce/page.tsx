import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { ECOMMERCE_MODIFIED, ECOMMERCE_PUBLISHED_ES, ecommerceEs as content } from "@/lib/content/problem-landings/ecommerce";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/for/ecommerce";
const TITLE = "Analítica para eCommerce: ingresos por canal — Sealmetrics";
const DESCRIPTION =
  "Analítica sin cookies para eCommerce: ingresos por canal, embudo y producto, contrastados con tus pedidos. Incapto: 96% de los pedidos registrados.";
const SOCIAL =
  "Tu tienda sabe qué se vendió, no quién lo vendió. Lee canales, embudo y productos por canal sin pérdida por consentimiento, conciliados con tus pedidos.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analítica para eCommerce: ingresos por canal — Sealmetrics",
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
    languages: getAlternatesEs("/for/ecommerce"),
  },
};

export default function EcommercePageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Por equipo", url: "/es/for" }, { name: "eCommerce", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analítica para eCommerce: ingresos por canal, embudo y producto, conciliados con la tienda",
          description: DESCRIPTION,
          datePublished: ECOMMERCE_PUBLISHED_ES,
          dateModified: ECOMMERCE_MODIFIED,
          url: URL,
          category: "Industry",
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
