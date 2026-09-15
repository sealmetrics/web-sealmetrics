# Campaña de pago Q4 2026: cuenta gratuita Agentic y SLA Enterprise para Black Friday

Documento operativo para Google Ads, Meta Ads y LinkedIn Ads. Ventana: del 22 de septiembre de 2026 al 6 de enero de 2027. Un único destino para todas las campañas:

- EN: https://sealmetrics.com/free-account/
- ES: https://sealmetrics.com/es/cuenta-gratis/

Todo el copy publicitario está en inglés y en español, con el recuento de caracteres junto a cada línea. Los límites por plataforma se indican en cada tabla. Las tablas del anexo (sección 10) están pensadas para pegarse directamente en Google Ads Editor y en los gestores de Meta y LinkedIn.

Reglas de redacción que este documento respeta y que cualquier variación posterior debe respetar también:

- Nunca se afirma cobertura total. No se escribe "100%", "cada visita", "todo tu tráfico", "cero pérdida de datos" ni "mide todas las ventas". Se escribe lo demostrable: "hasta la mitad", "+52% de tráfico de pago", "sin visitas perdidas por rechazo de consentimiento".
- Nunca se afirma atribución multi-touch, customer journeys, reconstrucción de sesiones ni tracking a nivel de usuario. Sealmetrics es medición agregada y anónima, con atribución last-click sobre el conjunto de datos completo.
- Nunca se escribe "GDPR-compliant" ni "compliant by design". Se escribe "designed for GDPR from the architecture up", "no cookies, no consent gate", "EU-hosted in Dublin".
- Nunca se menciona ISO 27001 ni SOC 2.
- "Free" o "gratis" solo aplica a la cuenta Agentic. No existe periodo de prueba en los planes de pago: nunca se escribe "free trial", "14-day trial" ni "prueba de 14 días". La formulación de la oferta gratuita es "We gift you the first million events" / "Te regalamos el primer millón de eventos".
- El límite de la cuenta gratuita es "1M events in total" (acumulado, para toda la vida de la cuenta), nunca "1M events per month".
- Los informes en tiempo real sin muestreo en pico son capacidad de producto en todos los planes. No forman parte de la oferta y nunca se escribe "real-time SLA". La oferta es el SLA Enterprise (99,9% de disponibilidad con créditos de servicio y soporte prioritario).
- La marca se escribe "Sealmetrics", con una sola mayúscula. "eCommerce" se escribe siempre así.
- Ningún anuncio compara con herramientas ligeras de privacidad. El marco es GA4 y Consent Mode, GA360, Adobe Analytics, Piwik PRO y Matomo.
- Ninguna línea de anuncio contiene guiones largos.

## 1. Resumen ejecutivo y objetivo

### 1.1 Qué vendemos y a quién

El anuncio tiene una tarea: llevar a un CMO o a un responsable de eCommerce a una página que le dice que hasta la mitad de su tráfico no llega a su informe, y que puede comprobarlo en su propio sitio sin pagar nada. La página hace el resto. El anuncio no explica el producto; abre la herida y promete la prueba.

Dos conversiones, en este orden:

1. **Conversión primaria: cuenta Agentic gratuita abierta desde Claude.** El visitante copia un prompt, lo pega en Claude, y el prompt instala el MCP de Sealmetrics, crea la cuenta y genera los píxeles. Hasta 1.000.000 de eventos en total, sin tarjeta, nada que cancelar, con MCP, API y BigQuery incluidos. La formulación de la oferta es "We gift you the first million events" / "Te regalamos el primer millón de eventos". Es la conversión sobre la que se optimizan las plataformas.
2. **Conversión secundaria: contratación de Growth (499 €/mes) o Scale (899 €/mes), facturación anual, antes del 27 de noviembre de 2026.** El CTA de la landing para esta conversión es "See plans and sign" / "Ver planes y contratar" y lleva a /pricing. Quien contrate antes de esa fecha recibe el SLA Enterprise (99,9% de disponibilidad con créditos de servicio y soporte prioritario) en su cuenta hasta el 6 de enero de 2027, al precio de su plan. Es el objetivo económico real del trimestre y se reconcilia desde el back-office, no desde las plataformas de anuncios.

### 1.2 Lógica del CPA objetivo

Trabajamos hacia atrás desde el plan de pago, no desde la cuenta gratuita:

- Valor anual de contrato: Growth 5.988 €, Scale 10.788 €. Media ponderada asumida (70/30): 7.428 €.
- Tolerancia de CAC en pago para el primer año: 40% del ACV, es decir 2.971 € por cliente de pago nuevo procedente de campañas.
- Hipótesis de conversión de cuenta gratuita a plan de pago en 60 días: 4% (rango de trabajo 3% a 6%). Se revisa con datos reales a partir de la semana 6.
- Por tanto, el CPA objetivo por **cuenta Agentic creada** es 2.971 € × 4% ≈ **119 €**. Redondeamos a **120 € de CPA objetivo por cuenta creada**, con un techo de 180 € durante las tres primeras semanas mientras los algoritmos aprenden.
- Las microconversiones (clic en CTA, prompt copiado) se usan para alimentar el aprendizaje de las plataformas, no para juzgar el CPA. Su coste de referencia: **clic en CTA ≤ 25 €**, **prompt copiado ≤ 45 €**. Estos umbrales asumen una ratio prompt copiado → cuenta creada del 35% al 40%, que se mide en el back-office.

Si la ratio real de cuenta gratuita a plan de pago es inferior al 3% en la semana 8, el CPA objetivo baja a 90 € y se recorta presupuesto en las campañas de prospección fría (sección 8.5).

### 1.3 Materia prima del fundador para el copy

Cuatro líneas que la landing ya usa y que los anuncios pueden repetir literalmente, porque el ajuste entre anuncio y página es exacto:

- "You have one million events to see the reality of your business. What you were looking at until now was something else." / "Tienes un millón de eventos para ver la realidad de tu negocio. Lo que mirabas hasta ahora era otra cosa."
- "Explain to me how you make your campaigns profitable when you cannot see half the traffic or 30% of the sales, and 40% or more of the sales you do see are attributed to the wrong channel." / "Explícame cómo haces rentables tus campañas si no ves la mitad del tráfico ni el 30% de las ventas, y el 40% o más de las ventas que sí ves están atribuidas al canal equivocado."
- Teaser de caso: "How Palladium doubled its Display sales" / "Cómo Palladium duplicó sus ventas de Display".
- Teaser de caso: "How Incapto found that its best-converting traffic was the traffic that accepted cookies least" / "Cómo Incapto descubrió que su tráfico que mejor convertía era el que menos aceptaba cookies".

El gancho "explícame" supera los 150 caracteres visibles de LinkedIn y los 125 de Meta, así que se usa en las versiones largas y en la tarjeta de texto (c), nunca recortado: la fuerza está en la enumeración completa.

### 1.4 Por qué una sola landing

- **Coherencia de mensaje.** Todos los anuncios repiten el H1 de la página ("Up to half your traffic never reaches your report" / "Hasta la mitad de tu tráfico no llega a tu informe"). Google mide la relevancia entre anuncio y página; Meta y LinkedIn miden la tasa de rebote de forma indirecta a través del coste por resultado. Una sola página con un mensaje idéntico al anuncio da la mejor calidad posible en las tres.
- **Volumen de señal.** Con un CPA de 120 € y un presupuesto de 15.000 € al mes esperamos 90 a 125 cuentas creadas al mes. Repartidas entre varias landings, ninguna plataforma alcanzaría las 30 conversiones en 30 días que necesitan las pujas automáticas. Con una sola landing y una sola conversión importada, sí.
- **Una sola prueba A/B a la vez.** La página tiene dos variantes de H1 y dos órdenes de bloques (sección 8.4). Más landings multiplicarían las variantes y diluirían la muestra.
- **Idioma, no mercado.** La página existe en inglés y en español. El español recibe el tráfico de España; el inglés recibe el de DE, FR, IT, NL, UK y PT. Los anuncios en DE, FR, IT, NL y PT se sirven en inglés en esta fase (sección 2.3).

### 1.5 Resultado esperado del trimestre (15.000 €/mes, 3,5 meses)

| Métrica | Conservador | Base | Optimista |
|---|---|---|---|
| Inversión total en medios | 52.500 € | 52.500 € | 52.500 € |
| Clics a landing | 26.000 | 32.000 | 40.000 |
| Prompts copiados | 780 | 1.150 | 1.600 |
| Cuentas Agentic creadas | 300 | 440 | 620 |
| CPA por cuenta creada | 175 € | 119 € | 85 € |
| Planes de pago (60 días) | 9 | 18 | 31 |
| ACV contratado | 67.000 € | 134.000 € | 230.000 € |

El escenario base recupera la inversión en medios con el primer año de los contratos. El conservador no la recupera y activa la regla de stop-loss de la sección 8.5.

### 1.4 La oferta con nombre (estructura Grand Slam Offer, 15 Sep 2026)

La landing ya no vende "una cuenta gratis" sino una oferta con nombre, plazo y stack de valor. Los anuncios deben usar el mismo nombre y la misma promesa para que el mensaje del anuncio y el de la landing coincidan palabra por palabra:

- **Nombre**: "La Prueba de la Verdad del Black Friday" / "The Black Friday Truth Test". Sufijo fijo: "14 días · 1.000.000 de eventos · 0 €".
- **Promesa con plazo**: "En 14 días, en tu propia web y conciliado contra tus pedidos, sabrás qué canales venden de verdad antes del Black Friday."
- **Reductores de esfuerzo** (chips bajo el CTA): sin tarjeta, Claude lo instala en 5 a 30 minutos, te quedas con GA4, comparación lista antes del Black Friday.
- **Stack**: motor de medición de Growth (499 €/mes → 0 €), atribución de ingresos por canal, instalación hecha por el asistente, Bonus 1 método de conciliación de Incapto, Bonus 2 quince análisis en el asistente, Bonus 3 MCP + API + BigQuery, Bonus Black Friday SLA de Enterprise hasta el 6 de enero si se contrata Growth o Scale antes del 27 de noviembre.
- **Garantía**: "Tu caja es la garantía" (conciliación contra pedidos reales; sin tarjeta no hay nada que devolver). La garantía de devolución en el plan de pago está escrita pero oculta en la landing hasta que Rafa la apruebe; no usarla en anuncios mientras tanto.
- **Urgencia legítima, tres fechas**: instala antes del 13 de noviembre (14 días de datos antes del Black Friday), contrata antes del 27 de noviembre (fin del bonus SLA), SLA hasta el 6 de enero. Frase: "Los eventos de hoy no se pueden medir mañana."
- **Titulares de anuncio derivados** (respetar límites de caracteres): "La Prueba de la Verdad del Black Friday" (39) · "The Black Friday Truth Test" (27) · "14 días. 1M de eventos. 0 €." (28) · "14 days. 1M events. €0." (23) · "Concilia GA4 contra tus pedidos" (31, recortar a 30) · "Reconcile GA4 against your orders" (33, recortar a 30: "Check GA4 against your orders" 29).

## 2. Audiencia y mercados

### 2.1 Perfil objetivo

- **Cargo:** CMO, Chief Marketing Officer, Director de Marketing Digital, Head of Digital, eCommerce Manager, Head of eCommerce, Head of Growth, Marketing Analytics Manager, Responsable de Analítica Digital.
- **Empresa:** europea, ingresos anuales de 10 M€ o más, con tienda online propia (Shopify Plus, Magento / Adobe Commerce, Salesforce Commerce Cloud, PrestaShop, headless).
- **Situación que lo hace comprador:** tiene GA4 con Consent Mode, o GA360, Adobe Analytics, Piwik PRO o Matomo, y ha tenido en el último año al menos una conversación incómoda sobre por qué los pedidos de la tienda no cuadran con los del informe, o por qué "Direct" y "(not set)" crecen cada trimestre.
- **Momento:** está cerrando el plan de inversión de Black Friday y Navidad y sabe que decidirá presupuesto de pago con datos incompletos.

### 2.2 Verticales prioritarias

Por orden de prioridad, a partir de los casos que podemos citar por nombre:

1. Hospitalidad y viajes con reserva directa (Palladium Hotel Group, Dreamplace Hotels).
2. Consumo directo al consumidor con suscripción (Incapto, café de especialidad, Shopify).
3. Moda y calzado online.
4. Electrónica de consumo y hogar.
5. Retail multimarca con tienda online propia.

### 2.3 Mercados e idioma de servicio

| Mercado | Idioma de anuncio | Landing | Prioridad | Nota |
|---|---|---|---|---|
| España | Español | /es/cuenta-gratis/ | 1 | Casos de cliente en español, ventaja de marca |
| Reino Unido | Inglés | /free-account/ | 1 | Mayor volumen de búsqueda en inglés |
| Alemania | Inglés | /free-account/ | 2 | TDDDG §25 sin excepción para analítica: mensaje de consentimiento fuerte |
| Francia | Inglés | /free-account/ | 2 | CNIL: la configuración exenta de Matomo pierde UTM y referrers |
| Países Bajos | Inglés | /free-account/ | 2 | Alta adopción de Shopify Plus, buen dominio del inglés |
| Italia | Inglés | /free-account/ | 3 | Volumen medio, CPC bajo |
| Portugal | Inglés | /free-account/ | 3 | Volumen bajo; se agrupa con España en Meta por proximidad de mercado |

Decisión de idioma: DE, FR, IT, NL y PT reciben anuncios en inglés. Un anuncio en alemán que aterriza en una página en inglés rompe la coherencia y penaliza la calidad; un anuncio en inglés que aterriza en inglés no. Cuando existan versiones nativas de la landing se abre una campaña por idioma y este documento se actualiza. En Google Ads, la segmentación de idioma de las campañas EN incluye inglés más el idioma local, porque el navegador de un CMO alemán suele estar en alemán aunque busque términos en inglés.

### 2.4 Exclusiones

- **Ubicaciones:** cualquier país fuera de los siete listados. Estados Unidos se excluye expresamente: el mensaje de consentimiento no aplica y el CPC es tres veces mayor.
- **Audiencias:** clientes actuales (lista de emails de cuentas activas subida a cada plataforma como exclusión), empleados, y visitantes que ya hayan copiado el prompt en los últimos 30 días (se les mueve a retargeting con mensaje de plan de pago).
- **Búsquedas:** empleo, formación, tutoriales, comparativas de herramientas ligeras de privacidad, soporte técnico de competidores. Lista completa en 4.4.
- **Emplazamientos:** en Meta, se desactivan Audience Network y los emplazamientos de vídeo in-stream. En LinkedIn, se desactiva LinkedIn Audience Network.
- **Empresas:** en LinkedIn se excluyen las empresas de menos de 51 empleados. Las agencias no se excluyen; el trade-off se explica en 6.2.

## 3. Convención de tracking

### 3.1 Esquema UTM

Todas las URLs de anuncio llevan cinco parámetros, en minúsculas, sin espacios, con guion bajo como separador interno y guion medio para separar conceptos dentro de un valor.

| Parámetro | Regla | Valores admitidos |
|---|---|---|
| utm_source | Plataforma | google, meta, linkedin |
| utm_medium | Tipo de compra | cpc (búsqueda), paid_social (Meta y LinkedIn), display (solo si se abre display) |
| utm_campaign | q4-2026-{objetivo}-{mercado}-{idioma} | Objetivo: free (cuenta gratuita), bf (oferta Black Friday), rt (retargeting), brand (protección de marca). Mercado: es, uk, de, fr, nl, it, pt, eu (multi-país). Idioma: en, es |
| utm_content | Identificador del anuncio o grupo | Google: nombre del grupo de anuncios. Meta y LinkedIn: concepto creativo más variante (p. ej. chart-incapto-v1) |
| utm_term | Palabra clave (Google) o audiencia (Meta, LinkedIn) | Google: {keyword} con inserción dinámica. Meta: cold-ga-interest, cold-shopify, broad-aplus, rt-30d. LinkedIn: jt-cmo, jt-ecom, doc-incapto, tl-founder |

Ejemplos completos:

- Google Search, España, grupo "consentless analytics":
  `https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-es-es&utm_content=consentless-analytics&utm_term={keyword}`
- Google Search, Reino Unido, grupo "ga4 consent mode":
  `https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-uk-en&utm_content=ga4-consent-mode&utm_term={keyword}`
- Meta, prospección fría, DE/FR/NL, creatividad del gráfico de Incapto:
  `https://sealmetrics.com/free-account/?utm_source=meta&utm_medium=paid_social&utm_campaign=q4-2026-free-eu-en&utm_content=chart-incapto-v1&utm_term=cold-ga-interest`
- Meta, retargeting, España, tarjeta de SLA Black Friday:
  `https://sealmetrics.com/es/cuenta-gratis/?utm_source=meta&utm_medium=paid_social&utm_campaign=q4-2026-bf-es-es&utm_content=sla-countdown-v1&utm_term=rt-30d`
- LinkedIn, anuncio de documento, Reino Unido:
  `https://sealmetrics.com/free-account/?utm_source=linkedin&utm_medium=paid_social&utm_campaign=q4-2026-free-uk-en&utm_content=doc-incapto-v1&utm_term=jt-cmo`

Google Ads mantiene además el autoetiquetado (gclid) activado para importar conversiones. No se sustituye el UTM por el gclid: Sealmetrics lee el UTM y el back-office reconcilia por él.

### 3.2 La landing se mide con Sealmetrics

La página lleva el píxel de Sealmetrics sin puerta de consentimiento, porque no usa cookies ni identificadores. Se registran cinco microconversiones, con estos nombres exactos (los mismos que ya dispara la landing):

| Microconversión | Cuándo se dispara | Uso |
|---|---|---|
| lp_cta_click | Clic en cualquier CTA principal de la página (botón "Open a free account" o equivalente ES) | Señal temprana de intención; conversión de aprendizaje |
| lp_prompt_copied | El visitante copia el prompt de instalación al portapapeles | Proxy más fiable de cuenta creada; conversión de optimización en Meta y LinkedIn |
| lp_pricing_click | Clic en el CTA "See plans and sign" / "Ver planes y contratar", que lleva a /pricing | Conversión secundaria; se importa con valor 499 |
| lp_demo_click | Clic en el enlace a /demo | Señal de cuenta grande; se importa como conversión secundaria sin valor |
| lp_case_click | Clic en uno de los dos teasers de caso (Palladium, Incapto) | Solo observación; mide qué prueba interesa más y alimenta la elección de creatividad, no se importa a ninguna plataforma |

La conversión real, **cuenta Agentic creada**, no ocurre en la landing: ocurre en Claude, cuando el prompt termina de ejecutarse. Se reconcilia cada lunes desde el back-office de Sealmetrics cruzando fecha de creación, idioma de cuenta y país con los UTM registrados en lp_prompt_copied de la semana anterior.

### 3.3 Qué se importa como conversión en cada plataforma

| Plataforma | Conversión primaria (optimización) | Secundarias (observación) | Método |
|---|---|---|---|
| Google Ads | lp_prompt_copied (semanas 1 a 3), después cuenta creada por importación offline | lp_cta_click, lp_pricing_click (valor 499), lp_demo_click | Etiqueta de Google Ads bajo consentimiento para las micro; importación de conversiones offline con gclid para cuenta creada, subida semanal en CSV |
| Meta Ads | Conversión personalizada sobre lp_prompt_copied | lp_cta_click, lp_pricing_click | Píxel de Meta + API de conversiones, ambos bajo consentimiento; cuenta creada se sube semanalmente como conversión offline |
| LinkedIn Ads | Conversión de sitio web sobre lp_prompt_copied | lp_cta_click, lp_pricing_click | Insight Tag bajo consentimiento; cuenta creada se sube como conversión offline por email cifrado (hash) |

