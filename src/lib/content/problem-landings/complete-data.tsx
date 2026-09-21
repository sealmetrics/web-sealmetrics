import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * Problem A — "GA4 does not reflect reality". Lives on the /complete-data pillar
 * (decision D1: reuse the pillar's authority instead of a new URL).
 *
 * Decision D8 governs every number here: the measured Incapto gap leads. Since
 * 2026-09-21 there is no universal GA4 loss figure on this page (the worst-case
 * model is retired); the only other figure is the attributed client-experience
 * consent range. Case figures come from src/lib/content/case-studies.tsx. The
 * Incapto case explicitly does not claim that Sealmetrics measures 100% of
 * traffic, so this page does not either.
 *
 * As a pillar it links down to its spokes, always inside a sentence.
 */

export const COMPLETE_DATA_PUBLISHED = "2026-05-28";
export const COMPLETE_DATA_MODIFIED = "2026-09-21";

const link = "sig-problem-inline";

export const completeDataEn: ProblemLandingContent = {
  route: "/complete-data",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Complete data" }],
  eyebrow: "Pillar · Complete data",
  h1: <>GA4 is not showing you<br /><em>what really happened.</em></>,
  heroBody:
    "In Europe, consent banners, ad blockers and browser restrictions remove a large and uneven share of your traffic before GA4 records it. On one Shopify store measured side by side for 48 days, GA4 did not record 29% of visits. Sealmetrics measures without cookies, so the traffic your budget depends on is in the report — and the total can be checked against real orders.",
  heroPrimary: { label: "See what the store showed", href: "#method" },
  heroSecondary: { label: "Read the Incapto case", href: "/case-studies/incapto/" },
  heroMicro: "Measured, not modelled · no cookies · last click per session · EU-hosted in Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: COMPLETE_DATA_MODIFIED,
    dateDisplay: "14 September 2026",
  },
  module: {
    title: "Same store · same 48 days",
    status: "Measured · Incapto",
    rows: [
      ["Visits GA4 did not record", "29%"],
      ["Pageviews GA4 did not record", "45%"],
      ["GA4 visits with no usable origin", "14%"],
      ["Real Shopify orders Sealmetrics recorded", "96%"],
    ],
    foot: "GA4 + Consent Mode vs Sealmetrics · Jun–Aug 2026 · origin figure from the 28 Jul–6 Aug window",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Complete data is analytics whose totals you can check against something
      that really happened — orders, bookings, revenue — instead of a model
      filling the gaps. GA4 does not reflect reality in Europe because it only
      records visitors who accept the consent banner, are not running an ad
      blocker and keep their cookies long enough; Consent Mode then estimates
      part of what is missing. The loss is large and uneven by channel. Measured
      on a real store, with GA4 and Sealmetrics running side by side on
      Incapto&apos;s Shopify site for 48 days, GA4 did not record 29% of visits
      or 45% of pageviews, while Sealmetrics recorded 96% of the real orders.
      How much GA4 misses depends on the store and the channel, so it has to
      be measured on each site. Sealmetrics measures without cookies or personal data and
      attributes revenue to the last click of each session. It does not
      identify people or reconstruct journeys across visits.
    </p>
  ),

  divergence: {
    tag: "Where the traffic goes",
    title: <>Four losses.<br /><em>None of them on the report.</em></>,
    body: "GA4 is accurate about the visitors it can see. The problem is who it cannot see, and that nothing on the dashboard says how many they were.",
    headers: ["Loss", "What happens", "What GA4 does about it", "What changes without cookies"],
    rows: [
      ["Consent rejection", "Visitors who decline the banner are not recorded. Rejection ranges widely by sector, brand and banner design.", "Consent Mode estimates part of the missing activity", "Nothing is stored on the device, so the analytics can run where the regulator's exemption criteria are met"],
      ["Ad blockers", "Requests to known tracking domains are blocked, more often on desktop and in tech-literate audiences", "The visit is lost", "Served from your own subdomain, the tracker is far less likely to match a blocklist"],
      ["Browser restrictions (Safari ITP)", "Script-set cookies expire in days, so returning visitors lose their original source", "Later visits land in direct or unassigned", "No cookie to expire; each session keeps the source it arrived with"],
      ["Sampling and thresholds", "Large explorations are sampled and small rows can be withheld", "Estimates or hides the row", "Every recorded event is counted, with no sampling"],
    ],
    note: (
      <>
        How the losses stack is worked through in{" "}
        <Link className={link} href="/blog/why-ga4-misses-traffic/">why GA4 doesn&apos;t see part of your traffic</Link>;
        each vector is defined under{" "}
        <Link className={link} href="/glossary/data-loss-in-analytics/">data loss in analytics</Link>,{" "}
        <Link className={link} href="/glossary/intelligent-tracking-prevention/">Intelligent Tracking Prevention</Link> and{" "}
        <Link className={link} href="/blog/ga4-data-sampling-problem/">GA4&apos;s sampling problem</Link>.
        How big each loss is depends on the site, which is why the rest of this
        page uses measured figures.
      </>
    ),
  },

  costs: {
    tag: "What incomplete data costs",
    title: <>The missing traffic<br /><em>is not random.</em></>,
    body: "If the loss were even, GA4 would simply be smaller. It is not even, so it is wrong — in the direction that moves budget.",
    items: [
      ["01", "Budget drifts to the channels that lose least", "At Incapto, GA4 put paid campaigns at 50% of traffic; measured without consent loss they were 62%. Direct lost least, so in GA4 it looked more important than it was."],
      ["02", "The no-origin bucket grows", "At Palladium Hotel Group, 40% of inbound traffic had no source or medium and 35% of GA4 bookings had no channel. At Incapto, 14 of every 100 GA4 visits had no usable origin, against 0.3% in Sealmetrics."],
      ["03", "The numbers stop reconciling", (
        <>
          The marketing report, the order system and finance drift apart, and the
          review becomes an argument about data. That problem has its own page:{" "}
          <Link className={link} href="/use-cases/single-source-of-truth/">one number for marketing and finance</Link>.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "Measure your own gap",
    title: <>Don&apos;t take our number.<br /><em>Measure yours.</em></>,
    body: (
      <>
        This is the method behind the Incapto figures, and it works on any store.
        The{" "}
        <Link className={link} href="/data-loss-calculator/">data loss calculator</Link>{" "}
        gives an estimate before you start; the parallel run replaces the estimate
        with a measurement.
      </>
    ),
    howToName: "How to measure how much traffic GA4 is missing",
    howToDescription:
      "Five steps to measure the gap between GA4 and what really happened on your site, anchored to real orders.",
    steps: [
      { name: "Keep GA4 and add Sealmetrics", text: "Install Sealmetrics on the same site and leave GA4 exactly as it is. Both tools measure the same days; nothing is switched off." },
      { name: "Reconcile both against real orders", text: "Before comparing traffic, check each tool against the orders your store actually took. Incapto's reconciliation used Shopify's online-store orders: Sealmetrics recorded 96% of them and 97% of revenue." },
      { name: "Compare visits and pageviews", text: "With the base verified, compare the totals. At Incapto, GA4 recorded 157,844 visits against 222,345 in Sealmetrics, and 256,005 pageviews against 468,427." },
      { name: "Break the gap down by channel", text: "The loss is uneven. At Incapto, Sealmetrics saw 11% more direct traffic than GA4, 37% to 52% more from paid campaigns, 62% more from organic search and 133% more from organic social." },
      { name: "Size the no-origin bucket", text: "Count the visits with no channel you can act on. At Incapto that was 14% of GA4 visits against 0.3% in Sealmetrics — traffic that exists but supports no decision." },
    ],
  },

  roles: {
    tag: "What changes, by role",
    title: <>Same data,<br /><em>four different wins.</em></>,
    body: "Complete data is not a dashboard feature. It changes the argument each role can make.",
    items: [
      { role: "CMO", need: "Allocate budget on the real channel mix.", how: "Channel revenue on every recorded session, not only the visitors who consented, so paid and organic are judged on the same base.", link: { label: "Analytics for CMOs", href: "/for/cmo/" } },
      { role: "eCommerce manager", need: "Attribution that matches what the store recorded.", how: "Revenue per channel checked against the order total, with the purchase confirmed server-side on Shopify.", link: { label: "Analytics for eCommerce", href: "/for/ecommerce/" } },
      { role: "CTO / Analytics", need: "Data you can audit, without sampling or modelling.", how: "A 1.1 KB tracker, full-resolution BigQuery export, REST API and MCP server over the same dataset.", link: { label: "Analytics for CTOs", href: "/for/cto/" } },
      { role: "DPO", need: "Measurement that does not start with a consent problem.", how: "No cookies, no personal data in the dataset and processing in Dublin. Whether consent is needed still depends on your configuration.", link: { label: "Consentless analytics", href: "/consentless-analytics/" } },
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
    body: "Incapto knew exactly how many orders its Shopify store had taken. What it could not establish was how much of the traffic behind them reached GA4. Running both tools on the same days settled it — and the channels being under-credited were the ones bringing new customers in.",
    figures: [
      { value: "29%", label: "of real visits never reached GA4 over 48 days on Shopify", client: "Incapto", href: "/case-studies/incapto/" },
      { value: "+30%", label: "more traffic measured than with Google Analytics on the same site", client: "Dreamplace Hotels", href: "/case-studies/dreamplace-hotels/" },
      { value: "40%", label: "of inbound traffic had no source or medium in the previous stack", client: "Palladium Hotel Group", href: "/case-studies/palladium-hotel-group/" },
    ],
    readCase: "Read the case",
  },

  limits: {
    tag: "What complete data does not mean",
    title: <>Complete means checkable,<br /><em>not unlimited.</em></>,
    body: (
      <>
        The trade-off is deliberate: aggregate measurement instead of individual
        tracking. Attribution is{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last click</Link>{" "}
        within each session, and revenue attribution is covered in depth under{" "}
        <Link className={link} href="/use-cases/revenue-attribution/">revenue attribution without cookies</Link>.
      </>
    ),
    items: [
      ["Your gap is your own", "29% was one store, Incapto, over 48 days. Sector, audience and banner design move the number, so measure yours."],
      ["It counts what fires", "Pages without the tracker, filtered bots and orders with no web visit stay outside. The Incapto figures are checked against orders, not presented as 100%."],
      ["No person-level analysis", "No returning-visitor recognition, no cohorts of people and no journeys across sessions. For product analytics inside a logged-in app, use a tool built for it."],
      ["Last click per session", "No multi-touch model and no view-through. Earlier influence belongs in a marketing-mix model."],
      ["Ad-blocker resistance needs setup", "The default tracker loads from t.sealmetrics.com. Serving it from your own subdomain is what keeps it off third-party blocklists."],
      ["No cookies is not a legal exemption by itself", "Whether a deployment needs consent depends on its configuration and your regulator's criteria. Ad pixels keep their own consent requirement."],
    ],
  },

  faqTag: "Common questions",
  faqTitle: <>Before you trust<br /><em>the next report.</em></>,
  faq: [
    { question: "Why does GA4 show less traffic than reality?", answer: "Because GA4 only records visitors who accept the consent banner, do not block its script and keep their cookies. Consent Mode estimates part of the rest, but estimates are not measurement. When Incapto ran GA4 and Sealmetrics side by side on its Shopify store for 48 days, GA4 did not record 29% of visits and 45% of pageviews." },
    { question: "How much traffic does GA4 miss in Europe?", answer: "It depends on the site, and it is uneven by channel. On one measured Shopify store the gap was 29% of visits; Dreamplace Hotels measures roughly 30% more traffic with Sealmetrics than with Google Analytics. In our experience with clients, between 40% and 60% of traffic doesn't accept cookies, and of those who do, 40% don't accept on the first pageview. There is no universal figure for the rest: measure it on your own site." },
    { question: "Isn't GA4's Consent Mode v2 already solving this?", answer: "Consent Mode is a modelling layer. When visitors reject cookies, Google estimates what they probably did based on the visitors who did consent. That is useful for a ballpark, but it is not a measurement, and it cannot tell you which channels the missing visitors came from. Complete data measures the traffic that actually arrived." },
    { question: "What does complete data actually mean?", answer: "Analytics whose totals can be checked against something that really happened. Operationally: no consent gate on the analytics, no cookie to expire, no sampling and no statistical gap-filling, with revenue attributed to the last click of each session. At Incapto that check was against Shopify's orders, where Sealmetrics recorded 96% of them and 97% of revenue." },
    { question: "How do I know my data is incomplete?", answer: "Run the data loss calculator for an estimate, then measure: keep GA4, add Sealmetrics for at least 30 days and compare both against the orders your store recorded. There is no benchmark to compare against: the gap depends on the store and the channel. If your measured gap is below 10%, you probably do not need to switch." },
    { question: "Does complete data mean Sealmetrics ignores privacy?", answer: "The opposite. Complete capture is possible because the architecture stores nothing on the device and keeps no personal data: no cookies, no identifiers, no stored IP addresses. Privacy is the constraint that forces the measurement to be aggregate, and aggregate measurement is what lets it run without a consent dialog where the regulator's criteria are met." },
    { question: "Where is this data stored?", answer: "Exclusively in Dublin, Ireland. The dashboard, the BigQuery export, the API and the MCP server all read the same EU-resident dataset." },
  ],

  final: {
    tag: "Measure the gap",
    title: <>See your gap<br /><em>on your own traffic.</em></>,
    body: "Book a 30-minute walkthrough with the founder. We run the data loss calculator on your site and reconcile the result against your CRM or your store's orders.",
    primary: { label: "Book a demo", href: "/demo/" },
    secondary: { label: "Estimate it with the calculator", href: "/data-loss-calculator/" },
  },
};

export const completeDataEs: ProblemLandingContent = {
  route: "/complete-data",
  breadcrumbs: [{ label: "Inicio", href: "/es/" }, { label: "Datos completos" }],
  eyebrow: "Pilar · Datos completos",
  h1: <>GA4 no te enseña<br /><em>lo que pasó de verdad.</em></>,
  heroBody:
    "En Europa, los banners de consentimiento, los ad-blockers y las restricciones del navegador eliminan una parte grande y desigual de tu tráfico antes de que GA4 la registre. En una tienda Shopify medida en paralelo durante 48 días, GA4 no registró el 29% de las visitas. Sealmetrics mide sin cookies, así que el tráfico del que depende tu presupuesto está en el informe, y el total se puede contrastar con los pedidos reales.",
  heroPrimary: { label: "Ver lo que mostró la tienda", href: "#method" },
  heroSecondary: { label: "Leer el caso Incapto", href: "/es/case-studies/incapto/" },
  heroMicro: "Medido, no modelado · sin cookies · último clic por sesión · alojado en Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Actualizado",
    date: COMPLETE_DATA_MODIFIED,
    dateDisplay: "14 de septiembre de 2026",
  },
  module: {
    title: "Misma tienda · mismos 48 días",
    status: "Medido · Incapto",
    rows: [
      ["Visitas que GA4 no registró", "29%"],
      ["Páginas vistas que GA4 no registró", "45%"],
      ["Visitas de GA4 sin origen utilizable", "14%"],
      ["Pedidos reales de Shopify registrados por Sealmetrics", "96%"],
    ],
    foot: "GA4 + Consent Mode frente a Sealmetrics · jun–ago 2026 · la cifra de origen corresponde al periodo 28 jul–6 ago",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      Los datos completos son analítica cuyos totales puedes contrastar con algo
      que ocurrió de verdad —pedidos, reservas, ingresos— en lugar de un modelo
      que rellena los huecos. GA4 no refleja la realidad en Europa porque solo
      registra a quien acepta el banner de consentimiento, no usa un ad-blocker y
      conserva sus cookies el tiempo suficiente; después, Consent Mode estima
      parte de lo que falta. La pérdida es grande y desigual por canal. Medida en
      una tienda real, con GA4 y Sealmetrics funcionando en paralelo sobre la web
      Shopify de Incapto durante 48 días, GA4 no registró el 29% de las visitas
      ni el 45% de las páginas vistas, mientras Sealmetrics registraba el 96% de
      los pedidos reales. Cuánto se pierde depende de la tienda y del canal, así
      que hay que medirlo en cada web. Sealmetrics mide sin
      cookies ni datos personales y atribuye los ingresos al último clic de cada
      sesión. No identifica personas ni reconstruye recorridos entre visitas.
    </p>
  ),

  divergence: {
    tag: "Adónde va el tráfico",
    title: <>Cuatro pérdidas.<br /><em>Ninguna en el informe.</em></>,
    body: "GA4 es preciso con los visitantes que puede ver. El problema es a quién no ve, y que nada en el dashboard dice cuántos eran.",
    headers: ["Pérdida", "Qué ocurre", "Qué hace GA4", "Qué cambia sin cookies"],
    rows: [
      ["Rechazo del consentimiento", "Quien rechaza el banner no queda registrado. El rechazo varía mucho según sector, marca y diseño del banner.", "Consent Mode estima parte de la actividad que falta", "Nada se guarda en el dispositivo, así que la analítica puede funcionar donde se cumplen los criterios de exención de la autoridad"],
      ["Ad-blockers", "Se bloquean las peticiones a dominios de tracking conocidos, más en escritorio y en audiencias técnicas", "La visita se pierde", "Servido desde tu propio subdominio, el tracker tiene muchas menos probabilidades de coincidir con una lista de bloqueo"],
      ["Restricciones del navegador (ITP de Safari)", "Las cookies creadas por script caducan en días y quien vuelve pierde su origen", "Las visitas posteriores acaban en directo o sin asignar", "No hay cookie que caduque; cada sesión conserva el origen con el que llegó"],
      ["Muestreo y umbrales", "Las exploraciones grandes se muestrean y las filas pequeñas pueden ocultarse", "Estima u oculta la fila", "Cada evento registrado se cuenta, sin muestreo"],
    ],
    note: (
      <>
        Cómo se suman las pérdidas se explica en{" "}
        <Link className={link} href="/es/blog/why-ga4-misses-traffic/">por qué GA4 no ve parte de tu tráfico</Link>;
        cada vector se define en{" "}
        <Link className={link} href="/es/glossary/data-loss-in-analytics/">pérdida de datos en analítica</Link>,{" "}
        <Link className={link} href="/es/glossary/intelligent-tracking-prevention/">Intelligent Tracking Prevention</Link> y{" "}
        <Link className={link} href="/es/blog/ga4-data-sampling-problem/">el problema del muestreo en GA4</Link>.
        El tamaño de cada pérdida depende de la web, y por eso el resto de esta
        página usa cifras medidas.
      </>
    ),
  },

  costs: {
    tag: "Lo que cuesta el dato incompleto",
    title: <>El tráfico que falta<br /><em>no es aleatorio.</em></>,
    body: "Si la pérdida fuera uniforme, GA4 simplemente sería más pequeño. No lo es, así que se equivoca, y en la dirección que mueve el presupuesto.",
    items: [
      ["01", "El presupuesto se va a los canales que menos pierden", "En Incapto, GA4 situaba las campañas de pago en el 50% del tráfico; medidas sobre todas las visitas eran el 62%. Directo era el que menos perdía, así que en GA4 parecía más importante de lo que era."],
      ["02", "Crece el cajón sin origen", "En Palladium Hotel Group, el 40% del tráfico entrante no tenía source ni medium y el 35% de las reservas de GA4 no tenía canal. En Incapto, 14 de cada 100 visitas de GA4 no tenían un origen utilizable, frente al 0,3% en Sealmetrics."],
      ["03", "Las cifras dejan de cuadrar", (
        <>
          El informe de marketing, el sistema de pedidos y finanzas se separan, y la
          revisión se convierte en una discusión sobre el dato. Ese problema tiene
          su propia página:{" "}
          <Link className={link} href="/es/use-cases/single-source-of-truth/">una sola cifra para marketing y finanzas</Link>.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "Mide tu propia brecha",
    title: <>No te fíes de nuestra cifra.<br /><em>Mide la tuya.</em></>,
    body: (
      <>
        Este es el método que hay detrás de las cifras de Incapto, y funciona en
        cualquier tienda. La{" "}
        <Link className={link} href="/es/data-loss-calculator/">calculadora de pérdida de datos</Link>{" "}
        da una estimación antes de empezar; la medición en paralelo la sustituye por
        un dato medido.
      </>
    ),
    howToName: "Cómo medir cuánto tráfico pierde GA4",
    howToDescription:
      "Cinco pasos para medir la distancia entre GA4 y lo que pasó de verdad en tu web, anclada a los pedidos reales.",
    steps: [
      { name: "Mantén GA4 y añade Sealmetrics", text: "Instala Sealmetrics en la misma web y deja GA4 exactamente como está. Las dos herramientas miden los mismos días; no se apaga nada." },
      { name: "Concilia ambas con los pedidos reales", text: "Antes de comparar tráfico, contrasta cada herramienta con los pedidos que cobró tu tienda. La conciliación de Incapto usó los pedidos de la tienda online de Shopify: Sealmetrics registró el 96% y el 97% de la facturación." },
      { name: "Compara visitas y páginas vistas", text: "Con la base verificada, compara los totales. En Incapto, GA4 registró 157.844 visitas frente a 222.345 en Sealmetrics, y 256.005 páginas vistas frente a 468.427." },
      { name: "Desglosa la brecha por canal", text: "La pérdida es desigual. En Incapto, Sealmetrics vio un 11% más de tráfico directo que GA4, entre un 37% y un 52% más desde campañas de pago, un 62% más desde búsqueda orgánica y un 133% más desde social orgánico." },
      { name: "Dimensiona el cajón sin origen", text: "Cuenta las visitas sin un canal sobre el que actuar. En Incapto fue el 14% de las visitas de GA4 frente al 0,3% en Sealmetrics: tráfico que existe pero no sostiene ninguna decisión." },
    ],
  },

  roles: {
    tag: "Qué cambia según el rol",
    title: <>El mismo dato,<br /><em>cuatro victorias distintas.</em></>,
    body: "Los datos completos no son una función del dashboard. Cambian el argumento que puede sostener cada rol.",
    items: [
      { role: "CMO", need: "Repartir el presupuesto sobre el mix real de canales.", how: "Ingresos por canal sobre cada sesión registrada, no solo sobre quien dio su consentimiento, para juzgar pago y orgánico sobre la misma base.", link: { label: "Analítica para CMOs", href: "/es/for/cmo/" } },
      { role: "Responsable de eCommerce", need: "Una atribución que cuadre con lo que registró la tienda.", how: "Ingresos por canal contrastados con el total de pedidos, con la compra confirmada en servidor en Shopify.", link: { label: "Analítica para eCommerce", href: "/es/for/ecommerce/" } },
      { role: "CTO / Analítica", need: "Dato auditable, sin muestreo ni modelado.", how: "Un tracker de 1,1 KB, export a BigQuery a resolución completa, API REST y servidor MCP sobre el mismo dataset.", link: { label: "Analítica para CTOs", href: "/es/for/cto/" } },
      { role: "DPO", need: "Una medición que no empiece con un problema de consentimiento.", how: "Sin cookies, sin datos personales en el dataset y con procesamiento en Dublín. Si hace falta consentimiento sigue dependiendo de tu configuración.", link: { label: "Analítica sin consentimiento", href: "/es/consentless-analytics/" } },
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
    body: "Incapto sabía exactamente cuántos pedidos había hecho su tienda Shopify. Lo que no podía saber era cuánto del tráfico que los generó llegaba a GA4. Medir con las dos herramientas los mismos días lo resolvió, y los canales infravalorados eran justo los que traían clientes nuevos.",
    figures: [
      { value: "29%", label: "de las visitas reales no llegó a GA4 en 48 días sobre Shopify", client: "Incapto", href: "/es/case-studies/incapto/" },
      { value: "+30%", label: "más tráfico medido que con Google Analytics en la misma web", client: "Dreamplace Hotels", href: "/es/case-studies/dreamplace-hotels/" },
      { value: "40%", label: "del tráfico entrante no tenía source ni medium en el stack anterior", client: "Palladium Hotel Group", href: "/es/case-studies/palladium-hotel-group/" },
    ],
    readCase: "Leer el caso",
  },

  limits: {
    tag: "Lo que datos completos no significa",
    title: <>Completo significa contrastable,<br /><em>no ilimitado.</em></>,
    body: (
      <>
        El trade-off es deliberado: medición agregada en lugar de seguimiento
        individual. La atribución es al último clic dentro de cada sesión; los{" "}
        <Link className={link} href="/es/glossary/attribution-model/">modelos de atribución</Link>{" "}
        alternativos necesitan identificar a la persona entre visitas.
      </>
    ),
    items: [
      ["Tu brecha es la tuya", "El 29% fue una tienda, Incapto, durante 48 días. El sector, la audiencia y el diseño del banner mueven la cifra, así que mide la tuya."],
      ["Cuenta lo que se dispara", "Las páginas sin tracker, los bots filtrados y los pedidos sin visita web quedan fuera. Las cifras de Incapto se contrastan con pedidos, no se presentan como un 100%."],
      ["Sin análisis por persona", "No reconoce a quien vuelve, no hace cohortes de personas ni recorridos entre sesiones. Para analítica de producto dentro de una app con login, usa una herramienta pensada para eso."],
      ["Último clic por sesión", "Sin modelo multi-touch y sin view-through. La influencia anterior se analiza en un marketing-mix model."],
      ["Resistir a los ad-blockers requiere configuración", "El tracker por defecto carga desde t.sealmetrics.com. Servirlo desde tu propio subdominio es lo que lo saca de las listas de terceros."],
      ["Sin cookies no es, por sí solo, una exención legal", "Si una implantación necesita consentimiento depende de su configuración y de los criterios de tu autoridad. Los píxeles publicitarios mantienen su propio requisito de consentimiento."],
    ],
  },

  faqTag: "Preguntas frecuentes",
  faqTitle: <>Antes de fiarte<br /><em>del próximo informe.</em></>,
  faq: [
    { question: "¿Por qué GA4 muestra menos tráfico del real?", answer: "Porque GA4 solo registra a quien acepta el banner de consentimiento, no bloquea su script y conserva sus cookies. Consent Mode estima parte del resto, pero una estimación no es una medición. Cuando Incapto midió GA4 y Sealmetrics en paralelo sobre su tienda Shopify durante 48 días, GA4 no registró el 29% de las visitas ni el 45% de las páginas vistas." },
    { question: "¿Cuánto tráfico pierde GA4 en Europa?", answer: "Depende de la web, y es desigual por canal. En una tienda Shopify medida la brecha fue del 29% de las visitas; Dreamplace Hotels mide aproximadamente un 30% más de tráfico con Sealmetrics que con Google Analytics. En nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies, y de quienes las aceptan, el 40% no lo hace en la primera página vista. Para el resto no hay una cifra universal: mídelo en tu propia web." },
    { question: "¿No lo resuelve ya el Consent Mode v2 de GA4?", answer: "Consent Mode es una capa de modelado. Cuando los visitantes rechazan las cookies, Google estima lo que probablemente hicieron a partir de quienes sí dieron su consentimiento. Sirve para un orden de magnitud, pero no es una medición y no te dice de qué canales venía el tráfico que falta. Los datos completos miden el tráfico que llegó de verdad." },
    { question: "¿Qué significa exactamente «datos completos»?", answer: "Analítica cuyos totales se pueden contrastar con algo que ocurrió de verdad. En la práctica: sin barrera de consentimiento en la analítica, sin cookie que caduque, sin muestreo y sin relleno estadístico, con los ingresos atribuidos al último clic de cada sesión. En Incapto ese contraste se hizo con los pedidos de Shopify, donde Sealmetrics registró el 96% de los pedidos y el 97% de la facturación." },
    { question: "¿Cómo sé si mi dato está incompleto?", answer: "Usa la calculadora de pérdida de datos para una estimación y después mide: mantén GA4, añade Sealmetrics durante al menos 30 días y compara ambos con los pedidos que registró tu tienda. No hay un valor de referencia con el que compararte: la brecha depende de la tienda y del canal. Si tu brecha medida está por debajo del 10%, probablemente no necesitas cambiar." },
    { question: "¿«Datos completos» significa que Sealmetrics ignora la privacidad?", answer: "Lo contrario. Medir sin pérdida por consentimiento es posible porque la arquitectura no guarda nada en el dispositivo ni conserva datos personales: sin cookies, sin identificadores y sin guardar direcciones IP. La privacidad es la restricción que obliga a medir en agregado, y la medición agregada es lo que permite funcionar sin diálogo de consentimiento cuando se cumplen los criterios de la autoridad." },
    { question: "¿Dónde se almacenan estos datos?", answer: "Exclusivamente en Dublín, Irlanda. El dashboard, el export a BigQuery, la API y el servidor MCP leen el mismo dataset residente en la UE." },
  ],

  final: {
    tag: "Mide la brecha",
    title: <>Ve tu brecha<br /><em>sobre tu propio tráfico.</em></>,
    body: "Reserva 30 minutos con el founder. Pasamos la calculadora de pérdida de datos por tu web y contrastamos el resultado con tu CRM o con los pedidos de tu tienda.",
    primary: { label: "Reservar una demo", href: "/es/demo/" },
    secondary: { label: "Estimarla con la calculadora", href: "/es/data-loss-calculator/" },
  },
};
