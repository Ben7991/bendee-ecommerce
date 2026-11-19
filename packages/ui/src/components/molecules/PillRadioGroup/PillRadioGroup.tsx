"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * PillRadioGroup (molecule): a short single choice as pills with a radio dot ("SMS / WhatsApp /
 * Email"). The chosen pill turns sage with an evergreen edge; `tag` adds a small note ("Soon").
 * Built on Radix RadioGroup. For choices with descriptions use ChoiceCards.
 */
export interface PillRadioOption {
  value: string;
  label: ReactNode;
  tag?: ReactNode;
  disabled?: boolean;
}

export interface PillRadioGroupProps extends Omit<ComponentProps<typeof RadioGroup.Root>, "children"> {
  options: PillRadioOption[];
}

export function PillRadioGroup({ options, className, ...props }: PillRadioGroupProps) {
  return (
    <RadioGroup.Root data-slot="pill-radio-group" className={cn("flex flex-wrap gap-2 font-sans", className)} {...props}>
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className={cn(
            "group flex items-center gap-2 rounded-full border border-border px-4.5 py-2.5 text-sm leading-xs text-text-secondary transition-colors",
            "data-[state=checked]:border-primary data-[state=checked]:bg-sage-50 data-[state=checked]:font-semibold data-[state=checked]:text-text data-[state=checked]:ring-1 data-[state=checked]:ring-primary",
            "hover:border-brand disabled:cursor-not-allowed disabled:hover:border-border",
          )}
        >
          <span aria-hidden className="size-3.5 shrink-0 rounded-full border-field border-border bg-bg transition-colors group-data-[state=checked]:border-4 group-data-[state=checked]:border-primary" />
          {option.label}
          {option.tag && <span className="rounded-full bg-surface px-1.5 py-px text-10 leading-3 font-regular text-text-muted">{option.tag}</span>}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}
