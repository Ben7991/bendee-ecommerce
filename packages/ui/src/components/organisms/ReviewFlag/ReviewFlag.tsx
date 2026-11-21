import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * ReviewFlag (organism): the citrus banner on a flagged order ("Flagged for review: high-value
 * cash on delivery") with why and what to do, and its actions (View history, Mark as reviewed).
 * Actions sit to the right from 1440px and under the text below. Pass shorter copy for mobile.
 */
export interface ReviewFlagProps extends Omit<ComponentProps<"section">, "title"> {
  title: string;
  compactTitle?: string;
  body: ReactNode;
  compactBody?: ReactNode;
  actions?: ReactNode;
}

export function ReviewFlag({ title, compactTitle, body, compactBody, actions, className, ...props }: ReviewFlagProps) {
  const titleId = useId();
  const both = (full: ReactNode, compact?: ReactNode) =>
    compact ? (
      <>
        <span className="md:hidden">{compact}</span>
        <span className="hidden md:inline">{full}</span>
      </>
    ) : (
      full
    );
  return (
    <section
      data-slot="review-flag"
      aria-labelledby={titleId}
      className={cn(
        "flex flex-col gap-3 rounded-md bg-tint-citrus p-4 font-sans text-citrus-800 md:py-3.5 md:pr-4 md:pl-4.5 xl:flex-row xl:items-center xl:gap-3.5 dark:text-error",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 gap-2.5 md:gap-3.5">
        <span className="flex shrink-0 items-start pt-0.5 text-error md:size-9 md:items-center md:justify-center md:rounded-sm md:bg-bg md:pt-0">
          <Icon name="flag" size={18} />
        </span>
        <div className="flex flex-col gap-0.5">
          <h2 id={titleId} className="text-base leading-sm font-semibold md:text-14">
            {both(title, compactTitle)}
          </h2>
          <p className="text-sm leading-4.5">{both(body, compactBody)}</p>
        </div>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2 md:pl-12.5 xl:pl-0">{actions}</div>}
    </section>
  );
}
