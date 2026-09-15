import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * /for/finance — vertical engine, regulated sector (banks, insurers, lenders).
 *
 * A financial services team arrives with two gates in front of its channel
 * data: the consent banner removes part of the traffic, and every new tag has
 * to pass a vendor review. The page answers the vendor review first, with the
 * document behind each answer, and then the measurement of lead forms and
 * applications. Tone follows #186 and /gdpr-analytics: regulatory statements are
 * conditional, nothing says a deployment "is exempt", nothing is certified.
 *
 * Product and contract facts (checked 15 Sep 2026):
 * - docs security-privacy/what-we-track: no cookies, localStorage,
 *   sessionStorage or fingerprinting; IP used in memory, never persisted; no
 *   user IDs, emails or names stored; session marker in memory, ~2 h inactivity,
 *   not stored on the device, cannot recognise a returning visitor; event rows
 *   1 day, hourly aggregates 90 days, daily aggregates and conversions 24 months;
 *   no ISO 27001 or SOC 2
 * - /dpa (v2.0): Annex 1 data inventory; Annex 2 security measures (TLS 1.2+,
 *   AES-256, server-side pseudonymisation of the session marker, per-client
 *   isolation, TTL retention, RBAC, MFA, logged access); Annex 3 sub-processors
 *   (Noraina, Ireland; Scaleway, Paris; Resend, US, service emails, no visitor
 *   data); clause 4.6 DPIA assistance; 4.7 audits; 4.8 30-day export then
 *   deletion; clause 5 the controller keeps direct personal data out of
 *   properties, URL parameters and campaign names; clause 7 visitor data in the
 *   EU; Purpose B (marketing attribution) is optional and separate
 * - /security: TPSR "a structured package for technical, privacy and security
 *   review"; /trust section 2: DPIA, LIA for the attribution layer and security
 *   questionnaires on request
 * - docs platform/settings/advanced/audit-log: the actions logged (users,
 *   invitations, accounts, conversions, content groups, settings, API tokens,
 *   billing) with actor, time and IP; audit logs on Scale and Enterprise
 *   (docs billing/features-comparison, PricingSignal.tsx)
 * - docs api/ip-allowlist: Enterprise only; isolated processing on Enterprise
 *   (PricingSignal.tsx); 2FA via TOTP (security-privacy/account-security)
 * - docs how-to-track-ajax-forms: sealmetrics.conv('lead', 0, {form_name});
 *   docs api/stats: no server-side whitelist for properties, readable back by
 *   anyone with stats:read; docs custom-properties: never PII in properties
 * - docs external-auth-sso-attribution: an external domain in the journey takes
 *   the credit as Referral unless registered as a passthrough referrer (API)
 * - consent loss range 15–60% of EU visitors by sector, brand and traffic mix is
 *   the documentation's own range (faq/ga4-vs-sealmetrics); quoted as such
 * - install 5–30 minutes by platform (/platforms)
 *
 * Removed from the old VerticalPageV3 copy (VerticalsData.tsx `finance`):
 * "bank-grade compliance"; "sign off in one meeting — not three" and the
 * "1 meeting review" outcome; "4-month review" and "skip the 4-month review";
 * "cuts your vendor review cycle from 3 months to 2 weeks"; "zero personal data
 * means zero ongoing assessments"; "no third-country sub-processors, ever"
 * (Resend is a US sub-processor for account emails); "Full audit trail built-in
 * / every data access logged / regulator-ready audit trails" (the audit log
 * records admin actions, not data access); "Yes" to PSD2 / DORA / EBA audit
 * requirements and the "named compliance contact"; the list of regulated
 * industries "currently served" (no such client is published); "data never
 * shares infrastructure with other customers"; "consent-free tracking" of a
 * pre-KYC funnel; "our compliance lead"; the categorical GDPR FAQ.
 *
 * Deliberately not claimed: any sector certification, any statement about
 * PSD2, DORA or EBA outsourcing rules beyond saying no claim is made, and any
 * financial-services client. There is no sector case: the proof block shows
 * documents plus one Incapto figure labelled as eCommerce context.
 */

export const FINANCE_PUBLISHED = "2026-03-02";
export const FINANCE_PUBLISHED_ES = "2026-04-18";
export const FINANCE_MODIFIED = "2026-09-15";

const link = "sig-problem-inline";
const WHAT_WE_TRACK = "https://docs.sealmetrics.com/security-privacy/what-we-track";
const PASSTHROUGH = "https://docs.sealmetrics.com/platform/tracking-and-attribution-settings/external-auth-sso-attribution";

