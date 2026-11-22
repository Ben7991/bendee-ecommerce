import type { Metadata } from "next";
import Link from "next/link";

import { Button, Icon } from "@repo/ui/atoms";
import { CheckoutStep, PaymentForm, StickyActionBar } from "@repo/ui/organisms";

import { checkoutTotals, wallet } from "../../_content/checkout";
import { CheckoutStepsFrame } from "../_components/checkout-frame";
import { ContactDone, DeliveryDone, PendingStep } from "../_components/saved-steps";

export const metadata: Metadata = { title: "Checkout · Payment" };

/** /checkout/payment: choose MoMo, card or pay on delivery. Static: nothing is charged here. */
export default function CheckoutPaymentPage() {
  return (
    <CheckoutStepsFrame
      current={2}
      nextLabel="Next: Review & pay"
      mobileBackHref="/checkout"
      actionBar={
        <StickyActionBar
          note="You won't be charged until you confirm"
          action={
            <Button asChild size="md" className="w-full py-4">
              <Link href="/checkout/review">
                Review order · {checkoutTotals.total} <Icon name="arrowRight" size={16} />
              </Link>
            </Button>
          }
        />
      }
    >
      <ContactDone />
      <DeliveryDone />
      <CheckoutStep
        number={3}
        title="Payment"
        description="How would you like to pay?"
        compactTitle={
          <>
            How will you <em>pay?</em>
          </>
        }
        compactDescription="Secured by Paystack"
        footer={
          <>
            <p className="flex items-center gap-2 font-sans text-sm leading-xs text-text-muted">
              <Icon name="padlock" size={14} />
              You won&apos;t be charged until you confirm on the next step.
            </p>
            <Button asChild size="md" className="py-4 md:px-7">
              <Link href="/checkout/review">
                Review order <Icon name="arrowRight" size={16} />
              </Link>
            </Button>
          </>
        }
      >
        <PaymentForm defaultWallet={wallet.number} detected={wallet.detected} />
      </CheckoutStep>
      <PendingStep number={4} title="Review & pay" />
    </CheckoutStepsFrame>
  );
}
