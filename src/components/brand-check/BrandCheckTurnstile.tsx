"use client";

import { Turnstile } from "@marsidev/react-turnstile";

/**
 * The one Turnstile challenge left on the relay (the lead forms dropped theirs on
 * 1 Oct 2026). The brand check is free, needs no email and every new check is paid
 * for in Enroutia, so it keeps a challenge on top of the per-IP limit and
 * Enroutia's 300-a-day cap. The Worker checks the action, so it is the check's own.
 */
const SITE_KEY = process.env.NEXT_PUBLIC_BRAND_CHECK_TURNSTILE_SITE_KEY ?? "";

export function BrandCheckTurnstile({
  onToken,
  resetKey = 0,
  locale = "en",
}: {
  onToken: (token: string | null) => void;
  resetKey?: number;
  locale?: "en" | "es";
}) {
  if (!SITE_KEY) {
    return (
      <p role="alert" className="sig-brand-error">
        {locale === "es"
          ? "La verificación de seguridad no está disponible. Inténtalo de nuevo en unos minutos."
          : "Security verification is unavailable. Please try again in a few minutes."}
      </p>
    );
  }

  return (
    <Turnstile
      key={resetKey}
      siteKey={SITE_KEY}
      options={{ action: "sealmetrics_brand_check", theme: "light", language: locale }}
      onSuccess={(token) => onToken(token)}
      onExpire={() => onToken(null)}
      onError={() => onToken(null)}
    />
  );
}
