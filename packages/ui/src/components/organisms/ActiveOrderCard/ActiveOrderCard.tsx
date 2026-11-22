import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, ProductThumb, StatusBadge, type ProductThumbProps, type StatusBadgeProps } from "../../atoms";

/**
 * ActiveOrderCard (organism): the order on its way, outlined in evergreen at the top of the
 * Overview and Orders pages (Paper Account → Orders).
 *   768 up: number, status, packshots and total in a row; the arrival line and actions under a rule
 *   mobile: number and status, a four-step progress bar, the arrival, stacked packshots and one action
 */
export interface OrderThumb {
  id: string;
  tint?: ProductThumbProps["tint"];
  image?: ReactNode;
}

export interface ActiveOrderCardProps extends Omit<ComponentProps<"article">, "children"> {
  number: string;
  /** "Placed 13 Nov 2026 · 4 items" (768 up). */
  meta: ReactNode;
  /** "13 Nov · 4 items · GHS 1,254.60" (mobile). */
  compactMeta: ReactNode;
  status: Pick<StatusBadgeProps, "label" | "tone">;
  items: OrderThumb[];
  total: ReactNode;
  /** "Arriving <strong>tomorrow, Sat 14 Nov</strong> to East Legon". */
  arrival: ReactNode;
  compactArrival?: ReactNode;
  /** 0–3: which of the four stages (placed, packing, on the way, delivered) it's at. */
  stage: number;
  /** "View details" and "Track order" buttons (768 up). */
  actions?: ReactNode;
  /** One button for mobile. */
  compactAction?: ReactNode;
}

export function ActiveOrderCard({
  number,
  meta,
  compactMeta,
  status,
  items,
  total,
  arrival,
  compactArrival,
  stage,
  actions,
  compactAction,
  className,
  ...props
}: ActiveOrderCardProps) {
  const titleId = useId();
  return (
    <article
      data-slot="active-order-card"
      aria-labelledby={titleId}
      className={cn("flex flex-col gap-4 rounded-lg border-field border-primary bg-bg px-4 py-5 font-sans md:gap-5 md:p-6", className)}
      {...props}
    >
      {/* Mobile */}
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="text-md leading-sm font-semibold text-text">{number}</p>
            <p className="text-xs leading-xs text-text-muted">{compactMeta}</p>
          </div>
          <StatusBadge size="sm" {...status} />
        </div>
        <div className="flex flex-col gap-2">
          <div aria-hidden className="flex gap-1">
            {[0, 1, 2, 3].map((step) => (
              <span key={step} className={cn("h-1 flex-1 rounded-full", step < stage ? "bg-brand" : step === stage ? "bg-primary dark:bg-text" : "bg-border")} />
            ))}
          </div>
          <p className="text-sm leading-sm text-text [&_strong]:font-semibold">{compactArrival ?? arrival}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex min-w-0 flex-1">
            {items.slice(0, 3).map((item, index) => (
              <ProductThumb key={item.id} size="xs" tint={item.tint} image={item.image} ring className={index > 0 ? "-ml-2.5" : undefined} />
            ))}
          </div>
          {compactAction}
        </div>
      </div>

      {/* 768 up */}
      <div className="hidden items-center gap-4 md:flex xl:gap-6">
        <div className="flex w-36 shrink-0 flex-col gap-1 xl:w-55">
          <h3 id={titleId} className="text-lg leading-base font-semibold text-text">
            {number}
          </h3>
          <p className="text-sm leading-xs text-text-muted">{meta}</p>
        </div>
        <div className="w-27 shrink-0 xl:w-37.5">
          <StatusBadge {...status} />
        </div>
        <div className="flex min-w-0 flex-1 gap-1.5">
          {items.slice(0, 3).map((item) => (
            <ProductThumb key={item.id} tint={item.tint} image={item.image} />
          ))}
        </div>
        <p className="w-32.5 shrink-0 text-right text-lg leading-base font-semibold text-text">{total}</p>
        <span aria-hidden className="hidden w-30 shrink-0 xl:block" />
      </div>
      <div className="hidden items-center justify-between gap-4 border-t border-border-subtle pt-4 md:flex">
        <p className="flex items-center gap-1.5 text-base leading-sm text-text [&_strong]:font-semibold">
          <Icon name="truck" size={16} className="shrink-0 text-brand" />
          <span>{arrival}</span>
        </p>
        {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
      </div>
    </article>
  );
}
