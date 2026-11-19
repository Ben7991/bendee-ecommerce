import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * KeyPoints (molecule): the sage "The short version" / "Key points" summary at the top of a
 * policy page: a title and checked points. Keep it to four or five plain-English lines.
 */
export interface KeyPointsProps extends Omit<ComponentProps<"section">, "title" | "children"> {
  title: ReactNode;
  items: ReactNode[];
}

export function KeyPoints({ title, items, className, ...props }: KeyPointsProps) {
  const titleId = useId();
  return (
    <section
      data-slot="key-points"
      aria-labelledby={titleId}
      className={cn("flex flex-col gap-3.5 rounded-xl bg-sage-100 p-5 font-sans md:px-7 md:py-6", className)}
      {...props}
    >
      <h2 id={titleId} className="text-lg leading-base font-semibold text-primary dark:text-text">
        {title}
      </h2>
      <ul className="flex flex-col gap-3.5">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3 text-base leading-5.5 text-text md:text-md md:leading-base">
            <Icon name="check" size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand md:mt-0.75" />
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
