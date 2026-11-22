"use client";

import { useId, useRef, useState, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Switch } from "../../atoms";

/**
 * TemplateEditor (organism): one automatic customer message (Paper Jofak - Admin → Settings →
 * Notifications → Edit template): SMS / Email tabs (links), whether it's sent, the text with
 * details inserted at the cursor ({first_name}…), a character count with SMS parts and cost (or
 * a subject line for email), and a phone or inbox preview filled from a sample order with
 * "Send test". Fields submit `enabled`, `body`, `subject`, `testTo`; Send test submits
 * `intent=test`. Restore default puts the original text back.
 */
export interface TemplateEditorProps extends Omit<ComponentProps<"div">, "defaultValue" | "title"> {
  linkAs?: LinkComponent;
  /** "Notifications › Messages to customers". */
  breadcrumb: ReactNode;
  title: string;
  channel: "sms" | "email";
  channels: { label: string; href: string; active?: boolean; soon?: boolean }[];
  defaultValue: { enabled: boolean; body: string; subject?: string };
  defaultBody: string;
  tokens: string[];
  sample: Record<string, string>;
  sender: string;
  /** "Last edited by Kojo Ansah · 3 Nov". */
  lastEdited: string;
  testTo: string;
  cancelHref: string;
}

const fill = (text: string, sample: Record<string, string>) => text.replace(/\{(\w+)\}/g, (match, key: string) => sample[key] ?? match);

