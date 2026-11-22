"use client";

import { useState, type ReactElement } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";
import { SecurityDialog, SecurityDialogFooter, securityButton } from "../../molecules";

/**
 * BackupCodesDialog (organism): new backup codes, shown once (Paper Jofak - Admin → My profile →
 * New backup codes): a warning that the old ones stopped working, the ten codes, Download .txt /
 * Copy all / Print, and Done once "I've saved these codes somewhere safe" is ticked.
 */
export interface BackupCodesDialogProps {
  trigger?: ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  codes: string[];
  /** "Made just now · 10 of 10 left". */
  note?: string;
  /** Who they belong to, in the downloaded file ("Abena Mensah · abena@jofak.com"). */
  owner?: string;
  className?: string;
}

export function BackupCodesDialog({ trigger, open, onOpenChange, codes, note, owner, className }: BackupCodesDialogProps) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const text = [`Jofak admin backup codes${owner ? ` · ${owner}` : ""}`, "Each code works once.", "", ...codes.map((code, index) => `${index + 1}. ${code}`)].join("\n");
  const half = Math.ceil(codes.length / 2);
  const action = "flex h-10.5 flex-1 items-center justify-center gap-2 rounded-full border border-border text-sm leading-4.5 font-semibold text-text hover:bg-surface-subtle";

  return (
    <SecurityDialog
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      icon="key"
      title="Your new backup codes"
      description={<><span className="md:hidden">Each one works once</span><span className="hidden md:inline">Each code works once, if you can’t use your phone</span></>}
      className={className}
    >
      <div className="flex flex-col gap-3.5 px-5 pb-5 md:px-6">
        <p className="flex gap-2.5 rounded-sm bg-tint-sun px-3.5 py-3 text-xs leading-4.25 text-warning-text">
          <Icon name="warning" size={16} strokeWidth={1.4} className="shrink-0" />
          <span>
            <strong className="font-bold">Your old codes stopped working.</strong> Save these now — you won’t see them again after you close this.
          </span>
        </p>
        <div className="flex gap-2.5 rounded-md bg-surface-subtle px-4 py-3.5 font-mono text-14 leading-5.5 text-text md:px-4.5 md:py-4 md:text-base dark:bg-bg">
          {[codes.slice(0, half), codes.slice(half)].map((column, columnIndex) => (
            <ol key={columnIndex} start={columnIndex * half + 1} className="flex flex-1 flex-col gap-2">
              {column.map((code, index) => (
                <li key={code} className="flex gap-2.5">
                  <span className="w-5 text-text-muted">{columnIndex * half + index + 1}</span>
                  {code}
                </li>
              ))}
            </ol>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className={action}
            onClick={() => {
              const link = document.createElement("a");
              link.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
              link.download = "jofak-backup-codes.txt";
              link.click();
              URL.revokeObjectURL(link.href);
            }}
          >
            <Icon name="download" size={14} strokeWidth={1.5} />
            <span className="md:hidden">Download</span>
            <span className="hidden md:inline">Download .txt</span>
          </button>
          <button
            type="button"
            className={action}
            onClick={() => {
              void navigator.clipboard?.writeText(text);
              setCopied(true);
            }}
          >
            <Icon name="copy" size={14} />
            {copied ? "Copied" : <><span className="md:hidden">Copy</span><span className="hidden md:inline">Copy all</span></>}
          </button>
          <button
            type="button"
            className={action}
            onClick={() => {
              const win = window.open("", "_blank", "width=480,height=640");
              if (!win) return;
              win.document.title = "Jofak backup codes";
              const pre = win.document.createElement("pre");
              pre.style.font = "16px/1.6 monospace";
              pre.textContent = text;
              win.document.body.appendChild(pre);
              win.print();
            }}
          >
            <Icon name="printer" size={14} />
            Print
          </button>
        </div>
        <label className="flex cursor-pointer items-center gap-2.5 pt-0.5">
          <input type="checkbox" checked={saved} onChange={(event) => setSaved(event.target.checked)} className="size-5 shrink-0 cursor-pointer appearance-none rounded-6 border-field border-border bg-bg checked:border-primary checked:bg-primary" />
          <Icon name="check" size={12} strokeWidth={2.4} className={cn("pointer-events-none -ml-6.5 mr-1.5 text-on-primary", !saved && "invisible")} />
          <span className="text-14 leading-5 font-medium text-text">I’ve saved these codes somewhere safe</span>
        </label>
      </div>
      <SecurityDialogFooter note={note}>
        <button type="button" disabled={!saved} onClick={() => onOpenChange?.(false)} className={cn(securityButton("primary"), "md:px-6")}>
          Done
        </button>
      </SecurityDialogFooter>
    </SecurityDialog>
  );
}
