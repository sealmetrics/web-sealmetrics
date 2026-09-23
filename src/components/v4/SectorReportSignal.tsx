import type { ReactNode } from "react";
import Link from "next/link";
import { BrandReportForm } from "@/components/forms/BrandReportForm";
import { StudyDownloadForm } from "@/components/forms/StudyDownloadForm";
import type { SectorReport } from "@/lib/content/sector-reports";

/*
 * A sector study: what the models recommend when someone asks for a product in a
 * category without naming any brand. It reuses the brand-monitoring page's skin
 * (`sig-brand-*`) so the study and the report request read as one product, and adds
 * only what a study needs: the per-question bars, the brand-against-booking contrast
 * and the error list. Spanish only for now; the copy lives in the page that renders it.
 */

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export type SectorCopy = {
  breadcrumb: string;
  eyebrow: string;
  h1: ReactNode;
  heroBody: string;
  /**
   * The full study (summary plus every literal answer), sent by email: the page never
   * links the PDF, it asks for an address and n8n sends it (`study_download`).
   */
  download?: { label: string; meta: string; title: ReactNode; body: string };
  stats: [string, string][];
  contrastTag: string;
  contrastTitle: ReactNode;
  contrastBody: string;
  contrastHeads: [string, string, string];
  questionsTag: string;
  questionsTitle: ReactNode;
  questionsBody: string;
  errorsTag: string;
  errorsTitle: ReactNode;
  errorsBody: string;
  formTag: string;
  formTitle: ReactNode;
  formBody: string;
  formFoot: string;
  limitsTag: string;
  limitsTitle: ReactNode;
  limits: string[];
  /** Published client cases, with their approved figures only (see CLAUDE.md). */
  proof?: {
    tag: string;
    title: ReactNode;
    body: string;
    quote: { text: string; cite: string };
    figures: { value: string; label: string; client: string; href: string }[];
    readCase: string;
  };
  finalTitle: ReactNode;
  finalBody: string;
  finalCta: string;
  finalSecondary: string;
};

