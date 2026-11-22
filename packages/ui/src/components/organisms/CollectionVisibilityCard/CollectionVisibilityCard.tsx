import { useId, type ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon, Switch } from "../../atoms";

export interface VisibilityToggle {
  /** Posted as "on" when checked: "active", "listed", "featured". */
  name: string;
  label: string;
  /** "Page and rails can show it". */
  description: string;
  /** Mobile: "Top of the hub · one at a time". */
  compactDescription?: string;
  defaultChecked: boolean;
  /** Not on mobile (Active). */
  hideOnMobile?: boolean;
}

export interface SettingRow {
  label: string;
  value: string;
  /** Same-page anchor to the card that edits it ("#schedule"). */
  href: string;
}

/**
 * CollectionVisibilityCard (organism): where a collection shows (Paper Jofak - Admin →
 * Collection editor → Visibility): Active, List on Offers hub, Featured banner. On mobile it is
 * the settings list instead: rows that jump to the details, schedule and SEO cards (which open
 * when they're the URL target) and the hub and featured switches.
 */
export interface CollectionVisibilityCardProps extends Omit<ComponentProps<"section">, "children"> {
  toggles: VisibilityToggle[];
  /** Mobile rows above the switches. */
  rows?: SettingRow[];
}

export function CollectionVisibilityCard({ toggles, rows = [], className, ...props }: CollectionVisibilityCardProps) {
  const id = useId();
  return (
    <section
      data-slot="collection-visibility-card"
      aria-labelledby={`${id}-title`}
      className={cn("flex flex-col overflow-clip rounded-18 border border-border-subtle font-sans md:gap-3.5 md:rounded-lg md:p-5", className)}
      {...props}
    >
      <h2 id={`${id}-title`} className="sr-only text-xs leading-xs font-semibold tracking-label text-text-muted uppercase md:not-sr-only">
        Visibility
      </h2>
      {rows.map((row) => (
        // Plain anchors: a same-page hash must set :target, which router links don't.
        <a key={row.href} href={row.href} className="flex items-center gap-3 border-b border-border-subtle px-4 py-3 hover:bg-surface-subtle md:hidden">
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-xs leading-xs text-text-muted">{row.label}</span>
            <span className="truncate text-base leading-5 font-semibold text-text">{row.value}</span>
          </span>
          <Icon name="chevronRight" size={14} strokeWidth={1.6} className="text-text-muted" />
        </a>
      ))}
      {toggles.map((toggle) => (
        <div
          key={toggle.name}
          className={cn(
            "items-center justify-between gap-3 border-border-subtle px-4 py-3 not-last:border-b md:border-0 md:p-0",
            toggle.hideOnMobile ? "hidden md:flex" : "flex",
          )}
        >
          <label htmlFor={`${id}-${toggle.name}`} className="flex min-w-0 flex-col gap-0.5">
            <span className="text-base leading-5 font-semibold text-text md:text-14">{toggle.label}</span>
            <span className="text-xs leading-xs text-text-muted">
              <span className="md:hidden">{toggle.compactDescription ?? toggle.description}</span>
              <span className="hidden md:inline">{toggle.description}</span>
            </span>
          </label>
          <Switch id={`${id}-${toggle.name}`} name={toggle.name} size="lg" defaultChecked={toggle.defaultChecked} className="h-6.5 w-11 data-[state=checked]:bg-primary dark:data-[state=checked]:bg-brand" />
        </div>
      ))}
    </section>
  );
}
