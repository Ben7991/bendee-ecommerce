import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button, Heading, Icon, StatusBadge } from "@repo/ui/atoms";
import { BackLink, ChoiceCards } from "@repo/ui/molecules";
import { CheckoutBar, OrderBreakdown, ReturnItems } from "@repo/ui/organisms";

import { submitReturn } from "../../../../_actions/account";
import { returnRequest } from "../../../../_content/account";
import { AccountAppBar, AccountPage, packshot } from "../../../_components/account-page";

export const metadata: Metadata = { title: "Start a return", robots: { index: false } };

const stepLabel = "pt-2 font-sans text-xs leading-xs font-semibold tracking-wide text-text-muted uppercase md:pt-4";

/**
 * /account/orders/[number]/return (Paper: Return request; docs/03 §3.7, Phase 2). Static: it
 * posts to a placeholder action that saves nothing.
 */
export default async function ReturnRequestPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  if (number !== returnRequest.order) notFound();

  return (
    <AccountPage
      section="orders"
      contentClassName="pb-24 md:pb-0"
      appBar={<AccountAppBar title={returnRequest.order} backHref={`/account/orders/${returnRequest.order}`} backLabel="Close the return" close />}
    >
      <form action={submitReturn} className="flex flex-col gap-5 md:gap-6">
        <input type="hidden" name="order" value={returnRequest.order} />
        <div className="flex flex-col gap-3 md:gap-4">
          <BackLink asChild className="hidden md:inline-flex">
            <Link href={`/account/orders/${returnRequest.order}`}>Order {returnRequest.order}</Link>
          </BackLink>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-6">
            <Heading as="h1" size="account">
              Start a <em>return</em>
            </Heading>
            <StatusBadge tone="warning" marker="none" label={returnRequest.windowCloses} className="md:mb-2" />
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-6">
          <div className="flex min-w-0 flex-1 flex-col gap-3 md:gap-4">
            <ReturnItems
              items={returnRequest.items.map((item) => ({
                ...item,
                image: packshot(item.image),
                photos: item.id === "greens" ? [packshot("greens.png"), <Icon key="photo" name="image" size={28} className="m-auto h-full text-text-muted" />] : undefined,
              }))}
              reasons={returnRequest.reasons}
              defaultSelected={["greens"]}
              defaultReason="damaged"
            />

            <h2 className={stepLabel}>2 · How should we make it right?</h2>
            <ChoiceCards
              name="resolution"
              defaultValue="refund"
              className="gap-3 md:grid md:grid-cols-2"
              options={[
                { value: "refund", title: "Refund my money", description: `Back to ${returnRequest.payment}` },
                { value: "replace", title: "Send a replacement", description: "Same item, or another flavour" },
              ]}
            />

            <h2 className={stepLabel}>3 · How will we get it back?</h2>
            <ChoiceCards
              name="collection"
              defaultValue="pickup"
              className="gap-3 md:grid md:grid-cols-2"
              options={[
                { value: "pickup", title: "Courier pickup · free", description: "From 14 Lagos Ave, East Legon" },
                { value: "store", title: "Drop off in store", description: "Jofak Osu, Oxford Street" },
              ]}
            />
          </div>

          <OrderBreakdown
            className="hidden md:flex xl:w-85 xl:shrink-0"
            title="Your return"
            rows={[
              { label: "Daily Greens Powder × 1", value: returnRequest.refund },
              { label: "Pickup", value: "Free", highlight: true },
            ]}
            total={{ label: "Refund", value: returnRequest.refund }}
            note={`The price you paid after your JOFAK10 discount. Refunded to ${returnRequest.payment} within 3 days of us receiving it.`}
            actions={
              <Button type="submit" size="md">
                Submit return
              </Button>
            }
            footer="We'll review it within 1 working day."
          />
        </div>

        <CheckoutBar label="Refund to MoMo" total={returnRequest.refund} action={<Button type="submit" size="md">Submit return</Button>} />
      </form>
    </AccountPage>
  );
}
