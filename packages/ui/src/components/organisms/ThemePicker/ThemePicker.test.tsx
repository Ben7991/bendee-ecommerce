import { fireEvent, render, screen } from "@testing-library/react";

import { ThemeProvider } from "../../../lib";
import { ThemePicker } from "./ThemePicker";

describe("ThemePicker", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  it("shows the three modes and switches the theme", () => {
    const onModeChange = vi.fn();
    render(
      <ThemeProvider>
        <ThemePicker className="mt-4" onModeChange={onModeChange} />
      </ThemeProvider>,
    );
    expect(screen.getByRole("region", { name: "Appearance" })).toHaveClass("mt-4");
    const dark = screen.getByRole("radio", { name: /Dark/ });
    fireEvent.click(dark);
    expect(dark).toBeChecked();
    expect(onModeChange).toHaveBeenCalledWith("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });
});
