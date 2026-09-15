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
 * Phase 4 of CONTENT-PLAN-PROBLEM-POSITIONING.md, post 5: problem B,
 * query "last-click vs data-driven / modelled attribution". Honest about what
 * modelling adds (plan §2.2).
 *
 * Sources (checked 14 Sep 2026):
 * - Analytics Help 10596866 and 16291112: GA4 offers data-driven, paid and
 *   organic last click (ignores direct) and Google paid channels last click;
 *   first click, linear, time decay and position-based removed November 2023;
 *   data-driven uses machine learning on converting and non-converting paths
 *   and a counterfactual approach over click interactions; conversions can be
 *   reattributed for up to 7 days; changing the model applies to historical
 *   data.
 * - Google, Meridian (developers.google.com/meridian; blog.google): open-source
 *   marketing mix model, generally available since early 2025.
 * - docs.sealmetrics.com reports/insights/attribution-model: session-scoped
 *   last click, most recent entrance, no cross-session lookback, ~2-hour
 *   inactivity window; multi-touch needs a persistent identifier.
 * Figures: Incapto, Palladium, Dreamplace as published in case-studies.tsx.
 */

const SLUG = "last-click-vs-modelled-attribution";
const URL = `/blog/${SLUG}`;
const HEADLINE = "Last-Click vs Modelled Attribution: What Each One Gets Right";
const DESCRIPTION =
  "Data-driven attribution answers a better question on the paths it can see; last click a narrower one without consent. When to use each, and what to add.";

