"use client";

import Link from "next/link";

import { SeoTemplateEditor, SettingsShell, TemplateEditor, type SeoTemplateEditorProps, type SettingsShellProps, type TemplateEditorProps } from "@repo/ui/organisms";

/*
 * Client boundaries for the settings organisms that take next/link: a server component can't
 * hand a component reference to a client component.
 */

export function SettingsForm(props: Omit<SettingsShellProps, "linkAs">) {
  return <SettingsShell {...props} linkAs={Link} />;
}

export function MessageTemplate(props: Omit<TemplateEditorProps, "linkAs">) {
  return <TemplateEditor {...props} linkAs={Link} />;
}

export function SeoTemplate(props: Omit<SeoTemplateEditorProps, "linkAs">) {
  return <SeoTemplateEditor {...props} linkAs={Link} />;
}
