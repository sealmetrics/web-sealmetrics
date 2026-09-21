import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import {
  breadcrumbSchema,
  speakableWebPageSchema,
  statisticClaimSchema,
  quotationSchema,
} from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { DualCTA } from "@/components/homepage/DualCTA";
import { LogosStripEs } from "@/components/sections/v3/HomeV3Es";
import { AgenticSetupSteps } from "@/components/sections/v3/AgenticPlanV3";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Por qué Sealmetrics — analítica agregada sin IDs",
  description:
    "Reporting agregado de campañas e ingresos sin cookies ni identificadores personales, con proceso alojado en la UE y flujos analíticos supervisados.",
  openGraph: {
    title: "Por qué Sealmetrics — analítica agregada sin IDs",
    description:
      "Mide eventos observados de campañas e ingresos sin identificadores del navegador, con proceso alojado en la UE y límites claros.",
    type: "website",
    images: [ogImage("/es/why-sealmetrics/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/why-sealmetrics/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Por qué Sealmetrics — analítica agregada sin IDs",
    description: "Mide eventos observados de campañas e ingresos sin identificadores del navegador, con proceso alojado en la UE y límites claros.",
    images: [ogImage("/es/why-sealmetrics/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/why-sealmetrics/",
    languages: getAlternatesEs("/why-sealmetrics"),
  },
};

/* Rayado rojo tenue para la parte "perdida" de cada barra del embudo */
const LOST_HATCH = {
  background:
    "repeating-linear-gradient(135deg, rgba(181,66,59,0.16), rgba(181,66,59,0.16) 6px, rgba(181,66,59,0.05) 6px, rgba(181,66,59,0.05) 12px)",
};

/* ============================================
   HERO · una frase, directo al grano
   ============================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm-white pt-10 md:pt-14 pb-14">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
        <div className="inline-flex items-center gap-3 bg-white border border-warm-100 rounded-full px-4 py-1.5 text-[13px] text-ink-2 mb-10">
          <span className="bg-warm-100 text-ink px-2.5 py-1 rounded text-[10px] font-semibold font-mono tracking-[0.08em] uppercase">
            Auditado
          </span>
          <Link href="/es/case-studies/palladium-hotel-group" className="text-ink border-b border-warm-200 hover:border-ink no-underline">
            Palladium Hotel Group: 40% del tráfico sin atribución → +165% CPS en Display
          </Link>
        </div>

        <h1 className="h-display mx-auto" style={{ maxWidth: "24ch" }}>
          Estás dirigiendo el negocio con <em>una fracción de los datos.</em>
        </h1>

        <p
          className="text-ink-soft mt-7 mx-auto max-w-[54ch] leading-[1.55]"
          style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
        >
          Sealmetrics mide tráfico y ventas observados sin cookies ni identificadores del
          navegador y aplica atribución last-click sobre esos eventos agregados.
        </p>

        <DualCTA locale="es" className="justify-center mt-8" />

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
          {["Arquitectura orientada a privacidad", "Sin identificadores del navegador", "Proceso UE", "Alojado en UE · Dublín"].map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   DÓNDE MUEREN TUS DATOS · embudo en una imagen
   ============================================ */
function WhereDataDies() {
  const rows: {
    label: string;
    note: string;
    width: number;
    value: string;
    valueClass: string;
  }[] = [
    {
      label: "Cada visita que ocurrió",
      note: "la realidad",
      width: 100,
      value: "100%",
      valueClass: "text-ink",
    },
    {
      label: "Tras el muro de consentimiento",
      note: "el 40–60% del tráfico no acepta cookies · nuestra experiencia con clientes",
      width: 50,
      value: "40–60%",
      valueClass: "text-red-alert",
    },
    {
      label: "Tras la prevención de rastreo",
      note: "cookies caducan a 7 días · ad-blockers · depende de la web",
      width: 38,
      value: "menos",
      valueClass: "text-red-alert",
    },
    {
      label: "En el canal correcto",
      note: "auditoría Palladium: el 40% no tenía fuente",
      width: 0,
      value: "?",
      valueClass: "text-red-alert",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
        <div className="max-w-[52ch] mb-12">
          <span className="eyebrow mb-5">El problema, en una imagen</span>
          <h2 className="h-section mt-5">
            Tu ROAS no está mal por un margen. <em>Está mal por diseño.</em>
          </h2>
        </div>

        <div className="grid gap-5">
          {rows.map((r) => (
            <div key={r.label} className="grid md:grid-cols-[260px_1fr] gap-2 md:gap-6 items-center">
              <div>
                <div className="text-[15px] font-semibold text-ink leading-tight">{r.label}</div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-soft mt-1">
                  {r.note}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-11 rounded-[4px] overflow-hidden flex flex-1">
                  {r.width > 0 ? (
                    <>
                      <div
                        className="h-full bg-ink transition-none"
                        style={{ width: `${r.width}%` }}
                      />
                      <div className="h-full flex-1" style={LOST_HATCH} />
                    </>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center border border-dashed border-red-alert/50 rounded-[4px]">
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-red-alert font-semibold">
                        imposible de saber con estos datos
                      </span>
                    </div>
                  )}
                </div>
                <div className={`font-mono text-[18px] font-semibold tabular-nums w-20 text-right ${r.valueClass}`}>
                  {r.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-warm-100">
          <p
            className="text-ink font-medium leading-[1.3] max-w-[38ch]"
            style={{ fontSize: "clamp(20px, 2.2vw, 27px)", letterSpacing: "-0.02em" }}
          >
            El ROAS que defiendes el lunes <em className="italic-accent">se calcula sobre la última barra.</em>
          </p>
          <Link
            href="/es/data-loss-calculator/"
            className="inline-flex items-center gap-2 border border-warm-200 text-ink px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 shrink-0"
          >
            Calcula tu pérdida de datos →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   DISTORSIÓN · la pérdida no es aleatoria
   ============================================ */
function ChannelDistortion() {
  const ga4View: { label: string; share: string; width: number; alert?: boolean }[] = [
    { label: "Paid Social", share: "14%", width: 18, alert: true },
    { label: "Paid Search", share: "22%", width: 29 },
    { label: "Búsqueda de marca", share: "34%", width: 45 },
    { label: "Email / Directo", share: "30%", width: 40 },
  ];
  const realView: { label: string; share: string; width: number; hero?: boolean }[] = [
    { label: "Paid Social", share: "35%", width: 90, hero: true },
    { label: "Paid Search", share: "25%", width: 64 },
    { label: "Búsqueda de marca", share: "20%", width: 52 },
    { label: "Email / Directo", share: "20%", width: 52 },
  ];
  const steps: { n: string; big: string; cap: React.ReactNode; err?: boolean }[] = [
    {
      n: "01 · Gastas",
      big: "50.000 €",
      cap: (
        <>
          al mes en ads. Se cierran <strong className="font-semibold text-ink">1.000 ventas</strong> reales.
        </>
      ),
    },
    {
      n: "02 · GA4 ve",
      big: "≈420",
      cap: "La fracción que aceptó cookies y sobrevivió a la prevención de rastreo — sesgada por canal.",
    },
    {
      n: "03 · Decides",
      big: "−40%",
      cap: "Recortas social («parece flojo») y refuerzas marca («parece el héroe»).",
      err: true,
    },
    {
      n: "04 · Resultado",
      big: "↓ ventas",
      cap: "Acabas de recortar tu mejor canal de adquisición. Mismo gasto, menos revenue.",
      err: true,
    },
  ];

  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[54ch] mb-12">
          <span className="eyebrow mb-5">La forma de la pérdida</span>
          <h2 className="h-section mt-5">
            La pérdida por consentimiento <em>no se distribuye por igual.</em>
          </h2>
          <p className="text-[17px] leading-[1.6] text-ink-soft mt-6">
            El ejemplo es ilustrativo. En nuestra experiencia con clientes, entre el 40% y el
            60% del tráfico no acepta cookies; la tasa real debe medirse en tu propia web. Si perdieras conversiones al azar, verías una foto más pequeña
            con las mismas proporciones — y decidirías igual. Pero la tasa de rechazo de
            cookies cambia según el canal: el paid social en móvil rechaza mucho más que
            una búsqueda de marca en desktop. GA4 no te da una foto pequeña.{" "}
            <strong className="font-semibold text-ink">Te da una foto deformada.</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Como lo ve GA4 */}
          <article className="bg-white border border-warm-100 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
                Como lo ve GA4
              </span>
              <span
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.06em] rounded-full px-2.5 py-1"
                style={{ backgroundColor: "rgba(181,66,59,0.08)", color: "var(--color-red-alert)" }}
              >
                Sesgado
              </span>
            </div>
            <div className="grid gap-3.5">
              {ga4View.map((r) => (
                <div key={r.label} className="grid grid-cols-[150px_1fr_44px] items-center gap-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-ink-soft">{r.label}</span>
                  <div className="h-5 rounded-[3px] bg-warm-100 overflow-hidden">
                    <div
                      className="h-full rounded-[3px]"
                      style={{ width: `${r.width}%`, backgroundColor: "var(--color-warm-300)" }}
                    />
                  </div>
                  <span
                    className={`font-mono text-[12px] font-semibold tabular-nums text-right ${r.alert ? "text-red-alert" : "text-ink-2"}`}
                  >
                    {r.share}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-6 pt-5 border-t border-warm-100">
              Social parece el canal débil; marca y directo parecen los héroes.{" "}
              <strong className="font-semibold text-red-alert">La decisión lógica: recortar social.</strong>
            </p>
          </article>

          {/* La realidad */}
          <article className="bg-white border border-brand/30 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
                Dato observado — sin gate de consentimiento
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.06em] rounded-full px-2.5 py-1 bg-brand-soft/40 text-brand">
                Agregado
              </span>
            </div>
            <div className="grid gap-3.5">
              {realView.map((r) => (
                <div key={r.label} className="grid grid-cols-[150px_1fr_44px] items-center gap-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-ink-soft">{r.label}</span>
                  <div className="h-5 rounded-[3px] bg-warm-100 overflow-hidden">
                    <div
                      className="h-full rounded-[3px]"
                      style={{
                        width: `${r.width}%`,
                        backgroundColor: r.hero ? "var(--color-brand)" : "var(--color-ink)",
                      }}
                    />
                  </div>
                  <span
                    className={`font-mono text-[12px] font-semibold tabular-nums text-right ${r.hero ? "text-brand" : "text-ink-2"}`}
                  >
                    {r.share}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-6 pt-5 border-t border-warm-100">
              Social era tu mayor motor de adquisición. La búsqueda de marca era gente que{" "}
              <strong className="font-semibold text-ink">ya venía a comprar.</strong>
            </p>
          </article>
        </div>

        <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-soft mt-4">
          Escenario ilustrativo — la desviación real depende de tu mix de canales. Mídela en tu propio tráfico.
        </p>

        {/* Ejemplo con números */}
        <div className="mt-14 pt-12 border-t border-warm-100">
          <h3 className="text-[22px] font-semibold text-ink tracking-[-0.01em] mb-10 max-w-[30ch]">
            Mismo presupuesto. Menos ventas. Sin saber por qué.
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-y-8">
            {steps.map((s, i) => (
              <div key={s.n} className={`px-6 ${i === 0 ? "md:pl-0 pl-6 sm:pl-0" : ""} ${i > 0 ? "md:border-l border-warm-100" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-warm-100 md:border-l" : ""}`}>
                <div className={`font-mono text-[11px] font-bold uppercase tracking-[0.1em] ${s.err ? "text-red-alert" : "text-brand"}`}>
                  {s.n}
                </div>
                <div
                  className={`font-semibold tracking-[-0.03em] tabular-nums leading-none mt-3 mb-2.5 ${s.err ? "text-red-alert" : "text-ink"}`}
                  style={{ fontSize: "clamp(28px, 3vw, 38px)" }}
                >
                  {s.big}
                </div>
                <p className="text-[13.5px] leading-[1.5] text-ink-soft">{s.cap}</p>
              </div>
            ))}
          </div>
          <p
            className="text-ink font-medium leading-[1.35] max-w-[46ch] mt-12"
            style={{ fontSize: "clamp(19px, 2.1vw, 26px)", letterSpacing: "-0.015em" }}
          >
            No pierdes dinero por gastar de más. Lo pierdes por{" "}
            <em className="italic-accent">decidir sobre una foto deformada.</em>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   OBJECIÓN DEL CFO · pull-quote editorial
   ============================================ */
function CfoObjection() {
  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[54ch] mb-12">
          <span className="eyebrow mb-5">La objeción legítima</span>
          <h2 className="h-section mt-5">
            «Ese revenue ya ocurrió.» <em>Cierto. Y no es el punto.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-[1fr_1.15fr] gap-10 md:gap-16 items-start">
          <figure className="border-l-2 pl-6 md:sticky md:top-24" style={{ borderColor: "#2E5C8A" }}>
            <blockquote className="text-[22px] md:text-[26px] leading-[1.4] text-ink font-medium tracking-[-0.01em]">
              «Esas ventas ya se cerraron. Ver el número completo no me hace vender más.»
            </blockquote>
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
              Lo que dirá tu CFO
            </figcaption>
          </figure>

          <div className="grid gap-5">
            <p className="text-[16.5px] leading-[1.6] text-ink-2">
              Tiene razón en lo primero: Sealmetrics no crea revenue nuevo.{" "}
              <strong className="font-semibold text-ink">Ese revenue ya está.</strong> Lo que
              recuperas es la capacidad de decidir bien sobre él.
            </p>
            <p className="text-[16.5px] leading-[1.6] text-ink-2">
              Hoy, la foto deformada te empuja a recortar los canales cuyos compradores
              rechazan cookies y a financiar los que solo parecen fuertes. Con eventos
              agregados independientes del consentimiento y{" "}
              <Link href="/glossary/last-click-attribution" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
                atribución last-click
              </Link>{" "}
              sobre el dataset observado — ese sabotaje silencioso es más fácil de detectar.
            </p>
            <p className="text-[16.5px] leading-[1.6] text-ink-2">
              Y en el próximo recorte de presupuesto: si solo puedes demostrar la mitad del
              retorno, te recortan. Con más retorno observado atribuido,{" "}
              <strong className="font-semibold text-ink">marketing lo defiende — o lo amplía.</strong>
            </p>
            <p
              className="text-ink font-medium leading-[1.4] mt-3 pt-6 border-t border-warm-100"
              style={{ fontSize: "clamp(19px, 2vw, 24px)", letterSpacing: "-0.015em" }}
            >
              Mismo presupuesto, <em className="italic-accent">más ventas.</em> O mismas
              ventas, <em className="italic-accent">menos presupuesto.</em> La eficiencia
              te la cobras tú.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CINCO RESULTADOS · bento con mini-visuales
   ============================================ */
function MiniBar({ label, pct, color, textColor }: { label: string; pct: number; color: string; textColor: string }) {
  return (
    <div className="grid grid-cols-[92px_1fr_44px] items-center gap-3">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink-soft">{label}</span>
      <div className="h-6 rounded-[3px] bg-warm-100 overflow-hidden">
        <div className="h-full rounded-[3px]" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className={`font-mono text-[12px] font-semibold tabular-nums text-right ${textColor}`}>{pct}%</span>
    </div>
  );
}

function FiveOutcomes() {
  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[52ch] mb-12">
          <span className="eyebrow mb-5">Qué cambia con Sealmetrics</span>
          <h2 className="h-section mt-5">
            Cinco cosas se vuelven ciertas <em>desde el primer día.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-6 gap-4">
          {/* 01 · Mide sin gate de consentimiento */}
          <article className="md:col-span-3 bg-white border border-warm-100 rounded-2xl p-7 flex flex-col gap-5">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">01</span>
              <h3 className="text-[20px] font-semibold text-ink leading-[1.25] mt-2">
                Mide sin gate de consentimiento
              </h3>
            </div>
            <div className="grid gap-2.5">
              <MiniBar label="GA4 · UE" pct={55} color="var(--color-warm-300)" textColor="text-ink-soft" />
              <MiniBar label="Sealmetrics" pct={100} color="var(--color-brand)" textColor="text-brand" />
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-auto">
              La capa analítica no usa identificadores del navegador ni gate de
              consentimiento. La cobertura depende de implementación, red y bloqueadores.{" "}
              <Link href="/es/complete-data" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
                Datos completos
              </Link>
              , observados — no modelados. Las barras ilustran el gate de consentimiento,
              no una tasa de captura garantizada.
            </p>
          </article>

          {/* 02 · Atribuye ventas observadas */}
          <article className="md:col-span-3 bg-white border border-warm-100 rounded-2xl p-7 flex flex-col gap-5">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">02</span>
              <h3 className="text-[20px] font-semibold text-ink leading-[1.25] mt-2">
                Atribuye ventas observadas
              </h3>
            </div>
            <div className="grid gap-2.5 font-mono text-[12.5px]">
              <div className="flex items-center justify-between bg-warm-50 border border-warm-100 rounded-[4px] px-4 py-2.5">
                <span className="text-ink-soft uppercase tracking-[0.05em] text-[10.5px]">Tráfico sin atribuir</span>
                <span className="tabular-nums font-semibold">
                  <span className="text-red-alert">40%</span>
                  <span className="text-ink-soft font-normal"> → </span>
                  <span className="text-brand">0%</span>
                </span>
              </div>
              <div className="flex items-center justify-between bg-warm-50 border border-warm-100 rounded-[4px] px-4 py-2.5">
                <span className="text-ink-soft uppercase tracking-[0.05em] text-[10.5px]">Atribuido last-click</span>
                <span className="tabular-nums font-semibold">
                  <span className="text-red-alert">60%</span>
                  <span className="text-ink-soft font-normal"> → </span>
                  <span className="text-brand">100%</span>
                </span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft mt-0.5">
                Auditoría Palladium Hotel Group · abril 2026
              </div>
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-auto">
              <Link href="/glossary/last-click-attribution" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
                Last-click
              </Link>{" "}
              sobre eventos observados — «directo» deja de ser un vertedero.
            </p>
          </article>

          {/* 03 · Nivel SKU */}
          <article className="md:col-span-2 bg-white border border-warm-100 rounded-2xl p-7 flex flex-col gap-5">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">03</span>
              <h3 className="text-[20px] font-semibold text-ink leading-[1.25] mt-2">
                Analítica a nivel de SKU
              </h3>
            </div>
            <div className="grid gap-2">
              {[
                { l: "Vista producto", pct: 100 },
                { l: "Añadir al carrito", pct: 46 },
                { l: "Compra", pct: 11 },
              ].map((s) => (
                <div key={s.l} className="grid grid-cols-[110px_1fr] items-center gap-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-ink-soft">{s.l}</span>
                  <div className="h-5 rounded-[3px] bg-warm-100 overflow-hidden">
                    <div className="h-full bg-ink rounded-[3px]" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {["talla M", "color marino", "modelo 8421"].map((c) => (
                  <span key={c} className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-2 bg-warm-100 rounded-full px-2.5 py-1">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-auto">
              Embudos y desgloses por cualquier{" "}
              <Link href="/es/product" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
                propiedad de producto
              </Link>
              .
            </p>
          </article>

          {/* 04 · IA que no entrena a nadie */}
          <article className="md:col-span-2 bg-white border border-warm-100 rounded-2xl p-7 flex flex-col gap-5">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">04</span>
              <h3 className="text-[20px] font-semibold text-ink leading-[1.25] mt-2">
                IA que no entrena a nadie
              </h3>
            </div>
            <div className="grid gap-2">
              <div className="bg-warm-50 border border-warm-100 rounded-lg px-4 py-3 font-mono text-[12px] text-ink-2 leading-snug">
                «¿Qué campañas desperdiciaron inversión la semana pasada?»
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-soft">
                  LENS IA privada · responde en la UE
                </span>
              </div>
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-auto">
              <Link href="/es/ai-analytics" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
                IA privada
              </Link>{" "}
              o tu propia clave — tus datos no alimentan ningún algoritmo.
            </p>
          </article>

          {/* 05 · En marcha en 5 a 30 minutos */}
          <article className="md:col-span-2 bg-white border border-warm-100 rounded-2xl p-7 flex flex-col gap-5">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">05</span>
              <h3 className="text-[20px] font-semibold text-ink leading-[1.25] mt-2">
                En marcha en 5 a 30 minutos
              </h3>
            </div>
            <div className="bg-ink rounded-lg px-4 py-3.5 font-mono text-[12px] text-white/85 leading-snug overflow-x-auto whitespace-nowrap">
              <code>{"<script src=\"//app.sealmetrics.com/…\">"}</code>
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft mt-auto">
              Un tag — o{" "}
              <a href="#agentic-setup" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
                un prompt al MCP
              </a>
              . En paralelo con GA4, sin migración.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   LO QUE GANA EL CMO · el lunes, antes y después
   ============================================ */
function CmoOutcomes() {
  const rows = [
    {
      label: "El debate del dato",
      before: "Cuatro herramientas, cuatro números — la reunión empieza discutiendo qué dashboard tiene razón.",
      after: "Un número que marca, finanzas y agencia firman. Discutes la decisión, no el dato.",
    },
    {
      label: "La decisión de presupuesto",
      before: "Los canales cuyos compradores rechazan cookies parecen débiles — y recortas el gasto equivocado.",
      after: "Afloran los canales inframedidos. Dreamplace encontró +30% de tráfico que GA no veía.",
    },
    {
      label: "El resultado que presentas",
      before: "Un ROAS modelado que no puedes defender del todo.",
      after: "Reasignación con datos reales. Palladium: +165% en Cost-per-Search de Display.",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[54ch] mb-12">
          <span className="eyebrow mb-5">Qué ganas tú</span>
          <h2 className="h-section mt-5">
            Llega al lunes con <em>un número que nadie discute.</em>
          </h2>
        </div>

        {/* Cabeceras de columna */}
        <div className="hidden md:grid md:grid-cols-[190px_1fr_1fr] gap-4 mb-3">
          <div />
          <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-red-alert font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-alert" />
            Hoy
          </div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-brand font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Con Sealmetrics
          </div>
        </div>

        <div className="grid gap-3">
          {rows.map((r) => (
            <div key={r.label} className="grid md:grid-cols-[190px_1fr_1fr] gap-3 md:gap-4 items-stretch">
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft font-semibold md:py-5">
                {r.label}
              </div>
              <div
                className="rounded-xl border p-5 text-[14.5px] leading-[1.5] text-ink-2"
                style={{ borderColor: "rgba(181,66,59,0.25)", backgroundColor: "rgba(181,66,59,0.04)" }}
              >
                {r.before}
              </div>
              <div className="rounded-xl border border-brand/30 bg-brand-soft/20 p-5 text-[14.5px] leading-[1.5] text-ink font-medium">
                {r.after}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   MECANISMO · tres pasos, una línea cada uno
   ============================================ */
function Mechanism() {
  const steps = [
    { n: "01", t: "Sin cookies", d: "Sin identificadores ni fingerprints. Eventos agregados — hits, no personas." },
    { n: "02", t: "Eventos agregados", d: "El producto se diseña alrededor de hits y propiedades comerciales, no de perfiles personales." },
    { n: "03", t: "Sin identificador", d: "La cobertura depende de implementación y entrega; la privacidad no depende de un perfil de visitante." },
  ];

  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[52ch] mb-12">
          <span className="eyebrow mb-5">La pregunta obvia</span>
          <h2 className="h-section mt-5">
            ¿Cómo funciona la medición <em>sin identificadores del navegador?</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
          {steps.map((s, i) => (
            <div key={s.n} className="contents">
              {i > 0 && (
                <div className="hidden md:flex items-center justify-center text-warm-300 text-[22px]" aria-hidden>
                  →
                </div>
              )}
              <article className="bg-warm-50 border border-warm-100 rounded-xl p-7">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">{s.n}</span>
                <h3 className="text-[19px] font-semibold text-ink leading-[1.3] mt-2.5 mb-2">{s.t}</h3>
                <p className="text-[14px] leading-[1.55] text-ink-soft">{s.d}</p>
              </article>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-warm-100">
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
            {["Diseñada para el RGPD", "ePrivacy", "Schrems II limpio", "Alojado en UE · Dublín", "DPA incluido", "Paquete TPSR"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                {b}
              </span>
            ))}
          </div>
          <Link
            href="/es/security"
            className="inline-flex items-center gap-2 border border-warm-200 text-ink px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 shrink-0"
          >
            Lee la arquitectura de compliance →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PRUEBA · slab oscuro #1 — auditoría Palladium
   ============================================ */
function ProofSlab() {
  return (
    <section className="section-dark bg-ink text-white py-24 border-t border-warm-100 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -140,
          top: -140,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(45,139,109,0.3),transparent 70%)",
        }}
      />
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 relative">
        <div className="max-w-[56ch] mb-12">
          <span className="eyebrow mb-5">Auditado, no prometido</span>
          <h2 className="h-section mt-5 text-white">
            Palladium Hotel Group hizo la comparación. <em>El gap era del 40%.</em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { n: "40%", l: "del tráfico no tenía atribución antes" },
            { n: "35%", l: "de las reservas en GA4 sin canal asignado" },
            { n: "+165%", l: "Cost-per-Search de Display en DV360 después" },
          ].map((s) => (
            <div key={s.n} className="bg-white/5 border border-white/10 rounded-xl p-7">
              <div
                className="font-semibold tracking-[-0.04em] tabular-nums leading-none"
                style={{ fontSize: "clamp(44px, 5vw, 64px)", color: "#E8B84B" }}
              >
                {s.n}
              </div>
              <div className="text-[14px] text-white/75 leading-[1.5] mt-3.5">{s.l}</div>
            </div>
          ))}
        </div>

        <figure className="mt-12 max-w-[64ch] border-l-2 pl-6" style={{ borderColor: "#2E5C8A" }}>
          <blockquote className="text-[20px] md:text-[23px] leading-[1.45] text-white/90 font-medium tracking-[-0.01em]">
            «Los datos que entrega Sealmetrics son agnósticos, imparciales y neutrales.
            No hay caja negra.»
          </blockquote>
          <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-white/50 font-semibold">
            Toni Andújar · Digital &amp; Direct Sales Director · Palladium Hotel Group
          </figcaption>
        </figure>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between pt-8 border-t border-white/10">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/50">
            Dreamplace Hotels · +30% tráfico vs GA · 15–20% más ventas atribuidas
          </p>
          <Link
            href="/es/case-studies/palladium-hotel-group"
            className="inline-flex items-center gap-2 bg-white text-ink px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:brightness-95 shrink-0"
          >
            Lee el caso completo →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   COMPARACIÓN · celdas cortas, escaneables
   ============================================ */
function ComparisonAnchor() {
  const rows: { label: string; ga4: string; ga360: string; adobe: string; seal: string }[] = [
    { label: "Recogida de tráfico UE", ga4: "Con gate", ga360: "Con gate", adobe: "Con gate de consentimiento", seal: "Sin identificador ni gate en la capa analítica" },
    { label: "Atribución", ga4: "Modelada", ga360: "Modelada + muestreada", adobe: "Solo datos consentidos", seal: "Last-click sobre eventos agregados observados" },
    { label: "Compliance UE", ga4: "Requiere análisis Schrems II", ga360: "Requiere análisis Schrems II", adobe: "Análisis de transferencia a EE. UU.", seal: "Arquitectura orientada a privacidad · Dublín" },
    { label: "Tus datos e IA", ga4: "Ecosistema Google", ga360: "Ecosistema Google", adobe: "Ecosistema Adobe", seal: "IA privada o BYOK" },
    { label: "Setup", ga4: "Plan de etiquetado + CMP", ga360: "Meses", adobe: "Meses", seal: "5–30 minutos según plataforma" },
    { label: "Coste", ga4: "Gratis", ga360: "~50–175K$/año", adobe: "~50–200K$/año", seal: "Desde 499 €/mes" },
  ];

  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">La comparación que importa</span>
            <h2 className="h-section mt-5">
              Datos de nivel enterprise <em>sin la factura enterprise.</em>
            </h2>
          </div>
          <p className="text-[16px] leading-[1.6] text-ink-soft max-w-[50ch]">
            GA4 funciona bien cuando las tasas de consentimiento son altas y las
            transferencias fuera de la UE no son tu problema. GA360 y Adobe son plataformas
            serias — con facturas serias.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-warm-100">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="bg-warm-50">
                <th className="p-4 border-b border-warm-100 w-[18%]"></th>
                <th className="p-4 text-[15px] font-semibold text-ink border-b border-warm-100 w-[19%]">GA4 (gratis)</th>
                <th className="p-4 text-[15px] font-semibold text-ink border-b border-warm-100 w-[19%]">GA360</th>
                <th className="p-4 text-[15px] font-semibold text-ink border-b border-warm-100 w-[19%]">Adobe Analytics</th>
                <th className="p-4 text-[15px] font-semibold text-ink border-b border-warm-100 bg-brand-soft/30 w-[25%]">Sealmetrics</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-warm-100 last:border-b-0">
                  <td className="p-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft font-semibold align-middle">
                    {r.label}
                  </td>
                  <td className="p-4 text-[14px] leading-snug text-ink-2 align-middle">{r.ga4}</td>
                  <td className="p-4 text-[14px] leading-snug text-ink-2 align-middle">{r.ga360}</td>
                  <td className="p-4 text-[14px] leading-snug text-ink-2 align-middle">{r.adobe}</td>
                  <td className="p-4 text-[14px] leading-snug text-ink font-semibold bg-brand-soft/20 align-middle">
                    {r.seal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p
            className="text-ink font-medium leading-[1.35] max-w-[48ch]"
            style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.015em" }}
          >
            La analítica más barata que puedes tener es <em className="italic-accent">la que evita una mala reasignación de presupuesto.</em>
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] shrink-0">
            <Link href="/es/vs-ga4" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
              vs GA4
            </Link>
            <Link href="/es/vs/ga360" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
              vs GA360
            </Link>
            <Link href="/es/vs/adobe-analytics" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
              vs Adobe Analytics
            </Link>
            <Link href="/es/pricing" className="text-brand no-underline border-b border-brand/30 hover:border-brand">
              Ver precios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   IA PRIVADA · la frontera UE, como diagrama
   ============================================ */
function CrossIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0">
      <path d="M3 3l8 8M11 3l-8 8" stroke="var(--color-red-alert)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PrivateAI() {
  return (
    <section className="py-24 bg-warm-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[52ch] mb-12">
          <span className="eyebrow mb-5">Tus datos, tus algoritmos</span>
          <h2 className="h-section mt-5">
            IA sobre tus números — <em>sin alimentar los de nadie más.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-[1.6fr_1fr] gap-4 items-stretch">
          {/* Frontera UE */}
          <div className="border-2 border-brand rounded-2xl p-6 md:p-8 bg-white relative">
            <span className="absolute -top-3 left-6 bg-white px-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-brand font-bold">
              Frontera UE — tus datos nunca la cruzan
            </span>
            <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-center h-full">
              <div className="bg-warm-50 border border-warm-100 rounded-xl p-6 text-center">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-semibold mb-2">
                  Tus datos de analítica
                </div>
                <div className="text-[19px] font-semibold text-ink">Dublín, Irlanda</div>
              </div>
              <div className="text-warm-300 text-[22px] text-center rotate-90 sm:rotate-0" aria-hidden>
                ⇄
              </div>
              <div className="bg-warm-50 border border-warm-100 rounded-xl p-6 text-center">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-semibold mb-2">
                  LENS IA privada
                </div>
                <div className="text-[19px] font-semibold text-ink">gpt-oss-120b · París</div>
              </div>
            </div>
          </div>

          {/* A lo que nunca llegan */}
          <div className="border border-warm-100 rounded-2xl p-6 md:p-8 bg-white">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-soft font-bold mb-4">
              Sin camino hacia
            </div>
            <ul className="grid gap-3">
              {["Entrenamiento de modelos de terceros", "Algoritmos de plataformas de ads", "Tus competidores"].map((x) => (
                <li key={x} className="flex items-center gap-3 text-[15px] text-ink-2">
                  <CrossIcon />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          {["LENS IA privada", "BYOK · Anthropic / OpenAI / Gemini / DeepSeek", "MCP · 40+ herramientas de solo lectura"].map((c) => (
            <span key={c} className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2 bg-white border border-warm-100 rounded-full px-4 py-1.5">
              {c}
            </span>
          ))}
          <Link href="/es/ai-analytics" className="text-[14px] text-brand no-underline border-b border-brand/30 hover:border-brand ml-auto">
            Ver la capa de IA →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PÁGINA
   ============================================ */
export default function WhySealmetricsPageEs() {
  return (
    <>
      <Breadcrumbs locale="es" items={[{ label: "Por qué Sealmetrics" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Por qué Sealmetrics", url: "/es/why-sealmetrics" }])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/es/why-sealmetrics",
          name: "Por qué Sealmetrics — analítica agregada sin identificadores",
          dateModified: "2026-09-21",
        })}
      />
      <JsonLd
        data={statisticClaimSchema({
          text: "El 40% del tráfico entrante no tenía atribución de fuente/medio en el stack de medición anterior.",
          source: "Auditoría interna de Palladium Hotel Group sobre atribución de tráfico",
          sourceAuthor: "Palladium Hotel Group",
          sourceDate: "2026-04-15",
          url: "/es/why-sealmetrics",
          numericValue: 40,
          unit: "PERCENT",
        })}
      />
      <JsonLd
        data={statisticClaimSchema({
          text: "El 35% de las reservas registradas en GA4 no podían asignarse al canal que las generó.",
          source: "Gap de atribución de reservas de Palladium Hotel Group",
          sourceAuthor: "Palladium Hotel Group",
          sourceDate: "2026-04-15",
          url: "/es/why-sealmetrics",
          numericValue: 35,
          unit: "PERCENT",
        })}
      />
      <JsonLd
        data={statisticClaimSchema({
          text: "Mejora del +165% en Cost-per-Search de Display tras aplicar un modelo de medición basado en Sealmetrics en DV360.",
          source: "Mejora de eficiencia en DV360 de Palladium Hotel Group",
          sourceAuthor: "Palladium Hotel Group",
          sourceDate: "2026-04-15",
          url: "/es/why-sealmetrics",
          numericValue: 165,
          unit: "PERCENT",
        })}
      />
      <JsonLd
        data={quotationSchema({
          text: "Los datos que entrega Sealmetrics son agnósticos, imparciales y neutrales. No hay caja negra.",
          spokenBy: "Toni Andújar",
          spokenByRole: "Digital & Direct Sales Director, Palladium Hotel Group",
          url: "/es/why-sealmetrics",
        })}
      />

      <Hero />
      <WhereDataDies />
      <ChannelDistortion />
      <CfoObjection />
      <FiveOutcomes />
      <CmoOutcomes />
      <Mechanism />
      <ProofSlab />
      <LogosStripEs />
      <ComparisonAnchor />
      <PrivateAI />
      <div id="agentic-setup" className="scroll-mt-24">
        <AgenticSetupSteps locale="es" />
      </div>
      <FinalCtaSharedV3
        locale="es"
        titleEn={
          <>
            The obvious choice is the one{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              you can verify.
            </em>
          </>
        }
        titleEs={
          <>
            La elección obvia es la que{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              puedes verificar.
            </em>
          </>
        }
        ledeEn="Run Sealmetrics side-by-side with GA4 — one tag or module, 5 to 30 minutes, 14-day trial. If the gap on your own traffic isn't worth acting on, keep GA4."
        ledeEs="Ejecuta Sealmetrics en paralelo con GA4 — un tag o módulo, de 5 a 30 minutos, prueba de 14 días. Si el gap en tu propio tráfico no justifica actuar, quédate con GA4."
      />

      <section className="bg-warm-white border-t border-warm-100 py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <QuickAnswer label="Respuesta rápida">
            <p>
              Sealmetrics es analítica agregada sin cookies para equipos de comercio electrónico
              y marketing que necesitan reporting de campañas e ingresos sin identificadores.
              Plausible es analítica ligera y de código abierto. Su{" "}
              <Link href="https://plausible.io/privacy-focused-web-analytics">
                documentación de privacidad
              </Link>{" "}
              describe medición agregada sin identificadores persistentes y un script de
              2,5 KB comprimido; su{" "}
              <Link href="https://plausible.io/docs/ecommerce-revenue-tracking">
                documentación de producto
              </Link>{" "}
              incluye eventos, embudos, recorridos y atribución de ingresos de comercio
              electrónico. Plausible no es solo un contador de páginas
              y la privacidad no basta para separar ambos productos.
            </p>
            <p>
              Elige Plausible para un panel sencillo y transparente, código abierto y
              reporting ligero de tráfico y objetivos. Evalúa Sealmetrics para un modelo
              operativo enterprise centrado en decisiones de campaña e ingresos, proceso
              alojado en Dublín y flujos analíticos supervisados. Ningún producto registra
              cada interacción ni garantiza todo el tráfico: bloqueadores, errores de
              implementación, recorridos offline y requisitos legales afectan a la medición.
              Compáralos por los eventos observables, los informes que necesita tu equipo,
              el gobierno del dato, el soporte y el esfuerzo operativo total.
            </p>
          </QuickAnswer>
        </div>
      </section>
    </>
  );
}
