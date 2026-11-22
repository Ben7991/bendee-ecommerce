"use client";

import { useId, useState, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * SettingsField (molecule): a labelled settings input (Paper Jofak - Admin → Settings): text,
 * number, email or a select, with an optional prefix ("+233", "GHS"), something on the right
 * ("Approved", "Replace"), monospace for codes and keys, a second line (GhanaPost GPS under an
 * address) and a hint. Once changed it shows "Edited · was …" in amber and an outlined box, so
 * staff see what they're about to save. `readOnly` fields sit on grey and aren't submitted.
 */
export interface SettingsFieldProps {
  label: ReactNode;
  name?: string;
  defaultValue?: string;
  type?: "text" | "email" | "number" | "tel" | "url" | "time";
  placeholder?: string;
  prefix?: ReactNode;
  /** Right side: a status ("Approved") or a link ("Replace"). */
  aside?: ReactNode;
  mono?: boolean;
  readOnly?: boolean;
  /** Lock icon before a read-only value (secrets). */
  locked?: boolean;
  /** A select instead of a text box. */
  options?: { value: string; label: string }[];
  /** A second input inside the same box (GhanaPost GPS). */
  extra?: { name: string; defaultValue?: string; placeholder?: string; label: string };
  hint?: ReactNode;
  /** Show "Edited · was …" when the value changes (default on for editable fields). */
  trackEdits?: boolean;
  /** Show "52 / 60" by the label (green, amber when over). */
  counter?: number;
  /** A text area with this many rows. */
  rows?: number;
  className?: string;
}

export function SettingsField({
  label,
  name,
  defaultValue = "",
  type = "text",
  placeholder,
  prefix,
  aside,
  mono = false,
  readOnly = false,
  locked = false,
  options,
  extra,
  hint,
  trackEdits = true,
  counter,
  rows,
  className,
}: SettingsFieldProps) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);
  const edited = trackEdits && !readOnly && value !== defaultValue;
  const shownWas = options?.find((option) => option.value === defaultValue)?.label ?? defaultValue;
  const input = cn("min-w-0 flex-1 bg-transparent text-14 leading-5 text-text outline-none placeholder:text-text-muted", mono && "font-mono text-sm leading-4.5", edited && "font-semibold");

  return (
    <div className={cn("flex min-w-0 flex-1 basis-0 flex-col gap-1.5", className)}>
      <span className="flex flex-wrap items-center gap-1.5">
        <label htmlFor={id} className="text-sm leading-4.5 font-semibold text-text-secondary">
          {label}
        </label>
        {counter !== undefined && (
          <span className={cn("ml-auto order-last text-xs leading-xs font-semibold", value.length > counter ? "text-warning-text" : "text-brand")}>
            {value.length} / {counter}
          </span>
        )}
        {edited && (
          <span className="flex items-center gap-1.5 text-xs leading-xs font-semibold text-warning">
            <span aria-hidden className="size-1.5 rounded-full bg-warning" />
            Edited · was {shownWas || "empty"}
          </span>
        )}
      </span>
      <div
        className={cn(
          "flex min-h-10.5 flex-col justify-center rounded-sm px-3 md:min-h-11 md:px-3.5",
          extra ? "gap-0.5 py-2.5" : "",
          readOnly ? "border border-border bg-surface-subtle" : edited ? "border-field border-primary ring-3 ring-sage-100" : "border border-border focus-within:border-primary",
        )}
      >
        <span className="flex items-center gap-2">
          {locked && <Icon name="lock" size={14} strokeWidth={1.4} className="shrink-0 text-text-muted" />}
          {prefix && <span className="shrink-0 text-14 leading-5 font-medium text-text-muted">{prefix}</span>}
          {rows ? (
            <textarea id={id} name={name} rows={rows} value={value} placeholder={placeholder} onChange={(event) => setValue(event.target.value)} className={cn(input, "field-sizing-content resize-none py-2.5")} />
          ) : options ? (
            <span className="relative flex min-w-0 flex-1 items-center">
              <select id={id} name={name} value={value} onChange={(event) => setValue(event.target.value)} className={cn(input, "cursor-pointer appearance-none pr-6")}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" size={10} strokeWidth={1.4} className="pointer-events-none absolute right-0 text-text-muted" />
            </span>
          ) : (
            <input
              id={id}
              name={readOnly ? undefined : name}
              type={type}
              value={value}
              readOnly={readOnly}
              placeholder={placeholder}
              onChange={(event) => setValue(event.target.value)}
              className={cn(input, readOnly && (locked ? "text-text-muted" : ""))}
            />
          )}
          {aside && <span className="shrink-0 text-xs leading-xs font-semibold">{aside}</span>}
        </span>
        {extra && (
          <input
            name={extra.name}
            aria-label={extra.label}
            defaultValue={extra.defaultValue}
            placeholder={extra.placeholder}
            className="bg-transparent font-mono text-xs leading-xs text-text-muted outline-none"
          />
        )}
      </div>
      {hint && <p className="text-xs leading-xs text-text-muted">{hint}</p>}
    </div>
  );
}
