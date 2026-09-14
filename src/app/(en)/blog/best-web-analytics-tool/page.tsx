import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  articleSchema,
  breadcrumbSchema,
  itemListSchema,
  faqPageSchema,
} from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ComparisonLinks } from "@/components/ui/ComparisonLinks";
import {
  Chip,
  ReqHeading,
  ReqIndex,
  TestBox,
  StatRow,
  ScoreBands,
  ScorePill,
  ScrollableTable,
} from "@/components/ui/RequirementBlocks";

export const metadata: Metadata = {
  title: "The Best Web Analytics Tool: 12 Requirements",
  description: "Not a vendor list. The 12 technical requirements a web analytics platform must meet — pixel weight, real time, 100% of data, API, MCP — and how to test each.",
  openGraph: {
    title: "The Best Web Analytics Tool: 12 Requirements That Decide It",
    description:
      "The specification a platform has to meet before it deserves to be called the best. Each requirement with the failure it prevents and a test you can run in the demo.",
    type: "article",
    url: "https://sealmetrics.com/blog/best-web-analytics-tool/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/best-web-analytics-tool.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "The Best Web Analytics Tool: 12 Requirements That Decide It",
    description: "The specification a platform has to meet before it deserves to be called the best. Each requirement with the failure it prevents and a test you can run in the demo.",
    images: ["https://sealmetrics.com/og/blog/best-web-analytics-tool.png"],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/best-web-analytics-tool/",
    languages: getAlternates("/blog/best-web-analytics-tool"),
  },
};

const requirements = [
  {
    n: 1,
    id: "req-1",
    title: "Ultralightweight pixel",
    bar: "Under 5 KB gzipped on the wire, under 10 KB parsed, async, no tag manager dependency",
    seal: "1.1 KB on the wire · 2.0 KB parsed. ~132× lighter than gtag.js",
    score: 2,
  },
  {
    n: 2,
    id: "req-2",
    title: "100% of the data",
    bar: "Every page load observed, consent-independent, not blocklisted, no sampling",
    seal: "Cookieless by architecture. In a 48-day parallel run on Shopify, GA4 missed 29% of visits while Sealmetrics recorded 96% of real orders",
    score: 2,
  },
  {
    n: 3,
    id: "req-3",
    title: "Real time in every dashboard",
    bar: "Sub-minute ingest, same freshness across the full report set, holds at peak",
    seal: "Real time across all dashboards and funnels. Contractual commitment stated separately: data complete before 6 AM",
    score: 2,
  },
  {
    n: 4,
    id: "req-4",
    title: "Answers any analyst question",
    bar: "Arbitrary dimension × metric, no cardinality collapse, no sampling, retroactive funnels, raw rows",
    seal: "Custom properties as native dimensions, segments, retroactive funnels, raw-row endpoints. No sampling",
    score: 2,
  },
  {
    n: 5,
    id: "req-5",
    title: "Flexible pixel",
    bar: "Arbitrary events and properties, currency values, server-side ingest, SPA, multi-domain, editable channel rules",
    seal: "Custom events and properties, micro-conversions as a native concept, HTTP endpoint for server-side and offline ingest",
    score: 2,
  },
  {
    n: 6,
    id: "req-6",
    title: "Robust API",
    bar: "Full report coverage, scoped keys, raw rows, webhooks, native warehouse export",
    seal: "REST API, raw-row endpoints, webhooks with delivery logs, native BigQuery export with no ETL",
    score: 2,
  },
  {
    n: 7,
    id: "req-7",
    title: "MCP",
    bar: "Vendor-hosted MCP server, scoped read-only credentials, agent-callable",
    seal: "Hosted MCP server. Claude, ChatGPT or an internal copilot connects once and queries the data directly",
    score: 2,
  },
  {
    n: 8,
    id: "req-8",
    title: "Auditable, private AI",
    bar: "Anomaly detection and forecasting, always traceable to the query, BYOK or in-jurisdiction inference",
    seal: "LENS AI on all plans via your own key, or Private AI — an open model hosted in Paris, no key needed",
    score: 2,
  },
  {
    n: 9,
    id: "req-9",
    title: "Honest attribution",
    bar: "Model stated plainly, applied consistently, observed and modelled never blended",
    seal: "Last-click at channel level over 100% of conversions. No modelled conversions. No multi-touch, permanently",
    score: 2,
  },
  {
    n: 10,
    id: "req-10",
    title: "Visible bot filtering",
    bar: "Excluded from metrics and inspectable",
    seal: "Bot traffic and suspicious-session reporting — the exclusions are visible, not just a setting",
    score: 2,
  },
  {
    n: 11,
    id: "req-11",
    title: "Compliance by architecture",
    bar: "No personal data, named EU location, DPA included, certifications verifiable",
    seal: "No personal data, EU-hosted in Dublin, DPA in the standard contract. Not ISO 27001 or SOC 2 certified",
    score: 1,
  },
  {
    n: 12,
    id: "req-12",
    title: "Ownership and predictable price",
    bar: "Open-format export on demand, stated retention, forecastable pricing, minutes to set up",
    seal: "Full export via API and BigQuery, plan-based pricing rather than per-event billing, setup in minutes",
    score: 2,
  },
];

