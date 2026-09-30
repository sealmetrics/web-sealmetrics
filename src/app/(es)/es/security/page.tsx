import type { Metadata } from "next";
import { SecuritySignal } from "@/components/v4/SecuritySignal";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import "@/components/v4/security-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Visión general de seguridad — Sealmetrics",
  description: "Revisa la seguridad de Sealmetrics: sin cookies ni IP persistida, TLS 1.2+, secretos cifrados, aislamiento, retención automática y hosting en Dublín.",
  openGraph: { title: "Visión general de seguridad — Sealmetrics", description: "Inspecciona la minimización, cifrado, aislamiento, retención y perímetro operativo de Dublín de Sealmetrics.", type: "website", images: [ogImage("/es/security/")], url: "https://sealmetrics.com/es/security/", siteName: "Sealmetrics", locale: "es_ES" },
  twitter: { card: "summary_large_image", site: "@sealmetrics", title: "Visión general de seguridad — Sealmetrics", description: "Inspecciona la minimización, cifrado, aislamiento, retención y perímetro operativo de Dublín de Sealmetrics.", images: [ogImage("/es/security/")] },
  alternates: { canonical: "https://sealmetrics.com/es/security/", languages: getAlternatesEs("/security") },
};

export default function SecurityPageEs() {
  return <><JsonLd data={breadcrumbSchema([{ name: "Seguridad", url: "/es/security" }])} /><JsonLd data={speakableWebPageSchema({ url: "/es/security", name: "Visión general de seguridad — Sealmetrics" })} /><SecuritySignal locale="es" /></>;
}
