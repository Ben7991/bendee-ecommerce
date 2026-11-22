import { render, screen } from "@testing-library/react";

import { MESSAGES } from "./data";
import { MessageMatrix } from "./MessageMatrix";

describe("MessageMatrix", () => {
  it("shows a switch per channel, with login codes always on", () => {
    render(<MessageMatrix messages={MESSAGES} />);
    expect(screen.getByRole("switch", { name: "Login code by SMS" })).toBeDisabled();
    expect(screen.getByRole("switch", { name: "Order confirmed by email" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("switch", { name: "Handed to courier by email" })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("link", { name: "Edit Handed to courier template" })).toHaveAttribute("href", "/t/courier");
  });
});
