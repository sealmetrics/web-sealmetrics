# Plan de contenido — posicionamiento por problema (sept 2026)

> Estado: **Fase 1 hecha (scorecard en §5) · PR de correcciones P0 hecho (§6)**. D1–D8 aprobadas por Rafa el 14 sep 2026 con la recomendación de la tabla; D6 verificada en docs. Inventario hecho el 14 sep 2026 sobre el build `out/` y `src/app`.
> Relación con otros docs: amplía `SEO-STRATEGY.md` §2 (clusters) y §9b (prompts GEO). Cuando una fase se cierre, su resultado se sube a `SEO-STRATEGY.md` y este fichero se marca como hecho, no se duplica.

---

## 0. Decisiones abiertas (bloquean fases concretas)

| # | Decisión | Bloquea | Recomendación |
|---|---|---|---|
| D1 | ¿Las 4 landings de problema son URLs nuevas o reconvertimos pilares existentes? | Fase 2 | Reconvertir A, B y D (ya tienen autoridad e interlinking) y crear solo C. Evita canibalizar `/complete-data`, `/use-cases/revenue-attribution` y `/gdpr-analytics` |
| D2 | Klaviyo: **no existe integración** (docs.sealmetrics.com no la tiene) | Fase 4 | No crear "Sealmetrics + Klaviyo". Como mucho, una sección "revenue de email vía UTM" dentro de otra pieza |
| D3 | Contenido de autoridad (benchmark, ranking direct/none): ¿de dónde salen los datos? | Fase 6 | Agregados anónimos de clientes solo si el DPA lo permite y con umbral mínimo de sitios por sector; alternativa: auditorías gratuitas (`/free-audit`) con consentimiento explícito |
| D4 | "Casos anonimizados" choca con la regla de CLAUDE.md (casos con nombre). `european-hotel-group` ya redirige a Palladium | Fase 6 | Seguir con casos con nombre. ¿Hay un DTC o marketplace nuevo en pipeline? |
| D5 | Marketplaces: no hay cliente ni prueba de encaje | Fase 5 | No publicar la vertical hasta tener al menos un cliente o una razón de producto verificable |
| D6 | "Atribuir a creatividad": confirmar que es `utm_content` a nivel agregado y que el informe lo muestra | Fase 2 (B) | **Verificado (14 sep)**: `utm_content` es uno de los 5 UTM estándar y la doc de UTM Mapping lo desglosa "by campaign and creative" |
| D7 | Datos de volumen de keywords | Todas | Ahrefs/Similarweb necesitan autorizar el conector; si no, GSC + estimación y lo marcamos como estimación |
| D8 | **Qué cifra de pérdida lidera el problema A.** El "13%" es un modelo en cascada (55% rechazo × 40% ad blockers × ITP). El único caso medido con nombre, Incapto, muestra que GA4 no veía el **29%** de las visitas y el **45%** de las páginas vistas. Hoy las dos cifras conviven sin explicar la diferencia | Fase 2 (A), y todas las páginas que citan 13% | Liderar con la cifra medida (Incapto) y presentar el 13% como el escenario acumulado del modelo, con su método. Una landing que promete 13% y enlaza a un caso con 29% pierde al CMO y al LLM a la vez |

---

## 1. Rúbrica "calidad TOP" (se aplica a lo existente y a lo nuevo)

Una página pasa si cumple **todos** los obligatorios:

**Obligatorios**
1. **Respuesta primero**: las primeras 40–60 palabras responden la consulta objetivo sin necesidad de contexto (es el pasaje que cita un LLM)
2. **Dolor antes que solución**, con una cifra concreta en el primer bloque
3. **Al menos un dato propio con fuente**: Incapto, Palladium o Dreamplace (cifras publicadas, nunca redondeadas ni extrapoladas)
4. **Límites explícitos**: qué no hace Sealmetrics, para quién no es
5. **FAQ visible** con preguntas redactadas como el prompt literal + `FAQPage` desde `<FaqSection>`
6. **Schema correcto** para el tipo de página, `inLanguage` vía `langOf()`, organización por `@id`
7. **EN + ES a la vez**, ES con redacción nativa
8. **Interlinking**: spoke → pilar (nunca blog → /demo en texto), primera mención → glosario, `CommercialModule` en blog
9. **Sin claims prohibidos**: multi-touch/full-funnel sobre nosotros, journeys, sesión individual, ISO/SOC 2, Frankfurt
10. `llms.txt` actualizado, prompt añadido a `SEO-STRATEGY.md` §9b, `npm run build` + `npm test` en verde

