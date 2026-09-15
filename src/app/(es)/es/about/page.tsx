import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { LogosStripEs } from "@/components/sections/v3/HomeV3Es";
import { WhatIsV3 } from "@/components/sections/v3/WhatIsV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Sobre Sealmetrics — Analítica founder-led para Europa",
  description: "Fundada tras 20+ años viendo a equipos eCommerce europeos decidir con datos que no se creían. UE-founded, UE-hosted, founder-led.",
  openGraph: {
    title: "Sobre Sealmetrics — Analítica founder-led para Europa",
    description: "Fundada tras 20+ años viendo a equipos eCommerce europeos decidir con datos que no se creían. UE-founded, UE-hosted, founder-led.",
    type: "website",
    images: [ogImage("/es/about/")],
    url: "https://sealmetrics.com/es/about/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sobre Sealmetrics — Analítica founder-led para Europa",
    description: "Fundada tras 20+ años viendo a equipos eCommerce europeos decidir con datos que no se creían. UE-founded, UE-hosted, founder-led.",
    images: [ogImage("/es/about/")],
  },
  alternates: { canonical: "https://sealmetrics.com/es/about/", languages: getAlternatesEs("/about") },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Sobre nosotros" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Sobre nosotros", url: "/es/about" }])} />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>Sobre Sealmetrics</span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Construido para que equipos europeos <em>volvieran a fiarse de sus datos.</em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Sealmetrics es una plataforma de analítica UE-founded y UE-hosted que sirve a 2.000+ clientes entre hoteles, eCommerce DTC, medios e instituciones públicas.
          </p>
        </div>
      </section>

      <LogosStripEs />
      <WhatIsV3 locale="es" muted />

      <section className="py-28 bg-warm-50 border-t border-warm-100">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>El founder</span>
          <h2 className="h-section mt-5" style={{ maxWidth: "22ch" }}>
            20 años viendo a equipos decidir con <em>datos en los que no confiaban.</em>
          </h2>
          <div className="mt-10 space-y-6 text-[17px] leading-[1.7] text-ink-2">
            <p>
              Rafa Jiménez pasó dos décadas en eCommerce europeo — primero como marketer digital, luego fundando una agencia, luego asesorando grupos retail. Cada reunión seguía el mismo patrón: el número de GA4, el del pixel, el del CRM. Todos distintos. Todos defendidos. Ninguno fiable.
            </p>
            <p>
              El problema nunca fueron los analistas. Era la arquitectura. Cada herramienta optimizando para su propio reporte. El rechazo de consentimiento dejaba invisible entre el 15% y el 60% del tráfico UE, según el sector, la marca y el mix de tráfico. Las cadenas de sub-procesadores se extendían por tres continentes. Los equipos pasaban más tiempo cuadrando números que actuando sobre ellos.
            </p>
            <p>
              Sealmetrics se construyó para el comité. Una capa neutral que marca, finanzas y agencias firman. Alojada en Dublín. Cero cookies. Cero dato personal. Resolución completa. Construida por un equipo que vivió el problema durante dos décadas — y decidió dejar de parchearlo.
            </p>
          </div>

          <div className="mt-10 p-8 bg-white border border-warm-100 rounded-xl flex gap-5 items-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-ink text-[22px] shrink-0" style={{ background: "linear-gradient(135deg,#2D8B6D,#E8B84B)", letterSpacing: "-0.02em" }}>
              RJ
            </div>
            <div>
              <div className="text-[17px] font-semibold text-ink">Rafa Jiménez</div>
              <div className="text-[13px] text-ink-soft">Founder & CEO · Sealmetrics</div>
              <div className="mt-2 flex gap-4 text-[13px]">
                <a href="https://www.linkedin.com/in/rafajimenez/" className="text-brand hover:underline">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-white border-t border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
            <div>
              <span className="eyebrow mb-5">Los números</span>
              <h2 className="h-section mt-5">Lo que <em>hemos probado hasta ahora.</em></h2>
            </div>
            <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
              No proyecciones, no aspiraciones. Lo que 2.000+ equipos europeos usan con Sealmetrics hoy.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { n: "2.000+", l: "Cuentas activas" },
              { n: "+5 años", l: "En producción" },
              { n: "100%", l: "UE-hosted" },
              { n: "99,99%", l: "SLA de uptime" },
            ].map((s) => (
              <div key={s.l} className="bg-white border border-warm-100 rounded-xl p-6">
                <div className="font-semibold text-ink tracking-[-0.025em] leading-none tabular-nums" style={{ fontSize: "clamp(36px, 4vw, 52px)" }}>
                  {s.n}
                </div>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft mt-3">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="es"
        titleEn={<>Talk to the founder.</>}
        titleEs={<>Habla directamente con <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>el founder.</em></>}
        ledeEn="Book 30 minutes."
        ledeEs="30 min de walkthrough. Rafa lleva personalmente cada llamada. Cuando algo falle, le escribes directamente — no a un ticket."
      />
    </>
  );
}
