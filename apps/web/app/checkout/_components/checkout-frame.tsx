import Link from "next/link";
import type { ReactNode } from "react";

import { TextLink } from "@repo/ui/atoms";
import { CheckoutHeader } from "@repo/ui/organisms";
import { CheckoutShell } from "@repo/ui/templates";

import { Packshot } from "../../_components/storefront-chrome";
import {
  assurances,
  checkoutCode,
  checkoutItems,
  checkoutSteps,
  checkoutTotals,
  itemCount,
  soldOutNote,
} from "../../_content/checkout";
import { helpHref } from "../../_content/site";
import { SiteCheckoutSummary } from "./checkout-summary";

const summary = {
  items: checkoutItems.map((item) => ({ ...item, image: <Packshot id={item.id} alt="" sizes="40px" /> })),
  totals: checkoutTotals,
  note: soldOutNote,
  code: checkoutCode,
  itemCount,
  editCartHref: "/cart",
};

/**
 * The Contact → Review steps (Paper: Checkout — Delivery / Payment / Review & pay). `current` is
 * the zero-based active step; the mobile sticky button goes in `actionBar`.
 */
export function CheckoutStepsFrame({
  current,
  nextLabel,
  mobileBackHref,
  actionBar,
  children,
}: {
  current: number;
  nextLabel: string;
  mobileBackHref: string;
  actionBar: ReactNode;
  children: ReactNode;
}) {
  return (
    <CheckoutShell
      header={
        <CheckoutHeader
          linkAs={Link}
          steps={checkoutSteps}
          current={current}
          nextLabel={nextLabel}
          backHref="/cart"
          backLabel="Back to cart"
          mobileBackHref={mobileBackHref}
        />
      }
      summaryStrip={<SiteCheckoutSummary variant="strip" {...summary} />}
      sidebar={<SiteCheckoutSummary {...summary} assurances={assurances} />}
      title={
        <>
          Almost <em>there</em>
        </>
      }
      subtitle={
        <>
          Checking out as a guest ·{" "}
          <TextLink asChild>
            <Link href="/auth/sign-in?next=/checkout">Log in</Link>
          </TextLink>{" "}
          for faster checkout
        </>
      }
      actionBar={actionBar}
    >
      {children}
    </CheckoutShell>
  );
}

/** Header for the MoMo approval and payment failed screens. */
export function PaymentHeader() {
  return <CheckoutHeader linkAs={Link} mode="payment" steps={checkoutSteps} current={3} backHref="/cart" backLabel="Back to cart" />;
}

/** Header for the order confirmation. */
export function DoneHeader() {
  return (
    <CheckoutHeader
      linkAs={Link}
      mode="done"
      steps={checkoutSteps}
      current={checkoutSteps.length}
      help={
        <>
          Need help?{" "}
          <TextLink asChild className="no-underline">
            <Link href={helpHref}>Chat on WhatsApp</Link>
          </TextLink>
        </>
      }
    />
  );
}
