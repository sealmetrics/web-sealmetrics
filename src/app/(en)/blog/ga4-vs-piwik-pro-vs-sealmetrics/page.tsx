import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { getAlternates } from "@/lib/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqSection } from "@/components/ui/FaqSection";
import { articleSchema, breadcrumbSchema, faqPageSchema, speakableWebPageSchema } from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

/**
 * Phase 4 of CONTENT-PLAN-PROBLEM-POSITIONING.md, post 6: three-way comparison
 * that links to /vs-ga4 and /vs/piwik-pro instead of competing with them.
 *
 * Every competitor fact is dated. Sources (checked 14 Sep 2026 unless noted):
 * - Piwik PRO pricing page: Business from €36/month (2M monthly actions, 20
 *   domains, 25 months retention), Enterprise from €366/month billed annually;
 *   modules Analytics, Tag Manager, Data Activation, Consent Manager; public
 *   cloud data centres in Germany, the Netherlands, the US, Sweden, Hong Kong
 *   and UAE North; private cloud on Enterprise.
 * - Piwik PRO Help, "Collect data in a privacy-friendly way": visitor cookies,
 *   session hash (30 minutes since the last event), both off; with both off,
 *   each event is a new session and new vs returning visitors are unavailable;
 *   channel attribution narrows to last click with the session hash only.
 * - Piwik PRO MCP Beta (piwik.pro blog, developers.piwik.pro): runs locally,
 *   queries data and configures tracking.
 * - Analytics Help 7667196 (retention 2 or 14 months standard, up to 50 on 360;
 *   affects explorations and funnels, not standard reports), 9358801 (BigQuery
 *   export 1M events/day standard, 20B on 360), 16291112 (attribution models),
 *   11161109 (behavioural modelling thresholds).
 * - googleanalytics/google-analytics-mcp: official, experimental, read-only.
 * - Tracker weights measured 27 Aug 2026 (gzip on the wire): t.js 1.1 KB,
 *   ppms.js ~26.8 KB, gtag.js ~149 KB.
 * - Sealmetrics: PricingSignal.tsx (plans, 24-month retention), docs BigQuery
 *   integration (Growth, Scale, Enterprise; hourly or daily), attribution-model.
 * No competitor figure from a side-by-side test is claimed for Piwik PRO: none
 * has been run on a client site.
 */

const SLUG = "ga4-vs-piwik-pro-vs-sealmetrics";
const URL = `/blog/${SLUG}`;
const HEADLINE = "GA4 vs Piwik PRO vs Sealmetrics: Which One Fits an EU Marketing Team";
const DESCRIPTION =
  "Three architectures, not three versions of one tool. Price, identifiers, behaviour without consent, attribution, retention and where each one wins.";

