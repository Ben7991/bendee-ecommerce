import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Button, Icon, IconButton, Logo } from "../../atoms";

/**
 * MinimalShell (template): bare page frame for error and maintenance screens: logo, a WhatsApp
 * help link, the content, and a one-line footer. No navigation, search or cart, so it works
 * even when the rest of the store doesn't.
 */
export interface MinimalShellProps extends ComponentProps<"div"> {
  helpHref: string;
  helpLabel?: string;
  copyright: string;
  tagline?: string;
  homeHref?: string;
  linkAs?: LinkComponent;
}

export function MinimalShell({
  helpHref,
  helpLabel = "Chat on WhatsApp",
  copyright,
  tagline,
  homeHref = "/",
  linkAs: Link = "a",
  className,
  children,
  ...props
}: MinimalShellProps) {
  const external = /^https?:/.test(helpHref);
  const helpLinkProps = external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <div data-slot="minimal-shell" className={cn("flex min-h-dvh flex-col bg-bg", className)} {...props}>
      <header className="flex items-center justify-between border-b border-border-subtle px-5 pt-2 pb-3.5 md:px-10 md:py-6 xl:px-14 xl:py-7">
        <Logo asChild size="minimal">
          <Link href={homeHref} aria-label="Jofak home" />
        </Logo>
        <IconButton asChild label={helpLabel} size="md" className="size-10 md:hidden">
          <a href={helpHref} {...helpLinkProps}>
            <Icon name="chat" size={16} />
          </a>
        </IconButton>
        <Button asChild variant="secondary" size="xs" className="hidden md:inline-flex">
          <a href={helpHref} {...helpLinkProps}>
            <Icon name="chat" size={15} />
            {helpLabel}
          </a>
        </Button>
      </header>
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <footer className="flex justify-center px-5 pt-4 pb-7 font-sans text-xs leading-xs text-text-muted md:justify-between md:border-t md:border-border-subtle md:px-10 md:py-5 xl:px-14 xl:py-6">
        <p>{copyright}</p>
        {tagline && <p className="hidden md:block">{tagline}</p>}
      </footer>
    </div>
  );
}
