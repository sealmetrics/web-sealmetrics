import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { SAAS_MODIFIED, SAAS_PUBLISHED_ES, saasEs as content } from "@/lib/content/problem-landings/saas";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/for/saas";
const TITLE = "Analítica para SaaS: altas por canal — Sealmetrics";
const DESCRIPTION =
  "Analítica sin cookies para SaaS self-serve: altas, pasos del formulario y planes por canal y campaña. Último clic por sesión, sin seguimiento por usuario.";
const SOCIAL =
  "La prueba empezó y su canal no quedó registrado. Mide altas, pasos del formulario y planes por campaña sin pérdida por consentimiento, hasta la cuenta.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analítica para SaaS: altas por canal — Sealmetrics",
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
    languages: getAlternatesEs("/for/saas"),
  },
};

export default function SaasPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Por equipo", url: "/es/for" }, { name: "SaaS", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analítica para SaaS: altas, pasos del formulario y planes por canal, medidos sin cookies",
          description: DESCRIPTION,
          datePublished: SAAS_PUBLISHED_ES,
          dateModified: SAAS_MODIFIED,
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
