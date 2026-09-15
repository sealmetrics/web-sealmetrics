import Link from "next/link";
import { SignalAnswer } from "@/components/v4/SignalAnswer";
import type { PromptLibraryContent } from "@/lib/content/mcp-prompts";

/**
 * Signal (v4) layout for the MCP prompt library. It borrows the problem-landing
 * shells (hero, section heads, limits, FAQ, final) so the page reads as part of
 * the same family, and adds one block of its own: prompt cards with the prompt
 * as copyable text, the tools it calls and the question it cannot answer.
 *
 * Each card carries a short ID (A1, B2…) that the copy refers to. The IDs are
 * derived from the group order, so reordering a group renumbers its cards.
 */

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function CtaLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return href.startsWith("/") ? (
    <Link className={className} href={href}>{children}</Link>
  ) : (
    <a className={className} href={href}>{children}</a>
  );
}

export function PromptLibrarySignal({ content: t }: { content: PromptLibraryContent }) {
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

      <section className="sig-problem-method">
        <div className="sig-problem-section-head"><div><p className="sig-problem-tag">{t.use.tag}</p><h2>{t.use.title}</h2></div><p>{t.use.body}</p></div>
        <ol className="sig-problem-steps sig-prompt-use">
          {t.use.steps.map((step, index) => (
            <li key={step.name}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.name}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {t.groups.map((group) => {
        const letter = group.id.slice(-1).toUpperCase();
        return (
          <section key={group.id} className="sig-problem-examples sig-prompt-group" id={group.id}>
            <div className="sig-problem-section-head"><div><p className="sig-problem-tag">{group.tag}</p><h2>{group.title}</h2></div><p>{group.body}</p></div>
            <div className="sig-problem-example-grid sig-prompt-grid">
              {group.items.map((item, index) => {
                const id = `${letter}${index + 1}`;
                return (
                  <article key={item.title} id={id.toLowerCase()}>
                    <p className="sig-prompt-id">{id}</p>
                    <h3>{item.title}</h3>
                    <p><strong>{t.labels.when}:</strong> {item.when}</p>
                    <pre><code>{item.prompt}</code></pre>
                    <p><strong>{t.labels.tools}:</strong> <code>{item.tools}</code></p>
                    <p><strong>{t.labels.limit}:</strong> {item.limit}</p>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="sig-problem-limits">
        <div className="sig-problem-section-head"><div><p className="sig-problem-tag">{t.limits.tag}</p><h2>{t.limits.title}</h2></div><p>{t.limits.body}</p></div>
        <div className="sig-problem-limit-grid">
          {t.limits.items.map(([title, body]) => <article key={title}><h3>— {title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="sig-problem-faq" aria-labelledby="prompt-faq-heading">
        <div className="sig-problem-section-head sig-problem-section-head-single"><div><p className="sig-problem-tag">{t.faqTag}</p><h2 id="prompt-faq-heading">{t.faqTitle}</h2></div></div>
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
