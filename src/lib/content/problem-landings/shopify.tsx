import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /platforms/shopify — Phase 3 of CONTENT-PLAN-PROBLEM-POSITIONING.md.
 *
 * Uses the problem-landing template because a platform page answers the same
 * sequence: what goes wrong on this platform, what the integration captures,
 * how to install it, and what it does not do.
 *
 * Integration facts come from docs.sealmetrics.com/integrations/ecommerce/shopify
 * (checked 14 Sep 2026): Pixel app + "Sealmetrics Analytics" app embed, the five
 * events and their sources (the checkout event is `begin_checkout`, not
 * `initiate_checkout` as the old page said), purchase from the orders/create
 * webhook, order IDs not stored, orders not backfilled while the webhook is
 * unregistered, themes bypassing /cart/add may not be detected, Shopify Managed
 * Pricing for public-app stores, mandatory GDPR webhooks. The old page's claim
 * about daily ECB currency conversion has no source in the docs and is gone.
 *
 * Figures: Incapto, the one named Shopify case (src/lib/content/case-studies.tsx).
 */

export const SHOPIFY_PUBLISHED = "2026-05-29";
export const SHOPIFY_MODIFIED = "2026-09-14";

const link = "sig-problem-inline";

export const shopifyEn: ProblemLandingContent = {
  route: "/platforms/shopify",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Platforms", href: "/platforms/" },
    { label: "Shopify" },
  ],
  eyebrow: "Platform · Shopify",
  h1: <>Shopify knows every order.<br />GA4 misses<br /><em>the traffic behind them.</em></>,
  heroBody:
    "On Incapto's Shopify store, GA4 did not record 29% of visits over 48 days, and the visitors it missed browsed twice as deep. Sealmetrics installs as a Shopify app and a theme app embed on any plan, confirms every purchase server-side through Shopify's webhook, and recorded 96% of Incapto's real online-store orders.",
  heroPrimary: { label: "See the install", href: "#method" },
  heroSecondary: { label: "Read the Incapto case", href: "/case-studies/incapto/" },
  heroMicro: "Any plan with app embeds · no cookies · purchases by webhook · EU-hosted in Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: SHOPIFY_MODIFIED,
    dateDisplay: "14 September 2026",
  },
  module: {
    title: "Incapto · Shopify · 48 days",
    status: "Measured",
    rows: [
      ["Real orders recorded", "96%"],
      ["Real revenue recorded", "97%"],
      ["Visits GA4 did not record", "29%"],
      ["Pageviews GA4 did not record", "45%"],
    ],
    foot: "Online Store orders only · GA4 + Consent Mode vs Sealmetrics · 14 Jun–31 Jul 2026",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Sealmetrics for Shopify is a cookieless analytics integration in two
      parts: the Sealmetrics Pixel app, which connects the store by OAuth and
      registers Shopify&apos;s orders/create webhook, and a theme app embed that
      loads the tracker and fires product, cart and checkout events. It works on
      any Shopify plan that allows app embeds. Because purchases arrive
      server-side from the webhook, they do not depend on a thank-you page
      loading or on the shopper accepting cookies, and nothing is stored on the
      shopper&apos;s device. On Incapto&apos;s Shopify store, measured side by
      side with GA4 for 48 days, Sealmetrics recorded 96% of real online-store
      orders and 97% of revenue, while GA4 did not record 29% of visits. Order
      IDs are not stored, so reconciliation with Shopify is done on totals and
      channels, not order by order.
    </p>
  ),

  divergence: {
    tag: "What it captures",
    title: <>Five events.<br /><em>No event configuration.</em></>,
    body: "Once the app embed is active and the webhook is registered, the funnel flows on its own. The purchase is the one event that never depends on the browser.",
    headers: ["Event", "Source", "What it carries", "Note"],
    rows: [
      ["pageview", "Tracker (t.js)", "The page, its channel and landing page", "Every page load"],
      ["view_product", "App embed, on /products/ pages", "Product name, SKU, price, currency, product ID", "Read from the product's structured data; re-fires on SPA navigation"],
      ["add_to_cart", "App embed, intercepting /cart/add", "Product, SKU, price, quantity, currency", "One event per line item"],
      ["begin_checkout", "App embed, on checkout submit, checkout links or Buy Now", "Cart URL", "Once per checkout attempt"],
      ["purchase", "Shopify orders/create webhook, server-side", "Revenue, currency, line items", "Nothing has to load on Shopify's hosted checkout"],
    ],
    note: (
      <>
        Product, cart and checkout steps are{" "}
        <Link className={link} href="/glossary/event-tracking/">events</Link> that
        build the{" "}
        <Link className={link} href="/glossary/funnel/">funnel</Link>; the purchase
        is the conversion that carries revenue. How events and purchases are
        modelled beyond Shopify is covered in{" "}
        <Link className={link} href="/use-cases/conversion-tracking/">conversion tracking without cookies</Link>.
      </>
    ),
  },

  costs: {
    tag: "What GA4 misses on Shopify",
    title: <>The orders are real.<br /><em>The channel picture is not.</em></>,
    body: "Shopify records every order it takes. What it cannot tell you is which traffic produced them, and GA4 only sees the visitors who accepted the banner.",
    items: [
      ["01", "A third of the traffic supports no decision", "Put back on the real scale, Incapto's GA4 view had a 19% hole of traffic it never measured, plus 11% with no known origin: close to a third of real traffic that could not inform a budget decision."],
      ["02", "The missing visitors browse most", "The visits GA4 did not record averaged 3.3 pages each, against 1.6 for the visits it did record. The loss is concentrated in the most engaged traffic, not spread evenly."],
      ["03", "Paid and social look smaller than they are", "GA4 put paid campaigns at 50% of Incapto's traffic; measured without consent loss they were 62%. Organic social showed 133% more traffic in Sealmetrics than in GA4."],
    ],
  },

  method: {
    id: "method",
    tag: "Install on Shopify",
    title: <>Connect the app.<br /><em>Enable the embed.</em></>,
    body: (
      <>
        One install path for every Shopify plan that allows app embeds, with no
        Plus or Standard distinction. The last two steps are what make the
        comparison with Shopify fair; the reasoning is the same as in{" "}
        <Link className={link} href="/use-cases/single-source-of-truth/">one number for marketing and finance</Link>.
      </>
    ),
    howToName: "How to install Sealmetrics on Shopify",
    howToDescription:
      "Five steps to install cookieless analytics on a Shopify store and check it against Shopify's own orders.",
    steps: [
      { name: "Connect the store", text: "In the Sealmetrics dashboard, open Settings → Integrations → Shopify, select the site, enter your Shopify domain and click Connect Shopify. Authorise the Sealmetrics Pixel app; the conversion webhook is registered automatically." },
      { name: "Enable the app embed", text: "Copy your Account ID from the connected Shopify card. In Shopify, open the theme editor, go to App embeds, enable Sealmetrics Analytics, paste the Account ID and save. The embed does nothing while the field is empty." },
      { name: "Check the tracker and a test order", text: "Load the store and confirm the Last hit timestamp moves in the Overview report. Then place a real test order, note its time and amount, and confirm the purchase appears as a conversion." },
      { name: "Compare like with like", text: "Compare Sealmetrics with Shopify's Online Store orders only, in the same timezone and currency. Leave out point-of-sale, draft and marketplace orders, and orders that were cancelled, refunded or never paid." },
      { name: "Run it next to GA4", text: "Leave GA4 and the ad pixels in place and compare over a full commercial cycle. Incapto's comparison covered 48 days before looking at the channel mix." },
    ],
  },

  roles: {
    tag: "What stays, what changes",
    title: <>Nothing is ripped out.<br /><em>The decision moves.</em></>,
    body: "Each tool keeps the job it does well. Sealmetrics takes the one GA4 cannot do on consent-shaped data: telling you which channels produced the orders.",
    items: [
      { role: "Shopify Analytics", need: "Stays: the merchandising view.", how: "Which products, collections and discount codes sell. Sealmetrics does not replace it and reconciles against its orders.", link: { label: "One number for marketing and finance", href: "/use-cases/single-source-of-truth/" } },
      { role: "GA4", need: "Can stay, for Google Ads.", how: "Many teams keep it as the Google Ads conduit while budget decisions move to the measured base.", link: { label: "GA4 migration plan", href: "/use-cases/ga4-migration/" } },
      { role: "Meta and Google pixels", need: "Stay for bidding, behind consent.", how: "Sealmetrics does not send conversions to ad platforms, so the platforms keep their own consent-gated setup.", link: { label: "Campaign revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "Sealmetrics", need: "Becomes the channel view.", how: "Revenue by channel, campaign and creative on every recorded session, checked against Shopify's orders.", link: { label: "Complete data", href: "/complete-data/" } },
    ],
  },

  proof: {
    tag: "Measured on Shopify",
    quote: {
      text: "Consent Mode left us with a structural blind spot: we knew there was traffic we were not seeing, but we had no way to size it.",
      cite: "Rosa Tomàs · B2C Acquisition Manager · Incapto",
      person: "Rosa Tomàs",
      role: "B2C Acquisition Manager, Incapto",
    },
    body: "Incapto sells specialty coffee on Shopify. It ran GA4 and Sealmetrics on the same store for the same days, reconciled both against Shopify's orders first, and only then compared traffic and channels.",
    figures: [
      { value: "96%", label: "of real Online Store orders recorded, and 97% of revenue", client: "Incapto", href: "/case-studies/incapto/" },
      { value: "29%", label: "of real visits that appeared in no GA4 report", client: "Incapto", href: "/case-studies/incapto/" },
      { value: "12 pts", label: "gap in paid campaigns' share of traffic, 50% in GA4 against 62%", client: "Incapto", href: "/case-studies/incapto/" },
    ],
    readCase: "Read the case",
  },

  limits: {
    tag: "What it does not do",
    title: <>Built for the channel view.<br /><em>Not for everything.</em></>,
    body: (
      <>
        These limits come with the design, and with Shopify itself. The same
        pattern for WordPress stores is on{" "}
        <Link className={link} href="/platforms/woocommerce/">Sealmetrics for WooCommerce</Link>.
      </>
    ),
    items: [
      ["Reconciliation is on totals", "Order IDs are not stored, so you compare totals and channels with Shopify, never row by row."],
      ["Custom carts can hide add-to-cart", "The embed listens to Shopify's standard /cart/add requests. Heavily customised themes that bypass them may not report add_to_cart."],
      ["Webhook gaps are not backfilled", "Orders placed while the webhook was not registered — after a reinstall or a scope change — are not recovered. Reconnect from the dashboard."],
      ["Online Store orders only", "Point-of-sale, draft and marketplace orders have no web session, so they have no channel to attribute."],
      ["Last click per session", "No multi-touch model and no view-through; a returning visit through another channel takes the credit."],
      ["It does not replace Shopify Analytics", "Product, collection and discount reporting stay in Shopify, where the merchandising team already works."],
    ],
  },

  faqTag: "Common Shopify questions",
  faqTitle: <>Before you install<br /><em>on your store.</em></>,
  faq: [
    { question: "Does Sealmetrics work on Shopify Basic or only on Shopify Plus?", answer: "On any Shopify plan that allows app embeds, with no Plus or Standard distinction. You connect the Sealmetrics Pixel app from the Sealmetrics dashboard, enable the Sealmetrics Analytics app embed in your theme and paste your Account ID. The install and the events are the same on every plan." },
    { question: "How does Sealmetrics reconcile with Shopify?", answer: "At the aggregate level, against Shopify's own Online Store orders for the same period. In Incapto's 48-day parallel run, Sealmetrics recorded 96% of real orders and 97% of revenue. Order IDs are not stored, by design, so the comparison is on totals and channels rather than a row-by-row join." },
    { question: "Why don't my Sealmetrics orders match Shopify's reports?", answer: "On Shopify, purchases come from the orders/create webhook, so a thank-you page that fails to load is not the cause. Check that the store shows Connected, that the Shopify figure only includes Online Store orders that were paid and not cancelled or refunded, that both tools use the same timezone and currency, and place a test order to follow it end to end." },
    { question: "Does Sealmetrics track purchases on Shopify's hosted checkout?", answer: "Yes. The purchase is confirmed server-side: when an order is placed, Shopify sends the orders/create webhook to Sealmetrics with revenue, currency and line items. Nothing has to load on the checkout pages, and the embed only needs to see the funnel up to begin_checkout." },
    { question: "Does Sealmetrics replace Shopify Analytics?", answer: "No. Shopify Analytics stays as the merchandising view: which products, collections and discount codes are selling. Sealmetrics answers a different question on overlapping data, which channels and campaigns produced the revenue." },
    { question: "What happens with GA4 on my Shopify store?", answer: "Nothing has to change. GA4 keeps running, including for Google Ads, and Sealmetrics installs alongside it. Run both over a full commercial cycle; Incapto's comparison covered 48 days. Most teams then move budget decisions to Sealmetrics and keep GA4 as the Google Ads conduit." },
    { question: "How is Sealmetrics billed on Shopify?", answer: "Stores that install the public app are billed through Shopify Managed Pricing, and the plan is approved and managed in Shopify Admin; uninstalling the app stops billing. Stores on a custom app are billed by Sealmetrics directly. Check the current plans in Shopify Admin or on the pricing page." },
    { question: "Does Sealmetrics handle Shopify's GDPR requirements?", answer: "The app subscribes to Shopify's mandatory compliance webhooks (customer data request, customer redact and shop redact), sets no cookies and does not store order IDs externally. Whether your store needs consent for analytics still depends on your configuration and your national authority's criteria." },
  ],

  final: {
    tag: "Shopify walkthrough",
    title: <>Install on your store.<br /><em>See the channels behind the orders.</em></>,
    body: "Book 30 minutes with the founder. We connect Sealmetrics to your Shopify store, check a test order and set up the comparison with your Shopify orders.",
    primary: { label: "Book a Shopify walkthrough", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const shopifyEs: ProblemLandingContent = {
  route: "/platforms/shopify",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Plataformas", href: "/es/platforms/" },
    { label: "Shopify" },
  ],
  eyebrow: "Plataforma · Shopify",
  h1: <>Shopify conoce cada pedido.<br />GA4 pierde<br /><em>el tráfico que hay detrás.</em></>,
  heroBody:
    "En la tienda Shopify de Incapto, GA4 no registró el 29% de las visitas en 48 días, y quienes se le escaparon navegaban el doble. Sealmetrics se instala como app de Shopify y app embed del tema en cualquier plan, confirma cada compra en servidor con el webhook de Shopify y registró el 96% de los pedidos reales de la tienda online de Incapto.",
  heroPrimary: { label: "Ver la instalación", href: "#method" },
  heroSecondary: { label: "Leer el caso Incapto", href: "/es/case-studies/incapto/" },
  heroMicro: "Cualquier plan con app embeds · sin cookies · compras por webhook · alojado en Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    // The Spanish page is new: this date is its publication, not a revision.
    updatedLabel: "Publicado",
    date: SHOPIFY_MODIFIED,
    dateDisplay: "14 de septiembre de 2026",
  },
  module: {
    title: "Incapto · Shopify · 48 días",
    status: "Medido",
    rows: [
      ["Pedidos reales registrados", "96%"],
      ["Facturación real registrada", "97%"],
      ["Visitas que GA4 no registró", "29%"],
      ["Páginas vistas que GA4 no registró", "45%"],
    ],
    foot: "Solo pedidos de la tienda online · GA4 + Consent Mode frente a Sealmetrics · 14 jun–31 jul 2026",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      Sealmetrics para Shopify es una integración de analítica sin cookies en dos
      partes: la app Sealmetrics Pixel, que conecta la tienda por OAuth y registra
      el webhook orders/create de Shopify, y un app embed del tema que carga el
      tracker y dispara los eventos de producto, carrito y checkout. Funciona en
      cualquier plan de Shopify que admita app embeds. Como las compras llegan en
      servidor desde el webhook, no dependen de que cargue la página de gracias ni
      de que el comprador acepte las cookies, y no se guarda nada en su
      dispositivo. En la tienda Shopify de Incapto, medida en paralelo con GA4
      durante 48 días, Sealmetrics registró el 96% de los pedidos reales de la
      tienda online y el 97% de la facturación, mientras GA4 no registraba el 29%
      de las visitas. No se guardan los ID de pedido, así que la conciliación con
      Shopify se hace sobre totales y canales, no pedido a pedido.
    </p>
  ),

  divergence: {
    tag: "Qué captura",
    title: <>Cinco eventos.<br /><em>Sin configurar eventos.</em></>,
    body: "Con el app embed activo y el webhook registrado, el funnel fluye solo. La compra es el único evento que nunca depende del navegador.",
    headers: ["Evento", "Origen", "Qué lleva", "Nota"],
    rows: [
      ["pageview", "Tracker (t.js)", "La página, su canal y la landing", "En cada carga de página"],
      ["view_product", "App embed, en páginas /products/", "Nombre, SKU, precio, moneda e ID del producto", "Se lee de los datos estructurados del producto; se repite en navegación SPA"],
      ["add_to_cart", "App embed, interceptando /cart/add", "Producto, SKU, precio, cantidad y moneda", "Un evento por línea de pedido"],
      ["begin_checkout", "App embed, al enviar el carrito, en enlaces de checkout o Comprar ya", "URL del carrito", "Una vez por intento de checkout"],
      ["purchase", "Webhook orders/create de Shopify, en servidor", "Ingresos, moneda y líneas de pedido", "No hace falta cargar nada en el checkout alojado de Shopify"],
    ],
    note: (
      <>
        Los pasos de producto, carrito y checkout son{" "}
        <Link className={link} href="/es/glossary/event-tracking/">eventos</Link> que
        construyen el funnel; la compra es la conversión que lleva los ingresos.
        Cómo se atribuyen esos ingresos a canal y campaña se explica en{" "}
        <Link className={link} href="/es/use-cases/revenue-attribution/">atribución de ingresos sin cookies</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que GA4 pierde en Shopify",
    title: <>Los pedidos son reales.<br /><em>La foto por canal, no.</em></>,
    body: "Shopify registra cada pedido que cobra. Lo que no puede decirte es qué tráfico los produjo, y GA4 solo ve a quien aceptó el banner.",
    items: [
      ["01", "Un tercio del tráfico no sostiene ninguna decisión", "Llevada a la escala real, la foto de GA4 en Incapto tenía un hueco del 19% de tráfico que nunca midió, más un 11% sin origen conocido: cerca de un tercio del tráfico real que no podía informar una decisión de presupuesto."],
      ["02", "Las visitas que faltan son las que más navegan", "Las visitas que GA4 no registró vieron de media 3,3 páginas, frente a 1,6 en las que sí registró. La pérdida se concentra en el tráfico más comprometido, no se reparte por igual."],
      ["03", "El pago y el social parecen más pequeños", "GA4 situaba las campañas de pago en el 50% del tráfico de Incapto; medidas sobre todas las visitas eran el 62%. El social orgánico mostraba un 133% más de tráfico en Sealmetrics que en GA4."],
    ],
  },

  method: {
    id: "method",
    tag: "Instalación en Shopify",
    title: <>Conecta la app.<br /><em>Activa el embed.</em></>,
    body: (
      <>
        Un único camino de instalación para cualquier plan de Shopify que admita
        app embeds, sin distinción entre Plus y Standard. Los dos últimos pasos son
        los que hacen justa la comparación con Shopify; el razonamiento es el mismo
        que en{" "}
        <Link className={link} href="/es/use-cases/single-source-of-truth/">una sola cifra para marketing y finanzas</Link>.
      </>
    ),
    howToName: "Cómo instalar Sealmetrics en Shopify",
    howToDescription:
      "Cinco pasos para instalar analítica sin cookies en una tienda Shopify y contrastarla con los pedidos de la propia Shopify.",
    steps: [
      { name: "Conecta la tienda", text: "En el dashboard de Sealmetrics, abre Settings → Integrations → Shopify, selecciona el sitio, escribe tu dominio de Shopify y pulsa Connect Shopify. Autoriza la app Sealmetrics Pixel; el webhook de conversión se registra automáticamente." },
      { name: "Activa el app embed", text: "Copia tu Account ID desde la tarjeta de Shopify conectada. En Shopify, abre el editor del tema, ve a App embeds, activa Sealmetrics Analytics, pega el Account ID y guarda. Mientras el campo esté vacío, el embed no hace nada." },
      { name: "Comprueba el tracker y un pedido de prueba", text: "Carga la tienda y confirma que la marca Last hit se mueve en el informe Overview. Después haz un pedido de prueba real, apunta la hora y el importe, y confirma que la compra aparece como conversión." },
      { name: "Compara lo que es comparable", text: "Compara Sealmetrics solo con los pedidos de la tienda online de Shopify, en la misma zona horaria y la misma moneda. Deja fuera los pedidos de TPV, borradores y marketplaces, y los cancelados, reembolsados o no pagados." },
      { name: "Ejecútalo junto a GA4", text: "Deja GA4 y los píxeles publicitarios como están y compara durante un ciclo comercial completo. La comparación de Incapto cubrió 48 días antes de mirar el mix de canales." },
    ],
  },

  roles: {
    tag: "Qué se queda y qué cambia",
    title: <>No se arranca nada.<br /><em>Se mueve la decisión.</em></>,
    body: "Cada herramienta conserva el trabajo que hace bien. Sealmetrics asume el que GA4 no puede hacer con dato condicionado por el consentimiento: decirte qué canales produjeron los pedidos.",
    items: [
      { role: "Shopify Analytics", need: "Se queda: la visión de merchandising.", how: "Qué productos, colecciones y códigos de descuento venden. Sealmetrics no lo sustituye y se concilia con sus pedidos.", link: { label: "Una cifra para marketing y finanzas", href: "/es/use-cases/single-source-of-truth/" } },
      { role: "GA4", need: "Puede quedarse, para Google Ads.", how: "Muchos equipos lo mantienen como vía hacia Google Ads mientras las decisiones de presupuesto pasan a la base medida.", link: { label: "Sealmetrics frente a GA4", href: "/es/vs-ga4/" } },
      { role: "Píxeles de Meta y Google", need: "Se quedan para las pujas, con consentimiento.", how: "Sealmetrics no envía conversiones a las plataformas, así que estas mantienen su propia configuración sujeta a consentimiento.", link: { label: "Atribución de ingresos por campaña", href: "/es/use-cases/revenue-attribution/" } },
      { role: "Sealmetrics", need: "Pasa a ser la visión por canal.", how: "Ingresos por canal, campaña y creatividad en cada sesión registrada, contrastados con los pedidos de Shopify.", link: { label: "Datos completos", href: "/es/complete-data/" } },
    ],
  },

  proof: {
    tag: "Medido en Shopify",
    quote: {
      text: "El Consent Mode nos dejaba un vacío estructural: sabíamos que había tráfico que no estábamos viendo, pero no teníamos forma de dimensionarlo.",
      cite: "Rosa Tomàs · Acquisition Manager B2C · Incapto",
      person: "Rosa Tomàs",
      role: "Acquisition Manager B2C, Incapto",
    },
    body: "Incapto vende café de especialidad en Shopify. Ejecutó GA4 y Sealmetrics en la misma tienda los mismos días, concilió primero ambos con los pedidos de Shopify y solo después comparó tráfico y canales.",
    figures: [
      { value: "96%", label: "de los pedidos reales de la tienda online registrados, y el 97% de la facturación", client: "Incapto", href: "/es/case-studies/incapto/" },
      { value: "29%", label: "de las visitas reales que no aparecían en ningún informe de GA4", client: "Incapto", href: "/es/case-studies/incapto/" },
      { value: "12 pts", label: "de diferencia en el peso de las campañas de pago: 50% en GA4 frente a 62%", client: "Incapto", href: "/es/case-studies/incapto/" },
    ],
    readCase: "Leer el caso",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Hecho para la visión por canal.<br /><em>No para todo.</em></>,
    body: (
      <>
        Estos límites vienen con el diseño y con la propia Shopify. El mismo
        planteamiento para tiendas WordPress está en{" "}
        <Link className={link} href="/es/platforms/woocommerce/">Sealmetrics para WooCommerce</Link>.
      </>
    ),
    items: [
      ["La conciliación es sobre totales", "No se guardan los ID de pedido, así que comparas totales y canales con Shopify, nunca fila a fila."],
      ["Los carritos a medida pueden ocultar el add-to-cart", "El embed escucha las peticiones estándar /cart/add de Shopify. Los temas muy personalizados que las esquivan pueden no reportar add_to_cart."],
      ["Los huecos del webhook no se recuperan", "Los pedidos hechos mientras el webhook no estaba registrado —tras una reinstalación o un cambio de permisos— no se recuperan. Vuelve a conectar desde el dashboard."],
      ["Solo pedidos de la tienda online", "Los pedidos de TPV, borradores y marketplaces no tienen sesión web, así que no tienen canal que atribuir."],
      ["Último clic por sesión", "Sin modelo multi-touch ni view-through; una visita posterior por otro canal se lleva el mérito."],
      ["No sustituye a Shopify Analytics", "Los informes de productos, colecciones y descuentos se quedan en Shopify, donde ya trabaja el equipo de merchandising."],
    ],
  },

  faqTag: "Preguntas frecuentes sobre Shopify",
  faqTitle: <>Antes de instalarlo<br /><em>en tu tienda.</em></>,
  faq: [
    { question: "¿Sealmetrics funciona en Shopify Basic o solo en Shopify Plus?", answer: "En cualquier plan de Shopify que admita app embeds, sin distinción entre Plus y Standard. Conectas la app Sealmetrics Pixel desde el dashboard de Sealmetrics, activas el app embed Sealmetrics Analytics en tu tema y pegas tu Account ID. La instalación y los eventos son los mismos en todos los planes." },
    { question: "¿Cómo se concilia Sealmetrics con Shopify?", answer: "A nivel agregado, contra los pedidos de la tienda online de Shopify del mismo periodo. En la medición en paralelo de Incapto, 48 días, Sealmetrics registró el 96% de los pedidos reales y el 97% de la facturación. Por diseño no se guardan los ID de pedido, así que la comparación se hace sobre totales y canales, no uniendo fila a fila." },
    { question: "¿Por qué no cuadran mis pedidos de Sealmetrics con los informes de Shopify?", answer: "En Shopify las compras llegan por el webhook orders/create, así que una página de gracias que no carga no es la causa. Comprueba que la tienda aparece como Connected, que la cifra de Shopify solo incluye pedidos de la tienda online pagados y no cancelados ni reembolsados, que las dos herramientas usan la misma zona horaria y moneda, y haz un pedido de prueba para seguirlo de principio a fin." },
    { question: "¿Sealmetrics registra las compras del checkout alojado de Shopify?", answer: "Sí. La compra se confirma en servidor: cuando se hace un pedido, Shopify envía el webhook orders/create a Sealmetrics con los ingresos, la moneda y las líneas de pedido. No hace falta cargar nada en las páginas de checkout, y el embed solo necesita ver el funnel hasta begin_checkout." },
    { question: "¿Sealmetrics sustituye a Shopify Analytics?", answer: "No. Shopify Analytics se queda como visión de merchandising: qué productos, colecciones y códigos de descuento venden. Sealmetrics responde a otra pregunta sobre datos que se solapan: qué canales y campañas produjeron los ingresos." },
    { question: "¿Qué pasa con GA4 en mi tienda Shopify?", answer: "No hace falta cambiar nada. GA4 sigue funcionando, también para Google Ads, y Sealmetrics se instala a su lado. Ejecuta los dos durante un ciclo comercial completo; la comparación de Incapto cubrió 48 días. La mayoría de equipos pasa después las decisiones de presupuesto a Sealmetrics y mantiene GA4 como vía hacia Google Ads." },
    { question: "¿Cómo se factura Sealmetrics en Shopify?", answer: "Las tiendas que instalan la app pública pagan a través de Shopify Managed Pricing, y el plan se aprueba y gestiona en el Admin de Shopify; desinstalar la app detiene la facturación. Las tiendas con app personalizada pagan directamente a Sealmetrics. Consulta los planes vigentes en el Admin de Shopify o en la página de precios." },
    { question: "¿Sealmetrics cumple los requisitos RGPD de Shopify?", answer: "La app se suscribe a los webhooks obligatorios de cumplimiento de Shopify (solicitud de datos de cliente, borrado de cliente y borrado de tienda), no instala cookies y no guarda los ID de pedido fuera de Shopify. Que tu tienda necesite consentimiento para la analítica sigue dependiendo de tu configuración y de los criterios de tu autoridad nacional." },
  ],

  final: {
    tag: "Revisión en Shopify",
    title: <>Instálalo en tu tienda.<br /><em>Ve los canales detrás de los pedidos.</em></>,
    body: "Reserva 30 minutos con el founder. Conectamos Sealmetrics a tu tienda Shopify, comprobamos un pedido de prueba y dejamos preparada la comparación con tus pedidos de Shopify.",
    primary: { label: "Reservar una revisión en Shopify", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
