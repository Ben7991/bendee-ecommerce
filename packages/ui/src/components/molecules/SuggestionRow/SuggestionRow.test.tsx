import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SuggestionRow } from "./SuggestionRow";

describe("SuggestionRow", () => {
  it("links the product and adds it", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const { container } = render(<SuggestionRow name="Energy Capsules" href="/p/energy" meta="★ 4.9 · GHS 320" onAdd={onAdd} className="mt-4" />);
    expect(screen.getByRole("link", { name: "Energy Capsules" })).toHaveAttribute("href", "/p/energy");
    await user.click(screen.getByRole("button", { name: "Add Energy Capsules to bag" }));
    expect(onAdd).toHaveBeenCalledOnce();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
