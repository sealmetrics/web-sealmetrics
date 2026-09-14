import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
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
  title: "Complete data — analytics without consent-driven data loss",
  description:
    "Complete data: web analytics that doesn't lose visitors to consent rejection. No sampling, no modelling. The decisions it changes for CMOs and CFOs.",
  openGraph: {
    title: "Complete data — analytics without consent-driven data loss",
    description:
      "Why incomplete analytics produces wrong investment decisions, what complete data means architecturally, and the numbers that change when you switch.",
    type: "article",
    images: [ogImage("/complete-data/")],
    url: "https://sealmetrics.com/complete-data/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Complete data — analytics without consent-driven data loss",
    description: "Why incomplete analytics produces wrong investment decisions, what complete data means architecturally, and the numbers that change when you switch.",
    images: [ogImage("/complete-data/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/complete-data/",
    languages: getAlternates("/complete-data"),
  },
};

const faqs = [
  {
    q: "What does \"complete data\" actually mean?",
    a: "Visitors counted whether or not they accept the banner. Conversions attributed on that same data. No consent gate, no ad-blocker drop-off, no Safari 7-day cookie expiry, no statistical modelling to fill the gaps. The number you see in the dashboard is the number that happened. Operationally that means pageview and event capture that doesn't depend on consent, and last-click revenue attribution applied to every observed conversion — not the 13% that consented.",
  },
  {
    q: "Isn't GA4's Consent Mode v2 already solving this?",
    a: "Consent Mode is a modelling layer. When visitors reject cookies, Google estimates what they probably did based on the visitors who did consent. That model is useful when you need a ballpark; it is not a measurement. For a CMO defending a €2M annual media spend, the question is whether you want decisions made on a model of the 87% you cannot see, or on measured data that consent rejection doesn't erase. Complete data is the second answer.",
  },
  {
    q: "What changes operationally when I switch?",
    a: "Three things, immediately. First, channel mix shifts — typically organic, email and direct gain share at the expense of paid (because those channels were less consent-affected, not because they were doing worse). Second, attribution windows extend — repeat conversions stop being misclassified as new ones. Third, the conversation in the marketing review changes: you stop debating the data and start debating the decision.",
  },
  {
    q: "How do I know my data was actually incomplete?",
    a: "Run the gap calculator on your real traffic. We compare what GA4 reports against what your CRM, Shopify orders, or PMS records show. The gap is usually 25–45% for B2C consumer brands, 15–25% for B2B. If the gap is below 10%, you probably do not need to switch. Most teams discover the gap is much larger than they assumed.",
  },
  {
    q: "Does complete data mean Sealmetrics ignores privacy?",
    a: "The opposite. Complete data is possible because the architecture is consentless by design — no cookies, no identifiers, no personal data. Privacy is the constraint that forces the measurement to be aggregate; aggregate measurement is what makes measuring without a consent dialog lawful. The two are the same architectural choice, viewed from different angles.",
  },
  {
    q: "Where is this data stored?",
    a: "Exclusively in Dublin, Ireland, on EU-owned infrastructure. No transfer to the United States. The dashboard, the BigQuery export, the API and the MCP server all draw from the same EU-resident dataset.",
  },
];

export default function CompleteDataPillar() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Complete data" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Complete data", url: "/complete-data" },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/complete-data",
          name: "Complete data — analytics without consent-driven data loss",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline:
            "Complete data — why incomplete analytics produces wrong decisions, and what it takes to measure without consent gaps",
          description:
            "The category-defining argument for cookieless, consentless, EU-hosted analytics without consent-driven data loss — and the decisions it changes for CMOs and CFOs.",
          datePublished: PILLAR_DATE_PUBLISHED,
          dateModified: PILLAR_DATE_MODIFIED,
          url: "/complete-data",
          category: "Strategy",
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
            Pillar — Complete data
          </span>
          <h1
            className="h-display mx-auto mt-5"
            style={{ maxWidth: "20ch" }}
          >
            <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              Complete data.
            </em>{" "}
            Decisions you can defend.
          </h1>
          <QuickAnswer>
            {`Google Meridian MMM accuracy depends entirely on the completeness of the input data, and consent-based analytics tools like GA4 undermine that accuracy from the start. When EU visitors reject cookie consent, GA4 stops logging their sessions, creating gaps of 40–60% in observed traffic depending on banner design and audience. Since Meridian relies on historical marketing and conversion data to model channel effectiveness, feeding it incomplete GA4 exports means the algorithm trains on a biased subset of users—typically those more tolerant of tracking—skewing attribution and media-mix recommendations. Sealmetrics addresses this at the source: a consentless analytics architecture that measures EU site traffic without cookies or consent banners, designed for GDPR from the architecture up (self-assessed). Because no visitor is excluded pre-consent, the dataset feeding into MMM tools stays statistically representative of actual traffic and revenue, not just consenting users. Last-click revenue attribution on the complete dataset further ensures that conversion values entering any MMM model reflect real business outcomes rather than partial, consent-filtered approximations.`}
          </QuickAnswer>
          <p
            className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]"
            style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
          >
            The single most expensive line item in your media plan is the
            decision you made on incomplete analytics. In Europe, that
            decision was made on roughly 13% of your real traffic. This is
            the argument for fixing that — and the numbers that change
            when you do.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            Complete data is web analytics where the number in the
            dashboard equals the number that happened. No consent gate
            losing 40–60% of visitors, no ad blockers stripping the
            script on another 40%, no Safari ITP truncating attribution
            at 7 days, no statistical model filling the gap. It is the
            output of a deliberate architectural choice — cookieless,
            consentless, first-party, EU-only — that swaps individual
            tracking for aggregate measurement that includes visitors who
            reject the banner. For an eCommerce
            or media business making investment decisions on traffic
            mix, that swap is almost always the correct one.
          </>
        }
        bullets={[
          <>
            <strong>Consent-independent pageview capture</strong> — no consent, no
            script-block, no expiry.
          </>,
          <>
            <strong>Last-click revenue attribution</strong> applied to
            visitors who accept and reject the banner alike, not just the
            consenting 13%.
          </>,
          <>
            <strong>No modelling</strong> — measurement, not estimation.
          </>,
          <>
            <strong>EU-only</strong> processing in Dublin, Ireland.
          </>,
        ]}
      />

      {/* THE COST OF INCOMPLETE */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">
            What incomplete data actually costs
          </h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            The risk of bad analytics is not that your dashboard is
            wrong. The risk is that your decisions are wrong, in ways
            that compound over a fiscal year. Three failure modes show
            up in every CMO review we run with new customers.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                Misallocated paid spend
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Channels that consent at higher rates (older audiences,
                B2B traffic, branded search) look better than they are.
                Channels that consent at lower rates (paid social, video,
                younger audiences) look worse than they are. Budget
                follows the report. Over four quarters, a 30%
                consent-rate gap between channels distorts the entire
                media plan — without anyone noticing the distortion is
                in the measurement, not the market.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                Wrong winners declared
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                A/B test results lean toward whichever variant served a
                more consenting audience. Conversion-rate optimisation
                projects optimise toward the survivor sample.
                Hotel-group customers running both tools have measured
                +30% more attributed bookings on direct traffic — not
                because direct improved, but because direct is the
                channel GA4 was systematically under-counting.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                Board reports that don&apos;t reconcile
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                The marketing report says €X. The CRM says €Y. Finance
                says €Z. The reconciliation conversation eats hours of
                every quarterly review. When measurement is complete,
                the marketing number lines up with the CRM number to
                within a few percentage points, and the conversation
                moves from &ldquo;which number is right&rdquo; to
                &ldquo;what do we do about it.&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-12 p-7 bg-warm-white border border-warm-100 rounded-2xl">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                Run the gap
              </span>
              <span className="h-px flex-1 bg-warm-100" />
            </div>
            <p className="text-[16px] leading-[1.7] text-ink">
              Most teams underestimate the size of their data gap by
              half. The{" "}
              <Link
                href="/data-loss-calculator"
                className="text-brand underline decoration-1 underline-offset-2"
              >
                data-loss calculator
              </Link>{" "}
              compares what GA4 reports against your CRM or Shopify
              orders, by channel. Takes under five minutes; the
              first quarter&apos;s decisions get clearer immediately.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT IT MEANS */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">
            What &ldquo;complete data&rdquo; means, specifically
          </h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            The word &ldquo;complete&rdquo; is doing real work here, not
            marketing work. Four operational guarantees:
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                num: "01",
                title: "Visitors counted, banner or not",
                body:
                  "No consent gate, no ad-blocker drop-off, no cookie expiry. First-party server-side collection runs from your own domain — there is no third-party script for browsers or rule lists to intercept.",
              },
              {
                num: "02",
                title: "Conversions attributed without consent gaps",
                body:
                  "Last-click revenue attribution applied to every observed conversion, not the 13% that consented. The channel that actually drove the conversion gets the credit — by data, not by model.",
              },
              {
                num: "03",
                title: "No statistical filling",
                body:
                  "No consent-mode-style imputation, no machine-learning gap-fill, no \"modelled conversions.\" If the number is in the dashboard, the event happened. If the event didn't happen, the number is not there.",
              },
              {
                num: "04",
                title: "No surveillance trade-off",
                body:
                  "Complete capture is possible because the architecture is anonymous. No identifier per visitor, no profile, no cross-session linkage. Aggregate counts at channel level. The compliance side of this is the consentless pillar.",
              },
            ].map((c) => (
              <div
                key={c.num}
                className="border border-warm-100 rounded-2xl p-6 bg-white"
              >
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {c.num}
                </span>
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3]">
                  {c.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-ink-soft">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT'S POSSIBLE */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Where this comes from architecturally</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            Complete data is the outcome. It rests on two prior choices
            that pull in opposite directions from conventional analytics
            — and that is why it works.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex gap-6">
              <span className="font-mono text-[13px] font-semibold text-brand pt-1 min-w-[80px]">
                Choice 1
              </span>
              <div>
                <h3 className="text-[17px] font-semibold text-ink mb-2">
                  No cookies — anywhere
                </h3>
                <p className="text-[15px] leading-[1.7] text-ink-soft">
                  Without the cookie, ad blockers have nothing to
                  block, browsers have nothing to expire, and Safari
                  ITP has nothing to truncate. The 87% loss disappears
                  because the loss vectors no longer exist. Full
                  architecture at{" "}
                  <Link
                    href="/cookieless-analytics"
                    className="text-brand underline decoration-1 underline-offset-2"
                  >
                    cookieless analytics
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <span className="font-mono text-[13px] font-semibold text-brand pt-1 min-w-[80px]">
                Choice 2
              </span>
              <div>
                <h3 className="text-[17px] font-semibold text-ink mb-2">
                  No personal identifiers — anywhere
                </h3>
                <p className="text-[15px] leading-[1.7] text-ink-soft">
                  Without identifiers, GDPR&apos;s material scope does
                  not engage and the consent banner stops being
                  required. Without the banner, the 40–60% rejection
                  loss disappears. Full legal walk-through at{" "}
                  <Link
                    href="/consentless-analytics"
                    className="text-brand underline decoration-1 underline-offset-2"
                  >
                    consentless analytics
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <span className="font-mono text-[13px] font-semibold text-brand pt-1 min-w-[80px]">
                Outcome
              </span>
              <div>
                <h3 className="text-[17px] font-semibold text-ink mb-2">
                  Complete data
                </h3>
                <p className="text-[15px] leading-[1.7] text-ink-soft">
                  Both loss vectors removed. What remains is aggregate,
                  anonymous measurement of visitors who accept and reject
                  the banner alike, attributed
                  last-click at channel level. The pipeline diagram is
                  on{" "}
                  <Link
                    href="/how-it-works"
                    className="text-brand underline decoration-1 underline-offset-2"
                  >
                    How it works
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          <p className="mt-10 text-[16px] leading-[1.7] text-ink-soft italic">
            The trade-off is real: no returning-visitor identification,
            no cross-session journeys, no per-user profiles. For a CMO
            optimising channel mix and a CFO reconciling revenue to
            P&amp;L, the trade-off is favourable. For a product team
            building cohort retention dashboards, it is not — use a
            different tool category.
          </p>
        </div>
      </section>

      {/* BY ROLE */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">
            What changes, by role
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {[
              {
                tag: "CMO",
                title: "Budget defence with numbers your CFO signs against",
                body:
                  "Channel performance reconciled to CRM revenue, including visitors who reject the banner. The quarterly board conversation moves from \"which number is right\" to \"what do we do about it.\"",
                href: "/for/cmo",
              },
              {
                tag: "CFO",
                title: "Marketing numbers that reconcile to the P&L",
                body:
                  "Same data residency, same EU-only processing, same audit trail. The reconciliation gap with marketing typically closes from 30–40% to under 5%.",
                href: "/for/cmo",
              },
              {
                tag: "eCommerce manager",
                title: "Attribution that matches what Shopify recorded",
                body:
                  "Last-click revenue at channel level, on orders without consent gaps. Stop arguing with paid agencies about whose pixel is right — the order ledger is the source of truth, and now your analytics matches it.",
                href: "/for/ecommerce",
              },
            ].map((c) => (
              <Link
                key={c.tag}
                href={c.href}
                className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
              >
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {c.tag}
                </span>
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">
                  {c.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                  {c.body}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
                  Read the role page →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SPOKES */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">
            The argument, in long form
          </h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft text-center max-w-[60ch] mx-auto">
            Four pieces that build the case from different angles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            {[
              {
                href: "/blog/why-ga4-shows-13pct-eu-traffic",
                tag: "The 13% number",
                title: "Why GA4 shows you 13% of your EU traffic",
                lede: "The arithmetic of consent + ad-block + Safari ITP, with sector-level rejection rates.",
              },
              {
                href: "/blog/ga4-data-sampling-problem",
                tag: "Sampling",
                title: "GA4's data sampling problem",
                lede: "What thresholds trigger sampling, what the sampled report looks like, and why the warning is buried.",
              },
              {
                href: "/blog/what-is-data-loss-in-analytics",
                tag: "Definitions",
                title: "What \"data loss\" means in analytics",
                lede: "Five distinct loss vectors, each measurable, each routinely conflated in vendor decks.",
              },
              {
                href: "/blog/analytics-scripts-costing-you-sales",
                tag: "Performance cost",
                title: "The analytics scripts costing you sales",
                lede: "How layered analytics + tag-manager + consent-platform + ad-pixel stacks hurt LCP and abandon.",
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
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
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

      {/* FAQ */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
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
            See <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              your
            </em> gap, on your real traffic.
          </>
        }
        titleEs={
          <>
            Mira <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              tu
            </em> gap real, sobre tu tráfico.
          </>
        }
        ledeEn="Book a 30-minute walkthrough with the founder. We run the data-loss calculator live on your site and reconcile the result against your CRM."
        ledeEs="Reserva 30 min con el founder. Corremos la calculadora sobre tu site y la reconciliamos con tu CRM en directo."
      />
    </>
  );
}
