import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, ProgressBar } from "../../atoms";

/**
 * FreeDeliveryBar (molecule): progress towards free delivery.
 *   banner: sage panel with a truck badge (cart page); `progressLabel` shows from 768px
 *   inline: one line and the bar (mini-cart)
 * Put the key phrase of `message` in <strong>.
 */
export interface FreeDeliveryBarProps extends Omit<ComponentProps<"div">, "children"> {
  message: ReactNode;
  /** 0–100. */
  value: number;
  /** e.g. "GHS 500 / GHS 500". */
  progressLabel?: string;
  variant?: "banner" | "inline";
}

export function FreeDeliveryBar({ message, value, progressLabel, variant = "banner", className, ...props }: FreeDeliveryBarProps) {
  if (variant === "inline") {
    return (
      <div data-slot="free-delivery-bar" className={cn("flex flex-col gap-2", className)} {...props}>
        <p className="font-sans text-sm leading-xs text-text [&_strong]:font-semibold [&_strong]:text-brand">{message}</p>
        <ProgressBar value={value} label="Progress to free delivery" className="bg-sage-200" />
      </div>
    );
  }
  return (
    <div
      data-slot="free-delivery-bar"
      className={cn("flex flex-col gap-3 rounded-md bg-sage-50 p-4 md:rounded-lg md:px-6 md:py-5", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-accent">
            <Icon name="truck" size={16} strokeWidth={2.2} />
          </span>
          <p className="font-sans text-sm leading-xs text-text md:text-base md:leading-4.5 [&_strong]:font-semibold">{message}</p>
        </div>
        {progressLabel && (
          <p className="hidden shrink-0 font-sans text-sm leading-xs font-semibold text-brand md:block">{progressLabel}</p>
        )}
      </div>
      <ProgressBar value={value} label="Progress to free delivery" className="bg-sage-200" />
    </div>
  );
}
