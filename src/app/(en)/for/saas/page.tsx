import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import {
  breadcrumbSchema,
  verticalSoftwareApplicationSchema,
} from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { LogosStrip } from "@/components/sections/v3/HomeV3";
import { VerticalPageV3 } from "@/components/sections/v3/VerticalPageV3";
import { RelatedPagesV3 } from "@/components/sections/v3/RelatedPagesV3";
import { getVerticalData } from "@/components/sections/v3/VerticalsData";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Analytics for SaaS — PLG & Trial-to-Paid | Sealmetrics",
  description:
    "Cookieless analytics for SaaS: product-led growth measurement without consent banners. Track trial-to-paid conversion and self-serve funnels on EU traffic.",
  openGraph: {
    title: "Analytics for SaaS — PLG & Trial-to-Paid | Sealmetrics",
    description:
      "First-party analytics for European SaaS companies. Trial-to-paid attribution, self-serve funnel tracking and PLG metrics — GDPR-safe, consent-free.",
    type: "website",
    images: [ogImage("/for/saas/")],
    url: "https://sealmetrics.com/for/saas/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analytics for SaaS — PLG & Trial-to-Paid | Sealmetrics",
    description: "First-party analytics for European SaaS companies. Trial-to-paid attribution, self-serve funnel tracking and PLG metrics — GDPR-safe, consent-free.",
    images: [ogImage("/for/saas/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/for/saas/",
    languages: getAlternates("/for/saas"),
  },
};

const seoFaqs = [
  {
    question: "What is cookieless analytics for SaaS?",
    answer:
      "Cookieless analytics for SaaS is a measurement approach for product-led growth companies that captures marketing-site and onboarding traffic without cookies, consent banners or personal identifiers. It attributes trial signups, activation events and trial-to-paid conversions on EU traffic without consent gaps.",
  },
  {
    question: "How does cookieless analytics track product-qualified leads (PQLs)?",
    answer:
      "Sealmetrics counts marketing-site visits and trial signups anonymously with channel metadata; in-product events flow in via the REST API once the user is authenticated. PQL definitions are assembled in the warehouse by joining aggregate marketing attribution with your authenticated user table. Sealmetrics does not track a visitor's journey on the marketing site — the join to user-level data happens after signup, inside your product database.",
  },
  {
    question: "Does cookieless analytics work for self-serve SaaS funnels?",
    answer:
      "Yes. Self-serve funnels are particularly exposed to consent-rejection data loss because EU visitors often browse the marketing site, leave, and return via email or direct — all paths that break under third-party cookie attribution. Cookieless, first-party tracking restores that journey.",
  },
  {
    question: "Can SaaS teams replace Mixpanel or Amplitude with cookieless analytics?",
    answer:
      "Partially. Sealmetrics handles marketing-site attribution, landing-to-trial conversion and revenue attribution — all as aggregate channel counts, no per-user tracking. For deep in-product event analytics inside the authenticated app (retention cohorts, feature adoption, user-level journeys), most SaaS teams keep Mixpanel or Amplitude and use Sealmetrics for the anonymous marketing-to-signup layer.",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "For SaaS" }]} />
      <JsonLd
        data={breadcrumbSchema([{ name: "For SaaS", url: "/for/saas" }])}
      />
      <JsonLd
        data={verticalSoftwareApplicationSchema({
          vertical: "SaaS",
          audienceType: "European SaaS and PLG companies",
          description:
            "Cookieless analytics for SaaS: marketing-to-trial attribution, self-serve funnel tracking and PQL measurement without cookies or consent banners.",
          url: "/for/saas",
        })}
      />

      <VerticalPageV3 data={getVerticalData("saas", "en")} />

      <TldrBlock
        label="Cookieless analytics for SaaS"
        answer={
          <>
            <strong>Cookieless analytics for SaaS</strong> counts marketing-site
            visits and trial-signup events without consent banners, cookies or
            ad-blocker interference — anonymously, at channel level. Sealmetrics
            attributes each trial-signup event last-click to the source recorded
            on that pageview, and exports channel totals into BigQuery to be
            joined against product-side user data for PLG reporting.
          </>
        }
        bullets={[
          <>Trial-signup attribution on EU traffic without consent gaps (no per-user tracking).</>,
          <>Clean separation of anonymous marketing-site analytics from authenticated product analytics (Mixpanel, Amplitude).</>,
          <>Native BigQuery connector — or the full-resolution REST API — for joining aggregate channel data with your authenticated user tables.</>,
        ]}
      />

      <RelatedPagesV3
        locale="en"
        eyebrow="Also explore"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
          {
            href: "/blog/cookieless-analytics-for-saas",
            title: "Guide: Cookieless analytics for SaaS",
            desc: "PLG measurement without consent banners, 2026 playbook.",
          },
          {
            href: "/glossary/cookieless-analytics",
            title: "What is cookieless analytics",
            desc: "Definition, how it works, why it matters.",
          },
          {
            href: "/for/cto",
            title: "For CTOs & engineering",
            desc: "The technical buyer perspective.",
          },
        ]}
      />
      <LogosStrip />
    </>
  );
}
