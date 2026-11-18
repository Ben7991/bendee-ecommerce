import type { AnnouncementItem } from "@repo/ui/organisms";

/* Store-wide copy shared by every storefront and error page. */

export const announcements: AnnouncementItem[] = [
  { icon: "truck", label: "Delivery in Accra within 24h" },
  { icon: "phone", label: "Pay with MoMo or card" },
  { icon: "shieldCheck", label: "Free delivery over GHS 500" },
];

// TODO: the WhatsApp business chat (https://wa.me/<number>) once the number is known.
export const helpHref = "/pages/contact";

export const copyright = "© 2026 Jofak. All rights reserved.";
export const tagline = "Clean, plant-powered supplements · Accra";
