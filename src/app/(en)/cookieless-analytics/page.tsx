import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import {
  articleSchema,
  breadcrumbSchema,
  speakableWebPageSchema,
} from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

const PILLAR_DATE_PUBLISHED = "2026-05-28";
const PILLAR_DATE_MODIFIED = "2026-05-28";

export const metadata: Metadata = {
  title: "Cookieless analytics, explained — Sealmetrics",
  description:
    "Cookieless analytics measures traffic without depending on consent, via first-party server-side collection — no cookies, no banners, no sampling.",
  openGraph: {
    title: "Cookieless analytics, explained",
    description:
      "What cookieless analytics is, why cookies fail in 2026, what you measure, and where it fits in your stack.",
    type: "article",
    images: [ogImage("/cookieless-analytics/")],
    url: "https://sealmetrics.com/cookieless-analytics/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Cookieless analytics, explained",
    description: "What cookieless analytics is, why cookies fail in 2026, what you measure, and where it fits in your stack.",
    images: [ogImage("/cookieless-analytics/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/cookieless-analytics/",
    languages: getAlternates("/cookieless-analytics"),
  },
};

const faqs = [
  {
    q: "Is cookieless analytics legal under GDPR?",
    a: "Yes — and the legal route is architectural, not contractual. Because no personal data, identifier or cookie is stored, the processing sits outside the material scope of GDPR and the cookie-consent requirement of ePrivacy. The CNIL exemption criteria, the German DSK guidance and the UK ICO PECR exemption all describe this same path. Sealmetrics ships with a DPA, EU-only processing in Dublin, and a TPSR (Transfer, Privacy and Security Review) package for legal review.",
  },
  {
    q: "How accurate is cookieless tracking compared with GA4?",
    a: "It captures more, not the same. Cookie-based tools lose data three times in Europe: 40–60% of visitors reject consent, ~40% use ad blockers that strip the script, and Safari/Firefox cap first-party cookies at 7 days. Cookieless server-side collection is unaffected by all three. Hotel groups running both have measured 30–40% more traffic and 15–20% more attributed revenue against their own CRM.",
  },
  {
    q: "Can I run it alongside Google Analytics 4?",
    a: "Yes — we recommend it for the first 30 days. Most teams keep GA4 running for Google Ads conversion import and BigQuery legacy, and use Sealmetrics as the source of truth for board-level decisions. There is no migration. One script tag, runs in parallel.",
  },
  {
    q: "What can cookieless analytics not do?",
    a: "It cannot identify a returning visitor. It cannot follow a single person across pages or sessions. It does not build per-user behavioural profiles. If your use case requires user-level identification (logged-in product analytics, CRM triggers based on individual browsing), you need a different category of tool — likely Mixpanel, Amplitude or a CDP. Sealmetrics counts events anonymously and attributes conversions to the channel that drove them, at aggregate scale.",
  },
  {
    q: "What about Google Consent Mode v2?",
    a: "Consent Mode is a modelling layer: when visitors reject cookies, Google estimates the missing data statistically. It is still cookie-based at heart. The data you see in GA4 with Consent Mode is a model of the 87% you cannot measure. Cookieless analytics is a measurement layer — visitors are counted whether or not they accept the banner, no model required. The two answer different questions.",
  },
  {
    q: "How fast is implementation?",
    a: "Five minutes to install the 846-byte first-party pixel on any CMS, SPA or headless setup. First data in the first hour. Full calibration within a week. Side-by-side with GA4 from day one — no rip-and-replace.",
  },
];

export default function CookielessAnalyticsPillar() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Cookieless analytics" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Cookieless analytics", url: "/cookieless-analytics" },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/cookieless-analytics",
          name: "Cookieless analytics — what it is and what it captures",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline:
            "Cookieless analytics, explained — what it is, what it captures, and what it doesn't",
          description:
            "A definitive guide to cookieless web analytics: architecture, accuracy, GDPR basis, and where it fits in an eCommerce stack.",
          datePublished: PILLAR_DATE_PUBLISHED,
          dateModified: PILLAR_DATE_MODIFIED,
          url: "/cookieless-analytics",
          category: "Analytics",
          author: {
            name: "Rafa Jiménez",
            url: "/authors/rafa-jimenez",
            jobTitle: "Founder, Sealmetrics",
          },
        })}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span
            className="eyebrow mb-5"
            style={{ display: "inline-flex", justifyContent: "center" }}
          >
            Pillar — Cookieless analytics
          </span>
          <h1
            className="h-display mx-auto mt-5"
            style={{ maxWidth: "22ch" }}
          >
            Analytics without cookies.{" "}
            <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              Complete data, by architecture.
            </em>
          </h1>
          <p
            className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]"
            style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
          >
            In 2026, cookie-based analytics measures roughly 13% of European
            traffic. The other 87% is rejected, blocked or capped before the
            tag fires. This is a guide to the alternative — what cookieless
            analytics is, what it counts, what it deliberately doesn&apos;t,
            and where it fits beside the rest of your stack.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            Cookieless analytics is web analytics that captures pageviews,
            events and conversions{" "}
            <strong>anonymously, on the server side</strong>, from your own
            domain — without cookies, fingerprinting or personal identifiers.
            It doesn't lose visitors to consent rejection because there is no cookie for browsers to expire and no consent for a banner to reject, and
            in first-party mode far less for ad blockers to block. The
            trade-off is honest: you measure channels and conversions at
            aggregate scale, not individual people across sessions. For an
            eCommerce or media business making investment decisions on traffic
            mix, that trade-off is usually the correct one.
          </>
        }
        bullets={[
          <>
            <strong>No consent-driven loss</strong> of traffic — no consent gate, no
            ad-blocker drop-off, no 7-day cookie expiry.
          </>,
          <>
            <strong>Designed for GDPR from the architecture up</strong> (self-assessed) — no cookies, no
            PII, no cross-session identifiers. EU-only processing.
          </>,
          <>
            <strong>Last-click revenue attribution</strong> at channel and
            campaign level, on visitors who accept and reject the banner alike.
          </>,
          <>
            <strong>What it doesn&apos;t do</strong> — identify returning
            visitors, follow individuals across sessions, or build per-user
            profiles. If you need that, use a CDP.
          </>,
        ]}
      />

      {/* WHY COOKIES FAIL */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">
            Why cookie-based analytics fails in 2026
          </h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            The cookie was designed in 1994 for session continuity — keeping
            you logged in, holding a shopping cart. Its use for analytics was
            a later adaptation that depended on conditions that no longer
            exist. Three structural shifts have made the cookie an unreliable
            measurement primitive in Europe, and they compound:
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                1. Consent rejection — 40 to 60% of EU visitors
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Since the 2019 CNIL and ICO guidance hardened, a consent
                banner is required before any non-essential cookie is set.
                Real-world rejection rates sit between 40% (B2B) and 60%
                (B2C consumer) across European markets. Those visitors are
                still on your site, still buying, still leaving — but
                invisible to your analytics.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                2. Ad blockers — ~40% of EU users
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                uBlock, AdBlock Plus and the Brave browser ship rule lists
                that strip third-party analytics scripts before they
                execute. The visitor never registers in your GA4 property at
                all — there is no consent to reject because there is no
                request. This loss is silent. It does not appear as a missed
                opt-in; it appears as missing sessions.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                3. Safari ITP and Firefox ETP — 7-day cap on first-party
                cookies
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Even when the visitor consents, Safari&apos;s Intelligent
                Tracking Prevention caps first-party analytics cookies at 7
                days. Firefox does the same. A user who browses on Tuesday
                and converts on Thursday next week shows up as a new
                visitor. Attribution windows collapse. Returning-visitor
                identification stops working at scale.
              </p>
            </div>
          </div>

          <p className="mt-10 text-[17px] leading-[1.75] text-ink-soft">
            Stack those losses and you are typically left with around{" "}
            <Link
              href="/blog/why-ga4-shows-13pct-eu-traffic"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              13% of European traffic visible
            </Link>{" "}
            in GA4. The rest is rejected, blocked or expired before
            measurement begins. Google&apos;s answer — Consent Mode v2 — is
            to model the missing data statistically. That is a useful
            estimate for some questions. It is not a measurement.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">How analytics works without cookies</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            The architecture removes the cookie as a tracking primitive and
            replaces it with anonymous, first-party event counting. Three
            layers, one pipeline:
          </p>

          <ol className="mt-10 space-y-6 list-none pl-0 counter-reset:step">
            <li className="pl-12 relative">
              <span className="absolute left-0 top-0 font-mono text-[13px] font-semibold text-brand">
                01
              </span>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                First-party pixel on your own domain
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                A small JavaScript tag (846 bytes in our case) sends each
                pageview to{" "}
                <code className="font-mono text-[14px] bg-warm-100 px-1.5 py-0.5 rounded">
                  pixel.yourdomain.com
                </code>
                — a CNAME under your own domain, not a third-party host.
                Because the request leaves the page from the first-party
                origin, ad-block rule lists do not match it. Because no
                cookie is set or read, no consent gate is required.
              </p>
            </li>

            <li className="pl-12 relative">
              <span className="absolute left-0 top-0 font-mono text-[13px] font-semibold text-brand">
                02
              </span>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                Anonymous server-side event counting
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                The pixel endpoint runs in Dublin and counts events at
                channel, campaign and landing-page level. No user identifier
                is created. No fingerprint of IP plus User-Agent is stored.
                The system knows that 142 pageviews arrived from Google CPC
                on a specific landing page; it does not know that visitor
                A and visitor B were the same person.
              </p>
            </li>

            <li className="pl-12 relative">
              <span className="absolute left-0 top-0 font-mono text-[13px] font-semibold text-brand">
                03
              </span>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                Last-click attribution and aggregate reporting
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Each conversion event is attributed to the traffic source
                observed on the page load where it happened — last-click,
                every time, on data without consent gaps. Aggregates flow into
                dashboards, BigQuery, and an MCP server for AI agents. The
                output is channel performance: which sources drove revenue
                this week, and by how much.
              </p>
            </li>
          </ol>

          <p className="mt-10 text-[17px] leading-[1.75] text-ink-soft">
            The full architecture — pixel, pipeline, reporting layer — is
            documented on{" "}
            <Link
              href="/how-it-works"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              How it works
            </Link>
            . The technical glossary entry is at{" "}
            <Link
              href="/glossary/cookieless-analytics"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              cookieless analytics
            </Link>
            .
          </p>
        </div>
      </section>

      {/* WHAT IT CAPTURES / DOESN'T */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">
            What you measure — and what you don&apos;t
          </h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft text-center max-w-[64ch] mx-auto">
            The honesty matters. Anyone who tells you cookieless analytics
            does everything cookie-based did is selling, not informing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="border border-warm-100 rounded-2xl p-7 bg-warm-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-4">
                What it captures
              </h3>
              <ul className="space-y-3 text-[15px] leading-[1.7] text-ink list-none pl-0">
                {[
                  "Pageviews, sessions and conversion events — without consent gaps.",
                  "Channel, campaign, source and medium for every event.",
                  "Last-click revenue attribution at channel level.",
                  "Funnel step counts — how many visitors reached step 1, step 2, step 3.",
                  "Landing-page performance, geographic distribution (country level), device class.",
                  "Conversion events from Shopify, WooCommerce, Magento, PrestaShop and custom checkouts via dataLayer.",
                ].map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="text-brand" aria-hidden>—</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-warm-100 rounded-2xl p-7 bg-warm-white">
              <h3
                className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] mb-4"
                style={{ color: "#B5423B" }}
              >
                What it does not
              </h3>
              <ul className="space-y-3 text-[15px] leading-[1.7] text-ink list-none pl-0">
                {[
                  "Identify a returning visitor across sessions.",
                  "Build per-user behavioural profiles.",
                  "Reconstruct an individual's path through your site.",
                  "Power user-level CRM triggers based on browsing history.",
                  "Replace a CDP for logged-in product analytics.",
                  "Provide individual-level retargeting audiences (use Google/Meta pixels for that, run in parallel).",
                ].map((s) => (
                  <li key={s} className="flex gap-3">
                    <span style={{ color: "#B5423B" }} aria-hidden>—</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 text-[17px] leading-[1.75] text-ink-soft max-w-[64ch] mx-auto text-center">
            For a CMO defending media spend, a CFO reconciling channel
            revenue against the P&amp;L, or an eCommerce manager whose
            decisions live or die by traffic mix, the left column is the
            answer. For product analytics on a logged-in app, the right
            column is the wrong tool — pair with Mixpanel or Amplitude.
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">
            Cookie-based vs first-party server-side
          </h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft text-center max-w-[60ch] mx-auto">
            The architectural difference shows up in six places that matter
            for measurement decisions.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-[15px] border-collapse">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft font-semibold">
                    Dimension
                  </th>
                  <th className="text-left py-3 px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft font-semibold">
                    Cookie-based (GA4, GA360, Adobe)
                  </th>
                  <th className="text-left py-3 pl-4 font-mono text-[11px] uppercase tracking-[0.14em] text-brand font-semibold">
                    First-party server-side
                  </th>
                </tr>
              </thead>
              <tbody className="text-ink">
                {[
                  ["Traffic captured (EU)", "~13% after consent + ad-block + ITP", "Not reduced by consent — no script, no expiry"],
                  ["Consent banner", "Required before any tracking", "Not required — no personal data"],
                  ["Ad-blocker impact", "Script stripped on ~40% of visits", "First-party request — not in rule lists"],
                  ["Cookie lifespan", "Safari ITP caps at 7 days", "No cookie — irrelevant"],
                  ["Returning-visitor ID", "Possible (when cookie survives)", "Not possible by design"],
                  ["Attribution model", "Data-driven or last-click on 13%", "Last-click on data without consent gaps"],
                  ["Data residency", "US default (GA), EU optional (Adobe, Piwik)", "EU-only (Dublin)"],
                ].map(([dim, cookie, server]) => (
                  <tr key={dim} className="border-b border-warm-100">
                    <td className="py-3 pr-4 font-medium">{dim}</td>
                    <td className="py-3 px-4 text-ink-soft">{cookie}</td>
                    <td className="py-3 pl-4">{server}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-10 text-[15px] leading-[1.7] text-ink-soft text-center">
            For the full feature-by-feature comparison against GA4, see{" "}
            <Link
              href="/vs-ga4"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              Sealmetrics vs Google Analytics 4
            </Link>
            . The enterprise tier (GA360, Adobe Analytics, Piwik PRO) is
            covered on{" "}
            <Link
              href="/vs"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              Comparisons
            </Link>
            .
          </p>
        </div>
      </section>

      {/* BY SECTOR */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">By your sector</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft text-center max-w-[60ch] mx-auto">
            The architecture is the same. The reconciliation patterns, KPIs
            and integration shape change with the model.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            {[
              {
                href: "/blog/cookieless-analytics-for-ecommerce",
                tag: "eCommerce",
                title: "Cookieless analytics for eCommerce",
                lede: "Shopify, WooCommerce and Magento reconciliation. Revenue, attribution, conversion — without consent banners.",
              },
              {
                href: "/blog/cookieless-analytics-for-hotels",
                tag: "Hotels",
                title: "Cookieless analytics for hotels",
                lede: "Direct-booking attribution. Meta-search revenue. PMS reconciliation for Mews, Cloudbeds, Opera.",
              },
              {
                href: "/blog/cookieless-analytics-for-saas",
                tag: "SaaS",
                title: "Cookieless analytics for SaaS",
                lede: "PLG funnels without consent banners. Works alongside Mixpanel and Amplitude. BigQuery export.",
              },
              {
                href: "/blog/consentless-analytics-for-dtc",
                tag: "DTC",
                title: "Consentless analytics for DTC brands",
                lede: "How direct-to-consumer brands measure paid social, influencer revenue and email last-click without cookies.",
              },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
              >
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {s.tag}
                </span>
                <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.01em] text-ink leading-[1.25] group-hover:text-brand transition-colors">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
                  {s.lede}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE IT FITS */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Where it fits in your analytics stack</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            Cookieless analytics is not a replacement for every tool. It is
            the measurement layer — the source of truth for &ldquo;how much
            traffic came in, where from, and what did it do.&rdquo; The rest
            of the stack stays:
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">
                Alongside GA4 (for Google Ads conversion import)
              </h3>
              <p className="text-[15px] leading-[1.7] text-ink-soft">
                Keep GA4 running for the integrations Google reserves for
                its own product: Ads conversion import, the Search Console
                join. Use Sealmetrics as the number you make decisions on.
                Two tools, two purposes.
              </p>
            </div>

            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">
                Alongside Mixpanel / Amplitude (for product analytics)
              </h3>
              <p className="text-[15px] leading-[1.7] text-ink-soft">
                Product analytics needs user-level identification — logged-in
                event streams, cohort retention, feature usage by account.
                That is a different tool category. Run it after authentication;
                run Sealmetrics on the marketing surface.
              </p>
            </div>

            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">
                Alongside BigQuery (for warehouse modelling)
              </h3>
              <p className="text-[15px] leading-[1.7] text-ink-soft">
                Full-resolution event and conversion counts export to
                BigQuery from the Growth plan up — no ETL, no sampling.
                Marketing-mix modelling, finance reconciliation and custom
                attribution windows live in the warehouse.
              </p>
            </div>

            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">
                Not a replacement for Meta or Google ad pixels
              </h3>
              <p className="text-[15px] leading-[1.7] text-ink-soft">
                Retargeting audiences and on-platform optimisation still
                need their respective pixels. They serve the bidder, not the
                measurement. Keep them; measure their actual contribution
                with Sealmetrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Common questions</h2>
          <dl className="mt-12 divide-y divide-warm-100 border-y border-warm-100">
            {faqs.map((f) => (
              <div key={f.q} className="py-7">
                <dt className="text-[17px] font-semibold text-ink mb-3">
                  {f.q}
                </dt>
                <dd
                  data-speakable
                  className="faq-answer text-[15.5px] leading-[1.7] text-ink-soft max-w-[68ch]"
                >
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={
          <>
            See your <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              complete data
            </em> in 30 minutes.
          </>
        }
        titleEs={
          <>
            Ve tus <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              datos completos
            </em> en 30 minutos.
          </>
        }
        ledeEn="Book a walkthrough with the founder. We run the gap calculator on your real traffic and show you what GA4 is missing this month."
        ledeEs="Reserva 30 min con el founder. Pasamos tu tráfico real por la calculadora y te enseñamos lo que GA4 no ve este mes."
      />
    </>
  );
}
