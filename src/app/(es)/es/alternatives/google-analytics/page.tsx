import type { Metadata } from "next";
import { competitor } from "@/lib/content/competitors";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, comparisonPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { LogosStripEs } from "@/components/sections/v3/HomeV3Es";
import { VsComparisonV3 } from "@/components/sections/v3/VsComparisonV3";
import { getVsData } from "@/components/sections/v3/VsData";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Alternativas a Google Analytics — Sealmetrics",
  description: "¿Buscando una alternativa a GA que no commoditice tus datos? Sealmetrics es otra categoría: completo, UE-hosted, grado enterprise.",
  openGraph: {
    title: "Alternativas a Google Analytics — Sealmetrics",
    description: "¿Buscando una alternativa a GA que no commoditice tus datos? Sealmetrics es otra categoría: completo, UE-hosted, grado enterprise.",
    type: "website",
    images: [ogImage("/es/alternatives/google-analytics/")],
    url: "https://sealmetrics.com/es/alternatives/google-analytics/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Alternativas a Google Analytics — Sealmetrics",
    description: "¿Buscando una alternativa a GA que no commoditice tus datos? Sealmetrics es otra categoría: completo, UE-hosted, grado enterprise.",
    images: [ogImage("/es/alternatives/google-analytics/")],
  },
  alternates: { canonical: "https://sealmetrics.com/es/alternatives/google-analytics/", languages: getAlternatesEs("/alternatives/google-analytics") },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Alternativas a Google Analytics" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Alternativas a Google Analytics", url: "/es/alternatives/google-analytics" }])} />
      <JsonLd data={comparisonPageSchema({
        name: "Alternativas a Google Analytics — Sealmetrics",
        description: "Alternativa enterprise a Google Analytics para empresas europeas que necesitan datos completos y residencia UE.",
        url: "/es/alternatives/google-analytics",
        competitor: competitor("google-analytics"),
        datePublished: "2026-04-15",
        dateModified: "2026-09-21",
        author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez" },
        criteria: [
          "Captura sin cookies vs modelado de Consent Mode",
          "Pérdida de tráfico UE por rechazo de consentimiento",
          "Residencia de datos y postura Schrems II",
          "Muestreo a escala",
          "Export BigQuery a resolución completa",
          "Qué puede leer un agente IA (dataset completo vs subconjunto post-consentimiento)",
          "Pricing y propiedad de los datos",
        ],
      })} />
      <VsComparisonV3 data={getVsData("google-analytics", "es")} dateModified="2026-09-21" />
      <LogosStripEs />
      
    </>
  );
}
