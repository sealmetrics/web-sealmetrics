import type { Metadata } from "next";
import { SignalAnswer } from "@/components/v4/SignalAnswer";
import "@/components/v4/signal-answer.css";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

const faqs = [
  {
    question: "Does Sealmetrics connect to Google Ads for conversion import?",
    answer: "Sealmetrics tracks Google Ads campaigns end-to-end via UTM parameters and click IDs and reports ROAS on them. It does not push audiences back to Google Ads for automated bidding — that needs GA4 with consented users. Most teams keep GA4 as the Ads conduit and use Sealmetrics as the source of truth for decisions.",
  },
  {
    question: "Which eCommerce CMS does Sealmetrics work with?",
    answer: "WooCommerce, Magento 2, PrestaShop, OpenCart and Shopify have native modules. WordPress, Drupal, Joomla, Webflow, Wix, Squarespace, Next.js, React and Nuxt have documented integrations. Any other CMS works with the standard JavaScript tag or GTM.",
  },
  {
    question: "Can I export data to BigQuery or another warehouse?",
    answer: "BigQuery has a native connector included on every plan, the free Agentic tier among them — full resolution, no ETL, no sampling, no thresholds. For Snowflake, Databricks, Redshift or any other destination, pull the same full-resolution data through the REST API and load it yourself.",
  },
  {
    question: "What is the MCP server?",
    answer: "Sealmetrics ships a native Model Context Protocol server. AI agents (Claude, ChatGPT, custom LLMs) can query your analytics data in natural language, enabling AI-native reporting and forecasting workflows.",
  },
  {
    question: "Are there webhooks for real-time events?",
    answer: "Yes, from the Scale plan up. Webhooks fire on conversions, micro-conversions and LENS alerts so you can pipe signals into ops tools, Slack or your own automations.",
  },
];
import { getAlternates } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";

export const metadata: Metadata = {
  title: "Integrations — Sealmetrics",
  description: "Native modules for eCommerce, CMS, frameworks and tag managers. BigQuery connector, MCP server for AI agents, webhooks and full REST API.",
  openGraph: {
    title: "Integrations — Sealmetrics",
    description: "Native modules for eCommerce, CMS, frameworks and tag managers. BigQuery connector, MCP server for AI agents and full REST API.",
    type: "website",
    images: [ogImage("/integrations/")],
    url: "https://sealmetrics.com/integrations/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Integrations — Sealmetrics",
    description: "25+ native integrations: ad platforms, eCommerce CMSs, data warehouses, BI tools, CRMs. Plus MCP server for AI agents and full REST API.",
    images: [ogImage("/integrations/")],
  },
  alternates: { canonical: "https://sealmetrics.com/integrations/", languages: getAlternates("/integrations") },
};

const groups = [
  { title: "eCommerce", items: ["Shopify", "WooCommerce", "Magento 2", "PrestaShop", "OpenCart"] },
  { title: "CMS", items: ["WordPress", "Drupal", "Joomla"] },
  { title: "Website builders", items: ["Webflow", "Wix", "Squarespace"] },
  { title: "Frameworks", items: ["Next.js", "React", "Nuxt 3"] },
  { title: "Tag management", items: ["Google Tag Manager", "GTM container template", "GTM tag template"] },
  { title: "Ad platforms (via UTMs)", items: ["Google Ads", "Meta Ads"] },
  { title: "Data & AI", items: ["BigQuery connector", "Data Studio", "MCP server", "Claude & Codex agentic package", "REST API", "Webhooks"] },
];

