import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * OrderPaymentCard (organism): how the order is paid (Paper Jofak - Admin → Order detail →
 * Payment). `due` (sun) for cash on delivery still to collect, `paid` (sage) once the money is
 * in, `pending` (surface) while a MoMo approval is outstanding.
 */
export interface OrderPaymentCardProps extends Omit<ComponentProps<"section">, "children"> {
  tone?: "due" | "paid" | "pending";
  /** "Not collected", "Paid", "Awaiting approval". */
  status: string;
  /** "Cash on delivery · to collect". */
  method: string;
  amount: string;
  note?: ReactNode;
}

const TONE = {
  due: { card: "bg-tint-sun", accent: "text-warning-text" },
  paid: { card: "bg-sage-100", accent: "text-brand" },
  pending: { card: "bg-surface", accent: "text-text-secondary" },
} as const;

export function OrderPaymentCard({ tone = "due", status, method, amount, note, className, ...props }: OrderPaymentCardProps) {
  const titleId = useId();
  const colors = TONE[tone];
  return (
    <section data-slot="order-payment-card" aria-labelledby={titleId} className={cn("flex flex-col gap-3 rounded-lg p-5 font-sans", colors.card, className)} {...props}>
      <div className="flex items-center justify-between gap-3">
        <h2 id={titleId} className={cn("text-xs leading-xs font-semibold tracking-eyebrow uppercase", colors.accent)}>
          Payment
        </h2>
        <span className={cn("rounded-full bg-bg px-2 py-0.5 text-xs leading-xs font-semibold", colors.accent)}>{status}</span>
      </div>
      <p className="flex flex-col gap-0.5">
        <span className={cn("text-14 leading-sm", colors.accent)}>{method}</span>
        <span className="text-2xl leading-8 font-semibold tracking-snug text-text">{amount}</span>
      </p>
      {note && <p className={cn("text-sm leading-4.5", colors.accent)}>{note}</p>}
    </section>
  );
}
