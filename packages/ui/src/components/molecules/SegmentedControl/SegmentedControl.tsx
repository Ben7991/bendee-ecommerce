"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useState, type ComponentProps } from "react";

import { cn } from "../../../lib";

export interface SegmentedOption {
  value: string;
  label: string;
  /** Hide this option below 768px ("Custom" on the mobile dashboard). */
  hideOnMobile?: boolean;
}

/**
 * SegmentedControl (molecule): a compact single choice on a soft track, e.g. the dashboard's
 * date range (Today / 7 days / 30 days / Custom). Arrow keys move between options and one is
 * always selected. For storefront filters use FilterTabs.
 */
export interface SegmentedControlProps extends Omit<ComponentProps<"div">, "defaultValue" | "dir" | "onChange"> {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  "aria-label": string;
}

export function SegmentedControl({ options, value: valueProp, defaultValue, onValueChange, className, ...props }: SegmentedControlProps) {
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value ?? "");
  const value = valueProp ?? inner;
  return (
    <ToggleGroup.Root
      data-slot="segmented-control"
      type="single"
      value={value}
      // Radix sends "" when the active option is pressed again; keep the current one.
      onValueChange={(next) => {
        if (!next) return;
        if (valueProp === undefined) setInner(next);
        onValueChange?.(next);
      }}
      className={cn("flex w-fit items-center gap-0.5 rounded-full bg-surface-subtle p-1", className)}
      {...props}
    >
      {options.map((option) => (
        <ToggleGroup.Item
          key={option.value}
          value={option.value}
          className={cn(
            "shrink-0 rounded-full px-3.5 py-1.5 font-sans text-sm leading-sm font-medium text-text-secondary transition-colors hover:text-text",
            "data-[state=on]:bg-bg data-[state=on]:font-semibold data-[state=on]:text-text data-[state=on]:shadow-xs",
            option.hideOnMobile && "hidden md:block",
          )}
        >
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
