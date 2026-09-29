import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import "@/app/fonts.css";
import { SealmetricsTracker } from "@/components/analytics/SealmetricsTracker";
import { FontPreloads } from "@/components/layout/FontPreloads";

/* ============================================================
   SHELL RAÍZ COMPARTIDO · LANDINGS DE PAGO
   Las landings viven en grupos de rutas propios para no heredar el
   header de navegación ni el footer del site. Necesitan un grupo por
   idioma porque <html lang> se fija en el layout raíz y no puede
   variar por página: (lp) sirve ES y (lp-en) sirve EN, y ambos
   delegan aquí para no duplicar fuentes, tracker ni metadatos.
   ============================================================ */

export const landingViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0E0C" },
  ],
};

export const landingMetadata: Metadata = {
  metadataBase: new URL("https://sealmetrics.com"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.avif", type: "image/avif" },
      { url: "/favicon.webp", type: "image/webp" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [{ url: "/favicon.webp", sizes: "180x180", type: "image/webp" }],
    shortcut: "/favicon.svg",
  },
};

const SKIP = { es: "Ir al contenido", en: "Skip to content" } as const;

export function LandingRootShell({
  locale,
  children,
}: {
  locale: "es" | "en";
  children: React.ReactNode;
}) {
  return (
    <html lang={locale}>
      <body className="font-sans antialiased" data-design-system="signal-v4">
        <FontPreloads />
        <a href="#main-content" className="skip-to-content">
          {SKIP[locale]}
        </a>
        {/* Se conserva el tracker: estas páginas son justo las que hay que medir. */}
        <SealmetricsTracker />
        {children}
      </body>
    </html>
  );
}
