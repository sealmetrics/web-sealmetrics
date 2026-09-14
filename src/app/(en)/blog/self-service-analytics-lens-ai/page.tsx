import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { getAlternates } from "@/lib/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "How Sealmetrics Enables Self-Service Analytics",
  description:
    "Pointing an LLM at your data is easy. The hard part is trustworthy answers: complete cookieless data plus the Sealmetrics MCP, shipped as LENS AI.",
  openGraph: {
    title: "What It Takes to Make Self-Service Analytics Actually Work",
    description:
      "Complete cookieless data, a semantic MCP the model can't misread, an encoded analyst playbook, and architectural guardrails. How Sealmetrics ships self-service analytics as LENS AI.",
    type: "article",
    images: [ogImage("/blog/self-service-analytics-lens-ai/")],
    url: "https://sealmetrics.com/blog/self-service-analytics-lens-ai/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What It Takes to Make Self-Service Analytics Actually Work",
    description: "Complete cookieless data, a semantic MCP the model can't misread, an encoded analyst playbook, and architectural guardrails. How Sealmetrics ships self-service analytics as LENS AI.",
    images: [ogImage("/blog/self-service-analytics-lens-ai/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/self-service-analytics-lens-ai/",
    languages: getAlternates("/blog/self-service-analytics-lens-ai"),
  },
};

const stack = [
  {
    n: "04",
    label: "The question",
    body: "Plain language, from anyone — a CMO, a growth lead, an eCommerce manager. No SQL, no dashboard spelunking.",
    accent: "amber",
  },
  {
    n: "03",
    label: "The playbook",
    body: "Picks the method: which tools to call, in what order, and how to read the result — the routine a senior analyst runs on instinct.",
    accent: "neutral",
  },
  {
    n: "02",
    label: "Semantic tools (the MCP)",
    body: "Several dozen named, read-only tools. Each maps one business concept to one canonical metric. Nothing to misread.",
    accent: "neutral",
  },
  {
    n: "01",
    label: "Complete data (the foundation)",
    body: "Cookieless, first-party, no consent loss, never sampled. The input every answer inherits.",
    accent: "brand",
  },
];

const comparison = [
  {
    aspect: "How it answers",
    naive: "Writes SQL against raw tables it has never seen",
    mcp: "Calls a named tool with a fixed, documented contract",
  },
  {
    aspect: "Metric definitions",
    naive: "Whatever the model infers this time",
    mcp: "One canonical definition per concept, always the same",
  },
  {
    aspect: "Wrong-but-plausible answers",
    naive: "High — a staging column looks like a real one",
    mcp: "Structurally constrained — no raw columns in reach",
  },
  {
    aspect: "Personal data exposure",
    naive: "Possible — raw rows may carry PII",
    mcp: "Impossible — 0 PII by construction, rejected at the tool",
  },
  {
    aspect: "Attribution",
    naive: "Whatever the schema happens to encode",
    mcp: "Last-click, aggregate, without consent gaps",
  },
  {
    aspect: "Where the AI runs",
    naive: "Warehouse credentials handed to a model",
    mcp: "EU private AI, your own key, or hosted MCP",
  },
];

const faqs = [
  {
    question: "What is self-service analytics with LENS AI?",
    answer:
      "It is the ability for a non-technical person — a CMO, a growth lead, an eCommerce manager — to ask a question in plain language and get an answer directly from their own analytics, without writing SQL, hunting through dashboards, or filing a request with a data analyst. LENS AI is the umbrella brand for Sealmetrics AI; the Sealmetrics MCP exposes several dozen read-only tools that a model like Claude, ChatGPT or Cursor calls on the user's behalf to pull real, complete data.",
  },
  {
    question: "Why does pointing an LLM at GA4 usually produce wrong answers?",
    answer:
      "Two reasons. First, the data is incomplete — cookie-based tools miss most EU traffic after consent rejection, ad blockers and browser restrictions, so the model reasons confidently over a fraction of reality. Second, an open warehouse forces the model to guess which of hundreds of fields represents a business concept like 'revenue' or 'conversions,' which produces plausible but wrong numbers. Complete data plus a constrained, named tool surface removes both failure modes.",
  },
  {
    question: "Does LENS AI reconstruct customer journeys or do multi-touch attribution?",
    answer:
      "No. Sealmetrics measures aggregate, anonymous events and attributes revenue last-click at the event level. It does not identify individuals, does not stitch pageviews into per-user journeys, and does not run multi-touch models. The model can only answer questions the underlying aggregate data can answer — which is exactly what keeps the answers honest.",
  },
  {
    question: "Where does the AI run, and does my data leave the EU?",
    answer:
      "With LENS private AI, inference runs on an open-weight model (gpt-oss-120b) hosted by Scaleway in Paris, and your analytics data stays in Dublin — both in the EU. Your data is never shared with any third party and never used to train third-party models. You can also bring your own key (Anthropic, OpenAI or Gemini) or connect the hosted MCP at mcp.sealmetrics.com from your own client.",
  },
  {
    question: "Does this replace my data analyst?",
    answer:
      "It replaces the queue in front of your analyst — the steady stream of 'can you pull me the numbers for X' requests. It does not replace the judgment work: experiment design, causal reasoning, and strategy. The realistic outcome is that the analyst stops being a reporting bottleneck and spends their time on the questions that actually need a human.",
  },
];

const accentBar: Record<string, string> = {
  amber: "before:bg-amber",
  brand: "before:bg-brand",
  neutral: "before:bg-warm-200",
};

export default function Page() {
  const dates = postDates("self-service-analytics-lens-ai");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Self-Service Analytics With LENS AI" }]} />
      <JsonLd
        data={articleSchema({
          headline: "What It Takes to Make Self-Service Analytics Actually Work",
          description:
            "Complete cookieless data plus a semantic MCP lets anyone query their own analytics in plain language, without an analyst in the loop.",
          ...dates,
          url: "/blog/self-service-analytics-lens-ai",
          category: "AI & Analytics",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Self-Service Analytics With LENS AI", url: "/blog/self-service-analytics-lens-ai" }])} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              AI &amp; Analytics
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.15] mb-5">
              What It Takes to Make Self-Service Analytics <em>Actually Work</em>
            </h1>
            <p className="text-[1.2rem] leading-[1.6] text-text-secondary mb-6 max-w-[46ch]">
              Pointing an LLM at your data is the easy part. The hard part is making its answers trustworthy — and it&apos;s the part Sealmetrics built first, then shipped as LENS AI.
            </p>
            <PostByline
              {...dates}
              readTime="10 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Ask your analytics team why sales were soft last week. If the answer already lives in a dashboard, you have it in a minute. If it doesn&apos;t, you have a ticket — and a two-day wait — because the handful of people who can safely query the warehouse are the only ones who know which of its several <em>revenue</em> columns is the one that reconciles with finance.
            </p>
            <p>
              That is the self-service problem, and it has resisted every obvious fix. Lock the data behind curated dashboards and you get consistency at the cost of every question nobody anticipated. Open the warehouse to everyone and you get a hundred conflicting definitions of the same metric. Either way, the question that doesn&apos;t fit an existing chart ends up in a queue.
            </p>
            <p>
              Large language models look like the escape hatch: connect one, ask in plain English, get an answer. For writing code, that instinct is roughly right — you run the output and it either works or it doesn&apos;t. Analytics has no such safety net. A number that is subtly wrong looks exactly like a number that is right. Point a capable model at a raw warehouse and the most likely outcome is not insight; it is <em>confident, well-formatted, false precision</em> — the most dangerous kind of wrong, because nobody thinks to double-check it.
            </p>
            <p>
              So the real question isn&apos;t whether an LLM can answer analytics questions. It&apos;s what has to be true underneath for the answers to be worth trusting. There are four things, and they stack.
            </p>

            {/* ── Architecture diagram: the stack ── */}
            <figure className="my-10 not-prose">
              <div className="rounded-[16px] border border-warm-100 bg-warm-white overflow-hidden">
                {stack.map((layer, i) => (
                  <div
                    key={layer.n}
                    className={`relative flex gap-5 items-start p-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] ${accentBar[layer.accent]} ${i !== 0 ? "border-t border-warm-100" : ""}`}
                  >
                    <span className="font-mono text-[0.85rem] font-semibold text-text-tertiary pt-0.5 tabular-nums">{layer.n}</span>
                    <div>
                      <div className="font-serif text-[1.05rem] font-medium text-text-primary mb-1">{layer.label}</div>
                      <div className="text-[0.9rem] leading-[1.6] text-text-secondary">{layer.body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <figcaption className="mt-3 text-[0.8rem] text-text-tertiary text-center">
                A question travels down the stack; a traceable answer comes back up. Get any layer wrong and the answer is only as good as the weakest one.
              </figcaption>
            </figure>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Layer 01 — Complete data, or none of the rest matters
            </h2>
            <p>
              Self-service analytics is a data-quality problem before it is an AI problem. If your measurement layer only captures the visitors who accepted a cookie banner, every answer built on top of it inherits that bias — and no amount of prompting fixes a dataset that was never collected. A model reasoning over partial data isn&apos;t wrong because it&apos;s a bad model; it&apos;s wrong because it&apos;s reasoning over a fraction of reality and has no way to know it.
            </p>
            <p>
              Sealmetrics starts here. <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless, first-party measurement</Link> counts events anonymously on your own domain: no cookies to reject, no third-party endpoint for ad blockers to target, nothing on the device to expire, and no sampling at volume. When the model asks &ldquo;how many conversions from paid search last week,&rdquo; the number describes the whole of your traffic — not the compliant remainder of it. If you want the arithmetic of how the alternative erodes, we walked through why <Link href="/blog/why-ga4-shows-13pct-eu-traffic" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GA4 ends up showing a sliver of EU traffic</Link>.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Layer 02 — A surface the model can&apos;t misread
            </h2>
            <p>
              The second failure mode — the model guessing which field means what — is solved by not giving it a warehouse to guess about. The Sealmetrics MCP (Model Context Protocol) server doesn&apos;t hand the model a SQL prompt. It exposes several dozen named, read-only tools, and each maps a single business concept to a single canonical metric with a fixed contract: <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_overview</code> for headline KPIs, <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_channels</code> and <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_campaigns</code> for acquisition, <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_funnel</code> and <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_conversions</code> for outcomes, <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_landing_pages</code> for entry performance.
            </p>
            <p>
              When the model wants revenue by country, there is one tool for it and one definition behind it. It cannot accidentally sum a staging column, because there is no staging column within reach — only the metric your team actually agreed on. This is the same idea a good data org implements internally as a semantic layer: force every question through a small set of governed definitions before it touches raw data. The difference is that here it ships as the product. The tool contract <em>is</em> the guardrail — you don&apos;t build or maintain it.
            </p>

            {/* ── Comparison table ── */}
            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full text-[0.85rem] border-collapse">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-6 text-text-tertiary font-medium w-[26%]"> </th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">LLM + raw warehouse</th>
                    <th className="text-left py-3 pl-4 text-brand font-medium">Sealmetrics MCP</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.aspect} className="border-b border-warm-100 last:border-0 align-top">
                      <td className="py-3 pr-6 text-text-body font-medium">{row.aspect}</td>
                      <td className="py-3 px-4 text-text-secondary">{row.naive}</td>
                      <td className="py-3 pl-4 text-text-primary">{row.mcp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CommercialModule
              hook="Layers 01 and 02 are the foundation: consent-independent events in a schema the model cannot misread. See LENS read your own traffic that way in a demo."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Layer 03 — A senior analyst&apos;s workflow, encoded
            </h2>
            <p>
              Naming the metrics is half the job. The other half is knowing what to do with them — the sequence a good analyst runs almost without thinking when someone asks &ldquo;why did sales drop.&rdquo; Sealmetrics encodes that sequence as a marketing playbook the model invokes on its own. Ask a diagnostic question and it doesn&apos;t improvise; it pulls the playbook, which hands it a <em>method</em> rather than an answer: start with the overview against the previous period, decompose by channel, isolate the campaigns and landing pages that moved, separate traffic from conversion rate, and only then form a diagnosis with a prioritized action list. Then it executes that method by calling the data tools in order.
            </p>

            {/* ── Worked transcript: dark slab ── */}
            <figure className="my-10 not-prose">
              <div className="relative rounded-[20px] bg-ink text-warm-50 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.30] pointer-events-none"
                  style={{ background: "radial-gradient(120% 90% at 85% 0%, rgba(45,139,109,0.5), transparent 60%)" }}
                />
                <div className="relative p-7 sm:p-9">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-warm-50/50">eCommerce · a real question, start to finish</span>
                  </div>

                  <p className="text-[0.95rem] leading-[1.6] mb-6">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-amber mr-2">You</span>
                    &ldquo;Sales look soft this week versus last. What happened?&rdquo;
                  </p>

                  <div className="font-mono text-[0.8rem] leading-[1.9] text-warm-50/85 space-y-1 border-l border-warm-50/15 pl-4 mb-6">
                    <div><span className="text-brand">→ get_overview</span> · this_week vs previous <span className="text-warm-50/45">— entrances flat, conversions down</span></div>
                    <div><span className="text-brand">→ get_channels</span> <span className="text-warm-50/45">— paid search steady; direct conversions dropped</span></div>
                    <div><span className="text-brand">→ get_landing_pages</span> <span className="text-warm-50/45">— one checkout page&apos;s conversion rate fell by a third</span></div>
                    <div><span className="text-brand">→ get_conversions</span> <span className="text-warm-50/45">— revenue loss concentrated in a single category</span></div>
                  </div>

                  <p className="text-[0.95rem] leading-[1.65]">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-brand mr-2">LENS AI</span>
                    Traffic held — this is a conversion problem, not an acquisition one. It&apos;s isolated to your checkout page, where the rate fell sharply mid-week and dragged direct conversions with it while paid search was unaffected. That pattern points to something on the page (a checkout regression or a stock issue), not your media spend. Start there; the budget isn&apos;t the cause.
                  </p>
                </div>
              </div>
              <figcaption className="mt-3 text-[0.8rem] text-text-tertiary text-center">
                Illustrative worked example. The tool calls and their order are real; the movements are representative. No SQL was written, no dashboard opened, no analyst interrupted.
              </figcaption>
            </figure>

            <p>
              The method travels to any vertical — only the vocabulary changes. Here is the same loop for a hotel group asking about direct bookings instead of checkout conversions:
            </p>

            {/* ── Worked transcript: hotels (dark slab) ── */}
            <figure className="my-10 not-prose">
              <div className="relative rounded-[20px] bg-ink text-warm-50 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.30] pointer-events-none"
                  style={{ background: "radial-gradient(120% 90% at 85% 0%, rgba(232,184,75,0.4), transparent 60%)" }}
                />
                <div className="relative p-7 sm:p-9">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-warm-50/50">Hotels · the same loop, direct bookings</span>
                  </div>

                  <p className="text-[0.95rem] leading-[1.6] mb-6">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-amber mr-2">You</span>
                    &ldquo;Direct bookings are down week over week. Is it our channels or the site?&rdquo;
                  </p>

                  <div className="font-mono text-[0.8rem] leading-[1.9] text-warm-50/85 space-y-1 border-l border-warm-50/15 pl-4 mb-6">
                    <div><span className="text-brand">→ get_overview</span> · this_week vs previous <span className="text-warm-50/45">— sessions steady, bookings down</span></div>
                    <div><span className="text-brand">→ get_channels</span> <span className="text-warm-50/45">— metasearch and paid referrals held; direct softened</span></div>
                    <div><span className="text-brand">→ get_landing_pages</span> <span className="text-warm-50/45">— one property&apos;s booking-engine step lost conversion</span></div>
                    <div><span className="text-brand">→ get_conversions</span> <span className="text-warm-50/45">— revenue loss concentrated in that property&apos;s rooms</span></div>
                  </div>

                  <p className="text-[0.95rem] leading-[1.65]">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-brand mr-2">LENS AI</span>
                    Demand held — metasearch and paid referrals are steady, so this isn&apos;t an acquisition problem. The drop is concentrated on one property&apos;s booking page, where the conversion rate fell mid-week while the rest of the portfolio held. That points to something in that property&apos;s booking flow — rate availability, inventory, or a broken step — not your channel mix. Check that booking engine first.
                  </p>
                </div>
              </div>
              <figcaption className="mt-3 text-[0.8rem] text-text-tertiary text-center">
                Illustrative. Same method, a hotel portfolio measuring direct bookings — attributed last-click, in aggregate, with no per-guest journey.
              </figcaption>
            </figure>

            <p>
              The output reads like a junior analyst&apos;s first pass — because it followed a senior analyst&apos;s checklist. That is the work being automated: not the analyst&apos;s judgment, but the retrieval-and-first-pass layer that consumed most of their week. It is the same shift teams are seeing across the stack as <Link href="/blog/ai-agent-traffic-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">AI agents move into the analytics workflow</Link>.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Layer 04 — Why the answers stay honest
            </h2>
            <p>
              Self-service is dangerous when it lets people generate authoritative-looking numbers no one can defend. Four things keep it grounded, and all four are structural rather than promised:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li><strong>Zero PII by construction.</strong> The event-level tools validate against personal data and reject it. The model cannot surface a person because a person was never stored.</li>
              <li><strong>Aggregate-only measurement.</strong> No per-user journeys, no cross-session identifiers, no multi-touch models — so the model cannot fabricate one. It answers only what aggregate, anonymous counts can answer.</li>
              <li><strong>One definition per concept.</strong> Because each tool carries a single canonical metric, two people asking the same thing in different words get the same number. Consistency is enforced by the surface, not by discipline.</li>
              <li><strong>Provenance you can trace.</strong> Every answer resolves to a named tool over an explicit period in your account timezone — so you can always see which metric produced it, and attribution is <Link href="/glossary/revenue-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">last-click at the event level</Link>.</li>
            </ul>
            <p>
              And the model runs where your compliance team wants it to. With <Link href="/product" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">LENS private AI</Link>, inference runs on an open-weight model (gpt-oss-120b) hosted by Scaleway in Paris while your analytics data stays in Dublin — both EU, never shared, never used to train third-party models. Prefer your own stack? Bring your own Anthropic, OpenAI or Gemini key, or connect the hosted MCP at <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">mcp.sealmetrics.com</code> from any compatible client. The data foundation is identical either way; you&apos;re only choosing the algorithm.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              What it does not replace — on purpose
            </h2>
            <p>
              It is worth being precise about the boundary. LENS AI automates the reporting queue: the &ldquo;pull me the numbers,&rdquo; &ldquo;why did this move,&rdquo; &ldquo;how did the campaign do&rdquo; questions that make up the bulk of inbound analyst requests. It does not design your experiments, reason about causality beyond what the data supports, or set strategy — that judgment stays human, and freeing up time for it is the entire point.
            </p>
            <p>
              It also won&apos;t reconstruct a customer journey or split credit across touchpoints, because Sealmetrics doesn&apos;t collect the per-user data those reports require. If your model of the world depends on stitching one person&apos;s path across sessions, this is the wrong tool, and honestly so. What you get instead is a defensible, complete, aggregate picture that a non-analyst can interrogate directly.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Getting started
            </h2>
            <p>
              The lightest possible start is the open LENS demo at <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">lens-lite.sealmetrics.com</code>, which runs the whole self-service loop on sample data — ask it to boost ROAS, find growth, or cut waste, and watch it work through the method. When you&apos;re ready with real data, connect the MCP at <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">mcp.sealmetrics.com</code> from Claude, ChatGPT, Cursor or Claude Code; the same server can even provision a fresh site from the chat, so the tool that answers your questions is also the one that sets you up. The measurement foundation is covered end-to-end on the <Link href="/how-it-works" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">how it works</Link> page.
            </p>
            <p>
              The upshot is simple, and it&apos;s the through-line of all four layers: self-service analytics doesn&apos;t start with the model. It starts with data complete enough to trust and a surface constrained enough that the model can&apos;t misread it. Get those right — as Sealmetrics does — and the analyst&apos;s queue mostly answers itself.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Questions teams ask
            </h2>
            {faqs.map((f) => (
              <div key={f.question} className="mt-6">
                <h3 className="font-serif text-[1.15rem] font-medium text-text-primary mb-2">{f.question}</h3>
                <p className="text-[0.95rem]">{f.answer}</p>
              </div>
            ))}
          </div>

          <CommercialModule
            hook="LENS is a senior analyst's workflow encoded on top of complete data — gpt-oss-120b on Scaleway Paris, every answer grounded in your own numbers. Try it live."
          />

          <RelatedReading currentSlug="self-service-analytics-lens-ai" />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Go deeper
            </h2>
            <ul className="space-y-4">
              <li>
                <Link href="/product" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Sealmetrics product &amp; LENS AI</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">The measurement platform, the private-AI layer, and the one-minute MCP setup.</p>
              </li>
              <li>
                <Link href="/how-it-works" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">How Sealmetrics works</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">First-party, cookieless collection and why the numbers reconcile.</p>
              </li>
              <li>
                <Link href="/ai-analytics" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">AI Analytics — the pillar</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Why AI analytics is only as trustworthy as the data beneath it — and the EU private-AI layer.</p>
              </li>
              <li>
                <Link href="/glossary/cookieless-analytics" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless Analytics — definition</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">The concept the whole self-service story depends on.</p>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
