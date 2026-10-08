import Link from "next/link";
import { getCaseStudy } from "@/lib/content/case-studies";

type Locale = "en" | "es";

function Check() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

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
    received: "Request received.",
    h1Sub: (
      <>
        Nineteen models are <em>answering right now.</em>
      </>
    ),
    status: [
      ["01", "Request received", "Done"],
      ["02", "19 models answering", "Now"],
      ["03", "Report in your inbox", "~5 min"],
    ],
    heroBody:
      "Your report is being written while you read this: six questions, nineteen models, every answer kept whole. It arrives by email in about five minutes, as a page you can open, keep and forward. Keep an eye on your inbox — and on the spam folder, if five minutes pass and nothing has landed.",
    productTag: "While you wait · Consentless Analytics",
    productTitle: (
      <>
        Your analytics is missing
        <br />
        <em>the visits you paid for.</em>
      </>
    ),
    productBody:
      "In our experience with clients, between 40% and 60% of traffic doesn't accept cookies, and of those who do, 40% don't accept on the first pageview. Those visitors still clicked the ads, still read the pages, still bought. Sealmetrics counts them without cookies, without a banner and without personal data — next to the GA4 you already have, so you can compare both on your own traffic.",
    productCards: [
      [
        "01",
        "See the traffic the banner hides",
        "Nothing is written to the visitor's device, so there is no permission to ask for and nothing to lose when it is refused.",
      ],
      [
        "02",
        "Know which channel really sells",
        "The visits a consent-gated tool drops come back with source and medium attached — the part a budget decision actually runs on.",
      ],
      [
        "03",
        "Designed for GDPR, hosted in Dublin",
        "No data that identifies anyone, no cross-site identifier, DPA included. Built into the design — our self-assessment, not a certification.",
      ],
    ],
    offerTag: "Free account",
    offerValue: "1,000,000 events · €0",
    offerBody:
      "No time limit and no card. When the millionth event is used — in a week or in a year — you choose a plan. Until then, nothing is charged.",
    offerPoints: ["No credit card", "Live in 5 to 30 minutes", "Keep GA4 running"],
    offerCta: "Open my free account",
    offerSecondary: "See pricing",
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
    received: "Solicitud recibida.",
    h1Sub: (
      <>
        Diecinueve modelos están <em>contestando ahora mismo.</em>
      </>
    ),
    status: [
      ["01", "Solicitud recibida", "Hecho"],
      ["02", "19 modelos contestando", "Ahora"],
      ["03", "Informe en tu correo", "~5 min"],
    ],
    heroBody:
      "Tu informe se está escribiendo mientras lees esto: seis preguntas, diecinueve modelos y cada respuesta entera. Llega por correo en unos cinco minutos, como una página que puedes abrir, guardar y reenviar. No pierdas de vista tu bandeja de entrada — ni la carpeta de spam, si pasan cinco minutos y no ha aparecido nada.",
    productTag: "Mientras esperas · Consentless Analytics",
    productTitle: (
      <>
        A tu analítica le faltan
        <br />
        <em>las visitas que pagaste.</em>
      </>
    ),
    productBody:
      "En nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies, y de quienes las aceptan, el 40% no lo hace en la primera página vista. Esas personas hicieron clic en tus anuncios, leyeron tus páginas y compraron igual. Sealmetrics las cuenta sin cookies, sin banner y sin datos que identifiquen a nadie — en paralelo al GA4 que ya tienes, para que compares las dos con tu propio tráfico.",
    productCards: [
      [
        "01",
        "Ve el tráfico que el banner esconde",
        "No se escribe nada en el dispositivo de quien visita, así que no hay permiso que pedir ni nada que perder cuando se deniega.",
      ],
      [
        "02",
        "Sabe qué canal vende de verdad",
        "Las visitas que una herramienta sujeta a consentimiento descarta vuelven con su source y su medium — justo la parte sobre la que se decide un presupuesto.",
      ],
      [
        "03",
        "Diseñada para el RGPD, alojada en Dublín",
        "Ningún dato que identifique a nadie, sin identificador entre sitios y con el DPA incluido. Va en el diseño — es nuestra autoevaluación, no una certificación.",
      ],
    ],
    offerTag: "Cuenta gratis",
    offerValue: "1.000.000 de eventos · 0 €",
    offerBody:
      "Sin límite de tiempo y sin tarjeta. Cuando se gaste el millón de eventos — tarde una semana o un año — eliges un plan. Hasta entonces, no se cobra nada.",
    offerPoints: ["Sin tarjeta", "En tu web en 5 a 30 minutos", "Te quedas con GA4"],
    offerCta: "Abrir mi cuenta gratis",
    offerSecondary: "Ver precios",
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
      <section className="sig-brand-hero sig-brand-hero-received">
        <nav className="sig-brand-breadcrumbs" aria-label="Breadcrumb">
          <Link href={`${prefix}/`}>{t.home}</Link>
          <span>/</span>
          <Link href={`${prefix}/ai-brand-monitoring/`}>{t.parent}</Link>
          <span>/</span>
          <span>{t.breadcrumb}</span>
        </nav>
        <h1 className="sig-brand-received">
          <span className="sig-brand-received-title">
            <span className="sig-brand-received-check">
              <Check />
            </span>
            {t.received}
          </span>
          <span className="sig-brand-received-sub">{t.h1Sub}</span>
        </h1>
        <ol className="sig-brand-status">
          {t.status.map(([number, label, state]) => (
            <li key={number}>
              <span>{number}</span>
              <strong>{label}</strong>
              <em>{state}</em>
            </li>
          ))}
        </ol>
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
        <div className="sig-brand-offer">
          <div>
            <p className="sig-brand-offer-tag">{t.offerTag}</p>
            <p className="sig-brand-offer-value">{t.offerValue}</p>
            <p className="sig-brand-offer-body">{t.offerBody}</p>
            <ul>
              {t.offerPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div data-md="skip" className="sig-brand-offer-actions">
            <Link className="sig-brand-offer-button" href={locale === "es" ? "/es/cuenta-gratis/" : "/free-account/"}>
              {t.offerCta}
              <Arrow />
            </Link>
            <Link className="sig-brand-offer-link" href={`${prefix}/pricing/`}>
              {t.offerSecondary} <Arrow />
            </Link>
          </div>
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
