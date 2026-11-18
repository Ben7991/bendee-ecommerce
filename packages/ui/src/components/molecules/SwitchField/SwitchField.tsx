"use client";

import { useId, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Switch, type SwitchProps } from "../../atoms";

/** SwitchField (molecule): a Switch with its label text; the label toggles it too. */
export interface SwitchFieldProps extends Omit<SwitchProps, "children"> {
  label: ReactNode;
}

export function SwitchField({ label, id: idProp, className, ...props }: SwitchFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <div data-slot="switch-field" className={cn("flex items-center gap-3", className)}>
      <Switch id={id} {...props} />
      <label htmlFor={id} className="font-sans text-sm leading-sm text-text md:text-base">
        {label}
      </label>
    </div>
  );
}
