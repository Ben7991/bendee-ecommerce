import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * SelectField (molecule): label + a native <select> styled like TextField (52px, 50px on mobile),
 * with Jofak's chevron. Native so phones show their own picker. `leading` sits before the value
 * (e.g. a network colour dot).
 */
export interface SelectFieldProps extends Omit<ComponentProps<"select">, "children"> {
  label: ReactNode;
  options: Array<{ value: string; label: string }>;
  leading?: ReactNode;
  /** Classes for the outer wrapper. */
  className?: string;
}

export function SelectField({ label, options, leading, className, id: idProp, ...props }: SelectFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <div data-slot="select-field" className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label htmlFor={id} className="font-sans text-sm leading-xs font-semibold text-text">
        {label}
      </label>
      <div className="relative flex h-12.5 items-center gap-2 rounded-sm border border-border bg-bg px-3 transition-colors focus-within:border-brand focus-within:ring-1 focus-within:ring-brand md:h-13 md:px-4">
        {leading}
        <select
          id={id}
          className="h-full w-0 min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-6 font-sans text-base leading-sm text-text outline-none"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" size={14} className="pointer-events-none absolute right-3 size-3 text-text-muted md:right-4 md:size-3.5" />
      </div>
    </div>
  );
}
