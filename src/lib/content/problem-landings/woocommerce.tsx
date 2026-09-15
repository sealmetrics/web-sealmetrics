import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /platforms/woocommerce — Phase 3 of CONTENT-PLAN-PROBLEM-POSITIONING.md.
 *
 * Integration facts come from docs.sealmetrics.com/integrations/ecommerce/woocommerce
 * (checked 14 Sep 2026). Several statements on the old page had no support there
 * and are gone:
 * - the plugin is downloaded from the Sealmetrics dashboard, not "GitHub releases"
 * - the purchase is sent from the order confirmation page in the browser
 *   (sealmetrics.conv), not "a single async HTTP POST" server-side — which is
 *   the real difference from Shopify, where a webhook confirms the order
 * - specific hook names, WPML/Polylang testing with slug normalisation, and
 *   automatic blocks-vs-classic checkout detection do not appear in the docs
 * What the docs do say, and the old page omitted: automatic content groups,
 * brand detection from named plugins, variation attributes, AJAX add-to-cart,
 * duplicate prevention through order meta, and the troubleshooting checks.
 *
 * There is no published WooCommerce case. The proof block says so and uses the
 * Incapto figures explicitly labelled as a Shopify measurement.
 */

export const WOOCOMMERCE_PUBLISHED = "2026-05-29";
export const WOOCOMMERCE_MODIFIED = "2026-09-14";

const link = "sig-problem-inline";

