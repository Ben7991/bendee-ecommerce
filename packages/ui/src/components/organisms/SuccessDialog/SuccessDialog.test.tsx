import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SuccessDialog } from "./SuccessDialog";

describe("SuccessDialog", () => {
  it("is a named dialog with its description, action and footer", () => {
    render(
      <SuccessDialog
        open
        onOpenChange={() => {}}
        title={
          <>
            Password <em>updated</em>
          </>
        }
        description="You can now sign in."
        action={<a href="/auth/sign-in/email">Continue to sign in</a>}
        footer={<a href="/help">Contact support</a>}
        className="mt-4"
      />,
    );
    const dialog = screen.getByRole("dialog", { name: "Password updated" });
    expect(dialog).toHaveAccessibleDescription("You can now sign in.");
    expect(dialog).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "Continue to sign in" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact support" })).toBeInTheDocument();
  });

  it("asks to close from the close button", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<SuccessDialog open onOpenChange={onOpenChange} title="Done" description="Saved." action={null} />);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders nothing while closed", () => {
    render(<SuccessDialog open={false} onOpenChange={() => {}} title="Done" description="Saved." action={null} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
