import Link from "next/link";
import { SignalAnswer } from "@/components/v4/SignalAnswer";
import { productAnswer, pillarAnswerLabel } from "@/lib/content/pillar-answers";

type Locale = "en" | "es";

const reports = {
  en: [
    ["01", "Overview", "Headline totals and the timestamp of the last observed hit."],
    ["02", "Evolution", "Metrics over time, with period-against-period context."],
    ["03", "Sources", "Channel, campaign and referrer totals on the complete dataset."],
    ["04", "Pages", "Pageviews, landing pages and content groups."],
    ["05", "Conversions", "Conversions, microconversions and last-click revenue by channel."],
    ["06", "Funnel", "Step-level drop-off without sampling thresholds."],
    ["07", "Geography", "Country-level totals derived without storing IP addresses."],
    ["08", "Devices", "Device, browser and operating-system totals."],
    ["09", "Properties", "Products, baskets, AOV and your own event properties."],
  ],
  es: [
    ["01", "Overview", "Totales de cabecera y momento del último hit observado."],
    ["02", "Evolución", "Métricas en el tiempo, con contexto periodo contra periodo."],
    ["03", "Fuentes", "Canal, campaña y referrer sobre el conjunto de datos completo."],
    ["04", "Páginas", "Pageviews, landing pages y agrupaciones de contenido."],
    ["05", "Conversiones", "Conversiones, microconversiones e ingresos last-click por canal."],
    ["06", "Embudo", "Abandono por paso sin umbrales de muestreo."],
    ["07", "Geografía", "Totales por país sin almacenar direcciones IP."],
    ["08", "Dispositivos", "Totales por dispositivo, navegador y sistema operativo."],
    ["09", "Propiedades", "Productos, carritos, AOV y tus propias propiedades de evento."],
  ],
} as const;

