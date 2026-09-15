import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";

export const metadata: Metadata = {
  title: "How Analytics Scripts Are Costing You Sales",
  description:
    "Heavy analytics scripts slow your site, consent banners hide visitors, and ad blockers erase data. The compound effect is costing you conversions.",
  openGraph: {
    title: "How Analytics Scripts Are Costing You Sales",
    description:
      "Heavy scripts, consent banners, and ad blockers create a compound effect that costs you conversions.",
    type: "article",
    url: "https://sealmetrics.com/blog/analytics-scripts-costing-you-sales/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/analytics-scripts-costing-you-sales.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "How Analytics Scripts Are Costing You Sales",
    description: "Heavy scripts, consent banners, and ad blockers create a compound effect that costs you conversions.",
    images: ["https://sealmetrics.com/og/blog/analytics-scripts-costing-you-sales.png"],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/analytics-scripts-costing-you-sales/",
  },
};

export default function AnalyticsScriptsPage() {
  const dates = postDates("analytics-scripts-costing-you-sales");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Analytics Scripts Costing You Sales" }]} />
      <JsonLd data={articleSchema({ headline: "The Hidden Conversion Killer: How Analytics Scripts Are Costing You Sales", description: "Heavy analytics scripts slow your site, consent banners hide visitors, and ad blockers erase data.", ...dates, url: "/blog/analytics-scripts-costing-you-sales", category: "Performance", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Analytics Scripts Costing You Sales", url: "/blog/analytics-scripts-costing-you-sales" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Performance
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            The Hidden Conversion Killer: How Analytics Scripts Are Costing You Sales
          </h1>
          <PostByline
              {...dates}
              readTime="3 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
        </header>

        <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
          <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li>Every 100ms of site speed improvement produces +8.4% conversions in eCommerce, +10.1% in travel, and +21.6% in lead forms.</li>
            <li>GA4 script is ~146 KB (gzipped) and the Adobe stack is ~170 KB, while Sealmetrics is just 1.1 KB — the tool measuring conversions may be costing you conversions.</li>
            <li>The compound effect is multiplicative: heavy scripts slow pages, consent banners reject 25-70% of visitors, and ad blockers erase ~32% of the rest.</li>
            <li>Traditional analytics captures less than half of actual traffic once all three forces — script weight, consent rejection, and tracker blocking — combine.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p className="text-[1.15rem] leading-[1.8] text-text-secondary italic">
            Every millisecond counts. Every consent click matters. Every blocked
            tracker is a customer you will never understand.
          </p>

          <p>
            There are three forces quietly destroying your conversion data:
            page speed degradation from analytics scripts, visitors lost to{" "}
            <Link
              href="/blog/consent-banner-impact-on-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              consent banner rejection
            </Link>
            , and traffic erased by tracker blocking. Each one is damaging on
            its own. Together, the compound effect is devastating. The
            architectural alternative — measurement on{" "}
            <Link href="/complete-data" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">complete data</Link>
            , not on the surviving fraction — sits on the pillar.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Page speed and conversions
          </h2>

          <p>
            A Deloitte and Google study across 30 million sessions and 37 brands
            found that every 100ms of site speed improvement produced
            measurable conversion lifts:
          </p>

          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] text-[0.9rem] my-6 space-y-2">
            <p>
              <span className="font-mono font-medium text-text-primary">+8.4%</span>{" "}
              conversions per 100ms improvement in eCommerce
            </p>
            <p>
              <span className="font-mono font-medium text-text-primary">+10.1%</span>{" "}
              conversions per 100ms improvement in travel
            </p>
            <p>
              <span className="font-mono font-medium text-text-primary">+21.6%</span>{" "}
              conversions per 100ms improvement in lead forms
            </p>
          </div>

          <p>
            More recent case studies reinforce this. Vodafone Italy improved
            <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">LCP</a> by 31% and saw an 8% increase in sales. Redbus reduced INP by
            50% and mobile conversions jumped 80-100%. Lazada improved LCP by
            3x and gained 16.9% more mobile conversions.
          </p>

          <p>
            Now consider the size of common analytics scripts (gzipped):
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-[0.9rem] border-collapse">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-2.5 pr-4 text-text-secondary font-medium">Tool</th>
                  <th className="text-right py-2.5 text-text-secondary font-medium">Script size</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 font-medium text-text-primary">Sealmetrics</td>
                  <td className="py-2.5 text-right font-mono text-green-muted">1.1 KB</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Google Analytics 4</td>
                  <td className="py-2.5 text-right font-mono text-text-body">~146 KB</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Adobe Analytics</td>
                  <td className="py-2.5 text-right font-mono text-red-alert">~170 KB</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Heavy scripts compete for bandwidth, increase Total Blocking Time,
            and degrade <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Interaction to Next Paint</a>. The tool you use to
            understand conversions may be costing you conversions. A{" "}
            <Link href="/how-it-works" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless first-party approach</Link>{" "}
            eliminates this overhead entirely.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The consent banner tax
          </h2>

          <p>
            In EU eCommerce, consent acceptance rates typically range from 30%
            to 75%. Every visitor who rejects the banner becomes invisible to
            cookie-based analytics. You lose not just pageview data but the
            entire session — every product viewed, every add-to-cart, every
            checkout step.
          </p>

          <p>
            That is 25-70% of your traffic gone before a single data point is
            recorded.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The data black hole
          </h2>

          <p>
            Even among visitors who accept cookies, ad blockers erase roughly
            32% of tracking requests. iOS devices with{" "}
            <Link
              href="/glossary/intelligent-tracking-prevention"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Safari ITP
            </Link>{" "}
            cap cookie lifetimes, degrading attribution for another ~27% of
            traffic. Privacy-focused browsers account for roughly 15% more.
          </p>

          <p>
            The compound effect: traditional analytics captures less than half
            of actual traffic.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The compound effect
          </h2>

          <p>
            These three forces are not additive — they are multiplicative. A
            heavy script (90+ KB) slows the page, hurting conversions. A
            consent banner rejects 25-70% of visitors. Ad blockers erase ~32%
            of the rest. Each layer strips away data and revenue.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-[0.9rem] border-collapse">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-2.5 pr-4 text-text-secondary font-medium">Metric</th>
                  <th className="text-right py-2.5 pr-6 text-text-secondary font-medium">GA4</th>
                  <th className="text-right py-2.5 text-text-secondary font-medium">Sealmetrics</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Script size</td>
                  <td className="py-2.5 text-right pr-6 font-mono text-text-body">~146 KB</td>
                  <td className="py-2.5 text-right font-mono text-green-muted">1.1 KB</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Consent required</td>
                  <td className="py-2.5 text-right pr-6 font-mono text-text-body">Yes</td>
                  <td className="py-2.5 text-right font-mono text-green-muted">No</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Tracked visitors</td>
                  <td className="py-2.5 text-right pr-6 font-mono text-red-alert">30-75%</td>
                  <td className="py-2.5 text-right font-mono text-green-muted">No consent loss</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Ad blocker resistant</td>
                  <td className="py-2.5 text-right pr-6 font-mono text-text-body">No</td>
                  <td className="py-2.5 text-right font-mono text-green-muted">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            The tool you use to understand conversions may be the single
            largest drag on your ability to understand and optimize them.{" "}
            <Link
              href="/data-loss-calculator"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Calculate how much data you are losing
            </Link>
            .
          </p>
        </div>

        <CommercialModule
          hook="Speed, banners and blocked scripts compound into one number: sales your analytics never saw. Measure the compound effect on your own site."
        />

        {/* Related */}
        <div className="mt-16 pt-10 border-t border-warm-100">
          <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
            Related articles
          </h3>
          <div className="space-y-3">
            <Link
              href="/blog/we-measured-every-analytics-script"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              We Measured Every Analytics Script. Here Is What We Found.
            </Link>
            <Link
              href="/blog/consent-banner-impact-on-analytics"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              How Consent Banners Destroy Your Analytics Data
            </Link>
          </div>
        </div>
      </div>
        <RelatedReading currentSlug="analytics-scripts-costing-you-sales" />
    </article>
    </>
  );
}
