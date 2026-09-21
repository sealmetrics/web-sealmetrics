import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "¿Qué es la pérdida de datos en analítica? — Glosario",
  description:
    "La pérdida de datos en analítica es la brecha entre tráfico real y medido con cookies. Varía por tienda y canal: en Incapto, GA4 no vio el 29% de las visitas.",
  openGraph: {
    title: "¿Qué es la pérdida de datos en analítica?",
    description: "Brecha entre tráfico real y tráfico observable con cookies. Depende de la tienda y del canal: en Incapto, el 29% de las visitas en 48 días.",
    type: "article",
    url: "https://sealmetrics.com/es/glossary/data-loss-in-analytics/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: [ogImage("/es/glossary/data-loss-in-analytics/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Qué es la pérdida de datos en analítica?",
    description: "Brecha entre tráfico real y tráfico observable con cookies. Depende de la tienda y del canal: en Incapto, el 29% de las visitas en 48 días.",
    images: [ogImage("/es/glossary/data-loss-in-analytics/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/data-loss-in-analytics/",
    languages: getAlternatesEs("/glossary/data-loss-in-analytics"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Pérdida de datos en analítica" }]} locale="es" />
      <JsonLd data={definedTermSchema({ name: "Pérdida de datos en analítica", description: "La brecha entre tráfico real y tráfico observable por las herramientas con cookies.", url: "/es/glossary/data-loss-in-analytics", related: [{ name: "Plataforma de gestión de consentimiento", url: "/glossary/consent-management-platform" }, { name: "Impacto del bloqueador en analítica", url: "/glossary/ad-blocker-analytics-impact" }, { name: "Intelligent Tracking Prevention", url: "/glossary/intelligent-tracking-prevention" }, { name: "Analítica sin cookies", url: "/es/glossary/cookieless-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Pérdida de datos en analítica", url: "/es/glossary/data-loss-in-analytics" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Pérdida de datos en analítica</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              La diferencia entre el tráfico que realmente recibe un sitio y el tráfico que las herramientas con cookies son capaces de observar. Se debe al rechazo de consentimiento, a los bloqueadores de anuncios y a las restricciones del navegador, y su tamaño depende de la tienda y del canal. En la tienda Shopify de Incapto, medida durante 48 días, fue del 29% de las visitas.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Las tres capas de pérdida</h2>
          <p>La pérdida ocurre en cascada: cada capa actúa sobre lo que dejó la anterior.</p>
          <ul className="space-y-2 pl-0 list-none">
            {[
              "Rechazo de consentimiento — en nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies; quien no acepta nunca aparece en GA4",
              "Bloqueadores de anuncios — una parte de quienes aceptan el banner bloquea igualmente el script de Google Analytics, más en escritorio y en audiencias técnicas",
              "Restricciones de navegador — Safari ITP y Firefox ETP recortan sesiones a 7 días, acortando la vida de las cookies de quienes quedan",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.95rem]">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">El impacto en decisiones</h2>
          <p>Cuando la analítica deja fuera parte del tráfico real &mdash;el 29% de las visitas en la <Link href="/es/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">medición en paralelo de Incapto</Link>&mdash;, los modelos de atribución, ROAS, CPA y customer lifetime value se calculan sobre una muestra estadística — no sobre el dato. Las decisiones de reasignación de presupuesto basadas en esa muestra suelen estar sesgadas hacia los canales con mayor probabilidad de aceptar cookies, no hacia los que más ingresos generan en realidad.</p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Cómo cerrar la brecha</h2>
          <p>La <Link href="/es/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">analítica sin cookies</Link> elimina los tres vectores de pérdida en su origen: sin cookies que requieran consentimiento, sin scripts que los bloqueadores reconozcan, sin dependencia de identificadores que ITP/ETP recorten. El resultado es conteo agregado sin huecos de consentimiento — no una muestra, no una estimación.</p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">La cuarta pérdida: la fuente de tráfico</h2>
          <p>Hay una capa que casi nunca se cuenta y que suele doler más que las tres anteriores. En nuestra experiencia con clientes, de quienes sí aceptan las cookies, el 40% no lo hace en la primera página vista — es decir, acepta después de la landing, que es justo donde viaja el parámetro de campaña. El visitante queda medido, pero llega sin origen. En la medición real de Incapto, el 14% de las visitas de GA4 llegaba sin un origen utilizable, frente al 0,3% en Sealmetrics.</p>
          <p>La consecuencia práctica es que el número de sesiones y el número de conversiones atribuidas se degradan a ritmos distintos. Un informe puede parecer razonable en volumen y estar completamente equivocado en reparto: el tráfico directo se hincha con lo que en realidad era campaña, y el canal de pago aparece infrafinanciado en su propio panel. Cuando alguien dice que su ROAS no cuadra con el backend, esta suele ser la razón, no un error de etiquetado.</p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Cómo medir tu propia brecha</h2>
          <p>La pérdida no se estima leyendo benchmarks, se mide contrastando dos cifras que ya tienes. Toma los pedidos que registró tu backend — Shopify, Prestashop, Magento o el ERP — en un mes cerrado, y compáralos con las conversiones que atribuyó tu analítica en ese mismo periodo. La diferencia es tu pérdida real, no la media del sector. Repite el ejercicio por canal y verás en cuál se concentra.</p>
          <p>Si quieres una primera aproximación antes de tocar nada, la <Link href="/es/data-loss-calculator" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">calculadora de pérdida de datos</Link> parte de tus visitas e ingresos mensuales y devuelve el importe que tu configuración actual está ocultando cada mes. Es una estimación, y está pensada para decidir si merece la pena hacer la comparación seria contra backend — no para sustituirla.</p>
        </div>

        <CommercialModule locale="es" hook="Entre el rechazo del consentimiento y los bloqueadores, GA4 no ve parte de tus visitas. Mide tu propia brecha contra un conteo que no depende del consentimiento." />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Más: <Link href="/es/data-loss-calculator" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Calculadora de pérdida de datos</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
