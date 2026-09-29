import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { pricingSchema, breadcrumbSchema, faqPageSchema, softwareApplicationSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { PricingSignal } from "@/components/v4/PricingSignal";
import { pricingSignalFaqItems } from "@/lib/content/pricing-signal";
import "@/components/v4/pricing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Precios Sealmetrics — Paga por humanos, no por bots",
  description:
    "El primer millón de eventos gratis, en total y sin tarjeta. Después, planes desde €499/mes anual con todas las features.",
  openGraph: {
    title: "Precios Sealmetrics — Paga por humanos, no por bots",
    description:
      "Analítica completa desde €499/mes. Todas las features en cada plan. Los bots no se facturan. 1M de eventos gratis.",
    type: "website",
    images: [ogImage("/es/pricing/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/pricing/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Precios Sealmetrics — Paga por humanos, no por bots",
    description: "Analítica completa desde €499/mes. Todas las features en cada plan. Los bots no se facturan. 1M de eventos gratis.",
    images: [ogImage("/es/pricing/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/pricing/",
    languages: getAlternatesEs("/pricing"),
  },
};

export default function PricingPageEs() {
  return (
    <>
      <JsonLd data={pricingSchema([
        { name: "Agentic", price: "0", description: "1M eventos humanos en total · gratis · sin tarjeta · desde la web o tu asistente de IA" },
        { name: "Growth", price: "499", description: "5M eventos humanos/mes · anual" },
        { name: "Scale", price: "899", description: "15M eventos humanos/mes · anual" },
      ], { locale: "es" })} />
      <JsonLd data={softwareApplicationSchema({ locale: "es" })} />
      <JsonLd data={breadcrumbSchema([{ name: "Precios", url: "/es/pricing" }])} />
      <JsonLd data={faqPageSchema(pricingSignalFaqItems.es, "/es/pricing")} />
      <PricingSignal locale="es" />
    </>
  );
}
