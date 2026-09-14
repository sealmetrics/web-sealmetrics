import Link from "next/link";
import { getCaseStudy } from "@/lib/content/case-studies";

type Locale = "en" | "es";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * The share of visits GA4 recorded but could not attribute to an origin anyone
 * can act on. Read out of the Incapto case study's own evidence rather than
 * restated here: the figure has exactly one home, and a page that looks it up
 * cannot drift from the case it cites. If the block is ever restructured the
 * lookup returns null and the sentence disappears — it never invents a number.
 */
function unknownOriginShare(study: ReturnType<typeof getCaseStudy>): string | null {
  const block = study.evidence?.find((item) => item.number === "05");
  if (!block || block.kind !== "bars") return null;
  return block.rows.find((row) => row.tone === "warn")?.display ?? null;
}

const copy = {
  en: {
    home: "Home",
    parent: "AI brand monitoring",
    breadcrumb: "Thank you",
    eyebrow: "Request received",
    h1: (
      <>
        Fifteen models are
        <br />
        <em>answering right now.</em>
      </>
    ),
    heroBody:
      "Your report is being written while you read this: six questions, fifteen models, every answer kept whole. It arrives by email in about five minutes, as a page you can open, keep and forward. Keep an eye on your inbox — and on the spam folder, if five minutes pass and nothing has landed.",
    productTag: "Meet Sealmetrics",
    productTitle: (
      <>
        Consentless Analytics.
        <br />
        <em>Visits counted, no banner.</em>
      </>
    ),
    productBody:
      "While the models think, here is what we do the rest of the time. Sealmetrics is web analytics for companies that lost their numbers to the consent banner: it records the visit without cookies, without a banner and without personal data, so the traffic a consent-gated stack never sees stays readable, attributable and good enough to decide on.",
    productCards: [
      [
        "01",
        "No cookie, nothing to consent to",
        "Nothing is written to the visitor's device, so there is no permission to ask for and nothing to lose when permission is refused.",
      ],
      [
        "02",
        "Source and medium intact",
        "The visits a consent-gated tool drops come back with their origin attached, which is the part a budget decision actually runs on.",
      ],
      [
        "03",
        "Designed for GDPR",
        "No personal data, no cross-site identifier, EU-hosted in Dublin, DPA included. It is built into the design, not a setting — our self-assessment, not a certification.",
      ],
    ],
    caseTag: "Measured side by side",
    caseTitle: (
      <>
        An online store ran both tools
        <br />
        <em>over the same 48 days.</em>
      </>
    ),
    caseBody:
      "Incapto sells specialty coffee from a Shopify store. It left GA4 where it was, put Sealmetrics beside it and reconciled both against the orders the store had actually taken — the one number neither tool produces.",
    caseOriginBefore: "And of the visits GA4 did record, ",
    caseOriginAfter: " arrived with no origin anyone could decide on.",
    caseLink: "Read the Incapto case",
    finalTitle: (
      <>
        The report says what models believe.
        <br />
        <em>We measure what visitors do.</em>
      </>
    ),
    finalBody:
      "One tells you how your company gets described when nobody is looking. The other tells you what happened after somebody clicked. Different questions, and both worth an answer.",
    finalPrimary: "Book a demo",
    finalSecondary: "See what Sealmetrics measures",
  },
  es: {
    home: "Inicio",
    parent: "Monitorización de marca en IA",
    breadcrumb: "Gracias",
    eyebrow: "Solicitud recibida",
    h1: (
      <>
        Quince modelos están
        <br />
        <em>contestando ahora mismo.</em>
      </>
    ),
    heroBody:
      "Tu informe se está escribiendo mientras lees esto: seis preguntas, quince modelos y cada respuesta entera. Llega por correo en unos cinco minutos, como una página que puedes abrir, guardar y reenviar. No pierdas de vista tu bandeja de entrada — ni la carpeta de spam, si pasan cinco minutos y no ha aparecido nada.",
    productTag: "Conoce Sealmetrics",
    productTitle: (
      <>
        Consentless Analytics.
        <br />
        <em>Visitas contadas, sin banner.</em>
      </>
    ),
    productBody:
      "Mientras los modelos piensan, esto es lo que hacemos el resto del tiempo. Sealmetrics es analítica web para empresas que perdieron sus números en el banner de consentimiento: registra la visita sin cookies, sin banner y sin datos personales, así que el tráfico que una analítica sujeta a consentimiento no llega a ver sigue siendo legible, atribuible y suficiente para decidir.",
    productCards: [
      [
        "01",
        "Sin cookie, nada que consentir",
        "No se escribe nada en el dispositivo de quien visita, así que no hay permiso que pedir ni nada que perder cuando ese permiso se deniega.",
      ],
      [
        "02",
        "Con el origen intacto",
        "Las visitas que una herramienta sujeta a consentimiento descarta vuelven con su source y su medium, que es justo la parte sobre la que se decide un presupuesto.",
      ],
      [
        "03",
        "Diseñada para el RGPD",
        "Sin datos personales, sin identificador entre sitios, alojado en la UE en Dublín y con el DPA incluido. Va en el diseño, no en una casilla — es nuestra autoevaluación, no una certificación.",
      ],
    ],
    caseTag: "Medido en paralelo",
    caseTitle: (
      <>
        Una tienda online las comparó
        <br />
        <em>durante 48 días.</em>
      </>
    ),
    caseBody:
      "Incapto vende café de especialidad desde una tienda de Shopify. Dejó GA4 donde estaba, puso Sealmetrics al lado y contrastó las dos contra los pedidos que la tienda había hecho de verdad — el único número que no produce ninguna de las dos.",
    caseOriginBefore: "Y de las visitas que GA4 sí registró, el ",
    caseOriginAfter: " llegaba sin un origen con el que se pudiera decidir nada.",
    caseLink: "Lee el caso Incapto",
    finalTitle: (
      <>
        El informe dice qué creen los modelos.
        <br />
        <em>Nosotros medimos qué hace la gente.</em>
      </>
    ),
    finalBody:
      "Uno te cuenta cómo describen tu empresa cuando nadie mira. El otro, qué pasó después de que alguien hiciera clic. Son preguntas distintas y las dos merecen respuesta.",
    finalPrimary: "Pide una demo",
    finalSecondary: "Mira qué mide Sealmetrics",
  },
} as const;

