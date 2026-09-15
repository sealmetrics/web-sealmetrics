import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { breadcrumbSchema, collectionPageSchema, itemListSchema } from "@/lib/schema";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

const TITLE = "Analytics use cases — cookieless measurement tasks";
const DESCRIPTION =
  "The jobs teams hire Sealmetrics for: revenue attribution, cookieless conversion tracking, GA4 migration and one reconciled number. With the real trade-offs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: "Analytics use cases — cookieless measurement tasks",
    description:
      "Revenue attribution, conversion tracking and GA4 migration — the task-level guides, including what each approach does not do.",
    url: "https://sealmetrics.com/use-cases/",
    siteName: "Sealmetrics",
    locale: "en_US",
    type: "website",
    images: [ogImage("/use-cases/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analytics use cases — cookieless measurement tasks",
    description:
      "Revenue attribution, conversion tracking and GA4 migration — task-level guides with the real trade-offs.",
    images: [ogImage("/use-cases/")],
  },
  alternates: { canonical: "https://sealmetrics.com/use-cases/" },
};

const useCases = [
  {
    href: "/use-cases/revenue-attribution",
    name: "Revenue attribution without cookies",
    job: "Attribute revenue",
    tagline:
      "Last-click revenue attribution without consent gaps, anonymously at channel level. How it works without cookies, what it captures and what it doesn't.",
  },
  {
    href: "/use-cases/conversion-tracking",
    name: "Conversion tracking without cookies",
    job: "Track conversions",
    tagline:
      "Setup patterns by platform, event taxonomy, and what to keep alongside (Meta and Google pixels) without breaking the measurement layer.",
  },
  {
    href: "/use-cases/ga4-migration",
    name: "GA4 migration",
    job: "Replace GA4",
    tagline:
      "A parallel-run plan rather than rip-and-replace: what you keep, what you replace, and how to make the decision in 30 days.",
  },
  {
    href: "/use-cases/single-source-of-truth",
    name: "One number for marketing and finance",
    job: "Reconcile the numbers",
    tagline:
      "Why ad platforms, GA4, the order system and finance disagree, and how to anchor every team to one total checked against real orders.",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Use cases" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Use cases", url: "/use-cases" }])} />
      <JsonLd
        data={collectionPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          url: "/use-cases",
        })}
      />
      <JsonLd
        data={itemListSchema({
          name: "Sealmetrics analytics use cases",
          description:
            "Task-level guides for revenue attribution, conversion tracking and GA4 migration on cookieless data.",
          url: "/use-cases",
          items: useCases.map((u) => ({
            name: u.name,
            url: `https://sealmetrics.com${u.href}/`,
          })),
        })}
      />

      <section className="relative overflow-hidden bg-warm-white pt-10 md:pt-12 pb-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <span className="eyebrow mb-5">Use cases</span>
          <h1 className="h-display mt-5" style={{ maxWidth: "24ch" }}>
            What teams actually <em>hire us to do.</em>
          </h1>

          <QuickAnswer>
            <p>
              Four measurement jobs account for almost every Sealmetrics
              deployment: attributing revenue to channels, tracking conversions
              on sites that cannot rely on cookies, replacing GA4 without
              losing a quarter of reporting, and giving marketing and finance
              one number that reconciles with real orders. Each page below covers the setup,
              the data model, and the limits — including what the approach does
              not measure. Sealmetrics is aggregate, anonymous, event-level
              measurement: it attributes revenue last-click across the full
              dataset, and it does not reconstruct individual sessions or
              customer journeys. If your requirement is per-user journey
              analysis, this is the wrong tool and the pages say so.
            </p>
          </QuickAnswer>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {useCases.map((u) => (
              <Link
                key={u.href}
                href={u.href}
                className="group block bg-white border border-warm-100 rounded-xl p-8 no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
              >
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-brand">
                  {u.job}
                </span>
                <h2 className="text-[21px] font-semibold tracking-[-0.015em] text-ink leading-[1.25] mt-3 mb-3 group-hover:text-brand transition-colors">
                  {u.name}
                </h2>
                <p className="text-[15px] leading-[1.55] text-ink-soft">{u.tagline}</p>
                <span className="inline-flex items-center gap-1.5 mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
                  Read the guide →
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-12 text-[15px] leading-[1.65] text-ink-soft max-w-[70ch]">
            All four rest on the same foundation — first-party server-side
            collection described in{" "}
            <Link href="/how-it-works" className="text-brand">
              how it works
            </Link>
            . Two problems sit upstream of these jobs and have their own pages:
            when GA4 does not reflect what really happened, start with{" "}
            <Link href="/complete-data" className="text-brand">
              complete data
            </Link>
            ; when you have to prove the setup to a DPO, start with{" "}
            <Link href="/gdpr-analytics" className="text-brand">
              GDPR analytics
            </Link>
            . If you are still deciding whether the data gap is real on your own
            traffic, the{" "}
            <Link href="/data-loss-calculator" className="text-brand">
              data loss calculator
            </Link>{" "}
            estimates it from your current numbers, and{" "}
            <Link href="/vs" className="text-brand">
              the comparisons
            </Link>{" "}
            put Sealmetrics next to GA4, GA360, Adobe Analytics and Piwik PRO.
          </p>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={
          <>
            Pick the job.{" "}
            <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              We'll show it on your data.
            </em>
          </>
        }
        titleEs={
          <>
            Elige el trabajo.{" "}
            <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              Te lo enseñamos con tus datos.
            </em>
          </>
        }
        ledeEn="Book a demo and we'll run the use case that matters to you against your own traffic, alongside your current stack."
        ledeEs="Pide una demo y ejecutamos el caso de uso que te importa sobre tu propio tráfico, junto a tu stack actual."
      />
    </>
  );
}
