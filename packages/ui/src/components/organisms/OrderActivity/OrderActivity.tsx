"use client";

import { useId, useState, type ComponentProps } from "react";

import { cn } from "../../../lib";
import { Initials, Switch } from "../../atoms";

export interface ActivityEvent {
  id: string;
  /** Bold lead: "Processing started", "Abena Mensah". */
  title: string;
  /** The rest of the line: "by Abena Mensah", "· COD over GHS 500", "added a note". */
  detail?: string;
  /** Mobile: a shorter detail ("by Abena"). */
  compactDetail?: string;
  time: string;
  /** A staff note: shown in a bubble with the author's initials. */
  note?: string;
  /** Mobile: a shorter note. */
  compactNote?: string;
  author?: string;
  tone?: "brand" | "warning" | "error" | "muted";
}

const DOT = { brand: "bg-brand", warning: "bg-warning", error: "bg-error", muted: "bg-evergreen-300" } as const;

/**
 * OrderActivity (organism): staff notes and the order's event history, newest first (Paper
 * Jofak - Admin → Order detail → Activity). The composer posts `note` and `visible` (Show to
 * customer) to `action`. On mobile the composer opens from "Add note" and the history shows the
 * latest two entries until "Show all".
 */
export interface OrderActivityProps extends Omit<ComponentProps<"section">, "children"> {
  events: ActivityEvent[];
  /** Server action or URL for new notes. */
  action?: string | ((formData: FormData) => void | Promise<void>);
  /** Hidden fields sent with a note (e.g. the order number). */
  fields?: Record<string, string>;
}

export function OrderActivity({ events, action, fields = {}, className, ...props }: OrderActivityProps) {
  const titleId = useId();
  const noteId = useId();
  const [composing, setComposing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState("");
  const shown = expanded ? events : events.slice(0, 2);

  return (
    <section
      data-slot="order-activity"
      aria-labelledby={titleId}
      className={cn("flex flex-col gap-3 rounded-lg border border-border-subtle p-4 font-sans md:gap-4.5 md:px-6 md:pt-5 md:pb-6", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h2 id={titleId} className="text-md leading-5.5 font-semibold text-text md:text-lg md:leading-base md:tracking-compact">
          Activity
        </h2>
        <button
          type="button"
          onClick={() => setComposing(!composing)}
          aria-expanded={composing}
          aria-controls={noteId}
          className="text-sm leading-xs font-semibold text-brand md:hidden"
        >
          {composing ? "Close" : "Add note"}
        </button>
      </div>

      <form
        id={noteId}
        action={action}
        onSubmit={() => setDraft("")}
        className={cn("flex-col gap-2.5 rounded-md border border-border px-4 py-3.5 focus-within:border-brand md:flex", composing ? "flex" : "hidden")}
      >
        {Object.entries(fields).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
        <label htmlFor={`${noteId}-text`} className="sr-only">
          Note for the team
        </label>
        <textarea
          id={`${noteId}-text`}
          name="note"
          rows={1}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add a note for the team…"
          className="field-sizing-content min-h-5 resize-none bg-transparent text-14 leading-sm text-text outline-none placeholder:text-text-muted"
        />
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <Switch id={`${noteId}-visible`} name="visible" size="sm" />
            <label htmlFor={`${noteId}-visible`} className="text-sm leading-sm text-text-secondary">
              Show to customer
            </label>
          </span>
          <button
            type="submit"
            disabled={!draft.trim()}
            className="flex h-8.5 items-center rounded-full bg-primary px-4 text-sm leading-xs font-semibold text-text-inverse transition-colors hover:bg-primary-hover disabled:bg-surface disabled:text-text-muted"
          >
            Add note
          </button>
        </div>
      </form>

      {/* Tablet and desktop: the full timeline. */}
      <ol className="hidden flex-col md:flex">
        {events.map((event, index) => {
          const last = index === events.length - 1;
          return (
            <li key={event.id} className="flex gap-3.5">
              <span aria-hidden className="flex w-7 shrink-0 flex-col items-center">
                {event.note ? (
                  <Initials name={event.author ?? event.title} size="activity" />
                ) : (
                  <span className={cn("mt-1.25 size-2.5 shrink-0 rounded-full", DOT[event.tone ?? "muted"])} />
                )}
                {!last && <span className="my-1 w-0.5 flex-1 bg-border-subtle" />}
              </span>
              <div className={cn("flex min-w-0 flex-1 flex-col gap-1.5", !last && "pb-4.5")}>
                <p className="flex justify-between gap-3 text-sm leading-sm">
                  <span className="text-text">
                    <strong className="font-semibold">{event.title}</strong>
                    {event.detail && ` ${event.detail}`}
                  </span>
                  <time className="shrink-0 text-text-muted">{event.time}</time>
                </p>
                {event.note && <p className="rounded-sm bg-surface-subtle px-3.5 py-2.5 text-14 leading-sm text-text">{event.note}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Mobile: the latest entries. */}
      <ol className="flex flex-col gap-3 md:hidden">
        {shown.map((event) =>
          event.note ? (
            <li key={event.id} className="flex flex-col gap-1 rounded-sm bg-surface-subtle px-3 py-2.5">
              <p className="flex justify-between text-xs leading-xs">
                <span className="font-semibold text-text">{event.author ?? event.title}</span>
                <time className="text-text-muted">{event.time}</time>
              </p>
              <p className="text-sm leading-4.5 text-text">{event.compactNote ?? event.note}</p>
            </li>
          ) : (
            <li key={event.id} className="flex justify-between gap-3 text-sm leading-4.5">
              <span className="text-text">
                <strong className="font-semibold">{event.title}</strong>
                {(event.compactDetail ?? event.detail) && ` ${event.compactDetail ?? event.detail}`}
              </span>
              <time className="shrink-0 text-text-muted">{event.time}</time>
            </li>
          ),
        )}
      </ol>
      {events.length > 2 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="self-start text-sm leading-4.5 font-semibold text-text-secondary md:hidden"
        >
          {expanded ? "Show fewer" : `Show all ${events.length} events`}
        </button>
      )}
    </section>
  );
}
