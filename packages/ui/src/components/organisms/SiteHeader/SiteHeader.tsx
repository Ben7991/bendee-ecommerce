import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { CountBadge, Icon, IconButton, Logo } from "../../atoms";
import { PillNav, PillNavItem } from "../../molecules";

export interface NavLink {
  label: string;
  href: string;
}

/**
 * SiteHeader (organism): storefront navigation bar.
 *   mobile 390:  menu · logo · favourites, bag
 *   tablet 768:  menu + logo · search, account, favourites, bag
 *   desktop:     pill nav · centred logo · search, account, favourites, bag
 * Below 1440px the menu button opens the menu: pass a <MenuDrawer> (its trigger is the button)
 * through `menu`. Without it a plain button renders, wired up through `menuButtonProps`.
 */
export interface SiteHeaderProps extends ComponentProps<"header"> {
  navLinks: NavLink[];
  /** href of the current section, for the active pill. */
  activeHref?: string;
  favouritesCount?: number;
  bagCount?: number;
  homeHref?: string;
  searchHref?: string;
  accountHref?: string;
  favouritesHref?: string;
  bagHref?: string;
  /** The menu below 1440px, usually a <MenuDrawer>. Replaces the plain menu button. */
  menu?: ReactNode;
  menuButtonProps?: ComponentProps<"button">;
  linkAs?: LinkComponent;
}

export function SiteHeader({
  navLinks,
  activeHref,
  favouritesCount = 0,
  bagCount = 0,
  homeHref = "/",
  searchHref = "/search",
  accountHref = "/auth/sign-in",
  favouritesHref = "/wishlist",
  bagHref = "/cart",
  menu,
  menuButtonProps,
  linkAs: Link = "a",
  className,
  ...props
}: SiteHeaderProps) {
  const homeLink = (
    <Link href={homeHref} aria-label="Jofak home" />
  );

  return (
    <header
      data-slot="site-header"
      className={cn("relative flex items-center justify-between gap-3", className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        {menu ?? (
          <IconButton label="Open menu" aria-haspopup="dialog" className="xl:hidden" {...menuButtonProps}>
            <Icon name="menu" />
          </IconButton>
        )}
        <Logo asChild className="hidden md:inline-flex xl:hidden">
          {homeLink}
        </Logo>
        <PillNav aria-label="Primary" className="hidden xl:block">
          {navLinks.map((link) => (
            <PillNavItem key={link.href} asChild active={link.href === activeHref}>
              <Link href={link.href}>{link.label}</Link>
            </PillNavItem>
          ))}
        </PillNav>
      </div>

      <Logo asChild className="md:hidden">
        {homeLink}
      </Logo>
      <Logo asChild className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 xl:inline-flex">
        {homeLink}
      </Logo>

      <div className="flex items-center gap-2 xl:gap-2.5">
        <IconButton asChild label="Search" className="hidden md:inline-flex">
          <Link href={searchHref}>
            <Icon name="search" />
          </Link>
        </IconButton>
        <IconButton asChild label="Account" className="hidden md:inline-flex">
          <Link href={accountHref}>
            <Icon name="user" />
          </Link>
        </IconButton>
        <IconButton asChild label={favouritesCount ? `Favourites, ${favouritesCount} items` : "Favourites"}>
          <Link href={favouritesHref}>
            <Icon name="heart" />
            <CountBadge count={favouritesCount} />
          </Link>
        </IconButton>
        <IconButton asChild variant="solid" label={bagCount ? `Bag, ${bagCount} items` : "Bag"}>
          <Link href={bagHref}>
            <Icon name="bag" />
            <CountBadge count={bagCount} />
          </Link>
        </IconButton>
      </div>
    </header>
  );
}
