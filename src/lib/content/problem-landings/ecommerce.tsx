import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /for/ecommerce — Phase 6 of CONTENT-PLAN-PROBLEM-POSITIONING.md (DTC refocus).
 *
 * The vertical page for eCommerce and DTC teams, refocused on attribution with
 * Incapto as the proof. It does not repeat the platform pages (installation
 * detail lives on /platforms/shopify, /woocommerce and /magento) or the
 * attribution method (/use-cases/revenue-attribution): it answers the four
 * questions an eCommerce team asks every week — which channel, which campaign,
 * where the funnel leaks, which products — and anchors them to the store's
 * own orders.
 *
 * Product facts from docs.sealmetrics.com (checked 15 Sep 2026):
 * - reports/funnel: fixed eCommerce funnel Entrances → View Product → Add to
 *   Cart → Begin Checkout → Purchase, built from standard event names (legacy
 *   view_product accepted); Funnel by UTM table with microconversion and
 *   conversion columns; country selector; custom funnels not supported
 * - ecommerce-setup-guide: purchase with an optional items array; Properties
 *   report → Conv. Items tab shows product fields by source, medium and
 *   campaign, units counted by quantity
 * - integrations: Shopify purchase from the orders/create webhook with line
 *   items; WooCommerce purchase on the confirmation page with items; Magento
 *   2.4+ module (as verified for the platform pages)
 * - attribution is last click per session; order IDs are not stored; no
 *   conversions sent to ad platforms; no spend import
 * - install time is a range by platform, 5–30 minutes (/platforms table)
 *
 * Figures: Incapto only, as published in case-studies.tsx. Orders, visits and
 * browsing depth come from 14 Jun–31 Jul 2026; channel shares and unknown
 * origin from 28 Jul–6 Aug 2026 — the page never mixes the two windows in one
 * sentence as if they were one.
 *
 * Removed from the old VerticalPageV3 version: the "340 vs 180 conversions"
 * example with no source, "Black Friday captured at full resolution", "0
 * sampling" as an outcome, "Sealmetrics for attribution truth", and the
 * "5 minutes" setup FAQ.
 */

export const ECOMMERCE_PUBLISHED = "2026-03-02";
export const ECOMMERCE_PUBLISHED_ES = "2026-04-18";
export const ECOMMERCE_MODIFIED = "2026-09-15";

const link = "sig-problem-inline";

