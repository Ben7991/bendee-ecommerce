import { render, screen } from "@testing-library/react";

import { ProductMediaCard } from "./ProductMediaCard";

describe("ProductMediaCard", () => {
  it("marks the first image as the cover and posts the order", () => {
    const { container } = render(
      <ProductMediaCard
        className="mt-4"
        images={[
          { id: "a", image: null, alt: "Front" },
          { id: "b", image: null, alt: "Back" },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Media" })).toHaveClass("mt-4");
    expect(screen.getByText("Cover")).toBeInTheDocument();
    expect(container.querySelector('input[name="media"]')).toHaveValue("a,b");
    expect(container.querySelector('input[type="file"][name="images"]')).toBeInTheDocument();
  });
});
