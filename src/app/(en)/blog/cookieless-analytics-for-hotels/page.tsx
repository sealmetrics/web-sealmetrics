import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { FaqSection } from "@/components/ui/FaqSection";
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
    languages: getAlternates("/blog/cookieless-analytics-for-hotels"),
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
      "No. Sealmetrics does not identify individuals, does not stitch visits into per-guest journeys and does not build per-visitor profiles. The measurement is strictly aggregate: counts by channel, campaign, landing page, country and device. This is how the system is designed to avoid processing personal data under GDPR.",
  },
  {
    question: "How much of hotel booking attribution is lost to GA4?",
    answer:
      "It varies by site, so measure yours against the PMS. For reference: at Palladium Hotel Group, 35% of the bookings GA4 recorded could not be assigned to a channel and 40% of inbound traffic had no source or medium; Dreamplace Hotels measures roughly 30% more traffic with Sealmetrics than with Google Analytics.",
  },
  {
    question: "Does cookieless analytics work with Mews, Cloudbeds or Opera?",
    answer:
      "There is no PMS-specific plugin. The booking is sent as a standard conversion event from the confirmation page, with its value, currency and any properties you choose, and the totals are compared with Mews, Cloudbeds, Opera or any other PMS from the reports, the REST API or the BigQuery export.",
  },
  {
    question: "What happens when the booking engine runs on another domain?",
    answer:
      "If the engine runs on a subdomain of your site, the tracker goes on its pages and the booking stays in the same session. If it runs on the provider's domain, that domain is registered as a passthrough referrer through the Sealmetrics API, so a guest who returns within the session keeps the original source, and the booking is recorded on a confirmation page on your domain.",
  },
  {
    question: "Can hotel groups see totals across multiple properties?",
    answer:
      "Yes. Each property or brand is a site inside one organization, one login can open all of them, and members can be limited to the sites they are assigned. Every plan includes unlimited websites and a portfolio view. Passthrough referrers, however, are registered per account.",
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
      <JsonLd data={faqPageSchema(faqs, "/blog/cookieless-analytics-for-hotels")} />
      <JsonLd data={speakableWebPageSchema({ url: "/blog/cookieless-analytics-for-hotels", name: "How Hotel Groups Reconcile Direct Bookings With the PMS in 2026", selectors: [".key-takeaways"] })} />

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

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>Hotel groups running GA4 lose the channel behind a large share of direct bookings: at Palladium Hotel Group, 35% of the bookings GA4 recorded had no channel.</li>
              <li>The gap comes from consent rejection on mobile, ITP-induced cookie expiry and the jump to an external booking engine or payment gateway.</li>
              <li>Cookieless analytics counts booking events anonymously — no cookies, no personal identifiers, no per-guest journey — and attributes each booking last-click to the source of the session in which it happens.</li>
              <li>Aggregate bookings and revenue by channel can be checked against the PMS total — Mews, Cloudbeds, Opera or any other — because the booking arrives as a standard conversion event.</li>
              <li>Bookings made on an OTA&apos;s own site never pass through your website and stay out of the measurement; the OTA extranet remains their source.</li>
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
              <strong>1. Consent and Safari on the phone.</strong> Many booking decisions are made on a phone, where the banner fills the screen at the first interaction and a guest who rejects it can still book unseen. On Safari, <Link href="/glossary/intelligent-tracking-prevention" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">ITP</Link> caps script-set first-party cookies at 7 days, and at 24 hours when the page arrived with tracking query parameters — which is exactly how a campaign click arrives. When the booking fires later, the cookie-based source identifier is already gone.
            </p>
            <p>
              <strong>2. Meta-search and OTA referral paths.</strong> A visit lands on the direct booking site from Google Hotel Ads. Later a separate visit converts. GA4 sees two disconnected pageviews with different cookie states (or no cookies at all). Your OTA commission report sees &ldquo;Booking&rdquo; or &ldquo;Expedia&rdquo; — also fragments. None of them reconcile to the PMS.
            </p>
            <p>
              <strong>3. Long decision windows.</strong> Days or weeks can pass between the first search and the booking, across meta-search, campaign and brand visits. By the time the booking happens, the original source pageview has been lost to ITP, cookie rejection or browser restart. Cookieless analytics does not fix this by remembering the first visit — it credits the session that books — but it does see that session, whether or not the guest accepted a banner.
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
              <li>Reads bookings by the properties you send with them, such as check-in date, nights, room type or property.</li>
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
              <li><strong>Aggregate bookings by channel you can check against the PMS.</strong> The consent gap closes because there is no cookie for Safari to expire or for the visitor to reject.</li>
              <li><strong>Meta-search landing counts.</strong> Google Hotel Ads, Trivago, Kayak landings on the direct site are counted at the landing pageview, regardless of whether that specific visitor eventually books.</li>
              <li><strong>A portfolio view.</strong> Each brand or property is a site in one organization, so group totals do not start with exporting one GA4 property per hotel into a spreadsheet.</li>
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
              <li>For multi-property groups, give each property its own site, or send the property and brand as properties of the booking.</li>
              <li>Review week one: compare aggregate bookings per channel against the PMS, identify the channel gaps that previously existed.</li>
            </ol>
            <p>
              What to expect: Dreamplace Hotels uses the CRM total as the reconciliation point and treats the remaining gap as a quality signal. On that basis Sealmetrics attributes 15–20% more sales than their previous tool, and the reconciled view is what moved their Meta and Google budget.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What goes into the comparison, and what stays out
            </h2>
            <p>
              The reconciliation is only fair when like is compared with like. The PMS records everything the hotel sells; the website only sees what is booked on it.
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li><strong>In:</strong> bookings confirmed on your own website and its booking engine, in the same timezone and currency.</li>
              <li><strong>Out:</strong> OTA, phone, call-centre, group, event and walk-in bookings, which have no web visit behind them.</li>
              <li><strong>Out:</strong> cancellations, test bookings and unpaid bookings the PMS still counts.</li>
              <li><strong>On totals:</strong> booking references are not stored, so the comparison is on totals and channels, never booking by booking.</li>
            </ul>
            <p>
              If the engine runs on the provider&apos;s domain and never returns the guest to a page on yours, the booking cannot be recorded in the browser. Resolve that with the provider before reading any difference. Each step of the path, with what to configure, is on <Link href="/for/hotels" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Sealmetrics for hotels</Link>.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The consent-banner UX bonus
            </h2>
            <p>
              A second-order benefit: where the deployment meets the regulator&apos;s exemption criteria, hotel sites running cookieless analytics may not need a cookie banner for the analytics itself. If advertising pixels are moved to a post-click opt-in (or removed), the banner can leave the first-interaction path on mobile — assess that with your DPO, because each pixel keeps its own consent requirement.
            </p>

          </div>

          <CommercialModule
            hook="How much of your direct revenue has no channel today? We compare your bookings with the PMS and show you the gap, channel by channel."
          />

          <RelatedReading currentSlug="cookieless-analytics-for-hotels" />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Go deeper
            </h2>
            <ul className="space-y-4">
              <li>
                <Link href="/for/hotels" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Sealmetrics for Hotels</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">The booking path step by step: booking engines, payment gateways, limits and case figures.</p>
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

          <FaqSection items={faqs} heading="Questions hotel groups ask" />
        </div>
      </article>
    </>
  );
}
