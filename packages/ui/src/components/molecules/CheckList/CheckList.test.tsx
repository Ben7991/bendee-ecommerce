import { render, screen } from "@testing-library/react";

import { CheckList } from "./CheckList";

describe("CheckList", () => {
  it("renders each item as a list item", () => {
    render(<CheckList items={["Third-party tested", "No synthetic fillers"]} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
