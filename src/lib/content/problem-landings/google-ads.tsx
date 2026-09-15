import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /integrations/google-ads — Phase 5 of CONTENT-PLAN-PROBLEM-POSITIONING.md (new page).
 * The plan's instruction: state the limitation at the top — Sealmetrics does not
 * import conversions into Google Ads and does not feed bidding.
 *
 * Sources (checked 15 Sep 2026):
 * - docs.sealmetrics.com reports/insights/how-to-track-google-ads-campaigns: UTMs
 *   and ad click IDs are read server-side from the landing URL; the Search/Display
 *   and Shopping templates (reproduced verbatim); ValueTrack placeholders and
 *   where each lands (Campaign = numeric campaign ID, Term = keyword and match
 *   type or placement); account-level setup; a hit with utm_ parameters or a
 *   gclid is never counted as organic; verification via Test, Last hit and the
 *   Sources tabs; redirects strip parameters; custom names via UTM Mappings;
 *   medium (none) when utm_medium is missing.
 * - docs reports/insights/attribution-model: click IDs start a paid entrance; a
 *   reload with the same click ID is not a second entrance; session-scoped last
 *   click.
 * - docs web-analytics-prompts/google-ads: spend from a Google Ads MCP
 *   connection, conversions and revenue from Sealmetrics, matched on UTMs; the
 *   click-to-entrance prompt flags gaps above 20%.
 * - Google Ads Help 6305348 ({lpurl}?param={valuetrack} appends parameters to
 *   the landing page; parallel tracking is the only click measurement method),
 *   7544674 (parallel tracking sends customers straight to the final URL),
 *   10548233 (Consent Mode conversion modelling, 700 ad clicks over 7 days).
 * - Sealmetrics does not send conversions to ad platforms or import spend
 *   (product facts; see also /blog/measure-roas-after-cookie-consent).
 * Not claimed: bot or invalid-click classification (Agent Analytics is not
 * live), an official Google MCP server for Google Ads.
 */

export const GOOGLE_ADS_PUBLISHED = "2026-09-15";

const link = "sig-problem-inline";

const TEMPLATE_SEARCH = `{lpurl}?utm_medium=cpc&utm_source=google&utm_campaign={Campaignid}&utm_term={ifsearch:{keyword}\\{matchtype}}{ifcontent:{placement}}`;
const TEMPLATE_SHOPPING = `{lpurl}?utm_medium=cpc&utm_source=google&utm_campaign={Campaignid}&utm_term={_term}`;
const TEST_URL = `https://yoursite.com/landing?utm_medium=cpc&utm_source=google&utm_campaign=123456789&utm_term=running+shoes`;

