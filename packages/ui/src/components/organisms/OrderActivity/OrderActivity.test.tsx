import { fireEvent, render, screen, within } from "@testing-library/react";

import { OrderActivity, type ActivityEvent } from "./OrderActivity";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const events: ActivityEvent[] = [
  { id: "1", title: "Abena Mensah", detail: "added a note", time: "08:12", author: "Abena Mensah", note: "Called Ama." },
  { id: "2", title: "Processing started", detail: "by Abena Mensah", time: "08:05", tone: "warning" },
  { id: "3", title: "Order placed", time: "07:58", tone: "brand" },
];

describe("OrderActivity", () => {
  it("posts notes with the order and shows the history", () => {
    const { container } = render(<OrderActivity className="mt-4" events={events} action="/notes" fields={{ order: "JFK-1" }} />);
    expect(screen.getByRole("region", { name: "Activity" })).toHaveClass("mt-4");
    const note = screen.getByRole("textbox", { name: "Note for the team" });
    const submit = within(note.closest("form")!).getByRole("button", { name: "Add note" });
    expect(submit).toBeDisabled();
    fireEvent.change(note, { target: { value: "Packed early" } });
    expect(submit).toBeEnabled();
    expect(container.querySelector('input[type=hidden][name=order]')).toHaveValue("JFK-1");
    expect(screen.getByRole("switch", { name: "Show to customer" })).toBeInTheDocument();
    expect(screen.getAllByText("Called Ama.").length).toBeGreaterThan(0);
  });

  it("expands the history on mobile", () => {
    render(<OrderActivity events={events} />);
    fireEvent.click(screen.getByRole("button", { name: "Show all 3 events" }));
    expect(screen.getByRole("button", { name: "Show fewer" })).toHaveAttribute("aria-expanded", "true");
  });
});
