import Image from "next/image";

import { adjustStock, receiveStock } from "../../../_actions/admin-inventory";
import {
  adjustReasons,
  adjustableVariants,
  inventoryLocation,
  inventoryStaff,
  linkableOrders,
  receivableVariants,
  receiveDefaults,
  suppliers,
} from "../../../_content/admin-inventory";
import { placeholderSrc } from "../../../_lib/placeholder";
import { AdjustPanel, ReceivePanel } from "../_components/inventory";

function packshot(image: string | undefined, sizes: string) {
  const src = image && placeholderSrc(`${image}.png`);
  return src ? <Image src={src} alt="" fill sizes={sizes} className="object-cover" /> : undefined;
}

/** Receive (?receive=new | <variant>) or Adjust (?adjust=choose | <variant>, &mode=add | count) over an inventory list; `closeHref` is that list. */
export function InventoryPanels({
  receive,
  adjust,
  mode,
  closeHref,
}: {
  receive?: string;
  adjust?: string;
  mode?: string;
  closeHref: string;
}) {
  const fields = { returnTo: closeHref };

  if (receive) {
    const defaults = receiveDefaults(receive === "new" ? undefined : receive);
    return (
      <ReceivePanel
        key={receive}
        closeHref={closeHref}
        location={inventoryLocation}
        suppliers={suppliers}
        defaultSupplier={defaults.supplier}
        defaultInvoice={defaults.invoice}
        defaultLines={defaults.lines}
        variants={receivableVariants().map(({ image, ...variant }) => ({ ...variant, image: packshot(image, "40px") }))}
        action={receiveStock}
        fields={fields}
      />
    );
  }

  if (adjust) {
    const variants = adjustableVariants().map(({ image, ...variant }) => ({ ...variant, image: packshot(image, "48px") }));
    const choose = adjust === "choose";
    const variant = choose ? variants.find((item) => item.id === "grn-30") : variants.find((item) => item.id === adjust);
    if (!variant) return null;
    return (
      <AdjustPanel
        key={adjust}
        closeHref={closeHref}
        variant={variant}
        variants={choose ? variants.filter((item) => item.id !== "gift") : undefined}
        defaultMode={mode === "add" || mode === "count" ? mode : "remove"}
        reasons={adjustReasons}
        noteRequiredFor={["damaged", "lost"]}
        orders={linkableOrders()}
        searchAllOrdersHref="/admin/orders"
        staffName={inventoryStaff}
        action={adjustStock}
        fields={fields}
      />
    );
  }

  return null;
}
