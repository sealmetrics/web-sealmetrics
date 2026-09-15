import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /for/healthcare — vertical engine, regulated sector (clinics, hospital
 * groups, health information publishers).
 *
 * The specific risk on a health website is not "analytics" in general: it is a
 * tag that ties a visit to a condition or treatment page to an identifier. The
 * page states what Sealmetrics stores for that visit and stops there. Whether
 * the processing involves personal or health data is left to the site's DPO
 * and counsel, explicitly and more than once. Tone follows #186 and
 * /gdpr-analytics.
 *
 * Product and contract facts (checked 15 Sep 2026):
 * - docs security-privacy/what-we-track: no cookies, localStorage,
 *   sessionStorage or fingerprinting; IP used in memory, never persisted; no
 *   user IDs, emails or names; session marker in memory, ~2 h inactivity, not
 *   stored on the device, cannot recognise a returning visitor; page URL and
 *   referrer recorded; event rows (full URL) purged after 1 day, hourly
 *   aggregates 90 days, daily aggregates and conversions 24 months; exit pages
 *   and individual navigation paths not tracked; no ISO 27001 or SOC 2
 * - /dpa (v2.0) Annex 1: "Not stored: ... special categories"; Purpose B
 *   (attribution) optional; clause 5: the controller keeps direct personal data
 *   out of properties, URL parameters and campaign names; clause 4.6 DPIA
 *   assistance; 4.7 audits; clause 7 and Annex 3: visitor data in the EU, the
 *   one non-EU sub-processor (Resend, service emails) receives no visitor data
 * - docs api/stats: no server-side whitelist for properties, readable back by
 *   anyone with stats:read; docs compliance/data-subject-rights: sending PII in
 *   properties changes the analysis
 * - docs implementation/tracking-methods/ignore-page-view exists; the page only
 *   says to leave the tracker off logged-in areas unless reviewed
 * - consent loss 15–60% of EU visitors is the documentation's own range
 *   (faq/ga4-vs-sealmetrics); no healthcare figure exists and the page says so
 * - install 5–30 minutes by platform (/platforms)
 *
 * Removed from the old VerticalPageV3 copy (VerticalsData.tsx `healthcare`):
 * "Analytics with no patient personal data" and "adds no patient data to your
 * compliance scope" as absolute legal conclusions; "GA4 + healthcare = legal
 * nightmare" and "a HIPAA/GDPR incident waiting"; "Can't track from symptoms
 * page read to appointment booked" (Sealmetrics does not reconstruct paths
 * either); "Aggregate patient-facing tracking … symptom pages and portals";
 * "Designed for national health data rules (self-assessed)" and "EU healthcare
 * hosting"; "A/B optimization enabled" (no A/B testing feature); the FAQ that
 * placed the analytics layer outside HDS, BSI C5, LOPDGDD health provisions and
 * HIPAA; "Yes, in aggregate" to patient portal tracking with "UX signals …
 * errors" and "no patient can be singled out"; "pharma marketing teams use us"
 * (no such client is published); "your legal team can review fast"; the
 * migration and "data flows from the first hour" FAQs; the categorical GDPR FAQ.
 *
 * Deliberately not claimed: that no health data is processed, that consent is
 * not needed, anything about HIPAA or other non-EU health regimes beyond saying
 * no claim is made, any health-sector certification or client. There is no
 * sector case: the proof block shows documents plus one Palladium figure
 * labelled as hotel context.
 */

export const HEALTHCARE_PUBLISHED = "2026-03-02";
export const HEALTHCARE_PUBLISHED_ES = "2026-04-18";
export const HEALTHCARE_MODIFIED = "2026-09-15";

const link = "sig-problem-inline";
const WHAT_WE_TRACK = "https://docs.sealmetrics.com/security-privacy/what-we-track";

