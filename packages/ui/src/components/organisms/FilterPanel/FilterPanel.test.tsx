import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FilterPanel, type FilterFacet } from "./FilterPanel";

const facets: FilterFacet[] = [
  {
    kind: "checkboxes",
    id: "type",
    label: "Product type",
    options: [
      { value: "capsules", label: "Capsules", count: 28 },
      { value: "tablets", label: "Tablets", count: 9 },
    ],
  },
  {
    kind: "price",
    id: "price",
    label: "Price",
    min: 0,
    max: 800,
    defaultValue: [150, 700],
    presets: [
      { value: "0-200", label: "Under 200" },
      { value: "400-", label: "400+" },
    ],
  },
  {
    kind: "chips",
    id: "diet",
    label: "Dietary",
    options: [{ value: "vegan", label: "Vegan" }],
  },
  {
    kind: "switches",
    id: "availability",
    options: [{ value: "in-stock", label: "In stock only" }],
  },
];

describe("FilterPanel", () => {
  it("renders the heading row and every facet", () => {
    render(<FilterPanel facets={facets} title="Filters" clearAction={<a href="/shop">Clear all</a>} className="mt-4" />);
    expect(screen.getByRole("heading", { name: "Filters" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Clear all" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Capsules" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Vegan" })).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: "In stock only" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Filters" }).closest("[data-slot=filter-panel]")).toHaveClass("mt-4");
  });

  it("reports ticked options per facet", async () => {
    const onFacetChange = vi.fn();
    render(<FilterPanel facets={facets} onFacetChange={onFacetChange} />);
    await userEvent.click(screen.getByRole("checkbox", { name: "Capsules" }));
    await userEvent.click(screen.getByLabelText("Tablets"));
    expect(onFacetChange).toHaveBeenLastCalledWith("type", ["capsules", "tablets"]);
    await userEvent.click(screen.getByRole("switch", { name: "In stock only" }));
    expect(onFacetChange).toHaveBeenLastCalledWith("availability", ["in-stock"]);
  });

  it("moves the price range to a preset", async () => {
    const onFacetChange = vi.fn();
    render(<FilterPanel facets={facets} onFacetChange={onFacetChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "400+" }));
    expect(onFacetChange).toHaveBeenLastCalledWith("price", [400, 800]);
    expect(screen.getAllByRole("slider")[0]).toHaveValue("400");
  });
});
