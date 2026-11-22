import { render, screen } from "@testing-library/react";

import { CHANNELS } from "./data";
import { NotificationChannels } from "./NotificationChannels";

describe("NotificationChannels", () => {
  it("lists each channel with its status", () => {
    render(<NotificationChannels channels={CHANNELS} />);
    expect(screen.getByText("SMS · Arkesel")).toBeInTheDocument();
    expect(screen.getByText("GHS 412.60 · ~13,700 SMS")).toBeInTheDocument();
    expect(screen.getAllByText("Coming soon").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Connected").length).toBe(4);
  });
});
