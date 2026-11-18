import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/** DeliveryCard (molecule): where the order goes and when, with a Change link (order summary). */
export interface DeliveryCardProps extends Omit<ComponentProps<"div">, "children"> {
  /** e.g. "Accra · East Legon". */
  location: string;
  /** e.g. "Standard delivery · arrives tomorrow, Sat 14 Nov". */
  detail: string;
  /** Usually a TextLink to change the address. */
  action?: ReactNode;
}

export function DeliveryCard({ location, detail, action, className, ...props }: DeliveryCardProps) {
  return (
    <div data-slot="delivery-card" className={cn("flex flex-col gap-2 rounded-md bg-bg p-4 font-sans text-sm leading-xs", className)} {...props}>
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-semibold text-text">
          <Icon name="mapPin" size={16} className="text-brand" />
          {location}
        </p>
        {action}
      </div>
      <p className="text-text-muted">{detail}</p>
    </div>
  );
}
