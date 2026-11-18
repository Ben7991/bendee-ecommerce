import { render, screen } from "@testing-library/react";

import { RatingHistogram } from "./RatingHistogram";

describe("RatingHistogram", () => {
  it("lists each star level with its share", () => {
    render(<RatingHistogram shares={[88, 9, 2, 1, 0]} className="mt-4" />);
    const terms = screen.getAllByRole("term").map((term) => term.textContent);
    expect(terms).toEqual(["5 ★ stars", "4 ★ stars", "3 ★ stars", "2 ★ stars", "1 ★ stars"]);
    expect(screen.getAllByRole("definition")[0]).toHaveTextContent("88%");
    expect(screen.getByText("88%").closest("[data-slot=rating-histogram]")).toHaveClass("mt-4");
  });
});
