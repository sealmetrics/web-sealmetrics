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
 * Phase 4 of CONTENT-PLAN-PROBLEM-POSITIONING.md, post 4: problem A,
 * query "GA4 consent mode data loss" / "what does consent mode model".
 *
 * Sources (checked 14 Sep 2026):
 * - Google Tag Platform, "Consent mode overview": the four consent types;
 *   basic mode sends nothing before interaction and nothing on refusal;
 *   advanced mode sends cookieless pings (timestamp, user agent, referrer,
 *   consent state, ad-click identifiers in the URL) when storage is denied;
 *   both modes support conversion modelling, advanced with an advertiser-
 *   specific model.
 * - Analytics Help 11161109 (behavioural modelling): prerequisites 1,000
 *   events/day with analytics_storage denied for 7 days and 1,000 daily users
 *   with it granted for 7 of the previous 28 days, advanced implementation;
 *   modelled users, sessions and new users; not applied to event counts in
 *   standard explorations; not available in data export (BigQuery), audiences,
 *   user explorer, sequence segments, retention, predictive metrics.
 * - Analytics Help 10976610 (reporting identity): Blended uses modelling,
 *   Observed does not; switching changes reports, not collection.
 * - Google Ads Help 10548233: modelled conversions in the Conversions column,
 *   700 ad clicks over 7 days per country and domain grouping.
 * Figures and quote: Incapto as published in case-studies.tsx.
 */

const SLUG = "consent-mode-measured-vs-modelled";
const URL = `/blog/${SLUG}`;
const HEADLINE = "Consent Mode: What GA4 Measures and What It Models";
const DESCRIPTION =
  "When consent is denied, Consent Mode sends cookieless pings and GA4 estimates users and sessions above a threshold. What is measured, what is modelled.";

