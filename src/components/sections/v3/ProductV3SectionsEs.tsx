import Link from "next/link";

/* HERO · ES */
export function ProductHeroV3Es() {
  return (
    <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
        <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
          La plataforma
        </span>
        <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
          Analítica completa, <em>sin compromisos.</em>
        </h1>
        <p className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
          Un stack analítico completo para equipos eCommerce: tracking sin consentimiento, atribución de ingresos, LENS AI, SuperAPI y MCP server — todo sobre los mismos datos a resolución completa. Sin muestreo. Sin modelado.
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
          Prueba de 14 días · no se cobra nada si cancelas · alojado en UE
        </p>
      </div>
    </section>
  );
}

/* PROBLEM NARRATIVE · ES — pain before solution */
export function ProblemNarrativeV3Es() {
  const cards = [
    {
      title: "La paradoja de Meta",
      scenario:
        "Tu campaña en Meta marca 340 conversiones en el píxel. El CRM marca 180. Tu agencia defiende el primer número. Tu CFO quiere el segundo. Nadie en la sala sabe explicar la diferencia.",
      reframe:
        "Los números divergen porque el píxel está bloqueado o deduplicado por aproximadamente la mitad del tráfico europeo. El píxel no se equivoca — está viendo una porción de la realidad distinta a la del CRM.",
    },
    {
      title: "El cubo \u201Cdirect / none\u201D",
      scenario:
        "Abres GA4. Filtras por canal. Entre el 40 y el 60% de tus conversiones cae en \u201Cdirect\u201D o \u201C(none)\u201D. Sabes que no son visitas directas. Lo que no sabes es a qué canal pertenecían.",
      reframe:
        "Ese cubo es la silueta de visitantes que rechazaron el consentimiento o llegaron con bloqueador. Las campañas que de verdad los trajeron son invisibles en tu atribución — y en tu decisión de presupuesto.",
    },
    {
      title: "La reunión trimestral de reconciliación",
      scenario:
        "Un martes recurrente. Noventa minutos. La agencia llega con un número. Analítica interna con otro distinto. Finanzas con un tercero. La reunión termina con \u201Clo cerramos offline\u201D — otra vez.",
      reframe:
        "El coste no es la reunión. Es que las decisiones reales de presupuesto — dónde recortar, dónde doblar la apuesta — se posponen porque nadie confía en el dato base.",
    },
  ];
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">El problema</span>
            <h2 className="h-section mt-5">
              Cuatro herramientas. Cuatro números. <em>Una reunión.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Cada semana, alguien en tu organización está reconciliando GA4, Meta Ads, Google Ads y el CRM. Tres no coinciden. El cuarto es el que en secreto crees. El problema no son los datos — es qué decisiones puedes defender.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((c) => (
            <article
              key={c.title}
              className="bg-warm-50 border border-warm-100 rounded-xl p-8 flex flex-col gap-4 min-h-[360px]"
            >
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink leading-[1.2]">
                {c.title}
              </h3>
              <p className="text-[14.5px] leading-[1.55] text-ink-2">{c.scenario}</p>
              <p className="text-[14.5px] leading-[1.55] text-ink-soft mt-auto pt-4 border-t border-warm-100">
                <em className="italic-accent not-italic font-medium">Por qué pasa —</em> {c.reframe}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FOUR PILLARS · ES */
export function FourPillarsV3Es() {
  const pillars = [
    { n: "01 · Captura", title: "Tracking sin consentimiento", p: "First-party, sin cookies, RGPD-safe. Tráfico sin pérdida por consentimiento — no una fracción." },
    { n: "02 · Atribuye", title: "Atribución de ingresos", p: "Cada euro enlazado a canal, campaña y creatividad. Last-click sobre datos completos." },
    { n: "03 · Entiende", title: "LENS AI", p: "Pregunta a tus datos y crea informes — en lenguaje natural." },
    { n: "04 · Activa", title: "API · MCP · BigQuery", p: "Envía datos reales a warehouses, agentes IA y BI — desde el día uno." },
  ];
  return (
    <section className="py-28 bg-warm-50 border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">La plataforma</span>
            <h2 className="h-section mt-5">
              Cuatro pilares. <em>Una sola imagen.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Sealmetrics no son cuatro herramientas pegadas. Es un solo pipeline: del primer visitante observado a la atribución last-touch que firma tu CFO.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[1px] bg-warm-100 border border-warm-100 rounded-2xl overflow-hidden">
          {pillars.map((p) => (
            <div key={p.title} className="bg-white p-8 min-h-[200px] flex flex-col">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-brand mb-4">{p.n}</div>
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] leading-[1.25] mb-2 text-ink">{p.title}</h3>
              <p className="text-[14px] leading-[1.55] text-ink-soft">{p.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FEATURE BLOCK · wrapper */
function FeatureBlockEs({ tag, title, lede, bullets, visual, reversed = false, bgClass = "bg-white" }: {
  tag: string; title: React.ReactNode; lede: string; bullets: string[]; visual: React.ReactNode; reversed?: boolean; bgClass?: string;
}) {
  return (
    <section className={`py-28 border-t border-warm-100 ${bgClass}`}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className={`grid md:grid-cols-2 gap-14 md:gap-20 items-center ${reversed ? "md:[&>*:first-child]:order-2" : ""}`}>
          <div>
            <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand bg-brand-soft px-3 py-1 rounded-md mb-5">
              {tag}
            </span>
            <h3 className="font-semibold text-ink tracking-[-0.03em] leading-[1.05]" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
              {title}
            </h3>
            <p className="text-[17px] leading-[1.6] text-ink-soft mt-5">{lede}</p>
            <ul className="mt-6 flex flex-col">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3 items-center py-2.5 border-b border-warm-100 text-[15px] text-ink-2 leading-[1.45]">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          {visual}
        </div>
      </div>
    </section>
  );
}

/* FEATURE · LENS AI ES */
export function FeatureLensAIV3Es() {
  return (
    <FeatureBlockEs
      tag="LENS AI"
      title={<>Haz una pregunta a tus datos.<br />Obtén una <em>respuesta real.</em></>}
      lede="LENS AI lee tus datos a resolución completa y responde en lenguaje natural. Pregúntale por qué se movieron los ingresos, qué canal lo sostuvo o qué hizo una landing la semana pasada — y convierte la respuesta en un informe que puedas enviar."
      bullets={[
        "Pregunta lo que quieras sobre ingresos, embudo y canales",
        "Respuestas ancladas en tus propios números, nunca inventadas",
        "Convierte cualquier respuesta en un informe compartible",
        "Informes semanales y mensuales en tu inbox",
      ]}
      visual={<LensChatVisualEs />}
    />
  );
}

function LensChatVisualEs() {
  return (
    <div className="bg-ink text-white rounded-[20px] p-8 md:p-10 min-h-[380px] flex flex-col justify-center relative overflow-hidden">
      <div aria-hidden className="absolute pointer-events-none" style={{ right: -80, top: -80, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,139,109,0.35),transparent 70%)" }} />
      <div className="relative">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase mb-4" style={{ color: "#E8B84B" }}>● LENS AI</div>
        <h4 className="text-[20px] font-semibold mb-6 leading-[1.3]">¿Qué pasó con paid social ayer?</h4>
        <div className="flex flex-col gap-2.5">
          <div className="self-end max-w-[85%] bg-white/10 text-white px-4 py-3 rounded-[14px] rounded-br-[4px] text-[13px] leading-[1.45]">
            ¿Por qué cayó paid social un 22%?
          </div>
          <div className="self-start max-w-[90%] px-4 py-3 rounded-[14px] rounded-bl-[4px] text-[13px] leading-[1.5] font-medium" style={{ background: "#E8B84B", color: "#0E0E0C" }}>
            El CPC de Meta subió 31% en la campaña <b>Summer Sale</b> después de las 16h. El ROAS bajó de 4,2 → 2,8. 3 ad sets responsables.
            <span className="block mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-brand">
              Anclado en tus datos · últimos 7 días
            </span>
          </div>
          <div className="self-end max-w-[85%] bg-white/10 text-white px-4 py-3 rounded-[14px] rounded-br-[4px] text-[13px] leading-[1.45]">
            Enséñame los ad sets.
          </div>
          <div className="self-start max-w-[90%] px-4 py-3 rounded-[14px] rounded-bl-[4px] text-[13px] leading-[1.5] font-medium" style={{ background: "#E8B84B", color: "#0E0E0C" }}>
            Abriendo Atribución → Meta → Summer Sale…
          </div>
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-white/40">Ejemplo ilustrativo — no es una cuenta real.</p>
      </div>
    </div>
  );
}

/* FEATURE · ATTRIBUTION ES */
export function FeatureAttributionV3Es() {
  return (
    <FeatureBlockEs
      tag="Atribución de ingresos"
      reversed
      bgClass="bg-warm-50"
      title={<>Cada euro <em>tiene origen.</em></>}
      lede="Atribución de ingresos last-click sobre los eventos observados sin depender del consentimiento — incluidos los pageviews que GA4 pierde por cookies y consentimiento. Totales agregados por canal, campaña y creatividad. Sin modelado, sin muestreo, sin tracking por usuario."
      bullets={[
        "Granularidad canal · campaña · ad set · creatividad",
        "Conteos de microconversión y totales de ingresos",
        "Vista portfolio multi-site",
        "Export a BigQuery + MCP en un click",
      ]}
      visual={<AttributionBarsVisualEs />}
    />
  );
}

function AttributionBarsVisualEs() {
  const bars = [
    { label: "Orgánico", amount: "€482K", pct: 92, color: "#E8B84B" },
    { label: "Meta Ads", amount: "€331K", pct: 64, color: "#B5423B" },
    { label: "Google Ads", amount: "€248K", pct: 48, color: "#2D8B6D" },
    { label: "Email", amount: "€142K", pct: 28, color: "#E8B84B" },
    { label: "Directo", amount: "€81K", pct: 16, color: "#B5423B" },
  ];
  return (
    <div className="bg-ink text-white rounded-[20px] p-8 md:p-10 min-h-[380px] flex flex-col justify-center relative overflow-hidden">
      <div aria-hidden className="absolute pointer-events-none" style={{ right: -80, top: -80, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,139,109,0.35),transparent 70%)" }} />
      <div className="relative">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase mb-3" style={{ color: "#E8B84B" }}>● Ingresos / últimos 30 días</div>
        <h4 className="text-[22px] font-semibold mb-6 leading-[1.3] tabular-nums">€1.284.430 atribuidos</h4>
        <div className="flex flex-col gap-3 font-mono text-[12px]">
          {bars.map((b) => (
            <div key={b.label} className="grid grid-cols-[88px_1fr_80px] items-center gap-3">
              <span className="text-white/85">{b.label}</span>
              <div className="h-3.5 rounded-md overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-md" style={{ width: `${b.pct}%`, background: b.color }} />
              </div>
              <span className="text-white font-semibold text-right tabular-nums">{b.amount}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-white/40">Ejemplo ilustrativo — no es una cuenta real.</p>
      </div>
    </div>
  );
}

/* FEATURE · SUPERAPI ES */
export function FeatureSuperAPIV3Es() {
  return (
    <FeatureBlockEs
      tag="SuperAPI · MCP · BigQuery"
      title={<>Tus datos, <em>en todas partes.</em></>}
      lede="Datos a resolución completa enviados donde los necesites. Export nativo a BigQuery. API REST completa. Y un MCP server para que los agentes IA — Claude, ChatGPT, copilots propios — consulten tu analítica directamente."
      bullets={[
        "Export nativo a BigQuery (sin ETL)",
        "API REST con cobertura completa de cada métrica y propiedad",
        "MCP server para agentes IA",
        "Webhooks para operaciones en tiempo real",
      ]}
      visual={<SuperApiVisualEs />}
    />
  );
}

function SuperApiVisualEs() {
  return (
    <div className="bg-ink text-white rounded-[20px] p-8 md:p-10 min-h-[380px] flex flex-col justify-center relative overflow-hidden">
      <div aria-hidden className="absolute pointer-events-none" style={{ left: -60, bottom: -60, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,139,109,0.35),transparent 70%)" }} />
      <div className="relative">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase mb-3" style={{ color: "#E8B84B" }}>● SuperAPI · query</div>
        <h4 className="text-[20px] font-semibold mb-6 leading-[1.3]">Una consulta, resolución completa</h4>
        <pre className="font-mono text-[12.5px] leading-[1.8] text-white/90 whitespace-pre-wrap overflow-x-auto">
<span className="text-white/45">{`-- Últimos 7 días, ingresos atribuidos por canal`}</span>{"\n"}
<span style={{ color: "#E8B84B" }}>SELECT</span>{" "}channel,{"\n"}
       <span style={{ color: "#E8B84B" }}>SUM</span>(revenue) <span style={{ color: "#E8B84B" }}>AS</span> attributed{"\n"}
<span style={{ color: "#E8B84B" }}>FROM</span>   sealmetrics.conversions{"\n"}
<span style={{ color: "#E8B84B" }}>WHERE</span>  date &gt; <span style={{ color: "#B5423B" }}>&quot;2026-04-14&quot;</span>{"\n"}
<span style={{ color: "#E8B84B" }}>GROUP BY</span> channel{"\n"}
<span style={{ color: "#E8B84B" }}>ORDER BY</span> attributed <span style={{ color: "#E8B84B" }}>DESC</span>;{"\n"}{"\n"}
<span className="text-white/45">{`→ 1,2M filas · 340ms · resolución completa`}</span>
        </pre>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-white/40">Ejemplo ilustrativo — no es una cuenta real.</p>
      </div>
    </div>
  );
}

/* NINE REPORTS ES */
export function NineReportsV3Es() {
  const reports = [
    { n: "01", title: "Overview", p: "Totales de cabecera con la marca del último hit — sin identificadores." },
    { n: "02", title: "Evolución", p: "Métricas en el tiempo, periodo contra periodo." },
    { n: "03", title: "Fuentes", p: "Totales por canal, campaña y referrer sobre tráfico sin huecos de consentimiento." },
    { n: "04", title: "Páginas", p: "Pageviews y landing pages, con content grouping." },
    { n: "05", title: "Conversiones", p: "Conversiones, microconversiones e ingresos last-click por canal." },
    { n: "06", title: "Embudo", p: "Drop-off por paso sin umbrales de muestreo." },
    { n: "07", title: "Geografía", p: "Desglose por país, derivado del timezone — nunca de la IP." },
    { n: "08", title: "Dispositivos", p: "Totales por tipo de dispositivo, navegador y sistema operativo." },
    { n: "09", title: "Propiedades", p: "Tus propias propiedades de evento — productos, carritos, AOV — a resolución completa." },
  ];
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">Nueve reportes core</span>
            <h2 className="h-section mt-5">
              Cada reporte, <em>sobre datos completos.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Nueve reportes que cubren la superficie completa de la analítica eCommerce — de fuentes a conversiones, embudo a propiedades. Todos sobre el mismo pipeline de datos a resolución completa. LENS AI se sitúa encima como asistente conversacional, no como un décimo reporte.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reports.map((r) => (
            <article key={r.title} className="bg-white border border-warm-100 rounded-xl p-6 transition-all hover:border-warm-200 hover:-translate-y-0.5">
              <div className="font-mono text-[11px] text-ink-mute tracking-[0.08em] mb-3">{r.n}</div>
              <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-ink leading-[1.3] mb-1.5 flex items-center gap-2 flex-wrap">
                {r.title}
              </h3>
              <p className="text-[13.5px] text-ink-soft leading-[1.55]">{r.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* INTEGRATIONS ES */
export function IntegrationsStripV3Es() {
  const pills = ["Shopify", "WooCommerce", "Magento 2", "PrestaShop", "OpenCart", "WordPress", "Drupal", "Joomla", "Webflow", "Wix", "Squarespace", "Next.js", "React", "Nuxt 3", "Google Tag Manager", "BigQuery", "Data Studio", "MCP server", "Webhooks"];
  return (
    <section className="py-28 bg-warm-50 border-t border-warm-100 text-center">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
          Integraciones nativas
        </span>
        <h2 className="h-section mt-5 mx-auto" style={{ maxWidth: "20ch" }}>
          Encaja en el stack <em>que ya usas.</em>
        </h2>
        <div className="flex gap-3 flex-wrap justify-center mt-10">
          {pills.map((p) => (
            <span key={p} className="px-5 py-2.5 bg-white border border-warm-100 rounded-full text-[14px] font-medium font-mono text-ink-2 tracking-[-0.005em]">{p}</span>
          ))}
          <span className="px-5 py-2.5 rounded-full text-[14px] font-mono font-medium bg-ink text-white border border-ink">+ 10 más</span>
        </div>
        <div className="mt-10">
          <Link href="/es/integrations" className="inline-flex items-center gap-2 px-7 py-3.5 border border-warm-200 text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-white transition-colors">
            Ver todas las integraciones →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* PRODUCT FINAL CTA ES */
export function ProductFinalCtaV3Es() {
  return (
    <section id="demo" className="py-20 bg-white border-t border-warm-100">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
        <div className="bg-ink text-white rounded-[20px] px-12 py-16 md:py-20 text-center relative overflow-hidden">
          <div aria-hidden className="absolute pointer-events-none" style={{ right: -100, top: -100, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,139,109,0.3),transparent 70%)" }} />
          <h2 className="text-white font-semibold leading-[1.1] tracking-[-0.03em] mx-auto max-w-[22ch] relative" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
            La plataforma de analítica que <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>los equipos eCommerce merecen.</em>
          </h2>
          <p className="text-white/70 text-[16px] leading-[1.55] mt-6 mb-8 mx-auto max-w-[52ch] relative">
            Empieza la prueba de 14 días en 4 minutos — pega una línea de código y empieza a medir todo lo que GA4 te oculta. Añades tarjeta al empezar y no pagas nada si cancelas antes del día 14. Sin llamada.
          </p>
          <div data-md="skip" className="flex flex-col sm:flex-row justify-center gap-3 flex-wrap relative">
            <Link href="/es/demo" className="inline-flex items-center justify-center gap-2 bg-white text-ink px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-95">
              Reserva una demo →
            </Link>
            <a href="https://my.sealmetrics.com/register" className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:bg-white/5">
              Prueba de 14 días
            </a>
          </div>
          <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.1em] font-semibold mt-6 relative">
            Prueba de 14 días · Alojado en UE · Sin consentimiento por diseño
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PRUEBA · resultados auditados antes del cierre
   ============================================
   La página era un tour de funcionalidades que cerraba con una afirmación sin
   ninguna cifra detrás. Este es el único punto de /product donde los
   resultados están evidenciados, así que va justo antes del CTA. Sección
   light a propósito: el design system permite dos slabs oscuros por página y
   el CTA final ocupa uno. PRD-CONVERSION-REDESIGN.md §5. */
export function ProductProofV3Es() {
  const cases = [
    {
      client: "Palladium Hotel Group",
      href: "/es/case-studies/palladium-hotel-group",
      stats: [
        { n: "40%", l: "del tráfico entrante no tenía atribución antes" },
        { n: "35%", l: "de las reservas de GA4 no tenían canal asignado" },
        { n: "+165%", l: "Coste por Búsqueda en Display en DV360 después" },
      ],
      quote:
        "Los datos que da Sealmetrics son agnósticos, no están sesgados y son neutrales. No hay caja negra.",
      cite: "Toni Andújar · Director Digital y Venta Directa",
    },
    {
      client: "Dreamplace Hotels",
      href: "/es/case-studies/dreamplace-hotels",
      stats: [
        { n: "+30%", l: "más tráfico medido frente a Google Analytics" },
        { n: "15–20%", l: "de brecha de atribución de ventas contra el CRM, cerrada" },
      ],
      quote:
        "Ya no es una herramienta que está al lado del proceso. Es la herramienta que nos da el dato real — y con la que tomamos decisiones.",
      cite: "Eduardo Martin · Analytics & Campañas",
    },
  ];

  return (
    <section className="py-28 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">Auditado, no prometido</span>
            <h2 className="h-section mt-5">
              Lo que hace el stack <em>en cuentas reales.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Dos clientes pusieron Sealmetrics frente a su stack anterior y
            publicaron los números. Las cifras de abajo son suyas, auditadas
            sobre su propio tráfico — no benchmarks nuestros.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {cases.map((c) => (
            <article
              key={c.client}
              className="bg-white border border-warm-100 rounded-xl p-8 md:p-10 flex flex-col"
            >
              <h3 className="text-[19px] font-semibold text-ink tracking-[-0.015em] mb-7">
                {c.client}
              </h3>
              <div className="flex flex-col gap-5 pb-7 border-b border-warm-100">
                {c.stats.map((s) => (
                  <div key={s.n} className="flex items-baseline gap-4">
                    <span
                      className="font-semibold tabular-nums tracking-[-0.03em] leading-none text-brand shrink-0 min-w-[110px]"
                      style={{ fontSize: "clamp(30px, 3.2vw, 42px)" }}
                    >
                      {s.n}
                    </span>
                    <span className="text-[14px] leading-[1.5] text-ink-soft">
                      {s.l}
                    </span>
                  </div>
                ))}
              </div>
              <figure className="mt-7 border-l-2 pl-5 grow" style={{ borderColor: "#2E5C8A" }}>
                <blockquote className="text-[16px] leading-[1.55] text-ink-2 font-medium">
                  &ldquo;{c.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-soft font-semibold">
                  {c.cite}
                </figcaption>
              </figure>
              <Link
                href={c.href}
                className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-ink no-underline border-b border-warm-200 pb-0.5 w-fit hover:border-ink transition-colors"
              >
                Lee el caso completo →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
