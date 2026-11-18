import { render, screen } from "@testing-library/react";

import { Text } from "./Text";

describe("Text", () => {
  it("renders a paragraph with the chosen styles", () => {
    render(
      <Text size="xs" tone="muted" align="center" className="mt-4">
        Legal
      </Text>,
    );
    const text = screen.getByText("Legal");
    expect(text.tagName).toBe("P");
    expect(text).toHaveClass("text-xs", "text-text-muted", "text-center", "mt-4");
  });
});
