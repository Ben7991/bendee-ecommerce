"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import type { ComponentProps } from "react";

import { cn } from "../../../lib";

/**
 * Switch (atom): an on/off toggle on Radix Switch. Pair it with a <label htmlFor> (see SwitchField).
 * `sm` is 32×18 (admin note composer), `md` 40×24 (filters, forms), `lg` 48×28 (cookie settings).
 */
export interface SwitchProps extends ComponentProps<typeof SwitchPrimitive.Root> {
  size?: "sm" | "md" | "lg";
}

export function Switch({ size = "md", className, ...props }: SwitchProps) {
  const lg = size === "lg";
  const sm = size === "sm";
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "inline-flex shrink-0 items-center rounded-full bg-border transition-colors",
        lg ? "h-7 w-12 p-0.75" : sm ? "h-4.5 w-8 p-0.5" : "h-6 w-10 p-0.75",
        "data-[state=checked]:bg-brand disabled:cursor-not-allowed disabled:opacity-muted",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "block rounded-full bg-bg shadow-xs transition-transform",
          lg ? "size-5.5 data-[state=checked]:translate-x-5" : sm ? "size-3.5 data-[state=checked]:translate-x-3.5" : "size-4.5 data-[state=checked]:translate-x-4",
        )}
      />
    </SwitchPrimitive.Root>
  );
}
