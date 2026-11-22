"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type ComponentProps,
  type KeyboardEvent,
} from "react";

import { cn } from "../../../lib";

/**
 * OtpField (molecule): one box per digit for SMS codes. Typing moves forward, Backspace moves
 * back, arrows move between boxes, and pasting (or the SMS autofill on the first box) fills all
 * of them. With `name`, a hidden input carries the joined code for form posts.
 */
export interface OtpFieldProps extends Omit<ComponentProps<"div">, "onChange" | "defaultValue"> {
  /** Accessible name for the group. */
  label?: string;
  length?: number;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Called once every box holds a digit. */
  onComplete?: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  /** `sm`: 48px mono boxes for admin dialogs (authenticator codes). */
  size?: "lg" | "sm";
}

const onlyDigits = (text: string) => text.replace(/\D/g, "");

export function OtpField({
  label = "Verification code",
  length = 6,
  name,
  value: valueProp,
  defaultValue = "",
  onChange,
  onComplete,
  disabled,
  autoFocus,
  size = "lg",
  className,
  ...props
}: OtpFieldProps) {
  const [uncontrolled, setUncontrolled] = useState(onlyDigits(defaultValue).slice(0, length));
  const value = valueProp ?? uncontrolled;
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const commit = (next: string) => {
    const clean = onlyDigits(next).slice(0, length);
    if (valueProp === undefined) setUncontrolled(clean);
    onChange?.(clean);
    if (clean.length === length) onComplete?.(clean);
  };

  const focus = (index: number) => inputs.current[Math.max(0, Math.min(length - 1, index))]?.focus();

  // Focus moves after the new value renders, so the focus guard below sees the updated length.
  const pendingFocus = useRef<number | null>(null);
  const focusAfterRender = (index: number) => {
    pendingFocus.current = index;
  };
  useLayoutEffect(() => {
    if (pendingFocus.current === null) return;
    focus(pendingFocus.current);
    pendingFocus.current = null;
  });

  const setDigitsAt = (index: number, digits: string) => {
    const chars = value.padEnd(length, " ").split("");
    digits.split("").forEach((digit, offset) => {
      if (index + offset < length) chars[index + offset] = digit;
    });
    commit(chars.join("").replace(/\s+$/, "").replace(/\s/g, ""));
    focusAfterRender(index + digits.length);
  };

  const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (value[index]) commit(value.slice(0, index) + value.slice(index + 1));
      else if (index > 0) {
        commit(value.slice(0, index - 1) + value.slice(index));
        focusAfterRender(index - 1);
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focus(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focus(index + 1);
    }
  };

  const handlePaste = (index: number) => (event: ClipboardEvent<HTMLInputElement>) => {
    const digits = onlyDigits(event.clipboardData.getData("text"));
    if (!digits) return;
    event.preventDefault();
    setDigitsAt(index, digits);
  };

  // The first empty box is the active one: you can't skip ahead and leave gaps.
  const activeIndex = Math.min(value.length, length - 1);

  return (
    <div
      data-slot="otp-field"
      role="group"
      aria-label={label}
      className={cn("flex", size === "sm" ? "gap-1.5 md:gap-2" : "gap-2 md:gap-2.5", className)}
      {...props}
    >
      {Array.from({ length }, (_, index) => {
        const digit = value[index] ?? "";
        return (
          <input
            key={index}
            ref={(element) => {
              inputs.current[index] = element;
            }}
            aria-label={`Digit ${index + 1} of ${length}`}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            pattern="[0-9]*"
            maxLength={index === 0 ? length : 1}
            autoFocus={autoFocus && index === activeIndex}
            disabled={disabled}
            value={digit}
            data-filled={digit ? "" : undefined}
            tabIndex={index === activeIndex ? 0 : -1}
            onFocus={(event) => {
              if (index > value.length) focus(value.length);
              else event.currentTarget.select();
            }}
            onChange={(event) => {
              const digits = onlyDigits(event.currentTarget.value);
              if (digits) setDigitsAt(index, digit && digits.length > 1 ? digits.slice(-1) : digits);
            }}
            onKeyDown={handleKeyDown(index)}
            onPaste={handlePaste(index)}
            className={cn(
              "w-0 min-w-0 flex-1 rounded-sm border-field border-border bg-bg text-center text-text caret-brand outline-none transition-colors dark:bg-bg",
              size === "sm" ? "h-12 font-mono text-xl leading-6" : "h-16 font-sans text-3xl leading-3xl font-medium",
              "data-filled:bg-surface-subtle",
              "focus:border-2 focus:border-brand focus:bg-bg",
              "disabled:opacity-muted",
            )}
          />
        );
      })}
      {name && <input type="hidden" name={name} value={value} />}
    </div>
  );
}
