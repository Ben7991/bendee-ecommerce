import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Heading } from "../../atoms";

/**
 * CollectionHero (organism): the evergreen banner of a collection (Paper Collection → Collection
 * Hero), also used as the featured banner on the Offers & collections hub.
 *   mobile:  header, search, (the hub's page heading) and the banner on one sage wash, then
 *            `children` (staff note, ended notice) as white cards on it
 *   768 up:  the header on white, the banner card with copy and chips beside a packshot cluster,
 *            then `children`
 * `variant="featured"` (hub) insets the banner further and drops the breadcrumbs from it; pass
 * `heading` for the hub's own title above it. Chips and the action are slots (Badges, a Button).
 */
export interface CollectionHeroProduct {
  id: string;
  tint?: "sage" | "amber" | "lavender" | "sun";
  image?: ReactNode;
}

export interface CollectionHeroProps extends Omit<ComponentProps<"section">, "title"> {
  header?: ReactNode;
  /** Mobile search bar. */
  search?: ReactNode;
  /** Hub page heading above the banner. */
  heading?: { breadcrumbs?: ReactNode; title: ReactNode; description?: ReactNode };
  /** Inside the banner, 768 up (collection page). */
  breadcrumbs?: ReactNode;
  eyebrow: ReactNode;
  /** Wrap the accent word in <em>. */
  title: ReactNode;
  description: ReactNode;
  compactDescription?: ReactNode;
  /** Badges: deal, end date, count. */
  chips?: ReactNode;
  /** A Button (hub: "Shop the collection"). */
  action?: ReactNode;
  /** Up to three packshots: left, centre (tallest), right. */
  products: CollectionHeroProduct[];
  variant?: "page" | "featured";
}

const TINTS = { sage: "bg-sage-100", amber: "bg-tint-amber", lavender: "bg-tint-lavender", sun: "bg-tint-sun" } as const;
const TILE_SIZES = [
  "h-27.5 w-24 md:h-57.5 md:w-45",
  "h-35 w-27.5 md:h-75 md:w-52.5",
  "h-24 w-24 md:h-50 md:w-45",
];

export function CollectionHero({
  header,
  search,
  heading,
  breadcrumbs,
  eyebrow,
  title,
  description,
  compactDescription,
  chips,
  action,
  products,
  variant = "page",
  className,
  children,
  ...props
}: CollectionHeroProps) {
  const titleId = useId();
  const featured = variant === "featured";
  const Title = heading ? "h2" : "h1";

  return (
    <section
      data-slot="collection-hero"
      aria-labelledby={titleId}
      className={cn("flex flex-col gap-3.5 rounded-b-2xl bg-gradient-hero pb-5 md:gap-5 md:rounded-none md:bg-none md:pb-0", className)}
      {...props}
    >
      {header}
      {search && <div className="px-5 md:hidden">{search}</div>}

      {heading && (
        <div className="flex flex-col gap-3 px-5 pt-1 pb-2 font-sans md:gap-5 md:px-10 md:pt-6 xl:px-14">
          {heading.breadcrumbs}
          <div className="flex flex-col gap-2 xl:flex-row xl:items-end xl:justify-between xl:gap-10">
            <Heading as="h1" size="account">
              {heading.title}
            </Heading>
            {heading.description && <p className="max-w-105 text-base leading-base text-text-secondary md:text-md xl:pb-1.5">{heading.description}</p>}
          </div>
        </div>
      )}

      <div className={cn("px-4", featured ? "md:px-10" : "md:px-4 md:pt-1")}>
        <div
          className={cn(
            "relative flex flex-col overflow-hidden rounded-2xl bg-linear-150 from-evergreen-900 via-evergreen-800 via-70% to-evergreen-800 font-sans md:rounded-3xl xl:flex-row",
            "dark:from-sage-200 dark:via-sage-100 dark:to-surface-subtle",
            featured ? "xl:min-h-100" : "xl:min-h-110",
          )}
        >
          <span aria-hidden className="absolute -top-22.5 -right-22.5 size-55 rounded-full bg-warning/18 md:-top-35 md:right-20 md:size-105 xl:right-75" />

          <div className={cn("relative flex flex-col gap-3 px-5.5 pt-6 pb-2 md:gap-7 md:px-10 md:pt-10 md:pb-2 xl:w-180 xl:shrink-0 xl:justify-between xl:px-12 xl:py-11", featured && "xl:px-10")}>
            {breadcrumbs && (
              <div className="hidden md:block [&_*]:text-text-inverse-muted [&_[aria-current]]:text-text-inverse">{breadcrumbs}</div>
            )}
            <div className="flex flex-col gap-3 md:gap-4">
              <p className="text-11 leading-xs font-semibold tracking-wide text-accent uppercase md:text-xs">{eyebrow}</p>
              <Heading id={titleId} as={Title} size="hero" tone="inverse" className="text-38 leading-10 tracking-tight md:text-64 md:leading-16 xl:text-6xl xl:leading-6xl xl:tracking-display">
                {title}
              </Heading>
              <p className="max-w-135 text-sm leading-sm text-text-inverse-muted md:text-lg md:leading-lg">
                {compactDescription ? (
                  <>
                    <span className="md:hidden">{compactDescription}</span>
                    <span className="hidden md:inline">{description}</span>
                  </>
                ) : (
                  description
                )}
              </p>
            </div>
            {(chips || action) && (
              <div className={cn("flex flex-wrap items-center gap-2 pt-1 md:gap-2.5 md:pt-0", featured && "flex-col items-start md:flex-row md:items-center")}>
                {action && <div className={cn("order-last md:order-first", featured && "order-last")}>{action}</div>}
                {chips && <div className="flex flex-wrap items-center gap-2 md:gap-2.5">{chips}</div>}
              </div>
            )}
          </div>

          <div aria-hidden className="relative flex items-end gap-2.5 px-5.5 pt-3.5 md:justify-center md:gap-4 md:px-10 md:pt-8 xl:grow xl:pt-10">
            {products.slice(0, 3).map((product, index) => (
              <span key={product.id} className={cn("relative shrink-0 overflow-hidden rounded-t-md md:rounded-t-xl", TILE_SIZES[index], TINTS[product.tint ?? "sage"])}>
                {product.image && <span className="absolute inset-x-2 inset-y-2 md:inset-x-4 md:inset-y-4">{product.image}</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {children && <div className="flex flex-col gap-3.5 px-4 md:gap-5 md:px-10 xl:px-14">{children}</div>}
    </section>
  );
}
