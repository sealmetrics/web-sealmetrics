import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * Problem B — "I don't know which campaigns work". Lives on
 * /use-cases/revenue-attribution (decision D1) and gains a Spanish twin.
 *
 * Product facts, all from docs.sealmetrics.com:
 * - session-scoped last click: a conversion inherits the most recent entrance
 *   of its session (~2h inactivity), no lookback across sessions
 * - UTMs and ad click IDs (gclid, msclkid, ttclid, yclid…) are read from the
 *   landing URL; Google Ads tagging uses a ValueTrack tracking template, Meta
 *   Ads needs UTMs on every destination URL; utm_content carries the creative
 * - UTM Mapping copies custom parameters into standard UTMs at ingest, not
 *   retroactively; payment gateways are recognised, other domains can be
 *   registered as passthrough referrers
 * - Sealmetrics counts what fires, does not deduplicate orders and does not
 *   push conversions back to ad platforms for bidding
 * - ROAS: join campaign revenue with platform cost in BigQuery, or through
 *   cross-MCP prompts (Sealmetrics MCP + Google Ads / Meta Ads MCP)
 *
 * Case figures from src/lib/content/case-studies.tsx. The Incapto case states it
 * measured no ROI or incremental sales, so this page claims none for it.
 */

export const REVENUE_ATTRIBUTION_PUBLISHED = "2026-05-29";
export const REVENUE_ATTRIBUTION_MODIFIED = "2026-09-14";

const link = "sig-problem-inline";

