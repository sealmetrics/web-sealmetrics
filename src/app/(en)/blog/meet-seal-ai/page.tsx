import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import { getAlternates } from "@/lib/i18n/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  articleSchema,
  breadcrumbSchema,
  definedTermSchema,
  faqPageSchema,
  speakableWebPageSchema,
} from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { FaqSection } from "@/components/ui/FaqSection";
import { CommercialModule } from "@/components/ui/CommercialModule";

const SLUG = "meet-seal-ai";
const URL = `/blog/${SLUG}`;
const TITLE = "Meet Seal AI: The Analytics Assistant That Never Sends Your Data to the US";
const DESCRIPTION =
  "Ask your analytics questions in plain language and get grounded answers — with inference that runs in the EU only, retains nothing, and trains no one's model. Here's how Seal AI works and why it's private by architecture, not by promise.";

export const metadata: Metadata = {
  title: "Seal AI: EU-Only Analytics AI That Retains Nothing",
  description: "Seal AI runs inference only in Paris, France (Scaleway) — no US parent, zero prompt retention, no model training on your data.",
  openGraph: {
    title: "Meet Seal AI: Private, EU-Only Analytics AI",
    description:
      "Plain-language answers about your analytics, with inference that never leaves the EU and retains nothing.",
    type: "article",
    url: "https://sealmetrics.com/blog/meet-seal-ai/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/meet-seal-ai.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Meet Seal AI: Private, EU-Only Analytics AI",
    description: "Plain-language answers about your analytics, with inference that never leaves the EU and retains nothing.",
    images: ["https://sealmetrics.com/og/blog/meet-seal-ai.png"],
  },
  alternates: {
    languages: getAlternates("/blog/meet-seal-ai"),
    canonical: `https://sealmetrics.com${URL}`,
  },
};

const FAQ = [
  {
    question: "What is Seal AI?",
    answer:
      "Seal AI is the private AI layer built into Sealmetrics. It powers a natural-language assistant that answers questions about your analytics by querying your data, and it generates automated insights. Inference runs on European infrastructure only (Scaleway, Paris), retains no prompt content, and never trains any model on your data. It requires no setup: there are no API keys to create and no AI vendor account.",
  },
  {
    question: "Does Seal AI send my data to the United States?",
    answer:
      "No. Seal AI runs inference exclusively in Paris, France, on Scaleway — a French company with no US parent. Because the data never leaves the EU and the provider is not subject to US jurisdiction, no international transfer occurs, so GDPR Chapter V (Standard Contractual Clauses, transfer assessments, the Data Privacy Framework) does not apply.",
  },
  {
    question: "Does Seal AI train on my analytics data?",
    answer:
      "No. The underlying model (gpt-oss-120b) is open-weight and static — it does not learn from requests. Neither Scaleway, nor Sealmetrics, nor the model's creator trains on your data. Sealmetrics stores only token counters for quota and billing; prompt and response content is never persisted.",
  },
  {
    question: "How is Seal AI different from using ChatGPT or Claude with my data?",
    answer:
      "Consumer and API AI tools from US providers route your data to US-jurisdiction companies, even when an EU region is available. Seal AI is private by architecture: EU-only inference, no US parent, zero retention, no training, and an open-weight model you could self-host. If you prefer a specific external provider, Sealmetrics also supports bring-your-own-key — but Seal AI is the default so privacy doesn't depend on configuration.",
  },
  {
    question: "What can I ask Seal AI?",
    answer:
      "Anything you'd ask a data analyst about your traffic and conversions: how a period compares to the previous one, which channel or source converts best and why, what your bounce rate is, how devices break down, or why a metric moved. It answers by calling your real data tools and narrating the result — grounded in your numbers, not invented.",
  },
];

