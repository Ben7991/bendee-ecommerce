import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button, Heading, Icon, IconButton, StatusBadge, TextLink } from "@repo/ui/atoms";
import { BackLink, DeliveryBanner, ProgressSteps, SettingCard, SummaryCard, type ProgressStep } from "@repo/ui/molecules";
import { CancelOrderDialog, OrderBreakdown } from "@repo/ui/organisms";

import { cancelOrder } from "../../../_actions/account";
import { activeOrder, cancelReasons, orderDetail, whatsappHref } from "../../../_content/account";
import { AccountAppBar, AccountPage, packshot } from "../../_components/account-page";

export const metadata: Metadata = { title: "Order details", robots: { index: false } };

/**
 * /account/orders/[number] (Paper: Account — Order detail; mobile: Order tracking; Cancel order
 * modal / sheet). Only the sample order JFK-250184 exists. It shows "Out for delivery" as in
 * Paper; ?state=packing shows it before dispatch, when it can still be cancelled, and
 * ?cancel=1 opens the cancel dialog straight away.
 */
export default async function OrderDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ number: string }>;
  searchParams: Promise<{ state?: string; cancel?: string }>;
}) {
  const { number } = await params;
  const { state, cancel } = await searchParams;
  if (number !== orderDetail.number) notFound();
  const packing = state === "packing";

  const steps: ProgressStep[] = packing
    ? [
        { title: "Order placed & paid", time: "Fri 13 Nov, 10:42", state: "done" },
        { title: "Packing", detail: "We're getting your order ready at our Accra hub", time: "Today", state: "current" },
        { title: "Out for delivery", detail: "Tomorrow, with our delivery partner", state: "upcoming" },
        { title: "Delivered", time: "Expected Sat 14 Nov", state: "upcoming" },
      ]
    : [
        { title: "Order placed & paid", time: "Fri 13 Nov, 10:42", state: "done" },
        { title: "Packed at our Accra hub", time: "Fri 13 Nov, 16:10", state: "done" },
        {
          title: "Out for delivery",
          detail: (
            <>
              <span className="md:hidden">We&apos;ll text you when it&apos;s close</span>
              <span className="hidden md:inline">Handed to our delivery partner — we&apos;ll text you when it&apos;s close</span>
            </>
          ),
          time: (
            <>
              <span className="md:hidden">09:20</span>
              <span className="hidden md:inline">Today, 09:20</span>
            </>
          ),
          state: "current",
        },
        { title: "Delivered", time: "Expected by 13:00", state: "upcoming" },
      ];

  const items = activeOrder.lines.map((line) => ({ ...line, image: packshot(line.image) }));
  // Rendered for desktop (in the summary) and mobile (under it); only one opens from ?cancel=1.
  const cancelDialog = (open: boolean) => (
    <CancelOrderDialog
      defaultOpen={open}
      trigger={
        <Button size="md" variant="dangerOutline">
          Cancel order
        </Button>
      }
      description={`${orderDetail.number} · we haven't started packing yet`}
      reasons={cancelReasons}
      action={cancelOrder}
      fields={{ order: orderDetail.number }}
      refund={{
        brand: "mtn",
        text: (
          <>
            <strong>{orderDetail.total} refunded</strong> to {orderDetail.payment}. Usually arrives within 1–3 days.
          </>
        ),
      }}
      help={
        <>
          Just want to change something?{" "}
          <TextLink href={whatsappHref} target="_blank" rel="noreferrer">
            Chat with us
          </TextLink>{" "}
          — we can often edit it for you.
        </>
      }
    />
  );

  return (
    <AccountPage
      section="orders"
      appBar={
        <AccountAppBar
          title={orderDetail.number}
          backHref="/account/orders"
          backLabel="Back to your orders"
          action={
            <IconButton asChild label="Get help with this order" size="md" className="size-10">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <Icon name="chat" size={16} />
              </a>
            </IconButton>
          }
        />
      }
    >
      {/* Mobile heading (Paper: Order tracking) */}
      <div className="flex flex-col gap-2 md:hidden">
        <StatusBadge size="sm" tone={packing ? "info" : "accent"} label={packing ? "Packing" : "Out for delivery"} />
        <Heading as="h1" size="account">
          Arriving <em>{packing ? "tomorrow" : "today"}</em>
        </Heading>
        <p className="font-sans text-base leading-sm text-text-secondary">
          {packing ? "Sat 14 Nov · East Legon" : "Between 11:00 and 13:00 · East Legon"}
        </p>
      </div>

      {/* 768 up heading */}
      <div className="hidden flex-col gap-4 md:flex">
        <BackLink asChild>
          <Link href="/account/orders">All orders</Link>
        </BackLink>
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <Heading as="h2" size="detail">
                Order {orderDetail.number}
              </Heading>
              <StatusBadge tone={packing ? "info" : "accent"} label={packing ? "Packing" : "Out for delivery"} className="px-3.5 py-1.5" />
            </div>
            <p className="font-sans text-base leading-sm text-text-muted">{orderDetail.placed}</p>
          </div>
          <div className="flex gap-2">
            <Button size="xs" variant="secondary" className="gap-1.5">
              <Icon name="download" size={14} /> Receipt
            </Button>
            <Button asChild size="xs" variant="secondary" className="gap-1.5">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <Icon name="chat" size={14} /> Get help
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {!packing && (
            <DeliveryBanner
              eyebrow="With our delivery partner"
              title="Arriving today, 11:00–13:00"
              compactTitle="By 13:00 today"
              action={
                <Button asChild size="xs" variant="secondary" className="gap-2 border-0 px-5 py-3 text-primary dark:text-text">
                  <Link href={orderDetail.trackingHref}>
                    <Icon name="arrowUpRight" size={14} />
                    <span className="md:hidden">Track</span>
                    <span className="hidden md:inline">Track parcel</span>
                  </Link>
                </Button>
              }
            />
          )}
          <SummaryCard eyebrow="Tracking" className="gap-5 md:p-6">
            <ProgressSteps steps={steps} />
          </SummaryCard>
          <SettingCard
            icon="mapPin"
            title={
              <>
                <span className="md:hidden">{orderDetail.address.short}</span>
                <span className="hidden md:inline">{orderDetail.address.line}</span>
              </>
            }
            description={orderDetail.address.detail}
            compactDescription={orderDetail.address.shortDetail}
          />
        </div>

        <OrderBreakdown
          className="xl:w-95 xl:shrink-0"
          items={items}
          rows={orderDetail.totals}
          total={{ label: "Total paid", value: orderDetail.total }}
          actions={
            <>
              <Button size="md" className="gap-2">
                <Icon name="reorder" size={15} /> Reorder these items
              </Button>
              {packing && cancelDialog(cancel === "1")}
            </>
          }
          footer={
            packing ? (
              "Changed your mind? You can cancel until we start packing."
            ) : (
              <>
                Already on its way, so it can&apos;t be cancelled.{" "}
                <TextLink asChild tone="muted">
                  <Link href={`/account/orders/${orderDetail.number}/return`}>Request a return</Link>
                </TextLink>{" "}
                after delivery.
              </>
            )
          }
          compact={{
            items,
            title: `4 items · ${orderDetail.total}`,
            detail: `Paid · ${orderDetail.payment}`,
          }}
        />
      </div>

      {/* Mobile actions */}
      <div className="grid grid-cols-2 gap-2.5 md:hidden">
        <Button size="md" variant="secondary">
          Receipt
        </Button>
        <Button size="md">Reorder items</Button>
        {packing && <div className="col-span-2 flex flex-col *:w-full">{cancelDialog(false)}</div>}
      </div>
    </AccountPage>
  );
}
