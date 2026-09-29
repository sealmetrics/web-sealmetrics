import { preload } from "react-dom";

/**
 * Preload the two faces every page paints first — Onest and JetBrains Mono, latin
 * range — as next/font did when it served them. The other ranges (latin-ext, symbols,
 * cyrillic…) load on demand through their `unicode-range` in `src/app/fonts.css`.
 *
 * `preload()` rather than two <link> elements: React 19 emits a rendered
 * <link rel="preload"> twice, once as a resource hint and once as the element.
 */
export function FontPreloads() {
  preload("/fonts/onest-latin.woff2", { as: "font", type: "font/woff2", crossOrigin: "" });
  preload("/fonts/jetbrains-mono-latin.woff2", { as: "font", type: "font/woff2", crossOrigin: "" });
  return null;
}
