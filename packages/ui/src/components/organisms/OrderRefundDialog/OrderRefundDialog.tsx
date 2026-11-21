"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useId, useState, type ComponentProps, type ReactElement, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Checkbox, Icon, PaymentBadge, Switch, type PaymentBrand } from "../../atoms";
import { QuantityStepper, ReasonPicker, type ReasonOption } from "../../molecules";

export interface RefundLine {
  id: string;
  name: string;
  /** Price of one unit. */
  unitPrice: number;
  bought: number;
  tint?: "sage" | "amber" | "lavender" | "sun";
  image?: ReactNode;
  /** Units preselected for refund. */
  defaultQuantity?: number;
}

const TINT = { sage: "bg-sage-100", amber: "bg-tint-amber", lavender: "bg-tint-lavender", sun: "bg-tint-sun" } as const;

/**
 * OrderRefundDialog (organism): "Refund JFK-251482" (Paper Jofak - Admin → Refund). Pick how many
 * of each line to refund and whether to restock it, optionally the delivery fee, a required
 * reason and the amount (it follows the lines until edited; at most what was paid). The money
 * goes back to the original method. Posts `line` (id:qty:restock), `delivery`, `reason` and
 * `amount` to `action`. A bottom sheet on mobile, a 640px dialog from 768px.
 */
