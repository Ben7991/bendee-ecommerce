import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { avatarVariants, type AvatarVariantProps } from "./Avatar.variants";

/**
 * Avatar (atom). Pass an <img> (or next/image with `fill`) as the child for a real photo;
 * without one, the tone shows as a placeholder. Decorative unless you give it a label.
 */
export interface AvatarProps extends ComponentProps<"span">, AvatarVariantProps {
  label?: string;
}

export function Avatar({ className, tone, size, label, children, ...props }: AvatarProps) {
  return (
    <span
      data-slot="avatar"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(avatarVariants({ tone, size }), "[&>img]:size-full [&>img]:object-cover", className)}
      {...props}
    >
      {children}
    </span>
  );
}
