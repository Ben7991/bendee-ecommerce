"use client";

import Link from "next/link";

import { MiniCart, type MiniCartProps } from "@repo/ui/organisms";

/** Client boundary so next/link can be handed to MiniCart (a client component). */
export function SiteMiniCart(props: Omit<MiniCartProps, "linkAs">) {
  return <MiniCart {...props} linkAs={Link} />;
}
