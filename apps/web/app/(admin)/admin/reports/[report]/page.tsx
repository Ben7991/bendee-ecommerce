import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Icon } from "@repo/ui/atoms";
import { ReportBars, ReportCallout, ReportCard, ReportList, ReportStackedBar, SelectPill } from "@repo/ui/molecules";
import {
  AdminPageHeader,
  CohortGrid,
  FunnelSteps,
  ReportDonut,
  ReportHistogram,
  ReportKpis,
  ReportLineChart,
  ReportTable,
  SavedViews,
  StickyActionBar,
} from "@repo/ui/organisms";

import {
  abandonmentReport,
  COMPARES,
  compareOf,
  customersReport,
  discountsReport,
  funnelReport,
  INVENTORY_LOCATIONS,
  inventoryReport,
  isReport,
  PERIODS,
  PRODUCT_BRANDS,
  PRODUCT_CATEGORIES,
  PRODUCT_SORTS,
  periodOf,
  productsReport,
  rangeLabel,
  REPORTS,
  SALES_BY,
  SALES_BY_TABS,
  salesReport,
  taxReport,
  type Period,
  type ReportSlug,
  type SalesBy,
} from "../../../../_content/admin-reports";

type Params = Promise<{ report: string }>;
type SearchParams = Promise<Record<string, string | undefined>>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { report } = await params;
  const found = REPORTS.find((item) => item.slug === report);
  return { title: found ? `${found.label} report` : "Reports" };
}

const LINK = "text-sm leading-4.5 font-semibold text-brand hover:underline";
const OUTLINE = "flex h-8 shrink-0 items-center rounded-full border border-border px-3 text-xs leading-xs font-semibold text-text hover:bg-surface-subtle";

/** A GET form of filter pills that submit on change, keeping the other query values. */
function Filters({ action, keep, children, aside }: { action: string; keep: Record<string, string | undefined>; children: ReactNode; aside?: ReactNode }) {
  return (
    <form action={action} className="flex flex-wrap items-center gap-2 md:gap-2.5">
      {Object.entries(keep).map(([key, value]) => value && <input key={key} type="hidden" name={key} value={value} />)}
      {children}
      {aside && <div className="hidden items-center gap-2.5 md:ml-auto md:flex">{aside}</div>}
    </form>
  );
}

