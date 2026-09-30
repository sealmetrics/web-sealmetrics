import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

// Aquí vivía la consulta gratuita en directo de dos preguntas hasta el 30/09/2026. Se
// retiró —nada de la web se regala sin al menos un correo— y los enlaces compartidos
// (?brand=…) llevan al informe.
export const metadata = buildRedirectMetadata("/es/ai-brand-monitoring");

export default function Page() {
  return <RedirectStub to="/es/ai-brand-monitoring" />;
}
