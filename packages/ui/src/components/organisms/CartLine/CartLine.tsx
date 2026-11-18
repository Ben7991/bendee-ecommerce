import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { formatPrice, Icon, TextLink } from "../../atoms";
import { QuantityStepper } from "../../molecules";
import type { ProductTint } from "../ProductCard";

export interface CartLineData {
  id: string;
  name: string;
  href: string;
  /** "Lemon lime · 25 servings · One-time purchase" (cart table). */
  details: string;
  /** "Lemon lime · 25 servings · One-time" (compact lines). */
  compactDetails?: string;
  unitPrice: number;
  compareAtUnitPrice?: number;
  quantity: number;
  lineTotal: number;
  compareAtLineTotal?: number;
  tint: ProductTint;
  /** Sold out: greyed, excluded from totals, stepper disabled. */
  soldOut?: boolean;
  /** "Switch to subscribe & save 20%", "Change frequency", "Notify me when it's back". */
  action?: { label: string; href: string; inMiniCart?: boolean };
}

const TINTS: Record<ProductTint, string> = {
  sage: "bg-sage-100",
  amber: "bg-tint-amber",
  lavender: "bg-tint-lavender",
  sun: "bg-tint-sun",
};

/**
 * CartLine (organism): one product in the cart.
 *   responsive: compact line on mobile, table row (product · quantity · total) from 768px
 *   compact:    always the compact line (mini-cart)
 * Quantity, remove and the action are wired by the app (`onQuantityChange`, `onRemove`).
 */
export interface CartLineProps extends Omit<ComponentProps<"article">, "children"> {
  item: CartLineData;
  image?: ReactNode;
  layout?: "responsive" | "compact";
  /** Compact spacing for the mini-cart. */
  dense?: boolean;
  soldOutLabel?: string;
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
  linkAs?: LinkComponent;
}

export function CartLine({
  item,
  image,
  layout = "responsive",
  dense = false,
  soldOutLabel = "Sold out — not included in your total",
  onQuantityChange,
  onRemove,
  linkAs: Link = "a",
  className,
  ...props
}: CartLineProps) {
  const tile = item.soldOut ? "bg-surface" : TINTS[item.tint];
  const name = (
    <Link href={item.href} className="hover:underline">
      {item.name}
    </Link>
  );
  const stepper = (size: "sm" | "md") => (
    <QuantityStepper
      size={size}
      value={item.quantity}
      label={item.name}
      disabled={item.soldOut}
      // Only build handlers when the app wires them, so the line also renders as a server component.
      onDecrement={onQuantityChange && (() => onQuantityChange(item.quantity - 1))}
      onIncrement={onQuantityChange && (() => onQuantityChange(item.quantity + 1))}
    />
  );
  const showCompactAction = item.action && (!dense || item.action.inMiniCart);

  const compact = (
    <div className={cn("flex gap-4", dense ? "py-3" : "py-5", layout === "responsive" && "md:hidden")}>
      <span className={cn("flex shrink-0 items-center justify-center rounded-md", tile, dense ? "h-22 w-19" : "h-26 w-22")}>
        <span className={cn("relative", dense ? "h-16 w-13" : "h-19 w-15.5", item.soldOut && "opacity-45")}>{image}</span>
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 font-sans">
        <div className="flex items-start gap-2">
          <h3 className={cn("min-w-0 flex-1 text-md leading-sm font-semibold", item.soldOut ? "text-text-muted" : "text-text")}>{name}</h3>
          <button
            type="button"
            aria-label={`Remove ${item.name}`}
            onClick={onRemove}
            className="flex h-5 w-6 shrink-0 items-center justify-end text-text-muted transition-colors hover:text-error"
          >
            <Icon name="trash" size={16} />
          </button>
        </div>
        {item.soldOut ? (
          <p className="text-xs leading-xs font-semibold text-error">{soldOutLabel}</p>
        ) : (
          <p className="text-xs leading-xs text-text-muted">{item.compactDetails ?? item.details}</p>
        )}
        {showCompactAction && item.action && (
          <TextLink asChild className="w-fit text-xs leading-xs font-medium">
            <Link href={item.action.href}>{item.action.label}</Link>
          </TextLink>
        )}
        <div className="flex items-center justify-between pt-1">
          {stepper("sm")}
          <div className="flex flex-col items-end">
            <p className={cn("text-lg leading-sm font-semibold whitespace-pre", item.soldOut ? "text-text-muted" : "text-text")}>
              {item.soldOut ? "—" : formatPrice(item.lineTotal)}
            </p>
            {item.soldOut ? (
              <p className="text-xs leading-xs text-text-muted">{formatPrice(item.unitPrice)}</p>
            ) : (
              item.compareAtLineTotal !== undefined && (
                <s className="text-xs leading-xs text-text-muted">
                  <span className="sr-only">was </span>
                  {formatPrice(item.compareAtLineTotal)}
                </s>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (layout === "compact") {
    return (
      <article data-slot="cart-line" aria-label={item.name} className={className} {...props}>
        {compact}
      </article>
    );
  }

  return (
    <article data-slot="cart-line" aria-label={item.name} className={className} {...props}>
      {compact}
      <div className="hidden items-center gap-5 py-5 font-sans md:flex">
        <div className="flex min-w-0 flex-1 items-center gap-5">
          <span className={cn("flex h-30 w-26 shrink-0 items-center justify-center rounded-md", tile)}>
            <span className={cn("relative h-22 w-18", item.soldOut && "opacity-45")}>{image}</span>
          </span>
          <div className="flex min-w-0 flex-col gap-1.5">
            <h3 className={cn("text-xl leading-base font-semibold", item.soldOut ? "text-text-muted" : "text-text")}>{name}</h3>
            {item.soldOut ? (
              <p className="text-sm leading-xs font-semibold text-error">{soldOutLabel}</p>
            ) : (
              <p className="text-sm leading-xs text-text-muted">{item.details}</p>
            )}
            <p className="flex items-baseline gap-2">
              <span className={cn("text-base leading-4.5 font-semibold", item.soldOut ? "text-text-muted" : "text-text")}>
                {formatPrice(item.unitPrice)}
              </span>
              {!item.soldOut && item.compareAtUnitPrice !== undefined && (
                <s className="text-sm leading-xs text-text-muted">
                  <span className="sr-only">was </span>
                  {formatPrice(item.compareAtUnitPrice)}
                </s>
              )}
            </p>
            <div className="flex items-center gap-4 pt-0.5 text-sm leading-xs">
              {item.action && (
                <TextLink asChild className="font-medium">
                  <Link href={item.action.href}>{item.action.label}</Link>
                </TextLink>
              )}
              <button type="button" onClick={onRemove} className="text-text-muted underline decoration-1 hover:text-text">
                Remove<span className="sr-only"> {item.name}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-34 shrink-0">{stepper("md")}</div>
        <p className={cn("w-27.5 shrink-0 text-right text-xl leading-base font-semibold", item.soldOut ? "text-text-muted" : "text-text")}>
          {item.soldOut ? <span aria-label="Not included">—</span> : formatPrice(item.lineTotal)}
        </p>
      </div>
    </article>
  );
}
