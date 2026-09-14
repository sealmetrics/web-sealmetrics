import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { softwareApplicationSchema, breadcrumbSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ProductSignal } from "@/components/v4/ProductSignal";
import "@/components/v4/product-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Producto — Sealmetrics · Analítica completa",
  description:
    "Tracking sin consentimiento, atribución last-click, supervisión LENS AI, SuperAPI y MCP server sobre datos observados en servidor. Sin muestreo.",
  openGraph: {
    title: "Producto — Sealmetrics · Analítica completa",
    description:
      "Stack analítico completo para equipos eCommerce. Sin consentimiento, observado en servidor, alojado en UE. LENS AI + SuperAPI + MCP nativo.",
    type: "website",
    images: [ogImage("/es/product/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/product/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Producto — Sealmetrics · Analítica completa",
    description: "Stack analítico completo para equipos eCommerce. Sin consentimiento, observado en servidor, alojado en UE. LENS AI + SuperAPI + MCP nativo.",
    images: [ogImage("/es/product/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/product/",
    languages: getAlternatesEs("/product"),
  },
};

export default function ProductPageEs() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema({ locale: "es" })} />
      <JsonLd data={breadcrumbSchema([{ name: "Producto", url: "/es/product" }])} />
      <JsonLd data={speakableWebPageSchema({ url: "/es/product", name: "Producto — Sealmetrics" })} />
      <ProductSignal locale="es" />
    </>
  );
}
