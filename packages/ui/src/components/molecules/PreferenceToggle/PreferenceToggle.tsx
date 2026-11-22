"use client";

import { useId, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Switch, type SwitchProps } from "../../atoms";

/**
 * PreferenceToggle (molecule): a ruled row with a setting, a line about it and a Switch on the
 * right ("Email newsletter · Opted in 13 Nov 2026 at checkout"). Stack them inside a flush
 * SectionCard. For a switch with a short inline label use SwitchField.
 */
export interface PreferenceToggleProps extends Omit<SwitchProps, "children" | "title"> {
  title: ReactNode;
  description?: ReactNode;
  /** Classes for the row. */
  rowClassName?: string;
}

export function PreferenceToggle({ title, description, rowClassName, disabled, ...props }: PreferenceToggleProps) {
  const titleId = useId();
  const descriptionId = useId();
  return (
    <div data-slot="preference-toggle" className={cn("flex items-center gap-4 border-b border-border-subtle px-4.5 py-3.5 font-sans last:border-0 md:px-6 md:py-4", rowClassName)}>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p id={titleId} className="text-base leading-sm text-text">
          {title}
        </p>
        {description && (
          <p id={descriptionId} className="text-xs leading-xs text-text-muted">
            {description}
          </p>
        )}
      </div>
      <Switch aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined} disabled={disabled} {...props} />
    </div>
  );
}

