import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "./Input";

describe("Input", () => {
  it("accepts typing", async () => {
    render(<Input aria-label="Email" type="email" />);
    const field = screen.getByRole("textbox", { name: "Email" });
    await userEvent.type(field, "ama@example.com");
    expect(field).toHaveValue("ama@example.com");
  });
});
