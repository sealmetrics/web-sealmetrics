import Link from "next/link";
import { BrandCheck } from "@/components/brand-check/BrandCheck";

type Locale = "en" | "es";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * The static frame of /what-ai-says and /es/que-dicen-las-ia. Everything that
 * changes with the brand is inside <BrandCheck>, a client component; this part
 * is what search engines and the Markdown twin see, so it explains the method
 * and its limits in full rather than leaning on the live result.
 *
 * The two languages are written separately, not translated: the Spanish page
 * says «las IA», which is how people say it, and the English one does not try
 * to reproduce the construction.
 */
const copy = {
  en: {
    home: "Home",
    breadcrumb: "What AIs say",
    eyebrow: "Free · no signup · live",
    h1: (
      <>
        What do AIs say <em>about…?</em>
      </>
    ),
    subline: "A company, a brand or a team. Not a person: this is about organisations.",
    howTag: "How it works",
    howTitle: (
      <>
        Two questions,
        <br />
        <em>every model at once.</em>
      </>
    ),
    how: [
      [
        "01",
        "Two questions",
        "What the brand is, and whether the model would recommend it to someone about to buy. The same two questions go to every model at the same time, and almost all of them answer from memory, not from what they find that day. The exception is Perplexity, which searches the web before it answers and cites where it looked: it is in the panel because that is what people who ask it actually see.",
      ],
      [
        "02",
        "A judge that is not a person",
        "Another model reads each pair of answers and files it as correct, partial, confused with someone else, or no answer. Nobody checks it by hand, and every result says so underneath.",
      ],
      [
        "03",
        "One result per brand",
        "Each result is public and has its own address, so you can link to it. If someone asked about the same brand in the last seven days you see that run, and after thirty days it is deleted.",
      ],
    ],
    limitsTag: "What it is not",
    limits: [
      "Not what ChatGPT answers with browsing on. That is a live search result, not the model's memory, and it moves for other reasons.",
      "Not a score. Every figure says how many models it comes from, because a number without its denominator is one nobody can check.",
      "Not a ranking. It counts, in one run, how many models know the brand, confuse it or recommend it, and says exactly that.",
    ],
    reportPrefix: "Not the full report either. This asks two questions; ",
    reportLink: "the AI brand monitoring report",
    reportSuffix: " asks six, sets you against your competitors and arrives by email.",
    finalTitle: (
      <>
        Two questions give you a snapshot.
        <br />
        <em>Six give you the report.</em>
      </>
    ),
    finalBody:
      "The full report also asks what the models praise and criticise, how they read your sector, who they put in your place and how they compare you with a competitor. Every answer arrives whole, with the corrections worth making at the source.",
    finalCta: "Request the full report",
    finalSecondary: "See what Sealmetrics measures",
  },
  es: {
    home: "Inicio",
    breadcrumb: "Qué dicen las IA",
    eyebrow: "Gratis · sin registro · en directo",
    h1: (
      <>
        ¿Qué dicen las IA <em>de…?</em>
      </>
    ),
    subline: "Una empresa, una marca o un equipo. Personas no: esto va de organizaciones.",
    howTag: "Cómo funciona",
    howTitle: (
      <>
        Dos preguntas,
        <br />
        <em>todos los modelos a la vez.</em>
      </>
    ),
    how: [
      [
        "01",
        "Dos preguntas",
        "Qué es la marca y si la recomendaría a alguien que está a punto de comprar. Las mismas dos preguntas van a todos los modelos a la vez, y casi todos contestan de memoria, no con lo que encuentran ese día. La excepción es Perplexity, que busca en la web antes de responder y dice de dónde lo saca: está en el panel porque es lo que ve quien le pregunta a él.",
      ],
      [
        "02",
        "Un juez que no es una persona",
        "Otro modelo lee cada par de respuestas y lo clasifica: correcta, parcial, la confunde con otra, o sin respuesta. Nadie lo revisa a mano, y cada resultado lo dice debajo.",
      ],
      [
        "03",
        "Un resultado por marca",
        "Cada resultado es público y tiene su propia dirección, para que puedas enlazarlo. Si alguien preguntó por la misma marca en los últimos siete días, ves esa consulta; a los treinta días se borra.",
      ],
    ],
    limitsTag: "Qué no es",
    limits: [
      "No es lo que contesta ChatGPT con la búsqueda activada. Eso es un resultado de búsqueda en directo, no la memoria del modelo, y se mueve por otros motivos.",
      "No es una puntuación. Cada cifra dice de cuántos modelos sale, porque un número sin su denominador es un número que nadie puede comprobar.",
      "No es un ranking. Cuenta, en una sola consulta, cuántos modelos conocen la marca, la confunden o la recomiendan, y dice justo eso.",
    ],
    reportPrefix: "Tampoco es el informe completo. Aquí van dos preguntas; ",
    reportLink: "el informe de monitorización de marca en IA",
    reportSuffix: " hace seis, te compara con tus competidores y te llega por correo.",
    finalTitle: (
      <>
        Dos preguntas dan una foto.
        <br />
        <em>Seis dan el informe.</em>
      </>
    ),
    finalBody:
      "El informe completo pregunta también qué valoran y qué critican de ti, cómo leen tu sector, a quién ponen en tu lugar y cómo te comparan con un competidor. Cada respuesta llega entera, con las correcciones que merece la pena hacer en origen.",
    finalCta: "Pide el informe completo",
    finalSecondary: "Mira qué mide Sealmetrics",
  },
} as const;

export function WhatAiSaysPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const prefix = locale === "es" ? "/es" : "";
  return (
    <div className="sig-brand-page sig-check-page">
      <section className="sig-brand-hero sig-check-hero">
        <nav className="sig-brand-breadcrumbs" aria-label="Breadcrumb">
          <Link href={`${prefix}/`}>{t.home}</Link>
          <span>/</span>
          <span>{t.breadcrumb}</span>
        </nav>
        <p className="sig-brand-eyebrow">
          <span>{t.eyebrow}</span>
        </p>
        <h1>{t.h1}</h1>
        <p className="sig-brand-hero-body">{t.subline}</p>
      </section>

      <section className="sig-check-live" data-md="skip">
        <BrandCheck locale={locale} />
      </section>

      <section className="sig-brand-measures sig-check-how">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag sig-brand-tag-light">{t.howTag}</p>
            <h2>{t.howTitle}</h2>
          </div>
        </div>
        <div className="sig-brand-measure-grid sig-check-how-grid">
          {t.how.map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sig-brand-limits">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag">{t.limitsTag}</p>
          </div>
        </div>
        <ul className="sig-brand-limit-list">
          {t.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
          <li>
            {t.reportPrefix}
            <Link className="sig-check-inline-link" href={`${prefix}/ai-brand-monitoring/`}>
              {t.reportLink}
            </Link>
            {t.reportSuffix}
          </li>
        </ul>
      </section>

      <section className="sig-brand-final">
        <h2>{t.finalTitle}</h2>
        <p>{t.finalBody}</p>
        <div data-md="skip" className="sig-brand-actions">
          <Link className="sig-brand-button" href={`${prefix}/ai-brand-monitoring/#request`}>
            {t.finalCta}
            <Arrow />
          </Link>
          <Link className="sig-brand-text-link" href={`${prefix}/product/`}>
            {t.finalSecondary} <Arrow />
          </Link>
        </div>
      </section>
    </div>
  );
}
