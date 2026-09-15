"use client";

import { useState } from "react";
import Link from "next/link";

type Locale = "en" | "es";

const ITEMS_EN = [
  {
    q: "What counts as a human event?",
    a: "A human event is any real visitor interaction: pageviews, clicks, conversions, form submissions, add-to-cart, newsletter signups. AI agent traffic and traditional bots are excluded — they're tracked separately and don't count toward your limit.",
  },
  {
    q: "Why is AI agent traffic free?",
    a: "AI agents (ChatGPT, Claude, Perplexity) represent a new category of traffic you need visibility into. We track them for free because understanding who reads your content with AI is a strategic advantage, not a cost center.",
  },
  {
    q: "What happens if I exceed my event limit?",
    a: "Your tracking never stops. We never block, throttle or sample your data. At 80% usage you get an informational email. At 100% a badge appears in your dashboard. If you exceed for 2 consecutive months that aren't forgiven, Growth moves up to Scale automatically at your next billing cycle. Scale is never auto-upgraded — we email you to discuss Enterprise instead. One overage month per year is free.",
  },
  {
    q: "Will I ever be auto-upgraded without warning?",
    a: "You'll always receive an email before any plan change. The only automatic move is Growth to Scale, after 2 consecutive months over your limit, applied at the start of your next billing cycle — never mid-cycle. Annual customers are adjusted only at renewal, and accounts billed through the Shopify App Store are never upgraded automatically: you approve the new plan from Shopify Admin. Never on a single spike.",
  },
  {
    q: "What if my traffic decreases? Can I downgrade?",
    a: "Yes — and we'll suggest it. If usage drops below 50% of your plan for 3+ months, we proactively email you with a one-click downgrade option. If you do nothing, nothing changes. We'd rather you pay for what you use.",
  },
  {
    q: "Are all features really included in every plan?",
    a: "Core analytics, conversion tracking, API, MCP Server, BigQuery export and LENS AI — ask your data in plain language and turn the answer into a report — are included from Growth up, running on your own AI key (BYOK: Anthropic, OpenAI, Gemini or DeepSeek). Automated rule-based anomaly detection, forecasting and growth opportunities are on the roadmap, not live today. Private AI, our managed EU-hosted model with no key needed, is a paid add-on on Growth and included on Scale and Enterprise (5M tokens/month), with extra 5M-token packs at €358.80 each; Enterprise gets a dedicated, non-shared instance. Other plan differences are event volume, webhooks and audit logs (Scale up), isolated processing (Enterprise) and support level.",
  },
  {
    q: "What is the Agentic Package?",
    a: "A free Sealmetrics tier you set up directly from your AI assistant — Claude Desktop, Codex or any MCP-capable agent. Your agent creates the account and generates the pixel, and you get the same complete cookieless analytics as Growth, free up to 1M human events in total. It's fully self-serve with documentation only and no credit card — no email, chat or priority support. When you pass 1M events in a month, the Growth plan activates.",
  },
  {
    q: "How do I create an account from an LLM?",
    a: "Add the Sealmetrics MCP server to your AI assistant, then ask it to set up Sealmetrics. It provisions your account, generates your tracking pixel, and you paste the pixel on your site. You access the same dashboard as any customer — the only difference is the account was created by your agent, not a signup form. Sites, users and accounts are unlimited; the free tier covers up to 1M human events per month.",
  },
  {
    q: "Can I switch between monthly and annual billing?",
    a: "Yes. Switch to annual at any time to get 2 months free. Annual is billed upfront. Monthly-to-annual switches take effect at your next billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — a 14-day trial with full access to every feature. You add a payment method when you start and are not charged until the trial ends — cancel before then and you pay nothing. You'll see your real data within minutes of installing our script. The Agentic Package, set up from your AI assistant, needs no card at all.",
  },
  {
    q: "Unlimited websites and users?",
    a: "Yes, on every plan. No per-seat charges, no per-domain charges. Add your entire team and all your domains from day one.",
  },
  {
    q: "My event count in Sealmetrics will be higher than in GA4 — why?",
    a: "Because we track without cookies or consent banners, we capture visitors GA4 never sees — typically 40–90% more traffic depending on your consent rejection rate. If GA4 shows 100K sessions/month, your real traffic may be 170K–300K sessions, generating roughly 4–6 events per session.",
  },
  {
    q: "Do you charge per event if I go over?",
    a: "No. No per-event overage billing. Your plan has a clear limit, and if you grow beyond it consistently, you move to the next plan at a fixed price. No surprise line items, no variable invoices.",
  },
  {
    q: "How does annual billing work if my usage grows mid-year?",
    a: "Annual plans are protected for the full contract. If traffic grows mid-year, we absorb the overage until renewal. At renewal we recommend the plan that fits current usage. You'll never receive an unexpected invoice mid-contract.",
  },
];

