import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Heading, Icon, Medallion, type IconName } from "../../atoms";
import { InfoCard } from "../../molecules";

export interface StatusNote {
  icon: IconName;
  title: string;
  text: ReactNode;
  /** Mobile shows notes as short lines in one card: "<title> <text>". */
  compactTitle: string;
  compactText: ReactNode;
}

/**
 * StatusHero (organism): the body of whole-page status screens (500, maintenance): a big
 * emblem, a label, the title and lede, then actions and/or `children` (status card, form),
 * then reassurance notes. Use it inside MinimalShell.
 * Design source: Paper "Jofak" → Errors → 500 and Maintenance.
 */
export interface StatusHeroProps extends Omit<ComponentProps<"section">, "title"> {
  emblem: { icon: IconName; tone: "sage" | "accent" };
  /** Caps label or a pill (e.g. "Scheduled maintenance · in progress"). */
  label: ReactNode;
  /** Wrap the accent word in <em>. */
  title: ReactNode;
  description: { short: string; full: string };
  actions?: ReactNode;
  notes?: StatusNote[];
  /** Text measure: "narrow" (500) or "wide" (maintenance) from Paper. */
  measure?: "narrow" | "wide";
}

export function StatusHero({
  emblem,
  label,
  title,
  description,
  actions,
  notes = [],
  measure = "narrow",
  className,
  children,
  ...props
}: StatusHeroProps) {
  const wide = measure === "wide";
  return (
    <section
      data-slot="status-hero"
      aria-labelledby="status-title"
      className={cn(
        "flex flex-1 flex-col items-center px-5 pb-6 text-center",
        wide ? "gap-4.5 pt-8" : "gap-5 pt-10",
        "md:justify-center md:gap-6 md:p-10 xl:gap-7 xl:px-14 xl:py-12",
        className,
      )}
      {...props}
    >
      {emblem.tone === "accent" ? (
        <Medallion core="accent" className="size-28 md:size-42" coreClassName="size-19.5 md:size-29.5">
          <Icon name={emblem.icon} size={58} className="size-10 md:size-14.5" />
        </Medallion>
      ) : (
        <Medallion className="size-32 md:size-42" coreClassName="size-22.5 md:size-29.5">
          <Icon name={emblem.icon} size={60} className="size-11.5 md:size-15" />
        </Medallion>
      )}

      <div className="flex flex-col items-center gap-2 md:gap-3">
        {label}
        <Heading as="h1" id="status-title" className="dark:[&_em]:text-text">
          {title}
        </Heading>
        <p
          className={cn(
            "font-sans text-sm leading-sm text-text-secondary md:text-base md:leading-base xl:text-lg xl:leading-lg",
            wide ? "max-w-82.5 md:max-w-125 xl:max-w-145" : "max-w-80 md:max-w-120 xl:max-w-140",
          )}
        >
          <span className="md:hidden">{description.short}</span>
          <span className="hidden md:inline">{description.full}</span>
        </p>
      </div>

      {actions && (
        <div className="flex flex-col gap-2.5 self-stretch md:flex-row md:gap-3 md:self-auto">{actions}</div>
      )}

      {children}

      {notes.length > 0 && (
        <>
          <div className="flex flex-col gap-2 self-stretch rounded-lg bg-surface-subtle p-4 text-left font-sans text-sm leading-sm text-text-secondary md:hidden [&_strong]:font-semibold [&_strong]:text-text">
            {notes.map((note) => (
              <p key={note.title}>
                <strong>{note.compactTitle}</strong> {note.compactText}
              </p>
            ))}
          </div>
          <div className={cn("hidden flex-col gap-3 md:flex xl:flex-row xl:gap-4", wide ? "pt-1" : "pt-2")}>
            {notes.map((note) => (
              <InfoCard
                key={note.title}
                icon={note.icon}
                title={note.title}
                className={cn("xl:w-85", wide ? "md:w-130" : "md:w-120")}
              >
                {note.text}
              </InfoCard>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
