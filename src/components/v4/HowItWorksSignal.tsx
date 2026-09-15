import Link from "next/link";
import { SignalAnswer } from "@/components/v4/SignalAnswer";
import { howItWorksAnswer, pillarAnswerLabel } from "@/lib/content/pillar-answers";

type Locale = "en" | "es";

const faqs = {
  en: [
    ["How does cookieless measurement work without identifying people?", "Sealmetrics records aggregate events and their declared acquisition context. It does not create a persistent visitor identifier, use fingerprinting or reconstruct a cross-visit profile."],
    ["Is Sealmetrics affected by ad blockers?", "The collection endpoint can run in first-party mode on your own subdomain. This reduces the loss caused by lists that block known third-party analytics domains."],
    ["How long does implementation take?", "The initial script can be installed in minutes. A useful comparison starts on day one; event calibration and revenue reconciliation normally continue through the first week."],
    ["Do I have to remove GA4 first?", "No. Run both systems side by side, define the same commercial events and compare each reported total with the revenue recorded by your backend."],
    ["Where is visitor data processed and stored?", "The visitor data path is hosted in Dublin, Ireland. Sealmetrics is designed without analytics cookies, persistent visitor IDs or fingerprinting."],
    ["Does Sealmetrics sample data?", "No. Eligible events are retained at full resolution. Reports state the model being applied instead of presenting sampled or modeled data as direct observation."],
  ],
  es: [
    ["¿Cómo funciona la medición sin cookies sin identificar personas?", "Sealmetrics registra eventos agregados y su contexto de adquisición declarado. No crea identificadores persistentes, no usa fingerprinting ni reconstruye perfiles entre visitas."],
    ["¿Afectan los bloqueadores a Sealmetrics?", "El endpoint de captura puede funcionar en modo first-party sobre tu propio subdominio. Así se reduce la pérdida causada por listas que bloquean dominios conocidos de analítica de terceros."],
    ["¿Cuánto tarda la implantación?", "El script inicial se instala en minutos. La comparación útil empieza el primer día; la calibración de eventos y la conciliación de ingresos continúan durante la primera semana."],
    ["¿Tengo que retirar GA4 primero?", "No. Ejecuta ambos sistemas en paralelo, define los mismos eventos comerciales y compara cada total con los ingresos registrados por tu backend."],
    ["¿Dónde se procesan y almacenan los datos de visitante?", "La ruta del dato de visitante está alojada en Dublín, Irlanda. Sealmetrics está diseñado sin cookies analíticas, identificadores persistentes ni fingerprinting."],
    ["¿Sealmetrics muestrea los datos?", "No. Los eventos elegibles se conservan a resolución completa. Los informes declaran el modelo aplicado en vez de presentar datos muestreados o modelados como observación directa."],
  ],
} as const;

export const howItWorksFaqItems = {
  en: faqs.en.map(([question, answer]) => ({ question, answer })),
  es: faqs.es.map(([question, answer]) => ({ question, answer })),
};

