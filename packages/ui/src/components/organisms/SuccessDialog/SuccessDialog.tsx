"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

import { cn } from "../../../lib";
import { Heading, Icon, IconButton } from "../../atoms";

/**
 * SuccessDialog (organism): confirms a finished task ("Password updated") on Radix Dialog.
 *   mobile 390:  bottom sheet with a grab handle
 *   tablet/desktop: centred 440px card with a close button
 * Controlled: the app opens it once the task succeeds. Put the next step in `action`
 * (usually a full-width Button) and an escape hatch in `footer` ("Contact support").
 * Design source: Paper "Jofak" → Authentication → Reset success (modal / sheet).
 */
export interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Wrap the accent word in <em>. */
  title: ReactNode;
  description: ReactNode;
  action: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function SuccessDialog({ open, onOpenChange, title, description, action, footer, className }: SuccessDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          data-slot="success-dialog-overlay"
          className="fixed inset-0 z-50 bg-evergreen-950/55 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/55"
        />
        <Dialog.Content
          data-slot="success-dialog"
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-4.5 rounded-t-2xl bg-bg px-5 pt-3 pb-9 text-center font-sans outline-none dark:bg-surface",
            "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
            "md:inset-0 md:m-auto md:h-fit md:w-110 md:gap-5 md:rounded-2xl md:px-9 md:pt-10 md:pb-8 md:shadow-modal",
            "md:data-[state=closed]:animate-dialog-out md:data-[state=open]:animate-dialog-in",
            className,
          )}
        >
          <span aria-hidden className="h-1.25 w-10 shrink-0 rounded-full bg-border md:hidden" />

          <span
            aria-hidden
            className="mt-3 flex size-20 shrink-0 items-center justify-center rounded-full bg-sage-50 md:mt-0 md:size-22"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-accent text-primary md:size-15">
              <Icon name="check" size={28} strokeWidth={2.6} className="size-6.5 md:size-7" />
            </span>
          </span>

          <div className="flex flex-col items-center gap-2">
            <Dialog.Title asChild>
              <Heading as="h2" size="dialog">
                {title}
              </Heading>
            </Dialog.Title>
            <Dialog.Description className="max-w-80 text-sm leading-sm text-text-secondary md:max-w-85 md:text-base">
              {description}
            </Dialog.Description>
          </div>

          <div className="mt-1 flex flex-col self-stretch gap-2.5 md:mt-0 md:pt-1">{action}</div>

          {footer && <div className="text-xs leading-xs text-text-muted">{footer}</div>}

          <Dialog.Close asChild>
            <IconButton label="Close" size="md" className="absolute top-4 right-4 hidden md:inline-flex">
              <Icon name="close" size={14} />
            </IconButton>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
