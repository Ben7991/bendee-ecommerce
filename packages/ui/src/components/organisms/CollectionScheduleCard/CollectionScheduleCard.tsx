import { useId, type ComponentProps } from "react";

import { cn } from "../../../lib";

/**
 * CollectionScheduleCard (organism): when a collection runs (Paper Jofak - Admin → Collection
 * editor → Schedule): start and end date-times (leave End empty to run on) and what happens after
 * it ends. Posts `startsAt` and `endsAt` (datetime-local). On mobile it opens when it is the URL
 * target (the "Schedule" row).
 */
export interface CollectionScheduleCardProps extends Omit<ComponentProps<"section">, "children" | "defaultValue"> {
  /** "2026-11-01T00:00". */
  defaultValue: { startsAt: string; endsAt?: string };
  note?: string;
}

const field =
  "h-11 w-full rounded-sm border border-border bg-bg px-3 text-14 leading-4.5 font-medium text-text outline-none focus:border-primary dark:bg-surface dark:focus:border-brand";

export function CollectionScheduleCard({
  defaultValue,
  note = "After it ends the page stays up with a “See current offers” button that leads to the hub.",
  className,
  ...props
}: CollectionScheduleCardProps) {
  const id = useId();
  return (
    <section
      data-slot="collection-schedule-card"
      aria-labelledby={`${id}-title`}
      className={cn("hidden scroll-mt-24 flex-col gap-3 rounded-lg border border-border-subtle p-5 font-sans target:flex md:flex", className)}
      {...props}
    >
      <h2 id={`${id}-title`} className="text-xs leading-xs font-semibold tracking-label text-text-muted uppercase">
        Schedule
      </h2>
      <span className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-starts`} className="text-sm leading-4.5 font-semibold text-text-secondary">
          Starts
        </label>
        <input id={`${id}-starts`} type="datetime-local" name="startsAt" defaultValue={defaultValue.startsAt} className={field} />
      </span>
      <span className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-ends`} className="text-sm leading-4.5 font-semibold text-text-secondary">
          Ends
        </label>
        <input id={`${id}-ends`} type="datetime-local" name="endsAt" defaultValue={defaultValue.endsAt} className={field} />
      </span>
      {note && <p className="text-xs leading-4.25 text-text-muted">{note}</p>}
    </section>
  );
}
