import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

// Redirección generada por content-agent (palanca R2 del seo-agent): esta URL
// tuvo tráfico orgánico y quedó en 404 tras la migración de 2025.
export const metadata = buildRedirectMetadata("/for/education/", { label: "/for/education/" });

export default function Page() {
  return <RedirectStub to="/for/education/" label="/for/education/" />;
}
