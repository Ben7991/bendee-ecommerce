import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Eyebrow, Heading } from "../../atoms";
import { ReviewCard, type Review } from "../ReviewCard";

/**
 * ReviewsSection (organism): "Real results" — headline stats and two testimonials.
 * Not shown on mobile (as in Paper). Tablet: intro row above the cards; desktop: side by side.
 */
export interface ReviewsSectionProps extends Omit<ComponentProps<"section">, "title"> {
  eyebrow: string;
  title: ReactNode;
  stats: { value: string; label: string }[];
  /** First renders on surface, second on accent. */
  reviews: [Review, Review];
}

export function ReviewsSection({ eyebrow, title, stats, reviews, className, ...props }: ReviewsSectionProps) {
  return (
    <section
      data-slot="reviews-section"
      aria-labelledby="reviews-title"
      className={cn("hidden flex-col gap-10 px-10 pt-18 md:flex xl:flex-row xl:gap-16 xl:px-14 xl:pt-16 xl:pb-24", className)}
      {...props}
    >
      <div className="flex items-end justify-between gap-8 xl:w-95 xl:shrink-0 xl:flex-col xl:items-start">
        <div className="flex flex-col gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading id="reviews-title">{title}</Heading>
        </div>
        <dl className="flex gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1">
              <dt className="w-42.5 font-sans text-14 leading-sm text-text-muted">{stat.label}</dt>
              <dd className="font-sans text-4xl leading-13.5 font-medium tracking-tight text-text">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="grid grow grid-cols-2 gap-4">
        <ReviewCard review={reviews[0]} />
        <ReviewCard review={reviews[1]} tone="accent" />
      </div>
    </section>
  );
}
