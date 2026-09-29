"use client";

import { Turnstile } from "@marsidev/react-turnstile";

const SITE_KEY = process.env.NEXT_PUBLIC_LEAD_TURNSTILE_SITE_KEY ?? "";

export function LeadTurnstile({
  onToken,
  onFail,
  resetKey = 0,
  locale = "en",
}: {
  onToken: (token: string | null) => void;
  /** Cloudflare could not verify the visitor. The widget shows nothing the form can
   *  read, so without this a refused person is indistinguishable from an idle one. */
  onFail?: () => void;
  resetKey?: number;
  locale?: "en" | "es";
}) {
  if (!SITE_KEY) {
    return (
      <p role="alert" className="text-sm text-red-alert">
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
      options={{ action: "sealmetrics_lead", theme: "light" }}
      onSuccess={(token) => onToken(token)}
      onExpire={() => onToken(null)}
      onError={() => {
        onToken(null);
        onFail?.();
      }}
    />
  );
}
