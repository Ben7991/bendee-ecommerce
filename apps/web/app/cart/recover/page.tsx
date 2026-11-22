import type { Metadata } from "next";
import Link from "next/link";

import { TextLink } from "@repo/ui/atoms";

import { cartCount } from "../../_content/cart";
import { CartDeadEnd } from "../_components/cart-dead-end";
import { CartView } from "../_components/cart-view";

export const metadata: Metadata = { title: "Your cart", robots: { index: false, follow: false } };

/**
 * /cart/recover?token=… — the link in abandoned-cart reminders (Paper: Cart recovered, Cart
 * link expired). Static for now: token "expired" (or none) shows the expired page, any other
 * token the recovered sample cart. Validate the token against the cart API when it exists.
 */
export default async function RecoverCartPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;

  if (!token || token === "expired") {
    return (
      <CartDeadEnd
        icon="stopwatch"
        title="This cart link has expired"
        description={
          <>
            <span className="md:hidden">Reminder links stay open for 7 days.</span>
            <span className="hidden md:inline">Links in our reminders stay open for 7 days, so this one has run out.</span> If you
            were signed in when you shopped, your items are still saved in your account.
          </>
        }
        primaryAction={{ label: "Sign in to see your cart", href: "/auth/sign-in" }}
        secondaryAction={{ label: "Shop bestsellers", href: "/collections/bestsellers" }}
        note={
          <>
            Already paid?{" "}
            <TextLink asChild>
              <Link href="/orders/track">Track your order</Link>
            </TextLink>{" "}
            instead.
          </>
        }
      />
    );
  }

  return (
    <CartView
      title="Welcome back"
      description={
        <>
          <span className="md:hidden">We kept your {cartCount} items, with prices and stock checked again.</span>
          <span className="hidden md:inline">
            We kept your {cartCount} items. Prices and stock have been checked again, so what you see is what you&apos;ll pay.
          </span>
        </>
      }
    />
  );
}
