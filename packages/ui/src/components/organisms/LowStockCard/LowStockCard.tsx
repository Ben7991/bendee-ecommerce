import { useId, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { StatusChip } from "../../atoms";

export interface LowStockItem {
  id: string;
  name: string;
  /** "60 capsules · JF-ASH-60". */
  detail: string;
  href: string;
  left: number;
  /** "~2 days"; sold-out items say "Sold out". */
  forecast: string;
  tint?: "sage" | "amber" | "lavender" | "sun";
  /** Packshot (next/image with `fill`). */
  image?: ReactNode;
}

const TINT = { sage: "bg-sage-100", amber: "bg-tint-amber", lavender: "bg-tint-lavender", sun: "bg-tint-sun" } as const;

/**
 * LowStockCard (organism): products running out (Paper Jofak - Admin → Low stock): packshot,
 * variant and SKU, units left (red at zero) and how long they'll last, with links to receive
 * stock and to the full list.
 */
export interface LowStockCardProps extends Omit<ComponentProps<"section">, "title"> {
  linkAs?: LinkComponent;
  title?: ReactNode;
  count: number;
  items: LowStockItem[];
  action?: { label: string; href: string };
  footer?: { label: string; href: string };
}

export function LowStockCard({
  linkAs: LinkAs = "a",
  title = "Low stock",
  count,
  items,
  action,
  footer,
  className,
  ...props
}: LowStockCardProps) {
  const titleId = useId();
  return (
    <section
      data-slot="low-stock-card"
      aria-labelledby={titleId}
      className={cn("flex flex-col gap-1 rounded-lg border border-border-subtle px-5 pt-4 pb-2 font-sans md:px-6 md:pt-5 md:pb-3", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-3 pb-2">
        <div className="flex items-center gap-2.5">
          <h2 id={titleId} className="text-lg leading-base font-semibold tracking-compact text-text">
            {title}
          </h2>
          <StatusChip tone="warning" size="count">
            {count}
            <span className="sr-only"> products</span>
          </StatusChip>
        </div>
        {action && (
          <LinkAs href={action.href} className="text-sm leading-sm font-semibold text-brand hover:underline">
            {action.label}
          </LinkAs>
        )}
      </div>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.id} className="border-border-subtle not-first:border-t">
            <LinkAs href={item.href} className="flex items-center gap-3 py-2.5">
              <span className={cn("relative size-11 shrink-0 overflow-hidden rounded-sm", TINT[item.tint ?? "sage"])}>{item.image}</span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-14 leading-sm font-medium text-text">{item.name}</span>
                <span className="text-xs leading-xs text-text-muted">{item.detail}</span>
              </span>
              <span className="flex w-14 shrink-0 flex-col text-right">
                <span className={cn("text-14 leading-sm font-bold", item.left === 0 ? "text-error" : "text-warning-text")}>{item.left} left</span>
                <span className="text-xs leading-xs text-text-muted">{item.forecast}</span>
              </span>
            </LinkAs>
          </li>
        ))}
      </ul>
      {footer && (
        <div className="border-t border-border-subtle pt-2.5 pb-1">
          <LinkAs href={footer.href} className="text-sm leading-sm font-semibold text-text-secondary hover:text-text">
            {footer.label}
          </LinkAs>
        </div>
      )}
    </section>
  );
}
