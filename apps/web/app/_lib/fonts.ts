import localFont from "next/font/local";

// Fonts are self-hosted from app/fonts (Latin subsets from Fontsource, SIL OFL — licences
// alongside). next/font/google is not used: with Turbopack it fails on the
// fonts.gstatic.com/l/font?kit=…&skey=… URLs Google returns for Inter Tight
// ("next/font/google queries have exactly one entry"), and self-hosting also keeps builds
// offline-safe. next/font sets --font-sans / --font-serif / --font-mono on <html>, overriding the fallback
// stacks in @repo/ui's theme.
const interTight = localFont({
  src: "../fonts/inter-tight-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const instrumentSerif = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["ui-serif", "Georgia", "serif"],
});

// Admin discount codes (Paper Jofak - Admin → Discounts).
const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

/** Class names that set --font-sans / --font-serif / --font-mono; put them on <html>. */
export const fontVariables = `${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`;
