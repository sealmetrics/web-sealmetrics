import type { Metadata } from "next";
import { SecuritySignal } from "@/components/v4/SecuritySignal";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import "@/components/v4/security-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Security Overview — Sealmetrics",
  description: "Review Sealmetrics security: no cookies or persisted IPs, TLS 1.2+, encrypted secrets, account isolation, automatic retention and Dublin hosting.",
  openGraph: { title: "Security Overview — Sealmetrics", description: "Inspect the data minimisation, encryption, isolation, retention and Dublin operating boundary behind Sealmetrics.", type: "website", images: [ogImage("/security/")], url: "https://sealmetrics.com/security/", siteName: "Sealmetrics", locale: "en_US" },
  twitter: { card: "summary_large_image", site: "@sealmetrics", title: "Security Overview — Sealmetrics", description: "Inspect the data minimisation, encryption, isolation, retention and Dublin operating boundary behind Sealmetrics.", images: [ogImage("/security/")] },
  alternates: { canonical: "https://sealmetrics.com/security/", languages: getAlternates("/security") },
};

export default function SecurityPage() {
  return <><JsonLd data={breadcrumbSchema([{ name: "Security", url: "/security" }])} /><JsonLd data={speakableWebPageSchema({ url: "/security", name: "Security Overview — Sealmetrics" })} /><SecuritySignal locale="en" /></>;
}
