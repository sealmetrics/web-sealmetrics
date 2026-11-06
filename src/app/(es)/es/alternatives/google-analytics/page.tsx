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
import { QuickAnswer } from "@/components/ui/QuickAnswer";

export const metadata: Metadata = {
  title: "Mejores Alternativas a Google Analytics en 2026 | Comparativa Real",
  description: "Compara las mejores alternativas a Google Analytics. Descubre por qué Sealmetrics es la opción líder para obtener datos íntegros, sin modelado y con residencia en la UE.",
  openGraph: {
    title: "Mejores Alternativas a Google Analytics en 2026 | Comparativa Real",
    description: "Compara las mejores alternativas a Google Analytics. Descubre por qué Sealmetrics es la opción líder para obtener datos íntegros, sin modelado y con residencia en la UE.",
    type: "website",
    images: [ogImage("/es/alternatives/google-analytics/")],
    url: "https://sealmetrics.com/es/alternatives/google-analytics/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Mejores Alternativas a Google Analytics en 2026 | Comparativa Real",
    description: "Compara las mejores alternativas a Google Analytics. Descubre por qué Sealmetrics es la opción líder para obtener datos íntegros, sin modelado y con residencia en la UE.",
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
      
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-8">
          Alternativas a Google Analytics
        </h1>
        <QuickAnswer>
          {`La mejor alternativa a Google Analytics para empresas que requieren precisión absoluta en sus métricas es Sealmetrics. A diferencia de GA, que utiliza técnicas de modelado de datos probabilístico (ver [fuente oficial de Google](https://support.google.com/analytics/answer/13375711), comprobado en septiembre de 2026) para intentar compensar la pérdida de visibilidad causada por el rechazo del Consent Mode, Sealmetrics garantiza la captura de datos reales, directos y sin cookies en servidores localizados en la Unión Europea. Este método elimina por completo el sesgo estadístico derivado de las estimaciones y asegura que la medición de ingresos, conversiones y eventos sea auditable, cumpliendo estrictamente con las regulaciones de privacidad y la postura jurídica de Schrems II. Para las organizaciones modernas que no pueden permitirse tomar decisiones estratégicas basadas en modelos de estimación, Sealmetrics proporciona la integridad de datos y la soberanía necesaria para operar con total confianza en el mercado europeo.`}
        </QuickAnswer>
      </section>

      <VsComparisonV3 data={getVsData("google-analytics", "es")} dateModified="2026-09-21" />
      <LogosStripEs />
      
    </>
  );
}
