"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { useId, useState, type ComponentProps } from "react";

import { cn } from "../../../lib";
import { optionVariants, type OptionVariantProps } from "./OptionPicker.variants";

export interface PickerOption {
  value: string;
  label: string;
  /** Card variant: second line, e.g. "GHS 18 / serving". */
  detail?: string;
  /** Card variant: pill on the top edge, e.g. "Best value". */
  badge?: string;
  /** Swatch variant: the flavour's colour, a CSS background from the catalog (e.g. a gradient). */
  swatch?: string;
  /** Sold out or not offered in this combination. */
  disabled?: boolean;
}

/**
 * OptionPicker (molecule): one product option ("Flavour: Lemon lime") as a radio group on Radix
 * RadioGroup. `swatch` draws colour pills, `card` draws two-line cards. Arrow keys move between
 * the available options. Controlled (`value`) or uncontrolled (`defaultValue`).
 */
export interface OptionPickerProps
  extends Omit<ComponentProps<typeof RadioGroup.Root>, "children" | "value" | "defaultValue" | "onValueChange">, OptionVariantProps {
  /** "Flavour", "Size". */
  label: string;
  options: PickerOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function OptionPicker({
  label,
  options,
  variant,
  value: valueProp,
  defaultValue,
  onValueChange,
  className,
  ...props
}: OptionPickerProps) {
  const id = useId();
  const [inner, setInner] = useState(defaultValue ?? options.find((option) => !option.disabled)?.value);
  const value = valueProp ?? inner;
  const selected = options.find((option) => option.value === value);

  return (
    <div data-slot="option-picker" className={cn("flex flex-col gap-3", className)}>
      <p id={`${id}-label`} className="font-sans text-sm leading-xs text-text-muted">
        {label}: {selected && <strong className="font-semibold text-text">{selected.label}</strong>}
      </p>
      <RadioGroup.Root
        aria-labelledby={`${id}-label`}
        value={value}
        onValueChange={(next) => {
          if (valueProp === undefined) setInner(next);
          onValueChange?.(next);
        }}
        // Swatches stay on one row on mobile and scroll; the padding keeps the selected ring visible.
        className={cn(
          "flex gap-2",
          variant === "card" ? "flex-wrap" : "scrollbar-none -m-0.5 overflow-x-auto p-0.5 md:flex-wrap md:overflow-visible",
        )}
        {...props}
      >
        {options.map((option) => (
          <RadioGroup.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            aria-label={option.disabled ? `${option.label} (unavailable)` : undefined}
            className={optionVariants({ variant })}
          >
            {variant === "card" ? (
              <>
                <span className="text-base leading-4.5 font-semibold">{option.label}</span>
                {option.detail && <span className="text-sm leading-xs text-text-muted">{option.detail}</span>}
                {option.badge && (
                  <span className="absolute -top-2.5 right-3 rounded-full bg-primary px-2 py-0.75 text-11 leading-3.5 font-semibold text-accent">
                    {option.badge}
                  </span>
                )}
              </>
            ) : (
              <>
                {/* The swatch colour is catalog data, so it comes in as a style, not a token. */}
                <span
                  aria-hidden
                  className="size-4.5 shrink-0 rounded-full bg-border md:size-5"
                  style={option.swatch ? { background: option.swatch } : undefined}
                />
                <span className={cn(option.disabled && "text-text-muted line-through")}>{option.label}</span>
              </>
            )}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
}