export const woocommerceEn: ProblemLandingContent = {
  route: "/platforms/woocommerce",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Platforms", href: "/platforms/" },
    { label: "WooCommerce" },
  ],
  eyebrow: "Platform · WooCommerce",
  h1: <>WooCommerce records the order.<br />GA4 misses<br /><em>who brought it.</em></>,
  heroBody:
    "A consent-gated analytics tag loses the shoppers who reject the banner, and the channel behind their orders goes with them. The Sealmetrics plugin tracks the WooCommerce funnel from product view to purchase without writing a cookie or collecting customer data, and installs from your dashboard in a few minutes.",
  heroPrimary: { label: "See the install", href: "#method" },
  heroSecondary: { label: "Compare with Shopify", href: "/platforms/shopify/" },
  heroMicro: "WordPress 5.8+ · WooCommerce 6.0+ · PHP 7.4+ · no cookies · EU-hosted in Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: WOOCOMMERCE_MODIFIED,
    dateDisplay: "14 September 2026",
  },
  module: {
    title: "What the plugin sends",
    status: "Aggregate events",
    rows: [
      ["view_item", "Product, SKU, price, brand"],
      ["add_to_cart", "Variation attributes, quantity"],
      ["begin_checkout", "Cart total, item count"],
      ["purchase", "Revenue, payment method, coupon"],
    ],
    foot: "No customer name, email or address · no order ID stored outside WooCommerce",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Sealmetrics for WooCommerce is a WordPress plugin that adds cookieless
      analytics to a WooCommerce store. It tracks product views, add-to-cart,
      checkout starts and purchases, groups pages by type automatically and
      captures product brands and variation attributes, without setting a cookie
      or collecting customer data. You download it from the Sealmetrics
      dashboard, upload it in WordPress and paste your Account ID. The purchase
      is sent from the order confirmation page with its revenue, currency,
      payment method, coupon and items, and the plugin marks each order so a
      refreshed thank-you page is not counted twice. Order IDs are not stored
      outside WooCommerce, so reconciliation is done on totals and channels.
      Because the purchase depends on the confirmation page loading, a
      first-party pixel domain helps where ad blockers are common.
    </p>
  ),

  divergence: {
    tag: "What it captures",
    title: <>The whole funnel.<br /><em>No custom events.</em></>,
    body: "Activated with an Account ID, the plugin sends the standard eCommerce funnel and sets a content group on every page, with no theme edits.",
    headers: ["Event", "When it fires", "What it carries", "Note"],
    rows: [
      ["pageview", "Every page", "The page, its channel and its content group", "Group set by page type: catalog, product, cart, checkout, thankyou, account"],
      ["view_item", "Single product page", "Product name, ID, SKU, price, currency, category, brand", "Brands from YITH WooCommerce Brands, Perfect Brands, WooCommerce Brands or a product_brand taxonomy"],
      ["add_to_cart", "Standard buttons, AJAX add to cart, variable product forms, quantity changes", "Product, SKU, price, quantity, currency, variation attributes", "Every selected attribute, such as size and colour"],
      ["begin_checkout", "Checkout", "Cart total, currency, item count", "The step before payment"],
      ["purchase", "Order confirmation page", "Revenue, currency, payment method, coupon, items", "Order meta prevents duplicates when the page is refreshed"],
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
    body: "WooCommerce knows every order. A cookie-based tag only knows the ones placed by visitors who accepted the banner and were not blocked.",
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
      ["02", "The loss is uneven by channel", "Channels that bring new people in lose more visits to the banner than direct does, so a consent-based channel report tilts toward traffic you already had."],
      ["03", "Stacked analytics plugins disagree", "Several analytics plugins on one WordPress site can conflict, which is one of the first things to rule out when a purchase goes missing. Keep one measurement layer for decisions."],
    ],
  },

  method: {
    id: "method",
    tag: "Install on WooCommerce",
    title: <>Upload the plugin.<br /><em>Paste one ID.</em></>,
    body: (
      <>
        One install path, no theme edits. The last two steps make the comparison
        with WooCommerce fair; the reasoning is the same as in{" "}
        <Link className={link} href="/use-cases/single-source-of-truth/">one number for marketing and finance</Link>.
      </>
    ),
    howToName: "How to install Sealmetrics on WooCommerce",
    howToDescription:
      "Five steps to install cookieless analytics on a WooCommerce store and check it against WooCommerce's own orders.",
    steps: [
      { name: "Download the plugin", text: "In the Sealmetrics dashboard, open Settings → Integrations and download the WooCommerce plugin as a ZIP file." },
      { name: "Upload and activate it", text: "In WordPress, go to Plugins → Add New → Upload Plugin, choose the ZIP, click Install Now and then Activate. It needs WordPress 5.8+, WooCommerce 6.0+ and PHP 7.4+." },
      { name: "Enter your Account ID", text: "Open Settings → Sealmetrics and paste your Account ID, which is your Site ID from Settings → Sites in the dashboard. Optionally set a custom pixel domain for first-party tracking, then save." },
      { name: "Clear the cache and test the funnel", text: "Clear any WordPress cache, open a product, add it to the cart and check the events arrive. Place a test order and confirm the purchase appears once the order is processing or completed." },
      { name: "Compare with WooCommerce's orders", text: "Compare totals for the same period, in the same timezone and currency, and leave out orders with no web visit behind them, such as manual or phone orders." },
    ],
  },

  roles: {
    tag: "What stays, what changes",
    title: <>Nothing is ripped out.<br /><em>The decision moves.</em></>,
    body: "Each tool keeps the job it does well. Sealmetrics takes the one a consent-gated tag cannot do: telling you which channels produced the orders.",
    items: [
      { role: "WooCommerce reports", need: "Stay: the order and product view.", how: "Sales, products and coupons stay in WooCommerce, and Sealmetrics is checked against its order totals.", link: { label: "One number for marketing and finance", href: "/use-cases/single-source-of-truth/" } },
      { role: "Google Analytics plugin", need: "Can stay, for Google Ads.", how: "Many teams keep it as the Google Ads conduit while budget decisions move to the measured base.", link: { label: "GA4 migration plan", href: "/use-cases/ga4-migration/" } },
      { role: "Meta and Google pixels", need: "Stay for bidding, behind consent.", how: "Sealmetrics does not send conversions to ad platforms, so the platforms keep their own consent-gated setup.", link: { label: "Campaign revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "Sealmetrics", need: "Becomes the channel view.", how: "Revenue by channel, campaign and creative on every recorded session, checked against WooCommerce's orders.", link: { label: "Complete data", href: "/complete-data/" } },
    ],
  },

  proof: {
    tag: "The method, measured",
    body: "No WooCommerce customer case is published yet, and this page does not pretend otherwise. The reconciliation method above is the one Incapto used on Shopify, where both tools were checked against real orders before anything was compared.",
    figures: [
      { value: "96%", label: "of real orders recorded in Incapto's 48-day parallel run, on Shopify", client: "Incapto · Shopify", href: "/case-studies/incapto/" },
      { value: "29%", label: "of real visits that GA4 did not record on the same store", client: "Incapto · Shopify", href: "/case-studies/incapto/" },
      { value: "5", label: "funnel events the WooCommerce plugin sends with no custom setup", client: "Plugin documentation", href: "/platforms/woocommerce/#method" },
    ],
    readCase: "Open",
  },

  limits: {
    tag: "What it does not do",
    title: <>Know the edges<br /><em>before you compare.</em></>,
    body: (
      <>
        Most of these follow from how WooCommerce confirms an order. For stores
        where a webhook confirms purchases server-side, see{" "}
        <Link className={link} href="/platforms/shopify/">Sealmetrics for Shopify</Link>.
      </>
    ),
    items: [
      ["The purchase needs the confirmation page", "Purchases are sent when the order confirmation page loads. If a payment gateway never returns the shopper there, that purchase is not recorded."],
      ["Ad blockers, without a first-party domain", "The default pixel address can appear on blocklists. Setting the custom pixel domain keeps the requests on your own domain."],
      ["Reconciliation is on totals", "Order IDs are not stored outside WooCommerce, so you compare totals and channels, never row by row."],
      ["Background renewals are not tracked", "Subscription renewals charged without the shopper visiting the confirmation page send no purchase event."],
      ["Order status matters", "When a test purchase is missing, check that the order is processing or completed and that no other analytics plugin is interfering."],
      ["Last click per session", "No multi-touch model and no view-through; a returning visit through another channel takes the credit."],
    ],
  },

  faqTag: "Common WooCommerce questions",
  faqTitle: <>Before you install<br /><em>the plugin.</em></>,
  faq: [
    { question: "How do I install Sealmetrics on WooCommerce?", answer: "Download the WooCommerce plugin from the Sealmetrics dashboard under Settings → Integrations, upload it in WordPress under Plugins → Add New → Upload Plugin, activate it, and paste your Account ID in Settings → Sealmetrics. It needs WordPress 5.8+, WooCommerce 6.0+ and PHP 7.4+." },
    { question: "How is the Sealmetrics plugin different from the WooCommerce Google Analytics plugin?", answer: "The Google Analytics plugin sends data to GA4, which relies on cookies and consent, so shoppers who reject the banner are not recorded. The Sealmetrics plugin sets no cookie and collects no customer data. The two can run side by side: many stores keep the Google Analytics plugin for Google Ads and use Sealmetrics for channel and revenue decisions." },
    { question: "Why is a WooCommerce purchase missing in Sealmetrics?", answer: "Check that the order confirmation page loads after payment, because that is where the purchase is sent. Then check that the order status is processing or completed, that no other analytics plugin is conflicting, and clear any WordPress cache before testing again." },
    { question: "Does Sealmetrics count a purchase twice if the thank-you page is refreshed?", answer: "No. The plugin records in the order's meta data that the conversion was sent, so refreshing or revisiting the thank-you page does not send the purchase again." },
    { question: "Does the plugin capture variable products and brands?", answer: "Yes. Every selected variation attribute, such as size or colour, is captured with add-to-cart and purchase events, and brands are detected from YITH WooCommerce Brands, Perfect Brands for WooCommerce, WooCommerce Brands or a custom product_brand taxonomy." },
    { question: "Does it track WooCommerce subscription renewals?", answer: "The first subscription order is tracked like any purchase, on the confirmation page. Renewals charged in the background, without the customer visiting the store, have no confirmation page and send no purchase event; report them from your subscription tool." },
    { question: "Does the plugin slow down my WooCommerce site?", answer: "The tracker is about 1.1 KB on the wire and loads asynchronously, roughly 132 times lighter than GA4's tag, so its footprint is a small fraction of the Google Analytics and tag manager stack it usually replaces." },
    { question: "Will I need to change my consent banner?", answer: "Not necessarily for the analytics: the plugin sets no cookie and stores nothing on the device. Ad pixels, A/B testing or chat tools that do store data still need consent, and whether your store is exempt for analytics depends on its configuration and your national authority's criteria." },
  ],

  final: {
    tag: "WooCommerce walkthrough",
    title: <>Install on your store.<br /><em>See the channels behind the orders.</em></>,
    body: "Book 30 minutes with the founder. We install the plugin on your WooCommerce store, test the funnel and a purchase, and set up the comparison with your orders.",
    primary: { label: "Book a WooCommerce walkthrough", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const woocommerceEs: ProblemLandingContent = {
  route: "/platforms/woocommerce",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Plataformas", href: "/es/platforms/" },
    { label: "WooCommerce" },
  ],
  eyebrow: "Plataforma · WooCommerce",
  h1: <>WooCommerce registra el pedido.<br />GA4 pierde<br /><em>quién lo trajo.</em></>,
  heroBody:
    "Una etiqueta de analítica que espera al consentimiento pierde a los compradores que rechazan el banner, y con ellos el canal que hay detrás de sus pedidos. El plugin de Sealmetrics mide el funnel de WooCommerce desde la ficha de producto hasta la compra sin escribir cookies ni recoger datos de clientes, y se instala desde tu dashboard en pocos minutos.",
  heroPrimary: { label: "Ver la instalación", href: "#method" },
  heroSecondary: { label: "Comparar con Shopify", href: "/es/platforms/shopify/" },
  heroMicro: "WordPress 5.8+ · WooCommerce 6.0+ · PHP 7.4+ · sin cookies · alojado en Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    // The Spanish page is new: this date is its publication, not a revision.
    updatedLabel: "Publicado",
    date: WOOCOMMERCE_MODIFIED,
    dateDisplay: "14 de septiembre de 2026",
  },
  module: {
    title: "Lo que envía el plugin",
    status: "Eventos agregados",
    rows: [
      ["view_item", "Producto, SKU, precio, marca"],
      ["add_to_cart", "Atributos de variación, cantidad"],
      ["begin_checkout", "Total del carrito, nº de artículos"],
      ["purchase", "Ingresos, método de pago, cupón"],
    ],
    foot: "Sin nombre, email ni dirección del cliente · sin ID de pedido fuera de WooCommerce",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      Sealmetrics para WooCommerce es un plugin de WordPress que añade analítica
      sin cookies a una tienda WooCommerce. Mide vistas de producto, añadidos al
      carrito, inicios de checkout y compras, agrupa las páginas por tipo
      automáticamente y recoge la marca y los atributos de variación de los
      productos, sin instalar cookies ni recoger datos de clientes. Lo descargas
      desde el dashboard de Sealmetrics, lo subes en WordPress y pegas tu Account
      ID. La compra se envía desde la página de confirmación del pedido con sus
      ingresos, moneda, método de pago, cupón y artículos, y el plugin marca cada
      pedido para que recargar la página de gracias no lo cuente dos veces. Los ID
      de pedido no se guardan fuera de WooCommerce, así que la conciliación se hace
      sobre totales y canales. Como la compra depende de que cargue la página de
      confirmación, un dominio de píxel propio ayuda donde abundan los ad-blockers.
    </p>
  ),

  divergence: {
    tag: "Qué captura",
    title: <>Todo el funnel.<br /><em>Sin eventos a medida.</em></>,
    body: "Activado con un Account ID, el plugin envía el funnel estándar de eCommerce y asigna un grupo de contenido a cada página, sin tocar el tema.",
    headers: ["Evento", "Cuándo se dispara", "Qué lleva", "Nota"],
    rows: [
      ["pageview", "En cada página", "La página, su canal y su grupo de contenido", "Grupo según el tipo de página: catalog, product, cart, checkout, thankyou, account"],
      ["view_item", "Ficha de producto", "Nombre, ID, SKU, precio, moneda, categoría y marca del producto", "Marcas de YITH WooCommerce Brands, Perfect Brands, WooCommerce Brands o una taxonomía product_brand"],
      ["add_to_cart", "Botones estándar, añadir al carrito por AJAX, formularios de productos variables, cambios de cantidad", "Producto, SKU, precio, cantidad, moneda y atributos de variación", "Todos los atributos elegidos, como talla y color"],
      ["begin_checkout", "Checkout", "Total del carrito, moneda y número de artículos", "El paso previo al pago"],
      ["purchase", "Página de confirmación del pedido", "Ingresos, moneda, método de pago, cupón y artículos", "La meta del pedido evita duplicados al recargar la página"],
    ],
    note: (
      <>
        Los pasos de producto, carrito y checkout son{" "}
        <Link className={link} href="/es/glossary/event-tracking/">eventos</Link> de un
        funnel; la compra es la conversión que lleva los ingresos. Cómo se atribuyen
        a canal y campaña se explica en{" "}
        <Link className={link} href="/es/use-cases/revenue-attribution/">atribución de ingresos sin cookies</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que pierde una configuración con consentimiento",
    title: <>El pedido queda registrado.<br /><em>Su canal, no.</em></>,
    body: "WooCommerce conoce cada pedido. Una etiqueta con cookies solo conoce los de quienes aceptaron el banner y no bloquearon el script.",
    items: [
      ["01", "Quien rechaza se lleva su canal", (
        <>
          En la única tienda que hemos medido en paralelo —una tienda Shopify—, GA4
          no registró el 29% de las visitas. El mecanismo no depende de la
          plataforma: una etiqueta que espera al consentimiento nunca ve al visitante
          que dice que no. El argumento completo está en{" "}
          <Link className={link} href="/es/complete-data/">datos completos</Link>.
        </>
      )],
      ["02", "La pérdida es desigual por canal", "Los canales que traen gente nueva pierden más visitas por el banner que el tráfico directo, así que un informe por canal basado en consentimiento se inclina hacia el tráfico que ya tenías."],
      ["03", "Los plugins de analítica apilados no coinciden", "Varios plugins de analítica en un mismo WordPress pueden entrar en conflicto, y es de lo primero que hay que descartar cuando falta una compra. Mantén una sola capa de medición para decidir."],
    ],
  },

  method: {
    id: "method",
    tag: "Instalación en WooCommerce",
    title: <>Sube el plugin.<br /><em>Pega un ID.</em></>,
    body: (
      <>
        Un único camino de instalación, sin tocar el tema. Los dos últimos pasos son
        los que hacen justa la comparación con WooCommerce; el razonamiento es el
        mismo que en{" "}
        <Link className={link} href="/es/use-cases/single-source-of-truth/">una sola cifra para marketing y finanzas</Link>.
      </>
    ),
    howToName: "Cómo instalar Sealmetrics en WooCommerce",
    howToDescription:
      "Cinco pasos para instalar analítica sin cookies en una tienda WooCommerce y contrastarla con los pedidos de la propia WooCommerce.",
    steps: [
      { name: "Descarga el plugin", text: "En el dashboard de Sealmetrics, abre Settings → Integrations y descarga el plugin de WooCommerce en un archivo ZIP." },
      { name: "Súbelo y actívalo", text: "En WordPress, ve a Plugins → Añadir nuevo → Subir plugin, elige el ZIP, pulsa Instalar ahora y después Activar. Necesita WordPress 5.8+, WooCommerce 6.0+ y PHP 7.4+." },
      { name: "Introduce tu Account ID", text: "Abre Ajustes → Sealmetrics y pega tu Account ID, que es el Site ID de Settings → Sites en el dashboard. Si quieres, define un dominio de píxel propio para el tracking first-party, y guarda." },
      { name: "Vacía la caché y prueba el funnel", text: "Vacía la caché de WordPress, abre un producto, añádelo al carrito y comprueba que llegan los eventos. Haz un pedido de prueba y confirma que la compra aparece cuando el pedido está en procesamiento o completado." },
      { name: "Compara con los pedidos de WooCommerce", text: "Compara totales del mismo periodo, en la misma zona horaria y moneda, y deja fuera los pedidos sin visita web detrás, como los manuales o telefónicos." },
    ],
  },

  roles: {
    tag: "Qué se queda y qué cambia",
    title: <>No se arranca nada.<br /><em>Se mueve la decisión.</em></>,
    body: "Cada herramienta conserva el trabajo que hace bien. Sealmetrics asume el que no puede hacer una etiqueta con consentimiento: decirte qué canales produjeron los pedidos.",
    items: [
      { role: "Informes de WooCommerce", need: "Se quedan: la visión de pedidos y productos.", how: "Ventas, productos y cupones siguen en WooCommerce, y Sealmetrics se contrasta con sus totales de pedidos.", link: { label: "Una cifra para marketing y finanzas", href: "/es/use-cases/single-source-of-truth/" } },
      { role: "Plugin de Google Analytics", need: "Puede quedarse, para Google Ads.", how: "Muchos equipos lo mantienen como vía hacia Google Ads mientras las decisiones de presupuesto pasan a la base medida.", link: { label: "Sealmetrics frente a GA4", href: "/es/vs-ga4/" } },
      { role: "Píxeles de Meta y Google", need: "Se quedan para las pujas, con consentimiento.", how: "Sealmetrics no envía conversiones a las plataformas, así que estas mantienen su propia configuración sujeta a consentimiento.", link: { label: "Atribución de ingresos por campaña", href: "/es/use-cases/revenue-attribution/" } },
      { role: "Sealmetrics", need: "Pasa a ser la visión por canal.", how: "Ingresos por canal, campaña y creatividad en cada sesión registrada, contrastados con los pedidos de WooCommerce.", link: { label: "Datos completos", href: "/es/complete-data/" } },
    ],
  },

  proof: {
    tag: "El método, medido",
    body: "Todavía no hay publicado ningún caso de cliente en WooCommerce, y esta página no finge lo contrario. El método de conciliación de arriba es el que usó Incapto en Shopify, donde las dos herramientas se contrastaron con pedidos reales antes de comparar nada.",
    figures: [
      { value: "96%", label: "de los pedidos reales registrados en la medición en paralelo de Incapto, 48 días, en Shopify", client: "Incapto · Shopify", href: "/es/case-studies/incapto/" },
      { value: "29%", label: "de las visitas reales que GA4 no registró en esa misma tienda", client: "Incapto · Shopify", href: "/es/case-studies/incapto/" },
      { value: "5", label: "eventos de funnel que envía el plugin de WooCommerce sin configuración a medida", client: "Documentación del plugin", href: "/es/platforms/woocommerce/#method" },
    ],
    readCase: "Abrir",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Conoce los límites<br /><em>antes de comparar.</em></>,
    body: (
      <>
        La mayoría se derivan de cómo confirma WooCommerce un pedido. Para tiendas en
        las que un webhook confirma las compras en servidor, mira{" "}
        <Link className={link} href="/es/platforms/shopify/">Sealmetrics para Shopify</Link>.
      </>
    ),
    items: [
      ["La compra necesita la página de confirmación", "Las compras se envían cuando carga la página de confirmación del pedido. Si una pasarela de pago nunca devuelve al comprador a esa página, esa compra no se registra."],
      ["Ad-blockers, sin dominio first-party", "La dirección de píxel por defecto puede aparecer en listas de bloqueo. Definir el dominio de píxel propio mantiene las peticiones en tu dominio."],
      ["La conciliación es sobre totales", "Los ID de pedido no se guardan fuera de WooCommerce, así que comparas totales y canales, nunca fila a fila."],
      ["Las renovaciones en segundo plano no se miden", "Las renovaciones de suscripción que se cobran sin que el comprador visite la página de confirmación no envían evento de compra."],
      ["El estado del pedido importa", "Si falta una compra de prueba, comprueba que el pedido esté en procesamiento o completado y que ningún otro plugin de analítica interfiere."],
      ["Último clic por sesión", "Sin modelo multi-touch ni view-through; una visita posterior por otro canal se lleva el mérito."],
    ],
  },

  faqTag: "Preguntas frecuentes sobre WooCommerce",
  faqTitle: <>Antes de instalar<br /><em>el plugin.</em></>,
  faq: [
    { question: "¿Cómo instalo Sealmetrics en WooCommerce?", answer: "Descarga el plugin de WooCommerce desde el dashboard de Sealmetrics en Settings → Integrations, súbelo en WordPress en Plugins → Añadir nuevo → Subir plugin, actívalo y pega tu Account ID en Ajustes → Sealmetrics. Necesita WordPress 5.8+, WooCommerce 6.0+ y PHP 7.4+." },
    { question: "¿En qué se diferencia el plugin de Sealmetrics del plugin de Google Analytics para WooCommerce?", answer: "El plugin de Google Analytics envía datos a GA4, que depende de cookies y consentimiento, así que quien rechaza el banner no queda registrado. El plugin de Sealmetrics no instala cookies ni recoge datos de clientes. Los dos pueden convivir: muchas tiendas mantienen el de Google Analytics para Google Ads y usan Sealmetrics para las decisiones de canal e ingresos." },
    { question: "¿Por qué falta una compra de WooCommerce en Sealmetrics?", answer: "Comprueba que la página de confirmación del pedido carga tras el pago, porque es ahí donde se envía la compra. Después verifica que el estado del pedido sea en procesamiento o completado, que ningún otro plugin de analítica entra en conflicto y vacía la caché de WordPress antes de volver a probar." },
    { question: "¿Sealmetrics cuenta dos veces una compra si se recarga la página de gracias?", answer: "No. El plugin anota en la meta del pedido que la conversión ya se envió, así que recargar o volver a la página de gracias no vuelve a enviar la compra." },
    { question: "¿El plugin recoge productos variables y marcas?", answer: "Sí. Cada atributo de variación elegido, como talla o color, se envía con los eventos de añadir al carrito y de compra, y la marca se detecta desde YITH WooCommerce Brands, Perfect Brands for WooCommerce, WooCommerce Brands o una taxonomía product_brand propia." },
    { question: "¿Mide las renovaciones de suscripciones de WooCommerce?", answer: "El primer pedido de la suscripción se mide como cualquier compra, en la página de confirmación. Las renovaciones que se cobran en segundo plano, sin que el cliente visite la tienda, no tienen página de confirmación y no envían evento de compra; repórtalas desde tu herramienta de suscripciones." },
    { question: "¿El plugin ralentiza mi tienda WooCommerce?", answer: "El tracker pesa alrededor de 1,1 KB en red y carga de forma asíncrona, unas 132 veces menos que la etiqueta de GA4, así que su impacto es una fracción pequeña del conjunto de Google Analytics y gestor de etiquetas al que suele sustituir." },
    { question: "¿Tendré que cambiar mi banner de consentimiento?", answer: "No necesariamente por la analítica: el plugin no instala cookies ni guarda nada en el dispositivo. Los píxeles publicitarios, el A/B testing o los chats que sí guardan datos siguen necesitando consentimiento, y que tu tienda quede exenta para la analítica depende de su configuración y de los criterios de tu autoridad nacional." },
  ],

  final: {
    tag: "Revisión en WooCommerce",
    title: <>Instálalo en tu tienda.<br /><em>Ve los canales detrás de los pedidos.</em></>,
    body: "Reserva 30 minutos con el founder. Instalamos el plugin en tu tienda WooCommerce, probamos el funnel y una compra, y dejamos preparada la comparación con tus pedidos.",
    primary: { label: "Reservar una revisión en WooCommerce", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
