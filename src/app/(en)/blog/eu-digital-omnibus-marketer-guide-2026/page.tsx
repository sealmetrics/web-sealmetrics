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
  title: "EU Digital Omnibus: Marketer Guide 2026",
  description:
    "Cookie banners could vanish for 60% of websites. First-party analytics gets explicit legal authorization. A deep dive into COM(2025) 837.",
  openGraph: {
    title: "The EU Digital Omnibus Explained: Marketer Guide 2026",
    description:
      "Cookie banners could vanish for 60% of websites. Complete guide to COM(2025) 837.",
    type: "article",
    url: "https://sealmetrics.com/blog/eu-digital-omnibus-marketer-guide-2026/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/eu-digital-omnibus-marketer-guide-2026.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "The EU Digital Omnibus Explained: Marketer Guide 2026",
    description: "Cookie banners could vanish for 60% of websites. Complete guide to COM(2025) 837.",
    images: ["https://sealmetrics.com/og/blog/eu-digital-omnibus-marketer-guide-2026.png"],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/eu-digital-omnibus-marketer-guide-2026/",
  },
};

export default function OmnibusGuidePage() {
  const dates = postDates("eu-digital-omnibus-marketer-guide-2026");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "EU Digital Omnibus Marketer Guide" }]} />
      <JsonLd data={articleSchema({ headline: "The EU Digital Omnibus Explained: What Every Marketer Needs to Know in 2026", description: "Cookie banners could vanish for 60% of websites. First-party analytics gets explicit legal authorization.", ...dates, url: "/blog/eu-digital-omnibus-marketer-guide-2026", category: "Regulation", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "EU Digital Omnibus Marketer Guide", url: "/blog/eu-digital-omnibus-marketer-guide-2026" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Regulation
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            The EU Digital Omnibus Explained: What Every Marketer Needs to Know in 2026
          </h1>
          <PostByline
              {...dates}
              readTime="6 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
        </header>

        <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
          <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li>The Digital Omnibus consolidates 5+ EU data regulations into 2, with cookie banners potentially vanishing for ~60% of websites that use only first-party analytics.</li>
            <li>Article 88a(3)(c) explicitly permits aggregated audience measurement by the website controller for its own use without consent — first-party analytics gets clear legal authorization.</li>
            <li>Cookie implementation currently costs European businesses an estimated 820 million euros annually; projected savings by 2029 exceed 5 billion euros.</li>
            <li>GA4 involves Google as a third party and may not qualify for the exemption — first-party, privacy-respecting solutions are better positioned.</li>
            <li>The EDPB and EDPS support the analytics aggregation exemption, cookie consent reform, and the higher breach notification threshold in their Joint Opinion 2/2026.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">

          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] text-[0.9rem] my-6">
            <p className="font-medium text-text-primary mb-2">TL;DR</p>
            <p>
              Cookie banners could vanish for approximately 60% of websites.{" "}
              <Link href="/glossary/first-party-data-collection" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">First-party analytics</Link>{" "}
              receives explicit legal authorization.
              European businesses stand to save an estimated &euro;1 billion
              annually.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What is the Digital Omnibus?
          </h2>

          <p>
            On November 19, 2025, the European Commission released proposal{" "}
            <a href="https://digital-strategy.ec.europa.eu/en/library/digital-omnibus-regulation-proposal" target="_blank" rel="noopener noreferrer">COM(2025) 837</a>. It consolidates five separate data regulations into
            just two, making it the most comprehensive overhaul of
            Europe&apos;s digital governance framework since{" "}
            <Link href="/glossary/gdpr-analytics-compliance" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GDPR</Link>.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-[0.9rem] border-collapse">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-2.5 pr-4 text-text-secondary font-medium">Current law</th>
                  <th className="text-left py-2.5 text-text-secondary font-medium">Becomes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">GDPR</td>
                  <td className="py-2.5 text-text-primary font-medium">Updated GDPR (incorporates cookie rules, AI provisions)</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">ePrivacy Directive</td>
                  <td className="py-2.5 text-text-body">Partially merged into GDPR</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Data Governance Act</td>
                  <td className="py-2.5 text-text-primary font-medium">Merged into Data Act</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Open Data Directive</td>
                  <td className="py-2.5 text-text-body">Merged into Data Act</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Free Flow of Data Regulation</td>
                  <td className="py-2.5 text-text-body">Merged into Data Act</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">P2B Regulation</td>
                  <td className="py-2.5 text-red-alert font-medium">Repealed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Why should you care?
          </h2>

          <p>
            The business impact is significant. Cookie implementation costs
            European businesses an estimated &euro;820 million annually. The
            projected total savings by 2029 exceed &euro;5 billion. Currently,
            334 million hours are wasted yearly on cookie interactions alone.
          </p>

          <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-8 mb-3">
            The cookie banner revolution
          </h3>

          <p>
            Consent rules move from the <a href="https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32002L0058" target="_blank" rel="noopener noreferrer">ePrivacy Directive</a> into <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer">GDPR</a> with a
            crucial modification: common use cases no longer require consent.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-warm-white border border-warm-100 rounded-[4px]">
              <p className="text-[0.75rem] font-medium uppercase tracking-wider text-green-muted mb-3">
                No consent required
              </p>
              <div className="text-[0.85rem] space-y-2 text-text-body">
                <p>— First-party audience measurement (aggregated)</p>
                <p>— Functional cookies (carts, language, sessions)</p>
                <p>— Security cookies (fraud prevention, DDoS)</p>
              </div>
            </div>
            <div className="p-5 bg-warm-white border border-warm-100 rounded-[4px]">
              <p className="text-[0.75rem] font-medium uppercase tracking-wider text-red-alert mb-3">
                Still requires consent
              </p>
              <div className="text-[0.85rem] space-y-2 text-text-body">
                <p>— Third-party tracking pixels</p>
                <p>— Cross-site profiling</p>
                <p>— Advertising retargeting</p>
                <p>— External data sharing</p>
              </div>
            </div>
          </div>

          <p>
            Article 88a(3)(c) explicitly permits &ldquo;creating aggregated
            information about the usage of an online service to measure the
            audience of such a service, where it is carried out by the
            controller of that online service solely for its own use.&rdquo;
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Key changes you need to know
          </h2>

          <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-8 mb-3">
            1. GDPR updates
          </h3>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-[0.9rem] border-collapse">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-2.5 pr-4 text-text-secondary font-medium">Change</th>
                  <th className="text-left py-2.5 text-text-secondary font-medium">Implication</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Personal data definition</td>
                  <td className="py-2.5 text-text-body">&ldquo;Reasonably likely to be used&rdquo; standard codified</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Breach notifications</td>
                  <td className="py-2.5 text-text-body">Only &ldquo;high risk&rdquo; breaches require reporting</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Research exemptions</td>
                  <td className="py-2.5 text-text-body">Expanded for technology development</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Access requests</td>
                  <td className="py-2.5 text-text-body">Easier rejection of abusive requests</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-8 mb-3">
            2. New cookie consent rules (Articles 88a & 88b)
          </h3>

          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] text-[0.9rem] my-6 space-y-3">
            <p>— One-click rejection mandatory (equal prominence to &ldquo;accept&rdquo;)</p>
            <p>— Six-month cooling-off period before re-requesting consent</p>
            <p>— Browsers must respect automated privacy preferences (24-48 month window)</p>
          </div>

          <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-8 mb-3">
            3. AI and data processing (Article 88c)
          </h3>

          <p>
            A new legitimate interest legal basis for AI development with
            safeguards including data minimization and unconditional objection
            rights.
          </p>

          <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-8 mb-3">
            4. SME & mid-cap relief
          </h3>

          <p>
            Companies with up to 749 employees receive extended exemptions,
            reduced fees, and simplified pathways — saving &euro;5-19 million
            annually sector-wide.
          </p>

          <CommercialModule
            hook="Whatever the final text says, consent-free measurement is unaffected — there is nothing to re-paper. See how consentless analytics sidesteps the timeline."
          />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Timeline
          </h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-[0.9rem] border-collapse">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-2.5 pr-4 text-text-secondary font-medium">Milestone</th>
                  <th className="text-left py-2.5 text-text-secondary font-medium">Expected date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Proposal published</td>
                  <td className="py-2.5 text-green-muted font-medium">November 19, 2025</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Parliament & Council review</td>
                  <td className="py-2.5 text-text-body">Q1-Q2 2026</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Final adoption</td>
                  <td className="py-2.5 text-text-body">Late 2026 / Early 2027</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Cookie rules apply (Art. 88a)</td>
                  <td className="py-2.5 text-text-primary font-medium">~Q1 2028</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Browser signals required (sites)</td>
                  <td className="py-2.5 text-text-body">~Q3 2029</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-2.5 pr-4 text-text-body">Browser signals required (browsers)</td>
                  <td className="py-2.5 text-text-body">~Q3 2031</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Regulatory position: EDPB-EDPS opinion
          </h2>

          <p>
            On February 10, 2026, the European Data Protection Board and
            Supervisor issued Joint Opinion 2/2026. They support the
            simplification goals, cookie consent reform, higher breach
            notification threshold, and the analytics aggregation exemption.
            They opposed changes to the personal data definition and
            Commission control over breach notification templates.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Winners and losers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-warm-white border border-warm-100 rounded-[4px]">
              <p className="text-[0.75rem] font-medium uppercase tracking-wider text-green-muted mb-3">
                Winners
              </p>
              <div className="text-[0.85rem] space-y-2 text-text-body">
                <p>— First-party analytics users</p>
                <p>— SMEs and mid-caps</p>
                <p>— Privacy-respecting businesses</p>
                <p>— End users (fewer banners)</p>
              </div>
            </div>
            <div className="p-5 bg-warm-white border border-warm-100 rounded-[4px]">
              <p className="text-[0.75rem] font-medium uppercase tracking-wider text-red-alert mb-3">
                Losers
              </p>
              <div className="text-[0.85rem] space-y-2 text-text-body">
                <p>— Third-party tracking networks</p>
                <p>— Behavioral advertising platforms</p>
                <p>— Consent management platform vendors</p>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What to do now
          </h2>

          <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-8 mb-3">
            Immediate actions (2026)
          </h3>

          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] text-[0.9rem] my-6 space-y-3">
            <p>
              <span className="font-medium text-text-primary">1.</span>{" "}
              Audit your analytics stack — what tools do you use? Are they first-party or third-party?
            </p>
            <p>
              <span className="font-medium text-text-primary">2.</span>{" "}
              Review tracking implementation — identify what qualifies for the exemption and what still needs consent
            </p>
            <p>
              <span className="font-medium text-text-primary">3.</span>{" "}
              Evaluate privacy-first alternatives for the tools that will still require consent
            </p>
          </div>

          <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-8 mb-3">
            Pre-implementation (late 2026-2027)
          </h3>

          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] text-[0.9rem] my-6 space-y-3">
            <p>
              <span className="font-medium text-text-primary">4.</span>{" "}
              Update privacy policies
            </p>
            <p>
              <span className="font-medium text-text-primary">5.</span>{" "}
              Plan your cookie banner strategy
            </p>
            <p>
              <span className="font-medium text-text-primary">6.</span>{" "}
              Train your team on the new framework
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            FAQ
          </h2>

          <div className="space-y-6 my-6">
            <div>
              <p className="font-medium text-text-primary mb-2">
                Does the Digital Omnibus replace GDPR?
              </p>
              <p className="text-[0.95rem]">
                No. It amends GDPR and integrates the previously separate
                ePrivacy cookie rules into it.
              </p>
            </div>
            <div>
              <p className="font-medium text-text-primary mb-2">
                When will cookie banners disappear?
              </p>
              <p className="text-[0.95rem]">
                Starting approximately Q1 2028, websites using only
                first-party aggregated analytics may remove banners entirely.
                Sites using third-party tracking still need them.
              </p>
            </div>
            <div>
              <p className="font-medium text-text-primary mb-2">
                What counts as &ldquo;aggregated&rdquo; data?
              </p>
              <p className="text-[0.95rem]">
                Data not relating to specific identifiable individuals: total
                views, visitor counts, traffic sources, popular pages — not
                individual journeys or profiles.
              </p>
            </div>
            <div>
              <p className="font-medium text-text-primary mb-2">
                Does this affect Google Analytics?
              </p>
              <p className="text-[0.95rem]">
                Standard GA4 involves Google as a third party, which may
                disqualify it from the exemption. First-party solutions are
                better positioned.
              </p>
            </div>
            <div>
              <p className="font-medium text-text-primary mb-2">
                Does this apply to non-EU businesses?
              </p>
              <p className="text-[0.95rem]">
                Yes, if you offer goods or services to EU residents or monitor
                their behavior (GDPR territorial scope).
              </p>
            </div>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The bottom line
          </h2>

          <p>
            The Digital Omnibus represents pragmatic evolution of European
            data law. First-party, privacy-respecting analytics receives
            clear legal validation. Cookie friction decreases for legitimate
            measurement. Third-party tracking faces increasing regulatory
            headwinds.
          </p>

          <p>
            Businesses that adopt first-party relationships and
            privacy-respecting measurement will outperform those clinging to
            third-party tracking.{" "}
            <Link
              href="/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Learn how cookieless analytics works
            </Link>{" "}
            or{" "}
            <Link
              href="/data-loss-calculator"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              calculate how much data you are losing today
            </Link>
            .
          </p>
        </div>

        <CommercialModule
          hook="You can wait for the final text, or measure completely now. A setup of 5 to 30 minutes, depending on your platform, shows what your consent-gated analytics is missing today."
        />

        {/* Related */}
        <div className="mt-16 pt-10 border-t border-warm-100">
          <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
            Related articles
          </h3>
          <div className="space-y-3">
            <Link
              href="/blog/eu-digital-omnibus-cookie-banners-analytics"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              The EU Digital Omnibus: What It Means for Cookie Banners and Analytics
            </Link>
            <Link
              href="/blog/uk-pecr-analytics-exemption"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              UK Analytics Exemption Is Now Live: Our PECR Self-Assessment
            </Link>
            <Link
              href="/blog/cnil-self-assessment-published"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              We Published Our CNIL Self-Assessment
            </Link>
          </div>
        </div>
      </div>
        <RelatedReading currentSlug="eu-digital-omnibus-marketer-guide-2026" />
    </article>
    </>
  );
}