**Profundidad orientativa** (no es relleno: si no hay más que decir, se para antes)

| Tipo | Palabras |
|---|---|
| Landing de problema | 1.600–2.200 |
| Blog de problema | 1.500–2.500 |
| Integración / plataforma | 1.000–1.600 + pasos (`<HowToSteps>`) |
| Vertical `/for/*` | 1.800 (barra ya fijada en `SEO-STRATEGY.md` §6) |
| Caso de éxito | lo que el cliente haya aprobado, nada más |

---

## 2. Inventario: qué existe y en qué estado

Leyenda: **OK** existe y está cerca de TOP · **MEJORAR** existe pero falla la rúbrica · **PARCIAL** el tema está repartido pero no hay página que lo gane · **FALTA** · **NO HACER**

Palabras medidas sobre el gemelo `.md` del build. "Datos" = menciona algún caso con nombre.

### 2.1 Landings de problema

| Problema | Hoy | Palabras | ES | Datos | Estado | Acción |
|---|---|---:|:-:|:-:|---|---|
| A · GA4 no refleja la realidad | `/complete-data` (indexable) · `/measure-reality` (paid, noindex) | 1.794 | sí | no | MEJORAR | Reenfocar hero al problema, meter Incapto (29% visitas / 45% páginas vistas que GA4 no veía, 96% pedidos reconciliados) |
| B · No sé qué campañas funcionan | `/use-cases/revenue-attribution` · `/real-roas` (paid, noindex) | 1.469 | **no** | débil | MEJORAR | Reenfocar a ROAS/campaña, Dreamplace (15–20% más ventas atribuidas) y Palladium (+165% coste por búsqueda), crear ES |
| C · Marketing y Finanzas tienen números distintos | nada | — | — | — | FALTA | Nueva `/use-cases/single-source-of-truth` (propuesta). Prueba: Palladium ("un número que marca, agencias y departamentos aceptan") |
| D · Tengo que demostrar cumplimiento | `/gdpr-analytics` (hub) · `/consentless-analytics` · `/security` · `/for/dpo` | 429 (hub) | sí | no | MEJORAR | Convertir el hub (hoy fino) en la landing D; `/consentless-analytics` sigue siendo el pilar conceptual |

### 2.2 SEO de problema (blog)

| Tema | Hoy | Estado | Acción |
|---|---|---|---|
| Why GA4 shows direct / none | Solo menciones en `/vs-ga4` y `/for/cmo` | FALTA | Post nuevo. Dato: Palladium, 40% del tráfico sin source/medium y 35% de reservas sin canal |
| GA4 consent mode data loss | `/glossary/consent-mode-v2` (679, sin ES) · `/blog/consent-banner-impact-on-analytics` (845) | PARCIAL | Post nuevo "qué es medido y qué es modelado"; ampliar glosario + ES |
| Meta Ads conversions vs CRM | nada | FALTA | Post nuevo. Dato: Dreamplace cerrando el gap con el CRM. Sin prometer deduplicación ni matching de usuario |
| Cookieless analytics for European eCommerce | `/blog/cookieless-analytics-for-ecommerce` (1.633) | MEJORAR | Añadir Incapto, límites, ES |
| Server-side tracking GDPR Europe | `/glossary/server-side-tracking` (557) | PARCIAL | Post nuevo: por qué server-side no exime de consentimiento si hay dato personal, y qué sí lo cambia |
| GA4 vs Piwik PRO vs Sealmetrics | `/vs-ga4`, `/vs/piwik-pro`, `/blog/best-enterprise-analytics-platforms` | PARCIAL | Post comparativo a tres con tabla; enlaza a los dos `/vs/*` en lugar de competir con ellos |
| How to measure ROAS after cookie consent | `/glossary/return-on-ad-spend` (810, sin ES) · `/real-roas` noindex | PARCIAL | Post nuevo tipo guía con pasos (`HowTo`) |
| Last-click vs modeled attribution | `/glossary/last-click-attribution` (655) · `/glossary/attribution-model` · `/blog/multi-touch-attribution-complete-data` (748) | PARCIAL | Post nuevo, honesto con lo que el modelado sí aporta; ampliar el post de 748 o fusionar |

