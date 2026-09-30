import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

export const metadata = buildRedirectMetadata("/pricing");

export default function Page() {
  return <RedirectStub to="/pricing" />;
}
