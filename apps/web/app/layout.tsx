import type { Metadata, Viewport } from "next";

import { ThemeProvider, themeScript } from "@repo/ui/lib";

import { CookieConsent } from "./_components/cookie-consent";
import { fontVariables } from "./_lib/fonts";
import "./globals.css";

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
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
