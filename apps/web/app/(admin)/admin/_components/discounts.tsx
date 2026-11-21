"use client";

import Link from "next/link";

import { DiscountEditor, type DiscountEditorProps } from "@repo/ui/organisms";

/*
 * Client boundary for the discount editor, which takes next/link: a server component can't hand
 * a component reference to a client component.
 */

export function DiscountEditorFields(props: Omit<DiscountEditorProps, "linkAs">) {
  return <DiscountEditor {...props} linkAs={Link} />;
}
