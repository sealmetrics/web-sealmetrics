import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

export const metadata = buildRedirectMetadata("/terms");

export default function Page() {
  return <RedirectStub to="/terms" />;
}
