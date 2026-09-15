import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /for/education — vertical engine, regulated audience (universities, business
 * schools, EdTech platforms).
 *
 * An admissions site cannot tell a seventeen-year-old from a parent or a mature
 * student, so the page describes what one visit leaves in the analytics tool
 * whoever made it, and leaves the applicability of children's-data rules to the
 * institution's counsel. It measures what recruitment needs — enquiries,
 * open-day registrations and applications by channel — and says plainly what
 * it cannot do on a months-long decision cycle. Tone follows #186 and
 * /gdpr-analytics.
 *
 * Product and contract facts (checked 15 Sep 2026):
 * - docs security-privacy/what-we-track: no cookies, localStorage,
 *   sessionStorage or fingerprinting; IP in memory, never persisted; no user
 *   IDs, emails, names or demographic profiling; session marker in memory,
 *   ~2 h inactivity, not stored on the device, cannot recognise a returning
 *   visitor; country from the browser time zone; event rows 1 day, aggregates up
 *   to 24 months; no ISO 27001 or SOC 2
 * - /dpa (v2.0): Annex 1 inventory; Purpose B (attribution) optional; clause 5
 *   the controller keeps direct personal data out of properties, URL parameters
 *   and campaign names; clause 4.6 DPIA assistance; clause 7 and Annex 3 visitor
 *   data in the EU, the one non-EU sub-processor receives no visitor data
 * - /security: TPSR package for technical, privacy and security review
 * - docs how-to-track-ajax-forms (conv 'lead' with form_name); docs api/stats
 *   (no server-side whitelist for properties, readable back with stats:read)
 * - docs external-auth-sso-attribution: external admissions, identity or payment
 *   domains take the credit as Referral unless registered as passthrough
 *   referrers through the API
 * - consent loss 15–60% of EU visitors is the documentation's own range
 *   (faq/ga4-vs-sealmetrics); no education figure exists and the page says so
 * - install 5–30 minutes by platform (/platforms)
 *
 * Removed from the old VerticalPageV3 copy (VerticalsData.tsx `education`):
 * "without student personal data" as an absolute conclusion; "analytics adds
 * no student data for COPPA or national youth rules to cover"; "Under-13
 * audiences trigger COPPA … full COPPA scope"; "Parental consent workflow
 * nightmare" and "consent from minors is impossible"; "Student data residency
 * rules vary by country" with its list of authorities; "Designed for GDPR and
 * national education data rules (self-assessed)"; "A/B optimization unlocked"
 * (no A/B testing feature); "Yes" to K-12 audiences on the ground that no data
 * COPPA regulates is collected; "one implementation serves every market"
 * against ICO, BSI, CNIL, COPPA and FERPA; the "course page view → info request
 * → application start → payment" funnel presented as a tracked path; the
 * migration and setup FAQs; the categorical GDPR FAQ; "no personal data, at
 * any age" as a headline promise.
 *
 * Deliberately not claimed: that rules on children's data (GDPR Art. 8, COPPA,
 * national youth-protection rules) do or do not apply, that consent is not
 * needed, any age detection, any education client or certification. There is
 * no sector case: the proof block shows documents plus one Incapto figure
 * labelled as eCommerce context.
 */

export const EDUCATION_PUBLISHED = "2026-03-02";
export const EDUCATION_PUBLISHED_ES = "2026-04-18";
export const EDUCATION_MODIFIED = "2026-09-15";

const link = "sig-problem-inline";
const WHAT_WE_TRACK = "https://docs.sealmetrics.com/security-privacy/what-we-track";
const PASSTHROUGH = "https://docs.sealmetrics.com/platform/tracking-and-attribution-settings/external-auth-sso-attribution";

