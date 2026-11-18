import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Avatar, Stars, type AvatarProps } from "../../atoms";

export interface CustomerReviewData {
  author: string;
  verified?: boolean;
  /** "Accra · Lemon lime, 25 servings · 2 weeks ago". */
  meta: string;
  rating: number;
  title: string;
  body: string;
  helpfulCount?: number;
  avatarTone?: AvatarProps["tone"];
}

/**
 * CustomerReview (organism): one product review on the PDP: author, verified badge, stars,
 * title, text, optional photos and a "Helpful?" count. For marketing testimonials use ReviewCard.
 */
export interface CustomerReviewProps extends ComponentProps<"article"> {
  review: CustomerReviewData;
  /** Up to a few review photos (next/image with `fill`). */
  photos?: ReactNode[];
}

export function CustomerReview({ review, photos = [], className, ...props }: CustomerReviewProps) {
  return (
    <article
      data-slot="customer-review"
      className={cn("flex flex-col gap-4 rounded-xl border border-border-subtle bg-bg p-5 font-sans md:border-0 md:p-6", className)}
      {...props}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar tone={review.avatarTone} className="size-10" />
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="flex flex-wrap items-center gap-2">
              <span className="text-base leading-4.5 font-semibold text-text">{review.author}</span>
              {review.verified && (
                <span className="rounded-full bg-sage-100 px-2 py-0.5 text-11 leading-3.5 font-semibold text-brand">
                  ✓ Verified purchase
                </span>
              )}
            </p>
            <p className="text-xs leading-xs text-text-muted">{review.meta}</p>
          </div>
        </div>
        <Stars value={review.rating} className="shrink-0 gap-0.5 [&_svg]:size-3.5" />
      </header>
      <h3 className="text-lg leading-5.5 font-semibold text-text">{review.title}</h3>
      <p className="text-base leading-base text-text-secondary">{review.body}</p>
      {photos.length > 0 && (
        <ul className="flex gap-2">
          {photos.map((photo, index) => (
            <li key={index} className="relative size-18 shrink-0 overflow-hidden rounded-sm bg-sage-100">
              {photo}
            </li>
          ))}
        </ul>
      )}
      {review.helpfulCount !== undefined && (
        <p className="flex items-center gap-4 text-sm leading-xs text-text-muted">
          Helpful?
          <button type="button" className="rounded-full border border-border px-3 py-1 text-text transition-colors hover:bg-surface-subtle">
            Yes ({review.helpfulCount})
          </button>
        </p>
      )}
    </article>
  );
}
