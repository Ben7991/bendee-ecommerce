import { render, screen } from "@testing-library/react";

import { NumberedPoints } from "./NumberedPoints";

describe("NumberedPoints", () => {
  it("renders an ordered list with padded numbers", () => {
    render(
      <NumberedPoints
        className="mt-4"
        items={[
          { title: "Genuine", text: "Straight from the brand." },
          { title: "Stored cool", text: "Air-conditioned." },
        ]}
      />,
    );
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(list).toHaveClass("mt-4");
    expect(screen.getByText("02")).toHaveAttribute("aria-hidden");
    expect(screen.getByText("Stored cool")).toBeInTheDocument();
  });
});
