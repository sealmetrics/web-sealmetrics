import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import { getAlternates } from "@/lib/i18n/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqSection } from "@/components/ui/FaqSection";
import {
  articleSchema,
  breadcrumbSchema,
  definedTermSchema,
  faqPageSchema,
  speakableWebPageSchema,
} from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";

const SLUG = "seal-ai-vs-bring-your-own-key";
const URL = `/es/blog/${SLUG}`;
const TITLE = "Seal AI o clave propia (BYOK): cuándo usar cada opción";
const DESCRIPTION =
  "Seal AI es la opción por defecto: nada que configurar, inferencia solo en la UE, cero retención y cubierta por tu plan. La clave propia (BYOK) te da elección de modelo y te traspasa el análisis de transferencia internacional, el coste y la gestión de la clave. Guía honesta para elegir.";

export const metadata: Metadata = {
  title: TITLE,
  description: "Seal AI: nada que configurar, inferencia solo en la UE, cero retención. BYOK: eliges modelo y asumes el análisis de transferencia y el coste. Cómo elegir.",
  openGraph: {
    title: "Seal AI o clave propia (BYOK)",
    description:
      "¿IA gestionada solo en la UE o tu propia clave de OpenAI, Anthropic, Gemini o DeepSeek? Qué te cuesta realmente cada opción y cómo elegir.",
    type: "article",
    url: "https://sealmetrics.com/es/blog/seal-ai-vs-bring-your-own-key/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: ["https://sealmetrics.com/og/blog/seal-ai-vs-bring-your-own-key.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Seal AI o clave propia (BYOK)",
    description: "¿IA gestionada solo en la UE o tu propia clave de OpenAI, Anthropic, Gemini o DeepSeek? Qué te cuesta realmente cada opción y cómo elegir.",
    images: ["https://sealmetrics.com/og/blog/seal-ai-vs-bring-your-own-key.png"],
  },
  alternates: {
    languages: getAlternates(`/blog/${SLUG}`),
    canonical: `https://sealmetrics.com${URL}`,
  },
};

const FAQ = [
  {
    question: "¿Qué es BYOK en una herramienta de analítica con IA?",
    answer:
      "La clave propia (BYOK, bring-your-own-key) consiste en conectar tu propia cuenta de proveedor de IA — una clave de OpenAI, Anthropic, Gemini o DeepSeek — para que la herramienta de analítica llame a ese proveedor en tu nombre. Tú eliges el modelo, pagas directamente al proveedor y tus prompts se procesan bajo las condiciones, la política de retención y la jurisdicción de ese proveedor, no las del fabricante de la herramienta.",
  },
  {
    question: "¿Me conviene la IA gestionada o usar mi propia clave de API?",
    answer:
      "Usa la opción gestionada salvo que tengas un motivo concreto para no hacerlo. Seal AI no requiere configuración, ejecuta la inferencia solo en la UE con cero retención y sin entrenar con tus datos, y está cubierta por la cuota de tu plan. La clave propia tiene sentido cuando necesitas un modelo específico, cuando el gasto en IA debe pasar por un contrato de proveedor que ya tienes o cuando una política interna exige que la inferencia corra en tu propia cuenta.",
  },
  {
    question: "¿Usar mi clave de OpenAI o Anthropic crea un problema de transferencia internacional con el RGPD?",
    answer:
      "Puede crearlo, y el análisis pasa a ser tuyo. Un proveedor con matriz estadounidense sigue al alcance del CLOUD Act aunque procese en una región europea, así que quizá necesites una base de transferencia y una evaluación. Seal AI evita la pregunta por diseño: la inferencia se queda en París, en un proveedor sin matriz estadounidense, así que el Capítulo V del RGPD no se activa en absoluto. Con tu propia clave, esa posición la decides y la documentas tú.",
  },
  {
    question: "¿Se contabiliza mi consumo de IA si uso mi propia clave?",
    answer:
      "No. Sealmetrics no contabiliza el consumo con clave propia: te factura tu proveedor, en sus condiciones y a sus precios. El uso de Seal AI, en cambio, va contra la cuota de tokens de tu plan, con packs de tokens adicionales sin caducidad para las organizaciones que necesiten más margen.",
  },
  {
    question: "¿Puedo cambiar de Seal AI a mi propia clave más adelante?",
    answer:
      "Sí. La elección es un ajuste, no una migración. Puedes empezar con Seal AI, conectar tu clave cuando aparezca un requisito concreto y desconectarla para volver a la opción por defecto. El asistente, el inventario de herramientas y la forma de preguntar son idénticos en ambos casos: solo cambian el modelo y las condiciones de procesamiento.",
  },
];

