"use client";

import Link from "next/link";

import { SearchDialog, type SearchDialogProps } from "@repo/ui/organisms";

/**
 * Client boundary for the search overlay: next/link has to be passed from the client side,
 * because a server component can't hand a component reference to a client component.
 */
export function SiteSearch(props: Omit<SearchDialogProps, "linkAs">) {
  return <SearchDialog {...props} linkAs={Link} />;
}
