import type { Metadata, Viewport } from "next";
import { SharedLayout } from "@/components/layout/SharedLayout";
import { getAlternates } from "@/lib/i18n/navigation";
import { ogImage } from "@/lib/seo/og";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0E0C" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sealmetrics.com"),
  title: "Sealmetrics — Complete Analytics for eCommerce",
  description:
    "Web analytics that doesn't depend on consent. No cookies, no consent banners, no consent-driven data loss. Enterprise-grade complete data from €499/mo.",
  openGraph: {
    title: "Sealmetrics — Complete Analytics for eCommerce",
    description:
      "GA4 did not record 29% of visits on a measured Shopify store. Sealmetrics counts without cookies, consent walls or sampling. From €499/mo.",
    url: "https://sealmetrics.com",
    siteName: "Sealmetrics",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: ogImage("/"),
        width: 1200,
        height: 630,
        alt: "Sealmetrics — Complete Analytics for eCommerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics — Complete Analytics for eCommerce",
    description:
      "GA4 did not record 29% of visits on a measured Shopify store. Sealmetrics counts without cookies, consent walls or sampling.",
    images: [ogImage("/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/",
    languages: getAlternates("/"),
  },
  other: {
    "llms-txt": "https://sealmetrics.com/llms.txt",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.avif", type: "image/avif" },
      { url: "/favicon.webp", type: "image/webp" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [
      { url: "/favicon.webp", sizes: "180x180", type: "image/webp" },
    ],
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SharedLayout locale="en">
      {children}
    </SharedLayout>
  );
}
