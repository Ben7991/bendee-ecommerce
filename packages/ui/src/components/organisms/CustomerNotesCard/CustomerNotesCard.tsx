"use client";

import { useEffect, useId, useRef, useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, Initials, type IconName } from "../../atoms";

export interface CustomerActivityEvent {
  id: string;
  /** A staff note, or something that happened to the customer. */
  kind: "note" | "tag" | "refund" | "order";
  /** Notes: who wrote it ("Abena M."). */
  author?: string;
  /** "6 Nov". */
  time: string;
  /** The note, or the event line; bold the key part with `<strong className="font-semibold text-text">`. */
  body: ReactNode;
  /** A shorter line: events on tablet, the note on mobile. */
  compactBody?: ReactNode;
  /** Only from 1440px (tablet keeps the list short). */
  wideOnly?: boolean;
}

const ICON: Record<Exclude<CustomerActivityEvent["kind"], "note">, { icon: IconName; className: string }> = {
  tag: { icon: "starOutline", className: "bg-accent text-on-accent" },
  refund: { icon: "undo", className: "bg-tint-citrus text-error" },
  order: { icon: "box", className: "bg-sage-100 text-brand" },
};

/**
 * CustomerNotesCard (organism): staff notes and what happened to a customer, newest first
 * (Paper Jofak - Admin → Customer detail → Notes & activity). The composer posts `note` (plus
 * `fields`) to `action`. Tablet drops the bubbles and icons; mobile shows only the latest note,
 * and the composer when the card is the URL target (link Add note to `#<id>`).
 */
export interface CustomerNotesCardProps extends Omit<ComponentProps<"section">, "children"> {
  events: CustomerActivityEvent[];
  action?: string | ((formData: FormData) => void | Promise<void>);
  fields?: Record<string, string>;
  /** "Only staff can see this". */
  meta?: string;
  /** Tablet: "Staff only". */
  compactMeta?: string;
}

export function CustomerNotesCard({
  events,
  action,
  fields = {},
  meta = "Only staff can see this",
  compactMeta = "Staff only",
  id,
  className,
  ...props
}: CustomerNotesCardProps) {
  const titleId = useId();
  const inputId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState("");

  // Add note links here (#id): focus the composer when the card becomes the target.
  useEffect(() => {
    if (!id) return;
    const focus = () => {
      if (window.location.hash === `#${id}`) input.current?.focus({ preventScroll: true });
    };
    window.addEventListener("hashchange", focus);
    return () => window.removeEventListener("hashchange", focus);
  }, [id]);
  const latestNote = events.find((event) => event.kind === "note");

  return (
    <section
      data-slot="customer-notes-card"
      id={id}
      aria-labelledby={titleId}
      className={cn("group flex scroll-mt-24 flex-col gap-3 font-sans md:gap-0 md:overflow-clip md:rounded-18 md:border md:border-border-subtle xl:rounded-lg", className)}
      {...props}
    >
      <div className="hidden items-center justify-between group-target:flex md:flex md:px-4.5 md:py-3.5 xl:px-5 xl:py-4">
        <h2 id={titleId} className="text-base leading-4.5 font-semibold text-text xl:text-md xl:leading-5">
          Notes &amp; activity
        </h2>
        <p className="text-xs leading-xs text-text-muted">
          <span className="xl:hidden">{compactMeta}</span>
          <span className="hidden xl:inline">{meta}</span>
        </p>
      </div>

      <form action={action} onSubmit={() => setDraft("")} className="hidden group-target:block md:block md:px-4.5 md:pb-3.5 xl:px-5 xl:pb-4">
        {Object.entries(fields).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
        <span className="flex h-11 items-center gap-2.5 rounded-sm border border-border pr-1.5 pl-3.5 focus-within:border-brand xl:h-11.5 xl:rounded-14">
          <label htmlFor={inputId} className="sr-only">
            Note for the team
          </label>
          <input
            ref={input}
            id={inputId}
            name="note"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Add a note for the team…"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-14 leading-4.5 text-text outline-none placeholder:text-text-muted"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className={cn(
              "h-8.5 shrink-0 items-center rounded-full px-3.5 text-sm leading-4 font-semibold transition-colors",
              draft.trim() ? "flex bg-primary text-on-primary hover:bg-primary-hover" : "hidden bg-surface text-text-muted xl:flex",
            )}
          >
            Save
          </button>
        </span>
      </form>

      {/* Mobile: the latest note only. */}
      {latestNote && (
        <div className="flex flex-col gap-1.5 rounded-md bg-surface-subtle px-3.5 py-3 md:hidden">
          <p className="text-xs leading-xs text-text-muted">
            <span className="font-semibold text-text">{latestNote.author}</span> · note · {latestNote.time}
          </p>
          <p className="text-14 leading-5 text-text">{latestNote.compactBody ?? latestNote.body}</p>
        </div>
      )}

      <ul className="hidden md:block">
        {events.map((event) => {
          if (event.kind === "note") {
            return (
              <li key={event.id} className={cn("gap-3 border-t border-border-subtle px-4.5 py-3 xl:px-5 xl:py-3.5", event.wideOnly ? "hidden xl:flex" : "flex")}>
                <Initials name={event.author ?? "Staff"} size="note" tone="sage" />
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="text-xs leading-xs text-text-muted xl:text-sm xl:leading-4.5">
                    <span className="font-semibold text-text">{event.author}</span>
                    <span className="hidden xl:inline"> added a note</span> · {event.time}
                  </p>
                  <p className="text-14 leading-5 text-text xl:w-fit xl:rounded-sm xl:bg-surface-subtle xl:px-3 xl:py-2.5">{event.body}</p>
                </div>
              </li>
            );
          }
          const icon = ICON[event.kind];
          return (
            <li
              key={event.id}
              className={cn("items-center gap-3 border-t border-border-subtle px-4.5 py-3 xl:px-5 xl:py-3.5", event.wideOnly ? "hidden xl:flex" : "flex")}
            >
              <span aria-hidden className={cn("hidden size-7.5 shrink-0 items-center justify-center rounded-full xl:flex", icon.className)}>
                <Icon name={icon.icon} size={14} />
              </span>
              <p className="text-sm leading-4.5 text-text-muted">
                {event.compactBody ? (
                  <>
                    <span className="xl:hidden">{event.compactBody}</span>
                    <span className="hidden xl:inline">{event.body}</span>
                  </>
                ) : (
                  event.body
                )}{" "}
                · {event.time}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
