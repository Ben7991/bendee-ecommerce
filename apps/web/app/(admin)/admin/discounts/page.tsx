import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Icon } from "@repo/ui/atoms";
import { ListSearch, SelectPill } from "@repo/ui/molecules";
import { AdminPageHeader, AdminStats, DiscountTable, SavedViews, SectionTabs } from "@repo/ui/organisms";

import { createDiscountAction, extendDiscountAction } from "../../../_actions/admin-discounts";
import { discountStats, discountViews, findDiscounts, nextScheduled, type DiscountsView } from "../../../_content/admin-discounts";
import { placeholderSrc } from "../../../_lib/placeholder";

export const metadata: Metadata = { title: "Discounts" };

type SearchParams = Promise<{ view?: string; q?: string; type?: string }>;

const TYPES = [
  { value: "", label: "Type" },
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed amount" },
  { value: "delivery", label: "Free delivery" },
];

function packshot(image: string | undefined) {
  const src = image && placeholderSrc(`${image}.png`);
  return src ? <Image src={src} alt="" fill sizes="24px" className="object-cover" /> : undefined;
}

/** /admin/discounts (Paper "Jofak - Admin" → Discounts). Sample discounts kept in server memory; the editor saves them. */
export default async function AdminDiscountsPage({ searchParams }: { searchParams: SearchParams }) {
  const { view: viewParam, q, type } = await searchParams;
  const view: DiscountsView = viewParam === "scheduled" || viewParam === "expired" ? viewParam : "active";
  const views = discountViews();
  const active = views.find((item) => item.view === view)!;
  const { stats, live, redeemed, scheduled } = discountStats();
  const discounts = findDiscounts({ view, q, type }).map(({ image, ...discount }) => ({ ...discount, conditionImage: packshot(image) }));
  const next = view === "active" ? nextScheduled() : undefined;
  const keep = { ...(view !== "active" ? { view } : {}), ...(type ? { type } : {}) };

  return (
    <>
      <AdminPageHeader
        layout="inline"
        title="Discounts"
        description={
          <>
            <span className="md:hidden">
              {live} live · {redeemed} redeemed in 30 days
            </span>
            <span className="hidden md:inline xl:hidden">
              {live} live · {scheduled} scheduled
            </span>
            <span className="hidden xl:inline">Codes and automatic offers · applied at checkout, never stacked unless allowed</span>
          </>
        }
        actions={
          <form action={createDiscountAction} className="hidden md:block">
            <button
              type="submit"
              className="flex h-10.5 items-center gap-2 rounded-full bg-primary px-4 text-14 leading-4.5 font-semibold text-on-primary hover:bg-primary-hover xl:h-11 xl:px-4.5"
            >
              <Icon name="plus" size={16} strokeWidth={1.8} className="hidden xl:inline-block" />
              Create discount
            </button>
          </form>
        }
      />

      <AdminStats variant="cards" aria-label="Discounts at a glance" stats={stats} />

      <div className="flex flex-col gap-3.5">
        <SectionTabs
          linkAs={Link}
          aria-label="Discount views"
          tabs={views.map((item) => ({ href: item.href, label: item.label, compactLabel: `${item.label} ${item.count}` }))}
          activeHref={active.href}
          className="md:hidden"
        />
        <div className="hidden items-center gap-2 md:flex xl:gap-2.5">
          <SavedViews linkAs={Link} variant="segmented" fill={false} aria-label="Discount views" views={views} activeHref={active.href} />
          <ListSearch
            linkAs={Link}
            action="/admin/discounts"
            label="Search codes"
            placeholder="Search codes"
            defaultQuery={q}
            keep={keep}
            className="min-w-0 flex-1 xl:justify-end"
            fieldClassName="xl:w-70"
          >
            <SelectPill label="Type" name="type" defaultValue={type ?? ""} options={TYPES} autoSubmit className="hidden xl:flex" />
          </ListSearch>
        </div>
      </div>

      <DiscountTable
        linkAs={Link}
        discounts={discounts}
        emptyMessage={q ? `No discounts match “${q}”.` : `No ${active.label.toLowerCase()} discounts.`}
        footer={
          next && (
            <>
              <span>
                Next up: <span className="font-semibold text-text">{next.title}</span> · {next.summary}
              </span>
              <Link href="/admin/discounts?view=scheduled" className="font-semibold text-text hover:underline">
                View scheduled
              </Link>
            </>
          )
        }
        extend={(discount) => (
          <form action={extendDiscountAction.bind(null, discount.href.split("/").pop()!)}>
            <button
              type="submit"
              className="flex h-8 items-center rounded-full border border-border bg-bg px-3.5 text-xs leading-xs font-semibold text-text dark:bg-surface"
            >
              Extend
            </button>
          </form>
        )}
      />

      {/* Mobile: create discount. */}
      <form action={createDiscountAction} className="fixed right-4 bottom-24 z-30 md:hidden">
        <button
          type="submit"
          aria-label="Create discount"
          className="flex size-13 items-center justify-center rounded-full bg-primary text-on-primary shadow-card"
        >
          <Icon name="plus" size={20} strokeWidth={2} />
        </button>
      </form>
    </>
  );
}
