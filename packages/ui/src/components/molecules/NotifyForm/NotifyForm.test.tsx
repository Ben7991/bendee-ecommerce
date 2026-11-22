import { render, screen } from "@testing-library/react";

import { NotifyForm } from "./NotifyForm";

describe("NotifyForm", () => {
  it("labels the phone field and doesn't submit without an action", () => {
    render(<NotifyForm className="mt-4" />);
    const input = screen.getByRole("textbox", { name: "Get a text when we're back" });
    expect(input).toHaveAttribute("type", "tel");
    expect(screen.getByRole("button", { name: "Notify me" })).toHaveAttribute("type", "button");
  });

  it("posts when given an action", () => {
    render(<NotifyForm action="/api/notify" />);
    expect(screen.getByRole("button", { name: "Notify me" })).toHaveAttribute("type", "submit");
    expect(screen.getByRole("button").closest("form")).toHaveAttribute("method", "post");
  });
});
