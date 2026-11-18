import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Notice } from "./Notice";

describe("Notice", () => {
  it("shows the message and hides when dismissed", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Notice title="Good news" onDismiss={onDismiss} className="mt-4">
        A price dropped.
      </Notice>,
    );
    expect(screen.getByRole("status")).toHaveClass("mt-4");
    expect(screen.getByText("A price dropped.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
