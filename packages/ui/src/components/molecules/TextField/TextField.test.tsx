import { render, screen } from "@testing-library/react";

import { TextField } from "./TextField";

describe("TextField", () => {
  it("labels the input and links the hint", () => {
    render(<TextField label="Email" type="email" hint="We'll send a link" />);
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAccessibleDescription("We'll send a link");
  });

  it("renders the label action and applies className to the wrapper", () => {
    const { container } = render(
      <TextField label="Password" labelAction={<a href="/forgot">Forgot password?</a>} className="mt-4" />,
    );
    expect(screen.getByRole("link", { name: "Forgot password?" })).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
