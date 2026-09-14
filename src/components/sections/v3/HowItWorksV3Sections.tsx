import Link from "next/link";

type Locale = "en" | "es";

const COPY = {
  en: {
    eyebrow: "How it works",
    h1Pre: "A different approach to ",
    h1Em: "measurement.",
    lede: "Traditional analytics lose most of your data before it's even recorded. Sealmetrics was built from scratch to solve this — without cookies, without consent dependency, and without compromising privacy.",
    ctaDemo: "Start 14-day trial",
    ctaPricing: "Book a demo",
    microTrust: "5-minute setup · No cookies · EU-hosted by design",
  },
  es: {
    eyebrow: "Cómo funciona",
    h1Pre: "Un enfoque distinto a la ",
    h1Em: "medición.",
    lede: "La analítica tradicional pierde la mayoría de tus datos antes de registrarlos. Sealmetrics se construyó desde cero para resolverlo — sin cookies, sin consentimiento y sin comprometer la privacidad.",
    ctaDemo: "Prueba de 14 días",
    ctaPricing: "Reserva una demo",
    microTrust: "Setup en 5 min · Sin cookies · Alojado en UE por diseño",
  },
};

/* ============================================
   HERO
   ============================================ */
export function HowItWorksHeroV3({ locale = "en" as Locale }) {
  const t = COPY[locale];
  return (
    <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
        <span
          className="eyebrow mb-5"
          style={{ display: "inline-flex", justifyContent: "center" }}
        >
          {t.eyebrow}
        </span>
        <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
          {t.h1Pre}<em>{t.h1Em}</em>
        </h1>
        <p
          className="text-ink-soft mt-8 mx-auto max-w-[60ch] leading-[1.55]"
          style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
        >
          {t.lede}
        </p>
        <div data-md="skip" className="flex flex-wrap justify-center gap-3 mt-9">
          <Link
            href={locale === "es" ? "/es/demo" : "/demo"}
            className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-white rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
          >
            {t.ctaPricing} →
          </Link>
          <a
            href="https://my.sealmetrics.com/register"
            className="inline-flex items-center gap-2 px-7 py-4 border border-warm-200 text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 transition-colors"
          >
            {t.ctaDemo}
          </a>
        </div>
        <p className="mt-4 font-mono text-[12px] text-ink-soft uppercase tracking-[0.06em]">
          {t.microTrust}
        </p>
      </div>
    </section>
  );
}

/* ============================================
   ARCHITECTURE · 3 layers
   ============================================ */
