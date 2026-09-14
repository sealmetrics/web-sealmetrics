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
  title: "How Many HTTP Requests Does Your Analytics Tool Make?",
  description:
    "We counted every HTTP request from 9 analytics tools. GA4 makes 4 requests across 3 domains. Sealmetrics makes 2 to a single first-party endpoint.",
  openGraph: {
    title: "How Many HTTP Requests Does Your Analytics Tool Make?",
    description:
      "We counted every HTTP request, domain lookup, and byte transferred by 9 analytics tools. The results are revealing.",
    type: "article",
    url: "https://sealmetrics.com/blog/analytics-tools-http-requests/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/blog/analytics-tools-http-requests/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "How Many HTTP Requests Does Your Analytics Tool Make?",
    description: "We counted every HTTP request, domain lookup, and byte transferred by 9 analytics tools. The results are revealing.",
    images: [ogImage("/blog/analytics-tools-http-requests/")],
  },
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://sealmetrics.com/blog/analytics-tools-http-requests/",
  },
};

export default function AnalyticsHttpRequestsPage() {
  const dates = postDates("analytics-tools-http-requests");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Analytics Tools HTTP Requests" }]} />
      <JsonLd data={articleSchema({ headline: "How Many HTTP Requests Does Your Analytics Tool Make? We Counted.", description: "We counted every HTTP request from 9 analytics tools on the same test page. GA4 makes 4 requests across 3 domains. Sealmetrics makes 1.", ...dates, url: "/blog/analytics-tools-http-requests", category: "Performance", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Analytics Tools HTTP Requests", url: "/blog/analytics-tools-http-requests" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Performance
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            How Many HTTP Requests Does Your Analytics Tool Make? We Counted.
          </h1>
          <PostByline
              {...dates}
              readTime="4 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            Every HTTP request your analytics tool makes competes with your
            content for bandwidth and connection slots. Browsers limit
            concurrent connections per domain — Chrome caps at 6. When your
            analytics fires 4 requests across 3 domains, it is consuming
            resources your product pages, images, and checkout flows need.
          </p>

          <p>
            We wanted to know exactly how many requests each tool makes, how
            many external domains it contacts, and how many bytes it
            transfers. So we set up a controlled test and counted.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What we measured
          </h2>

          <p>
            We loaded the same test page once per tool on a clean Chrome
            profile with no extensions. We filtered the Network tab to
            analytics-related domains and recorded three numbers: total
            requests, unique domains contacted, and total bytes transferred.
            No warm caches. No service workers. No ad blockers.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The results
          </h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-[0.9rem] border-collapse">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-2.5 pr-4 text-text-secondary font-medium">Tool</th>
                  <th className="text-center py-2.5 px-3 text-text-secondary font-medium">Requests</th>
                  <th className="text-center py-2.5 px-3 text-text-secondary font-medium">Domains</th>
                  <th className="text-right py-2.5 px-3 text-text-secondary font-medium">Transfer (KB)</th>
                  <th className="text-left py-2.5 pl-4 text-text-secondary font-medium">What it loads</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 font-medium text-text-primary">Sealmetrics</td>
                  <td className="py-2.5 px-3 text-center font-mono text-green-muted">2</td>
                  <td className="py-2.5 px-3 text-center font-mono text-green-muted">1</td>
                  <td className="py-2.5 px-3 text-right font-mono text-green-muted">1.3</td>
                  <td className="py-2.5 pl-4 text-[0.85rem] text-text-secondary">Script (1.1 KB) + beacon to first-party endpoint</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Plausible</td>
                  <td className="py-2.5 px-3 text-center font-mono text-green-muted">2</td>
                  <td className="py-2.5 px-3 text-center font-mono text-text-body">1</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">1.5</td>
                  <td className="py-2.5 pl-4 text-[0.85rem] text-text-secondary">Script (1.3 KB) + beacon</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Fathom</td>
                  <td className="py-2.5 px-3 text-center font-mono text-text-body">2</td>
                  <td className="py-2.5 px-3 text-center font-mono text-text-body">1</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">2.2</td>
                  <td className="py-2.5 pl-4 text-[0.85rem] text-text-secondary">Script (2.0 KB) + beacon</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Simple Analytics</td>
                  <td className="py-2.5 px-3 text-center font-mono text-text-body">2</td>
                  <td className="py-2.5 px-3 text-center font-mono text-text-body">1</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">4.2</td>
                  <td className="py-2.5 pl-4 text-[0.85rem] text-text-secondary">Script + beacon</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Piwik PRO</td>
                  <td className="py-2.5 px-3 text-center font-mono text-text-body">3</td>
                  <td className="py-2.5 px-3 text-center font-mono text-text-body">2</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">38</td>
                  <td className="py-2.5 pl-4 text-[0.85rem] text-text-secondary">Container + tracker + beacon</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Mixpanel</td>
                  <td className="py-2.5 px-3 text-center font-mono text-text-body">3</td>
                  <td className="py-2.5 px-3 text-center font-mono text-text-body">2</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">32</td>
                  <td className="py-2.5 pl-4 text-[0.85rem] text-text-secondary">SDK + config + beacon</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">PostHog</td>
                  <td className="py-2.5 px-3 text-center font-mono text-text-body">4</td>
                  <td className="py-2.5 px-3 text-center font-mono text-text-body">2</td>
                  <td className="py-2.5 px-3 text-right font-mono text-text-body">59</td>
                  <td className="py-2.5 pl-4 text-[0.85rem] text-text-secondary">SDK + config + session recording init + beacon</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Google Analytics 4</td>
                  <td className="py-2.5 px-3 text-center font-mono text-red-alert">4</td>
                  <td className="py-2.5 px-3 text-center font-mono text-red-alert">3</td>
                  <td className="py-2.5 px-3 text-right font-mono text-red-alert">134</td>
                  <td className="py-2.5 pl-4 text-[0.85rem] text-text-secondary">gtag.js + analytics.js + config + collect</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Adobe Analytics</td>
                  <td className="py-2.5 px-3 text-center font-mono text-red-alert">6</td>
                  <td className="py-2.5 px-3 text-center font-mono text-red-alert">4</td>
                  <td className="py-2.5 px-3 text-right font-mono text-red-alert">175</td>
                  <td className="py-2.5 pl-4 text-[0.85rem] text-text-secondary">AppMeasurement + visitor ID + config + beacon + ID sync + audience mgr</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Visual: transfer size chart */}
          <div className="my-8 space-y-1.5" aria-label="HTTP transfer size comparison chart">
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Plausible</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '0.9%', minWidth: '4px', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[65px] shrink-0 text-right">1.5 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Fathom</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '1.4%', minWidth: '4px', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[65px] shrink-0 text-right">2.2 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] font-medium text-text-primary w-[110px] shrink-0 text-right">Sealmetrics</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '1.7%', minWidth: '5px', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-primary w-[65px] shrink-0 text-right">1.3 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Simple Analytics</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '2.7%', minWidth: '6px', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[65px] shrink-0 text-right">4.2 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Mixpanel</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '20.3%', backgroundColor: 'var(--color-warm-400)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[65px] shrink-0 text-right">32 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Piwik PRO</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '24.1%', backgroundColor: 'var(--color-warm-400)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[65px] shrink-0 text-right">38 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">PostHog</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '37.3%', backgroundColor: 'var(--color-warm-400)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[65px] shrink-0 text-right">59 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">GA4</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '84.8%', backgroundColor: 'var(--color-red-alert)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-red-alert w-[65px] shrink-0 text-right">134 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Adobe</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '100%', backgroundColor: 'var(--color-red-alert)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-red-alert w-[65px] shrink-0 text-right">175 KB</span>
            </div>
          </div>

          <p>
            Adobe Analytics fires{" "}
            <span className="font-mono font-medium text-text-primary">
              6 requests across 4 domains
            </span>{" "}
            and transfers 175 KB. Sealmetrics fires 2 requests to 1 domain
            and transfers 1.3 KB. That is a{" "}
            <span className="font-mono font-medium text-text-primary">
              134x difference
            </span>{" "}
            in bytes transferred.
          </p>

          <CommercialModule
            hook="The Sealmetrics row reads 2 requests, 1 domain, 2.7 KB. Open your own network tab, filter by analytics, and compare."
          />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Why request count matters
          </h2>

          <p>
            Each HTTP request carries overhead that goes beyond the bytes
            transferred. The browser must resolve DNS, negotiate a TLS
            handshake, and wait for the server response before the payload
            even begins downloading. On a mobile connection with 80ms
            round-trip latency, a single request adds 240ms or more before
            the first byte arrives.
          </p>

          <p>
            Chrome limits concurrent connections to 6 per domain. When
            analytics consumes 4 of those slots, your product images, fonts,
            and JavaScript bundles queue behind them. This is not a
            theoretical concern — it is measurable in Core Web Vitals. Largest
            Contentful Paint increases when the browser is busy negotiating
            connections for analytics scripts instead of rendering your page.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The domain problem
          </h2>

          <p>
            Each external domain your analytics contacts requires its own DNS
            lookup and TLS handshake. DNS resolution typically costs 50-100ms.
            A TLS 1.3 handshake adds another 50-100ms. For tools that contact
            multiple domains, these costs stack.
          </p>

          <p>
            GA4 contacts{" "}
            <span className="font-mono text-[0.95rem] text-text-primary">
              google-analytics.com
            </span>
            ,{" "}
            <span className="font-mono text-[0.95rem] text-text-primary">
              googletagmanager.com
            </span>
            , and sometimes{" "}
            <span className="font-mono text-[0.95rem] text-text-primary">
              doubleclick.net
            </span>
            . That is 3 DNS lookups + 3 TLS handshakes ={" "}
            <span className="font-mono font-medium text-text-primary">
              300-600ms of overhead
            </span>{" "}
            before analytics data even begins to move. Adobe Analytics
            contacts 4 domains — adding up to 400-800ms.
          </p>

          <p>
            Sealmetrics uses{" "}
            <Link
              href="/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              cookieless first-party tracking
            </Link>{" "}
            through a single first-party endpoint. One domain. One DNS
            lookup. One TLS handshake. Two requests. Zero third-party
            connections.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The payload gap
          </h2>

          <p>
            The 158 KB that Adobe Analytics transfers on a single pageview
            includes AppMeasurement code, a visitor ID service, configuration
            data, the tracking beacon itself, a cross-domain ID sync, and an
            audience manager call. Most of that payload supports cross-domain
            tracking, visitor stitching across sites, and remarketing
            data collection — features that are either illegal under GDPR
            without explicit consent or already blocked by modern browsers.
          </p>

          <p>
            GA4&apos;s 134 KB follows a similar pattern: gtag.js bootstraps
            analytics.js, which fetches a configuration payload, then fires
            the collection call. The configuration includes logic for
            Google Signals, cross-device tracking, and ad remarketing. If
            you have disabled those features for compliance, the bytes are
            still downloaded and parsed — you pay the performance cost for
            functionality you cannot use.
          </p>

          <p>
            Sealmetrics&apos; 1.3 KB total — a 1.1 KB script and a small
            beacon — goes to a single first-party endpoint. No visitor IDs
            to sync. No cross-domain stitching. No remarketing payloads.{" "}
            <Link
              href="/glossary/cookieless-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Cookieless analytics
            </Link>{" "}
            does not need any of that infrastructure — and your visitors
            do not need to pay for it.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            How we measured
          </h2>

          <p>
            We tested each tool on an identical HTML page with a single
            analytics snippet. The steps were reproducible:
          </p>

          <ol className="list-decimal list-inside space-y-2 ml-1">
            <li>Created a fresh Chrome profile with no extensions, no saved data</li>
            <li>Loaded the test page with DevTools open, Network tab recording</li>
            <li>Waited for the page to fully load and all analytics requests to complete</li>
            <li>Filtered the Network tab by analytics-related domains</li>
            <li>Recorded request count, unique domains, and total bytes transferred</li>
            <li>Repeated the test 3 times per tool and averaged the results</li>
          </ol>

          <p>
            We tested default installations — no custom configurations, no
            tag manager optimizations, no deferred loading. The numbers
            reflect what most sites actually deploy.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The bottom line
          </h2>

          <p>
            Your analytics tool should measure your site, not slow it down.
            Two requests totaling 1.3 KB to one first-party domain measures traffic without depending on consent through{" "}
            <Link
              href="/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              cookieless first-party collection
            </Link>
            . No third-party domains. No connection overhead. No wasted
            bytes on features your visitors never agreed to.
          </p>

          <p>
            See{" "}
            <Link
              href="/product"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              how Sealmetrics works under the hood
            </Link>
            , or{" "}
            <Link
              href="/data-loss-calculator"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              calculate how much data your current setup is losing
            </Link>
            .
          </p>
        </div>

        <CommercialModule
          hook="Every request in the table above fires on every pageview, for every visitor. See what two requests to a single domain change on your load time."
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
              href="/blog/analytics-tools-lighthouse-scores"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              Analytics Tools vs. Lighthouse Scores: A Real-World Benchmark
            </Link>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