Regla de reconciliación: la cifra que manda es la del back-office. Si la suma de conversiones de las tres plataformas supera en más de un 20% las cuentas reales creadas, se está sobreatribuyendo (habitual en Meta con la ventana de 7 días de clic) y se recorta la ventana a 1 día de clic.

### 3.4 Consentimiento en la landing

- **Sealmetrics** no necesita puerta de consentimiento: sin cookies, sin identificadores, diseñado para el RGPD desde la arquitectura. Registra lp_* para todo visitante.
- **Google Ads, Meta y LinkedIn** sí la necesitan. Sus etiquetas se cargan únicamente tras el consentimiento del banner. Consecuencia esperada, y es el argumento de la propia página: las plataformas verán entre el 50% y el 70% de las microconversiones que ve Sealmetrics. Esta diferencia se anota cada semana en el informe (sección 8.2) y se utiliza como prueba pública del argumento comercial.
- Google Ads se configura con Consent Mode v2 para recibir modelado de conversiones; aun así, la cuenta creada importada desde el back-office es la cifra de referencia.

## 4. Google Ads

### 4.1 Estructura de cuenta

Solo campañas de Búsqueda en el lanzamiento. Una campaña por combinación de mercado e idioma, con los mismos siete grupos de anuncios en cada una, para que el presupuesto y la puja se controlen por país sin fragmentar el copy.

| Campaña | Mercado | Idioma de anuncio | Idiomas de segmentación | Landing |
|---|---|---|---|---|
| SEA-ES-es | España | Español | Español | /es/cuenta-gratis/ |
| SEA-UK-en | Reino Unido | Inglés | Inglés | /free-account/ |
| SEA-DE-en | Alemania | Inglés | Inglés, alemán | /free-account/ |
| SEA-FR-en | Francia | Inglés | Inglés, francés | /free-account/ |
| SEA-NL-en | Países Bajos | Inglés | Inglés, neerlandés | /free-account/ |
| SEA-IT-en | Italia | Inglés | Inglés, italiano | /free-account/ |
| SEA-PT-en | Portugal | Inglés | Inglés, portugués | /free-account/ |
| SEA-BRAND-all | Los siete | Inglés y español | Todos | Landing por idioma |

Grupos de anuncios (idénticos en cada campaña de mercado):

| Grupo | Intención | Mensaje dominante |
|---|---|---|
| cookieless-analytics | Busca la categoría | La categoría existe y hay una cuenta gratuita para probarla |
| consentless-analytics | Busca medir sin banner | Sin cookies, sin puerta de consentimiento, sin visitas perdidas por rechazo |
| matomo-alternative | Tiene Matomo o lo evalúa | El modo exento de la CNIL le quita UTM y referrers |
| ga4-consent-mode | Tiene GA4 y sufre Consent Mode | Consent Mode modela lo que no ve; Incapto vio un 29% menos de visitas |
| piwik-pro-alternative | Evalúa Piwik PRO | Misma liga enterprise, sin puerta de consentimiento, precio de plan publicado |
| black-friday-analytics | Prepara la campaña | Tiempo real sin muestreo en todos los planes; SLA Enterprise si firma antes del 27 nov |
| brand (campaña aparte) | Busca Sealmetrics | Protección de marca y de la oferta |

La campaña de marca va aparte porque su CPA es un orden de magnitud menor y contaminaría la puja automática de las demás.

### 4.2 Palabras clave

Concordancia exacta y de frase únicamente. Nada de amplia en el lanzamiento: el volumen de la categoría es bajo y la amplia lo rellena con búsquedas de empleo, formación y herramientas de otra categoría.

**Grupo cookieless-analytics (EN)**

```
[cookieless analytics]
[cookieless web analytics]
[cookieless analytics platform]
[cookie free analytics]
[cookieless tracking]
[analytics without cookies]
"cookieless analytics ecommerce"
"cookieless analytics tool"
"cookieless analytics software"
"cookieless website analytics"
```

**Grupo cookieless-analytics (ES)**

```
[analitica sin cookies]
[analitica web sin cookies]
[herramienta analitica sin cookies]
[medicion sin cookies]
[tracking sin cookies]
"analitica sin cookies ecommerce"
"analytics sin cookies"
"plataforma analitica sin cookies"
```

**Grupo consentless-analytics (EN)**

```
[consentless analytics]
[consent free analytics]
[analytics without consent]
[analytics without cookie banner]
[analytics no consent banner]
[privacy first web analytics]
"analytics without consent banner"
"web analytics no cookie consent"
"consent exempt analytics"
"analytics exempt from consent"
```

**Grupo consentless-analytics (ES)**

```
[analitica sin consentimiento]
[analitica sin banner de cookies]
[medir sin consentimiento]
[analytics sin consentimiento]
[analitica exenta de consentimiento]
"analitica web sin consentimiento"
"medicion sin banner de cookies"
"analitica sin aviso de cookies"
```

**Grupo matomo-alternative (EN)**

```
[matomo alternative]
[matomo alternatives]
[alternative to matomo]
[matomo vs]
[matomo competitors]
"matomo alternative ecommerce"
"matomo without consent"
"matomo consent exemption"
"matomo cnil"
"matomo cookieless"
```

**Grupo matomo-alternative (ES)**

```
[alternativa a matomo]
[alternativas a matomo]
[matomo alternativa]
[matomo vs]
"matomo sin consentimiento"
"matomo sin cookies"
"matomo competidores"
```

**Grupo ga4-consent-mode (EN)**

```
[ga4 consent mode]
[google consent mode v2]
[consent mode data loss]
[ga4 alternative]
[google analytics alternative]
[ga4 alternative ecommerce]
[ga4 missing data]
[ga4 data discrepancy]
"ga4 consent mode data"
"ga4 not tracking all traffic"
"google analytics missing conversions"
"ga4 direct traffic increase"
"ga4 unassigned traffic"
"ga4 not set channel"
"google analytics 360 alternative"
```

**Grupo ga4-consent-mode (ES)**

```
[ga4 consent mode]
[consent mode v2]
[alternativa a ga4]
[alternativa a google analytics]
[ga4 pierde datos]
[ga4 datos incompletos]
"ga4 consent mode datos"
"ga4 trafico directo aumenta"
"ga4 no atribuido"
"ga4 unassigned"
"google analytics pierde conversiones"
"alternativa google analytics 360"
```

**Grupo piwik-pro-alternative (EN)**

```
[piwik pro alternative]
[piwik pro alternatives]
[piwik pro vs]
[piwik pro pricing]
[piwik pro competitors]
"piwik pro cookieless"
"piwik pro consent"
"piwik pro ecommerce"
```

**Grupo piwik-pro-alternative (ES)**

```
[alternativa a piwik pro]
[piwik pro alternativa]
[piwik pro precio]
[piwik pro vs]
"piwik pro sin consentimiento"
```

**Grupo black-friday-analytics (EN)**

```
[black friday analytics]
[black friday web analytics]
[real time ecommerce analytics]
[real time analytics no sampling]
[ga4 sampling black friday]
[ga4 data thresholding]
"analytics for black friday"
"ecommerce analytics peak traffic"
"ga4 sampled data"
"ga4 thresholding"
```

**Grupo black-friday-analytics (ES)**

```
[analitica black friday]
[analitica tiempo real ecommerce]
[ga4 muestreo]
[ga4 datos muestreados]
[ga4 umbral de datos]
"analitica para black friday"
"analitica ecommerce tiempo real"
"ga4 sampling"
```

**Campaña brand (EN y ES)**

```
[sealmetrics]
[seal metrics]
[sealmetrics analytics]
[sealmetrics pricing]
[sealmetrics free account]
[sealmetrics cuenta gratis]
[sealmetrics precio]
"sealmetrics"
```

### 4.3 Ampliación de palabras clave

Cada lunes se revisa el informe de términos de búsqueda. Un término entra como exacta nueva si ha generado al menos un lp_prompt_copied o dos lp_cta_click en la semana. Un término entra como negativa si ha gastado más de 30 € sin ningún lp_cta_click, o si contiene cualquiera de las señales de la lista 4.4.

### 4.4 Negativas

Lista negativa compartida a nivel de cuenta, aplicada a todas las campañas de Búsqueda:

```
job, jobs, career, careers, salary, hiring, vacancy, internship, empleo, trabajo, oferta de empleo, salario, becas
tutorial, course, courses, training, certification, certificate, curso, cursos, formación, certificación, academy, udemy, coursera
free pdf, pdf, ebook, template, plantilla, whitepaper download, cheat sheet
definition, meaning, what is, que es, qué es, significado, wikipedia
plausible, fathom, simple analytics, umami, cabin, pirsch, counter dev, goatcounter
matomo login, matomo download, matomo install, matomo docker, matomo plugin, matomo wordpress plugin, matomo self hosted, matomo on premise, matomo pricing
piwik pro login, piwik pro download, piwik pro documentation, piwik pro api
ga4 login, ga4 tutorial, ga4 certification, ga4 exam, ga4 setup guide, ga4 course, ga4 property, ga4 bigquery export tutorial
google tag manager tutorial, gtm tutorial, gtm course
open source, opensource, github, self hosted, self-hosted, código abierto, autoalojado
adobe analytics login, adobe analytics tutorial, adobe analytics certification
seal, seals, sealing, sealant, sealer, marine
metrics dashboard template, kpi template
```

Justificación de dos entradas que suelen discutirse:

- **open source / self hosted:** quien busca esto quiere operar la herramienta él mismo. No es nuestro comprador y nos lleva a competir con Matomo en su terreno.
- **matomo pricing y piwik pro pricing:** parece intención de compra, pero en la práctica es un usuario que ya ha decidido el proveedor y compara planes. El CPA histórico de ese término en categorías análogas es tres veces el del término "alternative". Se excluye en el lanzamiento y se revisa en la semana 6 con datos propios.

### 4.5 Puja

| Fase | Estrategia | Condición de cambio |
|---|---|---|
| Semanas 1 a 3 | Maximizar conversiones sin CPA objetivo, conversión primaria lp_prompt_copied | Al acumular 30 conversiones en 30 días en la campaña |
| Desde la semana 4 | Maximizar conversiones con CPA objetivo, empezando en el CPA real observado más un 15% | Cada dos semanas se baja el CPA objetivo un 10% hasta llegar a 45 € por prompt copiado |
| Desde la semana 6, si hay 30 cuentas creadas importadas | Se cambia la conversión primaria a cuenta creada (importación offline) con CPA objetivo 150 €, después 120 € | La conversión lp_prompt_copied pasa a secundaria |
| Campaña brand | CPC manual mejorado, puja máxima 1,50 € | No cambia |

Durante Black Friday (del 20 al 30 de noviembre) el CPA objetivo se sube un 25% en los grupos ga4-consent-mode y black-friday-analytics para no perder subasta en la semana de mayor intención.

### 4.6 Presupuestos diarios por mercado (base: 15.000 €/mes en total, 6.000 € para Google)

| Campaña | Presupuesto diario | Mensual aprox. | Motivo |
|---|---|---|---|
| SEA-ES-es | 60 € | 1.800 € | Idioma nativo, casos de cliente nacionales, mejor CPA esperado |
| SEA-UK-en | 55 € | 1.650 € | Mayor volumen de búsqueda de la categoría en inglés |
| SEA-DE-en | 30 € | 900 € | TDDDG sin excepción: alta intención en consentimiento |
| SEA-FR-en | 22 € | 660 € | CNIL y la exención de Matomo dan un ángulo claro |
| SEA-NL-en | 15 € | 450 € | Volumen bajo, CPC contenido |
| SEA-IT-en | 8 € | 240 € | Exploratorio |
| SEA-PT-en | 5 € | 150 € | Exploratorio |
| SEA-BRAND-all | 5 € | 150 € | Protección |

Los presupuestos se reasignan cada semana desde las campañas con CPA por encima del doble del objetivo hacia las que están por debajo, en tramos del 20% para no reiniciar el aprendizaje.

### 4.7 Anuncios de búsqueda adaptables (RSA)

Dos RSA por grupo. El RSA A abre con el dolor y la prueba; el RSA B abre con la oferta y la instalación. Los titulares marcados "fijado 1" son las opciones para la posición 1: se fijan dos o tres por anuncio (Google rota entre los fijados a la misma posición), nunca uno solo, para conservar la calificación "Buena" o "Excelente" de eficacia. Los titulares de posición 2 y 3 no se fijan. Cada anuncio lleva 15 titulares (límite 30 caracteres) y 4 descripciones (límite 90). El recuento de caracteres aparece junto a cada línea.

#### 4.7.1 cookieless-analytics, RSA A (dolor y prueba)

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | Cookieless Analytics | 20 | Analítica sin cookies | 21 |
| H2 fijado 1 | Cookieless eCommerce Analytics | 30 | eCommerce sin cookies | 21 |
| H3 fijado 1 | Up to Half Your Traffic, Lost | 29 | Hasta la mitad de tu tráfico | 28 |
| H4 | Paid Channels Lose the Most | 27 | Pago: el canal que más pierde | 29 |
| H5 | Incapto: GA4 Missed 29% | 23 | Incapto: GA4 perdió el 29% | 26 |
| H6 | +52% Paid Traffic vs GA4 | 24 | +52% tráfico de pago vs GA4 | 27 |
| H7 | A Third of Sales, No Channel | 28 | Un tercio de ventas sin canal | 29 |
| H8 | Compare on Your Own Site | 24 | Compáralo en tu propia web | 26 |
| H9 | 1M Events Free, No Card | 23 | 1M eventos gratis, sin tarjeta | 30 |
| H10 | Open a Free Account | 19 | Abre una cuenta gratis | 22 |
| H11 | No Cookies, No Consent Gate | 27 | Sin cookies ni consentimiento | 29 |
| H12 | EU-Hosted in Dublin | 19 | Alojado en la UE, en Dublín | 27 |
| H13 | Last-Click on Complete Data | 27 | Last-click con datos completos | 30 |
| H14 | Made for CMOs and eCommerce | 27 | Para CMOs y eCommerce managers | 30 |
| H15 | Sealmetrics | 11 | Sealmetrics | 11 |
| D1 | Behind a consent banner analytics misses up to half your traffic. Compare on your site. | 87 | Tras el banner, tu analítica pierde hasta la mitad del tráfico. Compruébalo en tu web. | 86 |
| D2 | Incapto: GA4 saw 29% fewer visits than Sealmetrics over 48 days. Paid channels lost most. | 89 | Incapto vio un 29% menos de visitas en GA4 que en Sealmetrics en 48 días. Pago perdió más. | 90 |
| D3 | Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery. | 87 | Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API. | 89 |
| D4 | No cookies, no consent gate, EU-hosted in Dublin. Last-click attribution on complete data. | 90 | Sin cookies ni consentimiento, alojado en Dublín. Last-click sobre datos completos. | 83 |

#### 4.7.2 cookieless-analytics, RSA B (oferta e instalación)

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | 1M Events Free, No Card | 23 | 1M eventos gratis, sin tarjeta | 30 |
| H2 fijado 1 | Cookieless Analytics, Free | 26 | Analítica sin cookies, gratis | 29 |
| H3 fijado 1 | Open a Free Account | 19 | Abre una cuenta gratis | 22 |
| H4 | Set Up From Claude in Minutes | 29 | Configúrala desde Claude | 24 |
| H5 | Install in 5 to 30 Minutes | 26 | Instalación en 5 a 30 minutos | 29 |
| H6 | Nothing to Cancel, Ever | 23 | Nada que cancelar | 17 |
| H7 | MCP, API and BigQuery Included | 30 | MCP, API y BigQuery incluidos | 29 |
| H8 | Compare on Your Own Site | 24 | Compáralo en tu propia web | 26 |
| H9 | Up to Half Your Traffic, Lost | 29 | Hasta la mitad de tu tráfico | 28 |
| H10 | No Cookies, No Consent Gate | 27 | Sin cookies ni consentimiento | 29 |
| H11 | 1.1 KB Pixel, 132x Lighter | 26 | 132 veces más ligero que GA4 | 28 |
| H12 | Black Friday Enterprise SLA | 27 | SLA Enterprise en Black Friday | 30 |
| H13 | Sign Before 27 November | 23 | Contrata antes del 27 nov | 25 |
| H14 | Plans From 499 €/Month | 22 | Planes desde 499 €/mes | 22 |
| H15 | Sealmetrics Analytics | 21 | Sealmetrics Analytics | 21 |
| D1 | One prompt in Claude installs the MCP, creates the account and generates the pixels. | 84 | Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti. | 86 |
| D2 | Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery. | 87 | Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API. | 89 |
| D3 | Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA. | 90 | Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise. | 90 |
| D4 | Behind a consent banner analytics misses up to half your traffic. Compare on your site. | 87 | Tras el banner, tu analítica pierde hasta la mitad del tráfico. Compruébalo en tu web. | 86 |

#### 4.7.3 consentless-analytics, RSA A

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | Analytics Without Consent | 25 | Analítica sin consentimiento | 28 |
| H2 fijado 1 | No Cookies, No Consent Gate | 27 | Sin cookies ni consentimiento | 29 |
| H3 fijado 1 | Up to Half Your Traffic, Lost | 29 | Hasta la mitad de tu tráfico | 28 |
| H4 | No Visits Lost to Rejection | 27 | No pierdas visitas al rechazar | 30 |
| H5 | Keep Your UTMs Without Consent | 30 | Conserva tus UTM sin banner | 27 |
| H6 | Paid Channels Lose the Most | 27 | Pago: el canal que más pierde | 29 |
| H7 | Incapto: GA4 Missed 29% | 23 | Incapto: GA4 perdió el 29% | 26 |
| H8 | Designed for GDPR From Day One | 30 | Diseñado para el RGPD | 21 |
| H9 | EU-Hosted in Dublin | 19 | Alojado en la UE, en Dublín | 27 |
| H10 | 1M Events Free, No Card | 23 | 1M eventos gratis, sin tarjeta | 30 |
| H11 | Open a Free Account | 19 | Abre una cuenta gratis | 22 |
| H12 | Compare on Your Own Site | 24 | Compáralo en tu propia web | 26 |
| H13 | Aggregate, Anonymous Data | 25 | Datos agregados y anónimos | 26 |
| H14 | Last-Click on Complete Data | 27 | Last-click con datos completos | 30 |
| H15 | Sealmetrics | 11 | Sealmetrics | 11 |
| D1 | No cookies, no consent gate, EU-hosted in Dublin. Last-click attribution on complete data. | 90 | Sin cookies ni consentimiento, alojado en Dublín. Last-click sobre datos completos. | 83 |
| D2 | Behind a consent banner analytics misses up to half your traffic. Compare on your site. | 87 | Tras el banner, tu analítica pierde hasta la mitad del tráfico. Compruébalo en tu web. | 86 |
| D3 | Aggregate, anonymous data, designed for GDPR from the architecture up. No user tracking. | 88 | Medición agregada y anónima, diseñada para el RGPD desde la arquitectura. Sin tracking. | 87 |
| D4 | Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery. | 87 | Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API. | 89 |

