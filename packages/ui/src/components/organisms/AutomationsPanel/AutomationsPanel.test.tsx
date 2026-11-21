import { render, screen } from "@testing-library/react";

import { AutomationsPanel } from "./AutomationsPanel";
import { samplePanel } from "./fixtures";

describe("AutomationsPanel", () => {
  it("links every flow to its editor and shows the funnel", () => {
    render(<AutomationsPanel {...samplePanel} className="mt-4" />);
    expect(screen.getByRole("region", { name: "Automations" })).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "Edit flow" })).toHaveAttribute("href", "/admin/marketing/abandoned-cart");
    expect(screen.getAllByRole("link", { name: /MoMo payment retry/ })[0]).toHaveAttribute("href", "/admin/marketing/payment-retry");
    expect(screen.getByText("Ordered · GHS 6,840")).toHaveClass("xl:hidden");
    expect(screen.getByRole("list", { name: "Coming soon" })).toHaveClass("hidden", "xl:flex");
  });
});
