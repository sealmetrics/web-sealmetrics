import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { getAlternates } from "@/lib/i18n/navigation";
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

const SLUG = "meet-seal-ai";
const URL = `/es/blog/${SLUG}`;
const TITLE = "Te presentamos Seal AI: el asistente de analítica que nunca envía tus datos a Estados Unidos";
const DESCRIPTION =
  "Pregunta a tu analítica en lenguaje natural y recibe respuestas ancladas en tus datos, con una inferencia que se ejecuta solo en la UE, no guarda nada y no entrena el modelo de nadie. Así funciona Seal AI y por qué es privada por arquitectura, no por promesa.";

export const metadata: Metadata = {
  title: "Seal AI: analítica con IA que no sale de la UE",
  description: "Pregunta a tu analítica en lenguaje natural y recibe respuestas ancladas en tus datos, con inferencia solo en la UE, sin retención y sin entrenar a nadie.",
  openGraph: {
    title: "Seal AI: la IA de analítica privada que solo se ejecuta en la UE",
    description:
      "Respuestas en lenguaje natural sobre tu analítica, con una inferencia que solo se ejecuta en la UE y que no retiene nada.",
    type: "article",
    url: "https://sealmetrics.com/es/blog/meet-seal-ai/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: ["https://sealmetrics.com/og/blog/meet-seal-ai.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Seal AI: la IA de analítica privada que solo se ejecuta en la UE",
    description: "Respuestas en lenguaje natural sobre tu analítica, con una inferencia que solo se ejecuta en la UE y que no retiene nada.",
    images: ["https://sealmetrics.com/og/blog/meet-seal-ai.png"],
  },
  alternates: {
    languages: getAlternates(`/blog/${SLUG}`),
    canonical: `https://sealmetrics.com${URL}`,
  },
};

const FAQ = [
  {
    question: "¿Qué es Seal AI?",
    answer:
      "Seal AI es la capa de IA privada integrada en Sealmetrics. Alimenta un asistente en lenguaje natural que responde preguntas sobre tu analítica consultando tus datos, y genera insights automáticos. La inferencia se ejecuta únicamente en infraestructura europea (Scaleway, París), no conserva el contenido de los prompts y no entrena ningún modelo con tus datos. No requiere configuración: no hay claves de API que crear ni cuenta con un proveedor de IA.",
  },
  {
    question: "¿Seal AI envía mis datos a Estados Unidos?",
    answer:
      "No. Seal AI ejecuta la inferencia exclusivamente en París (Francia), sobre Scaleway, una empresa francesa sin matriz estadounidense. Como el dato se procesa solo en la UE y el proveedor no está sujeto a la jurisdicción de Estados Unidos, no se produce ninguna transferencia internacional: el Capítulo V del RGPD (cláusulas contractuales tipo, evaluaciones de transferencia, Data Privacy Framework) no llega a aplicarse.",
  },
  {
    question: "¿Seal AI entrena sus modelos con mis datos de analítica?",
    answer:
      "No. El modelo que hay debajo (gpt-oss-120b) es de pesos abiertos y estático: no aprende de las peticiones. Ni Scaleway, ni Sealmetrics, ni el creador del modelo entrenan con tus datos. Sealmetrics solo guarda contadores de tokens para cuota y facturación; el contenido de los prompts y de las respuestas nunca se persiste.",
  },
  {
    question: "¿En qué se diferencia Seal AI de usar ChatGPT o Claude con mis datos?",
    answer:
      "Las herramientas de IA de proveedores estadounidenses, tanto las de consumo como las de API, envían tus datos a empresas bajo jurisdicción de Estados Unidos, incluso cuando ofrecen una región europea. Seal AI es privada por arquitectura: inferencia solo en la UE, sin matriz estadounidense, retención cero, sin entrenamiento y un modelo de pesos abiertos que podrías autoalojar. Si prefieres un proveedor externo concreto, Sealmetrics también admite usar tu propia clave, pero Seal AI viene por defecto para que la privacidad no dependa de la configuración.",
  },
  {
    question: "¿Qué le puedo preguntar a Seal AI?",
    answer:
      "Cualquier cosa que le preguntarías a un analista sobre tu tráfico y tus conversiones: cómo va un periodo frente al anterior, qué canal o fuente convierte mejor y por qué, cuál es tu tasa de rebote, cómo se reparte el tráfico por dispositivo o por qué se ha movido una métrica. Responde llamando a las herramientas que consultan tus datos reales y narrando el resultado: anclado en tus cifras, no inventado.",
  },
];