const copy = {
  en: {
    home: "Home",
    breadcrumb: "Product",
    eyebrow: "Platform overview · one measurement pipeline",
    heroLine1: "Your analytics stack",
    heroLine2: "is only as good as",
    heroOutline: "the inputs it sees.",
    heroBody:
      "Sealmetrics connects aggregate traffic, recorded revenue, decision-ready reports and AI supervision in one EU-hosted platform. No stitched-together evidence. No modeled fill-ins presented as observation.",
    heroLink: "Inspect the four layers",
    howLink: "See how measurement works",
    heroProof: "Cookieless capture · declared last-click attribution · EU-hosted in Dublin",
    boardTop: "Platform signal map",
    boardLive: "Defined inputs",
    boardLayers: [
      ["01 / Capture", "Eligible aggregate events", "Observed"],
      ["02 / Attribute", "Revenue under a declared model", "Reconciled"],
      ["03 / Understand", "Nine reports + LENS AI", "Grounded"],
      ["04 / Activate", "API · MCP · BigQuery", "Portable"],
    ],
    boardFoot: "One evidence chain · from event to decision",
    problemTag: "The problem before the product",
    problemTitle: <>Four systems can agree on the meeting.<br /><em>They still disagree on the number.</em></>,
    problemBody:
      "GA4, ad platforms, your agency report and the CRM can each be internally consistent while measuring a different slice of reality. The cost appears when budget decisions depend on a baseline nobody can reconcile.",
    problems: [
      ["The Meta paradox", "The pixel reports 340 conversions. The CRM records 180. Both teams defend their own collection boundary."],
      ["The Direct bucket", "Consent-shaped visits lose acquisition context, so productive campaigns can reappear as Direct or none."],
      ["The reconciliation loop", "Marketing, finance and the agency spend another 90 minutes aligning totals instead of moving budget."],
    ],
    definitionTag: "What Sealmetrics is",
    definitionLead: "One platform for complete-data analytics.",
    definitionBefore: "Sealmetrics is a ",
    cookieless: "cookieless, consentless web analytics platform",
    definitionMiddle: " for eCommerce that measures traffic without depending on consent and attributes revenue using ",
    lastClick: "last-click on the full dataset",
    definitionAfter: ". Designed for GDPR from the architecture up (self-assessed), hosted exclusively in the EU.",
    definitionCaveat:
      "The useful claim is not “more data” in isolation. It is a reported total you can compare with backend revenue, under an attribution model your team can name.",
    definitionAction: "Book a measurement walkthrough",
    definitionPricing: "Review pricing",
    definitionEraBefore: "The architectural shift behind that claim — unmodeled data, no consent dependency, output an AI agent can read — is set out in ",
    definitionEraLink: "modern web analytics",
    definitionEraAfter: ".",
    layersTag: "Four layers · one evidence chain",
    layersTitle: <>From first signal to<br /><em>a decision you can defend.</em></>,
    layersBody:
      "Each layer uses the same defined inputs. That removes the hand-off where collection, attribution and reporting usually start telling different stories.",
    layers: [
      ["01", "Capture", "Cookieless aggregate measurement", "Observe eligible events without analytics cookies, persistent visitor IDs or fingerprinting."],
      ["02", "Attribute", "Revenue under a declared model", "Connect recorded outcomes to channel, campaign and creative using last-click on the complete dataset."],
      ["03", "Understand", "Reports plus LENS AI", "Inspect nine reporting surfaces or ask defined metrics a plain-language question."],
      ["04", "Activate", "API, MCP and BigQuery", "Move the same evidence into your warehouse, BI layer and supervised AI workflows."],
    ],
    featureTag: "The product, for real",
    featureTitle: <>Not another dashboard.<br /><em>A tighter evidence loop.</em></>,
    featureBody:
      "The interface is built around the decisions an eCommerce team has to make now: which channel deserves budget, where the funnel leaks and whether the reported revenue matches the store.",
    attributionTitle: "Revenue attribution that names its assumptions.",
    attributionBody:
      "Channel, campaign, ad set and creative totals use last-click on observed aggregate events. No per-user profile is needed to rank recorded outcomes.",
    lensTitle: "LENS answers against defined metrics.",
    lensBody:
      "Ask why revenue moved, which products leak value or what changed yesterday. Inspect the metric and source before the answer changes spend.",
    apiTitle: "Your data leaves through documented doors.",
    apiBody:
      "Use the REST API, native BigQuery export, webhooks or the MCP server. LENS can run with your own model key; managed Private AI is available by plan.",
    reportsTag: "Nine core reports",
    reportsTitle: <>Every report uses<br /><em>the same inputs.</em></>,
    reportsBody:
      "Sources, pages, funnels and revenue do not live in separate products. LENS sits above these reporting surfaces as an assistant, not as an invented tenth source of truth.",
    proofTag: "Published customer evidence",
    proofTitle: <>The product has to survive<br /><em>a real comparison.</em></>,
    proofBody:
      "Palladium Hotel Group and Dreamplace Hotels compared Sealmetrics with their previous measurement and published the resulting figures.",
    palladiumStats: [
      ["40%", "of inbound traffic previously had no attribution"],
      ["35%", "of GA4 bookings had no channel assigned"],
      ["+165%", "Display Cost-per-Search on DV360 after the change"],
    ],
    dreamStats: [
      ["+30%", "more traffic measured than Google Analytics"],
      ["15–20%", "sales-attribution gap against the CRM, closed"],
    ],
    palladiumQuote: "The data Sealmetrics delivers is agnostic, unbiased and neutral. There is no black box.",
    dreamQuote: "It is the tool that gives us the real data — and the one we make decisions with.",
    caseLink: "Read the full case",
    integrationsTag: "Direct connectors and open interfaces",
    integrationsTitle: <>Keep the stack.<br /><em>Replace the missing evidence.</em></>,
    integrationsBody:
      "Start with a native commerce connector where available, or implement the documented event contract. Keep GA4 during the comparison period and change the stack only after the backend confirms the result.",
    integrationsLink: "See all integrations",
    finalTag: "A fair product test",
    finalTitle: <>Do not trust the product page.<br /><em>Trust the reconciliation.</em></>,
    finalBody:
      "Run Sealmetrics beside the current stack, define the same events and compare both reported totals with the revenue your store recorded.",
    finalPrimary: "Book a measurement walkthrough",
    finalSecondary: "Start the 14-day trial",
    finalProof: "Keep your current stack · compare the same period · decide from backend evidence",
    illustrative: "Illustrative data · not a live account",
  },
  es: {
    home: "Inicio",
    breadcrumb: "Producto",
    eyebrow: "Vista de plataforma · un solo pipeline de medición",
    heroLine1: "Tu stack analítico",
    heroLine2: "solo es tan bueno como",
    heroOutline: "los datos que alcanza a ver.",
    heroBody:
      "Sealmetrics conecta tráfico agregado, ingresos registrados, reporting para decidir y supervisión de IA en una plataforma alojada en la UE. Sin evidencias pegadas a posteriori. Sin presentar estimaciones como observación.",
    heroLink: "Revisa las cuatro capas",
    howLink: "Mira cómo funciona la medición",
    heroProof: "Captura sin cookies · atribución last-click declarada · alojado en Dublín",
    boardTop: "Mapa de señales de la plataforma",
    boardLive: "Inputs definidos",
    boardLayers: [
      ["01 / Captura", "Eventos agregados elegibles", "Observado"],
      ["02 / Atribuye", "Ingresos bajo un modelo declarado", "Conciliado"],
      ["03 / Entiende", "Nueve informes + LENS AI", "Anclado"],
      ["04 / Activa", "API · MCP · BigQuery", "Portable"],
    ],
    boardFoot: "Una cadena de evidencia · del evento a la decisión",
    problemTag: "El problema antes del producto",
    problemTitle: <>Cuatro sistemas pueden coincidir en la reunión.<br /><em>Siguen sin coincidir en el número.</em></>,
    problemBody:
      "GA4, las plataformas publicitarias, el informe de agencia y el CRM pueden ser coherentes internamente y medir porciones distintas de la realidad. El coste aparece cuando el presupuesto depende de una base que nadie consigue conciliar.",
    problems: [
      ["La paradoja de Meta", "El píxel informa de 340 conversiones. El CRM registra 180. Cada equipo defiende su propio límite de captura."],
      ["El cubo Direct", "Las visitas condicionadas por consentimiento pierden contexto de adquisición y campañas productivas reaparecen como Direct o none."],
      ["El bucle de conciliación", "Marketing, finanzas y agencia gastan otros 90 minutos alineando totales en vez de mover presupuesto."],
    ],
    definitionTag: "Qué es Sealmetrics",
    definitionLead: "Una plataforma para analítica con datos completos.",
    definitionBefore: "Sealmetrics es una ",
    cookieless: "plataforma de analítica web sin cookies ni consentimiento",
    definitionMiddle: " para eCommerce que mide el tráfico sin depender del consentimiento y atribuye ingresos mediante ",
    lastClick: "last-click sobre el conjunto de datos completo",
    definitionAfter: ". Diseñada para el RGPD desde la arquitectura (autoevaluación) y alojada exclusivamente en la UE.",
    definitionCaveat:
      "La afirmación útil no es “más datos” de forma aislada. Es un total que puedes comparar con los ingresos del backend, bajo un modelo de atribución que tu equipo sabe nombrar.",
    definitionAction: "Reserva una revisión de medición",
    definitionPricing: "Consulta precios",
    definitionEraBefore: "El cambio de arquitectura detrás de esa afirmación — dato sin modelar, sin dependencia del consentimiento, con una salida que un agente de IA puede leer — está explicado en ",
    definitionEraLink: "analítica web moderna",
    definitionEraAfter: ".",
    layersTag: "Cuatro capas · una cadena de evidencia",
    layersTitle: <>De la primera señal a<br /><em>una decisión defendible.</em></>,
    layersBody:
      "Cada capa utiliza los mismos inputs definidos. Así desaparece el punto donde captura, atribución y reporting suelen empezar a contar historias distintas.",
    layers: [
      ["01", "Captura", "Medición agregada sin cookies", "Observa eventos elegibles sin cookies analíticas, identificadores persistentes ni fingerprinting."],
      ["02", "Atribuye", "Ingresos bajo un modelo declarado", "Conecta resultados registrados con canal, campaña y creatividad mediante last-click sobre datos completos."],
      ["03", "Entiende", "Informes y LENS AI", "Revisa nueve superficies de reporting o pregunta a métricas definidas en lenguaje natural."],
      ["04", "Activa", "API, MCP y BigQuery", "Lleva la misma evidencia a tu warehouse, BI y flujos de IA supervisados."],
    ],
    featureTag: "El producto, de verdad",
    featureTitle: <>No es otro dashboard.<br /><em>Es un circuito de evidencia más corto.</em></>,
    featureBody:
      "La interfaz se organiza alrededor de las decisiones que un equipo eCommerce debe tomar ahora: qué canal merece presupuesto, dónde pierde el embudo y si los ingresos reportados cuadran con la tienda.",
    attributionTitle: "Atribución de ingresos que declara sus supuestos.",
    attributionBody:
      "Los totales por canal, campaña, ad set y creatividad usan last-click sobre eventos agregados observados. No hace falta un perfil individual para ordenar resultados registrados.",
    lensTitle: "LENS responde contra métricas definidas.",
    lensBody:
      "Pregunta por qué se movieron los ingresos, qué productos pierden valor o qué cambió ayer. Revisa la métrica y la fuente antes de que la respuesta mueva inversión.",
    apiTitle: "Tus datos salen por puertas documentadas.",
    apiBody:
      "Usa la API REST, export nativo a BigQuery, webhooks o el servidor MCP. LENS puede funcionar con tu propia clave de modelo; Private AI gestionada está disponible según plan.",
    reportsTag: "Nueve informes core",
    reportsTitle: <>Cada informe utiliza<br /><em>los mismos inputs.</em></>,
    reportsBody:
      "Fuentes, páginas, embudos e ingresos no viven en productos separados. LENS se sitúa sobre esas superficies como asistente, no como una décima fuente de verdad inventada.",
    proofTag: "Evidencia publicada por clientes",
    proofTitle: <>El producto debe superar<br /><em>una comparación real.</em></>,
    proofBody:
      "Palladium Hotel Group y Dreamplace Hotels compararon Sealmetrics con su medición anterior y publicaron las cifras resultantes.",
    palladiumStats: [
      ["40%", "del tráfico entrante no tenía atribución"],
      ["35%", "de las reservas en GA4 no tenían canal asignado"],
      ["+165%", "Coste por Búsqueda en Display en DV360 después"],
    ],
    dreamStats: [
      ["+30%", "más tráfico medido que Google Analytics"],
      ["15–20%", "de brecha de atribución contra el CRM, cerrada"],
    ],
    palladiumQuote: "Los datos que da Sealmetrics son agnósticos, no están sesgados y son neutrales. No hay caja negra.",
    dreamQuote: "Es la herramienta que nos da el dato real — y con la que tomamos decisiones.",
    caseLink: "Lee el caso completo",
    integrationsTag: "Conectores directos e interfaces abiertas",
    integrationsTitle: <>Conserva el stack.<br /><em>Sustituye la evidencia que falta.</em></>,
    integrationsBody:
      "Empieza con un conector de comercio nativo cuando exista o implementa el contrato de eventos documentado. Mantén GA4 durante la comparación y cambia el stack sólo cuando el backend confirme el resultado.",
    integrationsLink: "Ver todas las integraciones",
    finalTag: "Una prueba justa del producto",
    finalTitle: <>No confíes en la página de producto.<br /><em>Confía en la conciliación.</em></>,
    finalBody:
      "Ejecuta Sealmetrics junto al stack actual, define los mismos eventos y compara ambos totales con los ingresos que registró tu tienda.",
    finalPrimary: "Reserva una revisión de medición",
    finalSecondary: "Empieza la prueba de 14 días",
    finalProof: "Conserva tu stack · compara el mismo periodo · decide con evidencia del backend",
    illustrative: "Datos ilustrativos · no es una cuenta real",
  },
} as const;

