import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, StatusChip, type StatusChipProps } from "../../atoms";

/**
 * CollectionEditorHeader (organism): the top of the collection editor (Paper Jofak - Admin →
 * Collection editor): back to Collections, the name with its status ("Live · ends 15 Dec"), the
 * store address, and from 1440px View on store and Save changes (a submit button: put the header
 * inside the editor's form). Mobile adds a Featured chip and drops the address.
 */
export interface CollectionEditorHeaderProps extends Omit<ComponentProps<"header">, "children"> {
  linkAs?: LinkComponent;
  backHref: string;
  backLabel?: string;
  name: string;
  status: { label: string; tone: NonNullable<StatusChipProps["tone"]> };
  featured?: boolean;
  /** "jofak.com/collections/". */
  urlPrefix: string;
  slug: string;
  viewHref: string;
}

export function CollectionEditorHeader({
  linkAs: LinkAs = "a",
  backHref,
  backLabel = "Collections",
  name,
  status,
  featured = false,
  urlPrefix,
  slug,
  viewHref,
  className,
  ...props
}: CollectionEditorHeaderProps) {
  return (
    <header data-slot="collection-editor-header" className={cn("flex items-end justify-between gap-5 font-sans", className)} {...props}>
      <div className="flex min-w-0 flex-col gap-2">
        <LinkAs href={backHref} className="flex w-fit items-center gap-1 text-14 leading-4.5 font-semibold text-text-muted hover:text-text md:gap-1.5 md:text-sm md:font-medium">
          <Icon name="chevronLeft" size={16} strokeWidth={1.8} className="md:size-3.5" />
          {backLabel}
        </LinkAs>
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-3">
          <h1 className="text-24 leading-7.5 font-semibold tracking-snug text-text md:text-30 md:leading-9 md:tracking-tight xl:text-34 xl:leading-10">{name}</h1>
          <span className="flex items-center gap-1.5">
            <StatusChip tone={status.tone} className="px-2.5 py-0.5 text-xs leading-4.5 xl:text-sm xl:leading-5">
              {status.label}
            </StatusChip>
            {featured && (
              <StatusChip tone="accent" className="gap-1 px-2.5 py-0.5 text-xs leading-4.5 md:hidden">
                <Icon name="star" size={11} /> Featured
              </StatusChip>
            )}
          </span>
        </div>
        <p className="hidden text-sm leading-4.5 text-text-muted md:block">
          {urlPrefix}
          <span className="font-semibold text-text-secondary">{slug}</span>
        </p>
      </div>
      <div className="hidden shrink-0 items-center gap-2.5 xl:flex">
        <a
          href={viewHref}
          target="_blank"
          rel="noreferrer"
          className="flex h-11 items-center gap-2 rounded-full border border-border px-4.5 text-14 leading-4.5 font-semibold text-text hover:bg-surface-subtle"
        >
          View on store
          <Icon name="arrowUpRight" size={12} strokeWidth={2.2} />
        </a>
        <button type="submit" className="flex h-11 items-center rounded-full bg-primary px-5.5 text-14 leading-4.5 font-semibold text-on-primary hover:bg-primary-hover">
          Save changes
        </button>
      </div>
    </header>
  );
}
