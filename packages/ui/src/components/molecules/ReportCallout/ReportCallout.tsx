import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";

/**
 * ReportCallout (molecule): the dark insight panel on a report (Paper Jofak - Admin → Reports:
 * "Biggest leak", "Best return"): a lime eyebrow, the finding in a sentence, why, and one or two
 * links (lime first, outline second; mobile keeps the first).
 */
export interface ReportCalloutProps extends Omit<ComponentProps<"section">, "title"> {
  linkAs?: LinkComponent;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  actions?: { label: string; href: string }[];
}

export function ReportCallout({ linkAs: LinkAs = "a", eyebrow, title, children, actions = [], className, ...props }: ReportCalloutProps) {
  return (
    <section data-slot="report-callout" className={cn("flex min-w-0 flex-col gap-3 rounded-18 bg-primary p-4.5 font-sans md:rounded-lg md:px-6 md:py-5", className)} {...props}>
      <p className="text-11 leading-3.5 font-semibold tracking-wide text-accent uppercase">{eyebrow}</p>
      <h2 className="text-lg leading-6 font-semibold tracking-compact text-text-inverse md:text-xl md:leading-6.5">{title}</h2>
      {children && <div className="text-sm leading-4.75 text-text-inverse-muted">{children}</div>}
      {actions.length > 0 && (
        <div className="flex flex-wrap gap-2.5 pt-1">
          {actions.map((action, index) => (
            <LinkAs
              key={action.href}
              href={action.href}
              className={cn(
                "h-9.5 items-center rounded-full px-4 text-sm leading-4.5 font-semibold",
                index === 0 ? "flex bg-accent text-on-accent hover:bg-sage-200" : "hidden border border-white/20 text-text-inverse hover:bg-white/10 md:flex",
              )}
            >
              {action.label}
            </LinkAs>
          ))}
        </div>
      )}
    </section>
  );
}
