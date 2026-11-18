import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../Icon";
import { iconBadgeVariants, type IconBadgeVariantProps } from "./IconBadge.variants";

/** IconBadge (atom): a sage circle with one icon, used as a page or dialog emblem. Decorative. */
export interface IconBadgeProps extends Omit<ComponentProps<"span">, "children">, IconBadgeVariantProps {
  icon: IconName;
  /** Icon size in px (Paper: 28, mailCheck 30). */
  iconSize?: number;
}

export function IconBadge({ icon, iconSize = 28, size, className, ...props }: IconBadgeProps) {
  return (
    <span data-slot="icon-badge" aria-hidden className={cn(iconBadgeVariants({ size }), className)} {...props}>
      <Icon name={icon} size={iconSize} />
    </span>
  );
}
