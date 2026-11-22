import type { ComponentProps, ReactNode } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon, type IconName } from "../../atoms";
import { taskTileIconVariants, taskTileVariants, type TaskTileVariantProps } from "./TaskTile.variants";

/**
 * TaskTile (molecule): a work queue on the admin dashboard that links to the filtered list
 * ("9 · Orders to pack"). To use your router's link, pass an empty link with `asChild`:
 *   <TaskTile asChild icon="box" value="9" label="Orders to pack"><Link href="/admin/orders" /></TaskTile>
 */
export interface TaskTileProps extends ComponentProps<"a">, TaskTileVariantProps, AsChildProps {
  icon: IconName;
  value: ReactNode;
  label: ReactNode;
}

export function TaskTile({ icon, value, label, tone, asChild = false, className, children, ...props }: TaskTileProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp data-slot="task-tile" className={cn(taskTileVariants({ tone }), className)} {...props}>
      <span className="flex items-center justify-between">
        <span className={taskTileIconVariants({ tone })}>
          <Icon name={icon} size={16} />
        </span>
        <Icon name="chevronRight" size={16} strokeWidth={1.5} className="text-text-muted" />
      </span>
      <Slottable>{children}</Slottable>
      <span className="flex flex-col gap-0.5">
        <span className="text-2xl leading-2xl font-semibold tracking-snug text-text">{value}</span>
        <span className="text-sm leading-sm font-medium text-text-secondary">{label}</span>
      </span>
    </Comp>
  );
}
