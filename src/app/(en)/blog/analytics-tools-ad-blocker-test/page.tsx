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
  title: "We Tested 9 Analytics Tools Against Every Major Ad Blocker",
  description:
    "Binary pass/fail results for 9 analytics platforms across 5 major ad blockers. GA4, Adobe, and PostHog are blocked by all five. One tool passed every test.",
  openGraph: {
    title: "We Tested 9 Analytics Tools Against Every Major Ad Blocker",
    description:
      "Binary pass/fail results for 9 analytics platforms across 5 major ad blockers. The results split the market in two.",
    type: "article",
    url: "https://sealmetrics.com/blog/analytics-tools-ad-blocker-test/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/blog/analytics-tools-ad-blocker-test/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "We Tested 9 Analytics Tools Against Every Major Ad Blocker",
    description: "Binary pass/fail results for 9 analytics platforms across 5 major ad blockers. The results split the market in two.",
    images: [ogImage("/blog/analytics-tools-ad-blocker-test/")],
  },
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://sealmetrics.com/blog/analytics-tools-ad-blocker-test/",
  },
};

export default function AdBlockerTestPage() {
  const dates = postDates("analytics-tools-ad-blocker-test");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "We Tested 9 Analytics Tools Against Ad Blockers" }]} />
      <JsonLd data={articleSchema({ headline: "We Tested 9 Analytics Tools Against Every Major Ad Blocker", description: "Binary pass/fail results for 9 analytics platforms across 5 major ad blockers. GA4, Adobe, and PostHog are blocked by all five.", ...dates, url: "/blog/analytics-tools-ad-blocker-test", category: "Data Quality", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "We Tested 9 Analytics Tools Against Ad Blockers", url: "/blog/analytics-tools-ad-blocker-test" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Data Quality
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            We Tested 9 Analytics Tools Against Every Major Ad Blocker
          </h1>
          <PostByline
              {...dates}
              readTime="5 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            Roughly 30% of European internet users run an{" "}
            <Link
              href="/glossary/ad-blocker-analytics-impact"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              ad blocker
            </Link>
            . That is not a fringe behavior — it is nearly a third of your
            audience. If your analytics tool is blocked, those visitors
            disappear from your data entirely. No pageviews. No conversions.
            No attribution. And this happens on top of the traffic you
            already lose to consent banner rejection.
          </p>

          <p>
            We wanted to know exactly which tools survive and which do not.
            So we tested 9 analytics platforms against the 5 most widely
            used ad blockers with a simple, reproducible methodology: does
            the analytics request reach its endpoint, yes or no?
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What we tested
          </h2>

          <p>
            We selected the five ad blockers with the broadest install bases,
            covering browser extensions, built-in browser protections, and
            behavioral blocking:
          </p>

          <ul className="space-y-2 pl-5">
            <li className="flex gap-2">
              <span className="text-text-secondary shrink-0">&mdash;</span>
              <span>
                <span className="font-medium text-text-primary">uBlock Origin</span>{" "}
                — the most popular extension-based blocker, with approximately 40 million users
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-secondary shrink-0">&mdash;</span>
              <span>
                <span className="font-medium text-text-primary">AdBlock Plus</span>{" "}
                — the legacy dominant blocker, approximately 100 million users
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-secondary shrink-0">&mdash;</span>
              <span>
                <span className="font-medium text-text-primary">Brave Shield</span>{" "}
                — built into the Brave browser, approximately 70 million users
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-secondary shrink-0">&mdash;</span>
              <span>
                <span className="font-medium text-text-primary">Firefox Enhanced Tracking Protection</span>{" "}
                — Mozilla&apos;s built-in protection in Strict mode, enabled by default for millions of Firefox users
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-secondary shrink-0">&mdash;</span>
              <span>
                <span className="font-medium text-text-primary">Privacy Badger</span>{" "}
                — developed by the EFF, uses behavioral analysis rather than static blocklists
              </span>
            </li>
          </ul>

          <p>
            Together, these blockers represent over 300 million installations.
            They also cover every major blocking strategy: static filter
            lists, browser-level domain blocking, and machine-learning-based
            behavioral detection.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The results
          </h2>

          <p>
            Each cell is binary. Pass means the analytics request reached
            its collection endpoint. Blocked means it did not.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-[0.9rem] border-collapse">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-2.5 pr-4 text-text-secondary font-medium">Tool</th>
                  <th className="text-center py-2.5 px-2 text-text-secondary font-medium">uBlock Origin</th>
                  <th className="text-center py-2.5 px-2 text-text-secondary font-medium">AdBlock Plus</th>
                  <th className="text-center py-2.5 px-2 text-text-secondary font-medium">Brave</th>
                  <th className="text-center py-2.5 px-2 text-text-secondary font-medium">Firefox ETP</th>
                  <th className="text-center py-2.5 px-2 text-text-secondary font-medium">Privacy Badger</th>
                  <th className="text-right py-2.5 pl-4 text-text-secondary font-medium">Blocked by</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 font-medium text-text-primary">Sealmetrics</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-green-muted">0/5</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Plausible</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-red-alert">3/5</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Fathom</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-red-alert">3/5</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Simple Analytics</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-text-body">2/5</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Piwik PRO</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-red-alert">4/5</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Mixpanel</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-green-muted">Pass</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-red-alert">4/5</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">PostHog</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-red-alert">5/5</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Google Analytics 4</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-red-alert">5/5</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Adobe Analytics</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 px-2 text-center font-mono text-red-alert">Blocked</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-red-alert">5/5</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Visual pass/fail grid */}
          <div className="my-8" aria-label="Ad blocker pass/fail visual summary">
            <div className="grid grid-cols-[110px_repeat(5,1fr)_40px] gap-1 text-[0.7rem]">
              <div className="text-text-tertiary text-right pr-2 py-1" />
              <div className="text-text-tertiary text-center py-1">uB</div>
              <div className="text-text-tertiary text-center py-1">ABP</div>
              <div className="text-text-tertiary text-center py-1">Brave</div>
              <div className="text-text-tertiary text-center py-1">FF</div>
              <div className="text-text-tertiary text-center py-1">PB</div>
              <div />
              {/* Sealmetrics */}
              <div className="text-[0.8rem] font-medium text-text-primary text-right pr-2 py-0.5">Sealmetrics</div>
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="text-[0.75rem] font-mono text-green-muted text-right py-0.5">0/5</div>
              {/* Plausible */}
              <div className="text-[0.8rem] text-text-secondary text-right pr-2 py-0.5">Plausible</div>
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="text-[0.75rem] font-mono text-text-body text-right py-0.5">3/5</div>
              {/* Fathom */}
              <div className="text-[0.8rem] text-text-secondary text-right pr-2 py-0.5">Fathom</div>
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="text-[0.75rem] font-mono text-text-body text-right py-0.5">3/5</div>
              {/* Simple Analytics */}
              <div className="text-[0.8rem] text-text-secondary text-right pr-2 py-0.5">Simple Analytics</div>
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="text-[0.75rem] font-mono text-text-body text-right py-0.5">2/5</div>
              {/* Piwik PRO */}
              <div className="text-[0.8rem] text-text-secondary text-right pr-2 py-0.5">Piwik PRO</div>
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="text-[0.75rem] font-mono text-red-alert text-right py-0.5">4/5</div>
              {/* Mixpanel */}
              <div className="text-[0.8rem] text-text-secondary text-right pr-2 py-0.5">Mixpanel</div>
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="text-[0.75rem] font-mono text-red-alert text-right py-0.5">4/5</div>
              {/* PostHog */}
              <div className="text-[0.8rem] text-text-secondary text-right pr-2 py-0.5">PostHog</div>
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="text-[0.75rem] font-mono text-red-alert text-right py-0.5">5/5</div>
              {/* GA4 */}
              <div className="text-[0.8rem] text-text-secondary text-right pr-2 py-0.5">GA4</div>
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="text-[0.75rem] font-mono text-red-alert text-right py-0.5">5/5</div>
              {/* Adobe */}
              <div className="text-[0.8rem] text-text-secondary text-right pr-2 py-0.5">Adobe</div>
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="h-6 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} />
              <div className="text-[0.75rem] font-mono text-red-alert text-right py-0.5">5/5</div>
            </div>
            <div className="flex gap-4 mt-3 text-[0.7rem] text-text-tertiary">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: 'var(--color-green-muted)' }} /><span>Pass</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: 'var(--color-red-alert)' }} /><span>Blocked</span></div>
            </div>
          </div>

          <p>
            Three tools — GA4, Adobe Analytics, and PostHog — were blocked
            by every single ad blocker we tested. Piwik PRO and Mixpanel
            were blocked by 4 out of 5. Even privacy-focused tools like
            Plausible and Fathom were blocked by 3 out of 5 — their domains
            appear in the EasyPrivacy filter list that uBlock Origin loads by
            default. Only one tool passed all five tests.
          </p>

          <CommercialModule
            hook="Sealmetrics passed all five blockers — first-party CNAME collection is why. Run the same test against your own stack and count what disappears."
          />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Why some tools survive and others do not
          </h2>

          <p>
            The pattern is straightforward. Every tool that failed loads a
            client-side JavaScript file from a known tracking domain —
            {" "}<span className="font-mono text-[0.9rem]">google-analytics.com</span>,
            {" "}<span className="font-mono text-[0.9rem]">cdn.mxpnl.com</span>,
            {" "}<span className="font-mono text-[0.9rem]">app.posthog.com</span>.
            These domains appear on every major blocklist. The blocking is
            not sophisticated — it is simple domain matching, and it works.
          </p>

          <p>
            Privacy-focused tools like Plausible and Fathom use lighter
            scripts, but their collection domains —
            {" "}<span className="font-mono text-[0.9rem]">plausible.io</span> and
            {" "}<span className="font-mono text-[0.9rem]">cdn.usefathom.com</span> —
            are explicitly listed in the EasyPrivacy filter list. uBlock
            Origin loads EasyPrivacy by default, meaning these tools are
            blocked for its 40+ million users. Browser-native protections
            in Brave and Firefox catch them as well.
          </p>

          <p>
            The only architecture that passes every test is{" "}
            <Link
              href="/glossary/cookieless-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              cookieless
            </Link>
            {" "}cookieless collection from a first-party domain. There is
            no third-party script for blockers to identify. The data
            collection happens on a domain that belongs
            to the website owner. From the browser&apos;s perspective, it is
            indistinguishable from a normal first-party request — because it
            is one.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The compound data loss
          </h2>

          <p>
            Ad blocker losses do not exist in isolation. They compound with
            consent rejection losses. Consider the math for a typical
            European website using a client-side analytics tool:
          </p>

          <div className="bg-warm-white rounded-[4px] p-6 my-6 space-y-3 text-[0.95rem]">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Total visitors</span>
              <span className="font-mono text-text-primary font-medium">100,000</span>
            </div>
            <div className="flex justify-between items-center border-t border-warm-100 pt-3">
              <span className="text-text-secondary">After consent rejection (60&ndash;70% reject)</span>
              <span className="font-mono text-text-primary">30,000&ndash;40,000</span>
            </div>
            <div className="flex justify-between items-center border-t border-warm-100 pt-3">
              <span className="text-text-secondary">After ad blocker loss (30% of remainder)</span>
              <span className="font-mono text-text-primary">21,000&ndash;28,000</span>
            </div>
            <div className="flex justify-between items-center border-t border-warm-200 pt-3">
              <span className="text-text-secondary font-medium">Visible to your analytics</span>
              <span className="font-mono text-red-alert font-medium">21&ndash;28%</span>
            </div>
          </div>

          <p>
            That means between 72% and 79% of your actual traffic is
            invisible. You are making budget decisions, attribution
            models, and campaign optimizations based on roughly one
            quarter of reality. The{" "}
            <Link
              href="/glossary/data-loss-in-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              data loss
            </Link>
            {" "}is not a rounding error — it is a structural failure in
            measurement.
          </p>

          <p>
            For tools blocked by all 5 ad blockers — GA4, Adobe Analytics,
            PostHog — the problem is even worse. Every visitor running any
            form of blocking is completely invisible.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            How we tested
          </h2>

          <p>
            We combined two approaches: filter list analysis and browser verification.
          </p>

          <ul className="space-y-2 pl-5">
            <li className="flex gap-2">
              <span className="text-text-secondary shrink-0">&mdash;</span>
              <span>
                Downloaded the default filter lists used by each blocker — EasyList,
                EasyPrivacy, uBlock filters, and Peter Lowe&apos;s ad server list
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-secondary shrink-0">&mdash;</span>
              <span>
                Searched each list for every analytics domain (e.g.,{" "}
                <span className="font-mono text-[0.9rem]">google-analytics.com</span>,{" "}
                <span className="font-mono text-[0.9rem]">plausible.io</span>,{" "}
                <span className="font-mono text-[0.9rem]">cdn.usefathom.com</span>)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-secondary shrink-0">&mdash;</span>
              <span>
                Verified in-browser with each ad blocker installed on a fresh Chrome profile using default settings
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-secondary shrink-0">&mdash;</span>
              <span>
                Binary pass/fail per combination — does the analytics request reach its collection endpoint?
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-secondary shrink-0">&mdash;</span>
              <span>
                For browser-native blockers (Brave, Firefox ETP), we tested with built-in protection set to strict mode
              </span>
            </li>
          </ul>

          <p>
            The filter list approach is more reproducible than browser testing alone —
            anyone can download EasyPrivacy and search for{" "}
            <span className="font-mono text-[0.9rem]">plausible.io</span> or{" "}
            <span className="font-mono text-[0.9rem]">cdn.usefathom.com</span> to verify
            the results. Sealmetrics has one rule in EasyPrivacy:{" "}
            <span className="font-mono text-[0.9rem]">||sealmetrics.com^$third-party</span>{" "}
            — which only triggers when loaded as a third-party resource. Since
            Sealmetrics uses first-party CNAME collection, this rule does not apply.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The bottom line
          </h2>

          <p>
            Ad blockers are not an edge case. With 30% adoption across
            Europe and growing, they represent a structural gap in any
            analytics setup that relies on client-side JavaScript loaded
            from third-party domains. The tools most commonly used in
            enterprise — GA4 and Adobe Analytics — are blocked by every
            major ad blocker without exception.
          </p>

          <p>
            Cookieless, first-party collection is the only architecture
            that survives all five blockers.{" "}
            <Link
              href="/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              See how Sealmetrics collects data without client-side scripts
            </Link>
            {" "}or{" "}
            <Link
              href="/data-loss-calculator"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              calculate how much traffic your current setup is missing
            </Link>
            .
          </p>
        </div>

        <CommercialModule
          hook="Blocked scripts fail silently: no error, just missing visitors. See how first-party, cookieless collection held up against all five blockers we tested."
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
              Consent Banner Impact on Analytics: What the Data Shows
            </Link>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
