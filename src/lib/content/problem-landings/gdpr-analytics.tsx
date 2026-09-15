import Link from "next/link";
import type { ProblemLandingContent } from "./types";

/**
 * Problem D — "I have to demonstrate compliance". Lives on the /gdpr-analytics
 * hub (decision D1), which keeps its job as the index of country analyses.
 *
 * Tone follows #186: regulatory statements are conditional and point to the
 * authority's own publication; nothing here says a deployment "is exempt".
 *
 * Every product fact is taken from the signed DPA (2026-v2.0, /dpa) or from
 * docs.sealmetrics.com/security-privacy/what-we-track, including the parts that
 * are less convenient to say: an ephemeral session identifier is pseudonymised
 * server-side, the IP is handled transiently, marketing attribution is an
 * optional purpose separate from audience measurement, and the one non-EU
 * sub-processor (account emails) receives no visitor data.
 *
 * There is no approved client quote about compliance, so the proof block shows
 * documents instead of a testimonial.
 */

export const GDPR_ANALYTICS_PUBLISHED = "2026-08-07";
export const GDPR_ANALYTICS_PUBLISHED_ES = "2026-08-27";
export const GDPR_ANALYTICS_MODIFIED = "2026-09-14";

const link = "sig-problem-inline";
const WHAT_WE_TRACK = "https://docs.sealmetrics.com/security-privacy/what-we-track";
const CNIL_GUIDANCE = "https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience";
const AEPD_GUIDE = "https://www.aepd.es/guias/guia-cookies.pdf";
const DSK_SITE = "https://www.datenschutzkonferenz-online.de/";