export const metadata: Metadata = {
  title: "Consent Mode: What GA4 Measures and What It Models",
  description: DESCRIPTION,
  openGraph: {
    title: "Consent Mode: What GA4 Measures and What It Models",
    description:
      "Basic vs advanced, cookieless pings, behavioural modelling thresholds, Blended vs Observed, and the modelled data that never reaches BigQuery.",
    type: "article",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Consent Mode: What GA4 Measures and What It Models",
    description:
      "Basic vs advanced, cookieless pings, behavioural modelling thresholds, Blended vs Observed, and the modelled data that never reaches BigQuery.",
    images: [ogImage(`${URL}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(URL),
  },
};

const FAQ = [
  {
    question: "What does Google Consent Mode measure when consent is denied?",
    answer:
      "It depends on the implementation. In basic mode, nothing: Google tags do not run until the visitor interacts with the banner, and a refusal sends no data at all. In advanced mode, tags load with consent denied and send cookieless pings with a timestamp, user agent, referrer, the consent state and any ad-click identifier in the URL, without reading or writing cookies.",
  },
  {
    question: "What is the difference between basic and advanced Consent Mode?",
    answer:
      "Basic mode blocks Google tags until the visitor consents, so a refusal leaves no trace and Google can only apply a general conversion model. Advanced mode loads the tags before the banner with consent denied and sends cookieless pings, which is what allows advertiser-specific conversion modelling in Google Ads and behavioural modelling in GA4.",
  },
  {
    question: "How much of my GA4 data is modelled?",
    answer:
      "Compare the same report under the Blended and Observed reporting identities in GA4's admin settings. Blended adds modelling when no identifier is available; Observed uses only user and device IDs. Switching changes only how reports are shown, not what is collected, so the difference between the two is the modelled share.",
  },
  {
    question: "Does modelled consent mode data appear in BigQuery?",
    answer:
      "No. Google lists data export, including the BigQuery export, among the features that do not support modelled data, together with audiences, user explorer, segments with sequences, retention reports and predictive metrics. A warehouse built on the export therefore shows fewer users than the Blended GA4 interface.",
  },
  {
    question: "Does Consent Mode restore traffic sources and ROAS?",
    answer:
      "Not for each visit. GA4's behavioural modelling estimates users, sessions and new users for people who declined analytics cookies, and Google Ads models conversions in its own Conversions column. Neither turns an unconsented visit back into an observed session with its own source in your analytics.",
  },
  {
    question: "Is Consent Mode enough to be GDPR compliant?",
    answer:
      "No, on its own. Consent Mode passes the visitor's choice from your consent banner to Google tags; it does not decide whether you have a lawful basis or whether a banner is needed. Advanced mode also sends pings before consent, which is worth reviewing with your DPO against your national authority's criteria.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const th = "text-left font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary font-semibold py-2 pr-4 border-b border-warm-200 align-bottom";
const td = "py-2 pr-4 border-b border-warm-100 align-top";

export default function ConsentModeMeasuredVsModelledPage() {
  const dates = postDates(SLUG);

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Consent Mode: measured vs modelled" }]} />
      <JsonLd
        data={articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Data Quality",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Consent Mode: measured vs modelled", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: HEADLINE, selectors: [".key-takeaways", ".tldr"] })} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Data Quality
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              {HEADLINE}
            </h1>
            <PostByline {...dates} readTime="9 min read" authorName="Rafa Jiménez" authorUrl="/authors/rafa-jimenez" />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            With Consent Mode, GA4 measures the visitors who accept analytics cookies.
            For the ones who decline, advanced mode sends cookieless pings, and GA4
            estimates their users, sessions and new users with behavioural modelling
            once the property meets Google&apos;s thresholds. Those estimates appear in
            Blended reports, not in the BigQuery export, and they do not restore the
            source of each visit.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>Basic mode sends nothing to Google when consent is refused. Advanced mode sends cookieless pings: timestamp, user agent, referrer, consent state and ad-click identifiers.</li>
              <li>GA4 models users, sessions and new users only above a threshold: 1,000 events a day with analytics storage denied for 7 days, and 1,000 daily users with it granted for 7 of the previous 28 days.</li>
              <li>Modelled data shows under the Blended reporting identity and is absent from the BigQuery export, audiences, retention reports and sequence segments.</li>
              <li>Google Ads models conversions separately, in its own Conversions column, above 700 ad clicks over seven days per country and domain grouping.</li>
              <li>Modelling estimates totals. It does not give each unconsented visit back its channel, which is what budget decisions need.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Consent Mode is often described as the thing that &ldquo;recovers&rdquo;
              the data the cookie banner takes away. That description is half right, and
              the wrong half is expensive. Consent Mode is a way for your banner to tell
              Google&apos;s tags what the visitor chose. What happens to the visitors who
              said no depends on how it is implemented, on how much traffic you have, and
              on which report you are looking at.
            </p>
            <p>
              Incapto&apos;s team described the result precisely: &ldquo;Consent Mode
              left us with a structural blind spot: we knew there was traffic we were not
              seeing, but we had no way to size it.&rdquo; When they ran GA4 with Consent
              Mode next to Sealmetrics on their{" "}
              <Link href="/case-studies/incapto" className={link}>Shopify store</Link>{" "}
              for 48 days, GA4 did not record 29% of visits or 45% of pageviews. This
              piece explains which part of that gap Consent Mode can estimate, and which
              part it cannot.
            </p>

            <h2 className={h2}>The four signals, and the two implementations</h2>
            <p>
              Consent Mode carries four consent types: <code>ad_storage</code> and{" "}
              <code>analytics_storage</code> for cookies and device identifiers used for
              advertising and analytics, and <code>ad_user_data</code> and{" "}
              <code>ad_personalization</code> for sending user data to Google for
              advertising and for personalised ads. The last two are what version 2
              added. The consent banner, your{" "}
              <Link href="/glossary/consent-management-platform" className={link}>consent management platform</Link>,
              sets them; Google&apos;s tags read them.
            </p>
            <p>How the tags behave depends on the implementation:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[620px]">
                <thead>
                  <tr>
                    <th className={th}></th>
                    <th className={th}>Basic mode</th>
                    <th className={th}>Advanced mode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={`${td} font-semibold`}>Before the visitor answers</td><td className={td}>Google tags do not run; nothing is sent</td><td className={td}>Tags load with consent denied by default</td></tr>
                  <tr><td className={`${td} font-semibold`}>Visitor accepts</td><td className={td}>Tags run with cookies, from that point on</td><td className={td}>Tags switch to cookies</td></tr>
                  <tr><td className={`${td} font-semibold`}>Visitor refuses</td><td className={td}>Nothing is sent, not even the consent state</td><td className={td}>Cookieless pings: timestamp, user agent, referrer, consent state, ad-click identifiers in the URL</td></tr>
                  <tr><td className={`${td} font-semibold`}>Modelling it enables</td><td className={td}>A general conversion model</td><td className={td}>Advertiser-specific conversion modelling; GA4 behavioural modelling when eligible</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className={h2}>What is measured</h2>
            <p>
              For visitors who accept analytics cookies, GA4 works as it always has:
              users, sessions, events, sources and conversions, observed. For visitors
              who refuse, a basic implementation observes nothing. An advanced
              implementation observes that a hit happened, with its timestamp, browser,
              referrer and consent state, but without a cookie there is no identifier to
              tie one hit to the next, so those pings cannot be assembled into users and
              sessions the way consented hits are.
            </p>
            <p>
              There is also a timing effect that applies to both modes. A visitor who
              accepts on the second page has already left the landing page that carried
              the campaign parameters, which is one of the reasons consented traffic
              still ends up in{" "}
              <Link href="/blog/why-ga4-shows-direct-none" className={link}>(direct) / (none)</Link>.
            </p>

            <h2 className={h2}>What is modelled, and only above a threshold</h2>
            <p>
              GA4&apos;s behavioural modelling uses machine learning to estimate the
              behaviour of visitors who declined analytics cookies from the behaviour of
              similar visitors who accepted. It requires an advanced implementation on
              every page and a property that collects at least 1,000 events a day with
              analytics storage denied for at least 7 days, and at least 1,000 daily users
              with it granted for at least 7 of the previous 28 days. Google notes that
              meeting those prerequisites does not guarantee eligibility.
            </p>
            <ul className={dashList}>
              <li><strong>What it estimates:</strong> users, sessions and new users, blended into standard reports with observed data.</li>
              <li><strong>What it does not touch:</strong> event counts such as page_view and session_start in standard explorations.</li>
              <li><strong>Where it does not exist:</strong> the BigQuery export and other data exports, audiences, user explorer, segments with sequences, retention reports and predictive metrics.</li>
            </ul>
            <p>
              Google Ads runs its own modelling. When a visitor does not consent, modelled
              conversions appear in the Conversions column and in the reports built on it,
              provided the account reaches 700 ad clicks over seven days per country and
              domain grouping. That is the number bidding runs on, and it is Google&apos;s
              estimate of Google&apos;s own contribution. How that plays out against
              measured revenue is covered in{" "}
              <Link href="/blog/measure-roas-after-cookie-consent" className={link}>how to measure ROAS after cookie consent</Link>.
            </p>

            <h2 className={h2}>How to see how much of your GA4 is modelled</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Check the implementation.</strong> In Tag Assistant, load a page with consent denied. If no Google Analytics request leaves the browser, you run basic mode and nothing is modelled from pings.</li>
              <li><strong>Switch the reporting identity.</strong> In GA4&apos;s admin, compare the same report under Blended and Observed. Blended adds modelling; Observed does not. Switching changes only the reports, not the data collected.</li>
              <li><strong>Read the difference by metric.</strong> Users and sessions move; page views in explorations do not. A large gap in users with no gap in page views is modelling at work.</li>
              <li><strong>Compare with the BigQuery export.</strong> The export contains observed data only. If your warehouse and the GA4 interface disagree on users, this is usually why.</li>
              <li><strong>Reconcile against orders.</strong> Neither Blended nor Observed tells you how many visits really happened. Your real orders are the only total that no analytics tool produces; the method is in{" "}<Link href="/use-cases/single-source-of-truth" className={link}>one number for marketing and finance</Link>.</li>
            </ol>

            <h2 className={h2}>What modelled data is good for, and what it is not</h2>
            <p>
              Modelled users and sessions are a reasonable way to keep a trend line from
              collapsing when consent rates change, and modelled conversions help Google
              Ads bid. They are not a substitute for measurement in three situations that
              matter to a budget owner:
            </p>
            <ul className={dashList}>
              <li><strong>Channel decisions.</strong> Google&apos;s documentation describes estimated users, sessions and new users. It does not describe giving each unconsented visit its own source, and the loss is not even across channels: at Incapto, Sealmetrics recorded 11% more direct traffic than GA4 but 37–52% more from paid campaigns and 133% more from organic social.</li>
              <li><strong>Anything downstream of the export.</strong> BI dashboards, data science and finance models built on BigQuery see observed data only.</li>
              <li><strong>Sites below the threshold.</strong> A property that never reaches the prerequisites gets no behavioural modelling at all, only the consented share.</li>
            </ul>

            <h2 className={h2}>The alternative: measure without needing consent</h2>
            <p>
              The other way to close the gap is to stop depending on analytics cookies.
              Sealmetrics stores nothing on the visitor&apos;s device and reads the source
              of every landing page from its UTMs or referrer, so each visit and each
              conversion is observed with its channel rather than estimated. Nothing is
              modelled, and the same numbers are in the dashboard, the API and the export.
              The architecture is explained in{" "}
              <Link href="/complete-data" className={link}>complete data</Link>.
            </p>
            <p>
              It has limits of its own, and they are the reverse of Consent Mode&apos;s.
              Sealmetrics does not identify users, so there are no retention reports,
              cohorts or cross-session journeys to estimate or observe. Ad blockers can
              still stop the tracker unless it is served from a subdomain of your own
              domain. And whether analytics without cookies is exempt from consent in your
              market depends on your configuration and your national authority&apos;s
              criteria.
            </p>
          </div>

          <CommercialModule hook="How much of your GA4 is modelled, and how much is missing? We run Sealmetrics next to GA4 with Consent Mode and reconcile both with your orders." />

          <RelatedReading currentSlug={SLUG} />

          <FaqSection items={FAQ} heading="Questions about Consent Mode data" />
        </div>
      </article>
    </>
  );
}
