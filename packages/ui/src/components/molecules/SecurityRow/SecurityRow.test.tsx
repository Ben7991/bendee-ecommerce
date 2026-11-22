import { render, screen } from "@testing-library/react";

import { SecurityRow } from "./SecurityRow";

describe("SecurityRow", () => {
  it("shows the item, its state and actions", () => {
    render(<SecurityRow icon="shieldCheck" iconTone="sage" title="Authenticator app" badge="● On" description="Set up 2 Sep" compactDescription="2 Sep" actions={<button type="button">Move</button>} />);
    expect(screen.getByText("Authenticator app")).toBeInTheDocument();
    expect(screen.getByText("● On")).toBeInTheDocument();
    expect(screen.getByText("Set up 2 Sep")).toHaveClass("hidden");
    expect(screen.getByRole("button", { name: "Move" })).toBeInTheDocument();
  });
});
