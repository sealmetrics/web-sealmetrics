import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqSection } from "@/components/ui/FaqSection";
import { breadcrumbSchema, faqPageSchema, organizationSchema } from "@/lib/schema";
import { getCaseStudy } from "@/lib/content/case-studies";
import { CLIENT_LOGOS } from "@/components/sections/v3/ClientLogos";
import {
  AGENTIC_CODEX_CONFIG, AGENTIC_EXTENSION, AGENTIC_GUIDE, CHANNEL_LOSS, CHATGPT_CONNECTOR_LIVE,
  freeAccountLanding, type AssistantGuide, type FreeAccountLocale,
} from "@/lib/content/free-account-landing";
import { FreeAccountPrompt } from "./FreeAccountPrompt";
import { CopyCommand } from "./CopyCommand";
import { LandingEvents } from "./LandingEvents";
import "./reality-landing.css";
import "./free-account-landing.css";

/* ============================================================
   COLD PAID-TRAFFIC LANDING · Q4 2026
   One decision on the page: open the free Agentic account from Claude.
   The logo does not link out and there is no site navigation: on paid
   traffic every exit is a leak. Case-study links stay because they are
   the evidence the pitch rests on.
   ============================================================ */

function Arrow() { return <span aria-hidden="true">↗</span>; }
function Cta({ children, href = "#start", event = "lp_cta_click", external = false }: { children: React.ReactNode; href?: string; event?: string; external?: boolean }) {
  return <a className="reality-button" href={href} data-lp-event={event} rel={external ? "noopener" : undefined}>{children}<Arrow /></a>;
}
function Title({ start, end }: { start: string; end: string }) {
  return <h2>{start}<br /><em>{end}</em></h2>;
}

