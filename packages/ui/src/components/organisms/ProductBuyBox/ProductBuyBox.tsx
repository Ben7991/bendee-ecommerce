"use client";

import { useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Button, Eyebrow, formatPrice, Icon, IconButton, Stars } from "../../atoms";
import { QuantityStepper } from "../../molecules";

/**
 * ProductBuyBox (organism): everything right of the PDP gallery (Paper PDP → Buy Box): name,
 * rating, price with savings, option pickers, purchase type, stock, quantity + Add to cart,
 * Buy now, delivery estimate and share links. On mobile the quantity row and Buy now give way to
 * StickyBuyBar, and the description, SKU and sales count are left out.
 */
export interface ProductBuyBoxProps extends Omit<ComponentProps<"div">, "title"> {
  /** "Daily Essentials · Powder". */
  eyebrow?: string;
  sku?: string;
  /** Wrap the accent word in <em>. */
  title: ReactNode;
  /** Plain name for button labels. */
  name: string;
  rating?: { value: number; count: number; href: string };
  /** "12k+ sold this year" (from 768px). */
  socialProof?: string;
  description?: ReactNode;
  price: number;
  compareAt?: number;
  /** "Price includes VAT · or 3 payments of GHS 150 with MoMo". */
  priceNote?: ReactNode;
  /** Mobile price note, e.g. "Price includes VAT". */
  compactPriceNote?: ReactNode;
  /** OptionPickers (flavour, size). */
  options?: ReactNode;
  /** ChoiceCards: one-time / subscribe. */
  purchase?: ReactNode;
  /** StockStatus. */
  stock?: ReactNode;
  /** Out of stock: the quantity row and Buy now give way to `soldOutAction`. */
  soldOut?: boolean;
  /** Shown instead of Add to cart when sold out, e.g. a NotifyForm. */
  soldOutAction?: ReactNode;
  maxQuantity?: number;
  onAdd?: (quantity: number) => void;
  onFavourite?: () => void;
  /** "Buy now with MoMo" button (from 768px). */
  buyNow?: ReactNode;
  /** DeliveryEstimator. */
  delivery?: ReactNode;
  /** ShareLinks. */
  share?: ReactNode;
}

export function ProductBuyBox({
  eyebrow,
  sku,
  title,
  name,
  rating,
  socialProof,
  description,
  price,
  compareAt,
  priceNote,
  compactPriceNote,
  options,
  purchase,
  stock,
  soldOut = false,
  soldOutAction,
  maxQuantity = 10,
  onAdd,
  onFavourite,
  buyNow,
  delivery,
  share,
  className,
  ...props
}: ProductBuyBoxProps) {
  const [quantity, setQuantity] = useState(1);
  const saving = compareAt !== undefined && compareAt > price ? compareAt - price : 0;
  const savingLabel = saving ? `${formatPrice(saving)} (${Math.round((saving / compareAt!) * 100)}%)` : "";

  return (
    <div data-slot="product-buy-box" className={cn("flex min-w-0 flex-col gap-5 font-sans md:gap-6", className)} {...props}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          {eyebrow && (
            <Eyebrow size="responsive" className="text-xs md:text-sm">
              {eyebrow}
            </Eyebrow>
          )}
          {sku && <p className="hidden text-xs leading-xs text-text-muted md:block">SKU {sku}</p>}
        </div>
        <h1 className="text-3xl leading-3xl font-medium tracking-tight text-text md:text-5xl md:leading-5xl [&_em]:font-serif [&_em]:font-regular [&_em]:text-brand [&_em]:italic">
          {title}
        </h1>
        {rating && (
          <p className="flex flex-wrap items-center gap-2 text-sm leading-xs md:gap-3">
            <Stars value={rating.value} />
            <span className="font-semibold text-text">{rating.value.toFixed(1)}</span>
            <a href={rating.href} className="text-brand underline underline-offset-2 hover:text-primary dark:hover:text-text">
              {rating.count.toLocaleString("en-GH")} reviews
            </a>
            {socialProof && (
              <>
                <span aria-hidden className="hidden size-1 rounded-full bg-border md:block" />
                <span className="hidden text-text-muted md:inline">{socialProof}</span>
              </>
            )}
          </p>
        )}
        {description && <p className="hidden text-md leading-base text-text-secondary md:block">{description}</p>}
      </div>

      <div className="-mt-2 flex flex-col gap-2 md:mt-0 md:border-y md:border-border-subtle md:py-5">
        <p className="flex flex-wrap items-baseline gap-2 md:gap-3">
          <span className="text-3xl leading-10 font-medium tracking-tight text-text md:text-4xl md:leading-13.5">
            {saving > 0 && <span className="sr-only">Now </span>}
            {formatPrice(price)}
          </span>
          {saving > 0 && (
            <>
              <s className="text-base leading-4.5 text-text-muted md:text-lg md:leading-5.5">
                <span className="sr-only">was </span>
                {formatPrice(compareAt!)}
              </s>
              <span className="rounded-full bg-accent px-2 py-0.75 text-xs leading-xs font-semibold text-on-accent md:px-2.5 md:py-1 md:text-sm">
                <span className="md:hidden">Save {savingLabel}</span>
                <span className="hidden md:inline">You save {savingLabel}</span>
              </span>
            </>
          )}
        </p>
        {(priceNote || compactPriceNote) && (
          <p className="text-xs leading-xs text-text-muted md:text-sm">
            {compactPriceNote ? (
              <>
                <span className="md:hidden">{compactPriceNote}</span>
                <span className="hidden md:inline">{priceNote ?? compactPriceNote}</span>
              </>
            ) : (
              priceNote
            )}
          </p>
        )}
      </div>

      {options && <div className="flex flex-col gap-5">{options}</div>}
      {purchase}
      {stock}

      {soldOut ? (
        soldOutAction && (
          <div id="notify" className="scroll-mt-6">
            {soldOutAction}
          </div>
        )
      ) : (
        <>
          <div className="hidden gap-3 md:flex">
            <QuantityStepper
              label={name}
              value={quantity}
              max={maxQuantity}
              onDecrement={() => setQuantity((value) => Math.max(1, value - 1))}
              onIncrement={() => setQuantity((value) => Math.min(maxQuantity, value + 1))}
              className="shrink-0"
            />
            <Button size="lg" className="flex-1 gap-2 py-4 font-semibold" onClick={() => onAdd?.(quantity)}>
              <Icon name="bag" />
              Add to cart · {formatPrice(price * quantity)}
            </Button>
            <IconButton label={`Save ${name} to favourites`} variant="outline" onClick={onFavourite} className="size-13">
              <Icon name="heart" size={20} />
            </IconButton>
          </div>
          {buyNow && <div className="-mt-3 hidden md:block">{buyNow}</div>}
        </>
      )}

      {delivery}
      {share}
    </div>
  );
}