export const googleAdsEn: ProblemLandingContent = {
  route: "/integrations/google-ads",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Integrations", href: "/integrations/" },
    { label: "Google Ads" },
  ],
  eyebrow: "Integration · Google Ads",
  h1: <>Google Ads bids<br />on its own number.<br /><em>Budget needs a neutral one.</em></>,
  heroBody:
    "Sealmetrics does not import conversions into Google Ads and does not feed Smart Bidding: the Google tag keeps that job. What it does is read the ValueTrack UTMs of every Google Ads click from the landing page, whether or not the visitor accepts the banner, and credit conversions and revenue to the campaign and keyword that brought the session — the figure to set beside Google's own before moving budget.",
  heroPrimary: { label: "See the setup", href: "#method" },
  heroSecondary: { label: "See the templates", href: "#examples" },
  heroMicro: "ValueTrack UTMs · gclid recognised as paid · no conversion import · no cookies",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Published",
    date: GOOGLE_ADS_PUBLISHED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "What each click carries",
    status: "Resolved by Google",
    rows: [
      ["utm_source", "google"],
      ["utm_medium", "cpc"],
      ["utm_campaign", "{Campaignid}"],
      ["utm_term", "{keyword}\\{matchtype} or {placement}"],
    ],
    foot: "Read server-side from the landing URL · no cookie · no identifier",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Sealmetrics works with Google Ads through the landing page URL. You add a
      tracking template with ValueTrack parameters at account level, so every
      click lands with utm_source, utm_medium, utm_campaign set to the campaign ID
      and utm_term set to the keyword and match type on Search or the placement on
      Display. Sealmetrics reads those values server-side from the URL on every
      visit, without cookies, and credits each conversion and its revenue to the
      campaign and keyword of the session in which it happens, by last click. A
      visit with UTMs or a gclid is always classified as paid, never as organic.
      Sealmetrics does not import conversions into Google Ads, does not feed Smart
      Bidding and does not store ad spend: bidding stays on the Google tag, and
      spend comes from Google Ads when you calculate ROAS. Parameters lost in a
      redirect cannot be recovered.
    </p>
  ),

  divergence: {
    tag: "Two views of the same campaign",
    title: <>Google Ads reports what it credits.<br /><em>Sealmetrics reports what arrived.</em></>,
    body: "Neither number is wrong. They answer different questions, and the difference between them is the thing worth reading.",
    headers: ["Question", "Google Ads", "Sealmetrics", "Why they differ"],
    rows: [
      ["How many people came?", "Clicks", "Entrances from Google Ads UTMs or gclid", "Clicks that never load the page, redirects that drop parameters, blocked tags"],
      ["How many converted?", "Conversions from its conversion actions, including modelled ones", "Conversions recorded in sessions that arrived from Google Ads", "Modelling for unconsented users, and Google's own attribution window"],
      ["Who gets the credit?", "Google Ads interactions only, by its attribution model", "The channel of the converting session, across every channel", "Google does not see Meta, email or organic; Sealmetrics does not see views"],
      ["Which campaign?", "Campaign name", "Numeric campaign ID from {Campaignid}", "The template passes the ID; map names in your own reporting"],
      ["Which keyword?", "Search terms and keywords", "Keyword and match type, or placement on Display", "Only what the template writes into utm_term"],
      ["What did it cost?", "Spend", "Not stored", "Spend is joined from Google Ads when you calculate ROAS"],
    ],
    note: (
      <>
        UTMs are covered in the glossary under{" "}
        <Link className={link} href="/glossary/utm-parameters/">UTM parameters</Link>, and
        the attribution rule under{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last-click attribution</Link>.
        How to put the two views together per campaign is set out in{" "}
        <Link className={link} href="/blog/measure-roas-after-cookie-consent/">how to measure ROAS after cookie consent</Link>.
      </>
    ),
  },

  costs: {
    tag: "What bidding on Google's number hides",
    title: <>Smart Bidding optimises<br /><em>the view it is given.</em></>,
    body: "That is its job, and it does it well inside Google Ads. The risk is using the same figure to decide how much Google Ads should get against everything else.",
    items: [
      ["01", "Modelled conversions fill the consent gap", "When users do not consent, Google Ads models the conversions it cannot observe, once an account reaches 700 ad clicks over seven days per country and domain grouping. It is Google's estimate of Google's own contribution."],
      ["02", "GA4 undercounts paid more than direct", (
        <>
          On Incapto&apos;s Shopify store, Sealmetrics recorded 37–52% more
          paid-campaign traffic than GA4, against 11% more direct. A Google Ads
          review built on GA4 starts from a smaller paid base than the one that
          exists. The mechanism is explained in{" "}
          <Link className={link} href="/blog/consent-mode-measured-vs-modelled/">Consent Mode: measured vs modelled</Link>.
        </>
      )],
      ["03", "A redirect erases the campaign", "Sealmetrics reads UTMs from the URL of the page where the tracker fires. A redirect chain between the ad and the landing page that drops query parameters loses the campaign for good, and the visit falls back to its referrer."],
    ],
  },

  method: {
    id: "method",
    tag: "Set it up",
    title: <>One template.<br /><em>Every campaign.</em></>,
    body: (
      <>
        A tracking template at account level applies to every campaign, including
        new ones, so there is nothing to remember when someone launches a campaign
        next month.
      </>
    ),
    howToName: "How to track Google Ads campaigns in Sealmetrics",
    howToDescription:
      "Five steps to tag Google Ads clicks with ValueTrack UTMs and confirm that campaigns and keywords reach Sealmetrics.",
    steps: [
      { name: "Add the tracking template", text: "In Google Ads, set a tracking template at account level with utm_medium=cpc, utm_source=google, utm_campaign={Campaignid} and utm_term using {ifsearch:…} for the keyword and match type and {ifcontent:…} for the placement, so one template covers Search and Display." },
      { name: "Use the Shopping variant", text: "For Shopping campaigns, use the same template with utm_term={_term}, where _term is a custom parameter you define in Google Ads. Keep utm_medium=cpc and utm_source=google fixed on every template." },
      { name: "Test the resolved URL", text: "Click Test next to the tracking template. Google shows the final URL a click would produce; check that the UTM parameters are present and filled in, not left as literal {keyword} text." },
      { name: "Confirm the hit in Sealmetrics", text: "Load the resolved URL on your site. The Last hit timestamp in Overview should read seconds ago, and the Sources report should show cpc under Mediums, google under Sources, the campaign ID under Campaigns and the keyword under Terms." },
      { name: "Check redirects and parameter names", text: "Load a live ad URL and look at the address bar after every redirect: the parameters must still be there. If your team uses other names, such as campaign_id, map them in Settings → Sites → UTM Mappings instead of editing the template." },
    ],
  },

  examples: {
    tag: "The templates",
    title: <>Copy, paste,<br /><em>test.</em></>,
    body: (
      <>
        As published in the Sealmetrics documentation. Everything in curly braces is
        a ValueTrack parameter that Google resolves at click time, so Sealmetrics
        only ever sees the final values.
      </>
    ),
    items: [
      { name: "Search and Display", description: "One template for both networks: keyword and match type on Search clicks, placement on Display clicks.", code: TEMPLATE_SEARCH },
      { name: "Shopping", description: "The Shopping variant, with utm_term taken from a custom parameter you define in Google Ads.", code: TEMPLATE_SHOPPING },
      { name: "Smoke test", description: "Any URL with the same parameters confirms the setup end to end without waiting for a real click.", code: TEST_URL },
    ],
  },

  roles: {
    tag: "What stays, what changes",
    title: <>Google Ads keeps bidding.<br /><em>The budget decision moves.</em></>,
    body: "Nothing in the Google Ads account is replaced. What changes is which figure decides how much Google Ads gets against the other channels.",
    items: [
      { role: "Google tag and GA4", need: "Stay: conversions for bidding.", how: "Smart Bidding keeps learning from the conversions Google Ads receives, behind your consent setup.", link: { label: "Consent Mode: measured vs modelled", href: "/blog/consent-mode-measured-vs-modelled/" } },
      { role: "PPC manager", need: "Keywords and placements on measured revenue.", how: "utm_term carries keyword and match type, or placement, so revenue per keyword can be read without consent loss.", link: { label: "Campaign revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "CMO and finance", need: "Google Ads against every other channel.", how: "One last-click rule for all traffic, checked against real orders, instead of each platform's self-credit.", link: { label: "One number for marketing and finance", href: "/use-cases/single-source-of-truth/" } },
      { role: "Analysts", need: "Spend and revenue in one table.", how: "Join Google Ads spend with Sealmetrics revenue by campaign ID in BigQuery, or ask an AI assistant connected to both.", link: { label: "BigQuery export", href: "/integrations/bigquery/" } },
    ],
  },

  proof: {
    tag: "Measured on paid media",
    quote: {
      text: "The data Sealmetrics delivers is agnostic, unbiased and neutral. There's no black box.",
      cite: "Toni Andújar · Digital & Direct Sales Director · Palladium Hotel Group",
      person: "Toni Andújar",
      role: "Digital & Direct Sales Director, Palladium Hotel Group",
    },
    body: "Palladium rebuilt its Google Display & Video 360 buying on Sealmetrics data, using availability searches as the intent signal. Dreamplace moved Meta and Google budgets first once its measured sales were checked against the CRM.",
    figures: [
      { value: "+165%", label: "Display Cost-per-Search improvement after rebuilding the DV360 model", client: "Palladium Hotel Group", href: "/case-studies/palladium-hotel-group/" },
      { value: "15–20%", label: "more sales attributed than the previous tool; Google and Meta were the first budgets moved", client: "Dreamplace Hotels", href: "/case-studies/dreamplace-hotels/" },
      { value: "62%", label: "paid campaigns' share of traffic measured without consent loss, against 50% in GA4", client: "Incapto", href: "/case-studies/incapto/" },
    ],
    readCase: "Read the case",
  },

  limits: {
    tag: "What it does not do",
    title: <>A measurement layer.<br /><em>Not a bidding signal.</em></>,
    body: (
      <>
        These are deliberate. The same pattern for Meta is on{" "}
        <Link className={link} href="/integrations/meta-ads/">Sealmetrics for Meta Ads</Link>.
      </>
    ),
    items: [
      ["No conversion import", "Sealmetrics does not send conversions to Google Ads, so Smart Bidding keeps using the conversions from the Google tag or GA4."],
      ["No spend import", "Ad cost is not stored in Sealmetrics. Join it from Google Ads in a spreadsheet, in BigQuery or through an AI assistant connected to both."],
      ["Campaign IDs, not names", "{Campaignid} resolves to Google's numeric ID. Numbers in the Campaigns tab are expected; map them to names in your reporting."],
      ["A gclid alone is not a campaign", "A visit with a gclid is recognised as a Google Ads click, but without UTMs the campaign and keyword are not in the URL to report."],
      ["No view-through", "Last click per session: YouTube and Display views without a click, and earlier sessions, get no credit."],
      ["Parameters must reach the page", "Anything dropped by a redirect before the tracker fires is gone for good."],
    ],
  },

  faqTag: "Common Google Ads questions",
  faqTitle: <>Before you add<br /><em>the template.</em></>,
  faq: [
    { question: "How do I track Google Ads campaigns in Sealmetrics?", answer: "Add a tracking template at account level in Google Ads: {lpurl}?utm_medium=cpc&utm_source=google&utm_campaign={Campaignid}&utm_term={ifsearch:{keyword}\\{matchtype}}{ifcontent:{placement}}. Test it with the Test button, load the resolved URL on your site and check the Sources report for cpc, google, the campaign ID and the keyword." },
    { question: "Does Sealmetrics import conversions into Google Ads or work with Smart Bidding?", answer: "No. Sealmetrics does not send conversions to Google Ads, so it does not feed Smart Bidding. Keep the Google tag or GA4 conversion import for bidding, and use Sealmetrics to measure revenue by campaign and keyword without consent loss when you decide budget between channels." },
    { question: "Why do my campaigns show as numbers in Sealmetrics?", answer: "Because the template passes {Campaignid}, which Google resolves to the campaign's numeric ID rather than its name. It is expected behaviour. The ID is stable when campaigns are renamed, and you can map IDs to names in your own reporting or in BigQuery." },
    { question: "Why does Google Ads report more clicks than Sealmetrics entrances?", answer: "A click is counted before the page loads. Visitors who leave before the tracker fires, redirects that strip the UTMs, and clicks that never reach the site all widen the gap. The Sealmetrics prompt library for Google Ads flags gaps above 20% as worth investigating." },
    { question: "Does Google Ads auto-tagging with gclid work with Sealmetrics?", answer: "Yes. A visit carrying a gclid is recognised as a Google Ads click and never counted as organic, and reloading the same tagged page does not create a second entrance. Keep the UTM template as well, because the gclid alone does not put the campaign and keyword in the URL." },
    { question: "How do I calculate ROAS with Sealmetrics and Google Ads?", answer: "Take spend per campaign from Google Ads and revenue per campaign ID from Sealmetrics for the same dates, timezone and currency, and divide. Compare it with the ROAS Google Ads reports: the platform figure is for bidding, the measured one for budget between channels." },
    { question: "Should I use a tracking template or the final URL suffix?", answer: "The Sealmetrics documentation uses a tracking template that starts with {lpurl}; Google appends its parameters to the landing page, and parallel tracking sends visitors straight to that page. What matters is that the resolved landing URL carries the UTMs, so test whichever field your account uses." },
    { question: "Does tagging Google Ads clicks require cookie consent for Sealmetrics?", answer: "The UTMs travel in the URL and Sealmetrics sets no cookie to read them. The Google Ads tag and remarketing still need consent, and whether your analytics configuration is exempt depends on your national authority's criteria." },
  ],

  final: {
    tag: "Google Ads review",
    title: <>Add the template.<br /><em>See revenue by campaign and keyword.</em></>,
    body: "Book 30 minutes with the founder. We add the tracking template, confirm the first tagged hits and set Sealmetrics revenue beside your Google Ads spend for last month.",
    primary: { label: "Book a Google Ads review", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const googleAdsEs: ProblemLandingContent = {
  route: "/integrations/google-ads",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Integraciones", href: "/es/integrations/" },
    { label: "Google Ads" },
  ],
  eyebrow: "Integración · Google Ads",
  h1: <>Google Ads puja<br />con su cifra.<br /><em>El presupuesto, con una neutral.</em></>,
  heroBody:
    "Sealmetrics no importa conversiones a Google Ads ni alimenta Smart Bidding: ese trabajo lo sigue haciendo la etiqueta de Google. Lo que hace es leer las UTM con ValueTrack de cada clic de Google Ads en la página de llegada, acepte o no el visitante el banner, y acreditar conversiones e ingresos a la campaña y la palabra clave que trajeron la sesión: la cifra que conviene poner junto a la de Google antes de mover presupuesto.",
  heroPrimary: { label: "Ver la configuración", href: "#method" },
  heroSecondary: { label: "Ver las plantillas", href: "#examples" },
  heroMicro: "UTM con ValueTrack · gclid reconocido como pago · sin importación de conversiones · sin cookies",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Publicado",
    date: GOOGLE_ADS_PUBLISHED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Lo que lleva cada clic",
    status: "Resuelto por Google",
    rows: [
      ["utm_source", "google"],
      ["utm_medium", "cpc"],
      ["utm_campaign", "{Campaignid}"],
      ["utm_term", "{keyword}\\{matchtype} o {placement}"],
    ],
    foot: "Leído en servidor desde la URL de llegada · sin cookie · sin identificador",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      Sealmetrics funciona con Google Ads a través de la URL de la página de llegada.
      Añades una plantilla de seguimiento con parámetros ValueTrack a nivel de cuenta,
      de modo que cada clic llega con utm_source, utm_medium, utm_campaign con el ID
      de la campaña y utm_term con la palabra clave y el tipo de concordancia en
      Búsqueda, o la ubicación en Display. Sealmetrics lee esos valores en servidor
      desde la URL de cada visita etiquetada, sin cookies, y acredita cada conversión y sus
      ingresos a la campaña y la palabra clave de la sesión en la que ocurre, a último
      clic. Una visita con UTM o con gclid siempre se clasifica como pago, nunca como
      orgánica. Sealmetrics no importa conversiones a Google Ads, no alimenta Smart
      Bidding y no guarda la inversión publicitaria: las pujas siguen con la etiqueta
      de Google, y la inversión se toma de Google Ads al calcular el ROAS. Los
      parámetros que se pierden en una redirección no se pueden recuperar.
    </p>
  ),

  divergence: {
    tag: "Dos visiones de la misma campaña",
    title: <>Google Ads reporta lo que se acredita.<br /><em>Sealmetrics, lo que llegó.</em></>,
    body: "Ninguna de las dos cifras está mal. Responden a preguntas distintas, y la diferencia entre ellas es lo que merece la pena leer.",
    headers: ["Pregunta", "Google Ads", "Sealmetrics", "Por qué difieren"],
    rows: [
      ["¿Cuánta gente vino?", "Clics", "Entradas con UTM de Google Ads o gclid", "Clics que nunca cargan la página, redirecciones que quitan parámetros, etiquetas bloqueadas"],
      ["¿Cuántos convirtieron?", "Conversiones de sus acciones de conversión, modeladas incluidas", "Conversiones registradas en sesiones que llegaron desde Google Ads", "El modelado de usuarios sin consentimiento y la propia ventana de atribución de Google"],
      ["¿Quién se lleva el mérito?", "Solo interacciones de Google Ads, según su modelo de atribución", "El canal de la sesión que convierte, entre todos los canales", "Google no ve Meta, el email ni el orgánico; Sealmetrics no ve las visualizaciones"],
      ["¿Qué campaña?", "Nombre de la campaña", "ID numérico de la campaña desde {Campaignid}", "La plantilla pasa el ID; los nombres se asignan en tus propios informes"],
      ["¿Qué palabra clave?", "Términos de búsqueda y palabras clave", "Palabra clave y tipo de concordancia, o ubicación en Display", "Solo lo que la plantilla escribe en utm_term"],
      ["¿Cuánto costó?", "Inversión", "No se guarda", "La inversión se cruza desde Google Ads al calcular el ROAS"],
    ],
    note: (
      <>
        La atribución de los ingresos se explica en{" "}
        <Link className={link} href="/es/glossary/revenue-attribution/">atribución de ingresos</Link>.
        Cómo juntar las dos visiones por campaña se cuenta en{" "}
        <Link className={link} href="/es/blog/measure-roas-after-cookie-consent/">cómo medir el ROAS después del consentimiento</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que esconde pujar con la cifra de Google",
    title: <>Smart Bidding optimiza<br /><em>la visión que recibe.</em></>,
    body: "Es su trabajo, y dentro de Google Ads lo hace bien. El riesgo es usar esa misma cifra para decidir cuánto recibe Google Ads frente a todo lo demás.",
    items: [
      ["01", "Las conversiones modeladas rellenan el hueco del consentimiento", "Cuando los usuarios no dan su consentimiento, Google Ads modela las conversiones que no puede observar, a partir de 700 clics en anuncios en siete días por país y grupo de dominios. Es la estimación de Google sobre la contribución de Google."],
      ["02", "GA4 pierde más pago que directo", (
        <>
          En la tienda Shopify de Incapto, Sealmetrics registró entre un 37% y un 52%
          más de tráfico de campañas de pago que GA4, frente a un 11% más de directo. Una
          revisión de Google Ads hecha sobre GA4 parte de una base de pago menor que la
          real. El mecanismo se explica en{" "}
          <Link className={link} href="/es/blog/consent-mode-measured-vs-modelled/">Consent Mode: qué mide GA4 y qué modela</Link>.
        </>
      )],
      ["03", "Una redirección borra la campaña", "Sealmetrics lee las UTM de la URL de la página donde se dispara el tracker. Una cadena de redirecciones entre el anuncio y la página de llegada que quite los parámetros pierde la campaña para siempre, y la visita queda con su referrer."],
    ],
  },

  method: {
    id: "method",
    tag: "Configúralo",
    title: <>Una plantilla.<br /><em>Todas las campañas.</em></>,
    body: (
      <>
        Una plantilla de seguimiento a nivel de cuenta se aplica a todas las campañas,
        también a las nuevas, así que no hay nada que recordar cuando alguien lance una
        campaña el mes que viene.
      </>
    ),
    howToName: "Cómo medir campañas de Google Ads en Sealmetrics",
    howToDescription:
      "Cinco pasos para etiquetar los clics de Google Ads con UTM y ValueTrack y comprobar que campañas y palabras clave llegan a Sealmetrics.",
    steps: [
      { name: "Añade la plantilla de seguimiento", text: "En Google Ads, define una plantilla de seguimiento a nivel de cuenta con utm_medium=cpc, utm_source=google, utm_campaign={Campaignid} y utm_term con {ifsearch:…} para la palabra clave y el tipo de concordancia y {ifcontent:…} para la ubicación, de modo que una sola plantilla cubra Búsqueda y Display." },
      { name: "Usa la variante de Shopping", text: "En las campañas de Shopping, usa la misma plantilla con utm_term={_term}, donde _term es un parámetro personalizado que defines en Google Ads. Mantén fijos utm_medium=cpc y utm_source=google en todas las plantillas." },
      { name: "Prueba la URL resuelta", text: "Pulsa Probar junto a la plantilla de seguimiento. Google muestra la URL final que produciría un clic; comprueba que los parámetros UTM están presentes y rellenos, no como texto literal {keyword}." },
      { name: "Confirma el hit en Sealmetrics", text: "Carga la URL resuelta en tu web. La marca Last hit de Overview debe decir hace unos segundos, y el informe Sources debe mostrar cpc en Mediums, google en Sources, el ID de la campaña en Campaigns y la palabra clave en Terms." },
      { name: "Revisa redirecciones y nombres de parámetros", text: "Carga la URL de un anuncio real y mira la barra de direcciones tras cada redirección: los parámetros tienen que seguir ahí. Si tu equipo usa otros nombres, como campaign_id, asígnalos en Settings → Sites → UTM Mappings en lugar de editar la plantilla." },
    ],
  },

  examples: {
    tag: "Las plantillas",
    title: <>Copia, pega<br /><em>y prueba.</em></>,
    body: (
      <>
        Tal como están publicadas en la documentación de Sealmetrics. Todo lo que va
        entre llaves es un parámetro ValueTrack que Google resuelve en el momento del
        clic, así que Sealmetrics solo ve los valores finales.
      </>
    ),
    items: [
      { name: "Búsqueda y Display", description: "Una sola plantilla para las dos redes: palabra clave y tipo de concordancia en los clics de Búsqueda, ubicación en los de Display.", code: TEMPLATE_SEARCH },
      { name: "Shopping", description: "La variante de Shopping, con utm_term tomado de un parámetro personalizado que defines en Google Ads.", code: TEMPLATE_SHOPPING },
      { name: "Prueba rápida", description: "Cualquier URL con los mismos parámetros confirma la configuración de principio a fin sin esperar a un clic real.", code: TEST_URL },
    ],
  },

  roles: {
    tag: "Qué se queda y qué cambia",
    title: <>Google Ads sigue pujando.<br /><em>La decisión de presupuesto se mueve.</em></>,
    body: "No se sustituye nada en la cuenta de Google Ads. Lo que cambia es qué cifra decide cuánto recibe Google Ads frente a los demás canales.",
    items: [
      { role: "Etiqueta de Google y GA4", need: "Se quedan: conversiones para pujar.", how: "Smart Bidding sigue aprendiendo de las conversiones que recibe Google Ads, detrás de tu configuración de consentimiento.", link: { label: "Consent Mode: qué mide y qué modela", href: "/es/blog/consent-mode-measured-vs-modelled/" } },
      { role: "Responsable de PPC", need: "Palabras clave y ubicaciones con ingresos medidos.", how: "utm_term lleva la palabra clave y el tipo de concordancia, o la ubicación, así que los ingresos por palabra clave se leen sin pérdida por consentimiento.", link: { label: "Atribución de ingresos por campaña", href: "/es/use-cases/revenue-attribution/" } },
      { role: "CMO y finanzas", need: "Google Ads frente a todos los demás canales.", how: "Una sola regla de último clic para todo el tráfico, contrastada con pedidos reales, en lugar del mérito que se atribuye cada plataforma.", link: { label: "Una cifra para marketing y finanzas", href: "/es/use-cases/single-source-of-truth/" } },
      { role: "Analistas", need: "Inversión e ingresos en una tabla.", how: "Cruza la inversión de Google Ads con los ingresos de Sealmetrics por ID de campaña en BigQuery, o pregúntaselo a un asistente de IA conectado a los dos.", link: { label: "Exportación a BigQuery", href: "/es/integrations/bigquery/" } },
    ],
  },

  proof: {
    tag: "Medido en paid media",
    quote: {
      text: "Los datos que da Sealmetrics son agnósticos, no están sesgados y son neutrales. No hay caja negra.",
      cite: "Toni Andújar · Director Digital y Venta Directa · Palladium Hotel Group",
      person: "Toni Andújar",
      role: "Director Digital y Venta Directa, Palladium Hotel Group",
    },
    body: "Palladium reconstruyó su compra en Google Display & Video 360 sobre datos de Sealmetrics, con las búsquedas de disponibilidad como señal de intención. Dreamplace movió primero los presupuestos de Meta y Google cuando contrastó sus ventas medidas con el CRM.",
    figures: [
      { value: "+165%", label: "de mejora del Coste por Búsqueda de Display tras rehacer el modelo de DV360", client: "Palladium Hotel Group", href: "/es/case-studies/palladium-hotel-group/" },
      { value: "15–20%", label: "más ventas atribuidas que la herramienta anterior; Google y Meta fueron los primeros presupuestos en moverse", client: "Dreamplace Hotels", href: "/es/case-studies/dreamplace-hotels/" },
      { value: "62%", label: "del tráfico eran campañas de pago medidas sin pérdida por consentimiento, frente al 50% en GA4", client: "Incapto", href: "/es/case-studies/incapto/" },
    ],
    readCase: "Leer el caso",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Una capa de medición.<br /><em>No una señal de puja.</em></>,
    body: (
      <>
        Son decisiones deliberadas. El mismo patrón para Meta está en{" "}
        <Link className={link} href="/es/integrations/meta-ads/">Sealmetrics para Meta Ads</Link>.
      </>
    ),
    items: [
      ["Sin importación de conversiones", "Sealmetrics no envía conversiones a Google Ads, así que Smart Bidding sigue usando las conversiones de la etiqueta de Google o de GA4."],
      ["Sin importación de inversión", "El coste publicitario no se guarda en Sealmetrics. Crúzalo desde Google Ads en una hoja de cálculo, en BigQuery o con un asistente de IA conectado a los dos."],
      ["IDs de campaña, no nombres", "{Campaignid} se resuelve al ID numérico de Google. Los números en la pestaña Campaigns son lo esperado; asígnales nombres en tus informes."],
      ["Un gclid solo no es una campaña", "Una visita con gclid se reconoce como clic de Google Ads, pero sin UTM la campaña y la palabra clave no están en la URL para reportarlas."],
      ["Sin view-through", "Último clic por sesión: las visualizaciones de YouTube y Display sin clic, y las sesiones anteriores, no reciben mérito."],
      ["Los parámetros tienen que llegar a la página", "Lo que quite una redirección antes de que se dispare el tracker se pierde para siempre."],
    ],
  },

  faqTag: "Preguntas frecuentes sobre Google Ads",
  faqTitle: <>Antes de añadir<br /><em>la plantilla.</em></>,
  faq: [
    { question: "¿Cómo mido las campañas de Google Ads en Sealmetrics?", answer: "Añade una plantilla de seguimiento a nivel de cuenta en Google Ads: {lpurl}?utm_medium=cpc&utm_source=google&utm_campaign={Campaignid}&utm_term={ifsearch:{keyword}\\{matchtype}}{ifcontent:{placement}}. Pruébala con el botón Probar, carga la URL resuelta en tu web y revisa en el informe Sources que aparecen cpc, google, el ID de la campaña y la palabra clave." },
    { question: "¿Sealmetrics importa conversiones a Google Ads o funciona con Smart Bidding?", answer: "No. Sealmetrics no envía conversiones a Google Ads, así que no alimenta Smart Bidding. Mantén la etiqueta de Google o la importación de conversiones de GA4 para las pujas, y usa Sealmetrics para medir los ingresos por campaña y palabra clave sin pérdida por consentimiento cuando decidas el presupuesto entre canales." },
    { question: "¿Por qué mis campañas aparecen como números en Sealmetrics?", answer: "Porque la plantilla pasa {Campaignid}, que Google resuelve al ID numérico de la campaña y no a su nombre. Es el comportamiento esperado. El ID se mantiene aunque se renombre la campaña, y puedes asignar nombres a los IDs en tus propios informes o en BigQuery." },
    { question: "¿Por qué Google Ads reporta más clics que entradas en Sealmetrics?", answer: "Un clic se cuenta antes de que cargue la página. Los visitantes que se van antes de que se dispare el tracker, las redirecciones que quitan las UTM y los clics que nunca llegan a la web amplían la diferencia. La biblioteca de prompts de Sealmetrics para Google Ads marca como algo a investigar las diferencias superiores al 20%." },
    { question: "¿El etiquetado automático de Google Ads con gclid funciona con Sealmetrics?", answer: "Sí. Una visita con gclid se reconoce como clic de Google Ads y nunca se cuenta como orgánica, y recargar la misma página etiquetada no crea una segunda entrada. Mantén también la plantilla de UTM, porque el gclid por sí solo no pone la campaña ni la palabra clave en la URL." },
    { question: "¿Cómo calculo el ROAS con Sealmetrics y Google Ads?", answer: "Toma la inversión por campaña de Google Ads y los ingresos por ID de campaña de Sealmetrics para las mismas fechas, zona horaria y moneda, y divide. Compáralo con el ROAS que reporta Google Ads: la cifra de la plataforma es para pujar, la medida para el presupuesto entre canales." },
    { question: "¿Uso plantilla de seguimiento o sufijo de URL final?", answer: "La documentación de Sealmetrics usa una plantilla de seguimiento que empieza por {lpurl}; Google añade sus parámetros a la página de llegada, y el seguimiento paralelo lleva al visitante directamente a esa página. Lo que importa es que la URL de llegada resuelta lleve las UTM, así que prueba el campo que use tu cuenta." },
    { question: "¿Etiquetar los clics de Google Ads exige consentimiento de cookies para Sealmetrics?", answer: "Las UTM viajan en la URL y Sealmetrics no instala ninguna cookie para leerlas. La etiqueta de Google Ads y el remarketing siguen necesitando consentimiento, y que tu configuración de analítica quede exenta depende de los criterios de tu autoridad nacional." },
  ],

  final: {
    tag: "Revisión de Google Ads",
    title: <>Añade la plantilla.<br /><em>Ve los ingresos por campaña y palabra clave.</em></>,
    body: "Reserva 30 minutos con el founder. Añadimos la plantilla de seguimiento, confirmamos los primeros hits etiquetados y ponemos los ingresos de Sealmetrics junto a tu inversión en Google Ads del último mes.",
    primary: { label: "Reservar una revisión de Google Ads", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
