import { render, screen } from "@testing-library/react";

import { CustomerReview } from "./CustomerReview";

describe("CustomerReview", () => {
  it("renders the review with its rating and helpful count", () => {
    render(
      <CustomerReview
        className="mt-4"
        review={{
          author: "Kwame A.",
          verified: true,
          meta: "Accra",
          rating: 4,
          title: "Great",
          body: "Tastes good.",
          helpfulCount: 42,
        }}
        photos={[<span key="p">Photo</span>]}
      />,
    );
    expect(screen.getByRole("article")).toHaveClass("mt-4");
    expect(screen.getByRole("heading", { name: "Great" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "4 out of 5 stars" })).toBeInTheDocument();
    expect(screen.getByText("✓ Verified purchase")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Yes (42)" })).toBeInTheDocument();
    expect(screen.getByText("Photo")).toBeInTheDocument();
  });
});
