import { render, screen } from "@testing-library/react";

import { HelpCallout } from "./HelpCallout";

describe("HelpCallout", () => {
  it("renders the title, copy and action", () => {
    render(
      <HelpCallout title="Still need help?" description="Message us on WhatsApp." action={<a href="/wa">Chat</a>} className="mt-4" />,
    );
    const aside = screen.getByRole("complementary");
    expect(aside).toHaveClass("mt-4");
    expect(aside).toHaveClass("bg-surface-subtle");
    expect(screen.getByText("Message us on WhatsApp.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Chat" })).toHaveAttribute("href", "/wa");
  });

  it("uses the evergreen panel for the feature tone", () => {
    render(<HelpCallout tone="feature" title="Not sure where to start?" />);
    expect(screen.getByRole("complementary")).toHaveClass("bg-feature");
    expect(screen.getByText("Not sure where to start?")).toHaveClass("text-text-inverse");
  });
});
