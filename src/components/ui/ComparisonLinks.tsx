import Link from "next/link";

type Locale = "en" | "es";

interface ComparisonItem {
  href: string;
  label: string;
  blurb: string;
  tag: string;
}

const CONTENT: Record<
  Locale,
  { eyebrow: string; title: string; lede: string; items: ComparisonItem[] }
> = {
  en: {
    eyebrow: "Run the list against a real platform",
    title: "Sealmetrics compared, one requirement at a time",
    lede: "Each comparison takes the checklist to a specific incumbent — same criteria, different architecture. The requirement each one turns on is tagged below.",
    items: [
      {
        href: "/vs-ga4/",
        label: "Sealmetrics vs GA4",
        blurb: "The free default, and the 60% of EU sessions it never sees.",
        tag: "Req 2 · data without consent gaps",
      },
      {
        href: "/vs/ga360/",
        label: "Sealmetrics vs GA360",
        blurb: "A quote-based contract buys unsampled reports — on the same cookie-dependent collection.",
        tag: "Req 12 · price per accurate data point",
      },
      {
        href: "/vs/adobe-analytics/",
        label: "Sealmetrics vs Adobe Analytics",
        blurb: "The deepest segmentation in the market, on ~170 KB of tag and a 3–6 month implementation.",
        tag: "Req 1 · pixel weight",
      },
      {
        href: "/vs/piwik-pro/",
        label: "Sealmetrics vs Piwik PRO",
        blurb: "EU-native and privacy-positioned, but still asking for consent.",
        tag: "Req 11 · compliance by architecture",
      },
      {
        href: "/vs/matomo/",
        label: "Sealmetrics vs Matomo",
        blurb: "Open source and self-hostable — what its cookieless mode gives up.",
        tag: "Req 4 · analyst questions",
      },
      {
        href: "/alternatives/google-analytics/",
        label: "Google Analytics alternatives",
        blurb: "The full category, scored on the same criteria.",
        tag: "All 12 requirements",
      },
    ],
  },
  es: {
    eyebrow: "Pasa la lista por una plataforma real",
    title: "Sealmetrics comparado, requisito a requisito",
    lede: "Cada comparativa lleva la checklist a un competidor concreto — mismos criterios, arquitectura distinta. Debajo va etiquetado el requisito sobre el que pivota cada una.",
    items: [
      {
        href: "/es/vs-ga4/",
        label: "Sealmetrics vs GA4",
        blurb: "El estándar gratuito, y el 60% de sesiones UE que nunca ve.",
        tag: "Req 2 · dato sin huecos de consentimiento",
      },
      {
        href: "/es/vs/ga360/",
        label: "Sealmetrics vs GA360",
        blurb: "Un contrato por presupuesto compra informes sin muestreo — sobre la misma recogida dependiente de cookies.",
        tag: "Req 12 · precio por dato fiable",
      },
      {
        href: "/es/vs/adobe-analytics/",
        label: "Sealmetrics vs Adobe Analytics",
        blurb: "La segmentación más profunda del mercado, sobre ~170 KB de etiqueta y una implantación de 3 a 6 meses.",
        tag: "Req 1 · peso del píxel",
      },
      {
        href: "/es/vs/piwik-pro/",
        label: "Sealmetrics vs Piwik PRO",
        blurb: "Nativo europeo y posicionado en privacidad, pero sigue pidiendo consentimiento.",
        tag: "Req 11 · cumplimiento por arquitectura",
      },
      {
        href: "/es/vs/matomo/",
        label: "Sealmetrics vs Matomo",
        blurb: "Open source y autoalojable — a qué renuncia su modo cookieless.",
        tag: "Req 4 · preguntas de analista",
      },
      {
        href: "/es/alternatives/google-analytics/",
        label: "Alternativas a Google Analytics",
        blurb: "La categoría completa, puntuada con los mismos criterios.",
        tag: "Los 12 requisitos",
      },
    ],
  },
};

export function ComparisonLinks({ locale = "en" }: { locale?: Locale }) {
  const { eyebrow, title, lede, items } = CONTENT[locale];

  return (
    <section className="mt-16">
      <div
        className="relative overflow-hidden rounded-[20px] bg-ink px-6 py-12 sm:px-10 sm:py-14"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 12% 0%, rgba(45,139,109,0.30) 0%, rgba(45,139,109,0) 58%)",
        }}
      >
        <span className="inline-block rounded-full border border-white/15 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-white/60">
          {eyebrow}
        </span>
        <h2 className="mt-5 font-serif text-[1.75rem] font-medium leading-[1.15] text-white">
          {title}
        </h2>
        <p className="mt-4 max-w-[62ch] text-[0.95rem] leading-[1.75] text-white/65">
          {lede}
        </p>

        <ul className="mt-9 grid list-none gap-3 p-0 sm:grid-cols-2">
          {items.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group flex h-full flex-col rounded-[14px] border border-white/10 bg-white/[0.04] p-5 no-underline transition-colors hover:border-white/25 hover:bg-white/[0.07]"
              >
                <span className="inline-flex w-fit rounded-full bg-amber/15 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.05em] text-amber">
                  {c.tag}
                </span>
                <span className="mt-3 flex items-center gap-2 text-[1rem] font-medium text-white">
                  {c.label}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5"
                  >
                    <path
                      d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="mt-1.5 text-[0.85rem] leading-[1.6] text-white/55">
                  {c.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
