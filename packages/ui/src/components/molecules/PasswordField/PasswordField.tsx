"use client";

import { useState, type ReactNode } from "react";

import { Icon } from "../../atoms";
import { PasswordStrength, type PasswordStrengthProps } from "../PasswordStrength";
import { TextField, type TextFieldProps } from "../TextField";

/**
 * PasswordField (molecule): TextField for passwords with a show/hide toggle, and optionally the
 * strength meter (new passwords) or a "matches" tick (confirm fields). It only displays the
 * strength and match state it is given.
 */
export interface PasswordFieldProps extends Omit<TextFieldProps, "type" | "trailing" | "children"> {
  strength?: Pick<PasswordStrengthProps, "score" | "label" | "checks">;
  /** Confirm fields: true shows the brand tick and `matchHint`. */
  matched?: boolean;
  matchHint?: ReactNode;
}

export function PasswordField({
  strength,
  matched = false,
  matchHint = "Passwords match",
  hint,
  hintTone,
  autoComplete = "current-password",
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      autoComplete={autoComplete}
      hint={matched ? matchHint : hint}
      hintTone={matched ? "success" : hintTone}
      trailing={
        matched ? (
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-text-inverse">
            <Icon name="check" size={11} strokeWidth={3.2} />
          </span>
        ) : (
          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            onClick={() => setVisible((value) => !value)}
            className="-mr-1 flex size-8 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:text-text"
          >
            <Icon name={visible ? "eyeOff" : "eye"} />
          </button>
        )
      }
    >
      {strength && <PasswordStrength {...strength} />}
    </TextField>
  );
}
