import type { DefinitionItem, NumberedPoint, RateRow } from "@repo/ui/molecules";

/*
 * Copy for the content pages (Paper "Jofak" → Content pages). Static until the admin CMS manages
 * static pages (docs/04-admin-catalog-inventory.md ADM-FR-36). Answers that need links live in
 * the FAQ route itself.
 */

export type ContentSlug = "about" | "faq" | "delivery-returns" | "privacy" | "terms" | "contact";

/** The "Help & policies" navigation, in Paper's order. */
export const contentPages: { slug: ContentSlug; label: string; href: string }[] = [
  { slug: "about", label: "About Jofak", href: "/pages/about" },
  { slug: "faq", label: "FAQ", href: "/pages/faq" },
  { slug: "delivery-returns", label: "Delivery & returns", href: "/pages/delivery-returns" },
  { slug: "privacy", label: "Privacy policy", href: "/pages/privacy" },
  { slug: "terms", label: "Terms of sale", href: "/pages/terms" },
  { slug: "contact", label: "Contact us", href: "/pages/contact" },
];

export const lastUpdated = "2 Jan 2026";

// TODO: the real numbers and addresses once the business has them (the designs use placeholders).
export const contact = {
  whatsapp: { label: "+233 20 000 0000", href: "https://wa.me/233200000000" },
  phone: { label: "+233 30 000 0000", href: "tel:+233300000000" },
  email: { label: "hello@jofak.com", href: "mailto:hello@jofak.com" },
  privacyEmail: { label: "privacy@jofak.com", href: "mailto:privacy@jofak.com" },
  store: "Oxford Street, Osu, Accra · GA-000-0000",
  hours: "Mon–Sat, 8am–7pm",
};

export const deliveryRates: RateRow[] = [
  { area: "Accra Central", fee: "GHS 25", arrives: "Next day" },
  { area: "Greater Accra outskirts", fee: "GHS 35", arrives: "1–2 days" },
  { area: "Kumasi", fee: "GHS 45", arrives: "2–3 days" },
  { area: "Other regional capitals", fee: "GHS 55", arrives: "2–4 days" },
  { area: "Rest of Ghana", fee: "GHS 70", arrives: "3–5 days" },
  { area: "Store pickup, Osu", fee: "Free", arrives: "Same day", free: true },
];

export const aboutStats = [
  { tone: "sage", value: "18,000+", label: "orders delivered across all 16 regions" },
  { tone: "amber", value: "100%", label: "of products bought direct from brands or licensed importers" },
  { tone: "lavender", value: "4.8 / 5", label: "average rating from verified buyers" },
] as const;

export const promises: NumberedPoint[] = [
  {
    title: "Genuine, or your money back",
    text: "Every product comes straight from the brand or a licensed importer, with batch numbers we can trace. Registered with the Ghana FDA where required.",
  },
  {
    title: "Stored cool, shipped fast",
    text: "Our Osu store room is air-conditioned around the clock, and we don't stock anything within six months of its expiry date.",
  },
  {
    title: "Straight answers from real people",
    text: "Our nutritionist and support team answer on WhatsApp. We'll tell you when something isn't right for you, even if that means you don't buy.",
  },
];

export const privacySummary = [
  "We only collect what we need to deliver your order and look after your account.",
  "We never sell your details. We share them only with the partners who make your order happen.",
  "Marketing messages and ad cookies are off until you say yes.",
  "You can download, correct or delete your data any time from your account.",
];

export const collectedData: DefinitionItem[] = [
  { term: "Contact details", description: "Name, phone number and, if you give it, email." },
  { term: "Delivery details", description: "Addresses, landmarks, GhanaPost GPS codes and recipient phone numbers." },
  {
    term: "Orders & payments",
    description: "What you bought and how you paid. Card and MoMo details are handled by Paystack. We never see or store your PIN or full card number.",
  },
  { term: "Browsing", description: "Pages viewed and device type, only if you allow analytics cookies." },
];

export const termsSummary = [
  "Prices on the site include VAT and levies. Delivery is added at checkout.",
  "Your order is confirmed once payment succeeds, or when you choose pay on delivery.",
  "Unopened, sealed products can be returned within 14 days.",
  "Supplements support your health. They don't replace medical advice or treatment.",
];

export const termsClauses: { title: string; text: string }[] = [
  {
    title: "1. About these terms",
    text: "These terms apply to every order placed on jofak.com by customers in Ghana. By placing an order you agree to them. We may update them from time to time; the version shown when you ordered is the one that applies.",
  },
  {
    title: "2. Prices and payment",
    text: "All prices are in Ghana cedis and include VAT and applicable levies. We accept MTN MoMo, Telecel Cash, AT Money, Visa, Mastercard and bank transfer through Paystack. If we've made an obvious pricing mistake, we'll contact you before dispatch and you can cancel for a full refund.",
  },
  {
    title: "3. Delivery",
    text: "Delivery fees and estimated times are shown at checkout and on our Delivery & returns page. Someone needs to be available to receive the order. If our delivery partner can't reach you after two attempts, the order returns to our store and we'll arrange redelivery or a refund minus the delivery fee.",
  },
  {
    title: "4. Cancellations, returns and refunds",
    text: "You can cancel free of charge until your order is packed. After that, unopened and sealed products can be returned within 14 days of delivery. Damaged or incorrect items are always replaced or refunded. Refunds go to your original payment method within 5 working days of us receiving the return.",
  },
  {
    title: "5. Health information",
    text: "Product descriptions are for general information and are not medical advice. Check with a doctor or pharmacist before taking supplements if you're pregnant, breastfeeding, under 18, taking medication or managing a health condition. Always follow the dose on the label.",
  },
  {
    title: "6. Liability and governing law",
    text: "Nothing in these terms limits your rights under Ghanaian consumer law. Our liability for any order is limited to the amount you paid for it, except where the law says otherwise. These terms are governed by the laws of Ghana, and disputes go to the courts of Ghana.",
  },
];

export const contactTopics = [
  { value: "order", label: "An existing order" },
  { value: "product", label: "A product question" },
  { value: "returns", label: "A return or refund" },
  { value: "other", label: "Something else" },
];
