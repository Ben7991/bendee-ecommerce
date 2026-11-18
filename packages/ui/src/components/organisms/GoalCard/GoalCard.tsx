import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import {
  goalCardDescriptionVariants,
  goalCardTitleVariants,
  goalCardVariants,
  type GoalCardVariantProps,
} from "./GoalCard.variants";

/**
 * GoalCard (organism): a "Shop by goal" tile. The whole card is a link (the title's link is
 * stretched over it), so keep other interactive content out of it.
 *   - `art`: decorative illustration, absolutely positioned by its className.
 *   - `top`: content pinned to the top (a badge, a label, an arrow).
 *   - `media`: an in-flow block under the text (the Focus card's sun tile); without it the
 *     text sits at the bottom.
 *   - `footer`: under the description (benefit chips).
 */
export interface GoalCardProps extends Omit<ComponentProps<"article">, "title">, GoalCardVariantProps {
  title: ReactNode;
  description: ReactNode;
  href: string;
  art?: ReactNode;
  top?: ReactNode;
  media?: ReactNode;
  footer?: ReactNode;
  linkAs?: LinkComponent;
}

export function GoalCard({
  className,
  tone,
  size,
  title,
  description,
  href,
  art,
  top,
  media,
  footer,
  linkAs: Link = "a",
  ...props
}: GoalCardProps) {
  const text = (
    <div className={cn("relative flex flex-col gap-2", size === "feature" && "md:gap-3.5")}>
      <h3 className={goalCardTitleVariants({ tone, size })}>
        <Link
          href={href}
          className="outline-none after:absolute after:inset-0 after:z-10 after:rounded-22 md:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-brand"
        >
          {title}
        </Link>
      </h3>
      <p className={goalCardDescriptionVariants({ tone, size })}>{description}</p>
      {footer}
    </div>
  );

  return (
    <article
      data-slot="goal-card"
      className={cn(goalCardVariants({ tone, size }), media ? "gap-5" : "justify-between", className)}
      {...props}
    >
      {art}
      {media ? (
        <>
          {text}
          <div className="relative min-h-0 grow">{media}</div>
        </>
      ) : (
        <>
          <div className="relative">{top}</div>
          {text}
        </>
      )}
    </article>
  );
}
