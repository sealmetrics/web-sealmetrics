import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /integrations/meta-ads — Phase 5 of CONTENT-PLAN-PROBLEM-POSITIONING.md (new page).
 * Same shape as /integrations/google-ads: the limitation first (no conversions
 * sent to Meta, no Conversions API, no spend import), then how tagged clicks are
 * measured. The reconciliation argument lives in /blog/meta-ads-conversions-vs-crm;
 * this page links to it rather than repeating it.
 *
 * Sources (checked 15 Sep 2026):
 * - docs.sealmetrics.com reports/insights/how-to-track-social-ads-campaigns:
 *   UTMs must be added to ad URLs; without them paid and organic Meta traffic
 *   blend and campaign, ad set and creative reporting disappears; add
 *   utm_source, utm_medium and utm_campaign, plus utm_term or utm_content for ad
 *   sets or creatives; consistent lowercase naming; example structure.
 * - docs web-analytics-prompts/meta-ads: spend from a Meta Ads MCP connection,
 *   revenue and conversions from Sealmetrics matched on utm_campaign +
 *   utm_source (facebook|instagram) + utm_medium (paidsocial|cpc); utm_content
 *   for creative and placement analysis; the iOS gap compared by device.
 * - docs reports/insights/how-to-track-google-ads-campaigns (UTMs read from the
 *   landing URL; redirects strip parameters; UTM Mappings for custom names).
 * - Meta for Developers, "Deduplicate pixel and server events" (event_id and
 *   event name, 48 hours) — cited only in the FAQ about the Conversions API.
 * - Meta's URL Parameters field and dynamic parameters ({{campaign.name}},
 *   {{adset.name}}, {{ad.name}}) are widely documented; Meta's Help Center could
 *   not be fetched, so the page tells readers to use Meta's own parameter builder
 *   and to check the resolved URL.
 * Not claimed: that an fbclid alone is classified as paid (Meta appends it to
 * organic links too), specific Meta attribution windows (changed in 2026), bot
 * classification, or an official Meta MCP server.
 */

export const META_ADS_PUBLISHED = "2026-09-15";

const link = "sig-problem-inline";

const PARAMS = `utm_source=facebook&utm_medium=paidsocial&utm_campaign={{campaign.name}}&utm_term={{adset.name}}&utm_content={{ad.name}}`;
const PARAMS_IG = `utm_source=instagram&utm_medium=paidsocial&utm_campaign={{campaign.name}}&utm_term={{adset.name}}&utm_content={{ad.name}}`;
const EXAMPLE_URL = `https://yourwebsite.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=summer_sale&utm_term=running_shoes`;