export const educationEn: ProblemLandingContent = {
  route: "/for/education",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "For teams", href: "/for/" },
    { label: "Education" },
  ],
  eyebrow: "Industry · Universities, schools and EdTech",
  h1: <>Count enquiries.<br />Not the students<br /><em>behind them.</em></>,
  heroBody:
    "Universities, business schools and EdTech platforms need to know which channels bring programme enquiries and applications, and the people reading course pages include teenagers. A tool that sets cookies and identifiers applies them to every one of those visitors, and a consent banner removes part of the traffic anyway. Sealmetrics measures enquiries and applications by channel in aggregate, without cookies or stored identifiers, and documents what it stores so your counsel can assess it.",
  heroPrimary: { label: "See the deployment path", href: "#method" },
  heroSecondary: { label: "Read the DPA", href: "/dpa/" },
  heroMicro: "Aggregate counts · no cookies · no age, name or email collected · EU-hosted in Dublin · not legal advice",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: EDUCATION_MODIFIED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "A programme page visit · what is kept",
    status: "As documented",
    rows: [
      ["Cookie or device storage", "None"],
      ["Age, name or email", "Not collected"],
      ["Cross-session identifier", "None"],
      ["Processing", "Dublin, Ireland"],
    ],
    foot: "Enquiries and applications as aggregate conversions · event rows purged after 1 day",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Analytics for education is web measurement of how prospective students find
      a programme and send an enquiry or an application, on data an institution
      can put in front of its DPO. The difficulty is the audience: course and
      admissions pages are read by adults and by minors, and a tool that sets
      cookies or identifiers processes data about both without knowing which is
      which. A consent banner then removes the visitors who reject it, so channels
      are judged on part of the traffic. Sealmetrics sets no cookies, stores no IP
      addresses, user IDs or cross-session identifiers, collects no age, name or
      email, and keeps page views and conversions as aggregate counts processed in
      Dublin. Whether rules on children&apos;s data apply to your site, and whether
      your deployment needs consent, is for your counsel to decide, and what you
      send in URLs and properties is part of that assessment.
    </p>
  ),

  divergence: {
    tag: "What a visit leaves behind",
    title: <>Adult or minor,<br /><em>the record is the same.</em></>,
    body: "An admissions site cannot tell a seventeen-year-old from a parent or a mature student. The practical question is what each visit leaves in the analytics tool, whoever made it.",
    headers: ["What a visit to a programme page leaves", "Tag with cookies or identifiers", "Sealmetrics, as documented", "Where to verify"],
    rows: [
      ["Something on the device", "A cookie or client ID set on the first page", "No cookies, localStorage or sessionStorage", "What we track"],
      ["An identifier linking visits", "A client ID that recognises the visitor on the next visit", "No cross-session identifier; the session marker expires after 2 hours of inactivity", "What we track · DPA Annex 1"],
      ["Age, name or contact details", "Available to the tool when forms or user IDs are wired into it", "Not collected; conversions carry only the generic properties you choose to send", "DPA Annex 1 · clause 5"],
      ["The enquiry or application", "An event tied to the visitor's identifier", "An aggregate conversion credited to the last click of its session", "Conversion tracking"],
      ["Where it is processed", "Often a US provider, relying on a transfer framework", "Dublin, Ireland; no non-EU sub-processor receives visitor data", "DPA clause 7 · Annex 3"],
    ],
    note: (
      <>
        The field list is public in{" "}
        <a className={link} href={WHAT_WE_TRACK} target="_blank" rel="noopener noreferrer">what we track</a>.
        How national authorities treat audience measurement is set out country by
        country under <Link className={link} href="/gdpr-analytics/">GDPR analytics</Link>;
        none of those analyses addresses rules specific to children&apos;s data,
        which your counsel assesses for your site. The general question of{" "}
        <Link className={link} href="/glossary/personal-data-in-analytics/">personal data in analytics</Link>{" "}
        is covered in the glossary.
      </>
    ),
  },

  costs: {
    tag: "What the usual setup costs",
    title: <>The review grows.<br /><em>The data shrinks.</em></>,
    body: "Recruitment runs on a long cycle of open days, enquiries, applications and enrolment, and each common workaround removes part of it from view.",
    items: [
      ["01", "Identifiers on visitors who may be minors", "Cookies and client IDs are set on everyone who reads a programme page, including visitors below the age of digital consent in their country. Your DPO has to assess that processing, whatever the tool reports."],
      ["02", "Channels judged on the visitors who accepted", (
        <>
          A consent-based tool loses the visitors who reject its banner. The
          Sealmetrics documentation puts that at 15–60% of EU visitors depending on
          sector, brand strength and traffic mix; no figure for education has been
          published. How that gap forms is explained under{" "}
          <Link className={link} href="/glossary/data-loss-in-analytics/">data loss in analytics</Link>.
        </>
      )],
      ["03", "Applications credited to the portal", (
        <>
          Applications often continue on a separate admissions, identity or payment
          portal. Without configuration, the visit that returns from it is credited
          to that domain as a referral, not to the campaign that started it, as the{" "}
          <a className={link} href={PASSTHROUGH} target="_blank" rel="noopener noreferrer">external-domain guide</a>{" "}
          explains.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "From review to reporting",
    title: <>Agree what you send.<br /><em>Then count it.</em></>,
    body: (
      <>
        Five steps from the counsel review to channel reporting. Event-level detail
        for forms is in{" "}
        <Link className={link} href="/use-cases/conversion-tracking/">conversion tracking</Link>.
      </>
    ),
    howToName: "How a university or EdTech platform measures enquiries and applications by channel without personal data",
    howToDescription:
      "Five steps for an education institution to review what Sealmetrics stores, send enquiries and applications without personal data, keep the channel through admissions portals, reconcile with its CRM and report by channel.",
    steps: [
      { name: "Review the data inventory with counsel", text: "Share the DPA with its data inventory, retention periods and sub-processors, and the public field list, with the DPO and counsel. Record the purposes you enable: aggregated audience measurement, and marketing attribution as a separate, optional purpose assessed on its own terms." },
      { name: "Send enquiries and applications without personal data", text: "Fire a conversion when a programme enquiry, open-day registration or application is completed, with generic properties such as programme or campus. Never send names, emails, dates of birth, student or applicant numbers, and check that form URLs carry none. There is no server-side list of allowed properties, so what you send is your decision as controller." },
      { name: "Install on public pages and keep the channel through portals", text: "Add the tracker to public programme and admissions pages, which takes 5 to 30 minutes depending on the platform. If applications continue on an external admissions, identity or payment domain, register it as a passthrough referrer through the API. Leave student accounts and learning platforms without the tracker unless your DPO has reviewed them." },
      { name: "Run in parallel through one recruitment period", text: "Keep your current analytics running through at least one campaign or open-day period. Compare measured enquiries and applications with the totals in your CRM or admissions system, by period and by channel, never record by record." },
      { name: "Report channels, not students", text: "Read enquiries, applications and conversion rate by channel, campaign, landing page and country. No report shows a student: with nothing personal in what the site sends, no stored identifier links a visit to a person." },
    ],
  },

  roles: {
    tag: "Who is involved",
    title: <>From admissions to counsel,<br /><em>one set of numbers.</em></>,
    body: "Recruitment, legal, the web team and leadership look at the same deployment for different reasons.",
    items: [
      { role: "Marketing and recruitment", need: "Know which channels bring enquiries and applications for each programme.", how: "Conversions by source, medium, campaign and landing page, credited to the last click of each session, without consent loss.", link: { label: "Revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "DPO and legal counsel", need: "Assess processing on an audience that includes minors.", how: "The DPA data inventory and the public field list as material for your assessment; the country analyses are self-assessments, not rulings.", link: { label: "Analytics for DPOs", href: "/for/dpo/" } },
      { role: "IT and web team", need: "Control which pages run the tag and what it sends.", how: "Tracker on public pages, generic properties, passthrough referrers for portals; role-based access and 2FA for staff accounts.", link: { label: "Analytics for CTOs", href: "/for/cto/" } },
      { role: "Leadership", need: "Allocate recruitment budget on numbers admissions can reconcile.", how: "Measured enquiries and applications reconciled with the CRM or admissions system before any channel is compared.", link: { label: "Single source of truth", href: "/use-cases/single-source-of-truth/" } },
    ],
  },

  proof: {
    tag: "Evidence, not a sector case",
    body: "Sealmetrics has no published case study from a university, school or EdTech platform, and this page does not imply one. The documents below can be checked today. The measured figure comes from an eCommerce parallel run and shows how uneven consent loss changes the channel mix; it is context, not an education result.",
    figures: [
      { value: "Annex 1", label: "every field processed, what is never stored and each retention period", client: "Data Processing Agreement", href: "/dpa/" },
      { value: "3", label: "country analyses of audience-measurement criteria (CNIL, DSK, AEPD); self-assessments, not certifications", client: "GDPR analytics by country", href: "/gdpr-analytics/" },
      { value: "12 pts", label: "gap in paid campaigns' share of traffic, 50% in GA4 against 62% measured; eCommerce context, not an education result", client: "Incapto · eCommerce", href: "/case-studies/incapto/" },
    ],
    readCase: "Open",
  },

  limits: {
    tag: "What it does not do",
    title: <>It counts enquiries.<br /><em>It does not know who sent them.</em></>,
    body: (
      <>
        These limits come from measuring without identifying anyone. Attribution is{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last click</Link>{" "}
        within each session, by design.
      </>
    ),
    items: [
      ["No student-level analytics", "No individual journeys, returning-visitor recognition or profiles. A prospective student who returns after an open day is a new visit."],
      ["Last click per session", "No lookback across sessions and no multi-touch model. A decision that takes months is credited to the session in which the application is sent."],
      ["No age detection", "Sealmetrics does not know or infer a visitor's age, and cannot tell you whether minors use your site."],
      ["No claim about children's-data rules", "Nothing here states whether COPPA, national youth-protection rules or the GDPR provisions on children apply to your site. That is for your counsel."],
      ["Other tools keep their obligations", "Advertising pixels, chat widgets, video embeds and learning platforms keep their own consent and data protection requirements."],
      ["Not legal advice, no certification", "The DPA and the self-assessments support your DPIA and legal analysis; they do not replace them. No ISO 27001 or SOC 2 certification is claimed."],
    ],
  },

  faqTag: "Questions education teams ask",
  faqTitle: <>Before the next<br /><em>recruitment campaign.</em></>,
  faq: [
    { question: "Can Sealmetrics be used on sites visited by minors?", answer: "Sealmetrics collects no age, name, email, IP address or cross-session identifier from any visitor, whatever their age, and stores nothing on the device. Whether rules on children's data apply to your site, and what they require, depends on your audience, your services and your jurisdiction. That is for your counsel to assess, with the data inventory in the DPA as input." },
    { question: "Do we still need a cookie banner?", answer: "For the analytics itself, Sealmetrics sets no cookie and stores nothing on the visitor's device. Whether your deployment is exempt from consent depends on its configuration, the purposes you enable and your national authority's criteria. Advertising pixels, chat widgets and other tools on the site keep their own consent requirements, so a banner may still be needed for them." },
    { question: "How do we measure enquiries and applications?", answer: "Send each completed programme enquiry, open-day registration or application as a conversion with generic properties such as programme or campus. Each one is credited to the last click of its session. If the application continues on an external admissions or payment portal, register that domain as a passthrough referrer through the API so the original channel is kept." },
    { question: "Should Sealmetrics run on student portals or learning platforms?", answer: "Only after your DPO has reviewed that deployment. Logged-in areas are where URLs and events are most likely to carry student information, and Sealmetrics does not analyse individual users in any case. The acquisition questions sit on public programme pages and admissions flows." },
    { question: "What should never be sent in properties or URLs?", answer: "Names, emails, phone numbers, dates of birth, student or applicant numbers, and anything else that identifies a person. The DPA makes keeping direct personal data out of properties, URL parameters and campaign names the controller's obligation, and properties can be read back by anyone with access to the site's reports." },
    { question: "Where is the data processed, and what documentation is available?", answer: "Visitor data is stored and processed in Dublin, Ireland; the only non-EU sub-processor sends service emails to account users and receives no visitor data. The Article 28 DPA covers the data inventory, retention, security measures and sub-processors. A TPSR package is available for technical, privacy and security review, and Sealmetrics assists with impact assessments under clause 4.6 of the DPA." },
    { question: "How long should we run it next to our current analytics?", answer: "At least one recruitment campaign or open-day period, with your current tools still running. Compare measured enquiries and applications with the totals in your CRM or admissions system by period and channel before moving budget." },
  ],

  final: {
    tag: "Recruitment measurement review",
    title: <>Bring admissions.<br /><em>Bring counsel too.</em></>,
    body: "Thirty minutes with the person responsible for the implementation: the data inventory, what your site should never send, and how enquiries and applications are measured by channel.",
    primary: { label: "Book a recruitment measurement review", href: "/demo/" },
    secondary: { label: "Read the security overview", href: "/security/" },
  },
};

export const educationEs: ProblemLandingContent = {
  route: "/for/education",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Por equipo", href: "/es/for/" },
    { label: "Educación" },
  ],
  eyebrow: "Sector · Universidades, escuelas y EdTech",
  h1: <>Cuenta peticiones.<br />No a los alumnos<br /><em>que hay detrás.</em></>,
  heroBody:
    "Universidades, escuelas de negocio y plataformas EdTech necesitan saber qué canales traen peticiones de información y solicitudes de admisión, y entre quienes leen las páginas de los programas hay adolescentes. Una herramienta que instala cookies e identificadores los aplica a cada uno de esos visitantes, y el banner de consentimiento se lleva además parte del tráfico. Sealmetrics mide peticiones y solicitudes por canal en agregado, sin cookies ni identificadores guardados, y documenta qué guarda para que tu asesoría jurídica lo evalúe.",
  heroPrimary: { label: "Ver el recorrido de implantación", href: "#method" },
  heroSecondary: { label: "Leer el DPA", href: "/es/dpa/" },
  heroMicro: "Recuentos agregados · sin cookies · sin edad, nombre ni email · alojado en Dublín · no es asesoramiento jurídico",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Actualizado",
    date: EDUCATION_MODIFIED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Una visita a un programa · lo que se guarda",
    status: "Según la documentación",
    rows: [
      ["Cookie o almacenamiento en el dispositivo", "Ninguno"],
      ["Edad, nombre o email", "No se recogen"],
      ["Identificador entre sesiones", "Ninguno"],
      ["Tratamiento", "Dublín, Irlanda"],
    ],
    foot: "Peticiones y solicitudes como conversiones agregadas · filas de evento purgadas al día",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      La analítica para educación es la medición web de cómo los futuros alumnos
      encuentran un programa y envían una petición de información o una solicitud
      de admisión, con datos que una institución puede poner delante de su DPO. La
      dificultad está en la audiencia: las páginas de programas y de admisión las
      leen adultos y menores, y una herramienta que instala cookies o
      identificadores trata datos de ambos sin saber quién es quién. El banner de
      consentimiento se lleva después a quien lo rechaza, así que los canales se
      juzgan con una parte del tráfico. Sealmetrics no instala cookies, no guarda
      direcciones IP, identificadores de usuario ni identificadores entre
      sesiones, no recoge edad, nombre ni email, y conserva páginas vistas y
      conversiones como recuentos agregados tratados en Dublín. Si las normas sobre
      datos de menores se aplican a tu web, y si tu implantación necesita
      consentimiento, lo decide tu asesoría jurídica, y lo que envías en URLs y
      propiedades forma parte de esa evaluación.
    </p>
  ),

  divergence: {
    tag: "Lo que deja una visita",
    title: <>Adulto o menor,<br /><em>el registro es el mismo.</em></>,
    body: "Una web de admisiones no distingue a alguien de diecisiete años de un padre o de un alumno adulto. La pregunta práctica es qué deja cada visita en la herramienta de analítica, la haga quien la haga.",
    headers: ["Lo que deja una visita a un programa", "Etiqueta con cookies o identificadores", "Sealmetrics, según su documentación", "Dónde verificarlo"],
    rows: [
      ["Algo en el dispositivo", "Una cookie o un identificador de cliente desde la primera página", "Ni cookies, ni localStorage, ni sessionStorage", "What we track"],
      ["Un identificador que une visitas", "Un identificador de cliente que reconoce al visitante en la siguiente visita", "Ningún identificador entre sesiones; el marcador de sesión caduca tras 2 horas de inactividad", "What we track · Anexo 1 del DPA"],
      ["Edad, nombre o datos de contacto", "Al alcance de la herramienta cuando se le conectan formularios o identificadores de usuario", "No se recogen; las conversiones llevan solo las propiedades genéricas que decidas enviar", "Anexo 1 y cláusula 5 del DPA"],
      ["La petición o la solicitud", "Un evento ligado al identificador del visitante", "Una conversión agregada atribuida al último clic de su sesión", "Seguimiento de conversiones"],
      ["Dónde se trata", "A menudo en un proveedor de EE. UU., apoyado en un marco de transferencias", "Dublín, Irlanda; ningún subencargado fuera de la UE recibe dato de visitante", "Cláusula 7 y Anexo 3 del DPA"],
    ],
    note: (
      <>
        La lista de campos es pública en{" "}
        <a className={link} href={WHAT_WE_TRACK} target="_blank" rel="noopener noreferrer">what we track</a>{" "}
        (en inglés). Cómo tratan las autoridades la medición de audiencia se explica
        en <Link className={link} href="/es/gdpr-analytics/">analítica y RGPD</Link>;
        ninguno de esos análisis aborda las normas específicas sobre datos de
        menores, que tu asesoría evalúa para tu web. Qué exige el RGPD a una
        herramienta de medición se resume en{" "}
        <Link className={link} href="/es/glossary/gdpr-analytics-compliance/">analítica y cumplimiento del RGPD</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que cuesta la configuración habitual",
    title: <>La revisión crece.<br /><em>El dato se encoge.</em></>,
    body: "La captación de alumnos funciona con un ciclo largo de jornadas de puertas abiertas, peticiones de información, solicitudes y matrícula, y cada atajo habitual deja una parte fuera de la vista.",
    items: [
      ["01", "Identificadores sobre visitantes que pueden ser menores", "Las cookies y los identificadores de cliente se aplican a todo el que lee la página de un programa, incluidos los visitantes por debajo de la edad de consentimiento digital de su país. Tu DPO tiene que evaluar ese tratamiento, informe lo que informe la herramienta."],
      ["02", "Canales juzgados con quien aceptó el banner", (
        <>
          Una herramienta que depende del consentimiento pierde a quien rechaza su
          banner. La documentación de Sealmetrics sitúa esa pérdida entre el 15% y el
          60% de los visitantes europeos según el sector, la fuerza de la marca y el
          mix de tráfico; no hay una cifra publicada para educación. Cómo se forma
          ese hueco se explica en{" "}
          <Link className={link} href="/es/glossary/data-loss-in-analytics/">pérdida de datos en analítica</Link>.
        </>
      )],
      ["03", "Solicitudes atribuidas al portal", (
        <>
          Las solicitudes suelen continuar en un portal aparte de admisiones,
          identidad o pago. Sin configurarlo, la visita que vuelve de ese portal se le
          atribuye como referral, y no a la campaña que la inició, como explica la{" "}
          <a className={link} href={PASSTHROUGH} target="_blank" rel="noopener noreferrer">guía de dominios externos</a>{" "}
          (en inglés).
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "De la revisión al reporting",
    title: <>Acuerda qué envías.<br /><em>Después, cuéntalo.</em></>,
    body: (
      <>
        Cinco pasos desde la revisión jurídica hasta el reporting por canal. Las
        reglas con las que se atribuye cada solicitud se explican en{" "}
        <Link className={link} href="/es/use-cases/revenue-attribution/">atribución de ingresos</Link>.
      </>
    ),
    howToName: "Cómo mide una universidad o una plataforma EdTech peticiones y solicitudes por canal sin datos personales",
    howToDescription:
      "Cinco pasos para que una institución educativa revise qué guarda Sealmetrics, envíe peticiones y solicitudes sin datos personales, conserve el canal a través de los portales de admisión, concilie con su CRM y reporte por canal.",
    steps: [
      { name: "Revisa el inventario de datos con tu asesoría", text: "Comparte con el DPO y la asesoría jurídica el DPA con su inventario de datos, plazos de conservación y subencargados, y la lista pública de campos. Deja por escrito las finalidades que activas: la medición agregada de audiencia y, como finalidad separada y opcional que se evalúa por sí misma, la atribución de marketing." },
      { name: "Envía peticiones y solicitudes sin datos personales", text: "Lanza una conversión cuando se completa una petición de información, una inscripción a una jornada de puertas abiertas o una solicitud, con propiedades genéricas como el programa o el campus. No envíes nunca nombres, emails, fechas de nacimiento ni números de alumno o de solicitante, y comprueba que las URLs de los formularios no los llevan. No existe una lista de propiedades permitidas en servidor, así que lo que envías lo decides tú como responsable del tratamiento." },
      { name: "Instala en las páginas públicas y conserva el canal a través de los portales", text: "Añade el tracker a las páginas públicas de programas y admisiones, lo que lleva entre 5 y 30 minutos según la plataforma. Si la solicitud continúa en un dominio externo de admisiones, identidad o pago, regístralo por API como passthrough referrer. Deja sin tracker las cuentas de alumno y las plataformas de aprendizaje salvo que tu DPO las haya revisado." },
      { name: "Mide en paralelo durante un periodo de captación", text: "Mantén tu analítica actual durante al menos una campaña o un periodo de jornadas de puertas abiertas. Compara las peticiones y solicitudes medidas con los totales de tu CRM o de tu sistema de admisiones, por periodo y por canal, nunca registro a registro." },
      { name: "Reporta canales, no alumnos", text: "Lee peticiones, solicitudes y tasa de conversión por canal, campaña, página de llegada y país. Ningún informe muestra a un alumno: si la web no envía nada personal, ningún identificador guardado une una visita con una persona." },
    ],
  },

  roles: {
    tag: "Quién interviene",
    title: <>De admisiones a la asesoría,<br /><em>las mismas cifras.</em></>,
    body: "Captación, asesoría jurídica, el equipo web y la dirección miran la misma implantación por motivos distintos.",
    items: [
      { role: "Marketing y captación de alumnos", need: "Saber qué canales traen peticiones y solicitudes para cada programa.", how: "Conversiones por source, medium, campaign y página de llegada, atribuidas al último clic de cada sesión y sin pérdida por consentimiento.", link: { label: "Atribución de ingresos", href: "/es/use-cases/revenue-attribution/" } },
      { role: "DPO y asesoría jurídica", need: "Evaluar el tratamiento sobre una audiencia que incluye menores.", how: "El inventario de datos del DPA y la lista pública de campos como material para vuestra evaluación; los análisis por país son autoevaluaciones, no dictámenes.", link: { label: "Analítica para DPOs", href: "/es/for/dpo/" } },
      { role: "Sistemas y equipo web", need: "Controlar en qué páginas corre la etiqueta y qué envía.", how: "Tracker en páginas públicas, propiedades genéricas, passthrough referrers para los portales; acceso por roles y doble factor para las cuentas del personal.", link: { label: "Analítica para CTOs", href: "/es/for/cto/" } },
      { role: "Dirección", need: "Repartir el presupuesto de captación con cifras que admisiones pueda conciliar.", how: "Peticiones y solicitudes medidas y conciliadas con el CRM o el sistema de admisiones antes de comparar ningún canal.", link: { label: "Fuente única de verdad", href: "/es/use-cases/single-source-of-truth/" } },
    ],
  },

  proof: {
    tag: "Evidencia, no un caso del sector",
    body: "Sealmetrics no tiene publicado ningún caso de una universidad, una escuela o una plataforma EdTech, y esta página no lo insinúa. Los documentos de abajo se pueden comprobar hoy. La cifra medida procede de una medición en paralelo en eCommerce y muestra cómo una pérdida por consentimiento desigual cambia el mix de canales; es contexto, no un resultado educativo.",
    figures: [
      { value: "Anexo 1", label: "cada campo tratado, lo que nunca se guarda y cada plazo de conservación", client: "Contrato de encargo de tratamiento", href: "/es/dpa/" },
      { value: "España", label: "análisis de los criterios de la AEPD para la medición de audiencia; una autoevaluación, no una certificación", client: "Analítica y RGPD en España", href: "/es/gdpr-analytics/spain/" },
      { value: "12 pts", label: "de diferencia en la cuota de tráfico de las campañas de pago, 50% en GA4 frente a 62% medido; contexto de eCommerce, no un resultado educativo", client: "Incapto · eCommerce", href: "/es/case-studies/incapto/" },
    ],
    readCase: "Abrir",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Cuenta peticiones.<br /><em>No sabe quién las envía.</em></>,
    body: (
      <>
        Estos límites vienen de medir sin identificar a nadie. La atribución es a
        último clic dentro de cada sesión, por diseño; los{" "}
        <Link className={link} href="/es/glossary/attribution-model/">modelos de atribución</Link>{" "}
        explican la diferencia.
      </>
    ),
    items: [
      ["Sin analítica por alumno", "Sin recorridos individuales, reconocimiento de visitantes recurrentes ni perfiles. Un futuro alumno que vuelve después de una jornada de puertas abiertas es una visita nueva."],
      ["Último clic por sesión", "Sin ventana entre sesiones y sin modelo multi-touch. Una decisión que lleva meses se atribuye a la sesión en la que se envía la solicitud."],
      ["Sin detección de edad", "Sealmetrics no conoce ni infiere la edad de un visitante, y no puede decirte si tu web la usan menores."],
      ["Ninguna afirmación sobre normas de menores", "Nada de lo que aquí se dice establece si COPPA, las normas nacionales de protección de menores o las disposiciones del RGPD sobre niños se aplican a tu web. Eso lo decide tu asesoría."],
      ["Las demás herramientas mantienen sus obligaciones", "Los píxeles publicitarios, los chats, los vídeos incrustados y las plataformas de aprendizaje mantienen sus propios requisitos de consentimiento y protección de datos."],
      ["No es asesoramiento jurídico ni certificación", "El DPA y las autoevaluaciones apoyan tu evaluación de impacto y tu análisis jurídico; no los sustituyen. No se declara ninguna certificación ISO 27001 ni SOC 2."],
    ],
  },

  faqTag: "Lo que preguntan los equipos de educación",
  faqTitle: <>Antes de la próxima<br /><em>campaña de captación.</em></>,
  faq: [
    { question: "¿Se puede usar Sealmetrics en webs que visitan menores?", answer: "Sealmetrics no recoge edad, nombre, email, dirección IP ni identificador entre sesiones de ningún visitante, tenga la edad que tenga, y no guarda nada en el dispositivo. Si las normas sobre datos de menores se aplican a tu web, y qué exigen, depende de tu audiencia, de tus servicios y de tu jurisdicción. Eso lo evalúa tu asesoría, con el inventario de datos del DPA como material." },
    { question: "¿Seguimos necesitando un banner de cookies?", answer: "Para la analítica en sí, Sealmetrics no instala cookies ni guarda nada en el dispositivo del visitante. Que tu implantación quede exenta de consentimiento depende de su configuración, de las finalidades que actives y de los criterios de tu autoridad nacional. Los píxeles publicitarios, los chats y las demás herramientas de la web mantienen sus propios requisitos de consentimiento, así que puede seguir haciendo falta un banner para ellos." },
    { question: "¿Cómo medimos peticiones de información y solicitudes?", answer: "Envía cada petición de información, inscripción a una jornada de puertas abiertas o solicitud completada como una conversión con propiedades genéricas como el programa o el campus. Cada una se atribuye al último clic de su sesión. Si la solicitud continúa en un portal externo de admisiones o de pago, registra ese dominio por API como passthrough referrer para conservar el canal de origen." },
    { question: "¿Debe funcionar Sealmetrics en portales de alumnos o plataformas de aprendizaje?", answer: "Solo después de que tu DPO haya revisado esa implantación. Las áreas con login son donde es más probable que las URLs y los eventos lleven información de alumnos, y Sealmetrics tampoco analiza usuarios individuales. Las preguntas de captación están en las páginas públicas de programas y en los flujos de admisión." },
    { question: "¿Qué no debe enviarse nunca en propiedades o URLs?", answer: "Nombres, emails, teléfonos, fechas de nacimiento, números de alumno o de solicitante y cualquier otra cosa que identifique a una persona. El DPA fija como obligación del responsable mantener los datos personales directos fuera de las propiedades, los parámetros de URL y los nombres de campaña, y cualquiera con acceso a los informes de la web puede leer las propiedades." },
    { question: "¿Dónde se tratan los datos y qué documentación hay?", answer: "El dato de visitante se almacena y trata en Dublín, Irlanda; el único subencargado fuera de la UE envía emails de servicio a los usuarios de la cuenta y no recibe dato de visitante. El contrato de encargo del artículo 28 recoge el inventario de datos, la conservación, las medidas de seguridad y los subencargados. Hay un paquete TPSR para la revisión técnica, de privacidad y de seguridad, y Sealmetrics asiste con las evaluaciones de impacto según la cláusula 4.6 del DPA." },
    { question: "¿Cuánto tiempo conviene medir junto a nuestra analítica actual?", answer: "Al menos una campaña de captación o un periodo de jornadas de puertas abiertas, con tus herramientas actuales funcionando. Compara las peticiones y solicitudes medidas con los totales de tu CRM o de tu sistema de admisiones por periodo y canal antes de mover presupuesto." },
  ],

  final: {
    tag: "Revisión de medición de captación",
    title: <>Trae a admisiones.<br /><em>Y a tu asesoría.</em></>,
    body: "Treinta minutos con la persona responsable de la implantación: el inventario de datos, lo que tu web no debe enviar nunca y cómo se miden por canal las peticiones y las solicitudes.",
    primary: { label: "Reservar una revisión de captación", href: "/es/demo/" },
    secondary: { label: "Leer la visión general de seguridad", href: "/es/security/" },
  },
};