### 2.3 SEO por integración

| Integración | Hoy | Realidad de producto (docs) | Estado | Acción |
|---|---|---|---|---|
| Shopify | `/platforms/shopify` (1.213, sin ES) | Módulo nativo | MEJORAR | Incapto es Shopify: 96% de pedidos reales reconciliados. Es la mejora más rentable del plan |
| WooCommerce | `/platforms/woocommerce` (1.115, sin ES) | Módulo nativo | MEJORAR | ES + límites + FAQ |
| Magento | nada | Módulo nativo Magento 2.4+ / Adobe Commerce | FALTA | `/platforms/magento` |
| Google Ads | nada (FAQ en `/integrations`) | UTM + ValueTrack, prompts cross-MCP; **no** importa conversiones ni alimenta pujas | FALTA | `/integrations/google-ads`, con esa limitación arriba |
| Meta Ads | nada | UTM + prompts cross-MCP (gap de atribución iOS, ROAS por audiencia) | FALTA | `/integrations/meta-ads` |
| BigQuery | `/integrations` (451, hub) | Conector nativo desde Growth, horario o diario, backfill | FALTA | `/integrations/bigquery` con esquema y ejemplos SQL reales |
| Klaviyo | nada | **No existe** | NO HACER | Ver D2 |

### 2.4 SEO por vertical

| Vertical | Hoy | Estado | Acción |
|---|---|---|---|
| Hoteles | `/for/hotels` (1.155, ES) · `/blog/cookieless-analytics-for-hotels` (1.262, sin ES) | MEJORAR | Es la vertical con más prueba (Palladium + Dreamplace). Subir a la barra de 1.800 y ES del blog |
| Atribución para DTC | `/blog/consentless-analytics-for-dtc` (1.290, sin ES) · `/for/ecommerce` (851) | MEJORAR | Reenfocar a atribución, Incapto como prueba, ES |
| Marketplaces | nada | NO HACER aún | Ver D5 |
| Agencias | `/for/agencies` (771) | MEJORAR | Página fina. Partners (Product Hackers, 3dids, Ayesa), ángulo Palladium con varias agencias |
| Retailers multimarca | nada (portfolio analytics solo en `/pricing`) | FALTA | `/for/multi-brand-retailers`. Palladium es un grupo multimarca |

### 2.5 Contenido de autoridad

| Pieza | Hoy | Estado | Acción |
|---|---|---|---|
| Benchmark europeo de pérdida de datos | Caso Incapto + `/data-loss-calculator` + serie `analytics-tools-*` (mide trackers, no pérdida) | FALTA | Depende de D3 |
| State of Consentless Analytics (anual) | nada | FALTA | Pieza insignia Q1 2027, depende de D3 |
| Ranking direct/none por sector | nada | FALTA | Depende de D3; mínimo N sitios por sector o no se publica el sector |
| Casos anonimizados | `european-hotel-group` ya redirige a Palladium | NO HACER | Ver D4. Mejor: ampliar Palladium (516) y Dreamplace (510) solo con lo que el cliente apruebe |

### 2.6 Contenido de producto

| Pieza | Hoy | Estado | Acción |
|---|---|---|---|
| Changelog público | `/changelog` (1.193, ES) | OK | Revisar cadencia y que cada entrada tenga fecha real |
| Vídeos de análisis reales | `/videos` (262) | MEJORAR | Transcripción visible + `VideoObject`. Necesita grabaciones |
| Tutoriales técnicos | docs.sealmetrics.com | OK fuera de la web | No duplicar en la web; enlazar desde las páginas de integración |
| Consultas MCP | `/docs/mcp` (1.241) · `/ai-analytics` · docs `web-analytics-prompts/*` | PARCIAL | Biblioteca de prompts por problema (A–D) en la web: muy citable por LLMs |
| Plantillas de dashboards | `/data-studio` es un redirect al informe de un clic | PARCIAL | Página indexable que explique la plantilla, o se queda como short link |
| Ejemplos BigQuery | nada | FALTA | Dentro de `/integrations/bigquery` |

