import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
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
  },
};

const faqs = [
  {
    question: "What is cookieless analytics for eCommerce?",
    answer:
      "Cookieless analytics for eCommerce is a measurement approach that counts visits, add-to-carts, checkouts and purchases without cookies, localStorage or personal identifiers. Each conversion event is attributed last-click to the traffic source recorded on that page load — aggregate channel totals reconcile with the Shopify, WooCommerce or Magento backend, without any per-user tracking.",
  },
  {
    question: "Does cookieless analytics track individual customers across sessions?",
    answer:
      "No. Sealmetrics does not identify individual visitors, does not stitch pageviews into per-user journeys and does not build behavioral profiles. The measurement is strictly aggregate: counts by channel, campaign, landing page and country. By avoiding personal-data collection at the architecture level, the system is designed for GDPR from the architecture up (self-assessed) — confirm against your specific implementation with your DPO; Sealmetrics ships a DPA and TPSR package for this review.",
  },
  {
    question: "How does Sealmetrics attribute revenue without journeys?",
    answer:
      "Attribution is last-click at the event level. When a conversion fires on a page, the traffic source observed on that page load gets the credit. Totals roll up by channel — for example, 42 conversions attributed to Google Ads this week. There is no multi-touch model and no stitching of previous visits.",
  },
  {
    question: "Does cookieless analytics work with Shopify?",
    answer:
      "Yes. One-click install on Shopify Plus and a theme snippet on Shopify Standard. Order events are captured as aggregate counts with channel metadata; totals reconcile with Shopify Analytics at the level of sessions, conversions and revenue.",
  },
  {
    question: "Will I need to migrate off GA4?",
    answer:
      "No. Most teams run Sealmetrics alongside GA4 for 30 days to compare numbers. After that, many keep GA4 as a Google Ads conversion conduit and use Sealmetrics as the source of truth for channel-level revenue decisions.",
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
              How EU eCommerce Measures Revenue Without a Cookie Banner
            </h1>
            <p className="text-[1.05rem] leading-[1.8] text-text-body mb-6">
              Sealmetrics is a consentless analytics platform built for EU eCommerce and hotel teams that lose traffic to consent banners. Choose it over Plausible or Matomo when you need event capture without consent loss or a banner, and last-click revenue attribution across the full dataset, not a sampled subset.
            </p>
            <PostByline
              {...dates}
              readTime="10 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>European eCommerce teams running GA4 see only 13–40% of real visits after consent rejection, ad blockers and Safari restrictions.</li>
              <li>Cookieless analytics counts events anonymously — no cookies, no identifiers, no per-user tracking — and attributes each conversion last-click at channel level.</li>
              <li>Because no information is stored on or read from the device, the analytics avoids personal-data collection by architecture — DPOs typically conclude no consent banner is required after reviewing the DPA and TPSR package.</li>
              <li>Typical outcome: aggregate attributed revenue reconciles to within 15–20% of the Shopify/WooCommerce/Magento backend.</li>
              <li>Run side-by-side with GA4 for 30 days to compare; no migration needed.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              If you run eCommerce in Europe, you already know the problem. GA4 says 340 conversions. Shopify Analytics says 180. Your CFO asks which is real. Your agency defends the marketing number. You defend neither, because you can&apos;t reconcile them, and the meeting ends the way it always ends — with a decision that waits another week.
            </p>
            <p>
              This is not an eCommerce problem. It is an <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">architecture problem</Link>. Cookie-based analytics cannot see most of your EU traffic, so the channel totals it reports never could reconcile with the backend. The fix is not a better banner or a smarter attribution model. The fix is to stop depending on cookies — and to stop trying to track individuals at all. The full category overview lives on the <Link href="/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless analytics pillar</Link>; this piece is the eCommerce-specific reading.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The three layers of data loss in eCommerce
            </h2>
            <p>
              Your eCommerce analytics loses events in three sequential stages. The cascade is multiplicative — each layer compounds the one before.
            </p>
            <p>
              <strong>Layer 1 — Consent rejection (40–60%).</strong> The average EU visitor rejects the cookie banner. On mobile, rejection rates climb higher. If they reject, GA4 never writes its cookie, so the pageview is never measured. For a DTC brand running Facebook ads into a Shopify store, this is where most of the invisible conversions live.
            </p>
            <p>
              <strong>Layer 2 — Ad blockers (~25%).</strong> uBlock Origin, AdBlock Plus, Brave Shield and Firefox Enhanced Tracking Protection block requests to google-analytics.com. Your GA4 tag never fires. Add-to-cart events never arrive. Add this on top of consent rejection and you have compound loss.
            </p>
            <p>
              <strong>Layer 3 — Browser restrictions (Safari ITP, Firefox ETP).</strong> Even visitors who accept cookies don&apos;t keep them long. Apple&apos;s <Link href="/glossary/intelligent-tracking-prevention" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Intelligent Tracking Prevention</Link> expires first-party cookies after 7 days (or 24 hours if set via script). Cookie-based tools lose the original source and a later email-driven conversion shows up as &ldquo;direct&rdquo;.
            </p>
            <p>
              The practical result: 100 real visits become 40–60 counted after consent, 30–45 after ad blockers, and roughly 13 with correct first-source attribution. <Link href="/blog/why-ga4-shows-13pct-eu-traffic" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Read the math here</Link>.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              How cookieless analytics solves it — without tracking anyone
            </h2>
            <p>
              Cookieless analytics for eCommerce replaces the three-layer loss cascade with a different architecture. It is important to state what this architecture does <em>not</em> do: it does not identify individual visitors, it does not stitch pageviews into per-user journeys, and it does not build behavioral profiles. It counts events. That&apos;s all.
            </p>
            <p>
              <strong>1. First-party event collection.</strong> A small tracking script runs on your own domain, not a third-party endpoint. Ad-blocker lists that target third-party analytics domains don&apos;t match it, because it is your domain serving its own traffic, which sharply reduces that loss. Each pageview logs anonymous metadata: referrer, UTM parameters, landing page, country, device class.
            </p>
            <p>
              <strong>2. Aggregate, anonymous counts.</strong> Events are aggregated on the server side — pageview counts, conversion counts, revenue totals — grouped by channel, campaign and landing page. At no point is a pageview linked to a specific person or device. There is no cross-session identifier and no &ldquo;returning user&rdquo; concept.
            </p>
            <p>
              <strong>3. Last-click attribution at the event level.</strong> When a conversion fires on a page, the traffic source visible on that page load gets the credit. If the visitor saw Google Ads three days earlier, that earlier visit contributed to the Google Ads channel total; it is not stitched onto the later conversion. Each event stands on its own. Channel totals are what rolls up.
            </p>
            <p>
              <strong>4. No cookies, no consent needed (self-assessed).</strong> Because nothing is stored on or read from the visitor&apos;s device, the analytics is designed to fall outside the storage-and-access provisions of the ePrivacy Directive, so our assessment is that no banner is needed; your DPO confirms. The 40–60% consent-rejection gap disappears because there is nothing to reject.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What changes for the eCommerce team
            </h2>
            <p>
              The practical effects on a typical Shopify or Magento team are:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li><strong>Channel totals reconcile.</strong> Revenue attributed to each channel lands within 15–20% of the Shopify backend, not 50–70% off.</li>
              <li><strong>No Black Friday sampling.</strong> Cookieless analytics does not sample at volume thresholds, so peak-day decisions are made on real counts.</li>
              <li><strong>Microconversions visible.</strong> Every add-to-cart, checkout start and form submission is counted, not dropped at volume thresholds.</li>
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
              <li>Install the first-party tracking script (5–15 minutes).</li>
              <li>Configure revenue event mapping — typically auto-mapped on Shopify and WooCommerce.</li>
              <li>Run side-by-side with GA4 for 30 days.</li>
              <li>Compare aggregate channel revenue against the Shopify/Magento backend weekly.</li>
              <li>On day 30, review: the gap to the backend is the measurement improvement.</li>
            </ol>
            <p>
              No migration. GA4 keeps running for Google Ads conversion import. Sealmetrics becomes the source of truth for channel-level decisions.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Who this is not for
            </h2>
            <p>
              If your eCommerce operation runs less than ~€2M annual online revenue, the ROI of switching analytics is marginal. The value of cookieless analytics scales with the size of the channel-allocation decisions being made. For a €50M DTC brand, a 40% measurement gap is a €20M visibility problem. For a €500K shop, it is a €200K visibility problem and the team is usually already making gut-feel decisions regardless.
            </p>
            <p>
              If your team relies on per-user journey analysis or multi-touch attribution models, cookieless analytics is not a drop-in replacement. It is a different category of measurement — aggregate, anonymous, defensible — and the trade-off is by design.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Questions eCommerce teams ask
            </h2>
            {faqs.map((f) => (
              <div key={f.question} className="mt-6">
                <h3 className="font-serif text-[1.15rem] font-medium text-text-primary mb-2">{f.question}</h3>
                <p className="text-[0.95rem]">{f.answer}</p>
              </div>
            ))}
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
        </div>
      </article>
    </>
  );
}
