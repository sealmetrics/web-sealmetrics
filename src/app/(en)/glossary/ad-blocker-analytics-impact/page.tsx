import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { RelatedGlossaryTerms } from "@/components/ui/RelatedGlossaryTerms";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Ad Blocker Impact on Analytics — Sealmetrics",
  description:
    "Ad blockers stop third-party analytics scripts like GA4 before they run, so those visits never reach the report. First-party collection avoids the lists they rely on.",
  openGraph: {
    title: "What Is Ad Blocker Impact on Analytics?",
    description: "Ad blockers stop third-party analytics scripts before they run. First-party collection avoids the lists they rely on.",
    type: "article",
    url: "https://sealmetrics.com/glossary/ad-blocker-analytics-impact/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/ad-blocker-analytics-impact/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Ad Blocker Impact on Analytics?",
    description: "Ad blockers stop third-party analytics scripts before they run. First-party collection avoids the lists they rely on.",
    images: [ogImage("/glossary/ad-blocker-analytics-impact/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/ad-blocker-analytics-impact/",
    // The Spanish page points here; without the return link the hreflang
    // pair is one-sided and Google discards it.
    languages: getAlternates("/glossary/ad-blocker-analytics-impact"),
  },
};

export default function AdBlockerAnalyticsImpactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Ad Blocker Impact on Analytics" }]} />
      <JsonLd data={definedTermSchema({ name: "Ad Blocker Impact on Analytics", description: "Data loss caused by browser extensions that block third-party analytics scripts before they execute.", url: "/glossary/ad-blocker-analytics-impact", related: [{ name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }, { name: "First-Party Data Collection", url: "/glossary/first-party-data-collection" }, { name: "Server-Side Tracking", url: "/glossary/server-side-tracking" }, { name: "Intelligent Tracking Prevention (ITP)", url: "/glossary/intelligent-tracking-prevention" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Ad Blocker Impact on Analytics", url: "/glossary/ad-blocker-analytics-impact" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Ad Blocker Impact on Analytics</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Data loss caused by browser extensions that block third-party analytics scripts before they execute. How many visitors it affects varies by country, device and audience, which is why it is best measured on your own site rather than borrowed from a survey.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">How ad blockers affect analytics</h2>
          <p>
            Ad blockers work by maintaining filter lists &mdash; such as EasyList, EasyPrivacy, and uBlock Origin&rsquo;s default lists &mdash; that match network requests against known tracking domains. When a visitor with an ad blocker loads your site, requests to domains like <code className="text-[0.92em] bg-warm-white px-1.5 py-0.5 rounded-[2px]">google-analytics.com</code> or <code className="text-[0.92em] bg-warm-white px-1.5 py-0.5 rounded-[2px]">googletagmanager.com</code> are silently cancelled before any data is sent.
          </p>
          <p>
            The result: your analytics tool never learns these visitors existed. No pageviews, no events, no conversions. The visitor completes their journey &mdash; browses products, adds to cart, even purchases &mdash; and your dashboard shows nothing.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">The scale of the problem</h2>
          <p>
            Ad blocker use is uneven: higher on desktop than on mobile, and higher among technical audiences than among general shoppers. It is also not the only loss. For a consent-gated tool it stacks on top of <Link href="/glossary/consent-management-platform" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">consent banner</Link> rejection (in our experience with clients, between 40% and 60% of traffic doesn&rsquo;t accept cookies) and on browser tracking restrictions. How much they remove together depends on the site:
          </p>
          <p>
            &mdash; Measured on <Link href="/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Incapto&rsquo;s Shopify store over 48 days</Link>: GA4 did not record 29% of visits
          </p>
          <p>
            This is not a rounding error. It means marketing teams making budget decisions on a fragment of their real data &mdash; a problem that compounds across every report, every attribution model, and every ROI calculation.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">First-party vs third-party collection</h2>
          <p>
            Ad blockers target third-party scripts &mdash; JavaScript loaded from external domains. <Link href="/glossary/first-party-data-collection" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">First-party data collection</Link> operates differently: the tracking endpoint lives on your own domain, so it does not appear on the third-party lists blockers match against. A filter rule written for that specific subdomain can still block it.
          </p>
          <p>
            <Link href="/glossary/first-party-data-collection" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">First-party data collection</Link> takes this further by routing data through your own domain, eliminating the third-party requests that ad blockers intercept. <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless analytics</Link> platforms like Sealmetrics combine first-party infrastructure with no cookies to measure visitor activity without depending on consent or ad blocker status.
          </p>
        </div>

        <CommercialModule hook="In first-party mode, Sealmetrics sits off the lists ad blockers use. See what your traffic looks like when far fewer sessions get stripped out." />

        <RelatedGlossaryTerms slug="ad-blocker-analytics-impact" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/cookieless-analytics-explained" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cookieless Analytics Explained</Link> &middot; <Link href="/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">How Sealmetrics Works</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
