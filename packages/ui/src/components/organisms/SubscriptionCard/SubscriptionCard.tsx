import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, ProductThumb, StatusBadge, type ProductThumbProps, type StatusBadgeProps } from "../../atoms";
import { subscriptionCardVariants, type SubscriptionCardVariantProps } from "./SubscriptionCard.variants";

/**
 * SubscriptionCard (organism): one Subscribe & save product.
 *   full, 768 up: packshot, name, status, price and the next delivery; Deliver to / Pay with /
 *                 Frequency in three columns; the upcoming deliveries on surface; the actions
 *   full, mobile: the next delivery in a sage box, the settings as rows with Change links,
 *                 a full-width primary action, two half-width ones and the cancel link
 *   compact:      a paused subscription in one row (`action`: "Resume now")
 */
export interface SubscriptionSetting {
  label: ReactNode;
  value: ReactNode;
  /** A "Change" TextLink. */
  action?: ReactNode;
}

export interface SubscriptionCardProps extends Omit<ComponentProps<"article">, "children">, SubscriptionCardVariantProps {
  name: string;
  status: Pick<StatusBadgeProps, "label" | "tone">;
  /** "120 tablets · Qty 1 · Every 30 days · since Jun 2026". */
  meta: ReactNode;
  compactMeta?: ReactNode;
  thumb: { tint?: ProductThumbProps["tint"]; image?: ReactNode };
  price?: ReactNode;
  compareAt?: ReactNode;
  /** "You save 20%". */
  saving?: ReactNode;
  /** "−20%" on mobile. */
  compactSaving?: ReactNode;
  next?: { label: ReactNode; date: ReactNode; when: ReactNode };
  /** Mobile next-delivery box: title and line. */
  compactNext?: { title: ReactNode; detail: ReactNode };
  settings?: SubscriptionSetting[];
  upcoming?: Array<{ date: ReactNode; detail: ReactNode; highlight?: boolean }>;
  upcomingLabel?: string;
  /** The main action ("Skip next delivery"). */
  primaryAction?: ReactNode;
  /** "Deliver now", "Pause". */
  secondaryActions?: ReactNode;
  /** "Cancel subscription" (a danger TextLink). */
  cancel?: ReactNode;
  /** Compact variant's button ("Resume now"). */
  action?: ReactNode;
}

