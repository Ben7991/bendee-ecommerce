import { render, screen } from "@testing-library/react";

import { ReportCallout } from "./ReportCallout";

describe("ReportCallout", () => {
  it("shows the finding with a lime first action", () => {
    render(<ReportCallout eyebrow="Biggest leak" title="75% never add to cart" actions={[{ label: "View", href: "/v" }, { label: "More", href: "/m" }]} />);
    expect(screen.getByRole("heading", { name: "75% never add to cart" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View" })).toHaveClass("bg-accent");
    expect(screen.getByRole("link", { name: "More" })).toHaveClass("hidden", "md:flex");
  });
});
