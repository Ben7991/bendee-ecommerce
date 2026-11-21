"use client";

import Link from "next/link";

import { HomePageBuilder, PageEditor, type HomePageBuilderProps, type PageEditorProps } from "@repo/ui/organisms";

/*
 * Client boundary for the content editors, which take next/link and href builders: a server
 * component can't hand components or functions (other than server actions) to client ones.
 */

export function HomeBuilder(props: Omit<HomePageBuilderProps, "linkAs" | "blockHref">) {
  return <HomePageBuilder {...props} linkAs={Link} blockHref={(id) => `/admin/content?block=${id}`} />;
}

export function ContentPageEditor(props: Omit<PageEditorProps, "linkAs" | "pageHref">) {
  return <PageEditor {...props} linkAs={Link} pageHref={(slug) => `/admin/content/pages/${slug}`} />;
}
