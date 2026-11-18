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
  badge?: { label: string; variant: "solid" | "light" | "warning" };
  tint: ProductTint;
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
  linkAs?: LinkComponent;
}

export function ProductCard({ product, image, onAdd, linkAs: Link = "a", className, ...props }: ProductCardProps) {
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
          TILE_TINTS[product.tint],
        )}
      >
        <div className="relative h-37.5 w-full transition-transform duration-300 group-hover:scale-103 md:h-72">{image}</div>
        {product.badge && (
          <>
            <Badge variant={product.badge.variant} size="sm" className="absolute top-2.5 left-2.5 md:hidden">
              {product.badge.label}
            </Badge>
            <Badge variant={product.badge.variant} className="absolute top-4 left-4 hidden md:inline-flex">
              {product.badge.label}
            </Badge>
          </>
        )}
        <IconButton
          variant="plain"
          size="md"
          label={`Save ${product.name} to favourites`}
          className="absolute top-4 right-4 z-20 hidden md:inline-flex"
        >
          <Icon name="heart" size={16} />
        </IconButton>
      </div>

      <div className="flex flex-col gap-0.75 md:gap-1.5 md:px-1">
        <Rating value={product.rating} count={product.reviewCount} className="hidden md:inline-flex" />
        <h3 className="font-sans text-base leading-4.5 font-semibold text-text md:text-19 md:leading-base md:tracking-subtle">
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
        <Price amount={product.price} compareAt={product.compareAt} size="md" className="md:hidden" />
        <Price amount={product.price} compareAt={product.compareAt} className="hidden md:flex" />
        <IconButton variant="solid" size="sm" label={`Add ${product.name} to bag`} onClick={onAdd} className="z-20 md:hidden">
          <Icon name="plus" size={14} strokeWidth={2.6} />
        </IconButton>
        <Button size="xs" onClick={onAdd} aria-label={`Add ${product.name} to bag`} className="relative z-20 hidden md:inline-flex">
          <Icon name="plus" size={14} />
          Add
        </Button>
      </div>
    </article>
  );
}
