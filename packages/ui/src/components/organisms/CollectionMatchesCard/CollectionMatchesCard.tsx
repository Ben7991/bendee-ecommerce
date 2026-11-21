import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";

export interface MatchedProduct {
  id: string;
  name: string;
  /** "GHS 140 · tag: skin", "On sale · GHS 116", "Out of stock · hidden". */
  detail: string;
  tone?: "muted" | "sale" | "hidden";
  /** next/image with `fill`. */
  image?: ReactNode;
  tint?: "sage" | "amber" | "citrus" | "lavender";
}

const TINT = { sage: "bg-sage-100", amber: "bg-tint-amber", citrus: "bg-tint-citrus", lavender: "bg-tint-lavender" } as const;

/**
 * CollectionMatchesCard (organism): what shoppers will see in a collection (Paper Jofak - Admin →
 * Collection editor): the match count with how many are hidden for being out of stock, the sort,
 * the first products as tiles (sale prices in green, hidden ones faded with a red note) and See
 * all. Tablet and desktop.
 */
export interface CollectionMatchesCardProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  count: number;
  /** "2 out of stock are hidden on the store". */
  note?: string;
  sort?: string;
  products: MatchedProduct[];
  seeAllHref?: string;
}

export function CollectionMatchesCard({ linkAs: LinkAs = "a", count, note, sort = "Best selling", products, seeAllHref, className, ...props }: CollectionMatchesCardProps) {
  const title = `${count} ${count === 1 ? "product matches" : "products match"}`;
  return (
    <section data-slot="collection-matches-card" aria-label={title} className={cn("flex flex-col gap-3 rounded-lg border border-border-subtle px-6 py-5.5 font-sans", className)} {...props}>
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-baseline gap-2">
          <span className="text-md leading-5.5 font-semibold text-text">{title}</span>
          {note && <span className="text-sm leading-4.5 text-text-muted">· {note}</span>}
        </p>
        <p className="shrink-0 text-sm leading-4.5 text-text-muted">
          Sort <span className="font-semibold text-text">{sort}</span>
        </p>
      </div>
      {products.length === 0 ? (
        <p className="rounded-sm bg-surface-subtle px-4 py-6 text-center text-14 leading-sm text-text-muted">Nothing matches yet. Add a rule or pick products.</p>
      ) : (
        <ul className="grid grid-cols-4 gap-2.5">
          {products.slice(0, 4).map((product) => (
            <li key={product.id} className="flex min-w-0 flex-col gap-2">
              <span aria-hidden className={cn("relative h-27.5 overflow-hidden rounded-sm", TINT[product.tint ?? "sage"], product.tone === "hidden" && "opacity-50")}>
                {product.image}
              </span>
              <span className={cn("truncate text-sm leading-4.5 font-semibold", product.tone === "hidden" ? "text-text-muted" : "text-text")}>{product.name}</span>
              <span
                className={cn(
                  "truncate text-xs leading-xs",
                  product.tone === "sale" ? "font-semibold text-brand" : product.tone === "hidden" ? "font-semibold text-error" : "text-text-muted",
                )}
              >
                {product.detail}
              </span>
            </li>
          ))}
        </ul>
      )}
      {seeAllHref && count > 0 && (
        <LinkAs href={seeAllHref} className="w-fit text-sm leading-4.5 font-semibold text-text hover:underline">
          See all {count} matches
        </LinkAs>
      )}
    </section>
  );
}
