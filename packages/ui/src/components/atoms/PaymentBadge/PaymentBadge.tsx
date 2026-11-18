import type { ComponentProps, CSSProperties } from "react";

import { cn } from "../../../lib";

/*
 * Payment brands keep their own colours (brand guidelines), so this is the one place their hex
 * values live; the token rule is disabled per line.
 */
/* eslint-disable no-restricted-syntax -- payment brand colours */
const BRANDS = {
  mtn: { label: "MTN MoMo", style: { backgroundColor: "#FFCC00", color: "#1A1A1A" } },
  telecel: { label: "Telecel Cash", style: { backgroundColor: "#E60000", color: "#FFFFFF" } },
  airteltigo: { label: "AT Money", style: { backgroundColor: "#1F4E9C", color: "#FFFFFF" } },
  visa: { label: "VISA", style: { color: "#1A1F71" } },
  mastercard: { label: "Mastercard", style: { color: "#EB001B" } },
} satisfies Record<string, { label: string; style: CSSProperties }>;
/* eslint-enable no-restricted-syntax */

export type PaymentBrand = keyof typeof BRANDS;

/** PaymentBadge (atom): a small wordmark chip for an accepted payment method. */
export interface PaymentBadgeProps extends Omit<ComponentProps<"span">, "children"> {
  brand: PaymentBrand;
}

export function PaymentBadge({ brand, className, ...props }: PaymentBadgeProps) {
  const { label, style } = BRANDS[brand];
  const card = brand === "visa" || brand === "mastercard";
  return (
    <span
      data-slot="payment-badge"
      data-brand={brand}
      style={style}
      className={cn(
        "inline-flex rounded-6 px-2.5 py-1.25 font-sans text-11 leading-3.5 font-bold",
        // Card brands sit on white in both themes, as in Paper.
        card && "border border-border bg-white",
        className,
      )}
      {...props}
    >
      {label}
    </span>
  );
}
