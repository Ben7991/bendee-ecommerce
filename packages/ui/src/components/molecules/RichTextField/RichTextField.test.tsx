import { fireEvent, render, screen } from "@testing-library/react";

import { RichTextField } from "./RichTextField";

describe("RichTextField", () => {
  it("edits HTML and keeps it in a hidden input", () => {
    const onValueChange = vi.fn();
    const { container } = render(<RichTextField className="mt-4" name="description" label="Description" defaultValue="<p>Hello</p>" onValueChange={onValueChange} />);
    const box = screen.getByRole("textbox", { name: "Description" });
    expect(box).toHaveAttribute("contenteditable", "true");
    expect(box.innerHTML).toBe("<p>Hello</p>");
    expect(screen.getByRole("toolbar", { name: "Description formatting" })).toBeInTheDocument();
    box.innerHTML = "<p>Hello there</p>";
    fireEvent.input(box);
    expect(onValueChange).toHaveBeenCalledWith("<p>Hello there</p>");
    expect(container.querySelector('input[name="description"]')).toHaveValue("<p>Hello there</p>");
    expect(container.firstElementChild).toHaveClass("mt-4");
  });
});
