import type { Metadata } from "next";
import Link from "next/link";

import { Button, Heading, Icon, IconButton, StatusBadge, TextLink } from "@repo/ui/atoms";
import { BackLink, DeliveryBanner, ProgressSteps, SettingCard, SummaryCard } from "@repo/ui/molecules";
import { AnnouncementBar, OrderBreakdown, TrackOrderLookup } from "@repo/ui/organisms";
import { StorefrontShell } from "@repo/ui/templates";

import { packshot } from "../../account/_components/account-page";
import { StorefrontFooter, StorefrontHeader } from "../../_components/storefront-chrome";
import { activeOrder, orderDetail, whatsappHref } from "../../_content/account";
import { announcements } from "../../_content/site";

export const metadata: Metadata = {
  title: "Track an order",
  description: "Track your Jofak order with your order number and phone. No account needed.",
  robots: { index: false },
};

/** The sample order the static lookup knows (until GET /api/orders/track exists, docs/03 ACC-FR-20). */
const SAMPLE = { order: "JFK-250184", phone: "244127781", token: "sample" };
const ORDER_FORMAT = /^JFK-\d{6}$/;

const normalisePhone = (phone: string) => phone.replace(/\D/g, "").replace(/^233/, "").replace(/^0/, "");

/**
 * /orders/track (Paper: Track order — Lookup, Result, Not found). Public, no sign-in: a GET
 * form with ?order=&phone=, or a signed ?token= link from the SMS. Static: only the sample order
 * JFK-250184 with +233 24 412 7781 (or ?token=sample) is found.
 */
export default async function TrackOrderPage({ searchParams }: { searchParams: Promise<{ order?: string; phone?: string; token?: string }> }) {
  const params = await searchParams;
  const order = (params.order ?? "").trim().toUpperCase();
  const phone = (params.phone ?? "").trim();
  const searched = Boolean(order || phone || params.token);
  const found = params.token === SAMPLE.token || (order === SAMPLE.order && normalisePhone(phone) === SAMPLE.phone);

  return (
    <StorefrontShell framed={false} announcement={<AnnouncementBar items={announcements} />} footer={<StorefrontFooter />}>
      <StorefrontHeader className="px-5 pt-1 md:px-8 md:pt-5 md:pb-4 xl:px-10 xl:py-5" />
      {found ? (
        <TrackingResult />
      ) : (
        <TrackOrderLookup
          action="/orders/track"
          defaultOrder={order || undefined}
          defaultPhone={phone || undefined}
          error={
            searched
              ? { title: "We couldn't find that order", description: "Check that the order number and phone match your confirmation SMS." }
              : undefined
          }
          orderError={searched && order && !ORDER_FORMAT.test(order) ? "Order numbers start with JFK- followed by 6 digits." : undefined}
          footer={
            <>
              Have an account?{" "}
              <TextLink asChild>
                <Link href="/auth/sign-in">Sign in</Link>
              </TextLink>{" "}
              to see all your orders.
            </>
          }
          hint="Got a tracking link by SMS? Tap it to skip this step."
        />
      )}
    </StorefrontShell>
  );
}

function TrackingResult() {
  const items = activeOrder.lines.map((line) => ({ ...line, image: packshot(line.image) }));
  return (
    <section aria-labelledby="track-result-title" className="flex flex-col gap-5 px-5 pt-4 pb-12 md:gap-7 md:px-8 md:pt-10 md:pb-18 xl:px-14 xl:pb-20">
      <div className="flex flex-col gap-2.5 md:gap-3">
        <BackLink asChild>
          <Link href="/orders/track">Track another order</Link>
        </BackLink>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <Heading id="track-result-title" as="h1" size="detail" className="xl:text-5xl xl:leading-5xl">
            Order {orderDetail.number}
          </Heading>
          <StatusBadge tone="accent" label="Out for delivery" className="px-3.5 py-1.5" />
        </div>
        <p className="font-sans text-sm leading-sm text-text-secondary md:text-base">Placed Fri 13 Nov · 4 items · Delivering to East Legon, Accra</p>
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <DeliveryBanner
            eyebrow="With our delivery partner"
            title="Arriving today, 11:00–13:00"
            action={
              <Button asChild size="xs" variant="secondary" className="gap-2 border-0 px-5 py-3 text-primary dark:text-text">
                {/* TODO: the courier's own tracking page for this parcel. */}
                <a href="#courier-tracking">
                  <Icon name="arrowUpRight" size={14} /> Track parcel
                </a>
              </Button>
            }
            compactAction={
              <IconButton asChild label="Track the parcel with our delivery partner" variant="plain" size="md" className="size-10 text-primary dark:text-text">
                <a href="#courier-tracking">
                  <Icon name="arrowUpRight" size={16} />
                </a>
              </IconButton>
            }
          />
          <SummaryCard eyebrow="Tracking" className="gap-5 md:p-6">
            <ProgressSteps
              steps={[
                {
                  title: "Order placed & paid",
                  time: (
                    <>
                      <span className="md:hidden">Fri 10:42</span>
                      <span className="hidden md:inline">Fri 13 Nov, 10:42</span>
                    </>
                  ),
                  state: "done",
                },
                {
                  title: "Packed at our Accra hub",
                  time: (
                    <>
                      <span className="md:hidden">Fri 16:10</span>
                      <span className="hidden md:inline">Fri 13 Nov, 16:10</span>
                    </>
                  ),
                  state: "done",
                },
                {
                  title: "Out for delivery",
                  detail: "Handed to our delivery partner — we'll text you when it's close",
                  time: (
                    <>
                      <span className="md:hidden">09:20</span>
                      <span className="hidden md:inline">Today, 09:20</span>
                    </>
                  ),
                  state: "current",
                },
                {
                  title: "Delivered",
                  time: (
                    <>
                      <span className="md:hidden">By 13:00</span>
                      <span className="hidden md:inline">Expected by 13:00</span>
                    </>
                  ),
                  state: "upcoming",
                },
              ]}
            />
          </SummaryCard>
          {/* Public page: only the area and a masked name and phone (the full address stays in the account). */}
          <SettingCard
            icon="mapPin"
            title="East Legon, Accra"
            description="For A. M••••• · +233 24 ••• 7781. The full address is hidden on this page for your privacy."
          />
        </div>

        <div className="flex flex-col gap-4 xl:w-95 xl:shrink-0">
          <OrderBreakdown
            title="In this order"
            titleAside="4 items"
            items={items}
            totalSize="sm"
            total={{ label: "Paid with MTN MoMo", value: orderDetail.total }}
            className="md:rounded-xl"
          />
          <SummaryCard tone="feature" eyebrow="Save this order" className="gap-3 p-6 md:rounded-xl">
            <p className="text-xl leading-2xl font-medium">Track every order in one place</p>
            <p className="text-sm leading-sm text-text-inverse-muted">
              Create a free account with +233 24 ••• 7781. This order and past guest orders are added automatically.
            </p>
            <Button asChild size="md" variant="accent" className="mt-1 w-full">
              <Link href="/auth/sign-up">Create account with a code</Link>
            </Button>
          </SummaryCard>
          <Button asChild size="md" variant="secondary" className="w-full gap-2 text-sm">
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <Icon name="chat" size={15} /> Problem with this order? WhatsApp us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
