// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Global SEO metadata
export const metadata: Metadata = {
  title: {
    default: "Finable – Crowdfunding Made Simple",
    template: "%s | Finable",
  },
  description:
    "Finable is a modern crowdfunding platform that helps creators and communities raise funds transparently and efficiently.",
  keywords: [
    "Finable",
    "crowdfunding",
    "fundraising",
    "community funding",
    "project support",
    "donations",
    "backers",
  ],
  authors: [{ name: "Finable Team" }],
  creator: "Finable Inc.",
  publisher: "Finable Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://finable.com",
    siteName: "Finable",
    title: "Finable – Crowdfunding Made Simple",
    description:
      "Raise funds for your projects and support causes you care about with Finable's transparent and easy-to-use platform.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finable – Crowdfunding Made Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finable – Crowdfunding Made Simple",
    description:
      "Support causes and raise funds easily with Finable, a modern crowdfunding platform.",
    images: ["/twitter-image.png"],
    creator: "@finable",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Viewport for responsiveness
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#3A5A40", // Finable brand green
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicons & Manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFFFFF] text-black`}
      >
        {/* Global Providers (Auth, Theme, Query, etc. can be added later) */}
        {children}
      </body>
    </html>
  );
}