import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * QuantityStepper (molecule): − value + in a pill. `md` for the cart table (36px buttons),
 * `sm` for compact lines and the mini-cart (30px). `variant="outline"` is the admin refund
 * stepper: a 108px outlined pill showing "1 / 2" (`showMax`). It shows `value`; the app changes it.
 */
export interface QuantityStepperProps extends Omit<ComponentProps<"div">, "onChange"> {
  value: number;
  /** What's being counted, for the button labels ("Daily Greens Powder"). */
  label: string;
  size?: "sm" | "md";
  variant?: "filled" | "outline";
  /** Show "/ max" after the value (refund: "1 / 2"). */
  showMax?: boolean;
  min?: number;
  max?: number;
  disabled?: boolean;
  onDecrement?: () => void;
  onIncrement?: () => void;
}

export function QuantityStepper({
  value,
  label,
  size = "md",
  variant = "filled",
  showMax = false,
  min = 1,
  max = 99,
  disabled = false,
  onDecrement,
  onIncrement,
  className,
  ...props
}: QuantityStepperProps) {
  const md = size === "md";
  const outline = variant === "outline";
  const button = cn(
    "flex shrink-0 items-center justify-center rounded-full text-text transition-colors hover:bg-surface-subtle disabled:cursor-not-allowed",
    outline ? "size-7 disabled:text-border" : cn("bg-bg", md ? "size-9" : "size-7.5"),
  );
  return (
    <div
      data-slot="quantity-stepper"
      role="group"
      aria-label={`Quantity of ${label}`}
      className={cn(
        "inline-flex w-fit items-center rounded-full",
        outline ? "h-9 w-27 justify-between border border-border bg-bg px-1" : cn("bg-surface", md ? "gap-1 p-1.5" : "gap-0.5 p-1"),
        disabled && "opacity-30",
        className,
      )}
      {...props}
    >
      <button type="button" aria-label={`Decrease ${label}`} disabled={disabled || value <= min} onClick={onDecrement} className={button}>
        <Icon name="minus" size={md && !outline ? 14 : 12} />
      </button>
      <output
        aria-live="polite"
        className={cn(
          "shrink-0 text-center font-sans font-semibold",
          outline ? cn("text-14 leading-4.5", value > 0 ? "text-text" : "text-text-muted") : "text-text",
          !outline && (md ? "w-8 text-md leading-sm" : "w-7 text-base leading-sm"),
        )}
      >
        {value}
        {showMax && <span className={cn("font-regular", value > 0 && "text-text-muted")}> / {max}</span>}
      </output>
      <button type="button" aria-label={`Increase ${label}`} disabled={disabled || value >= max} onClick={onIncrement} className={button}>
        <Icon name="plus" size={md && !outline ? 14 : 12} strokeWidth={2.6} />
      </button>
    </div>
  );
}
