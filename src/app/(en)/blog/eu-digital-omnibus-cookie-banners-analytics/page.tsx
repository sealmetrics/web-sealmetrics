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
  title: "EU Digital Omnibus: Cookie Banners & Analytics",
  description:
    "The European Commission proposed the biggest change to EU data law since GDPR. Cookie consent moves to GDPR, and first-party analytics may not require consent.",
  openGraph: {
    title: "EU Digital Omnibus: Cookie Banners & Analytics",
    description:
      "COM(2025) 837 could eliminate cookie banners for first-party analytics. Here is what changed.",
    type: "article",
    url: "https://sealmetrics.com/blog/eu-digital-omnibus-cookie-banners-analytics/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/eu-digital-omnibus-cookie-banners-analytics.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "EU Digital Omnibus: Cookie Banners & Analytics",
    description: "COM(2025) 837 could eliminate cookie banners for first-party analytics. Here is what changed.",
    images: ["https://sealmetrics.com/og/blog/eu-digital-omnibus-cookie-banners-analytics.png"],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/eu-digital-omnibus-cookie-banners-analytics/",
  },
};

export default function OmnibusShortPage() {
  const dates = postDates("eu-digital-omnibus-cookie-banners-analytics");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "EU Digital Omnibus and Analytics" }]} />
      <JsonLd data={articleSchema({ headline: "The EU Digital Omnibus: What It Means for Cookie Banners and Analytics", description: "The European Commission proposed the biggest change to EU data law since GDPR.", ...dates, url: "/blog/eu-digital-omnibus-cookie-banners-analytics", category: "Regulation", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "EU Digital Omnibus and Analytics", url: "/blog/eu-digital-omnibus-cookie-banners-analytics" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Regulation
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            The EU Digital Omnibus: What It Means for Cookie Banners and Analytics
          </h1>
          <PostByline
              {...dates}
              readTime="7 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
        </header>

        <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
          <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li>The EU Digital Omnibus (COM(2025) 837) would repeal the ePrivacy Directive cookie rules and move them into GDPR — first-party analytics for your own use would not require consent if data is aggregated.</li>
            <li>Cookie consent banners must include single-click refuse buttons with equal prominence to "accept," and re-asking is prohibited for 6 months after a decline.</li>
            <li>Browser-based consent signals (similar to Global Privacy Control) become mandatory — websites must respect them within 24 months, browsers must implement within 48 months.</li>
            <li>Expected timeline: final adoption late 2026/early 2027, cookie rules apply ~6 months after entry into force.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            On November 19, 2025, the European Commission released proposal{" "}
            <a href="https://digital-strategy.ec.europa.eu/en/library/digital-omnibus-regulation-proposal" target="_blank" rel="noopener noreferrer">COM(2025) 837</a> — the Digital Omnibus. If adopted, it would be the
            biggest change to EU data law since GDPR came into force in 2018.
          </p>

          <p>
            The proposal directly addresses cookie consent, browser-level
            privacy signals, and the legal treatment of first-party analytics.
            For marketing teams that have spent years navigating the gap between
            privacy law and data completeness, this matters. Here is what
            the proposal says, what it changes, and what it means for your
            analytics setup. For the post-Omnibus framework for{" "}
            <Link href="/consentless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">consentless analytics</Link>,
            see the pillar.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Five laws become two
          </h2>

          <p>
            Currently, EU data operations require navigating GDPR, the
            ePrivacy Directive, the Data Act, the Data Governance Act, the
            Open Data Directive, the Free Flow of Data Regulation, and the
            Platform-to-Business Regulation. The Omnibus proposes
            consolidating these into two instruments: an amended GDPR and a
            consolidated Data Act. The P2B Regulation would be repealed
            entirely.
          </p>

          <p>
            This matters for analytics because the ePrivacy Directive — the
            2002 law that created cookie consent requirements — would be
            absorbed into GDPR. Instead of two overlapping legal frameworks
            governing cookies and data collection, there would be one.
            The practical effect: fewer ambiguities, fewer conflicting DPA
            interpretations, and a single set of rules for the entire EU.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Cookie consent moves to GDPR
          </h2>

          <p>
            The proposal would repeal <a href="https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32002L0058" target="_blank" rel="noopener noreferrer">Article 5(3) of the ePrivacy Directive</a>
            — the legal basis for cookie consent banners. Cookie rules would
            move into GDPR itself, under a new Article 88a, with a crucial
            modification:{" "}
            <Link
              href="/glossary/cookieless-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              first-party analytics
            </Link>{" "}
            for your own use would not require consent if the data is
            aggregated and not shared with third parties.
          </p>

          <p>
            The exact wording in Article 88a(3) creates an exemption for
            &ldquo;audience measuring&rdquo; where the data controller
            processes information solely for statistical purposes on their
            own website, provided the data is aggregated and no individual
            user profiles are created. Third-party tracking and cross-site
            measurement still require explicit consent.
          </p>

          <p>
            This distinction is critical. Tools like GA4 send data to
            Google&rsquo;s servers — a third party — and create individual
            user profiles via cookies. Under the proposed rules, GA4 would
            still require consent. A{" "}
            <Link
              href="/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              first-party cookieless tool
            </Link>{" "}
            that aggregates data without identifying individuals would not.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Stricter rules for consent banners
          </h2>

          <p>
            For tools that still require consent, the Omnibus tightens
            banner requirements significantly. The proposal mandates
            single-click refuse buttons with equal visual prominence to
            &ldquo;accept.&rdquo; No more dark patterns where
            &ldquo;reject&rdquo; is buried three clicks deep.
          </p>

          <p>
            Additionally, websites are prohibited from re-asking for consent
            for six months after a user declines. This directly targets the
            practice of showing consent banners on every visit until the
            user gives in — a pattern the{" "}
            <a href="https://www.cnil.fr/en/cookies-and-other-tracking-devices-cnil-publishes-new-guidelines" target="_blank" rel="noopener noreferrer">French CNIL</a>{" "}
            and other DPAs have criticized but lacked specific legal basis
            to enforce uniformly.
          </p>

          <p>
            The combined effect of equal-prominence reject buttons and the
            six-month re-ask prohibition will likely push consent rejection
            losses beyond what they already cost: in our experience with clients, between 40% and 60% of traffic doesn&apos;t accept cookies today.
            For cookie-dependent analytics, this means even more{" "}
            <Link
              href="/blog/consent-banner-impact-on-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              data loss from consent banners
            </Link>
            .
          </p>

          <CommercialModule
            hook="Consent-free measurement does not wait for browser signals or the final text — there is no banner to redesign. See what that removes from your roadmap."
          />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Browser signals are coming
          </h2>

          <p>
            Article 88b introduces mandatory support for browser-based
            consent signals. Websites must respect these signals within 24
            months of entry into force, and browsers must implement them
            within 48 months.
          </p>

          <p>
            This functions similarly to <a href="https://globalprivacycontrol.org/" target="_blank" rel="noopener noreferrer">Global Privacy Control</a> (GPC), but with
            EU-wide legal enforcement behind it. When a user sets their
            browser to &ldquo;reject non-essential cookies,&rdquo; every
            website in the EU must respect that signal automatically. No
            banner, no interaction, no per-site decision.
          </p>

          <p>
            For marketing teams, browser signals represent a structural
            shift. Once major browsers implement default privacy signals —
            and Safari, Firefox, and Brave are already moving in this
            direction — the percentage of visitors who implicitly reject
            tracking could exceed 50% even before a consent banner appears.
            Cookie-based analytics will lose data at a rate that makes
            current losses look modest.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Countries already ahead of the Omnibus
          </h2>

          <p>
            France and the UK have already implemented similar exemptions.
            The CNIL (France&rsquo;s DPA) published{" "}
            <a href="https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications" target="_blank" rel="noopener noreferrer">specific criteria</a>{" "}
            for analytics tools that can operate without consent: no
            cross-site tracking, no individual profiles, data used only
            for aggregated audience measurement. Sealmetrics{" "}
            <Link
              href="/blog/cnil-self-assessment-published"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              published its CNIL self-assessment
            </Link>{" "}
            meeting all 14 technical criteria.
          </p>

          <p>
            The UK went further with the{" "}
            <Link
              href="/blog/uk-pecr-analytics-exemption"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Data Use and Access Act 2025
            </Link>
            , which explicitly exempts certain analytics from PECR consent
            requirements. The EU Omnibus proposal would harmonize this approach
            across all 27 member states, eliminating the current patchwork
            of national interpretations.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Timeline
          </h2>

          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] text-[0.9rem] my-6 space-y-3">
            <p>
              <span className="font-medium text-text-primary">Commission proposal:</span>{" "}
              November 19, 2025 (published)
            </p>
            <p>
              <span className="font-medium text-text-primary">Parliament and Council review:</span>{" "}
              2026 (ongoing)
            </p>
            <p>
              <span className="font-medium text-text-primary">Final adoption:</span>{" "}
              Late 2026 or early 2027 (expected)
            </p>
            <p>
              <span className="font-medium text-text-primary">Cookie rules apply:</span>{" "}
              ~6 months after entry into force
            </p>
            <p>
              <span className="font-medium text-text-primary">Website browser signals:</span>{" "}
              24 months after entry into force
            </p>
            <p>
              <span className="font-medium text-text-primary">Browser implementation:</span>{" "}
              48 months after entry into force
            </p>
          </div>

          <p>
            The legislative process will involve amendments from both the
            European Parliament and the Council. The analytics exemption and
            browser signal provisions are likely to see debate, but the
            general direction — simplification and stronger enforcement —
            has broad political support.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What this means for your analytics
          </h2>

          <p>
            If you use first-party, aggregated analytics — and nothing else
            that requires consent — you may not need a cookie banner at all
            once the Omnibus is adopted. France and the UK already permit
            this approach. The EU proposal would standardize it across all
            member states.
          </p>

          <p>
            If you rely on GA4 or other cookie-based tools, the picture is
            less favorable. Stricter consent banners, browser-level rejection
            signals, and the continued requirement for consent when data
            goes to third parties will compound the{" "}
            <Link
              href="/blog/why-ga4-misses-traffic"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              data loss problem that already keeps part of your traffic out of GA4
            </Link>
            . On Incapto&apos;s Shopify store, measured side by side over 48 days,{" "}
            <Link href="/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GA4 did not record 29% of visits</Link>
            .
          </p>

          <p>
            The practical recommendation is straightforward: evaluate whether
            your analytics infrastructure qualifies for the first-party
            exemption. If it does, you are already positioned for a
            post-Omnibus world. If it does not, the gap between what you
            measure and what actually happens on your site will only grow.
          </p>

          <p>
            Learn{" "}
            <Link href="/how-it-works" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">how cookieless collection works</Link>{" "}
            or read our{" "}
            <Link
              href="/blog/eu-digital-omnibus-marketer-guide-2026"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              complete marketer&apos;s guide to the Digital Omnibus
            </Link>{" "}
            for a deeper analysis of every provision.
          </p>
        </div>

        <CommercialModule
          hook="Whatever the Omnibus lands on, consent banners already hide part of your traffic today. Measure how much on your own site now."
        />

        {/* Related */}
        <div className="mt-16 pt-10 border-t border-warm-100">
          <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
            Related articles
          </h3>
          <div className="space-y-3">
            <Link
              href="/blog/eu-digital-omnibus-marketer-guide-2026"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              The EU Digital Omnibus Explained: What Every Marketer Needs to Know in 2026
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
        <RelatedReading currentSlug="eu-digital-omnibus-cookie-banners-analytics" />
    </article>
    </>
  );
}
