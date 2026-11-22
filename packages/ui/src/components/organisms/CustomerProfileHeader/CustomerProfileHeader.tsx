import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, Initials, StatusChip, type InitialsProps } from "../../atoms";
import type { CustomerTag } from "../CustomerTable";

/**
 * CustomerProfileHeader (organism): the top of an admin customer page (Paper Jofak - Admin →
 * Customer detail): back to Customers, the initials disc, name with a tag ("VIP") and a line
 * of account facts, then Add note and the ⋯ menu. Add note is a full button from 1440px and an
 * icon on tablet; on mobile the ⋯ menu sits beside the back link and Add note moves to
 * CustomerContactCard. Pass a menu trigger (OrderMoreMenu) as `more`; it renders twice, CSS
 * shows one.
 */
export interface CustomerProfileHeaderProps extends Omit<ComponentProps<"header">, "children"> {
  linkAs?: LinkComponent;
  backHref: string;
  backLabel?: string;
  name: string;
  tone?: InitialsProps["tone"];
  tag?: CustomerTag;
  /** "Customer since 4 Mar 2025 · Account active · Phone verified". */
  meta: ReactNode;
  /** Tablet: "Since 4 Mar 2025 · Active · Phone verified". */
  compactMeta?: ReactNode;
  /** Mobile: "Since Mar 2025 · Active · Verified". */
  mobileMeta?: ReactNode;
  /** Where Add note goes (the notes composer, say "#notes"). */
  addNoteHref?: string;
  more?: ReactNode;
}

export function CustomerProfileHeader({
  linkAs: LinkAs = "a",
  backHref,
  backLabel = "Customers",
  name,
  tone = "sage",
  tag,
  meta,
  compactMeta,
  mobileMeta,
  addNoteHref,
  more,
  className,
  ...props
}: CustomerProfileHeaderProps) {
  return (
    <header data-slot="customer-profile-header" className={cn("flex flex-col gap-3.5 font-sans md:gap-5", className)} {...props}>
      <div className="flex items-center justify-between">
        <LinkAs
          href={backHref}
          className="flex items-center gap-1 text-14 leading-4.5 font-semibold text-text-muted hover:text-text md:gap-1.5 md:text-sm md:leading-4"
        >
          <Icon name="chevronLeft" size={16} strokeWidth={1.8} className="md:size-3.5" />
          {backLabel}
        </LinkAs>
        {more && <div className="md:hidden">{more}</div>}
      </div>

      <div className="flex items-center gap-3.5 md:gap-4 xl:gap-4.5">
        <Initials name={name} size="profile" tone={tone} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 md:gap-1 xl:gap-1.5">
          <div className="flex flex-wrap items-center gap-2 xl:gap-2.5">
            <h1 className="text-24 leading-7.5 font-semibold tracking-snug text-text md:text-28 md:leading-8.5 md:tracking-tight xl:text-3xl xl:leading-9.5">
              {name}
            </h1>
            {tag && (
              <StatusChip tone={tag.tone} size="sm" className="px-2 py-px font-bold md:px-2.25 md:py-0.5 md:text-xs md:leading-4 xl:px-2.5 xl:py-0.75">
                {tag.label}
              </StatusChip>
            )}
          </div>
          <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-4.5 xl:text-14 xl:leading-5">
            {mobileMeta && <span className="md:hidden">{mobileMeta}</span>}
            {compactMeta && <span className={cn("xl:hidden", mobileMeta ? "hidden md:inline" : "")}>{compactMeta}</span>}
            <span className={cn(compactMeta ? "hidden xl:inline" : mobileMeta ? "hidden md:inline" : "")}>{meta}</span>
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-2.5 md:flex">
          {addNoteHref && (
            // A plain anchor: a same-page hash must set :target, which router links don't.
            <a
              href={addNoteHref}
              aria-label="Add note"
              className="flex size-10.5 items-center justify-center gap-2 rounded-full border border-border text-14 leading-4.5 font-semibold text-text hover:bg-surface-subtle xl:h-11 xl:w-auto xl:px-4.5"
            >
              <Icon name="note" size={16} />
              <span className="hidden xl:inline">Add note</span>
            </a>
          )}
          {more}
        </div>
      </div>
    </header>
  );
}
