import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "¿Qué es la atribución multi-touch? — Glosario Sealmetrics",
  description:
    "La atribución multi-touch reparte el crédito entre touchpoints de un visitante identificado. Requiere tracking por usuario; Sealmetrics usa last-click.",
  openGraph: {
    title: "¿Qué es la atribución multi-touch?",
    description: "Modelo de atribución que requiere tracking por usuario. Sealmetrics hace last-click a nivel de canal.",
    type: "article",
    url: "https://sealmetrics.com/es/glossary/multi-touch-attribution/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: [ogImage("/es/glossary/multi-touch-attribution/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Qué es la atribución multi-touch?",
    description: "Modelo de atribución que requiere tracking por usuario. Sealmetrics hace last-click a nivel de canal.",
    images: [ogImage("/es/glossary/multi-touch-attribution/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/multi-touch-attribution/",
    languages: getAlternatesEs("/glossary/multi-touch-attribution"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Atribución multi-touch" }]} locale="es" />
      <JsonLd data={definedTermSchema({ name: "Atribución multi-touch", description: "Modelo de atribución que reparte el crédito de conversión entre múltiples touchpoints.", url: "/es/glossary/multi-touch-attribution", related: [{ name: "Modelo de atribución", url: "/glossary/attribution-model" }, { name: "Atribución de ingresos", url: "/es/glossary/revenue-attribution" }, { name: "Tracking de eventos", url: "/glossary/event-tracking" }, { name: "Pérdida de datos en analítica", url: "/es/glossary/data-loss-in-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Atribución multi-touch", url: "/es/glossary/multi-touch-attribution" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Atribución multi-touch</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Modelo de atribución que reparte el crédito de conversión entre múltiples touchpoints observados del mismo visitante identificado, en lugar de dar todo el crédito a la primera o última interacción. Requiere tracking por usuario para enlazar touchpoints entre sesiones.
            </p>
          </div>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Modelos comunes</h2>
          <p>Tiene varias variantes: lineal (crédito igual a todos los touchpoints), time-decay (más crédito a los recientes), basado en posición (40% primero, 40% último, 20% intermedios) y data-driven (pesos determinados por ML). Todas comparten un requisito: visibilidad sobre cada touchpoint del mismo visitante identificado — es decir, debe existir un identificador persistente por usuario.</p>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">El problema de la completitud</h2>
          <p>La atribución multi-touch es tan precisa como los datos que la alimentan. Cuando la analítica con cookies pierde interacciones &mdash;el 29% de las visitas en la <Link href="/es/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">tienda Shopify de Incapto durante 48 días</Link>&mdash; por <Link href="/glossary/consent-management-platform" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">rechazo de consentimiento</Link>, bloqueadores y restricciones de navegador, el modelo reparte crédito sobre un fragmento del dato observado.</p>
          <p>Esto infravalora sistemáticamente los canales top-of-funnel (orgánico, social, display) porque los primeros touchpoints son los que más se pierden cuando las cookies aún no están activas.</p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Por qué Sealmetrics no hace atribución multi-touch</h2>
          <p>La atribución multi-touch requiere identificar al mismo visitante a través de múltiples sesiones para enlazar los touchpoints. Esa identificación exige un identificador persistente por usuario — una cookie, un fingerprint o cualquier mecanismo de tracking que somete la analítica al consentimiento RGPD.</p>
          <p>Sealmetrics está diseñada como medición de eventos agregada y anónima. Nunca se crea un identificador por usuario, así que no hay base para enlazar touchpoints de la misma persona entre sesiones. La <Link href="/es/glossary/revenue-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">atribución</Link> es last-click con ámbito de sesión: la conversión se asigna a la fuente de la sesión en la que ocurre. Los totales por canal se acumulan desde esos eventos.</p>
          <p>El trade-off es deliberado: renuncias al reparto de crédito modelado entre touchpoints y a cambio obtienes totales agregados por canal, sin dependencia de consentimiento.</p>
        </div>

        <CommercialModule locale="es" hook="No hacemos multi-touch — deliberadamente. Mira lo que el last-click sobre datos completos te dice y los modelos no." />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Más: <Link href="/es/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Producto Sealmetrics</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
