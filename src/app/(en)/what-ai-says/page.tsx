import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

// The free two-question live check lived here until 30 Sep 2026. It was withdrawn —
// nothing on the site is given away without at least an email — and shared result
// links (?brand=…) land on the report instead.
export const metadata = buildRedirectMetadata("/ai-brand-monitoring");

export default function Page() {
  return <RedirectStub to="/ai-brand-monitoring" />;
}
