import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /for/hotels — Phase 3 of CONTENT-PLAN-PROBLEM-POSITIONING.md (vertical engine).
 *
 * Uses the problem-landing template because a hotel group arrives with one
 * problem, stated in its own words: direct bookings it cannot credit to a
 * channel. The page answers it along the booking path.
 *
 * Product facts from docs.sealmetrics.com (checked 14 Sep 2026):
 * - passthrough referrers: API-managed, no dashboard screen; built-in list for
 *   major payment gateways; account-specific for booking engines; not inherited
 *   when a new brand, market or property gets its own account
 *   (platform/tracking-and-attribution-settings/*)
 * - one domain and its subdomains per site, no cross-site tracking
 *   (platform/account-setup/how-to-add-domains)
 * - the base tracker must load before sealmetrics.conv(); conversions take
 *   free-form properties (implementation/tracker/conversions)
 * - off-site bookings (phone, back office) and confirmation pages that never
 *   load have no browser event (troubleshooting/erp-crm-database-discrepancy)
 * - organizations hold many sites; members can be limited to assigned sites
 *   (platform/organizations); unlimited websites and portfolio view per
 *   PricingSignal.tsx
 *
 * The old page's claims that were not in the docs are gone: PMS "webhooks"
 * (Sealmetrics webhooks are alerts, not a PMS feed), "defensible under GDPR"
 * as a flat statement, and the SoftwareApplication schema's "100% traffic
 * capture" (D8).
 *
 * Figures: Palladium Hotel Group and Dreamplace Hotels, as published in
 * src/lib/content/case-studies.tsx. No new client names.
 */

export const HOTELS_PUBLISHED = "2026-03-01";
export const HOTELS_PUBLISHED_ES = "2026-04-18";
export const HOTELS_MODIFIED = "2026-09-14";

const link = "sig-problem-inline";

export const hotelsEn: ProblemLandingContent = {
  route: "/for/hotels",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "For teams", href: "/for/" },
    { label: "Hotels" },
  ],
  eyebrow: "Industry · Hotels",
  h1: <>Every booking confirmed.<br />Its channel<br /><em>unknown.</em></>,
  heroBody:
    "At Palladium Hotel Group, 35% of the bookings GA4 recorded had no channel. Sealmetrics measures the direct-booking path without cookies, keeps the original source when the guest crosses to the booking engine or the payment gateway, and gives the group one channel view it can check against its own booking total.",
  heroPrimary: { label: "Map the booking path", href: "#method" },
  heroSecondary: { label: "Read the Palladium case", href: "/case-studies/palladium-hotel-group/" },
  heroMicro: "Booking engines and payment gateways · no cookies · one account for every property · EU-hosted in Dublin",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: HOTELS_MODIFIED,
    dateDisplay: "14 September 2026",
  },
  module: {
    title: "Two hotel groups · published cases",
    status: "Measured",
    rows: [
      ["Inbound traffic with no source or medium", "40%"],
      ["GA4 bookings with no channel", "35%"],
      ["Traffic above Google Analytics", "+30%"],
      ["More sales attributed", "15–20%"],
    ],
    foot: "Palladium Hotel Group (first two) · Dreamplace Hotels (last two) · April 2026",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Analytics for hotels is the measurement of the direct-booking website, from
      the landing page through the availability search, the booking engine and
      the payment gateway to the confirmation. Sealmetrics does it without
      cookies or storage on the guest&apos;s device, so the analytics does not
      wait for the consent banner. Each booking is attributed last click to the
      channel of the session in which it happens, and reported as aggregate
      totals by channel, campaign, country and property. When the booking engine
      or the payment gateway runs on another domain, registering it as a
      passthrough referrer keeps the original source when the guest returns.
      Palladium Hotel Group found that 35% of the bookings GA4 recorded had no
      channel; Dreamplace Hotels attributes 15–20% more sales than its previous
      tool, checked against its CRM total. Bookings made on an OTA&apos;s own
      site never load your website, so Sealmetrics cannot see or attribute them.
    </p>
  ),

  divergence: {
    tag: "Where the booking path breaks",
    title: <>Five steps to a booking.<br /><em>Each one can lose the source.</em></>,
    body: "A hotel booking crosses more systems than a shop checkout: meta-search, a booking engine that often lives on another domain, a payment gateway, 3-D Secure. The channel has to survive all of them.",
    headers: ["Step", "What consent-based analytics loses", "What Sealmetrics does", "What you configure"],
    rows: [
      ["Arrival from meta-search, paid search or social", "The guest who rejects the banner, and the click that brought them", "Reads UTMs and click IDs from the landing URL on every visit", "Consistent UTMs on Google Hotel Ads, meta-search and paid links"],
      ["Availability search", "The strongest intent signal, for the same visitors", "Records the search as a microconversion, with dates and guests as properties", "One microconversion on the search form"],
      ["Jump to the booking engine", "A cross-domain session that relies on cookies accepted on both sides", "Keeps the session on a subdomain; on another domain, a passthrough referrer keeps the source on return", "The engine on your subdomain, or its domain registered through the API"],
      ["Payment gateway and 3-D Secure", "The return, recorded as a referral from the gateway", "Recognises major gateways from a built-in list", "Any gateway not on the list, registered as a passthrough referrer"],
      ["Booking confirmation", "The booking itself stays, but with no channel to credit", "Records the conversion with revenue, currency and booking properties", "One conversion call after the tracker has loaded"],
    ],
    note: (
      <>
        Each booking is credited by{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last-click attribution</Link>{" "}
        within the session, from the{" "}
        <Link className={link} href="/glossary/utm-parameters/">UTM parameters</Link>{" "}
        or the referrer of the landing. How revenue is then read by channel,
        campaign and creative is covered in{" "}
        <Link className={link} href="/use-cases/revenue-attribution/">campaign revenue attribution</Link>.
      </>
    ),
  },

  costs: {
    tag: "What the gap costs a hotel group",
    title: <>The rooms are sold.<br /><em>The channel credit is not.</em></>,
    body: "The booking engine and the CRM know every reservation. The damage is in the budget decisions made on the share of them that analytics cannot credit.",
    items: [
      ["01", "Direct bookings no one can defend", "At Palladium, 40% of inbound traffic had no source or medium and 35% of the bookings GA4 recorded had no channel. Brand teams, departments and agencies came to the same meeting with different numbers."],
      ["02", "Paid media judged on its own report", (
        <>
          Dreamplace attributes 15–20% more sales than its previous tool, and
          Meta and Google were the first budgets to move. In the words of Eduardo
          Martin, Analytics &amp; Campaigns: &ldquo;You shift toward a channel or
          strategy you were not seeing before.&rdquo;
        </>
      )],
      ["03", "Display bought on volume, not intent", "Palladium rebuilt its Display & Video 360 buying around Cost-per-Search, using availability searches in the booking engine as the intent signal. Display Cost-per-Search improved by 165%."],
    ],
  },

  method: {
    id: "method",
    tag: "Set it up on a hotel website",
    title: <>Map the booking path.<br /><em>Then compare with your bookings.</em></>,
    body: (
      <>
        The work is in the booking engine and the gateways, not in the tag. The
        longer version, with PMS reconciliation patterns, is in the guide to{" "}
        <Link className={link} href="/blog/cookieless-analytics-for-hotels/">cookieless analytics for hotels</Link>.
      </>
    ),
    howToName: "How to set up cookieless analytics on a hotel booking website",
    howToDescription:
      "Five steps to measure direct bookings on a hotel website without cookies, keep the source through the booking engine and payment gateway, and check the result against the booking total.",
    steps: [
      { name: "Install the tracker on every page", text: "Add the Sealmetrics tracker to every page of the hotel website, including the booking confirmation page. Serving it from a subdomain of your own through an A record is optional and makes the requests far less likely to be blocked." },
      { name: "Keep the booking engine in the session", text: "If the engine runs on a subdomain of your site, add the tracker to its pages. If it runs on the provider's own domain, register that domain as a passthrough referrer through the Sealmetrics API, so a guest who comes back within the session keeps the original source." },
      { name: "Register the payment gateways", text: "Major payment gateways are recognised from a built-in list. Register any other gateway or 3-D Secure domain your booking flow passes through, so the return is not credited to the gateway." },
      { name: "Record the search and the booking", text: "Fire a microconversion on the availability search and a conversion on the confirmation, with revenue, currency and properties such as check-in date, nights, room type and property. The tracker must load before the conversion call." },
      { name: "Compare with your booking total", text: "Compare the same period, timezone and currency with the booking engine or CRM total, leaving out OTA, phone, group and walk-in bookings and cancellations. Keep GA4 running over a full booking cycle before moving budget." },
    ],
  },

  roles: {
    tag: "Who uses it in a hotel group",
    title: <>One measurement layer.<br /><em>Four teams reading it.</em></>,
    body: "Nobody has to give up their tools. What changes is which number settles the discussion about channels.",
    items: [
      { role: "Direct sales", need: "A channel view agencies and brands accept.", how: "Palladium uses Sealmetrics as the neutral reference that brand teams, departments and agencies read the same way.", link: { label: "One number for every team", href: "/use-cases/single-source-of-truth/" } },
      { role: "Revenue management", need: "Booking window and market by channel.", how: "With check-in date sent as a booking property, bookings can be read by days to arrival and by country next to the channel that produced them.", link: { label: "Conversion tracking without cookies", href: "/use-cases/conversion-tracking/" } },
      { role: "Paid media and agencies", need: "Budget moved on reconciled data.", how: "Dreamplace compares attributed sales with the CRM total, then moves investment toward the channels the previous stack undercounted.", link: { label: "Campaign revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "Legal and DPO", need: "Analytics that stores nothing on the guest's device.", how: "No cookies, no device storage and visitor data hosted in Dublin, with the documents a hotel group's DPO asks for.", link: { label: "Demonstrate compliance", href: "/gdpr-analytics/" } },
    ],
  },

  proof: {
    tag: "Measured in hotel groups",
    quote: {
      text: "The data Sealmetrics delivers is agnostic, unbiased and neutral. There's no black box.",
      cite: "Toni Andújar · Digital & Direct Sales Director · Palladium Hotel Group",
      person: "Toni Andújar",
      role: "Digital & Direct Sales Director, Palladium Hotel Group",
    },
    body: "Two hotel groups run Sealmetrics next to their existing stack. Palladium uses it as the reference brand, departments and agencies accept. Dreamplace, after almost two years, uses it to move paid-media budget, checked against its CRM total.",
    figures: [
      { value: "35%", label: "of the bookings GA4 recorded had no channel", client: "Palladium Hotel Group", href: "/case-studies/palladium-hotel-group/" },
      { value: "+165%", label: "improvement in Display Cost-per-Search after rebuilding the DV360 model", client: "Palladium Hotel Group", href: "/case-studies/palladium-hotel-group/" },
      { value: "15–20%", label: "more sales attributed than the previous tool, against the CRM total", client: "Dreamplace Hotels", href: "/case-studies/dreamplace-hotels/" },
    ],
    readCase: "Read the case",
  },

  limits: {
    tag: "What it does not do",
    title: <>It measures your website.<br /><em>Not the whole distribution mix.</em></>,
    body: (
      <>
        These limits come from where a booking happens. Why a complete count of
        your own website still matters is argued on{" "}
        <Link className={link} href="/complete-data/">complete data</Link>.
      </>
    ),
    items: [
      ["OTA bookings are out of reach", "A booking made on Booking.com, Expedia or another OTA's own site never loads your website, so it has no session to attribute. The OTA extranet stays the source for that channel."],
      ["Bookings with no web session", "Phone, call-centre, group, event and walk-in bookings have no visit behind them. Leave them out of the comparison."],
      ["An engine you cannot tag", "If the booking engine runs on the provider's domain and never returns the guest to a page on yours, the booking cannot be recorded in the browser. Ask the provider for a subdomain or a return to your confirmation page."],
      ["Passthrough referrers are per account", "They are managed through the API, with no dashboard screen, and are not inherited when a new brand, market or property opens its own account."],
      ["Reconciliation is on totals", "Booking references are not stored, so you compare totals and channels with the booking engine or CRM, never booking by booking."],
      ["Last click per session", "No multi-touch model and no view-through. A guest who returns days later by typing your address is credited to direct."],
    ],
  },

  faqTag: "Common hotel questions",
  faqTitle: <>Before you measure<br /><em>your booking path.</em></>,
  faq: [
    { question: "Can Sealmetrics track bookings when the booking engine is on another domain?", answer: "Yes, with configuration. If the engine runs on a subdomain of your site, add the tracker to its pages and the search and booking stay in the same session. If it runs on the provider's domain, register that domain as a passthrough referrer through the Sealmetrics API, so a guest who returns within the session keeps the original source, and record the booking on a confirmation page on your domain." },
    { question: "Does Sealmetrics integrate with my PMS or booking engine?", answer: "There is no PMS-specific plugin. The booking is a standard conversion event fired on the confirmation page, with revenue, currency and any properties you send, such as check-in date or room type. Totals are then compared with the PMS, booking engine or CRM from the reports, the REST API or the BigQuery export." },
    { question: "How does Sealmetrics handle meta-search and OTA traffic?", answer: "Visits from Google Hotel Ads, Trivago or other meta-search sites are credited from their UTMs, click IDs or referrer, like any other channel. A booking made on an OTA's own site never loads your website, so Sealmetrics does not see it; the OTA's extranet stays the source for that channel." },
    { question: "Can a hotel group see every property in one account?", answer: "Yes. Each property or brand website is a site inside one organization, one login can open all of them, and members can be limited to the sites they are assigned. Every plan includes unlimited websites and users and a portfolio view. Passthrough referrers, however, are registered per account." },
    { question: "Why are some bookings credited to a payment gateway?", answer: "When the guest pays on a gateway or 3-D Secure page and returns to your confirmation, the return can start a new visit with the gateway as referrer. Major gateways are recognised from a built-in list; register any other gateway domain as a passthrough referrer through the API, and the booking keeps its original source." },
    { question: "Can revenue managers analyse last-minute versus early bookings?", answer: "Yes, if the booking engine sends the check-in date or days to arrival as a property of the booking conversion. Conversion properties can be broken down by source, medium and campaign, so the booking window can be read next to the channel and the country of the visit." },
    { question: "Do we still need GA4 and the ad pixels?", answer: "They can stay. Sealmetrics does not send conversions to Google Ads or Meta, so the ad platforms keep their own consent-based setup for bidding. Run Sealmetrics and GA4 side by side over a full booking cycle, compare both with the booking total, and then decide which one settles budget discussions." },
    { question: "Does a hotel website need a consent banner for Sealmetrics?", answer: "Sealmetrics sets no cookies and stores nothing on the guest's device. The ad pixels, chat widgets and retargeting tags on a hotel website usually do, and still need consent. Whether your analytics is exempt from consent depends on your configuration and on your national authority's criteria." },
  ],

  final: {
    tag: "Hotel measurement review",
    title: <>Compare with your booking total.<br /><em>See the channels you cannot credit today.</em></>,
    body: "Book 30 minutes with the founder. We map your booking path, from the landing page to the booking engine and the payment gateway, and set up the comparison with your booking engine or CRM total.",
    primary: { label: "Book a hotel measurement review", href: "/demo/" },
    secondary: { label: "Read the Dreamplace case", href: "/case-studies/dreamplace-hotels/" },
  },
};

export const hotelsEs: ProblemLandingContent = {
  route: "/for/hotels",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Por equipo", href: "/es/for/" },
    { label: "Hoteles" },
  ],
  eyebrow: "Sector · Hoteles",
  h1: <>Cada reserva, confirmada.<br />Su canal,<br /><em>desconocido.</em></>,
  heroBody:
    "En Palladium Hotel Group, el 35% de las reservas que registraba GA4 no tenía canal. Sealmetrics mide el recorrido de la venta directa sin cookies, conserva el origen cuando el huésped pasa al motor de reservas o a la pasarela de pago y da al grupo una única visión por canal que puede contrastar con su propio total de reservas.",
  heroPrimary: { label: "Mapear el recorrido de reserva", href: "#method" },
  heroSecondary: { label: "Leer el caso Palladium", href: "/es/case-studies/palladium-hotel-group/" },
  heroMicro: "Motores de reservas y pasarelas de pago · sin cookies · una cuenta para todos los hoteles · alojado en Dublín",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Actualizado",
    date: HOTELS_MODIFIED,
    dateDisplay: "14 de septiembre de 2026",
  },
  module: {
    title: "Dos grupos hoteleros · casos publicados",
    status: "Medido",
    rows: [
      ["Tráfico entrante sin source ni medium", "40%"],
      ["Reservas de GA4 sin canal", "35%"],
      ["Tráfico por encima de Google Analytics", "+30%"],
      ["Más ventas atribuidas", "15–20%"],
    ],
    foot: "Palladium Hotel Group (las dos primeras) · Dreamplace Hotels (las dos últimas) · abril de 2026",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      La analítica para hoteles es la medición de la web de venta directa, desde
      la página de llegada hasta la confirmación, pasando por la búsqueda de
      disponibilidad, el motor de reservas y la pasarela de pago. Sealmetrics la
      hace sin cookies ni almacenamiento en el dispositivo del huésped, así que la
      analítica no espera al banner de consentimiento. Cada reserva se atribuye a
      último clic al canal de la sesión en la que ocurre y se reporta en totales
      agregados por canal, campaña, país y hotel. Cuando el motor de reservas o la
      pasarela de pago están en otro dominio, registrarlos como passthrough
      referrers conserva el origen cuando el huésped vuelve. Palladium Hotel Group
      detectó que el 35% de las reservas que registraba GA4 no tenía canal;
      Dreamplace Hotels atribuye un 15–20% más de ventas que su herramienta
      anterior, contrastado con el total de su CRM. Las reservas hechas en la web
      de una OTA nunca cargan tu web, así que Sealmetrics no puede verlas ni
      atribuirlas.
    </p>
  ),

  divergence: {
    tag: "Dónde se rompe el recorrido de reserva",
    title: <>Cinco pasos hasta la reserva.<br /><em>En cada uno se puede perder el origen.</em></>,
    body: "Una reserva de hotel atraviesa más sistemas que el checkout de una tienda: metabuscadores, un motor de reservas que a menudo vive en otro dominio, una pasarela de pago y 3-D Secure. El canal tiene que sobrevivir a todos.",
    headers: ["Paso", "Qué pierde una analítica con consentimiento", "Qué hace Sealmetrics", "Qué configuras"],
    rows: [
      ["Llegada desde metabuscadores, búsqueda de pago o redes", "Al huésped que rechaza el banner, y el clic que lo trajo", "Lee las UTM y los click IDs de la URL de llegada en cada visita", "UTM coherentes en Google Hotel Ads, metabuscadores y enlaces de pago"],
      ["Búsqueda de disponibilidad", "La señal de intención más fuerte, de esos mismos visitantes", "Registra la búsqueda como microconversión, con fechas y huéspedes como propiedades", "Una microconversión en el formulario de búsqueda"],
      ["Salto al motor de reservas", "Una sesión entre dominios que depende de cookies aceptadas en los dos lados", "Mantiene la sesión en un subdominio; en otro dominio, un passthrough referrer conserva el origen a la vuelta", "El motor en tu subdominio, o su dominio registrado por API"],
      ["Pasarela de pago y 3-D Secure", "La vuelta, registrada como referral de la pasarela", "Reconoce las pasarelas principales con una lista incorporada", "Cualquier pasarela que no esté en la lista, registrada como passthrough referrer"],
      ["Confirmación de la reserva", "La reserva se registra, pero sin canal al que acreditarla", "Registra la conversión con ingresos, moneda y propiedades de la reserva", "Una llamada de conversión cuando el tracker ya ha cargado"],
    ],
    note: (
      <>
        Cada reserva se acredita con{" "}
        <Link className={link} href="/es/glossary/revenue-attribution/">atribución de ingresos</Link>{" "}
        a último clic dentro de la sesión, a partir de las UTM o del referrer de la
        llegada. Cómo se leen después los ingresos por canal, campaña y creatividad
        se explica en{" "}
        <Link className={link} href="/es/use-cases/revenue-attribution/">atribución de ingresos por campaña</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que cuesta el hueco a un grupo hotelero",
    title: <>Las habitaciones se venden.<br /><em>El mérito del canal, no.</em></>,
    body: "El motor de reservas y el CRM conocen cada reserva. El daño está en las decisiones de presupuesto que se toman sobre la parte que la analítica no sabe acreditar.",
    items: [
      ["01", "Venta directa que nadie puede defender", "En Palladium, el 40% del tráfico entrante no tenía source ni medium y el 35% de las reservas que registraba GA4 no tenía canal. Marca, departamentos y agencias llegaban a la misma reunión con cifras distintas."],
      ["02", "Paid media juzgado con su propio informe", (
        <>
          Dreamplace atribuye un 15–20% más de ventas que su herramienta anterior,
          y Meta y Google fueron los primeros presupuestos en moverse. En palabras de
          Eduardo Martin, de Analítica y Campañas: &ldquo;Derivas hacia un canal o
          estrategia que antes no estabas viendo.&rdquo;
        </>
      )],
      ["03", "Display comprado por volumen, no por intención", "Palladium reconstruyó su compra en Display & Video 360 sobre el Coste por Búsqueda, con las búsquedas de disponibilidad del motor de reservas como señal de intención. El Coste por Búsqueda de Display mejoró un 165%."],
    ],
  },

  method: {
    id: "method",
    tag: "Configuración en una web de hotel",
    title: <>Mapea el recorrido de reserva.<br /><em>Después compáralo con tus reservas.</em></>,
    body: (
      <>
        El trabajo está en el motor de reservas y en las pasarelas, no en la
        etiqueta. El método de contraste con reservas reales es el mismo que en{" "}
        <Link className={link} href="/es/use-cases/single-source-of-truth/">una sola cifra para marketing y finanzas</Link>.
      </>
    ),
    howToName: "Cómo configurar analítica sin cookies en la web de reservas de un hotel",
    howToDescription:
      "Cinco pasos para medir la venta directa en la web de un hotel sin cookies, conservar el origen a través del motor de reservas y la pasarela de pago y contrastar el resultado con el total de reservas.",
    steps: [
      { name: "Instala el tracker en todas las páginas", text: "Añade el tracker de Sealmetrics a todas las páginas de la web del hotel, incluida la de confirmación de la reserva. Servirlo desde un subdominio propio mediante un registro A es opcional y hace mucho menos probable que las peticiones se bloqueen." },
      { name: "Mantén el motor de reservas en la sesión", text: "Si el motor está en un subdominio de tu web, añade el tracker a sus páginas. Si está en el dominio del proveedor, registra ese dominio como passthrough referrer a través de la API de Sealmetrics, para que el huésped que vuelve dentro de la sesión conserve el origen." },
      { name: "Registra las pasarelas de pago", text: "Las pasarelas de pago principales se reconocen con una lista incorporada. Registra cualquier otra pasarela o dominio de 3-D Secure por el que pase tu reserva, para que la vuelta no se acredite a la pasarela." },
      { name: "Registra la búsqueda y la reserva", text: "Lanza una microconversión en la búsqueda de disponibilidad y una conversión en la confirmación, con ingresos, moneda y propiedades como fecha de entrada, noches, tipo de habitación y hotel. El tracker debe cargar antes de la llamada de conversión." },
      { name: "Compara con tu total de reservas", text: "Compara el mismo periodo, zona horaria y moneda con el total del motor de reservas o del CRM, dejando fuera las reservas de OTA, teléfono, grupos y mostrador, y las cancelaciones. Mantén GA4 durante un ciclo de reservas completo antes de mover presupuesto." },
    ],
  },

  roles: {
    tag: "Quién lo usa en un grupo hotelero",
    title: <>Una capa de medición.<br /><em>Cuatro equipos leyéndola.</em></>,
    body: "Nadie tiene que renunciar a sus herramientas. Lo que cambia es qué cifra zanja la discusión sobre canales.",
    items: [
      { role: "Venta directa", need: "Una visión por canal que aceptan agencias y marcas.", how: "Palladium usa Sealmetrics como la referencia neutral que marca, departamentos y agencias leen de la misma forma.", link: { label: "Una cifra para todos los equipos", href: "/es/use-cases/single-source-of-truth/" } },
      { role: "Revenue management", need: "Antelación y mercado por canal.", how: "Si la fecha de entrada viaja como propiedad de la reserva, las reservas se leen por días hasta la llegada y por país junto al canal que las produjo.", link: { label: "Seguimiento de eventos", href: "/es/glossary/event-tracking/" } },
      { role: "Paid media y agencias", need: "Presupuesto movido con datos conciliados.", how: "Dreamplace compara las ventas atribuidas con el total del CRM y mueve la inversión hacia los canales que el stack anterior infravaloraba.", link: { label: "Atribución de ingresos por campaña", href: "/es/use-cases/revenue-attribution/" } },
      { role: "Legal y DPO", need: "Una analítica que no guarda nada en el dispositivo del huésped.", how: "Sin cookies, sin almacenamiento en el dispositivo y con los datos de visitantes alojados en Dublín, junto a la documentación que pide el DPO de un grupo hotelero.", link: { label: "Demostrar cumplimiento", href: "/es/gdpr-analytics/" } },
    ],
  },

  proof: {
    tag: "Medido en grupos hoteleros",
    quote: {
      text: "Los datos que da Sealmetrics son agnósticos, no están sesgados y son neutrales. No hay caja negra.",
      cite: "Toni Andújar · Director Digital y Venta Directa · Palladium Hotel Group",
      person: "Toni Andújar",
      role: "Director Digital y Venta Directa, Palladium Hotel Group",
    },
    body: "Dos grupos hoteleros usan Sealmetrics junto a su stack actual. Palladium, como la referencia que aceptan marca, departamentos y agencias. Dreamplace, tras casi dos años, para mover presupuesto de paid media contrastado con el total de su CRM.",
    figures: [
      { value: "35%", label: "de las reservas que registraba GA4 no tenía canal", client: "Palladium Hotel Group", href: "/es/case-studies/palladium-hotel-group/" },
      { value: "+165%", label: "de mejora del Coste por Búsqueda de Display tras rehacer el modelo de DV360", client: "Palladium Hotel Group", href: "/es/case-studies/palladium-hotel-group/" },
      { value: "15–20%", label: "más ventas atribuidas que la herramienta anterior, contra el total del CRM", client: "Dreamplace Hotels", href: "/es/case-studies/dreamplace-hotels/" },
    ],
    readCase: "Leer el caso",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Mide tu web.<br /><em>No toda tu distribución.</em></>,
    body: (
      <>
        Estos límites dependen de dónde ocurre la reserva. Por qué sigue importando
        contar tu propia web al completo se argumenta en{" "}
        <Link className={link} href="/es/complete-data/">datos completos</Link>.
      </>
    ),
    items: [
      ["Las reservas de OTA quedan fuera", "Una reserva hecha en la web de Booking.com, Expedia u otra OTA nunca carga tu web, así que no tiene sesión que atribuir. La extranet de la OTA sigue siendo la fuente de ese canal."],
      ["Reservas sin sesión web", "Las reservas por teléfono, call center, grupos, eventos o mostrador no tienen una visita detrás. Déjalas fuera de la comparación."],
      ["Un motor que no admite etiquetas", "Si el motor de reservas está en el dominio del proveedor y nunca devuelve al huésped a una página tuya, la reserva no puede registrarse en el navegador. Pide al proveedor un subdominio o la vuelta a tu página de confirmación."],
      ["Los passthrough referrers van por cuenta", "Se gestionan por API, sin pantalla en el dashboard, y no se heredan cuando una nueva marca, mercado u hotel abre su propia cuenta."],
      ["La conciliación es sobre totales", "Los localizadores de reserva no se guardan, así que comparas totales y canales con el motor de reservas o el CRM, nunca reserva a reserva."],
      ["Último clic por sesión", "Sin modelo multi-touch ni view-through. Un huésped que vuelve días después escribiendo tu dirección se acredita a directo."],
    ],
  },

  faqTag: "Preguntas frecuentes de hoteles",
  faqTitle: <>Antes de medir<br /><em>tu recorrido de reserva.</em></>,
  faq: [
    { question: "¿Puede Sealmetrics medir reservas cuando el motor de reservas está en otro dominio?", answer: "Sí, con configuración. Si el motor está en un subdominio de tu web, añade el tracker a sus páginas y la búsqueda y la reserva quedan en la misma sesión. Si está en el dominio del proveedor, registra ese dominio como passthrough referrer a través de la API de Sealmetrics, para que el huésped que vuelve dentro de la sesión conserve el origen, y registra la reserva en una página de confirmación de tu dominio." },
    { question: "¿Sealmetrics se integra con mi PMS o mi motor de reservas?", answer: "No hay un plugin específico para PMS. La reserva es un evento de conversión estándar que se lanza en la página de confirmación, con ingresos, moneda y las propiedades que envíes, como fecha de entrada o tipo de habitación. Los totales se contrastan después con el PMS, el motor de reservas o el CRM desde los informes, la API REST o la exportación a BigQuery." },
    { question: "¿Cómo trata Sealmetrics el tráfico de metabuscadores y OTA?", answer: "Las visitas desde Google Hotel Ads, Trivago u otros metabuscadores se acreditan por sus UTM, click IDs o referrer, como cualquier otro canal. Una reserva hecha en la web de una OTA nunca carga tu web, así que Sealmetrics no la ve; la extranet de la OTA sigue siendo la fuente de ese canal." },
    { question: "¿Puede un grupo hotelero ver todos sus hoteles en una misma cuenta?", answer: "Sí. Cada web de hotel o de marca es un sitio dentro de una organización, un mismo usuario puede abrirlos todos y los miembros pueden limitarse a los sitios que tengan asignados. Todos los planes incluyen webs y usuarios ilimitados y una vista de portfolio. Los passthrough referrers, eso sí, se registran por cuenta." },
    { question: "¿Por qué algunas reservas aparecen atribuidas a una pasarela de pago?", answer: "Cuando el huésped paga en una pasarela o en una página de 3-D Secure y vuelve a tu confirmación, esa vuelta puede abrir una visita nueva con la pasarela como referrer. Las pasarelas principales se reconocen con una lista incorporada; registra cualquier otro dominio de pasarela como passthrough referrer por API y la reserva conservará su origen." },
    { question: "¿Puede revenue management analizar reservas de última hora frente a las anticipadas?", answer: "Sí, si el motor de reservas envía la fecha de entrada o los días hasta la llegada como propiedad de la conversión. Las propiedades de conversión se pueden desglosar por source, medium y campaña, así que la antelación se lee junto al canal y al país de la visita." },
    { question: "¿Seguimos necesitando GA4 y los píxeles publicitarios?", answer: "Pueden quedarse. Sealmetrics no envía conversiones a Google Ads ni a Meta, así que las plataformas publicitarias mantienen su propia configuración con consentimiento para las pujas. Usa Sealmetrics y GA4 en paralelo durante un ciclo de reservas completo, compara los dos con el total de reservas y decide después cuál zanja las discusiones de presupuesto." },
    { question: "¿La web de un hotel necesita banner de consentimiento para Sealmetrics?", answer: "Sealmetrics no instala cookies ni guarda nada en el dispositivo del huésped. Los píxeles publicitarios, los chats y las etiquetas de retargeting de una web de hotel normalmente sí lo hacen, y siguen necesitando consentimiento. Que tu analítica quede exenta de consentimiento depende de tu configuración y de los criterios de tu autoridad nacional." },
  ],

  final: {
    tag: "Revisión de medición para hoteles",
    title: <>Compara con tu total de reservas.<br /><em>Ve los canales que hoy no puedes acreditar.</em></>,
    body: "Reserva 30 minutos con el founder. Mapeamos tu recorrido de reserva, de la página de llegada al motor de reservas y la pasarela de pago, y dejamos preparada la comparación con el total de tu motor de reservas o CRM.",
    primary: { label: "Reservar una revisión para hoteles", href: "/es/demo/" },
    secondary: { label: "Leer el caso Dreamplace", href: "/es/case-studies/dreamplace-hotels/" },
  },
};
