import Link from "next/link";
import { DATA_STUDIO_REPORT_URL } from "@/lib/content/data-studio";
import type { ProblemLandingContent } from "./types";

/**
 * /data-studio — the Sealmetrics report template and connector for Data Studio.
 *
 * Until 15 Sep 2026 this route was a redirect stub to the one-click report. The
 * short link is still used in emails and docs, so the hero and the closing
 * block keep a primary CTA to that same URL (`DATA_STUDIO_REPORT_URL`, which
 * stays the only place the link is built).
 *
 * Connector facts come from docs.sealmetrics.com/platform/settings/integrations/looker-studio
 * (page titled "Data Studio Integration", checked 15 Sep 2026): seven report
 * types and their fields; API key from My Account > API Keys; authorise, key,
 * site, report type, Connect; one data source per report type, added through
 * Resource > Manage added data sources; date range controls filter every chart;
 * 5-minute connector cache, Data Studio may cache too; separate data sources per
 * site; pending listing in the Partner Connector Gallery, with Viewer access
 * granted on request meanwhile; the connector does not write to the account;
 * Data Studio + BigQuery comparison. API keys are read-only
 * (docs.sealmetrics.com/api/authentication: stats:read, sites:read,
 * accounts:read).
 *
 * From the connector's own notes (sealmetrics2 integrations/looker-studio):
 * Apps Script community connector calling the Sealmetrics API; revenue typed to
 * the site currency; bounce rate as a calculated field over entrances and
 * engaged entrances; site optional when the key can access one site (keys with
 * several sites get an error); the template has two pages (summary, audience
 * and content) and seven data sources. The Google permission scope comes from
 * /privacy §10.
 *
 * Not claimed, on purpose: that shared-report viewers need no key of their own
 * (the docs say so for owner's credentials, but the template's data sources use
 * viewer's credentials); the Pages report's content group (the docs list it, but
 * content-grouping rules live in browser storage, not on the server); "real
 * time" (the docs use it; freshness is not specified beyond the cache); any plan
 * restriction for the connector (not documented). BigQuery on every plan is the
 * founder's 15 Sep 2026 confirmation, as on /integrations/bigquery.
 *
 * No Data Studio customer case is published; the proof block says so and uses
 * Incapto's measured gap, labelled as a GA4 measurement on Shopify.
 */

export const DATA_STUDIO_PUBLISHED = "2026-09-15";

const DOCS_URL = "https://docs.sealmetrics.com/platform/settings/integrations/looker-studio";

const link = "sig-problem-inline";

