import type { Metadata } from "next";

import { AdminChrome } from "./_components/admin-chrome";

export const metadata: Metadata = {
  title: { default: "Admin · Jofak", template: "%s · Jofak admin" },
  robots: { index: false, follow: false },
};

/** The admin back office (docs/07: route group in apps/web until it needs its own app). */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminChrome>{children}</AdminChrome>;
}
