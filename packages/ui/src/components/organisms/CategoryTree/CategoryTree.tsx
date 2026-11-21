"use client";

import { useMemo, useState, type ComponentProps, type DragEvent } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

export interface CategoryNode {
  id: string;
  name: string;
  /** Products in this category. */
  count: number;
  /** Not shown in the store menu. */
  hidden?: boolean;
  children?: CategoryNode[];
}

interface Row {
  node: CategoryNode;
  depth: number;
  parentId: string | null;
}

const MAX_DEPTH = 3;

/** Visible rows in order: children only under expanded parents (or all, while searching). */
function flatten(nodes: CategoryNode[], expanded: Set<string>, matches: Set<string> | null, depth = 1, parentId: string | null = null): Row[] {
  return nodes.flatMap((node) => {
    if (matches && !matches.has(node.id)) return [];
    const open = matches ? true : expanded.has(node.id);
    const children = node.children && open ? flatten(node.children, expanded, matches, depth + 1, node.id) : [];
    return [{ node, depth, parentId }, ...children];
  });
}

/** Ids of nodes whose name matches, plus their ancestors. */
function search(nodes: CategoryNode[], query: string): Set<string> {
  const found = new Set<string>();
  const walk = (node: CategoryNode): boolean => {
    const childHit = (node.children ?? []).map(walk).some(Boolean);
    const hit = node.name.toLowerCase().includes(query) || childHit;
    if (hit) found.add(node.id);
    return hit;
  };
  nodes.forEach(walk);
  return found;
}

/** Moves `id` before `targetId` among the same parent's children. */
function reorder(nodes: CategoryNode[], parentId: string | null, id: string, targetId: string): CategoryNode[] {
  const move = (list: CategoryNode[]) => {
    const from = list.findIndex((node) => node.id === id);
    const to = list.findIndex((node) => node.id === targetId);
    if (from < 0 || to < 0 || from === to) return list;
    const next = [...list];
    const [moved] = next.splice(from, 1);
    next.splice(next.findIndex((node) => node.id === targetId), 0, moved!);
    return next;
  };
  if (parentId === null) return move(nodes);
  return nodes.map((node) =>
    node.id === parentId ? { ...node, children: move(node.children ?? []) } : { ...node, children: node.children && reorder(node.children, parentId, id, targetId) },
  );
}

/**
 * CategoryTree (organism): the storefront's shop-by-need tree, up to three levels (Paper Jofak -
 * Admin → Categories). Expand and collapse, find by name, and drag a row by its handle above a
 * sibling to reorder (mouse; `onReorder` gets the parent and the new order). The selected
 * category shows "Editing"; names link to `hrefFor(id)`. Compact rows on mobile.
 */
export interface CategoryTreeProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  nodes: CategoryNode[];
  selectedId?: string;
  hrefFor: (id: string) => string;
  defaultExpanded?: string[];
  onReorder?: (parentId: string | null, orderedIds: string[]) => void;
  /** "Add top-level category". */
  newHref?: string;
  /** Under the tree: "order here is the order in the store menu". */
  footnote?: string;
  "aria-label"?: string;
}

