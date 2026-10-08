import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Centro de confianza — Sealmetrics",
  description: "Dónde vive la documentación legal y de seguridad de Sealmetrics: DPA, Términos, Seguridad, Política de Privacidad y documentos previa solicitud.",
  openGraph: {
    title: "Centro de confianza — Sealmetrics",
    description: "Dónde vive la documentación legal y de seguridad: DPA, Términos, Seguridad, Privacidad y documentos previa solicitud.",
    url: "https://sealmetrics.com/es/trust/",
    siteName: "Sealmetrics",
    type: "website",
    locale: "es_ES",
    images: [ogImage("/es/trust/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Centro de confianza — Sealmetrics",
    description: "Dónde vive la documentación legal y de seguridad: DPA, Términos, Seguridad, Privacidad y documentos previa solicitud.",
    images: [ogImage("/es/trust/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/trust/",
    languages: { en: "https://sealmetrics.com/trust/" },
  },
};

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-4 mt-12">
      {children}
    </h2>
  );
}

function DocCard({
  title,
  desc,
  href,
  altHref,
  altLabel,
  version,
  external,
}: {
  title: string;
  desc: string;
  href: string;
  altHref?: string;
  altLabel?: string;
  version?: string;
  external?: boolean;
}) {
  return (
    <div className="border border-warm-100 rounded-md p-5 flex flex-col gap-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <a
          href={href}
          className="text-[0.98rem] font-semibold text-text-primary underline"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {title}
        </a>
        {version && (
          <span className="text-[0.75rem] text-text-tertiary whitespace-nowrap">
            {version}
          </span>
        )}
      </div>
      <p className="text-[0.88rem] leading-relaxed text-text-secondary m-0">
        {desc}
      </p>
      {altHref && (
        <p className="text-[0.8rem] text-text-tertiary m-0">
          <a href={altHref} className="underline">
            {altLabel}
          </a>
        </p>
      )}
    </div>
  );
}

export default function TrustEsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Centro de confianza" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Centro de confianza", url: "/es/trust" }], "es")} />
    <section className="pt-12 pb-28 bg-white">
      <div className="max-w-[800px] mx-auto px-5 sm:px-8">
        <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-6">
          Legal
        </span>
        <h1 className="headline-hero mb-4">Centro de confianza</h1>
        <p className="text-[0.9rem] text-text-tertiary mb-10">
          Última actualización: 30 de julio de 2026 ·{" "}
          <a href="/trust/" className="underline">
            English version
          </a>
        </p>

        <div className="text-[0.95rem] leading-[1.75] text-text-secondary">
          <p>
            Esta página es el índice de la documentación legal y de seguridad
            de Sealmetrics. Todos los documentos están versionados; la versión
            y fecha de cada entrada identifican la edición vigente. Los
            documentos no públicos están disponibles previa solicitud en las
            condiciones de la sección 2.
          </p>

          <H>1. Documentos públicos</H>
          <div className="space-y-4">
            <DocCard
              title="Acuerdo de Encargo de Tratamiento (DPA)"
              desc="DPA conforme al Art. 28 RGPD, con la lista de subencargados autorizados como Anexo 3."
              href="/es/dpa/"
              altHref="/dpa/"
              altLabel="English version (/dpa)"
              version="v2.0 · jul 2026"
            />
            <DocCard
              title="Términos del Servicio"
              desc="El contrato que rige el uso del servicio Sealmetrics."
              href="/es/terms/"
              altHref="/terms/"
              altLabel="English version (/terms)"
              version="v2.0 · jul 2026"
            />
            <DocCard
              title="Seguridad"
              desc="Arquitectura de privacidad, seguridad de infraestructura y alojamiento de la analítica solo en la UE."
              href="/es/security/"
              altHref="/security/"
              altLabel="English version (/security)"
              version="v2.0 · jul 2026"
            />
            <DocCard
              title="Política de Privacidad"
              desc="Cómo trata Sealmetrics los datos personales como responsable (web, cuenta, facturación). Disponible en inglés."
              href="/privacy/"
              version="v2.0 · jul 2026"
            />
            <DocCard
              title="Documentación de cumplimiento"
              desc="Self-assessments por país, exención de cookies analíticas y derechos de los interesados — mantenida en docs.sealmetrics.com."
              href="https://docs.sealmetrics.com/compliance"
              altHref="https://docs.sealmetrics.com/security-privacy"
              altLabel="Sección de seguridad y privacidad en docs.sealmetrics.com"
              external
            />
          </div>

          <H>2. Disponible previa solicitud</H>
          <p>
            Los siguientes documentos se comparten previa solicitud escribiendo
            a{" "}
            <a href="mailto:privacy@sealmetrics.com" className="underline">
              privacy@sealmetrics.com
            </a>
            , con NDA ligero cuando aplique:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>
              Evaluación de impacto (DPIA) completa.
            </li>
            <li>
              Evaluación de interés legítimo (LIA) de la capa de atribución.
            </li>
            <li>
              Evaluación documentada de conformidad con la guía AEPD de
              medición de audiencia (sección III.C.2).
            </li>
            <li>Cuestionarios de seguridad para compradores.</li>
          </ul>

          <H>3. Suscripción a cambios</H>
          <p>
            Para recibir notificaciones de cambios de subencargados y de
            actualizaciones de los documentos legales de esta página, escribe a{" "}
            <a
              href="mailto:privacy@sealmetrics.com?subject=Subprocessor%20updates"
              className="underline"
            >
              privacy@sealmetrics.com
            </a>{" "}
            con el asunto &laquo;Subprocessor updates&raquo;.
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