export default function MeetSealAiPageEs() {
  const dates = postDates("meet-seal-ai", "es");

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
          { name: "Te presentamos Seal AI", url: URL },
        ])}
      />
      <JsonLd
        data={definedTermSchema({
          name: "IA privada",
          description:
            "Sistema de IA diseñado para que los datos del usuario se traten sin salir de una jurisdicción elegida, no se conserven después de la inferencia y no se usen nunca para entrenar modelos. La privacidad es una propiedad de la arquitectura —el lugar de alojamiento, la jurisdicción de la empresa, la política de retención y la licencia del modelo— y no una promesa contractual superpuesta a un servicio de propósito general.",
          url: URL,
          related: [
            { name: "Soberanía del dato", url: "/es/blog/residency-is-not-sovereignty" },
          ],
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
        items={[{ label: "Blog", href: "/es/blog" }, { label: "Te presentamos Seal AI" }]}
        locale="es"
      />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Producto
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              Te presentamos Seal AI: el asistente de analítica que nunca envía tus datos a Estados Unidos
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
            Pregunta a tu analítica en lenguaje natural y recibe una respuesta
            anclada en tus datos, de una IA que se ejecuta solo en la UE, no
            guarda nada y no entrena el modelo de nadie. Privada por
            arquitectura, no por promesa.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
              Conclusiones clave
            </h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>
                Seal AI responde preguntas sobre tu analítica en lenguaje natural
                consultando tus datos reales: las cifras salen de tu cuenta, no de
                la imaginación del modelo.
              </li>
              <li>
                La inferencia se ejecuta solo en París, en un proveedor europeo sin
                matriz estadounidense. Ningún dato sale de la UE, así que no llega a
                producirse una transferencia internacional.
              </li>
              <li>
                Retención cero de los prompts, sin entrenamiento con tus datos y un
                modelo de pesos abiertos: la privacidad es una propiedad de la
                arquitectura, no una política añadida encima.
              </li>
              <li>
                Sin configuración: ni claves de API ni cuenta en un proveedor de IA.
                ¿Prefieres el tuyo? Puedes usar tu propia clave, pero Seal AI viene
                activada por defecto para que la privacidad no sea opcional.
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Las herramientas de analítica llevan meses compitiendo por añadir un
              chat de IA al dashboard. La mayoría lo hace enviando tus datos, sin
              hacer mucho ruido, a un proveedor de IA estadounidense. No queríamos
              ser una de ellas, así que construimos <strong>Seal AI</strong>, la
              capa de IA privada dentro de Sealmetrics, sobre otra premisa: la IA
              debería ser tan privada como la analítica que explica.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Qué hace
            </h2>
            <p>
              Seal AI es un analista con el que puedes hablar. Pregúntale «¿cómo ha
              ido el tráfico respecto al mes pasado?» o «¿cuál de mis fuentes
              principales convierte mejor, y por qué lo dices?» y te responde en
              lenguaje natural, consultando tus datos de verdad en lugar de
              suponer. Por dentro planifica, llama a las herramientas de datos
              adecuadas, lee los resultados y te los devuelve como una respuesta
              clara, con algún gráfico o alguna tabla cuando toca. Además genera
              insights automáticos de forma periódica, para que los patrones
              afloren sin que tengas que preguntar.
            </p>
            <p>
              Y algo esencial: sus respuestas están <em>ancladas</em> en tus datos
              —lo que en inglés se llama <em>grounding</em>—. Narra las cifras que
              ha recuperado de tu cuenta y está construida para negarse a inventar
              las que no ha recuperado. Ponemos esa disciplina a prueba de forma
              continua contra una verdad de referencia extraída directamente de la
              base de datos.
            </p>

            <CommercialModule
              locale="es"
              hook="¿Quieres ver a Seal AI responder sobre tu tráfico y no sobre capturas de pantalla? En una demo le haces tus propias preguntas, con los datos del día listos antes de las 6 AM y sin que tu dato salga de la UE."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Por qué es privada por arquitectura
            </h2>
            <p>
              «IA privada» es una expresión que se usa con mucha alegría, así que
              esto es exactamente lo que queremos decir con ella, y todo es
              estructural:
            </p>
            <ul className="space-y-3 pl-6 list-disc marker:text-text-tertiary">
              <li>
                <strong>Inferencia solo en la UE.</strong> El modelo se ejecuta en
                la infraestructura de Scaleway en París, y únicamente ahí. Scaleway
                es una empresa francesa, con matriz francesa y sin propiedad
                estadounidense, así que no está sujeta al CLOUD Act norteamericano.
              </li>
              <li>
                <strong>Sin transferencia y, por tanto, sin problema de
                transferencia.</strong> Como tus datos nunca salen de la UE y el
                proveedor no tiene matriz estadounidense, el Capítulo V del RGPD
                sencillamente no se activa: ni cláusulas contractuales tipo, ni
                evaluación de transferencia, ni depender de que el marco de
                privacidad UE-EE. UU. sobreviva a su próxima cita en los
                tribunales.
              </li>
              <li>
                <strong>Retención cero, sin entrenamiento.</strong> Scaleway no
                conserva el contenido de los prompts por defecto; Sealmetrics solo
                almacena contadores de tokens, nunca el contenido. El modelo es de
                pesos abiertos y estático: no aprende de tus peticiones.
              </li>
              <li>
                <strong>El prompt nace limpio.</strong> Sealmetrics es analítica
                sin consentimiento: no guardamos IPs, no instalamos cookies ni
                conservamos identificadores persistentes de visitante. De modo que no hay ningún
                identificador personal que enviar a la IA, ni siquiera antes de
                aplicar controles de privacidad.
              </li>
            </ul>
            <p>
              La diferencia respecto a enchufar una API de IA estadounidense no es
              un contrato más estricto. Es que el dato nunca entra en una
              jurisdicción donde haría falta un contrato más estricto.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Sin configuración y sin lock-in
            </h2>
            <p>
              No tienes que configurar nada. No hay claves de API que crear ni
              cuenta de terceros que dar de alta: Seal AI viene incluida y usa una
              clave de la plataforma que tú nunca ves. Si prefieres usar un
              proveedor externo concreto, Sealmetrics admite bring-your-own-key
              (tu propia clave) con OpenAI, Anthropic, Gemini o DeepSeek. Pero Seal
              AI es la opción por defecto a propósito: la privacidad no debería
              depender de que alguien marque una casilla.
            </p>
            <p>
              Y como el modelo es de pesos abiertos bajo licencia Apache 2.0,
              tampoco estamos atados a un único proveedor. El mismo modelo está
              disponible en varios hosts europeos y cabe en una sola GPU, así que
              la garantía de privacidad es una que podríamos seguir cumpliendo
              aunque cambiásemos de infraestructura. Una garantía de la que no
              puedes marcharte no es una garantía; la nuestra es portable por
              diseño.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Pruébala con tres preguntas
            </h2>
            <p>
              Si ya usas Sealmetrics, abre el asistente y pregúntale: (1) «Compara
              mis entradas de los últimos 7 días con los 7 anteriores». (2) «¿Cuál
              de mis 3 fuentes principales convierte mejor, y por qué?». (3) «¿Cuál
              es mi tasa de rebote este mes?». Tendrás respuestas ancladas en tus
              datos en segundos, y ninguno de los datos que hay detrás habrá salido
              de la UE.
            </p>
            <p>
              ¿Quieres el detalle de ingeniería? Hemos publicado cómo funciona Seal
              AI de principio a fin, incluido el análisis de tratamiento de datos y
              de cumplimiento, en nuestra{" "}
              <Link
                href="https://docs.sealmetrics.com/lens/seal-ai/private-ai-architecture"
                className="text-text-primary border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors no-underline"
              >
                documentación técnica
              </Link>{" "}
              (en inglés).
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Tres preguntas que quieres hacerle a tu propia analítica? Tráelas a una demo y ve a Seal AI contestarlas sobre tu dato real — gpt-oss-120b en Scaleway París, o tu propia clave de Anthropic, OpenAI, Gemini o DeepSeek."
          />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Lecturas relacionadas
            </h2>
            <div className="space-y-4">
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
                  href="/es/blog/best-llm-for-data-analytics"
                  className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
                >
                  El mejor LLM para analítica de datos no es el que puntúa más alto en los benchmarks
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">7 min de lectura</p>
              </div>
            </div>
          </section>
          <FaqSection items={FAQ} locale="es" />
        </div>
      </article>
    </>
  );
}
