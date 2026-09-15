import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqSection } from "@/components/ui/FaqSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ogImage } from "@/lib/seo/og";
import { MCP_ENDPOINT } from "@/lib/content/mcp-setup";

/**
 * The connector's front door.
 *
 * This URL is not a marketing choice: the MCP server itself advertises it as
 * `resource_documentation` in its OAuth protected-resource metadata, so it is
 * what an MCP client links to and what a directory reviewer at Anthropic or
 * OpenAI opens first. It answers their questions in their order — endpoint,
 * authorisation, scope, what the tools do, what they refuse to do — and hands
 * off to docs.sealmetrics.com for the per-client implementation detail.
 *
 * It deliberately does not repeat the setup HowTo from /ai-analytics: that
 * block has one source (`src/lib/content/mcp-setup.ts`) and one home. Here the
 * clients are a table of pointers, so the two pages cannot drift into rival
 * copies of the same procedure.
 */

const description =
  "Reference for the Sealmetrics MCP endpoint: the URL, how authorisation works, which scopes it asks for, and what the read-only connector will not do.";
const url = "https://sealmetrics.com/docs/mcp/";

export const metadata: Metadata = {
  title: "MCP Server Reference — Sealmetrics",
  description,
  openGraph: {
    title: "MCP Server Reference — Sealmetrics",
    description,
    type: "website",
    images: [ogImage("/docs/mcp/")],
    url,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "MCP Server Reference — Sealmetrics",
    description,
    images: [ogImage("/docs/mcp/")],
  },
  alternates: { canonical: url, languages: getAlternates("/docs/mcp") },
};

