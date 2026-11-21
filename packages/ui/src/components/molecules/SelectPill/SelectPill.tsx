"use client";

import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

/**
 * SelectPill (molecule): a native select dressed as an admin filter pill ("All types ⌄",
 * "📅 Last 7 days", Paper Jofak - Admin → Inventory → Movements). Put it inside a GET form (e.g.
 * ListSearch's children); `autoSubmit` sends the form when the choice changes, so the filter
 * lands in the URL.
 */
export interface SelectPillProps extends Omit<ComponentProps<"select">, "children" | "size"> {
  /** Accessible name ("Movement type"). */
  label: string;
  options: { value: string; label: string }[];
  icon?: IconName;
  autoSubmit?: boolean;
  /** `lg`: a 44px page-header button ("Last 30 days", marketing). */
  size?: "md" | "lg";
}

export function SelectPill({ label, options, icon, autoSubmit = false, size = "md", onChange, className, ...props }: SelectPillProps) {
  const lg = size === "lg";
  return (
    <span
      data-slot="select-pill"
      className={cn(
        "relative flex shrink-0 items-center gap-2 rounded-full border border-border px-3.5 font-sans focus-within:border-brand hover:bg-surface-subtle",
        lg ? "h-11 px-4" : "h-10 xl:h-9.5",
        className,
      )}
    >
      {icon && <Icon name={icon} size={14} strokeWidth={1.4} className={lg ? "text-text" : "text-text-muted"} />}
      <select
        aria-label={label}
        onChange={(event) => {
          onChange?.(event);
          if (autoSubmit) event.currentTarget.form?.requestSubmit();
        }}
        className={cn(
          "cursor-pointer appearance-none bg-transparent pr-4 text-text outline-none field-sizing-content",
          lg ? "text-14 leading-4.5 font-semibold" : "text-sm leading-4 font-medium",
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="chevronDown" size={12} strokeWidth={1.4} className={cn("pointer-events-none absolute text-text-muted", lg ? "right-4" : "right-3.5")} />
    </span>
  );
}
