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
  title: "What Is ROAS (Return on Ad Spend)? — Sealmetrics Glossary",
  description:
    "ROAS is attributed revenue divided by ad spend. How it is calculated, why incomplete analytics data understates it, and what the ratio cannot tell you.",
  openGraph: {
    title: "What Is ROAS (Return on Ad Spend)?",
    description: "Attributed revenue divided by ad spend — and why unmeasured conversions systematically understate it.",
    type: "article",
    url: "https://sealmetrics.com/glossary/return-on-ad-spend/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/return-on-ad-spend/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is ROAS (Return on Ad Spend)?",
    description: "Attributed revenue divided by ad spend — and why unmeasured conversions systematically understate it.",
    images: [ogImage("/glossary/return-on-ad-spend/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/return-on-ad-spend/",
    languages: getAlternates("/glossary/return-on-ad-spend"),
  },
};

export default function ReturnOnAdSpendPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Return on Ad Spend (ROAS)" }]} />
      <JsonLd data={definedTermSchema({ name: "Return on Ad Spend (ROAS)", description: "Attributed revenue divided by ad spend, the standard efficiency ratio for paid media.", url: "/glossary/return-on-ad-spend", related: [{ name: "Revenue Attribution", url: "/glossary/revenue-attribution" }, { name: "Last-Click Attribution", url: "/glossary/last-click-attribution" }, { name: "Customer Lifetime Value (LTV)", url: "/glossary/customer-lifetime-value" }, { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Return on Ad Spend (ROAS)", url: "/glossary/return-on-ad-spend" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Return on Ad Spend (ROAS)</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Attributed revenue divided by ad spend. A ROAS of 4 means every euro of advertising returned four euros of measured revenue. The ratio is only as accurate as the revenue measurement feeding its numerator.
            </p>
          </div>

          <QuickAnswer>
            <p>
              Return on ad spend (ROAS) is the efficiency ratio for paid media: revenue attributed to a campaign divided by what the campaign cost. Spend €10,000 on Google Ads, measure €40,000 in attributed orders, and ROAS is 4 (often written 4:1 or 400%). The denominator comes from the ad platform and is exact; the numerator comes from your analytics and is only as complete as your measurement. In the EU, cookie-based tools observe a fraction of real traffic — consent rejection removes 15–60% of visitors depending on sector, brand strength and traffic mix, before ad blockers and browser restrictions remove more — so conversions go unmeasured and ROAS reads lower than reality. Because budgets follow the ratio, an understated ROAS does not just misreport a channel; it actively moves money away from campaigns that were working.
            </p>
          </QuickAnswer>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">How ROAS is calculated</h2>
          <p>
            The formula is simple: attributed revenue ÷ ad spend. The complexity hides in the word &ldquo;attributed.&rdquo; Spend is a fact the ad platform bills you for. Revenue attributed to that spend depends on three measurement choices: which tool records the conversion, which <Link href="/glossary/attribution-model" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">attribution model</Link> assigns it to a channel, and which <Link href="/glossary/attribution-window" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">attribution window</Link> bounds the claim. Change any of the three and the same campaign produces a different ROAS — which is why Google Ads, Meta and your analytics rarely agree on the number.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why incomplete data understates ROAS</h2>
          <p>
            The asymmetry is the problem. The denominator (spend) is always complete. The numerator (measured revenue) is complete only if the analytics tool observed every conversion. In the EU, cookie-based analytics does not come close: GA4 doesn&rsquo;t see part of your traffic, because consent rejection, ad blockers and browser restrictions each take a share. In our experience with clients, between 40% and 60% of traffic doesn&rsquo;t accept cookies; on <Link href="/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Incapto&rsquo;s Shopify store, measured over 48 days</Link>, GA4 did not record 29% of visits. Either way, a ROAS computed on that fragment divides full spend by partial revenue.
          </p>
          <p>
            The distortion is not evenly distributed either. Consent rejection and blocker usage vary by market, device and audience, so some campaigns lose more measured conversions than others. A prospecting campaign reaching privacy-conscious German desktop users can look far worse than a retargeting campaign reaching returning mobile buyers, even when their true returns are similar. Budget then flows toward the campaigns that are easiest to measure, not the ones that perform best. <Link href="/complete-data" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Complete data</Link> — <Link href="/glossary/revenue-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">revenue attribution</Link> computed on observed orders without consent gaps rather than on the consenting minority — removes that bias from the numerator.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What ROAS does not tell you</h2>
          <p>
            ROAS is a revenue ratio, not a profit ratio. It ignores margin, returns, shipping and the cost of goods — a ROAS of 4 on a 20%-margin product loses money. It is also blind to incrementality: it credits revenue that may have arrived anyway, which is why branded search campaigns post spectacular ratios. And because it measures a single transaction, it says nothing about <Link href="/glossary/customer-lifetime-value" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">customer lifetime value</Link> — a campaign with mediocre first-order ROAS can still be your best acquisition channel if those customers reorder. Treat ROAS as a comparative efficiency signal between campaigns measured the same way, not as a verdict on profitability.
          </p>
        </div>

        <CommercialModule hook="A ROAS computed on the fraction of EU traffic that consents is a guess with two decimal places. See yours calculated without consent gaps." />

        <RelatedGlossaryTerms slug="return-on-ad-spend" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/why-ga4-misses-traffic" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Why GA4 Doesn&apos;t See Part of Your Traffic</Link> &middot; <Link href="/complete-data" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Complete Data</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
