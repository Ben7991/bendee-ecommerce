import Link from "next/link";

import { Button, Icon } from "@repo/ui/atoms";
import { AdminPageHeader, AdminStats } from "@repo/ui/organisms";

import { inventoryLocation, inventoryStats } from "../../../_content/admin-inventory";

/** The figures change when stock is received or adjusted, so render on every request. */
export const dynamic = "force-dynamic";

/** /admin/inventory/* (Paper "Jofak - Admin" → Inventory): the header and figures shared by Stock levels and Movements. */
export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminPageHeader
        layout="inline"
        title="Inventory"
        description={
          <>
            {inventoryLocation} · 72 variants<span className="hidden md:inline"> tracked</span>
          </>
        }
        actions={
          <>
            {/* Relative links: the panels open over whichever tab is showing. */}
            <Button asChild variant="secondary" size="sm" className="hidden h-11 gap-2 md:inline-flex">
              <Link href="?adjust=choose" scroll={false}>
                <Icon name="stockAdjust" size={16} /> Adjust stock
              </Link>
            </Button>
            <Button asChild size="sm" className="hidden h-11 gap-2 md:inline-flex">
              <Link href="?receive=new" scroll={false}>
                <Icon name="stockReceive" size={16} className="text-accent" /> Receive stock
              </Link>
            </Button>
            <Link
              href="?receive=new"
              scroll={false}
              aria-label="Scan to receive stock"
              className="flex size-11 items-center justify-center rounded-full border border-border text-text hover:bg-surface-subtle md:hidden"
            >
              <Icon name="scan" size={20} />
            </Link>
          </>
        }
      />
      <AdminStats aria-label="Stock at a glance" stats={inventoryStats()} mobile="tiles" />
      {children}
    </>
  );
}
