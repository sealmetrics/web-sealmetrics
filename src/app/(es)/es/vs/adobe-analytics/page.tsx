import type { Metadata } from "next";
import { competitor } from "@/lib/content/competitors";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { breadcrumbSchema, comparisonPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { LogosStripEs } from "@/components/sections/v3/HomeV3Es";
import { VsComparisonV3 } from "@/components/sections/v3/VsComparisonV3";
import { RelatedPagesV3 } from "@/components/sections/v3/RelatedPagesV3";
import { getVsData } from "@/components/sections/v3/VsData";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Sealmetrics vs Adobe Analytics — Alternativa enterprise",
  description: "Adobe Analytics cuesta entre ~50K$ y 200K$+ al año y requiere especialistas. Sealmetrics da dato completo sin consultores.",
  openGraph: {
    title: "Sealmetrics vs Adobe Analytics — Alternativa enterprise",
    description: "Adobe Analytics cuesta entre ~50K$ y 200K$+ al año y requiere especialistas. Sealmetrics da dato completo sin consultores.",
    type: "website",
    images: [ogImage("/es/vs/adobe-analytics/")],
    url: "https://sealmetrics.com/es/vs/adobe-analytics/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics vs Adobe Analytics — Alternativa enterprise",
    description: "Adobe Analytics cuesta entre ~50K$ y 200K$+ al año y requiere especialistas. Sealmetrics da dato completo sin consultores.",
    images: [ogImage("/es/vs/adobe-analytics/")],
  },
  alternates: { canonical: "https://sealmetrics.com/es/vs/adobe-analytics/", languages: getAlternatesEs("/vs/adobe-analytics") },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "vs Adobe Analytics" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "vs Adobe Analytics", url: "/es/vs/adobe-analytics" }])} />
      <JsonLd data={comparisonPageSchema({
        name: "Sealmetrics vs Adobe Analytics",
        description: "Comparativa lado a lado: Sealmetrics vs Adobe Analytics en completitud de datos, cumplimiento UE, precio y tiempo de implementacion.",
        url: "/es/vs/adobe-analytics",
        competitor: competitor("adobe-analytics"),
        datePublished: "2026-04-15",
        dateModified: "2026-09-21",
        author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez" },
        criteria: [
          "Coste anual de licencia y fees de implementación",
          "Tiempo al primer informe accionable",
          "Especialistas requeridos en plantilla",
          "Pérdida de tráfico UE por rechazo de consentimiento",
          "Arquitectura AppMeasurement basada en cookies",
          "Qué puede leer un agente IA (dataset completo vs subconjunto post-consentimiento)",
          "Inclusión de export BigQuery",
        ],
      })} />
      <VsComparisonV3 data={getVsData("adobe-analytics", "es")} dateModified="2026-09-21" />
      <RelatedPagesV3
        locale="es"
        eyebrow="Otras comparativas"
        titleEn="See every Sealmetrics comparison"
        titleEs="Ver cada comparativa de Sealmetrics"
        pages={[
        { href: "/es/vs-ga4", title: "vs Google Analytics 4", desc: "El default gratis — y su punto ciego UE." },
        { href: "/es/vs/ga360", title: "vs Google Analytics 360", desc: "Datos enterprise sin la factura de seis cifras." },
        { href: "/es/vs/piwik-pro", title: "vs Piwik PRO", desc: "Hosting UE, sin pérdida por consentimiento." }
      ]}
      />
      <LogosStripEs />
      
      <section className="bg-warm-white border-t border-warm-100 py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <QuickAnswer label="Respuesta rápida">
            <p>
              Sealmetrics vs Adobe Analytics: Adobe Analytics es una suite de analítica enterprise con contratos anuales no publicados que van de unos 50.000 $/año en Select a 200.000 $+ en Ultimate, con una implementación pesada, hosting en EE. UU./híbrido y un banner de consentimiento en toda la UE. Sealmetrics es una plataforma cookieless alojada en la UE que mide el tráfico entrante sin depender del consentimiento y atribuye cada conversión last-click sobre eventos observados — desde 499€/mes con facturación anual, sin compromiso anual.
            </p>
            <p>
              Para el eCommerce UE la diferencia es completitud y compliance. Adobe sigue sin ver a quien rechaza el consentimiento — en nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies — y arrastra overhead Schrems II por sus flujos de datos a EE. UU., además de meses de implementación. Sealmetrics se instala con un píxel, corre en paralelo desde el día uno, y su infraestructura solo en Dublín, sin sub-procesadores fuera de la UE para el dato de visitante, elimina la revisión de transferencias. Los equipos mantienen Adobe para análisis custom profundo donde lo necesitan y usan Sealmetrics como el número de revenue completo y listo para el board.
            </p>
          </QuickAnswer>
        </div>
      </section>
    </>
  );
}
