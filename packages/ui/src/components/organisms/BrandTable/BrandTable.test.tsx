import { fireEvent, render, screen, within } from "@testing-library/react";

import { BrandTable, type AdminBrand } from "./BrandTable";

const brands: AdminBrand[] = [
  { id: "sunbird", name: "Sunbird Nutrition", slug: "sunbird-nutrition", mark: { tone: "citrus", monogram: "S" }, count: 8 },
  { id: "adinkra", name: "Adinkra Apothecary", slug: "adinkra-apothecary", mark: { tone: "amber", monogram: "A" }, count: 5 },
  { id: "volta", name: "Volta Vitality", slug: "volta-vitality", mark: { tone: "empty" }, count: 0, note: "No logo yet" },
];

describe("BrandTable", () => {
  it("lists brands A–Z with address and count, and marks the one being edited", () => {
    render(<BrandTable className="mt-4" brands={brands} total={12} selectedId="adinkra" hrefFor={(id) => `?brand=${id}`} showAllHref="?all=1" />);
    expect(screen.getByRole("region", { name: "Brands" })).toHaveClass("mt-4");
    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row").slice(1);
    expect(rows[0]).toHaveTextContent("Adinkra Apothecary");
    expect(rows[0]).toHaveTextContent("Editing");
    expect(within(table).getByText("/b/volta-vitality")).toBeInTheDocument();
    expect(within(table).getByText("No logo yet")).toBeInTheDocument();
    expect(screen.getByText("Showing 3 of 12 brands")).toBeInTheDocument();
  });

  it("finds and sorts by product count", () => {
    render(<BrandTable brands={brands} total={3} hrefFor={(id) => id} />);
    fireEvent.change(screen.getByRole("combobox", { name: "Sort brands" }), { target: { value: "count" } });
    expect(within(screen.getByRole("table")).getAllByRole("row")[1]).toHaveTextContent("Sunbird Nutrition");
    fireEvent.change(screen.getByRole("searchbox", { name: "Find a brand" }), { target: { value: "volta" } });
    expect(within(screen.getByRole("table")).getAllByRole("row")).toHaveLength(2);
  });
});
