import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /for/saas — vertical page for self-serve SaaS, rebuilt from VerticalPageV3
 * onto the problem-landing template.
 *
 * The page is about acquisition: the marketing site and the sign-up flow,
 * where visitors are anonymous and the consent banner removes part of the
 * count. It says plainly where Sealmetrics stops — at the account — because a
 * SaaS buyer who expects cohorts or trial-to-paid per account would otherwise
 * buy the wrong tool.
 *
 * Product facts from docs.sealmetrics.com (checked 15 Sep 2026):
 * - use-cases/saas: same tracker on marketing site and app; pageviews,
 *   microconversions via sealmetrics.micro() (plan selection, sign-up steps,
 *   onboarding) and conversions via sealmetrics.conv() (signup with amount 0,
 *   subscription, upgrade); content groups via the tracker `group` parameter
 *   (marketing, pricing, blog, docs, app, onboarding). The code examples on
 *   this page are copied from that guide
 * - tracker/microconversions and tracker/conversions: micro() has no amount;
 *   conv(type, amount, properties)
 * - reports/funnel: fixed eCommerce funnel, custom funnels not supported;
 *   non-eCommerce sequences are tracked as microconversions; the Funnel by UTM
 *   table has one column per microconversion and conversion type
 * - reports/properties: properties of conversions and microconversions by
 *   source, medium and campaign (SaaS plan_type example)
 * - custom-properties/event-properties: never put PII in properties
 * - external-auth-sso-attribution: www → app on the same root domain is
 *   internal navigation; external auth domains become a referral unless
 *   registered as passthrough referrers (API only); signup conversion should
 *   fire on the post-signup page so it inherits the session source
 * - passthrough-referrers: built-in list for major payment gateways
 * - tracker/spa-support: History API routers tracked automatically
 * - faq/attribution + how-sealmetrics-calculates-entrances: last click, ~2 h
 *   inactivity session, no cross-session join
 * - integrations/bigquery: fact_conversions carries a `properties` JSON column
 * - REST API, MCP server and BigQuery connector on every plan, Agentic
 *   included; Agentic is 1M events over the life of the account, no card
 *   (founder, 15 Sep 2026; /pricing)
 *
 * Deliberately NOT claimed: custom SaaS funnels, trial-to-paid per account,
 * activation or retention cohorts, "MRR by acquisition source" (the docs guide
 * lists it, but a payment is credited to the session in which it happens, so
 * it is not the source that acquired the account), a server-side conversions
 * API (none is documented), and Rejoined Traffic behaviour (the docs give two
 * different thresholds).
 *
 * Removed from the old VerticalPageV3 version, none of it sourced or true:
 * "+40% signups observed"; "40% of signups show as direct"; "activation events
 * sampled at scale" and "unsampled activation tracked"; "true PLG attribution,
 * product-led vs marketing-led revenue cleanly separated" (needs user-level
 * joins); "track any custom event with any payload, activation and feature
 * adoption as first-class events"; "enterprise buyers blocked by ad blockers"
 * and "first-party tracking captures technical buyers" (the default install is
 * third-party; first-party reduces, not removes, blocker loss); "all
 * first-party, all attributed"; "your self-serve funnel finally reports the
 * truth"; "see your real activation rate in 30 minutes"; "GDPR-safe,
 * consent-free" in metadata; the shared categorical GDPR, migration and setup
 * FAQs. No SaaS customer case exists: proof says so and uses Incapto figures
 * only as labelled eCommerce context.
 */

export const SAAS_PUBLISHED = "2026-03-02";
export const SAAS_PUBLISHED_ES = "2026-04-18";
export const SAAS_MODIFIED = "2026-09-15";

const link = "sig-problem-inline";

const CODE_STEP = `sealmetrics.micro('signup_step_1', {
  step: 'email_entered'
});`;

const CODE_SIGNUP = `function onSignupSuccess(user) {
  sealmetrics.conv('signup', 0, {
    plan: user.plan,
    trial_days: '14'
  });
}`;

const CODE_SUBSCRIPTION = `sealmetrics.conv('subscription', monthlyPrice, {
  plan: 'pro',
  billing_cycle: 'monthly',
  currency: 'USD',
  trial_days_used: trialDaysUsed.toString()
});`;

