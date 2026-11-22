import type { TrackingHealthProps } from "./TrackingHealth";

/** Paper sample trackers (Jofak - Admin → Marketing → Ad tracking). */
export const sampleTracking: TrackingHealthProps = {
  trackers: [
    { name: "Meta Pixel", initial: "M", detail: "Last Purchase event 6 min ago", status: "healthy" },
    { name: "Google tag · GA4", initial: "G", detail: "3 purchases missed yesterday", status: "check" },
    { name: "TikTok Pixel", initial: "T", detail: "Coming soon", status: "soon" },
  ],
  debug: { href: "?debug=events" },
  alert: { title: "Google tag missed 3 purchases", note: "Meta Pixel is healthy · 62% accept cookies", href: "?debug=events" },
};
