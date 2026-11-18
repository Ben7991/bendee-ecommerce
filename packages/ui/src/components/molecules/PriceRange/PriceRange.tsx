"use client";

import { useId, useState, type ComponentProps } from "react";

import { cn } from "../../../lib";

export type PriceRangeValue = [number, number];

/**
 * PriceRange (molecule): a two-thumb slider with Min / Max boxes under it (Paper PLP → Price).
 * The thumbs are two native range inputs stacked on one track, so keyboard, touch and screen
 * readers work out of the box. Controlled (`value` + `onValueChange`) or uncontrolled
 * (`defaultValue`). `onValueCommit` fires when a thumb is released or a box loses focus.
 */
export interface PriceRangeProps extends Omit<ComponentProps<"div">, "defaultValue" | "onChange"> {
  min: number;
  max: number;
  step?: number;
  value?: PriceRangeValue;
  defaultValue?: PriceRangeValue;
  onValueChange?: (value: PriceRangeValue) => void;
  onValueCommit?: (value: PriceRangeValue) => void;
  /** Used in the thumbs' accessible names: "Minimum price", "Maximum price". */
  label?: string;
}

const thumb =
  "pointer-events-none absolute inset-0 h-5 w-full cursor-pointer appearance-none bg-transparent outline-none " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-brand [&::-webkit-slider-thumb]:bg-bg [&::-webkit-slider-thumb]:shadow-xs " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-brand [&::-moz-range-thumb]:bg-bg [&::-moz-range-thumb]:shadow-xs " +
  "[&::-moz-range-track]:bg-transparent focus-visible:[&::-webkit-slider-thumb]:outline-2 focus-visible:[&::-webkit-slider-thumb]:outline-offset-2 focus-visible:[&::-webkit-slider-thumb]:outline-brand";

const box =
  "flex min-w-0 flex-1 flex-col gap-0.5 rounded-md border border-border px-3.5 py-2.5 transition-colors focus-within:border-brand";

export function PriceRange({
  min,
  max,
  step = 10,
  value: valueProp,
  defaultValue,
  onValueChange,
  onValueCommit,
  label = "price",
  className,
  ...props
}: PriceRangeProps) {
  const id = useId();
  const [inner, setInner] = useState<PriceRangeValue>(defaultValue ?? [min, max]);
  const value = valueProp ?? inner;
  const [low, high] = value;
  // What's typed in the boxes, applied on blur so "1" on the way to "150" doesn't jump the thumb.
  const [draft, setDraft] = useState<[string, string]>([String(low), String(high)]);
  // Follow the thumbs (and outside changes): reset the boxes whenever the value moves.
  const [shown, setShown] = useState<PriceRangeValue>(value);
  if (shown[0] !== low || shown[1] !== high) {
    setShown([low, high]);
    setDraft([String(low), String(high)]);
  }

  const set = (next: PriceRangeValue) => {
    if (valueProp === undefined) setInner(next);
    onValueChange?.(next);
  };
  const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
  const percent = (n: number) => (max === min ? 0 : (n - min) / (max - min));

  const commitBox = (index: 0 | 1) => {
    const typed = Number(draft[index]);
    if (draft[index].trim() === "" || Number.isNaN(typed)) {
      setDraft([String(low), String(high)]);
      return;
    }
    const next: PriceRangeValue = index === 0 ? [clamp(typed, min, high), high] : [low, clamp(typed, low, max)];
    set(next);
    setDraft([String(next[0]), String(next[1])]);
    onValueCommit?.(next);
  };

  return (
    <div data-slot="price-range" className={cn("flex flex-col gap-5", className)} {...props}>
      <div className="relative h-5 w-full">
        <div aria-hidden className="absolute inset-x-0 top-2 h-1 rounded-full bg-surface" />
        {/* Thumb centres travel from 10px to (100% − 10px), so the fill does too. */}
        <div
          aria-hidden
          className="absolute top-2 h-1 rounded-full bg-brand"
          style={{
            left: `calc(10px + ${percent(low)} * (100% - 20px))`,
            right: `calc(10px + ${1 - percent(high)} * (100% - 20px))`,
          }}
        />
        <input
          type="range"
          aria-label={`Minimum ${label}`}
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={(event) => set([Math.min(Number(event.target.value), high), high])}
          onPointerUp={() => onValueCommit?.(value)}
          onKeyUp={() => onValueCommit?.(value)}
          className={thumb}
        />
        <input
          type="range"
          aria-label={`Maximum ${label}`}
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={(event) => set([low, Math.max(Number(event.target.value), low)])}
          onPointerUp={() => onValueCommit?.(value)}
          onKeyUp={() => onValueCommit?.(value)}
          className={thumb}
        />
      </div>

      <div className="flex items-center gap-3">
        {(["Min", "Max"] as const).map((name, index) => (
          <div key={name} className="contents">
            {index === 1 && (
              <span aria-hidden className="font-sans text-base leading-4.5 text-text-muted">
                –
              </span>
            )}
            <label htmlFor={`${id}-${name}`} className={box}>
              <span className="font-sans text-xs leading-xs text-text-muted">{name}</span>
              <input
                id={`${id}-${name}`}
                inputMode="numeric"
                aria-label={`${index === 0 ? "Minimum" : "Maximum"} ${label}`}
                value={draft[index]}
                onChange={(event) => {
                  const next: [string, string] = [...draft];
                  next[index] = event.target.value.replace(/[^\d]/g, "");
                  setDraft(next);
                }}
                onBlur={() => commitBox(index as 0 | 1)}
                onKeyDown={(event) => event.key === "Enter" && commitBox(index as 0 | 1)}
                className="w-full min-w-0 bg-transparent font-sans text-base leading-4.5 font-semibold text-text outline-none"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
