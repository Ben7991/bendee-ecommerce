import { render, screen } from "@testing-library/react";

import { ActionTile } from "./ActionTile";

describe("ActionTile", () => {
  it("is a link named by its title", () => {
    render(
      <ActionTile asChild icon="chat" description="Chat with us on WhatsApp" className="mt-4">
        <a href="/help">Get help</a>
      </ActionTile>,
    );
    const link = screen.getByRole("link", { name: /Get help/ });
    expect(link).toHaveAttribute("href", "/help");
    expect(link).toHaveClass("mt-4");
    expect(screen.getByText("Chat with us on WhatsApp")).toBeInTheDocument();
  });
});
