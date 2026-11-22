import { render, screen, within } from "@testing-library/react";

import { SectionTabs } from "./SectionTabs";

describe("SectionTabs", () => {
  it("links the sections and marks the current one", () => {
    render(
      <SectionTabs
        className="mt-4"
        aria-label="Catalog"
        activeHref="/admin/products/brands"
        tabs={[
          { href: "/admin/products", label: "All products", compactLabel: "Products", count: 48 },
          { href: "/admin/products/brands", label: "Brands", count: 12 },
        ]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Catalog" });
    expect(nav).toHaveClass("mt-4");
    const current = within(nav).getAllByRole("link", { current: "page" });
    expect(current).toHaveLength(2);
    expect(current.every((link) => link.getAttribute("href") === "/admin/products/brands")).toBe(true);
    expect(within(nav).getByText("48")).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Products" })).toHaveAttribute("href", "/admin/products");
  });
});
