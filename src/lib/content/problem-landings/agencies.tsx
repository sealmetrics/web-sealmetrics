import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /for/agencies — Phase 5 of CONTENT-PLAN-PROBLEM-POSITIONING.md (vertical engine).
 *
 * An agency arrives with problem C seen from the other side of the table: it
 * runs the campaigns, writes the report from the platforms it runs, and the
 * client doubts the number. The page answers with a neutral layer the client
 * owns and the agency operates.
 *
 * Product facts from docs.sealmetrics.com (checked 15 Sep 2026):
 * - organizations: sites belong to exactly one organization; members can belong
 *   to several ("an agency working with several clients"); organization
 *   switcher in the sidebar; roles Owner (all sites, members, billing), Admin
 *   (all sites, members except owners, no billing), Member (assigned sites
 *   only); invitations only as Admin or Member, promotion to Owner by an Owner
 *   (platform/organizations)
 * - channel grouping: custom rules per site, drafts → test → publish, CSV
 *   export of custom rules and replace-all atomic import, 100 rules per site,
 *   rules apply at ingest to future traffic only
 *   (platform/settings/tracking/channel-grouping)
 * - API tokens are read-only, with scoped permissions, optional account
 *   restrictions and expiry (api/api-tokens)
 * - MCP server: each tool call targets one site; list_sites returns the sites
 *   the key can access (integrations/mcp-server)
 * - BigQuery connector included on every plan, Agentic included (founder,
 *   15 Sep 2026)
 * - Sealmetrics does not send conversions to ad platforms and does not import
 *   spend; attribution is last click per session
 *
 * Deliberately NOT on this page until confirmed by the founder: reseller
 * agreements or margins, white-label, and onboarding times ("15 minutes").
 * The previous VerticalPageV3 version claimed all three.
 *
 * Partners: Product Hackers, 3dids and Ayesa (CLAUDE.md), described as in
 * /open. Figures: Palladium, Dreamplace and Incapto as published in
 * src/lib/content/case-studies.tsx. No new client names.
 */

export const AGENCIES_PUBLISHED = "2026-03-02";
export const AGENCIES_PUBLISHED_ES = "2026-04-18";
export const AGENCIES_MODIFIED = "2026-09-15";

const link = "sig-problem-inline";

