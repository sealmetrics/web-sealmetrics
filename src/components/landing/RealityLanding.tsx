import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqSection } from "@/components/ui/FaqSection";
import { breadcrumbSchema, faqPageSchema, organizationSchema } from "@/lib/schema";
import { getCaseStudy } from "@/lib/content/case-studies";
import { realityLanding, AGENTIC_EXTENSION, AGENTIC_GUIDE, REALITY_ASSISTANTS } from "@/lib/content/reality-landing";
import { CopyActivationPrompt } from "./CopyActivationPrompt";
import "./reality-landing.css";

function Arrow() { return <span aria-hidden="true">↗</span>; }
function Cta({ children, href = "#empezar", secondary = false }: { children: React.ReactNode; href?: string; secondary?: boolean }) {
  return <a className={`reality-button${secondary ? " reality-button-secondary" : ""}`} href={href}>{children}<Arrow /></a>;
}
function Title({ start, end }: { start: string; end: string }) {
  return <h2>{start}<br /><em>{end}</em></h2>;
}

export function RealityLanding({ locale }: { locale: "es" | "en" }) {
  const t = realityLanding[locale];
  const prefix = locale === "es" ? "/es" : "";
  const incapto = getCaseStudy("incapto", locale);
  const dreamplace = getCaseStudy("dreamplace-hotels", locale);
  const palladium = getCaseStudy("palladium-hotel-group", locale);
  const number = new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-GB");
  const faqs = t.faqs.map(item => ({ ...item }));
  return <div className="reality-page">
    <JsonLd data={organizationSchema()} />
    <JsonLd data={breadcrumbSchema([{ name: t.breadcrumb, url: t.route }], locale)} />
    <JsonLd data={faqPageSchema(faqs, t.route)} />
    <header className="reality-header">
      <div className="reality-wrap reality-header-inner">
        <Link href={`${prefix}/`} aria-label="Sealmetrics"><Image src="/logos/logo-sealmetrics.svg" width={168} height={30} alt="Sealmetrics" priority unoptimized /></Link>
        <nav aria-label={locale === "es" ? "En esta página" : "On this page"}>
          <a href="#incapto">{t.navProof}</a><a href="#empezar">{t.navSetup}</a>
          <Link href={t.otherRoute} hrefLang={locale === "es" ? "en" : "es"} className="reality-language">{t.otherLanguage}</Link>
        </nav>
        <div data-md="skip"><Cta>{t.cta}</Cta></div>
      </div>
    </header>
    <main id="main-content">
      <section className="reality-hero">
        <div className="reality-wrap">
          <nav className="reality-breadcrumb reality-mono" aria-label="Breadcrumb"><Link href={`${prefix}/`}>{t.home}</Link><span>/</span><span>{t.breadcrumb}</span></nav>
          <div className="reality-hero-grid">
            <div className="reality-hero-copy">
              <p className="reality-tag">{t.eyebrow}</p>
              <h1>{t.heroStart}<br /><em>{t.heroEnd}</em></h1>
              <p className="reality-lead">{t.heroBody}</p>
              <div data-md="skip" className="reality-actions"><Cta>{t.cta}</Cta></div>
              <p className="reality-free"><strong>{t.free}</strong><span>{t.noCard}</span></p>
              <a className="reality-text-link" href="#incapto">{t.evidenceLink}<span aria-hidden="true">↓</span></a>
            </div>
            <figure className="reality-board">
              <div className="reality-board-top reality-mono"><span>{t.chartTag}</span><span>CASE FILE / 01</span></div>
              <figcaption><strong>{t.chartTitle}</strong><span>{t.chartSubtitle}</span></figcaption>
              <div className="reality-chart" role="img" aria-label={`${t.chartSubtitle}: GA4 50%, Sealmetrics 62%`}>
                <div className="reality-chart-column"><b>50<span>%</span></b><div className="reality-column reality-column-ga4" style={{ height: "50%" }} /><span className="reality-chart-label">GA4</span></div>
                <div className="reality-chart-column"><b>62<span>%</span></b><div className="reality-column reality-column-seal" style={{ height: "62%" }} /><span className="reality-chart-label">Sealmetrics</span></div>
              </div>
              <div className="reality-board-verdict"><strong>12<span>pts</span></strong><p><b>{t.chartDelta}</b><br />{t.chartMeaning}</p></div>
              <p className="reality-board-foot reality-mono">{t.chartFoot}</p>
            </figure>
          </div>
        </div>
      </section>
      <div className="reality-trust"><div className="reality-wrap reality-trust-inner"><p className="reality-mono">{t.trust}</p><div>
        <Image src={incapto.logo} width={145} height={34} alt="Incapto" unoptimized />
        <Image src={dreamplace.logo} width={160} height={37} alt="Dreamplace Hotels" unoptimized />
        <Image src={palladium.logo} width={155} height={47} alt="Palladium Hotel Group" unoptimized />
      </div></div></div>

      <section className="reality-section reality-problem"><div className="reality-wrap">
        <p className="reality-kicker">{t.problemTag}</p>
        <div className="reality-section-head"><Title start={t.problemStart} end={t.problemEnd} /><p>{t.problemBody}</p></div>
        <div className="reality-decisions">{t.problems.map(([title, body], i) => <article key={title}><span className="reality-mono">0{i + 1} /</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </div></section>

      <section id="incapto" className="reality-section reality-proof"><div className="reality-wrap">
        <p className="reality-kicker">{t.proofTag}</p>
        <div className="reality-section-head"><Title start={t.proofStart} end={t.proofEnd} /><p>{t.proofBody}</p></div>
        <div className="reality-proof-grid">
          <div className="reality-reconcile"><span className="reality-mono">{t.reconcile}</span><div><article><strong>96<span>%</span></strong><p>{t.orders}</p></article><article><strong>97<span>%</span></strong><p>{t.revenue}</p></article></div><span className="reality-mono">{t.period}</span></div>
          <div className="reality-visits"><h3>{t.visits}</h3><div className="reality-visit-row"><span>GA4</span><b>{number.format(157844)}</b><div><i style={{ width: "71%" }} /></div></div><div className="reality-visit-row is-seal"><span>Sealmetrics</span><b>{number.format(222345)}</b><div><i style={{ width: "100%" }} /></div></div><p><strong>{number.format(64501)}</strong> {t.moreVisits}</p><span>{t.visitsBody}</span></div>
        </div>
        <blockquote className="reality-quote"><p>“{incapto.quote}”</p><cite>{incapto.person}<span>{incapto.role} · Incapto</span></cite></blockquote>
        <div className="reality-proof-bottom"><Link className="reality-text-link" href={`${prefix}/case-studies/incapto/`}>{t.proofLink}<Arrow /></Link><p>{t.proofNote}</p></div>
      </div></section>

      <section className="reality-section reality-benefits"><div className="reality-wrap">
        <p className="reality-kicker">{t.benefitsTag}</p><Title start={t.benefitsStart} end={t.benefitsEnd} />
        <div className="reality-benefit-grid">{t.benefits.map(([title, body, foot], i) => <article key={title}>
          <div className={`reality-glyph reality-glyph-${i}`} aria-hidden="true">{[0, 1, 2, 3].map(n => <i key={n} />)}</div>
          <h3>{title}</h3><p>{body}</p><span className="reality-mono">{foot}</span>
        </article>)}</div>
        <div className="reality-method"><p>{t.method} <Link href={`${prefix}/glossary/cookieless-analytics/`}>{t.methodLink}</Link>{t.methodBody}</p><p>{t.boundary}</p></div>
      </div></section>

      <section className="reality-section reality-clients"><div className="reality-wrap">
        <p className="reality-kicker">{t.clientsTag}</p><Title start={t.clientsStart} end={t.clientsEnd} />
        <div className="reality-client-grid">{[
          { data: dreamplace, metric: t.dreamMetric, label: t.dreamLabel, body: t.dreamBody, slug: "dreamplace-hotels" },
          { data: palladium, metric: t.palladiumMetric, label: t.palladiumLabel, body: t.palladiumBody, slug: "palladium-hotel-group" },
        ].map(c => <article key={c.slug}><div className="reality-client-top"><Image src={c.data.logo} width={180} height={54} alt={c.data.client} unoptimized /><span className="reality-mono">CASE FILE</span></div><strong className="reality-client-metric">{c.metric}</strong><h3>{c.label}</h3><p>{c.body}</p><blockquote>“{c.data.secondQuote ?? c.data.quote}”<cite>{c.data.person} · {c.data.client}</cite></blockquote><Link className="reality-text-link" href={`${prefix}/case-studies/${c.slug}/`}>{t.clientLink}<Arrow /></Link></article>)}</div>
      </div></section>

      <section className="reality-section reality-offer"><div className="reality-wrap reality-offer-grid">
        <div><p className="reality-tag">{t.offerTag}</p><Title start={t.offerStart} end={t.offerEnd} /><p className="reality-lead">{t.offerBody}</p><ul className="reality-included">{t.included.map(item => <li key={item}>— {item}</li>)}</ul></div>
        <div className="reality-price"><span className="reality-mono">AGENTIC PACKAGE</span><strong>{t.price}</strong><p className="reality-mono reality-allowance">{t.allowance}</p><div data-md="skip"><Cta>{t.cta}</Cta></div><b className="reality-mono">{t.priceLabel}</b><p>{t.eventNote}</p></div>
        <p className="reality-offer-note">{t.offerNote}</p>
      </div></section>

      <section id="empezar" className="reality-section reality-setup"><div className="reality-wrap">
        <p className="reality-kicker">{t.setupTag}</p><div className="reality-section-head"><Title start={t.setupStart} end={t.setupEnd} /><p>{t.setupIntro}</p></div>
        <nav className="reality-assistants" aria-label={t.assistantsLabel} data-md="skip">
          {REALITY_ASSISTANTS.map(assistant => <a key={assistant.name} href={assistant.href} className={assistant.label === "guided" ? "is-guided" : undefined}>
            <Image src={assistant.logo} width={32} height={32} alt="" unoptimized />
            <span><strong>{assistant.name}</strong><small>{t.assistantLabels[assistant.label]}</small></span><Arrow />
          </a>)}
        </nav>
        <div id="pasos-claude" className="reality-setup-grid"><ol>{t.steps.map(([title, body], i) => <li key={title}><span className="reality-step-number">0{i + 1}</span><div><h3>{title}</h3><p>{body}</p>{i === 0 && <div data-md="skip"><a className="reality-text-link" href={AGENTIC_EXTENSION}>{t.download}<Arrow /></a></div>}</div></li>)}</ol>
          <div><CopyActivationPrompt prompt={t.prompt} label={t.promptLabel} copyLabel={t.copy} copiedLabel={t.copied} errorLabel={t.copyError} /><p className="reality-setup-note">{t.setupNote}</p><p className="reality-guide">{t.otherAssistant} <a href={AGENTIC_GUIDE}>{t.guide}<Arrow /></a></p></div>
        </div>
      </div></section>

      <div className="reality-faq reality-wrap"><FaqSection items={faqs} locale={locale} heading={t.faqTitle} /></div>

      <section className="reality-final"><div className="reality-wrap"><p className="reality-kicker">{t.finalTag}</p><Title start={t.finalStart} end={t.finalEnd} /><p>{t.finalBody}</p><div data-md="skip" className="reality-actions"><Cta>{t.cta}</Cta></div><p className="reality-free"><strong>{t.free}</strong><span>{t.noCard}</span></p><p className="reality-final-line">{t.finalLine}</p><Link className="reality-text-link" href={`${prefix}/demo/`}>{t.demo}<Arrow /></Link></div></section>
    </main>
    <footer className="reality-footer"><div className="reality-wrap"><Link href={`${prefix}/`} aria-label="Sealmetrics"><Image src="/logos/logo-sealmetrics.svg" width={168} height={30} alt="Sealmetrics" unoptimized /></Link><p>{t.footer}</p><nav aria-label={locale === "es" ? "Legal" : "Legal information"}><Link href="/privacy/">{t.privacy}</Link><Link href="/terms/">{t.terms}</Link></nav><span className="reality-mono">© 2026 SEALMETRICS</span></div></footer>
  </div>;
}
