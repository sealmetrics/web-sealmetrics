import type { Metadata } from "next";
import { Calculator } from "../../../(en)/growth-calculator/Calculator";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, webApplicationSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Calculadora de crecimiento — Sealmetrics",
  description: "¿Cuánto ingreso podrías escalar con datos completos? Mete tus números y ve el potencial de crecimiento que tu analítica actual no puede mostrarte.",
  openGraph: {
    title: "Calculadora de crecimiento — Sealmetrics",
    description: "¿Cuánto ingreso podrías escalar con datos completos? Mete tus números y ve el potencial de crecimiento que tu analítica actual no puede mostrarte.",
    type: "website",
    images: [ogImage("/es/growth-calculator/")],
    url: "https://sealmetrics.com/es/growth-calculator/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Calculadora de crecimiento — Sealmetrics",
    description: "¿Cuánto ingreso podrías escalar con datos completos? Mete tus números y ve el potencial de crecimiento que tu analítica actual no puede mostrarte.",
    images: [ogImage("/es/growth-calculator/")],
  },
  alternates: { canonical: "https://sealmetrics.com/es/growth-calculator/", languages: getAlternatesEs("/growth-calculator") },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Calculadora de crecimiento" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Calculadora de crecimiento", url: "/es/growth-calculator" }])} />
      <JsonLd data={webApplicationSchema({ name: "Calculadora de crecimiento", description: "Estima el crecimiento potencial al cambiar a analítica completa.", url: "/es/growth-calculator" })} />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-10">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>Calculadora de crecimiento</span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            ¿Cuánto crecimiento <em>se esconde</em> en tu tráfico sin medir?
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[58ch] leading-[1.55]" style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}>
            Tu analítica captura una fracción del tráfico real. Mete tus números y ve dónde el dato completo te dice que escales.
          </p>
        </div>
      </section>

      <section className="pb-28 bg-warm-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <Calculator locale="es" />
        </div>
      </section>

      <FinalCtaSharedV3
        locale="es"
        titleEn={<>See where to scale.</>}
        titleEs={<>Ve dónde <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>escalar ahora.</em></>}
        ledeEn="30 min live review."
        ledeEs="30 min. Pasamos tu tráfico por la proyección de crecimiento — en directo, contra tu analítica actual."
      />
    </>
  );
}
