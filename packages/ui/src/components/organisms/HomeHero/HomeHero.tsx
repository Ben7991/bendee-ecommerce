import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Heading, Icon, Illustration } from "../../atoms";
import { CheckList } from "../../molecules";

/**
 * HomeHero (organism): the Home page hero on its sage gradient, with the header inside it.
 * Layout: stacked on mobile and tablet (copy, then showcase); copy beside showcase on desktop.
 * Buttons come in as slots because their copy and size change below 768px.
 */
export interface HomeHeroProps extends Omit<ComponentProps<"section">, "title"> {
  header: ReactNode;
  rating: { value: string; count: string };
  /** Heading content; wrap the accent word in <em>. */
  title: ReactNode;
  lede: { short: string; full: string };
  /** Desktop-only benefit list. */
  benefits?: ReactNode[];
  /** Buttons for tablet and desktop. */
  actions: ReactNode;
  /** Buttons for mobile. */
  compactActions: ReactNode;
  /** Usually a <HeroShowcase>. */
  showcase: ReactNode;
}

export function HomeHero({
  header,
  rating,
  title,
  lede,
  benefits,
  actions,
  compactActions,
  showcase,
  className,
  ...props
}: HomeHeroProps) {
  return (
    <section
      data-slot="home-hero"
      aria-labelledby="home-hero-title"
      className={cn(
        "relative flex flex-col gap-2 overflow-hidden rounded-b-2xl bg-gradient-hero pt-4 pb-7",
        "md:gap-10 md:rounded-2xl md:px-10 md:pt-5 md:pb-10",
        "xl:gap-18 xl:px-14 xl:pb-16",
        className,
      )}
      {...props}
    >
      <Illustration name="sunburst" className="absolute top-10 left-192.5 hidden size-130 xl:block" />

      <div className="relative px-5 md:px-0">{header}</div>

      <div className="relative flex flex-col gap-2 md:gap-10 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-5 px-5 pt-7 md:gap-6 md:px-0 md:pt-0 xl:w-150 xl:shrink-0 xl:gap-8">
          <p className="flex w-fit items-center gap-2 rounded-full border border-border bg-bg py-1.25 pr-3 pl-1.25 font-sans text-xs leading-xs font-medium text-text-muted md:py-1.5 md:pr-3.5 md:pl-1.5 md:text-sm">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white md:size-5.5">
              <Icon name="star" size={12} className="size-2.5 md:size-3" />
            </span>
            <span>
              <strong className="font-bold text-text">{rating.value}</strong> from{" "}
              <strong className="font-bold text-text">{rating.count}</strong>{" "}
              <span className="hidden md:inline">verified </span>buyers
            </span>
          </p>

          <Heading as="h1" id="home-hero-title" size="hero" className="md:w-150">
            {title}
          </Heading>

          <p className="font-sans text-base leading-5.75 text-text-secondary md:w-130 md:text-lg md:leading-lg xl:w-120">
            <span className="md:hidden">{lede.short}</span>
            <span className="hidden md:inline">{lede.full}</span>
          </p>

          {benefits && benefits.length > 0 && <CheckList items={benefits} className="hidden xl:flex" />}

          <div className="flex gap-2.5 md:hidden">{compactActions}</div>
          <div className="hidden items-center gap-3 md:flex">{actions}</div>
        </div>

        <div className="flex px-5 md:justify-center md:px-0 xl:block">{showcase}</div>
      </div>
    </section>
  );
}
