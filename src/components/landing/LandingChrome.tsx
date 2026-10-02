import Link from "next/link";
import { Picture } from "@/components/ui/Picture";

/* ============================================================
   CHROME MÍNIMO PARA LANDINGS DE PAGO
   Ni navegación ni enlaces de salida: la página tiene una sola
   decisión y el header del site ofrecía seis menús que competían
   con ella. Se conserva marca (logo), el CTA y el mínimo legal
   que exigen las plataformas de anuncios.
   ============================================================ */

export function LandingHeader({ ctaHref, ctaLabel }: { ctaHref: string; ctaLabel: string }) {
  return (
    <header className="sticky top-0 z-50 bg-warm-white/90 backdrop-blur-xl border-b border-warm-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 flex items-center justify-between h-16">
        {/* El logo no enlaza: en una landing de pago, volver a la home es una fuga. */}
        <Picture
          src="/logos/logo-sealmetrics.svg"
          alt="Sealmetrics"
          width={157}
          height={28}
          className="h-7 w-auto"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-white rounded-md text-[14px] font-semibold no-underline hover:bg-brand transition-colors"
        >
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}

/* El mínimo legal no es decorativo: Google Ads y Meta rechazan destinos sin
   política de privacidad accesible. */
const FOOTER = {
  es: {
    // No hay /es/privacy/: la política vive solo en /privacy/. Apuntar al ES
    // inexistente devolvía un 404 justo en el enlace que Ads y Meta exigen.
    privacy: { label: "Privacidad", href: "/privacy/" },
    terms: { label: "Términos", href: "/es/terms/" },
    badges: "RGPD · ePrivacy · LSSI-CE",
  },
  en: {
    privacy: { label: "Privacy", href: "/privacy/" },
    terms: { label: "Terms", href: "/terms/" },
    badges: "GDPR · ePrivacy",
  },
} as const;

export function LandingFooter({ locale = "es" }: { locale?: "es" | "en" }) {
  const t = FOOTER[locale];
  return (
    <footer className="bg-warm-900 py-9">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 flex flex-wrap gap-x-8 gap-y-4 justify-between items-center">
        <span className="text-[14px] text-dark-text-secondary">
          Sealmetrics · Esfera Marketing SL · Barcelona
        </span>
        <div className="flex flex-wrap gap-6 items-center">
          <Link
            href={t.privacy.href}
            className="text-[14px] text-dark-text-secondary no-underline hover:text-white transition-colors"
          >
            {t.privacy.label}
          </Link>
          <Link
            href={t.terms.href}
            className="text-[14px] text-dark-text-secondary no-underline hover:text-white transition-colors"
          >
            {t.terms.label}
          </Link>
          <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-dark-text-secondary">
            {t.badges}
          </span>
        </div>
      </div>
    </footer>
  );
}
