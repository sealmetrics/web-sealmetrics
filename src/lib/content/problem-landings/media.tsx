import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /for/media — vertical page for media companies and publishers, rebuilt from
 * VerticalPageV3 onto the problem-landing template.
 *
 * A publisher loses readers twice before they are counted: at the consent
 * banner and to ad blockers that recognise the tracking domain. The page
 * answers with the first-party subdomain, content groups for sections, and
 * newsletter and subscription sign-ups as conversions — and is explicit that
 * first-party reduces blocker loss rather than removing it, and that nothing
 * here is a reader profile.
 *
 * Product facts from docs.sealmetrics.com (checked 15 Sep 2026):
 * - tracker/first-party: tracker served from a subdomain of the customer's own
 *   domain; Settings → Pixels shows the subdomain; A record in DNS; the team
 *   completes the server side after an email; replace the t.sealmetrics.com
 *   snippet, never run both (pageviews counted twice); tracker options such as
 *   group work the same
 * - security-privacy/adblocker-bypass: blockers such as uBlock Origin, AdBlock
 *   Plus and Brave Shields work from lists of third-party tracking domains; a
 *   first-party subdomain does not match them, which reduces, not eliminates,
 *   blocker loss; a custom filter rule can still block it. The docs' "25–40% of
 *   tech-literate audiences" figure is NOT used here: it has no cited source
 * - use-cases/content-media: content groups via the tracker `group` parameter
 *   (home, article, category, author, video, podcast); reading microconversions
 *   (scroll 25/50/75/100%, time-on-article thresholds 30/60/120/300 s,
 *   engaged_reader after 50% scroll and 30 s); newsletter_signup and
 *   subscription as conversions; paywall_shown and plan_selected as
 *   microconversions. The code examples are copied from that guide
 * - implementation/content-site-structure/content-grouping: group parameter or
 *   sealmetrics({ group }) for SPAs
 * - platform/settings/tracking/content-grouping: dashboard URL rules are saved
 *   in the browser's local storage only, not shared with teammates
 * - reports/pages: content group badge on pages and landing pages, filter on
 *   All Pages; Landing Pages tab shows microconversions, conversions and revenue
 *   attributed to each landing page
 * - reports/properties: properties of conversions and microconversions by
 *   source, medium and campaign
 * - integrations/bigquery: fact_traffic_daily, fact_conversions,
 *   fact_microconversions, fact_pages, fact_landing_pages; on every plan
 * - attribution: last click per session, no cross-session join
 *
 * Deliberately NOT claimed: any ad-server, SSP, Google Ad Manager or Prebid
 * integration (none is documented); "subscription paths", "lifetime value by
 * acquisition content" and "funnel from article read to subscription" (listed
 * in the docs guide, but they need cross-session joins or a custom funnel that
 * the Funnel report does not support); per-reader engagement time; referrer
 * mappings (the docs say the pipeline does not read them yet).
 *
 * Removed from the old VerticalPageV3 version: "your audience runs ad blockers
 * at 50%+ rates", "50% of your readers invisible to GA4", "see the 50% of your
 * audience GA4 can't" and the TL;DR's "50–70% of visitors run ad blockers" (no
 * source); "5/5 blockers passed" (the only test in the repo is a noindex blog
 * post, and it compares against lightweight tools the site does not position
 * against); "real-time yield optimization" and "programmatic decisions on
 * complete data"; "pipe Sealmetrics into Google Ad Manager, Prebid, or pull GAM
 * data into Sealmetrics" (no such integration); "read → hit → subscribe
 * attributed to the originating channel" (the subscription is credited to its
 * own session); "all first-party, all consent-independent" (the default install
 * is third-party); "ad-revenue attribution" in metadata; the shared categorical
 * GDPR, migration and setup FAQs. No media case exists: proof says so and uses
 * Incapto figures only as labelled eCommerce context.
 */

export const MEDIA_PUBLISHED = "2026-03-02";
export const MEDIA_PUBLISHED_ES = "2026-04-18";
export const MEDIA_MODIFIED = "2026-09-15";

const link = "sig-problem-inline";

const CODE_GROUP = `<!-- Article pages -->
<script src="https://t.sealmetrics.com/t.js?id=YOUR_ID&group=article" defer></script>`;

const CODE_NEWSLETTER = `document.querySelectorAll('.newsletter-form').forEach(function(form) {
  form.addEventListener('submit', function(e) {
    sealmetrics.conv('newsletter_signup', 0, {
      form_location: this.dataset.location,  // 'header', 'footer', 'inline', 'popup'
      article_id: document.body.dataset.postId || 'none',
      category: document.body.dataset.category || 'none'
    });
  });
});`;