export const healthcareEn: ProblemLandingContent = {
  route: "/for/healthcare",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "For teams", href: "/for/" },
    { label: "Healthcare" },
  ],
  eyebrow: "Industry · Healthcare providers and health information",
  h1: <>The page a patient<br />reads is sensitive.<br /><em>So is the tag on it.</em></>,
  heroBody:
    "Clinics, hospital groups and health publishers need to know which channels bring appointment requests. But a visit to a condition or treatment page can reveal health information once a tool ties it to an identifier, and a consent banner removes part of the traffic anyway. Sealmetrics counts visits and conversions in aggregate, without cookies or stored identifiers, and documents exactly what it stores so your DPO and counsel can decide.",
  heroPrimary: { label: "See the deployment path", href: "#method" },
  heroSecondary: { label: "Read the security overview", href: "/security/" },
  heroMicro: "Aggregate counts · no cookies · no cross-session identifier · EU-hosted in Dublin · not legal advice",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: HEALTHCARE_MODIFIED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "What a treatment page view leaves",
    status: "As documented",
    rows: [
      ["Cookie or device storage", "None"],
      ["IP address", "In memory · not stored"],
      ["Cross-session identifier", "None"],
      ["Page view", "Aggregate count"],
    ],
    foot: "Event row with the full URL purged after 1 day · aggregates kept 24 months · processed in Dublin",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Analytics for healthcare is web measurement of how patients find a provider
      and request care, set up so that reading a condition or treatment page is
      not tied to an identifiable person. The risk comes from tools that set
      cookies or identifiers: combined with the page URL, they can show that a
      person looked up a condition, which data protection law may treat as health
      data. Sealmetrics sets no cookies, stores no IP addresses, user IDs or
      cross-session identifiers, and keeps page views and conversions as aggregate
      counts processed in Dublin; the event row with the full URL is purged after
      one day. That describes what it stores, not a legal conclusion. Whether your
      deployment involves health data depends on what your site sends, including
      URLs and custom properties, and on the assessment of your DPO and counsel.
      It does not change the obligations of the other tags on the site.
    </p>
  ),

  divergence: {
    tag: "What a visit leaves behind",
    title: <>The same page view,<br /><em>two different records.</em></>,
    body: "The question for a health website is not whether an analytics tool is private in general. It is what one visit to a sensitive page leaves in each tool, and whether anything links it to a person.",
    headers: ["What a visit to a treatment page leaves", "Tag with cookies or identifiers", "Sealmetrics, as documented", "Where to verify"],
    rows: [
      ["Something on the device", "A cookie or client ID, often set on the first page", "No cookies, localStorage or sessionStorage", "What we track"],
      ["An identifier linking visits", "A client or user ID that recognises the visitor next time", "No cross-session identifier; a session marker pseudonymised server-side expires after 2 hours of inactivity", "What we track · DPA Annex 1"],
      ["The IP address", "Received by the vendor, with retention set by the vendor", "Used in memory to handle the request, never stored", "What we track"],
      ["The page URL", "Sent together with the identifier, sometimes to an advertising platform", "Kept as an aggregate page count; the full URL sits in the event row for 1 day", "DPA Annex 1"],
      ["Where it is processed", "Often a US provider, relying on a transfer framework", "Dublin, Ireland; no non-EU sub-processor receives visitor data", "DPA clause 7 · Annex 3"],
    ],
    note: (
      <>
        What Sealmetrics stores is listed field by field in{" "}
        <a className={link} href={WHAT_WE_TRACK} target="_blank" rel="noopener noreferrer">what we track</a>{" "}
        and in Annex 1 of the <Link className={link} href="/dpa/">DPA</Link>, which
        names special categories among the data not stored. Whether any processing
        on your site involves{" "}
        <Link className={link} href="/glossary/personal-data-in-analytics/">personal data</Link>{" "}
        or health data is a decision for your DPO and counsel, and the answer
        changes if URLs or properties carry patient information.
      </>
    ),
  },

  costs: {
    tag: "What the usual choices cost",
    title: <>Measure everything,<br /><em>or measure nothing.</em></>,
    body: "Health websites tend to end up at one of two extremes, and each is paid for in a different currency.",
    items: [
      ["01", "Identifiers on sensitive pages", "A tag that sets cookies or identifiers on condition, symptom or treatment pages creates the combination a DPO has to assess: a person, and the health topic they read about. The exposure sits in the processing, whatever the report shows."],
      ["02", "Analytics removed where it matters", "One response is to take analytics off treatment pages and appointment flows. The channels that bring appointment requests are then judged on the pages that matter least to the decision."],
      ["03", "Channels judged on the visitors who accepted", (
        <>
          Where a banner stays, a consent-based tool loses the visitors who reject
          it. The Sealmetrics documentation puts that at 15–60% of EU visitors
          depending on sector, brand strength and traffic mix; no healthcare figure
          has been published. How that gap forms is explained under{" "}
          <Link className={link} href="/glossary/data-loss-in-analytics/">data loss in analytics</Link>.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "From review to reporting",
    title: <>Decide what you send.<br /><em>Then measure it.</em></>,
    body: (
      <>
        Most of the privacy work in a health deployment is deciding what never
        leaves your site. The review itself is covered in more depth in{" "}
        <Link className={link} href="/for/dpo/">analytics for DPOs</Link>.
      </>
    ),
    howToName: "How a healthcare provider deploys cookieless analytics without sending patient data",
    howToDescription:
      "Five steps for a clinic, hospital group or health publisher to review what Sealmetrics stores, keep patient data out of what the site sends, reconcile with booked appointments and report by channel.",
    steps: [
      { name: "Review what is stored before installing", text: "Give the DPO the DPA with its data inventory, retention periods and sub-processors, and the public field list. Decide which purposes you enable: aggregated audience measurement, and marketing attribution as a separate, optional purpose to be assessed on its own terms. Sealmetrics assists with impact assessments under clause 4.6 of the DPA." },
      { name: "Keep patient data out of URLs, properties and campaign names", text: "Check that no URL on the site carries a name, email, patient number, appointment reference or diagnosis in its parameters. Send appointment requests as conversions with generic properties agreed with your DPO, such as clinic or form name, never symptoms, conditions or anything that identifies a person. There is no server-side list of allowed properties, so this is your decision as controller." },
      { name: "Install on public pages first", text: "Add the tracker to public pages and appointment-request flows, which takes 5 to 30 minutes depending on the platform. Leave patient portals and other logged-in areas without the tracker unless your DPO has reviewed that deployment separately." },
      { name: "Run in parallel and reconcile with booked appointments", text: "Keep the current setup for a full campaign cycle and compare measured appointment requests with the requests your booking system received for the same period, by total and by channel. The comparison is in aggregate, never request by request." },
      { name: "Report channels, not patients", text: "Read appointment requests and conversion rate by channel, campaign and landing page. No report shows a patient: with nothing personal in what the site sends, no stored identifier links a visit to a person." },
    ],
  },

  roles: {
    tag: "Who is involved",
    title: <>Four desks,<br /><em>one data boundary.</em></>,
    body: "Each function has a different question about the same deployment. The boundary of what is stored is what they share.",
    items: [
      { role: "Marketing and patient acquisition", need: "Know which channels bring appointment requests.", how: "Requests by source, medium and campaign, credited to the last click of each session, without consent loss.", link: { label: "Conversion tracking", href: "/use-cases/conversion-tracking/" } },
      { role: "DPO and legal", need: "Decide whether the deployment involves personal or health data.", how: "The DPA data inventory, the public field list and the country analyses, as material for your own assessment rather than a conclusion.", link: { label: "Analytics for DPOs", href: "/for/dpo/" } },
      { role: "IT and security", need: "Control what the tag sends and who can see the reports.", how: "Which pages run the tracker, which properties are sent, role-based access and 2FA; audit logs from Scale, IP allowlist on Enterprise.", link: { label: "Security overview", href: "/security/" } },
      { role: "Management", need: "Invest in patient acquisition without adding patient data to analytics.", how: "Channel decisions on measured counts, reconciled with the booking system before any channel is compared.", link: { label: "Single source of truth", href: "/use-cases/single-source-of-truth/" } },
    ],
  },

  proof: {
    tag: "Evidence, not a sector case",
    body: "Sealmetrics has no published case study from a healthcare provider, and this page does not imply one. The documents below are what a health organisation can check today. The measured figure comes from a hotel group and is shown only as context for how missing source data distorts channel decisions.",
    figures: [
      { value: "Annex 1", label: "every field processed, what is never stored, special categories included, and each retention period", client: "Data Processing Agreement", href: "/dpa/" },
      { value: "1 day", label: "before the event-level log with the full URL is purged; only aggregate counts remain after that", client: "Security overview", href: "/security/" },
      { value: "35%", label: "of the bookings GA4 recorded had no channel; hotel context, not a healthcare result", client: "Palladium Hotel Group · hotels", href: "/case-studies/palladium-hotel-group/" },
    ],
    readCase: "Open",
  },

  limits: {
    tag: "What it does not do",
    title: <>It counts visits.<br /><em>It does not settle the law.</em></>,
    body: (
      <>
        State the limits before the deployment, not after it. Attribution is{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last click</Link>{" "}
        within each session, by design.
      </>
    ),
    items: [
      ["Not a legal conclusion", "This page describes what Sealmetrics stores. Whether your deployment processes personal or health data, and whether it needs consent, is for your DPO and counsel under your national rules."],
      ["What you send changes the answer", "Patient names, emails, record numbers or conditions in URLs, custom properties or campaign names bring personal or health data into the system. Keep them out."],
      ["No patient-level analytics", "No individual journeys, no returning-visitor recognition and no patient profiles. A patient who comes back tomorrow is a new visit."],
      ["Other tags keep their obligations", "Advertising pixels, chat widgets, video embeds and booking tools on the same pages keep their own consent and data protection requirements."],
      ["It does not replace a DPIA", "The DPA, the field list and the self-assessments are material for your impact assessment, not a substitute for it."],
      ["No certification, no non-EU health regimes", "No ISO 27001 or SOC 2, no health-sector certification, and no claim about HIPAA or other health-data rules outside the EU."],
    ],
  },

  faqTag: "Questions health organisations ask",
  faqTitle: <>Before the tracker<br /><em>goes on a treatment page.</em></>,
  faq: [
    { question: "Does Sealmetrics collect health data?", answer: "Sealmetrics does not collect names, emails, IP addresses, user IDs or cross-session identifiers, and Annex 1 of its DPA lists special categories among the data not stored. It does record page URLs and conversions, kept as aggregate counts. Whether a count of visits to a treatment page, or anything your implementation sends, involves health data is a decision for your DPO and counsel, and the answer changes if URLs or properties carry patient information." },
    { question: "Can we measure appointment requests without sending patient data?", answer: "Yes. Send each completed request as a conversion with generic properties agreed with your DPO, such as clinic or form name, and never the patient's name, contact details, symptoms or condition. Check that booking URLs carry no personal parameters. There is no server-side list of allowed properties, so what you send is your responsibility as controller." },
    { question: "Do we still need a cookie banner?", answer: "For the analytics itself, Sealmetrics sets no cookie and stores nothing on the visitor's device. Whether your deployment is exempt from consent depends on its configuration, the purposes you enable and your national authority's criteria. Advertising pixels, chat widgets and other tools on the site keep their own consent requirements, so a banner may still be needed for them." },
    { question: "Should Sealmetrics run on patient portals or logged-in areas?", answer: "Only after your DPO has reviewed that specific deployment. Logged-in areas are where URLs and events are most likely to carry patient information, and Sealmetrics does not analyse individual users in any case. A cautious deployment starts with public pages and appointment-request flows, which is where the acquisition questions are." },
    { question: "Where is the data processed, and for how long is it kept?", answer: "Visitor data is stored and processed in Dublin, Ireland. Annex 3 of the DPA lists the sub-processors; the only one outside the EU sends service emails to account users and receives no visitor data. Event-level rows are purged after one day, hourly aggregates after 90 days, and daily aggregates and conversions after 24 months." },
    { question: "Does Sealmetrics hold healthcare or security certifications?", answer: "No. Sealmetrics holds no ISO 27001 or SOC 2 certification and no health-sector certification, and it makes no claim about HIPAA or other health-data rules outside the EU. Its security measures are listed in Annex 2 of the DPA, and customers have audit rights under clause 4.7." },
    { question: "Does Sealmetrics replace our DPIA?", answer: "No. Sealmetrics assists with impact assessments under clause 4.6 of the DPA and provides the data inventory, retention periods and security measures as input. The assessment, and the decision, remain with you as controller." },
  ],

  final: {
    tag: "Deployment review",
    title: <>Start with the data.<br /><em>Then the channels.</em></>,
    body: "Thirty minutes with the person responsible for the implementation: the data inventory, what your site should never send, and how appointment requests are measured by channel.",
    primary: { label: "Book a deployment review", href: "/demo/" },
    secondary: { label: "Read the DPA", href: "/dpa/" },
  },
};

export const healthcareEs: ProblemLandingContent = {
  route: "/for/healthcare",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Por equipo", href: "/es/for/" },
    { label: "Salud" },
  ],
  eyebrow: "Sector · Proveedores sanitarios e información de salud",
  h1: <>La página que lee<br />un paciente es sensible.<br /><em>La etiqueta, también.</em></>,
  heroBody:
    "Clínicas, grupos hospitalarios y medios de salud necesitan saber qué canales traen peticiones de cita. Pero una visita a una página de una enfermedad o de un tratamiento puede revelar información de salud en cuanto una herramienta la liga a un identificador, y el banner de consentimiento se lleva además parte del tráfico. Sealmetrics cuenta visitas y conversiones en agregado, sin cookies ni identificadores guardados, y documenta exactamente qué guarda para que decidan tu DPO y tu asesoría jurídica.",
  heroPrimary: { label: "Ver el recorrido de implantación", href: "#method" },
  heroSecondary: { label: "Leer la visión general de seguridad", href: "/es/security/" },
  heroMicro: "Recuentos agregados · sin cookies · sin identificador entre sesiones · alojado en Dublín · no es asesoramiento jurídico",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Actualizado",
    date: HEALTHCARE_MODIFIED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Lo que deja una visita a un tratamiento",
    status: "Según la documentación",
    rows: [
      ["Cookie o almacenamiento en el dispositivo", "Ninguno"],
      ["Dirección IP", "En memoria · no se guarda"],
      ["Identificador entre sesiones", "Ninguno"],
      ["Página vista", "Recuento agregado"],
    ],
    foot: "Fila de evento con la URL completa purgada al día · agregados durante 24 meses · tratado en Dublín",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      La analítica para salud es la medición web de cómo los pacientes encuentran
      a un proveedor y piden atención, configurada para que leer la página de una
      enfermedad o de un tratamiento no quede ligado a una persona identificable.
      El riesgo viene de las herramientas que instalan cookies o identificadores:
      junto con la URL de la página, pueden mostrar que alguien consultó una
      enfermedad, algo que la normativa de protección de datos puede considerar un
      dato de salud. Sealmetrics no instala cookies, no guarda direcciones IP,
      identificadores de usuario ni identificadores entre sesiones, y conserva
      páginas vistas y conversiones como recuentos agregados tratados en Dublín; la
      fila de evento con la URL completa se purga al día. Eso describe lo que
      guarda, no es una conclusión jurídica. Que tu implantación trate datos de
      salud depende de lo que envíe tu web, URLs y propiedades incluidas, y de la
      evaluación de tu DPO y tu asesoría. No cambia las obligaciones de las demás
      etiquetas de la web.
    </p>
  ),

  divergence: {
    tag: "Lo que deja una visita",
    title: <>La misma página vista,<br /><em>dos registros distintos.</em></>,
    body: "La pregunta en una web de salud no es si una herramienta de analítica es privada en general. Es qué deja una sola visita a una página sensible en cada herramienta, y si algo la une a una persona.",
    headers: ["Lo que deja una visita a un tratamiento", "Etiqueta con cookies o identificadores", "Sealmetrics, según su documentación", "Dónde verificarlo"],
    rows: [
      ["Algo en el dispositivo", "Una cookie o un identificador de cliente, a menudo desde la primera página", "Ni cookies, ni localStorage, ni sessionStorage", "What we track"],
      ["Un identificador que une visitas", "Un identificador de cliente o de usuario que reconoce al visitante la próxima vez", "Ningún identificador entre sesiones; un marcador de sesión seudonimizado en servidor caduca tras 2 horas de inactividad", "What we track · Anexo 1 del DPA"],
      ["La dirección IP", "La recibe el proveedor, que fija cuánto la conserva", "Se usa en memoria para atender la petición y nunca se guarda", "What we track"],
      ["La URL de la página", "Se envía junto al identificador, a veces a una plataforma publicitaria", "Se conserva como recuento agregado por página; la URL completa está en la fila de evento durante 1 día", "Anexo 1 del DPA"],
      ["Dónde se trata", "A menudo en un proveedor de EE. UU., apoyado en un marco de transferencias", "Dublín, Irlanda; ningún subencargado fuera de la UE recibe dato de visitante", "Cláusula 7 y Anexo 3 del DPA"],
    ],
    note: (
      <>
        Lo que guarda Sealmetrics está enumerado campo a campo en{" "}
        <a className={link} href={WHAT_WE_TRACK} target="_blank" rel="noopener noreferrer">what we track</a>{" "}
        (en inglés) y en el Anexo 1 del <Link className={link} href="/es/dpa/">DPA</Link>,
        que incluye las categorías especiales entre los datos que no se guardan. Si
        algún tratamiento de tu web implica datos personales o de salud lo deciden
        tu DPO y tu asesoría, y la respuesta cambia si las URLs o las propiedades
        llevan información del paciente. Qué exige el RGPD a una herramienta de
        medición se resume en{" "}
        <Link className={link} href="/es/glossary/gdpr-analytics-compliance/">analítica y cumplimiento del RGPD</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que cuestan las opciones habituales",
    title: <>Medirlo todo<br /><em>o no medir nada.</em></>,
    body: "Las webs de salud suelen acabar en uno de dos extremos, y cada uno se paga en una moneda distinta.",
    items: [
      ["01", "Identificadores en páginas sensibles", "Una etiqueta que instala cookies o identificadores en páginas de enfermedades, síntomas o tratamientos crea justo la combinación que tiene que evaluar un DPO: una persona y el tema de salud que ha leído. La exposición está en el tratamiento, muestre lo que muestre el informe."],
      ["02", "Analítica retirada donde importa", "Una respuesta es quitar la analítica de las páginas de tratamiento y de los flujos de cita. Los canales que traen peticiones de cita se juzgan entonces con las páginas que menos pesan en la decisión."],
      ["03", "Canales juzgados con quien aceptó el banner", (
        <>
          Donde sigue el banner, una herramienta que depende del consentimiento
          pierde a quien lo rechaza. La documentación de Sealmetrics sitúa esa
          pérdida entre el 15% y el 60% de los visitantes europeos según el sector,
          la fuerza de la marca y el mix de tráfico; no hay una cifra publicada para
          salud. Cómo se forma ese hueco se explica en{" "}
          <Link className={link} href="/es/glossary/data-loss-in-analytics/">pérdida de datos en analítica</Link>.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "De la revisión al reporting",
    title: <>Decide qué envías.<br /><em>Después, mídelo.</em></>,
    body: (
      <>
        Casi todo el trabajo de privacidad en una implantación sanitaria consiste en
        decidir qué no sale nunca de tu web. La revisión se trata con más detalle en{" "}
        <Link className={link} href="/es/for/dpo/">analítica para DPOs</Link>.
      </>
    ),
    howToName: "Cómo implanta un proveedor sanitario una analítica sin cookies sin enviar datos de pacientes",
    howToDescription:
      "Cinco pasos para que una clínica, un grupo hospitalario o un medio de salud revise qué guarda Sealmetrics, deje los datos de pacientes fuera de lo que envía la web, concilie con las citas registradas y reporte por canal.",
    steps: [
      { name: "Revisa qué se guarda antes de instalar", text: "Entrega al DPO el DPA con su inventario de datos, plazos de conservación y subencargados, y la lista pública de campos. Decide qué finalidades activas: la medición agregada de audiencia y, como finalidad separada y opcional que se evalúa por sí misma, la atribución de marketing. Sealmetrics asiste con las evaluaciones de impacto según la cláusula 4.6 del DPA." },
      { name: "Deja los datos del paciente fuera de URLs, propiedades y campañas", text: "Comprueba que ninguna URL de la web lleva en sus parámetros un nombre, un email, un número de paciente, una referencia de cita o un diagnóstico. Envía las peticiones de cita como conversiones con propiedades genéricas acordadas con tu DPO, como el centro o el nombre del formulario, y nunca síntomas, enfermedades ni nada que identifique a una persona. No existe una lista de propiedades permitidas en servidor, así que la decisión es tuya como responsable del tratamiento." },
      { name: "Instala primero en las páginas públicas", text: "Añade el tracker a las páginas públicas y a los flujos de petición de cita, lo que lleva entre 5 y 30 minutos según la plataforma. Deja sin tracker los portales del paciente y las demás áreas con login salvo que tu DPO haya revisado esa implantación por separado." },
      { name: "Mide en paralelo y concilia con las citas registradas", text: "Mantén la configuración actual durante un ciclo de campaña completo y compara las peticiones de cita medidas con las que recibió tu sistema de citas en el mismo periodo, en total y por canal. La comparación es en agregado, nunca petición a petición." },
      { name: "Reporta canales, no pacientes", text: "Lee peticiones de cita y tasa de conversión por canal, campaña y página de llegada. Ningún informe muestra a un paciente: si la web no envía nada personal, ningún identificador guardado une una visita con una persona." },
    ],
  },

  roles: {
    tag: "Quién interviene",
    title: <>Cuatro mesas,<br /><em>un mismo perímetro.</em></>,
    body: "Cada función tiene una pregunta distinta sobre la misma implantación. Lo que comparten es el perímetro de lo que se guarda.",
    items: [
      { role: "Marketing y captación de pacientes", need: "Saber qué canales traen peticiones de cita.", how: "Peticiones por source, medium y campaign, atribuidas al último clic de cada sesión y sin pérdida por consentimiento.", link: { label: "Atribución de ingresos", href: "/es/use-cases/revenue-attribution/" } },
      { role: "DPO y asesoría jurídica", need: "Decidir si la implantación trata datos personales o de salud.", how: "El inventario de datos del DPA, la lista pública de campos y los análisis por país, como material para vuestra evaluación y no como conclusión.", link: { label: "Analítica para DPOs", href: "/es/for/dpo/" } },
      { role: "Sistemas y seguridad", need: "Controlar qué envía la etiqueta y quién ve los informes.", how: "En qué páginas corre el tracker, qué propiedades se envían, acceso por roles y doble factor; logs de auditoría desde Scale y lista de IP permitidas en Enterprise.", link: { label: "Visión general de seguridad", href: "/es/security/" } },
      { role: "Dirección", need: "Invertir en captación de pacientes sin añadir datos de pacientes a la analítica.", how: "Decisiones de canal sobre recuentos medidos y conciliados con el sistema de citas antes de comparar ningún canal.", link: { label: "Fuente única de verdad", href: "/es/use-cases/single-source-of-truth/" } },
    ],
  },

  proof: {
    tag: "Evidencia, no un caso del sector",
    body: "Sealmetrics no tiene publicado ningún caso de un proveedor sanitario, y esta página no lo insinúa. Los documentos de abajo son lo que una organización sanitaria puede comprobar hoy. La cifra medida procede de un grupo hotelero y se muestra solo como contexto de cómo la falta de origen deforma las decisiones de canal.",
    figures: [
      { value: "Anexo 1", label: "cada campo tratado, lo que nunca se guarda, categorías especiales incluidas, y cada plazo de conservación", client: "Contrato de encargo de tratamiento", href: "/es/dpa/" },
      { value: "1 día", label: "hasta que se purga el log de eventos con la URL completa; después solo quedan recuentos agregados", client: "Visión general de seguridad", href: "/es/security/" },
      { value: "35%", label: "de las reservas que registraba GA4 no tenía canal; contexto hotelero, no un resultado sanitario", client: "Palladium Hotel Group · hoteles", href: "/es/case-studies/palladium-hotel-group/" },
    ],
    readCase: "Abrir",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Cuenta visitas.<br /><em>No resuelve la ley.</em></>,
    body: (
      <>
        Los límites se dicen antes de la implantación, no después. La atribución es
        a último clic dentro de cada sesión, por diseño; los{" "}
        <Link className={link} href="/es/glossary/attribution-model/">modelos de atribución</Link>{" "}
        explican la diferencia.
      </>
    ),
    items: [
      ["No es una conclusión jurídica", "Esta página describe lo que guarda Sealmetrics. Si tu implantación trata datos personales o de salud, y si necesita consentimiento, lo deciden tu DPO y tu asesoría conforme a tus normas nacionales."],
      ["Lo que envías cambia la respuesta", "Nombres, emails, números de historia o enfermedades en URLs, propiedades o nombres de campaña meten datos personales o de salud en el sistema. Déjalos fuera."],
      ["Sin analítica por paciente", "Sin recorridos individuales, sin reconocimiento de visitantes recurrentes y sin perfiles de paciente. Un paciente que vuelve mañana es una visita nueva."],
      ["Las demás etiquetas mantienen sus obligaciones", "Los píxeles publicitarios, los chats, los vídeos incrustados y las herramientas de cita de esas mismas páginas mantienen sus propios requisitos de consentimiento y protección de datos."],
      ["No sustituye una evaluación de impacto", "El DPA, la lista de campos y las autoevaluaciones son material para tu evaluación de impacto, no la sustituyen."],
      ["Sin certificación ni normas sanitarias fuera de la UE", "Ni ISO 27001 ni SOC 2, ninguna certificación sanitaria y ninguna afirmación sobre HIPAA u otras normas de datos de salud fuera de la UE."],
    ],
  },

  faqTag: "Lo que preguntan las organizaciones sanitarias",
  faqTitle: <>Antes de poner el tracker<br /><em>en una página de tratamiento.</em></>,
  faq: [
    { question: "¿Recoge Sealmetrics datos de salud?", answer: "Sealmetrics no recoge nombres, emails, direcciones IP, identificadores de usuario ni identificadores entre sesiones, y el Anexo 1 de su DPA incluye las categorías especiales entre los datos que no se guardan. Sí registra URLs de página y conversiones, que conserva como recuentos agregados. Si un recuento de visitas a una página de tratamiento, o cualquier cosa que envíe tu implantación, implica datos de salud lo deciden tu DPO y tu asesoría, y la respuesta cambia si las URLs o las propiedades llevan información del paciente." },
    { question: "¿Podemos medir peticiones de cita sin enviar datos del paciente?", answer: "Sí. Envía cada petición completada como una conversión con propiedades genéricas acordadas con tu DPO, como el centro o el nombre del formulario, y nunca el nombre, los datos de contacto, los síntomas ni la enfermedad del paciente. Comprueba que las URLs de cita no llevan parámetros personales. No existe una lista de propiedades permitidas en servidor, así que lo que envías es responsabilidad tuya como responsable del tratamiento." },
    { question: "¿Seguimos necesitando un banner de cookies?", answer: "Para la analítica en sí, Sealmetrics no instala cookies ni guarda nada en el dispositivo del visitante. Que tu implantación quede exenta de consentimiento depende de su configuración, de las finalidades que actives y de los criterios de tu autoridad nacional. Los píxeles publicitarios, los chats y las demás herramientas de la web mantienen sus propios requisitos de consentimiento, así que puede seguir haciendo falta un banner para ellos." },
    { question: "¿Debe funcionar Sealmetrics en portales del paciente o áreas con login?", answer: "Solo después de que tu DPO haya revisado esa implantación concreta. Las áreas con login son donde es más probable que las URLs y los eventos lleven información del paciente, y Sealmetrics tampoco analiza usuarios individuales. Una implantación prudente empieza por las páginas públicas y los flujos de petición de cita, que es donde están las preguntas de captación." },
    { question: "¿Dónde se tratan los datos y cuánto tiempo se conservan?", answer: "El dato de visitante se almacena y trata en Dublín, Irlanda. El Anexo 3 del DPA enumera los subencargados; el único fuera de la UE envía emails de servicio a los usuarios de la cuenta y no recibe dato de visitante. Las filas de evento se purgan al día, los agregados horarios a los 90 días y los agregados diarios y las conversiones a los 24 meses." },
    { question: "¿Tiene Sealmetrics certificaciones sanitarias o de seguridad?", answer: "No. Sealmetrics no tiene certificación ISO 27001 ni SOC 2 ni ninguna certificación sanitaria, y no hace ninguna afirmación sobre HIPAA u otras normas de datos de salud fuera de la UE. Sus medidas de seguridad están en el Anexo 2 del DPA, y los clientes tienen derecho de auditoría según la cláusula 4.7." },
    { question: "¿Sustituye Sealmetrics nuestra evaluación de impacto?", answer: "No. Sealmetrics asiste con las evaluaciones de impacto según la cláusula 4.6 del DPA y aporta como material el inventario de datos, los plazos de conservación y las medidas de seguridad. La evaluación, y la decisión, siguen siendo tuyas como responsable del tratamiento." },
  ],

  final: {
    tag: "Revisión de implantación",
    title: <>Primero los datos.<br /><em>Después los canales.</em></>,
    body: "Treinta minutos con la persona responsable de la implantación: el inventario de datos, lo que tu web no debe enviar nunca y cómo se miden por canal las peticiones de cita.",
    primary: { label: "Reservar una revisión de implantación", href: "/es/demo/" },
    secondary: { label: "Leer el DPA", href: "/es/dpa/" },
  },
};