export function SectorReportSignal({ report, t }: { report: SectorReport; t: SectorCopy }) {
  return (
    <main className="sig-brand-page">
      <section className="sig-brand-hero">
        <nav className="sig-brand-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/es/">Inicio</Link>
          <span>/</span>
          <Link href="/es/ai-brand-monitoring/">Monitorización de marca en IA</Link>
          <span>/</span>
          <span>{t.breadcrumb}</span>
        </nav>
        <p className="sig-brand-eyebrow">
          <span>{t.eyebrow}</span>
        </p>
        <h1>{t.h1}</h1>
        <p className="sig-brand-hero-body">{t.heroBody}</p>
        {t.download ? (
          <p className="sig-sector-download">
            <a className="sig-brand-button" href="#descarga">
              {t.download.label}
              <Arrow />
            </a>
            <span>{t.download.meta}</span>
          </p>
        ) : null}
      </section>

      <section className="sig-brand-own">
        <div className="sig-brand-stat-grid">
          {t.stats.map(([figure, label]) => (
            <article key={label}>
              <strong>{figure}</strong>
              <p>{label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sig-brand-measures">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag">{t.contrastTag}</p>
            <h2>{t.contrastTitle}</h2>
          </div>
          <p>{t.contrastBody}</p>
        </div>
        <table className="sig-sector-contrast">
          <thead>
            <tr>
              {t.contrastHeads.map((head) => (
                <th key={head} scope="col">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {report.contrast.map((row) => (
              <tr key={row.name}>
                <th scope="row">{row.name}</th>
                <td>{row.asChain}</td>
                <td>{row.asHotel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="sig-brand-after">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag sig-brand-tag-light">{t.questionsTag}</p>
            <h2>{t.questionsTitle}</h2>
          </div>
          <p>{t.questionsBody}</p>
        </div>
        <div className="sig-sector-questions">
          {report.questions.map((q) => (
            <article key={q.id}>
              <h3>{q.label}</h3>
              <p className="sig-sector-prompt">«{q.prompt}»</p>
              <ol className="sig-sector-bars">
                {q.bars.map((bar) => (
                  <li key={bar.name}>
                    <span className="sig-sector-bar-name">
                      {bar.name}
                      {bar.note ? <small> · {bar.note}</small> : null}
                    </span>
                    <span className="sig-sector-bar-track" aria-hidden="true">
                      <span style={{ width: `${(bar.count / q.answered) * 100}%` }} />
                    </span>
                    <span className="sig-sector-bar-count">
                      {bar.count} / {q.answered}
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="sig-brand-measures">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag">{t.errorsTag}</p>
            <h2>{t.errorsTitle}</h2>
          </div>
          <p>{t.errorsBody}</p>
        </div>
        <div className="sig-brand-measure-grid">
          {report.errors.map((error) => (
            <article key={error.claim}>
              <span>{error.model}</span>
              <h3>{error.claim}</h3>
              <p>{error.fact}</p>
            </article>
          ))}
        </div>
      </section>

      {t.download ? (
        <section className="sig-brand-after" id="descarga">
          <div className="sig-brand-section-head">
            <div>
              <p className="sig-brand-tag sig-brand-tag-light">{t.download.meta}</p>
              <h2>{t.download.title}</h2>
            </div>
            <p>{t.download.body}</p>
          </div>
          <div className="sig-brand-request">
            <div className="sig-brand-module-top">
              <span>{t.download.label}</span>
              <span>Gratis · en tu correo en un minuto</span>
            </div>
            <StudyDownloadForm study={report.slug} />
          </div>
        </section>
      ) : null}

      <section className="sig-brand-own" id="tu-hotel">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag">{t.formTag}</p>
            <h2>{t.formTitle}</h2>
          </div>
          <p>{t.formBody}</p>
        </div>
        <div className="sig-brand-request">
          <div className="sig-brand-module-top">
            <span>Pide el informe de tu hotel o tu cadena</span>
            <span>{t.formFoot}</span>
          </div>
          <BrandReportForm locale="es" />
        </div>
      </section>

      <section className="sig-brand-limits">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag">{t.limitsTag}</p>
            <h2>{t.limitsTitle}</h2>
          </div>
        </div>
        <ul className="sig-brand-limit-list">
          {t.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
        {t.download ? (
          <p className="sig-sector-download sig-sector-download-dark">
            <a className="sig-brand-text-link" href="#descarga">
              {t.download.label} <Arrow />
            </a>
            <span>{t.download.meta}</span>
          </p>
        ) : null}
      </section>

      {t.proof ? (
        <section className="sig-brand-own sig-sector-proof">
          <div className="sig-brand-section-head">
            <div>
              <p className="sig-brand-tag">{t.proof.tag}</p>
              <h2>{t.proof.title}</h2>
            </div>
            <p>{t.proof.body}</p>
          </div>
          <blockquote className="sig-sector-quote">
            <p>&ldquo;{t.proof.quote.text}&rdquo;</p>
            <cite>{t.proof.quote.cite}</cite>
          </blockquote>
          <div className="sig-brand-stat-grid">
            {t.proof.figures.map((figure) => (
              <article key={figure.label}>
                <strong>{figure.value}</strong>
                <p>{figure.label}</p>
                <Link className="sig-brand-text-link sig-sector-case-link" href={figure.href}>
                  {figure.client} · {t.proof!.readCase} <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="sig-brand-final">
        <h2>{t.finalTitle}</h2>
        <p>{t.finalBody}</p>
        <div data-md="skip" className="sig-brand-actions">
          <Link className="sig-brand-button" href="/es/demo/">
            {t.finalCta}
            <Arrow />
          </Link>
          <Link className="sig-brand-text-link" href="/es/ai-analytics/">
            {t.finalSecondary} <Arrow />
          </Link>
        </div>
      </section>
    </main>
  );
}
