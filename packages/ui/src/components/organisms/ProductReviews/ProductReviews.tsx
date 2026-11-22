import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Eyebrow, Stars } from "../../atoms";
import { RatingHistogram, type RatingHistogramProps } from "../../molecules";

/**
 * ProductReviews (organism): the PDP reviews block (Paper PDP → Reviews).
 *   desktop: sage panel, the summary (average, histogram, Write a review) beside the list
 *   tablet:  the same panel, summary above the list
 *   mobile:  "Reviews" + Write a review link, a compact summary card, the first review only and
 *            a "See all" button
 */
export interface ProductReviewsProps extends Omit<ComponentProps<"section">, "title"> {
  eyebrow?: string;
  /** Wrap the accent word in <em>, e.g. "Loved by <em>3,214</em> routines". */
  title: ReactNode;
  average: number;
  count: number;
  shares: RatingHistogramProps["shares"];
  /** "Write a review": a full-width button from 768px. */
  writeAction?: ReactNode;
  /** "Write a review" as a text link (mobile). */
  compactWriteAction?: ReactNode;
  /** Review filter chips (from 768px). */
  filters?: ReactNode;
  /** Review sort (from 768px). */
  sort?: ReactNode;
  /** CustomerReview elements. Mobile shows the first. */
  reviews: ReactNode[];
  /** "Show more reviews" link (from 768px). */
  moreAction?: ReactNode;
  /** "See all 3,214 reviews" button (mobile). */
  compactMoreAction?: ReactNode;
}

export function ProductReviews({
  eyebrow = "Reviews",
  title,
  average,
  count,
  shares,
  writeAction,
  compactWriteAction,
  filters,
  sort,
  reviews,
  moreAction,
  compactMoreAction,
  className,
  ...props
}: ProductReviewsProps) {
  const countLabel = count.toLocaleString("en-GH");
  return (
    <section
      data-slot="product-reviews"
      aria-labelledby="product-reviews-title"
      className={cn(
        "flex scroll-mt-6 flex-col gap-5 px-5 py-8 font-sans",
        "md:gap-8 md:rounded-2xl md:bg-surface-subtle md:px-8 md:pt-10 md:pb-12 xl:flex-row xl:gap-14 xl:px-14 xl:pt-14 xl:pb-18",
        className,
      )}
      {...props}
    >
      {/* Mobile heading row. */}
      <div className="flex items-end justify-between gap-4 md:hidden">
        <h2 className="text-3xl leading-3xl font-medium tracking-tight text-text">{eyebrow}</h2>
        {compactWriteAction}
      </div>

      <div className="flex flex-col gap-6 xl:w-90 xl:shrink-0">
        <div className="hidden flex-col gap-3 md:flex">
          <Eyebrow size="md">{eyebrow}</Eyebrow>
          <h2
            id="product-reviews-title"
            className="text-5xl leading-5xl font-medium tracking-tight text-text [&_em]:font-serif [&_em]:font-regular [&_em]:text-brand [&_em]:italic"
          >
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-5 rounded-xl bg-surface p-5 md:flex-col md:items-stretch md:gap-6 md:rounded-none md:bg-transparent md:p-0">
          <div className="flex w-24 shrink-0 flex-col items-center gap-1 md:w-auto md:flex-row md:gap-4">
            <p className="text-4xl leading-13.5 font-medium tracking-display text-text md:text-64 md:leading-18">
              <span className="sr-only">Average rating </span>
              {average.toFixed(1)}
            </p>
            <div className="flex flex-col items-center gap-1 md:items-start md:gap-1.5">
              <Stars value={average} className="[&_svg]:size-3 md:[&_svg]:size-4.5" />
              <p className="text-xs leading-xs text-text-muted md:text-sm">
                <span className="hidden md:inline">Based on </span>
                {countLabel} reviews
              </p>
            </div>
          </div>
          <RatingHistogram shares={shares} className="min-w-0 flex-1" />
        </div>

        {writeAction && <div className="hidden md:block">{writeAction}</div>}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5">
        {(filters || sort) && (
          <div className="hidden items-center justify-between gap-4 md:flex">
            {filters}
            {sort}
          </div>
        )}
        {reviews.map((review, index) => (
          <div key={index} className={index > 0 ? "hidden md:block" : undefined}>
            {review}
          </div>
        ))}
        {moreAction && <div className="hidden md:block">{moreAction}</div>}
        {compactMoreAction && <div className="md:hidden">{compactMoreAction}</div>}
      </div>
    </section>
  );
}
