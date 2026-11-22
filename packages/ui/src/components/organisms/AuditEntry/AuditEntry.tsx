import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * AuditEntry (organism): one audit log entry in full (Paper Jofak - Admin → Settings → Audit
 * entry): where it happened, what was done, a link to the thing changed, who / when / device /
 * IP, and each field before → after. Entries can't be edited. On mobile the page header carries
 * the title, so `compactHeader` hides it inside the card below 768px.
 */
export interface AuditEntryProps extends Omit<ComponentProps<"section">, "children" | "title"> {
  linkAs?: LinkComponent;
  /** "Settings · Delivery zone". */
  eyebrow: string;
  title: string;
  open?: { label: string; href: string };
  meta: { label: string; value: ReactNode; mono?: boolean }[];
  changes: { label: string; before: string; after: string }[];
  /** A sentence instead of field changes ("Invite sent to nana@jofak.com"). */
  note?: ReactNode;
  compactHeader?: boolean;
}

export function AuditEntry({ linkAs: LinkAs = "a", eyebrow, title, open, meta, changes, note, compactHeader = false, className, ...props }: AuditEntryProps) {
  return (
    <section data-slot="audit-entry" aria-label={title} className={cn("flex min-w-0 flex-col gap-3.5 rounded-18 border border-border-subtle p-4 font-sans md:gap-4 md:rounded-lg md:px-6 md:py-5.5 xl:px-5", className)} {...props}>
      <div className={cn("flex flex-col gap-1", compactHeader && "hidden md:flex")}>
        <p className="text-11 leading-3.5 font-semibold tracking-overline text-text-muted uppercase">{eyebrow}</p>
        <h2 className="text-lg leading-6 font-semibold tracking-compact text-text">{title}</h2>
        {open && (
          <LinkAs href={open.href} className="w-fit text-sm leading-4.5 font-semibold text-brand hover:underline">
            {open.label} ›
          </LinkAs>
        )}
      </div>
      <dl className="flex flex-col gap-2 rounded-sm bg-surface-subtle px-3 py-3 md:px-3.5">
        {meta.map((row) => (
          <div key={row.label} className="flex justify-between gap-3 text-xs leading-4.5">
            <dt className="text-text-muted">{row.label}</dt>
            <dd className={cn("text-right text-text", row.mono ? "font-mono" : "font-semibold")}>{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-base leading-5 font-semibold text-text">What changed</h3>
        {note && <p className="text-sm leading-5 text-text-secondary">{note}</p>}
        {changes.map((change) => (
          <div key={change.label} className="flex flex-col gap-1.5">
            <p className="text-xs leading-4.5 font-semibold text-text-secondary">{change.label}</p>
            <p className="flex items-center gap-2">
              <del className="min-w-0 flex-1 truncate rounded-8 bg-tint-citrus px-2.5 py-1.5 font-mono text-xs leading-4.5 text-error">{change.before}</del>
              <Icon name="arrowRight" size={12} strokeWidth={1.6} className="shrink-0 text-text-muted" />
              <ins className="min-w-0 flex-1 truncate rounded-8 bg-sage-100 px-2.5 py-1.5 font-mono text-xs leading-4.5 text-text no-underline">{change.after}</ins>
            </p>
          </div>
        ))}
      </div>
      <p className="flex items-center gap-2 border-t border-border-subtle pt-3 text-xs leading-xs text-text-muted">
        <Icon name="lock" size={12} strokeWidth={1.6} />
        Entries can’t be edited or deleted
      </p>
    </section>
  );
}
