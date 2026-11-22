import { act, fireEvent, render, screen } from "@testing-library/react";

import { ProductEditorForm } from "./ProductEditorForm";

describe("ProductEditorForm", () => {
  it("shows the save bar once something changes and discards back", async () => {
    vi.useFakeTimers();
    render(
      <ProductEditorForm className="mt-4" aria-label="Edit product">
        <input name="name" defaultValue="Energy" aria-label="Name" />
      </ProductEditorForm>,
    );
    expect(screen.getByRole("form", { name: "Edit product" })).toHaveClass("mt-4");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    fireEvent.input(screen.getByRole("textbox", { name: "Name" }), { target: { value: "Energy Plus" } });
    await act(async () => vi.runAllTimers());
    expect(screen.getByRole("status")).toHaveTextContent("1 unsaved change");
    fireEvent.click(screen.getByRole("button", { name: "Discard" }));
    await act(async () => vi.runAllTimers());
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("Energy");
    vi.useRealTimers();
  });

  it("shows a secondary action instead of Discard in the light bar", () => {
    render(
      <ProductEditorForm variant="light" aria-label="Edit discount" secondaryAction={<button type="submit" name="intent" value="pause">Pause</button>}>
        <input name="code" defaultValue="GREENS20" aria-label="Code" />
      </ProductEditorForm>,
    );
    expect(screen.getByRole("button", { name: "Pause" })).toHaveAttribute("value", "pause");
    expect(screen.queryByRole("button", { name: "Discard" })).not.toBeInTheDocument();
  });
});
