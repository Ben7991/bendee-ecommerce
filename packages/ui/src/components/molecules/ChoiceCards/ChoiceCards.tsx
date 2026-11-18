"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";

export interface ChoiceCardOption {
  value: string;
  title: ReactNode;
  /** Shorter title for mobile. */
  compactTitle?: ReactNode;
  description?: ReactNode;
  /** Shorter description for mobile; `null` hides it on mobile. */
  compactDescription?: ReactNode;
  /** Inline after the title from 768px (e.g. an "Order in 1h 20m" pill). */
  badge?: ReactNode;
  /** Right side (price, payment badges, an icon). */
  aside?: ReactNode;
  /** Right side on mobile, if different; `null` hides it on mobile. */
  compactAside?: ReactNode;
  /** Shown inside the card, under the radio row, while it's selected (e.g. wallet fields). */
  content?: ReactNode;
}

function Responsive({ full, compact }: { full: ReactNode; compact: ReactNode | undefined }) {
  if (compact === undefined) return <>{full}</>;
  return (
    <>
      {compact !== null && <span className="md:hidden">{compact}</span>}
      <span className="hidden md:inline">{full}</span>
    </>
  );
}

/**
 * ChoiceCards (molecule): a radio group drawn as stacked cards (delivery method, payment
 * method). The selected card turns sage with a 2px evergreen edge and reveals its `content`
 * below the radio row (outside the radio, so its fields work normally).
 * `size="sm"` uses the smaller mobile type of the delivery list.
 */
export interface ChoiceCardsProps
  extends Omit<ComponentProps<typeof RadioGroup.Root>, "children" | "value" | "defaultValue" | "onValueChange"> {
  options: ChoiceCardOption[];
  size?: "sm" | "md";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function ChoiceCards({ options, size = "md", value: valueProp, defaultValue, onValueChange, className, ...props }: ChoiceCardsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = valueProp ?? uncontrolled;
  const sm = size === "sm";

  return (
    <RadioGroup.Root
      data-slot="choice-cards"
      value={value}
      onValueChange={(next) => {
        if (valueProp === undefined) setUncontrolled(next);
        onValueChange?.(next);
      }}
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <div
            key={option.value}
            data-state={checked ? "checked" : "unchecked"}
            className={cn(
              "flex flex-col rounded-sm border bg-bg font-sans transition-colors md:rounded-md",
              checked ? "border-primary bg-sage-50 ring-1 ring-primary" : "border-border hover:border-brand",
              checked && option.content && "gap-4 p-4 md:gap-5 md:p-5",
            )}
          >
            <RadioGroup.Item
              value={option.value}
              className={cn(
                "group flex w-full items-center gap-3 rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-brand md:gap-4",
                !(checked && option.content) && (sm ? "px-4 py-3 md:px-5 md:py-4" : "p-4 md:px-5 md:py-4"),
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "shrink-0 rounded-full border-field border-border bg-bg transition-colors group-data-[state=checked]:border-primary",
                  sm ? "size-4.5 group-data-[state=checked]:border-5" : "size-5 group-data-[state=checked]:border-6",
                  "md:size-5 md:group-data-[state=checked]:border-6",
                )}
              />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex flex-wrap items-center gap-2">
                  <span className={cn("font-semibold text-text", sm ? "text-sm leading-sm" : "text-base leading-sm", "md:text-base")}>
                    <Responsive full={option.title} compact={option.compactTitle} />
                  </span>
                  {option.badge && <span className="hidden md:inline-flex">{option.badge}</span>}
                </span>
                {option.description && (
                  <span className={cn("text-xs leading-xs text-text-muted md:text-sm", option.compactDescription === null && "hidden md:inline")}>
                    <Responsive full={option.description} compact={option.compactDescription ?? undefined} />
                  </span>
                )}
              </span>
              {option.aside && (
                <span className={cn("shrink-0", option.compactAside === null && "hidden md:block")}>
                  {option.compactAside ? <Responsive full={option.aside} compact={option.compactAside} /> : option.aside}
                </span>
              )}
            </RadioGroup.Item>
            {checked && option.content}
          </div>
        );
      })}
    </RadioGroup.Root>
  );
}
