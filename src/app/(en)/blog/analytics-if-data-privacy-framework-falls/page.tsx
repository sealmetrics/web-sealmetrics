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

const SLUG = "analytics-if-data-privacy-framework-falls";
const URL = `/blog/${SLUG}`;
const TITLE = "What Happens to Your Analytics if the EU-US Data Privacy Framework Falls";
const DESCRIPTION =
  "The Data Privacy Framework survived its first challenge, faces a pending appeal at the CJEU and a fresh one announced in 2026. Here is which analytics and AI setups would need re-papering overnight — and which never depended on it.";

export const metadata: Metadata = {
  title: "Analytics if the EU-US Data Privacy Framework Falls",
  description: "The Data Privacy Framework faces a pending CJEU appeal. Which analytics and AI setups would need re-papering overnight — and which never depended on it.",
  openGraph: {
    title: "If the EU-US Data Privacy Framework Falls",
    description:
      "The DPF's legal status right now, the Safe Harbor and Privacy Shield precedent, and which analytics stacks are structurally immune to the outcome.",
    type: "article",
    url: "https://sealmetrics.com/blog/analytics-if-data-privacy-framework-falls/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/analytics-if-data-privacy-framework-falls.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "If the EU-US Data Privacy Framework Falls",
    description: "The DPF's legal status right now, the Safe Harbor and Privacy Shield precedent, and which analytics stacks are structurally immune to the outcome.",
    images: ["https://sealmetrics.com/og/blog/analytics-if-data-privacy-framework-falls.png"],
  },
  alternates: {
    languages: getAlternates("/blog/analytics-if-data-privacy-framework-falls"),
    canonical: `https://sealmetrics.com${URL}`,
  },
};

const FAQ = [
  {
    question: "Is the EU-US Data Privacy Framework still valid in 2026?",
    answer:
      "Yes, it remains in force. The first annulment action, Latombe v Commission (T-553/23), was dismissed by the EU General Court on 3 September 2025. An appeal, C-703/25 P, was lodged on 31 October 2025 and is pending before the Court of Justice of the EU. Separately, noyb wrote to the Commission on 30 June 2026 and announced a fresh challenge. The Framework is valid today; its future is genuinely uncertain.",
  },
  {
    question: "What is Schrems III and would it affect analytics?",
    answer:
      "Schrems III is the informal name given to the fresh challenge to the EU-US Data Privacy Framework announced by noyb in 2026, following a US Supreme Court ruling that June on removal protections for FTC commissioners. If a challenge ultimately succeeded, every EU-to-US transfer resting on the Framework would need an alternative legal basis. Analytics and AI vendors that transfer personal data to US-jurisdiction providers would be directly affected.",
  },
  {
    question: "What happens to my analytics if the Data Privacy Framework is struck down?",
    answer:
      "Any flow of personal data to a US provider that relies on the Framework as its Chapter V basis would lose that basis on the day of the ruling. You would need Standard Contractual Clauses plus a Transfer Impact Assessment and supplementary measures, renegotiated with each affected vendor. Setups where no personal data leaves the EU, and where the processor has no US parent, are unaffected because Chapter V is never engaged.",
  },
  {
    question: "Have EU-US data transfer agreements been struck down before?",
    answer:
      "Twice. Safe Harbor was invalidated in 2015 and Privacy Shield in 2020, each after a challenge reached the Court of Justice of the EU. The Data Privacy Framework is the third arrangement of its kind. That history is not a prediction about the current case, but it is the reason many European data protection officers treat Framework-dependent architectures as carrying standing risk rather than settled certainty.",
  },
  {
    question: "How do I make my analytics stack independent of EU-US transfer rules?",
    answer:
      "Remove the transfer rather than paper it. If your analytics collects no personal data at all, and any AI processing runs on a provider incorporated in the EU with no US parent, GDPR Chapter V is not triggered — there is no international transfer to justify. That is an architectural property, so it does not change when case law does.",
  },
];

