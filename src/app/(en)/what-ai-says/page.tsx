import type { Metadata } from "next";
import { WhatAiSaysPage } from "@/components/brand-check/WhatAiSaysPage";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, webApplicationSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-monitoring-signal.css";
import "@/components/v4/brand-check.css";

const description =
  "Type your brand and what it sells, and see from 0 to 100 how well the leading AI models know and recommend it. Free, no signup.";
const url = "https://sealmetrics.com/what-ai-says/";

// The title is written out here rather than referenced from a constant because
// `scripts/generate-og-images.mjs` reads it out of this file with a regex to name the
// social card.
export const metadata: Metadata = {
  title: "Your Brand's AI Visibility Score, Free",
  description,
  openGraph: {
    title: "Your Brand's AI Visibility Score, Free",
    description,
    type: "website",
    images: [ogImage("/what-ai-says/")],
    url,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Your Brand's AI Visibility Score, Free",
    description,
    images: [ogImage("/what-ai-says/")],
  },
  alternates: { canonical: url, languages: getAlternates("/what-ai-says") },
};

export default function WhatAiSaysRoute() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "What AIs say", url: "/what-ai-says" }])} />
      <JsonLd
        data={webApplicationSchema({
          name: "What do AIs say about…?",
          description:
            "A free check that asks every model in the panel what a brand is and, without naming it, what it would recommend to someone looking for what the brand sells; from memory, except Perplexity, which searches the web. It gives a 0 to 100 score with its basis and shows each answer, an automatic classification and where the models agree and disagree.",
          url: "/what-ai-says",
        })}
      />
      <WhatAiSaysPage locale="en" />
    </>
  );
}
