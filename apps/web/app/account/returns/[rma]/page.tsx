import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button, Heading, Icon, IconButton, StatusBadge, TextLink } from "@repo/ui/atoms";
import { BackLink, OrderItemRow, ProgressSteps } from "@repo/ui/molecules";
import { OrderBreakdown } from "@repo/ui/organisms";

import { returnStatus, whatsappHref } from "../../../_content/account";
import { AccountAppBar, AccountPage, packshot } from "../../_components/account-page";

export const metadata: Metadata = { title: "Your return", robots: { index: false } };

/** /account/returns/[rma] (Paper: Return status; docs/03 §3.7, Phase 2). Static sample return. */
export default async function ReturnStatusPage({ params }: { params: Promise<{ rma: string }> }) {
  const { rma } = await params;
  if (rma !== returnStatus.rma) notFound();

  return (
    <AccountPage
      section="orders"
      appBar={
        <AccountAppBar
          title={`Return ${returnStatus.rma}`}
          backHref={`/account/orders/${returnStatus.order}`}
          backLabel="Back to the order"
          action={
            <IconButton asChild label="Get help with this return" size="md" className="size-10">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <Icon name="chat" size={16} />
              </a>
            </IconButton>
          }
        />
      }
    >
      <div className="flex flex-col gap-3 md:gap-4">
        <BackLink asChild className="hidden md:inline-flex">
          <Link href={`/account/orders/${returnStatus.order}`}>
            Order {returnStatus.order} · Return {returnStatus.rma}
          </Link>
        </BackLink>
        <div className="flex flex-col gap-2">
          <StatusBadge size="sm" {...returnStatus.status} />
          <Heading as="h1" size="account">
            We&apos;ll collect it <em>tomorrow</em>
          </Heading>
          <p className="font-sans text-base leading-sm text-text-secondary md:text-lg md:leading-lg">{returnStatus.window}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:pt-6 xl:flex-row xl:items-start xl:gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <OrderItemRow
            name={returnStatus.item.name}
            detail={returnStatus.item.detail}
            price={returnStatus.item.price}
            quantity={1}
            tint="sage"
            image={packshot(returnStatus.item.image)}
            className="rounded-lg bg-surface-subtle p-4"
          />
          <div className="rounded-lg border border-border-subtle p-5 md:p-7">
            <ProgressSteps size="sm" steps={[...returnStatus.steps]} />
          </div>
        </div>

        <OrderBreakdown
          className="xl:w-85 xl:shrink-0"
          title="Your refund"
          totalFirst
          total={{ label: "Amount", value: returnStatus.refund }}
          rows={[
            { label: "Refund to", value: "MTN MoMo •••• 7781" },
            { label: "Pickup from", value: "14 Lagos Ave, East Legon" },
            { label: "Pickup cost", value: "Free", highlight: true },
          ]}
          note="Refunds land within 3 days of the item reaching us. We'll text you at each step."
          actions={
            <>
              <Button size="md">Reschedule pickup</Button>
              <Button size="md" variant="secondary">
                Cancel return
              </Button>
            </>
          }
          footer={
            <>
              Need help?{" "}
              <TextLink href={whatsappHref} target="_blank" rel="noreferrer">
                Chat with us
              </TextLink>
            </>
          }
        />
      </div>
    </AccountPage>
  );
}
