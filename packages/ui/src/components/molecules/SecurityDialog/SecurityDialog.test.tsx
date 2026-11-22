import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SecurityDialog, SecurityDialogFooter } from "./SecurityDialog";

describe("SecurityDialog", () => {
  it("opens from its trigger with a title, description and close button", async () => {
    render(
      <SecurityDialog trigger={<button type="button">Open</button>} icon="lock" title="Change your password" description="Last changed 12 Oct">
        <SecurityDialogFooter note="Small print">
          <button type="button">Save</button>
        </SecurityDialogFooter>
      </SecurityDialog>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog", { name: "Change your password" })).toBeInTheDocument();
    expect(screen.getByText("Small print")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
