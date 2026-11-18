import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * StorefrontShell (template): page frame for storefront pages.
 * Content is capped at 1408px (1440 artboard minus the 16px frame) and framed by 12px on
 * tablet / 16px on desktop; mobile is edge to edge. Sections own their inner padding.
 *
 *   <StorefrontShell footer={<SiteFooter … />}>
 *     <HomeHero header={<SiteHeader … />} … />
 *     …sections
 *   </StorefrontShell>
 */
export interface StorefrontShellProps extends ComponentProps<"div"> {
  footer?: ReactNode;
  /** Full-width strip above everything (AnnouncementBar). */
  announcement?: ReactNode;
  /**
   * The frame around the page:
   *   true:    12px (tablet) / 16px (desktop) on every side (Home, whose hero is a card)
   *   "sides": 16px left, right and bottom on desktop only (cart)
   *   "page":  12px (tablet) / 16px (desktop) left, right and bottom (shop)
   *   false:   edge to edge (404, empty cart)
   */
  framed?: boolean | "sides" | "page";
}

export function StorefrontShell({ footer, announcement, framed = true, className, children, ...props }: StorefrontShellProps) {
  return (
    <div data-slot="storefront-shell" className={cn("min-h-dvh bg-bg", className)} {...props}>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-primary px-4 py-2.5 font-sans text-14 font-semibold text-text-inverse focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      {announcement}
      <div
        className={cn(
          "mx-auto flex w-full flex-col",
          framed === true ? "max-w-352 md:p-3 xl:p-4" : "max-w-360",
          framed === "sides" && "xl:px-4 xl:pb-4",
          framed === "page" && "md:px-3 md:pb-3 xl:px-4 xl:pb-4",
        )}
      >
        <main id="main" className="flex flex-col">
          {children}
        </main>
        {footer && <div className={framed === true ? "md:pt-18 xl:pt-0" : undefined}>{footer}</div>}
      </div>
    </div>
  );
}
