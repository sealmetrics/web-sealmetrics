import Link from "next/link";
import { SignalAnswer } from "@/components/v4/SignalAnswer";
import { CopyParagraph } from "@/components/v4/CopyParagraph";
import type { WhyNoConsentContent } from "@/lib/content/why-no-consent";

/**
 * Native Signal (v4) page for "why can Sealmetrics measure without consent and
 * the others cannot". One component, one content object per language, so EN
 * and ES keep the same order: what changes → answer → the browser → the data
 * → the rule → the conditions → what you get → the install mistake → by
 * country → for legal → 30 days → FAQ → what we do not say → final.
 *
 * The two browser drawings are inline SVG in line style (CLAUDE.md: icons are
 * SVG line style only), square corners, and every label is real text so the
 * Markdown twin and screen readers read the same thing a sighted reader sees.
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

function Mark({ kind, children }: { kind: "no" | "ok" | "mid"; children: React.ReactNode }) {
  return <span className={`sig-wnc-mark sig-wnc-mark-${kind}`}>{children}</span>;
}

function BrowserCookie({ t, domain }: { t: WhyNoConsentContent["browser"]["cookie"]; domain: string }) {
  return (
    <svg className="sig-wnc-drawing" viewBox="0 0 440 250" role="img" aria-label={t.verdict}>
      <rect x="10" y="10" width="420" height="230" fill="none" stroke="currentColor" />
      <line x1="10" y1="40" x2="430" y2="40" stroke="currentColor" />
      <circle cx="28" cy="25" r="4" fill="none" stroke="currentColor" />
      <circle cx="44" cy="25" r="4" fill="none" stroke="currentColor" />
      <circle cx="60" cy="25" r="4" fill="none" stroke="currentColor" />
      <text x="90" y="29" className="sig-wnc-svg-mono">{domain}</text>
      <text x="30" y="66" className="sig-wnc-svg-mono">{t.storage.toUpperCase()}</text>
      <rect x="30" y="76" width="250" height="112" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="44" y="102" className="sig-wnc-svg-mono sig-wnc-svg-strong">{t.cookieLine}</text>
      <text x="44" y="126" className="sig-wnc-svg-text">{t.lines[0]}</text>
      <text x="44" y="148" className="sig-wnc-svg-text">{t.lines[1]}</text>
      <text x="44" y="170" className="sig-wnc-svg-text">{t.lines[2]}</text>
      <line x1="280" y1="132" x2="326" y2="132" stroke="currentColor" strokeWidth="1.5" />
      <polyline points="318,126 326,132 318,138" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="334" y="98" width="86" height="70" fill="none" stroke="currentColor" strokeDasharray="4 3" />
      <text x="377" y="128" textAnchor="middle" className="sig-wnc-svg-small">{t.remote[0]}</text>
      <text x="377" y="146" textAnchor="middle" className="sig-wnc-svg-small">{t.remote[1]}</text>
      <rect x="30" y="200" width="390" height="30" fill="currentColor" />
      <text x="44" y="219" className="sig-wnc-svg-text sig-wnc-svg-inverse">{t.banner}</text>
      <rect x="332" y="206" width="78" height="18" fill="#cbff3d" />
      <text x="371" y="219" textAnchor="middle" className="sig-wnc-svg-small sig-wnc-svg-ink">{t.accept}</text>
    </svg>
  );
}

function BrowserSeal({ t, domain }: { t: WhyNoConsentContent["browser"]["seal"]; domain: string }) {
  return (
    <svg className="sig-wnc-drawing" viewBox="0 0 440 250" role="img" aria-label={t.verdict}>
      <rect x="10" y="10" width="420" height="230" fill="none" stroke="currentColor" />
      <line x1="10" y1="40" x2="430" y2="40" stroke="currentColor" />
      <circle cx="28" cy="25" r="4" fill="none" stroke="currentColor" />
      <circle cx="44" cy="25" r="4" fill="none" stroke="currentColor" />
      <circle cx="60" cy="25" r="4" fill="none" stroke="currentColor" />
      <text x="90" y="29" className="sig-wnc-svg-mono">{domain}</text>
      <text x="30" y="66" className="sig-wnc-svg-mono">{t.storage.toUpperCase()}</text>
      <rect x="30" y="76" width="250" height="112" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 5" />
      <text x="155" y="128" textAnchor="middle" className="sig-wnc-svg-strong">{t.empty}</text>
      <text x="155" y="150" textAnchor="middle" className="sig-wnc-svg-small">{t.emptyNote}</text>
      <line x1="280" y1="132" x2="326" y2="132" stroke="currentColor" strokeWidth="1.5" />
      <polyline points="318,126 326,132 318,138" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="334" y="98" width="86" height="70" fill="#cbff3d" stroke="currentColor" />
      <text x="377" y="128" textAnchor="middle" className="sig-wnc-svg-small sig-wnc-svg-ink">{t.remote[0]}</text>
      <text x="377" y="146" textAnchor="middle" className="sig-wnc-svg-small sig-wnc-svg-ink">{t.remote[1]}</text>
      <rect x="30" y="200" width="390" height="30" fill="none" stroke="currentColor" strokeDasharray="4 4" />
      <text x="225" y="219" textAnchor="middle" className="sig-wnc-svg-small">{t.banner}</text>
    </svg>
  );
}

export function WhyNoConsentSignal({ content: t }: { content: WhyNoConsentContent }) {
  return (
    <main className="sig-wnc-page">
      <section className="sig-wnc-hero">
        <div>
          <nav className="sig-wnc-breadcrumbs" aria-label="Breadcrumb">
            {t.breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className="sig-wnc-crumb">
                {index > 0 && <span aria-hidden="true">/</span>}
                {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
              </span>
            ))}
          </nav>
          <p className="sig-wnc-eyebrow"><span>{t.eyebrow}</span></p>
          <h1>{t.h1}</h1>
          <p className="sig-wnc-hero-body">{t.heroBody}</p>
          <div data-md="skip" className="sig-wnc-actions">
            <CtaLink className="sig-wnc-button sig-wnc-button-acid" href={t.heroPrimary.href}>{t.heroPrimary.label}<Arrow /></CtaLink>
            <CtaLink className="sig-wnc-text-link" href={t.heroSecondary.href}>{t.heroSecondary.label} <Arrow /></CtaLink>
          </div>
          <p className="sig-wnc-micro">{t.heroMicro}</p>
          <p className="sig-wnc-byline">
            {t.byline.byLabel} <Link href={t.byline.authorHref}>{t.byline.authorName}</Link> · {t.byline.dateLabel}{" "}
            <time dateTime={t.byline.date}>{t.byline.dateDisplay}</time>
          </p>
        </div>
        <aside className="sig-wnc-frame" aria-label={t.frame.title}>
          <p className="sig-wnc-frame-title">{t.frame.title}</p>
          <div className="sig-wnc-frame-row">
            <span>{t.frame.stays.tag}</span>
            <strong>{t.frame.stays.title}</strong>
            <p>{t.frame.stays.body}</p>
          </div>
          <div className="sig-wnc-frame-row sig-wnc-frame-row-acid">
            <span>{t.frame.changes.tag}</span>
            <strong>{t.frame.changes.title}</strong>
            <p>{t.frame.changes.body}</p>
          </div>
        </aside>
      </section>

      <SignalAnswer label={t.answerLabel}>{t.answer}</SignalAnswer>

      {/* 1 / 4 — in the browser */}
      <section className="sig-wnc-section">
        <div className="sig-wnc-head"><div><p className="sig-wnc-tag">{t.browser.tag}</p><h2>{t.browser.title}</h2></div><p>{t.browser.body}</p></div>
        <div className="sig-wnc-pair">
          <article className="sig-wnc-panel">
            <p className="sig-wnc-panel-label">{t.browser.cookie.label}</p>
            <BrowserCookie t={t.browser.cookie} domain={t.browser.domain} />
            <p className="sig-wnc-verdict"><Mark kind="no">—</Mark>{t.browser.cookie.verdict}</p>
          </article>
          <article className="sig-wnc-panel sig-wnc-panel-acid">
            <p className="sig-wnc-panel-label">{t.browser.seal.label}</p>
            <BrowserSeal t={t.browser.seal} domain={t.browser.domain} />
            <p className="sig-wnc-verdict"><Mark kind="ok">—</Mark>{t.browser.seal.verdict}</p>
          </article>
        </div>
      </section>

      {/* 2 / 4 — the data */}
      <section className="sig-wnc-section sig-wnc-section-white">
        <div className="sig-wnc-head"><div><p className="sig-wnc-tag">{t.pipeline.tag}</p><h2>{t.pipeline.title}</h2></div><p>{t.pipeline.body}</p></div>
        <ol className="sig-wnc-steps">
          {t.pipeline.steps.map((step) => (
            <li key={step.code} className={step.highlight ? undefined : "sig-wnc-step-last"}>
              <span>{step.code}</span>
              <h3>{step.title}</h3>
              <p>{step.lines.join(" ")}</p>
              {step.highlight && <p className="sig-wnc-step-highlight">{step.highlight.join(" ")}</p>}
            </li>
          ))}
        </ol>
        <div className="sig-wnc-retention">
          <p className="sig-wnc-retention-label">{t.pipeline.retentionLabel}</p>
          <dl>
            {t.pipeline.retention.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3 / 4 — the rule */}
      <section className="sig-wnc-section">
        <div className="sig-wnc-head"><div><p className="sig-wnc-tag">{t.rule.tag}</p><h2>{t.rule.title}</h2></div><p>{t.rule.body}</p></div>
        <div className="sig-wnc-ladder">
          <div className="sig-wnc-lrow sig-wnc-lhead" aria-hidden="true">
            <div></div>
            <div className="sig-wnc-lcol-head">{t.rule.colA}</div>
            <div className="sig-wnc-lcol-head">{t.rule.colB}</div>
          </div>
          {t.rule.questions.map((q) => (
            <div key={q.label} className="sig-wnc-lrow">
              <div className="sig-wnc-lq"><span className="sig-wnc-mini">{q.label}</span><h3>{q.question}</h3><p>{q.note}</p></div>
              <div className={`sig-wnc-la sig-wnc-la-${q.a.mark}`}><span className="sig-wnc-mini">{t.rule.colA}</span><strong>{q.a.title}</strong><p>{q.a.body}</p></div>
              <div className={`sig-wnc-la sig-wnc-la-${q.b.mark}`}><span className="sig-wnc-mini">{t.rule.colB}</span><strong>{q.b.title}</strong><p>{q.b.body}</p></div>
            </div>
          ))}
          <div className="sig-wnc-lrow sig-wnc-lres">
            <div className="sig-wnc-lq"><span className="sig-wnc-mini">{t.rule.resultLabel}</span></div>
            <div className="sig-wnc-la sig-wnc-la-no sig-wnc-la-res"><span className="sig-wnc-mini">{t.rule.colA}</span><strong>{t.rule.resultA.title}</strong><p>{t.rule.resultA.body}</p></div>
            <div className="sig-wnc-la sig-wnc-la-ok sig-wnc-la-res"><span className="sig-wnc-mini">{t.rule.colB}</span><strong>{t.rule.resultB.title}</strong><p>{t.rule.resultB.body}</p></div>
          </div>
        </div>
      </section>

      {/* 4 / 4 — the conditions */}
      <section className="sig-wnc-section sig-wnc-section-white">
        <div className="sig-wnc-head"><div><p className="sig-wnc-tag">{t.checklist.tag}</p><h2>{t.checklist.title}</h2></div><p>{t.checklist.body}</p></div>
        <div className="sig-wnc-table-wrap">
          <table>
            <thead><tr>{t.checklist.headers.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>
              {t.checklist.rows.map((row) => (
                <tr key={row.condition}>
                  <th scope="row">{row.condition}{row.note && <small>{row.note}</small>}</th>
                  <td><Mark kind={row.aMark}>{row.a}</Mark></td>
                  <td><Mark kind={row.bMark}>{row.b}</Mark></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* what you have and what you do not */}
      <section className="sig-wnc-section">
        <div className="sig-wnc-head"><div><p className="sig-wnc-tag">{t.scope.tag}</p><h2>{t.scope.title}</h2></div><p>{t.scope.body}</p></div>
        <div className="sig-wnc-pair">
          <article className="sig-wnc-panel sig-wnc-panel-acid">
            <h3>{t.scope.yes.title}</h3>
            <ul className="sig-wnc-list">{t.scope.yes.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </article>
          <article className="sig-wnc-panel">
            <h3>{t.scope.no.title}</h3>
            <ul className="sig-wnc-list">{t.scope.no.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      {/* the installation mistake */}
      <section className="sig-wnc-section sig-wnc-section-ink">
        <div className="sig-wnc-head"><div><p className="sig-wnc-tag sig-wnc-tag-light">{t.install.tag}</p><h2>{t.install.title}</h2></div><p>{t.install.body}</p></div>
        <div className="sig-wnc-pair">
          <article className="sig-wnc-code">
            <p className="sig-wnc-panel-label">{t.install.bad.label}</p>
            <pre><code>{t.install.bad.code}</code></pre>
            <p className="sig-wnc-verdict"><Mark kind="no">—</Mark>{t.install.bad.verdict}</p>
          </article>
          <article className="sig-wnc-code">
            <p className="sig-wnc-panel-label">{t.install.good.label}</p>
            <pre><code>{t.install.good.code}</code></pre>
            <p className="sig-wnc-verdict"><Mark kind="ok">—</Mark>{t.install.good.verdict}</p>
          </article>
        </div>
      </section>

      {/* by country */}
      <section className="sig-wnc-section">
        <div className="sig-wnc-head"><div><p className="sig-wnc-tag">{t.countries.tag}</p><h2>{t.countries.title}</h2></div><p>{t.countries.body}</p></div>
        <div className="sig-wnc-table-wrap">
          <table>
            <thead><tr>{t.countries.headers.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>
              {t.countries.rows.map((row) => (
                <tr key={row.country}>
                  <th scope="row">{row.country}</th>
                  <td>{row.authority}</td>
                  <td><Mark kind={row.statusMark}>{row.status}</Mark></td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* for legal */}
      <section className="sig-wnc-section sig-wnc-section-white">
        <div className="sig-wnc-head"><div><p className="sig-wnc-tag">{t.legal.tag}</p><h2>{t.legal.title}</h2></div><p>{t.legal.body}</p></div>
        <div className="sig-wnc-pair">
          <CopyParagraph title={t.legal.dpo.title} text={t.legal.dpo.text} copyLabel={t.legal.copyLabel} copiedLabel={t.legal.copiedLabel} />
          <CopyParagraph title={t.legal.policy.title} text={t.legal.policy.text} copyLabel={t.legal.copyLabel} copiedLabel={t.legal.copiedLabel} />
        </div>
        <ul className="sig-wnc-list sig-wnc-list-wide">
          <li>{t.legal.give}</li>
          <li>{t.legal.yours}</li>
        </ul>
      </section>

      {/* 30 days */}
      <section className="sig-wnc-section">
        <div className="sig-wnc-head"><div><p className="sig-wnc-tag">{t.trial.tag}</p><h2>{t.trial.title}</h2></div><p>{t.trial.body}</p></div>
        <ol className="sig-wnc-steps sig-wnc-steps-four">
          {t.trial.steps.map((step) => (
            <li key={step.when}><span>{step.when}</span><h3>{step.title}</h3><p>{step.body}</p></li>
          ))}
        </ol>
        <article className="sig-wnc-proof">
          <p className="sig-wnc-mini">{t.trial.proof.eyebrow}</p>
          <strong>{t.trial.proof.value}</strong>
          <p>{t.trial.proof.body}</p>
          <Link className="sig-wnc-text-link" href={t.trial.proof.href}>{t.trial.proof.readCase} <Arrow /></Link>
        </article>
      </section>

      {/* FAQ, plain and visible: the answers feed faqPageSchema */}
      <section className="sig-wnc-section sig-wnc-section-white" aria-labelledby="wnc-faq-heading">
        <div className="sig-wnc-head sig-wnc-head-single"><div><p className="sig-wnc-tag">{t.faqTag}</p><h2 id="wnc-faq-heading">{t.faqTitle}</h2></div></div>
        <div className="sig-wnc-faq">
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
        <aside className="sig-wnc-notsaid">
          <p className="sig-wnc-mini">{t.notSaid.title}</p>
          <p>{t.notSaid.body}</p>
        </aside>
      </section>

      <section className="sig-wnc-final">
        <p className="sig-wnc-tag">{t.final.tag}</p>
        <h2>{t.final.title}</h2>
        <p>{t.final.body}</p>
        <div data-md="skip" className="sig-wnc-actions">
          <CtaLink className="sig-wnc-button sig-wnc-button-dark" href={t.final.primary.href}>{t.final.primary.label}<Arrow /></CtaLink>
          <CtaLink className="sig-wnc-text-link" href={t.final.secondary.href}>{t.final.secondary.label} <Arrow /></CtaLink>
        </div>
      </section>
    </main>
  );
}
