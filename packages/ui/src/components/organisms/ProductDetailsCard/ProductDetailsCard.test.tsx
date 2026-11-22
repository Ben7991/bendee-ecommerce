import { render, screen } from "@testing-library/react";

import { ProductDetailsCard } from "./ProductDetailsCard";

describe("ProductDetailsCard", () => {
  it("edits the name and description", () => {
    render(<ProductDetailsCard className="mt-4" name="Energy B-Complex" description="<p>All eight B vitamins.</p>" />);
    expect(screen.getByRole("region", { name: "Details" })).toHaveClass("mt-4");
    expect(screen.getByRole("textbox", { name: "Product name" })).toHaveValue("Energy B-Complex");
    expect(screen.getByRole("textbox", { name: "Description" })).toHaveTextContent("All eight B vitamins.");
  });
});
