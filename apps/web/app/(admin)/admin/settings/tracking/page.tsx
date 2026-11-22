import type { Metadata } from "next";
import Link from "next/link";

import { Switch } from "@repo/ui/atoms";
import { SettingsCard } from "@repo/ui/molecules";
import { ReportTable } from "@repo/ui/organisms";

import { saveTrackingAction } from "../../../../_actions/admin-settings";
import { settings } from "../../../../_content/admin-settings";
import { SettingsForm } from "../../_components/settings";
import { SettingsSections } from "../_nav";

export const metadata: Metadata = { title: "Tracking pixels" };

type SearchParams = Promise<{ saved?: string }>;

const EVENTS = [
  { id: "view", title: "Views a product", meta: "ViewContent", google: "view_item", last: "1 min ago" },
  { id: "cart", title: "Adds to cart", meta: "AddToCart", google: "add_to_cart", last: "4 min ago" },
  { id: "checkout", title: "Starts checkout", meta: "InitiateCheckout", google: "begin_checkout", last: "9 min ago" },
  { id: "shipping", title: "Adds delivery details", meta: null, google: "add_shipping_info", last: "11 min ago" },
  { id: "paying", title: "Starts paying", meta: "AddPaymentInfo", google: "add_payment_info", last: "12 min ago" },
  { id: "order", title: "Places an order", meta: "Purchase", google: "purchase", last: "JFK-251530 · 18 min", sub: "Sent once per order, even if the page reloads", compactSub: "Once per order" },
];

