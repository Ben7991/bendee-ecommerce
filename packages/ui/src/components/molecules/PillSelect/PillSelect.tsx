"use client";

import { useState, type ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";
import { pillSelectVariants, type PillSelectVariantProps } from "./PillSelect.variants";

export interface PillSelectOption {
  value: string;
  label: string;
}

/**
 * PillSelect (molecule): a pill that shows the chosen option ("Sort: Featured ⌄") over an
 * invisible native <select>, so phones get their own picker and keyboards work as usual.
 * For form fields with a visible label use SelectField.
 */
export interface PillSelectProps
  extends Omit<ComponentProps<"select">, "children" | "value" | "defaultValue" | "onChange">, PillSelectVariantProps {
  options: PillSelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Muted text before the value, e.g. "Sort:". */
  prefix?: string;
  /** Accessible name, e.g. "Sort products". */
  label: string;
  /** Classes for the pill. */
  className?: string;
}

export function PillSelect({
  options,
  value: valueProp,
  defaultValue,
  onValueChange,
  prefix,
  label,
  variant,
  className,
  ...props
}: PillSelectProps) {
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value ?? "");
  const value = valueProp ?? inner;
  const selected = options.find((option) => option.value === value) ?? options[0];

  return (
    <div data-slot="pill-select" className={cn(pillSelectVariants({ variant }), className)}>
      {prefix && <span className="text-text-muted">{prefix}</span>}
      <span aria-hidden className="font-semibold">
        {selected?.label}
      </span>
      {variant === "block" ? (
        <Icon name="sort" size={14} />
      ) : (
        <Icon name="chevronDown" size={14} strokeWidth={2.4} className={variant === "compact" ? "size-3" : undefined} />
      )}
      <select
        aria-label={label}
        value={value}
        onChange={(event) => {
          if (valueProp === undefined) setInner(event.target.value);
          onValueChange?.(event.target.value);
        }}
        className="absolute inset-0 size-full cursor-pointer appearance-none rounded-full opacity-0"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
