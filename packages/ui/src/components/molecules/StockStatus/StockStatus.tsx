import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { stockStatusVariants, type StockStatusVariantProps } from "./StockStatus.variants";

/**
 * StockStatus (molecule): "● In stock · Order in the next 3h 20m for same-day dispatch" on the PDP.
 * `tone` follows the stock level: success (in stock), warning (low / pre-order), error (sold out).
 */
export interface StockStatusProps extends ComponentProps<"p">, StockStatusVariantProps {
  /** "In stock", "Only 3 left", "Sold out". */
  label: string;
  /** Muted text after the label. */
  note?: ReactNode;
}

export function StockStatus({ label, note, tone, className, ...props }: StockStatusProps) {
  return (
    <p data-slot="stock-status" className={cn("flex items-center gap-2 font-sans text-xs leading-xs md:text-sm", className)} {...props}>
      <span aria-hidden className={cn("size-2 shrink-0 rounded-full bg-current ring-4 ring-current/20", stockStatusVariants({ tone }))} />
      <span>
        <strong className={cn("font-semibold", stockStatusVariants({ tone }))}>{label}</strong>
        {note && <span className="text-text-muted"> · {note}</span>}
      </span>
    </p>
  );
}
