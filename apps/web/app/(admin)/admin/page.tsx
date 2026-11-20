import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button, Icon } from "@repo/ui/atoms";
import { KpiTile, SegmentedControl, TaskTile } from "@repo/ui/molecules";
import {
  AdminPageHeader,
  AttentionPanel,
  KpiGroup,
  LowStockCard,
  OrdersToPackCard,
  PaymentHealthCard,
  RevenueChart,
} from "@repo/ui/organisms";

import { attention, greeting, kpis, lowStock, ordersToPack, payments, ranges, revenue } from "../../_content/admin-dashboard";
import { placeholderSrc } from "../../_lib/placeholder";

export const metadata: Metadata = { title: "Dashboard" };

function packshot(id: string) {
  const src = placeholderSrc(`${id}.png`);
  return src ? <Image src={src} alt="" fill sizes="44px" className="object-cover" /> : null;
}

/** /admin (Paper "Jofak - Admin" → Dashboard). Static sample data; nothing loads or saves yet. */
export default function AdminDashboardPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow={greeting.eyebrow}
        title={greeting.title}
        highlight={greeting.name}
        actions={
          <>
            <SegmentedControl aria-label="Date range" options={ranges} defaultValue="today" />
            <Button asChild size="sm" className="size-11 gap-2 px-0 md:w-auto md:px-5">
              <Link href="/admin/products/new" aria-label="Add product">
                <Icon name="plus" size={14} strokeWidth={2.2} />
                <span className="hidden md:inline">Add product</span>
              </Link>
            </Button>
          </>
        }
      />

      <KpiGroup aria-label="Today at a glance">
        {kpis.map(({ id, ...kpi }) => (
          <KpiTile key={id} {...kpi} />
        ))}
      </KpiGroup>

      <AttentionPanel meta={attention.updated}>
        <TaskTile asChild icon="box" value={attention.toPack.value} label="Orders to pack">
          <Link href={attention.toPack.href} />
        </TaskTile>
        <TaskTile asChild icon="pickup" value={attention.pickup.value} label="Waiting for pickup">
          <Link href={attention.pickup.href} />
        </TaskTile>
        <TaskTile asChild icon="scooter" value={attention.outForDelivery.value} label="Out for delivery">
          <Link href={attention.outForDelivery.href} />
        </TaskTile>
        <TaskTile asChild tone="citrus" icon="card" value={attention.failedPayments.value} label="Failed payments, 24 h">
          <Link href={attention.failedPayments.href} />
        </TaskTile>
        <TaskTile
          asChild
          tone="sun"
          icon="banknote"
          value={
            <>
              <span className="text-14 text-text-secondary">GHS </span>
              {attention.codToRemit.amount}
            </>
          }
          label="Cash on delivery to remit"
        >
          <Link href={attention.codToRemit.href} />
        </TaskTile>
      </AttentionPanel>

      <div className="flex flex-col gap-6 xl:flex-row xl:items-stretch">
        <RevenueChart summary={revenue.summary} max={revenue.max} ticks={revenue.ticks} days={revenue.days} className="xl:flex-1" />
        <PaymentHealthCard
          summary={payments.summary}
          rate={payments.rate}
          methods={payments.methods}
          alert={
            <>
              <strong className="font-semibold">{payments.alert.headline}</strong>
              {payments.alert.body}
            </>
          }
          className="xl:w-90 xl:shrink-0"
        />
      </div>

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <OrdersToPackCard
          linkAs={Link}
          count={ordersToPack.count}
          orders={ordersToPack.orders}
          viewAllHref="/admin/orders"
          printHref="/admin/orders/pick-list"
          className="xl:flex-1"
        />
        <LowStockCard
          linkAs={Link}
          count={lowStock.count}
          items={lowStock.items.map((item) => ({
            ...item,
            image: packshot(item.id),
          }))}
          action={{ label: "Receive stock", href: "/admin/inventory/receive" }}
          footer={{
            label: `See all ${lowStock.count} in Inventory`,
            href: "/admin/inventory",
          }}
          className="xl:w-90 xl:shrink-0"
        />
      </div>
    </>
  );
}
