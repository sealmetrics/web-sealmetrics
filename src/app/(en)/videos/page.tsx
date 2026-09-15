import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, videoObjectSchema, itemListSchema } from "@/lib/schema";
import { VideoGrid } from "./VideoGrid";
import { ogImage } from "@/lib/seo/og";

const videosForSchema = [
  {
    name: "Sealmetrics Platform Overview",
    description:
      "A complete tour of the Sealmetrics dashboard — from traffic overview to AI insights.",
    thumbnailUrl: "/videos/platform-overview.jpg",
    uploadDate: "2025-09-01T09:00:00+02:00",
    duration: "PT3M24S",
    embedUrl: "https://iframe.mediadelivery.net/embed/609541/e616aab7-d8cf-47d1-b250-517df6a8c593",
    inLanguage: "es",
    url: "/videos",
  },
  {
    name: "Getting Started with Sealmetrics",
    description:
      "How to create your account, add your site, and install the 846-byte tracking script.",
    thumbnailUrl: "/videos/getting-started.jpg",
    uploadDate: "2025-09-15T09:00:00+02:00",
    duration: "PT2M15S",
    embedUrl: "https://iframe.mediadelivery.net/embed/609541/c39d3844-8ef3-4362-8579-d71a6b832b0f",
    inLanguage: "es",
    url: "/videos",
  },
];

export const metadata: Metadata = {
  title: "Videos — Sealmetrics",
  description:
    "Watch product demos and step-by-step tutorials. See how Sealmetrics measures traffic without cookies or consent gaps.",
  openGraph: {
    title: "Videos — Sealmetrics",
    description:
      "Product demos and tutorials to help you get the most out of Sealmetrics.",
    type: "website",
    images: [ogImage("/videos/")],
    url: "https://sealmetrics.com/videos/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Videos — Sealmetrics",
    description: "Product demos and tutorials to help you get the most out of Sealmetrics.",
    images: [ogImage("/videos/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/videos/",
  },
};

export default function VideosPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Videos" }]} />
      <JsonLd
        data={breadcrumbSchema([{ name: "Videos", url: "/videos" }])}
      />
      <JsonLd
        data={itemListSchema({
          name: "Sealmetrics video library",
          description: "Product demos and tutorials for the Sealmetrics analytics platform.",
          url: "/videos",
          items: videosForSchema.map((v, i) => ({
            name: v.name,
            url: `https://sealmetrics.com/videos#${v.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
            position: i + 1,
          })),
        })}
      />
      {videosForSchema.map((v) => (
        <JsonLd key={v.name} data={videoObjectSchema(v)} />
      ))}

      {/* Hero */}
      <section className="pt-12 pb-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
          <div className="max-w-[640px] mx-auto">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-6">
              Video Library
            </span>
            <h1 className="headline-hero mb-6">
              See it. Understand it. Start tracking.
            </h1>
            <p className="text-[1.15rem] leading-[1.75] text-text-secondary">
              Product demos and step-by-step tutorials to help you get the
              most out of Sealmetrics.
            </p>
          </div>
        </div>
      </section>

      {/* Video sections */}
      <VideoGrid />

      {/* The page was 100 words wrapped around a thumbnail grid. What the
          videos are for — and what to read instead if you would rather read —
          is the part that makes it a destination rather than a directory. */}
      <section className="py-16 md:py-20 bg-paper border-t border-hairline">
        <div className="max-w-[760px] mx-auto px-5 sm:px-8">
          <h2 className="headline-section mb-6">Where to start</h2>
          <p className="text-[1.05rem] leading-[1.8] text-text-body">
            If you are evaluating, watch the platform overview first: it shows
            what the reports look like when traffic is counted without consent gaps rather
            than the roughly 13% GA4 sees in Europe, which is the difference
            most teams want to see before they believe the number. If you have
            already decided and want the tag live, the getting-started walkthrough
            covers installation end to end — one script, no cookie banner
            dependency, no tag manager gymnastics.
          </p>
          <p className="text-[1.05rem] leading-[1.8] text-text-body mt-6">
            Video is the fastest way to see the interface, but it is the slowest
            way to check a claim. If you are here to verify rather than to watch,
            the written material is denser: <Link href="/how-it-works" className="underline">how it works</Link>{" "}
            explains the collection architecture step by step,{" "}
            <Link href="/security" className="underline">security</Link> covers
            where the data lives and what never leaves the browser, and{" "}
            <Link href="/vs-ga4" className="underline">Sealmetrics vs GA4</Link>{" "}
            puts the two side by side without softening the trade-offs.
          </p>
          <p className="text-[1.05rem] leading-[1.8] text-text-body mt-6">
            Product changes ship faster than we re-record, so the{" "}
            <Link href="/changelog" className="underline">changelog</Link> is the
            authority when a screen in a video no longer matches what you see in
            your account.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
          <h2 className="headline-section mb-4">
            Start tracking without cookies today
          </h2>
          <p className="text-[1.05rem] text-text-secondary mb-8 max-w-[480px] mx-auto leading-relaxed">
            No cookies. No consent banners. Just clear, accurate analytics
            that respects your visitors.
          </p>
          <div data-md="skip" className="flex flex-wrap justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center px-9 py-4 text-[1rem] font-medium text-white bg-text-primary rounded-[4px] no-underline hover:bg-[#333] transition-colors"
            >
              Book a Demo →
            </Link>
            <a
              href="https://my.sealmetrics.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-9 py-4 text-[1rem] font-medium text-text-primary border border-warm-200 rounded-[4px] no-underline hover:bg-warm-50 transition-colors"
            >
              Start 14-day trial
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
