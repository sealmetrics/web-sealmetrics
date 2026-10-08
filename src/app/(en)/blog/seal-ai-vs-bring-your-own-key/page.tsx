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

const SLUG = "seal-ai-vs-bring-your-own-key";
const URL = `/blog/${SLUG}`;
const TITLE = "Seal AI vs Bring-Your-Own-Key: When to Use Each";
const DESCRIPTION =
  "Seal AI is the default: nothing to configure, EU-only inference, zero retention, covered by your plan. Bring-your-own-key gives you model choice and takes on the data-transfer analysis, the cost and the key management. An honest guide to picking one.";

export const metadata: Metadata = {
  title: TITLE,
  description: "Seal AI: nothing to configure, EU-only inference, zero retention. Bring-your-own-key: model choice, plus the transfer analysis and cost. How to pick.",
  openGraph: {
    title: "Seal AI vs Bring-Your-Own-Key",
    description:
      "Managed EU-only AI or your own OpenAI, Anthropic, Gemini or DeepSeek key? What each option actually costs you, and how to choose.",
    type: "article",
    url: "https://sealmetrics.com/blog/seal-ai-vs-bring-your-own-key/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/seal-ai-vs-bring-your-own-key.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Seal AI vs Bring-Your-Own-Key",
    description: "Managed EU-only AI or your own OpenAI, Anthropic, Gemini or DeepSeek key? What each option actually costs you, and how to choose.",
    images: ["https://sealmetrics.com/og/blog/seal-ai-vs-bring-your-own-key.png"],
  },
  alternates: {
    languages: getAlternates("/blog/seal-ai-vs-bring-your-own-key"),
    canonical: `https://sealmetrics.com${URL}`,
  },
};

const FAQ = [
  {
    question: "What is BYOK in an analytics AI tool?",
    answer:
      "Bring-your-own-key means you connect your own AI provider account — an OpenAI, Anthropic, Gemini or DeepSeek key — and the analytics tool calls that provider on your behalf. You choose the model, you pay the provider directly, and your prompts are processed under that provider's terms, retention policy and jurisdiction rather than the analytics vendor's.",
  },
  {
    question: "Should I use a managed AI or bring my own API key?",
    answer:
      "Use the managed option unless you have a specific reason not to. Seal AI needs no configuration, runs inference in the EU only with zero retention and no training on your data, and is covered by your plan quota. Bring-your-own-key is the right choice when you need a specific model, must route AI spend through an existing provider contract, or have internal policy requiring your own account.",
  },
  {
    question: "Does using my own OpenAI or Anthropic key create a GDPR transfer issue?",
    answer:
      "It can, and the analysis becomes yours. A provider with a US parent remains within reach of the US CLOUD Act even when processing in an EU region, so you may need a transfer basis and an assessment. Seal AI avoids the question by design: inference stays in Paris on a provider with no US parent, so GDPR Chapter V is not triggered at all. With your own key, you decide and document that position.",
  },
  {
    question: "Is my AI usage metered if I bring my own key?",
    answer:
      "No. Bring-your-own-key usage is not metered by Sealmetrics — you are billed by your chosen provider on their terms, at their prices. Seal AI usage, by contrast, is covered by your plan's token quota, with additional non-expiring token packs available for organisations that need more headroom.",
  },
  {
    question: "Can I switch between Seal AI and my own key later?",
    answer:
      "Yes. The choice is a setting, not a migration. You can start on Seal AI, connect your own key when a specific requirement appears, and disconnect it again to fall back to the default. The assistant, the tool inventory and the way you ask questions are identical either way — only the model and the processing terms change.",
  },
];

const COMPARISON = [
  {
    aspect: "Setup",
    seal: "None — no API key, no AI vendor account",
    byok: "You create and manage a provider key",
  },
  {
    aspect: "Model choice",
    seal: "The model we ship and test (gpt-oss-120b)",
    byok: "Yours — OpenAI, Anthropic, Gemini or DeepSeek",
  },
  {
    aspect: "Where inference runs",
    seal: "Paris, France only. No US parent",
    byok: "Wherever your provider processes it",
  },
  {
    aspect: "Retention & training",
    seal: "Zero retention by default, no training on your data",
    byok: "Whatever your provider's terms say",
  },
  {
    aspect: "Who you pay",
    seal: "Nobody extra — covered by your plan quota",
    byok: "Your provider, directly, at their prices",
  },
  {
    aspect: "Metering",
    seal: "Token counters per organisation, for quota only",
    byok: "Not metered by Sealmetrics",
  },
  {
    aspect: "Transfer analysis",
    seal: "Not triggered — no international transfer",
    byok: "Yours to run and document",
  },
];