export const agenciesEn: ProblemLandingContent = {
  route: "/for/agencies",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "For teams", href: "/for/" },
    { label: "Agencies" },
  ],
  eyebrow: "Audience · Marketing agencies",
  h1: <>You run the campaigns.<br />You write the report.<br /><em>Who checks it?</em></>,
  heroBody:
    "Your results come from the platforms you run and the client's GA4, and the client knows both have a stake in the answer. Sealmetrics gives agency and client one measured layer, without consent loss and checked against the client's orders. The client owns the organization; your team works inside it with one login across every client.",
  heroPrimary: { label: "See the client setup", href: "#method" },
  heroSecondary: { label: "Read the Palladium case", href: "/case-studies/palladium-hotel-group/" },
  heroMicro: "One organization per client · one login across clients · last click per session · EU-hosted in Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: AGENCIES_MODIFIED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "One agency login · client organizations",
    status: "Switcher on",
    rows: [
      ["Client organization 1", "Client is Owner · agency is Admin"],
      ["Client organization 2", "Agency is Member · 2 assigned sites"],
      ["Billing", "Stays with each Owner"],
      ["API token", "Read-only · scoped · expires"],
    ],
    foot: "Sites belong to one client · people can belong to many · clients see only their own",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Analytics for marketing agencies is a measurement layer the agency and its
      client both accept, because neither of them produced it and no ad platform
      grades its own work in it. Agency reporting usually rests on Meta and
      Google Ads, which credit conversions to their own ads, and on the
      client&apos;s GA4, which does not record visitors who reject the banner.
      Sealmetrics counts visits without cookies and credits revenue to the last
      click of each session, read from the UTMs of the landing page. Each client
      is its own organization, with its own sites, members and billing. One
      agency login can belong to all of them and switch between clients from the
      sidebar, and Member access is limited to the sites assigned. Client
      dashboards read the same data through the BigQuery connector, the REST API
      or the MCP server. It does not send conversions to ad platforms, import
      spend or model multi-touch attribution.
    </p>
  ),

  divergence: {
    tag: "Why clients doubt the report",
    title: <>Every source has a stake.<br /><em>Including yours.</em></>,
    body: "An agency report stitches together figures that were each produced by someone with an interest in them. The client does not need to suspect bad faith to discount the result; the structure is enough.",
    headers: ["Source in the report", "What it counts", "Why the client discounts it", "What settles it"],
    rows: [
      ["Meta Ads Manager", "Conversions Meta credits to its own ads", "Its own attribution window; view-through and modelled conversions, depending on settings", "Revenue measured on the client's site, by campaign"],
      ["Google Ads", "Conversions Google credits to its own ads", "Can claim the same sale Meta claims; modelled conversions where consent is missing", "The same measured revenue, same UTMs, same days"],
      ["Client GA4", "Sessions from visitors who accepted the banner", "Consent loss is uneven: paid traffic loses more than direct, so the agency's channels look smaller", "A count that does not wait for the banner"],
      ["Agency dashboard", "Whatever the platform connectors return", "Built by the party being evaluated", "A dataset the client owns and can query"],
      ["Client order system or CRM", "Orders that were placed", "Accurate total, no dependable channel", "The reconciliation point for everything above"],
    ],
    note: (
      <>
        The gap is measurable. At{" "}
        <Link className={link} href="/case-studies/incapto/">Incapto</Link>,
        Sealmetrics recorded 11% more direct traffic than GA4 but between 37% and
        52% more from paid campaigns: the traffic an agency is judged on was
        understated several times more than direct. At{" "}
        <Link className={link} href="/case-studies/palladium-hotel-group/">Palladium Hotel Group</Link>,
        40% of inbound traffic had no source or medium. Why consent-based tools
        lose that traffic is covered under{" "}
        <Link className={link} href="/glossary/consent-mode-v2/">Consent Mode v2</Link>.
      </>
    ),
  },

  costs: {
    tag: "What the doubt costs an agency",
    title: <>The review is about the data.<br /><em>Not about the work.</em></>,
    body: "When the client does not trust the source, three things happen to the agency, and none of them is about performance.",
    items: [
      ["01", "Quarterly reviews spent defending numbers", "The meeting that should decide next quarter's plan opens with a reconciliation. Brand, finance and the agency arrive with different figures, and the one with the least stake wins by default."],
      ["02", "Paid work credited below what it delivered", "At Incapto, GA4 showed paid campaigns as 50% of traffic; measured without consent loss they were 62%. An agency judged on the consent-based figure is judged on twelve points less than it drove."],
      ["03", "No fair comparison between partners", "Clients that run several agencies or partners cannot compare them when each reports its own platform. Palladium Hotel Group rebuilt its Display model on a neutral base before rebalancing partners, placements and audiences."],
    ],
  },

  method: {
    id: "method",
    tag: "Setting up a client",
    title: <>The client owns it.<br /><em>The agency operates it.</em></>,
    body: (
      <>
        The neutral layer only works if the client does not have to take the
        agency&apos;s word for its configuration. These steps keep ownership with
        the client and the operating work with you. The reasoning behind a shared
        reference is on{" "}
        <Link className={link} href="/use-cases/single-source-of-truth/">single source of truth</Link>.
      </>
    ),
    howToName: "How an agency sets up a neutral measurement layer for a client",
    howToDescription:
      "Five steps for an agency to give a client one measured reference: client-owned organization, tagged campaigns, shared channel rules, reconciliation with orders and reporting from the same dataset.",
    steps: [
      { name: "Let the client own the organization", text: "The client creates its Sealmetrics organization and stays Owner, with billing and member control. It invites the agency as Admin, with access to every site, or as Member, limited to the sites it assigns. Each agency person keeps one login across all client organizations." },
      { name: "Add the client's sites and install the tracker", text: "Create one site per domain inside the client's organization, with its own timezone and currency, and install the tracker and the purchase or lead conversion on each. Subdomains of the same domain stay on the same site." },
      { name: "Tag every paid link and agree the channel rules", text: "Put UTMs on every paid link: an account-level tracking template in Google Ads and URL parameters in Meta. Define custom channel rules as drafts, test real source, medium and campaign values, then publish. Export the rules as CSV and import them into the next client's site to reuse the same taxonomy." },
      { name: "Reconcile with the client's orders before the first report", text: "Run Sealmetrics next to the current analytics over a full commercial cycle and compare the measured total with the client's own order system or CRM for the same period and currency. At Incapto, Sealmetrics recorded 96% of real orders and 97% of revenue over 48 days." },
      { name: "Report from the dataset the client owns", text: "Keep the ad platforms for bidding. Build the client report on measured revenue by channel and campaign, through Data Studio on the BigQuery connector, the REST API with a read-only token, or an AI assistant connected to the MCP server." },
    ],
  },

  roles: {
    tag: "Who uses it at the agency",
    title: <>One dataset,<br /><em>four desks.</em></>,
    body: "Agency teams keep their platform tools. What changes is the figure the client report and the budget recommendation stand on.",
    items: [
      { role: "Account lead", need: "Walk into the quarterly review with a number the client does not dispute.", how: "Channel revenue measured without consent loss and reconciled with the client's orders before it reaches the deck.", link: { label: "Single source of truth", href: "/use-cases/single-source-of-truth/" } },
      { role: "Paid media specialist", need: "Show what each campaign sold, outside the platform's own report.", how: "Revenue by campaign and creative from the UTMs of the landing page, joined with the platform's spend.", link: { label: "Google Ads tracking", href: "/integrations/google-ads/" } },
      { role: "Data and BI", need: "Build client dashboards on data the client can audit.", how: "The BigQuery connector, included on every plan, feeds Data Studio or any BI tool from a star schema in the client's project.", link: { label: "BigQuery connector", href: "/integrations/bigquery/" } },
      { role: "Client CMO", need: "Judge the agency on a figure neither side produced.", how: "The client owns the organization and billing, sees the same dataset and controls who has access.", link: { label: "Analytics for CMOs", href: "/for/cmo/" } },
    ],
  },

  proof: {
    tag: "Measured in practice",
    quote: {
      text: "Today every player is happy. The data is neutral, there's no black box, and everyone has accepted these numbers as the reference.",
      cite: "Toni Andújar · Digital & Direct Sales Director · Palladium Hotel Group",
      person: "Toni Andújar",
      role: "Digital & Direct Sales Director, Palladium Hotel Group",
    },
    body: "Palladium Hotel Group uses Sealmetrics as the reference its brand, departments and agencies accept. The agencies still optimise inside their platforms; the results are judged in one place.",
    figures: [
      { value: "+165%", label: "Display Cost-per-Search after rebalancing partners on the neutral model", client: "Palladium Hotel Group", href: "/case-studies/palladium-hotel-group/" },
      { value: "15–20%", label: "more sales attributed, checked against the CRM total", client: "Dreamplace Hotels", href: "/case-studies/dreamplace-hotels/" },
      { value: "+37–52%", label: "more paid-campaign traffic recorded than GA4 in a 48-day parallel run", client: "Incapto", href: "/case-studies/incapto/" },
    ],
    readCase: "Read the case",
  },

  limits: {
    tag: "What it does not do",
    title: <>A neutral layer<br /><em>is not an ad platform.</em></>,
    body: (
      <>
        Agencies recommend more confidently when the edges are clear.
        Attribution is{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last click</Link>{" "}
        within each session, by design.
      </>
    ),
    items: [
      ["It does not feed bidding", "Sealmetrics sends no conversions to Google Ads or Meta. The platforms keep their own pixel and consent setup for optimisation."],
      ["It does not import spend", "Cost comes from each ad platform and is joined to measured revenue in a spreadsheet, in BigQuery or by an AI assistant."],
      ["One client at a time in the dashboard", "Clients are separate organizations and you switch between them. A view that combines several clients is built in BigQuery or through the API."],
      ["Access follows the client's decision", "The Owner controls billing and members. An Admin cannot remove an Owner, and a Member sees only the sites assigned."],
      ["No audiences or user-level data", "Data is aggregate, with no visitor identifiers, so it cannot build remarketing lists or follow a person across sessions."],
      ["Last click per session, nothing more", "No multi-touch model and no view-through. Upper-funnel campaigns need a holdout or geographic test before they are cut."],
    ],
  },

  faqTag: "Questions agencies ask",
  faqTitle: <>Before you propose it<br /><em>to a client.</em></>,
  faq: [
    { question: "Can an agency manage several clients from one Sealmetrics login?", answer: "Yes. Each client is its own organization with its own sites, members and billing, and one person can be a member of several organizations. When they are, an organization switcher appears in the sidebar. Each client sees only its own organization." },
    { question: "Who should own the Sealmetrics account, the agency or the client?", answer: "The client, if the point is a reference the client trusts. The Owner controls billing and members; the agency joins as Admin, with access to every site but no billing, or as Member, limited to the sites the client assigns. Invitations are sent as Admin or Member, and only an existing Owner can promote someone to Owner." },
    { question: "Will the ad platforms still report their own conversions?", answer: "Yes. Sealmetrics does not send conversions to Meta or Google Ads, so the platforms keep reporting and optimising on their own data. The agency uses them for bidding and the measured revenue for the client report and the budget recommendation." },
    { question: "How do we build client dashboards in Data Studio?", answer: "Connect Data Studio to the client's BigQuery dataset, which the Sealmetrics connector fills with star-schema tables for traffic, conversions, pages and landing pages, hourly or daily. The connector is included on every plan. The REST API is the alternative for other BI tools." },
    { question: "Can we reuse the same channel rules across clients?", answer: "Yes. Custom channel rules are defined per site. Export them as CSV from one site and import the file into another; the import replaces that site's custom rules atomically, with up to 100 rules per site. Rules apply to traffic received after they go live." },
    { question: "Can our AI assistants query client analytics?", answer: "Yes, through the Sealmetrics MCP server. Each query targets one site, and the assistant can list the sites its key can access. API tokens are read-only, with scoped permissions and an expiry date." },
    { question: "Which agencies already work with Sealmetrics?", answer: "Product Hackers, for growth-led implementations with cross-channel attribution and CRO; 3dids, for technical implementations of tag management, data layers and consent platform migrations; and Ayesa, for enterprise transformations across several business units." },
  ],

  final: {
    tag: "Agency walkthrough",
    title: <>Bring one client.<br /><em>We bring the neutral layer.</em></>,
    body: "Thirty minutes: we look at one client's platform reports, analytics and order total together, and show how the organization, channel rules and reconciliation would be set up.",
    primary: { label: "Book an agency walkthrough", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const agenciesEs: ProblemLandingContent = {
  route: "/for/agencies",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Por equipo", href: "/es/for/" },
    { label: "Agencias" },
  ],
  eyebrow: "Perfil · Agencias de marketing",
  h1: <>Tú llevas las campañas.<br />Tú haces el informe.<br /><em>¿Quién lo verifica?</em></>,
  heroBody:
    "Tus resultados salen de las plataformas que gestionas y del GA4 del cliente, y el cliente sabe que ambos tienen interés en la respuesta. Sealmetrics da a agencia y cliente una misma capa medida, sin pérdida por consentimiento y contrastada con los pedidos del cliente. El cliente es dueño de la organización; tu equipo trabaja dentro con un solo acceso para todos los clientes.",
  heroPrimary: { label: "Ver cómo se configura un cliente", href: "#method" },
  heroSecondary: { label: "Leer el caso Palladium", href: "/es/case-studies/palladium-hotel-group/" },
  heroMicro: "Una organización por cliente · un acceso para todos · último clic por sesión · alojado en Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Actualizado",
    date: AGENCIES_MODIFIED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Un acceso de agencia · organizaciones de cliente",
    status: "Selector activo",
    rows: [
      ["Organización cliente 1", "Cliente Owner · agencia Admin"],
      ["Organización cliente 2", "Agencia Member · 2 sitios asignados"],
      ["Facturación", "Se queda con cada Owner"],
      ["Token de API", "Solo lectura · con permisos · caduca"],
    ],
    foot: "Cada sitio es de un cliente · cada persona puede estar en varios · cada cliente ve solo lo suyo",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      La analítica para agencias de marketing es una capa de medición que
      aceptan tanto la agencia como su cliente, porque no la ha producido
      ninguno de los dos y ninguna plataforma publicitaria se pone nota a sí
      misma en ella. Los informes de agencia suelen apoyarse en Meta y Google
      Ads, que atribuyen las conversiones a sus propios anuncios, y en el GA4 del
      cliente, que no registra a quien rechaza el banner. Sealmetrics cuenta
      visitas sin cookies y atribuye los ingresos al último clic de cada sesión.
      Cada cliente es una
      organización propia, con sus sitios, miembros y facturación. Un mismo
      acceso de agencia puede pertenecer a todas y cambiar de cliente desde la
      barra lateral, y el rol Member solo ve los sitios asignados. Los paneles
      del cliente leen los mismos datos con el conector de BigQuery, la API REST
      o el servidor MCP. No envía conversiones a las plataformas, no importa la
      inversión ni modela atribución multitoque.
    </p>
  ),

  divergence: {
    tag: "Por qué el cliente duda del informe",
    title: <>Cada fuente tiene interés.<br /><em>También la tuya.</em></>,
    body: "Un informe de agencia junta cifras que ha producido alguien con interés en ellas. El cliente no necesita sospechar mala fe para descontar el resultado: le basta con la estructura.",
    headers: ["Fuente del informe", "Qué cuenta", "Por qué el cliente lo descuenta", "Qué lo resuelve"],
    rows: [
      ["Meta Ads Manager", "Las conversiones que Meta atribuye a sus anuncios", "Su propia ventana de atribución; conversiones view-through y modeladas según la configuración", "Ingresos medidos en la web del cliente, por campaña"],
      ["Google Ads", "Las conversiones que Google atribuye a sus anuncios", "Puede reclamar la misma venta que Meta; conversiones modeladas donde falta el consentimiento", "Los mismos ingresos medidos, mismas UTM, mismos días"],
      ["GA4 del cliente", "Sesiones de quien aceptó el banner", "La pérdida por consentimiento es desigual: el tráfico de pago pierde más que el directo y los canales de la agencia parecen más pequeños", "Un recuento que no espera al banner"],
      ["Panel de la agencia", "Lo que devuelven los conectores de las plataformas", "Lo ha construido la parte evaluada", "Un conjunto de datos que el cliente posee y puede consultar"],
      ["Sistema de pedidos o CRM del cliente", "Los pedidos que se hicieron", "Total exacto, sin un canal fiable detrás", "El punto de conciliación de todo lo anterior"],
    ],
    note: (
      <>
        La diferencia se puede medir. En{" "}
        <Link className={link} href="/es/case-studies/incapto/">Incapto</Link>,
        Sealmetrics registró un 11% más de tráfico directo que GA4, pero entre un
        37% y un 52% más desde campañas de pago: el tráfico por el que se evalúa a
        una agencia quedaba varias veces más infravalorado que el directo. En{" "}
        <Link className={link} href="/es/case-studies/palladium-hotel-group/">Palladium Hotel Group</Link>,
        el 40% del tráfico entrante no tenía source ni medium. Por qué las
        herramientas que dependen del consentimiento pierden ese tráfico se explica
        en{" "}
        <Link className={link} href="/es/glossary/data-loss-in-analytics/">pérdida de datos en analítica</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que le cuesta la duda a una agencia",
    title: <>La reunión va de los datos.<br /><em>No del trabajo.</em></>,
    body: "Cuando el cliente no se fía de la fuente, a la agencia le pasan tres cosas, y ninguna tiene que ver con sus resultados.",
    items: [
      ["01", "Revisiones trimestrales defendiendo cifras", "La reunión que debía decidir el plan del trimestre empieza con una conciliación. Marca, finanzas y agencia llegan con cifras distintas, y gana por defecto la de quien menos interés tiene."],
      ["02", "Trabajo de pago infravalorado", "En Incapto, GA4 mostraba las campañas de pago como el 50% del tráfico; medidas sin pérdida por consentimiento eran el 62%. Una agencia evaluada con la cifra de GA4 se evalúa con doce puntos menos de los que generó."],
      ["03", "Sin comparación justa entre partners", "Un cliente que trabaja con varias agencias o partners no puede compararlos si cada uno reporta desde su plataforma. Palladium Hotel Group rehízo su modelo de Display sobre una base neutral antes de reequilibrar partners, soportes y audiencias."],
    ],
  },

  method: {
    id: "method",
    tag: "Cómo se configura un cliente",
    title: <>El cliente es el dueño.<br /><em>La agencia lo opera.</em></>,
    body: (
      <>
        La capa neutral solo funciona si el cliente no tiene que fiarse de la
        palabra de la agencia sobre su configuración. Estos pasos dejan la
        propiedad en el cliente y el trabajo operativo en tu equipo. El
        razonamiento de una referencia compartida está en{" "}
        <Link className={link} href="/es/use-cases/single-source-of-truth/">fuente única de verdad</Link>.
      </>
    ),
    howToName: "Cómo configura una agencia una capa de medición neutral para un cliente",
    howToDescription:
      "Cinco pasos para que una agencia dé a su cliente una referencia medida: organización del cliente, campañas etiquetadas, reglas de canal compartidas, conciliación con pedidos e informes sobre los mismos datos.",
    steps: [
      { name: "Que el cliente sea dueño de la organización", text: "El cliente crea su organización en Sealmetrics y se queda como Owner, con la facturación y el control de miembros. Invita a la agencia como Admin, con acceso a todos los sitios, o como Member, limitada a los sitios que asigne. Cada persona de la agencia mantiene un solo acceso para todas las organizaciones de sus clientes." },
      { name: "Añade los sitios del cliente e instala el tracker", text: "Crea un sitio por dominio dentro de la organización del cliente, con su zona horaria y su moneda, e instala en cada uno el tracker y la conversión de compra o de lead. Los subdominios de un mismo dominio van en el mismo sitio." },
      { name: "Etiqueta cada enlace de pago y acordad las reglas de canal", text: "Pon UTM en todos los enlaces de pago: una plantilla de seguimiento a nivel de cuenta en Google Ads y parámetros de URL en Meta. Define reglas de canal propias como borradores, pruébalas con valores reales de source, medium y campaign, y publícalas. Exporta las reglas en CSV e impórtalas en el sitio del siguiente cliente para reutilizar la misma taxonomía." },
      { name: "Concilia con los pedidos del cliente antes del primer informe", text: "Mide con Sealmetrics junto a la analítica actual durante un ciclo comercial completo y compara el total medido con el sistema de pedidos o el CRM del cliente, en el mismo periodo y la misma moneda. En Incapto, Sealmetrics registró el 96% de los pedidos reales y el 97% de la facturación en 48 días." },
      { name: "Informa desde los datos que posee el cliente", text: "Deja las plataformas para pujar. Construye el informe del cliente con los ingresos medidos por canal y campaña, en Data Studio sobre el conector de BigQuery, con la API REST y un token de solo lectura, o con un asistente de IA conectado al servidor MCP." },
    ],
  },

  roles: {
    tag: "Quién lo usa en la agencia",
    title: <>Unos mismos datos,<br /><em>cuatro mesas.</em></>,
    body: "Los equipos de la agencia conservan sus herramientas de plataforma. Lo que cambia es la cifra sobre la que se apoyan el informe y la recomendación de presupuesto.",
    items: [
      { role: "Responsable de cuenta", need: "Llegar a la revisión trimestral con una cifra que el cliente no discuta.", how: "Ingresos por canal medidos sin pérdida por consentimiento y conciliados con los pedidos del cliente antes de llegar a la presentación.", link: { label: "Fuente única de verdad", href: "/es/use-cases/single-source-of-truth/" } },
      { role: "Especialista en paid media", need: "Enseñar lo que vendió cada campaña fuera del informe de la plataforma.", how: "Ingresos por campaña y creatividad a partir de las UTM de la página de llegada, cruzados con la inversión de la plataforma.", link: { label: "Seguimiento de Google Ads", href: "/es/integrations/google-ads/" } },
      { role: "Datos y BI", need: "Construir paneles de cliente sobre datos que el cliente puede auditar.", how: "El conector de BigQuery, incluido en todos los planes, alimenta Data Studio o cualquier herramienta de BI con un esquema en estrella en el proyecto del cliente.", link: { label: "Conector de BigQuery", href: "/es/integrations/bigquery/" } },
      { role: "CMO del cliente", need: "Evaluar a la agencia con una cifra que no ha producido ninguna de las partes.", how: "El cliente es dueño de la organización y de la facturación, ve los mismos datos y decide quién tiene acceso.", link: { label: "Analítica para CMOs", href: "/es/for/cmo/" } },
    ],
  },

  proof: {
    tag: "Medido en la práctica",
    quote: {
      text: "Hoy todos los players están contentos. Los datos son neutrales, no hay caja negra y todos han aceptado estos valores como la referencia.",
      cite: "Toni Andújar · Director Digital y Venta Directa · Palladium Hotel Group",
      person: "Toni Andújar",
      role: "Director Digital y Venta Directa, Palladium Hotel Group",
    },
    body: "Palladium Hotel Group usa Sealmetrics como la referencia que aceptan su marca, sus departamentos y sus agencias. Las agencias siguen optimizando dentro de sus plataformas; los resultados se evalúan en un único sitio.",
    figures: [
      { value: "+165%", label: "de mejora del Coste por Búsqueda de Display tras reequilibrar partners con el modelo neutral", client: "Palladium Hotel Group", href: "/es/case-studies/palladium-hotel-group/" },
      { value: "15–20%", label: "más ventas atribuidas, contrastadas con el total del CRM", client: "Dreamplace Hotels", href: "/es/case-studies/dreamplace-hotels/" },
      { value: "+37–52%", label: "más tráfico de campañas de pago registrado que GA4 en 48 días de medición en paralelo", client: "Incapto", href: "/es/case-studies/incapto/" },
    ],
    readCase: "Leer el caso",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Una capa neutral<br /><em>no es una plataforma publicitaria.</em></>,
    body: (
      <>
        Una agencia recomienda con más seguridad cuando los límites están claros.
        La atribución es a último clic dentro de cada sesión, por diseño; los{" "}
        <Link className={link} href="/es/glossary/attribution-model/">modelos de atribución</Link>{" "}
        explican la diferencia.
      </>
    ),
    items: [
      ["No alimenta las pujas", "Sealmetrics no envía conversiones a Google Ads ni a Meta. Las plataformas mantienen su píxel y su configuración de consentimiento para optimizar."],
      ["No importa la inversión", "El coste sale de cada plataforma y se cruza con los ingresos medidos en una hoja de cálculo, en BigQuery o con un asistente de IA."],
      ["Un cliente cada vez en el panel", "Los clientes son organizaciones separadas y se cambia de una a otra. Una vista que combine varios clientes se construye en BigQuery o con la API."],
      ["El acceso lo decide el cliente", "El Owner controla la facturación y los miembros. Un Admin no puede eliminar a un Owner y un Member solo ve los sitios asignados."],
      ["Sin audiencias ni datos por usuario", "Los datos son agregados y sin identificadores de visitante, así que no sirven para listas de remarketing ni para seguir a una persona entre sesiones."],
      ["Último clic por sesión y nada más", "Sin modelo multitoque ni view-through. Las campañas de parte alta del embudo necesitan un test con grupo de control o por zonas antes de recortarlas."],
    ],
  },

  faqTag: "Lo que preguntan las agencias",
  faqTitle: <>Antes de proponerlo<br /><em>a un cliente.</em></>,
  faq: [
    { question: "¿Puede una agencia gestionar varios clientes con un solo acceso a Sealmetrics?", answer: "Sí. Cada cliente es una organización propia con sus sitios, miembros y facturación, y una misma persona puede ser miembro de varias organizaciones. Cuando lo es, aparece un selector de organización en la barra lateral. Cada cliente solo ve su propia organización." },
    { question: "¿Quién debe ser dueño de la cuenta de Sealmetrics, la agencia o el cliente?", answer: "El cliente, si lo que se busca es una referencia en la que confíe. El Owner controla la facturación y los miembros; la agencia entra como Admin, con acceso a todos los sitios pero sin facturación, o como Member, limitada a los sitios que el cliente asigne. Las invitaciones se envían como Admin o Member, y solo un Owner puede ascender a alguien a Owner." },
    { question: "¿Las plataformas publicitarias seguirán reportando sus conversiones?", answer: "Sí. Sealmetrics no envía conversiones a Meta ni a Google Ads, así que las plataformas siguen reportando y optimizando con sus propios datos. La agencia las usa para pujar, y los ingresos medidos para el informe del cliente y la recomendación de presupuesto." },
    { question: "¿Cómo montamos paneles de cliente en Data Studio?", answer: "Conecta Data Studio al dataset de BigQuery del cliente, que el conector de Sealmetrics llena con tablas en esquema en estrella de tráfico, conversiones, páginas y páginas de llegada, cada hora o cada día. El conector está incluido en todos los planes. La API REST es la alternativa para otras herramientas de BI." },
    { question: "¿Podemos reutilizar las mismas reglas de canal en varios clientes?", answer: "Sí. Las reglas de canal propias se definen por sitio. Expórtalas en CSV desde un sitio e importa el archivo en otro; la importación sustituye de una vez las reglas propias de ese sitio, con un máximo de 100 reglas por sitio. Las reglas se aplican al tráfico que llega después de publicarlas." },
    { question: "¿Pueden nuestros asistentes de IA consultar la analítica de los clientes?", answer: "Sí, con el servidor MCP de Sealmetrics. Cada consulta se dirige a un sitio, y el asistente puede listar los sitios a los que da acceso su clave. Los tokens de API son de solo lectura, con permisos acotados y fecha de caducidad." },
    { question: "¿Qué agencias trabajan ya con Sealmetrics?", answer: "Product Hackers, en implantaciones orientadas a growth con atribución entre canales y CRO; 3dids, en implantaciones técnicas de gestión de etiquetas, data layer y migraciones de plataformas de consentimiento; y Ayesa, en transformaciones enterprise que abarcan varias unidades de negocio." },
  ],

  final: {
    tag: "Sesión para agencias",
    title: <>Trae un cliente.<br /><em>Nosotros ponemos la capa neutral.</em></>,
    body: "Treinta minutos: miramos juntos los informes de plataforma, la analítica y el total de pedidos de un cliente, y te enseñamos cómo se configurarían la organización, las reglas de canal y la conciliación.",
    primary: { label: "Reservar una sesión para agencias", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
