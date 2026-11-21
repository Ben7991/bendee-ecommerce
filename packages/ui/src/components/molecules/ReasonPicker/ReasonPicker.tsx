"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { useId, type ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

export interface ReasonOption {
  value: string;
  label: string;
}

/**
 * ReasonPicker (molecule): "Reason (required)" with one choice as chips (Paper Jofak - Admin →
 * Cancel order / Refund). The chosen chip turns evergreen with a lime tick. Built on Radix
 * RadioGroup, so it submits `name` with the form and arrow keys move between reasons.
 */
export interface ReasonPickerProps extends Omit<ComponentProps<typeof RadioGroup.Root>, "children" | "orientation"> {
  options: ReasonOption[];
  label?: string;
}

export function ReasonPicker({ options, label = "Reason", required = true, className, ...props }: ReasonPickerProps) {
  const labelId = useId();
  return (
    <div data-slot="reason-picker" className={cn("flex flex-col gap-2.5 font-sans", className)}>
      <p id={labelId} className="text-14 leading-sm font-semibold text-text">
        {label} {required && <span className="font-regular text-text-muted">(required)</span>}
      </p>
      <RadioGroup.Root aria-labelledby={labelId} required={required} className="flex flex-wrap gap-2" {...props}>
        {options.map((option) => (
          <RadioGroup.Item
            key={option.value}
            value={option.value}
            className={cn(
              "group flex h-9 items-center gap-1.5 rounded-full border border-border px-3.5 text-sm leading-xs font-medium text-text transition-colors hover:bg-surface-subtle",
              "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:font-semibold data-[state=checked]:text-text-inverse",
            )}
          >
            <Icon name="check" size={12} strokeWidth={2.6} className="hidden text-accent group-data-[state=checked]:block" />
            {option.label}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
}