**Resumen** (34 temas del plan): 2 OK · 10 MEJORAR · 7 PARCIAL · 12 FALTA · 3 NO HACER (hasta decidir).

---

## 3. Fases

Cadencia: **un PR por pieza o por pareja de piezas**, siempre EN + ES, build y tests en verde. Nada se publica a medias.

### Fase 1 · Auditoría profunda de lo existente (1 semana)
Pasar la rúbrica §1 a los 10 temas MEJORAR (y sus URLs) y dejar un scorecard (qué falla, qué dato de caso encaja, qué FAQ falta). Salida: tabla en este fichero. No se toca contenido todavía.

### Fase 2 · Las 4 landings de problema (2–3 semanas) — la base del reposicionamiento
1. **A** `/complete-data` reenfocada + Incapto
2. **B** `/use-cases/revenue-attribution` reenfocada + Dreamplace/Palladium + ES
3. **C** `/use-cases/single-source-of-truth` nueva + Palladium
4. **D** `/gdpr-analytics` hub reconvertido
5. Entrada "Por problema" en navegación, `/product` y `/use-cases` apuntando a las cuatro; los paid LP (`/measure-reality`, `/real-roas`) siguen noindex

### Fase 3 · Mejoras rápidas con datos propios (1–2 semanas)
`/platforms/shopify` + Incapto · `/blog/cookieless-analytics-for-ecommerce` · `/for/hotels` + blog hoteles · `/for/agencies` · ES que faltan en `/platforms/*`.

### Fase 4 · SEO de problema (4 semanas, 2 posts por semana)
Orden por intención comercial: direct/none → ROAS tras consentimiento → Meta Ads vs CRM → consent mode → last-click vs modelado → GA4 vs Piwik PRO vs Sealmetrics → server-side y RGPD.

### Fase 5 · Integraciones (2–3 semanas)
`/platforms/magento` → `/integrations/bigquery` → `/integrations/google-ads` → `/integrations/meta-ads`. Cada una verificada contra docs.sealmetrics.com antes de escribir.

### Fase 6 · Verticales (2 semanas)
`/for/multi-brand-retailers` (nueva) · DTC reenfocado. Marketplaces solo si D5 se resuelve.

### Fase 7 · Producto y autoridad (continuo)
Biblioteca de prompts MCP · `/videos` con transcripciones · benchmark y State of Consentless Analytics cuando D3 esté resuelto.

---

## 4. Medición

- **Antes de la fase 2**: baseline GSC (clics, impresiones, posición) de las URLs afectadas y fila en el log de §9b
- **Por pieza nueva**: su prompt EN/ES entra en `SEO-STRATEGY.md` §9b, así `geo-probe.mjs` lo mide solo el mes siguiente
- **A 8 semanas de cada fase**: impresiones de la consulta objetivo, prompts ganados/citados, demos desde orgánico

---

## 5. Fase 1 · Scorecard (14 sep 2026)

Método: lectura completa del gemelo `.md` de cada URL, JSON-LD del HTML construido, `public/llms.txt`, y contraste de cada afirmación de producto con docs.sealmetrics.com. No se ha tocado contenido.

### 5.1 Hallazgos transversales

Se arreglan una vez y se aplican a todas las páginas afectadas. Van antes que cualquier reescritura, porque una landing nueva que repita estos errores los multiplica.

