import type { ComponentProps, ReactNode } from "react";

import type { LinkComponent } from "../../../lib";
import { Heading, Logo } from "../../atoms";
import { NewsletterForm, ThemeSwitch } from "../../molecules";

export interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string }>;
}

/**
 * SiteFooter (organism). Two renditions, as in Paper:
 *   mobile: light compact block — newsletter, theme switch, logo and copyright
 *   tablet/desktop: evergreen panel — newsletter, brand, link columns, theme switch, legal
 * Both theme switches drive the same ThemeProvider.
 */
export interface SiteFooterProps extends ComponentProps<"footer"> {
  newsletterTitle: ReactNode;
  newsletterHint: string;
  /** Form action for the newsletter sign-up (server action or URL). */
  newsletterAction?: ComponentProps<"form">["action"];
  tagline: string;
  columns: FooterColumn[];
  copyright: string;
  shortCopyright: string;
  disclaimer: string;
  homeHref?: string;
  linkAs?: LinkComponent;
}

export function SiteFooter({
  newsletterTitle,
  newsletterHint,
  newsletterAction,
  tagline,
  columns,
  copyright,
  shortCopyright,
  disclaimer,
  homeHref = "/",
  linkAs: Link = "a",
  className,
  ...props
}: SiteFooterProps) {
  return (
    <footer data-slot="site-footer" className={className} {...props}>
      {/* Mobile */}
      <div className="flex flex-col gap-5 px-5 pt-10 pb-6 md:hidden">
        <NewsletterForm
          action={newsletterAction}
          placeholder="Your email for 15% off"
          submitLabel="Join"
          aria-label="Newsletter sign-up"
        />
        <ThemeSwitch className="justify-between pt-1" />
        <div className="flex items-center justify-between">
          <Logo asChild size="compact">
            <Link href={homeHref} aria-label="Jofak home" />
          </Logo>
          <p className="font-sans text-xs leading-xs text-text-muted">
            {shortCopyright}
          </p>
        </div>
      </div>

      {/* Tablet and desktop */}
      <div className="hidden flex-col gap-18 rounded-2xl bg-feature px-10 pt-18 pb-8 md:flex xl:px-14">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <Heading
            size="feature"
            tone="inverse"
            className="xl:min-w-0 xl:flex-1"
          >
            {newsletterTitle}
          </Heading>
          <NewsletterForm
            tone="feature"
            action={newsletterAction}
            hint={newsletterHint}
            aria-label="Newsletter sign-up"
            className="xl:w-115 xl:shrink-0"
          />
        </div>

        <div className="flex flex-col gap-10 xl:flex-row xl:justify-between">
          <div className="flex w-95 flex-col gap-4 xl:w-80 xl:shrink-0">
            <Logo asChild tone="inverse" size="footer">
              <Link href={homeHref} aria-label="Jofak home" />
            </Logo>
            <p className="font-sans text-14 leading-5.5 text-on-feature-muted">
              {tagline}
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-3 gap-10 xl:flex xl:gap-20"
          >
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3.5">
                <h2 className="font-sans text-sm leading-xs font-semibold tracking-caps text-text-inverse uppercase">
                  {column.title}
                </h2>
                <ul className="flex flex-col gap-3.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-sans text-base leading-4.5 text-text-inverse-muted transition-colors hover:text-text-inverse"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/12 pt-6 xl:flex-row xl:items-center xl:justify-between">
          <p className="font-sans text-sm leading-xs text-on-feature-muted">
            {copyright}
          </p>
          <ThemeSwitch tone="feature" />
          <p className="font-sans text-sm leading-xs text-on-feature-muted">
            {disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
