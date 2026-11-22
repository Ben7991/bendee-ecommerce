import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Button, Eyebrow, Heading, Medallion } from "../../atoms";
import { SearchBar } from "../../molecules";

interface HeroLink {
  label: string;
  href: string;
}

/**
 * NotFoundHero (organism): the 404 block: "4 (leaf) 4", title, lede, search, two ways out and
 * quick links. Layout steps mobile 390 → tablet 768 → desktop 1440 as in Paper.
 * Design source: Paper "Jofak" → Errors → 404.
 */
export interface NotFoundHeroProps extends Omit<ComponentProps<"section">, "title"> {
  eyebrow: string;
  /** Wrap the accent word in <em>. */
  title: ReactNode;
  description: { short: string; full: string };
  primaryAction: HeroLink;
  secondaryAction: HeroLink;
  quickLinks?: HeroLink[];
  quickLinksLabel?: string;
  searchAction?: string;
  linkAs?: LinkComponent;
}

const NUMERAL = "font-sans text-104 leading-26 font-medium tracking-numeral text-primary md:text-140 md:leading-35 xl:text-180 xl:leading-45 dark:text-text";

export function NotFoundHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  quickLinks = [],
  quickLinksLabel = "Or try:",
  searchAction,
  linkAs: Link = "a",
  className,
  ...props
}: NotFoundHeroProps) {
  return (
    <section
      data-slot="not-found-hero"
      aria-labelledby="not-found-title"
      className={cn(
        "flex flex-col items-center gap-5 px-5 pt-10 pb-9 text-center",
        "md:gap-6 md:px-10 md:pt-14 md:pb-12 xl:gap-7 xl:px-14 xl:pt-18 xl:pb-16",
        className,
      )}
      {...props}
    >
      <div aria-hidden className="flex items-center gap-1.5 md:gap-3">
        <span className={NUMERAL}>4</span>
        <Medallion ring="sage-100" core="accent" className="size-22 md:size-29.5 xl:size-37.5" coreClassName="size-15.5 md:size-20.5 xl:size-26">
          <svg viewBox="0 0 34 34" className="size-8 md:size-10.5 xl:size-13.5" focusable="false">
            <path
              d="M17 30C17 30 6 25 6 15C6 9 10 5 10 5C10 5 17 9 17 18C17 9 24 5 24 5C24 5 28 9 28 15C28 25 17 30 17 30Z"
              className="fill-evergreen-900"
            />
            <path d="M17 30V14" fill="none" strokeWidth="1.6" strokeLinecap="round" className="stroke-accent" />
          </svg>
        </Medallion>
        <span className={NUMERAL}>4</span>
      </div>

      <div className="flex flex-col items-center gap-2 md:gap-3">
        <Eyebrow size="sm">{eyebrow}</Eyebrow>
        <Heading as="h1" id="not-found-title" className="dark:[&_em]:text-text">
          {title}
        </Heading>
        <p className="max-w-80 font-sans text-sm leading-sm text-text-secondary md:max-w-120 md:text-base md:leading-base xl:max-w-135 xl:text-lg xl:leading-lg">
          <span className="md:hidden">{description.short}</span>
          <span className="hidden md:inline">{description.full}</span>
        </p>
      </div>

      <SearchBar action={searchAction} className="self-stretch md:w-130 md:self-auto xl:w-140" />

      <div className="flex flex-col gap-2.5 self-stretch md:flex-row md:gap-3 md:self-auto">
        <Button asChild size="md" className="w-full py-4 md:w-auto md:px-7">
          <Link href={primaryAction.href}>{primaryAction.label}</Link>
        </Button>
        <Button asChild size="md" variant="outline" className="w-full py-4 md:w-auto md:px-7">
          <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
        </Button>
      </div>

      {quickLinks.length > 0 && (
        <nav aria-label="Popular pages" className="flex flex-wrap items-center justify-center gap-2">
          <span className="hidden font-sans text-sm leading-xs text-text-muted md:inline">{quickLinksLabel}</span>
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full bg-sage-50 px-3.25 py-2 font-sans text-sm leading-xs font-medium text-text transition-colors hover:bg-sage-100 md:px-3.5"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