export default function SealAiVsByokPage() {
  const dates = postDates("seal-ai-vs-bring-your-own-key");

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
          { name: "Seal AI vs Bring-Your-Own-Key", url: URL },
        ])}
      />
      <JsonLd
        data={definedTermSchema({
          name: "Bring-your-own-key (BYOK)",
          description:
            "A deployment option in which a customer supplies their own AI provider credentials to a software product, so that the product calls that provider on the customer's behalf. The customer gains model choice and direct billing with their provider, and assumes responsibility for the provider's retention terms, processing jurisdiction, transfer analysis and key management.",
          url: URL,
          related: [{ name: "Managed AI inference", url: URL }],
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

      <Breadcrumbs
        items={[{ label: "Blog", href: "/blog" }, { label: "Seal AI vs Bring-Your-Own-Key" }]}
      />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Product
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              Seal AI vs Bring-Your-Own-Key: When to Use Each
            </h1>
            <PostByline
              {...dates}
              readTime="5 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Seal AI is the default because privacy should not depend on a
            checkbox. But you can bring your own OpenAI, Anthropic, Gemini or
            DeepSeek key if you need a specific model — you just take on the
            terms, the cost and the transfer analysis that come with it.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
              Key Takeaways
            </h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>
                <strong>Seal AI</strong> is the default: no key, no AI vendor account,
                EU-only inference, zero retention, no training, covered by your plan quota.
              </li>
              <li>
                <strong>Bring-your-own-key</strong> buys model choice. In exchange, your
                prompts run under your provider&apos;s terms and jurisdiction, and the
                usage is not metered by us.
              </li>
              <li>
                A US-parent provider means CLOUD Act exposure even with an EU region — with
                your own key, that assessment becomes yours to run and document.
              </li>
              <li>
                It is a setting, not a migration. Switch either way at any time; the
                assistant behaves the same, only the model and the terms change.
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Most products that offer both a managed AI and a bring-your-own-key
              option quietly push you towards whichever one is cheaper for them.
              This post does the opposite: here is what each option genuinely
              costs you, so you can pick once and stop thinking about it.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Seal AI: the default, and why it is the default
            </h2>
            <p>
              Seal AI is the private AI layer inside Sealmetrics. It powers the
              natural-language assistant and the automated insights, and there is
              nothing to configure — no API key, no AI vendor account, no
              onboarding step where you paste a secret into a settings page. The
              platform holds the key; you never see it.
            </p>
            <p>
              What that gets you, specifically:
            </p>
            <ul className="space-y-3 pl-6 list-disc marker:text-text-tertiary">
              <li>
                <strong>Inference in Paris, France only</strong>, on Scaleway&apos;s
                Generative APIs. Scaleway is a French company in the Iliad group
                with no US ownership, and states explicitly that its AI services
                are not subject to extraterritorial laws such as the American
                CLOUD Act.
              </li>
              <li>
                <strong>Zero data retention by default</strong> and no training on
                your data. The documented exception is narrow: on a severe service
                error, the failing request may be kept for up to two weeks for
                root-cause analysis.
              </li>
              <li>
                <strong>No international transfer at all</strong>, so GDPR Chapter V
                — Article 44 onward — is not triggered. No Standard Contractual
                Clauses, no Transfer Impact Assessment, no reliance on the EU-US
                Data Privacy Framework.
              </li>
              <li>
                <strong>Only token counters persist.</strong> Organisation, model,
                input and output token counts, for quota and billing. Prompt and
                response content is never persisted by the metering layer.
              </li>
              <li>
                <strong>Covered by your plan.</strong> Usage draws on your
                organisation&apos;s token quota, with non-expiring token packs
                available if you need more headroom.
              </li>
            </ul>
            <p>
              There is one more property worth naming, because it is upstream of
              everything above. Sealmetrics is consentless analytics: it never
              collects IP addresses or cookies and keeps no persistent visitor
              identifier, only an ephemeral one that rotates daily. There is no personal identifier in the dataset
              to send to a model in the first place. The prompt is born clean.
            </p>

            <CommercialModule
              hook="The default is gpt-oss-120b on Scaleway Paris, no training on your data. BYOK adds Anthropic, OpenAI, Gemini or DeepSeek under your own keys."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Bring-your-own-key: what you gain, what you take on
            </h2>
            <p>
              You can connect your own <strong>OpenAI, Anthropic, Gemini or
              DeepSeek</strong> key instead. The assistant works the same way —
              same questions, same tool inventory, same interface — but the
              inference goes to your provider on your account.
            </p>
            <p>
              What you gain is real: <strong>model choice</strong>. If your team
              has standardised on a particular model, if you have already
              negotiated pricing with a provider, or if internal policy requires
              AI spend to run through your own contracts, this is the option that
              fits.
            </p>
            <p>What you take on is also real:</p>
            <ul className="space-y-3 pl-6 list-disc marker:text-text-tertiary">
              <li>
                <strong>The data-transfer analysis.</strong> Your prompts go to
                that provider under that provider&apos;s terms, including its
                jurisdiction. If the provider has a US parent, an EU region gives
                you residency but not sovereignty — CLOUD Act exposure follows the
                corporate parent, not the datacenter. Documenting that position
                becomes your job, not ours.
              </li>
              <li>
                <strong>The cost.</strong> You are billed directly by the
                provider. Bring-your-own-key usage is not metered by Sealmetrics,
                which means no quota ceiling from us and no visibility from us
                either.
              </li>
              <li>
                <strong>The key management.</strong> Rotation, scope, revocation,
                and knowing who in your organisation can see it.
              </li>
              <li>
                <strong>The provider&apos;s retention and training defaults.</strong>{" "}
                These vary considerably. Worth reading closely before connecting:
                DeepSeek&apos;s official API, for example, states in its privacy
                policy that it stores personal data in the People&apos;s Republic
                of China and uses data to train and improve its models, with an
                opt-out exercised by email. Italy&apos;s data protection
                authority imposed an urgent processing block on it in January
                2025. The open weights are a separate matter — it is the official
                API that carries these terms.
              </li>
            </ul>
            <p>
              None of that makes bring-your-own-key a bad option. It makes it an
              option with homework.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Side by side
            </h2>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-[0.85rem]">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-6 text-text-tertiary font-medium">
                      Aspect
                    </th>
                    <th className="text-left py-3 px-6 text-text-secondary font-medium">
                      Seal AI (default)
                    </th>
                    <th className="text-left py-3 pl-6 text-text-secondary font-medium">
                      Bring-your-own-key
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.aspect} className="border-b border-warm-100">
                      <td className="py-3 pr-6 text-text-primary font-medium align-top">
                        {row.aspect}
                      </td>
                      <td className="py-3 px-6 text-text-secondary align-top">
                        {row.seal}
                      </td>
                      <td className="py-3 pl-6 text-text-secondary align-top">
                        {row.byok}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              How to choose in one minute
            </h2>
            <p>
              <strong>Choose Seal AI if</strong> you want the assistant to work
              the moment you open it; if you operate in the EU and would rather
              not run a transfer assessment for an analytics feature; if you have
              no strong opinion about which model answers your questions; if you
              want AI usage to sit inside your existing plan rather than a
              separate vendor bill; or if you simply do not want another API key
              in your organisation.
            </p>
            <p>
              <strong>Choose bring-your-own-key if</strong> you need a specific
              model for a specific reason; if your organisation already has a
              provider contract that AI spend must flow through; if an internal
              policy requires inference on your own account; or if you want to
              evaluate a model against your own data before standardising on it.
            </p>
            <p>
              If neither list is decisive, the answer is Seal AI. The default
              exists so that the privacy-preserving path is the one you get
              without doing anything — a guarantee that depends on a customer
              finding the right setting is not much of a guarantee.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              You are not locked into either
            </h2>
            <p>
              This is a setting, not an architecture decision you live with
              forever. Start on Seal AI, connect your own key later if a
              requirement appears, disconnect it and fall back to the default if
              it does not work out. The assistant, the 63-tool inventory and the
              way you phrase questions do not change — only the model behind them
              and the terms it runs under.
            </p>
            <p>
              The full processing detail, subprocessor listing and compliance
              position are documented in the{" "}
              <Link
                href="https://docs.sealmetrics.com/lens/seal-ai/private-ai-architecture"
                className="text-text-primary border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors no-underline"
              >
                Seal AI architecture and privacy documentation
              </Link>
              . For the jurisdiction question behind the bring-your-own-key
              trade-off, see{" "}
              <Link
                href="/blog/residency-is-not-sovereignty"
                className="text-text-primary border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors no-underline"
              >
                Residency Is Not Sovereignty
              </Link>
              .
            </p>
          </div>

          <CommercialModule
            hook="You can start on the default and move to your own keys later. Walk through both routes in a demo with your actual constraints on the table."
          />

          <FaqSection items={FAQ} locale="en" />

          <RelatedReading currentSlug={SLUG} />
        </div>
      </article>
    </>
  );
}
