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
  title: "What Is First-Party Data Collection? — Sealmetrics Glossary",
  description:
    "First-party data collection gathers analytics through your own domain, avoiding ad blockers and third-party cookie restrictions.",
  openGraph: {
    title: "What Is First-Party Data Collection?",
    description: "First-party data collection gathers analytics through your own domain, avoiding ad blockers.",
    type: "article",
    url: "https://sealmetrics.com/glossary/first-party-data-collection/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/first-party-data-collection/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is First-Party Data Collection?",
    description: "First-party data collection gathers analytics through your own domain, avoiding ad blockers.",
    images: [ogImage("/glossary/first-party-data-collection/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/first-party-data-collection/",
    // The Spanish page points here; without the return link the hreflang
    // pair is one-sided and Google discards it.
    languages: getAlternates("/glossary/first-party-data-collection"),
  },
};

export default function FirstPartyDataCollectionPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "First-Party Data Collection" }]} />
      <JsonLd data={definedTermSchema({ name: "First-Party Data Collection", description: "Collecting analytics data through your own domain infrastructure.", url: "/glossary/first-party-data-collection", related: [{ name: "Cookieless Analytics", url: "/glossary/cookieless-analytics" }, { name: "Server-Side Tracking", url: "/glossary/server-side-tracking" }, { name: "Ad Blocker Impact on Analytics", url: "/glossary/ad-blocker-analytics-impact" }, { name: "Analytics Data Residency", url: "/glossary/analytics-data-residency" }, { name: "Intelligent Tracking Prevention (ITP)", url: "/glossary/intelligent-tracking-prevention" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "First-Party Data Collection", url: "/glossary/first-party-data-collection" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">First-Party Data Collection</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Collecting analytics data through your own domain infrastructure rather than third-party servers. First-party requests are far less likely to be blocked by ad blockers and are not subject to third-party cookie restrictions.
            </p>
          </div>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">First-party vs. third-party</h2>
          <p>When GA4 collects data, it sends requests from your visitor&rsquo;s browser to google-analytics.com — a third-party domain. Ad blockers recognize this pattern and block the request. Browser privacy features may restrict the associated cookies.</p>
          <p>First-party data collection routes the data through your own domain. The request goes from the visitor&rsquo;s browser to your-domain.com, processed by infrastructure running on your domain. To the browser and to ad blockers, this is indistinguishable from any other first-party request.</p>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why it matters for data completeness</h2>
          <p>Approximately 40% of EU users run ad blockers that specifically target third-party analytics requests. First-party data collection avoids most of this loss — not through deception, but by fundamentally changing the data path to be genuinely first-party.</p>
          <p>Combined with <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless analytics</Link>, first-party collection eliminates two of the three major <Link href="/glossary/data-loss-in-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">data loss</Link> vectors: ad blocker blocking and browser cookie restrictions.</p>
        </div>
        <CommercialModule hook="Sealmetrics is first-party by design: your domain, your data, EU-hosted in Dublin. See what that changes in your numbers." />

        <RelatedGlossaryTerms slug="first-party-data-collection" />
        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">How Sealmetrics Works</Link> &middot; <Link href="/blog/cookieless-analytics-explained" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cookieless Analytics Explained</Link>
          </p>
        </div>

        <div className="mt-12">
          <QuickAnswer>
            <p>
              First-party data collection routes analytics requests through your own domain (e.g. <code>pixel.yourdomain.com</code>) instead of a third-party host like <code>google-analytics.com</code>. To the browser, ad blocker rule lists and consent gates, the request is indistinguishable from any other resource on your site — so it is not stripped, not blocked, and not subject to third-party cookie restrictions imposed by Safari ITP or Firefox ETP.
            </p>
            <p>
              For EU eCommerce, this matters because ad blockers silently drop ~40% of third-party analytics calls before they execute, and Safari caps third-party cookies entirely. First-party collection eliminates both loss vectors. Combined with no cookie or identifier stored on the device, it forms the architectural basis of consentless analytics — the same data path GDPR and the CNIL exemption criteria contemplate when describing analytics that do not require a consent banner.
            </p>
          </QuickAnswer>
        </div>
      </div>
    </article>
    </>
  );
}
