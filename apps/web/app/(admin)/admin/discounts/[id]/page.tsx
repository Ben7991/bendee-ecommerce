import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ProductEditorForm } from "@repo/ui/organisms";

import { saveDiscountAction } from "../../../../_actions/admin-discounts";
import { discountProducts, findDiscountEditor } from "../../../../_content/admin-discounts";
import { placeholderSrc } from "../../../../_lib/placeholder";
import { DiscountEditorFields } from "../../_components/discounts";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ saved?: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  return { title: findDiscountEditor(id)?.title ?? "Discount" };
}

function packshot(image: string) {
  const src = placeholderSrc(`${image}.png`);
  return src ? <Image src={src} alt="" fill sizes="40px" className="object-cover" /> : undefined;
}

/** /admin/discounts/[id] (Paper "Jofak - Admin" → Discount editor). Saves to the in-memory sample discounts. */
export default async function AdminDiscountPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { id } = await params;
  const { saved } = await searchParams;
  const discount = findDiscountEditor(id);
  if (!discount) notFound();

  return (
    <ProductEditorForm
      key={saved ?? "loaded"}
      variant="light"
      aria-label={`Edit ${discount.title}`}
      action={saveDiscountAction.bind(null, discount.id)}
      secondaryAction={
        <button
          type="submit"
          name="intent"
          value="pause"
          className="flex h-12 shrink-0 items-center rounded-full border border-border bg-bg px-5 text-base leading-5 font-semibold text-text hover:bg-surface-subtle md:h-10.5 md:px-4 md:text-14 dark:bg-surface"
        >
          {discount.paused ? "Resume" : "Pause"}
        </button>
      }
    >
      <DiscountEditorFields
        backHref="/admin/discounts"
        title={discount.title}
        status={discount.status}
        paused={discount.paused}
        defaultValue={discount.rules}
        internalNote={discount.note}
        products={discountProducts.map((product) => ({ name: product.name, note: product.note, image: packshot(product.image) }))}
        collections={discount.collections}
        categories={discount.categories}
        preview={discount.preview}
        usage={discount.usage}
        performance={discount.performance}
      />
    </ProductEditorForm>
  );
}
