export const pricingSignalFaqs = {
  en: [
    ["What counts as a human event?", "A real visitor interaction such as a pageview, click, conversion, form submission or add-to-cart. Traditional bots are filtered out and do not count toward the human-event allowance."],
    ["What happens if I exceed my event allowance?", "Collection does not stop, throttle or start sampling. Growth moves to Scale only after two consecutive non-forgiven overage months and with notice; Scale customers are contacted to discuss Enterprise."],
    ["Is there a free trial?", "There is no time-limited trial. Every account starts with 1M human events free — in total over the life of the account, not per month — and no card. The allowance does not expire: when the millionth event is used, whether that takes a week or a year, you choose a plan and billing starts."],
    ["Are all analytics capabilities included?", "Core analytics, revenue attribution, API, MCP, BigQuery and LENS with your own model key are included on every plan, Agentic included: the free first million has the same features as Growth. Growth adds email support. Scale adds webhooks, audit logs, priority support and managed Private AI tokens. Enterprise adds isolated processing and dedicated governance."],
    ["What is the Agentic Package?", "The free starting tier, opened from the web or provisioned from an MCP-capable assistant. It has the same features as Growth — LENS with your own model key included — for up to 1M human events in total, with documentation-only support and no card. Once the million is used, the account moves to a paid plan."],
    ["Can I change billing period?", "Yes. Annual billing is paid upfront and prices the year at the equivalent of ten monthly payments. A monthly-to-annual change starts on the next billing cycle."],
    ["Can I downgrade when traffic falls?", "Yes. If usage stays below half of the current allowance for at least three months, Sealmetrics can suggest a lower plan. Nothing changes without your action."],
    ["Do you charge per-event overages?", "No. There is no variable per-event line item. Sustained growth moves the account to the next fixed plan under the published overage policy."],
  ],
  es: [
    ["¿Qué cuenta como evento humano?", "Una interacción real: pageview, clic, conversión, envío de formulario o add-to-cart. Los bots tradicionales se filtran y no consumen el límite de eventos humanos."],
    ["¿Qué pasa si supero el límite de eventos?", "La captura no se detiene, limita ni empieza a muestrear. Growth pasa a Scale sólo tras dos meses consecutivos de exceso no perdonado y con aviso; con Scale te contactamos para valorar Enterprise."],
    ["¿Hay prueba gratuita?", "No hay una prueba con fecha de caducidad. Cada cuenta empieza con 1M de eventos humanos gratis — en total durante la vida de la cuenta, no al mes — y sin tarjeta. El saldo no caduca: cuando se consume el millón, tarde una semana o un año, eliges plan y empieza la facturación."],
    ["¿Están incluidas todas las capacidades analíticas?", "Analítica core, atribución de ingresos, API, MCP, BigQuery y LENS con tu propia clave de modelo están incluidos en todos los planes, también en Agentic: el primer millón gratis tiene las mismas funciones que Growth. Growth añade soporte por email. Scale añade webhooks, logs de auditoría, soporte prioritario y tokens de Private AI gestionada. Enterprise añade procesamiento aislado y governance dedicada."],
    ["¿Qué es el Agentic Package?", "El tier gratuito de inicio, abierto desde la web o aprovisionado desde un asistente compatible con MCP. Tiene las mismas funciones que Growth — LENS con tu propia clave de modelo incluido — hasta 1M de eventos humanos en total, con soporte sólo por documentación y sin tarjeta. Consumido el millón, la cuenta pasa a un plan de pago."],
    ["¿Puedo cambiar el periodo de facturación?", "Sí. La facturación anual se paga por adelantado y equivale a diez mensualidades. El cambio de mensual a anual empieza en el siguiente ciclo."],
    ["¿Puedo bajar de plan si cae el tráfico?", "Sí. Si el uso permanece por debajo de la mitad del límite durante al menos tres meses, Sealmetrics puede proponerte un plan inferior. Nada cambia sin tu acción."],
    ["¿Cobráis excesos por evento?", "No. No existe una línea variable por evento. El crecimiento sostenido mueve la cuenta al siguiente plan fijo bajo la política de exceso publicada."],
  ],
} as const;

export const pricingSignalFaqItems = {
  en: pricingSignalFaqs.en.map(([question, answer]) => ({ question, answer })),
  es: pricingSignalFaqs.es.map(([question, answer]) => ({ question, answer })),
};
