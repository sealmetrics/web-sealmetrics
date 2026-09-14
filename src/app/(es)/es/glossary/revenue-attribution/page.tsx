import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "¿Qué es la atribución de ingresos? — Glosario Sealmetrics",
  description:
    "La atribución de ingresos asigna cada conversión a la fuente que la generó. Last-click sin huecos de consentimiento es la métrica que más cuadra con el CRM.",
  openGraph: {
    title: "¿Qué es la atribución de ingresos?",
    description: "Asigna cada conversión a su fuente. Last-click sin huecos de consentimiento es la métrica que más cuadra con el CRM.",
    type: "article",
    url: "https://sealmetrics.com/es/glossary/revenue-attribution/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: [ogImage("/es/glossary/revenue-attribution/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Qué es la atribución de ingresos?",
    description: "Asigna cada conversión a su fuente. Last-click sin huecos de consentimiento es la métrica que más cuadra con el CRM.",
    images: [ogImage("/es/glossary/revenue-attribution/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/revenue-attribution/",
    languages: getAlternatesEs("/glossary/revenue-attribution"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Atribución de ingresos" }]} locale="es" />
      <JsonLd data={definedTermSchema({ name: "Atribución de ingresos", description: "Asignación de cada conversión a la fuente de tráfico que la generó.", url: "/es/glossary/revenue-attribution", related: [{ name: "Modelo de atribución", url: "/glossary/attribution-model" }, { name: "Atribución multi-touch", url: "/es/glossary/multi-touch-attribution" }, { name: "Tracking de eventos", url: "/glossary/event-tracking" }, { name: "Analítica sin cookies", url: "/es/glossary/cookieless-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Atribución de ingresos", url: "/es/glossary/revenue-attribution" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Atribución de ingresos</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              La asignación de cada conversión — pedido, reserva, lead — a la fuente de tráfico que la generó. Sealmetrics implementa atribución last-click sin huecos de consentimiento: la fuente observada en la pageview donde se dispara la conversión recibe el crédito; los totales se acumulan por canal.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Last-click sin huecos de consentimiento</h2>
          <p>El modelo de atribución que importa no es el más sofisticado, sino el que se calcula sobre el dato más cercano a la realidad. Last-click sobre las conversiones observadas, sin huecos de consentimiento, reconcilia con el CRM dentro del 15-20% — significativamente mejor que un modelo data-driven calculado sobre el fragmento de tráfico que aceptó cookies.</p>
          <p>La razón: los modelos avanzados (linear, time-decay, position-based, data-driven) aplicados sobre una muestra sesgada producen un sesgo amplificado, no un dato refinado.</p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Lo que Sealmetrics atribuye</h2>
          <ul className="space-y-2 pl-0 list-none">
            {[
              "Canal de marketing (orgánico, paid search, paid social, email, direct, referral, display)",
              "Campaña y contenido (UTMs)",
              "Landing page de entrada de la sesión donde ocurre la conversión",
              "País y dispositivo (móvil/desktop)",
              "Total de ingresos del evento de conversión, agregado por las dimensiones anteriores",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.95rem]">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Lo que no atribuye</h2>
          <p>Sealmetrics no enlaza touchpoints de visitantes individuales entre sesiones — no hay un identificador persistente. Por eso no soporta <Link href="/es/glossary/multi-touch-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">atribución multi-touch</Link>, ni journeys por usuario, ni reparto de crédito modelado entre touchpoints. El trade-off es deliberado: a cambio mide el tráfico sin depender del consentimiento ni de cookies.</p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Cómo se reconcilia con tu CRM</h2>
          <p>Los totales agregados por canal cuadran con los pedidos exportados de Shopify/WooCommerce/Magento o con las reservas de un PMS hotelero dentro del 15-20% — el rango residual procede de devoluciones, cancelaciones y pedidos que entran fuera del flujo web (call center, B2B, etc.). Es el grado de cuadre que tu CFO acepta como base para decisiones de presupuesto.</p>
        </div>

        <CommercialModule locale="es" hook="Mira tus ingresos atribuidos last-click sin huecos de consentimiento, no sobre la fracción consentida." />

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
