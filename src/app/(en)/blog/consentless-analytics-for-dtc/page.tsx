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
  title: "Consentless Analytics for DTC — 2026 Guide",
  description:
    "Consentless analytics measures DTC traffic without waiting for the cookie banner — anonymously, at channel level. How it works and what teams gain.",
  openGraph: {
    title: "Consentless Analytics for DTC — 2026 Guide",
    description:
      "No cookies. No user tracking. Aggregate channel totals measured on every visit, not only on the ones that accepted the banner.",
    type: "article",
    images: [ogImage("/blog/consentless-analytics-for-dtc/")],
    url: "https://sealmetrics.com/blog/consentless-analytics-for-dtc/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Consentless Analytics for DTC — 2026 Guide",
    description: "No cookies. No user tracking. Aggregate channel totals measured on every visit, not only on the ones that accepted the banner.",
    images: [ogImage("/blog/consentless-analytics-for-dtc/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/consentless-analytics-for-dtc/",
    languages: getAlternates("/blog/consentless-analytics-for-dtc"),
  },
};

const faqs = [
  {
    question: "What is consentless analytics?",
    answer:
      "Consentless analytics is web measurement that requires no user consent because it stores no information on the visitor's device, reads no information from it, and collects no personal identifiers. No cookies, no localStorage, no fingerprinting, no per-user tracking. It counts events anonymously and attributes each conversion last-click at channel level. Because the ePrivacy Directive's consent requirement attaches to storage and access of device information, analytics without either falls outside that rule; whether consent is needed at all then depends on your national authority's criteria.",
  },
  {
    question: "Is consentless the same as cookieless?",
    answer:
      "Closely related but not identical. Cookieless specifically means no cookies. Consentless is broader: no cookies AND no localStorage AND no fingerprinting AND no personal identifiers — so the storage-and-access rule has nothing to attach to. All consentless analytics is cookieless; not all cookieless analytics is fully consentless.",
  },
  {
    question: "Does consentless analytics track individual visitors?",
    answer:
      "No. That is the point. Consentless analytics counts events in aggregate — by channel, campaign, landing page, country — without linking any event to a specific person or device. There is no per-visitor profile, no returning-user recognition, no cross-session identifier.",
  },
  {
    question: "Why does consentless analytics matter for DTC brands in Europe?",
    answer:
      "DTC brands sell directly to consumers via paid media. Their budget decisions depend on attributing paid-channel spend to revenue. In the EU, the visitors who reject the cookie banner disappear from consent-gated analytics, so the ROAS numbers DTC teams optimise against are built on the ones who accepted. On Incapto's Shopify store, GA4 put paid campaigns at 50% of traffic; measured on every visit they were 62%.",
  },
  {
    question: "Is consentless analytics legal under GDPR?",
    answer:
      "It can be, when correctly implemented. GDPR regulates processing of personal data; if no personal data is collected and no identifier is stored or read on the device, the architecture avoids the obligations that attach to personal data. This is a question for a DPO to confirm against the specific implementation — Sealmetrics ships a DPA and TPSR package for this review.",
  },
  {
    question: "Can I use consentless analytics alongside advertising pixels?",
    answer:
      "Yes. Advertising pixels (Meta, TikTok, Google Ads remarketing) still require consent because they use personal data for ad personalisation. Consentless analytics runs independently as your neutral measurement layer; the advertising pixels remain gated by your CMP.",
  },
];

export default function Page() {
  const dates = postDates("consentless-analytics-for-dtc");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Consentless Analytics for DTC" }]} />
      <JsonLd
        data={articleSchema({
          headline: "Consentless Analytics for DTC — 2026 Guide",
          description: "Consentless analytics measures DTC traffic anonymously at channel level, without waiting for the banner and without tracking anyone.",
          ...dates,
          url: "/blog/consentless-analytics-for-dtc",
          category: "eCommerce",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Consentless Analytics for DTC", url: "/blog/consentless-analytics-for-dtc" }])} />
      <JsonLd data={faqPageSchema(faqs, "/blog/consentless-analytics-for-dtc")} />
      <JsonLd data={speakableWebPageSchema({ url: "/blog/consentless-analytics-for-dtc", name: "How DTC Brands Measure Paid-Media Revenue Without Waiting for the Banner", selectors: [".key-takeaways"] })} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              DTC
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              How DTC Brands Measure Paid-Media Revenue Without Waiting for the Banner
            </h1>
            <PostByline
              {...dates}
              readTime="7 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>Consentless analytics = no cookies, no localStorage, no fingerprinting, no personal identifiers, no per-user tracking. That is the design that lets the analytics run without consent where your regulator&apos;s exemption criteria are met.</li>
              <li>For DTC brands, this closes the consent-rejection gap that breaks aggregate channel ROAS in Europe — on Incapto&apos;s Shopify store, GA4 did not record 29% of visits.</li>
              <li>It works alongside advertising pixels (Meta, Google Ads) — pixels stay consent-gated, analytics is free.</li>
              <li>Totals can be checked against the backend: in Incapto&apos;s 48-day parallel run on Shopify, Sealmetrics recorded 96% of real orders and 97% of revenue.</li>
              <li>The legal standing depends on implementation details; a DPA and TPSR package should accompany any enterprise deployment.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              For European DTC brands, the measurement problem is specific: paid media is the growth engine, and paid-media ROAS is measured against conversions the system actually observes. Visitors who reject the cookie banner never become observable to consent-gated analytics, and the ones who accept are partly lost again to ad blockers and ITP. The loss is not even: on <Link href="/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Incapto&apos;s Shopify store</Link>, Sealmetrics recorded 37–52% more paid-campaign traffic than GA4, against 11% more direct traffic.
            </p>
            <p>
              &ldquo;Consentless&rdquo; is the industry term for the fix. It means the analytics architecture is designed so that it does not trigger the consent requirement in the first place. Not &ldquo;we ask for consent and respect the answer&rdquo; — that is still consent-gated. Consentless means consent is not required, because no information is stored on or read from the device and no personal identifier ever exists. The full legal walk-through with country-by-country authority guidance lives on the <Link href="/consentless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">consentless analytics pillar</Link>; the architecture sits on <Link href="/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless analytics</Link>.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Consentless does not mean &ldquo;tracked anonymously&rdquo;. It means not tracked.
            </h2>
            <p>
              This is the part most marketers get wrong. Consentless analytics does not anonymise a tracked user. It does not track any user at all. There is no identifier — not a cookie, not a localStorage key, not a fingerprint, not an anonymised ID. Pageviews are counted. Conversions are counted. Channel metadata (referrer, UTM, landing page) is logged against each event. That is the entire data model.
            </p>
            <p>
              The implication matters: with consentless analytics, you will never see a report that says &ldquo;this customer visited three times before buying.&rdquo; The system does not know. It knows: &ldquo;Channel A drove X visits, Y conversions, €Z revenue this week.&rdquo; That is what rolls up to a CFO.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              How consentless is different from cookieless
            </h2>
            <p>
              The terms overlap but are not synonymous. Cookieless specifically means: no cookies used. Consentless is a stricter standard: no cookies, no localStorage, no IndexedDB, no sessionStorage, no fingerprinting, no persistent identifier of any kind that would trigger the <Link href="/glossary/eprivacy-directive" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">ePrivacy storage-and-access rule</Link>.
            </p>
            <p>
              Some &ldquo;cookieless&rdquo; analytics tools still use localStorage or device fingerprinting and technically still need consent. Fully consentless tools avoid all of them. Both are better than cookie-based, but only an architecture that stores and reads nothing on the device takes the ePrivacy storage-and-access rule out of the picture; whether consent is needed at all then depends on your regulator&apos;s criteria.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What consentless looks like for a DTC stack
            </h2>
            <p>
              A typical European DTC stack running consentless analytics:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li><strong>Shopify (or WooCommerce/Magento) + consentless analytics.</strong> Analytics counts events on every visit that loads the page, before and regardless of the banner, with no identifier ever created.</li>
              <li><strong>Meta pixel + Google Ads pixel behind the banner.</strong> These still require consent because they use personal data for ad personalisation. Sealmetrics does not send conversions to ad platforms, so bidding keeps running on the pixels.</li>
              <li><strong>Email platform or CRM.</strong> Runs on explicit list opt-in; any onsite tracking it adds has its own consent requirement.</li>
              <li><strong>BigQuery for aggregate marketing-mix modelling.</strong> Fed with channel totals by the BigQuery connector, available from the Growth plan.</li>
            </ul>
            <p>
              The net effect: aggregate ROAS per channel is measured on every visit, not only on the ones that accepted the banner. At Incapto, that moved paid campaigns from 50% of traffic in GA4 to 62% measured on every visit — the kind of difference that decides whether a paid-media budget is signed off or defended.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What the compliance review looks like
            </h2>
            <p>
              A typical DPO review of a consentless analytics implementation checks:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Does the tool store anything on the device? (Must be no.)</li>
              <li>Does the tool read anything from the device beyond standard HTTP headers? (Must be no.)</li>
              <li>Does the tool store IP addresses, device IDs or any identifier that links pageviews across sessions? (Must be no. A short-lived, in-memory session marker that expires after inactivity is a different thing — ask how it is derived and how long it lives.)</li>
              <li>Where is data processed and stored? (Should be EU for European DTC brands.)</li>
              <li>Is there a DPA signed with the vendor? (Should be yes — Sealmetrics ships one by default.)</li>
              <li>Is a TPSR (Third-Party Security Review) package available? (Should be yes for enterprise procurement.)</li>
            </ol>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What consentless analytics does not fix
            </h2>
            <p>
              Consentless analytics is a marketing-site measurement layer. It does not replace:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li><strong>Advertising pixels</strong> — still required for Meta, TikTok, Google Ads optimisation. Still consent-gated.</li>
              <li><strong>CRM and email tracking</strong> — separate consent surface (explicit list opt-in, authenticated).</li>
              <li><strong>Customer data platforms (CDPs)</strong> — for authenticated users, different compliance basis and a different data model.</li>
            </ul>
            <p>
              Think of consentless analytics as replacing GA4 for aggregate top-of-funnel channel attribution, not as replacing the rest of the MarTech stack.
            </p>

          </div>

          <CommercialModule
            hook="Consentless means the banner stops deciding what your dashboard sees. Measure your DTC funnel on every visit, including the visitors who reject the banner."
          />

          <RelatedReading currentSlug="consentless-analytics-for-dtc" />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Go deeper
            </h2>
            <ul className="space-y-4">
              <li>
                <Link href="/blog/cookieless-analytics-for-ecommerce" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless Analytics for eCommerce</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">The full eCommerce guide with Shopify integration detail.</p>
              </li>
              <li>
                <Link href="/glossary/gdpr-analytics-compliance" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GDPR analytics compliance — definition</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">What GDPR actually requires of web analytics.</p>
              </li>
              <li>
                <Link href="/for/ecommerce" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Sealmetrics for eCommerce</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Vertical page with DTC-specific pains and outcomes.</p>
              </li>
            </ul>
          </section>

          <FaqSection items={faqs} heading="Questions DTC teams ask" />
        </div>
      </article>
    </>
  );
}
