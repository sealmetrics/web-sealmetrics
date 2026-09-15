import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { RelatedGlossaryTerms } from "@/components/ui/RelatedGlossaryTerms";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Personal Data in Analytics — Sealmetrics Glossary",
  description:
    "GDPR applies only to personal data. When analytics data is personal, when it is genuinely anonymous, and why ePrivacy still applies either way.",
  openGraph: {
    title: "Personal Data in Analytics: When GDPR Applies",
    description:
      "The Article 4(1) test, the Recital 26 anonymity bar, and the ePrivacy trap that catches analytics collecting no personal data at all.",
    type: "article",
    url: "https://sealmetrics.com/glossary/personal-data-in-analytics/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/personal-data-in-analytics")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Personal Data in Analytics: When GDPR Applies",
    description: "The Article 4(1) test, the Recital 26 anonymity bar, and the ePrivacy trap that catches analytics collecting no personal data at all.",
    images: [ogImage("/glossary/personal-data-in-analytics")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/personal-data-in-analytics",
  },
};

const linkCls =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";

export default function PersonalDataInAnalyticsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Glossary", href: "/glossary" },
          { label: "Personal Data in Analytics" },
        ]}
      />
      <JsonLd
        data={definedTermSchema({
          name: "Personal Data in Analytics",
          description:
            "Information in a web analytics dataset that relates to an identified or identifiable natural person under GDPR Article 4(1). Analytics data that cannot be linked back to an individual by any means reasonably likely to be used falls outside GDPR's material scope, though ePrivacy still governs storage on the device.",
          url: "/glossary/personal-data-in-analytics",
          related: [
            { name: "GDPR Analytics Compliance", url: "/glossary/gdpr-analytics-compliance" },
            { name: "ePrivacy Directive", url: "/glossary/eprivacy-directive" },
            { name: "Cookieless Analytics", url: "/glossary/cookieless-analytics" },
            { name: "Legitimate Interest Analytics", url: "/glossary/legitimate-interest-analytics" },
          ],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Glossary", url: "/glossary" },
          {
            name: "Personal Data in Analytics",
            url: "/glossary/personal-data-in-analytics",
          },
        ])}
      />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Definition
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              Personal Data in Analytics
            </h1>
          </header>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
              <p className="text-[1rem] text-text-primary font-medium">
                Information in an analytics dataset that relates to an identified
                or identifiable natural person, as defined by GDPR Article 4(1).
                GDPR applies only to personal data — so analytics that genuinely
                processes none falls outside its scope entirely. The ePrivacy
                Directive still applies either way.
              </p>
            </div>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Why this question decides everything else
            </h2>
            <p>
              GDPR has a material scope. Article 2 limits it to the processing of
              personal data, and Article 4(1) defines that as information relating
              to an identified or <em>identifiable</em> natural person. If a
              dataset contains no personal data, GDPR does not apply to it — not
              in a reduced form, not with lighter obligations. It is out of scope.
            </p>
            <p>
              That is why &ldquo;can we do analytics without personal data?&rdquo;
              is a more useful question than &ldquo;what is our legal basis?&rdquo;
              A lawful basis is something you need once you are inside the
              regulation. Staying outside it removes the consent question, the
              data subject rights machinery, and the transfer assessment in one
              move.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What counts as personal data in an analytics dataset
            </h2>
            <p>
              More than most teams expect. &ldquo;Identifiable&rdquo; does not
              require a name. Under Article 4(1) it covers anyone who can be
              identified &ldquo;directly or indirectly, in particular by reference
              to an identifier.&rdquo; In practice, standard analytics collects
              several:
            </p>
            <p>
              — <strong>IP addresses.</strong> Settled as personal data in EU case
              law, including when only the site operator plus a third party could
              combine information to identify someone.
              <br />— <strong>Cookie and device identifiers.</strong> A random ID
              that persistently distinguishes one browser from another is an
              identifier, even though it carries no name.
              <br />— <strong>Fingerprints.</strong> Derived identifiers assembled
              from device and browser characteristics count too — the mechanism
              does not matter, the singling-out does.
              <br />— <strong>Combinations.</strong> Fields that are innocuous
              alone can identify someone together, which is why granular
              timestamps plus location plus device can be personal data even
              without an ID.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The bar for calling data anonymous
            </h2>
            <p>
              Recital 26 sets it, and it is higher than the word suggests in
              everyday use. Data is anonymous when the person is not identifiable
              by any means <em>reasonably likely to be used</em> — by you or by
              anyone else. That is an objective test about what is possible, not a
              statement of your intentions.
            </p>
            <p>
              Two consequences that catch people out. First,{" "}
              <strong>pseudonymised data is not anonymous</strong>: if an
              identifier can be reversed or rejoined with a key, the data is still
              personal and still in scope. Hashing an email produces pseudonymous
              data, not anonymous data. Second, <strong>aggregation is only
              anonymous if it is irreversible</strong> — a report so sparse that a
              single row describes one person has not anonymised anything.
            </p>
            <p>
              The practical test is whether a single individual can be singled out
              from the dataset. If a row can be traced to one person, it is
              personal data regardless of what the column is called.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The trap: ePrivacy does not care
            </h2>
            <p>
              This is the part most guidance on this topic omits, and it is where
              teams get caught.
            </p>
            <p>
              Escaping GDPR does <em>not</em> escape the{" "}
              <Link href="/glossary/eprivacy-directive" className={linkCls}>
                ePrivacy Directive
              </Link>
              . Article 5(3) governs the <em>storage of, or access to,</em>{" "}
              information on a user&rsquo;s device, and it applies regardless of
              whether the stored value is personal data. A cookie holding a purely
              random number, containing nothing personal at all, still requires
              consent — because the act of writing it to the device is the
              regulated event.
            </p>
            <p>
              So there are two separate tests, and analytics has to clear both to
              run without a banner:
            </p>
            <p>
              — <strong>GDPR:</strong> is any personal data processed? If no, out
              of scope.
              <br />— <strong>ePrivacy:</strong> is anything stored on or read
              from the device? If no, Article 5(3) is not engaged.
            </p>
            <p>
              A tool that collects no personal data but still sets a cookie passes
              the first and fails the second. Only a tool that does neither can
              lawfully measure without consent.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What this looks like in practice
            </h2>
            <p>
              It means giving things up, and it is worth being explicit about
              which. Analytics that processes no personal data cannot reconstruct
              an individual&rsquo;s journey, cannot recognise a returning visitor
              as the same person, cannot build audience segments for activation,
              and cannot attribute across sessions. Those capabilities all depend
              on the identifiers that put you in scope.
            </p>
            <p>
              What it keeps is the measurement most commercial decisions actually
              run on: how many people arrived, from which channel and campaign,
              what they did, and what revenue resulted — attributed{" "}
              <Link href="/glossary/last-click-attribution" className={linkCls}>
                last-click
              </Link>{" "}
              without consent gaps rather than on the consenting fraction.
            </p>
            <p>
              This is the architecture behind{" "}
              <Link href="/consentless-analytics" className={linkCls}>
                consentless analytics
              </Link>
              : no identifiers, no device storage, aggregate event measurement
              only. Because neither test is engaged, the consent banner stops
              being a data-loss path — which matters when consent rejection costs 15–60% of EU visitors,
              depending on sector, brand strength and traffic mix. The longer legal argument is in the{" "}
              <Link href="/blog/gdpr-eprivacy-analytics-legal-assessment" className={linkCls}>
                two-part legal assessment
              </Link>
              , and the consent-specific case in{" "}
              <Link href="/blog/gdpr-analytics-without-consent" className={linkCls}>
                analytics without consent banners
              </Link>
              .
            </p>

            <QuickAnswer label="In short">
              GDPR applies only to personal data, defined in Article 4(1) as
              information relating to an identified or identifiable person. IP
              addresses, cookie IDs, device fingerprints and revealing field
              combinations all qualify, so most conventional analytics is in
              scope. Data is anonymous only when nobody could identify an
              individual by any means reasonably likely to be used — a higher bar
              than pseudonymisation, which stays in scope because it can be
              reversed. Analytics processing genuinely no personal data falls
              outside GDPR entirely. But that is only half the question: the
              ePrivacy Directive, Article 5(3), separately requires consent before
              storing or reading anything on a device, whether or not it is
              personal. A cookie containing a random number still needs consent.
              Measuring without a banner therefore requires clearing both tests —
              no personal data and no device storage.
            </QuickAnswer>

            <p className="text-[0.95rem] text-text-tertiary pt-4">
              This is an explanation of how the regulation applies to analytics
              technology, not legal advice. Your DPO or counsel owns the
              conclusion for your deployment.
            </p>
          </div>

          <CommercialModule hook="Sealmetrics stores no personal data — not pseudonymised, none. See what analytics looks like when there is nothing to redact." />

          <RelatedGlossaryTerms slug="personal-data-in-analytics" />
        </div>
      </article>
    </>
  );
}
