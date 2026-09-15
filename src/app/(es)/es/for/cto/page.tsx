import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { CTO_MODIFIED, CTO_PUBLISHED_ES, ctoEs as content } from "@/lib/content/problem-landings/cto";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/for/cto";
const TITLE = "Analítica para CTOs: un tracker de 1,1 KB — Sealmetrics";
const DESCRIPTION =
  "Analítica para ingeniería: un script diferido de 1,1 KB sin almacenamiento en el dispositivo, seguimiento SPA automático y API, MCP y BigQuery.";
const SOCIAL =
  "GA4 pesa unos 149 KB y exige cablear el consentimiento. Sealmetrics es un script de 1,1 KB sin cookies, con seguimiento SPA y los datos detrás de una API.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analítica para CTOs: un tracker de 1,1 KB — Sealmetrics",
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
    languages: getAlternatesEs("/for/cto"),
  },
};

export default function CTOPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Por equipo", url: "/es/for" }, { name: "CTOs", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analítica para CTOs: un tracker ligero, sin almacenamiento en el dispositivo y con los datos detrás de una API",
          description: DESCRIPTION,
          datePublished: CTO_PUBLISHED_ES,
          dateModified: CTO_MODIFIED,
          url: URL,
          category: "Role",
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
