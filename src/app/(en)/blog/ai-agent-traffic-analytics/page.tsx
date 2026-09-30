import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";

export const metadata: Metadata = {
  title: "AI Agent Traffic: The Invisible Analytics Channel",
  description:
    "GPT, Claude, Perplexity, and Google AI Overviews are sending traffic to your site. Traditional analytics cannot see it. Here is why it matters.",
  openGraph: {
    title: "AI Agent Traffic: The Invisible Channel Your Analytics Miss",
    description:
      "AI agents are sending traffic to your site. Your analytics classify it as direct or unknown.",
    type: "article",
    url: "https://sealmetrics.com/blog/ai-agent-traffic-analytics/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/ai-agent-traffic-analytics.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "AI Agent Traffic: The Invisible Channel Your Analytics Miss",
    description: "AI agents are sending traffic to your site. Your analytics classify it as direct or unknown.",
    images: ["https://sealmetrics.com/og/blog/ai-agent-traffic-analytics.png"],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/ai-agent-traffic-analytics/",
  },
};

export default function AIAgentTrafficPage() {
  const dates = postDates("ai-agent-traffic-analytics");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "AI Agent Traffic Analytics" }]} />
      <JsonLd data={articleSchema({ headline: "AI Agent Traffic: The Invisible Channel Your Analytics Miss", description: "AI agents are sending traffic your analytics can't see.", ...dates, url: "/blog/ai-agent-traffic-analytics", category: "AI & Analytics", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "AI Agent Traffic", url: "/blog/ai-agent-traffic-analytics" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            AI & Analytics
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            AI Agent Traffic: The Invisible Channel Your Analytics Miss
          </h1>
          <PostByline
              {...dates}
              readTime="5 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
        </header>

        <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
          <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li>AI assistants (GPT, Claude, Perplexity, Google AI Overviews) read your pages and send visitors to them, and when no referrer or source parameter arrives, traditional analytics files those visits as "direct" or "unassigned."</li>
            <li>AI crawlers do not execute JavaScript and often omit referrer headers — client-side analytics like GA4 cannot detect these visits at all.</li>
            <li>There is no reliable cross-site benchmark for how much traffic this is yet. Size it on your own site: crawler user agents in server logs, and AI referrers and source parameters in your analytics.</li>
            <li>No JavaScript tag can see a crawler that never runs it. What analytics can show is the people who click through from an AI answer, grouped by referrer domain and source parameter into a channel of their own.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            A growing percentage of your website traffic comes from AI agents —
            <a href="https://platform.openai.com/docs/bots" target="_blank" rel="noopener noreferrer">GPT browsing</a>, <a href="https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/web-search-tool" target="_blank" rel="noopener noreferrer">Claude web access</a>, Perplexity search, and <a href="https://blog.google/products/search/generative-ai-google-search-may-2024/" target="_blank" rel="noopener noreferrer">Google AI
            Overviews</a>. These systems crawl your pages, extract information, and
            either cite you in their responses or direct users to your site.
          </p>

          <p>
            Your analytics cannot see any of it.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Why AI traffic is invisible to GA4
          </h2>

          <p>
            Traditional analytics tools identify traffic sources through
            referrer headers, UTM parameters, and cookies. AI agents present
            unique challenges for all three. Unlike{" "}
            <Link href="/glossary/first-party-data-collection" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">first-party</Link>{" "}
            collection methods, client-side scripts cannot detect these visits:
          </p>

          <ul className="space-y-2 pl-0 list-none">
            {[
              "AI agents often do not pass referrer headers, so visits appear as \"direct\" traffic",
              "Users arriving via AI citations rarely have UTM parameters attached",
              "AI crawlers that fetch page content do not execute JavaScript, making them invisible to client-side analytics",
              "Some AI agents use headless browsers that GA4 cannot distinguish from direct visits",
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
            The result: AI-driven traffic gets classified as
            &ldquo;direct&rdquo; or &ldquo;unassigned&rdquo; in your analytics.
            You know these visits are happening — your server logs show them —
            but your analytics dashboard has no category for them.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            How much AI traffic are we talking about?
          </h2>

          <p>
            It varies by site, sector and how much of your content answers the
            questions people ask assistants, and there is no reliable
            cross-site benchmark yet. Any single percentage you read should be
            treated as a guess until you have measured your own site. Two
            sources give you a first figure:
          </p>

          <ul className="space-y-2 pl-0 list-none">
            {[
              "Server logs: count requests from the published AI crawler user agents, such as OpenAI's GPTBot and OAI-SearchBot, Anthropic's ClaudeBot and PerplexityBot. These are machines reading your pages, not visitors, and they never run a JavaScript tag",
              "Analytics referrers: look for visits referred by chatgpt.com, perplexity.ai, claude.ai or gemini.google.com, and for source parameters some assistants add to the links they show. These are people who clicked through from an answer",
              "Direct and unassigned: a rise in untagged visits to deep pages that are unlikely to be typed or bookmarked is a signal worth checking against the two sources above",
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

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Why this matters for marketing strategy
          </h2>

          <p>
            AI agent traffic is not just a measurement curiosity. It has direct
            strategic implications:
          </p>

          <ul className="space-y-2 pl-0 list-none">
            {[
              "SEO strategy: If AI agents are reading and citing your content, optimizing for AI discovery (structured data, clear answers, comprehensive coverage) becomes a channel investment",
              "Content ROI: Content that generates significant AI citations has value beyond traditional organic search — but you cannot measure that value if you cannot see the traffic",
              "Attribution: AI-driven conversions exist. Users who arrive through an AI recommendation have specific behavior patterns. Without tracking, these conversions are misattributed",
              "Competitive intelligence: Understanding which competitors AI agents cite — and which of your pages they prefer — is strategic information",
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

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What you can measure in Sealmetrics today
          </h2>

          <p>
            Sealmetrics does not detect or classify AI agents, and does not
            report crawler visits: a crawler that does not execute JavaScript
            never reaches a{" "}
            <Link href="/how-it-works" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">first-party</Link>{" "}
            tag, ours included. For the machines themselves, your server logs
            remain the source.
          </p>

          <p>
            What it does measure is the people who click through from an
            assistant&apos;s answer. Those visits arrive with a referrer such as
            chatgpt.com or perplexity.ai, or with a source parameter, and a
            channel rule can group them into their own channel, so you can see
            which pages they land on and whether they convert, like any other
            source.{" "}
            <Link
              href="/product"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              See the full product capabilities
            </Link>
            .
          </p>
        </div>

        <CommercialModule
          hook="Visitors are already clicking through from AI answers. See how Sealmetrics groups them into a channel of their own and ties them to revenue."
        />

        {/* Related */}
        <div className="mt-16 pt-10 border-t border-warm-100">
          <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
            Related articles
          </h3>
          <div className="space-y-3">
            <Link
              href="/blog/cookieless-analytics-explained"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              Cookieless Analytics Explained: How to Measure Without Cookies
            </Link>
            <Link
              href="/blog/multi-touch-attribution-complete-data"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              Why Multi-Touch Attribution Fails Without Complete Data
            </Link>
          </div>
        </div>
      </div>
        <RelatedReading currentSlug="ai-agent-traffic-analytics" />
    </article>
    </>
  );
}
