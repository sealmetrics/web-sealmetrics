import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { DemoFormEs } from "./DemoFormEs";
import { ogImage } from "@/lib/seo/og";
import { getCaseStudy } from "@/lib/content/case-studies";

/**
 * Prueba social con nombre, en lugar de la cita anónima del "retailer europeo
 * de moda" que había aquí. Las citas se leen del contenido de los casos, no se
 * copian, para que no puedan desincronizarse de las páginas que enlazan.
 */
const DEMO_PROOF = [
  { slug: "incapto", href: "/es/case-studies/incapto/" },
  { slug: "palladium-hotel-group", href: "/es/case-studies/palladium-hotel-group/" },
] as const;

export const metadata: Metadata = {
  title: "Pide una demo — Sealmetrics",
  description:
    "Walkthrough de 30 minutos personalizado. Ve cómo luce tu tráfico, medido sin depender del consentimiento, sobre tu propia web.",
  openGraph: {
    title: "Pide una demo — Sealmetrics",
    description: "30 min con el founder. Ve tu gap de datos en directo.",
    type: "website",
    images: [ogImage("/es/demo/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/demo/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Pide una demo — Sealmetrics",
    description: "30 min con el founder. Ve tu gap de datos en directo.",
    images: [ogImage("/es/demo/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/demo/",
    languages: getAlternatesEs("/demo"),
  },
};

export default function DemoPageEs() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Pide una demo" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Pide una demo", url: "/es/demo" }])} />

      <section className="pt-24 md:pt-28 pb-24 bg-warm-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-start">
            <div>
              <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
                Pide una demo
              </span>
              <h1 className="h-display mt-5" style={{ maxWidth: "18ch", fontSize: "clamp(40px, 5.4vw, 72px)" }}>
                Ve lo que tu analítica <em>te está ocultando.</em>
              </h1>
              <p className="text-ink-soft mt-7 leading-[1.55] max-w-[50ch]" style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}>
                En 30 minutos pasamos tu web por la calculadora de gap — en directo. Ves cuánto dato está perdiendo tu setup actual y dónde. Sin slides. Sin pitch comercial.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                {[
                  { t: "Al lado de GA4", d: "Tus números de GA4 al lado de Sealmetrics sobre el mismo tráfico. El gap está en tu propio dato." },
                  { t: "Tus webs, tus UTMs", d: "No un sandbox genérico. Tiramos de tus canales, campañas y embudos reales." },
                  { t: "Sin compromiso, sin email drip", d: "30 minutos. Si no te encaja, te lo decimos. Sin secuencia comercial." },
                ].map((item) => (
                  <div key={item.t} className="flex gap-4 pb-4 border-b border-warm-100 last:border-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                    <div>
                      <p className="text-[16px] font-semibold text-ink tracking-[-0.01em] mb-1">{item.t}</p>
                      <p className="text-[14px] text-ink-soft leading-[1.55]">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="p-5 bg-white border border-warm-100 rounded-xl text-center">
                  <div className="font-semibold text-ink tabular-nums leading-none" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>
                    <em className="italic-accent">58</em>%
                  </div>
                  <div className="text-[12px] text-ink-soft mt-2 leading-[1.4]">Conversiones sin trackear recuperadas de media</div>
                </div>
                <div className="p-5 bg-white border border-warm-100 rounded-xl text-center">
                  <div className="font-semibold text-ink tabular-nums leading-none" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>
                    <em className="italic-accent">30</em> min
                  </div>
                  <div className="text-[12px] text-ink-soft mt-2 leading-[1.4]">Para ver tu gap de datos en directo</div>
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                {DEMO_PROOF.map(({ slug, href }) => {
                  const c = getCaseStudy(slug, "es");
                  return (
                    <figure key={slug} className="m-0 p-6 bg-white rounded-xl" style={{ borderLeft: "3px solid #2E5C8A" }}>
                      <blockquote className="m-0 text-[15px] text-ink-2 leading-[1.6] italic">
                        &ldquo;{c.quote}&rdquo;
                      </blockquote>
                      <figcaption className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.08em] font-semibold mt-3">
                        {c.person} · {c.role} · {c.client} ·{" "}
                        <Link href={href} className="text-ink-soft no-underline border-b border-warm-200 hover:text-ink transition-colors">
                          Ver el caso
                        </Link>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px]">
                <Link href="/es/how-it-works" className="text-ink-soft no-underline border-b border-warm-200 pb-0.5 hover:text-ink transition-colors">Cómo funciona</Link>
                <Link href="/es/product" className="text-ink-soft no-underline border-b border-warm-200 pb-0.5 hover:text-ink transition-colors">Producto completo</Link>
                <Link href="/es/data-loss-calculator" className="text-ink-soft no-underline border-b border-warm-200 pb-0.5 hover:text-ink transition-colors">Calcula tu pérdida de datos</Link>
              </div>
            </div>

            {/* Reserva directa primero; el formulario de cualificación pasa a
                ser la vía opcional. La página promete 30 minutos en directo —
                lo primero que ofrece debe ser un calendario, no una espera. */}
            <div className="lg:sticky lg:top-24">
              <div className="p-6 bg-ink text-white rounded-xl">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-amber">
                  Reserva directa
                </span>
                <h2
                  className="font-semibold text-white leading-[1.15] tracking-[-0.02em] mt-2"
                  style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}
                >
                  Elige hora — <em>ahora mismo.</em>
                </h2>
                <p className="text-[14px] text-white/70 leading-[1.55] mt-2 mb-5">
                  30 minutos con el founder, sobre tu propio tráfico. Sin
                  formulario de cualificación, sin esperar respuesta.
                </p>
                <a
                  href="https://cal.sealmetrics.com/rafa/30min"
                  className="inline-flex w-full items-center justify-center gap-2 bg-white text-ink px-6 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:brightness-95"
                >
                  Reserva un walkthrough con Rafa →
                </a>
                <p className="font-mono text-[10.5px] text-white/50 uppercase tracking-[0.08em] font-semibold mt-3 text-center">
                  Reserva instantánea · 30 min · sin compromiso
                </p>
              </div>

              <div className="mt-7 mb-5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
                  ¿Prefieres una sesión a medida?
                </span>
                <h3
                  className="font-semibold text-ink leading-[1.15] tracking-[-0.02em] mt-2"
                  style={{ fontSize: "clamp(19px, 2vw, 24px)" }}
                >
                  Cuéntanos tu setup — <em className="italic-accent">preparamos tu audit antes.</em>
                </h3>
                <p className="text-[14px] text-ink-soft leading-[1.55] mt-2">
                  6 preguntas rápidas y llegamos a la llamada con tus números
                  reales delante, no con un deck genérico. Respondemos en un día
                  laborable.
                </p>
              </div>
              <DemoFormEs />

              <p className="text-[13.5px] text-ink-soft leading-[1.55] mt-5">
                ¿Prefieres explorar por tu cuenta antes de hablar?{" "}
                <Link href="/es/demo-access" className="text-ink underline">
                  Accede a la cuenta demo
                </Link>{" "}
                — credenciales por email, dirección corporativa requerida.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
