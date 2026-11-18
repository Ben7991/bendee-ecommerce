import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Input } from "../../atoms";

/**
 * TextField (molecule): label + bordered 52px input box + optional hint, for forms (auth,
 * checkout). The box gets a 2px brand edge while focused and an error edge when the input is
 * `aria-invalid`. Use PasswordField / PhoneField for those inputs.
 */
export interface TextFieldProps extends Omit<ComponentProps<"input">, "size" | "children"> {
  label: ReactNode;
  /** Right side of the label row, e.g. a "Forgot password?" TextLink. */
  labelAction?: ReactNode;
  /** Inside the box after the input, e.g. a show-password toggle. */
  trailing?: ReactNode;
  /** Before the input inside the box, e.g. a country code. */
  leading?: ReactNode;
  /** Line under the box. */
  hint?: ReactNode;
  hintTone?: "muted" | "success" | "error";
  /** Extra content under the box (e.g. PasswordStrength). */
  children?: ReactNode;
  /** Box height: 52px (default) or 56px (phone). */
  boxSize?: "md" | "lg";
  /** Classes for the outer wrapper. */
  className?: string;
  inputClassName?: string;
}

const HINT_TONE = {
  muted: "text-text-muted",
  success: "text-brand",
  error: "text-error",
} as const;

export function TextField({
  label,
  labelAction,
  trailing,
  leading,
  hint,
  hintTone = "muted",
  children,
  boxSize = "md",
  className,
  inputClassName,
  id: idProp,
  ...inputProps
}: TextFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = hint ? `${id}-hint` : undefined;
  const invalid = inputProps["aria-invalid"] === true || inputProps["aria-invalid"] === "true";

  return (
    <div data-slot="text-field" className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="font-sans text-sm leading-xs font-semibold text-text">
          {label}
        </label>
        {labelAction}
      </div>
      <div
        data-slot="text-field-box"
        className={cn(
          "flex shrink-0 items-center gap-3 rounded-sm border border-border bg-bg px-4 transition-colors",
          "focus-within:border-brand focus-within:ring-1 focus-within:ring-brand",
          invalid && "border-error ring-1 ring-error focus-within:border-error focus-within:ring-error",
          boxSize === "lg" ? "h-14" : "h-13",
        )}
      >
        {leading}
        <Input
          id={id}
          size="lg"
          aria-describedby={hintId}
          className={cn("h-full", inputClassName)}
          {...inputProps}
        />
        {trailing}
      </div>
      {children}
      {hint && (
        <p id={hintId} className={cn("font-sans text-xs leading-xs", HINT_TONE[hintTone])}>
          {hint}
        </p>
      )}
    </div>
  );
}
