import { render, screen } from "@testing-library/react";

import { Icon } from "../Icon";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("uses the label as its accessible name", () => {
    render(
      <IconButton label="Search">
        <Icon name="search" />
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute("type", "button");
  });

  it("renders a link with asChild", () => {
    render(
      <IconButton asChild label="Account">
        <a href="/account">
          <Icon name="user" />
        </a>
      </IconButton>,
    );
    expect(screen.getByRole("link", { name: "Account" })).toHaveAttribute("href", "/account");
  });
});
