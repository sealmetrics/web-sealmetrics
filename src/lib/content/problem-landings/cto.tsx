import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /for/cto — the role page for engineering and technical leadership.
 *
 * Facts from docs.sealmetrics.com (checked 15 Sep 2026):
 * - implementation/tracker/installation: one script tag with `defer`
 * - implementation/tracker/spa-support: History API routers tracked with no
 *   configuration; hash routers are not auto-detected; `?auto=0` suppresses only
 *   the initial pageview, `?auto=0&spa=0` gives full manual control; content
 *   group set at script load with `group=`
 * - implementation/tracker/first-party: subdomain via an A record, then email
 *   hello@ and the team completes the server side; do not run both snippets
 * - ecommerce-setup-guide: `sealmetrics.conv('purchase', amount, {...items})`
 *   and `sealmetrics.micro(...)`
 * - security-privacy/what-we-track and data-location: no cookies or device
 *   storage, no persisted IP, session marker in memory ~2 h, event-level rows
 *   1 day, hourly aggregates 90 days, daily aggregates and conversions 24
 *   months, Dublin only
 * - api/api-tokens: read-only tokens; api/rate-limits: limits per plan
 * - compare pages: managed cloud only (no self-hosting)
 * - PricingSignal.tsx: REST API, MCP and BigQuery on every plan; webhooks and
 *   audit logs from Scale; isolated processing on Enterprise; data typically
 *   in reports in under 2 minutes
 * - MCP endpoint and Claude Code command from src/lib/content/mcp-setup.ts
 * Tracker weight: measurement of 27 Aug 2026 (t.js 1,126 B gzip / 1,991 B
 * uncompressed; gtag.js 148,679 B gzip → 132×), published in
 * /blog/we-measured-every-analytics-script.
 *
 * Removed from the old version: "no measurable CLS or LCP impact" and
 * "typically improves Core Web Vitals" (no published test), "we do what
 * server-side GTM tries to do", "every event exported, no sampling ever",
 * "REST API from the Growth plan" (it is on every plan), "0 maintenance",
 * and the categorical GDPR FAQ.
 */

export const CTO_PUBLISHED = "2026-03-01";
export const CTO_PUBLISHED_ES = "2026-04-18";
export const CTO_MODIFIED = "2026-09-15";

const link = "sig-problem-inline";

const SNIPPET = `<script src="https://t.sealmetrics.com/t.js?id=YOUR_ACCOUNT_ID" defer></script>`;
const SPA_MANUAL = `<script src="https://t.sealmetrics.com/t.js?id=YOUR_ACCOUNT_ID&auto=0&spa=0" defer></script>

<script>
  // fire each pageview yourself, with its content group
  sealmetrics({ group: 'home' });
</script>`;
const CONVERSION = `sealmetrics.micro('add_to_cart', {
  product_id: 'SKU-123',
  price: '89.99',
  quantity: '1'
});

sealmetrics.conv('purchase', 149.99, {
  currency: 'EUR',
  items: [
    { product_name: 'Blue Running Shoes', price: 89.99, quantity: 1, category: 'footwear' }
  ]
});`;
const MCP = `claude mcp add --transport http sealmetrics https://mcp.sealmetrics.com/mcp`;