export function FreeAccountLanding({ locale }: { locale: FreeAccountLocale }) {
  const t = freeAccountLanding[locale];
  const prefix = locale === "es" ? "/es" : "";
  const landing = locale === "es" ? "cuenta-gratis" : "free-account";
  const incapto = getCaseStudy("incapto", locale);
  const dreamplace = getCaseStudy("dreamplace-hotels", locale);
  const palladium = getCaseStudy("palladium-hotel-group", locale);
  const number = new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-GB");
  const faqs = t.faqs.map(item => ({ ...item }));
  const chartLabel = CHANNEL_LOSS.map(row => `${t.chart.channels[row.key]} ${"paid" in row ? t.chart.paidDisplay : row.display}`).join(", ");

  return <div className="reality-page fa-page">
    <LandingEvents landing={landing} />
    <JsonLd data={organizationSchema()} />
    <JsonLd data={breadcrumbSchema([{ name: t.nav.start, url: t.route }], locale)} />
    <JsonLd data={faqPageSchema(faqs, t.route)} />

    <header className="reality-header">
      <div className="reality-wrap reality-header-inner">
        <Image src="/logos/logo-sealmetrics.svg" width={168} height={30} alt="Sealmetrics" priority unoptimized />
        <nav aria-label={t.nav.onPage}>
          <a href="#evidence">{t.nav.evidence}</a><a href="#black-friday">{t.nav.offer}</a><a href="#start">{t.nav.start}</a>
          <Link href={t.otherRoute} hrefLang={locale === "es" ? "en" : "es"} className="reality-language">{t.otherLanguage}</Link>
        </nav>
        <div data-md="skip"><Cta>{t.cta}</Cta></div>
      </div>
    </header>

    <main id="main-content">
      <section className="reality-hero">
        <div className="reality-wrap">
          <div className="reality-hero-grid">
            <div className="reality-hero-copy">
              <p className="reality-tag">{t.eyebrow}</p>
              <h1>{t.h1Start}<br /><em>{t.h1End}</em></h1>
              <p className="reality-lead">{t.lead}</p>
              <div data-md="skip" className="reality-actions"><Cta>{t.cta}</Cta></div>
              <p className="reality-free"><strong>{t.free}</strong></p>
              <ul className="fa-promise">{t.promise.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <figure className="reality-board fa-board">
              <div className="reality-board-top reality-mono"><span>{t.chart.tag}</span><span>CASE FILE / 04</span></div>
              <figcaption><strong>{t.chart.title}</strong><span>{t.chart.subtitle}</span></figcaption>
              <div className="fa-channels" role="img" aria-label={`${t.chart.subtitle}: ${chartLabel}`}>
                {CHANNEL_LOSS.map(row => {
                  const paid = "paid" in row;
                  const from = "rangeFrom" in row ? row.rangeFrom : undefined;
                  return <div className={`fa-channel${paid ? " is-paid" : ""}`} key={row.key}>
                    <span className="fa-channel-name">{t.chart.channels[row.key]}</span>
                    <div className="fa-channel-bar">
                      <i style={{ width: `${from ?? row.percent}%` }} />
                      {from !== undefined && <b style={{ left: `${from}%`, width: `${row.percent - from}%` }} />}
                    </div>
                    <span className="fa-channel-value">{paid ? t.chart.paidDisplay : row.display}</span>
                  </div>;
                })}
              </div>
              <p className="fa-board-meaning">{t.chart.meaning}</p>
              <p className="reality-board-foot reality-mono">{t.chart.foot}</p>
            </figure>
          </div>
          <div className="fa-stats">
            {t.stats.map(s => <article key={s.label}><strong>{s.value}</strong><p>{s.label}</p><span className="reality-mono">{s.note}</span></article>)}
          </div>
        </div>
      </section>

      <section className="fa-challenge"><div className="reality-wrap"><p className="reality-kicker">{t.challenge.tag}</p><blockquote><p>{t.challenge.body}</p><cite>{t.challenge.sign}</cite></blockquote></div></section>

      <div className="reality-trust"><div className="reality-wrap reality-trust-inner"><p className="reality-mono">{t.trust}</p><div className="reality-client-logos">
        {CLIENT_LOGOS.map(logo => <div className="reality-client-logo" key={logo.alt}>
          <Image src={logo.src} width={220} height={logo.h ?? 40} style={{ height: logo.h ?? 40 }} alt={logo.alt} unoptimized />
        </div>)}
      </div></div></div>

      <section id="evidence" className="reality-section reality-proof"><div className="reality-wrap">
        <p className="reality-kicker">{t.evidence.tag}</p>
        <div className="reality-section-head"><Title start={t.evidence.start} end={t.evidence.end} /><p>{t.evidence.body}</p></div>
        <div className="reality-proof-grid">
          <div className="reality-reconcile"><span className="reality-mono">{t.evidence.reconcile}</span><div><article><strong>96<span>%</span></strong><p>{t.evidence.orders}</p></article><article><strong>97<span>%</span></strong><p>{t.evidence.revenue}</p></article></div><span className="reality-mono">{t.evidence.period}</span></div>
          <div className="reality-visits"><h3>{t.evidence.visits}</h3><div className="reality-visit-row"><span>GA4</span><b>{number.format(157844)}</b><div><i style={{ width: "71%" }} /></div></div><div className="reality-visit-row is-seal"><span>Sealmetrics</span><b>{number.format(222345)}</b><div><i style={{ width: "100%" }} /></div></div><p><strong>{number.format(64501)}</strong> {t.evidence.moreVisits}</p><span>{t.evidence.visitsBody}</span></div>
        </div>
        <blockquote className="reality-quote"><p>“{incapto.quote}”</p><cite>{incapto.person}<span>{incapto.role} · Incapto</span></cite></blockquote>
        <div className="reality-proof-bottom"><Link className="reality-text-link" href={`${prefix}/case-studies/incapto/`}>{t.evidence.proofLink}<Arrow /></Link><p>{t.evidence.note}</p></div>
        <div className="reality-client-grid fa-clients">{[
          { data: dreamplace, metric: t.evidence.dreamMetric, label: t.evidence.dreamLabel, body: t.evidence.dreamBody, slug: "dreamplace-hotels" },
          { data: palladium, metric: t.evidence.palladiumMetric, label: t.evidence.palladiumLabel, body: t.evidence.palladiumBody, slug: "palladium-hotel-group" },
        ].map(c => <article key={c.slug}><div className="reality-client-top"><Image src={c.data.logo} width={180} height={54} alt={c.data.client} unoptimized /><span className="reality-mono">CASE FILE</span></div><strong className="reality-client-metric">{c.metric}</strong><h3>{c.label}</h3><p>{c.body}</p><blockquote>“{c.data.secondQuote ?? c.data.quote}”<cite>{c.data.person} · {c.data.client}</cite></blockquote><Link className="reality-text-link" href={`${prefix}/case-studies/${c.slug}/`}>{t.evidence.clientLink}<Arrow /></Link></article>)}</div>
        <div className="fa-stories"><p className="reality-mono">{t.evidence.storiesTag}</p>{t.evidence.stories.map(story => <Link key={story.slug} className="fa-story" href={`${prefix}/case-studies/${story.slug}/`} data-lp-event="lp_case_click"><strong>{story.title}</strong><Arrow /></Link>)}</div>
      </div></section>

      <section className="reality-section reality-benefits"><div className="reality-wrap">
        <p className="reality-kicker">{t.attribution.tag}</p>
        <div className="reality-section-head"><Title start={t.attribution.start} end={t.attribution.end} /><p>{t.attribution.body}</p></div>
        <div className="reality-benefit-grid">{t.attribution.items.map(([title, body], i) => <article key={title}>
          <div className={`reality-glyph reality-glyph-${i}`} aria-hidden="true">{[0, 1, 2, 3].map(n => <i key={n} />)}</div>
          <h3>{title}</h3><p>{body}</p>
        </article>)}</div>
        <p className="fa-boundary">{t.attribution.boundary}</p>
      </div></section>

      <section className="reality-section fa-offer"><div className="reality-wrap">
        <p className="reality-tag">{t.offer.tag}</p>
        <div className="reality-section-head"><Title start={t.offer.start} end={t.offer.end} /><p>{t.offer.body}</p></div>
        <div className="fa-stack">
          <p className="reality-mono fa-stack-tag">{t.offer.stackTag}</p>
          <ol>{t.offer.stack.map((row, i) => <li key={row.item}><span className="reality-step-number">0{i + 1}</span><div><strong>{row.item}</strong><p>{row.detail}</p></div><b className="fa-stack-value">{row.value}</b></li>)}</ol>
          <div className="fa-stack-total"><span className="reality-mono">{t.offer.totalLabel}</span><strong>{t.offer.price}</strong><p>{t.offer.totalNote}</p><div data-md="skip"><Cta>{t.cta}</Cta></div><b className="reality-mono">{t.offer.priceLabel}</b><small>{t.offer.eventNote}</small></div>
        </div>
        <div className="fa-offer-grid2">
          <article className="fa-reason"><p className="reality-kicker">{t.offer.reasonTag}</p><h3>{t.offer.reasonTitle}</h3><p>{t.offer.reasonBody}</p></article>
          <article className="fa-guarantee"><p className="reality-kicker">{t.offer.guaranteeTag}</p><h3>{t.offer.guaranteeTitle}</h3><p>{t.offer.guaranteeBody}</p></article>
        </div>
        <p className="fa-offer-note">{t.offer.note}</p>
      </div></section>

      <section className="reality-section fa-method"><div className="reality-wrap">
        <p className="reality-kicker">{t.method.tag}</p>
        <div className="reality-section-head"><Title start={t.method.start} end={t.method.end} /><p>{incapto.methodBody}</p></div>
        <div className="fa-method-grid">{incapto.steps.map(([n, title, body]) => <article key={n}><span className="reality-mono">{n}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        <p className="reality-mono fa-method-source">{t.method.source}</p>
      </div></section>

      <section id="black-friday" className="reality-section fa-promo"><div className="reality-wrap fa-promo-grid">
        <div><p className="reality-tag">{t.promo.tag}</p><Title start={t.promo.start} end={t.promo.end} /><p className="reality-lead">{t.promo.body}</p><ul className="fa-terms">{t.promo.terms.map(item => <li key={item}>— {item}</li>)}</ul></div>
        <div className="fa-promo-card">
          <span className="reality-mono">{t.promo.deadlineLabel}</span><strong>{t.promo.deadline}</strong>
          <span className="reality-mono">{t.promo.untilLabel}</span><strong className="is-until">{t.promo.until}</strong>
          <p className="fa-price-line">{t.promo.priceLine}</p>
          <div data-md="skip"><a className="reality-button reality-button-secondary" href={`${prefix}/pricing/`} data-lp-event="lp_pricing_click">{t.promo.cta}<Arrow /></a><br /><Link className="reality-text-link" href={`${prefix}/demo/`} data-lp-event="lp_demo_click">{t.promo.secondary}<Arrow /></Link></div>
        </div>
        <div className="fa-dates"><p className="reality-mono">{t.promo.datesTag}</p><div>{t.promo.dates.map(d => <article key={d.date}><span className="reality-mono">{d.label}</span><strong>{d.date}</strong><p>{d.body}</p></article>)}</div><p className="fa-dates-line">{t.promo.line}</p></div>
        <p className="fa-promo-note">{t.promo.note}</p>
      </div></section>

      <section id="start" className="reality-section reality-setup"><div className="reality-wrap">
        <p className="reality-kicker">{t.steps.tag}</p>
        <div className="reality-section-head"><Title start={t.steps.start} end={t.steps.end} /><p>{t.steps.intro}</p></div>
        <div className="reality-setup-grid">
          <ol>{t.steps.items.map(([title, body], i) => <li key={title}><span className="reality-step-number">0{i + 1}</span><div><h3>{title}</h3><p>{body}</p>
            {i === 0 && <div className="fa-code">
              <div className="fa-code-link" data-md="skip"><a className="reality-text-link" href={AGENTIC_EXTENSION} data-lp-event="lp_extension_download">{t.steps.downloadLabel}<Arrow /></a></div>
              <div><span>{t.steps.codexLabel}</span><pre><code>{AGENTIC_CODEX_CONFIG}</code></pre></div>
              <p>{t.steps.codexNote}</p>
            </div>}
          </div></li>)}</ol>
          <div>
            <FreeAccountPrompt prompt={t.steps.prompt} label={t.steps.promptLabel} copyLabel={t.steps.copy} copiedLabel={t.steps.copied} errorLabel={t.steps.copyError} landing={landing} />
            <p className="reality-setup-note">{t.steps.verify}</p>
            <p className="reality-guide">{t.steps.otherAssistant} <a href={AGENTIC_GUIDE}>{t.steps.guide}<Arrow /></a></p>
          </div>
        </div>
        <div className="fa-paths">
          <h3>{t.steps.pathsTitle}</h3>
          <div className="fa-paths-grid">{t.steps.paths.map(([title, body], i) => <article key={title}><span>{["a", "b", "c"][i]}</span><h4>{title}</h4><p>{body}</p></article>)}</div>
        </div>
      </div></section>

      <section id="assistants" className="reality-section fa-assistants"><div className="reality-wrap">
        <p className="reality-kicker">{t.onboarding.tag}</p>
        <div className="reality-section-head"><Title start={t.onboarding.start} end={t.onboarding.end} /><p>{t.onboarding.intro}</p></div>
        <div className="fa-assistant-list">
          {t.onboarding.assistants.map(guide => {
            const g: AssistantGuide = guide.name === "ChatGPT" && CHATGPT_CONNECTOR_LIVE ? t.onboarding.chatgptLive : guide;
            return <article key={g.name}>
              <header><h3>{g.name}</h3><span className="reality-tag">{g.badge}</span></header>
              {g.intro && <p className="fa-assistant-intro">{g.intro}</p>}
              {g.steps.length > 0 && <ol>{g.steps.map((step, i) => <li key={step.text}><span className="reality-step-number">0{i + 1}</span><div><p>{step.text}</p>{step.code?.map(line => <CopyCommand key={line} text={line} copyLabel={t.onboarding.copy} copiedLabel={t.onboarding.copied} />)}</div></li>)}</ol>}
              {g.notes && <div className="fa-assistant-notes">{g.notes.map(note => <div key={note.text}><p>— {note.text}</p>{note.code?.map(line => <CopyCommand key={line} text={line} copyLabel={t.onboarding.copy} copiedLabel={t.onboarding.copied} />)}</div>)}</div>}
            </article>;
          })}
        </div>
        <div className="fa-verify"><span className="reality-mono">{t.onboarding.verifyLabel}</span><p>{t.onboarding.verify}</p><CopyCommand text={t.onboarding.verifyQuestion} copyLabel={t.onboarding.copy} copiedLabel={t.onboarding.copied} /></div>
      </div></section>

      <section className="reality-section fa-letter-section"><div className="reality-wrap">
        <p className="reality-kicker">{t.letter.tag}</p>
        <article className="fa-letter">
          {t.letter.paragraphs.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
          <footer>{t.letter.sign}<span>{t.letter.role}</span></footer>
        </article>
      </div></section>

      <div className="reality-faq reality-wrap"><FaqSection items={faqs} locale={locale} heading={t.faqTitle} /></div>

      <section className="reality-final"><div className="reality-wrap"><p className="reality-kicker">{t.final.tag}</p><Title start={t.final.start} end={t.final.end} /><p>{t.final.body}</p><div data-md="skip" className="reality-actions"><Cta>{t.cta}</Cta></div><p className="reality-free"><strong>{t.free}</strong><span>{t.noCard}</span></p><p className="reality-final-line">{t.final.line}</p><Link className="reality-text-link" href={`${prefix}/demo/`} data-lp-event="lp_demo_click">{t.final.demo}<Arrow /></Link></div></section>
    </main>

    <footer className="reality-footer"><div className="reality-wrap"><Image src="/logos/logo-sealmetrics.svg" width={168} height={30} alt="Sealmetrics" unoptimized /><p>{t.footer}</p><nav aria-label="Legal"><Link href="/privacy/">{t.privacy}</Link><Link href={locale === "es" ? "/es/terms/" : "/terms/"}>{t.terms}</Link></nav><span className="reality-mono">{t.company} · © 2026</span></div></footer>
  </div>;
}
