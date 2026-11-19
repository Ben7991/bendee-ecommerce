import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * DeliveryBanner (molecule): the evergreen "With our delivery partner · Arriving today,
 * 11:00–13:00" band on an order, with a "Track parcel" button. `compactTitle` and
 * `compactAction` take over on mobile. Delivery is by an outside courier, so the action points
 * at their tracking page.
 */
export interface DeliveryBannerProps extends Omit<ComponentProps<"div">, "title" | "children"> {
  eyebrow: ReactNode;
  title: ReactNode;
  compactTitle?: ReactNode;
  action?: ReactNode;
  compactAction?: ReactNode;
}

export function DeliveryBanner({ eyebrow, title, compactTitle, action, compactAction, className, ...props }: DeliveryBannerProps) {
  return (
    <div data-slot="delivery-banner" className={cn("flex items-center gap-3.5 rounded-lg bg-gradient-feature px-4 py-4.5 font-sans md:gap-4 md:px-6 md:py-5", className)} {...props}>
      <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full bg-evergreen-800 text-accent md:size-13 dark:bg-sage-200">
        <Icon name="truck" size={24} strokeWidth={1.8} className="size-5 md:size-6" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-sm leading-xs text-text-inverse-muted">{eyebrow}</p>
        <p className="text-lg leading-lg font-semibold text-text-inverse md:text-xl">
          {compactTitle ? (
            <>
              <span className="md:hidden">{compactTitle}</span>
              <span className="hidden md:inline">{title}</span>
            </>
          ) : (
            title
          )}
        </p>
      </div>
      {compactAction && <div className="shrink-0 md:hidden">{compactAction}</div>}
      {action && <div className={cn("shrink-0", compactAction && "hidden md:block")}>{action}</div>}
    </div>
  );
}