export function ArchitectureV3({ locale = "en" as Locale }) {
  const data = {
    en: {
      eyebrow: "Architecture",
      title: (
        <>
          Three layers. <em>One pipeline.</em>
        </>
      ),
      lede:
        "Traditional analytics depend on third-party cookies and browser-side tracking. Sealmetrics flips the model: first-party collection, server-side processing, EU-hosted storage. All designed so consent rejection, ad blockers and Schrems II stop being your problem.",
      layers: [
        {
          n: "01 · Collect",
          title: "846-byte first-party pixel",
          p: "A tiny JavaScript tag, 846 bytes at its minimum and 1.1 KB on the wire in full. It ships from t.sealmetrics.com by default, and you can switch it to a subdomain of your own — first-party mode — so ad-blocker lists that target third-party analytics domains have nothing to match. No cookies are written. No local storage. No fingerprinting.",
          bullet: [
            "Optional first-party mode on your own subdomain",
            "1.1 KB on the wire · ~132× lighter than GA4",
            "Works with any CMS or framework",
            "5-minute install · one script tag",
          ],
        },
        {
          n: "02 · Process",
          title: "Anonymous server-side event counting",
          p: "Events are processed on our servers, not in the browser. Each pageview is logged with anonymous channel metadata (referrer, UTM, landing page) and aggregated into channel totals. No user identifier, no session stitching, no cross-visit linking. Zero sampling at any scale.",
          bullet: [
            "No client-side aggregation",
            "No per-user identifiers · no session stitching",
            "100% of events kept · no thresholds",
            "Real-time stream under 2 minutes",
          ],
        },
        {
          n: "03 · Store",
          title: "EU-hosted · Dublin, Ireland",
          p: "Visitor data lives exclusively on EU infrastructure — no transfers outside the EU, no sub-processors in third countries, no reliance on Standard Contractual Clauses. The single non-EEA transfer anywhere in the service is account-user service email via Resend (USA, SCCs + EU-US DPF), which touches no visitor data. GDPR-compliant by architecture, not by a legal layer bolted on afterwards.",
          bullet: [
            "Dublin, Ireland — Schrems II clean",
            "No third-country sub-processors in the visitor data path",
            "24 months data retention included",
            "GDPR · ePrivacy · Schrems II clean",
          ],
        },
      ],
    },
    es: {
      eyebrow: "Arquitectura",
      title: (
        <>
          Tres capas. <em>Un pipeline.</em>
        </>
      ),
      lede:
        "La analítica tradicional depende de cookies de terceros y tracking en el navegador. Sealmetrics invierte el modelo: recolección first-party, procesamiento en servidor, almacenamiento en UE. Todo diseñado para que el rechazo de consentimiento, los bloqueadores y Schrems II dejen de ser tu problema.",
      layers: [
        {
          n: "01 · Captura",
          title: "Pixel first-party de 846 bytes",
          p: "Un script JavaScript diminuto: 846 bytes en su versión mínima y 1,1 KB en red al completo. Por defecto se sirve desde t.sealmetrics.com, y puedes moverlo a un subdominio tuyo — modo first-party — para que las listas de bloqueadores que atacan dominios de analítica de terceros no tengan nada que bloquear. Sin cookies. Sin localStorage. Sin fingerprinting.",
          bullet: [
            "Modo first-party opcional en tu propio subdominio",
            "1,1 KB en red · ~132× más ligero que GA4",
            "Funciona con cualquier CMS o framework",
            "Instalación en 5 min · un solo script",
          ],
        },
        {
          n: "02 · Procesa",
          title: "Conteo de eventos anónimo en servidor",
          p: "Los eventos se procesan en nuestros servidores, no en el navegador. Cada pageview se registra con metadatos anónimos de canal (referrer, UTM, landing) y se agrega en totales por canal. Sin identificador de usuario, sin session stitching, sin enlazar visitas entre sí. Cero muestreo a cualquier escala.",
          bullet: [
            "Sin agregación en el cliente",
            "Sin identificadores por usuario · sin session stitching",
            "100% de eventos conservados · sin umbrales",
            "Stream en tiempo real · menos de 2 min",
          ],
        },
        {
          n: "03 · Almacena",
          title: "Alojado en UE · Dublín, Irlanda",
          p: "El dato de visitante vive exclusivamente en infraestructura UE — sin transferencias fuera de UE, sin sub-procesadores en terceros países, sin dependencia de Cláusulas Contractuales Tipo. La única transferencia fuera del EEE en todo el servicio son los emails de servicio a usuarios de la cuenta vía Resend (EE. UU., CCT + EU-US DPF), que no tocan dato de visitante. RGPD por arquitectura, no por una capa legal añadida después.",
          bullet: [
            "Dublín, Irlanda — Schrems II limpio",
            "Sin sub-procesadores en terceros países en la ruta del dato de visitante",
            "24 meses de retención incluidos",
            "RGPD · ePrivacy · Schrems II limpio",
          ],
        },
      ],
    },
  }[locale];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.layers.map((l) => (
            <article
              key={l.title}
              className="bg-white border border-warm-100 rounded-xl p-8 flex flex-col"
            >
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-brand mb-4">
                {l.n}
              </div>
              <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-ink leading-[1.2] mb-3">
                {l.title}
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-ink-soft mb-5">{l.p}</p>
              <ul className="flex flex-col gap-2 mt-auto">
                {l.bullet.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2.5 text-[13.5px] text-ink-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   IMPLEMENTATION STEPS
   ============================================ */
export function ImplementationStepsV3({ locale = "en" as Locale }) {
  const data = {
    en: {
      eyebrow: "Implementation",
      title: (
        <>
          From install to <em>decision-ready</em> in one week.
        </>
      ),
      lede:
        "Runs alongside GA4. No migration, no disruption. One script — same as any analytics tool — but without the cookie banner and without the sampling.",
      steps: [
        { n: "Step 01", time: "15 minutes", t: "Install the pixel", p: "Add one script tag to your site. Works with any CMS or framework. Your dev deploys in 15 minutes." },
        { n: "Step 02", time: "Day 1", t: "Real data flows", p: "Full traffic visibility from the first hour. Every visitor, every source, every conversion — 100% observed." },
        { n: "Step 03", time: "Day 3", t: "GA4 side-by-side", p: "We help you calibrate and compare against your existing GA4. You see the gap with your own numbers, not ours." },
        { n: "Step 04", time: "Day 5", t: "Microconversions", p: "Tag the 5–10 microconversions that matter for revenue attribution. Cart adds, form completes, video plays." },
        { n: "Step 05", time: "Week 1", t: "Decision-ready", p: "Funnels, channels, attribution — all calibrated. Your team starts making reallocation decisions with defensible data." },
      ],
    },
    es: {
      eyebrow: "Implementación",
      title: (
        <>
          De la instalación a <em>decisiones defendibles</em> en una semana.
        </>
      ),
      lede:
        "Corre junto a GA4. Sin migración, sin interrupciones. Un script — igual que cualquier herramienta — pero sin banner de cookies y sin muestreo.",
      steps: [
        { n: "Paso 01", time: "15 minutos", t: "Instala el pixel", p: "Añade un script a tu web. Funciona con cualquier CMS o framework. Tu dev lo despliega en 15 minutos." },
        { n: "Paso 02", time: "Día 1", t: "Fluyen los datos reales", p: "Visibilidad completa del tráfico desde la primera hora. Cada visitante, cada fuente, cada conversión — 100% observado." },
        { n: "Paso 03", time: "Día 3", t: "GA4 en paralelo", p: "Te ayudamos a calibrar y comparar con tu GA4 actual. Ves el gap con tus propios datos, no los nuestros." },
        { n: "Paso 04", time: "Día 5", t: "Microconversiones", p: "Etiqueta las 5–10 microconversiones que importan para atribución. Add-to-cart, formularios, video plays." },
        { n: "Paso 05", time: "Semana 1", t: "Decisiones defendibles", p: "Embudos, canales, atribución — todo calibrado. Tu equipo empieza a tomar decisiones con datos defendibles." },
      ],
    },
  }[locale];

  return (
    <section id="steps" className="py-28 bg-white border-t border-warm-100">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {data.steps.map((s) => (
            <article
              key={s.n}
              className="bg-warm-50 border border-warm-100 rounded-xl p-6 flex flex-col min-h-[240px]"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                {s.n}
              </span>
              <span className="inline-flex self-start px-2.5 py-1 bg-brand-soft text-brand-hover font-mono text-[10px] font-bold uppercase tracking-[0.08em] rounded mt-2">
                {s.time}
              </span>
              <h3 className="text-[18px] font-semibold tracking-[-0.015em] mt-auto mb-2 leading-[1.2]">
                {s.t}
              </h3>
              <p className="text-[13.5px] leading-[1.55] text-ink-soft">{s.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FAQ · how it works
   ============================================ */
import { FaqAccordionV3 } from "./FaqAccordionV3";

export function HowItWorksFaqV3({ locale = "en" as Locale }) {
  const itemsEn = [
    { q: "How does cookieless tracking work without identifying users?", a: "Sealmetrics does not identify users at all. Each pageview is logged anonymously with channel metadata (referrer, UTM parameters, landing page, country, device class) and aggregated into channel totals on the server. No cookies, no localStorage, no fingerprinting, no cross-visit stitching — counts only, no per-user journeys." },
    { q: "Is Sealmetrics affected by ad blockers?", a: "The collection endpoint can run in first-party mode on your own subdomain. Ad blockers work mostly from lists of known third-party analytics domains (like google-analytics.com), so first-party requests are far less likely to be blocked. The default install loads from t.sealmetrics.com, which a list can target." },
    { q: "How long does setup take?", a: "5 minutes. Add one JavaScript tag to your website — either directly in the HTML or via Google Tag Manager. No consent mode configuration, no cookie banner integration, and no Tag Manager variables to set up." },
    { q: "Do I need to modify my consent banner?", a: "No. Sealmetrics does not require consent under GDPR or ePrivacy because it uses no cookies and collects no personal data. If you already have a consent banner for other tools (like GA4 or advertising pixels), Sealmetrics operates independently of it." },
    { q: "Where is data processed and stored?", a: "All data is processed and stored exclusively on EU servers in Dublin, Ireland. No data transfers outside the EU, no sub-processors in third countries, no reliance on Standard Contractual Clauses or other cross-border transfer mechanisms." },
    { q: "Does Sealmetrics use fingerprinting?", a: "No. Sealmetrics does not use browser fingerprinting, canvas fingerprinting, or any technique that creates a unique identifier from device characteristics. This is a deliberate architectural choice — fingerprinting creates personal data and would require consent." },
    { q: "What happens if I exceed my event limit?", a: "We never block your tracking. At 80% of your event limit you receive an email alert, at 100% a dashboard notification, and at 120% we contact you to discuss upgrading. No data is lost during any overage period." },
  ];
  const itemsEs = [
    { q: "¿Cómo funciona el tracking sin cookies sin identificar al usuario?", a: "Sealmetrics no identifica a los usuarios, en absoluto. Cada pageview se registra de forma anónima con metadatos de canal (referrer, UTM, landing, país, tipo de dispositivo) y se agrega en totales por canal en servidor. Sin cookies, sin localStorage, sin fingerprinting, sin stitching entre visitas — solo conteos, sin journeys por usuario." },
    { q: "¿Afectan los bloqueadores de anuncios a Sealmetrics?", a: "El endpoint de recogida puede funcionar en modo first-party sobre tu propio subdominio. Los bloqueadores trabajan sobre todo con listas de dominios de analítica de terceros conocidos (como google-analytics.com), así que las peticiones first-party tienen muchas menos probabilidades de bloquearse. La instalación por defecto carga desde t.sealmetrics.com, que una lista sí puede incluir." },
    { q: "¿Cuánto tarda la instalación?", a: "5 minutos. Añade un script JavaScript a tu web — directamente en el HTML o vía Google Tag Manager. Sin configurar consent mode, sin integrar banner de cookies, sin variables de Tag Manager." },
    { q: "¿Tengo que modificar mi banner de consentimiento?", a: "No. Sealmetrics no requiere consentimiento bajo RGPD o ePrivacy porque no usa cookies ni recopila datos personales. Si ya tienes un banner para otras herramientas (GA4 o pixels publicitarios), Sealmetrics opera independientemente." },
    { q: "¿Dónde se procesan y almacenan los datos?", a: "Todos los datos se procesan y almacenan exclusivamente en servidores UE en Dublín, Irlanda. Sin transferencias fuera de UE, sin sub-procesadores en terceros países, sin dependencia de Cláusulas Contractuales Tipo." },
    { q: "¿Usa Sealmetrics fingerprinting?", a: "No. Sealmetrics no usa fingerprinting de navegador, canvas fingerprinting ni ninguna técnica que cree un identificador único a partir de características del dispositivo. Es una decisión arquitectónica — el fingerprinting crea dato personal y requeriría consentimiento." },
    { q: "¿Qué pasa si supero mi límite de eventos?", a: "Nunca bloqueamos tu tracking. Al 80% del límite recibes un email, al 100% una notificación en dashboard, y al 120% te contactamos para hablar de upgrade. Ningún dato se pierde durante el exceso." },
  ];
  const items = locale === "es" ? itemsEs : itemsEn;

  return (
    <FaqAccordionV3
      locale={locale}
      items={items}
      eyebrow="FAQ"
      titleEn={
        <>
          The technical <em>objections</em>, answered.
        </>
      }
      titleEs={
        <>
          Las objeciones <em>técnicas</em>, respondidas.
        </>
      }
      ledeEn="Questions we get from CTOs, DPOs and security teams evaluating Sealmetrics."
      ledeEs="Preguntas que nos llegan de CTOs, DPOs y equipos de seguridad evaluando Sealmetrics."
    />
  );
}
