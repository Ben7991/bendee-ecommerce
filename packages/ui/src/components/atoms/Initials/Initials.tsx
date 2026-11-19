import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { initialsVariants, type InitialsVariantProps } from "./Initials.variants";

/**
 * Initials (atom): a customer's initials on a sage disc ("AM"), standing in for a photo.
 * Decorative: show the name next to it.
 */
export interface InitialsProps extends Omit<ComponentProps<"span">, "children">, InitialsVariantProps {
  name: string;
}

export const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");

export function Initials({ name, size, className, ...props }: InitialsProps) {
  return (
    <span data-slot="initials" aria-hidden className={cn(initialsVariants({ size }), className)} {...props}>
      {initialsOf(name)}
    </span>
  );
}