export function TemplateEditor({
  linkAs: LinkAs = "a",
  breadcrumb,
  title,
  channel,
  channels,
  defaultValue,
  defaultBody,
  tokens,
  sample,
  sender,
  lastEdited,
  testTo,
  cancelHref,
  className,
  ...props
}: TemplateEditorProps) {
  const id = useId();
  const area = useRef<HTMLTextAreaElement>(null);
  const [body, setBody] = useState(defaultValue.body);
  const [subject, setSubject] = useState(defaultValue.subject ?? "");
  const filled = fill(body, sample);
  const sms = channel === "sms";
  const length = filled.length;
  const parts = length <= 160 ? 1 : Math.ceil(length / 153);

  const insert = (token: string) => {
    const element = area.current;
    const text = `{${token}}`;
    if (!element) return setBody(`${body}${text}`);
    const start = element.selectionStart ?? body.length;
    const end = element.selectionEnd ?? body.length;
    const next = `${body.slice(0, start)}${text}${body.slice(end)}`;
    setBody(next);
    requestAnimationFrame(() => {
      element.focus();
      element.setSelectionRange(start + text.length, start + text.length);
      element.dispatchEvent(new Event("input", { bubbles: true }));
    });
  };

  return (
    <div data-slot="template-editor" className={cn("flex flex-col gap-3.5 font-sans md:gap-4", className)} {...props}>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="hidden flex-col gap-0.5 md:flex">
          <p className="text-sm leading-4.5 text-text-muted">{breadcrumb}</p>
          <h2 className="text-xl leading-6.5 font-semibold tracking-compact text-text md:text-22 md:leading-7">{title}</h2>
        </div>
        <nav aria-label="Channel" className="flex gap-0.5 rounded-full bg-surface-subtle p-0.75">
          {channels.map((item) =>
            item.soon ? (
              <span key={item.label} className="hidden flex-1 justify-center px-3.5 py-2 text-sm leading-4 font-medium text-text-muted md:flex md:flex-none">
                {item.label}
              </span>
            ) : (
              <LinkAs
                key={item.label}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={cn("flex flex-1 justify-center rounded-full px-3.5 py-2 text-sm leading-4 md:flex-none", item.active ? "bg-primary font-semibold text-on-primary" : "font-medium text-text-secondary hover:text-text")}
              >
                {item.label}
              </LinkAs>
            ),
          )}
        </nav>
      </div>

      <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-start">
        <section aria-label="Message" className="flex min-w-0 flex-1 flex-col gap-3.5 rounded-18 border border-border-subtle p-4 md:gap-4 md:rounded-lg md:px-6 md:py-5.5">
          <div className="flex items-center justify-between gap-3">
            <p className="hidden text-base leading-5 font-semibold text-text md:block">Message</p>
            <label className="flex flex-1 items-center justify-between gap-2 text-14 leading-5 font-semibold text-text md:flex-none md:text-sm md:leading-4.5 md:font-regular md:text-text-secondary">
              Send this message
              <Switch name="enabled" defaultChecked={defaultValue.enabled} className="data-[state=checked]:bg-primary" />
            </label>
          </div>
          {!sms && (
            <label className="flex flex-col gap-1.5 text-sm leading-4.5 font-semibold text-text-secondary">
              Subject
              <input name="subject" value={subject} onChange={(event) => setSubject(event.target.value)} className="h-10.5 rounded-sm border border-border bg-bg px-3 text-14 font-regular text-text outline-none focus:border-primary dark:bg-surface" />
            </label>
          )}
          <label htmlFor={`${id}-body`} className="sr-only">
            Message text
          </label>
          <textarea
            id={`${id}-body`}
            ref={area}
            name="body"
            rows={sms ? 4 : 7}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className="min-h-35 resize-y rounded-14 border-field border-primary bg-bg px-4 py-3.5 text-base leading-6.5 text-text outline-none dark:bg-surface"
          />
          {sms && (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <span className="text-sm leading-4.5 font-semibold text-text">
                    ~{length} / 160<span className="hidden md:inline"> characters</span>
                  </span>
                  <span className={cn("rounded-full px-2 py-0.5 text-11 leading-3.75 font-semibold", parts > 1 ? "bg-tint-sun text-warning-text" : "bg-sage-100 text-primary dark:text-brand")}>
                    {parts} SMS · GHS {(parts * 0.03).toFixed(2)}
                  </span>
                </span>
                <span className="hidden text-xs leading-xs text-text-muted md:inline">Over 160 splits into 2 messages</span>
              </div>
              <span aria-hidden className="flex h-1.5 rounded-full bg-surface-subtle">
                <span className={cn("rounded-full", length > 160 ? "bg-warning" : "bg-primary")} style={{ width: `${Math.min(100, (length / 160) * 100)}%` }} />
              </span>
            </>
          )}
          <div className="flex flex-col gap-2.5 border-t border-border-subtle pt-3.5">
            <p className="flex justify-between gap-3 text-sm leading-4.5 font-semibold text-text">
              Insert a detail <span className="hidden text-xs leading-xs font-regular text-text-muted md:inline">Click to add at the cursor</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {tokens.map((token, index) => (
                <button
                  key={token}
                  type="button"
                  onClick={() => insert(token)}
                  className={cn("rounded-10 border border-border-subtle px-2.5 py-1.5 font-mono text-xs leading-xs font-semibold text-text hover:bg-surface-subtle", index >= 4 && "hidden md:block")}
                >
                  {`{${token}}`}
                </button>
              ))}
              {tokens.length > 4 && <span className="rounded-10 border border-dashed border-border px-2.5 py-1.5 text-xs leading-xs font-semibold text-text-muted md:hidden">+{tokens.length - 4} more</span>}
            </div>
          </div>
          {sms && <p className="hidden rounded-sm bg-tint-sun px-3.5 py-3 text-xs leading-4.25 text-warning-text md:block">Links are shortened to jfk.gh/… so they fit in one SMS. Emoji and some accented letters cut the limit to 70 characters.</p>}
        </section>

        <section aria-label="Preview" className="flex flex-col gap-3 rounded-18 bg-surface-subtle p-4 md:rounded-lg md:p-5 xl:w-75 xl:shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-base leading-5 font-semibold text-text">Preview</p>
            <span className="hidden text-xs leading-xs text-text-muted md:inline">Sample order</span>
            <button type="submit" name="intent" value="test" className="text-sm leading-4.5 font-semibold text-brand md:hidden">
              Send test ›
            </button>
          </div>
          {sms ? (
            <div className="flex flex-col gap-3 md:rounded-2xl md:border-6 md:border-text md:bg-bg md:px-3.5 md:pt-4 md:pb-5.5 dark:md:bg-surface">
              <div className="hidden flex-col items-center gap-1 border-b border-border-subtle pb-2.5 md:flex">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary text-xs leading-xs font-bold text-on-primary">{sender.charAt(0)}</span>
                <span className="text-sm leading-4.5 font-semibold text-text">{sender}</span>
              </div>
              <p className="hidden text-center text-11 leading-3.5 text-text-muted md:block">Today 14:32</p>
              <p className="max-w-55 self-start rounded-t-md rounded-br-md rounded-bl-4 bg-bg px-3 py-2.5 text-sm leading-4.75 text-text md:bg-surface dark:bg-surface">{filled}</p>
              <p className="text-xs leading-xs text-text-muted md:hidden">From {sender} · sample order</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 rounded-md bg-bg p-4 shadow-xs dark:bg-surface">
              <p className="text-xs leading-xs text-text-muted">
                From {sender} · <span className="font-semibold text-text">{fill(subject, sample)}</span>
              </p>
              <p className="text-sm leading-5 whitespace-pre-line text-text">{filled}</p>
            </div>
          )}
          <div className="hidden flex-col gap-2 pt-1 md:flex">
            <label htmlFor={`${id}-test`} className="text-xs leading-xs text-text-secondary">
              Send a test to
            </label>
            <div className="flex gap-2">
              <input id={`${id}-test`} name="testTo" defaultValue={testTo} className="min-w-0 flex-1 rounded-10 border border-border bg-bg px-3 py-2.25 text-sm leading-4.5 text-text outline-none focus:border-primary dark:bg-surface" />
              <button type="submit" name="intent" value="test" className="rounded-10 border border-border bg-bg px-3.5 py-2.25 text-sm leading-4.5 font-semibold whitespace-nowrap text-text hover:bg-surface-subtle dark:bg-surface">
                Send test
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
        <p className="text-sm leading-4.5 text-text-muted">
          <span className="hidden md:inline">{lastEdited} · </span>
          <button type="button" onClick={() => setBody(defaultBody)} className="font-semibold text-brand hover:underline md:font-regular md:text-text-muted">
            Restore default
          </button>
        </p>
        <div className="hidden gap-2.5 md:flex">
          <LinkAs href={cancelHref} className="flex h-11 items-center rounded-full border border-border px-4.5 text-14 leading-4.5 font-semibold text-text hover:bg-surface-subtle">
            Cancel
          </LinkAs>
          <button type="submit" className="flex h-11 items-center rounded-full bg-primary px-5 text-14 leading-4.5 font-semibold text-on-primary hover:bg-primary-hover">
            Save template
          </button>
        </div>
      </div>
    </div>
  );
}
