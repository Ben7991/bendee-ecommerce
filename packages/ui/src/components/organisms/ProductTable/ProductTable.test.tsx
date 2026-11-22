import { fireEvent, render, screen, within } from "@testing-library/react";

import { ProductTable, type AdminProduct } from "./ProductTable";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const product = (overrides: Partial<AdminProduct>): AdminProduct => ({
  id: "ash",
  name: "Ashwagandha Calm",
  href: "/admin/products/ash",
  brand: { label: "Adinkra Apothecary", href: "/admin/products/brands/adinkra" },
  variants: "2 variants",
  status: { label: "Active", tone: "success" },
  category: { name: "Ashwagandha", parent: "Sleep & stress" },
  stock: { label: "60 caps sold out", detail: "120 caps: 18 left", tone: "error" },
  price: "GHS 145–260",
  sold: 86,
  ...overrides,
});

describe("ProductTable", () => {
  it("lists products with status, category, stock and sales", () => {
    render(<ProductTable className="mt-4" products={[product({}), product({ id: "vit", name: "Vitamin C", href: "/admin/products/vit", category: null, sold: null, issue: "2 things to fix", stock: { label: "60 in stock", tone: "muted" } })]} />);
    expect(screen.getByRole("region", { name: "Products" })).toHaveClass("mt-4");
    const table = screen.getByRole("table");
    expect(within(table).getByRole("link", { name: "Ashwagandha Calm" })).toHaveAttribute("href", "/admin/products/ash");
    expect(within(table).getByText("60 caps sold out")).toHaveClass("text-error");
    expect(within(table).getByText("No category")).toBeInTheDocument();
    expect(within(table).getByRole("link", { name: "Choose one" })).toHaveAttribute("href", "/admin/products/vit");
    expect(within(table).getByText("2 things to fix")).toHaveClass("text-error");
    expect(within(table).getByText("—")).toBeInTheDocument();
  });

  it("shows a bulk bar for selected products", () => {
    const { container } = render(<ProductTable products={[product({})]} bulkAction="/bulk" bulkActions={[{ value: "archive", label: "Archive" }]} />);
    fireEvent.click(screen.getByRole("checkbox", { name: "Select Ashwagandha Calm" }));
    expect(screen.getByRole("status")).toHaveTextContent("1 selected");
    expect(container.querySelector('input[name="product"]')).toHaveValue("ash");
    expect(screen.getByRole("button", { name: "Archive" })).toHaveAttribute("type", "submit");
  });
});
