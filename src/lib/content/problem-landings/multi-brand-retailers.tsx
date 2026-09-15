import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /for/multi-brand-retailers — Phase 6 of CONTENT-PLAN-PROBLEM-POSITIONING.md (new vertical).
 *
 * A retail group with several brands, stores or country domains arrives with a
 * comparison problem: every brand runs its own banner, its own GA4 property,
 * its own agency and its own channel taxonomy, so brand-against-brand numbers
 * measure consent rates and configuration as much as performance.
 *
 * Product facts from docs.sealmetrics.com (checked 15 Sep 2026):
 * - one domain and its subdomains per site; separate domains are separate
 *   sites, with no cross-site tracking (faq, platform/account-setup)
 * - each site has its own timezone and currency (platform/organizations,
 *   site settings); dim_accounts carries name, timezone and currency in
 *   BigQuery
 * - organization roles Owner / Admin / Member (assigned sites only) and
 *   site-level Editor / Viewer (platform/organizations)
 * - channel rules per site, CSV export and replace-all import, 100 rules per
 *   site, future traffic only (platform/settings/tracking/channel-grouping)
 * - several sites can point at the same BigQuery project and dataset, sharing
 *   the fact tables, rows distinguished by account_id (bigquery, multi-site
 *   datasets)
 * - Batch API: up to 50 queries per request, each resolving dates in its own
 *   site's timezone (api/batch, agent guide)
 * - consent-based tools lose 15–60% of EU visitors depending on sector, brand
 *   strength and traffic mix (docs llms.txt facts) — presented as the docs'
 *   range, never as a measured figure; the measured one is Incapto's 29%
 * - unlimited websites and users on every plan (PricingSignal.tsx)
 *
 * Not claimed: a dashboard view that sums brands (the documented aggregate
 * endpoints need a superadmin role), automatic currency conversion, or any
 * link between a shopper's visits on two brands.
 *
 * Figures: Palladium and Incapto as published in case-studies.tsx. No new
 * client names; no multi-brand retail client exists yet, and the proof block
 * says so.
 */

export const MULTI_BRAND_PUBLISHED = "2026-09-15";

const link = "sig-problem-inline";

