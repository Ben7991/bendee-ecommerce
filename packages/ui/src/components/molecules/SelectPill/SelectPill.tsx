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
export interface SelectPillProps extends Omit<ComponentProps<"select">, "children"> {
  /** Accessible name ("Movement type"). */
  label: string;
  options: { value: string; label: string }[];
  icon?: IconName;
  autoSubmit?: boolean;
}

export function SelectPill({ label, options, icon, autoSubmit = false, onChange, className, ...props }: SelectPillProps) {
  return (
    <span
      data-slot="select-pill"
      className={cn(
        "relative flex h-10 shrink-0 items-center gap-2 rounded-full border border-border px-3.5 font-sans focus-within:border-brand hover:bg-surface-subtle xl:h-9.5",
        className,
      )}
    >
      {icon && <Icon name={icon} size={14} strokeWidth={1.4} className="text-text-muted" />}
      <select
        aria-label={label}
        onChange={(event) => {
          onChange?.(event);
          if (autoSubmit) event.currentTarget.form?.requestSubmit();
        }}
        className="cursor-pointer appearance-none bg-transparent pr-4 text-sm leading-4 font-medium text-text outline-none field-sizing-content"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="chevronDown" size={12} strokeWidth={1.4} className="pointer-events-none absolute right-3.5 text-text-muted" />
    </span>
  );
}
