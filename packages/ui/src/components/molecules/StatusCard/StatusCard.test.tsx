import { render, screen } from "@testing-library/react";

import { StatusCard } from "./StatusCard";

describe("StatusCard", () => {
  it("shows the expected time and progress", () => {
    const { container } = render(
      <StatusCard
        value="6:00 AM GMT · Sat 15 Nov"
        remaining={{ full: "about 2h 15m left", short: "~2h 15m" }}
        progress={45}
        started="Started 2:00 AM"
        updated={{ full: "Last updated 3:45 AM", short: "updated 3:45 AM" }}
        className="mt-4"
      />,
    );
    expect(screen.getByText("6:00 AM GMT · Sat 15 Nov")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Maintenance progress" })).toHaveAttribute("aria-valuenow", "45");
    expect(screen.getByText("about 2h 15m left")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
