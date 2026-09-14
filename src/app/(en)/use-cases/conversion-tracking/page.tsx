import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import {
  articleSchema,
  breadcrumbSchema,
  speakableWebPageSchema,
} from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

const DATE_PUBLISHED = "2026-05-29";
const DATE_MODIFIED = "2026-05-29";

export const metadata: Metadata = {
  title: "Conversion tracking without cookies — the practical setup",
  description:
    "How to track conversions on EU sites without cookies. Setup patterns by platform, event taxonomy, and the platform-pixel parallel.",
  openGraph: {
    title: "Conversion tracking without cookies",
    description:
      "Setup patterns, event taxonomy, and what to keep alongside (Meta/Google pixels) — without breaking the measurement layer.",
    type: "article",
    images: [ogImage("/use-cases/conversion-tracking/")],
    url: "https://sealmetrics.com/use-cases/conversion-tracking/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Conversion tracking without cookies",
    description: "Setup patterns, event taxonomy, and what to keep alongside (Meta/Google pixels) — without breaking the measurement layer.",
    images: [ogImage("/use-cases/conversion-tracking/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/use-cases/conversion-tracking/",
    languages: getAlternates("/use-cases/conversion-tracking"),
  },
};

const faqs = [
  {
    q: "Can I track form-submission conversions without cookies?",
    a: "Yes. Form submissions, button clicks, scroll depth, video plays — any DOM event — are captured server-side on a first-party endpoint. The pixel records the event with channel and landing-page metadata; no cookie is read or written. For a typical lead-gen site, this covers contact-form submissions, demo-request submissions and newsletter signups without any identifier on the device.",
  },
  {
    q: "Does it work for offline conversions?",
    a: "Partially. Offline conversions (phone calls, in-store purchases) need to be ingested via the offline-conversion API with whatever business identifier ties them back to the on-site visit — for example, a unique discount code shown on-site and used in-store. Sealmetrics does not stitch sessions to users, so the join key comes from your business logic, not from the tracker.",
  },
  {
    q: "What about Meta Conversion API and Google Enhanced Conversions?",
    a: "These are platform-side server-to-server pipes for sending conversion data back to Meta and Google for ad optimisation. They still require user-level data to be sent (hashed email, hashed phone). Sealmetrics does not feed them — Meta Conversion API and Google Enhanced Conversions remain a separate concern, typically wired through your tag manager or via your CRM. Sealmetrics handles the measurement side; the ad pixels handle the optimisation side.",
  },
  {
    q: "Will my paid-ad platforms still optimise correctly?",
    a: "Yes, as long as the platform pixels keep firing. Meta and Google pixels run as a separate layer with their own consent and their own cookies — they exist to feed the bidder, not to measure your business. Sealmetrics replaces the measurement layer (the number you decide on); the platform pixels stay for their optimisation purpose. The right setup is parallel: pixels for bidding, Sealmetrics for truth.",
  },
  {
    q: "How do I handle GA4 conversion goals during the transition?",
    a: "Keep them. GA4 conversion goals power Google Ads conversion import — that integration is valuable independent of measurement accuracy. The recommended pattern is: Sealmetrics records the conversion event for measurement (channel attribution, revenue reporting), GA4 records the conversion event for Google Ads bidding. Both layers run in parallel from the same dataLayer push. The 30-day parallel-run is documented on the GA4 migration use-case page.",
  },
  {
    q: "Does it support custom conversion definitions?",
    a: "Yes. Beyond the standard eCommerce events (add_to_cart, begin_checkout, purchase), any custom event from your site can be configured as a conversion in the Sealmetrics workspace — including scroll-depth, time-on-page thresholds, micro-conversions (PDF downloads, video starts) and any element your team flags. Conversions are aggregate counts; no per-user behavioural sequencing.",
  },
];

export default function ConversionTrackingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Use cases", href: "/use-cases" }, { label: "Conversion tracking" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Use cases", url: "/use-cases" },
          { name: "Conversion tracking", url: "/use-cases/conversion-tracking" },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/use-cases/conversion-tracking",
          name: "Conversion tracking without cookies — the practical setup",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline:
            "Conversion tracking without cookies — setup patterns, event taxonomy, and platform-pixel coexistence",
          description:
            "How to track conversions on an EU site without cookies or banners. Setup patterns by platform, event taxonomy, and what platform-side pixels still need.",
          datePublished: DATE_PUBLISHED,
          dateModified: DATE_MODIFIED,
          url: "/use-cases/conversion-tracking",
          category: "Implementation",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
            Use case — Conversion tracking
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Conversion tracking.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              No cookie, no banner.
            </em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            How to track every conversion that matters — purchase,
            form submit, lead, signup — on an EU site without a
            cookie banner, without per-user identifiers, and without
            losing the platform-side pixels that still power Google
            Ads and Meta optimisation.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            Conversion tracking in 2026 needs two layers, not one. A
            <strong> measurement layer</strong> (anonymous, cookieless,
            captures conversions without consent gaps for revenue reporting) and an
            <strong> optimisation layer</strong> (Meta pixel, Google
            Ads pixel — feeds the bidder, still requires consent for
            its cookies). Sealmetrics is the first; Meta Conversion
            API and Google Enhanced Conversions are the second. The
            two run in parallel from the same dataLayer push, fed
            independently, with the Sealmetrics number used for
            revenue decisions and the platform pixels used for
            bidding optimisation.
          </>
        }
        bullets={[
          <><strong>Two layers</strong> — measurement (Sealmetrics) + optimisation (Meta / Google pixels).</>,
          <><strong>One dataLayer push</strong> feeds both.</>,
          <><strong>Any conversion type</strong> — purchase, form, signup, custom — aggregate-anonymous.</>,
          <><strong>Offline conversions</strong> via business-key join (discount codes, CRM IDs), not visitor stitching.</>,
        ]}
      />

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">The two-layer model</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            The clearest way to think about conversion tracking
            after the cookie collapse is to separate the two jobs
            cookies used to do badly together. Measurement (counting
            real events for revenue decisions) and optimisation
            (sending signals to ad platforms so they bid better).
            They are different layers, with different identifier
            requirements, different consent profiles and different
            failure modes.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-warm-100 rounded-2xl p-7 bg-warm-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-4">Measurement layer</h3>
              <p className="text-[15px] leading-[1.7] text-ink">
                The number the CFO sees. Aggregate, anonymous, no
                cookie, no identifier, no consent banner. Captures
                observed conversions on the full population, without consent gaps.
                Reconciles with the eCommerce backend on{" "}
                <code className="font-mono text-[13px]">order_id</code>.
              </p>
              <ul className="mt-4 space-y-2 text-[14.5px] leading-[1.7] text-ink-soft list-none pl-0">
                {[
                  "Sealmetrics (this is the layer the page describes)",
                  "First-party server-side from pixel.yourdomain.com",
                  "Outside ePrivacy / GDPR consent scope",
                ].map((s) => (
                  <li key={s} className="flex gap-3"><span className="text-brand" aria-hidden>—</span><span>{s}</span></li>
                ))}
              </ul>
            </div>

            <div className="border border-warm-100 rounded-2xl p-7 bg-warm-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] mb-4" style={{ color: "#B5423B" }}>Optimisation layer</h3>
              <p className="text-[15px] leading-[1.7] text-ink">
                The signal the bidder needs. User-level data sent to
                Meta and Google for ad optimisation. Requires hashed
                email or phone, sets first-party cookies, lives
                inside the consent banner because of the identifier.
              </p>
              <ul className="mt-4 space-y-2 text-[14.5px] leading-[1.7] text-ink-soft list-none pl-0">
                {[
                  "Meta Conversion API + Meta pixel",
                  "Google Ads pixel + Enhanced Conversions",
                  "Still requires consent for its cookies",
                ].map((s) => (
                  <li key={s} className="flex gap-3"><span style={{ color: "#B5423B" }} aria-hidden>—</span><span>{s}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-[15.5px] leading-[1.7] text-ink-soft">
            Both layers run from the same dataLayer push — one
            event fires the Sealmetrics pixel and the platform
            pixels in parallel. The CMP gates only the platform
            pixels; the Sealmetrics pixel runs regardless of
            consent decision.
          </p>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Conversion types covered</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            What can be tracked without cookies? In short: any event
            the browser fires or the server receives. The taxonomy
            below covers the common cases — none of them require a
            cookie or a banner.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">eCommerce purchase events</h3>
              <p className="text-[15px] leading-[1.7] text-ink-soft">
                Native coverage on Shopify, WooCommerce, Magento,
                PrestaShop, OpenCart.
                <code className="font-mono text-[13px]">order_placed</code>{" "}
                fires server-side on the order-confirmation hook with
                revenue, currency, line items and{" "}
                <code className="font-mono text-[13px]">order_id</code>.
                See the per-platform setup on{" "}
                <Link href="/platforms/shopify" className="text-brand underline decoration-1 underline-offset-2">/platforms/shopify</Link>{" "}
                and{" "}
                <Link href="/platforms/woocommerce" className="text-brand underline decoration-1 underline-offset-2">/platforms/woocommerce</Link>
                .
              </p>
            </div>

            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">Lead and form-submission events</h3>
              <p className="text-[15px] leading-[1.7] text-ink-soft">
                Any DOM form submit fires a{" "}
                <code className="font-mono text-[13px]">form_submitted</code>{" "}
                event with the form ID and the channel metadata of
                the page. For a typical lead-gen site this covers
                contact, demo, newsletter, callback. No PII captured
                from the form itself (name, email, phone stay on
                your form processor).
              </p>
            </div>

            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">SaaS signup and trial events</h3>
              <p className="text-[15px] leading-[1.7] text-ink-soft">
                For PLG SaaS sites,{" "}
                <code className="font-mono text-[13px]">signup_completed</code>{" "}
                fires on the post-signup confirmation page. The
                trial-to-paid conversion fires on the first paid
                charge via your billing webhook. Channel attribution
                rolls up against the Sealmetrics dataset; user-level
                in-product analytics live in Mixpanel or Amplitude
                alongside.
              </p>
            </div>

            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">Custom and micro-conversions</h3>
              <p className="text-[15px] leading-[1.7] text-ink-soft">
                Scroll depth, time-on-page thresholds, video plays,
                PDF downloads, custom button clicks — any browser
                event the team flags as a conversion can be
                configured in the workspace. Aggregate counts only;
                no per-user behavioural sequencing.
              </p>
            </div>

            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">Offline conversions</h3>
              <p className="text-[15px] leading-[1.7] text-ink-soft">
                Phone-call bookings, in-store purchases and
                consultation outcomes get joined via a business key —
                typically a unique discount code shown on-site and
                used at the point of conversion. The offline-conversion
                API ingests the event with that business key, which
                ties it back to the source channel on the on-site
                visit. Sealmetrics does not stitch sessions to
                users; the join key comes from your business logic.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">What stays alongside</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            Conversion tracking without cookies is not a complete
            replacement for everything cookie-based pixels used to
            do. Three layers stay in place — each for a different
            reason:
          </p>

          <ul className="mt-8 space-y-4 text-[16px] leading-[1.7] text-ink-soft list-none pl-0">
            {[
              <><strong>Meta Conversion API + Meta pixel.</strong> Feeds the Meta bidder for ad optimisation. User-level data, hashed identifiers, requires consent. Runs inside the banner.</>,
              <><strong>Google Ads pixel + Enhanced Conversions.</strong> Feeds the Google Ads bidder. Same shape as Meta. Runs inside the banner. Often pairs with GA4 conversion goals for legacy consistency.</>,
              <><strong>Product analytics (Mixpanel, Amplitude, PostHog).</strong> User-level in-product event analytics behind authentication. Lives inside the logged-in app, not on the marketing site. Different category, different consent profile.</>,
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-brand" aria-hidden>—</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[15.5px] leading-[1.7] text-ink-soft">
            The right setup is parallel: Sealmetrics on the
            measurement layer (always firing, always counting), the
            platform pixels on the optimisation layer (firing only
            when the visitor consents to the cookie banner).
            Decisions are made on the Sealmetrics number; bidding is
            done on whatever signal the platforms accept.
          </p>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <CommercialModule
            hook="Counting conversions your current setup drops? See the two-layer model running on your own events — microconversions included."
            className="mb-12"
          />

          <h2 className="h-section text-center">Related reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            <Link href="/use-cases/revenue-attribution" className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Use case</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Revenue attribution</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Last-click without consent gaps — what attribution looks like with complete data.
              </p>
            </Link>
            <Link href="/use-cases/ga4-migration" className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Use case</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">GA4 migration plan</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                The 30-day parallel-run for moving conversion measurement off GA4.
              </p>
            </Link>
            <Link href="/cookieless-analytics" className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Pillar</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Cookieless analytics</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                The architecture that makes the measurement layer possible — first-party server-side without identifiers.
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
        titleEn={<>Set up <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>complete conversion tracking</em>. Without the banner.</>}
        titleEs={<>Configura <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>conversion tracking completo</em>. Sin banner.</>}
        ledeEn="Book 30 minutes with the founder. We map your existing conversion goals to Sealmetrics live, configure custom events, and confirm the platform pixels stay intact."
        ledeEs="Reserva 30 min con el founder. Mapeamos tus goals existentes a Sealmetrics en directo, configuramos eventos custom y confirmamos que los pixels de plataforma siguen vivos."
      />
    </>
  );
}