| # | Hallazgo | Evidencia | Páginas | Gravedad |
|---|---|---|---|---|
| T1 | **El modelo de atribución está mal descrito.** Varias páginas dicen que la conversión se atribuye "a la fuente de la página donde se dispara". La doc dice otra cosa: last-click **con ámbito de sesión** (~2 h de inactividad), la conversión hereda la entrada más reciente, sin ventana de lookback | docs `reports/insights/attribution-model` | revenue-attribution, blog ecommerce, blog hoteles, /for/hotels | P0 |
| T2 | **"Reconcilia con el backend dentro del 15–20%"** repetido en 6 URLs, sin fuente. El único dato medido (Incapto) es 96% de pedidos y 97% de facturación registrados. El 15–20% de Dreamplace es otra métrica: *más ventas atribuidas* | `case-studies.tsx` | revenue-attribution, shopify, woocommerce, blog ecommerce, blog DTC, /for/ecommerce | P0 |
| T3 | **Contradicción sobre `order_id`.** revenue-attribution promete unir cada pedido por `order_id` en BigQuery "sin fuzzy matching". Shopify y WooCommerce dicen que el `order_id` no se guarda. La doc dice que Sealmetrics no deduplica, no valida pedidos y no cruza con el ERP | docs `why-more-conversions-than-erp` | revenue-attribution vs platforms/* | P0 |
| T4 | **Cifras de pérdida incoherentes entre sí**: 13%, 13–40%, 40–60% por consentimiento, ad blockers al 25% en un sitio y al 40% en otro, y el 29% medido de Incapto | ver D8 | complete-data, blog ecommerce, blog DTC, revenue-attribution, /videos | P0 (decisión) |
| T5 | **FAQ visible sin `FAQPage`** en las 12 URLs. Usan un bloque propio en vez de `<FaqSection>`, así que las preguntas mejor redactadas del sitio no son extraíbles como FAQ | HTML construido | las 12 | P1 |
| T6 | **Plantilla `/for/*`**: la FAQ "¿Es realmente conforme al RGPD sin banner? Sí…" es categórica, justo lo que #186 matizó en `/consentless-analytics` esta mañana. Además es idéntica en todas las verticales (contenido duplicado) y el bloque final dice "eCommerce" también en hoteles | `VerticalPageV3.tsx` | /for/hotels, /for/ecommerce, /for/agencies (y el resto de `/for/*`) | P1 |
| T7 | **Cifras sin fuente**: "de 30–40% a menos del 5%", "25–45% en B2C", "5–10% del PMS en la semana 4", "el rebote baja un 5–8%", "+30–40% de tráfico recuperado", "40% de add-to-carts", "onboarding en 15 min", "LCP < 50 ms" | lectura | varias | P1: se quitan o se sustituyen por dato de caso |
| T8 | **Los casos con nombre casi no se usan**: 0 menciones en 8 de 12 URLs; Incapto no aparece ni en Shopify ni en eCommerce, y `/for/ecommerce` sigue usando una cita anónima ("Founder & CEO · DTC brand") | `out/*.md` | ver tabla | P1 |
| T9 | **Falta ES**: `/use-cases/*` entero, `/platforms/shopify`, `/platforms/woocommerce`, los 3 blogs y `/videos` | `src/app/(es)` | 7 URLs | P1 |
| T10 | **Primera mención sin enlace a glosario**: 0 enlaces en complete-data, gdpr-analytics, shopify, woocommerce y agencies | `out/*.md` | 5 URLs | P2 |

### 5.2 Scorecard por URL

✓ cumple · ~ parcial · ✗ no cumple. Columnas = los 10 obligatorios de §1: **1** respuesta primero · **2** dolor + cifra · **3** dato propio · **4** límites · **5** FAQ con schema · **6** schema del tipo · **7** ES · **8** interlinking · **9** sin claims erróneos · **10** llms.txt EN+ES.

| URL | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | Nota | Veredicto |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|---|
| `/complete-data` (A) | ✗ | ✓ | ✗ | ✓ | ~ | ✓ | ✓ | ~ | ✗ | ✓ | 5 | Reescribir apertura y claims |
| `/use-cases/revenue-attribution` (B) | ✓ | ~ | ~ | ✓ | ~ | ✓ | ✗ | ✓ | ✗ | ~ | 5 | Buena base; corregir T1–T3 |
| `/gdpr-analytics` (D) | ✓ | ✗ | ✗ | ✓ | ✗ | ✓ | ✓ | ~ | ✓ | ✓ | 5 | Correcto pero es un índice de 328 palabras, no una landing |
| `/blog/cookieless-analytics-for-ecommerce` | ~ | ✓ | ✗ | ✓ | ~ | ✓ | ✗ | ✓ | ✗ | ~ | 4 | Corregir y añadir Incapto |
| `/platforms/shopify` | ✓ | ✗ | ✗ | ✓ | ~ | ~ | ✗ | ~ | ~ | ~ | 4 | Mejor oportunidad: Incapto |
| `/platforms/woocommerce` | ✓ | ✗ | ✗ | ✓ | ~ | ~ | ✗ | ~ | ~ | ~ | 4 | ES + pasos `HowTo` |
| `/for/hotels` | ✓ | ✓ | ~ | ✗ | ~ | ✓ | ✓ | ~ | ✗ | ✓ | 5 | Casos mal citados |
| `/blog/cookieless-analytics-for-hotels` | ~ | ✓ | ✗ | ✓ | ~ | ✓ | ✗ | ✓ | ✗ | ~ | **3** | **La más peligrosa**: afirma integraciones que no existen |
| `/blog/consentless-analytics-for-dtc` | ✓ | ✓ | ✗ | ✓ | ~ | ✓ | ✗ | ✓ | ~ | ~ | 5 | Bien escrito, pero habla de cumplimiento y no de atribución DTC |
| `/for/ecommerce` | ✓ | ✓ | ✗ | ✗ | ~ | ✓ | ✓ | ~ | ✗ | ✓ | 4 | Cambiar cita anónima por Incapto |
| `/for/agencies` | ✓ | ✓ | ✗ | ✗ | ~ | ✓ | ✓ | ✗ | ~ | ✓ | 4 | Fina; claims comerciales sin verificar |
| `/videos` | ✗ | ✗ | ✗ | ~ | ✗ | ✓ | ✗ | ✓ | ✓ | ~ | **3** | 2 vídeos, sin transcripción |

**Ninguna de las 12 pasa la rúbrica.** Mediana 4/10.

### 5.3 Correcciones concretas por URL

**`/complete-data`**
- P0 · La "Quick answer" trata sobre **Google Meridian MMM**, no sobre la página. Es el pasaje que se marca como `speakable` y el primero que lee un LLM. Viene de un texto pegado a mano en `page.tsx:128`
- P0 · Cita mal a Dreamplace: "+30% más reservas atribuidas en tráfico directo". Lo publicado es +30% de tráfico frente a GA y un 15–20% más de ventas atribuidas
- P0 · "Las ventanas de atribución se amplían, las conversiones repetidas dejan de clasificarse como nuevas" contradice que no hay lookback ni reconocimiento de visitante recurrente (T1)
- P1 · La tarjeta CFO enlaza a `/for/cmo`
- P1 · "La recogida first-party corre desde tu propio dominio" solo es cierto con endpoint propio configurado; por defecto es `t.sealmetrics.com`
- P1 · T4, T5, T7, T10

**`/use-cases/revenue-attribution`**
- P0 · T1 (describe la atribución por carga de página) y T3 (join por `order_id`)
- P0 · "Los totales por campaña cuadran exactamente con el gasto de la plataforma": se compara ingreso con coste, la frase no tiene sentido
- P1 · La cita de Dreamplace va sin sus cifras; Palladium (+165%) no aparece. Crear ES
- Conservar: la sección de límites (multi-touch, view-through, MMM) es de lo mejor del sitio

**`/gdpr-analytics`**
- P1 · No tiene dolor, datos, FAQ ni enlaces a glosario. Como índice es honesto; como landing D hay que construirla (Fase 2)

**`/blog/cookieless-analytics-for-ecommerce`**
- P0 · El pasaje de apertura dice "elígelo frente a Plausible o Matomo": rompe el posicionamiento (nunca frente a Plausible)
- P0 · "Instalación en un clic en Shopify Plus y snippet en Standard" está desfasado; `/platforms/shopify` dice que no hay distinción por plan
- P0 · "Los ad blockers no pueden bloquearlo porque corre en tu dominio" es una promesa absoluta que depende de la configuración
- P1 · T1, T2, T9; añadir Incapto

**`/platforms/shopify`**
- P1 · Sustituir el 15–20% por Incapto, que es Shopify: 96% de los pedidos reales y 97% de la facturación registrados, frente a un GA4 que no veía el 29% de las visitas
- P1 · Pasos de instalación con `<HowToSteps>` + `HowTo`; enlaces a glosario; ES

**`/platforms/woocommerce`**
- P1 · T2, T7 (LCP < 50 ms sin fuente), pasos `HowTo`, ES

**`/for/hotels`**
- P0 · "35% de reservas ahora atribuidas" invierte la cifra: el 35% es el porcentaje de reservas de GA4 **sin canal** antes del cambio
- P0 · "Mismo hallazgo: faltaba la mitad de los datos" no lo sostiene ningún caso (40% y +30%)
- P1 · No menciona los **passthrough referrers** (motores de reservas y pasarelas que conservan la fuente), la función real más relevante para hoteles
- P1 · T6; subir a la barra de 1.800 palabras

**`/blog/cookieless-analytics-for-hotels`**
- P0 · "Sealmetrics ofrece integraciones nativas con Mews, Cloudbeds y Opera" **es falso**: la propia `/for/hotels` dice que no hay plugin de PMS, y la doc tampoco lo recoge
- P0 · "Multiplica reservas por el ADR del PMS" describe un mecanismo que no existe
- P0 · "Dentro del 5–10% del PMS en la semana 4" y "el rebote en móvil baja un 5–8%" no tienen fuente
- P1 · T1, T9; Palladium y Dreamplace no aparecen

**`/blog/consentless-analytics-for-dtc`**
- P1 · "Solo lo consentless queda legalmente fuera del ámbito" es categórico; alinear con #186
- P1 · Checklist DPO: "¿recoge IP o IDs de sesión? Debe ser no". Contrastar con `security-privacy/what-we-track` antes de mantenerlo, porque hay un marcador de sesión derivado del contexto
- P1 · La intención "atribución para DTC" no está cubierta: se reenfoca con Incapto o se crea pieza nueva (se decide en Fase 6)

**`/for/ecommerce`**
- P0 · "El pixel first-party corre en tu dominio, checkout.yourshop.com, donde sea": promesa absoluta; en Shopify la compra se confirma por webhook
- P1 · Cita anónima → Rosa Tomàs (Incapto); T2, T6, T7

**`/for/agencies`**
- P1 · Verificar con Rafa antes de mantener: "reseller con margen", "white-label", "onboarding en 15 minutos". La doc sí confirma el cambio entre organizaciones para agencias con varios clientes
- P1 · La línea de partners se muestra como cita (blockquote) sin autor: formato engañoso
- P1 · Añadir el ángulo Palladium (marca + varias agencias alineadas sobre un número); T6, T10

**`/videos`**
- P1 · Dos vídeos sin transcripción visible; el `VideoObject` no tiene texto que citar. Añadir transcripciones y un párrafo de respuesta

### 5.4 Orden de ataque que sale de la auditoría

1. **PR de correcciones P0** (sin reescribir): Meridian, PMS nativo, cifras de casos mal citadas, Plausible, descripción de atribución, `order_id`. Es riesgo reputacional hoy y no depende de la Fase 2. Estos cambios **sí** justifican `dateModified`, porque cambian lo que la página afirma
2. **Decidir D8** (qué cifra lidera A)
3. **Migrar las FAQ de estas páginas a `<FaqSection>`** (T5) y corregir la plantilla `/for/*` (T6): un cambio de componente que arregla muchas páginas a la vez
4. Fase 2 (landings A–D) con las correcciones ya aplicadas

---

## 6. PR de correcciones P0 (14 sep 2026)

Aplica las correcciones de §5.3 y todas las apariciones de las mismas incongruencias en el resto del sitio (EN y ES), no solo en las 12 URLs auditadas.

**Hechos canónicos usados** (contrastados con docs.sealmetrics.com y `case-studies.tsx`):
- Atribución: last-click **con ámbito de sesión**, ~2 h de inactividad, sin lookback entre sesiones
- Conciliación: Incapto, 48 días en Shopify, **96% de pedidos y 97% de facturación**; Sealmetrics no deduplica ni valida pedidos; el `order_id` no se guarda
- Palladium: 40% del tráfico sin source/medium · 35% de reservas de GA4 **sin canal** · +165% Coste por Búsqueda. Nunca "recuperó el 35%"
- Dreamplace: +30% de tráfico frente a GA · **15–20% más ventas atribuidas**. Nunca "gap cerrado"
- First-party: opcional, subdominio propio; por defecto `t.sealmetrics.com`; "muchas menos probabilidades de bloqueo", nunca "invisible"
- PMS: sin plugin; eventos estándar + API + passthrough referrers
- Cumplimiento: tono de #186 — diseñado para no necesitar consentimiento, la exención depende de la configuración y del regulador
- D8: cifra medida (Incapto 29%) delante; 13% presentado como modelo del peor escenario

**Pendiente, fuera de este PR**
1. ~~**Barrido D8 en el resto del sitio**~~ — hecho en #190: el 13% sigue como hecho en capítulos de `/open`, `/vs-ga4`, tablas de `best-enterprise-analytics-platforms` y `ga4-alternatives-enterprise` (que además dan a GA360 un 30–35% frente al 13% de GA4, siendo la misma etiqueta con el mismo consentimiento) y en la home
2. **`dateModified` de pilares, plataformas y use-cases no se ha subido**: `date-modified-not-visible` exige mostrar "Updated" y esas plantillas no lo renderizan. Los blogs sí se han subido (lo muestra `<PostByline>`)
3. **Confirmar con Rafa** los claims comerciales de `/for/agencies`: acuerdos de reseller con margen, white-label, onboarding en 15 minutos
4. **Rangos sin fuente en `VerticalsData.tsx`**: +30–70% (CMO), +40% (SaaS), +50–80% (media), 4–6 h/semana
5. **Docs**: `first-party` habla de registro A y otras páginas de CNAME; `adblocker-bypass` dice "captures 100%" y "no ad blocker flags this", más fuerte que la propia página de first-party
6. T5 (FAQ → `<FaqSection>`), T9 (ES que faltan) y `/es/complete-data` sin Quick answer: siguen en Fase 3

**Pendiente tras #190**
- El rango "40–60% de rechazo de consentimiento" sigue usándose como cifra típica; la doc de ad blockers dice 15–60% según sector
- Los claims de posicionamiento "captura el 100%" se mantienen, aunque el caso Incapto dice expresamente que no afirma el 100%; decidir si se matizan

---

## 7. Fase 2 · Landings de problema

| Landing | URL | Estado |
|---|---|---|
| C · Marketing y Finanzas tienen números distintos | `/use-cases/single-source-of-truth` (EN+ES) | **Hecha** — plantilla v4 `ProblemLandingSignal`, contenido en `src/lib/content/problem-landings/` |
| A · GA4 no refleja la realidad | `/complete-data` (EN+ES) | **Hecha** — portada a `ProblemLandingSignal`, firma visible con fecha de actualización |
| B · No sé qué campañas funcionan | `/use-cases/revenue-attribution` (EN) + `/es/use-cases/revenue-attribution` (nueva) | **Hecha** — `ProblemLandingSignal`, configuración de UTM a ROAS verificada contra docs |
| D · Tengo que demostrar cumplimiento | `/gdpr-analytics` (EN+ES) | **Hecha** — `ProblemLandingSignal`, respuestas desde el DPA, tono de #186, sigue siendo el hub por país |
| Entrada "Por problema" en navegación, `/product` y `/use-cases` | Header · `/product` · `/use-cases` | **Hecha** — primer grupo de Soluciones (en columnas), cuatro tarjetas enlazadas en `/product`, frase contextual en `/use-cases` |

La plantilla fija el orden de toda landing de problema: dolor → respuesta rápida → por qué ocurre (tabla) → coste → método (`HowTo`) → roles → prueba con casos → límites → FAQ visible (`FAQPage`) → CTA.

---

## 8. Fase 3 · Mejoras rápidas con datos propios

| Pieza | Estado |
|---|---|
| `/platforms/shopify` + Incapto, y crear `/es/platforms/shopify` | **Hecha** — plantilla v4, datos contrastados con la doc de Shopify (evento `begin_checkout`, webhook sin backfill, Managed Pricing); fuera la afirmación sin fuente sobre tipos de cambio del BCE |
| `/platforms/woocommerce` + ES | **Hecha** — contrastada con la doc: descarga desde el dashboard, compra enviada desde la página de confirmación (no en servidor); fuera WPML/Polylang, hooks concretos y detección de checkout por bloques, sin respaldo |
| `/for/hotels` a la barra de 1.800 palabras + blog hoteles ES | Pendiente |
| `/for/agencies` | Pendiente — necesita confirmar reseller con margen, white-label y onboarding en 15 min |
| `/blog/cookieless-analytics-for-ecommerce` y `/blog/consentless-analytics-for-dtc` en ES | Pendiente |

Observado de paso: la documentación lista una integración con BigCommerce que el hub `/platforms` no muestra.
