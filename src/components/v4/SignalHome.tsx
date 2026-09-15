const proofChecks = [
  { name: "Keep your current stack", detail: "Run both measurement layers side by side." },
  { name: "Name the baseline", detail: "Use recorded backend revenue for the comparison." },
  { name: "Declare the model", detail: "Inspect how acquisition credit is assigned." },
  { name: "Hold the setup constant", detail: "Compare the same events over the same period." },
  { name: "Make the decision", detail: "Keep the setup that produces supportable evidence." },
  { name: "State the caveat", detail: "Publish what the comparison does not establish." },
];

const integrations = [
  { name: "Shopify", src: "/logos/brands/shopify.svg", type: "eCommerce" },
  { name: "WordPress", src: "/logos/brands/wordpress.svg", type: "eCommerce" },
  { name: "WooCommerce", src: "/logos/brands/woocommerce.svg", type: "eCommerce" },
  { name: "Magento", src: "/logos/brands/magento.svg", type: "eCommerce" },
  { name: "PrestaShop", src: "/logos/brands/prestashop.svg", type: "eCommerce" },
  { name: "BigQuery", src: "/logos/brands/bigquery.svg", type: "Data & BI" },
];

const outcomes = [
  {
    number: "01",
    title: "Protect a productive channel before you cut it.",
    body: "See how consent-shaped measurement changes the channel ranking before next week’s budget moves.",
    signal: "Budget → evidence",
  },
  {
    number: "02",
    title: "Give the room a number it can inspect.",
    body: "Marketing, finance and your agency can reconcile the same measurement against recorded backend revenue.",
    signal: "Debate → decision",
  },
  {
    number: "03",
    title: "Fix today, not tomorrow.",
    body: "Current revenue reporting shows which campaigns receive recorded sales while the budget can still move.",
    signal: "Report → action",
  },
];

