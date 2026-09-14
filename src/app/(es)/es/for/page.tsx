import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Sealmetrics por equipo — Roles e industrias",
  description: "Páginas dedicadas para CMOs, CTOs, DPOs y 8 verticales. Honestos sobre a quién encaja, con resultados concretos para cada uno.",
  openGraph: {
    title: "Sealmetrics para cada equipo",
    description: "Páginas dedicadas para cada rol e industria.",
    type: "website",
    locale: "es_ES",
    images: [ogImage("/es/for/")],
    url: "https://sealmetrics.com/es/for/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics para cada equipo",
    description: "Páginas dedicadas para cada rol e industria.",
    images: [ogImage("/es/for/")],
  },
  alternates: { canonical: "https://sealmetrics.com/es/for/", languages: getAlternatesEs("/for") },
};

const roles = [
  { slug: "cmo", name: "CMOs", tagline: "Defiende tu presupuesto con los números que tu CFO firma." },
  { slug: "cto", name: "CTOs e ingeniería", tagline: "Pixel de 846 bytes. Cero mantenimiento. Sin piruetas server-side GTM." },
  { slug: "dpo", name: "DPOs y legal", tagline: "Analítica diseñada para el RGPD desde la arquitectura, no por capa de compliance." },
];

const industries = [
  { slug: "ecommerce", name: "eCommerce", tagline: "La analítica que cuadra con tu CRM de Shopify." },
  { slug: "hotels", name: "Hoteles y travel", tagline: "Ve el 25% de reservas que tu PMS genera pero marketing no atribuye." },
  { slug: "saas", name: "SaaS", tagline: "Trial, activación, upgrade — todo first-party, independiente del consentimiento." },
  { slug: "agencies", name: "Agencias", tagline: "Deja de ser el medio entre disputas de atribución con clientes." },
  { slug: "media", name: "Medios y publishers", tagline: "Analítica que sobrevive ad-blockers. 50%+ audiencia invisible a GA." },
  { slug: "finance", name: "Finanzas y banca", tagline: "Compliance grado bancario. Review en una reunión." },
  { slug: "healthcare", name: "Salud", tagline: "Sin datos personales de pacientes en la analítica. Portales medidos en agregado." },
  { slug: "education", name: "Educación", tagline: "Desde K-12 a universidades. Sin datos personales de estudiantes." },
];

export default function Page() {
  const allItems = [...roles, ...industries].map((i) => ({ name: i.name, url: `/es/for/${i.slug}` }));
  return (
    <>
      <Breadcrumbs items={[{ label: "Para" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Para", url: "/es/for" }])} />
      <JsonLd data={itemListSchema({
        name: "Sealmetrics por rol e industria",
        description: "Páginas dedicadas de Sealmetrics para CMOs, CTOs, DPOs y 8 verticales.",
        url: "/es/for",
        items: allItems,
      })} />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>Para cada equipo</span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Sealmetrics para <em>tu equipo.</em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Páginas específicas para cada rol e industria. Dolores concretos, resultados medibles, honestos sobre cuándo no somos el encaje.
          </p>
        </div>
      </section>

      <section className="py-20 bg-warm-50 border-t border-warm-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft mb-6">Por rol</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {roles.map((r) => (
              <Link key={r.slug} href={`/es/for/${r.slug}`} className="group block bg-white border border-warm-100 rounded-xl p-6 no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
                <h3 className="text-[19px] font-semibold tracking-[-0.015em] text-ink mb-2 group-hover:text-brand transition-colors">
                  Para {r.name}
                </h3>
                <p className="text-[14px] leading-[1.55] text-ink-soft">{r.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft mb-6">Por industria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {industries.map((i) => (
              <Link key={i.slug} href={`/es/for/${i.slug}`} className="group block bg-white border border-warm-100 rounded-xl p-6 no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
                <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink mb-2 group-hover:text-brand transition-colors">
                  Para {i.name}
                </h3>
                <p className="text-[13.5px] leading-[1.55] text-ink-soft">{i.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="es"
        titleEn={<>Not sure which fits?</>}
        titleEs={<>¿No sabes cuál encaja? <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Hablemos.</em></>}
        ledeEn="30 min walkthrough."
        ledeEs="30 min con el founder. Pasamos tu web por Sealmetrics y te enseñamos el gap — ajustado a tu rol e industria."
      />
    </>
  );
}
