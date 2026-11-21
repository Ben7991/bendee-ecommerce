import { fireEvent, render, screen } from "@testing-library/react";

import { ProductOrganisationCard } from "./ProductOrganisationCard";

const props = {
  categories: [
    { value: "energy", label: "Energy & sports" },
    { value: "multi", label: "Multivitamins" },
  ],
  category: "energy",
  alsoIn: ["multi"],
  brands: [{ value: "sunbird", label: "Sunbird Nutrition", mark: { tone: "citrus" as const, monogram: "S" } }],
  brand: "sunbird",
  tags: ["vegan"],
  taxes: [{ value: "standard", label: "Standard (VAT + levies)" }],
  tax: "standard",
};

describe("ProductOrganisationCard", () => {
  it("edits categories, brand and tags", () => {
    const { container } = render(<ProductOrganisationCard {...props} className="mt-4" />);
    expect(screen.getByRole("region", { name: "Organisation" })).toHaveClass("mt-4");
    expect(screen.getByRole("combobox", { name: "Main category" })).toHaveValue("energy");
    expect(screen.getByRole("combobox", { name: "Brand" })).toHaveValue("sunbird");
    fireEvent.click(screen.getByRole("button", { name: "Remove Multivitamins" }));
    expect(container.querySelector('input[name="alsoIn"]')).toHaveValue("");
    const tag = screen.getByRole("textbox", { name: "Tags" });
    fireEvent.change(tag, { target: { value: "Chewable" } });
    fireEvent.keyDown(tag, { key: "Enter" });
    expect(container.querySelector('input[name="tags"]')).toHaveValue("vegan,chewable");
  });
});
