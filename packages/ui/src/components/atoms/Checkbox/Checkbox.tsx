"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ComponentProps } from "react";

import { cn } from "../../../lib";

/**
 * Checkbox (atom): an 18px box on Radix Checkbox. Pair it with a <label htmlFor> (see the
 * auth pages) so the text is the click target too. Inside a <form> Radix also renders a
 * hidden input with `name`, so it submits like a native checkbox.
 */
export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root>;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "inline-flex size-4.5 shrink-0 items-center justify-center rounded-5 border-field border-border bg-bg text-text-inverse transition-colors",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
        "disabled:cursor-not-allowed disabled:opacity-muted",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <svg viewBox="0 0 24 24" width={11} height={11} aria-hidden focusable="false" fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
