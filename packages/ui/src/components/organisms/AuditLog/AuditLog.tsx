import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Initials } from "../../atoms";

export type AuditAreaTone = "neutral" | "sage" | "sun" | "citrus";

export interface AuditLogEntry {
  id: string;
  /** "10:42". */
  time: string;
  /** Who did it (shown as initials). */
  who: string;
  tone: "sage" | "lavender" | "amber" | "info" | "citrus" | "neutral";
  /** "Abena Mensah updated delivery zone Accra Central", names in <strong>. */
  text: ReactNode;
  area: string;
  areaTone?: AuditAreaTone;
  /** "Packed → Handed to courier". */
  detail?: ReactNode;
  href: string;
  selected?: boolean;
}

/**
 * AuditLog (organism): every change staff made, newest first, grouped by day (Paper Jofak - Admin
 * → Settings → Audit log): time, who (initials), what they did, the area and the change. Each
 * entry links to its detail; the selected one is tinted with a brand edge.
 */
export interface AuditLogProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  groups: { label: string; entries: AuditLogEntry[] }[];
  emptyMessage?: string;
}

export const AUDIT_AREA: Record<AuditAreaTone, string> = {
  neutral: "bg-surface-subtle text-text",
  sage: "bg-sage-100 text-primary dark:text-brand",
  sun: "bg-tint-sun text-warning-text",
  citrus: "bg-tint-citrus text-error",
};

export function AuditLog({ linkAs: LinkAs = "a", groups, emptyMessage = "No changes match these filters.", className, ...props }: AuditLogProps) {
  return (
    <section data-slot="audit-log" aria-label="Changes" className={cn("flex min-w-0 flex-col gap-1 rounded-18 border border-border-subtle px-3 py-3.5 font-sans md:rounded-lg md:px-4 md:py-4", className)} {...props}>
      {groups.length === 0 && <p className="py-10 text-center text-sm leading-4.5 text-text-muted">{emptyMessage}</p>}
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col pt-1 first:pt-0">
          <h2 className="px-1 pt-1 pb-2 text-11 leading-3.5 font-semibold tracking-eyebrow text-text-muted uppercase md:px-1">{group.label}</h2>
          <ul className="flex flex-col">
            {group.entries.map((entry) => (
              <li key={entry.id} className="border-b border-border-subtle last:border-b-0">
                <LinkAs
                  href={entry.href}
                  aria-current={entry.selected ? "page" : undefined}
                  className={cn(
                    "-mb-px flex gap-2.5 rounded-sm px-1 py-3 md:gap-3 md:px-3",
                    entry.selected ? "border-l-3 border-l-primary bg-sage-50" : "hover:bg-surface-subtle",
                  )}
                >
                  <span className="w-11 shrink-0 pt-0.5 font-mono text-sm leading-4.5 text-text-secondary md:w-12">{entry.time}</span>
                  <Initials name={entry.who} size="activity" tone={entry.tone} className="shrink-0" />
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-sm leading-5 text-text">{entry.text}</span>
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-xs text-text-secondary">
                      <span className={cn("rounded-6 px-2 py-0.5 text-11 leading-3.5 font-semibold", AUDIT_AREA[entry.areaTone ?? "sage"])}>{entry.area}</span>
                      {entry.detail}
                    </span>
                  </span>
                </LinkAs>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
