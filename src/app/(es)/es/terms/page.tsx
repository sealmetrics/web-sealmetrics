import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/legal/LegalPage";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Términos del Servicio — Sealmetrics",
  description: "Términos del Servicio de Sealmetrics (v2.1): planes, facturación, uso aceptable, propiedad de los datos, responsabilidad y terminación.",
  openGraph: {
    title: "Términos del Servicio — Sealmetrics",
    description: "Condiciones de uso de la plataforma: planes, facturación, uso aceptable, propiedad de los datos, responsabilidad y terminación.",
    url: "https://sealmetrics.com/es/terms/",
    siteName: "Sealmetrics",
    type: "website",
    locale: "es_ES",
    images: [ogImage("/es/terms/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Términos del Servicio — Sealmetrics",
    description: "Condiciones de uso de la plataforma: planes, facturación, uso aceptable, propiedad de los datos, responsabilidad y terminación.",
    images: [ogImage("/es/terms/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/terms/",
    languages: { en: "https://sealmetrics.com/terms/" },
  },
};

/** The text is `src/lib/content/legal/terms.es.md`, synced from sealmetrics2 by
 * `scripts/sync-legal.mjs` — edit it there, not here. */
export default function TermsEsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Términos del Servicio" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Términos del Servicio", url: "/es/terms" }], "es")} />
      <LegalPage doc="terms" locale="es" title="Términos del Servicio" alternate="/terms/" />
    </>
  );
}
