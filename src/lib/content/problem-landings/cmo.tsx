import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /for/cmo — Phase 6 follow-up: the role page for the marketing leader.
 *
 * The CMO reads problems B and C from the budget seat: three sources bring
 * three totals to the review, and the channel mix changes with the one you
 * read. The page does not repeat the reconciliation method of
 * /use-cases/single-source-of-truth or the tagging method of
 * /use-cases/revenue-attribution; it links to both and stays on the decision.
 *
 * Facts: attribution is last click per session; Sealmetrics sends no
 * conversions to ad platforms and imports no spend (docs, as verified for the
 * integration pages). Figures from case-studies.tsx only: Incapto (96%/97%,
 * 29%, paid share 50% vs 62%, channel deltas), Palladium (40%, +165%),
 * Dreamplace (15–20% more sales attributed, second quote approved).
 *
 * Removed from the old VerticalPageV3 version: "+30–70% traffic recovered"
 * and "4–6 h per week saved" (no source), "agencies that push back are
 * inflating their reports" (unfounded), the categorical GDPR FAQ shared by all
 * verticals, and "see your real numbers in 30 minutes".
 */

export const CMO_PUBLISHED = "2026-03-01";
export const CMO_PUBLISHED_ES = "2026-04-18";
export const CMO_MODIFIED = "2026-09-15";

const link = "sig-problem-inline";

