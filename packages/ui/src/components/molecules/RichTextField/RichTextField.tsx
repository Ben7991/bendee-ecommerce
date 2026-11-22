"use client";

import { useId, useRef, useState, type ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * RichTextField (molecule): a small rich text box with a toolbar (Paragraph / Heading, bold,
 * italic, bullet list, link), Paper Jofak - Admin → Product editor → Description. The HTML is
 * kept in a hidden input called `name`, so it submits with the form.
 */
export interface RichTextFieldProps extends Omit<ComponentProps<"div">, "defaultValue" | "onChange"> {
  name: string;
  label: string;
  /** Starting HTML. */
  defaultValue?: string;
  onValueChange?: (html: string) => void;
}

export function RichTextField({ name, label, defaultValue = "", onValueChange, className, ...props }: RichTextFieldProps) {
  const id = useId();
  const editor = useRef<HTMLDivElement>(null);
  const hidden = useRef<HTMLInputElement>(null);
  const [block, setBlock] = useState("p");

  const sync = () => {
    const html = editor.current?.innerHTML ?? "";
    if (hidden.current) {
      hidden.current.value = html;
      // Let the surrounding form notice the change.
      hidden.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
    onValueChange?.(html);
  };

  const run = (command: string, value?: string) => {
    editor.current?.focus();
    document.execCommand(command, false, value);
    sync();
  };

  const tool = "flex h-7 w-7.5 items-center justify-center rounded-6 text-text-secondary transition-colors hover:bg-bg hover:text-text";

  return (
    <div data-slot="rich-text-field" className={cn("flex flex-col gap-1.5 font-sans", className)} {...props}>
      <label id={`${id}-label`} htmlFor={`${id}-editor`} className="text-sm leading-4.5 font-semibold text-text">
        {label}
      </label>
      <div className="flex flex-col overflow-clip rounded-sm border border-border focus-within:border-brand">
        <div role="toolbar" aria-label={`${label} formatting`} className="flex items-center gap-0.5 border-b border-border-subtle bg-surface-subtle px-2 py-1.5">
          <label className="relative flex items-center rounded-8 bg-bg pr-6 pl-2.5">
            <span className="sr-only">Text style</span>
            <select
              value={block}
              onChange={(event) => {
                setBlock(event.target.value);
                run("formatBlock", event.target.value);
              }}
              className="cursor-pointer appearance-none bg-transparent py-1 text-sm leading-xs font-semibold text-text outline-none"
            >
              <option value="p">Paragraph</option>
              <option value="h3">Heading</option>
            </select>
            <Icon name="chevronDown" size={10} strokeWidth={2.2} className="pointer-events-none absolute right-2 text-text" />
          </label>
          <button type="button" className={cn(tool, "text-sm font-bold text-text")} aria-label="Bold" onClick={() => run("bold")}>
            B
          </button>
          <button type="button" className={cn(tool, "font-serif text-md italic text-text")} aria-label="Italic" onClick={() => run("italic")}>
            I
          </button>
          <button type="button" className={tool} aria-label="Bullet list" onClick={() => run("insertUnorderedList")}>
            <Icon name="menu" size={16} strokeWidth={1.6} />
          </button>
          <button
            type="button"
            className={tool}
            aria-label="Link"
            onClick={() => {
              const url = window.prompt("Link address");
              if (url) run("createLink", url);
            }}
          >
            <Icon name="link" size={16} strokeWidth={1.6} />
          </button>
        </div>
        <div
          ref={editor}
          id={`${id}-editor`}
          role="textbox"
          aria-multiline="true"
          aria-labelledby={`${id}-label`}
          contentEditable
          suppressContentEditableWarning
          onInput={sync}
          dangerouslySetInnerHTML={{ __html: defaultValue }}
          className="min-h-24 px-4 py-3.5 text-14 leading-5.5 text-text outline-none [&_li]:text-text-secondary [&_p+p]:mt-2.5 [&_p+ul]:mt-2.5 [&_ul]:list-inside [&_ul]:list-disc"
        />
      </div>
      <input ref={hidden} type="hidden" name={name} defaultValue={defaultValue} />
    </div>
  );
}
