import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * CheckoutShell (template): the checkout page frame on a soft background.
 *   steps:  header, optional summary strip (mobile/tablet), title (768 up), the step column and
 *           the summary sidebar (desktop); `actionBar` is the mobile sticky button
 *   center: header and one centred card (MoMo approval, payment failed)
 *   stack:  header, `hero` and a centred 880px column (order confirmation)
 */
export interface CheckoutShellProps extends Omit<ComponentProps<"div">, "title"> {
  header: ReactNode;
  layout?: "steps" | "center" | "stack";
  /** steps: the strip under the header below 1440px. */
  summaryStrip?: ReactNode;
  /** steps: the desktop sidebar. */
  sidebar?: ReactNode;
  /** steps: page title from 768px; wrap the accent word in <em>. */
  title?: ReactNode;
  subtitle?: ReactNode;
  /** steps: mobile sticky bar (StickyActionBar). */
  actionBar?: ReactNode;
  /** stack: full-bleed block above the column on mobile (OrderConfirmationHero). */
  hero?: ReactNode;
}

export function CheckoutShell({
  header,
  layout = "steps",
  summaryStrip,
  sidebar,
  title,
  subtitle,
  actionBar,
  hero,
  className,
  children,
  ...props
}: CheckoutShellProps) {
  return (
    <div
      data-slot="checkout-shell"
      className={cn("flex min-h-dvh flex-col bg-surface-subtle", layout === "center" && "bg-bg md:bg-surface-subtle", className)}
      {...props}
    >
      {header}
      {layout === "steps" && summaryStrip && <div className="xl:hidden">{summaryStrip}</div>}

      {layout === "steps" && (
        <main id="main" className={cn("flex flex-1 items-start gap-12 px-5 pt-5 pb-8 md:px-10 md:pt-8 md:pb-14 xl:px-14 xl:pt-10 xl:pb-18", actionBar && "pb-36 md:pb-14")}>
          <div className="flex min-w-0 flex-1 flex-col gap-3 md:gap-4">
            {(title || subtitle) && (
              <div className="hidden flex-col gap-1.5 pb-4 font-sans md:flex">
                {title && <h1 className="text-4xl leading-4xl font-medium tracking-tight text-text [&_em]:font-serif [&_em]:font-regular [&_em]:text-brand [&_em]:italic">{title}</h1>}
                {subtitle && <p className="text-md leading-sm text-text-muted">{subtitle}</p>}
              </div>
            )}
            {children}
          </div>
          {sidebar && <div className="hidden xl:block">{sidebar}</div>}
        </main>
      )}

      {layout === "center" && (
        <main id="main" className="flex flex-1 md:items-center md:justify-center md:p-10">
          {children}
        </main>
      )}

      {layout === "stack" && (
        <main id="main" className="flex flex-1 flex-col md:items-center md:gap-6 md:px-10 md:pt-12 md:pb-18 xl:px-14 xl:pt-14">
          {hero}
          <div className="flex flex-col gap-3 px-5 pt-5 pb-10 md:w-full md:max-w-220 md:gap-6 md:p-0">{children}</div>
        </main>
      )}

      {actionBar}
    </div>
  );
}