#### 4.7.4 consentless-analytics, RSA B

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | Measure Without a Banner | 24 | Mide sin banner de cookies | 26 |
| H2 fijado 1 | 1M Events Free, No Card | 23 | 1M eventos gratis, sin tarjeta | 30 |
| H3 fijado 1 | Analytics Without Consent | 25 | Analítica sin consentimiento | 28 |
| H4 | Set Up From Claude in Minutes | 29 | Configúrala desde Claude | 24 |
| H5 | Open a Free Account | 19 | Abre una cuenta gratis | 22 |
| H6 | Nothing to Cancel, Ever | 23 | Nada que cancelar | 17 |
| H7 | Keep Your UTMs Without Consent | 30 | Conserva tus UTM sin banner | 27 |
| H8 | Referrers Kept, Not Truncated | 29 | Referrers completos | 19 |
| H9 | No Cookies, No Consent Gate | 27 | Sin cookies ni consentimiento | 29 |
| H10 | Install in 5 to 30 Minutes | 26 | Instalación en 5 a 30 minutos | 29 |
| H11 | MCP, API and BigQuery Included | 30 | MCP, API y BigQuery incluidos | 29 |
| H12 | Black Friday Enterprise SLA | 27 | SLA Enterprise en Black Friday | 30 |
| H13 | Sign Before 27 November | 23 | Contrata antes del 27 nov | 25 |
| H14 | Made for CMOs and eCommerce | 27 | Para CMOs y eCommerce managers | 30 |
| H15 | Sealmetrics Analytics | 21 | Sealmetrics Analytics | 21 |
| D1 | One prompt in Claude installs the MCP, creates the account and generates the pixels. | 84 | Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti. | 86 |
| D2 | No cookies, no consent gate, EU-hosted in Dublin. Last-click attribution on complete data. | 90 | Sin cookies ni consentimiento, alojado en Dublín. Last-click sobre datos completos. | 83 |
| D3 | Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery. | 87 | Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API. | 89 |
| D4 | Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA. | 90 | Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise. | 90 |

#### 4.7.5 matomo-alternative, RSA A

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | Matomo Alternative | 18 | Alternativa a Matomo | 20 |
| H2 fijado 1 | Matomo Alternative, No Banner | 29 | Alternativa Matomo sin banner | 29 |
| H3 fijado 1 | Keep Your UTMs Without Consent | 30 | Conserva tus UTM sin banner | 27 |
| H4 | Exempt Matomo Drops Your UTMs | 29 | Matomo exento pierde tus UTM | 28 |
| H5 | Referrers Kept, Not Truncated | 29 | Referrers completos | 19 |
| H6 | eCommerce Tracking Stays On | 27 | eCommerce tracking activo | 25 |
| H7 | No Cookies, No Consent Gate | 27 | Sin cookies ni consentimiento | 29 |
| H8 | Up to Half Your Traffic, Lost | 29 | Hasta la mitad de tu tráfico | 28 |
| H9 | EU-Hosted in Dublin | 19 | Alojado en la UE, en Dublín | 27 |
| H10 | 1M Events Free, No Card | 23 | 1M eventos gratis, sin tarjeta | 30 |
| H11 | Open a Free Account | 19 | Abre una cuenta gratis | 22 |
| H12 | Compare on Your Own Site | 24 | Compáralo en tu propia web | 26 |
| H13 | Last-Click on Complete Data | 27 | Last-click con datos completos | 30 |
| H14 | Nothing to Host or Patch | 24 | Nada que alojar ni actualizar | 29 |
| H15 | Sealmetrics | 11 | Sealmetrics | 11 |
| D1 | Matomo's consent-exempt mode strips UTMs and cuts referrers. Keep both without a banner. | 88 | El modo exento de Matomo elimina UTM y recorta referrers. Conserva ambos sin banner. | 84 |
| D2 | The CNIL exemption also recommends disabling eCommerce tracking. Sealmetrics keeps it on. | 89 | La exención de la CNIL recomienda apagar el eCommerce tracking. Sealmetrics lo mantiene. | 88 |
| D3 | Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery. | 87 | Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API. | 89 |
| D4 | No cookies, no consent gate, EU-hosted in Dublin. Last-click attribution on complete data. | 90 | Sin cookies ni consentimiento, alojado en Dublín. Last-click sobre datos completos. | 83 |

#### 4.7.6 matomo-alternative, RSA B

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | Matomo Alternative, Free Tier | 29 | Alternativa a Matomo, gratis | 28 |
| H2 fijado 1 | 1M Events Free, No Card | 23 | 1M eventos gratis, sin tarjeta | 30 |
| H3 fijado 1 | Matomo Alternative | 18 | Alternativa a Matomo | 20 |
| H4 | Set Up From Claude in Minutes | 29 | Configúrala desde Claude | 24 |
| H5 | Open a Free Account | 19 | Abre una cuenta gratis | 22 |
| H6 | Nothing to Host or Patch | 24 | Nada que alojar ni actualizar | 29 |
| H7 | Keep Your UTMs Without Consent | 30 | Conserva tus UTM sin banner | 27 |
| H8 | MCP, API and BigQuery Included | 30 | MCP, API y BigQuery incluidos | 29 |
| H9 | Compare on Your Own Site | 24 | Compáralo en tu propia web | 26 |
| H10 | No Cookies, No Consent Gate | 27 | Sin cookies ni consentimiento | 29 |
| H11 | 1.1 KB Pixel, 132x Lighter | 26 | 132 veces más ligero que GA4 | 28 |
| H12 | Black Friday Enterprise SLA | 27 | SLA Enterprise en Black Friday | 30 |
| H13 | Sign Before 27 November | 23 | Contrata antes del 27 nov | 25 |
| H14 | Plans From 499 €/Month | 22 | Planes desde 499 €/mes | 22 |
| H15 | Sealmetrics Analytics | 21 | Sealmetrics Analytics | 21 |
| D1 | One prompt in Claude installs the MCP, creates the account and generates the pixels. | 84 | Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti. | 86 |
| D2 | Matomo's consent-exempt mode strips UTMs and cuts referrers. Keep both without a banner. | 88 | El modo exento de Matomo elimina UTM y recorta referrers. Conserva ambos sin banner. | 84 |
| D3 | Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery. | 87 | Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API. | 89 |
| D4 | Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA. | 90 | Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise. | 90 |

#### 4.7.7 ga4-consent-mode, RSA A

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | Consent Mode Hides Your Sales | 29 | Consent Mode oculta ventas | 26 |
| H2 fijado 1 | GA4 Alternative for eCommerce | 29 | Alternativa a GA4 en eCommerce | 30 |
| H3 fijado 1 | Up to Half Your Traffic, Lost | 29 | Hasta la mitad de tu tráfico | 28 |
| H4 | Incapto: GA4 Missed 29% | 23 | Incapto: GA4 perdió el 29% | 26 |
| H5 | +52% Paid Traffic vs GA4 | 24 | +52% tráfico de pago vs GA4 | 27 |
| H6 | 14% Unknown in GA4, 0.3% Here | 29 | Sin origen: 14% GA4, 0,3% aquí | 30 |
| H7 | A Third of Sales, No Channel | 28 | Un tercio de ventas sin canal | 29 |
| H8 | Paid Channels Lose the Most | 27 | Pago: el canal que más pierde | 29 |
| H9 | Modelled Data Is Not Data | 25 | Un dato modelado no es un dato | 30 |
| H10 | No Cookies, No Consent Gate | 27 | Sin cookies ni consentimiento | 29 |
| H11 | 1M Events Free, No Card | 23 | 1M eventos gratis, sin tarjeta | 30 |
| H12 | Compare on Your Own Site | 24 | Compáralo en tu propia web | 26 |
| H13 | Run Both, Then Decide | 21 | Usa las dos y decide | 20 |
| H14 | EU-Hosted in Dublin | 19 | Alojado en la UE, en Dublín | 27 |
| H15 | Sealmetrics | 11 | Sealmetrics | 11 |
| D1 | Consent Mode models what it cannot see. Measure what you pay for, no cookies, no consent. | 89 | Consent Mode modela lo que no ve. Mide lo que pagas sin cookies ni consentimiento. | 82 |
| D2 | Incapto: GA4 saw 29% fewer visits than Sealmetrics over 48 days. Paid channels lost most. | 89 | Incapto vio un 29% menos de visitas en GA4 que en Sealmetrics en 48 días. Pago perdió más. | 90 |
| D3 | Behind a consent banner analytics misses up to half your traffic. Compare on your site. | 87 | Tras el banner, tu analítica pierde hasta la mitad del tráfico. Compruébalo en tu web. | 86 |
| D4 | Free Agentic account: 1M events in total, no card. Keep GA4 and compare side by side. | 85 | Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta. Mantén GA4 y compara. | 81 |

#### 4.7.8 ga4-consent-mode, RSA B

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | GA4 Alternative, Free Tier | 26 | Alternativa a GA4, gratis | 25 |
| H2 fijado 1 | 1M Events Free, No Card | 23 | 1M eventos gratis, sin tarjeta | 30 |
| H3 fijado 1 | Consent Mode Hides Your Sales | 29 | Consent Mode oculta ventas | 26 |
| H4 | Set Up From Claude in Minutes | 29 | Configúrala desde Claude | 24 |
| H5 | Open a Free Account | 19 | Abre una cuenta gratis | 22 |
| H6 | Run Both, Then Decide | 21 | Usa las dos y decide | 20 |
| H7 | No Sampling, No Thresholds | 26 | Sin muestreo ni umbrales | 24 |
| H8 | Real-Time Reports, No Sampling | 30 | Tiempo real sin muestreo | 24 |
| H9 | MCP, API and BigQuery Included | 30 | MCP, API y BigQuery incluidos | 29 |
| H10 | Compare on Your Own Site | 24 | Compáralo en tu propia web | 26 |
| H11 | 1.1 KB Pixel, 132x Lighter | 26 | 132 veces más ligero que GA4 | 28 |
| H12 | Black Friday Enterprise SLA | 27 | SLA Enterprise en Black Friday | 30 |
| H13 | Sign Before 27 November | 23 | Contrata antes del 27 nov | 25 |
| H14 | Plans From 499 €/Month | 22 | Planes desde 499 €/mes | 22 |
| H15 | Sealmetrics Analytics | 21 | Sealmetrics Analytics | 21 |
| D1 | One prompt in Claude installs the MCP, creates the account and generates the pixels. | 84 | Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti. | 86 |
| D2 | Consent Mode models what it cannot see. Measure what you pay for, no cookies, no consent. | 89 | Consent Mode modela lo que no ve. Mide lo que pagas sin cookies ni consentimiento. | 82 |
| D3 | Free Agentic account: 1M events in total, no card. Keep GA4 and compare side by side. | 85 | Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta. Mantén GA4 y compara. | 81 |
| D4 | Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA. | 90 | Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise. | 90 |

#### 4.7.9 piwik-pro-alternative, RSA A

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | Piwik PRO Alternative | 21 | Alternativa a Piwik PRO | 23 |
| H2 fijado 1 | Enterprise Analytics, No Gate | 29 | Nivel enterprise, sin banner | 28 |
| H3 fijado 1 | No Cookies, No Consent Gate | 27 | Sin cookies ni consentimiento | 29 |
| H4 | Published Plans From 499 € | 26 | Planes públicos desde 499 € | 27 |
| H5 | Up to Half Your Traffic, Lost | 29 | Hasta la mitad de tu tráfico | 28 |
| H6 | No Visits Lost to Rejection | 27 | No pierdas visitas al rechazar | 30 |
| H7 | EU-Hosted in Dublin | 19 | Alojado en la UE, en Dublín | 27 |
| H8 | Last-Click on Complete Data | 27 | Last-click con datos completos | 30 |
| H9 | Real-Time Reports, No Sampling | 30 | Tiempo real sin muestreo | 24 |
| H10 | 1M Events Free, No Card | 23 | 1M eventos gratis, sin tarjeta | 30 |
| H11 | Open a Free Account | 19 | Abre una cuenta gratis | 22 |
| H12 | Compare on Your Own Site | 24 | Compáralo en tu propia web | 26 |
| H13 | Paid Channels Lose the Most | 27 | Pago: el canal que más pierde | 29 |
| H14 | Made for CMOs and eCommerce | 27 | Para CMOs y eCommerce managers | 30 |
| H15 | Sealmetrics | 11 | Sealmetrics | 11 |
| D1 | Same enterprise league, no consent gate: no visits lost to rejection, EU-hosted in Dublin. | 90 | Misma liga enterprise, sin puerta de consentimiento ni visitas perdidas. En Dublín. | 83 |
| D2 | Behind a consent banner analytics misses up to half your traffic. Compare on your site. | 87 | Tras el banner, tu analítica pierde hasta la mitad del tráfico. Compruébalo en tu web. | 86 |
| D3 | Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery. | 87 | Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API. | 89 |
| D4 | Growth 499 €/month, Scale 899 €/month, billed annually. See plans and sign on the page. | 87 | Growth 499 €/mes, Scale 899 €/mes, facturación anual. Ver planes y contratar en la página. | 90 |

#### 4.7.10 piwik-pro-alternative, RSA B

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | Piwik PRO Alternative, Free | 27 | Alternativa a Piwik PRO gratis | 30 |
| H2 fijado 1 | 1M Events Free, No Card | 23 | 1M eventos gratis, sin tarjeta | 30 |
| H3 fijado 1 | Piwik PRO Alternative | 21 | Alternativa a Piwik PRO | 23 |
| H4 | Set Up From Claude in Minutes | 29 | Configúrala desde Claude | 24 |
| H5 | Open a Free Account | 19 | Abre una cuenta gratis | 22 |
| H6 | Nothing to Cancel, Ever | 23 | Nada que cancelar | 17 |
| H7 | MCP, API and BigQuery Included | 30 | MCP, API y BigQuery incluidos | 29 |
| H8 | Published Plans From 499 € | 26 | Planes públicos desde 499 € | 27 |
| H9 | No Cookies, No Consent Gate | 27 | Sin cookies ni consentimiento | 29 |
| H10 | Install in 5 to 30 Minutes | 26 | Instalación en 5 a 30 minutos | 29 |
| H11 | Compare on Your Own Site | 24 | Compáralo en tu propia web | 26 |
| H12 | Black Friday Enterprise SLA | 27 | SLA Enterprise en Black Friday | 30 |
| H13 | Sign Before 27 November | 23 | Contrata antes del 27 nov | 25 |
| H14 | EU-Hosted in Dublin | 19 | Alojado en la UE, en Dublín | 27 |
| H15 | Sealmetrics Analytics | 21 | Sealmetrics Analytics | 21 |
| D1 | One prompt in Claude installs the MCP, creates the account and generates the pixels. | 84 | Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti. | 86 |
| D2 | Same enterprise league, no consent gate: no visits lost to rejection, EU-hosted in Dublin. | 90 | Misma liga enterprise, sin puerta de consentimiento ni visitas perdidas. En Dublín. | 83 |
| D3 | Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery. | 87 | Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API. | 89 |
| D4 | Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA. | 90 | Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise. | 90 |

#### 4.7.11 black-friday-analytics, RSA A

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | Black Friday Enterprise SLA | 27 | SLA Enterprise en Black Friday | 30 |
| H2 fijado 1 | Real-Time Reports, No Sampling | 30 | Tiempo real sin muestreo | 24 |
| H3 fijado 1 | Analytics for Black Friday | 26 | Analítica para Black Friday | 27 |
| H4 | Sign Before 27 November | 23 | Contrata antes del 27 nov | 25 |
| H5 | SLA Enterprise Until 6 Jan | 26 | SLA Enterprise hasta el 6 ene | 29 |
| H6 | 99.9% Uptime, Service Credits | 29 | 99,9% disponibilidad, créditos | 30 |
| H7 | Priority Support at Peak | 24 | Soporte prioritario en pico | 27 |
| H8 | No Sampling, No Thresholds | 26 | Sin muestreo ni umbrales | 24 |
| H9 | Up to Half Your Traffic, Lost | 29 | Hasta la mitad de tu tráfico | 28 |
| H10 | Paid Channels Lose the Most | 27 | Pago: el canal que más pierde | 29 |
| H11 | No Cookies, No Consent Gate | 27 | Sin cookies ni consentimiento | 29 |
| H12 | Plans From 499 €/Month | 22 | Planes desde 499 €/mes | 22 |
| H13 | We Gift the First 1M Events | 27 | Te regalamos 1M de eventos | 26 |
| H14 | Install in 5 to 30 Minutes | 26 | Instalación en 5 a 30 minutos | 29 |
| H15 | Sealmetrics | 11 | Sealmetrics | 11 |
| D1 | Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA. | 90 | Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise. | 90 |
| D2 | Real-time reports, no sampling at peak, every plan. Enterprise SLA if you sign by 27 Nov. | 89 | Tiempo real sin muestreo, todos los planes. SLA Enterprise si contratas antes del 27 nov. | 89 |
| D3 | 99.9% availability, service credits and priority support until 6 Jan, at your plan price. | 89 | 99,9% de disponibilidad, créditos de servicio y soporte prioritario hasta el 6 de enero. | 88 |
| D4 | Behind a consent banner analytics misses up to half your traffic. Compare on your site. | 87 | Tras el banner, tu analítica pierde hasta la mitad del tráfico. Compruébalo en tu web. | 86 |

#### 4.7.12 black-friday-analytics, RSA B

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | Ready Before Black Friday | 25 | Listo antes de Black Friday | 27 |
| H2 fijado 1 | Install in 5 to 30 Minutes | 26 | Instalación en 5 a 30 minutos | 29 |
| H3 fijado 1 | Black Friday Enterprise SLA | 27 | SLA Enterprise en Black Friday | 30 |
| H4 | 1M Events Free, No Card | 23 | 1M eventos gratis, sin tarjeta | 30 |
| H5 | Open a Free Account | 19 | Abre una cuenta gratis | 22 |
| H6 | Set Up From Claude in Minutes | 29 | Configúrala desde Claude | 24 |
| H7 | Compare on Your Own Site | 24 | Compáralo en tu propia web | 26 |
| H8 | Real-Time Reports, No Sampling | 30 | Tiempo real sin muestreo | 24 |
| H9 | Sign Before 27 November | 23 | Contrata antes del 27 nov | 25 |
| H10 | SLA Enterprise Until 6 Jan | 26 | SLA Enterprise hasta el 6 ene | 29 |
| H11 | 1.1 KB Pixel, 132x Lighter | 26 | 132 veces más ligero que GA4 | 28 |
| H12 | No Cookies, No Consent Gate | 27 | Sin cookies ni consentimiento | 29 |
| H13 | Plans From 499 €/Month | 22 | Planes desde 499 €/mes | 22 |
| H14 | EU-Hosted in Dublin | 19 | Alojado en la UE, en Dublín | 27 |
| H15 | Sealmetrics Analytics | 21 | Sealmetrics Analytics | 21 |
| D1 | One prompt in Claude installs the MCP, creates the account and generates the pixels. | 84 | Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti. | 86 |
| D2 | Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA. | 90 | Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise. | 90 |
| D3 | Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery. | 87 | Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API. | 89 |
| D4 | Real-time reports, no sampling at peak, every plan. Enterprise SLA if you sign by 27 Nov. | 89 | Tiempo real sin muestreo, todos los planes. SLA Enterprise si contratas antes del 27 nov. | 89 |