const COMPARISON = [
  {
    aspect: "Configuración",
    seal: "Ninguna — sin clave de API ni cuenta con un proveedor de IA",
    byok: "Creas y gestionas tú la clave del proveedor",
  },
  {
    aspect: "Elección de modelo",
    seal: "El modelo que enviamos y probamos (gpt-oss-120b)",
    byok: "El tuyo: OpenAI, Anthropic, Gemini o DeepSeek",
  },
  {
    aspect: "Dónde se ejecuta la inferencia",
    seal: "Solo en París (Francia). Sin matriz estadounidense",
    byok: "Donde la procese tu proveedor",
  },
  {
    aspect: "Retención y entrenamiento",
    seal: "Cero retención por defecto, sin entrenar con tus datos",
    byok: "Lo que digan las condiciones de tu proveedor",
  },
  {
    aspect: "A quién pagas",
    seal: "A nadie más — cubierto por la cuota de tu plan",
    byok: "A tu proveedor, directamente, a sus precios",
  },
  {
    aspect: "Medición de consumo",
    seal: "Contadores de tokens por organización, solo para la cuota",
    byok: "Sealmetrics no lo contabiliza",
  },
  {
    aspect: "Análisis de transferencia",
    seal: "No se activa — no hay transferencia internacional",
    byok: "Te toca a ti hacerlo y documentarlo",
  },
];

