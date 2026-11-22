import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Button, Heading, Icon, Medallion, type IconName } from "../../atoms";

interface EmptyStateAction {
  label: string;
  href: string;
}

/**
 * EmptyState (organism): an emblem, a title, a line of help and two ways forward, for empty or
 * dead-end pages (empty cart, expired cart link).
 *   page:  full-width section, steps across 390 / 768 / 1440
 *   panel: narrow version for drawers (empty mini-cart)
 */
export interface EmptyStateProps extends Omit<ComponentProps<"section">, "title"> {
  icon: IconName;
  /** Wrap the accent word in <em>. */
  title: ReactNode;
  description: ReactNode;
  primaryAction: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  /** Small line under the buttons; put links in it as TextLinks. */
  note?: ReactNode;
  /** Puts the note in a soft box with this icon (favourites: "Not signed in?…"). */
  noteIcon?: IconName;
  size?: "page" | "panel";
  linkAs?: LinkComponent;
}

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  note,
  noteIcon,
  size = "page",
  linkAs: Link = "a",
  className,
  ...props
}: EmptyStateProps) {
  const panel = size === "panel";
  return (
    <section
      data-slot="empty-state"
      aria-labelledby="empty-state-title"
      className={cn(
        "flex flex-col items-center text-center",
        panel ? "gap-4 pt-8" : "gap-5 px-5 pt-12 pb-10 md:gap-6 md:px-10 md:pt-16 xl:px-14 xl:pt-18 xl:pb-14",
        className,
      )}
      {...props}
    >
      {panel ? (
        <Medallion className="size-28" coreClassName="size-19.5">
          <Icon name={icon} size={38} />
        </Medallion>
      ) : (
        <Medallion className="size-30 md:size-36 xl:size-40" coreClassName="size-21 md:size-25 xl:size-28">
          <Icon name={icon} size={56} className="size-10.5 md:size-12.5 xl:size-14" />
        </Medallion>
      )}

      <div className={cn("flex flex-col items-center", panel ? "gap-1.5" : "gap-2 md:gap-3")}>
        <Heading
          as={panel ? "h2" : "h1"}
          id="empty-state-title"
          size={panel ? "dialog" : "section"}
          className={panel ? "text-2xl leading-2xl" : undefined}
        >
          {title}
        </Heading>
        <p
          className={cn(
            "font-sans text-text-secondary",
            panel
              ? "max-w-80 text-sm leading-sm"
              : "max-w-75 text-sm leading-sm md:max-w-115 md:text-base md:leading-base xl:max-w-130 xl:text-lg xl:leading-lg",
          )}
        >
          {description}
        </p>
      </div>

      <div className={cn("flex flex-col self-stretch", panel ? "gap-2.5 pt-1" : "gap-3 pt-1 md:flex-row md:self-auto md:pt-2")}>
        <Button asChild size="md" className={cn("w-full px-6", panel ? "h-12" : "py-4 md:w-auto md:px-7")}>
          <Link href={primaryAction.href}>
            {primaryAction.label}
            <Icon name="arrowRight" size={16} />
          </Link>
        </Button>
        {secondaryAction && (
          <Button asChild size="md" variant="outline" className={cn("w-full px-6", panel ? "h-12" : "py-4 md:w-auto md:px-7")}>
            <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
          </Button>
        )}
      </div>

      {note &&
        (noteIcon ? (
          <p className="flex items-start gap-2.5 rounded-md bg-surface-subtle px-4 py-3.5 text-left font-sans text-sm leading-sm text-text-secondary md:items-center md:rounded-full md:px-4.5 md:py-3">
            <Icon name={noteIcon} size={16} className="mt-0.5 shrink-0 md:mt-0" />
            <span>{note}</span>
          </p>
        ) : (
          <p className={cn("font-sans text-xs leading-xs text-text-muted", !panel && "md:text-sm md:leading-sm")}>{note}</p>
        ))}
    </section>
  );
}
