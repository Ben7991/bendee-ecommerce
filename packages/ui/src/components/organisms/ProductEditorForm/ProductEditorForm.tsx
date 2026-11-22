"use client";

import { useCallback, useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";

type Snapshot = Map<string, string>;

/** Field name → its values (files by name), for comparing the form with how it loaded. */
function snapshot(form: HTMLFormElement): Snapshot {
  const map: Snapshot = new Map();
  for (const [key, value] of new FormData(form)) {
    const text = typeof value === "string" ? value : value.size ? `file:${value.name}:${value.size}` : "";
    map.set(key, `${map.get(key) ?? ""}|${text}`);
  }
  return map;
}

function changed(before: Snapshot, after: Snapshot): number {
  const keys = new Set([...before.keys(), ...after.keys()]);
  return [...keys].filter((key) => (before.get(key) ?? "") !== (after.get(key) ?? "")).length;
}

/**
 * ProductEditorForm (organism): one form around a whole admin editor (Paper Jofak - Admin →
 * Product editor). It counts changed fields; while there are any, the dark "Unsaved changes" bar
 * shows under the top bar (from 768px) or at the bottom (mobile) with Discard and Save. Discard
 * puts every field back by remounting the children. `variant="light"` (collection editor) keeps a
 * light bar at the bottom below 1440px at all times ("Unsaved: …" on tablet); from 1440px the
 * page header's Save button submits the form instead. `secondaryAction` replaces the light bar's
 * Discard (the discount editor's Pause: a submit button with its own `name`/`value`).
 */
export interface ProductEditorFormProps extends Omit<ComponentProps<"form">, "children"> {
  children: ReactNode;
  /** What changed, from the app, e.g. "Citrus price and 1 new image". Defaults to a field count. */
  summary?: string;
  variant?: "dark" | "light";
  /** Light bar: shown instead of Discard. */
  secondaryAction?: ReactNode;
}

export function ProductEditorForm({ children, summary, variant = "dark", secondaryAction, className, onInput, ...props }: ProductEditorFormProps) {
  const form = useRef<HTMLFormElement>(null);
  const initial = useRef<Snapshot>(new Map());
  const [version, setVersion] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (form.current) initial.current = snapshot(form.current);
  }, [version]);

  const recount = useCallback(() => {
    // Radix controls update their hidden inputs after the event; read on the next tick.
    setTimeout(() => form.current && setCount(changed(initial.current, snapshot(form.current))), 0);
  }, []);

  const label = `${count} unsaved ${count === 1 ? "change" : "changes"}`;
  const discard = () => {
    setCount(0);
    setVersion(version + 1);
  };

  return (
    <form
      ref={form}
      data-slot="product-editor-form"
      onInput={(event) => {
        recount();
        onInput?.(event);
      }}
      onChange={recount}
      onClick={recount}
      className={cn("flex flex-col gap-5 md:gap-6", variant === "light" && "pb-24 md:pb-0", className)}
      {...props}
    >
      {variant === "dark" && count > 0 && (
        <div
          role="status"
          className={cn(
            "z-30 flex items-center gap-3 bg-text font-sans dark:bg-primary",
            "fixed inset-x-0 bottom-0 px-4 pt-3 pb-6",
            "md:sticky md:top-17 md:bottom-auto md:-mx-6 md:-mt-7 md:px-6 md:py-3 xl:-mx-10 xl:-mt-9 xl:px-10",
          )}
        >
          <span aria-hidden className="hidden size-2 shrink-0 rounded-full bg-accent md:block" />
          <p className="flex-1 text-14 leading-sm font-semibold text-text-inverse">
            <span className="md:hidden">{label}</span>
            <span className="hidden md:inline">
              Unsaved changes{" "}
              <span className="font-regular text-text-inverse-muted">
                · {summary ?? `${count} ${count === 1 ? "field" : "fields"} changed`}
              </span>
            </span>
          </p>
          <button
            type="button"
            onClick={discard}
            className="flex h-10 shrink-0 items-center rounded-full bg-white/12 px-4 text-sm leading-xs font-semibold text-text-inverse hover:bg-white/20 md:h-9"
          >
            Discard
          </button>
          <button type="submit" className="flex h-10 shrink-0 items-center rounded-full bg-accent px-4.5 text-sm leading-xs font-semibold text-on-accent hover:bg-sage-200 md:h-9">
            <span className="md:hidden">Save</span>
            <span className="hidden md:inline">Save changes</span>
          </button>
        </div>
      )}
      <div key={version} className="contents">
        {children}
      </div>
      {variant === "light" && (
        <div
          role="status"
          className={cn(
            "z-30 flex items-center gap-2.5 border-t border-border-subtle bg-bg font-sans xl:hidden dark:bg-surface",
            "fixed inset-x-0 bottom-0 px-4 pt-3 pb-6",
            "md:sticky md:-mx-6 md:-mb-7 md:gap-3 md:px-6 md:py-3.5",
          )}
        >
          <p className="hidden flex-1 truncate text-sm leading-4.5 text-text-muted md:block">
            {count > 0 ? `Unsaved: ${summary ?? `${count} ${count === 1 ? "field" : "fields"} changed`}` : "All changes saved"}
          </p>
          {secondaryAction ?? (
            <button
              type="button"
              onClick={discard}
              disabled={count === 0}
              className="flex h-12 shrink-0 items-center rounded-full border border-border bg-bg px-5 text-base leading-5 font-semibold text-text hover:bg-surface-subtle disabled:opacity-muted md:h-11 md:text-14 dark:bg-surface"
            >
              Discard
            </button>
          )}
          <button
            type="submit"
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-primary px-5 text-base leading-5 font-semibold text-on-primary hover:bg-primary-hover md:h-11 md:flex-none md:text-14"
          >
            Save changes
          </button>
        </div>
      )}
    </form>
  );
}