export const metadata: Metadata = {
  title: "GA4 vs Piwik PRO vs Sealmetrics: Compared for the EU",
  description: DESCRIPTION,
  openGraph: {
    title: "GA4 vs Piwik PRO vs Sealmetrics",
    description:
      "A free Google suite, a configurable privacy suite and an identifier-free measurement layer. What each does when a visitor rejects the banner, and where each one is the right choice.",
    type: "article",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "GA4 vs Piwik PRO vs Sealmetrics",
    description:
      "A free Google suite, a configurable privacy suite and an identifier-free measurement layer. What each does when a visitor rejects the banner, and where each one is the right choice.",
    images: [ogImage(`${URL}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(URL),
  },
};

const FAQ = [
  {
    question: "GA4 vs Piwik PRO vs Sealmetrics: which is better for EU eCommerce?",
    answer:
      "It depends on the decision you need the data for. GA4 fits teams that live in Google Ads and accept consent-dependent data. Piwik PRO fits teams that want analytics, tag manager, consent manager and activation from one vendor, with configurable privacy modes. Sealmetrics fits teams whose main question is which channels and campaigns produce revenue, measured without consent loss.",
  },
  {
    question: "Can Piwik PRO track visitors without consent?",
    answer:
      "Piwik PRO documents anonymous configurations for visitors who have not consented. Its help centre also sets out the cost: with visitor cookies and the session hash both off, each event is treated as a new session and new versus returning visitors are unavailable, and attribution narrows as identifiers are removed. Whether a configuration is lawful without consent depends on your settings and your authority.",
  },
  {
    question: "How much do GA4, Piwik PRO and Sealmetrics cost?",
    answer:
      "Standard GA4 is free; Analytics 360 is quote-based. On 14 September 2026 Piwik PRO listed Business from €36 a month and Enterprise from €366 a month billed annually. Sealmetrics has a free Agentic plan up to 1M human events a month, Growth from €499 a month and Scale from €899 a month on annual billing, and custom Enterprise pricing.",
  },
  {
    question: "Is Piwik PRO GDPR compliant?",
    answer:
      "Piwik PRO can be configured for GDPR-sensitive deployments, with EU data centres, IP masking, a consent manager and anonymous modes. Compliance is a property of your configuration, not of the product: which identifiers you enable, what you collect, your legal basis and your national authority's criteria. The same is true of GA4 and of Sealmetrics.",
  },
  {
    question: "Which of the three has the lightest tracking script?",
    answer:
      "Measured on 27 August 2026, gzip on the wire: the Sealmetrics tracker is about 1.1 KB, Piwik PRO's ppms.js about 26.8 KB and GA4's gtag.js about 149 KB. Script weight affects page performance, not what each tool is allowed to measure.",
  },
  {
    question: "Can I run Sealmetrics alongside GA4 or Piwik PRO?",
    answer:
      "Yes, and it is the recommended way to evaluate. Keep the configuration you would actually deploy, run Sealmetrics next to it over a full commercial cycle, reconcile both with your real orders, and only then compare channels. Many teams keep GA4 for Google Ads and move budget decisions to the reconciled figure.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const th = "text-left font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary font-semibold py-2 pr-4 border-b border-warm-200 align-bottom";
const td = "py-2 pr-4 border-b border-warm-100 align-top";

const ROWS: [string, string, string, string][] = [
  ["Price", "Standard GA4 free; Analytics 360 quote-based", "Business from €36/month; Enterprise from €366/month billed annually (listed 14 Sep 2026)", "Agentic free to 1M human events; Growth €499/month, Scale €899/month on annual billing; Enterprise custom"],
  ["Product scope", "Analytics, integrated with Google Ads and the Google marketing stack", "Analytics, Tag Manager, Consent Manager and Data Activation", "Aggregate analytics: channels, campaigns, conversions, revenue, funnels"],
  ["Identifiers", "First-party cookies; optional User-ID", "Configurable: visitor cookies, a session hash lasting 30 minutes after the last event, or neither", "None; a short-lived session marker that is not stored in the browser"],
  ["When a visitor rejects the banner", "Basic mode: nothing. Advanced mode: cookieless pings, with users and sessions modelled above Google's thresholds", "Depends on configuration; with both identifiers off, each event is a new session and returning visitors are not recognised", "Same measurement as for every other visit; nothing is stored on the device"],
  ["Attribution", "Data-driven, paid and organic last click, Google paid channels last click", "Several models with visitor cookies; last click with the session hash only", "Session-scoped last click only"],
  ["Retention", "2 or 14 months for explorations and funnels; up to 50 months on 360", "25 months on Business; flexible on Enterprise", "24 months"],
  ["Hosting", "Google infrastructure", "Public cloud in Germany, the Netherlands, the US, Sweden, Hong Kong or UAE North; private cloud on Enterprise", "Dublin, Ireland"],
  ["Raw data export", "BigQuery: 1M events/day on standard, up to 20B on 360", "API access; check the export options of your plan", "BigQuery connector on Growth, Scale and Enterprise, hourly or daily"],
  ["Tracker weight (gzip, measured 27 Aug 2026)", "~149 KB", "~26.8 KB", "~1.1 KB"],
  ["MCP server for AI assistants", "Official, experimental, read-only", "Beta, runs locally, queries and configures", "Yes"],
];

export default function Ga4VsPiwikProVsSealmetricsPage() {
  const dates = postDates(SLUG);

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "GA4 vs Piwik PRO vs Sealmetrics" }]} />
      <JsonLd
        data={articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Comparisons",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "GA4 vs Piwik PRO vs Sealmetrics", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: HEADLINE, selectors: [".key-takeaways", ".tldr"] })} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Comparisons
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              {HEADLINE}
            </h1>
            <PostByline {...dates} readTime="11 min read" authorName="Rafa Jiménez" authorUrl="/authors/rafa-jimenez" />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            GA4, Piwik PRO and Sealmetrics are three different architectures. GA4 is a
            free Google suite whose data depends on consent. Piwik PRO is a paid suite
            with analytics, tag manager, consent manager and activation, where each
            identifier you switch off for privacy removes reports. Sealmetrics is a
            narrower, identifier-free measurement layer that credits revenue by last
            click whether or not the visitor accepts the banner. Choose by the decision you need to make.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>GA4 is the default for teams built around Google Ads. Without consent it measures nothing in basic mode and models users and sessions in advanced mode above Google&apos;s thresholds.</li>
              <li>Piwik PRO is the broadest of the three. Its privacy is configurable, and its own documentation is clear about the trade-off: with both identifiers off, each event is a new session.</li>
              <li>Sealmetrics does less, on purpose: no user identifiers, no tag manager, no consent manager, last click only. In exchange it measures visitors who accept and reject the banner the same way and reconciles with orders.</li>
              <li>On Incapto&apos;s Shopify store, GA4 with Consent Mode did not record 29% of the visits Sealmetrics recorded over the same 48 days.</li>
              <li>Evaluate with the configuration you would actually deploy, side by side, against your real orders.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              When a European marketing team starts looking beyond GA4, the shortlist
              usually has Piwik PRO on it, and more often now a cookieless option.
              Comparing them feature by feature is where the evaluation goes wrong: the
              three products make different architectural choices, and those choices
              decide what each one can report long before any feature list does.
            </p>
            <p>
              A declaration of interest: we make one of the three. The point of this piece
              is to be useful even if you do not choose us, so every competitor fact below
              comes from the vendor&apos;s own documentation, is dated, and ends with where
              each product is the better choice. The two-way comparisons go deeper:{" "}
              <Link href="/vs-ga4" className={link}>Sealmetrics vs GA4</Link> and{" "}
              <Link href="/vs/piwik-pro" className={link}>Sealmetrics vs Piwik PRO</Link>.
            </p>

            <h2 className={h2}>The comparison, side by side</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.9rem] border-collapse min-w-[760px]">
                <thead>
                  <tr>
                    <th className={th}></th>
                    <th className={th}>GA4</th>
                    <th className={th}>Piwik PRO</th>
                    <th className={th}>Sealmetrics</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(([label, ga4, piwik, seal]) => (
                    <tr key={label}>
                      <td className={`${td} font-semibold`}>{label}</td>
                      <td className={td}>{ga4}</td>
                      <td className={td}>{piwik}</td>
                      <td className={td}>{seal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[0.9rem] text-text-tertiary">
              Competitor facts checked against vendor documentation on 14 September 2026;
              tracker weights measured on 27 August 2026. Vendors change plans and
              defaults, so re-check before you sign.
            </p>

            <h2 className={h2}>The row that decides most evaluations: a visitor who says no</h2>
            <p>
              <strong>GA4</strong> hands the decision to{" "}
              <Link href="/blog/consent-mode-measured-vs-modelled" className={link}>Consent Mode</Link>.
              In basic mode, a refusal sends nothing. In advanced mode, the tags send
              cookieless pings and GA4 models users and sessions, but only for properties
              above 1,000 denied events a day and 1,000 consented daily users, and the
              modelled data does not reach the BigQuery export. On{" "}
              <Link href="/case-studies/incapto" className={link}>Incapto&apos;s Shopify store</Link>,
              GA4 with Consent Mode did not record 29% of visits or 45% of pageviews over
              48 days, and paid campaigns fell from 62% of traffic measured without consent loss
              to 50% in GA4.
            </p>
            <p>
              <strong>Piwik PRO</strong> lets you decide how much identification to keep.
              With visitor cookies, it recognises returning visitors and offers several
              attribution models. With only the session hash, which lasts 30 minutes after
              the last event, it groups a visit and attributes by last click. With neither,
              Piwik PRO&apos;s help centre says each event is treated as a new session,
              returning visitors cannot be recognised and the data becomes less accurate.
              We have not run Piwik PRO side by side on a client site, so we publish no
              percentage for it; test the configuration you would deploy.
            </p>
            <p>
              <strong>Sealmetrics</strong> has no such setting, because it has no
              identifier to switch off. It stores nothing on the device, groups a visit
              with a short-lived marker that is not kept in the browser, and credits each
              conversion to the source of the session in which it happens. The visitor who
              rejects the banner is measured the same way as the one who accepts it.
              Whether analytics without cookies is exempt from consent in your market still
              depends on your configuration and your national authority.
            </p>

            <h2 className={h2}>Where GA4 is the right choice</h2>
            <ul className={dashList}>
              <li><strong>Google Ads is the centre of your acquisition.</strong> Audiences, conversion import and bidding are native, and GA4 is the conduit many teams keep for them.</li>
              <li><strong>Budget is tight.</strong> Standard GA4 costs nothing to license, and its ecosystem of integrations and people who know it is the largest.</li>
              <li><strong>You need user-level analysis on consenting traffic.</strong> Cohorts, retention and paths are available where users accept cookies.</li>
            </ul>

            <h2 className={h2}>Where Piwik PRO is the right choice</h2>
            <ul className={dashList}>
              <li><strong>You want one vendor for the whole layer.</strong> Analytics, tag manager, consent manager and data activation come in the same contract.</li>
              <li><strong>You need visitor-level analysis with privacy controls.</strong> With the identifiers enabled and a legal basis in place, it offers visitor continuity and several attribution models, and you choose the trade-off per site.</li>
              <li><strong>Data location is a procurement requirement.</strong> It offers several public cloud regions and, on Enterprise, private cloud.</li>
            </ul>

            <h2 className={h2}>Where Sealmetrics is the right choice</h2>
            <ul className={dashList}>
              <li><strong>The decision is budget between channels and campaigns.</strong> Revenue by channel, campaign and creative, credited without consent loss, and checkable against orders.</li>
              <li><strong>You do not want to govern an identifier configuration.</strong> There is no privacy mode to choose per site, because there is nothing to identify.</li>
              <li><strong>Page weight matters.</strong> The tracker is about 1.1 KB on the wire.</li>
            </ul>

            <h2 className={h2}>What Sealmetrics does not do</h2>
            <p>
              It has no user-level analysis, cohorts, retention reports or cross-session
              journeys; no multi-touch or data-driven attribution; no tag manager, consent
              manager or activation module; and it does not send conversions to ad
              platforms, so GA4 or the platform pixels keep that job. If any of those is the
              main requirement, one of the other two is the better fit. The reasoning behind
              last click only is in{" "}
              <Link href="/blog/last-click-vs-modelled-attribution" className={link}>last-click vs modelled attribution</Link>.
            </p>

            <h2 className={h2}>How to evaluate the three without trusting any vendor</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Write down the decisions.</strong> Budget between channels, bidding, user-level product analysis and compliance evidence need different tools.</li>
              <li><strong>Configure each candidate as you would deploy it.</strong> For Piwik PRO, that means the identifier mode your legal team would approve, not the richest one.</li>
              <li><strong>Run them on the same site over the same weeks.</strong> A full commercial cycle; Incapto&apos;s comparison covered 48 days.</li>
              <li><strong>Reconcile each against real orders first.</strong> A tool that cannot match the order total is not a reference for channels. The method is in{" "}<Link href="/use-cases/single-source-of-truth" className={link}>one number for marketing and finance</Link>.</li>
              <li><strong>Then compare the channel split and the work it took.</strong> Which reports survived your configuration, and how much governance each one needs.</li>
            </ol>
          </div>

          <CommercialModule hook="Evaluating GA4, Piwik PRO and Sealmetrics? Run Sealmetrics next to the configuration you already have and reconcile both with your orders." />

          <RelatedReading currentSlug={SLUG} />

          <FaqSection items={FAQ} heading="Questions about GA4, Piwik PRO and Sealmetrics" />
        </div>
      </article>
    </>
  );
}
