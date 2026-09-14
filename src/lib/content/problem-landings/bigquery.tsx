import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /integrations/bigquery — Phase 5 of CONTENT-PLAN-PROBLEM-POSITIONING.md (new page).
 *
 * Connector facts come from docs.sealmetrics.com/platform/settings/integrations/bigquery
 * (checked 14 Sep 2026): included in Growth, Scale and Enterprise; GCP service
 * account with BigQuery Data Editor and BigQuery Job User; JSON key uploaded in
 * Site Config → Integrations → BigQuery with the project ID filled from it;
 * dataset name (default `sealmetrics`) created automatically; dataset location
 * EU or US; sync hourly, daily (default) or manual; data types and their tables
 * (fact_traffic_daily, fact_traffic_hourly with 90-day partition expiration,
 * fact_conversions, fact_microconversions, fact_pages, fact_landing_pages,
 * dim_accounts; dim_countries and sync_metadata always created); initial backfill
 * 30/60/90 days, custom days or a date range, later backfills from the card;
 * star schema, partitioned by date and clustered; columns of fact_traffic_daily
 * and fact_conversions; the four example queries (reproduced verbatim); 1-2 hour
 * processing delay; deleting the integration never deletes data; GCP storage and
 * query costs paid to Google.
 *
 * GA4 comparison facts: Analytics Help 9358801 (standard daily export limit 1M
 * events) and 11161109 (modelled consent-mode data not available in data export).
 *
 * The docs' GCP price estimates are not repeated: Google's prices change and the
 * docs figures may be out of date.
 */

export const BIGQUERY_PUBLISHED = "2026-09-14";

const link = "sig-problem-inline";

const SQL_DAILY = `SELECT
  date,
  SUM(entrances) AS entrances,
  SUM(page_views) AS page_views,
  SUM(conversions) AS conversions
FROM \`your-project.sealmetrics.fact_traffic_daily\`
WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY date
ORDER BY date DESC`;

const SQL_ATTRIBUTION = `SELECT
  utm_source,
  utm_medium,
  SUM(count) AS conversions,
  SUM(revenue) AS revenue,
  SAFE_DIVIDE(SUM(revenue), SUM(count)) AS avg_order_value
FROM \`your-project.sealmetrics.fact_conversions\`
WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY utm_source, utm_medium
ORDER BY revenue DESC`;

const SQL_CONTENT = `SELECT
  content_grouping,
  SUM(page_views) AS page_views,
  SUM(entrances) AS entrances
FROM \`your-project.sealmetrics.fact_pages\`
WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
  AND content_grouping IS NOT NULL
GROUP BY content_grouping
ORDER BY page_views DESC`;

const SQL_PROPERTIES = `SELECT
  JSON_VALUE(properties, '$.customer_type') AS customer_type,
  SUM(count) AS conversions,
  SUM(revenue) AS revenue
FROM \`your-project.sealmetrics.fact_conversions\`
WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY customer_type
ORDER BY conversions DESC`;

