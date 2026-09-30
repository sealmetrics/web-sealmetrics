import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

export const metadata = buildRedirectMetadata("/demo");

export default function Page() {
  return <RedirectStub to="/demo" />;
}
