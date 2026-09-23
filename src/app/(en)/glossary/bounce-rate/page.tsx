import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { RelatedGlossaryTerms } from "@/components/ui/RelatedGlossaryTerms";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "How Is Bounce Rate Calculated? — The Formula Explained",
  description:
    "Bounce rate = single-page sessions ÷ total sessions in traditional analytics tools; standard market tools flip it to inverse of engagement rate (under 10s, no conversion, under 2 pageviews).",
  openGraph: {
    title: "What Is Bounce Rate?",
    description: "Bounce rate measures single-page sessions. Learn how standard market tools redefined it and why incomplete data distorts it.",
    type: "article",
    url: "https://sealmetrics.com/glossary/bounce-rate/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/bounce-rate/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Bounce Rate?",
    description: "Bounce rate measures single-page sessions. Learn how standard market tools redefined it and why incomplete data distorts it.",
    images: [ogImage("/glossary/bounce-rate/")],
  },
  alternates: { canonical: "https://sealmetrics.com/glossary/bounce-rate/" },
};

export default function BounceRatePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Bounce Rate" }]} />
      <JsonLd data={definedTermSchema({ name: "Bounce Rate", description: "Percentage of sessions where the visitor viewed only one page before leaving the site.", url: "/glossary/bounce-rate", related: [{ name: "Event Tracking", url: "/glossary/event-tracking" }, { name: "Data Sampling", url: "/glossary/data-sampling" }, { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Bounce Rate", url: "/glossary/bounce-rate" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Bounce Rate</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              The percentage of sessions in which the visitor viewed only one page before leaving. In standard market tools, bounce rate is redefined as the inverse of engagement rate &mdash; a session is a &ldquo;bounce&rdquo; if it lasts under 10 seconds, triggers no conversion event, and includes fewer than 2 pageviews.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">How bounce rate is calculated</h2>
          <p>
            Under the traditional standard, the formula was straightforward: single-page sessions divided by total sessions. A visitor who landed on a blog post, read it for 8 minutes, and left without clicking another page counted as a bounce &mdash; even though they consumed the content.
          </p>
          <p>
            Standard market tools changed this. A bounced session is now one that does not qualify as &ldquo;engaged.&rdquo; A session is engaged if any of the following are true:
          </p>
          <p>
            &mdash; It lasts longer than 10 seconds<br />
            &mdash; It includes 2 or more pageviews<br />
            &mdash; It triggers a conversion event
          </p>
          <p>
            This means bounce rates under the new definition are typically noticeably lower than bounce rates under the traditional definition for the same traffic. Comparing the two directly leads to false conclusions.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Engagement-based vs traditional bounce rate</h2>
          <p>
            The shift from pageview-based to engagement-based bounce rate reflects a real improvement in measurement philosophy. However, it introduces a dependency on <Link href="/glossary/event-tracking" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">event tracking</Link> accuracy. If your events are not firing reliably &mdash; due to ad blockers, consent rejection, or <Link href="/glossary/data-sampling" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">data sampling</Link> &mdash; your engagement rate (and therefore bounce rate) is calculated on a partial dataset.
          </p>
          <p>
            For enterprise sites processing millions of sessions, standard market tools can apply sampling to exploration reports once query data exceeds large event volumes, according to platform documentation. Sampled engagement data means sampled bounce rates &mdash; which means the metric you are optimizing against may not reflect reality.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why bounce rate is unreliable on incomplete data</h2>
          <p>
            Bounce rate is a ratio metric &mdash; it requires both the numerator (single-page sessions) and the denominator (total sessions) to be accurate. When <Link href="/glossary/data-loss-in-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">analytics data loss</Link> removes sessions from the dataset &mdash; 29% of visits on <Link href="/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Incapto&rsquo;s Shopify store over 48 days</Link>, and a different share on every site &mdash; the remaining sample is biased. Visitors who accept cookies and do not use ad blockers are not representative of the full audience.
          </p>
          <p>
            Consider: tech-savvy visitors who use ad blockers also tend to navigate more efficiently, browse fewer pages, and convert at different rates. When these visitors are invisible to your analytics, your bounce rate reflects only the behavior of the less technically sophisticated segment of your audience. Decisions made on this distorted metric &mdash; redesigning landing pages, reallocating ad spend, changing content strategy &mdash; may be solving a problem that does not exist for your actual audience.
          </p>
          <p>
            Complete data collection, through <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless analytics</Link>, ensures bounce rate is calculated on sessions without consent gaps &mdash; not an unrepresentative fraction.
          </p>
        </div>

        <CommercialModule hook="A bounce rate computed on the fraction of traffic that consents skews hard. See yours measured without the consent gap." />

        <RelatedGlossaryTerms slug="bounce-rate" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/ga4-data-sampling-problem" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">The GA4 Data Sampling Problem</Link> &middot; <Link href="/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Sealmetrics Product</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