export const metaAdsEn: ProblemLandingContent = {
  route: "/integrations/meta-ads",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Integrations", href: "/integrations/" },
    { label: "Meta Ads" },
  ],
  eyebrow: "Integration · Meta Ads",
  h1: <>Meta reports<br />what it credits.<br /><em>Measure what arrived.</em></>,
  heroBody:
    "Sealmetrics does not send conversions to Meta and does not replace the pixel or the Conversions API: bidding keeps running on them. What it does is read the UTMs of every Meta ad click from the landing page, whether or not the visitor accepts the banner, and credit conversions and revenue to the campaign, ad set and ad that brought the session, so Meta's reported results can be set beside a figure Meta does not produce.",
  heroPrimary: { label: "See the setup", href: "#method" },
  heroSecondary: { label: "See the parameters", href: "#examples" },
  heroMicro: "URL parameters with UTMs · Facebook and Instagram · no conversions sent to Meta · no cookies",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Published",
    date: META_ADS_PUBLISHED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "What each click should carry",
    status: "Set in the ad",
    rows: [
      ["utm_source", "facebook or instagram"],
      ["utm_medium", "paidsocial or cpc"],
      ["utm_campaign", "The campaign"],
      ["utm_term · utm_content", "Ad set · ad or creative"],
    ],
    foot: "Read server-side from the landing URL · no cookie · no identifier",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Sealmetrics works with Meta Ads through the landing page URL. You add UTM
      parameters to every ad in Meta&apos;s URL Parameters field: utm_source set to
      facebook or instagram, utm_medium to paidsocial or cpc, utm_campaign to the
      campaign, and utm_term and utm_content to the ad set and the ad. Sealmetrics
      reads those values server-side from the URL of each tagged visit, without cookies,
      and credits each conversion and its revenue to the campaign, ad set and ad of
      the session in which it happens, by last click. Without UTMs, paid and organic
      traffic from Meta blend together, because a Meta referrer alone does not say
      whether the click was an ad. Sealmetrics does not send conversions to Meta,
      does not replace the pixel or the Conversions API and does not store ad spend,
      so Meta keeps optimising on its own data.
    </p>
  ),

  divergence: {
    tag: "Two views of the same ad set",
    title: <>Meta reports the results it credits.<br /><em>Sealmetrics reports the sessions that arrived.</em></>,
    body: "Neither is wrong. They count different things, and reading the gap between them is the point of running both.",
    headers: ["Question", "Meta Ads Manager", "Sealmetrics", "Why they differ"],
    rows: [
      ["How many people came?", "Link clicks", "Entrances carrying the ad's UTMs", "Clicks that never load the page, in-app browsers closed early, parameters lost in redirects"],
      ["How many converted?", "Results credited under the ad set's attribution setting", "Conversions in sessions that arrived from the ad", "Credit after views and engagement, modelled conversions, duplicate pixel and server events"],
      ["Who gets the credit?", "Meta's own ads only", "The channel of the converting session, across every channel", "Meta does not see Google or email; Sealmetrics does not see views"],
      ["Which campaign, ad set and ad?", "Names and IDs in Ads Manager", "Whatever the UTMs carry", "Only what the URL parameters pass"],
      ["Paid or organic?", "Paid only", "Paid when the UTMs say so", "Without UTMs, ad clicks and organic posts from Meta look alike"],
      ["What did it cost?", "Amount spent", "Not stored", "Spend is joined from Meta when you calculate ROAS"],
    ],
    note: (
      <>
        Why Meta and your CRM or order system never match, and a weekly method to
        reconcile them, is in{" "}
        <Link className={link} href="/blog/meta-ads-conversions-vs-crm/">Meta Ads conversions vs CRM</Link>.
        The attribution rule is{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last-click attribution</Link>{" "}
        within the session.
      </>
    ),
  },

  costs: {
    tag: "What judging Meta on its own report hides",
    title: <>Meta optimises<br /><em>the view it is given.</em></>,
    body: "That is what the pixel and the Conversions API are for. The risk is using the same figure to decide how much Meta should get against every other channel.",
    items: [
      ["01", "Views and engagement count as results", "Depending on the ad set's attribution setting, Meta credits conversions after an ad was seen or engaged with, not only clicked. Those orders are real, but nothing in the visit that produced them points to Meta."],
      ["02", "Consent-gated analytics shrinks social", (
        <>
          On Incapto&apos;s Shopify store, Sealmetrics recorded 133% more organic
          social traffic than GA4 and 37–52% more from paid campaigns over the same
          days. Judged in GA4, social starts from a far smaller base than the one that
          exists; the mechanism is in{" "}
          <Link className={link} href="/blog/consent-mode-measured-vs-modelled/">Consent Mode: measured vs modelled</Link>.
        </>
      )],
      ["03", "Untagged ads disappear into organic", "Meta traffic often arrives with little referrer information. Without UTMs, Sealmetrics cannot reliably separate an ad click from an organic post, so campaign, ad set and creative reporting is lost."],
    ],
  },

  method: {
    id: "method",
    tag: "Set it up",
    title: <>URL parameters<br /><em>on every ad.</em></>,
    body: (
      <>
        The work is in Meta Ads Manager, not in Sealmetrics. Agree a naming
        convention first, because the reports will only be as readable as the names
        you pass.
      </>
    ),
    howToName: "How to track Meta Ads campaigns in Sealmetrics",
    howToDescription:
      "Five steps to tag Meta Ads with UTM parameters and confirm that campaigns, ad sets and ads reach Sealmetrics.",
    steps: [
      { name: "Agree the naming convention", text: "Decide the values once: utm_source facebook or instagram, utm_medium paidsocial or cpc, and lowercase campaign, ad set and ad names without spaces. Consistent names are what make the reports comparable month to month." },
      { name: "Add the URL parameters to each ad", text: "In Meta Ads Manager, open the ad, find the URL Parameters field under the destination and add utm_source, utm_medium and utm_campaign, plus utm_term for the ad set and utm_content for the ad or creative. Meta's parameter builder can insert campaign, ad set and ad names dynamically." },
      { name: "Check the resolved URL", text: "Preview the ad and open its link, or use Meta's URL preview, and check that the landing page URL carries the parameters with real names filled in, not placeholders." },
      { name: "Confirm the hit in Sealmetrics", text: "Load a tagged URL on your site. The Last hit timestamp in Overview should read seconds ago, and the Sources report should show your medium, facebook or instagram as the source, the campaign under Campaigns and the ad set under Terms." },
      { name: "Check redirects and parameter names", text: "Open a live ad link and look at the address bar after every redirect: the parameters must still be there. If your team uses other parameter names, map them in Settings → Sites → UTM Mappings instead of retagging every ad." },
    ],
  },

  examples: {
    tag: "The parameters",
    title: <>Paste into<br /><em>URL Parameters.</em></>,
    body: (
      <>
        The UTM values follow the conventions in the Sealmetrics documentation. The
        placeholders in double braces are Meta dynamic parameters; if your account
        uses different names, build the string with Meta&apos;s own parameter builder
        and keep the same UTM keys.
      </>
    ),
    items: [
      { name: "Facebook placements", description: "Campaign, ad set and ad names passed dynamically, with facebook as the source.", code: PARAMS },
      { name: "Instagram placements", description: "The same pattern with instagram as the source, for ads you report separately.", code: PARAMS_IG },
      { name: "Resolved URL", description: "The structure from the Sealmetrics documentation, for a smoke test without waiting for a real click.", code: EXAMPLE_URL },
    ],
  },

  roles: {
    tag: "What stays, what changes",
    title: <>Meta keeps optimising.<br /><em>The budget decision moves.</em></>,
    body: "Nothing in the Meta account is replaced. What changes is which figure decides how much Meta gets against the other channels.",
    items: [
      { role: "Pixel and Conversions API", need: "Stay: conversions for Meta's delivery.", how: "Meta keeps optimising on the events it receives, behind your consent setup. Sealmetrics does not send it any.", link: { label: "Meta Ads conversions vs CRM", href: "/blog/meta-ads-conversions-vs-crm/" } },
      { role: "Paid social manager", need: "Ad sets and creatives on measured revenue.", how: "utm_term and utm_content carry the ad set and the ad, so revenue per creative can be read without consent loss.", link: { label: "Campaign revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "CMO and finance", need: "Meta against every other channel.", how: "One last-click rule for all traffic, checked against real orders, instead of each platform's own credit.", link: { label: "One number for marketing and finance", href: "/use-cases/single-source-of-truth/" } },
      { role: "Analysts", need: "Spend and revenue in one table.", how: "Join Meta spend with Sealmetrics revenue on utm_campaign in BigQuery, or ask an AI assistant connected to both.", link: { label: "BigQuery export", href: "/integrations/bigquery/" } },
    ],
  },

  proof: {
    tag: "Measured on paid social",
    quote: {
      text: "The value is in optimising budget and investment. You shift toward a channel or strategy you were not seeing before.",
      cite: "Eduardo Martin · Analytics & Campaigns · Dreamplace Hotels",
      person: "Eduardo Martin",
      role: "Analytics & Campaigns, Dreamplace Hotels",
    },
    body: "Dreamplace checks the sales Sealmetrics attributes against its CRM total, and Meta and Google were the first budgets it moved. Incapto's parallel run shows how much smaller social looks when it is measured only on consenting visitors.",
    figures: [
      { value: "15–20%", label: "more sales attributed than the previous tool; Meta and Google were the first budgets moved", client: "Dreamplace Hotels", href: "/case-studies/dreamplace-hotels/" },
      { value: "+133%", label: "more organic social traffic recorded by Sealmetrics than by GA4 over the same days", client: "Incapto", href: "/case-studies/incapto/" },
      { value: "62%", label: "paid campaigns' share of traffic measured without consent loss, against 50% in GA4", client: "Incapto", href: "/case-studies/incapto/" },
    ],
    readCase: "Read the case",
  },

  limits: {
    tag: "What it does not do",
    title: <>A measurement layer.<br /><em>Not a delivery signal.</em></>,
    body: (
      <>
        These are deliberate. The same pattern for Google is on{" "}
        <Link className={link} href="/integrations/google-ads/">Sealmetrics for Google Ads</Link>.
      </>
    ),
    items: [
      ["No conversions sent to Meta", "Sealmetrics does not replace the pixel or the Conversions API, so Meta's delivery and optimisation keep running on the events it receives."],
      ["No spend import", "Amount spent is not stored in Sealmetrics. Join it from Meta in a spreadsheet, in BigQuery or through an AI assistant connected to both."],
      ["UTMs are required", "Without them, paid and organic Meta traffic blend, and campaign, ad set and creative reporting is not available."],
      ["No view-through", "Last click per session: ads that were seen but not clicked, and earlier sessions, get no credit."],
      ["Names are whatever you pass", "Reports show the values in the URL. Inconsistent or default names in Meta make the reports hard to read."],
      ["Parameters must reach the page", "Anything dropped by a redirect or a link shortener before the tracker fires is gone for good."],
    ],
  },

  faqTag: "Common Meta Ads questions",
  faqTitle: <>Before you tag<br /><em>your ads.</em></>,
  faq: [
    { question: "How do I track Meta Ads campaigns in Sealmetrics?", answer: "Add UTM parameters to every ad in Meta Ads Manager's URL Parameters field: utm_source facebook or instagram, utm_medium paidsocial or cpc, utm_campaign for the campaign, and utm_term and utm_content for the ad set and ad. Check the resolved URL, load it on your site and confirm the values in the Sources report." },
    { question: "Does Sealmetrics send conversions to Meta or replace the Conversions API?", answer: "No. Sealmetrics does not send conversions to Meta, so it does not affect delivery or optimisation. Keep the Meta pixel and the Conversions API for Meta, and use Sealmetrics to measure revenue by campaign, ad set and ad without consent loss when you decide budget between channels." },
    { question: "Why does Meta report more conversions than Sealmetrics?", answer: "Meta credits results under each ad set's attribution setting, which can include conversions after a view or engagement, and it models part of what it cannot observe. Duplicate pixel and server events inflate it further when they do not share an event ID. Sealmetrics counts conversions in sessions that arrived from the ad." },
    { question: "Can Sealmetrics tell paid from organic Facebook and Instagram traffic?", answer: "Yes, when the ads carry UTMs. Meta traffic often arrives with little referrer information, and Meta also adds click identifiers to organic links, so without UTMs Sealmetrics cannot reliably separate an ad click from an organic post." },
    { question: "Can I see revenue by ad set and creative?", answer: "Yes, if utm_term and utm_content carry the ad set and the ad or creative. Sealmetrics reports conversions and revenue by those values, and the BigQuery export includes utm_term and utm_content on every conversion row." },
    { question: "How do I calculate Meta Ads ROAS with Sealmetrics?", answer: "Take amount spent per campaign from Meta and revenue per utm_campaign from Sealmetrics for the same dates, timezone and currency, and divide. Compare it with the ROAS Meta reports: Meta's figure is for its own optimisation, the measured one for budget between channels." },
    { question: "Does iOS affect what Sealmetrics measures from Meta ads?", answer: "Sealmetrics reads UTMs from the landing page, so a tagged click from an iOS device is measured like any other visit. Meta's own reporting relies partly on modelling where it cannot observe conversions, which is why the Sealmetrics prompt library compares Meta and Sealmetrics conversions by device." },
    { question: "Does tagging Meta ads require cookie consent for Sealmetrics?", answer: "The UTMs travel in the URL and Sealmetrics sets no cookie to read them. The Meta pixel still needs consent, and whether your analytics configuration is exempt depends on your national authority's criteria." },
  ],

  final: {
    tag: "Meta Ads review",
    title: <>Tag your ads.<br /><em>See revenue by ad set and creative.</em></>,
    body: "Book 30 minutes with the founder. We agree the naming convention, confirm the first tagged hits and set Sealmetrics revenue beside your Meta spend for last month.",
    primary: { label: "Book a Meta Ads review", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const metaAdsEs: ProblemLandingContent = {
  route: "/integrations/meta-ads",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Integraciones", href: "/es/integrations/" },
    { label: "Meta Ads" },
  ],
  eyebrow: "Integración · Meta Ads",
  h1: <>Meta reporta<br />lo que se acredita.<br /><em>Mide lo que llegó.</em></>,
  heroBody:
    "Sealmetrics no envía conversiones a Meta ni sustituye al píxel o a la API de conversiones: la entrega de anuncios sigue funcionando con ellos. Lo que hace es leer las UTM de cada clic en un anuncio de Meta en la página de llegada, acepte o no el visitante el banner, y acreditar conversiones e ingresos a la campaña, el conjunto de anuncios y el anuncio que trajeron la sesión, para poner los resultados de Meta junto a una cifra que Meta no produce.",
  heroPrimary: { label: "Ver la configuración", href: "#method" },
  heroSecondary: { label: "Ver los parámetros", href: "#examples" },
  heroMicro: "Parámetros de URL con UTM · Facebook e Instagram · sin conversiones enviadas a Meta · sin cookies",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Publicado",
    date: META_ADS_PUBLISHED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Lo que debe llevar cada clic",
    status: "Se define en el anuncio",
    rows: [
      ["utm_source", "facebook o instagram"],
      ["utm_medium", "paidsocial o cpc"],
      ["utm_campaign", "La campaña"],
      ["utm_term · utm_content", "Conjunto · anuncio o creatividad"],
    ],
    foot: "Leído en servidor desde la URL de llegada · sin cookie · sin identificador",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      Sealmetrics funciona con Meta Ads a través de la URL de la página de llegada.
      Añades parámetros UTM a cada anuncio en el campo Parámetros de URL de Meta:
      utm_source con facebook o instagram, utm_medium con paidsocial o cpc,
      utm_campaign con la campaña, y utm_term y utm_content con el conjunto de
      anuncios y el anuncio. Sealmetrics lee esos valores en servidor desde la URL de
      cada visita etiquetada, sin cookies, y acredita cada conversión y sus ingresos a la campaña,
      el conjunto y el anuncio de la sesión en la que ocurre, a último clic. Sin UTM,
      el tráfico de pago y el orgánico de Meta se mezclan, porque un referrer de Meta
      por sí solo no dice si el clic era de un anuncio. Sealmetrics no envía
      conversiones a Meta, no sustituye al píxel ni a la API de conversiones y no
      guarda la inversión, así que Meta sigue optimizando con sus propios datos.
    </p>
  ),

  divergence: {
    tag: "Dos visiones del mismo conjunto de anuncios",
    title: <>Meta reporta los resultados que se acredita.<br /><em>Sealmetrics, las sesiones que llegaron.</em></>,
    body: "Ninguna está mal. Cuentan cosas distintas, y leer la diferencia entre ellas es precisamente para lo que sirve tener las dos.",
    headers: ["Pregunta", "Administrador de anuncios de Meta", "Sealmetrics", "Por qué difieren"],
    rows: [
      ["¿Cuánta gente vino?", "Clics en el enlace", "Entradas con las UTM del anuncio", "Clics que no llegan a cargar la página, navegadores de la app cerrados antes, parámetros perdidos en redirecciones"],
      ["¿Cuántos convirtieron?", "Resultados acreditados según la configuración de atribución del conjunto", "Conversiones en sesiones que llegaron desde el anuncio", "Mérito tras visualizaciones e interacciones, conversiones modeladas, eventos duplicados de píxel y servidor"],
      ["¿Quién se lleva el mérito?", "Solo los anuncios de Meta", "El canal de la sesión que convierte, entre todos los canales", "Meta no ve Google ni el email; Sealmetrics no ve las visualizaciones"],
      ["¿Qué campaña, conjunto y anuncio?", "Nombres e IDs en el Administrador de anuncios", "Lo que lleven las UTM", "Solo lo que pasen los parámetros de URL"],
      ["¿De pago u orgánico?", "Solo de pago", "De pago cuando lo dicen las UTM", "Sin UTM, los clics en anuncios y en publicaciones orgánicas de Meta se parecen"],
      ["¿Cuánto costó?", "Importe gastado", "No se guarda", "La inversión se cruza desde Meta al calcular el ROAS"],
    ],
    note: (
      <>
        Por qué Meta y tu CRM o sistema de pedidos nunca cuadran, y un método semanal
        para conciliarlos, está en{" "}
        <Link className={link} href="/es/blog/meta-ads-conversions-vs-crm/">conversiones de Meta Ads frente al CRM</Link>.
        La atribución de ingresos se explica en{" "}
        <Link className={link} href="/es/glossary/revenue-attribution/">atribución de ingresos</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que esconde juzgar Meta con su propio informe",
    title: <>Meta optimiza<br /><em>la visión que recibe.</em></>,
    body: "Para eso están el píxel y la API de conversiones. El riesgo es usar esa misma cifra para decidir cuánto recibe Meta frente a todos los demás canales.",
    items: [
      ["01", "Visualizaciones e interacciones cuentan como resultados", "Según la configuración de atribución del conjunto de anuncios, Meta acredita conversiones tras ver o interactuar con un anuncio, no solo tras pulsarlo. Son pedidos reales, pero nada en la visita que los produjo apunta a Meta."],
      ["02", "La analítica con consentimiento encoge las redes", (
        <>
          En la tienda Shopify de Incapto, Sealmetrics registró un 133% más de tráfico
          social orgánico que GA4 y entre un 37% y un 52% más desde campañas de pago en
          los mismos días. Juzgadas en GA4, las redes parten de una base mucho menor que
          la real; el mecanismo está en{" "}
          <Link className={link} href="/es/blog/consent-mode-measured-vs-modelled/">Consent Mode: qué mide GA4 y qué modela</Link>.
        </>
      )],
      ["03", "Los anuncios sin etiquetar desaparecen en el orgánico", "El tráfico de Meta llega a menudo con poca información de referrer. Sin UTM, Sealmetrics no puede separar con fiabilidad un clic en un anuncio de una publicación orgánica, y se pierden los informes por campaña, conjunto y creatividad."],
    ],
  },

  method: {
    id: "method",
    tag: "Configúralo",
    title: <>Parámetros de URL<br /><em>en cada anuncio.</em></>,
    body: (
      <>
        El trabajo está en el Administrador de anuncios de Meta, no en Sealmetrics.
        Acordad antes una convención de nombres, porque los informes solo serán tan
        legibles como los nombres que paséis.
      </>
    ),
    howToName: "Cómo medir campañas de Meta Ads en Sealmetrics",
    howToDescription:
      "Cinco pasos para etiquetar los anuncios de Meta con parámetros UTM y comprobar que campañas, conjuntos y anuncios llegan a Sealmetrics.",
    steps: [
      { name: "Acordad la convención de nombres", text: "Decidid los valores una vez: utm_source facebook o instagram, utm_medium paidsocial o cpc, y nombres de campaña, conjunto y anuncio en minúsculas y sin espacios. Unos nombres coherentes son lo que hace comparables los informes de un mes a otro." },
      { name: "Añade los parámetros de URL a cada anuncio", text: "En el Administrador de anuncios, abre el anuncio, busca el campo Parámetros de URL junto al destino y añade utm_source, utm_medium y utm_campaign, más utm_term para el conjunto y utm_content para el anuncio o la creatividad. El generador de parámetros de Meta puede insertar dinámicamente los nombres de campaña, conjunto y anuncio." },
      { name: "Comprueba la URL resuelta", text: "Previsualiza el anuncio y abre su enlace, o usa la vista previa de URL de Meta, y comprueba que la URL de la página de llegada lleva los parámetros con los nombres reales, no con los marcadores." },
      { name: "Confirma el hit en Sealmetrics", text: "Carga una URL etiquetada en tu web. La marca Last hit de Overview debe decir hace unos segundos, y el informe Sources debe mostrar tu medium, facebook o instagram como source, la campaña en Campaigns y el conjunto de anuncios en Terms." },
      { name: "Revisa redirecciones y nombres de parámetros", text: "Abre el enlace de un anuncio real y mira la barra de direcciones tras cada redirección: los parámetros tienen que seguir ahí. Si tu equipo usa otros nombres de parámetro, asígnalos en Settings → Sites → UTM Mappings en lugar de volver a etiquetar cada anuncio." },
    ],
  },

  examples: {
    tag: "Los parámetros",
    title: <>Pégalos en<br /><em>Parámetros de URL.</em></>,
    body: (
      <>
        Los valores de las UTM siguen las convenciones de la documentación de
        Sealmetrics. Lo que va entre dobles llaves son parámetros dinámicos de Meta; si
        tu cuenta usa otros nombres, construye la cadena con el generador de parámetros
        de Meta y mantén las mismas claves UTM.
      </>
    ),
    items: [
      { name: "Ubicaciones de Facebook", description: "Nombres de campaña, conjunto y anuncio pasados dinámicamente, con facebook como source.", code: PARAMS },
      { name: "Ubicaciones de Instagram", description: "El mismo patrón con instagram como source, para los anuncios que reportes por separado.", code: PARAMS_IG },
      { name: "URL resuelta", description: "La estructura de la documentación de Sealmetrics, para una prueba rápida sin esperar a un clic real.", code: EXAMPLE_URL },
    ],
  },

  roles: {
    tag: "Qué se queda y qué cambia",
    title: <>Meta sigue optimizando.<br /><em>La decisión de presupuesto se mueve.</em></>,
    body: "No se sustituye nada en la cuenta de Meta. Lo que cambia es qué cifra decide cuánto recibe Meta frente a los demás canales.",
    items: [
      { role: "Píxel y API de conversiones", need: "Se quedan: conversiones para la entrega de Meta.", how: "Meta sigue optimizando con los eventos que recibe, detrás de tu configuración de consentimiento. Sealmetrics no le envía ninguno.", link: { label: "Meta Ads frente al CRM", href: "/es/blog/meta-ads-conversions-vs-crm/" } },
      { role: "Responsable de paid social", need: "Conjuntos y creatividades con ingresos medidos.", how: "utm_term y utm_content llevan el conjunto y el anuncio, así que los ingresos por creatividad se leen sin pérdida por consentimiento.", link: { label: "Atribución de ingresos por campaña", href: "/es/use-cases/revenue-attribution/" } },
      { role: "CMO y finanzas", need: "Meta frente a todos los demás canales.", how: "Una sola regla de último clic para todo el tráfico, contrastada con pedidos reales, en lugar del mérito que se atribuye cada plataforma.", link: { label: "Una cifra para marketing y finanzas", href: "/es/use-cases/single-source-of-truth/" } },
      { role: "Analistas", need: "Inversión e ingresos en una tabla.", how: "Cruza la inversión de Meta con los ingresos de Sealmetrics por utm_campaign en BigQuery, o pregúntaselo a un asistente de IA conectado a los dos.", link: { label: "Exportación a BigQuery", href: "/es/integrations/bigquery/" } },
    ],
  },

  proof: {
    tag: "Medido en paid social",
    quote: {
      text: "El valor está en optimizar presupuesto e inversión. Derivas hacia un canal o estrategia que antes no estabas viendo.",
      cite: "Eduardo Martin · Analítica y Campañas · Dreamplace Hotels",
      person: "Eduardo Martin",
      role: "Analítica y Campañas, Dreamplace Hotels",
    },
    body: "Dreamplace contrasta las ventas que atribuye Sealmetrics con el total de su CRM, y Meta y Google fueron los primeros presupuestos que movió. La medición en paralelo de Incapto muestra cuánto más pequeñas parecen las redes cuando solo se miden sobre quien da su consentimiento.",
    figures: [
      { value: "15–20%", label: "más ventas atribuidas que la herramienta anterior; Meta y Google fueron los primeros presupuestos en moverse", client: "Dreamplace Hotels", href: "/es/case-studies/dreamplace-hotels/" },
      { value: "+133%", label: "más tráfico social orgánico registrado por Sealmetrics que por GA4 en los mismos días", client: "Incapto", href: "/es/case-studies/incapto/" },
      { value: "62%", label: "del tráfico eran campañas de pago medidas sin pérdida por consentimiento, frente al 50% en GA4", client: "Incapto", href: "/es/case-studies/incapto/" },
    ],
    readCase: "Leer el caso",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Una capa de medición.<br /><em>No una señal de entrega.</em></>,
    body: (
      <>
        Son decisiones deliberadas. El mismo patrón para Google está en{" "}
        <Link className={link} href="/es/integrations/google-ads/">Sealmetrics para Google Ads</Link>.
      </>
    ),
    items: [
      ["Sin conversiones enviadas a Meta", "Sealmetrics no sustituye al píxel ni a la API de conversiones, así que la entrega y la optimización de Meta siguen con los eventos que recibe."],
      ["Sin importación de inversión", "El importe gastado no se guarda en Sealmetrics. Crúzalo desde Meta en una hoja de cálculo, en BigQuery o con un asistente de IA conectado a los dos."],
      ["Las UTM son imprescindibles", "Sin ellas, el tráfico de pago y el orgánico de Meta se mezclan, y no hay informes por campaña, conjunto ni creatividad."],
      ["Sin view-through", "Último clic por sesión: los anuncios vistos pero no pulsados, y las sesiones anteriores, no reciben mérito."],
      ["Los nombres son los que pases", "Los informes muestran los valores de la URL. Nombres incoherentes o por defecto en Meta hacen los informes difíciles de leer."],
      ["Los parámetros tienen que llegar a la página", "Lo que quite una redirección o un acortador antes de que se dispare el tracker se pierde para siempre."],
    ],
  },

  faqTag: "Preguntas frecuentes sobre Meta Ads",
  faqTitle: <>Antes de etiquetar<br /><em>tus anuncios.</em></>,
  faq: [
    { question: "¿Cómo mido las campañas de Meta Ads en Sealmetrics?", answer: "Añade parámetros UTM a cada anuncio en el campo Parámetros de URL del Administrador de anuncios: utm_source facebook o instagram, utm_medium paidsocial o cpc, utm_campaign para la campaña, y utm_term y utm_content para el conjunto y el anuncio. Comprueba la URL resuelta, cárgala en tu web y confirma los valores en el informe Sources." },
    { question: "¿Sealmetrics envía conversiones a Meta o sustituye a la API de conversiones?", answer: "No. Sealmetrics no envía conversiones a Meta, así que no afecta a la entrega ni a la optimización. Mantén el píxel de Meta y la API de conversiones para Meta, y usa Sealmetrics para medir los ingresos por campaña, conjunto y anuncio sin pérdida por consentimiento cuando decidas el presupuesto entre canales." },
    { question: "¿Por qué Meta reporta más conversiones que Sealmetrics?", answer: "Meta acredita resultados según la configuración de atribución de cada conjunto de anuncios, que puede incluir conversiones tras una visualización o una interacción, y modela parte de lo que no puede observar. Los eventos duplicados de píxel y servidor la inflan todavía más cuando no comparten ID de evento. Sealmetrics cuenta las conversiones en sesiones que llegaron desde el anuncio." },
    { question: "¿Sealmetrics distingue el tráfico de pago del orgánico de Facebook e Instagram?", answer: "Sí, cuando los anuncios llevan UTM. El tráfico de Meta llega a menudo con poca información de referrer, y Meta también añade identificadores de clic a los enlaces orgánicos, así que sin UTM Sealmetrics no puede separar con fiabilidad un clic en un anuncio de una publicación orgánica." },
    { question: "¿Puedo ver los ingresos por conjunto de anuncios y creatividad?", answer: "Sí, si utm_term y utm_content llevan el conjunto y el anuncio o la creatividad. Sealmetrics reporta conversiones e ingresos por esos valores, y la exportación a BigQuery incluye utm_term y utm_content en cada fila de conversión." },
    { question: "¿Cómo calculo el ROAS de Meta Ads con Sealmetrics?", answer: "Toma el importe gastado por campaña de Meta y los ingresos por utm_campaign de Sealmetrics para las mismas fechas, zona horaria y moneda, y divide. Compáralo con el ROAS que reporta Meta: la cifra de Meta es para su propia optimización, la medida para el presupuesto entre canales." },
    { question: "¿Afecta iOS a lo que mide Sealmetrics de los anuncios de Meta?", answer: "Sealmetrics lee las UTM en la página de llegada, así que un clic etiquetado desde un dispositivo iOS se mide como cualquier otra visita. Los informes de Meta se apoyan en parte en modelado cuando no puede observar las conversiones, y por eso la biblioteca de prompts de Sealmetrics compara las conversiones de Meta y de Sealmetrics por dispositivo." },
    { question: "¿Etiquetar los anuncios de Meta exige consentimiento de cookies para Sealmetrics?", answer: "Las UTM viajan en la URL y Sealmetrics no instala ninguna cookie para leerlas. El píxel de Meta sigue necesitando consentimiento, y que tu configuración de analítica quede exenta depende de los criterios de tu autoridad nacional." },
  ],

  final: {
    tag: "Revisión de Meta Ads",
    title: <>Etiqueta tus anuncios.<br /><em>Ve los ingresos por conjunto y creatividad.</em></>,
    body: "Reserva 30 minutos con el founder. Acordamos la convención de nombres, confirmamos los primeros hits etiquetados y ponemos los ingresos de Sealmetrics junto a tu inversión en Meta del último mes.",
    primary: { label: "Reservar una revisión de Meta Ads", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
