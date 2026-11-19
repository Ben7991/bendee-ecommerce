import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { ProductThumb, type ProductThumbProps } from "../../atoms";

/**
 * OrderBreakdown (organism): the quiet summary panel beside an order or return: optional
 * title, the items with their quantity badges, the money rows, the total, a main action and
 * small print (Paper Account → Order detail, Return request, Return status).
 * `totalFirst` puts the total straight under the title ("Your refund"). `compact` replaces the
 * whole panel on mobile with one line ("4 items · GHS 1,254.60 · Details").
 */
export interface BreakdownItem {
  id: string;
  name: ReactNode;
  detail?: ReactNode;
  price: ReactNode;
  quantity?: number;
  tint?: ProductThumbProps["tint"];
  image?: ReactNode;
}

export interface BreakdownRow {
  label: ReactNode;
  value: ReactNode;
  /** Brand green, semibold (discounts, "Free"). */
  highlight?: boolean;
}

export interface OrderBreakdownProps extends Omit<ComponentProps<"aside">, "title" | "children"> {
  title?: ReactNode;
  items?: BreakdownItem[];
  rows?: BreakdownRow[];
  total?: { label: ReactNode; value: ReactNode };
  totalFirst?: boolean;
  /** Under the rows, before the actions. */
  note?: ReactNode;
  /** Full-width buttons. */
  actions?: ReactNode;
  /** Centred small print at the bottom. */
  footer?: ReactNode;
  /** Mobile replacement: packshots, a title, a line and an action. */
  compact?: { items: BreakdownItem[]; title: ReactNode; detail: ReactNode; action?: ReactNode };
}

export function OrderBreakdown({ title, items, rows, total, totalFirst = false, note, actions, footer, compact, className, ...props }: OrderBreakdownProps) {
  const totalRow = total && (
    <div className={cn("flex items-baseline justify-between gap-3", !totalFirst && "border-t border-border pt-3")}>
      <p className="text-md leading-sm font-semibold text-text">{total.label}</p>
      <p className="text-2xl leading-2xl font-medium tracking-snug text-text">{total.value}</p>
    </div>
  );
  return (
    <>
      {compact && (
        <div data-slot="order-breakdown-compact" className="flex items-center gap-3 rounded-lg bg-surface-subtle p-4 font-sans md:hidden">
          <div className="flex shrink-0">
            {compact.items.slice(0, 3).map((item, index) => (
              <ProductThumb key={item.id} size="xs" tint={item.tint} image={item.image} ring className={index > 0 ? "-ml-2.5" : undefined} />
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-sm leading-sm font-semibold text-text">{compact.title}</p>
            <p className="text-xs leading-xs text-text-muted">{compact.detail}</p>
          </div>
          {compact.action && <div className="shrink-0 text-sm leading-xs">{compact.action}</div>}
        </div>
      )}
      <aside
        data-slot="order-breakdown"
        className={cn("flex flex-col gap-4 rounded-lg bg-surface-subtle p-5 font-sans md:gap-5 md:p-6", compact && "hidden md:flex", className)}
        {...props}
      >
        {title && <h2 className="text-lg leading-base font-semibold text-text">{title}</h2>}
        {totalFirst && totalRow}
        {items && items.length > 0 && (
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4">
                <ProductThumb size="lg" tint={item.tint} image={item.image} quantity={item.quantity} />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="text-base leading-sm font-semibold text-text">{item.name}</p>
                  {item.detail && <p className="text-xs leading-xs text-text-muted">{item.detail}</p>}
                </div>
                <p className="shrink-0 text-base leading-sm font-semibold whitespace-nowrap text-text">{item.price}</p>
              </li>
            ))}
          </ul>
        )}
        {(rows?.length || (!totalFirst && total)) && (
          <div className={cn("flex flex-col gap-2", (items?.length || totalFirst) && "border-t border-border pt-4", !items?.length && !totalFirst && "gap-4")}>
            {rows?.map((row, index) => (
              <div key={index} className="flex justify-between gap-3 text-sm leading-sm">
                <p className="text-text-secondary">{row.label}</p>
                <p className={cn("text-right", row.highlight ? "font-semibold text-brand" : "text-text")}>{row.value}</p>
              </div>
            ))}
            {!totalFirst && totalRow}
          </div>
        )}
        {note && <p className="text-xs leading-sm text-text-muted">{note}</p>}
        {actions && <div className="flex flex-col gap-2.5 *:w-full">{actions}</div>}
        {footer && <p className="text-center text-xs leading-sm text-text-muted">{footer}</p>}
      </aside>
    </>
  );
}
