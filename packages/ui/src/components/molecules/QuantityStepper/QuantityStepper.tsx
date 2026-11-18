import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * QuantityStepper (molecule): − value + in a pill. `md` for the cart table (36px buttons),
 * `sm` for compact lines and the mini-cart (30px). It shows `value`; the app changes it.
 */
export interface QuantityStepperProps extends Omit<ComponentProps<"div">, "onChange"> {
  value: number;
  /** What's being counted, for the button labels ("Daily Greens Powder"). */
  label: string;
  size?: "sm" | "md";
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
  min = 1,
  max = 99,
  disabled = false,
  onDecrement,
  onIncrement,
  className,
  ...props
}: QuantityStepperProps) {
  const md = size === "md";
  const button = cn(
    "flex shrink-0 items-center justify-center rounded-full bg-bg text-text transition-colors hover:bg-surface-subtle disabled:cursor-not-allowed",
    md ? "size-9" : "size-7.5",
  );
  return (
    <div
      data-slot="quantity-stepper"
      role="group"
      aria-label={`Quantity of ${label}`}
      className={cn(
        "inline-flex w-fit items-center rounded-full bg-surface",
        md ? "gap-1 p-1.5" : "gap-0.5 p-1",
        disabled && "opacity-30",
        className,
      )}
      {...props}
    >
      <button type="button" aria-label={`Decrease ${label}`} disabled={disabled || value <= min} onClick={onDecrement} className={button}>
        <Icon name="minus" size={md ? 14 : 12} />
      </button>
      <output aria-live="polite" className={cn("shrink-0 text-center font-sans font-semibold text-text", md ? "w-8 text-md leading-sm" : "w-7 text-base leading-sm")}>
        {value}
      </output>
      <button type="button" aria-label={`Increase ${label}`} disabled={disabled || value >= max} onClick={onIncrement} className={button}>
        <Icon name="plus" size={md ? 14 : 12} strokeWidth={2.6} />
      </button>
    </div>
  );
}
