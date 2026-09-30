import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/legal/LegalPage";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Acuerdo de Encargo de Tratamiento (DPA) — Sealmetrics",
  description:
    "DPA de Sealmetrics (DPA-2026-v2.2). Art. 28 RGPD, garantías AEPD de medición de audiencia, dato de visitante en la UE, subencargados y medidas de seguridad.",
  openGraph: {
    title: "Acuerdo de Encargo de Tratamiento (DPA)",
    description: "Art. 28 RGPD: garantías AEPD de medición de audiencia, dato de visitante en la UE, subencargados y medidas de seguridad.",
    url: "https://sealmetrics.com/es/dpa/",
    siteName: "Sealmetrics",
    type: "website",
    locale: "es_ES",
    images: [ogImage("/es/dpa/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Acuerdo de Encargo de Tratamiento (DPA)",
    description: "Art. 28 RGPD: garantías AEPD de medición de audiencia, dato de visitante en la UE, subencargados y medidas de seguridad.",
    images: [ogImage("/es/dpa/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/dpa/",
    languages: { en: "https://sealmetrics.com/dpa/" },
  },
};

/** The text is `src/lib/content/legal/dpa.es.md`, synced from sealmetrics2 by
 * `scripts/sync-legal.mjs` — edit it there, not here. */
export default function DpaEsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "DPA" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "DPA", url: "/es/dpa" }], "es")} />
      <LegalPage doc="dpa" locale="es" title="Acuerdo de Encargo de Tratamiento (DPA)" alternate="/dpa/" />
    </>
  );
}
