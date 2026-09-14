import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "¿Qué es la analítica sin cookies? — Glosario Sealmetrics",
  description:
    "Analítica web que captura datos de visitantes sin cookies, midiendo el 100% del tráfico sin depender del consentimiento ni de las restricciones del navegador.",
  openGraph: {
    title: "¿Qué es la analítica sin cookies?",
    description: "Analítica que captura el 100% del tráfico sin cookies, sin consentimiento, sin per-user tracking.",
    type: "article",
    url: "https://sealmetrics.com/es/glossary/cookieless-analytics/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: [ogImage("/es/glossary/cookieless-analytics/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Qué es la analítica sin cookies?",
    description: "Analítica que captura el 100% del tráfico sin cookies, sin consentimiento, sin per-user tracking.",
    images: [ogImage("/es/glossary/cookieless-analytics/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/cookieless-analytics/",
    languages: getAlternatesEs("/glossary/cookieless-analytics"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Analítica sin cookies" }]} locale="es" />
      <JsonLd data={definedTermSchema({ name: "Analítica sin cookies", description: "Analítica web que mide datos sin usar cookies del navegador.", url: "/es/glossary/cookieless-analytics", related: [{ name: "Recolección de datos first-party", url: "/glossary/first-party-data-collection" }, { name: "Tracking server-side", url: "/glossary/server-side-tracking" }, { name: "Cumplimiento RGPD analítica", url: "/es/glossary/gdpr-analytics-compliance" }, { name: "Pérdida de datos en analítica", url: "/es/glossary/data-loss-in-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Analítica sin cookies", url: "/es/glossary/cookieless-analytics" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">¿Qué es la analítica sin cookies?</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Analítica web que captura datos de visitantes sin cookies del navegador, midiendo el 100% del tráfico independientemente del estado de consentimiento o de las restricciones del navegador.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Cómo funciona</h2>
          <p>
            Las herramientas tradicionales (como GA4) dependen de cookies — pequeños archivos almacenados en el navegador del visitante — para identificar visitantes recurrentes, rastrear sesiones y construir journeys por usuario. La analítica sin cookies sustituye este mecanismo por <Link href="/glossary/first-party-data-collection" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">recolección first-party</Link> que opera sin ningún identificador en el dispositivo del visitante.
          </p>
          <p>
            En vez de almacenar identificadores, cuenta eventos en el lado servidor — pageviews, conversiones, totales de ingresos — agrupados por canal, campaña, landing y país. El path de datos es first-party (de tu dominio a tu servidor), por lo que no se ve afectado por bloqueadores de anuncios, ni por restricciones de cookies como <Link href="/glossary/intelligent-tracking-prevention" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">ITP</Link>, ni depende de banners de consentimiento.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Lo que este enfoque no hace</h2>
          <p>El trade-off es deliberado: se renuncia al detalle por usuario a cambio de totales agregados completos y defendibles. No identifica visitantes, no enlaza pageviews en journeys por usuario, no reconoce visitantes recurrentes, ni soporta modelos de atribución multi-touch. Lo que produce son conteos agregados y atribución de ingresos last-click a nivel de canal.</p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Por qué importa</h2>
          <p>
            En la UE, la analítica basada en cookies pierde tráfico por el rechazo de consentimiento (55%), los bloqueadores (40%) y las restricciones de navegador. En el peor escenario acumulado se queda en torno al 13% del tráfico real; en una <Link href="/es/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">tienda Shopify real medida durante 48 días</Link>, GA4 no registró el 29% de las visitas. La analítica sin cookies elimina los tres vectores de pérdida, contando el 100% de las visitas reales de forma anónima.
          </p>
          <p>
            No es una mejora marginal — es la diferencia entre decidir sobre un fragmento estadístico y decidir sobre totales agregados completos.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Implicaciones de privacidad</h2>
          <p>
            Logra <Link href="/es/glossary/gdpr-analytics-compliance" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cumplimiento RGPD por arquitectura</Link>: no se recoge dato personal, no se almacenan cookies y no se requiere consentimiento para que la analítica funcione. Es consistente con los criterios de exención de la CNIL (autoridad francesa) para herramientas de medición de audiencia.
          </p>
        </div>

        <CommercialModule locale="es" hook="Esto es exactamente lo que hace Sealmetrics: contar el 100% de las visitas sin cookies. Míralo funcionando sobre tu propio tráfico." />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Más: <Link href="/es/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cómo funciona Sealmetrics</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
