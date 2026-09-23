import type { Metadata } from "next";
import { BrandMonitoringSignal, brandMonitoringFaq } from "@/components/v4/BrandMonitoringSignal";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqPageSchema, servicePageSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-monitoring-signal.css";

const title = "Monitorización de marca en IA — Qué dicen los modelos de ti";
const description =
  "Informe gratuito: diecisiete modelos de IA, entre ellos GPT-5.6, Claude, Gemini y Perplexity, contestan seis preguntas sobre tu empresa de memoria.";
const url = "https://sealmetrics.com/es/ai-brand-monitoring/";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [ogImage("/es/ai-brand-monitoring/")],
    url,
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title,
    description,
    images: [ogImage("/es/ai-brand-monitoring/")],
  },
  alternates: {
    canonical: url,
    languages: {
      en: "https://sealmetrics.com/ai-brand-monitoring/",
      es: url,
      "x-default": "https://sealmetrics.com/ai-brand-monitoring/",
    },
  },
};

export default function PaginaMonitorizacionMarcaIa() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Monitorización de marca en IA", url: "/es/ai-brand-monitoring" },
        ])}
      />
      <JsonLd
        data={servicePageSchema({
          name: "Informe de monitorización de marca en IA",
          description:
            "Informe gratuito que hace seis preguntas fijas sobre una empresa a diecisiete modelos de IA, entre ellos GPT-5.6, Claude Opus 5, Claude Sonnet 5, Gemini 3.8 Flash y Sonar de Perplexity, sin búsqueda web, y devuelve cada respuesta literal con los errores de hecho marcados.",
          url: "/es/ai-brand-monitoring",
          audience: "Equipos de marketing y comunicación",
        })}
      />
      <JsonLd
        data={faqPageSchema(
          brandMonitoringFaq.es.map((item) => ({ ...item })),
          "/es/ai-brand-monitoring"
        )}
      />
      <BrandMonitoringSignal locale="es" />
    </>
  );
}
