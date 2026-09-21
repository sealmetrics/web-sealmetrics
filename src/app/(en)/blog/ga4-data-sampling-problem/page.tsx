import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import { getAlternates } from "@/lib/i18n/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";

export const metadata: Metadata = {
  title: "GA4 Data Sampling: Why Your Numbers Are Wrong",
  description:
    "GA4 applies data sampling when traffic exceeds certain thresholds. Here is how it works, why it matters, and what you can do about it.",
  openGraph: {
    title: "GA4 Data Sampling: Why Your Traffic Numbers Are Wrong",
    description:
      "GA4 applies data sampling at high traffic volumes. Here is how it affects your data and decisions.",
    type: "article",
    url: "https://sealmetrics.com/blog/ga4-data-sampling-problem/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/ga4-data-sampling-problem.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "GA4 Data Sampling: Why Your Traffic Numbers Are Wrong",
    description: "GA4 applies data sampling at high traffic volumes. Here is how it affects your data and decisions.",
    images: ["https://sealmetrics.com/og/blog/ga4-data-sampling-problem.png"],
  },
  alternates: {
    languages: getAlternates("/blog/ga4-data-sampling-problem"),
    canonical: "https://sealmetrics.com/blog/ga4-data-sampling-problem/",
  },
};

export default function GA4DataSamplingPage() {
  const dates = postDates("ga4-data-sampling-problem");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "GA4 Data Sampling Problem" }]} />
      <JsonLd data={articleSchema({ headline: "GA4 Data Sampling: Why Your Traffic Numbers Are Wrong", description: "GA4 applies data sampling that distorts your analytics.", ...dates, url: "/blog/ga4-data-sampling-problem", category: "Data Quality", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "GA4 Data Sampling", url: "/blog/ga4-data-sampling-problem" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Data Quality
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            GA4 Data Sampling: Why Your Traffic Numbers Are Wrong
          </h1>
          <PostByline
              {...dates}
              readTime="7 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
        </header>

        <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
          <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li>GA4 applies data sampling in Exploration reports when data exceeds internal thresholds — the free version has lower thresholds than GA360.</li>
            <li>Sampled data can reverse campaign performance rankings: Campaign A with 342 real conversions could be estimated at 310 while Campaign B with 298 shows as 320.</li>
            <li>Before sampling even begins, GA4 has already lost part of your EU traffic to consent rejection, ad blockers, and browser restrictions — how much depends on the store; at Incapto, measured on Shopify over 48 days, it was 29% of visits. You are making decisions based on an estimate of a fraction.</li>
            <li>Cookieless analytics counts sessions without consent loss or sampling — when you see 72,847 visitors, that is 72,847 actual sessions, not a projection.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            If your website receives significant traffic, GA4 is not showing you
            all of it. It is showing you a statistical estimate based on a
            sample. This is called{" "}
            <Link
              href="/glossary/data-sampling"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              data sampling
            </Link>
            , and it is one of the most misunderstood aspects of Google
            Analytics.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What is data sampling in GA4?
          </h2>

          <p>
            Data sampling occurs when GA4 analyzes a subset of your data and
            extrapolates the results to represent the full dataset. Instead of
            processing every event, GA4 takes a statistical sample and applies
            mathematical models to estimate what the full picture would look
            like.
          </p>

          <p>
            In GA4, <a href="https://support.google.com/analytics/answer/13331684" target="_blank" rel="noopener noreferrer">sampling is triggered</a> when you create exploration reports
            that exceed certain data thresholds. Google does not publicly
            disclose the exact thresholds, but the sampling icon appears in your
            reports when it is active. The free version of GA4 has lower
            thresholds than GA360, which means sampling kicks in sooner for most
            businesses.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Why sampling matters for decision-making
          </h2>

          <p>
            Sampling introduces a margin of error. For high-level traffic
            trends, this might be acceptable. But for specific analyses —
            campaign performance by segment, conversion path analysis, revenue
            attribution by creative — even small margins of error compound into
            unreliable conclusions. The case for{" "}
            <Link href="/complete-data" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">complete data</Link>{" "}
            — measurement, not estimation — sits on the pillar.
          </p>

          <p>Consider a scenario:</p>

          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] text-[0.9rem] my-6">
            <p className="mb-3">
              Your actual data shows Campaign A generated 342 conversions and
              Campaign B generated 298. After sampling, GA4 estimates Campaign A
              at 310 and Campaign B at 320. You increase budget for Campaign B.
            </p>
            <p className="text-text-tertiary">
              The decision was based on sampled data. The reality was the
              opposite.
            </p>
          </div>

        <CommercialModule
          hook="Hitting GA4's sampling thresholds? See your own reports unsampled — Sealmetrics processes every collected event at any volume."
        />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Sampling is only part of the problem
          </h2>

          <p>
            Sampling reduces the accuracy of data you do have. But the larger
            problem is the data you never collect in the first place. Before
            sampling even begins, GA4 has already lost visitors to{" "}
            <Link
              href="/blog/consent-banner-impact-on-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              consent banner rejection
            </Link>
            , ad blockers, and browser cookie restrictions.
          </p>

          <p>
            How much is lost varies by site. On Incapto&apos;s Shopify store,
            where GA4 with Consent Mode and Sealmetrics ran side by side for 48 days,{" "}
            <Link href="/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GA4 did not record 29% of visits and 45% of pageviews</Link>
            . Sampling then degrades the accuracy of whatever is
            left. You are making decisions based on an estimate of a fraction.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The alternative: full-resolution analytics
          </h2>

          <p>
            <Link
              href="/glossary/cookieless-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Cookieless analytics
            </Link>{" "}
            platforms like Sealmetrics take a fundamentally different approach.
            By collecting data through first-party cookieless methods, sessions
            are counted whether or not the consent banner is accepted, without the
            third-party signatures that ad blockers and browser restrictions target. And because the data volume is
            managed at the infrastructure level, there is no need for statistical
            sampling.
          </p>

          <p>
            When you see 72,847 visitors in Sealmetrics, that number represents
            72,847 actual sessions. Not a sample. Not an estimate. Not a
            projection from the subset that happened to accept cookies.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What you can do about it
          </h2>

          <p>
            If you are using GA4, check your exploration reports for the sampling
            indicator. If you see it, your data is approximate. For standard
            reports, GA4 uses modeled data (Google calls it &ldquo;blended
            data&rdquo;), which introduces its own estimation layer.
          </p>

          <p>
            The most reliable way to understand the gap is to run a complete
            analytics tool alongside GA4 and compare the numbers. You can{" "}
            <Link
              href="/data-loss-calculator"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              estimate your data loss here
            </Link>{" "}
            or{" "}
            <Link
              href="/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              learn how cookieless analytics works
            </Link>
            .
          </p>
        </div>

        <CommercialModule
          hook="If your Black Friday reports are sampled, the decisions made on them are too. Run an unsampled parallel month and compare."
        />

        {/* Related */}
        <div className="mt-16 pt-10 border-t border-warm-100">
          <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
            Related articles
          </h3>
          <div className="space-y-3">
            <Link
              href="/blog/consent-banner-impact-on-analytics"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              How Consent Banners Destroy Your Analytics Data
            </Link>
            <Link
              href="/blog/multi-touch-attribution-complete-data"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              Why Multi-Touch Attribution Fails Without Complete Data
            </Link>
          </div>
        </div>
      </div>
        <RelatedReading currentSlug="ga4-data-sampling-problem" />
    </article>
    </>
  );
}
