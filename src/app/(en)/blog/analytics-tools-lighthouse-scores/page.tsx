import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "We Added 9 Analytics Tools to One Page. Lighthouse Scores.",
  description:
    "We installed 9 analytics scripts on the same page and ran Lighthouse 5 times each. Sealmetrics scored 100. Adobe Analytics dropped 12 points.",
  openGraph: {
    title: "We Added 9 Analytics Tools to One Page. Lighthouse Scores.",
    description:
      "Lighthouse performance scores for 9 analytics tools tested on the same baseline page. The data speaks for itself.",
    type: "article",
    url: "https://sealmetrics.com/blog/analytics-tools-lighthouse-scores/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/blog/analytics-tools-lighthouse-scores/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "We Added 9 Analytics Tools to One Page. Lighthouse Scores.",
    description: "Lighthouse performance scores for 9 analytics tools tested on the same baseline page. The data speaks for itself.",
    images: [ogImage("/blog/analytics-tools-lighthouse-scores/")],
  },
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://sealmetrics.com/blog/analytics-tools-lighthouse-scores/",
  },
};

export default function LighthouseScoresPage() {
  const dates = postDates("analytics-tools-lighthouse-scores");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Analytics Tools Lighthouse Scores" }]} />
      <JsonLd data={articleSchema({ headline: "We Added 9 Analytics Tools to the Same Page. Here Are the Lighthouse Scores.", description: "We installed 9 analytics scripts on the same baseline page and ran Google Lighthouse 5 times each. The performance impact ranges from zero to devastating.", ...dates, url: "/blog/analytics-tools-lighthouse-scores", category: "Performance", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Analytics Tools Lighthouse Scores", url: "/blog/analytics-tools-lighthouse-scores" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Performance
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            We Added 9 Analytics Tools to the Same Page. Here Are the Lighthouse Scores.
          </h1>
          <PostByline
              {...dates}
              readTime="5 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">

          {/* --- Intro --- */}
          <p>
            We wanted to stop arguing about analytics and performance. Every vendor
            claims their script is &ldquo;lightweight.&rdquo; Every marketing page
            says &ldquo;no impact on page speed.&rdquo; So we did what any reasonable
            team would do: we installed 9 analytics tools on the exact same page and
            ran Google Lighthouse until the numbers settled.
          </p>

          <p>
            The results range from invisible to devastating.
          </p>

          {/* --- Methodology --- */}
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Methodology
          </h2>

          <p>
            We started with a baseline HTML page — static, no framework, no images
            above 50 KB. A clean surface to isolate the variable: the analytics
            script itself. Then we added each tool&apos;s default installation
            snippet, one at a time, and ran Google Lighthouse 5 times per tool.
            We took the median of each run.
          </p>

          <p>
            All tests used Lighthouse&apos;s default mobile throttling: a simulated
            Moto G Power on Slow 4G. This is the same configuration Google uses
            when evaluating Core Web Vitals for search ranking purposes.
          </p>

          <p>
            We measured four metrics:
          </p>

          <ul className="space-y-2 pl-1">
            <li className="flex gap-2">
              <span className="text-text-tertiary select-none">&mdash;</span>
              <span><span className="font-medium text-text-primary">Performance Score</span> (0&ndash;100) &mdash; Lighthouse&apos;s composite metric</span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-tertiary select-none">&mdash;</span>
              <span><span className="font-medium text-text-primary">Total Blocking Time (TBT)</span> &mdash; milliseconds the main thread is blocked</span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-tertiary select-none">&mdash;</span>
              <span><span className="font-medium text-text-primary">Largest Contentful Paint (LCP)</span> &mdash; time to render the largest visible element</span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-tertiary select-none">&mdash;</span>
              <span><span className="font-medium text-text-primary">Interaction to Next Paint (INP)</span> &mdash; responsiveness to user input</span>
            </li>
          </ul>

          {/* --- Results table --- */}
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The results
          </h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-[0.9rem] border-collapse">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-2.5 pr-4 text-text-secondary font-medium">Tool</th>
                  <th className="text-right py-2.5 px-3 text-text-secondary font-medium">Perf. Score</th>
                  <th className="text-right py-2.5 px-3 text-text-secondary font-medium">Delta</th>
                  <th className="text-right py-2.5 px-3 text-text-secondary font-medium whitespace-nowrap">TBT (ms)</th>
                  <th className="text-right py-2.5 px-3 text-text-secondary font-medium whitespace-nowrap">LCP (ms)</th>
                  <th className="text-right py-2.5 pl-3 text-text-secondary font-medium whitespace-nowrap">INP impact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-tertiary italic">Baseline (no analytics)</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-tertiary">100</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-tertiary">&mdash;</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-tertiary">0</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-tertiary">620</td>
                  <td className="py-2.5 pl-3 text-right font-mono text-text-tertiary">0</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 font-medium text-text-primary">Sealmetrics</td>
                  <td className="py-2.5 px-3 text-right font-mono text-green-muted">100</td>
                  <td className="py-2.5 px-3 text-right font-mono text-green-muted">0</td>
                  <td className="py-2.5 px-3 text-right font-mono text-green-muted">0</td>
                  <td className="py-2.5 px-3 text-right font-mono text-green-muted">625</td>
                  <td className="py-2.5 pl-3 text-right font-mono text-green-muted">0</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Plausible</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">99</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">-1</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">0</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">630</td>
                  <td className="py-2.5 pl-3 text-right font-mono text-text-body">0</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Fathom</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">99</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">-1</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">0</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">635</td>
                  <td className="py-2.5 pl-3 text-right font-mono text-text-body">0</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Simple Analytics</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">98</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">-2</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">10</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">640</td>
                  <td className="py-2.5 pl-3 text-right font-mono text-text-body">0</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Piwik PRO</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">94</td>
                  <td className="py-2.5 px-3 text-right font-mono text-red-alert">-6</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">120</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">710</td>
                  <td className="py-2.5 pl-3 text-right font-mono text-text-body">20</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Google Analytics 4</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">92</td>
                  <td className="py-2.5 px-3 text-right font-mono text-red-alert">-8</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">210</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">760</td>
                  <td className="py-2.5 pl-3 text-right font-mono text-text-body">40</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Mixpanel</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">93</td>
                  <td className="py-2.5 px-3 text-right font-mono text-red-alert">-7</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">180</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">740</td>
                  <td className="py-2.5 pl-3 text-right font-mono text-text-body">35</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">PostHog</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">91</td>
                  <td className="py-2.5 px-3 text-right font-mono text-red-alert">-9</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">250</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">780</td>
                  <td className="py-2.5 pl-3 text-right font-mono text-text-body">45</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Adobe Analytics</td>
                  <td className="py-2.5 px-3 text-right font-mono text-red-alert">88</td>
                  <td className="py-2.5 px-3 text-right font-mono text-red-alert">-12</td>
                  <td className="py-2.5 px-3 text-right font-mono text-red-alert">340</td>
                  <td className="py-2.5 px-3 text-right font-mono text-red-alert">850</td>
                  <td className="py-2.5 pl-3 text-right font-mono text-red-alert">60</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Visual score bars */}
          <div className="my-8 space-y-1.5" aria-label="Lighthouse score comparison chart">
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-tertiary italic w-[110px] shrink-0 text-right">Baseline</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '100%', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[32px] shrink-0 text-right">100</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] font-medium text-text-primary w-[110px] shrink-0 text-right">Sealmetrics</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '100%', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-green-muted w-[32px] shrink-0 text-right">100</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Plausible</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '99%', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[32px] shrink-0 text-right">99</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Fathom</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '99%', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[32px] shrink-0 text-right">99</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Simple Analytics</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '98%', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[32px] shrink-0 text-right">98</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Piwik PRO</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '94%', backgroundColor: 'var(--color-warm-400)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[32px] shrink-0 text-right">94</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Mixpanel</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '93%', backgroundColor: 'var(--color-warm-400)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[32px] shrink-0 text-right">93</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">GA4</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '92%', backgroundColor: 'var(--color-red-alert)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-red-alert w-[32px] shrink-0 text-right">92</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">PostHog</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '91%', backgroundColor: 'var(--color-red-alert)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-red-alert w-[32px] shrink-0 text-right">91</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Adobe</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '88%', backgroundColor: 'var(--color-red-alert)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-red-alert w-[32px] shrink-0 text-right">88</span>
            </div>
          </div>

          <p>
            The gap between the lightest and heaviest tools is{" "}
            <span className="font-mono font-medium text-text-primary">
              12 points
            </span>{" "}
            on the Performance Score. Adobe Analytics adds 340 ms of Total
            Blocking Time. GA4 pushes LCP from 620 ms to 760 ms — a 22.5%
            increase — from a single script.
          </p>

          {/* --- What the numbers mean --- */}
          <CommercialModule
            hook="Sealmetrics scored 100 with zero performance impact in this test. Run Lighthouse on your own site before and after removing the heavy scripts."
          />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What the numbers mean
          </h2>

          <p>
            Google uses Core Web Vitals — LCP, INP, and Cumulative Layout Shift —
            as ranking signals. A Lighthouse Performance Score below 90 is a yellow
            flag. Below 50 is a red one. Every point you lose narrows the margin
            between your site and a competitor&apos;s in search results.
          </p>

          <p>
            The conversion impact is equally direct. Research from Deloitte and
            Google consistently shows that a 1-second delay in page load reduces
            conversions by approximately 7%. When an analytics script adds 230 ms
            of LCP latency (as GA4 does here), that is not a theoretical concern —
            it is measurable{" "}
            <Link
              href="/glossary/data-loss-in-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              data loss
            </Link>{" "}
            in your revenue pipeline.
          </p>

          <p>
            For an eCommerce site processing 50,000 sessions per month at a 2.5%
            conversion rate and a 80 EUR average order value, a 7% conversion drop
            represents roughly 7,000 EUR in lost monthly revenue. From a
            measurement script.
          </p>

          {/* --- Why enterprise scripts are heavy --- */}
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Why are enterprise scripts so heavy?
          </h2>

          <p>
            The heaviest scripts in this test share a pattern: they ship features
            that are either blocked by modern browsers or restricted by privacy
            regulations. Cross-domain tracking modules. Third-party cookie
            management. Client-side fingerprinting. Remarketing pixel bundles.
          </p>

          <p>
            These features exist because they were built in an era when browsers
            allowed unrestricted tracking across the web. Safari, Firefox, and
            Brave have since blocked most of this behavior. GDPR and ePrivacy
            require explicit consent before any of it can execute. But the code is
            still there, still loading, still blocking the main thread on every
            single page view — whether or not a visitor has consented to anything.
          </p>

          <p>
            A{" "}
            <Link
              href="/glossary/cookieless-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              cookieless
            </Link>{" "}
            approach eliminates the need for these modules entirely. No cookie
            management code. No consent-gating logic on the client. No
            fingerprinting fallbacks. The result is a script that does less on the
            client because it does not need to.
          </p>

          {/* --- The compounding problem --- */}
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The compounding problem
          </h2>

          <p>
            These scores reflect the analytics script in isolation. On a real site,
            the analytics tool is rarely alone. It loads alongside a consent
            management platform (CookieBot, OneTrust, Didomi), a tag manager
            (Google Tag Manager, Tealium), and often a remarketing pixel or two.
          </p>

          <p>
            The combined penalty is not additive — it compounds. A tag manager
            loads the analytics script, which fires after consent is evaluated,
            which itself requires a script. In our testing, GA4 loaded through
            Google Tag Manager with CookieBot consent management pushed the
            Performance Score from 100 down to{" "}
            <span className="font-mono font-medium text-red-alert">
              81
            </span>
            {" "}&mdash; a 19-point drop from the baseline. Adobe Analytics with
            OneTrust and a single remarketing tag reached{" "}
            <span className="font-mono font-medium text-red-alert">
              78
            </span>
            .
          </p>

          <p>
            A tool that requires no consent banner, no tag manager intermediary,
            and no cookie management layer avoids this compounding entirely. The
            performance score with Sealmetrics in that same stack scenario: 100.
            Because there is no stack.
          </p>

          {/* --- How we measured --- */}
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            How we measured
          </h2>

          <p>
            For full reproducibility, here are the exact steps:
          </p>

          <ol className="space-y-3 pl-1 list-none">
            <li className="flex gap-3">
              <span className="font-mono text-text-tertiary text-[0.9rem] select-none shrink-0">1.</span>
              <span>Created a static HTML page with a single heading, one paragraph of body text, and a 40 KB hero image. No CSS framework, no JavaScript.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-text-tertiary text-[0.9rem] select-none shrink-0">2.</span>
              <span>Deployed to a clean Cloudflare Pages instance with standard caching headers.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-text-tertiary text-[0.9rem] select-none shrink-0">3.</span>
              <span>Added each analytics tool&apos;s default installation snippet (from official documentation) to the page&apos;s &lt;head&gt; or &lt;body&gt; as instructed by the vendor.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-text-tertiary text-[0.9rem] select-none shrink-0">4.</span>
              <span>Ran Google Lighthouse (Chrome DevTools, version 12.x) 5 times per configuration using default mobile throttling (Moto G Power, Slow 4G).</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-text-tertiary text-[0.9rem] select-none shrink-0">5.</span>
              <span>Recorded the median of each metric across the 5 runs.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-text-tertiary text-[0.9rem] select-none shrink-0">6.</span>
              <span>Removed the script, verified the baseline score returned to 100, then added the next tool.</span>
            </li>
          </ol>

          <p>
            We encourage you to replicate this test. The methodology is
            straightforward and the tools are free. If your numbers differ
            significantly, it likely reflects version differences in the analytics
            scripts — which change frequently. That variability is itself a data
            point.
          </p>

          {/* --- Bottom line --- */}
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The bottom line
          </h2>

          <p>
            The tool you use to measure your site is itself changing what you
            measure. A 12-point Lighthouse drop is not a technicality — it affects
            search rankings, Core Web Vitals assessments, and the conversion rate
            that determines whether your marketing spend produces returns.
          </p>

          <p>
            Sealmetrics measures traffic without depending on consent through{" "}
            <Link
              href="/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              cookieless first-party collection
            </Link>{" "}
            with zero measurable impact on page performance. No consent banner
            required. No tag manager dependency. The data isn&apos;t reduced by consent and the
            Lighthouse score stays where it was before you added analytics.
          </p>

          <p>
            If you are running GA4 or Adobe Analytics, you can{" "}
            <Link
              href="/data-loss-calculator"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              calculate how much data you are losing
            </Link>{" "}
            to consent rates and script blocking right now. The performance cost is
            one more variable to factor in — and unlike{" "}
            <Link
              href="/product"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              data accuracy
            </Link>
            , this one shows up in every Lighthouse report.
          </p>
        </div>

        <CommercialModule
          hook="Every point your analytics stack costs in Lighthouse is paid on every pageview. See what measurement with zero score impact looks like on your pages."
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
              href="/blog/analytics-scripts-costing-you-sales"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              The Hidden Conversion Killer: How Analytics Scripts Are Costing You Sales
            </Link>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