const copy = {
  en: {
    home: "Home",
    breadcrumb: "How it works",
    eyebrow: "Measurement architecture · from request to report",
    heroLine1: "A number is only useful",
    heroLine2: "when you can explain",
    heroOutline: "how it was produced.",
    heroBody: "Sealmetrics separates collection, processing, attribution and activation. Each stage has a defined input, a visible output and a boundary your technical team can inspect.",
    primary: "Inspect the signal path",
    secondary: "Review the product",
    micro: "First-party option · aggregate events · full-resolution processing · Dublin hosted",
    diagramLabel: "One event · four declared transformations",
    diagramRows: [
      ["01", "Browser request", "Eligible event"],
      ["02", "Collection endpoint", "Aggregate payload"],
      ["03", "Processing + attribution", "Defined metric"],
      ["04", "Report · API · MCP", "Decision input"],
    ],
    problemTag: "Where conventional measurement breaks",
    problemTitle: <>The loss happens before<br /><em>the dashboard opens.</em></>,
    problemBody: "Consent rejection, blocked requests, browser restrictions and sampling can remove or reshape evidence before an analyst sees a chart. A polished interface cannot recover an event that never entered the pipeline.",
    lossStages: [
      ["70K", "Real visits recorded by the commerce backend", "100% baseline"],
      ["49K", "Requests remaining after a 30% consent loss scenario", "70% visible"],
      ["38K", "Requests remaining after blockers and browser controls", "54% visible"],
      ["10K", "Rows exposed after an illustrative reporting threshold", "14% usable"],
    ],
    lossNote: "Illustrative diagnostic · actual loss depends on the current stack, audience and configuration",
    answerTag: "The architecture",
    answerTitle: <>One signal path.<br /><em>Four explicit stages.</em></>,
    answerBody: "Sealmetrics keeps collection and interpretation separate. That makes it possible to identify whether a disagreement comes from missing events, a commercial definition or the attribution model.",
    stages: [
      ["01 / Collect", "First-party collection option", "A lightweight event contract records pageviews and commercial actions without analytics cookies, persistent visitor IDs or fingerprinting.", ["One script tag", "Works with CMS, SPA and headless stacks", "Optional endpoint on your own subdomain"]],
      ["02 / Process", "Aggregate events at full resolution", "The processing layer validates eligible events and keeps aggregate acquisition context such as referrer, UTM and landing page.", ["No cross-visit identity graph", "No sampling thresholds", "Recent data available within minutes"]],
      ["03 / Attribute", "Revenue under a named model", "Recorded outcomes are connected to channel and campaign using a declared last-click model on the complete eligible dataset.", ["Model is visible", "Backend revenue remains the reference", "Campaign and creative breakdowns"]],
      ["04 / Activate", "The same evidence leaves through APIs", "Reports, BigQuery, REST and MCP expose the defined metrics. LENS answers against that layer instead of inventing another dataset.", ["Nine reporting surfaces", "Documented exports", "Supervised AI workflows"]],
    ],
    tableTag: "What enters · what does not",
    tableTitle: <>A data contract your DPO<br /><em>can actually read.</em></>,
    tableBody: "The architecture is easier to review when the collected fields and the prohibited fields are stated directly.",
    tableHeaders: ["Signal", "Used for", "Stored as", "Boundary"],
    tableRows: [
      ["Page path", "Content and funnel reporting", "Aggregate dimension", "No visitor profile"],
      ["Referrer + UTM", "Acquisition context", "Aggregate dimension", "No cross-visit stitching"],
      ["Commercial event", "Conversion and revenue totals", "Defined metric", "No payment details"],
      ["Country + device class", "Operational breakdown", "Coarse aggregate", "No IP address stored"],
      ["Persistent identifier", "Not collected", "—", "Prohibited by design"],
      ["Browser fingerprint", "Not generated", "—", "Prohibited by design"],
    ],
    implementationTag: "Implementation sequence",
    implementationTitle: <>Compare first.<br /><em>Change later.</em></>,
    implementationBody: "Keep the existing stack live while Sealmetrics collects the same period. The change decision comes after both systems have been reconciled against backend outcomes.",
    steps: [
      ["01", "5–30 minutes", "Install the event contract", "Deploy the script directly or through the current tag-management workflow."],
      ["02", "Day 1", "Observe the first full period", "Confirm traffic, channel context and commercial events are arriving."],
      ["03", "Day 3", "Compare with the current stack", "Review the difference by channel and explain each collection boundary."],
      ["04", "Day 5", "Calibrate commercial events", "Align purchases and 5–10 microconversions with backend definitions."],
      ["05", "Week 1", "Approve decision-ready metrics", "Document the baseline and let marketing, finance and the agency use it."],
    ],
    proofTag: "A controlled comparison",
    proofTitle: <>Do not replace GA4<br /><em>on a promise.</em></>,
    proofBody: "Run the two pipelines together. Sealmetrics should earn its place by explaining the gap and reconciling more closely with the store, CRM or booking engine.",
    proofPrimary: "Book a technical walkthrough",
    proofSecondary: "Review security architecture",
    faqTag: "Technical questions",
    faqTitle: <>The objections belong<br /><em>inside the architecture.</em></>,
    faqBody: "Answers for CTO, DPO and analytics teams evaluating the collection boundary.",
    finalTag: "Validate with your own traffic",
    finalTitle: <>The next step is not migration.<br /><em>It is measurement.</em></>,
    finalBody: "Install beside the current stack, define one commercial period and compare both totals with the backend.",
    finalPrimary: "Book a technical walkthrough",
    finalSecondary: "See complete product",
  },
  es: {
    home: "Inicio",
    breadcrumb: "Cómo funciona",
    eyebrow: "Arquitectura de medición · de la petición al informe",
    heroLine1: "Un número sólo es útil",
    heroLine2: "cuando puedes explicar",
    heroOutline: "cómo se ha producido.",
    heroBody: "Sealmetrics separa captura, procesamiento, atribución y activación. Cada etapa tiene un input definido, un output visible y un límite que tu equipo técnico puede revisar.",
    primary: "Revisa la ruta de la señal",
    secondary: "Ver el producto",
    micro: "Opción first-party · eventos agregados · resolución completa · alojado en Dublín",
    diagramLabel: "Un evento · cuatro transformaciones declaradas",
    diagramRows: [
      ["01", "Petición del navegador", "Evento elegible"],
      ["02", "Endpoint de captura", "Payload agregado"],
      ["03", "Procesamiento + atribución", "Métrica definida"],
      ["04", "Informe · API · MCP", "Input para decidir"],
    ],
    problemTag: "Dónde se rompe la medición convencional",
    problemTitle: <>La pérdida ocurre antes de que<br /><em>se abra el dashboard.</em></>,
    problemBody: "El rechazo de consentimiento, las peticiones bloqueadas, las restricciones del navegador y el muestreo pueden eliminar o deformar la evidencia antes de que un analista vea un gráfico. Una interfaz cuidada no recupera un evento que nunca entró en el pipeline.",
    lossStages: [
      ["70K", "Visitas reales registradas por el backend de comercio", "100% base"],
      ["49K", "Peticiones restantes con un escenario de 30% de pérdida por consentimiento", "70% visible"],
      ["38K", "Peticiones restantes tras bloqueadores y controles del navegador", "54% visible"],
      ["10K", "Filas expuestas tras un umbral ilustrativo de reporting", "14% utilizable"],
    ],
    lossNote: "Diagnóstico ilustrativo · la pérdida real depende del stack, la audiencia y la configuración",
    answerTag: "La arquitectura",
    answerTitle: <>Una ruta de señal.<br /><em>Cuatro etapas explícitas.</em></>,
    answerBody: "Sealmetrics mantiene separadas la captura y la interpretación. Así se puede identificar si un desacuerdo nace de eventos ausentes, de una definición comercial o del modelo de atribución.",
    stages: [
      ["01 / Captura", "Opción de captura first-party", "Un contrato ligero registra pageviews y acciones comerciales sin cookies analíticas, identificadores persistentes ni fingerprinting.", ["Un script", "Funciona con CMS, SPA y headless", "Endpoint opcional en tu subdominio"]],
      ["02 / Procesa", "Eventos agregados a resolución completa", "La capa de procesamiento valida eventos elegibles y conserva contexto agregado de adquisición: referrer, UTM y landing.", ["Sin grafo de identidad entre visitas", "Sin umbrales de muestreo", "Dato reciente en minutos"]],
      ["03 / Atribuye", "Ingresos bajo un modelo nombrado", "Los resultados registrados se conectan con canal y campaña mediante last-click declarado sobre el conjunto elegible completo.", ["Modelo visible", "El ingreso backend sigue siendo la referencia", "Desglose por campaña y creatividad"]],
      ["04 / Activa", "La misma evidencia sale por APIs", "Informes, BigQuery, REST y MCP exponen las métricas definidas. LENS responde contra esa capa, no inventa otro dataset.", ["Nueve superficies de reporting", "Exports documentados", "Flujos de IA supervisados"]],
    ],
    tableTag: "Qué entra · qué no entra",
    tableTitle: <>Un contrato de datos que tu DPO<br /><em>puede leer de verdad.</em></>,
    tableBody: "La arquitectura es más fácil de revisar cuando los campos recogidos y los campos prohibidos se declaran directamente.",
    tableHeaders: ["Señal", "Uso", "Almacenamiento", "Límite"],
    tableRows: [
      ["Ruta de página", "Contenido y embudos", "Dimensión agregada", "Sin perfil de visitante"],
      ["Referrer + UTM", "Contexto de adquisición", "Dimensión agregada", "Sin stitching entre visitas"],
      ["Evento comercial", "Conversiones e ingresos", "Métrica definida", "Sin datos de pago"],
      ["País + tipo de dispositivo", "Desglose operativo", "Agregado grueso", "Sin almacenar IP"],
      ["Identificador persistente", "No se recoge", "—", "Prohibido por diseño"],
      ["Fingerprint del navegador", "No se genera", "—", "Prohibido por diseño"],
    ],
    implementationTag: "Secuencia de implantación",
    implementationTitle: <>Compara primero.<br /><em>Cambia después.</em></>,
    implementationBody: "Mantén vivo el stack existente mientras Sealmetrics recoge el mismo periodo. La decisión de cambio llega después de conciliar ambos sistemas contra resultados del backend.",
    steps: [
      ["01", "5–30 minutos", "Instala el contrato de eventos", "Despliega el script directamente o mediante el flujo actual de tag management."],
      ["02", "Día 1", "Observa el primer periodo completo", "Confirma tráfico, contexto de canal y llegada de eventos comerciales."],
      ["03", "Día 3", "Compara con el stack actual", "Revisa la diferencia por canal y explica cada límite de captura."],
      ["04", "Día 5", "Calibra eventos comerciales", "Alinea compras y 5–10 microconversiones con las definiciones del backend."],
      ["05", "Semana 1", "Aprueba métricas para decidir", "Documenta la base y permite que marketing, finanzas y agencia la utilicen."],
    ],
    proofTag: "Una comparación controlada",
    proofTitle: <>No sustituyas GA4<br /><em>por una promesa.</em></>,
    proofBody: "Ejecuta los dos pipelines juntos. Sealmetrics debe ganarse su lugar explicando el gap y conciliando mejor con la tienda, el CRM o el motor de reservas.",
    proofPrimary: "Reserva una revisión técnica",
    proofSecondary: "Revisa la arquitectura de seguridad",
    faqTag: "Preguntas técnicas",
    faqTitle: <>Las objeciones pertenecen<br /><em>dentro de la arquitectura.</em></>,
    faqBody: "Respuestas para CTO, DPO y equipos de analítica que evalúan el límite de captura.",
    finalTag: "Valida con tu propio tráfico",
    finalTitle: <>El siguiente paso no es migrar.<br /><em>Es medir.</em></>,
    finalBody: "Instala junto al stack actual, define un periodo comercial y compara ambos totales con el backend.",
    finalPrimary: "Reserva una revisión técnica",
    finalSecondary: "Ver el producto completo",
  },
} as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function HowItWorksSignal({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const prefix = locale === "es" ? "/es" : "";
  const firstPartyHref = locale === "es" ? "/es/glossary/first-party-data-collection/" : "/glossary/first-party-data-collection/";
  const serverHref = locale === "es" ? "/es/glossary/server-side-tracking/" : "/glossary/server-side-tracking/";

  return (
    <div className="sig-how-page">
      <section className="sig-how-hero">
        <div className="sig-how-hero-copy">
          <nav className="sig-how-breadcrumbs" aria-label="Breadcrumb"><Link href={`${prefix}/`}>{t.home}</Link><span>/</span><span>{t.breadcrumb}</span></nav>
          <p className="sig-how-eyebrow"><span>{t.eyebrow}</span></p>
          <h1>{t.heroLine1}<br />{t.heroLine2}<br /><em>{t.heroOutline}</em></h1>
          <p className="sig-how-hero-body">{t.heroBody}</p>
          <div data-md="skip" className="sig-how-actions"><a className="sig-how-button sig-how-button-acid" href="#signal-path">{t.primary} <Arrow /></a><Link className="sig-how-text-link" href={`${prefix}/product/`}>{t.secondary} →</Link></div>
          <p className="sig-how-micro">{t.micro}</p>
        </div>
        <div className="sig-how-diagram">
          <div className="sig-how-module-top"><span>{t.diagramLabel}</span><span className="sig-how-live"><i /> Traceable</span></div>
          {t.diagramRows.map(([n, label, output], index) => <div className="sig-how-diagram-row" key={n}><span>{n}</span><strong>{label}</strong><b>{output}</b>{index < t.diagramRows.length - 1 && <i aria-hidden="true">↓</i>}</div>)}
          <div className="sig-how-module-foot">Collection boundary visible · attribution model declared</div>
        </div>
      </section>

      <SignalAnswer label={pillarAnswerLabel[locale]}>{howItWorksAnswer[locale]}</SignalAnswer>

      <section className="sig-how-loss">
        <div className="sig-how-section-head"><div><p className="sig-how-tag">{t.problemTag}</p><h2>{t.problemTitle}</h2></div><p>{t.problemBody}</p></div>
        <div className="sig-how-loss-board">
          {t.lossStages.map(([number, label, state], index) => <div key={number} style={{ "--sig-how-width": `${100 - index * 21}%` } as React.CSSProperties}><strong>{number}</strong><span>{label}</span><b>{state}</b></div>)}
        </div>
        <p className="sig-how-note">{t.lossNote}</p>
      </section>

      <section className="sig-how-architecture" id="signal-path">
        <div className="sig-how-section-head"><div><p className="sig-how-tag sig-how-tag-light">{t.answerTag}</p><h2>{t.answerTitle}</h2></div><p>{t.answerBody}</p></div>
        <div className="sig-how-stage-grid">
          {t.stages.map(([n, title, body, bullets], index) => <article key={n}><span>{n}</span><h3>{index === 0 ? <Link href={firstPartyHref}>{title}</Link> : index === 1 ? <Link href={serverHref}>{title}</Link> : title}</h3><p>{body}</p><ul>{bullets.map(b => <li key={b}>— {b}</li>)}</ul></article>)}
        </div>
      </section>

      <section className="sig-how-contract">
        <div className="sig-how-section-head"><div><p className="sig-how-tag">{t.tableTag}</p><h2>{t.tableTitle}</h2></div><p>{t.tableBody}</p></div>
        <div className="sig-how-table-wrap"><table><thead><tr>{t.tableHeaders.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{t.tableRows.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
      </section>

      <section className="sig-how-implementation">
        <div className="sig-how-section-head"><div><p className="sig-how-tag">{t.implementationTag}</p><h2>{t.implementationTitle}</h2></div><p>{t.implementationBody}</p></div>
        <ol className="sig-how-steps">{t.steps.map(([n, time, title, body]) => <li key={n}><span>{n}</span><b>{time}</b><h3>{title}</h3><p>{body}</p></li>)}</ol>
      </section>

      <section className="sig-how-proof"><div><p className="sig-how-tag sig-how-tag-light">{t.proofTag}</p><h2>{t.proofTitle}</h2></div><div><p>{t.proofBody}</p><div data-md="skip" className="sig-how-actions"><Link className="sig-how-button sig-how-button-acid" href={`${prefix}/demo/`}>{t.proofPrimary} <Arrow /></Link><Link className="sig-how-dark-link" href={`${prefix}/security/`}>{t.proofSecondary} →</Link></div></div></section>

      <section className="sig-how-faq">
        <div className="sig-how-section-head"><div><p className="sig-how-tag">{t.faqTag}</p><h2>{t.faqTitle}</h2></div><p>{t.faqBody}</p></div>
        <div className="sig-how-faq-list">{faqs[locale].map(([question, answer], index) => <details key={question}><summary><span>0{index + 1}</span>{question}<b aria-hidden="true">+</b></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="sig-how-final"><p className="sig-how-tag">{t.finalTag}</p><h2>{t.finalTitle}</h2><p>{t.finalBody}</p><div data-md="skip" className="sig-how-actions"><Link className="sig-how-button sig-how-button-dark" href={`${prefix}/demo/`}>{t.finalPrimary} <Arrow /></Link><Link className="sig-how-text-link" href={`${prefix}/product/`}>{t.finalSecondary} →</Link></div></section>
    </div>
  );
}
