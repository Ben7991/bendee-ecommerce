import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@repo/ui/atoms";
import { BreadcrumbItem, Breadcrumbs, ContentNav, ContentNavItem, HelpCallout } from "@repo/ui/molecules";
import { AnnouncementBar, ContentHero } from "@repo/ui/organisms";
import { ContentLayout, StorefrontShell } from "@repo/ui/templates";

import { contact, contentPages, type ContentSlug } from "../_content/pages";
import { announcements } from "../_content/site";
import { StorefrontFooter, StorefrontHeader, StorefrontSearch } from "./storefront-chrome";

/**
 * A content page (Paper "Jofak" → Content pages): storefront chrome, the hero, the
 * "Help & policies" navigation and the article. Each /pages/* route fills in its article.
 */
export function ContentPage({
  slug,
  title,
  description,
  compactDescription,
  articleClassName,
  children,
}: {
  slug: ContentSlug;
  title: string;
  description: string;
  /** Shorter line for mobile. */
  compactDescription?: string;
  articleClassName?: string;
  children: ReactNode;
}) {
  const current = contentPages.find((page) => page.slug === slug)!;
  return (
    <StorefrontShell framed="page" announcement={<AnnouncementBar items={announcements} />} footer={<StorefrontFooter />}>
      <ContentLayout
        articleClassName={articleClassName}
        hero={
          <ContentHero
            header={<StorefrontHeader className="px-5 pt-1 md:px-8 md:pt-5 md:pb-4 xl:px-10 xl:py-5" />}
            search={<StorefrontSearch trigger="bar" />}
            breadcrumbs={
              <Breadcrumbs>
                <BreadcrumbItem asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem current>{current.label}</BreadcrumbItem>
              </Breadcrumbs>
            }
            title={title}
            description={description}
            compactDescription={compactDescription}
          />
        }
        nav={
          <ContentNav>
            {contentPages.map((page) => (
              <ContentNavItem key={page.slug} asChild active={page.slug === slug}>
                <Link href={page.href}>{page.label}</Link>
              </ContentNavItem>
            ))}
          </ContentNav>
        }
      >
        {children}
      </ContentLayout>
    </StorefrontShell>
  );
}

/** "Still need help? · Chat on WhatsApp", the close of most content pages. */
export function WhatsAppCallout() {
  return (
    <HelpCallout
      title="Still need help?"
      description={`Message us on WhatsApp, ${contact.hours}. We usually reply within the hour.`}
      action={
        <Button asChild size="sm">
          <a href={contact.whatsapp.href} target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </a>
        </Button>
      }
    />
  );
}
