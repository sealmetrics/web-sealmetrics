import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import {
  softwareApplicationSchema,
  statisticClaimSchema,
  quotationSchema,
  speakableWebPageSchema,
} from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import {
  ProblemSection,
  FeaturedCase,
  SolutionStepsPLG,
  FourPillars,
  Connectors,
  PricingPLG,
  FinalUrgencyV3,
} from "@/components/sections/v3/HomeV3";
import { ComparatorGA4Es } from "@/components/sections/v3/HomeV3EsPart2";
import { CfoObjectionHome } from "@/components/sections/v3/HomeDSections";
import { FeatureLensAIV3Es } from "@/components/sections/v3/ProductV3SectionsEs";
import { FaqV3Es } from "@/components/sections/v3/FaqV3Es";
import { BlindnessCalculator } from "@/components/homepage/BlindnessCalculator";
import { StickyCtaBar } from "@/components/homepage/StickyCtaBar";
import { HeroV3Es, LogosStripEs } from "@/components/sections/v3/HomeV3Es";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Sealmetrics — Analítica sin consentimiento para eCommerce",
  description:
    "Analítica sin consentimiento para eCommerce: no pierde visitas por el rechazo del banner, sin cookies ni modelos. Cuadra con Shopify. Alojado en Dublín.",
  openGraph: {
    title: "Sealmetrics — Analítica sin consentimiento para eCommerce",
    description:
      "Mide tu tráfico sin depender del consentimiento. Sin cookies. Sin modelos. Presenta números board-ready que cuadran con Shopify. Alojado en Dublín.",
    type: "website",
    images: [ogImage("/es/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics — Analítica sin consentimiento para eCommerce",
    description: "Mide tu tráfico sin depender del consentimiento. Sin cookies. Sin modelos. Presenta números board-ready que cuadran con Shopify. Alojado en Dublín.",
    images: [ogImage("/es/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/",
    languages: getAlternatesEs("/"),
  },
};

export default function HomeEs() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema({ locale: "es" })} />
      <JsonLd data={speakableWebPageSchema({ url: "/es", name: "Sealmetrics — datos completos para eCommerce" })} />
      <JsonLd data={statisticClaimSchema({
        text: "El 40% del tráfico entrante no tenía atribución de source/medium en el stack de medición anterior.",
        source: "Auditoría interna de Palladium Hotel Group sobre atribución de tráfico",
        sourceAuthor: "Palladium Hotel Group",
        sourceDate: "2026-04-15",
        url: "/es",
        numericValue: 40,
        unit: "PERCENT",
      })} />
      <JsonLd data={statisticClaimSchema({
        text: "El 35% de las reservas registradas en GA4 no podían asignarse al canal que las había generado.",
        source: "Brecha de atribución de reservas · Palladium Hotel Group",
        sourceAuthor: "Palladium Hotel Group",
        sourceDate: "2026-04-15",
        url: "/es",
        numericValue: 35,
        unit: "PERCENT",
      })} />
      <JsonLd data={statisticClaimSchema({
        text: "Mejora del +165% en Coste por Búsqueda en Display tras aplicar un modelo de medición basado en Sealmetrics sobre DV360.",
        source: "Mejora de eficiencia DV360 · Palladium Hotel Group",
        sourceAuthor: "Palladium Hotel Group",
        sourceDate: "2026-04-15",
        url: "/es",
        numericValue: 165,
        unit: "PERCENT",
      })} />
      <JsonLd data={quotationSchema({
        text: "Los datos que da Sealmetrics son agnósticos, no están sesgados y son neutrales. No hay caja negra.",
        spokenBy: "Toni Andújar",
        spokenByRole: "Director Digital y Venta Directa, Palladium Hotel Group",
        url: "/es",
      })} />
      <JsonLd data={quotationSchema({
        text: "Ya no es una herramienta que está al lado del proceso. Es la herramienta que nos da el dato real — y con la que tomamos decisiones.",
        spokenBy: "Eduardo Martin",
        spokenByRole: "Analytics & Campañas, Dreamplace Hotels",
        url: "/es",
      })} />
      <HeroV3Es />
      <LogosStripEs />
      <ProblemSection locale="es" />
      <BlindnessCalculator locale="es" />
      <ComparatorGA4Es />
      <FeaturedCase locale="es" />
      <SolutionStepsPLG locale="es" />
      <FourPillars locale="es" />
      <Connectors locale="es" />
      <CfoObjectionHome locale="es" />
      <PricingPLG locale="es" />
      <FaqV3Es />
      <FeatureLensAIV3Es />
      {/* El bloque GEO va ANTES del cierre a propósito: lo último que ve el
          visitante debe ser el slab de urgencia, no un apéndice de SEO. */}
      <section className="bg-warm-white border-t border-warm-100 py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <QuickAnswer label="Respuesta rápida">
            <p>
              Sealmetrics es la fuente neutral de verdad para el eCommerce europeo — una plataforma de analítica web sin cookies que mide el tráfico entrante sin depender del consentimiento, atribuye las conversiones last-click a nivel de canal y está diseñada para el RGPD desde la arquitectura (autoevaluación), no con una capa de consentimiento añadida después. Alojada exclusivamente en Dublín, Irlanda sobre infraestructura propiedad UE, elimina la revisión Schrems II que GA4 + Consent Mode requiere y el gap del 40-60% de rechazo de consentimiento que rompe el ROAS agregado por canal en Europa.
            </p>
            <p>
              Los clientes la usan para alinear marca, agencias de medios, finanzas y analítica interna sobre un único número que cada parte acepta. Palladium Hotel Group recuperó el 40% del tráfico previamente sin atribuir y mejoró el Coste por Búsqueda en Display un +165% en DV360 tras cambiar el modelo de medición. Precio desde €499/mes con facturación anual.
            </p>
          </QuickAnswer>
        </div>
      </section>
      <FinalUrgencyV3 locale="es" />
      <StickyCtaBar locale="es" />
    </>
  );
}
