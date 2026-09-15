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
  title: "Consentless Analytics for DTC — 2026 Guide",
  description:
    "Consentless analytics counts DTC traffic with no banner and no consent loss — anonymously, by channel. How it works, why it's compliant, what teams gain.",
  openGraph: {
    title: "Consentless Analytics for DTC — 2026 Guide",
    description:
      "No consent banner. No cookies. No user tracking. Aggregate channel totals without consent gaps.",
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
    description: "No consent banner. No cookies. No user tracking. Aggregate channel totals without consent gaps.",
    images: [ogImage("/blog/consentless-analytics-for-dtc/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/consentless-analytics-for-dtc/",
  },
};

const faqs = [
  {
    question: "What is consentless analytics?",
    answer:
      "Consentless analytics is web measurement that requires no user consent because it stores no information on the visitor's device, reads no information from it, and collects no personal identifiers. No cookies, no localStorage, no fingerprinting, no per-user tracking. It counts events anonymously and attributes each conversion last-click at channel level. Because the ePrivacy Directive's consent requirement attaches to storage and access of device information, analytics without either falls outside it, which is what the CNIL and AEPD criteria for consent-exempt audience measurement look for.",
  },
  {
    question: "Is consentless the same as cookieless?",
    answer:
      "Closely related but not identical. Cookieless specifically means no cookies. Consentless is broader: no cookies AND no localStorage AND no fingerprinting AND no personal identifiers — the full combination that consent-exempt audience measurement depends on. All consentless analytics is cookieless; not all cookieless analytics is fully consentless.",
  },
  {
    question: "Does consentless analytics track individual visitors?",
    answer:
      "No. That is the point. Consentless analytics counts events in aggregate — by channel, campaign, landing page, country — without linking any event to a specific person or device. There is no per-visitor profile, no returning-user recognition, no cross-session identifier.",
  },
  {
    question: "Why does consentless analytics matter for DTC brands in Europe?",
    answer:
      "DTC brands sell directly to consumers via paid media. Their budget decisions depend on attributing paid-channel spend to revenue. In the EU, cookie banners cause 40–60% of visitors to reject tracking — the ROAS numbers DTC teams optimise against are built on the minority who accepted. Consentless analytics restores aggregate channel totals without that consent gap.",
  },
  {
    question: "Is consentless analytics legal under GDPR?",
    answer:
      "When correctly implemented, yes. GDPR regulates processing of personal data; if no personal data is collected and no identifier is stored or read on the device, the architecture meets GDPR by design. This is a question for a DPO to confirm against the specific implementation — Sealmetrics ships a DPA and TPSR package for this review.",
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
          description: "Consentless analytics counts DTC traffic anonymously at channel level — no banner, no consent loss, no tracking.",
          ...dates,
          url: "/blog/consentless-analytics-for-dtc",
          category: "eCommerce",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Consentless Analytics for DTC", url: "/blog/consentless-analytics-for-dtc" }])} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              DTC
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              How DTC Brands Measure Paid-Media Revenue Without a Banner
            </h1>
            <PostByline
              {...dates}
              readTime="7 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>Consentless analytics = no cookies, no localStorage, no fingerprinting, no personal identifiers, no per-user tracking. That is the combination consent-exempt audience measurement relies on.</li>
              <li>For DTC brands, this closes the 40–60% consent-rejection gap that breaks aggregate channel ROAS in Europe.</li>
              <li>It works alongside advertising pixels (Meta, Google Ads) — pixels stay consent-gated, analytics is free.</li>
              <li>Properly architected, aggregate channel revenue reconciles with Shopify/WooCommerce/Magento at within 15–20%.</li>
              <li>The legal standing depends on implementation details; a DPA and TPSR package should accompany any enterprise deployment.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              For European DTC brands, the measurement problem is specific: paid media is the growth engine, and paid-media ROAS is measured against conversions the system actually observes. In the EU, 40–60% of visitors never become observable because they reject the cookie banner. The remaining 40–60% has channel attribution that is only partially trustworthy due to ad blockers and ITP.
            </p>
            <p>
              &ldquo;Consentless&rdquo; is the legal term for the fix. It means the analytics architecture is designed so that it does not trigger the consent requirement in the first place. Not &ldquo;we ask for consent and respect the answer&rdquo; — that is still consent-gated. Consentless means consent is not required, because no information is stored on or read from the device and no personal identifier ever exists. The full legal walk-through with country-by-country authority guidance lives on the <Link href="/consentless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">consentless analytics pillar</Link>; the architecture sits on <Link href="/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless analytics</Link>.
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
              The terms overlap but are not synonymous. Cookieless specifically means: no cookies used. Consentless is a stricter standard: no cookies, no localStorage, no IndexedDB, no sessionStorage, no fingerprinting, no persistent identifier of any kind that would trigger the <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">ePrivacy storage-and-access rule</Link>.
            </p>
            <p>
              Some &ldquo;cookieless&rdquo; analytics tools still use localStorage or device fingerprinting and technically still need consent. Fully consentless tools avoid all of them. Both are better than cookie-based, but only consentless is built to meet the CNIL and AEPD criteria for consent-exempt measurement.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What consentless looks like for a DTC stack
            </h2>
            <p>
              A typical European DTC stack running consentless analytics:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li><strong>Shopify (or WooCommerce/Magento) + consentless analytics.</strong> Analytics counts events without depending on consent, pre-banner, no identifier ever created.</li>
              <li><strong>Meta pixel + Google Ads pixel behind the banner.</strong> These still require consent because they use personal data for ad personalisation.</li>
              <li><strong>Klaviyo or CRM for email.</strong> Runs on explicit email-list opt-in, not tracking cookies.</li>
              <li><strong>BigQuery for aggregate marketing-mix modelling.</strong> Fed by consentless analytics at full resolution of channel totals.</li>
            </ul>
            <p>
              The net effect: aggregate ROAS per channel is measured without depending on consent, not on the 40% that accepted the banner. For a €20M DTC brand, the difference between &ldquo;channel ROAS on 40%&rdquo; and &ldquo;channel ROAS without consent gaps&rdquo; is often the difference between signing off on a €5M annual paid-media budget and defending it in a board meeting.
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
              <li>Does the tool collect IP addresses, device IDs, session IDs or any identifier that could link pageviews together? (Must be no.)</li>
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

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Questions DTC teams ask
            </h2>
            {faqs.map((f) => (
              <div key={f.question} className="mt-6">
                <h3 className="font-serif text-[1.15rem] font-medium text-text-primary mb-2">{f.question}</h3>
                <p className="text-[0.95rem]">{f.answer}</p>
              </div>
            ))}
          </div>

          <CommercialModule
            hook="Consentless means the banner stops deciding what your dashboard sees. Measure your DTC funnel whether or not the banner is accepted, including the 40–60% who reject it."
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
        </div>
      </article>
    </>
  );
}
