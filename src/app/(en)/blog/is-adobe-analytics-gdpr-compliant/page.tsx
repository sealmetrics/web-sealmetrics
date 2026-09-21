import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";

export const metadata: Metadata = {
  title: "Is Adobe Analytics GDPR Compliant?",
  // La versión anterior resolvía la pregunta del buscador dentro del propio
  // snippet ("can be deployed compliantly under GDPR") y no daba ningún
  // motivo para entrar — además de hacerle a Adobe el trabajo de
  // tranquilizar al lector. 903 impresiones en posición 6,4 y cero clicks
  // en 30 días. Esta responde igual de honestamente pero deja el coste
  // fuera del snippet, que es lo que la página aporta y el listado del
  // blog (src/lib/content/blog.ts) ya contaba mejor que la propia página.
  description:
    "Yes — with consent, a DPA and a transfer assessment. But visitors who reject consent go unmeasured, so the lawful dataset misses part of your audience.",
  openGraph: {
    title: "Is Adobe Analytics GDPR Compliant?",
    description:
      "Compliance is a property of your deployment, not of the tool. What Adobe requires, and the coverage you pay for it.",
    type: "article",
    url: "https://sealmetrics.com/blog/is-adobe-analytics-gdpr-compliant/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/is-adobe-analytics-gdpr-compliant.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Is Adobe Analytics GDPR Compliant?",
    description: "Compliance is a property of your deployment, not of the tool. What Adobe requires, and the coverage you pay for it.",
    images: ["https://sealmetrics.com/og/blog/is-adobe-analytics-gdpr-compliant.png"],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/is-adobe-analytics-gdpr-compliant",
  },
};

const linkCls =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";

