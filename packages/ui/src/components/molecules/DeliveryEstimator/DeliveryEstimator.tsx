import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

export interface DeliveryOption {
  /** "Standard delivery", "Pickup · Osu store". */
  label: string;
  /** "Tomorrow · GHS 25". */
  value: string;
}

/**
 * DeliveryEstimator (molecule): "Deliver to Accra · East Legon" with Change, the fee and ETA of
 * each way to get it, and a nudge under them (Paper PDP → Delivery Estimator). For the delivery
 * address in the cart use DeliveryCard.
 */
export interface DeliveryEstimatorProps extends ComponentProps<"div"> {
  location: string;
  /** "Change" link or button. */
  action?: ReactNode;
  options: DeliveryOption[];
  /** "Add GHS 50 more for free delivery". */
  note?: ReactNode;
}

export function DeliveryEstimator({ location, action, options, note, className, ...props }: DeliveryEstimatorProps) {
  return (
    <div
      data-slot="delivery-estimator"
      className={cn("flex flex-col gap-3 rounded-lg bg-surface px-5 py-4 font-sans", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-2 text-sm leading-xs">
          <Icon name="mapPin" className="text-brand" />
          <span className="text-text-muted">Deliver to</span>
          <strong className="truncate font-semibold text-text">{location}</strong>
        </p>
        {action}
      </div>
      <dl className="flex gap-3">
        {options.map((option) => (
          <div key={option.label} className="flex min-w-0 flex-1 flex-col gap-0.5 rounded-md bg-bg px-3.5 py-3">
            <dt className="text-xs leading-xs text-text-muted">{option.label}</dt>
            <dd className="text-sm leading-xs font-semibold whitespace-nowrap text-text md:text-base md:leading-4.5">{option.value}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="text-xs leading-xs text-text-muted">{note}</p>}
    </div>
  );
}
