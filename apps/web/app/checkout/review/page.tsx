import type { Metadata } from "next";
import Link from "next/link";

import { Button, Icon } from "@repo/ui/atoms";
import { CheckoutStep, ReviewForm, StickyActionBar } from "@repo/ui/organisms";

import { checkoutTotals, momoPrompt } from "../../_content/checkout";
import { CheckoutStepsFrame } from "../_components/checkout-frame";
import { ContactDone, DeliveryDone, PaymentDone } from "../_components/saved-steps";

export const metadata: Metadata = { title: "Checkout · Review & pay" };

const payLabel = `Pay ${checkoutTotals.total} with MoMo`;

/** /checkout/review: last look, then pay. "Pay" goes to the MoMo approval screen (static). */
export default function CheckoutReviewPage() {
  return (
    <CheckoutStepsFrame
      current={3}
      nextLabel="Last step"
      mobileBackHref="/checkout/payment"
      actionBar={
        <StickyActionBar
          note="By paying you agree to our Terms and Returns policy"
          action={
            <Button asChild size="md" className="w-full gap-2 py-4">
              <Link href="/checkout/momo">
                <Icon name="padlock" size={16} /> {payLabel}
              </Link>
            </Button>
          }
        />
      }
    >
      <ContactDone />
      <DeliveryDone />
      <PaymentDone />
      <CheckoutStep
        number={4}
        title="Review & pay"
        description="Check everything looks right, then pay."
        compactTitle={
          <>
            Ready to <em>pay</em>
          </>
        }
      >
        <ReviewForm
          totals={checkoutTotals}
          smsLabel="Send order updates by SMS to +233 24 412 7781"
          compactSmsLabel="Send order updates by SMS"
          notice={{
            title: "Keep your phone close",
            text: `After you tap Pay, MTN will send a prompt to ${momoPrompt.number}. Enter your MoMo PIN to approve ${momoPrompt.amount}.`,
            compactText: "MTN will send a prompt — enter your PIN to approve.",
          }}
          payAction={
            <Button asChild size="xl" className="h-16 w-full gap-3 text-lg leading-base">
              <Link href="/checkout/momo">
                <Icon name="padlock" size={18} /> {payLabel}
              </Link>
            </Button>
          }
          legal="By paying you agree to our Terms and Returns policy. Prices include VAT & levies."
        />
      </CheckoutStep>
    </CheckoutStepsFrame>
  );
}