export const metadata: Metadata = {
  title: "Last-Click vs Modelled Attribution: What Each Gets Right",
  description: DESCRIPTION,
  openGraph: {
    title: "Last-Click vs Modelled Attribution: What Each One Gets Right",
    description:
      "GA4 data-driven, platform models, marketing mix models and incrementality tests against last click without consent loss. Where each one fails, and how to combine them.",
    type: "article",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Last-Click vs Modelled Attribution: What Each One Gets Right",
    description:
      "GA4 data-driven, platform models, marketing mix models and incrementality tests against last click without consent loss. Where each one fails, and how to combine them.",
    images: [ogImage(`${URL}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(URL),
  },
};

const FAQ = [
  {
    question: "What is the difference between last-click and data-driven attribution?",
    answer:
      "Last click gives all the credit for a conversion to one interaction, the last click before it. Data-driven attribution uses machine learning on converting and non-converting paths to estimate how much each click interaction contributed, and splits the credit accordingly. The first is a rule you can audit; the second is a model you have to trust.",
  },
  {
    question: "Is data-driven attribution better than last click?",
    answer:
      "It answers a better question — how much did each touchpoint contribute — but only on the paths it can observe, which need a persistent identifier and therefore cookie consent in Europe. Last click answers a narrower question and can run without consent. Data-driven is better for bidding inside a platform; last click on complete data is often more reliable for budget between channels.",
  },
  {
    question: "Which attribution models does GA4 still offer?",
    answer:
      "Three: data-driven, paid and organic last click, and Google paid channels last click. First click, linear, time decay and position-based were removed in November 2023. GA4's last click ignores direct traffic, and changing the reporting model applies to historical data as well as future data.",
  },
  {
    question: "Why does last click undervalue upper-funnel campaigns?",
    answer:
      "Because video, display and prospecting social often work early, by being seen or clicked days before the purchase, and last click only credits the interaction that closes the conversion. Their contribution is real but invisible to the rule. Measure it with an incrementality test or a marketing mix model rather than by switching to a model that needs user-level tracking.",
  },
  {
    question: "Does multi-touch attribution work without cookies?",
    answer:
      "User-level multi-touch does not: splitting credit across one person's visits requires recognising that person across sessions. Two forms of modelled measurement do work without it. Marketing mix models use aggregate spend and outcomes over time, and incrementality tests compare regions or audiences with and without a campaign.",
  },
  {
    question: "What attribution model does Sealmetrics use?",
    answer:
      "Session-scoped last click. Each conversion is credited to the source of the session in which it happens, the most recent entrance, and a session closes after about two hours of inactivity. There is no cross-session lookback and no multi-touch model, because both would require a persistent identifier that Sealmetrics does not create. Direct sessions are not skipped: a conversion in a direct session is credited to direct.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const th = "text-left font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary font-semibold py-2 pr-4 border-b border-warm-200 align-bottom";
const td = "py-2 pr-4 border-b border-warm-100 align-top";

export default function LastClickVsModelledAttributionPage() {
  const dates = postDates(SLUG);

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Last-click vs modelled attribution" }]} />
      <JsonLd
        data={articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Attribution",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Last-click vs modelled attribution", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: HEADLINE, selectors: [".key-takeaways", ".tldr"] })} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Attribution
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              {HEADLINE}
            </h1>
            <PostByline {...dates} readTime="10 min read" authorName="Rafa Jiménez" authorUrl="/authors/rafa-jimenez" />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Last click gives a conversion to the final click before it. Modelled
            attribution estimates how much each touchpoint contributed. The model
            answers the better question, but a user-level model only sees the paths
            it can follow, which in Europe means visitors who accepted cookies. Use
            platform models to bid, last click without consent loss to allocate budget,
            and experiments or marketing mix models to value the upper funnel.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>GA4 now offers three models: data-driven, paid and organic last click, and Google paid channels last click. First click, linear, time decay and position-based went in November 2023.</li>
              <li>Data-driven attribution does something last click cannot: it credits assists by comparing converting and non-converting paths. That is a real advantage, not marketing.</li>
              <li>Its weakness is its input. A user-level model learns from paths it can follow, and following a person needs a persistent identifier and, in Europe, consent.</li>
              <li>Last click is narrow but auditable, identical across channels and possible without consent, so its totals can be reconciled with real orders.</li>
              <li>The upper funnel is better valued with incrementality tests and marketing mix models, which work on aggregate data, than by switching attribution models.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              The attribution debate usually arrives as a verdict: last click is
              obsolete, data-driven is the modern answer. It is a fair criticism of last
              click and an incomplete description of data-driven attribution. Both are
              tools with a precise job, and the mistake is using either one for a
              decision it was not built for.
            </p>
            <p>
              We have an interest to declare. Sealmetrics uses{" "}
              <Link href="/glossary/last-click-attribution" className={link}>last-click attribution</Link>{" "}
              and nothing else, on purpose. That is exactly why this piece starts with
              what modelled attribution does better, and only then with where it breaks.
            </p>

            <h2 className={h2}>The families of attribution in use today</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[640px]">
                <thead>
                  <tr>
                    <th className={th}>Approach</th>
                    <th className={th}>How it assigns credit</th>
                    <th className={th}>What it needs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={`${td} font-semibold`}>Last click (GA4)</td><td className={td}>All credit to the last paid or organic click; direct is ignored when there is an earlier source</td><td className={td}>A user identifier to look back past direct visits</td></tr>
                  <tr><td className={`${td} font-semibold`}>Session-scoped last click (Sealmetrics)</td><td className={td}>All credit to the source of the session in which the conversion happens, including direct</td><td className={td}>Nothing beyond the landing page&apos;s UTMs or referrer</td></tr>
                  <tr><td className={`${td} font-semibold`}>Data-driven (GA4, Google Ads)</td><td className={td}>Machine learning over converting and non-converting paths estimates each click interaction&apos;s contribution</td><td className={td}>Paths of identified users over time</td></tr>
                  <tr><td className={`${td} font-semibold`}>Platform-reported (Meta, Google Ads)</td><td className={td}>Each platform credits its own ads within its own settings, including views on some platforms</td><td className={td}>The platform&apos;s identity graph and pixels</td></tr>
                  <tr><td className={`${td} font-semibold`}>Marketing mix model</td><td className={td}>Statistical model of outcomes against spend per channel over time</td><td className={td}>A long history of aggregate spend and results; no user data</td></tr>
                  <tr><td className={`${td} font-semibold`}>Incrementality test</td><td className={td}>Compares regions or audiences with and without a campaign</td><td className={td}>A controlled experiment; no user data required</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className={h2}>What modelled attribution gets right</h2>
            <ul className={dashList}>
              <li><strong>It credits assists.</strong> Google describes data-driven attribution as comparing successful and unsuccessful paths and contrasting what happened with what could have happened. A channel that often appears before conversions, without closing them, gets credit.</li>
              <li><strong>It uses more signal.</strong> Timing, device, number of interactions, order of exposure and ad format all enter the model, where last click uses one fact.</li>
              <li><strong>It is what platform bidding runs on.</strong> Google Ads optimises towards the conversions its model credits. Replacing that number inside the platform is rarely a good idea.</li>
              <li><strong>Aggregate models reach where tracking cannot.</strong> A marketing mix model includes offline media and needs no user data at all. Google made its own, Meridian, open source and generally available in 2025.</li>
            </ul>

            <h2 className={h2}>What last click gets right</h2>
            <ul className={dashList}>
              <li><strong>It is auditable.</strong> Anyone can check why a conversion was credited where it was, and get the same answer tomorrow.</li>
              <li><strong>It is the same rule for every channel.</strong> A platform model credits its own ads; a single rule applied to all traffic does not take sides between Google, Meta and email.</li>
              <li><strong>It is stable.</strong> GA4 notes that conversions can be reattributed for up to seven days after they happen, and changing the reporting model rewrites history. A rule-based figure does not move after the fact.</li>
              <li><strong>It can run without consent.</strong> Session-scoped last click needs no identifier, so it does not depend on consent and its totals can be reconciled with the orders you really took.</li>
            </ul>

            <h2 className={h2}>Where each one fails</h2>
            <p>
              <strong>Last click undervalues the upper funnel.</strong> Video, display and
              prospecting social often work days before the purchase. A shopper who
              clicks a Meta ad on Monday and returns by typing your address on Friday is
              credited to direct. Nothing in the rule sees Monday.
            </p>
            <p>
              <strong>User-level models learn from a filtered sample.</strong> To split
              credit across a person&apos;s touchpoints, the model has to recognise that
              person across visits, which means a cookie or a login. In Europe, the paths
              it can follow are those of visitors who accepted cookies, and the loss is not
              even across channels: on{" "}
              <Link href="/case-studies/incapto" className={link}>Incapto&apos;s Shopify store</Link>,
              Sealmetrics recorded 11% more direct traffic than GA4, but 62% more from
              organic search and 133% more from organic social. A model trained on that
              sample learns the behaviour of the channels that survive consent best. Why
              this compounds is argued in{" "}
              <Link href="/blog/multi-touch-attribution-complete-data" className={link}>why multi-touch attribution fails without complete data</Link>.
            </p>
            <p>
              <strong>Platform models are not neutral.</strong> Each one sees only its own
              ads and credits them, so the same order can be claimed twice. That is fine
              for bidding and a problem for comparing channels, as{" "}
              <Link href="/blog/meta-ads-conversions-vs-crm" className={link}>Meta Ads conversions vs CRM</Link>{" "}
              shows in detail.
            </p>
            <p>
              <strong>Marketing mix models are slow and coarse.</strong> They need a long,
              varied history of spend and outcomes, work at channel level by week rather
              than by campaign by day, and are only as good as the outcome data fed into
              them.
            </p>

            <h2 className={h2}>Choose by decision, not by model</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[560px]">
                <thead>
                  <tr>
                    <th className={th}>Decision</th>
                    <th className={th}>Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={td}>Bids and budgets inside Google Ads or Meta</td><td className={td}>The platform&apos;s own attribution; it is what the algorithm optimises</td></tr>
                  <tr><td className={td}>Weekly budget between channels and campaigns</td><td className={td}>Last click without consent loss, reconciled with real orders</td></tr>
                  <tr><td className={td}>Whether an upper-funnel campaign adds revenue</td><td className={td}>An incrementality test: a holdout audience or regions without the campaign</td></tr>
                  <tr><td className={td}>Annual channel mix, including offline media</td><td className={td}>A marketing mix model on aggregate spend and outcomes</td></tr>
                  <tr><td className={td}>The number finance signs off</td><td className={td}>A rule-based figure checked against the order system</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              In practice the layers work together. Last click on complete data is the
              daily base; experiments run a few times a year on the campaigns whose value
              last click cannot see; a marketing mix model, where the history exists,
              sets the annual frame; and the platforms keep bidding on their own models.
              How to put last click and spend together per campaign is set out in{" "}
              <Link href="/blog/measure-roas-after-cookie-consent" className={link}>how to measure ROAS after cookie consent</Link>.
            </p>

            <h2 className={h2}>Valuing the upper funnel without changing the rule</h2>
            <p>
              There is a middle path that the published cases show. Instead of asking a
              purchase to credit a display campaign, measure the display campaign against
              an earlier conversion it can close.{" "}
              <Link href="/case-studies/palladium-hotel-group" className={link}>Palladium Hotel Group</Link>{" "}
              rebuilt its Display &amp; Video 360 buying around Cost-per-Search, using
              availability searches in the booking engine as the intent signal, and Display
              Cost-per-Search improved by 165%.{" "}
              <Link href="/case-studies/dreamplace-hotels" className={link}>Dreamplace Hotels</Link>{" "}
              reconciles attributed sales with its CRM total and attributes 15–20% more
              sales than its previous tool, which is what moved its Meta and Google budget.
            </p>

            <h2 className={h2}>What Sealmetrics does not do</h2>
            <p>
              Sealmetrics credits each conversion to the source of the session in which it
              happens. It has no multi-touch model, no view-through credit, no
              cross-session lookback and no data-driven attribution, because each of them
              needs a persistent identifier that it does not create. What it can do for
              modelled measurement is supply the inputs: aggregate conversions and revenue
              by channel and campaign, measured without consent loss, available through the API
              and the BigQuery connector for a marketing mix model or an experiment
              readout. The model itself is described in{" "}
              <Link href="/use-cases/revenue-attribution" className={link}>campaign revenue attribution</Link>.
            </p>
          </div>

          <CommercialModule hook="Modelled attribution on the consenting fraction, or last click without consent loss? See both on your own channel mix, reconciled with your orders." />

          <RelatedReading currentSlug={SLUG} />

          <FaqSection items={FAQ} heading="Questions about last-click and modelled attribution" />
        </div>
      </article>
    </>
  );
}
