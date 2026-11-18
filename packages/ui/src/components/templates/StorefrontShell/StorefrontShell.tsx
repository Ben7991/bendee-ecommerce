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
}

export function StorefrontShell({ footer, className, children, ...props }: StorefrontShellProps) {
  return (
    <div data-slot="storefront-shell" className={cn("min-h-dvh bg-bg", className)} {...props}>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-primary px-4 py-2.5 font-sans text-14 font-semibold text-text-inverse focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <div className="mx-auto flex w-full max-w-352 flex-col md:gap-0 md:p-3 xl:p-4">
        <main id="main" className="flex flex-col">
          {children}
        </main>
        {footer && <div className="md:pt-18 xl:pt-0">{footer}</div>}
      </div>
    </div>
  );
}
