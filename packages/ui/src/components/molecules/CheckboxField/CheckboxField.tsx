"use client";

import { useId, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Checkbox, type CheckboxProps } from "../../atoms";

/** CheckboxField (molecule): Checkbox with its label text; the whole line is clickable. */
export interface CheckboxFieldProps extends Omit<CheckboxProps, "children"> {
  label: ReactNode;
}

export function CheckboxField({ label, id: idProp, className, ...props }: CheckboxFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <div data-slot="checkbox-field" className={cn("flex items-start gap-2.5", className)}>
      <Checkbox id={id} className="mt-px" {...props} />
      <label htmlFor={id} className="font-sans text-sm leading-sm text-text-secondary">
        {label}
      </label>
    </div>
  );
}
