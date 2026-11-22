import { useEffect, useState, useTransition } from "react";

/**
 * Saves `value` as JSON shortly after it stops changing (admin content editors). Returns
 * "idle" until the first edit, "saving" while an edit waits or saves, then "saved". Pass a new
 * object on every edit (state updates do); use it in client components only.
 */
export function useAutosave<T>(value: T, save: (json: string) => void | Promise<void>, delay = 700): "idle" | "saving" | "saved" {
  const [initial] = useState(value);
  const [saved, setSaved] = useState<T>(value);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (value === initial) return;
    const timer = setTimeout(() => {
      startTransition(async () => {
        await save(JSON.stringify(value));
        setSaved(value);
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [value, initial, save, delay]);

  if (value === initial) return "idle";
  return value === saved ? "saved" : "saving";
}