export const financeEn: ProblemLandingContent = {
  route: "/for/finance",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "For teams", href: "/for/" },
    { label: "Finance" },
  ],
  eyebrow: "Industry · Banking, insurance and lending",
  h1: <>The form is submitted.<br />The channel<br /><em>is not on record.</em></>,
  heroBody:
    "A bank, insurer or lender sees every application in its own systems. The channel behind it comes from analytics that loses visitors at the consent banner, and every new tag has to pass a vendor review first. Sealmetrics measures lead forms and applications by channel and campaign without cookies or stored identifiers, and publishes the DPA, the data inventory and the security measures so the review starts from documents.",
  heroPrimary: { label: "See the review path", href: "#method" },
  heroSecondary: { label: "Read the DPA", href: "/dpa/" },
  heroMicro: "EU-hosted in Dublin · DPA included · last click per session · no ISO 27001 or SOC 2 claimed · not legal advice",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: FINANCE_MODIFIED,
    dateDisplay: "15 September 2026",
  },
  module: {
    title: "What a vendor review receives",
    status: "Documented",
    rows: [
      ["Device storage", "None"],
      ["Visitor IP", "In memory · not stored"],
      ["Visitor data location", "Dublin, Ireland"],
      ["Security certifications", "None claimed"],
    ],
    foot: "Sub-processors in DPA Annex 3 · audit rights in clause 4.7 · TPSR package available",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Analytics for financial services is web measurement that credits
      applications, quote requests and lead forms to the channels that produced
      them, on data a compliance and procurement review can check. Two things
      usually break it. A consent-based tool does not record visitors who reject
      the banner, so channels are judged on part of the traffic. And every new tag
      reopens a vendor review, so measurement stops being added. Sealmetrics
      counts visits without cookies or device storage, stores no IP addresses or
      cross-session identifiers, processes visitor data in Dublin and credits each
      conversion to the last click of its session. The DPA lists the fields,
      retention periods, security measures and sub-processors. Whether a
      deployment needs consent still depends on its configuration and the
      national authority, the site&apos;s other tags keep their own requirements,
      and Sealmetrics holds no ISO 27001 or SOC 2 certification.
    </p>
  ),

  divergence: {
    tag: "What a vendor review asks",
    title: <>Six questions.<br /><em>Where each answer lives.</em></>,
    body: "Procurement, the DPO and information security ask any analytics vendor roughly the same things. These are the answers Sealmetrics documents, next to the document that says it.",
    headers: ["The question", "What to ask any vendor for", "Sealmetrics, as documented", "Where to verify"],
    rows: [
      ["What is collected about visitors?", "A field-by-field inventory with retention", "Page, referrer, campaign, device category, time zone and conversions; no IP, user ID, email or name stored; event rows purged after 1 day, aggregates kept 24 months", "What we track · DPA Annex 1"],
      ["Is anything stored on the visitor's device?", "A statement you can check in the browser", "No cookies, localStorage or sessionStorage; the session marker is pseudonymised server-side and expires after 2 hours of inactivity", "What we track · DPA Annex 2"],
      ["Where is visitor data processed, and by whom?", "The sub-processor list and the transfer basis", "Stored and processed in the EU; the only non-EU sub-processor sends account emails and receives no visitor data", "DPA clause 7 · Annex 3"],
      ["Who can reach the dashboard?", "Access controls and activity logging", "Role-based access and two-factor authentication; audit logs from the Scale plan; IP allowlist on Enterprise", "Security overview · pricing"],
      ["What security evidence exists?", "Certifications or equivalent documentation", "No ISO 27001 or SOC 2; security measures in DPA Annex 2, a TPSR package and assistance with impact assessments", "DPA Annex 2 · clause 4.6"],
      ["What happens when the contract ends?", "Export and deletion terms", "30 days to export through the API or BigQuery, then deletion or return of the data", "DPA clause 4.8"],
    ],
    note: (
      <>
        None of these answers approves a vendor on its own: your procurement, DPO
        and security teams still run their assessment. The field list is public in{" "}
        <a className={link} href={WHAT_WE_TRACK} target="_blank" rel="noopener noreferrer">what we track</a>,
        the contractual terms are in the{" "}
        <Link className={link} href="/dpa/">DPA</Link>, and why a minimal dataset
        matters is explained under{" "}
        <Link className={link} href="/glossary/personal-data-in-analytics/">personal data in analytics</Link>.
      </>
    ),
  },

  costs: {
    tag: "What the current setup costs",
    title: <>Two gates.<br /><em>Both cost data.</em></>,
    body: "Consent loss and review friction never appear as a budget line. They appear as channels judged on part of the traffic, and as measurement nobody adds.",
    items: [
      ["01", "Channels judged on the visitors who accepted", (
        <>
          A consent-based tool records only the visitors who accept its banner.
          The Sealmetrics documentation puts the loss at 15–60% of EU visitors
          depending on sector, brand strength and traffic mix; no figure for
          financial services has been published. Acquisition budgets for accounts,
          cards or policies are then split on a partial mix, the problem described
          under{" "}
          <Link className={link} href="/glossary/data-loss-in-analytics/">data loss in analytics</Link>.
        </>
      )],
      ["02", "Measurement that never gets added", "A new tag, identifier or purpose changes the processing and can reopen the vendor review. When every addition costs a review, the quote calculator or the second step of an application simply goes unmeasured."],
      ["03", "Applications credited to the wrong domain", (
        <>
          Applications often finish on a separate onboarding, identity-verification
          or payment domain. Without configuration, the visit that returns from it
          is credited to that domain as a referral instead of the campaign that
          started it, as the{" "}
          <a className={link} href={PASSTHROUGH} target="_blank" rel="noopener noreferrer">external-domain guide</a>{" "}
          explains.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "From vendor review to reporting",
    title: <>Review first.<br /><em>Then measure.</em></>,
    body: (
      <>
        Five steps, in the order a regulated organisation usually needs them. The
        event-level detail for forms is in{" "}
        <Link className={link} href="/use-cases/conversion-tracking/">conversion tracking</Link>.
      </>
    ),
    howToName: "How a financial services team deploys cookieless analytics through a vendor review",
    howToDescription:
      "Five steps for a bank, insurer or lender to review Sealmetrics on documents, measure lead forms and applications without personal data, reconcile with its own systems and report by channel.",
    steps: [
      { name: "Run the vendor review on documents", text: "Give procurement, the DPO and information security the DPA with its annexes (data processed, retention, security measures, sub-processors), the public field list and the TPSR package. Record the purposes you enable: aggregated audience measurement, and marketing attribution as a separate, optional purpose assessed on its own terms." },
      { name: "Implement without personal data in what you send", text: "Install the tracker, which takes 5 to 30 minutes depending on the platform, and send completed lead forms, quote requests and applications as conversions with generic properties such as product line or form name. Never put names, emails, account or policy numbers in properties, URLs or campaign names: the DPA makes that the controller's obligation, and there is no server-side list of allowed properties." },
      { name: "Keep the channel through onboarding domains", text: "If applications continue on an external onboarding, identity-verification or payment domain, register that domain as a passthrough referrer through the API, so the conversion keeps the campaign that started the session. Advertising pixels stay under your consent banner as before." },
      { name: "Run it in parallel and reconcile with your own systems", text: "Keep the current analytics running for at least one full campaign cycle. Compare measured applications with the count in your CRM or core system for the same period, by total and by channel. Comparison is never record by record, because application and customer IDs are never sent to Sealmetrics." },
      { name: "Report on the reconciled base", text: "Read applications and conversion rate by channel, campaign and landing page, and share the same numbers with marketing, compliance and management. On Scale and Enterprise, audit logs record who changed users, conversions, settings and API tokens." },
    ],
  },

  roles: {
    tag: "Who signs off, who uses it",
    title: <>Four reviewers.<br /><em>One set of documents.</em></>,
    body: "Each function asks a different question of the same deployment, and each has a document or a report that answers it.",
    items: [
      { role: "Marketing and acquisition", need: "Know which channels and campaigns bring applications, not just clicks.", how: "Applications and lead forms by source, medium and campaign, credited to the last click of each session, without consent loss.", link: { label: "Revenue attribution", href: "/use-cases/revenue-attribution/" } },
      { role: "DPO and compliance", need: "Document what is processed, for which purpose and where.", how: "The Article 28 DPA with its data inventory and sub-processors, assistance with impact assessments, and country analyses that are self-assessments, not certifications.", link: { label: "Analytics for DPOs", href: "/for/dpo/" } },
      { role: "Information security", need: "Assess access, encryption and the vendor's own controls.", how: "TLS in transit and AES-256 at rest, role-based access and 2FA, audit logs from Scale, IP allowlist and isolated processing on Enterprise.", link: { label: "Security overview", href: "/security/" } },
      { role: "Management", need: "One acquisition number that marketing and compliance both accept.", how: "Measured totals reconciled with the applications your own systems booked, before any channel is compared.", link: { label: "Single source of truth", href: "/use-cases/single-source-of-truth/" } },
    ],
  },

  proof: {
    tag: "Evidence, not a sector case",
    body: "Sealmetrics has no published case study from a bank, insurer or lender, and does not present one. What a financial services review can read today are the documents below. The one measured figure comes from an eCommerce parallel run and is shown as context for how consent loss behaves, not as a financial services result.",
    figures: [
      { value: "Annex 2", label: "security measures: encryption, pseudonymisation, per-client isolation, retention by TTL and logged access", client: "Data Processing Agreement", href: "/dpa/" },
      { value: "0", label: "security certifications claimed: no ISO 27001, no SOC 2; the controls are documented instead", client: "Security overview", href: "/security/" },
      { value: "29%", label: "of visits GA4 did not record over 48 days on a Shopify store; eCommerce context, not a finance result", client: "Incapto · eCommerce", href: "/case-studies/incapto/" },
    ],
    readCase: "Open",
  },

  limits: {
    tag: "What it does not do",
    title: <>It measures channels.<br /><em>It does not know the applicant.</em></>,
    body: (
      <>
        These limits follow from measuring without identifying anyone, and from
        what a vendor can and cannot settle for you. Attribution is{" "}
        <Link className={link} href="/glossary/last-click-attribution/">last click</Link>{" "}
        within each session, by design.
      </>
    ),
    items: [
      ["No applicant-level analysis", "No customer IDs, individual journeys or returning-visitor recognition. A person who starts an application today and finishes it next week is a new visit."],
      ["Last click per session", "No lookback across sessions, no view-through and no multi-touch model. A long consideration cycle is credited to the session in which the application is completed."],
      ["Other tags keep their own obligations", "Advertising pixels, chat widgets and A/B testing tools that store or read data on the device keep their own consent requirements, whatever the analytics does."],
      ["It does not replace your assessments", "The DPA, the TPSR package and the self-assessments are material for your DPIA, vendor risk review and legal analysis. They do not replace them, and none of this is legal advice."],
      ["No sector certification", "No ISO 27001 or SOC 2, and no claim about DORA, EBA outsourcing guidelines or other financial-sector rules. Assess those against your own obligations."],
      ["It does not feed ad platforms", "Sealmetrics sends no conversions to Google Ads or Meta and imports no spend. Keep their own tags for bidding."],
    ],
  },

  faqTag: "Questions financial services teams ask",
  faqTitle: <>Before the tag<br /><em>goes to review.</em></>,
  faq: [
    { question: "Does Sealmetrics need a cookie banner on a bank or insurer's website?", answer: "For the analytics itself, Sealmetrics sets no cookie, stores nothing on the visitor's device and stores no IP address or cross-session identifier. Whether a specific deployment is exempt from consent depends on its configuration, the purposes you enable and your national authority's criteria. The site's other tags, such as advertising pixels, keep their own consent requirements, so a banner may still be needed for them." },
    { question: "What documentation can procurement and the DPO get?", answer: "The Article 28 DPA with its annexes: data processed and retention, security measures, sub-processors and the transfer framework. Also the public field list in the documentation and a TPSR package for technical, privacy and security review; impact assessment and legitimate interest documentation are available on request. Sealmetrics assists with DPIAs under clause 4.6 of the DPA, and customers have audit rights under clause 4.7." },
    { question: "Which certifications does Sealmetrics hold, including ISO 27001 and SOC 2?", answer: "None. Sealmetrics holds no ISO 27001 or SOC 2 certification and claims no financial-sector certification. Its security measures are listed in Annex 2 of the DPA: encryption in transit and at rest, server-side pseudonymisation of the session marker, per-client isolation, retention enforced by database TTLs, and role-based access with multi-factor authentication." },
    { question: "Where is visitor data processed, and are there sub-processors outside the EU?", answer: "Visitor data is stored and processed in Dublin, Ireland. Annex 3 of the DPA lists the sub-processors: infrastructure hosting in Ireland, AI inference in Paris, and Resend in the US for service emails to account users, under SCCs and the Data Privacy Framework. That US sub-processor receives no visitor data." },
    { question: "Can we measure lead forms and applications without sending personal data?", answer: "Yes. Send each completed form or application as a conversion, for example a lead with a form name and a product line, and never the applicant's name, email, account number or any other personal data. The same applies to URLs and campaign names. There is no server-side list of allowed properties and they can be read back by anyone with access to the site's reports, so what you send is your responsibility as controller." },
    { question: "Who can access the data, and is that access logged?", answer: "Access follows the roles in your organization, and two-factor authentication is available to every user. On Scale and Enterprise, audit logs record logins, user and invitation changes, conversion and settings changes, and API token activity, with the actor, the time and the IP address. Viewing a report is not among the logged actions. IP allowlists and isolated processing are available on Enterprise." },
    { question: "How is an application credited when it finishes on another domain?", answer: "Sealmetrics credits each conversion to the last click of its session, which closes after 2 hours of inactivity. If the application moves to an external onboarding, identity-verification or payment domain, register that domain as a passthrough referrer through the API; otherwise the returning visit is credited to that domain as a referral. There is no attribution across sessions." },
  ],

  final: {
    tag: "Vendor review walkthrough",
    title: <>Bring procurement.<br /><em>We bring the documents.</em></>,
    body: "Thirty minutes with the person responsible for the implementation: the data inventory, the DPA and its annexes, access controls by plan, and how lead forms are measured without personal data.",
    primary: { label: "Book a vendor review walkthrough", href: "/demo/" },
    secondary: { label: "Read the security overview", href: "/security/" },
  },
};

export const financeEs: ProblemLandingContent = {
  route: "/for/finance",
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Por equipo", href: "/es/for/" },
    { label: "Finanzas" },
  ],
  eyebrow: "Sector · Banca, seguros y crédito",
  h1: <>La solicitud llega.<br />El canal<br /><em>no queda registrado.</em></>,
  heroBody:
    "Un banco, una aseguradora o una financiera ve cada solicitud en sus propios sistemas. El canal que hay detrás sale de una analítica que pierde visitas en el banner de consentimiento, y cada etiqueta nueva tiene que pasar antes una revisión de proveedor. Sealmetrics mide formularios de contacto y solicitudes por canal y campaña sin cookies ni identificadores guardados, y publica el DPA, el inventario de datos y las medidas de seguridad para que la revisión empiece por los documentos.",
  heroPrimary: { label: "Ver el recorrido de la revisión", href: "#method" },
  heroSecondary: { label: "Leer el DPA", href: "/es/dpa/" },
  heroMicro: "Alojado en Dublín · DPA incluido · último clic por sesión · sin ISO 27001 ni SOC 2 declarados · no es asesoramiento jurídico",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Actualizado",
    date: FINANCE_MODIFIED,
    dateDisplay: "15 de septiembre de 2026",
  },
  module: {
    title: "Lo que recibe una revisión de proveedor",
    status: "Documentado",
    rows: [
      ["Almacenamiento en el dispositivo", "Ninguno"],
      ["IP del visitante", "En memoria · no se guarda"],
      ["Ubicación del dato de visitante", "Dublín, Irlanda"],
      ["Certificaciones de seguridad", "Ninguna declarada"],
    ],
    foot: "Subencargados en el Anexo 3 del DPA · derecho de auditoría en la cláusula 4.7 · paquete TPSR disponible",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      La analítica para servicios financieros es la medición web que atribuye
      solicitudes, peticiones de precio y formularios de contacto a los canales
      que los generaron, con datos que una revisión de cumplimiento y de compras
      puede comprobar. Dos cosas suelen romperla. Una herramienta que depende del
      consentimiento no registra a quien rechaza el banner, así que los canales se
      juzgan con una parte del tráfico. Y cada etiqueta nueva reabre la revisión
      de proveedor, así que se deja de añadir medición. Sealmetrics cuenta visitas
      sin cookies ni almacenamiento en el dispositivo, no guarda direcciones IP ni
      identificadores entre sesiones, trata el dato de visitante en Dublín y
      atribuye cada conversión al último clic de su sesión. El DPA enumera los
      campos, los plazos de conservación, las medidas de seguridad y los
      subencargados. Que una implantación necesite consentimiento sigue
      dependiendo de su configuración y de la autoridad nacional, las demás
      etiquetas de la web mantienen sus propios requisitos y Sealmetrics no tiene
      certificación ISO 27001 ni SOC 2.
    </p>
  ),

  divergence: {
    tag: "Lo que pregunta una revisión de proveedor",
    title: <>Seis preguntas.<br /><em>Dónde está cada respuesta.</em></>,
    body: "Compras, el DPO y seguridad de la información hacen a cualquier proveedor de analítica más o menos las mismas preguntas. Estas son las respuestas que documenta Sealmetrics, junto al documento que las recoge.",
    headers: ["La pregunta", "Qué pedir a cualquier proveedor", "Sealmetrics, según su documentación", "Dónde verificarlo"],
    rows: [
      ["¿Qué se recoge de los visitantes?", "Un inventario campo a campo con su conservación", "Página, referrer, campaña, categoría de dispositivo, zona horaria y conversiones; no se guardan IP, identificadores de usuario, emails ni nombres; las filas de evento se purgan al día y los agregados se conservan 24 meses", "What we track · Anexo 1 del DPA"],
      ["¿Se guarda algo en el dispositivo del visitante?", "Una afirmación que puedas comprobar en el navegador", "Ni cookies, ni localStorage, ni sessionStorage; el marcador de sesión se seudonimiza en servidor y caduca tras 2 horas de inactividad", "What we track · Anexo 2 del DPA"],
      ["¿Dónde se trata el dato de visitante y quién lo trata?", "La lista de subencargados y la base de las transferencias", "Se almacena y trata en la UE; el único subencargado fuera de la UE envía emails de la cuenta y no recibe dato de visitante", "Cláusula 7 y Anexo 3 del DPA"],
      ["¿Quién puede entrar en el panel?", "Controles de acceso y registro de actividad", "Acceso por roles y doble factor de autenticación; logs de auditoría desde el plan Scale; lista de IP permitidas en Enterprise", "Seguridad · precios"],
      ["¿Qué evidencia de seguridad existe?", "Certificaciones o documentación equivalente", "Sin ISO 27001 ni SOC 2; medidas de seguridad en el Anexo 2 del DPA, un paquete TPSR y asistencia con las evaluaciones de impacto", "Anexo 2 y cláusula 4.6 del DPA"],
      ["¿Qué pasa al terminar el contrato?", "Condiciones de exportación y borrado", "30 días para exportar por API o BigQuery y, después, borrado o devolución de los datos", "Cláusula 4.8 del DPA"],
    ],
    note: (
      <>
        Ninguna de estas respuestas aprueba a un proveedor por sí sola: tus equipos
        de compras, protección de datos y seguridad siguen haciendo su evaluación.
        La lista de campos es pública en{" "}
        <a className={link} href={WHAT_WE_TRACK} target="_blank" rel="noopener noreferrer">what we track</a>{" "}
        (en inglés), las condiciones contractuales están en el{" "}
        <Link className={link} href="/es/dpa/">DPA</Link>, y qué exige el RGPD a
        una herramienta de medición se explica en{" "}
        <Link className={link} href="/es/glossary/gdpr-analytics-compliance/">analítica y cumplimiento del RGPD</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que cuesta la situación actual",
    title: <>Dos filtros.<br /><em>Los dos cuestan datos.</em></>,
    body: "La pérdida por consentimiento y la fricción de las revisiones nunca aparecen como una partida del presupuesto. Aparecen como canales juzgados con parte del tráfico y como medición que nadie añade.",
    items: [
      ["01", "Canales juzgados con quien aceptó el banner", (
        <>
          Una herramienta que depende del consentimiento solo registra a quien
          acepta su banner. La documentación de Sealmetrics sitúa esa pérdida entre
          el 15% y el 60% de los visitantes europeos según el sector, la fuerza de
          la marca y el mix de tráfico; no hay una cifra publicada para servicios
          financieros. El presupuesto de captación de cuentas, tarjetas o pólizas
          se reparte entonces sobre un mix incompleto, el problema que describe la{" "}
          <Link className={link} href="/es/glossary/data-loss-in-analytics/">pérdida de datos en analítica</Link>.
        </>
      )],
      ["02", "Medición que nunca se añade", "Una etiqueta, un identificador o una finalidad nuevos cambian el tratamiento y pueden reabrir la revisión de proveedor. Cuando cada añadido cuesta una revisión, el simulador de precio o el segundo paso de la solicitud se quedan sin medir."],
      ["03", "Solicitudes atribuidas al dominio equivocado", (
        <>
          Las solicitudes suelen terminar en un dominio aparte de alta, verificación
          de identidad o pago. Sin configurarlo, la visita que vuelve de ese dominio
          se le atribuye como referral, y no a la campaña que la inició, como explica
          la{" "}
          <a className={link} href={PASSTHROUGH} target="_blank" rel="noopener noreferrer">guía de dominios externos</a>{" "}
          (en inglés).
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "De la revisión de proveedor al reporting",
    title: <>Primero la revisión.<br /><em>Después la medición.</em></>,
    body: (
      <>
        Cinco pasos, en el orden en que suele necesitarlos una organización
        regulada. Las reglas con las que se atribuye cada solicitud a un canal se
        explican en{" "}
        <Link className={link} href="/es/use-cases/revenue-attribution/">atribución de ingresos</Link>.
      </>
    ),
    howToName: "Cómo implanta un equipo de servicios financieros una analítica sin cookies pasando la revisión de proveedor",
    howToDescription:
      "Cinco pasos para que un banco, una aseguradora o una financiera revise Sealmetrics con documentos, mida formularios y solicitudes sin datos personales, concilie con sus propios sistemas y reporte por canal.",
    steps: [
      { name: "Haz la revisión de proveedor con documentos", text: "Entrega a compras, al DPO y a seguridad de la información el DPA con sus anexos (datos tratados, conservación, medidas de seguridad, subencargados), la lista pública de campos y el paquete TPSR. Deja por escrito las finalidades que activas: la medición agregada de audiencia y, como finalidad separada y opcional que se evalúa por sí misma, la atribución de marketing." },
      { name: "Implanta sin datos personales en lo que envías", text: "Instala el tracker, que lleva entre 5 y 30 minutos según la plataforma, y envía como conversiones los formularios de contacto, las peticiones de precio y las solicitudes completadas, con propiedades genéricas como la línea de producto o el nombre del formulario. No pongas nunca nombres, emails ni números de cuenta o de póliza en propiedades, URLs o nombres de campaña: el DPA lo fija como obligación del responsable y no existe una lista de propiedades permitidas en servidor." },
      { name: "Conserva el canal a través de los dominios de alta", text: "Si la solicitud continúa en un dominio externo de alta, verificación de identidad o pago, regístralo por API como passthrough referrer para que la conversión conserve la campaña que inició la sesión. Los píxeles publicitarios siguen detrás de tu banner de consentimiento, como hasta ahora." },
      { name: "Mide en paralelo y concilia con tus sistemas", text: "Mantén la analítica actual durante al menos un ciclo de campaña completo. Compara las solicitudes medidas con las que registró tu CRM o tu sistema central en el mismo periodo, en total y por canal. Nunca registro a registro, porque los identificadores de solicitud y de cliente no se envían nunca a Sealmetrics." },
      { name: "Reporta sobre la base conciliada", text: "Lee solicitudes y tasa de conversión por canal, campaña y página de llegada, y comparte las mismas cifras con marketing, cumplimiento y dirección. En Scale y Enterprise, los logs de auditoría registran quién cambió usuarios, conversiones, ajustes y tokens de API." },
    ],
  },

  roles: {
    tag: "Quién da el visto bueno y quién lo usa",
    title: <>Cuatro revisores.<br /><em>Un solo juego de documentos.</em></>,
    body: "Cada función le hace una pregunta distinta a la misma implantación, y cada una tiene un documento o un informe que la responde.",
    items: [
      { role: "Marketing y captación", need: "Saber qué canales y campañas traen solicitudes, no solo clics.", how: "Solicitudes y formularios por source, medium y campaign, atribuidos al último clic de cada sesión y sin pérdida por consentimiento.", link: { label: "Atribución de ingresos", href: "/es/use-cases/revenue-attribution/" } },
      { role: "DPO y cumplimiento", need: "Documentar qué se trata, con qué finalidad y dónde.", how: "El contrato de encargo del artículo 28 con su inventario de datos y sus subencargados, asistencia con las evaluaciones de impacto y análisis por país que son autoevaluaciones, no certificaciones.", link: { label: "Analítica para DPOs", href: "/es/for/dpo/" } },
      { role: "Seguridad de la información", need: "Evaluar el acceso, el cifrado y los controles del propio proveedor.", how: "TLS en tránsito y AES-256 en reposo, acceso por roles y doble factor, logs de auditoría desde Scale, lista de IP permitidas y procesamiento aislado en Enterprise.", link: { label: "Visión general de seguridad", href: "/es/security/" } },
      { role: "Dirección", need: "Una cifra de captación que acepten a la vez marketing y cumplimiento.", how: "Totales medidos y conciliados con las solicitudes que registraron tus sistemas antes de comparar ningún canal.", link: { label: "Fuente única de verdad", href: "/es/use-cases/single-source-of-truth/" } },
    ],
  },

  proof: {
    tag: "Evidencia, no un caso del sector",
    body: "Sealmetrics no tiene publicado ningún caso de un banco, una aseguradora o una financiera, y no presenta ninguno. Lo que una revisión de servicios financieros puede leer hoy son los documentos de abajo. La única cifra medida procede de una medición en paralelo en eCommerce y se muestra como contexto de cómo se comporta la pérdida por consentimiento, no como un resultado del sector financiero.",
    figures: [
      { value: "Anexo 2", label: "medidas de seguridad: cifrado, seudonimización, aislamiento por cliente, conservación por TTL y accesos registrados", client: "Contrato de encargo de tratamiento", href: "/es/dpa/" },
      { value: "0", label: "certificaciones de seguridad declaradas: ni ISO 27001 ni SOC 2; en su lugar, los controles están documentados", client: "Visión general de seguridad", href: "/es/security/" },
      { value: "29%", label: "de las visitas que GA4 no registró en 48 días en una tienda Shopify; contexto de eCommerce, no un resultado financiero", client: "Incapto · eCommerce", href: "/es/case-studies/incapto/" },
    ],
    readCase: "Abrir",
  },

  limits: {
    tag: "Lo que no hace",
    title: <>Mide canales.<br /><em>No conoce al solicitante.</em></>,
    body: (
      <>
        Estos límites vienen de medir sin identificar a nadie y de lo que un
        proveedor puede y no puede resolver por ti. La atribución es a último clic
        dentro de cada sesión, por diseño; los{" "}
        <Link className={link} href="/es/glossary/attribution-model/">modelos de atribución</Link>{" "}
        explican la diferencia.
      </>
    ),
    items: [
      ["Sin análisis por solicitante", "Sin identificadores de cliente, recorridos individuales ni reconocimiento de visitantes recurrentes. Quien empieza una solicitud hoy y la termina la semana que viene es una visita nueva."],
      ["Último clic por sesión", "Sin ventana entre sesiones, sin view-through y sin modelo multi-touch. Un ciclo de decisión largo se atribuye a la sesión en la que se completa la solicitud."],
      ["Las demás etiquetas mantienen sus obligaciones", "Los píxeles publicitarios, los chats y las herramientas de A/B testing que guardan o leen datos en el dispositivo mantienen sus propios requisitos de consentimiento, haga lo que haga la analítica."],
      ["No sustituye tus evaluaciones", "El DPA, el paquete TPSR y las autoevaluaciones son material para tu evaluación de impacto, tu análisis de riesgo de proveedores y tu análisis jurídico. No los sustituyen, y nada de esto es asesoramiento jurídico."],
      ["Sin certificación sectorial", "Ni ISO 27001 ni SOC 2, y ninguna afirmación sobre DORA, las directrices de externalización de la EBA u otras normas del sector financiero. Evalúalas frente a tus propias obligaciones."],
      ["No alimenta las plataformas publicitarias", "Sealmetrics no envía conversiones a Google Ads ni a Meta y no importa la inversión. Mantén sus propias etiquetas para pujar."],
    ],
  },

  faqTag: "Lo que preguntan los equipos de servicios financieros",
  faqTitle: <>Antes de que la etiqueta<br /><em>pase la revisión.</em></>,
  faq: [
    { question: "¿Necesita Sealmetrics un banner de cookies en la web de un banco o una aseguradora?", answer: "Para la analítica en sí, Sealmetrics no instala cookies, no guarda nada en el dispositivo del visitante y no almacena direcciones IP ni identificadores entre sesiones. Que una implantación concreta quede exenta de consentimiento depende de su configuración, de las finalidades que actives y de los criterios de tu autoridad nacional. Las demás etiquetas de la web, como los píxeles publicitarios, mantienen sus propios requisitos de consentimiento, así que puede seguir haciendo falta un banner para ellas." },
    { question: "¿Qué documentación pueden obtener compras y el DPO?", answer: "El contrato de encargo del artículo 28 con sus anexos: datos tratados y conservación, medidas de seguridad, subencargados y marco de transferencias. Además, la lista pública de campos de la documentación y un paquete TPSR para la revisión técnica, de privacidad y de seguridad; la documentación de evaluación de impacto y de interés legítimo está disponible bajo petición. Sealmetrics asiste con las evaluaciones de impacto según la cláusula 4.6 del DPA, y los clientes tienen derecho de auditoría según la cláusula 4.7." },
    { question: "¿Qué certificaciones tiene Sealmetrics, incluidas ISO 27001 y SOC 2?", answer: "Ninguna. Sealmetrics no tiene certificación ISO 27001 ni SOC 2 y no declara ninguna certificación del sector financiero. Sus medidas de seguridad están en el Anexo 2 del DPA: cifrado en tránsito y en reposo, seudonimización en servidor del marcador de sesión, aislamiento por cliente, conservación aplicada por TTL de base de datos y acceso por roles con autenticación multifactor." },
    { question: "¿Dónde se trata el dato de visitante y hay subencargados fuera de la UE?", answer: "El dato de visitante se almacena y trata en Dublín, Irlanda. El Anexo 3 del DPA enumera los subencargados: alojamiento de infraestructura en Irlanda, inferencia de IA en París y Resend, en EE. UU., para los emails de servicio a los usuarios de la cuenta, con cláusulas contractuales tipo y el Data Privacy Framework. Ese subencargado estadounidense no recibe dato de visitante." },
    { question: "¿Podemos medir formularios y solicitudes sin enviar datos personales?", answer: "Sí. Envía cada formulario o solicitud completados como una conversión, por ejemplo un lead con el nombre del formulario y la línea de producto, y nunca el nombre, el email, el número de cuenta ni ningún otro dato personal del solicitante. Lo mismo vale para las URLs y los nombres de campaña. No existe una lista de propiedades permitidas en servidor y cualquiera con acceso a los informes de la web puede leerlas, así que lo que envías es responsabilidad tuya como responsable del tratamiento." },
    { question: "¿Quién puede acceder a los datos y queda registrado ese acceso?", answer: "El acceso sigue los roles de tu organización, y el doble factor de autenticación está disponible para todos los usuarios. En Scale y Enterprise, los logs de auditoría registran inicios de sesión, cambios de usuarios e invitaciones, cambios de conversiones y ajustes y la actividad de los tokens de API, con el autor, la hora y la dirección IP. Consultar un informe no está entre las acciones registradas. La lista de IP permitidas y el procesamiento aislado están disponibles en Enterprise." },
    { question: "¿Cómo se atribuye una solicitud que termina en otro dominio?", answer: "Sealmetrics atribuye cada conversión al último clic de su sesión, que se cierra tras 2 horas de inactividad. Si la solicitud pasa a un dominio externo de alta, verificación de identidad o pago, registra ese dominio por API como passthrough referrer; si no, la visita que vuelve se atribuye a ese dominio como referral. No hay atribución entre sesiones." },
  ],

  final: {
    tag: "Revisión de proveedor",
    title: <>Trae a compras.<br /><em>Nosotros traemos los documentos.</em></>,
    body: "Treinta minutos con la persona responsable de la implantación: el inventario de datos, el DPA y sus anexos, los controles de acceso por plan y cómo se miden los formularios sin datos personales.",
    primary: { label: "Reservar una revisión de proveedor", href: "/es/demo/" },
    secondary: { label: "Leer la visión general de seguridad", href: "/es/security/" },
  },
};