export default function AnalyticsIfDataPrivacyFrameworkFallsPage() {
  const dates = postDates("analytics-if-data-privacy-framework-falls");

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Regulation",
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
          { name: "If the Data Privacy Framework Falls", url: URL },
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
        items={[
          { label: "Blog", href: "/blog" },
          { label: "If the Data Privacy Framework Falls" },
        ]}
      />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Regulation
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              What Happens to Your Analytics if the EU-US Data Privacy Framework Falls
            </h1>
            <PostByline
              {...dates}
              readTime="6 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Nobody knows how the pending challenges to the EU-US Data Privacy
            Framework will end. That is precisely the point: if your analytics
            stack has an answer that depends on the ruling, you are carrying a
            risk you cannot price. Some architectures do not have an opinion on
            the outcome at all.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
              Key Takeaways
            </h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>
                The Framework is valid today. Latombe v Commission was dismissed on
                3 September 2025; an appeal (C-703/25 P) is pending at the CJEU and
                a fresh challenge was announced in 2026.
              </li>
              <li>
                Its two predecessors, Safe Harbor and Privacy Shield, were both
                struck down — which is why treating the current Framework as
                permanent is a bet rather than a plan.
              </li>
              <li>
                If it fell, every Framework-dependent transfer would need a new
                Chapter V basis at once: Standard Contractual Clauses, a Transfer
                Impact Assessment and supplementary measures, per vendor.
              </li>
              <li>
                An architecture where no personal data leaves the EU and the
                processor has no US parent never triggers Chapter V, so it is
                indifferent to how the litigation ends.
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Ask a European marketing team what legal basis underpins their
              analytics stack and you will usually get an answer about consent.
              Ask what underpins the flow of that data to a US-owned vendor and
              the room goes quieter. In most cases the answer is the EU-US Data
              Privacy Framework — a Commission adequacy decision that a lot of
              tooling quietly stands on.
            </p>
            <p>
              It is worth knowing exactly how solid that ground is, and what
              happens on the morning it is not.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Where the Framework actually stands
            </h2>
            <p>
              Three things are true at once, and mixing them up is where most
              commentary goes wrong.
            </p>
            <p>
              <strong>It is in force.</strong> The first annulment action,{" "}
              <em>Latombe v Commission</em> (T-553/23), was{" "}
              <strong>dismissed</strong> by the EU General Court on 3 September
              2025. The Framework survived. Anyone telling you it has already
              been invalidated is wrong.
            </p>
            <p>
              <strong>It is under appeal.</strong> An appeal against that
              dismissal, case <strong>C-703/25 P</strong>, was lodged on 31
              October 2025 and is pending before the Court of Justice of the EU.
              Appeals of this kind take time, and the outcome is unknown.
            </p>
            <p>
              <strong>A second front opened in 2026.</strong> After a June 2026
              US Supreme Court ruling on removal protections for FTC
              commissioners — a ruling that touches the independence of US
              oversight bodies — noyb wrote to the European Commission on 30 June
              2026 and announced a fresh challenge, widely nicknamed
              &quot;Schrems III.&quot;
            </p>
            <p>
              None of that tells you how any of it ends. Litigation outcomes are
              not forecastable, and we are not going to pretend otherwise. What
              it tells you is that the Framework is a live legal question rather
              than a settled one, and that a plan which requires it to survive is
              a plan with an unpriced dependency.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Why the history matters
            </h2>
            <p>
              The Data Privacy Framework is the third arrangement of its kind.
              Safe Harbor came first and was struck down. Privacy Shield replaced
              it and was struck down too. The Framework replaced that.
            </p>
            <p>
              Two invalidations do not make a third inevitable — the Framework
              was negotiated specifically to address the deficiencies the Court
              identified, and it has already won once in court. But the pattern
              explains why experienced data protection officers treat
              transfer-dependent architectures as carrying standing risk. Each
              previous collapse produced the same scramble: contracts reopened,
              assessments redone, some vendors quietly dropped.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What re-papering would actually involve
            </h2>
            <p>
              If the Framework were invalidated, the adequacy decision would stop
              being a lawful basis for transfers relying on it. Personal data
              flowing to affected US providers would then need an alternative
              Chapter V route, which in practice means Standard Contractual
              Clauses plus a Transfer Impact Assessment plus supplementary
              measures — assessed per vendor, per data category, per processing
              purpose.
            </p>
            <p>
              For a mid-sized marketing stack, that is not a document. That is a
              project. Analytics, tag management, A/B testing, CDP, email,
              advertising platforms, session replay and now the AI features
              bolted onto several of them. Each with its own paperwork, its own
              subprocessor chain and its own account manager to chase.
            </p>
            <p>
              And a Transfer Impact Assessment is not a formality. It requires
              you to assess whether the destination country&apos;s law permits
              access by public authorities in a way that undermines the
              safeguards — the exact question the Court has answered
              unfavourably twice before regarding US surveillance law. That is
              why the previous rounds were so painful.
            </p>

            <CommercialModule
              hook="If your analytics never exports personal data, there is nothing to re-paper. See what a structurally immune setup looks like before the next Schrems."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Which setups are structurally immune
            </h2>
            <p>
              Here is the part worth internalising. Chapter V of the GDPR governs
              transfers of personal data to third countries. It engages when two
              conditions are met: there is personal data, and it goes somewhere
              outside the EU or to a party under foreign jurisdiction.
            </p>
            <p>
              Break either condition and the chapter never applies. Not
              &quot;applies but is satisfied&quot; — never applies.
            </p>
            <p>
              The first way to break it is to collect nothing that identifies anyone. Analytics
              that never collects IPs or cookies and keeps no persistent visitor
              identifier has nothing that identifies anyone to transfer in the first place.
              The second is to keep processing with an EU-incorporated processor
              that has no US parent, so no extraterritorial regime reaches it.
            </p>
            <p>
              Do both and the litigation becomes a spectator sport. That is the
              design behind{" "}
              <Link
                href="https://docs.sealmetrics.com/lens/seal-ai/private-ai-architecture"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Seal AI
              </Link>
              : inference runs on Scaleway Generative APIs in Paris only.
              Scaleway is a French company whose parent is the Iliad group, with
              no US ownership, and it states explicitly that its AI services are
              not subject to extraterritorial laws such as the American CLOUD
              Act. It sits in our subprocessor list as a plain Article 28
              processor — Scaleway SAS, Paris, France, purpose LLM inference,
              retention zero. There are no Standard Contractual Clauses in that
              chain because there is nothing for them to cover.
            </p>
            <p>
              The related trap is assuming an EU region solves it. It does not:
              the CLOUD Act follows the corporate parent rather than the
              datacenter, which is the distinction we unpack in{" "}
              <Link
                href="/blog/residency-is-not-sovereignty"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Residency Is Not Sovereignty
              </Link>
              .
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What to check in your stack this quarter
            </h2>
            <p>
              This is a two-afternoon exercise, and it is worth doing before any
              ruling rather than after one.
            </p>
            <ol className="space-y-3 pl-6 list-decimal marker:text-text-tertiary">
              <li>
                <strong>List every vendor that touches visitor data</strong> —
                including the AI features that appeared inside tools you already
                had. Those often arrived with a new subprocessor and no new
                contract review.
              </li>
              <li>
                <strong>For each, write down the Chapter V basis.</strong>{" "}
                Adequacy under the Data Privacy Framework, Standard Contractual
                Clauses, a derogation, or &quot;none needed, no transfer.&quot; If
                nobody in the company can say which, that is the finding.
              </li>
              <li>
                <strong>Flag everything in the first bucket.</strong> Those are
                the items that would need work on day one of an adverse ruling.
                Rank them by how much traffic or revenue depends on them.
              </li>
              <li>
                <strong>Check the AI layer separately.</strong> Ask where
                inference runs, exclusively, and who owns that entity. A vendor
                may host its application in the EU while calling a model
                elsewhere.
              </li>
              <li>
                <strong>Ask each flagged vendor what their plan is.</strong> The
                quality of that answer is itself information. Some have a real
                EU-processing path ready; some have a paragraph of reassurance.
              </li>
            </ol>
            <p>
              You are not trying to rip out your stack. You are trying to know,
              in advance, exactly how long the list is — so that if the day comes,
              you are executing a plan rather than discovering the scope.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The bottom line
            </h2>
            <p>
              The Data Privacy Framework may well survive both challenges. We
              have no view on the merits and no crystal ball. But there is a
              meaningful difference between a compliance position that requires a
              court to rule a particular way and one that does not care.
            </p>
            <p>
              The second kind is not cleverer lawyering. It is an architectural
              choice made earlier: collect nothing personal, process inside the
              EU with a processor no foreign statute can reach, and there is no
              transfer to defend. Case law changes. Architecture does not.
            </p>
          </div>

          <CommercialModule
            hook="Aggregate-only, EU-hosted measurement does not care which framework survives. Check your own stack against that bar in a 30-minute review."
          />

          <FaqSection items={FAQ} locale="en" />

          <RelatedReading currentSlug={SLUG} />
        </div>
      </article>
    </>
  );
}
