"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Badge, Button, Icon, IconButton, Logo, type IconName } from "../../atoms";

export interface MenuDrawerLink {
  label: string;
  href: string;
}

export interface MenuDrawerPrimaryLink extends MenuDrawerLink {
  /** Small lime pill after the label, e.g. "Sale". */
  badge?: string;
}

export interface MenuDrawerSecondaryLink extends MenuDrawerLink {
  icon: IconName;
  /** Muted note on the right, e.g. "6 saved". */
  meta?: string;
}

export interface MenuDrawerPromo {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Packshot, about 54×75px (next/image with `fill` works). */
  image?: ReactNode;
}

export interface MenuDrawerAccount {
  name: string;
  /** Shown in the round badge, e.g. "AM". */
  initials: string;
  /** e.g. "My account · 1 order on the way". */
  summary: string;
  href: string;
}

export interface MenuDrawerProps {
  primaryLinks: MenuDrawerPrimaryLink[];
  /** href of the current section: gets the brand dot and aria-current. */
  activeHref?: string;
  needsTitle?: string;
  needs?: MenuDrawerLink[];
  promo?: MenuDrawerPromo;
  secondaryLinks?: MenuDrawerSecondaryLink[];
  /** Signed-in customer. Without it the footer shows sign in / create account. */
  account?: MenuDrawerAccount;
  signInHref?: string;
  createAccountHref?: string;
  /** Help line in the footer; an http(s) href opens in a new tab. Shown on mobile only when signed in. */
  help?: { prompt: string; label: string; href: string };
  homeHref?: string;
  linkAs?: LinkComponent;
  /** Controlled open state; leave out to let the drawer manage it. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Classes for the trigger button in the header. */
  triggerClassName?: string;
  /** Classes for the drawer panel. */
  className?: string;
}

const helpLinkClass = "font-semibold text-primary underline decoration-1 dark:text-text";

/** The desktop header has its own nav, so an open drawer closes when the window reaches 1440px. */
const DESKTOP_QUERY = "(min-width: 1440px)";

/**
 * MenuDrawer (organism): the storefront menu below 1440px, on Radix Dialog.
 *   mobile 390:  full-screen sheet
 *   tablet 768:  420px panel from the left over a scrim
 * Renders its own trigger (the header's menu button), so drop it into SiteHeader's `menu` slot.
 * Following any link closes the drawer. Not for filters or the cart: those get their own sheets.
 * Design source: Paper "Jofak" → Menu (signed in / signed out, light and dark).
 */
