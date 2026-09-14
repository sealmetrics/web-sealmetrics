import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import { breadcrumbSchema, faqPageSchema, howToSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { LogosStrip } from "@/components/sections/v3/HomeV3";
import { FaqAccordionV3 } from "@/components/sections/v3/FaqAccordionV3";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";
import { HowToSteps } from "@/components/ui/HowToSteps";
import { mcpSetupSteps } from "@/lib/content/mcp-setup";

export const metadata: Metadata = {
  title: "AI Analytics — Private AI on Complete, EU-Hosted Data",
  description:
    "AI analytics you can trust: complete cookieless data, a semantic MCP and private EU-hosted AI. Ask Claude or ChatGPT revenue questions — no cookies, no PII.",
  openGraph: {
    title: "AI Analytics — Private AI on Complete, EU-Hosted Data",
    description:
      "Point an LLM at incomplete GA4 data and it invents answers. Sealmetrics is AI analytics done right: complete data, a semantic MCP, and private AI in the EU.",
    type: "website",
    images: [ogImage("/ai-analytics/")],
    url: "https://sealmetrics.com/ai-analytics/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "AI Analytics — Private AI on Complete, EU-Hosted Data",
    description: "Complete data. A semantic MCP. Private AI in the EU. Ask your analytics in plain language.",
    images: [ogImage("/ai-analytics/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/ai-analytics/",
    languages: getAlternates("/ai-analytics"),
  },
  keywords: [
    "ai analytics",
    "ai-ready analytics",
    "private ai analytics",
    "gdpr ai analytics",
    "mcp analytics",
    "chatgpt analytics",
    "claude analytics",
    "ai agent analytics",
    "cookieless ai analytics",
    "eu ai analytics",
  ],
};

const faqs = [
  {
    q: "What is AI analytics?",
    a: "AI analytics is the ability to query your web and revenue data in plain language and get an answer directly — no SQL, no dashboard building, no analyst in the queue. A large language model like Claude or ChatGPT reads your analytics through a connector and returns the number, the diagnosis, or the next action. The catch is that the answer is only as trustworthy as the data underneath: point an LLM at incomplete, cookie-based analytics and it will produce confident, well-formatted, wrong answers. Sealmetrics is AI analytics built on complete cookieless data, so the answers aren't missing the visitors who reject consent.",
  },
  {
    q: "Is there a GDPR-compliant AI analytics tool?",
    a: "Yes. Sealmetrics is AI analytics that is GDPR-compliant by architecture: the measurement layer is cookieless and processes zero personal data, and the AI layer runs on private, EU-hosted infrastructure. With LENS private AI, inference runs on an open-weight model (gpt-oss-120b, Apache 2.0) hosted by Scaleway in Paris, while your analytics data stays in Dublin — both in the EU. Your data never leaves the EU, is never shared with any company, and is never used to train third-party models. There is no consent banner and no personal data in play.",
  },
  {
    q: "Can I connect ChatGPT or Claude to my analytics?",
    a: "Yes. Sealmetrics ships a Model Context Protocol (MCP) server with 47 read-only tools. Connect it from Claude, ChatGPT, Cursor or Claude Code at mcp.sealmetrics.com and ask your analytics questions directly — revenue by channel, conversions, landing-page performance, campaign waste. Each tool maps one business concept to one canonical metric, so the model calls a documented contract instead of guessing at raw columns. You can use Sealmetrics private AI, or bring your own Anthropic, OpenAI, Gemini or DeepSeek key — you are choosing the algorithm, not the data.",
  },
  {
    q: "What is private AI for analytics?",
    a: "Private AI means the language model that reads your data runs on infrastructure you control the boundaries of, not on a shared public endpoint. With Sealmetrics LENS private AI, inference runs on the open-weight gpt-oss-120b model hosted by Scaleway in Paris — inside the EU, never shared with third parties, never used to train external models. Enterprise can get a dedicated, non-shared instance — available through sales only. It is available and purchasable now, not a beta.",
  },
  {
    q: "How is this different from putting ChatGPT on top of GA4?",
    a: "Two differences, both structural. First, the data: GA4 is cookie-based and consent-gated, so in the EU it typically captures a fraction of real traffic — an LLM reasoning over it is confident and wrong. Sealmetrics measures cookielessly, without depending on consent. Second, the interface: an open warehouse forces the model to guess which of hundreds of fields means 'revenue,' which produces plausible but false numbers. The Sealmetrics MCP exposes named tools with one canonical definition each, so the model cannot misread the schema. Complete data plus a constrained surface removes both failure modes.",
  },
  {
    q: "Does AI analytics require cookies or personal data?",
    a: "It does not have to. Sealmetrics measures aggregate, anonymous events with no cookies, no localStorage, no fingerprinting and no personal data, and attributes revenue last-click at the event level. Because there is zero PII by construction, the AI layer cannot surface a person, reconstruct an individual journey, or run multi-touch models — it answers only what aggregate, complete data can answer, which is exactly what keeps the answers honest and compliant.",
  },
];

const pillars = [
  {
    eyebrow: "The foundation",
    title: "Complete data",
    body: "AI is only as good as its input. Cookieless, first-party, no consent-driven data loss, never sampled — so every answer describes your traffic, not just the fraction that accepted a banner.",
    metric: "0",
    metricLabel: "visitors lost to consent, never modeled",
  },
  {
    eyebrow: "The interface",
    title: "A semantic MCP",
    body: "47 named, read-only tools, each mapping one business concept to one canonical metric. The model calls a documented contract instead of guessing at raw columns. Nothing to misread.",
    metric: "40+ tools",
    metricLabel: "via MCP out of the box",
  },
  {
    eyebrow: "The algorithm",
    title: "Private AI, in the EU",
    body: "LENS private AI runs inference on an open-weight model (gpt-oss-120b) hosted by Scaleway in Paris, while your data stays in Dublin. Never leaves the EU, never shared, never trains third-party models.",
    metric: "EU-only",
    metricLabel: "inference + storage",
  },
  {
    eyebrow: "Your choice",
    title: "Choose the algorithm",
    body: "Use Sealmetrics private AI, or bring your own Anthropic, OpenAI, Gemini or DeepSeek key, or connect the hosted MCP from your own client. Same complete data underneath — you only pick the model.",
    metric: "BYOK",
    metricLabel: "or private AI, or MCP",
  },
  {
    eyebrow: "The guardrail",
    title: "Zero PII, honest answers",
    body: "Aggregate-only measurement: no per-user journeys, no cross-session identifiers, no multi-touch models. The model cannot fabricate a person because none was ever stored.",
    metric: "0 PII",
    metricLabel: "by construction",
  },
  {
    eyebrow: "The receipt",
    title: "Answers you can trace",
    body: "Every answer resolves to a named tool over an explicit period in your timezone, and attribution is last-click at the event level — so you can always see which metric produced the number.",
    metric: "Last-click",
    metricLabel: "without consent gaps",
  },
];

const comparisonRows: Array<{ feature: string; generic: string; native: string }> = [
  { feature: "Data foundation", generic: "Cookie-based, consent-gated (partial)", native: "Cookieless, no consent loss" },
  { feature: "How the AI reads it", generic: "Raw SQL against unseen tables", native: "Semantic MCP — named tools" },
  { feature: "Wrong-but-plausible answers", generic: "High — a staging column looks real", native: "Structurally constrained" },
  { feature: "Personal data exposure", generic: "Possible — raw rows carry PII", native: "None — 0 PII by construction" },
  { feature: "Where inference runs", generic: "Warehouse creds to a US model", native: "Private AI in the EU, or your key" },
  { feature: "Data residency", generic: "Mostly US", native: "EU — Dublin + Paris" },
  { feature: "Attribution", generic: "Whatever the schema encodes", native: "Last-click on data without consent gaps" },
  { feature: "Time to first answer", generic: "Build pipelines + dashboards", native: "Connect MCP, ask in words" },
];

const useCases = [
  {
    role: "CMO",
    headline: "Ask why ROAS moved, get an answer",
    body: "“Why were sales soft this week?” returns a diagnosis — traffic vs conversion, which channel, which landing page — grounded in complete data, not a modeled estimate.",
  },
  {
    role: "eCommerce Manager",
    headline: "Revenue by SKU, in plain language",
    body: "Drill into category, variant and campaign revenue by asking, not by building a report. Every item is queryable — no sampling thresholds hiding the long tail.",
  },
  {
    role: "CTO / DPO",
    headline: "An AI layer compliance signs off on",
    body: "Private AI hosted in the EU, zero PII in the data, no third-party model training, a DPA included. The AI never sees a person because none was ever stored.",
  },
  {
    role: "AI builder",
    headline: "Ship a Claude analyst in an afternoon",
    body: "Connect the Sealmetrics MCP to Claude, ChatGPT, Cursor or Claude Code and let it answer revenue questions directly — the same server can even provision a new site from the chat.",
  },
];

export default function AiAnalyticsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "AI Analytics" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "AI Analytics", url: "/ai-analytics" }])} />
      <JsonLd data={faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })), "/ai-analytics")} />
      <JsonLd
        data={howToSchema({
          name: "Connect Claude or ChatGPT to your analytics with the Sealmetrics MCP server",
          description:
            "Connect an AI assistant to cookieless, EU-hosted analytics over the Model Context Protocol: create a free Agentic account, add the remote endpoint, verify, and ask a revenue question.",
          url: "/ai-analytics",
          totalTime: "PT2M",
          supply: ["A free Sealmetrics account", "An MCP-capable AI assistant"],
          steps: mcpSetupSteps.map((step) => ({ name: step.name, text: step.text })),
        })}
      />

      {/* HERO */}
      <section className="bg-warm-white border-b border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-[920px]">
            <span className="eyebrow mb-6 block">AI analytics</span>
            <h1
              className="font-semibold leading-[1.05] tracking-[-0.035em] text-ink"
              style={{ fontSize: "clamp(44px, 6.4vw, 88px)" }}
            >
              Ask your analytics anything.{" "}
              <em className="italic font-medium" style={{ color: "#2D8B6D", fontStyle: "italic" }}>
                Trust the answer.
              </em>
            </h1>
            <p className="mt-8 text-[19px] leading-[1.6] text-ink-soft max-w-[68ch]">
              Point an LLM at incomplete, cookie-based analytics and it invents confident, wrong answers.
              Sealmetrics is AI analytics built the other way round — complete cookieless data, a semantic
              MCP the model can&apos;t misread, and private AI hosted in the EU. Ask Claude or ChatGPT your
              revenue questions and get a number you can defend.
            </p>
            <div data-md="skip" className="mt-10 flex flex-col sm:flex-row gap-3 flex-wrap">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center bg-ink text-white px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-110"
              >
                Book a Demo →
              </Link>
              <Link
                href="https://lens-lite.sealmetrics.com"
                className="inline-flex items-center justify-center border border-warm-200 text-ink px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50"
              >
                Try the live LENS demo
              </Link>
            </div>
            <p className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.12em] mt-8">
              Private AI · EU-hosted · 0 PII
            </p>
          </div>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            AI analytics is only as trustworthy as the data beneath it. Sealmetrics pairs{" "}
            <strong>cookieless data with no consent gaps</strong> with a <strong>semantic MCP</strong> and{" "}
            <strong>private AI hosted in the EU</strong> (LENS AI), so an LLM answers your revenue
            questions from complete data it cannot misread — with zero personal data in play.
          </>
        }
        bullets={[
          <>Generic AI on GA4: partial data, PII risk, US inference, plausible-but-wrong answers.</>,
          <>Sealmetrics: complete data, 0 PII, EU private AI, last-click attribution without consent gaps.</>,
          <>Connect Claude, ChatGPT, Cursor or Claude Code via MCP — or bring your own model key.</>,
        ]}
      />

      <LogosStrip />

      {/* SIX PILLARS */}
      <section className="py-24 border-t border-warm-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px] mb-16">
            <span className="eyebrow mb-5 block">What makes analytics AI-ready</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(36px, 4.4vw, 60px)" }}
            >
              An LLM is the easy part.{" "}
              <em className="italic font-medium" style={{ color: "#2D8B6D", fontStyle: "italic" }}>
                Trustworthy answers are the hard part.
              </em>
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft">
              Six properties separate AI analytics you can act on from a chatbot guessing over a warehouse.
              We wrote the long version in{" "}
              <Link href="/blog/self-service-analytics-lens-ai" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
                how Sealmetrics ships self-service analytics
              </Link>
              .
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-warm-100 bg-warm-50 p-7 hover:border-warm-200 transition-colors"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-brand">
                  {p.eyebrow}
                </span>
                <h3 className="mt-3 text-[22px] font-semibold text-ink leading-[1.2]">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">{p.body}</p>
                <div className="mt-6 pt-5 border-t border-warm-100">
                  <span className="block text-[28px] font-semibold text-ink leading-none">{p.metric}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft mt-2 block">
                    {p.metricLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 border-t border-warm-100 bg-warm-50">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px] mb-14">
            <span className="eyebrow mb-5 block">Side by side</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
            >
              Generic AI on a warehouse vs AI-native analytics.
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-warm-100 bg-white">
            <table className="w-full text-left min-w-[640px]">
              <thead className="bg-warm-50 border-b border-warm-100">
                <tr>
                  <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                    Property
                  </th>
                  <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                    LLM + raw warehouse
                  </th>
                  <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-brand">
                    Sealmetrics LENS AI
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i !== comparisonRows.length - 1 ? "border-b border-warm-100" : ""}>
                    <td className="px-6 py-4 text-[15px] text-ink font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-[15px] text-ink-soft">{row.generic}</td>
                    <td className="px-6 py-4 text-[15px] text-ink font-semibold">{row.native}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRIVATE AI / MCP */}
      <section className="py-24 border-t border-warm-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="eyebrow mb-5 block">Private AI, LENS AI</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}
            >
              Your data answers your questions — inside the EU.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft">
              LENS AI is the private-AI layer over your{" "}
              <Link href="/cookieless-analytics" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
                cookieless analytics
              </Link>
              . Inference runs on an open-weight model (gpt-oss-120b) hosted by Scaleway in Paris; your analytics
              data stays in Dublin. Both in the EU — never shared, never used to train third-party models.
              Prefer your own stack? Bring your Anthropic, OpenAI or Gemini key instead.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Connect Claude, ChatGPT, Cursor or Claude Code via MCP at mcp.sealmetrics.com",
                "47 read-only tools: overview, channels, conversions, funnels, landing pages, properties",
                "Private AI on gpt-oss-120b / Scaleway (Paris) or bring your own model key — you choose the algorithm",
                "Enterprise can get a dedicated, non-shared private AI instance (through sales)",
                "Hits normally land in reports in under 2 minutes, and the SLA guarantees the day is complete before 6 AM",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-[15px] leading-[1.55] text-ink-soft">
                  <span className="text-brand font-bold mt-0.5" aria-hidden>
                    →
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href="/product"
                className="inline-flex items-center justify-center bg-ink text-white px-7 py-3.5 rounded-md text-[14px] font-semibold no-underline hover:brightness-110"
              >
                See LENS AI on the platform →
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center border border-warm-200 text-ink px-7 py-3.5 rounded-md text-[14px] font-semibold no-underline hover:bg-warm-50"
              >
                How the data is collected
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-warm-100 bg-dark-bg p-8 text-white shadow-[0_24px_60px_-24px_rgba(14,14,12,0.5)]">
            <div className="font-mono text-[11px] text-white/50 uppercase tracking-[0.12em] mb-4">
              Claude · MCP · Sealmetrics LENS AI
            </div>
            <p className="font-mono text-[13px] leading-[1.7] text-white/90">
              <span className="text-brand-soft">{">"}</span> Sales look soft this week versus last. What
              happened, and where should I look first?
            </p>
            <div className="my-6 h-px bg-white/10" />
            <p className="text-[13px] leading-[1.7] text-white/80">
              Traffic held — this is a conversion problem, not acquisition. It&apos;s isolated to your{" "}
              <code className="text-amber">/checkout</code> page, where the rate fell mid-week and dragged
              direct conversions with it, while paid search was unaffected. Revenue loss concentrates in a
              single category. Start with the checkout page, not the media budget.
            </p>
            <div className="mt-6 font-mono text-[11px] text-white/40 leading-[1.7]">
              → get_overview · get_channels · get_landing_pages · get_conversions
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 border-t border-warm-100 bg-warm-50">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px] mb-14">
            <span className="eyebrow mb-5 block">Who it&apos;s for</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
            >
              One AI layer, every role.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((u) => (
              <div key={u.role} className="rounded-2xl border border-warm-100 bg-white p-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-brand">
                  {u.role}
                </span>
                <h3 className="mt-3 text-[22px] font-semibold text-ink leading-[1.25]">{u.headline}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">{u.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[15px] leading-[1.6] text-ink-soft max-w-[720px]">
            The compliance case rests on architecture, not a certificate — GDPR by design, ePrivacy-clean,
            EU-hosted in Dublin, DPA included. For the full posture, see{" "}
            <Link href="/security" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
              security &amp; compliance
            </Link>{" "}
            and how it holds up as{" "}
            <Link href="/glossary/gdpr-analytics-compliance" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
              GDPR-compliant analytics
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="connect" className="py-24 border-t border-warm-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px] mb-12">
            <span className="eyebrow mb-5 block">Connect it</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
            >
              Connect Claude or ChatGPT to your analytics.
            </h2>
            <p className="mt-6 text-[16.5px] leading-[1.65] text-ink-soft">
              Four steps, about two minutes. What makes this different from every other analytics MCP
              is what sits behind it: the visitor data path is EU-only, hosted in Dublin; the model
              runs on Scaleway in Paris or on your own key; and the measurement is aggregate and
              anonymous, so there is no personal identifier to hand a model in the first place.
              Attribution is last-click on the complete dataset — see{" "}
              <Link href="/complete-data" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
                complete data
              </Link>{" "}
              for why that matters more than the model you pick.
            </p>
          </div>
          <div className="max-w-[860px]">
            <HowToSteps steps={mcpSetupSteps} />
          </div>
          <p className="mt-12 text-[15px] leading-[1.6] text-ink-soft max-w-[720px]">
            Prefer to run the server on your own machine, or need to pin a version? The local{" "}
            <code className="font-mono text-[13.5px]">npx</code> server takes an API key instead — the{" "}
            <a
              href="https://docs.sealmetrics.com/integrations/mcp-server"
              className="text-brand no-underline border-b border-warm-200 hover:border-brand"
            >
              MCP server reference
            </a>{" "}
            covers both, client by client. For the endpoint itself — how authorisation works, which
            scopes it asks for and what the connector refuses to do — see the{" "}
            <Link href="/docs/mcp" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
              connector reference
            </Link>
            .
          </p>
        </div>
      </section>

      <FaqAccordionV3
        locale="en"
        items={faqs}
        titleEn={
          <>
            The <em>questions</em> teams ask about AI analytics.
          </>
        }
        ledeEn="Honest answers about AI analytics, private AI, MCP, and what has to be true for an LLM to answer your revenue questions without making them up."
      />

      <FinalCtaSharedV3
        locale="en"
        titleEn={
          <>
            Give your AI complete data.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              Then trust what it tells you.
            </em>
          </>
        }
        titleEs={
          <>
            Dale a tu IA datos completos.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              Y fíate de lo que te diga.
            </em>
          </>
        }
        ledeEn="Book a demo and ask LENS AI a question about your own traffic. Complete cookieless data, private AI in the EU, zero PII. Thirty minutes, on your numbers."
        ledeEs="Reserva una demo y hazle a LENS AI una pregunta sobre tu propio tráfico. Dato cookieless completo, IA privada en la UE, cero PII. Treinta minutos, sobre tus números."
        primaryTextEn="Book a Demo →"
        primaryTextEs="Reserva una demo →"
      />
    </>
  );
}
