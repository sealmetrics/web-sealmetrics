import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /platforms/prestashop — Phase 5 of CONTENT-PLAN-PROBLEM-POSITIONING.md (new page).
 *
 * Integration facts come from docs.sealmetrics.com/integrations/ecommerce/prestashop
 * (checked 15 Sep 2026):
 * - Requirements: PrestaShop 1.7.0+ or 8.x, PHP 7.2+
 * - Installation: sealmetrics-prestashop.zip downloaded from the dashboard under
 *   Settings → Integrations; PrestaShop Admin > Modules > Module Manager >
 *   Upload a module; Configure to enter the Account ID
 * - Configuration: Account ID (required), Pixel URL (optional). No per-event toggles
 * - Tracked events: pageview with content grouping; view_item (product_name,
 *   product_id, sku, price, currency, category, brand); add_to_cart (product_name,
 *   product_id, price, quantity, currency) through PrestaShop's native
 *   prestashop.on('updateCart') event; begin_checkout (cart_total, currency,
 *   items_count); purchase as a conversion (revenue, currency, payment_method,
 *   coupon, items array with category, brand and combination attributes)
 * - Content groups from the PrestaShop controller (11 groups, table on the page)
 * - Variation attributes: combinations tracked with their attributes
 * - Multi-language: product names in the current language, localised category
 *   names, manufacturer names
 * - Hooks: displayHeader injects the tracker, displayOrderConfirmation sends the purchase
 * - Duplicate prevention: order tracking stored in configuration, no duplicate
 *   conversion on page refresh
 * - Privacy: no cookies, no order IDs stored externally, no customer data
 * - Troubleshooting: module not appearing (PrestaShop cache, folder permissions,
 *   PHP version); tracker not loading (Account ID, browser cache, JS errors);
 *   purchases not tracking (confirmation page loads, hook registered, default theme)
 * - Custom pixel domain and ad blockers: /implementation/tracker/first-party
 *
 * Not in the docs and therefore not claimed: PrestaShop multistore, PrestaShop 9,
 * per-event switches in the module settings, named themes or one-page checkout
 * modules, a documented install time. Reconciliation on totals follows from
 * "no order IDs stored externally"; it is method, not a module feature.
 *
 * There is no published PrestaShop case. The proof block says so and uses the
 * Incapto figures explicitly labelled as a Shopify measurement.
 */

export const PRESTASHOP_PUBLISHED = "2026-09-15";

const link = "sig-problem-inline";

