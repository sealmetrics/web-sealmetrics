import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /platforms/magento — Phase 5 of CONTENT-PLAN-PROBLEM-POSITIONING.md (new page).
 *
 * Integration facts come from docs.sealmetrics.com/integrations/ecommerce/magento
 * (checked 14 Sep 2026): Magento 2.4.0+ (Adobe Commerce), PHP 7.4+/8.0+; module
 * downloaded from the dashboard and copied into app/code/SealMetrics/Analytics;
 * enabled with bin/magento module:enable, setup:upgrade, cache:clean; configured
 * in Stores > Configuration > Sealmetrics > Analytics (Enable, Account ID,
 * optional Pixel URL, per-event toggles); events pageview, view_item,
 * add_to_cart (via Magento customer-data events), begin_checkout, purchase on
 * the success page with revenue, currency, payment method, coupon and items;
 * configurable options captured; content groups from layout handles;
 * multi-store with per-store configuration and store currency; no cookies, no
 * order IDs stored externally, no customer data; troubleshooting checks.
 *
 * Not in the docs and therefore not claimed: duplicate prevention on a
 * refreshed success page (documented for WooCommerce only), Hyvä or PWA Studio
 * support, Magento Open Source named explicitly (the hub card said so; this
 * page says "Magento 2.4+, including Adobe Commerce").
 *
 * There is no published Magento case. The proof block says so and uses the
 * Incapto figures explicitly labelled as a Shopify measurement.
 */

export const MAGENTO_PUBLISHED = "2026-09-14";

const link = "sig-problem-inline";

