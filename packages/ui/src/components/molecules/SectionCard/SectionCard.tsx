import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * SectionCard (molecule): an outlined account card with a title, an optional line under it and
 * an action on the right ("Your details · Edit"). By default the content sits inside the
 * padding; `flush` rules the header off and lets ruled rows (DetailRows size="lg",
 * PreferenceToggles) run edge to edge.
 */
export interface SectionCardProps extends Omit<ComponentProps<"section">, "title"> {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  flush?: boolean;
}

export function SectionCard({ title, description, action, flush = false, className, children, ...props }: SectionCardProps) {
  const titleId = useId();
  return (
    <section
      data-slot="section-card"
      aria-labelledby={titleId}
      className={cn("flex flex-col rounded-lg border border-border-subtle font-sans", !flush && "p-4.5 md:p-6", className)}
      {...props}
    >
      <div className={cn("flex items-center justify-between gap-4", flush ? "border-b border-border-subtle px-4.5 py-4.5 md:px-6 md:py-5" : "pb-1 md:pb-2")}>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2
            id={titleId}
            className={cn(
              "text-text",
              flush ? "text-lg leading-base font-semibold" : "text-lg leading-base font-medium tracking-snug md:text-xl md:leading-2xl",
            )}
          >
            {title}
          </h2>
          {description && <p className="text-sm leading-sm text-text-muted">{description}</p>}
        </div>
        {action && <div className="shrink-0 text-sm leading-xs">{action}</div>}
      </div>
      {children}
    </section>
  );
}
