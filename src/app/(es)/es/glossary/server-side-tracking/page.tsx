import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { RelatedGlossaryTerms } from "@/components/ui/RelatedGlossaryTerms";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { glossaryHref } from "@/lib/content/glossary-es";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "¿Qué es el tracking server-side? — Glosario",
  description: "El tracking server-side procesa los eventos de analítica en el servidor y no en el navegador, evitando el bloqueo por extensiones.",
  openGraph: {
    title: "¿Qué es el tracking server-side?",
    description: "Procesa la analítica en el servidor, evitando bloqueadores y limitaciones del cliente.",
    url: "https://sealmetrics.com/es/glossary/server-side-tracking/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    type: "article",
    images: [ogImage("/es/glossary/server-side-tracking/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Qué es el tracking server-side?",
    description: "Procesa la analítica en el servidor, evitando bloqueadores y limitaciones del cliente.",
    images: [ogImage("/es/glossary/server-side-tracking/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/server-side-tracking/",
    languages: getAlternatesEs("/glossary/server-side-tracking"),
  },
};

export default function ServerSideTrackingEsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Tracking server-side" }]} locale="es" />
      <JsonLd data={definedTermSchema({ name: "Tracking server-side", description: "Método de recolección en el que los eventos se procesan en el servidor en lugar de en el navegador.", url: "/es/glossary/server-side-tracking", related: [{ name: "Recolección de datos first-party", url: glossaryHref("first-party-data-collection", "es") }, { name: "Analítica sin cookies", url: glossaryHref("cookieless-analytics", "es") }, { name: "Impacto del bloqueador en analítica", url: glossaryHref("ad-blocker-analytics-impact", "es") }, { name: "Tracking de eventos", url: glossaryHref("event-tracking", "es") }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Tracking server-side", url: "/es/glossary/server-side-tracking" }], "es")} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">¿Qué es el tracking server-side?</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Método de recolección en el que los eventos de analítica se procesan en el servidor en lugar de en el navegador. Evita el bloqueo en el lado del cliente por parte de extensiones y funciones de privacidad del navegador.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Cliente frente a servidor</h2>
          <p>
            La analítica tradicional (GA4, Adobe) depende de JavaScript en el cliente para capturar eventos. El script corre en el navegador del visitante, recoge datos y los envía a un servidor de analítica externo. Ese enfoque es vulnerable a los bloqueadores, que cortan el script o la petición saliente, y a las funciones de privacidad del navegador, que restringen el almacenamiento de cookies.
          </p>
          <p>
            El tracking server-side traslada el procesamiento a tu servidor. Un script mínimo captura las señales de comportamiento y las envía a tu propio dominio, donde la lógica de servidor procesa, enriquece y almacena el dato. El servidor gestiona la sesión, el procesamiento del evento y el reenvío, y nada de eso puede bloquearse desde el cliente.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Combinado con recolección first-party</h2>
          <p>
            El tracking server-side es más eficaz combinado con la <Link href={glossaryHref("first-party-data-collection", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">recolección de datos first-party</Link>. Cuando todo el camino del dato es first-party (tu dominio) y server-side (tu servidor), la infraestructura de analítica evita las listas de terceros de las herramientas de bloqueo y las restricciones de cookies de terceros del navegador.
          </p>
        </div>

        <CommercialModule locale="es" hook="Sealmetrics cuenta los eventos en el servidor por una ruta first-party propia. Mira qué llega cuando nada lo bloquea." />

        <RelatedGlossaryTerms slug="server-side-tracking" locale="es" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Más: <Link href="/es/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cómo funciona Sealmetrics</Link> &middot; <Link href="/es/blog/cookieless-analytics-explained" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Analítica sin cookies explicada</Link>
          </p>
        </div>

        <div className="mt-12">
          <QuickAnswer label="Respuesta rápida">
            <p>
              El tracking server-side procesa los eventos de analítica en un servidor que tú controlas en lugar de dentro del navegador del visitante. Un enganche mínimo en el cliente (o una baliza servidor a servidor para eventos de backend, como los pedidos de Shopify) envía la señal en bruto a tu propio endpoint; el procesamiento, el enriquecimiento y el almacenamiento ocurren en el servidor. Como la petición nunca sale del origen first-party y ningún script queda expuesto a las listas de reglas de los bloqueadores, el camino del dato queda mucho menos expuesto a la pérdida que provocan uBlock, Brave y los bloqueadores de contenido de iOS Safari.
            </p>
            <p>
              Server-side no significa automáticamente «sin cookies». Un tracker server-side puede seguir fijando una cookie first-party o generar un identificador de visitante, y en ese momento activa el art. 5(3) de ePrivacy y requiere consentimiento. Sealmetrics es server-side Y sin cookies: los eventos se cuentan de forma agregada sin ningún identificador por visitante, y eso es lo que hace la arquitectura a la vez resistente y libre de consentimiento.
            </p>
          </QuickAnswer>
        </div>
      </div>
    </article>
    </>
  );
}
