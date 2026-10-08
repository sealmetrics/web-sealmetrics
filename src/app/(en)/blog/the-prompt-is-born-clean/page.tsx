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
  faqPageSchema,
  speakableWebPageSchema,
} from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { FaqSection } from "@/components/ui/FaqSection";
import { CommercialModule } from "@/components/ui/CommercialModule";

const SLUG = "the-prompt-is-born-clean";
const URL = `/blog/${SLUG}`;
const TITLE = "The Prompt Is Born Clean: Why Consentless Analytics Makes Private AI Simple";
const DESCRIPTION =
  "Most AI privacy work is damage limitation on data that was personal to begin with. If your analytics never collected an IP, a cookie or a visitor identifier, there is nothing personal to redact before the model sees it.";

export const metadata: Metadata = {
  title: "Why Consentless Analytics Makes Private AI Simple",
  description: "Most AI privacy work is damage limitation on data that was personal to begin with. If analytics never collected an IP or cookie, there is nothing to redact.",
  openGraph: {
    title: "The Prompt Is Born Clean",
    description:
      "Redaction, DPAs and retention policies are cleanup. Consentless analytics removes the mess upstream: there is no visitor identifier to send to the model.",
    type: "article",
    url: "https://sealmetrics.com/blog/the-prompt-is-born-clean/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/the-prompt-is-born-clean.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "The Prompt Is Born Clean",
    description: "Redaction, DPAs and retention policies are cleanup. Consentless analytics removes the mess upstream: there is no visitor identifier to send to the model.",
    images: ["https://sealmetrics.com/og/blog/the-prompt-is-born-clean.png"],
  },
  alternates: {
    languages: getAlternates("/blog/the-prompt-is-born-clean"),
    canonical: `https://sealmetrics.com${URL}`,
  },
};

const FAQ = [
  {
    question: "Can AI analytics be GDPR compliant without consent?",
    answer:
      "Yes, if the underlying analytics collects no personal data. Consent under ePrivacy is triggered by storing or accessing information on a device, and GDPR obligations are triggered by processing personal data. Analytics that sets no cookies, collects no IPs, keeps no persistent visitor identifier and is limited to the site's own audience statistics can rely on the audience-measurement exemption and keep no data that identifies anyone, so an AI layer reading those aggregated metrics never sees anyone.",
  },
  {
    question: "What data does an AI analytics assistant actually send to the model?",
    answer:
      "In a well-built one, three things: your typed question, aggregated metric values returned by the platform's own reporting tools, and the grouping labels those metrics are broken down by — channels, campaigns, pages, devices, countries. No visitor-level rows. The assistant answers by calling reporting tools against your data rather than recalling anything from training.",
  },
  {
    question: "Is redacting personal data before sending it to an AI enough for GDPR?",
    answer:
      "It helps, but it is mitigation rather than elimination. Redaction is a processing operation applied to personal data you already hold, so the collection, the lawful basis, the retention and the breach exposure all still apply, and redaction can fail. Not collecting the identifier in the first place removes the obligation instead of managing it.",
  },
  {
    question: "Does an AI assistant see individual visitors in my analytics?",
    answer:
      "In Sealmetrics it cannot, because individual visitors are not identified anywhere in the system. There are no cookies, no IP addresses and no persistent visitor identifiers to query — the session identifier rotates daily and cannot be linked across days — so no report and no AI answer can be resolved down to a person. That is a property of the data model, not a permission setting.",
  },
  {
    question: "What is the difference between privacy-by-design and privacy-by-policy for AI?",
    answer:
      "Privacy-by-policy means personal data is collected and then governed with contracts, redaction and retention rules — it works while everyone follows the rules. Privacy-by-design means the data was never collected, so there is no rule to break. For AI features the distinction is sharp: a policy can be misconfigured by the next engineer, an absent identifier cannot leak.",
  },
];