const facts: { label: string; value: React.ReactNode }[] = [
  { label: "Endpoint", value: <code>{MCP_ENDPOINT}</code> },
  { label: "Transport", value: "Streamable HTTP" },
  { label: "Authorisation", value: "OAuth 2.1 with PKCE (S256)" },
  { label: "Authorisation server", value: <code>https://my.sealmetrics.com</code> },
  { label: "Client registration", value: "Dynamic — no client ID to request" },
  { label: "Scopes", value: <code>analytics:read · offline_access</code> },
  { label: "Identity", value: "Each user authorises with their own Sealmetrics account" },
  { label: "Data residency", value: "Dublin, Ireland" },
  {
    label: "Local alternative",
    value: (
      <>
        <code>npx @sealmetrics/mcp</code> with an API key
      </>
    ),
  },
];

const canDo = [
  "Traffic, sessions and page performance over preset periods such as 7d, 30d, last_month or last_quarter, with comparison against the previous period or year.",
  "Conversions and revenue, broken down by channel, campaign, source, term, landing page or country, plus the line items of each purchase.",
  "Micro-conversions and the fixed purchase funnel, with the drop-off at each step.",
  "Custom properties the account already sends, such as a product or plan identifier.",
  "Landing pages, referrers, countries, devices, browsers and operating systems.",
  "Channel rules: list them and test how a source, medium and campaign would be classified.",
  "Documentation, the troubleshooting guide and the tracking code, so the assistant can help with setup.",
  "Search and fetch, so a client that indexes connectors can find a metric by name.",
];

const willNotDo = [
  "Read a person. There is no visitor identifier to read, because Sealmetrics never sets one.",
  "Return raw personal data, session recordings or a user-level journey. None of it exists in the store.",
  "Write anything at all. The hosted endpoint lists no tool that creates, updates or deletes: channel rules can be listed and tested but not edited, and alerts, webhooks and segments are absent, not merely refused.",
  "Delete data, move billing or touch account settings.",
  "Reach an account the authorising user cannot already open in the dashboard.",
];

const clients: { name: string; how: string }[] = [
  { name: "Claude Code", how: "claude mcp add --transport http sealmetrics <endpoint>" },
  { name: "Claude.ai and Claude Desktop", how: "Settings → Connectors → Add custom connector" },
  { name: "ChatGPT", how: "Settings → Connectors → Add custom connector" },
  { name: "Codex", how: "codex mcp add, or a plugin that carries the endpoint" },
  { name: "Cursor", how: "An entry in ~/.cursor/mcp.json" },
  { name: "Anything else", how: "Any client that speaks remote MCP over Streamable HTTP" },
];

const faqs = [
  {
    question: "Do I need an API key to use the MCP server?",
    answer:
      "Not for the hosted endpoint. You authorise it with your own Sealmetrics account in the browser and the client stores the token for you. An API key is only needed for the local server, which runs on your machine via npx and is there for offline or pinned-version setups.",
  },
  {
    question: "What can the connector see?",
    answer:
      "Aggregate analytics for the sites your Sealmetrics account can already open: traffic, conversions, revenue, campaigns, funnels, custom properties and setup status. It cannot see anything your dashboard login cannot, and it cannot read a visitor, because Sealmetrics stores no visitor identifier.",
  },
  {
    question: "Can an AI assistant change my configuration through it?",
    answer:
      "Not through the hosted endpoint. It lists read-only tools only: there is no tool on it that creates, updates or deletes anything, so a change is not refused at call time, it is simply not offered. The server documentation also lists channel-rule tools that work on drafts only and can never change or publish a live rule; publishing a rule, like any other configuration change, happens in the dashboard.",
  },
  {
    question: "How do I revoke access?",
    answer:
      "Open my.sealmetrics.com, go to the connected applications section of your account settings and revoke the authorisation. The token stops working immediately and the assistant loses the tools on its next call.",
  },
  {
    question: "Does connecting an AI assistant create a new consent obligation?",
    answer:
      "No. The connector reads aggregate data that was collected without cookies and without personal data, so there is nothing to consent to that was not already lawful to collect. The processing terms are the ones in the DPA you already signed.",
  },
  {
    question: "Which model or vendor processes my data?",
    answer:
      "Whichever assistant you connect. The server answers the tools that assistant calls; it does not choose or host a model. If the model itself must run in the EU, use LENS with Private AI, Sealmetrics' managed model served in Paris, France, with no prompt retention.",
  },
];

export default function McpDocsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Integrations", href: "/integrations" }, { label: "MCP server" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Integrations", url: "/integrations" },
          { name: "MCP server", url: "/docs/mcp" },
        ])}
      />
      <JsonLd data={faqPageSchema(faqs, "/docs/mcp")} />

      <section className="bg-paper-white border-b border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="max-w-[920px]">
            <span className="eyebrow mb-6 block">Connector reference</span>
            <h1 className="h-display mt-4">
              One endpoint, <em>your own account.</em>
            </h1>
            <p className="mt-8 text-[19px] leading-[1.6] text-ink-soft max-w-[68ch]">
              The Sealmetrics MCP server exposes your analytics to an AI assistant as tools it can
              call in plain language. It is hosted, so there is nothing to install and nothing to keep
              updated. You point a client at one URL and authorise it with the Sealmetrics account you
              already have.
            </p>
            <div className="mt-10 border border-ink bg-ink text-paper-white p-6 md:p-8 font-mono text-[13px] leading-[1.8] overflow-x-auto">
              <div className="text-[11px] uppercase tracking-[0.12em] text-paper-white/50">Endpoint</div>
              <div className="mt-2 text-[15px]">{MCP_ENDPOINT}</div>
              <div className="mt-4 text-paper-white/45">
                // Streamable HTTP · OAuth 2.1 · read-only tool surface
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-warm-100 bg-paper">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <h2 className="font-semibold text-ink tracking-[-0.03em] leading-[1.05]" style={{ fontSize: "clamp(30px, 3.6vw, 44px)" }}>
            At a glance
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-[15px]">
              <tbody>
                {facts.map((f) => (
                  <tr key={f.label} className="border-b border-warm-100 align-top">
                    <th scope="row" className="text-left font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft py-4 pr-8 whitespace-nowrap w-[240px]">
                      {f.label}
                    </th>
                    <td className="py-4 text-ink-2">{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-warm-100 bg-paper-white">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <h2 className="font-semibold text-ink tracking-[-0.03em] leading-[1.05]" style={{ fontSize: "clamp(30px, 3.6vw, 44px)" }}>
            How authorisation works
          </h2>
          <p className="mt-6 text-[17px] leading-[1.65] text-ink-soft max-w-[70ch]">
            The server implements the MCP authorisation spec end to end, so a compliant client needs no
            manual configuration beyond the URL. An unauthenticated call is refused with a{" "}
            <code>401</code> whose <code>WWW-Authenticate</code> header points at the protected-resource
            metadata; the client reads it, discovers{" "}
            <code>my.sealmetrics.com</code> as the authorisation server, registers itself dynamically,
            and runs the authorisation-code flow with PKCE. The user sees one browser screen, signs in
            with their Sealmetrics account and approves the request.
          </p>
          <ul className="mt-8 space-y-3 text-[16px] leading-[1.65] text-ink-2 max-w-[70ch] list-none p-0">
            {[
              "No client ID to request from us and no key to paste anywhere.",
              "The token carries analytics:read, and offline_access only so the client can refresh without asking again.",
              "Authorisation is per user, not per company: two colleagues each authorise separately and each sees what their own account can open.",
              "Revoking the authorisation in account settings kills the token immediately.",
            ].map((line) => (
              <li key={line} className="pl-6 relative">
                <span aria-hidden className="absolute left-0 text-ink-soft">—</span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 border-t border-warm-100 bg-paper">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10 grid md:grid-cols-2 gap-14">
          <div>
            <h2 className="font-semibold text-ink tracking-[-0.03em] leading-[1.05]" style={{ fontSize: "clamp(26px, 2.8vw, 36px)" }}>
              What it can do
            </h2>
            <p className="mt-5 text-[16px] leading-[1.65] text-ink-soft">
              The hosted endpoint lists more than 40 read-only tools and nothing that writes. Each one
              maps a business question to a canonical metric, so the model calls a documented contract
              instead of guessing at raw columns. The full list in the server documentation also covers
              tools this endpoint does not offer, such as channel-rule drafts, alerts, webhooks,
              segments and bot detection. Attribution is{" "}
              <Link href="/glossary/last-click-attribution">last click</Link> within each session, with
              no lookback across sessions, measured on traffic without consent gaps rather than the
              consented fraction. Worked examples, organised
              by business problem, are in the{" "}
              <Link href="/ai-analytics/prompts">prompt library</Link>.
            </p>
            <ul className="mt-7 space-y-3 text-[16px] leading-[1.65] text-ink-2 list-none p-0">
              {canDo.map((line) => (
                <li key={line} className="pl-6 relative">
                  <span aria-hidden className="absolute left-0 text-ink-soft">—</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-ink tracking-[-0.03em] leading-[1.05]" style={{ fontSize: "clamp(26px, 2.8vw, 36px)" }}>
              What it will not do
            </h2>
            <p className="mt-5 text-[16px] leading-[1.65] text-ink-soft">
              The boundaries are architectural, not policy. Most of them are things the store cannot
              produce because it never collected them.
            </p>
            <ul className="mt-7 space-y-3 text-[16px] leading-[1.65] text-ink-2 list-none p-0">
              {willNotDo.map((line) => (
                <li key={line} className="pl-6 relative">
                  <span aria-hidden className="absolute left-0 text-ink-soft">—</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-warm-100 bg-paper-white">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <h2 className="font-semibold text-ink tracking-[-0.03em] leading-[1.05]" style={{ fontSize: "clamp(30px, 3.6vw, 44px)" }}>
            Connecting a client
          </h2>
          <p className="mt-6 text-[17px] leading-[1.65] text-ink-soft max-w-[70ch]">
            Every client takes the same URL. The exact place you paste it differs, and the full
            walkthrough for each one, with the progressive-discovery option for tight context windows,
            lives in the{" "}
            <Link href="https://docs.sealmetrics.com/integrations/mcp-server">
              MCP server documentation
            </Link>
            .
          </p>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr className="border-b border-ink">
                  <th scope="col" className="text-left font-mono text-[11px] uppercase tracking-[0.12em] text-ink py-3 pr-8">Client</th>
                  <th scope="col" className="text-left font-mono text-[11px] uppercase tracking-[0.12em] text-ink py-3">Where the URL goes</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.name} className="border-b border-warm-100 align-top">
                    <td className="py-4 pr-8 text-ink font-semibold whitespace-nowrap">{c.name}</td>
                    <td className="py-4 text-ink-2 font-mono text-[13px]">{c.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-[16px] leading-[1.65] text-ink-soft max-w-[70ch]">
            If a client asks for a local command instead of a URL, it does not support remote MCP yet.
            Use <code>npx @sealmetrics/mcp</code> with <code>SEALMETRICS_API_KEY</code> in the
            environment, which runs the server on your machine; its tools are listed in the server
            documentation. API keys are read-only by design.
          </p>
        </div>
      </section>

      <section className="py-24 border-t border-warm-100 bg-paper">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <h2 className="font-semibold text-ink tracking-[-0.03em] leading-[1.05]" style={{ fontSize: "clamp(30px, 3.6vw, 44px)" }}>
            Data handling
          </h2>
          <p className="mt-6 text-[17px] leading-[1.65] text-ink-soft max-w-[70ch]">
            Sealmetrics is{" "}
            <Link href="/glossary/cookieless-analytics">cookieless analytics</Link>: no cookie, no
            fingerprint, no visitor identifier, and therefore no{" "}
            <Link href="/glossary/personal-data-in-analytics">personal data</Link> in the store the
            connector reads. That is what makes an AI assistant safe to point at it — the model cannot
            leak an identifier that was never collected.
          </p>
          <ul className="mt-8 space-y-3 text-[16px] leading-[1.65] text-ink-2 max-w-[70ch] list-none p-0">
            {[
              "Data is collected and stored in the European Union, in Dublin, Ireland.",
              "Designed for GDPR from the architecture up (self-assessed) and aligned with the ePrivacy Directive; visitor data is not transferred outside the EU, so no Schrems II transfer arises for it.",
              "A DPA is included with every account, and the TPSR package is available for procurement review.",
              "The connector inherits those terms. It adds a reader, not a new collection.",
            ].map((line) => (
              <li key={line} className="pl-6 relative">
                <span aria-hidden className="absolute left-0 text-ink-soft">—</span>
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[16px] leading-[1.65] text-ink-soft max-w-[70ch]">
            Full detail on infrastructure and subprocessors is on the{" "}
            <Link href="/security">security page</Link>, and the agreement itself is at{" "}
            <Link href="/dpa">/dpa</Link>.
          </p>
        </div>
      </section>

      <section className="py-24 border-t border-warm-100 bg-paper-white">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <FaqSection items={faqs} locale="en" />
          <div data-md="skip" className="mt-16 flex flex-col sm:flex-row gap-3 flex-wrap">
            <Link
              href="https://docs.sealmetrics.com/integrations/mcp-server"
              className="inline-flex items-center justify-center bg-ink text-paper-white px-8 py-4 text-[15px] font-semibold no-underline"
              style={{ boxShadow: "var(--shadow-hard)" }}
            >
              Read the full documentation
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center border border-ink text-ink px-8 py-4 text-[15px] font-semibold no-underline"
            >
              Book a technical walkthrough
            </Link>
          </div>
          <p className="mt-8 font-mono text-[11px] text-ink-soft uppercase tracking-[0.12em]">
            Questions about the connector: <Link href="/contact">contact</Link>
          </p>
        </div>
      </section>
    </>
  );
}
