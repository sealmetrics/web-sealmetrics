import type { Metadata } from "next";
import { LogosStripEs } from "@/components/sections/v3/HomeV3Es";
import { LandingHeader, LandingFooter } from "@/components/landing/LandingChrome";
import {
  Hero,
  Symptoms,
  RoasMath,
  Mechanism,
  WhatWeDo,
  Proof,
  PrivacyByDesign,
  Tradeoff,
  Machine,
  Implementation,
  UseCases,
  PriceDoors,
  Close,
} from "@/components/landing/RoasRealSections";
import { ogImage } from "@/lib/seo/og";

/* Landing de conversión para tráfico frío de pago (eCommerce ES).
   noindex/follow por decisión: no targetea keyword, no tiene enlaces
   entrantes internos y competiría con /es/ y /es/consentless-analytics.
   Al ir fuera del índice queda exenta de las reglas de cluster e
   interlinking — una sola decisión por página.

   Vive en el grupo (lp) para no heredar el header de navegación ni el
   footer del site: en tráfico de pago cada enlace de salida es una fuga. */
export const metadata: Metadata = {
  title: "Tu ROAS real es mayor del que crees — Sealmetrics",
  description:
    "En nuestra experiencia con clientes, entre el 40% y el 60% del tráfico rechaza las cookies. Mide sin esa pérdida y recupera el ROAS que ya generabas.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Tu ROAS real es mayor del que crees",
    description:
      "En nuestra experiencia con clientes, entre el 40% y el 60% rechaza las cookies y el 40% de quien acepta lo hace tarde. Tu informe no ve esas ventas.",
    type: "website",
    locale: "es_ES",
    images: [ogImage("/es/roas-real/")],
    url: "https://sealmetrics.com/es/roas-real/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Tu ROAS real es mayor del que crees",
    description: "En nuestra experiencia con clientes, entre el 40% y el 60% rechaza las cookies y el 40% de quien acepta lo hace tarde. Tu informe no ve esas ventas.",
    images: [ogImage("/es/roas-real/")],
  },
  alternates: { canonical: "https://sealmetrics.com/es/roas-real/" },
};

export default function RoasRealPage() {
  return (
    <>
      <LandingHeader ctaHref="/es/audit/" ctaLabel="Auditoría gratuita" />
      <main id="main-content">
        <Hero />
        <Symptoms />
        {/* La prueba social va justo detrás del síntoma: quien se reconoce en
            las tres frases necesita ver acto seguido quién más lo tenía. */}
        <LogosStripEs />
        <RoasMath />
        <Mechanism />
        <WhatWeDo />
        <Proof />
        <PrivacyByDesign />
        <Tradeoff />
        <Machine />
        <Implementation />
        <UseCases />
        <PriceDoors />
        <Close />
      </main>
      <LandingFooter locale="es" />
    </>
  );
}
