import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * NumberedPoints (molecule): "01 Genuine, or your money back" promises on the About page: a
 * brand-green number, a bold title and a line of copy, ruled between items. For checkout-style
 * steps use NumberedSteps.
 */
export interface NumberedPoint {
  title: ReactNode;
  text: ReactNode;
}

export interface NumberedPointsProps extends Omit<ComponentProps<"ol">, "children"> {
  items: NumberedPoint[];
}

export function NumberedPoints({ items, className, ...props }: NumberedPointsProps) {
  return (
    <ol data-slot="numbered-points" className={cn("flex flex-col gap-5 font-sans", className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 border-b border-border-subtle pb-5 last:border-0 last:pb-0 md:gap-5">
          <span aria-hidden className="w-6 shrink-0 text-sm leading-base font-semibold text-brand md:w-8">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="text-md leading-base font-semibold text-text md:text-lg">{item.title}</p>
            <p className="text-base leading-base text-text-secondary md:text-md md:leading-6.5">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
