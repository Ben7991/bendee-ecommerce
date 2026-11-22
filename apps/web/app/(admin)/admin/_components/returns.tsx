"use client";

import Link from "next/link";

import { ReturnReview, type ReturnReviewProps } from "@repo/ui/organisms";

/*
 * Client boundary for the return page's form, which takes next/link: a server component can't
 * hand a component reference to a client component.
 */

export function ReturnReviewForm(props: Omit<ReturnReviewProps, "linkAs">) {
  return <ReturnReview {...props} linkAs={Link} />;
}
