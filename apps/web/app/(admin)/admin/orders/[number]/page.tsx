import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button, Icon } from "@repo/ui/atoms";
import { ActionRow } from "@repo/ui/molecules";
import {
  FulfilmentProgress,
  OrderActivity,
  OrderCancelDialog,
  OrderDeliveryCard,
  OrderDetailHeader,
  OrderItemsCard,
  OrderPaymentCard,
  OrderRefundDialog,
  ReviewFlag,
  StickyActionBar,
} from "@repo/ui/organisms";

import {
  addOrderNote,
  advanceOrder,
  cancelAdminOrder,
  logContactReveal,
  markOrderReviewed,
  refundAdminOrder,
  saveCourierTracking,
} from "../../../../_actions/admin-orders";
import {
  cancelReasons,
  findOrderDetail,
  lineAmount,
  refundApprovalThreshold,
  refundReasons,
  type DetailLine,
  type OrderDetail,
} from "../../../../_content/admin-order-detail";
import { placeholderSrc } from "../../../../_lib/placeholder";
import { CustomerCard, MoreMenu } from "../../_components/order-detail";

type Params = Promise<{ number: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { number } = await params;
  return { title: number };
}

function packshot(line: DetailLine, sizes: string) {
  const src = placeholderSrc(`${line.image}.png`);
  return src ? <Image src={src} alt="" fill sizes={sizes} className="object-cover" /> : null;
}

/** The main button for the order's next step: a form for status changes, the refund dialog once delivered. */
function PrimaryAction({ order, size }: { order: OrderDetail; size: "header" | "bar" }) {
  const bar = size === "bar";
  const className = bar ? "h-13 flex-1 gap-2 text-base" : "h-11 gap-2";
  if (!order.primary) return null;
  if (order.primary.kind === "refund" && order.refund) {
    return (
      <OrderRefundDialog
        trigger={
          <Button size="sm" className={className}>
            <Icon name="undo" size={bar ? 18 : 16} /> Refund
          </Button>
        }
        number={order.number}
        summary={order.refund.summary}
        compactSummary={order.refund.compactSummary}
        lines={order.lines.map((line, index) => ({
          id: line.id,
          name: line.name,
          unitPrice: line.unitPrice,
          bought: line.quantity,
          tint: line.tint,
          image: packshot(line, "40px"),
          defaultQuantity: index === 0 ? 1 : 0,
        }))}
        deliveryFee={order.refund.deliveryFee}
        paid={order.refund.paid}
        reasons={refundReasons}
        method={order.refund.method}
        approvalThreshold={refundApprovalThreshold}
        action={refundAdminOrder}
        fields={{ order: order.number }}
      />
    );
  }
  if (order.primary.kind !== "advance") return null;
  return (
    <form action={advanceOrder} className={bar ? "flex flex-1" : "contents"}>
      <input type="hidden" name="order" value={order.number} />
      <input type="hidden" name="intent" value={order.primary.intent} />
      <Button type="submit" size="sm" className={className}>
        <Icon name={order.primary.icon} size={bar ? 18 : 16} /> {order.primary.label}
      </Button>
    </form>
  );
}

