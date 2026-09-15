import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /platforms/opencart — Phase 5 of CONTENT-PLAN-PROBLEM-POSITIONING.md (new page).
 *
 * Integration facts come from docs.sealmetrics.com/integrations/ecommerce/opencart
 * (checked 15 Sep 2026):
 * - Compatibility: OpenCart 4.x (primary support), OpenCart 3.x (with
 *   modifications), PHP 7.4+
 * - Installation on 4.x: extension package downloaded from the dashboard under
 *   Settings → Integrations; Extensions > Installer, upload sealmetrics.ocmod.zip;
 *   Extensions > Extensions > Analytics, install Sealmetrics Analytics; Edit,
 *   Account ID; enable and save
 * - Installation on 3.x: upload the `upload` folder contents to the OpenCart root;
 *   Extensions > Modifications > Refresh; Extensions > Analytics, install
 *   Sealmetrics Analytics; Account ID and enable
 * - Configuration: Account ID (required), Pixel URL (optional), Track Product
 *   Views, Track Add to Cart, Track Checkout, Track Purchases, Contact Forms as Leads
 * - Events: pageview with content grouping; view_item on product pages;
 *   add_to_cart on add-to-cart button clicks; begin_checkout on checkout page
 *   views; purchase on order confirmation (conversion)
 * - Content groups from OpenCart routes (10 groups, table on the page)
 * - Product data: product_id, product_name, sku, price, category, brand
 * - Purchase data: value, currency, payment_method, coupon, items with
 *   product_id, product_name, sku, price, quantity, category, brand, and product
 *   options as properties
 * - Custom events via sealmetrics.micro / sealmetrics.conv
 * - Multi-store: configured separately per store, different Account IDs if
 *   needed, each store tracks independently
 * - Privacy: no cookies, no personal data, no order IDs stored externally
 * - Troubleshooting: tracker not loading (Account ID, extension enabled, clear
 *   OpenCart cache under System > Maintenance); purchases not tracking (Track
 *   Purchases enabled, confirmation page loads, no JS errors); add to cart not
 *   tracking (toggle enabled, cart uses standard OpenCart methods)
 * - Custom pixel domain and ad blockers: /implementation/tracker/first-party
 *
 * Not in the docs and therefore not claimed: duplicate prevention on a
 * refreshed success page (documented for PrestaShop and WooCommerce, not for
 * OpenCart — the page says it is not documented), what "with modifications"
 * changes on 3.x beyond the install route, OpenCart 2.x, named themes such as
 * Journal, multi-currency handling beyond the currency property, a documented
 * install time. Reconciliation on totals follows from "no order IDs stored
 * externally"; it is method, not an extension feature.
 *
 * There is no published OpenCart case. The proof block says so and uses the
 * Incapto figures explicitly labelled as a Shopify measurement.
 */

export const OPENCART_PUBLISHED = "2026-09-15";

const link = "sig-problem-inline";