export const saasEn: ProblemLandingContent = {
  route: "/for/saas",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "For teams", href: "/for/" },
    { label: "SaaS" },
  ],
  eyebrow: "Industry · Self-serve SaaS",
  h1: <>The trial started.<br />Its channel<br /><em>was not recorded.</em></>,
  heroBody:
    "A self-serve SaaS moves acquisition budget on sign-ups by channel. That count usually comes from analytics that does not record visitors who reject the consent banner, and from ad platforms that credit sign-ups to their own ads. Sealmetrics measures the marketing site and the sign-up flow without cookies and credits each sign-up to the last click of its session. It stops where the account begins.",
  heroPrimary: { label: "See the sign-up setup", href: "#method" },
  heroSecondary: { label: "See what every plan includes", href: "/pricing/" },
  heroMicro: "Marketing site and app · microconversions per sign-up step · last click per session · no cookies · EU-hosted in Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: SAAS_MODIFIED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "Sign-up flow · what gets recorded",
    status: "Per session",
    rows: [
      ["Pricing page", "Pageview · group=pricing"],
      ["Plan selected", "Microconversion · plan"],
      ["Each sign-up form step", "Microconversion"],
      ["Account created", "Conversion · signup, amount 0"],
    ],
    foot: "Each event is credited to the last click of the session in which it fires",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Analytics for SaaS has to show which channels and campaigns bring trials and
      paid sign-ups, on a count that does not depend on who accepted the consent
      banner. Self-serve teams usually read acquisition from GA4, which does not
      record visitors who reject the banner, and from ad platforms, which credit
      sign-ups to their own ads. Sealmetrics counts visits without cookies and
      credits each conversion to the last click of the session in which it fires.
      A sign-up is a conversion with amount 0; plan selection and each form step
      are microconversions, and a plan property shows which campaigns bring which
      plans. With the same tracker on the marketing site and the app subdomain,
      the session keeps its source across both. Nothing links visits across
      sessions, so a trial started today and a payment three weeks later are
      separate events: Sealmetrics does not measure trial-to-paid per account,
      activation cohorts or retention.
    </p>
  ),

  divergence: {
    tag: "Why the sign-up report misleads",
    title: <>The sign-up is real.<br /><em>Its source is a guess.</em></>,
    body: "A self-serve team asks the same acquisition questions every week. Each one is answered today by a tool that either loses part of the traffic before the form or grades its own ads, and one of them belongs in a different tool altogether.",
    headers: ["The weekly question", "Where it is answered today", "What goes wrong", "What changes when it is measured"],
    rows: [
      ["Which channel brings trials?", "GA4 acquisition reports", "Visitors who reject the banner are not recorded, and not evenly by channel; sign-ups with no usable source land in Direct or Unassigned", "Sign-ups by source, medium and campaign, counted without consent loss"],
      ["Which campaign brings trials?", "Ad platform reports", "Each platform credits sign-ups to its own ads, with its own attribution window", "Sign-ups by utm_campaign and utm_content, read from the landing page of the session"],
      ["Where does the sign-up form lose people?", "Form tool or GA4 funnel exploration", "Built only on the sessions that were recorded", "One microconversion per step, compared by source, medium and campaign"],
      ["Which campaigns bring which plans?", "Billing system", "Knows the plan, not the channel of the visit", "A plan property on the sign-up or subscription, broken down by campaign"],
      ["Did the trial become a paying account?", "Billing system and product analytics", "Nothing: they know the account, which is what this question needs", "Still answered there. Sealmetrics does not link a later payment to the visit that started the trial"],
    ],
    note: (
      <>
        No SaaS parallel run is published yet, but the loss is measurable on other
        sites. When{" "}
        <Link className={link} href="/case-studies/incapto/">Incapto</Link>, an
        eCommerce brand on Shopify, ran GA4 and Sealmetrics side by side for 48
        days, GA4 did not record 29% of visits, and the gap was uneven by channel.
        How GA4 fills part of it with estimates is covered under{" "}
        <Link className={link} href="/glossary/consent-mode-v2/">Consent Mode v2</Link>;
        the event model behind sign-up steps is explained in{" "}
        <Link className={link} href="/glossary/event-tracking/">event tracking</Link>.
      </>
    ),
  },

  costs: {
    tag: "What the wrong base costs a SaaS team",
    title: <>Budget follows<br /><em>the trials you can see.</em></>,
    body: "Consent loss does not remove sign-ups evenly. It changes which channels look like they work, and each distortion lands on a decision the growth team makes.",
    items: [
      ["01", "Search and content under-credited", "Channels that reach people who do not know the product yet can lose more than direct. On Incapto's store, Sealmetrics recorded 11% more direct traffic than GA4 but 62% more from organic search. Where a SaaS site shows the same pattern, the blog and search budget is judged on the smaller number."],
      ["02", "Cost per sign-up on a partial denominator", "Cost per sign-up divides each platform's spend by the sign-ups that were recorded. When the missing sign-ups are not spread evenly, the channel that looks cheapest in the report may not be the cheapest one."],
      ["03", "Form changes tested on a filtered sample", "A drop between sign-up steps that is read only on consented sessions describes the visitors who accepted the banner. Changes to the flow are then judged on a sample the banner chose."],
    ],
  },

  method: {
    id: "method",
    tag: "Measuring the sign-up flow",
    title: <>Tag the flow.<br /><em>Then read the channels.</em></>,
    body: (
      <>
        Each step follows the SaaS implementation guide in the Sealmetrics
        documentation. The attribution rules behind the channel numbers are set
        out in{" "}
        <Link className={link} href="/use-cases/revenue-attribution/">revenue attribution</Link>.
      </>
    ),
    howToName: "How a SaaS team measures its sign-up flow by channel without cookies",
    howToDescription:
      "Six steps for a self-serve SaaS team to track sign-up steps, sign-ups and payments with Sealmetrics and read them by channel, campaign and plan.",
    steps: [
      { name: "Install the same tracker on the marketing site and the app", text: "Add the Sealmetrics tracker with the same account ID to the marketing site and the app. Moving from www to app on the same root domain is internal navigation, so the session keeps its source. Single-page apps built on the History API are tracked on route changes with no extra code." },
      { name: "Group pricing, blog, docs and app pages", text: "Add the group parameter to the tracker, such as group=pricing, group=blog, group=docs or group=app, so acquisition pages and in-app pages can be read separately in the Pages report." },
      { name: "Fire a microconversion for each sign-up step", text: "Call sealmetrics.micro() for plan selection, the start-trial click and each step of the sign-up form, with properties such as plan or billing. Never put an email, a name or an account ID in a property." },
      { name: "Record sign-ups and payments as conversions", text: "Fire a signup conversion with amount 0 on the page shown after the account is created, and a subscription or upgrade conversion with its amount when a payment is completed on your site. Each is credited to the last click of the session in which it fires, so a payment weeks after the trial is credited to that later visit." },
      { name: "Register external login and payment domains", text: "If sign-up passes through an SSO provider, an accounts domain or a hosted payment page on another domain, register that domain as a passthrough referrer through the API, so the return keeps the original source instead of opening a referral visit. Major payment gateways are already on a built-in list." },
      { name: "Read sign-ups by campaign and plan", text: "Compare conversions by source, medium and campaign. The Funnel by UTM table lists one column per microconversion and conversion type for each campaign, and the Properties report breaks the plan property down by campaign. Trial-to-paid per account stays in the billing system or product analytics." },
    ],
  },

  examples: {
    tag: "The calls",
    title: <>Three events<br /><em>from the docs.</em></>,
    body: (
      <>
        Copied from the SaaS implementation guide. The first is a microconversion
        with no value; the other two are conversions. Properties describe the plan,
        never the person.
      </>
    ),
    items: [
      { name: "A sign-up form step", description: "One microconversion per step, fired when the field is completed.", code: CODE_STEP },
      { name: "Account created", description: "The sign-up conversion, amount 0, with the plan as a property.", code: CODE_SIGNUP },
      { name: "Trial to paid", description: "The subscription conversion with the plan price, fired when payment succeeds.", code: CODE_SUBSCRIPTION },
    ],
  },

  roles: {
    tag: "Who uses it in a SaaS team",
    title: <>One sign-up count,<br /><em>four desks.</em></>,
    body: "Each team keeps its tools. What changes is the acquisition count its weekly decisions are built on.",
    items: [
      { role: "Head of growth", need: "Know which channels and campaigns bring trials and paid sign-ups.", how: "Sign-ups and subscriptions by source, medium and campaign, counted without consent loss.", link: { label: "Revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "Performance marketing", need: "Judge paid campaigns outside each platform's own report.", how: "Sign-ups by campaign and creative from the landing page's UTMs, joined with spend in a spreadsheet or BigQuery.", link: { label: "Google Ads tracking", href: "/integrations/google-ads/" } },
      { role: "Product and CRO", need: "Find the sign-up step that loses the most people, by source.", how: "One microconversion per form step, compared by campaign. Activation inside the product stays in product analytics.", link: { label: "Event tracking", href: "/glossary/event-tracking/" } },
      { role: "Data and BI", need: "Put acquisition next to billing without copying personal data.", how: "The BigQuery connector, on every plan, writes conversions with their properties by source, medium and campaign; the comparison with billing is made on aggregates such as date and plan.", link: { label: "BigQuery connector", href: "/integrations/bigquery/" } },
    ],
  },

  proof: {
    tag: "Evidence so far",
    body: "No SaaS customer case is published, so this page quotes none. The figures below come from Incapto, a specialty coffee eCommerce brand on Shopify, measured in parallel with GA4. They show how uneven consent loss is by channel on a real site; they are context for the method, not a SaaS result.",
    figures: [
      { value: "29%", label: "of visits GA4 did not record over 48 days on a Shopify store", client: "Incapto · eCommerce", href: "/case-studies/incapto/" },
      { value: "+62%", label: "more organic search traffic recorded than GA4, against +11% for direct", client: "Incapto · eCommerce", href: "/case-studies/incapto/" },
      { value: "96%", label: "of real online-store orders recorded, reconciled before any channel was compared", client: "Incapto · eCommerce", href: "/case-studies/incapto/" },
    ],
    readCase: "Read the case",
  },

  limits: {
    tag: "What it does not do",
    title: <>It measures acquisition.<br /><em>Not the account.</em></>,
    body: (
      <>
        These limits come from measuring without identifying anyone. Attribution is{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last click</Link>{" "}
        within each session, by design, and what happens after login belongs to
        tools that know the user.
      </>
    ),
    items: [
      ["No trial-to-paid per account", "A trial and a payment weeks later are separate events in separate sessions. The payment is credited to the visit in which it happens, not to the campaign that started the trial."],
      ["No cohorts, activation or retention", "There is no user ID, so there are no sign-up cohorts, day-7 activation or churn curves. Those stay in product analytics and the billing system."],
      ["No custom funnel chart", "The Funnel report draws a fixed eCommerce sequence. Sign-up steps are microconversions, read by type and by campaign rather than as a drawn SaaS funnel."],
      ["No account or company data", "No emails, account IDs or company matching, and properties must not carry personal data. It cannot tell you which companies visited the pricing page."],
      ["Renewals have no visit", "A renewal charged automatically by the billing system has no session behind it, so there is nothing to credit it to."],
      ["It does not feed ad platforms", "Sealmetrics sends no conversions to ad platforms and imports no spend. Keep their tags for bidding."],
    ],
  },

  faqTag: "Questions SaaS teams ask",
  faqTitle: <>Before you change<br /><em>how sign-ups are counted.</em></>,
  faq: [
    { question: "How do I attribute SaaS trial sign-ups to channels without cookies?", answer: "Fire a signup conversion with amount 0 on the page shown after the account is created. Sealmetrics reads the channel from the landing page of the session, with its UTMs, click IDs or referrer, and credits the sign-up to the last click of that session. Visitors who reject the consent banner are still counted, because no cookie or stored identifier is involved." },
    { question: "Can Sealmetrics measure trial-to-paid conversion?", answer: "Not per account. It does not identify visitors across sessions, so it cannot link a payment to the trial that preceded it. A ratio of subscriptions to sign-ups over a period can be read, but it is not a cohort: payments in one month come partly from trials started earlier, and each payment is credited to the session in which it happens. Account-level trial-to-paid belongs in the billing system or product analytics." },
    { question: "Does it keep the source when sign-up happens in the app?", answer: "Yes, when the marketing site and the app use the same tracker account and share a root domain: moving from www to app is internal navigation, so the session keeps its source. If the flow passes through a login or payment page on another domain, register that domain as a passthrough referrer through the Sealmetrics API." },
    { question: "Can I see which campaigns bring which plans?", answer: "Yes. Add a property such as plan or billing cycle to the sign-up or subscription conversion. The Properties report breaks each property value down by source, medium and campaign, and the BigQuery connector exports conversions with their properties. Do not put emails, names or account IDs in properties." },
    { question: "Does Sealmetrics replace product analytics tools?", answer: "No. Product analytics tools identify users after login to measure activation, feature adoption and retention; Sealmetrics identifies no one. It covers the marketing site and the sign-up flow, where visitors are anonymous and the consent banner removes part of the count, and it can sit next to a product analytics tool without overlap." },
    { question: "Which Sealmetrics plans include the API, the MCP server and BigQuery?", answer: "All of them. The REST API, the MCP server and the BigQuery connector are included on every plan, from the free Agentic tier, which covers 1 million events over the life of the account with no card, to Growth, Scale and Enterprise." },
    { question: "Does a SaaS marketing site still need a consent banner?", answer: "Sealmetrics sets no cookies and stores nothing on the visitor's device. Ad tags, chat widgets, session replay and product analytics that identify users usually do, and still need consent. Whether your analytics setup is exempt from consent depends on its configuration and on your national authority's criteria." },
  ],

  final: {
    tag: "Sign-up measurement review",
    title: <>Bring your sign-up flow.<br /><em>See which channels change.</em></>,
    body: "Thirty minutes: we look at how your sign-up flow is tagged today and what your analytics reports by channel, and show how steps, sign-ups and plan properties would be set up.",
    primary: { label: "Book a sign-up measurement review", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const saasEs: ProblemLandingContent = {
  route: "/for/saas",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Por equipo", href: "/es/for/" },
    { label: "SaaS" },
  ],
  eyebrow: "Sector · SaaS self-serve",
  h1: <>La prueba empezó.<br />Su canal<br /><em>no quedó registrado.</em></>,
  heroBody:
    "Un SaaS self-serve reparte su presupuesto de captación según las altas por canal. Esa cifra suele salir de una analítica que no registra a quien rechaza el banner de consentimiento y de unas plataformas publicitarias que se atribuyen las altas. Sealmetrics mide la web comercial y el flujo de alta sin cookies y atribuye cada alta al último clic de su sesión. Se detiene donde empieza la cuenta.",
  heroPrimary: { label: "Ver cómo se mide el alta", href: "#method" },
  heroSecondary: { label: "Ver qué incluye cada plan", href: "/es/pricing/" },
  heroMicro: "Web comercial y app · microconversiones por paso del alta · último clic por sesión · sin cookies · alojado en Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Actualizado",
    date: SAAS_MODIFIED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Flujo de alta · qué se registra",
    status: "Por sesión",
    rows: [
      ["Página de precios", "Página vista · group=pricing"],
      ["Plan elegido", "Microconversión · plan"],
      ["Cada paso del formulario", "Microconversión"],
      ["Cuenta creada", "Conversión · signup, importe 0"],
    ],
    foot: "Cada evento se atribuye al último clic de la sesión en la que ocurre",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      La analítica para SaaS tiene que decir qué canales y campañas traen pruebas
      y altas de pago, con una cifra que no dependa de quién aceptó el banner de
      consentimiento. Los equipos self-serve suelen leer la captación en GA4,
      que no registra a quien rechaza el banner, y en las plataformas
      publicitarias, que atribuyen las altas a sus propios anuncios. Sealmetrics
      cuenta visitas sin cookies y atribuye cada conversión al último clic de la
      sesión en la que ocurre. Un alta es una conversión con importe 0; la
      elección de plan y cada paso del formulario son microconversiones, y una
      propiedad de plan muestra qué campañas traen qué planes. Con el mismo
      tracker en la web y en el subdominio de la app, la sesión conserva su
      origen. Nada une visitas de sesiones distintas, así que una
      prueba que empieza hoy y un pago tres semanas después son eventos
      separados: Sealmetrics no mide la conversión de prueba a pago por cuenta, ni
      cohortes de activación ni retención.
    </p>
  ),

  divergence: {
    tag: "Por qué el informe de altas engaña",
    title: <>El alta es real.<br /><em>Su origen, una suposición.</em></>,
    body: "Un equipo self-serve se hace las mismas preguntas de captación cada semana. Hoy las responde una herramienta que o pierde parte del tráfico antes del formulario o se pone nota a sí misma, y una de ellas corresponde a otra herramienta.",
    headers: ["La pregunta de cada semana", "Dónde se responde hoy", "Qué falla", "Qué cambia al medirlo"],
    rows: [
      ["¿Qué canal trae pruebas?", "Informes de adquisición de GA4", "No se registra a quien rechaza el banner, y no por igual en todos los canales; las altas sin origen utilizable acaban en Direct o Unassigned", "Altas por source, medium y campaign, contadas sin pérdida por consentimiento"],
      ["¿Qué campaña trae pruebas?", "Informes de las plataformas publicitarias", "Cada plataforma se atribuye las altas de sus anuncios, con su propia ventana de atribución", "Altas por utm_campaign y utm_content, leídas de la página de llegada de la sesión"],
      ["¿Dónde pierde gente el formulario?", "Herramienta de formularios o exploración de embudo de GA4", "Construido solo con las sesiones que se registraron", "Una microconversión por paso, comparada por source, medium y campaign"],
      ["¿Qué campañas traen qué planes?", "Sistema de facturación", "Conoce el plan, no el canal de la visita", "Una propiedad de plan en el alta o la suscripción, desglosada por campaña"],
      ["¿La prueba acabó en cuenta de pago?", "Facturación y analítica de producto", "Nada: conocen la cuenta, que es lo que esta pregunta necesita", "Se sigue respondiendo allí. Sealmetrics no une un pago posterior con la visita que inició la prueba"],
    ],
    note: (
      <>
        Todavía no hay publicada una medición en paralelo en un SaaS, pero la
        pérdida se puede medir en otras webs. Cuando{" "}
        <Link className={link} href="/es/case-studies/incapto/">Incapto</Link>, una
        marca de eCommerce en Shopify, midió con GA4 y Sealmetrics a la vez durante
        48 días, GA4 no registró el 29% de las visitas, y la diferencia fue desigual
        por canal. Por qué las herramientas que dependen del consentimiento pierden
        ese tráfico se explica en{" "}
        <Link className={link} href="/es/glossary/data-loss-in-analytics/">pérdida de datos en analítica</Link>;
        el modelo de eventos que hay detrás de los pasos del alta, en{" "}
        <Link className={link} href="/es/glossary/event-tracking/">seguimiento de eventos</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que le cuesta a un SaaS medir mal",
    title: <>El presupuesto sigue<br /><em>a las pruebas que ves.</em></>,
    body: "La pérdida por consentimiento no quita altas por igual. Cambia qué canales parecen funcionar, y cada deformación cae sobre una decisión del equipo de growth.",
    items: [
      ["01", "Búsqueda y contenido infravalorados", "Los canales que llegan a quien todavía no conoce el producto pueden perder más que el directo. En la tienda de Incapto, Sealmetrics registró un 11% más de tráfico directo que GA4, pero un 62% más desde búsqueda orgánica. Si una web SaaS sigue el mismo patrón, el presupuesto de blog y SEO se juzga con la cifra pequeña."],
      ["02", "Coste por alta sobre un denominador parcial", "El coste por alta divide la inversión de cada plataforma entre las altas que se registraron. Si las que faltan no se reparten por igual, el canal que parece más barato en el informe puede no serlo."],
      ["03", "Cambios en el formulario probados sobre una muestra filtrada", "Una caída entre pasos del alta leída solo en sesiones con consentimiento describe a quien aceptó el banner. Los cambios en el flujo se evalúan entonces sobre una muestra que eligió el banner."],
    ],
  },

  method: {
    id: "method",
    tag: "Cómo se mide el flujo de alta",
    title: <>Etiqueta el flujo.<br /><em>Después lee los canales.</em></>,
    body: (
      <>
        Cada paso sigue la guía de implementación para SaaS de la documentación de
        Sealmetrics. Las reglas de atribución que hay detrás de las cifras por canal
        se explican en{" "}
        <Link className={link} href="/es/use-cases/revenue-attribution/">atribución de ingresos</Link>.
      </>
    ),
    howToName: "Cómo mide un equipo SaaS su flujo de alta por canal sin cookies",
    howToDescription:
      "Seis pasos para que un SaaS self-serve registre con Sealmetrics los pasos del alta, las altas y los pagos, y los lea por canal, campaña y plan.",
    steps: [
      { name: "Instala el mismo tracker en la web comercial y en la app", text: "Añade el tracker de Sealmetrics con el mismo ID de cuenta en la web comercial y en la app. Pasar de www a app dentro del mismo dominio raíz es navegación interna, así que la sesión conserva su origen. Las aplicaciones de una sola página que usan la History API se miden en cada cambio de ruta sin código adicional." },
      { name: "Agrupa precios, blog, documentación y app", text: "Añade el parámetro group al tracker, por ejemplo group=pricing, group=blog, group=docs o group=app, para leer por separado las páginas de captación y las de la app en el informe de páginas." },
      { name: "Lanza una microconversión en cada paso del alta", text: "Llama a sealmetrics.micro() al elegir plan, al pulsar el botón de empezar la prueba y en cada paso del formulario, con propiedades como el plan o la facturación. Nunca pongas en una propiedad un email, un nombre o un ID de cuenta." },
      { name: "Registra altas y pagos como conversiones", text: "Lanza una conversión signup con importe 0 en la página que se muestra al crear la cuenta, y una conversión de suscripción o de upgrade con su importe cuando se completa un pago en tu web. Cada una se atribuye al último clic de la sesión en la que ocurre, así que un pago semanas después de la prueba se atribuye a esa visita posterior." },
      { name: "Registra los dominios externos de login y pago", text: "Si el alta pasa por un proveedor de SSO, un dominio de cuentas o una página de pago alojada en otro dominio, registra ese dominio como passthrough referrer con la API, para que la vuelta conserve el origen en lugar de abrir una visita de referral. Las principales pasarelas de pago ya están en una lista incorporada." },
      { name: "Lee las altas por campaña y plan", text: "Compara las conversiones por source, medium y campaign. La tabla de embudo por UTM muestra una columna por tipo de microconversión y de conversión en cada campaña, y el informe de propiedades desglosa la propiedad de plan por campaña. La conversión de prueba a pago por cuenta sigue en la facturación o en la analítica de producto." },
    ],
  },

  examples: {
    tag: "Las llamadas",
    title: <>Tres eventos<br /><em>de la documentación.</em></>,
    body: (
      <>
        Copiados de la guía de implementación para SaaS. El primero es una
        microconversión sin valor; los otros dos son conversiones. Las propiedades
        describen el plan, nunca a la persona.
      </>
    ),
    items: [
      { name: "Un paso del formulario de alta", description: "Una microconversión por paso, lanzada al completar el campo.", code: CODE_STEP },
      { name: "Cuenta creada", description: "La conversión de alta, con importe 0 y el plan como propiedad.", code: CODE_SIGNUP },
      { name: "De prueba a pago", description: "La conversión de suscripción con el precio del plan, lanzada cuando el pago se completa.", code: CODE_SUBSCRIPTION },
    ],
  },

  roles: {
    tag: "Quién lo usa en un equipo SaaS",
    title: <>Una cifra de altas,<br /><em>cuatro mesas.</em></>,
    body: "Cada equipo conserva sus herramientas. Lo que cambia es la cifra de captación sobre la que toma sus decisiones de cada semana.",
    items: [
      { role: "Responsable de growth", need: "Saber qué canales y campañas traen pruebas y altas de pago.", how: "Altas y suscripciones por source, medium y campaign, contadas sin pérdida por consentimiento.", link: { label: "Atribución de ingresos", href: "/es/use-cases/revenue-attribution/" } },
      { role: "Performance marketing", need: "Evaluar campañas de pago fuera del informe de cada plataforma.", how: "Altas por campaña y creatividad a partir de las UTM de la página de llegada, cruzadas con la inversión en una hoja de cálculo o en BigQuery.", link: { label: "Seguimiento de Google Ads", href: "/es/integrations/google-ads/" } },
      { role: "Producto y CRO", need: "Encontrar el paso del alta que más gente pierde, por fuente.", how: "Una microconversión por paso del formulario, comparada por campaña. La activación dentro del producto sigue en la analítica de producto.", link: { label: "Seguimiento de eventos", href: "/es/glossary/event-tracking/" } },
      { role: "Datos y BI", need: "Poner la captación junto a la facturación sin copiar datos personales.", how: "El conector de BigQuery, incluido en todos los planes, escribe las conversiones con sus propiedades por source, medium y campaign; la comparación con la facturación se hace sobre agregados como la fecha y el plan.", link: { label: "Conector de BigQuery", href: "/es/integrations/bigquery/" } },
    ],
  },

  proof: {
    tag: "Lo que hay medido",
    body: "No hay publicado ningún caso de cliente SaaS, así que esta página no cita ninguno. Las cifras de abajo son de Incapto, una marca de café de especialidad que vende en Shopify, medida en paralelo con GA4. Enseñan lo desigual que es la pérdida por consentimiento según el canal en una web real; son contexto para el método, no un resultado de SaaS.",
    figures: [
      { value: "29%", label: "de las visitas que GA4 no registró en 48 días en una tienda Shopify", client: "Incapto · eCommerce", href: "/es/case-studies/incapto/" },
      { value: "+62%", label: "más tráfico de búsqueda orgánica registrado que GA4, frente a un +11% en directo", client: "Incapto · eCommerce", href: "/es/case-studies/incapto/" },
      { value: "96%", label: "de los pedidos reales de la tienda online registrados, conciliados antes de comparar canales", client: "Incapto · eCommerce", href: "/es/case-studies/incapto/" },
    ],
    readCase: "Leer el caso",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Mide la captación.<br /><em>No la cuenta.</em></>,
    body: (
      <>
        Estos límites vienen de medir sin identificar a nadie. La atribución es a
        último clic dentro de cada sesión, por diseño; los{" "}
        <Link className={link} href="/es/glossary/attribution-model/">modelos de atribución</Link>{" "}
        explican la diferencia, y lo que pasa después del login corresponde a
        herramientas que conocen al usuario.
      </>
    ),
    items: [
      ["Sin prueba a pago por cuenta", "Una prueba y un pago semanas después son eventos separados en sesiones distintas. El pago se atribuye a la visita en la que ocurre, no a la campaña que inició la prueba."],
      ["Sin cohortes, activación ni retención", "No hay ID de usuario, así que no hay cohortes de alta, activación a 7 días ni curvas de bajas. Eso sigue en la analítica de producto y en la facturación."],
      ["Sin gráfico de embudo propio", "El informe de embudo dibuja una secuencia fija de eCommerce. Los pasos del alta son microconversiones, que se leen por tipo y por campaña, no como un embudo SaaS dibujado."],
      ["Sin datos de cuenta ni de empresa", "Ni emails, ni IDs de cuenta, ni identificación de empresas, y las propiedades no pueden llevar datos personales. No te dirá qué empresas visitaron la página de precios."],
      ["Las renovaciones no tienen visita", "Una renovación que cobra automáticamente el sistema de facturación no tiene una sesión detrás, así que no hay nada a lo que atribuirla."],
      ["No alimenta las plataformas publicitarias", "Sealmetrics no envía conversiones a las plataformas ni importa la inversión. Mantén sus etiquetas para pujar."],
    ],
  },

  faqTag: "Lo que preguntan los equipos SaaS",
  faqTitle: <>Antes de cambiar<br /><em>cómo se cuentan las altas.</em></>,
  faq: [
    { question: "¿Cómo se atribuyen las altas de prueba de un SaaS a los canales sin cookies?", answer: "Lanzando una conversión signup con importe 0 en la página que se muestra al crear la cuenta. Sealmetrics lee el canal en la página de llegada de la sesión, con sus UTM, identificadores de clic o referrer, y atribuye el alta al último clic de esa sesión. También cuenta a quien rechaza el banner, porque no interviene ninguna cookie ni identificador guardado." },
    { question: "¿Puede Sealmetrics medir la conversión de prueba a pago?", answer: "No por cuenta. No identifica visitantes entre sesiones, así que no puede unir un pago con la prueba que lo precedió. Se puede leer la proporción entre suscripciones y altas en un periodo, pero no es una cohorte: los pagos de un mes vienen en parte de pruebas iniciadas antes, y cada pago se atribuye a la sesión en la que ocurre. La conversión de prueba a pago por cuenta corresponde a la facturación o a la analítica de producto." },
    { question: "¿Conserva el origen si el alta se hace dentro de la app?", answer: "Sí, cuando la web comercial y la app usan la misma cuenta del tracker y comparten dominio raíz: pasar de www a app es navegación interna, así que la sesión conserva su origen. Si el flujo pasa por una página de login o de pago en otro dominio, registra ese dominio como passthrough referrer con la API de Sealmetrics." },
    { question: "¿Puedo ver qué campañas traen qué planes?", answer: "Sí. Añade una propiedad como el plan o el ciclo de facturación a la conversión de alta o de suscripción. El informe de propiedades desglosa cada valor por source, medium y campaign, y el conector de BigQuery exporta las conversiones con sus propiedades. No pongas emails, nombres ni IDs de cuenta en las propiedades." },
    { question: "¿Sealmetrics sustituye a las herramientas de analítica de producto?", answer: "No. Las herramientas de analítica de producto identifican al usuario tras el login para medir activación, adopción de funcionalidades y retención; Sealmetrics no identifica a nadie. Cubre la web comercial y el flujo de alta, donde los visitantes son anónimos y el banner de consentimiento se lleva parte de la cifra, y puede convivir con una herramienta de producto sin solaparse." },
    { question: "¿Qué planes de Sealmetrics incluyen la API, el servidor MCP y BigQuery?", answer: "Todos. La API REST, el servidor MCP y el conector de BigQuery están incluidos en todos los planes, desde el nivel gratuito Agentic, que cubre 1 millón de eventos en toda la vida de la cuenta y no pide tarjeta, hasta Growth, Scale y Enterprise." },
    { question: "¿La web comercial de un SaaS sigue necesitando banner de consentimiento?", answer: "Sealmetrics no instala cookies ni guarda nada en el dispositivo del visitante. Las etiquetas publicitarias, los chats, la grabación de sesiones y la analítica de producto que identifica usuarios normalmente sí lo hacen, y siguen necesitando consentimiento. Que tu analítica quede exenta de consentimiento depende de su configuración y de los criterios de tu autoridad nacional." },
  ],

  final: {
    tag: "Revisión de medición de altas",
    title: <>Trae tu flujo de alta.<br /><em>Mira qué canales cambian.</em></>,
    body: "Treinta minutos: miramos cómo está etiquetado hoy tu flujo de alta y qué reporta tu analítica por canal, y te enseñamos cómo se configurarían los pasos, las altas y las propiedades de plan.",
    primary: { label: "Reservar una revisión de altas", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