export const multiBrandRetailersEn: ProblemLandingContent = {
  route: "/for/multi-brand-retailers",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "For teams", href: "/for/" },
    { label: "Multi-brand retailers" },
  ],
  eyebrow: "Industry · Multi-brand retail",
  h1: <>Each brand, its banner.<br />Each banner,<br /><em>its own gap.</em></>,
  heroBody:
    "Your brands run different consent banners, GA4 properties, agencies and channel names, so a brand-against-brand report compares configurations as much as results. Sealmetrics measures every brand site on the same method, without consent loss, inside one group organization, with brand teams scoped to their own sites and one BigQuery dataset for the group.",
  heroPrimary: { label: "See the group setup", href: "#method" },
  heroSecondary: { label: "Read the Incapto case", href: "/case-studies/incapto/" },
  heroMicro: "One site per brand domain · per-site currency and timezone · shared channel rules · EU-hosted in Dublin",
  module: {
    title: "Group organization · brand sites",
    status: "Scoped per site",
    rows: [
      ["Brand A · brand-a.com", "EUR · Europe/Madrid"],
      ["Brand B · brand-b.fr", "EUR · Europe/Paris"],
      ["Brand C · brand-c.co.uk", "GBP · Europe/London"],
      ["Group BigQuery dataset", "Shared tables · rows by site"],
    ],
    foot: "One domain and its subdomains per site · brand teams see only their own sites",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Analytics for a multi-brand retailer has to answer a question no single
      brand&apos;s tool can: which brand, market and channel is growing, measured
      on one comparable basis. When every brand runs its own consent banner, each
      GA4 property loses a different share of visitors, because rejection varies
      with sector, brand strength and traffic mix; the Sealmetrics documentation
      puts that loss at 15–60%. A comparison between brands then measures consent
      rates as much as performance. Sealmetrics counts visits without cookies, so
      rejecting a banner removes no visit from any brand. Each brand domain is a
      site inside one group organization, with its own timezone and currency, and
      brand teams can be limited to their own sites. Channel rules move between
      sites as CSV, and several sites can write to one BigQuery dataset for the
      group total. It does not follow a shopper from one brand&apos;s site to
      another.
    </p>
  ),

  divergence: {
    tag: "Why brands cannot be compared today",
    title: <>Same group.<br /><em>Five different rulers.</em></>,
    body: "Brand reports disagree for reasons that have nothing to do with how the brands perform. Each difference below is set brand by brand, usually by a different team or agency, and none of it is visible in the report that suffers from it.",
    headers: ["What differs by brand", "Effect on the report", "Why the group does not see it", "What makes it comparable"],
    rows: [
      ["Consent banner and rejection rate", "Each brand loses a different share of its visits", "A property cannot show the visitors it never recorded", "Visits counted without waiting for the banner"],
      ["Channel taxonomy", "Paid Social in one brand is Social or Unassigned in another", "Each property was configured by a different team or agency", "The same channel rules imported on every site"],
      ["Agency and ad platforms", "Each brand's agency reports its own platforms", "No neutral layer sits between the brands", "Measured revenue per brand on one method"],
      ["Currency and timezone", "Days and totals do not line up across markets", "Each property reports in its own settings", "Per-site currency and timezone, joined in the warehouse"],
      ["Links between brands", "A shopper sent from one brand to another arrives as referral traffic", "Untagged links carry no campaign", "UTMs on every cross-brand link"],
    ],
    note: (
      <>
        The loss is uneven even inside one store. At{" "}
        <Link className={link} href="/case-studies/incapto/">Incapto</Link>, GA4 did
        not record 29% of visits, and Sealmetrics recorded 11% more direct traffic
        than GA4 but 37–52% more from paid campaigns and 133% more from organic
        social. Across brands with different audiences, banners and channel mixes,
        the distortion compounds. How consent-based tools lose that traffic is
        covered under{" "}
        <Link className={link} href="/glossary/data-loss-in-analytics/">data loss in analytics</Link>.
      </>
    ),
  },

  costs: {
    tag: "What the group pays for it",
    title: <>Budget follows the banner,<br /><em>not the brand.</em></>,
    body: "When the comparison is biased, the group's decisions inherit the bias. It shows up in three places.",
    items: [
      ["01", "Budget moved between brands on consent rates", "A brand whose audience rejects the banner more often looks smaller and less efficient than it is. Shifting investment toward the brand that looks stronger can reward a banner, not a business."],
      ["02", "Group reviews spent reconciling brand reports", "Brand teams, departments and agencies arrive with figures built on different settings. Palladium Hotel Group's starting point was exactly that: the same meeting, different numbers and different incentives."],
      ["03", "Channel mix misread brand by brand", "At Incapto, GA4 showed paid campaigns as 50% of traffic; measured without consent loss they were 62%. Repeat a twelve-point gap with a different size in every brand and the group media plan rests on none of them."],
    ],
  },

  method: {
    id: "method",
    tag: "Setting up a group",
    title: <>One method.<br /><em>Every brand on it.</em></>,
    body: (
      <>
        The goal is not one dashboard but one ruler: every brand measured the same
        way, reconciled with its own orders, then added up. Why that matters for
        budget is argued on{" "}
        <Link className={link} href="/use-cases/single-source-of-truth/">single source of truth</Link>.
      </>
    ),
    howToName: "How a multi-brand retailer measures every brand on one comparable basis",
    howToDescription:
      "Five steps to put every brand site on the same measurement method: one group organization, scoped brand teams, one channel taxonomy, reconciliation per brand and a group total in BigQuery.",
    steps: [
      { name: "Create one organization and one site per brand domain", text: "Create a single organization for the group and add a site for each brand or country domain, with its own timezone and currency. Subdomains of the same domain stay on the same site; a separate domain needs its own site. Install the tracker and the purchase conversion on each." },
      { name: "Scope brand teams to their own sites", text: "Keep group analytics as Owner or Admin, with access to every site. Invite each brand team as Member and assign only its brand's sites, as Editor to change configuration or Viewer to read the data." },
      { name: "Apply one channel taxonomy to every brand", text: "Agree UTM conventions for all agencies. Build the custom channel rules on one site as drafts, test them with real source, medium and campaign values, and publish. Export them as CSV and import the file on every other brand site; the import replaces that site's custom rules, up to 100 per site. Tag links between brands with UTMs." },
      { name: "Reconcile each brand with its own orders", text: "Before comparing brands, compare each site's measured orders and revenue with that brand's own order system for the same period and currency, leaving out orders with no web visit. At Incapto, Sealmetrics recorded 96% of real orders and 97% of revenue over 48 days." },
      { name: "Build the group total in BigQuery", text: "Point the brand sites at the same BigQuery project and dataset; they share the fact tables and each row carries its site's account ID. Join the accounts table for name, timezone and currency, convert currencies with the group's own rates, and report brands side by side. The Batch API is the alternative: up to 50 queries per request, each in its site's timezone." },
    ],
  },

  roles: {
    tag: "Who reads it in the group",
    title: <>One ruler,<br /><em>four levels.</em></>,
    body: "The group and the brands keep their own tools and agencies. What changes is that their numbers are built the same way.",
    items: [
      { role: "Group CMO / eCommerce director", need: "Allocate budget between brands on figures that can be compared.", how: "Revenue by brand and channel on the same method, reconciled with each brand's orders before it is added up.", link: { label: "Single source of truth", href: "/use-cases/single-source-of-truth/" } },
      { role: "Brand manager", need: "Run the brand's own channels without seeing other brands' data.", how: "Member access limited to the brand's sites, with the same reports and channel rules as every other brand.", link: { label: "Analytics for eCommerce", href: "/for/ecommerce/" } },
      { role: "Group data and BI", need: "One dataset for every brand, in the group's warehouse.", how: "Brand sites writing to one BigQuery dataset, with site, timezone and currency on every row's account.", link: { label: "BigQuery connector", href: "/integrations/bigquery/" } },
      { role: "Group DPO", need: "One analytics setup to assess, not one per brand.", how: "No cookies, no IP stored, processing in Dublin and a DPA. Exemption from consent still depends on configuration and each national authority.", link: { label: "GDPR analytics", href: "/gdpr-analytics/" } },
    ],
  },

  proof: {
    tag: "Measured in practice",
    quote: {
      text: "The data Sealmetrics delivers is agnostic, unbiased and neutral. There's no black box.",
      cite: "Toni Andújar · Digital & Direct Sales Director · Palladium Hotel Group",
      person: "Toni Andújar",
      role: "Digital & Direct Sales Director, Palladium Hotel Group",
    },
    body: "There is no published multi-brand retail case yet. The evidence comes from a hotel group whose brand teams, departments and agencies now work from one reference, and from an eCommerce store measured side by side with GA4 for 48 days.",
    figures: [
      { value: "40%", label: "of inbound traffic had no source or medium before the neutral layer", client: "Palladium Hotel Group", href: "/case-studies/palladium-hotel-group/" },
      { value: "29%", label: "of visits GA4 did not record in a 48-day parallel run", client: "Incapto", href: "/case-studies/incapto/" },
      { value: "14% vs 0.3%", label: "of visits with no usable origin, GA4 against Sealmetrics", client: "Incapto", href: "/case-studies/incapto/" },
    ],
    readCase: "Read the case",
  },

  limits: {
    tag: "What it does not do",
    title: <>Comparable brands.<br /><em>Not connected shoppers.</em></>,
    body: (
      <>
        A group view built on aggregates has clear edges. Attribution is{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last click</Link>{" "}
        within each session, on each site.
      </>
    ),
    items: [
      ["No journeys across brands", "Separate domains are separate sites and Sealmetrics does not track across sites. A shopper who moves from one brand to another is a visit on each, with nothing linking them."],
      ["Currencies stay per site", "Each site records revenue in its own currency. A group total in one currency is converted in the warehouse with the group's own rates."],
      ["Channel rules do not rewrite history", "Rules apply to traffic received after they go live. Import the shared taxonomy before the comparison period starts."],
      ["Orders without a web visit stay outside", "Store, phone and marketplace orders have no session on the brand site to attribute."],
      ["Last click per session, nothing more", "No multi-touch model and no view-through. Earlier influence belongs in a marketing-mix model fed with the group totals."],
      ["Ad pixels keep their own consent", "Sealmetrics sets no cookies, but the ad pixels and tags each brand runs still need consent, and exemption depends on each national authority."],
    ],
  },

  faqTag: "Questions retail groups ask",
  faqTitle: <>Before you compare<br /><em>your brands again.</em></>,
  faq: [
    { question: "How should a multi-brand retailer structure Sealmetrics?", answer: "One organization for the group and one site per brand or country domain, each with its own timezone and currency. Subdomains of the same domain stay on one site; separate domains need separate sites. Every plan includes unlimited websites and users." },
    { question: "Can each brand team see only its own brand?", answer: "Yes. Invite brand teams with the Member role and assign only their brand's sites, as Editor or Viewer. Owners and Admins see every site in the organization." },
    { question: "Why do our brands' GA4 numbers not compare?", answer: "Because each property loses a different share of visitors to its consent banner, and each was configured with its own channel names and agency. Rejection varies with sector, brand strength and traffic mix, so the brand whose audience rejects more looks weaker than it is." },
    { question: "Can we see a group total across brands in different currencies?", answer: "Build it in BigQuery. Several sites can write to the same dataset, each row carries its site's account ID, and the accounts table holds each site's currency and timezone. Convert currencies there with the group's own rates." },
    { question: "Does Sealmetrics follow a shopper across our brands' websites?", answer: "No. Separate domains are separate sites and Sealmetrics does not track across sites or identify visitors. A shopper sent from one brand to another is counted as a visit on each; tag links between brands with UTMs to see how much traffic they send." },
    { question: "How do we keep the same channel definitions for every brand?", answer: "Build the custom channel rules once, test and publish them, export them as CSV and import the file on each brand site. The import replaces that site's custom rules in one step, with up to 100 rules per site, and applies to traffic received afterwards." },
    { question: "Can brands keep their own agencies and ad platforms?", answer: "Yes. Sealmetrics does not send conversions to ad platforms, so each agency keeps optimising in its own tools. What the group adds is revenue per brand measured the same way, which is where budget between brands is decided." },
  ],

  final: {
    tag: "Group measurement review",
    title: <>Bring two brands.<br /><em>See where the comparison changes.</em></>,
    body: "Thirty minutes: we look at how two of your brands are measured today, their banners, properties and channel rules, and set up a comparison on one method against each brand's orders.",
    primary: { label: "Book a group measurement review", href: "/demo/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const multiBrandRetailersEs: ProblemLandingContent = {
  route: "/for/multi-brand-retailers",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Por equipo", href: "/es/for/" },
    { label: "Retail multimarca" },
  ],
  eyebrow: "Sector · Retail multimarca",
  h1: <>Cada marca, su banner.<br />Cada banner,<br /><em>su propio hueco.</em></>,
  heroBody:
    "Tus marcas usan banners de consentimiento, propiedades de GA4, agencias y nombres de canal distintos, así que un informe que compara marcas compara configuraciones tanto como resultados. Sealmetrics mide cada web de marca con el mismo método, sin pérdida por consentimiento, dentro de una organización de grupo, con cada equipo limitado a sus sitios y un único dataset de BigQuery para el grupo.",
  heroPrimary: { label: "Ver cómo se configura un grupo", href: "#method" },
  heroSecondary: { label: "Leer el caso Incapto", href: "/es/case-studies/incapto/" },
  heroMicro: "Un sitio por dominio de marca · moneda y zona horaria por sitio · reglas de canal comunes · alojado en Dublín",
  module: {
    title: "Organización de grupo · sitios de marca",
    status: "Acceso por sitio",
    rows: [
      ["Marca A · marca-a.es", "EUR · Europe/Madrid"],
      ["Marca B · marca-b.fr", "EUR · Europe/Paris"],
      ["Marca C · marca-c.co.uk", "GBP · Europe/London"],
      ["Dataset de BigQuery del grupo", "Tablas comunes · filas por sitio"],
    ],
    foot: "Un dominio y sus subdominios por sitio · cada equipo de marca ve solo sus sitios",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      La analítica de un retailer multimarca tiene que responder algo que ninguna
      herramienta de marca responde sola: qué marca, mercado y canal crece,
      medido sobre una base comparable. Con un banner de consentimiento por
      marca, cada propiedad de GA4 pierde una
      proporción distinta de visitas, porque el rechazo varía según el sector, la
      fuerza de la marca y el mix de tráfico; la documentación de Sealmetrics sitúa
      esa pérdida entre el 15% y el 60%. Comparar marcas pasa a medir tasas de
      consentimiento tanto como resultados. Sealmetrics cuenta visitas sin cookies,
      así que rechazar un banner no quita visitas a ninguna marca. Cada dominio de
      marca es un sitio dentro de una organización de grupo, con su zona horaria y
      su moneda, y cada equipo puede limitarse a sus sitios. Las reglas de canal
      pasan de un sitio a otro en CSV, y varios sitios pueden escribir en un mismo
      dataset de BigQuery. No sigue a un comprador de una marca a otra.
    </p>
  ),

  divergence: {
    tag: "Por qué hoy no se pueden comparar marcas",
    title: <>El mismo grupo.<br /><em>Cinco reglas de medir.</em></>,
    body: "Los informes de marca no cuadran por motivos que no tienen nada que ver con cómo rinde cada marca. Cada diferencia de la tabla se decide marca a marca, casi siempre por un equipo o una agencia distintos, y ninguna se ve en el informe que la sufre.",
    headers: ["Qué cambia por marca", "Efecto en el informe", "Por qué el grupo no lo ve", "Qué lo hace comparable"],
    rows: [
      ["Banner y tasa de rechazo", "Cada marca pierde una proporción distinta de visitas", "Una propiedad no puede mostrar las visitas que nunca registró", "Visitas contadas sin esperar al banner"],
      ["Taxonomía de canales", "Lo que en una marca es Paid Social en otra es Social o Unassigned", "Cada propiedad la configuró un equipo o una agencia distintos", "Las mismas reglas de canal importadas en todos los sitios"],
      ["Agencia y plataformas publicitarias", "La agencia de cada marca reporta sus propias plataformas", "No hay una capa neutral entre marcas", "Ingresos medidos por marca con un mismo método"],
      ["Moneda y zona horaria", "Los días y los totales no cuadran entre mercados", "Cada propiedad reporta con su propia configuración", "Moneda y zona horaria por sitio, cruzadas en el warehouse"],
      ["Enlaces entre marcas", "Un comprador enviado de una marca a otra llega como tráfico de referencia", "Los enlaces sin etiquetar no traen campaña", "UTM en cada enlace entre marcas"],
    ],
    note: (
      <>
        La pérdida es desigual incluso dentro de una misma tienda. En{" "}
        <Link className={link} href="/es/case-studies/incapto/">Incapto</Link>, GA4
        no registró el 29% de las visitas, y Sealmetrics registró un 11% más de
        tráfico directo que GA4, pero entre un 37% y un 52% más desde campañas de
        pago y un 133% más desde social orgánico. Con marcas de públicos, banners y
        mix de canales distintos, la distorsión se acumula. Cómo pierden ese tráfico
        las herramientas que dependen del consentimiento se explica en{" "}
        <Link className={link} href="/es/glossary/data-loss-in-analytics/">pérdida de datos en analítica</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que le cuesta al grupo",
    title: <>El presupuesto sigue al banner,<br /><em>no a la marca.</em></>,
    body: "Cuando la comparación está sesgada, las decisiones del grupo heredan el sesgo. Se nota en tres sitios.",
    items: [
      ["01", "Presupuesto entre marcas repartido por tasas de consentimiento", "Una marca cuyo público rechaza más el banner parece más pequeña y menos eficiente de lo que es. Mover inversión hacia la marca que parece más fuerte puede premiar un banner, no un negocio."],
      ["02", "Revisiones de grupo dedicadas a cuadrar informes", "Equipos de marca, departamentos y agencias llegan con cifras construidas sobre configuraciones distintas. Ese fue el punto de partida de Palladium Hotel Group: la misma reunión, cifras distintas e intereses distintos."],
      ["03", "Mix de canales mal leído marca a marca", "En Incapto, GA4 mostraba las campañas de pago como el 50% del tráfico; medidas sin pérdida por consentimiento eran el 62%. Repite doce puntos de diferencia, con un tamaño distinto en cada marca, y el plan de medios del grupo no se apoya en ninguna."],
    ],
  },

  method: {
    id: "method",
    tag: "Cómo se configura un grupo",
    title: <>Un método.<br /><em>Todas las marcas en él.</em></>,
    body: (
      <>
        El objetivo no es un panel, sino una misma regla de medir: cada marca medida
        igual, conciliada con sus propios pedidos y después sumada. Por qué importa
        para el presupuesto se explica en{" "}
        <Link className={link} href="/es/use-cases/single-source-of-truth/">fuente única de verdad</Link>.
      </>
    ),
    howToName: "Cómo mide un retailer multimarca todas sus marcas sobre una base comparable",
    howToDescription:
      "Cinco pasos para medir todas las webs de marca con el mismo método: una organización de grupo, equipos de marca con acceso acotado, una taxonomía de canales, conciliación por marca y un total de grupo en BigQuery.",
    steps: [
      { name: "Crea una organización y un sitio por dominio de marca", text: "Crea una única organización para el grupo y añade un sitio por cada dominio de marca o de país, con su zona horaria y su moneda. Los subdominios de un mismo dominio van en el mismo sitio; un dominio distinto necesita su propio sitio. Instala en cada uno el tracker y la conversión de compra." },
      { name: "Limita cada equipo de marca a sus sitios", text: "Deja la analítica de grupo como Owner o Admin, con acceso a todos los sitios. Invita a cada equipo de marca como Member y asígnale solo los sitios de su marca, como Editor para cambiar la configuración o como Viewer para consultar los datos." },
      { name: "Aplica una misma taxonomía de canales a todas las marcas", text: "Acuerda las convenciones de UTM con todas las agencias. Crea las reglas de canal propias en un sitio como borradores, pruébalas con valores reales de source, medium y campaign, y publícalas. Expórtalas en CSV e importa el archivo en el resto de sitios de marca; la importación sustituye las reglas propias de cada sitio, hasta 100 por sitio. Etiqueta con UTM los enlaces entre marcas." },
      { name: "Concilia cada marca con sus propios pedidos", text: "Antes de comparar marcas, compara los pedidos y la facturación medidos en cada sitio con el sistema de pedidos de esa marca, en el mismo periodo y la misma moneda, dejando fuera los pedidos sin visita web. En Incapto, Sealmetrics registró el 96% de los pedidos reales y el 97% de la facturación en 48 días." },
      { name: "Construye el total de grupo en BigQuery", text: "Apunta los sitios de marca al mismo proyecto y dataset de BigQuery: comparten las tablas de hechos y cada fila lleva el ID de cuenta de su sitio. Cruza la tabla de cuentas para el nombre, la zona horaria y la moneda, convierte monedas con los tipos del propio grupo y presenta las marcas lado a lado. La alternativa es la API Batch: hasta 50 consultas por petición, cada una en la zona horaria de su sitio." },
    ],
  },

  roles: {
    tag: "Quién lo lee en el grupo",
    title: <>Una regla de medir,<br /><em>cuatro niveles.</em></>,
    body: "El grupo y las marcas conservan sus herramientas y sus agencias. Lo que cambia es que sus cifras se construyen igual.",
    items: [
      { role: "CMO o director de eCommerce del grupo", need: "Repartir el presupuesto entre marcas con cifras comparables.", how: "Ingresos por marca y canal con el mismo método, conciliados con los pedidos de cada marca antes de sumarlos.", link: { label: "Fuente única de verdad", href: "/es/use-cases/single-source-of-truth/" } },
      { role: "Responsable de marca", need: "Gestionar los canales de su marca sin ver los datos de las demás.", how: "Acceso como Member limitado a los sitios de su marca, con los mismos informes y reglas de canal que el resto.", link: { label: "Analítica para eCommerce", href: "/es/for/ecommerce/" } },
      { role: "Datos y BI del grupo", need: "Un único dataset con todas las marcas en el warehouse del grupo.", how: "Los sitios de marca escriben en un mismo dataset de BigQuery, con sitio, zona horaria y moneda asociados a cada fila.", link: { label: "Conector de BigQuery", href: "/es/integrations/bigquery/" } },
      { role: "DPO del grupo", need: "Evaluar una configuración de analítica, no una por marca.", how: "Sin cookies, sin guardar la IP, procesamiento en Dublín y un DPA. La exención de consentimiento sigue dependiendo de la configuración y de cada autoridad nacional.", link: { label: "Analítica y RGPD", href: "/es/gdpr-analytics/" } },
    ],
  },

  proof: {
    tag: "Medido en la práctica",
    quote: {
      text: "Los datos que da Sealmetrics son agnósticos, no están sesgados y son neutrales. No hay caja negra.",
      cite: "Toni Andújar · Director Digital y Venta Directa · Palladium Hotel Group",
      person: "Toni Andújar",
      role: "Director Digital y Venta Directa, Palladium Hotel Group",
    },
    body: "Todavía no hay un caso publicado de retail multimarca. La prueba viene de un grupo hotelero cuyos equipos de marca, departamentos y agencias trabajan hoy con una misma referencia, y de una tienda online medida en paralelo con GA4 durante 48 días.",
    figures: [
      { value: "40%", label: "del tráfico entrante no tenía source ni medium antes de la capa neutral", client: "Palladium Hotel Group", href: "/es/case-studies/palladium-hotel-group/" },
      { value: "29%", label: "de las visitas que GA4 no registró en 48 días de medición en paralelo", client: "Incapto", href: "/es/case-studies/incapto/" },
      { value: "14% vs 0,3%", label: "de visitas sin origen utilizable, GA4 frente a Sealmetrics", client: "Incapto", href: "/es/case-studies/incapto/" },
    ],
    readCase: "Leer el caso",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Marcas comparables.<br /><em>No compradores conectados.</em></>,
    body: (
      <>
        Una vista de grupo construida con agregados tiene límites claros. La
        atribución es a último clic dentro de cada sesión y de cada sitio; los{" "}
        <Link className={link} href="/es/glossary/attribution-model/">modelos de atribución</Link>{" "}
        explican la diferencia.
      </>
    ),
    items: [
      ["Sin recorridos entre marcas", "Los dominios distintos son sitios distintos y Sealmetrics no rastrea entre sitios. Un comprador que pasa de una marca a otra es una visita en cada una, sin nada que las una."],
      ["Las monedas se quedan por sitio", "Cada sitio registra los ingresos en su propia moneda. Un total de grupo en una sola moneda se convierte en el warehouse con los tipos del propio grupo."],
      ["Las reglas de canal no reescriben el histórico", "Se aplican al tráfico que llega después de publicarlas. Importa la taxonomía común antes de que empiece el periodo de comparación."],
      ["Los pedidos sin visita web quedan fuera", "Los pedidos en tienda, por teléfono o en marketplaces no tienen sesión en la web de la marca que atribuir."],
      ["Último clic por sesión y nada más", "Sin modelo multitoque ni view-through. La influencia previa corresponde a un modelo de marketing mix alimentado con los totales del grupo."],
      ["Los píxeles publicitarios mantienen su consentimiento", "Sealmetrics no instala cookies, pero los píxeles y etiquetas de cada marca siguen necesitando consentimiento, y la exención depende de cada autoridad nacional."],
    ],
  },

  faqTag: "Lo que preguntan los grupos de retail",
  faqTitle: <>Antes de volver a comparar<br /><em>tus marcas.</em></>,
  faq: [
    { question: "¿Cómo debe organizar Sealmetrics un retailer multimarca?", answer: "Con una organización para el grupo y un sitio por cada dominio de marca o de país, cada uno con su zona horaria y su moneda. Los subdominios de un mismo dominio van en un sitio; los dominios distintos necesitan sitios distintos. Todos los planes incluyen webs y usuarios ilimitados." },
    { question: "¿Puede cada equipo de marca ver solo su marca?", answer: "Sí. Invita a los equipos de marca con el rol Member y asígnales solo los sitios de su marca, como Editor o como Viewer. Los Owner y los Admin ven todos los sitios de la organización." },
    { question: "¿Por qué no se pueden comparar los datos de GA4 de nuestras marcas?", answer: "Porque cada propiedad pierde una proporción distinta de visitas por su banner de consentimiento, y cada una se configuró con sus propios nombres de canal y su agencia. El rechazo varía según el sector, la fuerza de la marca y el mix de tráfico, así que la marca cuyo público rechaza más parece más débil de lo que es." },
    { question: "¿Podemos ver un total de grupo con marcas en monedas distintas?", answer: "Constrúyelo en BigQuery. Varios sitios pueden escribir en el mismo dataset, cada fila lleva el ID de cuenta de su sitio y la tabla de cuentas guarda la moneda y la zona horaria de cada sitio. Convierte las monedas ahí con los tipos del propio grupo." },
    { question: "¿Sealmetrics sigue a un comprador entre las webs de nuestras marcas?", answer: "No. Los dominios distintos son sitios distintos y Sealmetrics no rastrea entre sitios ni identifica visitantes. Un comprador enviado de una marca a otra cuenta como una visita en cada una; etiqueta con UTM los enlaces entre marcas para ver cuánto tráfico se envían." },
    { question: "¿Cómo mantenemos las mismas definiciones de canal en todas las marcas?", answer: "Crea las reglas de canal propias una vez, pruébalas y publícalas, expórtalas en CSV e importa el archivo en cada sitio de marca. La importación sustituye de una vez las reglas propias de ese sitio, con un máximo de 100 reglas por sitio, y se aplica al tráfico que llega después." },
    { question: "¿Pueden las marcas mantener sus agencias y plataformas publicitarias?", answer: "Sí. Sealmetrics no envía conversiones a las plataformas, así que cada agencia sigue optimizando en sus herramientas. Lo que añade el grupo son ingresos por marca medidos igual, que es donde se decide el presupuesto entre marcas." },
  ],

  final: {
    tag: "Revisión de medición de grupo",
    title: <>Trae dos marcas.<br /><em>Mira dónde cambia la comparación.</em></>,
    body: "Treinta minutos: vemos cómo se miden hoy dos de tus marcas, sus banners, propiedades y reglas de canal, y preparamos una comparación con un mismo método frente a los pedidos de cada marca.",
    primary: { label: "Reservar una revisión de grupo", href: "/es/demo/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
