import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Avatar, Stars, type AvatarProps } from "../../atoms";
import { reviewCardVariants, type ReviewCardVariantProps } from "./ReviewCard.variants";

export interface Review {
  quote: string;
  author: string;
  detail: string;
  rating?: number;
  avatarTone?: AvatarProps["tone"];
}

/** ReviewCard (organism): a customer testimonial with stars, quote and author. */
export interface ReviewCardProps extends ComponentProps<"figure">, ReviewCardVariantProps {
  review: Review;
}

export function ReviewCard({ review, tone, className, ...props }: ReviewCardProps) {
  const accent = tone === "accent";
  return (
    <figure data-slot="review-card" className={cn(reviewCardVariants({ tone }), className)} {...props}>
      <div className="flex flex-col gap-5">
        <Stars value={review.rating ?? 5} className={accent ? "text-on-accent" : undefined} />
        <blockquote
          className={cn(
            "font-sans text-xl leading-lg font-medium tracking-subtle",
            accent ? "text-on-accent" : "text-text",
          )}
        >
          <p>“{review.quote}”</p>
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3 font-sans">
        <Avatar tone={review.avatarTone} />
        <span className="flex flex-col gap-0.5">
          <span className={cn("text-base leading-4.5 font-semibold", accent ? "text-on-accent" : "text-text")}>
            {review.author}
          </span>
          <span className={cn("text-sm leading-xs", accent ? "text-evergreen-800" : "text-text-muted")}>
            {review.detail}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
