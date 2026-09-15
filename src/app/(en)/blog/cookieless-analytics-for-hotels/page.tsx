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
      "Aggregate last-click booking attribution for hotel groups. No cookies, no user tracking, reconciles with Mews, Cloudbeds and Opera totals.",
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
    description: "Aggregate last-click booking attribution for hotel groups. No cookies, no user tracking, reconciles with Mews, Cloudbeds and Opera totals.",
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
      "Cookieless analytics for hotels is a measurement approach that counts booking-path events — direct-site landings, meta-search referrals, booking confirmations — without cookies, consent banners or personal identifiers. Each booking is attributed last-click to the source recorded on that page load, and aggregate totals reconcile with the PMS (Mews, Cloudbeds, Opera).",
  },
  {
    question: "Does cookieless analytics track individual guests across sessions?",
    answer:
      "No. Sealmetrics does not identify individuals, does not stitch visits into per-guest journeys and does not build per-visitor profiles. The measurement is strictly aggregate: counts by channel, campaign, landing page, country and device. This is how the system is designed to avoid processing personal data under GDPR.",
  },
  {
    question: "How much of hotel booking attribution is lost to GA4?",
    answer:
      "On average, 25% of direct bookings recorded in hotel PMS systems are not correctly attributed in GA4 due to consent rejection on mobile Safari, ITP-induced cookie expiry and OTA path breaks. For mobile-heavy booking flows, the gap can climb to 35%.",
  },
  {
    question: "Does cookieless analytics work with Mews, Cloudbeds or Opera?",
    answer:
      "Yes. Sealmetrics ships native integrations with Mews, Cloudbeds and Opera. Any other PMS or custom booking engine integrates via REST API. Booking revenue flows back automatically so conversion counts can be multiplied by ADR for channel revenue totals.",
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
              <li>hotel groups running GA4 typically miss 25% of direct bookings their PMS records.</li>
              <li>The gap comes from mobile Safari consent rejection, ITP-induced cookie expiry and OTA referral breaks.</li>
              <li>Cookieless analytics counts booking events anonymously — no cookies, no personal identifiers, no per-guest journey — and attributes each booking last-click to the source on that page load.</li>
              <li>Aggregate channel totals reconcile with the PMS (Mews, Cloudbeds, Opera) at the level of confirmed bookings and revenue.</li>
              <li>Multi-property portfolio rollups are standard: brand, sub-brand and individual property totals in one dashboard.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Hotel revenue directors live with a specific version of the analytics problem. The PMS closes 240 reservations this week. GA4 reports 180. The missing 60 are attributed to &ldquo;direct&rdquo; — not because they were direct, but because the cookies that would have preserved the source were rejected, expired or blocked before the booking fired. On mobile Safari, with ITP, with consent rejection, with OTA referrals that land via meta-search — every one of these is a bug in the measurement architecture, not the marketing.
            </p>
            <p>
              The 25% gap is real money. For a hotel group doing €15M in direct bookings, it is €3.75M of revenue that marketing drove but cannot defend in the budget meeting. The fix is not another GA4 channel grouping rule. The fix is to stop depending on cookies — and to stop trying to identify individual guests at all. The architectural argument and trade-offs live on the <Link href="/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless analytics pillar</Link>; this piece focuses on the hotel-specific reconciliation patterns.
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
              <strong>3. Long decision windows.</strong> Travel bookings have 14–30 day consideration cycles. Cookie-based attribution windows are shorter than the decision process. By the time the booking happens, the original source pageview has been lost to ITP, cookie rejection or browser restart.
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
            </ul>
            <p>
              What it does instead:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>Counts landings per source (meta-search, OTA referral, direct, paid search, organic).</li>
              <li>Counts booking events per source using last-click on the booking pageview.</li>
              <li>Multiplies booking counts by the PMS-reported ADR to produce aggregate channel revenue.</li>
              <li>Rolls up totals across properties for portfolio reporting.</li>
            </ul>
            <p>
              The trade is deliberate: the system gives up the fiction of a &ldquo;full guest journey&rdquo; (which GA4 provides on only a fraction of bookings anyway) in exchange for channel totals that don&apos;t lose bookings to consent rejection.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What cookieless analytics for hotels delivers
            </h2>
            <p>
              The practical outputs for a typical hotel group:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li><strong>Aggregate bookings by channel that match the PMS.</strong> The 25% gap closes because there is no cookie for Safari to expire or for the visitor to reject.</li>
              <li><strong>Meta-search landing counts.</strong> Google Hotel Ads, Trivago, Kayak landings on the direct site are counted at the landing pageview, regardless of whether that specific visitor eventually books.</li>
              <li><strong>Portfolio rollups.</strong> Brand, sub-brand, individual property — all aggregate totals in one dashboard, without manually reconciling 12 separate GA4 properties.</li>
              <li><strong>Paid-media ROI against real bookings.</strong> When channel-attributed revenue matches the PMS, paid-media ROAS becomes a calculable number.</li>
            </ul>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Implementation: the PMS reconciliation pattern
            </h2>
            <p>
              The typical setup for a hotel group:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Install first-party tracking on the direct booking site and supporting marketing pages.</li>
              <li>Connect PMS via native integration (Mews, Cloudbeds, Opera) or REST API.</li>
              <li>Map booking revenue events: reservation confirmed, revenue realised, cancellation.</li>
              <li>For multi-property groups, tag properties with brand/sub-brand/property IDs.</li>
              <li>Review week one: compare aggregate bookings per channel against the PMS, identify the channel gaps that previously existed.</li>
            </ol>
            <p>
              Typical result at week four: aggregate channel revenue within 5–10% of PMS totals (from a previous gap of 25–35%).
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The consent-banner UX bonus
            </h2>
            <p>
              A second-order benefit: hotel sites running cookieless analytics often don&apos;t need a cookie banner for the analytics itself. If advertising pixels are moved to a post-click opt-in (or removed), the banner becomes optional. Mobile bounce rate typically drops 5–8% when the banner is removed from the first-interaction path.
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
            hook="Direct bookings are where the 40–60% consent gap hurts most. See your booking funnel measured whether or not the banner is accepted."
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
