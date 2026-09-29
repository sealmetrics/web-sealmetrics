import type { Metadata } from "next";
import { WhatAiSaysPage } from "@/components/brand-check/WhatAiSaysPage";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, webApplicationSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-monitoring-signal.css";
import "@/components/v4/brand-check.css";

const description =
  "Type a company or brand and read what the leading AI models say about it, answer by answer: where they agree and where they do not. Free, no signup.";
const url = "https://sealmetrics.com/what-ai-says/";

// The title is written out here rather than referenced from a constant because
// `scripts/generate-og-images.mjs` reads it out of this file with a regex to name the
// social card.
export const metadata: Metadata = {
  title: "What Do AIs Say About Your Brand? Free Check",
  description,
  openGraph: {
    title: "What Do AIs Say About Your Brand? Free Check",
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
    title: "What Do AIs Say About Your Brand? Free Check",
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
            "A free check that asks every model in the panel two fixed questions about a company or brand, from memory (except Perplexity, which searches the web), and shows each answer, an automatic classification and where the models agree and disagree.",
          url: "/what-ai-says",
        })}
      />
      <WhatAiSaysPage locale="en" />
    </>
  );
}
