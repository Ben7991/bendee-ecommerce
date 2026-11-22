import type { ComponentProps, CSSProperties } from "react";

import { cn } from "../../../lib";

/*
 * Payment brands keep their own colours (brand guidelines), so this is the one place their hex
 * values live; the token rule is disabled per line.
 */
/* eslint-disable no-restricted-syntax -- payment brand colours */
const BRANDS = {
  mtn: { label: "MTN MoMo", short: "MTN", dot: "#FFCC00", style: { backgroundColor: "#FFCC00", color: "#1A1A1A" } },
  telecel: { label: "Telecel Cash", short: "Telecel", dot: "#E60000", style: { backgroundColor: "#E60000", color: "#FFFFFF" } },
  airteltigo: { label: "AT Money", short: "AT", dot: "#1D4E9E", style: { backgroundColor: "#1F4E9C", color: "#FFFFFF" } },
  visa: { label: "VISA", short: "VISA", dot: "#1A1F71", style: { color: "#1A1F71" } },
  mastercard: { label: "Mastercard", short: "Mastercard", dot: "#EB001B", style: { color: "#EB001B" } },
} satisfies Record<string, { label: string; short: string; dot: string; style: CSSProperties }>;
/* eslint-enable no-restricted-syntax */

export type PaymentBrand = keyof typeof BRANDS;

/** PaymentBadge (atom): a small wordmark chip for an accepted payment method. */
export interface PaymentBadgeProps extends Omit<ComponentProps<"span">, "children"> {
  brand: PaymentBrand;
  /**
   * md: full name (cart). sm: short name in a choice card. xs: inline tag in a summary line.
   * tile: a 28px square logo tile (admin refund "Refund to").
   */
  size?: "xs" | "sm" | "md" | "tile";
}

/** The brand's colour as a small dot, e.g. in a network picker. Decorative. */
export function PaymentBrandDot({ brand, className }: { brand: PaymentBrand; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-2 shrink-0 rounded-full", className)}
      style={{ backgroundColor: BRANDS[brand].dot }}
    />
  );
}

export function PaymentBadge({ brand, size = "md", className, ...props }: PaymentBadgeProps) {
  const { label, short, style } = BRANDS[brand];
  const card = brand === "visa" || brand === "mastercard";
  return (
    <span
      data-slot="payment-badge"
      data-brand={brand}
      style={style}
      className={cn(
        "inline-flex font-sans font-bold",
        size === "md" && "rounded-6 px-2.5 py-1.25 text-11 leading-3.5",
        size === "sm" && "rounded-6 px-2 py-1 text-11 leading-3.5",
        size === "xs" && "rounded-5 px-1.5 py-0.5 text-10 leading-3.25",
        size === "tile" && "size-7 shrink-0 items-center justify-center rounded-8 text-10 leading-3 font-bold",
        brand === "visa" && size !== "md" && "italic",
        // Card brands sit on white in both themes, as in Paper.
        card && "border border-border bg-white",
        className,
      )}
      {...props}
    >
      {size === "md" ? label : short}
    </span>
  );
}
