import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Eyebrow } from "../../atoms";

/**
 * SectionHeader (molecule): eyebrow + title on the left, an optional aside (link, filter,
 * blurb) on the right, bottom-aligned. Pass a <Heading> as `title`.
 */
export interface SectionHeaderProps extends Omit<ComponentProps<"div">, "title"> {
  eyebrow?: ReactNode;
  title: ReactNode;
  aside?: ReactNode;
  /** e.g. hide the eyebrow on mobile: "max-md:hidden". */
  eyebrowClassName?: string;
}

export function SectionHeader({ eyebrow, title, aside, eyebrowClassName, className, ...props }: SectionHeaderProps) {
  return (
    <div data-slot="section-header" className={cn("flex items-end justify-between gap-6", className)} {...props}>
      <div className="flex flex-col gap-2.5 md:gap-4">
        {eyebrow && <Eyebrow className={eyebrowClassName}>{eyebrow}</Eyebrow>}
        {title}
      </div>
      {aside}
    </div>
  );
}
