import { render, screen } from "@testing-library/react";

import { ReviewCard } from "./ReviewCard";

describe("ReviewCard", () => {
  it("renders the quote, stars and author", () => {
    render(<ReviewCard review={{ quote: "Finally sleeping well.", author: "Amara O.", detail: "Verified buyer" }} />);
    expect(screen.getByText("“Finally sleeping well.”")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "5 out of 5 stars" })).toBeInTheDocument();
    expect(screen.getByText("Amara O.")).toBeInTheDocument();
  });
});
