import type { Metadata } from "next";
import Link from "next/link";

import { SelectPill } from "@repo/ui/molecules";
import { AdminPageHeader, AutomationsPanel, MarketingSummary, RecentMessages, SourceBreakdown, TrackingHealth } from "@repo/ui/organisms";

import {
  automations,
  comingSoon,
  marketingSummary,
  orderSources,
  ordersCounted,
  periodOf,
  PERIODS,
  quietRules,
  recentMessages,
  trackers,
  trackingEvents,
} from "../../../_content/admin-marketing";

export const metadata: Metadata = { title: "Marketing" };

type SearchParams = Promise<{ period?: string; messages?: string; debug?: string }>;

/** /admin/marketing (Paper "Jofak - Admin" → Marketing). Flow settings in server memory; figures are samples scaled to the period. */
export default async function AdminMarketingPage({ searchParams }: { searchParams: SearchParams }) {
  const { period: periodParam, messages, debug } = await searchParams;
  const period = periodOf(periodParam);
  const periodLabel = PERIODS.find((item) => item.value === period)!.label;
  const all = messages === "all";
  const debugging = debug === "events";
  const query = (changes: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const next = { period: period === "30" ? undefined : period, messages: all ? "all" : undefined, debug: debugging ? "events" : undefined, ...changes };
    for (const [key, value] of Object.entries(next)) if (value) params.set(key, value);
    const text = params.toString();
    return `/admin/marketing${text ? `?${text}` : ""}`;
  };

  return (
    <>
      <AdminPageHeader
        layout="inline"
        title="Marketing"
        description={
          <>
            <span className="xl:hidden">{periodLabel}</span>
            <span className="hidden xl:inline">Win back carts, see where shoppers come from, keep tracking healthy · {periodLabel.toLowerCase()}</span>
          </>
        }
        actions={
          <div className="hidden items-center gap-2.5 md:flex">
            <Link
              href="/admin/marketing/abandoned-cart#message"
              className="flex h-10.5 items-center rounded-full border border-border px-4 text-14 leading-4.5 font-semibold text-text hover:bg-surface-subtle xl:h-11 xl:px-4.5"
            >
              Message templates
            </Link>
            <form action="/admin/marketing" className="hidden xl:block">
              {all && <input type="hidden" name="messages" value="all" />}
              {debugging && <input type="hidden" name="debug" value="events" />}
              <SelectPill label="Period" name="period" icon="calendar" size="lg" defaultValue={period} options={PERIODS} autoSubmit />
            </form>
          </div>
        }
      />

      <MarketingSummary {...marketingSummary(period)} />

      <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-start xl:gap-6">
        <div className="contents xl:flex xl:min-w-0 xl:flex-1 xl:flex-col xl:gap-4">
          <AutomationsPanel
            linkAs={Link}
            automations={automations(period)}
            rules={quietRules}
            comingSoon={comingSoon}
            comingSoonNote="Back in stock, win-back and review requests are coming soon"
            className="order-1 xl:order-none"
          />
          <RecentMessages
            linkAs={Link}
            messages={recentMessages(all)}
            viewAll={{ href: query({ messages: all ? undefined : "all" }), label: all ? "Show fewer" : "View all" }}
            className="order-4 xl:order-none"
          />
        </div>
        <div className="contents xl:flex xl:w-90 xl:shrink-0 xl:flex-col xl:gap-4">
          <SourceBreakdown
            linkAs={Link}
            note={`Last touch · ${ordersCounted(period)} orders`}
            sources={orderSources}
            report={{ href: "/admin/reports" }}
            className="order-2 hidden md:flex xl:order-none"
          />
          <TrackingHealth
            linkAs={Link}
            trackers={trackers}
            debug={{ href: query({ debug: debugging ? undefined : "events" }) + "#tracking", label: debugging ? "Hide events" : "Debug events" }}
            events={debugging ? trackingEvents : undefined}
            alert={{ title: "Google tag missed 3 purchases", note: "Meta Pixel is healthy · 62% accept cookies", href: query({ debug: "events" }) + "#tracking" }}
            className="order-3 xl:order-none"
          />
        </div>
      </div>
    </>
  );
}
