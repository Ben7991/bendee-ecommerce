"use client";

import Link from "next/link";

import { CheckoutSummary, type CheckoutSummaryProps } from "@repo/ui/organisms";

/** Client boundary so next/link can be handed to CheckoutSummary (a client component). */
export function SiteCheckoutSummary(props: Omit<CheckoutSummaryProps, "linkAs">) {
  return <CheckoutSummary {...props} linkAs={Link} />;
}
