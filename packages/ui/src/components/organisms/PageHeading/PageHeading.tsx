import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Heading } from "../../atoms";

/**
 * PageHeading (organism): a page's title row: big title, a short line under it, and an optional
 * action on the right from 768px (e.g. "‹ Continue shopping"). Used by the cart.
 */
export interface PageHeadingProps extends Omit<ComponentProps<"div">, "title"> {
  /** Wrap the accent word in <em>. */
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export function PageHeading({ title, description, action, className, ...props }: PageHeadingProps) {
  return (
    <div
      data-slot="page-heading"
      className={cn(
        "flex flex-col gap-1.5 px-5 pt-6 pb-4 md:flex-row md:items-end md:justify-between md:gap-6 md:px-10 md:pb-8 xl:px-14",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-1.5 md:gap-2">
        <Heading as="h1" className="text-40 leading-11 md:text-4xl md:leading-4xl xl:text-5xl xl:leading-5xl">
          {title}
        </Heading>
        {description && <p className="font-sans text-sm leading-xs text-text-muted md:text-md md:leading-sm">{description}</p>}
      </div>
      {action && <div className="hidden shrink-0 md:block">{action}</div>}
    </div>
  );
}
