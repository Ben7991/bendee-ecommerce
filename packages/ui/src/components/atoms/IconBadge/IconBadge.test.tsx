import { render } from "@testing-library/react";

import { IconBadge } from "./IconBadge";

describe("IconBadge", () => {
  it("renders the icon, hidden from assistive tech", () => {
    const { container } = render(<IconBadge icon="lock" className="mt-4" />);
    const badge = container.querySelector('[data-slot="icon-badge"]');
    expect(badge).toHaveAttribute("aria-hidden", "true");
    expect(badge).toHaveClass("size-16", "mt-4");
    expect(badge?.querySelector('[data-icon="lock"]')).not.toBeNull();
  });
});