const CODE_PAYWALL = `document.addEventListener('paywallShown', function(e) {
  sealmetrics.micro('paywall_shown', {
    article_id: document.body.dataset.postId,
    content_type: e.detail.contentType  // 'premium', 'members_only'
  });
});`;

export const mediaEn: ProblemLandingContent = {
  route: "/for/media",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "For teams", href: "/for/" },
    { label: "Media" },
  ],
  eyebrow: "Industry · Media and publishers",
  h1: <>The article<br />was read.<br /><em>The report missed it.</em></>,
  heroBody:
    "A publisher's audience comes from search, social, newsletters and referrals, and it is counted by analytics that loses readers twice: at the consent banner, and to ad blockers that recognise the tracking domain. Sealmetrics counts pageviews without cookies from a subdomain of your own domain, reads the site by section and credits newsletter and subscription sign-ups to the last click of their session.",
  heroPrimary: { label: "See how to read sections", href: "#method" },
  heroSecondary: { label: "Why the gap is uneven", href: "/complete-data/" },
  heroMicro: "Content groups · first-party subdomain · newsletter and subscription conversions · last click per session · EU-hosted in Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: MEDIA_MODIFIED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "Publisher setup · what gets recorded",
    status: "Your subdomain",
    rows: [
      ["Article page", "Pageview · group=article"],
      ["Paywall shown", "Microconversion"],
      ["Newsletter sign-up", "Conversion · amount 0"],
      ["Subscription", "Conversion · plan price"],
    ],
    foot: "Tracker served from your own subdomain · each event credited to the last click of its session",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Analytics for media and publishers has to show which sections, channels and
      articles bring readers, newsletter sign-ups and subscriptions, on a count
      that is not decided by the consent banner or by a blocklist. Publisher
      analytics loses readers twice: tools that wait for consent do not record
      visitors who reject the banner, and ad blockers stop scripts loaded from
      known third-party tracking domains. Sealmetrics counts pageviews without
      cookies. Served from a subdomain of the publisher&apos;s own domain, its
      tracker does not match those lists, which reduces the loss to blockers but
      does not remove it: a custom filter rule can still block it. A group
      parameter sorts pages into sections such as article, category or video, and
      newsletter and subscription sign-ups are conversions credited to the last
      click of their session. It builds no reader profiles, measures no
      engagement time per reader and does not follow a reader from paywall to
      subscription across visits.
    </p>
  ),

  divergence: {
    tag: "Why the audience report misleads",
    title: <>The reader was there.<br /><em>The count was not.</em></>,
    body: "An audience team asks the same questions every week. Each answer passes through a filter that removes part of the readership before it is counted, and it does not remove the same share everywhere.",
    headers: ["The weekly question", "Where it is answered today", "What goes wrong", "What changes when it is measured"],
    rows: [
      ["How much was each section read?", "GA4 pages and screens report", "Readers who reject the banner or block the analytics script are missing", "Pageviews by content group, counted without cookies from your own subdomain"],
      ["Which channels bring readers?", "GA4 acquisition reports", "The loss differs by channel; traffic with no usable source lands in Direct or Unassigned", "Entrances by source, medium and referrer, without consent loss"],
      ["Does the newsletter bring readers to the site?", "Email platform click report", "It counts clicks in the email, not the visits that reach the site", "Visits and sign-ups from UTM-tagged newsletter links, credited to that session"],
      ["Which articles start the visits that sign up?", "Newsletter tool and GA4 conversions", "A sign-up from a visit that was not recorded has no page and no channel", "Newsletter sign-ups by landing page, content group and campaign"],
      ["What happens at the paywall?", "Subscription platform", "Knows the subscriber, not the channel of the visit", "Paywall views as microconversions and subscriptions as conversions, by source and campaign"],
    ],
    note: (
      <>
        No publisher parallel run is published yet. On a different kind of site,{" "}
        <Link className={link} href="/case-studies/incapto/">Incapto</Link>, an
        eCommerce brand on Shopify, GA4 did not record 29% of visits and 45% of
        pageviews over 48 days, and the gap was largest in the channels a
        publisher depends on. How ad blockers add to consent loss is covered under{" "}
        <Link className={link} href="/glossary/ad-blocker-analytics-impact/">ad-blocker impact on analytics</Link>;
        why a subdomain of your own site changes the picture, under{" "}
        <Link className={link} href="/glossary/first-party-data-collection/">first-party data collection</Link>.
      </>
    ),
  },

  costs: {
    tag: "What the wrong count costs a publisher",
    title: <>Sections judged<br /><em>on who stayed visible.</em></>,
    body: "Losing readers at the banner and to blockers does not shrink every report by the same amount. It changes which sections, channels and articles look like they work.",
    items: [
      ["01", "Deep reading under-counted", "At Incapto, GA4 missed 45% of pageviews but 29% of visits, because the visits it did not record browsed 3.3 pages against 1.6. On a publication, the same pattern would make the sections people read in depth look smaller than they are."],
      ["02", "Distribution channels under-credited", "In Incapto's parallel run, Sealmetrics recorded 11% more direct traffic than GA4, but 26% more from email, 62% more from organic search and 133% more from organic social. Those are the channels where a publisher finds readers, and effort drifts toward whatever the consent-based report shows."],
      ["03", "Sign-ups with no source", "A newsletter or subscription sign-up from a visit that was never recorded has no landing page and no channel. The articles and campaigns that grow the list cannot be told apart from the ones that do not."],
    ],
  },

  method: {
    id: "method",
    tag: "Reading sections, channels and sign-ups",
    title: <>Group the pages.<br /><em>Then count the sign-ups.</em></>,
    body: (
      <>
        Each step follows the content and media guide in the Sealmetrics
        documentation. The attribution rules behind the channel numbers are set out
        in{" "}
        <Link className={link} href="/use-cases/revenue-attribution/">revenue attribution</Link>.
      </>
    ),
    howToName: "How a publisher measures sections, channels and sign-ups without cookies",
    howToDescription:
      "Six steps for a media company or publisher to serve the Sealmetrics tracker from its own subdomain, group pages into sections, record newsletter and subscription sign-ups and read them by channel.",
    steps: [
      { name: "Serve the tracker from your own subdomain", text: "In Settings → Pixels, copy the subdomain to create, add an A record for it in your DNS and tell Sealmetrics, which completes the server side. Then replace the t.sealmetrics.com snippet with the one served from your subdomain. Do not run both, or pageviews are counted twice." },
      { name: "Add a content group to every template", text: "Add the group parameter to the tracker in each template, for example group=home, group=article, group=category, group=author or group=video. On single-page sites, set it with sealmetrics({ group }) on each route. The Pages report then shows the group next to each page and filters by it." },
      { name: "Tag newsletter and social links with UTMs", text: "Put utm_source, utm_medium and utm_campaign on every newsletter link and on the links you publish on social platforms and partner sites, so those visits are classified by the campaign rather than by whatever referrer arrives with them." },
      { name: "Record newsletter and subscription sign-ups as conversions", text: "Fire a newsletter_signup conversion with amount 0 when the sign-up succeeds, and a subscription conversion with the plan price when a reader subscribes. Track the paywall being shown and the plan being selected as microconversions." },
      { name: "Add reading microconversions only where they answer a question", text: "Scroll milestones at 25, 50, 75 and 100% of the article, time-on-article thresholds or an engaged_reader event after 50% scroll and 30 seconds are microconversions. They count how often articles reach each milestone, not how long any one reader stays." },
      { name: "Read by section, landing page and channel", text: "Filter the Pages report by content group, compare conversions by landing page and by source, medium and campaign, and use the Properties report to break properties such as category or form location down by campaign." },
    ],
  },

  examples: {
    tag: "The calls",
    title: <>Three snippets<br /><em>from the docs.</em></>,
    body: (
      <>
        Copied from the content and media guide. Once the first-party subdomain is
        live, the tracker loads from it instead of t.sealmetrics.com and the group
        parameter works the same. Properties describe the article, never the reader.
      </>
    ),
    items: [
      { name: "A section", description: "The group parameter on the tracker in the article template.", code: CODE_GROUP },
      { name: "Newsletter sign-up", description: "A conversion with amount 0, carrying where the form was and the article's category.", code: CODE_NEWSLETTER },
      { name: "Paywall shown", description: "A microconversion fired when the paywall appears, with the article and content type.", code: CODE_PAYWALL },
    ],
  },

  roles: {
    tag: "Who uses it in a newsroom",
    title: <>One reader count,<br /><em>four desks.</em></>,
    body: "Each team keeps its tools. What changes is the count its weekly editorial and commercial decisions are built on.",
    items: [
      { role: "Audience development", need: "Know which channels bring readers to each section.", how: "Entrances and pageviews by source, medium and content group, counted without consent loss.", link: { label: "UTM parameters", href: "/glossary/utm-parameters/" } },
      { role: "Newsletter and CRM", need: "See which articles and campaigns grow the list.", how: "Newsletter sign-ups as conversions, by landing page and by the UTMs of the email or social link.", link: { label: "Conversion tracking", href: "/use-cases/conversion-tracking/" } },
      { role: "Subscriptions", need: "Understand where paywall views turn into subscriptions.", how: "Paywall views as microconversions and subscriptions with their price as conversions, by source and campaign. Subscriber history stays in the subscription platform.", link: { label: "Revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "Data and BI", need: "Build section and channel dashboards on a count the newsroom accepts.", how: "The BigQuery connector, included on every plan, writes daily traffic, pages, landing pages, conversions and microconversions to your own project.", link: { label: "BigQuery connector", href: "/integrations/bigquery/" } },
    ],
  },

  proof: {
    tag: "Evidence so far",
    body: "No media or publisher customer case is published, so this page quotes none. The figures below come from Incapto, a specialty coffee eCommerce brand on Shopify, measured in parallel with GA4. They show how uneven the loss is by channel and by browsing depth on a real site; they are context, not a publisher result.",
    figures: [
      { value: "45%", label: "of pageviews GA4 did not record over 48 days, against 29% of visits", client: "Incapto · eCommerce", href: "/case-studies/incapto/" },
      { value: "+26%", label: "more email traffic recorded than GA4 over ten days, and +62% from organic search", client: "Incapto · eCommerce", href: "/case-studies/incapto/" },
      { value: "3.3", label: "pages per visit in the visits GA4 missed, against 1.6 in those it recorded", client: "Incapto · eCommerce", href: "/case-studies/incapto/" },
    ],
    readCase: "Read the case",
  },

  limits: {
    tag: "What it does not do",
    title: <>It counts readers.<br /><em>It does not know them.</em></>,
    body: (
      <>
        These limits come from measuring without identifying anyone, and from how
        ad blockers work. Attribution is{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last click</Link>{" "}
        within each session, by design.
      </>
    ),
    items: [
      ["Not unblockable", "Served from your subdomain, the tracker is far less likely to be blocked, but a custom filter rule can still target it. The default t.sealmetrics.com address is a third-party request that blocklists can include."],
      ["No reader profiles", "No reader IDs, reading history or engagement time per reader. A reader who comes back tomorrow is a new visit."],
      ["No paywall journeys", "Paywall views and subscriptions are counted as events by source and campaign. Sealmetrics does not follow one reader from a first article to a later subscription."],
      ["No subscriber analytics", "Churn, renewals and lifetime value per subscriber stay in the subscription platform. An automatic renewal has no visit behind it."],
      ["No ad-server integration", "Sealmetrics does not connect to ad servers or SSPs and sends them nothing. Joining ad revenue with pages is done outside it, for example in BigQuery."],
      ["Groups come from your templates", "Set the group parameter in the page templates. Content groups defined as URL rules in the dashboard are stored in your browser only and are not shared with teammates."],
    ],
  },

  faqTag: "Questions publishers ask",
  faqTitle: <>Before you trust<br /><em>next week&apos;s audience report.</em></>,
  faq: [
    { question: "Does Sealmetrics work on sites where many readers use ad blockers?", answer: "Better when the tracker is served from a subdomain of your own domain. Ad blockers such as uBlock Origin, AdBlock Plus and Brave Shields work mostly from lists of known third-party tracking domains, and a first-party subdomain does not match those lists. That reduces the loss; it does not eliminate it, because a custom filter rule can still block your subdomain. The default t.sealmetrics.com address is a third-party request that lists can target." },
    { question: "How do I measure the sections of a publication?", answer: "Add the group parameter to the tracker in each template, such as group=article, group=category or group=video, or set it with JavaScript on single-page sites. The Pages report shows each page's group and filters by it, and landing pages carry the same label next to their entrances and conversions." },
    { question: "Can Sealmetrics attribute newsletter sign-ups to articles and channels?", answer: "Per session, yes. Fire a newsletter_signup conversion when the sign-up succeeds: it is credited to the last click of that session, and the landing pages report shows the page where the session started. A reader who read an article last week and signs up today is credited to today's visit." },
    { question: "Does it support paywall analytics?", answer: "As counts, yes. Track the paywall being shown and the plan being selected as microconversions and the subscription as a conversion with its price, then compare them by source, medium and campaign. It does not follow an individual reader from the paywall to a subscription across visits, and subscriber retention stays in the subscription platform." },
    { question: "Can it measure reading engagement?", answer: "With microconversions: scroll milestones at 25, 50, 75 and 100%, time-on-article thresholds, or an engaged_reader event after 50% scroll and 30 seconds. These count how many times articles reach each milestone. There is no engagement time profile per reader." },
    { question: "Does Sealmetrics integrate with ad servers such as Google Ad Manager?", answer: "No. Sealmetrics has no ad-server or SSP integration and sends no data to them. Traffic, pages and conversions can be exported with the BigQuery connector or read through the REST API, both included on every plan, where a data team can join them with ad revenue from another system." },
    { question: "Does a publisher still need a consent banner?", answer: "Sealmetrics sets no cookies and stores nothing on the reader's device. Advertising, header bidding and audience tags on a publisher site usually do, and still need consent. Whether your analytics setup is exempt from consent depends on its configuration and on your national authority's criteria." },
  ],

  final: {
    tag: "Audience measurement review",
    title: <>Bring one section.<br /><em>See what the count misses.</em></>,
    body: "Thirty minutes: we look at how one section and your newsletter are measured today, and show how content groups, the first-party subdomain and sign-up conversions would be set up.",
    primary: { label: "Book an audience measurement review", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const mediaEs: ProblemLandingContent = {
  route: "/for/media",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Por equipo", href: "/es/for/" },
    { label: "Medios" },
  ],
  eyebrow: "Sector · Medios y editores",
  h1: <>El artículo<br />se leyó.<br /><em>El informe no lo vio.</em></>,
  heroBody:
    "La audiencia de un medio llega desde buscadores, redes sociales, newsletters y enlaces de otras webs, y la cuenta una analítica que pierde lectores dos veces: en el banner de consentimiento y en los bloqueadores que reconocen el dominio de medición. Sealmetrics cuenta páginas vistas sin cookies desde un subdominio de tu propio dominio, lee la web por secciones y atribuye las altas a la newsletter y las suscripciones al último clic de su sesión.",
  heroPrimary: { label: "Ver cómo leer las secciones", href: "#method" },
  heroSecondary: { label: "Por qué la pérdida es desigual", href: "/es/complete-data/" },
  heroMicro: "Grupos de contenido · subdominio propio · conversiones de newsletter y suscripción · último clic por sesión · alojado en Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Actualizado",
    date: MEDIA_MODIFIED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Configuración editorial · qué se registra",
    status: "Tu subdominio",
    rows: [
      ["Página de artículo", "Página vista · group=article"],
      ["Muro de pago mostrado", "Microconversión"],
      ["Alta en la newsletter", "Conversión · importe 0"],
      ["Suscripción", "Conversión · precio del plan"],
    ],
    foot: "Tracker servido desde tu subdominio · cada evento atribuido al último clic de su sesión",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      La analítica para medios y editores tiene que decir qué secciones, canales y
      artículos traen lectores, altas en la newsletter y suscripciones, con una
      cifra que no decidan el banner de consentimiento ni una lista de bloqueo.
      La analítica de un medio pierde lectores dos veces: las herramientas que
      esperan al consentimiento no registran a quien rechaza el banner, y los
      bloqueadores detienen los scripts que cargan desde dominios de tracking de
      terceros conocidos. Sealmetrics cuenta páginas vistas sin cookies. Servido
      desde un subdominio del medio, su tracker no coincide con esas
      listas, lo que reduce la pérdida por bloqueadores sin eliminarla: una regla
      de filtro propia todavía puede bloquearlo. Un parámetro group ordena las
      páginas en secciones como artículo, categoría o vídeo, y las altas en la
      newsletter y las suscripciones son conversiones atribuidas al último clic
      de su sesión. No crea perfiles de lector, no mide tiempo de lectura por
      persona ni sigue a un lector del muro de pago a la suscripción entre visitas.
    </p>
  ),

  divergence: {
    tag: "Por qué el informe de audiencia engaña",
    title: <>El lector estaba.<br /><em>La cifra, no.</em></>,
    body: "Un equipo de audiencia se hace las mismas preguntas cada semana. Cada respuesta pasa por un filtro que quita parte de los lectores antes de contarlos, y no quita la misma proporción en todas partes.",
    headers: ["La pregunta de cada semana", "Dónde se responde hoy", "Qué falla", "Qué cambia al medirlo"],
    rows: [
      ["¿Cuánto se leyó cada sección?", "Informe de páginas y pantallas de GA4", "Faltan los lectores que rechazan el banner o bloquean el script de analítica", "Páginas vistas por grupo de contenido, contadas sin cookies desde tu subdominio"],
      ["¿Qué canales traen lectores?", "Informes de adquisición de GA4", "La pérdida cambia según el canal; el tráfico sin origen utilizable acaba en Direct o Unassigned", "Entradas por source, medium y referrer, sin pérdida por consentimiento"],
      ["¿La newsletter trae lectores a la web?", "Informe de clics de la plataforma de email", "Cuenta clics en el correo, no las visitas que llegan a la web", "Visitas y altas desde enlaces de newsletter con UTM, atribuidas a esa sesión"],
      ["¿Qué artículos abren las visitas que se dan de alta?", "Herramienta de newsletter y conversiones de GA4", "Un alta desde una visita que no se registró no tiene página ni canal", "Altas en la newsletter por página de llegada, grupo de contenido y campaña"],
      ["¿Qué pasa en el muro de pago?", "Plataforma de suscripciones", "Conoce al suscriptor, no el canal de la visita", "Vistas del muro como microconversiones y suscripciones como conversiones, por source y campaign"],
    ],
    note: (
      <>
        Todavía no hay publicada una medición en paralelo en un medio. En otro tipo
        de web,{" "}
        <Link className={link} href="/es/case-studies/incapto/">Incapto</Link>, una
        marca de eCommerce en Shopify, GA4 no registró el 29% de las visitas ni el
        45% de las páginas vistas en 48 días, y la diferencia fue mayor en los
        canales de los que vive un medio. Cómo se suman los bloqueadores a la
        pérdida por consentimiento se explica en{" "}
        <Link className={link} href="/es/glossary/ad-blocker-analytics-impact/">impacto de los ad-blockers en la analítica</Link>;
        por qué un subdominio propio cambia la situación, en{" "}
        <Link className={link} href="/es/glossary/first-party-data-collection/">recogida de datos first-party</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que le cuesta a un medio contar mal",
    title: <>Secciones juzgadas<br /><em>por quien quedó a la vista.</em></>,
    body: "Perder lectores en el banner y en los bloqueadores no encoge todos los informes por igual. Cambia qué secciones, canales y artículos parecen funcionar.",
    items: [
      ["01", "La lectura en profundidad, infracontada", "En Incapto, GA4 no registró el 45% de las páginas vistas, frente al 29% de las visitas, porque las visitas que perdió veían 3,3 páginas frente a 1,6. En un medio, el mismo patrón haría parecer más pequeñas las secciones que se leen a fondo."],
      ["02", "Canales de distribución infravalorados", "En la medición en paralelo de Incapto, Sealmetrics registró un 11% más de tráfico directo que GA4, pero un 26% más desde email, un 62% más desde búsqueda orgánica y un 133% más desde social orgánico. Son los canales donde un medio encuentra lectores, y el esfuerzo se desplaza hacia lo que enseña el informe con consentimiento."],
      ["03", "Altas sin origen", "Un alta en la newsletter o una suscripción desde una visita que nunca se registró no tiene página de llegada ni canal. No se pueden distinguir los artículos y campañas que hacen crecer la lista de los que no."],
    ],
  },

  method: {
    id: "method",
    tag: "Leer secciones, canales y altas",
    title: <>Agrupa las páginas.<br /><em>Después cuenta las altas.</em></>,
    body: (
      <>
        Cada paso sigue la guía para contenido y medios de la documentación de
        Sealmetrics. Las reglas de atribución que hay detrás de las cifras por canal
        se explican en{" "}
        <Link className={link} href="/es/use-cases/revenue-attribution/">atribución de ingresos</Link>.
      </>
    ),
    howToName: "Cómo mide un medio sus secciones, canales y altas sin cookies",
    howToDescription:
      "Seis pasos para que un medio o editor sirva el tracker de Sealmetrics desde su propio subdominio, agrupe las páginas en secciones, registre las altas en la newsletter y las suscripciones, y las lea por canal.",
    steps: [
      { name: "Sirve el tracker desde tu propio subdominio", text: "En Settings → Pixels, copia el subdominio que hay que crear, añade un registro A en tu DNS y avisa a Sealmetrics, que completa la parte de servidor. Después sustituye el snippet de t.sealmetrics.com por el que se sirve desde tu subdominio. No dejes los dos, o las páginas vistas se contarán dos veces." },
      { name: "Añade un grupo de contenido a cada plantilla", text: "Añade el parámetro group al tracker en cada plantilla, por ejemplo group=home, group=article, group=category, group=author o group=video. En webs de una sola página, fíjalo con sealmetrics({ group }) en cada ruta. El informe de páginas muestra entonces el grupo junto a cada página y permite filtrar por él." },
      { name: "Etiqueta con UTM los enlaces de newsletter y redes", text: "Pon utm_source, utm_medium y utm_campaign en todos los enlaces de la newsletter y en los que publicas en redes sociales y webs de socios, para que esas visitas se clasifiquen por la campaña y no por el referrer que llegue con ellas." },
      { name: "Registra las altas y las suscripciones como conversiones", text: "Lanza una conversión newsletter_signup con importe 0 cuando el alta se completa, y una conversión de suscripción con el precio del plan cuando un lector se suscribe. Mide como microconversiones que se muestre el muro de pago y que se elija un plan." },
      { name: "Añade microconversiones de lectura solo donde respondan una pregunta", text: "Los hitos de scroll al 25, 50, 75 y 100% del artículo, los umbrales de tiempo en el artículo o un evento engaged_reader tras el 50% de scroll y 30 segundos son microconversiones. Cuentan cuántas veces los artículos alcanzan cada hito, no cuánto tiempo se queda cada lector." },
      { name: "Lee por sección, página de llegada y canal", text: "Filtra el informe de páginas por grupo de contenido, compara las conversiones por página de llegada y por source, medium y campaign, y usa el informe de propiedades para desglosar por campaña propiedades como la categoría o la ubicación del formulario." },
    ],
  },

  examples: {
    tag: "Las llamadas",
    title: <>Tres fragmentos<br /><em>de la documentación.</em></>,
    body: (
      <>
        Copiados de la guía para contenido y medios. Cuando el subdominio propio
        está activo, el tracker carga desde él en lugar de t.sealmetrics.com y el
        parámetro group funciona igual. Las propiedades describen el artículo, nunca
        al lector.
      </>
    ),
    items: [
      { name: "Una sección", description: "El parámetro group en el tracker de la plantilla de artículo.", code: CODE_GROUP },
      { name: "Alta en la newsletter", description: "Una conversión con importe 0 que indica dónde estaba el formulario y la categoría del artículo.", code: CODE_NEWSLETTER },
      { name: "Muro de pago mostrado", description: "Una microconversión que se lanza al aparecer el muro, con el artículo y el tipo de contenido.", code: CODE_PAYWALL },
    ],
  },

  roles: {
    tag: "Quién lo usa en una redacción",
    title: <>Una cifra de lectores,<br /><em>cuatro mesas.</em></>,
    body: "Cada equipo conserva sus herramientas. Lo que cambia es la cifra sobre la que toma sus decisiones editoriales y comerciales de cada semana.",
    items: [
      { role: "Desarrollo de audiencia", need: "Saber qué canales traen lectores a cada sección.", how: "Entradas y páginas vistas por source, medium y grupo de contenido, contadas sin pérdida por consentimiento.", link: { label: "Pérdida de datos en analítica", href: "/es/glossary/data-loss-in-analytics/" } },
      { role: "Newsletter y CRM", need: "Ver qué artículos y campañas hacen crecer la lista.", how: "Altas en la newsletter como conversiones, por página de llegada y por las UTM del enlace de email o de redes.", link: { label: "Seguimiento de eventos", href: "/es/glossary/event-tracking/" } },
      { role: "Suscripciones", need: "Entender dónde las vistas del muro de pago se convierten en suscripciones.", how: "Vistas del muro como microconversiones y suscripciones con su precio como conversiones, por source y campaign. El historial del suscriptor sigue en la plataforma de suscripciones.", link: { label: "Atribución de ingresos", href: "/es/use-cases/revenue-attribution/" } },
      { role: "Datos y BI", need: "Construir paneles de secciones y canales sobre una cifra que la redacción acepte.", how: "El conector de BigQuery, incluido en todos los planes, escribe en tu propio proyecto el tráfico diario, las páginas, las páginas de llegada, las conversiones y las microconversiones.", link: { label: "Conector de BigQuery", href: "/es/integrations/bigquery/" } },
    ],
  },

  proof: {
    tag: "Lo que hay medido",
    body: "No hay publicado ningún caso de cliente del sector de medios, así que esta página no cita ninguno. Las cifras de abajo son de Incapto, una marca de café de especialidad que vende en Shopify, medida en paralelo con GA4. Enseñan lo desigual que es la pérdida según el canal y la profundidad de navegación en una web real; son contexto, no un resultado de un medio.",
    figures: [
      { value: "45%", label: "de las páginas vistas que GA4 no registró en 48 días, frente al 29% de las visitas", client: "Incapto · eCommerce", href: "/es/case-studies/incapto/" },
      { value: "+26%", label: "más tráfico de email registrado que GA4 en diez días, y un +62% desde búsqueda orgánica", client: "Incapto · eCommerce", href: "/es/case-studies/incapto/" },
      { value: "3,3", label: "páginas por visita en las visitas que GA4 no registró, frente a 1,6 en las que sí", client: "Incapto · eCommerce", href: "/es/case-studies/incapto/" },
    ],
    readCase: "Leer el caso",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Cuenta lectores.<br /><em>No los conoce.</em></>,
    body: (
      <>
        Estos límites vienen de medir sin identificar a nadie y de cómo funcionan
        los bloqueadores. La atribución es a último clic dentro de cada sesión, por
        diseño; los{" "}
        <Link className={link} href="/es/glossary/attribution-model/">modelos de atribución</Link>{" "}
        explican la diferencia.
      </>
    ),
    items: [
      ["No es imbloqueable", "Servido desde tu subdominio, el tracker tiene muchas menos probabilidades de bloquearse, pero una regla de filtro propia todavía puede apuntar a él. La dirección por defecto, t.sealmetrics.com, es una petición de terceros que las listas pueden incluir."],
      ["Sin perfiles de lector", "Sin IDs de lector, historial de lectura ni tiempo de lectura por persona. Un lector que vuelve mañana es una visita nueva."],
      ["Sin recorridos por el muro de pago", "Las vistas del muro y las suscripciones se cuentan como eventos por source y campaign. Sealmetrics no sigue a un lector desde un primer artículo hasta una suscripción posterior."],
      ["Sin analítica de suscriptores", "Las bajas, las renovaciones y el valor de vida por suscriptor siguen en la plataforma de suscripciones. Una renovación automática no tiene una visita detrás."],
      ["Sin integración con servidores de anuncios", "Sealmetrics no se conecta con ad servers ni SSP y no les envía nada. Cruzar los ingresos publicitarios con las páginas se hace fuera, por ejemplo en BigQuery."],
      ["Los grupos salen de tus plantillas", "Fija el parámetro group en las plantillas. Los grupos definidos como reglas de URL en el panel se guardan solo en tu navegador y no se comparten con el equipo."],
    ],
  },

  faqTag: "Lo que preguntan los medios",
  faqTitle: <>Antes de fiarte<br /><em>del próximo informe de audiencia.</em></>,
  faq: [
    { question: "¿Funciona Sealmetrics en webs donde muchos lectores usan bloqueadores?", answer: "Mejor cuando el tracker se sirve desde un subdominio de tu propio dominio. Bloqueadores como uBlock Origin, AdBlock Plus o Brave Shields trabajan sobre todo con listas de dominios de tracking de terceros conocidos, y un subdominio propio no coincide con esas listas. Eso reduce la pérdida, pero no la elimina, porque una regla de filtro propia todavía puede bloquear tu subdominio. La dirección por defecto, t.sealmetrics.com, es una petición de terceros a la que las listas pueden apuntar." },
    { question: "¿Cómo mido las secciones de un medio?", answer: "Añade el parámetro group al tracker en cada plantilla, por ejemplo group=article, group=category o group=video, o fíjalo con JavaScript en webs de una sola página. El informe de páginas muestra el grupo de cada página y permite filtrar por él, y las páginas de llegada llevan la misma etiqueta junto a sus entradas y conversiones." },
    { question: "¿Puede Sealmetrics atribuir las altas en la newsletter a artículos y canales?", answer: "Por sesión, sí. Lanza una conversión newsletter_signup cuando el alta se completa: se atribuye al último clic de esa sesión, y el informe de páginas de llegada muestra la página en la que empezó. Un lector que leyó un artículo la semana pasada y se da de alta hoy se atribuye a la visita de hoy." },
    { question: "¿Sirve para analizar el muro de pago?", answer: "Como recuentos, sí. Mide como microconversiones que se muestre el muro y que se elija un plan, y la suscripción como conversión con su precio; después compáralos por source, medium y campaign. No sigue a un lector concreto desde el muro hasta la suscripción entre visitas, y la retención de suscriptores sigue en la plataforma de suscripciones." },
    { question: "¿Puede medir cuánto se lee?", answer: "Con microconversiones: hitos de scroll al 25, 50, 75 y 100%, umbrales de tiempo en el artículo o un evento engaged_reader tras el 50% de scroll y 30 segundos. Cuentan cuántas veces los artículos alcanzan cada hito. No hay un perfil de tiempo de lectura por lector." },
    { question: "¿Se integra Sealmetrics con servidores de anuncios como Google Ad Manager?", answer: "No. Sealmetrics no tiene integración con ad servers ni SSP y no les envía datos. El tráfico, las páginas y las conversiones se pueden exportar con el conector de BigQuery o leer con la API REST, ambos incluidos en todos los planes, y ahí un equipo de datos puede cruzarlos con los ingresos publicitarios de otro sistema." },
    { question: "¿Un medio sigue necesitando banner de consentimiento?", answer: "Sealmetrics no instala cookies ni guarda nada en el dispositivo del lector. Las etiquetas de publicidad, header bidding y audiencias de un medio normalmente sí lo hacen, y siguen necesitando consentimiento. Que tu analítica quede exenta de consentimiento depende de su configuración y de los criterios de tu autoridad nacional." },
  ],

  final: {
    tag: "Revisión de medición de audiencia",
    title: <>Trae una sección.<br /><em>Mira lo que no se cuenta.</em></>,
    body: "Treinta minutos: miramos cómo se miden hoy una sección y tu newsletter, y te enseñamos cómo se configurarían los grupos de contenido, el subdominio propio y las conversiones de alta.",
    primary: { label: "Reservar una revisión de audiencia", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
