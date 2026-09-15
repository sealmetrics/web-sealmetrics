import Link from "next/link";
import { Fragment } from "react";

/* HERO · ES */
export function PricingHeroV3Es() {
  return (
    <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
        {/* Sin badges de roadmap en el hero de precios: la página del dinero
            vende lo que está vivo hoy. El tracking de agentes IA sigue en la
            tabla comparativa, marcado "próximamente". */}
        <span className="eyebrow mb-5 justify-center" style={{ display: "inline-flex" }}>
          Precios
        </span>
        <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
          Paga por <em>humanos.</em> No por bots. No por banners. No por suposiciones.
        </h1>
        <p className="text-ink-soft mt-8 mx-auto max-w-[56ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
          Cada plan incluye analítica completa sobre el 100% de tu tráfico — sin muestreo, sin estimaciones modeladas, sin muros de features. Solo pagas más cuando realmente creces.
        </p>
        <div data-md="skip" className="flex flex-wrap justify-center gap-3 mt-9">
          <Link href="/es/demo" className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-white rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors">
            Reserva una demo <span>→</span>
          </Link>
          <a href="https://my.sealmetrics.com/register" className="inline-flex items-center gap-2 px-7 py-4 border border-warm-200 text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 transition-colors">
            Prueba de 14 días
          </a>
        </div>
        <p className="mt-4 font-mono text-[12px] text-ink-soft uppercase tracking-[0.06em]">
          Prueba de 14 días
        </p>
      </div>
    </section>
  );
}

