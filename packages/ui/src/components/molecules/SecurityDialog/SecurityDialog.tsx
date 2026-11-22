"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

/**
 * SecurityDialog (molecule): the frame of the My profile sign-in dialogs (Paper Jofak - Admin →
 * My profile → Change password, Move to a new phone, New backup codes): an icon tile, the title
 * and a line under it, a close button, then the dialog's own body and footer. A bottom sheet on
 * mobile, a 520px dialog from 768px. Open it with `trigger`, or control it with `open`.
 */
export interface SecurityDialogProps extends Omit<ComponentProps<"div">, "title"> {
  trigger?: ReactElement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  icon: IconName;
  /** `sage`: something switched on (authenticator app). */
  iconTone?: "muted" | "sage";
  title: ReactNode;
  description?: ReactNode;
}

export function SecurityDialog({ trigger, open, defaultOpen, onOpenChange, icon, iconTone = "muted", title, description, className, children, ...props }: SecurityDialogProps) {
  return (
    <Dialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-evergreen-950/45 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/55" />
        <Dialog.Content
          data-slot="security-dialog"
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex max-h-dvh flex-col overflow-y-auto rounded-t-xl bg-bg font-sans outline-none dark:bg-surface dark:ring-1 dark:ring-border",
            "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
            "md:inset-x-auto md:top-1/2 md:bottom-auto md:left-1/2 md:w-130 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:shadow-modal",
            "md:data-[state=closed]:animate-dialog-out md:data-[state=open]:animate-dialog-in",
            className,
          )}
          {...props}
        >
          <div className="flex items-start gap-3.5 px-5 pt-5 pb-3.5 md:px-6 md:pt-6 md:pb-4">
            <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-sm", iconTone === "sage" ? "bg-sage-100 text-brand" : "bg-surface-subtle text-text-muted dark:bg-bg")}>
              <Icon name={icon} size={18} strokeWidth={1.4} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.75">
              <Dialog.Title className="text-xl leading-6.5 font-semibold tracking-snug text-text">{title}</Dialog.Title>
              {description ? <Dialog.Description className="text-sm leading-4.5 text-text-muted">{description}</Dialog.Description> : <Dialog.Description className="sr-only">{title}</Dialog.Description>}
            </div>
            <Dialog.Close aria-label="Close" className="flex size-8 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-surface-subtle hover:text-text">
              <Icon name="close" size={14} strokeWidth={1.6} />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** The footer row of a SecurityDialog: small print on the left, buttons on the right (stacked on mobile). */
export function SecurityDialogFooter({ note, children, className }: { note?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col-reverse gap-2.5 border-t border-border-subtle px-5 pt-3.5 pb-7 md:flex-row md:items-center md:justify-between md:px-6 md:pt-4 md:pb-5", className)}>
      {note && <p className="text-center text-xs leading-xs text-text-muted md:text-left">{note}</p>}
      <div className="flex gap-2.5 md:ml-auto">{children}</div>
    </div>
  );
}

/** Footer buttons: `primary` (filled) or `secondary` (outlined). Full width on mobile. */
export const securityButton = (tone: "primary" | "secondary") =>
  cn(
    "flex h-12 flex-1 items-center justify-center rounded-full px-5 text-base leading-5 font-semibold md:h-11 md:flex-none md:text-14 md:leading-4.5",
    tone === "primary" ? "bg-primary text-on-primary hover:bg-primary-hover disabled:bg-surface-subtle disabled:text-text-muted" : "border border-border text-text hover:bg-surface-subtle",
  );
