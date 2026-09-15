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
  title: "¿Qué es una CMP? — Glosario Sealmetrics",
  description: "Una CMP muestra el banner de cookies y gestiona las preferencias del visitante. Obligatoria bajo RGPD para la analítica con cookies.",
  openGraph: {
    title: "¿Qué es una plataforma de gestión de consentimiento (CMP)?",
    description: "Software que muestra el banner de cookies y gestiona las preferencias del visitante.",
    url: "https://sealmetrics.com/es/glossary/consent-management-platform/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    type: "article",
    images: [ogImage("/es/glossary/consent-management-platform/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Qué es una plataforma de gestión de consentimiento (CMP)?",
    description: "Software que muestra el banner de cookies y gestiona las preferencias del visitante.",
    images: [ogImage("/es/glossary/consent-management-platform/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/consent-management-platform/",
    languages: getAlternatesEs("/glossary/consent-management-platform"),
  },
};

export default function ConsentManagementPlatformEsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Plataforma de gestión de consentimiento" }]} locale="es" />
      <JsonLd data={definedTermSchema({ name: "Plataforma de gestión de consentimiento", description: "Software que gestiona los banners de consentimiento de cookies y las preferencias de privacidad del visitante.", url: "/es/glossary/consent-management-platform", related: [{ name: "Cumplimiento RGPD en analítica", url: glossaryHref("gdpr-analytics-compliance", "es") }, { name: "Analítica sin cookies", url: glossaryHref("cookieless-analytics", "es") }, { name: "Pérdida de datos en analítica", url: glossaryHref("data-loss-in-analytics", "es") }, { name: "Residencia del dato en analítica", url: glossaryHref("analytics-data-residency", "es") }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Plataforma de gestión de consentimiento", url: "/es/glossary/consent-management-platform" }], "es")} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">¿Qué es una plataforma de gestión de consentimiento (CMP)?</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Software que muestra el banner de consentimiento de cookies y gestiona las preferencias del visitante. Obligatorio bajo el RGPD y la Directiva ePrivacy para los sitios que usan cookies o recogen datos personales mediante analítica.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">El coste analítico del consentimiento</h2>
          <p>
            Las CMP son legalmente necesarias para la analítica basada en cookies, pero crean un problema de medición de fondo: quien rechaza las cookies se vuelve invisible para la analítica. En la UE, la analítica que depende del consentimiento pierde entre el 15% y el 60% de los visitantes, según el sector, la fuerza de la marca y el mix de tráfico.
          </p>
          <p>
            Eso introduce un sesgo sistemático en tus datos. Tu analítica sobrerrepresenta al segmento que acepta cookies y pierde por completo al segmento preocupado por la privacidad, que a menudo incluye a los visitantes de mayor valor.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">La alternativa</h2>
          <p>
            La <Link href={glossaryHref("cookieless-analytics", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">analítica sin cookies</Link> no necesita una CMP para funcionar, porque no usa cookies ni recoge datos personales. Eso elimina por completo el vector de pérdida por rechazo de consentimiento manteniendo el <Link href={glossaryHref("gdpr-analytics-compliance", "es")} className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cumplimiento del RGPD</Link>.
          </p>
        </div>

        <CommercialModule locale="es" hook="Un CMP decide qué ve tu analítica. Sealmetrics no guarda nada en el dispositivo, así que no hay nada que pedir — mira tus cifras sin puerta de consentimiento delante." />

        <RelatedGlossaryTerms slug="consent-management-platform" locale="es" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Más: <Link href="/es/blog/consent-banner-impact-on-analytics" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cómo los banners de consentimiento destruyen tus datos</Link> &middot; <Link href="/es/security" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Seguridad y arquitectura de privacidad</Link>
          </p>
        </div>

        <div className="mt-12">
          <QuickAnswer label="Respuesta rápida">
            <p>
              Una plataforma de gestión de consentimiento (CMP) es el software que muestra el banner de cookies, registra la decisión del visitante y comunica a las herramientas de destino (analítica, píxeles publicitarios, tests A/B) si pueden almacenar cookies o leer información del dispositivo. Es obligatoria bajo el art. 7 del RGPD y el art. 5(3) de ePrivacy para cualquier herramienta que use cookies, localStorage o fingerprinting. Lo que eso le cuesta a la analítica varía mucho: las herramientas que dependen del consentimiento pierden entre el 15% y el 60% de los visitantes UE, según el sector, la fuerza de la marca y el mix de tráfico.
            </p>
            <p>
              La consecuencia práctica: la analítica con cookies mide solo la fracción de visitantes que consiente, y eso produce una muestra autoseleccionada que sesga cada decisión de canal y cada tasa de conversión construida sobre ella. Una arquitectura sin consentimiento —sin cookies, sin identificadores, sin almacenamiento en el dispositivo— queda fuera del supuesto del art. 5(3) y del ámbito material del RGPD, así que la capa de analítica no necesita la CMP. Otras herramientas (píxel de Meta, píxel de Google Ads) sí siguen necesitando el banner si permanecen en el stack.
            </p>
          </QuickAnswer>
        </div>
      </div>
    </article>
    </>
  );
}
