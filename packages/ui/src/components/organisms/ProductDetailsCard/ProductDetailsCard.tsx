import { useId, type ComponentProps } from "react";

import { AdminCard, RichTextField } from "../../molecules";

/**
 * ProductDetailsCard (organism): the product's name and description (Paper Jofak - Admin →
 * Product editor → Details). Posts `name` and `description` (HTML) with the editor form.
 */
export interface ProductDetailsCardProps extends Omit<ComponentProps<"section">, "children" | "title"> {
  name: string;
  /** HTML. */
  description: string;
}

export function ProductDetailsCard({ name, description, ...props }: ProductDetailsCardProps) {
  const id = useId();
  return (
    <AdminCard data-slot="product-details-card" title="Details" {...props}>
      <span className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-name`} className="text-sm leading-4.5 font-semibold text-text">
          Product name
        </label>
        <input
          id={`${id}-name`}
          name="name"
          defaultValue={name}
          required
          className="h-11 rounded-sm border border-border bg-bg px-3.5 text-base leading-4.5 text-text outline-none focus:border-brand"
        />
      </span>
      <RichTextField name="description" label="Description" defaultValue={description} />
    </AdminCard>
  );
}
