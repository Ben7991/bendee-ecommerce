import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { ProductThumb, StatusChip, type ProductThumbProps, type StatusChipProps } from "../../atoms";

export interface ReturnPhoto {
  /** next/image with `fill`. */
  image: ReactNode;
  /** The full-size photo; opens in a new tab. */
  href: string;
  /** Tile behind the photo. */
  tint?: "amber" | "sage";
}

/**
 * ReturnRequestCard (organism): what the customer is sending back and why (Paper Jofak - Admin →
 * Return detail): the item with what they paid and the reason, then "Customer says" with their
 * words, photos (each opens full size) and what they want. From 1440px a titled card; tablet puts
 * the photos beside the quote; mobile shows the photos large under it.
 */
export interface ReturnRequestCardProps extends Omit<ComponentProps<"section">, "children"> {
  title?: string;
  item: {
    /** "Magnesium Sleep · Gummies". */
    name: string;
    /** Tablet and mobile: "Magnesium Sleep × 1". */
    compactName?: string;
    /** "1 of 1 bought · paid GHS 80 after 10% discount". */
    detail: string;
    /** Tablet and mobile: "Paid GHS 80 · wants refund to MoMo". */
    compactDetail?: string;
    image?: ReactNode;
    tint?: ProductThumbProps["tint"];
  };
  reason: { label: string; tone: NonNullable<StatusChipProps["tone"]> };
  /** The customer's words, without quote marks. */
  quote?: string;
  /** Mobile: a shorter quote. */
  compactQuote?: string;
  photos?: ReturnPhoto[];
  /** From 1440px: "Refund to MoMo (original method)". */
  wants?: string;
}

const TINT = { amber: "bg-tint-amber", sage: "bg-sage-200" } as const;

export function ReturnRequestCard({ title = "What the customer is returning", item, reason, quote, compactQuote, photos = [], wants, className, ...props }: ReturnRequestCardProps) {
  const photo = (entry: ReturnPhoto, index: number, size: string) => (
    <a
      key={index}
      href={entry.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Photo ${index + 1} of ${photos.length}, opens full size`}
      className={cn("relative block shrink-0 overflow-hidden rounded-sm outline-offset-2", TINT[entry.tint ?? (index % 2 ? "sage" : "amber")], size)}
    >
      {entry.image}
    </a>
  );

  return (
    <section
      data-slot="return-request-card"
      aria-label={title}
      className={cn("flex flex-col overflow-clip rounded-lg border border-border-subtle font-sans max-md:rounded-18", className)}
      {...props}
    >
      <h2 className="hidden px-5 py-4 text-md leading-5 font-semibold text-text xl:block">{title}</h2>

      <div className="flex items-center gap-3 px-3.5 py-3.5 md:px-4.5 xl:gap-3.5 xl:border-t xl:border-border-subtle xl:px-5">
        <ProductThumb size="stock" bleed tint={item.tint ?? "surface"} image={item.image} className="md:size-12 xl:size-14 xl:rounded-14" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-14 leading-5 font-semibold text-text md:text-base xl:leading-5.5">
            <span className="xl:hidden">{item.compactName ?? item.name}</span>
            <span className="hidden xl:inline">{item.name}</span>
          </p>
          <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-4.5">
            <span className="xl:hidden">{item.compactDetail ?? item.detail}</span>
            <span className="hidden xl:inline">{item.detail}</span>
          </p>
        </div>
        <StatusChip tone={reason.tone} className="shrink-0 px-2.5 py-0.75 leading-4">
          {reason.label}
        </StatusChip>
      </div>

      {(quote || photos.length > 0 || wants) && (
        <div className="flex flex-col gap-3 px-3.5 pb-3.5 md:flex-row md:items-center md:gap-4 md:border-t md:border-border-subtle md:bg-surface-subtle md:px-4.5 md:py-3.5 xl:flex-col xl:items-stretch xl:px-5 xl:py-4">
          <p className="hidden text-xs leading-xs font-semibold tracking-label text-text-muted uppercase xl:block">Customer says</p>
          {quote && (
            <p className="rounded-14 bg-surface-subtle p-3.5 text-14 leading-5.5 text-text md:flex-1 md:rounded-none md:bg-transparent md:p-0 xl:text-base xl:leading-5.75">
              <span className="md:hidden">“{compactQuote ?? quote}”</span>
              <span className="hidden md:inline">“{quote}”</span>
            </p>
          )}
          {photos.length > 0 && (
            <>
              <div className="grid grid-cols-2 gap-2 md:hidden">{photos.map((entry, index) => photo(entry, index, "h-28 w-full rounded-14"))}</div>
              <div className="hidden shrink-0 items-center gap-2.5 md:flex">
                {photos.map((entry, index) => photo(entry, index, "h-15 w-18 xl:h-18 xl:w-24"))}
                <span className="hidden text-xs leading-xs text-text-muted xl:inline">
                  {photos.length} {photos.length === 1 ? "photo" : "photos"} · click to enlarge
                </span>
              </div>
            </>
          )}
          {wants && (
            <p className="hidden items-center gap-2 text-sm leading-4 text-text-muted xl:flex">
              Wants:
              <span className="rounded-full border border-border bg-bg px-2.5 py-0.75 text-xs leading-xs font-semibold text-text dark:bg-surface">{wants}</span>
            </p>
          )}
        </div>
      )}
    </section>
  );
}
