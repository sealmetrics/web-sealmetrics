import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import { breadcrumbSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { LogosStripEs } from "@/components/sections/v3/HomeV3Es";
import { FaqAccordionV3 } from "@/components/sections/v3/FaqAccordionV3";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Analítica Web Moderna — Datos limpios para IA",
  description:
    "Analítica web moderna vs. legacy: sin pérdida por consentimiento, sin sampling, agnóstica de canal, diseñada para el RGPD (autoevaluación) y lista para IA.",
  openGraph: {
    title: "Analítica Web Moderna — Datos limpios para IA",
    description:
      "El fin de la analítica basada en cookies. Datos limpios, sin sampling, lista para IA vía MCP. Comprueba la diferencia.",
    type: "website",
    images: [ogImage("/es/modern-analytics/")],
    url: "https://sealmetrics.com/es/modern-analytics/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica Web Moderna — Datos limpios para IA",
    description: "La vanguardia de la analítica web. Sin cookies. Sin sampling. Sin modelado.",
    images: [ogImage("/es/modern-analytics/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/modern-analytics/",
    languages: getAlternates("/modern-analytics"),
  },
  keywords: [
    "analitica web moderna",
    "analitica sin cookies",
    "analitica first party",
    "analitica para agentes ia",
    "mcp analitica",
    "analitica sin modelado",
    "analitica sin sampling",
    "analitica gdpr",
    "alternativa a google analytics",
  ],
};

const faqs = [
  {
    q: "¿Qué significa exactamente \"analítica moderna\"?",
    a: "La analítica moderna es la nueva generación de medición web: cookieless por arquitectura, mide eventos en servidor sin depender de banners de consentimiento, nunca samplea, nunca modela datos faltantes y expone datos limpios a nivel de evento a humanos y agentes IA mediante estándares como MCP. Sealmetrics es la implementación production-grade de ese enfoque.",
  },
  {
    q: "¿En qué se diferencia de herramientas cookieless como Plausible o Fathom?",
    a: "Las herramientas cookieless ligeras se centran en privacidad y simplicidad pero se quedan en métricas de página. La analítica moderna añade atribución last-click completa, conversion items con propiedades denormalizadas, microconversiones, detección de agentes, content groups y un servidor MCP para que los agentes IA consulten directamente. Es la diferencia entre un contador privacy-friendly y un warehouse analítico decision-grade.",
  },
  {
    q: "¿Por qué importa el \"sin modelado\"?",
    a: "GA4 rellena los huecos por consentimiento rechazado con modelos estadísticos. El output parece completo pero es una estimación sintética, no medición. Cuando optimizas inversión publicitaria sobre datos modelados, el algoritmo persigue fantasmas. La analítica moderna mide cada evento real, así cada decisión se basa en comportamiento observado.",
  },
  {
    q: "¿Qué quiere decir lista para agentes IA?",
    a: "Significa que un LLM o agente autónomo (Claude, ChatGPT Operator, copilots internos) puede conectar a la plataforma analítica mediante el Model Context Protocol (MCP) y consultar revenue, conversiones, embudos y propiedades en lenguaje natural — sin que tengas que construir dashboards. Sealmetrics incluye un servidor MCP con 40+ herramientas listas.",
  },
  {
    q: "¿Es realmente compatible con GDPR y ePrivacy?",
    a: "Está diseñada para serlo; es nuestra autoevaluación, no una certificación. No hay datos personales, ni cookies, ni localStorage, ni fingerprinting. Los eventos se agregan en totales por canal en servidor. El marco de la AEPD y el artículo 6(1)(f) del GDPR (interés legítimo) cubren este enfoque. No se requiere banner de consentimiento para medición.",
  },
  {
    q: "¿Cómo migro desde mi analítica actual?",
    a: "No migras — añades. Coloca el píxel de Sealmetrics junto a tu GA4 o Adobe actual, corre ambos durante 30 días y compara con tu CRM. La mayoría de equipos mantiene la herramienta legacy como conducto a Google Ads y empieza a tomar decisiones con Sealmetrics.",
  },
  {
    q: "¿Escala para tráfico enterprise?",
    a: "Sí. El píxel maneja miles de millones de eventos al mes en un servicio Go horizontalmente escalable respaldado por ClickHouse. Entre los clientes hay grupos hoteleros europeos y otras marcas enterprise multipropiedad. Hosted en la UE (Dublín) por defecto.",
  },
];

const pillars = [
  {
    eyebrow: "Sin pérdida por consentimiento",
    title: "Datos limpios",
    body: "Visitantes y eventos contados acepten o no el banner. Ningún banner de consentimiento bloqueando la medición, ningún ad-blocker borrando tráfico, ningún bloqueador de JS limpiando datos. Conteo first-party en servidor que captura la verdad.",
    metric: "+40-60%",
    metricLabel: "más tráfico UE vs cookies",
  },
  {
    eyebrow: "Agnóstica de fuente",
    title: "Agnóstica de canal",
    body: "Atribución last-click computada sobre eventos crudos, no sobre conversiones reportadas por la plataforma. Google Ads, Meta, orgánico, directo, dark social — todos medidos igual, en igualdad de condiciones.",
    metric: "1 fuente",
    metricLabel: "de verdad, no siete",
  },
  {
    eyebrow: "Sin modelado",
    title: "Sin sintéticos",
    body: "Nunca inventamos datos. Sin relleno estadístico, sin \"conversiones modeladas\", sin imputación conductual. Si lo reportamos, ocurrió. Auditable hasta el ID del evento.",
    metric: "0 fantasmas",
    metricLabel: "en tu dashboard",
  },
  {
    eyebrow: "Sin sampling",
    title: "Resolución completa",
    body: "Cada evento aterriza en ClickHouse. Sin sampling Card-2, sin umbrales de \"alta cardinalidad\". Consulta la cola larga de SKUs, terms, países y microconversiones sin truncar.",
    metric: "0%",
    metricLabel: "de consultas muestreadas",
  },
  {
    eyebrow: "AI native",
    title: "Lista para agentes IA",
    body: "Servidor Model Context Protocol (MCP) nativo con 40+ tools. Claude, copilots internos y agentes IA pueden tirar de revenue, conversiones, embudos y propiedades en lenguaje natural.",
    metric: "40+ tools",
    metricLabel: "vía MCP de serie",
  },
  {
    eyebrow: "Cumplimiento",
    title: "Diseñada para el RGPD",
    body: "Sin cookies. Sin localStorage. Sin fingerprint. Sin datos personales. Hosted en la UE (Dublín). Sin banner de consentimiento para medición bajo GDPR + ePrivacy.",
    metric: "0 cookies",
    metricLabel: "0 banners requeridos",
  },
];

const comparisonRows: Array<{ feature: string; legacy: string; modern: string }> = [
  { feature: "Cookies / fingerprinting", legacy: "Requerido", modern: "Ninguno" },
  { feature: "Banner de consentimiento", legacy: "Sí", modern: "No" },
  { feature: "Tráfico UE capturado", legacy: "40-60%", modern: "Sin pérdida por consentimiento" },
  { feature: "Sampling en queries pesadas", legacy: "Sí (Card-2 / umbrales)", modern: "No" },
  { feature: "Datos modelados / sintéticos", legacy: "Sí, % no revelado", modern: "Nunca" },
  { feature: "Modelo de atribución", legacy: "Data-driven (caja negra)", modern: "Last-click sobre eventos crudos" },
  { feature: "Detalle de conversion items", legacy: "Agregado", modern: "1 fila por ítem, denormalizado" },
  { feature: "Propiedades custom", legacy: "Claves limitadas, sampleadas", modern: "Map(String, String), sin sampling" },
  { feature: "Acceso MCP / agente IA", legacy: "No", modern: "Sí — 40+ tools" },
  { feature: "Residencia de datos", legacy: "Mayoritariamente US", modern: "UE (Dublín)" },
  { feature: "Modelo de pricing", legacy: "Gratis (tú eres el producto)", modern: "Transparente, con tope" },
];

const useCases = [
  {
    role: "CMO",
    headline: "Decisiones sobre la verdad, no sobre estimaciones",
    body: "Deja de redistribuir presupuesto sobre conversiones modeladas. Mira el ROAS real por canal y dónde se fuga el spend antes del cierre de trimestre.",
  },
  {
    role: "eCommerce Manager",
    headline: "Cada SKU, cada variante, consultable",
    body: "Profundiza en talla, color, bucket de precio y ratio cart-to-purchase por categoría — sin que los umbrales de sampling oculten la cola larga.",
  },
  {
    role: "Director Comercial / Direct",
    headline: "Curva de pickup directa y desplazamiento OTA",
    body: "Sigue el share de huéspedes directos vs OTA, mix de países en reservas premium y la distribución de días-a-check-in.",
  },
  {
    role: "Builder de IA",
    headline: "Despliega un analista Claude en una tarde",
    body: "Conecta el servidor MCP de Sealmetrics a Claude o a tu copilot interno y deja que responda preguntas de revenue en lenguaje natural.",
  },
];

export default function ModernAnalyticsPageEs() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Analítica Web Moderna" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Analítica Web Moderna", url: "/es/modern-analytics" },
        ])}
      />

      {/* HERO */}
      <section className="bg-warm-white border-b border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-[920px]">
            <span className="eyebrow mb-6 block">Analítica web moderna</span>
            <h1
              className="font-semibold leading-[1.05] tracking-[-0.035em] text-ink"
              style={{ fontSize: "clamp(44px, 6.4vw, 88px)" }}
            >
              El fin de la analítica con cookies.{" "}
              <em
                className="italic font-medium"
                style={{ color: "#2D8B6D", fontStyle: "italic" }}
              >
                Los datos limpios son el nuevo estándar.
              </em>
            </h1>
            <p className="mt-8 text-[19px] leading-[1.6] text-ink-soft max-w-[68ch]">
              La analítica legacy depende de cookies, consentimiento, sampling y modelado. La analítica
              moderna mide cada evento real en servidor, atribuye revenue last-click sobre datos crudos
              y los expone a humanos y agentes IA mediante MCP. Sin estimaciones, sin banners, sin puntos ciegos.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 flex-wrap">
              <Link
                href="/es/demo"
                className="inline-flex items-center justify-center bg-ink text-white px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-110"
              >
                Pruébalo gratis →
              </Link>
              <Link
                href="/es/audit"
                className="inline-flex items-center justify-center border border-warm-200 text-ink px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50"
              >
                Auditoría gratuita de medición
              </Link>
            </div>
            <p className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.12em] mt-8">
              30 días en paralelo · Hosted en UE
            </p>
          </div>
        </div>
      </section>

      <TldrBlock
        label="TL;DR"
        answer={
          <>
            La analítica web moderna mide el tráfico <strong>sin depender del consentimiento</strong> ni de cookies, nunca
            samplea, nunca modela, y expone datos limpios a nivel de evento a agentes IA mediante el{" "}
            <strong>Model Context Protocol</strong>. Sealmetrics es esa plataforma — production-grade,
            hosted en UE y lista para la era post-cookie y first-AI.
          </>
        }
        bullets={[
          <>Analítica legacy con cookies: 40-60% de pérdida de tráfico UE, huecos modelados, hosted en US.</>,
          <>Analítica moderna: sin pérdida por consentimiento, last-click sobre datos crudos, hosted en UE, lista para agentes IA.</>,
          <>Sin migración. Corre las dos durante 30 días. Decide con tus propios números.</>,
        ]}
      />

      <LogosStripEs />

      {/* SIX PILLARS */}
      <section className="py-24 border-t border-warm-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px] mb-16">
            <span className="eyebrow mb-5 block">Qué significa moderna</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(36px, 4.4vw, 60px)" }}
            >
              Seis propiedades que separan{" "}
              <em
                className="italic font-medium"
                style={{ color: "#2D8B6D", fontStyle: "italic" }}
              >
                lo moderno de lo legacy.
              </em>
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft">
              Cualquier plataforma de analítica moderna debería pasar las seis. La mayoría de las legacy no pasan ninguna.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-warm-100 bg-warm-50 p-7 hover:border-warm-200 transition-colors"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-brand">
                  {p.eyebrow}
                </span>
                <h3 className="mt-3 text-[22px] font-semibold text-ink leading-[1.2]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">{p.body}</p>
                <div className="mt-6 pt-5 border-t border-warm-100">
                  <span className="block text-[28px] font-semibold text-ink leading-none">
                    {p.metric}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft mt-2 block">
                    {p.metricLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 border-t border-warm-100 bg-warm-50">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px] mb-14">
            <span className="eyebrow mb-5 block">Comparativa directa</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
            >
              Legacy basada en cookies vs analítica moderna.
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-warm-100 bg-white">
            <table className="w-full text-left">
              <thead className="bg-warm-50 border-b border-warm-100">
                <tr>
                  <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                    Propiedad
                  </th>
                  <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                    Legacy con cookies
                  </th>
                  <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-brand">
                    Moderna (Sealmetrics)
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`${i !== comparisonRows.length - 1 ? "border-b border-warm-100" : ""}`}
                  >
                    <td className="px-6 py-4 text-[15px] text-ink font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-[15px] text-ink-soft">{row.legacy}</td>
                    <td className="px-6 py-4 text-[15px] text-ink font-semibold">{row.modern}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AI AGENTS / MCP */}
      <section className="py-24 border-t border-warm-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="eyebrow mb-5 block">Lista para agentes IA</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}
            >
              Tus datos, consultables en lenguaje natural.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft">
              Sealmetrics incluye un servidor MCP (Model Context Protocol) nativo con 40+ tools.
              Conecta Claude, ChatGPT o tu copilot interno y deja que tire de revenue, conversiones,
              performance de landings y propiedades de producto bajo demanda.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Conecta con Claude Desktop, Claude Code o cualquier cliente compatible con MCP",
                "40+ herramientas de solo lectura: overview, canales, conversiones, embudos, landings, propiedades",
                "Combina con MCPs de Google Ads, Meta Ads o Search Console para cruzar inversión y búsquedas con los ingresos medidos",
                "Solo lectura, limitado a los sitios que puede abrir la cuenta, con límite de peticiones según el plan",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-[15px] leading-[1.55] text-ink-soft"
                >
                  <span className="text-brand font-bold mt-0.5" aria-hidden>
                    →
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href="/es/demo"
                className="inline-flex items-center justify-center bg-ink text-white px-7 py-3.5 rounded-md text-[14px] font-semibold no-underline hover:brightness-110"
              >
                Pruébalo gratis →
              </Link>
              <Link
                href="https://docs.sealmetrics.com/web-analytics-prompts"
                className="inline-flex items-center justify-center border border-warm-200 text-ink px-7 py-3.5 rounded-md text-[14px] font-semibold no-underline hover:bg-warm-50"
              >
                Ver 130+ prompts →
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-warm-100 bg-dark-bg p-8 text-white shadow-[0_24px_60px_-24px_rgba(14,14,12,0.5)]">
            <div className="font-mono text-[11px] text-white/50 uppercase tracking-[0.12em] mb-4">
              Claude · MCP · Sealmetrics
            </div>
            <p className="font-mono text-[13px] leading-[1.7] text-white/90">
              <span className="text-brand-soft">{">"}</span> Dame las 10 landings con bounce rate
              {" >"} 70% y más de 500 visitas la semana pasada.
            </p>
            <div className="my-6 h-px bg-white/10" />
            <p className="text-[13px] leading-[1.7] text-white/80">
              Consultando Sealmetrics para el sitio <code className="text-amber">acme.com</code>… 14
              landings coinciden. Top 3 por entradas perdidas:{" "}
              <code className="text-amber">/black-friday-2026</code>,{" "}
              <code className="text-amber">/promo-cyber</code>,{" "}
              <code className="text-amber">/sale-electronics</code>. Causa probable: mismatch de tráfico
              paid — 78% mobile, LCP lento. ¿Quieres que prepare propuestas de fix?
            </p>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 border-t border-warm-100 bg-warm-50">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px] mb-14">
            <span className="eyebrow mb-5 block">Pensada para el equipo moderno</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
            >
              Una plataforma, varios roles.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((u) => (
              <div
                key={u.role}
                className="rounded-2xl border border-warm-100 bg-white p-8"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-brand">
                  {u.role}
                </span>
                <h3 className="mt-3 text-[22px] font-semibold text-ink leading-[1.25]">
                  {u.headline}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordionV3
        locale="es"
        items={faqs}
        titleEs={
          <>
            Las <em>preguntas</em> que hace primero un CMO.
          </>
        }
        ledeEs="Respuestas honestas sobre analítica moderna, agentes IA y qué cambia cuando dejas de medir con cookies."
      />

      <FinalCtaSharedV3
        locale="es"
        titleEn={
          <>
            Stop deciding on estimates.{" "}
            <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              Start deciding on truth.
            </em>
          </>
        }
        titleEs={
          <>
            Deja de decidir con estimaciones.{" "}
            <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              Empieza a decidir con la verdad.
            </em>
          </>
        }
        ledeEn="Install Sealmetrics alongside your current analytics. Run both for 30 days. Compare with your own CRM. If the gap isn't real, you owe us nothing."
        ledeEs="Instala Sealmetrics junto a tu analítica actual. Corre los dos 30 días. Compara con tu propio CRM. Si el gap no es real, no nos debes nada."
        primaryTextEn="Try free →"
        primaryTextEs="Pruébalo gratis →"
      />
    </>
  );
}
