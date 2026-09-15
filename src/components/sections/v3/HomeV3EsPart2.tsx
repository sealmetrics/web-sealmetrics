import Link from "next/link";
import { PRICING, fmtPrice } from "@/lib/content/pricing";

/* INDUSTRIES · ES */
export function IndustriesBuiltForEs() {
  return (
    <section className="py-28 bg-warm-50 border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">Hecho para</span>
            <h2 className="h-section mt-5">
              Los equipos para los que <em>&ldquo;la mitad del dato&rdquo;</em> no es aceptable.
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Sealmetrics encaja en cualquier equipo que decide de ingresos con datos de marketing — pero aparece primero donde el rechazo de consentimiento duele más.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <IndustryCardEs
            tag="Hoteles & Travel"
            name={<>Hoteles &amp; <em className="italic-accent">cadenas hoteleras</em></>}
            line="Donde el rechazo de cookies esconde reservas reales del CRM y la comparación con OTAs se rompe."
            proof="Palladium Hotel Group · 40% tráfico recuperado, +165% Display CPS"
            scene={
              <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#F5F5F0" />
                <circle cx="330" cy="80" r="34" fill="#E8B84B" />
                <path d="M0,240 Q100,230 200,240 T400,238 L400,300 L0,300 Z" fill="#2D8B6D" opacity="0.18" />
                <rect x="70" y="110" width="170" height="130" fill="#0E0E0C" />
                <g fill="#E8B84B">
                  {[125, 150, 175].map((y) =>
                    [85, 115, 145, 175, 205].map((x) => (
                      <rect key={`${x}-${y}`} x={x} y={y} width="14" height="14" opacity={((x + y) % 60 === 0) ? 0.5 : 1} />
                    ))
                  )}
                </g>
                <rect x="145" y="200" width="20" height="40" fill="#FAFAF7" />
                <g stroke="#0E0E0C" strokeWidth="3" fill="#2D8B6D" strokeLinecap="round">
                  <path d="M290,240 L290,180" fill="none" />
                  <path d="M290,180 Q278,172 268,178 Q276,168 286,170 Q280,162 288,158 Q296,162 290,170 Q302,168 310,178 Q300,172 290,180" />
                </g>
              </svg>
            }
          />
          <IndustryCardEs
            tag="eCommerce"
            name={<>eCommerce &amp; <em className="italic-accent">marcas DTC</em></>}
            line="Donde paid media y CRM no cuadran cada trimestre, y el debate de los bloqueadores no termina nunca."
            proof="DTC & marcas de moda · +30–40% recuperado"
            scene={
              <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#C9E3D4" />
                <rect x="80" y="80" width="240" height="160" rx="10" fill="#FAFAF7" stroke="#0E0E0C" strokeWidth="2" />
                <rect x="80" y="80" width="240" height="30" rx="10" fill="#0E0E0C" />
                <rect x="80" y="104" width="240" height="6" fill="#0E0E0C" />
                <circle cx="96" cy="95" r="3" fill="#E8B84B" />
                <circle cx="108" cy="95" r="3" fill="#2D8B6D" />
                <circle cx="120" cy="95" r="3" fill="#B5423B" />
                <rect x="100" y="128" width="70" height="90" fill="#E4E3DE" />
                <rect x="180" y="128" width="60" height="14" fill="#0E0E0C" />
                <rect x="180" y="150" width="90" height="8" fill="#6B6B5E" />
                <rect x="180" y="165" width="70" height="8" fill="#6B6B5E" />
                <rect x="180" y="190" width="90" height="28" rx="4" fill="#2D8B6D" />
                <text x="225" y="209" fill="#fff" fontFamily="Onest,sans-serif" fontSize="10" fontWeight="700" textAnchor="middle">AÑADIR</text>
                <path d="M100,265 L140,250 L180,258 L220,232 L260,240 L300,215" fill="none" stroke="#0E0E0C" strokeWidth="3" strokeLinecap="round" />
                <circle cx="300" cy="215" r="5" fill="#0E0E0C" />
              </svg>
            }
          />
          <IndustryCardEs
            tag="Infraestructura"
            name={<>Alojado en UE <em className="italic-accent">por arquitectura</em></>}
            line="Alojado en Dublín, Irlanda. Schrems II limpio. Diseñada para el RGPD desde la arquitectura (autoevaluación), no como capa de compliance."
            proof="Dublín · Irlanda · Schrems II limpio · RGPD"
            scene={
              <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#0E0E0C" />
                <g fill="#1A1A16" stroke="#2B2A28" strokeWidth="1">
                  <rect x="40" y="60" width="80" height="200" />
                  <rect x="160" y="60" width="80" height="200" />
                  <rect x="280" y="60" width="80" height="200" />
                </g>
                <g fill="#2B2A28">
                  {[80, 115, 150, 185, 220].map((y) =>
                    [50, 170, 290].map((x) => (
                      <rect key={`${x}-${y}`} x={x} y={y} width="60" height="28" />
                    ))
                  )}
                </g>
                <g fill="#00FF7F">
                  {[94, 129, 164, 199, 234].map((y) =>
                    [100, 220, 340].map((x) => (
                      <circle key={`l-${x}-${y}`} cx={x} cy={y} r="2" />
                    ))
                  )}
                </g>
                <g fill="#E8B84B">
                  <circle cx="60" cy="94" r="2" /><circle cx="180" cy="129" r="2" /><circle cx="300" cy="164" r="2" />
                </g>
                <text x="200" y="290" fill="#6B6B5E" fontFamily="JetBrains Mono,monospace" fontSize="9" letterSpacing="2" textAnchor="middle">UE · DUBLÍN · IRLANDA</text>
              </svg>
            }
          />
          <IndustryCardEs
            tag="Agencias & grupos"
            name={<>Agencias &amp; <em className="italic-accent">grupos multi-marca</em></>}
            line="Donde marca, agencia de medios y creativa necesitan el mismo número para firmar objetivos de conversión."
            proof="Partners: Product Hackers · 3dids · Ayesa"
            scene={
              <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#FAFAF7" />
                <g stroke="#0E0E0C" strokeWidth="2" fill="#F5F5F0">
                  <rect x="50" y="90" width="90" height="120" rx="6" />
                  <rect x="155" y="60" width="90" height="180" rx="6" />
                  <rect x="260" y="110" width="90" height="100" rx="6" />
                </g>
                <g fill="#0E0E0C">
                  <rect x="62" y="100" width="66" height="8" /><rect x="62" y="115" width="40" height="6" />
                  <rect x="167" y="70" width="66" height="8" /><rect x="167" y="85" width="50" height="6" />
                  <rect x="272" y="120" width="66" height="8" /><rect x="272" y="135" width="44" height="6" />
                </g>
                <g fill="#2D8B6D">
                  <rect x="62" y="135" width="66" height="60" opacity="0.18" />
                  <rect x="167" y="105" width="66" height="120" opacity="0.18" />
                  <rect x="272" y="155" width="66" height="40" opacity="0.18" />
                </g>
                <g fill="none" stroke="#2D8B6D" strokeWidth="2.5">
                  <path d="M70,180 L90,165 L110,170 L128,155" />
                  <path d="M175,190 L195,170 L215,175 L233,150" />
                  <path d="M280,185 L300,175 L320,175 L338,165" />
                </g>
                <circle cx="128" cy="155" r="4" fill="#2D8B6D" />
                <circle cx="233" cy="150" r="4" fill="#2D8B6D" />
                <circle cx="338" cy="165" r="4" fill="#2D8B6D" />
                <text x="200" y="275" fill="#6B6B5E" fontFamily="JetBrains Mono,monospace" fontSize="10" letterSpacing="1.5" textAnchor="middle">UNA FUENTE · MUCHAS MARCAS</text>
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}

function IndustryCardEs({ tag, name, line, proof, scene }: { tag: string; name: React.ReactNode; line: string; proof: string; scene: React.ReactNode; }) {
  return (
    <article className="bg-white border border-warm-100 rounded-xl overflow-hidden flex flex-col transition-all hover:border-rule-2 hover:-translate-y-0.5">
      <div className="aspect-[4/3] w-full border-b border-warm-100 overflow-hidden">{scene}</div>
      <div className="p-6 flex flex-col gap-1.5 flex-1">
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-soft">{tag}</span>
        <h3 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink mt-0.5">{name}</h3>
        <p className="text-[14px] leading-[1.55] text-ink-soft mt-1.5 flex-1">{line}</p>
        <span className="font-mono text-[11px] font-semibold tracking-[0.04em] text-brand mt-3 pt-3 border-t border-warm-100">{proof}</span>
      </div>
    </article>
  );
}

/* COMPARATOR · ES */
export function ComparatorGA4Es() {
  const rows: { cap: string; ga: string; seal: string; icoGa: "no" | "partial"; icoSeal: "yes" }[] = [
    { cap: "Método de medición", ga: "Basado en cookies · requiere consentimiento", seal: "Sin cookies · sin pérdida por consentimiento", icoGa: "partial", icoSeal: "yes" },
    { cap: "Banner de consentimiento", ga: "Obligatorio en UE · ~40–60% lo rechazan", seal: "No requerido · sin penalización de rebote", icoGa: "no", icoSeal: "yes" },
    { cap: "Datos a escala", ga: "Muestreados y modelados sobre cierto umbral", seal: "Cero muestreo · cada evento observado", icoGa: "partial", icoSeal: "yes" },
    { cap: "Atribución", ga: "Sesgada hacia el ecosistema Google", seal: "Neutral · sin inventario publicitario", icoGa: "partial", icoSeal: "yes" },
    { cap: "Acceso AI / MCP", ga: "Sin integración LLM / MCP nativa", seal: "Consulta vía Claude o ChatGPT · MCP nativo", icoGa: "no", icoSeal: "yes" },
    { cap: "Alojamiento & compliance", ga: "US · problemas con Schrems II", seal: "UE (Dublín, Irlanda) · RGPD · ePrivacy", icoGa: "no", icoSeal: "yes" },
  ];

  return (
    <section id="compare-table" className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">Cómo se compara</span>
            <h2 className="h-section mt-5">GA4 vs Sealmetrics. <em>Corre los dos en paralelo.</em></h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            No te pedimos reemplazar GA4. Corre Sealmetrics en paralelo durante 30 días, compara los números con tu propio CRM y decide para qué sirve cada uno.
          </p>
        </div>

        <div className="bg-white border border-warm-100 rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-[1.4fr_1fr_1fr] border-b border-warm-100 bg-warm-50 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-soft font-bold">
            <div className="p-5">Capacidad</div>
            <div className="p-5">Google Analytics 4</div>
            <div className="p-5 bg-white text-ink" style={{ borderLeft: "2px solid #2D8B6D" }}>Sealmetrics</div>
          </div>
          {rows.map((r, i) => (
            <div key={r.cap} className={`grid md:grid-cols-[1.4fr_1fr_1fr] ${i < rows.length - 1 ? "border-b border-warm-100" : ""}`}>
              <div className="p-5 md:p-6 text-ink font-semibold text-[14.5px]">{r.cap}</div>
              <div className="p-5 md:p-6 text-[14px] text-ink-soft leading-[1.5] flex items-start gap-2.5"><IcoBadge kind={r.icoGa} />{r.ga}</div>
              <div className="p-5 md:p-6 text-[14px] text-ink leading-[1.5] flex items-start gap-2.5 font-medium" style={{ background: "rgba(45,139,109,0.04)", borderLeft: "2px solid #2D8B6D" }}>
                <IcoBadge kind={r.icoSeal} />{r.seal}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-6 bg-warm-50 border border-warm-100 rounded-xl text-center text-[15px] text-ink-2 leading-[1.55]">
          <b className="text-ink font-semibold">No es &ldquo;GA4 está roto&rdquo;.</b> Corre Sealmetrics junto a GA4 durante 30 días. Compara con tu propio CRM. <em className="italic-accent">Y entonces decide.</em>
        </div>
      </div>
    </section>
  );
}

function IcoBadge({ kind }: { kind: "yes" | "no" | "partial" }) {
  const styles = {
    yes: { bg: "#2D8B6D", fg: "#fff", char: "✓" },
    no: { bg: "#F5E1DE", fg: "#B5423B", char: "✕" },
    partial: { bg: "#F5E8C7", fg: "#2B2A28", char: "~" },
  }[kind];
  return (
    <span className="inline-flex shrink-0 w-[18px] h-[18px] rounded-full items-center justify-center text-[11px] font-bold mt-0.5" style={{ background: styles.bg, color: styles.fg }}>
      {styles.char}
    </span>
  );
}

/* HOW IT WORKS · ES */
export function HowItWorksV3Es() {
  return (
    <section id="how" className="py-28 bg-warm-50 border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">Implementación</span>
            <h2 className="h-section mt-5">De la instalación a <em>decisiones defendibles</em> en una semana.</h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Corre junto a GA4. Sin migración, sin interrupciones. Un script — igual que cualquier herramienta de analítica — pero sin banner de cookies y sin muestreo. Datos reales desde la primera hora.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { n: "Paso 01", time: "5–30 minutos", title: "Instala el pixel", p: "Un solo script. Funciona junto a GA4. Sin cambios de código, sin banners de cookies, sin piruetas en tag manager." },
            { n: "Paso 02", time: "Día 1", title: "Datos visibles", p: "Tráfico desde la primera hora. Visitantes, fuentes y conversiones — observados server-side, sin depender del consentimiento." },
            { n: "Paso 03", time: "Semana 1", title: "Escala lo que funciona", p: "Reubica presupuesto hacia los canales que realmente generan ingresos. Corta los que GA4 decía que funcionaban — pero no." },
          ].map((s) => (
            <div key={s.n} className="bg-white border border-warm-100 rounded-xl p-8 flex flex-col min-h-[260px]">
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-soft">{s.n}</span>
              <span className="inline-flex self-start px-2.5 py-1 bg-brand-soft text-brand-hover font-mono text-[10px] font-bold uppercase tracking-[0.08em] rounded mt-2">{s.time}</span>
              <h3 className="text-[24px] font-semibold tracking-[-0.025em] mt-auto mb-2.5 leading-[1.15]">{s.title}</h3>
              <p className="text-[14.5px] leading-[1.55] text-ink-soft">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CREDENTIALS · ES */
export function CredentialsV3Es() {
  return (
    <section className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">Credenciales</span>
            <h2 className="h-section mt-5">Hecho para los próximos <em>tres años</em> de privacidad europea.</h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Fundada en UE, alojada en UE, diseñada para el RGPD desde la arquitectura (autoevaluación) — no por una capa de compliance añadida después.
          </p>
        </div>

        <div className="aspect-[16/5] w-full rounded-xl overflow-hidden border border-warm-100 mb-8 bg-ink">
          <svg viewBox="0 0 1200 375" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
            <rect width="1200" height="375" fill="#0E0E0C" />
            <defs>
              <linearGradient id="aisle-es" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#1A1A16" />
                <stop offset="100%" stopColor="#0E0E0C" />
              </linearGradient>
            </defs>
            <rect x="0" y="250" width="1200" height="125" fill="url(#aisle-es)" />
            <g fill="#1A1A16" stroke="#2B2A28" strokeWidth="1">
              {[40, 200, 360, 700, 860, 1020].map((x) => (<rect key={x} x={x} y="60" width="140" height="220" />))}
            </g>
            <g fill="#2B2A28">
              {[40, 200, 360, 700, 860, 1020].map((xBase) =>
                [75, 100, 125, 150, 175, 200, 225, 250].map((y) => (<rect key={`${xBase}-${y}`} x={xBase + 10} y={y} width="120" height="20" />))
              )}
            </g>
            <g fill="#00FF7F">
              {[165, 325, 485, 825, 985, 1145].map((x) =>
                [85, 110, 135, 160, 185, 210].map((y) => (<circle key={`l-${x}-${y}`} cx={x} cy={y} r="2" />))
              )}
            </g>
            <g fill="#E8B84B">
              <circle cx="60" cy="85" r="2" /><circle cx="220" cy="135" r="2" /><circle cx="380" cy="210" r="2" />
              <circle cx="720" cy="110" r="2" /><circle cx="880" cy="185" r="2" /><circle cx="1040" cy="235" r="2" />
            </g>
            <text x="600" y="345" fill="#6B6B5E" fontFamily="JetBrains Mono,monospace" fontSize="11" letterSpacing="3" textAnchor="middle">ALOJADO EN UE · DUBLÍN, IRLANDA · RGPD · SCHREMS II LIMPIO</text>
          </svg>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-8">
          {[
            { n: <><em className="italic-accent">+5</em> años</>, l: "En producción · 2.000+ cuentas en hoteles, DTC y medios" },
            { n: <>99,<em className="italic-accent">99</em>%</>, l: "SLA de uptime · probado a escala de Black Friday" },
            { n: <>UE-<em className="italic-accent">hosted</em></>, l: "Alojado en Dublín, Irlanda · Schrems II limpio · Diseñada para el RGPD" },
            { n: <><em className="italic-accent">846</em> bytes</>, l: "Tamaño del pixel · unas 100× más ligero que el tag de GA4" },
          ].map((c, i) => (
            <div key={i} className="bg-white border border-warm-100 rounded-xl p-6">
              <span className="block font-semibold tracking-[-0.025em] leading-none text-ink tabular-nums" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>{c.n}</span>
              <span className="block mt-3.5 text-[13.5px] leading-[1.5] text-ink-soft">{c.l}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2.5 justify-center pt-8 border-t border-warm-100">
          {["Diseñada para el RGPD", "ePrivacy", "Schrems II", "Alojado UE · Dublín", "DPA incluido", "Paquete TPSR"].map((b) => (
            <span key={b} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-warm-100 rounded-lg font-mono text-[11.5px] font-bold uppercase tracking-[0.08em] text-ink">
              <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />{b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* PRICING · ES */
export function PricingV3Es() {
  return (
    <section id="pricing" className="py-28 bg-warm-50 border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[44rem] mx-auto text-center mb-14">
          <span className="eyebrow mb-5 justify-center" style={{ display: "inline-flex" }}>Precios</span>
          <h2 className="h-section mt-5 mx-auto text-center">
            Analítica al precio de ser <em>honesto con tus datos.</em>
          </h2>
          <p className="text-[18px] leading-[1.65] text-ink-soft mt-5">
            Sin freemium. Sin sorpresas por uso. Facturación anual con dos meses gratis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          {[
            { name: "Growth", price: fmtPrice(PRICING.growth.annual, "es"), per: "/mes", billing: "Facturación anual", feat: [`${PRICING.growth.eventsMillions}M eventos / mes`, "3 dominios", "MCP + BigQuery + API completos", "Dashboard de comparación GA4", "Soporte email"], cta: "Empezar con Growth", featured: false },
            { name: "Scale", price: fmtPrice(PRICING.scale.annual, "es"), per: "/mes", billing: "Facturación anual", feat: [`${PRICING.scale.eventsMillions}M eventos / mes`, "10 dominios", "Todo lo de Growth", "Soporte prioritario", "Onboarding liderado por el founder"], cta: "Empezar con Scale", featured: true },
            { name: "Enterprise", price: "A medida", per: "", billing: "Anual o términos personalizados", feat: ["Eventos ilimitados", "Dominios ilimitados", "Todo lo de Scale", "SSO, audit logs, SLA", "Customer engineer dedicado"], cta: "Hablemos", featured: false },
          ].map((p) => (
            <article key={p.name} className={`rounded-xl p-8 flex flex-col bg-white ${p.featured ? "border-2 border-brand" : "border border-warm-100"}`}>
              <header className="pb-5 border-b border-warm-100 mb-5">
                {p.featured && (
                  <span className="inline-block mb-2.5 bg-brand text-ink font-mono text-[10.5px] font-bold uppercase tracking-[0.08em] px-3 py-1 rounded-md">
                    La mayoría de eCommerce eligen este
                  </span>
                )}
                <h3 className="text-[24px] font-semibold tracking-[-0.01em] mb-2.5">{p.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-semibold tracking-[-0.025em] leading-none tabular-nums text-ink" style={{ fontSize: "clamp(36px, 4vw, 44px)" }}>{p.price}</span>
                  {p.per && <span className="text-[15px] text-ink-soft">{p.per}</span>}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft mt-1.5">{p.billing}</div>
              </header>
              <ul className="flex flex-col gap-2 mb-7 flex-1">
                {p.feat.map((f) => (
                  <li key={f} className="relative pl-4 text-[14.5px] leading-[1.55] text-ink">
                    <span className="absolute left-0 text-ink-soft">—</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/es/audit" className={`inline-flex items-center justify-center px-6 py-3 rounded-md text-[14.5px] font-semibold no-underline w-full transition-colors ${p.featured ? "bg-ink text-white hover:bg-brand" : "border border-warm-200 text-ink hover:bg-warm-50"}`}>{p.cta}</Link>
            </article>
          ))}
        </div>

        <p className="mt-10 p-6 bg-white border border-warm-100 rounded-xl text-center max-w-[48rem] mx-auto text-[14.5px] leading-[1.65] text-ink-soft">
          Si no estás seguro de qué plan encaja, te lo decimos en el walkthrough. Como referencia: <b className="text-ink font-semibold">GA360 va por presupuesto desde unos 50.000$/año</b>. <b className="text-ink font-semibold">Adobe Analytics desde unos 50.000$</b>. Sealmetrics se hizo para que no necesites un contrato enterprise para tener datos enterprise.
        </p>
      </div>
    </section>
  );
}

/* FINAL CTA · ES */
export function FinalCtaV3Es() {
  return (
    <section id="audit" className="py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
        <div className="bg-ink text-white rounded-[20px] px-12 py-16 md:py-20 text-center relative overflow-hidden">
          <div aria-hidden className="absolute pointer-events-none" style={{ right: -100, top: -100, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,139,109,0.3),transparent 70%)" }} />
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55 mb-5 relative">
            ¿Cuántas versiones de la misma campaña circulan en tu organización?
          </p>
          <h2 className="text-white font-semibold leading-[1.1] tracking-[-0.03em] mx-auto max-w-[22ch] relative" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
            Pide una auditoría gratuita de <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>tu medición actual.</em>
          </h2>
          <p className="text-white/70 text-[16px] leading-[1.55] mt-6 mb-8 mx-auto max-w-[52ch] relative">
            Te mostramos cuánto tráfico y atribución de venta está quedando fuera de tu analítica, y en cuántos canales el dato que tienes es reconciliable con la realidad. Sin compromiso. Sin instalar nada.
          </p>

          <div className="inline-flex items-center gap-4 p-4 px-6 bg-white/5 border border-white/12 rounded-xl mb-8 max-w-[520px] text-left mx-auto relative">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink text-[16px] shrink-0" style={{ background: "linear-gradient(135deg,#2D8B6D,#E8B84B)", letterSpacing: "-0.02em" }}>RJ</div>
            <div>
              <b className="block text-[14px] font-semibold text-white">Reserva 30 min con el founder</b>
              <span className="font-mono text-[12px] text-white/60 tracking-[0.04em]">Link directo de Cal.com · sin formularios, sin handoff a ventas</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 flex-wrap relative">
            <a href="https://cal.sealmetrics.com/rafa/30min" className="inline-flex items-center justify-center gap-2 bg-white text-ink px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-95">
              Reserva 30 min de walkthrough →
            </a>
            <Link href="/es/pricing" className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:bg-white/5">
              Ver precios
            </Link>
          </div>
          <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.1em] font-semibold mt-6 relative">
            Hecho por un founder · soportado por un founder · alojado en UE por diseño
          </p>
        </div>
      </div>
    </section>
  );
}
