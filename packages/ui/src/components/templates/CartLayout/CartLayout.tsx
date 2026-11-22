import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * CartLayout (template): arranges the cart body.
 *   mobile 390:   notices, lines, then the summary card, stacked (20px gutters)
 *   tablet 768:   the same stack with 40px gutters
 *   desktop 1440: notices + lines on the left, the 440px summary on the right
 * Slots only: pass FreeDeliveryBar / Notice, CartLines and OrderSummary.
 */
export interface CartLayoutProps extends ComponentProps<"div"> {
  notices?: ReactNode;
  lines: ReactNode;
  summary: ReactNode;
}

export function CartLayout({ notices, lines, summary, className, ...props }: CartLayoutProps) {
  return (
    <div data-slot="cart-layout" className={cn("flex flex-col xl:flex-row xl:items-start xl:gap-10 xl:px-14 xl:pb-18", className)} {...props}>
      <div className="flex min-w-0 flex-1 flex-col">
        {notices && <div className="flex flex-col gap-3 px-5 md:gap-4 md:px-10 xl:gap-5 xl:px-0">{notices}</div>}
        <div className="px-5 pt-2 md:px-10 md:pt-8 xl:px-0 xl:pt-5">{lines}</div>
      </div>
      <div className="px-5 pt-4 pb-10 md:px-10 md:pt-8 md:pb-4 xl:p-0">{summary}</div>
    </div>
  );
}
