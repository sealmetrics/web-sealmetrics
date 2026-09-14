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
  title: "Impacto del bloqueador en la analítica — Glosario",
  description: "Los bloqueadores cortan más del 40% de las sesiones de analítica en la UE. La recolección first-party sin cookies los esquiva por completo.",
  openGraph: {
    title: "¿Cómo afectan los bloqueadores a la analítica?",
    description: "Más del 40% de las sesiones europeas se pierden. La recolección first-party los esquiva.",
    url: "https://sealmetrics.com/es/glossary/ad-blocker-analytics-impact/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    type: "article",
    images: [ogImage("/es/glossary/ad-blocker-analytics-impact/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Cómo afectan los bloqueadores a la analítica?",
    description: "Más del 40% de las sesiones europeas se pierden. La recolección first-party los esquiva.",
    images: [ogImage("/es/glossary/ad-blocker-analytics-impact/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/ad-blocker-analytics-impact/",
    languages: getAlternatesEs("/glossary/ad-blocker-analytics-impact"),
  },
};

export default function AdBlockerAnalyticsImpactEsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Impacto del bloqueador en la analítica" }]} locale="es" />
      <JsonLd data={definedTermSchema({ name: "Impacto del bloqueador en la analítica", description: "Pérdida de datos causada por extensiones del navegador que bloquean los scripts de analítica de terceros antes de que se ejecuten.", url: "/es/glossary/ad-blocker-analytics-impact", related: [{ name: "Pérdida de datos en analítica", url: glossaryHref("data-loss-in-analytics", "es") }, { name: "Recolección de datos first-party", url: glossaryHref("first-party-data-collection", "es") }, { name: "Tracking server-side", url: glossaryHref("server-side-tracking", "es") }, { name: "Intelligent Tracking Prevention", url: glossaryHref("intelligent-tracking-prevention", "es") }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Impacto del bloqueador en la analítica", url: "/es/glossary/ad-blocker-analytics-impact" }], "es")} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">¿Cómo afectan los bloqueadores a la analítica?</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Pérdida de datos causada por extensiones del navegador que bloquean los scripts de analítica de terceros antes de que se ejecuten. Más del 40% de los internautas europeos usa un bloqueador, lo que la convierte en la mayor fuente individual de dato ausente en analítica web.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Cómo actúan los bloqueadores</h2>
          <p>
            Los bloqueadores mantienen listas de filtros —EasyList, EasyPrivacy o las listas por defecto de uBlock Origin— que comparan las peticiones de red contra dominios de rastreo conocidos. Cuando un visitante con bloqueador carga tu sitio, las peticiones a dominios como google-analytics.com o googletagmanager.com se cancelan en silencio antes de enviar ningún dato.
          </p>
          <p>
            El resultado: tu herramienta de analítica nunca se entera de que esos visitantes existieron. Ni páginas vistas, ni eventos, ni conversiones. El visitante completa su recorrido —navega, añade al carrito, incluso compra— y tu panel no muestra nada.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">La magnitud del problema</h2>
          <p>
            Según datos de PageFair y Statista, la adopción de bloqueadores en Europa supera el 40% en escritorio, con Alemania (39%), Francia (36%) y los países nórdicos (más del 40%) a la cabeza. En audiencias técnicas pasa del 50%. Sumado a tasas de rechazo de <Link href={glossaryHref("consent-management-platform", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">banner de consentimiento</Link> de entre el 40% y el 70% en la UE, el efecto se compone: en el peor escenario acumulado, la analítica basada en cookies acaba capturando en torno al 13% del tráfico real. En una <Link href="/es/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">tienda Shopify real medida durante 48 días</Link>, GA4 no registró el 29% de las visitas.
          </p>
          <p>
            No es un error de redondeo. Significa equipos de marketing decidiendo presupuesto sobre un fragmento de su dato real, y ese fragmento contamina cada informe, cada modelo de atribución y cada cálculo de retorno.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">First-party frente a terceros</h2>
          <p>
            Los bloqueadores apuntan a scripts de terceros. La <Link href={glossaryHref("first-party-data-collection", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">recolección de datos first-party</Link> funciona distinto: el endpoint de medición vive en tu propio dominio, lo que lo hace indistinguible del resto de la funcionalidad del sitio. Combinada con <Link href={glossaryHref("cookieless-analytics", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">analítica sin cookies</Link>, captura el 100% de la actividad con independencia del bloqueador.
          </p>
        </div>

        <CommercialModule locale="es" hook="Los bloqueadores no ven el conteo first-party de Sealmetrics. Mira cómo queda tu tráfico cuando nada lo recorta." />

        <RelatedGlossaryTerms slug="ad-blocker-analytics-impact" locale="es" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Más: <Link href="/es/blog/cookieless-analytics-explained" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Analítica sin cookies explicada</Link> &middot; <Link href="/es/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cómo funciona Sealmetrics</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
