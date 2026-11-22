import type { ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

/**
 * SecurityRow (molecule): one sign-in item on My profile or a staff member (Paper Jofak - Admin →
 * My profile → Sign-in & security): an icon tile, what it is (password, authenticator app,
 * backup codes, a signed-in device), a line on its state and the actions. `compactDescription`
 * replaces the line on mobile; rows after the first are divided.
 */
export interface SecurityRowProps {
  icon: IconName;
  /** `sage`: switched on (authenticator app). */
  iconTone?: "muted" | "sage";
  title: ReactNode;
  /** Next to the title ("● On"). */
  badge?: ReactNode;
  description?: ReactNode;
  compactDescription?: ReactNode;
  actions?: ReactNode;
  divided?: boolean;
  className?: string;
}

export function SecurityRow({ icon, iconTone = "muted", title, badge, description, compactDescription, actions, divided = false, className }: SecurityRowProps) {
  return (
    <div data-slot="security-row" className={cn("flex items-center gap-3 py-3 font-sans md:gap-3.5 md:py-3.5", divided && "border-t border-border-subtle", className)}>
      <span aria-hidden className={cn("flex size-9 shrink-0 items-center justify-center rounded-10", iconTone === "sage" ? "bg-sage-100 text-brand" : "bg-surface-subtle text-text-muted dark:bg-surface")}>
        <Icon name={icon} size={16} strokeWidth={1.4} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex flex-wrap items-center gap-x-2 text-14 leading-5 font-semibold text-text">
          {title}
          {badge && <span className="text-xs leading-xs font-semibold text-brand">{badge}</span>}
        </span>
        {description && (
          <>
            <span className={cn("truncate text-xs leading-xs text-text-muted", compactDescription !== undefined && "hidden md:block")}>{description}</span>
            {compactDescription !== undefined && <span className="truncate text-xs leading-xs text-text-muted md:hidden">{compactDescription}</span>}
          </>
        )}
      </span>
      {actions && <span className="flex shrink-0 items-center gap-1 md:gap-2">{actions}</span>}
    </div>
  );
}
