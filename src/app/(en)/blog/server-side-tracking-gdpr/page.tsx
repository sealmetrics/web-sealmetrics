import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { getAlternates } from "@/lib/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqSection } from "@/components/ui/FaqSection";
import { articleSchema, breadcrumbSchema, faqPageSchema, speakableWebPageSchema } from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

/**
 * Phase 4 of CONTENT-PLAN-PROBLEM-POSITIONING.md, post 7: problem D,
 * query "server-side tracking GDPR Europe". Regulatory tone follows PR #186:
 * conditional, no deployment "is exempt", no certification.
 *
 * Sources (checked 14 Sep 2026):
 * - EDPB Guidelines 2/2023 on the technical scope of Art. 5(3) ePrivacy
 *   Directive, version 2.0 adopted 7 October 2024: para 10 (quoting CJEU
 *   Planet49, C-673/17, para 70: protection applies to any information stored
 *   in terminal equipment regardless of whether it is personal data); para 33
 *   (JavaScript instructing the browser to send asynchronous requests with the
 *   targeted information falls within Art. 5(3)); paras 50-51 (URL and pixel
 *   tracking); paras 54-55 (IP-only tracking); para 56 (applicability does not
 *   systematically mean consent is needed; exemptions to be assessed).
 * - Google Tag Platform, server-side tagging introduction: a server container
 *   on a first-party domain processes and routes data to collection servers.
 * - CNIL, "Mesure d'audience et transferts de données" (2022): proxy conditions
 *   for Google Analytics — no transfer of the IP address, replacement of the
 *   user identifier, deletion of URL parameters, removal of the external
 *   referrer, reprocessing of user agents, no cross-site collection, hosting
 *   without transfer outside adequate protection; changing IP settings alone
 *   is not enough.
 * - docs.sealmetrics.com security-privacy/what-we-track: no cookies or device
 *   storage; IP used in memory only, not persisted; session marker in memory
 *   ~2 hours; country from browser timezone; event rows purged after 1 day.
 * - The HttpOnly, server-set FPID cookie is described as a Set-Cookie response
 *   from the server container (widely documented; stated here only as "a
 *   cookie the server sets"), not as a Google quote.
 */

const SLUG = "server-side-tracking-gdpr";
const URL = `/blog/${SLUG}`;
const HEADLINE = "Server-Side Tracking and GDPR: What It Changes, and What It Does Not";
const DESCRIPTION =
  "Server-side tracking moves where data is processed, not whether you need consent or a legal basis. What ePrivacy, GDPR and the CNIL say, and what it changes.";
const EDPB_URL =
  "https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf";
const CNIL_URL =
  "https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/google-analytics-et-transferts-de-donnees-comment-mettre-son-outil-de-mesure-daudience-en-conformite";

