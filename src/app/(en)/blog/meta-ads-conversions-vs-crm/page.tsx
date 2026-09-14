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
 * Phase 4 of CONTENT-PLAN-PROBLEM-POSITIONING.md, post 3: problems B and C,
 * query "Meta Ads conversions vs CRM".
 *
 * Sources (checked 14 Sep 2026):
 * - Meta for Developers, "Deduplicate pixel and server events": the pixel's
 *   eventID must match the Conversions API event_id and the event names must
 *   match; deduplication applies within 48 hours; the first event received is
 *   generally kept.
 * - Meta attribution settings: stated only in general terms (click-through,
 *   engage-through and view-through at ad set level) because Meta changed its
 *   defaults in 2026 and its Help Center could not be fetched to confirm them.
 * - docs.sealmetrics.com web-analytics-prompts/meta-ads (spend from Meta, revenue
 *   from Sealmetrics matched on UTMs; iOS gap by device) and
 *   how-to-track-social-ads-campaigns (UTMs required for Meta).
 * - Sealmetrics does not push conversions to ad platforms, does not store order
 *   IDs and does not match users (product facts).
 * Figures: Dreamplace and Incapto as published in case-studies.tsx.
 * No promise of deduplication or user matching (plan §2.2).
 */

const SLUG = "meta-ads-conversions-vs-crm";
const URL = `/blog/${SLUG}`;
const HEADLINE = "Meta Ads Conversions vs CRM: Why They Never Match, and How to Reconcile Them";
const DESCRIPTION =
  "Meta counts the conversions its ads may have influenced; your CRM counts the ones that exist. Why the numbers differ, what each gap means, and a weekly method.";

