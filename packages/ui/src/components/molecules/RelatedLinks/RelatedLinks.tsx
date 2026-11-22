import type { ComponentProps } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * RelatedLinks (molecule): "Related: Sleep & Stress 14 · Adaptogens 6 …" under a search heading.
 * Outlined chips from 768px; white chips that scroll sideways on mobile (where the label is
 * hidden). Compose with RelatedLink and pass links through `asChild`.
 */
export interface RelatedLinksProps extends ComponentProps<"nav"> {
  /** Visible from 768px, e.g. "Related:". */
  label?: string;
}

export function RelatedLinks({ label = "Related:", className, children, ...props }: RelatedLinksProps) {
  return (
    <nav data-slot="related-links" aria-label={label.replace(/:$/, "")} className={cn("min-w-0", className)} {...props}>
      <ul className="scrollbar-none flex items-center gap-2 overflow-x-auto">
        <li aria-hidden className="hidden shrink-0 pr-1 font-sans text-sm leading-xs text-text-muted md:block">
          {label}
        </li>
        {children}
      </ul>
    </nav>
  );
}

export interface RelatedLinkProps extends ComponentProps<"a">, AsChildProps {
  count?: number;
  /** Leads elsewhere (the journal): an ↗ instead of a count. */
  external?: boolean;
  /** Classes for the list item (e.g. `hidden md:block`). */
  itemClassName?: string;
}

export function RelatedLink({ count, external = false, asChild = false, itemClassName, className, children, ...props }: RelatedLinkProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <li className={cn("shrink-0", itemClassName)}>
      <Comp
        data-slot="related-link"
        className={cn(
          "flex items-center gap-1.5 rounded-full bg-bg px-3.5 py-2.25 font-sans text-sm leading-xs font-medium whitespace-nowrap text-text transition-colors hover:bg-surface-subtle",
          "md:gap-2 md:border md:border-border md:py-2",
          className,
        )}
        {...props}
      >
        <Slottable>{children}</Slottable>
        {external ? (
          <Icon name="arrowUpRight" size={12} strokeWidth={2.2} className="text-text-muted" />
        ) : (
          count !== undefined && (
            <span className="text-xs leading-xs font-regular text-text-muted">
              <span className="sr-only">(</span>
              {count}
              <span className="sr-only">)</span>
            </span>
          )
        )}
      </Comp>
    </li>
  );
}