/** /admin/orders/[number] (Paper "Jofak - Admin" → Order detail, Cancel order, Refund). Sample data; actions change nothing yet. */
export default async function AdminOrderPage({ params }: { params: Params }) {
  const { number } = await params;
  const order = findOrderDetail(number);
  if (!order) notFound();

  const printHref = `/admin/orders/${order.number}/packing-slip`;
  const fields = { order: order.number };

  return (
    <>
      <OrderDetailHeader
        linkAs={Link}
        backHref="/admin/orders"
        number={order.number}
        status={order.status}
        payment={order.payment}
        meta={order.meta}
        total={order.total}
        placed={order.placed}
        more={<MoreMenu items={order.more} />}
        actions={
          <>
            <MoreMenu items={order.more} />
            <Button asChild variant="secondary" size="sm" className="h-11 gap-2">
              <Link href={printHref}>
                <Icon name="printer" size={16} /> Print packing slip
              </Link>
            </Button>
            <PrimaryAction order={order} size="header" />
          </>
        }
      />

      <FulfilmentProgress steps={order.steps} variant="compact" className="md:hidden" />

      {order.flag && (
        <ReviewFlag
          title={order.flag.title}
          compactTitle={order.flag.compactTitle}
          body={order.flag.body}
          compactBody={order.flag.compactBody}
          actions={
            <>
              <Link
                href={`/admin/customers/${order.customer.slug}#history`}
                className="hidden h-9 items-center rounded-full px-3.5 text-sm leading-xs font-semibold hover:underline md:flex"
              >
                View history
              </Link>
              <form action={markOrderReviewed}>
                <input type="hidden" name="order" value={order.number} />
                <button
                  type="submit"
                  className="flex h-9 items-center rounded-full bg-bg px-4 text-sm leading-xs font-semibold text-text hover:bg-surface-subtle"
                >
                  Mark as reviewed
                </button>
              </form>
            </>
          }
        />
      )}

      <FulfilmentProgress steps={order.steps} className="hidden md:block" />

      {/*
       * One grid, reordered per breakpoint: mobile stacks items, customer, delivery, activity and
       * the cancel action; tablet puts the side cards two by two between items and activity; from
       * 1440px the left and right columns become real columns.
       */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:flex xl:items-start">
        <div className="contents xl:flex xl:min-w-0 xl:flex-1 xl:flex-col xl:gap-6">
          <OrderItemsCard
            pickable={order.pickable}
            items={order.lines.map((line) => ({ ...line, ...lineAmount(line), image: packshot(line, "52px") }))}
            totals={order.totals}
            className="order-0 md:col-span-2 xl:order-none"
          />
          <OrderActivity
            events={order.events}
            action={addOrderNote}
            fields={fields}
            className="order-3 md:order-5 md:col-span-2 xl:order-none"
          />
        </div>

        <div className="contents xl:flex xl:w-90 xl:shrink-0 xl:flex-col xl:gap-4">
          <CustomerCard
            name={order.customer.name}
            stats={order.customer.stats}
            compactStats={order.customer.compactStats}
            phone={order.customer.phone}
            email={order.customer.email}
            profileHref={`/admin/customers/${order.customer.slug}`}
            onReveal={logContactReveal.bind(null, order.number)}
            className="order-1 xl:order-none"
          />
          <OrderDeliveryCard
            method={order.delivery.method}
            compactMethod={order.delivery.compactMethod}
            street={order.delivery.street}
            area={order.delivery.area}
            compactArea={order.delivery.compactArea}
            gps={order.delivery.gps}
            landmark={order.delivery.landmark}
            note={order.delivery.note}
            tracking={order.delivery.tracking ? { action: saveCourierTracking, fields } : undefined}
            className="order-2 md:order-3 xl:order-none"
          />
          <OrderPaymentCard
            tone={order.paymentCard.tone}
            status={order.paymentCard.status}
            method={order.paymentCard.method}
            amount={order.paymentCard.amount}
            note={order.paymentCard.note}
            className="hidden md:order-2 md:flex xl:order-none"
          />
          {(order.editLocked || order.cancel) && (
            <div className="order-4 flex flex-col gap-1 px-1 md:self-start md:py-2 xl:order-none">
              {order.editLocked && (
                <ActionRow icon="padlock" tone="muted" disabled className="hidden md:flex">
                  Edit order · locked once processing starts
                </ActionRow>
              )}
              {order.cancel && (
                <OrderCancelDialog
                  trigger={
                    <ActionRow icon="closeCircle" tone="danger" className="justify-center py-3 md:justify-start md:py-2">
                      Cancel order
                    </ActionRow>
                  }
                  number={order.number}
                  summary={order.cancel.summary}
                  reasons={cancelReasons}
                  money={order.cancel.money}
                  switches={order.cancel.switches}
                  action={cancelAdminOrder}
                  fields={fields}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <StickyActionBar
        action={
          <div className="flex gap-2.5">
            <Link
              href={printHref}
              aria-label="Print packing slip"
              className="flex size-13 shrink-0 items-center justify-center rounded-full border border-border text-text hover:bg-surface-subtle"
            >
              <Icon name="printer" size={20} strokeWidth={1.3} />
            </Link>
            <PrimaryAction order={order} size="bar" />
          </div>
        }
        className="pt-3 pb-6 shadow-none"
      />
    </>
  );
}
