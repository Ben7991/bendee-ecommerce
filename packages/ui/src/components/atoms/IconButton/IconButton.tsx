import type { ComponentProps } from "react";

import { cn, Slot, type AsChildProps } from "../../../lib";
import { iconButtonVariants, type IconButtonVariantProps } from "./IconButton.variants";

/**
 * IconButton (atom): a round button whose only content is an icon (plus an optional CountBadge).
 * `label` is required and becomes the accessible name.
 */
export interface IconButtonProps
  extends Omit<ComponentProps<"button">, "aria-label">,
    IconButtonVariantProps,
    AsChildProps {
  label: string;
}

export function IconButton({
  className,
  variant,
  size,
  label,
  asChild = false,
  type,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="icon-button"
      type={asChild ? undefined : (type ?? "button")}
      aria-label={label}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
