"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

export interface Choice {
  value: string;
  label: string;
}

/**
 * ChoiceGroup (molecule): full-width answer cards with a round indicator (quiz questions).
 * Built on Radix RadioGroup: arrow keys move, Space selects.
 */
export interface ChoiceGroupProps
  extends Omit<ComponentProps<"div">, "defaultValue" | "dir" | "onChange"> {
  choices: Choice[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

export function ChoiceGroup({ choices, className, ...props }: ChoiceGroupProps) {
  return (
    <RadioGroup.Root data-slot="choice-group" className={cn("flex flex-col gap-2.5", className)} {...props}>
      {choices.map((choice) => (
        <RadioGroup.Item
          key={choice.value}
          value={choice.value}
          className={cn(
            "group flex w-full items-center justify-between gap-4 rounded-md border border-border-subtle px-4.5 py-4 text-left font-sans text-base leading-4.5 font-medium text-text transition-colors hover:bg-surface-subtle",
            "data-[state=checked]:border-brand data-[state=checked]:bg-sage-50 data-[state=checked]:font-semibold data-[state=checked]:text-primary data-[state=checked]:ring-1 data-[state=checked]:ring-brand data-[state=checked]:ring-inset dark:data-[state=checked]:text-text",
          )}
        >
          {choice.label}
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-border text-white group-data-[state=checked]:border-brand group-data-[state=checked]:bg-brand">
            <RadioGroup.Indicator>
              <Icon name="check" size={10} strokeWidth={4} />
            </RadioGroup.Indicator>
          </span>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}
