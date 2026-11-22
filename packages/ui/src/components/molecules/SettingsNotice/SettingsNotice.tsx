import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

/**
 * SettingsNotice (molecule): a one-line note across a settings page (Paper Jofak - Admin →
 * Settings): green for how something works ("Orders go out through your courier partner…"),
 * amber for a caution ("Rates are set here, not in code…").
 */
export interface SettingsNoticeProps extends Omit<ComponentProps<"p">, "children"> {
  tone?: "info" | "warning";
  icon?: IconName;
  children: ReactNode;
}

export function SettingsNotice({ tone = "info", icon, children, className, ...props }: SettingsNoticeProps) {
  return (
    <p
      data-slot="settings-notice"
      className={cn(
        "flex items-center gap-3 rounded-md px-4 py-3 font-sans text-sm leading-4.75 md:rounded-14 md:leading-4.5",
        tone === "warning" ? "bg-tint-sun text-text" : "border border-sage-200 bg-sage-50 text-text",
        className,
      )}
      {...props}
    >
      <Icon name={icon ?? (tone === "warning" ? "warning" : "truck")} size={18} strokeWidth={1.4} className={cn("shrink-0", tone === "warning" ? "text-warning-text" : "text-brand")} />
      <span>{children}</span>
    </p>
  );
}
