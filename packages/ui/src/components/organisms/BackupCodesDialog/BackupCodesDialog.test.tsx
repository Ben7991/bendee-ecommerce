import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BackupCodesDialog } from "./BackupCodesDialog";

describe("BackupCodesDialog", () => {
  it("lists the codes and unlocks Done once they're saved", async () => {
    const onOpenChange = vi.fn();
    render(<BackupCodesDialog open onOpenChange={onOpenChange} codes={["AAAA-1111", "BBBB-2222"]} note="Made just now" />);
    expect(screen.getByText("AAAA-1111")).toBeInTheDocument();
    const done = screen.getByRole("button", { name: "Done" });
    expect(done).toBeDisabled();
    await userEvent.click(screen.getByRole("checkbox", { name: /saved these codes/ }));
    await userEvent.click(done);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