const integrations = ["Shopify", "WooCommerce", "Magento", "PrestaShop", "OpenCart", "WordPress", "Next.js", "React", "BigQuery", "MCP server", "REST API", "Webhooks"];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ProductSignal({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const prefix = locale === "es" ? "/es" : "";
  const glossaryCookieless = locale === "es" ? "/es/glossary/cookieless-analytics/" : "/glossary/cookieless-analytics/";
  const glossaryAttribution = locale === "es" ? "/es/glossary/revenue-attribution/" : "/glossary/last-click-attribution/";

  return (
    <div className="sig-product-page">
      <section className="sig-product-hero">
        <div className="sig-product-hero-copy">
          <nav className="sig-product-breadcrumbs" aria-label="Breadcrumb">
            <Link href={`${prefix}/`}>{t.home}</Link><span aria-hidden="true">/</span><span>{t.breadcrumb}</span>
          </nav>
          <p className="sig-product-eyebrow"><span>{t.eyebrow}</span></p>
          <h1>{t.heroLine1}<br />{t.heroLine2}<br /><em>{t.heroOutline}</em></h1>
          <p className="sig-product-hero-body">{t.heroBody}</p>
          <div data-md="skip" className="sig-product-hero-actions">
            <a className="sig-product-button sig-product-button-acid" href="#architecture">{t.heroLink} <Arrow /></a>
            <Link className="sig-product-text-link" href={`${prefix}/how-it-works/`}>{t.howLink} <span aria-hidden="true">→</span></Link>
          </div>
          <p className="sig-product-micro">{t.heroProof}</p>
        </div>

        <div className="sig-product-board" aria-label={t.boardTop}>
          <div className="sig-product-module-top"><span>{t.boardTop}</span><span className="sig-product-live"><i />{t.boardLive}</span></div>
          <div className="sig-product-layer-list">
            {t.boardLayers.map(([number, label, state]) => (
              <div key={number}>
                <span>{number}</span><strong>{label}</strong><b>{state}</b>
              </div>
            ))}
          </div>
          <div className="sig-product-board-foot">{t.boardFoot}</div>
        </div>
      </section>

      <SignalAnswer label={pillarAnswerLabel[locale]}>{productAnswer[locale]}</SignalAnswer>

      <section className="sig-product-problem">
        <div className="sig-product-section-head">
          <div><p className="sig-product-tag">{t.problemTag}</p><h2>{t.problemTitle}</h2></div>
          <p>{t.problemBody}</p>
        </div>
        <div className="sig-product-problem-grid">
          {t.problems.map(([title, body], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>
          ))}
        </div>
      </section>

      <section className="sig-product-definition">
        <div><p className="sig-product-tag sig-product-tag-light">{t.definitionTag}</p><h2>{t.definitionLead}</h2></div>
        <div>
          <p className="sig-product-definition-lead">
            {t.definitionBefore}<Link href={glossaryCookieless}>{t.cookieless}</Link>{t.definitionMiddle}<Link href={glossaryAttribution}>{t.lastClick}</Link>{t.definitionAfter}
          </p>
          <p>{t.definitionCaveat}</p>
          {/* /modern-analytics/ had no inbound link from anywhere on the site. */}
          <p>
            {t.definitionEraBefore}
            <Link href={`${prefix}/modern-analytics/`}>{t.definitionEraLink}</Link>
            {t.definitionEraAfter}
          </p>
          <div data-md="skip" className="sig-product-definition-actions">
            <Link className="sig-product-button sig-product-button-acid" href={`${prefix}/demo/`}>{t.definitionAction} <Arrow /></Link>
            <Link className="sig-product-dark-link" href={`${prefix}/pricing/`}>{t.definitionPricing} <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="sig-product-layers" id="architecture">
        <div className="sig-product-section-head">
          <div><p className="sig-product-tag">{t.layersTag}</p><h2>{t.layersTitle}</h2></div>
          <p>{t.layersBody}</p>
        </div>
        <div className="sig-product-layer-grid">
          {t.layers.map(([number, verb, title, body]) => (
            <article key={number}><span>{number} / {verb}</span><h3>{title}</h3><p>{body}</p></article>
          ))}
        </div>
      </section>

      <section className="sig-product-features">
        <div className="sig-product-section-head">
          <div><p className="sig-product-tag">{t.featureTag}</p><h2>{t.featureTitle}</h2></div>
          <p>{t.featureBody}</p>
        </div>
        <article className="sig-product-feature sig-product-feature-attribution">
          <div className="sig-product-feature-copy"><span>01 / ATTRIBUTION</span><h3>{t.attributionTitle}</h3><p>{t.attributionBody}</p></div>
          <div className="sig-product-attribution-board">
            <div className="sig-product-module-top"><span>REVENUE / LAST 30 DAYS</span><span>{t.illustrative}</span></div>
            {[["Organic", "€482K", 92], ["Meta Ads", "€331K", 64], ["Google Ads", "€248K", 48], ["Email", "€142K", 28], ["Direct", "€81K", 16]].map(([label, amount, width]) => (
              <div className="sig-product-bar" key={String(label)}><span>{label}</span><i><b style={{ width: `${width}%` }} /></i><strong>{amount}</strong></div>
            ))}
          </div>
        </article>

        <div className="sig-product-feature-grid">
          <article className="sig-product-feature-card sig-product-lens-card">
            <div className="sig-product-module-top"><span>02 / LENS AI</span><span>DEFINED METRICS</span></div>
            <h3>{t.lensTitle}</h3><p>{t.lensBody}</p>
            <div className="sig-product-question"><span>GROWTH</span><b>{locale === "es" ? "¿Qué productos pierden ingresos?" : "Which products are leaking revenue?"}</b><p>{locale === "es" ? "El 77% de los carritos de e-bike premium no convierte. Revisa financiación en producto." : "77% of premium e-bike carts do not convert. Review product-level financing."}</p></div>
            <div className="sig-product-question"><span>COST</span><b>{locale === "es" ? "¿Dónde se quema presupuesto?" : "Where is budget being burned?"}</b><p>{locale === "es" ? "DemandGen: 9.230 clics, 2 ventas. Contrasta el gasto con PMax_Catalog." : "DemandGen: 9,230 clicks, 2 sales. Compare the spend with PMax_Catalog."}</p></div>
            <small>{t.illustrative}</small>
          </article>
          <article className="sig-product-feature-card sig-product-api-card">
            <div className="sig-product-module-top"><span>03 / ACTIVATE</span><span>API · MCP · BIGQUERY</span></div>
            <h3>{t.apiTitle}</h3><p>{t.apiBody}</p>
            <pre aria-label="Illustrative API response"><code>{`GET /v1/revenue?group=channel\n\n200 OK\n{\n  "model": "last_click",\n  "rows": 1284210,\n  "sampled": false\n}`}</code></pre>
            <small>{t.illustrative}</small>
          </article>
        </div>
      </section>

      <section className="sig-product-reports">
        <div className="sig-product-section-head">
          <div><p className="sig-product-tag">{t.reportsTag}</p><h2>{t.reportsTitle}</h2></div>
          <p>{t.reportsBody}</p>
        </div>
        <div className="sig-product-report-grid">
          {reports[locale].map(([number, title, body]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>
          ))}
        </div>
      </section>

      <section className="sig-product-proof">
        <div className="sig-product-proof-copy"><p className="sig-product-tag sig-product-tag-light">{t.proofTag}</p><h2>{t.proofTitle}</h2><p>{t.proofBody}</p></div>
        <div className="sig-product-case-grid">
          <article>
            <span>PALLADIUM HOTEL GROUP</span>
            {t.palladiumStats.map(([number, label]) => <div className="sig-product-stat" key={number}><strong>{number}</strong><p>{label}</p></div>)}
            <blockquote>“{t.palladiumQuote}”</blockquote><cite>Toni Andújar · Digital & Direct Sales Director</cite>
            <Link href={`${prefix}/case-studies/palladium-hotel-group/`}>{t.caseLink} <Arrow /></Link>
          </article>
          <article>
            <span>DREAMPLACE HOTELS</span>
            {t.dreamStats.map(([number, label]) => <div className="sig-product-stat" key={number}><strong>{number}</strong><p>{label}</p></div>)}
            <blockquote>“{t.dreamQuote}”</blockquote><cite>Eduardo Martin · Analytics & Campaigns</cite>
            <Link href={`${prefix}/case-studies/dreamplace-hotels/`}>{t.caseLink} <Arrow /></Link>
          </article>
        </div>
      </section>

      <section className="sig-product-integrations">
        <div><p className="sig-product-tag">{t.integrationsTag}</p><h2>{t.integrationsTitle}</h2><p>{t.integrationsBody}</p><Link href={`${prefix}/integrations/`}>{t.integrationsLink} <Arrow /></Link></div>
        <div className="sig-product-integration-grid">{integrations.map((name) => <span key={name}>{name}</span>)}</div>
      </section>

      <section className="sig-product-final">
        <p className="sig-product-tag">{t.finalTag}</p><h2>{t.finalTitle}</h2><p>{t.finalBody}</p>
        <div data-md="skip"><Link className="sig-product-button sig-product-button-dark" href={`${prefix}/demo/`}>{t.finalPrimary} <Arrow /></Link><a className="sig-product-text-link" href="https://my.sealmetrics.com/register">{t.finalSecondary} <span aria-hidden="true">→</span></a></div>
        <small>{t.finalProof}</small>
      </section>
    </div>
  );
}