export default function Page() {
  const dates = postDates("is-adobe-analytics-gdpr-compliant");

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: "Is Adobe Analytics GDPR Compliant?" },
        ]}
      />
      <JsonLd
        data={articleSchema({
          headline: "Is Adobe Analytics GDPR Compliant?",
          description:
            "Adobe Analytics can be deployed in a GDPR-compliant way. What that requires in practice, and what the compliant configuration costs in data coverage.",
          ...dates,
          url: "/blog/is-adobe-analytics-gdpr-compliant",
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
          {
            name: "Is Adobe Analytics GDPR Compliant?",
            url: "/blog/is-adobe-analytics-gdpr-compliant",
          },
        ])}
      />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Regulation
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              Is Adobe Analytics GDPR Compliant?
            </h1>
            <PostByline
              {...dates}
              readTime="8 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <QuickAnswer>
            Adobe Analytics can be deployed in a GDPR-compliant way, and many
            European enterprises run it lawfully today. Compliance is a property
            of the configuration, not of the product. A compliant Adobe
            deployment needs four things: prior consent before the tracking
            cookies are set, a signed Data Processing Agreement, a documented
            transfer assessment covering Adobe&rsquo;s US parent company, and
            retention and privacy settings configured deliberately rather than
            left at default. The cost is not legal, it is statistical. Because
            Adobe collects through cookies, the consent requirement is
            load-bearing — and the visitors who reject it are never measured;
            how many depends on sector, brand strength and traffic mix. You end
            up with a lawful dataset that is missing a large part of your audience. The
            question worth asking is not whether Adobe can be compliant, but
            whether a compliant Adobe still answers the questions you bought it
            for.
          </QuickAnswer>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body mt-12">
            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              The question hides two different laws
            </h2>
            <p>
              Most discussion of analytics and GDPR conflates two frameworks that
              apply independently, and the confusion is where bad answers come
              from.
            </p>
            <p>
              The{" "}
              <Link href="/glossary/eprivacy-directive" className={linkCls}>
                ePrivacy Directive
              </Link>{" "}
              governs storage on and access to a user&rsquo;s device. Article 5(3)
              requires consent before you write anything to a visitor&rsquo;s
              browser, and it applies whether or not the stored value is personal
              data. GDPR governs the processing of personal data, wherever it
              comes from. A tool can engage one, the other, or both.
            </p>
            <p>
              Adobe Analytics engages both. It sets cookies, which triggers ePrivacy
              Article 5(3) regardless of what those cookies contain, and it
              processes identifiers that are personal data under GDPR. So the
              honest answer to &ldquo;is it compliant&rdquo; is: it is compliant
              when you have satisfied both, and neither is satisfied by default.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              What a compliant Adobe deployment actually requires
            </h2>
            <p>
              <strong>Prior consent.</strong> The Experience Cloud ID service sets
              identifiers before Adobe Analytics can attribute anything. Under
              Article 5(3) that has to wait for an affirmative signal from the
              visitor. Not implied consent, not legitimate interest — ePrivacy
              does not offer the legitimate-interest route that GDPR does for some
              processing.
            </p>
            <p>
              <strong>A Data Processing Agreement.</strong> Adobe acts as your
              processor. Article 28 requires the contract, and your record of
              processing activities has to reflect it.
            </p>
            <p>
              <strong>A transfer assessment — and this is more nuanced than it is
              usually presented.</strong> The lazy version of this argument says
              Adobe is a US company, therefore data leaves the EU, therefore
              Schrems II kills it. Our own measurement says otherwise: when we{" "}
              <Link href="/blog/analytics-tools-external-domains" className={linkCls}>
                catalogued the external domains every analytics tool contacts
              </Link>
              , Adobe&rsquo;s collection endpoints resolved inside the EU —{" "}
              <code className="font-mono text-[0.9em]">dpm.demdex.net</code> on
              AWS Dublin, alongside{" "}
              <code className="font-mono text-[0.9em]">sc.omtrdc.net</code> and the
              Akamai-hosted tag manager. Server location is not the whole test,
              though. Schrems II is about legal access regimes, not geography, so
              the assessment turns on Adobe Inc.&rsquo;s corporate structure and
              the safeguards in place — which is a genuine legal exercise for your
              counsel, not a line item you can settle from a blog post.
            </p>
            <p>
              <strong>Deliberate configuration.</strong> Retention windows, IP
              obfuscation and the privacy settings in the Experience Cloud ID
              service all ship with defaults that were not chosen for your risk
              posture. A DPO reviewing the deployment will ask who chose them and
              when.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              None of that is the expensive part
            </h2>
            <p>
              Every item above is solvable. Enterprises solve them routinely, and
              the paperwork is a one-off. The recurring cost is the one nobody
              signs off on, because it does not appear on an invoice.
            </p>
            <p>
              Consent is load-bearing in that architecture. Adobe measures the
              visitors who accepted your banner and no one else. In European
              eCommerce, the share of visitors who reject consent depends on sector, brand strength and traffic mix,
              and a fully compliant deployment never sees them, which means a fully compliant Adobe deployment is reporting on a filtered
              subset of your real traffic — and not a random subset. The visitors who reject
              banners skew by device, by browser, by acquisition channel and by
              privacy posture. You are not sampling your audience, you are
              selecting a biased slice of it and calling it the audience.
            </p>
            <p>
              We measured a related effect directly. In a 30-day parallel run on a
              European media site, Sealmetrics recorded 25% more pageviews than
              Adobe with Adobe firing <em>without</em> a consent gate at all — the
              gap coming from privacy filter lists blocking its collection
              endpoints and a pageview that fires roughly three seconds into the
              load, so any visit that bounces earlier never existed. Put the
              consent banner back in front and the gap widens from there.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              The architectural answer
            </h2>
            <p>
              There is a second route, and it is the one European regulators have
              been signposting. If a tool sets nothing on the device, ePrivacy
              Article 5(3) is not engaged. If it collects no personal data, the
              GDPR consent question does not arise either. Compliance stops being
              a configuration you maintain and becomes a property of the
              architecture.
            </p>
            <p>
              That is the basis for{" "}
              <Link href="/consentless-analytics" className={linkCls}>
                consentless analytics
              </Link>
              , and the reason the coverage problem disappears with it: there is no
              banner to reject, so those visitors never go missing in the first
              place. The trade is real and worth stating plainly — you give up
              individual-level analysis, cross-session stitching and audience
              activation, because those are exactly the capabilities that require
              the identifiers you are no longer collecting.
            </p>
            <p>
              For teams that need Adobe&rsquo;s segmentation depth, the two are not
              mutually exclusive. Replacing the collection layer while keeping
              Adobe for analyst-driven work is a common arrangement, and it is
              covered in the{" "}
              <Link href="/vs/adobe-analytics" className={linkCls}>
                head-to-head comparison
              </Link>
              . If you are weighing a move away from Adobe entirely, the{" "}
              <Link href="/alternatives/adobe-analytics" className={linkCls}>
                five realistic alternatives
              </Link>{" "}
              separate on this exact axis — four of the five are cookie-based, so
              they inherit the same consent gap.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              So — is it compliant?
            </h2>
            <p>
              Yes, if you do the work: consent before the cookies, a signed DPA, a
              documented transfer assessment, and configuration you actually chose.
              Adobe gives you every mechanism you need to get there.
            </p>
            <p>
              But compliance was never the interesting question. The interesting
              question is what a compliant deployment can still tell you, and the
              answer is: whatever the visitors who accepted your banner permitted it to. If your
              reports have stopped reconciling with revenue, that number is where
              to look first — before you blame the attribution model.
            </p>
            <p className="text-[0.95rem] text-text-tertiary pt-4">
              This is an assessment of how the technology interacts with the
              regulation, not legal advice. Your DPO or counsel owns the
              conclusion for your deployment.
            </p>
          </div>

          <CommercialModule
            hook="If the expensive part is making Adobe compliant, the alternative is an architecture designed for compliance from the start: no cookies, no consent dependency, EU-hosted. Compare the two costs."
          />

          <RelatedReading currentSlug="is-adobe-analytics-gdpr-compliant" />
        </div>
      </article>
    </>
  );
}
