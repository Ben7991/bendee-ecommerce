import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * SettingsCard (molecule): one group of settings (Paper Jofak - Admin → Settings): a title, a line
 * on what it affects, an optional action (a link like "+ Add"), and the fields. `tone="muted"`
 * is the soft grey panel (This month, Example). `eyebrow` sits above the title ("Editing zone").
 */
export interface SettingsCardProps extends Omit<ComponentProps<"section">, "title"> {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: string;
  action?: ReactNode;
  /** `dashed`: something coming soon. */
  tone?: "plain" | "muted" | "dashed";
}

export function SettingsCard({ title, description, eyebrow, action, tone = "plain", className, children, ...props }: SettingsCardProps) {
  return (
    <section
      data-slot="settings-card"
      className={cn(
        "flex min-w-0 flex-col gap-3.5 rounded-18 p-4 font-sans md:gap-4 md:rounded-lg md:px-6 md:py-5.5",
        tone === "muted" ? "bg-surface-subtle" : tone === "dashed" ? "border border-dashed border-border" : "border border-border-subtle",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          {eyebrow && <p className="text-11 leading-3.5 font-semibold tracking-overline text-text-muted uppercase">{eyebrow}</p>}
          <h2 className="text-base leading-5 font-semibold tracking-compact text-text md:text-17 md:leading-6">{title}</h2>
          {description && <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-4.5">{description}</p>}
        </div>
        {action && <div className="shrink-0 text-sm leading-4.5 font-semibold text-brand">{action}</div>}
      </div>
      {children}
    </section>
  );
}
