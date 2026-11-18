import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ThemeProvider, useTheme } from "./theme";
import { THEME_STORAGE_KEY, themeScript } from "./theme-script";

function Probe() {
  const { mode, resolvedTheme, setMode } = useTheme();
  return (
    <div>
      <p>
        {mode}/{resolvedTheme}
      </p>
      <button onClick={() => setMode("dark")}>dark</button>
      <button onClick={() => setMode("system")}>system</button>
    </div>
  );
}

function mockSystem(dark: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: dark && query.includes("dark"),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

describe("theme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    mockSystem(false);
  });

  it("follows the system by default", () => {
    mockSystem(true);
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByText("system/dark")).toBeInTheDocument();
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("stores an explicit choice and applies it to <html>", async () => {
    const onModeChange = vi.fn();
    render(
      <ThemeProvider onModeChange={onModeChange}>
        <Probe />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "dark" }));
    expect(screen.getByText("dark/dark")).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(onModeChange).toHaveBeenCalledWith("dark");

    await userEvent.click(screen.getByRole("button", { name: "system" }));
    expect(document.documentElement).not.toHaveAttribute("data-theme");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it("picks up the stored choice on load", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByText("light/light")).toBeInTheDocument();
  });

  it("follows changes made in another tab", () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    act(() => {
      localStorage.setItem(THEME_STORAGE_KEY, "dark");
      window.dispatchEvent(new StorageEvent("storage", { key: THEME_STORAGE_KEY, newValue: "dark" }));
    });
    expect(screen.getByText("dark/dark")).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("ships a head script that applies the stored mode before paint", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    new Function(themeScript)();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("throws a helpful error outside the provider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow("useTheme must be used inside <ThemeProvider>.");
  });
});
