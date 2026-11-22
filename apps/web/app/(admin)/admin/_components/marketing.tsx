"use client";

import Link from "next/link";

import { FlowEditor, type FlowEditorProps } from "@repo/ui/organisms";

/*
 * Client boundary for the flow editor, which takes next/link: a server component can't hand a
 * component reference to a client component.
 */

export function FlowEditorFields(props: Omit<FlowEditorProps, "linkAs">) {
  return <FlowEditor {...props} linkAs={Link} />;
}
