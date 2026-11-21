import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { StatusChip, type StatusChipProps } from "../../atoms";

type Tint = "sage" | "sun" | "lavender" | "citrus" | "surface";

export type CollectionBanner =
  /** Packshots standing on a tint. */
  | { kind: "images"; images: ReactNode[]; tint: Tint }
  /** A short headline on a tint: "≤ GHS 150"; `serif` for dates ("6 March"). */
  | { kind: "text"; text: string; compactText?: string; tint: Tint; serif?: boolean }
  /** No banner yet: "Upload image" links to `uploadHref`. */
  | { kind: "empty"; uploadHref: string };

export interface AdminCollection {
  id: string;
  name: string;
  href: string;
  status: { label: string; compactLabel?: string; tone: NonNullable<StatusChipProps["tone"]> };
  /** "Added in the last 30 days". */
  description: string;
  /** Tablet: shorter. */
  compactDescription?: string;
  /** "9 products"; an ended collection might say "Reuse for 2027". */
  footer: string;
  /** "Rule-based" or "Manual". */
  kind: "Rule-based" | "Manual";
  /** Mobile line: "Rule-based · 9 products". */
  summary: string;
  banner: CollectionBanner;
  /** Faded (ended). */
  ended?: boolean;
}

const TINT: Record<Tint, string> = {
  sage: "bg-sage-100",
  sun: "bg-tint-sun",
  lavender: "bg-tint-lavender",
  citrus: "bg-tint-citrus",
  surface: "bg-surface",
};
const SHOT = ["h-24 w-16", "h-20 w-16", "h-22 w-16"] as const;

/**
 * CollectionGrid (organism): the store's collections (Paper Jofak - Admin → Collections): cards
 * with a banner (packshots, a headline, or an upload prompt), name and status, what's in it,
 * product count and whether it's rule-based or picked by hand. Two columns on tablet, three from
 * 1440px; a list on mobile. Ended collections are faded; each card opens the editor.
 */
export interface CollectionGridProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  collections: AdminCollection[];
  emptyMessage?: string;
  "aria-label"?: string;
}

export function CollectionGrid({ linkAs: LinkAs = "a", collections, emptyMessage = "No collections here.", "aria-label": ariaLabel = "Collections", className, ...props }: CollectionGridProps) {
  const chip = (item: AdminCollection, compact = false) => (
    <StatusChip tone={item.status.tone} size="sm" className={cn("shrink-0 md:px-2 md:py-px md:text-xs md:leading-4.5", item.status.tone === "neutral" && "text-text-secondary")}>
      {compact ? (item.status.compactLabel ?? item.status.label) : item.status.label}
    </StatusChip>
  );

  return (
    <section data-slot="collection-grid" aria-label={ariaLabel} className={cn("font-sans", className)} {...props}>
      {collections.length === 0 && <p className="rounded-lg border border-border-subtle px-6 py-12 text-center text-14 leading-sm text-text-muted">{emptyMessage}</p>}

      {collections.length > 0 && (
        <ul className="hidden grid-cols-2 gap-4 md:grid xl:grid-cols-3">
          {collections.map((item) => {
            const banner = item.banner;
            return (
              <li
                key={item.id}
                className={cn(
                  "relative flex flex-col overflow-clip rounded-lg border",
                  banner.kind === "empty" ? "border-dashed border-border" : "border-border-subtle",
                  item.ended && "opacity-72",
                )}
              >
                {banner.kind === "images" && (
                  <div aria-hidden className={cn("flex h-30 shrink-0 items-end justify-center gap-2 px-5", TINT[banner.tint])}>
                    {banner.images.slice(0, 2).map((image, index) => (
                      <span key={index} className={cn("relative shrink-0 overflow-hidden rounded-t-sm", SHOT[index])}>
                        {image}
                      </span>
                    ))}
                  </div>
                )}
                {banner.kind === "text" && (
                  <div aria-hidden className={cn("flex h-30 shrink-0 items-center justify-center", TINT[banner.tint])}>
                    <span
                      className={cn(
                        "text-34 leading-10",
                        banner.serif ? "font-serif text-text-secondary italic" : "font-semibold tracking-tight",
                        !banner.serif && (banner.tint === "sun" ? "text-warning-text" : "text-text"),
                      )}
                    >
                      {banner.text}
                    </span>
                  </div>
                )}
                {banner.kind === "empty" && (
                  <div className="relative z-1 flex h-30 shrink-0 flex-col items-center justify-center gap-1 bg-surface-subtle text-sm leading-4.5 font-semibold">
                    <span className="text-text-secondary">Banner not set</span>
                    <LinkAs href={banner.uploadHref} className="text-brand hover:underline">
                      Upload image
                    </LinkAs>
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2.5 px-4.5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="min-w-0 truncate text-md leading-5.5 font-semibold text-text">
                      <LinkAs href={item.href} className="after:absolute after:inset-0 hover:underline">
                        {item.name}
                      </LinkAs>
                    </h3>
                    {chip(item)}
                  </div>
                  <p className="text-sm leading-4.5 text-text-muted">
                    <span className="xl:hidden">{item.compactDescription ?? item.description}</span>
                    <span className="hidden xl:inline">{item.description}</span>
                  </p>
                  <p className="mt-auto flex items-center justify-between gap-3 border-t border-border-subtle pt-2.5">
                    <span className="text-sm leading-4.5 font-semibold text-text-secondary">{item.footer}</span>
                    <span className={cn("text-xs leading-xs font-semibold", item.kind === "Rule-based" ? "text-lavender-text" : "text-text-muted")}>{item.kind}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {collections.length > 0 && (
        <ul className="overflow-clip rounded-18 border border-border-subtle md:hidden">
          {collections.map((item) => {
            const banner = item.banner;
            return (
              <li key={item.id} className={cn("relative flex items-center gap-3 border-border-subtle px-3.5 py-3 not-first:border-t", item.ended && "opacity-72")}>
                <span
                  aria-hidden
                  className={cn(
                    "relative flex size-11.5 shrink-0 items-center justify-center overflow-hidden rounded-sm",
                    banner.kind === "empty" ? "border border-dashed border-border bg-surface-subtle" : TINT[banner.kind === "images" ? banner.tint : banner.tint],
                  )}
                >
                  {banner.kind === "images" && banner.images[0]}
                  {banner.kind === "text" && (
                    <span className={cn("text-sm leading-4 font-bold", banner.tint === "sun" ? "text-warning-text" : "text-text-secondary", banner.serif && "font-serif font-regular italic")}>
                      {banner.compactText ?? banner.text}
                    </span>
                  )}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <LinkAs href={item.href} className="truncate text-base leading-5 font-semibold text-text after:absolute after:inset-0">
                    {item.name}
                  </LinkAs>
                  <span className="truncate text-xs leading-xs text-text-muted">{item.summary}</span>
                </span>
                {chip(item, true)}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