export default function MeetSealAiPage() {
  const dates = postDates("meet-seal-ai");

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Product",
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
          { name: "Meet Seal AI", url: URL },
        ])}
      />
      <JsonLd
        data={definedTermSchema({
          name: "Private AI",
          description:
            "An AI system designed so that user data is processed without leaving a chosen jurisdiction, is not retained after inference, and is never used to train models. Privacy is a property of the architecture — the hosting location, corporate jurisdiction, retention policy, and model licensing — rather than a contractual promise layered over a general-purpose service.",
          url: URL,
          related: [
            { name: "Data sovereignty", url: "/blog/residency-is-not-sovereignty" },
          ],
        })}
      />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: TITLE,
          selectors: [".key-takeaways", ".tldr"],
        })}
      />

      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Meet Seal AI" }]} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Product
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              Meet Seal AI: The Analytics Assistant That Never Sends Your Data to the US
            </h1>
            <PostByline
              {...dates}
              readTime="5 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Ask your analytics a question in plain language and get a grounded
            answer — from an AI that runs in the EU only, keeps nothing, and
            trains no one&apos;s model. Private by architecture, not by promise.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
              Key Takeaways
            </h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>
                Seal AI answers analytics questions in plain language by querying your
                real data — grounded in your numbers, not invented.
              </li>
              <li>
                Inference runs in Paris only, on a European provider with no US parent.
                No data leaves the EU, so no international transfer ever happens.
              </li>
              <li>
                Zero prompt retention, no training on your data, and an open-weight model —
                privacy is a property of the architecture, not a policy layered on top.
              </li>
              <li>
                No setup: no API keys, no AI vendor account. Prefer your own provider? Bring
                your own key — but Seal AI is the default so privacy isn&apos;t optional.
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Analytics tools have been racing to bolt an AI chat box onto the
              dashboard. Most of them quietly route your data to a US AI provider
              to do it. We didn&apos;t want to be one of them — so we built{" "}
              <strong>Seal AI</strong>, the private AI layer inside Sealmetrics,
              on a different premise: the AI should be as private as the analytics
              it explains.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What it does
            </h2>
            <p>
              Seal AI is an analyst you can talk to. Ask &quot;how did traffic do
              versus last month?&quot; or &quot;which of my top sources converts
              best, and why do you say that?&quot; and it answers in plain
              language — by actually querying your data, not by guessing. Under
              the hood it plans, calls the right data tools, reads the results,
              and writes them back as a clear answer with the occasional chart or
              table. It also produces automated insights on a schedule, so
              patterns surface without you asking.
            </p>
            <p>
              Crucially, it&apos;s <em>grounded</em>: it narrates the numbers it
              retrieved from your account and is built to refuse to invent ones it
              didn&apos;t. We test that discipline continuously against ground
              truth pulled straight from the database.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Why it&apos;s private by architecture
            </h2>
            <p>
              &quot;Private AI&quot; gets used loosely, so here is exactly what we
              mean, and it&apos;s all structural:
            </p>
            <ul className="space-y-3 pl-6 list-disc marker:text-text-tertiary">
              <li>
                <strong>EU-only inference.</strong> The model runs on
                Scaleway&apos;s infrastructure in Paris, and only there. Scaleway
                is a French company with a French parent and no US ownership, so
                it isn&apos;t subject to the US CLOUD Act.
              </li>
              <li>
                <strong>No transfer, so no transfer problem.</strong> Because your
                data never leaves the EU and the provider has no US parent, GDPR
                Chapter V generally isn&apos;t triggered — no Standard Contractual
                Clauses, no transfer assessment, no dependence on the EU-US Data
                Privacy Framework surviving its next court date. As with any
                cross-border data question, confirm the specifics with your DPO.
              </li>
              <li>
                <strong>Zero retention, no training.</strong> Scaleway retains no
                prompt content by default; Sealmetrics stores only token counts,
                never the content. The model is open-weight and static — it does
                not learn from your requests.
              </li>
              <li>
                <strong>The prompt is born clean.</strong> Sealmetrics is
                consentless analytics: we never collect IPs, cookies, or visitor
                identifiers in the first place. So there is no personal identifier
                to send to the AI, even before privacy controls apply.
              </li>
            </ul>
            <p>
              The difference from bolting on a US AI API is not a stricter
              contract. It&apos;s that the data never enters a jurisdiction where
              a stricter contract would be needed.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              No setup, and no lock-in
            </h2>
            <p>
              You don&apos;t configure anything. There are no API keys to create
              and no third-party AI account to sign up for — Seal AI is included
              and uses a platform-owned key you never see. If you&apos;d rather
              use a specific external provider, Sealmetrics supports
              bring-your-own-key for OpenAI, Anthropic, Gemini, or DeepSeek. But
              Seal AI is the default on purpose: privacy shouldn&apos;t depend on
              a checkbox.
            </p>
            <p>
              And because the model is open-weight under the Apache 2.0 license,
              we&apos;re not locked to a single vendor either. The same model is
              available from several European hosts and can run on a single GPU —
              so the privacy guarantee is one we could keep even if we changed
              infrastructure. A guarantee you can&apos;t walk away from isn&apos;t
              a guarantee; ours is portable by design.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Try it with three questions
            </h2>
            <p>
              If you already use Sealmetrics, open the assistant and ask: (1)
              &quot;Compare my entrances over the last 7 days to the previous
              7.&quot; (2) &quot;Which of my top 3 sources converts best, and
              why?&quot; (3) &quot;What&apos;s my bounce rate this month?&quot;
              You&apos;ll get grounded answers in seconds — and none of the data
              behind them will have left the EU.
            </p>
            <p>
              Want the engineering detail? We&apos;ve published how Seal AI works,
              end to end, including the data-handling and compliance analysis, in
              our{" "}
              <Link
                href="https://docs.sealmetrics.com/lens/seal-ai/private-ai-architecture"
                className="text-text-primary border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors no-underline"
              >
                technical documentation
              </Link>
              .
            </p>
          </div>

          <CommercialModule
            hook="The fastest way to meet Seal AI is to ask it something about your own traffic. Book a demo — there is nothing to configure first."
          />

          <FaqSection items={FAQ} locale="en" />

          <RelatedReading currentSlug={SLUG} />
        </div>
      </article>
    </>
  );
}
