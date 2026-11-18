import type { ComponentProps } from "react";

import { cn } from "../../../lib";

const formatter = new Intl.NumberFormat("en-GH", { maximumFractionDigits: 2 });

/** "GHS 450" — Jofak prices are tax-inclusive Ghana cedis. */
export function formatPrice(amount: number, currency = "GHS"): string {
  return `${currency} ${formatter.format(amount)}`;
}

/**
 * Price (atom): current price with an optional struck-through compare-at price.
 * `size="md"` on mobile cards (16px), `lg` on tablet/desktop (20px).
 */
export interface PriceProps extends Omit<ComponentProps<"p">, "children"> {
  amount: number;
  compareAt?: number;
  currency?: string;
  size?: "md" | "lg";
}

export function Price({ amount, compareAt, currency = "GHS", size = "lg", className, ...props }: PriceProps) {
  const onSale = compareAt !== undefined && compareAt > amount;
  return (
    <p data-slot="price" className={cn("flex items-baseline gap-2 font-sans", className)} {...props}>
      <span
        className={cn(
          "font-semibold text-text",
          size === "lg" ? "text-xl leading-base" : "text-md leading-sm",
        )}
      >
        {onSale && <span className="sr-only">Now </span>}
        {formatPrice(amount, currency)}
      </span>
      {onSale && (
        <s className="text-14 leading-4.5 text-text-muted">
          <span className="sr-only">was </span>
          {formatPrice(compareAt, currency)}
        </s>
      )}
    </p>
  );
}
