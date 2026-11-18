import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Avatar, Icon, IconButton } from "../../atoms";

function ScoreRing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 34" aria-hidden focusable="false" className={cn("shrink-0", className)}>
      <circle cx="17" cy="17" r="13" fill="none" strokeWidth="4" className="stroke-white/15" />
      <path d="M17 4A13 13 0 1 1 5.6 23.3" fill="none" strokeWidth="4" strokeLinecap="round" className="stroke-accent" />
    </svg>
  );
}

function Chip({ short, full, className }: { short: string; full: string; className: string }) {
  return (
    <p
      className={cn(
        "absolute flex items-center gap-1.5 rounded-full bg-bg py-2 pr-3 pl-2.5 font-sans text-11 leading-3.5 font-medium whitespace-nowrap text-text shadow-chip",
        "md:gap-2 md:py-2.5 md:pr-4 md:pl-3 md:text-sm md:leading-xs",
        className,
      )}
    >
      <Icon name="check" size={16} className="size-3 text-brand md:size-4" />
      <span className="md:hidden">{short}</span>
      <span className="hidden md:inline">{full}</span>
    </p>
  );
}

export interface ShowcaseProduct {
  name: string;
  price: string;
  /** Packshot (next/image with `fill`, or <img>). */
  image?: ReactNode;
  /** Add-to-bag button props; omitted renders a decorative button. */
  addLabel?: string;
}

/**
 * HeroShowcase (organism): the hero photo with floating proof cards (wellness score, community,
 * benefit chips, product). Mobile 350×380 keeps the photo, score and chips; tablet and desktop
 * use the full 640px composition.
 */
export interface HeroShowcaseProps extends ComponentProps<"div"> {
  /** The lifestyle photo (next/image with `fill` + object-cover). */
  photo?: ReactNode;
  score?: number;
  scoreDelta?: string;
  communityLabel?: string;
  communityCount?: string;
  chips?: { short: string; full: string }[];
  product?: ShowcaseProduct;
}

export function HeroShowcase({
  photo,
  score = 82,
  scoreDelta = "+12 this month",
  communityLabel = "Join 50k+ people building better habits",
  communityCount = "+50k",
  chips = [
    { short: "Clinically dosed", full: "Clinically-dosed formula" },
    { short: "Save 20%", full: "Subscribe & save 20%" },
  ],
  product,
  className,
  ...props
}: HeroShowcaseProps) {
  const [firstChip, secondChip] = chips;
  return (
    <div
      data-slot="hero-showcase"
      className={cn("relative h-95 w-87.5 shrink-0 md:h-140 md:w-160 xl:h-155", className)}
      {...props}
    >
      <div className="absolute top-6 left-21.25 h-85 w-57.5 overflow-hidden rounded-xl bg-sage-100 md:top-0 md:left-37.5 md:h-135 md:w-85 md:rounded-2xl">
        {photo}
      </div>

      <div className="absolute top-47.5 left-10 hidden w-42.5 flex-col gap-3 rounded-18 bg-bg p-3.5 shadow-card md:flex">
        <p className="font-sans text-sm leading-4.25 font-semibold text-text">{communityLabel}</p>
        <div className="flex items-center gap-2 rounded-sm bg-surface p-1.5">
          <span className="flex">
            <Avatar size="sm" tone="medium" />
            <Avatar size="sm" tone="dark" className="-ml-2" />
            <Avatar size="sm" tone="pale" className="-ml-2" />
          </span>
          <span className="font-sans text-xs leading-xs font-semibold text-brand">{communityCount}</span>
        </div>
      </div>

      <div className="absolute top-50 left-0 flex w-37.5 flex-col gap-3 rounded-18 bg-primary p-3.5 shadow-brand md:top-87.5 md:left-5 md:w-60 md:gap-5.5 md:rounded-22 md:p-5">
        <div className="flex items-start justify-between">
          <p className="w-20 font-sans text-xs leading-3.75 font-semibold text-text-inverse md:w-auto md:text-base md:leading-4.75">
            Your Wellness Score
          </p>
          <ScoreRing className="size-6 md:size-8.5" />
        </div>
        <p className="flex items-baseline gap-0.75 font-sans font-medium md:gap-1">
          <span className="text-3xl leading-8 tracking-tight text-text-inverse md:text-4xl md:leading-11">{score}</span>
          <span className="text-sm leading-xs text-evergreen-300 md:text-md md:leading-sm dark:text-text-inverse-muted">/100</span>
          <span className="hidden pl-2 text-xs leading-xs font-semibold text-accent md:inline">{scoreDelta}</span>
        </p>
      </div>

      {firstChip && <Chip {...firstChip} className="top-62.5 left-55 md:top-62.5 md:left-105" />}
      {secondChip && <Chip {...secondChip} className="top-72.5 left-59 md:top-75.5 md:left-112.5" />}

      {product && (
        <div className="absolute top-107.5 left-105 hidden w-55 items-center gap-3 rounded-lg bg-bg p-2.5 shadow-card md:flex">
          <div className="relative flex h-16 w-14 shrink-0 items-center justify-center overflow-hidden rounded-14 bg-sage-100">
            <div className="relative h-13.5 w-11">{product.image}</div>
          </div>
          <div className="flex min-w-0 grow flex-col gap-1 font-sans">
            <p className="text-14 leading-4.5 font-semibold text-text">{product.name}</p>
            <p className="text-sm leading-xs font-medium text-text-muted">{product.price}</p>
          </div>
          <IconButton variant="solid" size="xs" label={product.addLabel ?? `Add ${product.name} to bag`}>
            <Icon name="plus" size={14} strokeWidth={3} />
          </IconButton>
        </div>
      )}
    </div>
  );
}
