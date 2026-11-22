import type { ComponentProps, ReactNode } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * CollectionCard (molecule): one live collection on the Offers & collections hub: a tinted
 * packshot panel with an optional deal badge, then the end date or cadence, the name, a line
 * about it and the product count.
 *   mobile: a row with a small panel; the badge folds into the meta line
 * A link: pass yours through `asChild`; its text is the collection name.
 */
const TINTS = {
  citrus: "bg-tint-citrus",
  sage: "bg-sage-100",
  amber: "bg-tint-amber",
  sun: "bg-tint-sun",
  lavender: "bg-tint-lavender",
  surface: "bg-surface-subtle",
} as const;

export interface CollectionCardProps extends ComponentProps<"a">, AsChildProps {
  tint?: keyof typeof TINTS;
  image?: ReactNode;
  /** "15% off gift sets" on the panel (768 up). */
  badge?: ReactNode;
  /** "Ends Sat 14 Feb" or "Updated every Monday". */
  meta: ReactNode;
  /** Mobile meta, e.g. with the deal folded in ("15% off · Ends Sat 14 Feb"). */
  compactMeta?: ReactNode;
  /** deal: error orange (it ends soon). quiet: muted. */
  metaTone?: "deal" | "quiet";
  description?: ReactNode;
  /** "8 products". */
  count: ReactNode;
}

export function CollectionCard({
  tint = "sage",
  image,
  badge,
  meta,
  compactMeta,
  metaTone = "quiet",
  description,
  count,
  asChild = false,
  className,
  children,
  ...props
}: CollectionCardProps) {
  const Comp = asChild ? Slot : "a";
  const metaClass = cn("text-sm leading-xs", metaTone === "deal" ? "font-semibold text-error" : "text-text-muted");
  return (
    <Comp data-slot="collection-card" className={cn("group flex items-center gap-4 font-sans md:flex-col md:items-stretch md:gap-4.5", className)} {...props}>
      <Slottable child={children}>
        {(child) => (
          <>
            <span className={cn("relative flex h-28 w-26 shrink-0 items-center justify-center overflow-hidden rounded-lg md:h-65 md:w-auto md:rounded-xl", TINTS[tint])}>
              {image && <span className="absolute inset-2.5 transition-transform duration-300 group-hover:scale-105 md:inset-10">{image}</span>}
              {badge && (
                <span className="absolute top-4 left-4 hidden rounded-full bg-primary px-3.5 py-2 text-sm leading-xs font-bold text-accent md:inline">{badge}</span>
              )}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1.5 md:gap-4.5">
              <span className="flex flex-col gap-1 md:gap-1.5">
                <span className={metaClass}>
                  {compactMeta ? (
                    <>
                      <span className="md:hidden">{compactMeta}</span>
                      <span className="hidden md:inline">{meta}</span>
                    </>
                  ) : (
                    meta
                  )}
                </span>
                <span className="text-lg leading-base font-semibold tracking-compact text-text md:text-xl md:leading-lg">{child}</span>
                {description && <span className="hidden text-base leading-sm text-text-secondary md:block">{description}</span>}
              </span>
              <span className="flex items-center gap-2 text-sm leading-xs font-semibold text-primary dark:text-text">
                {count}
                <Icon name="arrowRight" size={14} strokeWidth={2.2} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </span>
          </>
        )}
      </Slottable>
    </Comp>
  );
}
