"use client";

import Link from "next/link";

import { OrderCustomerCard, OrderMoreMenu, type OrderCustomerCardProps, type OrderMoreMenuProps } from "@repo/ui/organisms";

/*
 * Client boundary for the order detail's client organisms that take next/link: a server
 * component can't hand a component reference to a client component.
 */

export function CustomerCard(props: Omit<OrderCustomerCardProps, "linkAs">) {
  return <OrderCustomerCard {...props} linkAs={Link} />;
}

export function MoreMenu(props: Omit<OrderMoreMenuProps, "linkAs">) {
  return <OrderMoreMenu {...props} linkAs={Link} />;
}
