import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

// El artículo se movió a /es/blog/why-ga4-misses-traffic/ al retirar la cifra
// universal de pérdida de GA4 (decisión del fundador, 2026-09-21). Esta ruta sobrevive
// para las URLs ya indexadas y los enlaces entrantes; el stub compartido lleva
// noindex, canonical a la URL nueva y el meta refresh real.
export const metadata = buildRedirectMetadata("/es/blog/why-ga4-misses-traffic/");

export default function Page() {
  return <RedirectStub to="/es/blog/why-ga4-misses-traffic/" />;
}