export function BrandReportThankYou({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const prefix = locale === "es" ? "/es" : "";
  // Every figure below comes from the case study itself — see CLAUDE.md: a
  // published client number lives in `case-studies.tsx` and is referenced, not
  // retyped, so the two can never disagree.
  const incapto = getCaseStudy("incapto", locale);
  const unknownOrigin = unknownOriginShare(incapto);

  return (
    <main className="sig-brand-page">
      <section className="sig-brand-hero">
        <nav className="sig-brand-breadcrumbs" aria-label="Breadcrumb">
          <Link href={`${prefix}/`}>{t.home}</Link>
          <span>/</span>
          <Link href={`${prefix}/ai-brand-monitoring/`}>{t.parent}</Link>
          <span>/</span>
          <span>{t.breadcrumb}</span>
        </nav>
        <p className="sig-brand-eyebrow">
          <span>{t.eyebrow}</span>
        </p>
        <h1>{t.h1}</h1>
        <p className="sig-brand-hero-body">{t.heroBody}</p>
      </section>

      <section className="sig-brand-measures">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag">{t.productTag}</p>
            <h2>{t.productTitle}</h2>
          </div>
          <p>{t.productBody}</p>
        </div>
        <div className="sig-brand-measure-grid">
          {t.productCards.map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sig-brand-own">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag sig-brand-tag-light">{t.caseTag}</p>
            <h2>{t.caseTitle}</h2>
          </div>
          <p>
            {t.caseBody}
            {unknownOrigin ? (
              <>
                {" "}
                {t.caseOriginBefore}
                <strong>{unknownOrigin}</strong>
                {t.caseOriginAfter}
              </>
            ) : null}
          </p>
        </div>
        <div className="sig-brand-stat-grid">
          {incapto.metrics.map((metric) => (
            <article key={metric.label}>
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
            </article>
          ))}
        </div>
        <p className="sig-brand-case-link">
          <Link className="sig-brand-text-link" href={`${prefix}/case-studies/incapto/`}>
            {t.caseLink} <Arrow />
          </Link>
        </p>
      </section>

      <section className="sig-brand-final">
        <h2>{t.finalTitle}</h2>
        <p>{t.finalBody}</p>
        <div data-md="skip" className="sig-brand-actions">
          <Link className="sig-brand-button" href={`${prefix}/demo/`}>
            {t.finalPrimary}
            <Arrow />
          </Link>
          <Link className="sig-brand-text-link" href={`${prefix}/product/`}>
            {t.finalSecondary} <Arrow />
          </Link>
        </div>
      </section>
    </main>
  );
}
