import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

const URL = "/blog/self-service-analytics-for-marketing-teams";

export const metadata: Metadata = {
  title: "Self-Service Analytics for Marketing Teams",
  description: "A marketing team gets a correct answer without opening a ticket. Complete cookieless data, 47 named tools instead of SQL, and BYOK or private AI.",
  openGraph: {
    title: "Self-Service Analytics for Marketing Teams: How Sealmetrics Does It",
    description:
      "Three moves: measure traffic without depending on consent, expose it to an AI agent as 47 named read-only tools, and let the customer choose BYOK or an isolated private instance.",
    type: "article",
    images: [ogImage("/blog/self-service-analytics-for-marketing-teams/")],
    url: "https://sealmetrics.com/blog/self-service-analytics-for-marketing-teams/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Self-Service Analytics for Marketing Teams: How Sealmetrics Does It",
    description: "Three moves: measure traffic without depending on consent, expose it to an AI agent as 47 named read-only tools, and let the customer choose BYOK or an isolated private instance.",
    images: [ogImage("/blog/self-service-analytics-for-marketing-teams/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/self-service-analytics-for-marketing-teams/",
  },
};

const preconditions = [
  {
    aspect: "Share of EU traffic measured",
    them: "Consented visitors only",
    us: "Not reduced by consent",
  },
  {
    aspect: "Metric definitions",
    them: "Multiple tables, multiple revenue columns",
    us: "One canonical definition per concept",
  },
  {
    aspect: "Agent access method",
    them: "Raw SQL over the warehouse",
    us: "47 named, read-only tools",
  },
  {
    aspect: "Bot and AI-agent traffic",
    them: "Mixed into human sessions",
    us: "Detected and reported separately",
  },
  {
    aspect: "Data residency",
    them: "Varies by configuration",
    us: "EU-hosted, Dublin",
  },
];

const questions = [
  {
    q: "Why did conversions drop last week?",
    calls: "Overview, channels, campaigns, funnel, bot stats",
    back: "The channel and step where the drop started, with the delta",
  },
  {
    q: "Which campaign brings the best customers, not the most clicks?",
    calls: "Campaigns, conversions, microconversions",
    back: "Campaign ranking by converted revenue, not by sessions",
  },
  {
    q: "Where am I losing money?",
    calls: "Landing pages, funnel, terms, top sources",
    back: "Spend against measured conversions per source",
  },
  {
    q: "Is my tracking set up correctly?",
    calls: "Setup status, verify setup, microconversion types",
    back: "The events that exist versus the events that should",
  },
  {
    q: "How did Germany do versus France in Q2?",
    calls: "Countries, segments, conversions",
    back: "Both markets on the same canonical definition",
  },
];

const deployments = [
  {
    shape: "BYOK — bring your own key",
    key: "The customer, on their own Anthropic, OpenAI or Gemini account",
    where: "The customer's own model provider account",
    plan: "Growth",
  },
  {
    shape: "Managed Private AI",
    key: "No key needed · 5M tokens included",
    where: "Sealmetrics-managed private instance",
    plan: "Scale",
  },
  {
    shape: "Exclusive Private AI",
    key: "No key needed",
    where: "Dedicated, non-shared instance with isolated processing",
    plan: "Enterprise",
  },
];

const FAQ = [
  {
    question: "What is self-service analytics?",
    answer:
      "Self-service analytics is when a business user gets a correct answer to a data question without a data analyst in the loop. It requires three things: complete data, one definition per metric, and a constrained interface the user can query in plain language.",
  },
  {
    question: "Can ChatGPT or Claude read my analytics data?",
    answer:
      "Yes, through an MCP server. Sealmetrics exposes 47 named read-only tools to any MCP-compatible assistant, including Claude Desktop, Claude Code, ChatGPT and Cursor. The assistant calls named functions rather than writing SQL against a warehouse.",
  },
  {
    question: "What is BYOK in analytics?",
    answer:
      "BYOK means bring your own key. The customer connects their own Anthropic, OpenAI or Gemini account, so inference runs under their existing contract, retention settings and data processing agreement. Sealmetrics offers BYOK from the Growth plan.",
  },
  {
    question: "Is AI analytics GDPR compliant?",
    answer:
      "It depends on what the AI reads. Sealmetrics is consentless by architecture and EU-hosted in Dublin, so the underlying data was never personal data. The MCP server runs locally and stores no analytics data on the machine, authenticating over an API key the customer generates from their own dashboard.",
  },
  {
    question: "Do I need a data team to use it?",
    answer:
      "No. The free Agentic Package is provisioned by the agent itself — account, tracking pixel and first report from a single prompt in Claude or Codex, with documentation only and no implementation project.",
  },
  {
    question: "How is this different from asking GA4's AI features?",
    answer:
      "The difference is the input, not the model. GA4 answers from consented traffic only. Sealmetrics answers from human traffic measured without consent gaps, which is why its numbers reconcile with Shopify and the CRM instead of sitting 40-60% below them.",
  },
];

export default function Page() {
  const dates = postDates("self-service-analytics-for-marketing-teams");

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Blog", href: "/blog" }, { label: "Self-Service Analytics for Marketing Teams" }]}
      />
      <JsonLd
        data={articleSchema({
          headline: "Self-Service Analytics for Marketing Teams: How Sealmetrics Does It",
          description:
            "Complete cookieless data, 47 named read-only tools instead of raw SQL, and a choice between BYOK and an isolated private AI instance. The reporting queue disappears; the definition of revenue does not.",
          ...dates,
          url: URL,
          category: "AI & Analytics",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", url: "/blog" },
          { name: "Self-Service Analytics for Marketing Teams", url: URL },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQ, URL)} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              AI &amp; Analytics
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.15] mb-5">
              Self-service analytics for marketing teams: <em>how Sealmetrics does it</em>
            </h1>
            <p className="text-[1.2rem] leading-[1.6] text-text-secondary mb-6 max-w-[46ch]">
              The reporting queue disappears. The definition of &ldquo;revenue&rdquo; does not.
            </p>
            <PostByline
              {...dates}
              readTime="8 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            {/* ── Answer-first summary ── */}
            <div className="rounded-[16px] border border-warm-100 bg-warm-white p-7 not-prose">
              <p className="text-[1rem] leading-[1.75] text-text-body">
                Self-service analytics means a marketing team gets a correct answer to a business
                question without opening a ticket for the data team. At Sealmetrics it works in
                three moves: the platform measures traffic without cookies or consent, it
                exposes that data to an AI agent as 47 named, read-only tools instead of raw SQL,
                and the customer chooses whether that agent runs on their own model key (BYOK) or on
                an isolated private instance.
              </p>
            </div>

            <p>
              Most self-service analytics projects fail before the AI is even installed. They fail
              on the data.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              What has to be true of the data before an AI agent can answer anything?
            </h2>
            <p>
              The data has to be complete, and it has to have one definition per metric.
            </p>
            <p>
              Completeness is where consent-based analytics breaks. In the EU, cookie-based tools
              only measure the share of visitors who accept the banner. Sealmetrics measures visits
              and sales whether or not the banner is accepted, with{" "}
              <Link
                href="/glossary/cookieless-analytics"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                cookieless, first-party measurement
              </Link>
              , which removes the 40–60% blind spot that consent-gated setups
              carry.
            </p>
            <p>
              This is not a reporting detail. An agent that reads a partial dataset does not say
              &ldquo;I only have 13% of your traffic.&rdquo; It answers confidently with the 13% it
              has. The output is well formatted, precise-looking and wrong. Bad data plus a good
              model produces false precision faster than a spreadsheet ever could — and the
              arithmetic of how that 13% happens is worked through in{" "}
              <Link
                href="/blog/why-ga4-shows-13pct-eu-traffic"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                why GA4 ends up showing a sliver of EU traffic
              </Link>
              .
            </p>
            <p>
              Single definition is the second condition. If three tables in a warehouse each hold a
              column called <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">revenue</code>,
              an agent will pick one. It will not tell you it guessed. Sealmetrics ships one
              canonical definition per business concept, so &ldquo;conversions&rdquo; resolves to the
              same number in the dashboard, in the API, in BigQuery and in the agent&apos;s answer.
            </p>

            {/* ── Preconditions table ── */}
            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full text-[0.85rem] border-collapse">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-6 text-text-tertiary font-medium w-[26%]">
                      Precondition
                    </th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">
                      Consent-gated stack (GA4 + banner)
                    </th>
                    <th className="text-left py-3 pl-4 text-brand font-medium">Sealmetrics</th>
                  </tr>
                </thead>
                <tbody>
                  {preconditions.map((row) => (
                    <tr key={row.aspect} className="border-b border-warm-100 last:border-0 align-top">
                      <td className="py-3 pr-6 text-text-body font-medium">{row.aspect}</td>
                      <td className="py-3 px-4 text-text-secondary">{row.them}</td>
                      <td className="py-3 pl-4 text-text-primary">{row.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Why do most self-service analytics projects fail?
            </h2>
            <p>
              Because they connect a language model directly to a data warehouse and call it
              self-service.
            </p>
            <p>
              An open warehouse gives the model a search space of thousands of tables and millions
              of column combinations. Three failure modes follow. The model cannot map a business
              phrase to a specific entity — &ldquo;active users&rdquo; has four defensible meanings
              and the model picks one silently. The model works from a schema that changed last
              quarter and no longer matches the transformation graph. Or the correct table exists,
              and the model never finds it.
            </p>
            <p>
              Sealmetrics removes the search space instead of trying to teach the model to navigate
              it. The agent does not write SQL. It calls named functions:{" "}
              <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_top_channels</code>,{" "}
              <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_funnel</code>,{" "}
              <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_conversions</code>,{" "}
              <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_campaigns</code>,{" "}
              <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_bot_stats</code>.
              Each function maps one business concept to one canonical metric. There is no second
              revenue column to guess between. The full architecture behind that constraint — and
              why it has four layers rather than one — is covered in{" "}
              <Link
                href="/blog/self-service-analytics-lens-ai"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                what it takes to make self-service analytics actually work
              </Link>
              .
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              What can a marketing team actually ask?
            </h2>
            <p>
              The 47 tools cover sites, traffic and campaigns, page performance and content groups,
              conversions and microconversions, audience segmentation by geography, device, browser
              and OS, event-level raw data (capped at 31-day ranges), funnel analysis, bot
              detection, custom properties and segments, alerts and webhooks, and tracking code
              generation.
            </p>
            <p>In practice that turns into questions a CMO asks out loud:</p>

            {/* ── Questions table ── */}
            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full text-[0.85rem] border-collapse">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-6 text-text-tertiary font-medium w-[34%]">
                      Question asked in plain language
                    </th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">
                      What the agent calls
                    </th>
                    <th className="text-left py-3 pl-4 text-brand font-medium">What comes back</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((row) => (
                    <tr key={row.q} className="border-b border-warm-100 last:border-0 align-top">
                      <td className="py-3 pr-6 text-text-body font-medium">&ldquo;{row.q}&rdquo;</td>
                      <td className="py-3 px-4 text-text-secondary">{row.calls}</td>
                      <td className="py-3 pl-4 text-text-primary">{row.back}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              The agent answers in the surface the team already uses — Claude Desktop, Claude Code,
              or any MCP-compatible assistant. Nobody learns a new BI tool.
            </p>

            <CommercialModule
              hook="What would your team ask first if analytics answered in plain language? Bring that question to a demo — LENS answers it on your own data."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Is the data safe if an AI agent reads it?
            </h2>
            <p>
              This is the objection that decides the deal, so Sealmetrics answers it with
              architecture rather than a promise. There are three deployment shapes, and the
              customer picks one.
            </p>

            {/* ── Deployment table ── */}
            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full text-[0.85rem] border-collapse">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-6 text-text-tertiary font-medium w-[24%]">
                      Deployment
                    </th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">
                      Who holds the model key
                    </th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">
                      Where inference runs
                    </th>
                    <th className="text-left py-3 pl-4 text-brand font-medium">Plan</th>
                  </tr>
                </thead>
                <tbody>
                  {deployments.map((row) => (
                    <tr key={row.shape} className="border-b border-warm-100 last:border-0 align-top">
                      <td className="py-3 pr-6 text-text-body font-medium">{row.shape}</td>
                      <td className="py-3 px-4 text-text-secondary">{row.key}</td>
                      <td className="py-3 px-4 text-text-secondary">{row.where}</td>
                      <td className="py-3 pl-4 font-mono text-[0.8rem] text-text-primary">{row.plan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              BYOK matters for a specific reason. The model provider relationship stays with the
              customer, which means their existing DPA, their retention settings and their regional
              routing apply unchanged. Legal does not have to approve a new subprocessor to turn
              analytics into a conversation. For teams that would rather not manage a key at all,
              Scale ships a managed private instance; Enterprise ships one that is exclusive and
              isolated. The trade-off between the two is laid out in{" "}
              <Link
                href="/blog/seal-ai-vs-bring-your-own-key"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                private AI versus bring your own key
              </Link>
              .
            </p>
            <p>
              Two more constraints hold regardless of tier. The MCP server runs locally and stores
              no analytics data on the machine, authenticating over an{" "}
              <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">X-API-Key</code>{" "}
              header the customer generates from their own dashboard. And the data underneath was
              never personal data to begin with — Sealmetrics is consentless by architecture,{" "}
              <Link
                href="/security"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                EU-hosted in Dublin
              </Link>
              .
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              What does this actually save?
            </h2>
            <p>Two things: the wait, and the reconciliation.</p>
            <p>
              The wait is the reporting queue. Every &ldquo;can you pull the numbers for the board
              deck&rdquo; request that used to cost an analyst half a day now resolves in the time it
              takes to type the question. Data is real-time under two minutes, so the answer is not
              yesterday&apos;s.
            </p>
            <p>
              The reconciliation is the meeting nobody schedules and everybody attends: the one where
              marketing&apos;s number, finance&apos;s number and Shopify&apos;s number disagree and
              the first forty minutes go to deciding which one is real.{" "}
              <Link
                href="/case-studies/palladium-hotel-group"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Palladium Hotel Group
              </Link>{" "}
              found that 40% of its inbound traffic carried no source or medium attribution at all in
              the previous stack;{" "}
              <Link
                href="/case-studies/dreamplace-hotels"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Dreamplace Hotels
              </Link>{" "}
              measures roughly 30% more traffic than Google Analytics reports. When the analytics
              number and the CRM number converge, the argument ends and the meeting is about the
              decision instead.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              How does it scale as we add sites and markets?
            </h2>
            <p>
              The cost of the tenth site is the marginal cost of one more question, not one more
              analyst.
            </p>
            <p>
              The free Agentic Package covers unlimited sites, users and accounts up to 1M human
              events in total — a one-time allowance, not a monthly one — and it is provisioned by
              the agent itself: Claude or Codex creates the account, generates the tracking pixel and
              builds the first report from a single prompt. Paid tiers keep unlimited sites and add
              MCP plus BigQuery export and full API access.{" "}
              <Link
                href="/blog/ai-agent-traffic-analytics"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                AI agent traffic is tracked separately
              </Link>{" "}
              and does not count against the event limit.
            </p>
            <p>
              That is what makes growth scalable rather than linear. A team that adds Germany, France
              and Italy does not add three reporting backlogs. It adds three sites to the same
              canonical model and asks the same questions with a country filter — with revenue
              attributed{" "}
              <Link
                href="/glossary/last-click-attribution"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                last-click, in aggregate
              </Link>
              , on the same definition in every market.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              How do I start?
            </h2>
            <p>
              Start with one property and the free tier. Provision it through Claude or Codex, let
              the agent generate the pixel, verify the setup with{" "}
              <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">verify_setup</code>,
              and ask the three questions your team asks most often. Compare the answers to what your
              current stack reports. The gap between the two numbers is the size of the problem.
            </p>

            {/* ── CTA: dark slab ── */}
            <div className="relative rounded-[20px] bg-ink text-warm-50 overflow-hidden my-10 not-prose">
              <div
                className="absolute inset-0 opacity-[0.30] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(120% 90% at 85% 0%, rgba(45,139,109,0.5), transparent 60%)",
                }}
              />
              <div className="relative p-7 sm:p-9">
                <p className="font-serif text-[1.35rem] font-medium leading-[1.35] mb-3">
                  Size the blind spot before you size the licence.
                </p>
                <p className="text-[0.95rem] leading-[1.65] text-warm-50/80 mb-6 max-w-[52ch]">
                  The free Agentic Package runs the whole loop on your own traffic up to 1M human
                  events. If you would rather quantify the gap first, the calculator does it from
                  your consent rate and your paid spend.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center rounded-[4px] bg-warm-50 text-ink px-5 py-2.5 text-[0.85rem] font-medium no-underline hover:bg-white transition-colors"
                  >
                    See Plans and Private AI Tiers
                  </Link>
                  <Link
                    href="/data-loss-calculator"
                    className="inline-flex items-center rounded-[4px] border border-warm-50/25 px-5 py-2.5 text-[0.85rem] font-medium text-warm-50 no-underline hover:border-warm-50/60 transition-colors"
                  >
                    Calculate Your Data Loss
                  </Link>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Sources and limitations
            </h2>
            <p>
              Figures in this article come from Sealmetrics published material: the product and
              customer figures from sealmetrics.com, the tool inventory and authentication model from{" "}
              <a
                href="https://docs.sealmetrics.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                docs.sealmetrics.com
              </a>
              , and the architectural rationale from{" "}
              <Link
                href="/blog/self-service-analytics-lens-ai"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                What It Takes to Make Self-Service Analytics Actually Work
              </Link>
              . Customer figures (Palladium, Dreamplace) are single-account results and are not
              presented as an average across the customer base.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Questions teams ask
            </h2>
            {FAQ.map((f) => (
              <div key={f.question} className="mt-6">
                <h3 className="font-serif text-[1.15rem] font-medium text-text-primary mb-2">
                  {f.question}
                </h3>
                <p className="text-[0.95rem]">{f.answer}</p>
              </div>
            ))}
          </div>

          <CommercialModule
            hook="Self-service only works when the data underneath is complete. See LENS answer marketing questions on traffic measured without consent, not a consented sample."
          />

          <RelatedReading currentSlug="self-service-analytics-for-marketing-teams" />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Go deeper
            </h2>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/ai-analytics"
                  className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
                >
                  AI Analytics — the pillar
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">
                  The MCP server, the named-tool surface, and how to connect it from your assistant.
                </p>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
                >
                  Plans and Private AI tiers
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">
                  Free Agentic Package, BYOK from Growth, managed Private AI on Scale, exclusive on
                  Enterprise.
                </p>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
                >
                  How Sealmetrics works
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">
                  First-party, cookieless collection and why the numbers reconcile with the CRM.
                </p>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