export const cmoEn: ProblemLandingContent = {
  route: "/for/cmo",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "For teams", href: "/for/" },
    { label: "CMOs" },
  ],
  eyebrow: "Role · CMO and marketing leadership",
  h1: <>Three reports.<br />Three totals.<br /><em>One budget to defend.</em></>,
  heroBody:
    "The ad platforms, GA4 and finance each bring a different revenue figure to the budget review, and the channel mix changes depending on which one you read. Sealmetrics gives marketing one measured total, without consent loss and reconciled with the orders the business recorded, so the meeting moves from whose number is right to where the next euro goes.",
  heroPrimary: { label: "See how to defend the budget", href: "#method" },
  heroSecondary: { label: "Read the Dreamplace case", href: "/case-studies/dreamplace-hotels/" },
  heroMicro: "Reconciled with your orders · last click per session · no cookies · EU-hosted in Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: CMO_MODIFIED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "Budget review · same quarter",
    status: "Three sources",
    rows: [
      ["Ad platforms", "Sales they credit to themselves"],
      ["GA4", "Visitors who accepted the banner"],
      ["Finance", "Orders and revenue booked"],
      ["Sealmetrics", "Measured, then checked against finance"],
    ],
    foot: "The decision needs finance's total and a channel split you can defend",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Analytics for a CMO is the measurement a marketing budget can be defended
      on: a channel and campaign split that finance accepts because its total
      matches the orders the business recorded. Most budget reviews combine three
      sources that disagree by design. Ad platforms credit sales to their own
      ads, GA4 behind a consent banner does not record visitors who reject it,
      and finance books revenue without a dependable channel. Because consent
      loss is uneven by channel, the mix itself moves: in Incapto&apos;s parallel
      run, GA4 put paid campaigns at 50% of traffic against 62% measured without
      consent loss. Sealmetrics counts visits without cookies, credits each order
      to the last click of its session, and is reconciled with the order total
      before any channel is read; at Incapto it recorded 96% of real orders. It
      does not model multi-touch attribution or replace an incrementality test.
    </p>
  ),

  divergence: {
    tag: "Why the budget review stalls",
    title: <>Every question<br /><em>has three answers.</em></>,
    body: "The questions a CMO is asked are simple. Each is answered today by a report that either loses part of the traffic or has a stake in the answer.",
    headers: ["The question in the room", "Where it is answered today", "Why the answer is disputed", "What a measured base changes"],
    rows: [
      ["Is paid media working?", "Meta Ads Manager and Google Ads", "Each platform credits its own ads, with its own window and modelled conversions", "Revenue by campaign read from the landing page, the same way for every platform"],
      ["Which channel is growing?", "GA4 channel report", "Consent loss is uneven, so channels that bring new visitors look smaller", "Channel shares on traffic measured without consent loss"],
      ["Can we cut this channel?", "Last quarter's GA4 numbers", "The channel may be under-recorded rather than under-performing", "A measured share first, then a test before cutting"],
      ["Does marketing revenue match finance?", "A reconciliation spreadsheet", "Different definitions, different dates, no shared total", "A total reconciled with booked orders before anyone reads a channel"],
      ["Is the agency's report right?", "The agency's platform dashboards", "Built by the party being evaluated", "A layer neither marketing nor the agency produced"],
    ],
    note: (
      <>
        Measured, not modelled: at{" "}
        <Link className={link} href="/case-studies/palladium-hotel-group/">Palladium Hotel Group</Link>,
        40% of inbound traffic had no source or medium before the review; at{" "}
        <Link className={link} href="/case-studies/incapto/">Incapto</Link>, 14 of
        every 100 GA4 visits had no usable origin, against 0.3% measured. The
        reconciliation behind a shared figure is set out in{" "}
        <Link className={link} href="/use-cases/single-source-of-truth/">single source of truth</Link>.
      </>
    ),
  },

  costs: {
    tag: "What a disputed number costs",
    title: <>The budget follows<br /><em>the loudest report.</em></>,
    body: "When no figure is trusted, the plan is set by whichever report arrives with the most confidence. It shows in three places.",
    items: [
      ["01", "Media moved on a distorted mix", "At Incapto, paid campaigns were 50% of traffic in GA4 and 62% measured without consent loss. Twelve points in the line that decides media allocation."],
      ["02", "Growth channels under-credited", "Sealmetrics recorded 11% more direct traffic than GA4 at Incapto, but 62% more from organic search and 133% more from organic social. The channels that find new customers were the ones GA4 understated most."],
      ["03", "Reviews spent on the data", "Palladium Hotel Group's starting point was brand teams, departments and agencies arriving at the same meeting with different numbers and different incentives."],
    ],
  },

  method: {
    id: "method",
    tag: "Defending the budget",
    title: <>Agree the total.<br /><em>Then argue the split.</em></>,
    body: (
      <>
        Five steps that move the budget conversation onto a base finance can
        check. How campaigns are tagged and credited is set out in{" "}
        <Link className={link} href="/use-cases/revenue-attribution/">revenue attribution</Link>.
      </>
    ),
    howToName: "How a CMO builds a marketing budget case finance accepts",
    howToDescription:
      "Five steps to reconcile marketing revenue with booked orders, read the channel mix on a measured base and move budget with tests before cuts.",
    steps: [
      { name: "Agree the total with finance first", text: "Take the online orders and revenue finance recognises for the period and agree what is excluded: in-store, phone and manual orders, refunds and taxes. That total is the reference every other number is checked against." },
      { name: "Measure in parallel for a full cycle", text: "Run Sealmetrics next to GA4 and the ad platforms over at least one full commercial cycle, including a campaign period. Nothing needs to be switched off. Incapto reconciled 48 days before reading channels." },
      { name: "Reconcile before reading channels", text: "Compare measured orders and revenue with finance's total. At Incapto, Sealmetrics recorded 96% of real orders and 97% of revenue. Only once the total holds is the channel split worth debating." },
      { name: "Read the mix on the measured base", text: "Put each channel's share of traffic and revenue next to GA4's for the same days. The largest differences point to the budget lines that have been decided on the wrong number." },
      { name: "Move budget, and test before cutting", text: "Shift investment toward channels that sell on the reconciled base. Keep the platforms' own reports for bidding. Before cutting a prospecting or video line that looks weak on last click, run a holdout or geographic test." },
    ],
  },

  roles: {
    tag: "Who sits at the budget table",
    title: <>One total,<br /><em>four readers.</em></>,
    body: "Each team keeps its tools. The budget is decided on the figure they all accept.",
    items: [
      { role: "CMO", need: "A channel split the board and finance do not dispute.", how: "Revenue by channel and campaign on a base reconciled with booked orders.", link: { label: "Single source of truth", href: "/use-cases/single-source-of-truth/" } },
      { role: "Head of performance", need: "Campaign results outside the platforms' own reports.", how: "Revenue by campaign and creative from the landing page's UTMs, joined with each platform's spend.", link: { label: "Revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "CFO", need: "Marketing revenue that ties to the ledger.", how: "Measured totals reconciled with booked orders before any channel is read. It does not replace revenue recognition.", link: { label: "Complete data", href: "/complete-data/" } },
      { role: "Agencies", need: "Results judged on a figure they did not produce.", how: "The client owns the organization; agency staff work inside it with their own login.", link: { label: "Analytics for agencies", href: "/for/agencies/" } },
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
    body: "Dreamplace Hotels has used Sealmetrics for almost two years to allocate paid media, with the group's CRM total as the reconciliation point. Meta and Google were the first budget lines it moved.",
    figures: [
      { value: "15–20%", label: "more sales attributed than the previous tool, checked against the CRM total", client: "Dreamplace Hotels", href: "/case-studies/dreamplace-hotels/" },
      { value: "12 pts", label: "difference in paid campaigns' share of traffic, 50% in GA4 against 62% measured", client: "Incapto", href: "/case-studies/incapto/" },
      { value: "+165%", label: "Display Cost-per-Search after rebalancing on a neutral model", client: "Palladium Hotel Group", href: "/case-studies/palladium-hotel-group/" },
    ],
    readCase: "Read the case",
  },

  limits: {
    tag: "What it does not settle",
    title: <>A defensible number<br /><em>still has edges.</em></>,
    body: (
      <>
        Stating them is what keeps the number defensible. Attribution is{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last click</Link>{" "}
        within each session, by design.
      </>
    ),
    items: [
      ["Not a multi-touch model", "Earlier sessions, views and impressions get no credit. Incrementality tests and marketing-mix models answer that question."],
      ["It does not feed bidding", "Sealmetrics sends no conversions to Google Ads or Meta. The platforms keep their own pixels and APIs for optimisation."],
      ["It does not import spend", "Return on spend joins measured revenue with each platform's cost, in a spreadsheet, in BigQuery or through an AI assistant."],
      ["Orders without a web visit stay outside", "Phone, in-store and manual orders have no session to attribute."],
      ["Reconciliation is on totals", "Order IDs are not stored, so measured orders are compared with finance by period and channel, never order by order."],
      ["It does not replace the ledger", "Refunds, cancellations and revenue recognition stay with finance."],
    ],
  },

  faqTag: "Questions CMOs ask",
  faqTitle: <>Before the next<br /><em>budget review.</em></>,
  faq: [
    { question: "How can a CMO defend the marketing budget with numbers finance accepts?", answer: "Agree the online order total with finance first, measure marketing on a base that does not lose visitors at the consent banner, and reconcile that measured total with finance's before reading any channel. Once the total holds, the channel split is a marketing decision rather than a dispute about data." },
    { question: "Why do GA4, the ad platforms and finance report different revenue?", answer: "Each counts something different. Ad platforms credit sales to their own ads within their own attribution windows, GA4 does not record visitors who reject the consent banner, and finance books revenue after refunds and taxes without a dependable channel. None of them is wrong on its own terms; they answer different questions." },
    { question: "Do we have to replace GA4 and the ad platforms' reports?", answer: "No. Keep the platforms for bidding and GA4 for the uses that need it, such as Google Ads audiences. What changes is the figure the budget between channels is decided on." },
    { question: "How long should we measure before moving budget?", answer: "At least one full commercial cycle, including a campaign period. Incapto reconciled 48 days of orders before comparing channels; Dreamplace has used Sealmetrics for almost two years to move paid-media budget." },
    { question: "Will agencies accept a number they did not produce?", answer: "It is easier to accept a figure neither side produced than one the other side did. Palladium Hotel Group uses Sealmetrics as the reference its brand, departments and agencies accept, while the agencies keep optimising inside their platforms." },
    { question: "Can Sealmetrics calculate return on ad spend?", answer: "It measures revenue by channel, campaign and creative; it does not import spend. Return on spend joins that revenue with each platform's cost on the campaign values you tagged, in a spreadsheet, in BigQuery or through an AI assistant connected to the Sealmetrics MCP server and the platform's own connector." },
  ],

  final: {
    tag: "Budget review",
    title: <>Bring last quarter&apos;s totals.<br /><em>See which channels move.</em></>,
    body: "Thirty minutes: we compare what your ad platforms, analytics and finance reported for the same period and show where the channel split changes on a measured base.",
    primary: { label: "Book a budget review", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const cmoEs: ProblemLandingContent = {
  route: "/for/cmo",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Por equipo", href: "/es/for/" },
    { label: "CMOs" },
  ],
  eyebrow: "Rol · CMO y dirección de marketing",
  h1: <>Tres informes.<br />Tres totales.<br /><em>Un presupuesto que defender.</em></>,
  heroBody:
    "Las plataformas publicitarias, GA4 y finanzas llevan cada una una cifra de ingresos distinta a la revisión de presupuesto, y el mix de canales cambia según cuál leas. Sealmetrics da a marketing un total medido, sin pérdida por consentimiento y conciliado con los pedidos que registró el negocio, para que la reunión pase de discutir de quién es la cifra buena a decidir dónde va el siguiente euro.",
  heroPrimary: { label: "Ver cómo defender el presupuesto", href: "#method" },
  heroSecondary: { label: "Leer el caso Dreamplace", href: "/es/case-studies/dreamplace-hotels/" },
  heroMicro: "Conciliado con tus pedidos · último clic por sesión · sin cookies · alojado en Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Actualizado",
    date: CMO_MODIFIED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Revisión de presupuesto · mismo trimestre",
    status: "Tres fuentes",
    rows: [
      ["Plataformas publicitarias", "Ventas que se atribuyen"],
      ["GA4", "Quien aceptó el banner"],
      ["Finanzas", "Pedidos e ingresos contabilizados"],
      ["Sealmetrics", "Medido y contrastado con finanzas"],
    ],
    foot: "La decisión necesita el total de finanzas y un reparto por canal defendible",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      La analítica para un CMO es la medición sobre la que se puede defender un
      presupuesto de marketing: un reparto por canal y campaña que finanzas acepta
      porque su total cuadra con los pedidos que registró el negocio. La mayoría
      de las revisiones de presupuesto mezclan tres fuentes que no coinciden por
      diseño. Las plataformas se atribuyen las ventas, GA4 detrás de un banner no
      registra a quien lo rechaza y finanzas contabiliza ingresos sin un canal
      fiable. Como la pérdida por consentimiento es desigual por canal, el propio
      mix se mueve: en la medición en paralelo de Incapto, GA4 daba a las
      campañas de pago el 50% del tráfico frente al 62% medido. Sealmetrics cuenta
      visitas sin cookies, atribuye cada pedido al último clic de su sesión y se
      concilia con el total de pedidos antes de leer ningún canal; en Incapto
      registró el 96% de los pedidos reales. No modela atribución multitoque ni
      sustituye un test de incrementalidad.
    </p>
  ),

  divergence: {
    tag: "Por qué se atasca la revisión de presupuesto",
    title: <>Cada pregunta<br /><em>tiene tres respuestas.</em></>,
    body: "Las preguntas que recibe un CMO son sencillas. Hoy las responde un informe que o pierde parte del tráfico o tiene interés en la respuesta.",
    headers: ["La pregunta en la sala", "Dónde se responde hoy", "Por qué se discute", "Qué cambia con una base medida"],
    rows: [
      ["¿Funciona la inversión en medios?", "Meta Ads Manager y Google Ads", "Cada plataforma se atribuye sus anuncios, con su ventana y sus conversiones modeladas", "Ingresos por campaña leídos en la página de llegada, igual para todas las plataformas"],
      ["¿Qué canal crece?", "Informe de canales de GA4", "La pérdida por consentimiento es desigual y los canales que traen visitas nuevas parecen más pequeños", "Cuotas por canal sobre tráfico medido sin pérdida por consentimiento"],
      ["¿Podemos recortar este canal?", "Las cifras de GA4 del último trimestre", "Puede estar infrarregistrado, no rindiendo menos", "Primero una cuota medida, después un test antes de recortar"],
      ["¿Cuadran los ingresos de marketing con finanzas?", "Una hoja de conciliación", "Definiciones distintas, fechas distintas, ningún total común", "Un total conciliado con los pedidos contabilizados antes de leer ningún canal"],
      ["¿Tiene razón el informe de la agencia?", "Los paneles de plataforma de la agencia", "Los ha construido la parte evaluada", "Una capa que no ha producido ni marketing ni la agencia"],
    ],
    note: (
      <>
        Medido, no modelado: en{" "}
        <Link className={link} href="/es/case-studies/palladium-hotel-group/">Palladium Hotel Group</Link>,
        el 40% del tráfico entrante no tenía source ni medium antes de la revisión;
        en{" "}
        <Link className={link} href="/es/case-studies/incapto/">Incapto</Link>, 14 de
        cada 100 visitas de GA4 no tenían un origen utilizable, frente al 0,3%
        medido. La conciliación que hay detrás de una cifra común se explica en{" "}
        <Link className={link} href="/es/use-cases/single-source-of-truth/">fuente única de verdad</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que cuesta una cifra discutida",
    title: <>El presupuesto sigue<br /><em>al informe que más grita.</em></>,
    body: "Cuando nadie se fía de ninguna cifra, el plan lo decide el informe que llega con más seguridad. Se nota en tres sitios.",
    items: [
      ["01", "Medios repartidos sobre un mix deformado", "En Incapto, las campañas de pago eran el 50% del tráfico en GA4 y el 62% medido sin pérdida por consentimiento. Doce puntos en la línea que decide la inversión en medios."],
      ["02", "Canales de crecimiento infravalorados", "Sealmetrics registró en Incapto un 11% más de tráfico directo que GA4, pero un 62% más desde búsqueda orgánica y un 133% más desde social orgánico. Los canales que traen clientes nuevos eran los que GA4 más infravaloraba."],
      ["03", "Reuniones dedicadas a los datos", "El punto de partida de Palladium Hotel Group eran equipos de marca, departamentos y agencias llegando a la misma reunión con cifras distintas e intereses distintos."],
    ],
  },

  method: {
    id: "method",
    tag: "Defender el presupuesto",
    title: <>Primero el total.<br /><em>Después el reparto.</em></>,
    body: (
      <>
        Cinco pasos para llevar la conversación de presupuesto a una base que
        finanzas pueda comprobar. Cómo se etiquetan y atribuyen las campañas se
        explica en{" "}
        <Link className={link} href="/es/use-cases/revenue-attribution/">atribución de ingresos</Link>.
      </>
    ),
    howToName: "Cómo construye un CMO un caso de presupuesto que finanzas acepta",
    howToDescription:
      "Cinco pasos para conciliar los ingresos de marketing con los pedidos contabilizados, leer el mix de canales sobre una base medida y mover presupuesto con tests antes de recortar.",
    steps: [
      { name: "Acuerda primero el total con finanzas", text: "Toma los pedidos online y los ingresos que reconoce finanzas en el periodo y acordad qué queda fuera: pedidos en tienda, por teléfono y manuales, devoluciones e impuestos. Ese total es la referencia con la que se contrasta todo lo demás." },
      { name: "Mide en paralelo un ciclo completo", text: "Usa Sealmetrics junto a GA4 y las plataformas publicitarias durante al menos un ciclo comercial completo, con un periodo de campaña dentro. No hace falta desactivar nada. Incapto concilió 48 días antes de leer canales." },
      { name: "Concilia antes de leer canales", text: "Compara los pedidos y los ingresos medidos con el total de finanzas. En Incapto, Sealmetrics registró el 96% de los pedidos reales y el 97% de la facturación. Solo cuando el total cuadra merece la pena discutir el reparto por canal." },
      { name: "Lee el mix sobre la base medida", text: "Pon la cuota de tráfico e ingresos de cada canal junto a la de GA4 para los mismos días. Las mayores diferencias señalan las partidas de presupuesto que se han decidido con la cifra equivocada." },
      { name: "Mueve presupuesto y prueba antes de recortar", text: "Lleva inversión a los canales que venden sobre la base conciliada. Mantén los informes de las plataformas para pujar. Antes de recortar una línea de prospección o de vídeo que parece floja a último clic, haz un test con grupo de control o por zonas." },
    ],
  },

  roles: {
    tag: "Quién se sienta en la mesa de presupuesto",
    title: <>Un total,<br /><em>cuatro lectores.</em></>,
    body: "Cada equipo conserva sus herramientas. El presupuesto se decide con la cifra que todos aceptan.",
    items: [
      { role: "CMO", need: "Un reparto por canal que dirección y finanzas no discutan.", how: "Ingresos por canal y campaña sobre una base conciliada con los pedidos contabilizados.", link: { label: "Fuente única de verdad", href: "/es/use-cases/single-source-of-truth/" } },
      { role: "Responsable de performance", need: "Resultados de campaña fuera de los informes de las plataformas.", how: "Ingresos por campaña y creatividad a partir de las UTM de la página de llegada, cruzados con la inversión de cada plataforma.", link: { label: "Atribución de ingresos", href: "/es/use-cases/revenue-attribution/" } },
      { role: "Director financiero", need: "Ingresos de marketing que cuadren con la contabilidad.", how: "Totales medidos y conciliados con los pedidos contabilizados antes de leer ningún canal. No sustituye al reconocimiento de ingresos.", link: { label: "Datos completos", href: "/es/complete-data/" } },
      { role: "Agencias", need: "Resultados evaluados con una cifra que no han producido.", how: "El cliente es dueño de la organización y la agencia trabaja dentro con su propio acceso.", link: { label: "Analítica para agencias", href: "/es/for/agencies/" } },
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
    body: "Dreamplace Hotels lleva casi dos años usando Sealmetrics para repartir la inversión en medios, con el total del CRM del grupo como punto de conciliación. Meta y Google fueron las primeras partidas que movió.",
    figures: [
      { value: "15–20%", label: "más ventas atribuidas que con la herramienta anterior, contrastadas con el total del CRM", client: "Dreamplace Hotels", href: "/es/case-studies/dreamplace-hotels/" },
      { value: "12 pts", label: "de diferencia en la cuota de tráfico de las campañas de pago: 50% en GA4 frente a 62% medido", client: "Incapto", href: "/es/case-studies/incapto/" },
      { value: "+165%", label: "de mejora del Coste por Búsqueda de Display tras reequilibrar con un modelo neutral", client: "Palladium Hotel Group", href: "/es/case-studies/palladium-hotel-group/" },
    ],
    readCase: "Leer el caso",
  },

  limits: {
    tag: "Lo que no resuelve",
    title: <>Una cifra defendible<br /><em>también tiene límites.</em></>,
    body: (
      <>
        Decirlos es lo que la mantiene defendible. La atribución es a último clic
        dentro de cada sesión, por diseño; los{" "}
        <Link className={link} href="/es/glossary/attribution-model/">modelos de atribución</Link>{" "}
        explican la diferencia.
      </>
    ),
    items: [
      ["No es un modelo multitoque", "Las sesiones anteriores, las visualizaciones y las impresiones no reciben mérito. Esa pregunta la responden los tests de incrementalidad y los modelos de marketing mix."],
      ["No alimenta las pujas", "Sealmetrics no envía conversiones a Google Ads ni a Meta. Las plataformas mantienen sus píxeles y APIs para optimizar."],
      ["No importa la inversión", "El retorno sobre la inversión cruza los ingresos medidos con el coste de cada plataforma, en una hoja de cálculo, en BigQuery o con un asistente de IA."],
      ["Los pedidos sin visita web quedan fuera", "Los pedidos por teléfono, en tienda o manuales no tienen sesión que atribuir."],
      ["La conciliación es por totales", "Los IDs de pedido no se guardan, así que los pedidos medidos se comparan con finanzas por periodo y canal, nunca pedido a pedido."],
      ["No sustituye a la contabilidad", "Las devoluciones, las cancelaciones y el reconocimiento de ingresos siguen en finanzas."],
    ],
  },

  faqTag: "Lo que preguntan los CMOs",
  faqTitle: <>Antes de la próxima<br /><em>revisión de presupuesto.</em></>,
  faq: [
    { question: "¿Cómo puede un CMO defender el presupuesto de marketing con cifras que finanzas acepte?", answer: "Acordando primero con finanzas el total de pedidos online, midiendo marketing sobre una base que no pierde visitas en el banner de consentimiento y conciliando ese total medido con el de finanzas antes de leer ningún canal. Cuando el total cuadra, el reparto por canal pasa a ser una decisión de marketing y no una discusión sobre los datos." },
    { question: "¿Por qué GA4, las plataformas publicitarias y finanzas dan ingresos distintos?", answer: "Porque cada una cuenta una cosa distinta. Las plataformas se atribuyen las ventas con su propia ventana de atribución, GA4 no registra a quien rechaza el banner de consentimiento y finanzas contabiliza ingresos después de devoluciones e impuestos, sin un canal fiable. Ninguna se equivoca en sus propios términos: responden preguntas distintas." },
    { question: "¿Tenemos que sustituir GA4 y los informes de las plataformas?", answer: "No. Mantén las plataformas para pujar y GA4 para los usos que lo necesitan, como las audiencias de Google Ads. Lo que cambia es la cifra con la que se decide el reparto de presupuesto entre canales." },
    { question: "¿Cuánto tiempo conviene medir antes de mover presupuesto?", answer: "Al menos un ciclo comercial completo, con un periodo de campaña dentro. Incapto concilió 48 días de pedidos antes de comparar canales, y Dreamplace lleva casi dos años usando Sealmetrics para mover la inversión en medios." },
    { question: "¿Aceptarán las agencias una cifra que no han producido?", answer: "Es más fácil aceptar una cifra que no ha producido ninguna de las partes que una que ha producido la otra. Palladium Hotel Group usa Sealmetrics como la referencia que aceptan su marca, sus departamentos y sus agencias, mientras las agencias siguen optimizando dentro de sus plataformas." },
    { question: "¿Puede Sealmetrics calcular el retorno de la inversión publicitaria?", answer: "Mide los ingresos por canal, campaña y creatividad; no importa la inversión. El retorno cruza esos ingresos con el coste de cada plataforma sobre los valores de campaña que etiquetaste, en una hoja de cálculo, en BigQuery o con un asistente de IA conectado al servidor MCP de Sealmetrics y al conector de la propia plataforma." },
  ],

  final: {
    tag: "Revisión de presupuesto",
    title: <>Trae los totales del último trimestre.<br /><em>Mira qué canales se mueven.</em></>,
    body: "Treinta minutos: comparamos lo que reportaron tus plataformas, tu analítica y finanzas en el mismo periodo y te enseñamos dónde cambia el reparto por canal sobre una base medida.",
    primary: { label: "Reservar una revisión de presupuesto", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