// Items with their own page link to it; the rest stay plain.
const itemLinks: Record<string, string> = {
  "Shopify": "/platforms/shopify",
  "WooCommerce": "/platforms/woocommerce",
  "Magento 2": "/platforms/magento",
  "PrestaShop": "/platforms/prestashop",
  "OpenCart": "/platforms/opencart",
  "BigQuery connector": "/integrations/bigquery",
  "Google Ads": "/integrations/google-ads",
  "Meta Ads": "/integrations/meta-ads",
  "MCP server": "/docs/mcp",
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Integrations" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Integrations", url: "/integrations" }])} />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>Native integrations</span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Plug into <em>the stack you already run.</em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Native modules for eCommerce, CMS, website builders, frameworks and tag managers. Plus a BigQuery connector, webhooks, a full REST API and an MCP server for AI agents.
          </p>
          <SignalAnswer>
            Sealmetrics integrates in two directions: into the site that produces
            the events, and into the tools that consume them. On the collection
            side there are native modules for Shopify, WooCommerce, Magento 2,
            PrestaShop and OpenCart, for WordPress, Drupal and Joomla, for
            Webflow, Wix and Squarespace, and for Next.js, React and Nuxt — plus
            Google Tag Manager container and tag templates for teams that deploy
            everything through GTM. Any framework not on that list works from a
            single script tag. On the consumption side the same aggregate data
            leaves through a REST API, webhooks, a{" "}
            <Link href="/integrations/bigquery" className="text-ink no-underline border-b border-warm-200 hover:border-ink">BigQuery connector</Link>, Data
            Studio, and an MCP server that lets Claude, ChatGPT, Cursor or Codex
            query it in plain language. None of it asks for a cookie or a visitor
            identifier, so adding Sealmetrics adds no consent obligation to a
            stack that already carries one.
          </SignalAnswer>
        </div>
      </section>

      <section className="py-28 bg-warm-50 border-t border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((g) => (
              <article key={g.title} className="bg-white border border-warm-100 rounded-xl p-7">
                <h2 className="text-[17px] font-semibold text-ink tracking-[-0.015em] mb-4">{g.title}</h2>
                <ul className="flex flex-col gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[14px] text-ink-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                      {itemLinks[i] ? (
                        <Link href={itemLinks[i]} className="text-ink-2 no-underline border-b border-warm-200 hover:border-ink">{i}</Link>
                      ) : i}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-white border-t border-warm-100">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
            <div>
              <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand bg-brand-soft px-3 py-1 rounded-md mb-5">
                Developer-first
              </span>
              <h3 className="font-semibold text-ink tracking-[-0.03em] leading-[1.05]" style={{ fontSize: "clamp(30px, 3.6vw, 44px)" }}>
                Full API, <em>native MCP,</em> no sampling.
              </h3>
              <p className="text-[17px] leading-[1.6] text-ink-soft mt-5">
REST coverage of every metric, every property, at full resolution. Webhooks for ops signals from the Scale plan up. An <Link href="/docs/mcp" className="text-brand no-underline border-b border-warm-200 hover:border-brand">MCP server</Link> so Claude, ChatGPT or your own copilot can query directly.
              </p>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Link href="/product" className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-md text-[14px] font-semibold no-underline hover:bg-brand transition-colors">
                  See product →
                </Link>
                <Link href="/demo" className="inline-flex items-center gap-2 px-6 py-3 border border-warm-200 text-ink rounded-md text-[14px] font-semibold no-underline hover:bg-warm-50 transition-colors">
                  Book demo
                </Link>
              </div>
            </div>
            <div className="bg-ink text-white rounded-[20px] p-8 md:p-10 font-mono text-[12.5px] leading-[1.8]">
              <div className="flex gap-1.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#FF6058]" />
                <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <span className="w-2 h-2 rounded-full bg-[#28CA42]" />
              </div>
              <div>
                <div><span style={{ color: "#E8B84B" }}>GET</span> /api/v1/stats/overview</div>
                <div><span style={{ color: "#E8B84B" }}>GET</span> /api/v1/stats/conversions</div>
                <div><span style={{ color: "#E8B84B" }}>GET</span> /api/v1/stats/sources</div>
                <div><span style={{ color: "#E8B84B" }}>POST</span> /api/v1/webhooks</div>
                <div><span style={{ color: "#E8B84B" }}>MCP</span> mcp.sealmetrics.com/mcp</div>
                <div className="mt-3 text-white/45">// no sampling · no thresholds · full resolution</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={<>Install in <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>5 to 30 minutes</em>, depending on your platform.</>}
        titleEs={<>Instálalo en <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>5 a 30 minutos</em>, según tu plataforma.</>}
        ledeEn="Book a technical walkthrough. Script, API, BigQuery schema, MCP server. No marketing fluff — we show the integration."
        ledeEs="Reserva walkthrough técnico. Script, API, schema BigQuery, MCP server. Sin marketing — te enseñamos la integración."
      />
    </>
  );
}
