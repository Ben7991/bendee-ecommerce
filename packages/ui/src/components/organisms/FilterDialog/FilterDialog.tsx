"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Button, Icon, IconButton } from "../../atoms";

/**
 * FilterDialog (organism): the "Filters (2)" button and the filters it opens, on Radix Dialog.
 *   mobile: bottom sheet (Paper "PLP — Mobile Filters Sheet")
 *   tablet: right drawer with a summary line and an optional Sort by block (Paper "PLP — Tablet
 *           Filters Drawer")
 * Desktop shows the filters as a sidebar, so hide the trigger there (`className="xl:hidden"`).
 * Put a FilterPanel (without its title) in `children`.
 */
export interface FilterDialogProps extends Omit<ComponentProps<"button">, "title"> {
  /** Applied filters, shown in the lime badge on the button. */
  appliedCount?: number;
  /** "2 applied · 41 results" under the title (tablet). */
  summary?: ReactNode;
  /** "Sort by" block above the facets (tablet; mobile has its own sort control). */
  sort?: ReactNode;
  /** "Show 41 results". */
  submitLabel: string;
  onClear?: () => void;
  onSubmit?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function FilterDialog({
  appliedCount = 0,
  summary,
  sort,
  submitLabel,
  onClear,
  onSubmit,
  open: openProp,
  onOpenChange,
  className,
  children,
  ...props
}: FilterDialogProps) {
  const [inner, setInner] = useState(false);
  const open = openProp ?? inner;
  const setOpen = (next: boolean) => {
    if (openProp === undefined) setInner(next);
    onOpenChange?.(next);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          size="md"
          aria-label={appliedCount ? `Filters, ${appliedCount} applied` : "Filters"}
          className={cn("w-full gap-2 p-3 md:w-auto md:py-2.5 md:pr-2.5 md:pl-4", className)}
          {...props}
        >
          <Icon name="sliders" size={16} />
          Filters
          {appliedCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-accent text-11 leading-3.5 font-bold text-on-accent md:size-5.5 md:text-xs md:leading-xs">
              {appliedCount}
            </span>
          )}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          data-slot="filter-dialog-overlay"
          className="fixed inset-0 z-50 bg-evergreen-950/55 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/65"
        />
        <Dialog.Content
          data-slot="filter-dialog"
          aria-describedby={undefined}
          className={cn(
            "fixed inset-x-0 top-31 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-2xl bg-bg font-sans text-text shadow-panel-up outline-none dark:bg-surface",
            "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
            "md:inset-y-0 md:right-0 md:left-auto md:w-100 md:rounded-l-2xl md:rounded-tr-none md:shadow-panel-left",
            "md:data-[state=closed]:animate-panel-out md:data-[state=open]:animate-panel-in",
          )}
        >
          <span aria-hidden className="absolute top-2.5 left-1/2 h-1.25 w-10 -translate-x-1/2 rounded-full bg-border md:hidden" />

          <div className="flex shrink-0 items-center justify-between border-b border-border-subtle px-5 pt-7.75 pb-4 md:px-8 md:pt-6 md:pb-5">
            <div className="flex flex-col gap-0.5">
              <Dialog.Title className="text-xl leading-base font-semibold md:text-2xl md:leading-8 md:font-medium md:tracking-snug">
                Filters
              </Dialog.Title>
              {summary && <p className="hidden text-sm leading-xs text-text-muted md:block">{summary}</p>}
            </div>
            <Dialog.Close asChild>
              <IconButton label="Close filters" variant="plain" className="size-9 bg-surface hover:bg-sage-100 md:size-10">
                <Icon name="close" size={16} strokeWidth={2.4} />
              </IconButton>
            </Dialog.Close>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            {sort && (
              <section aria-labelledby="filter-dialog-sort" className="hidden flex-col gap-3 px-8 pt-5 md:flex">
                <h3 id="filter-dialog-sort" className="text-base leading-4.5 font-semibold">
                  Sort by
                </h3>
                {sort}
              </section>
            )}
            <div className="px-5 md:px-8 md:pt-2">{children}</div>
          </div>

          <div className="flex shrink-0 gap-3 border-t border-border-subtle bg-bg px-5 pt-4 pb-8 md:px-8 md:pt-5 dark:bg-surface">
            <Button variant="secondary" size="md" onClick={onClear}>
              Clear all
            </Button>
            <Dialog.Close asChild>
              <Button size="md" className="flex-1" onClick={onSubmit}>
                {submitLabel}
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
