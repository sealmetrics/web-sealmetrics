import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Adobe Analytics Alternatives — 5 Compared (2026)",
  description:
    "Five Adobe Analytics alternatives for European enterprises, compared on cost, EU data capture, consent dependency and time to first report.",
  openGraph: {
    title: "Adobe Analytics Alternatives — 5 Compared (2026)",
    description:
      "GA360, Piwik PRO, Matomo, GA4 and Sealmetrics compared against Adobe on cost, EU capture and consent dependency.",
    type: "article",
    images: [ogImage("/alternatives/adobe-analytics")],
    url: "https://sealmetrics.com/alternatives/adobe-analytics/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Adobe Analytics Alternatives — 5 Compared (2026)",
    description: "GA360, Piwik PRO, Matomo, GA4 and Sealmetrics compared against Adobe on cost, EU capture and consent dependency.",
    images: [ogImage("/alternatives/adobe-analytics")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/alternatives/adobe-analytics",
    languages: getAlternates("/alternatives/adobe-analytics"),
  },
};

const linkCls =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Adobe Analytics alternatives" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Adobe Analytics alternatives", url: "/alternatives/adobe-analytics" },
        ])}
      />
      <JsonLd
        data={itemListSchema({
          name: "Adobe Analytics alternatives for European enterprises",
          description:
            "Five alternatives to Adobe Analytics compared on annual cost, EU data capture, consent dependency and time to first decision-ready report.",
          url: "/alternatives/adobe-analytics",
          items: [
            { name: "Google Analytics 360" },
            { name: "Piwik PRO" },
            { name: "Matomo" },
            { name: "Google Analytics 4" },
            { name: "Sealmetrics" },
          ],
        })}
      />

      <article className="pt-12 pb-24 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Comparison
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              Adobe Analytics alternatives
            </h1>
            <p className="text-[1.15rem] leading-[1.7] text-text-secondary">
              Five options European enterprises actually evaluate when they leave
              Adobe — what each one solves, and what it does not.
            </p>
          </header>

          <QuickAnswer>
            Teams replacing Adobe Analytics in Europe evaluate five realistic
            options: Google Analytics 360, Piwik PRO, Matomo, Google Analytics 4
            and Sealmetrics. They separate on two axes. The first is cost, and
            most of it is quote-only: Adobe runs from around $50,000 to $200,000+
            a year plus implementation consulting, GA360 from about $50,000 and
            commonly $100–175K for mid-market volumes, Piwik PRO sells Business
            from €36 a month and Enterprise from €366 a month billed annually,
            Matomo and GA4 are
            cheap or free.
            The second matters more and is easier to miss — every option except
            Sealmetrics collects data with cookies, so all of them lose the 40–60%
            of EU visitors who reject a consent banner. Moving from Adobe to
            GA360, Piwik PRO or Matomo changes what you pay and where data is
            hosted, but not how much of your audience you measure. This page is
            published by Sealmetrics, so treat the last entry accordingly; the
            comparison points are checkable either way.
          </QuickAnswer>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body mt-12">
            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Why teams leave Adobe Analytics
            </h2>
            <p>
              Rarely because it lacks capability. Adobe Analytics has the deepest
              segmentation in the category and Analysis Workspace is a genuinely
              powerful surface. The frictions that show up in vendor reviews are
              structural: an unpublished annual licence that runs from roughly
              $50,000 for Select to $200,000+ for Ultimate before implementation
              consulting, a 3–6 month deployment, and a dedicated Adobe-certified
              analyst on staff to keep it useful.
            </p>
            <p>
              The second reason is quieter. Adobe collects through the
              AppMeasurement library, which is cookie-based and consent-gated.
              Whatever depth sits above it, the collection layer only sees the
              visitors who accepted your banner — and in a 30-day parallel run on
              a European media site we measured 25% more pageviews than Adobe even
              with Adobe firing without a consent gate, from privacy filter lists
              and a pageview that fires roughly three seconds into the load. Every
              analysis inherits that gap.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The five alternatives
            </h2>

            <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-8 mb-3">
              1. Google Analytics 360
            </h3>
            <p>
              The closest like-for-like swap in scale and support model.
              Quote-based on a 12-month minimum contract negotiated through
              Google sales: entry contracts start around $50,000 a year and
              scale with event volume, with mid-market properties commonly
              landing between $100,000 and $175,000.
              <br />
              <span className="text-text-tertiary">The catch —</span> it is the
              same cookie and consent architecture as free GA4, and data sits on
              Google infrastructure, so Schrems II exposure is a separate legal
              review. You solve support and scale, not EU coverage. Detail in the{" "}
              <Link href="/vs/ga360" className={linkCls}>
                GA360 comparison
              </Link>
              .
            </p>

            <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-8 mb-3">
              2. Piwik PRO
            </h3>
            <p>
              The usual pick when EU data residency is the driver. Enterprise plans
              start around €30,000 a year and hosting is European.
              <br />
              <span className="text-text-tertiary">The catch —</span> the
              architecture is closer to GA4 than the positioning suggests. Still
              cookie-based, still needs a consent banner, so the 40–60% rejection
              loss is unchanged, and adding a cookie still pulls you into a manual
              DPIA. You move where the data lives, not how much of it you get. See
              the{" "}
              <Link href="/vs/piwik-pro" className={linkCls}>
                Piwik PRO comparison
              </Link>
              .
            </p>

            <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-8 mb-3">
              3. Matomo
            </h3>
            <p>
              Open-source, EU-friendly, and the cheapest credible option — Cloud is
              mid-priced and self-hosted is free on paper.
              <br />
              <span className="text-text-tertiary">The catch —</span> self-hosted
              is free the way a server is free: you own the upgrades, the scaling
              and the incident at 2am. Cookies are on by default and the cookieless
              mode is partial. The modern stack — MCP, native BigQuery export,
              real-time reporting — is not there. See the{" "}
              <Link href="/vs/matomo" className={linkCls}>
                Matomo comparison
              </Link>
              .
            </p>

            <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-8 mb-3">
              4. Google Analytics 4
            </h3>
            <p>
              Free, universally understood, and the default most teams land on by
              gravity rather than decision. For a team leaving a six-figure
              contract, the budget relief is real.
              <br />
              <span className="text-text-tertiary">The catch —</span> it is the
              largest step down in coverage. GA4 depends on consent and applies{" "}
              <Link href="/glossary/data-sampling" className={linkCls}>
                sampling
              </Link>{" "}
              at volume, so you trade Adobe&rsquo;s cost for a smaller and
              partially modelled dataset. Detail in the{" "}
              <Link href="/vs-ga4" className={linkCls}>
                GA4 comparison
              </Link>
              .
            </p>

            <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-8 mb-3">
              5. Sealmetrics
            </h3>
            <p>
              Ours, so weigh it accordingly. It is the only option here that does
              not collect with cookies:{" "}
              <Link href="/glossary/cookieless-analytics" className={linkCls}>
                cookieless analytics
              </Link>{" "}
              that sets nothing on the device and collects no personal data, so it
              does not depend on consent and keeps measuring the visitors who
              decline the banner. From €499/mo, hosted only in Dublin, first
              decision-ready report inside a week.
              <br />
              <span className="text-text-tertiary">The catch —</span> it is not
              Adobe&rsquo;s analyst surface. There is no Analysis Workspace
              equivalent, no audience activation, and attribution is{" "}
              <Link href="/glossary/last-click-attribution" className={linkCls}>
                last-click
              </Link>{" "}
              on the full dataset rather than modelled multi-touch. Teams that need
              Adobe&rsquo;s segmentation depth usually keep it and replace the
              collection layer underneath.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Side by side
            </h2>

            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse text-[0.9rem]">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-4 font-medium text-text-primary">
                      Tool
                    </th>
                    <th className="text-left py-3 pr-4 font-medium text-text-primary">
                      Entry cost
                    </th>
                    <th className="text-left py-3 pr-4 font-medium text-text-primary">
                      Needs consent
                    </th>
                    <th className="text-left py-3 font-medium text-text-primary">
                      EU-only hosting
                    </th>
                  </tr>
                </thead>
                <tbody className="text-text-body">
                  <tr className="border-b border-warm-100">
                    <td className="py-3 pr-4">Adobe Analytics</td>
                    <td className="py-3 pr-4">Quote-based, ~$50K&ndash;200K+/yr plus consulting</td>
                    <td className="py-3 pr-4">Yes</td>
                    <td className="py-3">Configurable, complex</td>
                  </tr>
                  <tr className="border-b border-warm-100">
                    <td className="py-3 pr-4">Google Analytics 360</td>
                    <td className="py-3 pr-4">Quote-based, ~$50K–175K+/yr, 12-month minimum</td>
                    <td className="py-3 pr-4">Yes</td>
                    <td className="py-3">No — US infrastructure</td>
                  </tr>
                  <tr className="border-b border-warm-100">
                    <td className="py-3 pr-4">Piwik PRO</td>
                    <td className="py-3 pr-4">Business from €36/mo, Enterprise from €366/mo billed annually</td>
                    <td className="py-3 pr-4">Yes</td>
                    <td className="py-3">Yes</td>
                  </tr>
                  <tr className="border-b border-warm-100">
                    <td className="py-3 pr-4">Matomo</td>
                    <td className="py-3 pr-4">Cloud mid-priced, self-hosted free</td>
                    <td className="py-3 pr-4">Yes by default</td>
                    <td className="py-3">Yes if you host it</td>
                  </tr>
                  <tr className="border-b border-warm-100">
                    <td className="py-3 pr-4">Google Analytics 4</td>
                    <td className="py-3 pr-4">Free</td>
                    <td className="py-3 pr-4">Yes</td>
                    <td className="py-3">No</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium">Sealmetrics</td>
                    <td className="py-3 pr-4">From €499/mo</td>
                    <td className="py-3 pr-4">No — no cookies, no personal data</td>
                    <td className="py-3">Yes — Dublin only</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              How to choose
            </h2>
            <p>
              The question that separates these options is not which has more
              features. It is which problem you are actually solving.
            </p>
            <p>
              — If the problem is <strong>cost</strong>, Matomo or GA4 solve it
              immediately, and you accept less coverage and less support.
              <br />— If the problem is <strong>data residency</strong>, Piwik PRO
              or self-hosted Matomo solve it, and the consent gap follows you.
              <br />— If the problem is <strong>scale and support</strong> and
              budget is not the constraint, GA360 is the like-for-like swap.
              <br />— If the problem is that{" "}
              <strong>your reports do not reconcile with revenue</strong> because
              most EU visitors never enter the dataset, none of the cookie-based
              options fix it, because that is the thing they have in common.
            </p>
            <p>
              Most teams that leave Adobe over cost discover the coverage problem
              afterwards, on the new tool. It is worth establishing which of the
              two you have before you migrate — the{" "}
              <Link href="/vs/adobe-analytics" className={linkCls}>
                head-to-head against Adobe
              </Link>{" "}
              has the measured numbers, and the{" "}
              <Link href="/data-loss-calculator" className={linkCls}>
                data loss calculator
              </Link>{" "}
              estimates the gap on your own traffic.
            </p>
          </div>
        </div>
      </article>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          <h2 className="font-serif text-[1.75rem] font-medium text-text-primary leading-[1.25] mb-4">
            See the gap on your own traffic
          </h2>
          <p className="text-[1.05rem] leading-[1.8] text-text-body mb-8">
            Run Sealmetrics beside whatever you use today. Thirty days, both
            numbers side by side, no migration. If the datasets agree, you have
            your answer and you have lost nothing.
          </p>
          <Link
            data-md="skip"
            href="/demo"
            className="inline-block px-7 py-3.5 bg-ink text-white text-[0.95rem] font-medium rounded-[4px] hover:opacity-90 transition-opacity"
          >
            Book a Demo
          </Link>
        </div>
      </section>
    </>
  );
}
