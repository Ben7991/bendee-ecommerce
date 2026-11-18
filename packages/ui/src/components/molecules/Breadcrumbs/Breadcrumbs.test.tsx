import { render, screen } from "@testing-library/react";

import { BreadcrumbItem, Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders a labelled trail with the current page marked", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem current>All supplements</BreadcrumbItem>
      </Breadcrumbs>,
    );
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByText("All supplements")).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "All supplements" })).not.toBeInTheDocument();
  });

  it("renders the child link with asChild", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem asChild className="mt-4">
          <a href="/shop">Shop</a>
        </BreadcrumbItem>
      </Breadcrumbs>,
    );
    const link = screen.getByRole("link", { name: "Shop" });
    expect(link).toHaveAttribute("data-slot", "breadcrumb-item");
    expect(link).toHaveClass("mt-4");
  });
});
