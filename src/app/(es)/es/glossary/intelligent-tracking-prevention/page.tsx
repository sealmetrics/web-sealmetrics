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
  title: "¿Qué es Intelligent Tracking Prevention (ITP)?",
  description: "ITP es la función de privacidad de Safari que limita la vida de las cookies a 7 días y bloquea el seguimiento entre sitios.",
  openGraph: {
    title: "¿Qué es Intelligent Tracking Prevention (ITP)?",
    description: "La función de Safari que limita la vida de las cookies y bloquea el seguimiento entre sitios.",
    url: "https://sealmetrics.com/es/glossary/intelligent-tracking-prevention/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    type: "article",
    images: [ogImage("/es/glossary/intelligent-tracking-prevention/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Qué es Intelligent Tracking Prevention (ITP)?",
    description: "La función de Safari que limita la vida de las cookies y bloquea el seguimiento entre sitios.",
    images: [ogImage("/es/glossary/intelligent-tracking-prevention/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/intelligent-tracking-prevention/",
    languages: getAlternatesEs("/glossary/intelligent-tracking-prevention"),
  },
};

export default function ItpEsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Intelligent Tracking Prevention" }]} locale="es" />
      <JsonLd data={definedTermSchema({ name: "Intelligent Tracking Prevention", description: "La función de privacidad de Safari que limita la vida de las cookies y el seguimiento entre sitios.", url: "/es/glossary/intelligent-tracking-prevention", related: [{ name: "Analítica sin cookies", url: glossaryHref("cookieless-analytics", "es") }, { name: "Recolección de datos first-party", url: glossaryHref("first-party-data-collection", "es") }, { name: "Pérdida de datos en analítica", url: glossaryHref("data-loss-in-analytics", "es") }, { name: "Impacto del bloqueador en analítica", url: glossaryHref("ad-blocker-analytics-impact", "es") }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Intelligent Tracking Prevention", url: "/es/glossary/intelligent-tracking-prevention" }], "es")} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">¿Qué es Intelligent Tracking Prevention (ITP)?</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              La función de privacidad de Safari que limita la vida de las cookies y bloquea el seguimiento entre sitios. ITP reduce la vida de las cookies first-party a 7 días (o 24 horas cuando se fijan por JavaScript en una página que llegó con parámetros de seguimiento) y bloquea todas las cookies de terceros.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Impacto en la analítica</h2>
          <p>
            Safari tiene alrededor del 20% de cuota de navegador en Europa, y bastante más en móvil. ITP implica que cualquier visitante que vuelva pasados 7 días aparece como visitante «nuevo» en la analítica basada en cookies, lo que infla el recuento de nuevos usuarios y fragmenta los recorridos.
          </p>
          <p>
            Para una analítica que depende de cookies para unir sesiones y atribuir, ITP hace prácticamente imposible medir con precisión las visitas múltiples en Safari. Sumado a Enhanced Tracking Protection de Firefox, más del 35% del tráfico de navegador está sujeto a restricciones agresivas de cookies.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Por qué la medición first-party no se ve afectada</h2>
          <p>
            La <Link href={glossaryHref("cookieless-analytics", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">analítica sin cookies</Link> no almacena cookies en el dispositivo del visitante, así que ITP y ETP no tienen efecto sobre la recolección. El enfoque <Link href={glossaryHref("first-party-data-collection", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">first-party sin cookies</Link> sigue capturando las sesiones aunque ITP y ETP restrinjan las cookies.
          </p>
        </div>

        <CommercialModule locale="es" hook="ITP no puede caducar lo que nunca se almacenó. Mira tu tráfico de Safari contado sin ninguna cookie que caduque." />

        <RelatedGlossaryTerms slug="intelligent-tracking-prevention" locale="es" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Más: <Link href="/es/blog/cookieless-analytics-explained" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Analítica sin cookies explicada</Link> &middot; <Link href="/es/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cómo funciona Sealmetrics</Link>
          </p>
        </div>

        <div className="mt-12">
          <QuickAnswer label="Respuesta rápida">
            <p>
              Intelligent Tracking Prevention (ITP) es el sistema de privacidad de Safari, guiado por aprendizaje automático, que limita las cookies de analítica first-party a 7 días, descarta por completo las cookies de terceros y reduce la vida de la cookie a 24 horas cuando se fija por JavaScript en una página que llegó con un parámetro de seguimiento. Firefox incorpora una función equivalente llamada Enhanced Tracking Protection (ETP).
            </p>
            <p>
              Para una analítica que depende de cookies para reconocer visitantes recurrentes o coser una atribución de varios días, ITP hace inviable medir con precisión el más del 20% del tráfico europeo que usa Safari. La recolección first-party server-side sin cookies no fija ninguna cookie, así que ITP y ETP no tienen ningún efecto: las visitas se cuentan sobre la misma base anónima y agregada, sea cual sea el navegador y hayan pasado los días que hayan pasado.
            </p>
          </QuickAnswer>
        </div>
      </div>
    </article>
    </>
  );
}
