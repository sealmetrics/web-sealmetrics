import Link from "next/link";

type Locale = "en" | "es";

// Where the Agentic CTA points. The account is provisioned from the LLM, so
// there is no register flow — we anchor to the on-page setup steps for now.
// Swap to the docs URL (e.g. https://docs.sealmetrics.com/agentic) once it exists.
export const AGENTIC_SETUP_HREF = "#agentic-setup";

const BAND_COPY = {
  en: {
    badge: "New · Free",
    name: "Agentic Package",
    tagline:
      "Created by your AI assistant. Set up Sealmetrics directly from Claude or Codex — no sales, no setup call.",
    price: "Free",
    priceSub: "Up to 1M human events in total",
    priceNote: "Then the Growth plan activates",
    bullets: [
      "Full dashboard, pixels & MCP",
      "Unlimited sites, users & accounts",
      "The same complete data as Growth",
      "Self-serve · docs only · no card",
    ],
    cta: "Set up in Claude or Codex",
  },
  es: {
    badge: "Nuevo · Gratis",
    name: "Agentic Package",
    tagline:
      "Creado por tu asistente de IA. Configura Sealmetrics directamente desde Claude o Codex — sin ventas, sin llamada de setup.",
    price: "Gratis",
    priceSub: "Hasta 1M de eventos humanos en total",
    priceNote: "Después se activa el plan Growth",
    bullets: [
      "Dashboard, píxeles y MCP completos",
      "Sitios, usuarios y cuentas ilimitados",
      "Los mismos datos completos que Growth",
      "Self-serve · solo docs · sin tarjeta",
    ],
    cta: "Configúralo en Claude o Codex",
  },
} as const;

// Free, LLM-provisioned tier. Rendered as a distinct full-width band above the
// paid plan grid — it's a different motion (no register flow), not a 4th card.
export function AgenticPlanBand({
  locale = "en",
  embedded = false,
  ctaHref = AGENTIC_SETUP_HREF,
}: {
  locale?: Locale;
  // When true, drops the max-width/padding wrapper so it aligns inside an
  // existing container (e.g. the homepage pricing section).
  embedded?: boolean;
  // Where the CTA points. Defaults to the on-page setup anchor; pages without
  // the setup section (e.g. the homepage) pass the pricing page URL + anchor.
  ctaHref?: string;
}) {
  const t = BAND_COPY[locale];

  return (
    <div className={embedded ? "mb-4" : "max-w-[1280px] mx-auto px-5 sm:px-10 mb-4"}>
      <div className="relative rounded-xl border border-warm-100 bg-warm-50 overflow-hidden">
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            left: -80,
            top: -80,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(45,139,109,0.10),transparent 70%)",
          }}
        />
        <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-8 md:gap-10 p-8 md:p-10 items-center">
          {/* Left: identity + bullets */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-mono text-[10.5px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded text-ink"
                style={{ backgroundColor: "#E8B84B" }}
              >
                {t.badge}
              </span>
              <h3 className="text-[22px] font-semibold tracking-[-0.015em] text-ink">
                {t.name}
              </h3>
            </div>
            <p className="text-[15px] leading-[1.55] text-ink-soft max-w-[52ch] mb-5">
              {t.tagline}
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
              {t.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-[14px] text-ink-2 leading-[1.5]"
                >
                  <span className="text-brand font-bold shrink-0">—</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: price + CTA */}
          <div className="md:border-l md:border-warm-100 md:pl-10">
            <div className="flex items-baseline gap-2">
              <span
                className="font-semibold tracking-[-0.035em] leading-none text-ink"
                style={{ fontSize: "clamp(40px, 4.4vw, 52px)" }}
              >
                {t.price}
              </span>
            </div>
            <p className="text-[11.5px] font-mono font-semibold uppercase tracking-[0.06em] text-brand mt-2">
              {t.priceSub}
            </p>
            <p className="text-[12.5px] italic text-ink-soft leading-[1.5] mt-1 mb-5">
              {t.priceNote}
            </p>
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-[14.5px] font-semibold no-underline w-full bg-ink text-white hover:bg-brand transition-colors"
            >
              {t.cta} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const SETUP_COPY = {
  en: {
    eyebrow: "Agentic setup",
    title: "Set up by your AI assistant, in three steps.",
    lede:
      "The Agentic Package is provisioned entirely from your LLM. No dashboard signup, no sales call — your AI agent creates the account and wires the pixel for you.",
    steps: [
      {
        n: "01",
        title: "Add the Sealmetrics MCP",
        p: "Install the Sealmetrics MCP server in Claude Desktop, Codex or any MCP-capable agent.",
      },
      {
        n: "02",
        title: "Ask it to create your account",
        p: "Your agent provisions a Sealmetrics account and generates your tracking pixel — all through the MCP.",
      },
      {
        n: "03",
        title: "Paste the pixel, see real data",
        p: "Drop the pixel on your site (or let your agent do it). Your dashboard fills with 100% cookieless data within minutes.",
      },
    ],
    note: "Self-serve · docs only · no card · free up to 1M human events in total",
  },
  es: {
    eyebrow: "Setup agentic",
    title: "Configurado por tu asistente de IA, en tres pasos.",
    lede:
      "El Agentic Package se aprovisiona por completo desde tu LLM. Sin registro en el dashboard, sin llamada de ventas — tu agente de IA crea la cuenta y deja el píxel listo por ti.",
    steps: [
      {
        n: "01",
        title: "Añade el MCP de Sealmetrics",
        p: "Instala el servidor MCP de Sealmetrics en Claude Desktop, Codex o cualquier agente compatible con MCP.",
      },
      {
        n: "02",
        title: "Pídele que cree tu cuenta",
        p: "Tu agente aprovisiona una cuenta de Sealmetrics y genera tu píxel de tracking — todo a través del MCP.",
      },
      {
        n: "03",
        title: "Pega el píxel y ve datos reales",
        p: "Coloca el píxel en tu web (o deja que lo haga tu agente). Tu dashboard se llena de datos 100% sin cookies en minutos.",
      },
    ],
    note: "Self-serve · solo docs · sin tarjeta · gratis hasta 1M de eventos humanos en total",
  },
} as const;

// On-page "how to set it up" section that the Agentic CTA anchors to.
export function AgenticSetupSteps({ locale = "en" }: { locale?: Locale }) {
  const t = SETUP_COPY[locale];

  return (
    <section className="py-24 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
          <div>
            <span className="eyebrow mb-5">{t.eyebrow}</span>
            <h2 className="h-section mt-5">{t.title}</h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            {t.lede}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {t.steps.map((s) => (
            <article
              key={s.n}
              className="bg-warm-50 border border-warm-100 rounded-xl p-8"
            >
              <span className="font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-brand">
                {s.n}
              </span>
              <h3
                className="font-semibold text-ink tracking-[-0.015em] leading-[1.25] mt-3 mb-3"
                style={{ fontSize: "clamp(18px, 1.9vw, 22px)" }}
              >
                {s.title}
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-ink-soft">{s.p}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 font-mono text-[12px] text-ink-soft uppercase tracking-[0.06em]">
          {t.note}
        </p>
      </div>
    </section>
  );
}
