import type { Metadata } from "next";
import Link from "next/link";

import { Button, Heading, TextLink } from "@repo/ui/atoms";
import { AddTile, BackLink, FilterPill, FilterPills, NumberedSteps, SummaryCard } from "@repo/ui/molecules";
import { SubscriptionCard } from "@repo/ui/organisms";

import { subscriptions } from "../../_content/account";
import { AccountPage, packshot } from "../_components/account-page";

export const metadata: Metadata = { title: "Your subscriptions", robots: { index: false } };

const filters = [
  { value: "active", label: "Active · 1" },
  { value: "paused", label: "Paused · 1" },
  { value: "cancelled", label: "Cancelled" },
];

/**
 * /account/subscriptions (Paper: Account — Subscriptions). Static sample subscriptions; the
 * filters are links and the buttons don't change anything yet.
 */
export default async function SubscriptionsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status: statusParam } = await searchParams;
  const status = filters.some((filter) => filter.value === statusParam) ? statusParam! : "active";
  const { active, paused, saved, howItWorks } = subscriptions;

  return (
    <AccountPage section="subscriptions">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between xl:gap-6">
        <div className="flex flex-col gap-1.5">
          <BackLink asChild className="md:hidden">
            <Link href="/account">My account</Link>
          </BackLink>
          <Heading as="h1" size="account">
            Your <em>subscriptions</em>
          </Heading>
          <p className="hidden font-sans text-base leading-sm text-text-secondary md:block">20% off every delivery. Skip, pause or cancel anytime.</p>
        </div>
        <FilterPills aria-label="Filter subscriptions">
          {filters.map((filter) => (
            <FilterPill key={filter.value} asChild active={filter.value === status}>
              <Link href={filter.value === "active" ? "/account/subscriptions" : `/account/subscriptions?status=${filter.value}`} scroll={false}>
                {filter.label}
              </Link>
            </FilterPill>
          ))}
        </FilterPills>
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {status === "cancelled" && <p className="font-sans text-base leading-sm text-text-secondary">No cancelled subscriptions.</p>}
          {status !== "cancelled" && status !== "paused" && (
            <SubscriptionCard
              name={active.name}
              status={{ label: "Active", tone: "success" }}
              meta={
                <>
                  <span className="md:hidden">120 tablets · Qty 1 · Every 30 days</span>
                  <span className="hidden md:inline">{active.meta}</span>
                </>
              }
              thumb={{ tint: "amber", image: packshot(active.image) }}
              price={active.price}
              compareAt={active.compareAt}
              saving="You save 20%"
              compactSaving="−20%"
              next={{ label: "Next delivery", date: active.next.date, when: active.next.when }}
              compactNext={{ title: `Next delivery ${active.next.date}`, detail: active.next.detail }}
              settings={active.settings.map((setting) => ({
                label: setting.label,
                value: setting.value,
                action: (
                  <TextLink asChild>
                    <Link href={setting.href}>Change</Link>
                  </TextLink>
                ),
              }))}
              upcoming={active.upcoming}
              primaryAction={
                <Button size="xs" className="h-12 md:h-auto">
                  Skip next delivery
                </Button>
              }
              secondaryActions={
                <>
                  <Button size="xs" variant="secondary" className="h-11 md:h-auto">
                    Deliver now
                  </Button>
                  <Button size="xs" variant="secondary" className="h-11 md:h-auto">
                    Pause
                  </Button>
                </>
              }
              cancel={
                <TextLink asChild tone="danger">
                  <Link href="/account/subscriptions?cancel=ashwagandha">Cancel subscription</Link>
                </TextLink>
              }
            />
          )}
          {status !== "cancelled" && (
            <SubscriptionCard
              variant="compact"
              name={paused.name}
              status={{ label: "Paused", tone: "warning" }}
              meta={paused.meta}
              compactMeta={paused.compactMeta}
              thumb={{ tint: "sage", image: packshot(paused.image) }}
              action={
                <Button size="xs" variant="secondary" className="h-11 md:h-auto">
                  Resume now
                </Button>
              }
            />
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:flex xl:w-80 xl:shrink-0 xl:flex-col">
          <SummaryCard tone="feature" eyebrow="Saved with Subscribe & save" className="gap-1.5 p-5 md:p-6">
            <p className="font-sans text-36 leading-10 font-medium tracking-tight md:text-4xl md:leading-4xl">{saved.amount}</p>
            <p className="text-sm leading-sm text-text-inverse-muted">
              <span className="md:hidden">{saved.compactDetail}</span>
              <span className="hidden md:inline">{saved.detail}</span>
            </p>
          </SummaryCard>
          <NumberedSteps variant="outline" title="How it works" items={howItWorks} className="hidden md:flex" />
          <AddTile asChild size="sm" className="md:col-span-2 xl:col-span-1">
            <Link href="/shop">Subscribe to another product</Link>
          </AddTile>
        </div>
      </div>

      <p className="text-center font-sans text-sm leading-sm text-text-muted md:hidden">
        We send a MoMo prompt 2 days before each delivery. Skip or change anything up to 48 hours before.
      </p>
    </AccountPage>
  );
}
