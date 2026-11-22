import type { Metadata } from "next";
import Link from "next/link";

import { BulletList, ContentSection, RateTable } from "@repo/ui/molecules";

import { ContentPage, WhatsAppCallout } from "../../_components/content-page";
import { deliveryRates, lastUpdated } from "../../_content/pages";

export const metadata: Metadata = {
  title: "Delivery & returns",
  description: "Delivery fees and times across Ghana, and how returns and refunds work at Jofak.",
};

/** /pages/delivery-returns (Paper: Content page — Delivery & returns). */
export default function DeliveryReturnsPage() {
  return (
    <ContentPage
      slug="delivery-returns"
      title="Delivery & returns"
      description={`How we get your order to you, what it costs, and what to do if something isn't right. Last updated ${lastUpdated}.`}
      compactDescription={`How we get your order to you, what it costs, and what to do if something isn't right. Updated ${lastUpdated}.`}
    >
      <ContentSection id="fees" title="Delivery fees and times">
        <p>
          You&apos;ll see the exact fee at checkout once you pick your area. Orders placed before 2pm on a weekday leave the same day.
          Delivery is free on orders over GHS 500, except store pickup, which is always free.
        </p>
        <RateTable caption="Delivery fees and times by area" rows={deliveryRates} />
      </ContentSection>
      <ContentSection id="returns" title="Returns and refunds">
        <p>
          For hygiene reasons we can only take back products that are unopened and still sealed. If something arrives damaged or
          isn&apos;t what you ordered, we&apos;ll sort it out whatever the seal says.
        </p>
        <BulletList
          items={[
            <>
              Request a return within 14 days of delivery from <Link href="/account/orders">your orders</Link>.
            </>,
            "Our courier collects it, or you can drop it at our Osu store.",
            "Refunds go back to the MoMo wallet or card you paid with, within 5 working days of us receiving the item.",
          ]}
        />
      </ContentSection>
      <WhatsAppCallout />
    </ContentPage>
  );
}
