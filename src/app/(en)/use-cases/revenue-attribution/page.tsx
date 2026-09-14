import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import {
  articleSchema,
  breadcrumbSchema,
  speakableWebPageSchema,
  quotationSchema,
} from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

const DATE_PUBLISHED = "2026-05-29";
const DATE_MODIFIED = "2026-05-29";

export const metadata: Metadata = {
  title: "Revenue attribution without cookies — EU eCommerce",
  description:
    "Last-click revenue attribution without consent gaps, anonymously at channel level. How it works without cookies, what it captures and what it doesn't.",
  openGraph: {
    title: "Revenue attribution without cookies",
    description:
      "Last-click attribution on data without consent gaps. The architecture, the trade-offs, and why CFOs accept it.",
    type: "article",
    images: [ogImage("/use-cases/revenue-attribution/")],
    url: "https://sealmetrics.com/use-cases/revenue-attribution/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Revenue attribution without cookies",
    description: "Last-click attribution on data without consent gaps. The architecture, the trade-offs, and why CFOs accept it.",
    images: [ogImage("/use-cases/revenue-attribution/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/use-cases/revenue-attribution/",
    languages: getAlternates("/use-cases/revenue-attribution"),
  },
};

const faqs = [
  {
    q: "Why last-click and not multi-touch?",
    a: "Multi-touch attribution requires linking pageview A and pageview B to the same individual across sessions. That linkage requires a per-user identifier — a cookie, a fingerprint, a stitched ID. The same identifier triggers ePrivacy Art. 5(3), GDPR consent and the 40–60% banner-rejection loss. Last-click on observed events does not need the identifier: each conversion is attributed to the channel observed on the page where it fired. The trade-off is honest — last-click does not measure earlier influence — and for media-mix decisions on a single channel at a time, last-click is usually the correct question anyway.",
  },
  {
    q: "What about view-through attribution?",
    a: "Sealmetrics does not measure view-through (impressions that did not produce a click). View-through requires linking ad-server impression logs to subsequent visits per user — which is the same identifier dependency as multi-touch. View-through measurement belongs in the ad platform (Meta, Google) or in a marketing-mix model (MMM) built on aggregate spend and revenue. Sealmetrics provides the aggregate revenue side; MMM tools provide the modelling.",
  },
  {
    q: "How does last-click without consent gaps differ from GA4's last-click?",
    a: "GA4 applies last-click within its attribution windows on the data it actually captured — typically 13–40% of EU traffic after consent rejection, ad blockers and ITP. The credit GA4 assigns to channels is correct for that subset but biased toward channels that consent more. Sealmetrics applies last-click on observed conversions across the full population, without consent gaps — same model, complete data underneath.",
  },
  {
    q: "Can I get the attribution by campaign and creative, not just channel?",
    a: "Yes. The full UTM stack is captured: source, medium, campaign, content, term. Aggregate revenue rolls up at any combination of those dimensions. The campaign-level totals reconcile with the platform-side spend exactly (within rounding) when you join the Sealmetrics dataset against Google Ads / Meta Ads cost data in BigQuery.",
  },
  {
    q: "What if my conversion happens after multiple sessions?",
    a: "The conversion is attributed to the channel observed on the page load where it fires. If the customer returned via direct after first arriving from Google CPC, the credit goes to direct — not to the original Google CPC visit. This is the explicit cost of not tracking individuals across sessions. It is also, for most channel-mix decisions, the more honest answer: the channel that closed the sale gets the credit. Earlier touchpoints belong in a marketing-mix model, not in last-click attribution.",
  },
  {
    q: "How does this reconcile with CRM revenue?",
    a: "Aggregate revenue reconciles within 15–20% of the CRM/backend totals once shipping, taxes, gift cards and refunds are normalised. Per-order reconciliation uses the same order_id from your eCommerce platform (Shopify, WooCommerce, Magento, PrestaShop). Finance can join the Sealmetrics dataset and the order-ledger dataset in BigQuery on order_id with no fuzzy matching.",
  },
];

export default function RevenueAttributionPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Use cases", href: "/use-cases" }, { label: "Revenue attribution" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Use cases", url: "/use-cases" },
          { name: "Revenue attribution", url: "/use-cases/revenue-attribution" },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/use-cases/revenue-attribution",
          name: "Revenue attribution without cookies — the EU eCommerce approach",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline:
            "Revenue attribution without cookies — last-click without consent gaps, anonymously, at channel level",
          description:
            "How last-click revenue attribution works without cookies, what the architecture captures, what it deliberately does not, and why CFOs accept the trade-off.",
          datePublished: DATE_PUBLISHED,
          dateModified: DATE_MODIFIED,
          url: "/use-cases/revenue-attribution",
          category: "Attribution",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd
        data={quotationSchema({
          text: "The value is in optimising the budget and the investment. It's not just what extra you generate: it's that you're investing better, because you're shifting toward a channel or strategy you weren't seeing before.",
          spokenBy: "Eduardo Martin",
          spokenByRole: "Analytics & Campaigns, Dreamplace Hotels",
          url: "/use-cases/revenue-attribution",
        })}
      />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
            Use case — Revenue attribution
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Revenue attribution.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              Without consent gaps.
            </em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Last-click revenue attribution applied to the full
            population of observed conversions — anonymously, at
            channel level. The architecture, the honest trade-offs,
            and why finance teams accept this number when they reject
            the GA4 one.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            Revenue attribution is the connection between a marketing
            channel and the revenue it generated. Sealmetrics applies
            <strong> last-click attribution</strong> at the event
            level: each conversion is attributed to the channel
            observed on the page load where the conversion fires. The
            model is applied to <strong>observed
            conversions without consent gaps</strong> — no consent gate, no ad-blocker
            drop-off, no cookie expiry. The trade-off is concrete: no
            multi-touch model, no per-visitor journey, no
            view-through. For media-mix decisions and CFO
            reconciliation, that trade-off is favourable; for product
            attribution inside a logged-in app, use Mixpanel or
            Amplitude alongside.
          </>
        }
        bullets={[
          <><strong>Last-click without consent gaps</strong> — model applied to the full population, not the consenting fraction.</>,
          <><strong>Channel + campaign + creative</strong> — full UTM stack captured per conversion.</>,
          <><strong>order_id reconciliation</strong> — joins natively with Shopify / WooCommerce / PMS backends.</>,
          <><strong>Honest about limits</strong> — no multi-touch, no view-through, no per-visitor journeys.</>,
        ]}
      />

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">What revenue attribution actually answers</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            The question a CMO defending media spend needs to answer is
            simple: <em>which channel produced the revenue this
            week, and by how much.</em> That question splits into
            three concrete sub-questions, each of which last-click without
            consent gaps answers cleanly:
          </p>

          <div className="mt-10 space-y-7">
            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">1. By channel — which source closed the sale</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Every conversion is attributed to the channel observed
                on the page where it fired. Direct, organic, paid
                search, paid social, email, referral, display — the
                channel that closed the sale gets the credit. Aggregate
                weekly totals tell you which sources moved revenue
                this week and which did not.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">2. By campaign — which paid campaign worked</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                The full UTM stack is captured per conversion. Revenue
                rolls up by campaign, ad set, creative — and joins
                against platform cost (Google Ads, Meta Ads) for
                accurate ROAS at the campaign level. The platform
                tells you what you spent; Sealmetrics tells you what
                actually came back.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">3. By landing page — which page converted</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Conversions roll up by landing page and entry path,
                so the CRO conversation is grounded in revenue, not
                bounce rate. A landing-page test that lifts session
                count but loses revenue tells you something different
                than a test that does both — and both are visible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Why last-click — and not multi-touch</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            The most common objection to last-click is &ldquo;but
            multi-touch is more accurate.&rdquo; The honest answer is
            that multi-touch requires architecture Sealmetrics does
            not have — and the architecture has a cost most teams
            should not pay.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">Multi-touch requires per-user tracking</h3>
              <p className="text-[15.5px] leading-[1.7] text-ink-soft">
                To distribute credit across the chain of touchpoints,
                multi-touch models need to know which touchpoints
                involved the same person. That requires an identifier
                — a cookie, a fingerprint, a stitched ID — and the
                identifier triggers ePrivacy consent and the 40–60%
                rejection loss. The math you save with multi-touch is
                eaten by the data you lose to the cookie banner.
                Definition on the{" "}
                <Link
                  href="/glossary/multi-touch-attribution"
                  className="text-brand underline decoration-1 underline-offset-2"
                >
                  multi-touch attribution glossary page
                </Link>
                .
              </p>
            </div>

            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">Last-click does not need the identifier</h3>
              <p className="text-[15.5px] leading-[1.7] text-ink-soft">
                Last-click attributes the conversion to the channel
                observed on the page where it fired. No earlier
                touchpoints need to be remembered. No identifier
                needs to persist. The model is applied to every
                observed conversion — full population — because every
                conversion is observed (no cookie to expire, no
                consent to reject). Definition on the{" "}
                <Link
                  href="/glossary/last-click-attribution"
                  className="text-brand underline decoration-1 underline-offset-2"
                >
                  last-click attribution glossary page
                </Link>
                .
              </p>
            </div>

            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">Where multi-touch belongs instead</h3>
              <p className="text-[15.5px] leading-[1.7] text-ink-soft">
                The right home for multi-touch reasoning is a
                marketing-mix model (MMM) built on aggregate spend and
                aggregate revenue — no per-individual stitching
                required. The Sealmetrics aggregate revenue dataset is
                exactly what an MMM needs as the revenue side of the
                equation. Many customers run the two together: MMM in
                the warehouse for cross-channel influence, Sealmetrics
                last-click as the measurement layer underneath.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">The reconciliation a CFO accepts</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            A CFO will not accept a marketing number that does not
            reconcile to the order ledger. Two reconciliation levels
            that finance teams sign against:
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-warm-100 rounded-2xl p-6 bg-warm-white">
              <h3 className="text-[16px] font-semibold text-ink mb-3">Aggregate weekly / monthly</h3>
              <p className="text-[14.5px] leading-[1.65] text-ink-soft">
                Total Sealmetrics-attributed revenue lands within{" "}
                <strong>15–20%</strong> of the eCommerce backend
                (Shopify, WooCommerce, Magento). The residual gap is
                shipping discounts, taxes and refunds handled
                differently — not measurement error.
              </p>
            </div>
            <div className="border border-warm-100 rounded-2xl p-6 bg-warm-white">
              <h3 className="text-[16px] font-semibold text-ink mb-3">Per-order in the warehouse</h3>
              <p className="text-[14.5px] leading-[1.65] text-ink-soft">
                Every order in the eCommerce backend appears in
                Sealmetrics with the same{" "}
                <code className="font-mono text-[13px]">order_id</code>.
                Finance joins both datasets in BigQuery on a single
                key — no fuzzy matching, no probability scoring.
              </p>
            </div>
          </div>

          <blockquote className="mt-10 border-l-[3px] pl-6 py-1 italic" style={{ borderColor: "#2E5C8A", color: "#0E0E0C" }}>
            <p className="text-[18px] leading-[1.45] tracking-[-0.01em] font-medium">
              &ldquo;The value is in optimising the budget and the investment. It&rsquo;s not just what extra you generate: it&rsquo;s that you&rsquo;re investing better, because you&rsquo;re shifting toward a channel or strategy you weren&rsquo;t seeing before.&rdquo;
            </p>
            <cite className="block mt-4 not-italic font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
              Eduardo Martin · Analytics &amp; Campaigns · Dreamplace Hotels
            </cite>
          </blockquote>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <CommercialModule
            hook="Want this reconciliation on your own ledger? We run last-click on your traffic and join it against your CRM — live, in 30 minutes."
            className="mb-12"
          />

          <h2 className="h-section text-center">Related reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            <Link href="/complete-data" className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Pillar</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Complete data</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                The wider argument: incomplete data produces wrong decisions; what data without consent gaps changes.
              </p>
            </Link>
            <Link href="/cookieless-analytics" className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Pillar</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Cookieless analytics</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Why the architecture is possible — first-party server-side without identifiers.
              </p>
            </Link>
            <Link href="/glossary/last-click-attribution" className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Glossary</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Last-click attribution</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Definition, what it credits, where it differs from multi-touch.
              </p>
            </Link>
            <Link href="/use-cases/ga4-migration" className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Use case</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">GA4 migration plan</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                30-day parallel-run to move revenue decisions off GA4 without breaking Google Ads.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Common questions</h2>
          <dl className="mt-12 divide-y divide-warm-100 border-y border-warm-100">
            {faqs.map((f) => (
              <div key={f.q} className="py-7">
                <dt className="text-[17px] font-semibold text-ink mb-3">{f.q}</dt>
                <dd data-speakable className="faq-answer text-[15.5px] leading-[1.7] text-ink-soft max-w-[68ch]">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={<>See <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>your</em> attribution without consent gaps.</>}
        titleEs={<>Ve <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>tu</em> atribución sin huecos de consentimiento.</>}
        ledeEn="Book 30 minutes with the founder. We run last-click on your traffic and reconcile against your CRM live — you see the channels that actually closed."
        ledeEs="Reserva 30 min con el founder. Corremos last-click sobre tu tráfico y conciliamos contra tu CRM en directo — ves los canales que de verdad cierran."
      />
    </>
  );
}
