import type { Metadata } from "next";
import Link from "next/link";

import { Button, TextLink } from "@repo/ui/atoms";
import { PaymentStatusCard } from "@repo/ui/organisms";
import { CheckoutShell } from "@repo/ui/templates";

import { momoPrompt, orderNumber } from "../../_content/checkout";
import { PaymentHeader } from "../_components/checkout-frame";

export const metadata: Metadata = { title: "Payment didn't go through" };

/** /checkout/failed: the MoMo request wasn't approved. Nothing was charged; the order is held. */
export default function PaymentFailedPage() {
  return (
    <CheckoutShell layout="center" header={<PaymentHeader />}>
      <PaymentStatusCard
        tone="error"
        title={
          <>
            Payment didn&apos;t go <em>through</em>
          </>
        }
        description={
          <>
            The MoMo request for <strong>{momoPrompt.amount}</strong> wasn&apos;t approved in time.
            <br />
            Don&apos;t worry — your cart and details are saved.
          </>
        }
        compactDescription={
          <>
            The MoMo request for <strong>{momoPrompt.amount}</strong> wasn&apos;t approved in time. Your cart is saved.
          </>
        }
        status={{ label: "No money was taken from your wallet" }}
        steps={{
          title: "Usually one of these",
          items: [
            "The prompt expired before it was approved",
            "Wrong PIN, or not enough MoMo balance",
            "A network delay — trying again usually works",
          ],
          compactItems: ["The prompt expired before approval", "Wrong PIN or low MoMo balance", "A network delay — try once more"],
        }}
        hint={
          <>
            Check your balance with <strong>*170#</strong> before you try again
          </>
        }
        compactHint={
          <>
            Check your balance with <strong>*170#</strong> first
          </>
        }
        actions={
          <>
            <Button asChild size="md" className="h-11.5">
              <Link href="/checkout/momo">Try MoMo again</Link>
            </Button>
            <TextLink asChild className="flex h-11.5 items-center justify-center text-base font-semibold">
              <Link href="/checkout/payment">
                <span className="md:hidden">Pay with card or on delivery</span>
                <span className="hidden md:inline">Pay another way</span>
              </Link>
            </TextLink>
          </>
        }
        footnote={`Order ${orderNumber} · we'll hold it for you until 11:42`}
        compactFootnote={`Order ${orderNumber} · held until 11:42`}
      />
    </CheckoutShell>
  );
}
