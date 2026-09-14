import type { Metadata } from "next";
import { blogPosts } from "@/lib/content/blog";
import { JsonLd } from "@/components/ui/JsonLd";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { BlogIndexSignal } from "@/components/v4/BlogIndexSignal";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Blog de analítica sin cookies — Sealmetrics",
  description: "Insights sobre analítica web, calidad de datos, atribución y medición privacy-first.",
  openGraph: {
    title: "Blog de analítica sin cookies — Sealmetrics",
    description: "Insights sobre analítica web, calidad de datos, atribución y medición privacy-first.",
    type: "website",
    images: [ogImage("/es/blog/")],
    url: "https://sealmetrics.com/es/blog/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Blog de analítica sin cookies — Sealmetrics",
    description: "Insights sobre analítica web, calidad de datos, atribución y medición privacy-first.",
    images: [ogImage("/es/blog/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/blog/",
    languages: getAlternatesEs("/blog"),
  },
};

const ES_TRANSLATIONS: Record<string, { title: string; description: string; category: string; readTime: string }> = {
  "best-web-analytics-tool": {
    title: "La mejor herramienta de analítica web: los 12 requisitos que de verdad deciden",
    description: "No es una lista de proveedores. Los 12 requisitos que debe cumplir una plataforma — píxel, tiempo real, dato sin huecos de consentimiento, API, MCP — y cómo verificarlos.",
    category: "Comparativas",
    readTime: "12 min",
  },
  "gdpr-analytics-spain-faq": {
    title: "Analítica RGPD en España: las 7 preguntas que hacen las tiendas online",
    description: "¿Necesita tu tienda un banner de cookies para la analítica? ¿Es legal GA4 en España? ¿Qué permite la AEPD y qué cuesta incumplir la LSSI? Respuestas directas.",
    category: "Regulación",
    readTime: "5 min",
  },
  "is-matomo-gdpr-compliant": {
    title: "¿Matomo cumple el RGPD?",
    description: "Matomo puede operar sin banner en Francia bajo los criterios de la CNIL, con las cookies puestas. Las seis condiciones, lo que esa configuración te cuesta en atribución, y por qué no viaja a Alemania.",
    category: "Regulación",
    readTime: "9 min",
  },
  "gdpr-eprivacy-analytics-legal-assessment": {
    title: "¿Tu analítica cumple de verdad el RGPD? Un análisis legal",
    description: "RGPD y ePrivacy son dos leyes distintas, y la analítica tiene que superar las dos para funcionar sin banner. El test legal y el veredicto por herramienta: GA4, Matomo, Plausible, Piwik PRO y Sealmetrics.",
    category: "Regulación",
    readTime: "9 min",
  },
  "ga4-alternatives-enterprise": {
    title: "7 alternativas a GA4 para equipos de eCommerce en 2026",
    description: "Compara 7 alternativas a GA4 para eCommerce: precio, captura de dato, cumplimiento UE y features. De GA360 a plataformas cookieless.",
    category: "Comparativas",
    readTime: "10 min",
  },
  "self-service-analytics-lens-ai": {
    title: "Cómo Sealmetrics habilita la analítica self-service con LENS AI",
    description: "Apunta un LLM a datos incompletos de GA4 y se inventa las respuestas. Cómo el dato cookieless completo más el MCP de Sealmetrics permiten consultar tu propia analítica.",
    category: "IA y Analítica",
    readTime: "10 min",
  },
  "cookieless-analytics-explained": {
    title: "Analítica cookieless explicada: cómo medir sin cookies",
    description: "Las cookies están desapareciendo. Cómo funciona la analítica cookieless, por qué captura más data y qué implica para RGPD.",
    category: "Tecnología",
    readTime: "8 min",
  },
  "consent-banner-impact-on-analytics": {
    title: "Cómo los banners de consentimiento destruyen tus datos",
    description: "55% de los visitantes UE rechaza cookies. 65% acepta solo en la segunda página. El impacto real sobre atribución y revenue.",
    category: "Calidad del dato",
    readTime: "6 min",
  },
  "ga4-data-sampling-problem": {
    title: "Muestreo de datos en GA4: por qué tus números están mal",
    description: "GA4 aplica muestreo cuando el tráfico supera ciertos umbrales. Cómo funciona, por qué importa y qué puedes hacer.",
    category: "Calidad del dato",
    readTime: "7 min",
  },
  "why-ga4-shows-13pct-eu-traffic": {
    title: "Por qué GA4 muestra el 13% de tu tráfico UE",
    description: "GA4 pierde dato en tres niveles: rechazo de consentimiento, ad blockers y restricciones de navegador. Aquí están las cuentas.",
    category: "Calidad del dato",
    readTime: "8 min",
  },
  "gdpr-analytics-without-consent": {
    title: "Analítica conforme con RGPD sin banners de consentimiento",
    description: "Hacer analítica sin banners es legalmente posible. Base jurídica RGPD, criterios CNIL y requisitos técnicos.",
    category: "Regulación",
    readTime: "7 min",
  },
  // Serie Seal AI (17 posts)
  "meet-seal-ai": {
    title: "Te presentamos Seal AI: el asistente de analítica que nunca envía tus datos a Estados Unidos",
    description: "Pregunta a tu analítica en lenguaje natural y recibe respuestas ancladas en tus datos, con una inferencia que se ejecuta solo en la UE, no guarda nada y no entrena el modelo de nadie. Así funciona Seal AI y por qué es privada por arquitectura, no por promesa.",
    category: "Producto",
    readTime: "5 min",
  },
  "residency-is-not-sovereignty": {
    title: "Residencia no es soberanía: la pregunta que debes hacerle a tu proveedor de analítica con IA",
    description: "Un centro de datos europeo no convierte a tu proveedor de IA en europeo. El CLOUD Act estadounidense sigue a la empresa, no al servidor. Así se distingue lo uno de lo otro, y por qué eso decide hasta dónde se puede llegar a tus datos.",
    category: "Privacidad",
    readTime: "6 min",
  },
  "best-llm-for-data-analytics": {
    title: "El mejor LLM para analítica de datos no es el que puntúa más alto en los benchmarks",
    description: "Ejecutamos 162 consultas en vivo con tres modelos abiertos sobre datos de analítica reales para elegir la IA que va dentro de Sealmetrics. Lo que lo decidió no fue MMLU: fue el tool-calling, el grounding y un fallo de seguridad que solo apareció en un idioma.",
    category: "IA",
    readTime: "7 min",
  },
  "audit-your-analytics-ai-privacy": {
    title: "Cómo auditar si la IA de tu analítica es realmente privada (checklist de 5 preguntas)",
    description: "Cinco preguntas que cualquier marketer o DPO puede plantear a un proveedor de analítica con IA: quién es dueño de la inferencia, dónde se ejecuta, qué se conserva, qué entrena y si puedes marcharte. Con las respuestas que deberían tranquilizarte y las que no.",
    category: "Privacidad",
    readTime: "7 min",
  },
  "analytics-if-data-privacy-framework-falls": {
    title: "Qué pasa con tu analítica si cae el Marco de Privacidad de Datos UE-EE. UU.",
    description: "El Marco de Privacidad de Datos superó su primer recurso, tiene un recurso de casación pendiente ante el TJUE y otra impugnación anunciada en 2026. Estas son las configuraciones de analítica e IA que habría que volver a documentar de la noche a la mañana y las que nunca dependieron de él.",
    category: "Regulación",
    readTime: "6 min",
  },
  "the-prompt-is-born-clean": {
    title: "El prompt nace limpio: por qué la analítica sin consentimiento hace sencilla la IA privada",
    description: "Casi todo el trabajo de privacidad en IA es control de daños sobre datos que ya eran personales de origen. Si tu analítica nunca recogió una IP, una cookie ni un identificador de visitante, no hay nada personal que enmascarar antes de que el modelo lo vea.",
    category: "Privacidad",
    readTime: "5 min",
  },
  "eu-ai-act-for-marketers": {
    title: "El Reglamento Europeo de IA para marketers, sin jerga",
    description: "La mayoría de los equipos de marketing son responsables del despliegue de una IA de riesgo limitado, no proveedores. Eso significa una obligación principal — la transparencia del artículo 50 desde el 2 de agosto de 2026 — y muchos deberes que se quedan aguas arriba, en quien publica el modelo.",
    category: "Regulación",
    readTime: "7 min",
  },
  "we-changed-our-ai-model-twice": {
    title: "Cambiamos de modelo de IA dos veces en tres semanas — y ese es justo el punto",
    description: "La trazabilidad completa del modelo que hay detrás de Seal AI: por qué Gemma 4 falló en el tool-calling, por qué Mistral Small 3.2 acabó con los bucles pero no con las respuestas pobres, y por qué ganó gpt-oss-120b. Dos cambios en tres semanas no son inestabilidad: son la prueba de que alguien está midiendo.",
    category: "IA",
    readTime: "6 min",
  },
  "how-we-benchmark-our-own-ai": {
    title: "Cómo hacemos el benchmark de nuestra propia IA (y por qué publicamos las tandas que descartamos)",
    description: "Una metodología copiable para evaluar un LLM sobre tu propio producto: stack real, verdad de referencia calculada en vivo desde la base de datos, evaluadores deterministas antes que cualquier juez LLM, trampas adversarias, intervalos de confianza de Wilson — y la tanda que descartamos, publicada entera.",
    category: "IA",
    readTime: "8 min",
  },
  "our-ai-got-it-wrong-in-production": {
    title: "Nuestra IA se equivocó en producción — y lo cazó nuestro propio test",
    description: "Un modelo devolvió un gráfico cuya clave del eje Y era una lista en lugar de un string. La validación estricta del esquema lo rechazó y toda la respuesta del chat se cayó con un HTTP 500, por un gráfico decorativo. El bug, el arreglo en dos capas y tres reglas para quien publique salida estructurada de un LLM.",
    category: "IA",
    readTime: "6 min",
  },
  "prompt-injection-is-language-dependent": {
    title: "El fallo de seguridad que solo aparece si pruebas tu IA en dos idiomas",
    description: "Un modelo que ignora una instrucción inyectada en español puede obedecer esa misma instrucción en inglés. Lo encontramos en nuestro propio benchmark, y es la razón por la que una evaluación monolingüe no puede certificar que un modelo sea seguro.",
    category: "IA",
    readTime: "6 min",
  },
  "rival-model-as-judge": {
    title: "Por qué dejamos que un modelo rival puntúe nuestro benchmark",
    description: "Los jueces LLM favorecen a su propia familia. Así que nombramos juez al candidato que perdió, a temperatura cero, y dejamos toda la puntuación objetiva en código determinista. Así se usa el LLM-as-a-judge sin engañarse a uno mismo.",
    category: "IA",
    readTime: "5 min",
  },
  "public-llm-benchmarks-vs-your-use-case": {
    title: "Los benchmarks públicos de LLM no te dicen qué modelo poner en producción",
    description: "MMLU mide conocimiento en aislamiento. Tu producto necesita tool-calling, seguimiento de instrucciones y grounding bajo carga real. Qué miden de verdad las cifras públicas, cómo leer su letra pequeña y un método en cinco pasos para probar un modelo sobre tu propia carga de trabajo.",
    category: "IA",
    readTime: "7 min",
  },
  "grounding-analytics-ai": {
    title: "Grounding: por qué una buena IA de analítica no debe saber nada, sino consultar",
    description: "Un chatbot responde con lo que memorizó. Un asistente de analítica debe responder solo con datos consultados en el momento. Esa diferencia es una arquitectura, no un prompt — y es la razón por la que un modelo con poca memoria factual puede ser el adecuado para leer tus números.",
    category: "IA",
    readTime: "6 min",
  },
  "open-weights-exit-strategy": {
    title: "Pesos abiertos como estrategia de salida: no ser rehén de tu proveedor de IA",
    description: "Con una API cerrada alquilas un comportamiento que no puedes inspeccionar, que puede cambiar bajo tus pies sin avisar y a un precio que fija otro. Los pesos abiertos no son una ideología: son la capacidad de irte. Y una garantía de privacidad de la que no puedes marcharte no es una garantía.",
    category: "IA",
    readTime: "6 min",
  },
  "seal-ai-vs-bring-your-own-key": {
    title: "Seal AI o clave propia (BYOK): cuándo usar cada opción",
    description: "Seal AI es la opción por defecto: nada que configurar, inferencia solo en la UE, cero retención y cubierta por tu plan. La clave propia (BYOK) te da elección de modelo y te traspasa el análisis de transferencia internacional, el coste y la gestión de la clave. Guía honesta para elegir.",
    category: "Producto",
    readTime: "5 min",
  },
  "three-questions-to-ask-seal-ai": {
    title: "Tres preguntas que hacerle hoy a tu IA de analítica",
    description: "Tres ejemplos resueltos para un asistente de analítica con IA: una comparación de periodos, un desglose con razonamiento y una pregunta de interacción. Qué preguntar, qué pasa por dentro y cómo comprobar que la respuesta salió de tus datos.",
    category: "Producto",
    readTime: "4 min",
  },
};

const ES_TRANSLATED_SLUGS = new Set(Object.keys(ES_TRANSLATIONS));

export default function Page() {
  const posts = blogPosts
    .filter((p) => !p.draft)
    .map((p) => {
      const t = ES_TRANSLATIONS[p.slug];
      if (!t) return p;
      return { ...p, title: t.title, description: t.description, category: t.category, readTime: t.readTime };
    });
  return (
    <>
      <JsonLd data={collectionPageSchema({ name: "Blog", description: "Insights sobre analítica web, calidad de datos y medición privacy-first.", url: "/es/blog" })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: posts.map((post, i) => ({
          "@type": "ListItem", position: i + 1,
          url: ES_TRANSLATED_SLUGS.has(post.slug)
            ? `https://sealmetrics.com/es/blog/${post.slug}/`
            : `https://sealmetrics.com/blog/${post.slug}/`,
          name: post.title,
        })),
      }} />

      <BlogIndexSignal locale="es" posts={posts} translatedSlugs={Array.from(ES_TRANSLATED_SLUGS)} />
    </>
  );
}
