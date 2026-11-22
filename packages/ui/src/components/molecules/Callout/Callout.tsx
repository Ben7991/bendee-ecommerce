import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

/**
 * Callout (molecule): a soft surface panel for side notes under a form, e.g. "Can't find it?"
 * tips or "Signed up with your phone?". Either a leading icon with text, or a title with a
 * checked/dotted list. Not for errors: those belong next to the field.
 */
export interface CalloutProps extends Omit<ComponentProps<"div">, "title"> {
  icon?: IconName;
  title?: ReactNode;
  items?: ReactNode[];
  marker?: "check" | "dot";
}

export function Callout({ icon, title, items, marker = "dot", className, children, ...props }: CalloutProps) {
  return (
    <div
      data-slot="callout"
      className={cn(
        "flex rounded-md bg-surface-subtle p-4 font-sans text-sm leading-sm text-text-secondary",
        icon ? "items-start gap-3" : "flex-col gap-2.5",
        className,
      )}
      {...props}
    >
      {icon && <Icon name={icon} className="text-brand" />}
      {title && <p className="font-semibold text-text">{title}</p>}
      {items && items.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {marker === "check" ? (
                <Icon name="check" size={12} strokeWidth={3} className="text-brand" />
              ) : (
                <span aria-hidden className="size-1.25 shrink-0 rounded-full bg-brand" />
              )}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {children && <div>{children}</div>}
    </div>
  );
}
