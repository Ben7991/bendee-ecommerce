import { act, fireEvent, render, screen } from "@testing-library/react";

import { headerProps, sampleFooter } from "./fixtures";
import { MenuEditor } from "./MenuEditor";

describe("MenuEditor", () => {
  it("shows badges and what an edited label was", () => {
    render(<MenuEditor {...headerProps} onSave={vi.fn()} />);
    expect(screen.getByText("Category tree · auto")).toHaveClass("text-lavender-text");
    expect(screen.getByText("Phone menu only")).toBeInTheDocument();
    expect(screen.getAllByText("Was “Shop collections”").length).toBeGreaterThan(0);
  });

  it("edits the picked item and saves the draft", async () => {
    vi.useFakeTimers();
    const onSave = vi.fn();
    render(<MenuEditor {...headerProps} onSave={onSave} />);
    fireEvent.click(screen.getByRole("button", { name: "Brands" }));
    fireEvent.change(screen.getAllByRole("textbox", { name: "Label" })[0]!, { target: { value: "Our brands" } });
    await act(async () => vi.advanceTimersByTime(800));
    const saved = JSON.parse(onSave.mock.calls.at(-1)![0]);
    expect(saved.items.find((item: { id: string }) => item.id === "brands").label).toBe("Our brands");
    vi.useRealTimers();
  });

  it("moves a footer link to another column", async () => {
    vi.useFakeTimers();
    const onSave = vi.fn();
    render(<MenuEditor defaultValue={sampleFooter} published={{}} targets={headerProps.targets} selectedId="returns" onSave={onSave} />);
    fireEvent.click(screen.getAllByRole("radio", { name: "Shop" })[0]!);
    await act(async () => vi.advanceTimersByTime(800));
    const saved = JSON.parse(onSave.mock.calls.at(-1)![0]);
    expect(saved.columns[0].links.map((link: { id: string }) => link.id)).toEqual(["all", "returns"]);
    vi.useRealTimers();
  });
});
