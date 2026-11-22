import Link from "next/link";

import { SettingsNav } from "@repo/ui/organisms";

import { SETTINGS_NAV } from "../../../_content/admin-settings";

/** The settings sections, marking the current one. */
export function SettingsSections({ active }: { active: string }) {
  return <SettingsNav linkAs={Link} groups={SETTINGS_NAV} activeHref={active} />;
}