export const metadata: Metadata = {
  title: "Server-Side Tracking and GDPR: What It Does Not Change",
  description: DESCRIPTION,
  openGraph: {
    title: "Server-Side Tracking and GDPR: What It Changes, and What It Does Not",
    description:
      "A server container is not a consent exemption. ePrivacy Art. 5(3), the EDPB's 2024 guidelines, the CNIL's proxy conditions, and what server-side can genuinely improve.",
    type: "article",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Server-Side Tracking and GDPR: What It Changes, and What It Does Not",
    description:
      "A server container is not a consent exemption. ePrivacy Art. 5(3), the EDPB's 2024 guidelines, the CNIL's proxy conditions, and what server-side can genuinely improve.",
    images: [ogImage(`${URL}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(URL),
  },
};

const FAQ = [
  {
    question: "Does server-side tracking make GA4 GDPR compliant?",
    answer:
      "Not on its own. A server container changes where data is processed and what is forwarded, but the legal questions stay: whether anything is stored on or read from the device, whether personal data such as IP addresses or identifiers is processed, on what legal basis, and whether data is transferred outside the EU. Server-side can help answer them well; it does not answer them by existing.",
  },
  {
    question: "Does server-side tracking remove the need for cookie consent?",
    answer:
      "No. Consent under Article 5(3) of the ePrivacy Directive depends on storing or accessing information on the user's device, not on where the data is processed afterwards. A cookie set by your server is still stored on the device, and the EDPB's 2024 guidelines treat JavaScript that instructs the browser to send information as gaining access. Whether an exemption applies is assessed case by case.",
  },
  {
    question: "Is server-side tracking cookieless?",
    answer:
      "Not necessarily. Many server-side setups keep a first-party cookie, often set by the server container itself through an HTTP response header so that it lasts longer in browsers that restrict script-set cookies. That cookie is still stored on the visitor's device. Server-side and cookieless are independent choices.",
  },
  {
    question: "What did the CNIL say about using a proxy server for Google Analytics?",
    answer:
      "In its 2022 guidance on audience measurement and data transfers, the CNIL described a proxy that could reduce transfer risks only with a set of measures: no transfer of the IP address to the tool's servers, replacing the user identifier, deleting URL parameters, removing the external referrer, reprocessing user agents, no cross-site collection and appropriate hosting. It said changing IP settings alone is not enough.",
  },
  {
    question: "Does ePrivacy apply if no personal data is collected?",
    answer:
      "It can. The EDPB, citing the Court of Justice in Planet49, states that the protection of Article 5(3) applies to any information stored in terminal equipment regardless of whether it is personal data. GDPR is a separate question: it applies when personal data is processed. An analytics setup has to pass both tests, which is why removing personal data does not by itself settle the consent question.",
  },
  {
    question: "Is Sealmetrics server-side tracking?",
    answer:
      "Partly. A small script in the browser sends each hit to Sealmetrics, optionally through a subdomain of your own, and processing happens on servers in Dublin; on Shopify, purchases arrive server-side by webhook. It sets no cookies and stores nothing on the device, and it does not persist IP addresses or user identifiers. Whether that configuration is exempt from consent in your market depends on your national authority's criteria.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const h3 = "font-serif text-[1.15rem] font-medium text-text-primary mt-8 mb-3";
const th = "text-left font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary font-semibold py-2 pr-4 border-b border-warm-200 align-bottom";
const td = "py-2 pr-4 border-b border-warm-100 align-top";

export default function ServerSideTrackingGdprPage() {
  const dates = postDates(SLUG);

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Server-side tracking and GDPR" }]} />
      <JsonLd
        data={articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Regulation",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Server-side tracking and GDPR", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: HEADLINE, selectors: [".key-takeaways", ".tldr"] })} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Regulation
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              {HEADLINE}
            </h1>
            <PostByline {...dates} readTime="10 min read" authorName="Rafa Jiménez" authorUrl="/authors/rafa-jimenez" />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Server-side tracking changes where analytics data is processed and what is
            forwarded to vendors. It does not change whether you need consent or a legal
            basis. If a cookie or identifier is still stored on or read from the device,
            the ePrivacy Directive applies; if personal data is processed, GDPR applies.
            What server-side can genuinely change is what leaves your control, where it
            is processed and how much of it survives ad blockers.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>ePrivacy Article 5(3) is about storing or accessing information on the device, whether or not it is personal data. Moving processing to a server does not remove that step.</li>
              <li>The EDPB&apos;s 2024 guidelines treat JavaScript that instructs the browser to send information as gaining access, and also cover pixels, tracking URLs and IP-based tracking. Applicability does not automatically mean consent is needed.</li>
              <li>A cookie set by your server container is still a cookie on the visitor&apos;s device.</li>
              <li>Server-side helps when it is used to minimise: the CNIL&apos;s 2022 proxy conditions for Google Analytics remove the IP address, replace identifiers and delete URL parameters and the external referrer.</li>
              <li>Those same conditions remove the campaign parameters attribution depends on. Compliance by proxy and campaign attribution pull in opposite directions.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Server-side tracking is often sold to European marketing teams as three
              benefits at once: ad blockers stop blocking, data stops leaking to vendors,
              and the consent problem goes away. The first is largely true. The second is
              true only if you configure it that way. The third is a misunderstanding, and
              it is the one that tends to end up in a DPO&apos;s inbox.
            </p>
            <p>
              This piece separates the technical change from the legal questions. It is
              not legal advice, and conclusions about a real deployment belong with your
              DPO and your national authority&apos;s guidance. The broader legal test for
              analytics is set out in{" "}
              <Link href="/blog/gdpr-eprivacy-analytics-legal-assessment" className={link}>our GDPR and ePrivacy assessment</Link>.
            </p>

            <h2 className={h2}>What server-side tracking actually is</h2>
            <p>
              In a client-side setup, tags in the browser send data straight to each
              vendor. In a{" "}
              <Link href="/glossary/server-side-tracking" className={link}>server-side</Link>{" "}
              setup, the browser sends data to a server you run, usually on a subdomain of
              your own site, and that server decides what to forward to which vendor.
              Google&apos;s server-side tagging works this way: a server container
              processes incoming events and routes them to collection servers.
            </p>
            <p>
              Two things do not change. There is still code running in the browser that
              collects and sends the data. And unless you strip it, the data that arrives
              at your server — IP address, user agent, cookies, URL parameters — is the
              same data that used to go to the vendor directly.
            </p>

            <h2 className={h2}>Three legal questions a server container does not answer</h2>

            <h3 className={h3}>1. Is anything stored on or read from the device?</h3>
            <p>
              Article 5(3) of the ePrivacy Directive requires consent for storing
              information on a user&apos;s device, or accessing information already stored
              there, unless an exemption applies. The EDPB, citing the Court of Justice in
              Planet49, states that this protection applies to any information stored in the
              device, regardless of whether it is personal data. Where the data is processed
              afterwards is irrelevant to this step.
            </p>
            <p>
              Server-side setups frequently keep a first-party cookie, often set by the
              server container itself so that it survives browser limits on script-set
              cookies. It is still stored on the device. And in its{" "}
              <a href={EDPB_URL} className={link} target="_blank" rel="noopener noreferrer">Guidelines 2/2023</a>,
              adopted in their final version in October 2024, the EDPB goes further: JavaScript
              that instructs the browser to send asynchronous requests with the targeted
              information falls within Article 5(3), as do tracking pixels, tracking URLs and,
              in some cases, tracking based on the IP address alone. The same guidelines
              recall that applicability does not systematically mean consent must be
              collected: exemptions still have to be assessed.
            </p>

            <h3 className={h3}>2. Is personal data processed, and on what basis?</h3>
            <p>
              GDPR applies whenever personal data is processed, on your server or anyone
              else&apos;s. IP addresses, client IDs and user IDs arriving at a server container
              are processed by you as controller, and anything forwarded makes the vendor a
              recipient. A server-side architecture needs the same legal basis, records and
              contracts as the client-side one it replaced.
            </p>

            <h3 className={h3}>3. Does data leave the EU?</h3>
            <p>
              Hosting the container in the EU does not change what happens next. If it
              forwards personal data to a vendor that processes it outside the EU, that is a
              transfer, and it needs a transfer mechanism. Server-side only prevents the
              transfer if it forwards nothing personal, or forwards to no one outside the EU.
            </p>

            <h2 className={h2}>What server-side can genuinely change</h2>
            <p>
              Used deliberately, a server in the middle is a good place to minimise. The
              clearest public example is the CNIL&apos;s 2022 guidance on{" "}
              <a href={CNIL_URL} className={link} target="_blank" rel="noopener noreferrer">audience measurement and data transfers</a>,
              which described a proxy for Google Analytics that could reduce transfer risks
              only with a set of measures:
            </p>
            <ul className={dashList}>
              <li>No transfer of the visitor&apos;s IP address to the analytics tool&apos;s servers.</li>
              <li>The user identifier replaced by the proxy server.</li>
              <li>Deletion of any parameter contained in collected URLs.</li>
              <li>Removal of the external referrer, and reprocessing of user agents.</li>
              <li>No cross-site collection, and removal of any data that could lead to re-identification.</li>
              <li>Hosting in conditions that avoid transfers to countries without essentially equivalent protection.</li>
            </ul>
            <p>
              The CNIL added that changing the tool&apos;s IP settings alone is not enough.
              Beyond minimisation, server-side can also move processing to an EU location you
              choose, reduce the number of third-party scripts running on your pages, and make
              requests far less likely to be blocked when the endpoint is your own subdomain.
            </p>

            <h2 className={h2}>The attribution cost of doing it properly</h2>
            <p>
              Read the CNIL&apos;s list again as a marketer. Deleting URL parameters removes
              the UTMs and click IDs every campaign report is built on. Removing the external
              referrer removes the signal that separates search from social from referral.
              Replacing the identifier cuts the history that user-level attribution models
              need. A proxy configured to those conditions keeps an analytics tool running and
              leaves it with little to say about which channels produced the revenue.
            </p>
            <p>
              That is the real trade-off behind &ldquo;server-side for compliance&rdquo;: the
              more personal and identifying data you strip, the less of the attribution you
              bought the tool for survives. It is the same tension, from another angle, as the
              one described in{" "}
              <Link href="/blog/consent-mode-measured-vs-modelled" className={link}>Consent Mode: what GA4 measures and what it models</Link>.
            </p>

            <h2 className={h2}>Five claims to check before you sign off a server-side project</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className={th}>Claim</th>
                    <th className={th}>What to check</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={td}>&ldquo;Server-side is cookieless&rdquo;</td><td className={td}>Whether the container or the tags still set or read a cookie, including one set through the server&apos;s response headers</td></tr>
                  <tr><td className={td}>&ldquo;Server-side does not need consent&rdquo;</td><td className={td}>What is stored on or accessed from the device, and whether a specific exemption applies under your authority&apos;s criteria</td></tr>
                  <tr><td className={td}>&ldquo;It recovers the conversions ad blockers hid&rdquo;</td><td className={td}>That is a technical effect; it creates no legal basis for measuring visitors who refused consent</td></tr>
                  <tr><td className={td}>&ldquo;A first-party subdomain makes it first-party data&rdquo;</td><td className={td}>The domain is a technical detail; who is controller and who receives the data is unchanged</td></tr>
                  <tr><td className={td}>&ldquo;Server-side keeps data in the EU&rdquo;</td><td className={td}>Which vendors the container forwards to, what fields they receive and where they process them</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className={h2}>A review checklist for the DPO</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Device:</strong> list every cookie, storage key and script-initiated request, including those set or triggered by the server.</li>
              <li><strong>Inbound data:</strong> list the fields that reach the server — IP, user agent, identifiers, full URLs, referrer.</li>
              <li><strong>Outbound data:</strong> for each vendor, the fields forwarded after processing, and whether any of them identifies a person.</li>
              <li><strong>Location:</strong> where the container runs and where each recipient processes the data.</li>
              <li><strong>Retention:</strong> how long raw events and logs are kept on the server.</li>
              <li><strong>Consent gating:</strong> which forwarding rules depend on the visitor&apos;s consent state, and how that state reaches the server.</li>
            </ol>

            <h2 className={h2}>Where Sealmetrics fits, and where it does not</h2>
            <p>
              Sealmetrics is not a server container for other vendors. A small script in the
              browser sends each hit to Sealmetrics, optionally through a subdomain of your own,
              and processing happens on servers in Dublin; on Shopify, purchases arrive
              server-side through the store&apos;s webhook. It sets no cookies and uses no
              local or session storage. It does not persist IP addresses — they are used in
              memory only — or user identifiers; a session marker lives in memory for about two
              hours; the country comes from the browser&apos;s timezone; and event-level rows are
              purged after a day. The details are in{" "}
              <Link href="/gdpr-analytics" className={link}>demonstrate compliance</Link>.
            </p>
            <p>
              Because it forwards nothing to advertising vendors, it keeps the landing
              page&apos;s UTMs and referrer, which is what campaign attribution needs. It does
              not escape the analysis above, though. Under the EDPB&apos;s reading, a script
              that sends information from the browser can fall within Article 5(3), so the
              question for any analytics tool — ours included — is whether an exemption applies
              to that configuration in your market. Several authorities, the CNIL among them,
              publish criteria for audience measurement that can be used without consent;
              whether a deployment meets them is for you and your DPO to assess. The concept is
              explained in{" "}
              <Link href="/consentless-analytics" className={link}>consentless analytics</Link>.
            </p>
          </div>

          <CommercialModule hook="Weighing a server-side project for compliance? See what campaign attribution looks like with no cookies, no stored IPs and nothing forwarded to ad vendors." />

          <RelatedReading currentSlug={SLUG} />

          <FaqSection items={FAQ} heading="Questions about server-side tracking and GDPR" />
        </div>
      </article>
    </>
  );
}