#### 4.7.13 brand, RSA A

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | Sealmetrics | 11 | Sealmetrics | 11 |
| H2 fijado 1 | Sealmetrics Official Site | 25 | Sealmetrics, web oficial | 24 |
| H3 fijado 1 | Sealmetrics Free Account | 24 | Sealmetrics, cuenta gratis | 26 |
| H4 | 1M Events Free, No Card | 23 | 1M eventos gratis, sin tarjeta | 30 |
| H5 | Open a Free Account | 19 | Abre una cuenta gratis | 22 |
| H6 | Cookieless eCommerce Analytics | 30 | eCommerce sin cookies | 21 |
| H7 | Set Up From Claude in Minutes | 29 | Configúrala desde Claude | 24 |
| H8 | No Cookies, No Consent Gate | 27 | Sin cookies ni consentimiento | 29 |
| H9 | Black Friday Enterprise SLA | 27 | SLA Enterprise en Black Friday | 30 |
| H10 | Sign Before 27 November | 23 | Contrata antes del 27 nov | 25 |
| H11 | Plans From 499 €/Month | 22 | Planes desde 499 €/mes | 22 |
| H12 | EU-Hosted in Dublin | 19 | Alojado en la UE, en Dublín | 27 |
| H13 | MCP, API and BigQuery Included | 30 | MCP, API y BigQuery incluidos | 29 |
| H14 | Up to Half Your Traffic, Lost | 29 | Hasta la mitad de tu tráfico | 28 |
| H15 | Compare on Your Own Site | 24 | Compáralo en tu propia web | 26 |
| D1 | Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery. | 87 | Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API. | 89 |
| D2 | One prompt in Claude installs the MCP, creates the account and generates the pixels. | 84 | Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti. | 86 |
| D3 | Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA. | 90 | Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise. | 90 |
| D4 | No cookies, no consent gate, EU-hosted in Dublin. Last-click attribution on complete data. | 90 | Sin cookies ni consentimiento, alojado en Dublín. Last-click sobre datos completos. | 83 |

#### 4.7.14 brand, RSA B

<!-- limits H=30 D=90 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| H1 fijado 1 | Sealmetrics Pricing | 19 | Sealmetrics, precios | 20 |
| H2 fijado 1 | Sealmetrics | 11 | Sealmetrics | 11 |
| H3 fijado 1 | Sealmetrics Black Friday Offer | 30 | Sealmetrics en Black Friday | 27 |
| H4 | Growth 499 €, Scale 899 € | 25 | Growth 499 €, Scale 899 € | 25 |
| H5 | We Gift the First 1M Events | 27 | Te regalamos 1M de eventos | 26 |
| H6 | SLA Enterprise Until 6 Jan | 26 | SLA Enterprise hasta el 6 ene | 29 |
| H7 | 99.9% Uptime, Service Credits | 29 | 99,9% disponibilidad, créditos | 30 |
| H8 | Priority Support at Peak | 24 | Soporte prioritario en pico | 27 |
| H9 | 1M Events Free, No Card | 23 | 1M eventos gratis, sin tarjeta | 30 |
| H10 | Open a Free Account | 19 | Abre una cuenta gratis | 22 |
| H11 | Real-Time Reports, No Sampling | 30 | Tiempo real sin muestreo | 24 |
| H12 | Install in 5 to 30 Minutes | 26 | Instalación en 5 a 30 minutos | 29 |
| H13 | Last-Click on Complete Data | 27 | Last-click con datos completos | 30 |
| H14 | Made for CMOs and eCommerce | 27 | Para CMOs y eCommerce managers | 30 |
| H15 | Sealmetrics Analytics | 21 | Sealmetrics Analytics | 21 |
| D1 | Growth 499 €/month, Scale 899 €/month, billed annually. See plans and sign on the page. | 87 | Growth 499 €/mes, Scale 899 €/mes, facturación anual. Ver planes y contratar en la página. | 90 |
| D2 | Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA. | 90 | Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise. | 90 |
| D3 | 99.9% availability, service credits and priority support until 6 Jan, at your plan price. | 89 | 99,9% de disponibilidad, créditos de servicio y soporte prioritario hasta el 6 de enero. | 88 |
| D4 | Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery. | 87 | Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API. | 89 |

### 4.8 Extensiones

**Enlaces de sitio (4, límite 25 caracteres en el título, 35 en cada línea de descripción)**

<!-- limits SL=25 SD=35 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| SL1 título | Open a Free Account | 19 | Abre una cuenta gratis | 22 |
| SD1 línea 1 | 1M events in total, no card | 27 | 1M de eventos en total | 22 |
| SD1 línea 2 | Set up from Claude | 18 | Sin tarjeta, desde Claude | 25 |
| SL2 título | Incapto, 48 Days Compared | 25 | Incapto: la comparativa | 23 |
| SD2 línea 1 | 48 days side by side | 20 | 48 días en paralelo | 19 |
| SD2 línea 2 | GA4 saw 29% fewer visits | 24 | GA4 vio un 29% menos | 20 |
| SL3 título | Black Friday SLA | 16 | SLA para Black Friday | 21 |
| SD3 línea 1 | Sign before 27 November | 23 | Contrata antes del 27 nov | 25 |
| SD3 línea 2 | Enterprise SLA until 6 Jan | 26 | SLA Enterprise hasta el 6 ene | 29 |
| SL4 título | See Plans and Sign | 18 | Ver planes y contratar | 22 |
| SD4 línea 1 | Growth 499 €, Scale 899 € | 25 | Growth 499 €, Scale 899 € | 25 |
| SD4 línea 2 | Billed annually | 15 | Facturación anual | 17 |

