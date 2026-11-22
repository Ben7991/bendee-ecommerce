"use client";

import { useCallback, useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

type Snapshot = Map<string, string>;

function snapshot(form: HTMLFormElement): Snapshot {
  const map: Snapshot = new Map();
  // A plain frame (`asForm={false}`) has nothing to count.
  if (!(form instanceof HTMLFormElement)) return map;
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
 * SettingsShell (organism): the frame of every settings page (Paper Jofak - Admin → Settings):
 * "Settings" with who can change it, whether everything is saved (or how many changes wait) with
 * Discard and Save, the section nav (`nav`, from 768px) and the page's cards in one form. Mobile
 * shows a back link to the settings menu, the page's own title and a bottom bar ("No changes to
 * save" / Discard + "Save 1 change"); `mobileBar` replaces it (e.g. "Add delivery zone").
 * `readOnly` pages (audit log) drop the save controls.
 */
export interface SettingsShellProps extends Omit<ComponentProps<"form">, "title"> {
  linkAs?: LinkComponent;
  /** Mobile title: "Store profile". */
  pageTitle: string;
  description?: ReactNode;
  /** "10:42" — when everything was last saved. */
  savedAt?: string;
  nav?: ReactNode;
  /** Omit for a page with no back link (My profile). */
  backHref?: string;
  /** The heading from 1280px (and on tablet unless `tabletTitle`). */
  title?: string;
  backLabel?: string;
  mobileBar?: ReactNode;
  readOnly?: boolean;
  /** Extra header controls for read-only pages (Export). */
  headerAction?: ReactNode;
  /** Tablet shows the page's own title too ("Staff & roles"), not "Settings". */
  tabletTitle?: boolean;
  /** The line under the title below 1280px, instead of the save status ("5 active · 1 invite pending"). */
  summary?: ReactNode;
  summaryTone?: "success" | "muted";
  /** A detail page (staff member, audit entry): below 1280px only the back link and the page's own content. */
  detail?: boolean;
  /** false: a plain frame, for pages with their own (GET) forms inside. */
  asForm?: boolean;
}

export function SettingsShell({
  linkAs: LinkAs = "a",
  pageTitle,
  description = "Owners and admins only · every change is recorded in the audit log",
  savedAt,
  nav,
  backHref,
  backLabel = "Settings",
  title = "Settings",
  mobileBar,
  readOnly = false,
  headerAction,
  tabletTitle = false,
  summary,
  summaryTone = "success",
  detail = false,
  asForm = true,
  className,
  children,
  onInput,
  ...props
}: SettingsShellProps) {
  const form = useRef<HTMLFormElement>(null);
  const initial = useRef<Snapshot>(new Map());
  const [version, setVersion] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (form.current) initial.current = snapshot(form.current);
  }, [version]);

  const recount = useCallback(() => {
    setTimeout(() => form.current && setCount(changed(initial.current, snapshot(form.current))), 0);
  }, []);
  const discard = () => {
    setCount(0);
    setVersion(version + 1);
  };

  const status =
    count > 0 ? (
      <span className="flex items-center gap-1.5 text-sm leading-4.5 font-medium text-text-secondary">
        <span aria-hidden className="size-2 rounded-full bg-warning" />
        {count} unsaved {count === 1 ? "change" : "changes"}
      </span>
    ) : savedAt ? (
      <span className="flex items-center gap-1.5 text-sm leading-4.5 font-medium text-text-secondary">
        <span aria-hidden className="size-2 rounded-full bg-success" />
        All changes saved · {savedAt}
      </span>
    ) : null;
  const Frame = (asForm ? "form" : "div") as "form";
  const saveLabel = count > 0 ? `Save ${count} ${count === 1 ? "change" : "changes"}` : "No changes to save";

  return (
    <Frame
      ref={form}
      data-slot="settings-shell"
      onInput={(event) => {
        recount();
        onInput?.(event);
      }}
      onChange={recount}
      onClick={recount}
      className={cn("flex flex-col gap-4 pb-24 font-sans md:gap-5 md:pb-0 xl:gap-6", readOnly && !mobileBar && "pb-0", className)}
      {...props}
    >
      <header className={cn("flex items-end justify-between gap-5", detail && "max-xl:items-start")}>
        <div className="flex min-w-0 flex-col gap-1.5">
          {backHref && (
            <LinkAs href={backHref} className={cn("flex w-fit items-center gap-1 text-sm leading-4.5 font-semibold text-brand", detail ? "xl:hidden" : "md:hidden")}>
              <Icon name="chevronLeft" size={14} strokeWidth={1.8} />
              {backLabel}
            </LinkAs>
          )}
          <h1 className={cn("text-28 leading-3xl font-semibold tracking-tight text-text md:text-3xl md:leading-9.5 xl:block xl:text-36 xl:leading-10.5", detail && "hidden")}>
            <span className={tabletTitle ? "xl:hidden" : "md:hidden"}>{pageTitle}</span>
            <span className={tabletTitle ? "hidden xl:inline" : "hidden md:inline"}>{title}</span>
          </h1>
          <p className="hidden text-base leading-5.5 text-text-muted xl:block">{description}</p>
          {summary ? (
            <p className={cn("flex items-center gap-1.5 text-sm leading-4.5 font-medium text-text-secondary md:font-regular md:text-text-muted xl:hidden", detail && "hidden")}>
              <span aria-hidden className={cn("size-2 rounded-full md:hidden", summaryTone === "success" ? "bg-success" : "bg-text-muted")} />
              {summary}
            </p>
          ) : (
            !readOnly && <div className={cn("xl:hidden", detail && "hidden")}>{status}</div>
          )}
        </div>
        <div className={cn("hidden shrink-0 items-center gap-2.5", detail ? "xl:flex" : "md:flex")}>
          {!readOnly && <div className="hidden pr-1.5 xl:block">{status}</div>}
          {headerAction}
          {!readOnly && count > 0 && (
            <button type="button" onClick={discard} className="hidden h-11 items-center rounded-full border border-border px-4.5 text-14 leading-4.5 font-semibold text-text hover:bg-surface-subtle xl:flex">
              Discard
            </button>
          )}
          {!readOnly && (
            <button
              type="submit"
              disabled={count === 0}
              className="flex h-10.5 items-center rounded-full bg-primary px-5 text-14 leading-4.5 font-semibold text-on-primary hover:bg-primary-hover disabled:bg-surface-subtle disabled:text-text-muted xl:h-11"
            >
              Save changes
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-4 md:gap-5 xl:flex-row xl:items-start xl:gap-5">
        {nav && <div className={cn("hidden xl:w-58 xl:shrink-0", detail ? "xl:block" : "md:block")}>{nav}</div>}
        <div key={version} className="flex min-w-0 flex-1 flex-col gap-3.5 md:gap-4">
          {children}
        </div>
      </div>

      {(mobileBar || !readOnly) && (
        <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-border-subtle bg-bg px-4 pt-3 pb-7 md:hidden dark:bg-surface">
          {mobileBar ?? (
            <>
              {count > 0 && (
                <button type="button" onClick={discard} className="flex h-12 items-center rounded-full border border-border px-5 text-base leading-5 font-semibold text-text">
                  Discard
                </button>
              )}
              <button
                type="submit"
                disabled={count === 0}
                className="flex h-12 flex-1 items-center justify-center rounded-full bg-primary text-base leading-5 font-semibold text-on-primary disabled:bg-surface-subtle disabled:text-text-muted"
              >
                {saveLabel}
              </button>
            </>
          )}
        </div>
      )}
    </Frame>
  );
}
