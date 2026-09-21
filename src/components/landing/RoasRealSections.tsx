import Link from "next/link";
import { ScopeToggle, RevealBar } from "./RoasRealInteractive";

/* ============================================================
   ROAS REAL · secciones
   Landing de conversión para tráfico frío de pago (eCommerce ES).
   noindex/follow — sin breadcrumbs ni enlaces de cluster: la página
   tiene una sola decisión, no reparte autoridad.

   Dos slabs oscuros, según el sistema: «La máquina» y el cierre.
   ============================================================ */

const AUDIT = "/es/audit";
const PRICING = "/es/pricing";
const DOCS_PERF = "https://docs.sealmetrics.com/guides/tracker-performance-three-way";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow mb-5">{children}</span>;
}

/* ---------- 01 · HERO ---------- */
export function Hero() {
  return (
    /* El header de la landing es sticky y ocupa flujo, y no hay barra de
       anuncio: no hace falta compensar altura como en las páginas del site. */
    <section className="bg-warm-white pt-14 md:pt-20 pb-20">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink-soft">
          Analítica privacy by design · Sin consentimiento · RGPD · ePrivacy
        </p>

        <h1 className="h-display mt-5 max-w-[16ch]">
          Tu ROAS real es <em>mayor del que crees.</em>
        </h1>

        <p className="mt-7 max-w-[58ch] text-ink-2 leading-[1.5]" style={{ fontSize: "clamp(17px,1.8vw,21px)" }}>
          En nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies, y de quienes
          las aceptan, el 40% no lo hace en la primera página vista. Sus ventas ocurrieron, las cobraste, y el
          informe con el que decides no las cuenta, o las pone en el canal equivocado. Estás apagando campañas que funcionan y no
          lo sabes.
        </p>

        <div className="flex flex-wrap gap-3 items-center mt-9">
          <Link
            href={AUDIT}
            className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-white rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
          >
            Pide tu auditoría gratuita <span aria-hidden="true">→</span>
          </Link>
          <a
            href="#maquina"
            className="inline-flex items-center gap-2 px-7 py-4 border border-warm-200 text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 transition-colors"
          >
            Ver las especificaciones
          </a>
        </div>

        <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.06em] text-ink-soft">
          Sin instalar nada · Sin compromiso
        </p>

        <ScopeToggle />
      </div>
    </section>
  );
}

/* ---------- 02 · EL SÍNTOMA ---------- */
const SYMPTOMS = [
  {
    q: "«Tenemos demasiado directo. Es un directo que no debería ser directo.»",
    a: "No hay un canal misterioso que te traiga la mitad del negocio. Hay un banner de cookies delante de tu medición.",
  },
  {
    q: "«Sabemos que Meta aporta más de lo que vemos, pero no tenemos el dato.»",
    a: "Los canales de descubrimiento son los que peor salen, porque son los que más lejos quedan del clic final que sí se mide.",
  },
  {
    q: "«Queremos probar un canal nuevo, pero no sabríamos si funciona.»",
    a: "Un test que no puedes medir es un test que vas a cancelar por las razones equivocadas.",
  },
];

