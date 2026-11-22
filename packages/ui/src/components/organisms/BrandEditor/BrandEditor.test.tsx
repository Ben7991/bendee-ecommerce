import { render, screen } from "@testing-library/react";

import { BrandEditor } from "./BrandEditor";

describe("BrandEditor", () => {
  it("edits the brand and blocks delete while products use it", () => {
    render(<BrandEditor className="mt-4" name="Asaase Botanicals" slug="asaase-botanicals" mark={{ tone: "primary", icon: "leaf" }} count={9} productsHref="/admin/products?brand=asaase" />);
    expect(screen.getByRole("region", { name: "Edit Asaase Botanicals" })).toHaveClass("mt-4");
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("Asaase Botanicals");
    expect(screen.getByRole("textbox", { name: "Web address" })).toHaveValue("asaase-botanicals");
    expect(screen.getByRole("link", { name: "View" })).toHaveAttribute("href", "/admin/products?brand=asaase");
    expect(screen.getByRole("button", { name: "Delete" })).toBeDisabled();
    expect(screen.getByText("Delete is available once no products use this brand.")).toBeInTheDocument();
  });

  it("allows delete for an unused brand", () => {
    render(<BrandEditor name="Volta Vitality" slug="volta-vitality" mark={{ tone: "empty" }} hasLogo={false} count={0} productsHref="#" />);
    expect(screen.getByRole("button", { name: "Delete" })).toBeEnabled();
    expect(screen.queryByRole("button", { name: "Remove" })).not.toBeInTheDocument();
  });
});
