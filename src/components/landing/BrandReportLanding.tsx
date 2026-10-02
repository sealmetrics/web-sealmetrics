import Link from "next/link";
import { BrandReportForm } from "@/components/forms/BrandReportForm";
import { Picture } from "@/components/ui/Picture";
import { LandingFooter } from "@/components/landing/LandingChrome";
import { LandingEvents } from "@/components/landing/LandingEvents";

/* ============================================================
   LANDING DE PAGO · INFORME DE MARCA EN IA (v2, Meta Ads)
   La v1 era la página orgánica /es/ai-brand-monitoring/: 179 entradas
   móviles de la campaña en 30 días, 97,8 % de rebote, cero informes.
   En un móvil el formulario quedaba debajo de la miga, la etiqueta, un
   párrafo de cinco líneas y el listado de modelos. Aquí la página es
   una frase, los logos de quien contesta y el formulario, y nada más
   compite con él: sin menú, sin enlaces de salida salvo la muestra.
   ============================================================ */

// Las familias que contestan de verdad, comprobadas en Enroutia (~/code/routingllm,
// REFERENCE_MODELS + catálogo activo menos REPORT_EXCLUDED_ALIASES, 2 Oct 2026). Si un
// proveedor sale del panel, su logo sale de aquí: un logo es una afirmación.
const AI_LOGOS = [
  { src: "/logos/ai/openai.svg", name: "ChatGPT" },
  { src: "/logos/ai/claude.svg", name: "Claude" },
  { src: "/logos/ai/googlegemini.svg", name: "Gemini" },
  { src: "/logos/ai/perplexity.svg", name: "Perplexity" },
  { src: "/logos/ai/mistralai.svg", name: "Mistral" },
  { src: "/logos/ai/meta.svg", name: "Llama" },
  { src: "/logos/ai/deepseek.svg", name: "DeepSeek" },
  { src: "/logos/ai/qwen.svg", name: "Qwen" },
] as const;

const RECEIVES = [
  "Lo que contesta cada modelo, palabra por palabra.",
  "Los errores marcados: con quién te confunde y qué dice mal.",
  "A quién recomienda en tu lugar cuando alguien pide una marca como la tuya.",
  "Qué corregir en tu web para que la próxima respuesta salga bien.",
] as const;

export function BrandReportLanding() {
  return (
    <>
      <LandingEvents landing="analiza-tu-marca-en-ia" />
      <main id="main-content" className="sig-brand-page lp-brand">
        <header className="lp-brand-header">
          {/* El logo no enlaza: en una landing de pago, volver a la home es una fuga. */}
          <Picture
            src="/logos/logo-sealmetrics.svg"
            alt="Sealmetrics"
            width={157}
            height={28}
            className="lp-brand-logo"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
          <span className="lp-brand-free">Gratis · sin tarjeta</span>
        </header>

        <section className="lp-brand-hero">
          <div className="lp-brand-copy">
            <h1>
              Analiza lo que dicen
              <br />
              las IA <em>de tu marca</em>
            </h1>
            <p className="lp-brand-sub">
              19 modelos de IA contestan seis preguntas sobre tu empresa. Recibes cada
              respuesta con los errores marcados.
            </p>

            <ul className="lp-brand-logos" aria-label="Modelos que contestan">
              {AI_LOGOS.map((logo) => (
                <li key={logo.name}>
                  <Picture src={logo.src} alt="" width={28} height={28} loading="eager" />
                  <span>{logo.name}</span>
                </li>
              ))}
            </ul>
            <p className="lp-brand-logos-note">19 modelos en total: también Gemma, GLM y gpt-oss.</p>
          </div>

          <div id="request" className="sig-brand-request lp-brand-form">
            <div className="sig-brand-module-top">
              <span>Pide tu informe</span>
              <span>Marca + correo</span>
            </div>
            <BrandReportForm locale="es" consentInNotice />
          </div>
        </section>

        <section className="lp-brand-receives" aria-labelledby="lp-brand-receives-title">
          <h2 id="lp-brand-receives-title">Qué recibes</h2>
          <ul>
            {RECEIVES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link
            href="/es/ai-brand-monitoring/sample-report/"
            className="lp-brand-sample"
            data-lp-event="lp_sample_report_click"
          >
            Ver un informe de ejemplo
          </Link>
        </section>
      </main>
      <LandingFooter locale="es" />
    </>
  );
}
