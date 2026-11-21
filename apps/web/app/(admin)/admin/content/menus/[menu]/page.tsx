import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MenuEditor, MenuPicker } from "@repo/ui/organisms";

import { publishMenuAction, saveMenuAction } from "../../../../../_actions/admin-content";
import { findMenu, menuChoices, menuTargets, type MenuKind } from "../../../../../_content/admin-content";
import { ContentHeader } from "../../_header";

type Params = Promise<{ menu: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { menu } = await params;
  return { title: menu === "footer" ? "Footer menu" : "Header menu" };
}

/** /admin/content/menus/[menu] (Paper "Jofak - Admin" → Menus, Footer menu). Drafts in server memory; Publish menu makes it live. */
export default async function AdminContentMenuPage({ params }: { params: Params }) {
  const { menu } = await params;
  if (menu !== "header" && menu !== "footer") notFound();
  const kind = menu as MenuKind;
  const choices = menuChoices();
  const active = choices.find((choice) => choice.kind === kind)!;
  const { value, published } = findMenu(kind);

  return (
    <>
      <ContentHeader
        activeHref="/admin/content/menus"
        status={active.count ? `${active.title} has ${active.count} unpublished ${active.count === 1 ? "change" : "changes"}` : `${active.title} is published`}
        publish={publishMenuAction.bind(null, kind)}
        publishLabel="Publish menu"
        changes={active.count}
      />
      <div className="flex flex-col gap-3.5 pb-24 md:gap-4 md:pb-0 xl:flex-row xl:items-start xl:gap-5">
        <MenuPicker
          linkAs={Link}
          menus={choices}
          activeHref={active.href}
          tip={kind === "header" ? "“Shop by need” fills itself from your categories — reorder them in Categories." : undefined}
        />
        <MenuEditor
          key={kind}
          defaultValue={value}
          published={published}
          targets={menuTargets()}
          onSave={saveMenuAction.bind(null, kind)}
          selectedId={kind === "header" ? "collections" : "returns"}
        />
      </div>
    </>
  );
}
