import { render, screen } from "@testing-library/react";

import { AddTile } from "./AddTile";

describe("AddTile", () => {
  it("is a link with its title and line", () => {
    render(
      <AddTile asChild description="Home or work" className="mt-4">
        <a href="/account/addresses/new">Add a new address</a>
      </AddTile>,
    );
    const link = screen.getByRole("link", { name: /Add a new address/ });
    expect(link).toHaveAttribute("href", "/account/addresses/new");
    expect(link).toHaveClass("mt-4");
    expect(screen.getByText("Home or work")).toBeInTheDocument();
  });

  it("drops the second line at size sm", () => {
    render(<AddTile size="sm" href="#" description="Hidden">Subscribe to another product</AddTile>);
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });
});
