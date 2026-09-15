import { ClientLogosGrid } from "./ClientLogos";
import Link from "next/link";
import { HeroDashboardEs } from "./HeroDashboardEs";
import { DualCTA } from "@/components/homepage/DualCTA";

/* HERO · ES */
export function HeroV3Es() {
  return (
    <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-0">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center pb-16">
        <div className="inline-flex items-center gap-3 bg-white border border-warm-100 rounded-full px-4 py-1.5 text-[13px] text-ink-2 mb-10">
          <span className="bg-warm-100 text-ink px-2.5 py-1 rounded text-[10px] font-semibold font-mono tracking-[0.08em] uppercase">
            Nuevo · Caso de estudio
          </span>
          <a href="/es/case-studies/palladium-hotel-group/" className="text-ink border-b border-warm-200 hover:border-ink">
            Palladium Hotel Group: 40% del tráfico sin atribución → +165% Display CPS
          </a>
        </div>

        {/* Posicionamiento alineado con el hero inglés vivo (HeroD en
            HomeDSections.tsx). Antes decía «datos en los que confías», el marco
            anterior al reposicionamiento a datos completos: la home inglesa se
            movió y esta se quedó atrás. */}
        <h1 className="h-display mx-auto">
          Ve las ventas que el consentimiento esconde — <em className="italic-accent">los ingresos que GA4 no ve.</em>
        </h1>

        <p
          className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]"
          style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
        >
          Sealmetrics es analítica sin consentimiento para eCommerce. Mide visitas y ventas sin depender del consentimiento
          — sin cookies, sin banner, sin el punto ciego del 40–60% — para que tu ROAS real, tus
          decisiones de canal y los números que llevas al consejo cuadren por fin con lo que
          ocurrió de verdad.
        </p>

        {/* Misma escalera de conversión que la home inglesa: demo primero
            (venta asistida para el ICP), prueba de 14 días como secundaria.
            La auditoría gratuita no se pierde — baja al tercer peldaño, como
            micro-conversión contextual. Ver PRD-CONVERSION-REDESIGN.md §4.1. */}
        <DualCTA locale="es" className="justify-center mt-7" />

        <p className="mt-5 text-[13.5px] leading-[1.6] text-ink-soft">
          ¿Prefieres empezar por los datos?{" "}
          <Link href="/es/audit/" className="text-ink underline hover:text-brand transition-colors">
            Pide una auditoría gratuita de tu web
          </Link>{" "}
          — sin instalar nada, sin compromiso.
        </p>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
          {["Sin pérdida por consentimiento", "Sin cookies · sin banner", "Diseñada para el RGPD", "Números que cuadran con Shopify"].map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <HeroDashboardEs />
      </div>
    </section>
  );
}

/* La lista de clientes y la rejilla viven en ClientLogos.tsx: una sola
   fuente para ES e EN, que antes tenían censos distintos. */

export function LogosStripEs() {
  return (
    <section className="py-14 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="mb-9">
          <div className="flex justify-between items-baseline flex-wrap gap-4">
            {/* h2: encabezado de <section> de primer nivel, reutilizado en
                /es/about, /es/how-it-works, /es/pricing y otras, donde cae
                justo bajo el h1 de la página. Como h3 saltaba un nivel. */}
            <h2
              className="font-semibold text-ink tracking-[-0.02em] leading-[1.2]"
              style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
            >
              Fuente <em className="italic-accent">única de verdad</em> para marcas europeas
            </h2>
            <p className="font-mono text-[12px] text-ink-soft uppercase tracking-[0.1em] font-semibold">
              Equipos con <b className="text-ink">+5M€</b> anuales en paid media
            </p>
          </div>
          {/* La tira inglesa llevaba esta prueba y la española no. Cifras
              canónicas: Dreamplace de su case study, Palladium del JSON-LD de
              la home (35% son reservas, no tráfico — el 40% es el de tráfico). */}
          <p className="mt-3 text-[15.5px] leading-[1.55] text-ink-soft max-w-[68ch]">
            <b className="text-ink font-semibold">Dreamplace Hotels</b> mide un{" "}
            <b className="text-ink font-semibold">+30% más de tráfico</b> que GA y atribuye un{" "}
            <b className="text-ink font-semibold">15–20% más de ventas</b>, conciliado
            contra su CRM. <b className="text-ink font-semibold">Palladium Hotel Group</b> detectó
            el <b className="text-ink font-semibold">35% de reservas de GA4 sin canal</b> y mejoró
            el CPS en Display un <b className="text-ink font-semibold">+165%</b>.
          </p>
        </div>
        <ClientLogosGrid />
      </div>
    </section>
  );
}

