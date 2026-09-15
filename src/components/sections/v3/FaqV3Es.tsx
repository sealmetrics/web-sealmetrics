"use client";

import { useState } from "react";
import Link from "next/link";

const ITEMS = [
  {
    q: "¿Por qué pagar Sealmetrics si GA4 es gratis?",
    a: "GA4 es gratis porque tú eres el producto — tus datos entrenan los modelos publicitarios de Google. Más importante: GA4 depende de cookies que la mayoría de visitantes europeos rechazan. Tomas decisiones de presupuesto sobre una fracción del dato real. El coste de Sealmetrics es un error de redondeo comparado con el coste de mal asignar inversión publicitaria.",
  },
  {
    q: "¿Por qué la «neutralidad» es una feature?",
    a: "Meta reporta con el sesgo de Meta. Google reporta con el de Google. GA vive dentro del ecosistema Google. Sealmetrics no vende inventario publicitario ni tiene canal al que favorecer — por eso marca, agencias y finanzas pueden firmar el mismo número sin sentir que firman contra un rival.",
  },
  {
    q: "¿Qué tan preciso es el tracking sin cookies?",
    a: "Dreamplace Hotels midió un 30% más de tráfico que GA y un 15–20% más de venta atribuida, conciliada contra su CRM. En la tienda Shopify de Incapto, Sealmetrics registró el 96% de los pedidos reales mientras GA4 no veía el 29% de las visitas. Palladium Hotel Group descubrió que el 40% de su tráfico no tenía atribución en su stack anterior y mejoró el Coste por Búsqueda en Display un +165% al cambiar. Sin muestreo, sin modelado — dato observado, no estimado.",
  },
  {
    q: "¿Tengo que quitar GA4?",
    a: "No. La mayoría de clientes corren Sealmetrics junto a GA4 los primeros 30 días para comparar en paralelo. Después, la mayoría usa Sealmetrics como fuente de verdad y mantiene GA4 para integraciones específicas del ecosistema Google.",
  },
  {
    q: "¿Cumple RGPD sin banner de consentimiento?",
    a: "Está diseñada para ello; es nuestra autoevaluación, no una certificación. Sin cookies por arquitectura — sin cookies, sin almacenamiento de datos personales, sin tracking cross-site. 100% alojado en UE, Dublín, Irlanda. Diseñada para el RGPD, ePrivacy y Schrems II, sin banner de consentimiento.",
  },
  {
    q: "¿Cuánto tarda la implementación?",
    a: "De 5 a 30 minutos para instalar, según la plataforma. Primer dato en la primera hora. El onboarding depende del plan: documentación self-service en Agentic y Growth, una sesión de onboarding en Scale y onboarding white-glove en Enterprise.",
  },
];

export function FaqV3Es() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">FAQ</span>
            <h2 className="h-section mt-5">
              Lo que todo <em>CMO pregunta.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Respuestas directas. Sin relleno.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.8fr] gap-12 md:gap-20">
          <div>
            <p className="text-[16px] text-ink-soft leading-[1.55] mb-5">
              ¿Más preguntas? Nuestro equipo — incluido el founder — está a un mensaje.
            </p>
            <Link href="/es/audit" className="inline-flex items-center gap-2 bg-ink text-white px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors">
              Escríbenos →
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {ITEMS.map((item, i) => {
              const isOpen = i === openIdx;
              return (
                <button
                  key={item.q}
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className={`w-full text-left border rounded-xl px-7 py-5 transition-all ${
                    isOpen ? "bg-ink text-white border-ink" : "bg-white border-warm-100 hover:border-warm-200"
                  }`}
                >
                  <div className="flex justify-between items-center gap-6">
                    {/* h3 bajo el h2 de sección: los motores de IA extraen el
                        encabezado en forma de pregunta junto al párrafo que le
                        sigue. El tamaño va en la clase, no cambia nada visual. */}
                    <h3 className={`text-[17px] font-semibold tracking-[-0.015em] ${isOpen ? "text-white" : "text-ink"}`}>{item.q}</h3>
                    <span className={`w-7 h-7 rounded-md flex items-center justify-center text-[18px] font-normal shrink-0 transition-transform ${isOpen ? "bg-brand text-ink rotate-45" : "bg-warm-50 text-ink-soft"}`}>+</span>
                  </div>
                  {/* Siempre en el DOM, oculta al plegar. Renderizarla solo al
                      abrir dejaba las respuestas fuera del HTML servido. */}
                  <p hidden={!isOpen} className="mt-3.5 text-[14.5px] leading-[1.6] text-white/75 max-w-[62ch]">{item.a}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