/** /admin/reports/[report] (Paper "Jofak - Admin" → Reports). Sample figures, scaled to the period. */
export default async function AdminReportPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { report } = await params;
  if (!isReport(report)) notFound();
  const query = await searchParams;
  const period = periodOf(query.period);
  const compare = compareOf(query.compare);
  const range = rangeLabel(period, compare);
  const base = { period: period === "30" ? undefined : period, compare: compare === "previous" ? undefined : compare };
  const href = (slug: string, extra: Record<string, string | undefined> = {}) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries({ ...base, ...extra })) if (value) params.set(key, value);
    const text = params.toString();
    return `/admin/reports/${slug}${text ? `?${text}` : ""}`;
  };
  const exportHref = `/admin/reports/${report}/export.csv?period=${period}`;

  const controls = (
    <form action={`/admin/reports/${report}`} className="flex flex-wrap items-center gap-2.5">
      {Object.entries(query)
        .filter(([key]) => key !== "period" && key !== "compare")
        .map(([key, value]) => value && <input key={key} type="hidden" name={key} value={value} />)}
      <SelectPill label="Period" name="period" icon="calendar" size="lg" defaultValue={period} options={PERIODS} autoSubmit />
      <SelectPill label="Compare with" name="compare" size="lg" defaultValue={compare} options={COMPARES} autoSubmit />
    </form>
  );
  const exportButton = (
    <a href={exportHref} download className="flex h-10.5 items-center gap-2 rounded-full bg-primary px-4.5 text-14 leading-4.5 font-semibold text-on-primary hover:bg-primary-hover xl:h-11">
      <Icon name="download" size={14} strokeWidth={1.6} />
      <span className="xl:hidden">Export</span>
      <span className="hidden xl:inline">Export CSV</span>
    </a>
  );

  return (
    <>
      <AdminPageHeader
        layout="inline"
        title="Reports"
        description={
          <>
            <span className="md:hidden">{range.mobile}</span>
            <span className="hidden md:inline xl:hidden">{range.tablet}</span>
            <span className="hidden xl:inline">{range.full}</span>
          </>
        }
        actions={
          <div className="hidden items-center gap-2.5 xl:flex">
            {controls}
            {exportButton}
          </div>
        }
      />
      <div className="-mt-2 hidden items-center justify-between gap-3 md:flex xl:hidden">
        {controls}
        {exportButton}
      </div>
      <SavedViews linkAs={Link} aria-label="Reports" views={REPORTS.map((item) => ({ href: href(item.slug), label: item.label }))} activeHref={href(report)} />

      <div className="flex flex-col gap-3.5 pb-24 md:gap-4 md:pb-0 xl:gap-5">
        <Report report={report} period={period} query={query} href={href} />
      </div>

      <StickyActionBar
        className="px-4 pt-3 pb-7 shadow-none"
        action={
          <div className="flex gap-2.5">
            <details className="relative flex-1">
              <summary className="flex h-12 cursor-pointer list-none items-center justify-center gap-2 rounded-full border border-border text-base leading-5 font-semibold text-text">
                <Icon name="calendar" size={15} strokeWidth={1.4} />
                {PERIODS.find((item) => item.value === period)!.label}
              </summary>
              <div className="absolute bottom-14 left-0 flex w-full flex-col rounded-md border border-border-subtle bg-bg p-1.5 shadow-card dark:bg-surface">
                {PERIODS.map((item) => (
                  <Link
                    key={item.value}
                    href={href(report, { period: item.value === "30" ? undefined : item.value })}
                    className={`rounded-sm px-3 py-2.5 text-sm leading-4.5 ${item.value === period ? "bg-surface-subtle font-semibold text-text" : "text-text-secondary"}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
            <a href={exportHref} download className="flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-base leading-5 font-semibold text-on-primary">
              <Icon name="download" size={15} strokeWidth={1.6} />
              Export
            </a>
          </div>
        }
      />
    </>
  );
}

function Report({ report, period, query, href }: { report: ReportSlug; period: Period; query: Record<string, string | undefined>; href: (slug: string, extra?: Record<string, string | undefined>) => string }) {
  const keep = { period: query.period, compare: query.compare };
  switch (report) {
    case "sales": {
      const by = (query.by && query.by in SALES_BY ? query.by : "category") as SalesBy;
      const grain = query.grain === "week" ? "week" : "day";
      const data = salesReport(period, grain, by);
      return (
        <>
          <ReportKpis variant="compact" aria-label="Sales at a glance" kpis={data.kpis} />
          <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-stretch xl:gap-5">
            <ReportLineChart
              linkAs={Link}
              title="Revenue over time"
              description={`${grain === "week" ? "Weekly" : "Daily"} gross revenue · ${data.chart.best}`}
              compactDescription={data.chart.best.replace(/^best/, "Best")}
              current={data.chart.current}
              previous={data.chart.previous}
              max={data.chart.max}
              yTicks={data.chart.yTicks}
              xLabels={data.chart.xLabels}
              legend={data.chart.legend}
              highlight={data.chart.highlight}
              grains={[
                { label: "Day", href: href("sales", { by: query.by, grain: undefined }), active: grain === "day" },
                { label: "Week", href: href("sales", { by: query.by, grain: "week" }), active: grain === "week" },
              ]}
              className="xl:flex-1"
            />
            <ReportDonut
              title="Payment health"
              description={`${data.payments.attempts.toLocaleString("en-GB")} payment attempts via Paystack`}
              segments={data.payments.segments}
              center={{ value: `${Math.round((data.payments.segments[0]!.value / data.payments.attempts) * 100)}%`, label: "succeeded" }}
              className="xl:w-90 xl:shrink-0"
            >
              <ReportList compact rows={data.payments.methods} />
              <p className="flex gap-2 rounded-sm bg-tint-citrus px-3 py-2.5 text-xs leading-4.25 text-text">
                <Icon name="warning" size={16} strokeWidth={1.4} className="shrink-0 text-error" />
                AirtelTigo success is below 70% since 9 Nov. Staff alerted by email.
              </p>
            </ReportDonut>
          </div>
          <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-start xl:gap-5">
            <ReportCard
              title="Sales by"
              action={
                <>
                  <nav aria-label="Sales by" className="hidden flex-wrap gap-1.5 md:flex">
                    {SALES_BY_TABS.map((tab) => (
                      <Link
                        key={tab.value}
                        href={href("sales", { by: tab.value === "category" ? undefined : tab.value, grain: query.grain })}
                        aria-current={tab.value === by ? "page" : undefined}
                        className={
                          tab.value === by
                            ? "rounded-full bg-primary px-3 py-1.5 text-xs leading-xs font-semibold text-on-primary"
                            : "rounded-full border border-border px-3 py-1.25 text-xs leading-xs font-medium text-text-secondary hover:text-text"
                        }
                      >
                        {tab.label}
                      </Link>
                    ))}
                  </nav>
                  <form action="/admin/reports/sales" className="md:hidden">
                    {query.period && <input type="hidden" name="period" value={query.period} />}
                    <SelectPill label="Sales by" name="by" defaultValue={by} options={SALES_BY_TABS} autoSubmit />
                  </form>
                </>
              }
              className="xl:flex-1"
            >
              <ReportBars
                bars={data.by}
                mobileLimit={query.all ? undefined : 3}
                more={!query.all && data.by.length > 3 && <Link href={href("sales", { by: query.by, grain: query.grain, all: "1" })} className={LINK}>Show all {data.by.length}</Link>}
              />
            </ReportCard>
            <ReportCard title="Top products" action={<Link href="/admin/reports/products" className={LINK}>See all 10 ›</Link>} className="xl:w-110 xl:shrink-0">
              <ReportList rows={data.topProducts} />
            </ReportCard>
          </div>
        </>
      );
    }

    case "funnel": {
      const device = query.device === "mobile" || query.device === "desktop" ? query.device : "all";
      const data = funnelReport(period, device);
      return (
        <>
          <Filters action="/admin/reports/funnel" keep={keep}>
            <span className="hidden text-sm leading-4.5 text-text-muted md:inline">Segment</span>
            <SelectPill
              label="Device"
              name="device"
              defaultValue={device}
              options={[
                { value: "all", label: "All devices" },
                { value: "mobile", label: "Mobile" },
                { value: "desktop", label: "Desktop" },
              ]}
              autoSubmit
            />
            <SelectPill label="Source" name="source" defaultValue={query.source ?? ""} options={[{ value: "", label: "Source: All" }, { value: "whatsapp", label: "WhatsApp" }, { value: "ads", label: "Ads" }, { value: "search", label: "Search" }]} autoSubmit />
            <SelectPill label="Product" name="product" defaultValue={query.product ?? ""} options={[{ value: "", label: "Product: All products" }, { value: "greens", label: "Greens Daily" }, { value: "collagen", label: "Collagen Glow" }]} autoSubmit />
          </Filters>
          <FunnelSteps title="Purchase funnel" description={<><span className="md:hidden">{data.compactDescription}</span><span className="hidden md:inline">{data.description}</span></>} steps={data.steps} />
          <div className="flex flex-col gap-3.5 md:grid md:grid-cols-2 md:gap-4 xl:flex xl:flex-row xl:items-stretch xl:gap-5">
            <ReportCard title="Conversion by device" description="Session → order placed" className="order-2 xl:order-none xl:flex-1">
              <ReportBars bars={data.devices} />
              <p className="text-xs leading-4.25 text-text-muted">Mobile drops most at “Delivery info added” (31% vs 14% on desktop).</p>
            </ReportCard>
            <ReportCard
              title="Zero-result searches"
              description={`${data.searches.zero} of ${data.searches.total.toLocaleString("en-GB")} searches · ${((data.searches.zero / data.searches.total) * 100).toFixed(1)}%`}
              action={<Link href="/admin/products" className={LINK}>All queries ›</Link>}
              className="order-3 xl:order-none xl:flex-1"
            >
              <ReportList rows={data.searches.rows} />
            </ReportCard>
            <ReportCallout
              linkAs={Link}
              eyebrow="Biggest leak"
              title={`${data.leak.share}% of ${data.leak.step === "Added to cart" ? "product viewers never add to cart" : `shoppers leave at “${data.leak.step}”`}`}
              actions={[{ label: "View product funnel", href: href("products") }]}
              className="order-1 md:col-span-2 xl:order-none xl:col-span-1 xl:w-85 xl:shrink-0"
            >
              Worst products: Energy B-Complex (4.1% add rate) and Collagen Glow (5.0%). Both show “Low stock” on the product page.
            </ReportCallout>
          </div>
        </>
      );
    }

    case "products": {
      const category = PRODUCT_CATEGORIES.includes(query.category ?? "") ? query.category : undefined;
      const brand = PRODUCT_BRANDS.includes(query.brand ?? "") ? query.brand : undefined;
      const data = productsReport(period, category, brand, query.sort);
      return (
        <>
          <Filters
            action="/admin/reports/products"
            keep={keep}
            aside={
              <>
                <span className="text-sm leading-4.5 text-text-muted">Sort by</span>
                <SelectPill label="Sort by" name="sort" defaultValue={query.sort ?? "revenue"} options={PRODUCT_SORTS} autoSubmit />
              </>
            }
          >
            <SelectPill label="Category" name="category" defaultValue={category ?? ""} options={[{ value: "", label: "Category: All" }, ...PRODUCT_CATEGORIES.map((value) => ({ value, label: value }))]} autoSubmit />
            <SelectPill label="Brand" name="brand" defaultValue={brand ?? ""} options={[{ value: "", label: "Brand: All" }, ...PRODUCT_BRANDS.map((value) => ({ value, label: value }))]} autoSubmit className="hidden md:flex" />
          </Filters>
          <ReportKpis aria-label="Products at a glance" kpis={data.kpis} />
          <ReportTable
            title="Product performance"
            description="Views → added to cart → bought, per product"
            action={<Link href="/admin/products">All 48 products ›</Link>}
            columns={[
              { key: "product", label: "Product" },
              { key: "views", label: "Views", width: "w-20", align: "right" },
              { key: "atc", label: "Add-to-cart", width: "w-40" },
              { key: "bought", label: "Bought", width: "w-20", align: "right", wide: true },
              { key: "units", label: "Units", width: "w-16", align: "right" },
              { key: "revenue", label: "Revenue", width: "w-25", align: "right" },
              { key: "returns", label: "Returns", width: "w-20", align: "right", wide: true },
            ]}
            rows={data.rows}
            emptyMessage="No products match these filters."
          />
          <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-stretch xl:gap-5">
            <ReportCallout
              linkAs={Link}
              eyebrow="Viewed a lot, rarely added"
              title="Collagen Glow and Energy B-Complex get 22% of views but only 9% of add-to-carts"
              actions={[
                { label: "Open Collagen Glow", href: "/admin/products" },
                { label: "Open Energy B-Complex", href: "/admin/products?q=energy" },
              ]}
              className="xl:flex-1"
            >
              Both show “Low stock” and have fewer than 3 photos. Collagen Glow also has the highest return rate (3.4%, mostly “taste”).
            </ReportCallout>
            <ReportCard title="No sales this period" description="2 active products · consider a discount or a better photo" className="xl:w-100 xl:shrink-0">
              <ReportList rows={data.unsold.map(({ compact, value, ...row }) => ({ ...row, value: <><span className="md:hidden">{compact}</span><span className="hidden md:inline">{value}</span></>, valueTone: "muted" as const }))} />
            </ReportCard>
          </div>
        </>
      );
    }

    case "abandonment": {
      const data = abandonmentReport(period);
      return (
        <>
          <ReportKpis aria-label="Abandonment at a glance" kpis={data.kpis} />
          <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-stretch xl:gap-5">
            <ReportCard title="Where carts are left" description="Last step reached before 60 min of no activity" className="xl:flex-1">
              <ReportStackedBar segments={data.where} showShare />
            </ReportCard>
            <ReportCard tone="muted" title="Cart reminders" description="1 message, 1 hour after leaving" action={<Link href="/admin/marketing/abandoned-cart" className={LINK}>Edit in Marketing ›</Link>} className="xl:w-100 xl:shrink-0">
              <ReportList compact rows={data.reminders} />
              <div className="flex items-center justify-between border-t border-border-subtle pt-3 text-14 leading-5 font-semibold">
                <span className="text-text">Recovered revenue</span>
                <span className="text-base text-brand">{data.recovered}</span>
              </div>
              <p className="text-xs leading-xs text-brand">SMS recovers 3× more than email (11.6% vs 4.4%).</p>
            </ReportCard>
          </div>
          <div className="flex flex-col gap-3.5 md:grid md:grid-cols-2 md:gap-4 xl:gap-5">
            <ReportCard title="Checkout abandonment by zone" description="Higher delivery fees, more people leave">
              <ReportBars bars={data.zones} size="thin" />
            </ReportCard>
            <ReportCard title="Why payments failed" description={`${data.failures.reduce((sum, row) => sum + Number(row.value), 0)} failed payments · from Paystack`}>
              <ReportList rows={data.failures} />
            </ReportCard>
          </div>
          <ReportTable
            title="Carts to follow up"
            description="Highest value first · only customers who agreed to be contacted"
            action={<Link href="/admin/marketing">All 312 ›</Link>}
            columns={[
              { key: "customer", label: "Customer" },
              { key: "items", label: "Items", wide: true },
              { key: "left", label: "Left at", width: "w-37.5" },
              { key: "reminder", label: "Reminder", width: "w-32", wide: true },
              { key: "value", label: "Value", width: "w-20", align: "right" },
              { key: "action", label: "", width: "w-28", align: "right" },
            ]}
            rows={data.followUps.map((row) => ({
              id: row.id,
              lead: { title: row.name, sub: row.contact },
              cells: {
                items: row.items,
                left: { chip: row.left },
                reminder: row.reminder,
                value: { text: row.value, tone: "strong" as const },
                action: row.order ? (
                  <Link href={`/admin/orders/${row.order}`} className={LINK}>
                    {row.order}
                  </Link>
                ) : (
                  { action: <Link href={`/admin/customers?q=${encodeURIComponent(row.name)}`} className={OUTLINE}>Follow up</Link> }
                ),
              },
              mobile: { value: row.value, meta: [{ text: row.left.label, tone: row.left.tone === "error" ? ("error" as const) : row.left.tone === "warning" ? ("warning" as const) : row.left.tone === "success" ? ("brand" as const) : undefined }, { text: row.reminder }] },
            }))}
          />
        </>
      );
    }

    case "inventory": {
      const category = PRODUCT_CATEGORIES.includes(query.category ?? "") ? query.category : undefined;
      const data = inventoryReport(category);
      return (
        <>
          <Filters action="/admin/reports/inventory" keep={keep} aside={<span className="text-sm leading-4.5 text-text-muted">Stock counted nightly at 23:59 · valued at cost</span>}>
            <SelectPill label="Location" name="location" defaultValue={query.location ?? "osu"} options={INVENTORY_LOCATIONS.map((item) => ({ ...item, label: `Location: ${item.label}` }))} autoSubmit />
            <SelectPill label="Category" name="category" defaultValue={category ?? ""} options={[{ value: "", label: "Category: All" }, ...PRODUCT_CATEGORIES.map((value) => ({ value, label: value }))]} autoSubmit />
          </Filters>
          <ReportKpis aria-label="Stock at a glance" kpis={data.kpis} />
          <ReportTable
            title="Running low"
            description="Days left = on hand ÷ average daily sales over the last 30 days"
            action={<Link href="/admin/inventory">Open Inventory ›</Link>}
            columns={[
              { key: "variant", label: "Variant" },
              { key: "onHand", label: "On hand", width: "w-20", align: "right" },
              { key: "perDay", label: "Sold / day", width: "w-24", align: "right" },
              { key: "days", label: "Days left", width: "w-52" },
              { key: "restock", label: "Restock", width: "w-36" },
            ]}
            rows={data.low}
            emptyMessage="Nothing is running low in this category."
          />
          <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-stretch xl:gap-5">
            <ReportTable
              title="Turnover by category"
              description="How many times stock sells through in a year"
              columns={[
                { key: "category", label: "Category" },
                { key: "value", label: "Value", width: "w-25", align: "right" },
                { key: "turnover", label: "Turnover", width: "w-40" },
                { key: "days", label: "Days", width: "w-14", align: "right" },
              ]}
              rows={data.turnover}
              className="xl:flex-1"
            />
            <ReportCard tone="muted" title="Slow movers" description="Over 180 days of stock, or no sale in 60 days" className="xl:w-100 xl:shrink-0">
              <ReportList rows={data.slow} />
              <div className="flex items-center justify-between border-t border-border-subtle pt-3 text-sm leading-4.5">
                <span className="text-text-secondary">Cash tied up</span>
                <span className="text-14 font-semibold text-text">GHS 2,090</span>
              </div>
              <p className="rounded-sm bg-bg px-3 py-2.5 text-xs leading-4.25 text-text-secondary dark:bg-surface">Fastest mover: Greens Daily · 30 servings sells out in 8 days — consider ordering more per batch.</p>
            </ReportCard>
          </div>
        </>
      );
    }

    case "discounts": {
      const data = discountsReport(period);
      return (
        <>
          <ReportKpis aria-label="Discounts at a glance" kpis={data.kpis} />
          <ReportTable
            title="Discount performance"
            description="Codes and automatic discounts used this period"
            action={<Link href="/admin/discounts">Manage discounts ›</Link>}
            columns={[
              { key: "discount", label: "Discount" },
              { key: "status", label: "Status", width: "w-32" },
              { key: "uses", label: "Uses", width: "w-16", align: "right" },
              { key: "revenue", label: "Revenue", width: "w-25", align: "right" },
              { key: "cost", label: "Cost", width: "w-20", align: "right", wide: true },
              { key: "avg", label: "Avg order", width: "w-24", align: "right", wide: true },
              { key: "ret", label: "Return per GHS 1", width: "w-36", align: "right" },
            ]}
            rows={data.rows}
          />
          <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-stretch xl:gap-5">
            <ReportHistogram title="Order values around the free-delivery line" description="Orders by value · free delivery from GHS 300" bins={data.bins} markerBefore={4} className="xl:flex-1">
              Nearly twice as many orders land just above GHS 300 as just below it — shoppers add an item to get free delivery.
            </ReportHistogram>
            <ReportCallout linkAs={Link} eyebrow="Best return" title="COMEBACK5 brings back GHS 18.40 for every GHS 1 it costs" actions={[{ label: "Review SLEEPWELL15", href: "/admin/discounts" }]} className="xl:w-100 xl:shrink-0">
              SLEEPWELL15 returns the least (GHS 5.60). Most of those shoppers already buy Sleep &amp; stress at full price.
            </ReportCallout>
          </div>
        </>
      );
    }

    case "tax": {
      const data = taxReport(period);
      return (
        <>
          <div className="flex items-end justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-lg leading-6 font-semibold tracking-compact text-text md:text-xl md:leading-6.5">Tax collected</h2>
              <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-4.5">Prices include tax · rates from Settings › Taxes · confirm with your accountant before filing</p>
            </div>
            <a href={`/admin/reports/tax/export.csv?period=${period}`} download className="flex h-9.5 shrink-0 items-center gap-2 rounded-full border border-border px-3.5 text-sm leading-4.5 font-semibold text-text hover:bg-surface-subtle">
              <Icon name="download" size={13} strokeWidth={1.6} />
              <span className="hidden md:inline">GRA filing sheet</span>
              <span className="md:hidden">GRA sheet</span>
            </a>
          </div>
          <ReportKpis aria-label="Tax at a glance" kpis={data.taxKpis} />
          <ReportTable
            title="By month, for filing"
            description="GRA returns are due by the last working day of the next month"
            columns={[
              { key: "month", label: "Month" },
              { key: "sales", label: "Sales before tax", width: "w-36", align: "right" },
              { key: "vat", label: "VAT", width: "w-20", align: "right" },
              { key: "nhil", label: "NHIL", width: "w-20", align: "right", wide: true },
              { key: "getfund", label: "GETFund", width: "w-24", align: "right", wide: true },
              { key: "total", label: "Total", width: "w-24", align: "right" },
              { key: "status", label: "Return", width: "w-36" },
            ]}
            rows={data.months}
          />
          <div className="flex flex-col gap-0.5 pt-2">
            <h2 className="text-lg leading-6 font-semibold tracking-compact text-text md:text-xl md:leading-6.5">Payments</h2>
            <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-4.5">Money in through Paystack and pay on delivery, and when it reaches the bank</p>
          </div>
          <ReportKpis aria-label="Payments at a glance" kpis={data.payKpis} />
          <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-stretch xl:gap-5">
            <ReportTable
              title="By payment method"
              action={<Link href="/admin/settings">Payment settings ›</Link>}
              columns={[
                { key: "method", label: "Method" },
                { key: "orders", label: "Orders", width: "w-20", align: "right" },
                { key: "collected", label: "Collected", width: "w-28", align: "right" },
                { key: "fees", label: "Fees", width: "w-24", align: "right" },
                { key: "success", label: "Success", width: "w-24", align: "right" },
              ]}
              rows={data.methods}
              className="xl:flex-1"
            />
            <ReportCard tone="muted" title="Pay on delivery" description={`${data.delivery.orders} orders · ${data.delivery.total} · cash collected by the courier`} className="xl:w-100 xl:shrink-0">
              <ReportStackedBar segments={data.delivery.segments} size="thin" />
              <p className="rounded-sm bg-tint-sun px-3 py-2.5 text-xs leading-4.25 text-warning-text">GHS 1,440 from 6 orders is over 7 days old. Ask the courier partner to settle it.</p>
            </ReportCard>
          </div>
        </>
      );
    }

    case "customers": {
      const data = customersReport(period);
      return (
        <>
          <ReportKpis aria-label="Customers at a glance" kpis={data.kpis} />
          <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-stretch xl:gap-5">
            <CohortGrid
              title="Do customers come back?"
              description="Share of each month’s new customers who ordered again, by months since their first order"
              compactDescription="% ordering again, months after first order"
              rows={data.cohorts}
              months={5}
              note="Each new month keeps more customers: 24% came back in month 1 for June, 31% for October."
              className="xl:flex-1"
            />
            <ReportCard tone="muted" title={<><span className="md:hidden">Revenue split</span><span className="hidden md:inline">New vs returning</span></>} description={<span className="hidden md:inline">This period</span>} className="xl:w-90 xl:shrink-0">
              <div className="hidden flex-col gap-1.5 md:flex">
                <p className="flex justify-between text-sm leading-4.5 text-text-secondary">
                  Customers <span className="font-semibold text-text">67% new · 33% returning</span>
                </p>
                <ReportStackedBar size="thin" legend={false} segments={[{ label: "New", value: "67%", share: 67, tone: "soft" }, { label: "Returning", value: "33%", share: 33, tone: "primary" }]} />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="flex justify-between text-sm leading-4.5 text-text-secondary">
                  Revenue <span className="font-semibold text-text"><span className="hidden md:inline">54% new · </span>46% returning</span>
                </p>
                <ReportStackedBar size="thin" legend={false} segments={[{ label: "New", value: "54%", share: 54, tone: "soft" }, { label: "Returning", value: "46%", share: 46, tone: "primary" }]} />
              </div>
              <ReportList
                compact
                className="hidden border-t border-border-subtle pt-3 md:flex"
                rows={[
                  { id: "new", title: "Avg order · new", value: "GHS 205" },
                  { id: "returning", title: "Avg order · returning", value: "GHS 281" },
                ]}
              />
              <p className="text-xs leading-xs text-text-muted">Returning customers spend 37% more per order.</p>
            </ReportCard>
          </div>
          <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-stretch xl:gap-5">
            <ReportTable
              title="Customer groups"
              description="By how recently, how often and how much they buy · updated nightly"
              columns={[
                { key: "group", label: "Group" },
                { key: "customers", label: "Customers", width: "w-24", align: "right" },
                { key: "avg", label: "Avg spent", width: "w-24", align: "right" },
                { key: "last", label: "Last order", width: "w-28", align: "right", wide: true },
                { key: "action", label: "", width: "w-36", align: "right" },
              ]}
              rows={data.groups.map((group) => ({
                id: group.id,
                tone: group.risk ? ("warning" as const) : undefined,
                lead: { title: group.name, sub: group.sub, dot: group.dot === "track" ? ("soft" as const) : group.dot, subTone: group.risk ? ("warning" as const) : undefined },
                cells: {
                  customers: { text: String(group.customers), tone: "strong" as const },
                  avg: `GHS ${group.avg.toLocaleString("en-GB")}`,
                  last: group.risk ? { text: group.last, tone: "warning" as const } : group.last,
                  action: {
                    action: group.risk ? (
                      <Link href="/admin/marketing" className="flex h-8 items-center rounded-full bg-primary px-3 text-xs leading-xs font-semibold text-on-primary">Win them back</Link>
                    ) : (
                      <Link href="/admin/marketing" className={OUTLINE}>Send to Marketing</Link>
                    ),
                  },
                },
                mobile: group.risk
                  ? { action: <Link href="/admin/marketing" className="flex h-8 items-center rounded-full bg-primary px-3 text-xs leading-xs font-semibold text-on-primary">Win back</Link>, meta: [{ text: `${group.customers} customers`, tone: "warning" as const }, { text: `Quiet ${group.last.replace(" ago", "")}`, tone: "warning" as const }] }
                  : { value: String(group.customers), meta: [{ text: `Avg GHS ${group.avg.toLocaleString("en-GB")}` }] },
              }))}
              className="xl:flex-1"
            />
            <ReportCard title="Lifetime value by first channel" description="Where customers first came from" className="xl:w-100 xl:shrink-0">
              <ReportBars bars={data.channels} size="thin" />
              <p className="text-xs leading-4.25 text-text-muted">Customers referred on WhatsApp are worth twice as much as TikTok shoppers.</p>
            </ReportCard>
          </div>
        </>
      );
    }
  }
}
