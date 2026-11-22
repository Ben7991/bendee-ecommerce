import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button, Icon } from "@repo/ui/atoms";
import { ListSearch, SelectPill } from "@repo/ui/molecules";
import { AdminPageHeader, ReturnPipeline, ReturnTable, SavedViews } from "@repo/ui/organisms";

import { updateReturn } from "../../../_actions/admin-returns";
import { findReturns, returnReasons, returnStages, returnViews, returnsSummary, type ReturnView } from "../../../_content/admin-returns";
import { placeholderSrc } from "../../../_lib/placeholder";

export const metadata: Metadata = { title: "Returns" };

type SearchParams = Promise<{ view?: string; stage?: string; reason?: string; q?: string }>;

const STAGES = ["requested", "awaiting", "received", "inspected"];

/** /admin/returns (Paper "Jofak - Admin" → Returns). Sample returns kept in server memory; steps move them along. */
export default async function AdminReturnsPage({ searchParams }: { searchParams: SearchParams }) {
  const { view: viewParam, stage: stageParam, reason, q } = await searchParams;
  const view: ReturnView = viewParam === "closed" || viewParam === "all" ? viewParam : "open";
  const stage = STAGES.includes(stageParam ?? "") ? stageParam : undefined;
  const summary = returnsSummary();
  const views = returnViews();
  const activeView = views.find((item) => item.view === view)!;
  const stages = returnStages();
  const activeStage = stage
    ? stages.find((item) => item.key === stage)?.href
    : view === "closed"
      ? "/admin/returns?view=closed"
      : undefined;
  const params = new URLSearchParams({
    ...(view !== "open" && { view }),
    ...(stage && { stage }),
    ...(reason && { reason }),
    ...(q && { q }),
  }).toString();
  const current = `/admin/returns${params ? `?${params}` : ""}`;
  const rows = findReturns({ view, stage, reason, q });
  const inProgress = summary.open - summary.requested;

  return (
    <>
      <AdminPageHeader
        layout="inline"
        title="Returns"
        description={
          <>
            {summary.requested} need a decision · {inProgress} in progress<span className="hidden xl:inline"> · 7-day return window</span>
          </>
        }
        actions={
          <Button asChild variant="secondary" size="sm" className="hidden h-11 gap-2 md:inline-flex">
            <Link href="/admin/settings#returns">
              <Icon name="settings" size={16} /> Return policy
            </Link>
          </Button>
        }
      />

      <ReturnPipeline linkAs={Link} stages={stages} activeHref={activeStage} />

      <div className="hidden items-center gap-2.5 md:flex xl:justify-between">
        <SavedViews linkAs={Link} variant="segmented" fill={false} aria-label="Return views" views={views} activeHref={activeView.href} />
        <ListSearch
          linkAs={Link}
          action="/admin/returns"
          label="Search returns"
          placeholder="Return, order or customer"
          defaultQuery={q}
          keep={{ ...(view !== "open" && { view }), ...(stage && { stage }) }}
          className="min-w-0 flex-1 xl:flex-none"
          fieldClassName="xl:w-70"
        >
          <SelectPill
            label="Reason"
            name="reason"
            defaultValue={reason ?? ""}
            options={returnReasons}
            autoSubmit
            className="hidden xl:flex"
          />
        </ListSearch>
      </div>

      <ReturnTable
        linkAs={Link}
        returns={rows.map(({ item, ...row }) => ({
          ...row,
          item: {
            ...item,
            image: placeholderSrc(`${item.image}.png`) ? (
              <Image src={placeholderSrc(`${item.image}.png`)!} alt="" fill sizes="48px" className="object-cover" />
            ) : undefined,
          },
        }))}
        action={updateReturn}
        fields={{ returnTo: current }}
        otherHeading={view === "closed" ? "Closed" : "In progress"}
        summary={
          view === "closed"
            ? `${summary.closed} closed in 30 days · ${rows.length} shown`
            : `${rows.length} ${view === "all" ? "returns" : "open returns"} · customers are notified by SMS at every step`
        }
        footerLink={
          view === "closed" ? { label: "View open", href: "/admin/returns" } : { label: "View closed", href: "/admin/returns?view=closed" }
        }
        emptyMessage={q ? `No returns match “${q}”.` : view === "closed" ? "No closed returns." : "No returns at this stage."}
      />
    </>
  );
}
