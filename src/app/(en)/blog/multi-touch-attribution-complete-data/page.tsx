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
  title: "Multi-Touch Attribution Fails Without Complete Data",
  description:
    "Your attribution model is only as good as the data feeding it. When 87% of touchpoints are missing, every attribution conclusion is wrong.",
  openGraph: {
    title: "Why Multi-Touch Attribution Fails Without Complete Data",
    description:
      "Attribution models built on 13% of data produce misleading results. Here is why complete data changes everything.",
    type: "article",
    url: "https://sealmetrics.com/blog/multi-touch-attribution-complete-data/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/multi-touch-attribution-complete-data.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Why Multi-Touch Attribution Fails Without Complete Data",
    description: "Attribution models built on 13% of data produce misleading results. Here is why complete data changes everything.",
    images: ["https://sealmetrics.com/og/blog/multi-touch-attribution-complete-data.png"],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/multi-touch-attribution-complete-data/",
  },
};

export default function MultiTouchAttributionPage() {
  const dates = postDates("multi-touch-attribution-complete-data");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Multi-Touch Attribution" }]} />
      <JsonLd data={articleSchema({ headline: "Why Multi-Touch Attribution Fails Without Complete Data", description: "Attribution models need complete data to work.", ...dates, url: "/blog/multi-touch-attribution-complete-data", category: "Attribution", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Multi-Touch Attribution", url: "/blog/multi-touch-attribution-complete-data" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Attribution
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            Why Multi-Touch Attribution Fails Without Complete Data
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
            <li>Multi-touch attribution models see only 13% of touchpoints in EU traffic — the remaining 87% are lost to consent rejection, ad blockers, and browser restrictions.</li>
            <li>Direct traffic is systematically inflated because it absorbs all untracked touchpoints, while top-of-funnel channels (organic, social, display) are undervalued because first touches are most likely to be lost.</li>
            <li>GA4 data-driven attribution uses ML on a biased 13% sample — it learns patterns from cookie-accepting visitors and extrapolates to the full population, producing sophisticated but misleading results.</li>
            <li>When cookieless analytics stops losing traffic to consent rejection, touchpoints hidden by the banner become visible, and attribution models distribute credit based on actual behavior rather than estimates.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            Multi-touch attribution is supposed to answer the most important
            question in marketing: which channels and campaigns actually drive
            revenue? The models — linear, time-decay, position-based,
            data-driven — are sophisticated. The math works. But the data
            feeding the models is fatally incomplete.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Attribution requires complete journeys
          </h2>

          <p>
            For any attribution model to work correctly, it needs to see the
            complete customer journey — every touchpoint from first awareness to
            final conversion. A typical eCommerce purchase might involve:
          </p>

          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] my-6 text-[0.9rem] space-y-2">
            <p>
              <span className="font-mono text-text-tertiary mr-3">Day 1</span>
              <span className="text-text-body">
                Organic search &rarr; Product page view
              </span>
            </p>
            <p>
              <span className="font-mono text-text-tertiary mr-3">Day 3</span>
              <span className="text-text-body">
                Retargeting ad &rarr; Category browsing
              </span>
            </p>
            <p>
              <span className="font-mono text-text-tertiary mr-3">Day 5</span>
              <span className="text-text-body">
                Email campaign &rarr; Product comparison
              </span>
            </p>
            <p>
              <span className="font-mono text-text-tertiary mr-3">Day 7</span>
              <span className="text-text-body">
                Direct visit &rarr; Purchase (&euro;120)
              </span>
            </p>
          </div>

          <p>
            A multi-touch attribution model would distribute the &euro;120 across
            all four touchpoints based on the model logic. But here is the
            problem: if the visitor rejected cookies on Day 1, the first three
            touchpoints are invisible. The attribution model sees only the direct
            visit on Day 7 and assigns 100% of credit to &ldquo;direct.&rdquo;
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The 87% data gap
          </h2>

          <p>
            In the EU, based on internal aggregated estimates, traditional analytics capture approximately 13% of actual
            traffic after{" "}
            <Link
              href="/blog/consent-banner-impact-on-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              consent banner rejection
            </Link>
            , ad blockers, browser cookie restrictions, and{" "}
            <Link
              href="/blog/ga4-data-sampling-problem"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              data sampling
            </Link>
            . This means your attribution model is seeing 13% of touchpoints
            and making conclusions about budget allocation.
          </p>

          <p>The consequences are predictable:</p>

          <ul className="space-y-2 pl-0 list-none">
            {[
              "Direct traffic is inflated — it absorbs all untracked touchpoints",
              "Top-of-funnel channels (organic, social, display) are systematically undervalued because first touches are most likely to be lost",
              "Email and retargeting are over-credited — they tend to be later in the journey when cookies are more likely to be active",
              "Budget allocation follows the bias, reinforcing spending on channels that appear to perform better simply because they are more visible to cookies",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[0.95rem]"
              >
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                {item}
              </li>
            ))}
          </ul>

          <CommercialModule hook="Last-click on data without consent gaps vs modelled multi-touch on a fraction — see the difference on your own channel mix." />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Google&rsquo;s data-driven attribution is not the answer
          </h2>

          <p>
            <a href="https://support.google.com/analytics/answer/10596866" target="_blank" rel="noopener noreferrer">GA4&rsquo;s data-driven attribution</a> (DDA) uses machine learning to
            distribute credit across touchpoints. It is technically advanced, but
            it has a fundamental limitation: it can only learn from the data it
            has.
          </p>

          <p>
            If 87% of touchpoints are missing, the ML model learns patterns from
            a biased sample — the 13% of visitors who accepted cookies, did not
            use ad blockers, and had persistent cookie storage. The model then
            extrapolates these patterns to the entire population. It is a
            sophisticated answer to the wrong question.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Attribution on complete data
          </h2>

          <p>
            When you measure traffic without depending on consent through{" "}
            <Link
              href="/glossary/cookieless-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              cookieless analytics
            </Link>
            , attribution models work as designed. Touchpoints lost at the
            banner become visible. The model distributes credit based on actual
            behavior, not on cookie-accepting behavior extrapolated to the full
            population.
          </p>

          <p>
            Sealmetrics provides last-click revenue attribution built on
            session data without consent gaps. Because visits are counted whether
            or not the banner is accepted, the attribution reflects
            what actually happened — not what the cookie-accepting subset
            suggests might have happened.
          </p>

          <p>
            The difference is particularly dramatic for top-of-funnel channels.
            When first touches are no longer systematically lost, organic
            search, social, and display campaigns receive accurate credit for
            their contribution to revenue.{" "}
            <Link
              href="/product"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              See how Sealmetrics handles attribution
            </Link>
            .
          </p>
        </div>

        <CommercialModule hook="We don't do multi-touch — deliberately. See what last-click on complete data tells you that models can't." />

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
              href="/blog/ai-agent-traffic-analytics"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              AI Agent Traffic: The Invisible Channel Your Analytics Miss
            </Link>
          </div>
        </div>
      </div>
        <RelatedReading currentSlug="multi-touch-attribution-complete-data" />
    </article>
    </>
  );
}
