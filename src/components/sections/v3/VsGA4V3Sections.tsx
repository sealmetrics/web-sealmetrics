import Link from "next/link";
import { Fragment } from "react";

type Locale = "en" | "es";

/* HERO */
export function VsGA4HeroV3({ locale = "en" as Locale }) {
  const t = locale === "es"
    ? {
        eyebrow: "vs Google Analytics 4",
        h1Pre: "GA4 te enseña el ",
        h1Em: "40%",
        h1Post: " de tu tráfico. Sealmetrics no depende del consentimiento.",
        lede: "GA4 funciona bien para lo que Google necesita. No para el CMO que defiende un presupuesto de 2M€. Esta es la comparación honesta — y por qué la mayoría de equipos eCommerce corren los dos en paralelo.",
        ctaA: "Prueba de 14 días",
        ctaB: "Reserva una demo",
        micro: "Prueba de 14 días · Cancela antes del día 14 y no pagas · Setup en 4 min",
      }
    : {
        eyebrow: "vs Google Analytics 4",
        h1Pre: "GA4 shows you ",
        h1Em: "40%",
        h1Post: " of your traffic. Sealmetrics doesn't depend on consent.",
        lede: "GA4 works fine for what Google needs. Not for the CMO defending a €2M budget. This is the honest comparison — and why most eCommerce teams end up running both in parallel.",
        ctaA: "Start 14-day trial",
        ctaB: "Book a demo",
        micro: "14-day trial · Cancel before day 14, pay nothing · 4-minute setup",
      };

  return (
    <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
        <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
          {t.eyebrow}
        </span>
        <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
          {t.h1Pre}<em>{t.h1Em}</em>{t.h1Post}
        </h1>
        <p
          className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]"
          style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
        >
          {t.lede}
        </p>
        <div data-md="skip" className="flex flex-wrap justify-center gap-3 mt-9">
          <Link
            href={locale === "es" ? "/es/demo" : "/demo"}
            className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-white rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
          >
            {t.ctaB} →
          </Link>
          <a
            href="https://my.sealmetrics.com/register"
            className="inline-flex items-center gap-2 px-7 py-4 border border-warm-200 text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 transition-colors"
          >
            {t.ctaA}
          </a>
        </div>
        <p className="mt-4 font-mono text-[12px] text-ink-soft uppercase tracking-[0.06em]">
          {t.micro}
        </p>
      </div>
    </section>
  );
}

