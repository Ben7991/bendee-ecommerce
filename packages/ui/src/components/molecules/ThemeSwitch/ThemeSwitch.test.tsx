import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ThemeProvider } from "../../../lib";
import { ThemeSwitch } from "./ThemeSwitch";

describe("ThemeSwitch", () => {
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

  it("starts on System and switches the page theme", async () => {
    render(
      <ThemeProvider>
        <ThemeSwitch />
      </ThemeProvider>,
    );
    const group = screen.getByRole("radiogroup", { name: "Theme" });
    expect(group).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "System" })).toHaveAttribute("data-state", "on");

    await userEvent.click(screen.getByRole("radio", { name: "Dark" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(screen.getByRole("radio", { name: "Dark" })).toHaveAttribute("data-state", "on");
  });

  it("shows every label in the field tone", () => {
    render(
      <ThemeProvider>
        <ThemeSwitch tone="field" label="Appearance" />
      </ThemeProvider>,
    );
    expect(screen.getByRole("radiogroup", { name: "Appearance" })).toBeInTheDocument();
    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.getByText("Dark")).toBeInTheDocument();
  });
});
