import type { Meta, StoryObj } from "@storybook/react-vite";

const semantic = [
  "bg",
  "surface",
  "surface-subtle",
  "border",
  "border-subtle",
  "text",
  "text-secondary",
  "text-muted",
  "primary",
  "primary-hover",
  "on-primary",
  "brand",
  "accent",
  "on-accent",
  "success",
  "warning",
  "error",
  "info",
] as const;

function Swatches() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--spacing-4)",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      }}
    >
      {semantic.map((name) => (
        <div key={name}>
          <div
            style={{
              height: 64,
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-border-subtle)",
              background: `var(--color-${name})`,
            }}
          />
          <div
            style={{
              marginTop: "var(--spacing-2)",
              fontSize: "var(--text-sm)",
            }}
          >
            <code>--color-{name}</code>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Semantic colour tokens from `@repo/ui/styles.css`. Switch the **Theme** toolbar
 * (Light / Dark / System) to see each token resolve to its `--color-dark-*` twin.
 */
const meta = {
  title: "Foundations/Colors",
  component: Swatches,
} satisfies Meta<typeof Swatches>;

export default meta;

export const Semantic: StoryObj<typeof meta> = {};