export const gdprAnalyticsEn: ProblemLandingContent = {
  route: "/gdpr-analytics",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "GDPR analytics" }],
  eyebrow: "Compliance · GDPR and ePrivacy, regulator by regulator",
  h1: <>You have to prove<br />your analytics complies.<br /><em>Not just say it.</em></>,
  heroBody:
    "A cookie banner, a vendor badge or an exemption quoted second-hand does not survive a DPO review or a regulator's question. Sealmetrics is European analytics built to be checked: no cookies, no personal data in the stored dataset, visitor data processed in the EU — with the DPA, the data inventory and a regulator-by-regulator analysis published so your team can verify each claim.",
  heroPrimary: { label: "See the review checklist", href: "#method" },
  heroSecondary: { label: "Read the DPA", href: "/dpa/" },
  heroMicro: "EU-hosted in Dublin · DPA included · no ISO 27001 or SOC 2 claimed · not legal advice",
  byline: {
    byLabel: "By",
    authorName: "Rafa Jiménez",
    authorHref: "/authors/rafa-jimenez/",
    updatedLabel: "Updated",
    date: GDPR_ANALYTICS_MODIFIED,
    dateDisplay: "14 September 2026",
  },
  module: {
    title: "Visitor data boundary",
    status: "Documented in the DPA",
    rows: [
      ["Device storage", "None"],
      ["IP address", "Transient · not stored"],
      ["Session marker", "Pseudonymised · 2 h"],
      ["Processing", "Dublin, Ireland"],
    ],
    foot: "Retention by database TTL · sub-processors in Annex 3 · audit rights in clause 4.7",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      GDPR-compliant analytics is web measurement whose data flows can be shown
      to meet the GDPR and the national ePrivacy rules, not just described as
      compliant. Two questions decide it: whether personal data is processed,
      and whether anything is stored on or read from the visitor&apos;s device,
      which is what triggers the consent requirement under ePrivacy as each
      country transposed it. Sealmetrics is built to answer both with evidence:
      it sets no cookies and writes nothing to the device, stores no IP
      addresses or cross-session identifiers, pseudonymises a short-lived session
      marker server-side and processes visitor data in Dublin. The DPA lists the
      fields, retention periods and sub-processors, and the France, Germany and
      Spain analyses map the architecture to each regulator&apos;s published
      criteria. Whether a specific deployment is exempt from consent still
      depends on its configuration, its purposes and the national authority, and
      Sealmetrics holds no ISO 27001 or SOC 2 certification.
    </p>
  ),

  divergence: {
    tag: "The questions a review asks",
    title: <>Five questions.<br /><em>Five documented answers.</em></>,
    body: "A compliance review does not ask whether a tool is GDPR compliant. It asks what is collected, where it goes and for how long — and expects an answer it can check.",
    headers: ["The question", "Typical cookie-based setup", "Sealmetrics, as documented", "Where to verify"],
    rows: [
      ["Is anything stored on or read from the device?", "Cookies or client IDs set on the first page", "No cookies, localStorage, sessionStorage or other device storage", "What we track · DPA Annex 2"],
      ["Is personal data stored?", "Client IDs, IP-derived location, user-level profiles", "No IPs, user IDs or raw user agents stored; the session marker is pseudonymised with a daily salt destroyed on rotation", "DPA Annex 1"],
      ["Where does visitor data go?", "Often a US provider, relying on a transfer framework", "Stored and processed in the EU; the only non-EU sub-processor sends account emails and receives no visitor data", "DPA clause 7 · Annex 3"],
      ["How long is it kept?", "Configurable, often left at the default", "Fixed TTLs: event log 1 day, hourly aggregates 90 days, daily aggregates 24 months", "DPA Annex 1"],
      ["Against whose criteria?", "A generic compliance badge", "Analyses against CNIL, DSK and AEPD criteria; no certification claimed", "Country analyses below"],
    ],
    note: (
      <>
        None of these answers makes a deployment exempt from consent on its own.
        The{" "}
        <a className={link} href={CNIL_GUIDANCE} target="_blank" rel="noopener noreferrer">CNIL</a>{" "}
        describes a conditional exemption for audience measurement, and the{" "}
        <a className={link} href={AEPD_GUIDE} target="_blank" rel="noopener noreferrer">AEPD cookie guide</a>{" "}
        and the{" "}
        <a className={link} href={DSK_SITE} target="_blank" rel="noopener noreferrer">DSK</a>{" "}
        set their own conditions. The field list is public in{" "}
        <a className={link} href={WHAT_WE_TRACK} target="_blank" rel="noopener noreferrer">what we track</a>,
        and the legal reasoning across the EU is set out under{" "}
        <Link className={link} href="/consentless-analytics/">consentless analytics</Link>, the{" "}
        <Link className={link} href="/glossary/eprivacy-directive/">ePrivacy Directive</Link> and{" "}
        <Link className={link} href="/glossary/personal-data-in-analytics/">personal data in analytics</Link>.
      </>
    ),
  },

  costs: {
    tag: "What an unprovable setup costs",
    title: <>Compliance you cannot show<br /><em>costs twice.</em></>,
    body: "Once in legal exposure, and once in the data you give up to reduce it.",
    items: [
      ["01", "The banner decides what you can measure", (
        <>
          Every visitor who rejects a consent-based tool disappears from its
          reports. On a Shopify store measured side by side for 48 days, GA4 did
          not record 29% of visits — the argument behind{" "}
          <Link className={link} href="/complete-data/">complete data</Link>.
        </>
      )],
      ["02", "Every new tool reopens the review", "Adding a cookie, an identifier or a new purpose changes the processing and can require a new assessment. A fixed, documented data inventory keeps the scope of the analytics review stable."],
      ["03", "Transfers become a standing question", (
        <>
          When visitor data leaves the EU, the transfer basis has to be
          reassessed whenever the legal framework moves — the scenario worked
          through in{" "}
          <Link className={link} href="/blog/analytics-if-data-privacy-framework-falls/">what happens to analytics if the Data Privacy Framework falls</Link>.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "The review checklist",
    title: <>Review it<br /><em>the way a regulator would.</em></>,
    body: (
      <>
        Five checks your DPO can run on any analytics tool, including this one.
        The{" "}
        <Link className={link} href="/reg-gap-analysis/">regulatory gap analysis</Link>{" "}
        maps the same requirements for your current stack.
      </>
    ),
    howToName: "How to review web analytics for GDPR and ePrivacy",
    howToDescription:
      "Five checks to review an analytics tool against the GDPR and national ePrivacy rules, with the documents to verify each one.",
    steps: [
      { name: "Map what the tag collects", text: "List every field, where it is stored and for how long. For Sealmetrics that inventory is Annex 1 of the DPA: browsing and technical data, country from the browser time zone, a pseudonymised session identifier, UTM data and conversions, with fixed retention periods." },
      { name: "Check device storage and identifiers", text: "Confirm on your own site that no cookie, localStorage or other storage is written, and that no identifier links one visit to the next. The browser's developer tools show it in a minute." },
      { name: "Separate the purposes", text: "Aggregated audience measurement and marketing attribution are different purposes. The DPA lists them separately, with attribution as an optional purpose you configure, so assess each one against your authority's criteria." },
      { name: "Check location, sub-processors and transfers", text: "Read where visitor data is processed and who processes it. Sealmetrics lists its sub-processors in Annex 3 of the DPA; the only one outside the EU sends account emails and receives no visitor data." },
      { name: "Read your national authority's criteria and record the decision", text: "ePrivacy is transposed country by country, so check the CNIL, DSK, AEPD or ICO conditions that apply to your site, and document how the configuration meets them." },
    ],
  },

  roles: {
    tag: "Regulator by regulator",
    title: <>The same architecture,<br /><em>read against four authorities.</em></>,
    body: "Each analysis states the criteria the authority actually published and how Sealmetrics is built against them. They describe guidance; they are not legal advice.",
    items: [
      { role: "France · CNIL", need: "A conditional exemption for audience measurement.", how: "Five permitted purposes and the 14 technical criteria of the CNIL self-assessment, mapped to the architecture.", link: { label: "GDPR analytics in France", href: "/gdpr-analytics/france/" } },
      { role: "Germany · DSK", need: "§25 TDDDG decides whether consent is needed.", how: "The DSK orientation and the conditions under which storing or reading information on a device is strictly necessary.", link: { label: "GDPR analytics in Germany", href: "/gdpr-analytics/germany/" } },
      { role: "Spain · AEPD", need: "LSSI-CE art. 22.2 and the 2024 cookie guide.", how: "The conditions for anonymous audience measurement without consent, and the AEPD assessment the DPA refers to.", link: { label: "GDPR analytics in Spain", href: "/gdpr-analytics/spain/" } },
      { role: "United Kingdom · ICO", need: "The PECR exemption for statistical purposes.", how: "What the exemption covers for analytics in the UK, and how Sealmetrics documents it.", link: { label: "UK PECR analytics exemption", href: "/blog/uk-pecr-analytics-exemption/" } },
    ],
  },

  proof: {
    tag: "Evidence, not badges",
    body: "Sealmetrics publishes its compliance position as documents a reviewer can read, and says what it does not hold: no ISO 27001, no SOC 2, and no regulator certification — authorities do not certify analytics tools.",
    figures: [
      { value: "Annex 1", label: "every field processed, what is never stored, and each retention period", client: "Data Processing Agreement", href: "/dpa/" },
      { value: "14", label: "CNIL technical criteria documented one by one in a public self-assessment", client: "CNIL self-assessment", href: "/blog/cnil-self-assessment-published/" },
      { value: "0", label: "sub-processors outside the EU that receive visitor data", client: "DPA Annex 3", href: "/dpa/" },
    ],
    readCase: "Open",
  },

  limits: {
    tag: "What this does not settle",
    title: <>Evidence helps a decision.<br /><em>It does not make it.</em></>,
    body: (
      <>
        Stating the limits is part of the evidence. Security controls, retention
        and isolation are covered on the{" "}
        <Link className={link} href="/security/">security overview</Link>, and the
        DPO&apos;s view on{" "}
        <Link className={link} href="/for/dpo/">analytics for DPOs</Link>.
      </>
    ),
    items: [
      ["Not legal advice", "These pages describe published guidance and how Sealmetrics is built against it. Your DPO or counsel makes the call for your deployment."],
      ["No certification", "Sealmetrics holds no ISO 27001 or SOC 2 certification, and no supervisory authority certifies analytics tools."],
      ["Configuration can change the answer", "Custom properties, conversion values or URLs that carry names, emails or other personal data change the assessment. Keep personal data out of what you send."],
      ["Attribution is its own purpose", "Marketing attribution is an optional purpose in the DPA, alongside aggregated audience measurement. It should be assessed on its own terms, not assumed to share the same exemption."],
      ["Other tools keep their obligations", "Advertising pixels, A/B testing and chat widgets that store or read data on the device still need consent, whatever the analytics does."],
      ["The rules are moving", "The Digital Omnibus is a Commission proposal (COM(2025) 837), not law. Check the final text before changing a compliance decision."],
    ],
  },

  faqTag: "Questions DPOs ask",
  faqTitle: <>Before you sign<br /><em>the processing record.</em></>,
  faq: [
    { question: "Is Sealmetrics GDPR compliant?", answer: "Sealmetrics is built so that the dataset it stores contains no personal data, nothing is stored on the visitor's device and visitor data is processed in the EU under an Article 28 DPA. Compliance, though, is a property of your deployment: its configuration, its purposes and the rules of your national authority. Sealmetrics documents its side and does not claim any certification." },
    { question: "Do I need a cookie banner for Sealmetrics?", answer: "For the analytics itself, Sealmetrics sets no cookie and stores nothing on the device, so the ePrivacy storage-and-access rule has nothing to attach to. Whether your site needs a banner depends on the other tools you run and on your national authority's criteria: the CNIL, the DSK and the AEPD each publish their own conditions for audience measurement." },
    { question: "Is Google Analytics legal in the EU?", answer: "It can be used lawfully with consent, which is how most EU sites run it: GA4 sets cookies and processes personal data, so it needs prior consent and a transfer assessment because Google is a US provider. Several European authorities found Google Analytics deployments unlawful in 2022 over transfers to the US; those transfers now rely on the EU-US Data Privacy Framework adopted in 2023. The practical cost is the traffic lost to the banner." },
    { question: "Does Sealmetrics process IP addresses?", answer: "Only transiently, to handle the request, and they are never stored. The country is derived from the browser time zone, not from the IP address, and the session marker is pseudonymised server-side with a daily salt that is destroyed on rotation." },
    { question: "Where is visitor data hosted, and who are the sub-processors?", answer: "Visitor data is stored and processed in Dublin, Ireland, with the default AI inference in Paris. Annex 3 of the DPA lists the sub-processors; the only one outside the EU sends service emails to account users and receives no visitor data." },
    { question: "What documentation can we get for a DPO review?", answer: "The Article 28 DPA with its annexes (data processed, retention, security measures, sub-processors, transfer framework), the public field list in the documentation, the country analyses for France, Germany and Spain, a TPSR package for procurement, and assistance with impact assessments under clause 4.6 of the DPA." },
    { question: "Which security certifications does Sealmetrics hold?", answer: "No. Sealmetrics does not hold ISO 27001 or SOC 2 certification and does not claim either. The security measures it applies are listed in Annex 2 of the DPA, and customers have audit rights under clause 4.7." },
  ],

  final: {
    tag: "Compliance walkthrough",
    title: <>Bring your DPO.<br /><em>We bring the documents.</em></>,
    body: "Thirty minutes with the person responsible for the implementation: the data inventory, the DPA, the retention periods and the criteria of your national authority.",
    primary: { label: "Book a compliance walkthrough", href: "/demo/" },
    secondary: { label: "Run the gap analysis", href: "/reg-gap-analysis/" },
  },
};

export const gdprAnalyticsEs: ProblemLandingContent = {
  route: "/gdpr-analytics",
  breadcrumbs: [{ label: "Inicio", href: "/es/" }, { label: "Analítica y RGPD" }],
  eyebrow: "Cumplimiento · RGPD y ePrivacy, regulador a regulador",
  h1: <>Tienes que demostrar<br />que tu analítica cumple.<br /><em>No basta con decirlo.</em></>,
  heroBody:
    "Un banner de cookies, un sello del proveedor o una exención citada de segunda mano no aguantan la revisión de un DPO ni la pregunta de una autoridad. Sealmetrics es analítica europea hecha para ser comprobada: sin cookies, sin datos personales en el dataset almacenado y con el dato de visitante procesado en la UE, y con el DPA, el inventario de datos y el análisis regulador a regulador publicados para que tu equipo verifique cada afirmación.",
  heroPrimary: { label: "Ver la lista de revisión", href: "#method" },
  heroSecondary: { label: "Leer el DPA", href: "/es/dpa/" },
  heroMicro: "Alojado en Dublín · DPA incluido · sin ISO 27001 ni SOC 2 declarados · no es asesoramiento jurídico",
  byline: {
    byLabel: "Por",
    authorName: "Rafa Jiménez",
    authorHref: "/es/authors/rafa-jimenez/",
    updatedLabel: "Actualizado",
    date: GDPR_ANALYTICS_MODIFIED,
    dateDisplay: "14 de septiembre de 2026",
  },
  module: {
    title: "Perímetro del dato de visitante",
    status: "Documentado en el DPA",
    rows: [
      ["Almacenamiento en el dispositivo", "Ninguno"],
      ["Dirección IP", "En tránsito · no se guarda"],
      ["Marcador de sesión", "Seudonimizado · 2 h"],
      ["Tratamiento", "Dublín, Irlanda"],
    ],
    foot: "Retención por TTL de base de datos · subencargados en el Anexo 3 · derecho de auditoría en la cláusula 4.7",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      La analítica conforme al RGPD es una medición web cuyos flujos de datos se
      puede demostrar que cumplen el RGPD y las normas nacionales de ePrivacy, no
      solo describirse como conformes. Lo deciden dos preguntas: si se tratan
      datos personales y si se guarda o se lee algo en el dispositivo del
      visitante, que es lo que activa el requisito de consentimiento de ePrivacy
      tal como lo transpuso cada país. Sealmetrics está hecho para responder a
      ambas con evidencia: no instala cookies ni escribe nada en el dispositivo,
      no guarda direcciones IP ni identificadores entre sesiones, seudonimiza en
      servidor un marcador de sesión de corta duración y trata el dato de
      visitante en Dublín. El DPA enumera los campos, los plazos de conservación
      y los subencargados, y los análisis de España, Francia y Alemania contrastan
      la arquitectura con los criterios publicados por cada autoridad. Que una
      implantación concreta quede exenta de consentimiento sigue dependiendo de su
      configuración, sus finalidades y la autoridad nacional, y Sealmetrics no
      tiene certificación ISO 27001 ni SOC 2.
    </p>
  ),

  divergence: {
    tag: "Las preguntas de una revisión",
    title: <>Cinco preguntas.<br /><em>Cinco respuestas documentadas.</em></>,
    body: "Una revisión de cumplimiento no pregunta si una herramienta cumple el RGPD. Pregunta qué se recoge, adónde va y cuánto tiempo se guarda, y espera una respuesta que pueda comprobar.",
    headers: ["La pregunta", "Configuración típica con cookies", "Sealmetrics, según su documentación", "Dónde verificarlo"],
    rows: [
      ["¿Se guarda o se lee algo en el dispositivo?", "Cookies o identificadores de cliente desde la primera página", "Ni cookies, ni localStorage, ni sessionStorage, ni ningún otro almacenamiento en el dispositivo", "What we track · Anexo 2 del DPA"],
      ["¿Se almacenan datos personales?", "Identificadores de cliente, ubicación por IP, perfiles por usuario", "No se guardan IP, identificadores de usuario ni user agents completos; el marcador de sesión se seudonimiza con una sal diaria que se destruye al rotar", "Anexo 1 del DPA"],
      ["¿Adónde va el dato de visitante?", "A menudo a un proveedor de EE. UU., apoyado en un marco de transferencias", "Se almacena y trata en la UE; el único subencargado fuera de la UE envía emails de la cuenta y no recibe dato de visitante", "Cláusula 7 y Anexo 3 del DPA"],
      ["¿Cuánto tiempo se conserva?", "Configurable, a menudo con el valor por defecto", "TTL fijos: log de eventos 1 día, agregados horarios 90 días, agregados diarios 24 meses", "Anexo 1 del DPA"],
      ["¿Frente a los criterios de quién?", "Un sello genérico de cumplimiento", "Análisis frente a los criterios de AEPD, CNIL y DSK; sin certificación declarada", "Análisis por país, más abajo"],
    ],
    note: (
      <>
        Ninguna de estas respuestas hace, por sí sola, que una implantación quede
        exenta de consentimiento. La{" "}
        <a className={link} href={AEPD_GUIDE} target="_blank" rel="noopener noreferrer">guía de cookies de la AEPD</a>{" "}
        fija sus condiciones para la medición de audiencia, y la{" "}
        <a className={link} href={CNIL_GUIDANCE} target="_blank" rel="noopener noreferrer">CNIL</a>{" "}
        y la{" "}
        <a className={link} href={DSK_SITE} target="_blank" rel="noopener noreferrer">DSK</a>{" "}
        las suyas. La lista de campos es pública en{" "}
        <a className={link} href={WHAT_WE_TRACK} target="_blank" rel="noopener noreferrer">what we track</a>{" "}
        (en inglés), y el razonamiento jurídico para toda la UE está en{" "}
        <Link className={link} href="/es/consentless-analytics/">analítica sin consentimiento</Link> y en la entrada del glosario sobre{" "}
        <Link className={link} href="/es/glossary/gdpr-analytics-compliance/">cumplimiento del RGPD en analítica</Link>.
      </>
    ),
  },

  costs: {
    tag: "Lo que cuesta no poder demostrarlo",
    title: <>El cumplimiento que no puedes enseñar<br /><em>se paga dos veces.</em></>,
    body: "Una vez en exposición legal, y otra en el dato al que renuncias para reducirla.",
    items: [
      ["01", "El banner decide lo que puedes medir", (
        <>
          Cada visitante que rechaza una herramienta con consentimiento desaparece
          de sus informes. En una tienda Shopify medida en paralelo durante 48
          días, GA4 no registró el 29% de las visitas: es el argumento de{" "}
          <Link className={link} href="/es/complete-data/">datos completos</Link>.
        </>
      )],
      ["02", "Cada herramienta nueva reabre la revisión", "Añadir una cookie, un identificador o una finalidad nueva cambia el tratamiento y puede exigir una nueva evaluación. Un inventario de datos fijo y documentado mantiene estable el alcance de la revisión de la analítica."],
      ["03", "Las transferencias pasan a ser una pregunta permanente", (
        <>
          Cuando el dato de visitante sale de la UE, la base de la transferencia
          hay que revisarla cada vez que se mueve el marco legal, el escenario que
          se analiza en{" "}
          <Link className={link} href="/es/blog/analytics-if-data-privacy-framework-falls/">qué pasa con la analítica si cae el Data Privacy Framework</Link>.
        </>
      )],
    ],
  },

  method: {
    id: "method",
    tag: "La lista de revisión",
    title: <>Revísalo<br /><em>como lo haría una autoridad.</em></>,
    body: (
      <>
        Cinco comprobaciones que tu DPO puede hacer con cualquier herramienta de
        analítica, también con esta. El{" "}
        <Link className={link} href="/es/reg-gap-analysis/">análisis de brechas regulatorias</Link>{" "}
        recorre los mismos requisitos para tu stack actual.
      </>
    ),
    howToName: "Cómo revisar la analítica web frente al RGPD y ePrivacy",
    howToDescription:
      "Cinco comprobaciones para revisar una herramienta de analítica frente al RGPD y las normas nacionales de ePrivacy, con los documentos para verificar cada una.",
    steps: [
      { name: "Mapea lo que recoge la etiqueta", text: "Enumera cada campo, dónde se guarda y durante cuánto tiempo. En Sealmetrics ese inventario es el Anexo 1 del DPA: datos de navegación y técnicos, país a partir de la zona horaria del navegador, un identificador de sesión seudonimizado, datos UTM y conversiones, con plazos de conservación fijos." },
      { name: "Comprueba almacenamiento e identificadores", text: "Verifica en tu propia web que no se escribe ninguna cookie, localStorage ni otro almacenamiento, y que ningún identificador enlaza una visita con la siguiente. Las herramientas de desarrollo del navegador lo muestran en un minuto." },
      { name: "Separa las finalidades", text: "La medición agregada de audiencia y la atribución de marketing son finalidades distintas. El DPA las recoge por separado, con la atribución como finalidad opcional que tú configuras, así que evalúa cada una frente a los criterios de tu autoridad." },
      { name: "Revisa ubicación, subencargados y transferencias", text: "Lee dónde se trata el dato de visitante y quién lo trata. Sealmetrics enumera sus subencargados en el Anexo 3 del DPA; el único fuera de la UE envía emails de la cuenta y no recibe dato de visitante." },
      { name: "Lee los criterios de tu autoridad y documenta la decisión", text: "ePrivacy se transpone país por país, así que revisa las condiciones de la AEPD, la CNIL, la DSK o el ICO que se aplican a tu web, y deja por escrito cómo las cumple la configuración." },
    ],
  },

  roles: {
    tag: "Regulador a regulador",
    title: <>La misma arquitectura,<br /><em>leída frente a cuatro autoridades.</em></>,
    body: "Cada análisis recoge los criterios que la autoridad publicó realmente y cómo está construido Sealmetrics frente a ellos. Describen la guía; no son asesoramiento jurídico.",
    items: [
      { role: "España · AEPD", need: "El art. 22.2 de la LSSI-CE y la guía de cookies de 2024.", how: "Las condiciones para medir audiencia de forma anónima sin consentimiento, y la evaluación AEPD a la que remite el DPA.", link: { label: "Analítica y RGPD en España", href: "/es/gdpr-analytics/spain/" } },
      { role: "Francia · CNIL", need: "Una exención condicionada para la medición de audiencia.", how: "Cinco finalidades permitidas y los 14 criterios técnicos de la autoevaluación de la CNIL, contrastados con la arquitectura.", link: { label: "Análisis de Francia (en inglés)", href: "/gdpr-analytics/france/" } },
      { role: "Alemania · DSK", need: "El §25 de la TDDDG decide si hace falta consentimiento.", how: "La orientación de la DSK y las condiciones en las que guardar o leer información en el dispositivo es estrictamente necesario.", link: { label: "Análisis de Alemania (en inglés)", href: "/gdpr-analytics/germany/" } },
      { role: "Reino Unido · ICO", need: "La exención de PECR para fines estadísticos.", how: "Qué cubre la exención para la analítica en el Reino Unido y cómo la documenta Sealmetrics.", link: { label: "Exención PECR (en inglés)", href: "/blog/uk-pecr-analytics-exemption/" } },
    ],
  },

  proof: {
    tag: "Evidencia, no sellos",
    body: "Sealmetrics publica su posición de cumplimiento como documentos que un revisor puede leer, y dice lo que no tiene: ni ISO 27001, ni SOC 2, ni certificación de ninguna autoridad, porque las autoridades no certifican herramientas de analítica.",
    figures: [
      { value: "Anexo 1", label: "cada campo tratado, lo que nunca se guarda y cada plazo de conservación", client: "Contrato de encargo de tratamiento", href: "/es/dpa/" },
      { value: "14", label: "criterios técnicos de la CNIL documentados uno a uno en una autoevaluación pública", client: "Autoevaluación CNIL (en inglés)", href: "/blog/cnil-self-assessment-published/" },
      { value: "0", label: "subencargados fuera de la UE que reciban dato de visitante", client: "Anexo 3 del DPA", href: "/es/dpa/" },
    ],
    readCase: "Abrir",
  },

  limits: {
    tag: "Lo que esto no resuelve",
    title: <>La evidencia ayuda a decidir.<br /><em>No decide por ti.</em></>,
    body: (
      <>
        Decir los límites también es evidencia. Los controles de seguridad, la
        retención y el aislamiento están en la{" "}
        <Link className={link} href="/es/security/">visión general de seguridad</Link>, y
        la perspectiva del DPO, en{" "}
        <Link className={link} href="/es/for/dpo/">analítica para DPOs</Link>.
      </>
    ),
    items: [
      ["No es asesoramiento jurídico", "Estas páginas describen la guía publicada y cómo está construido Sealmetrics frente a ella. La decisión sobre tu implantación es de tu DPO o de tu asesoría."],
      ["Sin certificación", "Sealmetrics no tiene certificación ISO 27001 ni SOC 2, y ninguna autoridad de control certifica herramientas de analítica."],
      ["La configuración puede cambiar la respuesta", "Propiedades personalizadas, valores de conversión o URLs que lleven nombres, emails u otros datos personales cambian la evaluación. Mantén los datos personales fuera de lo que envías."],
      ["La atribución es una finalidad propia", "La atribución de marketing es una finalidad opcional en el DPA, junto a la medición agregada de audiencia. Debe evaluarse por separado, sin dar por hecho que comparte la misma exención."],
      ["Las demás herramientas mantienen sus obligaciones", "Los píxeles publicitarios, el A/B testing o los chats que guardan o leen datos en el dispositivo siguen necesitando consentimiento, haga lo que haga la analítica."],
      ["Las normas se están moviendo", "El Digital Omnibus es una propuesta de la Comisión (COM(2025) 837), no una ley. Revisa el texto final antes de cambiar una decisión de cumplimiento."],
    ],
  },

  faqTag: "Preguntas de los DPO",
  faqTitle: <>Antes de firmar<br /><em>el registro de tratamiento.</em></>,
  faq: [
    { question: "¿Sealmetrics cumple el RGPD?", answer: "Sealmetrics está construido para que el dataset que almacena no contenga datos personales, no se guarde nada en el dispositivo del visitante y el dato de visitante se trate en la UE bajo un contrato de encargo del artículo 28. El cumplimiento, sin embargo, es una propiedad de tu implantación: su configuración, sus finalidades y las normas de tu autoridad nacional. Sealmetrics documenta su parte y no declara ninguna certificación." },
    { question: "¿Necesito un banner de cookies para Sealmetrics?", answer: "Para la analítica en sí, Sealmetrics no instala cookies ni guarda nada en el dispositivo, así que la regla de almacenamiento y acceso de ePrivacy no tiene a qué aplicarse. Que tu web necesite banner depende de las demás herramientas que uses y de los criterios de tu autoridad: la AEPD, la CNIL y la DSK publican sus propias condiciones para la medición de audiencia." },
    { question: "¿Es legal Google Analytics en la UE?", answer: "Puede usarse de forma lícita con consentimiento, que es como lo usan la mayoría de webs europeas: GA4 instala cookies y trata datos personales, así que necesita consentimiento previo y una evaluación de transferencias, porque Google es un proveedor de EE. UU. Varias autoridades europeas declararon ilícitas implantaciones de Google Analytics en 2022 por las transferencias a EE. UU.; esas transferencias se apoyan hoy en el Data Privacy Framework UE-EE. UU. adoptado en 2023. El coste práctico es el tráfico que se pierde con el banner." },
    { question: "¿Sealmetrics trata direcciones IP?", answer: "Solo en tránsito, para atender la petición, y nunca se guardan. El país se obtiene de la zona horaria del navegador, no de la IP, y el marcador de sesión se seudonimiza en servidor con una sal diaria que se destruye al rotar." },
    { question: "¿Dónde se aloja el dato de visitante y quiénes son los subencargados?", answer: "El dato de visitante se almacena y trata en Dublín, Irlanda, con la inferencia de IA por defecto en París. El Anexo 3 del DPA enumera los subencargados; el único fuera de la UE envía emails de servicio a los usuarios de la cuenta y no recibe dato de visitante." },
    { question: "¿Qué documentación podemos obtener para una revisión del DPO?", answer: "El contrato de encargo del artículo 28 con sus anexos (datos tratados, conservación, medidas de seguridad, subencargados, marco de transferencias), la lista pública de campos de la documentación, los análisis de España, Francia y Alemania, un paquete TPSR para compras y asistencia con las evaluaciones de impacto según la cláusula 4.6 del DPA." },
    { question: "¿Qué certificaciones de seguridad tiene Sealmetrics?", answer: "No. Sealmetrics no tiene certificación ISO 27001 ni SOC 2 y no declara ninguna. Las medidas de seguridad que aplica están en el Anexo 2 del DPA, y los clientes tienen derecho de auditoría según la cláusula 4.7." },
  ],

  final: {
    tag: "Revisión de cumplimiento",
    title: <>Trae a tu DPO.<br /><em>Nosotros traemos los documentos.</em></>,
    body: "Treinta minutos con la persona responsable de la implantación: el inventario de datos, el DPA, los plazos de conservación y los criterios de tu autoridad nacional.",
    primary: { label: "Reservar una revisión de cumplimiento", href: "/es/demo/" },
    secondary: { label: "Hacer el análisis de brechas", href: "/es/reg-gap-analysis/" },
  },
};
