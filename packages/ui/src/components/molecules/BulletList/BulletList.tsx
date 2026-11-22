import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * BulletList (molecule): body-copy bullets with small brand dots, inside a ContentSection
 * ("Request a return within 14 days…"). Text inherits the surrounding body style. For benefit
 * checks use CheckList or KeyPoints.
 */
export interface BulletListProps extends Omit<ComponentProps<"ul">, "children"> {
  items: ReactNode[];
}

export function BulletList({ items, className, ...props }: BulletListProps) {
  return (
    <ul data-slot="bullet-list" className={cn("flex flex-col gap-2.5 pl-1", className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}
