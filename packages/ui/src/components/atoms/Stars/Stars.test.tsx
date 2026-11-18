import { render, screen } from "@testing-library/react";

import { Stars } from "./Stars";

describe("Stars", () => {
  it("announces the score", () => {
    render(<Stars value={4} />);
    expect(screen.getByRole("img", { name: "4 out of 5 stars" })).toBeInTheDocument();
  });
});
