import { useCallback, useRef, useState, type DragEvent, type KeyboardEvent } from "react";

/**
 * Drag-to-reorder for admin lists (home page blocks, menu items, footer links), on native HTML
 * drag and drop. Spread `item(id)` on each row and `handle(id)` on its grip: the list reorders as
 * you drag over rows and calls `onCommit` once on drop. Alt + ↑/↓ on a focused grip moves a row
 * for keyboard users. Use it in client components only.
 */
export function useDragSort<T>(items: T[], keyOf: (item: T) => string, onCommit: (items: T[]) => void) {
  const [order, setOrder] = useState<T[] | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const latest = useRef<T[]>(items);
  const list = order ?? items;

  const move = useCallback(
    (from: string, to: number) => {
      const current = [...(order ?? items)];
      const index = current.findIndex((item) => keyOf(item) === from);
      if (index < 0 || to < 0 || to >= current.length || index === to) return current;
      const [moved] = current.splice(index, 1);
      current.splice(to, 0, moved!);
      latest.current = current;
      setOrder(current);
      return current;
    },
    [items, order, keyOf],
  );

  const item = (id: string) => ({
    "data-dragging": dragging === id ? "" : undefined,
    onDragOver: (event: DragEvent) => {
      if (!dragging) return;
      event.preventDefault();
      if (dragging !== id) move(dragging, list.findIndex((entry) => keyOf(entry) === id));
    },
    onDrop: (event: DragEvent) => event.preventDefault(),
  });

  const handle = (id: string) => ({
    draggable: true,
    onDragStart: (event: DragEvent) => {
      latest.current = list;
      setDragging(id);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", id);
    },
    onDragEnd: () => {
      setDragging(null);
      onCommit(latest.current);
      setOrder(null);
    },
    onKeyDown: (event: KeyboardEvent) => {
      if (!event.altKey || (event.key !== "ArrowUp" && event.key !== "ArrowDown")) return;
      event.preventDefault();
      const index = list.findIndex((entry) => keyOf(entry) === id);
      const next = move(id, index + (event.key === "ArrowUp" ? -1 : 1));
      onCommit(next);
      setOrder(null);
    },
  });

  return { list, item, handle, dragging };
}
