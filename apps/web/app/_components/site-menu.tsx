"use client";

import Link from "next/link";

import { MenuDrawer, type MenuDrawerProps } from "@repo/ui/organisms";

/**
 * Client boundary for the menu drawer: next/link has to be passed from the client side,
 * because a server component can't hand a component reference to a client component.
 */
export function SiteMenu(props: Omit<MenuDrawerProps, "linkAs">) {
  return <MenuDrawer {...props} linkAs={Link} />;
}
