import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

export interface FeaturePackshot {
  /** next/image with `fill`. */
  image: ReactNode;
  tint?: "sage" | "amber" | "citrus";
}

const TINT = { sage: "bg-sage-100", amber: "bg-tint-amber", citrus: "bg-tint-citrus" } as const;
/** Three packshots of different heights from 1440px; two on tablet; one on mobile. */
const SHOT = [
  "h-26 w-20 md:h-30 md:w-19 xl:h-37.5 xl:w-24",
  "hidden md:block md:h-35 md:w-19 xl:h-45 xl:w-27.5",
  "hidden xl:block xl:h-32.5 xl:w-24",
] as const;

/**
 * CollectionFeature (organism): the collection featured at the top of the Offers & collections
 * hub (Paper Jofak - Admin → Collections): an evergreen banner with its name, deal and products,
 * last week's views and revenue (from 1440px) and Edit, beside a panel of packshots. On mobile
 * the whole banner opens the editor.
 */
export interface CollectionFeatureProps extends Omit<ComponentProps<"section">, "children" | "title"> {
  linkAs?: LinkComponent;
  title: string;
  eyebrow?: string;
  /** "Up to 20% off · skin & hydration · rule-based · 12 products". */
  description: string;
  /** Tablet and mobile: "Up to 20% off · 12 products · ends 15 Dec". */
  compactDescription?: string;
  /** From 1440px: Ends, Views · 7 days, Revenue · 7 days. */
  stats?: { label: string; value: string }[];
  editHref: string;
  packshots?: FeaturePackshot[];
}

export function CollectionFeature({
  linkAs: LinkAs = "a",
  title,
  eyebrow = "Featured on the hub",
  description,
  compactDescription,
  stats = [],
  editHref,
  packshots = [],
  className,
  ...props
}: CollectionFeatureProps) {
  return (
    <section
      data-slot="collection-feature"
      aria-label={`${eyebrow}: ${title}`}
      className={cn("relative flex overflow-clip rounded-lg bg-primary font-sans md:rounded-xl", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 px-4 py-4.5 md:gap-5 md:px-5.5 md:py-5.5 xl:px-7 xl:py-6.5">
        <div className="flex flex-col gap-1.5 md:gap-2.5">
          <p className="flex items-center gap-1.5 text-11 leading-3.5 font-semibold tracking-label text-accent uppercase md:gap-2 md:text-xs md:leading-xs">
            <Icon name="star" size={12} className="md:size-3.5" />
            <span className="md:hidden">{eyebrow.replace(" the ", " ")}</span>
            <span className="hidden md:inline">{eyebrow}</span>
          </p>
          <h2 className="text-xl leading-6.5 font-semibold tracking-snug text-text-inverse md:text-2xl md:leading-8 xl:text-30 xl:leading-9">
            <LinkAs href={editHref} className="after:absolute after:inset-0 md:after:hidden">
              {title}
            </LinkAs>
          </h2>
          <p className="text-xs leading-xs text-text-inverse-muted md:text-14 md:leading-5">
            <span className="xl:hidden">{compactDescription ?? description}</span>
            <span className="hidden xl:inline">{description}</span>
          </p>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          {stats.map((stat) => (
            <p key={stat.label} className="hidden flex-col gap-0.5 xl:flex">
              <span className="text-xs leading-xs text-text-inverse-muted">{stat.label}</span>
              <span className="text-base leading-5 font-semibold text-text-inverse">{stat.value}</span>
            </p>
          ))}
          <LinkAs
            href={editHref}
            aria-label={`Edit ${title}`}
            className="flex h-10 items-center rounded-full bg-accent px-4 text-14 leading-4.5 font-semibold text-on-accent hover:bg-sage-200 xl:ml-auto"
          >
            Edit
          </LinkAs>
        </div>
      </div>
      {packshots.length > 0 && (
        <div aria-hidden className="flex w-26 shrink-0 items-end justify-center gap-2.5 bg-evergreen-800 px-3 pt-3 md:w-50 md:px-5 md:pt-6 xl:w-90 xl:px-6">
          {packshots.slice(0, 3).map((shot, index) => (
            <span key={index} className={cn("relative shrink-0 overflow-hidden rounded-t-md", TINT[shot.tint ?? "sage"], SHOT[index])}>
              {shot.image}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
