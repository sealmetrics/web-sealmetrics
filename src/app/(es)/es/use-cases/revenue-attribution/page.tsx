import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { REVENUE_ATTRIBUTION_MODIFIED, revenueAttributionEs as content } from "@/lib/content/problem-landings/revenue-attribution";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

/** The Spanish page is new; the English one was published on 2026-05-29. */
const PUBLISHED_ES = "2026-09-14";
const URL = "/es/use-cases/revenue-attribution";
const TITLE = "Atribución de ingresos sin cookies: qué campañas venden";
const DESCRIPTION =
  "Qué canal, campaña y creatividad vendieron, incluidos quienes rechazan las cookies. Cómo funciona, cómo configurarlo, sus límites y casos medidos.";
const SOCIAL =
  "Las plataformas evalúan sus propios anuncios y GA4 pierde a quien rechaza las cookies. Atribuye ingresos a campaña y creatividad en cada sesión.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Atribución de ingresos sin cookies: qué campañas venden",
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
    languages: getAlternatesEs("/use-cases/revenue-attribution"),
  },
};

export default function RevenueAttributionPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Atribución de ingresos", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Tus campañas se juzgan con quien aceptó las cookies: atribución de ingresos sin cookies",
          description: DESCRIPTION,
          datePublished: PUBLISHED_ES,
          dateModified: REVENUE_ATTRIBUTION_MODIFIED,
          url: URL,
          category: "Attribution",
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