export const revenueAttributionEn: ProblemLandingContent = {
  route: "/use-cases/revenue-attribution",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Use cases", href: "/use-cases/" },
    { label: "Revenue attribution" },
  ],
  eyebrow: "Use case · Campaign revenue attribution",
  h1: <>Your campaigns are judged<br />on the visitors<br /><em>who clicked accept.</em></>,
  heroBody:
    "Ad platforms grade their own ads, and GA4 only sees the visitors who accept the banner — a loss that hits paid traffic harder than most. Sealmetrics attributes every euro of revenue to channel, campaign and creative on every session it records, whether or not the visitor accepts cookies, so budget moves on what actually sold.",
  heroPrimary: { label: "See the setup", href: "#method" },
  heroSecondary: { label: "Read the Dreamplace case", href: "/case-studies/dreamplace-hotels/" },
  heroMicro: "Channel · campaign · creative · last click per session · no cookies · EU-hosted in Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: REVENUE_ATTRIBUTION_MODIFIED,
    dateDisplay: "14 September 2026",
  },
  module: {
    title: "One order · four reports",
    status: "Who gets the credit",
    rows: [
      ["Meta Ads", "Its own ad, in its window"],
      ["Google Ads", "Its own ad, in its window"],
      ["GA4", "Only if cookies were accepted"],
      ["Sealmetrics", "Last click of the session"],
    ],
    foot: "Same sale · up to three claimants · one of them measured on every session",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Revenue attribution without cookies assigns each order&apos;s revenue to
      the channel, campaign and creative of the session in which it happened,
      without storing anything on the visitor&apos;s device. It answers which
      campaigns actually sold when ad platforms grade their own ads and GA4
      misses the visitors who reject the banner — a loss that hits paid traffic
      harder: on Incapto&apos;s Shopify store, Sealmetrics saw 37% to 52% more
      paid-campaign traffic than GA4. Sealmetrics reads the UTM parameters and ad
      click IDs in the landing URL, credits each conversion to the most recent
      source of its session, and rolls revenue up by source, medium, campaign,
      content and term. ROAS comes from joining that revenue with each
      platform&apos;s spend. The model is last click per session: it does not
      measure view-through or credit earlier visits, which belong in a
      marketing-mix model.
    </p>
  ),

  divergence: {
    tag: "Why every report disagrees",
    title: <>One sale.<br /><em>Three claimants.</em></>,
    body: "Each report is internally consistent. They disagree because they credit different things, see different visitors and are graded by different people.",
    headers: ["Report", "How it credits the sale", "Why it misleads the budget", "Use it for"],
    rows: [
      ["Meta Ads and Google Ads", "To its own ad, inside its own attribution window; can include modelled and view-through conversions", "Each platform grades itself, so the same sale can be claimed twice", "Bidding and creative tests inside the platform"],
      ["GA4 with Consent Mode", "Across the visits it recorded: consented, unblocked visitors, plus estimates", "Channels that bring new audiences lose more visits to the banner, so paid and social look weaker than they are", "Trends on the consented share"],
      ["Order system or CRM", "The sale itself, with whatever source reached checkout", "Exact totals, but no dependable channel behind each order", "Revenue truth"],
      ["Sealmetrics", "To the last click of the session in which the order happened, on every recorded session", "No earlier visits and no view-through", "Channel and campaign budget decisions"],
    ],
    note: (
      <>
        The model is defined under{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last-click attribution</Link>{" "}
        and{" "}
        <Link className={link} href="/glossary/revenue-attribution/">revenue attribution</Link>;
        why a longer{" "}
        <Link className={link} href="/glossary/attribution-window/">attribution window</Link>{" "}
        collapses without cookies is explained there too. When the disagreement
        reaches finance, the problem becomes{" "}
        <Link className={link} href="/use-cases/single-source-of-truth/">one number for marketing and finance</Link>.
      </>
    ),
  },

  costs: {
    tag: "What it costs not to know",
    title: <>Budget follows<br /><em>the report you can see.</em></>,
    body: "When attribution runs on the consented share of traffic, the error is not noise. It has a direction, and it points away from the campaigns that bring new customers.",
    items: [
      ["01", "Paid looks worse than it is", "At Incapto, GA4 put paid campaigns at 50% of traffic; measured on every visit they were 62%. The range on paid visits was 37% to 52% more than GA4, because GA4 groups part of the spend under Cross-network."],
      ["02", "Budget stays where it is visible", "Dreamplace Hotels attributes 15–20% more sales with Sealmetrics than with its previous tool, and used that view to shift budget toward a channel it was not seeing before. Meta and Google were the first budgets to move."],
      ["03", "Volume passes for performance", "Palladium Hotel Group could see platform activity but could not compare partners, placements and audiences on equal terms. Attributing each visit and judging the mix on cost per availability search improved Display Cost-per-Search by 165%."],
    ],
  },

  method: {
    id: "method",
    tag: "The setup",
    title: <>Tag it once.<br /><em>Read revenue by campaign.</em></>,
    body: (
      <>
        Without cookies, the landing URL is the only place attribution can come
        from, so the setup is mostly about what that URL carries. Event and
        purchase instrumentation is covered in{" "}
        <Link className={link} href="/use-cases/conversion-tracking/">conversion tracking without cookies</Link>,
        and{" "}
        <Link className={link} href="/glossary/utm-parameters/">UTM parameters</Link>{" "}
        are defined in the glossary.
      </>
    ),
    howToName: "How to attribute revenue to campaigns without cookies",
    howToDescription:
      "Five steps to see revenue by channel, campaign and creative without cookies, from tagging to ROAS.",
    steps: [
      { name: "Tag every paid link", text: "Add utm_source, utm_medium and utm_campaign to every destination URL, and utm_content for the creative. In Google Ads, a ValueTrack tracking template at account level applies it to every campaign; in Meta Ads, add the UTMs to each ad's URL parameters." },
      { name: "Map your own parameter names", text: "If an agency or email tool uses names like campaign_id, UTM Mapping copies them into the standard UTMs when the visit arrives. It applies to new traffic only, so set it up before the campaign launches." },
      { name: "Stop external domains stealing the credit", text: "Payment gateways are recognised automatically. Register booking engines, SSO or an external checkout as passthrough referrers, so the return trip keeps the original source instead of starting a new referral." },
      { name: "Fire the conversion once, with its value", text: "Send the purchase on confirmation with its revenue. Sealmetrics counts what fires and does not deduplicate, so a reloaded thank-you page counts twice; on Shopify the purchase comes from the orders/create webhook." },
      { name: "Join revenue with spend", text: "Revenue by campaign is only half of ROAS. Join it with Google Ads or Meta Ads cost in BigQuery on the campaign value you tagged, or ask an assistant connected to both the Sealmetrics MCP server and the ad platform's." },
    ],
  },

  roles: {
    tag: "Who uses it",
    title: <>The same revenue,<br /><em>four budget arguments.</em></>,
    body: "Platforms keep optimising. The decision about where the next euro goes moves to a report none of them produced.",
    items: [
      { role: "Performance marketing", need: "Know which campaign and creative actually sold.", how: "Revenue by source, medium, campaign, content and term on every recorded session, including visitors who rejected cookies.", link: { label: "Conversion tracking", href: "/use-cases/conversion-tracking/" } },
      { role: "Agency", need: "Prove results on a number the client did not have to take on trust.", how: "The platforms still bid; the client judges the result on neutral, session-level attribution the agency did not produce.", link: { label: "Analytics for agencies", href: "/for/agencies/" } },
      { role: "CMO", need: "Move budget between channels without a fight.", how: "A channel mix measured on every session, so paid, social and organic are compared on the same base.", link: { label: "Analytics for CMOs", href: "/for/cmo/" } },
      { role: "Analytics / BI", need: "Build ROAS and MMM inputs on full-resolution data.", how: "BigQuery connector, REST API and MCP server over the same aggregate revenue the dashboard shows.", link: { label: "Integrations", href: "/integrations/" } },
    ],
  },

  proof: {
    tag: "Measured in practice",
    quote: {
      text: "The value is in optimising budget and investment. You shift toward a channel or strategy you were not seeing before.",
      cite: "Eduardo Martin · Analytics & Campaigns · Dreamplace Hotels",
      person: "Eduardo Martin",
      role: "Analytics & Campaigns, Dreamplace Hotels",
    },
    body: "Dreamplace Hotels runs Sealmetrics as an independent layer, compares attributed sales with its CRM total and uses the remaining gap as a quality signal. The difference is not a data-quality curiosity: it changes where the paid-media budget goes.",
    figures: [
      { value: "15–20%", label: "more sales attributed than with the previous tool, reconciled against the CRM", client: "Dreamplace Hotels", href: "/case-studies/dreamplace-hotels/" },
      { value: "+165%", label: "Display Cost-per-Search after rebalancing partners, placements and audiences", client: "Palladium Hotel Group", href: "/case-studies/palladium-hotel-group/" },
      { value: "12 pts", label: "gap in paid campaigns' share of traffic between GA4 (50%) and Sealmetrics (62%)", client: "Incapto", href: "/case-studies/incapto/" },
    ],
    readCase: "Read the case",
  },

  limits: {
    tag: "What it does not measure",
    title: <>Last click per session.<br /><em>On purpose.</em></>,
    body: (
      <>
        Multi-touch models need to know that two visits were the same person,
        which needs an identifier and brings back the consent loss. Sealmetrics
        does not build one. Earlier influence belongs in a{" "}
        <Link className={link} href="/glossary/attribution-model/">different attribution model</Link>{" "}
        built on aggregate spend and revenue.
      </>
    ),
    items: [
      ["No multi-touch model", "Credit is not split across a person's visits, because no visit is linked to a person. That is the trade-off that removes the identifier."],
      ["No view-through", "Impressions that did not produce a click are not measured. View-through lives in the ad platform or in a marketing-mix model."],
      ["A returning visit takes the credit", "If a customer first arrives from Google Ads and buys later through a newsletter, the newsletter gets the sale. There is no lookback window across sessions."],
      ["Only as good as the tags", "Untagged Meta traffic blends with organic, and redirects that strip parameters lose the campaign for good."],
      ["No push back to the platforms", "Sealmetrics does not send conversions to Google Ads or Meta for automated bidding. Keep the platform's own consent-gated conversion setup for that."],
      ["No measured ROI claim", "The Incapto comparison measured traffic, orders and channel mix, not return on ad spend. Your ROAS comes from your own spend data."],
    ],
  },

  faqTag: "Common questions",
  faqTitle: <>Before you move<br /><em>the next budget.</em></>,
  faq: [
    { question: "How do you attribute revenue without cookies?", answer: "Sealmetrics reads the UTM parameters and ad click IDs in the landing URL when a session starts, and credits any conversion in that session to its most recent source. No identifier is stored on the device, so the visit is measured whether or not the visitor accepts cookies. Revenue then rolls up by source, medium, campaign, content and term." },
    { question: "Can I see revenue by campaign and creative, not just by channel?", answer: "Yes, as long as the links carry the parameters. Revenue rolls up by utm_source, utm_medium, utm_campaign, utm_term and utm_content, and utm_content is where the creative goes. In Google Ads a ValueTrack tracking template adds campaign and keyword automatically; in Meta Ads the UTMs go in each ad's URL parameters." },
    { question: "Why does GA4 show fewer conversions for my paid campaigns than Meta or Google Ads?", answer: "The platforms credit conversions to their own ads inside their own attribution windows, and can include modelled and view-through conversions. GA4 only records visitors who accept the banner, and paid traffic loses more to it: on Incapto's Shopify store, Sealmetrics saw 37% to 52% more paid-campaign traffic than GA4." },
    { question: "Why last click and not multi-touch?", answer: "Multi-touch needs to link visits to the same person across sessions, which needs a cookie, a fingerprint or a stitched ID, and that identifier brings back the consent requirement and the traffic lost to the banner. Last click within a session needs no identifier, so it can be applied to every session Sealmetrics records. It does not measure earlier influence." },
    { question: "What about view-through attribution?", answer: "Sealmetrics does not measure view-through, because linking an ad impression to a later visit needs a per-person identifier. View-through belongs in the ad platform or in a marketing-mix model built on aggregate spend and revenue, where Sealmetrics can provide the revenue side." },
    { question: "What happens if a customer comes back later through another channel?", answer: "The sale goes to the source of the session in which it happens. If the customer first came from Google Ads and returned through direct the next day, direct gets the credit. Sessions close after about two hours of inactivity and there is no lookback window, which is the explicit cost of not tracking individuals." },
    { question: "Can Sealmetrics send conversions back to Google Ads or Meta for bidding?", answer: "No. Sealmetrics does not push conversions or audiences to the ad platforms. Most teams keep the platform's own conversion setup, gated by consent, for automated bidding, and use Sealmetrics to decide how much budget each channel and campaign gets." },
    { question: "How does this reconcile with CRM revenue?", answer: "Against the order total for the same period, not order by order. In Incapto's 48-day parallel run on Shopify, Sealmetrics recorded 96% of real online-store orders and 97% of revenue. Sealmetrics counts what fires and does not store order IDs, so fire the conversion once per confirmed order and compare totals and channels." },
  ],

  final: {
    tag: "Attribution review",
    title: <>See which campaigns sold<br /><em>on your own traffic.</em></>,
    body: "Book 30 minutes with the founder. We look at your campaign tagging, run last-click attribution on your sessions and compare it with what the platforms and GA4 report.",
    primary: { label: "Book an attribution review", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const revenueAttributionEs: ProblemLandingContent = {
  route: "/use-cases/revenue-attribution",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Atribución de ingresos" },
  ],
  eyebrow: "Caso de uso · Atribución de ingresos por campaña",
  h1: <>Tus campañas se juzgan<br />con quien<br /><em>aceptó las cookies.</em></>,
  heroBody:
    "Las plataformas de anuncios evalúan sus propios anuncios y GA4 solo ve a quien acepta el banner, una pérdida que golpea más al tráfico de pago que a casi ningún otro. Sealmetrics atribuye cada euro de ingresos a canal, campaña y creatividad en cada sesión que registra, acepte o no el visitante las cookies, para que el presupuesto se mueva según lo que vendió de verdad.",
  heroPrimary: { label: "Ver la configuración", href: "#method" },
  heroSecondary: { label: "Leer el caso Dreamplace", href: "/es/case-studies/dreamplace-hotels/" },
  heroMicro: "Canal · campaña · creatividad · último clic por sesión · sin cookies · alojado en Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    // The Spanish page is new: this date is its publication, not a revision.
    updatedLabel: "Publicado",
    date: REVENUE_ATTRIBUTION_MODIFIED,
    dateDisplay: "14 de septiembre de 2026",
  },
  module: {
    title: "Un pedido · cuatro informes",
    status: "Quién se lleva el mérito",
    rows: [
      ["Meta Ads", "Su anuncio, en su ventana"],
      ["Google Ads", "Su anuncio, en su ventana"],
      ["GA4", "Solo si aceptó las cookies"],
      ["Sealmetrics", "Último clic de la sesión"],
    ],
    foot: "Misma venta · hasta tres aspirantes · uno medido en cada sesión",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      La atribución de ingresos sin cookies asigna los ingresos de cada pedido
      al canal, la campaña y la creatividad de la sesión en la que ocurrió, sin
      guardar nada en el dispositivo del visitante. Responde qué campañas
      vendieron de verdad cuando las plataformas evalúan sus propios anuncios y
      GA4 pierde a quien rechaza el banner, una pérdida que golpea más al tráfico
      de pago: en la tienda Shopify de Incapto, Sealmetrics vio entre un 37% y un
      52% más de tráfico de campañas de pago que GA4. Sealmetrics lee los
      parámetros UTM y los identificadores de clic de la URL de llegada, asigna
      cada conversión a la fuente más reciente de su sesión y agrega los ingresos
      por source, medium, campaign, content y term. El ROAS sale de cruzar esos
      ingresos con la inversión de cada plataforma. El modelo es último clic por
      sesión: no mide view-through ni atribuye visitas anteriores, que se
      analizan en un marketing-mix model.
    </p>
  ),

  divergence: {
    tag: "Por qué ningún informe coincide",
    title: <>Una venta.<br /><em>Tres aspirantes.</em></>,
    body: "Cada informe es coherente consigo mismo. No coinciden porque atribuyen cosas distintas, ven visitantes distintos y los evalúan personas distintas.",
    headers: ["Informe", "Cómo atribuye la venta", "Por qué engaña al presupuesto", "Para qué usarlo"],
    rows: [
      ["Meta Ads y Google Ads", "A su propio anuncio, dentro de su ventana de atribución; puede incluir conversiones modeladas y view-through", "Cada plataforma se evalúa a sí misma, así que la misma venta puede reclamarse dos veces", "Pujas y pruebas de creatividades dentro de la plataforma"],
      ["GA4 con Consent Mode", "Sobre las visitas que registró: quien aceptó y no bloqueó, más estimaciones", "Los canales que traen audiencia nueva pierden más visitas por el banner, así que pago y social parecen más débiles de lo que son", "Tendencias sobre la parte con consentimiento"],
      ["Sistema de pedidos o CRM", "La venta en sí, con el origen que llegó al checkout", "Totales exactos, pero sin un canal fiable detrás de cada pedido", "La verdad de los ingresos"],
      ["Sealmetrics", "Al último clic de la sesión en la que ocurrió el pedido, en cada sesión registrada", "Sin visitas anteriores ni view-through", "Decisiones de presupuesto por canal y campaña"],
    ],
    note: (
      <>
        Qué es y qué no es cada modelo se explica en{" "}
        <Link className={link} href="/es/glossary/attribution-model/">modelos de atribución</Link>{" "}
        y{" "}
        <Link className={link} href="/es/glossary/revenue-attribution/">atribución de ingresos</Link>.
        Cuando el desacuerdo llega a finanzas, el problema pasa a ser{" "}
        <Link className={link} href="/es/use-cases/single-source-of-truth/">una sola cifra para marketing y finanzas</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que cuesta no saberlo",
    title: <>El presupuesto sigue<br /><em>al informe que se ve.</em></>,
    body: "Cuando la atribución se calcula sobre la parte del tráfico que dio su consentimiento, el error no es ruido. Tiene dirección, y apunta lejos de las campañas que traen clientes nuevos.",
    items: [
      ["01", "El pago parece peor de lo que es", "En Incapto, GA4 situaba las campañas de pago en el 50% del tráfico; medidas sobre todas las visitas eran el 62%. En visitas de pago, Sealmetrics vio entre un 37% y un 52% más que GA4; es un rango porque GA4 agrupa parte de la inversión como Cross-network."],
      ["02", "El presupuesto se queda donde se ve", "Dreamplace Hotels atribuye un 15–20% más de ventas con Sealmetrics que con su herramienta anterior, y usó esa visión para mover presupuesto hacia un canal que antes no estaba viendo. Meta y Google fueron los primeros presupuestos en moverse."],
      ["03", "El volumen se confunde con rendimiento", "Palladium Hotel Group veía actividad en las plataformas, pero no podía comparar partners, soportes y audiencias con el mismo criterio. Atribuir cada visita y juzgar el mix por coste por búsqueda de disponibilidad mejoró un 165% el Coste por Búsqueda en Display."],
    ],
  },

  method: {
    id: "method",
    tag: "La configuración",
    title: <>Etiqueta una vez.<br /><em>Lee ingresos por campaña.</em></>,
    body: (
      <>
        Sin cookies, la URL de llegada es el único sitio del que puede salir la
        atribución, así que la configuración consiste sobre todo en qué lleva esa
        URL. El funcionamiento de fondo, sin identificadores, está explicado en{" "}
        <Link className={link} href="/es/how-it-works/">cómo funciona</Link>, y la
        pérdida que evita, en{" "}
        <Link className={link} href="/es/complete-data/">datos completos</Link>.
      </>
    ),
    howToName: "Cómo atribuir ingresos a campañas sin cookies",
    howToDescription:
      "Cinco pasos para ver ingresos por canal, campaña y creatividad sin cookies, desde el etiquetado hasta el ROAS.",
    steps: [
      { name: "Etiqueta cada enlace de pago", text: "Añade utm_source, utm_medium y utm_campaign a cada URL de destino, y utm_content para la creatividad. En Google Ads, una plantilla de seguimiento con ValueTrack a nivel de cuenta lo aplica a todas las campañas; en Meta Ads, añade los UTM en los parámetros de URL de cada anuncio." },
      { name: "Mapea tus propios nombres de parámetro", text: "Si una agencia o tu herramienta de email usa nombres como campaign_id, UTM Mapping los copia a los UTM estándar cuando llega la visita. Solo afecta al tráfico nuevo, así que configúralo antes de lanzar la campaña." },
      { name: "Evita que dominios externos se lleven el mérito", text: "Las pasarelas de pago se reconocen automáticamente. Registra motores de reservas, SSO o un checkout externo como passthrough referrers, para que la vuelta conserve el origen en lugar de abrir un referral nuevo." },
      { name: "Dispara la conversión una vez, con su valor", text: "Envía la compra al confirmarse, con sus ingresos. Sealmetrics cuenta lo que se dispara y no deduplica, así que recargar la página de gracias cuenta dos veces; en Shopify la compra llega con el webhook orders/create." },
      { name: "Cruza ingresos con inversión", text: "Los ingresos por campaña son solo la mitad del ROAS. Únelos al coste de Google Ads o Meta Ads en BigQuery por el valor de campaña que etiquetaste, o pregunta a un asistente conectado al servidor MCP de Sealmetrics y al de la plataforma." },
    ],
  },

  roles: {
    tag: "Quién lo usa",
    title: <>Los mismos ingresos,<br /><em>cuatro argumentos de presupuesto.</em></>,
    body: "Las plataformas siguen optimizando. La decisión de adónde va el siguiente euro pasa a un informe que ninguna de ellas ha producido.",
    items: [
      { role: "Performance marketing", need: "Saber qué campaña y qué creatividad vendieron de verdad.", how: "Ingresos por source, medium, campaign, content y term en cada sesión registrada, incluidos quienes rechazaron las cookies.", link: { label: "Analítica para eCommerce", href: "/es/for/ecommerce/" } },
      { role: "Agencia", need: "Demostrar resultados con una cifra que el cliente no tiene que creerse a ciegas.", how: "Las plataformas siguen pujando; el cliente juzga el resultado con una atribución neutral por sesión que la agencia no ha producido.", link: { label: "Analítica para agencias", href: "/es/for/agencies/" } },
      { role: "CMO", need: "Mover presupuesto entre canales sin una pelea.", how: "Un mix de canales medido en cada sesión, para comparar pago, social y orgánico sobre la misma base.", link: { label: "Analítica para CMOs", href: "/es/for/cmo/" } },
      { role: "Analítica / BI", need: "Construir ROAS y los datos de un MMM sobre dato a resolución completa.", how: "Conector de BigQuery, API REST y servidor MCP sobre los mismos ingresos agregados que muestra el dashboard.", link: { label: "Integraciones", href: "/es/integrations/" } },
    ],
  },

  proof: {
    tag: "Medido en la práctica",
    quote: {
      text: "El valor está en optimizar presupuesto e inversión. Derivas hacia un canal o estrategia que antes no estabas viendo.",
      cite: "Eduardo Martin · Analítica y Campañas · Dreamplace Hotels",
      person: "Eduardo Martin",
      role: "Analítica y Campañas, Dreamplace Hotels",
    },
    body: "Dreamplace Hotels ejecuta Sealmetrics como capa independiente, compara la venta atribuida con el total de su CRM y usa la diferencia que queda como señal de calidad. Esa diferencia no es una curiosidad de calidad del dato: cambia adónde va el presupuesto de paid media.",
    figures: [
      { value: "15–20%", label: "más ventas atribuidas que con la herramienta anterior, conciliadas con el CRM", client: "Dreamplace Hotels", href: "/es/case-studies/dreamplace-hotels/" },
      { value: "+165%", label: "Coste por Búsqueda en Display tras reequilibrar partners, soportes y audiencias", client: "Palladium Hotel Group", href: "/es/case-studies/palladium-hotel-group/" },
      { value: "12 pts", label: "de diferencia en el peso de las campañas de pago entre GA4 (50%) y Sealmetrics (62%)", client: "Incapto", href: "/es/case-studies/incapto/" },
    ],
    readCase: "Leer el caso",
  },

  limits: {
    tag: "Lo que no mide",
    title: <>Último clic por sesión.<br /><em>A propósito.</em></>,
    body: (
      <>
        Los modelos multi-touch necesitan saber que dos visitas eran la misma
        persona, lo que exige un identificador y devuelve la pérdida por
        consentimiento. Sealmetrics no lo construye. La influencia anterior se
        analiza con un{" "}
        <Link className={link} href="/es/glossary/multi-touch-attribution/">modelo distinto</Link>{" "}
        construido sobre inversión e ingresos agregados.
      </>
    ),
    items: [
      ["Sin modelo multi-touch", "El mérito no se reparte entre las visitas de una persona, porque ninguna visita se asocia a una persona. Ese es el trade-off que elimina el identificador."],
      ["Sin view-through", "No se miden las impresiones que no generaron clic. El view-through vive en la plataforma de anuncios o en un marketing-mix model."],
      ["La visita de vuelta se lleva el mérito", "Si un cliente llega primero desde Google Ads y compra después desde una newsletter, la venta es de la newsletter. No hay ventana de atribución entre sesiones."],
      ["Tan bueno como el etiquetado", "El tráfico de Meta sin UTM se mezcla con el orgánico, y las redirecciones que eliminan parámetros pierden la campaña para siempre."],
      ["No devuelve conversiones a las plataformas", "Sealmetrics no envía conversiones a Google Ads ni a Meta para las pujas automáticas. Para eso, mantén la configuración de conversiones de la propia plataforma, sujeta a consentimiento."],
      ["Sin cifra de ROI medida", "La comparación de Incapto midió tráfico, pedidos y mix de canales, no retorno de la inversión publicitaria. Tu ROAS sale de tus propios datos de inversión."],
    ],
  },

  faqTag: "Preguntas frecuentes",
  faqTitle: <>Antes de mover<br /><em>el próximo presupuesto.</em></>,
  faq: [
    { question: "¿Cómo se atribuyen ingresos sin cookies?", answer: "Sealmetrics lee los parámetros UTM y los identificadores de clic de la URL de llegada cuando empieza una sesión, y asigna cualquier conversión de esa sesión a su fuente más reciente. No se guarda ningún identificador en el dispositivo, así que la visita se mide acepte o no el visitante las cookies. Después los ingresos se agregan por source, medium, campaign, content y term." },
    { question: "¿Puedo ver ingresos por campaña y creatividad, no solo por canal?", answer: "Sí, siempre que los enlaces lleven los parámetros. Los ingresos se agregan por utm_source, utm_medium, utm_campaign, utm_term y utm_content, y utm_content es donde va la creatividad. En Google Ads una plantilla de seguimiento con ValueTrack añade campaña y palabra clave automáticamente; en Meta Ads los UTM van en los parámetros de URL de cada anuncio." },
    { question: "¿Por qué GA4 muestra menos conversiones de mis campañas que Meta o Google Ads?", answer: "Las plataformas atribuyen conversiones a sus propios anuncios dentro de su ventana de atribución y pueden incluir conversiones modeladas y view-through. GA4 solo registra a quien acepta el banner, y el tráfico de pago pierde más por él: en la tienda Shopify de Incapto, Sealmetrics vio entre un 37% y un 52% más de tráfico de campañas de pago que GA4." },
    { question: "¿Por qué último clic y no multi-touch?", answer: "El multi-touch necesita asociar visitas a la misma persona entre sesiones, lo que exige una cookie, un fingerprint o un ID unificado, y ese identificador devuelve el requisito de consentimiento y el tráfico que se pierde con el banner. El último clic dentro de una sesión no necesita identificador, así que se puede aplicar a cada sesión que registra Sealmetrics. No mide la influencia anterior." },
    { question: "¿Y la atribución view-through?", answer: "Sealmetrics no mide view-through, porque asociar una impresión a una visita posterior exige un identificador por persona. El view-through se analiza en la plataforma de anuncios o en un marketing-mix model construido sobre inversión e ingresos agregados, donde Sealmetrics puede aportar el lado de los ingresos." },
    { question: "¿Qué pasa si el cliente vuelve más tarde por otro canal?", answer: "La venta va a la fuente de la sesión en la que ocurre. Si el cliente llegó primero desde Google Ads y volvió al día siguiente en directo, el mérito es de directo. Las sesiones se cierran tras unas dos horas de inactividad y no hay ventana de atribución, que es el coste explícito de no seguir a las personas." },
    { question: "¿Puede Sealmetrics devolver conversiones a Google Ads o Meta para las pujas?", answer: "No. Sealmetrics no envía conversiones ni audiencias a las plataformas de anuncios. La mayoría de equipos mantiene la configuración de conversiones de la propia plataforma, sujeta a consentimiento, para las pujas automáticas, y usa Sealmetrics para decidir cuánto presupuesto recibe cada canal y campaña." },
    { question: "¿Cómo cuadra con los ingresos del CRM?", answer: "Contra el total de pedidos del mismo periodo, no pedido a pedido. En la medición en paralelo de Incapto sobre Shopify, 48 días, Sealmetrics registró el 96% de los pedidos reales de la tienda online y el 97% de la facturación. Sealmetrics cuenta lo que se dispara y no guarda el ID del pedido, así que dispara la conversión una vez por pedido confirmado y compara totales y canales." },
  ],

  final: {
    tag: "Revisión de atribución",
    title: <>Mira qué campañas vendieron<br /><em>con tu propio tráfico.</em></>,
    body: "Reserva 30 minutos con el founder. Revisamos el etiquetado de tus campañas, aplicamos la atribución al último clic sobre tus sesiones y la comparamos con lo que informan las plataformas y GA4.",
    primary: { label: "Reservar una revisión de atribución", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