/* GAP STATS · 4 cards */
export function VsGA4GapStatsV3({ locale = "en" as Locale }) {
  const data = locale === "es"
    ? {
        eyebrow: "El gap",
        title: <>Lo que GA4 <em>no ve.</em></>,
        lede: "Cuatro puntos donde la arquitectura de GA4 pierde datos estructuralmente. No son errores — es el diseño funcionando como debe para el caso de uso de Google Ads.",
        stats: [
          { n: "40–60%", l: "Rechazo de consentimiento", p: "GA4 depende de cookies. El usuario UE medio rechaza y GA4 no lo ve." },
          { n: "~25%", l: "Ad blockers", p: "Bloquean google-analytics.com. GA4 nunca recibe el ping." },
          { n: "Sampling", l: "Umbrales de volumen", p: "Encima de cierto volumen, GA4 muestrea y modela. Black Friday = estimaciones." },
          { n: "US-hosted", l: "Schrems II", p: "Los datos cruzan a US. Sujeto a challenge regulatorio en UE." },
        ],
      }
    : {
        eyebrow: "The gap",
        title: <>What GA4 <em>doesn't see.</em></>,
        lede: "Four points where GA4's architecture loses data by design. Not bugs — this is the product working as intended for Google Ads' use case.",
        stats: [
          { n: "40–60%", l: "Consent rejection", p: "GA4 depends on cookies. Average EU visitor rejects, GA4 never sees them." },
          { n: "~25%", l: "Ad blockers", p: "Block google-analytics.com. GA4 never receives the ping." },
          { n: "Sampling", l: "Volume thresholds", p: "Above certain volume, GA4 samples and models. Black Friday = estimates." },
          { n: "US-hosted", l: "Schrems II", p: "Data crosses to US. Subject to ongoing EU regulatory challenge." },
        ],
      };

  return (
    <section className="py-28 bg-warm-50 border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">{data.eyebrow}</span>
            <h2 className="h-section mt-5">{data.title}</h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[56ch]">
            {data.lede}
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {data.stats.map((s) => (
            <article
              key={s.l}
              className="bg-white border border-warm-100 rounded-xl p-6"
            >
              <div
                className="font-semibold text-ink tracking-[-0.025em] leading-none tabular-nums mb-2"
                style={{ fontSize: "clamp(28px, 3vw, 38px)", color: "#B5423B" }}
              >
                {s.n}
              </div>
              <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-soft mb-2">
                {s.l}
              </div>
              <p className="text-[13.5px] leading-[1.55] text-ink-2">{s.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* DASHBOARD PATTERNS · 5 cards · "what GA4 reports" vs "what Sealmetrics captures"
   Ported from v2 homepage. Anchored to consequence framing.
   ============================================ */
export function DashboardPatternsV3({ locale = "en" as Locale }) {
  const t = locale === "es"
    ? {
        eyebrow: "Lo que el dashboard dice vs lo que pasó",
        title: <>Lo que tu dashboard muestra <em>vs lo que de verdad pasó.</em></>,
        lede: "Cinco patrones que vemos en cuentas eCommerce europeas. La mayoría de clientes encuentra al menos dos de estos huecos en sus propios datos durante los primeros 30 días corriendo Sealmetrics junto a GA4.",
        gaTag: "GA4 reporta",
        sealTag: "Sealmetrics captura",
        consequence: "Consecuencia —",
        foot: "El tamaño exacto del gap depende de tu mix de mercado, mix de dispositivo y tasa de aceptación de consent. Ningún cliente ve los cinco — pero casi todos ven uno o dos.",
        cards: [
          {
            scenario: "Tráfico orgánico",
            ga: "Muestreado y filtrado por cookie. Las sesiones donde se rechazó el consent desaparecen del canal orgánico.",
            seal: "Observado server-side, independiente del consent.",
            con: "Los canales orgánicos suelen ser 2–4× mayores que lo que reporta GA4. La inversión SEO que estás a punto de recortar puede ser tu mejor canal.",
          },
          {
            scenario: "Conversiones de campañas Meta",
            ga: "Parcial. Dependiente del píxel. Deduplicado contra estimaciones modeladas de Consent Mode v2.",
            seal: "Conversiones server-side, independientes del rechazo de consent o el bloqueo del píxel.",
            con: "El ROAS real suele ser bastante mayor de lo que sugiere GA4. La campaña que estabas a punto de matar puede llevar tiempo funcionando.",
          },
          {
            scenario: "Cubo de tráfico directo",
            ga: "40–60% del total atribuido a \u201Cdirect\u201D o \u201C(none)\u201D. El canal que más creció trimestre a trimestre — y que no puedes asignar.",
            seal: "Atribución de canal real preservada server-side. El cubo \u201Cdirect\u201D vuelve a su peso real.",
            con: "El canal \u201Cdirect\u201D deja de tapar a las campañas que en silencio sostenían el trimestre. La atribución se vuelve defendible en una review de presupuesto.",
          },
          {
            scenario: "Datos en tiempo real durante picos (Black Friday)",
            ga: "Retraso, muestreo por encima del umbral, reconciliaciones modeladas que llegan horas después.",
            seal: "Stream de eventos en tiempo real con cero muestreo, da igual el pico de tráfico.",
            con: "La llamada de las 2 AM en Black Friday se hace sobre datos reales — no sobre una estimación que reconcilia tres horas después de cerrar la ventana de decisión.",
          },
          {
            scenario: "Atribución de reservas (hoteles y travel)",
            ga: "Dependiente de cookie y consent. Una parte de las reservas reales del CRM simplemente no aparece en los reports de marketing.",
            seal: "Conversiones de reserva contadas server-side a nivel de canal de aterrizaje — independientes del estado de consent.",
            con: "20–25% de las reservas reales del CRM dejan de ser invisibles. Agencias y equipos internos cuadran sobre el mismo número de reservas.",
          },
        ],
      }
    : {
        eyebrow: "What the dashboard says vs what happened",
        title: <>What your dashboard shows <em>vs what actually happened.</em></>,
        lede: "Five patterns we see across European eCommerce accounts. Most customers find at least two of these gaps in their own data within the first 30 days running Sealmetrics alongside GA4.",
        gaTag: "GA4 reports",
        sealTag: "Sealmetrics captures",
        consequence: "Consequence —",
        foot: "The exact size of the gap depends on your market mix, device mix and consent acceptance rate. No client sees all five — but almost every one sees one or two.",
        cards: [
          {
            scenario: "Organic search traffic",
            ga: "Sampled and cookie-filtered. Sessions where consent was rejected are missing from the organic channel entirely.",
            seal: "Observed server-side, consent-independent.",
            con: "Organic channels are typically 2–4× bigger than GA4 reports. The SEO investment you're about to cut may be your best-performing channel.",
          },
          {
            scenario: "Meta campaign conversions",
            ga: "Partial. Pixel-dependent. De-duplicated against modelled Consent Mode v2 estimations.",
            seal: "Server-side conversions, independent of consent rejection or pixel-blocking.",
            con: "True ROAS is often meaningfully higher than GA4 suggests. The campaign you were about to kill may have been working the whole time.",
          },
          {
            scenario: "Direct traffic bucket",
            ga: "40–60% of total sessions attributed to \u201Cdirect\u201D or \u201C(none)\u201D. The channel that grew fastest quarter-over-quarter — and you can't assign it.",
            seal: "Real channel attribution preserved server-side. The \u201Cdirect\u201D bucket returns to its actual share.",
            con: "Direct stops masking the campaigns that were secretly carrying the quarter. Attribution becomes defensible in a budget review.",
          },
          {
            scenario: "Real-time data during peak events (Black Friday)",
            ga: "Delayed, sampled above threshold, modelled reconciliations that land hours later.",
            seal: "Real-time event stream with zero sampling, regardless of traffic peak.",
            con: "The 2 AM call on Black Friday gets made on real data, not an estimate that reconciles three hours after the decision window closed.",
          },
          {
            scenario: "Booking attribution (hotels & travel)",
            ga: "Cookie-dependent, consent-gated. A share of real CRM bookings simply doesn't appear in marketing reports.",
            seal: "Booking conversions counted server-side at landing-channel level — independent of consent state.",
            con: "20–25% of real CRM bookings stop being invisible. Agencies and internal teams align on the same booking number.",
          },
        ],
      };

  return (
    <section className="py-28 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">{t.eyebrow}</span>
            <h2 className="h-section mt-5">{t.title}</h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">{t.lede}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {t.cards.map((c) => (
            <article
              key={c.scenario}
              className="bg-white border border-warm-100 rounded-xl p-7 md:p-8 flex flex-col gap-5"
            >
              <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink leading-[1.2]">
                {c.scenario}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="bg-warm-50 border border-warm-100 rounded-lg p-4">
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-red-alert block mb-2">
                    {t.gaTag}
                  </span>
                  <p className="text-[13.5px] leading-[1.55] text-ink-2">{c.ga}</p>
                </div>
                <div
                  className="rounded-lg p-4"
                  style={{ background: "rgba(45,139,109,0.06)", borderLeft: "2px solid #2D8B6D" }}
                >
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-brand-hover block mb-2">
                    {t.sealTag}
                  </span>
                  <p className="text-[13.5px] leading-[1.55] text-ink">{c.seal}</p>
                </div>
              </div>
              <p className="text-[13.5px] leading-[1.55] text-ink-soft pt-3 border-t border-warm-100">
                <strong className="text-ink font-semibold">{t.consequence}</strong> {c.con}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-[14px] leading-[1.55] text-ink-soft max-w-[64ch] mx-auto">
          {t.foot}
        </p>
      </div>
    </section>
  );
}

/* COMPARISON TABLE · feature-by-feature */
interface Row { feature: string; ga4: string; seal: string; }
type RowBlock = "technical" | "commercial" | "reporting";

const GA4_BLOCKS = [
  { id: "technical", en: "Technical & data capture", es: "Técnico y captura de datos" },
  { id: "commercial", en: "Pricing & customer success", es: "Precio y customer success" },
  { id: "reporting", en: "Reporting", es: "Reporting" },
] as const;

const GA4_TECH_REPORT_HREF = "https://docs.sealmetrics.com/guides/tracker-performance-report";

export function VsGA4TableV3({ locale = "en" as Locale }) {
  const rowsEn: { category: string; block: RowBlock; rows: Row[] }[] = [
    {
      category: "Data capture",
      block: "technical",
      rows: [
        { feature: "Consent required", ga4: "Yes · 40–60% reject", seal: "No · no consent loss" },
        { feature: "Ad blocker affected", ga4: "Yes · ~25% blocked", seal: "No · first-party" },
        { feature: "Cookies on visitor device", ga4: "Required", seal: "None" },
        { feature: "Sampling at scale", ga4: "Yes · above threshold", seal: "Never · full resolution" },
      ],
    },
    {
      category: "Tracker performance (measured)",
      block: "technical",
      rows: [
        { feature: "Script weight on the wire (gzip)", ga4: "~146 KB · gtag.js", seal: "1.1 KB · ~132× lighter" },
        { feature: "JavaScript parsed on the device", ga4: "~409 KB", seal: "2.0 KB" },
        { feature: "Pageview hit secured", ga4: "~0.5–0.7 s best case · only after consent", seal: "~0.1–0.3 s · sendBeacon from the head" },
        { feature: "Visits lost before the hit fires", ga4: "~2–5% on mobile · grows on slow networks", seal: "Minimal · hit secured in the first ~0.3 s" },
      ],
    },
    {
      category: "Attribution",
      block: "reporting",
      rows: [
        { feature: "Channel attribution", ga4: "Cookie-dependent", seal: "Session-level, consent-free" },
        { feature: "Direct/(none) bucket", ga4: "40–60% of sessions", seal: "Real share (typically <10%)" },
        { feature: "Last-click", ga4: "Limited", seal: "Default · on complete data" },
      ],
    },
    {
      category: "Infrastructure",
      block: "technical",
      rows: [
        { feature: "Data residency", ga4: "US · Google infra", seal: "EU · Dublin, Ireland" },
        { feature: "Schrems II exposure", ga4: "Yes · ongoing challenge", seal: "Clean" },
        { feature: "Sub-processors outside EU (visitor data)", ga4: "Yes", seal: "None" },
      ],
    },
    {
      category: "Integrations",
      block: "reporting",
      rows: [
        { feature: "Google Ads native", ga4: "Yes", seal: "Via BigQuery export" },
        { feature: "Meta / TikTok Ads", ga4: "Via external sync", seal: "Native + BigQuery" },
        { feature: "BigQuery export", ga4: "Yes · daily export cap on the free tier", seal: "Yes · full resolution" },
        { feature: "MCP / AI agents", ga4: "Official server · experimental, read-only", seal: "Native · managed · read and act" },
        { feature: "What the agent can read", ga4: "Post-consent subset, modelled where consent is missing", seal: "Every recorded event, no consent gap" },
      ],
    },
    {
      category: "Pricing",
      block: "commercial",
      rows: [
        { feature: "Price", ga4: "Free · paid for with data-sharing defaults and lock-in", seal: "From €499/mo annual" },
        { feature: "Per-event overage", ga4: "Hidden limits trigger sampling", seal: "No overage billing" },
        { feature: "Data retention", ga4: "14 months default", seal: "24 months included" },
      ],
    },
    {
      category: "Customer success",
      block: "commercial",
      rows: [
        { feature: "Onboarding", ga4: "Self-serve or agency-led", seal: "Script or native module · 5–30 min by platform" },
        { feature: "Human support", ga4: "Community forums on the free tier", seal: "Direct support on every plan" },
      ],
    },
    {
      category: "Reporting parity",
      block: "reporting",
      rows: [
        { feature: "Standard reports", ga4: "Reports + Explorations · 24–48 h processing lag", seal: "Decision-ready defaults · real-time" },
        { feature: "Custom analysis", ga4: "Explorations · sampled at scale", seal: "Segments + property breakdowns · unsampled" },
        { feature: "Data thresholding", ga4: "Rows hidden by privacy thresholds", seal: "None · aggregate by design" },
        { feature: "Audiences & remarketing", ga4: "Yes · its real strength", seal: "Not a remarketing tool — no personal identifiers by design" },
      ],
    },
  ];

  const rowsEs: { category: string; block: RowBlock; rows: Row[] }[] = [
    {
      category: "Captura de datos",
      block: "technical",
      rows: [
        { feature: "Consentimiento requerido", ga4: "Sí · 40–60% rechaza", seal: "No · sin pérdida por consent" },
        { feature: "Afectado por ad blockers", ga4: "Sí · ~25% bloqueado", seal: "No · first-party" },
        { feature: "Cookies en el dispositivo", ga4: "Obligatorias", seal: "Ninguna" },
        { feature: "Muestreo a escala", ga4: "Sí · sobre cierto umbral", seal: "Nunca · resolución completa" },
      ],
    },
    {
      category: "Rendimiento del tracker (medido)",
      block: "technical",
      rows: [
        { feature: "Peso del script en red (gzip)", ga4: "~146 KB · gtag.js", seal: "1,1 KB · ~132× más ligero" },
        { feature: "JavaScript parseado en el dispositivo", ga4: "~409 KB", seal: "2,0 KB" },
        { feature: "Pageview asegurado", ga4: "~0,5–0,7 s mejor caso · solo tras consentimiento", seal: "~0,1–0,3 s · sendBeacon desde el head" },
        { feature: "Visitas perdidas antes de disparar", ga4: "~2–5% en móvil · crece en redes lentas", seal: "Mínimas · hit asegurado en los primeros ~0,3 s" },
      ],
    },
    {
      category: "Atribución",
      block: "reporting",
      rows: [
        { feature: "Atribución de canal", ga4: "Depende de cookies", seal: "A nivel sesión, sin consentimiento" },
        { feature: "Bucket directo/(none)", ga4: "40–60% de sesiones", seal: "Porcentaje real (típicamente <10%)" },
        { feature: "Last-click", ga4: "Limitado", seal: "Por defecto · sobre datos completos" },
      ],
    },
    {
      category: "Infraestructura",
      block: "technical",
      rows: [
        { feature: "Residencia de datos", ga4: "US · infra Google", seal: "UE · Dublín, Irlanda" },
        { feature: "Exposición Schrems II", ga4: "Sí · challenge regulatorio", seal: "Limpio" },
        { feature: "Sub-procesadores fuera UE (dato de visitante)", ga4: "Sí", seal: "Ninguno" },
      ],
    },
    {
      category: "Integraciones",
      block: "reporting",
      rows: [
        { feature: "Google Ads nativo", ga4: "Sí", seal: "Vía export BigQuery" },
        { feature: "Meta / TikTok Ads", ga4: "Vía sync externo", seal: "Nativo + BigQuery" },
        { feature: "Export BigQuery", ga4: "Sí · tope diario de export en el tier gratuito", seal: "Sí · resolución completa" },
        { feature: "MCP / agentes IA", ga4: "Servidor oficial · experimental, solo lectura", seal: "Nativo · gestionado · lee y actúa" },
        { feature: "Qué puede leer el agente", ga4: "Subconjunto post-consentimiento, modelado donde falta consentimiento", seal: "Todos los eventos registrados, sin hueco de consent" },
      ],
    },
    {
      category: "Precio",
      block: "commercial",
      rows: [
        { feature: "Precio", ga4: "Gratis · lo pagas con los ajustes de data-sharing por defecto y el lock-in", seal: "Desde €499/mes anual" },
        { feature: "Overage por evento", ga4: "Límites ocultos disparan muestreo", seal: "Sin facturación por exceso" },
        { feature: "Retención de datos", ga4: "14 meses por defecto", seal: "24 meses incluidos" },
      ],
    },
    {
      category: "Customer success",
      block: "commercial",
      rows: [
        { feature: "Onboarding", ga4: "Self-serve o vía agencia", seal: "Script o módulo nativo · 5–30 min según plataforma" },
        { feature: "Soporte humano", ga4: "Foros de comunidad en el tier gratuito", seal: "Soporte directo en todos los planes" },
      ],
    },
    {
      category: "Paridad de reporting",
      block: "reporting",
      rows: [
        { feature: "Informes estándar", ga4: "Reports + Explorations · 24–48 h de retraso de procesado", seal: "Listos por defecto · tiempo real" },
        { feature: "Análisis custom", ga4: "Explorations · muestreado a escala", seal: "Segmentos + breakdowns por propiedad · sin muestreo" },
        { feature: "Thresholding de datos", ga4: "Filas ocultas por umbrales de privacidad", seal: "Ninguno · agregado por diseño" },
        { feature: "Audiencias y remarketing", ga4: "Sí · su verdadera fortaleza", seal: "No es una herramienta de remarketing — sin identificadores personales por diseño" },
      ],
    },
  ];

  const data = locale === "es" ? rowsEs : rowsEn;

  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">
              {locale === "es" ? "Comparativa" : "Comparison"}
            </span>
            <h2 className="h-section mt-5">
              {locale === "es"
                ? <>Feature a feature. <em>Sin rodeos.</em></>
                : <>Feature by feature. <em>No spin.</em></>}
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            {locale === "es"
              ? "La comparación exacta que un CTO o CMO necesita antes de firmar. Acepta las fortalezas de GA4; destaca donde falla para un eCommerce que decide con dinero real."
              : "The exact comparison a CTO or CMO needs before signing. Honest about GA4's strengths; direct about where it fails for an eCommerce team deciding with real money."}
          </p>
        </div>

        <nav
          aria-label={locale === "es" ? "Secciones de la comparativa" : "Comparison sections"}
          className="flex flex-wrap gap-2 mb-10"
        >
          {GA4_BLOCKS.map((b) => (
            <a
              key={b.id}
              href={`#${b.id}`}
              className="px-4 py-2 rounded-full border border-warm-200 bg-warm-50 font-mono text-[11px] uppercase tracking-[0.1em] font-semibold text-ink no-underline hover:border-ink transition-colors"
            >
              {locale === "es" ? b.es : b.en}
            </a>
          ))}
        </nav>
        {GA4_BLOCKS.map((b) => {
          const cats = data.filter((c) => c.block === b.id);
          if (cats.length === 0) return null;
          return (
            <div key={b.id} id={b.id} className="scroll-mt-28 mb-14 last:mb-0">
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink mb-5">
                {locale === "es" ? b.es : b.en}
              </h3>
              <div className="bg-white border border-warm-100 rounded-xl overflow-hidden">
                <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-warm-100 bg-warm-50 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-soft font-bold">
                  <div className="p-5">{locale === "es" ? "Capacidad" : "Capability"}</div>
                  <div className="p-5">Google Analytics 4</div>
                  <div
                    className="p-5 text-ink"
                    style={{ background: "rgba(45,139,109,0.05)", borderLeft: "2px solid #2D8B6D" }}
                  >
                    Sealmetrics
                  </div>
                </div>
                {cats.map((section) => (
                  <Fragment key={section.category}>
                    <div className="px-5 py-3 bg-warm-white border-b border-warm-100 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink font-bold">
                      {section.category}
                    </div>
                    {section.rows.map((row, i) => {
                      const isLastOverall =
                        i === section.rows.length - 1 && section === cats[cats.length - 1];
                      return (
                        <div
                          key={row.feature}
                          className={`grid grid-cols-[1.4fr_1fr_1fr] items-center ${
                            isLastOverall ? "" : "border-b border-warm-100"
                          }`}
                        >
                          <div className="p-4 md:p-5 text-[14px] text-ink font-semibold leading-[1.4]">
                            {row.feature}
                          </div>
                          <div className="p-4 md:p-5 text-[13.5px] text-ink-soft leading-[1.5]">
                            {row.ga4}
                          </div>
                          <div
                            className="p-4 md:p-5 text-[13.5px] text-ink leading-[1.5] font-medium"
                            style={{
                              background: "rgba(45,139,109,0.04)",
                              borderLeft: "2px solid #2D8B6D",
                            }}
                          >
                            {row.seal}
                          </div>
                        </div>
                      );
                    })}
                  </Fragment>
                ))}
              </div>
              {b.id === "technical" ? (
                <p className="mt-4 text-[14px] text-ink-2">
                  <a
                    href={GA4_TECH_REPORT_HREF}
                    className="text-ink font-semibold no-underline border-b border-warm-200 pb-px hover:border-ink"
                  >
                    {locale === "es"
                      ? "Lee el informe técnico completo (mediciones de campo) →"
                      : "Read the full technical report (field measurements) →"}
                  </a>
                </p>
              ) : null}
            </div>
          );
        })}

        <div className="mt-6 p-6 bg-warm-50 border border-warm-100 rounded-xl text-center text-[15px] text-ink-2 leading-[1.55]">
          <b className="text-ink font-semibold">
            {locale === "es" ? 'No es "GA4 está roto".' : 'Not "GA4 is broken".'}
          </b>{" "}
          {locale === "es"
            ? "GA4 funciona para el ecosistema Google Ads. Para defender un presupuesto de marketing con datos completos, se quedan cortos. Corre ambos 30 días y "
            : "GA4 works well for the Google Ads ecosystem. For defending a marketing budget on complete data, it falls short. Run both for 30 days and "}
          <em className="italic-accent">
            {locale === "es" ? "decide tú." : "you decide."}
          </em>
        </div>
      </div>
    </section>
  );
}

/* RUN BOTH · methodology */
export function RunBothV3({ locale = "en" as Locale }) {
  const data = locale === "es"
    ? {
        eyebrow: "Metodología · 30 días",
        title: <>Corre los dos en paralelo. <em>Compara con tu CRM.</em></>,
        lede: "No te pedimos que reemplaces GA4. Te pedimos que los corras en paralelo 30 días, comparando ambos con tu CRM real. Después tú decides qué dato firmar.",
        phases: [
          { n: "Semana 1", t: "Ambos instalados", p: "GA4 sigue donde está. Sealmetrics se instala con un script o un módulo nativo en 5 a 30 min, según la plataforma. Los dos corren sobre el mismo tráfico." },
          { n: "Semana 2", t: "Calibración", p: "Te ayudamos a mapear canales, UTMs y microconversiones. Ambos sistemas ven lo mismo, reportan distinto." },
          { n: "Semana 3", t: "Comparación", p: "CRM en mano, comparas canales, conversiones e ingresos. Ves exactamente dónde GA4 se queda corto sobre tu tráfico." },
          { n: "Semana 4", t: "Decisión", p: "La mayoría de equipos firman Sealmetrics como fuente de verdad y mantienen GA4 para las integraciones específicas de Google Ads." },
        ],
      }
    : {
        eyebrow: "Methodology · 30 days",
        title: <>Run both alongside. <em>Compare against your CRM.</em></>,
        lede: "We're not asking you to replace GA4. We're asking you to run both in parallel for 30 days, comparing each against your actual CRM. Then you decide which number to sign against.",
        phases: [
          { n: "Week 1", t: "Both installed", p: "GA4 stays where it is. Sealmetrics installs with one script tag or a native module in 5 to 30 minutes, depending on the platform. Both running on the same traffic." },
          { n: "Week 2", t: "Calibration", p: "We help you map channels, UTMs and microconversions. Both systems see the same traffic — and report very differently." },
          { n: "Week 3", t: "Comparison", p: "CRM in hand, you compare channels, conversions and revenue. You see exactly where GA4 falls short on your own data." },
          { n: "Week 4", t: "Decision", p: "Most teams sign Sealmetrics as source of truth and keep GA4 for specific Google Ads integrations. No migration forced." },
        ],
      };

  return (
    <section className="py-28 bg-warm-50 border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">{data.eyebrow}</span>
            <h2 className="h-section mt-5">{data.title}</h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            {data.lede}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {data.phases.map((p) => (
            <article
              key={p.n}
              className="bg-white border border-warm-100 rounded-xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-3">
                {p.n}
              </span>
              <h3 className="text-[19px] font-semibold tracking-[-0.02em] leading-[1.2] mb-2.5 text-ink">
                {p.t}
              </h3>
              <p className="text-[13.5px] leading-[1.6] text-ink-soft">{p.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
