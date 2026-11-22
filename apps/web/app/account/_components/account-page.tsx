import Link from "next/link";
import type { ReactNode } from "react";

import { Icon, IconButton } from "@repo/ui/atoms";
import { AccountIdentity, AccountNav, AccountNavItem, AppBar } from "@repo/ui/molecules";
import { AnnouncementBar } from "@repo/ui/organisms";
import { AccountLayout, StorefrontShell } from "@repo/ui/templates";

import { signOut } from "../../_actions/account";
import { Packshot, StorefrontHeader } from "../../_components/storefront-chrome";
import { accountSections, customer, type AccountSection } from "../../_content/account";
import { announcements } from "../../_content/site";

/**
 * An account page (Paper "Jofak" → Account): storefront header, the account tabs (tablet)
 * and sidebar (desktop), and the page. `appBar` swaps the site header for a compact bar on
 * mobile (deeper pages).
 */
export function AccountPage({
  section,
  appBar,
  contentClassName,
  children,
}: {
  section: AccountSection;
  appBar?: ReactNode;
  contentClassName?: string;
  children: ReactNode;
}) {
  const nav = (
    <AccountNav>
      {accountSections.map((item) => (
        <AccountNavItem key={item.slug} asChild active={item.slug === section} badge={item.badge}>
          <Link href={item.href}>{item.label}</Link>
        </AccountNavItem>
      ))}
    </AccountNav>
  );

  return (
    <StorefrontShell framed={false} announcement={<AnnouncementBar items={announcements} />}>
      <AccountLayout
        header={<StorefrontHeader className="px-5 pt-1 md:px-8 md:pt-5 md:pb-4 xl:px-10 xl:py-5" />}
        mobileHeader={appBar}
        tabs={nav}
        sidebar={
          <>
            <AccountIdentity name={customer.name} detail={customer.phone} />
            {nav}
          </>
        }
        sidebarFooter={
          <form action={signOut}>
            <button type="submit">Sign out</button>
          </form>
        }
        contentClassName={contentClassName}
      >
        {children}
      </AccountLayout>
    </StorefrontShell>
  );
}

/** The mobile bar of deeper pages: back (or close), title, an optional action. */
export function AccountAppBar({
  title,
  backHref,
  backLabel,
  close = false,
  action,
}: {
  title: ReactNode;
  backHref: string;
  backLabel: string;
  close?: boolean;
  action?: ReactNode;
}) {
  return (
    <AppBar
      className="pt-4"
      title={title}
      back={
        <IconButton asChild label={backLabel} size="md" className="size-10">
          <Link href={backHref}>
            <Icon name={close ? "close" : "chevronLeft"} size={16} />
          </Link>
        </IconButton>
      }
      action={action}
    />
  );
}

/** A packshot for a ProductThumb `image` (dev-only images, see _lib/placeholder.ts). */
export function packshot(file: string) {
  const id = file.replace(/\.png$/, "");
  return <Packshot key={id} id={id} alt="" sizes="88px" />;
}