const ITEMS_ES = [
  {
    q: "¿Qué cuenta como evento humano?",
    a: "Cualquier interacción de un visitante real: páginas vistas, clics, conversiones, envíos de formulario, añadir al carrito, suscripciones. El tráfico de agentes IA y bots tradicionales se excluye — se trackea aparte y no suma a tu límite.",
  },
  {
    q: "¿Por qué los agentes IA son gratis?",
    a: "Los agentes IA (ChatGPT, Claude, Perplexity) son una categoría nueva de tráfico sobre la que necesitas visibilidad. Los trackeamos gratis porque entender quién lee tu contenido con IA es una ventaja estratégica, no un coste.",
  },
  {
    q: "¿Qué pasa si supero mi límite de eventos?",
    a: "El tracking nunca se detiene. Nunca bloqueamos, limitamos ni muestreamos tus datos. Al 80% recibes un email informativo. Al 100% aparece un badge en tu dashboard. Si superas el límite 2 meses seguidos sin perdonar, Growth pasa a Scale automáticamente en el siguiente ciclo. Scale nunca sube solo — te escribimos para hablar de Enterprise. Un mes de exceso al año es gratis.",
  },
  {
    q: "¿Me subirán de plan sin avisar?",
    a: "Siempre recibirás un email antes de cualquier cambio. El único movimiento automático es de Growth a Scale, tras 2 meses seguidos por encima de tu límite, y se aplica al inicio del siguiente ciclo — nunca a mitad. Los planes anuales solo se ajustan en la renovación, y las cuentas facturadas vía Shopify App Store nunca suben solas: apruebas el plan nuevo desde tu Shopify Admin. Nunca por un único pico.",
  },
  {
    q: "¿Puedo bajar de plan si mi tráfico baja?",
    a: "Sí — y te lo sugerimos. Si tu uso baja del 50% durante 3+ meses, te enviamos un email proactivo con opción de bajar de plan en un click. Si no haces nada, nada cambia. Preferimos que pagues por lo que usas.",
  },
  {
    q: "¿Todas las features están incluidas en cada plan?",
    a: "Analítica core, tracking de conversiones, API, MCP Server, export a BigQuery y LENS AI — pregunta a tus datos en lenguaje natural y convierte la respuesta en un informe — están incluidos desde Growth, funcionando con tu propia API key (BYOK: Anthropic, OpenAI, Gemini o DeepSeek). La detección automática de anomalías por reglas, el forecasting y las oportunidades de crecimiento están en el roadmap, no activos hoy. Private AI, nuestro modelo gestionado alojado en la UE y sin API key, es un add-on de pago en Growth y viene incluida en Scale y Enterprise (5M tokens/mes), con packs extra de 5M tokens a 358,80€ cada uno; Enterprise incluye una instancia dedicada, no compartida. Otras diferencias entre planes son volumen de eventos, webhooks y logs de auditoría (desde Scale), procesamiento aislado (Enterprise) y nivel de soporte.",
  },
  {
    q: "¿Qué es el Agentic Package?",
    a: "Un tier gratuito de Sealmetrics que configuras directamente desde tu asistente de IA — Claude Desktop, Codex o cualquier agente compatible con MCP. Tu agente crea la cuenta y genera el píxel, y obtienes la misma analítica completa sin cookies que Growth, gratis hasta 1M de eventos humanos en total. Es totalmente self-serve con solo documentación y sin tarjeta — sin soporte email, chat ni prioritario. Al superar 1M de eventos en un mes, se activa el plan Growth.",
  },
  {
    q: "¿Cómo creo una cuenta desde un LLM?",
    a: "Añade el servidor MCP de Sealmetrics a tu asistente de IA y pídele que configure Sealmetrics. Aprovisiona tu cuenta, genera tu píxel de tracking, y tú pegas el píxel en tu web. Accedes al mismo dashboard que cualquier cliente — la única diferencia es que la cuenta la creó tu agente, no un formulario de registro. Sitios, usuarios y cuentas son ilimitados; el tier gratuito cubre hasta 1M de eventos humanos al mes.",
  },
  {
    q: "¿Puedo cambiar entre mensual y anual?",
    a: "Sí. Cambia a anual cuando quieras y consigue 2 meses gratis. La facturación anual se cobra por adelantado. El cambio mensual-a-anual se aplica en el siguiente ciclo.",
  },
  {
    q: "¿Hay prueba gratuita?",
    a: "Sí — una prueba de 14 días con acceso completo a todas las features. Añades método de pago al empezar y no se te cobra hasta que acaba la prueba — si cancelas antes, no pagas nada. Verás tus datos reales a los pocos minutos de instalar el script. El Agentic Package, que configuras desde tu asistente de IA, no pide tarjeta.",
  },
  {
    q: "¿Webs y usuarios ilimitados?",
    a: "Sí, en todos los planes. Sin coste por asiento ni por dominio. Añade tu equipo entero y todos tus dominios desde el día uno.",
  },
  {
    q: "Mi número de eventos será mayor que en GA4, ¿por qué?",
    a: "Porque trackeamos sin cookies ni banners, capturamos visitantes que GA4 nunca ve — típicamente 40–90% más tráfico según tu tasa de rechazo. Si GA4 muestra 100K sesiones/mes, tu tráfico real puede ser 170K–300K, generando unos 4–6 eventos por sesión.",
  },
  {
    q: "¿Cobras por evento si me paso?",
    a: "No. Sin cobro por evento. Tu plan tiene un límite claro, y si creces consistentemente por encima, pasas al siguiente plan a un precio fijo. Sin líneas sorpresa en factura.",
  },
  {
    q: "¿Cómo funciona el anual si mi uso crece a mitad de año?",
    a: "Los planes anuales están protegidos durante todo el contrato. Si el tráfico crece a mitad de año, absorbemos el exceso hasta la renovación. En la renovación recomendamos el plan que encaje con tu uso actual. Nunca recibirás una factura inesperada a mitad de contrato.",
  },
];

