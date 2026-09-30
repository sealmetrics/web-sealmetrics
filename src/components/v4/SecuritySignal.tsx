import Link from "next/link";
import { SignalAnswer } from "@/components/v4/SignalAnswer";
import { securityAnswer, pillarAnswerLabel } from "@/lib/content/pillar-answers";

type Locale = "en" | "es";

const copy = {
  en: {
    home: "Home",
    breadcrumb: "Security",
    eyebrow: "Trust center · security posture",
    hero: <>The safest visitor record<br />is the one <em>you never create.</em></>,
    heroBody: "Sealmetrics begins with data minimisation, then applies encryption, isolation and automatic retention to the aggregate evidence that remains.",
    heroPrimary: "Review the controls",
    heroSecondary: "Open the DPA",
    heroMicro: "Designed for GDPR · ePrivacy · Schrems II clean · Dublin, Ireland",
    boundaryTitle: "Visitor data boundary",
    boundaryRows: [["Browser", "No storage"], ["Collection", "Pseudonymised events"], ["Processing", "Dublin, Ireland"], ["Retention", "Automatic TTL"]],
    boundaryFoot: "No advertising profile · no cross-site identity · no persisted visitor IP",
    principlesTag: "Four structural controls",
    principlesTitle: <>Reduce the attack surface<br /><em>before securing it.</em></>,
    principlesBody: "Security is easier to inspect when each control has a narrow job. The first four remove data and identity paths conventional analytics normally creates.",
    principles: [
      ["01", "No visitor storage", "The measurement pixel writes no cookie, localStorage, sessionStorage or IndexedDB entry to the visitor device."],
      ["02", "No persisted IP", "Visitor IP addresses have no analytics-database column. The IP is used transiently to filter abusive traffic; it can sit in internal processing queues until consumed, and in retry queues for up to 7 days."],
      ["03", "Account isolation", "Every data path is scoped to an account. Requests are checked against that boundary before analytics records are read."],
      ["04", "Data minimisation", "Reports use aggregate commercial events, without names, emails or identifiers designed to follow a person across websites."],
    ],
    flowTag: "Inspect the data path",
    flowTitle: <>One operating boundary.<br /><em>Four explicit stages.</em></>,
    flowBody: "Visitor measurement and the service databases operate in Dublin, Ireland. Each stage narrows what can proceed to the next one.",
    flow: [
      ["01 · Collect", "Cookieless event", "The browser sends the page or commercial event without writing an identifier to the device."],
      ["02 · Validate", "Signed request", "Domain checks and expiring signed tokens reduce unauthorised event injection."],
      ["03 · Aggregate", "Account-scoped data", "Operational records are separated by account and converted into reporting aggregates."],
      ["04 · Expire", "Database TTL", "Retention is enforced by the data layer instead of relying on a manual deletion calendar."],
    ],
    controlsTag: "Technical and organisational measures",
    controlsTitle: <>Controls a security team<br /><em>can question directly.</em></>,
    controlsBody: "The summary below is aligned with the DPA. When a contractual detail and this page differ, the signed DPA prevails.",
    controlHeaders: ["Control", "Applied measure", "Evidence boundary"],
    controls: [
      ["Transport", "TLS 1.2+", "Service communications, AI inference included"],
      ["Secrets at rest", "Encrypted at application level", "API keys and integration credentials; storage encryption follows the hosting provider's measures"],
      ["Access", "RBAC, least privilege and logged access", "MFA required for personnel; two-factor authentication available to users"],
      ["Customer isolation", "Account-scoped keys and query validation", "All analytics storage layers"],
      ["Platform keys", "Kept outside the code repository", "Restricted-access environment configuration"],
      ["Backups", "Being implemented", "Encrypted before they leave our servers, stored in the EU, kept 30 days at most"],
    ],
    retentionTag: "Retention is a control",
    retentionTitle: <>Fixed periods.<br /><em>Automatic enforcement.</em></>,
    retentionBody: "Analytics retention does not depend on someone remembering to run a deletion process. Database-level TTLs enforce the operating periods.",
    retentionHeaders: ["Data class", "Maximum operating period"],
    retention: [["Event-level technical log", "1 day"], ["Hourly aggregates", "90 days"], ["Daily aggregates and conversions", "24 months"], ["Active session state", "2 hours"], ["Daily pseudonymisation salt", "24 hours"]],
    governanceTag: "Procurement evidence",
    governanceTitle: <>Claims are useful<br /><em>only when bounded.</em></>,
    governanceBody: "Sealmetrics documents the architecture, contractual measures and subprocessors without presenting a certification the company does not hold.",
    governance: [
      ["GDPR", "Designed for it (self-assessed)", "Data minimisation, purpose restriction and an Article 28 DPA."],
      ["ePrivacy", "Cookieless operation", "No visitor-device storage is required for measurement."],
      ["Schrems II", "Clean visitor path", "Visitor analytics data is processed in Dublin, Ireland, and never leaves the EU."],
      ["DPA", "Included", "Technical and organisational measures and audit rights are documented."],
      ["TPSR", "Available", "A structured package for technical, privacy and security review."],
      ["Certifications", "Not claimed", "Sealmetrics does not currently claim ISO 27001 or SOC 2 certification."],
    ],
    documentsTag: "Review the source documents",
    documentsTitle: <>Move from website claim<br /><em>to reviewable evidence.</em></>,
    documentsBody: "Use the DPA for contractual controls, the privacy policy for processing disclosures and the Trust Center for the wider assurance surface.",
    docs: [["DPA", "Technical measures and subprocessors", "/dpa/"], ["Privacy policy", "Processing and rights", "/privacy/"], ["Trust Center", "Operational assurance overview", "/trust/"]],
    finalTag: "Security review",
    finalTitle: <>Bring the questions<br /><em>your approval depends on.</em></>,
    finalBody: "Walk through retention, isolation, the Dublin data boundary and the DPA with the person responsible for the implementation.",
    finalPrimary: "Book a security walkthrough",
    finalSecondary: "Read the DPO briefing",
  },
  es: {
    home: "Inicio",
    breadcrumb: "Seguridad",
    eyebrow: "Trust center · postura de seguridad",
    hero: <>El registro de visitante más seguro<br />es el que <em>nunca creas.</em></>,
    heroBody: "Sealmetrics empieza por minimizar el dato y después aplica cifrado, aislamiento y retención automática a la evidencia agregada que permanece.",
    heroPrimary: "Revisa los controles",
    heroSecondary: "Abre el DPA",
    heroMicro: "Diseñada para el RGPD · ePrivacy · Schrems II clean · Dublín, Irlanda",
    boundaryTitle: "Perímetro del dato de visitante",
    boundaryRows: [["Navegador", "Sin almacenamiento"], ["Captura", "Eventos seudonimizados"], ["Proceso", "Dublín, Irlanda"], ["Retención", "TTL automático"]],
    boundaryFoot: "Sin perfil publicitario · sin identidad cross-site · sin IP de visitante persistida",
    principlesTag: "Cuatro controles estructurales",
    principlesTitle: <>Reduce la superficie de ataque<br /><em>antes de protegerla.</em></>,
    principlesBody: "La seguridad se inspecciona mejor cuando cada control tiene una función concreta. Los cuatro primeros eliminan rutas de dato e identidad habituales en la analítica convencional.",
    principles: [
      ["01", "Sin storage de visitante", "El píxel no escribe cookies ni entradas en localStorage, sessionStorage o IndexedDB en el dispositivo del visitante."],
      ["02", "Sin IP persistida", "La IP del visitante no tiene columna en la base de datos de analítica. Se usa de forma transitoria para filtrar tráfico abusivo; puede quedar en las colas internas hasta que se procesa y, si el proceso falla, en colas de reintento hasta 7 días."],
      ["03", "Aislamiento por cuenta", "Cada ruta de datos queda limitada a una cuenta. Las peticiones se validan contra ese perímetro antes de leer registros."],
      ["04", "Minimización de datos", "Los informes usan eventos comerciales agregados, sin nombres, emails ni identificadores diseñados para seguir a una persona entre webs."],
    ],
    flowTag: "Inspecciona el recorrido del dato",
    flowTitle: <>Un solo perímetro operativo.<br /><em>Cuatro etapas explícitas.</em></>,
    flowBody: "La medición de visitantes y las bases de datos del servicio operan en Dublín, Irlanda. Cada etapa reduce lo que puede pasar a la siguiente.",
    flow: [
      ["01 · Captura", "Evento sin cookies", "El navegador envía la página o evento comercial sin escribir un identificador en el dispositivo."],
      ["02 · Validación", "Petición firmada", "La comprobación del dominio y los tokens firmados con caducidad reducen la inyección no autorizada."],
      ["03 · Agregación", "Dato aislado por cuenta", "Los registros operativos se separan por cuenta y se convierten en agregados de reporting."],
      ["04 · Caducidad", "TTL de base de datos", "La retención se aplica desde la capa de datos, sin depender de un calendario manual de borrado."],
    ],
    controlsTag: "Medidas técnicas y organizativas",
    controlsTitle: <>Controles que seguridad<br /><em>puede cuestionar directamente.</em></>,
    controlsBody: "El resumen está alineado con el DPA. Si un detalle contractual difiere de esta página, prevalece el DPA firmado.",
    controlHeaders: ["Control", "Medida aplicada", "Perímetro de evidencia"],
    controls: [["Transporte", "TLS 1.2+", "Comunicaciones del servicio, inferencia de IA incluida"], ["Secretos en reposo", "Cifrados a nivel de aplicación", "Claves de API y credenciales de integraciones; el cifrado del almacenamiento sigue las medidas del proveedor de alojamiento"], ["Acceso", "RBAC, mínimo privilegio y accesos registrados", "MFA obligatoria para el personal; doble factor disponible para los usuarios"], ["Aislamiento de cliente", "Claves por cuenta y validación de consultas", "Todas las capas de almacenamiento analítico"], ["Claves de plataforma", "Fuera del repositorio de código", "Configuración de entorno de acceso restringido"], ["Copias de seguridad", "En implantación", "Cifradas antes de salir de nuestros servidores, guardadas en la UE, 30 días como máximo"]],
    retentionTag: "La retención es un control",
    retentionTitle: <>Periodos fijos.<br /><em>Aplicación automática.</em></>,
    retentionBody: "La retención analítica no depende de recordar un proceso de borrado. Los TTL de base de datos aplican los periodos operativos.",
    retentionHeaders: ["Clase de dato", "Periodo operativo máximo"],
    retention: [["Log técnico a nivel de evento", "1 día"], ["Agregados horarios", "90 días"], ["Agregados diarios y conversiones", "24 meses"], ["Estado de sesión activa", "2 horas"], ["Valor diario de seudonimización", "24 horas"]],
    governanceTag: "Evidencia para procurement",
    governanceTitle: <>Las afirmaciones son útiles<br /><em>sólo cuando tienen límites.</em></>,
    governanceBody: "Sealmetrics documenta arquitectura, medidas contractuales y subencargados sin presentar una certificación que la empresa no posee.",
    governance: [["RGPD", "Diseñada para él (autoevaluación)", "Minimización, limitación de finalidad y DPA conforme al artículo 28."], ["ePrivacy", "Operación sin cookies", "La medición no requiere storage en el dispositivo del visitante."], ["Schrems II", "Ruta de visitante limpia", "El dato analítico de visitante se procesa en Dublín, Irlanda, y nunca sale de la UE."], ["DPA", "Incluido", "Medidas técnicas, organizativas y derechos de auditoría documentados."], ["TPSR", "Disponible", "Paquete estructurado para revisión técnica, de privacidad y seguridad."], ["Certificaciones", "No declaradas", "Sealmetrics no declara actualmente certificación ISO 27001 ni SOC 2."]],
    documentsTag: "Revisa los documentos fuente",
    documentsTitle: <>Pasa de la afirmación web<br /><em>a la evidencia revisable.</em></>,
    documentsBody: "Usa el DPA para los controles contractuales, la política de privacidad para los tratamientos y el Trust Center para el perímetro general de garantía.",
    docs: [["DPA", "Medidas técnicas y subencargados", "/es/dpa/"], ["Política de privacidad", "Tratamientos y derechos", "/es/privacy/"], ["Trust Center", "Postura operativa general", "/es/trust/"]],
    finalTag: "Revisión de seguridad",
    finalTitle: <>Trae las preguntas<br /><em>de las que depende la aprobación.</em></>,
    finalBody: "Revisa la retención, el aislamiento, el perímetro de Dublín y el DPA con la persona responsable de la implementación.",
    finalPrimary: "Reserva una revisión de seguridad",
    finalSecondary: "Lee el briefing para DPO",
  },
} as const;