export function SubscriptionCard({
  variant,
  name,
  status,
  meta,
  compactMeta,
  thumb,
  price,
  compareAt,
  saving,
  compactSaving,
  next,
  compactNext,
  settings = [],
  upcoming = [],
  upcomingLabel = "Upcoming",
  primaryAction,
  secondaryActions,
  cancel,
  action,
  className,
  ...props
}: SubscriptionCardProps) {
  const titleId = useId();
  const compact = variant === "compact";

  if (compact) {
    return (
      <article data-slot="subscription-card" aria-labelledby={titleId} className={cn(subscriptionCardVariants({ variant }), "gap-4 p-4 md:flex-row md:items-center md:gap-5 md:px-6 md:py-5", className)} {...props}>
        <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-5">
          <ProductThumb size="square" tint={thumb.tint} image={thumb.image} className="size-13 md:size-16" />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center justify-between gap-2.5 md:justify-start">
              <h3 id={titleId} className="text-md leading-sm font-semibold text-text">
                {name}
              </h3>
              <StatusBadge size="sm" {...status} />
            </div>
            <p className="text-sm leading-sm text-text-muted">
              {compactMeta ? (
                <>
                  <span className="md:hidden">{compactMeta}</span>
                  <span className="hidden md:inline">{meta}</span>
                </>
              ) : (
                meta
              )}
            </p>
          </div>
        </div>
        {action && <div className="flex shrink-0 flex-col *:w-full md:*:w-auto">{action}</div>}
      </article>
    );
  }

  return (
    <article data-slot="subscription-card" aria-labelledby={titleId} className={cn(subscriptionCardVariants({ variant }), className)} {...props}>
      {/* Head */}
      <div className="flex items-start gap-4 p-4 md:gap-5 md:p-6">
        <ProductThumb size="xl" tint={thumb.tint} image={thumb.image} className="size-16 md:size-22" />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2.5 md:justify-start">
            <h3 id={titleId} className="text-md leading-sm font-semibold text-text md:text-xl md:leading-2xl md:font-medium md:tracking-snug">
              {name}
            </h3>
            <StatusBadge size="sm" {...status} />
          </div>
          <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-sm">{meta}</p>
          {price && (
            <p className="flex flex-wrap items-baseline gap-2 pt-1">
              <span className="text-md leading-sm font-semibold text-text md:text-xl md:leading-2xl">{price}</span>
              {compareAt && <span className="text-xs leading-xs text-text-muted line-through md:text-sm">{compareAt}</span>}
              {saving && (
                <span className="text-xs leading-xs font-semibold text-brand">
                  {compactSaving ? (
                    <>
                      <span className="md:hidden">{compactSaving}</span>
                      <span className="hidden md:inline">{saving}</span>
                    </>
                  ) : (
                    saving
                  )}
                </span>
              )}
            </p>
          )}
        </div>
        {next && (
          <div className="hidden shrink-0 flex-col items-end gap-1 md:flex">
            <p className="text-xs leading-xs font-semibold tracking-wide text-text-muted uppercase">{next.label}</p>
            <p className="text-2xl leading-2xl font-medium tracking-snug text-text">{next.date}</p>
            <p className="text-xs leading-xs text-text-muted">{next.when}</p>
          </div>
        )}
      </div>

      {/* Mobile next delivery */}
      {compactNext && (
        <div className="mx-4 flex items-center gap-3 rounded-md bg-surface-subtle p-3.5 md:hidden">
          <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-bg text-primary dark:text-text">
            <Icon name="calendar" size={16} />
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="text-sm leading-sm font-semibold text-text">{compactNext.title}</p>
            <p className="text-xs leading-xs text-text-muted">{compactNext.detail}</p>
          </div>
        </div>
      )}

      {/* Settings */}
      {settings.length > 0 && (
        <dl className="flex flex-col px-4 md:flex-row md:border-y md:border-border-subtle md:px-0">
          {settings.map((setting, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 border-b border-border-subtle py-3.5 last:border-0 md:flex-1 md:flex-col md:items-start md:gap-1 md:border-r md:border-b-0 md:px-6 md:py-4 md:last:border-r-0"
            >
              <div className="flex min-w-0 flex-col gap-1">
                <dt className="text-xs leading-xs text-text-muted">{setting.label}</dt>
                <dd className="text-sm leading-sm font-semibold text-text">{setting.value}</dd>
              </div>
              {setting.action && <div className="shrink-0 text-xs leading-xs md:text-xs">{setting.action}</div>}
            </div>
          ))}
        </dl>
      )}

      {/* Upcoming, 768 up */}
      {upcoming.length > 0 && (
        <div className="hidden flex-col gap-3 bg-surface-subtle px-6 py-5 md:flex">
          <p className="text-xs leading-xs font-semibold tracking-wide text-text-muted uppercase">{upcomingLabel}</p>
          <ul className="flex gap-2.5">
            {upcoming.map((delivery, index) => (
              <li
                key={index}
                className={cn("flex flex-1 flex-col gap-0.5 rounded-sm bg-bg px-3.5 py-3", delivery.highlight ? "border-field border-brand" : "border border-border-subtle")}
              >
                <p className="text-sm leading-sm font-semibold text-text">{delivery.date}</p>
                <p className="text-xs leading-xs text-text-muted">{delivery.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      {(primaryAction || secondaryActions || cancel) && (
        <div className="flex flex-col gap-2.5 p-4 pt-1 md:flex-row md:items-center md:px-6 md:py-4.5">
          {primaryAction && <div className="flex flex-col *:w-full md:*:w-auto">{primaryAction}</div>}
          {secondaryActions && <div className="grid grid-cols-2 gap-2.5 md:flex">{secondaryActions}</div>}
          <span aria-hidden className="hidden flex-1 md:block" />
          {cancel && <div className="pt-1.5 text-center text-sm leading-xs md:pt-0">{cancel}</div>}
        </div>
      )}
    </article>
  );
}
