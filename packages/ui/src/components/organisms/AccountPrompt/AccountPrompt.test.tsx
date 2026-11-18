import { render, screen } from "@testing-library/react";

import { AccountPrompt } from "./AccountPrompt";

describe("AccountPrompt", () => {
  it("renders the invitation and action", () => {
    render(<AccountPrompt title="Save your details" description="No password." action={<a href="/auth/sign-in">Create account</a>} className="mt-4" />);
    expect(screen.getByRole("region", { name: "Save your details" })).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "Create account" })).toBeInTheDocument();
  });
});
