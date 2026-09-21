import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Changelog — Sealmetrics",
  description:
    "Product updates and new features from Sealmetrics. See what we have shipped recently.",
  openGraph: {
    title: "Changelog — Sealmetrics",
    description: "Product updates and new features from Sealmetrics.",
    type: "website",
    images: [ogImage("/changelog/")],
    url: "https://sealmetrics.com/changelog/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Changelog — Sealmetrics",
    description: "Product updates and new features from Sealmetrics.",
    images: [ogImage("/changelog/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/changelog/",
    languages: getAlternates("/changelog"),
  },
};

const entries = [
  {
    date: "September 2026",
    updates: [
      {
        title: "UTM Mapping override — Shopping and Performance Max clicks credited to the campaign that paid for them",
        type: "New",
        desc: "Google Shopping and Performance Max serve product links that already carry utm_source, utm_medium and utm_campaign from the feed, and a Google Ads final URL suffix can only append parameters, never remove them. Until now the feed's UTMs always won: paid clicks were attributed to the wrong campaign and there was nothing the advertiser could do about it. Each UTM Mapping now has an \u201COverride the UTM if the URL already has one\u201D option. With it on, the value of your custom parameter is written even when the URL already carries that UTM, so the revenue lands on the campaign that bought the click. Enable it when you create the mapping, or with the Override switch on any row of the list. It is off by default: mappings that don't use it behave exactly as before.",
      },
    ],
  },
  {
    date: "August 2026",
    updates: [
      {
        title: "More accurate bounce rate — only page views count toward engagement",
        type: "Improved",
        desc: "A visit is engaged when it sees more than one page, and from August 31, 2026 only real page views count toward that. Microconversions (CTA clicks, scroll, pricing views) and conversions are still recorded and keep their full attribution — campaign, landing page, device — but no longer take part in how a visit is counted, and no longer restart a session when fired on a URL that still carries utm_* parameters. Expect your bounce rate to drop by around 9% on that date: the traffic is the same, the engaged visits are now counted properly. Historical data is not recalculated, so there is a step in the series. No action required.",
      },
      {
        title: "Ephemeral session identifiers — rotated every day",
        type: "Improved",
        desc: "The session identifier we use to count visits without cookies is now ephemeral: it expires and regenerates daily, and the key material behind each rotation is destroyed immediately afterwards. Activity from the same device can no longer be linked across days or across sites — by anyone, ourselves included. Your reports are unaffected and no action is required.",
      },
      {
        title: "Click IDs are no longer stored",
        type: "Improved",
        desc: "Ad-platform click identifiers (gclid, fbclid, msclkid and the like) are now used only at the moment of the visit to attribute the channel, and are never stored — not as a field, not inside stored URLs. Campaign attribution for Google Ads, Meta and others works exactly as before. If you use the raw-data endpoints or the BigQuery export, the click ID field is gone from the responses (NULL in existing BigQuery tables): that's not a bug, that's privacy.",
      },
      {
        title: "Raw User-Agents and IPs removed from storage and server logs",
        type: "Improved",
        desc: "The browser's full User-Agent string is no longer retained in analytics storage, and our edge access logs no longer record visitor IP addresses or User-Agents. Browser, device and country reports are computed in flight and keep working unchanged.",
      },
    ],
  },
  {
    date: "July 2026",
    updates: [
      {
        title: "Seal AI Private — EU-hosted AI with token packs",
        type: "New",
        desc: "Seal AI Private is generally available: the managed AI provider behind LENS, processed entirely in the EU (Paris) with no prompt retention and no API key to manage. A paid add-on on Growth, included on Scale and Enterprise, with 5M tokens per calendar month for the whole organisation and email alerts at 80% and 100%. Extra 5M-token packs cost €358.80 each, never expire, and are consumed only after the monthly quota. When the quota runs out, any user can fall back to their own Anthropic, OpenAI, Gemini or DeepSeek key.",
      },
      {
        title: "Sources report — referral traffic grouped by domain, GA4-style",
        type: "Improved",
        desc: "The Sources tab now shows referral traffic as source domains (reddit.com / referrer), unifying historical data under the same convention. The Referrers tab keeps its URL-level detail, one row per referring URL. In the API, referral rows now appear in /stats/sources as domains and are excluded from /stats/terms.",
      },
      {
        title: "Custom Channel Grouping — from the dashboard, CSV or MCP",
        type: "New",
        desc: "Define your own marketing channels on top of (or overriding) the GA4-style defaults, with a drafts → test → publish workflow. Rule form with a \u201CTest a visit\u201D tester that runs the same engine as the pixel, an Override button on default channels, CSV/JSON import and export, and MCP tools for AI-assisted rule authoring. Every write tool is draft-only by design — publishing is always a human action. New rules take effect in about 5 minutes and never rewrite historical data.",
      },
      {
        title: "Channel classification — more accurate Direct and Referral",
        type: "Improved",
        desc: "Default classification rules for Direct (no referrer, no campaign parameters) and Referral (external sites without UTM tagging) were refined to match the GA4-style conventions the tracker already used internally. From July 20, 2026 a portion of traffic previously reported as Unassigned appears as Direct or Referral. New traffic only — historical rows keep their classification, and custom channel rules keep priority.",
      },
    ],
  },
  {
    date: "June 2026",
    updates: [
      {
        title: "Bot-blocking algorithm update — fewer false positives",
        type: "Improved",
        desc: "Deployed June 2, 2026 at 20:00 CET. The bot-blocking algorithm no longer filters out legitimate human traffic that was previously misidentified as automated. Accounts affected by the old behaviour see a recovery in reported human traffic from that timestamp onward.",
      },
    ],
  },
  {
    date: "May 2026",
    updates: [
      {
        title: "Attribution: internal hits with UTMs no longer open a new session",
        type: "Improved",
        desc: "From May 25, 2026, when a hit carries UTM parameters and the referrer is your own domain, the referrer wins: the hit is counted as a pageview inside the existing session and the UTMs are ignored. Session counts stop being inflated by UTM-tagged internal links, and campaign sources reflect genuine external entries only. Historical data is unchanged.",
      },
      {
        title: "API: /exports/* and /batch returning 403 with API keys — fixed",
        type: "Fixed",
        desc: "A permission check on /exports/* and /batch required a scope API keys don't carry, returning 403 insufficient_scope for valid keys. Fixed in production, no action required — existing API keys now work on these routes unchanged.",
      },
    ],
  },
  {
    date: "February 2026",
    updates: [
      {
        title: "Sealmetrics V2 is here",
        type: "Launch",
        desc: "The most significant update since we started, rebuilt from the ground up: a faster, cleaner dashboard; smarter attribution; compliance ready for GDPR, CNIL, UK PECR and the upcoming EU Digital Omnibus; a new, better-documented API; and a lighter tracking script with better SPA support. V2 is the default for all accounts — data, settings and tracking code keep working.",
      },
    ],
  },
  {
    date: "November 2025",
    updates: [
      {
        title: "Robot user-agent database expanded",
        type: "Improved",
        desc: "Added 158 new robot-related user agents on Nov 21, improving detection of automated traffic and precision when separating real users from bots.",
      },
      {
        title: "Legal approval for IP-based bot filtering",
        type: "New",
        desc: "After legal review, incoming hits are checked against our bot IP database: a match is excluded from your analytics, a non-match is registered as human traffic without the IP being stored. No human IP is ever retained, tracked or exposed. Precision without crossing the privacy line.",
      },
      {
        title: "Facebook traffic classification fix",
        type: "Fixed",
        desc: "Visits carrying only fbclid and no UTM parameters were being categorised as facebook-ads. From Nov 17 at 19:00 UTC they are classified as Facebook Organic, and only traffic with proper UTM campaign parameters counts as Facebook Ads. Expect a slight increase in organic Facebook traffic from that timestamp; historical data is unchanged.",
      },
      {
        title: "Facebook Ads attribution — fbclid no longer used",
        type: "Improved",
        desc: "Breaking change from Nov 13 at 19:00 UTC: the fbclid parameter is no longer used to identify Facebook Ads traffic, because it is neither reliable nor consistent. Facebook Ads attribution now requires properly configured UTM tags (utm_source=facebook, utm_medium=paid or equivalent). Audit your active campaigns and add UTMs to keep full visibility.",
      },
      {
        title: "2.5× faster data processing",
        type: "Improved",
        desc: "Increased core capacity in the processing infrastructure on Nov 10 at 22:00 UTC. Data now processes 2.5 times faster: quicker dashboard loading, live data updates and instant report generation.",
      },
    ],
  },
];

function typeBadgeColor(type: string): string {
  switch (type) {
    case "New":
      return "text-green-muted";
    case "Improved":
      return "text-blue-accent";
    case "Launch":
      return "text-text-primary";
    case "Fixed":
      return "text-red-alert";
    default:
      return "text-text-tertiary";
  }
}

export default function ChangelogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Changelog" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Changelog", url: "/changelog" }])} />
      {/* Hero */}
      <section className="pt-12 pb-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-[700px]">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-6">
              Changelog
            </span>
            <h1 className="headline-hero mb-8">What we have shipped.</h1>
            <p className="text-[1.2rem] leading-[1.75] text-text-secondary">
              Product updates, new features, and improvements. We ship
              continuously and document everything.
            </p>
          </div>
        </div>
      </section>

      {/* Entries */}
      <section className="pb-28 bg-white">
        <div className="max-w-[800px] mx-auto px-5 sm:px-8">
          {entries.map((entry) => (
            <div key={entry.date} className="mb-16 last:mb-0">
              <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-8 pb-3 border-b border-warm-200">
                {entry.date}
              </h2>
              <div className="space-y-8">
                {entry.updates.map((update) => (
                  <div key={update.title}>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span
                        className={`text-[0.7rem] font-medium uppercase tracking-wider ${typeBadgeColor(update.type)}`}
                      >
                        {update.type}
                      </span>
                      <h3 className="font-serif text-[1.1rem] font-medium text-text-primary">
                        {update.title}
                      </h3>
                    </div>
                    <p className="text-[0.9rem] leading-[1.7] text-text-secondary ml-0">
                      {update.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div data-md="skip" className="mt-16 pt-10 border-t border-warm-100 text-center">
          <p className="text-[0.9rem] text-text-secondary mb-4">
            Want to see these features in action?
          </p>
          <a
            href="https://my.sealmetrics.com/register"
            className="inline-flex items-center px-7 py-3 text-[0.9rem] font-medium text-white bg-text-primary rounded-[4px] no-underline hover:bg-[#333] transition-colors"
          >
            Start 14-day trial
          </a>
          <p className="mt-4 text-[0.8rem] text-text-tertiary">
            Or explore the{" "}
            <Link href="/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">full product</Link>
            {" "}and{" "}
            <Link href="/pricing" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">pricing</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
