import type { ReactNode } from "react";

import { cn } from "../../../lib";
import { Switch } from "../../atoms";

/**
 * SettingsToggle (molecule): a setting that's on or off (Paper Jofak - Admin → Settings →
 * Payments & checkout): an optional leading tile (MTN, card icon), the setting and a line on what
 * it does (red when something's wrong), a figure ("91% success") or a badge ("Coming soon"), and
 * the switch. The switch submits `name=on` when on; `disabled` greys the row.
 */
export interface SettingsToggleProps {
  title: ReactNode;
  description?: ReactNode;
  /** Mobile: a shorter description. */
  compactDescription?: ReactNode;
  descriptionTone?: "error";
  name?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  /** A 36px tile before the text. */
  leading?: ReactNode;
  leadingTone?: "sun" | "citrus" | "lavender" | "sage" | "amber" | "muted";
  /** Right of the text: "91% success". */
  stat?: ReactNode;
  /** Mobile: a shorter figure ("91%"). */
  compactStat?: ReactNode;
  statTone?: "error" | "muted";
  /** A dashed badge ("Coming soon"). */
  badge?: string;
  /** Divider under the row (lists). */
  divided?: boolean;
  className?: string;
}

const TILE = {
  sun: "bg-tint-sun text-warning-text",
  citrus: "bg-tint-citrus text-error",
  lavender: "bg-tint-lavender text-lavender-text",
  sage: "bg-sage-100 text-brand",
  amber: "bg-tint-amber text-warning-text",
  muted: "bg-surface-subtle text-evergreen-300",
} as const;

export function SettingsToggle({
  title,
  description,
  compactDescription,
  descriptionTone,
  name,
  defaultChecked = false,
  disabled = false,
  leading,
  leadingTone = "muted",
  stat,
  compactStat,
  statTone,
  badge,
  divided = false,
  className,
}: SettingsToggleProps) {
  const swap = (short: ReactNode, full: ReactNode) =>
    short ? (
      <>
        <span className="md:hidden">{short}</span>
        <span className="hidden md:inline">{full}</span>
      </>
    ) : (
      full
    );
  return (
    <div data-slot="settings-toggle" className={cn("flex items-center gap-3 md:gap-3.5", divided && "border-b border-border-subtle py-3 last:border-b-0", className)}>
      {leading && <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-10 text-11 leading-3.5 font-bold", TILE[leadingTone])}>{leading}</span>}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className={cn("text-14 leading-5 font-semibold", disabled ? "text-text-muted" : "text-text")}>{title}</span>
        {description && <span className={cn("text-xs leading-xs", descriptionTone === "error" ? "text-error" : "text-text-muted")}>{swap(compactDescription, description)}</span>}
      </span>
      {stat && (
        <span className={cn("shrink-0 text-right text-sm leading-4.5 font-semibold md:w-27.5", statTone === "error" ? "text-error" : statTone === "muted" ? "font-regular text-text-secondary" : "text-text")}>
          {swap(compactStat, stat)}
        </span>
      )}
      {badge && <span className="shrink-0 rounded-full border border-dashed border-border px-2.5 py-0.75 text-xs leading-xs font-semibold text-text-muted">{badge}</span>}
      <Switch name={name} defaultChecked={defaultChecked} disabled={disabled} aria-label={typeof title === "string" ? title : undefined} className="data-[state=checked]:bg-primary" />
    </div>
  );
}