export function LogosSecondaryEs() {
  return (
    <section className="py-14 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <p className="text-center mx-auto max-w-[44rem] mb-8 leading-[1.4] text-ink font-medium"
          style={{ fontSize: "clamp(18px, 2vw, 22px)", letterSpacing: "-0.015em" }}
        >
          Uniéndote a <em className="italic-accent">grupos hoteleros, marcas DTC y medios</em> — 2.000+ equipos europeos que miden lo que realmente ocurrió.
        </p>
        <ClientLogosGrid />
      </div>
    </section>
  );
}


/* VALUE PROP */
export function ValueProp4MinEs() {
  return (
    <section className="bg-ink text-white py-14 border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid md:grid-cols-[1fr_auto] gap-7 md:gap-12 items-center">
        <div>
          <span className="inline-block bg-brand text-ink font-mono text-[11px] font-semibold uppercase tracking-[0.14em] px-3 py-1 rounded-md mb-3.5">
            Demo de 4 minutos
          </span>
          <p className="text-white font-semibold leading-[1.2] tracking-[-0.025em] max-w-[32ch]" style={{ fontSize: "clamp(24px, 3vw, 34px)" }}>
            En 4 minutos, pasa de ver <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>la mitad de tus ventas</em> a verlas todas.
          </p>
          <p className="mt-3 font-mono text-[13px] tracking-[0.04em] text-white/60">
            Tu web · tu gap real · sin instalar nada · sin compromiso
          </p>
        </div>
        <Link href="/es/audit" className="inline-flex items-center gap-2 bg-amber text-ink px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-105 transition" style={{ backgroundColor: "#E8B84B" }}>
          Reserva un walkthrough de 4 min →
        </Link>
      </div>
    </section>
  );
}

