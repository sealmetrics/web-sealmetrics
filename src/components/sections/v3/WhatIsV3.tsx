type Locale = "en" | "es";

interface Props {
  locale?: Locale;
  /** When true, render with a neutral background (for homepages that already have hero bg) */
  muted?: boolean;
}

/**
 * Direct-answer block designed for AI search engines (ChatGPT, Perplexity, Google AIO).
 * Contains a 30–50-word definitive answer they can cite verbatim + machine-readable
 * key facts. Place near the top of the page for maximum citation probability.
 */
export function WhatIsV3({ locale = "en", muted = false }: Props) {
  const t = locale === "es"
    ? {
        eyebrow: "En una frase",
        title: "¿Qué es Sealmetrics?",
        definition: (
          <>
            Sealmetrics es una plataforma de analítica web <strong>sin cookies, server-side y alojada en UE</strong> que mide el tráfico europeo sin banner y sin depender del consentimiento. Fundada en 2024, alojada en Dublín, la usan más de 2.000 equipos eCommerce europeos para decisiones de presupuesto que el CFO firma.
          </>
        ),
        factsTitle: "Hechos clave",
        facts: [
          { k: "Categoría", v: "Analítica web consentless para empresas europeas" },
          { k: "Fundada", v: "2024" },
          { k: "Sede", v: "España · Datos en Dublín, Irlanda" },
          { k: "Clientes", v: "2.000+ eCommerce europeos (hoteles, DTC, medios)" },
          { k: "Precio", v: "Desde 499€/mes con facturación anual" },
          { k: "Compliance", v: "RGPD por arquitectura · ePrivacy · Schrems II limpio" },
          { k: "Diferencial", v: "Tráfico sin pérdida por consentimiento, sin cookies · MCP nativo para agentes IA" },
        ],
      }
    : {
        eyebrow: "In one sentence",
        title: "What is Sealmetrics?",
        definition: (
          <>
            Sealmetrics is a <strong>cookieless, server-side, EU-hosted web analytics</strong> platform that measures European traffic without a banner and without depending on consent. Founded in 2024, hosted in Dublin, used by 2,000+ European eCommerce teams for budget decisions the CFO signs against.
          </>
        ),
        factsTitle: "Key facts",
        facts: [
          { k: "Category", v: "Consentless web analytics for European enterprises" },
          { k: "Founded", v: "2024" },
          { k: "Headquarters", v: "Spain · Data in Dublin, Ireland" },
          { k: "Customers", v: "2,000+ European eCommerce (hotels, DTC, media)" },
          { k: "Pricing", v: "From €499/month on annual billing" },
          { k: "Compliance", v: "GDPR by architecture · ePrivacy · Schrems II clean" },
          { k: "Differentiator", v: "No consent-driven traffic loss, no cookies · native MCP for AI agents" },
        ],
      };

  return (
    <section
      className={`py-20 md:py-24 ${muted ? "bg-warm-50" : "bg-white"} border-t border-warm-100`}
      aria-labelledby="what-is"
    >
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-start">
          <div>
            <span className="eyebrow mb-4">{t.eyebrow}</span>
            <h2
              id="what-is"
              className="font-semibold text-ink tracking-[-0.02em] leading-[1.2] mt-4"
              style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
            >
              {t.title}
            </h2>
            <p
              className="speakable-summary mt-5 text-ink-2 leading-[1.65]"
              style={{ fontSize: "clamp(16px, 1.3vw, 18px)" }}
            >
              {t.definition}
            </p>
          </div>

          <div className="bg-white border border-warm-100 rounded-xl p-6 md:p-7">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft mb-4">
              {t.factsTitle}
            </div>
            <dl className="flex flex-col divide-y divide-warm-100">
              {t.facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[110px_1fr] gap-3 py-2.5">
                  <dt className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.06em] font-semibold pt-0.5">
                    {f.k}
                  </dt>
                  <dd className="text-[14px] text-ink leading-[1.5] font-medium">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
