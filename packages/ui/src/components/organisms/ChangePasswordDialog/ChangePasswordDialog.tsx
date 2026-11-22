"use client";

import { useId, useState, type ReactElement } from "react";

import { cn } from "../../../lib";
import { Icon, Switch } from "../../atoms";
import { OtpField, SecurityDialog, SecurityDialogFooter, securityButton } from "../../molecules";

/**
 * ChangePasswordDialog (organism): change your own password (Paper Jofak - Admin → My profile →
 * Change password): current password, the new one with a strength meter and the rules it must
 * meet, typing it again, a code from the authenticator app, and whether to sign out other
 * devices. Change password unlocks once everything checks out. Posts `current`, `password`,
 * `confirm`, `code` and `signOutOthers` to `action`; the server checks the current password and
 * whether the new one was used before, and passes back `error`.
 */
export interface ChangePasswordDialogProps {
  trigger?: ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  action?: string | ((formData: FormData) => void | Promise<void>);
  /** "Last changed 12 Oct". */
  lastChanged: string;
  /** "iPhone · Safari" — the other devices that will need the new password. */
  otherDevices?: string;
  /** Words the password mustn't contain (name, email). */
  forbidden?: string[];
  minLength?: number;
  /** Shown above the fields after a failed attempt. */
  error?: string;
  className?: string;
}

const score = (password: string, minLength: number): 0 | 1 | 2 | 3 | 4 => {
  if (!password) return 0;
  let points = password.length >= minLength ? 2 : password.length >= 8 ? 1 : 0;
  if (password.length >= minLength + 4) points += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[\d\W]/.test(password)) points += 1;
  return Math.min(4, points) as 0 | 1 | 2 | 3 | 4;
};
const STRENGTH = ["", "Too weak", "Fair", "Strong", "Very strong"];

function PasswordInput({ id, label, name, value, onChange, autoComplete, trailing }: { id: string; label: string; name: string; value: string; onChange: (value: string) => void; autoComplete: string; trailing?: ReactElement }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm leading-4.5 font-semibold text-text-secondary">
        {label}
      </label>
      <span className="flex h-11 items-center gap-2.5 rounded-sm border border-border bg-bg px-3.5 focus-within:border-field focus-within:border-primary dark:bg-bg dark:focus-within:border-brand">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-14 leading-5 text-text outline-none"
        />
        {trailing ?? (
          <button type="button" aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible} onClick={() => setVisible(!visible)} className="text-text-muted hover:text-text">
            <Icon name={visible ? "eyeOff" : "eye"} size={16} />
          </button>
        )}
      </span>
    </div>
  );
}

export function ChangePasswordDialog({ trigger, open, onOpenChange, action, lastChanged, otherDevices, forbidden = [], minLength = 12, error, className }: ChangePasswordDialogProps) {
  const id = useId();
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");
  const strength = score(password, minLength);
  const lower = password.toLowerCase();
  const rules = [
    { label: `At least ${minLength} characters`, met: password.length >= minLength },
    { label: "Not one you’ve used on Jofak before", met: password.length > 0 && password !== current, pending: true },
    { label: "Doesn’t contain your name or email", met: password.length > 0 && !forbidden.some((word) => word.length > 2 && lower.includes(word.toLowerCase())) },
  ];
  const matches = confirm.length > 0 && confirm === password;
  const ready = current.length > 0 && rules.every((rule) => rule.met) && matches && code.length === 6;
  const bar = strength >= 3 ? "bg-brand" : strength === 2 ? "bg-warning" : "bg-error";

  return (
    <SecurityDialog trigger={trigger} open={open} onOpenChange={onOpenChange} icon="lock" title="Change your password" description={<><span className="md:hidden">{lastChanged}</span><span className="hidden md:inline">{lastChanged} · you’ll stay signed in here</span></>} className={className}>
      <form action={action} className="flex flex-col">
        <div className="flex flex-col gap-3.5 px-5 pt-1 pb-5.5 md:gap-4 md:px-6">
          {error && (
            <p role="alert" className="flex items-start gap-2 rounded-sm bg-tint-citrus px-3.5 py-2.5 text-sm leading-4.5 text-error">
              <Icon name="alertCircle" size={15} className="mt-px shrink-0" />
              {error}
            </p>
          )}
          <PasswordInput id={`${id}-current`} label="Current password" name="current" value={current} onChange={setCurrent} autoComplete="current-password" />
          <div className="flex flex-col gap-2">
            <PasswordInput id={`${id}-new`} label="New password" name="password" value={password} onChange={setPassword} autoComplete="new-password" />
            <div className="flex items-center gap-2.5" aria-live="polite">
              <span aria-hidden className="flex flex-1 gap-1">
                {[1, 2, 3, 4].map((step) => (
                  <span key={step} className={cn("h-1 flex-1 rounded-full", step <= strength ? bar : "bg-surface dark:bg-border")} />
                ))}
              </span>
              <span className={cn("w-20 text-right text-xs leading-xs font-semibold", strength >= 3 ? "text-brand" : strength === 2 ? "text-warning-text" : "text-error")}>{STRENGTH[strength]}</span>
            </div>
            <ul className="flex flex-col gap-1">
              {rules.map((rule) => (
                <li key={rule.label} className={cn("flex items-center gap-2 text-xs leading-xs", rule.met ? "text-text-secondary" : "text-text-muted")}>
                  {rule.met ? <Icon name="check" size={12} strokeWidth={2.2} className="text-brand" /> : <span aria-hidden className="mx-1 size-1 rounded-full bg-text-muted" />}
                  {rule.label}
                  <span className="sr-only">{rule.met ? " (done)" : " (not yet)"}</span>
                </li>
              ))}
            </ul>
          </div>
          <PasswordInput
            id={`${id}-confirm`}
            label="Type it again"
            name="confirm"
            value={confirm}
            onChange={setConfirm}
            autoComplete="new-password"
            trailing={confirm ? <span className={cn("text-xs leading-xs font-semibold", matches ? "text-brand" : "text-error")}>{matches ? "Matches" : "Doesn’t match"}</span> : undefined}
          />
        </div>
        <div className="flex flex-col gap-3.5 bg-surface-subtle px-5 py-4.5 md:px-6 dark:bg-surface-subtle">
          <div className="flex flex-col gap-2">
            <p className="text-sm leading-4.5 font-semibold text-text-secondary">Code from your authenticator app</p>
            <OtpField name="code" size="sm" label="Code from your authenticator app" value={code} onChange={setCode} />
          </div>
          <label className="flex items-center gap-3">
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-14 leading-5 font-semibold text-text">Sign out of other devices</span>
              {otherDevices && <span className="text-xs leading-xs text-text-muted">{otherDevices} will need the new password</span>}
            </span>
            <Switch name="signOutOthers" aria-label="Sign out of other devices" defaultChecked className="data-[state=checked]:bg-primary" />
          </label>
        </div>
        <SecurityDialogFooter note="We’ll email you that it changed">
          <button type="button" onClick={() => onOpenChange?.(false)} className={securityButton("secondary")}>
            Cancel
          </button>
          <button type="submit" disabled={!ready} className={securityButton("primary")}>
            Change password
          </button>
        </SecurityDialogFooter>
      </form>
    </SecurityDialog>
  );
}
