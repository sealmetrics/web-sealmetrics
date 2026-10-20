import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckoutStatus } from "@/components/ui/CheckoutStatus";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

const title = "Payment received — Sealmetrics";
const description =
  "Your payment has been received. The invoice is sent to the email address you used at checkout.";
const url = "https://sealmetrics.com/checkout/success/";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [ogImage("/checkout/success/")],
    url,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title,
    description,
    images: [ogImage("/checkout/success/")],
  },
  alternates: { canonical: url },
  // Quaderno checkout redirect. Not for search: noindex here, and /checkout/
  // is Disallowed for every user-agent in public/robots.txt.
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Pricing", href: "/pricing" }, { label: "Payment received" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Pricing", url: "/pricing" },
          { name: "Payment received", url: "/checkout/success" },
        ])}
      />
      <CheckoutStatus
        eyebrow="Checkout · Complete"
        title="Payment received."
        emphasis="Thank you."
        body={[
          "Your payment has gone through. The invoice is sent to the email address you entered at checkout — if it has not arrived in a few minutes, check the spam folder.",
          "If anything about the payment or the invoice looks wrong, contact us and we will sort it out.",
        ]}
        primary={{ label: "Go to my dashboard", href: "https://my.sealmetrics.com" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
