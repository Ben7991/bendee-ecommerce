import { render, screen } from "@testing-library/react";

import { CollectionFeature } from "./CollectionFeature";

describe("CollectionFeature", () => {
  it("names the featured collection with its stats and Edit", () => {
    render(<CollectionFeature className="mt-4" title="Harmattan glow" description="Up to 20% off" stats={[{ label: "Ends", value: "15 Dec" }]} editHref="/edit" />);
    expect(screen.getByRole("region", { name: "Featured on the hub: Harmattan glow" })).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "Harmattan glow" })).toHaveAttribute("href", "/edit");
    expect(screen.getByRole("link", { name: "Edit Harmattan glow" })).toHaveAttribute("href", "/edit");
    expect(screen.getByText("15 Dec")).toBeInTheDocument();
  });
});
