import { render, screen } from "@testing-library/react";

import { sampleMessages } from "./fixtures";
import { RecentMessages } from "./RecentMessages";

describe("RecentMessages", () => {
  it("shows each message with its outcome and limits the mobile list", () => {
    render(<RecentMessages messages={sampleMessages} viewAll={{ href: "/all" }} mobileLimit={2} className="mt-4" />);
    expect(screen.getByRole("region", { name: "Recent messages" })).toHaveClass("mt-4");
    expect(screen.getByText("Ordered · JFK-251502")).toHaveClass("text-brand");
    expect(screen.getByText("Stopped · out of stock")).toHaveClass("text-text-secondary");
    expect(screen.getAllByText("Akua Sarpong")).toHaveLength(2);
    expect(screen.getAllByText("Abena Owusu")).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "View all" })[0]).toHaveAttribute("href", "/all");
  });

  it("shows an empty message", () => {
    render(<RecentMessages messages={[]} emptyMessage="Nothing sent" />);
    expect(screen.getAllByText("Nothing sent")).toHaveLength(2);
  });
});