Los tres primeros enlaces apuntan a anclas de la propia landing (#start, #evidence, #black-friday). El cuarto apunta a /pricing con los mismos UTM, porque es el destino del CTA de contratación y así el clic se mide como lp_pricing_click desde el anuncio.

**Textos destacados (6, límite 25 caracteres)**

<!-- limits CO=25 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| CO1 | No Cookies | 10 | Sin cookies | 11 |
| CO2 | No Consent Gate | 15 | Sin consentimiento | 18 |
| CO3 | EU-Hosted in Dublin | 19 | Alojado en Dublín | 17 |
| CO4 | 1M Events Free | 14 | 1M de eventos gratis | 20 |
| CO5 | No Card Required | 16 | Sin tarjeta | 11 |
| CO6 | MCP, API and BigQuery | 21 | MCP, API y BigQuery | 19 |

**Extractos estructurados**

- Encabezado "Types" (EN) / "Tipos" (ES): Cookieless analytics, Consentless analytics, Real-time reports, Last-click attribution, BigQuery export, MCP server.
- Encabezado "Brands" no se usa: no podemos listar marcas de terceros en un extracto sin su permiso.

**Extensión de precio (solo campaña brand y grupo black-friday-analytics)**

- Growth: 499 €/mes, facturación anual. Scale: 899 €/mes, facturación anual. Agentic: 0 €, el primer millón de eventos regalado. Growth y Scale enlazan a /pricing; Agentic, al ancla #start de la landing.

### 4.9 Programación de anuncios

- Lunes a viernes, 07:00 a 20:00 hora local de cada mercado, puja al 100%.
- Lunes a viernes, 20:00 a 23:00, puja al 70%.
- Sábado y domingo, puja al 50%. No se apaga: los CMOs revisan datos el domingo por la tarde.
- Del 23 al 30 de noviembre, sin ajustes horarios: 100% las 24 horas.
- Del 24 de diciembre al 1 de enero, puja al 40% en todos los mercados.

### 4.10 Performance Max: no se lanza

No se activa Performance Max en el lanzamiento, ni durante Black Friday. Motivos:

1. **La conversión real no ocurre en la página.** PMax optimiza sobre lo que su etiqueta ve. Con Consent Mode y una etiqueta bajo banner, vería la mitad de las microconversiones y ninguna cuenta creada hasta la importación semanal. Aprendería con datos incompletos, que es exactamente lo que la landing critica.
2. **Sin control de términos de búsqueda.** PMax mezcla Búsqueda, Display, YouTube, Gmail y Discover. Nuestra categoría tiene un volumen de búsqueda pequeño y una lista negativa larga; PMax no admite negativas a nivel de campaña con la granularidad que necesitamos y rellenaría el presupuesto con Display de baja intención.
3. **Volumen insuficiente para aprender.** PMax necesita del orden de 30 conversiones al mes por campaña para estabilizarse. En el escenario base tenemos 40 a 50 cuentas creadas al mes en todo Google; una campaña PMax por mercado nunca alcanzaría el umbral.
4. **Canibalización de marca.** Sin exclusiones de marca bien configuradas, PMax captura las búsquedas de "sealmetrics" a CPC superior al de la campaña brand y lo presenta como resultado propio.

Condición para reconsiderarlo: a partir de la semana 8, si la importación offline de cuentas creadas supera las 60 al mes y las campañas de Búsqueda saturan impresiones (cuota de impresiones de búsqueda por encima del 80% en ES y UK), se abre una PMax única para EN con exclusión de marca, feed de activos limitado a las cinco creatividades estáticas de Meta (sección 5.4) y presupuesto del 10% del total de Google.

## 5. Meta Ads (Facebook e Instagram)

### 5.1 Objetivo y evento de optimización

- **Objetivo de campaña:** Ventas (Sales) con evento de conversión personalizado `lp_prompt_copied`. Se elige Ventas y no Clientes potenciales porque el evento personalizado se puede mapear a "Purchase" o a un evento estándar con valor, lo que abre las pujas con ROAS más adelante. Durante las dos primeras semanas, si `lp_prompt_copied` no alcanza 50 eventos semanales por conjunto de anuncios, el evento de optimización baja temporalmente a `lp_cta_click`.
- **Ventana de atribución:** 7 días clic, 1 día visualización en el lanzamiento. Se recorta a 1 día clic si la reconciliación semanal con el back-office muestra más de un 20% de sobreatribución (sección 3.3).
- **Píxel y API de conversiones:** ambos bajo consentimiento. La API de conversiones se alimenta desde el servidor de la landing solo cuando el visitante ha aceptado el banner. No se envían eventos de visitantes que no consintieron.

### 5.2 Estructura de cuenta

Una campaña por idioma de landing, con presupuesto a nivel de campaña (Advantage+ campaign budget) y cuatro conjuntos de anuncios:

| Campaña | Conjunto | Segmentación | Ubicación | Presupuesto diario |
|---|---|---|---|---|
| META-EN | cold-ga-interest | Intereses: Google Analytics, Google Tag Manager, Adobe Analytics, Matomo, Web analytics, Conversion rate optimization; acotado a intereses Shopify, Magento, Adobe Commerce, Salesforce Commerce Cloud, PrestaShop; edad 28 a 58 | UK, DE, FR, NL, IT, PT | 40 € |
| META-EN | cold-jobtitle-proxy | Intereses de cargo y sector: Marketing management, Digital marketing, eCommerce (nombre del interés en Meta: E-commerce), Online shopping platforms, Chief marketing officer, Marketing director; comportamientos: administradores de páginas de empresa, pequeños y medianos anunciantes activos | UK, DE, FR, NL, IT, PT | 25 € |
| META-EN | broad-aplus | Advantage+ audience sin intereses, segmentación guiada por la creatividad; solo edad 28 a 58 | UK, DE, FR, NL | 30 € |
| META-EN | rt-30d | Retargeting: visitantes de la landing en 30 días que no dispararon lp_prompt_copied; visitantes de sealmetrics.com en 60 días; interacción con la página de Instagram o Facebook en 90 días | Los siete | 15 € |
| META-ES | cold-ga-interest | Igual que EN | España, Portugal | 25 € |
| META-ES | cold-jobtitle-proxy | Igual que EN | España | 15 € |
| META-ES | broad-aplus | Igual que EN | España | 15 € |
| META-ES | rt-30d | Igual que EN | España, Portugal | 10 € |

Notas de estructura:

- Portugal entra en la campaña ES por proximidad de mercado y porque su volumen no justifica un conjunto propio, pero recibe anuncios en inglés dentro de META-EN en cold-ga-interest para no perder al comprador que no lee español. El solape se controla con la exclusión mutua de audiencias.
- Exclusiones globales: clientes actuales (lista de emails), quienes dispararon lp_prompt_copied en 30 días, empleados.
- Emplazamientos: Feed de Facebook, Feed de Instagram, Stories e Reels de Instagram, Reels de Facebook, resultados de búsqueda. Se desactivan Audience Network, in-stream y Marketplace.
- Creatividad dinámica: activada en broad-aplus únicamente, con las cinco estáticas y los seis textos. En los conjuntos de intereses, cada anuncio combina una estática con dos textos, para atribuir el resultado al concepto.

### 5.3 Textos

Límites: texto principal ideal 125 caracteres (variantes largas hasta 500, que Meta corta con "Ver más" tras 125), titular 40, descripción 30. Sin guiones largos.

**Texto principal, versiones cortas (6)**

<!-- limits PT=125 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| PT1 | Up to half your traffic never reaches your report. Open a free account and compare on your own site. | 100 | Hasta la mitad de tu tráfico no llega a tu informe. Abre una cuenta gratis y compáralo en tu web. | 97 |
| PT2 | Incapto ran GA4 and Sealmetrics side by side for 48 days. GA4 saw 29% fewer visits. Paid channels lost most. | 108 | Incapto usó GA4 y Sealmetrics en paralelo 48 días. GA4 vio un 29% menos de visitas. Pago perdió más. | 100 |
| PT3 | The channels you pay for lose the most behind a consent banner. Paid traffic: +37% to +52% once you measure without one. | 120 | Los canales que pagas son los que más pierden tras el banner. Pago: de +37% a +52% al medir sin él. | 99 |
| PT4 | 1M events in total, no card, nothing to cancel. Copy one prompt into Claude and the account sets itself up. | 107 | 1M de eventos en total, sin tarjeta, nada que cancelar. Copia un prompt en Claude y la cuenta se configura sola. | 112 |
| PT5 | Sign Growth or Scale before 27 November and run Black Friday and Christmas with the Enterprise SLA at your plan price. | 118 | Contrata Growth o Scale antes del 27 de noviembre y pasa Black Friday y Navidad con el SLA Enterprise. | 102 |
| PT6 | Up to a third of your sales sit under no channel. That is not a reporting bug. It is the consent gate. | 102 | Hasta un tercio de tus ventas queda sin canal. No es un error del informe. Es la puerta de consentimiento. | 106 |
| PT7 | We gift you the first million events. What you were looking at until now was something else. | 92 | Te regalamos el primer millón de eventos. Mira la realidad de tu negocio. Lo que veías hasta ahora era otra cosa. | 113 |
| PT8 | How Incapto found that its best-converting traffic was the traffic that accepted cookies least. Free account, no card. | 118 | Cómo Incapto descubrió que su tráfico que mejor convertía era el que menos aceptaba cookies. Cuenta gratis, sin tarjeta. | 120 |

**Texto principal, versiones largas (3)**

<!-- limits PTL=500 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| PTL1 | You are a CMO or eCommerce manager. Behind a consent banner your analytics misses up to half your traffic depending on the channel. The channels you pay for lose the most, and up to a third of your sales sit under no channel. I know which channels lose most. Open a free account, 1M events in total, no card, and compare on your own site. Sign before 27 November and run Black Friday and Christmas with the Enterprise SLA on your plan. | 435 | Eres CMO o responsable de eCommerce. Tras un banner de consentimiento tu analítica pierde hasta la mitad del tráfico según el canal. Los canales que pagas son los que más pierden, y hasta un tercio de tus ventas queda sin canal. Sé qué canales pierden más. Abre una cuenta gratis, 1M de eventos en total, sin tarjeta, y compáralo en tu propia web. Contrata antes del 27 de noviembre y pasa Black Friday y Navidad con el SLA Enterprise en tu plan. | 446 |
| PTL2 | Incapto, specialty coffee on Shopify, ran GA4 with Consent Mode and Sealmetrics side by side for 48 days. GA4 recorded 29% fewer visits and 45% fewer pageviews. Sealmetrics recorded 96% of real Shopify orders and 97% of revenue. Unknown-origin traffic: 14% in GA4, 0.3% in Sealmetrics. Run the same test on your site. Free account, 1M events in total, no card. | 360 | Incapto, café de especialidad en Shopify, usó GA4 con Consent Mode y Sealmetrics en paralelo durante 48 días. GA4 registró un 29% menos de visitas y un 45% menos de páginas vistas. Sealmetrics registró el 96% de los pedidos reales de Shopify y el 97% de los ingresos. Tráfico sin origen: 14% en GA4, 0,3% en Sealmetrics. Haz la misma prueba en tu web. Cuenta gratis, 1M de eventos en total, sin tarjeta. | 403 |
| PTL4 | Explain to me how you make your campaigns profitable when you cannot see half the traffic or 30% of the sales, and 40% or more of the sales you do see are attributed to the wrong channel. You have one million events to see the reality of your business. What you were looking at until now was something else. We gift you the first million events: no card, nothing to cancel. | 373 | Explícame cómo haces rentables tus campañas si no ves la mitad del tráfico ni el 30% de las ventas, y el 40% o más de las ventas que sí ves están atribuidas al canal equivocado. Tienes un millón de eventos para ver la realidad de tu negocio. Lo que mirabas hasta ahora era otra cosa. Te regalamos el primer millón de eventos: sin tarjeta, nada que cancelar. | 357 |
| PTL5 | How Palladium doubled its Display sales. Palladium Hotel Group found 40% of inbound traffic with no source and 35% of GA4 bookings with no channel. Once the channels were visible, Display Cost-per-Search improved 165%. Read the case, then run the same test on your site: we gift you the first million events, no card. | 317 | Cómo Palladium duplicó sus ventas de Display. Palladium Hotel Group encontró un 40% del tráfico entrante sin fuente y un 35% de las reservas de GA4 sin canal. Con los canales visibles, el coste por búsqueda de Display mejoró un 165%. Lee el caso y haz la misma prueba en tu web: te regalamos el primer millón de eventos, sin tarjeta. | 333 |
| PTL3 | "Consent Mode left us with a structural blind spot: we knew there was traffic we were not seeing, but we had no way to size it." Rosa Tomàs, B2C Acquisition Manager, Incapto. Size it on your own site: free account, 1M events in total, no card, set up from Claude in minutes. | 274 | "El Consent Mode nos dejaba un vacío estructural: sabíamos que había tráfico que no estábamos viendo, pero no teníamos forma de dimensionarlo." Rosa Tomàs, B2C Acquisition Manager, Incapto. Dimensiónalo en tu propia web: cuenta gratis, 1M de eventos en total, sin tarjeta, configurada desde Claude en minutos. | 309 |

**Titulares (límite 40) y descripciones (límite 30)**

<!-- limits HL=40 DS=30 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| HL1 | Free account, 1M events, no card | 32 | Cuenta gratis, 1M eventos, sin tarjeta | 38 |
| HL2 | Up to half your traffic, unreported | 35 | Hasta la mitad de tu tráfico, fuera | 35 |
| HL3 | GA4 saw 29% fewer visits at Incapto | 35 | GA4 vio un 29% menos en Incapto | 31 |
| HL4 | Enterprise SLA for Black Friday | 31 | SLA Enterprise para Black Friday | 32 |
| HL5 | Paid traffic: +37% to +52% | 26 | Tráfico de pago: de +37% a +52% | 31 |
| HL6 | Set up from Claude in minutes | 29 | Configúrala desde Claude | 24 |
| DS1 | No cookies, no consent gate | 27 | Sin cookies ni consentimiento | 29 |
| DS2 | EU-hosted in Dublin | 19 | Alojado en Dublín | 17 |
| DS3 | Sign before 27 November | 23 | Contrata antes del 27 nov | 25 |
| DS4 | Compare on your own site | 24 | Compáralo en tu web | 19 |

Combinaciones recomendadas por conjunto:

| Conjunto | Texto | Titular | Descripción | Creatividad |
|---|---|---|---|---|
| cold-ga-interest | PT2, PTL2 | HL3 | DS4 | (a) gráfico de canales Incapto |
| cold-ga-interest | PT3 | HL5 | DS1 | (b) 50% vs 62% |
| cold-jobtitle-proxy | PT1, PTL1 | HL2 | DS4 | (c) nota del fundador |
| cold-jobtitle-proxy | PT6 | HL2 | DS1 | (a) gráfico de canales Incapto |
| broad-aplus | PT1, PT4, PT2 (creatividad dinámica) | HL1, HL2, HL6 | DS1, DS4 | (a), (b), (c), (d) |
| rt-30d, hasta el 27 nov | PT5 | HL4 | DS3 | (e) cuenta atrás SLA |
| rt-30d, del 28 nov al 6 ene | PT4, PT7 | HL7 | DS2 | (d) tarjeta de precio |
| cold-jobtitle-proxy, desde el 13 oct | PTL4 | HL7 | DS4 | (c) nota del fundador, versión "explícame" |
| cold-ga-interest, desde el 13 oct | PTL5, PT8 | HL8 | DS4 | (c) tarjeta de texto con el teaser del caso |

### 5.4 Conceptos creativos (estáticas)

Todas las piezas siguen el sistema Signal: fondo papel #F4F1E8, tinta #111412, acento ácido #CBFF3D solo en el dato o el CTA, esquinas cuadradas, sombra dura de 3 px sin desenfoque, tipografía Onest 790 en titulares, JetBrains Mono para cifras y eyebrows en mayúsculas. Sin emojis, sin iconos ilustrativos, sin fotografías de stock. Formatos: 1080×1080 (feed), 1080×1350 (feed vertical), 1080×1920 (Stories y Reels). La proporción de texto es libre desde 2021, pero se mantiene por debajo del 30% del área por legibilidad en móvil.

**(a) Gráfico de pérdida por canal, Incapto**

- Eyebrow: "INCAPTO · GA4 + CONSENT MODE VS SEALMETRICS · 28 JUL TO 6 AUG 2026".
- Siete barras horizontales, ordenadas de menor a mayor, con la etiqueta del canal a la izquierda y la cifra a la derecha en mono: Direct +11%, Referral +24%, Email +26%, Paid campaigns +37% to +52%, Organic search +62%, Affiliate +73%, Organic social +133%.
- La barra de Paid campaigns lleva relleno ácido; el resto, tinta.
- Titular bajo el gráfico: "Extra traffic Sealmetrics saw vs GA4, per channel" / "Tráfico adicional que Sealmetrics vio frente a GA4, por canal".
- Pie: "Free account. 1M events in total. No card." / "Cuenta gratis. 1M de eventos en total. Sin tarjeta."

**(b) "50% vs 62%", dos barras**

- Dos barras verticales de la misma anchura. Izquierda, tinta, altura 50%, etiqueta "GA4". Derecha, ácido, altura 62%, etiqueta "Sealmetrics".
- Eyebrow: "PAID CAMPAIGNS AS A SHARE OF TRAFFIC · INCAPTO · 2026".
- Titular: "The channels you pay for are the ones the banner hides most." / "Los canales que pagas son los que más esconde el banner."
- Pie: "Compare on your own site. Free account, no card." / "Compáralo en tu propia web. Cuenta gratis, sin tarjeta."

**(c) Nota del fundador, tarjeta de texto**

- Una tarjeta blanca (#FFFDF7) sobre papel con sombra dura de 20 px en ácido. Sin foto.
- Texto en Onest 400, tamaño grande, con el pitch frío completo (PTL1). Las expresiones "up to half your traffic" y "no card" van en texto perfilado (color transparente, trazo 1,5 px), no en cursiva.
- Firma en mono: "Founder, Sealmetrics". Sin nombre propio ni email en la pieza.
- Versión Stories: el texto se divide en tres tarjetas encadenadas.
- Variante "explícame": misma tarjeta con el gancho retórico del fundador como único texto: "Explain to me how you make your campaigns profitable when you cannot see half the traffic or 30% of the sales, and 40% or more of the sales you do see are attributed to the wrong channel." / "Explícame cómo haces rentables tus campañas si no ves la mitad del tráfico ni el 30% de las ventas, y el 40% o más de las ventas que sí ves están atribuidas al canal equivocado." Las cifras van en mono y en ácido.
- Variante "un millón": "You have one million events to see the reality of your business. What you were looking at until now was something else." / "Tienes un millón de eventos para ver la realidad de tu negocio. Lo que mirabas hasta ahora era otra cosa." La frase "one million events" / "un millón de eventos" va perfilada.
- Variante "caso": tarjeta con uno de los dos teasers que la landing ya muestra, en Onest 790 y tamaño display: "How Palladium doubled its Display sales" / "Cómo Palladium duplicó sus ventas de Display", y "How Incapto found that its best-converting traffic was the traffic that accepted cookies least" / "Cómo Incapto descubrió que su tráfico que mejor convertía era el que menos aceptaba cookies". Pie: "Read the case. Then test it on your site." / "Lee el caso. Luego pruébalo en tu web."

**(d) "1M events free. No card.", tarjeta de precio**

- Estructura de tabla de precios con una sola columna. Eyebrow: "AGENTIC · FREE".
- Cifra principal en mono, tamaño display: "1,000,000" con subtítulo "events in total" / "eventos en total". Nunca "per month" ni "al mes".
- Tres líneas con guion: "No card", "Nothing to cancel", "MCP, API and BigQuery included".
- CTA como bloque ácido con texto en tinta: "Open a free account" / "Abre una cuenta gratis".

**(e) Cuenta atrás del SLA de Black Friday**

- Eyebrow: "GROWTH OR SCALE · SIGN BEFORE 27 NOV 2026".
- Cifra display: los días que faltan hasta el 27 de noviembre. Se generan cinco versiones (30, 21, 14, 7, 3 días) y se programan por fecha; nunca se deja una cifra caducada en circulación.
- Titular: "Enterprise SLA on your plan until 6 January" / "SLA Enterprise en tu plan hasta el 6 de enero".
- Línea secundaria: "99.9% availability with service credits. Priority support." / "99,9% de disponibilidad con créditos de servicio. Soporte prioritario."
- Pie: "Growth 499 €/month · Scale 899 €/month · billed annually". CTA: "See plans and sign" / "Ver planes y contratar". Sin la palabra "free" en ningún lugar de esta pieza.

### 5.5 Vídeo de 15 segundos: dos guiones

Producción sin cámara: texto animado sobre papel, corte seco, sin música con letra. Subtítulos siempre, porque el 80% del consumo en feed es sin sonido.

**Guion 1: "El informe"**

| Segundo | Pantalla | Texto EN | Texto ES |
|---|---|---|---|
| 0 a 3 | Papel vacío; aparece un informe con una barra que se corta a la mitad | Up to half your traffic never reaches your report. | Hasta la mitad de tu tráfico no llega a tu informe. |
| 3 a 7 | Gráfico (a) se dibuja barra a barra, la de pago en ácido | The channels you pay for lose the most. | Los canales que pagas son los que más pierden. |
| 7 a 11 | Tarjeta (d) | Free account. 1M events in total. No card. | Cuenta gratis. 1M de eventos en total. Sin tarjeta. |
| 11 a 15 | Prompt copiándose a un chat de Claude, píxel generado | Set it up from Claude. Compare on your own site. | Configúrala desde Claude. Compáralo en tu web. |

**Guion 2: "48 días"**

| Segundo | Pantalla | Texto EN | Texto ES |
|---|---|---|---|
| 0 a 3 | Dos columnas, "GA4" y "Sealmetrics", contador de días que sube hasta 48 | Incapto ran both for 48 days. | Incapto usó las dos durante 48 días. |
| 3 a 7 | Cifras: 157,844 vs 222,345 visitas | GA4 saw 29% fewer visits. | GA4 vio un 29% menos de visitas. |
| 7 a 11 | Cifras: 14% vs 0.3% | Unknown-origin traffic: 14% vs 0.3%. | Tráfico sin origen: 14% frente a 0,3%. |
| 11 a 15 | Tarjeta (d) con CTA ácido | Run the same test. Free account, no card. | Haz la misma prueba. Cuenta gratis, sin tarjeta. |

Ganchos alternativos para los tres primeros segundos, a probar en Reels: "Your GA4 is missing sales. Here is how much." / "A tu GA4 le faltan ventas. Esto es cuánto."; "Why does Direct keep growing?" / "¿Por qué Direct no para de crecer?".

## 6. LinkedIn Ads

### 6.1 Objetivo

Conversiones en el sitio web, con la conversión `lp_prompt_copied` importada desde el Insight Tag (bajo consentimiento) como conversión principal y `lp_cta_click` como secundaria. La cuenta creada se sube semanalmente como conversión offline con email en hash, lo que permite además ver qué empresas convierten en el informe demográfico.

LinkedIn es el canal con el CPC más alto (12 a 18 € esperados en UK y DE) y el único donde se puede acotar por cargo y tamaño de empresa. Se usa para llegar al decisor, no para volumen. Su cuota de presupuesto es la menor de las tres plataformas y su métrica de éxito es el coste por cuenta creada de empresas de 200 o más empleados, no el CPA medio.

### 6.2 Segmentación

| Dimensión | Valor |
|---|---|
| Cargos | CMO, Chief Marketing Officer, Head of Digital, eCommerce Manager, Head of eCommerce, Digital Marketing Director, Head of Growth, Marketing Analytics Manager, Digital Analytics Manager, Director of eCommerce, VP Marketing |
| Antigüedad | Manager, Director, VP, CXO (excluye Entry, Senior individual contributor, Owner) |
| Tamaño de empresa | 51 a 200, 201 a 500, 501 a 1.000, 1.001 a 5.000 |
| Sectores | Retail, Consumer Goods, Travel Arrangements, Hospitality, Leisure Travel and Tourism, Apparel and Fashion, Cosmetics, Food and Beverages, Consumer Electronics, Furniture |
| Países | España (campaña ES); Reino Unido, Alemania, Francia, Países Bajos, Italia, Portugal (campaña EN) |
| Exclusiones | Empleados de Sealmetrics; clientes actuales (lista de empresas); miembros que dispararon lp_prompt_copied en 30 días |
| Expansión de audiencia | Desactivada |
| LinkedIn Audience Network | Desactivada |

**Agencias: no se excluyen, y este es el trade-off.** Excluir los sectores "Marketing and Advertising" y "Marketing Services" quitaría a las agencias, que no son el comprador final y cuyo CPA de cuenta creada suele ser bueno pero cuyo paso a plan de pago es bajo. A cambio, tres de nuestros partners de implantación son agencias (Product Hackers, 3dids, Ayesa) y las cuentas enterprise entran con frecuencia a través de una agencia que ha probado la herramienta antes. Decisión: se mantienen en la audiencia hasta la semana 6. Si en ese punto las cuentas creadas por agencias superan el 30% del total de LinkedIn y ninguna ha generado un plan de pago, se excluyen los dos sectores y se abre un conjunto de anuncios específico para agencias con un mensaje de partner, no de cuenta gratuita.

### 6.3 Formatos

| Formato | Uso | Creatividad |
|---|---|---|
| Imagen única | Prospección fría, todos los cargos | Estáticas (a), (b) y (d) de la sección 5.4 en 1200×627 y 1080×1080 |
| Anuncio de documento | Prospección fría a Director y superior | PDF de 6 páginas: la comparativa Incapto GA4 vs Sealmetrics, una página por hallazgo (visitas, páginas vistas, pedidos e ingresos, tráfico por canal, origen desconocido, cita de Rosa Tomàs), última página con la oferta. Sin formulario de descarga: el documento se lee en el feed y el CTA lleva a la landing |
| Thought leader ad | Amplificación de una publicación orgánica del perfil del fundador | La publicación es el pitch frío (PTL1) más el gráfico (a). Se patrocina la publicación existente, no se crea una nueva, para conservar los comentarios |
| Anuncio de conversación | Opcional, desde la semana 4, solo a CXO en UK y ES | Mensaje de dos ramas: "Ver la comparativa de 48 días" y "Abrir la cuenta gratis". Se activa solo si el coste por prompt copiado de imagen única supera 90 € |

### 6.4 Textos

Límites: texto introductorio 150 caracteres visibles antes del corte (600 máximo), titular 70, descripción 100 (opcional, no se usa en imagen única). Sin guiones largos.

**Texto introductorio (4 variantes)**

<!-- limits IN=150 INL=600 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| IN1 | Up to half your traffic never reaches your report. The channels you pay for lose the most. Compare on your own site, free, no card. | 131 | Hasta la mitad de tu tráfico no llega a tu informe. Los canales que pagas son los que más pierden. Compáralo en tu web, gratis, sin tarjeta. | 140 |
| IN2 | Incapto ran GA4 with Consent Mode and Sealmetrics side by side for 48 days. GA4 saw 29% fewer visits and 45% fewer pageviews. | 125 | Incapto usó GA4 con Consent Mode y Sealmetrics en paralelo 48 días. GA4 vio un 29% menos de visitas y un 45% menos de páginas vistas. | 133 |
| IN3 | Up to a third of your sales sit under no channel. Palladium Hotel Group found 35% of GA4 bookings with no channel at all. | 121 | Hasta un tercio de tus ventas queda sin canal. Palladium Hotel Group encontró un 35% de reservas de GA4 sin canal alguno. | 121 |
| IN4 | Sign Growth or Scale before 27 November and run Black Friday and Christmas with the Enterprise SLA at your plan price. | 118 | Contrata Growth o Scale antes del 27 de noviembre y pasa Black Friday y Navidad con el SLA Enterprise al precio de tu plan. | 123 |
| IN5 | You have one million events to see the reality of your business. What you were looking at until now was something else. | 119 | Tienes un millón de eventos para ver la realidad de tu negocio. Lo que mirabas hasta ahora era otra cosa. | 105 |
| IN6 | How Incapto found that its best-converting traffic was the traffic that accepted cookies least. The 48-day numbers. | 115 | Cómo Incapto descubrió que su tráfico que mejor convertía era el que menos aceptaba cookies. Las cifras de 48 días. | 115 |

**Texto introductorio largo para el anuncio de documento y el thought leader ad**

<!-- limits INL=600 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| INL2 | Explain to me how you make your campaigns profitable when you cannot see half the traffic or 30% of the sales, and 40% or more of the sales you do see are attributed to the wrong channel. We gift you the first million events so you can see the reality of your business on your own site. No card, nothing to cancel, set up from Claude in minutes. | 345 | Explícame cómo haces rentables tus campañas si no ves la mitad del tráfico ni el 30% de las ventas, y el 40% o más de las ventas que sí ves están atribuidas al canal equivocado. Te regalamos el primer millón de eventos para que veas la realidad de tu negocio en tu propia web. Sin tarjeta, nada que cancelar, configurado desde Claude en minutos. | 345 |
| INL1 | You are a CMO or eCommerce manager. Behind a consent banner your analytics misses up to half your traffic depending on the channel. The channels you pay for lose the most, and up to a third of your sales sit under no channel. I know which channels lose most: the six pages below are one Shopify store, 48 days, GA4 and Sealmetrics side by side. Open a free account, 1M events in total, no card, and compare on your own site. | 424 | Eres CMO o responsable de eCommerce. Tras un banner de consentimiento tu analítica pierde hasta la mitad del tráfico según el canal. Los canales que pagas son los que más pierden, y hasta un tercio de tus ventas queda sin canal. Sé qué canales pierden más: las seis páginas siguientes son una tienda Shopify, 48 días, GA4 y Sealmetrics en paralelo. Abre una cuenta gratis, 1M de eventos en total, sin tarjeta, y compáralo en tu propia web. | 439 |

**Titulares (límite 70)**

<!-- limits LH=70 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| LH1 | Free account: 1M events in total, no card, set up from Claude | 61 | Cuenta gratis: 1M de eventos en total, sin tarjeta, desde Claude | 64 |
| LH2 | GA4 vs Sealmetrics, 48 days side by side: the per-channel numbers | 65 | GA4 frente a Sealmetrics, 48 días en paralelo: las cifras por canal | 67 |
| LH3 | Up to half your traffic never reaches your report. Size it yourself. | 68 | Hasta la mitad de tu tráfico no llega a tu informe. Dimensiónalo. | 65 |
| LH4 | Enterprise SLA through Christmas if you sign before 27 November | 63 | SLA Enterprise en Navidad si contratas antes del 27 de noviembre | 64 |
| LH5 | We gift you the first million events. No card, nothing to cancel. | 65 | Te regalamos el primer millón de eventos. Nada que cancelar. | 60 |
| LH6 | How Palladium doubled its Display sales | 39 | Cómo Palladium duplicó sus ventas de Display | 44 |

Combinaciones: IN1 + LH3 y IN2 + LH2 en imagen única con (a); IN3 + LH3 con (b); IN5 + LH5 con (d); IN6 + LH6 con la tarjeta de teaser de caso; INL1 + LH2 en el anuncio de documento; INL2 + LH5 en imagen única con la variante "explícame" de (c), solo a Director y superior; IN4 + LH4 con (e) en retargeting desde el 1 de noviembre; el thought leader ad usa el texto orgánico de la publicación y no admite titular.

### 6.5 Puja y presupuesto

- **Puja:** CPC manual en el lanzamiento, 9 € en ES, 12 € en UK y DE, 10 € en FR y NL, 8 € en IT y PT. La puja automática de LinkedIn ("Maximise delivery") gasta el presupuesto en impresiones de baja calidad cuando la audiencia es estrecha; se cambia a "Cost cap" únicamente cuando la campaña acumula 30 conversiones lp_prompt_copied.
- **Presupuesto diario:** campaña EN 60 €, campaña ES 30 €, retargeting 10 € compartido. Total mensual aproximado: 3.000 €.
- **Rotación:** los anuncios se rotan de forma uniforme durante las dos primeras semanas y después se optimizan por rendimiento.
- **Frecuencia:** si la frecuencia semanal supera 4 en prospección fría, se amplía la audiencia añadiendo el sector "Internet" y el tamaño 5.001 a 10.000 antes que subir la puja.

## 7. Calendario Q4 y reparto de presupuesto

### 7.1 Fases

| Fase | Fechas | Mensaje dominante | Conversión que se empuja | Qué cambia en las plataformas |
|---|---|---|---|---|
| 0. Preparación | 15 a 21 sep | Ninguno | Ninguna | Píxeles bajo consentimiento verificados, conversiones creadas, listas de exclusión subidas, creatividades aprobadas por política (Meta tarda hasta 24 h, LinkedIn hasta 48 h) |
| 1. Calentamiento | 22 sep a 12 oct | "Up to half your traffic never reaches your report" | Cuenta gratuita | Google en Maximizar conversiones sin objetivo; Meta y LinkedIn en aprendizaje; solo creatividades (a), (c) y (d) |
| 2. Evidencia | 13 oct a 2 nov | La comparativa Incapto y las cifras por canal | Cuenta gratuita | Entra la creatividad (b) y el anuncio de documento; Google pasa a CPA objetivo; primera reasignación de presupuesto entre mercados |
| 3. Plazo de la oferta | 3 a 27 nov | "Sign before 27 November: Enterprise SLA through Christmas" | Plan de pago (secundaria) sin dejar de optimizar a cuenta gratuita | Entra la creatividad (e) en retargeting y en LinkedIn; el grupo black-friday-analytics sube presupuesto; CPA objetivo +25% en ga4-consent-mode del 20 al 27 nov; rt-30d recibe PT5 |
| 4. Black Friday y Cyber Monday | 27 a 30 nov | "Real-time reports with no sampling at peak", sin mención a la oferta (ha vencido el 27) | Cuenta gratuita | Se retira (e) el 28 nov a primera hora; sin programación horaria; Meta y LinkedIn bajan un 30% el presupuesto de prospección fría porque el feed lo saturan los anunciantes de retail |
| 5. Empuje de Navidad | 1 dic a 23 dic | "Compare on your own site before you plan 2027" | Cuenta gratuita | Vuelven (a), (b) y (d); retargeting con PT4; Google recupera CPA objetivo normal |
| 6. Valle | 24 dic a 1 ene | Solo brand y retargeting | Cuenta gratuita | Prospección fría pausada en Meta y LinkedIn; Google al 40% de puja |
| 7. Cierre | 2 a 6 ene | "Start 2027 with the data you paid for" | Cuenta gratuita y demo | Se reactiva prospección fría al 70%; el 6 de enero termina el SLA promocional y se prepara el informe final del trimestre |

### 7.2 Reparto de presupuesto: ejemplo con 15.000 € al mes

**Por canal**

| Canal | Cuota | Mensual | Razón |
|---|---|---|---|
| Google Ads (Búsqueda) | 40% | 6.000 € | Intención declarada, mejor CPA esperado, único canal donde el retargeting no es necesario |
| Meta Ads | 40% | 6.000 € | Volumen y creatividad; único canal donde broad-aplus puede escalar si el CPA acompaña |
| LinkedIn Ads | 20% | 3.000 € | Acceso al decisor en empresas de 200 o más empleados; CPC alto, se compra selección, no volumen |

**Por mercado (total de los tres canales)**

| Mercado | Cuota | Mensual | Google | Meta | LinkedIn |
|---|---|---|---|---|---|
| España | 30% | 4.500 € | 1.800 € | 1.950 € | 750 € |
| Reino Unido | 26% | 3.900 € | 1.650 € | 1.500 € | 750 € |
| Alemania | 17% | 2.550 € | 900 € | 1.050 € | 600 € |
| Francia | 11% | 1.650 € | 660 € | 600 € | 390 € |
| Países Bajos | 8% | 1.200 € | 450 € | 450 € | 300 € |
| Italia | 5% | 750 € | 240 € | 300 € | 210 € |
| Portugal | 3% | 450 € | 150 € | 150 € | 150 € |
| Marca (todos) | 1% | 150 € | 150 € | 0 € | 0 € |

En Meta y LinkedIn el reparto por mercado se consigue con el presupuesto de cada conjunto y con los ajustes de puja por país; no se abre una campaña por país.

**Por fase (curva mensual sobre la base de 15.000 €)**

| Mes | Presupuesto | Nota |
|---|---|---|
| Septiembre (22 a 30) | 4.500 € | Prorrata de nueve días |
| Octubre | 15.000 € | Base |
| Noviembre | 19.500 € | +30%: fases 3 y 4 concentran la intención de compra del plan de pago |
| Diciembre | 12.000 € | −20%: fase 6 pausa prospección fría una semana |
| Enero (1 a 6) | 3.000 € | Prorrata más el empuje de cierre |
| Total | 54.000 € | Sobre 52.500 € lineales: la diferencia se autoriza si en octubre el CPA está por debajo de 140 € |

## 8. Medición y optimización

### 8.1 KPIs por etapa

| Etapa | KPI | Objetivo base | Umbral de alarma | Fuente |
|---|---|---|---|---|
| Impresión | Cuota de impresiones en Búsqueda (ES, UK) | ≥ 60% | < 35% dos semanas seguidas | Google Ads |
| Clic | CTR de Búsqueda | ≥ 4% en categoría, ≥ 15% en marca | < 2% | Google Ads |
| Clic | CTR de Meta (todo) | ≥ 1,2% | < 0,6% | Meta |
| Clic | CTR de LinkedIn | ≥ 0,55% | < 0,3% | LinkedIn |
| Landing | Tasa lp_cta_click sobre visitas | ≥ 12% | < 6% | Sealmetrics |
| Landing | Tasa lp_prompt_copied sobre visitas | ≥ 3,5% | < 1,5% | Sealmetrics |
| Landing | Diferencia entre visitas Sealmetrics y sesiones que ven las plataformas | Se anota, no se optimiza | Si la diferencia baja del 20%, revisar que el banner sigue bloqueando las etiquetas | Sealmetrics vs plataformas |
| Conversión | Coste por lp_prompt_copied | ≤ 45 € | > 90 € | Plataformas |
| Conversión | Ratio cuenta creada / prompt copiado | 35% a 40% | < 25% (el prompt falla o el visitante no tiene Claude) | Back-office |
| Conversión | CPA por cuenta creada | ≤ 120 € | > 180 € tras la semana 4 | Back-office |
| Ingreso | Ratio cuenta gratuita a plan de pago en 60 días | 4% | < 3% en la semana 8 | Back-office |
| Ingreso | Planes contratados antes del 27 nov | 12 | < 5 el 20 de noviembre | Back-office |
| Ingreso | CAC de plan de pago | ≤ 2.971 € | > 4.500 € | Back-office |

### 8.2 Revisión semanal (lunes, 60 minutos)

1. Exportar del back-office las cuentas creadas de la semana con país, idioma y UTM de origen. Subirlas como conversión offline a las tres plataformas.
2. Comparar las conversiones que declara cada plataforma con las cuentas reales. Si la suma supera las reales en más de un 20%, recortar ventanas de atribución (sección 3.3).
3. Anotar en la hoja de seguimiento la diferencia entre visitas Sealmetrics y sesiones vistas por las etiquetas bajo consentimiento. Este dato alimenta un post mensual y el propio argumento de venta.
4. Google: revisar términos de búsqueda; añadir exactas nuevas y negativas según la regla 4.3. Revisar la eficacia de cada RSA; sustituir el activo con peor rendimiento de cada anuncio ("Bajo") por uno del anexo que no esté en uso.
5. Meta: revisar frecuencia por conjunto (alarma por encima de 3 en frío, de 6 en retargeting). Pausar la creatividad con peor coste por prompt copiado si su gasto supera 300 € sin conversión.
6. LinkedIn: revisar el informe demográfico de empresas que convirtieron. Si aparecen empresas de menos de 51 empleados, comprobar la exclusión. Revisar la cuota de agencias (sección 6.2).
7. Reasignar presupuesto entre mercados en tramos del 20% según CPA (sección 4.6).
8. Revisar el estado de la prueba A/B activa (sección 8.4). Decidir solo con significancia del 95% y al menos 200 lp_prompt_copied por variante.
9. Comprobar que la cuenta atrás (e) muestra la cifra correcta de días y que ninguna pieza con "Sign before 27 November" sigue activa después del 27.
10. Actualizar el resumen de una página para el fundador: gasto, cuentas creadas, CPA, planes contratados, próximo cambio.

### 8.3 Revisión mensual

- Recalcular el CPA objetivo con la ratio real de cuenta gratuita a plan de pago (sección 1.2).
- Revisar la lista de palabras clave frente a las consultas de Search Console de sealmetrics.com: un término que ya posiciona orgánicamente en el top 3 se baja de puja un 30%, no se elimina.
- Auditar que ningún anuncio activo contiene las expresiones prohibidas (sección de reglas al inicio del documento). Un grep sobre la exportación de Google Ads Editor y sobre los textos de Meta y LinkedIn con esta lista: "100%", "every visit", "all your traffic", "zero data loss", "GDPR-compliant", "compliant by design", "free trial", "per month" (en contexto de eventos), "multi-touch", "journey", "ISO", "SOC", "real-time SLA", "150x", "trial", "14-day", "14 días".

### 8.4 Pruebas A/B en la landing

Una prueba a la vez, en las dos versiones de idioma a la vez, con asignación 50/50 en el servidor y sin cookies (el reparto se hace por hash de la URL con UTM más la hora, y se registra como propiedad en Sealmetrics, nunca en almacenamiento del navegador). Se evalúa sobre lp_prompt_copied, con lp_cta_click como métrica de guarda.

| Orden | Prueba | Control | Variante | Hipótesis | Cuándo |
|---|---|---|---|---|---|
| 1 | H1 | "Up to half your traffic never reaches your report." | "The channels you pay for lose the most traffic to the consent banner." / "Los canales que pagas son los que más tráfico pierden por el banner." | El dolor concreto de la inversión de pago convierte mejor al CMO que la cifra genérica | 22 sep a 12 oct |
| 2 | Orden de bloques | Prompt primero (CTA y prompt de Claude sobre el pliegue, evidencia debajo) | Evidencia primero (comparativa Incapto sobre el pliegue, prompt debajo) | El visitante frío necesita la prueba antes de aceptar instalar algo desde Claude; el de retargeting, no | 13 oct a 2 nov |
| 3 | H1, segunda ronda | Ganador de la prueba 1 | "Up to a third of your sales sit under no channel." / "Hasta un tercio de tus ventas queda sin canal." | La pérdida de ventas atribuidas pesa más que la de tráfico | 3 a 23 nov |
| 4 | Bloque de oferta | Oferta del SLA en tercera posición | Oferta del SLA en segunda posición, inmediatamente tras el H1 | Del 3 al 27 de noviembre, la urgencia debe verse sin scroll | 3 a 27 nov, solo si la prueba 3 ha concluido |

Regla de decisión: 95% de significancia y un mínimo de 200 lp_prompt_copied por variante. Si en la fecha de fin no se alcanza, se mantiene el control y la prueba se anota como no concluyente; no se prolonga sobre la siguiente fase.

### 8.5 Reglas de stop-loss

| Regla | Condición | Acción |
|---|---|---|
| Grupo de anuncios sin señal | 250 € gastados sin ningún lp_cta_click | Pausar el grupo, revisar términos de búsqueda, relanzar con la mitad de palabras clave |
| Conjunto de Meta sin señal | 400 € gastados sin ningún lp_prompt_copied | Pausar el conjunto, sustituir la creatividad principal, relanzar con presupuesto al 50% |
| Campaña de LinkedIn sin señal | 600 € gastados sin ningún lp_prompt_copied | Pausar imagen única, mantener solo anuncio de documento y thought leader ad una semana más |
| Mercado sin señal | Un mercado de prioridad 3 (IT, PT) acumula 600 € sin cuenta creada | Cerrar el mercado en los tres canales y repartir el presupuesto entre ES y UK |
| CPA fuera de rango | CPA por cuenta creada superior a 180 € durante dos semanas seguidas tras la semana 4 | Bajar el presupuesto total un 30% y concentrarlo en los dos grupos de Google con mejor CPA y en rt-30d |
| Ratio de pago baja | Menos de un 3% de cuentas gratuitas pasa a plan de pago en la semana 8 | CPA objetivo a 90 €; prospección fría de Meta y LinkedIn al 50%; abrir conversación con producto sobre el paso de Agentic a Growth |
| Fuga en el prompt | Ratio cuenta creada / prompt copiado por debajo del 25% | Parar la puja hacia lp_prompt_copied; el problema está en el prompt o en el MCP, no en los anuncios |
| Sobreatribución | Suma de conversiones de plataformas > 120% de las cuentas reales | Ventanas de atribución a 1 día clic en Meta y LinkedIn |

## 9. Checklist de lanzamiento

**Landing y política**

- [ ] La landing enlaza a la política de privacidad y al aviso legal en el pie, en ambos idiomas.
- [ ] El píxel de Sealmetrics carga sin puerta de consentimiento y registra lp_cta_click, lp_prompt_copied, lp_pricing_click y lp_demo_click. Verificado con el back-office en las dos versiones de idioma.
- [ ] Las etiquetas de Google Ads, Meta (píxel y API de conversiones) y LinkedIn Insight Tag cargan únicamente tras el consentimiento del banner. Verificado rechazando el banner y comprobando en la pestaña de red que ninguna de las tres dispara.
- [ ] Consent Mode v2 configurado en la etiqueta de Google con los estados por defecto en "denied".
- [ ] La landing es noindex. Es correcto para anuncios: Google Ads no exige indexación, y evita que la página compita en orgánico con /pricing y /product. No se cambia.
- [ ] Los enlaces de sitio 1 a 3 apuntan a anclas de la propia landing y todas existen (#start, #evidence, #black-friday); el 4 apunta a /pricing con UTM.
- [ ] El texto de la landing no contiene "trial", "14 días", "1M events per month", "100%", "GDPR-compliant", "multi-touch", "real-time SLA" ni "150x". Comprobado con grep sobre el HTML renderizado de ambas versiones.
- [ ] La cifra de la cuenta gratuita en la landing dice "in total" / "en total" en cada aparición.
- [ ] La fecha límite (27 de noviembre de 2026) y la fecha de fin del SLA (6 de enero de 2027) coinciden en landing, anuncios y condiciones del plan.
- [ ] La landing carga en menos de 2 segundos en móvil 4G en las dos versiones (el píxel de 1,1 KB no es el problema; las etiquetas de terceros bajo consentimiento sí pueden serlo).

**Plataformas**

- [ ] Conversiones creadas e importadas en las tres plataformas con los nombres exactos de la sección 3.2.
- [ ] Importación de conversiones offline probada con un archivo de un registro en Google Ads y en LinkedIn; conversión offline de Meta probada con un evento.
- [ ] Listas de exclusión subidas (clientes actuales, empleados) y aplicadas a todas las campañas.
- [ ] Segmentación geográfica en "Presencia" (no "Presencia o interés") en Google Ads, para evitar tráfico de fuera de los siete mercados.
- [ ] Lista negativa de cuenta aplicada a todas las campañas de Búsqueda.
- [ ] Audience Network, in-stream y Marketplace desactivados en Meta; LinkedIn Audience Network y expansión de audiencia desactivados.
- [ ] UTM completos en cada URL final, comprobados con una visita de prueba que aparece en Sealmetrics con la campaña correcta.
- [ ] Autoetiquetado activo en Google Ads.
- [ ] Programación de anuncios cargada con la hora local de cada mercado.

**Creatividad y política de anuncios**

- [ ] Las cinco estáticas y los dos vídeos aprobados por Meta y LinkedIn (enviar 72 horas antes del 22 de septiembre).
- [ ] Ninguna pieza contiene emojis, guiones largos en el copy, fotografías de personas ni logotipos de terceros.
- [ ] Las cifras de Incapto, Dreamplace y Palladium aparecen con la atribución al cliente y coinciden con las de los casos publicados.
- [ ] Las cinco versiones de la cuenta atrás (30, 21, 14, 7, 3 días) están programadas por fecha, y las piezas con "Sign before 27 November" tienen fecha de fin el 27 de noviembre a las 23:59.
- [ ] Las páginas de Facebook, Instagram y LinkedIn de Sealmetrics están verificadas y su información de contacto no incluye ningún email personal.

**Brand safety**

- [ ] Exclusión de contenido en Meta: nivel "Limitado". Exclusión de categorías de editor: noticias sobre desastres, conflictos y política.
- [ ] LinkedIn: sin Audience Network, así que no aplica lista de exclusión de editores.
- [ ] Google: solo Búsqueda, así que no aplica exclusión de emplazamientos. Si se abre PMax (sección 4.10), lista de exclusión de emplazamientos y de temas sensibles antes de activar.
- [ ] Términos de marca de competidores solo en concordancia con "alternative" / "alternativa" o "vs"; nunca se puja por el nombre del competidor a secas, y ningún titular usa una marca ajena en forma que sugiera relación comercial.

## 10. Anexo: copy consolidado para importar

Este anexo se genera a partir de las tablas de las secciones 4, 5 y 6; si una línea cambia allí, cambia aquí. Los bloques CSV de Google siguen el esquema de columnas de Google Ads Editor (Cuenta > Importar > Pegar texto). Sustituir `{MARKET}` por el código de mercado (es, uk, de, fr, nl, it, pt) antes de importar; en la campaña de marca, `{MARKET}` se sustituye por `all`. Los anuncios se importan en estado Pausado y se activan tras la revisión de política.

### 10.1 Google Ads Editor: RSA en inglés (campañas SEA-UK-en, SEA-DE-en, SEA-FR-en, SEA-NL-en, SEA-IT-en, SEA-PT-en y SEA-BRAND-all)

```csv
Campaign,Ad Group,Ad type,Final URL,Path 1,Path 2,Headline 1,Headline 1 position,Headline 2,Headline 2 position,Headline 3,Headline 3 position,Headline 4,Headline 4 position,Headline 5,Headline 5 position,Headline 6,Headline 6 position,Headline 7,Headline 7 position,Headline 8,Headline 8 position,Headline 9,Headline 9 position,Headline 10,Headline 10 position,Headline 11,Headline 11 position,Headline 12,Headline 12 position,Headline 13,Headline 13 position,Headline 14,Headline 14 position,Headline 15,Headline 15 position,Description 1,Description 2,Description 3,Description 4,Ad name,Status
"SEA-{MARKET}-en","cookieless-analytics","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=cookieless-analytics&utm_term={keyword}","free","account","Cookieless Analytics","1","Cookieless eCommerce Analytics","1","Up to Half Your Traffic, Lost","1","Paid Channels Lose the Most","","Incapto: GA4 Missed 29%","","+52% Paid Traffic vs GA4","","A Third of Sales, No Channel","","Compare on Your Own Site","","1M Events Free, No Card","","Open a Free Account","","No Cookies, No Consent Gate","","EU-Hosted in Dublin","","Last-Click on Complete Data","","Made for CMOs and eCommerce","","Sealmetrics","","Behind a consent banner analytics misses up to half your traffic. Compare on your site.","Incapto: GA4 saw 29% fewer visits than Sealmetrics over 48 days. Paid channels lost most.","Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery.","No cookies, no consent gate, EU-hosted in Dublin. Last-click attribution on complete data.","cookieless-analytics-RSA-A-EN","Paused"
"SEA-{MARKET}-en","cookieless-analytics","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=cookieless-analytics&utm_term={keyword}","free","account","1M Events Free, No Card","1","Cookieless Analytics, Free","1","Open a Free Account","1","Set Up From Claude in Minutes","","Install in 5 to 30 Minutes","","Nothing to Cancel, Ever","","MCP, API and BigQuery Included","","Compare on Your Own Site","","Up to Half Your Traffic, Lost","","No Cookies, No Consent Gate","","1.1 KB Pixel, 132x Lighter","","Black Friday Enterprise SLA","","Sign Before 27 November","","Plans From 499 €/Month","","Sealmetrics Analytics","","One prompt in Claude installs the MCP, creates the account and generates the pixels.","Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery.","Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA.","Behind a consent banner analytics misses up to half your traffic. Compare on your site.","cookieless-analytics-RSA-B-EN","Paused"
"SEA-{MARKET}-en","consentless-analytics","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=consentless-analytics&utm_term={keyword}","free","account","Analytics Without Consent","1","No Cookies, No Consent Gate","1","Up to Half Your Traffic, Lost","1","No Visits Lost to Rejection","","Keep Your UTMs Without Consent","","Paid Channels Lose the Most","","Incapto: GA4 Missed 29%","","Designed for GDPR From Day One","","EU-Hosted in Dublin","","1M Events Free, No Card","","Open a Free Account","","Compare on Your Own Site","","Aggregate, Anonymous Data","","Last-Click on Complete Data","","Sealmetrics","","No cookies, no consent gate, EU-hosted in Dublin. Last-click attribution on complete data.","Behind a consent banner analytics misses up to half your traffic. Compare on your site.","Aggregate, anonymous data, designed for GDPR from the architecture up. No user tracking.","Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery.","consentless-analytics-RSA-A-EN","Paused"
"SEA-{MARKET}-en","consentless-analytics","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=consentless-analytics&utm_term={keyword}","free","account","Measure Without a Banner","1","1M Events Free, No Card","1","Analytics Without Consent","1","Set Up From Claude in Minutes","","Open a Free Account","","Nothing to Cancel, Ever","","Keep Your UTMs Without Consent","","Referrers Kept, Not Truncated","","No Cookies, No Consent Gate","","Install in 5 to 30 Minutes","","MCP, API and BigQuery Included","","Black Friday Enterprise SLA","","Sign Before 27 November","","Made for CMOs and eCommerce","","Sealmetrics Analytics","","One prompt in Claude installs the MCP, creates the account and generates the pixels.","No cookies, no consent gate, EU-hosted in Dublin. Last-click attribution on complete data.","Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery.","Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA.","consentless-analytics-RSA-B-EN","Paused"
"SEA-{MARKET}-en","matomo-alternative","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=matomo-alternative&utm_term={keyword}","free","account","Matomo Alternative","1","Matomo Alternative, No Banner","1","Keep Your UTMs Without Consent","1","Exempt Matomo Drops Your UTMs","","Referrers Kept, Not Truncated","","eCommerce Tracking Stays On","","No Cookies, No Consent Gate","","Up to Half Your Traffic, Lost","","EU-Hosted in Dublin","","1M Events Free, No Card","","Open a Free Account","","Compare on Your Own Site","","Last-Click on Complete Data","","Nothing to Host or Patch","","Sealmetrics","","Matomo's consent-exempt mode strips UTMs and cuts referrers. Keep both without a banner.","The CNIL exemption also recommends disabling eCommerce tracking. Sealmetrics keeps it on.","Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery.","No cookies, no consent gate, EU-hosted in Dublin. Last-click attribution on complete data.","matomo-alternative-RSA-A-EN","Paused"
"SEA-{MARKET}-en","matomo-alternative","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=matomo-alternative&utm_term={keyword}","free","account","Matomo Alternative, Free Tier","1","1M Events Free, No Card","1","Matomo Alternative","1","Set Up From Claude in Minutes","","Open a Free Account","","Nothing to Host or Patch","","Keep Your UTMs Without Consent","","MCP, API and BigQuery Included","","Compare on Your Own Site","","No Cookies, No Consent Gate","","1.1 KB Pixel, 132x Lighter","","Black Friday Enterprise SLA","","Sign Before 27 November","","Plans From 499 €/Month","","Sealmetrics Analytics","","One prompt in Claude installs the MCP, creates the account and generates the pixels.","Matomo's consent-exempt mode strips UTMs and cuts referrers. Keep both without a banner.","Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery.","Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA.","matomo-alternative-RSA-B-EN","Paused"
"SEA-{MARKET}-en","ga4-consent-mode","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=ga4-consent-mode&utm_term={keyword}","free","account","Consent Mode Hides Your Sales","1","GA4 Alternative for eCommerce","1","Up to Half Your Traffic, Lost","1","Incapto: GA4 Missed 29%","","+52% Paid Traffic vs GA4","","14% Unknown in GA4, 0.3% Here","","A Third of Sales, No Channel","","Paid Channels Lose the Most","","Modelled Data Is Not Data","","No Cookies, No Consent Gate","","1M Events Free, No Card","","Compare on Your Own Site","","Run Both, Then Decide","","EU-Hosted in Dublin","","Sealmetrics","","Consent Mode models what it cannot see. Measure what you pay for, no cookies, no consent.","Incapto: GA4 saw 29% fewer visits than Sealmetrics over 48 days. Paid channels lost most.","Behind a consent banner analytics misses up to half your traffic. Compare on your site.","Free Agentic account: 1M events in total, no card. Keep GA4 and compare side by side.","ga4-consent-mode-RSA-A-EN","Paused"
"SEA-{MARKET}-en","ga4-consent-mode","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=ga4-consent-mode&utm_term={keyword}","free","account","GA4 Alternative, Free Tier","1","1M Events Free, No Card","1","Consent Mode Hides Your Sales","1","Set Up From Claude in Minutes","","Open a Free Account","","Run Both, Then Decide","","No Sampling, No Thresholds","","Real-Time Reports, No Sampling","","MCP, API and BigQuery Included","","Compare on Your Own Site","","1.1 KB Pixel, 132x Lighter","","Black Friday Enterprise SLA","","Sign Before 27 November","","Plans From 499 €/Month","","Sealmetrics Analytics","","One prompt in Claude installs the MCP, creates the account and generates the pixels.","Consent Mode models what it cannot see. Measure what you pay for, no cookies, no consent.","Free Agentic account: 1M events in total, no card. Keep GA4 and compare side by side.","Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA.","ga4-consent-mode-RSA-B-EN","Paused"
"SEA-{MARKET}-en","piwik-pro-alternative","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=piwik-pro-alternative&utm_term={keyword}","free","account","Piwik PRO Alternative","1","Enterprise Analytics, No Gate","1","No Cookies, No Consent Gate","1","Published Plans From 499 €","","Up to Half Your Traffic, Lost","","No Visits Lost to Rejection","","EU-Hosted in Dublin","","Last-Click on Complete Data","","Real-Time Reports, No Sampling","","1M Events Free, No Card","","Open a Free Account","","Compare on Your Own Site","","Paid Channels Lose the Most","","Made for CMOs and eCommerce","","Sealmetrics","","Same enterprise league, no consent gate: no visits lost to rejection, EU-hosted in Dublin.","Behind a consent banner analytics misses up to half your traffic. Compare on your site.","Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery.","Growth 499 €/month, Scale 899 €/month, billed annually. See plans and sign on the page.","piwik-pro-alternative-RSA-A-EN","Paused"
"SEA-{MARKET}-en","piwik-pro-alternative","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=piwik-pro-alternative&utm_term={keyword}","free","account","Piwik PRO Alternative, Free","1","1M Events Free, No Card","1","Piwik PRO Alternative","1","Set Up From Claude in Minutes","","Open a Free Account","","Nothing to Cancel, Ever","","MCP, API and BigQuery Included","","Published Plans From 499 €","","No Cookies, No Consent Gate","","Install in 5 to 30 Minutes","","Compare on Your Own Site","","Black Friday Enterprise SLA","","Sign Before 27 November","","EU-Hosted in Dublin","","Sealmetrics Analytics","","One prompt in Claude installs the MCP, creates the account and generates the pixels.","Same enterprise league, no consent gate: no visits lost to rejection, EU-hosted in Dublin.","Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery.","Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA.","piwik-pro-alternative-RSA-B-EN","Paused"
"SEA-{MARKET}-en","black-friday-analytics","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=black-friday-analytics&utm_term={keyword}","free","account","Black Friday Enterprise SLA","1","Real-Time Reports, No Sampling","1","Analytics for Black Friday","1","Sign Before 27 November","","SLA Enterprise Until 6 Jan","","99.9% Uptime, Service Credits","","Priority Support at Peak","","No Sampling, No Thresholds","","Up to Half Your Traffic, Lost","","Paid Channels Lose the Most","","No Cookies, No Consent Gate","","Plans From 499 €/Month","","We Gift the First 1M Events","","Install in 5 to 30 Minutes","","Sealmetrics","","Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA.","Real-time reports, no sampling at peak, every plan. Enterprise SLA if you sign by 27 Nov.","99.9% availability, service credits and priority support until 6 Jan, at your plan price.","Behind a consent banner analytics misses up to half your traffic. Compare on your site.","black-friday-analytics-RSA-A-EN","Paused"
"SEA-{MARKET}-en","black-friday-analytics","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=black-friday-analytics&utm_term={keyword}","free","account","Ready Before Black Friday","1","Install in 5 to 30 Minutes","1","Black Friday Enterprise SLA","1","1M Events Free, No Card","","Open a Free Account","","Set Up From Claude in Minutes","","Compare on Your Own Site","","Real-Time Reports, No Sampling","","Sign Before 27 November","","SLA Enterprise Until 6 Jan","","1.1 KB Pixel, 132x Lighter","","No Cookies, No Consent Gate","","Plans From 499 €/Month","","EU-Hosted in Dublin","","Sealmetrics Analytics","","One prompt in Claude installs the MCP, creates the account and generates the pixels.","Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA.","Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery.","Real-time reports, no sampling at peak, every plan. Enterprise SLA if you sign by 27 Nov.","black-friday-analytics-RSA-B-EN","Paused"
"SEA-BRAND-all","brand","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-brand-{MARKET}-en&utm_content=brand&utm_term={keyword}","free","account","Sealmetrics","1","Sealmetrics Official Site","1","Sealmetrics Free Account","1","1M Events Free, No Card","","Open a Free Account","","Cookieless eCommerce Analytics","","Set Up From Claude in Minutes","","No Cookies, No Consent Gate","","Black Friday Enterprise SLA","","Sign Before 27 November","","Plans From 499 €/Month","","EU-Hosted in Dublin","","MCP, API and BigQuery Included","","Up to Half Your Traffic, Lost","","Compare on Your Own Site","","Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery.","One prompt in Claude installs the MCP, creates the account and generates the pixels.","Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA.","No cookies, no consent gate, EU-hosted in Dublin. Last-click attribution on complete data.","brand-RSA-A-EN","Paused"
"SEA-BRAND-all","brand","Responsive search ad","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-brand-{MARKET}-en&utm_content=brand&utm_term={keyword}","free","account","Sealmetrics Pricing","1","Sealmetrics","1","Sealmetrics Black Friday Offer","1","Growth 499 €, Scale 899 €","","We Gift the First 1M Events","","SLA Enterprise Until 6 Jan","","99.9% Uptime, Service Credits","","Priority Support at Peak","","1M Events Free, No Card","","Open a Free Account","","Real-Time Reports, No Sampling","","Install in 5 to 30 Minutes","","Last-Click on Complete Data","","Made for CMOs and eCommerce","","Sealmetrics Analytics","","Growth 499 €/month, Scale 899 €/month, billed annually. See plans and sign on the page.","Sign Growth or Scale by 27 Nov and run Black Friday and Christmas with the Enterprise SLA.","99.9% availability, service credits and priority support until 6 Jan, at your plan price.","Free Agentic account: 1M events in total, no card, nothing to cancel. MCP and BigQuery.","brand-RSA-B-EN","Paused"
```

### 10.2 Google Ads Editor: RSA en español (campaña SEA-ES-es y SEA-BRAND-all)

```csv
Campaign,Ad Group,Ad type,Final URL,Path 1,Path 2,Headline 1,Headline 1 position,Headline 2,Headline 2 position,Headline 3,Headline 3 position,Headline 4,Headline 4 position,Headline 5,Headline 5 position,Headline 6,Headline 6 position,Headline 7,Headline 7 position,Headline 8,Headline 8 position,Headline 9,Headline 9 position,Headline 10,Headline 10 position,Headline 11,Headline 11 position,Headline 12,Headline 12 position,Headline 13,Headline 13 position,Headline 14,Headline 14 position,Headline 15,Headline 15 position,Description 1,Description 2,Description 3,Description 4,Ad name,Status
"SEA-ES-es","cookieless-analytics","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=cookieless-analytics&utm_term={keyword}","cuenta","gratis","Analítica sin cookies","1","eCommerce sin cookies","1","Hasta la mitad de tu tráfico","1","Pago: el canal que más pierde","","Incapto: GA4 perdió el 29%","","+52% tráfico de pago vs GA4","","Un tercio de ventas sin canal","","Compáralo en tu propia web","","1M eventos gratis, sin tarjeta","","Abre una cuenta gratis","","Sin cookies ni consentimiento","","Alojado en la UE, en Dublín","","Last-click con datos completos","","Para CMOs y eCommerce managers","","Sealmetrics","","Tras el banner, tu analítica pierde hasta la mitad del tráfico. Compruébalo en tu web.","Incapto vio un 29% menos de visitas en GA4 que en Sealmetrics en 48 días. Pago perdió más.","Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API.","Sin cookies ni consentimiento, alojado en Dublín. Last-click sobre datos completos.","cookieless-analytics-RSA-A-ES","Paused"
"SEA-ES-es","cookieless-analytics","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=cookieless-analytics&utm_term={keyword}","cuenta","gratis","1M eventos gratis, sin tarjeta","1","Analítica sin cookies, gratis","1","Abre una cuenta gratis","1","Configúrala desde Claude","","Instalación en 5 a 30 minutos","","Nada que cancelar","","MCP, API y BigQuery incluidos","","Compáralo en tu propia web","","Hasta la mitad de tu tráfico","","Sin cookies ni consentimiento","","132 veces más ligero que GA4","","SLA Enterprise en Black Friday","","Contrata antes del 27 nov","","Planes desde 499 €/mes","","Sealmetrics Analytics","","Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti.","Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API.","Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise.","Tras el banner, tu analítica pierde hasta la mitad del tráfico. Compruébalo en tu web.","cookieless-analytics-RSA-B-ES","Paused"
"SEA-ES-es","consentless-analytics","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=consentless-analytics&utm_term={keyword}","cuenta","gratis","Analítica sin consentimiento","1","Sin cookies ni consentimiento","1","Hasta la mitad de tu tráfico","1","No pierdas visitas al rechazar","","Conserva tus UTM sin banner","","Pago: el canal que más pierde","","Incapto: GA4 perdió el 29%","","Diseñado para el RGPD","","Alojado en la UE, en Dublín","","1M eventos gratis, sin tarjeta","","Abre una cuenta gratis","","Compáralo en tu propia web","","Datos agregados y anónimos","","Last-click con datos completos","","Sealmetrics","","Sin cookies ni consentimiento, alojado en Dublín. Last-click sobre datos completos.","Tras el banner, tu analítica pierde hasta la mitad del tráfico. Compruébalo en tu web.","Medición agregada y anónima, diseñada para el RGPD desde la arquitectura. Sin tracking.","Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API.","consentless-analytics-RSA-A-ES","Paused"
"SEA-ES-es","consentless-analytics","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=consentless-analytics&utm_term={keyword}","cuenta","gratis","Mide sin banner de cookies","1","1M eventos gratis, sin tarjeta","1","Analítica sin consentimiento","1","Configúrala desde Claude","","Abre una cuenta gratis","","Nada que cancelar","","Conserva tus UTM sin banner","","Referrers completos","","Sin cookies ni consentimiento","","Instalación en 5 a 30 minutos","","MCP, API y BigQuery incluidos","","SLA Enterprise en Black Friday","","Contrata antes del 27 nov","","Para CMOs y eCommerce managers","","Sealmetrics Analytics","","Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti.","Sin cookies ni consentimiento, alojado en Dublín. Last-click sobre datos completos.","Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API.","Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise.","consentless-analytics-RSA-B-ES","Paused"
"SEA-ES-es","matomo-alternative","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=matomo-alternative&utm_term={keyword}","cuenta","gratis","Alternativa a Matomo","1","Alternativa Matomo sin banner","1","Conserva tus UTM sin banner","1","Matomo exento pierde tus UTM","","Referrers completos","","eCommerce tracking activo","","Sin cookies ni consentimiento","","Hasta la mitad de tu tráfico","","Alojado en la UE, en Dublín","","1M eventos gratis, sin tarjeta","","Abre una cuenta gratis","","Compáralo en tu propia web","","Last-click con datos completos","","Nada que alojar ni actualizar","","Sealmetrics","","El modo exento de Matomo elimina UTM y recorta referrers. Conserva ambos sin banner.","La exención de la CNIL recomienda apagar el eCommerce tracking. Sealmetrics lo mantiene.","Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API.","Sin cookies ni consentimiento, alojado en Dublín. Last-click sobre datos completos.","matomo-alternative-RSA-A-ES","Paused"
"SEA-ES-es","matomo-alternative","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=matomo-alternative&utm_term={keyword}","cuenta","gratis","Alternativa a Matomo, gratis","1","1M eventos gratis, sin tarjeta","1","Alternativa a Matomo","1","Configúrala desde Claude","","Abre una cuenta gratis","","Nada que alojar ni actualizar","","Conserva tus UTM sin banner","","MCP, API y BigQuery incluidos","","Compáralo en tu propia web","","Sin cookies ni consentimiento","","132 veces más ligero que GA4","","SLA Enterprise en Black Friday","","Contrata antes del 27 nov","","Planes desde 499 €/mes","","Sealmetrics Analytics","","Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti.","El modo exento de Matomo elimina UTM y recorta referrers. Conserva ambos sin banner.","Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API.","Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise.","matomo-alternative-RSA-B-ES","Paused"
"SEA-ES-es","ga4-consent-mode","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=ga4-consent-mode&utm_term={keyword}","cuenta","gratis","Consent Mode oculta ventas","1","Alternativa a GA4 en eCommerce","1","Hasta la mitad de tu tráfico","1","Incapto: GA4 perdió el 29%","","+52% tráfico de pago vs GA4","","Sin origen: 14% GA4, 0,3% aquí","","Un tercio de ventas sin canal","","Pago: el canal que más pierde","","Un dato modelado no es un dato","","Sin cookies ni consentimiento","","1M eventos gratis, sin tarjeta","","Compáralo en tu propia web","","Usa las dos y decide","","Alojado en la UE, en Dublín","","Sealmetrics","","Consent Mode modela lo que no ve. Mide lo que pagas sin cookies ni consentimiento.","Incapto vio un 29% menos de visitas en GA4 que en Sealmetrics en 48 días. Pago perdió más.","Tras el banner, tu analítica pierde hasta la mitad del tráfico. Compruébalo en tu web.","Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta. Mantén GA4 y compara.","ga4-consent-mode-RSA-A-ES","Paused"
"SEA-ES-es","ga4-consent-mode","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=ga4-consent-mode&utm_term={keyword}","cuenta","gratis","Alternativa a GA4, gratis","1","1M eventos gratis, sin tarjeta","1","Consent Mode oculta ventas","1","Configúrala desde Claude","","Abre una cuenta gratis","","Usa las dos y decide","","Sin muestreo ni umbrales","","Tiempo real sin muestreo","","MCP, API y BigQuery incluidos","","Compáralo en tu propia web","","132 veces más ligero que GA4","","SLA Enterprise en Black Friday","","Contrata antes del 27 nov","","Planes desde 499 €/mes","","Sealmetrics Analytics","","Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti.","Consent Mode modela lo que no ve. Mide lo que pagas sin cookies ni consentimiento.","Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta. Mantén GA4 y compara.","Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise.","ga4-consent-mode-RSA-B-ES","Paused"
"SEA-ES-es","piwik-pro-alternative","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=piwik-pro-alternative&utm_term={keyword}","cuenta","gratis","Alternativa a Piwik PRO","1","Nivel enterprise, sin banner","1","Sin cookies ni consentimiento","1","Planes públicos desde 499 €","","Hasta la mitad de tu tráfico","","No pierdas visitas al rechazar","","Alojado en la UE, en Dublín","","Last-click con datos completos","","Tiempo real sin muestreo","","1M eventos gratis, sin tarjeta","","Abre una cuenta gratis","","Compáralo en tu propia web","","Pago: el canal que más pierde","","Para CMOs y eCommerce managers","","Sealmetrics","","Misma liga enterprise, sin puerta de consentimiento ni visitas perdidas. En Dublín.","Tras el banner, tu analítica pierde hasta la mitad del tráfico. Compruébalo en tu web.","Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API.","Growth 499 €/mes, Scale 899 €/mes, facturación anual. Ver planes y contratar en la página.","piwik-pro-alternative-RSA-A-ES","Paused"
"SEA-ES-es","piwik-pro-alternative","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=piwik-pro-alternative&utm_term={keyword}","cuenta","gratis","Alternativa a Piwik PRO gratis","1","1M eventos gratis, sin tarjeta","1","Alternativa a Piwik PRO","1","Configúrala desde Claude","","Abre una cuenta gratis","","Nada que cancelar","","MCP, API y BigQuery incluidos","","Planes públicos desde 499 €","","Sin cookies ni consentimiento","","Instalación en 5 a 30 minutos","","Compáralo en tu propia web","","SLA Enterprise en Black Friday","","Contrata antes del 27 nov","","Alojado en la UE, en Dublín","","Sealmetrics Analytics","","Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti.","Misma liga enterprise, sin puerta de consentimiento ni visitas perdidas. En Dublín.","Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API.","Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise.","piwik-pro-alternative-RSA-B-ES","Paused"
"SEA-ES-es","black-friday-analytics","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=black-friday-analytics&utm_term={keyword}","cuenta","gratis","SLA Enterprise en Black Friday","1","Tiempo real sin muestreo","1","Analítica para Black Friday","1","Contrata antes del 27 nov","","SLA Enterprise hasta el 6 ene","","99,9% disponibilidad, créditos","","Soporte prioritario en pico","","Sin muestreo ni umbrales","","Hasta la mitad de tu tráfico","","Pago: el canal que más pierde","","Sin cookies ni consentimiento","","Planes desde 499 €/mes","","Te regalamos 1M de eventos","","Instalación en 5 a 30 minutos","","Sealmetrics","","Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise.","Tiempo real sin muestreo, todos los planes. SLA Enterprise si contratas antes del 27 nov.","99,9% de disponibilidad, créditos de servicio y soporte prioritario hasta el 6 de enero.","Tras el banner, tu analítica pierde hasta la mitad del tráfico. Compruébalo en tu web.","black-friday-analytics-RSA-A-ES","Paused"
"SEA-ES-es","black-friday-analytics","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=black-friday-analytics&utm_term={keyword}","cuenta","gratis","Listo antes de Black Friday","1","Instalación en 5 a 30 minutos","1","SLA Enterprise en Black Friday","1","1M eventos gratis, sin tarjeta","","Abre una cuenta gratis","","Configúrala desde Claude","","Compáralo en tu propia web","","Tiempo real sin muestreo","","Contrata antes del 27 nov","","SLA Enterprise hasta el 6 ene","","132 veces más ligero que GA4","","Sin cookies ni consentimiento","","Planes desde 499 €/mes","","Alojado en la UE, en Dublín","","Sealmetrics Analytics","","Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti.","Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise.","Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API.","Tiempo real sin muestreo, todos los planes. SLA Enterprise si contratas antes del 27 nov.","black-friday-analytics-RSA-B-ES","Paused"
"SEA-BRAND-all","brand","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-brand-{MARKET}-es&utm_content=brand&utm_term={keyword}","cuenta","gratis","Sealmetrics","1","Sealmetrics, web oficial","1","Sealmetrics, cuenta gratis","1","1M eventos gratis, sin tarjeta","","Abre una cuenta gratis","","eCommerce sin cookies","","Configúrala desde Claude","","Sin cookies ni consentimiento","","SLA Enterprise en Black Friday","","Contrata antes del 27 nov","","Planes desde 499 €/mes","","Alojado en la UE, en Dublín","","MCP, API y BigQuery incluidos","","Hasta la mitad de tu tráfico","","Compáralo en tu propia web","","Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API.","Copia un prompt en Claude. Instala el MCP, crea la cuenta y genera los píxeles por ti.","Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise.","Sin cookies ni consentimiento, alojado en Dublín. Last-click sobre datos completos.","brand-RSA-A-ES","Paused"
"SEA-BRAND-all","brand","Responsive search ad","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-brand-{MARKET}-es&utm_content=brand&utm_term={keyword}","cuenta","gratis","Sealmetrics, precios","1","Sealmetrics","1","Sealmetrics en Black Friday","1","Growth 499 €, Scale 899 €","","Te regalamos 1M de eventos","","SLA Enterprise hasta el 6 ene","","99,9% disponibilidad, créditos","","Soporte prioritario en pico","","1M eventos gratis, sin tarjeta","","Abre una cuenta gratis","","Tiempo real sin muestreo","","Instalación en 5 a 30 minutos","","Last-click con datos completos","","Para CMOs y eCommerce managers","","Sealmetrics Analytics","","Growth 499 €/mes, Scale 899 €/mes, facturación anual. Ver planes y contratar en la página.","Contrata Growth o Scale antes del 27 nov y pasa Black Friday y Navidad con SLA Enterprise.","99,9% de disponibilidad, créditos de servicio y soporte prioritario hasta el 6 de enero.","Cuenta Agentic gratis: 1M de eventos en total, sin tarjeta, nada que cancelar. MCP y API.","brand-RSA-B-ES","Paused"
```

### 10.3 Google Ads Editor: enlaces de sitio

Inglés:

```csv
Sitelink text,Description line 1,Description line 2,Final URL
"Open a Free Account","1M events in total, no card","Set up from Claude","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=sitelink-1#start"
"Incapto, 48 Days Compared","48 days side by side","GA4 saw 29% fewer visits","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=sitelink-2#evidence"
"Black Friday SLA","Sign before 27 November","Enterprise SLA until 6 Jan","https://sealmetrics.com/free-account/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=sitelink-3#black-friday"
"See Plans and Sign","Growth 499 €, Scale 899 €","Billed annually","https://sealmetrics.com/pricing/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-en&utm_content=sitelink-4"
```

Español:

```csv
Sitelink text,Description line 1,Description line 2,Final URL
"Abre una cuenta gratis","1M de eventos en total","Sin tarjeta, desde Claude","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=sitelink-1#start"
"Incapto: la comparativa","48 días en paralelo","GA4 vio un 29% menos","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=sitelink-2#evidence"
"SLA para Black Friday","Contrata antes del 27 nov","SLA Enterprise hasta el 6 ene","https://sealmetrics.com/es/cuenta-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=sitelink-3#black-friday"
"Ver planes y contratar","Growth 499 €, Scale 899 €","Facturación anual","https://sealmetrics.com/es/pricing/?utm_source=google&utm_medium=cpc&utm_campaign=q4-2026-free-{MARKET}-es&utm_content=sitelink-4"
```

### 10.4 Google Ads Editor: textos destacados

Inglés:

```csv
Callout text
"No Cookies"
"No Consent Gate"
"EU-Hosted in Dublin"
"1M Events Free"
"No Card Required"
"MCP, API and BigQuery"
```

Español:

```csv
Callout text
"Sin cookies"
"Sin consentimiento"
"Alojado en Dublín"
"1M de eventos gratis"
"Sin tarjeta"
"MCP, API y BigQuery"
```

### 10.5 Meta Ads: textos consolidados

**Texto principal, versiones cortas (6)**

<!-- limits PT=125 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| PT1 | Up to half your traffic never reaches your report. Open a free account and compare on your own site. | 100 | Hasta la mitad de tu tráfico no llega a tu informe. Abre una cuenta gratis y compáralo en tu web. | 97 |
| PT2 | Incapto ran GA4 and Sealmetrics side by side for 48 days. GA4 saw 29% fewer visits. Paid channels lost most. | 108 | Incapto usó GA4 y Sealmetrics en paralelo 48 días. GA4 vio un 29% menos de visitas. Pago perdió más. | 100 |
| PT3 | The channels you pay for lose the most behind a consent banner. Paid traffic: +37% to +52% once you measure without one. | 120 | Los canales que pagas son los que más pierden tras el banner. Pago: de +37% a +52% al medir sin él. | 99 |
| PT4 | 1M events in total, no card, nothing to cancel. Copy one prompt into Claude and the account sets itself up. | 107 | 1M de eventos en total, sin tarjeta, nada que cancelar. Copia un prompt en Claude y la cuenta se configura sola. | 112 |
| PT5 | Sign Growth or Scale before 27 November and run Black Friday and Christmas with the Enterprise SLA at your plan price. | 118 | Contrata Growth o Scale antes del 27 de noviembre y pasa Black Friday y Navidad con el SLA Enterprise. | 102 |
| PT6 | Up to a third of your sales sit under no channel. That is not a reporting bug. It is the consent gate. | 102 | Hasta un tercio de tus ventas queda sin canal. No es un error del informe. Es la puerta de consentimiento. | 106 |
| PT7 | We gift you the first million events. What you were looking at until now was something else. | 92 | Te regalamos el primer millón de eventos. Mira la realidad de tu negocio. Lo que veías hasta ahora era otra cosa. | 113 |
| PT8 | How Incapto found that its best-converting traffic was the traffic that accepted cookies least. Free account, no card. | 118 | Cómo Incapto descubrió que su tráfico que mejor convertía era el que menos aceptaba cookies. Cuenta gratis, sin tarjeta. | 120 |


**Texto principal, versiones largas (3)**

<!-- limits PTL=500 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| PTL1 | You are a CMO or eCommerce manager. Behind a consent banner your analytics misses up to half your traffic depending on the channel. The channels you pay for lose the most, and up to a third of your sales sit under no channel. I know which channels lose most. Open a free account, 1M events in total, no card, and compare on your own site. Sign before 27 November and run Black Friday and Christmas with the Enterprise SLA on your plan. | 435 | Eres CMO o responsable de eCommerce. Tras un banner de consentimiento tu analítica pierde hasta la mitad del tráfico según el canal. Los canales que pagas son los que más pierden, y hasta un tercio de tus ventas queda sin canal. Sé qué canales pierden más. Abre una cuenta gratis, 1M de eventos en total, sin tarjeta, y compáralo en tu propia web. Contrata antes del 27 de noviembre y pasa Black Friday y Navidad con el SLA Enterprise en tu plan. | 446 |
| PTL2 | Incapto, specialty coffee on Shopify, ran GA4 with Consent Mode and Sealmetrics side by side for 48 days. GA4 recorded 29% fewer visits and 45% fewer pageviews. Sealmetrics recorded 96% of real Shopify orders and 97% of revenue. Unknown-origin traffic: 14% in GA4, 0.3% in Sealmetrics. Run the same test on your site. Free account, 1M events in total, no card. | 360 | Incapto, café de especialidad en Shopify, usó GA4 con Consent Mode y Sealmetrics en paralelo durante 48 días. GA4 registró un 29% menos de visitas y un 45% menos de páginas vistas. Sealmetrics registró el 96% de los pedidos reales de Shopify y el 97% de los ingresos. Tráfico sin origen: 14% en GA4, 0,3% en Sealmetrics. Haz la misma prueba en tu web. Cuenta gratis, 1M de eventos en total, sin tarjeta. | 403 |
| PTL4 | Explain to me how you make your campaigns profitable when you cannot see half the traffic or 30% of the sales, and 40% or more of the sales you do see are attributed to the wrong channel. You have one million events to see the reality of your business. What you were looking at until now was something else. We gift you the first million events: no card, nothing to cancel. | 373 | Explícame cómo haces rentables tus campañas si no ves la mitad del tráfico ni el 30% de las ventas, y el 40% o más de las ventas que sí ves están atribuidas al canal equivocado. Tienes un millón de eventos para ver la realidad de tu negocio. Lo que mirabas hasta ahora era otra cosa. Te regalamos el primer millón de eventos: sin tarjeta, nada que cancelar. | 357 |
| PTL5 | How Palladium doubled its Display sales. Palladium Hotel Group found 40% of inbound traffic with no source and 35% of GA4 bookings with no channel. Once the channels were visible, Display Cost-per-Search improved 165%. Read the case, then run the same test on your site: we gift you the first million events, no card. | 317 | Cómo Palladium duplicó sus ventas de Display. Palladium Hotel Group encontró un 40% del tráfico entrante sin fuente y un 35% de las reservas de GA4 sin canal. Con los canales visibles, el coste por búsqueda de Display mejoró un 165%. Lee el caso y haz la misma prueba en tu web: te regalamos el primer millón de eventos, sin tarjeta. | 333 |
| PTL3 | "Consent Mode left us with a structural blind spot: we knew there was traffic we were not seeing, but we had no way to size it." Rosa Tomàs, B2C Acquisition Manager, Incapto. Size it on your own site: free account, 1M events in total, no card, set up from Claude in minutes. | 274 | "El Consent Mode nos dejaba un vacío estructural: sabíamos que había tráfico que no estábamos viendo, pero no teníamos forma de dimensionarlo." Rosa Tomàs, B2C Acquisition Manager, Incapto. Dimensiónalo en tu propia web: cuenta gratis, 1M de eventos en total, sin tarjeta, configurada desde Claude en minutos. | 309 |


**Titulares (límite 40) y descripciones (límite 30)**

<!-- limits HL=40 DS=30 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| HL1 | Free account, 1M events, no card | 32 | Cuenta gratis, 1M eventos, sin tarjeta | 38 |
| HL2 | Up to half your traffic, unreported | 35 | Hasta la mitad de tu tráfico, fuera | 35 |
| HL3 | GA4 saw 29% fewer visits at Incapto | 35 | GA4 vio un 29% menos en Incapto | 31 |
| HL4 | Enterprise SLA for Black Friday | 31 | SLA Enterprise para Black Friday | 32 |
| HL5 | Paid traffic: +37% to +52% | 26 | Tráfico de pago: de +37% a +52% | 31 |
| HL6 | Set up from Claude in minutes | 29 | Configúrala desde Claude | 24 |
| DS1 | No cookies, no consent gate | 27 | Sin cookies ni consentimiento | 29 |
| DS2 | EU-hosted in Dublin | 19 | Alojado en Dublín | 17 |
| DS3 | Sign before 27 November | 23 | Contrata antes del 27 nov | 25 |
| DS4 | Compare on your own site | 24 | Compáralo en tu web | 19 |

### 10.6 LinkedIn Ads: textos consolidados

**Texto introductorio (4 variantes)**

<!-- limits IN=150 INL=600 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| IN1 | Up to half your traffic never reaches your report. The channels you pay for lose the most. Compare on your own site, free, no card. | 131 | Hasta la mitad de tu tráfico no llega a tu informe. Los canales que pagas son los que más pierden. Compáralo en tu web, gratis, sin tarjeta. | 140 |
| IN2 | Incapto ran GA4 with Consent Mode and Sealmetrics side by side for 48 days. GA4 saw 29% fewer visits and 45% fewer pageviews. | 125 | Incapto usó GA4 con Consent Mode y Sealmetrics en paralelo 48 días. GA4 vio un 29% menos de visitas y un 45% menos de páginas vistas. | 133 |
| IN3 | Up to a third of your sales sit under no channel. Palladium Hotel Group found 35% of GA4 bookings with no channel at all. | 121 | Hasta un tercio de tus ventas queda sin canal. Palladium Hotel Group encontró un 35% de reservas de GA4 sin canal alguno. | 121 |
| IN4 | Sign Growth or Scale before 27 November and run Black Friday and Christmas with the Enterprise SLA at your plan price. | 118 | Contrata Growth o Scale antes del 27 de noviembre y pasa Black Friday y Navidad con el SLA Enterprise al precio de tu plan. | 123 |
| IN5 | You have one million events to see the reality of your business. What you were looking at until now was something else. | 119 | Tienes un millón de eventos para ver la realidad de tu negocio. Lo que mirabas hasta ahora era otra cosa. | 105 |
| IN6 | How Incapto found that its best-converting traffic was the traffic that accepted cookies least. The 48-day numbers. | 115 | Cómo Incapto descubrió que su tráfico que mejor convertía era el que menos aceptaba cookies. Las cifras de 48 días. | 115 |


**Texto introductorio largo para el anuncio de documento y el thought leader ad**

<!-- limits INL=600 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| INL2 | Explain to me how you make your campaigns profitable when you cannot see half the traffic or 30% of the sales, and 40% or more of the sales you do see are attributed to the wrong channel. We gift you the first million events so you can see the reality of your business on your own site. No card, nothing to cancel, set up from Claude in minutes. | 345 | Explícame cómo haces rentables tus campañas si no ves la mitad del tráfico ni el 30% de las ventas, y el 40% o más de las ventas que sí ves están atribuidas al canal equivocado. Te regalamos el primer millón de eventos para que veas la realidad de tu negocio en tu propia web. Sin tarjeta, nada que cancelar, configurado desde Claude en minutos. | 345 |
| INL1 | You are a CMO or eCommerce manager. Behind a consent banner your analytics misses up to half your traffic depending on the channel. The channels you pay for lose the most, and up to a third of your sales sit under no channel. I know which channels lose most: the six pages below are one Shopify store, 48 days, GA4 and Sealmetrics side by side. Open a free account, 1M events in total, no card, and compare on your own site. | 424 | Eres CMO o responsable de eCommerce. Tras un banner de consentimiento tu analítica pierde hasta la mitad del tráfico según el canal. Los canales que pagas son los que más pierden, y hasta un tercio de tus ventas queda sin canal. Sé qué canales pierden más: las seis páginas siguientes son una tienda Shopify, 48 días, GA4 y Sealmetrics en paralelo. Abre una cuenta gratis, 1M de eventos en total, sin tarjeta, y compáralo en tu propia web. | 439 |


**Titulares (límite 70)**

<!-- limits LH=70 -->
| Pos | EN | Car. | ES | Car. |
|---|---|---|---|---|
| LH1 | Free account: 1M events in total, no card, set up from Claude | 61 | Cuenta gratis: 1M de eventos en total, sin tarjeta, desde Claude | 64 |
| LH2 | GA4 vs Sealmetrics, 48 days side by side: the per-channel numbers | 65 | GA4 frente a Sealmetrics, 48 días en paralelo: las cifras por canal | 67 |
| LH3 | Up to half your traffic never reaches your report. Size it yourself. | 68 | Hasta la mitad de tu tráfico no llega a tu informe. Dimensiónalo. | 65 |
| LH4 | Enterprise SLA through Christmas if you sign before 27 November | 63 | SLA Enterprise en Navidad si contratas antes del 27 de noviembre | 64 |
| LH5 | We gift you the first million events. No card, nothing to cancel. | 65 | Te regalamos el primer millón de eventos. Nada que cancelar. | 60 |
| LH6 | How Palladium doubled its Display sales | 39 | Cómo Palladium duplicó sus ventas de Display | 44 |

### 10.7 Lista de comprobación de vocabulario antes de importar

Ejecutar sobre este archivo y sobre cualquier exportación de las plataformas. Ninguna coincidencia es aceptable en copy visible:

```
grep -n -i -E "100%|every visit|all your traffic|zero data loss|measures every|GDPR-compliant|compliant by design|free trial|14-day|14 días|per month|al mes|multi-touch|journey|session reconstruction|ISO 27001|SOC 2|real-time SLA|150x|150×|e-commerce|Ecommerce|Sealmetrics|Plausible|Fathom|Simple Analytics|Umami" CAMPAIGN-PAID-Q4-2026.md
```

Las únicas coincidencias legítimas son las de la propia lista de prohibiciones (inicio del documento, 8.3, 9 y esta sección) y "499 €/mes" o "899 €/mes" cuando "al mes" describe el precio del plan, nunca los eventos de la cuenta gratuita.
