import { fireEvent, render, screen } from "@testing-library/react";

import { CollectionSeoCard } from "./CollectionSeoCard";

describe("CollectionSeoCard", () => {
  it("previews the result and edits it", () => {
    render(<CollectionSeoCard className="mt-4" domain="jofak.com" defaultValue={{ slug: "harmattan-glow", title: "Harmattan glow | Jofak", description: "Dry season picks" }} />);
    expect(screen.getByRole("region", { name: "Search preview" })).toHaveClass("mt-4");
    expect(screen.getByText("jofak.com › collections › harmattan-glow")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Edit SEO" }));
    fireEvent.change(screen.getByRole("textbox", { name: /Slug/ }), { target: { value: "Dry Season" } });
    expect(screen.getByText("jofak.com › collections › dry-season")).toBeInTheDocument();
  });
});
