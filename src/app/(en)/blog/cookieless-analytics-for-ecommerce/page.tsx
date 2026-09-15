import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { FaqSection } from "@/components/ui/FaqSection";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Cookieless Analytics for eCommerce: The 2026 Guide",
  description:
    "How European eCommerce teams count conversions and reconcile with Shopify, WooCommerce or Magento — without cookies, consent banners or user-level tracking.",
  openGraph: {
    title: "Cookieless Analytics for eCommerce: The 2026 Guide",
    description:
      "Aggregate, anonymous event counts attributed last-click to the channel that drove each conversion. First-party, no cookies, no consent banner.",
    type: "article",
    images: [ogImage("/blog/cookieless-analytics-for-ecommerce/")],
    url: "https://sealmetrics.com/blog/cookieless-analytics-for-ecommerce/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Cookieless Analytics for eCommerce: The 2026 Guide",
    description: "Aggregate, anonymous event counts attributed last-click to the channel that drove each conversion. First-party, no cookies, no consent banner.",
    images: [ogImage("/blog/cookieless-analytics-for-ecommerce/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/cookieless-analytics-for-ecommerce/",
    languages: getAlternates("/blog/cookieless-analytics-for-ecommerce"),
  },
};

const faqs = [
  {
    question: "What is cookieless analytics for eCommerce?",
    answer:
      "Cookieless analytics for eCommerce is a measurement approach that counts visits, add-to-carts, checkouts and purchases without cookies, localStorage or personal identifiers. Each conversion is attributed last-click to the source of the session in which it fires, and aggregate totals can be checked against the Shopify, WooCommerce or Magento order total — without any per-user tracking.",
  },
  {
    question: "Does cookieless analytics track individual customers across sessions?",
    answer:
      "No. Sealmetrics does not identify individual visitors, does not stitch pageviews into per-user journeys and does not build behavioral profiles. The measurement is strictly aggregate: counts by channel, campaign, landing page and country. Because it avoids personal-data collection at the architecture level, the review is short — but confirm it against your specific implementation with your DPO; Sealmetrics ships a DPA and TPSR package for this review.",
  },
  {
    question: "How does Sealmetrics attribute revenue without journeys?",
    answer:
      "Attribution is session-scoped last-click. A conversion is credited to the source of the session in which it fires — the most recent entrance — and a session closes after about two hours of inactivity. Totals roll up by channel — for example, 42 conversions attributed to Google Ads this week. There is no multi-touch model, no lookback window and no stitching of previous visits.",
  },
  {
    question: "Does cookieless analytics work with Shopify?",
    answer:
      "Yes, on any Shopify plan: connect the Sealmetrics Pixel app and enable the theme app embed. The purchase is confirmed server-side through Shopify's orders/create webhook. In Incapto's 48-day parallel run on Shopify, Sealmetrics recorded 96% of real online-store orders and 97% of revenue.",
  },
  {
    question: "Will I need to migrate off GA4?",
    answer:
      "No. Most teams run Sealmetrics alongside GA4 over a full commercial cycle to compare numbers; Incapto's comparison covered 48 days. After that, many keep GA4 as a Google Ads conversion conduit and use Sealmetrics as the source of truth for channel-level revenue decisions.",
  },
];

export default function Page() {
  const dates = postDates("cookieless-analytics-for-ecommerce");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Cookieless Analytics for eCommerce" }]} />
      <JsonLd
        data={articleSchema({
          headline: "Cookieless Analytics for eCommerce: The 2026 Guide",
          description:
            "How European eCommerce teams count conversions without consent gaps, cookies or user-level tracking.",
          ...dates,
          url: "/blog/cookieless-analytics-for-ecommerce",
          category: "eCommerce",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Cookieless Analytics for eCommerce", url: "/blog/cookieless-analytics-for-ecommerce" }])} />
      <JsonLd data={faqPageSchema(faqs, "/blog/cookieless-analytics-for-ecommerce")} />
      <JsonLd data={speakableWebPageSchema({ url: "/blog/cookieless-analytics-for-ecommerce", name: "How EU eCommerce Measures Revenue Without Waiting for the Cookie Banner", selectors: [".key-takeaways"] })} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Sealmetrics",
          applicationCategory: "Web analytics",
          operatingSystem: "Web",
          url: "https://sealmetrics.com/",
          offers: {
            "@type": "Offer",
            url: "https://sealmetrics.com/",
          },
        }}
      />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              eCommerce
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              How EU eCommerce Measures Revenue Without Waiting for the Cookie Banner
            </h1>
            <p className="text-[1.05rem] leading-[1.8] text-text-body mb-6">
              European eCommerce teams lose the visitors who reject the cookie banner, and with them the channel picture their budget depends on. Cookieless analytics counts visits and orders without storing anything on the device, attributes revenue last-click at channel level, and can be checked against the store's own orders: on Incapto's Shopify store, GA4 missed 29% of visits while Sealmetrics recorded 96% of real orders.
            </p>
            <PostByline
              {...dates}
              readTime="10 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>Consent rejection, ad blockers and Safari restrictions compound. Measured on a real Shopify store over 48 days, GA4 did not record 29% of visits or 45% of pageviews; our model&apos;s compounded worst case leaves GA4 with about 13%.</li>
              <li>Cookieless analytics counts events anonymously — no cookies, no identifiers, no per-user tracking — and attributes each conversion last-click at channel level.</li>
              <li>Because no information is stored on or read from the device, the ePrivacy storage-and-access rule has nothing to attach to. Whether your analytics is consent-exempt still depends on your configuration and your national authority&apos;s criteria.</li>
              <li>The check that matters is against the backend: in Incapto&apos;s parallel run, Sealmetrics recorded 96% of real Shopify orders and 97% of revenue.</li>
              <li>Run side-by-side with GA4 over a full commercial cycle to compare; no migration needed.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              If you run eCommerce in Europe, you know some version of this meeting. Meta Ads claims 340 conversions, GA4 shows 120 and Shopify recorded 180. Your CFO asks which is real. Your agency defends the marketing number. You defend neither, because you can&apos;t reconcile them, and the meeting ends the way it always ends — with a decision that waits another week.
            </p>
            <p>
              This is not an eCommerce problem. It is an <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">architecture problem</Link>. Cookie-based analytics does not see the visitors who reject the banner or block the tag, so the channel totals it reports cannot reconcile with the backend. The fix is not a better banner or a smarter attribution model. The fix is to stop depending on cookies — and to stop trying to track individuals at all. The full category overview lives on the <Link href="/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless analytics pillar</Link>; this piece is the eCommerce-specific reading.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The three layers of data loss in eCommerce
            </h2>
            <p>
              Your eCommerce analytics loses events in three sequential stages. The cascade is multiplicative — each layer compounds the one before. The percentages below are the assumptions of our worst-case model, not a measurement of your store.
            </p>
            <p>
              <strong>Layer 1 — Consent rejection (55% in the model).</strong> A large share of EU visitors reject the cookie banner, and the share varies by market and by banner design. If they reject, GA4 never writes its cookie, so the pageview is never measured. For a DTC brand running Facebook ads into a Shopify store, this is where most of the invisible conversions live.
            </p>
            <p>
              <strong>Layer 2 — Ad blockers (40% of what is left, in the model).</strong> uBlock Origin, AdBlock Plus, Brave Shield and Firefox Enhanced Tracking Protection block requests to google-analytics.com. Your GA4 tag never fires. Add-to-cart events never arrive. Add this on top of consent rejection and you have compound loss.
            </p>
            <p>
              <strong>Layer 3 — Browser restrictions (Safari ITP, Firefox ETP).</strong> Even visitors who accept cookies don&apos;t keep them long. Apple&apos;s <Link href="/glossary/intelligent-tracking-prevention" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Intelligent Tracking Prevention</Link> caps script-set first-party cookies at 7 days, and at 24 hours when the page arrived with tracking query parameters. Cookie-based tools lose the original source and a later email-driven conversion shows up as &ldquo;direct&rdquo;.
            </p>
            <p>
              In our model&apos;s compounded worst case, 100 real visits become about 45 after consent, 27 after ad blockers and 13 after browser restrictions. <Link href="/blog/why-ga4-shows-13pct-eu-traffic" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Read the math here</Link>. A measured store is less extreme but just as uneven: running both tools on <Link href="/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Incapto&apos;s Shopify store</Link> for 48 days, GA4 did not record 29% of visits, and paid campaigns lost three to five times more than direct traffic.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              How cookieless analytics solves it — without tracking anyone
            </h2>
            <p>
              Cookieless analytics for eCommerce replaces the three-layer loss cascade with a different architecture. It is important to state what this architecture does <em>not</em> do: it does not identify individual visitors, it does not stitch pageviews into per-user journeys, and it does not build behavioral profiles. It counts events. That&apos;s all.
            </p>
            <p>
              <strong>1. First-party event collection.</strong> A small tracking script, which you can serve from a subdomain of your own domain instead of a third-party endpoint. Ad blockers work mostly from lists of known third-party tracking domains, so a first-party request is far less likely to be blocked. Each pageview logs anonymous metadata: referrer, UTM parameters, landing page, country, device class.
            </p>
            <p>
              <strong>2. Aggregate, anonymous counts.</strong> Events are aggregated on the server side — pageview counts, conversion counts, revenue totals — grouped by channel, campaign and landing page. At no point is a pageview linked to a specific person or device. There is no cross-session identifier and no &ldquo;returning user&rdquo; concept.
            </p>
            <p>
              <strong>3. Session-scoped last-click attribution.</strong> A conversion is credited to the source of the session in which it fires; the session closes after about two hours of inactivity. If the visitor came from Google Ads three days earlier, that visit counted towards the Google Ads channel total; it is not stitched onto the later conversion. Sessions stand on their own. Channel totals are what rolls up.
            </p>
            <p>
              <strong>4. No cookies, nothing to consent to on the device.</strong> Because nothing is stored on or read from the visitor&apos;s device, the storage-and-access rule of the ePrivacy Directive has nothing to attach to. Whether your deployment is consent-exempt still depends on your configuration and your regulator&apos;s criteria; where it is, the consent-rejection gap disappears because there is nothing to reject.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What changes for the eCommerce team
            </h2>
            <p>
              The practical effects on a typical Shopify or Magento team are:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li><strong>Totals reconcile with the backend.</strong> In Incapto&apos;s 48-day parallel run, Sealmetrics recorded 96% of real Shopify orders and 97% of revenue — so the channel split built on top of it can be trusted.</li>
              <li><strong>No Black Friday sampling.</strong> Cookieless analytics does not sample at volume thresholds, so peak-day decisions are made on real counts.</li>
              <li><strong>Microconversions visible.</strong> Add-to-carts, checkout starts and form submissions are counted on every session that loads the tracker, not only on consenting ones.</li>
              <li><strong>CFO-defensible numbers.</strong> Because the architecture is provable (no PII, no identifiers) and aggregate revenue reconciles with the backend, finance can sign off on the channel mix without a three-hour meeting.</li>
            </ul>

            <CommercialModule hook="Pixel says 340, Shopify says 180? The demo reconciles your numbers against your backend, live." />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What you give up — on purpose
            </h2>
            <p>
              Aggregate, anonymous measurement has trade-offs. Be clear about them:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li><strong>No per-user journey reports.</strong> You will not see &ldquo;customer X saw ad, then visited three times, then bought.&rdquo; Those reports require cookie-based tracking and personal identifiers.</li>
              <li><strong>No multi-touch attribution.</strong> Last-click only. If your model requires credit splitting across touchpoints of the same user, cookieless analytics is not the tool.</li>
              <li><strong>No returning-visitor identification.</strong> The system does not know if a visit is someone&apos;s first or fifth. For eCommerce channel decisions, that almost never matters — aggregate channel-level ROAS is what allocates budget.</li>
            </ul>
            <p>
              The trade is deliberate: you give up the illusion of per-user insight (which GA4 provides on a fraction of your traffic) in exchange for defensible totals that do not depend on consent.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Implementation: what it actually takes
            </h2>
            <p>
              For a standard Shopify, WooCommerce or Magento store, the setup is:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Install the platform integration: the Sealmetrics app and theme app embed on <Link href="/platforms/shopify" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Shopify</Link>, the <Link href="/platforms/woocommerce" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">WooCommerce</Link> plugin, or the Magento 2.4+ module. Any other stack uses the tracker and a conversion call on the confirmation page.</li>
              <li>Check the funnel events and place a test order. On Shopify the purchase arrives server-side by webhook; on WooCommerce and Magento it is sent from the order confirmation page.</li>
              <li>Run side-by-side with GA4 over a full commercial cycle. Incapto&apos;s comparison covered 48 days.</li>
              <li>Compare aggregate revenue with the backend for the same period, timezone and currency, leaving out orders with no web session behind them.</li>
              <li>Only then compare channels: the channel split is worth reading once the totals match the orders.</li>
            </ol>
            <p>
              No migration. GA4 keeps running for Google Ads conversion import. Sealmetrics becomes the source of truth for channel-level decisions.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Who this is not for
            </h2>
            <p>
              The value of cookieless analytics scales with the size of the channel-allocation decisions being made. If a gap like the one measured at Incapto — 29% of visits unrecorded, and paid campaigns undercounted three to five times more than direct traffic — would not change where your budget goes, switching analytics is marginal.
            </p>
            <p>
              If your team relies on per-user journey analysis or multi-touch attribution models, cookieless analytics is not a drop-in replacement. It is a different category of measurement — aggregate, anonymous, defensible — and the trade-off is by design.
            </p>

          </div>

          <CommercialModule hook="See your pixel, your backend and Sealmetrics on the same screen — the reconciliation your CFO keeps asking for." />

          <RelatedReading currentSlug="cookieless-analytics-for-ecommerce" />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Go deeper
            </h2>
            <ul className="space-y-4">
              <li>
                <Link href="/for/ecommerce" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Sealmetrics for eCommerce</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Vertical page with pains, outcomes and Shopify-specific integration details.</p>
              </li>
              <li>
                <Link href="/glossary/cookieless-analytics" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless Analytics — definition</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">The glossary term, with related concepts and technical detail.</p>
              </li>
              <li>
                <Link href="/vs-ga4" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Sealmetrics vs GA4</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Feature-by-feature comparison for eCommerce teams.</p>
              </li>
            </ul>
          </section>

          <FaqSection items={faqs} heading="Questions eCommerce teams ask" />
        </div>
      </article>
    </>
  );
}
