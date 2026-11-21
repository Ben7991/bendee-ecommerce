import type { Metadata } from "next";

import { returnsSummary } from "../../_content/admin-returns";
import { AdminChrome } from "./_components/admin-chrome";

export const metadata: Metadata = {
  title: { default: "Admin · Jofak", template: "%s · Jofak admin" },
  robots: { index: false, follow: false },
};

/** The admin back office (docs/07: route group in apps/web until it needs its own app). */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // The Returns badge counts the sample returns waiting for a decision (kept in server memory).
  return <AdminChrome returnsToReview={returnsSummary().requested}>{children}</AdminChrome>;
}

/** The nav badges change as returns are decided, so render on every request. */
export const dynamic = "force-dynamic";
