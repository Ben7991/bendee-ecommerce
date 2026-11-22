import { render, screen } from "@testing-library/react";

import { LoadMore } from "./LoadMore";

describe("LoadMore", () => {
  it("says how many are shown and renders the action", () => {
    render(<LoadMore shown={24} total={41} action={<button type="button">Load more</button>} className="mt-4" />);
    expect(screen.getByText(/of 41 products/)).toHaveTextContent("You've seen 24 of 41 products");
    expect(screen.getByRole("progressbar", { name: "24 of 41 products shown" })).toHaveAttribute("aria-valuenow", "59");
    expect(screen.getByRole("button", { name: "Load more" })).toBeInTheDocument();
  });
});