export const metadata: Metadata = {
  title: "Meta Ads Conversions vs CRM: Why They Never Match",
  description: DESCRIPTION,
  openGraph: {
    title: "Meta Ads Conversions vs CRM: Why They Never Match",
    description:
      "View-through credit, modelled conversions, duplicate events and different dates. What each gap between Meta and your CRM means, and how to reconcile on totals.",
    type: "article",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Meta Ads Conversions vs CRM: Why They Never Match",
    description:
      "View-through credit, modelled conversions, duplicate events and different dates. What each gap between Meta and your CRM means, and how to reconcile on totals.",
    images: [ogImage(`${URL}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(URL),
  },
};

const FAQ = [
  {
    question: "Why does Meta Ads show more conversions than my CRM?",
    answer:
      "Because Meta counts conversions its ads may have influenced, within the attribution setting of each ad set, and that can include conversions after a view as well as after a click, plus modelled conversions it cannot observe directly. Other channels claim some of the same orders, and a pixel and Conversions API sending the same event without a shared event_id are counted twice.",
  },
  {
    question: "Why does Meta show fewer conversions than my CRM?",
    answer:
      "Usually because part of the conversions never reach Meta: the pixel waits for consent and the visitor rejected it, an ad blocker stopped it, the Conversions API is not sending that event, or the conversion happened offline or by phone. The CRM total also includes customers that no Meta ad ever touched.",
  },
  {
    question: "Can I match Meta Ads conversions to individual CRM records?",
    answer:
      "Not reliably from Ads Manager, which reports conversions in aggregate by campaign, ad set and ad. Reconcile on totals and ratios per week instead: Meta-reported conversions, conversions measured on your site from Meta traffic, and the CRM total for the same period and timezone.",
  },
  {
    question: "Does the Conversions API fix the gap with the CRM?",
    answer:
      "It closes the part caused by the browser: blocked or consent-gated pixels. It does not change what Meta credits to itself, and it adds a new risk. Meta only deduplicates pixel and server events when the event names match and the pixel's eventID equals the server event_id, received within 48 hours; without that, the same purchase counts twice.",
  },
  {
    question: "Which Meta attribution setting should I compare with the CRM?",
    answer:
      "Compare more than one. Use Ads Manager's option to compare attribution settings and look at click-through alone next to the default setting. The click-only figure is the closest to what your site can measure from Meta traffic; the difference to the default is the credit Meta takes for views and engagement.",
  },
  {
    question: "Does Sealmetrics send conversions back to Meta?",
    answer:
      "No. Sealmetrics does not push conversions to ad platforms, so Meta's pixel or Conversions API keeps feeding its bidding. Sealmetrics measures, on every session, the conversions and revenue from visits that arrived from Meta ads, identified by their UTMs, and that total is what you set next to the CRM.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const h3 = "font-serif text-[1.15rem] font-medium text-text-primary mt-8 mb-3";
const th = "text-left font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary font-semibold py-2 pr-4 border-b border-warm-200 align-bottom";
const td = "py-2 pr-4 border-b border-warm-100 align-top";

export default function MetaAdsConversionsVsCrmPage() {
  const dates = postDates(SLUG);

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Meta Ads conversions vs CRM" }]} />
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
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Meta Ads conversions vs CRM", url: URL }])} />
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
            <PostByline {...dates} readTime="9 min read" authorName="Rafa Jiménez" authorUrl="/authors/rafa-jimenez" />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Meta Ads and your CRM do not disagree about the same number. Meta counts
            the conversions its ads may have influenced, within its own attribution
            setting and partly modelled; the CRM counts the leads and orders that
            exist. Reconcile them on weekly totals with a third figure in the middle:
            conversions measured on your site from Meta traffic, on every session.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>Meta credits conversions to its own ads within each ad set&apos;s attribution setting, which can include views and engagement as well as clicks, and fills what it cannot observe with modelling.</li>
              <li>The CRM counts records: every qualified lead or paid order, from every channel, on the date it was created.</li>
              <li>Duplicate pixel and Conversions API events are a common cause of inflated Meta numbers: Meta deduplicates only when event names match and the event IDs are equal, within 48 hours.</li>
              <li>Row-by-row matching is the wrong goal. Compare three weekly totals — Meta-reported, measured on site from Meta traffic, CRM — and read the ratios.</li>
              <li>Dreamplace Hotels uses its CRM total as the reconciliation point and attributes 15–20% more sales than its previous tool; Meta and Google were the first budgets it moved.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              The meeting goes the same way every month. The paid social agency shows
              Ads Manager with 412 purchases. The CRM, or the store&apos;s order system,
              shows 1,180 orders in total, and nobody can say how many of them came
              from Meta. Finance asks whether 412 is a third of the business or a
              generous estimate. Nobody in the room can answer, because the two numbers
              were never meant to be compared directly.
            </p>
            <p>
              The figures above are illustrative, but the structure is not. It is the
              same conversation{" "}
              <Link href="/use-cases/single-source-of-truth" className={link}>one number for marketing and finance</Link>{" "}
              is about: each system counts something different, and the disagreement
              only ends when every team reads the same reconciled figure. This piece is
              the Meta-specific version, with what each gap usually means and a weekly
              method to close the discussion.
            </p>

            <h2 className={h2}>What each system is actually counting</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[640px]">
                <thead>
                  <tr>
                    <th className={th}></th>
                    <th className={th}>Meta Ads Manager</th>
                    <th className={th}>Site analytics, every session</th>
                    <th className={th}>CRM or order system</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={`${td} font-semibold`}>Unit</td><td className={td}>Conversion events credited to an ad</td><td className={td}>Conversions in sessions that arrived from a Meta ad</td><td className={td}>Lead or order records</td></tr>
                  <tr><td className={`${td} font-semibold`}>Credit rule</td><td className={td}>The ad set&apos;s attribution setting: clicks, and depending on it, engagement and views</td><td className={td}>Last click within the session, from the landing page UTMs</td><td className={td}>None, or a source field captured at creation</td></tr>
                  <tr><td className={`${td} font-semibold`}>Unobserved conversions</td><td className={td}>Partly modelled</td><td className={td}>Not counted</td><td className={td}>Not applicable</td></tr>
                  <tr><td className={`${td} font-semibold`}>Other channels</td><td className={td}>Invisible; the same order can also be claimed by Google or email</td><td className={td}>Each session has one channel</td><td className={td}>All included in the total</td></tr>
                  <tr><td className={`${td} font-semibold`}>Status</td><td className={td}>Whatever event fired</td><td className={td}>Whatever event fired</td><td className={td}>Qualified, paid, cancelled, refunded</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Read that way, the numbers are not supposed to match. What you can expect
              is that the gaps between them are stable and explainable. When they are
              not, something changed.
            </p>

            <h2 className={h2}>Why Meta reports more conversions than the CRM</h2>

            <h3 className={h3}>1. Credit for views and engagement</h3>
            <p>
              An ad set&apos;s attribution setting can credit a conversion to an ad
              that was seen or engaged with, not only clicked. Those conversions are
              real orders in your CRM, but nothing in the visit that produced them
              points to Meta. Ads Manager&apos;s option to compare attribution settings
              shows how much of the reported total is click-through alone.
            </p>

            <h3 className={h3}>2. Several channels claim the same order</h3>
            <p>
              A shopper who clicks a Meta ad on Monday, a Google Shopping ad on
              Wednesday and a newsletter on Friday can be claimed by all three
              platforms. Each reports it in good faith within its own window. The CRM
              has one order. Add the platform totals together and they exceed the
              orders you took.
            </p>

            <h3 className={h3}>3. Modelled conversions</h3>
            <p>
              Where Meta cannot observe a conversion, for example from iOS users who
              opted out of tracking, it estimates part of them with statistical
              modelling. Those conversions have no individual record behind them that
              you could find in the CRM.
            </p>

            <h3 className={h3}>4. The same event sent twice</h3>
            <p>
              Running the pixel and the Conversions API together is common and useful,
              but Meta only removes the duplicate when both events have the same name
              and the pixel&apos;s event ID equals the server&apos;s event_id, received
              within 48 hours. A missing or mismatched ID means one purchase is counted
              twice. This is the first thing to check when Meta suddenly jumps.
            </p>

            <h3 className={h3}>5. Different definitions of a conversion</h3>
            <p>
              A Lead event that fires when a form is submitted is not a qualified lead
              in the CRM, and a Purchase event on a thank-you page that can be reloaded
              is not a paid order. Cancelled, refunded, unpaid and test orders remain in
              the event stream and drop out of the CRM.
            </p>

            <h3 className={h3}>6. Different dates and timezones</h3>
            <p>
              Check whether your Ads Manager report places a conversion on the day of
              the ad interaction or on the day of the conversion, and in which timezone
              the ad account runs. The CRM uses the date the record was created, in its
              own timezone. Near the edge of a month, the same order sits in different
              periods.
            </p>

            <h2 className={h2}>Why Meta can also report fewer</h2>
            <ul className={dashList}>
              <li><strong>The pixel never fired.</strong> A consent-gated pixel does not run for visitors who reject the banner, and ad blockers stop it for others. Without the Conversions API, those conversions do not reach Meta.</li>
              <li><strong>The conversion happened elsewhere.</strong> Phone orders, showroom visits and leads closed by sales have no browser event for Meta to receive.</li>
              <li><strong>The CRM includes everyone.</strong> Direct, organic, email and customers no ad ever touched are in the CRM total and in no Meta report.</li>
            </ul>

            <h2 className={h2}>Why row-by-row matching is the wrong goal</h2>
            <p>
              The instinct is to export both lists and join them order by order. Ads
              Manager does not give you that list: it reports conversions in aggregate by
              campaign, ad set and ad. Building one means identifying people across
              systems, which is exactly what consent rules restrict, and it would still
              not tell you whether the ad caused the order.
            </p>
            <p>
              Sealmetrics does not do it either, by design: it does not identify users
              and it does not store order IDs. What it gives you is the middle column of
              the table above — conversions and revenue from sessions that arrived from
              Meta ads, measured on every session whether or not the visitor accepted
              the banner, and credited by{" "}
              <Link href="/glossary/last-click-attribution" className={link}>last click</Link>{" "}
              within the session. That column is what turns two incompatible numbers
              into three comparable ones.
            </p>

            <h2 className={h2}>A weekly reconciliation method</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li><strong>Define the conversion once.</strong> Decide what the CRM counts — paid orders, or leads at a given stage — and make the Meta event fire on the closest equivalent.</li>
              <li><strong>Remove duplicate events.</strong> If you run the pixel and the Conversions API, send the same event name and the same event ID from both, and check Events Manager for duplicated purchases.</li>
              <li><strong>Tag every Meta ad.</strong> Add utm_source (facebook or instagram), utm_medium, utm_campaign and utm_content for the ad, so that every visit from Meta is identifiable on your site without a cookie.</li>
              <li><strong>Build three weekly columns.</strong> Meta-reported conversions, with the attribution setting written next to them and the click-only figure beside them; conversions measured on site from Meta traffic; and the CRM total, all for the same week and timezone.</li>
              <li><strong>Check the site total against the CRM first.</strong> If the conversions you measure on site from all channels do not come close to the CRM total, fix the tracking before reading Meta. A confirmation page that does not always load is the usual culprit.</li>
              <li><strong>Read the ratios, not the difference.</strong> A stable ratio between Meta-reported and site-measured conversions is a calibration you can plan with. A ratio that moves without a change in campaigns is a signal to investigate.</li>
            </ol>

            <h2 className={h2}>What each gap usually means</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className={th}>What you see</th>
                    <th className={th}>Most likely reading</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={td}>Meta default well above Meta click-only; click-only close to site-measured</td><td className={td}>Meta is taking credit for views and engagement. Healthy, but not revenue you can see in a visit</td></tr>
                  <tr><td className={td}>Meta click-only well above site-measured</td><td className={td}>Duplicate events, or UTMs lost in redirects so Meta visits are not recognised on site</td></tr>
                  <tr><td className={td}>Site total well below the CRM total</td><td className={td}>Tracking gap: conversions that never fire on site, or offline and phone sales in the CRM</td></tr>
                  <tr><td className={td}>Meta well below site-measured Meta conversions</td><td className={td}>Consent-gated or blocked pixel with no Conversions API</td></tr>
                  <tr><td className={td}>Ratio stable for weeks, then jumps</td><td className={td}>A tracking change: a new consent setup, a theme change, a second pixel, an attribution setting</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className={h2}>What this looks like in practice</h2>
            <p>
              <Link href="/case-studies/dreamplace-hotels" className={link}>Dreamplace Hotels</Link>{" "}
              runs Sealmetrics as an independent measurement layer, compares the sales
              it attributes with the total in its CRM and treats the remaining gap as a
              quality signal. On that basis it attributes 15–20% more sales than its
              previous tool, and Meta and Google were the first budgets it moved. The
              base matters for Meta in particular: on{" "}
              <Link href="/case-studies/incapto" className={link}>Incapto&apos;s Shopify store</Link>,
              Sealmetrics recorded 133% more organic social traffic and 37–52% more
              paid-campaign traffic than GA4 over the same days, so a social channel
              judged in consent-gated analytics starts from a much smaller number than
              the one that exists.
            </p>
            <p>
              The same approach, applied to spend, gives you a ROAS per campaign you can
              move budget on; the steps are in{" "}
              <Link href="/blog/measure-roas-after-cookie-consent" className={link}>how to measure ROAS after cookie consent</Link>.
            </p>
          </div>

          <CommercialModule hook="Meta says one number, your CRM another? We measure conversions from Meta traffic on every session and set them between the two, week by week." />

          <RelatedReading currentSlug={SLUG} />

          <FaqSection items={FAQ} heading="Questions about Meta Ads and CRM numbers" />
        </div>
      </article>
    </>
  );
}
