"use client";

import { useEffect } from "react";

import { ThemeProvider, themeScript } from "@repo/ui/lib";

import { ServerError } from "./_components/server-error";
import { fontVariables } from "./_lib/fonts";
import "./globals.css";

/**
 * Errors in the root layout itself. This replaces the whole document, so it brings its own
 * <html>, fonts, styles and theme (global-error doesn't get the root layout's).
 */
export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <title>Something went wrong · Jofak</title>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <ServerError digest={error.digest} retry={retry} />
        </ThemeProvider>
      </body>
    </html>
  );
}
