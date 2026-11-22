import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, StatusChip, type StatusChipProps } from "../../atoms";

/**
 * OrderDetailHeader (organism): the top of an admin order (Paper Jofak - Admin → Order detail).
 * From 768px: breadcrumb, the order number with status and payment chips, a meta line and the
 * actions (under the title on tablet, to the right from 1440px). On mobile: a sticky back bar
 * with the number and `more`, then the chips, total and time. Hide AdminTopBar on mobile when
 * you use it.
 */
export interface OrderDetailHeaderProps extends Omit<ComponentProps<"header">, "children"> {
  linkAs?: LinkComponent;
  backHref: string;
  backLabel?: string;
  number: string;
  status: { label: string; tone: NonNullable<StatusChipProps["tone"]> };
  payment: { label: string; compactLabel?: string };
  /** "Placed today at 07:58 on the website · 4 items · Same-day delivery". */
  meta: ReactNode;
  /** Mobile summary: "GHS 596.00" and "Today, 07:58". */
  total: string;
  placed: string;
  /** Tablet and desktop actions (More, Print packing slip, Mark packed). */
  actions?: ReactNode;
  /** The ⋯ menu for the mobile bar. */
  more?: ReactNode;
}

export function OrderDetailHeader({
  linkAs: LinkAs = "a",
  backHref,
  backLabel = "Orders",
  number,
  status,
  payment,
  meta,
  total,
  placed,
  actions,
  more,
  className,
  ...props
}: OrderDetailHeaderProps) {
  return (
    <header data-slot="order-detail-header" className={cn("flex flex-col gap-4 font-sans md:gap-5", className)} {...props}>
      {/* Mobile: back bar (replaces the admin top bar) and summary. */}
      <div className="sticky top-0 z-20 -mx-4 -mt-5 flex h-15 items-center gap-2 border-b border-border-subtle bg-bg px-3 md:hidden">
        <LinkAs href={backHref} aria-label={`Back to ${backLabel}`} className="flex size-10 shrink-0 items-center justify-center rounded-full text-text hover:bg-surface-subtle">
          <Icon name="chevronLeft" size={20} strokeWidth={1.8} />
        </LinkAs>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-xs leading-xs text-text-muted">{backLabel}</p>
          <h1 className="text-md leading-5.5 font-semibold text-text">{number}</h1>
        </div>
        {more}
      </div>
      <div className="flex flex-col gap-2.5 md:hidden">
        <p className="flex flex-wrap gap-2">
          <StatusChip tone={status.tone} size="lg">
            {status.label}
          </StatusChip>
          <StatusChip tone="neutral" size="lg" className="text-text-secondary">
            {payment.compactLabel ?? payment.label}
          </StatusChip>
        </p>
        <p className="flex items-baseline justify-between gap-3">
          <span className="text-2xl leading-8 font-semibold tracking-snug text-text">{total}</span>
          <span className="text-sm leading-4.5 text-text-muted">{placed}</span>
        </p>
      </div>

      {/* Tablet and desktop. */}
      <nav aria-label="Breadcrumb" className="hidden md:block">
        <ol className="flex items-center gap-2 text-sm leading-sm">
          <li>
            <LinkAs href={backHref} className="flex items-center gap-2 font-semibold text-text-secondary hover:text-text">
              <Icon name="chevronLeft" size={14} strokeWidth={1.5} className="text-text-muted" />
              {backLabel}
            </LinkAs>
          </li>
          <li aria-hidden className="text-text-muted">
            /
          </li>
          <li aria-current="page" className="text-text-muted">
            {number}
          </li>
        </ol>
      </nav>
      <div className="hidden flex-col gap-4 md:flex xl:flex-row xl:items-end xl:justify-between xl:gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-34 leading-10 font-semibold tracking-tight text-text">{number}</h1>
            <StatusChip tone={status.tone} size="lg">
              {status.label}
            </StatusChip>
            <StatusChip tone="neutral" size="lg" className="text-text-secondary">
              {payment.label}
            </StatusChip>
          </div>
          <p className="text-14 leading-sm text-text-muted">{meta}</p>
        </div>
        {actions && <div className="flex items-center gap-2.5">{actions}</div>}
      </div>
    </header>
  );
}
