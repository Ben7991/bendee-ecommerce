import { render, screen } from "@testing-library/react";

import { ProductLayout } from "./ProductLayout";

describe("ProductLayout", () => {
  it("places breadcrumbs, gallery, buy box and the rest", () => {
    render(
      <ProductLayout
        breadcrumbs={<p>Crumbs</p>}
        backLink={<a href="/shop">Back</a>}
        gallery={<p>Gallery</p>}
        buyBox={<p>Buy box</p>}
        className="mt-4"
      >
        <p>Details</p>
      </ProductLayout>,
    );
    for (const text of ["Crumbs", "Gallery", "Buy box", "Details"]) expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back" })).toBeInTheDocument();
    expect(screen.getByText("Details").closest("[data-slot=product-layout]")).toHaveClass("mt-4");
  });
});
