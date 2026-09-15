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
  title: "¿Qué es el tracking de eventos? — Glosario",
  description: "El tracking de eventos registra interacciones concretas más allá de las páginas vistas. Cómo funciona el modelo de GA4 y sus puntos de fallo.",
  openGraph: {
    title: "¿Qué es el tracking de eventos?",
    description: "Registra interacciones más allá de las páginas vistas. El modelo de GA4 y sus alternativas.",
    url: "https://sealmetrics.com/es/glossary/event-tracking/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    type: "article",
    images: [ogImage("/es/glossary/event-tracking/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Qué es el tracking de eventos?",
    description: "Registra interacciones más allá de las páginas vistas. El modelo de GA4 y sus alternativas.",
    images: [ogImage("/es/glossary/event-tracking/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/event-tracking/",
    languages: getAlternatesEs("/glossary/event-tracking"),
  },
};

export default function EventTrackingEsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Tracking de eventos" }]} locale="es" />
      <JsonLd data={definedTermSchema({ name: "Tracking de eventos", description: "Registrar interacciones concretas del visitante más allá de las páginas vistas, como clics, envíos de formulario o reproducciones de vídeo.", url: "/es/glossary/event-tracking", related: [{ name: "Tracking server-side", url: glossaryHref("server-side-tracking", "es") }, { name: "Atribución de ingresos", url: glossaryHref("revenue-attribution", "es") }, { name: "Modelo de atribución", url: glossaryHref("attribution-model", "es") }, { name: "Muestreo de datos", url: glossaryHref("data-sampling", "es") }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Tracking de eventos", url: "/es/glossary/event-tracking" }], "es")} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">¿Qué es el tracking de eventos?</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Registrar interacciones concretas del visitante en un sitio web más allá de las páginas vistas: clics, envíos de formulario, profundidad de scroll, reproducciones de vídeo, descargas y acciones personalizadas. GA4 usa un modelo de datos enteramente basado en eventos, donde cada interacción —incluida la página vista— es un evento.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Qué eventos se registran</h2>
          <p>
            Los eventos capturan las acciones que importan para decidir. Una página vista te dice que alguien llegó; los eventos te dicen qué hizo: eventos de interacción (profundidad de scroll, tiempo en página, inicio y fin de vídeo, descargas), eventos de conversión (envíos de formulario, compras, añadir al carrito, altas, confirmaciones de reserva), eventos de navegación (clics salientes, clics internos, búsquedas en el sitio) y eventos personalizados propios de tu producto.
          </p>
          <p>
            GA4 recoge automáticamente un conjunto de eventos de medición mejorada sin configuración adicional. Los eventos personalizados requieren llamadas a gtag.js o disparadores de GTM. Sealmetrics captura más de 60 eventos estándar de forma automática mediante <Link href={glossaryHref("first-party-data-collection", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">tracking first-party sin cookies</Link>, incluidas interacciones que los scripts de terceros no ven.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">El punto de fallo del modelo de GA4</h2>
          <p>
            Todo el modelo depende de que el JavaScript del cliente se ejecute con éxito. Si un bloqueador corta el script de GA4 —lo que afecta a <Link href={glossaryHref("ad-blocker-analytics-impact", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">una parte de los visitantes que varía según la audiencia</Link>— no se captura ningún evento: cero páginas vistas, cero conversiones, cero datos de interacción.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Server-side frente a cliente</h2>
          <p>
            El tracking de eventos en cliente tiene tres puntos de fallo: los bloqueadores impiden que el script cargue, los <Link href={glossaryHref("consent-management-platform", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">banners de consentimiento</Link> impiden que se dispare y las <Link href={glossaryHref("intelligent-tracking-prevention", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">restricciones del navegador</Link> limitan la duración de la cookie.
          </p>
          <p>
            El <Link href={glossaryHref("server-side-tracking", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">tracking server-side</Link> traslada la recolección a la capa de servidor. No hay script que bloquear, ni cookie que restringir, ni dependencia del consentimiento.
          </p>
        </div>

        <CommercialModule locale="es" hook="Mira tus eventos clave — registros, carritos, checkouts — contados sin huecos de consentimiento, no solo en las visitas consentidas." />

        <RelatedGlossaryTerms slug="event-tracking" locale="es" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Más: <Link href="/es/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cómo funciona Sealmetrics</Link> &middot; <Link href="/es/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">La plataforma Sealmetrics</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
