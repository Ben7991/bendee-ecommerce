import type { ComponentProps, ReactNode } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

/**
 * ActionTile (molecule): an outlined shortcut with a sage icon disc, a title and a line under it
 * ("Reorder favourites · From your last 3 orders"). A link: pass yours through `asChild`; the
 * link's own text is the title.
 */
export interface ActionTileProps extends ComponentProps<"a">, AsChildProps {
  icon: IconName;
  description?: ReactNode;
}

export function ActionTile({ icon, description, asChild = false, className, children, ...props }: ActionTileProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      data-slot="action-tile"
      className={cn("flex items-center gap-3.5 rounded-lg border border-border-subtle px-5 py-4.5 font-sans transition-colors hover:bg-surface-subtle", className)}
      {...props}
    >
      <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-primary dark:text-text">
        <Icon name={icon} size={18} />
      </span>
      <Slottable child={children}>
        {(child) => (
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-base leading-sm font-semibold text-text">{child}</span>
            {description && <span className="text-xs leading-xs text-text-muted">{description}</span>}
          </span>
        )}
      </Slottable>
    </Comp>
  );
}
