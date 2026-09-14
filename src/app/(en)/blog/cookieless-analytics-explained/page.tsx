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
  title: "Cookieless Analytics: How to Measure Without Cookies",
  description:
    "Cookies are disappearing. Learn how cookieless analytics works, why it captures more data, and what it means for GDPR compliance.",
  openGraph: {
    title: "Cookieless Analytics Explained",
    description:
      "How cookieless analytics works, why it captures more data, and what it means for compliance.",
    type: "article",
    url: "https://sealmetrics.com/blog/cookieless-analytics-explained/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/cookieless-analytics-explained.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Cookieless Analytics Explained",
    description: "How cookieless analytics works, why it captures more data, and what it means for compliance.",
    images: ["https://sealmetrics.com/og/blog/cookieless-analytics-explained.png"],
  },
  alternates: {
    languages: getAlternates("/blog/cookieless-analytics-explained"),
    canonical: "https://sealmetrics.com/blog/cookieless-analytics-explained/",
  },
};

export default function CookielessAnalyticsExplainedPage() {
  const dates = postDates("cookieless-analytics-explained");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Cookieless Analytics Explained" }]} />
      <JsonLd data={articleSchema({ headline: "Cookieless Analytics Explained: How to Measure Without Cookies", description: "How cookieless analytics works and why it matters.", ...dates, url: "/blog/cookieless-analytics-explained", category: "Technology", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Cookieless Analytics", url: "/blog/cookieless-analytics-explained" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Technology
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            How Web Analytics Works Without Cookies, Consent or Per-User Tracking
          </h1>
          <PostByline
              {...dates}
              readTime="8 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
        </header>

        <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
          <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li>Cookie-based analytics fails at three structural levels: browsers block third-party cookies by default, GDPR consent causes ~55% rejection, and ad blockers strip scripts from another 40%.</li>
            <li>Cookieless analytics replaces cookies with first-party data collection through your own infrastructure — no third-party server, no blocked scripts, no consent dependency.</li>
            <li>Cookie-based tracking can fall to about 13% of EU traffic in the compounded worst case, and on a real Shopify store measured over 48 days GA4 did not record 29% of visits; cookieless tracking captures 100% because there is nothing to block, reject, or expire.</li>
            <li>Consent exemption is architectural, not a workaround — no personal data is collected and no cookies are stored, which is consistent with CNIL and German DSK guidance.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            The cookie — the small text file that has powered web analytics
            since 1994 — is reaching the end of its useful life. Safari blocks
            third-party cookies by default. Firefox does the same. Chrome has
            restricted them. And <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer">GDPR</a> consent requirements mean that a
            significant percentage of European visitors opt out of cookie-based
            tracking entirely.
          </p>

          <p>
            For businesses that depend on web analytics for marketing decisions,
            this creates a fundamental problem: the tool you rely on to
            understand your traffic is increasingly blind to most of it.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Why cookies fail at measurement
          </h2>

          <p>
            Cookies were designed for session management — keeping users logged
            in, remembering shopping carts. Their use for analytics tracking was
            a later adaptation, and that adaptation relied on conditions that no
            longer exist:
          </p>

          <ul className="space-y-2 pl-0 list-none">
            {[
              "Browsers accepted all cookies by default (they no longer do)",
              "Users rarely cleared cookies (privacy features now do it automatically)",
              "Ad blockers were uncommon (40% of EU users now run them)",
              "Consent was not required (GDPR changed this in 2018)",
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

          <p>
            The cumulative effect is large. In the compounded worst case, a
            European eCommerce site can lose up to 87% of its visitor data
            before any analytics processing occurs. The measured gap is smaller
            but still material: on a real Shopify store tracked side by side for
            48 days,{" "}
            <Link href="/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GA4 did not record 29% of visits</Link>
            . The{" "}
            <Link
              href="/data-loss-calculator"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              data loss calculator
            </Link>{" "}
            shows the cascade of losses for your specific traffic.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            How cookieless analytics works
          </h2>

          <p>
            <Link
              href="/cookieless-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Cookieless analytics
            </Link>{" "}
            replaces the cookie mechanism with{" "}
            <Link
              href="/glossary/first-party-data-collection"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              first-party cookieless data collection
            </Link>
            . Instead of placing a cookie on the visitor&rsquo;s browser and
            sending data to a third-party analytics server, the data collection
            happens through your own infrastructure.
          </p>

          <p>The key differences:</p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-[0.85rem]">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-3 pr-6 text-text-tertiary font-medium">
                    Aspect
                  </th>
                  <th className="text-left py-3 px-6 text-text-secondary font-medium">
                    Cookie-based (GA4)
                  </th>
                  <th className="text-left py-3 pl-6 text-green-muted font-medium">
                    Cookieless (Sealmetrics)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    aspect: "Data path",
                    cookie: "Browser → third-party server",
                    cookieless: "Browser → your server (first-party)",
                  },
                  {
                    aspect: "Blocked by ad blockers",
                    cookie: "Yes (40% of users)",
                    cookieless: "No (first-party requests)",
                  },
                  {
                    aspect: "Affected by consent",
                    cookie: "Yes (55% reject in EU)",
                    cookieless: "No (no cookies or PII)",
                  },
                  {
                    aspect: "Browser restrictions",
                    cookie: "ITP, ETP limit cookie life",
                    cookieless: "Not applicable",
                  },
                  {
                    aspect: "Traffic captured",
                    cookie: "Consent-dependent",
                    cookieless: "100%",
                  },
                ].map((row) => (
                  <tr
                    key={row.aspect}
                    className="border-b border-warm-100 last:border-0"
                  >
                    <td className="py-3 pr-6 text-text-body">{row.aspect}</td>
                    <td className="py-3 px-6 text-text-secondary">
                      {row.cookie}
                    </td>
                    <td className="py-3 pl-6 text-text-primary font-medium">
                      {row.cookieless}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CommercialModule hook="See cookieless measurement running on a real store — your own, in a 30-minute walkthrough." />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Privacy compliance without compromise
          </h2>

          <p>
            A common misconception is that cookieless analytics is a workaround
            to avoid consent requirements. It is not. The reason consent is not
            required is architectural: no personal data is collected, and no
            cookies are stored on the visitor&rsquo;s device.
          </p>

          <p>
            This is consistent with the <a href="https://www.cnil.fr/en/cookies-and-other-tracking-devices-cnil-publishes-new-guidelines" target="_blank" rel="noopener noreferrer">CNIL</a> (French DPA) exemption criteria for
            audience measurement tools and with German DSK guidance on
            consent-free analytics. The{" "}
            <Link
              href="/security"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              security and privacy architecture
            </Link>{" "}
            page covers the regulatory alignment in detail.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What this means for your analytics
          </h2>

          <p>
            The transition from cookie-based to cookieless analytics is not a
            minor upgrade. It is a fundamental change in what you can measure.
            Attribution models that were unreliable on the consenting fraction
            of traffic become useful on 100%. Campaign optimization that was based on the
            cookie-accepting segment can now reflect actual visitor behavior.
          </p>

          <p>
            The best way to understand the difference is to see it. Run a
            cookieless analytics tool alongside your current setup and compare
            the numbers.{" "}
            <Link
              href="/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Learn how Sealmetrics works
            </Link>{" "}
            or{" "}
            <Link
              href="/vs-ga4"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              see the full comparison with GA4
            </Link>
            .
          </p>
        </div>

        <CommercialModule hook="You know how cookieless analytics works. The demo shows what it captures on your site that your current setup doesn't." />

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
              href="/blog/ga4-data-sampling-problem"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              GA4 Data Sampling: Why Your Traffic Numbers Are Wrong
            </Link>
          </div>
        </div>
      </div>
        <RelatedReading currentSlug="cookieless-analytics-explained" />
    </article>
    </>
  );
}
