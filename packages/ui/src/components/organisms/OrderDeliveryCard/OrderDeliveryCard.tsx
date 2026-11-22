import { useId, type ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon, StatusChip } from "../../atoms";

/**
 * OrderDeliveryCard (organism): where the order goes (Paper Jofak - Admin → Order detail →
 * Delivery): method, address, GhanaPost GPS code with Open in Maps, landmark, the customer's
 * note and, from 768px, the courier tracking number field (posts `tracking` to `trackingAction`).
 * Delivery itself happens outside Jofak, so there is no rider.
 */
export interface OrderDeliveryCardProps extends Omit<ComponentProps<"section">, "children"> {
  /** "Same day"; mobile "Same day · by 18:00". */
  method: string;
  compactMethod?: string;
  /** "House 14, Firestone Road". */
  street: string;
  /** "Madina, Accra · Greater Accra". */
  area: string;
  /** Mobile: "Madina, Accra · Behind the Total station". */
  compactArea?: string;
  gps?: { code: string; mapsHref: string };
  landmark?: string;
  note?: string;
  tracking?: {
    action?: string | ((formData: FormData) => void | Promise<void>);
    defaultValue?: string;
    fields?: Record<string, string>;
  };
}

export function OrderDeliveryCard({
  method,
  compactMethod,
  street,
  area,
  compactArea,
  gps,
  landmark,
  note,
  tracking,
  className,
  ...props
}: OrderDeliveryCardProps) {
  const titleId = useId();
  const trackingId = useId();
  const label = "text-xs leading-xs text-text-muted";
  return (
    <section
      data-slot="order-delivery-card"
      aria-labelledby={titleId}
      className={cn("flex flex-col gap-3 rounded-lg border border-border-subtle p-4 font-sans md:gap-3.5 md:p-5", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id={titleId} className="text-xs leading-xs font-semibold tracking-eyebrow text-text-muted uppercase">
          Delivery
        </h2>
        <StatusChip tone="neutral" size="count" className="text-text-secondary">
          <span className="md:hidden">{compactMethod ?? method}</span>
          <span className="hidden md:inline">{method}</span>
        </StatusChip>
      </div>
      <address className="flex flex-col gap-0.5 not-italic">
        <span className="text-base leading-5.5 font-semibold text-text">{street}</span>
        <span className="text-sm leading-4.5 text-text-secondary md:text-14 md:leading-sm">
          <span className="md:hidden">{compactArea ?? area}</span>
          <span className="hidden md:inline">{area}</span>
        </span>
      </address>
      {gps && (
        <div className="flex items-center justify-between gap-3 rounded-sm bg-surface-subtle px-3 py-2.5">
          <p className="flex flex-col">
            <span className={label}>GhanaPost GPS</span>
            <span className="text-14 leading-sm font-semibold tracking-code text-text">{gps.code}</span>
          </p>
          <a href={gps.mapsHref} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm leading-xs font-semibold text-brand hover:underline">
            Open in Maps
            <Icon name="arrowUpRight" size={12} />
          </a>
        </div>
      )}
      {landmark && (
        <p className="hidden flex-col gap-1 md:flex">
          <span className={label}>Landmark</span>
          <span className="text-14 leading-sm text-text">{landmark}</span>
        </p>
      )}
      {note && (
        <>
          <p className="hidden flex-col gap-1 md:flex">
            <span className={label}>Delivery note</span>
            <span className="text-14 leading-sm text-text">&ldquo;{note}&rdquo;</span>
          </p>
          <p className="text-sm leading-4.5 text-text-secondary md:hidden">Note: &ldquo;{note}&rdquo;</p>
        </>
      )}
      {tracking && (
        <form action={tracking.action} className="hidden flex-col gap-2 border-t border-border-subtle pt-3.5 md:flex">
          {Object.entries(tracking.fields ?? {}).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <label htmlFor={trackingId} className={label}>
            Courier tracking no. (optional)
          </label>
          <input
            id={trackingId}
            name="tracking"
            defaultValue={tracking.defaultValue}
            placeholder="Add when you hand it over"
            className="h-10 rounded-sm border border-border bg-bg px-3.5 text-14 leading-4.5 text-text outline-none placeholder:text-text-muted focus:border-brand"
          />
        </form>
      )}
    </section>
  );
}
