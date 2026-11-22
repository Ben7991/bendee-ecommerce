import type { Metadata } from "next";

import { StoreProfile } from "../_store";

export const metadata: Metadata = { title: "Store profile" };

type SearchParams = Promise<{ saved?: string }>;

/** /admin/settings/store (Paper "Jofak - Admin" → Settings → Store profile). */
export default async function AdminStoreProfilePage({ searchParams }: { searchParams: SearchParams }) {
  const { saved } = await searchParams;
  return <StoreProfile formKey={saved} />;
}
