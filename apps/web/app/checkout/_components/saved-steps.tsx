import Link from "next/link";

import { PaymentBadge } from "@repo/ui/atoms";
import { StepCard } from "@repo/ui/molecules";

import { contact, deliveryDone, paymentDone } from "../../_content/checkout";

/** The steps already filled in, shown collapsed above the active one. */
export function ContactDone() {
  return <StepCard linkAs={Link} status="done" number={1} title="Contact" editHref="/checkout#contact" {...contact} />;
}

export function DeliveryDone() {
  return <StepCard linkAs={Link} status="done" number={2} title="Delivery" editHref="/checkout" {...deliveryDone} />;
}

export function PaymentDone() {
  return (
    <StepCard
      linkAs={Link}
      status="done"
      number={3}
      title="Payment"
      editHref="/checkout/payment"
      leading={<PaymentBadge brand="mtn" size="xs" />}
      {...paymentDone}
    />
  );
}

export function PendingStep({ number, title, hint }: { number: number; title: string; hint?: string }) {
  return <StepCard status="pending" number={number} title={title} hint={hint} />;
}
