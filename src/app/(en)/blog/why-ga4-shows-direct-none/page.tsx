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
 * Phase 4 of CONTENT-PLAN-PROBLEM-POSITIONING.md, post 1: problem A
 * ("GA4 does not reflect reality"), query "why GA4 shows direct / none".
 *
 * GA4 facts from Google's Analytics Help (checked 14 Sep 2026):
 * - Direct = source exactly "(direct)" and medium "(not set)" or "(none)";
 *   Unassigned = no channel rule matches (answer 9756891)
 * - session- and user-scoped traffic dimensions use the paid and organic
 *   channels last click model; direct entrances take the user's UTM values
 *   (answer 11080067)
 * - (not set) source when session_start is missing; consent `default` vs
 *   `update` misuse loses it (answer 13504892); tag order, cookie prefix and
 *   late linker (answer 14847402)
 * Sealmetrics facts: docs reports/insights/direct-traffic,
 * understanding-referrer-loss-and-direct-traffic, rejoined-traffic.
 * Figures: Incapto and Palladium as published in case-studies.tsx.
 */

const SLUG = "why-ga4-shows-direct-none";
const URL = `/blog/${SLUG}`;
const HEADLINE = "Why GA4 Shows So Much (direct) / (none) Traffic, and What Fixes It";
const DESCRIPTION =
  "(direct) / (none) in GA4 is a symptom, not a channel. The six causes, how to diagnose them in your own property, and what fixing the tag cannot recover.";

