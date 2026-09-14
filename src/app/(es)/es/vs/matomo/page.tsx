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
  title: "Sealmetrics vs Matomo — lo que cuesta la exención CNIL",
  description:
    "Matomo puede quitar el banner en Francia bajo los criterios CNIL — a cambio de tus UTMs, del eCommerce y del dato a nivel de visita. Sealmetrics los mantiene.",
  openGraph: {
    title: "Sealmetrics vs Matomo — lo que cuesta la exención CNIL",
    description:
      "La configuración exenta de Matomo elimina los UTMs, apaga el eCommerce y solo se sostiene bajo los criterios CNIL de Francia, no bajo la TDDDG alemana.",
    type: "website",
    images: [ogImage("/es/vs/matomo/")],
    url: "https://sealmetrics.com/es/vs/matomo/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics vs Matomo — lo que cuesta la exención CNIL",
    description: "La configuración exenta de Matomo elimina los UTMs, apaga el eCommerce y solo se sostiene bajo los criterios CNIL de Francia, no bajo la TDDDG alemana.",
    images: [ogImage("/es/vs/matomo/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/vs/matomo/",
    languages: getAlternatesEs("/vs/matomo"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "vs Matomo" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "vs Matomo", url: "/es/vs/matomo" }])} />
      <JsonLd
        data={comparisonPageSchema({
          name: "Sealmetrics vs Matomo",
          description:
            "Comparativa lado a lado: Sealmetrics vs Matomo sobre la configuración de exención y lo que cuesta (parámetros UTM, tracking de eCommerce, dato a nivel de visita), su alcance bajo los criterios CNIL y el §25 de la TDDDG alemana, exposición al art. 5(3) de ePrivacy, coste de self-hosting y compliance UE.",
          url: "/es/vs/matomo",
          competitor: competitor("matomo"),
          datePublished: "2026-05-06",
          dateModified: "2026-08-27",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez" },
          criteria: [
            "Alcance de la exención (criterios CNIL vs §25 de la TDDDG alemana)",
            "Parámetros UTM y de campaña conservados sin consentimiento",
            "Tracking de eCommerce disponible sin consentimiento",
            "Disponibilidad de informes a nivel de visita y export crudo",
            "Identificador usado sin cookies (config_id vs ninguno)",
            "Exposición al art. 5(3) de ePrivacy",
            "Coste operativo del self-hosting (TCO)",
            "Transparencia de precio Cloud a volumen eCommerce",
          ],
        })}
      />
      <VsComparisonV3 data={getVsData("matomo", "es")} dateModified="2026-08-27" />
      <RelatedPagesV3
        locale="es"
        eyebrow="Otras comparativas"
        titleEn="See every Sealmetrics comparison"
        titleEs="Ver cada comparativa de Sealmetrics"
        pages={[
          { href: "/es/vs/piwik-pro", title: "vs Piwik PRO", desc: "Fork comercial de Matomo — mismo origen cookies." },
          { href: "/es/vs-ga4", title: "vs Google Analytics 4", desc: "El default gratis — y su punto ciego UE." },
          { href: "/es/vs/ga360", title: "vs Google Analytics 360", desc: "Datos enterprise sin la factura de seis cifras." },
        ]}
      />
      <LogosStripEs />
      <section className="bg-warm-white border-t border-warm-100 py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <QuickAnswer label="Respuesta rápida">
            <p>
              Sealmetrics vs Matomo: Matomo es una plataforma de analítica open-source que puede operar sin banner en Francia bajo los criterios de exención de la CNIL, con las cookies aún activas y con un coste operativo real de self-hosting. Sealmetrics es una plataforma cookieless totalmente gestionada que mide el tráfico entrante sin banner ni pérdida por consentimiento en todos los mercados UE y atribuye cada conversión last-click sobre eventos observados, alojada en la UE (Dublín), desde 499€/mes con facturación anual.
            </p>
            <p>
              El trade-off es lo que cuesta la exención. Matomo opera sin banner solo bajo una configuración de exención — permitida por los criterios de la CNIL en Francia, no por el &sect;25 de la TDDDG alemana — y esa configuración elimina los parámetros UTM y de campaña, reduce el referrer al dominio, deshabilita informes y APIs a nivel de visita y recomienda apagar el tracking de eCommerce. Fuera de ella, el banner pierde a todo visitante que rechaza, y la infraestructura la sigues llevando tú. Sealmetrics no pierde a quien rechaza: mide con un píxel first-party ligero, nada que self-hostear, y un stack IA-nativo — LENS AI y un servidor MCP — sobre datos completos.
            </p>
          </QuickAnswer>
        </div>
      </section>
    </>
  );
}