export function Symptoms() {
  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>01 · El síntoma</Eyebrow>
        <h2 className="h-section mt-5 max-w-[22ch]">Esto lo dices tú, no lo decimos nosotros.</h2>

        <div className="grid md:grid-cols-3 gap-px bg-warm-100 border border-warm-100 rounded-xl overflow-hidden mt-12">
          {SYMPTOMS.map((s) => (
            <div key={s.q} className="bg-white p-8">
              <p className="text-[17px] leading-[1.45] font-medium text-ink">{s.q}</p>
              <p className="mt-4 text-[15px] leading-[1.55] text-ink-soft">{s.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 03 · LA ARITMÉTICA (subida: es la prueba económica) ---------- */
export function RoasMath() {
  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>02 · Lo que cambia el número</Eyebrow>
        <h2 className="h-section mt-5 max-w-[20ch]">
          No rendías mal. <em>Medías mal.</em>
        </h2>

        <div className="mt-12 border border-warm-100 rounded-2xl bg-warm-white overflow-hidden">
          <p className="px-8 py-4 border-b border-warm-100 font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-soft">
            Misma campaña · mismo gasto · mismo mes
          </p>

          <div className="grid md:grid-cols-[240px_1fr_130px] gap-4 md:gap-7 items-center px-8 py-8 border-b border-warm-100">
            <span className="text-[17px] leading-[1.3] text-ink">
              El ROAS que ves hoy
              <small className="block mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Analítica con consentimiento
              </small>
            </span>
            <RevealBar pct={58} tone="muted" />
            <span className="text-[40px] font-semibold tracking-[-0.035em] leading-none text-ink-soft md:text-right">
              2,4×
            </span>
          </div>

          <div className="grid md:grid-cols-[240px_1fr_130px] gap-4 md:gap-7 items-center px-8 py-8 border-b border-warm-100">
            <span className="text-[17px] leading-[1.3] text-ink">
              Tu ROAS real
              <small className="block mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Ventas sin pérdida por consentimiento
              </small>
            </span>
            <RevealBar pct={100} tone="us" delay={170} />
            <span className="text-[40px] font-semibold tracking-[-0.035em] leading-none text-brand md:text-right">
              4,1×
            </span>
          </div>

          <div className="px-8 py-7 bg-ink section-dark">
            <p
              className="font-semibold text-white leading-[1.25] tracking-[-0.015em] max-w-[44ch]"
              style={{ fontSize: "clamp(18px,2.2vw,24px)" }}
            >
              El presupuesto que ibas a cortar era tu canal que mejor convierte.
            </p>
            <p className="mt-3 text-[15px] text-dark-text-secondary leading-[1.55] max-w-[60ch]">
              Contar las conversiones sin pérdida por consentimiento significa que los canales que funcionan dejan de esconderse dentro de
              «directo» y de tráfico sin consentimiento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 · POR QUÉ PASA ---------- */
const STEPS = [
  {
    n: "El requisito",
    t: "Todo recorrido necesita permiso",
    d: "Reconstruir el customer journey exige identificar a un usuario a lo largo del tiempo. Con cookies, con fingerprinting, con logs de servidor: da igual el método. Aunque sea anónimo, requiere consentimiento.",
  },
  {
    n: "El agujero",
    t: "En nuestra experiencia, entre el 40% y el 60% no lo da",
    d: (
      <>
        En nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies, y de quienes las
        aceptan, el 40% no lo hace en la primera página vista, que es la que trae el clic del anuncio. En{" "}
        <Link href="/es/case-studies/incapto/" className="underline underline-offset-2">
          Incapto
        </Link>{" "}
        (Shopify, con Consent Mode), las campañas de pago eran el 50% del tráfico medido en GA4 y el 62% en Sealmetrics:
        12 puntos en la única línea del informe que decide el reparto de medios. Cuánto depende de la tienda y del canal.
      </>
    ),
  },
  {
    n: "El sesgo",
    t: "Y lo que queda no es una muestra",
    d: "Quien acepta cookies no se comporta como quien las rechaza. No estás midiendo la mitad de tu negocio: estás midiendo una mitad concreta y decidiendo como si fuera el todo.",
  },
];

export function Mechanism() {
  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>03 · Por qué pasa</Eyebrow>
        <h2 className="h-section mt-5 max-w-[20ch]">La atribución en Europa está rota por diseño.</h2>

        <div className="grid md:grid-cols-3 gap-9 mt-12">
          {STEPS.map((s) => (
            <div key={s.n}>
              <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-brand pb-3 border-b border-warm-200 mb-5">
                {s.n}
              </p>
              <h3 className="text-[19px] font-semibold text-ink tracking-[-0.015em] leading-[1.25]">{s.t}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.6] text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 05 · QUÉ HACEMOS DISTINTO ---------- */
export function WhatWeDo() {
  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16 items-start">
        <div>
          <Eyebrow>04 · Qué hacemos distinto</Eyebrow>
          <h2 className="h-section mt-5">
            No pedimos permiso porque <em>no seguimos a nadie.</em>
          </h2>
        </div>
        <div>
          <p className="text-ink-2 leading-[1.5] max-w-[58ch]" style={{ fontSize: "clamp(17px,1.6vw,20px)" }}>
            Sealmetrics no reconstruye recorridos. Registra hits agregados e inconexos entre sí, sin
            identificador de usuario, sin cookies, sin perfilado. Como nadie es identificable ni ahora ni
            después, no hace falta consentimiento para medir.
          </p>
          <p className="mt-5 text-[16px] leading-[1.6] text-ink-soft">
            El píxel se dispara antes del banner y mide{" "}
            <strong className="text-ink font-semibold">tus sesiones, ventas y eventos sin depender del consentimiento</strong>. Dato
            real: no modelamos ni muestreamos, porque el rechazo del consentimiento no deja huecos que rellenar con estadística.
          </p>
          <p className="mt-5 text-[16px] leading-[1.6] text-ink-soft">
            El cambio de mentalidad es este: dejas de analizar{" "}
            <strong className="text-ink font-semibold">personas</strong> y pasas a analizar{" "}
            <strong className="text-ink font-semibold">productos y campañas</strong>. Qué producto se ve, se
            añade al carrito, entra en checkout y se compra — por canal, campaña, keyword, landing y la
            propiedad que quieras etiquetar.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 06 · LA PRUEBA ---------- */
export function Proof() {
  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>05 · La prueba</Eyebrow>
        <h2 className="h-section mt-5 max-w-[24ch]">Lo que apareció cuando dejaron de medir a medias.</h2>

        <div className="grid md:grid-cols-2 gap-px bg-warm-100 border border-warm-100 rounded-xl overflow-hidden mt-12">
          <article className="bg-white p-9">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-soft">
              Palladium Hotel Group
            </p>
            <div className="mt-7 grid gap-6">
              <div>
                <span className="block text-[46px] font-semibold leading-[0.95] tracking-[-0.04em] text-brand">
                  40%
                </span>
                <span className="block mt-2 text-[15px] leading-[1.4] text-ink-2 max-w-[34ch]">
                  del tráfico que no tenía atribución, recuperado
                </span>
              </div>
              <div>
                <span className="block text-[46px] font-semibold leading-[0.95] tracking-[-0.04em] text-brand">
                  +165%
                </span>
                <span className="block mt-2 text-[15px] leading-[1.4] text-ink-2 max-w-[34ch]">
                  de CPS en Display sobre DV360 tras cambiar el modelo de medición
                </span>
              </div>
            </div>
            <blockquote className="mt-8 pt-6 border-t border-dashed border-warm-200 text-[18px] font-semibold leading-[1.35] tracking-[-0.015em] text-ink border-l-2 border-l-quote pl-4">
              El dato que entrega Sealmetrics es agnóstico, imparcial y neutral. No hay caja negra.
            </blockquote>
            <p className="mt-3 font-mono text-[11.5px] tracking-[0.06em] text-ink-soft">
              Toni Andújar · Digital &amp; Direct Sales Director
            </p>
          </article>

          <article className="bg-white p-9">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-soft">
              Dreamplace Hotels
            </p>
            <div className="mt-7 grid gap-6">
              <div>
                <span className="block text-[46px] font-semibold leading-[0.95] tracking-[-0.04em] text-brand">
                  +30%
                </span>
                <span className="block mt-2 text-[15px] leading-[1.4] text-ink-2 max-w-[34ch]">
                  más tráfico medido que con Google Analytics
                </span>
              </div>
              <div>
                <span className="block text-[46px] font-semibold leading-[0.95] tracking-[-0.04em] text-brand">
                  15–20%
                </span>
                <span className="block mt-2 text-[15px] leading-[1.4] text-ink-2 max-w-[34ch]">
                  más ventas atribuidas, conciliadas contra su CRM
                </span>
              </div>
            </div>
            <p className="mt-8 pt-6 border-t border-dashed border-warm-200 text-[15.5px] leading-[1.6] text-ink-soft">
              El caso que convence al director financiero: el número de la herramienta de marketing y el del
              CRM dejaron de contradecirse.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- 07 · PRIVACY BY DESIGN ---------- */
const PBD = [
  {
    k: "Cookies escritas",
    v: "0",
    t: "No escribimos nada en el navegador",
    d: "Ni propias ni de terceros. Ni localStorage, ni sessionStorage, ni ningún almacenamiento en el dispositivo del visitante.",
  },
  {
    k: "Identificadores",
    v: "0",
    t: "No existe la columna usuario",
    d: "No hay user ID, ni client ID, ni un pseudónimo anónimo. Dos visitas del mismo navegador no son reconocibles como tales, ni ahora ni dentro de dos años.",
  },
  {
    k: "Señales de huella",
    v: "0",
    t: "No derivamos identidad del dispositivo",
    d: "Ni canvas, ni fuentes instaladas, ni combinación de cabeceras. El fingerprinting está expresamente descartado, no simplemente sin usar.",
  },
  {
    k: "Cruces entre webs",
    v: "0",
    t: "Lo tuyo se queda en lo tuyo",
    d: "Nada de lo que recogemos en tu web se cruza con ninguna otra. Tus datos no alimentan un grafo publicitario porque no tenemos ninguno.",
  },
  {
    k: "Región del dato",
    v: "Dublín",
    t: "El dato analítico no sale de Irlanda",
    d: "Alojamiento, base de datos y backups en Dublín. Sin transferencias internacionales que dependan de un marco de adecuación en discusión política y judicial.",
  },
  {
    k: "Documentos públicos",
    v: "4",
    t: "Verificable, no declarativo",
    d: "Autoevaluación CNIL, autoevaluación UK PECR, lista de subencargados y procedimiento de derechos del interesado. Auditable sin pedírnoslo.",
  },
];

const COMPLIANCE_LINKS = [
  { label: "Autoevaluación CNIL", href: "https://docs.sealmetrics.com/compliance/cnil-self-assessment" },
  { label: "UK PECR", href: "https://docs.sealmetrics.com/compliance/uk-pecr-self-assessment" },
  { label: "Subencargados", href: "https://docs.sealmetrics.com/compliance/subprocessors" },
  { label: "Derechos del interesado", href: "https://docs.sealmetrics.com/compliance/data-subject-rights" },
];

export function PrivacyByDesign() {
  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>06 · Privacy by design</Eyebrow>
        <h2 className="h-section mt-5 max-w-[26ch]">
          La privacidad no es nuestra política. Es nuestra <em>arquitectura.</em>
        </h2>
        <p className="mt-6 max-w-[64ch] text-ink-2 leading-[1.55]" style={{ fontSize: "clamp(16px,1.5vw,19px)" }}>
          Casi todas las herramientas son privacy by policy: recogen el dato personal y luego prometen portarse
          bien con él. Nosotros nunca lo recogemos. El dato que haría falta para vulnerar la privacidad de
          alguien no existe en nuestra base de datos, así que no hay nada que prometer, que anonimizar después
          ni que filtrar.
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-warm-100 border border-warm-100 rounded-xl overflow-hidden mt-12">
          {PBD.map((p) => (
            <div key={p.k} className="bg-white p-8">
              <span className="inline-flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft border border-warm-200 rounded-full px-3 py-1.5">
                {p.k}
                <b className="text-brand font-semibold text-[15px] tracking-[-0.02em]">{p.v}</b>
              </span>
              <h3 className="mt-3.5 text-[19px] font-semibold text-ink tracking-[-0.015em] leading-[1.25]">
                {p.t}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-ink-soft">{p.d}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2.5 mt-9">
          {COMPLIANCE_LINKS.map((c) => (
            <a
              key={c.href}
              href={c.href}
              /* En pestaña nueva: son prueba documental, no un paso del funnel.
                 Que la consulte el DPO sin sacar al visitante de la landing. */
              target="_blank"
              rel="noopener"
              className="font-mono text-[12px] tracking-[0.06em] px-4 py-2 border border-warm-200 rounded-full text-ink-2 no-underline hover:border-brand hover:text-brand transition-colors"
            >
              {c.label}
            </a>
          ))}
        </div>

        <p className="mt-8 max-w-[60ch] text-[15px] leading-[1.6] text-ink-soft">
          Nuestra arquitectura ha pasado las auditorías legales de Acciona, 3Cat, UNICEF y Desigual.
        </p>
      </div>
    </section>
  );
}

/* ---------- 08 · EL INTERCAMBIO ---------- */
const TRADE_NO = [
  "Modelos de atribución multitouch. El único modelo legal sin consentimiento es last-click.",
  "Customer journeys individuales ni secuencias de sesión.",
  "Construcción de audiencias para activar en plataformas.",
  "Cohortes de usuario, retención individual o LTV por persona.",
];

const TRADE_YES = [
  "Sesiones, eventos y ventas sin pérdida por consentimiento. Sin banner de por medio.",
  "Canal, campaña, medium, keyword, content y referrer sobre ese mismo dato.",
  "Embudo agregado completo: visita → producto visto → carrito → checkout → compra.",
  "Dato a nivel de producto: talla, color, marca, categoría, rango de precio, SKU.",
  "Todo con dato fresco: los hits suelen llegar a los informes en menos de dos minutos, sin muestreo.",
];

export function Tradeoff() {
  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>07 · El intercambio</Eyebrow>
        <h2 className="h-section mt-5 max-w-[24ch]">
          Te decimos lo que pierdes <em>antes de que lo descubras tú.</em>
        </h2>
        <p className="mt-6 max-w-[60ch] text-ink-2 leading-[1.55]" style={{ fontSize: "clamp(16px,1.5vw,19px)" }}>
          Medir sin consentimiento tiene un precio y no lo escondemos en la letra pequeña. Si lo que necesitas
          está en la columna izquierda, no somos tu herramienta y te lo diremos en la primera llamada.
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-warm-100 border border-warm-100 rounded-xl overflow-hidden mt-12">
          <div className="bg-white p-9">
            <h3 className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-red-alert mb-5">
              Lo que no vas a tener
            </h3>
            <ul className="list-none">
              {TRADE_NO.map((li, i) => (
                <li
                  key={li}
                  className={`relative pl-7 py-3.5 text-[15.5px] leading-[1.5] text-ink-2 ${
                    i < TRADE_NO.length - 1 ? "border-b border-dashed border-warm-200" : ""
                  }`}
                >
                  <span className="absolute left-0 top-3.5 font-mono text-red-alert" aria-hidden="true">
                    —
                  </span>
                  {li}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-9">
            <h3 className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-brand mb-5">
              Lo que sí vas a tener
            </h3>
            <ul className="list-none">
              {TRADE_YES.map((li, i) => (
                <li
                  key={li}
                  className={`relative pl-7 py-3.5 text-[15.5px] leading-[1.5] text-ink-2 ${
                    i < TRADE_YES.length - 1 ? "border-b border-dashed border-warm-200" : ""
                  }`}
                >
                  <span className="absolute left-0 top-3.5 font-mono text-brand" aria-hidden="true">
                    +
                  </span>
                  {li}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 09 · LA MÁQUINA · SLAB OSCURO 1 ---------- */
type GaugeRow = { label: string; pct: number; value: string; us?: boolean };

const GAUGES: { title: string; rows: GaugeRow[]; note: React.ReactNode }[] = [
  {
    title: "Peso transferido por la red · gzip",
    rows: [
      { label: "Sealmetrics", pct: 0.65, value: "1,1 KB", us: true },
      { label: "GA4", pct: 85.6, value: "~146 KB" },
      { label: "Adobe", pct: 100, value: "~170 KB" },
    ],
    note: (
      <>
        <b className="text-white font-mono font-semibold">132×</b> más ligero que GA4 y <b className="text-white font-mono font-semibold">155×</b> que Adobe. El tracker cabe en{" "}
        <b className="text-white font-mono font-semibold">un solo paquete TCP</b> y llega en el primer
        round-trip. Las otras dos cargas necesitan 4 o 5 round-trips solo para descargarse.
      </>
    ),
  },
  {
    title: "JavaScript que el dispositivo tiene que parsear · sin comprimir",
    rows: [
      { label: "Sealmetrics", pct: 0.27, value: "2,0 KB", us: true },
      { label: "GA4", pct: 56.1, value: "~409 KB" },
      { label: "Adobe", pct: 100, value: "~730 KB" },
    ],
    note: (
      <>
        <b className="text-white font-mono font-semibold">El parseo no tiene CDN.</b> Google y Adobe sirven
        desde edges excelentes, pero medio mega de JavaScript se parsea en el móvil del visitante. En un
        terminal de gama baja eso es entre 0,8 y 1,5 s de CPU antes de que pueda dispararse ningún hit.
      </>
    ),
  },
  {
    title: "Tiempo hasta que el hit sale del dispositivo · fibra, instalación en head",
    rows: [
      { label: "Sealmetrics", pct: 10, value: "0,1–0,3 s", us: true },
      { label: "GA4", pct: 23, value: "0,5–0,7 s" },
      { label: "Adobe", pct: 100, value: "~3,0 s" },
    ],
    note: (
      <>
        Y estas son sus mejores cifras:{" "}
        <b className="text-white font-mono font-semibold">excluyen la espera del banner</b>. Esa ventana entre
        la carga y el hit es exactamente donde el visitante que abandona se convierte en tráfico invisible.
      </>
    ),
  },
];

const TABLE_ROWS = [
  ["Transporte del hit", "sendBeacon · sobrevive al cierre de página", "Tipo beacon", "Image GET · se cancela al salir"],
  ["Consentimiento en la UE", "No lo requiere, por diseño", "Sí · Consent Mode modela el hueco", "Sí en la mayoría de instalaciones"],
  ["Tráfico medido en paralelo", "Referencia", "25–45% menos (muestra de nuestros clientes)", "25% menos (30 días con doble etiqueta, campo)"],
];

const SPECS = [
  {
    h: "Velocidad",
    items: [
      { v: "1,1 KB", l: "Un solo paquete TCP. Sin dependencias, sin tag manager necesario." },
      { v: "Dato fresco", l: "No en un informe: en toda la plataforma. Los hits suelen llegar a los informes en menos de dos minutos." },
      { v: "También en Black Friday", l: "Sin muestreo, y el SLA garantiza el día completo antes de las 6 AM. Ajustas durante la campaña, no a la semana siguiente." },
    ],
  },
  {
    h: "Verdad del dato",
    items: [
      { v: "Sin pérdida por consentimiento", l: "Sin consentimiento, sin cookies, sin banner de por medio." },
      { v: "Cero modelado", l: "No modeling. No sampling. No estimaciones. Si está en el informe, pasó." },
      { v: "+25% vs Adobe o GA4", l: "Medido en campo, 30 días de doble etiqueta sobre el mismo sitio." },
    ],
  },
  {
    h: "Profundidad",
    items: [
      { v: "Todo el embudo", l: "Ver producto, add to cart, begin checkout, compra. Y el evento que se te ocurra." },
      { v: "Cualquier propiedad", l: "Talla, modelo, marca, categoría, color, peso, rango de precio. Lo que sea de tu negocio." },
      { v: "Del dato al porqué", l: "Producto que se ve, se añade y no se compra: eso no es una métrica, es un diagnóstico." },
    ],
  },
  {
    h: "Salida",
    items: [
      { v: "API robusta", l: "Todo lo que ves en la interfaz está disponible por API. Sin excepciones." },
      { v: "BigQuery · Data Studio", l: "Conector nativo. Seleccionas la cuenta y sincroniza." },
      { v: "MCP + LENS", l: "Conecta tus datos a Claude, ChatGPT o Cursor. O usa LENS, nuestra IA privada, y que el dato no salga de aquí." },
    ],
  },
];

export function Machine() {
  return (
    <section id="maquina" className="py-24 bg-ink section-dark scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-amber">08 · La máquina</span>
        <h2 className="h-section mt-5 max-w-[22ch]">
          No es otra herramienta de analítica. Es <em>otra ingeniería.</em>
        </h2>
        <p className="mt-6 max-w-[62ch] text-dark-text-secondary leading-[1.55]" style={{ fontSize: "clamp(16px,1.5vw,19px)" }}>
          Sealmetrics contra <span className="font-mono text-dark-text">gtag.js</span> de GA4 y contra la
          cadena Adobe Launch + AppMeasurement. Mismos sitios de referencia, misma metodología, julio de 2026.
        </p>

        {GAUGES.map((g) => (
          <div key={g.title} className="mt-9 border border-dark-border rounded-xl p-7 sm:p-8">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-dark-text-tertiary mb-6">
              {g.title}
            </p>
            {g.rows.map((r, i) => (
              <div
                key={r.label}
                className="grid grid-cols-[96px_1fr] md:grid-cols-[130px_1fr_130px] gap-3 md:gap-4 items-center mb-3.5 last:mb-0"
              >
                <span className="font-mono text-[13px] tracking-[0.04em] text-dark-text">{r.label}</span>
                <RevealBar pct={r.pct} tone={r.us ? "us" : "them"} delay={i * 170} dark />
                <span
                  className={`font-mono font-semibold text-[15px] tracking-[-0.02em] tabular-nums col-start-2 md:col-start-3 md:text-right ${
                    r.us ? "text-brand" : "text-dark-text"
                  }`}
                >
                  {r.value}
                </span>
              </div>
            ))}
            <p className="mt-5 pt-4 border-t border-dashed border-dark-border text-[14.5px] leading-[1.6] text-dark-text-secondary">
              {g.note}
            </p>
          </div>
        ))}

        <div className="mt-9 overflow-x-auto">
          <table className="w-full border-collapse text-[14.5px] min-w-[680px]">
            <thead>
              <tr>
                <th className="text-left p-4 border-b border-dark-border font-mono text-[11px] uppercase tracking-[0.12em] text-dark-text-tertiary font-medium" />
                <th className="text-left p-4 border-b border-dark-border font-mono text-[11px] uppercase tracking-[0.12em] text-brand font-medium">
                  Sealmetrics
                </th>
                <th className="text-left p-4 border-b border-dark-border font-mono text-[11px] uppercase tracking-[0.12em] text-dark-text-tertiary font-medium">
                  GA4
                </th>
                <th className="text-left p-4 border-b border-dark-border font-mono text-[11px] uppercase tracking-[0.12em] text-dark-text-tertiary font-medium">
                  Adobe Analytics
                </th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row) => (
                <tr key={row[0]}>
                  <td className="p-4 border-b border-dark-border align-top text-dark-text-tertiary">{row[0]}</td>
                  <td className="p-4 border-b border-dark-border align-top text-white font-medium">{row[1]}</td>
                  <td className="p-4 border-b border-dark-border align-top text-dark-text-secondary">{row[2]}</td>
                  <td className="p-4 border-b border-dark-border align-top text-dark-text-secondary">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-[14.5px] leading-[1.6] text-dark-text-secondary max-w-[80ch]">
          La cifra de Adobe es la evidencia más sólida: mismo sitio, mismas visitas, páginas vistas contra
          páginas vistas, un mes entero, y una diferencia constante del 25% — la firma de una causa
          estructural, no de un incidente.{" "}
          <a
            href={DOCS_PERF}
            target="_blank"
            rel="noopener"
            className="text-white underline underline-offset-[3px] decoration-brand hover:decoration-white"
          >
            Metodología completa y limitaciones →
          </a>
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-border border border-dark-border rounded-xl overflow-hidden mt-12">
          {SPECS.map((col) => (
            <div key={col.h} className="bg-ink">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand px-6 pt-6 pb-4">
                {col.h}
              </h3>
              {col.items.map((it) => (
                <div key={it.v} className="px-6 py-5 border-t border-dashed border-dark-border">
                  <p className="text-[19px] font-semibold tracking-[-0.02em] leading-[1.15] text-white">
                    {it.v}
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.5] text-dark-text-secondary">{it.l}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-16 pt-11 border-t border-dark-border text-center">
          <p
            className="font-semibold tracking-[-0.02em] leading-[1.12] text-white max-w-[24ch] mx-auto"
            style={{ fontSize: "clamp(28px,3.6vw,44px)" }}
          >
            Del dato al <span className="text-amber">por qué</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 10 · IMPLEMENTACIÓN ---------- */
function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="font-mono text-[12.5px] leading-[1.75] bg-ink text-dark-text-secondary p-5 rounded-lg border-l-[3px] border-brand overflow-x-auto whitespace-pre">
      {children}
    </pre>
  );
}

const CM = "text-dark-text-tertiary";
const VAL = "text-amber";

export function Implementation() {
  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16 items-start">
        <div>
          <Eyebrow>09 · La implementación</Eyebrow>
          <h2 className="h-section mt-5">
            Una línea para medir. Otra para vender. <em>O ninguna.</em>
          </h2>
          <p className="mt-6 max-w-[52ch] text-ink-2 leading-[1.55]" style={{ fontSize: "clamp(16px,1.5vw,19px)" }}>
            En el head, o con el plugin de Shopify, Magento o PrestaShop. Tus UTMs actuales nos valen: no
            tienes que reetiquetar nada.
          </p>
          <p className="mt-5 text-[15.5px] leading-[1.6] text-ink-soft">
            El primer bloque mide páginas vistas y canal de entrada. El segundo registra la venta con todo lo
            que quieras saber de ella: importe, divisa, forma de pago y la línea de producto completa. Ese
            segundo bloque es el que convierte la analítica en decisiones de campaña.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.6] text-ink-soft">
            Puedes añadir y quitar eventos a mitad de temporada: como no hay traza de recorrido, no hay nada
            que se rompa.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-2.5">
            1 · Píxel de medición
          </p>
          <CodeBlock>
            <span className={CM}>{"<!-- Sealmetrics Analytics -->"}</span>
            {"\n"}
            {"<script src=\""}
            <span className={VAL}>https://t.sealmetrics.com/t.js?id=YOUR_ACCOUNT_ID</span>
            {"\" "}
            <span className="text-white">defer</span>
            {"></script>"}
          </CodeBlock>

          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-2.5 mt-7">
            2 · Píxel de conversión
          </p>
          <CodeBlock>
            <span className="text-white">sealmetrics</span>
            {".conv("}
            <span className={VAL}>{"'purchase'"}</span>
            {", "}
            <span className={VAL}>149.99</span>
            {", {\n  currency: "}
            <span className={VAL}>{"'EUR'"}</span>
            {",\n  payment_method: "}
            <span className={VAL}>{"'credit_card'"}</span>
            {",\n  items: [\n    { product_name: "}
            <span className={VAL}>{"'Producto A'"}</span>
            {", price: "}
            <span className={VAL}>{"'19.99'"}</span>
            {", quantity: "}
            <span className={VAL}>{"'2'"}</span>
            {",\n      category: "}
            <span className={VAL}>{"'Zapatillas'"}</span>
            {", brand: "}
            <span className={VAL}>{"'Marca'"}</span>
            {" },\n    { product_name: "}
            <span className={VAL}>{"'Producto B'"}</span>
            {", price: "}
            <span className={VAL}>{"'29.99'"}</span>
            {", quantity: "}
            <span className={VAL}>{"'1'"}</span>
            {",\n      category: "}
            <span className={VAL}>{"'Accesorios'"}</span>
            {", brand: "}
            <span className={VAL}>{"'Marca'"}</span>
            {" }\n  ]\n})"}
          </CodeBlock>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-ink-soft">
            Cada clave que añadas al objeto se convierte en una dimensión que puedes cruzar contra canal y
            campaña. Marca, color, talla, rango de precio: lo que exista en tu catálogo. Sin IDs de pedido ni
            de cliente — el píxel no acepta datos personales por diseño.
          </p>

          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-2.5 mt-7">
            3 · O ni eso: un prompt
          </p>
          <CodeBlock>
            {"Conecta Claude al MCP de Sealmetrics. Servidor:\n"}
            <span className={VAL}>https://mcp.sealmetrics.com/mcp</span>
            {"\nDespués crea mi cuenta, genera los píxeles que\nnecesito y monta los informes en tiempo real."}
          </CodeBlock>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-ink-soft">
            Pégalo en Claude, ChatGPT, Cursor, Codex, Copilot, Windsurf o cualquier cliente MCP. Te crea la
            cuenta, te genera los píxeles a medida de los eventos y propiedades que necesitas, y te deja los
            informes montados. Sin formulario de registro y sin llamada comercial.
          </p>

          <p className="mt-6 font-mono text-[11.5px] uppercase tracking-[0.06em] text-ink-soft">
            1,1 KB · DEFER · SENDBEACON · SIN COOKIES · SIN CONSENTIMIENTO
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 11 · USOS ---------- */
const USES = [
  {
    t: "Repartes inversión con el dato completo",
    d: "Un cliente veía TikTok Ads casi plano en GA4. Con el dato sin huecos de consentimiento aparecieron las ventas reales y un peso en descubrimiento muy superior al reportado. La inversión se movió en consecuencia.",
  },
  {
    t: "Optimizas campañas por producto",
    d: "Esta campaña de Shopping vende auriculares y no vende chaquetas. Excluye lo segundo, sube pujas en lo primero. El dato está a nivel de la propiedad que hayas etiquetado, no solo del canal.",
  },
  {
    t: "Encuentras el dinero atascado",
    d: "Productos que se ven mucho, se añaden al carrito y no se compran: eso es un problema de precio o de ficha. Sale solo cuando el embudo está completo.",
  },
  {
    t: "Se lo preguntas a LENS",
    d: "«¿Dónde estoy quemando presupuesto?» — «DemandGen: 9.230 clics, 2 ventas. Pausarla y mover el gasto a PMax_Catalog lo recupera.» Respuesta, no el informe donde buscarla.",
  },
];

export function UseCases() {
  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>10 · Qué haces con esto un martes por la tarde</Eyebrow>
        <h2 className="h-section mt-5 max-w-[24ch]">
          Decisiones, <em>no informes.</em>
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-warm-100 border border-warm-100 rounded-xl overflow-hidden mt-12">
          {USES.map((u) => (
            <div key={u.t} className="bg-white p-8">
              <h3 className="text-[19px] font-semibold text-ink tracking-[-0.015em] leading-[1.25]">{u.t}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.6] text-ink-soft">{u.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 12 · PRECIO Y PUERTAS ---------- */
export function PriceDoors() {
  return (
    <section id="empezar" className="py-24 bg-white border-t border-warm-100 scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <Eyebrow>11 · El precio</Eyebrow>
        <h2 className="h-section mt-5 max-w-[24ch]">
          Dato de nivel enterprise sin el <em>contrato de nivel enterprise.</em>
        </h2>

        <div className="border border-warm-100 rounded-2xl bg-warm-white p-8 sm:p-10 mt-12">
          <div className="flex flex-wrap items-baseline gap-4 py-4 border-b border-dashed border-warm-200">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft min-w-[250px]">
              Hasta 5M de eventos / mes
            </span>
            <span className="text-[24px] font-semibold tracking-[-0.02em] text-ink">499 € al mes</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-4 py-4">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft min-w-[250px]">
              Hasta 15M de eventos / mes
            </span>
            <span className="text-[24px] font-semibold tracking-[-0.02em] text-ink">899 € al mes</span>
          </div>

          <p className="mt-6 text-[15px] leading-[1.6] text-ink-soft">
            Contrato anual. Solo contamos los eventos que tú etiquetas, así que tu cifra de GA4 no es
            comparable: vas a empezar bastante por debajo. Los picos de temporada no penalizan.
          </p>
          <p className="mt-5 pt-5 border-t border-dashed border-warm-200 text-[15px] leading-[1.6] text-ink-2">
            Para que lo sitúes:{" "}
            <strong className="font-semibold text-ink">
              GA360 va por presupuesto desde unos 50.000 $ al año. Adobe Analytics, desde unos 50.000 $.
            </strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-warm-100 border border-warm-100 rounded-xl overflow-hidden mt-9">
          <div className="bg-white p-9">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft block mb-3.5">
              Puerta 1 · Lo montamos contigo
            </span>
            <h3 className="text-[22px] font-semibold text-ink tracking-[-0.02em] leading-[1.2]">
              Auditoría gratuita de tu medición
            </h3>
            <p className="mt-3 mb-6 text-[15px] leading-[1.6] text-ink-soft">
              Te decimos cuánto tráfico y cuántas ventas estás perdiendo hoy, con tu propio dato. Revisamos tu
              plan de medición y nuestro equipo técnico habla con el tuyo si hace falta.
            </p>
            <Link
              href={AUDIT}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-white rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
            >
              Pide tu auditoría gratuita <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="bg-white p-9">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft block mb-3.5">
              Puerta 2 · Te lo montas tú
            </span>
            <h3 className="text-[22px] font-semibold text-ink tracking-[-0.02em] leading-[1.2]">
              1 millón de eventos gratis
            </h3>
            <p className="mt-3 mb-6 text-[15px] leading-[1.6] text-ink-soft">
              Sin tarjeta de crédito y sin formulario. Un prompt en tu asistente crea la cuenta, genera los
              píxeles y monta los informes. Al superar el millón, se activa el plan Growth.
            </p>
            <Link
              href={PRICING}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-warm-200 text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 transition-colors"
            >
              Empezar gratis <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 13 · CIERRE · SLAB OSCURO 2 ---------- */
const CHECKS = [
  "Mira tu porcentaje de tráfico directo.",
  "Mira tu porcentaje de unassigned.",
  "Mira tus ventas atribuidas a Meta.",
];

export function Close() {
  return (
    <section className="py-28 md:py-32 bg-ink section-dark text-center">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-amber">12</span>

        <ul className="list-none max-w-[34ch] mx-auto mt-10 mb-10 text-left">
          {CHECKS.map((c, i) => (
            <li
              key={c}
              className={`relative pl-11 py-4 font-semibold tracking-[-0.02em] leading-[1.25] text-white ${
                i < CHECKS.length - 1 ? "border-b border-dashed border-dark-border" : ""
              }`}
              style={{ fontSize: "clamp(19px,2.6vw,28px)" }}
            >
              <span className="absolute left-0 top-[1.15em] font-mono text-[15px] text-amber" aria-hidden="true">
                →
              </span>
              {c}
            </li>
          ))}
        </ul>

        <p
          className="font-semibold tracking-[-0.03em] leading-[1.05] text-white max-w-[20ch] mx-auto mb-10"
          style={{ fontSize: "clamp(30px,4.6vw,54px)" }}
        >
          ¿Te fías de esos datos?
          <br />
          <span className="text-amber">¿Hasta cuándo?</span>
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={AUDIT}
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-brand hover:text-ink transition-colors"
          >
            Pide tu auditoría gratuita <span aria-hidden="true">→</span>
          </Link>
          <Link
            href={PRICING}
            className="inline-flex items-center gap-2 px-7 py-4 border border-dark-border text-white rounded-md text-[15px] font-semibold no-underline hover:bg-white hover:text-ink transition-colors"
          >
            Empezar gratis · 1M eventos
          </Link>
        </div>
      </div>
    </section>
  );
}
