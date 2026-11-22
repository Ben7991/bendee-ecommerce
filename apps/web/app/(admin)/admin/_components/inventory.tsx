"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { AdjustStockDialog, ReceiveStockSheet, type AdjustStockDialogProps, type ReceiveStockSheetProps } from "@repo/ui/organisms";

/*
 * Client boundary for the inventory panels. They open from the URL (?receive, ?adjust), so
 * closing one goes back to `closeHref`, the list it opened from.
 */

export function ReceivePanel({ closeHref, ...props }: Omit<ReceiveStockSheetProps, "open" | "onOpenChange"> & { closeHref: string }) {
  const router = useRouter();
  return <ReceiveStockSheet {...props} open onOpenChange={(open) => !open && router.push(closeHref, { scroll: false })} />;
}

export function AdjustPanel({
  closeHref,
  ...props
}: Omit<AdjustStockDialogProps, "open" | "onOpenChange" | "linkAs"> & { closeHref: string }) {
  const router = useRouter();
  return <AdjustStockDialog {...props} linkAs={Link} open onOpenChange={(open) => !open && router.push(closeHref, { scroll: false })} />;
}
