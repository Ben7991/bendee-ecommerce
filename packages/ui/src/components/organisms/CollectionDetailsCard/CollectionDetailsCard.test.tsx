import { fireEvent, render, screen } from "@testing-library/react";

import { CollectionDetailsCard } from "./CollectionDetailsCard";

describe("CollectionDetailsCard", () => {
  it("edits name, deal and description, and can remove the banner", () => {
    const { container } = render(
      <CollectionDetailsCard className="mt-4" defaultValue={{ name: "Harmattan glow", deal: "Up to 20% off", description: "Dry season" }} banner={<span>Banner</span>} />,
    );
    expect(screen.getByRole("region", { name: "Details" })).toHaveClass("mt-4");
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("Harmattan glow");
    expect(screen.getByRole("textbox", { name: "Deal label" })).toHaveValue("Up to 20% off");
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(container.querySelector('input[name="removeBanner"]')).toHaveValue("on");
    expect(screen.getByRole("button", { name: "Upload" })).toBeInTheDocument();
  });
});
