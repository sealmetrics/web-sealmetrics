import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { RelatedGlossaryTerms } from "@/components/ui/RelatedGlossaryTerms";
import { FaqSection } from "@/components/ui/FaqSection";
import { definedTermSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

/**
 * Glossary definition of Google Consent Mode v2. Definitional on purpose: the
 * measured-vs-modelled method lives in /blog/consent-mode-measured-vs-modelled,
 * which this page links to rather than repeats.
 *
 * Sources (checked 15 Sep 2026):
 * - Google Tag Platform, "Consent mode overview"
 *   (developers.google.com/tag-platform/security/concepts/consent-mode, last
 *   updated 30 Jul 2026): the four consent types, basic vs advanced, what a
 *   cookieless ping contains, general vs advertiser-specific modelling.
 * - Google Ads Help 13695607, "Updates to consent mode for traffic in the
 *   EEA": stronger enforcement of the EU user consent policy; for EEA end
 *   users, consent must be collected and consent signals shared with Google to
 *   keep using tags for measurement, ad personalisation and remarketing;
 *   ad_user_data and ad_personalization introduced for this.
 * - Google Ads Help 16142339, "Verify your consent signals for EEA users":
 *   consent is required in the EEA, the United Kingdom and Switzerland.
 * - Google, "Complying with the Digital Markets Act" (blog.google, 5 Mar 2024):
 *   upgrades to advertising products to help advertisers communicate consent,
 *   in accordance with the EU end user consent policy.
 * - Analytics Help 11161109, 10976610 and Google Ads Help 10548233: as cited
 *   in the blog post (modelling thresholds, Blended vs Observed, 700 ad clicks).
 * - docs.sealmetrics.com/faq/glossary ("Sealmetrics does not use Consent Mode")
 *   and /troubleshooting/gtm-consent-mode-blocking.
 * Figures and quote: Incapto as published in case-studies.tsx.
 */

const URL = "/glossary/consent-mode-v2";
const SOCIAL =
  "The four consent types, basic vs advanced mode, what GA4 and Google Ads model, why it matters for EEA ads, and what it does not restore.";

export const metadata: Metadata = {
  title: "What Is Google Consent Mode v2? — Sealmetrics Glossary",
  description:
    "Consent Mode v2 passes a visitor's consent choices to Google tags. What basic and advanced mode send, what Google models, and what it does not restore.",
  openGraph: {
    title: "What Is Google Consent Mode v2?",
    description: SOCIAL,
    type: "article",
    url: "https://sealmetrics.com/glossary/consent-mode-v2/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/consent-mode-v2/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Google Consent Mode v2?",
    description: SOCIAL,
    images: [ogImage("/glossary/consent-mode-v2/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/consent-mode-v2/",
    languages: getAlternates(URL),
  },
};

const FAQ = [
  {
    question: "What is the difference between Consent Mode v1 and v2?",
    answer:
      "Version 2 adds two consent types, ad_user_data and ad_personalization, to the original ad_storage and analytics_storage. Google introduced them for traffic from the European Economic Area as part of stronger enforcement of its EU user consent policy: the two new signals say whether a visitor agreed to their data being sent to Google for advertising and to personalised ads.",
  },
  {
    question: "Is Consent Mode v2 mandatory?",
    answer:
      "Not as a law in itself. It is Google's requirement: to keep using Google tags for measurement, ad personalisation and remarketing with visitors in the EEA, advertisers must collect consent and send consent signals to Google, and Google's verification page also lists the United Kingdom and Switzerland. Consent Mode is Google's mechanism for sending them. A site that runs no Google tags has nothing to send.",
  },
  {
    question: "Does Consent Mode v2 recover the data lost to cookie rejection?",
    answer:
      "Partly, and as an estimate. Advanced mode sends cookieless pings when consent is denied, GA4 models users, sessions and new users once a property meets Google's thresholds, and Google Ads models conversions above 700 ad clicks over seven days per country and domain grouping. None of that turns a refused visit back into an observed session with its own traffic source.",
  },
  {
    question: "Does modelled Consent Mode data reach BigQuery?",
    answer:
      "No. Google lists data export, including the BigQuery export, among the features without modelled data, together with audiences, user explorer, segments with sequences, retention reports and predictive metrics. A warehouse built on the export shows observed data only, so it will usually show fewer users than GA4's Blended reports.",
  },
  {
    question: "Does Consent Mode v2 make analytics GDPR compliant?",
    answer:
      "Not on its own. Consent Mode carries the choice a visitor made in your consent banner to Google's tags; it does not decide whether you have a lawful basis or whether a banner is needed. Advanced mode also sends pings while consent is denied, including before the visitor answers, which is worth reviewing with your DPO against your national authority's criteria.",
  },
  {
    question: "Does Sealmetrics use Consent Mode v2?",
    answer:
      "No. Sealmetrics sets no cookies and stores nothing on the visitor's device, so there is no storage for a consent type to switch on or off. If you run Google Ads, Google's own tags still need Consent Mode; Sealmetrics runs alongside them and does not send conversions to ad platforms. Whether a cookieless deployment is exempt from consent depends on its configuration and on your national authority's criteria.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const th =
  "text-left font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary font-semibold py-2 pr-4 border-b border-warm-200 align-bottom";
const td = "py-2 pr-4 border-b border-warm-100 align-top";

export default function ConsentModeV2Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Google Consent Mode v2" }]} />
      <JsonLd
        data={definedTermSchema({
          name: "Google Consent Mode v2",
          description:
            "Google's API for passing a visitor's consent choices to Google Analytics and Google Ads tags through four consent types: ad_storage, analytics_storage, ad_user_data and ad_personalization. With consent denied, tags send nothing (basic mode) or cookieless pings (advanced mode), and Google models part of what is missing.",
          url: URL,
          related: [
            { name: "Consent Management Platform", url: "/glossary/consent-management-platform" },
            { name: "GDPR Analytics Compliance", url: "/glossary/gdpr-analytics-compliance" },
            { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" },
            { name: "Cookieless Analytics", url: "/glossary/cookieless-analytics" },
          ],
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Google Consent Mode v2", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Google Consent Mode v2</h1>
          </header>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <div className="p-6 bg-warm-white border border-warm-100">
              <p data-speakable className="text-[1rem] text-text-primary font-medium">
                Google Consent Mode v2 is the API through which a website&rsquo;s consent banner tells Google Analytics and Google Ads tags what a visitor chose, using four consent types. When consent is denied, the tags send nothing in basic mode or cookieless pings in advanced mode, and Google models part of what is missing.
              </p>
            </div>

            <p>
              Consent Mode is not a consent banner and not a legal basis. It is a signalling layer between the two: your{" "}
              <Link href="/glossary/consent-management-platform" className={link}>consent management platform</Link>{" "}
              collects the choice, Consent Mode hands it to Google&rsquo;s tags, and the tags adjust what they store and send. What happens to the visitors who refuse depends on the implementation, on how much traffic the site has and on which Google report you read.
            </p>

            <h2 className={h2}>What are the four consent parameters?</h2>
            <p>Google defines four consent types. Each is either granted or denied, and in advanced mode the defaults are typically set to denied until the visitor answers:</p>
            <ul className={dashList}>
              <li><code>ad_storage</code> — storage such as cookies or device identifiers related to advertising.</li>
              <li><code>analytics_storage</code> — storage such as cookies or device identifiers related to analytics, for example visit duration.</li>
              <li><code>ad_user_data</code> — whether user data may be sent to Google for online advertising.</li>
              <li><code>ad_personalization</code> — whether consent was given for personalised advertising.</li>
            </ul>
            <p>
              The first two are about what the tag may store on the device. The last two are what version 2 added, and they are about what Google may do with the data once it has it. That distinction is why a site can deny storage and still send a ping, and why a setup that handles analytics cookies correctly can still be missing the two advertising signals.
            </p>

            <h2 className={h2}>Basic mode vs advanced mode</h2>
            <p>The same four parameters produce two very different data flows depending on when Google&rsquo;s tags are allowed to load:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[560px]">
                <thead>
                  <tr>
                    <th className={th}></th>
                    <th className={th}>Basic mode</th>
                    <th className={th}>Advanced mode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={`${td} font-semibold`}>Before the visitor answers</td><td className={td}>Tags are blocked; nothing is sent</td><td className={td}>Tags load with consent denied</td></tr>
                  <tr><td className={`${td} font-semibold`}>Visitor refuses</td><td className={td}>Nothing reaches Google, not even the consent state</td><td className={td}>Cookieless pings: timestamp, user agent, referrer, consent state, ad-click identifiers</td></tr>
                  <tr><td className={`${td} font-semibold`}>Modelling available</td><td className={td}>A general conversion model</td><td className={td}>Advertiser-specific conversion modelling; GA4 behavioural modelling when eligible</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Advanced mode gives Google more to model with, and it also sends data while consent is denied, including before the visitor has answered. Which trade-off is acceptable is a question for your DPO, not for the tag configuration.
            </p>

            <h2 className={h2}>What is measured and what is modelled?</h2>
            <p>
              <strong>Measured:</strong> visitors who grant <code>analytics_storage</code> are observed as usual, with users, sessions, events, sources and conversions. For visitors who refuse, basic mode observes nothing. Advanced mode observes that a hit happened, but without a cookie there is no identifier to join one hit to the next, so the pings cannot be assembled into users and sessions the way consented hits are.
            </p>
            <p>
              <strong>Modelled:</strong> GA4&rsquo;s behavioural modelling estimates users, sessions and new users for visitors who declined, from the behaviour of similar visitors who accepted. It needs advanced mode on every page and a property with at least 1,000 events a day with analytics storage denied for 7 days, plus at least 1,000 daily users with it granted for 7 of the previous 28 days, and Google notes that meeting those prerequisites does not guarantee eligibility. The estimates appear under the Blended reporting identity and not under Observed. Google Ads models conversions separately, in its Conversions column, once an account reaches 700 ad clicks over seven days per country and domain grouping.
            </p>
            <p>
              How to read the modelled share in your own property, metric by metric, is set out in{" "}
              <Link href="/blog/consent-mode-measured-vs-modelled" className={link}>Consent Mode: what GA4 measures and what it models</Link>.
            </p>

            <h2 className={h2}>Why Consent Mode v2 matters for Google Ads in the EEA</h2>
            <p>
              The Digital Markets Act regulates Google as a gatekeeper; what reaches an advertiser is Google&rsquo;s EU user consent policy. When Google set out its Digital Markets Act changes in March 2024, it described upgrades to its advertising products to help advertisers communicate consent under that policy. Google&rsquo;s Ads Help is explicit about the consequence: to keep using its tags for measurement, ad personalisation and remarketing with end users in the European Economic Area, an advertiser must collect consent and share consent signals with Google. Google&rsquo;s page for verifying those signals lists the EEA, the United Kingdom and Switzerland as regions where consent is required.
            </p>
            <p>
              In practice that makes Consent Mode v2 the price of keeping Google Ads measurement, personalisation and remarketing working for European traffic, not an optional analytics refinement. It says nothing about how much of that traffic your own analytics will see.
            </p>

            <h2 className={h2}>What Consent Mode v2 does not restore</h2>
            <ul className={dashList}>
              <li><strong>The source of each refused visit.</strong> Modelling estimates totals; it does not give an unconsented visit its own channel in your reports.</li>
              <li><strong>Modelled data outside the interface.</strong> The BigQuery export and other data exports, audiences, user explorer, segments with sequences, retention reports and predictive metrics contain no modelled data.</li>
              <li><strong>Anything below the threshold.</strong> A property that never meets the prerequisites gets no behavioural modelling, only the consented share.</li>
              <li><strong>A lawful basis.</strong> Consent Mode transmits a choice; it does not make the processing behind it lawful. That assessment sits with <Link href="/glossary/gdpr-analytics-compliance" className={link}>GDPR analytics compliance</Link> and the <Link href="/glossary/eprivacy-directive" className={link}>ePrivacy Directive</Link>.</li>
            </ul>
            <p>
              Incapto, a Shopify store running GA4 with Consent Mode, is a measured example of the gap. Rosa Tomàs, its B2C Acquisition Manager, put it this way: &ldquo;Consent Mode left us with a structural blind spot: we knew there was traffic we were not seeing, but we had no way to size it.&rdquo; When the team ran Sealmetrics next to GA4 for 48 days, GA4 did not record 29% of visits. In a later ten-day window, 14% of GA4 visits had no usable origin, against 0.3% in Sealmetrics. The details are in the{" "}
              <Link href="/case-studies/incapto" className={link}>Incapto case study</Link>, and the wider picture in{" "}
              <Link href="/glossary/data-loss-in-analytics" className={link}>data loss in analytics</Link>.
            </p>

            <h2 className={h2}>How cookieless measurement differs</h2>
            <p>
              Consent Mode exists because Google&rsquo;s tags depend on cookies and identifiers. <Link href="/glossary/cookieless-analytics" className={link}>Cookieless analytics</Link> removes that dependency instead of modelling around it. Sealmetrics does not use Consent Mode: it sets no cookies and stores nothing on the visitor&rsquo;s device, so there is no storage for a consent type to grant or deny. It reads the source of each landing page from its UTM parameters or referrer, so the visits it records carry their channel rather than an estimate, and the same figures appear in the dashboard, the API and the export. The architecture is explained in{" "}
              <Link href="/complete-data" className={link}>complete data</Link>.
            </p>
            <p>
              The limits run the other way. Sealmetrics identifies no one, so there are no user-level retention reports, cohorts or cross-session journeys. It does not send conversions to Google Ads, so it does not replace Consent Mode for bidding. Ad blockers can still stop the tracker unless it is served from a subdomain of your own domain. And whether a cookieless deployment is exempt from consent depends on its configuration and on your national authority&rsquo;s criteria. If that assessment concludes it is, the common mistake is in Google Tag Manager: a Sealmetrics tag left behind a consent gate reports only the visitors who accept, which the{" "}
              <a href="https://docs.sealmetrics.com/troubleshooting/gtm-consent-mode-blocking" className={link}>Sealmetrics documentation</a>{" "}
              lists as the most common cause of missing data.
            </p>
          </div>

          <CommercialModule hook="Consent Mode tells Google what a visitor chose. We run Sealmetrics next to GA4 with Consent Mode and show you how much of your traffic is measured, modelled or missing." />

          <FaqSection items={FAQ} heading="Questions about Consent Mode v2" />

          <RelatedGlossaryTerms slug="consent-mode-v2" />
        </div>
      </article>
    </>
  );
}
