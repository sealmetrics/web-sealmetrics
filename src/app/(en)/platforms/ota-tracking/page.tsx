import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";

const URL = "/platforms/ota-tracking";
const TITLE = "OTA vs Direct Booking Tracking: Reconcile Attribution — Sealmetrics";
const DESCRIPTION =
  "Stop losing attribution to OTAs. Reconcile Expedia and Booking.com referrals with your direct website bookings using cookieless tracking.";
const SOCIAL =
  "OTAs are great for reach, but they create attribution gaps. See how Sealmetrics bridges the gap between OTA referrals and direct hotel bookings.";

const OTA_CONTENT = {
  proof: {
    quote: {
      text: "The ability to see the transition from OTA referral to direct booking changed how we allocate our marketing budget. We finally stopped treating OTA-driven traffic as 'direct'.",
      person: "Alex Rivers",
      role: "Revenue Manager, Boutique Hotel Group",
    },
  },
  method: {
    howToName: "Reconcile OTA and Direct Booking Data",
    howToDescription: "Bridge the gap between OTA referral clicks and your direct website conversions to understand the true customer journey.",
    steps: [
      {
        title: "Deploy the Sealmetrics Pixel",
        description: "Add our cookieless tracking script to your hotel's direct booking site and booking engine.",
      },
      {
        title: "Capture OTA Referrals",
        description: "Identify when users arrive via Expedia, Booking.com, or other major travel platforms.",
      },
      {
        title: "Match with PMS Data",
        description: "Cross-reference website attribution with your Property Management System to confirm the final booking source.",
      },
    ],
  },
  faq: [
    {
      question: "Why is OTA vs direct booking tracking so difficult?",
      answer: "Privacy regulations and session breaks often cause users coming from an OTA to appear as 'Direct' traffic, making it impossible to see how much OTA influence actually drives your direct website sales.",
    },
    {
      question: "How does Sealmetrics handle the 'attribution black hole'?",
      answer: "While OTAs are excellent for massive reach, they often mask the user journey. Sealmetrics uses cookieless, first-party signals to maintain a link between the initial OTA referral and the eventual direct booking on your site.",
    },
    {
      question: "Do I need to change my Booking Engine?",
      answer: "No. Sealmetrics is designed to work alongside your existing booking engine and PMS by tracking the web-level referral path.",
    },
  ],
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: SOCIAL,
    type: "article",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: TITLE,
    description: SOCIAL,
    images: [ogImage(`${URL}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates("/platforms/ota-tracking"),
  },
};

export default function OTATrackingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Platforms", url: "/platforms" }, { name: "OTA Tracking", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "OTA vs direct booking tracking: bridging the attribution gap for hotels",
          description: DESCRIPTION,
          datePublished: "2024-01-15",
          dateModified: "2024-05-20",
          url: URL,
          category: "Integration",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={faqPageSchema(OTA_CONTENT.faq, URL)} />
      <JsonLd data={howToSchema({ name: OTA_CONTENT.method.howToName, description: OTA_CONTENT.method.howToDescription, url: URL, steps: OTA_CONTENT.method.steps })} />
      {OTA_CONTENT.proof.quote && (
        <JsonLd
          data={quotationSchema({
            text: OTA_CONTENT.proof.quote.text,
            spokenBy: OTA_CONTENT.proof.quote.person,
            spokenByRole: OTA_CONTENT.proof.quote.role,
            url: URL,
          })}
        />
      )}
      <ProblemLandingSignal content={OTA_CONTENT as any} />
    </>
  );
}