function Arrow() { return <span aria-hidden="true">↗</span>; }

export function SecuritySignal({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const prefix = locale === "es" ? "/es" : "";
  return (
    <main className="sig-security-page">
      <section className="sig-security-hero">
        <div>
          <nav className="sig-security-breadcrumbs" aria-label="Breadcrumb"><Link href={`${prefix}/`}>{t.home}</Link><span>/</span><span>{t.breadcrumb}</span></nav>
          <p className="sig-security-eyebrow"><span>{t.eyebrow}</span></p>
          <h1>{t.hero}</h1>
          <p className="sig-security-hero-body">{t.heroBody}</p>
          <div data-md="skip" className="sig-security-actions"><a className="sig-security-button sig-security-button-acid" href="#controls">{t.heroPrimary}<Arrow /></a><Link className="sig-security-text-link" href={`${prefix}/dpa/`}>{t.heroSecondary} <Arrow /></Link></div>
          <p className="sig-security-micro">{t.heroMicro}</p>
        </div>
        <aside className="sig-security-boundary" aria-label={t.boundaryTitle}>
          <div className="sig-security-module-top"><span>{t.boundaryTitle}</span><span>LIVE · EU</span></div>
          {t.boundaryRows.map(([label,value], index) => <div key={label}><span>0{index + 1}</span><strong>{label}</strong><b>{value}</b></div>)}
          <p>{t.boundaryFoot}</p>
        </aside>
      </section>

      <SignalAnswer label={pillarAnswerLabel[locale]}>{securityAnswer[locale]}</SignalAnswer>

      <section className="sig-security-principles">
        <div className="sig-security-section-head"><div><p className="sig-security-tag">{t.principlesTag}</p><h2>{t.principlesTitle}</h2></div><p>{t.principlesBody}</p></div>
        <div className="sig-security-principle-grid">{t.principles.map(([number,title,body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="sig-security-flow">
        <div className="sig-security-section-head"><div><p className="sig-security-tag sig-security-tag-light">{t.flowTag}</p><h2>{t.flowTitle}</h2></div><p>{t.flowBody}</p></div>
        <div className="sig-security-flow-grid">{t.flow.map(([stage,title,body]) => <article key={stage}><span>{stage}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
      </section>

      <section className="sig-security-controls" id="controls">
        <div className="sig-security-section-head"><div><p className="sig-security-tag">{t.controlsTag}</p><h2>{t.controlsTitle}</h2></div><p>{t.controlsBody}</p></div>
        <div className="sig-security-table-wrap"><table><thead><tr>{t.controlHeaders.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{t.controls.map(row => <tr key={row[0]}>{row.map((cell,index) => index === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
      </section>

      <section className="sig-security-retention">
        <div className="sig-security-section-head"><div><p className="sig-security-tag sig-security-tag-light">{t.retentionTag}</p><h2>{t.retentionTitle}</h2></div><p>{t.retentionBody}</p></div>
        <div className="sig-security-table-wrap sig-security-table-dark"><table><thead><tr>{t.retentionHeaders.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{t.retention.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td></tr>)}</tbody></table></div>
      </section>

      <section className="sig-security-governance">
        <div className="sig-security-section-head"><div><p className="sig-security-tag">{t.governanceTag}</p><h2>{t.governanceTitle}</h2></div><p>{t.governanceBody}</p></div>
        <div className="sig-security-governance-grid">{t.governance.map(([name,status,body]) => <article key={name}><div><span>{name}</span><b>{status}</b></div><p>{body}</p></article>)}</div>
      </section>

      <section className="sig-security-documents">
        <div className="sig-security-section-head"><div><p className="sig-security-tag">{t.documentsTag}</p><h2>{t.documentsTitle}</h2></div><p>{t.documentsBody}</p></div>
        <div className="sig-security-doc-grid">{t.docs.map(([name,description,href]) => <Link href={href} key={name}><span>{name}</span><p>{description}</p><Arrow /></Link>)}</div>
      </section>

      <section className="sig-security-final">
        <p className="sig-security-tag">{t.finalTag}</p><h2>{t.finalTitle}</h2><p>{t.finalBody}</p>
        <div data-md="skip" className="sig-security-actions"><Link className="sig-security-button sig-security-button-dark" href={`${prefix}/demo/`}>{t.finalPrimary}<Arrow /></Link><Link className="sig-security-text-link" href={`${prefix}/for/dpo/`}>{t.finalSecondary} <Arrow /></Link></div>
      </section>
    </main>
  );
}
