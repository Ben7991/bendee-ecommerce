import type { Metadata } from "next";
import Link from "next/link";

import { Button, Heading, Icon, IconButton, TextLink } from "@repo/ui/atoms";
import { SettingCard } from "@repo/ui/molecules";

import { AccountAppBar, AccountPage } from "../_components/account-page";

export const metadata: Metadata = { title: "Privacy & data", robots: { index: false } };

/**
 * /account/privacy (Paper: Account — Privacy & data; docs/03 §3.10). The actions don't do
 * anything yet; deleting will need its own confirmation step.
 */
export default function PrivacyDataPage() {
  return (
    <AccountPage section="privacy" appBar={<AccountAppBar title="Privacy & data" backHref="/account" backLabel="Back to your account" />}>
      <div className="flex flex-col gap-1.5">
        <Heading as="h1" size="account" className="hidden md:block">
          Privacy &amp; <em>data</em>
        </Heading>
        <p className="font-sans text-sm leading-sm text-text-secondary md:text-base">
          <span className="md:hidden">Your information is yours. Take it with you or remove it.</span>
          <span className="hidden md:inline">Your information is yours. Here&apos;s how to take it with you or remove it.</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 md:gap-6">
        <SettingCard
          icon="lock"
          title="Signed-in devices"
          description="This laptop (Chrome, Accra) · iPhone (Safari) · last active today"
          compactDescription="This iPhone · laptop (Chrome)"
          action={
            <Button size="xs" variant="secondary" className="h-11 md:h-auto">
              Sign out of all devices
            </Button>
          }
        />
        <SettingCard
          icon="download"
          title="Download your data"
          description="Profile, addresses, orders, reviews and consent history. Ready within 24 hours — we'll email you a link."
          compactDescription="Ready within 24 hours · we'll email a link"
          action={
            <Button size="xs" className="h-11 md:h-auto">
              Request export
            </Button>
          }
        />
        <SettingCard
          icon="fileText"
          title="Privacy policy"
          description="You accepted version 1.2 on 13 Nov 2026"
          compactDescription="Accepted v1.2 · 13 Nov 2026"
          action={
            <TextLink asChild className="text-sm leading-xs">
              <Link href="/pages/privacy">Read policy</Link>
            </TextLink>
          }
          compactAction={
            <IconButton asChild label="Read the privacy policy" variant="plain" size="md">
              <Link href="/pages/privacy">
                <Icon name="chevronRight" size={16} className="text-text-muted" />
              </Link>
            </IconButton>
          }
        />
        <SettingCard
          tone="danger"
          icon="trash"
          title="Delete my account"
          description={
            <>
              <span className="md:hidden">
                You&apos;ll be signed out right away. You have 30 days to change your mind, then your personal details are permanently removed.
                Order records are kept without your name for tax.
              </span>
              <span className="hidden md:inline">
                You&apos;ll be signed out right away. You have 30 days to change your mind — after that your personal details are permanently
                removed.
              </span>
            </>
          }
          note="Order records are kept without your name or contact details, as required for tax and accounting."
          action={
            <Button size="xs" variant="dangerOutline" className="h-11 md:h-auto">
              Delete account
            </Button>
          }
        />
      </div>
    </AccountPage>
  );
}
