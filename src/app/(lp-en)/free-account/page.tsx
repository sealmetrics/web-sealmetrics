import type { Metadata } from "next";
import { FreeAccountLanding } from "@/components/landing/FreeAccountLanding";
import { freeAccountLanding } from "@/lib/content/free-account-landing";
import { ogImage } from "@/lib/seo/og";

/* Cold paid-traffic landing (Google Ads, Meta Ads, LinkedIn Ads), Q4 2026.
   noindex/follow by decision: it carries a dated commercial offer, targets
   no organic keyword and would compete with /cookieless-analytics and
   /pricing. Twin of /es/cuenta-gratis/. */
const t = freeAccountLanding.en;
export const metadata: Metadata = {
  title: t.title,
  description: t.description,
  robots: { index: false, follow: true },
  alternates: {
    canonical: `https://sealmetrics.com${t.route}`,
    languages: { en: `https://sealmetrics.com${t.route}`, es: `https://sealmetrics.com${t.otherRoute}`, "x-default": `https://sealmetrics.com${t.route}` },
  },
  openGraph: { title: t.title, description: t.description, url: `https://sealmetrics.com${t.route}`, siteName: "Sealmetrics", locale: "en_US", type: "website", images: [ogImage(t.route)] },
  twitter: { card: "summary_large_image", title: t.title, description: t.description, site: "@sealmetrics", images: [ogImage(t.route)] },
};

export default function Page() { return <FreeAccountLanding locale="en" />; }