export const metadata: Metadata = {
  title: "Why GA4 Shows (direct) / (none) Traffic, and What Fixes It",
  description: DESCRIPTION,
  openGraph: {
    title: "Why GA4 Shows So Much (direct) / (none) Traffic",
    description:
      "In GA4, a direct session means it found no source for the session and none for the user. Why that happens, and why a tag fix only recovers part of it.",
    type: "article",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Why GA4 Shows So Much (direct) / (none) Traffic",
    description:
      "In GA4, a direct session means it found no source for the session and none for the user. Why that happens, and why a tag fix only recovers part of it.",
    images: [ogImage(`${URL}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(URL),
  },
};

const FAQ = [
  {
    question: "Why does GA4 show so much (direct) / (none) traffic?",
    answer:
      "Because a session only lands in (direct) / (none) when GA4 has no source for it and no earlier paid or organic source for that user. That happens when the referrer and UTMs are lost before the tag reads them — consent granted after the landing page, redirects, apps and email clients — or when the user is new to GA4 because cookies were rejected, deleted or expired.",
  },
  {
    question: "What is the difference between Direct and Unassigned in GA4?",
    answer:
      "Direct is a channel with a rule: source (direct) and medium (not set) or (none), meaning GA4 received no referrer or campaign data. Unassigned means no channel rule matched at all, typically because the source is (not set) after the session_start event was lost, or because the source and medium are custom values no rule recognises.",
  },
  {
    question: "Does Consent Mode cause direct / none traffic in GA4?",
    answer:
      "It can, in two ways. When consent is granted on the second page, the landing page that carried the referrer and UTMs has already passed. And Google documents that setting consent with the default command instead of update, or sending denied events after consent was granted, can lose session_start, which shows up as (not set) and Unassigned.",
  },
  {
    question: "How much of GA4 traffic is usually direct or unassigned?",
    answer:
      "It depends on the site, so measure yours. Two published references: on Incapto's Shopify store, 14% of GA4 visits had no origin a budget decision could use, against 0.3% in Sealmetrics over the same days; at Palladium Hotel Group, 35% of the bookings GA4 recorded had no channel.",
  },
  {
    question: "Can UTM parameters fix direct traffic in GA4?",
    answer:
      "They fix the part caused by untagged links: email, apps, QR codes and shorteners arrive without a referrer, and a UTM gives GA4 a source anyway. They cannot fix a visit GA4 never records because consent was rejected, or a landing page whose UTMs are gone by the time consent is granted.",
  },
  {
    question: "Does cookieless analytics have direct traffic too?",
    answer:
      "Yes. Sealmetrics classifies a visit as direct when there is no UTM and the referrer is empty, so referrer loss from redirects, apps or a strict Referrer-Policy still produces direct. What changes is that the source is read on every landing page regardless of consent, and visits that resume after the two-hour session window are labelled rejoined instead of direct.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const h3 = "font-serif text-[1.15rem] font-medium text-text-primary mt-8 mb-3";

export default function WhyGa4ShowsDirectNonePage() {
  const dates = postDates(SLUG);

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Why GA4 shows (direct) / (none)" }]} />
      <JsonLd
        data={articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Data Quality",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Why GA4 shows (direct) / (none)", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: HEADLINE, selectors: [".key-takeaways", ".tldr"] })} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Data Quality
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              {HEADLINE}
            </h1>
            <PostByline {...dates} readTime="9 min read" authorName="Rafa Jiménez" authorUrl="/authors/rafa-jimenez" />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            In GA4, a session lands in (direct) / (none) only when GA4 found no
            source for that session and no earlier paid or organic source for that
            user. So a high direct share is rarely people typing your address. It is
            the referrer or the UTMs lost before the tag could read them, or a
            visitor GA4 does not recognise because the cookie was rejected, deleted
            or expired.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>GA4 gives a direct session the user&apos;s previous paid or organic source when it has one. What stays in (direct) / (none) had no source at all, for the session or for the user.</li>
              <li>Unassigned is a different bucket: no channel rule matched, often because session_start was lost and the source is (not set).</li>
              <li>Six causes explain most of it: consent granted after the landing page, a user GA4 cannot recognise, a lost session_start, redirects, links without a referrer, and cross-domain hops.</li>
              <li>On Incapto&apos;s Shopify store, 14% of GA4 visits had no usable origin, against 0.3% in Sealmetrics; at Palladium Hotel Group, 35% of GA4 bookings had no channel.</li>
              <li>Tag fixes and UTMs recover the technical part. They cannot recover the visits and sources that depend on consent.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Every marketing team has had the conversation. Direct is the second or
              third largest channel in GA4, it grows when campaigns run, and nobody
              believes that thousands of people typed the URL from memory. The usual
              explanation, &ldquo;brand awareness&rdquo;, sounds reasonable and
              settles nothing, because a channel you cannot decide anything with
              still takes a share of every report.
            </p>
            <p>
              The size of the problem is measurable. On{" "}
              <Link href="/case-studies/incapto" className={link}>Incapto&apos;s Shopify store</Link>,
              14 of every 100 visits GA4 recorded had no origin a budget decision
              could use: nine assigned to no channel at all and five more in residual
              channels. Over the same days, Sealmetrics left 3 in every 1,000 without
              an origin. At{" "}
              <Link href="/case-studies/palladium-hotel-group" className={link}>Palladium Hotel Group</Link>,
              40% of inbound traffic had no source or medium in the previous stack,
              and 35% of the bookings GA4 recorded had no channel. That is the gap
              the{" "}
              <Link href="/complete-data" className={link}>complete data</Link>{" "}
              argument starts from; this piece is about where it comes from.
            </p>

            <h2 className={h2}>What (direct) / (none) and Unassigned actually mean in GA4</h2>
            <p>
              GA4&apos;s default channel group defines Direct with a rule, not a
              judgement: the source is exactly <code>(direct)</code> and the medium is{" "}
              <code>(not set)</code> or <code>(none)</code>. In plain terms, GA4
              received neither a referrer nor{" "}
              <Link href="/glossary/utm-parameters" className={link}>campaign parameters</Link>{" "}
              for that session. Unassigned is what GA4 uses when no channel rule
              matches at all.
            </p>
            <p>
              The detail most teams miss is how GA4 fills session-scoped source
              dimensions. For session and user scope, GA4 uses the paid and organic
              channels last click model, and a session that starts with a direct
              entrance takes the campaign values GA4 already holds for that user.
              A known visitor who first came from Google Ads and returns by typing
              your address is reported under Google Ads, not Direct.
            </p>
            <p>
              Which means that what remains in (direct) / (none) is the traffic for
              which GA4 had nothing: no source for the session and no earlier source
              for the user. That is why direct is a symptom. It measures the visits
              whose origin was lost, plus a smaller share of genuine typed and
              bookmarked visits.
            </p>

            <h2 className={h2}>The six causes, in the order they usually matter</h2>

            <h3 className={h3}>1. Consent is granted after the landing page</h3>
            <p>
              A tag that waits for consent does not run on the landing page if the
              visitor accepts the banner on the second page. By then the page that
              carried the referrer and the UTMs is gone: the second page&apos;s
              referrer is your own site and its URL no longer has the campaign
              parameters. The session starts without a source, and if the visitor is
              new to GA4 it has no earlier source to inherit.
            </p>

            <h3 className={h3}>2. GA4 does not recognise the visitor</h3>
            <p>
              The inheritance in the previous section only works for a user GA4
              already knows, through its first-party cookie. A visitor who rejected
              cookies on an earlier visit, cleared them, or came back after Safari
              capped a script-set cookie at 7 days — 24 hours if the page arrived with
              tracking parameters — looks new. Their return visit has no source to
              inherit, so it becomes direct.
            </p>

            <h3 className={h3}>3. The session_start event is lost</h3>
            <p>
              Google documents several implementation errors that drop session_start,
              and with it the session&apos;s source, which then shows as (not set) and
              Unassigned: the Google tag firing after other events on the page,
              custom events sent before the config command, using the consent{" "}
              <code>default</code> command where <code>update</code> is needed, or
              sending denied events after the visitor granted consent. Inconsistent
              cookie prefixes across the site and a cross-domain linker that
              initialises late split identities in the same way.
            </p>

            <h3 className={h3}>4. Redirects and referrer policies strip the referrer</h3>
            <p>
              Server redirects, JavaScript and meta-refresh redirects, HTTPS-to-HTTP
              hops and strict <code>Referrer-Policy</code> headers can all remove the
              referrer before your page loads. Link shorteners and some native-content
              networks chain several redirects. The visit arrives with an empty
              referrer, and without UTMs there is nothing left to classify.
            </p>

            <h3 className={h3}>5. Links that never send a referrer</h3>
            <p>
              Email clients, messaging apps and the in-app browsers of social apps
              often open links without a browser referrer. Untagged links from those
              places, QR codes and PDFs are indistinguishable from typed visits. This
              is the one cause a UTM policy fixes almost completely.
            </p>

            <h3 className={h3}>6. Cross-domain hops</h3>
            <p>
              A checkout, booking engine or payment gateway on another domain breaks
              the session unless cross-domain measurement is configured and the
              cookie survives on both sides. When the visitor comes back from a
              payment page, the return is recorded either as a referral from the
              gateway or, if the referrer is stripped, as direct.
            </p>

            <h2 className={h2}>How to diagnose it in your own GA4 property</h2>
            <p>An hour with these checks tells you which causes you have:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Separate Direct from Unassigned.</strong> In Traffic acquisition, look at both rows. A large Unassigned share with a (not set) source points to cause 3, not to brand traffic.</li>
              <li><strong>Check landing page (not set).</strong> Google notes it appears when a session has no page_view event. A high share means events are firing before or without the page view.</li>
              <li><strong>Split direct by browser and device.</strong> Direct concentrated on Safari and mobile points to causes 1 and 2; direct that is flat across browsers points to redirects or untagged links.</li>
              <li><strong>Follow one tagged link end to end.</strong> Open a URL with UTMs in a clean browser, reject the banner on the landing page, accept it on the second page, and see which source GA4 records in DebugView.</li>
              <li><strong>Inspect the referrer through your redirects.</strong> In the browser&apos;s network tab, check that the referrer and UTMs survive every hop from the ad or email to the final page.</li>
              <li><strong>Compare with a number neither tool produces.</strong> Reconcile GA4 against your real orders or bookings before reading channels. The method is set out in{" "}<Link href="/use-cases/single-source-of-truth" className={link}>one number for marketing and finance</Link>.</li>
            </ol>

            <h2 className={h2}>What a tag fix recovers, and what it cannot</h2>
            <p>
              Causes 3 to 6 are technical and fixable inside GA4: tag order, consent{" "}
              <code>update</code> instead of <code>default</code>, one cookie prefix, an
              early linker, fewer redirects and UTMs on every link you control. Do
              them; they shrink both direct and Unassigned.
            </p>
            <p>
              Causes 1 and 2 are not bugs. They are what consent-based measurement is
              designed to do: a visitor who has not accepted has no cookie, and a
              visitor without a cookie has no history. No configuration gives GA4 the
              source of a visit it was not allowed to measure, and{" "}
              <Link href="/glossary/consent-mode-v2" className={link}>Consent Mode</Link>{" "}
              modelling estimates totals rather than restoring the source of each
              visit. The loss is also uneven: at Incapto, Sealmetrics recorded 11% more
              direct traffic than GA4, but 37–52% more from paid campaigns and 133%
              more from organic social, so direct looks bigger than it is precisely
              because it loses less than everything else.
            </p>

            <h2 className={h2}>How cookieless measurement treats the same visits</h2>
            <p>
              A cookieless tool does not depend on consent to read the landing page,
              so causes 1 and 2 stop producing direct traffic. Sealmetrics reads the
              source of every landing page — UTMs first, then a recognised referrer
              such as a search engine or social network, then any other referrer —
              and records direct only when there is no UTM and the referrer is empty.
              Visits that resume after the two-hour session window are labelled
              rejoined traffic instead of being added to direct, and payment gateways
              or booking engines registered as passthrough referrers keep the
              original source when the visitor returns.
            </p>
            <p>
              It does not make causes 4 to 6 disappear. A redirect that strips the
              referrer, or an untagged link opened from an email app, still arrives
              with nothing to classify, and Sealmetrics records it as direct. The UTM
              and redirect hygiene in the previous section matters for any tool. And
              because Sealmetrics does not identify users, it cannot give a returning
              visitor the source of an earlier visit: each conversion is credited to
              the channel of the session in which it happens. How that plays out in
              campaign reporting is covered in{" "}
              <Link href="/use-cases/revenue-attribution" className={link}>campaign revenue attribution</Link>.
            </p>
          </div>

          <CommercialModule hook="How much of your GA4 direct traffic is really direct? We run both tools side by side and show you, channel by channel, where the source was lost." />

          <RelatedReading currentSlug={SLUG} />

          <FaqSection items={FAQ} heading="Questions about direct traffic in GA4" />
        </div>
      </article>
    </>
  );
}
