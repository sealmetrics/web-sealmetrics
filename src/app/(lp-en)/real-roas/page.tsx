import type { Metadata } from "next";
import { LogosStrip } from "@/components/sections/v3/HomeV3";
import { LandingHeader, LandingFooter } from "@/components/landing/LandingChrome";
import {
  Hero,
  Symptoms,
  RoasMath,
  Mechanism,
  WhatWeDo,
  Proof,
  PrivacyByDesign,
  Tradeoff,
  Machine,
  Implementation,
  UseCases,
  PriceDoors,
  Close,
} from "@/components/landing/RoasRealSectionsEn";
import { ogImage } from "@/lib/seo/og";

/* Cold paid-traffic landing for eCommerce (EN). Twin of /es/roas-real/.
   noindex/follow by decision: it targets no keyword, has no inbound internal
   links for discovery and would compete with / and /cookieless-analytics.
   Being out of the index exempts it from the cluster and interlinking rules —
   one decision per page.

   Lives in the (lp-en) group so it does not inherit the site navigation or
   footer: on paid traffic every exit link is a leak. */
export const metadata: Metadata = {
  title: "Your real ROAS is higher than you think — Sealmetrics",
  description:
    "Between 25% and 45% of your sales never reach your analytics. Measure without cookies or consent loss and recover the ROAS you were already generating.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Your real ROAS is higher than you think",
    description:
      "Between 25% and 45% of your sales never reach your analytics tool. They happened, you were paid for them, and the report you decide on does not count them.",
    type: "website",
    locale: "en_US",
    images: [ogImage("/real-roas/")],
    url: "https://sealmetrics.com/real-roas/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Your real ROAS is higher than you think",
    description: "Between 25% and 45% of your sales never reach your analytics tool. They happened, you were paid for them, and the report you decide on does not count them.",
    images: [ogImage("/real-roas/")],
  },
  alternates: { canonical: "https://sealmetrics.com/real-roas/" },
};

export default function RealRoasPage() {
  return (
    <>
      <LandingHeader ctaHref="/audit/" ctaLabel="Free audit" />
      <main id="main-content">
        <Hero />
        <Symptoms />
        {/* Social proof sits right behind the symptom: whoever recognises
            themselves in those three quotes needs to see who else had it. */}
        <LogosStrip />
        <RoasMath />
        <Mechanism />
        <WhatWeDo />
        <Proof />
        <PrivacyByDesign />
        <Tradeoff />
        <Machine />
        <Implementation />
        <UseCases />
        <PriceDoors />
        <Close />
      </main>
      <LandingFooter locale="en" />
    </>
  );
}