export function MenuDrawer({
  primaryLinks,
  activeHref,
  needsTitle = "Shop by need",
  needs = [],
  promo,
  secondaryLinks = [],
  account,
  signInHref = "/account/sign-in",
  createAccountHref = "/account/register",
  help,
  homeHref = "/",
  linkAs: Link = "a",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  triggerClassName,
  className,
}: MenuDrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (openProp === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = () => {
      if (desktop.matches) {
        if (openProp === undefined) setUncontrolledOpen(false);
        onOpenChange?.(false);
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [open, openProp, onOpenChange]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <IconButton label="Open menu" className={cn("xl:hidden", triggerClassName)}>
          <Icon name="menu" />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          data-slot="menu-drawer-overlay"
          className={cn(
            "fixed inset-0 z-50 hidden bg-evergreen-950/55 md:block dark:bg-black/65",
            "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
          )}
        />
        <Dialog.Content
          data-slot="menu-drawer"
          aria-describedby={undefined}
          className={cn(
            "fixed inset-0 z-50 flex flex-col overflow-hidden bg-bg font-sans text-text outline-none",
            "md:right-auto md:w-105 md:rounded-r-2xl md:shadow-drawer md:dark:bg-surface",
            "data-[state=open]:animate-drawer-in data-[state=closed]:animate-drawer-out",
            className,
          )}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <div className="flex shrink-0 items-center justify-between px-5 pt-4 md:px-7 md:pt-7">
            <Dialog.Close asChild>
              <Logo asChild size="menu">
                <Link href={homeHref} aria-label="Jofak home" />
              </Logo>
            </Dialog.Close>
            <Dialog.Close asChild>
              <IconButton label="Close menu" className="md:size-10.5">
                <Icon name="close" />
              </IconButton>
            </Dialog.Close>
          </div>

          <div className="scrollbar-none flex min-h-0 flex-1 flex-col gap-5.5 overflow-y-auto overscroll-contain px-5 pt-4 pb-6 md:gap-7 md:px-7 md:pt-7">
            <nav aria-label="Menu">
              <ul className="flex flex-col">
                {primaryLinks.map((link) => {
                  const active = link.href === activeHref;
                  return (
                    <li key={link.href} className="border-b border-border-subtle">
                      <Dialog.Close asChild>
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className="group flex items-center justify-between gap-3 py-2.75 md:py-3.5"
                        >
                          <span className="flex items-center gap-3">
                            {active && <span aria-hidden className="size-2 shrink-0 rounded-full bg-brand" />}
                            <span className="text-28 leading-3xl font-medium tracking-snug md:text-3xl md:leading-9.5">
                              {link.label}
                            </span>
                            {link.badge && (
                              <Badge variant="accent" className="px-2.5 py-1 font-bold">
                                {link.badge}
                              </Badge>
                            )}
                          </span>
                          <Icon
                            name="chevronRight"
                            className="text-text-muted transition-transform group-hover:translate-x-0.5"
                          />
                        </Link>
                      </Dialog.Close>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {needs.length > 0 && (
              <section aria-labelledby="menu-drawer-needs" className="flex flex-col gap-3">
                <h2
                  id="menu-drawer-needs"
                  className="text-xs leading-xs font-semibold tracking-wide text-text-muted uppercase"
                >
                  {needsTitle}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {needs.map((need) => (
                    <li key={need.href}>
                      <Dialog.Close asChild>
                        <Link
                          href={need.href}
                          className="inline-flex rounded-full bg-surface px-3.5 py-2.25 text-sm leading-xs font-medium text-text transition-colors hover:bg-border-subtle md:dark:bg-border-subtle md:dark:hover:bg-border"
                        >
                          {need.label}
                        </Link>
                      </Dialog.Close>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {promo && (
              <Dialog.Close asChild>
                <Link
                  href={promo.href}
                  className="flex shrink-0 items-center justify-between gap-3 overflow-hidden rounded-lg bg-primary px-4.5 py-4 transition-colors hover:bg-primary-hover"
                >
                  <span className="flex flex-col gap-1">
                    <span className="text-11 leading-3.5 font-semibold tracking-wide text-accent uppercase">
                      {promo.eyebrow}
                    </span>
                    <span className="text-lg leading-base font-semibold text-text-inverse">{promo.title}</span>
                    <span className="text-sm leading-xs text-text-inverse-muted">{promo.description}</span>
                  </span>
                  {promo.image && <span className="relative h-18.75 w-13.5 shrink-0">{promo.image}</span>}
                </Link>
              </Dialog.Close>
            )}

            {secondaryLinks.length > 0 && (
              <ul className="flex flex-col">
                {secondaryLinks.map((link) => (
                  <li key={link.href}>
                    <Dialog.Close asChild>
                      <Link href={link.href} className="flex items-center gap-3 py-2.5 hover:text-text-secondary">
                        <Icon name={link.icon} />
                        <span className="grow text-md leading-base">{link.label}</span>
                        {link.meta && <span className="text-sm leading-xs text-text-muted">{link.meta}</span>}
                      </Link>
                    </Dialog.Close>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex shrink-0 flex-col gap-3 border-t border-border-subtle bg-surface-subtle px-5 pt-4 pb-7 md:px-7 md:pb-8">
            {account ? (
              <Dialog.Close asChild>
                <Link href={account.href} className="group flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-base leading-sm font-semibold text-primary dark:text-brand"
                  >
                    {account.initials}
                  </span>
                  <span className="flex grow flex-col gap-0.5">
                    <span className="text-base leading-sm font-semibold text-text">{account.name}</span>
                    <span className="text-sm leading-xs text-text-muted">{account.summary}</span>
                  </span>
                  <Icon
                    name="chevronRight"
                    className="text-text-muted transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </Dialog.Close>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-0.5">
                  <p className="text-base leading-sm font-semibold text-text">Sign in for faster checkout</p>
                  <p className="text-sm leading-4.5 text-text-muted">Track orders and keep favourites everywhere.</p>
                </div>
                <div className="flex gap-2">
                  <Dialog.Close asChild>
                    <Button asChild size="xs" className="h-11 flex-1 basis-0">
                      <Link href={signInHref}>Sign in</Link>
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Button asChild size="xs" variant="secondary" className="h-11 flex-1 basis-0">
                      <Link href={createAccountHref}>Create account</Link>
                    </Button>
                  </Dialog.Close>
                </div>
              </div>
            )}

            {help && (
              <p
                className={cn(
                  "flex items-center gap-2 text-sm leading-xs text-text-secondary",
                  !account && "hidden md:flex",
                )}
              >
                {help.prompt}
                {/^https?:/.test(help.href) ? (
                  <a href={help.href} target="_blank" rel="noreferrer" className={helpLinkClass}>
                    {help.label}
                  </a>
                ) : (
                  <Dialog.Close asChild>
                    <Link href={help.href} className={helpLinkClass}>
                      {help.label}
                    </Link>
                  </Dialog.Close>
                )}
              </p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
