import type { Metadata } from "next";
import { competitor } from "@/lib/content/competitors";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { TldrBlock } from "@/components/ui/TldrBlock";
import { breadcrumbSchema, comparisonPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { LogosStripEs } from "@/components/sections/v3/HomeV3Es";
import {
  VsGA4HeroV3,
  VsGA4GapStatsV3,
  DashboardPatternsV3,
  VsGA4TableV3,
  RunBothV3,
} from "@/components/sections/v3/VsGA4V3Sections";
import { FaqAccordionV3 } from "@/components/sections/v3/FaqAccordionV3";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ComparisonByline } from "@/components/sections/v3/ComparisonByline";
import { ComparisonMethodology } from "@/components/sections/v3/ComparisonMethodology";
import { quotationSchema } from "@/lib/schema";
import Link from "next/link";
import { ogImage } from "@/lib/seo/og";

const VS_GA4_DATE_MODIFIED = "2026-09-14";

export const metadata: Metadata = {
  title: "Sealmetrics vs Google Analytics 4 — Datos completos",
  description:
    "Comparativa honesta. GA4 pierde 40–60% del tráfico UE por consentimiento y ad blockers. Sealmetrics no depende del consentimiento. Corre ambos 30 días.",
  openGraph: {
    title: "Sealmetrics vs Google Analytics 4 — Datos completos",
    description: "Comparativa feature a feature. Honesta.",
    type: "website",
    images: [ogImage("/es/vs-ga4/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/vs-ga4/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics vs Google Analytics 4 — Datos completos",
    description: "Comparativa feature a feature. Honesta.",
    images: [ogImage("/es/vs-ga4/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/vs-ga4/",
    languages: getAlternatesEs("/vs-ga4"),
  },
};

const faqs = [
  { q: "¿Tengo que reemplazar GA4?", a: "No. La mayoría de clientes corren Sealmetrics junto a GA4 — de hecho lo recomendamos los primeros 30 días para comparar en paralelo con tus propios números del CRM." },
  { q: "¿Sealmetrics se conecta a Google Ads?", a: "Sí, vía export BigQuery y API. Para import nativo de conversiones en Google Ads, puedes mantener GA4 — Sealmetrics es tu fuente de verdad para decisiones, GA4 tu conducto a Google Ads." },
  { q: "¿Es realmente sin consentimiento?", a: "Sí. Sin cookies, sin localStorage, sin fingerprinting. Conteo first-party de eventos en servidor, agregado en totales por canal sin ningún identificador personal. Por eso, según nuestra autoevaluación frente a los criterios de la CNIL y la AEPD, la medición no necesita banner bajo RGPD ni ePrivacy. No es una certificación." },
  { q: "¿Cuánto cuesta la migración?", a: "Nada. No hay migración. Añade un script a tu web y corre los dos en paralelo. La mayoría de equipos nunca quitan GA4 del todo — simplemente dejan de tomar decisiones con él." },
  { q: "¿Qué fiabilidad tiene el 40–60% de rechazo de consentimiento?", a: "Es media cross-industry para tráfico UE con un banner estándar. Tu tasa depende de sector, dispositivo y diseño del banner. El gap es menor en B2B, mayor en B2C consumer." },
  { q: "¿Puedo usar los datos en mi BigQuery?", a: "Sí. Export a BigQuery a resolución completa incluido en todos los planes, también en el Agentic gratuito — sin ETL, sin muestreo. Tu warehouse recibe cada evento, igual que tu dashboard." },
  { q: "¿Y el tier gratis de GA4? ¿No es una barrera?", a: "GA4 es gratis porque tú eres el producto — tus datos entrenan los modelos de Google Ads. Sealmetrics desde €499/mes anual. Para un equipo que invierte €20K+/mes en paid media, es un error de redondeo comparado con el coste de inversión mal asignada sobre datos incompletos." },
];

export default function VsGA4PageEs() {
  return (
    <>
      <Breadcrumbs items={[{ label: "vs Google Analytics 4" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "vs Google Analytics 4", url: "/es/vs-ga4" }])} />
      <JsonLd data={comparisonPageSchema({ name: "Sealmetrics vs Google Analytics 4 (GA4)", description: "Comparativa honesta: Sealmetrics vs GA4 en completitud de dato UE, dependencia de consentimiento, atribucion y disposicion IA.", url: "/es/vs-ga4", competitor: competitor("google-analytics-4"), datePublished: "2026-04-15", dateModified: VS_GA4_DATE_MODIFIED, author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez" }, criteria: ["Tráfico UE capturado (con banner vs sin banner)", "Dependencia del banner de consentimiento", "Arquitectura basada en cookies vs cookieless", "Umbrales de muestreo de datos en informes estándar", "Atribución last-click sobre eventos observados", "Residencia del dato y postura Schrems II", "Precio para eCommerce enterprise", "Qué puede leer un agente IA (dataset completo vs subconjunto post-consentimiento)", "Tiempo hasta el primer informe de decisión"] })} />
      <JsonLd data={quotationSchema({
        text: "Los datos que da Sealmetrics son agnósticos, no están sesgados y son neutrales. No hay caja negra.",
        spokenBy: "Toni Andújar",
        spokenByRole: "Director Digital y Venta Directa, Palladium Hotel Group",
        url: "/es/vs-ga4",
      })} />

      <VsGA4HeroV3 locale="es" />
      <div className="-mt-12 mb-2 max-w-[1200px] mx-auto px-5 sm:px-8">
        <ComparisonByline dateModified={VS_GA4_DATE_MODIFIED} locale="es" />
      </div>
      <TldrBlock
        label="En resumen"
        answer={
          <>GA4 típicamente pierde el <strong>40–60% del tráfico UE</strong> por rechazo de consentimiento, ad-blockers e Intelligent Tracking Prevention de Apple — y luego reconstruye parte con modelado estadístico. Sealmetrics mide el tráfico con un pixel first-party sin cookies, sin depender del consentimiento, atribuye ingresos last-click sobre eventos observados y está diseñada para el RGPD desde la arquitectura. La mayoría de equipos corren ambos 30 días en paralelo y toman decisiones con Sealmetrics.</>
        }
        bullets={[
          <>GA4: limitado por consentimiento, muestreado, US-hosted, propiedad de Google — ideal como conducto a Google Ads.</>,
          <>Sealmetrics: sin consentimiento, resolución completa, alojado en Dublín — ideal para decidir con ingresos.</>,
          <>Sin migración — instala el pixel junto a GA4 y compara con tus propios números.</>,
        ]}
      />
      <LogosStripEs />
      <VsGA4GapStatsV3 locale="es" />
      <DashboardPatternsV3 locale="es" />
      <VsGA4TableV3 locale="es" />
      <RunBothV3 locale="es" />
      <FaqAccordionV3
        locale="es"
        items={faqs}
        titleEs={<>Las <em>objeciones</em>, respondidas.</>}
        ledeEs="Lo que CMOs y CTOs realmente preguntan antes de reemplazar (o complementar) GA4."
      />
      {/* Migración — Palladium Hotel Group cambió desde un stack GA */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand font-semibold">
            Cambiaron desde un stack Google Analytics
          </span>
          <h2 className="text-[26px] sm:text-[32px] font-semibold tracking-[-0.02em] text-ink mt-3 mb-6 leading-[1.15]">
            Cómo Palladium Hotel Group recuperó <em className="italic-accent">el 40% de tráfico sin atribuir</em>.
          </h2>
          <blockquote
            className="border-l-[3px] pl-6 py-1 italic"
            style={{ borderColor: "#2E5C8A", color: "#0E0E0C" }}
          >
            <p className="text-[20px] leading-[1.45] tracking-[-0.01em] font-medium">
              &ldquo;Los datos que da Sealmetrics son agnósticos, no están sesgados y son neutrales. No hay caja negra.&rdquo;
            </p>
            <cite className="block mt-4 not-italic font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
              Toni Andújar · Director Digital y Venta Directa · Palladium Hotel Group
            </cite>
          </blockquote>
          <p className="mt-6 text-[15.5px] leading-[1.65] text-ink-2">
            Palladium corrió Sealmetrics junto a su stack GA. La auditoría reveló un
            40% del tráfico entrante sin atribución de source/medium, un 35% de las
            reservas sin asignar a canal en GA4, y una mejora del +165% en
            Coste-por-Búsqueda en Display tras dirigir las decisiones de DV360 con el
            modelo de medición de Sealmetrics. Mantuvieron GA4 como conducto a
            Google Ads y empezaron a decidir ingresos con Sealmetrics.
          </p>
          <Link
            href="/es/case-studies/palladium-hotel-group"
            className="inline-flex items-center gap-2 mt-6 text-ink font-semibold no-underline border-b border-warm-200 pb-px hover:border-ink"
          >
            Lee el caso completo de Palladium →
          </Link>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="es"
        titleEn={<>Run both for 30 days. <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Then decide.</em></>}
        titleEs={<>Corre los dos 30 días. <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Y entonces decide.</em></>}
        ledeEn="Install Sealmetrics alongside GA4. Compare with your own CRM."
        ledeEs="Instala Sealmetrics junto a GA4. Compara con tu propio CRM. Si el gap no es real, no nos debes nada."
      />

      <ComparisonMethodology
        locale="es"
        competitor="Google Analytics 4"
        dateModified={VS_GA4_DATE_MODIFIED}
      />
      <section className="bg-warm-white border-t border-warm-100 py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <QuickAnswer label="Respuesta rápida">
            <p>
              Sealmetrics vs Google Analytics 4 (GA4): GA4 es la plataforma de analítica gratuita de Google — alojada en EE. UU., basada en cookies, muestreada a escala y dependiente de un banner de consentimiento en toda la UE. Sealmetrics es una plataforma cookieless alojada en la UE que mide el tráfico entrante sin depender del consentimiento y atribuye cada conversión last-click sobre eventos observados, desde 499€/mes con facturación anual.
            </p>
            <p>
              Para el eCommerce europeo el gap es estructural: GA4 pierde el 40–60% del tráfico UE por rechazo de consentimiento y reconstruye parte con modelado estadístico, mientras la ITP de Safari y los ad blockers erosionan más. Sealmetrics mide ese mismo tráfico con un píxel first-party ligero — sin cookies, sin muestreo, sin revisión Schrems II — así el revenue del informe cuadra con Shopify. La mayoría corre ambos en paralelo 30 días, concilia con su CRM y mueve las decisiones de revenue a Sealmetrics manteniendo GA4 como conducto de Google Ads.
            </p>
          </QuickAnswer>
        </div>
      </section>
    </>
  );
}
