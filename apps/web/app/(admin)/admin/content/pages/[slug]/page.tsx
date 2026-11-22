import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { createPageAction, publishPageAction, savePageAction } from "../../../../../_actions/admin-content";
import { findPage, pageLinks } from "../../../../../_content/admin-content";
import { ContentPageEditor } from "../../../_components/content";
import { ContentHeader } from "../../_header";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  return { title: findPage(slug)?.title ?? "Page" };
}

/** /admin/content/pages/[slug] (Paper "Jofak - Admin" → Page editor). Drafts in server memory; Publish page makes it live. */
export default async function AdminContentPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) notFound();

  return (
    <>
      <ContentHeader
        activeHref="/admin/content/pages"
        status={page.changed ? `${page.title} has draft changes` : `${page.title} is published`}
        publish={publishPageAction.bind(null, slug)}
        publishLabel="Publish page"
        changes={page.changed ? 1 : 0}
        previewHref={`/pages/${page.draft.address}`}
      />
      <ContentPageEditor
        key={slug}
        pages={pageLinks()}
        currentSlug={slug}
        defaultValue={page.draft}
        liveNote={page.liveNote}
        warning={page.warning}
        onSave={savePageAction.bind(null, slug)}
        newPageAction={createPageAction}
        className="pb-24 md:pb-0"
      />
    </>
  );
}
