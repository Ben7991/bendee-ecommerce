import type { Metadata } from "next";
import Link from "next/link";

import { Button, Icon } from "@repo/ui/atoms";
import { FilterButton } from "@repo/ui/molecules";
import { AdminPageHeader, FilterBar, SavedViews } from "@repo/ui/organisms";

import { bulkUpdateOrders } from "../../../_actions/admin-orders";
import { bulkActions, findOrders, orderViews, ordersSummary, sortOptions } from "../../../_content/admin-orders";
import { OrdersTable } from "../_components/orders-table";

export const metadata: Metadata = { title: "Orders" };

type SearchParams = Promise<{ view?: string; q?: string; sort?: string }>;

/** /admin/orders (Paper "Jofak - Admin" → Orders). Sample data; filters and bulk actions change nothing yet. */
export default async function AdminOrdersPage({ searchParams }: { searchParams: SearchParams }) {
  const { view, q, sort } = await searchParams;
  const active = orderViews.find((item) => item.slug === view) ?? orderViews[0]!;
  const orders = findOrders({ view: active.slug, q });
  const base = active.slug ? `/admin/orders?view=${active.slug}&` : "/admin/orders?";
  // The sample has ten orders: a view or search shows its matches on one page; "All" shows the design's paging.
  const narrowed = Boolean(active.slug || q);
  const paging = narrowed
    ? { page: 1, pageCount: 1, range: orders.length ? `1–${orders.length}` : "0", total: String(orders.length) }
    : { page: ordersSummary.page, pageCount: ordersSummary.pageCount, range: ordersSummary.range, total: ordersSummary.total };

  return (
    <>
      <AdminPageHeader
        layout="inline"
        title="Orders"
        description={
          <>
            {ordersSummary.total} orders ·{" "}
            <strong className="font-semibold text-text">
              {ordersSummary.needAction} need action<span className="hidden md:inline"> today</span>
            </strong>
          </>
        }
        actions={
          <>
            <Button asChild variant="secondary" size="sm" className="hidden h-11 gap-2 md:inline-flex">
              <a href="/admin/orders/export.csv" download>
                <Icon name="export" size={16} /> Export CSV
              </a>
            </Button>
            <Button asChild size="sm" className="size-11 gap-2 px-0 md:w-auto md:px-5">
              <Link href="/admin/orders/pick-list" aria-label="Print pick lists">
                <Icon name="printer" size={16} />
                <span className="hidden md:inline">Print pick lists</span>
              </Link>
            </Button>
          </>
        }
      />

      <SavedViews linkAs={Link} views={orderViews} activeHref={active.href} saveView={{ href: "/admin/orders/views/new" }} />

      <FilterBar
        action="/admin/orders"
        keep={active.slug ? { view: active.slug } : {}}
        searchLabel="Search orders"
        placeholder="Order no., phone, name or email"
        compactPlaceholder="Order no., phone or name"
        defaultQuery={q}
        appliedCount={1}
        sort={{ defaultValue: sort ?? "newest", options: sortOptions }}
      >
        <FilterButton label="Status" />
        <FilterButton label="Payment" />
        <FilterButton label="Delivery" />
        <FilterButton asChild variant="applied" label="Last 7 days">
          <Link href={active.href} />
        </FilterButton>
      </FilterBar>

      <OrdersTable
        orders={orders}
        bulkActions={bulkActions}
        bulkAction={bulkUpdateOrders}
        loadMoreHref={paging.pageCount > 1 ? `${base}page=2` : undefined}
        emptyMessage={q ? `No orders match “${q}”.` : "No orders in this view."}
        pageHrefBase={base}
        pagination={{
          ...paging,
          perPage: { value: 10, options: [10, 25, 50] },
        }}
      />
    </>
  );
}
