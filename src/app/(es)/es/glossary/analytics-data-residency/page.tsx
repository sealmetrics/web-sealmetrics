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
  title: "¿Qué es la residencia del dato? — Glosario",
  description: "La ubicación geográfica donde se procesa y almacena el dato de analítica. Determina qué marco legal aplica y qué transferencias hay que justificar.",
  openGraph: {
    title: "¿Qué es la residencia del dato en analítica?",
    description: "Dónde se procesa y almacena el dato, y qué marco legal lo gobierna.",
    url: "https://sealmetrics.com/es/glossary/analytics-data-residency/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    type: "article",
    images: [ogImage("/es/glossary/analytics-data-residency/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Qué es la residencia del dato en analítica?",
    description: "Dónde se procesa y almacena el dato, y qué marco legal lo gobierna.",
    images: [ogImage("/es/glossary/analytics-data-residency/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/analytics-data-residency/",
    languages: getAlternatesEs("/glossary/analytics-data-residency"),
  },
};

export default function AnalyticsDataResidencyEsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Residencia del dato en analítica" }]} locale="es" />
      <JsonLd data={definedTermSchema({ name: "Residencia del dato en analítica", description: "La ubicación geográfica donde se procesa y almacena el dato de analítica, que determina el marco legal aplicable.", url: "/es/glossary/analytics-data-residency", related: [{ name: "Cumplimiento RGPD en analítica", url: glossaryHref("gdpr-analytics-compliance", "es") }, { name: "Recolección de datos first-party", url: glossaryHref("first-party-data-collection", "es") }, { name: "Plataforma de gestión de consentimiento", url: glossaryHref("consent-management-platform", "es") }, { name: "Analítica sin cookies", url: glossaryHref("cookieless-analytics", "es") }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Residencia del dato en analítica", url: "/es/glossary/analytics-data-residency" }], "es")} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">¿Qué es la residencia del dato en analítica?</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              La ubicación geográfica donde se procesa y almacena el dato de analítica. La residencia determina qué marco legal gobierna el dato, qué mecanismos de transferencia hacen falta y si el tratamiento cumple los estándares regionales, como el RGPD.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Por qué importa la residencia</h2>
          <p>
            El dato de analítica —incluso agregado y seudonimizado— queda sujeto a la legislación de protección de datos de la jurisdicción donde se trata. Cuando una empresa europea usa Google Analytics, el dato del visitante se transmite a servidores de Google en Estados Unidos, lo que crea una transferencia internacional que debe ampararse en los mecanismos del capítulo V del RGPD.
          </p>
          <p>
            Las consecuencias del incumplimiento no son teóricas. Desde 2022, las autoridades de protección de datos de Austria, Francia, Italia, Dinamarca, Finlandia y Noruega han resuelto en contra del uso de Google Analytics por garantías de transferencia insuficientes. La CNIL francesa ordenó dejar de usarlo en el plazo de un mes tras su decisión de febrero de 2022. Las multas del art. 83 del RGPD pueden alcanzar el 4% de la facturación anual global o 20 millones de euros, la cifra que sea mayor.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Residencia en la UE bajo el RGPD</h2>
          <p>
            El <Link href={glossaryHref("gdpr-analytics-compliance", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cumplimiento del RGPD en analítica</Link> exige que el dato personal de residentes en la UE se trate dentro del EEE o se transfiera a un tercer país bajo un mecanismo aprobado: decisión de adecuación, cláusulas contractuales tipo o normas corporativas vinculantes.
          </p>
          <p>
            La residencia en la UE elimina la cuestión de la transferencia por completo. Si el dato nunca sale de la UE, no hay transferencia que justificar, ni medidas suplementarias que implementar, ni riesgo de que se invalide una decisión de adecuación, como ocurrió con Privacy Shield en 2020.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Implicaciones de Schrems II</h2>
          <p>
            La sentencia Schrems II de julio de 2020 anuló el Privacy Shield y elevó el listón de las cláusulas contractuales tipo. El tribunal concluyó que las leyes de vigilancia estadounidenses no ofrecen a los ciudadanos europeos una protección equivalente y que las cláusulas por sí solas no cierran esa brecha sin medidas suplementarias.
          </p>
          <p>
            El Marco de Privacidad de Datos UE-EE. UU., adoptado en julio de 2023, aporta una nueva base de adecuación, pero muchos expertos esperan un «Schrems III». La combinación de <Link href={glossaryHref("first-party-data-collection", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">recolección first-party</Link> sobre infraestructura exclusivamente europea y <Link href={glossaryHref("cookieless-analytics", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">analítica sin cookies</Link> que no guarda datos que identifiquen a nadie es la postura de cumplimiento más sólida: sin consentimiento donde aplica la exención de medición de audiencia, sin transferencias y sin depender de decisiones de adecuación cambiantes.
          </p>
        </div>

        <CommercialModule locale="es" hook="Tus datos de analítica pueden vivir en Dublín, bajo jurisdicción europea. Mira cómo es la medición con residencia en la UE sobre tu propio tráfico." />

        <RelatedGlossaryTerms slug="analytics-data-residency" locale="es" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Más: <Link href="/es/security" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Seguridad y arquitectura de privacidad</Link> &middot; <Link href="/es/trust" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Centro de confianza</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
