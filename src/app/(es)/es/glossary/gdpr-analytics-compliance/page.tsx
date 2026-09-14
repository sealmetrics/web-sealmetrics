import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Cumplimiento RGPD en analítica — Glosario Sealmetrics",
  description:
    "Qué exige el RGPD a la analítica web: base legal, minimización de datos, limitación de propósito y consentimiento para tracking con cookies.",
  openGraph: {
    title: "Cumplimiento RGPD en analítica",
    description: "Qué exige el RGPD a la analítica web y cómo la arquitectura sin cookies cambia el problema.",
    type: "article",
    url: "https://sealmetrics.com/es/glossary/gdpr-analytics-compliance/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: [ogImage("/es/glossary/gdpr-analytics-compliance/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Cumplimiento RGPD en analítica",
    description: "Qué exige el RGPD a la analítica web y cómo la arquitectura sin cookies cambia el problema.",
    images: [ogImage("/es/glossary/gdpr-analytics-compliance/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/gdpr-analytics-compliance/",
    languages: getAlternatesEs("/glossary/gdpr-analytics-compliance"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Cumplimiento RGPD analítica" }]} locale="es" />
      <JsonLd data={definedTermSchema({ name: "Cumplimiento RGPD en analítica", description: "Cumplir los requisitos del RGPD para la recolección y tratamiento de datos en analítica web.", url: "/es/glossary/gdpr-analytics-compliance", related: [{ name: "Plataforma de gestión de consentimiento", url: "/glossary/consent-management-platform" }, { name: "Residencia de datos analítica", url: "/glossary/analytics-data-residency" }, { name: "Analítica sin cookies", url: "/es/glossary/cookieless-analytics" }, { name: "Recolección first-party", url: "/glossary/first-party-data-collection" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Cumplimiento RGPD analítica", url: "/es/glossary/gdpr-analytics-compliance" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Cumplimiento RGPD en analítica</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Cumplir los requisitos del RGPD para la analítica web: base legal para el tratamiento, minimización de datos, limitación de propósito y — si se usan cookies — consentimiento válido recogido antes del tracking.
            </p>
          </div>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Requisitos del RGPD para analítica</h2>
          <p>El Reglamento General de Protección de Datos (RGPD) aplica a cualquier tratamiento de datos personales de residentes UE. Para analítica web, los requisitos clave son:</p>
          <ul className="space-y-2 pl-0 list-none">
            {[
              "Base legal — habitualmente consentimiento (Art. 6(1)(a)) para tracking con cookies, o interés legítimo para datos no personales",
              "Minimización de datos — recoger sólo lo necesario para el propósito declarado",
              "Limitación de propósito — usar el dato sólo para el fin de analítica declarado",
              "Limitación del almacenamiento — definir y aplicar periodos de retención",
              "Derechos del interesado — facilitar acceso, rectificación y borrado",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.95rem]">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                {item}
              </li>
            ))}
          </ul>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">La capa ePrivacy</h2>
          <p>Más allá del RGPD, la Directiva ePrivacy (Art. 5(3)) exige consentimiento antes de acceder o almacenar información en el dispositivo del usuario — lo que incluye colocar cookies. Por eso las <Link href="/glossary/consent-management-platform" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">plataformas de gestión de consentimiento</Link> son obligatorias para la analítica con cookies.</p>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Cumplimiento por arquitectura</h2>
          <p>La <Link href="/es/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">analítica sin cookies</Link> aborda el cumplimiento de otra manera. Al no recoger dato personal y no almacenar nada en el dispositivo del visitante, el requisito de consentimiento bajo ePrivacy no aplica y las obligaciones RGPD son mínimas. Es coherente con la guía de la CNIL (Francia), DSK (Alemania) y otras autoridades UE sobre exenciones de medición de audiencia.</p>
        </div>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Qué dice la AEPD en España</h2>
          <p>La guía de cookies de la AEPD, actualizada en 2024, parte de que las cookies analíticas requieren consentimiento previo — y abre una excepción práctica: las herramientas dedicadas exclusivamente a medición de audiencia anónima, sin seguimiento entre sitios, quedan fuera de ese requisito. La excepción no se concede por declararla en la política de cookies: depende de que la herramienta realmente no identifique al visitante ni comparta el dato con terceros con fines propios. En la práctica, esto separa dos mundos que se suelen confundir: instalar GA4 con Consent Mode no lo convierte en medición anónima, mientras que una arquitectura que no escribe nada en el dispositivo ni recoge dato personal sí encaja en el supuesto.</p>
          <p>Junto a la AEPD, el Art. 22.2 de la LSSI-CE es la norma que traspone ePrivacy en España, y es el que fija el deber de información y consentimiento antes de almacenar o acceder a información en el equipo del usuario. La consecuencia operativa para un eCommerce español es concreta: si tu medición depende de cookies, tu dato depende del banner, y el porcentaje de rechazo pasa a ser una variable de negocio, no de compliance. El detalle por país está en <Link href="/gdpr-analytics/spain" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">analítica y RGPD en España</Link>.</p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Qué revisa un DPO antes de aprobar una herramienta</h2>
          <p>El cumplimiento no se demuestra con una casilla marcada, sino con un expediente que alguien pueda leer. Las preguntas que se repiten en una revisión son cuatro: qué dato concreto sale del navegador, dónde se procesa y se almacena, quién más puede acceder a él, y durante cuánto tiempo se conserva. Una herramienta que no recoge direcciones IP, identificadores de dispositivo ni identificadores de usuario reduce las tres primeras a respuestas cortas, y una retención con TTL automático resuelve la cuarta sin depender de un proceso manual.</p>
          <p>Queda la capa de transferencias internacionales. Si el tratamiento ocurre íntegramente en la UE y no hay subencargados fuera del EEE, la evaluación de transferencia posterior a Schrems II deja de aplicar — no porque se haya documentado mejor, sino porque no hay transferencia que evaluar. Es la diferencia entre gestionar un riesgo y eliminarlo, y es la razón por la que la <Link href="/es/security" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">arquitectura</Link> pesa más que la lista de certificaciones.</p>

        <CommercialModule locale="es" hook="Diseñada para el RGPD desde la arquitectura (autoevaluación), no por banner. Mira cómo Sealmetrics mide las visitas sin depender del consentimiento ni tocar datos personales." />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Más: <Link href="/es/security" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Seguridad y arquitectura de privacidad</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
