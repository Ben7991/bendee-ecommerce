import { render, screen } from "@testing-library/react";

import { ProductEditorHeader } from "./ProductEditorHeader";

describe("ProductEditorHeader", () => {
  it("shows the product with its status and actions", () => {
    render(<ProductEditorHeader className="mt-4" backHref="/admin/products" name="Energy B-Complex" status={{ label: "Active", tone: "success" }} meta="Live since 2 Sep" previewHref="/products/energy" duplicateHref="/admin/products/new?from=energy" />);
    expect(screen.getByRole("heading", { level: 1, name: "Energy B-Complex" })).toBeInTheDocument();
    expect(screen.getByText("Active")).toHaveClass("bg-sage-100");
    expect(screen.getByRole("link", { name: "Back to Products" })).toHaveAttribute("href", "/admin/products");
    expect(screen.getByRole("link", { name: "Preview" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "Duplicate" })).toHaveAttribute("href", "/admin/products/new?from=energy");
    expect(screen.getByRole("banner")).toHaveClass("mt-4");
  });
});
