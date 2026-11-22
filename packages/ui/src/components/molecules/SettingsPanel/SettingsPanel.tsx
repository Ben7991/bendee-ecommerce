import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Switch } from "../../atoms";

/**
 * SettingsPanel (molecule): a soft grey box grouping an option with its own fields (Paper Jofak -
 * Admin → Settings → Delivery: Standard delivery, Express) — a title with a switch, then the
 * fields that apply when it's on.
 */
export interface SettingsPanelProps extends Omit<ComponentProps<"div">, "title"> {
  title: ReactNode;
  /** The switch: its field name and starting state. */
  toggle?: { name: string; defaultChecked?: boolean; label?: string };
}

export function SettingsPanel({ title, toggle, className, children, ...props }: SettingsPanelProps) {
  return (
    <div data-slot="settings-panel" className={cn("flex flex-col gap-3 rounded-14 bg-surface-subtle p-3.5", className)} {...props}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-14 leading-5 font-semibold text-text">{title}</p>
        {toggle && (
          <Switch name={toggle.name} defaultChecked={toggle.defaultChecked} aria-label={toggle.label ?? (typeof title === "string" ? title : undefined)} className="data-[state=checked]:bg-primary" />
        )}
      </div>
      {children}
    </div>
  );
}
