"use client";

import { useState, type ReactElement } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";
import { OtpField, SecurityDialog, SecurityDialogFooter, securityButton } from "../../molecules";

/**
 * MoveAuthenticatorDialog (organism): move sign-in codes to a new phone (Paper Jofak - Admin → My
 * profile → Move to a new phone), in three steps: confirm it's you with a code from the current
 * phone, scan the QR code (or type the key) on the new phone, then enter a code from the new
 * phone. The old phone keeps working until step 3 succeeds. Each step posts `step` (and `code`)
 * to `action`; Back is a link.
 */
export interface MoveAuthenticatorDialogProps {
  linkAs?: LinkComponent;
  trigger?: ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  action?: string | ((formData: FormData) => void | Promise<void>);
  step: 1 | 2 | 3;
  /** The key to type by hand ("JFK4 7QX2 M9PL 3RWA"). */
  secret: string;
  /** The QR code for `secret`, as an image or SVG node. */
  qr: ReactElement;
  /** Where Back goes on steps 2 and 3. */
  backHref?: string;
  error?: string;
  className?: string;
}

const STEPS = [
  { label: "Confirm it’s you", short: "Confirm" },
  { label: "Scan", short: "Scan" },
  { label: "Enter new code", short: "New code" },
];

export function MoveAuthenticatorDialog({ linkAs: LinkAs = "a", trigger, open, onOpenChange, action, step, secret, qr, backHref, error, className }: MoveAuthenticatorDialogProps) {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const back = backHref ? (
    <LinkAs href={backHref} className={securityButton("secondary")}>
      Back
    </LinkAs>
  ) : (
    <button type="button" onClick={() => onOpenChange?.(false)} className={securityButton("secondary")}>
      Cancel
    </button>
  );

  return (
    <SecurityDialog
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      icon="shieldCheck"
      iconTone="sage"
      title="Move to a new phone"
      description={<><span className="md:hidden">Your old phone works until this is done</span><span className="hidden md:inline">Your old phone keeps working until this is done</span></>}
      className={className}
    >
      <form action={action} className="flex flex-col">
        <input type="hidden" name="step" value={step} />
        <ol aria-label="Steps" className="flex items-center gap-2 px-5 pb-4.5 md:px-6">
          {STEPS.map((item, index) => {
            const number = index + 1;
            const done = number < step;
            const current = number === step;
            return (
              <li key={item.label} aria-current={current ? "step" : undefined} className={cn("flex items-center gap-2", index > 0 && "flex-1")}>
                {index > 0 && <span aria-hidden className="h-px flex-1 bg-border" />}
                <span className={cn("flex items-center gap-1.5 text-xs leading-xs whitespace-nowrap", done ? "font-semibold text-brand" : current ? "font-semibold text-text" : "font-medium text-text-muted")}>
                  <span className={cn("flex size-5 items-center justify-center rounded-full text-11 leading-3.5", done ? "bg-sage-100 text-brand" : current ? "bg-primary text-on-primary" : "border border-border")}>
                    {done ? <Icon name="check" size={10} strokeWidth={2.4} /> : number}
                  </span>
                  <span className="md:hidden">{item.short}</span>
                  <span className="hidden md:inline">{item.label}</span>
                </span>
              </li>
            );
          })}
        </ol>

        {error && (
          <p role="alert" className="mx-5 mb-3 flex items-start gap-2 rounded-sm bg-tint-citrus px-3.5 py-2.5 text-sm leading-4.5 text-error md:mx-6">
            <Icon name="alertCircle" size={15} className="mt-px shrink-0" />
            {error}
          </p>
        )}

        {step === 2 ? (
          <div className="flex flex-col items-stretch gap-4 px-5 pt-1 pb-5.5 md:flex-row md:items-center md:gap-5 md:px-6">
            <span className="flex size-42 shrink-0 items-center justify-center self-center rounded-md bg-white ring-1 ring-border">{qr}</span>
            <div className="flex min-w-0 flex-col gap-3">
              <ol className="flex flex-col gap-2 text-sm leading-4.5 text-text-secondary">
                <li className="flex gap-2.5">
                  <span className="w-4.5 shrink-0 font-bold text-text">1.</span>On your new phone, open Google Authenticator or another authenticator app
                </li>
                <li className="flex gap-2.5">
                  <span className="w-4.5 shrink-0 font-bold text-text">2.</span>
                  <span>
                    Tap <strong className="font-semibold text-text">+</strong>, then scan this code
                  </span>
                </li>
              </ol>
              <div className="flex flex-col gap-1 rounded-sm bg-surface-subtle px-3 py-2.5 dark:bg-bg">
                <p className="text-11 leading-3.5 font-semibold tracking-overline text-text-muted uppercase">Can’t scan? Type this key</p>
                <p className="flex items-center justify-between gap-2">
                  <code className="font-mono text-sm leading-4.5 text-text">{secret}</code>
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard?.writeText(secret.replace(/\s/g, ""));
                      setCopied(true);
                    }}
                    className="text-xs leading-xs font-semibold text-brand"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-5 pt-1 pb-5.5 md:px-6">
            <p className="text-sm leading-4.5 font-semibold text-text-secondary">{step === 1 ? "Code from your current phone" : "Code from your new phone"}</p>
            <OtpField name="code" size="sm" autoFocus label={step === 1 ? "Code from your current phone" : "Code from your new phone"} value={code} onChange={setCode} />
            <p className="text-xs leading-xs text-text-muted">{step === 1 ? "Open your authenticator app and type the 6-digit code for Jofak." : "The new phone shows a 6-digit code for Jofak once it has scanned."}</p>
          </div>
        )}

        <p className="flex gap-2.5 bg-tint-sun px-5 py-3 text-xs leading-4.25 text-warning-text md:px-6">
          <Icon name="warning" size={16} strokeWidth={1.4} className="shrink-0" />
          Once you confirm the new phone, codes from your old phone stop working. Your backup codes stay the same.
        </p>

        <SecurityDialogFooter note={`Step ${step} of 3`}>
          {step === 1 ? (
            <button type="button" onClick={() => onOpenChange?.(false)} className={securityButton("secondary")}>
              Cancel
            </button>
          ) : (
            back
          )}
          <button type="submit" disabled={step !== 2 && code.length !== 6} className={securityButton("primary")}>
            {step === 1 ? "Continue" : step === 2 ? "I’ve scanned it" : "Confirm new phone"}
          </button>
        </SecurityDialogFooter>
      </form>
    </SecurityDialog>
  );
}
