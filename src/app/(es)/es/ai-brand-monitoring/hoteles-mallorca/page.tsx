import type { Metadata } from "next";
import { SectorReportSignal, type SectorCopy } from "@/components/v4/SectorReportSignal";
import { JsonLd } from "@/components/ui/JsonLd";
import { hotelesMallorca } from "@/lib/content/sector-reports";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-monitoring-signal.css";
import "@/components/v4/sector-report.css";

const path = "/es/ai-brand-monitoring/hoteles-mallorca/";
const url = `https://sealmetrics.com${path}`;
const title = "Qué hoteles de Mallorca recomiendan las IA";
const description =
  "Preguntamos a dieciséis modelos de IA por hoteles en Mallorca sin nombrar ninguno. A quién recomiendan, a quién olvidan y qué se inventan.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    images: [ogImage(path)],
    url,
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title,
    description,
    images: [ogImage(path)],
  },
  alternates: { canonical: url },
};

const t: SectorCopy = {
  breadcrumb: "Hoteles en Mallorca",
  eyebrow: "Estudio · 23 de septiembre de 2026 · sin búsqueda web",
  h1: (
    <>
      Pedimos a dieciséis IA
      <br />
      un hotel en Mallorca.
      <br />
      <em>Casi siempre dicen los mismos.</em>
    </>
  ),
  heroBody:
    "Hicimos cuatro preguntas de viajero, sin nombrar ningún hotel ni ninguna cadena, a dieciséis modelos: trece abiertos, GPT-5.6, Claude Sonnet 5 y Claude Opus 5.5. Es lo que contesta un asistente cuando alguien planea sus vacaciones antes de abrir un buscador.",
  download: {
    label: "Recibe el informe completo",
    meta: "PDF · las 64 respuestas literales",
    title: (
      <>
        Cada respuesta,
        <br />
        <em>modelo a modelo.</em>
      </>
    ),
    body: "El resumen, los errores y lo que contestó cada uno de los dieciséis modelos a las cuatro preguntas, tal como lo dijo. Te lo mandamos al correo en PDF.",
  },
  stats: [
    ["10 / 16", "nombran Cap Rocat cuando pides un hotel en Mallorca, sin más"],
    ["14 / 16", "recomiendan algún Iberostar cuando viajas con niños"],
    ["11 / 64", "respuestas recomiendan un hotel de otro sitio, o uno que no existe"],
  ],
  contrastTag: "Lo que más nos sorprendió",
  contrastTitle: (
    <>
      Que te conozca
      <br />
      <em>no es que te recomiende.</em>
    </>
  ),
  contrastBody:
    "Meliá es la cadena que casi todos los modelos citan cuando les preguntas por cadenas. Pero cuando pides un hotel concreto para reservar, sus hoteles apenas aparecen. Con Zafiro pasa lo contrario: casi ningún modelo la nombra como cadena, y sus hoteles salen en una de cada cinco respuestas.",
  contrastHeads: ["Cadena", "La citan como cadena", "Recomiendan uno de sus hoteles"],
  questionsTag: "Las cuatro preguntas",
  questionsTitle: (
    <>
      A quién nombra cada modelo,
      <br />
      <em>pregunta a pregunta.</em>
    </>
  ),
  questionsBody:
    "Cada barra cuenta cuántos modelos nombran ese hotel o esa cadena, sobre los que dieron una respuesta. Un modelo cuenta una vez aunque nombre dos hoteles de la misma cadena.",
  errorsTag: "Lo que se inventan",
  errorsTitle: (
    <>
      Siete errores que un viajero
      <br />
      <em>se habría creído.</em>
    </>
  ),
  errorsBody:
    "Un hotel de Madrid, otro de Corfú, otro de Tenerife y otro de Ibiza, recomendados como si estuvieran en Mallorca. Un jardín botánico de la Costa Brava. Y un hotel que no existe, al que el mismo modelo pone en dos sitios distintos. Si tu hotel está en la respuesta equivocada, o no está, alguien está reservando otro.",
  formTag: "¿Y tu hotel?",
  formTitle: (
    <>
      Mira qué dicen
      <br />
      <em>de tu hotel o tu cadena.</em>
    </>
  ),
  formBody:
    "El mismo estudio, sobre tu marca: quince modelos, seis preguntas, cada respuesta literal y los errores marcados. Gratis, sin cuenta, en tu correo en unos minutos.",
  formFoot: "Seis preguntas · quince modelos · unos cinco minutos",
  limitsTag: "Cómo lo medimos",
  limitsTitle: (
    <>
      Dicho claro,
      <br />
      <em>para que la cifra signifique algo.</em>
    </>
  ),
  limits: [
    "Memoria del modelo, sin búsqueda web. No es lo que contesta ChatGPT navegando, que usa fuentes en vivo y cambia por otros motivos.",
    "Una ejecución por modelo y pregunta, el 23 de septiembre de 2026: dieciséis modelos por cuatro preguntas, 64 respuestas. A diez de ellas, de modelos pequeños que se quedaban razonando sin llegar a contestar, se les repitió la pregunta limitando el razonamiento. Son las que más se inventan, y el informe completo las marca.",
    "Cada cifra lleva su denominador. Las de hoteles concretos cuentan las 48 respuestas de las tres primeras preguntas.",
    "Contamos menciones literales, revisadas a mano. No es una clasificación de calidad hotelera, ni de reservas, ni de precios.",
  ],
  proof: {
    tag: "Medido en grupos hoteleros",
    title: (
      <>
        Lo que ya miden
        <br />
        <em>dos grupos hoteleros.</em>
      </>
    ),
    body: "Dos grupos hoteleros usan Sealmetrics junto a su stack actual. Palladium, como la referencia que aceptan marca, departamentos y agencias. Dreamplace, tras casi dos años, para mover presupuesto de paid media contrastado con el total de su CRM.",
    quote: {
      text: "Los datos que da Sealmetrics son agnósticos, no están sesgados y son neutrales. No hay caja negra.",
      cite: "Toni Andújar · Director Digital y Venta Directa · Palladium Hotel Group",
    },
    figures: [
      { value: "35%", label: "de las reservas que registraba GA4 no tenía canal", client: "Palladium Hotel Group", href: "/es/case-studies/palladium-hotel-group/" },
      { value: "+165%", label: "de mejora del Coste por Búsqueda de Display tras rehacer el modelo de DV360", client: "Palladium Hotel Group", href: "/es/case-studies/palladium-hotel-group/" },
      { value: "15–20%", label: "más ventas atribuidas que la herramienta anterior, contra el total del CRM", client: "Dreamplace Hotels", href: "/es/case-studies/dreamplace-hotels/" },
    ],
    readCase: "Leer el caso",
  },
  finalTitle: (
    <>
      Que la IA te recomiende es una cosa.
      <br />
      <em>Lo que te reserva es otra.</em>
    </>
  ),
  finalBody:
    "Sealmetrics mide las visitas y las reservas que llegan desde ChatGPT, Perplexity y otros asistentes, sin depender del consentimiento de cookies. Si la IA ya te manda viajeros, conviene saber cuántos y qué reservan.",
  finalCta: "Pide una demo",
  finalSecondary: "Cómo medimos el tráfico que llega desde la IA",
};

export default function PaginaHotelesMallorca() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Monitorización de marca en IA", url: "/es/ai-brand-monitoring" },
          { name: "Hoteles en Mallorca", url: "/es/ai-brand-monitoring/hoteles-mallorca" },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: title,
          description,
          datePublished: hotelesMallorca.datePublished,
          url: "/es/ai-brand-monitoring/hoteles-mallorca",
          category: "Estudios de IA por sector",
        })}
      />
      <SectorReportSignal report={hotelesMallorca} t={t} />
    </>
  );
}
