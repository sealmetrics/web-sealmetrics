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
  title: "¿Qué es la recolección first-party? — Glosario",
  description: "La recolección first-party captura analítica a través de tu propio dominio, esquivando bloqueadores y restricciones de cookies de terceros.",
  openGraph: {
    title: "¿Qué es la recolección de datos first-party?",
    description: "Captura analítica a través de tu propio dominio, con muchas menos probabilidades de bloqueo.",
    url: "https://sealmetrics.com/es/glossary/first-party-data-collection/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    type: "article",
    images: [ogImage("/es/glossary/first-party-data-collection/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Qué es la recolección de datos first-party?",
    description: "Captura analítica a través de tu propio dominio, con muchas menos probabilidades de bloqueo.",
    images: [ogImage("/es/glossary/first-party-data-collection/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/first-party-data-collection/",
    languages: getAlternatesEs("/glossary/first-party-data-collection"),
  },
};

export default function FirstPartyDataCollectionEsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Recolección de datos first-party" }]} locale="es" />
      <JsonLd data={definedTermSchema({ name: "Recolección de datos first-party", description: "Recoger datos de analítica a través de la infraestructura de tu propio dominio en lugar de servidores de terceros.", url: "/es/glossary/first-party-data-collection", related: [{ name: "Analítica sin cookies", url: glossaryHref("cookieless-analytics", "es") }, { name: "Tracking server-side", url: glossaryHref("server-side-tracking", "es") }, { name: "Impacto del bloqueador en analítica", url: glossaryHref("ad-blocker-analytics-impact", "es") }, { name: "Residencia del dato en analítica", url: glossaryHref("analytics-data-residency", "es") }, { name: "Intelligent Tracking Prevention", url: glossaryHref("intelligent-tracking-prevention", "es") }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Recolección de datos first-party", url: "/es/glossary/first-party-data-collection" }], "es")} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">¿Qué es la recolección de datos first-party?</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Recoger datos de analítica a través de la infraestructura de tu propio dominio en lugar de servidores de terceros. Las peticiones first-party tienen muchas menos probabilidades de ser bloqueadas y no están sujetas a las restricciones de cookies de terceros.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">First-party frente a terceros</h2>
          <p>
            Cuando GA4 recoge datos, envía peticiones desde el navegador del visitante a google-analytics.com, un dominio de terceros. Los bloqueadores reconocen ese patrón y cancelan la petición. Las funciones de privacidad del navegador pueden además restringir las cookies asociadas.
          </p>
          <p>
            La recolección first-party enruta el dato por tu propio dominio. La petición va del navegador del visitante a tu-dominio.com, procesada por infraestructura que corre en tu dominio. Para el navegador y para los bloqueadores es indistinguible de cualquier otra petición first-party.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Por qué importa para la completitud del dato</h2>
          <p>
            Alrededor del 40% de los usuarios europeos usa bloqueadores que apuntan específicamente a peticiones de analítica de terceros. La recolección first-party los esquiva por completo, no mediante engaño, sino cambiando de raíz el camino del dato para que sea genuinamente first-party.
          </p>
          <p>
            Combinada con la <Link href={glossaryHref("cookieless-analytics", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">analítica sin cookies</Link>, la recolección first-party elimina dos de los tres grandes vectores de <Link href={glossaryHref("data-loss-in-analytics", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">pérdida de datos</Link>: el bloqueo por extensiones y las restricciones de cookies del navegador.
          </p>
        </div>

        <CommercialModule locale="es" hook="Sealmetrics es first-party por diseño: tu dominio, tus datos, alojados en Dublín. Mira qué cambia eso en tus cifras." />

        <RelatedGlossaryTerms slug="first-party-data-collection" locale="es" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Más: <Link href="/es/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cómo funciona Sealmetrics</Link> &middot; <Link href="/es/blog/cookieless-analytics-explained" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Analítica sin cookies explicada</Link>
          </p>
        </div>

        <div className="mt-12">
          <QuickAnswer label="Respuesta rápida">
            <p>
              La recolección de datos first-party enruta las peticiones de analítica por tu propio dominio (por ejemplo pixel.tudominio.com) en lugar de un host de terceros como google-analytics.com. Para el navegador, para las listas de reglas de los bloqueadores y para las barreras de consentimiento, la petición es indistinguible de cualquier otro recurso de tu sitio: no se elimina, no se bloquea y no queda sujeta a las restricciones de cookies de terceros que imponen Safari ITP o Firefox ETP.
            </p>
            <p>
              Para el eCommerce europeo esto importa porque los bloqueadores descartan en silencio alrededor del 40% de las llamadas de analítica de terceros antes de que se ejecuten, y Safari limita las cookies de terceros por completo. La recolección first-party elimina ambos vectores de pérdida. Combinada con no almacenar ninguna cookie ni identificador en el dispositivo, forma la base arquitectónica de la analítica sin consentimiento: el mismo camino del dato que contemplan el RGPD y los criterios de exención de la CNIL al describir una analítica que no requiere banner.
            </p>
          </QuickAnswer>
        </div>
      </div>
    </article>
    </>
  );
}
