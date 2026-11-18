"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import type { ComponentProps } from "react";

import { cn } from "../../../lib";

/** Switch (atom): a 40×24 on/off toggle on Radix Switch. Pair it with a <label htmlFor> (see SwitchField). */
export type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "inline-flex h-6 w-10 shrink-0 items-center rounded-full bg-border p-0.75 transition-colors",
        "data-[state=checked]:bg-brand disabled:cursor-not-allowed disabled:opacity-muted",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="block size-4.5 rounded-full bg-bg shadow-xs transition-transform data-[state=checked]:translate-x-4" />
    </SwitchPrimitive.Root>
  );
}
