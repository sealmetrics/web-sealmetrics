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
  title: "We Measured Every Analytics Script. Here Is What We Found.",
  description:
    "We measured major analytics scripts from production CDNs. GA4 was 132x heavier than Sealmetrics, the lightest of the ten tools tested.",
  openGraph: {
    title: "We Measured Every Analytics Script. Here Is What We Found.",
    description:
      "Real measurements of analytics script sizes from production CDNs. The results are stark.",
    type: "article",
    url: "https://sealmetrics.com/blog/we-measured-every-analytics-script/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/we-measured-every-analytics-script.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "We Measured Every Analytics Script. Here Is What We Found.",
    description: "Real measurements of analytics script sizes from production CDNs. The results are stark.",
    images: ["https://sealmetrics.com/og/blog/we-measured-every-analytics-script.png"],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/we-measured-every-analytics-script/",
  },
};

export default function MeasuredScriptsPage() {
  const dates = postDates("we-measured-every-analytics-script");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "We Measured Every Analytics Script" }]} />
      <JsonLd data={articleSchema({ headline: "We Measured Every Analytics Script. Here Is What We Found.", description: "We downloaded major analytics scripts from production CDNs and measured their real size.", ...dates, url: "/blog/we-measured-every-analytics-script", category: "Performance", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "We Measured Every Analytics Script", url: "/blog/we-measured-every-analytics-script" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Performance
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            We Measured Every Analytics Script. Here Is What We Found.
          </h1>
          <PostByline
              {...dates}
              readTime="4 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
        </header>

        <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
          <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li>GA4 is 132x heavier than Sealmetrics (145.6 KB vs 1.1 KB gzipped), and the Adobe stack is 155x heavier at ~170 KB. Sealmetrics was the lightest measured, ahead of Plausible at 1.3 KB.</li>
            <li>For a site with 100,000 monthly visitors, GA4 consumes 14.9 GB of bandwidth per month versus 113 MB for Sealmetrics.</li>
            <li>Enterprise analytics scripts carry legacy code for cross-site tracking and fingerprinting — features now illegal under GDPR or blocked by browsers.</li>
            <li>At 1 million pageviews/month, GA4 generates approximately 30 kg of CO2 annually versus 0.6 kg for Sealmetrics.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            We downloaded the main analytics scripts from every major provider
            — directly from their production CDNs. Not from documentation
            pages. Not from marketing claims. The actual minified, gzipped
            files that load on your visitors&apos; browsers.
          </p>

          <p className="text-[0.95rem] text-text-tertiary border-l-2 border-warm-200 pl-4">
            <strong className="text-text-secondary">Method.</strong> One GET per
            script with <code className="font-mono text-[0.85rem]">Accept-Encoding: gzip</code>,
            bytes counted on disk, response headers read from the same request.
            &ldquo;On the wire&rdquo; is what actually crosses the network;
            &ldquo;uncompressed&rdquo; is what the browser then has to parse.
            Measured 9 August 2026 — vendors ship changes constantly, so treat
            these as a dated snapshot rather than fixed constants.
          </p>

          <p className="text-[0.95rem] text-text-tertiary border-l-2 border-warm-200 pl-4">
            <strong className="text-text-secondary">† Adobe is measured
            differently.</strong> Adobe Analytics has no single public script to
            fetch: it loads as a per-customer Launch container plus
            AppMeasurement, the ActivityMap module and rule payloads. Those
            figures come from a field measurement on a real European media site
            running Adobe and Sealmetrics side by side — ~150 KB for the Launch
            container and ~20 KB for AppMeasurement and modules, ~170 KB in
            total. It is a real number from a real page, but it is a stack, not
            a single file, so it is not strictly like-for-like with the rows
            above.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The raw numbers
          </h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-[0.9rem] border-collapse">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-2.5 pr-4 text-text-secondary font-medium">Tool</th>
                  <th className="text-right py-2.5 text-text-secondary font-medium">On the wire (gzip)</th>
                  <th className="text-right py-2.5 text-text-secondary font-medium">Uncompressed</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 font-medium text-text-primary">Sealmetrics</td>
                  <td className="py-2.5 text-right font-mono text-green-muted">1.1 KB</td>
                  <td className="py-2.5 text-right font-mono text-text-tertiary">1.9 KB</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Plausible</td>
                  <td className="py-2.5 text-right font-mono text-text-body">1.3 KB</td>
                  <td className="py-2.5 text-right font-mono text-text-tertiary">2.8 KB</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Fathom</td>
                  <td className="py-2.5 text-right font-mono text-text-body">2.0 KB</td>
                  <td className="py-2.5 text-right font-mono text-text-tertiary">6.7 KB</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Simple Analytics</td>
                  <td className="py-2.5 text-right font-mono text-text-body">3.8 KB</td>
                  <td className="py-2.5 text-right font-mono text-text-tertiary">7.3 KB</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Piwik PRO</td>
                  <td className="py-2.5 text-right font-mono text-text-body">26.2 KB</td>
                  <td className="py-2.5 text-right font-mono text-text-tertiary">67.5 KB</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Mixpanel</td>
                  <td className="py-2.5 text-right font-mono text-text-body">32.6 KB</td>
                  <td className="py-2.5 text-right font-mono text-text-tertiary">101.5 KB</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Matomo</td>
                  <td className="py-2.5 text-right font-mono text-text-body">46.2 KB</td>
                  <td className="py-2.5 text-right font-mono text-text-tertiary">152.5 KB</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">PostHog</td>
                  <td className="py-2.5 text-right font-mono text-text-body">76.2 KB</td>
                  <td className="py-2.5 text-right font-mono text-text-tertiary">237.8 KB</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Google Analytics 4</td>
                  <td className="py-2.5 text-right font-mono text-red-alert">145.6 KB</td>
                  <td className="py-2.5 text-right font-mono text-text-tertiary">409.4 KB</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Adobe Analytics&nbsp;†</td>
                  <td className="py-2.5 text-right font-mono text-red-alert">~170 KB</td>
                  <td className="py-2.5 text-right font-mono text-text-tertiary">~730 KB</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Visual bar chart */}
          <div className="my-8 space-y-1.5" aria-label="Script size comparison chart">
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] font-medium text-text-primary w-[110px] shrink-0 text-right">Sealmetrics</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '0.6%', minWidth: '4px', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-primary w-[65px] shrink-0 text-right">1.1 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Plausible</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '0.8%', minWidth: '4px', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[65px] shrink-0 text-right">1.3 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Fathom</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '1.2%', minWidth: '4px', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[65px] shrink-0 text-right">2.0 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Simple Analytics</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '2.2%', minWidth: '4px', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[65px] shrink-0 text-right">3.8 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Piwik PRO</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '15.4%', minWidth: '4px', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[65px] shrink-0 text-right">26.2 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Mixpanel</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '19.2%', minWidth: '4px', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[65px] shrink-0 text-right">32.6 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Matomo</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '27.2%', minWidth: '4px', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[65px] shrink-0 text-right">46.2 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">PostHog</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '44.8%', minWidth: '4px', backgroundColor: 'var(--color-green-muted)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-text-tertiary w-[65px] shrink-0 text-right">76.2 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Google Analytics 4</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '85.6%', minWidth: '4px', backgroundColor: 'var(--color-red-alert)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-red-alert w-[65px] shrink-0 text-right">145.6 KB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-text-secondary w-[110px] shrink-0 text-right">Adobe Analytics</span>
              <div className="flex-1 bg-warm-50 rounded-[2px] h-6">
                <div className="h-full rounded-[2px]" style={{ width: '100.0%', minWidth: '4px', backgroundColor: 'var(--color-red-alert)' }} />
              </div>
              <span className="text-[0.75rem] font-mono text-red-alert w-[65px] shrink-0 text-right">~170 KB</span>
            </div>
          </div>

          <p>
            GA4 is{" "}
            <span className="font-mono font-medium text-text-primary">
              132x heavier
            </span>{" "}
            than Sealmetrics, and the Adobe stack is 155x heavier. Sealmetrics
            is the lightest of the ten, just ahead of Plausible.
          </p>

          <CommercialModule
            hook="GA4 is 52x heavier than the 2.5 KB Sealmetrics script in this test. Weigh your own stack on your own pages and compare."
          />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What these numbers actually mean
          </h2>

          <p>
            For a site with 100,000 monthly visitors, <a href="https://developers.google.com/tag-platform/gtagjs" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GA4&apos;s script</a> alone
            consumes 14.9 GB of bandwidth per month. Sealmetrics consumes
            113 MB. That is not a rounding error — it is a 132x difference in
            network resources, battery drain, and page load time.
          </p>

          <p>
            53% of mobile users abandon sites that take more than 3 seconds
            to load. Heavy analytics scripts contribute directly to that
            latency through Total Blocking Time, <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Interaction to Next Paint</a>
            delays, and bandwidth competition with your actual content.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Why are enterprise scripts so heavy?
          </h2>

          <p>
            Enterprise analytics tools carry legacy code for features that are
            now either illegal under GDPR or blocked by browsers. Cross-site
            tracking, third-party cookie management, fingerprinting modules —
            your visitors pay the performance cost for features you can not
            legally use.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The environmental cost
          </h2>

          <p>
            At 1 million pageviews per month, GA4&apos;s script generates
            approximately 30 kg of CO&#x2082; annually — equivalent to driving
            120 km. Sealmetrics&apos; equivalent: 0.6 kg, or about 2.4 km.
          </p>

          <p>
            Data transfer consumes energy. The lighter the script, the lower
            the environmental footprint. At scale, the difference is
            significant.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            How we measured
          </h2>

          <p>
            We downloaded scripts directly from production CDNs — the same
            files that load on real visitor browsers. We measured minified
            file sizes and applied standard gzip compression for consistency
            across all tools. No marketing claims, no documentation numbers.
            Just the actual bytes.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The bottom line
          </h2>

          <p>
            The script that measures your site performance is itself degrading
            your site performance. A 1.1 KB script measures traffic without depending on consent
            through{" "}
            <Link href="/how-it-works" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless first-party collection</Link>
            , complies with{" "}
            <Link
              href="/glossary/gdpr-analytics-compliance"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              GDPR by design
            </Link>
            , and loads in under 50ms. The question is not whether you can
            afford to switch — it is whether you can afford not to.{" "}
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
          hook="Script weight is a tax every visitor pays on every pageview. See what measurement at 2.5 KB changes in your Core Web Vitals."
        />

        {/* Related */}
        <div className="mt-16 pt-10 border-t border-warm-100">
          <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
            Related articles
          </h3>
          <div className="space-y-3">
            <Link
              href="/blog/analytics-scripts-costing-you-sales"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              The Hidden Conversion Killer: How Analytics Scripts Are Costing You Sales
            </Link>
            <Link
              href="/blog/cookieless-analytics-explained"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              Cookieless Analytics Explained: How to Measure Without Cookies
            </Link>
          </div>
        </div>
      </div>
        <RelatedReading currentSlug="we-measured-every-analytics-script" />
    </article>
    </>
  );
}
