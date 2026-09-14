import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Privacy end to end — Sealmetrics",
  description:
    "Private from the first hit to private-AI processing. No cookies, no personal data, EU-hosted — and an AI that runs in Europe and never trains on your data.",
  openGraph: {
    title: "Privacy end to end — Sealmetrics",
    description:
      "Private from collection to AI. No cookies, no personal data, EU-hosted, and a private EU AI that never trains on your data.",
    type: "website",
    images: [ogImage("/privacy-end-to-end/")],
    url: "https://sealmetrics.com/privacy-end-to-end/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Privacy end to end — Sealmetrics",
    description: "Private from collection to AI. No cookies, no personal data, EU-hosted, and a private EU AI that never trains on your data.",
    images: [ogImage("/privacy-end-to-end/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/privacy-end-to-end/",
    languages: getAlternates("/privacy-end-to-end"),
  },
};

const STEPS = [
  {
    n: "01",
    title: "Collection",
    p: "An 846-byte pixel records anonymous events — no cookies, no fingerprinting, no personal data. There is nothing to consent to, so traffic is measured legally, without consent-driven loss.",
    tags: ["No cookies", "No personal data", "No consent banner"],
  },
  {
    n: "02",
    title: "Processing",
    p: "Events are processed and stored exclusively in Dublin, Ireland, on EU-owned infrastructure with zero sub-processors outside the EU in the visitor data path. GDPR by architecture, ePrivacy, Schrems II clean.",
    tags: ["EU-hosted · Dublin", "No non-EU sub-processors on visitor data", "DPA included"],
  },
  {
    n: "03",
    title: "Private AI",
    p: "LENS analyses your data on an open-weight model (gpt-oss-120b, Apache 2.0) hosted in Paris. Your data never leaves the EU, is never shared with any company, and never trains a third-party model. Enterprise can run a dedicated, non-shared instance.",
    tags: ["EU AI · Paris", "Never shared", "Never trains third parties"],
  },
];

export default function PrivacyEndToEndPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy end to end" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Privacy end to end", url: "/privacy-end-to-end" }])} />
      <JsonLd
        data={speakableWebPageSchema({ url: "/privacy-end-to-end", name: "Privacy end to end — Sealmetrics" })}
      />

      {/* Hero */}
      <section className="bg-warm-white pt-24 md:pt-28 pb-16 border-t border-warm-100">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
            Privacy end to end
          </span>
          <h1 className="h-display mx-auto mt-5">
            Private from the first hit to the <em className="italic-accent">private AI.</em>
          </h1>
          <p
            className="text-ink-soft mt-8 mx-auto max-w-[60ch] leading-[1.6]"
            style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
          >
            Most analytics is &ldquo;privacy-first&rdquo; only at collection, then ships your data to a
            US cloud the moment AI enters the picture. Sealmetrics is private at every step — from the
            byte we record to the model that reads it.
          </p>
        </div>
      </section>

      {/* The chain */}
      <section className="bg-white py-24 border-t border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="grid md:grid-cols-3 gap-4">
            {STEPS.map((s) => (
              <article key={s.n} className="bg-warm-50 border border-warm-100 rounded-2xl p-8 flex flex-col">
                <span className="font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-brand">
                  {s.n}
                </span>
                <h2
                  className="font-semibold text-ink tracking-[-0.015em] leading-[1.25] mt-3 mb-3"
                  style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
                >
                  {s.title}
                </h2>
                <p className="text-[14.5px] leading-[1.65] text-ink-soft flex-1">{s.p}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.06em] text-brand bg-brand-soft rounded-full px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-[16px] leading-[1.7] text-ink-soft max-w-[70ch]">
            The result is a fully European stack, measurement to model. Read how it holds up against
            GDPR, ePrivacy and Schrems II on the{" "}
            <Link href="/security" className="text-brand font-medium border-b border-brand/30 hover:border-brand">
              security page
            </Link>
            , or see the legal basis for measuring without banners in{" "}
            <Link
              href="/consentless-analytics"
              className="text-brand font-medium border-b border-brand/30 hover:border-brand"
            >
              consentless analytics
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-warm-white py-20 border-t border-warm-100">
        <div className="max-w-[820px] mx-auto px-5 sm:px-8 text-center">
          <h2 className="h-section mx-auto">
            See it running on <em>your</em> data.
          </h2>
          <div data-md="skip" className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 bg-ink text-white px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
            >
              Book a Demo →
            </Link>
            <Link
              href="/security"
              className="inline-flex items-center gap-2 border border-warm-200 text-ink px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:border-ink transition-colors"
            >
              Read the security architecture
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
