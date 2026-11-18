import { render, screen } from "@testing-library/react";

import { PageHeading } from "./PageHeading";

describe("PageHeading", () => {
  it("renders the title, description and action", () => {
    const { container } = render(
      <PageHeading title="Your cart" description="4 items" action={<a href="/shop">Continue shopping</a>} className="mt-4" />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Your cart" })).toBeInTheDocument();
    expect(screen.getByText("4 items")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Continue shopping" })).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
