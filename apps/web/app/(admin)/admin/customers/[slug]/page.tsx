import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CustomerBuysMost, CustomerNotesCard, CustomerOrdersCard, CustomerProfileHeader, CustomerStats } from "@repo/ui/organisms";

import { addCustomerNote, logCustomerContactReveal, removeCustomerTag, updateCustomerConsent } from "../../../../_actions/admin-customers";
import { findCustomerDetail } from "../../../../_content/admin-customers";
import { placeholderSrc } from "../../../../_lib/placeholder";
import { MoreMenu } from "../../_components/order-detail";
import { ContactCard, Preferences } from "../../_components/customers";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  return { title: findCustomerDetail(slug)?.name ?? "Customer" };
}

/** "Tagged {VIP} automatically" → the braced part in bold. */
function emphasise(text: string) {
  const [before, strong, after] = text.split(/[{}]/);
  if (strong === undefined) return text;
  return (
    <>
      {before}
      <strong className="font-semibold text-text">{strong}</strong>
      {after}
    </>
  );
}

/** /admin/customers/[slug] (Paper "Jofak - Admin" → Customer detail). Sample data; actions change nothing yet. */
export default async function AdminCustomerPage({ params }: { params: Params }) {
  const { slug } = await params;
  const customer = findCustomerDetail(slug);
  if (!customer) notFound();

  const fields = { customer: customer.slug };
  const ordersHref = `/admin/orders?q=${encodeURIComponent(customer.name)}`;

  return (
    <>
      <CustomerProfileHeader
        linkAs={Link}
        backHref="/admin/customers"
        name={customer.name}
        tone={customer.tone}
        tag={customer.tag}
        meta={customer.meta}
        compactMeta={customer.compactMeta}
        mobileMeta={customer.mobileMeta}
        addNoteHref="#notes"
        more={<MoreMenu items={customer.more} label="Customer actions" triggerClassName="size-9 md:size-10.5 xl:size-11" />}
      />

      <CustomerStats variant="profile" aria-label="Customer figures" stats={customer.stats} />

      {/*
       * One grid, reordered per breakpoint: mobile stacks contact, orders, the latest note and
       * preferences; tablet pairs contact with address and marketing with tags around full-width
       * orders and notes; from 1440px the main and side columns become real columns.
       */}
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-x-4 md:gap-y-5 xl:flex xl:items-start xl:gap-6">
        <div className="contents xl:flex xl:min-w-0 xl:flex-1 xl:flex-col xl:gap-6">
          <CustomerOrdersCard
            linkAs={Link}
            orders={customer.orders}
            viewAll={{ label: `View all ${customer.orderCount}`, compactLabel: `All ${customer.orderCount}`, href: ordersHref }}
            className="order-2 md:col-span-2 xl:order-none"
          />
          <CustomerBuysMost
            meta={`Across ${customer.orderCount} ${customer.orderCount === 1 ? "order" : "orders"}`}
            products={customer.buysMost.map(({ image, ...product }) => {
              const src = image && placeholderSrc(`${image}.png`);
              return { ...product, image: src ? <Image src={src} alt="" fill sizes="44px" className="object-cover" /> : undefined };
            })}
            className="hidden xl:flex"
          />
          <CustomerNotesCard
            id="notes"
            events={customer.events.map(({ body, compactBody, ...event }) => ({
              ...event,
              body: emphasise(body),
              compactBody: compactBody && emphasise(compactBody),
            }))}
            action={addCustomerNote}
            fields={fields}
            className="order-3 md:col-span-2 xl:order-none"
          />
        </div>

        <div className="contents xl:flex xl:w-90 xl:shrink-0 xl:flex-col xl:gap-4">
          <ContactCard
            phone={customer.phone}
            email={customer.email}
            address={customer.address}
            onReveal={logCustomerContactReveal.bind(null, customer.slug)}
            addNoteHref="#notes"
            className="order-1"
            contactClassName="md:order-1 xl:order-none"
            addressClassName="md:order-1 xl:order-none"
          />
          <Preferences
            consent={customer.consent}
            consentNote={customer.consentNote}
            onConsentChange={updateCustomerConsent.bind(null, customer.slug)}
            tags={customer.tags}
            removeTag={removeCustomerTag}
            fields={fields}
            addTagHref={`/admin/customers/${customer.slug}/tags`}
            account={customer.account}
            mobileNote="Export, disable or delete data from the ⋯ menu. Revealing contact details is logged."
            className="order-4"
            marketingClassName="md:order-4 xl:order-none"
            tagsClassName="md:order-4 xl:order-none"
            accountClassName="xl:order-none"
          />
        </div>
      </div>
    </>
  );
}
