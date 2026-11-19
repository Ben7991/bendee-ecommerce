import type { ComponentProps, ReactNode } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon } from "../../atoms";
import { addTileVariants, type AddTileVariantProps } from "./AddTile.variants";

/**
 * AddTile (molecule): a dashed "add one more" tile ("Add a new address", "Subscribe to another
 * product"). A link or button: pass yours through `asChild`; its text is the title.
 */
export interface AddTileProps extends ComponentProps<"a">, AddTileVariantProps, AsChildProps {
  /** Second line, size lg only. */
  description?: ReactNode;
}

export function AddTile({ description, size, asChild = false, className, children, ...props }: AddTileProps) {
  const Comp = asChild ? Slot : "a";
  const lg = size !== "sm";
  return (
    <Comp data-slot="add-tile" className={cn(addTileVariants({ size }), className)} {...props}>
      {lg ? (
        <span aria-hidden className="flex size-11 items-center justify-center rounded-full bg-surface text-primary dark:text-text">
          <Icon name="plus" size={18} strokeWidth={2.4} />
        </span>
      ) : (
        <Icon name="plus" size={14} strokeWidth={2.4} />
      )}
      <Slottable child={children}>
        {(child) =>
          lg ? (
            <span className="flex flex-col gap-1">
              <span className="text-base leading-sm font-semibold text-text">{child}</span>
              {description && <span className="text-sm leading-xs text-text-muted">{description}</span>}
            </span>
          ) : (
            <span>{child}</span>
          )
        }
      </Slottable>
    </Comp>
  );
}
