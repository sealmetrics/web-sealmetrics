import Link from "next/link";
import { SignalAnswer } from "@/components/v4/SignalAnswer";
import type { ProblemLandingContent } from "@/lib/content/problem-landings/types";

/**
 * Native Signal (v4) template for problem landings — pages a buyer reaches
 * through the problem they have rather than a feature list. One component, one
 * content file per problem, so every landing keeps the same order:
 * pain → answer → why it happens → cost → method → roles → proof → limits → FAQ.
 *
 * The FAQ is deliberately not an accordion (see FaqSection): the answers are
 * the most citable passages on the page and stay in the flow as plain text.
 */

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function isInternal(href: string) {
  return href.startsWith("/");
}

function CtaLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return isInternal(href) ? (
    <Link className={className} href={href}>{children}</Link>
  ) : (
    <a className={className} href={href}>{children}</a>
  );
}

export function ProblemLandingSignal({ content: t }: { content: ProblemLandingContent }) {
  return (
    <main className="sig-problem-page">
      <section className="sig-problem-hero">
        <div>
          <nav className="sig-problem-breadcrumbs" aria-label="Breadcrumb">
            {t.breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className="sig-problem-crumb">
                {index > 0 && <span aria-hidden="true">/</span>}
                {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
              </span>
            ))}
          </nav>
          <p className="sig-problem-eyebrow"><span>{t.eyebrow}</span></p>
          <h1>{t.h1}</h1>
          <p className="sig-problem-hero-body">{t.heroBody}</p>
          <div data-md="skip" className="sig-problem-actions">
            <CtaLink className="sig-problem-button sig-problem-button-acid" href={t.heroPrimary.href}>{t.heroPrimary.label}<Arrow /></CtaLink>
            <CtaLink className="sig-problem-text-link" href={t.heroSecondary.href}>{t.heroSecondary.label} <Arrow /></CtaLink>
          </div>
          <p className="sig-problem-micro">{t.heroMicro}</p>
          {t.byline && (
            <p className="sig-problem-byline">
              {t.byline.byLabel} <Link href={t.byline.authorHref}>{t.byline.authorName}</Link> · {t.byline.updatedLabel}{" "}
              <time dateTime={t.byline.date}>{t.byline.dateDisplay}</time>
            </p>
          )}
        </div>
        <aside className="sig-problem-module" aria-label={t.module.title}>
          <div className="sig-problem-module-top"><span>{t.module.title}</span><span>{t.module.status}</span></div>
          {t.module.rows.map(([label, value], index) => (
            <div key={label} className="sig-problem-module-row"><span>0{index + 1}</span><strong>{label}</strong><b>{value}</b></div>
          ))}
          <p>{t.module.foot}</p>
        </aside>
      </section>

      <SignalAnswer label={t.answerLabel}>{t.answer}</SignalAnswer>

      <section className="sig-problem-divergence">
        <div className="sig-problem-section-head"><div><p className="sig-problem-tag">{t.divergence.tag}</p><h2>{t.divergence.title}</h2></div><p>{t.divergence.body}</p></div>
        <div className="sig-problem-table-wrap">
          <table>
            <thead><tr>{t.divergence.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead>
            <tbody>{t.divergence.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="sig-problem-note">{t.divergence.note}</p>
      </section>

      <section className="sig-problem-costs">
        <div className="sig-problem-section-head"><div><p className="sig-problem-tag sig-problem-tag-light">{t.costs.tag}</p><h2>{t.costs.title}</h2></div><p>{t.costs.body}</p></div>
        <div className="sig-problem-cost-grid">
          {t.costs.items.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="sig-problem-method" id={t.method.id}>
        <div className="sig-problem-section-head"><div><p className="sig-problem-tag">{t.method.tag}</p><h2>{t.method.title}</h2></div><p>{t.method.body}</p></div>
        <ol className="sig-problem-steps">
          {t.method.steps.map((step, index) => (
            <li key={step.name} id={`step-${index + 1}`}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.name}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {t.examples && (
        <section className="sig-problem-examples" id="examples">
          <div className="sig-problem-section-head"><div><p className="sig-problem-tag">{t.examples.tag}</p><h2>{t.examples.title}</h2></div><p>{t.examples.body}</p></div>
          <div className="sig-problem-example-grid">
            {t.examples.items.map((item) => (
              <article key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <pre><code>{item.code}</code></pre>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="sig-problem-roles">
        <div className="sig-problem-section-head"><div><p className="sig-problem-tag">{t.roles.tag}</p><h2>{t.roles.title}</h2></div><p>{t.roles.body}</p></div>
        <div className="sig-problem-role-grid">
          {t.roles.items.map((item) => (
            <article key={item.role}>
              <h3>{item.role}</h3>
              <p className="sig-problem-role-need">{item.need}</p>
              <p>{item.how}</p>
              <Link className="sig-problem-text-link" href={item.link.href}>{item.link.label} <Arrow /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="sig-problem-proof">
        <div>
          <p className="sig-problem-tag sig-problem-tag-light">{t.proof.tag}</p>
          {t.proof.quote && (
            <blockquote>
              <p>&ldquo;{t.proof.quote.text}&rdquo;</p>
              <cite>{t.proof.quote.cite}</cite>
            </blockquote>
          )}
          <p className="sig-problem-proof-body">{t.proof.body}</p>
        </div>
        <div className="sig-problem-figures">
          {t.proof.figures.map((figure) => (
            <article key={figure.client}>
              <strong>{figure.value}</strong>
              <p>{figure.label}</p>
              <div><span>{figure.client}</span><Link href={figure.href}>{t.proof.readCase} <Arrow /></Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="sig-problem-limits">
        <div className="sig-problem-section-head"><div><p className="sig-problem-tag">{t.limits.tag}</p><h2>{t.limits.title}</h2></div><p>{t.limits.body}</p></div>
        <div className="sig-problem-limit-grid">
          {t.limits.items.map(([title, body]) => <article key={title}><h3>— {title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="sig-problem-faq" aria-labelledby="problem-faq-heading">
        <div className="sig-problem-section-head sig-problem-section-head-single"><div><p className="sig-problem-tag">{t.faqTag}</p><h2 id="problem-faq-heading">{t.faqTitle}</h2></div></div>
        <div className="sig-problem-faq-list">
          {t.faq.map((item, index) => (
            <div key={item.question}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.question}</h3>
                <p data-speakable className="faq-answer">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sig-problem-final">
        <p className="sig-problem-tag">{t.final.tag}</p>
        <h2>{t.final.title}</h2>
        <p>{t.final.body}</p>
        <div data-md="skip" className="sig-problem-actions">
          <CtaLink className="sig-problem-button sig-problem-button-dark" href={t.final.primary.href}>{t.final.primary.label}<Arrow /></CtaLink>
          <CtaLink className="sig-problem-text-link" href={t.final.secondary.href}>{t.final.secondary.label} <Arrow /></CtaLink>
        </div>
      </section>
    </main>
  );
}
