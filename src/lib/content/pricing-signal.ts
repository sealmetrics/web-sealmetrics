export const pricingSignalFaqs = {
  en: [
    ["What counts as a human event?", "A real visitor interaction such as a pageview, click, conversion, form submission or add-to-cart. Traditional bots and detected AI-agent traffic are reported separately and do not count toward the human-event allowance."],
    ["What happens if I exceed my event allowance?", "Collection does not stop, throttle or start sampling. Growth moves to Scale only after two consecutive non-forgiven overage months and with notice; Scale customers are contacted to discuss Enterprise."],
    ["Is there a free trial?", "Yes. The paid plans have a 14-day trial with full product access. A payment method is added at the start and no charge is made if you cancel before the trial ends. Agentic needs no card."],
    ["Are all analytics capabilities included?", "Core analytics, revenue attribution, API, MCP and BigQuery are included on every plan, Agentic included. Growth adds LENS with your own model key and email support. Scale adds webhooks, audit logs, priority support and managed Private AI tokens. Enterprise adds isolated processing and dedicated governance."],
    ["What is the Agentic Package?", "A self-service tier provisioned from an MCP-capable assistant. It includes aggregate cookieless analytics for up to 1M human events per month, documentation-only support and no card."],
    ["Can I change billing period?", "Yes. Annual billing is paid upfront and prices the year at the equivalent of ten monthly payments. A monthly-to-annual change starts on the next billing cycle."],
    ["Can I downgrade when traffic falls?", "Yes. If usage stays below half of the current allowance for at least three months, Sealmetrics can suggest a lower plan. Nothing changes without your action."],
    ["Do you charge per-event overages?", "No. There is no variable per-event line item. Sustained growth moves the account to the next fixed plan under the published overage policy."],
  ],
  es: [
    ["¿Qué cuenta como evento humano?", "Una interacción real: pageview, clic, conversión, envío de formulario o add-to-cart. Los bots tradicionales y el tráfico detectado de agentes IA se informan por separado y no consumen el límite de eventos humanos."],
    ["¿Qué pasa si supero el límite de eventos?", "La captura no se detiene, limita ni empieza a muestrear. Growth pasa a Scale sólo tras dos meses consecutivos de exceso no perdonado y con aviso; con Scale te contactamos para valorar Enterprise."],
    ["¿Hay prueba gratuita?", "Sí. Los planes de pago tienen 14 días de prueba con acceso completo. Se añade un método de pago al comenzar y no se cobra si cancelas antes de terminar. Agentic no pide tarjeta."],
    ["¿Están incluidas todas las capacidades analíticas?", "Analítica core, atribución de ingresos, API, MCP y BigQuery están incluidos en todos los planes, también en Agentic. Growth añade LENS con tu propia clave de modelo y soporte por email. Scale añade webhooks, logs de auditoría, soporte prioritario y tokens de Private AI gestionada. Enterprise añade procesamiento aislado y governance dedicada."],
    ["¿Qué es el Agentic Package?", "Un tier self-service aprovisionado desde un asistente compatible con MCP. Incluye analítica agregada sin cookies hasta 1M de eventos humanos al mes, soporte sólo por documentación y sin tarjeta."],
    ["¿Puedo cambiar el periodo de facturación?", "Sí. La facturación anual se paga por adelantado y equivale a diez mensualidades. El cambio de mensual a anual empieza en el siguiente ciclo."],
    ["¿Puedo bajar de plan si cae el tráfico?", "Sí. Si el uso permanece por debajo de la mitad del límite durante al menos tres meses, Sealmetrics puede proponerte un plan inferior. Nada cambia sin tu acción."],
    ["¿Cobráis excesos por evento?", "No. No existe una línea variable por evento. El crecimiento sostenido mueve la cuenta al siguiente plan fijo bajo la política de exceso publicada."],
  ],
} as const;

export const pricingSignalFaqItems = {
  en: pricingSignalFaqs.en.map(([question, answer]) => ({ question, answer })),
  es: pricingSignalFaqs.es.map(([question, answer]) => ({ question, answer })),
};