const faqs = [
  {
    question: "What is the most important requirement in a web analytics tool?",
    answer:
      "Data completeness. A platform that observes 100% of page loads without depending on consent is the prerequisite for every other requirement: perfect real-time dashboards over 40% of reality are a faster route to a wrong decision, not a better one. Score completeness first, and if a platform fails it, stop evaluating.",
  },
  {
    question: "How light should an analytics pixel be?",
    answer:
      "Under 5 KB gzipped on the wire and under 10 KB of JavaScript parsed on the device. For reference, GA4's gtag.js is roughly 146 KB on the wire and around 409 KB parsed. Heavy tags fail first on 3G and mobile, so you lose exactly the traffic whose conversion rate is most fragile — and the sessions that never fired don't appear in the report telling you sessions are down.",
  },
  {
    question: "What does real time actually mean in web analytics?",
    answer:
      "Sub-minute ingestion latency, and the same freshness across the full report set — every dimension, filter, funnel and segment queryable on today's data, at peak load. Most platforms ship a stripped-down live view of active users and top pages while every report you would use to make a decision runs on data 4 to 24 hours old.",
  },
  {
    question: "Why does an analytics platform need an MCP server?",
    answer:
      "Because analysts now work with AI assistants in the loop. Without a Model Context Protocol server, every question becomes a manual round trip: build the report, export the CSV, paste it into a chat, get an answer about a stale snapshot with no ability to drill down. An MCP server lets your assistant query channels, campaigns, funnels and conversions itself, live. A chat widget inside the vendor's own dashboard is not the same thing.",
  },
  {
    question: "Is last-click attribution worse than multi-touch?",
    answer:
      "Not when the alternative is a sophisticated model applied to partial data. Last-click over 100% of conversions is a defensible instrument. A multi-touch model over the 40% of sessions that accepted cookies is a story about a sample wearing the clothes of a measurement. What matters is that the platform states its model and never blends observed and modelled figures in the same number.",
  },
];

const linkClass =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const h2Class =
  "font-serif text-[1.5rem] font-medium text-text-primary mt-14 mb-5";
const strongClass = "font-semibold text-text-primary";

