import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

export interface SearchTip {
  icon: IconName;
  title: string;
  text: ReactNode;
  /** A TextLink under the text ("Take the wellness quiz"). */
  action?: ReactNode;
}

/**
 * SearchTips (organism): help when a search finds nothing (Paper Search — No results).
 *   mobile:  one "Try this" box with short bullet points (`compactTips`)
 *   tablet:  the tip cards stacked
 *   desktop: the tip cards in a row
 */
export interface SearchTipsProps extends ComponentProps<"section"> {
  tips: SearchTip[];
  /** Mobile title. */
  compactTitle?: string;
  /** Mobile bullet points. */
  compactTips: ReactNode[];
}

export function SearchTips({ tips, compactTitle = "Try this", compactTips, className, ...props }: SearchTipsProps) {
  return (
    <section data-slot="search-tips" aria-label="Search tips" className={cn("px-5 pt-6 font-sans md:px-8 md:pt-4 xl:px-14", className)} {...props}>
      <div className="flex flex-col gap-2.5 rounded-lg bg-surface-subtle p-4.5 md:hidden">
        <h2 className="text-base leading-sm font-semibold text-text">{compactTitle}</h2>
        <ul className="flex flex-col gap-2.5">
          {compactTips.map((tip, index) => (
            <li key={index} className="flex items-center gap-2 text-sm leading-sm text-text-secondary [&_a]:font-semibold [&_a]:text-brand [&_a]:underline">
              <span aria-hidden className="size-1.25 shrink-0 rounded-full bg-brand" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="hidden flex-col gap-3 md:flex xl:flex-row xl:gap-4">
        {tips.map((tip) => (
          <li key={tip.title} className="flex flex-1 items-start gap-4 rounded-xl bg-surface-subtle p-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-primary dark:text-brand">
              <Icon name={tip.icon} size={20} />
            </span>
            <div className="flex flex-col gap-2">
              <h2 className="text-md leading-sm font-semibold text-text">{tip.title}</h2>
              <p className="text-sm leading-sm text-text-secondary">{tip.text}</p>
              {tip.action}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
