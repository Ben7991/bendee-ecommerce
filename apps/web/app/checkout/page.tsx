import type { Metadata } from "next";
import Link from "next/link";

import { Badge, Button, Icon } from "@repo/ui/atoms";
import { CheckoutStep, DeliveryForm, StickyActionBar } from "@repo/ui/organisms";

import { addressDefaults, areas, cities, regions } from "../_content/checkout";
import { CheckoutStepsFrame } from "./_components/checkout-frame";
import { ContactDone, PendingStep } from "./_components/saved-steps";

export const metadata: Metadata = { title: "Checkout · Delivery" };

const price = (value: string, tone: "brand" | "text" = "text") => (
  <span className={tone === "brand" ? "font-sans text-sm font-semibold text-brand md:text-base" : "font-sans text-sm font-semibold text-text md:text-base"}>
    {value}
  </span>
);

const methods = [
  {
    value: "standard",
    title: "Standard delivery",
    compactTitle: "Standard",
    description: "Arrives tomorrow, Sat 14 Nov · Pay on delivery available",
    compactDescription: "Tomorrow, Sat 14 Nov",
    aside: price("Free", "brand"),
  },
  {
    value: "express",
    title: "Express · same day",
    compactTitle: "Express · same day",
    description: "Arrives today by 7pm · order before 12:00",
    compactDescription: <span className="font-semibold text-warning-text">Today by 7pm · order in 1h 20m</span>,
    badge: (
      <Badge variant="warning" className="rounded-full bg-tint-sun px-2 py-0.5 text-xs leading-xs">
        Order in 1h 20m
      </Badge>
    ),
    aside: price("GHS 40"),
  },
  {
    value: "pickup",
    title: "Pick up · Jofak Osu store",
    compactTitle: "Pick up · Osu store",
    description: "Ready today from 2pm · Oxford Street, Mon–Sat 9am–7pm",
    compactDescription: "Ready today from 2pm",
    aside: price("Free"),
  },
];

/**
 * /checkout: the delivery step (contact is saved). Static for now: the form doesn't submit and
 * "Use my location" isn't wired.
 */
export default function CheckoutDeliveryPage() {
  const next = (
    <>
      Continue to payment <Icon name="arrowRight" size={16} />
    </>
  );
  return (
    <CheckoutStepsFrame
      current={1}
      nextLabel="Next: Payment"
      mobileBackHref="/cart"
      actionBar={
        <StickyActionBar
          note="Saved as you go — you can come back to it"
          action={
            <Button asChild size="md" className="w-full py-4">
              <Link href="/checkout/payment">{next}</Link>
            </Button>
          }
        />
      }
    >
      <ContactDone />
      <CheckoutStep
        number={2}
        title="Delivery"
        description="Where should we bring your order?"
        compactTitle={
          <>
            Where to <em>deliver?</em>
          </>
        }
        action={
          <Button type="button" variant="secondary" size="xs" className="shrink-0 gap-1.5 px-3 py-1.75 text-xs md:gap-2 md:px-3.5 md:py-2 md:text-sm">
            <Icon name="locate" size={14} className="size-3.25 text-brand md:size-3.5" />
            <span className="md:hidden">Locate me</span>
            <span className="hidden md:inline">Use my location</span>
          </Button>
        }
        footer={
          <>
            <p className="font-sans text-sm leading-xs text-text-muted">Saved to this checkout — you can come back to it.</p>
            <Button asChild size="md" className="py-4 md:px-7">
              <Link href="/checkout/payment">{next}</Link>
            </Button>
          </>
        }
      >
        <DeliveryForm
          regions={regions}
          cities={cities}
          areas={areas}
          defaults={addressDefaults}
          methods={methods}
        />
      </CheckoutStep>
      <PendingStep number={3} title="Payment" hint="MoMo, card or pay on delivery" />
      <PendingStep number={4} title="Review & pay" />
    </CheckoutStepsFrame>
  );
}
