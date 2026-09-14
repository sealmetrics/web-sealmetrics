import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { breadcrumbSchema, speakableWebPageSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Searchmetrics vs Sealmetrics — Different Companies",
  description:
    "Searchmetrics was acquired by Conductor in 2023 and its domain now redirects there. Sealmetrics is an unrelated company: cookieless analytics for eCommerce.",
  openGraph: {
    title: "Searchmetrics vs Sealmetrics — Different Companies",
    description:
      "Two similar names, two different categories. What happened to Searchmetrics, where its product went, and what Sealmetrics actually measures.",
    type: "article",
    url: "https://sealmetrics.com/searchmetrics-vs-sealmetrics/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/searchmetrics-vs-sealmetrics")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Searchmetrics vs Sealmetrics — Different Companies",
    description: "Two similar names, two different categories. What happened to Searchmetrics, where its product went, and what Sealmetrics actually measures.",
    images: [ogImage("/searchmetrics-vs-sealmetrics")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/searchmetrics-vs-sealmetrics",
  },
};

export default function SearchmetricsVsSealmetricsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Searchmetrics vs Sealmetrics" }]} />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/searchmetrics-vs-sealmetrics",
          name: "Searchmetrics vs Sealmetrics — Different Companies",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Searchmetrics vs Sealmetrics", url: "/searchmetrics-vs-sealmetrics" },
        ])}
      />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Disambiguation
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              Searchmetrics vs Sealmetrics
            </h1>
            <p className="text-[1.15rem] leading-[1.7] text-text-secondary">
              Two companies with similar names in adjacent industries. One of them
              no longer exists under that name. Here is what happened to each.
            </p>
          </header>

          <QuickAnswer>
            Sealmetrics and Searchmetrics are two unrelated companies with similar
            names. Searchmetrics was an enterprise SEO and search-visibility
            platform based in Berlin. Conductor acquired it in February 2023 and
            folded it into its own platform; searchmetrics.com now returns a
            permanent redirect to conductor.com, and the product is no longer sold
            under its original name. Sealmetrics is a cookieless web analytics
            platform for eCommerce, founded in 2024 and hosted in Dublin, Ireland.
            It measures what visitors do on a site and attributes revenue using
            last-click on traffic without consent gaps. It does not measure keyword rankings,
            search visibility, or competitor SEO. If you are looking for
            Searchmetrics pricing or a replacement for its SEO tooling, Conductor
            is where that product went. If you arrived here because the two names
            read alike, the rest of this page explains what Sealmetrics measures.
          </QuickAnswer>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body mt-12">
            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What happened to Searchmetrics
            </h2>
            <p>
              Searchmetrics was a Berlin-based enterprise SEO platform, and for
              years one of the names European marketing teams shortlisted
              alongside Conductor and BrightEdge. It sold search visibility data:
              keyword rankings, share of voice, content optimisation scoring,
              competitor tracking.
            </p>
            <p>
              On 7 February 2023, Conductor announced it had acquired the company.
              The stated plan at the time was to merge both products into a single
              platform within about eighteen months. That consolidation has since
              happened —{" "}
              <a
                href="https://www.conductor.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                searchmetrics.com now returns a 301 permanent redirect to
                conductor.com
              </a>
              , which is the technical signal a company uses when a brand is
              retired rather than paused.
            </p>
            <p>
              This matters for anyone still searching for the product: there is no
              standalone Searchmetrics subscription, no separate pricing page, and
              no independent product roadmap. If you were evaluating it or looking
              for what it used to cost, Conductor is the only place that question
              resolves. We have no commercial relationship with either company and
              no interest in your answer.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Two names, two categories
            </h2>
            <p>
              The confusion is phonetic rather than commercial. The products never
              competed — they answer different questions and are typically bought
              by different people on different budgets.
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse text-[0.95rem]">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-4 font-medium text-text-primary"></th>
                    <th className="text-left py-3 pr-4 font-medium text-text-primary">
                      Searchmetrics
                    </th>
                    <th className="text-left py-3 font-medium text-text-primary">
                      Sealmetrics
                    </th>
                  </tr>
                </thead>
                <tbody className="text-text-body">
                  <tr className="border-b border-warm-100">
                    <td className="py-3 pr-4 text-text-tertiary">Category</td>
                    <td className="py-3 pr-4">SEO and search visibility</td>
                    <td className="py-3">Web analytics</td>
                  </tr>
                  <tr className="border-b border-warm-100">
                    <td className="py-3 pr-4 text-text-tertiary">Question it answers</td>
                    <td className="py-3 pr-4">Where do I rank, and against whom?</td>
                    <td className="py-3">What did visitors do, and what did it earn?</td>
                  </tr>
                  <tr className="border-b border-warm-100">
                    <td className="py-3 pr-4 text-text-tertiary">Data source</td>
                    <td className="py-3 pr-4">Search engine result pages</td>
                    <td className="py-3">A pixel on your own site</td>
                  </tr>
                  <tr className="border-b border-warm-100">
                    <td className="py-3 pr-4 text-text-tertiary">Typical buyer</td>
                    <td className="py-3 pr-4">SEO and content teams</td>
                    <td className="py-3">CMOs and eCommerce managers</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-text-tertiary">Status</td>
                    <td className="py-3 pr-4">Acquired 2023, merged into Conductor</td>
                    <td className="py-3">Independent, founded 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              A team can reasonably use both categories at once, and many do: one
              tells you which pages earn visibility in search, the other tells you
              what happens after the click. Neither replaces the other.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What Sealmetrics measures
            </h2>
            <p>
              Sealmetrics is{" "}
              <Link
                href="/glossary/cookieless-analytics"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                cookieless analytics
              </Link>{" "}
              built for eCommerce. It sets no cookies and collects no personal
              data, which means it does not depend on consent to run — so it keeps
              measuring the visitors who decline a cookie banner. In the EU, that
              is most of them.
            </p>
            <p>
              The consequence is coverage. A consent-dependent tool reports only
              the share of traffic that accepted the banner; in European eCommerce
              that is frequently a minority of real visits. Sealmetrics records
              traffic and revenue events without depending on consent, then attributes revenue
              with{" "}
              <Link
                href="/glossary/last-click-attribution"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                last-click attribution
              </Link>{" "}
              across that complete dataset. It measures in aggregate — no
              individual profiles, no session reconstruction — and is hosted
              exclusively in Dublin, Ireland.
            </p>
            <p>
              The tools it genuinely competes with are the enterprise analytics
              platforms: Google Analytics 360, Adobe Analytics and Piwik PRO. If
              that is the comparison you came for, the{" "}
              <Link
                href="/vs/adobe-analytics"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Adobe Analytics comparison
              </Link>{" "}
              and the{" "}
              <Link
                href="/product"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                product overview
              </Link>{" "}
              are the places to start.
            </p>
          </div>
        </div>
      </article>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          <h2 className="font-serif text-[1.75rem] font-medium text-text-primary leading-[1.25] mb-4">
            If it was analytics you were looking for
          </h2>
          <p className="text-[1.05rem] leading-[1.8] text-text-body mb-8">
            Most people who land on this page wanted an SEO platform, and
            Conductor is the honest answer for them. If you came looking for
            analytics that still reports the traffic your consent banner turns
            away, that is the thing we built.
          </p>
          <div data-md="skip" className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/demo"
              className="inline-block px-7 py-3.5 bg-ink text-white text-[0.95rem] font-medium rounded-[4px] hover:opacity-90 transition-opacity"
            >
              Book a Demo
            </Link>
            <Link
              href="/pricing"
              className="text-[0.95rem] text-text-body no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors w-fit"
            >
              See pricing — from €499/mo
            </Link>
          </div>
          <p className="text-[0.9rem] leading-[1.7] text-text-secondary mt-6">
            Not sure yet? Start with{" "}
            <Link href="/complete-data" className="underline">
              what complete data means
            </Link>{" "}
            or the{" "}
            <Link href="/vs-ga4" className="underline">
              side-by-side against GA4
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
