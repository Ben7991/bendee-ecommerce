import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { OtpField } from "./OtpField";

describe("OtpField", () => {
  it("moves forward as you type and reports completion", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<OtpField length={4} onComplete={onComplete} />);
    const group = screen.getByRole("group", { name: "Verification code" });
    const boxes = screen.getAllByRole("textbox");
    expect(group).toBeInTheDocument();

    await user.click(boxes[0]!);
    await user.keyboard("12");
    expect(boxes[0]).toHaveValue("1");
    expect(boxes[1]).toHaveValue("2");
    expect(boxes[2]).toHaveFocus();
    await user.keyboard("34");
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("fills every box from a paste and steps back with Backspace", async () => {
    const user = userEvent.setup();
    render(<OtpField length={6} name="code" />);
    const boxes = screen.getAllByRole("textbox");
    await user.click(boxes[0]!);
    await user.paste("48 20 19");
    expect(boxes.map((box) => (box as HTMLInputElement).value).join("")).toBe("482019");

    await user.keyboard("{Backspace}{Backspace}");
    expect(boxes.map((box) => (box as HTMLInputElement).value).join("")).toBe("4820");
    expect(document.querySelector('input[type="hidden"][name="code"]')).toHaveValue("4820");
  });

  it("marks filled boxes and applies className", () => {
    render(<OtpField defaultValue="48" className="mt-4" />);
    const boxes = screen.getAllByRole("textbox");
    expect(boxes[0]).toHaveAttribute("data-filled");
    expect(boxes[2]).not.toHaveAttribute("data-filled");
    expect(screen.getByRole("group")).toHaveClass("mt-4");
  });
});
