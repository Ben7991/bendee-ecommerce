import type { ComponentProps } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * Breadcrumbs (molecule): "Home › Shop › All supplements" above a page title. Compose with
 * BreadcrumbItem and pass your router's link through `asChild`; the last item is `current`.
 *   <Breadcrumbs>
 *     <BreadcrumbItem asChild><Link href="/">Home</Link></BreadcrumbItem>
 *     <BreadcrumbItem current>All supplements</BreadcrumbItem>
 *   </Breadcrumbs>
 * 12px on mobile, 13px from 768px.
 */
export type BreadcrumbsProps = ComponentProps<"nav">;

export function Breadcrumbs({ className, children, ...props }: BreadcrumbsProps) {
  return (
    <nav data-slot="breadcrumbs" aria-label="Breadcrumb" className={className} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5 md:gap-2">{children}</ol>
    </nav>
  );
}

export interface BreadcrumbItemProps extends ComponentProps<"a">, AsChildProps {
  /** The page you're on: bold, not a link, aria-current="page". */
  current?: boolean;
  /** Classes for the list item (e.g. `hidden md:flex` to drop the current page on mobile). */
  itemClassName?: string;
}

export function BreadcrumbItem({ current = false, asChild = false, className, itemClassName, children, ...props }: BreadcrumbItemProps) {
  const Comp = current ? "span" : asChild ? Slot : "a";
  return (
    <li className={cn("group/crumb flex items-center gap-1.5 md:gap-2", itemClassName)}>
      <Icon name="chevronRight" size={12} strokeWidth={2.4} className="size-2.5 text-text-muted group-first/crumb:hidden md:size-3" />
      <Comp
        data-slot="breadcrumb-item"
        aria-current={current ? "page" : undefined}
        className={cn(
          "font-sans text-xs leading-xs md:text-sm",
          current ? "font-semibold text-text" : "font-medium text-text-muted transition-colors hover:text-text",
          className,
        )}
        {...props}
      >
        <Slottable>{children}</Slottable>
      </Comp>
    </li>
  );
}
