import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Sealmetrics vs Piwik PRO — modos de privacidad",
  description: "Compara Piwik PRO y Sealmetrics en identificadores, consentimiento, atribución, hosting UE y límites del análisis anónimo.",
  openGraph: {
    title: "Sealmetrics vs Piwik PRO — modos de privacidad",
    description: "Compara Piwik PRO y Sealmetrics en identificadores, consentimiento, atribución, hosting UE y límites del análisis anónimo.",
    type: "website",
    images: [ogImage("/es/vs/piwik-pro/")],
    url: "https://sealmetrics.com/es/vs/piwik-pro/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics vs Piwik PRO — modos de privacidad",
    description: "Compara Piwik PRO y Sealmetrics en identificadores, consentimiento, atribución, hosting UE y límites del análisis anónimo.",
    images: [ogImage("/es/vs/piwik-pro/")],
  },
  alternates: { canonical: "https://sealmetrics.com/es/vs/piwik-pro/", languages: getAlternatesEs("/vs/piwik-pro") },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "vs Piwik PRO" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "vs Piwik PRO", url: "/es/vs/piwik-pro" }])} />
      <JsonLd data={comparisonPageSchema({
        name: "Sealmetrics vs Piwik PRO",
        description: "Comparativa de Sealmetrics y Piwik PRO en identificadores, consentimiento, atribución, hosting UE y límites del reporting anónimo.",
        url: "/es/vs/piwik-pro",
        competitor: competitor("piwik-pro"),
        datePublished: "2026-04-15",
        dateModified: "2026-09-14",
        author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez" },
        criteria: [
          "Configuración de identificadores y cookies",
          "Modos de consentimiento y recogida anónima",
          "Límites del reporting sin identificadores de visitante",
          "Ubicaciones de hosting y modelos de despliegue",
          "Alcance de producto y modelo operativo",
          "Atribución según el modo de identificadores",
          "Rendimiento medido del tracker",
        ],
      })} />
      <VsComparisonV3 data={getVsData("piwik-pro", "es")} dateModified="2026-09-14" />
      <RelatedPagesV3
        locale="es"
        eyebrow="Otras comparativas"
        titleEn="See every Sealmetrics comparison"
        titleEs="Ver cada comparativa de Sealmetrics"
        pages={[
        { href: "/es/vs-ga4", title: "vs Google Analytics 4", desc: "El default gratis — y su punto ciego UE." },
        { href: "/es/vs/ga360", title: "vs Google Analytics 360", desc: "Datos enterprise sin la factura de seis cifras." },
        { href: "/es/vs/adobe-analytics", title: "vs Adobe Analytics", desc: "Potencia enterprise, cero overhead." }
      ]}
      />
      <LogosStripEs />
      
      <section className="bg-warm-white border-t border-warm-100 py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <QuickAnswer label="Respuesta rápida">
            <p>
              Sealmetrics es analítica web agregada y sin cookies para equipos europeos que
              necesitan reporting de campañas e ingresos sin identificadores del navegador.
              Piwik PRO es una suite más amplia, con gestión de consentimiento, hosting
              flexible y hasta siete modelos de atribución cuando se activan identificadores.
              Su propia{" "}
              <Link href="https://help.piwik.pro/support/privacy/collect-data-in-a-privacy-friendly-way/">
                documentación de privacidad
              </Link>{" "}
              permite desactivar las cookies de visitante y el hash de sesión de 30 minutos;
              en esa configuración baja la precisión, cada evento se convierte en una sesión
              nueva y desaparecen los informes de fuente de tráfico y atribución de canal.
            </p>
            <p>
              Elige Piwik PRO si necesitas análisis por visitante, su suite de activación o
              flexibilidad de despliegue. Evalúa Sealmetrics si priorizas medición agregada
              alojada en Dublín y atribución last-click de campañas e ingresos sin mantener
              un modo de identificadores. La finalidad, la implementación y la jurisdicción
              determinan la base legal; elegir un proveedor no garantiza por sí solo el
              cumplimiento del RGPD.
            </p>
          </QuickAnswer>
        </div>
      </section>
    </>
  );
}
