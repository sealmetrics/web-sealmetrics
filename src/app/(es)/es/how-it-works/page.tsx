import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqPageSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { HowItWorksSignal, howItWorksFaqItems } from "@/components/v4/HowItWorksSignal";
import "@/components/v4/how-it-works-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Cómo funciona Sealmetrics — Sin cookies y UE",
  description:
    "Pixel first-party de 846 bytes. Conteo de eventos anónimo en servidor. Almacenamiento en Dublín. Diseñado para el RGPD desde la arquitectura, no con una capa de compliance.",
  openGraph: {
    title: "Cómo funciona Sealmetrics — Sin cookies y UE",
    description:
      "Tres capas. Un pipeline. Cómo Sealmetrics cuenta tu tráfico de forma anónima y sin depender del consentimiento, sin cookies ni seguimiento de usuarios.",
    type: "website",
    images: [ogImage("/es/how-it-works/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/how-it-works/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Cómo funciona Sealmetrics — Sin cookies y UE",
    description: "Tres capas. Un pipeline. Cómo Sealmetrics cuenta tu tráfico de forma anónima y sin depender del consentimiento, sin cookies ni seguimiento de usuarios.",
    images: [ogImage("/es/how-it-works/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/how-it-works/",
    languages: getAlternatesEs("/how-it-works"),
  },
};

export default function HowItWorksPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Cómo funciona", url: "/es/how-it-works" }])} />
      <JsonLd data={speakableWebPageSchema({ url: "/es/how-it-works", name: "Cómo funciona — Sealmetrics" })} />
      <JsonLd data={faqPageSchema(howItWorksFaqItems.es, "/es/how-it-works")} />
      <HowItWorksSignal locale="es" />
    </>
  );
}
