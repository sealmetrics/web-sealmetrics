import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Sealmetrics vs alternativas — Comparativas completas",
  description: "Comparativas lado a lado contra GA4, GA360, Adobe Analytics y Piwik PRO. Honestos sobre los trade-offs. Sin rodeos.",
  openGraph: {
    title: "Sealmetrics vs alternativas",
    description: "Comparativas feature a feature contra cada plataforma analytics.",
    type: "website",
    locale: "es_ES",
    images: [ogImage("/es/vs/")],
    url: "https://sealmetrics.com/es/vs/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics vs alternativas",
    description: "Comparativas feature a feature contra cada plataforma analytics.",
    images: [ogImage("/es/vs/")],
  },
  alternates: { canonical: "https://sealmetrics.com/es/vs/", languages: getAlternatesEs("/vs") },
};

const comparisons = [
  { slug: "es/vs-ga4", name: "Google Analytics 4", stat: "El 40–60% del tráfico rechaza cookies (experiencia con clientes)", tagline: "El default gratis que todos usan — y su punto ciego estructural en Europa." },
  { slug: "es/vs/ga360", name: "Google Analytics 360", stat: "~50–175K$/año", tagline: "Precio enterprise, contrato enterprise, misma arquitectura de cookies que GA4 gratis." },
  { slug: "es/vs/adobe-analytics", name: "Adobe Analytics", stat: "~50–200K$ + especialistas", tagline: "Profundidad enterprise, pero 6 meses de implementación y staff certificado Adobe." },
  { slug: "es/vs/piwik-pro", name: "Piwik PRO", stat: "Enterprise por presupuesto", tagline: "Alojado en UE — pero sigue con cookies y dependiente del consentimiento." },
  { slug: "es/vs/matomo", name: "Matomo", stat: "Open-source + coste ops", tagline: "EU-friendly y open-source — pero cookies por defecto y el self-hosting se come el 'gratis'." },
  { slug: "es/alternatives/google-analytics", name: "Alternativas a Google Analytics", stat: "La foto completa", tagline: "Qué elegir si estás post-GA4 — y por qué la mayoría de \"alternativas\" son solo clones más baratos." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Comparativas" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Comparativas", url: "/es/vs" }])} />
      <JsonLd data={itemListSchema({
        name: "Comparativas Sealmetrics",
        description: "Análisis lado a lado de Sealmetrics vs GA4, GA360, Adobe Analytics y Piwik PRO.",
        url: "/es/vs",
        items: comparisons.map((c) => ({ name: c.name, url: `/${c.slug}` })),
      })} />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>Comparativas</span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Sealmetrics vs <em>las alternativas.</em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Comparativas honestas lado a lado. Reconoce fortalezas. Directa sobre trade-offs. Con números reales sobre tu propio tráfico — corre ambos 30 días y decide.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comparisons.map((c) => (
              <Link key={c.slug} href={`/${c.slug}`} className="group block bg-white border border-warm-100 rounded-xl p-8 no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="text-[22px] font-semibold tracking-[-0.015em] text-ink leading-[1.2] group-hover:text-brand transition-colors">
                    Sealmetrics vs {c.name}
                  </h2>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#B5423B" }}>{c.stat}</span>
                </div>
                <p className="text-[15px] leading-[1.55] text-ink-soft">{c.tagline}</p>
                <span className="inline-flex items-center gap-1.5 mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
                  Lee la comparativa →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="es"
        titleEn={<>Run both for 30 days. Then decide.</>}
        titleEs={<>Corre los dos 30 días. <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Y entonces decide.</em></>}
        ledeEn="Install Sealmetrics alongside your current stack."
        ledeEs="Instala Sealmetrics junto a tu stack actual. Compara con tu CRM. Si el gap no es real, no nos debes nada."
      />
    </>
  );
}