export default function ThePromptIsBornCleanPage() {
  const dates = postDates("the-prompt-is-born-clean");

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Privacy",
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
          { name: "The Prompt Is Born Clean", url: URL },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: TITLE,
          selectors: [".key-takeaways", ".tldr"],
        })}
      />

      <Breadcrumbs
        items={[{ label: "Blog", href: "/blog" }, { label: "The Prompt Is Born Clean" }]}
      />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Privacy
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              The Prompt Is Born Clean: Why Consentless Analytics Makes Private AI Simple
            </h1>
            <PostByline
              {...dates}
              readTime="5 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Almost every AI privacy control on the market is cleanup: redact
            this, contract for that, delete after ninety days. All of it exists
            because the data was personal before the model ever saw it. Collect
            nothing personal and the whole layer becomes unnecessary.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
              Key Takeaways
            </h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>
                Redaction, DPAs and retention limits are damage limitation — they
                manage a risk created upstream, at collection.
              </li>
              <li>
                Sealmetrics never collects IPs or cookies and keeps no persistent
                visitor identifier, so there is no personal identifier available to put
                in a prompt in the first place.
              </li>
              <li>
                A Seal AI prompt carries your question, aggregated metrics and
                grouping labels. Visitor-level data is absent because it never
                existed, not because it was stripped out.
              </li>
              <li>
                EU-only inference, zero retention and no training on your data
                then sit on top as defence in depth — a second layer, not the
                first one.
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Read enough vendor documentation about AI and privacy and you start
              to notice that it is all written in the same tense: the past
              perfect of a mistake already made.
            </p>
            <p>
              Personally identifiable information is <em>redacted</em> before the
              request. Data processing agreements are <em>in place</em> with the
              model provider. Logs are <em>purged</em> after a retention window.
              Prompts are <em>scrubbed</em> of email addresses. Every one of
              those controls is competent engineering, and every one of them
              exists to manage a problem introduced earlier — at collection, long
              before anyone typed a question into a chat box.
            </p>
            <p>
              There is another order of operations. Do not collect the personal
              data, and the prompt is clean when it is born.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Privacy starts before the AI
            </h2>
            <p>
              Sealmetrics is consentless analytics. That is not a claim about
              cookie banners being optional; it is a statement about what the
              tracker records. It never collects IP addresses, never sets
              cookies and never assigns a persistent visitor identifier. The
              only identifier is an ephemeral session one, pseudonymised on the
              server with a salt that rotates daily, so it cannot be linked
              across days. Visitor and user fields do not exist in the data
              model.
            </p>
            <p>
              Which means that when an AI layer sits on top of that database and
              runs a query, there is no identifier in the result set to worry
              about. Not because a filter removed it. Because there was never one
              to remove.
            </p>
            <p>
              This is the difference between privacy-by-design and
              privacy-by-policy, and it shows up most clearly in failure modes. A
              redaction rule can be misconfigured. A retention job can silently
              stop running. A new engineer can add a field to a payload without
              realising what it makes possible. An identifier that was never
              collected has no failure mode.
            </p>

            <CommercialModule
              hook="The prompt cannot leak what the database never stored. See exactly what LENS sends to the model — field by field — in a demo."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What is actually in the prompt
            </h2>
            <p>
              Concretely, here is what travels to the model when you ask the
              Sealmetrics assistant a question — and what cannot, because it does
              not exist anywhere behind it.
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-[0.85rem]">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-6 text-green-muted font-medium">
                      Goes into the prompt
                    </th>
                    <th className="text-left py-3 pl-6 text-text-secondary font-medium">
                      Cannot go in — it never existed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      in: "Your typed question (“why did organic drop last week?”)",
                      out: "IP addresses, in any form — raw, truncated or hashed",
                    },
                    {
                      in: "Aggregated metrics: entrances, conversions, bounce rate, revenue",
                      out: "Cookies or any device-side stored identifier",
                    },
                    {
                      in: "Grouping labels: channel, campaign, source, medium, term",
                      out: "Persistent device identifiers or probabilistic identity signals",
                    },
                    {
                      in: "Dimension breakdowns: page, landing page, device type, country",
                      out: "Visitor or user IDs linking sessions to a person",
                    },
                    {
                      in: "The date range and comparison window you selected",
                      out: "Cross-site or cross-device behavioural profiles",
                    },
                    {
                      in: "The report structure the assistant asked its own tools for",
                      out: "Raw visitor-level rows that could be re-identified",
                    },
                  ].map((row) => (
                    <tr key={row.in} className="border-b border-warm-100 last:border-0">
                      <td className="py-3 pr-6 text-text-primary font-medium">{row.in}</td>
                      <td className="py-3 pl-6 text-text-secondary">{row.out}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              The mechanism behind the left-hand column is worth spelling out.
              The assistant does not answer from memory or from anything it
              absorbed in training. It answers by <em>calling tools</em> — a
              63-tool inventory covering overviews, channels, campaigns, funnels,
              segments and the rest — against your account&apos;s data, and then
              writing up what came back. The model is a language layer over your
              own reports.
            </p>
            <p>
              That design has a privacy consequence and a quality consequence.
              The privacy one: the payload is bounded by what the reporting tools
              can return, and those tools cannot return a person. The quality
              one: figures in the answer come from a live query rather than the
              model&apos;s general knowledge, which is exactly why weak open-world
              factual recall in a model matters far less for grounded analytics
              than benchmark tables suggest. We went through that trade-off in
              detail in{" "}
              <Link
                href="/blog/best-llm-for-data-analytics"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                the model selection write-up
              </Link>
              .
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The second layer: defence in depth
            </h2>
            <p>
              None of the above is an argument for being careless with the
              processing chain. A clean prompt is still your commercial data —
              your revenue, your channel mix, your campaign performance. That is
              not personal data, but it is not something you want sitting on
              someone else&apos;s training corpus either.
            </p>
            <p>
              So the second layer is built as if the first did not exist.
              Inference for{" "}
              <Link
                href="https://docs.sealmetrics.com/lens/seal-ai/private-ai-architecture"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Seal AI
              </Link>{" "}
              runs on Scaleway Generative APIs in Paris, France, only. Scaleway
              is a French company whose parent is the Iliad group, with no US
              ownership, and it states explicitly that its AI services are not
              subject to extraterritorial laws such as the American CLOUD Act. It
              applies Zero Data Retention by default, with one documented
              exception: on a severe service error the failing request may be
              held for up to two weeks for root-cause analysis. It does not train
              on customer data.
            </p>
            <p>
              On our side, the metering layer persists only token counters —
              organisation, model, input and output token counts — for quota and
              billing. Prompt and response content is never persisted by it.
              Transport is TLS 1.2 or above with certificate verification. And
              because nothing leaves the EU and the processor has no US parent,
              GDPR Chapter V is not engaged at all: no Standard Contractual
              Clauses, no Transfer Impact Assessment, no dependence on the EU-US
              Data Privacy Framework surviving its next hearing.
            </p>
            <p>
              There is no setup to get wrong, either. No API keys to paste, no AI
              vendor account to open, no toggle a colleague can flip the wrong
              way. Customers who specifically want a different model can supply
              their own OpenAI, Anthropic, Gemini or DeepSeek key, and their
              prompts then travel to that provider under that provider&apos;s
              terms — a deliberate, per-customer choice, kept clearly separate.
              Seal AI is the default precisely so that privacy does not depend on
              configuration.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The order of operations
            </h2>
            <p>
              If you are evaluating an AI analytics feature, the most useful
              question is not &quot;how do you protect the data you send to the
              model?&quot; It is &quot;what personal data do you have to protect
              in the first place?&quot;
            </p>
            <p>
              A vendor with a long, detailed answer to the first question and no
              answer to the second is doing careful work on a problem they chose
              to have. The cheapest personal data to protect is the personal data
              you never collected — and it is the only kind that cannot leak, be
              subpoenaed, or turn up in a training set by accident.
            </p>
          </div>

          <CommercialModule
            hook="Privacy by architecture beats privacy by promise: nothing that identifies anyone in, nothing out, inference on Scaleway Paris. Audit the whole path in 30 minutes."
          />

          <FaqSection items={FAQ} locale="en" />

          <RelatedReading currentSlug={SLUG} />
        </div>
      </article>
    </>
  );
}
