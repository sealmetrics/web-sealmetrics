import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckoutStatus } from "@/components/ui/CheckoutStatus";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

const title = "Payment not completed — Sealmetrics";
const description =
  "The checkout was cancelled before payment. Nothing has been charged to your card.";
const url = "https://sealmetrics.com/checkout/cancel/";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [ogImage("/checkout/cancel/")],
    url,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title,
    description,
    images: [ogImage("/checkout/cancel/")],
  },
  alternates: { canonical: url },
  // Quaderno checkout redirect. Not for search: noindex here, and /checkout/
  // is Disallowed for every user-agent in public/robots.txt.
  robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Pricing", href: "/pricing" }, { label: "Payment not completed" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Pricing", url: "/pricing" },
          { name: "Payment not completed", url: "/checkout/cancel" },
        ])}
      />
      <CheckoutStatus
        eyebrow="Checkout · Cancelled"
        title="Payment not completed."
        emphasis="Nothing was charged."
        body={[
          "The checkout was closed before the payment went through, so no charge has been made. You can go back to the payment link whenever you are ready.",
          "If something in the checkout stopped you — the amount, the billing details, the payment method — contact us and we will help you finish it.",
        ]}
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
