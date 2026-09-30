import type { Metadata } from "next";
import { BrandReportViewer } from "@/components/v4/BrandReportViewer";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-report-viewer.css";

const title = "Tu informe completo de marca en IA — Sealmetrics";
const description =
  "El informe completo de lo que diecinueve modelos de IA dicen de tu marca, tras el enlace privado que te enviamos por correo. Está en línea 30 días.";
const url = "https://sealmetrics.com/es/ai-brand-monitoring/report/";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [ogImage("/ai-brand-monitoring/report/")],
    url,
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title,
    description,
    images: [ogImage("/ai-brand-monitoring/report/")],
  },
  alternates: { canonical: url },
  // Cada informe se abre sólo con su enlace privado, y sin el token que va tras
  // el `#` la página no muestra nada. Es para quien pidió el informe, nunca para
  // el buscador; el sitemap y llms.txt lo derivan de aquí.
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function PaginaInformeCompleto() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Monitorización de marca en IA", url: "/es/ai-brand-monitoring" },
          { name: "Informe completo", url: "/es/ai-brand-monitoring/report" },
        ])}
      />
      <BrandReportViewer locale="es" />
    </>
  );
}
