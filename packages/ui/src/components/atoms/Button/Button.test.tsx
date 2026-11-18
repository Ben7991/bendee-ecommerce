import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "./Button";

describe("Button", () => {
  it("is a non-submitting button by default", () => {
    render(<Button>Add</Button>);
    expect(screen.getByRole("button", { name: "Add" })).toHaveAttribute("type", "button");
  });

  it("calls onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Add</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("adds the arrow badge without changing the accessible name", () => {
    render(<Button arrow>Shop Bestsellers</Button>);
    const button = screen.getByRole("button", { name: "Shop Bestsellers" });
    expect(button.querySelector('[data-slot="button-arrow"]')).not.toBeNull();
  });

  it("renders a link with asChild and keeps the arrow inside it", () => {
    render(
      <Button asChild arrow variant="accent">
        <a href="/quiz">Start the Free Quiz</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Start the Free Quiz" });
    expect(link).not.toHaveAttribute("type");
    expect(link.querySelector('[data-slot="button-arrow"]')).not.toBeNull();
  });

  it("applies a consumer className last", () => {
    render(<Button className="w-full">Join</Button>);
    expect(screen.getByRole("button", { name: "Join" })).toHaveClass("w-full");
  });
});
