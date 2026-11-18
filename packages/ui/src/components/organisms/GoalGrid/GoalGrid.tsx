import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Badge, Button, Heading, Icon, Illustration } from "../../atoms";
import { SectionHeader } from "../../molecules";
import { GoalCard } from "../GoalCard";

export interface GoalLink {
  href: string;
  productCount: number;
}

/**
 * GoalGrid (organism): the "Shop by goal" section with its four goal cards.
 *   mobile: header, then a swipeable row of the Sleep and Gut cards
 *   tablet: 2 × 2 grid (rows 400px and 300px)
 *   desktop: one 440px row, Sleep card 432px wide
 */
export interface GoalGridProps extends Omit<ComponentProps<"section">, "title"> {
  title: ReactNode;
  compactTitle: ReactNode;
  blurb: string;
  viewAllHref: string;
  goals: { sleep: GoalLink; focus: GoalLink; gut: GoalLink; immunity: GoalLink };
  linkAs?: LinkComponent;
}

export function GoalGrid({
  title,
  compactTitle,
  blurb,
  viewAllHref,
  goals,
  linkAs: Link = "a",
  className,
  ...props
}: GoalGridProps) {
  return (
    <section
      data-slot="goal-grid"
      aria-labelledby="goal-grid-title"
      className={cn("flex flex-col gap-5 pt-12 pl-5 md:gap-10 md:px-10 md:pt-18 xl:gap-12 xl:px-14 xl:pt-28 xl:pb-14", className)}
      {...props}
    >
      <SectionHeader
        className="pr-5 md:pr-0"
        eyebrow="Shop by goal"
        title={
          <Heading id="goal-grid-title" className="xl:w-prose">
            <span className="block w-62.5 md:hidden">{compactTitle}</span>
            <span className="hidden md:inline">{title}</span>
          </Heading>
        }
        aside={
          <>
            <Link
              href={viewAllHref}
              className="shrink-0 font-sans text-14 leading-4.5 font-semibold text-brand underline underline-offset-2 md:hidden"
            >
              See all
            </Link>
            <div className="hidden shrink-0 flex-col items-end gap-5 md:flex">
              <p className="hidden w-85 text-right font-sans text-md leading-base text-text-muted xl:block">{blurb}</p>
              <Button asChild arrow variant="outline" size="md">
                <Link href={viewAllHref}>
                  <span className="xl:hidden">View all</span>
                  <span className="hidden xl:inline">View all products</span>
                </Link>
              </Button>
            </div>
          </>
        }
      />

      <div className="scrollbar-none flex snap-x snap-mandatory gap-2.5 overflow-x-auto pr-5 md:grid md:grid-cols-2 md:gap-3 md:overflow-visible md:pr-0 xl:flex xl:h-110">
        <GoalCard
          tone="feature"
          size="feature"
          linkAs={Link}
          href={goals.sleep.href}
          className="h-70 w-60 shrink-0 snap-start justify-end md:h-100 md:w-auto md:justify-between xl:h-auto xl:w-108"
          title={
            <>
              <span className="md:hidden">Sleep &amp; Stress</span>
              <span className="hidden md:inline">
                Sleep &amp; Stress
                <br />
                Recovery
              </span>
            </>
          }
          description={
            <>
              <span className="md:hidden">Magnesium, ashwagandha &amp; chamomile.</span>
              <span className="hidden md:inline">
                Magnesium, ashwagandha and chamomile to quiet the mind and wake up restored.
              </span>
            </>
          }
          top={
            <Badge variant="glass" size="lg" className="hidden md:inline-flex">
              {goals.sleep.productCount} products
            </Badge>
          }
          art={<Illustration name="moon" className="absolute -top-2.5 -right-5 size-42.5 md:-top-10 md:-right-12.5 md:size-50 xl:-top-7.5 xl:-right-10 xl:size-75" />}
          footer={
            <ul className="hidden flex-wrap gap-2 pt-2 md:flex" aria-label="Benefits">
              <li><Badge variant="accent" size="lg">Deeper sleep</Badge></li>
              <li><Badge variant="outline" size="lg">Less stress</Badge></li>
              <li className="md:hidden xl:block"><Badge variant="outline" size="lg">Calm mood</Badge></li>
            </ul>
          }
        />
        <GoalCard
          linkAs={Link}
          href={goals.focus.href}
          className="hidden md:flex md:h-100 xl:h-auto xl:flex-1"
          title="Focus & Energy"
          description="Lion's mane, B12 and green tea for clean, steady energy."
          media={
            <div className="relative size-full overflow-hidden rounded-lg bg-gradient-sun">
              <Illustration name="sun" className="absolute top-1/2 left-1/2 size-45 -translate-x-1/2 -translate-y-1/2" />
              <Badge variant="neutral" className="absolute bottom-3.5 left-3.5 py-2">
                {goals.focus.productCount} products
              </Badge>
            </div>
          }
        />
        <GoalCard
          tone="accent"
          linkAs={Link}
          href={goals.gut.href}
          className="h-70 w-50 shrink-0 snap-start justify-end md:h-75 md:w-auto md:justify-between xl:h-auto xl:flex-1"
          title="Gut & Digestion"
          description={
            <>
              <span className="md:hidden">Probiotics &amp; fibre.</span>
              <span className="hidden md:inline">Probiotics and fibre for a happy, balanced belly.</span>
            </>
          }
          top={
            <span className="hidden size-12 items-center justify-center rounded-full bg-primary text-accent md:flex">
              <Icon name="arrowUpRight" />
            </span>
          }
          art={<Illustration name="leaf" className="absolute -top-7.5 -right-10 h-46.25 w-42.5 md:-top-10 md:-right-15 md:h-65 md:w-60" />}
        />
        <GoalCard
          tone="citrus"
          linkAs={Link}
          href={goals.immunity.href}
          className="hidden md:flex md:h-75 xl:h-auto xl:flex-1"
          title="Immunity"
          description="Vitamin C, zinc & elderberry for every season."
          top={<p className="font-sans text-xs leading-xs font-semibold tracking-caps text-citrus-800 dark:text-error">NEW</p>}
          art={<Illustration name="orange" className="absolute top-1/2 left-1/2 -mt-4.5 size-50 -translate-x-1/2 -translate-y-1/2" />}
        />
      </div>
    </section>
  );
}
