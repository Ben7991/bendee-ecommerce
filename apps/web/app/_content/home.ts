import type { FooterColumn, NavLink, Review, ShowcaseItem } from "@repo/ui/organisms";

/*
 * Home page content. Static until the catalogue API exists (docs/01-storefront-discovery.md);
 * copy matches the Paper "Jofak" Homepage design.
 */

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      { label: "Bundles", href: "/collections/bundles" },
      { label: "Subscriptions", href: "/account/subscriptions" },
      { label: "Gift cards", href: "/gift-cards" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Ingredients", href: "/pages/ingredients" },
      { label: "Lab results", href: "/pages/lab-results" },
      { label: "Journal", href: "/journal" },
      { label: "Wellness quiz", href: "/quiz" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & returns", href: "/pages/delivery-returns" },
      { label: "Track order", href: "/orders/track" },
      { label: "FAQ", href: "/pages/faq" },
      { label: "Contact us", href: "/pages/contact" },
    ],
  },
];

export const bestsellerFilters = ["All", "Capsules", "Powders", "Gummies", "Bundles"].map((label) => ({
  value: label.toLowerCase(),
  label,
}));

/** Product ids double as placeholder image names (public/placeholders/<id>.png). */
export const bestsellers: ShowcaseItem[] = [
  {
    id: "greens",
    name: "Daily Greens Powder",
    shortName: "Daily Greens",
    details: "Lemon lime · 25 servings",
    shortDetails: "25 servings",
    href: "/products/daily-greens-powder",
    price: 450,
    compareAt: 520,
    rating: 4.9,
    reviewCount: 3214,
    badge: { label: "Bestseller", variant: "solid" },
    tint: "sage",
    category: "powders",
    showOnMobile: true,
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha Tablets",
    details: "Stress & vitality · 120 tablets",
    shortDetails: "120 tablets",
    href: "/products/ashwagandha-tablets",
    price: 380,
    rating: 4.8,
    reviewCount: 2087,
    badge: { label: "Staff pick", variant: "light" },
    tint: "amber",
    category: "capsules",
  },
  {
    id: "energy",
    name: "Energy Capsules",
    details: "Energy & stress support · 30 capsules",
    shortDetails: "30 capsules",
    href: "/products/energy-capsules",
    price: 320,
    compareAt: 390,
    rating: 4.9,
    reviewCount: 4560,
    badge: { label: "−18%", variant: "solid" },
    tint: "lavender",
    category: "capsules",
    showOnMobile: true,
  },
  {
    id: "nmnh",
    name: "NMNH 650mg",
    details: "NAD+ support · 90 capsules",
    shortDetails: "90 capsules",
    href: "/products/nmnh-650mg",
    price: 650,
    rating: 4.7,
    reviewCount: 1342,
    badge: { label: "New", variant: "light" },
    tint: "sun",
    category: "capsules",
  },
];

export const reviews: [Review, Review] = [
  {
    quote:
      "I've tried every sleep aid out there. Three weeks on the Sleep Gummies and I'm finally waking up before my alarm — and actually feeling good.",
    author: "Amara O.",
    detail: "Verified buyer · Sleep Gummies",
    avatarTone: "light",
  },
  {
    quote:
      "The Greens taste genuinely good and my afternoon slump is gone. Subscribing was a no-brainer — it just shows up every month.",
    author: "Daniel K.",
    detail: "Subscriber · Daily Greens",
    avatarTone: "deep",
  },
];

export const quizChoices = [
  { value: "rested", label: "Rested and ready to go" },
  { value: "groggy", label: "Groggy until my second coffee" },
  { value: "tired", label: "Tired, even after a full night" },
];