export const bigqueryEn: ProblemLandingContent = {
  route: "/integrations/bigquery",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Integrations", href: "/integrations/" },
    { label: "BigQuery" },
  ],
  eyebrow: "Integration · BigQuery",
  h1: <>Your warehouse is only<br />as complete<br /><em>as what you export.</em></>,
  heroBody:
    "Exporting GA4 to BigQuery moves the same consent-shaped data into a warehouse, with Consent Mode's modelled users left behind. The Sealmetrics connector writes traffic, conversions and revenue by channel, campaign and creative into your own BigQuery project, hourly or daily, as ready-to-query tables in an EU or US dataset you choose.",
  heroPrimary: { label: "See the setup", href: "#method" },
  heroSecondary: { label: "See the SQL", href: "#examples" },
  heroMicro: "Growth, Scale and Enterprise · star schema · hourly or daily sync · your data, your retention",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Published",
    date: BIGQUERY_PUBLISHED,
    dateDisplay: "14 September 2026",
  },
  module: {
    title: "What lands in your project",
    status: "Star schema",
    rows: [
      ["fact_traffic_daily", "Entrances, pageviews, conversions, revenue"],
      ["fact_conversions", "Conversions and revenue by source"],
      ["fact_pages", "Pageviews by page and content group"],
      ["fact_landing_pages", "Performance by landing page"],
    ],
    foot: "Partitioned by date · clustered · no user identifiers in any table",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      The Sealmetrics BigQuery connector exports your analytics data into a
      BigQuery dataset in your own Google Cloud project. You create a service
      account with the BigQuery Data Editor and Job User roles, upload its JSON
      key in the site&apos;s integration settings, choose the dataset name and an EU
      or US location, and pick a sync frequency: hourly, daily or manual. The
      data arrives as a star schema of fact tables — daily and hourly traffic,
      conversions, microconversions, pages and landing pages — partitioned by date
      and carrying UTM source, medium, campaign, term and content, channel group,
      country and device. Conversions include revenue and their custom properties
      as JSON. You can backfill history on the first run and later. The tables are
      aggregates without user identifiers, so they answer channel and revenue
      questions, not user-level ones. The connector is included in the Growth,
      Scale and Enterprise plans; Google bills storage and queries.
    </p>
  ),

  divergence: {
    tag: "What it exports",
    title: <>Seven data types.<br /><em>One table each.</em></>,
    body: "You choose which data types to sync. Each one maps to a dedicated table with a fixed star-schema name, and every row carries the site's account ID.",
    headers: ["Data type", "Table", "What it holds", "Note"],
    rows: [
      ["Daily traffic", "fact_traffic_daily", "Entrances, engaged entrances, pageviews, microconversions, conversions and revenue by UTM, channel, country, device, browser and OS", "Recommended; partitioned by date, clustered by account, source and country"],
      ["Hourly traffic", "fact_traffic_hourly", "The same traffic metrics, hour by hour", "Optional; 90-day partition expiration and higher storage cost"],
      ["Conversions", "fact_conversions", "Conversion type, count, amount, revenue, attributed UTM and channel, landing page, click ID and custom properties as JSON", "Recommended; clustered by account, conversion type and source"],
      ["Microconversions", "fact_microconversions", "Microconversion events such as add to cart or sign-up", "Recommended"],
      ["Pages", "fact_pages", "Pageviews and entrances by page and content group", "Recommended"],
      ["Landing pages", "fact_landing_pages", "Performance by landing page", "Recommended"],
      ["Account metadata", "dim_accounts", "Site details", "Optional; dim_countries and sync_metadata are always created"],
    ],
    note: (
      <>
        Attribution in the tables is the same{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last-click attribution</Link>{" "}
        as in the dashboard: each conversion carries the source of the session in
        which it happened. The complete schema for every table is shown on the
        integration screen. How that attribution works is covered in{" "}
        <Link className={link} href="/use-cases/revenue-attribution/">campaign revenue attribution</Link>.
      </>
    ),
  },

  costs: {
    tag: "What a GA4 export does not fix",
    title: <>A warehouse copies<br /><em>the gaps it is given.</em></>,
    body: "Teams often move to BigQuery to escape GA4's interface limits. The export solves that, and inherits everything upstream.",
    items: [
      ["01", "The consent gap travels with the data", (
        <>
          The GA4 export contains what GA4 collected. Modelled users and sessions
          from Consent Mode are not available in data exports, so a warehouse sees
          the consented share only. On Incapto&apos;s Shopify store, GA4 did not
          record 29% of visits. Why modelling does not close it is explained in{" "}
          <Link className={link} href="/blog/consent-mode-measured-vs-modelled/">Consent Mode: measured vs modelled</Link>.
        </>
      )],
      ["02", "Standard properties hit a daily ceiling", "Standard GA4 properties have a daily BigQuery export limit of 1 million events. High-traffic stores reach it, and the rest of the day is not exported."],
      ["03", "Event rows have to be rebuilt into reports", "The GA4 export is event-level, so channel, session and revenue reports have to be reassembled in SQL before anyone can use them. The Sealmetrics tables arrive already aggregated by channel and campaign."],
    ],
  },

  method: {
    id: "method",
    tag: "Set up the connector",
    title: <>A service account.<br /><em>One upload.</em></>,
    body: (
      <>
        Part of the work is in Google Cloud and part in Sealmetrics. You own the
        project, the dataset and the retention from the first sync.
      </>
    ),
    howToName: "How to export Sealmetrics data to BigQuery",
    howToDescription:
      "Five steps to connect Sealmetrics to a BigQuery dataset in your own Google Cloud project and run the first sync.",
    steps: [
      { name: "Create a service account and key", text: "In Google Cloud Console, open IAM & Admin → Service Accounts, create an account such as sealmetrics-export, then add a key in JSON format and save the downloaded file securely." },
      { name: "Grant BigQuery permissions", text: "Give the service account the BigQuery Data Editor and BigQuery Job User roles on the project, or a custom role that can create datasets and tables, update table data and create jobs." },
      { name: "Upload the key in Sealmetrics", text: "Open the site in Sealmetrics, go to Site Config → Integrations → BigQuery and upload the JSON key. Sealmetrics checks it is a service account key and fills in the Google Cloud project ID." },
      { name: "Choose dataset, location and sync", text: "Set the dataset name and its location, EU or US, pick hourly, daily or manual sync, select the data types to export and choose how much history to load on the first run." },
      { name: "Create the dataset and run the first sync", text: "Save the configuration, click Setup Dataset if prompted, then Sync Now. The integration screen shows the status, the last sync, the tables created and a history of rows and bytes per run." },
    ],
  },

  examples: {
    tag: "Query it",
    title: <>Four queries<br /><em>to start from.</em></>,
    body: (
      <>
        Taken from the connector documentation. Replace your-project and sealmetrics
        with your project ID and dataset name, and filter on date so each query scans
        only the partitions it needs.
      </>
    ),
    items: [
      { name: "Daily traffic summary", description: "Entrances, pageviews and conversions per day for the last 30 days.", code: SQL_DAILY },
      { name: "Conversion attribution", description: "Conversions, revenue and average order value by source and medium for the last 30 days.", code: SQL_ATTRIBUTION },
      { name: "Traffic by content group", description: "Pageviews and entrances by content group for the last 7 days.", code: SQL_CONTENT },
      { name: "Custom conversion properties", description: "Conversions and revenue broken down by a property sent with each conversion, here customer_type.", code: SQL_PROPERTIES },
    ],
  },

  roles: {
    tag: "Who uses the export",
    title: <>Same tables.<br /><em>Four different jobs.</em></>,
    body: "The connector is for teams whose analysis already lives in the warehouse, next to spend, orders and finance data.",
    items: [
      { role: "Data and analytics", need: "Join analytics with the rest of the warehouse.", how: "Revenue by channel and campaign next to ad spend, CRM stages or product margins, without an ETL job to maintain.", link: { label: "How to measure ROAS after consent", href: "/blog/measure-roas-after-cookie-consent/" } },
      { role: "Finance", need: "Channel revenue beside the ERP.", how: "Conversions and revenue per day in a table finance can reconcile against booked orders.", link: { label: "One number for marketing and finance", href: "/use-cases/single-source-of-truth/" } },
      { role: "Marketing science", need: "Aggregate inputs for models.", how: "Daily outcomes by channel and campaign are the input a marketing mix model or an experiment readout needs, with no user data.", link: { label: "Last-click vs modelled attribution", href: "/blog/last-click-vs-modelled-attribution/" } },
      { role: "BI and agencies", need: "Dashboards in the tool the client uses.", how: "Data Studio, Power BI, Tableau or any BigQuery-compatible tool reads the tables directly.", link: { label: "Campaign revenue attribution", href: "/use-cases/revenue-attribution/" } },
    ],
  },

  proof: {
    tag: "What the tables carry",
    body: "No customer case about the BigQuery connector is published. What the export carries is the same measurement the published cases rely on: on Incapto's store, that base recorded 96% of real Shopify orders before anything else was compared.",
    figures: [
      { value: "96%", label: "of real orders recorded in Incapto's 48-day parallel run, the base the export is built on", client: "Incapto · Shopify", href: "/case-studies/incapto/" },
      { value: "7", label: "data types you can sync, each to its own table, plus two tables always created", client: "Connector documentation", href: "/integrations/bigquery/#method" },
      { value: "1M", label: "events a day: the BigQuery export limit on a standard GA4 property", client: "Google Analytics Help", href: "https://support.google.com/analytics/answer/9358801" },
    ],
    readCase: "Open",
  },

  limits: {
    tag: "What it does not do",
    title: <>Aggregates, not events.<br /><em>By design.</em></>,
    body: (
      <>
        These follow from what Sealmetrics collects. What is and is not stored is
        set out in{" "}
        <Link className={link} href="/gdpr-analytics/">demonstrate compliance</Link>.
      </>
    ),
    items: [
      ["No raw events or users", "The tables are aggregates without user identifiers. User-level paths, cohorts and retention cannot be built from them."],
      ["Last click only", "Conversions carry the source of their own session. There is no multi-touch or data-driven attribution to export."],
      ["Hourly data expires", "The hourly traffic table has a 90-day partition expiration. Use the daily tables for longer history."],
      ["Google bills the warehouse", "Storage and queries are charged by Google Cloud to your project. Filter on date and sync only the data types you need."],
      ["Choose the location first", "The dataset can be created in the EU or the US. Pick the EU location if the data has to stay in the EU."],
      ["Not instant", "Sync runs hourly at most, and recent data can take one to two hours to be processed before it appears."],
    ],
  },

  faqTag: "Common BigQuery questions",
  faqTitle: <>Before you connect<br /><em>your project.</em></>,
  faq: [
    { question: "How do I export Sealmetrics data to BigQuery?", answer: "Create a Google Cloud service account with the BigQuery Data Editor and BigQuery Job User roles and download a JSON key. In Sealmetrics, open Site Config → Integrations → BigQuery, upload the key, choose the dataset name, location, sync frequency and data types, then set up the dataset and run Sync Now." },
    { question: "Which Sealmetrics plans include the BigQuery connector?", answer: "The connector is included in the Growth, Scale and Enterprise plans at no extra charge from Sealmetrics. Google Cloud bills your project directly for BigQuery storage and queries." },
    { question: "What tables does the export create?", answer: "One table per data type you select: fact_traffic_daily, fact_traffic_hourly, fact_conversions, fact_microconversions, fact_pages, fact_landing_pages and dim_accounts. A dim_countries lookup table and a sync_metadata table are always created. Tables use a star schema, partitioned by date." },
    { question: "Does the export include raw events or user-level data?", answer: "No. The tables are aggregates by date, UTM source, medium, campaign, term and content, channel group, country, device, browser and OS, with no user identifiers. Conversions include their count, amount, revenue, landing page, click ID and custom properties as JSON." },
    { question: "How often does it sync, and can I load past data?", answer: "You choose hourly, daily or manual sync. On the first run you can backfill the last 30, 60 or 90 days, a custom number of days or a date range, and you can run larger historical loads later from the backfill card." },
    { question: "Can the data stay in the EU?", answer: "Yes, if you choose the EU location when you configure the dataset; the US location is also available. Sealmetrics' own analytics data is hosted in Dublin, and once data is synced into your project, you control its retention." },
    { question: "How is it different from the GA4 BigQuery export?", answer: "The GA4 export is event-level and contains what GA4 collected: consent-gated data, without Consent Mode's modelled users, and on standard properties up to 1 million events a day. The Sealmetrics export contains aggregates measured on every session, already organised by channel and campaign, with no user-level rows." },
    { question: "What happens to the data if I remove the integration?", answer: "Deleting the integration removes the configuration from Sealmetrics but never deletes data already in your BigQuery project. Sealmetrics only pushes data; the one table with automatic expiry is fact_traffic_hourly, at 90 days." },
  ],

  final: {
    tag: "BigQuery walkthrough",
    title: <>Connect your project.<br /><em>Query complete channel data.</em></>,
    body: "Book 30 minutes with the founder. We connect Sealmetrics to your BigQuery project, run the first sync and write the first query against your own spend or order tables.",
    primary: { label: "Book a BigQuery walkthrough", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const bigqueryEs: ProblemLandingContent = {
  route: "/integrations/bigquery",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Integraciones", href: "/es/integrations/" },
    { label: "BigQuery" },
  ],
  eyebrow: "Integración · BigQuery",
  h1: <>Tu data warehouse solo<br />es tan completo<br /><em>como lo que exportas.</em></>,
  heroBody:
    "Exportar GA4 a BigQuery lleva el mismo dato condicionado por el consentimiento a un data warehouse, sin los usuarios modelados de Consent Mode. El conector de Sealmetrics escribe tráfico, conversiones e ingresos por canal, campaña y creatividad en tu propio proyecto de BigQuery, cada hora o cada día, en tablas listas para consultar dentro de un dataset en la UE o en EE. UU., según elijas.",
  heroPrimary: { label: "Ver la configuración", href: "#method" },
  heroSecondary: { label: "Ver el SQL", href: "#examples" },
  heroMicro: "Growth, Scale y Enterprise · esquema en estrella · sincronización horaria o diaria · tus datos, tu retención",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Publicado",
    date: BIGQUERY_PUBLISHED,
    dateDisplay: "14 de septiembre de 2026",
  },
  module: {
    title: "Lo que llega a tu proyecto",
    status: "Esquema en estrella",
    rows: [
      ["fact_traffic_daily", "Entradas, páginas vistas, conversiones, ingresos"],
      ["fact_conversions", "Conversiones e ingresos por origen"],
      ["fact_pages", "Páginas vistas por página y grupo"],
      ["fact_landing_pages", "Rendimiento por página de llegada"],
    ],
    foot: "Particionado por fecha · agrupado · sin identificadores de usuario en ninguna tabla",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      El conector de BigQuery de Sealmetrics exporta tus datos de analítica a un
      dataset de BigQuery en tu propio proyecto de Google Cloud. Creas una cuenta de
      servicio con los roles BigQuery Data Editor y Job User, subes su clave JSON en
      los ajustes de integración del sitio, eliges el nombre del dataset y su
      ubicación en la UE o en EE. UU., y decides la frecuencia: cada hora, cada día o
      manual. Los datos llegan como un esquema en estrella de tablas de hechos
      —tráfico diario y por horas, conversiones, microconversiones, páginas y páginas
      de llegada—, particionadas por fecha y con UTM source, medium, campaign, term y
      content, grupo de canal, país y dispositivo. Las conversiones incluyen los
      ingresos y sus propiedades en JSON. Puedes cargar histórico en la primera
      sincronización y después. Son agregados sin identificadores de usuario:
      responden preguntas de canal e ingresos, no de usuario. El conector está
      incluido en Growth, Scale y Enterprise; Google cobra almacenamiento y consultas.
    </p>
  ),

  divergence: {
    tag: "Qué exporta",
    title: <>Siete tipos de datos.<br /><em>Una tabla cada uno.</em></>,
    body: "Eliges qué tipos de datos sincronizar. Cada uno va a una tabla propia con un nombre fijo de esquema en estrella, y cada fila lleva el account ID del sitio.",
    headers: ["Tipo de datos", "Tabla", "Qué contiene", "Nota"],
    rows: [
      ["Tráfico diario", "fact_traffic_daily", "Entradas, entradas con interacción, páginas vistas, microconversiones, conversiones e ingresos por UTM, canal, país, dispositivo, navegador y sistema operativo", "Recomendada; particionada por fecha y agrupada por cuenta, origen y país"],
      ["Tráfico por horas", "fact_traffic_hourly", "Las mismas métricas de tráfico, hora a hora", "Opcional; las particiones caducan a los 90 días y el almacenamiento cuesta más"],
      ["Conversiones", "fact_conversions", "Tipo de conversión, número, importe, ingresos, UTM y canal atribuidos, página de llegada, click ID y propiedades en JSON", "Recomendada; agrupada por cuenta, tipo de conversión y origen"],
      ["Microconversiones", "fact_microconversions", "Microconversiones como añadir al carrito o registrarse", "Recomendada"],
      ["Páginas", "fact_pages", "Páginas vistas y entradas por página y grupo de contenido", "Recomendada"],
      ["Páginas de llegada", "fact_landing_pages", "Rendimiento por página de llegada", "Recomendada"],
      ["Metadatos de la cuenta", "dim_accounts", "Datos del sitio", "Opcional; dim_countries y sync_metadata se crean siempre"],
    ],
    note: (
      <>
        La atribución en las tablas es la misma{" "}
        <Link className={link} href="/es/glossary/revenue-attribution/">atribución de ingresos</Link>{" "}
        a último clic que en el dashboard: cada conversión lleva el origen de la sesión
        en la que ocurrió. El esquema completo de cada tabla se muestra en la pantalla
        de la integración. Cómo funciona esa atribución se explica en{" "}
        <Link className={link} href="/es/use-cases/revenue-attribution/">atribución de ingresos por campaña</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que no arregla exportar GA4",
    title: <>Un data warehouse copia<br /><em>los huecos que recibe.</em></>,
    body: "Muchos equipos pasan a BigQuery para escapar de los límites de la interfaz de GA4. La exportación resuelve eso, y hereda todo lo que viene de antes.",
    items: [
      ["01", "El hueco del consentimiento viaja con el dato", (
        <>
          La exportación de GA4 contiene lo que GA4 recogió. Los usuarios y sesiones
          modelados por Consent Mode no están disponibles en las exportaciones, así que
          el data warehouse solo ve la parte con consentimiento. En la tienda Shopify de
          Incapto, GA4 no registró el 29% de las visitas. Por qué el modelado no lo
          cierra se explica en{" "}
          <Link className={link} href="/es/blog/consent-mode-measured-vs-modelled/">Consent Mode: qué mide GA4 y qué modela</Link>.
        </>
      )],
      ["02", "Las propiedades estándar tienen un techo diario", "Las propiedades estándar de GA4 tienen un límite de exportación diaria a BigQuery de 1 millón de eventos. Las tiendas con mucho tráfico lo alcanzan, y el resto del día no se exporta."],
      ["03", "Las filas de eventos hay que convertirlas en informes", "La exportación de GA4 es a nivel de evento, así que los informes de canal, sesión e ingresos hay que reconstruirlos en SQL antes de poder usarlos. Las tablas de Sealmetrics llegan ya agregadas por canal y campaña."],
    ],
  },

  method: {
    id: "method",
    tag: "Configura el conector",
    title: <>Una cuenta de servicio.<br /><em>Una subida.</em></>,
    body: (
      <>
        Una parte del trabajo es en Google Cloud y otra en Sealmetrics. El proyecto, el
        dataset y la retención son tuyos desde la primera sincronización.
      </>
    ),
    howToName: "Cómo exportar datos de Sealmetrics a BigQuery",
    howToDescription:
      "Cinco pasos para conectar Sealmetrics a un dataset de BigQuery en tu propio proyecto de Google Cloud y lanzar la primera sincronización.",
    steps: [
      { name: "Crea una cuenta de servicio y su clave", text: "En Google Cloud Console, abre IAM y administración → Cuentas de servicio, crea una cuenta como sealmetrics-export, añade una clave en formato JSON y guarda el archivo descargado en un lugar seguro." },
      { name: "Da permisos de BigQuery", text: "Asigna a la cuenta de servicio los roles BigQuery Data Editor y BigQuery Job User en el proyecto, o un rol personalizado que pueda crear datasets y tablas, actualizar datos de tablas y crear jobs." },
      { name: "Sube la clave en Sealmetrics", text: "Abre el sitio en Sealmetrics, ve a Site Config → Integrations → BigQuery y sube la clave JSON. Sealmetrics comprueba que es una clave de cuenta de servicio y rellena el ID del proyecto de Google Cloud." },
      { name: "Elige dataset, ubicación y sincronización", text: "Define el nombre del dataset y su ubicación, UE o EE. UU., elige sincronización horaria, diaria o manual, selecciona los tipos de datos que exportar y cuánto histórico cargar en la primera ejecución." },
      { name: "Crea el dataset y lanza la primera sincronización", text: "Guarda la configuración, pulsa Setup Dataset si te lo pide y después Sync Now. La pantalla de la integración muestra el estado, la última sincronización, las tablas creadas y un historial de filas y bytes por ejecución." },
    ],
  },

  examples: {
    tag: "Consúltalo",
    title: <>Cuatro consultas<br /><em>para empezar.</em></>,
    body: (
      <>
        Tomadas de la documentación del conector. Sustituye your-project y sealmetrics
        por tu ID de proyecto y el nombre del dataset, y filtra siempre por fecha para
        que cada consulta lea solo las particiones que necesita.
      </>
    ),
    items: [
      { name: "Resumen diario de tráfico", description: "Entradas, páginas vistas y conversiones por día en los últimos 30 días.", code: SQL_DAILY },
      { name: "Atribución de conversiones", description: "Conversiones, ingresos y ticket medio por source y medium en los últimos 30 días.", code: SQL_ATTRIBUTION },
      { name: "Tráfico por grupo de contenido", description: "Páginas vistas y entradas por grupo de contenido en los últimos 7 días.", code: SQL_CONTENT },
      { name: "Propiedades de conversión", description: "Conversiones e ingresos desglosados por una propiedad enviada con cada conversión, aquí customer_type.", code: SQL_PROPERTIES },
    ],
  },

  roles: {
    tag: "Quién usa la exportación",
    title: <>Las mismas tablas.<br /><em>Cuatro trabajos distintos.</em></>,
    body: "El conector es para equipos cuyo análisis ya vive en el data warehouse, junto a la inversión, los pedidos y los datos de finanzas.",
    items: [
      { role: "Datos y analítica", need: "Cruzar la analítica con el resto del data warehouse.", how: "Ingresos por canal y campaña junto a la inversión publicitaria, las fases del CRM o los márgenes de producto, sin un proceso ETL que mantener.", link: { label: "Cómo medir el ROAS tras el consentimiento", href: "/es/blog/measure-roas-after-cookie-consent/" } },
      { role: "Finanzas", need: "Ingresos por canal junto al ERP.", how: "Conversiones e ingresos por día en una tabla que finanzas puede conciliar con los pedidos contabilizados.", link: { label: "Una cifra para marketing y finanzas", href: "/es/use-cases/single-source-of-truth/" } },
      { role: "Marketing science", need: "Datos agregados para modelos.", how: "Los resultados diarios por canal y campaña son lo que necesita un marketing mix model o la lectura de un experimento, sin datos de usuario.", link: { label: "Último clic frente a atribución modelada", href: "/es/blog/last-click-vs-modelled-attribution/" } },
      { role: "BI y agencias", need: "Dashboards en la herramienta que usa el cliente.", how: "Data Studio, Power BI, Tableau o cualquier herramienta compatible con BigQuery lee las tablas directamente.", link: { label: "Atribución de ingresos por campaña", href: "/es/use-cases/revenue-attribution/" } },
    ],
  },

  proof: {
    tag: "Lo que llevan las tablas",
    body: "No hay publicado ningún caso de cliente sobre el conector de BigQuery. Lo que lleva la exportación es la misma medición en la que se apoyan los casos publicados: en la tienda de Incapto, esa base registró el 96% de los pedidos reales de Shopify antes de comparar nada más.",
    figures: [
      { value: "96%", label: "de los pedidos reales registrados en la medición en paralelo de Incapto, 48 días, la base sobre la que se construye la exportación", client: "Incapto · Shopify", href: "/es/case-studies/incapto/" },
      { value: "7", label: "tipos de datos que puedes sincronizar, cada uno en su tabla, más dos tablas que se crean siempre", client: "Documentación del conector", href: "/es/integrations/bigquery/#method" },
      { value: "1M", label: "de eventos al día: el límite de exportación a BigQuery de una propiedad estándar de GA4", client: "Ayuda de Google Analytics", href: "https://support.google.com/analytics/answer/9358801" },
    ],
    readCase: "Abrir",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Agregados, no eventos.<br /><em>Por diseño.</em></>,
    body: (
      <>
        Se derivan de lo que recoge Sealmetrics. Qué se guarda y qué no está en{" "}
        <Link className={link} href="/es/gdpr-analytics/">demostrar cumplimiento</Link>.
      </>
    ),
    items: [
      ["Ni eventos en bruto ni usuarios", "Las tablas son agregados sin identificadores de usuario. Con ellas no se pueden construir recorridos por usuario, cohortes ni retención."],
      ["Solo último clic", "Las conversiones llevan el origen de su propia sesión. No hay atribución multi-touch ni basada en datos que exportar."],
      ["El dato por horas caduca", "La tabla de tráfico por horas tiene particiones que caducan a los 90 días. Usa las tablas diarias para histórico largo."],
      ["Google cobra el data warehouse", "El almacenamiento y las consultas los cobra Google Cloud a tu proyecto. Filtra por fecha y sincroniza solo los tipos de datos que necesites."],
      ["Elige antes la ubicación", "El dataset puede crearse en la UE o en EE. UU. Elige la UE si los datos tienen que quedarse en la UE."],
      ["No es instantáneo", "La sincronización es como mucho cada hora, y los datos recientes pueden tardar una o dos horas en procesarse antes de aparecer."],
    ],
  },

  faqTag: "Preguntas frecuentes sobre BigQuery",
  faqTitle: <>Antes de conectar<br /><em>tu proyecto.</em></>,
  faq: [
    { question: "¿Cómo exporto los datos de Sealmetrics a BigQuery?", answer: "Crea una cuenta de servicio de Google Cloud con los roles BigQuery Data Editor y BigQuery Job User y descarga una clave JSON. En Sealmetrics, abre Site Config → Integrations → BigQuery, sube la clave, elige el nombre del dataset, la ubicación, la frecuencia y los tipos de datos, crea el dataset y lanza Sync Now." },
    { question: "¿Qué planes de Sealmetrics incluyen el conector de BigQuery?", answer: "El conector está incluido en los planes Growth, Scale y Enterprise sin coste adicional por parte de Sealmetrics. Google Cloud cobra directamente a tu proyecto el almacenamiento y las consultas de BigQuery." },
    { question: "¿Qué tablas crea la exportación?", answer: "Una tabla por cada tipo de datos que selecciones: fact_traffic_daily, fact_traffic_hourly, fact_conversions, fact_microconversions, fact_pages, fact_landing_pages y dim_accounts. Siempre se crean además la tabla de consulta dim_countries y la tabla sync_metadata. Siguen un esquema en estrella, particionado por fecha." },
    { question: "¿La exportación incluye eventos en bruto o datos por usuario?", answer: "No. Las tablas son agregados por fecha, UTM source, medium, campaign, term y content, grupo de canal, país, dispositivo, navegador y sistema operativo, sin identificadores de usuario. Las conversiones incluyen número, importe, ingresos, página de llegada, click ID y propiedades en JSON." },
    { question: "¿Cada cuánto sincroniza y puedo cargar datos pasados?", answer: "Eliges sincronización horaria, diaria o manual. En la primera ejecución puedes cargar los últimos 30, 60 o 90 días, un número de días a medida o un rango de fechas, y más adelante puedes lanzar cargas históricas mayores desde la tarjeta de backfill." },
    { question: "¿Los datos pueden quedarse en la UE?", answer: "Sí, si eliges la ubicación UE al configurar el dataset; también está disponible EE. UU. Los datos de analítica de Sealmetrics se alojan en Dublín, y una vez sincronizados en tu proyecto, la retención la controlas tú." },
    { question: "¿En qué se diferencia de la exportación de GA4 a BigQuery?", answer: "La exportación de GA4 es a nivel de evento y contiene lo que GA4 recogió: dato condicionado por el consentimiento, sin los usuarios modelados de Consent Mode, y en propiedades estándar hasta 1 millón de eventos al día. La de Sealmetrics contiene agregados medidos en cada sesión, ya organizados por canal y campaña, sin filas por usuario." },
    { question: "¿Qué pasa con los datos si elimino la integración?", answer: "Eliminar la integración borra la configuración en Sealmetrics, pero nunca los datos que ya están en tu proyecto de BigQuery. Sealmetrics solo envía datos; la única tabla con caducidad automática es fact_traffic_hourly, a los 90 días." },
  ],

  final: {
    tag: "Revisión de BigQuery",
    title: <>Conecta tu proyecto.<br /><em>Consulta el dato de canal completo.</em></>,
    body: "Reserva 30 minutos con el founder. Conectamos Sealmetrics a tu proyecto de BigQuery, lanzamos la primera sincronización y escribimos la primera consulta contra tus propias tablas de inversión o de pedidos.",
    primary: { label: "Reservar una revisión de BigQuery", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
