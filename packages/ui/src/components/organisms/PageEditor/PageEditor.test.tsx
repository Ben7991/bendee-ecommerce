import { act, fireEvent, render, screen } from "@testing-library/react";

import { samplePageEditor } from "./fixtures";
import { PageEditor } from "./PageEditor";

describe("PageEditor", () => {
  it("lists pages with drafts and shows the body", () => {
    render(<PageEditor {...samplePageEditor} onSave={vi.fn()} />);
    expect(screen.getByText("Draft changes")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Returns/ })[0]).toHaveAttribute("href", "/admin/content/pages/returns");
    expect(screen.getByRole("textbox", { name: "Page body" })).toHaveTextContent("How fast will my order arrive?");
  });

  it("updates the search preview and saves the draft", async () => {
    vi.useFakeTimers();
    const onSave = vi.fn();
    render(<PageEditor {...samplePageEditor} onSave={onSave} />);
    fireEvent.change(screen.getByRole("textbox", { name: "Web address" }), { target: { value: "Shipping info" } });
    expect(screen.getByText("jofak.com › pages › shipping-info")).toBeInTheDocument();
    await act(async () => vi.advanceTimersByTime(800));
    expect(JSON.parse(onSave.mock.calls[0]![0]).address).toBe("shipping-info");
    vi.useRealTimers();
  });
});
