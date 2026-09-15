import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { FINANCE_MODIFIED, FINANCE_PUBLISHED_ES, financeEs as content } from "@/lib/content/problem-landings/finance";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/for/finance";
const TITLE = "Analítica para finanzas: leads por canal — Sealmetrics";
const DESCRIPTION =
  "Analítica sin cookies para banca, seguros y crédito: solicitudes por canal, con el DPA, el inventario de datos y la seguridad que pide una revisión.";
const SOCIAL =
  "La solicitud llega, el canal no queda registrado. Mide solicitudes por canal sin cookies y revisa antes al proveedor con documentos.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analítica para finanzas: leads por canal — Sealmetrics",
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
    languages: getAlternatesEs("/for/finance"),
  },
};

export default function FinancePageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Por equipo", url: "/es/for" }, { name: "Finanzas", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analítica para servicios financieros: solicitudes por canal, revisadas con documentos",
          description: DESCRIPTION,
          datePublished: FINANCE_PUBLISHED_ES,
          dateModified: FINANCE_MODIFIED,
          url: URL,
          category: "Industry",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <JsonLd data={howToSchema({ name: content.method.howToName, description: content.method.howToDescription, url: URL, steps: content.method.steps })} />
      <ProblemLandingSignal content={content} />
    </>
  );
}