export interface OrderRefundDialogProps extends Omit<ComponentProps<"div">, "children" | "title"> {
  trigger: ReactElement;
  number: string;
  /** "Kwame Asante · Paid GHS 412.00 with MTN MoMo · Delivered" (mobile: `compactSummary`). */
  summary: string;
  compactSummary?: string;
  lines: RefundLine[];
  deliveryFee?: number;
  /** What was paid: the most that can be refunded. */
  paid: number;
  currency?: string;
  reasons: ReasonOption[];
  defaultReason?: string;
  method: { brand: PaymentBrand; name: string; detail: string };
  /** Amounts above this need an admin's approval (shown in the footer). */
  approvalThreshold?: number;
  action?: string | ((formData: FormData) => void | Promise<void>);
  fields?: Record<string, string>;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function OrderRefundDialog({
  trigger,
  number,
  summary,
  compactSummary,
  lines,
  deliveryFee = 0,
  paid,
  currency = "GHS",
  reasons,
  defaultReason,
  method,
  approvalThreshold,
  action,
  fields = {},
  open,
  defaultOpen,
  onOpenChange,
  className,
  ...props
}: OrderRefundDialogProps) {
  const amountId = useId();
  const money = (value: number) => `${currency} ${value.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const [quantities, setQuantities] = useState<Record<string, number>>(() => Object.fromEntries(lines.map((line) => [line.id, line.defaultQuantity ?? 0])));
  const [restock, setRestock] = useState<Record<string, boolean>>({});
  const [delivery, setDelivery] = useState(false);
  const [reason, setReason] = useState(defaultReason ?? "");
  const [typed, setTyped] = useState<string | null>(null);

  const computed = Math.min(paid, lines.reduce((sum, line) => sum + line.unitPrice * (quantities[line.id] ?? 0), 0) + (delivery ? deliveryFee : 0));
  const amountText = typed ?? computed.toFixed(2);
  const amount = Number(amountText);
  const valid = Number.isFinite(amount) && amount > 0 && amount <= paid && Boolean(reason);
  const setQuantity = (id: string, next: number) => {
    setQuantities({ ...quantities, [id]: next });
    setTyped(null);
  };

  return (
    <Dialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-evergreen-950/45 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/65" />
        <Dialog.Content
          data-slot="order-refund-dialog"
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex max-h-dvh flex-col overflow-y-auto rounded-t-2xl bg-bg font-sans outline-none dark:bg-surface",
            "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
            "md:inset-x-auto md:top-1/2 md:bottom-auto md:left-1/2 md:max-h-dvh md:w-160 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:shadow-modal",
            "md:data-[state=closed]:animate-dialog-out md:data-[state=open]:animate-dialog-in",
            className,
          )}
          {...props}
        >
          <form action={action} className="flex flex-col">
            {Object.entries(fields).map(([name, value]) => (
              <input key={name} type="hidden" name={name} value={value} />
            ))}
            {lines.map((line) =>
              (quantities[line.id] ?? 0) > 0 ? (
                <input key={line.id} type="hidden" name="line" value={`${line.id}:${quantities[line.id]}:${restock[line.id] ? 1 : 0}`} />
              ) : null,
            )}

            <div className="flex items-start gap-3.5 px-4 pt-6 md:px-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-14 bg-sage-100 text-brand">
                <Icon name="undo" size={20} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <Dialog.Title className="text-xl leading-6.5 font-semibold tracking-compact text-text">Refund {number}</Dialog.Title>
                <Dialog.Description className="text-sm leading-4.5 text-text-muted md:text-14 md:leading-sm">
                  <span className="md:hidden">{compactSummary ?? summary}</span>
                  <span className="hidden md:inline">{summary}</span>
                </Dialog.Description>
              </div>
              <Dialog.Close aria-label="Close" className="flex size-8 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-surface-subtle">
                <Icon name="close" size={16} strokeWidth={1.6} />
              </Dialog.Close>
            </div>

            <div className="flex flex-col gap-5 px-4 pt-5.5 pb-6 md:px-6">
              <div className="overflow-clip rounded-md border border-border-subtle">
                <div className="hidden items-center gap-3 bg-surface-subtle px-4 py-2 text-11 leading-xs font-semibold tracking-label text-text-muted uppercase md:flex">
                  <span className="flex-1">Item</span>
                  <span className="w-27 text-center">Qty to refund</span>
                  <span className="w-16 text-center">Restock</span>
                  <span className="w-22 text-right">Amount</span>
                </div>
                <ul>
                  {lines.map((line, index) => {
                    const quantity = quantities[line.id] ?? 0;
                    const on = quantity > 0;
                    const restockId = `${amountId}-restock-${index}`;
                    return (
                      <li
                        key={line.id}
                        className={cn(
                          "flex flex-wrap items-center gap-x-3 gap-y-2.5 border-border-subtle p-4 not-first:border-t md:flex-nowrap md:gap-3 md:px-4 md:py-3 md:first:border-t",
                          on && "bg-sage-50",
                        )}
                      >
                        <span className={cn("relative size-10 shrink-0 overflow-hidden rounded-10", TINT[line.tint ?? "sage"])}>{line.image}</span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="text-14 leading-sm font-semibold text-text">{line.name}</span>
                          <span className="text-xs leading-xs text-text-muted">
                            {money(line.unitPrice)} each · {line.bought} bought
                          </span>
                        </span>
                        <span className="flex basis-full items-center gap-3 md:contents">
                          <QuantityStepper
                            variant="outline"
                            showMax
                            value={quantity}
                            min={0}
                            max={line.bought}
                            label={line.name}
                            onDecrement={() => setQuantity(line.id, quantity - 1)}
                            onIncrement={() => setQuantity(line.id, quantity + 1)}
                            className="shrink-0"
                          />
                          <span className="flex items-center gap-2 md:w-16 md:justify-center">
                            <Switch
                              id={restockId}
                              size="sm"
                              disabled={!on}
                              checked={on && Boolean(restock[line.id])}
                              onCheckedChange={(checked) => setRestock({ ...restock, [line.id]: checked })}
                              aria-label={`Restock ${line.name}`}
                            />
                            <label htmlFor={restockId} aria-hidden className="text-sm leading-4.5 text-text-secondary md:hidden">
                              Restock
                            </label>
                          </span>
                          <span className={cn("ml-auto text-right text-14 leading-sm md:ml-0 md:w-22", on ? "font-semibold text-text" : "text-text-muted")}>
                            {on ? money(line.unitPrice * quantity) : "—"}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                  {deliveryFee > 0 && (
                    <li className="flex items-center gap-3 border-t border-border-subtle px-4 py-3">
                      <Checkbox
                        id={`${amountId}-delivery`}
                        name="delivery"
                        checked={delivery}
                        onCheckedChange={(checked) => {
                          setDelivery(checked === true);
                          setTyped(null);
                        }}
                        className="size-5 rounded-6"
                      />
                      <label htmlFor={`${amountId}-delivery`} className="flex-1 text-14 leading-sm text-text">
                        Also refund the delivery fee
                      </label>
                      <span className="text-right text-14 leading-sm text-text-muted md:w-22">{money(deliveryFee)}</span>
                    </li>
                  )}
                </ul>
              </div>

              <ReasonPicker name="reason" options={reasons} value={reason} onValueChange={setReason} />

              <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex flex-1 flex-col gap-1.5">
                  <label htmlFor={amountId} className="text-sm leading-4.5 font-semibold text-text">
                    Refund amount
                  </label>
                  <span className="flex h-12 items-center gap-2 rounded-14 border-field border-primary px-3.5 focus-within:border-brand dark:border-brand">
                    <span className="text-14 leading-4.5 font-semibold text-text-muted">{currency}</span>
                    <input
                      id={amountId}
                      name="amount"
                      inputMode="decimal"
                      value={amountText}
                      onChange={(event) => setTyped(event.target.value)}
                      aria-invalid={amount > paid || undefined}
                      aria-describedby={`${amountId}-hint`}
                      className="min-w-0 flex-1 bg-transparent text-lg leading-5.5 font-semibold text-text outline-none"
                    />
                  </span>
                  <p id={`${amountId}-hint`} className={cn("text-xs leading-xs", amount > paid ? "text-error" : "text-text-muted")}>
                    <span className="md:hidden">
                      To {method.name} {method.detail.split(" · ")[0]} via Paystack
                    </span>
                    <span className="hidden md:inline">Up to {money(paid)} · you can lower it</span>
                  </p>
                </div>
                <div className="hidden flex-1 flex-col gap-1.5 md:flex">
                  <p className="text-sm leading-4.5 font-semibold text-text">Refund to</p>
                  <p className="flex h-12 items-center gap-2.5 rounded-14 bg-surface-subtle px-3.5">
                    <PaymentBadge brand={method.brand} size="tile" />
                    <span className="flex flex-col">
                      <span className="text-14 leading-4.5 font-semibold text-text">{method.name}</span>
                      <span className="text-xs leading-xs text-text-muted">{method.detail}</span>
                    </span>
                  </p>
                  <p className="text-xs leading-xs text-text-muted">Original payment method · usually minutes</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-border-subtle bg-surface-subtle px-4 pt-4 pb-8 md:flex-row md:items-center md:justify-between md:px-6 md:py-4">
              {approvalThreshold !== undefined && (
                <p className="text-center text-xs leading-xs text-text-muted md:text-left">Over {money(approvalThreshold)} needs an admin&apos;s approval.</p>
              )}
              <div className="flex shrink-0 gap-2.5 md:ml-auto">
                <Dialog.Close className="flex h-13 flex-1 items-center justify-center rounded-full border border-border bg-bg px-4.5 text-base leading-4.5 font-semibold text-text hover:bg-surface-subtle md:h-11 md:flex-none md:text-14">
                  Cancel
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={!valid}
                  className="flex h-13 flex-1 items-center justify-center rounded-full bg-primary px-5 text-base leading-4.5 font-semibold text-text-inverse transition-colors hover:bg-primary-hover disabled:opacity-muted md:h-11 md:flex-none md:text-14"
                >
                  Refund {money(Number.isFinite(amount) ? amount : 0)}
                </button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
