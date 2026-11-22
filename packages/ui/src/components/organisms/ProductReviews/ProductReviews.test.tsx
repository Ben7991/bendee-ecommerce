import { render, screen } from "@testing-library/react";

import { ProductReviews } from "./ProductReviews";

describe("ProductReviews", () => {
  it("summarises the rating and lists the reviews", () => {
    render(
      <ProductReviews
        title={
          <>
            Loved by <em>3,214</em> routines
          </>
        }
        average={4.9}
        count={3214}
        shares={[88, 9, 2, 1, 0]}
        writeAction={<a href="/reviews/new">Write a review</a>}
        reviews={[<p key="1">First review</p>, <p key="2">Second review</p>]}
        className="mt-4"
      />,
    );
    const region = screen.getByRole("region", {
      name: "Loved by 3,214 routines",
    });
    expect(region).toHaveClass("mt-4");
    expect(region).toHaveTextContent("Average rating 4.9");
    expect(screen.getByText("Based on")).toBeInTheDocument();
    expect(screen.getByText("First review")).toBeInTheDocument();
    // Mobile shows the first review only.
    expect(screen.getByText("Second review").parentElement).toHaveClass("hidden");
    expect(screen.getByRole("link", { name: "Write a review" })).toBeInTheDocument();
  });
});
