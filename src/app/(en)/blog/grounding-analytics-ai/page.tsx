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
  statisticClaimSchema,
} from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { FaqSection } from "@/components/ui/FaqSection";
import { CommercialModule } from "@/components/ui/CommercialModule";

const SLUG = "grounding-analytics-ai";
const URL = `/blog/${SLUG}`;
const TITLE = "Grounding: Why a Good Analytics AI Shouldn't 'Know' Anything";
const DESCRIPTION =
  "A chatbot answers from what it memorised. An analytics assistant must answer only from data fetched at query time. That difference is an architecture, not a prompt — and it is the reason a model with weak factual recall can still be the right one to read your numbers.";

export const metadata: Metadata = {
  title: TITLE,
  description: "A chatbot answers from memory. An analytics assistant must answer only from data fetched at query time. That difference is an architecture, not a prompt.",
  openGraph: {
    title: "Grounding: Why a Good Analytics AI Shouldn't 'Know' Anything",
    description:
      "How grounding stops AI hallucination in analytics — the model narrates numbers it just fetched, instead of recalling numbers it never had.",
    type: "article",
    url: "https://sealmetrics.com/blog/grounding-analytics-ai/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/grounding-analytics-ai.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Grounding: Why a Good Analytics AI Shouldn't 'Know' Anything",
    description: "How grounding stops AI hallucination in analytics — the model narrates numbers it just fetched, instead of recalling numbers it never had.",
    images: ["https://sealmetrics.com/og/blog/grounding-analytics-ai.png"],
  },
  alternates: {
    languages: getAlternates("/blog/grounding-analytics-ai"),
    canonical: `https://sealmetrics.com${URL}`,
  },
};

const FAQ = [
  {
    question: "What is grounding in LLMs?",
    answer:
      "Grounding is the practice of making a language model answer only from data supplied to it at query time, rather than from what it absorbed during training. In a grounded system the model calls tools that fetch real records, those records travel into the prompt, and the model's job is to read and explain them. Anything the model cannot see in that retrieved context, it should decline to assert.",
  },
  {
    question: "How do you prevent AI hallucination in analytics?",
    answer:
      "Remove the need for the model to recall anything. Have it answer through tools that query your live database, put the returned figures in the prompt, and restrict its role to narration and interpretation. Then verify: compute ground truth directly from the database, check every figure the model asserts against it, and add trap questions about entities and periods that do not exist to see whether the model admits the gap.",
  },
  {
    question: "Can an AI assistant with weak factual knowledge still be good at analytics?",
    answer:
      "Yes, and it is often the wrong thing to optimise for. The model Sealmetrics ships, gpt-oss-120b, scores 0.168 accuracy on SimpleQA with a 0.782 hallucination rate — weak open-world factual recall. That is irrelevant to grounded analytics, because the assistant is never asked what it remembers about the world. It is asked to read your entrances and conversions, which arrive in the prompt from your own database.",
  },
  {
    question: "How can I tell if an AI analytics assistant is making numbers up?",
    answer:
      "Ask it why. A grounded assistant can name the period, the metric and the breakdown behind every figure, because it just retrieved them. Then test it on something that does not exist — a campaign you never ran, a month before you installed tracking. A grounded system says the data is not there. An ungrounded one produces a plausible number, which is exactly the failure mode you cannot spot by reading the answer alone.",
  },
  {
    question: "What is the difference between grounding and RAG?",
    answer:
      "Retrieval-augmented generation is one way to achieve grounding, usually over documents. An analytics assistant grounds through structured tool calls instead: it invokes typed functions against the analytics database and receives numbers, not passages. The principle is the same — the answer is built from what was fetched — but the retrieved evidence is a query result, so it can be compared against ground truth exactly rather than approximately.",
  },
];

