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
import { ogImage } from "@/lib/seo/og";

const DATE_PUBLISHED = "2026-05-29";
const DATE_MODIFIED = "2026-05-29";

export const metadata: Metadata = {
  title: "Shopify analytics without cookies — Sealmetrics integration",
  description:
    "Install Sealmetrics on Shopify with the Pixel app and theme embed. Cookieless analytics, server-confirmed purchases and no analytics consent banner.",
  openGraph: {
    title: "Shopify analytics without cookies — Sealmetrics integration",
    description:
      "The Sealmetrics Pixel app plus a Theme App Extension, connected from your dashboard. Full eCommerce funnel coverage, purchases confirmed server-side via webhook.",
    type: "article",
    images: [ogImage("/platforms/shopify/")],
    url: "https://sealmetrics.com/platforms/shopify/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Shopify analytics without cookies — Sealmetrics integration",
    description: "The Sealmetrics Pixel app plus a theme app embed on any Shopify plan. Full eCommerce funnel coverage, purchases confirmed server-side via webhook.",
    images: [ogImage("/platforms/shopify/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/platforms/shopify/",
    languages: getAlternates("/platforms/shopify"),
  },
};

const events = [
  { name: "pageview", maps: "Automatic", note: "Fires on every page load via the Sealmetrics tracker." },
  { name: "view_product", maps: "view_item (GA4 equivalent)", note: "Product page load. Product name, SKU, price, currency, ID." },
  { name: "add_to_cart", maps: "add_to_cart", note: "Intercepts /cart/add requests. Product, price, quantity, currency." },
  { name: "initiate_checkout", maps: "begin_checkout", note: "Fires once per checkout attempt — cart submit, checkout button, or Buy Now." },
  { name: "purchase", maps: "purchase", note: "Confirmed server-side via Shopify's orders/create webhook. Revenue, currency, line items." },
];

const faqs = [
  {
    q: "Does Sealmetrics work on Shopify Standard or only Plus?",
    a: "Any Shopify plan that allows app embeds — there's no Plus/Standard distinction. You connect the Sealmetrics Pixel app from your Sealmetrics dashboard (OAuth), then enable the \"Sealmetrics Analytics\" app embed in your theme and paste your Account ID. Same install, same event coverage, on every plan.",
  },
  {
    q: "How does it reconcile with Shopify Analytics?",
    a: "At the aggregate level, against Shopify's own orders for the same period. In Incapto's 48-day parallel run on Shopify, Sealmetrics recorded 96% of real online-store orders and 97% of revenue. Leave out subscriptions, POS and manual admin orders, which have no web visit behind them. Sealmetrics does not store the Shopify order ID externally, by design, so the comparison is on totals and channels, not a row-by-row join.",
  },
  {
    q: "Does it replace Shopify's native analytics?",
    a: "No. Shopify Analytics stays — it is the operational view for the merchandising team (which products are selling, which collections are converting, which discount codes are working). Sealmetrics replaces the marketing-side analytics (which channels and campaigns drove the revenue). They answer different questions on overlapping data.",
  },
  {
    q: "What happens with the existing Google Analytics on my Shopify store?",
    a: "Run both in parallel. GA4 keeps firing for Google Ads conversion import and for any GTM container you already have. Sealmetrics installs alongside without touching GA4. After 30 days, most teams move strategic decisions to Sealmetrics and keep GA4 as the Google Ads conduit. The full migration plan lives on /use-cases/ga4-migration.",
  },
  {
    q: "Does it track the purchase on checkout.shopify.com (Shopify-hosted checkout)?",
    a: "Yes. The purchase itself is confirmed server-side: when an order is placed, Shopify sends an orders/create webhook to Sealmetrics with the revenue, currency and line items. No script needs to load on checkout.shopify.com at all — the browser-side loader only needs to see the funnel up to initiate_checkout.",
  },
  {
    q: "What about Shopify Markets and multi-currency?",
    a: "Multi-currency stores are supported. Revenue is recorded in the original transaction currency and converted to a reporting currency using daily ECB rates. Shopify Markets storefronts behave as separate properties or as one rolled-up property depending on how the account is configured.",
  },
];

export default function ShopifyPlatformPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Platforms", href: "/platforms" }, { label: "Shopify" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Platforms", url: "/platforms" },
          { name: "Shopify", url: "/platforms/shopify" },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/platforms/shopify",
          name: "Shopify analytics without cookies — Sealmetrics integration",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline:
            "Shopify analytics without cookies — install, events, and order reconciliation",
          description:
            "Install Sealmetrics on any Shopify plan via the Pixel app and a theme app embed. Cookieless capture, full eCommerce funnel coverage, aggregate reconciliation against Shopify's own orders.",
          datePublished: DATE_PUBLISHED,
          dateModified: DATE_MODIFIED,
          url: "/platforms/shopify",
          category: "Integration",
          author: {
            name: "Rafa Jiménez",
            url: "/authors/rafa-jimenez",
            jobTitle: "Founder, Sealmetrics",
          },
        })}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
            Platform — Shopify
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Shopify analytics.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              No banner.
            </em>
          </h1>
          <p
            className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]"
            style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
          >
            One app, one theme embed, any Shopify plan. Full
            eCommerce funnel coverage from pageview to order
            confirmation. Checked against the store&rsquo;s own orders:
            96% of real orders and 97% of revenue recorded in
            Incapto&rsquo;s 48-day parallel run.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            Sealmetrics connects to Shopify through the Sealmetrics
            Pixel app (OAuth, from your Sealmetrics dashboard) and a
            Theme App Extension you enable as an app embed — the
            same install on any Shopify plan, no Plus/Standard split.
            The tag is cookieless and first-party (designed so the
            analytics needs no consent banner) and covers the full funnel:
            pageview, view_product, add_to_cart, initiate_checkout —
            with the purchase confirmed server-side via
            Shopify&rsquo;s orders/create webhook, not from the
            browser. Aggregate orders and revenue can be checked
            against Shopify&rsquo;s own totals — in Incapto&rsquo;s
            48-day parallel run, Sealmetrics recorded 96% of real
            online-store orders and 97% of revenue; Sealmetrics does not store the
            Shopify order ID externally, so reconciliation is at
            the aggregate level, not a row-by-row join.
          </>
        }
        bullets={[
          <><strong>One install path</strong> — Pixel app + theme app embed, every Shopify plan.</>,
          <><strong>Full funnel coverage</strong> from pageview to a server-confirmed purchase.</>,
          <><strong>Aggregate reconciliation</strong> — 96% of real orders and 97% of revenue in Incapto&rsquo;s parallel run.</>,
          <><strong>No banner</strong> required for the analytics layer — cookieless first-party server-side.</>,
        ]}
      />

      {/* INSTALL */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Install on Shopify</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            One install path for every Shopify plan that allows app
            embeds — no distinction between Plus and Standard.
          </p>

          <div className="mt-10 space-y-6">
            <div className="border border-warm-100 rounded-2xl p-7 bg-warm-white">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Step 1 — Connect the app</span>
              </div>
              <ol className="mt-3 list-decimal pl-5 space-y-2 text-[15px] leading-[1.7] text-ink">
                <li>In the Sealmetrics dashboard, go to Settings → Integrations → Shopify.</li>
                <li>Select the site you want to connect and enter your Shopify domain.</li>
                <li>Click <strong>Connect Shopify</strong> and authorize the Sealmetrics Pixel app — this registers the conversion webhook automatically.</li>
              </ol>
            </div>

            <div className="border border-warm-100 rounded-2xl p-7 bg-warm-white">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Step 2 — Activate the tracker</span>
              </div>
              <ol className="mt-3 list-decimal pl-5 space-y-2 text-[15px] leading-[1.7] text-ink">
                <li>Copy your <strong>Account ID</strong> from the connected Shopify card in the dashboard.</li>
                <li>In Shopify, open the theme editor → Theme → App embeds, and enable <strong>Sealmetrics Analytics</strong>.</li>
                <li>Paste your Account ID into the embed&rsquo;s field and save.</li>
              </ol>

              <p className="mt-4 text-[14.5px] leading-[1.65] text-ink-soft">
                The embed loads the Sealmetrics loader by account:
              </p>

              <pre className="mt-5 p-5 bg-ink text-warm-50 rounded-xl text-[12.5px] leading-[1.6] overflow-x-auto font-mono">
{`<script async src="https://t.sealmetrics.com/shopify-loader.js?account=YOUR_ACCOUNT_ID"></script>`}
              </pre>

              <p className="mt-4 text-[14.5px] leading-[1.65] text-ink-soft">
                The loader injects the tracker, writes Sealmetrics
                session attributes to the cart, and sets up the
                microconversion listeners below. No shopper-facing
                UI is rendered — the tracker is invisible by design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS CAPTURED */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Events captured</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            No custom event configuration required — the events
            below flow automatically once the app embed is active
            and the conversion webhook is registered.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-[14.5px] border-collapse">
              <thead>
                <tr className="border-b border-warm-200 text-left">
                  <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft font-semibold">Sealmetrics event</th>
                  <th className="py-3 px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft font-semibold">Maps to</th>
                  <th className="py-3 pl-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft font-semibold">What it carries</th>
                </tr>
              </thead>
              <tbody className="text-ink">
                {events.map((e) => (
                  <tr key={e.name} className="border-b border-warm-100">
                    <td className="py-3 pr-4 font-mono text-[13.5px]">{e.name}</td>
                    <td className="py-3 px-4 text-ink-soft">{e.maps}</td>
                    <td className="py-3 pl-4 text-ink-soft">{e.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-[14.5px] leading-[1.65] text-ink-soft">
            All events are aggregate-anonymous: no customer email, no
            checkout email, no IP address, no fingerprint stored, and
            the order ID is not stored externally. What is captured is
            what is needed for channel attribution and revenue
            reporting — line items, revenue, currency, channel and
            landing page.
          </p>
        </div>
      </section>

      {/* ORDER RECONCILIATION */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Order reconciliation with Shopify</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            The number that matters in a CFO review is whether the
            marketing dashboard ties to the Shopify backend.
            Sealmetrics is built to reconcile at two levels:
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-warm-100 rounded-2xl p-6 bg-warm-white">
              <h3 className="text-[16px] font-semibold text-ink mb-3">Aggregate level</h3>
              <p className="text-[14.5px] leading-[1.65] text-ink-soft">
                Compare Sealmetrics orders and revenue with Shopify&rsquo;s
                Online Store orders for the same period. In{" "}
                <Link href="/case-studies/incapto" className="text-brand underline decoration-1 underline-offset-2">Incapto&rsquo;s 48-day parallel run</Link>,
                Sealmetrics recorded{" "}
                <strong>96% of real orders and 97% of revenue</strong>.
                Leave out subscriptions, POS and manual admin orders —
                none of them has a web visit behind it.
              </p>
            </div>

            <div className="border border-warm-100 rounded-2xl p-6 bg-warm-white">
              <h3 className="text-[16px] font-semibold text-ink mb-3">Why not order-by-order</h3>
              <p className="text-[14.5px] leading-[1.65] text-ink-soft">
                Sealmetrics does not store the Shopify order ID
                externally — that&rsquo;s deliberate, part of the
                same privacy-first design that keeps the analytics
                layer cookieless. Reconciliation happens at the
                aggregate/channel level instead, which is also
                where the marketing decisions actually get made.
              </p>
            </div>
          </div>

          <p className="mt-8 text-[15px] leading-[1.7] text-ink-soft">
            For the wider argument about what complete-data
            reconciliation enables for CFO and board reporting, see
            the{" "}
            <Link
              href="/complete-data"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              complete data pillar
            </Link>
            .
          </p>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Related reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            <Link
              href="/blog/cookieless-analytics-for-ecommerce"
              className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">eCommerce</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Cookieless analytics for eCommerce</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                The Shopify reconciliation pattern in full editorial detail.
              </p>
            </Link>

            <Link
              href="/use-cases/ga4-migration"
              className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Use case</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">GA4 migration — 30-day parallel plan</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                How to run Sealmetrics alongside your existing GA4 install without breaking Google Ads.
              </p>
            </Link>

            <Link
              href="/cookieless-analytics"
              className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Pillar</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Cookieless analytics</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Why the architecture works, what it captures, and what it deliberately does not.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Common Shopify questions</h2>
          <dl className="mt-12 divide-y divide-warm-100 border-y border-warm-100">
            {faqs.map((f) => (
              <div key={f.q} className="py-7">
                <dt className="text-[17px] font-semibold text-ink mb-3">{f.q}</dt>
                <dd
                  data-speakable
                  className="faq-answer text-[15.5px] leading-[1.7] text-ink-soft max-w-[68ch]"
                >
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={
          <>
            Connect the app. <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              See real channel revenue
            </em> this week.
          </>
        }
        titleEs={
          <>
            Conecta la app. <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              Ve los ingresos reales por canal
            </em> esta semana.
          </>
        }
        ledeEn="Book 30 minutes with the founder. We install on your Shopify store live, run the first reconciliation against your CRM, and you keep the dashboard."
        ledeEs="Reserva 30 min con el founder. Instalamos en tu Shopify en directo, hacemos la primera conciliación contra tu CRM y te quedas con el dashboard."
      />
    </>
  );
}
