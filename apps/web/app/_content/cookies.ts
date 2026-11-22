import type { CookieCategory } from "@repo/ui/organisms";

/* Cookie categories for the consent dialog (Paper "Jofak" → Cookie consent). */
export const cookieCategories: CookieCategory[] = [
  { id: "necessary", title: "Necessary", description: "Cart, sign-in, checkout and security. Can't be switched off.", required: true },
  { id: "analytics", title: "Analytics", description: "Google Analytics. Helps us see which pages are slow or confusing. No ads." },
  {
    id: "marketing",
    title: "Marketing",
    description: "Meta, TikTok and Google Ads. Lets us show you Jofak offers on other sites and measure our ads.",
  },
];