export function CategoryTree({
  linkAs: LinkAs = "a",
  nodes: initial,
  selectedId,
  hrefFor,
  defaultExpanded = [],
  onReorder,
  newHref,
  footnote = "order here is the order in the store menu",
  "aria-label": ariaLabel = "Categories",
  className,
  ...props
}: CategoryTreeProps) {
  const [nodes, setNodes] = useState(initial);
  const [expanded, setExpanded] = useState(() => new Set(defaultExpanded));
  const [query, setQuery] = useState("");
  const [dragging, setDragging] = useState<Row | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);

  const matches = useMemo(() => (query.trim() ? search(nodes, query.trim().toLowerCase()) : null), [nodes, query]);
  const rows = flatten(nodes, expanded, matches);
  const allIds = useMemo(() => {
    const ids: string[] = [];
    const walk = (list: CategoryNode[]) => list.forEach((node) => node.children?.length && (ids.push(node.id), walk(node.children)));
    walk(nodes);
    return ids;
  }, [nodes]);
  const total = useMemo(() => {
    const count = (list: CategoryNode[]): number => list.reduce((sum, node) => sum + 1 + count(node.children ?? []), 0);
    return count(nodes);
  }, [nodes]);

  const toggle = (id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  };

  const drop = (event: DragEvent, row: Row) => {
    event.preventDefault();
    if (dragging && dragging.parentId === row.parentId && dragging.node.id !== row.node.id) {
      const next = reorder(nodes, row.parentId, dragging.node.id, row.node.id);
      setNodes(next);
      const siblings = row.parentId === null ? next : rowsChildren(next, row.parentId);
      onReorder?.(row.parentId, siblings.map((node) => node.id));
    }
    setDragging(null);
    setDropTarget(null);
  };

  const action = "text-sm leading-xs font-semibold text-text-secondary hover:text-text";

  return (
    <section data-slot="category-tree" aria-label={ariaLabel} className={cn("flex flex-col overflow-clip rounded-lg border border-border-subtle font-sans", className)} {...props}>
      <div className="hidden items-center gap-2.5 bg-surface-subtle px-4 py-3 md:flex">
        <label className="flex h-9 flex-1 items-center gap-2 rounded-full border border-border bg-bg px-3 focus-within:border-brand">
          <Icon name="search" size={14} strokeWidth={1.5} className="text-text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a category"
            aria-label="Find a category"
            className="min-w-0 flex-1 bg-transparent text-sm leading-xs text-text outline-none placeholder:text-text-muted"
          />
        </label>
        <button type="button" className={action} onClick={() => setExpanded(new Set(allIds))}>
          Expand all
        </button>
        <span aria-hidden className="h-4 w-px bg-border" />
        <button type="button" className={action} onClick={() => setExpanded(new Set())}>
          Collapse all
        </button>
      </div>

      <ul role="tree" aria-label={ariaLabel}>
        {rows.length === 0 && <li className="px-4 py-10 text-center text-14 leading-sm text-text-muted">No categories match “{query}”.</li>}
        {rows.map((row) => {
          const { node, depth } = row;
          const hasChildren = Boolean(node.children?.length);
          const open = matches ? true : expanded.has(node.id);
          const selected = node.id === selectedId;
          const strong = depth === 1 || hasChildren;
          return (
            <li
              key={node.id}
              role="treeitem"
              aria-level={depth}
              aria-expanded={hasChildren ? open : undefined}
              aria-selected={selected}
              draggable={Boolean(onReorder) && !matches}
              onDragStart={() => setDragging(row)}
              onDragEnd={() => {
                setDragging(null);
                setDropTarget(null);
              }}
              onDragOver={(event) => {
                if (dragging && dragging.parentId === row.parentId && dragging.node.id !== node.id) {
                  event.preventDefault();
                  setDropTarget(node.id);
                }
              }}
              onDragLeave={() => setDropTarget((current) => (current === node.id ? null : current))}
              onDrop={(event) => drop(event, row)}
              className={cn(
                "relative flex items-center gap-2.5 border-t border-border-subtle py-3 pr-3.5 md:py-2.75 md:pr-4 md:pl-4",
                selected && "bg-sage-50 before:absolute before:inset-y-0 before:left-0 before:w-0.75 before:bg-brand",
                dragging?.node.id === node.id && "opacity-muted",
                // Mobile indents with padding; tablet and desktop draw guides.
                depth === 1 ? "pl-4" : depth === 2 ? "pl-10" : "pl-16",
              )}
            >
              {dropTarget === node.id && (
                <span aria-hidden className="absolute inset-x-4 -top-px flex items-center gap-2">
                  <span className="size-2 rounded-full border-2 border-brand bg-bg" />
                  <span className="h-0.5 flex-1 bg-brand" />
                </span>
              )}
              <Icon name="grip" size={16} className="hidden w-3 cursor-grab text-evergreen-300 md:inline-block" />
              {Array.from({ length: depth - 1 }, (_, index) => (
                <span key={index} aria-hidden className="hidden w-7 shrink-0 justify-center md:flex">
                  <span className="h-5 w-px bg-border" />
                </span>
              ))}
              <span className="flex w-4 shrink-0">
                {hasChildren && (
                  <button type="button" onClick={() => toggle(node.id)} aria-label={`${open ? "Collapse" : "Expand"} ${node.name}`} className="text-text-secondary hover:text-text">
                    <Icon name={open ? "chevronDown" : "chevronRight"} size={16} strokeWidth={1.6} />
                  </button>
                )}
              </span>
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <LinkAs
                  href={hrefFor(node.id)}
                  className={cn(
                    "text-14 leading-sm hover:underline",
                    depth === 1 && "max-md:text-base",
                    strong ? "font-semibold" : "font-medium",
                    node.hidden ? "text-text-muted" : "text-text",
                  )}
                >
                  {node.name}
                </LinkAs>
                {selected && <span className="hidden rounded-full bg-bg px-1.75 text-11 leading-xs font-semibold text-brand md:inline">Editing</span>}
                {node.hidden && <span className="rounded-full bg-surface px-1.75 text-11 leading-xs font-semibold text-text-muted">Hidden</span>}
                {hasChildren && !open && (
                  <span className="hidden text-xs leading-xs text-text-muted md:inline">
                    {node.children!.length} {node.children!.length === 1 ? "subcategory" : "subcategories"}
                  </span>
                )}
                {depth === MAX_DEPTH && <span className="hidden text-11 leading-3.5 font-semibold tracking-label text-text-muted uppercase md:inline">Level 3 · max</span>}
              </span>
              <span className="shrink-0 text-right text-xs leading-xs text-text-muted md:w-22.5 md:text-sm md:leading-4.5 md:text-text-secondary">
                {node.count}
                <span className="hidden md:inline"> {node.count === 1 ? "product" : "products"}</span>
              </span>
              <LinkAs href={hrefFor(node.id)} aria-label={`Edit ${node.name}`} className="hidden w-6 shrink-0 justify-end text-text-muted hover:text-text md:flex">
                <Icon name="more" size={16} />
              </LinkAs>
              <Icon name="dragLines" size={16} className="w-3 text-evergreen-300 md:hidden" />
            </li>
          );
        })}
      </ul>

      <div className="hidden items-center justify-between gap-4 border-t border-border-subtle px-4 py-3 md:flex">
        <p className="text-xs leading-xs text-text-muted">
          {total} categories · {nodes.length} top level · {footnote}
        </p>
        {newHref && (
          <LinkAs href={newHref} className="flex items-center gap-1.5 text-sm leading-xs font-semibold text-text hover:text-brand">
            <Icon name="plus" size={14} strokeWidth={1.8} />
            Add top-level category
          </LinkAs>
        )}
      </div>
    </section>
  );
}

function rowsChildren(nodes: CategoryNode[], parentId: string): CategoryNode[] {
  for (const node of nodes) {
    if (node.id === parentId) return node.children ?? [];
    const found = rowsChildren(node.children ?? [], parentId);
    if (found.length) return found;
  }
  return [];
}
