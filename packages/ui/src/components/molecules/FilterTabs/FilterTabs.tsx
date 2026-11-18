"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import type { ComponentProps } from "react";

import { cn } from "../../../lib";

export interface FilterOption {
  value: string;
  label: string;
}

/**
 * FilterTabs (molecule): single-choice filter pills (All / Capsules / Powders …).
 * Built on Radix ToggleGroup: arrow keys move between options; one is always selected.
 */
export interface FilterTabsProps extends Omit<ComponentProps<"div">, "defaultValue" | "dir" | "onChange"> {
  options: FilterOption[];
  value: string;
  onValueChange: (value: string) => void;
  /** Describes what is being filtered, e.g. "Filter bestsellers". */
  "aria-label": string;
}

export function FilterTabs({ options, value, onValueChange, className, ...props }: FilterTabsProps) {
  return (
    <ToggleGroup.Root
      data-slot="filter-tabs"
      type="single"
      value={value}
      // Radix sends "" when the active item is pressed again; keep the current filter instead.
      onValueChange={(next) => next && onValueChange(next)}
      className={cn("flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-full bg-surface p-1.5", className)}
      {...props}
    >
      {options.map((option) => (
        <ToggleGroup.Item
          key={option.value}
          value={option.value}
          className="shrink-0 rounded-full px-4.5 py-2.5 font-sans text-14 leading-4.5 font-medium text-text-secondary transition-colors hover:text-text data-[state=on]:bg-primary data-[state=on]:text-text-inverse"
        >
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
