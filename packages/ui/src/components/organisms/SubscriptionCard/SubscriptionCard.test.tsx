import { render, screen } from "@testing-library/react";

import { SubscriptionCard } from "./SubscriptionCard";

describe("SubscriptionCard", () => {
  it("shows the subscription, its settings and actions", () => {
    render(
      <SubscriptionCard
        className="mt-4"
        name="Ashwagandha Tablets"
        status={{ label: "Active", tone: "success" }}
        meta="Every 30 days"
        thumb={{ tint: "amber" }}
        price="GHS 304"
        settings={[{ label: "Pay with", value: "MTN MoMo •••• 7781", action: <a href="#pay">Change</a> }]}
        upcoming={[{ date: "Tue 25 Nov", detail: "MoMo prompt on 23 Nov", highlight: true }]}
        primaryAction={<button type="button">Skip next delivery</button>}
        cancel={<a href="#cancel">Cancel subscription</a>}
      />,
    );
    expect(screen.getByRole("article", { name: "Ashwagandha Tablets" })).toHaveClass("border-primary", "mt-4");
    expect(screen.getByText("MTN MoMo •••• 7781")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Change" })).toBeInTheDocument();
    expect(screen.getByText("Tue 25 Nov")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Skip next delivery" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cancel subscription" })).toBeInTheDocument();
  });

  it("collapses to one row when compact", () => {
    render(<SubscriptionCard variant="compact" name="Daily Greens" status={{ label: "Paused", tone: "warning" }} meta="Paused" thumb={{}} action={<button type="button">Resume now</button>} />);
    expect(screen.getByRole("article", { name: "Daily Greens" })).toHaveClass("border-border-subtle");
    expect(screen.getByRole("button", { name: "Resume now" })).toBeInTheDocument();
  });
});
