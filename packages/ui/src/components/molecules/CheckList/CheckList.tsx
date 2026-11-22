import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/** CheckList (molecule): benefit bullets with a ringed check, as in the hero. */
export interface CheckListProps extends Omit<ComponentProps<"ul">, "children"> {
  items: ReactNode[];
}

export function CheckList({ items, className, ...props }: CheckListProps) {
  return (
    <ul data-slot="check-list" className={cn("flex flex-col gap-3.5", className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-3 font-sans text-base leading-4.5 font-medium text-text">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-brand">
            <Icon name="check" size={12} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