/* EVERY PLAN INCLUDES · ES */
export function PlanIncludesV3Es() {
  const every = [
    "Webs ilimitadas",
    "Usuarios ilimitados",
    "Propiedades de conversión",
    "24 meses de retención",
    "Tracking sin consentimiento · RGPD",
    "Datos en tiempo real · < 2 min",
    "Análisis de embudos",
    "Vista portfolio multi-site",
    "MCP server + export BigQuery",
    "Acceso API completo",
    "Monitoring & alertas personalizadas",
    "Datos frescos antes de las 6 AM",
  ];
  const diffs = [
    { from: "Agentic", to: "Growth", diff: "5M eventos · soporte email · panel de facturación — los mismos datos completos, sin necesidad de LLM" },
    { from: "Growth", to: "Scale", diff: "15M eventos · Private AI gestionada (5M tokens, sin API key) · Webhooks · Onboarding guiado · Soporte prioritario" },
    { from: "Scale", to: "Enterprise", diff: "Eventos ilimitados · Private AI exclusiva · Account manager · Procesamiento aislado · SLA personalizado" },
  ];

  return (
    <section className="py-28 bg-warm-50 border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">Lo que incluye cada plan</span>
            <h2 className="h-section mt-5">
              Sin muros de features. <em>Nunca chocas con una capacidad de pago.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Todo plan desde Growth incluye la plataforma Sealmetrics completa. Las únicas diferencias entre planes son volumen de eventos, governance y soporte — nunca features.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-3 p-8 bg-white border border-warm-100 rounded-xl mb-6">
          {every.map((f) => (
            <div key={f} className="flex items-start gap-2.5 text-[14.5px] text-ink-2 leading-[1.5]">
              <span className="text-brand font-bold shrink-0">—</span>
              {f}
            </div>
          ))}
        </div>

        <div className="bg-white border border-warm-100 rounded-xl p-8 flex flex-col gap-4">
          <h3 className="font-semibold text-ink tracking-[-0.015em] leading-[1.2]" style={{ fontSize: "clamp(18px, 2vw, 22px)" }}>
            Lo que <em className="italic-accent">cambia entre planes</em>
          </h3>
          {diffs.map((d) => (
            <div key={d.from} className="flex items-start gap-3 text-[14.5px] leading-[1.6] pt-4 border-t border-warm-100">
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-brand bg-brand-soft px-2 py-1 rounded shrink-0 whitespace-nowrap">
                {d.from} → {d.to}
              </span>
              <p className="text-ink-soft">{d.diff}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* TRAFFIC COUNTING · ES */
export function TrafficCountingV3Es() {
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">Cómo se cuenta el tráfico</span>
            <h2 className="h-section mt-5">
              Contamos humanos. <em>Los bots son gratis.</em> Los agentes IA también.
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Otras analíticas te cobran por cada evento, incluido el ruido de bots. Nosotros solo contamos interacciones humanas reales. Los bots tradicionales se filtran. El tráfico de agentes IA (ChatGPT, Claude, Perplexity) se trackea aparte — y nunca cuenta contra tu límite.
          </p>
        </div>

        <div className="bg-white border border-warm-100 rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1.2fr] border-b border-warm-100 bg-warm-50 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-bold">
            <div className="p-5">Tipo de tráfico</div>
            <div className="p-5 text-center">Trackeado</div>
            <div className="p-5 text-center">Cuenta al límite</div>
            <div className="p-5">Visible en</div>
          </div>
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1.2fr] border-b border-warm-100">
            <div className="p-5 md:p-6 text-ink font-semibold text-[15px]">Humanos</div>
            <div className="p-5 md:p-6 text-center">
              <span className="inline-flex w-[22px] h-[22px] rounded-full bg-brand text-ink items-center justify-center text-[12px] font-bold">✓</span>
            </div>
            <div className="p-5 md:p-6 text-center text-[14px] text-ink font-medium">Sí</div>
            <div className="p-5 md:p-6 text-[14px] text-ink-soft">Human Analytics</div>
          </div>
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1.2fr] border-b border-warm-100">
            <div className="p-5 md:p-6 text-ink font-semibold text-[15px] flex items-center gap-2 flex-wrap">
              Agentes IA
              <span className="inline-block px-2 py-0.5 text-[9.5px] font-mono font-semibold uppercase tracking-[0.06em] text-ink-soft border border-warm-200 rounded">
                Próximamente
              </span>
            </div>
            <div className="p-5 md:p-6 text-center">
              <span className="inline-flex w-[22px] h-[22px] rounded-full bg-brand text-ink items-center justify-center text-[12px] font-bold">✓</span>
            </div>
            <div className="p-5 md:p-6 text-center text-[14px] text-brand font-semibold">No · gratis</div>
            <div className="p-5 md:p-6 text-[14px] text-ink-soft">Agent Analytics</div>
          </div>
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
            <div className="p-5 md:p-6 text-ink-soft font-semibold text-[15px]">Bots tradicionales</div>
            <div className="p-5 md:p-6 text-center">
              <span className="inline-flex w-[22px] h-[22px] rounded-full items-center justify-center text-[12px] font-bold" style={{ background: "#F5E1DE", color: "#B5423B" }}>✕</span>
            </div>
            <div className="p-5 md:p-6 text-center text-[14px] text-ink-soft">Filtrados</div>
            <div className="p-5 md:p-6 text-[14px] text-ink-soft">No se muestran</div>
          </div>
        </div>

        <div className="mt-6 p-6 md:p-7 rounded-xl text-[14.5px] leading-[1.65] text-ink-2 relative overflow-hidden" style={{ background: "rgba(45,139,109,0.04)", borderLeft: "3px solid #2D8B6D" }}>
          <b className="text-ink font-semibold block mb-2">Importante al estimar tu plan</b>
          Sealmetrics captura el 100% del tráfico — incluidos los visitantes que rechazan cookies en otras herramientas. Tu número de eventos en Sealmetrics será significativamente mayor que el de GA4. Al elegir plan, estima tu tráfico real a <b className="text-ink">2–3× lo que GA4 muestra</b>. Te lo avisamos proactivamente la primera semana.
        </div>
      </div>
    </section>
  );
}

/* PLAN ADAPTS · ES */
export function PlanAdaptsV3Es() {
  const cards = [
    { title: "Nunca cortamos tus datos", desc: "Independientemente de tu uso, el tracking no se detiene. Nunca bloqueamos, limitamos ni muestreamos. Datos completos es nuestra promesa — no la rompemos por facturación." },
    { title: "Si creces, tu plan crece contigo", desc: "Si tu tráfico supera el plan 2+ meses seguidos, subimos automáticamente en el siguiente ciclo. Confirmación por email, sin llamadas de ventas. Los planes mensuales se ajustan al siguiente mes. Los anuales, solo en la renovación." },
    { title: "Si necesitas menos, te lo decimos", desc: "Si tu uso baja del 50% del plan durante 3+ meses, te enviamos un email proactivo con opción de bajar en un click. Si no haces nada, nada cambia. Preferimos que pagues por lo que necesitas." },
    { title: "Los picos estacionales corren de nuestra cuenta", desc: "Black Friday. Rebajas de enero. Una campaña viral. Un mes de exceso al año está incluido gratis y nunca activa un cambio de plan. Tu negocio tiene picos — tu factura de analítica no debería penalizarte por ellos." },
  ];

  return (
    <section className="py-28 bg-warm-50 border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">Cómo se adapta tu plan</span>
            <h2 className="h-section mt-5">
              Tu plan <em>escala contigo</em> — con transparencia.
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Nunca bloqueamos tu tracking. Nunca te sorprendemos con facturas. Sin cobro por evento, sin cargos variables, sin calculadora necesaria.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map((c) => (
            <article key={c.title} className="bg-white border border-warm-100 rounded-xl p-8">
              <h3 className="font-semibold text-ink tracking-[-0.015em] leading-[1.25] mb-3" style={{ fontSize: "clamp(18px, 1.9vw, 22px)" }}>
                {c.title}
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-ink-soft">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FULL COMPARISON · ES */
interface ComparisonRow { feature: string; agentic: string | boolean; growth: string | boolean; scale: string | boolean; enterprise: string | boolean; }
interface ComparisonSection { category: string; rows: ComparisonRow[]; }

const comparisonDataEs: ComparisonSection[] = [
  {
    category: "Analítica core",
    rows: [
      { feature: "Tracking sin consentimiento (RGPD)", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Datos en tiempo real (<2 min)", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Páginas vistas y sesiones", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Atribución UTM y canal", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Analítica por dispositivo y geo", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Análisis de embudos", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Frescura de datos", agentic: "Normalmente < 2 min", growth: "Normalmente < 2 min", scale: "Normalmente < 2 min", enterprise: "Normalmente < 2 min" },
      { feature: "Dato completo antes de las 6 AM (SLA)", agentic: true, growth: true, scale: true, enterprise: true },
    ],
  },
  {
    category: "Agent Analytics (próximamente)",
    rows: [
      { feature: "Detección de agentes IA", agentic: false, growth: false, scale: "Próximamente", enterprise: "Próximamente" },
      { feature: "Scoring de agentes (300+ señales)", agentic: false, growth: false, scale: "Próximamente", enterprise: "Próximamente" },
      { feature: "HTTP signatures (RFC 9421)", agentic: false, growth: false, scale: "Próximamente", enterprise: "Próximamente" },
      { feature: "Detección de proveedor (OpenAI, Anthropic…)", agentic: false, growth: false, scale: "Próximamente", enterprise: "Próximamente" },
    ],
  },
  {
    category: "eCommerce",
    rows: [
      { feature: "Tracking de conversiones", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Tracking de microconversiones", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Propiedades de conversión", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Atribución de ingresos", agentic: true, growth: true, scale: true, enterprise: true },
    ],
  },
  {
    category: "LENS AI y Private AI",
    rows: [
      { feature: "LENS chat — pregunta a tus datos en lenguaje natural", agentic: false, growth: true, scale: true, enterprise: true },
      { feature: "Reporting semanal y mensual", agentic: false, growth: true, scale: true, enterprise: true },
      { feature: "Reglas de detección de anomalías", agentic: false, growth: "Próximamente", scale: "Próximamente", enterprise: "Próximamente" },
      { feature: "Forecasting y predicción", agentic: false, growth: "Próximamente", scale: "Próximamente", enterprise: "Próximamente" },
      { feature: "Oportunidades de crecimiento", agentic: false, growth: "Próximamente", scale: "Próximamente", enterprise: "Próximamente" },
      { feature: "Trae tus API keys (Anthropic / OpenAI / Gemini / DeepSeek)", agentic: false, growth: true, scale: true, enterprise: true },
      { feature: "Private AI gestionada en infraestructura UE (gpt-oss-120b · Scaleway), sin API key", agentic: false, growth: "Add-on", scale: "5M tokens", enterprise: "Incluida" },
      { feature: "Tokens extra de Private AI — 358,80€ / pack de 5M", agentic: false, growth: true, scale: true, enterprise: true },
      { feature: "Instancia de Private AI dedicada, no compartida", agentic: false, growth: false, scale: false, enterprise: true },
    ],
  },
  {
    category: "Monitoring & alertas (próximamente)",
    rows: [
      { feature: "Alertas críticas", agentic: false, growth: "Próximamente", scale: "Próximamente", enterprise: "Próximamente" },
      { feature: "Monitoring de negocio", agentic: false, growth: "Próximamente", scale: "Próximamente", enterprise: "Próximamente" },
      { feature: "Gestión de riesgo", agentic: false, growth: "Próximamente", scale: "Próximamente", enterprise: "Próximamente" },
      { feature: "Alertas personalizadas", agentic: false, growth: "Próximamente", scale: "Próximamente", enterprise: "Próximamente" },
    ],
  },
  {
    category: "Datos & API",
    rows: [
      { feature: "Acceso API completo", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "MCP server", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Export CSV / JSON", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Export BigQuery", agentic: true, growth: true, scale: true, enterprise: true },
      { feature: "Webhooks", agentic: false, growth: false, scale: true, enterprise: true },
      { feature: "Límite de API (req/min)", agentic: "240", growth: "240", scale: "480", enterprise: "Personalizado" },
    ],
  },
  {
    category: "Governance",
    rows: [
      { feature: "Logs de auditoría", agentic: false, growth: false, scale: true, enterprise: true },
      { feature: "Control de acceso por rol", agentic: "Básico", growth: "Básico", scale: "Avanzado", enterprise: "Completo" },
      { feature: "Procesamiento aislado", agentic: false, growth: false, scale: false, enterprise: true },
    ],
  },
  {
    category: "Soporte",
    rows: [
      { feature: "Soporte email", agentic: false, growth: true, scale: true, enterprise: true },
      { feature: "Soporte chat", agentic: false, growth: false, scale: true, enterprise: true },
      { feature: "Soporte prioritario", agentic: false, growth: false, scale: true, enterprise: true },
      { feature: "Account manager dedicado", agentic: false, growth: false, scale: false, enterprise: true },
      { feature: "Onboarding", agentic: "Solo docs", growth: "Docs self-service", scale: "1 sesión", enterprise: "White-glove" },
      { feature: "SLA de uptime", agentic: "—", growth: "99%", scale: "99,5%", enterprise: "99,9%" },
    ],
  },
  {
    category: "Infraestructura",
    rows: [
      { feature: "Eventos humanos / mes", agentic: "1M en total · gratis", growth: "5M", scale: "15M", enterprise: "Ilimitado" },
      { feature: "Webs", agentic: "Ilimitado", growth: "Ilimitado", scale: "Ilimitado", enterprise: "Ilimitado" },
      { feature: "Usuarios y cuentas", agentic: "Ilimitado", growth: "Ilimitado", scale: "Ilimitado", enterprise: "Ilimitado" },
      { feature: "Retención de datos", agentic: "24 meses", growth: "24 meses", scale: "24 meses", enterprise: "24 meses" },
    ],
  },
];

function CellEs({ value }: { value: string | boolean }) {
  if (value === true) {
    return <span className="inline-flex w-[20px] h-[20px] rounded-full bg-brand text-ink items-center justify-center text-[11px] font-bold">✓</span>;
  }
  if (value === false) return <span className="text-ink-mute">—</span>;
  return <span className="text-[13.5px] text-ink-2">{value}</span>;
}

export function FullComparisonV3Es() {
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[56rem] mx-auto text-center mb-14">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
            Capacidades completas
          </span>
          <h2 className="h-section mt-5 mx-auto">
            Cada capacidad, <em>cada plan.</em>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-ink-soft">
            El cuadro completo. Recorre las categorías que te importan.
          </p>
        </div>

        <div className="bg-white border border-warm-100 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1.6fr_0.9fr_0.9fr_0.9fr_0.9fr] border-b border-warm-100 bg-warm-50 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-bold">
            <div className="p-5">Feature</div>
            <div className="p-5 text-center text-ink">
              Agentic
              <span className="block text-[9px] text-brand tracking-[0.06em]">Gratis</span>
            </div>
            <div className="p-5 text-center">Growth</div>
            <div className="p-5 text-center text-ink" style={{ background: "rgba(45,139,109,0.05)", borderLeft: "2px solid #2D8B6D", borderRight: "2px solid #2D8B6D" }}>
              Scale
            </div>
            <div className="p-5 text-center">Enterprise</div>
          </div>
          {comparisonDataEs.map((section) => (
            <Fragment key={section.category}>
              <div className="px-5 py-3 bg-warm-white border-b border-warm-100 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink font-bold">
                {section.category}
              </div>
              {section.rows.map((row, i) => {
                const isLast = i === section.rows.length - 1 && section === comparisonDataEs[comparisonDataEs.length - 1];
                return (
                  <div key={row.feature} className={`grid grid-cols-[1.6fr_0.9fr_0.9fr_0.9fr_0.9fr] items-center ${isLast ? "" : "border-b border-warm-100"}`}>
                    <div className="p-4 md:p-5 text-[14px] text-ink-2 leading-[1.4]">{row.feature}</div>
                    <div className="p-4 md:p-5 text-center"><CellEs value={row.agentic} /></div>
                    <div className="p-4 md:p-5 text-center"><CellEs value={row.growth} /></div>
                    <div className="p-4 md:p-5 text-center" style={{ background: "rgba(45,139,109,0.04)", borderLeft: "2px solid #2D8B6D", borderRight: "2px solid #2D8B6D" }}>
                      <CellEs value={row.scale} />
                    </div>
                    <div className="p-4 md:p-5 text-center"><CellEs value={row.enterprise} /></div>
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>

        <p className="mt-8 text-center text-[14.5px] text-ink-soft">
          Solo pagas más si creces. <b className="text-ink">Todas las features core están siempre incluidas.</b>
        </p>
      </div>
    </section>
  );
}

/* FINAL CTA · ES */
export function PricingFinalCtaV3Es() {
  return (
    <section id="audit" className="py-20 bg-white border-t border-warm-100">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
        <div className="bg-ink text-white rounded-[20px] px-12 py-16 md:py-20 text-center relative overflow-hidden">
          <div aria-hidden className="absolute pointer-events-none" style={{ right: -100, top: -100, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,139,109,0.3),transparent 70%)" }} />
          <h2 className="text-white font-semibold leading-[1.1] tracking-[-0.03em] mx-auto max-w-[22ch] relative" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
            Primero ve tus datos. <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Luego eliges plan.</em>
          </h2>
          <p className="text-white/70 text-[16px] leading-[1.55] mt-6 mb-8 mx-auto max-w-[52ch] relative">
            Walkthrough de 30 min con el founder. Pasamos tu web por la calculadora de gap en directo y te recomendamos el plan que encaja. Sin slides, sin pitch comercial, sin secuencia de emails.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 flex-wrap relative">
            <a href="https://cal.sealmetrics.com/rafa/30min" className="inline-flex items-center justify-center gap-2 bg-white text-ink px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-95">
              Reserva walkthrough con Rafa →
            </a>
            <Link href="/es/product" className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:bg-white/5">
              Ver producto
            </Link>
          </div>
          <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.1em] font-semibold mt-6 relative">
            Hecho por un founder · soportado por un founder · alojado en UE por diseño
          </p>
        </div>
      </div>
    </section>
  );
}
