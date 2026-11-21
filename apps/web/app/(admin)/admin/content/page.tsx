import type { Metadata } from "next";
import Image from "next/image";

import { addHomeBlockAction, publishHomeAction, reorderHomeAction, saveHomeBlockAction } from "../../../_actions/admin-content";
import { homeBlocks, homeChanges, homeCollections } from "../../../_content/admin-content";
import { placeholderSrc } from "../../../_lib/placeholder";
import { HomeBuilder } from "../_components/content";
import { ContentHeader } from "./_header";

export const metadata: Metadata = { title: "Content" };

type SearchParams = Promise<{ block?: string }>;

function packshot(image: string) {
  const src = placeholderSrc(`${image}.png`);
  return src ? <Image key={image} src={src} alt="" fill sizes="64px" className="object-cover" /> : null;
}

/** /admin/content (Paper "Jofak - Admin" → Home page builder). Drafts in server memory; Publish makes them live. */
export default async function AdminContentPage({ searchParams }: { searchParams: SearchParams }) {
  const { block } = await searchParams;
  const changes = homeChanges();
  const blocks = homeBlocks().map((item) => ({
    ...item,
    slides: item.slides?.map(({ images, ...slide }) => ({ ...slide, media: images?.map(packshot) })),
  }));
  const selected = blocks.find((item) => item.id === block)?.id ?? blocks.find((item) => item.kind === "carousel")?.id ?? blocks[0]!.id;
  const status = changes ? `${changes} unpublished ${changes === 1 ? "change" : "changes"}` : "Everything is published";

  return (
    <>
      <ContentHeader
        activeHref="/admin/content"
        status={status}
        publish={publishHomeAction}
        publishLabel={changes ? `Publish ${changes} ${changes === 1 ? "change" : "changes"}` : "All published"}
        compactPublishLabel="Publish"
        changes={changes}
      />
      <HomeBuilder
        key={selected}
        blocks={blocks}
        selectedId={selected}
        collections={homeCollections()}
        onSave={saveHomeBlockAction}
        onReorder={reorderHomeAction}
        addAction={addHomeBlockAction}
        editorOnMobile={Boolean(block)}
        className="pb-24 md:pb-0"
      />
    </>
  );
}
