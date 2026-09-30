import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

export const metadata = buildRedirectMetadata("/case-studies/palladium-hotel-group");

export default function Page() {
  return <RedirectStub to="/case-studies/palladium-hotel-group" />;
}