/* COMPARE */
export function CompareSectionEs() {
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">El hallazgo que cambió la conversación</span>
            <h2 className="h-section mt-5">
              La mitad de tu tráfico no está mal atribuida. <em>Simplemente no está.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Cuando Palladium Hotel Group comparó Sealmetrics con su stack completo — pixel de Meta, Google Ads, Analytics, CRM — descubrieron que el 40% de su tráfico entrante no tenía atribución. Ni mal etiquetado, ni en &ldquo;directo&rdquo;. Source y medium simplemente perdidos en tránsito.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <article className="bg-white border border-warm-100 rounded-xl p-10 md:p-12 flex flex-col justify-between min-h-[460px]">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-sm bg-red-alert shrink-0" />
                <h3 className="font-semibold text-ink leading-[1.15] tracking-[-0.015em]" style={{ fontSize: "clamp(20px, 2vw, 26px)" }}>
                  Stack convencional
                </h3>
              </div>
              <div className="font-semibold leading-[0.88] tracking-[-0.045em] mt-6 text-warm-300 tabular-nums" style={{ fontSize: "clamp(100px, 13vw, 180px)" }}>
                40<span className="text-[0.5em] text-ink-soft ml-1 align-top relative top-[0.3em] font-normal">%</span>
              </div>
              <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft font-semibold mb-7 mt-1.5">
                del tráfico sin atribución · source/medium perdido
              </div>
            </div>
            <p className="text-[17px] text-ink-2 leading-[1.5] max-w-[40ch]">
              Cada reporte — marca, agencia, dashboard — se construye sobre la parte que sobrevivió a muros de cookies, muestreo y sesgo de plataforma. Cada decisión de presupuesto, defendida sobre una fracción de lo que realmente ocurrió.
            </p>
            <div className="mt-6 pt-5 border-t border-warm-100 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft font-semibold">
              Fuente · Auditoría interna · Palladium Hotel Group · abril 2026
            </div>
          </article>

          <article className="bg-ink text-white border border-ink rounded-xl p-10 md:p-12 flex flex-col justify-between min-h-[460px] relative overflow-hidden">
            <div aria-hidden className="absolute pointer-events-none" style={{ right: -100, top: -100, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,139,109,0.35),transparent 70%)" }} />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-sm bg-brand shrink-0" />
                <h3 className="font-semibold text-white leading-[1.15] tracking-[-0.015em]" style={{ fontSize: "clamp(20px, 2vw, 26px)" }}>
                  Con <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Sealmetrics</em> · observado neutralmente
                </h3>
              </div>
              <div className="font-semibold leading-[0.88] tracking-[-0.045em] mt-6 text-white tabular-nums" style={{ fontSize: "clamp(100px, 13vw, 180px)" }}>
                100<span className="text-[0.5em] text-white/60 ml-1 align-top relative top-[0.3em] font-normal">%</span>
              </div>
              <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/60 font-semibold mb-7 mt-1.5">
                de eventos observados · 35% de reservas de GA4 sin canal
              </div>
            </div>
            <p className="text-[17px] text-white/85 leading-[1.5] max-w-[40ch] relative">
              <b className="text-amber font-semibold">&ldquo;Los datos son agnósticos, neutrales, sin sesgo. No hay caja negra.&rdquo;</b>{" "}
              El número que todos los stakeholders aceptan — porque no tiene inventario de anuncios que vender ni nada que inflar.
            </p>
            <div className="mt-6 pt-5 border-t border-white/15 font-mono text-[11px] uppercase tracking-[0.08em] text-white/50 font-semibold relative">
              Cita · Toni Andújar · Director Digital y Venta Directa · Palladium Hotel Group
            </div>
          </article>
        </div>

        <p className="text-center mx-auto mt-10 text-ink font-medium leading-[1.3] max-w-[32ch]" style={{ fontSize: "clamp(22px, 2.4vw, 30px)", letterSpacing: "-0.02em" }}>
          La diferencia no es un margen de error. <em>Es la mitad de tus decisiones.</em>
        </p>

        <div className="mt-14 pt-10 border-t border-warm-100">
          <h3 className="font-semibold text-ink tracking-[-0.02em] leading-[1.2] mb-8" style={{ fontSize: "clamp(24px, 2.6vw, 34px)" }}>
            Patrones que vemos <em className="italic-accent">en marcas europeas</em> que auditamos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: "+165%", l: "Mejora en Coste por Búsqueda en Display", src: "Palladium Hotel Group · DV360" },
              { n: "40%", l: "Del tráfico sin atribución antes", src: "Palladium Hotel Group · auditoría 2026" },
              { n: "35%", l: "Reservas sin atribuir en GA4", src: "Palladium Hotel Group · auditoría 2026" },
              { n: "30–70%", l: "Más tráfico observado vs GA", src: "Media cross-industry" },
            ].map((p) => (
              <div key={p.l} className="p-5 bg-white border border-warm-100 rounded-xl">
                <div className="text-[26px] font-semibold tracking-[-0.025em] text-ink tabular-nums">{p.n}</div>
                <div className="text-[13px] text-ink-2 font-medium leading-[1.4] mt-1.5">{p.l}</div>
                <div className="font-mono text-[10px] text-ink-soft uppercase tracking-[0.1em] font-semibold mt-1.5">{p.src}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-warm-100">
          <h3 className="font-semibold text-ink tracking-[-0.02em] leading-[1.2] mb-4" style={{ fontSize: "clamp(24px, 2.6vw, 34px)" }}>
            Cuatro herramientas. Cuatro números distintos. <em className="italic-accent">Una razón.</em>
          </h3>
          <p className="text-[16px] leading-[1.6] text-ink-soft max-w-[62ch] mb-8">
            Cada número de tu reporting semanal viene de una herramienta que tiene un interés financiero en lo que reporta. Tres de las cuatro de abajo venden inventario publicitario o viven dentro de una empresa que lo hace. La cuarta no — por eso marca, finanzas y agencias pueden firmarla.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Vende sus propios ads", name: "Meta Ads", bias: "Reporta con sesgo de Meta. Se atribuye el máximo posible de conversiones — porque cada conversión reclamada justifica el siguiente euro de inversión.", dark: false },
            { label: "Vende sus propios ads", name: "Google Ads", bias: "Reporta con sesgo de Google. Infla el last-click hacia paid search, porque paid search es el inventario que Google te vende.", dark: false },
            { label: "Vive dentro de Google", name: "Google Analytics", bias: "No se vende como producto publicitario, pero es parte del ecosistema Google. Muestrea sobre cierto umbral. Modela lo que el rechazo de consentimiento elimina.", dark: false },
            { label: "No vende inventario", name: "Sealmetrics", bias: "Sin negocio publicitario. Sin canal que favorecer. Mide lo que realmente ocurrió — por eso agencias, marca y CFO firman el mismo número.", dark: true },
          ].map((t) => (
            <div key={t.name} className={`p-7 rounded-xl border flex flex-col gap-2.5 ${t.dark ? "bg-ink text-white border-ink relative overflow-hidden" : "bg-warm-50 border-warm-100"}`}>
              {t.dark && <span aria-hidden className="absolute pointer-events-none" style={{ right: -40, top: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,139,109,0.4),transparent 70%)" }} />}
              <div className={`font-mono text-[10px] uppercase tracking-[0.12em] font-semibold relative ${t.dark ? "text-brand-soft" : "text-ink-soft"}`}>{t.label}</div>
              <div className="text-[20px] font-semibold tracking-[-0.02em] relative">{t.name}</div>
              <div className={`text-[13px] leading-[1.5] mt-1 relative ${t.dark ? "text-white/75" : "text-ink-soft"}`}>{t.bias}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FEATURED CASE */
export function FeaturedCaseEs() {
  return (
    <section id="featured-case" className="py-28 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">Caso destacado · Palladium Hotel Group</span>
            <h2 className="h-section mt-5">
              Una única fuente de verdad que marca, agencias y departamentos — <em>aceptan como válida.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Palladium Hotel Group eligió Sealmetrics por una razón: neutralidad. Cuatro herramientas reportaban cuatro verdades distintas. Sealmetrics se convirtió en el único número que marca, agencia de medios, agencia creativa y analítica interna aceptan como válido.
          </p>
        </div>

        <div className="bg-ink text-white rounded-[20px] p-10 md:p-[60px] grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-14 relative overflow-hidden">
          <div aria-hidden className="absolute pointer-events-none" style={{ left: -80, bottom: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,139,109,0.4),transparent 70%)" }} />
          <div className="relative">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-soft font-semibold mb-7 inline-block">
              Palladium Hotel Group · Hoteles · eCommerce
            </span>
            <div className="text-brand text-[72px] leading-[0.5] h-8 font-semibold">&ldquo;</div>
            <blockquote className="mt-5 text-white font-medium leading-[1.2] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 2.6vw, 34px)" }}>
              Los datos que da Sealmetrics son{" "}
              <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>agnósticos, no están sesgados y son neutrales.</em>{" "}
              No hay caja negra.
            </blockquote>
            <div className="flex gap-3.5 mt-7 pt-6 border-t border-white/15 items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-ink text-[14px]" style={{ background: "linear-gradient(135deg,#2D8B6D,#E8B84B)" }}>P</div>
              <div>
                <b className="block text-[14px] font-semibold">Digital & Direct Sales Director · Digital &amp; Direct Sales Director</b>
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/60 font-semibold">Palladium Hotel Group · abril 2026</span>
              </div>
            </div>
            <Link href="/es/case-studies/palladium-hotel-group" className="mt-7 inline-flex items-center gap-2 bg-amber text-ink px-6 py-3 rounded-md text-[14px] font-semibold no-underline hover:brightness-105" style={{ backgroundColor: "#E8B84B" }}>
              Lee el caso completo →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5 relative">
            {[
              { l: "Tráfico sin atribución · antes", v: "40", u: "%", hl: false, note: "Del tráfico registrado pero con source/medium perdido — absorbido por 'directo' o sin asignar." },
              { l: "Reservas sin atribuir · antes", v: "35", u: "%", hl: true, note: "Reservas reales registradas como evento en GA4 que no se podían asignar al canal que las generó." },
              { l: "Mejora en Coste por Búsqueda · DV360", v: "+165", u: "%", hl: false, note: "En el canal Display, tras rebalancear partners, soportes, audiencias y estrategias sobre el modelo de medición de Sealmetrics.", span: true },
            ].map((s, i) => (
              <div key={i} className={`p-6 rounded-xl border flex flex-col gap-1.5 min-h-[150px] justify-between ${s.hl ? "bg-brand border-brand" : "bg-white/5 border-white/12"} ${s.span ? "col-span-2" : ""}`}>
                <div className={`font-mono text-[10px] uppercase tracking-[0.12em] font-semibold ${s.hl ? "text-white/85" : "text-white/55"}`}>{s.l}</div>
                <div>
                  <div className="font-semibold tracking-[-0.035em] text-white leading-none tabular-nums" style={{ fontSize: "clamp(36px, 4vw, 52px)" }}>
                    {s.v}
                    {s.u && <span className={`italic font-medium ${s.hl ? "text-white" : ""}`} style={{ color: s.hl ? "#fff" : "#E8B84B", fontStyle: "italic" }}>{s.u}</span>}
                  </div>
                  <div className={`text-[12px] leading-[1.45] mt-2 ${s.hl ? "text-white/90" : "text-white/60"}`}>{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-7">
          <CaseCardEs
            client="Dreamplace Hotels"
            sector="Hoteles · eCommerce"
            quote={<>Ya no es una herramienta que está al lado del proceso. Es <em className="italic-accent">la herramienta que nos da el dato real</em> — y con la que tomamos decisiones.</>}
            cite="Eduardo Martin · Analítica y Campañas · Dreamplace Hotels"
            stats={[
              { n: "+30%", l: "Más tráfico registrado vs GA4 al cerrar el gap de consentimiento" },
              { n: "15–20%", l: "Más ventas atribuidas, conciliadas con el CRM" },
            ]}
          />
          <CaseCardEs
            client="Incapto"
            sector="eCommerce · Café de especialidad"
            quote={<>El Consent Mode nos dejaba un vacío estructural: sabíamos que había tráfico que no estábamos viendo, pero <em className="italic-accent">no teníamos forma de dimensionarlo.</em></>}
            cite="Rosa Tomàs · Acquisition Manager B2C · Incapto"
            stats={[
              { n: "29%", l: "De las visitas reales que GA4 no veía" },
              { n: "96%", l: "De los pedidos reales de Shopify registrados" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function CaseCardEs({ client, sector, quote, cite, stats }: { client: string; sector: string; quote: React.ReactNode; cite: string; stats: { n: string; l: string }[]; }) {
  return (
    <article className="bg-white border border-warm-100 rounded-xl p-8 flex flex-col gap-4">
      <header className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-warm-100">
        <span className="text-[17px] font-semibold text-ink tracking-[-0.015em]">{client}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">{sector}</span>
      </header>
      <blockquote className="text-[18px] leading-[1.4] tracking-[-0.01em] text-ink font-medium">
        {quote}
        <cite className="block mt-2.5 not-italic font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft font-semibold">{cite}</cite>
      </blockquote>
      <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-warm-100">
        {stats.map((s) => (
          <div key={s.n}>
            <div className="text-[28px] font-semibold tracking-[-0.03em] text-brand leading-none tabular-nums">{s.n}</div>
            <div className="text-[12.5px] leading-[1.45] text-ink-soft mt-1.5">{s.l}</div>
          </div>
        ))}
      </div>
    </article>
  );
}