const COPY = {
  en: {
    eyebrow: "FAQ",
    title: "Straight answers. No fine print.",
    lede: "Everything you probably want to know before choosing a plan — including the awkward questions.",
  },
  es: {
    eyebrow: "FAQ",
    title: "Respuestas directas. Sin letra pequeña.",
    lede: "Todo lo que probablemente quieras saber antes de elegir un plan — incluyendo las preguntas incómodas.",
  },
};

export function PricingFaqV3({ locale = "en" }: { locale?: Locale }) {
  const [openIdx, setOpenIdx] = useState(0);
  const items = locale === "es" ? ITEMS_ES : ITEMS_EN;
  const t = COPY[locale];

  return (
    <section className="py-28 bg-warm-50 border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">{t.eyebrow}</span>
            <h2 className="h-section mt-5">{t.title}</h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">{t.lede}</p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.8fr] gap-12 md:gap-20">
          <div>
            <p className="text-[16px] text-ink-soft leading-[1.55] mb-5">
              {locale === "es"
                ? "¿Más preguntas? Nuestro equipo — incluido el founder — está a un mensaje."
                : "Still have questions? Our team — including the founder — is one message away."}
            </p>
            <Link
              href={locale === "es" ? "/es/demo" : "/demo"}
              className="inline-flex items-center gap-2 bg-ink text-white px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
            >
              {locale === "es" ? "Escríbenos" : "Talk to us"} →
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {items.map((item, i) => {
              const isOpen = i === openIdx;
              return (
                <button
                  key={item.q}
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className={`w-full text-left border rounded-xl px-7 py-5 transition-all ${
                    isOpen ? "bg-ink text-white border-ink" : "bg-white border-warm-100 hover:border-warm-200"
                  }`}
                >
                  <div className="flex justify-between items-center gap-6">
                    {/* h3 under the section h2. Pricing objections are the
                        passages buyers and AI engines quote most. */}
                    <h3 className={`text-[16px] font-semibold tracking-[-0.015em] ${isOpen ? "text-white" : "text-ink"}`}>
                      {item.q}
                    </h3>
                    <span
                      className={`w-7 h-7 rounded-md flex items-center justify-center text-[18px] font-normal shrink-0 transition-transform ${
                        isOpen ? "bg-brand text-ink rotate-45" : "bg-warm-50 text-ink-soft"
                      }`}
                    >
                      +
                    </span>
                  </div>
                  {/* Always in the DOM, hidden when collapsed — the pricing
                      answers were absent from the served HTML entirely. */}
                  <p
                    hidden={!isOpen}
                    className="mt-3.5 text-[14.5px] leading-[1.65] text-white/80 max-w-[62ch]"
                  >
                    {item.a}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
