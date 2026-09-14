import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * Problem C — "Marketing and finance have different numbers".
 *
 * Every figure on this page is already published on a named case study
 * (src/lib/content/case-studies.tsx) or in docs.sealmetrics.com. Nothing may be
 * new here: this is the page a CFO forwards, and the first unsourced number is
 * the one that ends the conversation.
 *
 * Product facts it relies on, all verified against the docs:
 * - attribution is session-scoped last click, no lookback across sessions
 * - Sealmetrics counts exactly what fires; it does not deduplicate or validate
 *   orders, and the Shopify order ID is not stored
 * - agency staff can be members of several organizations (org switcher)
 * - BigQuery connector, REST API and MCP server read the same dataset
 */

const ROUTE = "/use-cases/single-source-of-truth";

const link = "sig-problem-inline";

export const singleSourceOfTruthEn: ProblemLandingContent = {
  route: ROUTE,
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Use cases", href: "/use-cases/" },
    { label: "Single source of truth" },
  ],
  eyebrow: "Use case · Marketing, agency, analytics, CFO",
  h1: <>Marketing and finance<br />are reading<br /><em>different numbers.</em></>,
  heroBody:
    "The ad platform claims one figure, GA4 shows another, the order system records a third and finance books a fourth. Sealmetrics gives marketing, agencies, analytics and the CFO one measured total — checked against the orders that actually happened — so the meeting can move on to the decision.",
  heroPrimary: { label: "See the reconciliation method", href: "#method" },
  heroSecondary: { label: "Read the Palladium case", href: "/case-studies/palladium-hotel-group/" },
  heroMicro: "Checked against real orders · last click per session · no cookies · EU-hosted in Dublin",
  module: {
    title: "Same week · four sources",
    status: "Four definitions",
    rows: [
      ["Ad platform", "Conversions it credits itself"],
      ["GA4", "Consented visits + estimates"],
      ["Order system", "Orders that happened"],
      ["Finance", "Revenue net of refunds"],
    ],
    foot: "None of them is lying · only one is anchored in fact · none carries the channel",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      A single source of truth for marketing and finance is one measured total
      that every team accepts because it can be checked against something that
      really happened: the orders or bookings the business recorded. Marketing
      numbers disagree because each tool counts something different. Ad
      platforms report the conversions they credit to themselves, which can
      include modelled and view-through conversions. GA4 only records visitors
      who accept the banner and are not blocked, and fills part of the gap with
      Consent Mode estimates. The order system records what was sold, without a
      dependable channel. Finance books revenue after refunds, taxes and
      shipping. Sealmetrics sits in the middle: it counts sessions without
      cookies, attributes revenue to the last click of each session, and is
      reconciled against the order total first. On Incapto&apos;s Shopify store
      it recorded 96% of real orders and 97% of revenue over 48 days. It does
      not replace the finance ledger or match individual orders to people.
    </p>
  ),

  divergence: {
    tag: "Why the numbers never match",
    title: <>Nobody is lying.<br /><em>Everyone counts differently.</em></>,
    body: "Each system answers a different question with its own definition of a conversion. The disagreement is structural, which is why another reconciliation spreadsheet never ends it.",
    headers: ["Source", "What it counts", "Why it drifts", "Who defends it"],
    rows: [
      ["Ad platforms (Meta, Google Ads)", "Conversions the platform credits to its own ads", "Its own attribution window; modelled and view-through conversions, depending on settings; two platforms can claim the same sale", "The agency or performance team"],
      ["GA4 with Consent Mode", "Sessions from visitors who accepted the banner and were not blocked", "Visitors who reject the banner are not recorded; part of the gap is estimated; traffic with no usable source lands in direct or unassigned", "Analytics"],
      ["Order system (Shopify, CRM, PMS)", "Orders and bookings that were placed", "Accurate totals, but no dependable channel behind each order", "eCommerce and sales"],
      ["Finance ledger", "Recognised revenue", "Net of refunds, taxes, shipping and cancellations, often booked after the order", "The CFO"],
    ],
    note: (
      <>
        The measured cost of that gap: at{" "}
        <Link className={link} href="/case-studies/palladium-hotel-group/">Palladium Hotel Group</Link>,
        40% of inbound traffic had no source or medium and 35% of the bookings
        GA4 recorded had no channel. At{" "}
        <Link className={link} href="/case-studies/incapto/">Incapto</Link>, 14 of
        every 100 GA4 visits had no origin anyone could act on, against 0.3% in
        Sealmetrics. Why consent-based tools lose that traffic is covered under{" "}
        <Link className={link} href="/glossary/consent-mode-v2/">Consent Mode v2</Link> and{" "}
        <Link className={link} href="/glossary/data-loss-in-analytics/">data loss in analytics</Link>.
      </>
    ),
  },

  costs: {
    tag: "What the disagreement costs",
    title: <>The budget follows<br /><em>whichever number wins.</em></>,
    body: "When no figure is trusted, the loudest report sets the plan. The cost shows up in three places.",
    items: [
      ["01", "Meetings spent on the data", "Brand, departments and agencies arrive with different numbers and different incentives. The review ends as a debate about which figure is right, and the decision waits. That was Palladium Hotel Group's starting point."],
      ["02", "Budget moved on the wrong base", "Consent loss is not even across channels. At Incapto, GA4 showed paid campaigns as 50% of traffic; measured on every visit they were 62%. Twelve points of difference in the line that decides media allocation."],
      ["03", "Agencies optimising for their own report", "Each platform credits itself, so every partner can defend its results. Without a neutral layer there is no fair way to compare partners, placements and audiences on the same terms."],
    ],
  },

  method: {
    id: "method",
    tag: "The reconciliation method",
    title: <>Anchor to the till.<br /><em>Then read the gap.</em></>,
    body: (
      <>
        Nothing here depends on trusting one vendor over another. You anchor every
        tool to a number none of them produces — the orders the business actually
        took — and only then compare. Why decisions skew on incomplete data is the
        argument behind{" "}
        <Link className={link} href="/complete-data/">complete data</Link>.
      </>
    ),
    howToName: "How to reconcile marketing data with the order total",
    howToDescription:
      "Five steps to give marketing, agencies, analytics and finance one measured total, anchored to the orders the business recorded.",
    steps: [
      { name: "Take the real order total", text: "Use the order system's own figures for the period: Shopify, your CRM or the PMS. Leave out subscriptions, in-store and manual orders, which have no web visit behind them." },
      { name: "Measure in parallel", text: "Keep your current analytics and run Sealmetrics on the same site over the same days. Nothing needs to be switched off." },
      { name: "Reconcile before you compare", text: "Check each tool against the order total first. A tool that cannot match the till is not a reference for anything else. At Incapto, Sealmetrics recorded 96% of real orders and 97% of revenue." },
      { name: "Read the difference by channel", text: "Once the total holds, break the gap down by channel, because that is where budget decisions change. Treat the remaining gap as a quality signal, as Dreamplace Hotels does against its CRM total." },
      { name: "Agree the number every team reports from", text: "Marketing, agencies, analytics and finance take the reconciled figure as the reference. Ad platforms keep optimising in their own interfaces; the budget conversation happens on the neutral layer." },
    ],
  },

  roles: {
    tag: "One number, four readers",
    title: <>The same total,<br /><em>read four ways.</em></>,
    body: "Every team keeps the tools it needs. What changes is the figure the decision is made on.",
    items: [
      { role: "CMO / Marketing", need: "Defend the budget with a number finance does not dispute.", how: "Channel revenue on every session, reconciled against orders before it reaches the board deck.", link: { label: "Analytics for CMOs", href: "/for/cmo/" } },
      { role: "Agency", need: "Show results on a figure the client does not have to take on trust.", how: "Agency staff can be members of each client's organization and switch between them. The platform still optimises bids; the result is judged on the neutral layer.", link: { label: "Analytics for agencies", href: "/for/agencies/" } },
      { role: "Analytics / BI", need: "Work from full-resolution data, not a sampled export.", how: "A BigQuery connector, the REST API and an MCP server read the same dataset the dashboard shows.", link: { label: "Integrations", href: "/integrations/" } },
      { role: "CFO / Finance", need: "Tie marketing revenue to the ledger.", how: "Aggregate reconciliation against the order total, EU-only processing in Dublin and a signed DPA. It does not replace revenue recognition.", link: { label: "Revenue attribution", href: "/use-cases/revenue-attribution/" } },
    ],
  },

  proof: {
    tag: "Measured in practice",
    quote: "Today every player is happy. The data is neutral, there's no black box, and everyone has accepted these numbers as the reference.",
    cite: "Toni Andújar · Digital & Direct Sales Director · Palladium Hotel Group",
    citePerson: "Toni Andújar",
    citeRole: "Digital & Direct Sales Director, Palladium Hotel Group",
    body: "Palladium Hotel Group moved the final discussion with its brand, departments and agencies onto one neutral measurement layer. Agencies still optimise their platforms; the decisions are checked in one place.",
    figures: [
      { value: "+165%", label: "Display Cost-per-Search after rebalancing on the neutral model", client: "Palladium Hotel Group", href: "/case-studies/palladium-hotel-group/" },
      { value: "15–20%", label: "more sales attributed, with the CRM total as the reconciliation point", client: "Dreamplace Hotels", href: "/case-studies/dreamplace-hotels/" },
      { value: "96%", label: "of real Shopify orders recorded, reconciled before any comparison", client: "Incapto", href: "/case-studies/incapto/" },
    ],
    readCase: "Read the case",
  },

  limits: {
    tag: "What it does not fix",
    title: <>A shared number<br /><em>has edges.</em></>,
    body: (
      <>
        Stating the limits is what makes the number defensible in front of
        finance. Attribution is{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last click</Link>{" "}
        within each session, by design.
      </>
    ),
    items: [
      ["It does not replace the finance ledger", "Refunds, cancellations and revenue recognition happen after the order. Reconcile to the order total; finance still closes the books."],
      ["It does not match orders to people", "Sealmetrics does not store order IDs or identify visitors, so reconciliation is on totals and channels, never row by row."],
      ["It counts what fires", "It does not deduplicate or validate orders. Fire the conversion once per confirmed order; on Shopify it comes from the orders/create webhook."],
      ["Ad platforms will still report more", "They credit themselves and can count modelled or view-through conversions. Keep them for bidding; decide the budget on the reconciled layer."],
      ["Last click per session, nothing more", "No multi-touch model, no view-through, no journeys across sessions. Earlier influence belongs in a marketing-mix model."],
      ["Orders without a web visit stay outside", "Phone, in-store and manual orders have no session to attribute."],
    ],
  },

  faqTag: "Questions teams ask",
  faqTitle: <>Before the next<br /><em>numbers meeting.</em></>,
  faq: [
    { question: "Why don't marketing and finance numbers match?", answer: "Because each system counts something different. Ad platforms report the conversions they credit to their own ads, GA4 records only visitors who accepted cookies and were not blocked, the order system records orders without a dependable channel, and finance books revenue after refunds, taxes and shipping. The fix is not a better spreadsheet but one measured total anchored to the orders that actually happened." },
    { question: "Why does GA4 show fewer conversions than Shopify?", answer: "GA4 does not record visitors who reject the consent banner or block the script, and Consent Mode only estimates part of that gap. When Incapto ran GA4 and Sealmetrics side by side on its Shopify store for 48 days, GA4 did not record 29% of visits, while Sealmetrics recorded 96% of the store's real orders." },
    { question: "Why do Meta Ads and Google Ads report more conversions than my CRM?", answer: "Each platform credits conversions to its own ads within its own attribution window, and depending on settings it can include modelled and view-through conversions. When two platforms touch the same sale, both can claim it. Their reports are useful for bidding, not as the shared total." },
    { question: "What is a single source of truth in marketing analytics?", answer: "One measured total that marketing, agencies, analytics and finance all accept as the reference, because it reconciles with recorded orders and nobody in the room produced it to defend their own results. Palladium Hotel Group uses Sealmetrics this way across brand, departments and agencies." },
    { question: "Can Sealmetrics match each order in my CRM to the channel that drove it?", answer: "No. Sealmetrics does not store order IDs or identify visitors, so reconciliation happens on totals and by channel, not row by row. It is the same design that lets it measure without cookies." },
    { question: "Do we have to stop using GA4 or the ad platforms' reports?", answer: "No. Most teams keep GA4 and the ad platforms running for Google Ads and Meta optimisation. What changes is the number the budget decision is made on: the reconciled Sealmetrics total." },
    { question: "How long does it take to know whether the numbers reconcile?", answer: "Run both tools over a full commercial cycle. Incapto's reconciliation covered 48 days; most teams run a parallel test of at least 30 days before moving budget decisions." },
  ],

  final: {
    tag: "Reconciliation review",
    title: <>Bring your order total.<br /><em>We bring the other side.</em></>,
    body: "Thirty minutes: we compare what your analytics and ad platforms report with the orders your business recorded, and show where the channel picture changes.",
    primary: { label: "Book a reconciliation review", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const singleSourceOfTruthEs: ProblemLandingContent = {
  route: ROUTE,
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Fuente única de verdad" },
  ],
  eyebrow: "Caso de uso · Marketing, agencia, analítica, CFO",
  h1: <>Marketing y Finanzas<br />leen<br /><em>números distintos.</em></>,
  heroBody:
    "La plataforma de anuncios dice una cifra, GA4 otra, el sistema de pedidos registra una tercera y finanzas contabiliza una cuarta. Sealmetrics da a marketing, agencias, analítica y dirección financiera un único total medido —contrastado con los pedidos que ocurrieron de verdad— para que la reunión pueda pasar a la decisión.",
  heroPrimary: { label: "Ver el método de conciliación", href: "#method" },
  heroSecondary: { label: "Leer el caso Palladium", href: "/es/case-studies/palladium-hotel-group/" },
  heroMicro: "Contrastado con pedidos reales · último clic por sesión · sin cookies · alojado en Dublín",
  module: {
    title: "Misma semana · cuatro fuentes",
    status: "Cuatro definiciones",
    rows: [
      ["Plataforma de anuncios", "Conversiones que se atribuye"],
      ["GA4", "Visitas con consentimiento + estimaciones"],
      ["Sistema de pedidos", "Pedidos que ocurrieron"],
      ["Finanzas", "Ingresos netos de devoluciones"],
    ],
    foot: "Ninguna miente · solo una se ancla en hechos · ninguna trae el canal",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      Una fuente única de verdad para marketing y finanzas es un total medido
      que todos los equipos aceptan porque se puede contrastar con algo que
      ocurrió de verdad: los pedidos o reservas que registró el negocio. Las
      cifras de marketing no cuadran porque cada herramienta cuenta una cosa
      distinta. Las plataformas de anuncios informan de las conversiones que se
      atribuyen, que pueden incluir conversiones modeladas y view-through. GA4
      solo registra a quien acepta el banner y no bloquea el script, y rellena
      parte del hueco con estimaciones de Consent Mode. El sistema de pedidos
      registra lo vendido, sin un canal fiable detrás. Finanzas contabiliza los
      ingresos después de devoluciones, impuestos y envíos. Sealmetrics se sitúa
      en medio: cuenta sesiones sin cookies, atribuye los ingresos al último clic
      de cada sesión y se concilia primero con el total de pedidos. En la tienda
      Shopify de Incapto registró el 96% de los pedidos reales y el 97% de la
      facturación en 48 días. No sustituye a la contabilidad ni asocia pedidos a
      personas.
    </p>
  ),

  divergence: {
    tag: "Por qué las cifras nunca cuadran",
    title: <>Nadie miente.<br /><em>Cada uno cuenta distinto.</em></>,
    body: "Cada sistema responde a una pregunta distinta con su propia definición de conversión. El desacuerdo es estructural, y por eso otra hoja de conciliación nunca lo resuelve.",
    headers: ["Fuente", "Qué cuenta", "Por qué se desvía", "Quién la defiende"],
    rows: [
      ["Plataformas de anuncios (Meta, Google Ads)", "Las conversiones que la plataforma atribuye a sus propios anuncios", "Su propia ventana de atribución; conversiones modeladas y view-through según la configuración; dos plataformas pueden reclamar la misma venta", "La agencia o el equipo de performance"],
      ["GA4 con Consent Mode", "Sesiones de visitantes que aceptaron el banner y no bloquearon el script", "Quien rechaza el banner no queda registrado; parte del hueco se estima; el tráfico sin origen utilizable acaba en directo o sin asignar", "Analítica"],
      ["Sistema de pedidos (Shopify, CRM, PMS)", "Pedidos y reservas realizados", "Totales exactos, pero sin un canal fiable detrás de cada pedido", "eCommerce y ventas"],
      ["Contabilidad", "Ingresos reconocidos", "Netos de devoluciones, impuestos, envíos y cancelaciones, a menudo contabilizados después del pedido", "La dirección financiera"],
    ],
    note: (
      <>
        El coste medido de esa brecha: en{" "}
        <Link className={link} href="/es/case-studies/palladium-hotel-group/">Palladium Hotel Group</Link>,
        el 40% del tráfico entrante no tenía source ni medium y el 35% de las
        reservas que registraba GA4 no tenía canal. En{" "}
        <Link className={link} href="/es/case-studies/incapto/">Incapto</Link>, 14 de
        cada 100 visitas de GA4 no tenían un origen sobre el que decidir, frente al
        0,3% en Sealmetrics. Por qué las herramientas con consentimiento pierden ese
        tráfico se explica en{" "}
        <Link className={link} href="/es/glossary/data-loss-in-analytics/">pérdida de datos en analítica</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que cuesta el desacuerdo",
    title: <>El presupuesto sigue<br /><em>a la cifra que gana.</em></>,
    body: "Cuando ninguna cifra inspira confianza, el informe que más se oye marca el plan. El coste aparece en tres sitios.",
    items: [
      ["01", "Reuniones dedicadas al dato", "Marca, departamentos y agencias llegan con cifras distintas e incentivos distintos. La revisión acaba discutiendo qué número es el bueno y la decisión espera. Ese era el punto de partida de Palladium Hotel Group."],
      ["02", "Presupuesto movido sobre una base equivocada", "La pérdida por consentimiento no es igual en todos los canales. En Incapto, GA4 mostraba las campañas de pago como el 50% del tráfico; medidas sobre todas las visitas eran el 62%. Doce puntos de diferencia en la línea que decide el reparto de medios."],
      ["03", "Agencias optimizando para su propio informe", "Cada plataforma se atribuye resultados, así que cada partner puede defender los suyos. Sin una capa neutral no hay forma justa de comparar partners, soportes y audiencias con el mismo criterio."],
    ],
  },

  method: {
    id: "method",
    tag: "El método de conciliación",
    title: <>Ancla en la caja.<br /><em>Después lee la diferencia.</em></>,
    body: (
      <>
        Nada de esto depende de fiarse más de un proveedor que de otro. Anclas
        todas las herramientas a una cifra que ninguna produce —los pedidos que el
        negocio cobró de verdad— y solo entonces comparas. Por qué las decisiones se
        tuercen con dato incompleto es el argumento de{" "}
        <Link className={link} href="/es/complete-data/">datos completos</Link>.
      </>
    ),
    howToName: "Cómo conciliar el dato de marketing con el total de pedidos",
    howToDescription:
      "Cinco pasos para dar a marketing, agencias, analítica y finanzas un único total medido, anclado a los pedidos que registró el negocio.",
    steps: [
      { name: "Toma el total real de pedidos", text: "Usa las cifras del propio sistema de pedidos para el periodo: Shopify, tu CRM o el PMS. Deja fuera suscripciones, tienda física y pedidos manuales, que no tienen una visita web detrás." },
      { name: "Mide en paralelo", text: "Mantén tu analítica actual y ejecuta Sealmetrics en la misma web durante los mismos días. No hace falta apagar nada." },
      { name: "Concilia antes de comparar", text: "Contrasta primero cada herramienta con el total de pedidos. Una herramienta que no cuadra con la caja no sirve de referencia para nada más. En Incapto, Sealmetrics registró el 96% de los pedidos reales y el 97% de la facturación." },
      { name: "Lee la diferencia por canal", text: "Cuando el total se sostiene, desglosa la brecha por canal, porque ahí es donde cambian las decisiones de presupuesto. Trata la diferencia que queda como una señal de calidad, como hace Dreamplace Hotels con el total de su CRM." },
      { name: "Acuerda la cifra desde la que informan todos", text: "Marketing, agencias, analítica y finanzas toman el total conciliado como referencia. Las plataformas de anuncios siguen optimizando en sus propias interfaces; la conversación de presupuesto se tiene sobre la capa neutral." },
    ],
  },

  roles: {
    tag: "Una cifra, cuatro lectores",
    title: <>El mismo total,<br /><em>leído de cuatro formas.</em></>,
    body: "Cada equipo conserva las herramientas que necesita. Lo que cambia es la cifra sobre la que se decide.",
    items: [
      { role: "CMO / Marketing", need: "Defender el presupuesto con una cifra que finanzas no discute.", how: "Ingresos por canal sobre cada sesión, conciliados con los pedidos antes de llegar al comité.", link: { label: "Analítica para CMOs", href: "/es/for/cmo/" } },
      { role: "Agencia", need: "Enseñar resultados sobre una cifra que el cliente no tiene que creerse a ciegas.", how: "El equipo de la agencia puede ser miembro de la organización de cada cliente y cambiar entre ellas. La plataforma sigue optimizando pujas; el resultado se juzga en la capa neutral.", link: { label: "Analítica para agencias", href: "/es/for/agencies/" } },
      { role: "Analítica / BI", need: "Trabajar con dato a resolución completa, no con un export muestreado.", how: "El conector de BigQuery, la API REST y un servidor MCP leen el mismo dataset que muestra el dashboard.", link: { label: "Integraciones", href: "/es/integrations/" } },
      { role: "CFO / Finanzas", need: "Atar los ingresos de marketing a la contabilidad.", how: "Conciliación agregada contra el total de pedidos, procesamiento solo en la UE (Dublín) y DPA firmado. No sustituye al reconocimiento de ingresos.", link: { label: "Datos completos", href: "/es/complete-data/" } },
    ],
  },

  proof: {
    tag: "Medido en la práctica",
    quote: "Hoy todos los players están contentos. Los datos son neutrales, no hay caja negra y todos han aceptado estos valores como la referencia.",
    cite: "Toni Andújar · Director Digital y Venta Directa · Palladium Hotel Group",
    citePerson: "Toni Andújar",
    citeRole: "Director Digital y Venta Directa, Palladium Hotel Group",
    body: "Palladium Hotel Group llevó la discusión final con su marca, departamentos y agencias a una única capa neutral de medición. Las agencias siguen optimizando sus plataformas; las decisiones se contrastan en un solo sitio.",
    figures: [
      { value: "+165%", label: "Coste por Búsqueda en Display tras reequilibrar sobre el modelo neutral", client: "Palladium Hotel Group", href: "/es/case-studies/palladium-hotel-group/" },
      { value: "15–20%", label: "más ventas atribuidas, con el total del CRM como punto de conciliación", client: "Dreamplace Hotels", href: "/es/case-studies/dreamplace-hotels/" },
      { value: "96%", label: "de los pedidos reales de Shopify registrados, conciliados antes de comparar nada", client: "Incapto", href: "/es/case-studies/incapto/" },
    ],
    readCase: "Leer el caso",
  },

  limits: {
    tag: "Lo que no resuelve",
    title: <>Una cifra compartida<br /><em>tiene límites.</em></>,
    body: (
      <>
        Decir los límites es lo que hace defendible la cifra delante de finanzas.
        La atribución es al último clic dentro de cada sesión, por diseño; los{" "}
        <Link className={link} href="/es/glossary/attribution-model/">modelos de atribución</Link>{" "}
        alternativos necesitan identificar a la persona entre sesiones.
      </>
    ),
    items: [
      ["No sustituye a la contabilidad", "Las devoluciones, las cancelaciones y el reconocimiento de ingresos ocurren después del pedido. Concilia con el total de pedidos; el cierre sigue siendo de finanzas."],
      ["No asocia pedidos a personas", "Sealmetrics no guarda el ID del pedido ni identifica visitantes, así que la conciliación se hace sobre totales y canales, nunca fila a fila."],
      ["Cuenta lo que se dispara", "No deduplica ni valida pedidos. Dispara la conversión una vez por pedido confirmado; en Shopify llega con el webhook orders/create."],
      ["Las plataformas seguirán informando de más", "Se atribuyen resultados y pueden contar conversiones modeladas o view-through. Úsalas para pujar; decide el presupuesto sobre la capa conciliada."],
      ["Último clic por sesión, nada más", "Sin modelo multi-touch, sin view-through y sin recorridos entre sesiones. La influencia anterior se analiza en un marketing-mix model."],
      ["Los pedidos sin visita web quedan fuera", "Los pedidos por teléfono, en tienda o manuales no tienen una sesión que atribuir."],
    ],
  },

  faqTag: "Preguntas de los equipos",
  faqTitle: <>Antes de la próxima<br /><em>reunión de cifras.</em></>,
  faq: [
    { question: "¿Por qué no cuadran las cifras de marketing y finanzas?", answer: "Porque cada sistema cuenta una cosa distinta. Las plataformas de anuncios informan de las conversiones que atribuyen a sus propios anuncios, GA4 solo registra a quien aceptó las cookies y no bloqueó el script, el sistema de pedidos registra pedidos sin un canal fiable y finanzas contabiliza los ingresos después de devoluciones, impuestos y envíos. La solución no es una hoja de cálculo mejor, sino un único total medido y anclado a los pedidos que ocurrieron." },
    { question: "¿Por qué GA4 muestra menos conversiones que Shopify?", answer: "GA4 no registra a quien rechaza el banner de consentimiento o bloquea el script, y Consent Mode solo estima una parte de ese hueco. Cuando Incapto midió GA4 y Sealmetrics en paralelo sobre su tienda Shopify durante 48 días, GA4 no registró el 29% de las visitas, mientras Sealmetrics registraba el 96% de los pedidos reales." },
    { question: "¿Por qué Meta Ads y Google Ads informan de más conversiones que mi CRM?", answer: "Cada plataforma atribuye conversiones a sus propios anuncios dentro de su ventana de atribución y, según la configuración, puede incluir conversiones modeladas y view-through. Si dos plataformas tocan la misma venta, las dos pueden reclamarla. Sus informes sirven para pujar, no como total compartido." },
    { question: "¿Qué es una fuente única de verdad en analítica de marketing?", answer: "Un total medido que marketing, agencias, analítica y finanzas aceptan como referencia porque cuadra con los pedidos registrados y nadie en la sala lo ha producido para defender sus propios resultados. Palladium Hotel Group usa Sealmetrics así entre marca, departamentos y agencias." },
    { question: "¿Puede Sealmetrics asociar cada pedido de mi CRM al canal que lo generó?", answer: "No. Sealmetrics no guarda el ID del pedido ni identifica visitantes, así que la conciliación se hace sobre totales y por canal, no fila a fila. Es el mismo diseño que le permite medir sin cookies." },
    { question: "¿Tenemos que dejar de usar GA4 o los informes de las plataformas?", answer: "No. La mayoría de equipos mantiene GA4 y las plataformas de anuncios para optimizar Google Ads y Meta. Lo que cambia es la cifra sobre la que se decide el presupuesto: el total conciliado de Sealmetrics." },
    { question: "¿Cuánto se tarda en saber si las cifras cuadran?", answer: "Ejecuta las dos herramientas durante un ciclo comercial completo. La conciliación de Incapto cubrió 48 días; la mayoría de equipos hace una prueba en paralelo de al menos 30 días antes de mover decisiones de presupuesto." },
  ],

  final: {
    tag: "Revisión de conciliación",
    title: <>Trae tu total de pedidos.<br /><em>Nosotros traemos el otro lado.</em></>,
    body: "Treinta minutos: comparamos lo que dicen tu analítica y tus plataformas de anuncios con los pedidos que registró tu negocio, y te enseñamos dónde cambia la foto por canal.",
    primary: { label: "Reservar una revisión de conciliación", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
