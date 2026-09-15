import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /for/dpo — the role page for data protection officers and legal counsel.
 *
 * It does not repeat /gdpr-analytics (problem D: the regulator-by-regulator
 * analysis). It follows the DPO's own work: the vendor review, the record of
 * processing, the privacy notice and the decision to sign.
 *
 * Every product fact comes from the signed DPA (2026-v2.0, /dpa: Art. 28,
 * data processed and never stored, pseudonymised session identifier with a
 * daily salt destroyed on rotation, country from the browser time zone, no
 * persisted IP, purposes A and B, clause 4.6 DPIA assistance, clause 4.7
 * audits, Annex 3 sub-processors), from docs.sealmetrics.com
 * (security-privacy/what-we-track and data-location: retention TTLs and
 * Dublin; compliance/cnil-self-assessment: recommended privacy notice text and
 * opt-out through browser controls or the site's implementation) and from
 * /security (no ISO 27001 or SOC 2 claimed, TPSR package available).
 * The tone follows #186: exemption from consent depends on configuration and on
 * each national authority.
 *
 * Removed from the old version: "zero personal data collection" and "no
 * personal data in the dataset" as flat statements, "scope stays clean
 * forever", "GDPR applies to personal data and Sealmetrics processes none",
 * "custom DPA negotiation on Enterprise" (not in the DPA or pricing), "security
 * architecture diagrams under NDA" (not documented), the claim that Google
 * Analytics lists 30+ sub-processors (no source), "CNIL and other DPAs are still
 * challenging GA" (dated), and the categorical GDPR FAQ.
 */

export const DPO_PUBLISHED = "2026-03-01";
export const DPO_PUBLISHED_ES = "2026-04-18";
export const DPO_MODIFIED = "2026-09-15";

const link = "sig-problem-inline";
const WHAT_WE_TRACK = "https://docs.sealmetrics.com/security-privacy/what-we-track";
const CNIL_SELF_ASSESSMENT_DOCS = "https://docs.sealmetrics.com/compliance/cnil-self-assessment";

export const dpoEn: ProblemLandingContent = {
  route: "/for/dpo",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "For teams", href: "/for/" },
    { label: "DPOs" },
  ],
  eyebrow: "Role · DPO and legal",
  h1: <>One data inventory.<br />Fixed retention.<br /><em>Nothing on the device.</em></>,
  heroBody:
    "A DPO reviewing an analytics vendor needs to know what is collected, where it is processed, for how long and by whom, and most vendors answer with a policy page. Sealmetrics gives the review a closed scope: an Article 28 DPA whose annexes list the data processed, the retention periods and the sub-processors, no storage on the visitor's device, no stored IP addresses, and visitor data processed in Dublin.",
  heroPrimary: { label: "See the review steps", href: "#method" },
  heroSecondary: { label: "Read the DPA", href: "/dpa/" },
  heroMicro: "Article 28 DPA · retention by database TTL · no ISO 27001 or SOC 2 claimed · not legal advice",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: DPO_MODIFIED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "Review pack · what you can check",
    status: "Documented",
    rows: [
      ["DPA 2026-v2.0", "Article 28 · annexes"],
      ["Retention", "1 day · 90 days · 24 months"],
      ["Sub-processors", "Annex 3 · none outside the EU on visitor data"],
      ["Certifications", "None claimed"],
    ],
    foot: "Event rows 1 day · hourly aggregates 90 days · daily aggregates and conversions 24 months",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Reviewing web analytics as a DPO means documenting what the tool collects,
      where and by whom it is processed, how long it is kept and whether the
      consent requirement applies. Sealmetrics is built to give that review a
      fixed scope. It writes no cookie or other storage on the visitor&apos;s
      device and keeps no IP address; the country comes from the browser time
      zone, and a session identifier is pseudonymised server-side with a daily
      salt destroyed on rotation. Visitor data is processed in Dublin under an
      Article 28 DPA that lists the data processed, the retention periods and the
      sub-processors, the only non-EU one sending account emails with no visitor
      data. Event-level rows are deleted after one day and aggregates after 24
      months. Whether a deployment is exempt from consent still depends on its
      configuration, its purposes and the national authority, and Sealmetrics
      holds no ISO 27001 or SOC 2 certification.
    </p>
  ),

  divergence: {
    tag: "What the DPO has to document",
    title: <>Six entries in the record.<br /><em>Six documented answers.</em></>,
    body: "The questions below are the ones a record of processing and a vendor review need answered for any analytics tool. Each answer points to a document you can read.",
    headers: ["What you document", "What to ask any analytics vendor", "Sealmetrics, as documented", "Where to verify"],
    rows: [
      ["Data categories", "Which fields are collected and which are never stored", "Browsing and technical data, country from the browser time zone, a pseudonymised session identifier, UTMs and conversions; no IP, no user ID", "DPA Annex 1"],
      ["Device access", "Is anything stored on or read from the device?", "No cookies, localStorage or other device storage", "What we track"],
      ["Purposes", "Is marketing attribution separate from audience measurement?", "Listed as separate purposes; attribution is optional and configured by you", "DPA"],
      ["Retention", "Fixed or configurable, and who enforces it?", "Fixed TTLs: event rows 1 day, hourly aggregates 90 days, daily aggregates and conversions 24 months", "Data location and retention"],
      ["Location and transfers", "Where is visitor data processed, and who processes it?", "Dublin, Ireland; the only non-EU sub-processor sends account emails and receives no visitor data", "DPA Annex 3"],
      ["Assurance", "Which certifications, audits and assistance?", "No ISO 27001 or SOC 2; audit rights and DPIA assistance in the DPA; TPSR package", "DPA clauses 4.6 and 4.7 · security"],
    ],
    note: (
      <>
        The field list is public in{" "}
        <a className={link} href={WHAT_WE_TRACK} target="_blank" rel="noopener noreferrer">what we track</a>.
        How the architecture reads against the CNIL, DSK and AEPD criteria is set
        out regulator by regulator in{" "}
        <Link className={link} href="/gdpr-analytics/">GDPR analytics</Link>, and the
        security controls in{" "}
        <Link className={link} href="/security/">security</Link>.
      </>
    ),
  },

  costs: {
    tag: "What an open-ended scope costs",
    title: <>A review without edges<br /><em>never closes.</em></>,
    body: "The effort of an analytics review is set by how much of the processing is left to interpretation.",
    items: [
      ["01", "Every new tag reopens the assessment", "A new cookie, identifier or purpose changes the processing and the record. A fixed data inventory keeps the analytics entry stable while the rest of the stack changes."],
      ["02", "Transfers stay a standing question", (
        <>
          When visitor data leaves the EU, the transfer basis has to be revisited
          each time the framework moves — the scenario in{" "}
          <Link className={link} href="/blog/analytics-if-data-privacy-framework-falls/">what happens to analytics if the Data Privacy Framework falls</Link>.
        </>
      )],
      ["03", "Consent decides what marketing can see", (
        <>
          A banner-dependent tool records only visitors who accept. On a Shopify
          store measured side by side for 48 days, GA4 did not record 29% of visits.
          The trade-off between compliance and data is argued in{" "}
          <Link className={link} href="/complete-data/">complete data</Link>.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "The vendor review",
    title: <>Review the documents.<br /><em>Then check the site.</em></>,
    body: (
      <>
        Five steps a DPO can run on Sealmetrics or on any other analytics tool.
        The{" "}
        <Link className={link} href="/reg-gap-analysis/">regulatory gap analysis</Link>{" "}
        applies the same questions to your current stack.
      </>
    ),
    howToName: "How a DPO reviews a web analytics vendor",
    howToDescription:
      "Five steps to review an analytics vendor for GDPR and ePrivacy: read the DPA annexes, check the live site, audit what the site sends, assess purposes against your authority and record the decision.",
    steps: [
      { name: "Read the DPA and its annexes", text: "Check the data processed and never stored, the retention periods, the security measures and the sub-processors. For Sealmetrics that is the Article 28 DPA 2026-v2.0 and its annexes, published at /dpa." },
      { name: "Check the live site", text: "Open the site with the browser's developer tools and confirm that the analytics script writes no cookie, localStorage or other storage, and that requests go to the expected domain." },
      { name: "Audit what the site sends", text: "Custom properties, conversion values, URLs and campaign parameters are set by your own team. Confirm none of them carries names, emails, phone numbers or customer IDs; the Sealmetrics MCP prompt library includes an audit for this." },
      { name: "Assess each purpose against your authority's criteria", text: "Audience measurement and marketing attribution are separate purposes. Read the conditions your national authority publishes, such as the CNIL, DSK or AEPD criteria, and decide how each purpose is covered." },
      { name: "Record the decision and update the notice", text: "Add the processing to your record with Sealmetrics as processor under the DPA, and describe the analytics in your privacy notice. The documentation includes recommended notice text you can adapt." },
    ],
  },

  roles: {
    tag: "Who signs off",
    title: <>One review,<br /><em>four signatures.</em></>,
    body: "A vendor review crosses several desks. Each one gets a document it can check rather than a claim.",
    items: [
      { role: "DPO", need: "A record of processing entry that does not change every quarter.", how: "The DPA annexes: data processed, retention, sub-processors and the purposes listed separately.", link: { label: "Read the DPA", href: "/dpa/" } },
      { role: "Legal counsel", need: "The authority's criteria, not a vendor's conclusion.", how: "Analyses against the CNIL, DSK and AEPD criteria, stated as guidance and not as legal advice.", link: { label: "GDPR analytics by country", href: "/gdpr-analytics/" } },
      { role: "CISO and security", need: "Controls and their boundaries, without claimed certifications.", how: "Encryption, isolation, retention by TTL and the Dublin operating boundary; no ISO 27001 or SOC 2.", link: { label: "Security overview", href: "/security/" } },
      { role: "Marketing", need: "To know what can be sent without reopening the review.", how: "An audit of custom properties and campaign parameters for personal data, runnable from an AI assistant.", link: { label: "MCP prompt library", href: "/ai-analytics/prompts/" } },
    ],
  },

  proof: {
    tag: "Documents, not badges",
    body: "There is no approved client quote on compliance, so this page points to documents. Sealmetrics also says what it does not hold: no ISO 27001, no SOC 2, and no regulator certification, because authorities do not certify analytics tools.",
    figures: [
      { value: "1 day", label: "retention of event-level rows before deletion; aggregates are kept 24 months", client: "Security overview", href: "/security/" },
      { value: "4.6", label: "the DPA clause committing Sealmetrics to assist with impact assessments and prior consultations", client: "Data Processing Agreement", href: "/dpa/" },
      { value: "14", label: "CNIL technical criteria documented one by one in a public self-assessment", client: "CNIL self-assessment", href: "/blog/cnil-self-assessment-published/" },
    ],
    readCase: "Open",
  },

  limits: {
    tag: "What a review still has to decide",
    title: <>Documents support a decision.<br /><em>They do not take it.</em></>,
    body: (
      <>
        These limits belong in the record as much as the answers. The CNIL
        self-assessment in the{" "}
        <a className={link} href={CNIL_SELF_ASSESSMENT_DOCS} target="_blank" rel="noopener noreferrer">documentation</a>{" "}
        shows the criteria it maps.
      </>
    ),
    items: [
      ["Not legal advice", "These pages describe the product and published guidance. Your DPO or counsel decides for your deployment."],
      ["No certification", "Sealmetrics holds no ISO 27001 or SOC 2 certification, and no supervisory authority certifies analytics tools."],
      ["Your configuration can change the answer", "Properties, URLs or campaign parameters that carry personal data bring it into the dataset. Keep them out of what the site sends."],
      ["Attribution is its own purpose", "Marketing attribution is listed separately from audience measurement in the DPA and has to be assessed on its own terms."],
      ["Other tools keep their obligations", "Advertising pixels, A/B testing and chat widgets that store or read data on the device still need consent."],
      ["The notice is still yours", "The site owner describes the analytics in its privacy notice; the documentation offers text to adapt, not a finished policy."],
    ],
  },

  faqTag: "Questions DPOs ask",
  faqTitle: <>Before you sign<br /><em>the vendor review.</em></>,
  faq: [
    { question: "What should a DPO ask a web analytics vendor?", answer: "Which data is collected and which is never stored, whether anything is stored on or read from the visitor's device, which purposes the data serves, how long each category is kept, where it is processed and by which sub-processors, and which audits, certifications and assistance the contract provides. Ask for the answers in the processing agreement, not on a marketing page." },
    { question: "Is Sealmetrics a processor or a controller?", answer: "Sealmetrics acts as processor for the customer's analytics under an Article 28 DPA; the customer remains controller of its website's processing. The DPA sets out the data processed, the purposes, the retention periods, the security measures and the sub-processors." },
    { question: "Do we need a DPIA for Sealmetrics?", answer: "That is your assessment to make, based on your processing as a whole. Under clause 4.6 of the DPA, Sealmetrics assists with impact assessments and prior consultations and keeps the technical documentation of the processing available: architecture, data inventory, retention and the AEPD assessment." },
    { question: "What should our privacy notice say about Sealmetrics?", answer: "That the site uses Sealmetrics for audience measurement, which data it processes and for which purposes, and how visitors can object. The documentation includes recommended text in its CNIL self-assessment that you can adapt to your notice and your national rules." },
    { question: "Can visitors opt out?", answer: "Sealmetrics builds no individual profile, so there is no personal history to opt out of. Visitors can block analytics through their browser's privacy settings or an ad blocker, and a site can add its own opt-out mechanism, as the CNIL self-assessment in the documentation describes." },
    { question: "Where is visitor data processed, and who are the sub-processors?", answer: "Visitor data is stored and processed in Dublin, Ireland. Annex 3 of the DPA lists the sub-processors: the only one outside the EU sends service emails to account users and receives no visitor data, and the managed AI inference for Private AI runs in Paris." },
    { question: "Which certifications does Sealmetrics hold?", answer: "None. Sealmetrics does not hold ISO 27001 or SOC 2 certification and does not claim either. The security measures are listed in the DPA, customers have audit rights under clause 4.7, and a TPSR package is available for procurement reviews." },
  ],

  final: {
    tag: "Compliance walkthrough",
    title: <>Bring your review template.<br /><em>We bring the documents.</em></>,
    body: "Thirty minutes with the person responsible for the implementation: the DPA annexes, the retention periods, the sub-processors and the criteria of your national authority.",
    primary: { label: "Book a compliance walkthrough", href: "/demo/" },
    secondary: { label: "Run the gap analysis", href: "/reg-gap-analysis/" },
  },
};

export const dpoEs: ProblemLandingContent = {
  route: "/for/dpo",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Por equipo", href: "/es/for/" },
    { label: "DPOs" },
  ],
  eyebrow: "Rol · DPO y legal",
  h1: <>Un inventario de datos.<br />Conservación fija.<br /><em>Nada en el dispositivo.</em></>,
  heroBody:
    "Un DPO que revisa un proveedor de analítica necesita saber qué se recoge, dónde se trata, durante cuánto tiempo y quién lo trata, y la mayoría responde con una página de política. Sealmetrics da a la revisión un alcance cerrado: un contrato de encargo del artículo 28 cuyos anexos enumeran los datos tratados, los plazos de conservación y los subencargados, nada guardado en el dispositivo del visitante, ninguna dirección IP almacenada y el dato de visitante tratado en Dublín.",
  heroPrimary: { label: "Ver los pasos de revisión", href: "#method" },
  heroSecondary: { label: "Leer el DPA", href: "/es/dpa/" },
  heroMicro: "DPA del artículo 28 · conservación por TTL de base de datos · sin ISO 27001 ni SOC 2 declarados · no es asesoramiento jurídico",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Actualizado",
    date: DPO_MODIFIED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Paquete de revisión · lo que puedes comprobar",
    status: "Documentado",
    rows: [
      ["DPA 2026-v2.0", "Artículo 28 · anexos"],
      ["Conservación", "1 día · 90 días · 24 meses"],
      ["Subencargados", "Anexo 3 · ninguno fuera de la UE con dato de visitante"],
      ["Certificaciones", "Ninguna declarada"],
    ],
    foot: "Filas de evento 1 día · agregados por horas 90 días · agregados diarios y conversiones 24 meses",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      Revisar la analítica web como DPO consiste en documentar qué recoge la
      herramienta, dónde y quién la trata, cuánto tiempo se conserva y si se
      aplica el requisito de consentimiento. Sealmetrics no escribe cookies ni ningún otro
      almacenamiento en el dispositivo del visitante y no guarda la dirección IP;
      el país se obtiene de la zona horaria del navegador y un identificador de
      sesión se seudonimiza en el servidor con una sal diaria que se destruye al
      rotar. El dato de visitante se trata en Dublín bajo un contrato de encargo
      del artículo 28 que enumera los datos tratados, los plazos de conservación y
      los subencargados, y el único fuera de la UE envía emails de cuenta sin
      dato de visitante. Las filas de evento se borran al día y los agregados a
      los 24 meses. Que una implantación quede exenta de consentimiento depende de
      su configuración, sus finalidades y la autoridad nacional, y Sealmetrics no
      tiene certificación ISO 27001 ni SOC 2.
    </p>
  ),

  divergence: {
    tag: "Lo que el DPO tiene que documentar",
    title: <>Seis entradas en el registro.<br /><em>Seis respuestas documentadas.</em></>,
    body: "Estas son las preguntas que un registro de actividades de tratamiento y una revisión de proveedor necesitan resolver con cualquier herramienta de analítica. Cada respuesta remite a un documento que puedes leer.",
    headers: ["Qué documentas", "Qué preguntar a cualquier proveedor", "Sealmetrics, según su documentación", "Dónde comprobarlo"],
    rows: [
      ["Categorías de datos", "Qué campos se recogen y cuáles no se guardan nunca", "Datos de navegación y técnicos, país por la zona horaria del navegador, un identificador de sesión seudonimizado, UTM y conversiones; sin IP ni identificador de usuario", "Anexo 1 del DPA"],
      ["Acceso al dispositivo", "¿Se guarda o se lee algo en el dispositivo?", "Sin cookies, localStorage ni otro almacenamiento en el dispositivo", "Qué registramos"],
      ["Finalidades", "¿La atribución de marketing está separada de la medición de audiencia?", "Aparecen como finalidades distintas; la atribución es opcional y la configuras tú", "DPA"],
      ["Conservación", "¿Fija o configurable, y quién la aplica?", "TTL fijos: filas de evento 1 día, agregados por horas 90 días, agregados diarios y conversiones 24 meses", "Ubicación y conservación de datos"],
      ["Ubicación y transferencias", "¿Dónde se trata el dato de visitante y quién lo trata?", "Dublín, Irlanda; el único subencargado fuera de la UE envía emails de cuenta y no recibe dato de visitante", "Anexo 3 del DPA"],
      ["Garantías", "¿Qué certificaciones, auditorías y asistencia?", "Sin ISO 27001 ni SOC 2; derecho de auditoría y asistencia en EIPD en el DPA; paquete TPSR", "Cláusulas 4.6 y 4.7 del DPA · seguridad"],
    ],
    note: (
      <>
        La lista de campos es pública en{" "}
        <a className={link} href={WHAT_WE_TRACK} target="_blank" rel="noopener noreferrer">qué registramos</a>.
        Cómo se lee la arquitectura frente a los criterios de la CNIL, la DSK y la
        AEPD se explica regulador a regulador en{" "}
        <Link className={link} href="/es/gdpr-analytics/">analítica y RGPD</Link>, y
        los controles de seguridad en{" "}
        <Link className={link} href="/es/security/">seguridad</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que cuesta un alcance abierto",
    title: <>Una revisión sin límites<br /><em>nunca se cierra.</em></>,
    body: "El esfuerzo de revisar una analítica depende de cuánto del tratamiento queda a la interpretación.",
    items: [
      ["01", "Cada etiqueta nueva reabre la evaluación", "Una cookie, un identificador o una finalidad nuevos cambian el tratamiento y el registro. Un inventario de datos fijo mantiene estable la entrada de la analítica aunque cambie el resto del stack."],
      ["02", "Las transferencias siguen abiertas", (
        <>
          Cuando el dato de visitante sale de la UE, la base de la transferencia
          hay que revisarla cada vez que se mueve el marco, el escenario que se
          analiza en{" "}
          <Link className={link} href="/es/blog/analytics-if-data-privacy-framework-falls/">qué pasa con la analítica si cae el Data Privacy Framework</Link>.
        </>
      )],
      ["03", "El consentimiento decide qué ve marketing", (
        <>
          Una herramienta que depende del banner solo registra a quien acepta. En
          una tienda Shopify medida en paralelo durante 48 días, GA4 no registró el
          29% de las visitas. El equilibrio entre cumplimiento y dato se explica en{" "}
          <Link className={link} href="/es/complete-data/">datos completos</Link>.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "La revisión del proveedor",
    title: <>Revisa los documentos.<br /><em>Después comprueba el sitio.</em></>,
    body: (
      <>
        Cinco pasos que un DPO puede aplicar a Sealmetrics o a cualquier otra
        herramienta de analítica. El{" "}
        <Link className={link} href="/es/reg-gap-analysis/">análisis de brechas regulatorias</Link>{" "}
        aplica las mismas preguntas a tu stack actual.
      </>
    ),
    howToName: "Cómo revisa un DPO a un proveedor de analítica web",
    howToDescription:
      "Cinco pasos para revisar un proveedor de analítica frente al RGPD y la ePrivacy: leer los anexos del DPA, comprobar el sitio, auditar lo que se envía, evaluar las finalidades según tu autoridad y registrar la decisión.",
    steps: [
      { name: "Lee el DPA y sus anexos", text: "Revisa los datos tratados y los que no se guardan, los plazos de conservación, las medidas de seguridad y los subencargados. En Sealmetrics es el contrato de encargo del artículo 28, versión 2026-v2.0, con sus anexos, publicado en /dpa." },
      { name: "Comprueba el sitio en producción", text: "Abre la web con las herramientas de desarrollo del navegador y confirma que el script de analítica no escribe cookies, localStorage ni otro almacenamiento, y que las peticiones van al dominio esperado." },
      { name: "Audita lo que envía el sitio", text: "Las propiedades personalizadas, los importes de conversión, las URL y los parámetros de campaña los define tu equipo. Confirma que ninguno lleva nombres, emails, teléfonos ni IDs de cliente; la biblioteca de prompts MCP de Sealmetrics incluye una auditoría para ello." },
      { name: "Evalúa cada finalidad según los criterios de tu autoridad", text: "La medición de audiencia y la atribución de marketing son finalidades distintas. Lee las condiciones que publica tu autoridad nacional, como los criterios de la CNIL, la DSK o la AEPD, y decide cómo queda cubierta cada una." },
      { name: "Registra la decisión y actualiza el aviso", text: "Añade el tratamiento a tu registro con Sealmetrics como encargado según el DPA y describe la analítica en tu política de privacidad. La documentación incluye un texto recomendado que puedes adaptar." },
    ],
  },

  roles: {
    tag: "Quién firma",
    title: <>Una revisión,<br /><em>cuatro firmas.</em></>,
    body: "Una revisión de proveedor pasa por varias mesas. Cada una recibe un documento que puede comprobar en lugar de una afirmación.",
    items: [
      { role: "DPO", need: "Una entrada del registro de actividades que no cambie cada trimestre.", how: "Los anexos del DPA: datos tratados, conservación, subencargados y finalidades por separado.", link: { label: "Leer el DPA", href: "/es/dpa/" } },
      { role: "Asesoría jurídica", need: "Los criterios de la autoridad, no la conclusión de un proveedor.", how: "Análisis frente a los criterios de la CNIL, la DSK y la AEPD, planteados como orientación y no como asesoramiento jurídico.", link: { label: "Analítica y RGPD por país", href: "/es/gdpr-analytics/" } },
      { role: "CISO y seguridad", need: "Controles y sus límites, sin certificaciones declaradas.", how: "Cifrado, aislamiento, conservación por TTL y el perímetro operativo en Dublín; sin ISO 27001 ni SOC 2.", link: { label: "Seguridad", href: "/es/security/" } },
      { role: "Marketing", need: "Saber qué se puede enviar sin reabrir la revisión.", how: "Una auditoría de propiedades personalizadas y parámetros de campaña en busca de datos personales, que se lanza desde un asistente de IA.", link: { label: "Biblioteca de prompts MCP", href: "/es/ai-analytics/prompts/" } },
    ],
  },

  proof: {
    tag: "Documentos, no sellos",
    body: "No hay una cita aprobada de un cliente sobre cumplimiento, así que esta página remite a documentos. Sealmetrics dice también lo que no tiene: ni ISO 27001, ni SOC 2, ni certificación de ningún regulador, porque las autoridades no certifican herramientas de analítica.",
    figures: [
      { value: "1 día", label: "de conservación de las filas de evento antes de borrarse; los agregados se conservan 24 meses", client: "Seguridad", href: "/es/security/" },
      { value: "4.6", label: "la cláusula del DPA por la que Sealmetrics asiste en evaluaciones de impacto y consultas previas", client: "Contrato de encargo", href: "/es/dpa/" },
      { value: "14", label: "criterios técnicos de la CNIL documentados uno a uno en una autoevaluación pública", client: "Autoevaluación CNIL", href: "/blog/cnil-self-assessment-published/" },
    ],
    readCase: "Abrir",
  },

  limits: {
    tag: "Lo que la revisión aún tiene que decidir",
    title: <>Los documentos respaldan una decisión.<br /><em>No la toman.</em></>,
    body: (
      <>
        Estos límites deben constar en el registro tanto como las respuestas. La
        autoevaluación frente a la CNIL de la{" "}
        <a className={link} href={CNIL_SELF_ASSESSMENT_DOCS} target="_blank" rel="noopener noreferrer">documentación</a>{" "}
        muestra los criterios que recoge.
      </>
    ),
    items: [
      ["No es asesoramiento jurídico", "Estas páginas describen el producto y la orientación publicada. Tu DPO o tu asesoría jurídica deciden sobre tu implantación."],
      ["Sin certificación", "Sealmetrics no tiene certificación ISO 27001 ni SOC 2, y ninguna autoridad de control certifica herramientas de analítica."],
      ["Tu configuración puede cambiar la respuesta", "Propiedades, URL o parámetros de campaña con datos personales los meten en el conjunto de datos. Mantenlos fuera de lo que envía el sitio."],
      ["La atribución es una finalidad propia", "La atribución de marketing figura en el DPA separada de la medición de audiencia y tiene que evaluarse por sí misma."],
      ["Las demás herramientas mantienen sus obligaciones", "Los píxeles publicitarios, los tests A/B y los widgets de chat que guardan o leen datos en el dispositivo siguen necesitando consentimiento."],
      ["El aviso de privacidad sigue siendo tuyo", "El titular del sitio describe la analítica en su política de privacidad; la documentación ofrece un texto que adaptar, no una política terminada."],
    ],
  },

  faqTag: "Lo que preguntan los DPOs",
  faqTitle: <>Antes de firmar<br /><em>la revisión del proveedor.</em></>,
  faq: [
    { question: "¿Qué debe preguntar un DPO a un proveedor de analítica web?", answer: "Qué datos se recogen y cuáles no se guardan nunca, si se guarda o se lee algo en el dispositivo del visitante, para qué finalidades se usan, cuánto se conserva cada categoría, dónde se tratan y con qué subencargados, y qué auditorías, certificaciones y asistencia recoge el contrato. Pide las respuestas en el contrato de encargo, no en una página comercial." },
    { question: "¿Sealmetrics es encargado o responsable del tratamiento?", answer: "Sealmetrics actúa como encargado del tratamiento de la analítica del cliente mediante un contrato del artículo 28; el cliente sigue siendo responsable del tratamiento de su web. El DPA recoge los datos tratados, las finalidades, los plazos de conservación, las medidas de seguridad y los subencargados." },
    { question: "¿Necesitamos una EIPD para Sealmetrics?", answer: "Es una evaluación que te corresponde hacer a ti, según tu tratamiento en conjunto. Según la cláusula 4.6 del DPA, Sealmetrics asiste en las evaluaciones de impacto y las consultas previas y mantiene a tu disposición la documentación técnica del tratamiento: arquitectura, inventario de datos, conservación y la evaluación de la AEPD." },
    { question: "¿Qué debe decir nuestra política de privacidad sobre Sealmetrics?", answer: "Que el sitio usa Sealmetrics para medir la audiencia, qué datos trata y con qué finalidades, y cómo pueden oponerse los visitantes. La documentación incluye un texto recomendado en su autoevaluación frente a la CNIL que puedes adaptar a tu política y a tu normativa nacional." },
    { question: "¿Pueden los visitantes oponerse a la medición?", answer: "Sealmetrics no construye perfiles individuales, así que no hay un historial personal del que darse de baja. Los visitantes pueden bloquear la analítica con los ajustes de privacidad del navegador o un bloqueador, y el sitio puede añadir su propio mecanismo de oposición, como describe la autoevaluación frente a la CNIL de la documentación." },
    { question: "¿Dónde se trata el dato de visitante y quiénes son los subencargados?", answer: "El dato de visitante se guarda y se trata en Dublín, Irlanda. El Anexo 3 del DPA enumera los subencargados: el único fuera de la UE envía emails de servicio a los usuarios de la cuenta y no recibe dato de visitante, y la inferencia de IA gestionada de Private AI funciona en París." },
    { question: "¿Qué certificaciones tiene Sealmetrics?", answer: "Ninguna. Sealmetrics no tiene certificación ISO 27001 ni SOC 2 y no declara ninguna. Las medidas de seguridad están en el DPA, los clientes tienen derecho de auditoría según la cláusula 4.7 y hay un paquete TPSR disponible para las revisiones de compras." },
  ],

  final: {
    tag: "Revisión de cumplimiento",
    title: <>Trae tu plantilla de revisión.<br /><em>Nosotros ponemos los documentos.</em></>,
    body: "Treinta minutos con la persona responsable de la implantación: los anexos del DPA, los plazos de conservación, los subencargados y los criterios de tu autoridad nacional.",
    primary: { label: "Reservar una revisión de cumplimiento", href: "/es/demo/" },
    secondary: { label: "Hacer el análisis de brechas", href: "/es/reg-gap-analysis/" },
  },
};