export default function GroundingAnalyticsAiPage() {
  const dates = postDates("grounding-analytics-ai");

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "AI",
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
          { name: "Grounding: Why a Good Analytics AI Shouldn't Know Anything", url: URL },
        ])}
      />
      <JsonLd
        data={definedTermSchema({
          name: "Grounding",
          description:
            "In AI systems, grounding is the architectural constraint that a model may only assert facts present in the context supplied to it at query time — typically retrieved by tool calls against a live data source — rather than facts recalled from its training parameters. Grounding converts the model's role from recall to narration and interpretation, which makes its open-world factual accuracy largely irrelevant to the correctness of its answers.",
          url: URL,
          related: [{ name: "AI hallucination", url: URL }],
        })}
      />
      <JsonLd
        data={statisticClaimSchema({
          text: "In a 162-query internal benchmark of the Sealmetrics analytics assistant, the shipped model gpt-oss-120b asserted 144 of 144 verified figures correctly and passed 18 of 18 grounding-and-injection traps (95% Wilson CI 0.82-1.00), with every figure checked against ground truth computed live from the analytics database.",
          source: "Sealmetrics internal LLM benchmark (run 20260724-111147)",
          sourceAuthor: "Sealmetrics",
          sourceDate: "2026-07-24",
          url: URL,
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
        items={[{ label: "Blog", href: "/blog" }, { label: "Grounding in Analytics AI" }]}
      />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              AI
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              Grounding: Why a Good Analytics AI Shouldn&apos;t &apos;Know&apos; Anything
            </h1>
            <PostByline
              {...dates}
              readTime="6 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            A general chatbot answers from what it remembers. An analytics
            assistant must answer only from what it just fetched. Build it that
            way and the model&apos;s memory stops mattering — but you still have
            to prove it, one asserted number at a time.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
              Key Takeaways
            </h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>
                <strong>Grounding is an architecture, not a prompt.</strong> The tools
                fetch real numbers, the numbers travel in the prompt, and the model
                narrates and interprets — it never recalls.
              </li>
              <li>
                Weak open-world recall becomes irrelevant. The model we ship scores
                0.168 on SimpleQA with a 0.782 hallucination rate, and that is fine:
                it is never asked what it knows, only what your data says.
              </li>
              <li>
                Grounding must be <em>verified</em>, not trusted — ground truth computed
                from the database, every asserted figure checked against it.
              </li>
              <li>
                Traps are the real test: ask about a campaign that never ran. A grounded
                assistant says so. An ungrounded one invents something plausible.
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              There is a product principle behind AI analytics that sounds wrong
              the first time you hear it: the model should not know anything.
            </p>
            <p>
              Not &quot;should not know much&quot;. Should not <em>rely on</em>{" "}
              knowing. Every fact it states about your business should have
              arrived in the last few hundred milliseconds, from your database,
              through a tool call — not from a weight matrix trained months ago
              on the public internet.
            </p>
            <p>
              That constraint has a name. It is called grounding, and it is the
              difference between an assistant you can put in front of a
              marketing team and a very confident text generator.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Knowing versus looking up
            </h2>
            <p>
              A general-purpose chatbot answers from parameters. You ask it the
              capital of Peru and it produces &quot;Lima&quot; because that
              association is encoded in its weights. There is no lookup, no
              source, no citation — just a very good statistical guess. Most of
              the time it is right. When it is wrong, it is wrong in exactly the
              same tone of voice.
            </p>
            <p>
              An analytics assistant cannot work that way, for an obvious
              reason: your entrances last Tuesday were never in anyone&apos;s
              training data. There is nothing to recall. If the model produces a
              number, it either fetched it or fabricated it. There is no third
              option.
            </p>
            <p>
              So the design goal flips. Instead of making the model smarter about
              the world, you make it structurally incapable of answering without
              first going to get the data.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What grounding actually looks like in the stack
            </h2>
            <p>
              Grounding is not a line in the system prompt saying &quot;do not
              make things up&quot;. Models agree to that instruction and then
              make things up anyway. It is a shape you give the whole request
              path:
            </p>
            <ol className="space-y-3 pl-6 list-decimal marker:text-text-tertiary">
              <li>
                <strong>The question arrives in natural language.</strong>{" "}
                &quot;Which channel drove the most conversions last month?&quot;
              </li>
              <li>
                <strong>The model selects tools, not answers.</strong> Seal
                AI&apos;s assistant has a 63-tool inventory — overview, channels,
                campaigns, funnels, segments, landing pages, and so on. Its first
                job is to decide which of them to call and with what parameters.
              </li>
              <li>
                <strong>The tools query your data.</strong> Real rows, real
                aggregates, scoped to your account and your timezone.
              </li>
              <li>
                <strong>The results travel back into the prompt.</strong> The
                numbers are now literally in front of the model as text.
              </li>
              <li>
                <strong>The model narrates and interprets.</strong> It reads what
                came back, arranges it, notices the trend, suggests what to look
                at next. It is doing language work over evidence, not retrieval
                from memory.
              </li>
            </ol>
            <p>
              Step five is the only step where the model&apos;s intelligence is
              spent on the actual question. Everything before it is plumbing —
              and the plumbing is what makes the answer true.
            </p>

            <CommercialModule
              hook="Grounded means every number comes from your database, not the model's memory. Ask LENS a question in a demo and trace where the answer came from."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The payoff: a &quot;bad&quot; model can be the right model
            </h2>
            <p>
              Here is the honest version of our own case. The model inside Seal
              AI is <strong>gpt-oss-120b</strong>. On SimpleQA — a benchmark of
              short open-world factual questions — it scores{" "}
              <strong>0.168 accuracy with a 0.782 hallucination rate</strong>.
              Read cold, that looks disqualifying. A model that confidently
              invents answers to four out of five general-knowledge questions is
              not something you would want narrating a revenue report.
            </p>
            <p>
              Except it is never asked a general-knowledge question. Nobody opens
              an analytics tool to find out who won a 1994 election. The
              assistant is asked to read entrances, conversions, channels and
              bounce rates that arrived in its context window a moment ago, and
              to explain what they mean. The capability being measured by
              SimpleQA is one the product deliberately does not use.
            </p>
            <p>
              What the product <em>does</em> use, the same model is strong at:
              MMLU 90.0, MMLU-Pro 80.8, GPQA Diamond 80.1 without tools, and —
              most relevant here — reliable function calling against a large tool
              inventory. Grounding is what lets you spend your model budget on
              the capabilities that matter and ignore the ones that don&apos;t.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Grounding you trust is grounding you tested
            </h2>
            <p>
              An architecture that <em>should</em> prevent invention is not the
              same as one that does. Models can call a tool, get a partial
              answer, and then quietly fill the gap with something reasonable.
              The only way to know is to check every number.
            </p>
            <p>
              That is how we ran our own{" "}
              <Link
                href="https://docs.sealmetrics.com/lens/seal-ai/internal-benchmark"
                className="text-text-primary border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors no-underline"
              >
                internal benchmark
              </Link>
              : 18 scenarios in two languages, three passes, three candidate
              models — 162 live queries against the real production assistant
              endpoint with the real 63-tool inventory. Before each run the
              harness computed <strong>ground truth directly from the analytics
              database</strong> — entrances, conversions, bounce rate, revenue,
              top channel, top source, top device — so every figure the assistant
              asserted could be compared to reality by a deterministic grader,
              not by a human reading along and nodding.
            </p>
            <p>
              The shipped model asserted <strong>144 of 144 verified facts</strong>{" "}
              correctly. Every single fact miss in the entire run traced back to
              one badly phrased question of ours, which we will come back to.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Traps: asking about things that do not exist
            </h2>
            <p>
              Checking correct answers only tells you half the story. The
              interesting failure is not a wrong number — it is a number where
              there should have been an admission.
            </p>
            <p>
              So each language block included <strong>grounding traps</strong>:
              questions about a campaign that was never run, or a period for
              which the account holds no data. There is exactly one right
              behaviour — say the data is not there, and say why. Anything
              fluent and numeric is a failure, no matter how well written.
            </p>
            <p>
              The results were more interesting than a pass/fail table. The
              shipped model passed <strong>18 of 18</strong> traps (95% Wilson
              confidence interval 0.82-1.00). One alternative,
              mistral-small-3.2, passed 9 of 18 — and its failure mode was
              subtle. Asked about a nonexistent campaign, it correctly
              acknowledged the absence, then <em>drifted</em> into describing
              other real campaigns with figures nobody asked for. That is not
              invention; the numbers were true. It is answering a different
              question, which in a report is its own kind of wrong. In English
              it also claimed a false incapability — &quot;I don&apos;t have
              access to the necessary tools&quot; — instead of explaining the
              data&apos;s time boundary.
            </p>
            <p>
              The Wilson intervals matter here: the winner&apos;s interval no
              longer overlaps mistral&apos;s, so at this sample size that gap is
              statistically meaningful rather than a lucky run.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The question we got wrong
            </h2>
            <p>
              One scenario asked for &quot;traffic by device for the last
              month&quot;. That admits two readings: the last 30 days, which was
              our ground truth, or the previous calendar month. Some models chose
              the calendar month, where the test account held only five days of
              data, and answered with those <em>real</em> numbers. The grader
              marked them as misses.
            </p>
            <p>
              They were not hallucinations. They were correct answers to a
              question we had phrased badly. One hundred per cent of the fact
              misses in the whole run trace to that single scenario. We reworded
              it, and we keep the defect documented, because a benchmark that
              only reports its flattering results is a demo. The same applies to
              our first full run, which we discarded entirely: the harness
              revealed that the assistant was reusing the chat session between
              queries, letting later models read earlier models&apos; history. We
              fixed it, re-ran, and archived both.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What this means when you use the assistant
            </h2>
            <p>
              Practically: ask it <em>why</em>. A grounded assistant can tell you
              which metric, which period and which breakdown produced a figure,
              because it fetched them seconds ago. If an assistant cannot show
              you its evidence, the number is a claim, not a measurement.
            </p>
            <p>
              And test it once with something that does not exist — a campaign
              you never ran, a month before you installed the tracker. The answer
              you want is the boring one: there is no data for that. An assistant
              willing to say &quot;I don&apos;t have that&quot; is the only kind
              worth believing when it says it does.
            </p>
            <p>
              More on how the model was chosen in{" "}
              <Link
                href="/blog/best-llm-for-data-analytics"
                className="text-text-primary border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors no-underline"
              >
                the write-up of the 162-query benchmark
              </Link>
              , and on the architecture behind it in the{" "}
              <Link
                href="https://docs.sealmetrics.com/lens/seal-ai/private-ai-architecture"
                className="text-text-primary border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors no-underline"
              >
                Seal AI architecture documentation
              </Link>
              .
            </p>
          </div>

          <CommercialModule
            hook="A grounded assistant is only as good as the data underneath — LENS queries data without consent gaps. Test it on the question your team argued about last week."
          />

          <FaqSection items={FAQ} locale="en" />

          <RelatedReading currentSlug={SLUG} />
        </div>
      </article>
    </>
  );
}
