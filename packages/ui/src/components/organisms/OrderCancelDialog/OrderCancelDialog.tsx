"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useId, useState, type ComponentProps, type ReactElement, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, Switch } from "../../atoms";
import { ReasonPicker, type ReasonOption } from "../../molecules";

export interface DialogSwitch {
  /** Field name posted as "on" when checked. */
  name: string;
  label: string;
  detail?: ReactNode;
  defaultChecked?: boolean;
}

/**
 * OrderCancelDialog (organism): "Cancel order JFK-251477?" (Paper Jofak - Admin → Cancel order).
 * A required reason, what happens to the money, and switches for restocking and texting the
 * customer; posts to `action`. A bottom sheet on mobile, a 540px dialog from 768px.
 */
export interface OrderCancelDialogProps extends Omit<ComponentProps<"div">, "children" | "title"> {
  trigger: ReactElement;
  number: string;
  /** "Ama Boateng · GHS 596.00 · Cash on delivery". */
  summary: string;
  reasons: ReasonOption[];
  defaultReason?: string;
  /** "Nothing to refund" or where the refund goes. */
  money: { title: string; body: ReactNode };
  switches: DialogSwitch[];
  action?: string | ((formData: FormData) => void | Promise<void>);
  fields?: Record<string, string>;
  note?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function OrderCancelDialog({
  trigger,
  number,
  summary,
  reasons,
  defaultReason,
  money,
  switches,
  action,
  fields = {},
  note = "This is logged under your name.",
  open,
  defaultOpen,
  onOpenChange,
  className,
  ...props
}: OrderCancelDialogProps) {
  const [reason, setReason] = useState(defaultReason ?? "");
  const switchId = useId();
  return (
    <Dialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-evergreen-950/45 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/65" />
        <Dialog.Content
          data-slot="order-cancel-dialog"
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex max-h-dvh flex-col overflow-y-auto rounded-t-2xl bg-bg font-sans outline-none dark:bg-surface",
            "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
            "md:inset-x-auto md:top-1/2 md:bottom-auto md:left-1/2 md:max-h-dvh md:w-135 md:-translate-x-1/2 md:-translate-y-1/2 md:overflow-clip md:rounded-xl md:shadow-modal",
            "md:data-[state=closed]:animate-dialog-out md:data-[state=open]:animate-dialog-in",
            className,
          )}
          {...props}
        >
          <form action={action} className="flex min-h-0 flex-col">
            {Object.entries(fields).map(([name, value]) => (
              <input key={name} type="hidden" name={name} value={value} />
            ))}
            <div className="flex items-start gap-3.5 px-4 pt-6 md:px-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-14 bg-tint-citrus text-error">
                <Icon name="closeCircle" size={20} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <Dialog.Title className="text-xl leading-6.5 font-semibold tracking-compact text-text">Cancel order {number}?</Dialog.Title>
                <Dialog.Description className="text-14 leading-sm text-text-muted">{summary}</Dialog.Description>
              </div>
              <Dialog.Close aria-label="Close" className="flex size-8 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-surface-subtle">
                <Icon name="close" size={16} strokeWidth={1.6} />
              </Dialog.Close>
            </div>

            <div className="flex flex-col gap-5 overflow-y-auto px-4 pt-5.5 pb-6 md:px-6">
              <ReasonPicker name="reason" options={reasons} value={reason} onValueChange={setReason} />
              <div className="flex gap-3 rounded-md bg-surface-subtle px-4 py-3.5">
                <Icon name="info" size={18} strokeWidth={1.8} className="mt-px text-text-secondary" />
                <p className="flex flex-col gap-0.5">
                  <strong className="text-14 leading-sm font-semibold text-text">{money.title}</strong>
                  <span className="text-sm leading-4.5 text-text-secondary">{money.body}</span>
                </p>
              </div>
              {switches.length > 0 && (
                <ul className="flex flex-col rounded-md border border-border-subtle">
                  {switches.map((item, index) => (
                    <li key={item.name} className="flex items-center gap-3.5 border-border-subtle px-4 py-3.5 not-first:border-t">
                      <label htmlFor={`${switchId}-${index}`} className="flex min-w-0 flex-1 cursor-pointer flex-col gap-0.5">
                        <span className="text-14 leading-sm font-semibold text-text">{item.label}</span>
                        {item.detail && <span className="text-sm leading-4.5 text-text-muted">{item.detail}</span>}
                      </label>
                      <Switch id={`${switchId}-${index}`} name={item.name} defaultChecked={item.defaultChecked} />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-border-subtle bg-surface-subtle px-4 pt-4 pb-8 md:flex-row md:items-center md:justify-between md:px-6 md:py-4">
              <p className="text-center text-xs leading-xs text-text-muted md:text-left">{note}</p>
              <div className="flex shrink-0 gap-2.5">
                <Dialog.Close className="flex h-13 flex-1 items-center justify-center rounded-full border border-border bg-bg px-4.5 text-base leading-4.5 font-semibold text-text hover:bg-surface-subtle md:h-11 md:flex-none md:text-14">
                  Keep order
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={!reason}
                  className="flex h-13 flex-1 items-center justify-center rounded-full bg-error px-5 text-base leading-4.5 font-semibold text-text-inverse transition-colors hover:bg-error/90 disabled:opacity-muted md:h-11 md:flex-none md:text-14"
                >
                  Cancel order
                </button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
