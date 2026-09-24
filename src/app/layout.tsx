import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";

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

const siteUrl = "https://echogpt.example";

export const metadata: Metadata = {
  title: {
    default: "EchoGPT — All Your AI Models in One Place",
    template: "%s · EchoGPT",
  },
  description:
    "A modern AI workspace bringing powerful AI models together in one fast, simple and beautiful place. Chat with GPT-4o, Claude 3.5, Gemini 1.5 and more.",
  keywords: [
    "EchoGPT",
    "AI chat",
    "GPT-4o",
    "Claude 3.5",
    "Gemini",
    "AI workspace",
    "multi-model AI",
    "Chrome extension",
  ],
  authors: [{ name: "EchoGPT" }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "EchoGPT — All Your AI Models in One Place",
    description:
      "A modern AI workspace bringing powerful AI models together in one fast, simple and beautiful place.",
    url: siteUrl,
    siteName: "EchoGPT",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EchoGPT — All Your AI Models in One Place",
    description:
      "A modern AI workspace bringing powerful AI models together in one fast, simple and beautiful place.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a14" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