export default function BestWebAnalyticsToolPage() {
  const dates = postDates("best-web-analytics-tool");

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: "The Best Web Analytics Tool" },
        ]}
      />
      <JsonLd
        data={articleSchema({
          headline: "The Best Web Analytics Tool: 12 Requirements That Decide It",
          description:
            "The 12 technical requirements a web analytics platform must meet — pixel weight, real time, 100% of the data, API, MCP — each with the failure it prevents and a test you can run.",
          ...dates,
          url: "/blog/best-web-analytics-tool",
          category: "Comparisons",
          author: {
            name: "Rafa Jiménez",
            url: "/authors/rafa-jimenez",
            jobTitle: "Founder, Sealmetrics",
          },
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", url: "/blog" },
          {
            name: "The Best Web Analytics Tool",
            url: "/blog/best-web-analytics-tool",
          },
        ])}
      />
      <JsonLd
        data={itemListSchema({
          name: "12 requirements for the best web analytics tool",
          description:
            "The technical specification a web analytics platform has to meet, from pixel weight to MCP support.",
          url: "/blog/best-web-analytics-tool",
          items: requirements.map((r) => ({
            name: r.title,
            position: r.n,
          })),
        })}
      />
      <JsonLd data={faqPageSchema(faqs, "/blog/best-web-analytics-tool")} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block rounded-full bg-mint px-3 py-1 text-[0.7rem] font-medium tracking-[0.08em] uppercase text-[#1F5C48] mb-5">
              Comparisons
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              The best web analytics tool: the 12 requirements that actually
              decide it
            </h1>
            <PostByline
              {...dates}
              readTime="12 min read"
              authorName="Rafa Jiménez"
            />
          </header>

          <div className="mb-10 p-6 bg-warm-white border border-warm-100 rounded-[14px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
              Key takeaways
            </h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>
                Analytics buying decisions fail on the criteria, not the vendor.
                &ldquo;Has dashboards&rdquo; is not a requirement; &ldquo;real
                time&rdquo; is not one until you define the latency and the
                scope.
              </li>
              <li>
                Requirement 2 — 100% of the data — is not one of twelve. Fail it
                and the other eleven are decoration.
              </li>
              <li>
                Most platforms fail on an analyst&rsquo;s third question, never
                the first. The causes are always pre-aggregation, cardinality
                limits and sampling.
              </li>
              <li>
                An MCP server is now a hard requirement, not a nice-to-have. A
                chat widget inside the vendor&rsquo;s dashboard is a different
                thing entirely.
              </li>
              <li>
                Each requirement below carries a test you can run during the
                demo — not a claim you have to take on trust.
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Most analytics buying decisions are made on a feature grid nobody
              verifies. Someone builds a spreadsheet, twelve vendors get a green
              tick next to &ldquo;real-time dashboards&rdquo;, and eighteen
              months later the team is still exporting to a spreadsheet because
              the platform can&rsquo;t answer the third question in a row.
            </p>

            <p>
              The problem is not that buyers pick the wrong vendor. It is that
              the criteria are wrong. &ldquo;Has dashboards&rdquo; is not a
              requirement. &ldquo;Real time&rdquo; is not a requirement until
              you define the latency and the scope. &ldquo;GDPR-compliant&rdquo;
              is not a requirement until you name the legal basis.
            </p>

            <p>
              So this is not a vendor list. It is the specification a platform
              has to meet before it deserves to be called the best web analytics
              tool for a company that spends real money on acquisition. Twelve
              requirements, each with the failure it prevents and a test you can
              run in a demo.
            </p>

            <ReqIndex
              label="The 12 requirements"
              items={requirements.map((r) => ({
                n: r.n,
                id: r.id,
                title: r.title,
              }))}
            />

            <ReqHeading n={1} id="req-1">
              An ultralightweight pixel
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">The failure it prevents</Chip>
              <p>
                Every kilobyte of measurement code is a tax on the sessions you
                most want to measure. A 146 KB tag on a 3G connection in a
                regional market doesn&rsquo;t arrive late — it often
                doesn&rsquo;t arrive at all, because the visitor has already
                bounced. You lose the slowest, most mobile, most marginal
                traffic first, which is exactly the traffic where your
                conversion rate is most fragile. And the{" "}
                <Link
                  href="/glossary/data-loss-in-analytics"
                  className={linkClass}
                >
                  data loss
                </Link>{" "}
                is invisible: the sessions that never fired don&rsquo;t appear
                in the report telling you sessions are down.
              </p>
              <p>
                Then there is the second cost. Measurement code that competes
                with your own JavaScript for the main thread degrades LCP and
                INP, and Core Web Vitals is not a vanity metric on an eCommerce
                site — it moves rankings and it moves conversion rate. You are
                paying for measurement twice: once in lost data, once in lost
                revenue.
              </p>
            </div>

            <StatRow
              items={[
                {
                  value: "146 KB",
                  label: "GA4 gtag.js on the wire, gzipped",
                  tone: "risk",
                },
                {
                  value: "409 KB",
                  label: "JavaScript GA4 parses on the device",
                  tone: "risk",
                },
                {
                  value: "< 5 KB",
                  label: "The bar, gzipped on the wire",
                  tone: "brand",
                },
                {
                  value: "< 10 KB",
                  label: "The bar, parsed on the device",
                  tone: "brand",
                },
              ]}
            />

            <div className="space-y-4">
              <Chip tone="req">The requirement</Chip>
              <p>
                Under 5 KB gzipped on the wire, under 10 KB of JavaScript parsed
                on the device, asynchronous, non-blocking, no dependency on a
                tag manager to function. Adobe&rsquo;s Launch plus
                AppMeasurement lands in the same range as GA4. We{" "}
                <Link
                  href="/blog/we-measured-every-analytics-script"
                  className={linkClass}
                >
                  measured every major analytics script
                </Link>{" "}
                to check. A platform that needs 100× more code than the
                alternative is making a design choice, not meeting a technical
                necessity.
              </p>
            </div>

            <TestBox label="The test">
              <p>
                Open the vendor&rsquo;s own site, open the network tab, filter
                by their pixel domain, and read the transferred size yourself.
                Then run a Lighthouse pass on a demo page with and without the
                tag, throttled to Slow 3G. If the vendor can&rsquo;t tell you
                the gzipped weight of their own script from memory, they have
                never optimised it.
              </p>
            </TestBox>

            <ReqHeading n={2} id="req-2">
              100% of the data
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">The failure it prevents</Chip>
              <p>
                This is the requirement that invalidates every other one. A
                platform that gives you forty percent of reality with perfect
                dashboards is worse than a spreadsheet with all of it, because
                it gives you the confidence to act on a sample that isn&rsquo;t
                random.
              </p>
              <p>
                Three separate leaks compound. Consent: in European markets,{" "}
                <Link
                  href="/blog/consent-banner-impact-on-analytics"
                  className={linkClass}
                >
                  rejection rates of up to 60%
                </Link>{" "}
                are normal once a compliant banner is in place, and rejected
                visitors are not measured at all by consent-dependent tools.{" "}
                <Link
                  href="/glossary/ad-blocker-analytics-impact"
                  className={linkClass}
                >
                  Ad blockers
                </Link>{" "}
                and browser tracking protection: roughly 25% of technical
                audiences, higher in some verticals. Tag failure: around 5% on
                mobile, and it grows on slow networks. Multiply the survivors
                and you are reporting on a fraction — while your CFO reads it as
                the whole. It is the arithmetic behind{" "}
                <Link
                  href="/blog/why-ga4-shows-13pct-eu-traffic"
                  className={linkClass}
                >
                  GA4 showing 13% of EU traffic
                </Link>
                .
              </p>
            </div>

            <StatRow
              items={[
                {
                  value: "60%",
                  label: "Reject consent in EU markets, once the banner is compliant",
                  tone: "risk",
                },
                {
                  value: "25%",
                  label: "Blocked by ad blockers and browser tracking protection",
                  tone: "risk",
                },
                {
                  value: "5%",
                  label: "Tag failures on mobile — more on slow networks",
                  tone: "risk",
                },
                {
                  value: "~40%",
                  label: "What actually reaches the report your CFO reads as the whole",
                  tone: "risk",
                },
              ]}
            />

            <div className="space-y-4">
              <p>
                The distortion is not evenly spread, which is what makes it
                dangerous. Privacy-aware audiences skew towards specific
                channels and specific devices. Organic search is systematically
                underreported. Paid is systematically flattered, because paid
                landings carry the parameters that survive. Every budget
                reallocation made on that data moves money in the direction of
                the measurement bias.
              </p>
              <Chip tone="req">The requirement</Chip>
              <p>
                The platform must observe 100% of page loads without depending
                on the visitor accepting anything, and without being classified
                as a tracker by blocklists. That is only achievable if it stores
                no personal data — because if it did, consent would be legally
                required and you would be back at 40%. Completeness and privacy
                are the same requirement stated twice, not a trade-off, which is
                the whole argument for{" "}
                <Link href="/glossary/cookieless-analytics" className={linkClass}>
                  cookieless analytics
                </Link>
                .
              </p>
            </div>

            <TestBox label="The test">
              <p>
                Run the candidate in parallel with your current setup for 30
                days and compare both against the one system that has no
                measurement gap: your CRM or order database. Count the orders.
                The gap between platform and CRM is the only completeness metric
                that matters. In the one run we have published with its full method, on Incapto's Shopify store, Sealmetrics recorded 96% of real orders and 97% of revenue. The{" "}
                <Link href="/data-loss-calculator" className={linkClass}>
                  data loss calculator
                </Link>{" "}
                gives you the expected size of that gap before you start.
              </p>
            </TestBox>

            <ReqHeading n={3} id="req-3">
              Real time in every dashboard, not in one report
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">The failure it prevents</Chip>
              <p>
                Almost every platform ships something called
                &ldquo;Realtime&rdquo;. Almost none of them means what you need.
                What you usually get is a stripped-down live view — active
                users, top pages, maybe a country map — while every report you
                would actually use to make a decision runs on data that is 4 to
                24 hours old.
              </p>
              <p>
                That distinction costs money on exactly the days it matters
                most. A broken checkout on Black Friday, a tracking parameter
                dropped in a campaign migration, a landing page 404ing after a
                deploy: the window to fix each of these is measured in hours,
                and a platform that shows you the damage tomorrow morning has
                converted an incident into a loss.
              </p>
              <Chip tone="req">The requirement</Chip>
              <p>
                Sub-minute ingestion latency, and — the part that gets skipped —
                the same freshness across the full report set. Every dimension,
                every filter, every funnel, every segment queryable on
                today&rsquo;s data, at peak load, not just the three metrics on
                the live tile. Real time that degrades under traffic is not real
                time; it is real time until you need it.
              </p>
            </div>

            <TestBox label="The test">
              <p>
                During the demo, ask them to open a segmented funnel filtered on
                a custom property, for today, and refresh it while you fire a
                conversion on the demo site. Then ask what happened to that same
                query on their largest customer&rsquo;s Black Friday. The second
                question is the one that separates architectures.
              </p>
            </TestBox>

            <p>
              One honest caveat on vendor language: real-time dashboards are a
              capability claim, and a contractual SLA is a different object. Ask
              both questions separately, and be suspicious of any vendor who
              answers the SLA question with a product screenshot.
            </p>

            <ReqHeading n={4} id="req-4">
              It answers any question an analyst can ask
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">The failure it prevents</Chip>
              <p>
                This is where most platforms quietly fail, and they fail on the
                third question, never the first.
              </p>
              <p>
                First question: how did revenue do last week? Every tool
                answers. Second question: split it by channel. Most tools
                answer. Third question: within paid social, for mobile users, on
                the product pages of one specific category, comparing the
                visitors who saw the size guide against those who didn&rsquo;t.
                And now you are exporting to a spreadsheet — which means your
                analytics platform is a reporting layer with an export button,
                and the actual analysis happens somewhere it can&rsquo;t be
                governed, shared or reproduced.
              </p>
              <p>
                The technical causes are always the same: pre-aggregated data
                models that only support the combinations someone anticipated,
                cardinality limits that bucket your long tail into
                &ldquo;(other)&rdquo;,{" "}
                <Link href="/glossary/data-sampling" className={linkClass}>
                  sampling
                </Link>{" "}
                above a row threshold, and a fixed schema that can&rsquo;t carry
                your business&rsquo;s own dimensions.
              </p>
              <Chip tone="req">The requirement</Chip>
              <p>
                Arbitrary dimension × metric combinations with no
                pre-aggregation ceiling. No cardinality collapse into
                &ldquo;(other)&rdquo;. No sampling, ever — approximation is
                acceptable in a research tool and unacceptable in a system that
                signs off on budget. Custom properties as first-class
                dimensions, not tacked-on labels. Funnels definable after the
                fact, over historical data, without having been declared in
                advance. And access to full-resolution rows, so an analyst who
                needs to leave the UI can, without leaving the platform.
              </p>
            </div>

            <TestBox label="The test">
              <p>
                Bring your own hardest question to the demo — the one you
                currently answer with a spreadsheet — and ask them to build it
                live. Not &ldquo;can it do this&rdquo;, but &ldquo;do it now, in
                front of me&rdquo;. Then ask what happens when a dimension has
                50,000 distinct values.
              </p>
            </TestBox>

            <ReqHeading n={5} id="req-5">
              A pixel flexible enough to instrument anything
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">The failure it prevents</Chip>
              <p>
                Standard eCommerce events cover the part of your business that
                looks like every other business. The measurement that actually
                differentiates you is always custom: the configurator step, the
                availability check, the finance calculator, the B2B quote
                request, the phone call that closes offline three days later. If
                the platform can only measure what it anticipated, your
                instrumentation ceiling is set by the vendor&rsquo;s product
                roadmap.
              </p>
              <Chip tone="req">The requirement</Chip>
              <p>
                Arbitrary custom events with arbitrary properties.
                Micro-conversions as a native concept, not a hack on top of
                pageviews. Values in currency attached to any event. Client-side
                and{" "}
                <Link href="/glossary/server-side-tracking" className={linkClass}>
                  server-side
                </Link>{" "}
                ingestion through a documented HTTP endpoint, so the events that
                happen off the browser — a webhook, a CRM status change, a
                call-tracking result — land in the same dataset as the
                pageviews. Native handling of single-page applications and
                virtual pageviews. Multi-domain and subdomain measurement
                without breaking attribution. And rules for classifying traffic
                into your channels that you can edit yourself, because every
                business&rsquo;s definition of &ldquo;affiliate&rdquo; or
                &ldquo;partner&rdquo; differs and a fixed channel grouping
                guarantees you will disagree with your own reports.
              </p>
            </div>

            <TestBox label="The test">
              <p>
                Ask them to instrument one event that is specific to your
                business during the demo, and time it. Under ten minutes, using
                documentation, is the bar.
              </p>
            </TestBox>

            <ReqHeading n={6} id="req-6">
              A genuinely robust API
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">The failure it prevents</Chip>
              <p>
                An analytics platform whose data can only be read through its
                own UI is a silo, and silos always end the same way: someone
                rebuilds the important numbers by hand in a slide, they diverge
                from the source, and the QBR becomes an argument about whose
                figure is right.
              </p>
              <Chip tone="req">The requirement</Chip>
              <p>
                Every report available in the UI must be reachable via API — no
                privileged screens. Documented authentication with scoped,
                revocable keys. Published rate limits, so you can engineer
                against them instead of discovering them in production.
                Pagination that works on real volumes. Endpoints that return
                full-resolution rows, not just aggregates. Webhooks for
                event-driven operations, so a conversion anomaly can trigger
                something rather than waiting to be noticed. And native export
                into a warehouse — BigQuery, Snowflake or equivalent — without
                you writing and maintaining an ETL job.
              </p>
              <p>
                One non-negotiable: the API and the UI must return the same
                numbers. It sounds obvious. Test it anyway, because
                pre-aggregation differences between the reporting layer and the
                export layer are a common and extremely expensive surprise.
              </p>
            </div>

            <TestBox label="The test">
              <p>
                Ask for the API docs before the demo, not after. Public,
                versioned documentation you can read without a sales call is
                itself the signal — a vendor whose API docs are gated has an API
                that is not ready to be read.
              </p>
            </TestBox>

            <ReqHeading n={7} id="req-7">
              MCP: the platform has to be readable by agents
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">The failure it prevents</Chip>
              <p>
                The way analytical work gets done changed in the last two years,
                and most platforms have not noticed. Analysts and marketers now
                work with AI assistants in the loop. If your platform
                can&rsquo;t be queried by one, every question becomes a manual
                round trip: open the UI, build the report, export the CSV, paste
                it into a chat, ask, get an answer about a stale snapshot with
                no ability to drill down. That workflow is not just slow. It is
                unauditable — the model answers on whatever fragment was pasted,
                and nobody can reproduce it.
              </p>
              <Chip tone="req">The requirement</Chip>
              <p>
                A Model Context Protocol server, hosted by the vendor, that
                exposes the platform&rsquo;s data as tools an agent can call
                directly. This is a specific thing, and it is worth being
                precise, because &ldquo;AI-ready&rdquo; is currently the most
                abused phrase in analytics marketing. An MCP server means: your
                assistant — Claude, ChatGPT, Cursor, an internal copilot —
                connects once and can then pull channels, campaigns, funnels,
                conversions and custom properties itself, live, and follow up
                without a human re-exporting anything. That is the difference
                between an assistant and{" "}
                <Link
                  href="/blog/self-service-analytics-lens-ai"
                  className={linkClass}
                >
                  genuine self-service analytics
                </Link>
                .
              </p>
            </div>

            <div className="my-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[12px] border border-warm-100 bg-white p-5">
                <Chip tone="req">What MCP is</Chip>
                <p className="mt-3 text-[0.92rem] leading-[1.7] text-text-secondary">
                  A server you connect your own assistant to, once. It then
                  queries channels, campaigns, funnels and conversions itself,
                  live, and follows up without anyone re-exporting a thing.
                </p>
              </div>
              <div className="rounded-[12px] border border-warm-100 bg-white p-5">
                <Chip tone="risk">What MCP is not</Chip>
                <p className="mt-3 text-[0.92rem] leading-[1.7] text-text-secondary">
                  A chat widget inside the vendor&rsquo;s dashboard. That is a
                  feature of their product. MCP is access to your data from
                  wherever you already work.
                </p>
              </div>
            </div>

            <p>
              Requirements within the requirement: read-only scopes by default,
              per-site key granularity, revocable tokens, and an audit trail of
              what was queried. An MCP server without scoped credentials is a
              data exfiltration route with good marketing.
            </p>

            <TestBox label="The test">
              <p>
                Ask for the MCP endpoint URL and connect it to your own
                assistant during the trial. It takes two minutes if it exists.
              </p>
            </TestBox>

            <ReqHeading n={8} id="req-8">
              AI that is auditable, and that doesn&rsquo;t export your data
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">The failure it prevents</Chip>
              <p>
                Two failures, opposite in kind. The first is the black box: a
                platform tells you a channel is underperforming, can&rsquo;t
                show you the query behind it, and you are asked to move budget
                on the word of a model. The second is the privacy leak: to give
                you that insight, your commercial data was sent to a third-party
                API in another jurisdiction, which is a transfer you may not
                have disclosed in your record of processing.
              </p>
              <Chip tone="req">The requirement</Chip>
              <p>
                <Link href="/ai-analytics" className={linkClass}>
                  AI that does the work analysts don&rsquo;t have time for
                </Link>{" "}
                — anomaly detection across every dimension continuously,
                forecasting, surfacing the segments that moved — and that always
                shows the underlying query, so any claim can be verified in the
                UI by a human. Plus a deployment choice: either bring your own
                key, so inference runs against a provider you already have a DPA
                with, or a vendor-hosted model within your own jurisdiction. For
                an EU company, &ldquo;EU-hosted inference&rdquo; means the model
                runs in the EU, and it is a separate question from where your
                analytics data is stored. Ask both.
              </p>
            </div>

            <TestBox label="The test">
              <p>
                Ask where inference physically runs, whether your data can be
                used to train the model, and to click through from any
                AI-generated insight to the report that produced it. If that
                click doesn&rsquo;t exist, the insight isn&rsquo;t evidence.
              </p>
            </TestBox>

            <ReqHeading n={9} id="req-9">
              An attribution model it is honest about
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">The failure it prevents</Chip>
              <p>
                Attribution is where analytics vendors are least honest, and
                buyers rarely push. Platforms that model, estimate or fill gaps
                in conversion data produce numbers that look complete and are
                partly synthetic. When those numbers disagree with your CRM —
                and they will — you cannot tell which part was observed and
                which part was inferred, so you cannot debug the discrepancy at
                all.
              </p>
              <Chip tone="req">The requirement</Chip>
              <p>
                The{" "}
                <Link href="/glossary/attribution-model" className={linkClass}>
                  attribution model
                </Link>{" "}
                must be stated plainly, applied consistently, and documented. If
                it is{" "}
                <Link
                  href="/glossary/last-click-attribution"
                  className={linkClass}
                >
                  last-click
                </Link>
                , it should say last-click. If conversions are modelled, the
                platform must label which ones and disclose the method. What no
                platform should do is quietly blend observed and estimated data
                in the same figure.
              </p>
            </div>

            <div className="my-8 rounded-[14px] border-l-2 border-quote bg-warm-white p-6">
              <p className="text-[1.02rem] leading-[1.75] text-text-body">
                A stated, simple, complete model beats a sophisticated model
                applied to partial data — every time. Last-click over 100% of
                conversions is a defensible instrument. A{" "}
                <Link
                  href="/glossary/multi-touch-attribution"
                  className={linkClass}
                >
                  multi-touch model
                </Link>{" "}
                over the 40% of sessions that accepted cookies is a story about
                a sample, wearing the clothes of a measurement.
              </p>
            </div>

            <TestBox label="The test">
              <p>
                Ask: &ldquo;which numbers in this dashboard are observed and
                which are modelled?&rdquo; A vendor who can&rsquo;t answer
                immediately, or who describes it as proprietary, is telling you
                the answer is uncomfortable.
              </p>
            </TestBox>

            <ReqHeading n={10} id="req-10">
              Bot and invalid traffic filtering you can see
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">The failure it prevents</Chip>
              <p>
                <Link
                  href="/blog/ai-agent-traffic-analytics"
                  className={linkClass}
                >
                  Bot traffic has grown sharply with AI crawlers
                </Link>
                , and it does not distribute evenly — it concentrates on
                specific pages and specific sources, which means it
                doesn&rsquo;t inflate your totals harmlessly, it corrupts
                particular rows. Uncounted, it inflates a channel&rsquo;s
                sessions, deflates its conversion rate, and you optimise against
                noise.
              </p>
              <Chip tone="req">The requirement</Chip>
              <p>
                Automatic exclusion from reported metrics, and — this is the
                part usually missing — visibility into what was excluded and
                why. Filtering you can&rsquo;t inspect is indistinguishable from
                filtering that isn&rsquo;t happening.
              </p>
            </div>

            <TestBox label="The test">
              <p>Ask to see the bot traffic report. Not the setting. The report.</p>
            </TestBox>

            <ReqHeading n={11} id="req-11">
              Compliance by architecture, not by configuration
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">The failure it prevents</Chip>
              <p>
                The compliance risk in analytics is rarely a fine. It is the
                six-week delay while legal reviews a transfer impact assessment,
                the consent banner that costs you 60% of your data to satisfy a
                requirement the architecture created, and the migration you have
                to run again in two years when the legal ground moves.
              </p>
              <Chip tone="req">The requirement</Chip>
              <p>
                No{" "}
                <Link
                  href="/glossary/personal-data-in-analytics"
                  className={linkClass}
                >
                  personal data
                </Link>{" "}
                collected, no cookies, no device fingerprinting, no client-side
                storage. This is not a stricter version of compliance — it is a
                different mechanism. A platform that processes no personal data
                is largely outside the material scope of the rules, rather than
                compliant within them, and that difference is what removes the
                consent banner and with it the 60% loss.
              </p>
              <p>
                Then the operational layer: data hosted in your jurisdiction
                with the specific location named, a DPA included in the standard
                contract rather than negotiated, no transfers requiring
                supplementary measures, and{" "}
                <Link href="/security" className={linkClass}>
                  documentation your DPO can read
                </Link>{" "}
                without a call.
              </p>
              <p>
                Be equally sceptical in the other direction: check certification
                claims. ISO 27001 and SOC 2 are audited states with certificates
                and dates. &ldquo;Aligned with&rdquo; is not certified. Ask for
                the certificate.
              </p>
            </div>

            <TestBox label="The test">
              <p>
                Send the vendor&rsquo;s documentation to your DPO before the
                technical evaluation. If it can&rsquo;t survive that review, the
                feature comparison is academic.
              </p>
            </TestBox>

            <ReqHeading n={12} id="req-12">
              Your data stays yours, and the price is predictable
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">The failure it prevents</Chip>
              <p>
                Two slow failures. Lock-in: you discover at renewal that your
                three years of history cannot leave the platform in usable form,
                and the negotiation is over before it starts. And billing
                surprise: consumption pricing on events means your best month
                generates your worst invoice, and teams respond rationally by
                instrumenting less — which quietly caps the value of the whole
                system.
              </p>
              <Chip tone="req">The requirement</Chip>
              <p>
                Full historical export in an open format, on demand, without a
                support ticket. Stated retention, with a stated policy on what
                happens at contract end. Pricing tied to a metric you control
                and can forecast. And a setup cost measured in minutes, because
                a platform that requires a six-week implementation has already
                made switching away from it expensive — which is a business
                model, not an architecture.
              </p>
            </div>

            <TestBox label="The test">
              <p>
                Ask what happens to your data 30 days after you cancel. The
                speed and specificity of that answer tells you how the vendor
                thinks about ownership.
              </p>
            </TestBox>
          </div>

          <ScoreBands
            eyebrow="Score each requirement 0, 1 or 2 — 24 available"
            title="What the total actually tells you"
            bands={[
              {
                range: "20–24",
                verdict: "Genuinely enterprise-grade",
                detail: "Rare. Check the two lowest scores before you sign anyway.",
                tone: "req",
              },
              {
                range: "14–19",
                verdict: "Workable, with known gaps",
                detail:
                  "Write the gaps into the decision so nobody is surprised in month four.",
                tone: "test",
              },
              {
                range: "Below 14",
                verdict: "A reporting layer, not a platform",
                detail:
                  "Fine for a €50K/year business. Not for one spending €50K a month on acquisition.",
                tone: "risk",
              },
            ]}
          />

          <div className="max-w-[936px] mx-auto space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Two things worth saying plainly. Requirement 2 is not one of
              twelve — fail it and the rest are decoration: perfect real-time
              dashboards over 40% of reality are a faster route to a wrong
              decision. Score it first, and if a platform fails it, stop.
            </p>

            <p>
              And the price question is the wrong way round. The comparison is
              not €30K a year against €0 for GA4. It is €30K a year against the
              cost of one wrong budget reallocation made on incomplete data —
              which for a company spending €200K a month on acquisition is a
              rounding error against a single quarter of misdirected spend. The
              tool is not the expense. The decisions are.
            </p>

          <CommercialModule
            hook="Want to score Sealmetrics against your own requirements list? The demo walks the 24 requirements on your traffic, including the one we fail."
          />

            <h2 className={h2Class}>How Sealmetrics scores against this list</h2>

            <div className="rounded-[14px] border-l-2 border-amber bg-amber-soft/30 p-5">
              <Chip tone="test">Disclosure</Chip>
              <p className="mt-3 text-[0.95rem] leading-[1.75] text-text-body">
                We build one of these platforms, so the checklist above is
                opinionated. It encodes an architectural thesis — that complete
                observed data beats modelled data, and that privacy and
                completeness are the same requirement — which{" "}
                <Link href="/product" className={linkClass}>
                  Sealmetrics
                </Link>{" "}
                happens to share. A buyer whose priority is user-level product
                analytics, session replay or multi-touch modelling should
                reweight it, and we would score worse. Here is the scorecard
                anyway, with the point we lose.
              </p>
            </div>

            <ScrollableTable hint="Scroll for the score">
              <table className="w-full min-w-[760px] text-[0.82rem]">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-4 text-text-tertiary font-medium">
                      Requirement
                    </th>
                    <th className="text-left py-3 pr-4 text-text-tertiary font-medium">
                      The bar
                    </th>
                    <th className="text-left py-3 pr-4 text-text-tertiary font-medium">
                      Sealmetrics
                    </th>
                    <th className="text-left py-3 text-text-tertiary font-medium">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requirements.map((r) => (
                    <tr
                      key={r.n}
                      className="border-b border-warm-100 last:border-0"
                    >
                      <td className="py-4 pr-4 align-top text-text-primary font-medium">
                        <span className="font-mono text-[0.75rem] text-brand mr-1.5">
                          {String(r.n).padStart(2, "0")}
                        </span>
                        {r.title}
                      </td>
                      <td className="py-4 pr-4 align-top text-text-secondary">
                        {r.bar}
                      </td>
                      <td className="py-4 pr-4 align-top text-text-secondary">
                        {r.seal}
                      </td>
                      <td className="py-4 align-top">
                        <ScorePill score={r.score} />
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-warm-200">
                    <td
                      className="py-4 pr-4 text-text-primary font-medium"
                      colSpan={3}
                    >
                      Total
                    </td>
                    <td className="py-4 font-mono text-[0.95rem] text-text-primary font-semibold whitespace-nowrap">
                      23 / 24
                    </td>
                  </tr>
                </tbody>
              </table>
            </ScrollableTable>

            <div className="my-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[14px] border border-warm-100 bg-white p-6">
                <Chip tone="test">Where the point is lost</Chip>
                <p className="mt-3 text-[0.95rem] leading-[1.7] text-text-body">
                  Requirement 11 — Sealmetrics is not ISO 27001 or SOC 2
                  certified. Everything else in that row is met: no personal
                  data, EU-hosted in Dublin, DPA in the standard contract, no
                  supplementary transfer measures. But a certificate is an
                  audited state with a date on it, and we don&rsquo;t have one.
                  For procurement processes that gate on it, that is a hard stop,
                  and it should be said before the demo rather than discovered in
                  the security questionnaire.
                </p>
              </div>
              <div className="rounded-[14px] border border-warm-100 bg-white p-6">
                <Chip tone="risk">What it deliberately does not do</Chip>
                <p className="mt-3 text-[0.95rem] leading-[1.7] text-text-body">
                  It measures events in aggregate — counts at channel, campaign,
                  landing page, device and country level, without linking them to
                  an individual. That is the mechanism that makes requirement 2
                  possible, and it is also a real limitation: no user-level
                  analysis, no path reconstruction, no cohort or retention
                  analysis by user, no session replay, no heatmaps, and no
                  multi-touch attribution — last click only, permanently.
                </p>
                <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                  {[
                    "No user-level analysis",
                    "No cohorts or retention",
                    "No session replay",
                    "No heatmaps",
                    "No multi-touch",
                  ].map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-pink-soft px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.04em] text-[#8F332D]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p>
              If those are core to your use case, the honest answer is that you
              need a product analytics platform alongside, not instead.{" "}
              <Link href="/how-it-works" className={linkClass}>
                How the measurement actually works
              </Link>{" "}
              sets out the boundary in detail.
            </p>

            <h2 className={h2Class}>Frequently asked questions</h2>

            <div className="space-y-5">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-[12px] border border-warm-100 bg-warm-white p-5"
                >
                  <p className={`${strongClass} text-[1rem]`}>{faq.question}</p>
                  <p className="mt-2 text-[0.95rem] leading-[1.75] text-text-secondary">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <CommercialModule
            hook="The scorecard says 23/24 — and names the miss. See what the 23 look like on your own site before you shortlist."
          />

          <ComparisonLinks locale="en" />

          <RelatedReading currentSlug="best-web-analytics-tool" />
        </div>
      </article>
    </>
  );
}