export const ecommerceEn: ProblemLandingContent = {
  route: "/for/ecommerce",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "For teams", href: "/for/" },
    { label: "eCommerce" },
  ],
  eyebrow: "Industry · eCommerce and DTC",
  h1: <>Your store knows<br />what sold.<br /><em>Not who sold it.</em></>,
  heroBody:
    "Shopify, WooCommerce or Magento records every order. The channel behind it comes from analytics that loses visitors at the consent banner and from ad platforms that credit themselves. Sealmetrics measures channels, the purchase funnel and the products each channel sells without consent loss, checked against your store's own orders before you move budget.",
  heroPrimary: { label: "See how to read the store", href: "#method" },
  heroSecondary: { label: "Read the Incapto case", href: "/case-studies/incapto/" },
  heroMicro: "Shopify · WooCommerce · Magento 2 · last click per session · no cookies · EU-hosted in Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: ECOMMERCE_MODIFIED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "Incapto · parallel run on Shopify",
    status: "Reconciled first",
    rows: [
      ["Real online-store orders recorded", "96%"],
      ["Visits GA4 did not record", "29%"],
      ["Paid campaigns, share of traffic", "GA4 50% · measured 62%"],
      ["Visits with no usable origin", "GA4 14% · measured 0.3%"],
    ],
    foot: "Orders and visits: 14 Jun–31 Jul 2026 · channel mix: 28 Jul–6 Aug 2026",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Analytics for eCommerce has to answer which channels, campaigns and
      products actually sell, on a base you can check against your store&apos;s
      orders. Most stores read that from GA4, which behind a consent banner does
      not record visitors who reject it, and from ad platforms, which credit sales
      to their own ads. The loss is uneven by channel, so the mix itself is wrong:
      in Incapto&apos;s parallel run on Shopify, GA4 showed paid campaigns as 50%
      of traffic against 62% measured without consent loss, and 14% of its visits
      had no usable origin. Sealmetrics counts visits without cookies and credits
      each order to the last click of its session. Its Shopify, WooCommerce and
      Magento 2 integrations send the purchase funnel and the line items of each
      order, so revenue can be read by channel, campaign, funnel step and product.
      It does not identify customers or send conversions to ad platforms.
    </p>
  ),

  divergence: {
    tag: "Why the store report misleads",
    title: <>The order is real.<br /><em>Its channel is a guess.</em></>,
    body: "An eCommerce team asks the same questions every week. Each one is answered today by a tool that either loses part of the traffic or has a stake in the answer, and only the store's order total is beyond dispute.",
    headers: ["The weekly question", "Where it is answered today", "What goes wrong", "What changes when it is measured"],
    rows: [
      ["Which channel sells?", "GA4 channel report", "Visitors who reject the banner are missing, and not evenly by channel; traffic with no usable source lands in Direct or Unassigned", "Channel revenue without consent loss; at Incapto, visits with no usable origin fell from 14% to 0.3%"],
      ["Which campaign sells?", "Meta Ads Manager and Google Ads", "Each platform credits its own ads, with its own attribution window and modelled conversions", "Revenue by utm_campaign and utm_content, read from the landing page"],
      ["Where does the funnel leak?", "GA4 funnel exploration", "Built only on the sessions GA4 recorded", "Entrances, product views, add to cart, checkout and purchase by source, medium and campaign"],
      ["Which products does each channel sell?", "Store admin or GA4 item reports", "The store knows the products but not the channel; GA4 knows the channel only for the visits it recorded", "The line items of each order by source, medium and campaign"],
      ["Does the total hold?", "Store admin", "Accurate, with no dependable channel", "The reconciliation point for everything above"],
    ],
    note: (
      <>
        Measured, not estimated: when{" "}
        <Link className={link} href="/case-studies/incapto/">Incapto</Link> ran GA4
        and Sealmetrics on its Shopify store for 48 days, GA4 did not record 29% of
        visits and 45% of pageviews, while Sealmetrics recorded 96% of the real
        online-store orders. How GA4 fills part of that gap with estimates is
        covered under{" "}
        <Link className={link} href="/glossary/consent-mode-v2/">Consent Mode v2</Link>;
        installation per platform is on{" "}
        <Link className={link} href="/platforms/shopify/">Shopify</Link>,{" "}
        <Link className={link} href="/platforms/woocommerce/">WooCommerce</Link> and{" "}
        <Link className={link} href="/platforms/magento/">Magento</Link>.
      </>
    ),
  },

  costs: {
    tag: "What the wrong base costs a store",
    title: <>The budget goes<br /><em>where the banner lets you see.</em></>,
    body: "Consent loss does not shrink the report evenly. It reshapes it, and each distortion lands on a decision the eCommerce team makes.",
    items: [
      ["01", "Media budget moved on a distorted mix", "At Incapto, GA4 put paid campaigns at 50% of traffic; measured without consent loss they were 62%. Twelve points of difference in the line of the report that decides media allocation."],
      ["02", "New-customer channels under-credited", "Channels that bring people who already know the brand barely moved: Sealmetrics recorded 11% more direct traffic than GA4. Organic search showed 62% more, affiliates 73% and organic social 133%. The channels that find new customers were the ones GA4 understated."],
      ["03", "Funnel and product decisions on the shallowest visits", "The visits GA4 missed at Incapto browsed 3.3 pages on average, against 1.6 for the visits it recorded. Product and funnel analysis built on the recorded visits leaves out the shoppers who look at most products."],
    ],
  },

  method: {
    id: "method",
    tag: "Reading the store on measured data",
    title: <>Reconcile with the till.<br /><em>Then read the store.</em></>,
    body: (
      <>
        Every step below starts from something the store recorded, not from a
        model. The attribution rules behind the channel numbers are set out in{" "}
        <Link className={link} href="/use-cases/revenue-attribution/">revenue attribution</Link>.
      </>
    ),
    howToName: "How an eCommerce team reads channels, funnel and products on measured data",
    howToDescription:
      "Six steps for an eCommerce or DTC team to reconcile measured revenue with the store's orders and then read channel mix, campaigns, funnel leaks and products by channel.",
    steps: [
      { name: "Install the integration for your platform", text: "On Shopify, connect the Sealmetrics Pixel app and enable the app embed; purchases arrive from the orders/create webhook. On WooCommerce and Magento 2, install the plugin or module. On other stores, add the tracker and fire the purchase with its items on the confirmation page. Depending on the platform it takes 5 to 30 minutes." },
      { name: "Reconcile orders and revenue with the store", text: "Compare measured purchases and revenue with the store's own online orders for the same period, timezone and currency. Leave out point-of-sale, marketplace, manual and subscription-renewal orders, which have no web visit behind them. At Incapto, Sealmetrics recorded 96% of real orders and 97% of revenue." },
      { name: "Read the channel mix on the measured base", text: "Put each channel's share of traffic and revenue next to GA4's for the same days. The largest differences are the channels whose budget has been decided on the wrong number." },
      { name: "Find where each source leaks in the funnel", text: "Open the Funnel report: entrances, product views, add to cart, begin checkout and purchase, with the rate at each step. Use the Funnel by UTM table to compare campaigns step by step and the country selector to isolate a market." },
      { name: "See which products each channel sells", text: "In the Properties report, open the Conv. Items tab and choose a product field, such as product name or category, to see units and orders by source, medium and campaign." },
      { name: "Move budget, and test before cutting", text: "Shift budget toward the channels and campaigns that sell on the reconciled base. Before cutting a prospecting or video campaign that looks weak on last click, run a holdout or geographic test and watch total measured revenue." },
    ],
  },

  roles: {
    tag: "Who uses it in the store",
    title: <>One order total,<br /><em>four desks.</em></>,
    body: "Each team keeps its tools. What changes is the base their weekly numbers are built on.",
    items: [
      { role: "eCommerce manager", need: "Know which channels and products drive the store's revenue.", how: "Revenue by channel and product on a base reconciled with the store's own orders.", link: { label: "Shopify integration", href: "/platforms/shopify/" } },
      { role: "Performance marketing", need: "Judge campaigns outside the platforms' own reports.", how: "Revenue by campaign and creative from the landing page's UTMs, joined with each platform's spend.", link: { label: "Revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "CRO and UX", need: "Find the funnel step that loses the most shoppers, by source.", how: "The fixed purchase funnel with rates per step, by campaign and by country.", link: { label: "What a funnel measures", href: "/glossary/funnel/" } },
      { role: "Finance", need: "Tie marketing revenue to the orders the business booked.", how: "Measured totals reconciled with the store before any channel is read. It does not replace revenue recognition.", link: { label: "Single source of truth", href: "/use-cases/single-source-of-truth/" } },
    ],
  },

  proof: {
    tag: "Measured in practice",
    quote: {
      text: "Consent Mode left us with a structural blind spot: we knew there was traffic we were not seeing, but we had no way to size it.",
      cite: "Rosa Tomàs · B2C Acquisition Manager · Incapto",
      person: "Rosa Tomàs",
      role: "B2C Acquisition Manager, Incapto",
    },
    body: "Incapto, a specialty coffee brand selling on Shopify, ran GA4 and Sealmetrics side by side. It reconciled both with its real orders first and only then compared channels. The case does not claim that Sealmetrics measures every visit; it reports what each tool recorded over the same days.",
    figures: [
      { value: "96%", label: "of real online-store orders recorded over 48 days, and 97% of revenue", client: "Incapto", href: "/case-studies/incapto/" },
      { value: "29%", label: "of visits GA4 did not record over the same 48 days", client: "Incapto", href: "/case-studies/incapto/" },
      { value: "12 pts", label: "difference in paid campaigns' share of traffic, 50% in GA4 against 62%", client: "Incapto", href: "/case-studies/incapto/" },
    ],
    readCase: "Read the case",
  },

  limits: {
    tag: "What it does not do",
    title: <>It reads the store.<br /><em>It does not know the customer.</em></>,
    body: (
      <>
        These limits come from measuring without identifying anyone. Attribution is{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last click</Link>{" "}
        within each session, by design.
      </>
    ),
    items: [
      ["No customer-level analysis", "No customer IDs, repeat-purchase history or lifetime value per customer. Those stay in the store and the CRM."],
      ["A returning customer is a new visit", "There is no lookback across sessions. A customer who comes back days later by typing your address is credited to direct."],
      ["It does not feed ad platforms", "Sealmetrics sends no conversions to Meta or Google Ads. Keep their pixels and server-side APIs for bidding."],
      ["It does not import spend", "ROAS joins measured revenue with each platform's cost in a spreadsheet, in BigQuery or through an AI assistant."],
      ["One fixed eCommerce funnel", "Custom funnels with your own steps are not supported. Track other sequences as microconversions."],
      ["Reconciliation is on totals", "Order IDs are not stored, so measured orders are compared with the store by period and channel, never order by order."],
    ],
  },

  faqTag: "Questions eCommerce teams ask",
  faqTitle: <>Before you move<br /><em>next month&apos;s budget.</em></>,
  faq: [
    { question: "How do you attribute eCommerce revenue to channels without cookies?", answer: "Read the channel from the landing page of each visit, its UTMs, click IDs or referrer, and credit the order to the last click of the session in which it happens. Sealmetrics does this without cookies or stored identifiers, so visitors who reject the consent banner are still counted. Reconcile the measured orders with the store's own before reading any channel." },
    { question: "Which eCommerce platforms does Sealmetrics support?", answer: "Shopify through the Pixel app and app embed, with purchases from the orders/create webhook; WooCommerce through the WordPress plugin; Magento 2.4 and Adobe Commerce through a module; and PrestaShop and OpenCart through their own modules. Any other store can use the tracker and fire the purchase on the confirmation page. Installation takes 5 to 30 minutes depending on the platform." },
    { question: "Why does GA4 show a different channel mix from Sealmetrics?", answer: "Because GA4 behind a consent banner does not record visitors who reject it, and the loss is not the same in every channel. At Incapto, Sealmetrics recorded 11% more direct traffic than GA4 but 37–52% more from paid campaigns and 133% more from organic social, so paid campaigns were 50% of traffic in GA4 and 62% measured." },
    { question: "Can I see which products each channel sells?", answer: "Yes, if the purchase includes its line items. The Shopify, WooCommerce and Magento integrations send them; on other stores add an items array to the purchase. The Properties report then shows product fields such as name or category by source, medium and campaign, counting units by quantity." },
    { question: "Does Sealmetrics replace the Meta pixel or Google Ads conversion tracking?", answer: "No. Sealmetrics sends no conversions to ad platforms, so their pixels and server-side APIs stay in place for bidding. Sealmetrics is where the team decides how much budget each channel gets, on revenue reconciled with the store." },
    { question: "Can Sealmetrics measure repeat purchases or customer lifetime value?", answer: "No. It does not identify customers or link visits across sessions, which is what lets it measure without cookies. Repeat purchases and lifetime value belong in the store or the CRM; Sealmetrics answers which channels and campaigns bring the orders." },
    { question: "How long should we run Sealmetrics next to GA4 before deciding?", answer: "At least one full commercial cycle, including a campaign period. Incapto reconciled 48 days of orders before comparing channels. Keep GA4 and the ad pixels running meanwhile; nothing needs to be switched off." },
  ],

  final: {
    tag: "Store measurement review",
    title: <>Bring your order total.<br /><em>See which channels change.</em></>,
    body: "Thirty minutes: we compare your store's orders with what your analytics reports for the same period, and show where the channel mix, the funnel and the products sold by channel change.",
    primary: { label: "Book a store measurement review", href: "/demo/" },
    secondary: { label: "Read the Incapto case", href: "/case-studies/incapto/" },
  },
};

export const ecommerceEs: ProblemLandingContent = {
  route: "/for/ecommerce",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Por equipo", href: "/es/for/" },
    { label: "eCommerce" },
  ],
  eyebrow: "Sector · eCommerce y DTC",
  h1: <>Tu tienda sabe<br />qué se vendió.<br /><em>No quién lo vendió.</em></>,
  heroBody:
    "Shopify, WooCommerce o Magento registran cada pedido. El canal que hay detrás sale de una analítica que pierde visitas en el banner de consentimiento y de unas plataformas publicitarias que se atribuyen las ventas. Sealmetrics mide canales, embudo de compra y productos vendidos por canal sin pérdida por consentimiento, contrastados con los pedidos de tu tienda antes de mover presupuesto.",
  heroPrimary: { label: "Ver cómo leer la tienda", href: "#method" },
  heroSecondary: { label: "Leer el caso Incapto", href: "/es/case-studies/incapto/" },
  heroMicro: "Shopify · WooCommerce · Magento 2 · último clic por sesión · sin cookies · alojado en Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Actualizado",
    date: ECOMMERCE_MODIFIED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Incapto · medición en paralelo en Shopify",
    status: "Conciliado primero",
    rows: [
      ["Pedidos reales de la tienda registrados", "96%"],
      ["Visitas que GA4 no registró", "29%"],
      ["Campañas de pago, cuota del tráfico", "GA4 50% · medido 62%"],
      ["Visitas sin origen utilizable", "GA4 14% · medido 0,3%"],
    ],
    foot: "Pedidos y visitas: 14 jun–31 jul 2026 · mix de canales: 28 jul–6 ago 2026",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      La analítica para eCommerce tiene que decir qué canales, campañas y
      productos venden de verdad, sobre una base que puedas contrastar con los
      pedidos de tu tienda. La mayoría lo lee en GA4, que detrás de un banner no
      registra a quien lo rechaza, y en las plataformas publicitarias, que
      atribuyen las ventas a sus propios anuncios. La pérdida es desigual por
      canal, así que el propio mix está mal: en la medición en paralelo de Incapto
      sobre Shopify, GA4 daba a las campañas de pago el 50% del tráfico frente al
      62% medido sin pérdida por consentimiento, y el 14% de sus visitas no tenía
      un origen utilizable. Sealmetrics cuenta visitas sin cookies y atribuye cada
      pedido al último clic de su sesión. Sus integraciones con Shopify,
      WooCommerce y Magento 2 envían el embudo de compra y las líneas de cada
      pedido, así que los ingresos se leen por canal, campaña, paso del embudo y
      producto. No identifica clientes ni envía conversiones a las plataformas.
    </p>
  ),

  divergence: {
    tag: "Por qué el informe de la tienda engaña",
    title: <>El pedido es real.<br /><em>Su canal, una suposición.</em></>,
    body: "Un equipo de eCommerce se hace las mismas preguntas cada semana. Hoy las responde una herramienta que o pierde parte del tráfico o tiene interés en la respuesta, y solo el total de pedidos de la tienda está fuera de discusión.",
    headers: ["La pregunta de cada semana", "Dónde se responde hoy", "Qué falla", "Qué cambia al medirlo"],
    rows: [
      ["¿Qué canal vende?", "Informe de canales de GA4", "Faltan las visitas que rechazan el banner, y no por igual en todos los canales; el tráfico sin origen utilizable acaba en Direct o Unassigned", "Ingresos por canal sin pérdida por consentimiento; en Incapto, las visitas sin origen utilizable bajaron del 14% al 0,3%"],
      ["¿Qué campaña vende?", "Meta Ads Manager y Google Ads", "Cada plataforma se atribuye sus anuncios, con su ventana de atribución y sus conversiones modeladas", "Ingresos por utm_campaign y utm_content, leídos de la página de llegada"],
      ["¿Dónde pierde el embudo?", "Exploración de embudo de GA4", "Construida solo con las sesiones que GA4 registró", "Entradas, vistas de producto, carrito, checkout y compra por source, medium y campaign"],
      ["¿Qué productos vende cada canal?", "Admin de la tienda o informes de artículos de GA4", "La tienda conoce los productos pero no el canal; GA4 conoce el canal solo de las visitas que registró", "Las líneas de cada pedido por source, medium y campaign"],
      ["¿Cuadra el total?", "Admin de la tienda", "Exacto, pero sin un canal fiable", "El punto de conciliación de todo lo anterior"],
    ],
    note: (
      <>
        Medido, no estimado: cuando{" "}
        <Link className={link} href="/es/case-studies/incapto/">Incapto</Link> midió
        con GA4 y Sealmetrics su tienda Shopify durante 48 días, GA4 no registró el
        29% de las visitas ni el 45% de las páginas vistas, mientras que Sealmetrics
        registró el 96% de los pedidos reales de la tienda online. Por qué las
        herramientas que dependen del consentimiento pierden ese tráfico se explica en{" "}
        <Link className={link} href="/es/glossary/data-loss-in-analytics/">pérdida de datos en analítica</Link>;
        la instalación por plataforma está en{" "}
        <Link className={link} href="/es/platforms/shopify/">Shopify</Link>,{" "}
        <Link className={link} href="/es/platforms/woocommerce/">WooCommerce</Link> y{" "}
        <Link className={link} href="/es/platforms/magento/">Magento</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que le cuesta a una tienda medir mal",
    title: <>El presupuesto va<br /><em>donde el banner deja ver.</em></>,
    body: "La pérdida por consentimiento no encoge el informe por igual: lo deforma, y cada deformación cae sobre una decisión del equipo de eCommerce.",
    items: [
      ["01", "Presupuesto de medios repartido sobre un mix deformado", "En Incapto, GA4 situaba las campañas de pago en el 50% del tráfico; medidas sin pérdida por consentimiento eran el 62%. Doce puntos de diferencia en la línea del informe que decide la inversión en medios."],
      ["02", "Canales de captación infravalorados", "Los canales de gente que ya conoce la marca apenas se movían: Sealmetrics registró un 11% más de tráfico directo que GA4. La búsqueda orgánica mostró un 62% más, la afiliación un 73% y el social orgánico un 133%. Los canales que traen clientes nuevos eran los que GA4 más infravaloraba."],
      ["03", "Decisiones de embudo y producto sobre las visitas más superficiales", "Las visitas que GA4 no registró en Incapto veían 3,3 páginas de media, frente a 1,6 las que sí registró. Un análisis de producto y embudo construido con las visitas registradas deja fuera a quienes más productos miran."],
    ],
  },

  method: {
    id: "method",
    tag: "Leer la tienda con datos medidos",
    title: <>Concilia con la caja.<br /><em>Después lee la tienda.</em></>,
    body: (
      <>
        Cada paso parte de algo que la tienda registró, no de un modelo. Las reglas
        de atribución que hay detrás de las cifras por canal se explican en{" "}
        <Link className={link} href="/es/use-cases/revenue-attribution/">atribución de ingresos</Link>.
      </>
    ),
    howToName: "Cómo lee un equipo de eCommerce canales, embudo y productos con datos medidos",
    howToDescription:
      "Seis pasos para que un equipo de eCommerce o DTC concilie los ingresos medidos con los pedidos de la tienda y lea después el mix de canales, las campañas, las fugas del embudo y los productos por canal.",
    steps: [
      { name: "Instala la integración de tu plataforma", text: "En Shopify, conecta la app Sealmetrics Pixel y activa el app embed; las compras llegan por el webhook orders/create. En WooCommerce y Magento 2, instala el plugin o el módulo. En otras tiendas, añade el tracker y envía la compra con sus artículos en la página de confirmación. Según la plataforma, lleva entre 5 y 30 minutos." },
      { name: "Concilia pedidos e ingresos con la tienda", text: "Compara las compras y los ingresos medidos con los pedidos online de la propia tienda en el mismo periodo, zona horaria y moneda. Deja fuera los pedidos de tienda física, marketplace, manuales y renovaciones de suscripción, que no tienen una visita web detrás. En Incapto, Sealmetrics registró el 96% de los pedidos reales y el 97% de la facturación." },
      { name: "Lee el mix de canales sobre la base medida", text: "Pon la cuota de tráfico e ingresos de cada canal junto a la de GA4 para los mismos días. Las mayores diferencias señalan los canales cuyo presupuesto se ha decidido con la cifra equivocada." },
      { name: "Localiza dónde pierde cada fuente en el embudo", text: "Abre el informe de embudo: entradas, vistas de producto, añadir al carrito, inicio de checkout y compra, con la tasa de cada paso. Usa la tabla de embudo por UTM para comparar campañas paso a paso y el selector de país para aislar un mercado." },
      { name: "Mira qué productos vende cada canal", text: "En el informe de propiedades, abre la pestaña Conv. Items y elige un campo de producto, como el nombre o la categoría, para ver unidades y pedidos por source, medium y campaign." },
      { name: "Mueve presupuesto y prueba antes de recortar", text: "Lleva presupuesto a los canales y campañas que venden sobre la base conciliada. Antes de recortar una campaña de prospección o de vídeo que parece floja a último clic, haz un test con grupo de control o por zonas y mira los ingresos medidos totales." },
    ],
  },

  roles: {
    tag: "Quién lo usa en la tienda",
    title: <>Un total de pedidos,<br /><em>cuatro mesas.</em></>,
    body: "Cada equipo conserva sus herramientas. Lo que cambia es la base sobre la que se construyen sus cifras de cada semana.",
    items: [
      { role: "Responsable de eCommerce", need: "Saber qué canales y productos generan los ingresos de la tienda.", how: "Ingresos por canal y producto sobre una base conciliada con los pedidos de la propia tienda.", link: { label: "Integración con Shopify", href: "/es/platforms/shopify/" } },
      { role: "Performance marketing", need: "Evaluar campañas fuera de los informes de las propias plataformas.", how: "Ingresos por campaña y creatividad a partir de las UTM de la página de llegada, cruzados con la inversión de cada plataforma.", link: { label: "Atribución de ingresos", href: "/es/use-cases/revenue-attribution/" } },
      { role: "CRO y UX", need: "Encontrar el paso del embudo que más compradores pierde, por fuente.", how: "El embudo de compra fijo, con la tasa de cada paso, por campaña y por país.", link: { label: "Datos completos", href: "/es/complete-data/" } },
      { role: "Finanzas", need: "Ligar los ingresos de marketing a los pedidos que registró el negocio.", how: "Totales medidos y conciliados con la tienda antes de leer ningún canal. No sustituye al reconocimiento de ingresos.", link: { label: "Fuente única de verdad", href: "/es/use-cases/single-source-of-truth/" } },
    ],
  },

  proof: {
    tag: "Medido en la práctica",
    quote: {
      text: "El Consent Mode nos dejaba un vacío estructural: sabíamos que había tráfico que no estábamos viendo, pero no teníamos forma de dimensionarlo.",
      cite: "Rosa Tomàs · Acquisition Manager B2C · Incapto",
      person: "Rosa Tomàs",
      role: "Acquisition Manager B2C, Incapto",
    },
    body: "Incapto, marca de café de especialidad que vende en Shopify, midió con GA4 y Sealmetrics a la vez. Primero concilió las dos herramientas con sus pedidos reales y solo después comparó canales. El caso no afirma que Sealmetrics mida todas las visitas: informa de lo que registró cada herramienta en los mismos días.",
    figures: [
      { value: "96%", label: "de los pedidos reales de la tienda online registrados en 48 días, y el 97% de la facturación", client: "Incapto", href: "/es/case-studies/incapto/" },
      { value: "29%", label: "de las visitas que GA4 no registró en esos mismos 48 días", client: "Incapto", href: "/es/case-studies/incapto/" },
      { value: "12 pts", label: "de diferencia en la cuota de tráfico de las campañas de pago: 50% en GA4 frente a 62%", client: "Incapto", href: "/es/case-studies/incapto/" },
    ],
    readCase: "Leer el caso",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Lee la tienda.<br /><em>No conoce al cliente.</em></>,
    body: (
      <>
        Estos límites vienen de medir sin identificar a nadie. La atribución es a
        último clic dentro de cada sesión, por diseño; los{" "}
        <Link className={link} href="/es/glossary/attribution-model/">modelos de atribución</Link>{" "}
        explican la diferencia.
      </>
    ),
    items: [
      ["Sin análisis por cliente", "Sin IDs de cliente, historial de recompra ni valor de vida por cliente. Eso sigue en la tienda y en el CRM."],
      ["Un cliente que vuelve es una visita nueva", "No hay ventana entre sesiones. Quien vuelve días después escribiendo tu dirección se atribuye a directo."],
      ["No alimenta las plataformas publicitarias", "Sealmetrics no envía conversiones a Meta ni a Google Ads. Mantén sus píxeles y sus APIs de servidor para pujar."],
      ["No importa la inversión", "El ROAS cruza los ingresos medidos con el coste de cada plataforma en una hoja de cálculo, en BigQuery o con un asistente de IA."],
      ["Un único embudo de eCommerce fijo", "No admite embudos con pasos propios. Mide otras secuencias como microconversiones."],
      ["La conciliación es por totales", "Los IDs de pedido no se guardan, así que los pedidos medidos se comparan con la tienda por periodo y canal, nunca pedido a pedido."],
    ],
  },

  faqTag: "Lo que preguntan los equipos de eCommerce",
  faqTitle: <>Antes de mover<br /><em>el presupuesto del mes que viene.</em></>,
  faq: [
    { question: "¿Cómo se atribuyen los ingresos de un eCommerce a los canales sin cookies?", answer: "Leyendo el canal en la página de llegada de cada visita, con sus UTM, identificadores de clic o referrer, y atribuyendo el pedido al último clic de la sesión en la que ocurre. Sealmetrics lo hace sin cookies ni identificadores guardados, así que también cuenta a quien rechaza el banner. Concilia los pedidos medidos con los de la tienda antes de leer ningún canal." },
    { question: "¿Qué plataformas de eCommerce admite Sealmetrics?", answer: "Shopify con la app Pixel y el app embed, con las compras desde el webhook orders/create; WooCommerce con el plugin de WordPress; Magento 2.4 y Adobe Commerce con un módulo; y PrestaShop y OpenCart con sus propios módulos. Cualquier otra tienda puede usar el tracker y enviar la compra en la página de confirmación. La instalación lleva entre 5 y 30 minutos según la plataforma." },
    { question: "¿Por qué GA4 muestra un mix de canales distinto al de Sealmetrics?", answer: "Porque GA4 detrás de un banner no registra a quien lo rechaza, y la pérdida no es igual en todos los canales. En Incapto, Sealmetrics registró un 11% más de tráfico directo que GA4, pero entre un 37% y un 52% más desde campañas de pago y un 133% más desde social orgánico, así que las campañas de pago eran el 50% del tráfico en GA4 y el 62% medido." },
    { question: "¿Puedo ver qué productos vende cada canal?", answer: "Sí, si la compra incluye sus líneas de pedido. Las integraciones de Shopify, WooCommerce y Magento las envían; en otras tiendas, añade un array items a la compra. El informe de propiedades muestra entonces campos de producto como el nombre o la categoría por source, medium y campaign, contando unidades según la cantidad." },
    { question: "¿Sealmetrics sustituye al píxel de Meta o al seguimiento de conversiones de Google Ads?", answer: "No. Sealmetrics no envía conversiones a las plataformas publicitarias, así que sus píxeles y sus APIs de servidor siguen para pujar. Sealmetrics es donde el equipo decide cuánto presupuesto recibe cada canal, con ingresos conciliados con la tienda." },
    { question: "¿Puede Sealmetrics medir recompras o el valor de vida del cliente?", answer: "No. No identifica clientes ni une visitas entre sesiones, que es lo que le permite medir sin cookies. Las recompras y el valor de vida del cliente corresponden a la tienda o al CRM; Sealmetrics responde qué canales y campañas traen los pedidos." },
    { question: "¿Cuánto tiempo conviene medir con Sealmetrics junto a GA4 antes de decidir?", answer: "Al menos un ciclo comercial completo, con un periodo de campaña dentro. Incapto concilió 48 días de pedidos antes de comparar canales. Mantén GA4 y los píxeles publicitarios mientras tanto: no hace falta desactivar nada." },
  ],

  final: {
    tag: "Revisión de medición de tienda",
    title: <>Trae tu total de pedidos.<br /><em>Mira qué canales cambian.</em></>,
    body: "Treinta minutos: comparamos los pedidos de tu tienda con lo que reporta tu analítica en el mismo periodo, y te enseñamos dónde cambian el mix de canales, el embudo y los productos vendidos por canal.",
    primary: { label: "Reservar una revisión de tienda", href: "/es/demo/" },
    secondary: { label: "Leer el caso Incapto", href: "/es/case-studies/incapto/" },
  },
};
