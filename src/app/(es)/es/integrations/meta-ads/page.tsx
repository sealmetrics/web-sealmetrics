import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { META_ADS_PUBLISHED, metaAdsEs as content } from "@/lib/content/problem-landings/meta-ads";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/integrations/meta-ads";
const TITLE = "Meta Ads: ingresos por campaña sin cookies — Sealmetrics";
const DESCRIPTION =
  "Mide campañas, conjuntos y creatividades de Meta Ads en Sealmetrics con parámetros UTM en cada visita. Configuración, parámetros y lo que no hace.";
const SOCIAL =
  "Meta reporta los resultados que se acredita. Sealmetrics mide los ingresos por campaña, conjunto y creatividad en cada visita, junto a la cifra de Meta.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Meta Ads: ingresos por campaña sin cookies — Sealmetrics",
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
    languages: getAlternatesEs("/integrations/meta-ads"),
  },
};

export default function MetaAdsIntegrationPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Integraciones", url: "/es/integrations" }, { name: "Meta Ads", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Medir Meta Ads sin cookies: parámetros de URL, conciliación y límites",
          description: DESCRIPTION,
          datePublished: META_ADS_PUBLISHED,
          dateModified: META_ADS_PUBLISHED,
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
