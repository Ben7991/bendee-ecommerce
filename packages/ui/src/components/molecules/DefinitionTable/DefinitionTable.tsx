import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * DefinitionTable (molecule): a bordered list of terms and what they mean, e.g. "What we
 * collect" in the privacy policy. Term above its description on mobile; side by side, with a
 * 180px term column, from 768px.
 */
export interface DefinitionItem {
  term: ReactNode;
  description: ReactNode;
}

export interface DefinitionTableProps extends Omit<ComponentProps<"dl">, "children"> {
  items: DefinitionItem[];
}

export function DefinitionTable({ items, className, ...props }: DefinitionTableProps) {
  return (
    <dl
      data-slot="definition-table"
      className={cn("overflow-hidden rounded-md border border-border-subtle font-sans text-base leading-5.5", className)}
      {...props}
    >
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-1 border-b border-border-subtle px-4 py-3.5 last:border-0 md:flex-row md:gap-5 md:px-5">
          <dt className="shrink-0 font-semibold text-text md:w-45">{item.term}</dt>
          <dd className="min-w-0 flex-1 text-text-secondary">{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}
