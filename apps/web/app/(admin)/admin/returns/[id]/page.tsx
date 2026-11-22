import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReturnProgress, ReturnRequestCard } from "@repo/ui/organisms";

import { updateReturn } from "../../../../_actions/admin-returns";
import { findReturnDetail } from "../../../../_content/admin-returns";
import { placeholderSrc } from "../../../../_lib/placeholder";
import { ReturnReviewForm } from "../../_components/returns";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  return { title: id };
}

function packshot(image: string, sizes: string) {
  const src = placeholderSrc(`${image}.png`);
  return src ? <Image src={src} alt="" fill sizes={sizes} className="object-cover" /> : undefined;
}

/** /admin/returns/[id] (Paper "Jofak - Admin" → Return detail). Sample returns kept in server memory. */
export default async function AdminReturnPage({ params }: { params: Params }) {
  const { id } = await params;
  const detail = findReturnDetail(id);
  if (!detail) notFound();

  return (
    <ReturnReviewForm
      backHref="/admin/returns"
      number={detail.id}
      status={detail.status}
      meta={
        <>
          {detail.meta.split(detail.order)[0]}
          <Link href={detail.orderHref} className="font-semibold text-brand hover:underline">
            {detail.order}
          </Link>
          {detail.meta.split(detail.order)[1]}
        </>
      }
      compactMeta={detail.compactMeta}
      mobileMeta={detail.mobileMeta}
      progress={<ReturnProgress steps={detail.progress.steps} next={detail.progress.next} />}
      request={
        <ReturnRequestCard
          item={{ ...detail.request.item, image: packshot(detail.request.item.image, "56px") }}
          reason={detail.request.reason}
          quote={detail.request.quote}
          compactQuote={detail.request.compactQuote}
          photos={detail.request.photos.map((photo, index) => ({
            href: photo.href,
            image: packshot(photo.image, index ? "200px" : "180px"),
          }))}
          wants={detail.request.wants}
        />
      }
      decision={detail.decision}
      refund={detail.refund}
      customer={detail.customer}
      timeline={detail.timeline}
      primary={detail.primary}
      secondary={detail.secondary}
      action={updateReturn}
      fields={{ return: detail.id, returnTo: `/admin/returns/${detail.id}` }}
    />
  );
}
