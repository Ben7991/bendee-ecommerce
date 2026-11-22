import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";

/** TextAreaField (molecule): label + a short multi-line box (80px) for notes, e.g. delivery notes. */
export interface TextAreaFieldProps extends Omit<ComponentProps<"textarea">, "children"> {
  label: ReactNode;
  /** Classes for the outer wrapper. */
  className?: string;
  textareaClassName?: string;
}

export function TextAreaField({ label, className, textareaClassName, id: idProp, rows = 2, ...props }: TextAreaFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <div data-slot="text-area-field" className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="font-sans text-sm leading-xs font-semibold text-text">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className={cn(
          "h-20 resize-none rounded-sm border border-border bg-bg px-4 py-3 font-sans text-base leading-sm text-text outline-none transition-colors placeholder:text-text-muted",
          "focus:border-brand focus:ring-1 focus:ring-brand",
          textareaClassName,
        )}
        {...props}
      />
    </div>
  );
}
