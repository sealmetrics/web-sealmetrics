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
  title: "Cookieless Analytics for SaaS — 2026 Guide",
  description:
    "How European SaaS teams count trial signups and paid conversions by channel without cookies or user-level tracking. Works alongside product analytics.",
  openGraph: {
    title: "Cookieless Analytics for SaaS — 2026 Guide",
    description:
      "Aggregate, anonymous marketing-site attribution for product-led SaaS. Complements Mixpanel/Amplitude. BigQuery export included.",
    type: "article",
    images: [ogImage("/blog/cookieless-analytics-for-saas/")],
    url: "https://sealmetrics.com/blog/cookieless-analytics-for-saas/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Cookieless Analytics for SaaS — 2026 Guide",
    description: "Aggregate, anonymous marketing-site attribution for product-led SaaS. Complements Mixpanel/Amplitude. BigQuery export included.",
    images: [ogImage("/blog/cookieless-analytics-for-saas/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/cookieless-analytics-for-saas/",
  },
};

const faqs = [
  {
    question: "What is cookieless analytics for SaaS?",
    answer:
      "Cookieless analytics for SaaS is aggregate measurement of the marketing site — visit counts, trial signup counts, paid conversion counts — by channel, without cookies, consent banners or personal identifiers. Each trial signup is attributed last-click to the source on that pageview. It complements in-product analytics (Mixpanel, Amplitude) but does not replace it.",
  },
  {
    question: "Does cookieless analytics track individual visitors or users?",
    answer:
      "No. On the marketing site, Sealmetrics counts events anonymously — no cookies, no identifiers, no per-visitor profile. The output is channel-level totals. Per-user product analytics happens downstream in Mixpanel, Amplitude or your own product database, where the user is authenticated and tracking is a different compliance question.",
  },
  {
    question: "Does cookieless analytics replace Mixpanel or Amplitude?",
    answer:
      "Not usually. Mixpanel and Amplitude run inside the authenticated product and do feature adoption, retention cohorts and in-app analytics. Cookieless analytics covers the marketing site — visits, signup conversion, paid-channel attribution — where cookies and consent drive data loss. Most SaaS teams run both layers side by side.",
  },
  {
    question: "Can I build PQL reports with cookieless analytics?",
    answer:
      "Yes, by joining aggregate marketing attribution (from cookieless analytics) with product-side data (from your product database or Mixpanel). Export marketing attribution to BigQuery or Snowflake at full resolution and join against the authenticated user table. The join happens in the warehouse, not in the marketing-site tracker.",
  },
  {
    question: "Is cookieless analytics compliant for SaaS marketing sites?",
    answer:
      "Yes — when the implementation uses no cookies, localStorage or personal identifiers. Most European SaaS companies need a DPO review and a DPA from the analytics provider. Sealmetrics ships a standard DPA and a TPSR (Third-Party Security Review) package for procurement teams.",
  },
];

export default function Page() {
  const dates = postDates("cookieless-analytics-for-saas");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Cookieless Analytics for SaaS" }]} />
      <JsonLd
        data={articleSchema({
          headline: "Cookieless Analytics for SaaS — 2026 Guide",
          description:
            "How European SaaS teams count trial signups and paid conversions by channel without cookies.",
          ...dates,
          url: "/blog/cookieless-analytics-for-saas",
          category: "SaaS",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Cookieless Analytics for SaaS", url: "/blog/cookieless-analytics-for-saas" }])} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              SaaS
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              PLG Analytics Without Consent Banners: Trial-to-Paid Measurement in 2026
            </h1>
            <PostByline
              {...dates}
              readTime="8 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Key Takeaways</h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>SaaS marketing-site attribution breaks in Europe under consent-rejection rates of 40–60%.</li>
              <li>Cookieless analytics counts visits and trial signups at channel level without cookies or user identifiers.</li>
              <li>It does not replace Mixpanel or Amplitude for in-product analytics — the two layers complement each other.</li>
              <li>BigQuery / Snowflake export lets you join aggregate marketing attribution with product-side user tables.</li>
              <li>For PLG companies, this is the difference between knowing your real channel CAC and guessing it.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              If you run growth at a European SaaS company, you have one version of this conversation every quarter. Finance asks what the CAC is. You quote a number from GA4. They ask how confident you are. You shrug. You know that 40–60% of European visitors reject cookies, that your Google Ads spend converts to signups the attribution model can&apos;t see, and that the number you just quoted is optimistic by some unknown factor.
            </p>
            <p>
              Product-led growth depends on a measurement stack that works. When the marketing-site layer is broken, every downstream CAC calculation, every paid-channel ROI decision is made on partial data. <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless analytics</Link> fixes the top of the funnel — not by tracking harder, but by counting events anonymously and attributing each signup last-click at channel level. For the cross-vertical category overview, see the <Link href="/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless analytics pillar</Link>; this post is the SaaS-specific reading.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Why the SaaS measurement stack breaks at the top
            </h2>
            <p>
              A standard PLG measurement stack has three layers:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Marketing-site attribution</strong> (typically GA4): traffic source → landing page → signup.</li>
              <li><strong>Product event analytics</strong> (typically Mixpanel or Amplitude): in-product actions → activation → retention cohorts.</li>
              <li><strong>Warehouse / revenue</strong> (typically BigQuery or Snowflake): subscription tables, MRR, churn.</li>
            </ol>
            <p>
              The top layer is the one that breaks. GA4 sees 13–40% of real EU traffic after consent rejection and ad blockers. Even the signups it sees are attributed poorly, because the cookie that would have preserved the source was rejected or expired. The in-product analytics (Mixpanel/Amplitude) work fine — the user has authenticated, cookies are not the problem, and user-level tracking is compliant on explicit consent inside the product. But the marketing-to-signup layer is unreliable.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              What cookieless analytics replaces (and doesn&apos;t)
            </h2>
            <p>
              Cookieless analytics for SaaS replaces GA4 at the marketing-site layer. It does not replace Mixpanel or Amplitude anywhere. The two systems have different jobs:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li><strong>Cookieless analytics (marketing site, anonymous).</strong> Counts visits and signups by channel, campaign and landing page. No user identification, no per-visitor journey.</li>
              <li><strong>Mixpanel / Amplitude (authenticated product, user-level).</strong> Tracks what each logged-in user does inside the app. Retention cohorts, feature adoption, in-product funnels.</li>
            </ul>
            <p>
              What cookieless analytics covers:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>Marketing-site visit counts by source</li>
              <li>Campaign-level signup conversion counts</li>
              <li>Landing-page test measurement without sampling</li>
              <li>Paid-channel ROI at the trial-signup event</li>
              <li>BigQuery / Snowflake export for joining against in-product data</li>
            </ul>
            <p>
              What it does not cover:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>In-product feature adoption</li>
              <li>Retention cohort analysis</li>
              <li>Per-user behavior inside the app</li>
              <li>Session replay</li>
            </ul>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              The PQL measurement pattern
            </h2>
            <p>
              A working PQL definition for European PLG SaaS requires joining three datasets in the warehouse:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Aggregate marketing attribution from cookieless analytics: acquisition channel, campaign, UTM — stored anonymously with signup event metadata.</li>
              <li>Trial signup records from the product database: email, signup timestamp, plan selected (user-level once authenticated).</li>
              <li>In-product activation from Mixpanel/Amplitude or your own event log: activation event, time-to-value (user-level).</li>
            </ol>
            <p>
              The join happens at the warehouse, not in the marketing tracker. Because cookieless analytics exports signup attribution to BigQuery or Snowflake at full resolution (no sampling), you get clean channel metadata on every signup. You then join on your own user/email column to add the activation side. A PQL definition like &ldquo;signed up from paid search + activated within 7 days&rdquo; becomes a single SQL query.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Implementation for a European PLG SaaS
            </h2>
            <p>
              The setup that works for most teams:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Install cookieless analytics on the marketing site only. Leave Mixpanel/Amplitude alone in the app.</li>
              <li>Configure BigQuery / Snowflake export.</li>
              <li>Run side-by-side with GA4 on the marketing site for 30 days.</li>
              <li>Write the join query (channel attribution + signup + product activation).</li>
              <li>Switch channel-level CAC reporting to the new numbers when the side-by-side comparison stabilises.</li>
            </ol>
            <p>
              No cookie banner for the marketing-site analytics itself (keep the banner for advertising pixels if needed). No migration for in-product analytics. No change to the product team&apos;s workflow.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Questions SaaS teams ask
            </h2>
            {faqs.map((f) => (
              <div key={f.question} className="mt-6">
                <h3 className="font-serif text-[1.15rem] font-medium text-text-primary mb-2">{f.question}</h3>
                <p className="text-[0.95rem]">{f.answer}</p>
              </div>
            ))}
          </div>

          <CommercialModule
            hook="Top-of-funnel is where PLG measurement breaks first. See trial signups attributed without consent-driven data loss — last-click, no cookies, no consent gate."
          />

          <RelatedReading currentSlug="cookieless-analytics-for-saas" />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Go deeper
            </h2>
            <ul className="space-y-4">
              <li>
                <Link href="/for/saas" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Sealmetrics for SaaS</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">The vertical page with pains, outcomes and integration specifics.</p>
              </li>
              <li>
                <Link href="/glossary/cookieless-analytics" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless Analytics — definition</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">The technical definition and how it works under GDPR.</p>
              </li>
              <li>
                <Link href="/integrations" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">BigQuery and warehouse integrations</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">How to export at full resolution for PQL joins.</p>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
