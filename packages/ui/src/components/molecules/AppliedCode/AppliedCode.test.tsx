import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AppliedCode } from "./AppliedCode";

describe("AppliedCode", () => {
  it("shows the code and removes it", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const { container } = render(<AppliedCode code="JOFAK10" description="10% off order" onRemove={onRemove} className="mt-4" />);
    expect(screen.getByText("JOFAK10")).toBeInTheDocument();
    expect(screen.getByText("Code applied — one code per order")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Remove code JOFAK10" }));
    expect(onRemove).toHaveBeenCalledOnce();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