export const ctoEn: ProblemLandingContent = {
  route: "/for/cto",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "For teams", href: "/for/" },
    { label: "CTOs" },
  ],
  eyebrow: "Role · CTO and engineering",
  h1: <>Analytics your stack<br />barely notices.<br /><em>~1.1 KB on the wire.</em></>,
  heroBody:
    "GA4's script weighs around 149 KB, needs consent wiring through a banner and a tag manager, and marketing still asks engineering why the numbers do not match. Sealmetrics is one deferred script of about 1.1 KB that sets no cookies and writes nothing to the device, tracks single-page app routes out of the box, and exposes the same data through a REST API, an MCP server and a BigQuery connector on every plan.",
  heroPrimary: { label: "See the implementation", href: "#method" },
  heroSecondary: { label: "Read the tracker measurement", href: "/blog/we-measured-every-analytics-script/" },
  heroMicro: "One script tag · no device storage · SPA routes automatic · API, MCP and BigQuery on every plan · Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: CTO_MODIFIED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "Tracker weight · measured 27 Aug 2026",
    status: "gzip on the wire",
    rows: [
      ["Sealmetrics t.js", "1.1 KB · 1,991 B uncompressed"],
      ["GA4 gtag.js", "~149 KB · 132× heavier"],
      ["Device storage", "None"],
      ["Install", "5–30 min by platform"],
    ],
    foot: "One GET per script with Accept-Encoding: gzip · method in the published measurement",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Web analytics from an engineering point of view is a script on every page,
      a data flow to govern and an API the rest of the company will ask for. GA4
      ships around 149 KB of JavaScript on the wire, sets cookies that a consent
      banner and tag manager must gate, and exports to BigQuery with daily limits
      on standard properties. Sealmetrics loads one deferred script of about 1.1
      KB, 132 times lighter in the measurement of 27 August 2026. It writes no
      cookie or other device storage and keeps no IP address; a session marker
      lives in memory for about two hours. History API routers in React, Vue,
      Angular or Next.js are tracked without configuration. The data is available
      through a REST API with read-only tokens, a hosted MCP server and a
      BigQuery connector, all on every plan. It is a managed service in Dublin:
      there is no self-hosted version.
    </p>
  ),

  divergence: {
    tag: "What engineering ends up owning",
    title: <>Analytics is a dependency.<br /><em>Treat it like one.</em></>,
    body: "The questions below are the ones an engineering lead answers for any analytics vendor. The difference is how much of the answer lands on your team.",
    headers: ["What you own", "With GA4, a tag manager and Consent Mode", "With Sealmetrics", "Where to verify"],
    rows: [
      ["Script weight", "About 149 KB of gtag.js on the wire, before the tag manager container", "About 1.1 KB, deferred", "Tracker measurement, 27 Aug 2026"],
      ["Consent plumbing", "Tags gated by the banner; Consent Mode states to configure and keep in step", "No cookie or device storage to gate for the analytics tag itself", "Docs: what we track"],
      ["Single-page apps", "Page changes configured in GA4 or the tag manager", "History API navigation tracked by default; manual mode with auto=0 and spa=0", "Docs: SPA support"],
      ["Ad-blocker exposure", "Loaded from Google's domains, which block lists include", "Default t.sealmetrics.com, or a subdomain of your own domain", "Docs: first-party tracker"],
      ["Data access", "BigQuery export with a daily event limit on standard properties", "REST API, MCP server and BigQuery connector on every plan", "Integrations pages"],
      ["Retention", "Setting per property", "Fixed TTLs: event rows 1 day, hourly 90 days, daily and conversions 24 months", "Docs: data location and retention"],
    ],
    note: (
      <>
        The weight comparison is a dated measurement, re-run on 27 August 2026 and
        published with its method in{" "}
        <Link className={link} href="/blog/we-measured-every-analytics-script/">we measured every analytics script</Link>.
        What the architecture stores, and why no identifier survives the session,
        is covered in{" "}
        <Link className={link} href="/security/">security</Link> and the{" "}
        <Link className={link} href="/glossary/first-party-data-collection/">first-party data collection</Link> glossary entry.
      </>
    ),
  },

  costs: {
    tag: "What a heavy analytics stack costs",
    title: <>The cost is not the licence.<br /><em>It is the upkeep.</em></>,
    body: "Engineering rarely chooses the analytics tool, but it carries it. Three costs show up in every team.",
    items: [
      ["01", "Weight on every page view", "The analytics script loads on every page of the site. At about 149 KB against about 1.1 KB, the difference is paid by every visitor on every navigation."],
      ["02", "Consent wiring that never ends", "Each new tag reopens the banner configuration, the tag manager triggers and the Consent Mode states. Keeping them in step is engineering work that ships no feature."],
      ["03", "Debugging numbers that do not match", (
        <>
          When marketing asks why analytics disagrees with the store, the answer
          often is visitors the tag never recorded. On a Shopify store measured
          side by side for 48 days, GA4 did not record 29% of visits — the case
          set out on{" "}
          <Link className={link} href="/complete-data/">complete data</Link>.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "The implementation",
    title: <>One tag,<br /><em>then decide the details.</em></>,
    body: (
      <>
        The steps below cover a custom stack. Stores on Shopify, WooCommerce or
        Magento use the native integrations listed on{" "}
        <Link className={link} href="/platforms/">platforms</Link>; install takes
        5 to 30 minutes depending on the platform.
      </>
    ),
    howToName: "How to implement Sealmetrics on a custom web stack",
    howToDescription:
      "Five steps for an engineering team: install the script, choose default or first-party loading, handle single-page app routes, send conversions and connect the data.",
    steps: [
      { name: "Add the script tag", text: "Place the tracker once in the head of every page, with defer. It fires the first pageview on load and writes no cookie, localStorage or sessionStorage entry." },
      { name: "Decide on first-party loading", text: "To reduce ad-blocker loss, create the subdomain shown in the dashboard with an A record, email the team, and switch to the snippet served from your subdomain once they confirm. Do not run both snippets, or pageviews are counted twice." },
      { name: "Handle single-page app routes", text: "Routers built on the History API are tracked automatically. Hash-based routers are not. For a content group per route, load the script with auto=0 and spa=0 and fire each pageview yourself." },
      { name: "Send conversions and microconversions", text: "Call sealmetrics.conv for purchases or leads with their value, and sealmetrics.micro for steps such as add to cart. Keep names, emails and other personal data out of properties." },
      { name: "Connect the data", text: "Give analysts a read-only API token, connect AI assistants to the hosted MCP endpoint, and set up the BigQuery connector for the warehouse. Webhooks and audit logs are available from the Scale plan." },
    ],
  },

  examples: {
    tag: "Code, as documented",
    title: <>Four snippets<br /><em>cover most stacks.</em></>,
    body: (
      <>
        Copied from docs.sealmetrics.com. Replace YOUR_ACCOUNT_ID with the site ID
        from the dashboard; the full reference is in the{" "}
        <Link className={link} href="/docs/mcp/">MCP reference</Link> and the tracker documentation.
      </>
    ),
    items: [
      { name: "Standard install", description: "Once, in the head of every page.", code: SNIPPET },
      { name: "Manual pageviews for a single-page app", description: "Both flags are needed to fire every pageview yourself with its content group.", code: SPA_MANUAL },
      { name: "Microconversion and purchase", description: "Items are optional on the purchase and feed product reports by channel.", code: CONVERSION },
      { name: "Connect Claude Code to the MCP server", description: "Hosted endpoint; the assistant authorises with the user's own Sealmetrics account.", code: MCP },
    ],
  },

  roles: {
    tag: "Who touches it",
    title: <>One dataset,<br /><em>four engineering jobs.</em></>,
    body: "Each role reaches the same data through the interface it already works with.",
    items: [
      { role: "CTO / engineering lead", need: "A vendor that adds little weight and little upkeep.", how: "One deferred script, no device storage to govern, fixed retention and a managed service in Dublin.", link: { label: "Security overview", href: "/security/" } },
      { role: "Frontend developer", need: "Correct pageviews in a single-page app without router code.", how: "History API tracking by default, manual mode with auto=0 and spa=0, content groups at load.", link: { label: "Platforms and stacks", href: "/platforms/" } },
      { role: "Data engineer", need: "Analytics data in the warehouse without a sampled export.", how: "A BigQuery connector with a star schema, hourly or daily sync, included on every plan.", link: { label: "BigQuery connector", href: "/integrations/bigquery/" } },
      { role: "AI and internal tools", need: "Assistants that answer from real data, not from a guess.", how: "A hosted MCP endpoint with more than 40 read-only tools, authorised per user.", link: { label: "MCP reference", href: "/docs/mcp/" } },
    ],
  },

  proof: {
    tag: "Measured, with the method published",
    body: "Two measurements engineering can check: a dated weight comparison of analytics scripts, re-run on 27 August 2026, and a 48-day side-by-side run on a Shopify store reconciled with its real orders.",
    figures: [
      { value: "132×", label: "heavier: GA4's gtag.js against Sealmetrics' t.js, gzip on the wire", client: "Tracker measurement", href: "/blog/we-measured-every-analytics-script/" },
      { value: "29%", label: "of visits GA4 did not record over 48 days on the same store", client: "Incapto", href: "/case-studies/incapto/" },
      { value: "96%", label: "of the store's real orders recorded over the same 48 days", client: "Incapto", href: "/case-studies/incapto/" },
    ],
    readCase: "Open",
  },

  limits: {
    tag: "What it does not do",
    title: <>A light tag<br /><em>with clear boundaries.</em></>,
    body: (
      <>
        These limits are architectural. Attribution is{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last click</Link>{" "}
        within each session.
      </>
    ),
    items: [
      ["No self-hosted version", "Sealmetrics is a managed service. Analytics data is processed and stored in Dublin, Ireland; isolated processing is available on Enterprise."],
      ["No user-level data to export", "Event-level rows are purged after 1 day. What you query and export are aggregates and conversions, kept for 24 months."],
      ["Hash routers need manual pageviews", "Routers based on /#/ paths are not detected automatically. Fire the pageviews yourself in manual mode."],
      ["First-party loading needs a team step", "After the DNS record, the Sealmetrics team completes the server side before you switch snippets."],
      ["API tokens read only", "Configuration changes happen in the dashboard, not through API tokens or the hosted MCP endpoint."],
      ["Webhooks and audit logs from Scale", "The REST API, MCP server and BigQuery connector are on every plan; webhooks and audit logs start on Scale."],
    ],
  },

  faqTag: "Questions engineering asks",
  faqTitle: <>Before you add<br /><em>another script tag.</em></>,
  faq: [
    { question: "How much does the Sealmetrics tracker weigh?", answer: "About 1.1 KB gzip on the wire and 1,991 bytes uncompressed for the full t.js, in the measurement of 27 August 2026. GA4's gtag.js measured about 149 KB on the wire the same day, 132 times heavier. The script loads with defer." },
    { question: "Does Sealmetrics work with React, Vue, Angular or Next.js single-page apps?", answer: "Yes. Any router built on the History API is tracked automatically: pushState, replaceState and back or forward navigation each fire a pageview, and duplicates of the same URL are skipped. Hash-based routers are not detected automatically; use manual mode with auto=0 and spa=0." },
    { question: "Can we serve the tracker from our own domain?", answer: "Yes. Create the subdomain shown in the dashboard with an A record, email the team to complete the server side, then replace the default snippet with the one served from your subdomain. Requests from your own domain are far less likely to be blocked by ad blockers than those to t.sealmetrics.com." },
    { question: "Does Sealmetrics use cookies, local storage or fingerprinting?", answer: "No. The tracker writes nothing to the device and does not fingerprint. A short-lived session marker, derived per site and kept in memory for about two hours, groups the hits of one visit; it is not stored in the browser and cannot recognise a returning visitor." },
    { question: "Which APIs are available, and on which plans?", answer: "The REST API with read-only tokens, the hosted MCP server and the BigQuery connector are included on every plan, the free Agentic tier among them. Webhooks and audit logs are available from Scale, and isolated processing on Enterprise. Rate limits depend on the plan." },
    { question: "Can we self-host Sealmetrics?", answer: "No. Sealmetrics runs as a managed service, with analytics data processed and stored in Dublin, Ireland. Enterprise plans add isolated processing." },
    { question: "Can it run alongside GA4 and our tag manager?", answer: "Yes. The tracker can be added directly in the HTML or through Google Tag Manager, and it runs next to GA4 without changing its setup. Most teams run both over a full commercial cycle before deciding which one reports to the business." },
  ],

  final: {
    tag: "Technical walkthrough",
    title: <>Bring your stack.<br /><em>We walk through the implementation.</em></>,
    body: "Thirty minutes on your own architecture: the script, single-page app routing, first-party loading, the API and the BigQuery schema.",
    primary: { label: "Book a technical walkthrough", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const ctoEs: ProblemLandingContent = {
  route: "/for/cto",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Por equipo", href: "/es/for/" },
    { label: "CTOs" },
  ],
  eyebrow: "Rol · CTO e ingeniería",
  h1: <>Analítica que tu stack<br />casi no nota.<br /><em>~1,1 KB en red.</em></>,
  heroBody:
    "El script de GA4 pesa unos 149 KB, necesita cablear el consentimiento con un banner y un gestor de etiquetas, y marketing sigue preguntando a ingeniería por qué no cuadran las cifras. Sealmetrics es un único script diferido de alrededor de 1,1 KB que no instala cookies ni escribe nada en el dispositivo, sigue las rutas de las aplicaciones de una sola página sin configurar nada y expone los mismos datos con una API REST, un servidor MCP y un conector de BigQuery en todos los planes.",
  heroPrimary: { label: "Ver la implementación", href: "#method" },
  heroSecondary: { label: "Leer la medición de trackers", href: "/es/blog/best-web-analytics-tool/" },
  heroMicro: "Un script · sin almacenamiento en el dispositivo · rutas SPA automáticas · API, MCP y BigQuery en todos los planes · Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Actualizado",
    date: CTO_MODIFIED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Peso del tracker · medido el 27 ago 2026",
    status: "gzip en red",
    rows: [
      ["Sealmetrics t.js", "1,1 KB · 1.991 B sin comprimir"],
      ["GA4 gtag.js", "~149 KB · 132 veces más"],
      ["Almacenamiento en el dispositivo", "Ninguno"],
      ["Instalación", "5–30 min según plataforma"],
    ],
    foot: "Una petición GET por script con Accept-Encoding: gzip · método en la medición publicada",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      La analítica web, vista desde ingeniería, es un script en cada página, un
      flujo de datos que gobernar y una API que el resto de la empresa va a
      pedir. GA4 envía unos 149 KB de JavaScript en red, instala cookies que un
      banner y un gestor de etiquetas tienen que condicionar, y exporta a
      BigQuery con límites diarios en las propiedades estándar. Sealmetrics carga
      un único script diferido de alrededor de 1,1 KB, 132 veces más ligero en la
      medición del 27 de agosto de 2026. No escribe cookies ni ningún otro
      almacenamiento en el dispositivo y no guarda direcciones IP; un marcador de
      sesión vive en memoria unas dos horas. Los routers basados en la History API
      de React, Vue, Angular o Next.js se siguen sin configuración. Los datos
      están disponibles con una API REST de tokens de solo lectura, un servidor
      MCP alojado y un conector de BigQuery, en todos los planes. Es un servicio
      gestionado en Dublín: no hay versión autoalojada.
    </p>
  ),

  divergence: {
    tag: "Lo que acaba siendo de ingeniería",
    title: <>La analítica es una dependencia.<br /><em>Trátala como tal.</em></>,
    body: "Estas son las preguntas que un responsable de ingeniería responde con cualquier proveedor de analítica. La diferencia es cuánto de la respuesta cae en tu equipo.",
    headers: ["De qué te encargas", "Con GA4, un gestor de etiquetas y Consent Mode", "Con Sealmetrics", "Dónde comprobarlo"],
    rows: [
      ["Peso del script", "Unos 149 KB de gtag.js en red, antes del contenedor del gestor de etiquetas", "Alrededor de 1,1 KB, diferido", "Medición de trackers, 27 ago 2026"],
      ["Cableado del consentimiento", "Etiquetas condicionadas por el banner; estados de Consent Mode que configurar y mantener", "Ninguna cookie ni almacenamiento que condicionar para la propia etiqueta de analítica", "Documentación: qué registramos"],
      ["Aplicaciones de una sola página", "Cambios de página configurados en GA4 o en el gestor de etiquetas", "Navegación por History API seguida por defecto; modo manual con auto=0 y spa=0", "Documentación: soporte SPA"],
      ["Exposición a bloqueadores", "Se carga desde dominios de Google, que las listas incluyen", "t.sealmetrics.com por defecto, o un subdominio de tu propio dominio", "Documentación: tracker first-party"],
      ["Acceso a los datos", "Exportación a BigQuery con límite diario de eventos en propiedades estándar", "API REST, servidor MCP y conector de BigQuery en todos los planes", "Páginas de integraciones"],
      ["Conservación", "Ajuste por propiedad", "TTL fijos: filas de evento 1 día, por horas 90 días, diarios y conversiones 24 meses", "Documentación: ubicación y conservación"],
    ],
    note: (
      <>
        La comparación de peso es una medición fechada, repetida el 27 de agosto de
        2026 y publicada con su método, que resume{" "}
        <Link className={link} href="/es/blog/best-web-analytics-tool/">la mejor herramienta de analítica web</Link>.
        Qué guarda la arquitectura, y por qué ningún identificador sobrevive a la
        sesión, se explica en{" "}
        <Link className={link} href="/es/security/">seguridad</Link> y en la entrada del glosario sobre{" "}
        <Link className={link} href="/es/glossary/first-party-data-collection/">recogida de datos first-party</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que cuesta una analítica pesada",
    title: <>El coste no es la licencia.<br /><em>Es el mantenimiento.</em></>,
    body: "Ingeniería rara vez elige la herramienta de analítica, pero es quien la sostiene. Hay tres costes que aparecen en cualquier equipo.",
    items: [
      ["01", "Peso en cada página vista", "El script de analítica se carga en todas las páginas del sitio. Entre unos 149 KB y alrededor de 1,1 KB, la diferencia la paga cada visitante en cada navegación."],
      ["02", "Un cableado del consentimiento que no termina", "Cada etiqueta nueva vuelve a abrir la configuración del banner, los activadores del gestor de etiquetas y los estados de Consent Mode. Mantenerlos al día es trabajo de ingeniería que no entrega ninguna funcionalidad."],
      ["03", "Depurar cifras que no cuadran", (
        <>
          Cuando marketing pregunta por qué la analítica no coincide con la tienda,
          muchas veces la respuesta son visitas que la etiqueta nunca registró. En
          una tienda Shopify medida en paralelo durante 48 días, GA4 no registró el
          29% de las visitas, el caso que se explica en{" "}
          <Link className={link} href="/es/complete-data/">datos completos</Link>.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "La implementación",
    title: <>Una etiqueta,<br /><em>y después los detalles.</em></>,
    body: (
      <>
        Estos pasos cubren un stack propio. Las tiendas en Shopify, WooCommerce o
        Magento usan las integraciones nativas que aparecen en{" "}
        <Link className={link} href="/es/platforms/">plataformas</Link>; la
        instalación lleva entre 5 y 30 minutos según la plataforma.
      </>
    ),
    howToName: "Cómo implementar Sealmetrics en un stack web propio",
    howToDescription:
      "Cinco pasos para un equipo de ingeniería: instalar el script, elegir carga por defecto o first-party, gestionar las rutas de una aplicación de una sola página, enviar conversiones y conectar los datos.",
    steps: [
      { name: "Añade la etiqueta del script", text: "Coloca el tracker una vez en el head de todas las páginas, con defer. Lanza la primera página vista al cargar y no escribe cookies, localStorage ni sessionStorage." },
      { name: "Decide si cargarlo first-party", text: "Para reducir la pérdida por bloqueadores, crea el subdominio que indica el panel con un registro A, escribe al equipo y cambia al snippet servido desde tu subdominio cuando lo confirmen. No mantengas los dos snippets o las páginas vistas se contarán dos veces." },
      { name: "Gestiona las rutas de la aplicación", text: "Los routers basados en la History API se siguen automáticamente; los basados en hash no. Para un grupo de contenido por ruta, carga el script con auto=0 y spa=0 y lanza tú cada página vista." },
      { name: "Envía conversiones y microconversiones", text: "Llama a sealmetrics.conv para compras o leads con su importe y a sealmetrics.micro para pasos como añadir al carrito. No incluyas nombres, emails ni otros datos personales en las propiedades." },
      { name: "Conecta los datos", text: "Da a analistas un token de API de solo lectura, conecta los asistentes de IA al endpoint MCP alojado y configura el conector de BigQuery para el warehouse. Los webhooks y los logs de auditoría están disponibles desde el plan Scale." },
    ],
  },

  examples: {
    tag: "Código, tal como está documentado",
    title: <>Cuatro fragmentos<br /><em>cubren casi cualquier stack.</em></>,
    body: (
      <>
        Copiados de docs.sealmetrics.com. Sustituye YOUR_ACCOUNT_ID por el ID del
        sitio que muestra el panel; la referencia completa está en la{" "}
        <Link className={link} href="/docs/mcp/">referencia del MCP</Link> y en la documentación del tracker.
      </>
    ),
    items: [
      { name: "Instalación estándar", description: "Una vez, en el head de todas las páginas.", code: SNIPPET },
      { name: "Páginas vistas manuales en una aplicación de una sola página", description: "Hacen falta los dos parámetros para lanzar tú cada página vista con su grupo de contenido.", code: SPA_MANUAL },
      { name: "Microconversión y compra", description: "Los artículos de la compra son opcionales y alimentan los informes de producto por canal.", code: CONVERSION },
      { name: "Conectar Claude Code al servidor MCP", description: "Endpoint alojado; el asistente se autoriza con la cuenta de Sealmetrics de cada usuario.", code: MCP },
    ],
  },

  roles: {
    tag: "Quién lo toca",
    title: <>Unos mismos datos,<br /><em>cuatro trabajos de ingeniería.</em></>,
    body: "Cada rol llega a los mismos datos por la interfaz con la que ya trabaja.",
    items: [
      { role: "CTO o responsable de ingeniería", need: "Un proveedor que añada poco peso y poco mantenimiento.", how: "Un script diferido, nada que gobernar en el dispositivo, conservación fija y un servicio gestionado en Dublín.", link: { label: "Seguridad", href: "/es/security/" } },
      { role: "Desarrollo frontend", need: "Páginas vistas correctas en una aplicación de una sola página sin código de router.", how: "Seguimiento por History API por defecto, modo manual con auto=0 y spa=0 y grupos de contenido al cargar.", link: { label: "Plataformas y stacks", href: "/es/platforms/" } },
      { role: "Ingeniería de datos", need: "Datos de analítica en el warehouse sin una exportación muestreada.", how: "Un conector de BigQuery con esquema en estrella y sincronización horaria o diaria, incluido en todos los planes.", link: { label: "Conector de BigQuery", href: "/es/integrations/bigquery/" } },
      { role: "IA y herramientas internas", need: "Asistentes que respondan con datos reales, no con suposiciones.", how: "Un endpoint MCP alojado con más de 40 herramientas de solo lectura, autorizado por usuario.", link: { label: "Biblioteca de prompts MCP", href: "/es/ai-analytics/prompts/" } },
    ],
  },

  proof: {
    tag: "Medido, con el método publicado",
    body: "Dos mediciones que ingeniería puede comprobar: una comparación fechada del peso de los scripts de analítica, repetida el 27 de agosto de 2026, y 48 días de medición en paralelo en una tienda Shopify, conciliada con sus pedidos reales.",
    figures: [
      { value: "132×", label: "más pesado: gtag.js de GA4 frente a t.js de Sealmetrics, gzip en red", client: "Medición de trackers", href: "/es/blog/best-web-analytics-tool/" },
      { value: "29%", label: "de las visitas que GA4 no registró en 48 días en la misma tienda", client: "Incapto", href: "/es/case-studies/incapto/" },
      { value: "96%", label: "de los pedidos reales de la tienda registrados en esos 48 días", client: "Incapto", href: "/es/case-studies/incapto/" },
    ],
    readCase: "Abrir",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Una etiqueta ligera<br /><em>con límites claros.</em></>,
    body: (
      <>
        Estos límites son de arquitectura. La atribución es a último clic dentro de
        cada sesión; los{" "}
        <Link className={link} href="/es/glossary/attribution-model/">modelos de atribución</Link>{" "}
        explican la diferencia.
      </>
    ),
    items: [
      ["No hay versión autoalojada", "Sealmetrics es un servicio gestionado. Los datos de analítica se procesan y guardan en Dublín, Irlanda; el procesamiento aislado está disponible en Enterprise."],
      ["Sin datos por usuario que exportar", "Las filas de evento se eliminan pasado 1 día. Lo que consultas y exportas son agregados y conversiones, que se conservan 24 meses."],
      ["Los routers con hash necesitan páginas vistas manuales", "Las rutas con /#/ no se detectan automáticamente. Lanza las páginas vistas tú mismo en modo manual."],
      ["La carga first-party necesita un paso del equipo", "Después del registro DNS, el equipo de Sealmetrics completa la parte de servidor antes de que cambies de snippet."],
      ["Tokens de API de solo lectura", "Los cambios de configuración se hacen en el panel, no con tokens de API ni con el endpoint MCP alojado."],
      ["Webhooks y logs de auditoría desde Scale", "La API REST, el servidor MCP y el conector de BigQuery están en todos los planes; los webhooks y los logs de auditoría empiezan en Scale."],
    ],
  },

  faqTag: "Lo que pregunta ingeniería",
  faqTitle: <>Antes de añadir<br /><em>otra etiqueta.</em></>,
  faq: [
    { question: "¿Cuánto pesa el tracker de Sealmetrics?", answer: "Alrededor de 1,1 KB gzip en red y 1.991 bytes sin comprimir el t.js completo, en la medición del 27 de agosto de 2026. El gtag.js de GA4 midió unos 149 KB en red ese mismo día, 132 veces más. El script se carga con defer." },
    { question: "¿Funciona Sealmetrics con aplicaciones de una sola página en React, Vue, Angular o Next.js?", answer: "Sí. Cualquier router basado en la History API se sigue automáticamente: pushState, replaceState y la navegación atrás o adelante lanzan una página vista, y se omiten los duplicados de la misma URL. Los routers basados en hash no se detectan automáticamente; usa el modo manual con auto=0 y spa=0." },
    { question: "¿Podemos servir el tracker desde nuestro propio dominio?", answer: "Sí. Crea el subdominio que indica el panel con un registro A, escribe al equipo para que complete la parte de servidor y sustituye el snippet por defecto por el que se sirve desde tu subdominio. Las peticiones desde tu propio dominio tienen muchas menos probabilidades de bloquearse que las que van a t.sealmetrics.com." },
    { question: "¿Usa Sealmetrics cookies, almacenamiento local o fingerprinting?", answer: "No. El tracker no escribe nada en el dispositivo ni hace fingerprinting. Un marcador de sesión de corta duración, derivado por sitio y guardado en memoria unas dos horas, agrupa las visitas de una sesión; no se guarda en el navegador y no reconoce a quien vuelve." },
    { question: "¿Qué APIs hay y en qué planes?", answer: "La API REST con tokens de solo lectura, el servidor MCP alojado y el conector de BigQuery están incluidos en todos los planes, también en el Agentic gratuito. Los webhooks y los logs de auditoría están disponibles desde Scale, y el procesamiento aislado en Enterprise. Los límites de peticiones dependen del plan." },
    { question: "¿Podemos alojar Sealmetrics en nuestros servidores?", answer: "No. Sealmetrics funciona como servicio gestionado, con los datos de analítica procesados y guardados en Dublín, Irlanda. Los planes Enterprise añaden procesamiento aislado." },
    { question: "¿Puede convivir con GA4 y nuestro gestor de etiquetas?", answer: "Sí. El tracker se puede añadir directamente en el HTML o a través de Google Tag Manager, y funciona junto a GA4 sin cambiar su configuración. La mayoría de los equipos usan los dos durante un ciclo comercial completo antes de decidir cuál reporta al negocio." },
  ],

  final: {
    tag: "Revisión técnica",
    title: <>Trae tu stack.<br /><em>Repasamos la implementación.</em></>,
    body: "Treinta minutos sobre tu propia arquitectura: el script, las rutas de la aplicación, la carga first-party, la API y el esquema de BigQuery.",
    primary: { label: "Reservar una revisión técnica", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
