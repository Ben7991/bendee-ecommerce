import type { Metadata } from "next";
import Link from "next/link";

import { Badge, Button, Heading, Icon, Initials, StatusBadge, TextLink } from "@repo/ui/atoms";
import { AccountMenu, AccountMenuItem, ActionTile, DetailRows, MetricTile, SectionCard, SummaryCard } from "@repo/ui/molecules";
import { ActiveOrderCard } from "@repo/ui/organisms";

import { signOut } from "../_actions/account";
import { accountSections, activeOrder, addresses, customer, subscriptions, whatsappHref } from "../_content/account";
import { AccountPage, packshot } from "./_components/account-page";

export const metadata: Metadata = { title: "Your account", robots: { index: false } };

const verified = <StatusBadge size="sm" tone="success" marker="check" label="Verified" />;

/** /account (Paper: Account — Overview). Static sample data; nothing saves yet. */
export default function AccountOverviewPage() {
  const home = addresses[0];
  const orderHref = `/account/orders/${activeOrder.number}`;
  return (
    <AccountPage section="overview">
      <div className="flex items-center gap-4 md:items-end md:justify-between">
        <Initials name={customer.name} size="lg" className="md:hidden" />
        <div className="flex flex-col gap-0.5 md:gap-1.5">
          <Heading as="h1" size="account">
            Hello, <em>{customer.firstName}</em>
          </Heading>
          <p className="font-sans text-sm leading-xs text-text-muted md:text-base md:leading-sm md:text-text-secondary">{customer.memberSince}</p>
        </div>
        <Button asChild size="xs" variant="secondary" className="hidden gap-2 md:inline-flex">
          <Link href="/account/profile">
            <Icon name="pencil" size={14} /> Edit profile
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4">
        <MetricTile value="4" label="Orders placed" compactLabel="Orders" />
        <MetricTile value="1" label="Active subscription" compactLabel="Subscription" />
        <MetricTile value="3" label="Saved addresses" className="hidden md:flex" />
        <MetricTile tone="brand" value="GHS 312" label="Saved with discounts" compactLabel="Saved" />
      </div>

      <ActiveOrderCard
        number={activeOrder.number}
        meta={activeOrder.placed}
        compactMeta={activeOrder.compactMeta}
        status={activeOrder.status}
        items={activeOrder.lines.map((line) => ({ id: line.id, tint: line.tint, image: packshot(line.image) }))}
        total={activeOrder.total}
        arrival={
          <>
            Arriving <strong>{activeOrder.arrivingDay}</strong> to {activeOrder.area}
          </>
        }
        compactArrival={
          <>
            Arriving <strong>{activeOrder.arrivingDay}</strong>
          </>
        }
        stage={activeOrder.stage}
        actions={
          <>
            <Button asChild size="xs" variant="secondary">
              <Link href={orderHref}>View details</Link>
            </Button>
            <Button asChild size="xs">
              <Link href={orderHref}>Track order</Link>
            </Button>
          </>
        }
        compactAction={
          <Button asChild size="xs">
            <Link href={orderHref}>Track order</Link>
          </Button>
        }
      />

      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-6">
        <SectionCard
          title="Your details"
          action={
            <TextLink asChild>
              <Link href="/account/profile">Edit</Link>
            </TextLink>
          }
          className="xl:flex-1"
        >
          <DetailRows
            rows={[
              { label: "Full name", value: customer.name },
              { label: "Phone", value: customer.phone, badge: verified },
              { label: "Email", value: customer.email, badge: verified },
              {
                label: "Date of birth",
                value: (
                  <>
                    <span className="md:hidden">Not added</span>
                    <span className="hidden md:inline">Not added · get a birthday treat</span>
                  </>
                ),
                muted: true,
                action: (
                  <TextLink asChild>
                    <Link href="/account/profile">Add</Link>
                  </TextLink>
                ),
              },
              { label: "Contact me by", value: "SMS" },
              {
                label: "Sign-in methods",
                value: (
                  <span className="flex flex-wrap gap-2">
                    {["Phone", "Google", "Password"].map((method) => (
                      <Badge key={method} variant="bordered">
                        {method}
                      </Badge>
                    ))}
                  </span>
                ),
              },
            ]}
          />
        </SectionCard>

        <div className="grid gap-4 md:grid-cols-2 xl:flex xl:w-85 xl:shrink-0 xl:flex-col">
          <SummaryCard
            eyebrow="Default address"
            className="hidden md:flex"
            action={
              <TextLink asChild>
                <Link href="/account/addresses">Manage</Link>
              </TextLink>
            }
          >
            <p className="flex items-center gap-2 text-md leading-sm font-semibold">
              <Icon name="home" size={16} strokeWidth={1.8} /> {home.label}
            </p>
            <p className="text-sm leading-sm text-text-secondary">
              {home.lines[1]}
              <br />
              {home.lines[2]}
            </p>
            <p className="text-xs leading-xs text-text-muted">+ 2 more saved addresses</p>
          </SummaryCard>
          <SummaryCard
            tone="feature"
            eyebrow="Subscription"
            action={
              <TextLink asChild tone="inverse">
                <Link href="/account/subscriptions">Manage</Link>
              </TextLink>
            }
            footerClassName="hidden md:flex"
            footer={
              <>
                <Icon name="calendar" size={14} className="text-accent" />
                Next delivery <strong className="font-semibold">{subscriptions.active.next.date}</strong>
              </>
            }
          >
            <p className="text-md leading-sm font-semibold">{subscriptions.active.name}</p>
            <p className="text-sm leading-sm text-text-inverse-muted">
              <span className="md:hidden">Every 30 days · next delivery {subscriptions.active.next.date}</span>
              <span className="hidden md:inline">Every 30 days · {subscriptions.active.price} (20% off)</span>
            </p>
          </SummaryCard>
        </div>
      </div>

      <div className="hidden gap-3 md:grid md:grid-cols-3 xl:gap-4">
        <ActionTile asChild icon="reorder" description="From your last 3 orders">
          <Link href="/account/orders">Reorder favourites</Link>
        </ActionTile>
        <ActionTile asChild icon="heart" description="Refresh your routine in 60s">
          <Link href="/quiz">Wellness quiz</Link>
        </ActionTile>
        <ActionTile asChild icon="chat" description="Chat with us on WhatsApp">
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            Get help
          </a>
        </ActionTile>
      </div>

      {/* Mobile: the sections as a list (the tabs and sidebar are hidden there). */}
      <AccountMenu className="md:hidden">
        {accountSections
          .filter((item) => item.slug !== "overview")
          .map((item) => (
            <AccountMenuItem key={item.slug} asChild badge={item.badge} hint={item.hint}>
              <Link href={item.href}>{item.label}</Link>
            </AccountMenuItem>
          ))}
      </AccountMenu>
      <div className="flex items-center justify-between font-sans text-sm leading-xs text-text-muted md:hidden">
        <p>
          Need help?{" "}
          <TextLink href={whatsappHref} target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </TextLink>
        </p>
        <form action={signOut}>
          <TextLink asChild tone="danger" className="no-underline">
            <button type="submit">Sign out</button>
          </TextLink>
        </form>
      </div>
    </AccountPage>
  );
}
