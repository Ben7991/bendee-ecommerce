import type { PageEditorProps } from "./PageEditor";

/** Delivery & pickup from Paper (Jofak - Admin → Page editor). */
export const samplePageEditor: Omit<PageEditorProps, "onSave"> = {
  currentSlug: "delivery",
  pageHref: (slug) => `/admin/content/pages/${slug}`,
  pages: [
    { slug: "about", title: "About Jofak", shortTitle: "About", note: "/pages/about · edited 2 Oct" },
    { slug: "delivery", title: "Delivery & pickup", shortTitle: "Delivery & pickup", note: "/pages/delivery · edited 2 Oct", draft: true },
    { slug: "returns", title: "Returns & refunds", shortTitle: "Returns", note: "/pages/returns · 7-day window" },
  ],
  defaultValue: {
    title: "Delivery & pickup",
    address: "delivery",
    body: "<h2>How fast will my order arrive?</h2><p>We work with trusted courier partners across Ghana.</p>",
    visible: true,
    seoTitle: "Delivery & pickup across Ghana | Jofak",
    seoDescription: "Next-day delivery in Accra, 2–5 days elsewhere. Free over GHS 300.",
  },
  liveNote: "Live version from 2 Oct stays up until you publish. Linked from the footer menu and checkout.",
  warning: { title: "Check before publishing", text: "Fees here don't update automatically. Delivery fees in Settings were last changed 9 Nov." },
};
