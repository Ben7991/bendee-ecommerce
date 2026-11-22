import type { ComponentProps } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon } from "../Icon";
import {
  BUTTON_ARROW_ICON_SIZE,
  buttonArrowVariants,
  buttonVariants,
  type ButtonVariantProps,
} from "./Button.variants";

/**
 * Button (atom): Jofak's pill button.
 * - `variant`: primary (evergreen), secondary (white + border), accent (sprout lime), outline.
 * - `arrow`: adds the round ↗ badge used on navigational CTAs.
 * - `asChild`: render a link instead, e.g. <Button asChild><Link href="/shop">Shop</Link></Button>.
 * Only one accent (lime) button per view.
 */
export interface ButtonProps extends ComponentProps<"button">, ButtonVariantProps, AsChildProps {}

export function Button({
  className,
  variant,
  size,
  arrow,
  asChild = false,
  type,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const resolvedSize = size ?? "lg";

  return (
    <Comp
      data-slot="button"
      // Native buttons default to "button" so they never submit a form by accident.
      type={asChild ? undefined : (type ?? "button")}
      className={cn(buttonVariants({ variant, size, arrow }), className)}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {arrow && (
        <span data-slot="button-arrow" className={buttonArrowVariants({ variant, size })}>
          <Icon name="arrowUpRight" size={BUTTON_ARROW_ICON_SIZE[resolvedSize]} />
        </span>
      )}
    </Comp>
  );
}
