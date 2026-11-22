import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Heading } from "../../atoms";

/**
 * CheckoutStep (organism): the open checkout step: a card with an evergreen edge.
 *   768px up: numbered title and description, body indented under the title, footer row
 *             (note + continue button)
 *   mobile:   a larger editorial title (`compactTitle`, e.g. "Where to <em>deliver?</em>"),
 *             no footer (the page shows a StickyActionBar)
 */
export interface CheckoutStepProps extends Omit<ComponentProps<"section">, "title"> {
  number: number;
  title: string;
  description?: ReactNode;
  compactTitle?: ReactNode;
  compactDescription?: ReactNode;
  /** Top-right, e.g. a "Use my location" button. */
  action?: ReactNode;
  /** 768px up: the row under the body (note on the left, button on the right). */
  footer?: ReactNode;
}

export function CheckoutStep({
  number,
  title,
  description,
  compactTitle,
  compactDescription,
  action,
  footer,
  className,
  children,
  ...props
}: CheckoutStepProps) {
  return (
    <section
      data-slot="checkout-step"
      aria-label={title}
      className={cn(
        "flex flex-col gap-4 rounded-md border-field border-primary bg-bg px-4 py-5 font-sans md:gap-6 md:rounded-lg md:px-6 md:pt-6 md:pb-8",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3 md:justify-start md:gap-4">
        <span className="hidden size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm leading-xs font-bold text-accent md:flex">
          {number}
        </span>
        <div className="flex min-w-0 flex-col gap-0.5 md:flex-1 md:gap-1">
          {compactTitle ? (
            <>
              <Heading as="h2" size="dialog" className="text-2xl leading-2xl md:hidden">
                {compactTitle}
              </Heading>
              <h2 className="hidden text-lg leading-base font-semibold text-text md:block">{title}</h2>
            </>
          ) : (
            <h2 className="text-lg leading-base font-semibold text-text">{title}</h2>
          )}
          {compactDescription && <p className="text-sm leading-xs text-text-muted md:hidden">{compactDescription}</p>}
          {description && <p className="hidden text-base leading-sm text-text-muted md:block">{description}</p>}
        </div>
        {action}
      </div>
      <div className="flex flex-col gap-4 md:pl-11">{children}</div>
      {footer && <div className="hidden items-center justify-between gap-4 pt-2 pl-11 md:flex">{footer}</div>}
    </section>
  );
}
