"use client";

import Link from "next/link";

import { BestsellerShowcase, type BestsellerShowcaseProps } from "@repo/ui/organisms";

/**
 * Client boundary for the bestseller grid: next/link has to be passed from the client side,
 * because a server component can't hand a component reference to a client component.
 */
export function Bestsellers(props: Omit<BestsellerShowcaseProps, "linkAs">) {
  return <BestsellerShowcase {...props} linkAs={Link} />;
}
