import { render, screen } from "@testing-library/react";

import { PasswordStrength } from "./PasswordStrength";

describe("PasswordStrength", () => {
  it("exposes the score as a meter and lists the checks", () => {
    render(
      <PasswordStrength
        score={3}
        label="Strong"
        checks={[
          { label: "8+ characters", met: true },
          { label: "Not found in known data leaks", met: false },
        ]}
      />,
    );
    const meter = screen.getByRole("meter", { name: "Password strength" });
    expect(meter).toHaveAttribute("aria-valuenow", "3");
    expect(meter).toHaveAttribute("aria-valuetext", "Strong");
    expect(screen.getByText("(done)", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("(not yet)", { exact: false })).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(<PasswordStrength score={0} className="mt-4" />);
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
