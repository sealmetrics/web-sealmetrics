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
  title: "GA4 migration — when and how to replace Google Analytics",
  description:
    "A pragmatic GA4 migration guide: when to leave GA4, what to run alongside, the 30-day parallel-run checklist, and the decisions that matter for EU eCommerce.",
  openGraph: {
    title: "GA4 migration — the honest guide for EU eCommerce",
    description:
      "Parallel-run plan, not rip-and-replace. What you keep, what you replace, and how to make the decision in 30 days.",
    type: "article",
    images: [ogImage("/use-cases/ga4-migration/")],
    url: "https://sealmetrics.com/use-cases/ga4-migration/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "GA4 migration — the honest guide for EU eCommerce",
    description: "Parallel-run plan, not rip-and-replace. What you keep, what you replace, and how to make the decision in 30 days.",
    images: [ogImage("/use-cases/ga4-migration/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/use-cases/ga4-migration/",
    languages: getAlternates("/use-cases/ga4-migration"),
  },
};

const faqs = [
  {
    q: "Do I have to remove GA4?",
    a: "No. Most teams keep GA4 running indefinitely. GA4 is the conduit Google requires for Google Ads conversion import and the easiest path to Search Console / Data Studio joins. What changes is what you decide on. After 30 days of parallel running, most customers shift revenue and channel-mix decisions to Sealmetrics and let GA4 handle the Google-Ads side. Two tools, two purposes.",
  },
  {
    q: "How long does the migration actually take?",
    a: "Five minutes to install. First data in the first hour. Decision-ready in week one. Full calibration to your CRM within 30 days of parallel running. There is no historical-data migration step — Sealmetrics begins counting from day one on new data; GA4's historical data stays in GA4 for reference.",
  },
  {
    q: "What about my BigQuery export from GA4?",
    a: "Keep it for historical reference. Sealmetrics ships native BigQuery export at full resolution (no sampling thresholds) on every plan, the free Agentic tier included. Most teams add the Sealmetrics dataset alongside the GA4 dataset and join them in the warehouse — the GA4 dataset for pre-migration history, the Sealmetrics dataset as the source of truth going forward.",
  },
  {
    q: "How does the EU consent banner change?",
    a: "If Sealmetrics replaces the analytics layer entirely, the analytics-specific reason for the banner disappears. The banner may still be required for other tools — Meta pixel, Google Ads remarketing, A/B testing platforms that set cookies. Many teams reduce the banner scope (or remove it on pages without ad pixels) once analytics moves to a cookieless layer. The full legal walk-through lives on the consentless analytics pillar.",
  },
  {
    q: "Will my paid agency push back?",
    a: "Some will. The honest framing: agencies optimise toward the numbers the platform reports. When those numbers leave out part of EU reality (GA4 did not record 29% of visits on a real Shopify store measured over 48 days), optimisation rewards channels that consent more, not channels that perform better. Once you and your agency see the Sealmetrics numbers alongside the CRM, the conversation moves from defending the GA4 dashboard to which channels actually drove the orders. Most agencies adapt; the ones that don't were defending the tool, not the result.",
  },
  {
    q: "Can we migrate gradually or do we cut over?",
    a: "Gradually, always. Sealmetrics is designed to run alongside GA4 from day one — same script tag pattern, parallel ingest, side-by-side dashboards. After 30 days of comparison, decide per use case where each tool fits. Most teams never fully decommission GA4 because the Google Ads integration is valuable; they just stop making strategic decisions on it.",
  },
];

export default function Ga4MigrationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Use cases", href: "/use-cases" }, { label: "GA4 migration" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Use cases", url: "/use-cases" },
          { name: "GA4 migration", url: "/use-cases/ga4-migration" },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/use-cases/ga4-migration",
          name: "GA4 migration guide — when and how to replace Google Analytics",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline:
            "GA4 migration — the honest guide for EU eCommerce, with a 30-day parallel-run plan",
          description:
            "When and how to migrate from Google Analytics 4 to a cookieless EU-hosted alternative. The parallel-run approach, the checklist, the decisions that matter.",
          datePublished: DATE_PUBLISHED,
          dateModified: DATE_MODIFIED,
          url: "/use-cases/ga4-migration",
          category: "Migration",
          author: {
            name: "Rafa Jiménez",
            url: "/authors/rafa-jimenez",
            jobTitle: "Founder, Sealmetrics",
          },
        })}
      />
      <JsonLd
        data={quotationSchema({
          text: "The data Sealmetrics delivers is agnostic, unbiased and neutral. There's no black box.",
          spokenBy: "Toni Andújar",
          spokenByRole: "Digital & Direct Sales Director, Palladium Hotel Group",
          url: "/use-cases/ga4-migration",
        })}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span
            className="eyebrow mb-5"
            style={{ display: "inline-flex", justifyContent: "center" }}
          >
            Use case — GA4 migration
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Migrate from GA4.{" "}
            <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              Without the rip-and-replace.
            </em>
          </h1>
          <p
            className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]"
            style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
          >
            GA4 is not a tool you migrate <em>off</em> — it is a tool you
            migrate <em>past</em>. This is the 30-day parallel-run plan
            most EU eCommerce teams use to move strategic decisions off
            GA4 while keeping the Google Ads conduit intact.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            The honest GA4 migration is not a cutover. It is a 30-day
            parallel run: install the new analytics layer alongside GA4
            on day one, reconcile both against your CRM weekly, and at
            day 30 decide per use case where each tool fits. Most teams
            keep GA4 as the Google Ads conversion conduit and move
            revenue, channel-mix and board-level decisions to the new
            measurement layer. There is no historical-data migration
            step; GA4 history stays in GA4, the new tool counts forward.
            Five minutes to install, decision-ready in week one.
          </>
        }
        bullets={[
          <><strong>No rip-and-replace</strong> — parallel run from day one, decide per use case at day 30.</>,
          <><strong>Keep GA4</strong> for Google Ads conversion import and Search Console join.</>,
          <><strong>Replace the decision layer</strong> — revenue, channel mix, paid ROAS.</>,
          <><strong>30-day calibration</strong> against your CRM tells you the real gap on your real traffic.</>,
        ]}
      />

      {/* WHY TEAMS ARE MIGRATING */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Why teams are migrating in 2026</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            GA4 works. For Google Ads integration, for search-keyword
            joining, for the entry-level reporting most sites do not
            outgrow. The teams migrating are the ones that have
            outgrown those use cases — and one of three patterns
            usually applies.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                Pattern 1 — The CFO stopped accepting the reconciliation gap
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Marketing reports €X. The CRM reports €Y. Finance
                reports €Z. The 25–40% gap eats hours of every quarterly
                review and decisions wait another week. Eventually
                someone above marketing says &ldquo;fix the measurement
                first&rdquo; — and the search for{" "}
                <Link
                  href="/complete-data"
                  className="text-brand underline decoration-1 underline-offset-2"
                >
                  complete data
                </Link>{" "}
                begins.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                Pattern 2 — The DPO asked questions GA4 cannot answer
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                A DPIA refresh, an authority audit, a Digital Omnibus
                briefing — and suddenly the cookie banner, the US data
                transfer and the Consent Mode v2 modelling all need
                defending in writing. GA4&rsquo;s compliance defence is
                always &ldquo;here are the layers we added on top.&rdquo;
                Cookieless EU-hosted is the answer for teams that prefer
                lawful by architecture over lawful by paperwork. See the{" "}
                <Link
                  href="/consentless-analytics"
                  className="text-brand underline decoration-1 underline-offset-2"
                >
                  consentless analytics pillar
                </Link>{" "}
                for the framework.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                Pattern 3 — The AI stack arrived and GA4 had no plug
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Marketing wants to query channel performance through
                ChatGPT, Claude or an internal agent. GA4&rsquo;s
                Data-Studio path is brittle for agents; the BigQuery
                export is sampled above thresholds. Sealmetrics ships a
                native MCP server, full-resolution BigQuery, and answers
                that an agent can quote without a wrapper.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE APPROACH */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">The approach: parallel-run, not cutover</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            Every migration plan that says &ldquo;rip out GA4 and
            install the replacement&rdquo; is selling, not advising.
            The plan that works is the one that runs both tools side by
            side until the team trusts the new numbers more than the
            old ones. Three reasons:
          </p>

          <ul className="mt-8 space-y-3 text-[16px] leading-[1.7] text-ink-soft list-none pl-0">
            {[
              "Side-by-side comparison is the only honest way to measure your real data gap against your own CRM.",
              "Google Ads conversion import lives in GA4. Removing GA4 day one breaks bidding signals on Google Ads.",
              "Stakeholders trust dashboards they have used for years. Trust transfers when the new numbers reconcile with the CRM and the old ones do not — visible, weekly, in writing.",
            ].map((s) => (
              <li key={s} className="flex gap-3">
                <span className="text-brand" aria-hidden>—</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* THE CHECKLIST */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">The 30-day parallel-run checklist</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            One day of setup, four weeks of comparison, one meeting at
            day 30 to decide what stays where.
          </p>

          <ol className="mt-10 space-y-7 list-none pl-0">
            {[
              {
                week: "Day 0",
                title: "Install alongside GA4",
                body: "Add the 846-byte first-party Sealmetrics pixel via the same tag manager you already use for GA4. Configure the CNAME under your own domain (e.g. pixel.yourdomain.com). Verify event firing in the Sealmetrics debugger.",
              },
              {
                week: "Day 1",
                title: "Map the conversion events",
                body: "Mirror the conversion events you track in GA4 (purchase, lead form, signup) into Sealmetrics. For Shopify, WooCommerce, Magento and PrestaShop the order events flow automatically through native integrations.",
              },
              {
                week: "Week 1",
                title: "Pull the first reconciliation report",
                body: "Compare Sealmetrics aggregate conversions against the CRM or backend (Shopify orders, WooCommerce orders, your order DB). Compare against GA4 in the same report. Document the gap by channel — direct, organic, paid search, paid social, email.",
              },
              {
                week: "Week 2",
                title: "Run the first weekly review with marketing",
                body: "Two columns: GA4 numbers and Sealmetrics numbers. Same week. Same channels. Walk through which channels gain share, which lose share, which lose attribution to 'direct' under GA4. The pattern is consistent across customers; the magnitude is yours.",
              },
              {
                week: "Week 3",
                title: "Bring in the agencies",
                body: "Share the comparison with paid-media agencies. Ask them to interpret the gap. The good ones will engage with the Sealmetrics numbers; the ones that resist usually do so because their reporting depends on the GA4 view of their performance.",
              },
              {
                week: "Day 30",
                title: "Decide what stays where",
                body: "One meeting, one decision. Most teams settle on: GA4 stays for Google Ads conversion import and Search Console join. Sealmetrics becomes the source of truth for revenue, channel mix, paid ROAS, board reporting. Update the dashboards stakeholders see; close the GA4-only views.",
              },
            ].map((item) => (
              <li key={item.week} className="flex gap-6">
                <span className="font-mono text-[13px] font-semibold text-brand pt-1 min-w-[80px]">
                  {item.week}
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-ink mb-2">{item.title}</h3>
                  <p className="text-[15.5px] leading-[1.7] text-ink-soft">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-4 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
          <CommercialModule
            hook="Ready for Day 0? We help you install the pixel alongside GA4 today — the parallel month starts the moment it fires."
          />
        </div>
      </section>

      {/* WHAT YOU KEEP / REPLACE */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">What you keep, what you replace</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="border border-warm-100 rounded-2xl p-7 bg-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-4">
                Keep GA4 for
              </h3>
              <ul className="space-y-3 text-[15px] leading-[1.7] text-ink list-none pl-0">
                {[
                  "Google Ads conversion import (the bidding signal).",
                  "Search Console keyword joining (organic search query data).",
                  "Data Studio dashboards that already depend on the GA4 dataset.",
                  "Historical comparisons (year-over-year against pre-migration GA4 data).",
                ].map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="text-brand" aria-hidden>—</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-warm-100 rounded-2xl p-7 bg-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-4">
                Replace with Sealmetrics
              </h3>
              <ul className="space-y-3 text-[15px] leading-[1.7] text-ink list-none pl-0">
                {[
                  "Revenue and conversion reporting (the number you decide on).",
                  "Channel mix and paid ROAS for board-level reporting.",
                  "Reconciliation against CRM / Shopify / PMS — the source of truth.",
                  "EU compliance posture — GDPR / ePrivacy by architecture, EU-only processing.",
                  "AI-agent and MCP integration for the rest of the analytics stack.",
                ].map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="text-brand" aria-hidden>—</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-[15px] leading-[1.7] text-ink-soft text-center max-w-[60ch] mx-auto">
            For the feature-by-feature comparison, see{" "}
            <Link
              href="/vs-ga4"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              Sealmetrics vs Google Analytics 4
            </Link>
            . For the architecture of how consent-independent capture is possible, see{" "}
            <Link
              href="/cookieless-analytics"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              cookieless analytics
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Common migration questions</h2>
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

      {/* CASE STUDY */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand font-semibold">
            Migrated past a Google-Analytics stack
          </span>
          <h2 className="text-[26px] sm:text-[32px] font-semibold tracking-[-0.02em] text-ink mt-3 mb-6 leading-[1.15]">
            How Palladium Hotel Group ran the <em className="italic-accent">30-day parallel</em>.
          </h2>
          <blockquote
            className="border-l-[3px] pl-6 py-1 italic"
            style={{ borderColor: "#2E5C8A", color: "#0E0E0C" }}
          >
            <p className="text-[20px] leading-[1.45] tracking-[-0.01em] font-medium">
              &ldquo;The data Sealmetrics delivers is agnostic, unbiased and neutral. There&rsquo;s no black box.&rdquo;
            </p>
            <cite className="block mt-4 not-italic font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
              Toni Andújar · Digital &amp; Direct Sales Director · Palladium Hotel Group
            </cite>
          </blockquote>
          <p className="mt-6 text-[15.5px] leading-[1.65] text-ink-2">
            Palladium ran Sealmetrics alongside their existing GA-tier
            stack for the first month. The audit surfaced 40% of inbound
            traffic with no source/medium attribution in GA, 35% of
            bookings unassigned to a channel, and a +165%
            Cost-per-Search improvement on Display once the Sealmetrics
            measurement model drove DV360 decisions. They kept GA as
            the Google Ads conduit and moved revenue decisions to
            Sealmetrics.
          </p>
          <Link
            href="/case-studies/palladium-hotel-group"
            className="inline-flex items-center gap-2 mt-6 text-ink font-semibold no-underline border-b border-warm-200 pb-px hover:border-ink"
          >
            Read the full Palladium case study →
          </Link>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={
          <>
            Run the <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              parallel month
            </em>. Decide at day 30.
          </>
        }
        titleEs={
          <>
            Corre el <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              mes en paralelo
            </em>. Decide al día 30.
          </>
        }
        ledeEn="Book a 30-minute walkthrough with the founder. We map your GA4 events to Sealmetrics live and ship the parallel-run plan tailored to your stack."
        ledeEs="Reserva 30 min con el founder. Mapeamos tus eventos GA4 a Sealmetrics en directo y enviamos el plan de paralelo a tu medida."
      />
    </>
  );
}
