"use client";

import Link from "next/link";

import { CollectionProductsCard, type CollectionProductsCardProps } from "@repo/ui/organisms";

/*
 * Client boundary for the collection editor's client organisms that take next/link: a server
 * component can't hand a component reference to a client component.
 */

export function ProductsCard(props: Omit<CollectionProductsCardProps, "linkAs">) {
  return <CollectionProductsCard {...props} linkAs={Link} />;
}
