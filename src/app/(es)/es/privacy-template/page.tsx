import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/legal/LegalPage";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

/* El texto modelo que los clientes copian en su propia política de privacidad
   (cláusula 3.6.a del DPA). Es el `{{template_url}}` del email de septiembre de 2026.

   noindex/follow por decisión: es un documento de trabajo para clientes, al que se
   llega desde ese email y desde el dashboard, y un resultado de búsqueda o una
   respuesta de IA que lo citara presentaría el texto modelo para la web de otro como
   la política de Sealmetrics. */
export const metadata: Metadata = {
  title: "Plantilla de privacidad para clientes — Sealmetrics",
  description:
    "Texto modelo para la sección de analítica de la política de privacidad de un cliente de Sealmetrics: Bloque A siempre, B a F según configuración. v3.0.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Plantilla de privacidad para clientes de Sealmetrics",
    description:
      "Texto modelo para la sección de analítica de tu política de privacidad, según lo que tengas activado. Versión 3.0.",
    url: "https://sealmetrics.com/es/privacy-template/",
    siteName: "Sealmetrics",
    type: "website",
    locale: "es_ES",
    images: [ogImage("/es/privacy-template/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Plantilla de privacidad para clientes de Sealmetrics",
    description:
      "Texto modelo para la sección de analítica de tu política de privacidad, según lo que tengas activado. Versión 3.0.",
    images: [ogImage("/es/privacy-template/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/privacy-template/",
    languages: { en: "https://sealmetrics.com/privacy-template/" },
  },
};

/** El texto es `src/lib/content/legal/privacy-template.es.md`, sincronizado desde
 * sealmetrics2 por `scripts/sync-legal.mjs`: se edita allí, no aquí. */
export default function PrivacyTemplateEsPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Política de Privacidad", href: "/es/privacy/" }, { label: "Plantilla para clientes" }]}
        locale="es"
      />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "Política de Privacidad", url: "/es/privacy" },
            { name: "Plantilla para clientes", url: "/es/privacy-template" },
          ],
          "es",
        )}
      />
      <LegalPage
        doc="privacy-template"
        locale="es"
        title="Plantilla de política de privacidad para clientes de Sealmetrics"
        alternate="/privacy-template/"
        copyBlocks
      />
    </>
  );
}