/** /admin/settings/tracking (Paper "Jofak - Admin" → Settings → Tracking pixels). */
export default async function AdminTrackingSettingsPage({ searchParams }: { searchParams: SearchParams }) {
  const { saved } = await searchParams;
  const { tracking, savedAt } = settings();
  const pixels = [
    { key: "meta" as const, letter: "M", tile: "bg-tint-info text-info", name: "Meta Pixel", what: "Facebook & Instagram ads", tabletName: "Meta Pixel", id: "Pixel ID 4821 0937 5521 006", tabletId: "4821 0937 5521 006", events: "1,284" },
    { key: "google" as const, letter: "G", tile: "bg-tint-citrus text-error", name: "Google tag", what: "Analytics (GA4) + Google Ads", tabletName: "Google tag · GA4 + Ads", id: "G-JFK4X2Q7LM · AW-1098 2274 51", tabletId: "G-JFK4X2Q7LM · AW-1098 2274 51", events: "2,906" },
  ];
  const pill = "rounded-full border border-dashed border-border px-2 py-0.5 text-11 leading-4 font-semibold text-text-muted";

  return (
    <SettingsForm key={saved} pageTitle="Tracking pixels" savedAt={savedAt} backHref="/admin/settings" action={saveTrackingAction} nav={<SettingsSections active="/admin/settings/tracking" />}>
      <section aria-label="Cookie consent" className="flex flex-col gap-3 rounded-18 bg-surface-subtle p-4 md:gap-3.5 md:rounded-lg md:px-5 md:py-5 xl:flex-row xl:items-center xl:gap-6 xl:px-6">
        <div className="flex min-w-0 flex-1 flex-col gap-2 md:gap-3 xl:gap-1.5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base leading-5 font-semibold tracking-compact text-text md:text-17 md:leading-6">Cookie consent</h2>
            <span className="ml-auto rounded-full bg-sage-100 px-2 py-0.5 text-xs leading-xs font-semibold text-primary md:ml-0 dark:text-brand">On</span>
            <Link href="/admin/content" className="ml-auto hidden h-10 items-center rounded-full border border-border bg-bg px-3.5 text-sm leading-4.5 font-semibold text-text hover:bg-surface md:flex xl:hidden dark:bg-surface">
              Edit banner
            </Link>
          </div>
          <p className="text-sm leading-5 text-text-secondary">
            <span className="md:hidden">Pixels only load for shoppers who allow them.</span>
            <span className="hidden md:inline xl:hidden">Pixels only load for shoppers who allow analytics or marketing cookies. Default is “necessary only”.</span>
            <span className="hidden xl:inline">Shoppers choose first. Pixels below only load for people who allow analytics or marketing cookies. Default is “necessary only”.</span>
          </p>
        </div>
        <div className="flex items-baseline gap-6 xl:items-center xl:gap-5">
          {[
            { value: "62%", label: "analytics" },
            { value: "48%", label: "marketing" },
          ].map((stat) => (
            <p key={stat.label} className="flex items-baseline gap-1.5 xl:flex-col xl:items-center xl:gap-0">
              <span className="text-lg leading-6 font-semibold tracking-compact text-text xl:text-xl xl:leading-6.5">{stat.value}</span>
              <span className="text-xs leading-xs text-text-muted">
                <span className="hidden xl:inline">allow </span>
                {stat.label}
              </span>
            </p>
          ))}
          <Link href="/admin/content" className="hidden h-10 items-center rounded-full border border-border bg-bg px-3.5 text-sm leading-4.5 font-semibold text-text hover:bg-surface xl:flex dark:bg-surface">
            Edit banner
          </Link>
        </div>
        <Link href="/admin/content" className="text-sm leading-4.5 font-semibold text-brand md:hidden">
          Edit banner ›
        </Link>
      </section>

      <section aria-label="Pixels" className="flex flex-col rounded-18 border border-border-subtle px-4 font-sans md:rounded-lg md:px-6">
        {pixels.map((pixel) => (
          <label key={pixel.key} className="flex cursor-pointer items-center gap-3 border-b border-border-subtle py-3.5 md:gap-3.5 md:py-5">
            <span className={`flex size-9 shrink-0 items-center justify-center rounded-10 text-base leading-5 font-bold md:size-10 md:rounded-sm ${pixel.tile}`}>{pixel.letter}</span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="flex flex-wrap items-baseline gap-2 text-base leading-5 font-semibold text-text">
                <span className="xl:hidden">
                  <span className="md:hidden">{pixel.name}</span>
                  <span className="hidden md:inline">{pixel.tabletName}</span>
                </span>
                <span className="hidden xl:inline">{pixel.name}</span>
                <span className="hidden text-xs leading-xs font-regular text-text-muted xl:inline">{pixel.what}</span>
              </span>
              <span className="hidden truncate font-mono text-xs leading-4.5 text-text-secondary md:block">
                <span className="xl:hidden">{pixel.tabletId}</span>
                <span className="hidden xl:inline">{pixel.id}</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs leading-xs font-semibold text-text xl:hidden">
                <span aria-hidden className="size-2 rounded-full bg-primary dark:bg-brand" />
                <span className="hidden md:inline">Receiving · </span>
                {pixel.events} events in 24 h
              </span>
            </span>
            <span className="hidden flex-col items-end xl:flex">
              <span className="text-sm leading-4.5 font-semibold text-text">{pixel.events} events</span>
              <span className="text-xs leading-xs text-text-muted">last 24 hours</span>
            </span>
            <span className="hidden w-20 items-center gap-1.5 text-xs leading-xs font-semibold text-brand xl:ml-4 xl:flex">
              <span aria-hidden className="size-1.5 rounded-full bg-success" />
              Receiving
            </span>
            <Switch name={pixel.key} defaultChecked={tracking[pixel.key]} aria-label={pixel.name} className="data-[state=checked]:bg-primary xl:ml-8" />
          </label>
        ))}
        <div className="flex items-center gap-3 py-3.5 md:gap-3.5 md:py-5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-10 bg-surface-subtle text-base leading-5 font-bold text-text-muted md:size-10 md:rounded-sm">T</span>
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="flex items-center gap-2.5 text-base leading-5 font-semibold text-text-muted">
              TikTok Pixel <span className={`hidden xl:inline ${pill}`}>Coming soon</span>
            </span>
            <span className="hidden text-xs leading-xs text-text-muted md:block">Measure TikTok ads the same way</span>
          </span>
          <span className={`xl:hidden ${pill}`}>
            <span className="md:hidden">Soon</span>
            <span className="hidden md:inline">Coming soon</span>
          </span>
        </div>
      </section>

      <ReportTable
        title="What gets sent"
        description={
          <>
            <span className="xl:hidden">Set up for you · prices in GHS · products by SKU</span>
            <span className="hidden xl:inline">Set up for you · prices in GHS · products identified by SKU</span>
          </>
        }
        footer={<span className="md:hidden">Same events go to Google with GA4 names.</span>}
        columns={[
          { key: "lead", label: "When a shopper…" },
          { key: "meta", label: "Meta", width: "w-45" },
          { key: "google", label: "Google", width: "w-45" },
          { key: "last", label: "Last sent", align: "right", width: "w-40", wide: true },
        ]}
        rows={EVENTS.map((event) => ({
          id: event.id,
          wide: !event.meta,
          lead: { title: event.title, sub: event.sub && <span className="hidden xl:inline">{event.sub}</span> },
          tone: event.id === "order" ? ("selected" as const) : undefined,
          cells: {
            meta: { text: event.meta ?? "—", mono: true, tone: event.id === "order" ? "strong" : event.meta ? undefined : "muted" },
            google: { text: event.google, mono: true, tone: event.id === "order" ? "strong" : undefined },
            last: { text: event.last, tone: event.id === "order" ? "strong" : "muted" },
          },
          mobile: { meta: event.compactSub ? [{ text: event.compactSub }] : undefined, value: <span className={event.id === "order" ? "font-mono font-semibold" : "font-mono font-regular"}>{event.meta ?? "—"}</span> },
        }))}
      />

      <SettingsCard
        tone="dashed"
        title={
          <span className="flex items-center gap-2.5">
            Send orders from the server too <span className={`hidden md:inline ${pill} font-semibold tracking-normal`}>Coming soon</span>
          </span>
        }
        description={
          <>
            <span className="xl:hidden">Counts sales that ad blockers hide.</span>
            <span className="hidden xl:inline">Counts sales that ad blockers hide. Uses Meta Conversions API and Google Measurement Protocol.</span>
          </>
        }
        className="hidden md:flex"
      />
    </SettingsForm>
  );
}