export const prestashopEn: ProblemLandingContent = {
  route: "/platforms/prestashop",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Platforms", href: "/platforms/" },
    { label: "PrestaShop" },
  ],
  eyebrow: "Platform · PrestaShop",
  h1: <>PrestaShop records the order.<br />GA4 misses<br /><em>the channel behind it.</em></>,
  heroBody:
    "A consent-gated analytics tag does not see the shoppers who reject the banner, so the channel behind their orders disappears from your reports. The Sealmetrics module for PrestaShop 1.7+ and 8.x tracks the funnel from product view to purchase, in every store language, without setting a cookie or collecting customer data.",
  heroPrimary: { label: "See the install", href: "#method" },
  heroSecondary: { label: "Compare with Magento", href: "/platforms/magento/" },
  heroMicro: "PrestaShop 1.7+ and 8.x · PHP 7.2+ · no cookies · EU-hosted in Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Published",
    date: PRESTASHOP_PUBLISHED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "What the module sends",
    status: "Aggregate events",
    rows: [
      ["view_item", "Product, SKU, price, category, brand"],
      ["add_to_cart", "Product, price, quantity"],
      ["begin_checkout", "Cart total, item count"],
      ["purchase", "Revenue, payment method, coupon, items"],
    ],
    foot: "No customer data · no order ID stored outside PrestaShop · no cookies",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Sealmetrics for PrestaShop is a module for PrestaShop 1.7 and later,
      including 8.x, that adds cookieless analytics to a store. It tracks product
      views, add-to-cart, checkout starts and purchases, labels every page with a
      content group taken from the PrestaShop controller and records the
      attributes of product combinations, such as size or colour, without setting
      a cookie or collecting customer data. You download the ZIP from the
      Sealmetrics dashboard, upload it in the Module Manager and enter your
      Account ID. The purchase is sent from the order confirmation page with its
      revenue, currency, payment method, coupon and items, and the module records
      that it has done so, so refreshing the page does not count the order
      twice. Order IDs are not stored outside PrestaShop, so reconciliation is on
      totals and channels. A purchase whose shopper never reaches the
      confirmation page is not recorded.
    </p>
  ),

  divergence: {
    tag: "What it captures",
    title: <>The whole funnel.<br /><em>Grouped by controller.</em></>,
    body: "Configured with nothing more than an Account ID, the module sends the standard eCommerce funnel and labels every page by the PrestaShop controller that rendered it.",
    headers: ["Event", "When it fires", "What it carries", "Note"],
    rows: [
      ["pageview", "Every page", "The page, its channel and its content group", "home, product, catalog, cart, checkout, thankyou, page, contact, search, brand, account"],
      ["view_item", "Product page", "Product name, ID, SKU, price, currency, category, brand", "Product and category names in the shopper's current language"],
      ["add_to_cart", "When PrestaShop updates the cart", "Product name, ID, price, quantity, currency", "Captured through PrestaShop's native updateCart event"],
      ["begin_checkout", "Checkout start", "Cart total, currency, item count", "The step before payment"],
      ["purchase", "Order confirmation page", "Revenue, currency, payment method, coupon, items with combination attributes", "A conversion, not sent again when the page is refreshed; the other events are microconversions"],
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
    body: "PrestaShop knows every order. A cookie-based tag only knows the ones placed by visitors who accepted the banner and were not blocked.",
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
      ["03", "Multilingual stores multiply the gap", "Each language version has its own audience and its own banner behaviour. A consent-gated tag loses a different share in each one, which makes comparing markets on channel performance unreliable."],
    ],
  },

  method: {
    id: "method",
    tag: "Install on PrestaShop",
    title: <>Upload the module.<br /><em>Enter your Account ID.</em></>,
    body: (
      <>
        A standard PrestaShop module upload, no theme edits. The last step makes the
        comparison with PrestaShop&apos;s own orders fair; the reasoning is the same as
        in{" "}
        <Link className={link} href="/use-cases/single-source-of-truth/">one number for marketing and finance</Link>.
      </>
    ),
    howToName: "How to install Sealmetrics on PrestaShop",
    howToDescription:
      "Five steps to install cookieless analytics on a PrestaShop 1.7+ or 8.x store and check it against PrestaShop's own orders.",
    steps: [
      { name: "Download the module", text: "In the Sealmetrics dashboard, open Settings → Integrations and download sealmetrics-prestashop.zip. The module needs PrestaShop 1.7.0 or later, or 8.x, and PHP 7.2 or later." },
      { name: "Upload it in the Module Manager", text: "In the PrestaShop admin, go to Modules → Module Manager, click Upload a module and upload the ZIP file. If the module does not appear, clear the PrestaShop cache and check the module folder permissions and your PHP version." },
      { name: "Enter your Account ID", text: "Click Configure on the module and enter your Sealmetrics Account ID. Optionally, set a custom pixel domain in the Pixel URL field so the requests stay on your own domain." },
      { name: "Test the funnel and a purchase", text: "Open a product, add it to the cart and start checkout, and check the events arrive. Place a test order and confirm the purchase appears once the order confirmation page loads. If it does not, check that the displayOrderConfirmation hook is registered and test with the default theme." },
      { name: "Compare with PrestaShop's orders", text: "Order IDs are not stored outside PrestaShop, so compare totals rather than rows: the same period, timezone and currency, leaving out orders with no web visit behind them, such as orders created in the back office." },
    ],
  },

  roles: {
    tag: "What stays, what changes",
    title: <>Nothing is ripped out.<br /><em>The decision moves.</em></>,
    body: "Each tool keeps the job it does well. Sealmetrics takes the one a consent-gated tag cannot do: telling you which channels produced the orders.",
    items: [
      { role: "PrestaShop back office", need: "Stays: the order and catalogue view.", how: "Orders, products, customers and vouchers stay in PrestaShop, and Sealmetrics is checked against its order totals.", link: { label: "One number for marketing and finance", href: "/use-cases/single-source-of-truth/" } },
      { role: "GA4", need: "Can stay, for Google Ads.", how: "Many teams keep it as the Google Ads conduit while budget decisions move to the measured base.", link: { label: "GA4 migration plan", href: "/use-cases/ga4-migration/" } },
      { role: "Meta and Google pixels", need: "Stay for bidding, behind consent.", how: "Sealmetrics does not send conversions to ad platforms, so the platforms keep their own consent-gated setup.", link: { label: "Campaign revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "Sealmetrics", need: "Becomes the channel view.", how: "Revenue by channel, campaign and creative on every recorded session, checked against PrestaShop's orders.", link: { label: "Complete data", href: "/complete-data/" } },
    ],
  },

  proof: {
    tag: "The method, measured",
    body: "No PrestaShop customer case is published yet, and this page does not pretend otherwise. The reconciliation method above is the one Incapto used on Shopify, where both tools were checked against real orders before anything was compared.",
    figures: [
      { value: "96%", label: "of real orders recorded in Incapto's 48-day parallel run, on Shopify", client: "Incapto · Shopify", href: "/case-studies/incapto/" },
      { value: "29%", label: "of real visits that GA4 did not record on the same store", client: "Incapto · Shopify", href: "/case-studies/incapto/" },
      { value: "11", label: "content groups the PrestaShop module assigns from the page controller", client: "Module documentation", href: "/platforms/prestashop/#method" },
    ],
    readCase: "Open",
  },

  limits: {
    tag: "What it does not do",
    title: <>Know the edges<br /><em>before you compare.</em></>,
    body: (
      <>
        Most of these follow from how PrestaShop confirms an order in the browser. For
        stores where a webhook confirms purchases server-side, see{" "}
        <Link className={link} href="/platforms/shopify/">Sealmetrics for Shopify</Link>.
      </>
    ),
    items: [
      ["The purchase needs the confirmation page", "Purchases are sent when the order confirmation page loads. If a payment method never returns the shopper there, that purchase is not recorded."],
      ["Ad blockers, without a custom pixel domain", "The default pixel address can appear on blocklists. Setting a custom pixel domain keeps the requests on your own domain."],
      ["Reconciliation is on totals", "Order IDs are not stored outside PrestaShop, so you compare totals and channels, never row by row."],
      ["Custom themes need checking", "Add-to-cart relies on PrestaShop's native updateCart event, and the purchase on the order confirmation hook. A theme or checkout that bypasses them may not send those events, which is why troubleshooting starts with the default theme."],
      ["Back-office and offline orders have no session", "Orders created in the back office, by phone or through marketplaces have no web visit, so they have no channel to attribute."],
      ["Last click per session", "No multi-touch model and no view-through; a returning visit through another channel takes the credit."],
    ],
  },

  faqTag: "Common PrestaShop questions",
  faqTitle: <>Before you install<br /><em>the module.</em></>,
  faq: [
    { question: "How do I install Sealmetrics on PrestaShop?", answer: "Download sealmetrics-prestashop.zip from the Sealmetrics dashboard under Settings → Integrations. In the PrestaShop admin, go to Modules → Module Manager, click Upload a module, upload the ZIP and click Configure to enter your Account ID." },
    { question: "Which PrestaShop versions does the module support?", answer: "PrestaShop 1.7.0 and later, and PrestaShop 8.x, with PHP 7.2 or later." },
    { question: "Does Sealmetrics count a purchase twice if the confirmation page is refreshed?", answer: "No. The module stores in its configuration that the order has been tracked, so refreshing the order confirmation page does not send the purchase again." },
    { question: "Does it track product combinations?", answer: "Yes. The attributes of a product combination, such as size, colour or material, are recorded with the items of the purchase, together with product name, ID, SKU, price, category and brand." },
    { question: "Does it work with a multilingual PrestaShop store?", answer: "Yes. The module works with all PrestaShop languages: product names are sent in the shopper's current language, category names are localised and manufacturer names are included." },
    { question: "Why is a PrestaShop purchase missing in Sealmetrics?", answer: "Check that the order confirmation page loads after payment, because that is where the purchase is sent, and that the module's order confirmation hook is registered. Then test with the default theme to rule out a theme that bypasses it." },
    { question: "Does Sealmetrics replace PrestaShop's statistics or GA4?", answer: "It replaces neither by default. The PrestaShop back office stays the source for orders, products and customers, and GA4 can stay as the Google Ads conduit. Sealmetrics becomes the channel and revenue view, measured without consent loss and checked against PrestaShop's order totals." },
    { question: "Will I need to change my consent banner?", answer: "Not necessarily for the analytics: the module sets no cookie and collects no customer data. Ad pixels, chat tools or A/B testing that do store data still need consent, and whether your store is exempt for analytics depends on its configuration and your national authority's criteria." },
  ],

  final: {
    tag: "PrestaShop walkthrough",
    title: <>Install on your store.<br /><em>See the channels behind the orders.</em></>,
    body: "Book 30 minutes: we walk through the module setup on your PrestaShop version, how to test the funnel and a purchase, and how to compare Sealmetrics with your orders.",
    primary: { label: "Book a PrestaShop walkthrough", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const prestashopEs: ProblemLandingContent = {
  route: "/platforms/prestashop",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Plataformas", href: "/es/platforms/" },
    { label: "PrestaShop" },
  ],
  eyebrow: "Plataforma · PrestaShop",
  h1: <>PrestaShop registra el pedido.<br />GA4 pierde<br /><em>el canal que lo trajo.</em></>,
  heroBody:
    "Una etiqueta de analítica que espera al consentimiento no ve a los compradores que rechazan el banner, así que el canal detrás de sus pedidos desaparece de tus informes. El módulo de Sealmetrics para PrestaShop 1.7+ y 8.x mide el funnel desde la ficha de producto hasta la compra, en todos los idiomas de la tienda, sin instalar cookies ni recoger datos de clientes.",
  heroPrimary: { label: "Ver la instalación", href: "#method" },
  heroSecondary: { label: "Comparar con Magento", href: "/es/platforms/magento/" },
  heroMicro: "PrestaShop 1.7+ y 8.x · PHP 7.2+ · sin cookies · alojado en Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Publicado",
    date: PRESTASHOP_PUBLISHED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Lo que envía el módulo",
    status: "Eventos agregados",
    rows: [
      ["view_item", "Producto, SKU, precio, categoría, marca"],
      ["add_to_cart", "Producto, precio, cantidad"],
      ["begin_checkout", "Total del carrito, nº de artículos"],
      ["purchase", "Ingresos, método de pago, cupón, artículos"],
    ],
    foot: "Sin datos de clientes · sin ID de pedido fuera de PrestaShop · sin cookies",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      Sealmetrics para PrestaShop es un módulo para PrestaShop 1.7 y posteriores,
      8.x incluida, que añade analítica sin cookies a una tienda. Mide vistas de
      producto, añadidos al carrito, inicios de checkout y compras, etiqueta cada
      página con un grupo de contenido que toma del controlador de PrestaShop y
      recoge los atributos de las combinaciones de producto, como la talla o el
      color, sin instalar cookies ni recoger datos de clientes. Descargas el ZIP
      desde el dashboard, lo subes en el Gestor de módulos e
      introduces tu Account ID. La compra se envía desde la página de
      confirmación del pedido con sus ingresos, moneda, método de pago, cupón y
      artículos, y el módulo deja constancia de que ya la ha enviado, así que
      recargar la página no cuenta el pedido dos veces. Los ID de pedido no se
      guardan fuera de PrestaShop, así que la conciliación se hace sobre
      totales y canales. Una compra cuyo comprador nunca llega a la página de
      confirmación no se registra.
    </p>
  ),

  divergence: {
    tag: "Qué captura",
    title: <>Todo el funnel.<br /><em>Agrupado por controlador.</em></>,
    body: "Basta con un Account ID: el módulo envía el funnel estándar de eCommerce y etiqueta cada página según el controlador de PrestaShop que la genera.",
    headers: ["Evento", "Cuándo se dispara", "Qué lleva", "Nota"],
    rows: [
      ["pageview", "En cada página", "La página, su canal y su grupo de contenido", "home, product, catalog, cart, checkout, thankyou, page, contact, search, brand, account"],
      ["view_item", "Ficha de producto", "Nombre, ID, SKU, precio, moneda, categoría y marca del producto", "Nombres de producto y categoría en el idioma que ve el comprador"],
      ["add_to_cart", "Cuando PrestaShop actualiza el carrito", "Nombre, ID, precio, cantidad y moneda", "Se captura con el evento nativo updateCart de PrestaShop"],
      ["begin_checkout", "Inicio del checkout", "Total del carrito, moneda y número de artículos", "El paso previo al pago"],
      ["purchase", "Página de confirmación del pedido", "Ingresos, moneda, método de pago, cupón y artículos con los atributos de la combinación", "Una conversión que no se reenvía al recargar la página; el resto de eventos son microconversiones"],
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
    body: "PrestaShop conoce cada pedido. Una etiqueta con cookies solo conoce los de quienes aceptaron el banner y no bloquearon el script.",
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
      ["03", "Con varios idiomas, el hueco se multiplica", "Cada versión de idioma tiene su público y su comportamiento ante el banner. Una etiqueta con consentimiento pierde una parte distinta en cada una, y comparar mercados por rendimiento de canal deja de ser fiable."],
    ],
  },

  method: {
    id: "method",
    tag: "Instalación en PrestaShop",
    title: <>Sube el módulo.<br /><em>Introduce tu Account ID.</em></>,
    body: (
      <>
        Una subida estándar de módulo de PrestaShop, sin tocar el tema. El último
        paso es el que hace justa la comparación con los pedidos de PrestaShop; el
        razonamiento es el mismo que en{" "}
        <Link className={link} href="/es/use-cases/single-source-of-truth/">una sola cifra para marketing y finanzas</Link>.
      </>
    ),
    howToName: "Cómo instalar Sealmetrics en PrestaShop",
    howToDescription:
      "Cinco pasos para instalar analítica sin cookies en una tienda PrestaShop 1.7+ u 8.x y contrastarla con los pedidos de la propia PrestaShop.",
    steps: [
      { name: "Descarga el módulo", text: "En el dashboard de Sealmetrics, abre Settings → Integrations y descarga sealmetrics-prestashop.zip. El módulo necesita PrestaShop 1.7.0 o posterior, u 8.x, y PHP 7.2 o posterior." },
      { name: "Súbelo en el Gestor de módulos", text: "En el panel de PrestaShop, ve a Módulos → Gestor de módulos, pulsa Subir un módulo y sube el archivo ZIP. Si el módulo no aparece, vacía la caché de PrestaShop y revisa los permisos de la carpeta del módulo y tu versión de PHP." },
      { name: "Introduce tu Account ID", text: "Pulsa Configurar en el módulo e introduce tu Account ID de Sealmetrics. Si quieres, define un dominio de píxel propio en el campo Pixel URL para que las peticiones se queden en tu dominio." },
      { name: "Prueba el funnel y una compra", text: "Abre un producto, añádelo al carrito, empieza el checkout y comprueba que llegan los eventos. Haz un pedido de prueba y confirma que la compra aparece cuando carga la página de confirmación del pedido. Si no aparece, comprueba que el hook displayOrderConfirmation está registrado y prueba con el tema por defecto." },
      { name: "Compara con los pedidos de PrestaShop", text: "Los ID de pedido no se guardan fuera de PrestaShop, así que compara totales y no filas: mismo periodo, zona horaria y moneda, dejando fuera los pedidos sin visita web detrás, como los creados desde el back office." },
    ],
  },

  roles: {
    tag: "Qué se queda y qué cambia",
    title: <>No se arranca nada.<br /><em>Se mueve la decisión.</em></>,
    body: "Cada herramienta conserva el trabajo que hace bien. Sealmetrics asume el que no puede hacer una etiqueta con consentimiento: decirte qué canales produjeron los pedidos.",
    items: [
      { role: "Back office de PrestaShop", need: "Se queda: la visión de pedidos y catálogo.", how: "Pedidos, productos, clientes y cupones siguen en PrestaShop, y Sealmetrics se contrasta con sus totales de pedidos.", link: { label: "Una cifra para marketing y finanzas", href: "/es/use-cases/single-source-of-truth/" } },
      { role: "GA4", need: "Puede quedarse, para Google Ads.", how: "Muchos equipos lo mantienen como vía hacia Google Ads mientras las decisiones de presupuesto pasan a la base medida.", link: { label: "Sealmetrics frente a GA4", href: "/es/vs-ga4/" } },
      { role: "Píxeles de Meta y Google", need: "Se quedan para las pujas, con consentimiento.", how: "Sealmetrics no envía conversiones a las plataformas, así que estas mantienen su propia configuración sujeta a consentimiento.", link: { label: "Atribución de ingresos por campaña", href: "/es/use-cases/revenue-attribution/" } },
      { role: "Sealmetrics", need: "Pasa a ser la visión por canal.", how: "Ingresos por canal, campaña y creatividad en cada sesión registrada, contrastados con los pedidos de PrestaShop.", link: { label: "Datos completos", href: "/es/complete-data/" } },
    ],
  },

  proof: {
    tag: "El método, medido",
    body: "Todavía no hay publicado ningún caso de cliente en PrestaShop, y esta página no finge lo contrario. El método de conciliación de arriba es el que usó Incapto en Shopify, donde las dos herramientas se contrastaron con pedidos reales antes de comparar nada.",
    figures: [
      { value: "96%", label: "de los pedidos reales registrados en la medición en paralelo de Incapto, 48 días, en Shopify", client: "Incapto · Shopify", href: "/es/case-studies/incapto/" },
      { value: "29%", label: "de las visitas reales que GA4 no registró en esa misma tienda", client: "Incapto · Shopify", href: "/es/case-studies/incapto/" },
      { value: "11", label: "grupos de contenido que el módulo asigna a partir del controlador de cada página", client: "Documentación del módulo", href: "/es/platforms/prestashop/#method" },
    ],
    readCase: "Abrir",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Conoce los límites<br /><em>antes de comparar.</em></>,
    body: (
      <>
        La mayoría se derivan de que PrestaShop confirma el pedido en el navegador. Para
        tiendas en las que un webhook confirma las compras en servidor, mira{" "}
        <Link className={link} href="/es/platforms/shopify/">Sealmetrics para Shopify</Link>.
      </>
    ),
    items: [
      ["La compra necesita la página de confirmación", "Las compras se envían cuando carga la página de confirmación del pedido. Si un método de pago nunca devuelve al comprador a esa página, esa compra no se registra."],
      ["Bloqueadores, sin dominio de píxel propio", "La dirección de píxel por defecto puede aparecer en listas de bloqueo. Definir un dominio de píxel propio mantiene las peticiones en tu dominio."],
      ["La conciliación es sobre totales", "Los ID de pedido no se guardan fuera de PrestaShop, así que comparas totales y canales, nunca fila a fila."],
      ["Los temas a medida hay que revisarlos", "El añadido al carrito depende del evento nativo updateCart de PrestaShop, y la compra, del hook de confirmación del pedido. Un tema o un checkout que los evite puede no enviar esos eventos; por eso el diagnóstico empieza probando con el tema por defecto."],
      ["Pedidos del back office y fuera de línea sin sesión", "Los pedidos creados desde el back office, por teléfono o en marketplaces no tienen visita web, así que no tienen canal que atribuir."],
      ["Último clic por sesión", "Sin modelo multi-touch ni view-through; una visita posterior por otro canal se lleva el mérito."],
    ],
  },

  faqTag: "Preguntas frecuentes sobre PrestaShop",
  faqTitle: <>Antes de instalar<br /><em>el módulo.</em></>,
  faq: [
    { question: "¿Cómo instalo Sealmetrics en PrestaShop?", answer: "Descarga sealmetrics-prestashop.zip desde el dashboard de Sealmetrics en Settings → Integrations. En el panel de PrestaShop, ve a Módulos → Gestor de módulos, pulsa Subir un módulo, sube el ZIP y pulsa Configurar para introducir tu Account ID." },
    { question: "¿Qué versiones de PrestaShop admite el módulo?", answer: "PrestaShop 1.7.0 y posteriores, y PrestaShop 8.x, con PHP 7.2 o posterior." },
    { question: "¿Sealmetrics cuenta una compra dos veces si se recarga la página de confirmación?", answer: "No. El módulo guarda en su configuración que el pedido ya se ha medido, así que recargar la página de confirmación del pedido no vuelve a enviar la compra." },
    { question: "¿Mide las combinaciones de producto?", answer: "Sí. Los atributos de una combinación, como la talla, el color o el material, se recogen con los artículos de la compra, junto con el nombre, el ID, el SKU, el precio, la categoría y la marca del producto." },
    { question: "¿Funciona con una tienda PrestaShop en varios idiomas?", answer: "Sí. El módulo funciona con todos los idiomas de PrestaShop: los nombres de producto se envían en el idioma que ve el comprador, los de categoría van localizados y se incluye el nombre del fabricante." },
    { question: "¿Por qué falta una compra de PrestaShop en Sealmetrics?", answer: "Comprueba que la página de confirmación del pedido carga tras el pago, porque es ahí donde se envía la compra, y que el hook de confirmación del módulo está registrado. Después prueba con el tema por defecto para descartar un tema que lo evite." },
    { question: "¿Sealmetrics sustituye a las estadísticas de PrestaShop o a GA4?", answer: "Por defecto no sustituye a ninguno. El back office de PrestaShop sigue siendo la fuente de pedidos, productos y clientes, y GA4 puede quedarse como vía hacia Google Ads. Sealmetrics pasa a ser la visión de canal e ingresos, medida sin pérdida por consentimiento y contrastada con los totales de pedidos de PrestaShop." },
    { question: "¿Tendré que cambiar mi banner de consentimiento?", answer: "No necesariamente por la analítica: el módulo no instala cookies ni recoge datos de clientes. Los píxeles publicitarios, los chats o el A/B testing que sí guardan datos siguen necesitando consentimiento, y que tu tienda quede exenta para la analítica depende de su configuración y de los criterios de tu autoridad nacional." },
  ],

  final: {
    tag: "Revisión en PrestaShop",
    title: <>Instálalo en tu tienda.<br /><em>Ve los canales detrás de los pedidos.</em></>,
    body: "Reserva 30 minutos: repasamos la instalación del módulo en tu versión de PrestaShop, cómo probar el funnel y una compra, y cómo comparar Sealmetrics con tus pedidos.",
    primary: { label: "Reservar una revisión en PrestaShop", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
