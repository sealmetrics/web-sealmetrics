import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Cookieless Analytics for Hotels — 2026 Guide",
  description:
    "How hotel groups count direct bookings by channel and reconcile with the PMS — without cookies, guest journeys or user-level tracking.",
  openGraph: {
    title: "Cookieless Analytics for Hotels — 2026 Guide",
    description:
      "Aggregate last-click booking attribution for hotel groups. No cookies, no user tracking, checked against the PMS total — whichever PMS you run.",
    type: "article",
    images: [ogImage("/blog/cookieless-analytics-for-hotels/")],
    url: "https://sealmetrics.com/blog/cookieless-analytics-for-hotels/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Cookieless Analytics for Hotels — 2026 Guide",
    description: "Aggregate last-click booking attribution for hotel groups. No cookies, no user tracking, checked against the PMS total — whichever PMS you run.",
    images: [ogImage("/blog/cookieless-analytics-for-hotels/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/cookieless-analytics-for-hotels/",
  },
};

const faqs = [
  {
    question: "What is cookieless analytics for hotels?",
    answer:
      "Cookieless analytics for hotels is a measurement approach that counts booking-path events — direct-site landings, meta-search referrals, booking confirmations — without cookies, consent banners or personal identifiers. Each booking is attributed last-click to the source of the session in which it happens, and aggregate totals can be checked against the PMS.",
  },
  {
    question: "Does cookieless analytics track individual guests across sessions?",
    answer:
      "No. Sealmetrics does not identify individuals, does not stitch visits into per-guest journeys and does not build per-visitor profiles. The measurement is strictly aggregate: counts by channel, campaign, landing page, country and device. This is how the system stays out of personal-data territory under GDPR.",
  },
  {
    question: "How much of hotel booking attribution is lost to GA4?",
    answer:
      "It varies by site, so measure yours against the PMS. For reference: at Palladium Hotel Group, 35% of the bookings GA4 recorded could not be assigned to a channel and 40% of inbound traffic had no source or medium; Dreamplace Hotels measures roughly 30% more traffic with Sealmetrics than with Google Analytics.",
  },
  {
    question: "Does cookieless analytics work with Mews, Cloudbeds or Opera?",
    answer:
      "Yes, through standard events and the API — there is no PMS-specific plugin. Booking-engine confirmations are sent as conversion events with their value, and the REST API and webhooks let you reconcile them against Mews, Cloudbeds, Opera or any other PMS.",
  },
  {
    question: "Can hotel groups roll up totals across multiple properties?",
    answer:
      "Yes. Multi-property portfolio rollups are standard. Each property runs its own tracking and aggregate data consolidates at brand or group level — ideal for chains with 5+ properties across countries.",
  },
];

export default function Page() {
  const dates = postDates("cookieless-analytics-for-hotels");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Cookieless Analytics for Hotels" }]} />
      <JsonLd
        data={articleSchema({
          headline: "Cookieless Analytics for Hotels — 2026 Guide",
          description:
            "How hotel groups count direct bookings at channel level without cookies or user-level tracking.",
          ...dates,
          url: "/blog/cookieless-analytics-for-hotels",
          category: "Hotels",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Cookieless Analytics for Hotels", url: "/blog/cookieless-analytics-for-hotels" }])} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Hotels
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              How Hotel Groups Reconcile Direct Bookings With the PMS in 2026
            </h1>
            <PostByline
              {...dates}
              readTime="9 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>Hotel groups running GA4 lose the channel behind a large share of direct bookings: at Palladium Hotel Group, 35% of the bookings GA4 recorded had no channel.</li>
              <li>The gap comes from consent rejection on mobile, ITP-induced cookie expiry and the jump to an external booking engine or payment gateway.</li>
              <li>Cookieless analytics counts booking events anonymously — no cookies, no personal identifiers, no per-guest journey — and attributes each booking last-click to the source of the session in which it happens.</li>
              <li>Aggregate bookings and revenue by channel can be checked against the PMS total — Mews, Cloudbeds, Opera or any other — through standard conversion events and the API.</li>
              <li>Multi-property portfolio rollups are standard: brand, sub-brand and individual property totals in one dashboard.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Hotel revenue directors live with a specific version of the analytics problem. The PMS knows exactly how many reservations came through the direct channel. The analytics cannot say where a large share of them came from. At <Link href="/case-studies/palladium-hotel-group" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Palladium Hotel Group</Link>, 40% of inbound traffic had no source or medium in the previous stack, and 35% of the bookings GA4 recorded could not be assigned to the channel that generated them. Consent rejection on mobile, ITP and the jump to an external booking engine each break the path — a bug in the measurement architecture, not the marketing.
            </p>
            <p>
              That gap is budget you cannot defend. At <Link href="/case-studies/dreamplace-hotels" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Dreamplace Hotels</Link>, Sealmetrics measures roughly 30% more traffic than Google Analytics and attributes 15–20% more sales than the previous tool — a difference large enough to change which channel gets the next euro. The fix is not another GA4 channel grouping rule. The fix is to stop depending on cookies — and to stop trying to identify individual guests at all. The architectural argument and trade-offs live on the <Link href="/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless analytics pillar</Link>; this piece focuses on the hotel-specific reconciliation patterns.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Why standard market tools miss hotel bookings more than other verticals
            </h2>
            <p>
              Hotel booking paths are unusually exposed to cookie-based measurement failure. Three reasons:
            </p>
            <p>
              <strong>1. Mobile Safari dominance.</strong> Booking decisions are increasingly made on phones. European hotel mobile traffic is often 65–75% of total sessions, and a disproportionate share runs iOS Safari — where <Link href="/glossary/intelligent-tracking-prevention" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">ITP</Link> caps first-party cookie life at 7 days (24 hours if set via script). When the booking fires days later, the cookie-based source identifier is already gone.
            </p>
            <p>
              <strong>2. Meta-search and OTA referral paths.</strong> A visit lands on the direct booking site from Google Hotel Ads. Later a separate visit converts. GA4 sees two disconnected pageviews with different cookie states (or no cookies at all). Your OTA commission report sees &ldquo;Booking&rdquo; or &ldquo;Expedia&rdquo; — also fragments. None of them reconcile to the PMS.
            </p>
            <p>
              <strong>3. Long decision windows.</strong> Travel bookings have 14–30 day consideration cycles. Cookie-based attribution windows are shorter than the decision process. By the time the booking happens, the original source pageview has been lost to ITP, cookie rejection or browser restart. Cookieless analytics does not fix this by remembering the first visit — it credits the session that books — but it does see that session, whether or not the guest accepted a banner.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              How cookieless analytics counts bookings — without tracking guests
            </h2>
            <p>
              It is important to state what cookieless analytics does <em>not</em> do, because the architecture trades per-guest detail for defensible channel totals:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>It does not identify individual guests.</li>
              <li>It does not stitch pageviews into per-guest journeys.</li>
              <li>It does not recognise a returning guest.</li>
              <li>It does not know that the meta-search landing and the later booking came from the same person.</li>
              <li>It does not credit an earlier visit: a booking goes to the source of the session in which it happens.</li>
            </ul>
            <p>
              What it does instead:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>Counts landings per source (meta-search, OTA referral, direct, paid search, organic).</li>
              <li>Counts booking events per source, credited to the session in which the booking happens.</li>
              <li>Sums the booking value sent with each conversion event into aggregate channel revenue.</li>
              <li>Keeps the original source when the guest returns from a booking engine or payment gateway registered as a passthrough referrer.</li>
              <li>Rolls up totals across properties for portfolio reporting.</li>
            </ul>
            <p>
              The trade is deliberate: the system gives up the fiction of a &ldquo;full guest journey&rdquo; (which GA4 provides on only a fraction of bookings anyway) in exchange for channel totals measured on every session, whether or not the guest accepted a banner.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What cookieless analytics for hotels delivers
            </h2>
            <p>
              The practical outputs for a typical hotel group:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li><strong>Aggregate bookings by channel you can check against the PMS.</strong> The consent gap closes because there is no cookie for Safari to expire or for the visitor to reject.</li>
              <li><strong>Meta-search landing counts.</strong> Google Hotel Ads, Trivago, Kayak landings on the direct site are counted at the landing pageview, regardless of whether that specific visitor eventually books.</li>
              <li><strong>Portfolio rollups.</strong> Brand, sub-brand, individual property — all aggregate totals in one dashboard, without manually reconciling 12 separate GA4 properties.</li>
              <li><strong>Paid-media ROI against real bookings.</strong> When channel-attributed revenue reconciles with the PMS total, paid-media ROAS becomes a number you can defend.</li>
            </ul>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Implementation: the PMS reconciliation pattern
            </h2>
            <p>
              The typical setup for a hotel group:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Install first-party tracking on the direct booking site and supporting marketing pages.</li>
              <li>Send booking-engine confirmations as conversion events with their value. There is no PMS plugin: the event contract and the REST API work with Mews, Cloudbeds, Opera or any other stack.</li>
              <li>Register the booking engine and payment gateway domains as passthrough referrers, so returns keep their original source.</li>
              <li>For multi-property groups, tag properties with brand/sub-brand/property IDs.</li>
              <li>Review week one: compare aggregate bookings per channel against the PMS, identify the channel gaps that previously existed.</li>
            </ol>
            <p>
              What to expect: Dreamplace Hotels uses the CRM total as the reconciliation point and treats the remaining gap as a quality signal. On that basis Sealmetrics attributes 15–20% more sales than their previous tool, and the reconciled view is what moved their Meta and Google budget.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The consent-banner UX bonus
            </h2>
            <p>
              A second-order benefit: where the deployment meets the regulator&apos;s exemption criteria, hotel sites running cookieless analytics may not need a cookie banner for the analytics itself. If advertising pixels are moved to a post-click opt-in (or removed), the banner can leave the first-interaction path on mobile — assess that with your DPO, because each pixel keeps its own consent requirement.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Questions hotel groups ask
            </h2>
            {faqs.map((f) => (
              <div key={f.question} className="mt-6">
                <h3 className="font-serif text-[1.15rem] font-medium text-text-primary mb-2">{f.question}</h3>
                <p className="text-[0.95rem]">{f.answer}</p>
              </div>
            ))}
          </div>

          <CommercialModule
            hook="Direct bookings are where the 40–60% consent gap hurts most. See your booking funnel measured on every visit — banner or no banner."
          />

          <RelatedReading currentSlug="cookieless-analytics-for-hotels" />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Go deeper
            </h2>
            <ul className="space-y-4">
              <li>
                <Link href="/for/hotels" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Sealmetrics for Hotels</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Vertical page with PMS integrations, multi-property rollups and real case numbers.</p>
              </li>
              <li>
                <Link href="/glossary/cookieless-analytics" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless Analytics — definition</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">The technical definition and related concepts.</p>
              </li>
              <li>
                <Link href="/blog/cookieless-analytics-for-ecommerce" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless Analytics for eCommerce</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Sister guide for DTC and retail teams.</p>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
