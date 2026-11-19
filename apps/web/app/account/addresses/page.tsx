import type { Metadata } from "next";
import Link from "next/link";

import { Button, Heading, Icon, IconButton, TextLink } from "@repo/ui/atoms";
import { AddressCard, AddTile } from "@repo/ui/molecules";

import { addresses } from "../../_content/account";
import { AccountAppBar, AccountPage } from "../_components/account-page";

export const metadata: Metadata = { title: "Your addresses", robots: { index: false } };

const newAddressHref = "/account/addresses?new=1";

/** /account/addresses (Paper: Account — Addresses). Static sample addresses; edits don't save yet. */
export default function AddressesPage() {
  return (
    <AccountPage
      section="addresses"
      appBar={
        <AccountAppBar
          title="Addresses"
          backHref="/account"
          backLabel="Back to your account"
          action={
            <IconButton asChild label="Add address" variant="solid" size="md" className="size-10">
              <Link href={newAddressHref}>
                <Icon name="plus" size={16} strokeWidth={2.4} />
              </Link>
            </IconButton>
          }
        />
      }
    >
      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-col gap-1.5">
          <Heading as="h1" size="account" className="hidden md:block">
            Your <em>addresses</em>
          </Heading>
          <p className="font-sans text-sm leading-xs text-text-muted md:text-base md:leading-sm">
            3 of 10 saved<span className="hidden md:inline"> · used to fill checkout in one tap</span>
          </p>
        </div>
        <Button asChild size="xs" className="hidden gap-2 md:inline-flex">
          <Link href={newAddressHref}>
            <Icon name="plus" size={14} strokeWidth={2.4} /> Add address
          </Link>
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            label={address.label}
            icon={address.icon}
            isDefault={address.isDefault}
            setDefault={<TextLink href={`/account/addresses?default=${address.id}`}>Set as default</TextLink>}
            lines={[...address.lines]}
            note={address.note}
            actions={
              <>
                <TextLink href={`/account/addresses?edit=${address.id}`}>Edit</TextLink>
                <TextLink href={`/account/addresses?remove=${address.id}`} tone="subtle">
                  Remove
                </TextLink>
              </>
            }
          />
        ))}
        <AddTile asChild description="Home, work or a loved one's place" className="hidden md:flex">
          <Link href={newAddressHref}>Add a new address</Link>
        </AddTile>
      </div>

      <p className="flex items-center gap-2 font-sans text-xs leading-xs text-text-muted md:text-sm">
        <Icon name="info" size={14} className="hidden shrink-0 md:block" />
        Editing an address won&apos;t change orders you&apos;ve already placed.
      </p>
    </AccountPage>
  );
}
