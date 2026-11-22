"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import type { ComponentProps } from "react";

import { cn } from "../../../lib";

/**
 * Switch (atom): an on/off toggle on Radix Switch. Pair it with a <label htmlFor> (see SwitchField).
 * `sm` is 32×18 (admin note composer), `md` 40×24 (filters, forms), `lg` 48×28 (cookie settings),
 * `admin` 36×20, 38×22 from 1440px (customer marketing consent), `field` 44×26 (discount editor).
 */
export interface SwitchProps extends ComponentProps<typeof SwitchPrimitive.Root> {
  size?: "sm" | "md" | "lg" | "admin" | "field";
}

export function Switch({ size = "md", className, ...props }: SwitchProps) {
  const lg = size === "lg";
  const sm = size === "sm";
  const admin = size === "admin";
  const field = size === "field";
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "inline-flex shrink-0 items-center rounded-full bg-border transition-colors",
        lg ? "h-7 w-12 p-0.75" : field ? "h-6.5 w-11 p-0.75" : sm ? "h-4.5 w-8 p-0.5" : admin ? "h-5 w-9 p-0.5 xl:h-5.5 xl:w-9.5" : "h-6 w-10 p-0.75",
        "data-[state=checked]:bg-brand disabled:cursor-not-allowed disabled:opacity-muted",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "block rounded-full bg-bg shadow-xs transition-transform",
          lg
            ? "size-5.5 data-[state=checked]:translate-x-5"
            : field
              ? "size-5 data-[state=checked]:translate-x-4.5"
              : sm
              ? "size-3.5 data-[state=checked]:translate-x-3.5"
              : admin
                ? "size-4 data-[state=checked]:translate-x-4 xl:size-4.5 dark:bg-text"
                : "size-4.5 data-[state=checked]:translate-x-4",
        )}
      />
    </SwitchPrimitive.Root>
  );
}