export const opencartEn: ProblemLandingContent = {
  route: "/platforms/opencart",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Platforms", href: "/platforms/" },
    { label: "OpenCart" },
  ],
  eyebrow: "Platform · OpenCart",
  h1: <>OpenCart records the order.<br />GA4 misses<br /><em>the channel behind it.</em></>,
  heroBody:
    "A consent-gated analytics tag does not see the shoppers who reject the banner, so the channel behind their orders disappears from your reports. The Sealmetrics extension for OpenCart 4.x tracks the funnel from product view to purchase, store by store, without setting a cookie or collecting personal data.",
  heroPrimary: { label: "See the install", href: "#method" },
  heroSecondary: { label: "Compare with PrestaShop", href: "/platforms/prestashop/" },
  heroMicro: "OpenCart 4.x · 3.x with modifications · PHP 7.4+ · no cookies · EU-hosted in Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Published",
    date: OPENCART_PUBLISHED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "What the extension sends",
    status: "Aggregate events",
    rows: [
      ["view_item", "Product, SKU, price, category, brand"],
      ["add_to_cart", "Add-to-cart clicks"],
      ["begin_checkout", "Checkout page views"],
      ["purchase", "Revenue, payment method, coupon, items"],
    ],
    foot: "No personal data · no order ID stored outside OpenCart · one setup per store",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Sealmetrics for OpenCart is an extension, built primarily for
      OpenCart 4.x and usable on 3.x with modifications, that adds cookieless
      analytics to a store. It tracks product views, add-to-cart clicks,
      checkout page views and purchases, each with its own switch in the
      extension settings, and labels every page with a content group taken from
      the OpenCart route, without setting a cookie or collecting personal data.
      On OpenCart 4.x you upload the OCMOD package in the Extension Installer,
      install Sealmetrics Analytics under Analytics and enter your Account ID.
      The purchase is sent from the order confirmation page with its revenue,
      currency, payment method, coupon and items, including the options chosen
      for each product. In a multi-store installation each store is configured
      and tracked on its own. Order IDs are not stored outside OpenCart, so
      reconciliation is on totals and channels, and a purchase whose shopper
      never reaches the confirmation page is not recorded.
    </p>
  ),

  divergence: {
    tag: "What it captures",
    title: <>The whole funnel.<br /><em>Grouped by route.</em></>,
    body: "Enabled with an Account ID, the extension sends the standard eCommerce funnel and labels every page by its OpenCart route, with each funnel event switchable in the settings.",
    headers: ["Event", "When it fires", "What it carries", "Note"],
    rows: [
      ["pageview", "Every page", "The page, its channel and its content group", "home, product, catalog, brand, search, cart, checkout, thankyou, account, contact"],
      ["view_item", "Product page view", "Product ID, name, SKU, price, category, brand", "Track Product Views"],
      ["add_to_cart", "Add-to-cart button click", "The product added", "Track Add to Cart; needs the standard OpenCart cart methods"],
      ["begin_checkout", "Checkout page view", "The checkout step", "Track Checkout"],
      ["purchase", "Order confirmation page", "Revenue, currency, payment method, coupon, items with their options", "Track Purchases; the conversion that carries revenue"],
      ["Contact form", "Contact form submission", "A lead conversion", "Optional: Contact Forms as Leads"],
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
    body: "OpenCart knows every order. A cookie-based tag only knows the ones placed by visitors who accepted the banner and were not blocked.",
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
      ["03", "Multi-store reporting multiplies the gap", "Each store in an OpenCart installation has its own audience and banner behaviour. A consent-gated tag loses a different share in each one, which makes comparing stores on channel performance unreliable."],
    ],
  },

  method: {
    id: "method",
    tag: "Install on OpenCart",
    title: <>Upload the extension.<br /><em>Install it under Analytics.</em></>,
    body: (
      <>
        The steps below are for OpenCart 4.x, the primary target; OpenCart 3.x has
        its own route, given in the second step. The last step makes the comparison
        with OpenCart&apos;s own orders fair; the reasoning is the same as in{" "}
        <Link className={link} href="/use-cases/single-source-of-truth/">one number for marketing and finance</Link>.
      </>
    ),
    howToName: "How to install Sealmetrics on OpenCart",
    howToDescription:
      "Five steps to install cookieless analytics on an OpenCart 4.x store, with the OpenCart 3.x route, and check it against OpenCart's own orders.",
    steps: [
      { name: "Download the extension", text: "In the Sealmetrics dashboard, open Settings → Integrations and download the OpenCart extension package, sealmetrics.ocmod.zip. It needs PHP 7.4 or later." },
      { name: "Upload it", text: "On OpenCart 4.x, go to Extensions → Installer and upload sealmetrics.ocmod.zip. On OpenCart 3.x, upload the contents of the upload folder to your OpenCart root instead, then go to Extensions → Modifications and click Refresh." },
      { name: "Install and configure it", text: "Go to Extensions → Extensions → Analytics (Extensions → Analytics on 3.x), install Sealmetrics Analytics and open its settings (Edit, on 4.x). Enter your Account ID, choose which of product views, add to cart, checkout and purchases to track, optionally set a custom pixel domain and contact forms as leads, then enable the extension and save." },
      { name: "Test the funnel and a purchase", text: "Open a product, add it to the cart and go to checkout, and check the events arrive. Place a test order and confirm the purchase appears once the order confirmation page loads. If nothing arrives, check the extension is enabled with the right Account ID and clear the OpenCart cache under System → Maintenance." },
      { name: "Compare with OpenCart's orders, store by store", text: "Order IDs are not stored outside OpenCart, so compare totals rather than rows: the same period, timezone and currency, for each store separately, since each store is configured and tracked on its own." },
    ],
  },

  roles: {
    tag: "What stays, what changes",
    title: <>Nothing is ripped out.<br /><em>The decision moves.</em></>,
    body: "Each tool keeps the job it does well. Sealmetrics takes the one a consent-gated tag cannot do: telling you which channels produced the orders.",
    items: [
      { role: "OpenCart admin", need: "Stays: the order and catalogue view.", how: "Orders, products, customers and coupons stay in OpenCart, and Sealmetrics is checked against its order totals.", link: { label: "One number for marketing and finance", href: "/use-cases/single-source-of-truth/" } },
      { role: "GA4", need: "Can stay, for Google Ads.", how: "Many teams keep it as the Google Ads conduit while budget decisions move to the measured base.", link: { label: "GA4 migration plan", href: "/use-cases/ga4-migration/" } },
      { role: "Meta and Google pixels", need: "Stay for bidding, behind consent.", how: "Sealmetrics does not send conversions to ad platforms, so the platforms keep their own consent-gated setup.", link: { label: "Campaign revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "Sealmetrics", need: "Becomes the channel view.", how: "Revenue by channel, campaign and creative on every recorded session, per store, checked against OpenCart's orders.", link: { label: "Complete data", href: "/complete-data/" } },
    ],
  },

  proof: {
    tag: "The method, measured",
    body: "No OpenCart customer case is published yet, and this page does not pretend otherwise. The reconciliation method above is the one Incapto used on Shopify, where both tools were checked against real orders before anything was compared.",
    figures: [
      { value: "96%", label: "of real orders recorded in Incapto's 48-day parallel run, on Shopify", client: "Incapto · Shopify", href: "/case-studies/incapto/" },
      { value: "29%", label: "of real visits that GA4 did not record on the same store", client: "Incapto · Shopify", href: "/case-studies/incapto/" },
      { value: "4", label: "funnel events the OpenCart extension sends, each with its own switch in the settings", client: "Extension documentation", href: "/platforms/opencart/#method" },
    ],
    readCase: "Open",
  },

  limits: {
    tag: "What it does not do",
    title: <>Know the edges<br /><em>before you compare.</em></>,
    body: (
      <>
        Most of these follow from how OpenCart confirms an order in the browser. For
        stores where a webhook confirms purchases server-side, see{" "}
        <Link className={link} href="/platforms/shopify/">Sealmetrics for Shopify</Link>.
      </>
    ),
    items: [
      ["The purchase needs the confirmation page", "Purchases are sent when the order confirmation page loads. If a payment method never returns the shopper there, that purchase is not recorded."],
      ["OpenCart 4.x is the primary target", "OpenCart 3.x is supported with modifications and a different install route. Test the funnel and a purchase on a 3.x store before relying on the numbers."],
      ["Ad blockers, without a custom pixel domain", "The default pixel address can appear on blocklists. Setting a custom pixel domain keeps the requests on your own domain."],
      ["Reconciliation is on totals", "Order IDs are not stored outside OpenCart, so you compare totals and channels, never row by row. Protection against a reloaded confirmation page counting twice is not documented for OpenCart, so check for it when you compare."],
      ["Custom carts need checking", "Add-to-cart tracking relies on the standard OpenCart cart methods. A theme or extension that replaces them may not send the event."],
      ["Last click per session", "No multi-touch model and no view-through; a returning visit through another channel takes the credit."],
    ],
  },

  faqTag: "Common OpenCart questions",
  faqTitle: <>Before you install<br /><em>the extension.</em></>,
  faq: [
    { question: "How do I install Sealmetrics on OpenCart 4?", answer: "Download sealmetrics.ocmod.zip from the Sealmetrics dashboard under Settings → Integrations and upload it in Extensions → Installer. Then go to Extensions → Extensions → Analytics, install Sealmetrics Analytics, click Edit, enter your Account ID, enable the extension and save." },
    { question: "Does the extension work on OpenCart 3?", answer: "OpenCart 4.x has primary support; OpenCart 3.x is supported with modifications. On 3.x you upload the contents of the upload folder to your OpenCart root, refresh Extensions → Modifications, install Sealmetrics Analytics under Extensions → Analytics, and enter your Account ID. It needs PHP 7.4 or later." },
    { question: "Can I choose which events are tracked?", answer: "Yes. The settings have separate switches for product views, add to cart, checkout and purchases, plus an option to track contact form submissions as lead conversions. Page views are tracked automatically, each with a content group taken from the OpenCart route." },
    { question: "Does it support OpenCart multi-store?", answer: "Yes. In a multi-store installation you configure Sealmetrics separately for each store, with different Account IDs if you need them, and each store is tracked independently." },
    { question: "What does the purchase event include?", answer: "The order value, currency, payment method and coupon, and for each item the product ID, name, SKU, price, quantity, category and brand, with the product options chosen, such as size or colour, sent as properties." },
    { question: "Why is an OpenCart purchase missing in Sealmetrics?", answer: "Check that Track Purchases is enabled, that the order confirmation page loads correctly after payment, because that is where the purchase is sent, and that there are no JavaScript errors in the browser console." },
    { question: "Why is add to cart not tracked?", answer: "Check that Track Add to Cart is enabled and that your store's cart uses the standard OpenCart methods. A theme or extension that replaces the cart may not trigger the event." },
    { question: "Will I need to change my consent banner?", answer: "Not necessarily for the analytics: the extension sets no cookie and collects no personal data. Ad pixels, chat tools or A/B testing that do store data still need consent, and whether your store is exempt for analytics depends on its configuration and your national authority's criteria." },
  ],

  final: {
    tag: "OpenCart walkthrough",
    title: <>Install on your store.<br /><em>See the channels behind the orders.</em></>,
    body: "Book 30 minutes: we walk through the extension setup on your OpenCart version, how to test the funnel and a purchase, and how to compare Sealmetrics with your orders store by store.",
    primary: { label: "Book an OpenCart walkthrough", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const opencartEs: ProblemLandingContent = {
  route: "/platforms/opencart",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Plataformas", href: "/es/platforms/" },
    { label: "OpenCart" },
  ],
  eyebrow: "Plataforma · OpenCart",
  h1: <>OpenCart registra el pedido.<br />GA4 pierde<br /><em>el canal que lo trajo.</em></>,
  heroBody:
    "Una etiqueta de analítica que espera al consentimiento no ve a los compradores que rechazan el banner, así que el canal detrás de sus pedidos desaparece de tus informes. La extensión de Sealmetrics para OpenCart 4.x mide el funnel desde la ficha de producto hasta la compra, tienda a tienda, sin instalar cookies ni recoger datos personales.",
  heroPrimary: { label: "Ver la instalación", href: "#method" },
  heroSecondary: { label: "Comparar con PrestaShop", href: "/es/platforms/prestashop/" },
  heroMicro: "OpenCart 4.x · 3.x con modificaciones · PHP 7.4+ · sin cookies · alojado en Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Publicado",
    date: OPENCART_PUBLISHED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Lo que envía la extensión",
    status: "Eventos agregados",
    rows: [
      ["view_item", "Producto, SKU, precio, categoría, marca"],
      ["add_to_cart", "Clics en añadir al carrito"],
      ["begin_checkout", "Vistas de la página de checkout"],
      ["purchase", "Ingresos, método de pago, cupón, artículos"],
    ],
    foot: "Sin datos personales · sin ID de pedido fuera de OpenCart · configuración por tienda",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      Sealmetrics para OpenCart es una extensión, pensada
      para OpenCart 4.x y utilizable en 3.x con modificaciones, que añade
      analítica sin cookies a una tienda. Mide vistas de producto, clics en
      añadir al carrito, vistas del checkout y compras, cada uno con su propio
      interruptor en los ajustes, y etiqueta cada página con un
      grupo de contenido que toma de la ruta de OpenCart, sin instalar cookies ni
      recoger datos personales. En OpenCart 4.x subes el paquete OCMOD en el
      instalador de extensiones, instalas Sealmetrics Analytics en Analytics e
      introduces tu Account ID. La compra se envía desde la página de
      confirmación del pedido con sus ingresos, moneda, método de pago, cupón y
      artículos, incluidas las opciones elegidas de cada producto. En
      multitienda, cada tienda se configura y se mide por separado.
      Los ID de pedido no se guardan fuera de OpenCart, así que la conciliación
      se hace sobre totales y canales, y una compra cuyo comprador nunca llega a
      la página de confirmación no se registra.
    </p>
  ),

  divergence: {
    tag: "Qué captura",
    title: <>Todo el funnel.<br /><em>Agrupado por ruta.</em></>,
    body: "Activada con un Account ID, la extensión envía el funnel estándar de eCommerce y etiqueta cada página según su ruta de OpenCart, con cada evento del funnel activable desde los ajustes.",
    headers: ["Evento", "Cuándo se dispara", "Qué lleva", "Nota"],
    rows: [
      ["pageview", "En cada página", "La página, su canal y su grupo de contenido", "home, product, catalog, brand, search, cart, checkout, thankyou, account, contact"],
      ["view_item", "Vista de ficha de producto", "ID, nombre, SKU, precio, categoría y marca del producto", "Track Product Views"],
      ["add_to_cart", "Clic en añadir al carrito", "El producto añadido", "Track Add to Cart; necesita los métodos de carrito estándar de OpenCart"],
      ["begin_checkout", "Vista de la página de checkout", "El paso de checkout", "Track Checkout"],
      ["purchase", "Página de confirmación del pedido", "Ingresos, moneda, método de pago, cupón y artículos con sus opciones", "Track Purchases; la conversión que lleva los ingresos"],
      ["Formulario de contacto", "Envío del formulario", "Una conversión de lead", "Opcional: Contact Forms as Leads"],
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
    body: "OpenCart conoce cada pedido. Una etiqueta con cookies solo conoce los de quienes aceptaron el banner y no bloquearon el script.",
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
      ["03", "Con varias tiendas, el hueco se multiplica", "Cada tienda de una instalación de OpenCart tiene su público y su comportamiento ante el banner. Una etiqueta con consentimiento pierde una parte distinta en cada una, y comparar tiendas por rendimiento de canal deja de ser fiable."],
    ],
  },

  method: {
    id: "method",
    tag: "Instalación en OpenCart",
    title: <>Sube la extensión.<br /><em>Instálala en Analytics.</em></>,
    body: (
      <>
        Los pasos son para OpenCart 4.x, la versión de referencia; OpenCart 3.x tiene
        su propia vía, que se indica en el segundo paso. El último paso es el que hace
        justa la comparación con los pedidos de OpenCart; el razonamiento es el mismo
        que en{" "}
        <Link className={link} href="/es/use-cases/single-source-of-truth/">una sola cifra para marketing y finanzas</Link>.
      </>
    ),
    howToName: "Cómo instalar Sealmetrics en OpenCart",
    howToDescription:
      "Cinco pasos para instalar analítica sin cookies en una tienda OpenCart 4.x, con la vía para OpenCart 3.x, y contrastarla con los pedidos de la propia OpenCart.",
    steps: [
      { name: "Descarga la extensión", text: "En el dashboard de Sealmetrics, abre Settings → Integrations y descarga el paquete de la extensión para OpenCart, sealmetrics.ocmod.zip. Necesita PHP 7.4 o posterior." },
      { name: "Súbela", text: "En OpenCart 4.x, ve a Extensions → Installer y sube sealmetrics.ocmod.zip. En OpenCart 3.x, sube en su lugar el contenido de la carpeta upload a la raíz de tu OpenCart, ve a Extensions → Modifications y pulsa Refresh." },
      { name: "Instálala y configúrala", text: "Ve a Extensions → Extensions → Analytics (Extensions → Analytics en 3.x), instala Sealmetrics Analytics y abre sus ajustes (Edit, en 4.x). Introduce tu Account ID, elige si quieres medir vistas de producto, añadidos al carrito, checkout y compras, define si quieres un dominio de píxel propio y los formularios de contacto como leads, y activa la extensión y guarda." },
      { name: "Prueba el funnel y una compra", text: "Abre un producto, añádelo al carrito, ve al checkout y comprueba que llegan los eventos. Haz un pedido de prueba y confirma que la compra aparece cuando carga la página de confirmación del pedido. Si no llega nada, comprueba que la extensión está activa con el Account ID correcto y vacía la caché de OpenCart en System → Maintenance." },
      { name: "Compara con los pedidos de OpenCart, tienda a tienda", text: "Los ID de pedido no se guardan fuera de OpenCart, así que compara totales y no filas: mismo periodo, zona horaria y moneda, y cada tienda por separado, porque cada una se configura y se mide por su cuenta." },
    ],
  },

  roles: {
    tag: "Qué se queda y qué cambia",
    title: <>No se arranca nada.<br /><em>Se mueve la decisión.</em></>,
    body: "Cada herramienta conserva el trabajo que hace bien. Sealmetrics asume el que no puede hacer una etiqueta con consentimiento: decirte qué canales produjeron los pedidos.",
    items: [
      { role: "Panel de OpenCart", need: "Se queda: la visión de pedidos y catálogo.", how: "Pedidos, productos, clientes y cupones siguen en OpenCart, y Sealmetrics se contrasta con sus totales de pedidos.", link: { label: "Una cifra para marketing y finanzas", href: "/es/use-cases/single-source-of-truth/" } },
      { role: "GA4", need: "Puede quedarse, para Google Ads.", how: "Muchos equipos lo mantienen como vía hacia Google Ads mientras las decisiones de presupuesto pasan a la base medida.", link: { label: "Sealmetrics frente a GA4", href: "/es/vs-ga4/" } },
      { role: "Píxeles de Meta y Google", need: "Se quedan para las pujas, con consentimiento.", how: "Sealmetrics no envía conversiones a las plataformas, así que estas mantienen su propia configuración sujeta a consentimiento.", link: { label: "Atribución de ingresos por campaña", href: "/es/use-cases/revenue-attribution/" } },
      { role: "Sealmetrics", need: "Pasa a ser la visión por canal.", how: "Ingresos por canal, campaña y creatividad en cada sesión registrada, por tienda, contrastados con los pedidos de OpenCart.", link: { label: "Datos completos", href: "/es/complete-data/" } },
    ],
  },

  proof: {
    tag: "El método, medido",
    body: "Todavía no hay publicado ningún caso de cliente en OpenCart, y esta página no finge lo contrario. El método de conciliación de arriba es el que usó Incapto en Shopify, donde las dos herramientas se contrastaron con pedidos reales antes de comparar nada.",
    figures: [
      { value: "96%", label: "de los pedidos reales registrados en la medición en paralelo de Incapto, 48 días, en Shopify", client: "Incapto · Shopify", href: "/es/case-studies/incapto/" },
      { value: "29%", label: "de las visitas reales que GA4 no registró en esa misma tienda", client: "Incapto · Shopify", href: "/es/case-studies/incapto/" },
      { value: "4", label: "eventos de funnel que envía la extensión de OpenCart, cada uno con su interruptor en los ajustes", client: "Documentación de la extensión", href: "/es/platforms/opencart/#method" },
    ],
    readCase: "Abrir",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Conoce los límites<br /><em>antes de comparar.</em></>,
    body: (
      <>
        La mayoría se derivan de que OpenCart confirma el pedido en el navegador. Para
        tiendas en las que un webhook confirma las compras en servidor, mira{" "}
        <Link className={link} href="/es/platforms/shopify/">Sealmetrics para Shopify</Link>.
      </>
    ),
    items: [
      ["La compra necesita la página de confirmación", "Las compras se envían cuando carga la página de confirmación del pedido. Si un método de pago nunca devuelve al comprador a esa página, esa compra no se registra."],
      ["OpenCart 4.x es la versión de referencia", "OpenCart 3.x está soportado con modificaciones y con otra vía de instalación. Prueba el funnel y una compra en una tienda 3.x antes de fiarte de las cifras."],
      ["Bloqueadores, sin dominio de píxel propio", "La dirección de píxel por defecto puede aparecer en listas de bloqueo. Definir un dominio de píxel propio mantiene las peticiones en tu dominio."],
      ["La conciliación es sobre totales", "Los ID de pedido no se guardan fuera de OpenCart, así que comparas totales y canales, nunca fila a fila. La documentación de OpenCart no describe protección frente a una página de confirmación recargada que cuente dos veces, así que revísalo al comparar."],
      ["Los carritos a medida hay que revisarlos", "La medición del añadido al carrito se apoya en los métodos de carrito estándar de OpenCart. Un tema o una extensión que los sustituya puede no enviar el evento."],
      ["Último clic por sesión", "Sin modelo multi-touch ni view-through; una visita posterior por otro canal se lleva el mérito."],
    ],
  },

  faqTag: "Preguntas frecuentes sobre OpenCart",
  faqTitle: <>Antes de instalar<br /><em>la extensión.</em></>,
  faq: [
    { question: "¿Cómo instalo Sealmetrics en OpenCart 4?", answer: "Descarga sealmetrics.ocmod.zip desde el dashboard de Sealmetrics en Settings → Integrations y súbelo en Extensions → Installer. Después ve a Extensions → Extensions → Analytics, instala Sealmetrics Analytics, pulsa Edit, introduce tu Account ID, activa la extensión y guarda." },
    { question: "¿La extensión funciona en OpenCart 3?", answer: "OpenCart 4.x tiene soporte principal; OpenCart 3.x está soportado con modificaciones. En 3.x subes el contenido de la carpeta upload a la raíz de tu OpenCart, refrescas Extensions → Modifications, instalas Sealmetrics Analytics en Extensions → Analytics e introduces tu Account ID. Necesita PHP 7.4 o posterior." },
    { question: "¿Puedo elegir qué eventos se miden?", answer: "Sí. Los ajustes tienen interruptores separados para vistas de producto, añadidos al carrito, checkout y compras, y una opción para medir los envíos de formularios de contacto como conversiones de lead. Las páginas vistas se miden automáticamente, cada una con un grupo de contenido tomado de la ruta de OpenCart." },
    { question: "¿Admite el modo multitienda de OpenCart?", answer: "Sí. En una instalación multitienda configuras Sealmetrics por separado para cada tienda, con Account IDs distintos si los necesitas, y cada tienda se mide de forma independiente." },
    { question: "¿Qué incluye el evento de compra?", answer: "El valor del pedido, la moneda, el método de pago y el cupón, y de cada artículo el ID, el nombre, el SKU, el precio, la cantidad, la categoría y la marca del producto, con las opciones elegidas, como la talla o el color, enviadas como propiedades." },
    { question: "¿Por qué falta una compra de OpenCart en Sealmetrics?", answer: "Comprueba que Track Purchases está activado, que la página de confirmación del pedido carga bien tras el pago, porque es ahí donde se envía la compra, y que no hay errores de JavaScript en la consola del navegador." },
    { question: "¿Por qué no se mide el añadido al carrito?", answer: "Comprueba que Track Add to Cart está activado y que el carrito de tu tienda usa los métodos estándar de OpenCart. Un tema o una extensión que sustituya el carrito puede no disparar el evento." },
    { question: "¿Tendré que cambiar mi banner de consentimiento?", answer: "No necesariamente por la analítica: la extensión no instala cookies ni recoge datos personales. Los píxeles publicitarios, los chats o el A/B testing que sí guardan datos siguen necesitando consentimiento, y que tu tienda quede exenta para la analítica depende de su configuración y de los criterios de tu autoridad nacional." },
  ],

  final: {
    tag: "Revisión en OpenCart",
    title: <>Instálalo en tu tienda.<br /><em>Ve los canales detrás de los pedidos.</em></>,
    body: "Reserva 30 minutos: repasamos la instalación de la extensión en tu versión de OpenCart, cómo probar el funnel y una compra, y cómo comparar Sealmetrics con tus pedidos tienda a tienda.",
    primary: { label: "Reservar una revisión en OpenCart", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
