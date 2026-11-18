import type { Metadata } from "next";
import Link from "next/link";

import { Button, Icon, TextLink } from "@repo/ui/atoms";
import { AccountPrompt, OrderConfirmationHero, OrderReceipt, OrderTimeline } from "@repo/ui/organisms";
import { CheckoutShell } from "@repo/ui/templates";

import { Packshot } from "../../_components/storefront-chrome";
import { checkoutItems, orderNumber, receipt, timeline } from "../../_content/checkout";
import { DoneHeader } from "../_components/checkout-frame";

export const metadata: Metadata = { title: "Order confirmed" };

const trackHref = `/orders/${orderNumber}`;

/** /checkout/confirmation: the order is paid (Paper: Order Confirmation). Static sample order. */
export default function OrderConfirmationPage() {
  return (
    <CheckoutShell
      layout="stack"
      header={<DoneHeader />}
      hero={
        <OrderConfirmationHero
          eyebrow={`Order ${orderNumber} · Paid`}
          title={
            <>
              Thank you, <em>Ama</em>
            </>
          }
          description={
            <>
              Your order is confirmed and arrives <strong>tomorrow, Sat 14 Nov</strong>.
              <br />
              We&apos;ve texted the details to +233 24 412 7781.
            </>
          }
          compactDescription={
            <>
              Arriving <strong>tomorrow, Sat 14 Nov</strong>.
              <br />
              Details sent to +233 24 412 7781.
            </>
          }
        />
      }
    >
      <OrderTimeline
        steps={timeline}
        actions={
          <>
            <Button asChild size="md" className="px-6.5 py-3.75">
              <Link href={trackHref}>
                <Icon name="truck" size={16} /> Track order
              </Link>
            </Button>
            <Button asChild size="md" variant="outline" className="px-6.5 py-3.75">
              <Link href="/shop">Continue shopping</Link>
            </Button>
          </>
        }
        compactActions={
          <Button asChild size="md" className="w-full">
            <Link href={trackHref}>Track order</Link>
          </Button>
        }
      />
      <OrderReceipt
        linkAs={Link}
        {...receipt}
        items={checkoutItems.map((item) => ({ ...item, image: <Packshot id={item.id} alt="" sizes="40px" /> }))}
        receiptHref={`${trackHref}/receipt`}
        itemsHref={trackHref}
      />
      <AccountPrompt
        title="Save your details for next time"
        description="Create an account with your phone number — no password, we'll text you a code. Track orders and reorder in one tap."
        compactDescription="No password — we'll text you a code. Track orders and reorder in one tap."
        action={
          <Button asChild variant="accent" size="md" className="px-5.5 py-3 text-sm leading-xs md:px-6.5 md:py-3.75 md:text-base md:leading-4.5">
            <Link href="/auth/sign-up">Create account</Link>
          </Button>
        }
      />
      <p className="flex justify-center pt-2 md:hidden">
        <TextLink asChild>
          <Link href="/shop">Continue shopping</Link>
        </TextLink>
      </p>
    </CheckoutShell>
  );
}
