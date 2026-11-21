import { act, fireEvent, render, screen } from "@testing-library/react";

import { sampleBlocks } from "./fixtures";
import { HomePageBuilder } from "./HomePageBuilder";

const props = {
  blocks: sampleBlocks,
  selectedId: "hero",
  blockHref: (id: string) => `?block=${id}`,
  collections: ["Harmattan glow", "New arrivals", "December gifting"],
  onReorder: vi.fn(),
};

describe("HomePageBuilder", () => {
  it("lists blocks with their state and links each to its editor", () => {
    render(<HomePageBuilder {...props} onSave={vi.fn()} />);
    expect(screen.getByRole("link", { name: "Why Jofak bar" })).toHaveAttribute("href", "?block=why");
    expect(screen.getByText("Unpublished")).toHaveClass("text-warning-text");
    expect(screen.getByText("Required")).toHaveClass("text-error");
  });

  it("previews edits live and saves the draft after a pause", async () => {
    vi.useFakeTimers();
    const onSave = vi.fn();
    render(<HomePageBuilder {...props} onSave={onSave} />);
    fireEvent.change(screen.getByRole("textbox", { name: "Headline" }), { target: { value: "Harmattan ready" } });
    expect(screen.getAllByText("Harmattan ready").length).toBeGreaterThan(0);
    await act(async () => vi.advanceTimersByTime(800));
    expect(JSON.parse(onSave.mock.calls[0]![0]).slides[0].headline).toBe("Harmattan ready");
    vi.useRealTimers();
  });

  it("switches slides and shows scheduled ones", () => {
    render(<HomePageBuilder {...props} onSave={vi.fn()} />);
    expect(screen.getByText(/Scheduled · shows from/)).toHaveClass("text-info");
    fireEvent.click(screen.getByRole("button", { name: /20% off Greens Daily/ }));
    expect(screen.getByRole("textbox", { name: "Headline" })).toHaveValue("20% off Greens Daily");
  });
});
