import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * CheckoutSteps (molecule): the numbered step indicator in the checkout header (768px up).
 * Steps before `current` show a tick; `current` is evergreen with a lime number. Pass
 * `current={steps.length}` when everything is done.
 */
export interface CheckoutStepsProps extends Omit<ComponentProps<"ol">, "children"> {
  steps: string[];
  /** Zero-based index of the active step. */
  current: number;
}

export function CheckoutSteps({ steps, current, className, ...props }: CheckoutStepsProps) {
  return (
    <ol data-slot="checkout-steps" aria-label="Checkout progress" className={cn("flex items-center gap-3 font-sans", className)} {...props}>
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li key={step} aria-current={active ? "step" : undefined} className="flex items-center gap-3">
            {index > 0 && <span aria-hidden className={cn("h-px w-10 shrink-0", done || active ? "bg-brand" : "bg-border")} />}
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-xs leading-xs",
                  done && "bg-brand text-text-inverse",
                  active && "bg-primary font-bold text-accent",
                  !done && !active && "border border-border font-semibold text-text-muted",
                )}
              >
                {done ? <Icon name="check" size={12} strokeWidth={3} label="Done" /> : index + 1}
              </span>
              <span className={cn("text-sm leading-xs", done && "font-medium text-text", active && "font-semibold text-text", !done && !active && "text-text-muted")}>
                {step}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
