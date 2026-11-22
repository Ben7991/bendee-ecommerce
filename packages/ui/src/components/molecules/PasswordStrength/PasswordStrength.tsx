import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

export interface PasswordCheck {
  label: string;
  met: boolean;
}

/**
 * PasswordStrength (molecule): four-bar meter, a strength word and the rule checklist under a
 * password field. It only displays a `score` (0–4); computing it is the app's job.
 */
export interface PasswordStrengthProps extends ComponentProps<"div"> {
  /** 0 (empty) to 4 (very strong). */
  score: 0 | 1 | 2 | 3 | 4;
  /** e.g. "Strong", "Very strong". */
  label?: string;
  checks?: PasswordCheck[];
}

const SCORE_TONE = ["bg-border-subtle", "bg-error", "bg-warning", "bg-brand", "bg-brand"] as const;
const LABEL_TONE = ["text-text-muted", "text-error", "text-warning", "text-brand", "text-brand"] as const;

export function PasswordStrength({ score, label, checks = [], className, ...props }: PasswordStrengthProps) {
  return (
    <div data-slot="password-strength" className={cn("flex flex-col gap-1.5", className)} {...props}>
      <div className="flex h-5 items-center gap-2.5 pt-1">
        <div
          role="meter"
          aria-label="Password strength"
          aria-valuemin={0}
          aria-valuemax={4}
          aria-valuenow={score}
          aria-valuetext={label}
          className="flex flex-1 gap-1"
        >
          {[1, 2, 3, 4].map((bar) => (
            <span key={bar} className={cn("h-1 flex-1 rounded-2", bar <= score ? SCORE_TONE[score] : "bg-border-subtle")} />
          ))}
        </div>
        {label && <span className={cn("font-sans text-xs leading-xs font-semibold", LABEL_TONE[score])}>{label}</span>}
      </div>
      {checks.length > 0 && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
          {checks.map((check) => (
            <li key={check.label} className="flex items-center gap-1.5 font-sans text-xs leading-xs text-text-secondary">
              <Icon
                name={check.met ? "check" : "close"}
                size={12}
                strokeWidth={3}
                className={check.met ? "text-brand" : "text-text-muted"}
              />
              <span>
                {check.label}
                <span className="sr-only">{check.met ? " (done)" : " (not yet)"}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
