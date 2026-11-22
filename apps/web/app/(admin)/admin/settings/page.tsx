import type { Metadata } from "next";
import Link from "next/link";

import { SettingsNav } from "@repo/ui/organisms";

import { SETTINGS_NAV } from "../../../_content/admin-settings";
import { StoreProfile } from "./_store";

export const metadata: Metadata = { title: "Settings" };

type SearchParams = Promise<{ saved?: string }>;

/**
 * /admin/settings: on mobile the settings menu (Paper shows each section with a back link to
 * it); from 768px the first section, Store profile.
 */
export default async function AdminSettingsPage({ searchParams }: { searchParams: SearchParams }) {
  const { saved } = await searchParams;
  return (
    <>
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-28 leading-3xl font-semibold tracking-tight text-text">Settings</h1>
          <p className="text-sm leading-4.5 text-text-muted">Owners and admins only · every change is recorded</p>
        </div>
        <SettingsNav linkAs={Link} groups={SETTINGS_NAV} variant="menu" />
      </div>
      <div className="hidden md:block">
        <StoreProfile formKey={saved} />
      </div>
    </>
  );
}
