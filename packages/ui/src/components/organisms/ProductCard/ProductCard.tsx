import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Badge, Button, Icon, IconButton, Price, Rating } from "../../atoms";

const TILE_TINTS = {
  sage: "bg-sage-100",
  amber: "bg-tint-amber",
  lavender: "bg-tint-lavender",
  sun: "bg-tint-sun",
} as const;

export type ProductTint = keyof typeof TILE_TINTS;

export interface ProductCardData {
  id: string;
  name: string;
  /** Shorter name for the 2-up mobile grid; falls back to `name`. */
  shortName?: string;
  /** "Lemon lime · 25 servings" (tablet and desktop). */
  details: string;
  /** "25 servings" (mobile, after the rating). */
  shortDetails?: string;
  href: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  badge?: {
    label: string;
    /** Mobile label if shorter, e.g. "Price drop" for "Price dropped GHS 70". */
    shortLabel?: string;
    variant: "solid" | "light" | "warning" | "inverse";
  };
  tint: ProductTint;
  /** Greys the card out and swaps Add for "Notify me". */
  soldOut?: boolean;
  /** Where "Notify me" goes (back-in-stock sign-up); defaults to the product page. */
  notifyHref?: string;
}

/**
 * ProductCard (organism): packshot tile, rating, name, details, price and add button.
 * Compact on mobile, full from 768px. The product name link covers the card; the add and
 * favourite buttons sit above it.
 */
export interface ProductCardProps extends ComponentProps<"article"> {
  product: ProductCardData;
  /** Packshot (next/image with `fill` + object-contain, or <img>). */
  image?: ReactNode;
  onAdd?: () => void;
  /** In the shopper's favourites: filled heart, shown on mobile too (the favourites page). */
  saved?: boolean;
  onToggleSaved?: () => void;
  /** Sold out on mobile: a "Notify me" pill (default) or a bell icon button. */
  compactNotify?: "label" | "icon";
  linkAs?: LinkComponent;
}

export function ProductCard({
  product,
  image,
  onAdd,
  saved = false,
  onToggleSaved,
  compactNotify = "label",
  linkAs: Link = "a",
  className,
  ...props
}: ProductCardProps) {
  const name = product.shortName ?? product.name;
  return (
    <article
      data-slot="product-card"
      className={cn("group relative flex flex-col gap-2.5 md:gap-4.5", className)}
      {...props}
    >
      <div
        className={cn(
          "relative flex h-50 shrink-0 items-center justify-center overflow-hidden rounded-18 md:h-90 md:rounded-xl",
          product.soldOut ? "bg-surface" : TILE_TINTS[product.tint],
        )}
      >
        <div
          className={cn(
            "relative h-37.5 w-full transition-transform duration-300 group-hover:scale-103 md:h-72",
            product.soldOut && "opacity-50",
          )}
        >
          {image}
        </div>
        {product.badge && (
          <>
            <Badge variant={product.badge.variant} size="sm" className="absolute top-2.5 left-2.5 md:hidden">
              {product.badge.shortLabel ?? product.badge.label}
            </Badge>
            <Badge variant={product.badge.variant} className="absolute top-4 left-4 hidden md:inline-flex">
              {product.badge.label}
            </Badge>
          </>
        )}
        <IconButton
          variant="plain"
          size="md"
          label={saved ? `Remove ${product.name} from favourites` : `Save ${product.name} to favourites`}
          aria-pressed={saved}
          onClick={onToggleSaved}
          className={cn(
            "absolute z-20 md:top-4 md:right-4 md:inline-flex md:size-9",
            saved ? "top-2.5 right-2.5 size-7.5 text-error" : "top-4 right-4 hidden",
          )}
        >
          <Icon name="heart" size={16} fill={saved ? "currentColor" : "none"} className="size-3.5 md:size-4" />
        </IconButton>
      </div>

      <div className="flex flex-col gap-0.75 md:gap-1.5 md:px-1">
        <Rating value={product.rating} count={product.reviewCount} className="hidden md:inline-flex" />
        <h3
          className={cn(
            "font-sans text-base leading-4.5 font-semibold md:text-19 md:leading-base md:tracking-subtle",
            product.soldOut ? "text-text-muted" : "text-text",
          )}
        >
          <Link
            href={product.href}
            className="outline-none after:absolute after:inset-0 after:z-10 after:rounded-18 focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand md:after:rounded-xl"
          >
            <span className="md:hidden">{name}</span>
            <span className="hidden md:inline">{product.name}</span>
          </Link>
        </h3>
        <p className="font-sans text-xs leading-xs text-text-muted md:hidden">
          ★ {product.rating.toFixed(1)}
          {product.shortDetails && ` · ${product.shortDetails}`}
        </p>
        <p className="hidden font-sans text-14 leading-4.5 text-text-muted md:block">{product.details}</p>
      </div>

      <div className="flex items-center justify-between md:px-1">
        <Price amount={product.price} compareAt={product.compareAt} muted={product.soldOut} size="md" className="md:hidden" />
        <Price amount={product.price} compareAt={product.compareAt} muted={product.soldOut} className="hidden md:flex" />
        {product.soldOut ? (
          <>
            {compactNotify === "icon" && (
              <IconButton asChild size="sm" label={`Notify me when ${product.name} is back`} className="z-20 text-primary md:hidden dark:text-text">
                <Link href={product.notifyHref ?? product.href}>
                  <Icon name="bell" size={15} />
                </Link>
              </IconButton>
            )}
            <Button
              asChild
              variant="outline"
              size="xs"
              className={cn(
                "relative z-20 px-3 py-2 text-xs md:inline-flex md:px-4 md:py-2.5 md:text-sm",
                compactNotify === "icon" && "hidden",
              )}
            >
              <Link href={product.notifyHref ?? product.href} aria-label={`Notify me when ${product.name} is back`}>
                Notify me
              </Link>
            </Button>
          </>
        ) : (
          <>
            <IconButton variant="solid" size="sm" label={`Add ${product.name} to bag`} onClick={onAdd} className="z-20 md:hidden">
              <Icon name="plus" size={14} strokeWidth={2.6} />
            </IconButton>
            <Button size="xs" onClick={onAdd} aria-label={`Add ${product.name} to bag`} className="relative z-20 hidden md:inline-flex">
              <Icon name="plus" size={14} />
              Add
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
