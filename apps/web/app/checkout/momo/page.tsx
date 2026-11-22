import type { Metadata } from "next";
import Link from "next/link";

import { Button, TextLink } from "@repo/ui/atoms";
import { PaymentStatusCard } from "@repo/ui/organisms";
import { CheckoutShell } from "@repo/ui/templates";

import { momoPrompt, orderNumber } from "../../_content/checkout";
import { PaymentHeader } from "../_components/checkout-frame";

export const metadata: Metadata = { title: "Approve on your phone" };

/**
 * /checkout/momo: waiting for the customer to approve the MoMo prompt. Static: the countdown
 * doesn't run and nothing polls the payment yet.
 */
export default function MomoApprovalPage() {
  return (
    <CheckoutShell layout="center" header={<PaymentHeader />}>
      <PaymentStatusCard
        tone="pending"
        title={
          <>
            Approve on your <em>phone</em>
          </>
        }
        description={
          <>
            We sent a request for <strong>{momoPrompt.amount}</strong> to
            <br />
            MTN MoMo <strong>{momoPrompt.number}</strong>
          </>
        }
        status={{ label: "Waiting for approval", detail: momoPrompt.timeLeft }}
        steps={{
          items: [
            "Unlock your phone and open the MoMo prompt",
            `Enter your MoMo PIN to approve ${momoPrompt.amount}`,
            "Stay on this page — we'll confirm automatically",
          ],
        }}
        hint={
          <>
            No prompt? Dial <strong>*170#</strong> → My Wallet → My Approvals
          </>
        }
        actions={
          <>
            <Button size="md" variant="outline" disabled className="h-11.5 text-text-muted">
              Resend prompt in {momoPrompt.resendIn}
            </Button>
            <TextLink asChild className="flex h-11.5 items-center justify-center text-base font-semibold">
              <Link href="/checkout/payment">Use another payment method</Link>
            </TextLink>
          </>
        }
        footnote={`Order ${orderNumber} · your items are reserved for 15 minutes`}
      />
    </CheckoutShell>
  );
}
