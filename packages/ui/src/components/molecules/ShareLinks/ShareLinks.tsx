"use client";

import { useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * ShareLinks (molecule): "Share on WhatsApp" and "Copy link" under the buy box, with an optional
 * note on the right from 768px. `url` is the full link to share (with its UTM parameters).
 */
export interface ShareLinksProps extends ComponentProps<"div"> {
  url: string;
  /** Text before the link in the WhatsApp message. */
  message?: string;
  /** "FDA disclaimer applies*". */
  note?: ReactNode;
}

const item = "flex items-center gap-2 rounded-sm font-sans text-sm leading-xs font-medium text-text transition-colors hover:text-brand";

export function ShareLinks({ url, message, note, className, ...props }: ShareLinksProps) {
  const [copied, setCopied] = useState(false);
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(message ? `${message} ${url}` : url)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (permissions, insecure context): nothing to do.
    }
  };

  return (
    <div data-slot="share-links" className={cn("flex items-center justify-between gap-4", className)} {...props}>
      <div className="flex items-center gap-5">
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={item}>
          <Icon name="whatsapp" className="text-brand" />
          Share on WhatsApp
        </a>
        <button type="button" onClick={copy} className={item}>
          <Icon name={copied ? "check" : "link"} size={16} />
          <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
        </button>
      </div>
      {note && <p className="hidden font-sans text-xs leading-xs text-text-muted md:block">{note}</p>}
    </div>
  );
}
