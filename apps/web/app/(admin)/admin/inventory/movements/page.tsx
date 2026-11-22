import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Icon } from "@repo/ui/atoms";
import { ListSearch, SelectPill } from "@repo/ui/molecules";
import { MovementTable, SavedViews, SectionTabs } from "@repo/ui/organisms";

import {
  findMovements,
  inventoryTabs,
  loggedCount,
  movementPeriodOptions,
  movementTypeOptions,
  movementViews,
  movementsSummary,
  showsOlder,
  type MovementType,
} from "../../../../_content/admin-inventory";
import { placeholderSrc } from "../../../../_lib/placeholder";
import { InventoryPanels } from "../_panels";

export const metadata: Metadata = { title: "Stock movements" };

type SearchParams = Promise<{
  type?: string;
  period?: string;
  q?: string;
  page?: string;
  receive?: string;
  adjust?: string;
  mode?: string;
}>;

/** /admin/inventory/movements: the stock history (Paper "Jofak - Admin" → Inventory → Movements). Sample data. */
export default async function AdminStockMovementsPage({ searchParams }: { searchParams: SearchParams }) {
  const { type: typeParam, period: periodParam, q, page: pageParam, receive, adjust, mode } = await searchParams;
  const type = movementViews.find((view) => view.type === typeParam)?.type as MovementType | undefined;
  const period = movementPeriodOptions.some((option) => option.value === periodParam) ? periodParam! : "7d";
  const page = Number(pageParam) >= 2 ? 2 : 1;
  const active = movementViews.find((view) => view.type === type) ?? movementViews[0]!;
  const query = { type, q, period, page };
  const days = findMovements(query);
  const shown = days.reduce((sum, day) => sum + day.movements.length, 0);
  const params = new URLSearchParams({
    ...(type && { type }),
    ...(period !== "7d" && { period }),
    ...(q && { q }),
    ...(page > 1 && { page: "2" }),
  }).toString();
  const base = `/admin/inventory/movements${params ? `?${params}` : ""}`;
  const narrowed = Boolean(type || q);
  const total = movementsSummary.total + loggedCount();
  // Load more reaches past the week, so the count stops saying "this week".
  const span = period === "30d" ? "in 30 days" : period === "90d" ? "in 90 days" : page > 1 ? "so far" : "this week";
  // The sample's older days are the "more": once they're in view there is nothing left to load.
  const loadMoreHref = narrowed || showsOlder(query) ? undefined : `${base}${base.includes("?") ? "&" : "?"}page=2`;

  return (
    <>
      <div className="flex flex-col gap-4">
        <SectionTabs
          linkAs={Link}
          aria-label="Inventory"
          tabs={inventoryTabs}
          activeHref="/admin/inventory/movements"
          trailing={
            <ListSearch
              linkAs={Link}
              action="/admin/inventory/movements"
              label="Search movements"
              placeholder="Product, invoice or order"
              defaultQuery={q}
              className="min-w-0 flex-1 xl:flex-none"
              fieldClassName="xl:w-55"
            >
              <SelectPill label="Movement type" name="type" defaultValue={type ?? ""} options={movementTypeOptions} autoSubmit />
              <SelectPill label="Period" name="period" icon="calendar" defaultValue={period} options={movementPeriodOptions} autoSubmit />
              <a
                href={`/admin/inventory/movements/export.csv${params ? `?${params}` : ""}`}
                download
                aria-label="Export movements"
                className="flex size-10 shrink-0 items-center justify-center gap-1.5 rounded-full border border-border text-sm leading-4 font-semibold text-text hover:bg-surface-subtle xl:h-9.5 xl:w-auto xl:border-0 xl:px-3.5"
              >
                <Icon name="download" size={14} strokeWidth={1.5} />
                <span className="hidden xl:inline">Export</span>
              </a>
            </ListSearch>
          }
        />
        <SavedViews linkAs={Link} aria-label="Movement type" views={movementViews} activeHref={active.href} className="md:hidden" />
      </div>

      <MovementTable
        linkAs={Link}
        days={days.map((day) => ({
          ...day,
          movements: day.movements.map(({ image, ...movement }) => ({
            ...movement,
            image:
              image && placeholderSrc(`${image}.png`) ? (
                <Image src={placeholderSrc(`${image}.png`)!} alt="" fill sizes="48px" className="object-cover" />
              ) : undefined,
          })),
        }))}
        summary={narrowed ? `Showing ${shown} movements` : `Showing ${shown} of ${total} movements ${span}`}
        compactSummary={narrowed ? `${shown} movements` : `${shown} of ${total} ${span}`}
        loadMoreHref={loadMoreHref}
        emptyMessage={q ? `No movements match “${q}”.` : "No movements of this type in this period."}
      />

      <InventoryPanels receive={receive} adjust={adjust} mode={mode} closeHref={base} />
    </>
  );
}
