import { fireEvent, render, screen } from "@testing-library/react";

import { ProductVariantsCard } from "./ProductVariantsCard";

describe("ProductVariantsCard", () => {
  it("lists options and variants and highlights edited prices", () => {
    render(
      <ProductVariantsCard
        className="mt-4"
        options={[{ name: "Flavour", values: ["Citrus", "Mango"] }]}
        variants={[
          { id: "cit", name: "Citrus", sku: "JF-ENR-CIT", price: "116.00", cost: "GHS 58.00", stock: 5, low: true },
          { id: "mng", name: "Mango", sku: "JF-ENR-MNG", price: "99.00", was: "116.00", cost: "GHS 58.00", stock: 54 },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Options and variants" })).toHaveClass("mt-4");
    expect(screen.getByText("On sale")).toBeInTheDocument();
    const price = screen.getByRole("textbox", { name: "Price of Citrus" });
    expect(price).toHaveAttribute("name", "price:cit");
    fireEvent.change(price, { target: { value: "120.00" } });
    expect(price.closest("label")).toHaveClass("bg-sage-50");
    expect(screen.getByText("5")).toHaveClass("text-warning-text");
  });
});
