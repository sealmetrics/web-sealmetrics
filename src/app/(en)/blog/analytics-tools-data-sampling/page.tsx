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
  title: "Data Sampling Thresholds Compared: 10 Analytics Tools",
  description:
    "We reviewed sampling thresholds for GA4, Adobe Analytics, Piwik PRO, Mixpanel, PostHog, and more. Here is when each tool starts guessing your data.",
  openGraph: {
    title: "Data Sampling Thresholds Compared: 10 Analytics Tools",
    description:
      "When does your analytics tool stop counting and start estimating? We compared sampling thresholds across 10 platforms.",
    type: "article",
    url: "https://sealmetrics.com/blog/analytics-tools-data-sampling/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/analytics-tools-data-sampling.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Data Sampling Thresholds Compared: 10 Analytics Tools",
    description: "When does your analytics tool stop counting and start estimating? We compared sampling thresholds across 10 platforms.",
    images: ["https://sealmetrics.com/og/blog/analytics-tools-data-sampling.png"],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/analytics-tools-data-sampling/",
  },
};

export default function DataSamplingComparedPage() {
  const dates = postDates("analytics-tools-data-sampling");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Data Sampling Thresholds Compared" }]} />
      <JsonLd data={articleSchema({ headline: "When Your Analytics Starts Guessing: Data Sampling Thresholds Compared", description: "We reviewed sampling thresholds for GA4, Adobe Analytics, Piwik PRO, Mixpanel, PostHog, and more. Here is when each tool starts guessing your data.", ...dates, url: "/blog/analytics-tools-data-sampling", category: "Data Quality", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Data Sampling Thresholds Compared", url: "/blog/analytics-tools-data-sampling" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Data Quality
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            When Your Analytics Starts Guessing: Data Sampling Thresholds Compared
          </h1>
          <PostByline
              {...dates}
              readTime="5 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
        </header>

        <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
          <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li>GA4 (free) starts sampling at ~10M events per query in Exploration reports; avoiding it requires upgrading to GA360, a quote-based contract that starts around $50K/year.</li>
            <li>A 10% sample introduces approximately +/-3% margin of error — at $10M revenue, that represents a $200K uncertainty in business decisions.</li>
            <li>Zero-sampling tools split into two categories: lightweight privacy tools for simple reporting, and Sealmetrics for enterprise revenue attribution.</li>
            <li>Sampling functions as a pricing lever in enterprise tools: companies must pay more to see their actual data instead of estimates.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            When your analytics tool says &ldquo;10,432 conversions last month,&rdquo;
            is that a count or an estimate? For GA4 users above a certain traffic
            threshold, it is an estimate. And the tool does not always tell you
            clearly.
          </p>

          <p>
            We reviewed official documentation, support articles, and community
            forums for 10 analytics platforms to document exactly when each one
            starts sampling, what triggers it, how users are informed, and what
            it costs to avoid.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What is data sampling?
          </h2>

          <p>
            <Link
              href="/glossary/data-sampling"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Data sampling
            </Link>{" "}
            is when your analytics tool counts a subset of events and
            extrapolates to produce the full number. Instead of querying every
            row in the database, the tool takes a 10% slice and multiplies by
            10. The result is an estimate, not a count.
          </p>

          <p>
            The margin of error grows as the sample shrinks. A 10% sample
            introduces approximately &plusmn;3% error at best. A 1% sample can
            swing &plusmn;10% or more. The smaller the sample, the less you can
            trust the number.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Sampling thresholds compared
          </h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-[0.9rem] border-collapse">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-2.5 pr-4 text-text-secondary font-medium">Tool</th>
                  <th className="text-left py-2.5 pr-4 text-text-secondary font-medium">Sampling starts at</th>
                  <th className="text-left py-2.5 pr-4 text-text-secondary font-medium">What triggers it</th>
                  <th className="text-center py-2.5 pr-4 text-text-secondary font-medium">User informed?</th>
                  <th className="text-left py-2.5 text-text-secondary font-medium">Way to avoid</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 font-medium text-text-primary">Sealmetrics</td>
                  <td className="py-2.5 pr-4 font-mono text-green-muted">Never</td>
                  <td className="py-2.5 pr-4 text-text-tertiary">&mdash;</td>
                  <td className="py-2.5 pr-4 text-center text-text-tertiary">&mdash;</td>
                  <td className="py-2.5 text-text-body">No sampling by design</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Plausible</td>
                  <td className="py-2.5 pr-4 font-mono text-green-muted">Never</td>
                  <td className="py-2.5 pr-4 text-text-tertiary">&mdash;</td>
                  <td className="py-2.5 pr-4 text-center text-text-tertiary">&mdash;</td>
                  <td className="py-2.5 text-text-body">No sampling</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Fathom</td>
                  <td className="py-2.5 pr-4 font-mono text-green-muted">Never</td>
                  <td className="py-2.5 pr-4 text-text-tertiary">&mdash;</td>
                  <td className="py-2.5 pr-4 text-center text-text-tertiary">&mdash;</td>
                  <td className="py-2.5 text-text-body">No sampling</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Simple Analytics</td>
                  <td className="py-2.5 pr-4 font-mono text-green-muted">Never</td>
                  <td className="py-2.5 pr-4 text-text-tertiary">&mdash;</td>
                  <td className="py-2.5 pr-4 text-center text-text-tertiary">&mdash;</td>
                  <td className="py-2.5 text-text-body">No sampling</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Piwik PRO</td>
                  <td className="py-2.5 pr-4 font-mono text-text-body">Never (up to plan limit)</td>
                  <td className="py-2.5 pr-4 text-text-body">Plan event cap</td>
                  <td className="py-2.5 pr-4 text-center text-text-body">Yes</td>
                  <td className="py-2.5 text-text-body">Upgrade plan</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Mixpanel</td>
                  <td className="py-2.5 pr-4 font-mono text-text-body">Custom (plan-dependent)</td>
                  <td className="py-2.5 pr-4 text-text-body">Report complexity</td>
                  <td className="py-2.5 pr-4 text-center text-text-body">Sometimes</td>
                  <td className="py-2.5 text-text-body">Upgrade</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">PostHog</td>
                  <td className="py-2.5 pr-4 font-mono text-text-body">~1M events/month (free)</td>
                  <td className="py-2.5 pr-4 text-text-body">Event volume</td>
                  <td className="py-2.5 pr-4 text-center text-text-body">Yes</td>
                  <td className="py-2.5 text-text-body">Pay per event</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">GA4 (Free)</td>
                  <td className="py-2.5 pr-4 font-mono text-red-alert">~10M events/query</td>
                  <td className="py-2.5 pr-4 text-text-body">Exploration reports exceeding 10M events</td>
                  <td className="py-2.5 pr-4 text-center text-text-body">Small shield icon</td>
                  <td className="py-2.5 text-text-body">Upgrade to GA360 (quote-based, from ~$50K/yr)</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">GA4 (GA360)</td>
                  <td className="py-2.5 pr-4 font-mono text-text-body">~1B events/property</td>
                  <td className="py-2.5 pr-4 text-text-body">Very high volume + complex queries</td>
                  <td className="py-2.5 pr-4 text-center text-text-body">Shield icon</td>
                  <td className="py-2.5 text-text-body">Use BigQuery export</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Adobe Analytics</td>
                  <td className="py-2.5 pr-4 font-mono text-text-body">Contract-dependent</td>
                  <td className="py-2.5 pr-4 text-text-body">Server call volume + report complexity</td>
                  <td className="py-2.5 pr-4 text-center text-text-body">Processing indicator</td>
                  <td className="py-2.5 text-text-body">Contract negotiation</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Methodology: we reviewed official documentation, published support
            articles, and community forums for each platform. We documented when
            sampling starts, what triggers it, how users are notified, and what
            options exist to avoid it.
          </p>

          <CommercialModule
            hook="The Sealmetrics row reads Never — no sampling by design, at any volume. Check whether your own GA4 reports are already estimates."
          />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            GA4&apos;s sampling problem in detail
          </h2>

          <p>
            The <a href="https://support.google.com/analytics/answer/13331684" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">~10M threshold in GA4</a> applies to Exploration reports — the
            advanced analysis section, not standard reports. Standard reports use
            pre-aggregated data and are typically unsampled. But the moment you
            build a custom Exploration, add segments, extend the date range, or
            compare multiple dimensions, you can exceed 10 million events and
            trigger sampling — often without realizing it.
          </p>

          <p>
            GA4 indicates sampling with a small green checkmark or shield icon in
            the report header. It is easy to miss — especially for marketers who
            are not trained to look for it. Many teams present sampled data in
            board reports without realizing the numbers are estimates, not counts.
            We covered this in detail in{" "}
            <Link
              href="/blog/ga4-data-sampling-problem"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              GA4 Data Sampling: Why Your Numbers Are Wrong
            </Link>
            .
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Why sampling matters for business decisions
          </h2>

          <p>
            A 10% sample introduces approximately &plusmn;3% margin of error at
            best. If your conversion rate is 2.5%, the real number could be
            anywhere from 2.4% to 2.6%. That sounds small until you apply it to
            revenue. At $10M annual revenue, that range represents a $200K
            uncertainty — the difference between a campaign that looks profitable
            and one that does not.
          </p>

          <p>
            Budget allocation, campaign optimization, funnel analysis, A/B test
            results — all of these depend on accurate counts. When the underlying{" "}
            <Link
              href="/glossary/data-loss-in-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              data loss
            </Link>{" "}
            comes from sampling, every decision downstream carries inherited
            uncertainty. You are not optimizing your funnel. You are optimizing
            an approximation of your funnel.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The enterprise pricing wall
          </h2>

          <p>
            GA4&apos;s solution to sampling is GA360, quote-based from around $50K per year.
            Adobe&apos;s solution is contract negotiation. In both cases, the
            sampling threshold functions as a pricing lever — pay more to see
            your actual data.
          </p>

          <p>
            This creates a two-tier system: companies that can afford complete
            data, and companies that make decisions on estimates without knowing
            it. The irony is that mid-market companies — the ones most sensitive
            to marketing ROI — are precisely the ones most likely to hit sampling
            thresholds without the budget to escape them.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The alternative: no sampling by design
          </h2>

          <p>
            Some tools simply do not sample. They store every event and query the
            full dataset every time. Sealmetrics and privacy-first lightweight
            tools such as Plausible, Fathom and Simple Analytics share that
            zero-sampling property, but they serve different buyers. When you see
            a number, it is a count — not an extrapolation.
          </p>

          <p>
            The difference between Sealmetrics and the privacy-lightweight
            alternatives is scope. Sealmetrics combines zero sampling with
            enterprise features:{" "}
            <Link
              href="/glossary/multi-touch-attribution"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              multi-touch attribution
            </Link>
            , LENS AI supervision,{" "}
            <Link
              href="/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              cookieless first-party collection
            </Link>
            , and full funnel analysis — all unsampled, with no consent-driven data loss.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            How to check if you are being sampled
          </h2>

          <p className="font-medium text-text-primary">
            GA4 (Free and GA360)
          </p>
          <p>
            Look for the green checkmark or shield icon in the top-left corner of
            any Explorations report. A green checkmark means unsampled. A yellow
            or orange shield means sampled. Hover over the icon for the sample
            percentage. Standard reports use pre-aggregated data and are typically
            not sampled, but Explorations, custom reports, and API queries are.
          </p>

          <p className="font-medium text-text-primary">
            Adobe Analytics
          </p>
          <p>
            Check for a &ldquo;processing&rdquo; indicator or data quality flag
            in Analysis Workspace. Adobe&apos;s sampling behavior depends on your
            contract tier and server call volume. If report generation takes
            unusually long and then returns quickly with round numbers, sampling
            may be active. Contact your Adobe account manager for your specific
            thresholds.
          </p>

          <p className="font-medium text-text-primary">
            Piwik PRO
          </p>
          <p>
            <a href="https://piwikpro.com/" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Piwik PRO</a> does not sample within your plan limits, but it stops
            collecting data once you exceed your event cap. Check your plan usage
            in the administration panel. If you are consistently near your limit,
            reports at the end of the billing period may be incomplete — not
            sampled, but truncated.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The bottom line
          </h2>

          <p>
            Data sampling is a trade-off between infrastructure cost and data
            accuracy. Some tools make that trade-off for you. Others let you
            choose. And a few never sample at all.
          </p>

          <p>
            If your business makes decisions based on analytics data — budget
            allocation, campaign optimization, conversion analysis — you need to
            know whether those numbers are counts or estimates. See how{" "}
            <Link
              href="/product"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Sealmetrics measures without consent gaps
            </Link>{" "}
            or sampling, or{" "}
            <Link
              href="/data-loss-calculator"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              calculate how much data you are losing
            </Link>{" "}
            to sampling and consent gaps today.
          </p>
        </div>

        <CommercialModule
          hook="Sampling is silent: the report looks the same, the numbers are not. Run an unsampled month in parallel and see which decisions change."
        />

        {/* Related */}
        <div className="mt-16 pt-10 border-t border-warm-100">
          <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
            Related articles
          </h3>
          <div className="space-y-3">
            <Link
              href="/blog/ga4-data-sampling-problem"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              GA4 Data Sampling: Why Your Numbers Are Wrong
            </Link>
            <Link
              href="/blog/ga4-alternatives-enterprise"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              GA4 Alternatives for Enterprise: A 2026 Comparison
            </Link>
          </div>
        </div>
      </div>
        <RelatedReading currentSlug="analytics-tools-data-sampling" />
    </article>
    </>
  );
}