export const signalHomeFaqs = [
  {
    question: "How can measurement avoid analytics-cookie dependence?",
    answer:
      "Sealmetrics is built for aggregate measurement without analytics cookies, persistent visitor identifiers or fingerprinting. That architecture does not depend on acceptance of analytics cookies for the defined measurement use case. Your legal basis still depends on purpose, configuration, jurisdiction and the rest of your processing.",
  },
  {
    question: "Do we need to remove GA4?",
    answer:
      "No. Run Sealmetrics beside GA4, define a comparison period and check both against the same backend total before you change the stack.",
  },
  {
    question: "Will the numbers match our store?",
    answer:
      "That is the test. Configure the relevant commerce events, compare the reported total with your store or CRM and investigate the remaining difference. Reconciliation depends on the events and backend data implemented.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Start with one first-party signal and keep the current stack in place. Timing depends on the platform, event scope and commerce integration; the first useful comparison starts once both systems are measuring the same defined events.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function SignalHome() {
  return (
    <div className="sig-signal-home">
      <section className="sig-hero" id="top">
        <div className="sig-hero-copy">
          <p className="sig-eyebrow"><span>Analytics for people who inspect the inputs</span> No analytics cookies · no modeled fill-ins presented as observation</p>
          <h1>
            Nice dashboard.<br />
            Shame about <em>the inputs it never saw.</em>
          </h1>
          <p className="sig-hero-intro">
            Sealmetrics measures eligible aggregate traffic and recorded outcomes without analytics cookies or visitor profiles. Run it beside your current analytics and compare both against the revenue your backend recorded.
          </p>
          <div data-md="skip" className="sig-hero-actions">
            <a className="sig-button sig-button-acid" href="https://my.sealmetrics.com/register">
              Start 14-day trial <Arrow />
            </a>
            <a className="sig-text-link" href="/demo/">
              Show me what&apos;s missing <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="sig-micro-proof">Side-by-side deployment · keep your current stack · verify against your backend</p>
        </div>

        <div className="sig-hero-board" aria-label="Illustrative comparison between consent-shaped analytics and aggregate measurement">
          <div className="sig-board-topline">
            <span>ILLUSTRATIVE EXAMPLE · NOT A LIVE ACCOUNT</span>
            <span className="sig-live"><i /> LIVE · 13:00</span>
          </div>
          <div className="sig-board-kpi">
            <div>
              <span>Backend-recorded revenue</span>
              <strong>€342K</strong>
            </div>
            <span className="sig-delta">+58% visible</span>
          </div>
          <div className="sig-chart-area" aria-hidden="true">
            <div className="sig-chart-label sig-label-ga">GA4 · consent-shaped</div>
            <div className="sig-chart-label sig-label-seal">Sealmetrics · aggregate view</div>
            <div className="sig-chart-grid" />
            <div className="sig-bar sig-bar-1"><span /></div>
            <div className="sig-bar sig-bar-2"><span /></div>
            <div className="sig-bar sig-bar-3"><span /></div>
            <div className="sig-bar sig-bar-4"><span /></div>
            <div className="sig-bar sig-bar-5"><span /></div>
          </div>
          <div className="sig-decision-card">
            <span>NEXT BEST MOVE</span>
            <strong>Move budget to PMax_Catalog.</strong>
            <p>Under this example&apos;s declared model, it receives 3.2× more recorded revenue than GA4 reports.</p>
          </div>
          <div className="sig-board-footer">
            <span><i className="sig-dot sig-dot-acid" /> eligible events observed</span>
            <span><i className="sig-dot sig-dot-gray" /> consent-shaped comparison</span>
          </div>
        </div>
      </section>

      <SignalAnswer>{homeAnswer}</SignalAnswer>

      <section className="sig-logo-rail" aria-label="How to verify Sealmetrics">
        <p>THE CLAIM IS ONLY AS GOOD AS THE TEST</p>
        <div className="sig-client-logos">
          {proofChecks.map((check) => (
            <div className="sig-client-logo" key={check.name}>
              <strong>{check.name}</strong>
              <span>{check.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sig-manifesto" id="product">
        <p className="sig-section-tag">UNCOMFORTABLE TRUTH #01</p>
        <div className="sig-manifesto-grid">
          <h2>Your ROAS isn&apos;t wrong.<br /><em>It&apos;s incomplete.</em></h2>
          <div>
            <p className="sig-lead">Those missing sales already happened. Your attribution model may have given another source the credit.</p>
            <p>That distortion can change ROAS, hide productive channels inside “Direct,” and make smart teams optimize a ranking that does not reconcile with backend revenue.</p>
          </div>
        </div>
        <div className="sig-comparison">
          <article className="sig-comparison-muted">
            <div className="sig-comparison-head"><span>CONSENT-SHAPED VIEW</span><b>PARTIAL</b></div>
            <h3>A confident answer built on missing evidence.</h3>
            <ul>
              <li>Consent rejection can remove visits</li>
              <li>Channels can inherit unsupported revenue credit</li>
              <li>Teams reconcile conflicting totals</li>
            </ul>
            <div className="sig-coverage"><span style={{ width: "46%" }} /></div>
          </article>
          <article className="sig-comparison-acid">
            <div className="sig-comparison-head"><span>SEALMETRICS</span><b>AGGREGATE</b></div>
            <h3>The slightly less glamorous thing: evidence.</h3>
            <ul>
              <li>Eligible events are not removed by analytics-cookie rejection</li>
              <li>Recorded sales receive credit under a declared model</li>
              <li>Reported revenue can be checked against the backend</li>
            </ul>
            <div className="sig-coverage"><span style={{ width: "100%" }} /></div>
          </article>
        </div>
      </section>

      <section className="sig-product-reality">
        <div className="sig-section-heading sig-real-heading">
          <p className="sig-section-tag">THE PRODUCT, FOR REAL</p>
          <h2>Real data is only useful<br /><em>when it changes the move.</em></h2>
        </div>

        <article className="sig-real-block sig-roas-story">
          <div className="sig-real-copy">
            <span>CONSENTLESS ANALYTICS</span>
            <h3>Your ROAS may not be bad.<br />Your measurement may be partial.</h3>
            <p>When eligible conversions remain observable, productive channels are less likely to disappear inside “Direct” or a consent-shaped subset.</p>
            <a href="/consentless-analytics/">How consentless analytics works <Arrow /></a>
          </div>
          <div className="sig-roas-card">
            <div className="sig-module-top"><span>SAME CAMPAIGN · SAME SPEND</span><span>REALITY CHECK</span></div>
            <div className="sig-roas-row sig-roas-muted">
              <div><span>ROAS you see today</span><small>consent-gated analytics</small></div><strong>2.4×</strong>
            </div>
            <div className="sig-roas-row sig-roas-real">
              <div><span>Aggregate ROAS view</span><small>eligible observed sales</small></div><strong>4.1×</strong>
            </div>
            <p>Illustrative example — not a live account. The difference must be checked against backend revenue.</p>
          </div>
        </article>

        <div className="sig-product-cards">
          <article className="sig-product-card sig-promo-card">
            <div className="sig-module-top"><span>PROMO DAY · 13:00</span><span className="sig-module-live">● LIVE</span></div>
            <h3>Know how the day is going <em>while it happens.</em></h3>
            <p>Not a post-mortem tomorrow. A decision while today&apos;s budget can still move.</p>
            <div className="sig-promo-stats">
              <div><span>Revenue so far</span><strong>€96,204</strong><small>on pace vs last Promo Day</small></div>
              <div><span>Best campaign</span><strong>PMax_Catalog</strong><small>€31,540 · scale it now</small></div>
              <div><span>Underperformer</span><strong>DemandGen</strong><small>9,230 clicks · 2 sales</small></div>
              <div><span>Conversion rate</span><strong>1.10%</strong><small>+0.3 pts since 11:00</small></div>
            </div>
            <div className="sig-decision-strip"><b>DECISION AT 13:00</b><span>Kill DemandGen. Move budget to PMax_Catalog.</span></div>
            <small className="sig-example-note">Illustrative example — not a live account.</small>
          </article>

          <article className="sig-product-card sig-lens-card">
            <div className="sig-module-top"><span>LENS AI</span><span>DEFINED METRICS · TRACEABLE SOURCE</span></div>
            <h3>Ask the questions that <em>move the number.</em></h3>
            <p>LENS answers plain-language questions against defined metrics. Inspect the source before the answer moves budget.</p>
            <div className="sig-lens-questions">
              <div><span>GROWTH</span><b>Which products leak revenue?</b><p>77% of premium e-bike carts don&apos;t convert. Add financing at product level.</p></div>
              <div><span>COST</span><b>Where am I burning budget?</b><p>DemandGen: 9,230 clicks, 2 sales. Reallocate to PMax_Catalog.</p></div>
            </div>
            <a className="sig-lens-link" href="https://lens-lite.sealmetrics.com">Ask LENS on demo data <Arrow /></a>
          </article>
        </div>
      </section>

      <section className="sig-outcomes">
        <div className="sig-section-heading">
          <p className="sig-section-tag">WHAT BETTER EVIDENCE IS FOR</p>
          <h2>Not more data.<br /><em>Fewer wrong decisions.</em></h2>
        </div>
        <div className="sig-outcome-grid">
          {outcomes.map((outcome) => (
            <article key={outcome.number}>
              <span className="sig-outcome-number">{outcome.number}</span>
              <h3>{outcome.title}</h3>
              <p>{outcome.body}</p>
              <div>{outcome.signal} <span aria-hidden="true">→</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="sig-point-of-view">
        <p className="sig-section-tag">OUR POINT OF VIEW</p>
        <div className="sig-pov-grid">
          <div className="sig-pov-statement">
            <Picture
              src="/logos/logo-sealmetrics.svg"
              alt="Sealmetrics"
              width={423}
              height={76}
              className="sig-brand-showcase"
            />
            <h2>We don&apos;t build visitor profiles.<br /><em>We measure eligible aggregate events.</em></h2>
          </div>
          <div>
            <p>More data is not the goal. Better decisions are. That means minimizing personal-data collection, preserving useful aggregate evidence and making the result inspectable by the people responsible for the number.</p>
            <p>Privacy-oriented architecture and useful measurement can reinforce each other. The exact outcome still depends on purpose, configuration and the events implemented.</p>
            <span>SEALMETRICS / THE ANALYTICS OF REALITY</span>
          </div>
        </div>
      </section>

      <section className="sig-proof" id="proof">
        <div className="sig-proof-quote">
          <p className="sig-section-tag sig-light">PROOF, NOT PROMISES</p>
          <blockquote>
            “If the backend does not confirm a meaningful difference, <em>keep your current setup.</em>”
          </blockquote>
          <p className="sig-quote-source"><b>The Fair Test</b><br />A comparison method, not a testimonial</p>
        </div>
        <div className="sig-proof-numbers">
          <article><strong>01</strong><p>define the eligible events and attribution model</p></article>
          <article><strong>02</strong><p>run both tools over the same comparison period</p></article>
          <article><strong>03</strong><p>reconcile reported revenue with the same backend</p></article>
          <a href="/case-studies/">Review the evidence standard <Arrow /></a>
        </div>
      </section>

      <section className="sig-how">
        <div className="sig-section-heading">
          <p className="sig-section-tag">NO MAGIC. THAT&apos;S THE POINT.</p>
          <h2>No magic.<br /><em>A method you can inspect.</em></h2>
        </div>
        <div className="sig-how-flow">
          <article>
            <span>01 / OBSERVE</span>
            <div className="sig-flow-icon">•••</div>
            <h3>Collect aggregate events</h3>
            <p>Built without analytics cookies, persistent visitor IDs or fingerprinting.</p>
          </article>
          <b aria-hidden="true">→</b>
          <article>
            <span>02 / CONNECT</span>
            <div className="sig-flow-icon">+ +</div>
            <h3>Match traffic to revenue</h3>
            <p>Observed sales receive credit under a declared attribution model, then the total can be reconciled with the backend.</p>
          </article>
          <b aria-hidden="true">→</b>
          <article>
            <span>03 / DECIDE</span>
            <div className="sig-flow-icon">↗</div>
            <h3>Act on supportable evidence</h3>
            <p>Use current reporting to challenge spend, investigate anomalies and decide what to test next.</p>
          </article>
        </div>
      </section>

      <section className="sig-integrations">
        <div className="sig-integrations-copy">
          <p className="sig-section-tag">DIRECT CONNECTORS</p>
          <h2>Plugs into the stack<br /><em>you already run.</em></h2>
          <p>Use a native connector where available, or the API for a custom implementation. Required engineering depends on the platform and event scope.</p>
          <a href="/integrations/">See all integrations <Arrow /></a>
        </div>
        <div className="sig-integration-grid">
          {integrations.map((integration) => (
            <article key={integration.name}>
              <img src={integration.src} alt={integration.name} width={24} height={24} />
              <span>{integration.type}</span>
            </article>
          ))}
          <article className="sig-text-integration"><b>OpenCart</b><span>eCommerce</span></article>
          <article className="sig-text-integration"><b>Data Studio</b><span>Data & BI</span></article>
        </div>
      </section>

      <section className="sig-offer" id="pricing">
        <div className="sig-offer-copy">
          <p className="sig-section-tag sig-light">A FAIR TEST</p>
          <h2>Don&apos;t take our word for it.<br /><em>Ask your store.</em></h2>
          <p>Run Sealmetrics beside GA4 for 14 days. Define the eligible events and attribution model, then compare both against the sales your store recorded. Keep the setup that produces the more useful, supportable result.</p>
          <ul>
            <li>One first-party signal · implementation depends on event scope</li>
            <li>One onboarding session on Scale</li>
            <li>EU-hosted in Dublin</li>
          </ul>
        </div>
        <div className="sig-price-card">
          <div><span>GROWTH</span><span className="sig-popular">14-DAY SIDE-BY-SIDE TRIAL</span></div>
          <p>For teams ready to test a separate aggregate measurement layer.</p>
          <strong><sup>€</sup>499<small>/mo</small></strong>
          <span className="sig-billing">Billed annually · 2 months free</span>
          <ul>
            <li>5M human events / month</li>
            <li>3 domains</li>
            <li>Full MCP + BigQuery + API</li>
            <li>GA4 side-by-side comparison</li>
          </ul>
          <a className="sig-button sig-button-acid sig-full" href="https://my.sealmetrics.com/register">Start 14-day trial <Arrow /></a>
          <small>14-day trial. Review the applicable billing terms before starting.</small>
        </div>
      </section>

      <section className="sig-faq">
        <div>
          <p className="sig-section-tag">REASONABLE DOUBTS</p>
          <h2>You should question<br /><em>your analytics.</em></h2>
        </div>
        <div className="sig-faq-list">
          {signalHomeFaqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>{faq.question}<span aria-hidden="true">+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="sig-final-cta">
        <p className="sig-section-tag">ONE LAST THING</p>
        <h2>Reality is already there.<br /><em>You should probably see it.</em></h2>
        <p>Eligible aggregate events. Backend comparison. Fewer expensive opinions.</p>
        <div data-md="skip">
          <a className="sig-button sig-button-dark" href="https://my.sealmetrics.com/register">Start 14-day trial <Arrow /></a>
          <a className="sig-text-link sig-dark-link" href="/demo/">Book a demo <span aria-hidden="true">→</span></a>
        </div>
      </section>

    </div>
  );
}
import { Picture } from "@/components/ui/Picture";
import { SignalAnswer } from "@/components/v4/SignalAnswer";
import { homeAnswer } from "@/lib/content/pillar-answers";
