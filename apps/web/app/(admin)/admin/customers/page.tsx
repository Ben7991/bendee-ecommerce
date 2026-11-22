import type { Metadata } from "next";
import Link from "next/link";

import { Button, Icon } from "@repo/ui/atoms";
import { ListSearch } from "@repo/ui/molecules";
import { AdminPageHeader, AdminStats, CustomerTable, SavedViews } from "@repo/ui/organisms";

import { customerStats, customerViews, customersSummary, findCustomers } from "../../../_content/admin-customers";

export const metadata: Metadata = { title: "Customers" };

type SearchParams = Promise<{ segment?: string; q?: string; page?: string }>;

/** /admin/customers (Paper "Jofak - Admin" → Customers). Sample data; segments and search narrow the eight sample customers. */
export default async function AdminCustomersPage({ searchParams }: { searchParams: SearchParams }) {
  const { segment, q } = await searchParams;
  const active = customerViews.find((view) => view.segment === segment) ?? customerViews[0]!;
  const customers = findCustomers({ segment: active.segment, q });
  // A segment or search shows its matches on one page; "All" shows the design's paging.
  const narrowed = Boolean(active.segment || q);
  const base = active.segment ? `${active.href}&` : "/admin/customers?";

  return (
    <>
      <AdminPageHeader
        layout="inline"
        title="Customers"
        description={
          <>
            <span className="md:hidden">
              {customersSummary.total} · {customersSummary.repeatShare} repeat · avg LTV GHS {customersSummary.averageValue}
            </span>
            <span className="hidden md:inline">
              {customersSummary.total} customers · {customersSummary.orderedRecently} ordered in
              <span className="hidden xl:inline"> the last</span> 30 days
            </span>
          </>
        }
        actions={
          <Button asChild variant="secondary" size="sm" className="hidden h-11 gap-2 md:inline-flex">
            <a href="/admin/customers/export.csv" download>
              <Icon name="export" size={16} /> Export
            </a>
          </Button>
        }
      />

      <AdminStats aria-label="Customers at a glance" stats={customerStats} />

      {/* Desktop: segments left, search right; tablet: search, then segments; mobile: search, then chips. */}
      <div className="flex flex-col gap-4 md:gap-2.5 xl:flex-row xl:items-center xl:justify-between">
        <SavedViews
          linkAs={Link}
          variant="segmented"
          aria-label="Customer segments"
          views={customerViews}
          activeHref={active.href}
          className="order-2 xl:order-none"
        />
        <ListSearch
          linkAs={Link}
          action="/admin/customers"
          label="Search customers"
          placeholder="Name, phone or email"
          defaultQuery={q}
          keep={active.segment ? { segment: active.segment } : {}}
          filtersHref={`${base}filters=open`}
          fieldClassName="xl:w-70"
          className="order-1 xl:order-none"
        />
      </div>

      <CustomerTable
        linkAs={Link}
        customers={customers}
        range={narrowed ? (customers.length ? `1–${customers.length}` : "0") : customersSummary.range}
        total={narrowed ? String(customers.length) : customersSummary.total}
        note="phone numbers are masked; opening a profile is logged"
        nextHref={narrowed ? undefined : `${base}page=2`}
        emptyMessage={q ? `No customers match “${q}”.` : "No customers in this segment."}
      />
    </>
  );
}
