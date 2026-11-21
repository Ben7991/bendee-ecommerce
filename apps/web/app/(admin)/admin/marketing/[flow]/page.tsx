import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Notice } from "@repo/ui/molecules";
import { ProductEditorForm } from "@repo/ui/organisms";

import { saveFlowAction } from "../../../../_actions/admin-marketing";
import { findFlowEditor } from "../../../../_content/admin-marketing";
import { placeholderSrc } from "../../../../_lib/placeholder";
import { FlowEditorFields } from "../../_components/marketing";

type Params = Promise<{ flow: string }>;

const TEST = { whatsapp: "A WhatsApp test", sms: "An SMS test", email: "A test email" } as const;
type SearchParams = Promise<{ saved?: string; test?: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { flow } = await params;
  return { title: findFlowEditor(flow)?.title ?? "Automation" };
}

/** /admin/marketing/[flow] (Paper "Jofak - Admin" → Abandoned cart flow). Saves to the in-memory sample flows. */
export default async function AdminFlowPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { flow: slug } = await params;
  const { saved, test } = await searchParams;
  const found = findFlowEditor(slug);
  if (!found) notFound();
  const { slug: id, tests, preview, ...flow } = found;
  const src = placeholderSrc(`${preview.cart.image}.png`);
  const firstChannel = flow.defaultValue.channels[0];

  return (
    <ProductEditorForm
      key={saved ?? "loaded"}
      variant="light"
      aria-label={`Edit ${flow.title}`}
      action={saveFlowAction.bind(null, id)}
      secondaryAction={
        <button
          type="submit"
          name="intent"
          value="test"
          className="flex h-12 shrink-0 items-center rounded-full border border-border bg-bg px-5 text-base leading-5 font-semibold text-text hover:bg-surface-subtle md:h-10.5 md:px-4 md:text-14 dark:bg-surface"
        >
          Send test
        </button>
      }
    >
      {test === "sent" && (
        <Notice title="Test sent">
          {firstChannel ? `${TEST[firstChannel]} went to your number with the saved message.` : "Turn on a channel to send a test."}
          {tests > 1 && ` ${tests} tests sent this session.`}
        </Notice>
      )}
      <FlowEditorFields
        {...flow}
        preview={{ ...preview, cart: { ...preview.cart, image: src ? <Image src={src} alt="" fill sizes="44px" className="object-cover" /> : undefined } }}
      />
    </ProductEditorForm>
  );
}