export const magentoEn: ProblemLandingContent = {
  route: "/platforms/magento",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Platforms", href: "/platforms/" },
    { label: "Magento" },
  ],
  eyebrow: "Platform · Magento 2",
  h1: <>Magento records the order.<br />GA4 misses<br /><em>the channel behind it.</em></>,
  heroBody:
    "A consent-gated analytics tag does not see the shoppers who reject the banner, so the channel behind their orders disappears from your reports. The Sealmetrics module for Magento 2.4+ tracks the funnel from product view to purchase, per store view and currency, without setting a cookie or collecting customer data.",
  heroPrimary: { label: "See the install", href: "#method" },
  heroSecondary: { label: "Compare with WooCommerce", href: "/platforms/woocommerce/" },
  heroMicro: "Magento 2.4+ · Adobe Commerce · PHP 7.4+ · no cookies · EU-hosted in Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Published",
    date: MAGENTO_PUBLISHED,
    dateDisplay: "14 September 2026",
  },
  module: {
    title: "What the module sends",
    status: "Aggregate events",
    rows: [
      ["view_item", "Product, SKU, price, category, brand"],
      ["add_to_cart", "Product, quantity, selected options"],
      ["begin_checkout", "Cart total, item count"],
      ["purchase", "Revenue, payment method, coupon, items"],
    ],
    foot: "No customer data · no order ID stored outside Magento · per-store currency",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Sealmetrics for Magento is a Magento 2.4+ module, including Adobe Commerce,
      that adds cookieless analytics to a store. It tracks product views,
      add-to-cart, checkout starts and purchases, assigns a content group to each
      page from Magento&apos;s layout handles and captures the selected options of
      configurable products, without setting a cookie or collecting customer
      data. You download it from the Sealmetrics dashboard, copy it into
      app/code, enable it with bin/magento and enter your Account ID under Stores,
      Configuration. The purchase is sent from the order success page with its
      revenue, currency, payment method, coupon and items, and each store view
      can be configured with its own currency. Order IDs are not stored outside
      Magento, so reconciliation is on totals and channels. Because the purchase
      depends on the success page loading, a custom pixel domain helps where ad
      blockers are common.
    </p>
  ),

  divergence: {
    tag: "What it captures",
    title: <>The whole funnel.<br /><em>Grouped by page type.</em></>,
    body: "Enabled with an Account ID, the module sends the standard eCommerce funnel and labels every page by Magento layout handle, with each event switchable in the admin.",
    headers: ["Event", "When it fires", "What it carries", "Note"],
    rows: [
      ["pageview", "Every page", "The page, its channel and its content group", "home, product, catalog, search, cart, checkout, thankyou, account"],
      ["view_item", "Product page", "Product name, ID, SKU, price, currency, category, brand", "Can be switched off in the module settings"],
      ["add_to_cart", "When Magento updates the cart", "Product, ID, price, quantity, currency", "Captured through Magento's customer-data events; configurable options included"],
      ["begin_checkout", "Checkout", "Cart total, currency, item count", "The step before payment"],
      ["purchase", "Order success page", "Revenue, currency, payment method, coupon, items with options", "A conversion; the other events are microconversions"],
    ],
    note: (
      <>
        Product, cart and checkout steps are{" "}
        <Link className={link} href="/glossary/event-tracking/">events</Link> in a
        funnel; the purchase is the conversion that carries revenue. How
        conversions are modelled across platforms is covered in{" "}
        <Link className={link} href="/use-cases/conversion-tracking/">conversion tracking without cookies</Link>.
      </>
    ),
  },

  costs: {
    tag: "What a consent-gated setup loses",
    title: <>The order is recorded.<br /><em>Its channel is not.</em></>,
    body: "Magento knows every order. A cookie-based tag only knows the ones placed by visitors who accepted the banner and were not blocked.",
    items: [
      ["01", "Rejected visitors take their channel with them", (
        <>
          On the one store we have measured side by side — a Shopify shop — GA4
          did not record 29% of visits. The mechanism does not depend on the
          platform: a tag that waits for consent never sees the visitor who says
          no. The argument in full is on{" "}
          <Link className={link} href="/complete-data/">complete data</Link>.
        </>
      )],
      ["02", "The loss is uneven by channel", "On that store, Sealmetrics recorded 11% more direct traffic than GA4 but 37–52% more from paid campaigns, so a consent-based channel report tilts toward traffic you already had."],
      ["03", "Multi-store reporting multiplies the gap", "Each store view has its own audience, language and banner behaviour. A consent-gated tag loses a different share in each one, which makes comparing store views on channel performance unreliable."],
    ],
  },

  method: {
    id: "method",
    tag: "Install on Magento",
    title: <>Copy the module.<br /><em>Enable it with bin/magento.</em></>,
    body: (
      <>
        A standard Magento module install, no theme edits. The last step makes the
        comparison with Magento&apos;s own orders fair; the reasoning is the same as
        in{" "}
        <Link className={link} href="/use-cases/single-source-of-truth/">one number for marketing and finance</Link>.
      </>
    ),
    howToName: "How to install Sealmetrics on Magento 2",
    howToDescription:
      "Five steps to install cookieless analytics on a Magento 2.4+ store and check it against Magento's own orders.",
    steps: [
      { name: "Download and copy the module", text: "In the Sealmetrics dashboard, open Settings → Integrations and download the Magento module. Create app/code/SealMetrics/Analytics in your Magento installation and copy the module files into it. It needs Magento 2.4.0+ and PHP 7.4+ or 8.0+." },
      { name: "Enable it", text: "Run bin/magento module:enable SealMetrics_Analytics, then bin/magento setup:upgrade and bin/magento cache:clean. Check with bin/magento module:status that the module is enabled." },
      { name: "Configure it in the admin", text: "Go to Stores → Configuration → Sealmetrics → Analytics, enable the module, enter your Account ID and choose which events to track. Optionally set a custom pixel domain, then save and clear the cache. Configure per store view if you need to." },
      { name: "Test the funnel and a purchase", text: "Open a product, add it to the cart and start checkout, and check the events arrive. Place a test order and confirm the purchase appears once the success page loads and the order status is complete." },
      { name: "Compare with Magento's orders", text: "Compare totals for the same period, store view, timezone and currency, and leave out orders with no web visit behind them, such as orders created in the admin or by phone." },
    ],
  },

  roles: {
    tag: "What stays, what changes",
    title: <>Nothing is ripped out.<br /><em>The decision moves.</em></>,
    body: "Each tool keeps the job it does well. Sealmetrics takes the one a consent-gated tag cannot do: telling you which channels produced the orders.",
    items: [
      { role: "Magento reports", need: "Stay: the order and catalogue view.", how: "Sales, products, customers and coupons stay in Magento, and Sealmetrics is checked against its order totals.", link: { label: "One number for marketing and finance", href: "/use-cases/single-source-of-truth/" } },
      { role: "GA4", need: "Can stay, for Google Ads.", how: "Many teams keep it as the Google Ads conduit while budget decisions move to the measured base.", link: { label: "GA4 migration plan", href: "/use-cases/ga4-migration/" } },
      { role: "Meta and Google pixels", need: "Stay for bidding, behind consent.", how: "Sealmetrics does not send conversions to ad platforms, so the platforms keep their own consent-gated setup.", link: { label: "Campaign revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "Sealmetrics", need: "Becomes the channel view.", how: "Revenue by channel, campaign and creative on every recorded session, per store view, checked against Magento's orders.", link: { label: "Complete data", href: "/complete-data/" } },
    ],
  },

  proof: {
    tag: "The method, measured",
    body: "No Magento customer case is published yet, and this page does not pretend otherwise. The reconciliation method above is the one Incapto used on Shopify, where both tools were checked against real orders before anything was compared.",
    figures: [
      { value: "96%", label: "of real orders recorded in Incapto's 48-day parallel run, on Shopify", client: "Incapto · Shopify", href: "/case-studies/incapto/" },
      { value: "29%", label: "of real visits that GA4 did not record on the same store", client: "Incapto · Shopify", href: "/case-studies/incapto/" },
      { value: "5", label: "funnel events the Magento module sends, each switchable in the admin", client: "Module documentation", href: "/platforms/magento/#method" },
    ],
    readCase: "Open",
  },

  limits: {
    tag: "What it does not do",
    title: <>Know the edges<br /><em>before you compare.</em></>,
    body: (
      <>
        Most of these follow from how Magento confirms an order in the browser. For
        stores where a webhook confirms purchases server-side, see{" "}
        <Link className={link} href="/platforms/shopify/">Sealmetrics for Shopify</Link>.
      </>
    ),
    items: [
      ["The purchase needs the success page", "Purchases are sent when the order success page loads. If a payment method never returns the shopper there, that purchase is not recorded."],
      ["Ad blockers, without a custom pixel domain", "The default pixel address can appear on blocklists. Setting a custom pixel domain keeps the requests on your own domain."],
      ["Reconciliation is on totals", "Order IDs are not stored outside Magento, so you compare totals and channels, never row by row."],
      ["Custom storefronts need checking", "Detection relies on Magento layout handles and customer-data events. A heavily customised or headless storefront that bypasses them may need the tracker and events sent directly."],
      ["Admin and offline orders have no session", "Orders created in the admin, by phone or through marketplaces have no web visit, so they have no channel to attribute."],
      ["Last click per session", "No multi-touch model and no view-through; a returning visit through another channel takes the credit."],
    ],
  },

  faqTag: "Common Magento questions",
  faqTitle: <>Before you install<br /><em>the module.</em></>,
  faq: [
    { question: "How do I install Sealmetrics on Magento 2?", answer: "Download the Magento module from the Sealmetrics dashboard under Settings → Integrations, copy it into app/code/SealMetrics/Analytics, run bin/magento module:enable SealMetrics_Analytics, setup:upgrade and cache:clean, then enter your Account ID under Stores → Configuration → Sealmetrics → Analytics. It needs Magento 2.4.0+ and PHP 7.4+ or 8.0+." },
    { question: "Does the Sealmetrics module work with Adobe Commerce?", answer: "The module is documented for Magento 2.4+, including Adobe Commerce. It is installed as a standard module in app/code and configured in the Magento admin, so check it through your usual deployment process for your hosting setup." },
    { question: "Does it support multiple store views and currencies?", answer: "Yes. The module works with multiple store views, can be configured per store if needed, and respects each store's currency. Compare each store view with its own orders, in the same timezone and currency." },
    { question: "Does it track configurable products?", answer: "Yes. The options selected on a configurable product, such as size or colour, are captured with add-to-cart and with the items of the purchase, together with product name, SKU, price, category and brand." },
    { question: "Why is a Magento purchase missing in Sealmetrics?", answer: "Check that the order success page loads after payment, because that is where the purchase is sent, and that the order status is complete. Then check the JavaScript console for errors, confirm the module is enabled with the right Account ID, and clear the frontend cache before testing again." },
    { question: "Will the module affect Magento performance?", answer: "The tracker is about 1.1 KB on the wire. For the store as a whole, the documentation recommends the usual Magento practices: production mode, deployed static content and full page cache enabled." },
    { question: "Does Sealmetrics replace Magento's reports or GA4?", answer: "It replaces neither by default. Magento's reports stay the source for orders, products and customers, and GA4 can stay as the Google Ads conduit. Sealmetrics becomes the channel and revenue view, measured on every session and checked against Magento's order totals." },
    { question: "Will I need to change my consent banner?", answer: "Not necessarily for the analytics: the module sets no cookie and collects no customer data. Ad pixels, chat tools or A/B testing that do store data still need consent, and whether your store is exempt for analytics depends on its configuration and your national authority's criteria." },
  ],

  final: {
    tag: "Magento walkthrough",
    title: <>Install on your store.<br /><em>See the channels behind the orders.</em></>,
    body: "Book 30 minutes with the founder. We install the module on your Magento store, test the funnel and a purchase, and set up the comparison with your orders per store view.",
    primary: { label: "Book a Magento walkthrough", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const magentoEs: ProblemLandingContent = {
  route: "/platforms/magento",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Plataformas", href: "/es/platforms/" },
    { label: "Magento" },
  ],
  eyebrow: "Plataforma · Magento 2",
  h1: <>Magento registra el pedido.<br />GA4 pierde<br /><em>el canal que lo trajo.</em></>,
  heroBody:
    "Una etiqueta de analítica que espera al consentimiento no ve a los compradores que rechazan el banner, así que el canal detrás de sus pedidos desaparece de tus informes. El módulo de Sealmetrics para Magento 2.4+ mide el funnel desde la ficha de producto hasta la compra, por vista de tienda y moneda, sin instalar cookies ni recoger datos de clientes.",
  heroPrimary: { label: "Ver la instalación", href: "#method" },
  heroSecondary: { label: "Comparar con WooCommerce", href: "/es/platforms/woocommerce/" },
  heroMicro: "Magento 2.4+ · Adobe Commerce · PHP 7.4+ · sin cookies · alojado en Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Publicado",
    date: MAGENTO_PUBLISHED,
    dateDisplay: "14 de septiembre de 2026",
  },
  module: {
    title: "Lo que envía el módulo",
    status: "Eventos agregados",
    rows: [
      ["view_item", "Producto, SKU, precio, categoría, marca"],
      ["add_to_cart", "Producto, cantidad, opciones elegidas"],
      ["begin_checkout", "Total del carrito, nº de artículos"],
      ["purchase", "Ingresos, método de pago, cupón, artículos"],
    ],
    foot: "Sin datos de clientes · sin ID de pedido fuera de Magento · moneda por tienda",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      Sealmetrics para Magento es un módulo para Magento 2.4+, Adobe Commerce
      incluido, que añade analítica sin cookies a una tienda. Mide vistas de
      producto, añadidos al carrito, inicios de checkout y compras, asigna un grupo
      de contenido a cada página a partir de los layout handles de Magento y recoge
      las opciones elegidas de los productos configurables, sin instalar cookies ni
      recoger datos de clientes. Lo descargas desde el dashboard de Sealmetrics, lo
      copias en app/code, lo activas con bin/magento e introduces tu Account ID en
      Tiendas, Configuración. La compra se envía desde la página de pedido
      completado con sus ingresos, moneda, método de pago, cupón y artículos, y cada
      vista de tienda puede configurarse con su propia moneda. Los ID de pedido no se
      guardan fuera de Magento, así que la conciliación se hace sobre totales y
      canales. Como la compra depende de que cargue esa página, un dominio de píxel
      propio ayuda donde abundan los bloqueadores.
    </p>
  ),

  divergence: {
    tag: "Qué captura",
    title: <>Todo el funnel.<br /><em>Agrupado por tipo de página.</em></>,
    body: "Activado con un Account ID, el módulo envía el funnel estándar de eCommerce y etiqueta cada página por layout handle de Magento, con cada evento activable desde el panel.",
    headers: ["Evento", "Cuándo se dispara", "Qué lleva", "Nota"],
    rows: [
      ["pageview", "En cada página", "La página, su canal y su grupo de contenido", "home, product, catalog, search, cart, checkout, thankyou, account"],
      ["view_item", "Ficha de producto", "Nombre, ID, SKU, precio, moneda, categoría y marca del producto", "Se puede desactivar en los ajustes del módulo"],
      ["add_to_cart", "Cuando Magento actualiza el carrito", "Producto, ID, precio, cantidad y moneda", "Se captura con los eventos customer-data de Magento; incluye las opciones de los configurables"],
      ["begin_checkout", "Checkout", "Total del carrito, moneda y número de artículos", "El paso previo al pago"],
      ["purchase", "Página de pedido completado", "Ingresos, moneda, método de pago, cupón y artículos con sus opciones", "Una conversión; el resto de eventos son microconversiones"],
    ],
    note: (
      <>
        Los pasos de producto, carrito y checkout son{" "}
        <Link className={link} href="/es/glossary/event-tracking/">eventos</Link> de un
        funnel; la compra es la conversión que lleva los ingresos. Cómo se atribuyen a
        canal y campaña se explica en{" "}
        <Link className={link} href="/es/use-cases/revenue-attribution/">atribución de ingresos sin cookies</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que pierde una configuración con consentimiento",
    title: <>El pedido queda registrado.<br /><em>Su canal, no.</em></>,
    body: "Magento conoce cada pedido. Una etiqueta con cookies solo conoce los de quienes aceptaron el banner y no bloquearon el script.",
    items: [
      ["01", "Quien rechaza se lleva su canal", (
        <>
          En la única tienda que hemos medido en paralelo —una tienda Shopify—, GA4 no
          registró el 29% de las visitas. El mecanismo no depende de la plataforma:
          una etiqueta que espera al consentimiento nunca ve al visitante que dice que
          no. El argumento completo está en{" "}
          <Link className={link} href="/es/complete-data/">datos completos</Link>.
        </>
      )],
      ["02", "La pérdida es desigual por canal", "En esa tienda, Sealmetrics registró un 11% más de tráfico directo que GA4, pero entre un 37% y un 52% más desde campañas de pago, así que un informe por canal con consentimiento se inclina hacia el tráfico que ya tenías."],
      ["03", "Con varias tiendas, el hueco se multiplica", "Cada vista de tienda tiene su público, su idioma y su comportamiento ante el banner. Una etiqueta con consentimiento pierde una parte distinta en cada una, y comparar vistas de tienda por rendimiento de canal deja de ser fiable."],
    ],
  },

  method: {
    id: "method",
    tag: "Instalación en Magento",
    title: <>Copia el módulo.<br /><em>Actívalo con bin/magento.</em></>,
    body: (
      <>
        Una instalación estándar de módulo de Magento, sin tocar el tema. El último
        paso es el que hace justa la comparación con los pedidos de Magento; el
        razonamiento es el mismo que en{" "}
        <Link className={link} href="/es/use-cases/single-source-of-truth/">una sola cifra para marketing y finanzas</Link>.
      </>
    ),
    howToName: "Cómo instalar Sealmetrics en Magento 2",
    howToDescription:
      "Cinco pasos para instalar analítica sin cookies en una tienda Magento 2.4+ y contrastarla con los pedidos de la propia Magento.",
    steps: [
      { name: "Descarga y copia el módulo", text: "En el dashboard de Sealmetrics, abre Settings → Integrations y descarga el módulo de Magento. Crea app/code/SealMetrics/Analytics en tu instalación de Magento y copia ahí los archivos del módulo. Necesita Magento 2.4.0+ y PHP 7.4+ u 8.0+." },
      { name: "Actívalo", text: "Ejecuta bin/magento module:enable SealMetrics_Analytics, después bin/magento setup:upgrade y bin/magento cache:clean. Comprueba con bin/magento module:status que el módulo está activo." },
      { name: "Configúralo en el panel", text: "Ve a Tiendas → Configuración → Sealmetrics → Analytics, activa el módulo, introduce tu Account ID y elige qué eventos medir. Si quieres, define un dominio de píxel propio; guarda y vacía la caché. Configúralo por vista de tienda si lo necesitas." },
      { name: "Prueba el funnel y una compra", text: "Abre un producto, añádelo al carrito, empieza el checkout y comprueba que llegan los eventos. Haz un pedido de prueba y confirma que la compra aparece cuando carga la página de pedido completado y el estado del pedido es completo." },
      { name: "Compara con los pedidos de Magento", text: "Compara totales del mismo periodo, vista de tienda, zona horaria y moneda, y deja fuera los pedidos sin visita web detrás, como los creados en el panel o por teléfono." },
    ],
  },

  roles: {
    tag: "Qué se queda y qué cambia",
    title: <>No se arranca nada.<br /><em>Se mueve la decisión.</em></>,
    body: "Cada herramienta conserva el trabajo que hace bien. Sealmetrics asume el que no puede hacer una etiqueta con consentimiento: decirte qué canales produjeron los pedidos.",
    items: [
      { role: "Informes de Magento", need: "Se quedan: la visión de pedidos y catálogo.", how: "Ventas, productos, clientes y cupones siguen en Magento, y Sealmetrics se contrasta con sus totales de pedidos.", link: { label: "Una cifra para marketing y finanzas", href: "/es/use-cases/single-source-of-truth/" } },
      { role: "GA4", need: "Puede quedarse, para Google Ads.", how: "Muchos equipos lo mantienen como vía hacia Google Ads mientras las decisiones de presupuesto pasan a la base medida.", link: { label: "Sealmetrics frente a GA4", href: "/es/vs-ga4/" } },
      { role: "Píxeles de Meta y Google", need: "Se quedan para las pujas, con consentimiento.", how: "Sealmetrics no envía conversiones a las plataformas, así que estas mantienen su propia configuración sujeta a consentimiento.", link: { label: "Atribución de ingresos por campaña", href: "/es/use-cases/revenue-attribution/" } },
      { role: "Sealmetrics", need: "Pasa a ser la visión por canal.", how: "Ingresos por canal, campaña y creatividad en cada sesión registrada, por vista de tienda, contrastados con los pedidos de Magento.", link: { label: "Datos completos", href: "/es/complete-data/" } },
    ],
  },

  proof: {
    tag: "El método, medido",
    body: "Todavía no hay publicado ningún caso de cliente en Magento, y esta página no finge lo contrario. El método de conciliación de arriba es el que usó Incapto en Shopify, donde las dos herramientas se contrastaron con pedidos reales antes de comparar nada.",
    figures: [
      { value: "96%", label: "de los pedidos reales registrados en la medición en paralelo de Incapto, 48 días, en Shopify", client: "Incapto · Shopify", href: "/es/case-studies/incapto/" },
      { value: "29%", label: "de las visitas reales que GA4 no registró en esa misma tienda", client: "Incapto · Shopify", href: "/es/case-studies/incapto/" },
      { value: "5", label: "eventos de funnel que envía el módulo de Magento, activables uno a uno desde el panel", client: "Documentación del módulo", href: "/es/platforms/magento/#method" },
    ],
    readCase: "Abrir",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Conoce los límites<br /><em>antes de comparar.</em></>,
    body: (
      <>
        La mayoría se derivan de que Magento confirma el pedido en el navegador. Para
        tiendas en las que un webhook confirma las compras en servidor, mira{" "}
        <Link className={link} href="/es/platforms/shopify/">Sealmetrics para Shopify</Link>.
      </>
    ),
    items: [
      ["La compra necesita la página de pedido completado", "Las compras se envían cuando carga la página de pedido completado. Si un método de pago nunca devuelve al comprador a esa página, esa compra no se registra."],
      ["Bloqueadores, sin dominio de píxel propio", "La dirección de píxel por defecto puede aparecer en listas de bloqueo. Definir un dominio de píxel propio mantiene las peticiones en tu dominio."],
      ["La conciliación es sobre totales", "Los ID de pedido no se guardan fuera de Magento, así que comparas totales y canales, nunca fila a fila."],
      ["Los frontales a medida hay que revisarlos", "La detección se apoya en los layout handles y los eventos customer-data de Magento. Un frontal muy personalizado o headless que los evite puede necesitar el tracker y los eventos enviados directamente."],
      ["Pedidos del panel y fuera de línea sin sesión", "Los pedidos creados en el panel, por teléfono o en marketplaces no tienen visita web, así que no tienen canal que atribuir."],
      ["Último clic por sesión", "Sin modelo multi-touch ni view-through; una visita posterior por otro canal se lleva el mérito."],
    ],
  },

  faqTag: "Preguntas frecuentes sobre Magento",
  faqTitle: <>Antes de instalar<br /><em>el módulo.</em></>,
  faq: [
    { question: "¿Cómo instalo Sealmetrics en Magento 2?", answer: "Descarga el módulo de Magento desde el dashboard de Sealmetrics en Settings → Integrations, cópialo en app/code/SealMetrics/Analytics, ejecuta bin/magento module:enable SealMetrics_Analytics, setup:upgrade y cache:clean, e introduce tu Account ID en Tiendas → Configuración → Sealmetrics → Analytics. Necesita Magento 2.4.0+ y PHP 7.4+ u 8.0+." },
    { question: "¿El módulo de Sealmetrics funciona con Adobe Commerce?", answer: "El módulo está documentado para Magento 2.4+, Adobe Commerce incluido. Se instala como un módulo estándar en app/code y se configura en el panel de Magento, así que revísalo con tu proceso habitual de despliegue para tu tipo de alojamiento." },
    { question: "¿Admite varias vistas de tienda y monedas?", answer: "Sí. El módulo funciona con varias vistas de tienda, se puede configurar por tienda si hace falta y respeta la moneda de cada una. Compara cada vista de tienda con sus propios pedidos, en la misma zona horaria y moneda." },
    { question: "¿Mide los productos configurables?", answer: "Sí. Las opciones elegidas en un producto configurable, como la talla o el color, se recogen con el añadido al carrito y con los artículos de la compra, junto con el nombre, el SKU, el precio, la categoría y la marca del producto." },
    { question: "¿Por qué falta una compra de Magento en Sealmetrics?", answer: "Comprueba que la página de pedido completado carga tras el pago, porque es ahí donde se envía la compra, y que el estado del pedido es completo. Después revisa la consola de JavaScript por si hay errores, confirma que el módulo está activo con el Account ID correcto y vacía la caché del frontal antes de volver a probar." },
    { question: "¿El módulo afecta al rendimiento de Magento?", answer: "El tracker pesa unos 1,1 KB comprimido. Para la tienda en conjunto, la documentación recomienda las prácticas habituales de Magento: modo producción, contenido estático desplegado y caché de página completa activada." },
    { question: "¿Sealmetrics sustituye a los informes de Magento o a GA4?", answer: "Por defecto no sustituye a ninguno. Los informes de Magento siguen siendo la fuente de pedidos, productos y clientes, y GA4 puede quedarse como vía hacia Google Ads. Sealmetrics pasa a ser la visión de canal e ingresos, medida en cada sesión y contrastada con los totales de pedidos de Magento." },
    { question: "¿Tendré que cambiar mi banner de consentimiento?", answer: "No necesariamente por la analítica: el módulo no instala cookies ni recoge datos de clientes. Los píxeles publicitarios, los chats o el A/B testing que sí guardan datos siguen necesitando consentimiento, y que tu tienda quede exenta para la analítica depende de su configuración y de los criterios de tu autoridad nacional." },
  ],

  final: {
    tag: "Revisión en Magento",
    title: <>Instálalo en tu tienda.<br /><em>Ve los canales detrás de los pedidos.</em></>,
    body: "Reserva 30 minutos con el founder. Instalamos el módulo en tu tienda Magento, probamos el funnel y una compra, y dejamos preparada la comparación con tus pedidos por vista de tienda.",
    primary: { label: "Reservar una revisión en Magento", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