export default function SealAiVsByokPageEs() {
  const dates = postDates("seal-ai-vs-bring-your-own-key", "es");

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Producto",
          author: {
            name: "Rafa Jiménez",
            url: "/es/authors/rafa-jimenez",
            jobTitle: "Founder, Sealmetrics",
          },
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", url: "/es/blog" },
          { name: "Seal AI o clave propia (BYOK)", url: URL },
        ])}
      />
      <JsonLd
        data={definedTermSchema({
          name: "Clave propia (BYOK)",
          description:
            "Modalidad de despliegue en la que el cliente aporta sus propias credenciales de un proveedor de IA a un producto de software, de modo que el producto llama a ese proveedor en nombre del cliente. El cliente gana elección de modelo y facturación directa con su proveedor, y asume la responsabilidad sobre las condiciones de retención del proveedor, la jurisdicción de procesamiento, el análisis de transferencia internacional y la gestión de la clave.",
          url: URL,
          related: [{ name: "Inferencia de IA gestionada", url: URL }],
        })}
      />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: TITLE,
          selectors: [".key-takeaways", ".tldr"],
        })}
      />

      <Breadcrumbs
        items={[{ label: "Blog", href: "/es/blog" }, { label: "Seal AI o clave propia (BYOK)" }]}
        locale="es"
      />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Producto
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              Seal AI o clave propia (BYOK): cuándo usar cada opción
            </h1>
            <PostByline
              {...dates}
              readTime="5 min de lectura"
              authorName="Rafa Jiménez"
              authorUrl="/es/authors/rafa-jimenez"
              locale="es"
            />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Seal AI es la opción por defecto porque la privacidad no debería
            depender de una casilla. Pero puedes traer tu propia clave de
            OpenAI, Anthropic, Gemini o DeepSeek si necesitas un modelo
            concreto: simplemente asumes las condiciones, el coste y el análisis
            de transferencia que vienen con ella.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
              Conclusiones clave
            </h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>
                <strong>Seal AI</strong> es la opción por defecto: sin clave, sin cuenta
                con un proveedor de IA, inferencia solo en la UE, cero retención, sin
                entrenamiento y cubierta por la cuota de tu plan.
              </li>
              <li>
                La <strong>clave propia (BYOK)</strong> compra elección de modelo. A
                cambio, tus prompts corren bajo las condiciones y la jurisdicción de tu
                proveedor, y ese consumo no lo contabilizamos nosotros.
              </li>
              <li>
                Un proveedor con matriz estadounidense implica exposición al CLOUD Act
                aunque uses una región europea — y con tu propia clave, esa evaluación
                pasa a ser tuya, tanto hacerla como documentarla.
              </li>
              <li>
                Es un ajuste, no una migración. Puedes cambiar en cualquier momento y en
                cualquier dirección: el asistente se comporta igual, solo cambian el
                modelo y las condiciones.
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              La mayoría de los productos que ofrecen a la vez una IA gestionada y una
              opción de clave propia te empujan discretamente hacia la que a ellos les
              sale más barata. Este artículo hace lo contrario: aquí tienes lo que te
              cuesta de verdad cada opción, para que elijas una vez y dejes de pensar
              en ello.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Seal AI: la opción por defecto, y por qué lo es
            </h2>
            <p>
              Seal AI es la capa de IA privada dentro de Sealmetrics. Es lo que mueve
              el asistente en lenguaje natural y los insights automáticos, y no hay
              nada que configurar: ni clave de API, ni cuenta con un proveedor de IA,
              ni un paso de onboarding en el que pegues un secreto en una pantalla de
              ajustes. La clave la custodia la plataforma; tú no la ves nunca.
            </p>
            <p>Lo que eso te da, en concreto:</p>
            <ul className="space-y-3 pl-6 list-disc marker:text-text-tertiary">
              <li>
                <strong>Inferencia solo en París (Francia)</strong>, sobre las
                Generative APIs de Scaleway. Scaleway es una empresa francesa del grupo
                Iliad, sin propiedad estadounidense, y declara explícitamente que sus
                servicios de IA no están sujetos a leyes extraterritoriales como el
                CLOUD Act estadounidense.
              </li>
              <li>
                <strong>Cero retención de datos por defecto</strong> y sin entrenar con
                tus datos. La excepción documentada es estrecha: ante un error grave de
                servicio, la petición fallida puede conservarse hasta dos semanas para
                el análisis de la causa raíz.
              </li>
              <li>
                <strong>Ninguna transferencia internacional</strong>, así que el
                Capítulo V del RGPD — artículo 44 y siguientes — no se activa. Sin
                cláusulas contractuales tipo, sin evaluación de impacto de
                transferencias y sin depender del Marco de Privacidad de Datos
                UE-EE. UU.
              </li>
              <li>
                <strong>Solo persisten los contadores de tokens.</strong> Organización,
                modelo, tokens de entrada y de salida, para cuota y facturación. La capa
                de medición nunca guarda el contenido de los prompts ni de las
                respuestas.
              </li>
              <li>
                <strong>Cubierto por tu plan.</strong> El uso consume la cuota de tokens
                de tu organización, con packs de tokens sin caducidad disponibles si
                necesitas más margen.
              </li>
            </ul>
            <p>
              Hay una propiedad más que conviene nombrar, porque está aguas arriba de
              todo lo anterior. Sealmetrics es analítica sin consentimiento: no recoge
              direcciones IP ni cookies y no conserva ningún identificador
              persistente de visitante, solo uno efímero que rota cada día. No hay ningún identificador personal en el conjunto de datos
              que enviar a un modelo, para empezar. El prompt nace limpio.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Clave propia: qué ganas y qué asumes
            </h2>
            <p>
              Puedes conectar tu propia clave de{" "}
              <strong>OpenAI, Anthropic, Gemini o DeepSeek</strong>. El asistente
              funciona igual — mismas preguntas, mismo inventario de herramientas,
              misma interfaz —, pero la inferencia va a tu proveedor, en tu cuenta.
            </p>
            <p>
              Lo que ganas es real: <strong>elección de modelo</strong>. Si tu equipo
              se ha estandarizado en un modelo concreto, si ya has negociado precios
              con un proveedor o si una política interna exige que el gasto en IA pase
              por tus propios contratos, esta es la opción que encaja.
            </p>
            <p>Lo que asumes también es real:</p>
            <ul className="space-y-3 pl-6 list-disc marker:text-text-tertiary">
              <li>
                <strong>El análisis de transferencia internacional.</strong> Tus prompts
                van a ese proveedor bajo sus condiciones, incluida su jurisdicción. Si
                el proveedor tiene matriz estadounidense, una región europea te da
                residencia pero no soberanía: la exposición al CLOUD Act sigue a la
                matriz corporativa, no al centro de datos. Documentar esa posición pasa
                a ser tu trabajo, no el nuestro.
              </li>
              <li>
                <strong>El coste.</strong> Te factura directamente el proveedor. El
                consumo con clave propia no lo contabiliza Sealmetrics, lo que significa
                que no hay techo de cuota por nuestra parte, pero tampoco visibilidad.
              </li>
              <li>
                <strong>La gestión de la clave.</strong> Rotación, alcance, revocación y
                saber quién de tu organización puede verla.
              </li>
              <li>
                <strong>Los valores por defecto de retención y entrenamiento del
                proveedor.</strong> Varían bastante. Conviene leerlos con calma antes de
                conectar: la API oficial de DeepSeek, por ejemplo, declara en su política
                de privacidad que almacena datos personales en la República Popular
                China y que usa datos para entrenar y mejorar sus modelos, con una baja
                que se ejerce por correo electrónico. La autoridad de protección de datos
                italiana le impuso un bloqueo urgente del tratamiento en enero de 2025.
                Los pesos abiertos son un asunto aparte: son las condiciones de la API
                oficial las que traen todo esto.
              </li>
            </ul>
            <p>
              Nada de eso convierte la clave propia en una mala opción. La convierte en
              una opción con deberes.
            </p>

            <CommercialModule
              locale="es"
              hook="¿Aún dudas entre la opción por defecto y tu propia clave? En una demo ves las dos corriendo sobre tu tráfico: gpt-oss-120b en Scaleway París, o tu clave de Anthropic, OpenAI, Gemini o DeepSeek."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Cara a cara
            </h2>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-[0.85rem]">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-6 text-text-tertiary font-medium">
                      Aspecto
                    </th>
                    <th className="text-left py-3 px-6 text-text-secondary font-medium">
                      Seal AI (por defecto)
                    </th>
                    <th className="text-left py-3 pl-6 text-text-secondary font-medium">
                      Clave propia (BYOK)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.aspect} className="border-b border-warm-100">
                      <td className="py-3 pr-6 text-text-primary font-medium align-top">
                        {row.aspect}
                      </td>
                      <td className="py-3 px-6 text-text-secondary align-top">
                        {row.seal}
                      </td>
                      <td className="py-3 pl-6 text-text-secondary align-top">
                        {row.byok}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Cómo elegir en un minuto
            </h2>
            <p>
              <strong>Elige Seal AI si</strong> quieres que el asistente funcione en
              cuanto lo abras; si operas en la UE y prefieres no tener que hacer una
              evaluación de transferencias por una funcionalidad de analítica; si no
              tienes una opinión firme sobre qué modelo responde a tus preguntas; si
              quieres que el uso de IA quede dentro de tu plan actual y no en una
              factura de otro proveedor; o si sencillamente no quieres otra clave de API
              más en tu organización.
            </p>
            <p>
              <strong>Elige la clave propia (BYOK) si</strong> necesitas un modelo
              concreto por un motivo concreto; si tu organización ya tiene un contrato
              de proveedor por el que debe pasar el gasto en IA; si una política interna
              exige que la inferencia corra en tu propia cuenta; o si quieres evaluar un
              modelo contra tus propios datos antes de estandarizarte en él.
            </p>
            <p>
              Si ninguna de las dos listas es decisiva, la respuesta es Seal AI. La
              opción por defecto existe para que el camino que preserva la privacidad
              sea el que te toca sin hacer nada — una garantía que depende de que el
              cliente encuentre el ajuste correcto no es gran garantía.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              No te quedas atado a ninguna de las dos
            </h2>
            <p>
              Esto es un ajuste, no una decisión de arquitectura con la que convivir
              para siempre. Empieza con Seal AI, conecta tu clave más adelante si
              aparece un requisito, desconéctala y vuelve a la opción por defecto si no
              funciona. El asistente, el inventario de 63 herramientas y la forma de
              plantear las preguntas no cambian: solo el modelo que hay detrás y las
              condiciones bajo las que se ejecuta.
            </p>
            <p>
              El detalle completo del tratamiento, el listado de subencargados y la
              posición de cumplimiento están documentados en la{" "}
              <Link
                href="https://docs.sealmetrics.com/lens/seal-ai/private-ai-architecture"
                className="text-text-primary border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors no-underline"
              >
                documentación de arquitectura y privacidad de Seal AI
              </Link>
              . Para la cuestión de jurisdicción que hay detrás del dilema de la clave
              propia, lee{" "}
              <Link
                href="/es/blog/residency-is-not-sovereignty"
                className="text-text-primary border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors no-underline"
              >
                Residencia no es soberanía
              </Link>
              .
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Empezar con Seal AI y pasar a tu propia clave más adelante? Ve en una demo cómo se cambia sin migración — la base de dato es la misma en ambos caminos."
          />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Lecturas relacionadas
            </h2>
            <div className="space-y-4">
              <div>
                <Link
                  href="/es/blog/meet-seal-ai"
                  className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
                >
                  Te presentamos Seal AI: el asistente de analítica que nunca envía tus datos a Estados Unidos
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">5 min de lectura</p>
              </div>
              <div>
                <Link
                  href="/es/blog/residency-is-not-sovereignty"
                  className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
                >
                  Residencia no es soberanía: la pregunta que debes hacerle a tu proveedor de analítica con IA
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">6 min de lectura</p>
              </div>
              <div>
                <Link
                  href="/es/blog/three-questions-to-ask-seal-ai"
                  className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
                >
                  Tres preguntas que hacerle hoy a tu IA de analítica
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">4 min de lectura</p>
              </div>
            </div>
          </section>
          <FaqSection items={FAQ} locale="es" />
        </div>
      </article>
    </>
  );
}
