"use client";

import Link from "next/link";

import { CustomerContactCard, CustomerPreferences, type CustomerContactCardProps, type CustomerPreferencesProps } from "@repo/ui/organisms";

/*
 * Client boundary for the customer page's client organisms that take next/link: a server
 * component can't hand a component reference to a client component.
 */

export function ContactCard(props: Omit<CustomerContactCardProps, "linkAs">) {
  return <CustomerContactCard {...props} linkAs={Link} />;
}

export function Preferences(props: Omit<CustomerPreferencesProps, "linkAs">) {
  return <CustomerPreferences {...props} linkAs={Link} />;
}
