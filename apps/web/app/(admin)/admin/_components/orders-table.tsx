"use client";

import Link from "next/link";

import { OrderTable, type OrderTableProps } from "@repo/ui/organisms";

/**
 * Client boundary for the order table: next/link and the page links are built here, because a
 * server component can't hand a component or a function to a client component.
 */
export function OrdersTable({
  pagination,
  pageHrefBase,
  ...props
}: Omit<OrderTableProps, "linkAs" | "pagination"> & {
  pagination: Omit<NonNullable<OrderTableProps["pagination"]>, "hrefFor">;
  /** "/admin/orders?view=to-pack&" — `page=N` is appended. */
  pageHrefBase: string;
}) {
  return <OrderTable {...props} linkAs={Link} pagination={{ ...pagination, hrefFor: (page) => `${pageHrefBase}page=${page}` }} />;
}
