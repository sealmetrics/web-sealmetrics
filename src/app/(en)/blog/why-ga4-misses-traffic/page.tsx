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
import { QuickAnswer } from "@/components/ui/QuickAnswer";

const TITLE = "Why GA4 Doesn't See Part of Your Traffic";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Consent rejection, ad blockers and browser limits hide part of your traffic from GA4. How much depends on the store. At Incapto it was 29% of visits.",
  openGraph: {
    title: TITLE,
    description:
      "Consent, ad blockers and browsers each hide part of your traffic from GA4. The size of the gap is per store: at Incapto, 29% of visits over 48 days.",
    type: "article",
    url: "https://sealmetrics.com/blog/why-ga4-misses-traffic/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/why-ga4-misses-traffic.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: TITLE,
    description: "Consent, ad blockers and browsers each hide part of your traffic from GA4. The size of the gap is per store: at Incapto, 29% of visits over 48 days.",
    images: ["https://sealmetrics.com/og/blog/why-ga4-misses-traffic.png"],
  },
  alternates: {
    languages: getAlternates("/blog/why-ga4-misses-traffic"),
    canonical: "https://sealmetrics.com/blog/why-ga4-misses-traffic/",
  },
};

const link = "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";

export default function WhyGA4MissesTrafficPage() {
  const dates = postDates("why-ga4-misses-traffic");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: TITLE }]} />
      <JsonLd data={articleSchema({ headline: TITLE, description: "Consent rejection, ad blockers and browser restrictions each hide part of your traffic from GA4. How much depends on the store and the channel; one measured case shows the shape of the gap.", ...dates, url: "/blog/why-ga4-misses-traffic", category: "Data Quality", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: TITLE, url: "/blog/why-ga4-misses-traffic" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Data Quality
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            {TITLE}
          </h1>
          <QuickAnswer>{`GA4 doesn't see part of your traffic: visitors who reject the consent banner, visitors whose ad blocker stops the tag, and visitors whose browser cuts the cookie short. How much depends on the store and the channel, so it has to be measured on each site. In our experience with clients, between 40% and 60% of traffic doesn't accept cookies, and of those who do, 40% don't accept on the first pageview, which is the page that carries the traffic source. When Incapto ran GA4 and Sealmetrics side by side on its Shopify store for 48 days, GA4 missed 29% of visits and 45% of pageviews, and the gap was uneven by channel. Sealmetrics measures without cookies and without processing personal data, so it meets the CNIL and AEPD criteria for consent-exempt audience measurement (self-assessed) and does not lose visits to consent rejection. It attributes revenue on last click, back to the campaign and keyword that earned it.`}</QuickAnswer>
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
            <li>GA4 doesn&rsquo;t see part of your traffic: consent rejection, ad blockers and browser restrictions each remove a share, and sampling degrades what is left. How much depends on the store and the channel.</li>
            <li>In our experience with clients, between 40% and 60% of traffic doesn&rsquo;t accept cookies, and of those who do, 40% don&rsquo;t accept on the first pageview, the page where the traffic source is recorded.</li>
            <li>At Incapto (Shopify, Consent Mode, 48 days), GA4 missed 29% of visits and 45% of pageviews. The extra traffic Sealmetrics saw ran from +11% in direct to +133% in organic social.</li>
            <li>Google Consent Mode v2 models missing data but cannot recover what was never collected: it estimates, it does not measure.</li>
            <li>There is no universal percentage. The only number that matters is your own, measured side by side with GA4.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            Open GA4 right now and look at yesterday&rsquo;s sessions. The
            number on your screen is not wrong, exactly. It is real data from
            real visitors. The problem is what it leaves out, and that the
            report gives you no way to know how much.
          </p>

          <p>
            This is not a bug. It is not a misconfiguration. It is the
            structural result of how cookie-based analytics works in the
            European Union in 2026. The wider argument — why incomplete data
            produces wrong decisions and what{" "}
            <Link href="/complete-data" className={link}>complete data</Link>{" "}
            changes — lives on the pillar; this post is the mechanism underneath it.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Three ways GA4 loses sight of a visit
          </h2>

          <p>
            GA4 does not lose your data in one place. It loses it in three
            successive layers, each acting on what the previous one left. The
            term for this cumulative erosion is{" "}
            <Link href="/glossary/data-loss-in-analytics" className={link}>
              data loss in analytics
            </Link>
            . What follows is how each layer works. How big each one is on your
            site is a separate question, and the honest answer is that it has
            to be measured, not looked up.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Layer 1: the visitors who say no
          </h2>

          <p>
            Under <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer">GDPR and the ePrivacy Directive</a>, any website using cookies
            for analytics must obtain consent before firing tracking scripts.
            In our experience with clients, between 40% and 60% of traffic
            doesn&rsquo;t accept cookies. Where a site lands in that range
            depends on the sector, the strength of the brand, the traffic mix
            and the design of the banner.
          </p>

          <p>
            When a visitor clicks &ldquo;Reject&rdquo; on your cookie banner,
            GA4 never loads. That visitor does not exist in your analytics. No
            pageview, no session, no event. They are invisible.
          </p>

          <p>
            The deeper problem is that{" "}
            <Link href="/blog/consent-banner-impact-on-analytics" className={link}>
              consent rejection is not random
            </Link>
            . The people who reject are not a representative sample of the
            people who visit, so losing them does not just shrink your data. It
            bends it.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The hidden layer: cookies that arrive too late
          </h2>

          <p>
            Acceptance is not the end of the problem. In our experience with
            clients, of those who do accept cookies, 40% don&rsquo;t accept on
            the first pageview: they browse first and click the banner later.
          </p>

          <p>
            Why does this matter? Because the landing page is where the
            traffic source is recorded. The referrer, the UTM parameters, the
            campaign data&nbsp;&mdash; all of it is captured on the first page
            view. If cookies are not active on that page, GA4 sees the rest of
            the visit but never learns where it came from. The session lands
            in direct, in unassigned, or nowhere useful.
          </p>

          <p>
            So even the visitors GA4 does count are not all attributed. Part
            of what looks like measured traffic is traffic with no origin you
            can decide anything with.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Layer 2: ad blockers stop the tag
          </h2>

          <p>
            Some of the visitors who accepted cookies run browser extensions
            that block analytics scripts. uBlock Origin, AdBlock Plus,
            Brave&rsquo;s built-in shields and dozens of similar tools all
            target gtag.js and the Google Analytics collection endpoint.
          </p>

          <p>
            Unlike consent rejection, ad blocking is silent. The visitor
            accepted your cookie banner, they are browsing your site, they
            may even be converting &mdash; but GA4 never fires because the
            script was blocked before it could load.
          </p>

          <p>
            How many of your visitors block depends on who they are: the
            share is higher on desktop than on mobile, and higher in technical
            audiences &mdash; software, SaaS, developer tools &mdash; than
            among general shoppers.
          </p>

        <CommercialModule
          hook="Want to know how much of your traffic GA4 is missing? A 30-minute walkthrough puts your GA4 reports next to a measurement that doesn't depend on consent, live."
        />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Layer 3: browser restrictions erode the rest
          </h2>

          <p>
            Safari&rsquo;s{" "}
            <Link href="/glossary/intelligent-tracking-prevention" className={link}>
              Intelligent Tracking Prevention
            </Link>{" "}
            (<a href="https://webkit.org/tracking-prevention/" target="_blank" rel="noopener noreferrer">ITP</a>) caps third-party cookies at 7 days and client-side
            first-party cookies at 24 hours in many scenarios.
            Firefox&rsquo;s Enhanced Tracking Protection (ETP) applies similar
            restrictions.
          </p>

          <p>
            The effect is subtle but significant: returning visitors appear as
            new visitors because their identifier expired. Sessions fragment.
            Attribution chains break. A customer who visited your site five
            times over two weeks looks like five different people in GA4.
          </p>

          <p>
            This does not remove visitors from your count entirely, but it
            distorts session data, inflates new-user metrics and breaks
            multi-session attribution for the visitors the first two layers
            left in place.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What the gap looked like on one store
          </h2>

          <p>
            A mechanism is not a number. To see the size and the shape of the
            gap, you have to run a second measurement next to GA4. When Incapto
            did that on its Shopify store, with Consent Mode active, for 48 days
            between 14 June and 31 July 2026, this is what came out.
          </p>

          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] my-8">
            <p className="text-[0.85rem] font-medium text-text-primary mb-4 uppercase tracking-[0.06em]">
              Incapto: GA4 next to Sealmetrics
            </p>
            <div className="space-y-3 font-mono text-[0.9rem]">
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Visits GA4 did not record</span>
                <span className="text-red-alert font-medium">29%</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Pageviews GA4 did not record</span>
                <span className="text-red-alert font-medium">45%</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Extra traffic seen in direct</span>
                <span className="text-text-primary font-medium">+11%</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Extra traffic seen in organic social</span>
                <span className="text-text-primary font-medium">+133%</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Real orders Sealmetrics recorded</span>
                <span className="text-text-primary font-medium">95.7%</span>
              </div>
            </div>
            <p className="text-[0.8rem] text-text-tertiary mt-4">
              One store, one period. Visits, pageviews and orders cover 14 Jun
              &rarr; 31 Jul 2026; the channel figures cover 28 Jul &rarr; 6 Aug
              2026. Your gap will be different: measure it on your own traffic.
            </p>
          </div>

          <p>
            Two things stand out. First, the gap is not the kind that makes a
            report look broken. It makes it quietly wrong, in a consistent
            direction, which is why nobody notices. Second, the loss was not
            even. Channels carrying people who already know the brand barely
            moved; the ones bringing new people in from an external click lost
            far more. The{" "}
            <Link href="/case-studies/incapto" className={link}>
              Incapto case study
            </Link>{" "}
            has the full channel breakdown and the caveats on each figure.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Why this is not solvable inside GA4
          </h2>

          <p>
            Google&rsquo;s answer to consent-based data loss is <a href="https://support.google.com/analytics/answer/9976101" target="_blank" rel="noopener noreferrer">Consent Mode
            v2</a>. When a visitor rejects cookies, Consent Mode sends
            &ldquo;cookieless pings&rdquo; to Google, which then uses machine
            learning to model the missing data and fill in the gaps.
          </p>

          <p>
            This sounds promising until you examine what it actually produces.
            Consent Mode does not measure the visitors who rejected cookies.
            It estimates what those visitors probably did based on the
            behavior of visitors who accepted. The resulting numbers are
            modeled data, not measurement. Incapto had Consent Mode active
            throughout the 48 days above.
          </p>

          <p>
            Modeled data is acceptable for high-level trends. It is not
            acceptable for campaign-level attribution, conversion path
            analysis, or revenue decisions. When Google tells you that
            &ldquo;estimated conversions&rdquo; from a campaign are 47, that
            number is a statistical projection, not a count of real events.
          </p>

          <p>
            And Consent Mode does nothing about ad blockers or browser
            restrictions. If gtag.js never loads, no ping is sent &mdash;
            modeled or otherwise.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What complete data looks like
          </h2>

          <p>
            The alternative is analytics that does not depend on cookies,
            does not load client-side scripts that can be blocked, and does
            not require consent for basic measurement.
          </p>

          <p>
            Sealmetrics uses a{" "}
            <Link href="/glossary/cookieless-analytics" className={link}>
              cookieless
            </Link>
            , server-side approach. A lightweight script (under 1 KB), which
            can be served from a subdomain of your own domain, collects
            events. No cookies are set. Because nothing is stored on or read
            from the visitor&apos;s device, the cookie-consent requirement has
            nothing to attach to, and no visits are lost to consent rejection.
            How complete the rest of the coverage is depends on the
            implementation, which is why the Incapto figures are reconciled
            against the store&rsquo;s real orders rather than asserted.
          </p>

          <p>
            You can{" "}
            <Link href="/how-it-works" className={link}>
              see how the architecture works
            </Link>{" "}
            or{" "}
            <Link href="/data-loss-calculator" className={link}>
              estimate your own data loss
            </Link>{" "}
            from your market and consent rates before you measure it.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Is this unique to GA4?
          </h2>

          <p>
            To be fair: no. Any cookie-based analytics tool &mdash; Adobe
            Analytics, Piwik PRO in its default configuration, Matomo with
            cookies enabled &mdash; faces the same three-layer problem. GA4
            is not uniquely bad. It is the most widely used tool that
            demonstrates a structural limitation shared by the entire
            category.
          </p>

          <p>
            The{" "}
            <Link href="/vs-ga4" className={link}>
              detailed comparison between Sealmetrics and GA4
            </Link>{" "}
            covers pricing, data ownership, and compliance alongside data
            completeness. Data completeness is the starting point, but it is
            not the only difference.
          </p>
        </div>

        <CommercialModule
          hook="There is no universal percentage, only yours. Measure it side by side with GA4, on your own traffic."
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
              href="/blog/ga4-data-sampling-problem"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              GA4 Data Sampling: Why Your Traffic Numbers Are Wrong
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
        <RelatedReading currentSlug="why-ga4-misses-traffic" />
    </article>
    </>
  );
}
