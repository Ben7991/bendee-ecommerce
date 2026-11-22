import type { Metadata } from "next";
import Link from "next/link";

import { Button, Heading, Icon, IconButton, TextLink } from "@repo/ui/atoms";
import { BackLink, FilterPill, FilterPills } from "@repo/ui/molecules";
import { ActiveOrderCard, OrderHistory } from "@repo/ui/organisms";

import { activeOrder, orderFilters, pastOrders, whatsappHref, type OrderFilter } from "../../_content/account";
import { AccountPage, packshot } from "../_components/account-page";

export const metadata: Metadata = { title: "Your orders", robots: { index: false } };

/**
 * /account/orders (Paper: Account — Orders). Static sample orders; ?status= filters them.
 * Reorder doesn't add anything to the cart yet.
 */
export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status: statusParam } = await searchParams;
  const status = orderFilters.some((filter) => filter.value === statusParam) ? (statusParam as OrderFilter) : "all";
  const showActive = status === "all" || status === "in-progress";
  const past = status === "all" ? pastOrders : pastOrders.filter((order) => order.filter === status);
  const orderHref = `/account/orders/${activeOrder.number}`;

  return (
    <AccountPage section="orders">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="flex flex-col gap-1.5">
          <BackLink asChild className="md:hidden">
            <Link href="/account">My account</Link>
          </BackLink>
          <Heading as="h1" size="account">
            Your <em>orders</em>
          </Heading>
        </div>
        <FilterPills aria-label="Filter orders" className="-mr-5 md:mr-0">
          {orderFilters.map((filter) => (
            <FilterPill key={filter.value} asChild active={filter.value === status}>
              <Link href={filter.value === "all" ? "/account/orders" : `/account/orders?status=${filter.value}`} scroll={false}>
                {filter.value === "all" ? `${filter.label} · ${pastOrders.length + 1}` : filter.label}
              </Link>
            </FilterPill>
          ))}
        </FilterPills>
      </div>

      <div className="flex flex-col gap-4">
        {showActive && (
          <ActiveOrderCard
            number={activeOrder.number}
            meta={
              <>
                <span className="xl:hidden">{activeOrder.placedTablet}</span>
                <span className="hidden xl:inline">{activeOrder.placed}</span>
              </>
            }
            compactMeta={activeOrder.compactMeta}
            status={activeOrder.status}
            items={activeOrder.lines.map((line) => ({ id: line.id, tint: line.tint, image: packshot(line.image) }))}
            total={activeOrder.total}
            arrival={
              <>
                Arriving <strong>{activeOrder.arrivingDay}</strong> to {activeOrder.area}
              </>
            }
            compactArrival={
              <>
                Arriving <strong>{activeOrder.arrivingDay}</strong>
              </>
            }
            stage={activeOrder.stage}
            actions={
              <>
                <Button asChild size="xs" variant="secondary">
                  <Link href={orderHref}>View details</Link>
                </Button>
                <Button asChild size="xs">
                  <Link href={orderHref}>Track order</Link>
                </Button>
              </>
            }
            compactAction={
              <Button asChild size="xs">
                <Link href={orderHref}>Track order</Link>
              </Button>
            }
          />
        )}

        {past.length > 0 && (
          <OrderHistory
            rows={past.map((order) => ({
              id: order.number,
              number: order.number,
              meta: `${order.placed} · ${order.itemCount}`,
              status: order.status,
              items: order.lines.map((line) => ({ id: line.id, tint: line.tint, image: packshot(line.image) })),
              total: order.total,
              refunded: order.refunded,
              action: order.refunded ? (
                <TextLink asChild>
                  <Link href={`/account/orders/${order.number}`}>Details</Link>
                </TextLink>
              ) : (
                <Button size="xs" variant="secondary" className="gap-1.5">
                  <Icon name="reorder" size={13} /> Reorder
                </Button>
              ),
              compactTitle: order.headline,
              compactMeta: (
                <>
                  <strong className={order.refunded ? undefined : "text-brand"}>{order.status.label}</strong> · {order.placedShort} · {order.totalShort}
                </>
              ),
              compactAction: order.refunded ? (
                <IconButton asChild label={`Order ${order.number} details`} variant="plain" size="md" className="size-10">
                  <Link href={`/account/orders/${order.number}`}>
                    <Icon name="chevronRight" size={15} className="text-text-muted" />
                  </Link>
                </IconButton>
              ) : (
                <IconButton label={`Reorder ${order.number}`} size="md" className="size-10">
                  <Icon name="reorder" size={15} />
                </IconButton>
              ),
            }))}
          />
        )}

        {!showActive && past.length === 0 && <p className="font-sans text-base leading-sm text-text-secondary">No orders here yet.</p>}

        <p className="text-center font-sans text-sm leading-sm text-text-muted md:text-left">
          <span className="hidden md:inline">Need help with an order? </span>
          <span className="md:hidden">Need help? </span>
          <TextLink href={whatsappHref} target="_blank" rel="noreferrer">
            <span className="hidden md:inline">Chat with us on WhatsApp</span>
            <span className="md:hidden">Chat on WhatsApp</span>
          </TextLink>
        </p>
      </div>
    </AccountPage>
  );
}
