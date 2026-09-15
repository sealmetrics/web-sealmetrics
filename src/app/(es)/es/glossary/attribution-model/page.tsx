import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { RelatedGlossaryTerms } from "@/components/ui/RelatedGlossaryTerms";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { glossaryHref } from "@/lib/content/glossary-es";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "¿Qué es un modelo de atribución? — Glosario",
  description: "Un modelo de atribución determina cómo se reparte el crédito de una conversión entre los puntos de contacto. Compara first-touch, last-touch y data-driven.",
  openGraph: {
    title: "¿Qué es un modelo de atribución?",
    description: "Las reglas que reparten el crédito de una conversión entre los puntos de contacto.",
    url: "https://sealmetrics.com/es/glossary/attribution-model/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    type: "article",
    images: [ogImage("/es/glossary/attribution-model/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Qué es un modelo de atribución?",
    description: "Las reglas que reparten el crédito de una conversión entre los puntos de contacto.",
    images: [ogImage("/es/glossary/attribution-model/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/attribution-model/",
    languages: getAlternatesEs("/glossary/attribution-model"),
  },
};

export default function AttributionModelEsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Modelo de atribución" }]} locale="es" />
      <JsonLd data={definedTermSchema({ name: "Modelo de atribución", description: "Reglas que determinan cómo se reparte el crédito de una conversión entre los puntos de contacto de un recorrido.", url: "/es/glossary/attribution-model", related: [{ name: "Atribución multi-touch", url: glossaryHref("multi-touch-attribution", "es") }, { name: "Atribución de ingresos", url: glossaryHref("revenue-attribution", "es") }, { name: "Tracking de eventos", url: glossaryHref("event-tracking", "es") }, { name: "Pérdida de datos en analítica", url: glossaryHref("data-loss-in-analytics", "es") }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Modelo de atribución", url: "/es/glossary/attribution-model" }], "es")} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">¿Qué es un modelo de atribución?</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Conjunto de reglas que determina cómo se reparte el crédito de una conversión entre los puntos de contacto de un recorrido. Los modelos habituales son first-touch, last-touch, lineal, time-decay y data-driven.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Tipos de modelo de atribución</h2>
          <p>
            First-touch asigna el 100% del crédito a la primera interacción: útil para medir canales de descubrimiento, pero ignora todo lo posterior. Last-touch asigna el 100% a la última interacción antes de convertir; es el valor por defecto de GA4 en la mayoría de informes y sobrevalora los canales de fondo de embudo, como la búsqueda de marca y el retargeting.
          </p>
          <p>
            Lineal reparte el crédito a partes iguales entre todos los puntos de contacto: simple y justo, pero asume que todas las interacciones influyen igual, cosa que rara vez es cierta. Time-decay da más peso a los contactos cercanos a la conversión, razonable en ciclos cortos. Data-driven usa aprendizaje automático para calcular la contribución real de cada contacto; Google retiró el resto de modelos de GA4 a finales de 2023 y lo dejó como opción por defecto.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Por qué la atribución necesita el dato completo</h2>
          <p>
            Todos los modelos, del last-touch más simple al data-driven más sofisticado, dependen de ver el recorrido entero. Cuando la <Link href={glossaryHref("data-loss-in-analytics", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">pérdida de datos</Link> elimina contactos &mdash;el 29% de las visitas en una tienda Shopify medida, hasta el 87% en el peor escenario acumulado&mdash;, el modelo trabaja sobre un fragmento de la realidad.
          </p>
          <p>
            Piensa en un cliente que descubre tu marca en una búsqueda orgánica (bloqueada por un bloqueador), luego hace clic en un anuncio de display (registrado) y finalmente convierte por búsqueda de marca (registrada). Un modelo last-touch acredita a la búsqueda de marca; un data-driven acredita a display. Ninguno sabe que la visita orgánica existió. El canal que de verdad trajo al cliente recibe cero crédito, y cero presupuesto en la siguiente planificación.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Qué hace Sealmetrics</h2>
          <p>
            Sealmetrics no aplica modelos <Link href={glossaryHref("multi-touch-attribution", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">multi-touch</Link>: hace <Link href={glossaryHref("revenue-attribution", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">atribución de ingresos last-click</Link> sobre el dato observado sin huecos de consentimiento, de forma anónima y a nivel de canal. Es una decisión de arquitectura, no una limitación temporal: no se reconstruyen recorridos por usuario porque no se identifica a ningún usuario.
          </p>
        </div>

        <CommercialModule locale="es" hook="Sealmetrics usa un solo modelo: last-click sobre tu tráfico, sin huecos de consentimiento. Mira lo que cuenta un modelo completo frente a datos modelados." />

        <RelatedGlossaryTerms slug="attribution-model" locale="es" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Más: <Link href="/es/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">La plataforma Sealmetrics</Link> &middot; <Link href="/es/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cómo funciona Sealmetrics</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
