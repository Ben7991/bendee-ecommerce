"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

import { cn } from "../../../lib";
import { Button, Icon, IconButton, PaymentBadge, type PaymentBrand } from "../../atoms";
import { ChoiceCards } from "../../molecules";

/**
 * CancelOrderDialog (organism): "Cancel this order?" on Radix Dialog (Paper Account → Cancel
 * order modal / sheet).
 *   mobile:         a bottom sheet; Cancel order above Keep my order
 *   tablet/desktop: a centred 480px card; Keep my order beside Cancel order
 * The reasons are a required radio list posted as `reason` with the form `action`. Only offer it
 * before packing starts.
 */
export interface CancelOrderDialogProps {
  /** The button that opens it. */
  trigger?: ReactNode;
  open?: boolean;
  /** Open on load, uncontrolled (e.g. from a ?cancel link). */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** "JFK-250184 · we haven't started packing yet". */
  description: ReactNode;
  reasons: Array<{ value: string; label: string }>;
  defaultReason?: string;
  refund: { brand: PaymentBrand; text: ReactNode };
  /** Server action or URL that cancels the order. */
  action?: string | ((formData: FormData) => void | Promise<void>);
  /** Hidden fields sent with the reason (e.g. the order number). */
  fields?: Record<string, string>;
  /** "Just want to change something? Chat with us…". */
  help?: ReactNode;
  title?: ReactNode;
  className?: string;
}

export function CancelOrderDialog({
  trigger,
  open,
  defaultOpen,
  onOpenChange,
  description,
  reasons,
  defaultReason,
  refund,
  action,
  fields,
  help,
  title = "Cancel this order?",
  className,
}: CancelOrderDialogProps) {
  return (
    <Dialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-evergreen-950/55 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/65" />
        <Dialog.Content
          data-slot="cancel-order-dialog"
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 max-h-dvh overflow-y-auto rounded-t-2xl bg-bg px-5 pt-6 pb-8 font-sans outline-none dark:bg-surface",
            "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
            "md:inset-0 md:m-auto md:h-fit md:w-120 md:rounded-2xl md:p-8 md:shadow-modal",
            "md:data-[state=closed]:animate-dialog-out md:data-[state=open]:animate-dialog-in",
            className,
          )}
        >
          <form action={action} className="flex flex-col gap-5">
            {fields && Object.entries(fields).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <Dialog.Title className="text-2xl leading-2xl font-medium tracking-snug text-text">{title}</Dialog.Title>
                <Dialog.Description className="text-sm leading-sm text-text-muted">{description}</Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <IconButton label="Close" size="md" className="shrink-0">
                  <Icon name="close" size={14} />
                </IconButton>
              </Dialog.Close>
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className="pb-2 text-sm leading-xs font-semibold text-text">Why are you cancelling?</legend>
              <ChoiceCards
                name="reason"
                required
                size="sm"
                defaultValue={defaultReason}
                options={reasons.map((reason) => ({ value: reason.value, title: reason.label }))}
                className="gap-2 [&_[data-state=unchecked]_span]:font-regular"
              />
            </fieldset>

            <div className="flex items-start gap-3 rounded-md bg-surface-subtle p-4 text-sm leading-sm text-text-secondary [&_strong]:font-semibold [&_strong]:text-text">
              <PaymentBadge brand={refund.brand} size="xs" className="mt-0.5 shrink-0" />
              <p className="min-w-0 flex-1">{refund.text}</p>
            </div>

            <div className="flex flex-col-reverse gap-2.5 md:flex-row md:gap-3">
              <Dialog.Close asChild>
                <Button variant="secondary" size="md" className="md:flex-1">
                  Keep my order
                </Button>
              </Dialog.Close>
              <Button type="submit" variant="danger" size="md" className="md:flex-1">
                Cancel order
              </Button>
            </div>

            {help && <p className="text-center text-xs leading-sm text-text-muted">{help}</p>}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
