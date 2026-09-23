import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

// Redirección generada por content-agent (palanca R2 del seo-agent): esta URL
// tuvo tráfico orgánico y quedó en 404 tras la migración de 2025.
export const metadata = buildRedirectMetadata("/blog/self-service-analytics-for-marketing-teams/", { label: "/blog/self-service-analytics-for-marketing-teams/" });

export default function Page() {
  return <RedirectStub to="/blog/self-service-analytics-for-marketing-teams/" label="/blog/self-service-analytics-for-marketing-teams/" />;
}