export const dataStudioEn: ProblemLandingContent = {
  route: "/data-studio",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Integrations", href: "/integrations/" },
    { label: "Data Studio" },
  ],
  eyebrow: "Integration · Data Studio",
  h1: <>Your Data Studio report<br />shows the visitors<br /><em>who said yes.</em></>,
  heroBody:
    "A Data Studio report built on GA4 carries only the visitors who accepted the consent banner, and every stakeholder who opens it inherits that gap. The Sealmetrics template is a ready report on data measured without consent loss — traffic, sources, channels, landing pages, pages, countries and devices — copied into your own Data Studio account with one link and your API key.",
  heroPrimary: { label: "Open the report in Data Studio", href: DATA_STUDIO_REPORT_URL },
  heroSecondary: { label: "See the setup", href: "#method" },
  heroMicro: "Template with 7 data sources · read-only API key · 5-minute cache · gallery listing pending",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Published",
    date: DATA_STUDIO_PUBLISHED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "What the template reads",
    status: "7 data sources",
    rows: [
      ["traffic_overview", "Daily entrances, conversions, revenue"],
      ["traffic_sources", "Source, medium, campaign, term"],
      ["channels", "Entrances, conversions, revenue"],
      ["landing_pages", "Conversions and revenue by entry page"],
    ],
    foot: "Plus pages, countries and devices · aggregate data · last click per session",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      The Sealmetrics Data Studio report is a ready-made template that one link
      copies into your own Data Studio account, reading your Sealmetrics data
      through the official connector. The connector is a Google Apps Script
      community connector that calls the Sealmetrics API with a read-only API
      key you enter once. It offers seven report types — traffic overview,
      traffic sources, pages, landing pages, countries, devices and channels —
      each a data source with its own dimensions and metrics, such as
      entrances, pageviews, conversions, revenue in the site&apos;s currency and
      bounce rate. The template connects all seven across a summary page and an
      audience and content page, and a date range control filters every chart.
      Because Sealmetrics measures without cookies, the figures do not lose the
      visitors who reject a consent banner. The data is aggregate, conversions
      are credited to the last click of their session, and the connector is
      still pending listing in Google&apos;s Partner Connector Gallery.
    </p>
  ),

  divergence: {
    tag: "What the report contains",
    title: <>Seven report types.<br /><em>One data source each.</em></>,
    body: "Each report type is a separate data source with its own fields. The template adds all seven; building your own, you add only the ones a chart needs.",
    headers: ["Report type", "Dimensions", "Metrics", "Typical chart"],
    rows: [
      ["Traffic overview", "Date", "Entrances, engaged entrances, pageviews, conversions, microconversions, revenue, bounce rate", "Time series of traffic, conversions and revenue"],
      ["Traffic sources", "UTM source, medium, campaign and term", "Entrances, conversions, revenue, bounce rate", "Source and medium table"],
      ["Channels", "Channel group", "Entrances, conversions, revenue, bounce rate", "Channel performance"],
      ["Landing pages", "Entry page path", "Entrances, conversions, revenue, bounce rate", "Top landing pages with conversions"],
      ["Pages", "Page path", "Entrances, pageviews, conversions, bounce rate", "Top pages"],
      ["Countries", "Country code and country name", "Entrances, pageviews, conversions, bounce rate", "Geo map"],
      ["Devices", "Device type: desktop, mobile, tablet", "Entrances, pageviews, bounce rate", "Device split"],
    ],
    note: (
      <>
        Sources come from{" "}
        <Link className={link} href="/glossary/utm-parameters/">UTM parameters</Link>;
        revenue is typed to the site&apos;s currency; and{" "}
        <Link className={link} href="/glossary/bounce-rate/">bounce rate</Link> is a
        calculated field — entrances minus engaged entrances, over entrances — so it
        re-aggregates correctly when a chart groups rows. Conversions carry{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last-click attribution</Link>{" "}
        within the session, as in the dashboard.
      </>
    ),
  },

  costs: {
    tag: "What a GA4-based report carries",
    title: <>The report looks final.<br /><em>Its base is not.</em></>,
    body: "Data Studio makes any data source look authoritative. A report built on GA4 passes every gap in what GA4 collected to everyone who reads it.",
    items: [
      ["01", "Rejected visitors are not in the chart", (
        <>
          A tag that waits for consent never records the visitor who says no. The
          In our experience with clients, between 40% and 60% of traffic
          doesn&apos;t accept cookies; on Incapto&apos;s
          Shopify store, GA4 did not record 29% of visits over 48 days. The
          argument in full is on{" "}
          <Link className={link} href="/complete-data/">complete data</Link>.
        </>
      )],
      ["02", "The gap is not spread evenly", "On that store, the reconciled view put paid campaigns at 62% of traffic, against 50% in GA4. A channel chart built on GA4 understates paid media in the one line that decides the budget."],
      ["03", "Finance compares it with real orders", (
        <>
          When the report is set against booked revenue, the difference reads as a
          reporting error rather than a consent effect. How to make both teams
          work from one figure is covered in{" "}
          <Link className={link} href="/use-cases/single-source-of-truth/">one number for marketing and finance</Link>.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "Connect it",
    title: <>One link.<br /><em>One API key.</em></>,
    body: (
      <>
        The one-click report is the fast path. The connector builds a single data
        source when you want your own layout; its link is in the{" "}
        <a className={link} href={DOCS_URL}>Data Studio integration guide</a>. Both
        ask for the same key.
      </>
    ),
    howToName: "How to connect Sealmetrics to Data Studio",
    howToDescription:
      "Five steps to copy the Sealmetrics report template into Data Studio, or build a data source with the connector, using a read-only API key.",
    steps: [
      { name: "Create an API key", text: "In Sealmetrics, go to My Account → API Keys and create a key or copy an existing one. API keys are read-only. For the one-click report, use a key restricted to a single site, so the connector can select that site on its own." },
      { name: "Open the report or the connector", text: "Open the one-click report link on this page to copy the Sealmetrics template, with its seven data sources, into your Data Studio account. To build one data source instead, open the Sealmetrics connector from the Data Studio integration guide in the documentation." },
      { name: "Authorise the connector", text: "On first use, Data Studio asks you to authorise the connector: click Authorize. If you are sent back to the Data Studio home with no error, your Google account does not have Viewer access to the connector yet; while the gallery listing is reviewed, write to support@sealmetrics.com with that Google email to be granted access." },
      { name: "Enter your API key", text: "Paste the API key when Data Studio asks for it and continue. The key is not part of the report link, so the link can be shared without exposing anyone's data." },
      { name: "Choose the site and report type", text: "In the one-click report, the site is selected automatically when the key can access only one site; a key with several sites returns an error asking you to choose the site in the data source. With the connector, select the site and a report type, then click Connect. Add further report types through Resource → Manage added data sources." },
    ],
  },

  roles: {
    tag: "Where it fits",
    title: <>Same Data Studio.<br /><em>A different base.</em></>,
    body: "The template does not change how your team reports. It changes what the charts are calculated on.",
    items: [
      { role: "Marketing lead", need: "Report channels and revenue upward.", how: "Entrances, conversions and revenue by channel, source and landing page, measured without consent loss, in the tool stakeholders already open.", link: { label: "One number for marketing and finance", href: "/use-cases/single-source-of-truth/" } },
      { role: "GA4 reports", need: "Can stay, for what depends on GA4.", how: "Reports that join GA4 with Google Ads or Search Console can keep running while the budget view moves to the measured base.", link: { label: "GA4 migration plan", href: "/use-cases/ga4-migration/" } },
      { role: "Data team", need: "Moves to BigQuery for SQL and joins.", how: "When a report needs custom SQL or a join with spend or order tables, the BigQuery connector — included on every plan — writes the same measurement into your own project, and Data Studio reads it as a BigQuery source.", link: { label: "BigQuery connector", href: "/integrations/bigquery/" } },
      { role: "Agencies", need: "Client reports on the client's own data.", how: "A key restricted to the client's site opens that client's own copy of the template, with nothing from other accounts in it.", link: { label: "Analytics for agencies", href: "/for/agencies/" } },
    ],
  },

  proof: {
    tag: "The gap it removes",
    body: "No customer case about the Data Studio report is published, and this page does not claim one. The figures below are what GA4 did not record on Incapto's Shopify store during a 48-day parallel run checked against real orders — the gap a GA4-based report would have carried.",
    figures: [
      { value: "29%", label: "of real visits that GA4 did not record in Incapto's 48-day parallel run", client: "Incapto · visits", href: "/case-studies/incapto/" },
      { value: "45%", label: "of real pageviews that GA4 did not record on the same store", client: "Incapto · pageviews", href: "/case-studies/incapto/" },
      { value: "7", label: "report types the connector offers, all of them connected in the template", client: "Connector documentation", href: "/data-studio/#method" },
    ],
    readCase: "Open",
  },

  limits: {
    tag: "What it does not do",
    title: <>Know the edges<br /><em>before you share it.</em></>,
    body: (
      <>
        Most follow from reading an API rather than a warehouse. For SQL and joins
        on the same data, see the{" "}
        <Link className={link} href="/integrations/bigquery/">BigQuery connector</Link>.
      </>
    ),
    items: [
      ["Read-only, by design", "API keys can only read statistics, sites and account data. The connector does not write to or change your Sealmetrics account."],
      ["An API, not a warehouse", "Each view requests the selected date range from the Sealmetrics API. Responses are cached for 5 minutes, Data Studio may cache on its side, and long date ranges load more slowly."],
      ["One site per data source", "Each data source reads one site. To report on several sites, add a data source per site and combine them in the same report."],
      ["Aggregates, last click per session", "The report shows aggregate data with conversions credited to the last click of their session: no user-level paths, no multi-touch model, no view-through."],
      ["Gallery listing pending", "The connector is pending listing in the Data Studio Partner Connector Gallery. Until it is listed, a Google account needs Viewer access to the connector, granted on request."],
      ["Bounce rate is not GA4's", "Here a bounce is a single-page session. GA4 defines bounce rate as the share of sessions that were not engaged, so the two figures should not be compared directly."],
    ],
  },

  faqTag: "Common Data Studio questions",
  faqTitle: <>Before you open<br /><em>the template.</em></>,
  faq: [
    { question: "How do I get a Sealmetrics report in Data Studio?", answer: "Create an API key in Sealmetrics under My Account → API Keys, open the one-click report link on sealmetrics.com/data-studio, authorise the connector and enter the key. Data Studio copies the Sealmetrics template, with its seven data sources, into your account. Use a key restricted to one site so the site is selected automatically." },
    { question: "What does the Sealmetrics Data Studio template include?", answer: "Two pages, a summary and an audience and content page, built on seven report types: traffic overview by day, traffic sources by UTM source, medium, campaign and term, channels, landing pages, pages, countries and devices. The metrics include entrances, engaged entrances, pageviews, conversions, microconversions, revenue and bounce rate, depending on the report type." },
    { question: "Why does the connector send me back to the Data Studio home?", answer: "The connector is pending listing in the Data Studio Partner Connector Gallery, and until then a Google account needs Viewer access to it. If authorising redirects you to the Data Studio home with no error, write to support@sealmetrics.com with the Google email you use so access can be granted." },
    { question: "How fresh is the data in the report?", answer: "Each time a report is viewed, Data Studio requests the selected date range from the Sealmetrics API. The connector caches responses for 5 minutes and Data Studio may also cache on its side; the refresh button in the report viewer requests the data again." },
    { question: "Should I use the Data Studio connector or BigQuery?", answer: "Use the connector for dashboards with the standard metrics: it needs only an API key. Use the BigQuery connector, included on every Sealmetrics plan, when you need custom SQL, cross-table joins or to combine analytics with spend and order data; Data Studio can then read the BigQuery dataset directly." },
    { question: "Can one report cover several sites?", answer: "Yes, with one data source per site combined in the same report. The one-click template selects the site automatically only when the API key can access a single site; with a key for several sites, choose the site in each data source." },
    { question: "Does the connector access my Google account data?", answer: "No. The connector requests one Google permission, to make external requests, which it uses only to call the Sealmetrics API. It does not read your name, email, Drive, Sheets or any other Google service; it handles the API key, site and report type you enter and the fields each chart requests." },
  ],

  final: {
    tag: "Data Studio report",
    title: <>Open the template.<br /><em>Report on the measured base.</em></>,
    body: "Copy the Sealmetrics report into your Data Studio account with your API key. Not on Sealmetrics yet? Book 30 minutes with the founder to see the measurement behind the report and what it changes in your channel figures.",
    primary: { label: "Open the report in Data Studio", href: DATA_STUDIO_REPORT_URL },
    secondary: { label: "Book a Demo", href: "/demo/" },
  },
};

export const dataStudioEs: ProblemLandingContent = {
  route: "/data-studio",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Integraciones", href: "/es/integrations/" },
    { label: "Data Studio" },
  ],
  eyebrow: "Integración · Data Studio",
  h1: <>Tu informe de Data Studio<br />enseña a los visitantes<br /><em>que dijeron sí.</em></>,
  heroBody:
    "Un informe de Data Studio montado sobre GA4 solo contiene a los visitantes que aceptaron el banner de consentimiento, y cada persona que lo abre hereda ese hueco. La plantilla de Sealmetrics es un informe listo sobre datos medidos sin pérdida por consentimiento —tráfico, orígenes, canales, páginas de llegada, páginas, países y dispositivos— que se copia en tu cuenta de Data Studio con un enlace y tu API key.",
  heroPrimary: { label: "Abrir el informe en Data Studio", href: DATA_STUDIO_REPORT_URL },
  heroSecondary: { label: "Ver la configuración", href: "#method" },
  heroMicro: "Plantilla con 7 fuentes de datos · API key de solo lectura · caché de 5 minutos · pendiente de la galería de Google",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Publicado",
    date: DATA_STUDIO_PUBLISHED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Lo que lee la plantilla",
    status: "7 fuentes de datos",
    rows: [
      ["traffic_overview", "Entradas, conversiones e ingresos por día"],
      ["traffic_sources", "Source, medium, campaign, term"],
      ["channels", "Entradas, conversiones, ingresos"],
      ["landing_pages", "Conversiones e ingresos por página de llegada"],
    ],
    foot: "Más páginas, países y dispositivos · datos agregados · último clic por sesión",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      El informe de Sealmetrics para Data Studio es una plantilla lista que un
      enlace copia en tu cuenta de Data Studio y que lee tus datos a través del
      conector oficial. El conector es un community connector de Google Apps
      Script que consulta la API de Sealmetrics con una API key de solo lectura
      que introduces una vez. Ofrece siete tipos de informe —resumen de tráfico,
      orígenes, canales, páginas de llegada, páginas, países y dispositivos—,
      cada uno una fuente de datos con sus dimensiones y métricas: entradas,
      páginas vistas, conversiones, ingresos en la moneda del sitio y tasa de
      rebote. La plantilla conecta los siete en una página de resumen y otra de
      audiencia y contenido. Como Sealmetrics mide sin cookies, las cifras no
      pierden a quien rechaza el banner de consentimiento. Los datos son
      agregados, cada conversión se atribuye al último clic de su sesión y el
      conector sigue pendiente de aparecer en la galería de conectores de
      partners de Google.
    </p>
  ),

  divergence: {
    tag: "Qué contiene el informe",
    title: <>Siete tipos de informe.<br /><em>Una fuente de datos cada uno.</em></>,
    body: "Cada tipo de informe es una fuente de datos distinta con sus propios campos. La plantilla añade los siete; si montas el tuyo, añades solo los que necesita cada gráfico.",
    headers: ["Tipo de informe", "Dimensiones", "Métricas", "Gráfico habitual"],
    rows: [
      ["Resumen de tráfico", "Fecha", "Entradas, entradas con interacción, páginas vistas, conversiones, microconversiones, ingresos, tasa de rebote", "Evolución de tráfico, conversiones e ingresos"],
      ["Orígenes de tráfico", "UTM source, medium, campaign y term", "Entradas, conversiones, ingresos, tasa de rebote", "Tabla de source y medium"],
      ["Canales", "Grupo de canal", "Entradas, conversiones, ingresos, tasa de rebote", "Rendimiento por canal"],
      ["Páginas de llegada", "Ruta de la página de entrada", "Entradas, conversiones, ingresos, tasa de rebote", "Principales páginas de llegada con conversiones"],
      ["Páginas", "Ruta de la página", "Entradas, páginas vistas, conversiones, tasa de rebote", "Páginas más vistas"],
      ["Países", "Código y nombre del país", "Entradas, páginas vistas, conversiones, tasa de rebote", "Mapa por país"],
      ["Dispositivos", "Tipo de dispositivo: escritorio, móvil, tablet", "Entradas, páginas vistas, tasa de rebote", "Reparto por dispositivo"],
    ],
    note: (
      <>
        Los ingresos van tipados en la moneda del sitio, y la tasa de rebote es un
        campo calculado —entradas menos entradas con interacción, sobre entradas—
        para que se vuelva a agregar bien cuando un gráfico agrupa filas. Las
        conversiones llevan la{" "}
        <Link className={link} href="/es/glossary/revenue-attribution/">atribución de ingresos</Link>{" "}
        a último clic dentro de la sesión, igual que en el dashboard.
      </>
    ),
  },

  costs: {
    tag: "Lo que arrastra un informe sobre GA4",
    title: <>El informe parece definitivo.<br /><em>Su base, no.</em></>,
    body: "Data Studio hace que cualquier fuente de datos parezca incuestionable. Un informe montado sobre GA4 traslada cada hueco de lo que GA4 recogió a todo el que lo lee.",
    items: [
      ["01", "Quien rechaza no aparece en el gráfico", (
        <>
          Una etiqueta que espera al consentimiento nunca registra al visitante que
          dice que no. En nuestra experiencia con clientes, entre el 40% y el 60%
          del tráfico no acepta cookies; en la tienda Shopify de Incapto, GA4 no registró el 29% de las
          visitas en 48 días. El argumento completo está en{" "}
          <Link className={link} href="/es/complete-data/">datos completos</Link>.
        </>
      )],
      ["02", "El hueco no se reparte por igual", "En esa tienda, la visión conciliada situó las campañas de pago en el 62% del tráfico, frente al 50% en GA4. Un gráfico por canal sobre GA4 infravalora el pago justo en la línea que decide el presupuesto."],
      ["03", "Finanzas lo compara con los pedidos reales", (
        <>
          Cuando el informe se enfrenta a la facturación, la diferencia parece un
          error del informe y no un efecto del consentimiento. Cómo hacer que los dos
          equipos trabajen con una misma cifra se explica en{" "}
          <Link className={link} href="/es/use-cases/single-source-of-truth/">una sola cifra para marketing y finanzas</Link>.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "Conéctalo",
    title: <>Un enlace.<br /><em>Una API key.</em></>,
    body: (
      <>
        El informe en un clic es el camino corto. El conector crea una sola fuente de
        datos cuando quieres tu propio diseño; su enlace está en la{" "}
        <a className={link} href={DOCS_URL}>guía de integración con Data Studio</a>{" "}
        (en inglés). Los dos piden la misma clave.
      </>
    ),
    howToName: "Cómo conectar Sealmetrics con Data Studio",
    howToDescription:
      "Cinco pasos para copiar la plantilla de informe de Sealmetrics en Data Studio, o crear una fuente de datos con el conector, usando una API key de solo lectura.",
    steps: [
      { name: "Crea una API key", text: "En Sealmetrics, ve a My Account → API Keys y crea una clave o copia una existente. Las API keys son de solo lectura. Para el informe en un clic, usa una clave limitada a un único sitio, así el conector selecciona ese sitio por su cuenta." },
      { name: "Abre el informe o el conector", text: "Abre el enlace del informe en un clic de esta página para copiar la plantilla de Sealmetrics, con sus siete fuentes de datos, en tu cuenta de Data Studio. Si prefieres crear una sola fuente de datos, abre el conector de Sealmetrics desde la guía de integración con Data Studio de la documentación." },
      { name: "Autoriza el conector", text: "La primera vez, Data Studio te pide autorizar el conector: pulsa Authorize. Si te devuelve a la página de inicio de Data Studio sin ningún error, tu cuenta de Google todavía no tiene acceso de lector al conector; mientras Google revisa su alta en la galería, escribe a support@sealmetrics.com con ese correo de Google para que te den acceso." },
      { name: "Introduce tu API key", text: "Pega la API key cuando Data Studio te la pida y continúa. La clave no forma parte del enlace del informe, así que el enlace se puede compartir sin exponer los datos de nadie." },
      { name: "Elige sitio y tipo de informe", text: "En el informe en un clic, el sitio se selecciona solo cuando la clave tiene acceso a un único sitio; con una clave de varios sitios aparece un error que te pide elegirlo en la fuente de datos. Con el conector, elige el sitio y un tipo de informe y pulsa Connect. Añade más tipos de informe desde Resource → Manage added data sources." },
    ],
  },

  roles: {
    tag: "Dónde encaja",
    title: <>El mismo Data Studio.<br /><em>Otra base.</em></>,
    body: "La plantilla no cambia cómo informa tu equipo. Cambia sobre qué se calculan los gráficos.",
    items: [
      { role: "Responsable de marketing", need: "Informar de canales e ingresos hacia arriba.", how: "Entradas, conversiones e ingresos por canal, origen y página de llegada, medidos sin pérdida por consentimiento, en la herramienta que ya abre dirección.", link: { label: "Una cifra para marketing y finanzas", href: "/es/use-cases/single-source-of-truth/" } },
      { role: "Informes de GA4", need: "Pueden quedarse, para lo que depende de GA4.", how: "Los informes que cruzan GA4 con Google Ads o Search Console pueden seguir funcionando mientras la visión de presupuesto pasa a la base medida.", link: { label: "Sealmetrics frente a GA4", href: "/es/vs-ga4/" } },
      { role: "Equipo de datos", need: "Pasa a BigQuery para SQL y cruces.", how: "Cuando un informe necesita SQL propio o cruzar con tablas de inversión o pedidos, el conector de BigQuery —incluido en todos los planes— escribe la misma medición en tu propio proyecto, y Data Studio la lee como fuente de BigQuery.", link: { label: "Conector de BigQuery", href: "/es/integrations/bigquery/" } },
      { role: "Agencias", need: "Informes de cliente sobre los datos del cliente.", how: "Una clave limitada al sitio del cliente abre su propia copia de la plantilla, sin nada de otras cuentas.", link: { label: "Analítica para agencias", href: "/es/for/agencies/" } },
    ],
  },

  proof: {
    tag: "El hueco que elimina",
    body: "No hay publicado ningún caso de cliente sobre el informe de Data Studio, y esta página no se lo inventa. Las cifras son lo que GA4 no registró en la tienda Shopify de Incapto durante una medición en paralelo de 48 días contrastada con pedidos reales: el hueco que habría arrastrado un informe sobre GA4.",
    figures: [
      { value: "29%", label: "de las visitas reales que GA4 no registró en la medición en paralelo de Incapto, 48 días", client: "Incapto · visitas", href: "/es/case-studies/incapto/" },
      { value: "45%", label: "de las páginas vistas reales que GA4 no registró en esa misma tienda", client: "Incapto · páginas vistas", href: "/es/case-studies/incapto/" },
      { value: "7", label: "tipos de informe que ofrece el conector, todos conectados en la plantilla", client: "Documentación del conector", href: "/es/data-studio/#method" },
    ],
    readCase: "Abrir",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Conoce los límites<br /><em>antes de compartirlo.</em></>,
    body: (
      <>
        Casi todos vienen de leer una API y no un data warehouse. Para SQL y cruces
        sobre los mismos datos, mira el{" "}
        <Link className={link} href="/es/integrations/bigquery/">conector de BigQuery</Link>.
      </>
    ),
    items: [
      ["Solo lectura, por diseño", "Las API keys solo pueden leer estadísticas, sitios y datos de la cuenta. El conector no escribe ni modifica nada en tu cuenta de Sealmetrics."],
      ["Una API, no un data warehouse", "Cada visualización pide a la API de Sealmetrics el periodo seleccionado. Las respuestas se guardan en caché 5 minutos, Data Studio puede cachear por su lado y los periodos largos cargan más despacio."],
      ["Un sitio por fuente de datos", "Cada fuente de datos lee un sitio. Para informar de varios, añade una fuente de datos por sitio y combínalas en el mismo informe."],
      ["Agregados, último clic por sesión", "El informe muestra datos agregados y atribuye cada conversión al último clic de su sesión: sin recorridos por usuario, sin modelo multi-touch y sin view-through."],
      ["Pendiente de la galería de Google", "El conector está pendiente de aparecer en la galería de conectores de partners de Data Studio. Hasta entonces, cada cuenta de Google necesita acceso de lector al conector, que se concede a petición."],
      ["La tasa de rebote no es la de GA4", "Aquí un rebote es una sesión de una sola página. GA4 define la tasa de rebote como la proporción de sesiones sin interacción, así que las dos cifras no se deben comparar directamente."],
    ],
  },

  faqTag: "Preguntas frecuentes sobre Data Studio",
  faqTitle: <>Antes de abrir<br /><em>la plantilla.</em></>,
  faq: [
    { question: "¿Cómo tengo un informe de Sealmetrics en Data Studio?", answer: "Crea una API key en Sealmetrics en My Account → API Keys, abre el enlace del informe en un clic en sealmetrics.com/es/data-studio, autoriza el conector e introduce la clave. Data Studio copia la plantilla de Sealmetrics, con sus siete fuentes de datos, en tu cuenta. Usa una clave limitada a un sitio para que el sitio se seleccione solo." },
    { question: "¿Qué incluye la plantilla de Sealmetrics para Data Studio?", answer: "Dos páginas, un resumen y otra de audiencia y contenido, montadas sobre siete tipos de informe: resumen de tráfico por día, orígenes de tráfico por UTM source, medium, campaign y term, canales, páginas de llegada, páginas, países y dispositivos. Las métricas incluyen entradas, entradas con interacción, páginas vistas, conversiones, microconversiones, ingresos y tasa de rebote, según el tipo de informe." },
    { question: "¿Por qué el conector me devuelve al inicio de Data Studio?", answer: "El conector está pendiente de aparecer en la galería de conectores de partners de Data Studio y, hasta entonces, cada cuenta de Google necesita acceso de lector. Si al autorizar vuelves al inicio de Data Studio sin ningún error, escribe a support@sealmetrics.com con el correo de Google que usas para que te den acceso." },
    { question: "¿Cómo de recientes son los datos del informe?", answer: "Cada vez que se abre un informe, Data Studio pide a la API de Sealmetrics el periodo seleccionado. El conector guarda las respuestas en caché 5 minutos y Data Studio también puede cachear por su lado; el botón de actualizar del visor vuelve a pedir los datos." },
    { question: "¿Uso el conector de Data Studio o BigQuery?", answer: "Usa el conector para paneles con las métricas estándar: solo necesita una API key. Usa el conector de BigQuery, incluido en todos los planes de Sealmetrics, cuando necesites SQL propio, cruces entre tablas o combinar la analítica con inversión y pedidos; Data Studio puede leer después ese dataset de BigQuery directamente." },
    { question: "¿Un mismo informe puede cubrir varios sitios?", answer: "Sí, con una fuente de datos por sitio combinadas en el mismo informe. La plantilla en un clic solo selecciona el sitio de forma automática cuando la API key tiene acceso a un único sitio; con una clave de varios sitios, elige el sitio en cada fuente de datos." },
    { question: "¿El conector accede a los datos de mi cuenta de Google?", answer: "No. El conector pide un único permiso de Google, el de hacer peticiones externas, que usa solo para llamar a la API de Sealmetrics. No lee tu nombre, tu correo, Drive, Sheets ni ningún otro servicio de Google; maneja la API key, el sitio y el tipo de informe que introduces y los campos que pide cada gráfico." },
  ],

  final: {
    tag: "Informe de Data Studio",
    title: <>Abre la plantilla.<br /><em>Informa sobre la base medida.</em></>,
    body: "Copia el informe de Sealmetrics en tu cuenta de Data Studio con tu API key. ¿Todavía no usas Sealmetrics? Reserva 30 minutos con el founder para ver la medición que hay detrás del informe y qué cambia en tus cifras por canal.",
    primary: { label: "Abrir el informe en Data Studio", href: DATA_STUDIO_REPORT_URL },
    secondary: { label: "Reservar una demo", href: "/es/demo/" },
  },
};
