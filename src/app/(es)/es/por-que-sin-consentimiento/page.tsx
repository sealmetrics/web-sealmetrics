import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { WhyNoConsentSignal } from "@/components/v4/WhyNoConsentSignal";
import { WHY_NO_CONSENT_MODIFIED, WHY_NO_CONSENT_PUBLISHED, whyNoConsentEs as content } from "@/lib/content/why-no-consent";
import "@/components/v4/why-no-consent-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/por-que-sin-consentimiento";
const TITLE = "Por qué Sealmetrics mide sin consentimiento";
const DESCRIPTION =
  "Por qué Sealmetrics mide sin banner de consentimiento y las herramientas con cookies no: nada en el dispositivo, ID diario, sin IP, informes agregados.";
const SOCIAL =
  "La ley no prohíbe medir. Prohíbe guardar o leer en el dispositivo sin permiso, salvo que sea medición de audiencia del propio sitio. Aquí está la diferencia, dibujada.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Por qué Sealmetrics mide sin consentimiento",
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: SOCIAL,
    type: "website",
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
    languages: getAlternatesEs("/por-que-sin-consentimiento"),
  },
};

export default function PorQueSinConsentimientoPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Por qué sin consentimiento", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          datePublished: WHY_NO_CONSENT_PUBLISHED,
          dateModified: WHY_NO_CONSENT_MODIFIED,
          url: URL,
          category: "Compliance",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <WhyNoConsentSignal content={content} />
    </>
  );
}
