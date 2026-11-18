import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Eyebrow, Heading, Illustration } from "../../atoms";

/**
 * QuizBanner (organism): the evergreen "Not sure where to start?" banner.
 * Mobile: copy and a full-width CTA. Tablet: copy above the quiz card. Desktop: side by side.
 */
export interface QuizBannerProps extends Omit<ComponentProps<"section">, "title"> {
  eyebrow: string;
  title: ReactNode;
  lede: { short: string; full: string };
  /** CTA for tablet/desktop (accent arrow button). */
  action: ReactNode;
  /** Full-width CTA for mobile. */
  compactAction: ReactNode;
  note?: string;
  /** Usually a <QuizCard>; hidden on mobile. */
  card?: ReactNode;
}

export function QuizBanner({
  eyebrow,
  title,
  lede,
  action,
  compactAction,
  note,
  card,
  className,
  ...props
}: QuizBannerProps) {
  return (
    <section
      data-slot="quiz-banner"
      aria-labelledby="quiz-banner-title"
      className={cn("flex px-3 pt-10 md:px-0 md:pt-18 xl:px-10 xl:py-14", className)}
      {...props}
    >
      <div className="relative flex w-full flex-col gap-4.5 overflow-hidden rounded-26 bg-gradient-feature-wide px-6 py-8 md:gap-10 md:rounded-3xl md:p-10 xl:flex-row xl:items-center xl:justify-between xl:px-16 xl:py-18">
        <Illustration
          name="rings"
          className="absolute -top-30 -right-30 size-80 md:-top-35 md:size-155"
        />
        <div className="relative flex flex-col gap-4.5 md:gap-7 xl:w-140 xl:shrink-0">
          <Eyebrow tone="accent" className="text-11 leading-3.5 md:text-sm md:leading-xs">
            {eyebrow}
          </Eyebrow>
          <Heading id="quiz-banner-title" size="feature" tone="inverse">
            {title}
          </Heading>
          <p className="font-sans text-14 leading-5.25 text-text-inverse-muted md:w-115 md:text-17 md:leading-6.5">
            <span className="md:hidden">{lede.short}</span>
            <span className="hidden md:inline">{lede.full}</span>
          </p>
          <div className="md:hidden">{compactAction}</div>
          <div className="hidden items-center gap-5 md:flex">
            {action}
            {note && <p className="font-sans text-14 leading-4.5 text-on-feature-muted">{note}</p>}
          </div>
        </div>
        {card && <div className="relative hidden md:block xl:w-110 xl:shrink-0">{card}</div>}
      </div>
    </section>
  );
}
