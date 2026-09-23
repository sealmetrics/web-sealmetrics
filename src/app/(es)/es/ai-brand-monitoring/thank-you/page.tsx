import type { Metadata } from "next";
import { BrandReportThankYou } from "@/components/v4/BrandReportThankYou";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-monitoring-signal.css";

const title = "Tu informe de marca está en camino — Sealmetrics";
const description =
  "Diecisiete modelos están contestando ahora mismo las seis preguntas sobre tu empresa. El informe llega a tu correo en unos cinco minutos.";
const url = "https://sealmetrics.com/es/ai-brand-monitoring/thank-you/";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [ogImage("/es/ai-brand-monitoring/thank-you/")],
    url,
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title,
    description,
    images: [ogImage("/es/ai-brand-monitoring/thank-you/")],
  },
  alternates: { canonical: url },
  // Página de confirmación: es para quien acaba de enviar el formulario, no
  // para el buscador. Que quede fuera del sitemap y de llms.txt se deriva de
  // aquí, nunca de una lista mantenida a mano. Ver CLAUDE.md, reglas de SEO.
  robots: { index: false, follow: false },
};

export default function PaginaGraciasInformeMarca() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "Monitorización de marca en IA", url: "/es/ai-brand-monitoring" },
            { name: "Gracias", url: "/es/ai-brand-monitoring/thank-you" },
          ],
          "es"
        )}
      />
      <BrandReportThankYou locale="es" />
    </>
  );
}
