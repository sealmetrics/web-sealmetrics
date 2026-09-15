import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { getAlternates } from "@/lib/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqSection } from "@/components/ui/FaqSection";
import { HowToSteps } from "@/components/ui/HowToSteps";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, speakableWebPageSchema } from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";
import { ROAS_FAQ_EN as FAQ, ROAS_STEPS_EN as STEPS } from "@/lib/content/roas-after-consent";

/**
 * Phase 4 of CONTENT-PLAN-PROBLEM-POSITIONING.md, post 2: problem B
 * ("I don't know which campaigns work"), query "how to measure ROAS after
 * cookie consent". Sources are listed in src/lib/content/roas-after-consent.ts.
 */

const SLUG = "measure-roas-after-cookie-consent";
const URL = `/blog/${SLUG}`;
const HEADLINE = "How to Measure ROAS After Cookie Consent: A Seven-Step Method";
const DESCRIPTION =
  "Consent pushes ROAS in two directions: analytics undercounts, ad platforms model and self-credit. A seven-step method to get a ROAS you can allocate budget on.";

export const metadata: Metadata = {
  title: "How to Measure ROAS After Cookie Consent — 7 Steps",
  description: DESCRIPTION,
  openGraph: {
    title: "How to Measure ROAS After Cookie Consent",
    description:
      "Your analytics undercounts paid revenue and your ad platforms fill the gap with modelling. How to get one ROAS per campaign you can move budget on.",
    type: "article",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "How to Measure ROAS After Cookie Consent",
    description:
      "Your analytics undercounts paid revenue and your ad platforms fill the gap with modelling. How to get one ROAS per campaign you can move budget on.",
    images: [ogImage(`${URL}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(URL),
  },
};

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const th = "text-left font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary font-semibold py-2 pr-4 border-b border-warm-200";
const td = "py-2 pr-4 border-b border-warm-100 tabular-nums";

export default function MeasureRoasAfterConsentPage() {
  const dates = postDates(SLUG);

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "How to measure ROAS after cookie consent" }]} />
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
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "How to measure ROAS after cookie consent", url: URL }])} />
      <JsonLd
        data={howToSchema({
          name: "How to measure ROAS after cookie consent",
          description: "Seven steps to calculate a return on ad spend per campaign that does not depend on who accepted the cookie banner.",
          url: URL,
          steps: STEPS,
        })}
      />
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
            To measure ROAS after cookie consent, calculate it twice: once with the
            revenue each ad platform reports, and once with revenue measured
            without consent loss and reconciled with your real orders, both divided by the
            same spend. Use the platform number to bid inside the platform and the
            measured number to move budget between channels.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>Consent distorts ROAS in two opposite directions: consent-gated analytics undercounts paid revenue, while ad platforms fill the gap with modelled and view-through conversions credited to their own ads.</li>
              <li>The undercount is uneven. On Incapto&apos;s Shopify store, GA4 put paid campaigns at 50% of traffic; measured without consent loss they were 62%.</li>
              <li>A defensible ROAS needs three things in the same period, timezone and currency: tagged clicks, revenue reconciled with real orders, and spend per campaign from each platform.</li>
              <li>Session-scoped last-click ROAS is a floor for upper-funnel campaigns, not a verdict. Test before cutting them.</li>
              <li>Dreamplace Hotels moved Meta and Google budget once its measured sales were checked against the CRM total.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Ask a European eCommerce team for the ROAS of its best campaign and you
              will often get three answers. Google Ads has one, Meta has another, and
              GA4 has a third that is lower than both. None of them is lying. Each is
              measured on a different base, and since the cookie banner arrived, those
              bases have drifted further apart every year.
            </p>
            <p>
              <Link href="/glossary/return-on-ad-spend" className={link}>ROAS</Link> is
              revenue attributed to a campaign divided by what the campaign cost. The
              spend side is not in dispute: the platform that charged you knows it to
              the cent. Every argument about ROAS is about the revenue side — which
              orders are counted, and which campaign gets them. That is the part
              consent broke, and it is the part{" "}
              <Link href="/use-cases/revenue-attribution" className={link}>campaign revenue attribution</Link>{" "}
              has to fix.
            </p>

            <h2 className={h2}>Why consent pushes ROAS in two directions at once</h2>
            <p>
              <strong>Consent-gated analytics undercounts.</strong> A GA4 tag that
              waits for the banner does not record the visitor who rejects it, and the
              ones who accept on the second page lose the UTMs of the landing page. The
              loss is not proportional across channels. On{" "}
              <Link href="/case-studies/incapto" className={link}>Incapto&apos;s Shopify store</Link>,
              Sealmetrics recorded 11% more direct traffic than GA4 but 37–52% more
              traffic from paid campaigns. Paid campaigns were 50% of traffic in GA4
              and 62% measured without consent loss. An analytics ROAS built on that base
              makes paid media look worse than it is. Why the lost visits end up as
              direct is explained in{" "}
              <Link href="/blog/why-ga4-shows-direct-none" className={link}>why GA4 shows (direct) / (none)</Link>.
            </p>
            <p>
              <strong>Ad platforms fill the gap, in their own favour.</strong> When a
              user does not consent, Google&apos;s Consent Mode stops its tags reading
              or writing advertising cookies, and Google Ads models the conversions
              it cannot observe. Those modelled conversions appear in the Conversions
              column, and the modelling needs a minimum of 700 ad clicks over seven
              days per country and domain grouping. Meta&apos;s attribution settings
              credit conversions after a view as well as after a click. Each platform
              credits conversions to its own ads within its own windows, so a single
              order can be claimed by Google and by Meta at the same time, and the
              sum of platform-reported conversions can exceed the orders you took.
            </p>
            <p>
              The result is a ROAS that is too low in analytics and generous in the
              platforms. Averaging the two does not fix it. What fixes it is a revenue
              figure measured on a base that does not depend on the banner, checked
              against an order total that no tool produces.
            </p>

            <h2 className={h2}>What goes into each side of the formula</h2>
            <ul className={dashList}>
              <li><strong>Spend:</strong> media cost per campaign from the platform, for the same dates, timezone and currency as the revenue. Agency fees and production costs belong in a separate profitability view, not in ROAS.</li>
              <li><strong>Revenue:</strong> the order value you record at purchase, defined once — with or without tax and shipping — and applied the same way to every channel. Decide whether refunds come out before you compare periods.</li>
              <li><strong>Attribution rule:</strong> written down. Sealmetrics credits each purchase to the channel of the session in which it happens, by{" "}<Link href="/glossary/last-click-attribution" className={link}>last click</Link>; ad platforms use their own windows and models. Two ROAS figures built on different rules are not two opinions about the same number.</li>
              <li><strong>Break-even:</strong> a ROAS only means something next to the one you need. With a 40% gross margin, break-even ROAS is 1 ÷ 0.40 = 2.5.</li>
            </ul>

            <h2 className={h2}>The method, step by step</h2>
          </div>

          <div className="mt-6 mb-12">
            <HowToSteps steps={STEPS} />
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <h2 className={h2}>A worked example</h2>
            <p>
              The figures below are illustrative, not from a client. They show the
              shape of the comparison in step 6 for three campaigns with the same
              monthly spend.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[560px]">
                <thead>
                  <tr>
                    <th className={th}>Campaign</th>
                    <th className={th}>Spend</th>
                    <th className={th}>Platform ROAS</th>
                    <th className={th}>Measured ROAS</th>
                    <th className={th}>Reading</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={td}>Brand search</td><td className={td}>€10,000</td><td className={td}>9.1</td><td className={td}>8.7</td><td className={td}>Close: little modelling, little view-through</td></tr>
                  <tr><td className={td}>Prospecting social</td><td className={td}>€10,000</td><td className={td}>3.4</td><td className={td}>1.9</td><td className={td}>Below break-even on last click: test before cutting</td></tr>
                  <tr><td className={td}>Non-brand search</td><td className={td}>€10,000</td><td className={td}>3.0</td><td className={td}>3.6</td><td className={td}>Undervalued by consent-gated analytics</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              With a break-even ROAS of 2.5, the platform view funds all three. The
              measured view says non-brand search deserves more than it gets, and
              that prospecting social needs a holdout test before anyone decides it
              loses money: last click is exactly the rule that gives it least credit.
            </p>

            <h2 className={h2}>Where measured last-click ROAS is wrong too</h2>
            <p>
              A measured ROAS is more complete than a consent-gated one, but it is not
              the whole truth about a campaign, and it would be dishonest to present
              it that way:
            </p>
            <ul className={dashList}>
              <li><strong>No credit for views.</strong> A campaign that works by being seen, not clicked — video, display, much of prospecting social — gets no view-through credit.</li>
              <li><strong>No credit for earlier sessions.</strong> Sealmetrics does not identify users. A shopper who clicks an ad on Monday and returns by typing your address on Friday is credited to direct.</li>
              <li><strong>No multi-touch model.</strong> There is no split of credit across touchpoints of the same person, by design.</li>
              <li><strong>Only what reaches the website.</strong> Marketplace, phone and in-store sales have no web session to attribute.</li>
            </ul>
            <p>
              So treat measured last-click ROAS as a floor for upper-funnel campaigns
              and as a reliable figure for campaigns that sell in the session. Before
              cutting a campaign that looks weak on last click, run an incrementality
              test: pause it in some regions or for a holdout audience and see whether
              total measured revenue moves.
            </p>

            <h2 className={h2}>What the published cases show</h2>
            <p>
              <Link href="/case-studies/dreamplace-hotels" className={link}>Dreamplace Hotels</Link>{" "}
              compares the sales Sealmetrics attributes with the total in its CRM and
              treats the remaining gap as a quality signal. On that base it attributes
              15–20% more sales than its previous tool, and Meta and Google were the
              first budgets it moved.{" "}
              <Link href="/case-studies/palladium-hotel-group" className={link}>Palladium Hotel Group</Link>{" "}
              went further on display: it rebuilt its Display &amp; Video 360 buying
              around Cost-per-Search, using availability searches in the booking engine
              as the intent signal, and Display Cost-per-Search improved by 165%. Incapto&apos;s
              case reports no ROI at all — only the base on which ROAS is calculated,
              which moved paid campaigns from half of the traffic to close to two thirds.
            </p>
          </div>

          <CommercialModule hook="Three ROAS numbers for one campaign? We measure revenue without consent loss, reconcile it with your orders and set it next to your platform ROAS." />

          <RelatedReading currentSlug={SLUG} />

          <FaqSection items={FAQ} heading="Questions about ROAS after cookie consent" />
        </div>
      </article>
    </>
  );
}
