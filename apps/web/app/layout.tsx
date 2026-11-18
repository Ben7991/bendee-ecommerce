import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { ThemeProvider, themeScript } from "@repo/ui/lib";

import "./globals.css";

// Fonts are self-hosted from app/fonts (Latin subsets from Fontsource, SIL OFL — licences
// alongside). next/font/google is not used: with Turbopack it fails on the
// fonts.gstatic.com/l/font?kit=…&skey=… URLs Google returns for Inter Tight
// ("next/font/google queries have exactly one entry"), and self-hosting also keeps builds
// offline-safe. next/font sets --font-sans / --font-serif on <html>, overriding the fallback
// stacks in @repo/ui's theme.
const interTight = localFont({
  src: "./fonts/inter-tight-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const instrumentSerif = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["ui-serif", "Georgia", "serif"],
});

export const metadata: Metadata = {
  title: "Jofak Wellness",
  description: "Clean, clinically-dosed supplements made from whole-plant ingredients, delivered across Ghana.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1411" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The theme script sets data-theme on <html> before React hydrates.
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
