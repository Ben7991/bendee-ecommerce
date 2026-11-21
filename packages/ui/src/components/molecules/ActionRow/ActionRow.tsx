import type { ComponentProps } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon, type IconName } from "../../atoms";
import { actionRowVariants, type ActionRowVariantProps } from "./ActionRow.variants";

/**
 * ActionRow (molecule): a text action with a leading icon ("⊗ Cancel order"). A button by
 * default; pass a link with `asChild`. A locked action is a disabled `muted` row that says why
 * ("Edit order · locked once processing starts").
 */
export interface ActionRowProps extends ComponentProps<"button">, ActionRowVariantProps, AsChildProps {
  icon: IconName;
}

export function ActionRow({ icon, tone, asChild = false, type, className, children, ...props }: ActionRowProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp data-slot="action-row" type={asChild ? undefined : (type ?? "button")} className={cn(actionRowVariants({ tone }), className)} {...props}>
      <Icon name={icon} size={16} className={cn(tone === "muted" && "text-evergreen-300")} />
      <Slottable>{children}</Slottable>
    </Comp>
  );
}
