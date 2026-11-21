import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@repo/ui/atoms";
import { AdminPageHeader, SectionTabs, StickyActionBar } from "@repo/ui/organisms";

import { contentTabs } from "../../../_content/admin-content";

/*
 * The Content header shared by the home page, pages and menus (Paper "Jofak - Admin" → Content):
 * title, what changed, Preview store and the area's Publish button, the section tabs, and on
 * mobile a bottom bar with Preview and Publish.
 */
export function ContentHeader({
  activeHref,
  status,
  publish,
  publishLabel,
  compactPublishLabel,
  changes,
  previewHref = "/",
}: {
  activeHref: string;
  /** Tablet and mobile: "2 unpublished changes". */
  status: string;
  /** A server action. */
  publish: () => Promise<void>;
  publishLabel: string;
  /** Tablet: "Publish". */
  compactPublishLabel?: string;
  changes: number;
  previewHref?: string;
}): ReactNode {
  const button = (className: string, label: ReactNode) => (
    <form action={publish} className="contents">
      <button
        type="submit"
        disabled={changes === 0}
        className={`flex items-center justify-center rounded-full bg-primary font-semibold text-on-primary hover:bg-primary-hover disabled:opacity-muted ${className}`}
      >
        {label}
      </button>
    </form>
  );
  return (
    <>
      <AdminPageHeader
        layout="inline"
        title="Content"
        description={
          <>
            <span className="xl:hidden">{status}</span>
            <span className="hidden xl:inline">What shoppers see first · changes go live when you publish, no developer needed</span>
          </>
        }
        actions={
          <div className="hidden items-center gap-2.5 md:flex">
            <a
              href={previewHref}
              target="_blank"
              rel="noreferrer"
              className="hidden h-11 items-center gap-2 rounded-full border border-border px-4.5 text-14 leading-4.5 font-semibold text-text hover:bg-surface-subtle xl:flex"
            >
              Preview store
              <Icon name="arrowUpRight" size={14} strokeWidth={1.6} />
            </a>
            {button(
              "h-10.5 px-4.5 text-14 leading-4.5 xl:h-11 xl:px-5",
              compactPublishLabel ? (
                <>
                  <span className="xl:hidden">{compactPublishLabel}</span>
                  <span className="hidden xl:inline">{publishLabel}</span>
                </>
              ) : (
                publishLabel
              ),
            )}
          </div>
        }
      />
      <SectionTabs linkAs={Link} aria-label="Content sections" tabs={contentTabs()} activeHref={activeHref} />
      <StickyActionBar
        className="px-4 pt-3 pb-7 shadow-none"
        action={
          <div className="flex gap-2.5">
            <a href={previewHref} target="_blank" rel="noreferrer" className="flex h-12 items-center rounded-full border border-border px-5 text-base leading-5 font-semibold text-text">
              Preview
            </a>
            {button("h-12 flex-1 text-base leading-5", publishLabel)}
          </div>
        }
      />
    </>
  );
}
