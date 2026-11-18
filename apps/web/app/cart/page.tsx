import type { Metadata } from "next";
import Link from "next/link";

import { TextLink } from "@repo/ui/atoms";

import { cartCount } from "../_content/cart";
import { CartDeadEnd } from "./_components/cart-dead-end";
import { CartView } from "./_components/cart-view";

export const metadata: Metadata = { title: "Your cart", robots: { index: false } };

/**
 * /cart. Static for now: shows the sample cart, or the empty cart with ?state=empty
 * (until there's a real cart to be empty).
 */
export default async function CartPage({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const { state } = await searchParams;

  if (state === "empty") {
    return (
      <CartDeadEnd
        icon="bagLeaf"
        title={
          <>
            Your cart is <em>empty</em>
          </>
        }
        description="Nothing here yet. Start with our bestsellers, or take a 60-second quiz to find what fits your routine."
        primaryAction={{ label: "Shop bestsellers", href: "/collections/bestsellers" }}
        secondaryAction={{ label: "Take the wellness quiz", href: "/quiz" }}
        note={
          <>
            Added items before?{" "}
            <TextLink asChild>
              <Link href="/auth/sign-in">Sign in</Link>
            </TextLink>{" "}
            to bring back your saved cart.
          </>
        }
      />
    );
  }

  return (
    <CartView
      title={
        <>
          Your <em>cart</em>
        </>
      }
      description={`${cartCount} items · 1 needs your attention`}
    />
  );
}
