import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { getAlternates } from "@/lib/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Is Matomo GDPR Compliant?",
  description:
    "Matomo can run banner-free in France under the CNIL criteria. What that configuration requires, what it costs you in measurement, and where it does not apply.",
  openGraph: {
    title: "Is Matomo GDPR Compliant?",
    description:
      "Yes, under six cumulative conditions — and the exemption is French, not European. What the consent-exempt configuration costs you in measurement.",
    type: "article",
    url: "https://sealmetrics.com/blog/is-matomo-gdpr-compliant/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/blog/is-matomo-gdpr-compliant/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Is Matomo GDPR Compliant?",
    description:
      "Yes, under six cumulative conditions — and the exemption is French, not European. What the consent-exempt configuration costs you in measurement.",
    images: [ogImage("/blog/is-matomo-gdpr-compliant/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/is-matomo-gdpr-compliant/",
    languages: getAlternates("/blog/is-matomo-gdpr-compliant"),
  },
};

const linkCls =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";

export default function Page() {
  const dates = postDates("is-matomo-gdpr-compliant");

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: "Is Matomo GDPR Compliant?" },
        ]}
      />
      <JsonLd
        data={articleSchema({
          headline: "Is Matomo GDPR Compliant?",
          description:
            "Matomo can be run without a cookie banner under the CNIL exemption criteria, with cookies still enabled. What the six conditions require, what the configuration costs in measurement, and why the exemption does not travel to Germany.",
          ...dates,
          url: "/blog/is-matomo-gdpr-compliant",
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
            name: "Is Matomo GDPR Compliant?",
            url: "/blog/is-matomo-gdpr-compliant",
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
              Is Matomo GDPR Compliant?
            </h1>
            <PostByline
              {...dates}
              readTime="9 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <QuickAnswer>
            Yes — and unusually among cookie-based analytics tools, Matomo can
            run without a consent banner while still setting cookies. France&rsquo;s
            CNIL publishes criteria under which audience measurement is exempt
            from consent, and a correctly configured Matomo meets them. Six
            conditions have to hold at once: the tool serves audience
            measurement only, data is not cross-referenced with other
            processing, nothing is transmitted to third parties, IP addresses
            are anonymised, cookie lifetime is capped at 13 months and retention
            at 25. Matomo ships a CNIL configuration mode to set this up. Two
            things are usually left out of the answer. First, the exemption is
            French: Germany&rsquo;s §25 TDDDG recognises no equivalent analytics
            carve-out, so the same configuration still needs a banner there.
            Second, the exempt configuration is not free — it costs you returning
            visitor recognition, visit frequency, multi-session campaign
            attribution and cohorts, because Matomo without a durable identifier
            falls back to a hash that expires in about 30 minutes.
          </QuickAnswer>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body mt-12">
            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              The question involves two laws, and Matomo engages both
            </h2>
            <p>
              &ldquo;GDPR compliant&rdquo; is the phrase everyone uses, but GDPR
              alone never decides whether you need a cookie banner. Two
              instruments apply independently, and conflating them is where most
              vendor answers go wrong.
            </p>
            <p>
              The{" "}
              <Link href="/glossary/eprivacy-directive" className={linkCls}>
                ePrivacy Directive
              </Link>{" "}
              governs storing information on, or reading information from, a
              visitor&rsquo;s device. Article 5(3) applies whether or not the
              stored value is personal data — a purely technical identifier still
              counts. GDPR governs the processing of personal data, wherever it
              came from. In its default installation Matomo engages both: it
              writes first-party cookies, and it processes IP addresses that are
              personal data until they are truncated.
            </p>
            <p>
              So the honest form of the question is not &ldquo;is Matomo
              compliant&rdquo; but &ldquo;under what configuration, in which
              member state, and at what cost to the numbers.&rdquo;
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              The CNIL route: banner-free with cookies still on
            </h2>
            <p>
              This is the part that surprises people, including people who sell
              against Matomo. The French exemption does not require you to turn
              cookies off. It requires the cookies to be harmless in a specific,
              enumerated way. Since 2020 the CNIL has published criteria for
              audience measurement that is exempt from consent, and the July 2025
              update refreshed the self-assessment behind them.
            </p>
            <p>
              Six conditions have to hold together. The tool must serve audience
              measurement and nothing else — no advertising targeting, no
              profiling, no content personalisation. The data must not be
              cross-referenced with other processing. Nothing may be transmitted
              to third parties. IP addresses must be anonymised. Cookie lifetime
              is capped at 13 months, and raw data retention at 25. Fail one and
              consent becomes mandatory again for the whole deployment.
            </p>
            <p>
              In practice, configuring Matomo for this means disabling device
              fingerprinting, disabling user profiles, disabling the Heatmaps and
              Session Recording plugins, truncating the last two octets of the
              IP, anonymising User ID and Order ID, and setting the retention
              windows explicitly. Matomo provides a CNIL compliance mode in the
              interface that applies most of it, which is more than most vendors
              in this category offer. The{" "}
              <Link href="/gdpr-analytics/france" className={linkCls}>
                criterion-by-criterion breakdown of the CNIL exemption
              </Link>{" "}
              covers what each condition means for an implementation.
            </p>
            <p>
              One structural change worth knowing: the CNIL retired its published
              list of exempt solutions on 1 January 2026. The criteria are
              unchanged — what disappeared is the official label. Suppliers now
              self-assess against the same requirements, which means the burden of
              evidencing the configuration sits with you and your vendor rather
              than with a badge on a regulator&rsquo;s website.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              What the exempt configuration costs you
            </h2>
            <p>
              Compliance is the part that gets discussed. The measurement bill is
              the part that arrives later.
            </p>
            <p>
              With cookies constrained or disabled, Matomo identifies a visit
              using <code className="font-mono text-[0.9em]">config_id</code>, a
              hash of environmental attributes. Matomo is careful about this and
              deserves credit for it: <code className="font-mono text-[0.9em]">config_id</code>{" "}
              is deliberately built <em>not</em> to be permanent, <em>not</em> to
              recognise returning visitors and <em>not</em> to allow tracking
              across sites. It is a genuinely more privacy-protective design than
              the fingerprinting it is often mistaken for. But the same property
              that makes it defensible makes it short-sighted, literally: the
              default lookback window is around 30 minutes, and 24 hours at the
              outside.
            </p>
            <p>
              The consequences are specific rather than general. Pageviews,
              events, downloads, outlinks and site search come through intact.
              What degrades is returning-visitor counts, visit frequency,
              multi-session campaign attribution, cohort analysis and
              multi-channel attribution reports. A visitor who arrives from a
              paid campaign in the morning and converts from an email in the
              afternoon is two unrelated visitors. For a content site that is a
              rounding error. For eCommerce with a considered purchase cycle, it
              is the difference between knowing which channel earns revenue and
              guessing.
            </p>
            <p>
              This is the trade the compliance conversation usually skips, and it
              is worth putting a number on for your own site before you assume it
              is small. Our{" "}
              <Link href="/data-loss-calculator" className={linkCls}>
                data loss calculator
              </Link>{" "}
              models the gap between traffic you receive and traffic your current
              setup actually attributes.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              The exemption is French, not European
            </h2>
            <p>
              ePrivacy is a directive, not a regulation, which means each member
              state transposed it into national law and the national versions
              differ. This is the single most common error in analytics
              compliance claims — vendors and buyers alike treat a French answer
              as a European one.
            </p>
            <p>
              Germany transposed Article 5(3) as §25 TDDDG (the act was renamed
              from TTDSG in May 2024; the section number is unchanged), and it
              recognises no audience-measurement carve-out equivalent to the
              CNIL&rsquo;s. Consent is required for storing or reading anything
              on the device that is not strictly necessary for a service the user
              requested, and analytics is not strictly necessary. A Matomo
              configured exactly to the CNIL criteria, deployed on a German
              site, still needs a banner. The German DSK does accept that tools
              which set nothing on the device and process no personal data fall
              outside the requirement — but that is a different architecture, not
              a different configuration.
            </p>
            <p>
              If you operate across the EU, the practical question is which of
              your markets you are configuring for, and whether you are prepared
              to run different consent postures per country.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              What the Digital Omnibus would change
            </h2>
            <p>
              On 19 November 2025 the European Commission published COM(2025)
              837, the Digital Omnibus. As drafted it would move the
              terminal-device rules out of ePrivacy and into the GDPR under a new
              Article 88a, and exempt first-party, aggregated audience
              measurement for the controller&rsquo;s own use from consent across
              the Union.
            </p>
            <p>
              If it is adopted broadly as written, a Matomo in exempt
              configuration would qualify everywhere rather than only in France —
              the French carve-out generalised rather than removed. That is a
              genuine improvement in Matomo&rsquo;s position, and pretending
              otherwise would be dishonest. Two caveats belong with it. It is a
              proposal, not law: Parliament and Council have yet to agree a text,
              substantive amendments are likely, and adoption is realistically
              2027–2028. And it changes nothing about the measurement cost above
              — a consent-exempt configuration still cannot recognise a returning
              visitor, whichever legal instrument blesses it.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              The architectural alternative
            </h2>
            <p>
              There is a second route to the same place, and it is the one that
              does not depend on holding a configuration correct over time. If a
              tool writes nothing to the device and reads nothing from it,
              Article 5(3) is not engaged at all. If it processes no personal
              data, the GDPR consent question does not arise either. Compliance
              stops being a setting your team has to maintain and evidence, and
              becomes a property of how collection works.
            </p>
            <p>
              That is the basis for{" "}
              <Link href="/consentless-analytics" className={linkCls}>
                consentless analytics
              </Link>
              , and it is why the coverage problem does not reappear: there is no
              banner to reject and no exempt configuration to trade features
              against. The limits are real and worth stating plainly — no
              individual-level analysis, no cross-session stitching, no audience
              activation, because those need precisely the identifiers that are
              not being collected. If you want the feature-level differences
              rather than the legal ones, the{" "}
              <Link href="/vs/matomo" className={linkCls}>
                head-to-head comparison with Matomo
              </Link>{" "}
              covers hosting, operations and reporting parity.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              So — is it compliant?
            </h2>
            <p>
              Yes, with conditions, and Matomo is one of the better-behaved tools
              in this category. It is open source, it is self-hostable, it does
              not sample your data, it publishes its configuration guidance, and
              its approach to visitor identification is more privacy-protective
              than the industry norm. If your site is content-driven, your market
              is France, and session-level measurement answers your questions,
              Matomo in exempt configuration is a reasonable choice.
            </p>
            <p>
              The question that outlasts the compliance one is what the compliant
              configuration can still tell you. A tool that is lawful in one
              member state, needs a banner in another, and cannot connect a
              visit on Tuesday to the same person&rsquo;s purchase on Thursday is
              answering a narrower question than most eCommerce teams think they
              are buying. That is not a flaw in Matomo. It is the cost of
              reaching compliance through configuration instead of through
              architecture.
            </p>
            <p className="text-[0.95rem] text-text-tertiary pt-4">
              This is an assessment of how the technology interacts with the
              regulation, not legal advice. Your DPO or counsel owns the
              conclusion for your deployment.
            </p>
          </div>

          <CommercialModule hook="If the compliant Matomo configuration is the one that stops recognising returning visitors, the trade is measurement for paperwork. See what consent-independent, banner-free measurement looks like on your own traffic." />

          <RelatedReading currentSlug="is-matomo-gdpr-compliant" />
        </div>
      </article>
    </>
  );
}
