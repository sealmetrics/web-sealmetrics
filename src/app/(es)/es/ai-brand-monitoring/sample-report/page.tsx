import type { Metadata } from "next";
import { BrandReportSample } from "@/components/v4/BrandReportSample";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-report-viewer.css";

const title = "Informe de marca en IA de muestra — Acme Coffee";
const description =
  "El informe completo de monitorización de marca en IA, hecho para una marca de café ficticia: diecinueve modelos, seis preguntas y cada respuesta entera.";
const url = "https://sealmetrics.com/es/ai-brand-monitoring/sample-report/";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [ogImage("/ai-brand-monitoring/sample-report/")],
    url,
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title,
    description,
    images: [ogImage("/ai-brand-monitoring/sample-report/")],
  },
  alternates: { canonical: url },
  // Una muestra hecha sobre una marca ficticia: sus respuestas son inventadas y van con
  // nombres de modelos reales, así que queda fuera del buscador y del gemelo Markdown. El
  // sitemap y llms.txt lo derivan de aquí.
  robots: { index: false, follow: true },
};

export default function PaginaInformeMuestra() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Monitorización de marca en IA", url: "/es/ai-brand-monitoring" },
          { name: "Informe de muestra", url: "/es/ai-brand-monitoring/sample-report" },
        ])}
      />
      <BrandReportSample locale="es" />
    </>
  );
}
