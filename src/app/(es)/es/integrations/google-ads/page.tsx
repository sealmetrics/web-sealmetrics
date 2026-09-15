import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { GOOGLE_ADS_PUBLISHED, googleAdsEs as content } from "@/lib/content/problem-landings/google-ads";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/integrations/google-ads";
const TITLE = "Google Ads: ingresos por campaña sin cookies — Sealmetrics";
const DESCRIPTION =
  "Mide campañas y palabras clave de Google Ads en Sealmetrics con UTM y ValueTrack, sin pérdida por consentimiento. Qué hace, las plantillas y lo que no hace.";
const SOCIAL =
  "Google Ads puja con su propia cifra. Sealmetrics mide los ingresos por campaña y palabra clave sin pérdida por consentimiento para decidir presupuesto con la medida.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Google Ads: ingresos por campaña sin cookies — Sealmetrics",
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
    languages: getAlternatesEs("/integrations/google-ads"),
  },
};

export default function GoogleAdsIntegrationPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Integraciones", url: "/es/integrations" }, { name: "Google Ads", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Medir Google Ads sin cookies: plantillas, conciliación y límites",
          description: DESCRIPTION,
          datePublished: GOOGLE_ADS_PUBLISHED,
          dateModified: GOOGLE_ADS_PUBLISHED,
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
