import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { RelatedGlossaryTerms } from "@/components/ui/RelatedGlossaryTerms";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "What Is Cookieless Analytics? — Sealmetrics Glossary",
  description:
    "Cookieless analytics captures visitor data without browser cookies, so measurement doesn't depend on consent. Learn how it works and why it matters.",
  openGraph: {
    title: "What Is Cookieless Analytics?",
    description: "Cookieless analytics captures visitor data without cookies, so measurement doesn't depend on consent.",
    type: "article",
    url: "https://sealmetrics.com/glossary/cookieless-analytics/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/cookieless-analytics/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Cookieless Analytics?",
    description: "Cookieless analytics captures visitor data without cookies, so measurement doesn't depend on consent.",
    images: [ogImage("/glossary/cookieless-analytics/")],
  },
  alternates: { canonical: "https://sealmetrics.com/glossary/cookieless-analytics/", languages: getAlternates("/glossary/cookieless-analytics") },
};

export default function CookielessAnalyticsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Cookieless Analytics" }]} />
      <JsonLd data={definedTermSchema({ name: "Cookieless Analytics", description: "Web analytics that captures visitor data without using browser cookies.", url: "/glossary/cookieless-analytics", related: [{ name: "First-Party Data Collection", url: "/glossary/first-party-data-collection" }, { name: "Server-Side Tracking", url: "/glossary/server-side-tracking" }, { name: "GDPR Analytics Compliance", url: "/glossary/gdpr-analytics-compliance" }, { name: "Consent Management Platform (CMP)", url: "/glossary/consent-management-platform" }, { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Cookieless Analytics", url: "/glossary/cookieless-analytics" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">What Is Cookieless Analytics?</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Web analytics that captures visitor data without using browser cookies, enabling traffic measurement regardless of consent status or browser restrictions.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">How does cookieless analytics work?</h2>
          <p>
            Traditional analytics tools (like GA4) rely on cookies — small text files stored in the visitor&rsquo;s browser — to identify returning visitors, track sessions and build per-user journeys. Cookieless analytics replaces this mechanism with <Link href="/glossary/first-party-data-collection" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">first-party data collection</Link> that operates without any identifiers on the visitor&rsquo;s device.
          </p>
          <p>
            Instead of storing identifiers, cookieless analytics counts events on the server side — pageview counts, conversion counts, revenue totals — grouped by channel, campaign, landing page and country. Each event is logged with anonymous channel metadata (referrer, UTM parameters, landing page, device class). The data path is first-party (your domain to your server), which means it is not blocked by ad blockers, not affected by browser cookie restrictions like <Link href="/glossary/intelligent-tracking-prevention" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">ITP</Link>, and not dependent on consent banners.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What does cookieless analytics not do?</h2>
          <p>The architecture has a deliberate trade-off: per-user detail is given up in exchange for complete, defensible aggregate totals. Cookieless analytics does not identify visitors, does not link pageviews into per-user journeys, does not recognise a returning visitor, and does not support multi-touch attribution models. What it produces is aggregate counts and last-click revenue attribution at channel level.</p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why does cookieless analytics matter for EU eCommerce?</h2>
          <p>
            In the EU, cookie-based analytics lose traffic to consent rejection, ad blockers and browser restrictions. In our experience with clients, between 40% and 60% of traffic doesn&rsquo;t accept cookies; on <Link href="/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Incapto&rsquo;s Shopify store, measured over 48 days</Link>, GA4 did not record 29% of visits. Cookieless analytics eliminates all three loss vectors, counting real visits anonymously, without depending on consent.
          </p>
          <p>
            This is not a marginal improvement — it is the difference between making decisions on a statistical fragment and making decisions on complete aggregate totals.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What are the privacy implications?</h2>
          <p>
            Cookieless analytics achieves <Link href="/glossary/gdpr-analytics-compliance" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GDPR compliance</Link> by architecture: no personal data is collected, no cookies are stored, and no consent is required for the analytics to function. This is consistent with CNIL (French DPA) exemption criteria for audience measurement tools.
          </p>
        </div>

        <CommercialModule hook="This is what Sealmetrics does all day: cookieless counting of visits, without depending on consent. See it running on your own traffic." />

        <RelatedGlossaryTerms slug="cookieless-analytics" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/cookieless-analytics-explained" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cookieless Analytics Explained</Link> &middot; <Link href="/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">How Sealmetrics Works</Link>
          </p>
        </div>

        <div className="mt-12">
          <QuickAnswer>
            <p>
              Cookieless analytics is a measurement approach that captures website traffic without browser cookies, localStorage, fingerprinting, or any personal identifier. Events are counted on the server side from a first-party pixel on your own domain, then aggregated by channel, campaign, landing page and country — there is no per-visitor profile, no returning-user recognition, and no multi-touch journey reconstruction. Because no information is stored on or read from the device, the architecture meets GDPR and the ePrivacy Directive by design rather than by a consent layer added on top.
            </p>
            <p>
              For European eCommerce running cookie-based GA4, this closes the data loss gap caused by consent rejection, ad blockers and Apple&rsquo;s Intelligent Tracking Prevention, whose size depends on the store and the channel. Sealmetrics&rsquo; implementation measures inbound traffic without depending on consent, attributes each conversion last-click at channel level, and lets you check aggregate orders and revenue against the Shopify, WooCommerce or Magento backend — in Incapto&rsquo;s 48-day parallel run on Shopify, it recorded 96% of real orders and 97% of revenue.
            </p>
          </QuickAnswer>
        </div>
      </div>
    </article>
    </>
  );
}
