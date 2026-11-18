"use client";

import Link from "next/link";

import { ProductRail as UiProductRail, type ProductRailProps } from "@repo/ui/organisms";

/** Client boundary so next/link can be handed to ProductRail (a client component). */
export function ProductRail(props: Omit<ProductRailProps, "linkAs">) {
  return <UiProductRail {...props} linkAs={Link} />;
}
